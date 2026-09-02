import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'
import * as XLSX from 'xlsx'

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[grades/export] safeQuery error:', err); return [] }
}

// GET: export grades in 3 formats
// ?format=per_cp&cpId=xxx    → rincian tugas/ulangan harian untuk 1 CP
// ?format=all_cp              → rekapitulasi seluruh nilai harian dari CP 1 sampai terakhir
// ?format=na_summary          → ringkas: Nama | NH | STS | SAS | NA
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const format = req.nextUrl.searchParams.get('format') || 'na_summary'
    const cpId = req.nextUrl.searchParams.get('cpId')
    const kelas = req.nextUrl.searchParams.get('kelas') || ''
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'

    // Ambil data
    const studentWhere = kelas && kelas !== 'ALL' ? { kelas } : {}
    const students = await safeQuery(() =>
      db.student.findMany({
        where: studentWhere,
        select: { id: true, namaLengkap: true, nisn: true, kelas: true },
        orderBy: [{ kelas: 'asc' }, { namaLengkap: 'asc' }],
      })
    )

    const allGrades = await safeQuery(() =>
      db.manualGrade.findMany({
        where: { subject: teacherSubject, tahunAjaran, semester },
      })
    )

    const autoResults = await safeQuery(() =>
      db.result.findMany({
        where: { subject: teacherSubject, tahunAjaran, semester },
      })
    )

    const cps = await safeQuery(() =>
      db.capaianPembelajaran.findMany({
        where: { subject: teacherSubject, isActive: true },
        include: { tps: { where: { isActive: true } } },
        orderBy: [{ gradeLevel: 'asc' }, { kodeCP: 'asc' }],
      })
    )

    let wb = XLSX.utils.book_new()
    let data: Record<string, unknown>[] = []
    let sheetName = ''
    let filename = ''

    if (format === 'per_cp' && cpId) {
      // ── Format 1: Per-CP (rincian tugas/ulangan harian untuk 1 CP) ──
      const cp = cps.find(c => c.id === cpId)
      sheetName = `CP ${cp?.kodeCP || ''}`
      filename = `nilai-per-cp-${cp?.kodeCP || cpId}-${tahunAjaran.replace('/', '-')}-${semester}.xlsx`

      // ── FIX Bug: Filter siswa berdasarkan gradeLevel CP yang dipilih ──
      // Sebelumnya: semua siswa masuk, walau CP kelas 7 dipilih, siswa kelas 8/9/11DKV juga muncul
      // Sekarang: hanya siswa yang kelas-nya cocok dengan gradeLevel CP yang masuk
      const cpGradeLevel = cp?.gradeLevel || ''
      const kelasParam = req.nextUrl.searchParams.get('kelas')
      const filteredStudents = (students || []).filter(s => {
        if (kelasParam && kelasParam !== 'ALL') return s.kelas === kelasParam
        // Filter berdasarkan gradeLevel CP
        if (!cpGradeLevel) return true
        // CP gradeLevel "7" → cocok dengan kelas 7A, 7B, 7C
        // CP gradeLevel "11DKV" → cocok dengan kelas 11DKV
        if (cpGradeLevel === '7') return s.kelas.startsWith('7')
        if (cpGradeLevel === '8') return s.kelas.startsWith('8')
        if (cpGradeLevel === '9') return s.kelas.startsWith('9')
        if (cpGradeLevel === '11DKV') return s.kelas.startsWith('11')
        if (cpGradeLevel === '12DKV') return s.kelas.startsWith('12')
        return true
      })

      // ── FIX: Export detail per tugas (dipisah, bukan langsung rata-rata) ──
      // User mau: setiap tugas/manual tampil sebagai kolom terpisah
      // Lalu di bawah ada rata-rata + NH

      // Kumpulkan semua judul tugas unik untuk CP ini
      const allTugasTitles = new Set<string>()
      const allUHTitles = new Set<string>()
      const allAutoTitles = new Set<string>()

      filteredStudents.forEach(s => {
        const sGrades = (allGrades || []).filter(g => g.studentId === s.id && g.cpId === cpId)
        sGrades.forEach(g => {
          if (g.gradeCategory === 'tugas_harian' || g.gradeType === 'tugas') {
            allTugasTitles.add(g.title || 'Tugas')
          }
          if (g.gradeCategory === 'ulangan_harian' || g.gradeType === 'uh') {
            allUHTitles.add(g.title || 'UH')
          }
        })
        const sAuto = (autoResults || []).filter(r => r.studentId === s.id && r.cpId === cpId)
        sAuto.forEach(r => {
          // Pakai assignmentId sebagai key (judul belum di-fetch di sini)
          allAutoTitles.add(r.assignmentId || 'Daring')
        })
      })

      const tugasTitles = Array.from(allTugasTitles).sort()
      const uhTitles = Array.from(allUHTitles).sort()
      const autoTitles = Array.from(allAutoTitles).sort()

      data = filteredStudents.map(s => {
        const studentGrades = (allGrades || []).filter(g => g.studentId === s.id && g.cpId === cpId)
        const studentAuto = (autoResults || []).filter(r => r.studentId === s.id && r.cpId === cpId)

        const row: Record<string, unknown> = {
          'NISN': s.nisn,
          'Nama Siswa': s.namaLengkap,
          'Kelas': s.kelas,
        }

        // Kolom per tugas manual
        const tugasScores: number[] = []
        tugasTitles.forEach((title, idx) => {
          const grade = studentGrades.find(g =>
            (g.gradeCategory === 'tugas_harian' || g.gradeType === 'tugas') && g.title === title
          )
          const score = grade ? Number(grade.score) || 0 : null
          row[`Tugas: ${title}`] = score === null ? '-' : score
          if (score !== null) tugasScores.push(score)
        })

        // Kolom per UH manual
        const uhScores: number[] = []
        uhTitles.forEach((title, idx) => {
          const grade = studentGrades.find(g =>
            (g.gradeCategory === 'ulangan_harian' || g.gradeType === 'uh') && g.title === title
          )
          const score = grade ? Number(grade.score) || 0 : null
          row[`UH: ${title}`] = score === null ? '-' : score
          if (score !== null) uhScores.push(score)
        })

        // Kolom per tugas daring
        const autoScores: number[] = []
        autoTitles.forEach((key, idx) => {
          const result = studentAuto.find(r => (r.assignmentId || 'Daring') === key)
          const score = result ? Number(result.totalScore) || 0 : null
          row[`Daring: ${key.slice(0, 20)}`] = score === null ? '-' : score
          if (score !== null) autoScores.push(score)
        })

        // Rata-rata + NH
        const avgTugas = tugasScores.length > 0
          ? Math.round(tugasScores.reduce((a, b) => a + b, 0) / tugasScores.length * 10) / 10
          : 0
        const avgAuto = autoScores.length > 0
          ? Math.round(autoScores.reduce((a, b) => a + b, 0) / autoScores.length * 10) / 10
          : 0
        const avgUH = uhScores.length > 0
          ? Math.round(uhScores.reduce((a, b) => a + b, 0) / uhScores.length * 10) / 10
          : 0

        // Gabungkan tugas manual + daring untuk rata-rata tugas
        const allTugas = [...tugasScores, ...autoScores]
        const avgAllTugas = allTugas.length > 0
          ? Math.round(allTugas.reduce((a, b) => a + b, 0) / allTugas.length * 10) / 10
          : 0

        row['Rata-rata Tugas'] = avgAllTugas || '-'
        row['Rata-rata UH'] = avgUH || '-'
        row['NH (Tugas 60% + UH 40%)'] = Math.round((avgAllTugas * 0.6 + avgUH * 0.4) * 10) / 10 || 0

        return row
      })

    } else if (format === 'all_cp') {
      // ── Format 2: All-CP (rekapitulasi seluruh nilai harian) ──
      sheetName = 'Rekap Semua CP'
      filename = `rekap-semua-cp-${tahunAjaran.replace('/', '-')}-${semester}.xlsx`

      data = (students || []).map(s => {
        const row: Record<string, unknown> = {
          'NISN': s.nisn,
          'Nama Siswa': s.namaLengkap,
          'Kelas': s.kelas,
        }

        let totalNH = 0
        let cpCount = 0

        // For each CP, compute NH
        ;(cps || []).forEach(cp => {
          const cpGrades = (allGrades || []).filter(g => g.studentId === s.id && g.cpId === cp.id)
          const cpAuto = (autoResults || []).filter(r => r.studentId === s.id && r.cpId === cp.id)

          const tugas = cpGrades.filter(g => g.gradeCategory === 'tugas_harian' || g.gradeType === 'tugas')
          const uh = cpGrades.filter(g => g.gradeCategory === 'ulangan_harian' || g.gradeType === 'uh')

          const avgTugas = tugas.length > 0
            ? tugas.reduce((a, b) => a + (Number(b.score) || 0), 0) / tugas.length
            : 0
          const avgUH = uh.length > 0
            ? uh.reduce((a, b) => a + (Number(b.score) || 0), 0) / uh.length
            : 0
          const avgAuto = cpAuto.length > 0
            ? cpAuto.reduce((a, b) => a + (Number(b.totalScore) || 0), 0) / cpAuto.length
            : 0

          const nh = (avgTugas * 0.4 + avgUH * 0.6 + avgAuto * 0) // simplified
          if (tugas.length > 0 || uh.length > 0 || cpAuto.length > 0) {
            totalNH += nh
            cpCount++
          }

          row[`NH ${cp.kodeCP}`] = Math.round(nh * 10) / 10
        })

        row['Rata-rata NH'] = cpCount > 0 ? Math.round((totalNH / cpCount) * 10) / 10 : 0
        return row
      })

    } else {
      // ── Format 3: NA Summary (Nama | NH | STS | SAS | NA) ──
      sheetName = 'Nilai Akhir'
      filename = `nilai-akhir-${tahunAjaran.replace('/', '-')}-${semester}.xlsx`

      // Get config for bobot
      let config = await db.subjectConfig.findUnique({
        where: { subject_tahunAjaran_semester: { subject: teacherSubject, tahunAjaran, semester } },
      }).catch(() => null)
      const bobotNH = config?.bobotNH ?? 40
      const bobotSTS = (config as { bobotSTS?: number })?.bobotSTS ?? 30
      const bobotSAS = (config as { bobotSAS?: number })?.bobotSAS ?? 30
      const kkm = config?.kkm ?? 75

      data = (students || []).map(s => {
        const studentGrades = (allGrades || []).filter(g => g.studentId === s.id)
        const studentAuto = (autoResults || []).filter(r => r.studentId === s.id)

        // NH: rata-rata tugas_harian + ulangan_harian + auto
        const tugasHarian = studentGrades.filter(g => g.gradeCategory === 'tugas_harian' || g.gradeType === 'tugas')
        const ulanganHarian = studentGrades.filter(g => g.gradeCategory === 'ulangan_harian' || g.gradeType === 'uh')
        const allHarian = [
          ...tugasHarian.map(g => Number(g.score) || 0),
          ...ulanganHarian.map(g => Number(g.score) || 0),
          ...studentAuto.map(r => Number(r.totalScore) || 0),
        ]
        const NH = allHarian.length > 0
          ? Math.round(allHarian.reduce((a, b) => a + b, 0) / allHarian.length * 10) / 10
          : 0

        // STS
        const stsGrades = studentGrades.filter(g => g.gradeCategory === 'sts' || g.gradeType === 'uts')
        const STS = stsGrades.length > 0
          ? Math.round(stsGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / stsGrades.length * 10) / 10
          : 0

        // SAS
        const sasGrades = studentGrades.filter(g => g.gradeCategory === 'sas' || g.gradeType === 'uas')
        const SAS = sasGrades.length > 0
          ? Math.round(sasGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / sasGrades.length * 10) / 10
          : 0

        // NA
        const NA = Math.round((NH * bobotNH / 100 + STS * bobotSTS / 100 + SAS * bobotSAS / 100) * 10) / 10

        return {
          'NISN': s.nisn,
          'Nama Siswa': s.namaLengkap,
          'Kelas': s.kelas,
          'Rata-rata NH': NH,
          'STS (MID)': STS,
          'SAS (UAS)': SAS,
          'Nilai Akhir (NA)': NA,
          'KKM': kkm,
          'Status': NA < kkm ? 'Remedi' : 'Tuntas',
        }
      })
    }

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(data)
    ws['!cols'] = Object.keys(data[0] || {}).map(k => ({ wch: Math.max(k.length + 4, 15) }))
    XLSX.utils.book_append_sheet(wb, ws, sheetName)

    // Add info sheet
    const info = [
      { 'Info': 'SAKOLA - Daftar Nilai SAKOLA' },
      { 'Info': `Mapel: ${teacherSubject}` },
      { 'Info': `Tahun Ajaran: ${tahunAjaran}` },
      { 'Info': `Semester: ${semester}` },
      { 'Info': `Format: ${format}` },
      { 'Info': `Tanggal Export: ${new Date().toLocaleString('id-ID')}` },
    ]
    const wsInfo = XLSX.utils.json_to_sheet(info)
    wsInfo['!cols'] = [{ wch: 60 }]
    XLSX.utils.book_append_sheet(wb, wsInfo, 'Info')

    // Generate buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('[grades/export] FATAL:', error)
    return NextResponse.json({ error: 'Gagal export nilai' }, { status: 500 })
  }
}
