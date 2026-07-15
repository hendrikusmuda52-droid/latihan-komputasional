import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

// GET: download template Excel untuk import soal
export async function GET(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    // Buat data template dengan contoh soal
    const data = [
      {
        gradeLevel: '8',
        category: 'Dekomposisi',
        question: 'Contoh soal dekomposisi untuk kelas 8...',
        optionA: 'Pilihan jawaban A',
        optionB: 'Pilihan jawaban B',
        optionC: 'Pilihan jawaban C',
        optionD: 'Pilihan jawaban D',
        correctAnswer: 'B',
        explanation: 'Pembahasan mengapa jawaban B benar...',
        isActive: 'Ya',
      },
      {
        gradeLevel: '9',
        category: 'Algoritma',
        question: 'Contoh soal algoritma untuk kelas 9...',
        optionA: 'Pilihan A',
        optionB: 'Pilihan B',
        optionC: 'Pilihan C',
        optionD: 'Pilihan D',
        correctAnswer: 'D',
        explanation: 'Pembahasan jawaban D...',
        isActive: 'Ya',
      },
    ]

    const ws = XLSX.utils.json_to_sheet(data)

    // Set lebar kolom
    ws['!cols'] = [
      { wch: 10 },  // gradeLevel
      { wch: 18 },  // category
      { wch: 50 },  // question
      { wch: 35 },  // optionA
      { wch: 35 },  // optionB
      { wch: 35 },  // optionC
      { wch: 35 },  // optionD
      { wch: 12 },  // correctAnswer
      { wch: 50 },  // explanation
      { wch: 10 },  // isActive
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Soal')

    // Tambah sheet instruksi
    const instructions = [
      { Panduan: 'TEMPLATE IMPORT SOAL HOTS - BERPIKIR KOMPUTASIONAL' },
      { Panduan: '' },
      { Panduan: 'KOLOM WAJIB DIISI:' },
      { Panduan: '1. gradeLevel: 8 atau 9 (jenjang kelas)' },
      { Panduan: '2. category: Dekomposisi / Pengenalan Pola / Abstraksi / Algoritma / Konsep Dasar' },
      { Panduan: '3. question: teks pertanyaan (bebas panjang)' },
      { Panduan: '4. optionA, optionB, optionC, optionD: 4 pilihan jawaban' },
      { Panduan: '5. correctAnswer: huruf A, B, C, atau D (kapital)' },
      { Panduan: '6. explanation: pembahasan mengapa jawaban benar' },
      { Panduan: '7. isActive: "Ya" untuk aktif, "Tidak" untuk nonaktif (default: Ya)' },
      { Panduan: '' },
      { Panduan: 'CATATAN PENTING:' },
      { Panduan: '- Baris pertama (header) JANGAN diubah atau dihapus' },
      { Panduan: '- correctAnswer HARUS huruf kapital A/B/C/D' },
      { Panduan: '- Soal dengan gradeLevel selain 8/9 akan ditolak' },
      { Panduan: '- Soal dengan kategori salah akan ditolak' },
      { Panduan: '- Soal yang sudah ada tidak akan diduplikasi (cek berdasarkan teks pertanyaan)' },
      { Panduan: '- Maksimal 200 soal per import' },
      { Panduan: '' },
      { Panduan: 'FORMAT FILE YANG DUKUNG: .xlsx, .xls, .csv' },
    ]
    const wsInstr = XLSX.utils.json_to_sheet(instructions)
    wsInstr['!cols'] = [{ wch: 100 }]
    XLSX.utils.book_append_sheet(wb, wsInstr, 'Panduan')

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="template-import-soal.xlsx"',
      },
    })
  } catch (error) {
    console.error('Error generating template:', error)
    return NextResponse.json({ error: 'Gagal membuat template' }, { status: 500 })
  }
}
