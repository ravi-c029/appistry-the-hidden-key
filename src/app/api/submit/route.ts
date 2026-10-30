import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { SubmissionSchema } from '@/lib/validation/schemas'
import { verifySecretKeyword, isEligibleEmail, checkRateLimit } from '@/lib/security/verify'

export async function POST(req: NextRequest) {
  try {
    // Parse and validate body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const parsed = SubmissionSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.issues?.[0]?.message || 'Invalid input'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { name, email, keyword } = parsed.data

    // Rate limit by IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    const rateLimit = checkRateLimit(`submit:${ip}`)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many submission attempts. Please wait ${Math.ceil((rateLimit.resetAt - Date.now()) / 60000)} minutes.`,
        },
        { status: 429 }
      )
    }

    // Email eligibility check
    if (!isEligibleEmail(email)) {
      return NextResponse.json(
        { error: 'Only IIT Patna students with a valid @iitp.ac.in email can participate.' },
        { status: 403 }
      )
    }

    // Check event config — are submissions open?
    const submissionsConfigRecord = await prisma.eventConfig.findUnique({ where: { key: 'submissionsOpen' } })
    const submissionsOpen = submissionsConfigRecord?.value !== 'false'
    if (!submissionsOpen) {
      return NextResponse.json({ error: 'Submissions are currently closed.' }, { status: 403 })
    }

    // Check duplicate email
    const existingParticipant = await prisma.participant.findUnique({ where: { email } })
    if (existingParticipant) {
      const existingValidSubmission = await prisma.submission.findFirst({
        where: { participantId: existingParticipant.id, isValid: true },
      })
      if (existingValidSubmission) {
        return NextResponse.json(
          { error: 'You have already submitted a valid answer. Only one submission per participant is allowed.' },
          { status: 409 }
        )
      }
    }

    // Server-side keyword verification (NEVER exposed to client)
    const isCorrect = verifySecretKeyword(keyword)

    // Record submission atomically
    const result = await prisma.$transaction(async (tx) => {
      // Upsert participant
      const participant = await tx.participant.upsert({
        where: { email },
        update: { name },
        create: { name, email, isVerified: true },
      })

      // Record submission with server timestamp
      const submission = await tx.submission.create({
        data: {
          participantId: participant.id,
          keyword: isCorrect ? '[CORRECT]' : '[REDACTED]', // Never store plaintext
          isValid: isCorrect,
          ipAddress: ip,
          userAgent: req.headers.get('user-agent') || undefined,
        },
      })

      if (!isCorrect) {
        return { success: false, isFirstBlood: false, rank: null }
      }

      // Check if First Blood
      const existingFirstBlood = await tx.firstBlood.findFirst()
      const isFirstBlood = !existingFirstBlood

      if (isFirstBlood) {
        await tx.firstBlood.create({
          data: {
            participantId: participant.id,
            submissionId: submission.id,
            serverTime: submission.serverTime,
          },
        })

        await tx.submission.update({
          where: { id: submission.id },
          data: { isFirstBlood: true },
        })
      }

      // Create or update leaderboard entry
      const rank = await tx.leaderboardEntry.count() + 1
      await tx.leaderboardEntry.upsert({
        where: { participantId: participant.id },
        update: {},
        create: {
          participantId: participant.id,
          displayName: name,
          serverTime: submission.serverTime,
          rank,
        },
      })

      // Recalculate ranks by serverTime
      const allEntries = await tx.leaderboardEntry.findMany({
        orderBy: { serverTime: 'asc' },
      })
      for (let i = 0; i < allEntries.length; i++) {
        await tx.leaderboardEntry.update({
          where: { id: allEntries[i].id },
          data: { rank: i + 1 },
        })
      }

      const finalEntry = await tx.leaderboardEntry.findUnique({
        where: { participantId: participant.id },
      })

      return {
        success: true,
        isFirstBlood,
        rank: finalEntry?.rank ?? rank,
      }
    })

    if (!result.success) {
      return NextResponse.json(
        { error: 'Incorrect keyword. Keep exploring the repository.' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      isFirstBlood: result.isFirstBlood,
      rank: result.rank,
      message: result.isFirstBlood
        ? '🩸 FIRST BLOOD! You are the first to solve THE HIDDEN KEY!'
        : `Correct! You've been ranked #${result.rank} on the leaderboard.`,
    })
  } catch (error) {
    console.error('[API] /api/submit error:', error)
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 })
  }
}
