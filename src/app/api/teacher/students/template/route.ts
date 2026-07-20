import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

// GET: download template Excel untuk import siswa
export async function GET(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    // Data template dengan contoh
    const data = [
      {
        nisn: '1234567890',
        namaLengkap: 'Budi Santoso',
        password: 'siswa123',
        kelas: '8A',
        sekolah: 'SMP Negeri 1 Jakarta',
        jenisKelamin: 'Laki-laki',
        isActive: 'Ya',
      },
      {
        nisn: '0987654321',
        namaLengkap: 'Siti Aminah',
        password: 'siswa456',
        kelas: '9A',
        sekolah: 'SMP Negeri 1 Jakarta',
        jenisKelamin: 'Perempuan',
        isActive: 'Ya',
      },
    ]

    const ws = XLSX.utils.json_to_sheet(data)

    // Set lebar kolom
    ws['!cols'] = [
      { wch: 15 },  // nisn
      { wch: 25 },  // namaLengkap
      { wch: 15 },  // password
      { wch: 8 },   // kelas
      { wch: 30 },  // sekolah
      { wch: 12 },  // jenisKelamin
      { wch: 8 },   // isActive
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Siswa')

    // Sheet panduan
    const instructions = [
      { Panduan: 'TEMPLATE IMPORT DATA SISWA - LATIHAN KOMPUTASIONAL' },
      { Panduan: '' },
      { Panduan: 'KOLOM WAJIB DIISI:' },
      { Panduan: '1. nisn: NISN siswa (unik, tidak boleh duplikat)' },
      { Panduan: '2. namaLengkap: Nama lengkap siswa' },
      { Panduan: '3. password: Password untuk login siswa (minimal 4 karakter)' },
      { Panduan: '4. kelas: 8A, 8B, 8C, 9A, atau 9B' },
      { Panduan: '5. sekolah: Nama sekolah siswa' },
      { Panduan: '6. jenisKelamin: "Laki-laki" atau "Perempuan"' },
      { Panduan: '7. isActive: "Ya" (aktif) atau "Tidak" (nonaktif) — default: Ya' },
      { Panduan: '' },
      { Panduan: 'CATATAN PENTING:' },
      { Panduan: '- Baris pertama (header) JANGAN diubah atau dihapus' },
      { Panduan: '- NISN yang sudah ada di database akan di-skip (tidak duplikat)' },
      { Panduan: '- Password minimal 4 karakter' },
      { Panduan: '- Maksimal 500 siswa per import' },
      { Panduan: '- Format file yang didukung: .xlsx, .xls, .csv' },
      { Panduan: '' },
      { Panduan: 'CONTOH PENGISIAN:' },
      { Panduan: 'nisn=1234567890, namaLengkap=Budi Santoso, password=siswa123' },
      { Panduan: 'kelas=8A, sekolah=SMP Negeri 1 Jakarta, jenisKelamin=Laki-laki' },
    ]
    const wsInstr = XLSX.utils.json_to_sheet(instructions)
    wsInstr['!cols'] = [{ wch: 100 }]
    XLSX.utils.book_append_sheet(wb, wsInstr, 'Panduan')

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="template-import-siswa.xlsx"',
      },
    })
  } catch (error) {
    console.error('Error generating template:', error)
    return NextResponse.json({ error: 'Gagal membuat template' }, { status: 500 })
  }
}
