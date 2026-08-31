import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'

// Student auth via stateless JWT

export async function GET(req: NextRequest) {
  if (!(await requireStudentAuth(req))) {
    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
  }
  const session = getStudentFromToken(req)!

  try {
    const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'

    // ── FIX: Ambil SubjectConfig untuk KKM + bobot ──
    const config = await db.subjectConfig.findFirst({
      where: { subject, tahunAjaran, semester },
    })

    // Ambil nilai manual yang sudah dirilis
    const manualGrades = await db.manualGrade.findMany({
      where: {
        studentId: session.studentId,
        isReleased: true,
        subject,
        tahunAjaran,
        semester,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Ambil nilai otomatis dari hasil latihan yang sudah dirilis
    const autoGrades = await db.result.findMany({
      where: {
        studentId: session.studentId,
        isReleased: true,
        subject,
        tahunAjaran,
        semester,
      },
      orderBy: { releasedAt: 'desc' },
    })

    // Fetch assignment titles
    const assignmentIds = autoGrades
      .map(g => g.assignmentId)
      .filter((id): id is string => id !== null && id !== undefined)

    const assignments = assignmentIds.length > 0
      ? await db.assignment.findMany({
          where: { id: { in: assignmentIds } },
          select: { id: true, title: true },
        })
      : []

    const assignmentTitleMap = new Map(assignments.map(a => [a.id, a.title]))

    // ── FIX: Ambil CP + TP untuk grouping ──
    const cps = await db.capaianPembelajaran.findMany({
      where: { subject, isActive: true },
      include: {
        tps: {
          where: { isActive: true },
          orderBy: { kodeTP: 'asc' },
        },
      },
      orderBy: [{ gradeLevel: 'asc' }, { kodeCP: 'asc' }],
    })

    // ── FIX: Build CP summary dengan grouping ──
    const cpSummary = cps.map(cp => {
      const cpManual = manualGrades.filter(g => g.cpId === cp.id)
      const cpAuto = autoGrades.filter(g => g.cpId === cp.id)

      // Group per TP
      const tps = cp.tps.map(tp => {
        const tpManual = cpManual.filter(g => g.tpId === tp.id)
        const tpAuto = cpAuto.filter(g => g.tpId === tp.id)

        const allGrades = [
          ...tpManual.map(g => ({
            id: g.id,
            title: g.title,
            score: g.score,
            kind: 'manual' as const,
            gradeCategory: g.gradeCategory,
            date: g.createdAt,
          })),
          ...tpAuto.map(g => ({
            id: g.id,
            title: assignmentTitleMap.get(g.assignmentId || '') || 'Tugas Daring',
            score: g.totalScore,
            kind: 'auto' as const,
            gradeCategory: 'tugas_harian' as const,
            date: g.releasedAt || g.completedAt,
          })),
        ]

        // Pisahkan tugas vs UH
        const tugasScores = allGrades.filter(g =>
          g.gradeCategory === 'tugas_harian' || g.kind === 'auto'
        )
        const uhScores = allGrades.filter(g => g.gradeCategory === 'ulangan_harian')

        const avgTugas = tugasScores.length > 0
          ? tugasScores.reduce((a, b) => a + Number(b.score), 0) / tugasScores.length
          : 0
        const avgUH = uhScores.length > 0
          ? uhScores.reduce((a, b) => a + Number(b.score), 0) / uhScores.length
          : 0

        // NH TP = (Tugas 60%) + (UH 40%) — default, bisa diubah via SubjectConfig
        const bobotTugas = 0.6
        const bobotUH = 0.4
        const nhTP = (avgTugas * bobotTugas) + (avgUH * bobotUH)

        return {
          tpId: tp.id,
          kodeTP: tp.kodeTP,
          deskripsi: tp.deskripsi,
          grades: allGrades,
          avgTugas: Math.round(avgTugas * 10) / 10,
          avgUH: Math.round(avgUH * 10) / 10,
          nhTP: Math.round(nhTP * 10) / 10,
          jumlahTugas: tugasScores.length,
          jumlahUH: uhScores.length,
        }
      })

      // NH CP = rata-rata NH semua TP yang punya data
      const validTPs = tps.filter(t => t.jumlahTugas > 0 || t.jumlahUH > 0)
      const nhCP = validTPs.length > 0
        ? validTPs.reduce((a, t) => a + t.nhTP, 0) / validTPs.length
        : 0

      const kkm = config?.kkm || 75
      const status = nhCP >= kkm ? 'Tuntas' : 'Remidi'

      return {
        cpId: cp.id,
        kodeCP: cp.kodeCP,
        deskripsi: cp.deskripsi,
        gradeLevel: cp.gradeLevel,
        tps,
        nhCP: Math.round(nhCP * 10) / 10,
        status,
        jumlahTugas: validTPs.reduce((a, t) => a + t.jumlahTugas, 0),
        jumlahUH: validTPs.reduce((a, t) => a + t.jumlahUH, 0),
      }
    })

    // ── FIX: Hitung NA (Nilai Akhir) ──
    const validCPs = cpSummary.filter(cp => cp.jumlahTugas > 0 || cp.jumlahUH > 0)
    const NH = validCPs.length > 0
      ? validCPs.reduce((a, cp) => a + cp.nhCP, 0) / validCPs.length
      : 0

    const stsGrades = manualGrades.filter(g => g.gradeCategory === 'sts')
    const sasGrades = manualGrades.filter(g => g.gradeCategory === 'sas')
    const nilaiSTS = stsGrades.length > 0
      ? stsGrades.reduce((a, g) => a + Number(g.score), 0) / stsGrades.length
      : 0
    const nilaiSAS = sasGrades.length > 0
      ? sasGrades.reduce((a, g) => a + Number(g.score), 0) / sasGrades.length
      : 0

    const bobotNH = (config?.bobotNH || 40) / 100
    const bobotSTS = (config?.bobotSTS || 30) / 100
    const bobotSAS = (config?.bobotSAS || 30) / 100
    const NA = (NH * bobotNH) + (nilaiSTS * bobotSTS) + (nilaiSAS * bobotSAS)

    const kkm = config?.kkm || 75
    const statusAkhir = NA >= kkm ? 'Tuntas' : 'Remidi'

    // ── FIX: Identifikasi CP tertinggi & terendah ──
    const sortedCPs = [...validCPs].sort((a, b) => b.nhCP - a.nhCP)
    const cpTertinggi = sortedCPs[0] || null
    const cpTerendah = sortedCPs[sortedCPs.length - 1] || null

    return NextResponse.json({
      success: true,
      config: {
        kkm,
        bobotNH: config?.bobotNH || 40,
        bobotSTS: config?.bobotSTS || 30,
        bobotSAS: config?.bobotSAS || 30,
      },
      cpSummary,
      summary: {
        NH: Math.round(NH * 10) / 10,
        STS: Math.round(nilaiSTS * 10) / 10,
        SAS: Math.round(nilaiSAS * 10) / 10,
        NA: Math.round(NA * 10) / 10,
        status: statusAkhir,
      },
      cpTertinggi: cpTertinggi ? {
        kodeCP: cpTertinggi.kodeCP,
        deskripsi: cpTertinggi.deskripsi,
        nhCP: cpTertinggi.nhCP,
      } : null,
      cpTerendah: cpTerendah ? {
        kodeCP: cpTerendah.kodeCP,
        deskripsi: cpTerendah.deskripsi,
        nhCP: cpTerendah.nhCP,
      } : null,
      // Legacy fields untuk backward compatibility
      manualGrades: manualGrades.map(g => ({
        id: g.id, title: g.title, score: g.score, description: g.description,
        createdAt: g.createdAt,
        cpId: g.cpId,
        tpId: g.tpId,
        gradeCategory: g.gradeCategory,
        assignmentId: g.babId || null,
      })),
      autoGrades: autoGrades.map(g => ({
        id: g.id,
        title: g.assignmentId ? (assignmentTitleMap.get(g.assignmentId) || 'Latihan Daring') : 'Latihan Mengetik & HOTS',
        score: g.totalScore,
        typingScore: g.typingScore, quizScore: g.quizScore,
        typingSpeedWPM: g.typingSpeedWPM, typingAccuracy: g.typingAccuracy,
        quizCorrect: g.quizCorrect, quizTotal: g.quizTotal,
        releasedAt: g.releasedAt,
        assignmentId: g.assignmentId || null,
        subject: g.subject,
        cpId: g.cpId,
        tpId: g.tpId,
      })),
    })
  } catch (error) {
    console.error('[student/grades] GET error:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data nilai' },
      { status: 500 }
    )
  }
}
