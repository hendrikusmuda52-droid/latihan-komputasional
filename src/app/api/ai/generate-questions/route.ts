import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

// Auth via stateless JWT - see @/lib/auth

interface GeneratedQuestion {
  question: string
  questionType: string
  optionA?: string
  optionB?: string
  optionC?: string
  optionD?: string
  correctAnswer?: number
  correctAnswers?: number[]
  matchPairs?: Array<{ key: string; value: string }>
  shortAnswer?: string
  essayAnswer?: string
  explanation: string
  category: string
  levelKognitif: string
  pembahasanBenar: string
  analisisDistraktor: string
}

// ── FIX 1: Strict JSON cleaning function ──
// Strips markdown code blocks (```json ... ```), extracts the JSON array,
// and handles various Gemini response formats.
function cleanAndParseJSON(response: string): GeneratedQuestion[] {
  if (!response || response.trim().length === 0) return []

  let cleaned = response.trim()

  // Step 1: Remove markdown code block wrappers (```json ... ``` or ``` ... ```)
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '')

  // Step 2: If there's still ``` in the middle, extract content between first ``` and last ```
  if (cleaned.includes('```')) {
    const blockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i)
    if (blockMatch) {
      cleaned = blockMatch[1].trim()
    }
  }

  // Step 3: Try direct parse
  try {
    const parsed = JSON.parse(cleaned)
    if (Array.isArray(parsed)) return parsed
    if (parsed && typeof parsed === 'object') return [parsed]
  } catch {
    // Continue to regex extraction
  }

  // Step 4: Extract JSON array using regex — find first [ and last ]
  const arrayMatch = cleaned.match(/\[[\s\S]*\]/)
  if (arrayMatch) {
    try {
      const parsed = JSON.parse(arrayMatch[0])
      if (Array.isArray(parsed)) return parsed
    } catch {
      // Continue to more aggressive cleaning
    }
  }

  // Step 5: Extract JSON object using regex — find first { and last }
  const objMatch = cleaned.match(/\{[\s\S]*\}/)
  if (objMatch) {
    try {
      const parsed = JSON.parse(objMatch[0])
      if (Array.isArray(parsed)) return parsed
      if (parsed && typeof parsed === 'object') return [parsed]
    } catch {
      // Continue
    }
  }

  // Step 6: Aggressive cleaning — remove all text before first [ or { and after last ] or }
  const firstBracket = cleaned.search(/[\[{]/)
  const lastBracket = cleaned.search(/[\]}]\s*$/)
  if (firstBracket !== -1 && lastBracket !== -1) {
    const extracted = cleaned.substring(firstBracket, lastBracket + 1)
    try {
      const parsed = JSON.parse(extracted)
      if (Array.isArray(parsed)) return parsed
      if (parsed && typeof parsed === 'object') return [parsed]
    } catch {
      // Give up
    }
  }

  return []  // parsing failed completely
}

// ── FIX 2: Generate fallback mock questions when Gemini fails ──
function generateFallbackQuestions(
  count: number,
  questionType: string,
  cp: { kodeCP: string; deskripsi: string },
  tp: { kodeTP: string; deskripsi: string },
  category: string,
  cpId: string,
  tpId: string,
): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = []

  for (let i = 1; i <= count; i++) {
    questions.push({
      question: `[Soal Template ${i}] Soal otomatis untuk TP: ${tp.kodeTP} — ${tp.deskripsi}. Klik tombol edit untuk mengubah pertanyaan ini secara manual sesuai kebutuhan Anda.`,
      questionType,
      optionA: 'Opsi A — edit jawaban benar',
      optionB: 'Opsi B — edit distraktor',
      optionC: 'Opsi C — edit distraktor',
      optionD: 'Opsi D — edit distraktor',
      correctAnswer: 0,
      correctAnswers: questionType === 'pilihan_ganda_kompleks' ? [0] : [0],
      matchPairs: questionType === 'mencocokkan' ? [
        { key: 'Konsep 1', value: 'Definisi 1' },
        { key: 'Konsep 2', value: 'Definisi 2' },
      ] : [],
      shortAnswer: questionType === 'isian_singkat' ? 'jawaban singkat' : '',
      essayAnswer: questionType === 'essai' ? 'Rubrik jawaban model — edit sesuai kebutuhan.' : '',
      explanation: `Template soal untuk ${cp.kodeCP}/${tp.kodeTP}. AI sedang mengalami gangguan, soal ini dibuat otomatis sebagai placeholder.`,
      category: category || cp.kodeCP,
      levelKognitif: 'C2',
      pembahasanBenar: 'Gunakan tombol edit untuk mengubah pertanyaan dan pembahasan ini secara manual. AI sedang mengalami gangguan koneksi.',
      analisisDistraktor: 'Edit distraktor (opsi salah) sesuai dengan kebutuhan soal Anda. Pastikan opsi salah bersifat plausibel namun jelas salah.',
    })
  }

  return questions
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    // Bug #13 fix: rate limit AI generation (10 req/min per teacher)
    const rateLimited = checkRateLimit(req, 'generate-questions')
    if (rateLimited) return rateLimited

    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 }) }

    const {
      materialContent, gradeLevel, questionCount, category,
      cpId, tpId, questionType, externalUrl, externalType,
    } = body as {
      materialContent?: string; gradeLevel?: string; questionCount?: number; category?: string
      cpId?: string; tpId?: string; questionType?: string; externalUrl?: string; externalType?: string
    }

    // v3: CP/TP anchoring is REQUIRED
    if (!cpId || !tpId) {
      return NextResponse.json({ error: 'CP dan TP wajib dipilih sebagai context anchor' }, { status: 400 })
    }

    // Fetch CP and TP for context
    const cp = await db.capaianPembelajaran.findUnique({ where: { id: cpId } })
    const tp = await db.tujuanPembelajaran.findUnique({ where: { id: tpId } })
    if (!cp || !tp) {
      return NextResponse.json({ error: 'CP atau TP tidak ditemukan' }, { status: 400 })
    }

    const count = Math.min(Math.max(questionCount || 5, 1), 20)
    const finalQuestionType = questionType || 'pilihan_ganda'
    const teacherSubject = teacher.subject || 'Informatika'

    // Build context for AI
    let contextSource = ''
    if (externalUrl && externalType === 'youtube') {
      contextSource = `Guru juga memberikan link video YouTube: ${externalUrl}. Buat soal berdasarkan topik video tersebut.`
    } else if (externalUrl && externalType === 'article') {
      contextSource = `Guru juga memberikan link artikel: ${externalUrl}. Buat soal berdasarkan isi artikel tersebut.`
    } else if (materialContent) {
      contextSource = `Materi referensi:\n${materialContent.substring(0, 3000)}`
    }

    // Build type-specific instructions
    let typeInstructions = ''
    switch (finalQuestionType) {
      case 'pilihan_ganda':
        typeInstructions = `Buat dalam format PILIHAN GANDA dengan 4 opsi (A,B,C,D) dan satu jawaban benar (correctAnswer: 0-3).`
        break
      case 'pilihan_ganda_kompleks':
        typeInstructions = `Buat dalam format PILIHAN GANDA KOMPLEKS (checkbox) dengan 4-5 opsi, jawaban benar BISA LEBIH DARI SATU. Gunakan correctAnswers sebagai array indeks [0,2,3].`
        break
      case 'mencocokkan':
        typeInstructions = `Buat dalam format MENCOCOKKAN/JODOHKAN. Buat 4-5 pasangan key-value. matchPairs: [{key, value}].`
        break
      case 'isian_singkat':
        typeInstructions = `Buat dalam format ISIAN SINGKAT. Sediakan shortAnswer berisi jawaban yang diterima (pisahkan dengan | jika ada beberapa variasi).`
        break
      case 'essai':
        typeInstructions = `Buat dalam format ESSAI/URAIAN. Sediakan essayAnswer sebagai kunci jawaban/rubrik model.`
        break
      default:
        typeInstructions = `Buat dalam format PILIHAN GANDA dengan 4 opsi.`
    }

    const prompt = `Kamu adalah guru ${teacherSubject} di Indonesia. Buatlah ${count} soal untuk siswa kelas ${gradeLevel}.

CONTEXT ANCHORING (WAJIB berdasarkan ini):
- Capaian Pembelajaran (CP): ${cp.kodeCP} — ${cp.deskripsi}
- Tujuan Pembelajaran (TP): ${tp.kodeTP} — ${tp.deskripsi}

${contextSource}

INSTRUKSI:
${typeInstructions}

Untuk SETIAP soal, WAJIB sertakan:
1. levelKognitif: salah satu dari C1 (Mengingat), C2 (Memahami), C3 (Menerapkan), C4 (Menganalisis), C5 (Mengevaluasi), C6 (Mencipta)
2. pembahasanBenar: penjelasan LOGIS mengapa kunci jawaban tersebut BENAR
3. analisisDistraktor: penjelasan mengapa opsi/pilihan LAIN SALAH
4. category: "${category || cp.kodeCP}"
5. explanation: ringkasan singkat pembahasan

WAJIB balis HANYA dalam format JSON array, TANPA teks tambahan, TANPA markdown code blocks:
[
  {
    "question": "Pertanyaan soal di sini?",
    "questionType": "${finalQuestionType}",
    "optionA": "Pilihan A",
    "optionB": "Pilihan B",
    "optionC": "Pilihan C",
    "optionD": "Pilihan D",
    "correctAnswer": 0,
    "correctAnswers": [0],
    "matchPairs": [],
    "shortAnswer": "",
    "essayAnswer": "",
    "explanation": "Pembahasan singkat",
    "category": "${category || cp.kodeCP}",
    "levelKognitif": "C2",
    "pembahasanBenar": "Penjelasan mengapa jawaban benar...",
    "analisisDistraktor": "Penjelasan mengapa opsi lain salah..."
  }
]`

    // ── FIX 2: Try Gemini API with fallback ──
    let questions: GeneratedQuestion[] = []
    let isFallback = false

    try {
      const zai = await ZAI.create()
      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: 'Kamu adalah asisten yang membuat soal pembelajaran berkualitas dalam Bahasa Indonesia. Selalu balas dengan JSON array yang valid, tanpa markdown code blocks.' },
          { role: 'user', content: prompt },
        ],
        thinking: { type: 'disabled' },
      })

      const response = completion.choices[0]?.message?.content || ''

      // ── FIX 1: Strict JSON cleaning + parsing ──
      questions = cleanAndParseJSON(response)

      if (questions.length === 0) {
        console.warn('[ai/generate-questions] JSON parsing returned empty array. Using fallback.')
        isFallback = true
        questions = generateFallbackQuestions(count, finalQuestionType, cp, tp, category || cp.kodeCP, cpId, tpId)
      }
    } catch (aiErr) {
      console.error('[ai/generate-questions] Gemini API error/timeout:', aiErr)
      // ── FIX 2: Return fallback questions (HTTP 200, not 500) ──
      isFallback = true
      questions = generateFallbackQuestions(count, finalQuestionType, cp, tp, category || cp.kodeCP, cpId, tpId)
    }

    // Validate & enrich each question
    const validQuestions = questions.filter(q => q.question).map(q => ({
      ...q,
      questionType: q.questionType || finalQuestionType,
      correctAnswer: Math.max(0, Math.min(3, Number(q.correctAnswer) || 0)),
      correctAnswers: Array.isArray(q.correctAnswers) ? q.correctAnswers : (finalQuestionType === 'pilihan_ganda_kompleks' ? [q.correctAnswer || 0] : []),
      matchPairs: Array.isArray(q.matchPairs) ? q.matchPairs : [],
      shortAnswer: q.shortAnswer || '',
      essayAnswer: q.essayAnswer || '',
      category: q.category || category || cp.kodeCP,
      levelKognitif: ['C1','C2','C3','C4','C5','C6'].includes(q.levelKognitif) ? q.levelKognitif : 'C2',
      pembahasanBenar: q.pembahasanBenar || q.explanation || '',
      analisisDistraktor: q.analisisDistraktor || '',
      cpId, tpId,
    }))

    if (validQuestions.length === 0) {
      // Last resort: generate fallback
      isFallback = true
      const fallback = generateFallbackQuestions(count, finalQuestionType, cp, tp, category || cp.kodeCP, cpId, tpId)
      return NextResponse.json({
        success: true,
        questions: fallback,
        count: fallback.length,
        fallback: true,
        message: 'AI sedang mengalami gangguan. Soal template otomatis dibuat — silakan edit manual.',
        meta: { cpId, tpId, cpKode: cp.kodeCP, tpKode: tp.kodeTP, questionType: finalQuestionType },
      })
    }

    // ── FIX 2: Always return 200, even with fallback ──
    return NextResponse.json({
      success: true,
      questions: validQuestions,
      count: validQuestions.length,
      fallback: isFallback,
      message: isFallback ? 'AI sedang mengalami gangguan. Soal template otomatis dibuat — silakan edit manual.' : undefined,
      meta: { cpId, tpId, cpKode: cp.kodeCP, tpKode: tp.kodeTP, questionType: finalQuestionType },
    })
  } catch (error) {
    console.error('[ai/generate-questions] FATAL error:', error)
    // ── FIX 2: Never return 500 — return 200 with fallback ──
    // We need cp/tp for fallback, but they might not be available here.
    // Return a generic fallback.
    return NextResponse.json({
      success: true,
      questions: [{
        question: 'Soal template otomatis — AI sedang mengalami gangguan. Silakan edit pertanyaan ini secara manual.',
        questionType: 'pilihan_ganda',
        optionA: 'Opsi A — edit jawaban benar',
        optionB: 'Opsi B — edit distraktor',
        optionC: 'Opsi C — edit distraktor',
        optionD: 'Opsi D — edit distraktor',
        correctAnswer: 0,
        correctAnswers: [0],
        matchPairs: [],
        shortAnswer: '',
        essayAnswer: '',
        explanation: 'Template soal otomatis. AI sedang mengalami gangguan koneksi.',
        category: 'Umum',
        levelKognitif: 'C2',
        pembahasanBenar: 'Gunakan tombol edit untuk mengubah pertanyaan ini secara manual.',
        analisisDistraktor: 'Edit distraktor sesuai kebutuhan soal Anda.',
      }],
      count: 1,
      fallback: true,
      message: 'AI sedang mengalami gangguan. Soal template otomatis dibuat — silakan edit manual.',
    })
  }
}
