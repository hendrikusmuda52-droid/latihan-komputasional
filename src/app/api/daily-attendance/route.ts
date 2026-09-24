import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken, requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// POST: siswa presensi harian dengan GPS
// Body: { latitude, longitude, accuracy, deviceInfo }
export async function POST(req: NextRequest) {
  try {
    if (!(await requireStudentAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = getStudentFromToken(req)!
    if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const body = await req.json()
    const { latitude, longitude, accuracy, deviceInfo } = body

    // Dapatkan tanggal hari ini (hanya tanggal, tanpa jam)
    const now = new Date()
    const todayStr = now.toISOString().split('T')[0] // "2026-09-15"
    const today = new Date(todayStr + 'T00:00:00')

    // Cek apakah siswa sudah presensi hari ini
    const existing = await db.dailyAttendance.findUnique({
      where: {
        studentId_tanggal: {
          studentId: session.studentId,
          tanggal: today,
        },
      },
    })

    if (existing) {
      return NextResponse.json({
        success: false,
        error: 'Anda sudah melakukan presensi hari ini',
        record: {
          ...existing,
          tanggal: existing.tanggal.toISOString(),
          createdAt: existing.createdAt.toISOString(),
        },
      })
    }

    // Buat record presensi
    const record = await db.dailyAttendance.create({
      data: {
        studentId: session.studentId,
        subject: 'Umum',
        kelas: session.kelas,
        tanggal: today,
        status: 'H', // Hadir
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        accuracy: accuracy ?? null,
        deviceInfo: deviceInfo || '',
      },
    })

    return NextResponse.json({
      success: true,
      record: {
        ...record,
        tanggal: record.tanggal.toISOString(),
        createdAt: record.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('[daily-attendance] POST error:', error)
    return NextResponse.json({ error: 'Gagal menyimpan presensi' }, { status: 500 })
  }
}

// GET: guru ambil presensi harian per kelas + tanggal
// ?kelas=7A&tanggal=2026-09-15
// ATAU siswa cek status presensi hari ini: ?studentCheck=true
export async function GET(req: NextRequest) {
  try {
    const isTeacher = await requireTeacherAuth(req)
    const isStudent = await requireStudentAuth(req)

    if (isStudent) {
      // Siswa: cek apakah sudah presensi hari ini
      const session = getStudentFromToken(req)
      if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

      const now = new Date()
      const todayStr = now.toISOString().split('T')[0]
      const today = new Date(todayStr + 'T00:00:00')

      const existing = await db.dailyAttendance.findUnique({
        where: {
          studentId_tanggal: {
            studentId: session.studentId,
            tanggal: today,
          },
        },
      })

      return NextResponse.json({
        success: true,
        hasPresensiToday: !!existing,
        record: existing ? {
          ...existing,
          tanggal: existing.tanggal.toISOString(),
          createdAt: existing.createdAt.toISOString(),
        } : null,
      })
    }

    if (isTeacher) {
      // Guru: ambil presensi per kelas + tanggal
      const kelas = req.nextUrl.searchParams.get('kelas')
      const tanggal = req.nextUrl.searchParams.get('tanggal')

      if (!kelas || !tanggal) {
        return NextResponse.json({ error: 'Kelas dan tanggal wajib diisi' }, { status: 400 })
      }

      const dayStart = new Date(tanggal + 'T00:00:00')
      const dayEnd = new Date(tanggal + 'T23:59:59')

      // Ambil semua siswa di kelas tersebut
      const students = await db.student.findMany({
        where: { kelas, isActive: true },
        select: { id: true, namaLengkap: true, nisn: true, kelas: true },
        orderBy: { namaLengkap: 'asc' },
      })

      // Ambil presensi untuk kelas + tanggal
      const records = await db.dailyAttendance.findMany({
        where: {
          kelas,
          tanggal: { gte: dayStart, lte: dayEnd },
        },
      })

      // Map: studentId → record
      const recordMap = new Map(records.map(r => [r.studentId, r]))

      // Gabungkan: setiap siswa + record presensi (jika ada)
      const result = students.map(s => {
        const rec = recordMap.get(s.id)
        return {
          studentId: s.id,
          namaLengkap: s.namaLengkap,
          nisn: s.nisn,
          kelas: s.kelas,
          status: rec?.status || 'Belum',
          waktuPresensi: rec?.createdAt?.toISOString() || null,
          latitude: rec?.latitude || null,
          longitude: rec?.longitude || null,
          accuracy: rec?.accuracy || null,
          deviceInfo: rec?.deviceInfo || '',
        }
      })

      return NextResponse.json({ success: true, records: result, total: result.length })
    }

    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
  } catch (error) {
    console.error('[daily-attendance] GET error:', error)
    return NextResponse.json({ error: 'Gagal mengambil presensi' }, { status: 500 })
  }
}
