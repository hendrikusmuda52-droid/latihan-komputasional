'use client'

import { useEffect, useState, useRef } from 'react'
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
  CheckCircle2, XCircle, Upload, Download, FileSpreadsheet, AlertCircle,
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

const GRADE_OPTIONS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '11DKV', '12DKV']

export function StudentsManager() {
  const [students, setStudents] = useState<StudentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filterKelas, setFilterKelas] = useState('ALL')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<StudentRow | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showImport, setShowImport] = useState(false)

  const handleDownloadTemplate = () => {
    const link = document.createElement('a')
    link.href = '/api/teacher/students/template'
    link.download = 'template-import-siswa.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Template diunduh. Isi sesuai panduan di sheet "Panduan".')
  }

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
                variant="outline"
                size="sm"
                onClick={handleDownloadTemplate}
                title="Download template Excel"
              >
                <Download className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Template</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImport(true)}
              >
                <Upload className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Import</span>
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

      {showImport && (
        <ImportStudentsDialog
          onClose={() => setShowImport(false)}
          onImported={() => { setShowImport(false); fetchStudents() }}
        />
      )}
    </div>
  )
}

function ImportStudentsDialog({
  onClose,
  onImported,
}: {
  onClose: () => void
  onImported: () => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreview(null)
    }
  }

  const handlePreview = async () => {
    if (!selectedFile) {
      toast.error('Pilih file dulu')
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const res = await fetch('/api/teacher/students/import?mode=preview', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')
      setPreview(data)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal parse file')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!selectedFile) return
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const res = await fetch('/api/teacher/students/import?mode=save', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal import')
      toast.success(data.message || 'Import berhasil')
      onImported()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal import')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            Import Data Siswa dari Excel/CSV
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Step 1: Download template */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Langkah 1: Download Template
            </p>
            <p className="text-xs text-blue-700 mb-3">
              Unduh template Excel, isi data siswa sesuai format di sheet "Siswa". Baca panduan di sheet "Panduan".
            </p>
            <Button
              size="sm"
              variant="outline"
              className="bg-white"
              onClick={() => {
                const link = document.createElement('a')
                link.href = '/api/teacher/students/template'
                link.download = 'template-import-siswa.xlsx'
                link.click()
              }}
            >
              <Download className="w-4 h-4 mr-1" />
              Download Template Excel
            </Button>
          </div>

          {/* Step 2: Upload file */}
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-2">
              Langkah 2: Upload File
            </p>
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                <Upload className="w-4 h-4 mr-1" />
                Pilih File
              </Button>
              <span className="text-xs text-slate-600 flex-1 truncate">
                {selectedFile ? selectedFile.name : 'Belum ada file dipilih'}
              </span>
              <Button
                size="sm"
                onClick={handlePreview}
                disabled={!selectedFile || loading}
                className="bg-slate-700 hover:bg-slate-800"
              >
                {loading ? 'Memproses...' : 'Preview'}
              </Button>
            </div>
          </div>

          {/* Step 3: Preview hasil */}
          {preview && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-100 rounded p-3 text-center">
                  <p className="text-2xl font-bold text-slate-900">{preview.totalRows}</p>
                  <p className="text-xs text-slate-500">Total Baris</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{preview.validCount}</p>
                  <p className="text-xs text-emerald-700">Siswa Valid</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded p-3 text-center">
                  <p className="text-2xl font-bold text-red-600">{preview.invalidCount}</p>
                  <p className="text-xs text-red-700">Baris Error</p>
                </div>
              </div>

              {preview.invalidCount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-h-[200px] overflow-y-auto">
                  <p className="text-xs font-semibold text-red-800 mb-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Baris dengan error ({preview.invalid.length}):
                  </p>
                  <div className="space-y-1">
                    {preview.invalid.map((row: any, i: number) => (
                      <div key={i} className="text-xs text-red-700">
                        <strong>Baris {row.rowNumber}:</strong> {row.errors.join('; ')}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {preview.validCount > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 max-h-[300px] overflow-y-auto">
                  <p className="text-xs font-semibold text-emerald-800 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Preview Siswa Valid ({preview.valid.length}):
                  </p>
                  <div className="space-y-1.5">
                    {preview.valid.slice(0, 15).map((row: any, i: number) => (
                      <div key={i} className="text-xs border-l-2 border-emerald-400 pl-2 py-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{row.namaLengkap}</span>
                          <Badge variant="outline" className="text-xs">{row.kelas}</Badge>
                          <span className="text-slate-500">NISN: {row.nisn}</span>
                        </div>
                      </div>
                    ))}
                    {preview.valid.length > 15 && (
                      <p className="text-xs text-slate-500 italic mt-1">
                        ... dan {preview.valid.length - 15} siswa lainnya
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button
            onClick={handleSave}
            disabled={!preview || preview.validCount === 0 || saving}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {saving ? 'Menyimpan...' : `Import ${preview?.validCount || 0} Siswa`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
    kelas: student?.kelas ?? '7A',
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
