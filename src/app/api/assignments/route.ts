import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireTeacherAuth, getTeacherFromToken } from '@/lib/auth'

// Helper: safely run a DB query, return [] on any error.
async function safeQuery<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
  } catch (err) {
    console.error('[assignments] safeQuery error:', err)
    return []
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    // HOTFIX #3: safeQuery guards against any DB error — returns [] instead of crashing.
    const teacherSubject = teacher.subject || 'Informatika'
    const assignments = await safeQuery(() =>
      db.assignment.findMany({
        where: { subject: teacherSubject },
        orderBy: { createdAt: 'desc' },
      }),
    )

    // HOTFIX #3: Even if assignments is null/undefined (defensive — should not happen with safeQuery),
    // fall back to [] so the response is always a well-formed array.
    return NextResponse.json({ success: true, assignments: assignments || [] })
  } catch (error) {
    // HOTFIX #3: Final fallback — return HTTP 200 with empty array instead of 500 + HTML.
    console.error('[assignments] FATAL error (returning safe empty array):', error)
    return NextResponse.json({ success: true, assignments: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await requireTeacherAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const teacher = getTeacherFromToken(req)
    if (!teacher) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch (parseErr) {
      console.error('[assignments] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Body request bukan JSON valid' }, { status: 400 })
    }

    const { title, description, targetKelas, dueDate, isActive, exerciseType, questionCount, taskType } = body as {
      title?: string
      description?: string
      targetKelas?: string
      dueDate?: string
      isActive?: boolean
      exerciseType?: string
      questionCount?: number
      taskType?: string
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 })
    }

    const assignment = await db.assignment.create({
      data: {
        subject: teacher.subject || 'Informatika',
        title: title.trim(),
        description: description || '',
        targetKelas: targetKelas || 'ALL',
        isActive: isActive !== false,
        dueDate: dueDate ? new Date(dueDate) : null,
        exerciseType: exerciseType || 'wajib',
        questionCount: typeof questionCount === 'number' ? questionCount : 0,
        taskType: taskType || 'typing_quiz',
      },
    })
    return NextResponse.json({ success: true, assignment })
  } catch (error) {
    console.error('[assignments] POST FATAL error:', error)
    return NextResponse.json({ error: 'Gagal membuat tugas' }, { status: 500 })
  }
}
