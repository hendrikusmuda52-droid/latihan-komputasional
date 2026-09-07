import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import * as XLSX from 'xlsx'

// GET /api/teacher/results-export
// Export rekap pengerjaan tugas ke Excel
// Query params:
//   - assignmentId: filter per tugas tertentu (opsional)
//   - kelas: filter per kelas (opsional)
//   - tahunAjaran: default 2026/2027
//   - semester: default ganjil

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[results-export] safeQuery error:', err); return [] }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const assignmentId = req.nextUrl.searchParams.get('assignmentId')
    const kelasFilter = req.nextUrl.searchParams.get('kelas')
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'

    // ── Fetch all assignments untuk info header ──
    // FIX: filter assignments berdasarkan kelas juga — sebelumnya semua assignment
    // masuk, sehingga siswa kelas 8 dapat kolom "Tugas 1" yang ternyata hanya untuk kelas 7
    const assignmentWhere: Record<string, unknown> = { subject: teacherSubject, isActive: true }
    if (kelasFilter && kelasFilter !== 'ALL') {
      // assignment.targetKelas bisa "ALL" atau "7A,7B,7C" — pakai contains
      assignmentWhere.OR = [
        { targetKelas: 'ALL' },
        { targetKelas: { contains: kelasFilter } },
      ]
    }
    const assignments = await safeQuery(() =>
      db.assignment.findMany({
        where: assignmentWhere,
        select: { id: true, title: true, targetKelas: true, taskType: true, dueDate: true },
        orderBy: { createdAt: 'desc' },
      })
    )

    // ── Fetch all students (filtered by kelas if provided) ──
    const studentWhere: Record<string, unknown> = { isActive: true }
    if (kelasFilter && kelasFilter !== 'ALL') {
      studentWhere.kelas = kelasFilter
    }
    const students = await safeQuery(() =>
      db.student.findMany({
        where: studentWhere,
        select: { id: true, namaLengkap: true, nisn: true, kelas: true, sekolah: true },
        orderBy: [{ kelas: 'asc' }, { namaLengkap: 'asc' }],
      })
    )

    // ── Fetch all results ──
    // FIX: Filter results berdasarkan studentIds yang sudah difilter per kelas
    // Sebelumnya: results dari semua siswa masuk → bercampur dengan kelas lain
    const studentIds = (students || []).map(s => s.id)
    const resultWhere: Record<string, unknown> = {
      subject: teacherSubject,
      tahunAjaran,
      semester,
    }
    if (studentIds.length > 0) {
      resultWhere.studentId = { in: studentIds }
    }
    if (assignmentId && assignmentId !== 'ALL') {
      resultWhere.assignmentId = assignmentId
    }
    const results = await safeQuery(() =>
      db.result.findMany({
        where: resultWhere,
        select: {
          id: true, studentId: true, assignmentId: true,
          totalScore: true, typingScore: true, quizScore: true,
          quizCorrect: true, quizTotal: true,
          typingSpeedWPM: true, typingAccuracy: true,
          isReleased: true, completedAt: true, releasedAt: true,
        },
      })
    )

    // Build map: studentId → results
    const resultsByStudent = new Map<string, typeof results>()
    for (const r of results) {
      const list = resultsByStudent.get(r.studentId) || []
      list.push(r)
      resultsByStudent.set(r.studentId, list)
    }

    // ── Build Excel data ──
    let excelData: Record<string, unknown>[] = []
    let sheetName = 'Rekap Pengerjaan'
    let filename = `rekap-pengerjaan-${new Date().toISOString().slice(0, 10)}.xlsx`

    if (assignmentId && assignmentId !== 'ALL') {
      // ── Mode: Rekap per tugas tertentu ──
      const assignment = assignments.find(a => a.id === assignmentId)
      sheetName = `Tugas: ${(assignment?.title || 'Unknown').slice(0, 25)}`
      filename = `rekap-tugas-${(assignment?.title || 'tugas').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}.xlsx`

      excelData = students.map(s => {
        const studentResults = (resultsByStudent.get(s.id) || []).filter(r => r.assignmentId === assignmentId)
        const result = studentResults[0]

        return {
          'Username': s.nisn,
          'Nama Siswa': s.namaLengkap,
          'Kelas': s.kelas,
          'Sekolah': s.sekolah,
          'Status Pengerjaan': result ? 'Sudah Mengerjakan' : 'Belum Mengerjakan',
          'Nilai Total': result ? Number(result.totalScore) || 0 : '-',
          'Nilai Quiz': result ? Number(result.quizScore) || 0 : '-',
          'Benar/Total': result ? `${result.quizCorrect}/${result.quizTotal}` : '-',
          'Nilai Mengetik': result ? Number(result.typingScore) || 0 : '-',
          'WPM': result ? Number(result.typingSpeedWPM) || 0 : '-',
          'Akurasi (%)': result ? Number(result.typingAccuracy) || 0 : '-',
          'Status Rilis': result ? (result.isReleased ? 'Dirilis' : 'Belum Dirilis') : '-',
          'Waktu Selesai': result
            ? new Date(result.completedAt).toLocaleString('id-ID', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              })
            : '-',
        }
      })

      // ── Tambah sheet ringkasan ──
      const totalSiswa = students.length
      const sudahMengerjakan = excelData.filter(r => r['Status Pengerjaan'] === 'Sudah Mengerjakan').length
      const belumMengerjakan = totalSiswa - sudahMengerjakan
      const scores = excelData
        .filter(r => r['Nilai Total'] !== '-')
        .map(r => Number(r['Nilai Total']))
      const rataRata = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10
        : 0
      const tertinggi = scores.length > 0 ? Math.max(...scores) : 0
      const terendah = scores.length > 0 ? Math.min(...scores) : 0
      const tuntas = scores.filter(s => s >= 75).length

      const summaryData = [
        { 'Metrik': 'Judul Tugas', 'Nilai': assignment?.title || '-' },
        { 'Metrik': 'Total Siswa', 'Nilai': totalSiswa },
        { 'Metrik': 'Sudah Mengerjakan', 'Nilai': sudahMengerjakan },
        { 'Metrik': 'Belum Mengerjakan', 'Nilai': belumMengerjakan },
        { 'Metrik': 'Persentase Pengerjaan', 'Nilai': `${totalSiswa > 0 ? Math.round(sudahMengerjakan / totalSiswa * 100) : 0}%` },
        { 'Metrik': 'Rata-rata Nilai', 'Nilai': rataRata },
        { 'Metrik': 'Nilai Tertinggi', 'Nilai': tertinggi },
        { 'Metrik': 'Nilai Terendah', 'Nilai': terendah },
        { 'Metrik': 'Tuntas (≥75)', 'Nilai': `${tuntas} dari ${sudahMengerjakan}` },
        { 'Metrik': 'Periode', 'Nilai': `${tahunAjaran} — ${semester}` },
      ]

      const ws1 = XLSX.utils.json_to_sheet(excelData)
      ws1['!cols'] = [
        { wch: 15 }, { wch: 25 }, { wch: 8 }, { wch: 25 },
        { wch: 18 }, { wch: 10 }, { wch: 10 }, { wch: 10 },
        { wch: 10 }, { wch: 8 }, { wch: 10 }, { wch: 12 }, { wch: 20 },
      ]
      const ws2 = XLSX.utils.json_to_sheet(summaryData)
      ws2['!cols'] = [{ wch: 25 }, { wch: 30 }]

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws1, 'Detail Per Siswa')
      XLSX.utils.book_append_sheet(wb, ws2, 'Ringkasan')

      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })

    } else {
      // ── Mode: Rekap semua tugas ──
      // Buat matrix: siswa × tugas → status + nilai

      const assignmentList = assignments || []
      const cols: Record<string, unknown> = {
        'Username': '',
        'Nama Siswa': '',
        'Kelas': '',
        'Sekolah': '',
      }

      excelData = students.map(s => {
        const row: Record<string, unknown> = {
          'Username': s.nisn,
          'Nama Siswa': s.namaLengkap,
          'Kelas': s.kelas,
          'Sekolah': s.sekolah,
        }

        // Tambah kolom per tugas
        let totalDikerjakan = 0
        let totalNilai = 0
        for (const a of assignmentList) {
          const result = (resultsByStudent.get(s.id) || []).find(r => r.assignmentId === a.id)
          if (result) {
            row[a.title.slice(0, 25)] = Number(result.totalScore) || 0
            totalDikerjakan++
            totalNilai += Number(result.totalScore) || 0
          } else {
            row[a.title.slice(0, 25)] = '-'
          }
        }

        row['Total Tugas Dikerjakan'] = totalDikerjakan
        row['Rata-rata Nilai'] = totalDikerjakan > 0
          ? Math.round(totalNilai / totalDikerjakan * 10) / 10
          : 0
        row['Status'] = totalDikerjakan === 0 ? 'Belum Mengerjakan'
          : totalDikerjakan === assignmentList.length ? 'Selesai Semua'
          : `Sebagian (${totalDikerjakan}/${assignmentList.length})`

        return row
      })

      sheetName = 'Rekap Semua Tugas'
      filename = `rekap-semua-tugas-${new Date().toISOString().slice(0, 10)}.xlsx`

      const ws = XLSX.utils.json_to_sheet(excelData)
      ws['!cols'] = [
        { wch: 15 }, { wch: 25 }, { wch: 8 }, { wch: 25 },
        ...assignmentList.map(() => ({ wch: 12 })),
        { wch: 15 }, { wch: 12 }, { wch: 20 },
      ]

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, sheetName)

      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    }
  } catch (error) {
    console.error('[results-export] FATAL error:', error)
    return NextResponse.json(
      { error: 'Gagal export: ' + (error instanceof Error ? error.message : 'Unknown') },
      { status: 500 },
    )
  }
}
