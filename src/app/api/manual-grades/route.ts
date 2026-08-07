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
  const { studentId, title, score, description, isReleased, gradeType, babId } = await req.json()

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
