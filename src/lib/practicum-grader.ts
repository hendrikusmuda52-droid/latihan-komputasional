// Auto-grader untuk Ujian Praktek Spreadsheet
// Memeriksa: (1) Formula yang dipakai di setiap cell target, (2) Jawaban info

import {
  FORMULA_CRITERIA,
  INFO_QUESTIONS,
  TOTAL_FORMULA_POINTS,
  TOTAL_INFO_POINTS,
  FORMULA_WEIGHT,
  INFO_WEIGHT,
  type FormulaCriterion,
  type InfoQuestion,
} from './practicum-data'

export interface CellState {
  v?: string | number // raw value
  f?: string // formula (without '=')
}

export interface SheetState {
  cells: Record<string, CellState>
  colWidths?: number[]
}

export interface FormulaGradeResult {
  criterionId: string
  description: string
  cell: string
  expectedFormula: string
  expectedRangeHint?: string
  actualFormula: string | null
  correct: boolean
  points: number
  earnedPoints: number
  reason: string // kenapa benar/salah
}

export interface InfoGradeResult {
  questionId: string
  question: string
  expectedAnswer?: string | null
  acceptedAnswers?: string[]
  actualAnswer: string
  correct: boolean
  points: number
  earnedPoints: number
}

export interface GradingResult {
  formulaResults: FormulaGradeResult[]
  infoResults: InfoGradeResult[]
  formulaScore: number // 0-100
  infoScore: number // 0-100
  totalScore: number // 0-100 weighted
  formulaEarned: number
  formulaMax: number
  infoEarned: number
  infoMax: number
  formulasUsed: Record<string, { count: number; cells: string[] }>
}

// ── Normalisasi jawaban info ──
// Trim, lowercase, hapus titik/koma di akhir, normalisasi spasi
function normalize(s: string): string {
  if (!s) return ''
  return s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,;]+$/g, '')
    .replace(/%/g, '')
}

// ── Grade formula untuk satu cell ──
export function gradeFormulaCell(
  cells: Record<string, CellState>,
  criterion: FormulaCriterion
): FormulaGradeResult {
  const cellData = cells[criterion.cell]
  const actualFormula = cellData?.f || (cellData?.v && typeof cellData.v === 'string' && cellData.v.startsWith('=') ? cellData.v : null)

  // Normalisasi: hilangkan '=' di awal jika ada
  let formulaStr = ''
  if (actualFormula) {
    formulaStr = actualFormula.startsWith('=') ? actualFormula.substring(1) : actualFormula
  }

  const result: FormulaGradeResult = {
    criterionId: criterion.id,
    description: criterion.description,
    cell: criterion.cell,
    expectedFormula: criterion.expectedFormula,
    expectedRangeHint: criterion.expectedRangeHint,
    actualFormula: formulaStr || null,
    correct: false,
    points: criterion.points,
    earnedPoints: 0,
    reason: '',
  }

  if (!formulaStr) {
    result.reason = `Cell ${criterion.cell} kosong — tidak ada formula.`
    return result
  }

  // Cek apakah formula mengandung nama formula yang diharapkan (case-insensitive)
  const upperFormula = formulaStr.toUpperCase()
  const hasFormula = new RegExp(`\\b${criterion.expectedFormula}\\s*\\(`, 'i').test(
    formulaStr
  )

  if (!hasFormula) {
    result.reason = `Formula di ${criterion.cell} tidak menggunakan ${criterion.expectedFormula}. Ditemukan: "${formulaStr}"`
    return result
  }

  // Cek apakah range/pattern yang diharapkan ada di formula
  if (criterion.expectedPattern) {
    const patternMatch = criterion.expectedPattern.test(formulaStr)
    if (!patternMatch) {
      result.reason = `Formula menggunakan ${criterion.expectedFormula} tetapi range tidak tepat. Seharusnya mengandung "${criterion.expectedRangeHint}". Ditemukan: "${formulaStr}"`
      return result
    }
  }

  result.correct = true
  result.earnedPoints = criterion.points
  result.reason = `Formula tepat: ${formulaStr}`
  return result
}

// ── Grade jawaban info ──
export function gradeInfoAnswer(
  question: InfoQuestion,
  actualAnswer: string
): InfoGradeResult {
  const result: InfoGradeResult = {
    questionId: question.id,
    question: question.question,
    expectedAnswer: question.expectedAnswer,
    acceptedAnswers: question.acceptedAnswers,
    actualAnswer,
    correct: false,
    points: question.points,
    earnedPoints: 0,
  }

  if (!actualAnswer || !actualAnswer.trim()) {
    return result
  }

  const normActual = normalize(actualAnswer)
  const accepted = (question.acceptedAnswers || []).map(normalize)
  if (question.expectedAnswer) accepted.push(normalize(question.expectedAnswer))

  // Cek exact match terhadap accepted answers
  if (accepted.some(a => a === normActual)) {
    result.correct = true
    result.earnedPoints = question.points
    return result
  }

  // Cek partial match (jika salah satu accepted answer terkandung dalam actual)
  if (accepted.some(a => normActual.includes(a) && a.length > 3)) {
    result.correct = true
    result.earnedPoints = Math.round(question.points * 0.7) // 70% untuk partial match
    return result
  }

  return result
}

// ── Hitung formulas used (untuk tracking) ──
export function computeFormulasUsed(
  cells: Record<string, CellState>
): Record<string, { count: number; cells: string[] }> {
  const result: Record<string, { count: number; cells: string[] }> = {}
  const FORMULAS = ['SUM', 'AVERAGE', 'IF', 'VLOOKUP', 'HLOOKUP', 'COUNTIF', 'RANK']

  for (const [addr, data] of Object.entries(cells)) {
    let f = ''
    if (data.f) f = data.f
    else if (typeof data.v === 'string' && data.v.startsWith('=')) f = data.v.substring(1)
    if (!f) continue
    const upper = f.toUpperCase()
    for (const fn of FORMULAS) {
      if (new RegExp(`\\b${fn}\\s*\\(`, 'i').test(f)) {
        if (!result[fn]) result[fn] = { count: 0, cells: [] }
        result[fn].count++
        result[fn].cells.push(addr)
      }
    }
  }

  return result
}

// ── Grade lengkap (formulas + info) ──
export function gradePracticum(
  sheetState: SheetState,
  infoAnswers: Record<string, string>
): GradingResult {
  const cells = sheetState.cells || {}

  // Formula grading
  const formulaResults = FORMULA_CRITERIA.map(c => gradeFormulaCell(cells, c))
  const formulaEarned = formulaResults.reduce((s, r) => s + r.earnedPoints, 0)
  const formulaMax = TOTAL_FORMULA_POINTS
  const formulaScore = formulaMax > 0 ? (formulaEarned / formulaMax) * 100 : 0

  // Info grading
  const infoResults = INFO_QUESTIONS.map(q =>
    gradeInfoAnswer(q, infoAnswers[q.id] || '')
  )
  const infoEarned = infoResults.reduce((s, r) => s + r.earnedPoints, 0)
  const infoMax = TOTAL_INFO_POINTS
  const infoScore = infoMax > 0 ? (infoEarned / infoMax) * 100 : 0

  // Total weighted
  const totalScore = formulaScore * FORMULA_WEIGHT + infoScore * INFO_WEIGHT

  // Formulas used
  const formulasUsed = computeFormulasUsed(cells)

  return {
    formulaResults,
    infoResults,
    formulaScore: Math.round(formulaScore * 10) / 10,
    infoScore: Math.round(infoScore * 10) / 10,
    totalScore: Math.round(totalScore * 10) / 10,
    formulaEarned,
    formulaMax,
    infoEarned,
    infoMax,
    formulasUsed,
  }
}
