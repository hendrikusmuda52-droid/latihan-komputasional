import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import * as XLSX from 'xlsx'
import crypto from 'crypto'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get('teacher_token')?.value
  return !!(token && g.__teacherSessions?.has(token))
}

const VALID_KELAS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B']
const VALID_JK = ['Laki-laki', 'Perempuan']

interface ParsedRow {
  rowNumber: number
  nisn: string
  namaLengkap: string
  password: string
  kelas: string
  sekolah: string
  jenisKelamin: string
  isActive: boolean
  errors: string[]
}

// POST: import siswa dari file Excel/CSV
export async function POST(req: NextRequest) {
  try {
    if (!(await requireAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    }

    const filename = file.name.toLowerCase()
    if (!filename.endsWith('.xlsx') && !filename.endsWith('.xls') && !filename.endsWith('.csv')) {
      return NextResponse.json(
        { error: 'Format file tidak didukung. Gunakan .xlsx, .xls, atau .csv' },
        { status: 400 }
      )
    }

    const buffer = await file.arrayBuffer()
    const wb = XLSX.read(buffer, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' })

    if (rows.length === 0) {
      return NextResponse.json({ error: 'File kosong atau tidak ada data' }, { status: 400 })
    }

    if (rows.length > 500) {
      return NextResponse.json(
        { error: 'Maksimal 500 siswa per import. Pisahkan ke beberapa file.' },
        { status: 400 }
      )
    }

    // Parse & validasi
    const parsed: ParsedRow[] = []
    rows.forEach((row, idx) => {
      const errors: string[] = []
      const raw = (val: unknown) => String(val ?? '').trim()

      const nisn = raw(row.nisn || row.NISN)
      const namaLengkap = raw(row.namaLengkap || row.nama || row.Nama || row['Nama Lengkap'])
      const password = raw(row.password || row.Password || row.kataSandi)
      const kelas = raw(row.kelas || row.Kelas).toUpperCase()
      const sekolah = raw(row.sekolah || row.Sekolah || row['Asal Sekolah'])
      const jenisKelamin = raw(row.jenisKelamin || row.jk || row['Jenis Kelamin'])
      const isActiveRaw = raw(row.isActive || row.aktif || row.Aktif).toLowerCase()

      // Validasi
      if (!nisn) errors.push('nisn wajib diisi')
      else if (!/^\d{4,20}$/.test(nisn)) errors.push('nisn harus 4-20 digit angka')

      if (!namaLengkap) errors.push('namaLengkap wajib diisi')
      if (!password) errors.push('password wajib diisi')
      else if (password.length < 4) errors.push('password minimal 4 karakter')

      if (!VALID_KELAS.includes(kelas)) {
        errors.push(`kelas harus salah satu: ${VALID_KELAS.join(', ')}`)
      }
      if (!sekolah) errors.push('sekolah wajib diisi')
      if (!VALID_JK.includes(jenisKelamin)) {
        errors.push(`jenisKelamin harus "Laki-laki" atau "Perempuan"`)
      }

      parsed.push({
        rowNumber: idx + 2,
        nisn,
        namaLengkap,
        password,
        kelas,
        sekolah,
        jenisKelamin,
        isActive: isActiveRaw === '' || isActiveRaw === 'ya' || isActiveRaw === 'true' || isActiveRaw === '1',
        errors,
      })
    })

    const validRows = parsed.filter((r) => r.errors.length === 0)
    const invalidRows = parsed.filter((r) => r.errors.length > 0)

    const url = new URL(req.url)
    const mode = url.searchParams.get('mode') || 'preview'

    if (mode === 'preview') {
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

    // mode=save
    if (validRows.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Tidak ada data valid untuk disimpan',
        invalid: invalidRows,
      })
    }

    // Cek NISN yang sudah ada di database
    const existingStudents = await db.student.findMany({
      where: { nisn: { in: validRows.map((r) => r.nisn) } },
      select: { nisn: true },
    })
    const existingSet = new Set(existingStudents.map((s) => s.nisn))

    const toInsert = validRows.filter((r) => !existingSet.has(r.nisn))
    const duplicates = validRows.filter((r) => existingSet.has(r.nisn))

    if (toInsert.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Semua NISN sudah ada di database (duplikat)',
        duplicates: duplicates.length,
      })
    }

    // Insert batch
    const inserted = await db.$transaction(
      toInsert.map((r) =>
        db.student.create({
          data: {
            nisn: r.nisn,
            namaLengkap: r.namaLengkap,
            password: crypto.createHash('sha256').update(r.password).digest('hex'),
            kelas: r.kelas,
            sekolah: r.sekolah,
            jenisKelamin: r.jenisKelamin,
            isActive: r.isActive,
          },
        })
      )
    )

    return NextResponse.json({
      success: true,
      message: `${inserted.length} siswa berhasil diimpor`,
      insertedCount: inserted.length,
      duplicateCount: duplicates.length,
      invalidCount: invalidRows.length,
      invalid: invalidRows,
    })
  } catch (error) {
    console.error('Import student error:', error)
    return NextResponse.json(
      { error: 'Gagal import siswa: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
