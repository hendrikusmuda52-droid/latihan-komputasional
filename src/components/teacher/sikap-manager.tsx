'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, RefreshCw, ClipboardList, User, AlertCircle } from 'lucide-react'
import { ALL_GRADES } from '@/lib/constants'
import { useResilientFetch } from '@/lib/use-resilient-fetch'

interface Student {
  id: string
  namaLengkap: string
  nisn: string
  kelas: string
}

interface SikapRecord {
  id: string
  tanggal: string
  studentId: string
  student?: { namaLengkap: string; nisn: string; kelas: string } | null
  kelas: string
  kategori: string
  deskripsi: string
  tindakLanjut: string | null
}

interface FormState {
  tanggal: string
  studentId: string
  kelas: string
  kategori: string
  deskripsi: string
  tindakLanjut: string
}

const SAFE_GRADES = (ALL_GRADES || []) as readonly string[]
const NONE = '__none__'

const KATEGORI_OPTIONS: { value: string; label: string }[] = [
  { value: 'Spiritual', label: 'Spiritual' },
  { value: 'Sosial', label: 'Sosial' },
  { value: 'ProfilPelajarPancasila', label: 'Profil Pelajar Pancasila' },
]

function todayStr(): string {
  const d = new Date()
  const tz = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tz).toISOString().split('T')[0]
}

const truncate = (s: string | null | undefined, n: number) =>
  !s ? '-' : s.length > n ? s.slice(0, n) + '…' : s

const kategoriBadge = (k: string): string => {
  switch (k) {
    case 'Spiritual':
      return 'bg-purple-100 text-purple-700'
    case 'Sosial':
      return 'bg-blue-100 text-blue-700'
    case 'ProfilPelajarPancasila':
      return 'bg-emerald-100 text-emerald-700'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}

const kategoriLabel = (k: string): string =>
  KATEGORI_OPTIONS.find((o) => o.value === k)?.label || k

const emptyForm = (): FormState => ({
  tanggal: todayStr(),
  studentId: NONE,
  kelas: NONE,
  kategori: 'Spiritual',
  deskripsi: '',
  tindakLanjut: '',
})

export function CatatanSikapManager() {
  const [kelas, setKelas] = useState<string>(NONE)

  // ── RESILIENT FETCH: records list (filtered by kelas) ──
  const recordsUrl = kelas && kelas !== NONE
    ? `/api/sikap?kelas=${encodeURIComponent(kelas)}`
    : '/api/sikap'
  const { data: recordsData, loading, error, refetch, retryCount } = useResilientFetch<{
    success: boolean
    records: SikapRecord[]
  }>(recordsUrl, { deps: [kelas] })

  const records = recordsData?.records ?? []
  const fetchRecords = useCallback(() => { refetch() }, [refetch])

  const [students, setStudents] = useState<Student[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<SikapRecord | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm())
  const [saving, setSaving] = useState(false)

  // ── Fetch students for a kelas (used by the form — kept manual since it's form-triggered) ──
  const fetchStudents = useCallback(async (k: string) => {
    if (!k || k === NONE) {
      setStudents([])
      return
    }
    const data = await fetch(`/api/teacher/students?kelas=${encodeURIComponent(k)}`)
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    let list: Student[] = []
    if (data?.success && Array.isArray(data.students)) list = data.students
    else if (Array.isArray(data?.students)) list = data.students
    else if (Array.isArray(data)) list = data
    setStudents(list)
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm())
    setStudents([])
    setShowForm(true)
  }

  const openEdit = (rec: SikapRecord) => {
    setEditing(rec)
    const recKelas = rec.kelas || rec.student?.kelas || NONE
    setForm({
      tanggal: rec.tanggal ? rec.tanggal.split('T')[0] : todayStr(),
      studentId: rec.studentId || NONE,
      kelas: recKelas,
      kategori: rec.kategori || 'Spiritual',
      deskripsi: rec.deskripsi || '',
      tindakLanjut: rec.tindakLanjut || '',
    })
    if (recKelas && recKelas !== NONE) fetchStudents(recKelas)
    setShowForm(true)
  }

  const handleKelasChange = (k: string) => {
    // Reset student selection when kelas changes; re-fetch students
    setForm((f) => ({ ...f, kelas: k, studentId: NONE }))
    fetchStudents(k)
  }

  const handleSubmit = async () => {
    if (!form.deskripsi.trim()) {
      toast.error('Deskripsi kejadian wajib diisi')
      return
    }
    if (!form.studentId || form.studentId === NONE) {
      toast.error('Pilih siswa terlebih dahulu')
      return
    }
    setSaving(true)
    const body = {
      tanggal: form.tanggal,
      studentId: form.studentId,
      kelas: form.kelas === NONE ? null : form.kelas,
      kategori: form.kategori,
      deskripsi: form.deskripsi,
      tindakLanjut: form.tindakLanjut,
    }
    const url = editing ? `/api/sikap/${editing.id}` : '/api/sikap'
    const method = editing ? 'PUT' : 'POST'
    const data = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    setSaving(false)
    if (data?.success) {
      toast.success(editing ? 'Catatan diperbarui' : 'Catatan ditambahkan')
      setShowForm(false)
      fetchRecords()
    } else {
      toast.error(data?.error || 'Gagal menyimpan catatan')
    }
  }

  const handleDelete = async (id: string) => {
    const data = await fetch(`/api/sikap/${id}`, { method: 'DELETE' })
      .then((r) => r.json())
      .catch(() => ({ success: false }))
    if (data?.success) {
      toast.success('Catatan dihapus')
      fetchRecords()
    } else {
      toast.error(data?.error || 'Gagal menghapus catatan')
    }
  }

  return (
    <div className="space-y-4">
      {/* ── Top Card: Title + Add Button + Kelas Filter ── */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Catatan Kelakuan / Sikap Siswa
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchRecords()}
                disabled={loading}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button size="sm" onClick={openAdd}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Tambah Catatan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1 text-sm">
                <User className="w-3.5 h-3.5" /> Filter Kelas
              </Label>
              <Select value={kelas} onValueChange={setKelas}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Semua Kelas</SelectItem>
                  {SAFE_GRADES.map((g) => (
                    <SelectItem key={g} value={g}>
                      Kelas {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Records Table ── */}
      <Card>
        <CardContent className="pt-4">
          {/* ── LOADING STATE ── */}
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat data catatan sikap...</p>
              {retryCount > 0 && (
                <p className="text-xs mt-1 text-amber-600">Mencoba ulang ({retryCount}/2)...</p>
              )}
            </div>
          ) : /* ── ERROR STATE ── */
          error ? (
            <div className="py-12 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
              <p className="font-medium text-red-600 mb-1">Gagal memuat data</p>
              <p className="text-xs text-slate-500 mb-3">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchRecords}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Coba Muat Ulang
              </Button>
            </div>
          ) : /* ── EMPTY STATE ── */
          records.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">
              Belum ada catatan sikap {kelas !== NONE ? `untuk kelas ${kelas}` : ''}
            </p>
          ) : (
            <div className="max-h-96 overflow-y-auto border rounded-md">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead className="w-28">Tanggal</TableHead>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead className="w-28">NISN</TableHead>
                    <TableHead className="w-20">Kelas</TableHead>
                    <TableHead className="w-36">Kategori</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead className="w-44">Tindak Lanjut</TableHead>
                    <TableHead className="w-20 text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((rec) => (
                    <TableRow key={rec.id}>
                      <TableCell className="text-xs whitespace-nowrap">
                        {rec.tanggal ? rec.tanggal.split('T')[0] : '-'}
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {rec.student?.namaLengkap || '-'}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        {rec.student?.nisn || '-'}
                      </TableCell>
                      <TableCell className="text-xs">
                        {rec.kelas || rec.student?.kelas || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge className={kategoriBadge(rec.kategori)}>
                          {kategoriLabel(rec.kategori)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-700" title={rec.deskripsi}>
                        {truncate(rec.deskripsi, 60)}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        {rec.tindakLanjut || '-'}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => openEdit(rec)}
                            title="Edit catatan"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                                title="Hapus catatan"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus catatan ini?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Catatan sikap untuk{' '}
                                  <b>{rec.student?.namaLengkap || 'siswa ini'}</b> akan
                                  dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(rec.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Hapus
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

      {/* ── Add/Edit Dialog ── */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Edit Catatan Sikap' : 'Tambah Catatan Sikap'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm">Tanggal</Label>
                <Input
                  type="date"
                  value={form.tanggal}
                  onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Kelas</Label>
                <Select value={form.kelas} onValueChange={handleKelasChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {SAFE_GRADES.map((g) => (
                      <SelectItem key={g} value={g}>
                        Kelas {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Siswa</Label>
              <Select
                value={form.studentId}
                onValueChange={(v) => setForm({ ...form, studentId: v })}
                disabled={
                  !form.kelas || form.kelas === NONE || students.length === 0
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Siswa" />
                </SelectTrigger>
                <SelectContent>
                  {students.length === 0 ? (
                    <SelectItem value={NONE} disabled>
                      {form.kelas === NONE ? 'Pilih kelas dulu' : 'Belum ada siswa'}
                    </SelectItem>
                  ) : (
                    students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.namaLengkap} ({s.nisn || '-'})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Kategori</Label>
              <Select
                value={form.kategori}
                onValueChange={(v) => setForm({ ...form, kategori: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {KATEGORI_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">
                Deskripsi Kejadian <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                placeholder="Jelaskan kejadian / perilaku siswa yang teramati..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Tindak Lanjut</Label>
              <Input
                value={form.tindakLanjut}
                onChange={(e) =>
                  setForm({ ...form, tindakLanjut: e.target.value })
                }
                placeholder="Sudah ditegur / Diteruskan ke Wali Kelas"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={saving}>
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <Plus className="w-4 h-4 mr-1" />
              )}
              {editing ? 'Perbarui' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CatatanSikapManager
