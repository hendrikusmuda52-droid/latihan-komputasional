'use client'

import { Component, useState, useMemo, useCallback, useEffect, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  RefreshCw, Plus, ClipboardList, Settings, AlertTriangle, TrendingUp, Save,
  PencilLine, Download, FileSpreadsheet, Calendar, AlertCircle,
  Target, ChevronRight, Pencil, Trash2, Check, X,
} from 'lucide-react'
import { toast } from 'sonner'
import { ALL_GRADES, TAHUN_AJARAN_OPTIONS, SEMESTER_OPTIONS, GRADE_CATEGORIES } from '@/lib/constants'
import { useResilientFetch } from '@/lib/use-resilient-fetch'

interface Student { id: string; namaLengkap: string; nisn: string; kelas: string; sekolah: string }
interface CalcResult {
  studentId: string; namaLengkap: string; nisn: string; kelas: string;
  NH: number; STS: number; SAS: number; NA: number; kkm: number; status: string;
}
interface Config { kkm: number; bobotNH: number; bobotSTS: number; bobotSAS: number }
// ── FIX: interface CP sesuai field API /api/cp (kodeCP, deskripsi, gradeLevel) ──
// Sebelumnya: code, description, chapter → tidak cocok dengan API → tampil "(tanpa judul)"
interface CP {
  id: string
  kodeCP: string
  deskripsi: string
  gradeLevel: string
  subject: string
  tps?: TP[]
}
interface TP { id: string; cpId: string; kodeTP: string; deskripsi: string }

interface BulkRow {
  studentId: string
  tugas: string  // Tugas Harian
  uh: string     // Ulangan Harian
  sts: string    // STS (MID)
  sas: string    // SAS (UAS)
}

const DEFAULT_CONFIG: Config = { kkm: 75, bobotNH: 40, bobotSTS: 30, bobotSAS: 30 }
const SAFE_GRADES = (ALL_GRADES || []) as readonly string[]
const SAFE_TA = (TAHUN_AJARAN_OPTIONS || ['2026/2027']) as readonly string[]
const SAFE_SEMESTER = (SEMESTER_OPTIONS || [{ value: 'ganjil', label: 'Ganjil' }]) as readonly { value: string; label: string }[]
const SAFE_GRADE_CATEGORIES = (GRADE_CATEGORIES || []) as readonly { value: string; label: string }[]

// Map gradeCategory → gradeType (used by /api/manual-grades)
const CATEGORY_TO_TYPE: Record<string, string> = {
  tugas_harian: 'tugas',
  ulangan_harian: 'uh',
  sts: 'sts',
  sas: 'sas',
}

/**
 * React Error Boundary — the ONLY correct way to catch render-time exceptions
 * in React. Wrapping JSX in try/catch does NOT work because React renders
 * asynchronously; this class catches the errors via getDerivedStateFromError +
 * componentDidCatch.
 */
interface ErrorBoundaryState { hasError: boolean; message: string }
class GradeBookErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(err: unknown): ErrorBoundaryState {
    return { hasError: true, message: err instanceof Error ? err.message : 'Unknown error' }
  }

  componentDidCatch(err: unknown, info: unknown) {
    console.error('[GradeBook] render crashed:', err, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <p className="text-sm font-semibold text-red-700">Komponen Daftar Nilai gagal dimuat</p>
            <p className="text-xs text-red-500 mt-1">{this.state.message}</p>
            <Button size="sm" variant="outline" className="mt-3" onClick={() => window.location.reload()}>
              <RefreshCw className="w-3 h-3 mr-1" />Muat Ulang
            </Button>
          </CardContent>
        </Card>
      )
    }
    return this.props.children
  }
}

export function GradeBook() {
  return (
    <GradeBookErrorBoundary>
      <GradeBookInner />
    </GradeBookErrorBoundary>
  )
}

function GradeBookInner() {
  // ── v2: Tahun Ajaran + Semester filters (mandatory at top) ──
  const [tahunAjaran, setTahunAjaran] = useState<string>('2026/2027')
  const [semester, setSemester] = useState<string>('ganjil')
  const [filterKelas, setFilterKelas] = useState('ALL')
  const [showAddGrade, setShowAddGrade] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // ── RESILIENT FETCH: students (filtered by kelas) ──
  const { data: studentsData, loading: loadingStudents, error: studentsError, refetch: refetchStudents, retryCount: retryStudents } = useResilientFetch<{
    success: boolean
    students: Student[]
  }>(`/api/teacher/students?kelas=${filterKelas}`, { deps: [filterKelas] })

  const students = studentsData?.students ?? []

  // ── RESILIENT FETCH: calculated grades ──
  const calcUrl = `/api/grades/calculate?kelas=${filterKelas !== 'ALL' ? filterKelas : ''}&tahunAjaran=${tahunAjaran}&semester=${semester}`
  const { data: calcData, loading: loadingCalc, error: calcError, refetch: refetchCalc, retryCount: retryCalc } = useResilientFetch<{
    success: boolean
    results: CalcResult[]
    config?: { kkm: number; bobotNH: number; bobotSTS: number; bobotSAS: number }
  }>(calcUrl, { deps: [filterKelas, tahunAjaran, semester] })

  const calcResults = calcData?.results ?? []
  const config = useMemo<Config>(() => {
    const c = calcData?.config
    if (c && typeof c === 'object') {
      return {
        kkm: typeof c.kkm === 'number' ? c.kkm : DEFAULT_CONFIG.kkm,
        bobotNH: typeof c.bobotNH === 'number' ? c.bobotNH : DEFAULT_CONFIG.bobotNH,
        bobotSTS: typeof c.bobotSTS === 'number' ? c.bobotSTS : DEFAULT_CONFIG.bobotSTS,
        bobotSAS: typeof c.bobotSAS === 'number' ? c.bobotSAS : DEFAULT_CONFIG.bobotSAS,
      }
    }
    return DEFAULT_CONFIG
  }, [calcData])

  // ── RESILIENT FETCH: CPs (loaded once) ──
  const { data: cpData } = useResilientFetch<{
    success: boolean
    cps: CP[]
    data?: CP[]
  }>('/api/cp', { deps: [] })

  const cps = cpData?.cps ?? cpData?.data ?? []

  // Combined loading state for backward compat with UI
  const loading = loadingStudents || loadingCalc
  const fetchData = useCallback(() => {
    refetchStudents()
    refetchCalc()
  }, [refetchStudents, refetchCalc])

  const classAvg = useMemo(() => {
    const arr = calcResults || []
    if (arr.length === 0) return 0
    return Math.round(arr.reduce((a, b) => a + (Number(b?.NA) || 0), 0) / arr.length * 10) / 10
  }, [calcResults])

  const remidiCount = useMemo(() => {
    const arr = calcResults || []
    return arr.filter(r => r?.status === 'Remidi').length
  }, [calcResults])

  // Radix Select forbids value="" — use "__none__" sentinel for placeholder.
  const [bulkKelas, setBulkKelas] = useState<string>('__none__')
  const [bulkRows, setBulkRows] = useState<BulkRow[]>([])
  const [bulkBabId, setBulkBabId] = useState<string>('__none__')
  const [bulkSaving, setBulkSaving] = useState(false)
  const [bulkStudents, setBulkStudents] = useState<Student[]>([])

  // v2: CP selector for "Export Per CP" button
  const [selectedCpId, setSelectedCpId] = useState<string>('__none__')
  const [exporting, setExporting] = useState(false)

  // ── NEW: State untuk Daftar Nilai per CP ──
  const [perCpData, setPerCpData] = useState<any>(null)
  const [perCpLoading, setPerCpLoading] = useState(false)
  const [expandedCPs, setExpandedCPs] = useState<Set<string>>(new Set())
  const [editingGrade, setEditingGrade] = useState<{ id: string; score: string } | null>(null)

  const fetchPerCp = useCallback(async () => {
    if (!filterKelas || filterKelas === 'ALL' || filterKelas === '__none__') {
      setPerCpData(null)
      return
    }
    setPerCpLoading(true)
    try {
      const res = await fetch(
        `/api/grades/per-cp?kelas=${encodeURIComponent(filterKelas)}&tahunAjaran=${tahunAjaran}&semester=${semester}`
      )
      const json = await res.json()
      setPerCpData(json)
    } catch (err) {
      console.error('[grade-book] fetchPerCp error:', err)
      setPerCpData({ success: false, cps: [] })
    } finally {
      setPerCpLoading(false)
    }
  }, [filterKelas, tahunAjaran, semester])

  useEffect(() => {
    fetchPerCp()
  }, [fetchPerCp])

  const toggleCP = (cpId: string) => {
    setExpandedCPs(prev => {
      const next = new Set(prev)
      if (next.has(cpId)) next.delete(cpId)
      else next.add(cpId)
      return next
    })
  }

  // Edit nilai manual (inline edit)
  const handleEditGrade = async (gradeId: string, newScore: string) => {
    try {
      const res = await fetch(`/api/manual-grades/${gradeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: Number(newScore) }),
      })
      if (res.ok) {
        toast.success('Nilai diperbarui')
        setEditingGrade(null)
        fetchPerCp()
      } else {
        toast.error('Gagal update nilai')
      }
    } catch {
      toast.error('Gagal update nilai')
    }
  }

  // Hapus nilai manual
  const handleDeleteGrade = async (gradeId: string) => {
    if (!confirm('Yakin ingin menghapus nilai ini?')) return
    try {
      const res = await fetch(`/api/manual-grades/${gradeId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Nilai dihapus')
        fetchPerCp()
      } else {
        toast.error('Gagal hapus nilai')
      }
    } catch {
      toast.error('Gagal hapus nilai')
    }
  }

  // try-catch + fallback arrays for the bulk class loader.
  const handleBulkKelasChange = useCallback(async (kelas: string) => {
    setBulkKelas(kelas)
    // __none__ and ALL both mean "no class selected".
    if (!kelas || kelas === 'ALL' || kelas === '__none__') {
      setBulkRows([]); setBulkStudents([]); return
    }
    try {
      const res = await fetch(`/api/teacher/students?kelas=${kelas}`)
      const data = await res.json()
      const list: Student[] = (data?.success && Array.isArray(data.students)) ? data.students : []
      setBulkStudents(list)
      setBulkRows(list.map((s: Student) => ({
        studentId: s?.id || '', tugas: '', uh: '', sts: '', sas: '',
      })))
    } catch (err) {
      console.error('[GradeBook] handleBulkKelasChange error:', err)
      setBulkStudents([])
      setBulkRows([])
      toast.error('Gagal memuat siswa untuk kelas ini')
    }
  }, [])

  const updateBulkRow = useCallback((studentId: string, field: keyof Omit<BulkRow, 'studentId'>, value: string) => {
    setBulkRows(prev => (prev || []).map(r => r.studentId === studentId ? { ...r, [field]: value } : r))
  }, [])

  // v2: handleBulkSave — POST grades array with cpId, tpId, tahunAjaran, semester.
  const handleBulkSave = useCallback(async () => {
    const grades: Array<{
      studentId: string; score: number; gradeType: string; gradeCategory: string;
      cpId: string | null; tpId: string | null; tahunAjaran: string; semester: string;
    }> = []
    // Convert "__none__" sentinel back to null before posting.
    const effectiveCpId = bulkBabId && bulkBabId !== '__none__' ? bulkBabId : null
    for (const row of (bulkRows || [])) {
      const push = (val: string, gradeType: string, gradeCategory: string) => {
        const n = parseFloat(val)
        if (val !== '' && !isNaN(n) && n >= 0 && n <= 100) {
          grades.push({
            studentId: row.studentId, score: n, gradeType, gradeCategory,
            cpId: effectiveCpId, tpId: null, tahunAjaran, semester,
          })
        }
      }
      push(row.tugas, 'tugas', 'tugas_harian')
      push(row.uh, 'uh', 'ulangan_harian')
      push(row.sts, 'sts', 'sts')
      push(row.sas, 'sas', 'sas')
    }

    if (grades.length === 0) { toast.warning('Tidak ada nilai yang diisi'); return }

    setBulkSaving(true)
    try {
      const res = await fetch('/api/manual-grades', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grades, isReleased: true, tahunAjaran, semester }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Gagal menyimpan')
      toast.success(`${data?.count || grades.length} nilai manual berhasil disimpan`)
      setBulkRows(prev => (prev || []).map(r => ({ ...r, tugas: '', uh: '', sts: '', sas: '' })))
      fetchData()
    } catch (err) {
      console.error('[GradeBook] handleBulkSave error:', err)
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan nilai')
    } finally { setBulkSaving(false) }
  }, [bulkRows, bulkBabId, tahunAjaran, semester, fetchData])

  // v2: handleExport — download Excel files for 3 export formats.
  const handleExport = useCallback(async (format: 'per_cp' | 'all_cp' | 'na_summary') => {
    try {
      let url = `/api/grades/export?format=${format}&tahunAjaran=${tahunAjaran}&semester=${semester}`
      if (format === 'per_cp') {
        if (!selectedCpId || selectedCpId === '__none__') {
          toast.error('Pilih CP terlebih dahulu sebelum export per CP')
          return
        }
        url += `&cpId=${selectedCpId}`
      }
      setExporting(true)
      toast.success('Mengekspor data... mohon tunggu')
      // Use anchor tag for download (lets browser handle the file response)
      const a = document.createElement('a')
      a.href = url
      a.download = ''
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error('[GradeBook] export error:', err)
      toast.error('Gagal mengekspor data')
    } finally {
      setExporting(false)
    }
  }, [tahunAjaran, semester, selectedCpId])

  const bulkFilledCount = useMemo(() => {
    const rows = bulkRows || []
    return rows.reduce((acc, r) => acc + ['tugas', 'uh', 'sts', 'sas'].filter(k => r[k as keyof BulkRow] !== '').length, 0)
  }, [bulkRows])

  // Defensive locals used during render — never read state directly without fallback.
  const safeCalcResults = calcResults || []
  const safeStudents = students || []
  const safeCps = cps || []
  const safeBulkStudents = bulkStudents || []
  const safeBulkRows = bulkRows || []

  return (
    <div className="space-y-4">
      {/* ── v2: Tahun Ajaran + Semester Filters (MANDATORY at top) ── */}
      <Card className="border-emerald-200 bg-emerald-50/40">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-slate-900">Periode Penilaian</span>
            <span className="text-xs text-slate-500 ml-1">(Tahun Ajaran & Semester — wajib dipilih sebelum input/export nilai)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Tahun Ajaran</Label>
              <Select value={tahunAjaran} onValueChange={setTahunAjaran}>
                <SelectTrigger><SelectValue placeholder="— Pilih Tahun Ajaran —" /></SelectTrigger>
                <SelectContent>
                  {SAFE_TA.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger><SelectValue placeholder="— Pilih Semester —" /></SelectTrigger>
                <SelectContent>
                  {SAFE_SEMESTER.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Total Siswa</div><p className="text-2xl font-bold text-slate-900">{safeCalcResults.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Rata-rata Kelas</div><p className="text-2xl font-bold text-emerald-600">{classAvg}</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">KKM Mapel</div><p className="text-2xl font-bold text-amber-600">{config?.kkm ?? 75}</p></CardContent></Card>
        <Card className={remidiCount > 0 ? 'border-red-300 bg-red-50' : ''}>
          <CardContent className="p-4"><div className="text-xs text-slate-500 mb-1">Remidi</div><p className={`text-2xl font-bold ${remidiCount > 0 ? 'text-red-600' : 'text-slate-900'}`}>{remidiCount}</p></CardContent></Card>
      </div>

      {/* Bobot Config Card (v2: NH/STS/SAS) */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold">Bobot Nilai:</span>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700">NH: {config?.bobotNH ?? 40}%</Badge>
            <Badge className="bg-purple-100 text-purple-700">STS: {config?.bobotSTS ?? 30}%</Badge>
            <Badge className="bg-pink-100 text-pink-700">SAS: {config?.bobotSAS ?? 30}%</Badge>
            <Badge className="bg-amber-100 text-amber-700">KKM: {config?.kkm ?? 75}</Badge>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowConfig(true)}>
            <Settings className="w-4 h-4 mr-1" />Atur Bobot & KKM
          </Button>
        </CardContent>
      </Card>

      {/* ── v2: Export Buttons Card ── */}
      <Card className="border-sky-200 bg-sky-50/30">
        <CardHeader className="bg-sky-900 text-white pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-white">
            <FileSpreadsheet className="w-4 h-4 text-sky-300" /> Export Nilai ke Excel
          </CardTitle>
          <p className="text-xs text-sky-200 mt-1">
            Ekspor rekap nilai berdasarkan Tahun Ajaran <strong>{tahunAjaran}</strong> Semester <strong>{semester}</strong>.
            File akan otomatis diunduh dalam format Excel (.xlsx).
          </p>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Export Per CP — needs CP selector */}
            <div className="space-y-2 border border-slate-200 rounded-lg p-3 bg-white">
              <Label className="text-xs font-semibold flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3" /> Export Per CP
              </Label>
              <Select value={selectedCpId} onValueChange={setSelectedCpId}>
                <SelectTrigger className="w-full"><SelectValue placeholder="— Pilih CP —" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__" disabled>— Pilih CP —</SelectItem>
                  {safeCps.map(c => c?.id ? <SelectItem key={c.id} value={c.id}>{c.kodeCP || c.deskripsi?.slice(0, 60) || `(CP ${c.id.slice(-4)})`}</SelectItem> : null)}
                </SelectContent>
              </Select>
              <Button
                size="sm" className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => handleExport('per_cp')}
                disabled={exporting || safeCps.length === 0}
              >
                <Download className="w-3.5 h-3.5 mr-1" />Download
              </Button>
            </div>

            {/* Export Semua CP */}
            <div className="space-y-2 border border-slate-200 rounded-lg p-3 bg-white">
              <Label className="text-xs font-semibold flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3" /> Export Semua CP
              </Label>
              <p className="text-xs text-slate-500 h-9 flex items-center">
                Rekap nilai semua CP untuk periode {tahunAjaran} {semester}.
              </p>
              <Button
                size="sm" className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => handleExport('all_cp')}
                disabled={exporting}
              >
                <Download className="w-3.5 h-3.5 mr-1" />Download
              </Button>
            </div>

            {/* Export Nilai Akhir */}
            <div className="space-y-2 border border-slate-200 rounded-lg p-3 bg-white">
              <Label className="text-xs font-semibold flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3" /> Export Nilai Akhir
              </Label>
              <p className="text-xs text-slate-500 h-9 flex items-center">
                Rekap NA (NH, STS, SAS, NA, Status) untuk seluruh kelas.
              </p>
              <Button
                size="sm" className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => handleExport('na_summary')}
                disabled={exporting}
              >
                <Download className="w-3.5 h-3.5 mr-1" />Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BULK MANUAL GRADE INPUT FORM (v2) */}
      <Card className="border-slate-900 shadow-md">
        <CardHeader className="bg-slate-900 text-white pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <PencilLine className="w-4 h-4 text-emerald-400" /> Input Nilai Manual (Luring)
            </CardTitle>
            <Button
              size="sm"
              className="bg-black hover:bg-slate-800 text-white border border-white/20"
              onClick={handleBulkSave}
              disabled={bulkSaving || safeBulkRows.length === 0}
            >
              <Save className="w-4 h-4 mr-1" />
              {bulkSaving ? 'Menyimpan...' : 'Simpan Nilai Manual'}
            </Button>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Pilih kelas untuk memunculkan daftar siswa. Isi kolom nilai (0-100) sesuai jenis penilaian.
            Kolom: Tugas Harian, Ulangan Harian, STS (MID), SAS (UAS). Bobot nilai (NH/STS/SAS) dihitung otomatis.
            Periode: <strong className="text-emerald-300">{tahunAjaran} — {semester}</strong>
          </p>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Pilih Kelas *</Label>
              <Select value={bulkKelas} onValueChange={handleBulkKelasChange}>
                <SelectTrigger><SelectValue placeholder="— Pilih Kelas —" /></SelectTrigger>
                <SelectContent>
                  {/* Radix forbids value="" — use __none__ sentinel */}
                  <SelectItem value="__none__" disabled>— Pilih Kelas —</SelectItem>
                  {SAFE_GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">CP / Bab (opsional — untuk Tugas Harian & Ulangan Harian)</Label>
              <Select value={bulkBabId} onValueChange={setBulkBabId}>
                <SelectTrigger><SelectValue placeholder="— Tanpa CP (umum) —" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">— Tanpa CP (umum) —</SelectItem>
                  {(safeCps || []).map(c => c?.id ? <SelectItem key={c.id} value={c.id}>{c.kodeCP || c.deskripsi?.slice(0, 60) || '(tanpa judul)'}</SelectItem> : null)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk input table */}
          {!bulkKelas || bulkKelas === 'ALL' || bulkKelas === '__none__' ? (
            <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Pilih kelas di atas untuk memunculkan tabel siswa</p>
              <p className="text-xs mt-1">Tabel akan terisi otomatis dengan nama-nama siswa yang terdaftar di kelas tersebut</p>
            </div>
          ) : safeBulkStudents.length === 0 ? (
            <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              <p className="text-sm font-medium">Belum ada siswa terdaftar di kelas {bulkKelas}</p>
              <p className="text-xs mt-1">Tambahkan siswa lewat menu "Data Siswa" terlebih dahulu</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Menampilkan <strong>{safeBulkStudents.length}</strong> siswa dari kelas <Badge variant="outline">{bulkKelas}</Badge></span>
                <span className="text-slate-500">{bulkFilledCount} nilai terisi</span>
              </div>
              <div className="overflow-x-auto max-h-[450px] overflow-y-auto border border-slate-200 rounded-lg">
                <Table>
                  <TableHeader className="sticky top-0 bg-slate-100 z-10">
                    <TableRow>
                      <TableHead className="w-10">No</TableHead>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead className="text-center w-32">Tugas Harian</TableHead>
                      <TableHead className="text-center w-32">Ulangan Harian</TableHead>
                      <TableHead className="text-center w-28">STS (MID)</TableHead>
                      <TableHead className="text-center w-28">SAS (UAS)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(safeBulkStudents || []).map((s, i) => {
                      if (!s?.id) return null
                      const row = safeBulkRows.find(r => r.studentId === s.id)
                      if (!row) return null
                      return (
                        <TableRow key={s.id}>
                          <TableCell className="text-slate-400 text-xs">{i + 1}</TableCell>
                          <TableCell>
                            <div className="font-medium text-slate-900">{s.namaLengkap || '-'}</div>
                            <div className="text-xs text-slate-500">NISN: {s.nisn || '-'}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Input type="number" min="0" max="100" placeholder="—" value={row.tugas}
                              onChange={e => updateBulkRow(s.id, 'tugas', e.target.value)}
                              className="w-20 mx-auto text-center" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input type="number" min="0" max="100" placeholder="—" value={row.uh}
                              onChange={e => updateBulkRow(s.id, 'uh', e.target.value)}
                              className="w-20 mx-auto text-center" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input type="number" min="0" max="100" placeholder="—" value={row.sts}
                              onChange={e => updateBulkRow(s.id, 'sts', e.target.value)}
                              className="w-20 mx-auto text-center" />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input type="number" min="0" max="100" placeholder="—" value={row.sas}
                              onChange={e => updateBulkRow(s.id, 'sas', e.target.value)}
                              className="w-20 mx-auto text-center" />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-black hover:bg-slate-800 text-white"
                  onClick={handleBulkSave}
                  disabled={bulkSaving || safeBulkRows.length === 0 || bulkFilledCount === 0}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {bulkSaving ? 'Menyimpan...' : `Simpan ${bulkFilledCount} Nilai Manual`}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ── NEW: Daftar Nilai per CP (collapsible) ── */}
      <Card className="border-2 border-teal-200">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-sky-50 pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="w-4 h-4 text-teal-600" />
              Daftar Nilai per CP
            </CardTitle>
            <div className="flex items-center gap-2">
              {filterKelas !== 'ALL' && filterKelas !== '__none__' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchPerCp}
                  disabled={perCpLoading}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${perCpLoading ? 'animate-spin' : ''} mr-1`} />
                  Refresh
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Nilai siswa per Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP).
            Klik CP untuk expand/collapse detail nilai per TP.
            {filterKelas === 'ALL' && ' ⚠ Pilih kelas dulu untuk menampilkan data.'}
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          {filterKelas === 'ALL' || filterKelas === '__none__' ? (
            <div className="py-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
              <Target className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Pilih kelas di atas untuk menampilkan nilai per CP</p>
            </div>
          ) : perCpLoading ? (
            <div className="py-8 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat data nilai per CP...</p>
            </div>
          ) : !perCpData?.cps || perCpData.cps.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm">Belum ada data CP atau nilai untuk kelas {filterKelas}</p>
              <p className="text-xs mt-1">Pastikan CP/TP sudah dibuat di menu "CP & TP Manager"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {perCpData.cps.map((cp: any) => {
                const hasData = cp.tps.some((tp: any) => tp.jumlahTugas > 0 || tp.jumlahUH > 0)
                const isExpanded = expandedCPs.has(cp.cpId)
                return (
                  <div
                    key={cp.cpId}
                    className={`rounded-lg border-2 ${isExpanded ? 'border-teal-300' : 'border-slate-200'} overflow-hidden`}
                  >
                    {/* CP Header — clickable to expand */}
                    <button
                      onClick={() => toggleCP(cp.cpId)}
                      className={`w-full flex items-center justify-between p-3 text-left ${isExpanded ? 'bg-teal-50' : 'bg-slate-50'} hover:bg-teal-100 transition-colors`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <ChevronRight className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Badge variant="outline" className="text-xs bg-white">
                              {cp.kodeCP}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-white">
                              Kelas {cp.gradeLevel}
                            </Badge>
                            {hasData && (
                              <Badge className={`text-xs ${cp.nhCP >= (config?.kkm || 75) ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                NH: {cp.nhCP}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 truncate">{cp.deskripsi}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="text-xs text-slate-500">
                          {cp.tps.filter((t: any) => t.jumlahTugas > 0 || t.jumlahUH > 0).length}/{cp.tps.length} TP
                        </p>
                      </div>
                    </button>

                    {/* TP Detail — expandable */}
                    {isExpanded && (
                      <div className="p-3 space-y-3 bg-white">
                        {cp.tps.map((tp: any) => {
                          const tpHasData = tp.jumlahTugas > 0 || tp.jumlahUH > 0
                          return (
                            <div key={tp.tpId} className="border border-slate-200 rounded-lg overflow-hidden">
                              {/* TP Header */}
                              <div className="bg-slate-50 px-3 py-2 flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">{tp.kodeTP}</Badge>
                                    <p className="text-xs font-medium text-slate-700 truncate">
                                      {tp.deskripsi}
                                    </p>
                                  </div>
                                </div>
                                {tpHasData && (
                                  <div className="flex items-center gap-2 text-xs ml-2">
                                    <span className="text-slate-500">
                                      Tugas: <b className="text-slate-700">{tp.avgTugas}</b>
                                    </span>
                                    <span className="text-slate-500">
                                      UH: <b className="text-slate-700">{tp.avgUH}</b>
                                    </span>
                                    <Badge className="text-xs bg-teal-100 text-teal-700">
                                      NH: {tp.nhTP}
                                    </Badge>
                                  </div>
                                )}
                              </div>

                              {/* Student grades table */}
                              {tpHasData || true ? (
                                <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                                  <Table>
                                    <TableHeader className="sticky top-0 bg-white z-10">
                                      <TableRow>
                                        <TableHead className="w-8">#</TableHead>
                                        <TableHead>Nama Siswa</TableHead>
                                        <TableHead className="text-center">Nilai</TableHead>
                                        <TableHead className="text-center w-20">Jenis</TableHead>
                                        <TableHead className="text-center w-24">Aksi</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {tp.students.map((s: any, idx: number) => {
                                        if (s.grades.length === 0) {
                                          return (
                                            <TableRow key={s.studentId} className="text-slate-400">
                                              <TableCell className="text-xs">{idx + 1}</TableCell>
                                              <TableCell>
                                                <div className="text-sm">{s.namaLengkap}</div>
                                                <div className="text-xs text-slate-400">NISN: {s.nisn}</div>
                                              </TableCell>
                                              <TableCell colSpan={3} className="text-center text-xs italic">
                                                Belum ada nilai
                                              </TableCell>
                                            </TableRow>
                                          )
                                        }
                                        return s.grades.map((g: any, gIdx: number) => (
                                          <TableRow key={`${s.studentId}-${g.id}`}>
                                            <TableCell className="text-xs text-slate-400">
                                              {gIdx === 0 ? idx + 1 : ''}
                                            </TableCell>
                                            <TableCell>
                                              {gIdx === 0 && (
                                                <>
                                                  <div className="text-sm font-medium">{s.namaLengkap}</div>
                                                  <div className="text-xs text-slate-400">NISN: {s.nisn}</div>
                                                </>
                                              )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                              {editingGrade?.id === g.id && editingGrade ? (
                                                <Input
                                                  type="number"
                                                  min="0"
                                                  max="100"
                                                  value={editingGrade.score}
                                                  onChange={(e) => setEditingGrade({ id: editingGrade.id, score: e.target.value })}
                                                  className="w-16 text-center mx-auto"
                                                  autoFocus
                                                />
                                              ) : (
                                                <span className={`font-semibold ${g.kind === 'auto' ? 'text-sky-600' : 'text-slate-700'}`}>
                                                  {g.score}
                                                </span>
                                              )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                              <Badge
                                                variant="outline"
                                                className={`text-xs ${
                                                  g.kind === 'auto'
                                                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                                                    : 'bg-violet-50 text-violet-700 border-violet-200'
                                                }`}
                                              >
                                                {g.kind === 'auto' ? '🖥️ Daring' : '📝 Manual'}
                                              </Badge>
                                              <div className="text-xs text-slate-400 mt-0.5">
                                                {g.gradeCategory === 'tugas_harian' ? 'Tugas' :
                                                  g.gradeCategory === 'ulangan_harian' ? 'UH' :
                                                  g.gradeCategory === 'sts' ? 'STS' :
                                                  g.gradeCategory === 'sas' ? 'SAS' : '-'}
                                              </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                              {editingGrade?.id === g.id && editingGrade ? (
                                                <div className="flex gap-1 justify-center">
                                                  <Button
                                                    size="sm"
                                                    className="h-7 px-2 bg-emerald-600 hover:bg-emerald-700"
                                                    onClick={() => handleEditGrade(g.id, editingGrade.score)}
                                                  >
                                                    <Check className="w-3 h-3" />
                                                  </Button>
                                                  <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-7 px-2"
                                                    onClick={() => setEditingGrade(null)}
                                                  >
                                                    <X className="w-3 h-3" />
                                                  </Button>
                                                </div>
                                              ) : g.kind === 'manual' ? (
                                                <div className="flex gap-1 justify-center">
                                                  <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-7 px-2"
                                                    onClick={() => setEditingGrade({ id: g.id, score: String(g.score) })}
                                                  >
                                                    <Pencil className="w-3 h-3" />
                                                  </Button>
                                                  <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-7 px-2 text-red-600 hover:text-red-700"
                                                    onClick={() => handleDeleteGrade(g.id)}
                                                  >
                                                    <Trash2 className="w-3 h-3" />
                                                  </Button>
                                                </div>
                                              ) : (
                                                <span className="text-xs text-slate-400 italic">otomatis</span>
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        ))
                                      })}
                                    </TableBody>
                                  </Table>
                                </div>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabel Nilai Akhir (v2: NH/STS/SAS) */}
      <Card>
        <CardHeader className="bg-slate-50 pb-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="w-4 h-4 text-emerald-600" /> Daftar Nilai Akhir (NA)
            </CardTitle>
            <div className="flex gap-2">
              <Select value={filterKelas} onValueChange={setFilterKelas}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Semua</SelectItem>
                  {SAFE_GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            NA = (NH × {config?.bobotNH ?? 40}%) + (STS × {config?.bobotSTS ?? 30}%) + (SAS × {config?.bobotSAS ?? 30}%).
            NH = rata-rata nilai Tugas Harian & Ulangan Harian per CP. Periode: <strong>{tahunAjaran} — {semester}</strong>.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {/* ── LOADING STATE ── */}
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin mb-2" />
              <p className="text-sm">Memuat data nilai...</p>
              {(retryStudents > 0 || retryCalc > 0) && (
                <p className="text-xs mt-1 text-amber-600">
                  Mencoba ulang ({Math.max(retryStudents, retryCalc)}/2)...
                </p>
              )}
            </div>
          ) : /* ── ERROR STATE ── */
          (studentsError || calcError) ? (
            <div className="py-16 text-center">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
              <p className="font-medium text-red-600 mb-1">Gagal memuat data</p>
              <p className="text-xs text-slate-500 mb-3">{studentsError || calcError}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchData}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Coba Muat Ulang
              </Button>
            </div>
          ) : /* ── EMPTY STATE ── */
          safeCalcResults.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Belum ada nilai</p>
              <p className="text-xs mt-1">Nilai akan muncul setelah siswa mengerjakan tugas daring atau setelah Anda input nilai manual di atas.</p>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10">
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-center">NH</TableHead>
                    <TableHead className="text-center hidden md:table-cell">STS</TableHead>
                    <TableHead className="text-center hidden md:table-cell">SAS</TableHead>
                    <TableHead className="text-center">NA</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(safeCalcResults || []).map((r) => {
                    if (!r?.studentId) return null
                    const kkm = r.kkm ?? config?.kkm ?? 75
                    return (
                      <TableRow key={r.studentId} className={r.status === 'Remidi' ? 'bg-red-50' : ''}>
                        <TableCell><div className="font-medium">{r.namaLengkap || '-'}</div><div className="text-xs text-slate-500">{r.nisn || '-'}</div></TableCell>
                        <TableCell><Badge variant="outline">{r.kelas || '-'}</Badge></TableCell>
                        <TableCell className="text-center font-semibold text-emerald-600">{r.NH ?? '-'}</TableCell>
                        <TableCell className="text-center hidden md:table-cell font-semibold text-purple-600">{r.STS ?? '-'}</TableCell>
                        <TableCell className="text-center hidden md:table-cell font-semibold text-pink-600">{r.SAS ?? '-'}</TableCell>
                        <TableCell className="text-center"><span className={`text-lg font-bold ${(r.NA || 0) >= kkm ? 'text-emerald-600' : 'text-red-600'}`}>{r.NA ?? '-'}</span></TableCell>
                        <TableCell className="text-center">
                          {(r.NA || 0) > 0 && r.NA < kkm ? (
                            <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Remidi</Badge>
                          ) : (r.NA || 0) > 0 ? (
                            <Badge className="bg-emerald-100 text-emerald-700"><TrendingUp className="w-3 h-3 mr-1" />Tuntas</Badge>
                          ) : (
                            <span className="text-slate-300 text-xs">Belum ada nilai</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button size="sm" variant="outline" onClick={() => {
                            const s = safeStudents.find(s => s.id === r.studentId)
                            if (s) { setSelectedStudent(s); setShowAddGrade(true) }
                          }}><Plus className="w-3 h-3 mr-1" />Input Nilai</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {showConfig && (
        <ConfigDialog
          config={config}
          cps={safeCps}
          tahunAjaran={tahunAjaran}
          semester={semester}
          onClose={() => setShowConfig(false)}
          onSaved={() => { setShowConfig(false); fetchData() }}
        />
      )}
      {showAddGrade && selectedStudent && (
        <AddGradeDialog
          student={selectedStudent}
          cps={safeCps}
          tahunAjaran={tahunAjaran}
          semester={semester}
          onClose={() => { setShowAddGrade(false); setSelectedStudent(null) }}
          onSaved={() => { setShowAddGrade(false); setSelectedStudent(null); fetchData() }}
        />
      )}
    </div>
  )
}

// ── v2 ConfigDialog: NH / STS / SAS (total must = 100%) ──
function ConfigDialog({
  config, cps, tahunAjaran, semester, onClose, onSaved,
}: {
  config: Config; cps: CP[]; tahunAjaran: string; semester: string;
  onClose: () => void; onSaved: () => void;
}) {
  const safeConfig: Config = config || DEFAULT_CONFIG
  const safeCps: CP[] = Array.isArray(cps) ? cps : []
  const [form, setForm] = useState({
    kkm: String(safeConfig.kkm ?? 75),
    bobotNH: String(safeConfig.bobotNH ?? 40),
    bobotSTS: String(safeConfig.bobotSTS ?? 30),
    bobotSAS: String(safeConfig.bobotSAS ?? 30),
  })
  const [saving, setSaving] = useState(false)

  const total = (parseFloat(form.bobotNH) || 0) + (parseFloat(form.bobotSTS) || 0) + (parseFloat(form.bobotSAS) || 0)

  const handleSave = async () => {
    if (Math.abs(total - 100) > 0.01) { toast.error(`Total bobot harus 100%. Saat ini: ${total}%`); return }
    setSaving(true)
    try {
      const res = await fetch('/api/subject-config', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kkm: Number(form.kkm),
          bobotNH: Number(form.bobotNH),
          bobotSTS: Number(form.bobotSTS),
          bobotSAS: Number(form.bobotSAS),
          tahunAjaran, semester,
        }),
      })
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d?.error || 'Gagal') }
      toast.success('Bobot & KKM disimpan')
      onSaved()
    } catch (err) {
      console.error('[ConfigDialog] save error:', err)
      toast.error(err instanceof Error ? err.message : 'Gagal')
    } finally { setSaving(false) }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="flex items-center gap-2"><Settings className="w-4 h-4 text-amber-600" />Atur Bobot Nilai & KKM</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
            <p className="font-semibold mb-1">Rumus Nilai Akhir (v2):</p>
            <p>NA = (NH × %NH) + (STS × %STS) + (SAS × %SAS)</p>
            <p className="mt-1">NH = Rata-rata Nilai Harian per CP</p>
            <p>STS = Asesmen Tengah Semester (MID)</p>
            <p>SAS = Asesmen Akhir Semester (UAS)</p>
            <p className="mt-1 text-slate-500">Periode: {tahunAjaran} — {semester}</p>
          </div>
          <div className="space-y-1"><Label className="text-xs">KKM Mapel</Label><Input type="number" min="0" max="100" value={form.kkm} onChange={(e) => setForm({ ...form, kkm: e.target.value })} /></div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1"><Label className="text-xs">% NH</Label><Input type="number" min="0" max="100" value={form.bobotNH} onChange={(e) => setForm({ ...form, bobotNH: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">% STS</Label><Input type="number" min="0" max="100" value={form.bobotSTS} onChange={(e) => setForm({ ...form, bobotSTS: e.target.value })} /></div>
            <div className="space-y-1"><Label className="text-xs">% SAS</Label><Input type="number" min="0" max="100" value={form.bobotSAS} onChange={(e) => setForm({ ...form, bobotSAS: e.target.value })} /></div>
          </div>
          <div className={`p-2 rounded-lg text-center text-sm font-bold ${Math.abs(total - 100) < 0.01 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            Total: {total}% {Math.abs(total - 100) < 0.01 ? '✓' : '(harus 100%)'}
          </div>
          {safeCps.length > 0 && (
            <div className="border-t pt-2">
              <Label className="text-xs font-semibold">Daftar CP aktif untuk periode ini:</Label>
              <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                {safeCps.map(c => (
                  <div key={c.id} className="flex justify-between text-xs bg-slate-50 px-2 py-1 rounded">
                    <span className="truncate">{c.kodeCP || c.deskripsi?.slice(0, 60) || '-'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Batal</Button><Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">{saving ? 'Menyimpan...' : 'Simpan'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── v2 AddGradeDialog: with CP/TP selectors + Override checkbox ──
function AddGradeDialog({
  student, cps, tahunAjaran, semester, onClose, onSaved,
}: {
  student: Student; cps: CP[]; tahunAjaran: string; semester: string;
  onClose: () => void; onSaved: () => void;
}) {
  const safeCps: CP[] = Array.isArray(cps) ? cps : []
  const safeStudent: Student = student || { id: '', namaLengkap: '-', nisn: '-', kelas: '-', sekolah: '-' }
  const [form, setForm] = useState({
    title: '',
    score: '',
    gradeCategory: 'tugas_harian',
    cpId: '__none__',
    tpId: '__none__',
    description: '',
    isOverride: false,
  })
  const [saving, setSaving] = useState(false)

  // Get TPs for the selected CP (defensive — TPs may be nested in CP)
  const selectedCp: CP | undefined = safeCps.find(c => c?.id === form.cpId)
  const safeTps: TP[] = Array.isArray(selectedCp?.tps) ? (selectedCp!.tps as TP[]) : []

  const handleSave = async () => {
    if (!form.title || form.score === '') { toast.error('Judul dan nilai wajib diisi'); return }
    const score = parseFloat(form.score)
    if (isNaN(score) || score < 0 || score > 100) { toast.error('Nilai harus antara 0-100'); return }

    setSaving(true)
    try {
      const gradeType = CATEGORY_TO_TYPE[form.gradeCategory] || 'tugas'
      const payload = {
        studentId: safeStudent.id,
        title: form.title,
        score,
        gradeType,
        gradeCategory: form.gradeCategory,
        cpId: form.cpId && form.cpId !== '__none__' ? form.cpId : null,
        tpId: form.tpId && form.tpId !== '__none__' ? form.tpId : null,
        tahunAjaran,
        semester,
        description: form.description,
        isOverride: form.isOverride,
        isReleased: true,
      }
      const res = await fetch('/api/manual-grades', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d?.error || 'Gagal menyimpan')
      }
      toast.success(form.isOverride ? 'Nilai override disimpan' : 'Nilai ditambahkan')
      onSaved()
    } catch (err) {
      console.error('[AddGradeDialog] save error:', err)
      toast.error(err instanceof Error ? err.message : 'Gagal')
    } finally { setSaving(false) }
  }

  const safeCategories = SAFE_GRADE_CATEGORIES.length > 0
    ? SAFE_GRADE_CATEGORIES
    : [
        { value: 'tugas_harian', label: 'Tugas Harian' },
        { value: 'ulangan_harian', label: 'Ulangan Harian' },
        { value: 'sts', label: 'STS (MID)' },
        { value: 'sas', label: 'SAS (UAS)' },
      ]

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="flex items-center gap-2"><PencilLine className="w-4 h-4 text-emerald-600" />Input Nilai Manual</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-sm font-medium">{safeStudent.namaLengkap}</p>
            <p className="text-xs text-slate-500">{safeStudent.kelas} • NISN: {safeStudent.nisn}</p>
            <p className="text-xs text-emerald-600 mt-1">Periode: {tahunAjaran} — {semester}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Jenis Penilaian</Label>
            <Select value={form.gradeCategory} onValueChange={(v) => setForm({ ...form, gradeCategory: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {safeCategories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">CP (Capaian Pembelajaran) — opsional</Label>
            <Select value={form.cpId} onValueChange={(v) => setForm({ ...form, cpId: v, tpId: '__none__' })}>
              <SelectTrigger><SelectValue placeholder="— Pilih CP —" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">— Tanpa CP (umum) —</SelectItem>
                {safeCps.map(c => c?.id ? <SelectItem key={c.id} value={c.id}>{c.kodeCP || c.deskripsi?.slice(0, 60) || `(CP ${c.id.slice(-4)})`}</SelectItem> : null)}
              </SelectContent>
            </Select>
          </div>

          {safeTps.length > 0 && (
            <div className="space-y-1">
              <Label className="text-xs">TP (Tujuan Pembelajaran) — opsional</Label>
              <Select value={form.tpId} onValueChange={(v) => setForm({ ...form, tpId: v })}>
                <SelectTrigger><SelectValue placeholder="— Pilih TP —" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">— Tanpa TP —</SelectItem>
                  {safeTps.map(t => t?.id ? <SelectItem key={t.id} value={t.id}>{t.kodeTP || t.deskripsi?.slice(0, 50) || `(TP ${t.id.slice(-4)})`}</SelectItem> : null)}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1"><Label className="text-xs">Judul Penilaian *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Ulangan Harian Bab 1" /></div>
          <div className="space-y-1"><Label className="text-xs">Nilai (0-100) *</Label><Input type="number" min="0" max="100" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} /></div>
          <div className="space-y-1"><Label className="text-xs">Keterangan (opsional)</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Catatan tambahan..." /></div>

          {/* v2: Override checkbox */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <Checkbox
              id="override-check"
              checked={form.isOverride}
              onCheckedChange={(v) => setForm({ ...form, isOverride: v === true })}
              className="mt-0.5 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
            />
            <div className="flex-1">
              <Label htmlFor="override-check" className="text-xs font-semibold cursor-pointer flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                Override nilai otomatis
              </Label>
              <p className="text-xs text-amber-700 mt-0.5">
                Centang untuk mengganti nilai yang sudah dihitung otomatis dari tugas daring.
                Nilai ini akan dipakai sebagai nilai final dan tidak akan di-overwrite oleh sistem.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
            {saving ? 'Menyimpan...' : form.isOverride ? 'Simpan Override' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
