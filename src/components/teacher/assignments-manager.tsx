'use client'

import { useEffect, useState, useMemo } from 'react'
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
  FileText, Clock, BookOpen, Layers,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  getTaskTypesForCategory,
  TASK_CATEGORIES,
  TAHUN_AJARAN_OPTIONS,
  SEMESTER_OPTIONS,
} from '@/lib/constants'

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
  // v2 fields
  cpId?: string | null
  tpId?: string | null
  taskCategory?: string | null
  taskTypeName?: string | null
  tahunAjaran?: string | null
  semester?: string | null
  duration?: number
  subject?: string | null
  // joined display fields (optional — returned by API)
  cpKode?: string | null
  cpDeskripsi?: string | null
  tpKode?: string | null
  tpDeskripsi?: string | null
}

interface CP {
  id: string
  kodeCP: string
  deskripsi: string
  gradeLevel: string
}

interface TP {
  id: string
  kodeTP: string
  deskripsi: string
  cpId: string
}

const GRADE_OPTIONS = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '11DKV', '12DKV']

const truncate = (s: string | null | undefined, n: number) =>
  !s ? '' : s.length > n ? s.slice(0, n) + '…' : s

const NONE = '__none__'

// Extract grade tier from kelas code: "8A" → "8", "11DKV" → "11DKV"
function kelasToGradeTier(kelas: string): string {
  if (!kelas) return ''
  if (kelas.startsWith('11')) return '11DKV'
  if (kelas.startsWith('12')) return '12DKV'
  return kelas.charAt(0)
}

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
      if (data.success) setAssignments(data.assignments || [])
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
    if (!target || target === 'ALL') return 'Semua Kelas'
    return target.split(',').map((k) => `Kelas ${k.trim()}`).join(', ')
  }

  const categoryLabel = (val?: string | null) =>
    TASK_CATEGORIES.find((c) => c.value === val)?.label ?? val ?? '—'

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
              <p className="text-xs mt-1">Klik &quot;Buat Tugas&quot; untuk menerbitkan latihan</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
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
                        {a.taskCategory && (
                          <Badge variant="outline" className="text-xs bg-violet-50 text-violet-700">
                            {categoryLabel(a.taskCategory)}
                          </Badge>
                        )}
                        {a.tahunAjaran && (
                          <Badge variant="outline" className="text-xs">
                            {a.tahunAjaran} · {a.semester ?? ''}
                          </Badge>
                        )}
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
                      {(a.cpKode || a.tpKode) && (
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
                          {a.cpKode && (
                            <span className="inline-flex items-center gap-1" title={a.cpDeskripsi ?? undefined}>
                              <BookOpen className="w-3 h-3" />
                              CP: {a.cpKode}
                              {a.cpDeskripsi ? ` — ${truncate(a.cpDeskripsi, 40)}` : ''}
                            </span>
                          )}
                          {a.tpKode && (
                            <span className="inline-flex items-center gap-1" title={a.tpDeskripsi ?? undefined}>
                              <Layers className="w-3 h-3" />
                              TP: {a.tpKode}
                              {a.tpDeskripsi ? ` — ${truncate(a.tpDeskripsi, 30)}` : ''}
                            </span>
                          )}
                        </div>
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
                              Tugas &quot;{a.title}&quot; akan dihapus permanen.
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
  // ── Bug #12 fix: fetch teacher's real subject from JWT (not hardcoded) ──
  // Used by getTaskTypesForCategory() to show the correct task type options
  // for the teacher's subject (e.g., typing options only for Informatika/KKA).
  const [teacherSubject, setTeacherSubject] = useState<string>('Informatika')
  useEffect(() => {
    fetch('/api/teacher/session')
      .then((r) => r.json())
      .then((data) => {
        if (data?.authenticated && data?.teacher?.subject) {
          setTeacherSubject(data.teacher.subject)
        }
      })
      .catch(() => {
        // Keep default 'Informatika' on error — task type options will still render
      })
  }, [])

  const [form, setForm] = useState({
    title: assignment?.title ?? '',
    description: assignment?.description ?? '',
    targetKelas: assignment?.targetKelas ?? 'ALL',
    dueDate: assignment?.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 10) : '',
    isActive: assignment?.isActive ?? true,
    exerciseType: assignment?.exerciseType ?? 'wajib',
    questionCount: assignment?.questionCount ?? 0,
    taskType: assignment?.taskType ?? 'quiz_only',
    // v2 fields
    cpId: assignment?.cpId ?? '',
    tpId: assignment?.tpId ?? '',
    taskCategory: assignment?.taskCategory ?? 'luring',
    taskTypeName: assignment?.taskTypeName ?? '',
    tahunAjaran: assignment?.tahunAjaran ?? '2026/2027',
    semester: assignment?.semester ?? 'ganjil',
    // ── FIX #2: Duration field (minutes) ──
    duration: assignment?.duration ?? 0,
    // ── FIX: subject field for multi-mapel support ──
    subject: assignment?.subject ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [selectedKelas, setSelectedKelas] = useState<string[]>(
    assignment?.targetKelas && assignment.targetKelas !== 'ALL'
      ? assignment.targetKelas.split(',').map((k) => k.trim())
      : []
  )

  // ── CP / TP cascading dropdowns ──
  const [cpList, setCpList] = useState<CP[]>([])
  const [tpList, setTpList] = useState<TP[]>([])
  const [loadingCp, setLoadingCp] = useState(false)
  const [loadingTp, setLoadingTp] = useState(false)

  // ── FIX: Dynamic CP fetch — triggered by selectedKelas + form.subject ──
  // Old code fetched ALL CPs once on mount and filtered client-side.
  // That didn't work for multi-mapel because API returned only JWT subject CPs.
  // Now we fetch with explicit subject + grade params so API returns
  // CPs for the selected subject (e.g., "Mapel Kejuruan" for 11DKV).
  const effectiveSubject = form.subject || 'Informatika'
  const effectiveGrade = selectedKelas.length === 1
    ? kelasToGradeTier(selectedKelas[0])
    : ''

  useEffect(() => {
    // Don't fetch if subject or grade not yet determined
    if (!effectiveSubject || !effectiveGrade) {
      setCpList([])
      return
    }
    let cancelled = false
    setLoadingCp(true)
    setCpList([])
    const params = new URLSearchParams()
    params.set('subject', effectiveSubject)
    params.set('grade', effectiveGrade)
    fetch(`/api/cp?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data?.success && Array.isArray(data.cps)) {
          setCpList(data.cps)
        } else {
          setCpList([])
        }
      })
      .catch(() => { if (!cancelled) setCpList([]) })
      .finally(() => { if (!cancelled) setLoadingCp(false) })
    return () => { cancelled = true }
  }, [effectiveSubject, effectiveGrade])

  // Fetch TPs when CP changes
  useEffect(() => {
    if (!form.cpId) {
      setTpList([])
      return
    }
    let cancelled = false
    const fetchTps = async () => {
      setLoadingTp(true)
      try {
        const res = await fetch(`/api/tp?cpId=${encodeURIComponent(form.cpId)}`)
        const data = await res.json()
        if (cancelled) return
        const list = data.success ? data.tps : Array.isArray(data) ? data : []
        setTpList(list || [])
      } catch {
        if (!cancelled) setTpList([])
      } finally {
        if (!cancelled) setLoadingTp(false)
      }
    }
    fetchTps()
    return () => { cancelled = true }
  }, [form.cpId])

  // Available task types based on category + teacher's real subject (from JWT)
  const taskTypeOptions = getTaskTypesForCategory(form.taskCategory, teacherSubject)

  // ── CPs are now fetched server-side filtered by subject + grade ──
  // No more client-side filtering needed — cpList is already correct.
  const filteredCps = cpList

  // ── FIX #2: Live stock check — fetch available question count by CP/TP ──
  // When taskType is quiz_only or typing_quiz AND CP is selected,
  // fetch the count of active questions matching the CP/TP filter.
  // Show warning if questionCount > available stock.
  //
  // ── FIX Bug "Tidak ada soal di Bank Soal" ──
  // Sebelumnya, fetch HANYA mengirim cpId+tpId — TANPA grade & subject.
  // Backend jatuh ke teacherSubject dari JWT (default "Informatika"),
  // padahal user mungkin pilih mapel lain (mis: "Mata Pelajaran Kejuruan").
  // Akibatnya, query count selalu 0 → muncul false warning.
  //
  // Sekarang: kirim grade (effectiveGrade) + subject (effectiveSubject)
  // eksplisit, plus `cache: 'no-store'` agar browser selalu ambil data
  // segar dari server (tidak pakai cache Next.js / browser).
  const [stockInfo, setStockInfo] = useState<{
    available: number
    loading: boolean
    withoutCp?: number | null
    params?: { grade?: string; subject?: string; cpId?: string; tpId?: string }
  } | null>(null)
  const needsQuizQuestions = form.taskType === 'quiz_only' || form.taskType === 'typing_quiz'
  useEffect(() => {
    if (!needsQuizQuestions || !form.cpId || form.cpId === NONE) {
      setStockInfo(null)
      return
    }
    setStockInfo({ available: 0, loading: true })
    const params = new URLSearchParams({ cpId: form.cpId })
    if (form.tpId && form.tpId !== NONE) params.set('tpId', form.tpId)
    // ── FIX: Kirim grade + subject eksplisit agar backend query akurat ──
    if (effectiveGrade) params.set('grade', effectiveGrade)
    if (effectiveSubject) params.set('subject', effectiveSubject)
    // Use the questions API with stock-check mode (count only)
    fetch(`/api/questions?${params.toString()}&stockCheck=1`, {
      cache: 'no-store',  // FIX: bypass Next.js Data Cache & browser cache
    })
      .then((r) => r.json())
      .then((data) => {
        setStockInfo({
          available: data?.stockCount ?? 0,
          loading: false,
          withoutCp: data?.stockCountWithoutCp ?? null,
          params: data?.params,
        })
      })
      .catch(() => setStockInfo({ available: 0, loading: false }))
  }, [form.cpId, form.tpId, form.taskType, needsQuizQuestions, effectiveGrade, effectiveSubject])

  const stockWarning = stockInfo && !stockInfo.loading && form.questionCount > 0 && form.questionCount > stockInfo.available
    ? `Stok soal untuk CP/TP ini hanya ${stockInfo.available} soal. Jumlah soal akan disesuaikan otomatis.`
    : null

  // Reset taskType if it's not valid for the current category
  useEffect(() => {
    if (!taskTypeOptions.some((t) => t.value === form.taskType)) {
      setForm((f) => ({ ...f, taskType: 'quiz_only' }))
    }
    // taskTypeOptions is derived from form.taskCategory (constant subject) — safe to omit
  }, [form.taskCategory])

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error('Judul wajib diisi')
      return
    }
    if (form.targetKelas === 'CUSTOM' && selectedKelas.length === 0) {
      toast.error('Pilih minimal 1 kelas (atau ubah ke "Semua Kelas")')
      return
    }
    if (form.taskType === 'manual' && !form.taskTypeName.trim()) {
      toast.error('Nama jenis tugas manual wajib diisi')
      return
    }
    setSaving(true)
    try {
      const targetKelas = form.targetKelas === 'ALL' ? 'ALL' : selectedKelas.join(',')
      const body = {
        title: form.title.trim(),
        description: form.description,
        targetKelas,
        dueDate: form.dueDate || null,
        isActive: form.isActive,
        exerciseType: form.exerciseType,
        questionCount: parseInt(String(form.questionCount)) || 0,
        taskType: form.taskType,
        subject: form.subject || null,
        // v2 fields
        cpId: form.cpId || null,
        tpId: form.cpId ? (form.tpId || null) : null,
        taskCategory: form.taskCategory,
        taskTypeName: form.taskType === 'manual' ? form.taskTypeName.trim() : null,
        tahunAjaran: form.tahunAjaran,
        semester: form.semester,
        duration: parseInt(String(form.duration)) || 0,
      }
      if (assignment) {
        const res = await fetch(`/api/assignments/${assignment.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || 'Gagal memperbarui')
        toast.success('Tugas diperbarui')
      } else {
        const res = await fetch('/api/assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || 'Gagal membuat tugas')
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

          {/* ── FIX: Target Kelas MOVED ABOVE CP/TP — CP filter depends on kelas ── */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              Target Kelas *
              <span className="ml-1 text-slate-400 font-normal">
                (Pilih dulu untuk mengaktifkan filter CP)
              </span>
            </Label>
            <Select
              value={form.targetKelas === 'ALL' ? 'ALL' : 'CUSTOM'}
              onValueChange={(v) => {
                setForm({ ...form, targetKelas: v, cpId: '', tpId: '' })
                if (v === 'ALL') setSelectedKelas([])
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
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
                    onClick={() => {
                      toggleKelas(k)
                      // Reset CP/TP when kelas changes — force user to re-pick
                      setForm((f) => ({ ...f, cpId: '', tpId: '' }))
                    }}
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
            {form.targetKelas === 'CUSTOM' && selectedKelas.length === 0 && (
              <p className="text-xs text-amber-600 mt-1">
                ⚠ Pilih minimal 1 kelas untuk mengaktifkan dropdown Mata Pelajaran & CP
              </p>
            )}
          </div>

          {/* ── FIX: Mata Pelajaran dropdown (dynamic by kelas) ── */}
          {form.targetKelas === 'CUSTOM' && selectedKelas.length > 0 && (() => {
            const hasSMK = selectedKelas.some(k => k === '11DKV' || k === '12DKV')
            const smkOpts = ['Mata Pelajaran Kejuruan', 'Mata Pelajaran Pilihan', 'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL']
            const smpOpts = ['Informatika', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'IPA', 'IPS', 'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes']
            const opts = hasSMK ? smkOpts : smpOpts
            // Auto-set subject if empty or mismatched
            if (!form.subject || (hasSMK && !smkOpts.includes(form.subject)) || (!hasSMK && !smpOpts.includes(form.subject))) {
              const defaultSubj = hasSMK ? 'Mata Pelajaran Kejuruan' : 'Informatika'
              if (form.subject !== defaultSubj) {
                setTimeout(() => setForm((f) => ({ ...f, subject: defaultSubj, cpId: '', tpId: '' })), 0)
              }
            }
            return (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Mata Pelajaran *</Label>
                <Select
                  value={form.subject}
                  onValueChange={(v) => setForm({ ...form, subject: v, cpId: '', tpId: '' })}
                >
                  <SelectTrigger className="w-full"><SelectValue placeholder="Pilih mapel" /></SelectTrigger>
                  <SelectContent>
                    {opts.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasSMK && (
                  <p className="text-xs text-emerald-600 mt-0.5">Mapel SMK — pilihan disesuaikan untuk kelas SMK</p>
                )}
              </div>
            )
          })()}

          {/* v2: CP / TP cascading — VERTICAL LAYOUT, no truncation */}
          {/* ── FIX: CP disabled until kelas is selected (CUSTOM + ≥1 kelas) ── */}
          {/* ── FIX #1: Added mb-6 + pb-2 on CP section to prevent TP overlap ── */}
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5 mb-6 pb-2">
              <Label className="text-xs font-medium" htmlFor="assignment-cp">
                Capaian Pembelajaran (CP) — opsional
                {form.targetKelas === 'CUSTOM' && selectedKelas.length > 0 ? (
                  <span className="ml-1 text-emerald-600 font-normal">
                    (Disaring untuk kelas: {selectedKelas.join(', ')})
                  </span>
                ) : form.targetKelas === 'ALL' ? (
                  <span className="ml-1 text-slate-400 font-normal">
                    (Semua tingkat — pilih kelas spesifik untuk menyaring)
                  </span>
                ) : (
                  <span className="ml-1 text-amber-600 font-normal">
                    (Pilih kelas dulu untuk mengaktifkan)
                  </span>
                )}
              </Label>
              <Select
                value={form.cpId || NONE}
                onValueChange={(v) =>
                  setForm({ ...form, cpId: v === NONE ? '' : v, tpId: '' })
                }
                disabled={form.targetKelas === 'CUSTOM' && selectedKelas.length === 0}
              >
                <SelectTrigger
                  id="assignment-cp"
                  className={`w-full h-auto min-h-9 items-start whitespace-normal text-left ${
                    form.targetKelas === 'CUSTOM' && selectedKelas.length === 0
                      ? 'opacity-50 cursor-not-allowed bg-slate-50'
                      : ''
                  }`}
                >
                  <SelectValue
                    placeholder={
                      form.targetKelas === 'CUSTOM' && selectedKelas.length === 0
                        ? 'Pilih kelas dulu untuk mengaktifkan CP'
                        : 'Pilih CP'
                    }
                    className="line-clamp-none whitespace-normal"
                  />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] min-w-[var(--radix-select-trigger-width)] w-[var(--radix-select-trigger-width)]">
                  <SelectItem value={NONE} className="whitespace-normal break-words items-start text-left">
                    — Tanpa CP —
                  </SelectItem>
                  {loadingCp ? (
                    <SelectItem value="__loading_cp" disabled>Memuat...</SelectItem>
                  ) : filteredCps.length === 0 ? (
                    <SelectItem value="__empty_cp" disabled className="whitespace-normal break-words items-start text-left">
                      {cpList.length === 0
                        ? 'Belum ada CP'
                        : form.targetKelas === 'CUSTOM' && selectedKelas.length === 0
                          ? 'Pilih kelas dulu'
                          : 'Tidak ada CP untuk kelas ini'}
                    </SelectItem>
                  ) : (
                    filteredCps.map((cp) => (
                      <SelectItem
                        key={cp.id}
                        value={cp.id}
                        className="whitespace-normal break-words items-start text-left py-2"
                      >
                        <span className="flex flex-col gap-0.5 w-full">
                          <span className="flex flex-wrap items-baseline gap-x-1.5">
                            <span className="font-semibold text-slate-900">[{cp.kodeCP}]</span>
                            <span className="text-xs text-emerald-700 font-medium">Kelas {cp.gradeLevel}</span>
                          </span>
                          <span className="text-sm text-slate-600 block w-full">{cp.deskripsi}</span>
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium" htmlFor="assignment-tp">
                Tujuan Pembelajaran (TP) — opsional
                {form.cpId && <span className="ml-1 text-emerald-600 font-normal">(Sinkron dengan CP terpilih)</span>}
              </Label>
              <Select
                value={form.tpId || NONE}
                onValueChange={(v) =>
                  setForm({ ...form, tpId: v === NONE ? '' : v })
                }
                disabled={!form.cpId || loadingTp}
              >
                <SelectTrigger
                  id="assignment-tp"
                  className={`w-full h-auto min-h-9 items-start whitespace-normal text-left ${
                    !form.cpId ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''
                  }`}
                >
                  <SelectValue placeholder={form.cpId ? 'Pilih TP' : 'Pilih CP dulu'} className="line-clamp-none whitespace-normal" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] min-w-[var(--radix-select-trigger-width)] w-[var(--radix-select-trigger-width)]">
                  <SelectItem value={NONE} className="whitespace-normal break-words items-start text-left">
                    — Tanpa TP —
                  </SelectItem>
                  {loadingTp ? (
                    <SelectItem value="__loading_tp" disabled>Memuat...</SelectItem>
                  ) : tpList.length === 0 ? (
                    <SelectItem value="__empty_tp" disabled className="whitespace-normal break-words items-start text-left">Belum ada TP untuk CP ini</SelectItem>
                  ) : (
                    tpList.map((tp) => (
                      <SelectItem
                        key={tp.id}
                        value={tp.id}
                        className="whitespace-normal break-words items-start text-left py-2"
                      >
                        <span className="flex flex-col gap-0.5 w-full">
                          <span className="flex flex-wrap items-baseline gap-x-1.5">
                            <span className="font-semibold text-slate-900">[{tp.kodeTP}]</span>
                          </span>
                          <span className="text-sm text-slate-600 block w-full">{tp.deskripsi}</span>
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* v2: Task Category + Task Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Kategori Tugas</Label>
              <Select
                value={form.taskCategory}
                onValueChange={(v) => setForm({ ...form, taskCategory: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TASK_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Jenis Tugas</Label>
              <Select
                value={form.taskType}
                onValueChange={(v) => setForm({ ...form, taskType: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {taskTypeOptions.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* v2: Manual task type name */}
          {form.taskType === 'manual' && (
            <div className="space-y-1">
              <Label className="text-xs">Nama Jenis Tugas (Manual) *</Label>
              <Input
                value={form.taskTypeName}
                onChange={(e) => setForm({ ...form, taskTypeName: e.target.value })}
                placeholder="Contoh: Praktik Lab, Presentasi Kelompok, dll."
              />
            </div>
          )}

          {/* v2: Tahun Ajaran + Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Tahun Ajaran</Label>
              <Select
                value={form.tahunAjaran}
                onValueChange={(v) => setForm({ ...form, tahunAjaran: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TAHUN_AJARAN_OPTIONS.map((ta) => (
                    <SelectItem key={ta} value={ta}>{ta}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Semester</Label>
              <Select
                value={form.semester}
                onValueChange={(v) => setForm({ ...form, semester: v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SEMESTER_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── FIX #2: Deadline + Duration side by side ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs" htmlFor="assignment-deadline">Deadline (opsional)</Label>
              <Input
                id="assignment-deadline"
                name="assignment-deadline"
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs" htmlFor="assignment-duration">
                Durasi Pengerjaan (Menit)
              </Label>
              <Input
                id="assignment-duration"
                name="assignment-duration"
                type="number"
                min="0"
                max="180"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 0 })}
                placeholder="0 = default (25 mnt kuis, 40 mnt mengetik)"
              />
              <p className="text-xs text-slate-400">
                0 = gunakan durasi default. Isi 30 untuk 30 menit, dll.
              </p>
            </div>
          </div>

          {/* Jenis Latihan + Jumlah Soal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <Label className="text-xs" htmlFor="assignment-question-count">Jumlah Soal (0 = semua)</Label>
              <Input
                id="assignment-question-count"
                name="assignment-question-count"
                type="number"
                min="0"
                max="100"
                value={form.questionCount}
                onChange={(e) => setForm({ ...form, questionCount: parseInt(e.target.value) || 0 })}
                placeholder="0 = gunakan semua soal"
              />
            </div>
          </div>
          {/* ── FIX #2: Live stock warning ── */}
          {stockInfo && (
            <div className={`text-xs rounded-md p-2 -mt-1 ${
              stockInfo.loading
                ? 'bg-slate-50 text-slate-500'
                : stockInfo.available === 0
                  ? stockInfo.withoutCp && stockInfo.withoutCp > 0
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                  : stockWarning
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {stockInfo.loading ? (
                'Memeriksa stok soal...'
              ) : stockInfo.available === 0 ? (
                // ── FIX: Pesan lebih akurat berdasarkan info withoutCp ──
                stockInfo.withoutCp && stockInfo.withoutCp > 0
                  ? `⚠ Tidak ada soal yang ter-link ke CP/TP ini. Namun ada ${stockInfo.withoutCp} soal untuk mapel+kelas ini yang belum di-link ke CP manapun. Hubungkan soal-soal tersebut ke CP melalui menu Bank Soal, atau pilih CP lain.`
                  : '⚠ Tidak ada soal di Bank Soal untuk mapel+kelas+CP/TP ini. Pastikan:(1) Mapel di-dropdown sesuai dengan mapel soal di Bank Soal, (2) Kelas di-dropdown sesuai grade soal (7/8/9/11DKV/12DKV), (3) Soal sudah di-link ke CP yang dipilih.'
              ) : stockWarning ? (
                `⚠ ${stockWarning}`
              ) : (
                `✓ Stok soal tersedia: ${stockInfo.available} soal untuk CP/TP ini`
              )}
            </div>
          )}
          <p className="text-xs text-slate-400 -mt-1">
            Isi 0 untuk menggunakan semua soal aktif, atau isi angka tertentu (mis: 10) untuk memilih 10 soal acak.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="isActive" className="text-sm cursor-pointer">
              Tugas aktif (siswa bisa melihat &amp; mengerjakan)
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
