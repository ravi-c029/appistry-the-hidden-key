import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { prisma } from '@/lib/database/prisma'

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'appistry_session'
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-dev-secret-change-in-production')

export interface AdminPayload {
  adminId: string
  email: string
  name: string
  role: string
}

export async function createAdminSession(admin: AdminPayload): Promise<string> {
  const token = await new SignJWT({ ...admin })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)

  return token
}

export async function getAdminSession(): Promise<AdminPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminPayload
  } catch {
    return null
  }
}

export async function requireAdminSession(): Promise<AdminPayload> {
  const session = await getAdminSession()
  if (!session) {
    throw new Error('UNAUTHORIZED')
  }
  return session
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function logAuditEvent({
  adminId,
  action,
  target,
  targetId,
  metadata,
  ipAddress,
}: {
  adminId?: string
  action: string
  target?: string
  targetId?: string
  metadata?: Record<string, unknown>
  ipAddress?: string
}) {
  await prisma.auditLog.create({
    data: {
      adminId,
      action,
      target,
      targetId,
      metadata: metadata ? JSON.stringify(metadata) : undefined,
      ipAddress,
    },
  })
}
