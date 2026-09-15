'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
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
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, RefreshCw, Download, Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertCircle, Sparkles, Layers, Target, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { AIGenerateDialog } from './ai-generate-dialog'
import { useResilientFetch } from '@/lib/use-resilient-fetch'
import { GRADE_TIERS } from '@/lib/constants'

interface Question {
  id: string
  gradeLevel: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: number
  explanation: string
  category: string
  isActive: boolean
  imageUrl?: string | null
  subject?: string | null
  // ── CP/TP fields (joined from /api/questions GET) ──
  cpId?: string | null
  tpId?: string | null
  cpKode?: string | null
  cpDeskripsi?: string | null
  tpKode?: string | null
  tpDeskripsi?: string | null
  // ── NEW v4: 5 question type fields ──
  questionType?: string
  correctAnswers?: string  // JSON array untuk PG Kompleks
  matchPairs?: string      // JSON array of {key, value} untuk Mencocokkan
  shortAnswer?: string     // pipe-separated untuk Isian Singkat
  essayAnswer?: string     // rubric untuk Essai
  levelKognitif?: string
}

// ── CP/TP types for cascading dropdowns ──
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

const NONE = '__none__'

export function QuestionBank() {
  const [filterGrade, setFilterGrade] = useState<string>('7')
  // ── FIX: Subject filter for multi-mapel support ──
  const [filterSubject, setFilterSubject] = useState<string>('Informatika')
  const [editing, setEditing] = useState<Question | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showAIGenerate, setShowAIGenerate] = useState(false)
  // ── Clone modal state ──
  const [showClone, setShowClone] = useState(false)
  const [cloneQuestion, setCloneQuestion] = useState<Question | null>(null)

  const handleDownloadTemplate = () => {
    // Trigger download dari API
    const link = document.createElement('a')
    link.href = '/api/questions/template'
    link.download = 'template-import-soal.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Template diunduh. Isi sesuai panduan di sheet "Panduan".')
  }

  // ── RESILIENT FETCH: auto-retry on 401/network error ──
  // FIX: URL now includes subject param so API returns questions for selected subject
  const { data: questionsData, loading, error, refetch, retryCount } = useResilientFetch<{
    success: boolean
    questions: Question[]
  }>(`/api/questions?grade=${filterGrade}&subject=${encodeURIComponent(filterSubject)}`, { deps: [filterGrade, filterSubject] })

  const questions = questionsData?.questions ?? []
  const fetchQuestions = useCallback(() => { refetch() }, [refetch])

  const handleToggleActive = async (q: Question) => {
    try {
      const res = await fetch(`/api/questions/${q.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !q.isActive }),
      })
      if (!res.ok) throw new Error('Gagal')
      toast.success(`Soal ${!q.isActive ? 'diaktifkan' : 'dinonaktifkan'}`)
      fetchQuestions()
    } catch {
      toast.error('Gagal mengubah status soal')
    }
  }

  // ── Mass delete handler ──
  const [massDeleting, setMassDeleting] = useState(false)
  const handleMassDelete = async () => {
    setMassDeleting(true)
    try {
      const res = await fetch(
        `/api/questions/mass-delete?grade=${encodeURIComponent(filterGrade)}&subject=${encodeURIComponent(filterSubject)}`,
        { method: 'DELETE' }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')
      toast.success(data.message || 'Soal berhasil dihapus')
      fetchQuestions()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal hapus massal')
    } finally {
      setMassDeleting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Gagal')
      toast.success('Soal dihapus')
      fetchQuestions()
    } catch {
      toast.error('Gagal menghapus soal')
    }
  }

  const activeCount = questions.filter((q) => q.isActive).length

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">Bank Soal HOTS</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              {/* ── FIX: Subject filter dropdown ── */}
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="w-full sm:w-40 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Informatika">Informatika (SMP)</SelectItem>
                  <SelectItem value="Mata Pelajaran Kejuruan">Mata Pelajaran Kejuruan (SMK)</SelectItem>
                  <SelectItem value="Mata Pelajaran Pilihan">Mata Pelajaran Pilihan (SMK)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_TIERS.map((g) => (
                    <SelectItem key={g} value={g}>Kelas {g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchQuestions} disabled={loading}>
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
                variant="outline"
                size="sm"
                onClick={() => window.open('/api/questions/export', '_blank')}
                title="Export ke Excel"
              >
                <FileSpreadsheet className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Export Excel</span>
              </Button>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowAIGenerate(true)}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">AI Generate</span>
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  setEditing(null)
                  setShowForm(true)
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Tambah Soal
              </Button>
              {/* ── Mass Delete button + confirmation dialog ── */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={massDeleting || questions.length === 0}
                    title={`Hapus semua soal Kelas ${filterGrade} — ${filterSubject}`}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Hapus Massal</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus semua soal?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Anda akan menghapus <strong>SEMUA {questions.length} soal</strong> untuk
                      Kelas <strong>{filterGrade}</strong> — Mapel <strong>{filterSubject}</strong>.
                      Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleMassDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Ya, Hapus Semua
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Total: <strong>{questions.length}</strong> soal • Aktif:{' '}
            <strong className="text-emerald-600">{activeCount}</strong> • Nonaktif:{' '}
            <strong className="text-slate-400">{questions.length - activeCount}</strong>
            <span className="ml-2 text-slate-400">
              (Soal nonaktif tidak akan muncul saat siswa latihan)
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat data soal...</p>
              {retryCount > 0 && (
                <p className="text-xs mt-1 text-amber-600">Mencoba ulang ({retryCount}/2)...</p>
              )}
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
              <p className="font-medium text-red-600 mb-1">Gagal memuat data</p>
              <p className="text-xs text-slate-500 mb-3">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchQuestions}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Coba Muat Ulang
              </Button>
            </div>
          ) : questions.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <p className="font-medium">Belum ada soal</p>
              <p className="text-xs mt-1">Klik "Tambah Soal" untuk membuat soal baru</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`p-3 border rounded-lg ${q.isActive ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-70'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold text-slate-500">#{i + 1}</span>
                        {/* ── NEW: Badge tipe soal (warna sesuai tipe) ── */}
                        {(() => {
                          const qt = q.questionType || 'pilihan_ganda'
                          const config: Record<string, { label: string; className: string }> = {
                            pilihan_ganda: { label: 'PG', className: 'bg-teal-50 text-teal-700' },
                            pilihan_ganda_kompleks: { label: 'PG Kompleks', className: 'bg-sky-50 text-sky-700' },
                            isian_singkat: { label: 'Isian', className: 'bg-emerald-50 text-emerald-700' },
                            mencocokkan: { label: 'Mencocokkan', className: 'bg-purple-50 text-purple-700' },
                            essai: { label: 'Essai', className: 'bg-amber-50 text-amber-700' },
                          }
                          const c = config[qt] || config.pilihan_ganda
                          return (
                            <Badge variant="outline" className={`text-xs ${c.className}`}>
                              {c.label}
                            </Badge>
                          )
                        })()}
                        {/* ── Bug #3 fix: show CP/TP badges instead of category ── */}
                        {q.tpKode && (
                          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700" title={q.tpDeskripsi || undefined}>
                            TP: {q.tpKode}
                          </Badge>
                        )}
                        {q.cpKode && !q.tpKode && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700" title={q.cpDeskripsi || undefined}>
                            CP: {q.cpKode}
                          </Badge>
                        )}
                        {!q.cpKode && !q.tpKode && q.category && (
                          <Badge variant="outline" className="text-xs bg-slate-100 text-slate-500">
                            {q.category}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          Kelas {q.gradeLevel}
                        </Badge>
                        {!q.isActive && (
                          <Badge variant="outline" className="text-xs bg-slate-100 text-slate-500">
                            Nonaktif
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-800 mb-1 line-clamp-2">{q.question}</p>
                      <p className="text-xs text-emerald-700">
                        Jawaban: {String.fromCharCode(65 + q.correctAnswer)}.{' '}
                        {[q.optionA, q.optionB, q.optionC, q.optionD][q.correctAnswer]}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleToggleActive(q)}
                        title={q.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      >
                        {q.isActive ? (
                          <ToggleRight className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-slate-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setEditing(q)
                          setShowForm(true)
                        }}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-slate-600" />
                      </Button>
                      {/* ── Clone button: salin soal ke mapel/kelas lain ── */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => { setCloneQuestion(q); setShowClone(true) }}
                        title="Salin Soal ke Mapel/Kelas Lain"
                      >
                        <Copy className="w-4 h-4 text-blue-600" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Hapus">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus soal ini?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Soal akan dihapus permanen dan tidak dapat dikembalikan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(q.id)}
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
        <QuestionForm
          question={editing}
          defaultGrade={filterGrade}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSaved={() => {
            setShowForm(false)
            setEditing(null)
            fetchQuestions()
          }}
        />
      )}

      {showImport && (
        <ImportDialog
          onClose={() => setShowImport(false)}
          onImported={() => {
            setShowImport(false)
            fetchQuestions()
          }}
        />
      )}

      {showAIGenerate && (
        <AIGenerateDialog
          defaultGrade={filterGrade}
          onClose={() => setShowAIGenerate(false)}
          onSaved={() => { setShowAIGenerate(false); fetchQuestions() }}
        />
      )}

      {/* ── Clone Modal ── */}
      {showClone && cloneQuestion && (
        <CloneDialog
          question={cloneQuestion}
          onClose={() => { setShowClone(false); setCloneQuestion(null) }}
          onCloned={() => { setShowClone(false); setCloneQuestion(null); fetchQuestions() }}
        />
      )}
    </div>
  )
}

function ImportDialog({
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

  // ── Grade + Subject + CP/TP selectors ──
  const NONE = '__none__'
  const [selectedGrade, setSelectedGrade] = useState<string>('7')
  const [selectedSubject, setSelectedSubject] = useState<string>('Informatika')
  const [selectedCpId, setSelectedCpId] = useState<string>(NONE)
  const [selectedTpId, setSelectedTpId] = useState<string>(NONE)
  const [cpList, setCpList] = useState<Array<{ id: string; kodeCP: string; deskripsi: string; gradeLevel: string; subject?: string }>>([])
  const [tpList, setTpList] = useState<Array<{ id: string; kodeTP: string; deskripsi: string; cpId: string }>>([])
  const [loadingCp, setLoadingCp] = useState(false)
  const [loadingTp, setLoadingTp] = useState(false)

  // ── Dynamic subject options based on selectedGrade ──
  const isSMK = selectedGrade === '11DKV' || selectedGrade === '12DKV'
  const subjectOptions = isSMK
    ? ['Mata Pelajaran Kejuruan', 'Mata Pelajaran Pilihan', 'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL']
    : ['Informatika', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'IPA', 'IPS', 'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes']

  // Auto-set subject when grade changes
  const handleGradeChange = (v: string) => {
    const smk = v === '11DKV' || v === '12DKV'
    setSelectedGrade(v)
    setSelectedSubject(smk ? 'Mata Pelajaran Kejuruan' : 'Informatika')
    setSelectedCpId(NONE)
    setSelectedTpId(NONE)
  }

  // ── Fetch CPs filtered by selectedGrade + selectedSubject ──
  useEffect(() => {
    setLoadingCp(true)
    setSelectedCpId(NONE)
    setSelectedTpId(NONE)
    setCpList([])
    setTpList([])
    fetch(`/api/cp?grade=${encodeURIComponent(selectedGrade)}&subject=${encodeURIComponent(selectedSubject)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.cps)) {
          const filtered = data.cps.filter((cp: any) => cp.subject === selectedSubject)
          setCpList(filtered)
        } else {
          setCpList([])
        }
      })
      .catch(() => setCpList([]))
      .finally(() => setLoadingCp(false))
  }, [selectedGrade, selectedSubject])

  // ── Fetch TPs when CP changes ──
  useEffect(() => {
    if (!selectedCpId || selectedCpId === NONE) {
      setTpList([])
      return
    }
    setLoadingTp(true)
    setSelectedTpId(NONE)
    fetch(`/api/tp?cpId=${encodeURIComponent(selectedCpId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.tps)) setTpList(data.tps)
        else setTpList([])
      })
      .catch(() => setTpList([]))
      .finally(() => setLoadingTp(false))
  }, [selectedCpId])

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
      // Send grade override + subject + cpId + tpId to backend
      formData.append('gradeLevel', selectedGrade)
      formData.append('subject', selectedSubject)
      if (selectedCpId !== NONE) formData.append('cpId', selectedCpId)
      if (selectedTpId !== NONE) formData.append('tpId', selectedTpId)
      const res = await fetch('/api/questions/import?mode=preview', {
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
      formData.append('gradeLevel', selectedGrade)
      formData.append('subject', selectedSubject)
      if (selectedCpId !== NONE) formData.append('cpId', selectedCpId)
      if (selectedTpId !== NONE) formData.append('tpId', selectedTpId)
      const res = await fetch('/api/questions/import?mode=save', {
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
            Import Soal dari Excel/CSV
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Step 1: Download template */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Langkah 1: Download Template
            </p>
            <p className="text-xs text-blue-700 mb-2">
              Unduh template Excel, isi soal sesuai format di sheet &quot;Soal&quot;. Baca panduan di sheet &quot;Panduan&quot;.
            </p>
            <div className="text-xs text-blue-800 bg-blue-100 rounded p-2 mb-3 space-y-0.5">
              <p className="font-semibold">Format kolom <span className="font-mono">gradeLevel</span> (TEKS, bukan angka):</p>
              <p>• SMP: <code className="bg-white px-1 rounded">7</code>, <code className="bg-white px-1 rounded">8</code>, <code className="bg-white px-1 rounded">9</code></p>
              <p>• SMK: <code className="bg-white px-1 rounded">11DKV</code>, <code className="bg-white px-1 rounded">12DKV</code> (tanpa spasi)</p>
              <p className="text-blue-600 italic">Huruf kecil diterima: &quot;11dkv&quot; → otomatis jadi &quot;11DKV&quot;</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="bg-white"
              onClick={() => {
                const link = document.createElement('a')
                link.href = '/api/questions/template'
                link.download = 'template-import-soal.xlsx'
                link.click()
              }}
            >
              <Download className="w-4 h-4 mr-1" />
              Download Template Excel
            </Button>
          </div>

          {/* Step 2: Pilih Kelas + CP/TP (Bug #1 + #2 fix) */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-emerald-900">
              Langkah 2: Pilih Kelas &amp; Relasi CP/TP (opsional)
            </p>
            <p className="text-xs text-emerald-700">
              Pilih kelas target. CP/TP yang difilter akan otomatis diterapkan ke SEMUA soal di file Excel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Grade dropdown — SMP + SMK */}
              <div className="space-y-1">
                <Label htmlFor="import-grade" className="text-xs flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Kelas Target
                </Label>
                <Select value={selectedGrade} onValueChange={handleGradeChange}>
                  <SelectTrigger id="import-grade"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {GRADE_TIERS.map((g) => (
                      <SelectItem key={g} value={g}>Kelas {g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* ── FIX: Subject dropdown (dynamic by grade) ── */}
              <div className="space-y-1">
                <Label htmlFor="import-subject" className="text-xs flex items-center gap-1">
                  <Target className="w-3 h-3" /> Mata Pelajaran
                </Label>
                <Select
                  value={selectedSubject}
                  onValueChange={(v) => { setSelectedSubject(v); setSelectedCpId(NONE); setSelectedTpId(NONE) }}
                >
                  <SelectTrigger id="import-subject"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isSMK && (
                  <p className="text-xs text-emerald-600">Mapel SMK</p>
                )}
              </div>
              {/* CP dropdown — filtered by grade + subject */}
              <div className="space-y-1">
                <Label htmlFor="import-cp" className="text-xs flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Capaian Pembelajaran
                </Label>
                <Select value={selectedCpId} onValueChange={setSelectedCpId}>
                  <SelectTrigger id="import-cp"><SelectValue placeholder={loadingCp ? 'Memuat...' : 'Pilih CP'} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE}>— Tanpa CP —</SelectItem>
                    {cpList.map((cp) => (
                      <SelectItem key={cp.id} value={cp.id}>
                        <span className="flex flex-col">
                          <span className="font-semibold text-xs">[{cp.kodeCP}] Kelas {cp.gradeLevel}</span>
                          <span className="text-xs text-slate-500 line-clamp-1">{cp.deskripsi}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* TP dropdown — filtered by CP */}
              <div className="space-y-1">
                <Label htmlFor="import-tp" className="text-xs flex items-center gap-1">
                  <Target className="w-3 h-3" /> Tujuan Pembelajaran
                </Label>
                <Select
                  value={selectedTpId}
                  onValueChange={setSelectedTpId}
                  disabled={selectedCpId === NONE || loadingTp}
                >
                  <SelectTrigger id="import-tp">
                    <SelectValue placeholder={
                      selectedCpId === NONE
                        ? 'Pilih CP dulu'
                        : loadingTp
                          ? 'Memuat...'
                          : 'Pilih TP'
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE}>— Tanpa TP —</SelectItem>
                    {tpList.map((tp) => (
                      <SelectItem key={tp.id} value={tp.id}>
                        <span className="flex flex-col">
                          <span className="font-semibold text-xs">[{tp.kodeTP}]</span>
                          <span className="text-xs text-slate-500 line-clamp-1">{tp.deskripsi}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Step 3: Upload file */}
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-2">
              Langkah 3: Upload File
            </p>
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="import-file"
                name="import-file"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
              >
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

          {/* Step 4: Preview hasil */}
          {preview && (
            <div className="space-y-3">
              {/* Metadata badge */}
              {preview.appliedMetadata && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700">
                    Kelas: {selectedGrade}
                  </Badge>
                  {preview.appliedMetadata.cpId && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      CP: {cpList.find(c => c.id === preview.appliedMetadata.cpId)?.kodeCP || '...'}
                    </Badge>
                  )}
                  {preview.appliedMetadata.tpId && (
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                      TP: {tpList.find(t => t.id === preview.appliedMetadata.tpId)?.kodeTP || '...'}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600">
                    Mapel: {preview.appliedMetadata.subject || selectedSubject}
                  </Badge>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-100 rounded p-3 text-center">
                  <p className="text-2xl font-bold text-slate-900">{preview.totalRows}</p>
                  <p className="text-xs text-slate-500">Total Baris</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{preview.validCount}</p>
                  <p className="text-xs text-emerald-700">Soal Valid</p>
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
                    Preview Soal Valid ({preview.valid.length}):
                  </p>
                  <div className="space-y-2">
                    {preview.valid.slice(0, 10).map((row: any, i: number) => (
                      <div key={i} className="text-xs border-l-2 border-emerald-400 pl-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <Badge variant="outline" className="text-xs">Kelas {row.gradeLevel}</Badge>
                          <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700">{row.category}</Badge>
                          <span className="text-emerald-700 font-semibold">
                            Jawaban: {String.fromCharCode(65 + row.correctAnswer)}
                          </span>
                        </div>
                        <p className="text-slate-700">{row.question}</p>
                      </div>
                    ))}
                    {preview.valid.length > 10 && (
                      <p className="text-xs text-slate-500 italic mt-1">
                        ... dan {preview.valid.length - 10} soal lainnya
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
            {saving ? 'Menyimpan...' : `Import ${preview?.validCount || 0} Soal`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ══════════════════════════════════════════════════════════════════
// CLONE DIALOG — Salin soal ke mapel/kelas lain
// ══════════════════════════════════════════════════════════════════

function CloneDialog({
  question,
  onClose,
  onCloned,
}: {
  question: Question
  onClose: () => void
  onCloned: () => void
}) {
  const [targetGrade, setTargetGrade] = useState<string>('')
  const [targetSubject, setTargetSubject] = useState<string>('')
  const [cloning, setCloning] = useState(false)

  // Subject options: SMP subjects for grades 7/8/9, SMK subjects for 11DKV/12DKV
  const isSMK = targetGrade === '11DKV' || targetGrade === '12DKV'
  const subjectOptions = isSMK
    ? ['Mata Pelajaran Kejuruan', 'Mata Pelajaran Pilihan', 'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL']
    : ['Informatika', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'IPA', 'IPS', 'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes']

  // Reset subject when grade changes (SMP ↔ SMK)
  useEffect(() => {
    setTargetSubject('')
  }, [targetGrade])

  const handleClone = async () => {
    if (!targetGrade) { toast.error('Pilih target kelas dulu'); return }
    if (!targetSubject) { toast.error('Pilih target mapel dulu'); return }
    setCloning(true)
    try {
      const res = await fetch('/api/questions/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          targetGrade,
          targetSubject,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal clone')
      toast.success(data.message || 'Soal berhasil disalin')
      onCloned()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal clone soal')
    } finally {
      setCloning(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="w-5 h-5 text-blue-600" />
            Salin Soal ke Target Baru
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Preview original question */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Soal asli (Kelas {question.gradeLevel}):</p>
            <p className="text-sm text-slate-700 line-clamp-2">{question.question}</p>
          </div>

          {/* Target Grade dropdown */}
          <div className="space-y-1.5">
            <Label htmlFor="clone-grade" className="text-xs font-medium">Target Kelas *</Label>
            <Select value={targetGrade} onValueChange={setTargetGrade}>
              <SelectTrigger id="clone-grade"><SelectValue placeholder="Pilih kelas target" /></SelectTrigger>
              <SelectContent>
                {GRADE_TIERS.map((g) => (
                  <SelectItem key={g} value={g}>Kelas {g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Target Subject dropdown — dynamic based on grade */}
          <div className="space-y-1.5">
            <Label htmlFor="clone-subject" className="text-xs font-medium">
              Target Mata Pelajaran *
              {isSMK && <span className="ml-1 text-xs text-emerald-600">(Mapel SMK)</span>}
            </Label>
            <Select
              value={targetSubject}
              onValueChange={setTargetSubject}
              disabled={!targetGrade}
            >
              <SelectTrigger id="clone-subject">
                <SelectValue placeholder={targetGrade ? 'Pilih mapel' : 'Pilih kelas dulu'} />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
            <p className="font-semibold mb-1">Catatan:</p>
            <p>Soal akan disalin dengan teks, opsi, kunci jawaban, dan pembahasan yang sama. CP/TP tidak disalin (perlu diatur manual di target mapel).</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button
            onClick={handleClone}
            disabled={cloning || !targetGrade || !targetSubject}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {cloning ? 'Menyalin...' : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                Proses Salin
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function QuestionForm({
  question,
  defaultGrade,
  onClose,
  onSaved,
}: {
  question: Question | null
  defaultGrade: string
  onClose: () => void
  onSaved: () => void
}) {
  // ── Form state dengan field untuk 5 tipe soal ──
  // - pilihan_ganda: optionA-D + correctAnswer (number 0-3)
  // - pilihan_ganda_kompleks: optionA-D + correctAnswers (array [0,2])
  // - isian_singkat: shortAnswer (pipe-separated accepted answers)
  // - mencocokkan: matchPairs (array of {key, value})
  // - essai: essayAnswer (rubric / model answer)
  const [form, setForm] = useState({
    gradeLevel: question?.gradeLevel ?? defaultGrade,
    subject: question?.subject ?? '',
    questionType: question?.questionType ?? 'pilihan_ganda',
    question: question?.question ?? '',
    // PG & PG Kompleks
    optionA: question?.optionA ?? '',
    optionB: question?.optionB ?? '',
    optionC: question?.optionC ?? '',
    optionD: question?.optionD ?? '',
    correctAnswer: question?.correctAnswer ?? 0, // untuk PG single
    correctAnswers: (() => {
      try {
        return Array.isArray(question?.correctAnswers)
          ? question!.correctAnswers
          : (typeof question?.correctAnswers === 'string' && question!.correctAnswers
              ? JSON.parse(question!.correctAnswers)
              : [])
      } catch { return [] }
    })() as number[], // untuk PG Kompleks
    // Isian Singkat
    shortAnswer: question?.shortAnswer ?? '',
    // Mencocokkan
    matchPairs: (() => {
      try {
        return Array.isArray(question?.matchPairs)
          ? question!.matchPairs
          : (typeof question?.matchPairs === 'string' && question!.matchPairs
              ? JSON.parse(question!.matchPairs)
              : [])
      } catch { return [] }
    })() as Array<{ key: string; value: string }>,
    // Essai
    essayAnswer: question?.essayAnswer ?? '',
    // Umum
    explanation: question?.explanation ?? '',
    imageUrl: question?.imageUrl ?? '',
    cpId: question?.cpId ?? '',
    tpId: question?.tpId ?? '',
    levelKognitif: (question as any)?.levelKognitif ?? 'C3',
  })
  const [saving, setSaving] = useState(false)

  // ── Dynamic subject options based on gradeLevel ──
  const isSMK = form.gradeLevel === '11DKV' || form.gradeLevel === '12DKV'
  const subjectOptions = isSMK
    ? ['Mata Pelajaran Kejuruan', 'Mata Pelajaran Pilihan', 'DKV', 'Komputer Akuntansi', 'Multimedia', 'TKJ', 'RPL']
    : ['Informatika', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Mandarin', 'IPA', 'IPS', 'Seni Budaya', 'Agama', 'PLH', 'KKA', 'Kerohanian', 'PkN', 'Penjaskes']

  // Auto-set subject when gradeLevel changes
  const handleGradeChange = (v: string) => {
    const smk = v === '11DKV' || v === '12DKV'
    const newSubject = smk ? 'Mata Pelajaran Kejuruan' : 'Informatika'
    setForm({ ...form, gradeLevel: v, subject: newSubject, cpId: '', tpId: '' })
  }

  // ── CP list (filtered by gradeLevel + subject) ──
  const [cpList, setCpList] = useState<CP[]>([])
  const [loadingCp, setLoadingCp] = useState(false)
  useEffect(() => {
    setLoadingCp(true)
    setCpList([])
    const effectiveSubject = form.subject || 'Informatika'
    fetch(`/api/cp?grade=${encodeURIComponent(form.gradeLevel)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.cps)) {
          // Client-side filter by subject for multi-mapel guru
          const filtered = data.cps.filter((cp: any) => cp.subject === effectiveSubject)
          setCpList(filtered)
        } else {
          setCpList([])
        }
      })
      .catch(() => setCpList([]))
      .finally(() => setLoadingCp(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.gradeLevel, form.subject])

  // ── TP list (filtered by CP) ──
  const [tpList, setTpList] = useState<TP[]>([])
  const [loadingTp, setLoadingTp] = useState(false)
  useEffect(() => {
    if (!form.cpId || form.cpId === NONE) {
      setTpList([])
      return
    }
    setLoadingTp(true)
    setForm((f) => ({ ...f, tpId: '' }))
    fetch(`/api/tp?cpId=${encodeURIComponent(form.cpId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.tps)) setTpList(data.tps)
        else setTpList([])
      })
      .catch(() => setTpList([]))
      .finally(() => setLoadingTp(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.cpId])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 500000) {
      toast.error('Ukuran gambar maksimal 500KB')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setForm({ ...form, imageUrl: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    // ── Validasi sesuai tipe soal ──
    if (!form.question) {
      toast.error('Pertanyaan wajib diisi')
      return
    }
    const qType = form.questionType
    if (qType === 'pilihan_ganda') {
      if (!form.optionA || !form.optionB || !form.optionC || !form.optionD || !form.explanation) {
        toast.error('Semua opsi (A-D) dan pembahasan wajib diisi untuk PG')
        return
      }
    } else if (qType === 'pilihan_ganda_kompleks') {
      if (!form.optionA || !form.optionB || !form.optionC || !form.optionD) {
        toast.error('Semua opsi (A-D) wajib diisi untuk PG Kompleks')
        return
      }
      if (form.correctAnswers.length < 2) {
        toast.error('Pilih minimal 2 jawaban benar untuk PG Kompleks')
        return
      }
    } else if (qType === 'isian_singkat') {
      if (!form.shortAnswer) {
        toast.error('Jawaban singkat wajib diisi (pisahkan dengan | untuk alternatif)')
        return
      }
    } else if (qType === 'mencocokkan') {
      if (form.matchPairs.length < 2) {
        toast.error('Minimal 2 pasangan untuk soal mencocokkan')
        return
      }
      const allFilled = form.matchPairs.every(p => p.key.trim() && p.value.trim())
      if (!allFilled) {
        toast.error('Semua pasangan key-value wajib diisi')
        return
      }
    } else if (qType === 'essai') {
      if (!form.essayAnswer) {
        toast.error('Rubric / jawaban contoh wajib diisi untuk essai')
        return
      }
    }
    setSaving(true)
    try {
      const url = question ? `/api/questions/${question.id}` : '/api/questions'
      const method = question ? 'PUT' : 'POST'
      // ── Payload sesuai tipe soal ──
      const body: Record<string, unknown> = {
        gradeLevel: form.gradeLevel,
        subject: form.subject,
        questionType: form.questionType,
        question: form.question,
        explanation: form.explanation,
        levelKognitif: form.levelKognitif,
        imageUrl: form.imageUrl || null,
        cpId: form.cpId && form.cpId !== NONE ? form.cpId : null,
        tpId: form.cpId && form.cpId !== NONE && form.tpId && form.tpId !== NONE ? form.tpId : null,
      }
      // Tambah field spesifik per tipe
      if (qType === 'pilihan_ganda') {
        Object.assign(body, {
          optionA: form.optionA,
          optionB: form.optionB,
          optionC: form.optionC,
          optionD: form.optionD,
          correctAnswer: form.correctAnswer,
        })
      } else if (qType === 'pilihan_ganda_kompleks') {
        Object.assign(body, {
          optionA: form.optionA,
          optionB: form.optionB,
          optionC: form.optionC,
          optionD: form.optionD,
          correctAnswer: form.correctAnswers[0] ?? 0, // first correct, for backward compat
          correctAnswers: JSON.stringify(form.correctAnswers),
        })
      } else if (qType === 'isian_singkat') {
        Object.assign(body, {
          optionA: '', optionB: '', optionC: '', optionD: '',
          correctAnswer: 0,
          shortAnswer: form.shortAnswer,
        })
      } else if (qType === 'mencocokkan') {
        Object.assign(body, {
          optionA: '', optionB: '', optionC: '', optionD: '',
          correctAnswer: 0,
          matchPairs: JSON.stringify(form.matchPairs),
        })
      } else if (qType === 'essai') {
        Object.assign(body, {
          optionA: '', optionB: '', optionC: '', optionD: '',
          correctAnswer: 0,
          essayAnswer: form.essayAnswer,
        })
      }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal')
      toast.success(question ? 'Soal diperbarui' : 'Soal ditambahkan')
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{question ? 'Edit Soal' : 'Tambah Soal Baru'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* ── Mata Pelajaran (dynamic by grade) ── */}
          <div className="space-y-1">
            <Label htmlFor="qf-subject" className="text-xs font-medium">Mata Pelajaran *</Label>
            <Select
              value={form.subject}
              onValueChange={(v) => setForm({ ...form, subject: v, cpId: '', tpId: '' })}
            >
              <SelectTrigger id="qf-subject"><SelectValue placeholder="Pilih mapel" /></SelectTrigger>
              <SelectContent>
                {subjectOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isSMK && (
              <p className="text-xs text-emerald-600 mt-0.5">Mapel SMK — pilihan disesuaikan untuk kelas {form.gradeLevel}</p>
            )}
          </div>

          {/* ── Jenjang Kelas (full width) ── */}
          <div className="space-y-1">
            <Label htmlFor="qf-grade" className="text-xs">Jenjang Kelas *</Label>
            <Select
              value={form.gradeLevel}
              onValueChange={handleGradeChange}
            >
              <SelectTrigger id="qf-grade">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRADE_TIERS.map((g) => (
                  <SelectItem key={g} value={g}>Kelas {g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ── CP/TP cascading dropdowns (Bug #2 fix: replaces Kategori) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-200">
            <div className="space-y-1">
              <Label htmlFor="qf-cp" className="text-xs flex items-center gap-1">
                <Layers className="w-3 h-3" />
                Capaian Pembelajaran (CP)
              </Label>
              <Select
                value={form.cpId || NONE}
                onValueChange={(v) => setForm({ ...form, cpId: v === NONE ? '' : v })}
              >
                <SelectTrigger id="qf-cp">
                  <SelectValue placeholder={loadingCp ? 'Memuat CP...' : 'Pilih CP'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>— Tanpa CP —</SelectItem>
                  {loadingCp ? (
                    <SelectItem value="__loading" disabled>Memuat...</SelectItem>
                  ) : cpList.length === 0 ? (
                    <SelectItem value="__empty" disabled>Belum ada CP untuk kelas ini</SelectItem>
                  ) : (
                    cpList.map((cp) => (
                      <SelectItem key={cp.id} value={cp.id}>
                        <span className="flex flex-col">
                          <span className="font-semibold text-xs">[{cp.kodeCP}]</span>
                          <span className="text-xs text-slate-500 line-clamp-1">{cp.deskripsi}</span>
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="qf-tp" className="text-xs flex items-center gap-1">
                <Target className="w-3 h-3" />
                Tujuan Pembelajaran (TP)
              </Label>
              <Select
                value={form.tpId || NONE}
                onValueChange={(v) => setForm({ ...form, tpId: v === NONE ? '' : v })}
                disabled={!form.cpId || form.cpId === NONE || loadingTp}
              >
                <SelectTrigger id="qf-tp">
                  <SelectValue placeholder={
                    !form.cpId || form.cpId === NONE
                      ? 'Pilih CP dulu'
                      : loadingTp
                        ? 'Memuat TP...'
                        : 'Pilih TP'
                  } />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>— Tanpa TP —</SelectItem>
                  {loadingTp ? (
                    <SelectItem value="__loading" disabled>Memuat...</SelectItem>
                  ) : tpList.length === 0 ? (
                    <SelectItem value="__empty" disabled>Belum ada TP untuk CP ini</SelectItem>
                  ) : (
                    tpList.map((tp) => (
                      <SelectItem key={tp.id} value={tp.id}>
                        <span className="flex flex-col">
                          <span className="font-semibold text-xs">[{tp.kodeTP}]</span>
                          <span className="text-xs text-slate-500 line-clamp-1">{tp.deskripsi}</span>
                        </span>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Tipe Soal Selector ── */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Tipe Soal *</Label>
            <Select
              value={form.questionType}
              onValueChange={(v) => setForm({ ...form, questionType: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pilihan_ganda">
                  <div className="flex flex-col">
                    <span className="font-semibold">Pilihan Ganda</span>
                    <span className="text-xs text-slate-500">Single choice (A/B/C/D) — auto-grade</span>
                  </div>
                </SelectItem>
                <SelectItem value="pilihan_ganda_kompleks">
                  <div className="flex flex-col">
                    <span className="font-semibold">Pilihan Ganda Kompleks</span>
                    <span className="text-xs text-slate-500">Multi-choice (checkbox) — auto-grade</span>
                  </div>
                </SelectItem>
                <SelectItem value="isian_singkat">
                  <div className="flex flex-col">
                    <span className="font-semibold">Isian Singkat</span>
                    <span className="text-xs text-slate-500">Kata/frasa — auto-grade (case-insensitive)</span>
                  </div>
                </SelectItem>
                <SelectItem value="mencocokkan">
                  <div className="flex flex-col">
                    <span className="font-semibold">Mencocokkan / Jodohkan</span>
                    <span className="text-xs text-slate-500">Pasangkan item — dinilai manual</span>
                  </div>
                </SelectItem>
                <SelectItem value="essai">
                  <div className="flex flex-col">
                    <span className="font-semibold">Essai / Uraian</span>
                    <span className="text-xs text-slate-500">Jawaban panjang — dinilai manual</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ── Level Kognitif ── */}
          <div className="space-y-1">
            <Label className="text-xs">Level Kognitif (Bloom)</Label>
            <Select
              value={form.levelKognitif}
              onValueChange={(v) => setForm({ ...form, levelKognitif: v })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="C1">C1 — Mengingat</SelectItem>
                <SelectItem value="C2">C2 — Memahami</SelectItem>
                <SelectItem value="C3">C3 — Menerapkan</SelectItem>
                <SelectItem value="C4">C4 — Menganalisis</SelectItem>
                <SelectItem value="C5">C5 — Mengevaluasi</SelectItem>
                <SelectItem value="C6">C6 — Mencipta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="qf-question" className="text-xs">Pertanyaan</Label>
            <Textarea
              id="qf-question"
              name="qf-question"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              rows={3}
              placeholder="Tulis pertanyaan..."
            />
          </div>

          {/* ────────────────────────────────────────────────────────── */}
          {/* FORM SPESIFIK PER TIPE SOAL */}
          {/* ────────────────────────────────────────────────────────── */}

          {/* 1. PILIHAN GANDA — radio single choice */}
          {form.questionType === 'pilihan_ganda' && (
            <div className="space-y-2 p-3 bg-teal-50/50 border border-teal-200 rounded-lg">
              <Label className="text-xs font-semibold text-teal-800">
                Pilihan Jawaban (pilih satu yang benar)
              </Label>
              {(['A', 'B', 'C', 'D'] as const).map((letter, idx) => {
                const key = `option${letter}` as keyof typeof form
                return (
                  <div key={letter} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={form.correctAnswer === idx}
                      onChange={() => setForm({ ...form, correctAnswer: idx })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold w-6">{letter}.</span>
                    <Input
                      value={form[key] as string}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={`Opsi ${letter}`}
                      className="flex-1 min-w-0"
                    />
                  </div>
                )
              })}
              <p className="text-xs text-teal-700">✓ Tandai radio button di samping opsi yang benar.</p>
            </div>
          )}

          {/* 2. PILIHAN GANDA KOMPLEKS — checkbox multi choice */}
          {form.questionType === 'pilihan_ganda_kompleks' && (
            <div className="space-y-2 p-3 bg-sky-50/50 border border-sky-200 rounded-lg">
              <Label className="text-xs font-semibold text-sky-800">
                Pilihan Jawaban (centang SEMUA yang benar)
              </Label>
              {(['A', 'B', 'C', 'D'] as const).map((letter, idx) => {
                const key = `option${letter}` as keyof typeof form
                const checked = form.correctAnswers.includes(idx)
                return (
                  <div key={letter} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const next = checked
                          ? form.correctAnswers.filter((x) => x !== idx)
                          : [...form.correctAnswers, idx]
                        setForm({ ...form, correctAnswers: next })
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold w-6">{letter}.</span>
                    <Input
                      value={form[key] as string}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={`Opsi ${letter}`}
                      className="flex-1 min-w-0"
                    />
                  </div>
                )
              })}
              <p className="text-xs text-sky-700">
                ✓ Terpilih <strong>{form.correctAnswers.length}</strong> jawaban benar.
                Minimal 2 (karena ini PG Kompleks).
              </p>
            </div>
          )}

          {/* 3. ISIAN SINGKAT — text input + accepted answers */}
          {form.questionType === 'isian_singkat' && (
            <div className="space-y-2 p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
              <Label className="text-xs font-semibold text-emerald-800">
                Jawaban yang diterima (pisahkan dengan tanda |)
              </Label>
              <Input
                value={form.shortAnswer}
                onChange={(e) => setForm({ ...form, shortAnswer: e.target.value })}
                placeholder="contoh: jakarta|Jakarta|JAKARTA|dki jakarta"
                className="font-mono"
              />
              <p className="text-xs text-emerald-700">
                💡 Siswa dianggap benar jika jawaban cocok dengan salah satu alternatif (case-insensitive).
                Gunakan <code className="bg-emerald-100 px-1 rounded">|</code> sebagai pemisah antar alternatif.
              </p>
              <div className="mt-2 text-xs text-slate-600">
                <p className="font-semibold mb-1">Preview alternatif jawaban:</p>
                <div className="flex flex-wrap gap-1">
                  {form.shortAnswer.split('|').filter(Boolean).map((ans, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white border border-emerald-200 rounded text-xs">
                      {ans.trim()}
                    </span>
                  ))}
                  {form.shortAnswer.split('|').filter(Boolean).length === 0 && (
                    <span className="text-slate-400 italic">Belum ada jawaban</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. MENCOCOKKAN — dynamic list of key-value pairs */}
          {form.questionType === 'mencocokkan' && (
            <div className="space-y-2 p-3 bg-purple-50/50 border border-purple-200 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-purple-800">
                  Pasangan Item (kiri = pertanyaan, kanan = jawaban)
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setForm({
                    ...form,
                    matchPairs: [...form.matchPairs, { key: '', value: '' }],
                  })}
                >
                  + Tambah Pasangan
                </Button>
              </div>
              {form.matchPairs.map((pair, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-6">{idx + 1}.</span>
                  <Input
                    value={pair.key}
                    onChange={(e) => {
                      const next = [...form.matchPairs]
                      next[idx] = { ...next[idx], key: e.target.value }
                      setForm({ ...form, matchPairs: next })
                    }}
                    placeholder="Item kiri (prompt)"
                    className="flex-1 min-w-0"
                  />
                  <span className="text-purple-500">⇄</span>
                  <Input
                    value={pair.value}
                    onChange={(e) => {
                      const next = [...form.matchPairs]
                      next[idx] = { ...next[idx], value: e.target.value }
                      setForm({ ...form, matchPairs: next })
                    }}
                    placeholder="Item kanan (jawaban)"
                    className="flex-1 min-w-0"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                    onClick={() => {
                      const next = form.matchPairs.filter((_, i) => i !== idx)
                      setForm({ ...form, matchPairs: next })
                    }}
                    title="Hapus pasangan ini"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              {form.matchPairs.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-2">
                  Belum ada pasangan. Klik "+ Tambah Pasangan" untuk mulai.
                </p>
              )}
              <p className="text-xs text-purple-700">
                💡 Siswa akan melihat item kiri dalam urutan asli, tapi item kanan di-shuffle acak.
                Soal ini dinilai manual oleh guru.
              </p>
            </div>
          )}

          {/* 5. ESSAI — textarea rubric */}
          {form.questionType === 'essai' && (
            <div className="space-y-2 p-3 bg-amber-50/50 border border-amber-200 rounded-lg">
              <Label className="text-xs font-semibold text-amber-800">
                Rubric / Jawaban Contoh (untuk panduan penilaian guru)
              </Label>
              <Textarea
                value={form.essayAnswer}
                onChange={(e) => setForm({ ...form, essayAnswer: e.target.value })}
                rows={5}
                placeholder="Tulis jawaban contoh atau rubric penilaian di sini. Ini akan ditampilkan ke guru saat review jawaban siswa."
                className="font-mono text-xs"
              />
              <p className="text-xs text-amber-700">
                💡 Soal essai TIDAK di-auto-grade. Guru akan menilai manual via modal "Lihat Jawaban".
                Skor akhir = 60% PG + 40% rata-rata essai (jika ada essai di tugas).
              </p>
            </div>
          )}

          <div className="space-y-1">
            <Label htmlFor="qf-explanation" className="text-xs">
              Pembahasan {form.questionType === 'essai' || form.questionType === 'mencocokkan' ? '(opsional)' : '*'}
            </Label>
            <Textarea
              id="qf-explanation"
              name="qf-explanation"
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              rows={2}
              placeholder="Jelaskan mengapa jawaban tersebut benar..."
            />
          </div>

          {/* Upload Gambar Soal */}
          <div className="space-y-1">
            <Label className="text-xs">Gambar Soal (opsional)</Label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="question-image"
                name="question-image"
              />
              <Button variant="outline" size="sm" onClick={() => document.getElementById('question-image')?.click()}>
                <Upload className="w-3 h-3 mr-1" />Pilih Gambar
              </Button>
              {form.imageUrl && (
                <Button variant="outline" size="sm" className="text-red-600" onClick={() => setForm({ ...form, imageUrl: '' })}>
                  Hapus Gambar
                </Button>
              )}
            </div>
            {form.imageUrl && (
              <div className="mt-2">
                <img src={form.imageUrl} alt="Preview" className="max-h-32 rounded-lg border border-slate-200" />
                <p className="text-xs text-slate-400 mt-1">Preview gambar soal</p>
              </div>
            )}
            <p className="text-xs text-slate-400">Unggah gambar untuk soal bergambar (maks 500KB). Mendukung: flowchart, diagram, screenshot, dll.</p>
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
