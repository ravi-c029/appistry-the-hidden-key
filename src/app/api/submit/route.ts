import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { SubmissionSchema } from '@/lib/validation/schemas'
import {
  verifySecretKeyword,
  isEligibleEmail,
  checkRateLimit,
  checkGlobalMinuteRateLimit,
  recordGlobalMinuteSubmission,
  generateSubmissionToken,
} from '@/lib/security/verify'
import { sendSubmissionNotification, sendStudentReceiptEmail } from '@/lib/email/mailer'

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

    // Global submission rate limit: strictly max 20 submissions per minute
    const globalRate = checkGlobalMinuteRateLimit()
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000)
    const recentSubmissionsCount = await prisma.submission.count({
      where: { serverTime: { gte: oneMinuteAgo } },
    })

    if (!globalRate.allowed || recentSubmissionsCount >= 20) {
      return NextResponse.json(
        {
          error: 'Is minute ke andar 20 submissions receive ho chuke hain. High server traffic ki wajah se kripya agle minute me dobara try kijiye (20 submissions limit reached for this minute. Please try again in the next minute).',
          code: 'RATE_LIMIT_GLOBAL_MINUTE',
        },
        { status: 429 }
      )
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    // Email eligibility check — strictly @iitp.ac.in
    if (!isEligibleEmail(email)) {
      return NextResponse.json(
        { error: 'Only official IIT Patna student email addresses (@iitp.ac.in) are permitted to submit.' },
        { status: 403 }
      )
    }

    // Check event config — are submissions open?
    const submissionsConfigRecord = await prisma.eventConfig.findUnique({ where: { key: 'submissionsOpen' } })
    const submissionsOpen = submissionsConfigRecord?.value !== 'false'
    if (!submissionsOpen) {
      return NextResponse.json({ error: 'Submissions are currently closed.' }, { status: 403 })
    }

    // Check duplicate email — strictly 1 submission per email allowed ever
    const existingParticipant = await prisma.participant.findUnique({ where: { email } })
    if (existingParticipant) {
      const existingSubmission = await prisma.submission.findFirst({
        where: { participantId: existingParticipant.id },
      })
      if (existingSubmission) {
        return NextResponse.json(
          {
            error: 'Aap is email address se pehle hi ek submission kar chuke hain. Har participant ko sirf ek submission ki anumati hai (Only 1 submission allowed per email).',
          },
          { status: 409 }
        )
      }
    }

    // Server-side keyword verification (NEVER exposed to client)
    const isCorrect = verifySecretKeyword(keyword)

    // Record submission atomically
    const submissionResult = await prisma.$transaction(async (tx) => {
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
          keyword: isCorrect ? '[CORRECT]' : '[REDACTED]',
          isValid: false, // Remains false until organizer verifies
          ipAddress: ip,
          userAgent: req.headers.get('user-agent') || undefined,
        },
      })

      const existingFirstBlood = await tx.firstBlood.findFirst()
      const isFirstBloodCandidate = !existingFirstBlood && isCorrect

      return {
        submissionId: submission.id,
        isCorrect,
        isFirstBloodCandidate,
        serverTime: submission.serverTime,
      }
    })

    // Track for minute rate limit
    recordGlobalMinuteSubmission()

    if (!submissionResult.isCorrect) {
      // Dispatch alert for invalid attempt
      sendSubmissionNotification({
        submissionId: submissionResult.submissionId,
        name,
        email,
        isKeywordCorrect: false,
        isFirstBloodCandidate: false,
        serverTime: submissionResult.serverTime,
        ip,
        userAgent: req.headers.get('user-agent') || undefined,
      }).catch(err => console.error('[Submit] Alert error:', err))

      return NextResponse.json(
        { error: 'Incorrect keyword. Keep exploring the repository.' },
        { status: 400 }
      )
    }

    // Generate 1-click verification token for the organizer
    const verificationToken = generateSubmissionToken(submissionResult.submissionId)

    // Dispatch real-time submission notification email with Verify button to Organizer
    sendSubmissionNotification({
      submissionId: submissionResult.submissionId,
      verificationToken,
      name,
      email,
      isKeywordCorrect: true,
      isFirstBloodCandidate: submissionResult.isFirstBloodCandidate,
      serverTime: submissionResult.serverTime,
      ip,
      userAgent: req.headers.get('user-agent') || undefined,
    }).catch(err => console.error('[Submit] Alert error:', err))

    // Dispatch automatic confirmation receipt email to the Student
    sendStudentReceiptEmail({
      name,
      email,
      serverTime: submissionResult.serverTime,
    }).catch(err => console.error('[Submit] Student receipt error:', err))

    return NextResponse.json({
      success: true,
      pendingVerification: true,
      message: "We've safely received your submission! Your exact timestamp has been recorded. Our team will verify all submissions against the official keyword after the challenge wraps up, and winners will be announced.",
    })
  } catch (error) {
    console.error('[API] /api/submit error:', error)
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 })
  }
}
