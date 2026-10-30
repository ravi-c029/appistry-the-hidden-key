import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession, clearSessionCookie, logAuditEvent } from '@/lib/auth/session'

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdminSession()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    await logAuditEvent({
      adminId: session.adminId,
      action: 'ADMIN_LOGOUT',
      ipAddress: ip,
    })

    await clearSessionCookie()
    return NextResponse.json({ success: true })
  } catch {
    await clearSessionCookie()
    return NextResponse.json({ success: true })
  }
}
