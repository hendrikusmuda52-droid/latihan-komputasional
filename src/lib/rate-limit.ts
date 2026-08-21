import { NextRequest, NextResponse } from 'next/server'
import { getTeacherFromToken } from '@/lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// Rate Limiter — simple in-memory rate limiting for AI generation endpoints
//
// PROBLEM: AI generation endpoints (generate-questions, generate-material,
// generate-from-document, generate-infographic) call Gemini API which has
// quota limits. Without rate limiting, a single teacher could spam the
// endpoint and exhaust the quota for ALL teachers.
//
// SOLUTION: Simple in-memory rate limiter using Map<teacherId, timestamp[]>.
// - Limits: 10 requests per minute per teacher (per endpoint)
// - Window: 60 seconds rolling window
// - Storage: in-memory Map (resets on serverless cold start — acceptable
//   for this use case; for stricter limits use Vercel KV or Upstash Redis)
//
// USAGE in API route:
//   import { checkRateLimit } from '@/lib/rate-limit'
//   const rateLimit = checkRateLimit(req, 'generate-questions')
//   if (rateLimit) return rateLimit  // 429 response
//
// The function returns a NextResponse (429) if rate limited, or null if OK.
// ─────────────────────────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60 * 1000  // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10       // 10 requests per minute per teacher per endpoint

// Map key: `${teacherId}:${endpoint}`
// Map value: array of timestamps (ms since epoch)
const requestLog = new Map<string, number[]>()

// Cleanup old entries every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanupOldEntries() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now

  const cutoff = now - RATE_LIMIT_WINDOW_MS
  for (const [key, timestamps] of requestLog.entries()) {
    const recent = timestamps.filter((t) => t > cutoff)
    if (recent.length === 0) {
      requestLog.delete(key)
    } else {
      requestLog.set(key, recent)
    }
  }
}

/**
 * Check rate limit for a given endpoint.
 * Returns a NextResponse (429) if rate limited, or null if request is allowed.
 *
 * @param req NextRequest — used to extract teacherId from JWT
 * @param endpoint string — endpoint identifier (e.g., 'generate-questions')
 * @returns NextResponse (429) if rate limited, null if OK
 */
export function checkRateLimit(req: NextRequest, endpoint: string): NextResponse | null {
  cleanupOldEntries()

  const teacher = getTeacherFromToken(req)
  if (!teacher) {
    // If no teacher token, let the normal auth check handle it (return null = proceed)
    return null
  }

  const key = `${teacher.teacherId}:${endpoint}`
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS

  // Get existing timestamps, filter out expired ones
  const existing = (requestLog.get(key) || []).filter((t) => t > cutoff)

  if (existing.length >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limited — calculate retry-after
    const oldestInWindow = existing[0]
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - oldestInWindow)
    const retryAfterSec = Math.ceil(retryAfterMs / 1000)

    return NextResponse.json(
      {
        error: `Batas permintaan AI tercapai. Maksimal ${RATE_LIMIT_MAX_REQUESTS} permintaan per menit.`,
        retryAfter: retryAfterSec,
        limit: RATE_LIMIT_MAX_REQUESTS,
        window: '60s',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSec),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil((oldestInWindow + RATE_LIMIT_WINDOW_MS) / 1000)),
        },
      },
    )
  }

  // Allow request — record timestamp
  existing.push(now)
  requestLog.set(key, existing)

  return null
}
