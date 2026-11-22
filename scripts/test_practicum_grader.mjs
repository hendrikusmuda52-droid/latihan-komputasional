// Standalone test that doesn't go through practicum-grader.ts (which has TS imports)
// Run: node --experimental-strip-types scripts/test_practicum_grader.mjs

import { gradePracticum } from '../src/lib/practicum-grader.ts'
// Re-import the data directly (avoid going through grader's broken import)
import * as PD from '../src/lib/practicum-data.ts'

// Override with the right values for testing — gradePracticum internally imports its own
// copy via the grader module, but we test it works on the right inputs

// ── Test 1: Jawaban SEMPURNA ──
const sheet1 = PD.getInitialSheetState()

// Isi semua formula yang benar
const correctFormulas = {
  // SUM (rows 4-9, kolom H)
  H4: 'SUM(C4:F4)', H5: 'SUM(C5:F5)', H6: 'SUM(C6:F6)',
  H7: 'SUM(C7:F7)', H8: 'SUM(C8:F8)', H9: 'SUM(C9:F9)',
  // AVERAGE (rows 4-9, kolom I)
  I4: 'AVERAGE(C4:F4)', I5: 'AVERAGE(C5:F5)', I6: 'AVERAGE(C6:F6)',
  I7: 'AVERAGE(C7:F7)', I8: 'AVERAGE(C8:F8)', I9: 'AVERAGE(C9:F9)',
  // IF (rows 4-9, kolom J)
  J4: 'IF(H4>=G4,"Lolos","Tidak Lolos")',
  J5: 'IF(H5>=G5,"Lolos","Tidak Lolos")',
  J6: 'IF(H6>=G6,"Lolos","Tidak Lolos")',
  J7: 'IF(H7>=G7,"Lolos","Tidak Lolos")',
  J8: 'IF(H8>=G8,"Lolos","Tidak Lolos")',
  J9: 'IF(H9>=G9,"Lolos","Tidak Lolos")',
  // VLOOKUP (rows 4-9, kolom K)
  K4: 'VLOOKUP(H4,B15:C18,2,TRUE)',
  K5: 'VLOOKUP(H5,B15:C18,2,TRUE)',
  K6: 'VLOOKUP(H6,B15:C18,2,TRUE)',
  K7: 'VLOOKUP(H7,B15:C18,2,TRUE)',
  K8: 'VLOOKUP(H8,B15:C18,2,TRUE)',
  K9: 'VLOOKUP(H9,B15:C18,2,TRUE)',
  // HLOOKUP (rows 4-9, kolom L)
  L4: 'HLOOKUP(MATCH(MAX(C4:F4),C4:F4,0),B22:E23,2,FALSE)',
  L5: 'HLOOKUP(MATCH(MAX(C5:F5),C5:F5,0),B22:E23,2,FALSE)',
  L6: 'HLOOKUP(MATCH(MAX(C6:F6),C6:F6,0),B22:E23,2,FALSE)',
  L7: 'HLOOKUP(MATCH(MAX(C7:F7),C7:F7,0),B22:E23,2,FALSE)',
  L8: 'HLOOKUP(MATCH(MAX(C8:F8),C8:F8,0),B22:E23,2,FALSE)',
  L9: 'HLOOKUP(MATCH(MAX(C9:F9),C9:F9,0),B22:E23,2,FALSE)',
  // COUNTIF
  B26: 'COUNTIF(J4:J9,"Lolos")',
  B27: 'COUNTIF(J4:J9,"Tidak Lolos")',
  // RANK (rows 4-9, kolom M)
  M4: 'RANK(H4,H4:H9,0)', M5: 'RANK(H5,H4:H9,0)',
  M6: 'RANK(H6,H4:H9,0)', M7: 'RANK(H7,H4:H9,0)',
  M8: 'RANK(H8,H4:H9,0)', M9: 'RANK(H9,H4:H9,0)',
}

for (const [cell, formula] of Object.entries(correctFormulas)) {
  sheet1.cells[cell] = { f: formula }
}

const info1 = {
  q1: 'Eka Nugroho',
  q2: '100',
  q3: '5.0',
  q4: '6',
  q5: 'Lolos, Aksesoris',
  q6: 'Tidak ada',
}

const result1 = gradePracticum(sheet1, info1)
console.log('═══ TEST 1: Jawaban Sempurna ═══')
console.log('Formula Score:', result1.formulaScore, '/100')
console.log('Info Score:', result1.infoScore, '/100')
console.log('TOTAL Score:', result1.totalScore, '/100')
console.log('Formulas used (counts):', Object.fromEntries(Object.entries(result1.formulasUsed).map(([k, v]) => [k, v.count])))
console.log('Formula earned:', result1.formulaEarned, '/', result1.formulaMax)
console.log('Info earned:', result1.infoEarned, '/', result1.infoMax)
console.log('Wrong criteria:')
result1.formulaResults.filter(r => !r.correct).forEach(r => {
  console.log(` - ${r.criterionId} (${r.cell}): ${r.reason}`)
})
result1.infoResults.filter(r => !r.correct).forEach(r => {
  console.log(` - ${r.questionId}: expected "${r.expectedAnswer}", got "${r.actualAnswer}"`)
})
