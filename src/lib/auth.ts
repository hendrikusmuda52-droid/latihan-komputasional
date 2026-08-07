import { NextRequest } from 'next/server'
import crypto from 'crypto'

// Secret key untuk JWT signing (dari env atau default)
const JWT_SECRET = process.env.JWT_SECRET || process.env.GEMINI_API_KEY || 'SAKOLA_SECRET_2024_hendrikus'

// Interface untuk teacher session data
export interface TeacherSession {
  teacherId: string
  username: string
  name: string
  role: string
  subject: string
}

// Interface untuk student session data
export interface StudentSession {
  studentId: string
  nisn: string
  namaLengkap: string
  kelas: string
}

// Buat JWT token (simple HMAC-SHA256 based)
export function createTeacherToken(data: TeacherSession): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({ ...data, type: 'teacher', iat: Date.now() })).toString('base64url')
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url')
  return `${header}.${payload}.${signature}`
}

// Buat JWT token untuk student
export function createStudentToken(data: StudentSession): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({ ...data, type: 'student', iat: Date.now() })).toString('base64url')
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url')
  return `${header}.${payload}.${signature}`
}

// Verifikasi JWT token (stateless - tidak butuh memory)
export function verifyToken(token: string): { valid: boolean; data?: Record<string, unknown> } {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return { valid: false }

    const [header, payload, signature] = parts
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url')

    if (signature !== expectedSig) return { valid: false }

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return { valid: true, data }
  } catch {
    return { valid: false }
  }
}

// Cek auth guru dari cookie (STATELESS - works on Vercel serverless)
export async function requireTeacherAuth(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('teacher_token')?.value
  if (!token) return false
  const { valid, data } = verifyToken(token)
  return valid && data?.type === 'teacher'
}

// Cek auth admin dari cookie
export async function requireAdminAuth(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('teacher_token')?.value
  if (!token) return false
  const { valid, data } = verifyToken(token)
  return valid && data?.type === 'teacher' && data?.role === 'admin'
}

// Cek auth siswa dari cookie
export async function requireStudentAuth(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('student_token')?.value
  if (!token) return false
  const { valid, data } = verifyToken(token)
  return valid && data?.type === 'student'
}

// Ambil data guru dari token
export function getTeacherFromToken(req: NextRequest): TeacherSession | null {
  const token = req.cookies.get('teacher_token')?.value
  if (!token) return null
  const { valid, data } = verifyToken(token)
  if (!valid || data?.type !== 'teacher') return null
  return {
    teacherId: data.teacherId as string,
    username: data.username as string,
    name: data.name as string,
    role: (data.role as string) || 'teacher',
    subject: (data.subject as string) || 'Informatika',
  }
}

// Ambil data siswa dari token
export function getStudentFromToken(req: NextRequest): StudentSession | null {
  const token = req.cookies.get('student_token')?.value
  if (!token) return null
  const { valid, data } = verifyToken(token)
  if (!valid || data?.type !== 'student') return null
  return {
    studentId: data.studentId as string,
    nisn: data.nisn as string,
    namaLengkap: data.namaLengkap as string,
    kelas: data.kelas as string,
  }
}
