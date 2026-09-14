import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// GET /api/result/[id]/details
// Fetch full detail hasil siswa: data result + jawaban quiz (parsed dari JSON)
// + detail soal-soal yang terkait (untuk PG: correctAnswer; untuk essai: essayAnswer rubric).
//
// Dipakai modal "Lihat Jawaban" di halaman Hasil Latihan guru.
//
// Flow:
// 1. Auth: wajib guru
// 2. Lookup Result by id (include: student, assignment)
// 3. Parse quizAnswers JSON → record<questionId, number | string> (PG: number; essai: string)
// 4. Cari soal yang terkait via cpId/tpId/gradeLevel/subject (filter sama dengan saat siswa kerjakan)
// 5. Return: result + parsed answers + detail soal (untuk render modal review)

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const { id } = await params

    // ── 1. Fetch result + include student & assignment ──
    const result = await db.result.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true, namaLengkap: true, nisn: true, kelas: true, sekolah: true,
          },
        },
        assignment: {
          select: {
            id: true, title: true, targetKelas: true, duration: true, dueDate: true,
            cpId: true, tpId: true, questionCount: true,
          },
        },
      },
    })

    if (!result) {
      return NextResponse.json({ error: 'Hasil tidak ditemukan' }, { status: 404 })
    }

    // ── 2. Parse quizAnswers JSON (format: Record<questionId, number | string>) ──
    // PG answer = number (index 0-3), Essai answer = string
    let parsedAnswers: Record<string, number | string> = {}
    try {
      if (result.quizAnswers) {
        // Coba parse — quizAnswers bisa format JSON object atau string JSON
        const raw = result.quizAnswers
        if (typeof raw === 'string') {
          // Trim kemungkinan quote pembungkus
          const trimmed = raw.replace(/^"|"$/g, '').trim()
          parsedAnswers = JSON.parse(trimmed)
        } else if (typeof raw === 'object') {
          parsedAnswers = raw as Record<string, number | string>
        }
      }
    } catch (e) {
      console.error('[result/details] Gagal parse quizAnswers:', e)
      // Tidak gagalkan request — return empty answers
      parsedAnswers = {}
    }

    // ── NEW v4: Parse essayGrades JSON (format: Record<questionId, score>) ──
    // essayGrades menyimpan nilai essai yang sudah di-input guru per soal essai
    let parsedEssayGrades: Record<string, number> = {}
    try {
      const raw = (result as Record<string, unknown>).essayGrades
      if (raw && typeof raw === 'string') {
        parsedEssayGrades = JSON.parse(raw)
      } else if (raw && typeof raw === 'object') {
        parsedEssayGrades = raw as Record<string, number>
      }
    } catch (e) {
      console.error('[result/details] Gagal parse essayGrades:', e)
      parsedEssayGrades = {}
    }

    // essayScore (average) — ambil dari result, fallback 0
    const essayScoreRaw = (result as Record<string, unknown>).essayScore
    const storedEssayScore = typeof essayScoreRaw === 'number' ? essayScoreRaw : 0

    // ── 3. Derive gradeLevel dari kelas siswa (untuk query soal) ──
    const kelas = result.student?.kelas || ''
    let gradeLevel = '7'
    if (kelas.startsWith('11')) gradeLevel = '11DKV'
    else if (kelas.startsWith('12')) gradeLevel = '12DKV'
    else if (/^[789]/.test(kelas)) gradeLevel = kelas.charAt(0)

    // ── 4. Cari soal-soal yang mungkin dijawab siswa ──
    // Filter: subject + gradeLevel + isActive. Plus cpId/tpId jika ada di result (lebih spesifik).
    const where: Record<string, unknown> = {
      subject: result.subject || 'Informatika',
      isActive: true,
    }
    // Coba filter dengan cpId + tpId + gradeLevel (paling spesifik)
    if (result.cpId) where.cpId = result.cpId
    if (result.tpId) where.tpId = result.tpId

    const questions = await db.question.findMany({
      where,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        question: true,
        optionA: true, optionB: true, optionC: true, optionD: true,
        correctAnswer: true,
        explanation: true,
        category: true,
        questionType: true,
        essayAnswer: true,
        levelKognitif: true,
        pembahasanBenar: true,
        cpId: true, tpId: true,
      },
    })

    // ── 5. Jika query dengan cpId/tpId return 0 (mis: result.cpId null), fallback ke query tanpa cpId/tpId ──
    let finalQuestions = questions
    if (finalQuestions.length === 0 && (result.cpId || result.tpId)) {
      const fallbackWhere: Record<string, unknown> = {
        subject: result.subject || 'Informatika',
        isActive: true,
        gradeLevel,
      }
      finalQuestions = await db.question.findMany({
        where: fallbackWhere,
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          question: true,
          optionA: true, optionB: true, optionC: true, optionD: true,
          correctAnswer: true,
          explanation: true,
          category: true,
          questionType: true,
          essayAnswer: true,
          levelKognitif: true,
          pembahasanBenar: true,
          cpId: true, tpId: true,
        },
      })
    }

    // ── 6. Format output: gabungkan soal dengan jawaban siswa ──
    // Untuk PG: tampilkan opsi, correctAnswer, jawaban siswa (number), benar/salah.
    // Untuk essai: tampilkan jawaban siswa (string), essayAnswer (rubric), levelKognitif.
    const formattedQuestions = finalQuestions.map((q, idx) => {
      const studentAnswer = parsedAnswers[q.id]
      const isEssay = q.questionType === 'essai'
      const isAnswered = isEssay
        ? (typeof studentAnswer === 'string' && studentAnswer.trim().length > 0)
        : (typeof studentAnswer === 'number')

      let isCorrect = false
      if (!isEssay && typeof studentAnswer === 'number') {
        isCorrect = studentAnswer === q.correctAnswer
      }

      // ── NEW: Ambil essayGrade yang sudah di-input guru untuk soal essai ini (jika ada) ──
      const essayGrade = isEssay ? (parsedEssayGrades[q.id] ?? null) : null

      return {
        // idx untuk numbering display (1, 2, 3, ...)
        no: idx + 1,
        id: q.id,
        question: q.question,
        options: [q.optionA, q.optionB, q.optionC, q.optionD].filter(o => o), // hanya opsi non-empty
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        category: q.category,
        levelKognitif: q.levelKognitif,
        pembahasanBenar: q.pembahasanBenar,
        questionType: q.questionType || 'pilihan_ganda',
        essayAnswer: q.essayAnswer || '',
        cpId: q.cpId, tpId: q.tpId,
        // ── Student answer ──
        studentAnswer,
        isAnswered,
        isCorrect,
        // ── NEW: essayGrade (nilai guru) — null jika belum dinilai ──
        essayGrade,
      }
    })

    // ── Hitung ulang essayScore dari essayGrades (untuk display) ──
    const essayGradesCount = Object.keys(parsedEssayGrades).length
    const essayScoreFromGrades = essayGradesCount > 0
      ? Math.round((Object.values(parsedEssayGrades).reduce((a, b) => a + b, 0) / essayGradesCount) * 100) / 100
      : 0

    // ── Hitung totalScore dengan rumus 60/40 (jika ada essai yang dinilai) ──
    const pgScore = result.quizScore
    const hasEssayGraded = essayGradesCount > 0
    const computedTotalScore = hasEssayGraded
      ? Math.round((0.6 * pgScore + 0.4 * essayScoreFromGrades) * 100) / 100
      : result.totalScore

    return NextResponse.json({
      success: true,
      result: {
        id: result.id,
        student: result.student,
        assignment: result.assignment,
        // Skor
        totalScore: result.totalScore, // stored value
        computedTotalScore, // computed dari rumus 60/40 (untuk display real-time)
        quizScore: result.quizScore,
        quizCorrect: result.quizCorrect,
        quizTotal: result.quizTotal,
        typingScore: result.typingScore,
        typingSpeedWPM: result.typingSpeedWPM,
        typingAccuracy: result.typingAccuracy,
        // ── NEW: Essai grading info ──
        essayScore: storedEssayScore,
        essayGrades: parsedEssayGrades, // pre-fill untuk modal input
        essayGradedCount: essayGradesCount,
        hasEssay: formattedQuestions.some(q => q.questionType === 'essai'),
        // Timing
        completedAt: result.completedAt ? result.completedAt.toISOString() : null,
        isReleased: result.isReleased,
        releasedAt: result.releasedAt ? result.releasedAt.toISOString() : null,
        // CP/TP context
        cpId: result.cpId,
        tpId: result.tpId,
      },
      answers: parsedAnswers,
      questions: formattedQuestions,
      // Stats: hitung berapa essai ada, berapa dijawab, berapa sudah dinilai
      stats: {
        totalQuestions: formattedQuestions.length,
        totalPG: formattedQuestions.filter(q => q.questionType !== 'essai').length,
        totalEssay: formattedQuestions.filter(q => q.questionType === 'essai').length,
        answeredPG: formattedQuestions.filter(q => q.questionType !== 'essai' && q.isAnswered).length,
        correctPG: formattedQuestions.filter(q => q.questionType !== 'essai' && q.isCorrect).length,
        answeredEssay: formattedQuestions.filter(q => q.questionType === 'essai' && q.isAnswered).length,
        gradedEssay: essayGradesCount, // sudah dinilai guru
        essayScore: essayScoreFromGrades, // average
        formula: hasEssayGraded ? '60% PG + 40% Essai' : (formattedQuestions.some(q => q.questionType === 'essai') ? 'Belum dinilai (100% PG sementara)' : '100% PG (tanpa essai)'),
      },
    })
  } catch (error) {
    console.error('[result/details] FATAL error:', error)
    return NextResponse.json({ error: 'Gagal memuat detail hasil' }, { status: 500 })
  }
}
