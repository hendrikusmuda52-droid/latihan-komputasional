import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  const kelas = req.nextUrl.searchParams.get('kelas')
  const studentId = req.nextUrl.searchParams.get('studentId')

  let where: Record<string, unknown> = { subject: teacher.subject }
  if (studentId) where.studentId = studentId
  if (kelas && kelas !== 'ALL') {
    const students = await db.student.findMany({ where: { kelas }, select: { id: true } })
    where.studentId = { in: students.map(s => s.id) }
  }

  const grades = await db.manualGrade.findMany({
    where,
    include: { student: { select: { namaLengkap: true, nisn: true, kelas: true, sekolah: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ success: true, grades })
}

export async function POST(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  const body = await req.json()

  // Bulk insert: { grades: [{ studentId, score, gradeType, babId, title }] }
  if (Array.isArray(body?.grades)) {
    const grades: Array<{ studentId: string; score: number; gradeType: string; babId?: string | null; title?: string }> = body.grades
    const valid = grades.filter(g => g.studentId && typeof g.score === 'number' && g.score >= 0 && g.score <= 100)
    if (valid.length === 0) return NextResponse.json({ error: 'Tidak ada nilai valid untuk disimpan' }, { status: 400 })

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
            subject: teacher.subject,
            gradeType: g.gradeType || 'tugas',
            babId: g.babId || null,
            isReleased: body.isReleased ?? true,
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
  const { studentId, title, score, description, isReleased, gradeType, babId } = body
  if (!studentId || !title || score === undefined) return NextResponse.json({ error: 'studentId, title, dan score wajib diisi' }, { status: 400 })
  if (score < 0 || score > 100) return NextResponse.json({ error: 'Score harus 0-100' }, { status: 400 })

  const grade = await db.manualGrade.create({
    data: {
      studentId, title, score: parseFloat(score), description: description || '',
      subject: teacher.subject, gradeType: gradeType || 'tugas', babId: babId || null,
      isReleased: isReleased || false, teacherId: teacher.teacherId,
    },
  })
  return NextResponse.json({ success: true, grade })
}
