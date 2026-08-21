import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// Helper: safely run a DB query
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[analytics/student] safeQuery error:', err); return [] }
}

// GET: analytics for a specific student
// ?studentId=xxx — returns compiled competency data
//
// ── STRICT SUBJECT ISOLATION (ANTI-BOCOR) ──
// This endpoint ENFORCES that the teacher can only see analytics for
// their own subject. The `subject` filter is ALWAYS applied from the
// teacher's JWT (teacher.subject), NEVER from query params. This means
// a Math teacher CANNOT see a student's Informatika analytics, even
// if they know the studentId.
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    // ── SECURITY: subject is ALWAYS from JWT, never from query params ──
    const teacherSubject = (teacher.subject && teacher.subject.trim() !== '')
      ? teacher.subject.trim() : 'Informatika'
    const safeSubject = teacherSubject || 'Informatika'

    const studentId = req.nextUrl.searchParams.get('studentId')
    if (!studentId) {
      return NextResponse.json({ error: 'studentId wajib diisi' }, { status: 400 })
    }

    // Verify student exists
    const student = await db.student.findUnique({
      where: { id: studentId },
      select: { id: true, namaLengkap: true, nisn: true, kelas: true, sekolah: true },
    })
    if (!student) return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 })

    // ═══════════════════════════════════════════════════════════════
    // COMPILE ANALYTICS — ALL QUERIES FILTERED BY teacherSubject
    // ═══════════════════════════════════════════════════════════════

    // 1. Auto results (daring) — typing + quiz scores
    const autoResults = await safeQuery(() =>
      db.result.findMany({
        where: { studentId, subject: safeSubject },  // ← STRICT SUBJECT FILTER
        select: { typingScore: true, quizScore: true, totalScore: true, typingSpeedWPM: true, typingAccuracy: true, completedAt: true },
        orderBy: { completedAt: 'asc' },
      })
    )

    // 2. Manual grades (luring)
    const manualGrades = await safeQuery(() =>
      db.manualGrade.findMany({
        where: { studentId, subject: safeSubject },  // ← STRICT SUBJECT FILTER
        select: { score: true, gradeCategory: true, gradeType: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      })
    )

    // 3. Attendance records
    const attendance = await safeQuery(() =>
      db.attendance.findMany({
        where: { studentId, subject: safeSubject },  // ← STRICT SUBJECT FILTER
        select: { status: true, tanggal: true },
        orderBy: { tanggal: 'asc' },
      })
    )

    // 4. Catatan sikap (anekdot)
    const sikapRecords = await safeQuery(() =>
      db.catatanSikap.findMany({
        where: { studentId, subject: safeSubject },  // ← STRICT SUBJECT FILTER
        select: { kategori: true, deskripsi: true, tanggal: true, tindakLanjut: true },
        orderBy: { tanggal: 'desc' },
        take: 20,
      })
    )

    // 5. CP/TP progress
    const cps = await safeQuery(() =>
      db.capaianPembelajaran.findMany({
        where: { subject: safeSubject, isActive: true },  // ← STRICT SUBJECT FILTER
        select: {
          id: true, kodeCP: true, deskripsi: true,
          tps: { where: { isActive: true }, select: { id: true, kodeTP: true, deskripsi: true } },
        },
        orderBy: { kodeCP: 'asc' },
      })
    )

    // ═══════════════════════════════════════════════════════════════
    // COMPUTE METRICS
    // ═══════════════════════════════════════════════════════════════

    // Typing metrics
    const typingScores = (autoResults || []).map(r => Number(r.typingScore) || 0)
    const avgTyping = typingScores.length > 0
      ? Math.round(typingScores.reduce((a, b) => a + b, 0) / typingScores.length * 10) / 10 : 0
    const bestTyping = typingScores.length > 0 ? Math.max(...typingScores) : 0

    // Quiz metrics
    const quizScores = (autoResults || []).map(r => Number(r.quizScore) || 0)
    const avgQuiz = quizScores.length > 0
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length * 10) / 10 : 0
    const bestQuiz = quizScores.length > 0 ? Math.max(...quizScores) : 0

    // WPM & accuracy
    const wpms = (autoResults || []).map(r => Number(r.typingSpeedWPM) || 0)
    const avgWPM = wpms.length > 0 ? Math.round(wpms.reduce((a, b) => a + b, 0) / wpms.length * 10) / 10 : 0
    const accuracies = (autoResults || []).map(r => Number(r.typingAccuracy) || 0)
    const avgAccuracy = accuracies.length > 0
      ? Math.round(accuracies.reduce((a, b) => a + b, 0) / accuracies.length * 10) / 10 : 0

    // Manual grade metrics
    const harianScores = (manualGrades || []).filter(g =>
      g.gradeCategory === 'tugas_harian' || g.gradeCategory === 'ulangan_harian' ||
      g.gradeType === 'tugas' || g.gradeType === 'uh'
    ).map(g => Number(g.score) || 0)
    const avgHarian = harianScores.length > 0
      ? Math.round(harianScores.reduce((a, b) => a + b, 0) / harianScores.length * 10) / 10 : 0

    const stsScores = (manualGrades || []).filter(g =>
      g.gradeCategory === 'sts' || g.gradeType === 'uts'
    ).map(g => Number(g.score) || 0)
    const stsValue = stsScores.length > 0
      ? Math.round(stsScores.reduce((a, b) => a + b, 0) / stsScores.length * 10) / 10 : 0

    const sasScores = (manualGrades || []).filter(g =>
      g.gradeCategory === 'sas' || g.gradeType === 'uas'
    ).map(g => Number(g.score) || 0)
    const sasValue = sasScores.length > 0
      ? Math.round(sasScores.reduce((a, b) => a + b, 0) / sasScores.length * 10) / 10 : 0

    // Attendance metrics
    const totalAtt = (attendance || []).length
    const hadirCount = (attendance || []).filter(a => a.status === 'H').length
    const attPercentage = totalAtt > 0 ? Math.round((hadirCount / totalAtt) * 100) : 100

    // Sikap metrics (count by kategori)
    const sikapStats = {
      spiritual: (sikapRecords || []).filter(s => s.kategori === 'Spiritual').length,
      sosial: (sikapRecords || []).filter(s => s.kategori === 'Sosial').length,
      profil: (sikapRecords || []).filter(s => s.kategori === 'ProfilPelajarPancasila').length,
      total: (sikapRecords || []).length,
    }

    // Timeline data for chart (auto results over time)
    const timeline = (autoResults || []).map((r, i) => ({
      label: `#${i + 1}`,
      typing: Number(r.typingScore) || 0,
      quiz: Number(r.quizScore) || 0,
      total: Number(r.totalScore) || 0,
      date: r.completedAt ? new Date(r.completedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '-',
    }))

    return NextResponse.json({
      success: true,
      student,
      subject: safeSubject,  // confirm which subject this data is for
      metrics: {
        avgTyping, bestTyping, avgQuiz, bestQuiz, avgWPM, avgAccuracy,
        avgHarian, stsValue, sasValue,
        attendancePercentage: attPercentage,
        hadirCount, totalAttendance: totalAtt,
        sikapStats,
        totalExercises: (autoResults || []).length,
        totalManualGrades: (manualGrades || []).length,
      },
      timeline,
      sikapRecords: sikapRecords || [],
      cpProgress: (cps || []).map(cp => ({
        id: cp.id, kodeCP: cp.kodeCP, deskripsi: cp.deskripsi,
        tpCount: cp.tps?.length || 0,
      })),
    })
  } catch (fatalErr) {
    console.error('[analytics/student] FATAL:', fatalErr)
    return NextResponse.json({ success: true, metrics: {}, timeline: [], sikapRecords: [], cpProgress: [] })
  }
}
