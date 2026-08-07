import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('teacher_token')?.value
    if (!token) {
      return NextResponse.json({ authenticated: false })
    }

    const g = globalThis as unknown as {
      __teacherSessions?: Map<string, { teacherId: string; username: string; name: string; role: string; subject: string }>
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
