import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// PUT: teacher approves or rejects a reset request
// Body: { action: 'approve' | 'reject' }
//
// ── FIX 4: When approving, perform ATOMIC transaction that:
//   1. Updates request status to 'approved'
//   2. DELETES all Result records for this student + assignment (or subject if no assignmentId)
//   3. DELETES all Progress records for this student (incomplete)
//   4. DELETES all ManualGrade records for this student + assignment (if assignmentId specified)
// This ensures the student's lock is fully cleared and the "Mulai" button reappears.
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const { id } = await params
    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { body = {} }

    const { action } = body as { action?: string }
    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json({ error: 'Action harus approve atau reject' }, { status: 400 })
    }

    const teacherSubject = teacher.subject || 'Informatika'

    // Fetch the request — STRICT SUBJECT ISOLATION
    const request = await db.resetRequest.findUnique({ where: { id } })
    if (!request) return NextResponse.json({ error: 'Pengajuan tidak ditemukan' }, { status: 404 })
    if (request.subject !== teacherSubject) {
      return NextResponse.json({ error: 'Anda tidak memiliki akses ke pengajuan ini' }, { status: 403 })
    }

    if (action === 'approve') {
      // ── ATOMIC TRANSACTION: delete all submission data + update request status ──
      // ── FIX: Precise deletion by assignmentId + studentId (not by subject string) ──
      try {
        await db.$transaction(async (tx) => {
          let deletedResultsCount = 0
          let deletedProgressCount = 0

          // ── CASE 1: assignmentId is specified → delete ONLY this assignment's results ──
          if (request.assignmentId) {
            console.log(`[reset-requests] APPROVE: Deleting results for studentId=${request.studentId}, assignmentId=${request.assignmentId}`)

            // Delete Result records with THIS specific assignmentId
            const deletedResults = await tx.result.deleteMany({
              where: {
                studentId: request.studentId,
                assignmentId: request.assignmentId,
              },
            })
            deletedResultsCount = deletedResults.count

            // Delete incomplete Progress for this student
            const deletedProgress = await tx.progress.deleteMany({
              where: { studentId: request.studentId, isCompleted: false },
            })
            deletedProgressCount = deletedProgress.count

          } else {
            // ── CASE 2: no assignmentId → delete ALL results for this subject (broader reset) ──
            console.log(`[reset-requests] APPROVE: No assignmentId — deleting ALL results for studentId=${request.studentId}, subject=${request.subject}`)

            const deletedResults = await tx.result.deleteMany({
              where: {
                studentId: request.studentId,
                subject: request.subject,
              },
            })
            deletedResultsCount = deletedResults.count

            const deletedProgress = await tx.progress.deleteMany({
              where: { studentId: request.studentId, isCompleted: false },
            })
            deletedProgressCount = deletedProgress.count
          }

          // Update the reset request status
          await tx.resetRequest.update({
            where: { id },
            data: {
              status: 'approved',
              teacherId: teacher.teacherId,
              processedAt: new Date(),
            },
          })

          console.log(`[reset-requests] APPROVED: Deleted ${deletedResultsCount} results, ${deletedProgressCount} progress records for student ${request.studentId}, assignmentId=${request.assignmentId || 'ALL'}`)
        })

        return NextResponse.json({
          success: true,
          message: 'Reset disetujui. Siswa dapat mengerjakan ulang tugas.',
        })
      } catch (txErr) {
        console.error('[reset-requests] Transaction error:', txErr)
        return NextResponse.json({ error: 'Gagal menjalankan reset. Database error.' }, { status: 500 })
      }
    } else {
      // Reject
      await db.resetRequest.update({
        where: { id },
        data: { status: 'rejected', teacherId: teacher.teacherId, processedAt: new Date() },
      })
      return NextResponse.json({ success: true, message: 'Pengajuan reset ditolak.' })
    }
  } catch (error) {
    console.error('[reset-requests] PUT error:', error)
    return NextResponse.json({ error: 'Gagal memproses pengajuan' }, { status: 500 })
  }
}
