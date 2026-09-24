import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: ambil soal aktif untuk jenjang + subject tertentu
// ?grade=8&subject=Informatika&cpId=xxx&tpId=yyy&limit=10&questionType=pilihan_ganda
//
// ── FIX #1: STRICT CP/TP ISOLATION ──
// Jika cpId diberikan, HANYA soal dengan cpId tersebut yang dikembalikan.
// TIDAK ADA fallback ke soal global — soal dari CP lain tidak akan muncul.
// Ini mencegah kebocoran 70 soal global yang terjadi sebelumnya.
//
// ── NEW: Filter by questionType ──
// Jika questionType diberikan, HANYA soal dengan tipe tersebut yang dikembalikan.
// Contoh: ?questionType=isian_singkat → hanya soal isian
export async function GET(req: NextRequest) {
  try {
    const grade = req.nextUrl.searchParams.get('grade')
    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'
    const cpId = req.nextUrl.searchParams.get('cpId')
    const tpId = req.nextUrl.searchParams.get('tpId')
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '0')
    const questionType = req.nextUrl.searchParams.get('questionType')

    if (!grade) {
      return NextResponse.json({ error: 'Grade wajib diisi' }, { status: 400 })
    }

    // ── Build STRICT where clause ──
    const where: Record<string, unknown> = {
      gradeLevel: grade,
      isActive: true,
      subject,
    }

    if (cpId && cpId !== 'null' && cpId !== '__none__') {
      where.cpId = cpId
    }
    if (tpId && tpId !== 'null' && tpId !== '__none__') {
      where.tpId = tpId
    }

    // ── NEW: Filter by questionType ──
    if (questionType && questionType !== 'null' && questionType !== '__none__') {
      where.questionType = questionType
    }

    let questions = await db.question.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    })

    // If limit > 0, randomly shuffle and slice to requested count
    if (limit > 0 && questions.length > limit) {
      const shuffled = [...questions]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      questions = shuffled.slice(0, limit)
    }

    const formatted = questions.map((q, i) => ({
      id: i + 1,
      dbId: q.id,
      question: q.question,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      category: q.category,
      imageUrl: q.imageUrl || null,
      questionType: q.questionType || 'pilihan_ganda',
      correctAnswers: q.correctAnswers || '[]',
      matchPairs: q.matchPairs || '[]',
      shortAnswer: q.shortAnswer || '',
      essayAnswer: q.essayAnswer || '',
      levelKognitif: q.levelKognitif || 'C2',
      pembahasanBenar: q.pembahasanBenar || '',
      analisisDistraktor: q.analisisDistraktor || '',
      cpId: q.cpId || null,
      tpId: q.tpId || null,
    }))

    return NextResponse.json({ success: true, questions: formatted, count: formatted.length })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Gagal mengambil soal' }, { status: 500 })
  }
}
