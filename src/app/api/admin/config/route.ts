import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession, logAuditEvent } from '@/lib/auth/session'
import { getAllEventConfig, setEventConfig } from '@/lib/utils/event-config'

export async function GET() {
  try {
    await requireAdminSession()
    const config = await getAllEventConfig()
    return NextResponse.json({ success: true, config })
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

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        await setEventConfig(key, value)
      } else if (typeof value === 'boolean' || typeof value === 'number') {
        await setEventConfig(key, String(value))
      } else if (typeof value === 'object' && value !== null) {
        await setEventConfig(key, JSON.stringify(value))
      }
    }

    await logAuditEvent({
      adminId: session.adminId,
      action: 'UPDATE_EVENT_CONFIG',
      target: 'event_config',
      metadata: body,
    })

    const updated = await getAllEventConfig()
    return NextResponse.json({ success: true, config: updated })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 })
  }
}
