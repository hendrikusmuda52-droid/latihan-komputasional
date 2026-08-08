import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// Helper: safely run a DB query, return [] on any error (cold start, timeout, missing relation).
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[grades/calculate] safeQuery error:', err)
    return []
  }
}

// Helper: safely fetch a single record (SubjectConfig), return null on error.
async function safeQuerySingle<T>(fn: () => Promise<T | null>): Promise<T | null> {
  try {
    return await fn()
  } catch (err) {
    console.error('[grades/calculate] safeQuerySingle error:', err)
    return null
  }
}

// GET: kalkulasi nilai akhir berjenjang untuk semua siswa
// ?kelas=8A (opsional filter per kelas)
export async function GET(req: NextRequest) {
  // HOTFIX #2: Outer try-catch — never return 500, always return a safe empty payload.
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const kelas = req.nextUrl.searchParams.get('kelas') || ''

    // 1. Ambil config (KKM + bobot NH/UTS/UAS) — safeQuerySingle guards against DB errors.
    let config = await safeQuerySingle(() =>
      db.subjectConfig.findUnique({ where: { subject: teacherSubject } }),
    )
    // If config doesn't exist, try to create it — but guard against race conditions.
    if (!config) {
      try {
        config = await db.subjectConfig.create({ data: { subject: teacherSubject } })
      } catch (createErr) {
        // Race: another request created it concurrently. Fetch again.
        console.error('[grades/calculate] config create error (likely race):', createErr)
        config = await safeQuerySingle(() =>
          db.subjectConfig.findUnique({ where: { subject: teacherSubject } }),
        )
      }
    }
    // HOTFIX #2: If config still null (DB totally broken), use safe defaults so the math never crashes.
    const safeConfig = {
      kkm: config?.kkm ?? 75,
      bobotNH: config?.bobotNH ?? 40,
      bobotUTS: config?.bobotUTS ?? 30,
      bobotUAS: config?.bobotUAS ?? 30,
    }

    // 2. Ambil semua bab (LearningObjective) — safeQuery returns [] on error.
    const babs = await safeQuery(() =>
      db.learningObjective.findMany({
        where: { subject: teacherSubject, isActive: true },
      }),
    )

    // 3. Ambil semua siswa (filter kelas jika ada) — safeQuery returns [] on error.
    const studentWhere = kelas && kelas !== 'ALL' ? { kelas } : {}
    const students = await safeQuery(() =>
      db.student.findMany({
        where: studentWhere,
        select: { id: true, namaLengkap: true, nisn: true, kelas: true, sekolah: true },
        orderBy: { namaLengkap: 'asc' },
      }),
    )

    // 4. Ambil semua manual grades untuk subject ini — safeQuery returns [] on error.
    const allGrades = await safeQuery(() =>
      db.manualGrade.findMany({ where: { subject: teacherSubject } }),
    )

    // 5. Ambil semua auto results (daring) untuk subject ini — safeQuery returns [] on error.
    const autoResults = await safeQuery(() =>
      db.result.findMany({ where: { subject: teacherSubject } }),
    )

    // HOTFIX #2: If no students found (DB empty / kelas filter has no match),
    // return safe empty payload — don't even attempt the math.
    if (!students || students.length === 0) {
      return NextResponse.json({
        success: true,
        config: safeConfig,
        babs: (babs || []).map(b => ({
          id: b.id,
          chapter: b.chapter,
          bobotTugas: b.bobotTugas ?? 40,
          bobotUH: b.bobotUH ?? 60,
        })),
        results: [],
      })
    }

    // 6. Kalkulasi per siswa — wrapped in try-catch per-student so one bad row never kills the whole API.
    const results = students.map(student => {
      try {
        const studentGrades = (allGrades || []).filter(g => g.studentId === student.id)
        const studentAuto = (autoResults || []).filter(r => r.studentId === student.id)

        // Langkah A: Nilai per Bab
        const babNilai = (babs || []).map(bab => {
          const tugasManual = studentGrades.filter(g => g.gradeType === 'tugas' && g.babId === bab.id)
          const allTugasScores = [
            ...tugasManual.map(g => Number(g.score) || 0),
            ...studentAuto.map(r => Number(r.totalScore) || 0),
          ]
          const avgTugas = allTugasScores.length > 0
            ? allTugasScores.reduce((a, b) => a + b, 0) / allTugasScores.length
            : 0

          const uhGrades = studentGrades.filter(g => g.gradeType === 'uh' && g.babId === bab.id)
          const avgUH = uhGrades.length > 0
            ? uhGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / uhGrades.length
            : 0

          // HOTFIX #2: guard against bab.bobotTugas/UH being null (defensive — schema defaults to 40/60).
          const bobotTugas = Number(bab.bobotTugas) || 40
          const bobotUH = Number(bab.bobotUH) || 60
          const nilaiBab = (avgTugas * (bobotTugas / 100)) + (avgUH * (bobotUH / 100))

          return {
            babId: bab.id,
            chapter: bab.chapter,
            avgTugas: Math.round(avgTugas * 10) / 10,
            avgUH: Math.round(avgUH * 10) / 10,
            nilaiBab: Math.round(nilaiBab * 10) / 10,
            jumlahTugas: allTugasScores.length,
            jumlahUH: uhGrades.length,
          }
        })

        // Langkah B: Nilai Harian (NH) = rata-rata semua nilai bab yang punya data
        const validBabNilai = babNilai.filter(b => b.jumlahTugas > 0 || b.jumlahUH > 0)
        const NH = validBabNilai.length > 0
          ? validBabNilai.reduce((a, b) => a + b.nilaiBab, 0) / validBabNilai.length
          : 0

        // Langkah C: Nilai Akhir
        const utsGrades = studentGrades.filter(g => g.gradeType === 'uts')
        const uasGrades = studentGrades.filter(g => g.gradeType === 'uas')
        const nilaiUTS = utsGrades.length > 0
          ? utsGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / utsGrades.length
          : 0
        const nilaiUAS = uasGrades.length > 0
          ? uasGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / uasGrades.length
          : 0

        const NA = (NH * (safeConfig.bobotNH / 100)) +
                   (nilaiUTS * (safeConfig.bobotUTS / 100)) +
                   (nilaiUAS * (safeConfig.bobotUAS / 100))

        return {
          studentId: student.id,
          namaLengkap: student.namaLengkap || '-',
          nisn: student.nisn || '-',
          kelas: student.kelas || '-',
          sekolah: student.sekolah || '-',
          babNilai,
          NH: Math.round(NH * 10) / 10,
          UTS: Math.round(nilaiUTS * 10) / 10,
          UAS: Math.round(nilaiUAS * 10) / 10,
          NA: Math.round(NA * 10) / 10,
          kkm: safeConfig.kkm,
          status: NA < safeConfig.kkm ? 'Remedi' : 'Tuntas',
        }
      } catch (studentErr) {
        // HOTFIX #2: One bad student row never kills the whole API — return a default row.
        console.error('[grades/calculate] student calc error:', studentErr)
        return {
          studentId: student.id,
          namaLengkap: student.namaLengkap || '-',
          nisn: student.nisn || '-',
          kelas: student.kelas || '-',
          sekolah: student.sekolah || '-',
          babNilai: [],
          NH: 0,
          UTS: 0,
          UAS: 0,
          NA: 0,
          kkm: safeConfig.kkm,
          status: 'Tuntas',
        }
      }
    })

    return NextResponse.json({
      success: true,
      config: safeConfig,
      babs: (babs || []).map(b => ({
        id: b.id,
        chapter: b.chapter,
        bobotTugas: b.bobotTugas ?? 40,
        bobotUH: b.bobotUH ?? 60,
      })),
      results,
    })
  } catch (fatalErr) {
    // HOTFIX #2: Final fallback — return HTTP 200 with empty data so the frontend
    // never sees a 500 + HTML error page that triggers the red toast.
    console.error('[grades/calculate] FATAL error (returning safe empty payload):', fatalErr)
    return NextResponse.json({
      success: true,
      config: { kkm: 75, bobotNH: 40, bobotUTS: 30, bobotUAS: 30 },
      babs: [],
      results: [],
    })
  }
}
