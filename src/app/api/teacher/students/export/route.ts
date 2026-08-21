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
          kelas: true,
          sekolah: true,
          jenisKelamin: true,
          isActive: true,
          createdAt: true,
        },
      })
    )

    // Transform to Excel-friendly format
    const excelData = (students || []).map((s) => ({
      NISN: s.nisn,
      'Nama Lengkap': s.namaLengkap,
      Kelas: s.kelas,
      Sekolah: s.sekolah,
      'Jenis Kelamin': s.jenisKelamin,
      Status: s.isActive ? 'Aktif' : 'Nonaktif',
    }))

    const ws = XLSX.utils.json_to_sheet(excelData)
    ws['!cols'] = [
      { wch: 15 },  // NISN
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
