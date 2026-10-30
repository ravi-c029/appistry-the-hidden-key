import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { requireAdminSession, logAuditEvent } from '@/lib/auth/session'
import { HintSchema } from '@/lib/validation/schemas'

export async function GET() {
  try {
    await requireAdminSession()
    const hints = await prisma.hint.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ success: true, hints })
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
    const validated = HintSchema.parse(body)

    const hint = await prisma.hint.create({
      data: {
        title: validated.title,
        content: validated.content,
        order: validated.order,
        isPublished: validated.isPublished,
        publishedAt: validated.isPublished ? new Date() : null,
        scheduledAt: validated.scheduledAt ? new Date(validated.scheduledAt) : null,
      },
    })

    await logAuditEvent({
      adminId: session.adminId,
      action: 'CREATE_HINT',
      target: 'hint',
      targetId: hint.id,
      metadata: { title: hint.title },
    })

    return NextResponse.json({ success: true, hint }, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to create hint' }, { status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAdminSession()
    const body = await req.json()
    const { id, isPublished, ...rest } = body

    if (!id) {
      return NextResponse.json({ error: 'Hint ID required' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = { ...rest }
    if (typeof isPublished === 'boolean') {
      updateData.isPublished = isPublished
      if (isPublished) updateData.publishedAt = new Date()
    }

    const hint = await prisma.hint.update({
      where: { id },
      data: updateData,
    })

    await logAuditEvent({
      adminId: session.adminId,
      action: 'UPDATE_HINT',
      target: 'hint',
      targetId: id,
      metadata: updateData,
    })

    return NextResponse.json({ success: true, hint })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update hint' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAdminSession()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Hint ID is required' }, { status: 400 })
    }

    await prisma.hint.delete({ where: { id } })

    await logAuditEvent({
      adminId: session.adminId,
      action: 'DELETE_HINT',
      target: 'hint',
      targetId: id,
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to delete hint' }, { status: 500 })
  }
}
