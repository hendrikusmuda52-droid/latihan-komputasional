import { NextRequest, NextResponse } from 'next/server'
import { getTeacherFromToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const teacher = getTeacherFromToken(req)
    if (!teacher) {
      return NextResponse.json({ authenticated: false })
    }
    return NextResponse.json({
      authenticated: true,
      teacher: {
        teacherId: teacher.teacherId,
        username: teacher.username,
        name: teacher.name,
        role: teacher.role,
        subject: teacher.subject,
      },
    })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
