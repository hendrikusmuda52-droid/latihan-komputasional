import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { requireTeacherAuth } from '@/lib/auth'

// Auth via stateless JWT - see @/lib/auth

// GET: download template Excel untuk import soal
// ── Bug fix: kolom category dihapus dari template ──
// Soal sekarang dikaitkan ke CP/TP yang dipilih guru di dropdown UI,
// bukan dari kolom category di Excel.
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    // ── Template with subjectName column + SMP/SMK examples ──
    const data = [
      {
        subjectName: 'Informatika',
        gradeLevel: '7',
        question: 'Contoh soal untuk kelas 7 SMP...',
        optionA: 'Pilihan jawaban A',
        optionB: 'Pilihan jawaban B',
        optionC: 'Pilihan jawaban C',
        optionD: 'Pilihan jawaban D',
        correctAnswer: 'B',
        explanation: 'Pembahasan mengapa jawaban B benar...',
        isActive: 'Ya',
      },
      {
        subjectName: 'Informatika',
        gradeLevel: '8',
        question: 'Contoh soal untuk kelas 8 SMP...',
        optionA: 'Pilihan A',
        optionB: 'Pilihan B',
        optionC: 'Pilihan C',
        optionD: 'Pilihan D',
        correctAnswer: 'D',
        explanation: 'Pembahasan jawaban D...',
        isActive: 'Ya',
      },
      {
        subjectName: 'Informatika',
        gradeLevel: '9',
        question: 'Contoh soal untuk kelas 9 SMP...',
        optionA: 'Pilihan A',
        optionB: 'Pilihan B',
        optionC: 'Pilihan C',
        optionD: 'Pilihan D',
        correctAnswer: 'A',
        explanation: 'Pembahasan jawaban A...',
        isActive: 'Ya',
      },
      {
        subjectName: 'Mata Pelajaran Kejuruan',
        gradeLevel: '11DKV',
        question: 'Contoh soal untuk kelas 11 SMK DKV...',
        optionA: 'Pilihan A',
        optionB: 'Pilihan B',
        optionC: 'Pilihan C',
        optionD: 'Pilihan D',
        correctAnswer: 'C',
        explanation: 'Pembahasan jawaban C...',
        isActive: 'Ya',
      },
      {
        subjectName: 'Mata Pelajaran Pilihan',
        gradeLevel: '12DKV',
        question: 'Contoh soal untuk kelas 12 SMK DKV...',
        optionA: 'Pilihan A',
        optionB: 'Pilihan B',
        optionC: 'Pilihan C',
        optionD: 'Pilihan D',
        correctAnswer: 'B',
        explanation: 'Pembahasan jawaban B...',
        isActive: 'Ya',
      },
    ]

    const ws = XLSX.utils.json_to_sheet(data)

    // Set lebar kolom — NO category column
    ws['!cols'] = [
      { wch: 20 },  // subjectName
      { wch: 12 },  // gradeLevel
      { wch: 50 },  // question
      { wch: 35 },  // optionA
      { wch: 35 },  // optionB
      { wch: 35 },  // optionC
      { wch: 35 },  // optionD
      { wch: 14 },  // correctAnswer
      { wch: 50 },  // explanation
      { wch: 10 },  // isActive
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Soal')

    // ── Updated instructions: NO category column ──
    const instructions = [
      { Panduan: 'TEMPLATE IMPORT SOAL HOTS - SAKOLA (SMP + SMK)' },
      { Panduan: '' },
      { Panduan: 'KOLOM WAJIB DIISI:' },
      { Panduan: '1. subjectName: Nama Mata Pelajaran (TEKS, wajib diisi)' },
      { Panduan: '   • SMP: Informatika, Matematika, Bahasa Indonesia, dll.' },
      { Panduan: '   • SMK: Mata Pelajaran Kejuruan, Mata Pelajaran Pilihan' },
      { Panduan: '   • Jika dikosongkan, sistem akan menggunakan mapel dari dropdown UI' },
      { Panduan: '2. gradeLevel: kelas dalam format TEKS' },
      { Panduan: '   • SMP: 7, 8, 9' },
      { Panduan: '   • SMK: 11DKV, 12DKV (tanpa spasi)' },
      { Panduan: '   • Huruf kecil diterima: "11dkv" akan otomatis jadi "11DKV"' },
      { Panduan: '3. question: teks pertanyaan (bebas panjang)' },
      { Panduan: '4. optionA, optionB, optionC, optionD: 4 pilihan jawaban' },
      { Panduan: '5. correctAnswer: huruf A, B, C, atau D (kapital)' },
      { Panduan: '6. explanation: pembahasan mengapa jawaban benar' },
      { Panduan: '7. isActive: "Ya" untuk aktif, "Tidak" untuk nonaktif (default: Ya)' },
      { Panduan: '' },
      { Panduan: 'CATATAN PENTING:' },
      { Panduan: '- Baris pertama (header) JANGAN diubah atau dihapus' },
      { Panduan: '- subjectName harus sesuai dengan mapel yang tersedia di sistem' },
      { Panduan: '- gradeLevel HARUS teks: 7, 8, 9, 11DKV, atau 12DKV' },
      { Panduan: '- correctAnswer HARUS huruf kapital A/B/C/D' },
      { Panduan: '- Soal yang sudah ada tidak akan diduplikasi (cek berdasarkan teks pertanyaan)' },
      { Panduan: '- Maksimal 200 soal per import' },
      { Panduan: '' },
      { Panduan: 'CP/TP (Capaian & Tujuan Pembelajaran):' },
      { Panduan: '- TIDAK ADA kolom CP/TP di file Excel ini' },
      { Panduan: '- Pilih CP/TP di form import (dropdown di atas tombol Upload)' },
      { Panduan: '- CP/TP yang dipilih akan berlaku untuk SEMUA soal di file ini' },
      { Panduan: '- Jika tidak memilih CP/TP, soal tetap tersimpan (cpId/tpId = null)' },
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
