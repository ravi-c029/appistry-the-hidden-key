import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { AdminLoginSchema } from '@/lib/validation/schemas'
import { createAdminSession, setSessionCookie, logAuditEvent } from '@/lib/auth/session'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    let body: unknown
    try { body = await req.json() } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const parsed = AdminLoginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials format' }, { status: 400 })
    }

    const { email, password } = parsed.data
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    // Find admin
    const admin = await prisma.adminUser.findUnique({ where: { email } })

    if (!admin || !admin.isActive) {
      // Log failed attempt
      await logAuditEvent({
        action: 'ADMIN_LOGIN_FAILED',
        metadata: { email, reason: admin ? 'inactive' : 'not_found' },
        ipAddress: ip,
      })
      // Use constant time check to prevent user enumeration
      await bcrypt.compare(password, '$2b$12$invalidhashplaceholderXXXXXXXXXXXXXXXXXXXXXXXX')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const validPassword = await bcrypt.compare(password, admin.passwordHash)
    if (!validPassword) {
      await logAuditEvent({
        adminId: admin.id,
        action: 'ADMIN_LOGIN_FAILED',
        metadata: { reason: 'wrong_password' },
        ipAddress: ip,
      })
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create session token
    const token = await createAdminSession({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    })

    // Update last login
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    })

    // Log success
    await logAuditEvent({
      adminId: admin.id,
      action: 'ADMIN_LOGIN_SUCCESS',
      ipAddress: ip,
    })

    // Set session cookie
    await setSessionCookie(token)

    return NextResponse.json({
      success: true,
      admin: { name: admin.name, email: admin.email, role: admin.role },
    })
  } catch (error) {
    console.error('[API] /api/admin/auth/login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
