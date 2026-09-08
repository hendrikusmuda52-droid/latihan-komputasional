import { NextRequest, NextResponse } from 'next/server'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'
import { db } from '@/lib/db'
import { uploadTaskPhoto } from '@/lib/google-drive'

// POST /api/student/upload-task-photo
// Siswa upload foto catatan tugas ke Google Drive
// FormData: assignmentId, files (multiple photos)

export async function POST(req: NextRequest) {
  try {
    if (!(await requireStudentAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = getStudentFromToken(req)!
    if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const formData = await req.formData()
    const assignmentId = formData.get('assignmentId') as string

    if (!assignmentId) {
      return NextResponse.json({ error: 'Assignment ID wajib diisi' }, { status: 400 })
    }

    // Ambil semua file foto
    const files: File[] = []
    const entries = Array.from(formData.entries())
    for (const [key, value] of entries) {
      if (key === 'files' && value instanceof File) {
        files.push(value)
      }
      // Support multiple files dengan key "files" atau "files[]"
      if (key.startsWith('files') && value instanceof File) {
        if (!files.includes(value)) files.push(value)
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: 'Tidak ada file yang diupload' }, { status: 400 })
    }

    // Validasi: max 10 foto, max 5MB per foto
    if (files.length > 10) {
      return NextResponse.json({ error: 'Maksimal 10 foto per tugas' }, { status: 400 })
    }
    for (const f of files) {
      if (f.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: `File "${f.name}" melebihi 5MB` }, { status: 400 })
      }
      if (!f.type.startsWith('image/')) {
        return NextResponse.json({ error: `File "${f.name}" bukan gambar` }, { status: 400 })
      }
    }

    // Ambil info tugas dari DB
    const assignment = await db.assignment.findUnique({
      where: { id: assignmentId },
      select: { id: true, title: true, subject: true, cpId: true, tpId: true },
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Tugas tidak ditemukan' }, { status: 404 })
    }

    // Upload setiap foto ke Google Drive
    const uploadResults: Array<{ success: boolean; fileName: string; url?: string; error?: string }> = []
    let successCount = 0

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const buffer = Buffer.from(await file.arrayBuffer())

      const result = await uploadTaskPhoto({
        studentName: session.namaLengkap,
        kelas: session.kelas,
        taskTitle: assignment.title,
        fileName: file.name,
        fileBuffer: buffer,
        mimeType: file.type,
        fileIndex: i + 1,
      })

      uploadResults.push({
        success: result.success,
        fileName: file.name,
        url: result.fileUrl,
        error: result.error,
      })

      if (result.success) successCount++
    }

    // Simpan record ke DB (Result dengan totalScore = 0, akan dinilai guru manual)
    if (successCount > 0) {
      try {
        await db.result.create({
          data: {
            studentId: session.studentId,
            typedText: `Upload foto catatan: ${successCount} foto`,
            charCount: 0,
            correctChars: 0,
            typingSpeedWPM: 0,
            typingAccuracy: 0,
            typingDuration: 0,
            typingScore: 0,
            quizAnswers: JSON.stringify(uploadResults),
            quizCorrect: 0,
            quizTotal: 0,
            quizScore: 0,
            totalScore: 0, // akan dinilai guru
            subject: assignment.subject,
            assignmentId: assignment.id,
            cpId: assignment.cpId || null,
            tpId: assignment.tpId || null,
            isReleased: false, // guru review dulu
          },
        })
      } catch (dbErr) {
        console.error('[upload-task-photo] DB insert error:', dbErr)
        // Foto sudah terupload ke Drive, tapi gagal simpan record — tidak fatal
      }
    }

    return NextResponse.json({
      success: successCount > 0,
      uploaded: successCount,
      total: files.length,
      results: uploadResults,
      message: successCount === files.length
        ? `${successCount} foto berhasil diupload ke Google Drive`
        : `${successCount}/${files.length} foto berhasil diupload`,
    })
  } catch (error) {
    console.error('[upload-task-photo] FATAL error:', error)
    return NextResponse.json(
      { error: 'Gagal upload: ' + (error instanceof Error ? error.message : 'Unknown') },
      { status: 500 }
    )
  }
}
