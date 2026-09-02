import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { createStudentToken, getStudentFromToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { nisn, password } = await req.json()
    if (!nisn || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 })
    }

    // Detect production HTTPS for secure cookie flag
    const isHttps = req.nextUrl.protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https'

    let student
    try {
      student = await db.student.findUnique({ where: { nisn } })
    } catch (dbErr) {
      console.error('[student/auth] Login DB query failed:', dbErr)
      return NextResponse.json(
        { error: 'Server sedang sibuk. Mohon coba login lagi dalam beberapa detik.' },
        { status: 503 }
      )
    }

    if (!student) {
      return NextResponse.json({ error: 'Username tidak terdaftar' }, { status: 401 })
    }
    if (!student.password) {
      return NextResponse.json({ error: 'Password belum diset oleh guru. Hubungi guru.' }, { status: 403 })
    }

    // ── FIX: Support plain text password + SHA-256 hash (backward compatible) ──
    // Sebelumnya: hanya cek hash SHA-256
    // Sekarang: cek plain text dulu, lalu hash
    // Ini agar siswa yang dibuat dengan password plain text (dari import/teacher UI)
    // tetap bisa login, dan siswa lama dengan hash juga bisa login
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    if (student.password !== password && student.password !== hash) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 })
    }

    // Buat JWT token (stateless)
    const token = createStudentToken({
      studentId: student.id,
      nisn: student.nisn,
      namaLengkap: student.namaLengkap,
      kelas: student.kelas,
    })

    const res = NextResponse.json({
      success: true,
      student: {
        id: student.id,
        namaLengkap: student.namaLengkap,
        nisn: student.nisn,
        kelas: student.kelas,
        sekolah: student.sekolah,
        jenisKelamin: student.jenisKelamin,
      },
      // ── FIX: Return mustChangePassword flag agar frontend bisa tampilkan notifikasi ──
      mustChangePassword: (student as Record<string, unknown>).mustChangePassword === true,
    })
    res.cookies.set('student_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isHttps,     // ── FIX: secure flag on Vercel HTTPS
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return res
  } catch (error) {
    console.error('Student login error:', error)
    return NextResponse.json({ error: 'Gagal login. Silakan coba lagi.' }, { status: 500 })
  }
}

// GET: cek session siswa (stateless)
// ── RESILIENCE FIX: If JWT is valid but DB query fails (transient Vercel
// serverless issue), fall back to JWT payload data so students aren't
// kicked to login during force-stop redirects or page reloads.
export async function GET(req: NextRequest) {
  try {
    const student = getStudentFromToken(req)
    if (!student) {
      return NextResponse.json({ authenticated: false })
    }
    // Fetch fresh data from DB — wrapped in try-catch for resilience
    try {
      const dbStudent = await db.student.findUnique({
        where: { id: student.studentId },
        select: {
          id: true, namaLengkap: true, nisn: true, kelas: true,
          sekolah: true, jenisKelamin: true, isActive: true,
        },
      })
      if (!dbStudent) {
        // Student was deleted from DB but JWT still valid — treat as unauthenticated
        return NextResponse.json({ authenticated: false })
      }
      return NextResponse.json({ authenticated: true, student: dbStudent })
    } catch (dbErr) {
      // DB transient failure — fall back to JWT data so student stays logged in
      console.error('[student/auth] DB query failed, falling back to JWT data:', dbErr)
      return NextResponse.json({
        authenticated: true,
        student: {
          id: student.studentId,
          namaLengkap: student.namaLengkap,
          nisn: student.nisn,
          kelas: student.kelas,
          sekolah: '',       // unknown — dashboard can handle empty
          jenisKelamin: '',  // unknown
          isActive: true,    // assume active since JWT is valid
        },
        dbFallback: true,    // flag for debugging
      })
    }
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

// DELETE: logout siswa
export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('student_token')
  return res
}
