import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { requireAdminSession } from '@/lib/auth/session'

export async function GET() {
  try {
    await requireAdminSession()

    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000)

    const [
      totalVisitors,
      activeVisitors,
      totalParticipants,
      verifiedParticipants,
      totalSubmissions,
      validSubmissions,
      firstBlood,
      recentSubmissions,
      recentLogs,
    ] = await Promise.all([
      prisma.visitorSession.count(),
      prisma.visitorSession.count({
        where: { lastSeen: { gte: fifteenMinutesAgo } },
      }),
      prisma.participant.count(),
      prisma.participant.count({ where: { isVerified: true } }),
      prisma.submission.count(),
      prisma.submission.count({ where: { isValid: true } }),
      prisma.firstBlood.findFirst({
        include: {
          participant: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.submission.findMany({
        take: 8,
        orderBy: { serverTime: 'desc' },
        include: {
          participant: {
            select: { name: true, email: true, isVerified: true },
          },
        },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            select: { name: true, email: true },
          },
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalVisitors,
        activeVisitors,
        totalParticipants,
        verifiedParticipants,
        totalSubmissions,
        validSubmissions,
        failedSubmissions: totalSubmissions - validSubmissions,
        firstBlood: firstBlood
          ? {
              winnerName: firstBlood.participant.name,
              winnerEmail: firstBlood.participant.email,
              serverTime: firstBlood.serverTime,
              isPublic: firstBlood.isPublic,
            }
          : null,
      },
      recentSubmissions,
      recentLogs,
    })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Admin overview error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
