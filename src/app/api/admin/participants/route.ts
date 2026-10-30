import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { requireAdminSession, logAuditEvent } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  try {
    await requireAdminSession()
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const search = searchParams.get('search')?.trim() || ''

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {}

    const [total, participants] = await Promise.all([
      prisma.participant.count({ where }),
      prisma.participant.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          submissions: {
            orderBy: { serverTime: 'desc' },
            take: 5,
          },
          firstBlood: true,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      participants,
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
    const { participantId, isVerified, isDisqualified, disqualifiedReason } = body

    if (!participantId) {
      return NextResponse.json({ error: 'Participant ID is required' }, { status: 400 })
    }

    const updated = await prisma.participant.update({
      where: { id: participantId },
      data: {
        ...(typeof isVerified === 'boolean' ? { isVerified } : {}),
        ...(typeof isDisqualified === 'boolean' ? { isDisqualified, disqualifiedReason: disqualifiedReason || null } : {}),
      },
    })

    await logAuditEvent({
      adminId: session.adminId,
      action: 'UPDATE_PARTICIPANT',
      target: 'participant',
      targetId: participantId,
      metadata: { isVerified, isDisqualified, disqualifiedReason },
    })

    return NextResponse.json({ success: true, participant: updated })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update participant' }, { status: 500 })
  }
}
