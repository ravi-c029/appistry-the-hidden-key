import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { requireAdminSession, logAuditEvent } from '@/lib/auth/session'
import { sendStudentVerifiedEmail } from '@/lib/email/mailer'

export async function GET(req: NextRequest) {
  try {
    await requireAdminSession()
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const status = searchParams.get('status') // 'all', 'valid', 'invalid'
    const search = searchParams.get('search')?.trim() || ''

    const where: Record<string, unknown> = {}
    if (status === 'valid') where.isValid = true
    if (status === 'invalid') where.isValid = false
    if (search) {
      where.participant = {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
        ],
      }
    }

    const [total, submissions] = await Promise.all([
      prisma.submission.count({ where }),
      prisma.submission.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { serverTime: 'desc' },
        include: {
          participant: {
            select: { id: true, name: true, email: true, isVerified: true, isDisqualified: true },
          },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      submissions,
    })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAdminSession()
    const body = await req.json()
    const { submissionId, reviewNote, isValid } = body

    if (!submissionId) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 })
    }

    const submission = await prisma.$transaction(async (tx) => {
      const sub = await tx.submission.update({
        where: { id: submissionId },
        data: {
          ...(typeof isValid === 'boolean' ? { isValid } : {}),
          reviewNote: reviewNote !== undefined ? reviewNote : undefined,
          reviewedAt: new Date(),
        },
        include: { participant: true },
      })

      if (isValid === true) {
        // Check First Blood
        const existingFirstBlood = await tx.firstBlood.findFirst()
        const isFirstBlood = !existingFirstBlood

        if (isFirstBlood) {
          await tx.firstBlood.create({
            data: {
              participantId: sub.participantId,
              submissionId: sub.id,
              serverTime: sub.serverTime,
              isPublic: true,
            },
          })
          await tx.submission.update({
            where: { id: sub.id },
            data: { isFirstBlood: true },
          })
        }

        // Upsert Leaderboard Entry
        await tx.leaderboardEntry.upsert({
          where: { participantId: sub.participantId },
          update: {
            displayName: sub.participant.name,
            serverTime: sub.serverTime,
          },
          create: {
            participantId: sub.participantId,
            displayName: sub.participant.name,
            serverTime: sub.serverTime,
            rank: 999,
          },
        })

        // Recalculate ranks ordered by original serverTime
        const allEntries = await tx.leaderboardEntry.findMany({
          orderBy: { serverTime: 'asc' },
        })

        for (let i = 0; i < allEntries.length; i++) {
          await tx.leaderboardEntry.update({
            where: { id: allEntries[i].id },
            data: { rank: i + 1 },
          })
        }
      } else if (isValid === false) {
        // If disapproved, remove from leaderboard
        await tx.leaderboardEntry.deleteMany({
          where: { participantId: sub.participantId },
        })
        await tx.firstBlood.deleteMany({
          where: { submissionId: sub.id },
        })
      }

      return sub
    })

    if (isValid === true) {
      const entry = await prisma.leaderboardEntry.findUnique({
        where: { participantId: submission.participantId },
      })
      sendStudentVerifiedEmail({
        name: submission.participant.name,
        email: submission.participant.email,
        rank: entry?.rank ?? 1,
        isFirstBlood: submission.isFirstBlood,
        serverTime: submission.serverTime,
      }).catch(err => console.error('[Admin] Student verified email error:', err))
    }

    await logAuditEvent({
      adminId: session.adminId,
      action: 'REVIEW_SUBMISSION',
      target: 'submission',
      targetId: submissionId,
      metadata: { isValid, reviewNote },
    })

    return NextResponse.json({ success: true, submission })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
  }
}
