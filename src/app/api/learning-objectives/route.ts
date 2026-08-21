import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// HOTFIX #3: Helper — safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[learning-objectives] safeQuery error:', err)
    return []
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const objectives = await safeQuery(() =>
      db.learningObjective.findMany({
        where: { subject: teacherSubject, isActive: true },
        orderBy: { createdAt: 'desc' },
      }),
    )
    return NextResponse.json({ success: true, objectives: objectives || [] })
  } catch (fatalErr) {
    // HOTFIX #3: Final fallback — return HTTP 200 with empty array instead of 500 + HTML.
    console.error('[learning-objectives] GET FATAL error (returning safe empty array):', fatalErr)
    return NextResponse.json({ success: true, objectives: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[learning-objectives] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const { gradeLevel, chapter, cp, tp, bobotTugas, bobotUH } = body as {
      gradeLevel?: string
      chapter?: string
      cp?: string
      tp?: string
      bobotTugas?: string | number
      bobotUH?: string | number
    }

    if (!gradeLevel || !chapter || !cp || !tp) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }

    // Validasi bobot per bab
    const bt = parseFloat(String(bobotTugas)) || 40
    const bu = parseFloat(String(bobotUH)) || 60
    const totalBab = bt + bu
    if (Math.abs(totalBab - 100) > 0.01) {
      return NextResponse.json({ error: `Total bobot Tugas + UH per Bab harus 100%. Saat ini: ${totalBab}%` }, { status: 400 })
    }

    // HOTFIX #4: Wrap the DB insert in its own try-catch so a schema/DB failure
    // returns a friendly 400 instead of crashing the whole API with 500.
    try {
      const obj = await db.learningObjective.create({
        data: {
          subject: teacher.subject || 'Informatika',
          gradeLevel,
          chapter,
          cp,
          tp,
          bobotTugas: bt,
          bobotUH: bu,
          teacherId: teacher.teacherId,
        },
      })
      return NextResponse.json({ success: true, objective: obj })
    } catch (dbErr) {
      console.error('[learning-objectives] POST DB insert error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal memproses ke database. Pastikan kolom data sesuai.' },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error('[learning-objectives] POST FATAL error:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal memproses ke database. Pastikan kolom data sesuai.' },
      { status: 400 },
    )
  }
}
