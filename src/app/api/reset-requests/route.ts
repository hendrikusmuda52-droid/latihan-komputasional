import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, requireStudentAuth, getTeacherFromToken, getStudentFromToken } from '@/lib/auth'

async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn() }
  catch (err) { console.error('[reset-requests] safeQuery error:', err); return [] }
}

// GET: teacher fetches pending reset requests for their subject
export async function GET(req: NextRequest) {
  try {
    // Try teacher auth first
    if (await requireTeacherAuth(req)) {
      const teacher = getTeacherFromToken(req)
      if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

      const teacherSubject = (teacher.subject && teacher.subject.trim() !== '')
        ? teacher.subject.trim() : 'Informatika'
      const safeSubject = teacherSubject || 'Informatika'

      // ── STRICT SUBJECT ISOLATION: only fetch requests for THIS teacher's subject ──
      const requests = await safeQuery(() =>
        db.resetRequest.findMany({
          where: { subject: safeSubject, status: 'pending' },
          include: { student: { select: { namaLengkap: true, nisn: true, kelas: true } } },
          orderBy: { createdAt: 'desc' },
        })
      )

      return NextResponse.json({ success: true, requests: requests || [] })
    }

    // Try student auth (for fetching their own requests)
    if (await requireStudentAuth(req)) {
      const student = getStudentFromToken(req)
      if (!student) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

      const subject = req.nextUrl.searchParams.get('subject') || 'Informatika'
      const requests = await safeQuery(() =>
        db.resetRequest.findMany({
          where: { studentId: student.studentId, subject },
          orderBy: { createdAt: 'desc' },
        })
      )

      return NextResponse.json({ success: true, requests: requests || [] })
    }

    return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
  } catch (fatalErr) {
    console.error('[reset-requests] GET FATAL:', fatalErr)
    return NextResponse.json({ success: true, requests: [] })
  }
}

// POST: student submits a reset request
export async function POST(req: NextRequest) {
  try {
    if (!(await requireStudentAuth(req)))
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    const student = getStudentFromToken(req)
    if (!student) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try { body = await req.json() }
    catch { return NextResponse.json({ error: 'Body bukan JSON valid' }, { status: 400 }) }

    const { subject, assignmentId, cpId, tpId, reason } = body as {
      subject?: string; assignmentId?: string; cpId?: string; tpId?: string; reason?: string
    }

    if (!subject) return NextResponse.json({ error: 'Subject wajib diisi' }, { status: 400 })

    // Get student's kelas
    const studentRecord = await db.student.findUnique({
      where: { id: student.studentId },
      select: { kelas: true },
    })

    try {
      const request = await db.resetRequest.create({
        data: {
          studentId: student.studentId,
          subject,
          assignmentId: assignmentId || null,
          kelas: studentRecord?.kelas || '-',
          cpId: cpId || null,
          tpId: tpId || null,
          reason: reason || '',
          status: 'pending',
        },
      })
      return NextResponse.json({ success: true, request })
    } catch (dbErr) {
      console.error('[reset-requests] POST DB error:', dbErr)
      return NextResponse.json({ error: 'Gagal mengirim pengajuan reset' }, { status: 400 })
    }
  } catch (error) {
    console.error('[reset-requests] POST FATAL:', error)
    return NextResponse.json({ error: 'Gagal memproses request' }, { status: 500 })
  }
}
