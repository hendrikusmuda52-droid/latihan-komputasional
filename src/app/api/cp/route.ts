import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[cp] safeQuery error:', err); return [] }
}

// GET: list semua CP untuk subject guru (with TPs nested)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const teacherSubject = teacher.subject || 'Informatika'
    const gradeLevel = req.nextUrl.searchParams.get('grade')
    const subjectParam = req.nextUrl.searchParams.get('subject')

    // If subject param is provided, use it (allows multi-mapel guru to fetch
    // CPs for a different subject than their JWT subject).
    // Otherwise fall back to teacher's JWT subject.
    const effectiveSubject = subjectParam || teacherSubject

    const where: Record<string, unknown> = { subject: effectiveSubject, isActive: true }
    if (gradeLevel) where.gradeLevel = gradeLevel

    const cps = await safeQuery(() =>
      db.capaianPembelajaran.findMany({
        where,
        include: { tps: { where: { isActive: true }, orderBy: { kodeTP: 'asc' } } },
        orderBy: [{ gradeLevel: 'asc' }, { kodeCP: 'asc' }],
      })
    )

    return NextResponse.json({ success: true, cps: cps || [] })
  } catch (fatalErr) {
    console.error('[cp] GET FATAL:', fatalErr)
    return NextResponse.json({ success: true, cps: [] })
  }
}

// POST: tambah CP baru
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body bukan JSON valid' }, { status: 400 }) }

    const { gradeLevel, kodeCP, deskripsi, subject } = body as {
      gradeLevel?: string; kodeCP?: string; deskripsi?: string; subject?: string
    }

    if (!gradeLevel || !deskripsi)
      return NextResponse.json({ error: 'gradeLevel dan deskripsi wajib diisi' }, { status: 400 })

    // Use subject from body if provided (for multi-mapel guru), else fall back to JWT subject
    const teacherSubject = subject || teacher.subject || 'Informatika'

    try {
      const cp = await db.capaianPembelajaran.create({
        data: {
          subject: teacherSubject,
          gradeLevel,
          kodeCP: kodeCP || '',
          deskripsi,
          teacherId: teacher.teacherId,
        },
        include: { tps: true },
      })
      return NextResponse.json({ success: true, cp })
    } catch (dbErr) {
      console.error('[cp] POST DB error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal menyimpan CP. Kode CP mungkin sudah ada untuk mapel+kelas ini.' },
        { status: 400 }
      )
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal memproses request' }, { status: 400 })
  }
}
