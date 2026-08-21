import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getTeacherFromToken, requireTeacherAuth } from '@/lib/auth'

// Helper: safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[dashboard/global] safeQuery error:', err); return [] }
}

// Helper: safely run a DB count, return 0 on any error.
async function safeCount(fn: () => Promise<number>): Promise<number> {
  try { return await fn() }
  catch (err) { console.error('[dashboard/global] safeCount error:', err); return 0 }
}

// GET: Global integrated dashboard data for post-login landing page
// Returns: quickActions, summaryStats, activityLog
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    // Always default subject to 'Informatika' — NEVER empty (prevents data leak)
    const teacherSubject = (teacher.subject && teacher.subject.trim() !== '')
      ? teacher.subject.trim()
      : 'Informatika'
    const safeSubject = teacherSubject || 'Informatika'
    const tahunAjaran = '2026/2027'
    const semester = 'ganjil'

    // ═══════════════════════════════════════════════════════════════
    // 1. QUICK ACTIONS: pending grades count + today's jurnal status
    // ═══════════════════════════════════════════════════════════════

    // Count unreleased results (nilai tertahan/draft) for this subject
    const pendingGradesCount = await safeCount(() =>
      db.result.count({
        where: { subject: safeSubject, isReleased: false },
      })
    )

    // Count unreleased manual grades
    const pendingManualGradesCount = await safeCount(() =>
      db.manualGrade.count({
        where: { subject: safeSubject, isReleased: false },
      })
    )

    // Check if today's jurnal is filled
    const today = new Date()
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)

    const todayJurnalCount = await safeCount(() =>
      db.jurnalGuru.count({
        where: {
          teacherId: teacher.teacherId,
          subject: safeSubject,
          tanggal: { gte: todayStart, lte: todayEnd },
        },
      })
    )

    // Determine hari and expected JP slots
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const hari = days[today.getDay()] || 'Senin'
    let expectedJPSlots = 8
    if (hari === 'Senin') expectedJPSlots = 9
    else if (hari === 'Jumat') expectedJPSlots = 5
    else if (hari === 'Sabtu' || hari === 'Minggu') expectedJPSlots = 0

    const quickActions = {
      pendingGradesCount: pendingGradesCount + pendingManualGradesCount,
      jurnalToday: {
        filled: todayJurnalCount,
        expected: expectedJPSlots,
        hari,
        isComplete: expectedJPSlots === 0 || todayJurnalCount >= expectedJPSlots,
      },
    }

    // ═══════════════════════════════════════════════════════════════
    // 2. SUMMARY STATS: avg NH, attendance %, TP progress, sikap count
    // ═══════════════════════════════════════════════════════════════

    // a) Average NH from grades for this subject
    const allGrades = await safeQuery(() =>
      db.manualGrade.findMany({
        where: { subject: safeSubject, tahunAjaran, semester },
        select: { score: true, gradeCategory: true, gradeType: true },
      })
    )
    const harianScores = (allGrades || []).filter(g =>
      g.gradeCategory === 'tugas_harian' || g.gradeCategory === 'ulangan_harian' ||
      g.gradeType === 'tugas' || g.gradeType === 'uh'
    ).map(g => Number(g.score) || 0)
    const avgNH = harianScores.length > 0
      ? Math.round((harianScores.reduce((a, b) => a + b, 0) / harianScores.length) * 10) / 10
      : 0

    // b) Attendance percentage (H+S+I) / Total for this subject
    const attendanceRecords = await safeQuery(() =>
      db.attendance.findMany({
        where: { subject: safeSubject, tahunAjaran, semester },
        select: { status: true },
      })
    )
    const totalAttendance = (attendanceRecords || []).length
    const hadirCount = (attendanceRecords || []).filter(r => r.status === 'H').length
    const sakitCount = (attendanceRecords || []).filter(r => r.status === 'S').length
    const izinCount = (attendanceRecords || []).filter(r => r.status === 'I').length
    const alpaCount = (attendanceRecords || []).filter(r => r.status === 'A').length
    const attendancePercentage = totalAttendance > 0
      ? Math.round(((hadirCount + sakitCount + izinCount) / totalAttendance) * 100)
      : 100

    // c) TP progress: count active TPs for this subject
    const cps = await safeQuery(() =>
      db.capaianPembelajaran.findMany({
        where: { subject: safeSubject, isActive: true },
        select: { id: true, kodeCP: true, deskripsi: true, tps: { where: { isActive: true }, select: { id: true } } },
      })
    )
    const totalCPs = (cps || []).length
    const totalTPs = (cps || []).reduce((sum, cp) => sum + (cp.tps?.length || 0), 0)

    // d) Active sikap notes count
    const sikapCount = await safeCount(() =>
      db.catatanSikap.count({
        where: { subject: safeSubject, tahunAjaran, semester },
      })
    )

    const summaryStats = {
      avgNH,
      attendancePercentage,
      totalCPs,
      totalTPs,
      sikapCount,
      hadirCount,
      sakitCount,
      izinCount,
      alpaCount,
      totalAttendance,
    }

    // ═══════════════════════════════════════════════════════════════
    // 3. ACTIVITY LOG: recent sikap records (latest 10)
    // ═══════════════════════════════════════════════════════════════

    const recentSikap = await safeQuery(() =>
      db.catatanSikap.findMany({
        where: { subject: safeSubject },
        include: { student: { select: { namaLengkap: true, nisn: true, kelas: true } } },
        orderBy: { tanggal: 'desc' },
        take: 10,
      })
    )

    const activityLog = (recentSikap || []).map(s => ({
      id: s.id,
      tanggal: s.tanggal ? s.tanggal.toISOString().split('T')[0] : '-',
      namaSiswa: s.student?.namaLengkap || '-',
      nisn: s.student?.nisn || '-',
      kelas: s.student?.kelas || s.kelas || '-',
      kategori: s.kategori,
      deskripsi: s.deskripsi,
      tindakLanjut: s.tindakLanjut || '',
    }))

    return NextResponse.json({
      success: true,
      quickActions,
      summaryStats,
      activityLog,
      meta: {
        subject: safeSubject,
        tahunAjaran,
        semester,
        hari,
        expectedJPSlots,
      },
    })
  } catch (fatalErr) {
    // FATAL: return safe empty payload (never 500 + HTML)
    console.error('[dashboard/global] FATAL error:', fatalErr)
    return NextResponse.json({
      success: true,
      quickActions: {
        pendingGradesCount: 0,
        jurnalToday: { filled: 0, expected: 0, hari: '-', isComplete: true },
      },
      summaryStats: {
        avgNH: 0, attendancePercentage: 100, totalCPs: 0, totalTPs: 0, sikapCount: 0,
        hadirCount: 0, sakitCount: 0, izinCount: 0, alpaCount: 0, totalAttendance: 0,
      },
      activityLog: [],
      meta: { subject: 'Informatika', tahunAjaran: '2026/2027', semester: 'ganjil', hari: '-', expectedJPSlots: 0 },
    })
  }
}
