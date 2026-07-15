import { NextResponse } from 'next/server'

const g = globalThis as unknown as {
  __teacherSessions?: Map<string, unknown>
}

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('teacher_token')
  // Hapus semua session yang masih ada di memori tidak praktis tanpa token,
  // tapi karena cookie dihapus, session tidak akan dipakai lagi.
  // Untuk kebersihan, kita bisa skip.
  return res
}
