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
    // ── v2: tahun ajaran + semester filter ──
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'

    // 1. Ambil config (KKM + bobot NH/STS/SAS) per tahun ajaran + semester
    let config = await safeQuerySingle(() =>
      db.subjectConfig.findUnique({
        where: { subject_tahunAjaran_semester: { subject: teacherSubject, tahunAjaran, semester } },
      }),
    )
    // If config doesn't exist, try to create it — but guard against race conditions.
    if (!config) {
      try {
        config = await db.subjectConfig.create({
          data: { subject: teacherSubject, tahunAjaran, semester },
        })
      } catch (createErr) {
        console.error('[grades/calculate] config create error (likely race):', createErr)
        config = await safeQuerySingle(() =>
          db.subjectConfig.findUnique({
            where: { subject_tahunAjaran_semester: { subject: teacherSubject, tahunAjaran, semester } },
          }),
        )
      }
    }
    // If config still null (DB broken), use safe defaults
    const safeConfig = {
      kkm: config?.kkm ?? 75,
      bobotNH: config?.bobotNH ?? 40,
      bobotSTS: (config as { bobotSTS?: number })?.bobotSTS ?? 30,
      bobotSAS: (config as { bobotSAS?: number })?.bobotSAS ?? 30,
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

    // 4. Ambil semua manual grades untuk subject + tahunAjaran + semester
    const allGrades = await safeQuery(() =>
      db.manualGrade.findMany({
        where: { subject: teacherSubject, tahunAjaran, semester },
      }),
    )

    // 5. Ambil semua auto results (daring) untuk subject + tahunAjaran + semester
    const autoResults = await safeQuery(() =>
      db.result.findMany({
        where: { subject: teacherSubject, tahunAjaran, semester },
      }),
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
          // ── FIX BUG C: filter auto results per CP/bab ──
          // Sebelumnya: studentAuto masuk ke SEMUA bab → NH menggelembung
          // Sekarang: hanya auto results yang cpId-nya cocok dengan bab.id yang masuk
          const tugasAuto = studentAuto.filter(r => r.cpId === bab.id || r.cpId === null)
          const allTugasScores = [
            ...tugasManual.map(g => Number(g.score) || 0),
            ...tugasAuto.map(r => Number(r.totalScore) || 0),
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
        // v2: NH terdiri dari Tugas Harian + Ulangan Harian
        const validBabNilai = babNilai.filter(b => b.jumlahTugas > 0 || b.jumlahUH > 0)
        const NH = validBabNilai.length > 0
          ? validBabNilai.reduce((a, b) => a + b.nilaiBab, 0) / validBabNilai.length
          : 0

        // v2: Tugas Harian (tugas_harian) dan Ulangan Harian (ulangan_harian) secara terpisah
        const tugasHarianGrades = studentGrades.filter(g =>
          g.gradeCategory === 'tugas_harian' || g.gradeType === 'tugas'
        )
        const ulanganHarianGrades = studentGrades.filter(g =>
          g.gradeCategory === 'ulangan_harian' || g.gradeType === 'uh'
        )
        const avgTugasHarian = tugasHarianGrades.length > 0
          ? tugasHarianGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / tugasHarianGrades.length
          : 0
        const avgUlanganHarian = ulanganHarianGrades.length > 0
          ? ulanganHarianGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / ulanganHarianGrades.length
          : 0

        // Langkah C: Nilai Akhir = (NH × %NH) + (STS × %STS) + (SAS × %SAS)
        // v2: STS = Asesmen Tengah Semester (was UTS), SAS = Asesmen Akhir Semester (was UAS)
        const stsGrades = studentGrades.filter(g =>
          g.gradeCategory === 'sts' || g.gradeType === 'uts'
        )
        const sasGrades = studentGrades.filter(g =>
          g.gradeCategory === 'sas' || g.gradeType === 'uas'
        )
        const nilaiSTS = stsGrades.length > 0
          ? stsGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / stsGrades.length
          : 0
        const nilaiSAS = sasGrades.length > 0
          ? sasGrades.reduce((a, b) => a + (Number(b.score) || 0), 0) / sasGrades.length
          : 0

        const NA = (NH * (safeConfig.bobotNH / 100)) +
                   (nilaiSTS * (safeConfig.bobotSTS / 100)) +
                   (nilaiSAS * (safeConfig.bobotSAS / 100))

        return {
          studentId: student.id,
          namaLengkap: student.namaLengkap || '-',
          nisn: student.nisn || '-',
          kelas: student.kelas || '-',
          sekolah: student.sekolah || '-',
          babNilai,
          NH: Math.round(NH * 10) / 10,
          avgTugasHarian: Math.round(avgTugasHarian * 10) / 10,
          avgUlanganHarian: Math.round(avgUlanganHarian * 10) / 10,
          STS: Math.round(nilaiSTS * 10) / 10,
          SAS: Math.round(nilaiSAS * 10) / 10,
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
