import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[attendance] safeQuery error:', err); return [] }
}

// GET: ambil absensi untuk subject + kelas + tanggal tertentu
// ?kelas=7A&tanggal=2026-01-15&tahunAjaran=2026/2027&semester=ganjil
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const kelas = req.nextUrl.searchParams.get('kelas') || ''
    const tanggal = req.nextUrl.searchParams.get('tanggal') || ''
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'

    // If specific date requested, get attendance for that date
    if (tanggal) {
      const dateStart = new Date(tanggal + 'T00:00:00.000Z')
      const dateEnd = new Date(tanggal + 'T23:59:59.999Z')

      const records = await safeQuery(() =>
        db.attendance.findMany({
          where: {
            subject: teacherSubject,
            kelas,
            tanggal: { gte: dateStart, lte: dateEnd },
            tahunAjaran, semester,
          },
          include: { student: { select: { namaLengkap: true, nisn: true } } },
          orderBy: { student: { namaLengkap: 'asc' } },
        })
      )
      return NextResponse.json({ success: true, records: records || [] })
    }

    // If no date, get all attendance for subject + kelas (for percentage stats)
    const where: Record<string, unknown> = { subject: teacherSubject, tahunAjaran, semester }
    if (kelas) where.kelas = kelas

    const allRecords = await safeQuery(() =>
      db.attendance.findMany({
        where,
        include: { student: { select: { id: true, namaLengkap: true, nisn: true, kelas: true } } },
        orderBy: [{ tanggal: 'desc' }, { student: { namaLengkap: 'asc' } }],
      })
    )

    // Compute attendance percentage per student
    const studentStats: Record<string, { student: typeof allRecords[0]['student']; hadir: number; sakit: number; izin: number; alpa: number; total: number; percentage: number }> = {}
    for (const r of (allRecords || [])) {
      const sid = r.studentId
      if (!studentStats[sid]) {
        studentStats[sid] = {
          student: r.student,
          hadir: 0, sakit: 0, izin: 0, alpa: 0, total: 0, percentage: 100,
        }
      }
      studentStats[sid].total++
      if (r.status === 'H') studentStats[sid].hadir++
      else if (r.status === 'S') studentStats[sid].sakit++
      else if (r.status === 'I') studentStats[sid].izin++
      else if (r.status === 'A') studentStats[sid].alpa++
    }

    // Calculate percentage: (Hadir + Sakit + Izin) / Total * 100
    const stats = Object.values(studentStats).map(s => ({
      ...s,
      percentage: s.total > 0 ? Math.round(((s.hadir + s.sakit + s.izin) / s.total) * 100) : 100,
    }))

    return NextResponse.json({ success: true, records: allRecords || [], stats })
  } catch (fatalErr) {
    console.error('[attendance] GET FATAL:', fatalErr)
    return NextResponse.json({ success: true, records: [], stats: [] })
  }
}

// POST: simpan/update absensi (bulk)
// Body: { tanggal, kelas, tahunAjaran, semester, records: [{ studentId, status, keterangan }] }
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body bukan JSON valid' }, { status: 400 }) }

    const { tanggal, kelas, tahunAjaran, semester, records } = body as {
      tanggal?: string; kelas?: string; tahunAjaran?: string; semester?: string
      records?: Array<{ studentId: string; status: string; keterangan?: string }>
    }

    if (!tanggal || !kelas || !Array.isArray(records)) {
      return NextResponse.json({ error: 'tanggal, kelas, dan records wajib diisi' }, { status: 400 })
    }

    const teacherSubject = teacher.subject || 'Informatika'
    const finalTahunAjaran = tahunAjaran || '2026/2027'
    const finalSemester = semester || 'ganjil'
    const dateObj = new Date(tanggal + 'T00:00:00.000Z')

    // Validate status values
    const validStatuses = ['H', 'S', 'I', 'A']
    const validRecords = records.filter(r =>
      r.studentId && validStatuses.includes(r.status)
    )

    if (validRecords.length === 0) {
      return NextResponse.json({ error: 'Tidak ada record absensi valid' }, { status: 400 })
    }

    try {
      // Upsert each record (create if not exists, update if exists)
      const results = await db.$transaction(
        validRecords.map(r =>
          db.attendance.upsert({
            where: {
              studentId_subject_tanggal: {
                studentId: r.studentId,
                subject: teacherSubject,
                tanggal: dateObj,
              },
            },
            update: {
              status: r.status,
              keterangan: r.keterangan || '',
              kelas,
              tahunAjaran: finalTahunAjaran,
              semester: finalSemester,
              teacherId: teacher.teacherId,
            },
            create: {
              studentId: r.studentId,
              subject: teacherSubject,
              kelas,
              tanggal: dateObj,
              status: r.status,
              keterangan: r.keterangan || '',
              tahunAjaran: finalTahunAjaran,
              semester: finalSemester,
              teacherId: teacher.teacherId,
            },
          })
        )
      )
      return NextResponse.json({ success: true, count: results.length })
    } catch (dbErr) {
      console.error('[attendance] POST DB error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal menyimpan absensi ke database' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('[attendance] POST FATAL:', error)
    return NextResponse.json({ error: 'Gagal memproses request' }, { status: 500 })
  }
}
