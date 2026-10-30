import { timingSafeEqual, createHash } from 'crypto'

/**
 * Verifies the submitted keyword against the server-side secret.
 * Uses timing-safe comparison to prevent timing attacks.
 * The secret keyword is NEVER exposed to the client.
 */
export function verifySecretKeyword(submitted: string): boolean {
  const secret = process.env.EVENT_SECRET_KEYWORD
  if (!secret) {
    console.error('[Security] EVENT_SECRET_KEYWORD environment variable is not set!')
    return false
  }

  // Normalize: uppercase, trim all whitespace
  const normalize = (s: string) => s.trim().toUpperCase().replace(/\s+/g, ' ')

  const normalizedSubmitted = normalize(submitted)
  const normalizedSecret = normalize(secret)

  // Use timing-safe comparison via hash to handle different-length strings safely
  const hashSubmitted = createHash('sha256').update(normalizedSubmitted).digest()
  const hashSecret = createHash('sha256').update(normalizedSecret).digest()

  try {
    return timingSafeEqual(hashSubmitted, hashSecret)
  } catch {
    return false
  }
}

/**
 * Validates that an email belongs to IIT Patna or the admin allowlist.
 */
export function isEligibleEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase()

  // Primary IITP domain
  if (normalized.endsWith('@iitp.ac.in')) return true

  // Allow additional domains from admin config (can be extended)
  const allowedDomains = (process.env.ALLOWED_EMAIL_DOMAINS || '').split(',')
    .map(d => d.trim().toLowerCase())
    .filter(Boolean)

  return allowedDomains.some(domain => normalized.endsWith(`@${domain}`))
}

/**
 * Rate limit check using in-memory store.
 * For production, use Redis or a database-backed store.
 */

type RateLimitEntry = { count: number; resetAt: number }
const rateLimitStore = new Map<string, RateLimitEntry>()

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
  const windowMs = parseInt(process.env.SUBMISSION_RATE_LIMIT_WINDOW_MS || '900000')
  const maxAttempts = parseInt(process.env.SUBMISSION_RATE_LIMIT_MAX || '5')
  const now = Date.now()

  const entry = rateLimitStore.get(identifier)

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs
    rateLimitStore.set(identifier, { count: 1, resetAt })
    return { allowed: true, remaining: maxAttempts - 1, resetAt }
  }

  if (entry.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: maxAttempts - entry.count, resetAt: entry.resetAt }
}
