'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GraduationCap, Lock, KeyRound, ArrowLeft, User, School } from 'lucide-react'
import { toast } from 'sonner'

interface StudentInfo {
  id: string
  namaLengkap: string
  nisn: string
  kelas: string
  sekolah: string
  jenisKelamin: string
}

export function StudentLogin({ onLogin }: { onLogin: (s: StudentInfo) => void }) {
  const [nisn, setNisn] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nisn || !password) {
      toast.error('NISN dan password wajib diisi')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/student/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nisn, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal login')
      toast.success(`Selamat datang, ${data.student.namaLengkap}!`)
      onLogin(data.student)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md shadow-xl border-emerald-200">
          <CardHeader className="space-y-3 text-center pb-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center mx-auto">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Login Siswa</CardTitle>
              <CardDescription className="mt-1">
                Masuk dengan NISN dan password yang diberikan guru
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nisn">NISN</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="nisn"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    placeholder="Masukkan NISN"
                    className="pl-9"
                    autoFocus
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="pl-9"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                <p className="font-semibold mb-1">💡 Belum punya akun?</p>
                <p>Akun siswa dibuat oleh guru. Hubungi guru Anda untuk mendapatkan NISN dan password login.</p>
              </div>

              <a
                href="/"
                className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-2"
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Kembali ke halaman utama
              </a>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
