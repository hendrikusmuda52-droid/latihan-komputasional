import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// GET /api/teacher/results-rekap
// Fetch rekap pengerjaan tugas siswa per kelas (untuk ditampilkan langsung di UI)
// Query: kelas (opsional), tahunAjaran, semester

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[results-rekap] safeQuery error:', err); return [] }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const kelasFilter = req.nextUrl.searchParams.get('kelas') || 'ALL'

    // 1. Fetch students (filtered by kelas)
    const studentWhere: Record<string, unknown> = { isActive: true }
    if (kelasFilter !== 'ALL') {
      studentWhere.kelas = kelasFilter
    }
    const students = await safeQuery(() =>
      db.student.findMany({
        where: studentWhere,
        select: { id: true, namaLengkap: true, nisn: true, kelas: true, sekolah: true },
        orderBy: [{ kelas: 'asc' }, { namaLengkap: 'asc' }],
      })
    )

    // 2. Fetch assignments (filtered by kelas)
    // ── FIX: Jangan tampilkan tugas hukuman di rekap ──
    // Tugas hukuman (isPunishment=true) hanya untuk siswa yang belum mengerjakan.
    // Di rekap guru, tugas hukuman membingungkan karena muncul untuk semua siswa.
    // Filter: hanya tampilkan tugas NON-hukuman.
    const assignmentWhere: Record<string, unknown> = { subject: teacherSubject, isActive: true }
    if (kelasFilter !== 'ALL') {
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

    // ── FIX: Filter tugas hukuman dari rekap ──
    // Tugas hukuman (title mulai dengan "⚠️ HUKUMAN") tidak ditampilkan di rekap
    // karena hanya berlaku untuk siswa tertentu yang tidak mengerjakan
    const filteredAssignments = (assignments || []).filter(a =>
      !a.title.startsWith('⚠️ HUKUMAN') && !a.title.startsWith('HUKUMAN:')
    )

    // 3. Fetch all results for these students
    const studentIds = (students || []).map(s => s.id)
    const results = studentIds.length > 0
      ? await safeQuery(() =>
          db.result.findMany({
            where: { studentId: { in: studentIds }, subject: teacherSubject },
            select: {
              studentId: true, assignmentId: true,
              totalScore: true, quizScore: true, typingScore: true,
              quizCorrect: true, quizTotal: true,
              isReleased: true, completedAt: true,
            },
          })
        )
      : []

    // 4. Build rekap per student
    const resultsByStudent = new Map<string, typeof results>()
    for (const r of results) {
      const list = resultsByStudent.get(r.studentId) || []
      list.push(r)
      resultsByStudent.set(r.studentId, list)
    }

    const rekap = (students || []).map(s => {
      const sResults = resultsByStudent.get(s.id) || []
      const totalDikerjakan = sResults.length
      const scores = sResults.map(r => Number(r.totalScore) || 0)
      const rataRata = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10
        : 0
      const tertinggi = scores.length > 0 ? Math.max(...scores) : 0
      const terendah = scores.length > 0 ? Math.min(...scores) : 0

      // Status per assignment
      const assignmentStatus = filteredAssignments.map(a => {
        const result = sResults.find(r => r.assignmentId === a.id)
        return {
          assignmentId: a.id,
          title: a.title,
          status: result ? 'sudah' : 'belum',
          nilai: result ? Number(result.totalScore) || 0 : null,
          isReleased: result ? result.isReleased : false,
        }
      })

      return {
        studentId: s.id,
        namaLengkap: s.namaLengkap,
        nisn: s.nisn,
        kelas: s.kelas,
        sekolah: s.sekolah,
        totalDikerjakan,
        totalTugas: filteredAssignments.length,
        rataRata,
        tertinggi,
        terendah,
        assignmentStatus,
      }
    })

    // 5. Ringkasan per kelas
    const ringkasan = {
      totalSiswa: (students || []).length,
      totalTugas: (assignments || []).length,
      totalDikerjakan: results.length,
      rataRataKelas: rekap.length > 0
        ? Math.round(rekap.reduce((a, s) => a + s.rataRata, 0) / rekap.length * 10) / 10
        : 0,
      sudahMengerjakan: rekap.filter(s => s.totalDikerjakan > 0).length,
      belumMengerjakan: rekap.filter(s => s.totalDikerjakan === 0).length,
      lulus: rekap.filter(s => s.rataRata >= 75).length,
      tidakLulus: rekap.filter(s => s.rataRata > 0 && s.rataRata < 75).length,
    }

    return NextResponse.json({
      success: true,
      assignments: filteredAssignments.map(a => ({
        id: a.id,
        title: a.title,
        targetKelas: a.targetKelas,
        taskType: a.taskType,
      })),
      rekap,
      ringkasan,
    })
  } catch (error) {
    console.error('[results-rekap] error:', error)
    return NextResponse.json({ success: true, rekap: [], ringkasan: {} })
  }
}
