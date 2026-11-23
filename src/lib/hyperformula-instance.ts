// Hyperformula singleton with custom RANK plugin
// Hyperformula sudah mendukung SUM, AVERAGE, IF, VLOOKUP, HLOOKUP, COUNTIF
// tapi BELUM mendukung RANK — perlu custom plugin

import { HyperFormula, FunctionPlugin, FunctionArgumentType, CellError, ErrorType } from 'hyperformula'

// ── Custom RANK function plugin ──
// RANK(number, ref, [order]) — Mengembalikan peringkat sebuah nilai dalam daftar
// order = 0 (default): descending (terbesar = rank 1)
// order = 1 (atau non-zero): ascending (terkecil = rank 1)
// Sumber: Microsoft Excel RANK function spec
class RankPlugin extends FunctionPlugin {
  rank(ast: any, state: any) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('RANK'),
      (value: number, range: any, order: number = 0) => {
        const vals = this.arithmeticHelper.manyToExactNumbers(
          range.valuesFromTopLeftCorner()
        )
        if (vals instanceof CellError) return vals
        const sorted =
          order === 0
            ? [...vals].sort((a: number, b: number) => b - a)
            : [...vals].sort((a: number, b: number) => a - b)
        const idx = sorted.indexOf(value)
        return idx >= 0 ? idx + 1 : new CellError(ErrorType.NA)
      }
    )
  }
}

;(RankPlugin as any).implementedFunctions = {
  RANK: {
    method: 'rank',
    parameters: [
      { argumentType: FunctionArgumentType.NUMBER },
      { argumentType: FunctionArgumentType.RANGE },
      {
        argumentType: FunctionArgumentType.NUMBER,
        defaultValue: 0,
        optionalArg: true,
      },
    ],
  },
}

// ── Register plugin + translations SEBELUM buildEmpty ──
// License key 'gpl-v3' mengizinkan penggunaan gratis untuk proyek open-source
// (SAKOLA adalah proyek open-source di GitHub)
HyperFormula.registerFunctionPlugin(RankPlugin as any, {
  enGB: { RANK: 'RANK' },
  enUS: { RANK: 'RANK' },
})

// Singleton instance
let _hf: HyperFormula | null = null

export function getHyperformula(): HyperFormula {
  if (!_hf) {
    _hf = HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3',
    })
    // ── Register TRUE/FALSE as named expressions ──
    // Hyperformula tidak punya TRUE/FALSE sebagai literal keyword
    // (hanya TRUE() / FALSE() functions). Excel menggunakan TRUE/FALSE sebagai literal,
    // jadi kita register sebagai named expression global.
    _hf.addNamedExpression('TRUE', true)
    _hf.addNamedExpression('FALSE', false)
  }
  return _hf
}

// ── Helpers ──
// Convert A1 notation to {row, col} (0-indexed)
export function parseCellAddress(addr: string): { row: number; col: number } {
  const m = addr.match(/^([A-Z]+)(\d+)$/)
  if (!m) return { row: 0, col: 0 }
  const colStr = m[1]
  let col = 0
  for (let i = 0; i < colStr.length; i++) {
    col = col * 26 + (colStr.charCodeAt(i) - 64)
  }
  return { row: parseInt(m[2], 10) - 1, col: col - 1 }
}

// Convert {row, col} to A1 notation
export function toCellAddress(row: number, col: number): string {
  let c = col + 1
  let s = ''
  while (c > 0) {
    const rem = (c - 1) % 26
    s = String.fromCharCode(65 + rem) + s
    c = Math.floor((c - 1) / 26)
  }
  return s + (row + 1)
}

// Convert column index to letter(s): 0 -> A, 1 -> B, 26 -> AA
export function colToLetters(col: number): string {
  let c = col + 1
  let s = ''
  while (c > 0) {
    const rem = (c - 1) % 26
    s = String.fromCharCode(65 + rem) + s
    c = Math.floor((c - 1) / 26)
  }
  return s
}

// Extract all formula names used in a cell value
// Returns array of uppercase formula names found (e.g. ['SUM', 'VLOOKUP'])
const FORMULA_NAMES = [
  'SUM',
  'AVERAGE',
  'IF',
  'VLOOKUP',
  'HLOOKUP',
  'COUNTIF',
  'RANK',
]

export function extractFormulas(cellValue: string): string[] {
  if (!cellValue || typeof cellValue !== 'string') return []
  if (!cellValue.startsWith('=')) return []
  const found: string[] = []
  const upper = cellValue.toUpperCase()
  for (const fn of FORMULA_NAMES) {
    // Match whole word (case-insensitive) — followed by '('
    const re = new RegExp(`\\b${fn}\\s*\\(`, 'gi')
    if (re.test(upper)) found.push(fn)
  }
  return found
}

// Get list of supported formulas (for display)
export const SUPPORTED_FORMULAS = FORMULA_NAMES

// Compute formula result for a given cell value (string starting with '=')
// Returns { value, error? }
export function evaluateFormula(
  hf: HyperFormula,
  sheetId: number,
  row: number,
  col: number
): { value: any; isFormula: boolean; formula?: string } {
  const cellValue = hf.getCellFormula({ sheet: sheetId, row, col })
  if (cellValue !== undefined) {
    const v = hf.getCellValue({ sheet: sheetId, row, col })
    return { value: v, isFormula: true, formula: cellValue }
  }
  return {
    value: hf.getCellValue({ sheet: sheetId, row, col }),
    isFormula: false,
  }
}
