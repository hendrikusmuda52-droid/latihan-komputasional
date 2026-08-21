import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// ForceStop API — REWRITTEN (Bug #5 fix)
//
// Before: Used db.$queryRaw and db.$executeRaw because ForceStop model was
//         not in Prisma schema. Had to CREATE TABLE IF NOT EXISTS on first
//         POST, which was slow and fragile.
//
// After:  ForceStop is now a proper Prisma model. We use db.forceStop.findFirst()
//         and db.forceStop.create() — type-safe, no raw SQL, no table creation
//         at runtime.
// ─────────────────────────────────────────────────────────────────────────────

// GET: check if there's an active force-stop signal for this subject
// Student-side polls this every 3 seconds during assignment
// ?subject=Informatika
export async function GET(req: NextRequest) {
  try {
    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'
    const now = new Date()
    const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000)

    // Use Prisma ORM — findFirst returns null if no record found.
    // Query: active force-stop for this subject, triggered in last 2 min,
    // and still in the future (not expired).
    try {
      const stop = await db.forceStop.findFirst({
        where: {
          subject,
          triggeredAt: { gt: twoMinutesAgo },
          expiresAt: { gt: now },
        },
        orderBy: { triggeredAt: 'desc' },
      })

      if (stop) {
        const remainingMs = stop.expiresAt.getTime() - Date.now()
        const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000))

        return NextResponse.json({
          active: true,
          forceStopId: stop.id,
          remainingSeconds,
          expiresAt: stop.expiresAt,
        })
      }

      return NextResponse.json({ active: false })
    } catch (dbErr) {
      // DB transient error — fail gracefully (return active: false)
      // so student UI doesn't crash. Student will retry in 3s on next poll.
      console.error('[force-stop] GET DB error:', dbErr)
      return NextResponse.json({ active: false })
    }
  } catch (error) {
    console.error('[force-stop] GET error:', error)
    return NextResponse.json({ active: false })
  }
}

// POST: teacher triggers force-stop for their subject
// Creates a force-stop record with 1-minute countdown
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const countdownSeconds = 60 // 1 minute countdown

    const now = new Date()
    const expiresAt = new Date(now.getTime() + countdownSeconds * 1000)

    // Use Prisma ORM — db.forceStop.create() is type-safe and will fail
    // loudly if the table is missing (which shouldn't happen now that the
    // model is in schema.prisma + migration applied).
    try {
      await db.forceStop.create({
        data: {
          subject: teacherSubject,
          triggeredAt: now,
          expiresAt,
          countdownSeconds,
          teacherId: teacher.teacherId,
        },
      })
    } catch (dbErr) {
      // If table still missing (e.g., migration not yet applied on this
      // environment), return 500 with helpful message. Do NOT try to
      // CREATE TABLE on-demand — that was the old fragile pattern.
      console.error('[force-stop] POST create error (migration may be pending):', dbErr)
      return NextResponse.json(
        {
          error: 'Tabel ForceStop belum tersedia. Jalankan: npx prisma migrate deploy',
          detail: dbErr instanceof Error ? dbErr.message : 'Unknown DB error',
        },
        { status: 500 },
      )
    }

    // Best-effort cleanup: delete expired force-stop records older than 2 hours
    // to prevent table bloat. Run in background, don't block the response.
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
    db.forceStop.deleteMany({ where: { expiresAt: { lt: twoHoursAgo } } })
      .catch((e) => console.error('[force-stop] cleanup error (non-blocking):', e))

    return NextResponse.json({
      success: true,
      message: `Force-stop diaktifkan untuk mapel ${teacherSubject}. Siswa memiliki ${countdownSeconds} detik untuk menyelesaikan.`,
      expiresAt: expiresAt.toISOString(),
      countdownSeconds,
    })
  } catch (error) {
    console.error('[force-stop] POST error:', error)
    return NextResponse.json({ error: 'Gagal mengaktifkan force-stop' }, { status: 500 })
  }
}
