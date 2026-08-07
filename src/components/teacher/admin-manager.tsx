'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, RefreshCw, Shield, UserCog, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { toast } from 'sonner'

interface TeacherRow { id: string; username: string; name: string; role: string; subject: string; isActive: boolean; createdAt: string }

const SUBJECTS = ['Informatika', 'Matematika', 'IPA', 'IPS', 'Bahasa Indonesia', 'Bahasa Inggris', 'PKn', 'Seni Budaya', 'PJOK', 'Prakarya', 'Lainnya']

export function AdminManager() {
  const [teachers, setTeachers] = useState<TeacherRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchTeachers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/teacher/manage')
      const data = await res.json()
      if (data.success) setTeachers(data.teachers)
    } catch { toast.error('Gagal memuat data guru') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchTeachers() }, [])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="w-4 h-4 text-red-600" /> Manajemen Guru & Mapel
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchTeachers} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-1" /> Tambah Guru
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Admin bisa menambah guru mapel lain, mengatur role, dan mengaktifkan/menonaktifkan akun guru.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400"><RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />Memuat...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Guru</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Mapel</TableHead>
                    <TableHead className="text-center">Role</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((t) => (
                    <TableRow key={t.id} className={t.isActive ? '' : 'opacity-50'}>
                      <TableCell className="font-medium">{t.name}</TableCell>
                      <TableCell className="font-mono text-xs">{t.username}</TableCell>
                      <TableCell><Badge variant="outline">{t.subject}</Badge></TableCell>
                      <TableCell className="text-center">
                        {t.role === 'admin' ? (
                          <Badge className="bg-red-100 text-red-700"><Shield className="w-3 h-3 mr-1" />Admin</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-700"><UserCog className="w-3 h-3 mr-1" />Guru</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={t.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}>
                          {t.isActive ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && <AddTeacherForm onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); fetchTeachers() }} />}
    </div>
  )
}

function AddTeacherForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ username: '', password: '', name: '', role: 'teacher', subject: 'Informatika' })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.username || !form.password || !form.name) { toast.error('Semua field wajib diisi'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/teacher/manage', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success(`Guru ${form.name} (${form.subject}) ditambahkan`)
      onSaved()
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Gagal') }
    finally { setSaving(false) }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="flex items-center gap-2"><Shield className="w-4 h-4 text-red-600" />Tambah Guru Baru</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1"><Label className="text-xs">Nama Lengkap *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label className="text-xs">Username *</Label><Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">Password *</Label><Input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="teacher">Guru Mapel</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Mata Pelajaran</Label>
              <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
