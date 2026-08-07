import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import * as XLSX from 'xlsx'
import { requireTeacherAuth } from '@/lib/auth'

// Auth via stateless JWT - see @/lib/auth

const VALID_CATEGORIES = [
  'Dekomposisi',
  'Pengenalan Pola',
  'Abstraksi',
  'Algoritma',
  'Konsep Dasar',
  'Internet',
  'Etika Digital',
  'Keamanan Digital',
  'Kesehatan Digital',
]

interface ParsedRow {
  rowNumber: number
  gradeLevel: string
  category: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: number
  explanation: string
  isActive: boolean
  errors: string[]
}

// POST: import soal dari file Excel/CSV
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    }

    // Cek ekstensi
    const filename = file.name.toLowerCase()
    if (!filename.endsWith('.xlsx') && !filename.endsWith('.xls') && !filename.endsWith('.csv')) {
      return NextResponse.json(
        { error: 'Format file tidak didukung. Gunakan .xlsx, .xls, atau .csv' },
        { status: 400 }
      )
    }

    // Parse file
    const buffer = await file.arrayBuffer()
    const wb = XLSX.read(buffer, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' })

    if (rows.length === 0) {
      return NextResponse.json({ error: 'File kosong atau tidak ada data' }, { status: 400 })
    }

    if (rows.length > 200) {
      return NextResponse.json(
        { error: 'Maksimal 200 soal per import. Pisahkan ke beberapa file.' },
        { status: 400 }
      )
    }

    // Parse & validasi tiap baris
    const parsed: ParsedRow[] = []
    rows.forEach((row, idx) => {
      const errors: string[] = []
      const raw = (val: unknown) => String(val ?? '').trim()

      const gradeLevel = raw(row.gradeLevel || row.grade || row.kelas)
      const category = raw(row.category || row.kategori)
      const question = raw(row.question || row.pertanyaan || row.soal)
      const optionA = raw(row.optionA || row.A || row.pilihanA)
      const optionB = raw(row.optionB || row.B || row.pilihanB)
      const optionC = raw(row.optionC || row.C || row.pilihanC)
      const optionD = raw(row.optionD || row.D || row.pilihanD)
      const correctLetter = raw(row.correctAnswer || row.jawaban || row.correct).toUpperCase()
      const explanation = raw(row.explanation || row.pembahasan)
      const isActiveRaw = raw(row.isActive || row.aktif).toLowerCase()

      // Validasi
      if (!['7', '8', '9'].includes(gradeLevel)) {
        errors.push('gradeLevel harus 8 atau 9')
      }
      if (!VALID_CATEGORIES.includes(category)) {
        errors.push(`category harus salah satu: ${VALID_CATEGORIES.join(', ')}`)
      }
      if (!question) errors.push('question wajib diisi')
      if (!optionA) errors.push('optionA wajib diisi')
      if (!optionB) errors.push('optionB wajib diisi')
      if (!optionC) errors.push('optionC wajib diisi')
      if (!optionD) errors.push('optionD wajib diisi')
      if (!['A', 'B', 'C', 'D'].includes(correctLetter)) {
        errors.push('correctAnswer harus A, B, C, atau D')
      }
      if (!explanation) errors.push('explanation wajib diisi')

      parsed.push({
        rowNumber: idx + 2, // +2 karena baris 1 adalah header
        gradeLevel,
        category,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer: ['A', 'B', 'C', 'D'].indexOf(correctLetter),
        explanation,
        isActive: isActiveRaw === '' || isActiveRaw === 'ya' || isActiveRaw === 'true' || isActiveRaw === '1',
        errors,
      })
    })

    // Pisahkan valid & invalid
    const validRows = parsed.filter((r) => r.errors.length === 0)
    const invalidRows = parsed.filter((r) => r.errors.length > 0)

    // Ambil query param: mode=preview atau mode=save
    const url = new URL(req.url)
    const mode = url.searchParams.get('mode') || 'preview'

    if (mode === 'preview') {
      // Hanya return hasil parsing untuk preview
      return NextResponse.json({
        success: true,
        preview: true,
        totalRows: parsed.length,
        validCount: validRows.length,
        invalidCount: invalidRows.length,
        valid: validRows,
        invalid: invalidRows,
      })
    }

    // mode=save: simpan ke DB
    if (validRows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Tidak ada soal valid untuk disimpan',
        invalid: invalidRows,
      })
    }

    // Cek duplikat berdasarkan teks pertanyaan
    const existingQuestions = await db.question.findMany({
      where: { question: { in: validRows.map((r) => r.question) } },
      select: { question: true },
    })
    const existingSet = new Set(existingQuestions.map((q) => q.question))

    const toInsert = validRows.filter((r) => !existingSet.has(r.question))
    const duplicates = validRows.filter((r) => existingSet.has(r.question))

    if (toInsert.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Semua soal sudah ada di database (duplikat)',
        duplicates: duplicates.length,
      })
    }

    // Insert batch
    const inserted = await db.$transaction(
      toInsert.map((r) =>
        db.question.create({
          data: {
            gradeLevel: r.gradeLevel,
            question: r.question,
            optionA: r.optionA,
            optionB: r.optionB,
            optionC: r.optionC,
            optionD: r.optionD,
            correctAnswer: r.correctAnswer,
            explanation: r.explanation,
            category: r.category,
            isActive: r.isActive,
          },
        })
      )
    )

    return NextResponse.json({
      success: true,
      message: `${inserted.length} soal berhasil diimpor`,
      insertedCount: inserted.length,
      duplicateCount: duplicates.length,
      invalidCount: invalidRows.length,
      invalid: invalidRows,
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: 'Gagal import soal: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
