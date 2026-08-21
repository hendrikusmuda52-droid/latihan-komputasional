import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { createTeacherToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 })
    }

    // Detect production HTTPS for secure cookie flag
    const isHttps = req.nextUrl.protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https'

    // ═════════════════════════════════════════════════════════════════
    // EMERGENCY BYPASS: Static admin credentials — skips DB query entirely
    // Works even if DATABASE_URL is broken / .env reset / DB offline
    // Token uses createTeacherToken() so all downstream APIs work
    // ═════════════════════════════════════════════════════════════════
    if (username === 'admin' && password === 'guru123') {
      const bypassSession = {
        teacherId: 'bypass-admin-id',
        username: 'admin',
        name: 'Administrator (Bypass)',
        role: 'admin',
        subject: 'Informatika',
        kelasDiampu: '7,8,9',
      }

      const token = createTeacherToken(bypassSession)

      const res = NextResponse.json({
        success: true,
        teacher: bypassSession,
        token,
      })
      res.cookies.set('teacher_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: isHttps,     // ── FIX: secure flag on Vercel HTTPS
        maxAge: 60 * 60 * 8,
        path: '/',
      })
      return res
    }
    // ═════════════════════════════════════════════════════════════════

    // Normal login flow (DB query) — wrapped in try-catch for resilience
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    let teacher
    try {
      teacher = await db.teacher.findUnique({ where: { username } })
    } catch (dbErr) {
      console.error('[teacher/login] DB query failed:', dbErr)
      return NextResponse.json(
        { error: 'Server sedang sibuk. Mohon coba login lagi dalam beberapa detik.' },
        { status: 503 }
      )
    }

    if (!teacher || teacher.password !== hash) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 })
    }

    const role = (teacher as Record<string, unknown>).role as string || 'teacher'
    const subject = (teacher as Record<string, unknown>).subject as string || 'Informatika'
    let kelasDiampu = (teacher as Record<string, unknown>).kelasDiampu as string || '7,8,9'

    if (role === 'admin' && subject === 'Informatika') {
      kelasDiampu = '7,8,9'
    }

    const token = createTeacherToken({
      teacherId: teacher.id,
      username: teacher.username,
      name: teacher.name,
      role,
      subject,
      kelasDiampu,
    })

    const res = NextResponse.json({
      success: true,
      teacher: { id: teacher.id, username: teacher.username, name: teacher.name, role, subject, kelasDiampu },
      token,
    })
    res.cookies.set('teacher_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isHttps,     // ── FIX: secure flag on Vercel HTTPS
      maxAge: 60 * 60 * 8,
      path: '/',
    })
    return res
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Gagal login. Silakan coba lagi.' }, { status: 500 })
  }
}
