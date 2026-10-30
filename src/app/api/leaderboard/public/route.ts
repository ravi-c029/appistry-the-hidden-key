import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { getEventConfig } from '@/lib/utils/event-config'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200)

    const leaderboardPublic = await getEventConfig('leaderboardPublic')
    if (leaderboardPublic === 'false') {
      return NextResponse.json({ isPublic: false, entries: [] })
    }

    const entries = await prisma.leaderboardEntry.findMany({
      where: { isVisible: true },
      orderBy: { rank: 'asc' },
      take: limit,
    })

    const firstBlood = await prisma.firstBlood.findFirst({
      select: { participantId: true, isPublic: true },
    })

    return NextResponse.json({
      isPublic: true,
      entries: entries.map(e => ({
        rank: e.rank,
        displayName: e.displayName,
        serverTime: e.serverTime.toISOString(),
        isFirstBlood: firstBlood?.isPublic && firstBlood.participantId === e.participantId,
      })),
    })
  } catch (error) {
    console.error('[API] /api/leaderboard/public error:', error)
    return NextResponse.json({ isPublic: true, entries: [] })
  }
}

export const dynamic = 'force-dynamic'
