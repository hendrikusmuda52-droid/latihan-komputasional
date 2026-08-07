import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// GET: kalkulasi nilai akhir berjenjang untuk semua siswa
// ?kelas=8A (opsional filter per kelas)
export async function GET(req: NextRequest) {
  if (!(await requireTeacherAuth(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const teacher = getTeacherFromToken(req)!
  const kelas = req.nextUrl.searchParams.get('kelas')

  // 1. Ambil config (KKM + bobot NH/UTS/UAS)
  let config = await db.subjectConfig.findUnique({ where: { subject: teacher.subject } })
  if (!config) {
    config = await db.subjectConfig.create({ data: { subject: teacher.subject } })
  }

  // 2. Ambil semua bab (LearningObjective) untuk subject ini
  const babs = await db.learningObjective.findMany({
    where: { subject: teacher.subject, isActive: true },
  })

  // 3. Ambil semua siswa (filter kelas jika ada)
  const studentWhere = kelas && kelas !== 'ALL' ? { kelas } : {}
  const students = await db.student.findMany({
    where: studentWhere,
    select: { id: true, namaLengkap: true, nisn: true, kelas: true, sekolah: true },
    orderBy: { namaLengkap: 'asc' },
  })

  // 4. Ambil semua manual grades untuk subject ini
  const allGrades = await db.manualGrade.findMany({
    where: { subject: teacher.subject },
  })

  // 5. Ambil semua auto results (daring) untuk subject ini
  const autoResults = await db.result.findMany({
    where: { subject: teacher.subject },
  })

  // 6. Kalkulasi per siswa
  const results = students.map(student => {
    const studentGrades = allGrades.filter(g => g.studentId === student.id)
    const studentAuto = autoResults.filter(r => r.studentId === student.id)

    // Langkah A: Nilai per Bab
    const babNilai = babs.map(bab => {
      // Tugas: manual grades type=tugas + auto results (daring) linked to bab
      const tugasManual = studentGrades.filter(g => g.gradeType === 'tugas' && g.babId === bab.id)
      const tugasAuto = studentAuto // auto results dari tugas daring
      const allTugasScores = [
        ...tugasManual.map(g => g.score),
        // Auto results juga masuk sebagai nilai tugas
        ...studentAuto.map(r => r.totalScore),
      ]
      const avgTugas = allTugasScores.length > 0
        ? allTugasScores.reduce((a, b) => a + b, 0) / allTugasScores.length
        : 0

      // Ulangan Harian: manual grades type=uh
      const uhGrades = studentGrades.filter(g => g.gradeType === 'uh' && g.babId === bab.id)
      const avgUH = uhGrades.length > 0
        ? uhGrades.reduce((a, b) => a + b.score, 0) / uhGrades.length
        : 0

      // Nilai 1 Bab = (avgTugas × bobotTugas) + (avgUH × bobotUH)
      const nilaiBab = (avgTugas * (bab.bobotTugas / 100)) + (avgUH * (bab.bobotUH / 100))

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

    // Langkah B: Nilai Harian (NH) = rata-rata semua nilai bab
    const validBabNilai = babNilai.filter(b => b.jumlahTugas > 0 || b.jumlahUH > 0)
    const NH = validBabNilai.length > 0
      ? validBabNilai.reduce((a, b) => a + b.nilaiBab, 0) / validBabNilai.length
      : 0

    // Langkah C: Nilai Akhir = (NH × bobotNH) + (UTS × bobotUTS) + (UAS × bobotUAS)
    const utsGrades = studentGrades.filter(g => g.gradeType === 'uts')
    const uasGrades = studentGrades.filter(g => g.gradeType === 'uas')
    const nilaiUTS = utsGrades.length > 0
      ? utsGrades.reduce((a, b) => a + b.score, 0) / utsGrades.length
      : 0
    const nilaiUAS = uasGrades.length > 0
      ? uasGrades.reduce((a, b) => a + b.score, 0) / uasGrades.length
      : 0

    const NA = (NH * (config.bobotNH / 100)) + (nilaiUTS * (config.bobotUTS / 100)) + (nilaiUAS * (config.bobotUAS / 100))

    return {
      studentId: student.id,
      namaLengkap: student.namaLengkap,
      nisn: student.nisn,
      kelas: student.kelas,
      sekolah: student.sekolah,
      babNilai,
      NH: Math.round(NH * 10) / 10,
      UTS: Math.round(nilaiUTS * 10) / 10,
      UAS: Math.round(nilaiUAS * 10) / 10,
      NA: Math.round(NA * 10) / 10,
      kkm: config.kkm,
      status: NA < config.kkm ? 'Remedi' : 'Tuntas',
    }
  })

  return NextResponse.json({
    success: true,
    config: { kkm: config.kkm, bobotNH: config.bobotNH, bobotUTS: config.bobotUTS, bobotUAS: config.bobotUAS },
    babs: babs.map(b => ({ id: b.id, chapter: b.chapter, bobotTugas: b.bobotTugas, bobotUH: b.bobotUH })),
    results,
  })
}
