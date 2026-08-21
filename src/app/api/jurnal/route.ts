import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[jurnal] safeQuery error:', err); return [] }
}

// Helper: get number of JP slots per day
// Senin: 9, Selasa-Kamis: 8, Jumat: 5
export function getJPSlots(hari: string): number {
  switch (hari) {
    case 'Senin': return 9
    case 'Selasa':
    case 'Rabu':
    case 'Kamis': return 8
    case 'Jumat': return 5
    default: return 8
  }
}

// Helper: get hari name from date
export function getHariFromDate(date: Date): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  return days[date.getDay()] || 'Senin'
}

// GET: ambil jurnal untuk tanggal tertentu
// ?tanggal=2026-01-15 (returns all JP slots for that date)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const tanggal = req.nextUrl.searchParams.get('tanggal')
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'

    const teacherSubject = teacher.subject || 'Informatika'

    if (!tanggal) {
      // Return list of all jurnal entries for this teacher (grouped by tanggal)
      const allJurnal = await safeQuery(() =>
        db.jurnalGuru.findMany({
          where: { teacherId: teacher.teacherId, subject: teacherSubject, tahunAjaran, semester },
          orderBy: [{ tanggal: 'desc' }, { jamPelajaran: 'asc' }],
        })
      )
      return NextResponse.json({ success: true, jurnal: allJurnal || [] })
    }

    // Get jurnal for specific date
    const dateStart = new Date(tanggal + 'T00:00:00.000Z')
    const dateEnd = new Date(tanggal + 'T23:59:59.999Z')
    const hari = getHariFromDate(dateStart)
    const jpSlots = getJPSlots(hari)

    const existing = await safeQuery(() =>
      db.jurnalGuru.findMany({
        where: {
          teacherId: teacher.teacherId,
          subject: teacherSubject,
          tanggal: { gte: dateStart, lte: dateEnd },
        },
        orderBy: { jamPelajaran: 'asc' },
      })
    )

    // Build template: JP 1 to jpSlots, fill with existing data or empty
    const template: Array<{
      jamPelajaran: number; exists: boolean; id: string | null;
      kelas: string; mapel: string; cpId: string | null; tpId: string | null;
      materiPokok: string; hambatan: string;
    }> = []
    for (let jp = 1; jp <= jpSlots; jp++) {
      const record = (existing || []).find(e => e.jamPelajaran === jp)
      template.push({
        jamPelajaran: jp,
        exists: !!record,
        id: record?.id || null,
        kelas: record?.kelas || '',
        mapel: record?.mapel || teacherSubject,
        cpId: record?.cpId || null,
        tpId: record?.tpId || null,
        materiPokok: record?.materiPokok || '',
        hambatan: record?.hambatan || '',
      })
    }

    return NextResponse.json({
      success: true,
      tanggal,
      hari,
      jpSlots,
      template,
    })
  } catch (fatalErr) {
    console.error('[jurnal] GET FATAL:', fatalErr)
    return NextResponse.json({ success: true, jurnal: [] })
  }
}

// POST: simpan/update jurnal untuk 1 JP slot
// Body: { tanggal, jamPelajaran, kelas, mapel, cpId, tpId, materiPokok, hambatan, tahunAjaran, semester }
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body bukan JSON valid' }, { status: 400 }) }

    const { tanggal, jamPelajaran, kelas, mapel, cpId, tpId, materiPokok, hambatan, tahunAjaran, semester } = body as {
      tanggal?: string; jamPelajaran?: number; kelas?: string; mapel?: string
      cpId?: string | null; tpId?: string | null
      materiPokok?: string; hambatan?: string
      tahunAjaran?: string; semester?: string
    }

    if (!tanggal || !jamPelajaran || !kelas) {
      return NextResponse.json({ error: 'tanggal, jamPelajaran, dan kelas wajib diisi' }, { status: 400 })
    }

    const teacherSubject = teacher.subject || 'Informatika'
    const dateObj = new Date(tanggal + 'T00:00:00.000Z')
    const hari = getHariFromDate(dateObj)
    const jpSlots = getJPSlots(hari)

    // Validate JP is within allowed slots for this day
    if (jamPelajaran < 1 || jamPelajaran > jpSlots) {
      return NextResponse.json({
        error: `Jam pelajaran ${jamPelajaran} tidak valid untuk hari ${hari} (maksimal ${jpSlots} JP)`,
      }, { status: 400 })
    }

    try {
      // Upsert: create if not exists, update if exists
      const record = await db.jurnalGuru.upsert({
        where: {
          teacherId_tanggal_jamPelajaran: {
            teacherId: teacher.teacherId,
            tanggal: dateObj,
            jamPelajaran,
          },
        },
        update: {
          kelas,
          mapel: mapel || teacherSubject,
          cpId: cpId || null,
          tpId: tpId || null,
          materiPokok: materiPokok || '',
          hambatan: hambatan || '',
          tahunAjaran: tahunAjaran || '2026/2027',
          semester: semester || 'ganjil',
        },
        create: {
          teacherId: teacher.teacherId,
          subject: teacherSubject,
          tanggal: dateObj,
          hari,
          jamPelajaran,
          kelas,
          mapel: mapel || teacherSubject,
          cpId: cpId || null,
          tpId: tpId || null,
          materiPokok: materiPokok || '',
          hambatan: hambatan || '',
          tahunAjaran: tahunAjaran || '2026/2027',
          semester: semester || 'ganjil',
        },
      })
      return NextResponse.json({ success: true, jurnal: record })
    } catch (dbErr) {
      console.error('[jurnal] POST DB error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal menyimpan jurnal ke database' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('[jurnal] POST FATAL:', error)
    return NextResponse.json({ error: 'Gagal memproses request' }, { status: 500 })
  }
}
