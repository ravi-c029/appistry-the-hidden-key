import { timingSafeEqual, createHash, createHmac } from 'crypto'

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

  // Support the primary secret, plus clean variants if wrapped in APPISTRY{...}
  const acceptable = [secret]
  if (secret.startsWith('APPISTRY{') && secret.endsWith('}')) {
    const inner = secret.slice(9, -1)
    acceptable.push(inner)
    acceptable.push(inner.replace(/_/g, ' '))
    acceptable.push(inner.replace(/\s+/g, '_'))
  }

  const hashSubmitted = createHash('sha256').update(normalizedSubmitted).digest()

  for (const item of acceptable) {
    const hashTarget = createHash('sha256').update(normalize(item)).digest()
    try {
      if (timingSafeEqual(hashSubmitted, hashTarget)) {
        return true
      }
    } catch {}
  }

  return false
}

/**
 * Validates that an email strictly belongs to IIT Patna (@iitp.ac.in).
 */
export function isEligibleEmail(email: string): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  return normalized.endsWith('@iitp.ac.in')
}

/**
 * Generates a tamper-proof HMAC verification token for a submission.
 */
export function generateSubmissionToken(submissionId: string): string {
  const secret = process.env.SESSION_SECRET || 'appistry-secret-token'
  return createHmac('sha256', secret).update(submissionId).digest('hex')
}

/**
 * Verifies the submission HMAC token safely.
 */
export function verifySubmissionToken(submissionId: string, token: string): boolean {
  if (!submissionId || !token) return false
  const expected = generateSubmissionToken(submissionId)
  const hashExpected = createHash('sha256').update(expected).digest()
  const hashToken = createHash('sha256').update(token).digest()
  try {
    return timingSafeEqual(hashExpected, hashToken)
  } catch {
    return false
  }
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

/**
 * Global submission rate limiter:
 * Maximum 20 submissions per 60-second window across all participants.
 */
let minuteSubmissionTimestamps: number[] = []
const GLOBAL_SUBMISSION_LIMIT_PER_MINUTE = 20
const ONE_MINUTE_MS = 60 * 1000

export function checkGlobalMinuteRateLimit(): { allowed: boolean; count: number; secondsLeft: number } {
  const now = Date.now()
  // Clean timestamps older than 60 seconds
  minuteSubmissionTimestamps = minuteSubmissionTimestamps.filter(t => now - t < ONE_MINUTE_MS)

  if (minuteSubmissionTimestamps.length >= GLOBAL_SUBMISSION_LIMIT_PER_MINUTE) {
    const oldestTimestamp = minuteSubmissionTimestamps[0]
    const waitMs = oldestTimestamp + ONE_MINUTE_MS - now
    const secondsLeft = Math.max(1, Math.ceil(waitMs / 1000))
    return { allowed: false, count: minuteSubmissionTimestamps.length, secondsLeft }
  }

  return { allowed: true, count: minuteSubmissionTimestamps.length, secondsLeft: 0 }
}

export function recordGlobalMinuteSubmission(): void {
  minuteSubmissionTimestamps.push(Date.now())
}
