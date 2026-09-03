import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStudentAuth, getStudentFromToken } from '@/lib/auth'

// POST /api/student/change-password
// Siswa ubah password sendiri
// Body: { currentPassword, newPassword }
// Validasi: newPassword harus 8+ karakter, kombinasi huruf besar, kecil, angka, tanda baca

export async function POST(req: NextRequest) {
  try {
    if (!(await requireStudentAuth(req))) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }
    const session = getStudentFromToken(req)
    if (!session) return NextResponse.json({ error: 'Token invalid' }, { status: 401 })

    const body = await req.json()
    const { currentPassword, newPassword } = body as {
      currentPassword?: string
      newPassword?: string
    }

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Password lama dan baru wajib diisi' }, { status: 400 })
    }

    // Validasi password baru: 8+ karakter, kombinasi huruf besar, kecil, angka, tanda baca
    if (newPassword.length < 8) {
      return NextResponse.json({
        error: 'Password minimal 8 karakter',
      }, { status: 400 })
    }

    const hasUpper = /[A-Z]/.test(newPassword)
    const hasLower = /[a-z]/.test(newPassword)
    const hasDigit = /[0-9]/.test(newPassword)
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(newPassword)

    if (!hasUpper || !hasLower || !hasDigit || !hasSpecial) {
      return NextResponse.json({
        error: 'Password harus kombinasi: huruf besar (A-Z), huruf kecil (a-z), angka (0-9), dan tanda baca (!@#$ dll)',
      }, { status: 400 })
    }

    // Ambil siswa dari DB
    const student = await db.student.findUnique({
      where: { id: session.studentId },
      select: { id: true, password: true, mustChangePassword: true },
    })

    if (!student) {
      return NextResponse.json({ error: 'Siswa tidak ditemukan' }, { status: 404 })
    }

    // Verifikasi password lama (plain text ATAU hash — backward compatible)
    const crypto = await import('crypto')
    const hash = crypto.createHash('sha256').update(currentPassword).digest('hex')
    if (student.password !== currentPassword && student.password !== hash) {
      return NextResponse.json({ error: 'Password lama salah' }, { status: 401 })
    }

    // Update password baru (plain text) + clear mustChangePassword flag
    await db.student.update({
      where: { id: session.studentId },
      data: {
        password: newPassword,
        mustChangePassword: false,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Password berhasil diubah',
    })
  } catch (error) {
    console.error('[student/change-password] error:', error)
    return NextResponse.json(
      { error: 'Gagal mengubah password: ' + (error instanceof Error ? error.message : 'Unknown') },
      { status: 500 }
    )
  }
}
