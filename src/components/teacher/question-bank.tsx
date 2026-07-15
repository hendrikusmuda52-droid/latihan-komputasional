'use client'

import { useEffect, useState } from 'react'
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
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

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
}

const CATEGORIES = ['Dekomposisi', 'Pengenalan Pola', 'Abstraksi', 'Algoritma', 'Konsep Dasar']

export function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [filterGrade, setFilterGrade] = useState<string>('8')
  const [editing, setEditing] = useState<Question | null>(null)
  const [showForm, setShowForm] = useState(false)

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
                  <SelectItem value="8">Kelas 8</SelectItem>
                  <SelectItem value="9">Kelas 9</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchQuestions} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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
    </div>
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
  })
  const [saving, setSaving] = useState(false)

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
