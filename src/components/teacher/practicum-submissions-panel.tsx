'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  DialogDescription,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from 'sonner'
import {
  Eye,
  Loader2,
  Search,
  CheckCircle2,
  XCircle,
  Send,
  Save,
  Calculator,
  Table as TableIcon,
} from 'lucide-react'

interface Teacher {
  id?: string
  teacherId?: string
  username: string
  name: string
  role?: string
  subject?: string
  kelasDiampu?: string
}

interface PracticumSubmission {
  id: string
  studentId: string
  assignmentId: string
  subject: string
  kelas: string
  spreadsheetData: string
  formulasUsed: string
  infoAnswers: string
  formulaScore: number
  infoScore: number
  totalScore: number
  manualGrade: number | null
  finalScore: number
  gradingDetails: string
  durationSec: number
  isSubmitted: boolean
  isGraded: boolean
  isReleased: boolean
  submittedAt: string | null
  createdAt: string
  updatedAt: string
  student: { id: string; namaLengkap: string; nisn: string; kelas: string }
  assignment: { id: string; title: string; subject: string; duration: number | null }
}

// Cell address helpers (duplicate of practicum-stage)
function toAddr(row: number, col: number): string {
  let c = col + 1
  let s = ''
  while (c > 0) {
    const rem = (c - 1) % 26
    s = String.fromCharCode(65 + rem) + s
    c = Math.floor((c - 1) / 26)
  }
  return s + (row + 1)
}

const ROWS = 30
const COLS = 13

export function PracticumSubmissionsPanel({ teacher }: { teacher: Teacher }) {
  const [submissions, setSubmissions] = useState<PracticumSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterAssignment, setFilterAssignment] = useState<string>('ALL')
  const [filterKelas, setFilterKelas] = useState<string>('ALL')
  const [assignments, setAssignments] = useState<{ id: string; title: string }[]>([])
  const [reviewId, setReviewId] = useState<string | null>(null)
  const [reviewData, setReviewData] = useState<PracticumSubmission | null>(null)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [manualGradeInput, setManualGradeInput] = useState<string>('')
  const [savingGrade, setSavingGrade] = useState(false)

  // Fetch list of practicum assignments (with taskType practicum_spreadsheet)
  useEffect(() => {
    fetch('/api/assignments?taskType=practicum_spreadsheet')
      .then((r) => r.json())
      .then((data) => {
        if (data.assignments) {
          setAssignments(data.assignments.map((a: any) => ({ id: a.id, title: a.title })))
        }
      })
      .catch((e) => console.error(e))
  }, [])

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterAssignment !== 'ALL') params.set('assignmentId', filterAssignment)
      if (filterKelas !== 'ALL') params.set('kelas', filterKelas)
      params.set('subject', teacher.subject || 'Informatika')
      const res = await fetch(`/api/practicum/list?${params.toString()}`)
      const data = await res.json()
      if (res.ok) {
        setSubmissions(data.submissions || [])
      } else {
        toast.error(data.error || 'Gagal memuat data')
      }
    } catch (e) {
      toast.error('Gagal memuat submissions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [filterAssignment, filterKelas, teacher.subject])

  // Filtered by search query
  const filtered = useMemo(() => {
    if (!searchQuery) return submissions
    const q = searchQuery.toLowerCase()
    return submissions.filter(
      (s) =>
        s.student?.namaLengkap?.toLowerCase().includes(q) ||
        s.student?.nisn?.toLowerCase().includes(q) ||
        s.assignment?.title?.toLowerCase().includes(q)
    )
  }, [submissions, searchQuery])

  // Open review modal
  const openReview = async (id: string) => {
    setReviewId(id)
    setReviewLoading(true)
    setReviewData(null)
    try {
      const res = await fetch(`/api/practicum/review?id=${id}`)
      const data = await res.json()
      if (res.ok) {
        setReviewData(data.submission)
        setManualGradeInput(
          data.submission.manualGrade !== null ? String(data.submission.manualGrade) : ''
        )
      } else {
        toast.error(data.error || 'Gagal memuat detail')
      }
    } catch (e) {
      toast.error('Gagal memuat detail')
    } finally {
      setReviewLoading(false)
    }
  }

  // Save manual grade
  const handleSaveGrade = async (release: boolean = false) => {
    if (!reviewId) return
    setSavingGrade(true)
    try {
      const body: any = {}
      if (manualGradeInput.trim() !== '') {
        const n = parseFloat(manualGradeInput)
        if (isNaN(n) || n < 0 || n > 100) {
          toast.error('Nilai harus 0-100')
          setSavingGrade(false)
          return
        }
        body.manualGrade = n
      }
      if (release) body.release = true
      const res = await fetch('/api/practicum/manual-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId: reviewId, ...body }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(release ? 'Nilai disimpan & dirilis' : 'Nilai disimpan')
        // Refresh data
        if (data.submission) {
          setReviewData(data.submission)
        }
        fetchSubmissions()
      } else {
        toast.error(data.error || 'Gagal menyimpan')
      }
    } catch (e) {
      toast.error('Gagal menyimpan')
    } finally {
      setSavingGrade(false)
    }
  }

  // ── Render: Spreadsheet preview dari submission ──
  const renderSpreadsheet = (submission: PracticumSubmission) => {
    let sheet: { cells: Record<string, any> } = { cells: {} }
    try {
      sheet = JSON.parse(submission.spreadsheetData)
    } catch {
      return <p className="text-sm text-slate-500">Tidak ada data spreadsheet</p>
    }
    const cells = sheet.cells || {}

    return (
      <div className="border border-slate-300 rounded-lg overflow-auto max-h-[400px] bg-white">
        <table className="border-collapse" style={{ fontSize: '10px' }}>
          <thead className="sticky top-0">
            <tr>
              <th className="border bg-slate-100 px-1 py-0.5 w-8 sticky left-0 z-10"></th>
              {Array.from({ length: COLS }, (_, c) => (
                <th key={c} className="border bg-slate-100 px-2 py-0.5 min-w-[60px]">
                  {toAddr(0, c).match(/^([A-Z]+)/)?.[1]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }, (_, r) => (
              <tr key={r}>
                <th className="border bg-slate-100 px-1 py-0.5 text-center text-slate-500 sticky left-0 z-10">
                  {r + 1}
                </th>
                {Array.from({ length: COLS }, (_, c) => {
                  const addr = toAddr(r, c)
                  const cell = cells[addr]
                  let display = ''
                  let isFormula = false
                  if (cell?.f) {
                    isFormula = true
                    display = cell.f
                  } else if (cell?.v !== undefined && cell?.v !== null) {
                    display = String(cell.v)
                  }
                  return (
                    <td
                      key={c}
                      className={`border px-1 py-0.5 whitespace-nowrap ${
                        isFormula
                          ? 'bg-blue-50 text-blue-700 font-mono'
                          : display
                          ? 'text-slate-700'
                          : ''
                      }`}
                      title={isFormula ? `=${cell.f}` : display}
                    >
                      {display || '\u00A0'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // ── Render: Grading details ──
  const renderGradingDetails = (submission: PracticumSubmission) => {
    let details: { formulaResults: any[]; infoResults: any[] } = {
      formulaResults: [],
      infoResults: [],
    }
    try {
      details = JSON.parse(submission.gradingDetails)
    } catch {}

    const formulaResults = details.formulaResults || []
    const infoResults = details.infoResults || []

    // Group formula results by category
    const byCategory: Record<string, any[]> = {}
    formulaResults.forEach((r) => {
      if (!byCategory[r.category || 'other']) byCategory[r.category || 'other'] = []
      byCategory[r.category || 'other'].push(r)
    })

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 border rounded bg-emerald-50">
            <p className="text-xs text-slate-500">Formula Score</p>
            <p className="text-lg font-bold text-emerald-700">{submission.formulaScore}/100</p>
          </div>
          <div className="p-2 border rounded bg-blue-50">
            <p className="text-xs text-slate-500">Info Score</p>
            <p className="text-lg font-bold text-blue-700">{submission.infoScore}/100</p>
          </div>
          <div className="p-2 border rounded bg-amber-50">
            <p className="text-xs text-slate-500">Total (70% + 30%)</p>
            <p className="text-lg font-bold text-amber-700">{submission.totalScore}/100</p>
          </div>
        </div>

        {/* Formula grading per-criterion */}
        <div>
          <h4 className="text-sm font-bold mb-2">Detail Penilaian Formula</h4>
          {['sum', 'average', 'if', 'vlookup', 'hlookup', 'countif', 'rank'].map((cat) => {
            const items = byCategory[cat]
            if (!items || items.length === 0) return null
            const correctCount = items.filter((i) => i.correct).length
            return (
              <div key={cat} className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="uppercase">{cat}</Badge>
                  <span className="text-xs text-slate-500">
                    {correctCount}/{items.length} benar
                  </span>
                </div>
                <div className="ml-3 space-y-1">
                  {items.map((r) => (
                    <div key={r.criterionId} className="text-xs flex items-start gap-1">
                      {r.correct ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={r.correct ? 'text-slate-700' : 'text-red-700'}>
                        <strong>{r.cell}</strong>: {r.reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Info grading */}
        {infoResults.length > 0 && (
          <div>
            <h4 className="text-sm font-bold mb-2">Jawaban Pertanyaan Informasi</h4>
            <div className="space-y-1">
              {infoResults.map((r) => (
                <div key={r.questionId} className="text-xs flex items-start gap-1 p-1.5 border rounded">
                  {r.correct ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-slate-700">{r.question}</p>
                    <p className="mt-0.5">
                      <strong>Jawaban siswa:</strong> {r.actualAnswer || '(kosong)'}
                    </p>
                    {!r.correct && r.expectedAnswer && (
                      <p className="text-slate-500">
                        <strong>Seharusnya:</strong> {r.expectedAnswer}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 mt-0.5">
                      Nilai: {r.earnedPoints}/{r.points}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            Ujian Praktek — Spreadsheet Kelas 8
          </CardTitle>
          <p className="text-sm text-slate-500">
            Review submission praktikum siswa. Sistem meng-auto-grade berdasarkan
            penggunaan formula yang tepat. Anda dapat memberi nilai manual override.
          </p>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Cari siswa (nama / NISN)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterAssignment} onValueChange={setFilterAssignment}>
              <SelectTrigger className="w-[260px]">
                <SelectValue placeholder="Semua tugas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Tugas Praktikum</SelectItem>
                {assignments.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterKelas} onValueChange={setFilterKelas}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua</SelectItem>
                <SelectItem value="8A">8A</SelectItem>
                <SelectItem value="8B">8B</SelectItem>
                <SelectItem value="8C">8C</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchSubmissions} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
            </Button>
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-4 gap-2 mb-4 text-center">
            <div className="p-2 border rounded">
              <p className="text-xs text-slate-500">Total Submission</p>
              <p className="text-xl font-bold">{filtered.length}</p>
            </div>
            <div className="p-2 border rounded">
              <p className="text-xs text-slate-500">Sudah Submit</p>
              <p className="text-xl font-bold text-emerald-600">
                {filtered.filter((s) => s.isSubmitted).length}
              </p>
            </div>
            <div className="p-2 border rounded">
              <p className="text-xs text-slate-500">Draft (Belum Submit)</p>
              <p className="text-xl font-bold text-amber-600">
                {filtered.filter((s) => !s.isSubmitted).length}
              </p>
            </div>
            <div className="p-2 border rounded">
              <p className="text-xs text-slate-500">Rata-rata Nilai</p>
              <p className="text-xl font-bold text-blue-600">
                {filtered.length > 0
                  ? (
                      filtered.reduce((s, x) => s + (x.finalScore || 0), 0) /
                      filtered.filter((x) => x.isSubmitted).length || 0
                    ).toFixed(1)
                  : 0}
              </p>
            </div>
          </div>

          {/* Submissions table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Siswa</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Tugas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Formula</TableHead>
                <TableHead className="text-center">Info</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Final</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-slate-400 py-8">
                    {loading
                      ? 'Memuat data...'
                      : 'Belum ada submission praktikum untuk filter ini.'}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{s.student?.namaLengkap}</p>
                        <p className="text-xs text-slate-500">NISN: {s.student?.nisn}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{s.kelas}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{s.assignment?.title}</TableCell>
                    <TableCell>
                      {s.isSubmitted ? (
                        <Badge className="bg-emerald-100 text-emerald-700">
                          <Send className="w-3 h-3 mr-1" />
                          Submitted
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700">Draft</Badge>
                      )}
                      {s.isReleased && (
                        <Badge className="ml-1 bg-blue-100 text-blue-700">Released</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-sm font-mono">
                      {s.formulaScore.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center text-sm font-mono">
                      {s.infoScore.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center text-sm font-mono">
                      {s.totalScore.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center">
                      {s.manualGrade !== null ? (
                        <span className="font-bold text-purple-600">
                          {s.manualGrade.toFixed(1)} ★
                        </span>
                      ) : (
                        <span className="text-slate-500">{s.finalScore.toFixed(1)}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => openReview(s.id)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Modal */}
      <Dialog
        open={!!reviewId}
        onOpenChange={(open) => {
          if (!open) {
            setReviewId(null)
            setReviewData(null)
          }
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Praktikum Siswa</DialogTitle>
            <DialogDescription>
              {reviewData
                ? `${reviewData.student?.namaLengkap} • ${reviewData.kelas} • ${reviewData.assignment?.title}`
                : 'Memuat...'}
            </DialogDescription>
          </DialogHeader>

          {reviewLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
            </div>
          ) : reviewData ? (
            <div className="space-y-4">
              {/* Stats summary */}
              {renderGradingDetails(reviewData)}

              {/* Spreadsheet preview */}
              <div>
                <h4 className="text-sm font-bold mb-2 flex items-center gap-1">
                  <TableIcon className="w-4 h-4" />
                  Spreadsheet Siswa (formulas)
                </h4>
                {renderSpreadsheet(reviewData)}
              </div>

              {/* Manual grade */}
              <div className="p-3 border-2 border-purple-200 rounded bg-purple-50">
                <h4 className="text-sm font-bold mb-2 text-purple-900">
                  Manual Grade Override (opsional)
                </h4>
                <p className="text-xs text-purple-700 mb-2">
                  Jika diisi, nilai ini akan menggantikan auto-grade. Kosongkan jika ingin
                  tetap menggunakan auto-grade.
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={manualGradeInput}
                    onChange={(e) => setManualGradeInput(e.target.value)}
                    placeholder="Nilai manual (0-100)"
                    className="w-40"
                  />
                  <Button onClick={() => handleSaveGrade(false)} disabled={savingGrade}>
                    <Save className="w-4 h-4 mr-1" />
                    Simpan
                  </Button>
                  <Button
                    onClick={() => handleSaveGrade(true)}
                    disabled={savingGrade}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Simpan & Rilis
                  </Button>
                </div>
                {reviewData.isReleased && (
                  <p className="text-xs text-blue-700 mt-2">
                    ✓ Nilai sudah dirilis ke siswa
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-slate-500">Gagal memuat data.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
