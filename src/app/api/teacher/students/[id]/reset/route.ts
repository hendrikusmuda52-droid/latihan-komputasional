import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// POST: Reset tugas siswa (hapus result untuk assignment tertentu, atau semua result untuk subject)
// Body: { assignmentId?: string, subject?: string }
// If assignmentId is provided, only delete results for that assignment.
// If only subject is provided, delete all results for that subject.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const { id: studentId } = await params

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { body = {} }

    const { assignmentId, subject } = body as { assignmentId?: string; subject?: string }
    const teacherSubject = subject || teacher.subject || 'Informatika'

    // Verify student exists
    const student = await db.student.findUnique({ where: { id: studentId }, select: { id: true, namaLengkap: true } })
    if (!student) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 })
    }

    // Build where clause
    const where: Record<string, unknown> = { studentId }
    if (assignmentId) {
      where.assignmentId = assignmentId
    } else {
      where.subject = teacherSubject
    }

    // Delete results (this allows student to retake)
    const deleted = await db.result.deleteMany({ where })

    // Also delete any incomplete progress for this student
    await db.progress.deleteMany({
      where: { studentId, isCompleted: false },
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      message: `Reset berhasil untuk ${student.namaLengkap}. ${deleted.count} hasil dihapus.`,
      deletedCount: deleted.count,
    })
  } catch (error) {
    console.error('[reset] POST error:', error)
    return NextResponse.json({ error: 'Gagal reset tugas siswa' }, { status: 500 })
  }
}
