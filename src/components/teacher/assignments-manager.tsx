'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  Plus, Pencil, Trash2, RefreshCw, ToggleLeft, ToggleRight,
  Calendar, FileText, Clock,
} from 'lucide-react'
import { toast } from 'sonner'

interface Assignment {
  id: string
  title: string
  description: string
  targetKelas: string
  isActive: boolean
  dueDate: string | null
  exerciseType: string
  questionCount: number
  taskType: string
  createdAt: string
}

const GRADE_OPTIONS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B']

export function AssignmentsManager() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Assignment | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchAssignments = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/assignments')
      const data = await res.json()
      if (data.success) setAssignments(data.assignments)
    } catch {
      toast.error('Gagal memuat data tugas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssignments()
  }, [])

  const handleToggleActive = async (a: Assignment) => {
    try {
      const res = await fetch(`/api/assignments/${a.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !a.isActive }),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success(`Tugas ${!a.isActive ? 'diaktifkan' : 'dinonaktifkan'}`)
      fetchAssignments()
    } catch {
      toast.error('Gagal mengubah status')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/assignments/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal')
      toast.success('Tugas dihapus')
      fetchAssignments()
    } catch {
      toast.error('Gagal menghapus tugas')
    }
  }

  const formatTargetKelas = (target: string) => {
    if (target === 'ALL') return 'Semua Kelas'
    return target.split(',').map((k) => `Kelas ${k.trim()}`).join(', ')
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">Tugas Latihan</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchAssignments} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => { setEditing(null); setShowForm(true) }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Buat Tugas
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Tugas yang aktif akan muncul di dashboard siswa. Siswa hanya bisa mulai latihan jika ada tugas aktif untuk kelasnya.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              Memuat...
            </div>
          ) : assignments.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="font-medium">Belum ada tugas</p>
              <p className="text-xs mt-1">Klik "Buat Tugas" untuk menerbitkan latihan</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {assignments.map((a, i) => (
                <div
                  key={a.id}
                  className={`p-3 border rounded-lg ${a.isActive ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-70'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                        {a.isActive ? (
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">Aktif</Badge>
                        ) : (
                          <Badge className="bg-slate-200 text-slate-600 text-xs">Nonaktif</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {formatTargetKelas(a.targetKelas)}
                        </Badge>
                        {a.dueDate && (
                          <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(a.dueDate).toLocaleDateString('id-ID')}
                          </Badge>
                        )}
                      </div>
                      <p className="font-semibold text-slate-900">{a.title}</p>
                      {a.description && (
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{a.description}</p>
                      )}
                      <p className="text-xs text-slate-400 mt-1">
                        Dibuat: {new Date(a.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleToggleActive(a)}
                        title={a.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      >
                        {a.isActive ? (
                          <ToggleRight className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-slate-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => { setEditing(a); setShowForm(true) }}
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
                            <AlertDialogTitle>Hapus tugas ini?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tugas "{a.title}" akan dihapus permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(a.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Ya, Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <AssignmentForm
          assignment={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); fetchAssignments() }}
        />
      )}
    </div>
  )
}

function AssignmentForm({
  assignment, onClose, onSaved,
}: {
  assignment: Assignment | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState({
    title: assignment?.title ?? '',
    description: assignment?.description ?? '',
    targetKelas: assignment?.targetKelas ?? 'ALL',
    dueDate: assignment?.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 10) : '',
    isActive: assignment?.isActive ?? true,
    exerciseType: assignment?.exerciseType ?? 'wajib',
    questionCount: assignment?.questionCount ?? 0,
    taskType: assignment?.taskType ?? 'typing_quiz',
  })
  const [saving, setSaving] = useState(false)
  const [selectedKelas, setSelectedKelas] = useState<string[]>(
    assignment?.targetKelas && assignment.targetKelas !== 'ALL'
      ? assignment.targetKelas.split(',').map((k) => k.trim())
      : []
  )

  const handleSave = async () => {
    if (!form.title) {
      toast.error('Judul wajib diisi')
      return
    }
    setSaving(true)
    try {
      const targetKelas = form.targetKelas === 'ALL' ? 'ALL' : selectedKelas.join(',')
      const body = {
        title: form.title,
        description: form.description,
        targetKelas,
        dueDate: form.dueDate || null,
        isActive: form.isActive,
        exerciseType: form.exerciseType,
        questionCount: parseInt(String(form.questionCount)) || 0,
        taskType: form.taskType,
      }
      if (assignment) {
        const res = await fetch(`/api/assignments/${assignment.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Gagal')
        toast.success('Tugas diperbarui')
      } else {
        const res = await fetch('/api/assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Gagal')
        toast.success('Tugas dibuat')
      }
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan')
    } finally {
      setSaving(false)
    }
  }

  const toggleKelas = (k: string) => {
    setSelectedKelas((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    )
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{assignment ? 'Edit Tugas' : 'Buat Tugas Latihan Baru'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Judul Tugas *</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Contoh: Latihan Minggu 1"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Deskripsi (opsional)</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="Petunjuk untuk siswa..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Target Kelas</Label>
            <Select
              value={form.targetKelas === 'ALL' ? 'ALL' : 'CUSTOM'}
              onValueChange={(v) => setForm({ ...form, targetKelas: v })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Kelas</SelectItem>
                <SelectItem value="CUSTOM">Pilih Kelas Tertentu</SelectItem>
              </SelectContent>
            </Select>
            {form.targetKelas === 'CUSTOM' && (
              <div className="flex flex-wrap gap-2 mt-2">
                {GRADE_OPTIONS.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggleKelas(k)}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      selectedKelas.includes(k)
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Deadline (opsional)</Label>
            <Input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>

          {/* Jenis Latihan */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Jenis Latihan</Label>
              <Select value={form.exerciseType} onValueChange={(v) => setForm({ ...form, exerciseType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="wajib">Wajib (sekali, butuh izin ulang)</SelectItem>
                  <SelectItem value="persiapan">Persiapan (bisa dikerjakan ulang)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Jenis Tugas</Label>
              <Select value={form.taskType} onValueChange={(v) => setForm({ ...form, taskType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="typing_quiz">Mengetik + Soal HOTS</SelectItem>
                  <SelectItem value="quiz_only">Soal HOTS Saja</SelectItem>
                  <SelectItem value="typing_only">Mengetik Saja</SelectItem>
                  <SelectItem value="game">Game Interaktif (Benar/Salah)</SelectItem>
                  <SelectItem value="drawing">Tugas Menggambar / Peta Konsep</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Jumlah Soal */}
          <div className="space-y-1">
            <Label className="text-xs">Jumlah Soal (0 = semua soal aktif)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={form.questionCount}
              onChange={(e) => setForm({ ...form, questionCount: parseInt(e.target.value) || 0 })}
              placeholder="0 = gunakan semua soal"
            />
            <p className="text-xs text-slate-400">Isi 0 untuk menggunakan semua soal aktif, atau isi angka tertentu (mis: 10) untuk memilih 10 soal acak.</p>
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
              Tugas aktif (siswa bisa melihat & mengerjakan)
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
