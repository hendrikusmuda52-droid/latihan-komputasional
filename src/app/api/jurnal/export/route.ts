import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import * as XLSX from 'xlsx'

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/jurnal/export — Export Jurnal Mengajar to Excel (.xlsx)
//
// Subject Isolation: hanya jurnal milik teacher.teacherId + teacher.subject
// yang di-export. Guru mapel lain tidak bisa akses jurnal guru lain.
//
// Query params (opsional):
//   - tahunAjaran: default '2026/2027'
//   - semester: default 'ganjil'
//
// Columns: Tanggal, Hari, Jam Pelajaran, Kelas, Mapel, Materi/Misi, Catatan/Kejadian
// ─────────────────────────────────────────────────────────────────────────────

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[jurnal/export] safeQuery error:', err); return [] }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'

    // ── Fetch all jurnal records for this teacher + subject + period ──
    // Subject isolation: filter by teacherId AND subject
    const records = await safeQuery(() =>
      db.jurnalGuru.findMany({
        where: {
          teacherId: teacher.teacherId,
          subject: teacherSubject,
          tahunAjaran,
          semester,
        },
        orderBy: [{ tanggal: 'asc' }, { jamPelajaran: 'asc' }],
      })
    )

    if (!records || records.length === 0) {
      // Return empty Excel with headers only
      const emptyData = [{
        Tanggal: '',
        Hari: '',
        'Jam Pelajaran': '',
        Kelas: '',
        Mapel: '',
        'Materi/Misi': '',
        'Catatan/Kejadian': '',
      }]
      const ws = XLSX.utils.json_to_sheet(emptyData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Jurnal Mengajar')
      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="jurnal-${teacherSubject}-${tahunAjaran.replace('/', '-')}-${semester}.xlsx"`,
        },
      })
    }

    // ── Transform records to Excel-friendly format ──
    const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const excelData = records.map((r) => ({
      Tanggal: r.tanggal ? new Date(r.tanggal).toLocaleDateString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric',
      }) : '',
      Hari: r.tanggal ? DAYS[new Date(r.tanggal).getDay()] : r.hari || '',
      'Jam Pelajaran': r.jamPelajaran,
      Kelas: r.kelas || '-',
      Mapel: r.mapel || teacherSubject,
      'Materi/Misi': r.materiPokok || '-',
      'Catatan/Kejadian': r.hambatan || '-',
    }))

    // ── Create workbook ──
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Set column widths
    worksheet['!cols'] = [
      { wch: 14 },  // Tanggal
      { wch: 10 },  // Hari
      { wch: 6 },   // Jam Pelajaran
      { wch: 10 },  // Kelas
      { wch: 18 },  // Mapel
      { wch: 40 },  // Materi/Misi
      { wch: 40 },  // Catatan/Kejadian
    ]

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jurnal Mengajar')

    // ── Generate buffer ──
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    // ── Return as downloadable file ──
    const filename = `jurnal-${teacherSubject}-${tahunAjaran.replace('/', '-')}-${semester}.xlsx`
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('[jurnal/export] FATAL error:', error)
    return NextResponse.json(
      { error: 'Gagal export jurnal: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 },
    )
  }
}
