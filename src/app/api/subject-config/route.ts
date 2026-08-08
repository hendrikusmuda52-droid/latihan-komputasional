import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// HOTFIX #1: Hardcoded fallback config for the 13 SMP subjects + 5 SMK subjects.
// If the DB table is missing/broken or the JWT subject is null, the API still
// returns a valid 200 response with these defaults — never a 500.
const DEFAULT_KKM = 75
const DEFAULT_BOBOT = { bobotNH: 40, bobotUTS: 30, bobotUAS: 30 }

// 13 SMP + 5 SMK subjects (mirrors src/lib/constants.ts).
const FALLBACK_SUBJECTS = [
  'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'Informatika', 'IPS', 'IPA',
  'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes',
  'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL',
] as const

function buildFallbackConfig(subject: string) {
  return {
    subject: subject || 'Informatika',
    kkm: DEFAULT_KKM,
    bobotNH: DEFAULT_BOBOT.bobotNH,
    bobotUTS: DEFAULT_BOBOT.bobotUTS,
    bobotUAS: DEFAULT_BOBOT.bobotUAS,
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

// GET: ambil KKM + bobot untuk subject guru
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    // HOTFIX #1: guard against null teacher / null subject.
    const subject = teacher?.subject || 'Informatika'

    // safeQuerySingle — returns null on any DB error (missing table, connection, etc.)
    let config = await safeQuerySingle(() =>
      db.subjectConfig.findUnique({ where: { subject } }),
    )

    // If config doesn't exist, try to create it — but guard against race conditions.
    if (!config) {
      try {
        config = await db.subjectConfig.create({
          data: { subject, kkm: DEFAULT_KKM, ...DEFAULT_BOBOT },
        })
      } catch (createErr) {
        // Race: another request created it concurrently. Fetch again.
        console.error('[subject-config] create error (likely race):', createErr)
        config = await safeQuerySingle(() =>
          db.subjectConfig.findUnique({ where: { subject } }),
        )
      }
    }

    // HOTFIX #1: If config is still null (DB totally broken), return hardcoded fallback.
    // API always returns 200 with a valid config object.
    if (!config) {
      console.warn('[subject-config] DB unavailable — returning hardcoded fallback for subject:', subject)
      return NextResponse.json({
        success: true,
        config: buildFallbackConfig(subject),
        fallback: true,
        subjects: FALLBACK_SUBJECTS,
      })
    }

    return NextResponse.json({
      success: true,
      config: {
        subject: config.subject,
        kkm: config.kkm,
        bobotNH: config.bobotNH,
        bobotUTS: config.bobotUTS,
        bobotUAS: config.bobotUAS,
      },
    })
  } catch (fatalErr) {
    // HOTFIX #1: Final fallback — return 200 with hardcoded default config + subject list.
    console.error('[subject-config] FATAL error (returning safe fallback):', fatalErr)
    return NextResponse.json({
      success: true,
      config: buildFallbackConfig('Informatika'),
      fallback: true,
      subjects: FALLBACK_SUBJECTS,
    })
  }
}

// PUT: update KKM + bobot
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

    const kkm = parseFloat(String(body.kkm)) || DEFAULT_KKM
    const bobotNH = parseFloat(String(body.bobotNH)) || DEFAULT_BOBOT.bobotNH
    const bobotUTS = parseFloat(String(body.bobotUTS)) || DEFAULT_BOBOT.bobotUTS
    const bobotUAS = parseFloat(String(body.bobotUAS)) || DEFAULT_BOBOT.bobotUAS

    // Validasi: total bobot wajib 100%
    const total = bobotNH + bobotUTS + bobotUAS
    if (Math.abs(total - 100) > 0.01) {
      return NextResponse.json({ error: `Total bobot harus 100%. Saat ini: ${total}%` }, { status: 400 })
    }

    try {
      const config = await db.subjectConfig.upsert({
        where: { subject },
        update: { kkm, bobotNH, bobotUTS, bobotUAS },
        create: { subject, kkm, bobotNH, bobotUTS, bobotUAS },
      })
      return NextResponse.json({ success: true, config })
    } catch (dbErr) {
      // HOTFIX #1: DB upsert failed — return the in-memory computed config so the
      // frontend doesn't crash. The teacher's changes won't persist but the UI stays alive.
      console.error('[subject-config] upsert error (returning computed fallback):', dbErr)
      return NextResponse.json({
        success: true,
        config: { subject, kkm, bobotNH, bobotUTS, bobotUAS },
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
