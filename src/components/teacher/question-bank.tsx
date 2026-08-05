'use client'

import { useEffect, useState, useRef } from 'react'
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
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, RefreshCw, Download, Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { AIGenerateDialog } from './ai-generate-dialog'

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
}

const CATEGORIES = ['Dekomposisi', 'Pengenalan Pola', 'Abstraksi', 'Algoritma', 'Konsep Dasar', 'Internet', 'Etika Digital', 'Keamanan Digital', 'Kesehatan Digital']

export function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [filterGrade, setFilterGrade] = useState<string>('7')
  const [editing, setEditing] = useState<Question | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showAIGenerate, setShowAIGenerate] = useState(false)

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

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/questions?grade=${filterGrade}`)
      const data = await res.json()
      if (data.success) setQuestions(data.questions)
    } catch {
      toast.error('Gagal memuat soal')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterGrade])

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
            <div className="flex items-center gap-2">
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Kelas 7</SelectItem>
                  <SelectItem value="8">Kelas 8</SelectItem>
                  <SelectItem value="9">Kelas 9</SelectItem>
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
              Memuat...
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
                        <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700">
                          {q.category}
                        </Badge>
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
            <p className="text-xs text-blue-700 mb-3">
              Unduh template Excel, isi soal sesuai format di sheet "Soal". Baca panduan di sheet "Panduan".
            </p>
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
  const [form, setForm] = useState({
    gradeLevel: question?.gradeLevel ?? defaultGrade,
    question: question?.question ?? '',
    optionA: question?.optionA ?? '',
    optionB: question?.optionB ?? '',
    optionC: question?.optionC ?? '',
    optionD: question?.optionD ?? '',
    correctAnswer: question?.correctAnswer ?? 0,
    explanation: question?.explanation ?? '',
    category: question?.category ?? 'Dekomposisi',
    imageUrl: question?.imageUrl ?? '',
  })
  const [saving, setSaving] = useState(false)

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
    if (!form.question || !form.optionA || !form.optionB || !form.optionC || !form.optionD || !form.explanation) {
      toast.error('Semua field wajib diisi')
      return
    }
    setSaving(true)
    try {
      const url = question ? `/api/questions/${question.id}` : '/api/questions'
      const method = question ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Jenjang Kelas</Label>
              <Select
                value={form.gradeLevel}
                onValueChange={(v) => setForm({ ...form, gradeLevel: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Kelas 7</SelectItem>
                  <SelectItem value="8">Kelas 8</SelectItem>
                  <SelectItem value="9">Kelas 9</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Kategori</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Pertanyaan</Label>
            <Textarea
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              rows={3}
              placeholder="Tulis pertanyaan..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Pilihan Jawaban (pilih yang benar)</Label>
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
                    className="flex-1"
                  />
                </div>
              )
            })}
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Pembahasan</Label>
            <Textarea
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
