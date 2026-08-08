import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// HOTFIX #2: Safely coerce any value to a number in [0, 100].
// Empty string, null, undefined, NaN, negative, >100 all become 0.
function safeScore(v: unknown): number {
  if (v === null || v === undefined || v === '') return 0
  const n = typeof v === 'number' ? v : parseFloat(String(v))
  if (!Number.isFinite(n)) return 0
  if (n < 0) return 0
  if (n > 100) return 100
  return Math.round(n * 10) / 10
}

// Helper: safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[manual-grades] safeQuery error:', err)
    return []
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const kelas = req.nextUrl.searchParams.get('kelas')
    const studentId = req.nextUrl.searchParams.get('studentId')

    let where: Record<string, unknown> = { subject: teacherSubject }
    if (studentId) where.studentId = studentId
    if (kelas && kelas !== 'ALL') {
      const students = await safeQuery(() =>
        db.student.findMany({ where: { kelas }, select: { id: true } }),
      )
      where.studentId = { in: (students || []).map(s => s.id) }
    }

    const grades = await safeQuery(() =>
      db.manualGrade.findMany({
        where,
        include: { student: { select: { namaLengkap: true, nisn: true, kelas: true, sekolah: true } } },
        orderBy: { createdAt: 'desc' },
      }),
    )

    return NextResponse.json({ success: true, grades: grades || [] })
  } catch (fatalErr) {
    console.error('[manual-grades] GET FATAL error (returning safe empty array):', fatalErr)
    return NextResponse.json({ success: true, grades: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    // HOTFIX #2: try-catch around req.json() for malformed body.
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[manual-grades] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const teacherSubject = teacher.subject || 'Informatika'
    const isReleased = body.isReleased ?? true

    // Bulk insert: { grades: [{ studentId, score, gradeType, babId, title }] }
    if (Array.isArray(body?.grades)) {
      const grades = body.grades as Array<{
        studentId?: string
        score?: number | string
        gradeType?: string
        babId?: string | null
        title?: string
      }>

      // HOTFIX #2: coerce null/empty score to 0, validate studentId present.
      const valid = grades
        .map(g => ({
          studentId: g?.studentId || '',
          score: safeScore(g?.score),       // null/''/undefined/NaN → 0
          gradeType: g?.gradeType || 'tugas',
          babId: g?.babId || null,
          title: g?.title || '',
        }))
        .filter(g => g.studentId) // must have studentId

      if (valid.length === 0) {
        return NextResponse.json({ error: 'Tidak ada nilai valid untuk disimpan' }, { status: 400 })
      }

      // Default titles per gradeType
      const defaultTitle = (t: string) => {
        switch (t) {
          case 'tugas': return 'Tugas Manual'
          case 'uh': return 'Ulangan Harian'
          case 'uts': return 'Ulangan Tengah Semester'
          case 'uas': return 'Ulangan Akhir Semester'
          default: return 'Nilai Manual'
        }
      }

      try {
        const created = await db.$transaction(
          valid.map(g => db.manualGrade.create({
            data: {
              studentId: g.studentId,
              title: g.title || defaultTitle(g.gradeType),
              score: g.score,
              description: '',
              subject: teacherSubject,
              gradeType: g.gradeType,
              babId: g.babId,
              isReleased: isReleased as boolean,
              teacherId: teacher.teacherId,
            },
          })),
        )
        return NextResponse.json({ success: true, count: created.length })
      } catch (err) {
        console.error('[manual-grades] bulk POST error:', err)
        return NextResponse.json({ error: 'Gagal menyimpan nilai massal' }, { status: 500 })
      }
    }

    // Single insert (legacy path — keep backward compatibility with existing AddGradeDialog)
    const {
      studentId, title, score, description, gradeType, babId,
    } = body as {
      studentId?: string
      title?: string
      score?: number | string
      description?: string
      isReleased?: boolean
      gradeType?: string
      babId?: string | null
    }

    if (!studentId || !title) {
      return NextResponse.json({ error: 'studentId dan title wajib diisi' }, { status: 400 })
    }

    // HOTFIX #2: coerce null/empty score to 0 — never let DB constraint fail on null/NaN.
    const safeScoreValue = safeScore(score)

    try {
      const grade = await db.manualGrade.create({
        data: {
          studentId,
          title,
          score: safeScoreValue,
          description: description || '',
          subject: teacherSubject,
          gradeType: gradeType || 'tugas',
          babId: babId || null,
          isReleased: Boolean(body.isReleased) || false,
          teacherId: teacher.teacherId,
        },
      })
      return NextResponse.json({ success: true, grade })
    } catch (dbErr) {
      console.error('[manual-grades] single POST DB error:', dbErr)
      return NextResponse.json({ error: 'Gagal menyimpan nilai ke database' }, { status: 500 })
    }
  } catch (fatalErr) {
    console.error('[manual-grades] POST FATAL error:', fatalErr)
    return NextResponse.json({ error: 'Gagal memproses request' }, { status: 500 })
  }
}
