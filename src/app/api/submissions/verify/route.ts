import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { verifySubmissionToken } from '@/lib/security/verify'
import { sendStudentVerifiedEmail } from '@/lib/email/mailer'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const token = searchParams.get('token')

  if (!id || !token || !verifySubmissionToken(id, token)) {
    return new NextResponse(renderHtmlPage({
      title: 'Security Alert: Invalid Token',
      badge: 'ACCESS DENIED',
      badgeColor: '#ef4444',
      heading: 'Verification Link Invalid',
      message: 'This verification token is invalid, expired, or has been tampered with.',
      details: null,
      success: false,
    }), {
      status: 403,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  try {
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { participant: true },
    })

    if (!submission) {
      return new NextResponse(renderHtmlPage({
        title: 'Submission Not Found',
        badge: 'NOT FOUND',
        badgeColor: '#ef4444',
        heading: 'Submission Does Not Exist',
        message: 'No submission record could be found with the provided identifier.',
        details: null,
        success: false,
      }), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    // Already verified?
    if (submission.isValid) {
      const existingEntry = await prisma.leaderboardEntry.findUnique({
        where: { participantId: submission.participantId },
      })

      return new NextResponse(renderHtmlPage({
        title: 'Already Verified',
        badge: 'ALREADY VERIFIED',
        badgeColor: '#00d2ff',
        heading: 'Submission Already Approved',
        message: 'This submission has already been verified and is live on the Public Leaderboard.',
        details: {
          name: submission.participant.name,
          email: submission.participant.email,
          rank: existingEntry?.rank ?? 1,
          time: new Intl.DateTimeFormat('en-IN', {
            dateStyle: 'full',
            timeStyle: 'medium',
            timeZone: 'Asia/Kolkata',
          }).format(submission.serverTime),
        },
        success: true,
      }), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    // Execute atomic verification and leaderboard insertion
    const result = await prisma.$transaction(async (tx) => {
      // 1. Mark submission valid and reviewed
      await tx.submission.update({
        where: { id: submission.id },
        data: {
          isValid: true,
          reviewedAt: new Date(),
          reviewNote: 'Approved via 1-Click Organizer Email Verification',
        },
      })

      // 2. Check First Blood
      const existingFirstBlood = await tx.firstBlood.findFirst()
      const isFirstBlood = !existingFirstBlood

      if (isFirstBlood) {
        await tx.firstBlood.create({
          data: {
            participantId: submission.participantId,
            submissionId: submission.id,
            serverTime: submission.serverTime,
            isPublic: true,
          },
        })

        await tx.submission.update({
          where: { id: submission.id },
          data: { isFirstBlood: true },
        })
      }

      // 3. Upsert Leaderboard Entry
      await tx.leaderboardEntry.upsert({
        where: { participantId: submission.participantId },
        update: {
          displayName: submission.participant.name,
          serverTime: submission.serverTime,
        },
        create: {
          participantId: submission.participantId,
          displayName: submission.participant.name,
          serverTime: submission.serverTime,
          rank: 999,
        },
      })

      // 4. Recalculate ranks ordered by original serverTime
      const allEntries = await tx.leaderboardEntry.findMany({
        orderBy: { serverTime: 'asc' },
      })

      for (let i = 0; i < allEntries.length; i++) {
        await tx.leaderboardEntry.update({
          where: { id: allEntries[i].id },
          data: { rank: i + 1 },
        })
      }

      const updatedEntry = await tx.leaderboardEntry.findUnique({
        where: { participantId: submission.participantId },
      })

      return {
        rank: updatedEntry?.rank ?? 1,
        isFirstBlood,
      }
    })

    // Dispatch celebration email to the student with their official rank
    sendStudentVerifiedEmail({
      name: submission.participant.name,
      email: submission.participant.email,
      rank: result.rank,
      isFirstBlood: result.isFirstBlood,
      serverTime: submission.serverTime,
    }).catch(err => console.error('[Verify] Student verified notification error:', err))

    const formattedTime = new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Kolkata',
    }).format(submission.serverTime)

    return new NextResponse(renderHtmlPage({
      title: result.isFirstBlood ? 'First Blood Verified!' : 'Submission Verified!',
      badge: result.isFirstBlood ? '🩸 FIRST BLOOD CHAMPION APPROVED' : '✓ OFFICIALLY VERIFIED',
      badgeColor: result.isFirstBlood ? '#ff0055' : '#00d2ff',
      heading: result.isFirstBlood ? 'First Blood Solved & Verified!' : 'Submission Approved & Published!',
      message: 'The participant has been officially validated. Their rank has been calculated using their atomic submission timestamp and published to the public leaderboard.',
      details: {
        name: submission.participant.name,
        email: submission.participant.email,
        rank: result.rank,
        time: formattedTime,
      },
      success: true,
    }), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })

  } catch (error) {
    console.error('[Verify API Error]:', error)
    return new NextResponse(renderHtmlPage({
      title: 'Server Error',
      badge: 'ERROR',
      badgeColor: '#ef4444',
      heading: 'Internal Processing Error',
      message: 'An error occurred while validating this submission. Please verify directly from the Admin Dashboard.',
      details: null,
      success: false,
    }), {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }
}

function renderHtmlPage(data: {
  title: string
  badge: string
  badgeColor: string
  heading: string
  message: string
  details: { name: string; email: string; rank: number; time: string } | null
  success: boolean
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${data.title} | APPISTRY</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #030612;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 24px;
          }
          .card {
            max-width: 540px;
            width: 100%;
            background: #070e24;
            border: 1px solid rgba(0, 210, 255, 0.25);
            border-radius: 24px;
            padding: 36px 32px;
            text-align: center;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
          }
          .badge {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            background: ${data.badgeColor}15;
            color: ${data.badgeColor};
            border: 1px solid ${data.badgeColor}40;
            margin-bottom: 20px;
          }
          h1 {
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 12px;
            color: #ffffff;
          }
          p {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.65);
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .details-box {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 28px;
            text-align: left;
          }
          .row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 13px;
          }
          .row:last-child { border-bottom: none; }
          .row .label { color: rgba(255, 255, 255, 0.4); font-family: monospace; text-transform: uppercase; font-size: 11px; }
          .row .val { color: #ffffff; font-weight: 600; }
          .buttons {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .btn-primary {
            background: #00d2ff;
            color: #02050f;
            font-weight: 800;
            font-size: 13px;
            padding: 12px 24px;
            border-radius: 12px;
            text-decoration: none;
            transition: all 0.2s;
          }
          .btn-secondary {
            background: rgba(255, 255, 255, 0.06);
            color: #ffffff;
            font-weight: 600;
            font-size: 13px;
            padding: 12px 24px;
            border-radius: 12px;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">${data.badge}</div>
          <h1>${data.heading}</h1>
          <p>${data.message}</p>
          
          ${data.details ? `
            <div class="details-box">
              <div class="row">
                <span class="label">Participant</span>
                <span class="val">${data.details.name}</span>
              </div>
              <div class="row">
                <span class="label">Student Email</span>
                <span class="val">${data.details.email}</span>
              </div>
              <div class="row">
                <span class="label">Official Rank</span>
                <span class="val" style="color: #00d2ff;">#${data.details.rank}</span>
              </div>
              <div class="row">
                <span class="label">Recorded Time</span>
                <span class="val">${data.details.time}</span>
              </div>
            </div>
          ` : ''}

          <div class="buttons">
            <a href="/leaderboard" class="btn-primary">View Public Leaderboard &rarr;</a>
            <a href="/admin/dashboard" class="btn-secondary">Admin Console</a>
          </div>
        </div>
      </body>
    </html>
  `
}

