'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Plus, RefreshCw, Shield, UserCog, Trash2, ToggleLeft, ToggleRight,
  Wallet, KeyRound, Pencil,
} from 'lucide-react'
import { toast } from 'sonner'

interface UserRow {
  id: string
  username: string
  name: string
  role: string
  subject: string
  isActive: boolean
  createdAt: string
}

const SUBJECTS = [
  'Informatika', 'Matematika', 'IPA', 'IPS', 'Bahasa Indonesia',
  'Bahasa Inggris', 'PKn', 'Seni Budaya', 'PJOK', 'Prakarya',
  'Agama', 'Lainnya',
]

const ROLE_INFO: Record<string, { label: string; icon: typeof Shield; color: string; badge: string }> = {
  admin: { label: 'Admin', icon: Shield, color: 'text-red-600', badge: 'bg-red-100 text-red-700' },
  guru: { label: 'Guru', icon: UserCog, color: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  bendahara: { label: 'Bendahara', icon: Wallet, color: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
}

export function AdminManager() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<UserRow | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/teacher/manage')
      const data = await res.json()
      if (data.success) setUsers(data.teachers)
    } catch {
      toast.error('Gagal memuat data user')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleToggleActive = async (u: UserRow) => {
    try {
      const res = await fetch('/api/teacher/manage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: u.id, isActive: !u.isActive }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Gagal')
      }
      toast.success(`User ${u.name} ${!u.isActive ? 'diaktifkan' : 'dinonaktifkan'}`)
      fetchUsers()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    try {
      const res = await fetch(`/api/teacher/manage?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')
      toast.success(`User "${name}" berhasil dihapus`)
      fetchUsers()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menghapus')
    }
  }

  const handleResetPassword = async (u: UserRow) => {
    const newPass = prompt(`Reset password untuk ${u.name} (${u.username}):`)
    if (!newPass) return
    if (newPass.length < 4) {
      toast.error('Password minimal 4 karakter')
      return
    }
    try {
      const res = await fetch('/api/teacher/manage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: u.id, password: newPass }),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success(`Password ${u.name} berhasil direset`)
    } catch {
      toast.error('Gagal reset password')
    }
  }

  // Stats per role
  const stats = {
    admin: users.filter(u => u.role === 'admin').length,
    guru: users.filter(u => u.role === 'guru').length,
    bendahara: users.filter(u => u.role === 'bendahara').length,
    aktif: users.filter(u => u.isActive).length,
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-red-50 border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.admin}</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <UserCog className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.guru}</p>
              <p className="text-xs text-slate-500">Guru Mapel</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.bendahara}</p>
              <p className="text-xs text-slate-500">Bendahara</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <UserCog className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.aktif}</p>
              <p className="text-xs text-slate-500">User Aktif</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabel User */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="w-4 h-4 text-red-600" />
              Manajemen Pengguna
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setEditing(null); setShowForm(true) }}>
                <Plus className="w-4 h-4 mr-1" /> Tambah User
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Admin bisa menambah guru, bendahara, atau admin lain. Semua user bisa login di halaman guru.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />Memuat...
            </div>
          ) : users.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <Shield className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="font-medium">Belum ada user</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Mapel/Bagian</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => {
                    const roleInfo = ROLE_INFO[u.role] || ROLE_INFO.guru
                    const RoleIcon = roleInfo.icon
                    return (
                      <TableRow key={u.id} className={u.isActive ? '' : 'opacity-50'}>
                        <TableCell className="font-medium">{u.name}</TableCell>
                        <TableCell className="font-mono text-xs">@{u.username}</TableCell>
                        <TableCell>
                          <Badge className={roleInfo.badge}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {roleInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">{u.subject || '-'}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleToggleActive(u)}
                            title={u.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                          >
                            {u.isActive ? (
                              <ToggleRight className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ToggleLeft className="w-5 h-5 text-slate-400" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleResetPassword(u)}
                              title="Reset Password"
                            >
                              <KeyRound className="w-4 h-4 text-amber-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => { setEditing(u); setShowForm(true) }}
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4 text-slate-600" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Hapus">
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Hapus user "{u.name}"?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    User akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(u.id, u.name)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Ya, Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <UserForm
          editing={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); fetchUsers() }}
        />
      )}
    </div>
  )
}

function UserForm({
  editing, onClose, onSaved,
}: {
  editing: UserRow | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState({
    username: editing?.username ?? '',
    password: '',
    name: editing?.name ?? '',
    role: editing?.role ?? 'guru',
    subject: editing?.subject ?? 'Informatika',
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.username || !form.name) {
      toast.error('Username dan nama wajib diisi')
      return
    }
    if (!editing && !form.password) {
      toast.error('Password wajib diisi untuk user baru')
      return
    }
    if (form.password && form.password.length < 4) {
      toast.error('Password minimal 4 karakter')
      return
    }

    setSaving(true)
    try {
      if (editing) {
        // Edit existing
        const body: Record<string, unknown> = {
          id: editing.id,
          role: form.role,
          subject: form.role === 'bendahara' ? 'Bendahara Sekolah' : form.subject,
        }
        if (form.password) body.password = form.password

        const res = await fetch('/api/teacher/manage', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        toast.success(`User "${form.name}" diperbarui`)
      } else {
        // Create new
        const res = await fetch('/api/teacher/manage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
            name: form.name,
            role: form.role,
            subject: form.role === 'bendahara' ? 'Bendahara Sekolah' : form.subject,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        toast.success(data.message || `User "${form.name}" ditambahkan`)
      }
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-600" />
            {editing ? 'Edit User' : 'Tambah User Baru'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Nama Lengkap *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Contoh: Budi Santoso"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Username *</Label>
              <Input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Contoh: budi_mtk"
                disabled={!!editing}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">{editing ? 'Password Baru (opsional)' : 'Password *'}</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={editing ? 'Kosongkan jika tetap' : 'Min. 4 karakter'}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Role *</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-red-600" /> Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="guru">
                    <div className="flex items-center gap-2">
                      <UserCog className="w-3 h-3 text-blue-600" /> Guru Mapel
                    </div>
                  </SelectItem>
                  <SelectItem value="bendahara">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-3 h-3 text-amber-600" /> Bendahara Sekolah
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.role !== 'bendahara' && (
              <div className="space-y-1">
                <Label className="text-xs">Mata Pelajaran</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Role info */}
          <div className={`p-3 rounded-lg text-xs ${
            form.role === 'admin' ? 'bg-red-50 text-red-800' :
            form.role === 'bendahara' ? 'bg-amber-50 text-amber-800' :
            'bg-blue-50 text-blue-800'
          }`}>
            {form.role === 'admin' && '🔴 Admin: Akses penuh ke semua menu termasuk Manajemen Pengguna.'}
            {form.role === 'guru' && '🔵 Guru: Bisa kelola siswa, tugas, soal, materi, dan nilai.'}
            {form.role === 'bendahara' && '🟡 Bendahara: Akses dashboard guru (hasil & nilai siswa).'}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
