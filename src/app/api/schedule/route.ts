import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken, requireStudentAuth, getStudentFromToken } from '@/lib/auth'
import { SCHEDULE, SUBJECTS, NON_ACADEMIC_SLOTS, getTeacherSchedule, getClassSchedule, getAllTeacherSlots, getTodayName } from '@/lib/schedule-data'

// GET /api/schedule
// ?role=teacher → jadwal guru (filter by teacherCode = teacher.username)
// ?role=student → jadwal siswa (filter by student.kelas)
// ?role=admin → semua slot (rekap)
// ?day=Senin → filter hari (default: hari ini)
export async function GET(req: NextRequest) {
  try {
    const role = req.nextUrl.searchParams.get('role') || 'teacher'
    const day = req.nextUrl.searchParams.get('day') || getTodayName()

    // ── Try DB first (if Schedule table has data) ──
    let dbSchedule: any[] = []
    try {
      dbSchedule = await db.schedule.findMany({
        where: { hari: day, isActive: true },
        orderBy: { jamPelajaran: 'asc' },
      })
    } catch {
      // Table might not exist yet — fall back to static JSON
    }

    // ── If DB has data, use it; otherwise use static JSON ──
    if (dbSchedule.length > 0) {
      // Use DB data
      if (role === 'teacher') {
        if (!(await requireTeacherAuth(req))) {
          return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
        }
        const teacher = getTeacherFromToken(req)
        if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

        const teacherCode = teacher.username
        const slots = dbSchedule.filter(s => s.teacherCode === teacherCode)
        return NextResponse.json({
          success: true,
          day,
          teacherCode,
          slots: slots.map(s => ({
            ...s,
            mapelName: SUBJECTS[s.subjectCode] || s.subjectCode,
            isNonAcademic: NON_ACADEMIC_SLOTS.includes(s.subjectCode),
          })),
        })
      }

      if (role === 'student') {
        if (!(await requireStudentAuth(req))) {
          return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
        }
        const session = getStudentFromToken(req)
        if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

        const kelas = session.kelas
        const slots = dbSchedule.filter(s => s.kelas === kelas || s.kelas === 'ALL')
        return NextResponse.json({
          success: true,
          day,
          kelas,
          slots: slots.map(s => ({
            ...s,
            mapelName: SUBJECTS[s.subjectCode] || s.subjectCode,
            isNonAcademic: NON_ACADEMIC_SLOTS.includes(s.subjectCode),
          })),
        })
      }

      // Admin: return all
      return NextResponse.json({ success: true, day, slots: dbSchedule })
    }

    // ── Fall back to static JSON schedule ──
    if (role === 'teacher') {
      if (!(await requireTeacherAuth(req))) {
        return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
      }
      const teacher = getTeacherFromToken(req)
      if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

      const teacherCode = teacher.username
      const slots = getTeacherSchedule(teacherCode, day)
      return NextResponse.json({ success: true, day, teacherCode, slots, source: 'static' })
    }

    if (role === 'student') {
      if (!(await requireStudentAuth(req))) {
        return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
      }
      const session = getStudentFromToken(req)
      if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

      const kelas = session.kelas
      const slots = getClassSchedule(kelas, day)
      return NextResponse.json({ success: true, day, kelas, slots, source: 'static' })
    }

    // Admin: return all slots
    const allSlots = getAllTeacherSlots(day)
    return NextResponse.json({ success: true, day, slots: allSlots, source: 'static' })
  } catch (error) {
    console.error('[schedule] GET error:', error)
    return NextResponse.json({ error: 'Gagal mengambil jadwal' }, { status: 500 })
  }
}

// POST: Seed schedule from static JSON to DB (admin only)
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher || teacher.role !== 'admin') {
      return NextResponse.json({ error: 'Hanya admin yang bisa seed jadwal' }, { status: 403 })
    }

    // Seed from static JSON
    let count = 0
    for (const [hari, daySchedule] of Object.entries(SCHEDULE)) {
      for (const [jam, slots] of Object.entries(daySchedule)) {
        for (const [kelas, [subjectCode, teacherCode]] of Object.entries(slots)) {
          try {
            await db.schedule.upsert({
              where: { hari_jamPelajaran_kelas: { hari, jamPelajaran: jam, kelas } },
              update: { subjectCode, teacherCode: teacherCode === '-' ? null : teacherCode },
              create: {
                hari, jamPelajaran: jam, kelas,
                subjectCode,
                teacherCode: teacherCode === '-' ? null : teacherCode,
                isActive: true,
              },
            })
            count++
          } catch {}
        }
      }
    }

    return NextResponse.json({ success: true, seeded: count })
  } catch (error) {
    console.error('[schedule] POST error:', error)
    return NextResponse.json({ error: 'Gagal seed jadwal' }, { status: 500 })
  }
}
