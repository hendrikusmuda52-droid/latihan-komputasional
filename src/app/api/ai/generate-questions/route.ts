import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'
import { requireTeacherAuth } from '@/lib/auth'

// Auth via stateless JWT - see @/lib/auth

interface GeneratedQuestion {
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: number
  explanation: string
  category: string
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const { materialContent, gradeLevel, questionCount, category } = await req.json()

    if (!materialContent || !gradeLevel) {
      return NextResponse.json({ error: 'Materi dan jenjang kelas wajib diisi' }, { status: 400 })
    }

    const count = Math.min(Math.max(questionCount || 5, 1), 20)

    const zai = await ZAI.create()

    const prompt = `Kamu adalah guru informatika SMP di Indonesia. Berdasarkan materi pelajaran berikut, buatlah ${count} soal pilihan ganda (HOTS) yang sesuai untuk siswa kelas ${gradeLevel}.

MATERI:
${materialContent.substring(0, 3000)}

INSTRUKSI:
1. Buat ${count} soal pilihan ganda dengan 4 opsi jawaban (A, B, C, D)
2. Tentukan jawaban yang benar (index 0-3, dimana 0=A, 1=B, 2=C, 3=D)
3. Berikan pembahasan singkat untuk setiap soal
4. Kategori soal: ${category || 'Konsep Dasar'}
5. Tingkat kesulitan sesuai kelas ${gradeLevel}
6. Bahasa Indonesia yang jelas dan mudah dipahami

WAJIB balas dalam format JSON array seperti ini, TANPA teks lain:
[
  {
    "question": "Pertanyaan soal di sini?",
    "optionA": "Pilihan A",
    "optionB": "Pilihan B",
    "optionC": "Pilihan C",
    "optionD": "Pilihan D",
    "correctAnswer": 0,
    "explanation": "Pembahasan jawaban",
    "category": "${category || 'Konsep Dasar'}"
  }
]`

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: 'Kamu adalah asisten yang membuat soal pilihan ganda berkualitas untuk siswa SMP dalam Bahasa Indonesia. Selalu balas dengan JSON array yang valid.' },
        { role: 'user', content: prompt },
      ],
      thinking: { type: 'disabled' },
    })

    const response = completion.choices[0]?.message?.content || ''

    // Parse JSON dari response
    let questions: GeneratedQuestion[] = []
    try {
      // Coba parse langsung
      questions = JSON.parse(response)
    } catch {
      // Cari JSON array di dalam response
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        try {
          questions = JSON.parse(jsonMatch[0])
        } catch {
          return NextResponse.json({ error: 'Gagal parse respons AI. Coba lagi.' }, { status: 500 })
        }
      } else {
        return NextResponse.json({ error: 'AI tidak mengembalikan format yang valid. Coba lagi.' }, { status: 500 })
      }
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'AI tidak menghasilkan soal. Coba lagi.' }, { status: 500 })
    }

    // Validasi setiap soal
    const validQuestions = questions.filter(q =>
      q.question && q.optionA && q.optionB && q.optionC && q.optionD &&
      q.correctAnswer !== undefined && q.explanation
    ).map(q => ({
      ...q,
      correctAnswer: Math.max(0, Math.min(3, Number(q.correctAnswer))),
      category: q.category || category || 'Konsep Dasar',
    }))

    if (validQuestions.length === 0) {
      return NextResponse.json({ error: 'Soal yang dihasilkan tidak valid. Coba lagi.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      questions: validQuestions,
      count: validQuestions.length,
    })
  } catch (error) {
    console.error('AI generate error:', error)
    return NextResponse.json({ error: 'Gagal generate soal dengan AI' }, { status: 500 })
  }
}
