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
import { School, Lock, User, ArrowLeft, KeyRound } from 'lucide-react'
import { toast } from 'sonner'

interface Teacher {
  id: string
  username: string
  name: string
}

export function TeacherLogin({ onLogin }: { onLogin: (t: Teacher) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      toast.error('Username dan password wajib diisi')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal login')
      toast.success(`Selamat datang, ${data.teacher.name}!`)
      onLogin(data.teacher)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-white to-emerald-50">
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md shadow-xl border-slate-200">
          <CardHeader className="space-y-3 text-center pb-4">
            <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mx-auto">
              <School className="w-7 h-7 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Login Dashboard Guru</CardTitle>
              <CardDescription className="mt-1">
                Masuk untuk melihat hasil latihan siswa
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
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
                className="w-full bg-slate-800 hover:bg-slate-900"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2">
                <KeyRound className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-0.5">Akun demo:</p>
                  <p>Username: <code className="bg-amber-100 px-1 rounded">guru</code></p>
                  <p>Password: <code className="bg-amber-100 px-1 rounded">guru123</code></p>
                </div>
              </div>

              <a
                href="/"
                className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-2"
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Kembali ke halaman siswa
              </a>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
