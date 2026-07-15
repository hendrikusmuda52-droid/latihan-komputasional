'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Plus, Pencil, Trash2, RefreshCw, KeyRound, ToggleLeft, ToggleRight,
  CheckCircle2, XCircle, Upload,
} from 'lucide-react'
import { toast } from 'sonner'

interface StudentRow {
  id: string
  namaLengkap: string
  nisn: string
  kelas: string
  sekolah: string
  jenisKelamin: string
  hasPassword: boolean
  isActive: boolean
  resultCount: number
  createdAt: string
}

const GRADE_OPTIONS = ['8A', '8B', '8C', '9A', '9B']

export function StudentsManager() {
  const [students, setStudents] = useState<StudentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filterKelas, setFilterKelas] = useState('ALL')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<StudentRow | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/teacher/students?kelas=${filterKelas}`)
      const data = await res.json()
      if (data.success) setStudents(data.students)
    } catch {
      toast.error('Gagal memuat data siswa')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKelas])

  const handleToggleActive = async (s: StudentRow) => {
    try {
      const res = await fetch(`/api/teacher/students/${s.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !s.isActive }),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success(`Siswa ${!s.isActive ? 'diaktifkan' : 'dinonaktifkan'}`)
      fetchStudents()
    } catch {
      toast.error('Gagal mengubah status')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/teacher/students/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal')
      toast.success('Siswa dihapus')
      fetchStudents()
    } catch {
      toast.error('Gagal menghapus siswa')
    }
  }

  const filtered = students.filter((s) =>
    !search ||
    s.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
    s.nisn.includes(search)
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">Manajemen Siswa</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Input
                placeholder="Cari nama/NISN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48"
              />
              <Select value={filterKelas} onValueChange={setFilterKelas}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Semua</SelectItem>
                  {GRADE_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>Kelas {g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchStudents} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => { setEditing(null); setShowForm(true) }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Tambah Siswa
              </Button>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Total: <strong>{students.length}</strong> siswa •
            Aktif: <strong className="text-emerald-600">{students.filter(s => s.isActive).length}</strong> •
            Nonaktif: <strong className="text-slate-400">{students.filter(s => !s.isActive).length}</strong>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              Memuat...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <p className="font-medium">Belum ada siswa</p>
              <p className="text-xs mt-1">Klik "Tambah Siswa" untuk membuat akun</p>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>NISN</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-center">Password</TableHead>
                    <TableHead className="text-center">Latihan</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.id} className={s.isActive ? '' : 'opacity-50'}>
                      <TableCell>
                        <div className="font-medium text-slate-900">{s.namaLengkap}</div>
                        <div className="text-xs text-slate-500">{s.sekolah}</div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{s.nisn}</TableCell>
                      <TableCell><Badge variant="outline">{s.kelas}</Badge></TableCell>
                      <TableCell className="text-center">
                        {s.hasPassword ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-amber-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center text-sm">{s.resultCount}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleToggleActive(s)}
                          title={s.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          {s.isActive ? (
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
                            onClick={() => { setEditing(s); setShowForm(true) }}
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
                                <AlertDialogTitle>Hapus siswa ini?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Siswa "{s.namaLengkap}" ({s.nisn}) akan dihapus permanen
                                  beserta semua data latihan & progress-nya.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(s.id)}
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
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <StudentForm
          student={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); fetchStudents() }}
        />
      )}
    </div>
  )
}

function StudentForm({
  student, onClose, onSaved,
}: {
  student: StudentRow | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState({
    namaLengkap: student?.namaLengkap ?? '',
    nisn: student?.nisn ?? '',
    password: '',
    kelas: student?.kelas ?? '8A',
    sekolah: student?.sekolah ?? '',
    jenisKelamin: student?.jenisKelamin ?? 'Laki-laki',
    isActive: student?.isActive ?? true,
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!form.namaLengkap || !form.nisn || !form.kelas || !form.sekolah) {
      toast.error('Semua field wajib diisi')
      return
    }
    setSaving(true)
    try {
      if (student) {
        // Edit existing
        const body: Record<string, unknown> = {
          namaLengkap: form.namaLengkap,
          nisn: form.nisn,
          kelas: form.kelas,
          sekolah: form.sekolah,
          jenisKelamin: form.jenisKelamin,
          isActive: form.isActive,
        }
        if (form.password) body.password = form.password
        const res = await fetch(`/api/teacher/students/${student.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Gagal')
        toast.success('Siswa diperbarui')
      } else {
        // Create new
        const res = await fetch('/api/teacher/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Gagal')
        toast.success('Siswa ditambahkan')
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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student ? 'Edit Siswa' : 'Tambah Siswa Baru'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Nama Lengkap *</Label>
            <Input
              value={form.namaLengkap}
              onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">NISN *</Label>
              <Input
                value={form.nisn}
                onChange={(e) => setForm({ ...form, nisn: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Kelas *</Label>
              <Select value={form.kelas} onValueChange={(v) => setForm({ ...form, kelas: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {GRADE_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>Kelas {g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Asal Sekolah *</Label>
            <Input
              value={form.sekolah}
              onChange={(e) => setForm({ ...form, sekolah: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Jenis Kelamin</Label>
              <Select value={form.jenisKelamin} onValueChange={(v) => setForm({ ...form, jenisKelamin: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">
                Password {student ? '(kosongkan jika tetap)' : '*'}
              </Label>
              <Input
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={student ? '•••••• (tidak berubah)' : 'Set password siswa'}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="isActive" className="text-sm cursor-pointer">
              Akun aktif (siswa bisa login)
            </Label>
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
