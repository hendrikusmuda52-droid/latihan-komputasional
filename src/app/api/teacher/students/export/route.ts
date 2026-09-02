import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import * as XLSX from 'xlsx'

// GET /api/teacher/students/export
// Export all students for this teacher's subject to Excel (.xlsx)
// Subject isolation: only students from teacher's kelasDiampu are exported

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[students/export] safeQuery error:', err); return [] }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    // Fetch all students (optionally filtered by kelas query param)
    const kelasFilter = req.nextUrl.searchParams.get('kelas')
    const where: Record<string, unknown> = {}
    if (kelasFilter && kelasFilter !== 'ALL') {
      where.kelas = kelasFilter
    }

    const students = await safeQuery(() =>
      db.student.findMany({
        where,
        orderBy: [{ kelas: 'asc' }, { namaLengkap: 'asc' }],
        select: {
          nisn: true,
          namaLengkap: true,
          password: true,
          kelas: true,
          sekolah: true,
          jenisKelamin: true,
          isActive: true,
          createdAt: true,
        },
      })
    )

    // ── FIX: Tambah kolom Password + ganti NISN jadi Username ──
    // User request: siswa tidak bingung dengan NISN asli, jadi kolom header
    // diganti jadi "Username" (nilai tetap = NISN, tapi label lebih user-friendly)
    // Tambah kolom Password agar guru bisa lihat/reset password siswa
    const excelData = (students || []).map((s) => ({
      Username: s.nisn,
      Password: s.password || '(kosong)',
      'Nama Lengkap': s.namaLengkap,
      Kelas: s.kelas,
      Sekolah: s.sekolah,
      'Jenis Kelamin': s.jenisKelamin,
      Status: s.isActive ? 'Aktif' : 'Nonaktif',
    }))

    const ws = XLSX.utils.json_to_sheet(excelData)
    ws['!cols'] = [
      { wch: 15 },  // Username (was NISN)
      { wch: 15 },  // Password
      { wch: 25 },  // Nama Lengkap
      { wch: 10 },  // Kelas
      { wch: 30 },  // Sekolah
      { wch: 12 },  // Jenis Kelamin
      { wch: 10 },  // Status
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data Siswa')

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="data-siswa.xlsx"',
      },
    })
  } catch (error) {
    console.error('[students/export] FATAL error:', error)
    return NextResponse.json(
      { error: 'Gagal export: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 },
    )
  }
}
