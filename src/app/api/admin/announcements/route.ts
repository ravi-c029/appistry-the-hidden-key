import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { requireAdminSession, logAuditEvent } from '@/lib/auth/session'
import { AnnouncementSchema } from '@/lib/validation/schemas'

export async function GET() {
  try {
    await requireAdminSession()
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, announcements })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdminSession()
    const body = await req.json()
    const validated = AnnouncementSchema.parse(body)

    const announcement = await prisma.announcement.create({
      data: {
        title: validated.title,
        content: validated.content,
        type: validated.type,
        isPublished: validated.isPublished,
        publishedAt: validated.isPublished ? new Date() : null,
        scheduledAt: validated.scheduledAt ? new Date(validated.scheduledAt) : null,
      },
    })

    await logAuditEvent({
      adminId: session.adminId,
      action: 'CREATE_ANNOUNCEMENT',
      target: 'announcement',
      targetId: announcement.id,
      metadata: { title: announcement.title, type: announcement.type },
    })

    return NextResponse.json({ success: true, announcement }, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAdminSession()
    const body = await req.json()
    const { id, isPublished, ...rest } = body

    if (!id) {
      return NextResponse.json({ error: 'Announcement ID required' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = { ...rest }
    if (typeof isPublished === 'boolean') {
      updateData.isPublished = isPublished
      if (isPublished) updateData.publishedAt = new Date()
    }

    const announcement = await prisma.announcement.update({
      where: { id },
      data: updateData,
    })

    await logAuditEvent({
      adminId: session.adminId,
      action: 'UPDATE_ANNOUNCEMENT',
      target: 'announcement',
      targetId: id,
      metadata: updateData,
    })

    return NextResponse.json({ success: true, announcement })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAdminSession()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Announcement ID is required' }, { status: 400 })
    }

    await prisma.announcement.delete({ where: { id } })

    await logAuditEvent({
      adminId: session.adminId,
      action: 'DELETE_ANNOUNCEMENT',
      target: 'announcement',
      targetId: id,
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 })
  }
}
