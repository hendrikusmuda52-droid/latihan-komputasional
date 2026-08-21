import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'

// ──────────────────────────────────────────────────────────────────
// B. GEMINI API KEY SECURITY:
// The API key is stored ONLY in the backend environment variable
// (GEMINI_API_KEY in .env, gitignored). It is NEVER exposed to the
// client. All AI requests go through this API route, which validates
// the teacher's JWT authentication via requireTeacherAuth() before
// processing. The z-ai-web-dev-sdk reads the key from process.env
// automatically — it is never sent to the frontend.
// ──────────────────────────────────────────────────────────────────

// Helper: extract text from PDF using a simple approach
// (In production, use pdf-parse or pdfjs-dist for better extraction)
async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
  try {
    // Use pdfjs-dist for server-side text extraction
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
    const loadingTask = pdfjsLib.getDocument({ data: buffer })
    const pdf = await loadingTask.promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: unknown) => {
          const textItem = item as { str?: string }
          return textItem.str || ''
        })
        .join(' ')
      fullText += pageText + '\n\n'
    }

    return fullText.substring(0, 10000) // Limit to 10K chars for AI context
  } catch (error) {
    console.error('[generate-from-document] PDF extraction error:', error)
    // Fallback: try to read as text (some "PDF" files might be text)
    try {
      const text = new TextDecoder().decode(buffer)
      return text.substring(0, 10000)
    } catch {
      return ''
    }
  }
}

// Helper: extract text from DOC/DOCX
async function extractTextFromDOCX(buffer: ArrayBuffer): Promise<string> {
  try {
    // Use mammoth for DOCX text extraction
    const mammoth = await import('mammoth')
    const result = await mammoth.extractRawText({ arrayBuffer: buffer })
    return (result.value || '').substring(0, 10000)
  } catch (error) {
    console.error('[generate-from-document] DOCX extraction error:', error)
    // Fallback: try to read as text
    try {
      const text = new TextDecoder().decode(buffer)
      // Strip binary characters for .doc files
      return text.replace(/[^\x20-\x7E\n\r]/g, ' ').substring(0, 10000)
    } catch {
      return ''
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    // Bug #13 fix: rate limit AI generation (10 req/min per teacher)
    const rateLimited = checkRateLimit(req, 'generate-from-document')
    if (rateLimited) return rateLimited

    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const cpId = formData.get('cpId') as string
    const tpId = formData.get('tpId') as string
    const generateType = formData.get('generateType') as string // 'materi' or 'soal' or 'both'
    const questionCount = parseInt(formData.get('questionCount') as string) || 5
    const questionType = formData.get('questionType') as string || 'pilihan_ganda'

    if (!file) {
      return NextResponse.json({ error: 'File wajib diunggah' }, { status: 400 })
    }
    if (!cpId || !tpId) {
      return NextResponse.json({ error: 'CP dan TP wajib dipilih' }, { status: 400 })
    }

    // Validate file type
    const filename = file.name.toLowerCase()
    const isPDF = filename.endsWith('.pdf')
    const isDOCX = filename.endsWith('.docx') || filename.endsWith('.doc')
    if (!isPDF && !isDOCX) {
      return NextResponse.json({ error: 'Format file tidak didukung. Gunakan PDF atau DOC/DOCX.' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Ukuran file maksimal 10MB' }, { status: 400 })
    }

    // Extract text from document
    const arrayBuffer = await file.arrayBuffer()
    let extractedText = ''

    if (isPDF) {
      extractedText = await extractTextFromPDF(arrayBuffer)
    } else if (isDOCX) {
      extractedText = await extractTextFromDOCX(arrayBuffer)
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return NextResponse.json({
        error: 'Tidak dapat mengekstrak teks dari dokumen. Pastikan file berisi teks yang dapat dibaca (bukan hasil scan gambar).'
      }, { status: 400 })
    }

    // Fetch CP and TP for context
    const cp = await db.capaianPembelajaran.findUnique({ where: { id: cpId } })
    const tp = await db.tujuanPembelajaran.findUnique({ where: { id: tpId } })
    if (!cp || !tp) {
      return NextResponse.json({ error: 'CP atau TP tidak ditemukan' }, { status: 400 })
    }

    const teacherSubject = teacher.subject || 'Informatika'
    const zai = await ZAI.create()

    let materiResult: { id: string; title: string; contentPreview: string } | null = null
    let soalResult: { count: number } | null = null

    // ── Generate Materi ──
    if (generateType === 'materi' || generateType === 'both') {
      const materiPrompt = `Kamu adalah guru ${teacherSubject} di Indonesia. Berdasarkan dokumen berikut, buatlah rangkuman materi pembelajaran yang terstruktur untuk siswa.

CONTEXT:
- CP: ${cp.kodeCP} — ${cp.deskripsi}
- TP: ${tp.kodeTP} — ${tp.deskripsi}

KONTEN DOKUMEN:
${extractedText.substring(0, 6000)}

INSTRUKSI:
1. Buat rangkuman materi dalam format markdown dengan struktur yang jelas
2. Sertakan judul, pendahuluan, poin-poin utama, dan ringkasan
3. Gunakan bahasa Indonesia yang mudah dipahami siswa
4. Maksimal 800 kata
5. Gunakan emoji untuk membuat materi menarik
6. Hubungkan konten dengan CP dan TP yang ditentukan

Balis dengan teks markdown langsung, tanpa JSON atau kode.`

      const materiCompletion = await zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: 'Kamu adalah asisten yang membuat materi pembelajaran berkualitas dalam Bahasa Indonesia.' },
          { role: 'user', content: materiPrompt },
        ],
        thinking: { type: 'disabled' },
      })

      const materiContent = materiCompletion.choices[0]?.message?.content || ''
      if (materiContent && materiContent.trim().length > 50) {
        // Save materi to database
        const materi = await db.material.create({
          data: {
            title: `Materi: ${tp.kodeTP} — ${file.name.replace(/\.(pdf|docx?|PDF|DOCX?)$/, '')}`,
            content: materiContent,
            subject: teacherSubject,
            targetKelas: 'ALL',
            category: cp.kodeCP,
            cpId,
            tpId,  // Bug #8 fix: use consolidated tpId field (was newTpId)
            mediaType: 'teks',
            isActive: true,
            teacherId: teacher.teacherId,
          },
        })
        materiResult = { id: materi.id, title: materi.title, contentPreview: materiContent.substring(0, 200) + '...' }
      }
    }

    // ── Generate Soal ──
    if (generateType === 'soal' || generateType === 'both') {
      const count = Math.min(Math.max(questionCount, 1), 20)
      const finalQuestionType = questionType

      let typeInstructions = ''
      switch (finalQuestionType) {
        case 'pilihan_ganda':
          typeInstructions = 'PILIHAN GANDA dengan 4 opsi (A,B,C,D) dan satu jawaban benar (correctAnswer: 0-3).'
          break
        case 'pilihan_ganda_kompleks':
          typeInstructions = 'PILIHAN GANDA KOMPLEKS (checkbox) dengan 4-5 opsi, jawaban benar BISA LEBIH DARI SATU. correctAnswers: [0,2,3].'
          break
        case 'mencocokkan':
          typeInstructions = 'MENCOCOKKAN/JODOHKAN. Buat 4-5 pasangan. matchPairs: [{key, value}].'
          break
        case 'isian_singkat':
          typeInstructions = 'ISIAN SINGKAT. shortAnswer berisi jawaban yang diterima (pisahkan dengan |).'
          break
        case 'essai':
          typeInstructions = 'ESSAI/URAIAN. essayAnswer sebagai kunci jawaban/rubrik.'
          break
        default:
          typeInstructions = 'PILIHAN GANDA dengan 4 opsi.'
      }

      const soalPrompt = `Kamu adalah guru ${teacherSubject} di Indonesia. Berdasarkan dokumen berikut, buatlah ${count} soal untuk siswa.

CONTEXT:
- CP: ${cp.kodeCP} — ${cp.deskripsi}
- TP: ${tp.kodeTP} — ${tp.deskripsi}

KONTEN DOKUMEN:
${extractedText.substring(0, 6000)}

INSTRUKSI:
Buat ${count} soal dalam format: ${typeInstructions}

Untuk SETIAP soal, WAJIB sertakan:
1. levelKognitif: C1-C6 (Taksonomi Bloom)
2. pembahasanBenar: penjelasan mengapa kunci jawaban BENAR
3. analisisDistraktor: penjelasan mengapa opsi lain SALAH
4. category: "${cp.kodeCP}"

WAJIB balas dalam format JSON array:
[{
  "question": "...",
  "questionType": "${finalQuestionType}",
  "optionA": "...", "optionB": "...", "optionC": "...", "optionD": "...",
  "correctAnswer": 0,
  "correctAnswers": [0],
  "matchPairs": [],
  "shortAnswer": "",
  "essayAnswer": "",
  "explanation": "...",
  "category": "${cp.kodeCP}",
  "levelKognitif": "C2",
  "pembahasanBenar": "...",
  "analisisDistraktor": "..."
}]`

      const soalCompletion = await zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: 'Kamu membuat soal pembelajaran berkualitas dalam Bahasa Indonesia. Selalu balas dengan JSON array yang valid.' },
          { role: 'user', content: soalPrompt },
        ],
        thinking: { type: 'disabled' },
      })

      const soalResponse = soalCompletion.choices[0]?.message?.content || ''

      let questions: Array<Record<string, unknown>> = []
      try {
        questions = JSON.parse(soalResponse)
      } catch {
        const jsonMatch = soalResponse.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          try { questions = JSON.parse(jsonMatch[0]) }
          catch { questions = [] }
        }
      }

      if (Array.isArray(questions) && questions.length > 0) {
        // Save questions to database
        const savedQuestions = await db.$transaction(
          questions.filter(q => q.question).map(q =>
            db.question.create({
              data: {
                gradeLevel: cp.gradeLevel,
                subject: teacherSubject,
                question: String(q.question),
                optionA: String(q.optionA || ''),
                optionB: String(q.optionB || ''),
                optionC: String(q.optionC || ''),
                optionD: String(q.optionD || ''),
                correctAnswer: Number(q.correctAnswer) || 0,
                explanation: String(q.explanation || ''),
                category: String(q.category || cp.kodeCP),
                isActive: true,
                teacherId: teacher.teacherId,
                questionType: String(q.questionType || finalQuestionType),
                correctAnswers: JSON.stringify(q.correctAnswers || []),
                matchPairs: JSON.stringify(q.matchPairs || []),
                shortAnswer: String(q.shortAnswer || ''),
                essayAnswer: String(q.essayAnswer || ''),
                levelKognitif: String(q.levelKognitif || 'C2'),
                pembahasanBenar: String(q.pembahasanBenar || ''),
                analisisDistraktor: String(q.analisisDistraktor || ''),
                cpId,
                tpId,
              },
            })
          )
        )
        soalResult = { count: savedQuestions.length }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Dokumen berhasil diproses. ${materiResult ? 'Materi tersimpan. ' : ''}${soalResult ? `${soalResult.count} soal tersimpan.` : ''}`,
      materi: materiResult,
      soal: soalResult,
      extractedTextLength: extractedText.length,
    })
  } catch (error) {
    console.error('[generate-from-document] FATAL error:', error)
    return NextResponse.json({ error: 'Gagal memproses dokumen' }, { status: 500 })
  }
}
