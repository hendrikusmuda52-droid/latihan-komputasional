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
import { User, Lock, KeyRound, Save, UserCog } from 'lucide-react'
import { toast } from 'sonner'

interface Teacher {
  id: string
  username: string
  name: string
}

export function TeacherProfile({
  teacher,
  onUpdated,
}: {
  teacher: Teacher
  onUpdated: (t: Teacher) => void
}) {
  const [form, setForm] = useState({
    currentPassword: '',
    newUsername: teacher.username,
    newName: teacher.name,
    newPassword: '',
    confirmPassword: '',
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.currentPassword) {
      toast.error('Password saat ini wajib diisi untuk konfirmasi')
      return
    }
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      toast.error('Password baru dan konfirmasi tidak cocok')
      return
    }
    if (form.newPassword && form.newPassword.length < 6) {
      toast.error('Password baru minimal 6 karakter')
      return
    }

    setSaving(true)
    try {
      const body: Record<string, string> = {
        currentPassword: form.currentPassword,
        newName: form.newName,
      }
      if (form.newUsername !== teacher.username) {
        body.newUsername = form.newUsername
      }
      if (form.newPassword) {
        body.newPassword = form.newPassword
      }

      const res = await fetch('/api/teacher/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')

      toast.success('Profil berhasil diperbarui')
      onUpdated(data.teacher)
      setForm({
        ...form,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <UserCog className="w-4 h-4 text-slate-600" />
            Informasi Akun
          </CardTitle>
          <CardDescription className="text-xs">
            Ubah nama tampilan dan username login
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Nama Lengkap</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={form.newName}
                onChange={(e) => setForm({ ...form, newName: e.target.value })}
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Username Login</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={form.newUsername}
                onChange={(e) => setForm({ ...form, newUsername: e.target.value })}
                className="pl-9"
                autoComplete="off"
              />
            </div>
            <p className="text-xs text-slate-400">
              Username digunakan untuk login. Jika diubah, gunakan username baru saat login berikutnya.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock className="w-4 h-4 text-slate-600" />
            Ubah Password
          </CardTitle>
          <CardDescription className="text-xs">
            Kosongkan jika tidak ingin mengubah password
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Password Baru</Label>
            <Input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              placeholder="Min. 6 karakter"
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Konfirmasi Password Baru</Label>
            <Input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Ulangi password baru"
              autoComplete="new-password"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-amber-200 bg-amber-50/30">
        <CardHeader className="bg-amber-50 pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-amber-900">
            <KeyRound className="w-4 h-4" />
            Konfirmasi Perubahan
          </CardTitle>
          <CardDescription className="text-xs text-amber-800">
            Demi keamanan, masukkan password saat ini untuk menyimpan perubahan
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="space-y-1 flex-1 min-w-[200px]">
              <Label className="text-xs">Password Saat Ini</Label>
              <Input
                type="password"
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                placeholder="Masukkan password saat ini"
                autoComplete="current-password"
              />
            </div>
            <Button
              onClick={handleSave}
              disabled={saving}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Save className="w-4 h-4 mr-1" />
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
