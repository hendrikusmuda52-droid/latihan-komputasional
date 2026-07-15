import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

// Recreate sessions map (must match login route structure)
// Note: in dev this won't share state with login route module instance,
// so we use cookie token + DB check instead for robustness.
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('teacher_token')?.value
    if (!token) {
      return NextResponse.json({ authenticated: false })
    }

    // Untuk demo: kita simpan token di DB dengan tabel terpisah? Tidak ada.
    // Pendekatan: hash token sebagai username lookup tidak aman.
    // Solusi paling sederhana: simpan session di file/memory global.
    // Karena Next.js dev mode reload, kita gunakan global cache.
    const g = globalThis as unknown as {
      __teacherSessions?: Map<string, { teacherId: string; username: string; name: string }>
    }
    if (!g.__teacherSessions) g.__teacherSessions = new Map()
    const session = g.__teacherSessions.get(token)
    if (!session) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({
      authenticated: true,
      teacher: session,
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}
