import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: ambil soal aktif untuk jenjang + subject tertentu
// ?grade=8&subject=Informatika&cpId=xxx&tpId=yyy&limit=10
//
// ── FIX #1: STRICT CP/TP ISOLATION ──
// Jika cpId diberikan, HANYA soal dengan cpId tersebut yang dikembalikan.
// TIDAK ADA fallback ke soal global — soal dari CP lain tidak akan muncul.
// Ini mencegah kebocoran 70 soal global yang terjadi sebelumnya.
export async function GET(req: NextRequest) {
  try {
    const grade = req.nextUrl.searchParams.get('grade')
    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'
    const cpId = req.nextUrl.searchParams.get('cpId')
    const tpId = req.nextUrl.searchParams.get('tpId')
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '0')

    if (!grade) {
      return NextResponse.json({ error: 'Grade wajib diisi' }, { status: 400 })
    }

    // ── Build STRICT where clause ──
    // If cpId is provided, it becomes a HARD filter — no fallback.
    const where: Record<string, unknown> = {
      gradeLevel: grade,
      isActive: true,
      subject,
    }

    // STRICT CP filter: if cpId provided, ONLY return questions with this cpId
    if (cpId && cpId !== 'null' && cpId !== '__none__') {
      where.cpId = cpId
    }

    // STRICT TP filter: if tpId provided, ONLY return questions with this tpId
    if (tpId && tpId !== 'null' && tpId !== '__none__') {
      where.tpId = tpId
    }

    let questions = await db.question.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    })

    // If limit > 0, randomly shuffle and slice to requested count
    // This ensures we don't return ALL questions, only the requested amount
    if (limit > 0 && questions.length > limit) {
      // Fisher-Yates shuffle for random selection
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
      // v3 multi-type fields
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
