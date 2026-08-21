import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// MAX 100 characters for TP deskripsi (e-Rapor safe)
const MAX_TP_LENGTH = 100

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[tp] safeQuery error:', err); return [] }
}

// GET: list semua TP (optionally filtered by cpId)
export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const cpId = req.nextUrl.searchParams.get('cpId')
    const teacherSubject = teacher.subject || 'Informatika'

    const where: Record<string, unknown> = { isActive: true }
    if (cpId) {
      where.cpId = cpId
    } else {
      // Filter by subject via CP relation
      where.cp = { subject: teacherSubject, isActive: true }
    }

    const tps = await safeQuery(() =>
      db.tujuanPembelajaran.findMany({
        where,
        include: { cp: true },
        orderBy: { kodeTP: 'asc' },
      })
    )

    return NextResponse.json({ success: true, tps: tps || [] })
  } catch (fatalErr) {
    console.error('[tp] GET FATAL:', fatalErr)
    return NextResponse.json({ success: true, tps: [] })
  }
}

// POST: tambah TP baru (with 100-char validation)
export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req)))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body bukan JSON valid' }, { status: 400 }) }

    const { cpId, kodeTP, deskripsi } = body as {
      cpId?: string; kodeTP?: string; deskripsi?: string
    }

    if (!cpId)
      return NextResponse.json({ error: 'cpId wajib diisi' }, { status: 400 })
    if (!deskripsi)
      return NextResponse.json({ error: 'deskripsi TP wajib diisi' }, { status: 400 })

    // ── STRICT VALIDATION: MAX 100 characters (including spaces) ──
    // This is critical for e-Rapor compatibility.
    if (deskripsi.length > MAX_TP_LENGTH) {
      return NextResponse.json({
        error: `Deskripsi TP melebihi batas ${MAX_TP_LENGTH} karakter (saat ini: ${deskripsi.length} karakter). Persingkat agar muat di e-Rapor.`,
        currentLength: deskripsi.length,
        maxLength: MAX_TP_LENGTH,
      }, { status: 400 })
    }

    // Verify CP exists and belongs to teacher's subject
    const cp = await db.capaianPembelajaran.findUnique({
      where: { id: cpId },
    })
    if (!cp) {
      return NextResponse.json({ error: 'CP tidak ditemukan' }, { status: 404 })
    }
    const teacherSubject = teacher.subject || 'Informatika'
    if (cp.subject !== teacherSubject && teacher.role !== 'admin') {
      return NextResponse.json({ error: 'Anda tidak memiliki akses ke CP ini' }, { status: 403 })
    }

    try {
      const tp = await db.tujuanPembelajaran.create({
        data: {
          cpId,
          kodeTP: kodeTP || '',
          deskripsi,  // already validated ≤ 100 chars
        },
        include: { cp: true },
      })
      return NextResponse.json({ success: true, tp })
    } catch (dbErr) {
      console.error('[tp] POST DB error:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Gagal menyimpan TP. Kode TP mungkin sudah ada untuk CP ini.' },
        { status: 400 }
      )
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal memproses request' }, { status: 400 })
  }
}
