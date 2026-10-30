import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { requireAdminSession, logAuditEvent } from '@/lib/auth/session'

export async function GET() {
  try {
    await requireAdminSession()
    const entries = await prisma.leaderboardEntry.findMany({
      orderBy: { rank: 'asc' },
    })

    const firstBlood = await prisma.firstBlood.findFirst({
      include: {
        participant: {
          select: { name: true, email: true },
        },
      },
    })

    return NextResponse.json({ success: true, entries, firstBlood })
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
    const { id, isVisible, displayName } = body

    if (!id) {
      return NextResponse.json({ error: 'Leaderboard entry ID required' }, { status: 400 })
    }

    const updated = await prisma.leaderboardEntry.update({
      where: { id },
      data: {
        ...(typeof isVisible === 'boolean' ? { isVisible } : {}),
        ...(displayName ? { displayName: displayName.trim() } : {}),
      },
    })

    await logAuditEvent({
      adminId: session.adminId,
      action: 'UPDATE_LEADERBOARD_ENTRY',
      target: 'leaderboard_entry',
      targetId: id,
      metadata: { isVisible, displayName },
    })

    return NextResponse.json({ success: true, entry: updated })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 })
  }
}
