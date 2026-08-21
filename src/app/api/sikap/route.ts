import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[sikap] safeQuery error:', err); return [] }
}

// GET: ambil catatan sikap untuk subject (+ optional kelas, studentId, tanggal range)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const kelas = req.nextUrl.searchParams.get('kelas')
    const studentId = req.nextUrl.searchParams.get('studentId')
    const tahunAjaran = req.nextUrl.searchParams.get('tahunAjaran') || '2026/2027'
    const semester = req.nextUrl.searchParams.get('semester') || 'ganjil'

    const where: Record<string, unknown> = { subject: teacherSubject, tahunAjaran, semester }
    if (kelas) where.kelas = kelas
    if (studentId) where.studentId = studentId

    const records = await safeQuery(() =>
      db.catatanSikap.findMany({
        where,
        include: { student: { select: { namaLengkap: true, nisn: true, kelas: true } } },
        orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }],
      })
    )

    return NextResponse.json({ success: true, records: records || [] })
  } catch (fatalErr) {
    console.error('[sikap] GET FATAL:', fatalErr)
    return NextResponse.json({ success: true, records: [] })
  }
}

// POST: tambah catatan sikap baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body bukan JSON valid' }, { status: 400 }) }

    const { studentId, kelas, tanggal, kategori, deskripsi, tindakLanjut, tahunAjaran, semester } = body as {
      studentId?: string; kelas?: string; tanggal?: string
      kategori?: string; deskripsi?: string; tindakLanjut?: string
      tahunAjaran?: string; semester?: string
    }

    if (!studentId || !kelas || !tanggal || !deskripsi) {
      return NextResponse.json({
        error: 'studentId, kelas, tanggal, dan deskripsi wajib diisi'
      }, { status: 400 })
    }

    const teacherSubject = teacher.subject || 'Informatika'
    const dateObj = new Date(tanggal + 'T00:00:00.000Z')

    // Validate kategori
    const validKategori = ['Spiritual', 'Sosial', 'ProfilPelajarPancasila']
    const finalKategori = validKategori.includes(kategori || '') ? kategori : 'Sosial'

    try {
      const record = await db.catatanSikap.create({
        data: {
          studentId,
          subject: teacherSubject,
          kelas,
          tanggal: dateObj,
          kategori: finalKategori as string,
          deskripsi,
          tindakLanjut: tindakLanjut || '',
          tahunAjaran: tahunAjaran || '2026/2027',
          semester: semester || 'ganjil',
          teacherId: teacher.teacherId,
        },
        include: { student: { select: { namaLengkap: true, nisn: true, kelas: true } } },
      })
      return NextResponse.json({ success: true, record })
    } catch (dbErr) {
      console.error('[sikap] POST DB error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal menyimpan catatan sikap' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('[sikap] POST FATAL:', error)
    return NextResponse.json({ error: 'Gagal memproses request' }, { status: 500 })
  }
}
