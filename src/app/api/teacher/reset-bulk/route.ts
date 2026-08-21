import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// POST: Bulk reset for entire class + assignment
// Body: { kelas, assignmentId }
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body bukan JSON valid' }, { status: 400 }) }

    const { kelas, assignmentId } = body as { kelas?: string; assignmentId?: string }
    if (!kelas || !assignmentId) {
      return NextResponse.json({ error: 'kelas dan assignmentId wajib diisi' }, { status: 400 })
    }

    const teacherSubject = teacher.subject || 'Informatika'

    // ── STRICT SUBJECT ISOLATION: verify assignment belongs to teacher's subject ──
    const assignment = await db.assignment.findUnique({ where: { id: assignmentId } })
    if (!assignment || assignment.subject !== teacherSubject) {
      return NextResponse.json({ error: 'Tugas tidak ditemukan atau bukan mapel Anda' }, { status: 403 })
    }

    // Get all students in the class
    const students = await db.student.findMany({
      where: { kelas },
      select: { id: true },
    })

    if (students.length === 0) {
      return NextResponse.json({ error: 'Tidak ada siswa di kelas ini' }, { status: 400 })
    }

    const studentIds = students.map(s => s.id)

    // Delete all results for these students + this assignment
    const deleted = await db.result.deleteMany({
      where: { studentId: { in: studentIds }, assignmentId },
    })

    // Also delete incomplete progress
    await db.progress.deleteMany({
      where: { studentId: { in: studentIds }, isCompleted: false },
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      message: `Reset massal berhasil. ${deleted.count} hasil dihapus untuk ${students.length} siswa di kelas ${kelas}.`,
      deletedCount: deleted.count,
      studentCount: students.length,
    })
  } catch (error) {
    console.error('[reset-bulk] POST error:', error)
    return NextResponse.json({ error: 'Gagal reset massal' }, { status: 500 })
  }
}

// GET: list assignments for a class (for the dropdown selector)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const kelas = req.nextUrl.searchParams.get('kelas')
    const querySubject = req.nextUrl.searchParams.get('subject')

    // ── FIX Bug B: Pakai pola OR (teacherId OR subject) ──
    // Sebelumnya hanya filter by `subject: teacherSubject` — tugas SMK yang
    // dibuat guru dengan JWT.subject="Informatika" tidak muncul di dropdown
    // reset-center, sehingga guru tidak bisa reset tugas SMK.
    let where: Record<string, unknown>
    if (teacher.role === 'admin') {
      where = { isActive: true }
      if (querySubject) (where as Record<string, unknown>).subject = querySubject
    } else {
      where = {
        isActive: true,
        OR: [
          { teacherId: teacher.teacherId },
          { subject: querySubject || teacherSubject },
        ],
      }
    }
    // Note: we don't filter by kelas here because assignments use targetKelas (comma-separated)

    const assignments = await db.assignment.findMany({
      where,
      select: { id: true, title: true, taskType: true, exerciseType: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })

    // Filter by kelas if provided
    const filtered = kelas
      ? assignments.filter(a => {
          // assignments don't have targetKelas field in select, so fetch all and filter
          return true // The API returns all; client can filter
        })
      : assignments

    return NextResponse.json({ success: true, assignments: filtered })
  } catch (error) {
    console.error('[reset-bulk] GET error:', error)
    return NextResponse.json({ success: true, assignments: [] })
  }
}
