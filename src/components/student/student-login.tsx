'use client'

import { useState } from 'react'
import Image from 'next/image'
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
import { Lock, KeyRound, School } from 'lucide-react'
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
  // ── NEW: State untuk forced password change ──
  const [mustChangePassword, setMustChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)

  const handleForceChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Password baru dan konfirmasi tidak cocok')
      return
    }
    if (newPassword.length < 8) {
      toast.error('Password minimal 8 karakter')
      return
    }
    const hasUpper = /[A-Z]/.test(newPassword)
    const hasLower = /[a-z]/.test(newPassword)
    const hasDigit = /[0-9]/.test(newPassword)
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(newPassword)
    if (!hasUpper || !hasLower || !hasDigit || !hasSpecial) {
      toast.error('Password harus kombinasi: huruf besar, huruf kecil, angka, dan tanda baca')
      return
    }

    setChangingPassword(true)
    try {
      const res = await fetch('/api/student/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: password, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal mengubah password')
      toast.success('Password berhasil diubah! Silakan login dengan password baru.')
      setMustChangePassword(false)
      setNewPassword('')
      setConfirmPassword('')
      setPassword('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal mengubah password')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nisn || !password) {
      toast.error('Username dan password wajib diisi')
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

      // ── FIX: Cek mustChangePassword flag ──
      if (data.mustChangePassword) {
        setMustChangePassword(true)
        toast.warning('Guru telah mereset password Anda. Silakan ubah password sebelum lanjut.')
        return
      }

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
            {/* ── Dua logo sekolah berdampingan ── */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <Image
                src="/logo-smp.png"
                alt="Logo SMP Santo Augustinus"
                width={70}
                height={70}
                className="rounded-lg object-contain"
                priority
              />
              <Image
                src="/logo-smk.png"
                alt="Logo SMK Santo Petrus"
                width={70}
                height={70}
                className="rounded-lg object-contain"
                priority
              />
            </div>
            <div>
              <CardTitle className="text-2xl">Login Siswa</CardTitle>
              <CardDescription className="mt-1">
                Masuk dengan Username dan password yang diberikan guru
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nisn">Username</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="nisn"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    placeholder="Masukkan Username"
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
                <p>Akun siswa dibuat oleh guru. Hubungi guru Anda untuk mendapatkan Username dan password login.</p>
              </div>

              <a
                href="/?view=teacher"
                className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-2"
              >
                <School className="w-4 h-4 inline mr-1" />
                Login sebagai Guru
              </a>
            </form>
          </CardContent>
        </Card>

        {/* ── NEW: Dialog ubah password saat guru reset password ── */}
        {mustChangePassword && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <Card className="w-full max-w-md shadow-2xl border-amber-300">
              <CardHeader className="bg-amber-50 rounded-t-lg">
                <CardTitle className="text-lg text-amber-800">
                  ⚠️ Ubah Password Anda
                </CardTitle>
                <CardDescription className="text-amber-700 text-sm">
                  Guru telah mereset password Anda. Untuk keamanan, silakan buat password baru sebelum melanjutkan.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleForceChangePassword} className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-700">
                    <p className="font-semibold">Syarat password:</p>
                    <ul className="list-disc list-inside mt-0.5">
                      <li>Minimal 8 karakter</li>
                      <li>Huruf besar (A-Z)</li>
                      <li>Huruf kecil (a-z)</li>
                      <li>Angka (0-9)</li>
                      <li>Tanda baca (!@#$ dll)</li>
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-pwd">Password Baru</Label>
                    <Input
                      id="new-pwd"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Masukkan password baru"
                      autoFocus
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm-pwd">Konfirmasi Password</Label>
                    <Input
                      id="confirm-pwd"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi password baru"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={changingPassword}
                  >
                    {changingPassword ? 'Menyimpan...' : 'Ubah Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
