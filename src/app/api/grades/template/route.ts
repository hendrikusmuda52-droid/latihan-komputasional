import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import * as XLSX from 'xlsx'

// GET /api/grades/template?type=per_cp|sts_sas
// Download template Excel untuk import nilai

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const type = req.nextUrl.searchParams.get('type') || 'per_cp'
    const kelasParam = req.nextUrl.searchParams.get('kelas')

    // Fetch students untuk template
    const where: Record<string, unknown> = { isActive: true }
    if (kelasParam && kelasParam !== 'ALL') {
      where.kelas = kelasParam
    }

    const students = await db.student.findMany({
      where,
      select: { nisn: true, namaLengkap: true, kelas: true },
      orderBy: [{ kelas: 'asc' }, { namaLengkap: 'asc' }],
      take: 50,  // limit untuk template
    })

    let excelData: Record<string, unknown>[] = []
    let sheetName = ''
    let filename = ''

    if (type === 'per_cp') {
      // Template untuk import nilai per CP (tugas harian + ulangan harian)
      sheetName = 'Template Nilai Per CP'
      filename = 'template-import-nilai-per-cp.xlsx'

      // Fetch CP untuk info header
      const cps = await db.capaianPembelajaran.findMany({
        where: { subject: teacherSubject, isActive: true },
        select: { id: true, kodeCP: true, deskripsi: true },
        orderBy: [{ gradeLevel: 'asc' }, { kodeCP: 'asc' }],
      })

      excelData = students.map(s => ({
        'Username': s.nisn,
        'Nama Siswa': s.namaLengkap,
        'Kelas': s.kelas,
        'ID CP': '',  // diisi guru (dari daftar CP di sheet kedua)
        'Kode CP': '',  // untuk verifikasi
        'Nama Tugas': '',  // mis: "Tugas 1 - Algoritma"
        'Jenis Nilai': 'tugas_harian',  // tugas_harian atau ulangan_harian
        'Nilai': '',  // 0-100
      }))

      // Tambah sheet daftar CP untuk referensi
      const cpData = cps.map(c => ({
        'ID CP': c.id,
        'Kode CP': c.kodeCP,
        'Deskripsi': c.deskripsi,
      }))

      const ws1 = XLSX.utils.json_to_sheet(excelData)
      ws1['!cols'] = [
        { wch: 15 }, { wch: 25 }, { wch: 10 },
        { wch: 30 }, { wch: 10 }, { wch: 25 },
        { wch: 15 }, { wch: 8 },
      ]
      const ws2 = XLSX.utils.json_to_sheet(cpData)
      ws2['!cols'] = [{ wch: 30 }, { wch: 10 }, { wch: 60 }]

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws1, 'Data Nilai')
      XLSX.utils.book_append_sheet(wb, ws2, 'Daftar CP')

      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    } else if (type === 'sts_sas') {
      // Template untuk import nilai STS + SAS
      sheetName = 'Template Nilai STS SAS'
      filename = 'template-import-nilai-sts-sas.xlsx'

      excelData = students.map(s => ({
        'Username': s.nisn,
        'Nama Siswa': s.namaLengkap,
        'Kelas': s.kelas,
        'Nilai STS': '',  // 0-100
        'Nilai SAS': '',  // 0-100
      }))

      const ws = XLSX.utils.json_to_sheet(excelData)
      ws['!cols'] = [{ wch: 15 }, { wch: 25 }, { wch: 10 }, { wch: 12 }, { wch: 12 }]

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Data Nilai STS SAS')

      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }

    return NextResponse.json({ error: 'Type tidak valid. Pakai ?type=per_cp atau ?type=sts_sas' }, { status: 400 })
  } catch (error) {
    console.error('[grades/template] GET error:', error)
    return NextResponse.json(
      { error: 'Gagal membuat template: ' + (error instanceof Error ? error.message : 'Unknown') },
      { status: 500 }
    )
  }
}
