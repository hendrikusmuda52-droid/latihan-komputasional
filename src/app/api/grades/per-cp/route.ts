import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// GET: Ambil semua nilai (manual + auto) untuk siswa di kelas tertentu, grouped per CP/TP
// Query params:
//   - kelas: kelas siswa (wajib)
//   - tahunAjaran: default 2026/2027
//   - semester: default ganjil
//   - subject: default dari JWT teacher

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const kelas = req.nextUrl.searchParams.get('kelas')
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'
    const subjectParam = req.nextUrl.searchParams.get('subject')
    const effectiveSubject = subjectParam || teacherSubject

    if (!kelas || kelas === 'ALL' || kelas === '__none__') {
      return NextResponse.json({
        success: true,
        cps: [],
        message: 'Pilih kelas terlebih dahulu',
      })
    }

    // 1. Ambil semua siswa di kelas ini
    const students = await db.student.findMany({
      where: { kelas, isActive: true },
      select: { id: true, namaLengkap: true, nisn: true, kelas: true },
      orderBy: { namaLengkap: 'asc' },
    })

    if (students.length === 0) {
      return NextResponse.json({
        success: true,
        cps: [],
        message: `Belum ada siswa di kelas ${kelas}`,
      })
    }

    const studentIds = students.map(s => s.id)

    // 2. Ambil semua CP + TP untuk subject ini
    const cps = await db.capaianPembelajaran.findMany({
      where: { subject: effectiveSubject, isActive: true },
      include: {
        tps: {
          where: { isActive: true },
          orderBy: { kodeTP: 'asc' },
        },
      },
      orderBy: [{ gradeLevel: 'asc' }, { kodeCP: 'asc' }],
    })

    // 3. Ambil semua nilai manual
    const manualGrades = await db.manualGrade.findMany({
      where: {
        studentId: { in: studentIds },
        subject: effectiveSubject,
        tahunAjaran,
        semester,
      },
      orderBy: { createdAt: 'asc' },
    })

    // 4. Ambil semua nilai otomatis (Result)
    const autoGrades = await db.result.findMany({
      where: {
        studentId: { in: studentIds },
        subject: effectiveSubject,
        tahunAjaran,
        semester,
      },
      orderBy: { completedAt: 'asc' },
    })

    // 5. Ambil assignment titles
    const assignmentIds = autoGrades
      .map(g => g.assignmentId)
      .filter((id): id is string => id !== null && id !== undefined)

    const assignments = assignmentIds.length > 0
      ? await db.assignment.findMany({
          where: { id: { in: assignmentIds } },
          select: { id: true, title: true, taskType: true },
        })
      : []

    const assignmentMap = new Map(assignments.map(a => [a.id, a]))

    // 6. Build response grouped per CP → TP → student → grades
    const cpsWithGrades = cps.map(cp => {
      const tps = cp.tps.map(tp => {
        const tpManual = manualGrades.filter(g => g.cpId === cp.id && g.tpId === tp.id)
        const tpAuto = autoGrades.filter(g => g.cpId === cp.id && g.tpId === tp.id)

        const studentsWithGrades = students.map(student => {
          const studentManual = tpManual.filter(g => g.studentId === student.id)
          const studentAuto = tpAuto.filter(g => g.studentId === student.id)

          const grades = [
            ...studentManual.map(g => ({
              id: g.id,
              kind: 'manual' as const,
              title: g.title,
              score: g.score,
              gradeCategory: g.gradeCategory,
              gradeType: g.gradeType,
              isOverride: g.isOverride,
              isReleased: g.isReleased,
              date: g.createdAt,
            })),
            ...studentAuto.map(g => ({
              id: g.id,
              kind: 'auto' as const,
              title: assignmentMap.get(g.assignmentId || '')?.title || 'Tugas Daring',
              score: g.totalScore,
              gradeCategory: 'tugas_harian' as const,
              gradeType: 'tugas' as const,
              isOverride: false as const,
              isReleased: g.isReleased,
              date: g.completedAt,
              assignmentId: g.assignmentId,
              quizScore: g.quizScore,
              typingScore: g.typingScore,
            })),
          ]

          return {
            studentId: student.id,
            namaLengkap: student.namaLengkap,
            nisn: student.nisn,
            grades,
          }
        })

        // Hitung rata-rata untuk TP
        const allTugasScores: number[] = []
        const allUHScores: number[] = []
        studentsWithGrades.forEach(s => {
          s.grades.forEach(g => {
            if (g.gradeCategory === 'tugas_harian' || g.kind === 'auto') {
              allTugasScores.push(Number(g.score) || 0)
            } else if (g.gradeCategory === 'ulangan_harian') {
              allUHScores.push(Number(g.score) || 0)
            }
          })
        })
        const avgTugas = allTugasScores.length > 0
          ? allTugasScores.reduce((a, b) => a + b, 0) / allTugasScores.length
          : 0
        const avgUH = allUHScores.length > 0
          ? allUHScores.reduce((a, b) => a + b, 0) / allUHScores.length
          : 0
        const nhTP = (avgTugas * 0.6) + (avgUH * 0.4)

        return {
          tpId: tp.id,
          kodeTP: tp.kodeTP,
          deskripsi: tp.deskripsi,
          avgTugas: Math.round(avgTugas * 10) / 10,
          avgUH: Math.round(avgUH * 10) / 10,
          nhTP: Math.round(nhTP * 10) / 10,
          jumlahTugas: allTugasScores.length,
          jumlahUH: allUHScores.length,
          students: studentsWithGrades,
        }
      })

      // NH CP = rata-rata NH semua TP yang punya data
      const validTPs = tps.filter(t => t.jumlahTugas > 0 || t.jumlahUH > 0)
      const nhCP = validTPs.length > 0
        ? validTPs.reduce((a, t) => a + t.nhTP, 0) / validTPs.length
        : 0

      return {
        cpId: cp.id,
        kodeCP: cp.kodeCP,
        deskripsi: cp.deskripsi,
        gradeLevel: cp.gradeLevel,
        nhCP: Math.round(nhCP * 10) / 10,
        tps,
      }
    })

    return NextResponse.json({
      success: true,
      cps: cpsWithGrades,
      totalStudents: students.length,
    })
  } catch (error) {
    console.error('[grades/per-cp] GET error:', error)
    return NextResponse.json({
      success: true,
      cps: [],
      error: 'Gagal memuat data nilai per CP',
    })
  }
}
