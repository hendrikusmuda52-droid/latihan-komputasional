import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/questions/clone
// Clone a question to a different gradeLevel + subject.
//
// Body: { questionId, targetGrade, targetSubject }
//
// The original question is fetched, then a NEW question is created with
// the same content (question text, options, correctAnswer, explanation)
// but with the new gradeLevel and subject. cpId/tpId are set to null
// because the CP/TP from the original subject won't match the target
// subject's CP/TP hierarchy.
// ─────────────────────────────────────────────────────────────────────────────

const VALID_GRADES = ['7', '8', '9', '11DKV', '12DKV']

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const body = await req.json()
    const { questionId, targetGrade, targetSubject } = body as {
      questionId?: string
      targetGrade?: string
      targetSubject?: string
    }

    if (!questionId) {
      return NextResponse.json({ error: 'questionId wajib diisi' }, { status: 400 })
    }
    if (!targetGrade || !VALID_GRADES.includes(targetGrade)) {
      return NextResponse.json(
        { error: `targetGrade tidak valid. Pilihan: ${VALID_GRADES.join(', ')}` },
        { status: 400 }
      )
    }
    if (!targetSubject || targetSubject.trim().length < 3) {
      return NextResponse.json({ error: 'targetSubject wajib diisi' }, { status: 400 })
    }

    // Fetch original question
    const original = await db.question.findUnique({ where: { id: questionId } })
    if (!original) {
      return NextResponse.json({ error: 'Soal asli tidak ditemukan' }, { status: 404 })
    }

    // Check for duplicate (same question text + same targetGrade + same targetSubject)
    const existing = await db.question.findFirst({
      where: {
        question: original.question,
        gradeLevel: targetGrade,
        subject: targetSubject,
      },
      select: { id: true },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'Soal dengan teks yang sama sudah ada di target kelas+mapel tersebut.' },
        { status: 409 }
      )
    }

    // Clone: create new question with same content but new grade + subject
    const cloned = await db.question.create({
      data: {
        gradeLevel: targetGrade,
        subject: targetSubject,
        question: original.question,
        optionA: original.optionA,
        optionB: original.optionB,
        optionC: original.optionC,
        optionD: original.optionD,
        correctAnswer: original.correctAnswer,
        explanation: original.explanation,
        category: original.category || 'Umum',
        isActive: true,
        imageUrl: original.imageUrl || null,
        teacherId: teacher.teacherId,
        // Multi-type fields (copy from original)
        questionType: original.questionType || 'pilihan_ganda',
        correctAnswers: original.correctAnswers || '[]',
        matchPairs: original.matchPairs || '[]',
        shortAnswer: original.shortAnswer || '',
        essayAnswer: original.essayAnswer || '',
        levelKognitif: original.levelKognitif || 'C2',
        pembahasanBenar: original.pembahasanBenar || '',
        analisisDistraktor: original.analisisDistraktor || '',
        // CP/TP set to null — original CP/TP belong to a different subject
        // Guru can manually link the cloned question to a new CP/TP later
        cpId: null,
        tpId: null,
      },
    })

    return NextResponse.json({
      success: true,
      message: `Soal berhasil disalin ke Kelas ${targetGrade} — ${targetSubject}`,
      cloned,
    })
  } catch (error) {
    console.error('[questions/clone] error:', error)
    return NextResponse.json(
      { error: 'Gagal clone soal: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 },
    )
  }
}
