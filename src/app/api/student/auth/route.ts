import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

// Global session store untuk siswa
const g = globalThis as unknown as {
  __studentSessions?: Map<string, { studentId: string; nisn: string; namaLengkap: string; kelas: string }>
}
if (!g.__studentSessions) g.__studentSessions = new Map()
export const studentSessions = g.__studentSessions

// POST: login siswa dengan NISN + password
export async function POST(req: NextRequest) {
  try {
    const { nisn, password } = await req.json()
    if (!nisn || !password) {
      return NextResponse.json({ error: 'NISN dan password wajib diisi' }, { status: 400 })
    }

    const student = await db.student.findUnique({ where: { nisn } })
    if (!student) {
      return NextResponse.json({ error: 'NISN tidak terdaftar' }, { status: 401 })
    }
    if (!student.isActive) {
      return NextResponse.json({ error: 'Akun Anda dinonaktifkan. Hubungi guru.' }, { status: 403 })
    }
    if (!student.password) {
      return NextResponse.json({ error: 'Password belum diset oleh guru. Hubungi guru.' }, { status: 403 })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    if (student.password !== hash) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    studentSessions.set(token, {
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
    })
    res.cookies.set('student_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: '/',
    })
    return res
  } catch (error) {
    console.error('Student login error:', error)
    return NextResponse.json({ error: 'Gagal login' }, { status: 500 })
  }
}

// GET: cek session siswa
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('student_token')?.value
    if (!token || !studentSessions.has(token)) {
      return NextResponse.json({ authenticated: false })
    }
    const session = studentSessions.get(token)!
    const student = await db.student.findUnique({
      where: { id: session.studentId },
      select: {
        id: true, namaLengkap: true, nisn: true, kelas: true,
        sekolah: true, jenisKelamin: true, isActive: true,
      },
    })
    if (!student || !student.isActive) {
      studentSessions.delete(token)
      return NextResponse.json({ authenticated: false })
    }
    return NextResponse.json({ authenticated: true, student })
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
