'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Clock,
  Save,
  Send,
  Table,
  BookOpen,
  HelpCircle,
  Calculator,
  AlertCircle,
  CheckCircle2,
  Loader2,
  LogOut,
  Home,
} from 'lucide-react'
import { toast } from 'sonner'
import { ForceStopOverlay } from '@/components/student/force-stop-overlay'

import {
  PRACTICUM_STORY,
  FORMULA_GUIDE,
  INFO_QUESTIONS,
  PRACTICUM_TITLE,
  getInitialSheetState,
} from '@/lib/practicum-data'
import type { SheetState } from '@/lib/practicum-grader'
import { computeFormulasUsed } from '@/lib/practicum-grader'
import { QuestionMarkdown } from '@/components/stages/question-markdown'

const DEFAULT_DURATION_SEC = 60 * 60 // 60 menit default
const STORAGE_KEY = 'practicum_state_v1'

// ── Cell address helpers ──
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

function parseAddr(addr: string): { row: number; col: number } | null {
  const m = addr.match(/^([A-Z]+)(\d+)$/)
  if (!m) return null
  let col = 0
  for (let i = 0; i < m[1].length; i++) {
    col = col * 26 + (m[1].charCodeAt(i) - 64)
  }
  return { row: parseInt(m[2], 10) - 1, col: col - 1 }
}

const ROWS = 30
const COLS = 13 // A-M (kita pakai sampai kolom M untuk peringkat)

export function PracticumStage() {
  const { setStage, student } = useAppStore()
  const router = useRouter()
  const [sheet, setSheet] = useState<SheetState>(() => getInitialSheetState())
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>({ row: 3, col: 7 }) // H4
  const [formulaInput, setFormulaInput] = useState<string>('')
  const [editingFormula, setEditingFormula] = useState(false)
  const [infoAnswers, setInfoAnswers] = useState<Record<string, string>>({})
  const [startTime, setStartTime] = useState<number | null>(null)
  const [now, setNow] = useState<number>(Date.now())
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [saving, setSaving] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null)
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION_SEC)
  const [activeTab, setActiveTab] = useState<'stimulus' | 'spreadsheet' | 'info' | 'guide'>('stimulus')
  const submissionIdRef = useRef<string | null>(null)
  // ── Guard against double-submit ──
  const hasSubmittedRef = useRef(false)
  // ── Success modal state ──
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    totalScore: number
    formulaScore: number
    infoScore: number
    formulaEarned: number
    formulaMax: number
    infoEarned: number
    infoMax: number
    formulasUsed: Record<string, { count: number; cells: string[] }>
  } | null>(null)

  // ── Load from localStorage + initialize ──
  useEffect(() => {
    // Duration from assignment
    const dur = typeof window !== 'undefined'
      ? parseInt(localStorage.getItem('currentAssignmentDuration') || '0', 10)
      : 0
    if (dur > 0) setDuration(dur * 60)

    // Restore state from localStorage
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.sheet) setSheet(parsed.sheet)
        if (parsed.infoAnswers) setInfoAnswers(parsed.infoAnswers)
        if (parsed.startTime) setStartTime(parsed.startTime)
        if (parsed.submissionId) submissionIdRef.current = parsed.submissionId
      }
    } catch (e) {
      console.error('Failed to load practicum state:', e)
    }

    if (!startTime) setStartTime(Date.now())

    // ── Cek existing submission di server ──
    // Jika user sudah submit sebelumnya, redirect ke dashboard + beri tahu
    const assignmentId = typeof window !== 'undefined'
      ? localStorage.getItem('currentAssignmentId')
      : null
    if (student?.id && assignmentId) {
      fetch(`/api/practicum/save?assignmentId=${assignmentId}`)
        .then((r) => r.json())
        .then((data) => {
          // Jika ditemukan draft (isSubmitted=false), biarkan user lanjut
          // Jika tidak ditemukan (found=false), berarti belum pernah mulai — biarkan user mulai
          // Note: API practicum/save GET hanya cari draft (isSubmitted=false).
          // Untuk cek submitted-final, perlu API terpisah — skip untuk sekarang
          if (data.found) {
            submissionIdRef.current = data.submissionId
            if (data.durationSec && !startTime) {
              // Resume timer dari durasi yang sudah berjalan
              const elapsed = data.durationSec * 1000
              setStartTime(Date.now() - elapsed)
            }
          }
        })
        .catch(() => {})
    }
  }, [])

  // ── Timer tick ──
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  // ── Anti copy-paste + right-click (sama dengan quiz-stage) ──
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      toast.warning('Copy dinonaktifkan saat ujian', { duration: 1500 })
    }
    const handlePaste = (e: ClipboardEvent) => {
      // Allow paste in info answer textareas/inputs (cells already have their own editor)
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return // allow paste in info answer fields (not the spreadsheet itself)
      }
      e.preventDefault()
      toast.warning('Paste dinonaktifkan di spreadsheet', { duration: 1500 })
    }
    const handleContext = (e: MouseEvent) => {
      e.preventDefault()
      toast.warning('Right-click dinonaktifkan saat ujian', { duration: 1500 })
    }
    document.addEventListener('copy', handleCopy)
    document.addEventListener('paste', handlePaste)
    document.addEventListener('contextmenu', handleContext)
    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('paste', handlePaste)
      document.removeEventListener('contextmenu', handleContext)
    }
  }, [])

  // ── Compute formulas using Hyperformula (client-side) ──
  // Lazy-load Hyperformula only on client
  const hfRef = useRef<any>(null)
  const sheetIdRef = useRef<number>(0)
  const [computedValues, setComputedValues] = useState<Record<string, any>>({})

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const HF = await import('@/lib/hyperformula-instance')
      if (cancelled) return
      if (!hfRef.current) {
        hfRef.current = HF.getHyperformula()
        // Add sheet
        const name = hfRef.current.addSheet('practicum')
        sheetIdRef.current = hfRef.current.getSheetId(name)
      }
      recalc()
    })()
    return () => { cancelled = true }
  }, [])

  const recalc = useCallback(() => {
    if (!hfRef.current) return
    const hf = hfRef.current
    const sid = sheetIdRef.current

    // Build a 2D array of cell values for Hyperformula
    // setSheetContent expects (sheetId: number, values: RawCellContent[][])
    const grid: any[][] = []
    for (let r = 0; r < ROWS; r++) {
      const row: any[] = []
      for (let c = 0; c < COLS; c++) {
        const addr = toAddr(r, c)
        const cell = sheet.cells[addr]
        if (!cell) {
          row.push(null)
        } else if (cell.f) {
          // Formula — Hyperformula needs '=' prefix
          row.push('=' + cell.f)
        } else if (cell.v !== undefined && cell.v !== null && cell.v !== '') {
          // cell.v is already correctly typed (number or string) by saveCellEdit
          row.push(cell.v)
        } else {
          row.push(null)
        }
      }
      grid.push(row)
    }
    // Set sheet contents — API: setSheetContent(sheetId: number, values: [][])
    // CRITICAL: sheetId is positional number, NOT an object { sheet: sid }
    try {
      hf.setSheetContent(sid, grid)
      const newValues: Record<string, any> = {}
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const addr = toAddr(r, c)
          const cell = sheet.cells[addr]
          if (cell && (cell.f || (typeof cell.v === 'string' && cell.v.startsWith('=')))) {
            // It's a formula — get computed value
            newValues[addr] = hf.getCellValue({ sheet: sid, row: r, col: c })
          }
        }
      }
      setComputedValues(newValues)
    } catch (e) {
      console.error('Hyperformula recalc error:', e)
    }
  }, [sheet])

  // Recalc when sheet changes
  useEffect(() => {
    const t = setTimeout(() => recalc(), 50)
    return () => clearTimeout(t)
  }, [recalc])

  // ── Update formula bar when selecting cell ──
  useEffect(() => {
    if (!selectedCell) return
    const addr = toAddr(selectedCell.row, selectedCell.col)
    const cell = sheet.cells[addr]
    if (cell?.f) {
      setFormulaInput(cell.f)
    } else if (cell?.v !== undefined && cell.v !== null && typeof cell.v === 'string' && cell.v.startsWith('=')) {
      setFormulaInput(cell.v.substring(1))
    } else {
      setFormulaInput(cell?.v !== undefined && cell.v !== null ? String(cell.v) : '')
    }
    setEditingFormula(false)
  }, [selectedCell, sheet])

  // ── Save cell formula/value ──
  const saveCellEdit = useCallback(
    (rawInput: string) => {
      if (!selectedCell) return
      const addr = toAddr(selectedCell.row, selectedCell.col)
      setSheet((prev) => {
        const newCells = { ...prev.cells }
        let input = rawInput.trim()
        if (input === '' || input === '=') {
          delete newCells[addr]
        } else {
          // ── Auto-add '=' prefix if user typed a formula without it ──
          // e.g. "SUM(C4:F4)" → "=SUM(C4:F4)"
          const KNOWN_FNS = ['SUM', 'AVERAGE', 'IF', 'VLOOKUP', 'HLOOKUP', 'COUNTIF', 'RANK']
          const looksLikeFormula = !input.startsWith('=') && KNOWN_FNS.some(
            (fn) => new RegExp(`\\b${fn}\\s*\\(`, 'i').test(input)
          )
          if (looksLikeFormula) {
            input = '=' + input
          }

          if (input.startsWith('=')) {
            // Formula — strip '='
            newCells[addr] = { f: input.substring(1) }
          } else {
            // Try to parse as number
            const num = parseFloat(input)
            if (!isNaN(num) && input.match(/^-?\d+(\.\d+)?$/)) {
              newCells[addr] = { v: num }
            } else {
              newCells[addr] = { v: input }
            }
          }
        }
        return { ...prev, cells: newCells }
      })
      setEditingFormula(false)
    },
    [selectedCell]
  )

  // ── Auto-save to localStorage (debounced) ──
  useEffect(() => {
    if (!startTime) return
    const t = setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            sheet,
            infoAnswers,
            startTime,
            submissionId: submissionIdRef.current,
          })
        )
      }
    }, 800)
    return () => clearTimeout(t)
  }, [sheet, infoAnswers, startTime])

  // ── Auto-save to server (debounced, every 30s) ──
  const autoSave = useCallback(async () => {
    if (!student?.id || saving) return
    const assignmentId = typeof window !== 'undefined'
      ? localStorage.getItem('currentAssignmentId')
      : null
    if (!assignmentId) return

    try {
      const res = await fetch('/api/practicum/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
          assignmentId,
          spreadsheetData: JSON.stringify(sheet),
          infoAnswers: JSON.stringify(infoAnswers),
          formulasUsed: JSON.stringify(computeFormulasUsed(sheet.cells)),
          durationSec: startTime ? Math.floor((Date.now() - startTime) / 1000) : 0,
        }),
      })
      const data = await res.json()
      if (res.ok && data.submissionId) {
        submissionIdRef.current = data.submissionId
        setLastSavedAt(Date.now())
      }
    } catch (e) {
      console.error('Auto-save failed:', e)
    }
  }, [student, sheet, infoAnswers, startTime, saving])

  useEffect(() => {
    const t = setInterval(autoSave, 30000)
    return () => clearInterval(t)
  }, [autoSave])

  // ── Time remaining ──
  const elapsedSec = startTime ? Math.floor((now - startTime) / 1000) : 0
  const remainingSec = Math.max(0, duration - elapsedSec)
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
      : `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  // ── Submit final ──
  const handleSubmit = async () => {
    // ── GUARD: cegah double-submit ──
    if (hasSubmittedRef.current) {
      console.log('Submit sudah dipanggil, abaikan')
      return
    }
    hasSubmittedRef.current = true

    setSaving(true)
    const assignmentId = typeof window !== 'undefined'
      ? localStorage.getItem('currentAssignmentId')
      : null

    try {
      const res = await fetch('/api/practicum/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student?.id,
          assignmentId,
          spreadsheetData: JSON.stringify(sheet),
          infoAnswers: JSON.stringify(infoAnswers),
          formulasUsed: JSON.stringify(computeFormulasUsed(sheet.cells)),
          durationSec: startTime ? Math.floor((Date.now() - startTime) / 1000) : 0,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        // ── Jika "already submitted" — redirect ke dashboard dengan info ──
        if (res.status === 400 && data.error && data.error.includes('sudah submit')) {
          toast.info('Anda sudah submit praktikum ini. Mengarahkan ke dashboard...')
          // Clear localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY)
          }
          // Redirect ke dashboard setelah 1.5 detik
          setTimeout(() => {
            setStage('welcome')
            router.push('/?view=student-dashboard')
          }, 1500)
          return
        }
        throw new Error(data.error || 'Gagal submit')
      }

      // ── Simpan ke Result table agar muncul di dashboard ──
      try {
        await fetch('/api/result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: student?.id,
            typedText: '',
            charCount: 0,
            correctChars: 0,
            typingSpeedWPM: 0,
            typingAccuracy: 0,
            typingDuration: 0,
            typingScore: 0,
            quizAnswers: JSON.stringify({ practicumSubmissionId: data.submissionId, ...infoAnswers }),
            quizCorrect: 0,
            quizTotal: 0,
            quizScore: data.totalScore,
            quizDuration: startTime ? Math.floor((Date.now() - startTime) / 1000) : 0,
            totalScore: data.totalScore,
            assignmentId: assignmentId || null,
          }),
        })
      } catch (err) {
        console.error('Failed to save Result row:', err)
      }

      // ── Tutup dialog konfirmasi ──
      setShowSubmitDialog(false)

      // ── Tampilkan success modal dengan skor ──
      setSubmitResult({
        totalScore: data.totalScore,
        formulaScore: data.formulaScore,
        infoScore: data.infoScore,
        formulaEarned: data.formulaEarned,
        formulaMax: data.formulaMax,
        infoEarned: data.infoEarned,
        infoMax: data.infoMax,
        formulasUsed: data.formulasUsed,
      })
      setShowSuccessModal(true)

      // ── Clear localStorage (state praktikum) ──
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY)
      }
      setSaving(false)
      // ── JANGAN setStage('completed') dulu — biarkan user lihat success modal ──
      // Redirect akan dihandle oleh tombol di success modal
    } catch (err: any) {
      toast.error(err.message || 'Gagal submit praktikum')
      setSaving(false)
      // Reset guard agar user bisa coba lagi
      hasSubmittedRef.current = false
    }
  }

  // ── Handle redirect dari success modal ──
  const handleRedirectToDashboard = () => {
    setShowSuccessModal(false)
    setStage('welcome')
    router.push('/?view=student-dashboard')
  }

  const handleRedirectToLogin = () => {
    setShowSuccessModal(false)
    setStage('welcome')
    router.push('/')
  }

  // ── Auto-submit ketika waktu habis ──
  useEffect(() => {
    if (remainingSec === 0 && startTime && !saving) {
      toast.error('Waktu habis! Mengirim jawaban otomatis...')
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSec])

  // ── Render cell value (display computed result for formulas) ──
  const renderCellDisplay = (row: number, col: number): string => {
    const addr = toAddr(row, col)
    const cell = sheet.cells[addr]
    if (!cell) return ''

    if (cell.f) {
      // Formula — show computed value
      const v = computedValues[addr]
      if (v === undefined || v === null) return ''
      if (typeof v === 'object' && v.value) return v.value // CellError
      if (typeof v === 'number') {
        // Round to 2 decimals for display, but keep whole numbers whole
        if (Number.isInteger(v)) return v.toString()
        return v.toFixed(2)
      }
      return String(v)
    }
    if (cell.v !== undefined && cell.v !== null) {
      if (typeof cell.v === 'string' && cell.v.startsWith('=')) {
        const v = computedValues[addr]
        if (v === undefined || v === null) return ''
        if (typeof v === 'object' && v.value) return v.value
        if (typeof v === 'number') return Number.isInteger(v) ? v.toString() : v.toFixed(2)
        return String(v)
      }
      return String(cell.v)
    }
    return ''
  }

  const isFormulaCell = (row: number, col: number): boolean => {
    const addr = toAddr(row, col)
    const cell = sheet.cells[addr]
    return !!cell?.f || (typeof cell?.v === 'string' && cell.v.startsWith('='))
  }

  const isCellError = (row: number, col: number): boolean => {
    const addr = toAddr(row, col)
    const v = computedValues[addr]
    return typeof v === 'object' && v !== null && v.type !== undefined
  }

  // ── Formulas used count (live tracking) ──
  const formulasUsed = useMemo(() => computeFormulasUsed(sheet.cells), [sheet])

  // ── Keyboard navigation ──
  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (editingFormula) return
    let newRow = row, newCol = col
    if (e.key === 'ArrowUp') newRow = Math.max(0, row - 1)
    else if (e.key === 'ArrowDown') newRow = Math.min(ROWS - 1, row + 1)
    else if (e.key === 'ArrowLeft') newCol = Math.max(0, col - 1)
    else if (e.key === 'ArrowRight') newCol = Math.min(COLS - 1, col + 1)
    else if (e.key === 'Enter' || e.key === 'F2') {
      e.preventDefault()
      setEditingFormula(true)
      setTimeout(() => {
        const input = document.getElementById('formula-bar-input') as HTMLInputElement
        if (input) { input.focus(); input.select() }
      }, 50)
      return
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault()
      const addr = toAddr(row, col)
      setSheet((prev) => {
        const newCells = { ...prev.cells }
        delete newCells[addr]
        return { ...prev, cells: newCells }
      })
      return
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      // Start typing — replace cell content
      e.preventDefault()
      setFormulaInput(e.key)
      setEditingFormula(true)
      setTimeout(() => {
        const input = document.getElementById('formula-bar-input') as HTMLInputElement
        if (input) { input.focus() }
      }, 50)
      return
    }
    if (newRow !== row || newCol !== col) {
      e.preventDefault()
      setSelectedCell({ row: newRow, col: newCol })
    }
  }

  const colWidths = sheet.colWidths || Array(COLS).fill(10)

  // ── Render ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/30">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">Ujian Praktek — Pengolahan Data</h1>
              <p className="text-xs text-slate-500">
                {student?.namaLengkap} • {student?.kelas} • Informatika
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${remainingSec < 300 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
              <Clock className="w-4 h-4" />
              {formatTime(remainingSec)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={autoSave}
              disabled={saving}
              title="Simpan progress"
            >
              <Save className="w-4 h-4 mr-1" />
              Simpan
            </Button>
            <Button
              size="sm"
              onClick={() => setShowSubmitDialog(true)}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Send className="w-4 h-4 mr-1" />
              Submit
            </Button>
          </div>
        </div>
        {/* Last saved indicator */}
        <div className="container max-w-7xl mx-auto px-4 pb-2 flex items-center gap-3 text-xs text-slate-400">
          {lastSavedAt && <span>Terakhir tersimpan: {new Date(lastSavedAt).toLocaleTimeString('id-ID')}</span>}
          {Object.keys(formulasUsed).length > 0 && (
            <span>• Formula digunakan: {Object.entries(formulasUsed).map(([k, v]) => `${k}×${v.count}`).join(', ')}</span>
          )}
        </div>
      </header>

      {/* Tabs */}
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="stimulus"><BookOpen className="w-4 h-4 mr-1" /> Stimulus</TabsTrigger>
            <TabsTrigger value="spreadsheet"><Table className="w-4 h-4 mr-1" /> Spreadsheet</TabsTrigger>
            <TabsTrigger value="info"><HelpCircle className="w-4 h-4 mr-1" /> Pertanyaan</TabsTrigger>
            <TabsTrigger value="guide"><Calculator className="w-4 h-4 mr-1" /> Panduan</TabsTrigger>
          </TabsList>

          {/* ── TAB 1: Stimulus ── */}
          <TabsContent value="stimulus">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Soal Cerita — Stimulus Ujian Praktek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuestionMarkdown content={PRACTICUM_STORY} />
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Langkah berikutnya:</strong> Pindah ke tab <strong>Spreadsheet</strong> untuk mulai
                    mengolah data menggunakan formula. Baca tab <strong>Panduan</strong> jika lupa sintaks formula.
                  </p>
                </div>
                <Button
                  className="mt-4"
                  onClick={() => setActiveTab('spreadsheet')}
                >
                  Mulai Mengolah Data →
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 2: Spreadsheet ── */}
          <TabsContent value="spreadsheet">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Table className="w-5 h-5 text-emerald-600" />
                  Spreadsheet — Toko Elektronik Nusantara Jaya
                </CardTitle>
                <p className="text-xs text-slate-500 mt-1">
                  Klik cell untuk memilih. Tekan <kbd className="px-1 bg-slate-100 border rounded">Enter</kbd> atau <kbd className="px-1 bg-slate-100 border rounded">F2</kbd> untuk mengedit.
                  Formula diawali dengan <code className="px-1 bg-emerald-50 text-emerald-700 rounded">=</code>.
                </p>
              </CardHeader>
              <CardContent>
                {/* Title heading (di luar tabel, bukan di dalam cell A1) */}
                <h3 className="text-sm font-bold text-slate-800 mb-2 px-1">
                  {PRACTICUM_TITLE}
                </h3>

                {/* Legend — penanda warna kolom */}
                <div className="flex items-center gap-3 mb-2 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3 h-3 bg-slate-200 border border-slate-300 rounded"></span>
                    Data (sudah diisi)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3 h-3 bg-amber-200 border border-amber-400 rounded"></span>
                    Wajib diisi formula (H–M)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3 h-3 bg-amber-50 border border-amber-200 rounded"></span>
                    Belum diisi
                  </span>
                </div>

                {/* Formula Bar */}
                <div className="flex items-center gap-2 mb-2 sticky top-[68px] z-20 bg-white/95 backdrop-blur py-1">
                  <div className="px-2 py-1 bg-slate-100 border rounded text-xs font-mono font-bold w-16 text-center">
                    {selectedCell ? toAddr(selectedCell.row, selectedCell.col) : ''}
                  </div>
                  <div className="px-1 text-slate-400">fx</div>
                  <Input
                    id="formula-bar-input"
                    value={formulaInput}
                    onChange={(e) => setFormulaInput(e.target.value)}
                    onFocus={() => setEditingFormula(true)}
                    onBlur={() => {
                      // Save formula on blur (jangan hanya saat Enter)
                      // Cek apakah input berubah dari nilai cell yang tersimpan
                      if (selectedCell) {
                        const addr = toAddr(selectedCell.row, selectedCell.col)
                        const cell = sheet.cells[addr]
                        const currentVal = cell?.f
                          ? cell.f
                          : cell?.v !== undefined && cell.v !== null
                          ? String(cell.v)
                          : ''
                        if (formulaInput.trim() !== currentVal.trim()) {
                          saveCellEdit(formulaInput)
                        } else {
                          setEditingFormula(false)
                        }
                      } else {
                        setEditingFormula(false)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        saveCellEdit(formulaInput)
                        // Pindah ke cell bawah
                        if (selectedCell) {
                          setSelectedCell({ row: Math.min(ROWS - 1, selectedCell.row + 1), col: selectedCell.col })
                        }
                      } else if (e.key === 'Escape') {
                        e.preventDefault()
                        setEditingFormula(false)
                        // Restore original
                        if (selectedCell) {
                          const addr = toAddr(selectedCell.row, selectedCell.col)
                          const cell = sheet.cells[addr]
                          setFormulaInput(cell?.f || (cell?.v ? String(cell.v) : ''))
                        }
                      }
                    }}
                    placeholder="Klik cell → ketik formula → Enter. Contoh: =SUM(C4:F4) atau SUM(C4:F4)"
                    className="flex-1 font-mono text-sm"
                  />
                  {editingFormula && (
                    <Button size="sm" onClick={() => saveCellEdit(formulaInput)}>
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Spreadsheet Grid */}
                <div className="border border-slate-300 rounded-lg overflow-auto max-h-[60vh] bg-white">
                  <table className="border-collapse table-fixed" style={{ fontSize: '12px' }}>
                    <colgroup>
                      <col style={{ width: '36px' }} />
                      {colWidths.map((w, i) => (
                        <col key={i} style={{ width: `${w * 7}px` }} />
                      ))}
                    </colgroup>
                    <thead className="sticky top-0 z-10">
                      <tr>
                        <th className="border border-slate-200 bg-slate-200 px-1 py-1 text-slate-500 font-semibold sticky left-0 z-20">
                          {/* empty corner */}
                        </th>
                        {Array.from({ length: COLS }, (_, c) => {
                          // Kolom formula: H(7) sampai M(12)
                          const isFormulaCol = c >= 7
                          return (
                            <th
                              key={c}
                              className={`border border-slate-300 px-2 py-1 font-semibold text-center text-xs ${
                                isFormulaCol
                                  ? 'bg-amber-200 text-amber-900'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {toAddr(0, c).match(/^([A-Z]+)/)?.[1]}
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: ROWS }, (_, r) => (
                        <tr key={r}>
                          <th
                            className="border border-slate-200 bg-slate-100 px-1 py-1 text-slate-500 font-semibold text-center sticky left-0 z-10"
                          >
                            {r + 1}
                          </th>
                          {Array.from({ length: COLS }, (_, c) => {
                            const addr = toAddr(r, c)
                            const cell = sheet.cells[addr]
                            const isSelected = selectedCell?.row === r && selectedCell?.col === c
                            const display = renderCellDisplay(r, c)
                            const isFormula = isFormulaCell(r, c)
                            const isError = isCellError(r, c)
                            // Highlight header rows (row 3)
                            const isHeader = r === 2
                            const isFormulaHeader = isHeader && c >= 7 // H-M header
                            const isDataHeader = isHeader && c <= 6 // A-G header
                            const isTitleRow = r === 12 || r === 20 || r === 25
                            // Empty formula target cells: H4:M9 (r 3-8, c 7-12) + B26/B27 (r 25-26, c 1)
                            const isFormulaTarget =
                              (r >= 3 && r <= 8 && c >= 7 && c <= 12) ||
                              (r === 25 && c === 1) ||
                              (r === 26 && c === 1)
                            const isEmptyFormulaTarget = isFormulaTarget && !cell
                            return (
                              <td
                                key={c}
                                onClick={() => setSelectedCell({ row: r, col: c })}
                                onKeyDown={(e) => handleKeyDown(e, r, c)}
                                tabIndex={0}
                                className={`border border-slate-200 px-2 py-1 cursor-cell select-none whitespace-nowrap overflow-hidden text-ellipsis text-center ${
                                  isSelected
                                    ? 'ring-2 ring-emerald-500 ring-inset bg-emerald-50'
                                    : isFormulaHeader
                                    ? 'bg-amber-100 font-bold text-amber-900'
                                    : isDataHeader
                                    ? 'bg-slate-100 font-semibold text-slate-700'
                                    : isTitleRow
                                    ? 'bg-blue-50 font-semibold text-left'
                                    : isEmptyFormulaTarget
                                    ? 'bg-amber-50/60'
                                    : 'hover:bg-slate-50'
                                } ${isFormula ? 'text-blue-700 font-medium' : ''} ${isError ? 'bg-red-50 text-red-700' : ''}`}
                                title={isFormula ? (sheet.cells[addr]?.f ? `=${sheet.cells[addr]!.f}` : '') : display}
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

                {/* Live formula tracker */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {(['SUM', 'AVERAGE', 'IF', 'VLOOKUP', 'HLOOKUP', 'COUNTIF', 'RANK'] as const).map((fn) => {
                    const used = formulasUsed[fn]
                    return (
                      <Badge
                        key={fn}
                        variant={used ? 'default' : 'outline'}
                        className={used ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'text-slate-400'}
                      >
                        {fn}: {used?.count || 0}
                      </Badge>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 3: Pertanyaan Info ── */}
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  Pertanyaan Informasi
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Jawab pertanyaan berikut berdasarkan hasil pengolahan data di spreadsheet.
                  Setiap pertanyaan bernilai {INFO_QUESTIONS[0]?.points || 5} poin.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {INFO_QUESTIONS.map((q, i) => (
                  <div key={q.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-sm font-medium text-slate-900">{q.question}</p>
                    </div>
                    {q.hint && (
                      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded ml-8 mb-2">
                        💡 {q.hint}
                      </p>
                    )}
                    <Textarea
                      value={infoAnswers[q.id] || ''}
                      onChange={(e) =>
                        setInfoAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      placeholder="Tulis jawaban di sini..."
                      className="ml-8"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 4: Panduan Formula ── */}
          <TabsContent value="guide">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  Panduan Formula Spreadsheet
                </CardTitle>
                <p className="text-sm text-slate-500">
                  7 formula yang wajib Anda gunakan dalam ujian ini. Penilaian didasarkan pada penggunaan formula yang tepat.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {FORMULA_GUIDE.map((f) => (
                    <div key={f.name} className="p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-emerald-700">{f.name}</span>
                        <code className="text-xs bg-slate-100 px-2 py-0.5 rounded">{f.syntax}</code>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{f.description}</p>
                      <div className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200">
                        Contoh: <code>{f.example}</code>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tips:</strong>
                  </p>
                  <ul className="text-xs text-blue-700 mt-1 ml-4 list-disc space-y-1">
                    <li>Untuk <code>VLOOKUP</code> dengan rentang komisi (B15:C18), gunakan <code>TRUE</code> sebagai argumen terakhir karena range lookup-nya bersifat "approximate match".</li>
                    <li>Untuk <code>HLOOKUP</code>, gunakan tabel kategori (B22:E23) dan <code>FALSE</code> untuk exact match.</li>
                    <li>Untuk <code>RANK</code>, gunakan order = 0 untuk peringkat descending (tertinggi = peringkat 1).</li>
                    <li>Formula diawali dengan <code>=</code> (contoh: <code>=SUM(C4:F4)</code>).</li>
                    <li>Anda bisa klik cell lain saat menulis formula untuk menyisipkan referensi otomatis.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={(open) => !open && setShowSubmitDialog(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Submit Praktikum</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Apakah Anda yakin ingin submit? Setelah submit, jawaban tidak dapat diubah.</p>
              <div className="mt-3 p-3 bg-slate-50 rounded text-sm">
                <strong>Ringkasan:</strong>
                <ul className="mt-1 ml-4 list-disc">
                  <li>Formula digunakan: {Object.keys(formulasUsed).length} jenis ({Object.keys(formulasUsed).join(', ') || 'belum ada'})</li>
                  <li>Total sel berisi formula: {Object.values(formulasUsed).reduce((s, v) => s + v.count, 0)}</li>
                  <li>Pertanyaan terjawab: {Object.values(infoAnswers).filter(v => v && v.trim()).length} / {INFO_QUESTIONS.length}</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault() // cegah auto-close dialog sebelum handleSubmit selesai
                handleSubmit()
              }}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : null}
              Ya, Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── SUCCESS MODAL — Tampil setelah submit berhasil ── */}
      <AlertDialog open={showSuccessModal} onOpenChange={() => {}}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex flex-col items-center text-center mb-2">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
              <AlertDialogTitle className="text-2xl">
                Praktikum Berhasil Dikumpulkan! 🎉
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base text-slate-700">
                Jawaban Anda telah tersimpan dan otomatis dinilai.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          {submitResult && (
            <div className="space-y-3 my-4">
              {/* Skor besar */}
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Nilai Akhir</p>
                <p className="text-5xl font-bold text-emerald-600 my-1">
                  {submitResult.totalScore}
                  <span className="text-xl text-slate-400">/100</span>
                </p>
              </div>

              {/* Detail skor */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 border rounded text-center">
                  <p className="text-xs text-slate-500">Formula Score (70%)</p>
                  <p className="text-lg font-bold text-blue-700">
                    {submitResult.formulaScore}/100
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {submitResult.formulaEarned}/{submitResult.formulaMax} poin
                  </p>
                </div>
                <div className="p-3 border rounded text-center">
                  <p className="text-xs text-slate-500">Info Score (30%)</p>
                  <p className="text-lg font-bold text-purple-700">
                    {submitResult.infoScore}/100
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {submitResult.infoEarned}/{submitResult.infoMax} poin
                  </p>
                </div>
              </div>

              {/* Formula usage */}
              {submitResult.formulasUsed && Object.keys(submitResult.formulasUsed).length > 0 && (
                <div className="p-3 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600 mb-2 font-semibold">Formula yang Anda gunakan:</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(submitResult.formulasUsed).map(([fn, info]: [string, any]) => (
                      <Badge key={fn} className="bg-emerald-100 text-emerald-700">
                        {fn} ×{info.count}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                💡 Nilai final dapat diubah oleh guru setelah review manual. Cek dashboard untuk melihat nilai yang sudah dirilis.
              </div>
            </div>
          )}

          <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleRedirectToLogin()
              }}
              className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Kembali ke Login
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleRedirectToDashboard()
              }}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-1" />
              Lihat Dashboard Saya
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ForceStopOverlay subject="Informatika" />
    </div>
  )
}
