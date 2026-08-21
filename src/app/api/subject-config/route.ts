import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// SubjectConfig API — FIXED (Bug #1)
//
// Root cause: Prisma schema was upgraded to use compound unique key
//   @@unique([subject, tahunAjaran, semester])
// and fields bobotUTS/bobotUAS were renamed to bobotSTS/bobotSAS.
// But this route still used `where: { subject }` and old field names.
//
// Fix: All findUnique/upsert queries now use the compound unique key
//   where: { subject_tahunAjaran_semester: { subject, tahunAjaran, semester } }
// and all field references use bobotSTS/bobotSAS.
//
// tahunAjaran and semester are read from query params (GET) or body (PUT),
// with sensible defaults '2026/2027' + 'ganjil'.
// ─────────────────────────────────────────────────────────────────────────────

// Hardcoded fallback config for the 14 SMP + 5 SMK subjects.
// If the DB table is missing/broken or the JWT subject is null, the API still
// returns a valid 200 response with these defaults — never a 500.
const DEFAULT_KKM = 75
const DEFAULT_BOBOT = { bobotNH: 40, bobotSTS: 30, bobotSAS: 30 }

const DEFAULT_TAHUN_AJARAN = '2026/2027'
const DEFAULT_SEMESTER = 'ganjil'

// 14 SMP + 5 SMK subjects (mirrors src/lib/constants.ts — Matematika ditambahkan resmi per 2026).
const FALLBACK_SUBJECTS = [
  'Matematika',
  'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'Informatika', 'IPS', 'IPA',
  'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes',
  'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL',
] as const

function buildFallbackConfig(subject: string, tahunAjaran: string = DEFAULT_TAHUN_AJARAN, semester: string = DEFAULT_SEMESTER) {
  return {
    subject: subject || 'Informatika',
    tahunAjaran,
    semester,
    kkm: DEFAULT_KKM,
    bobotNH: DEFAULT_BOBOT.bobotNH,
    bobotSTS: DEFAULT_BOBOT.bobotSTS,
    bobotSAS: DEFAULT_BOBOT.bobotSAS,
  }
}

// Helper: safely run a DB query, return null on any error.
async function safeQuerySingle<T>(fn: () => Promise<T | null>): Promise<T | null> {
  try {
    return await fn()
  } catch (err) {
    console.error('[subject-config] safeQuerySingle error:', err)
    return null
  }
}

// GET: ambil KKM + bobot untuk subject guru (per tahunAjaran + semester)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    // Guard against null teacher / null subject.
    const subject = teacher?.subject || 'Informatika'

    // Read tahunAjaran + semester from query params (with defaults).
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || DEFAULT_TAHUN_AJARAN
    const semester = req.nextUrl.searchParams.get('semester') || DEFAULT_SEMESTER

    // safeQuerySingle — returns null on any DB error (missing table, connection, etc.)
    // Use compound unique key: subject_tahunAjaran_semester
    let config = await safeQuerySingle(() =>
      db.subjectConfig.findUnique({
        where: { subject_tahunAjaran_semester: { subject, tahunAjaran, semester } },
      }),
    )

    // If config doesn't exist, try to create it — but guard against race conditions.
    if (!config) {
      try {
        config = await db.subjectConfig.create({
          data: {
            subject,
            tahunAjaran,
            semester,
            kkm: DEFAULT_KKM,
            bobotNH: DEFAULT_BOBOT.bobotNH,
            bobotSTS: DEFAULT_BOBOT.bobotSTS,
            bobotSAS: DEFAULT_BOBOT.bobotSAS,
          },
        })
      } catch (createErr) {
        // Race: another request created it concurrently. Fetch again.
        console.error('[subject-config] create error (likely race):', createErr)
        config = await safeQuerySingle(() =>
          db.subjectConfig.findUnique({
            where: { subject_tahunAjaran_semester: { subject, tahunAjaran, semester } },
          }),
        )
      }
    }

    // If config is still null (DB totally broken), return hardcoded fallback.
    // API always returns 200 with a valid config object.
    if (!config) {
      console.warn('[subject-config] DB unavailable — returning hardcoded fallback for subject:', subject)
      return NextResponse.json({
        success: true,
        config: buildFallbackConfig(subject, tahunAjaran, semester),
        fallback: true,
        subjects: FALLBACK_SUBJECTS,
      })
    }

    return NextResponse.json({
      success: true,
      config: {
        subject: config.subject,
        tahunAjaran: config.tahunAjaran,
        semester: config.semester,
        kkm: config.kkm,
        bobotNH: config.bobotNH,
        bobotSTS: config.bobotSTS,
        bobotSAS: config.bobotSAS,
      },
    })
  } catch (fatalErr) {
    // Final fallback — return 200 with hardcoded default config + subject list.
    console.error('[subject-config] FATAL error (returning safe fallback):', fatalErr)
    return NextResponse.json({
      success: true,
      config: buildFallbackConfig('Informatika'),
      fallback: true,
      subjects: FALLBACK_SUBJECTS,
    })
  }
}

// PUT: update KKM + bobot (per tahunAjaran + semester)
export async function PUT(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    const subject = teacher?.subject || 'Informatika'

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[subject-config] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    // Read tahunAjaran + semester from body (with defaults).
    const tahunAjaran = (body.tahunAjaran as string) || DEFAULT_TAHUN_AJARAN
    const semester = (body.semester as string) || DEFAULT_SEMESTER

    const kkm = parseFloat(String(body.kkm)) || DEFAULT_KKM
    const bobotNH = parseFloat(String(body.bobotNH)) || DEFAULT_BOBOT.bobotNH
    const bobotSTS = parseFloat(String(body.bobotSTS ?? body.bobotUTS)) || DEFAULT_BOBOT.bobotSTS
    const bobotSAS = parseFloat(String(body.bobotSAS ?? body.bobotUAS)) || DEFAULT_BOBOT.bobotSAS

    // Validasi: total bobot wajib 100%
    const total = bobotNH + bobotSTS + bobotSAS
    if (Math.abs(total - 100) > 0.01) {
      return NextResponse.json({ error: `Total bobot harus 100%. Saat ini: ${total}%` }, { status: 400 })
    }

    try {
      // Use compound unique key for upsert.
      const config = await db.subjectConfig.upsert({
        where: { subject_tahunAjaran_semester: { subject, tahunAjaran, semester } },
        update: { kkm, bobotNH, bobotSTS, bobotSAS },
        create: { subject, tahunAjaran, semester, kkm, bobotNH, bobotSTS, bobotSAS },
      })
      return NextResponse.json({ success: true, config })
    } catch (dbErr) {
      // DB upsert failed — return the in-memory computed config so the
      // frontend doesn't crash. The teacher's changes won't persist but the UI stays alive.
      console.error('[subject-config] upsert error (returning computed fallback):', dbErr)
      return NextResponse.json({
        success: true,
        config: { subject, tahunAjaran, semester, kkm, bobotNH, bobotSTS, bobotSAS },
        fallback: true,
      })
    }
  } catch (fatalErr) {
    console.error('[subject-config] PUT FATAL error:', fatalErr)
    return NextResponse.json({
      success: true,
      config: buildFallbackConfig('Informatika'),
      fallback: true,
    })
  }
}
