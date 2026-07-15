import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: ambil progress siswa berdasarkan NISN
// ?nisn=1234567890
export async function GET(req: NextRequest) {
  try {
    const nisn = req.nextUrl.searchParams.get('nisn')
    if (!nisn) {
      return NextResponse.json({ error: 'NISN wajib diisi' }, { status: 400 })
    }

    const student = await db.student.findUnique({
      where: { nisn },
      include: {
        progresses: {
          orderBy: { updatedAt: 'desc' },
          take: 1,
        },
        results: {
          orderBy: { completedAt: 'desc' },
          take: 5, // 5 latihan terakhir
        },
      },
    })

    if (!student) {
      return NextResponse.json({ success: true, exists: false })
    }

    const activeProgress = student.progresses[0]
    const hasActiveProgress =
      activeProgress && !activeProgress.isCompleted && activeProgress.typedText.length > 0

    return NextResponse.json({
      success: true,
      exists: true,
      student: {
        id: student.id,
        namaLengkap: student.namaLengkap,
        nisn: student.nisn,
        kelas: student.kelas,
        sekolah: student.sekolah,
        jenisKelamin: student.jenisKelamin,
      },
      hasActiveProgress: !!hasActiveProgress,
      progress: hasActiveProgress
        ? {
            id: activeProgress.id,
            currentStage: activeProgress.currentStage,
            typedText: activeProgress.typedText,
            charCount: activeProgress.charCount,
            correctChars: activeProgress.correctChars,
            typingStartTime: activeProgress.typingStartTime,
            typingDuration: activeProgress.typingDuration,
            quizAnswers: activeProgress.quizAnswers,
            quizStartTime: activeProgress.quizStartTime,
            quizDuration: activeProgress.quizDuration,
            lastSavedAt: activeProgress.lastSavedAt,
          }
        : null,
      history: student.results.map((r) => ({
        id: r.id,
        typingScore: r.typingScore,
        quizScore: r.quizScore,
        totalScore: r.totalScore,
        completedAt: r.completedAt,
      })),
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ error: 'Gagal mengambil progress' }, { status: 500 })
  }
}

// PUT: simpan/update progress siswa
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      studentId,
      currentStage,
      typedText,
      charCount,
      correctChars,
      typingStartTime,
      typingDuration,
      quizAnswers,
      quizStartTime,
      quizDuration,
      isCompleted,
    } = body

    if (!studentId) {
      return NextResponse.json({ error: 'studentId wajib diisi' }, { status: 400 })
    }

    // Cek progress yang belum completed untuk student ini
    let progress = await db.progress.findFirst({
      where: { studentId, isCompleted: false },
      orderBy: { updatedAt: 'desc' },
    })

    if (!progress) {
      // Buat baru
      progress = await db.progress.create({
        data: {
          studentId,
          currentStage: currentStage || 'typing',
          typedText: typedText || '',
          charCount: charCount || 0,
          correctChars: correctChars || 0,
          typingStartTime: typingStartTime || '',
          typingDuration: typingDuration || 0,
          quizAnswers: quizAnswers || '{}',
          quizStartTime: quizStartTime || '',
          quizDuration: quizDuration || 0,
          isCompleted: isCompleted || false,
        },
      })
    } else {
      // Update progress yang ada
      progress = await db.progress.update({
        where: { id: progress.id },
        data: {
          ...(currentStage !== undefined && { currentStage }),
          ...(typedText !== undefined && { typedText }),
          ...(charCount !== undefined && { charCount }),
          ...(correctChars !== undefined && { correctChars }),
          ...(typingStartTime !== undefined && { typingStartTime }),
          ...(typingDuration !== undefined && { typingDuration }),
          ...(quizAnswers !== undefined && { quizAnswers }),
          ...(quizStartTime !== undefined && { quizStartTime }),
          ...(quizDuration !== undefined && { quizDuration }),
          ...(isCompleted !== undefined && { isCompleted }),
          lastSavedAt: new Date(),
        },
      })
    }

    return NextResponse.json({ success: true, progress })
  } catch (error) {
    console.error('Error saving progress:', error)
    return NextResponse.json({ error: 'Gagal menyimpan progress' }, { status: 500 })
  }
}

// DELETE: hapus progress (jika siswa ingin mulai ulang)
export async function DELETE(req: NextRequest) {
  try {
    const { studentId } = await req.json()
    if (!studentId) {
      return NextResponse.json({ error: 'studentId wajib diisi' }, { status: 400 })
    }

    await db.progress.deleteMany({
      where: { studentId, isCompleted: false },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting progress:', error)
    return NextResponse.json({ error: 'Gagal menghapus progress' }, { status: 500 })
  }
}
