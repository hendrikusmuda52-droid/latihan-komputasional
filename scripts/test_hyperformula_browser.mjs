// Test Hyperformula with proper API (setSheetContent takes positional args)

import { getHyperformula, extractFormulas } from '../src/lib/hyperformula-instance.ts'

const hf = getHyperformula()
const sheetName = hf.addSheet('test')
const sheetId = hf.getSheetId(sheetName)
console.log('Sheet name:', sheetName, 'id:', sheetId)

// Build 30-row × 13-col grid (matching practicum-stage.tsx)
const grid = []
for (let r = 0; r < 30; r++) {
  grid.push(Array(13).fill(null))
}

// Row 0 (Excel 1): title
grid[0][0] = 'Data Penjualan Toko Elektronik Nusantara Jaya — Oktober 2026'

// Row 2 (Excel 3): header
grid[2] = ['No', 'Nama Sales', 'Laptop', 'Handphone', 'Tablet', 'Aksesoris', 'Target', 'Total Penjualan', 'Rata-rata', 'Status Target', 'Komisi (%)', 'Kategori Terlaris', 'Peringkat']

// Rows 3-8 (Excel 4-9): data + formulas
const sales = [
  [1, 'Adi Saputra',   12, 25, 8, 40, 80],
  [2, 'Budi Hartono',  15, 30, 6, 35, 85],
  [3, 'Citra Lestari', 8,  28, 10, 45, 90],
  [4, 'Dian Pertiwi',  18, 22, 12, 30, 80],
  [5, 'Eka Nugroho',   10, 35, 5, 50, 95],
  [6, 'Fajar Ramadhan',14, 20, 9, 38, 75],
]

for (let i = 0; i < 6; i++) {
  const row = 3 + i // 0-indexed
  const r = row + 1 // 1-indexed for formula references
  grid[row] = [
    sales[i][0], sales[i][1], sales[i][2], sales[i][3], sales[i][4], sales[i][5], sales[i][6],
    `=SUM(C${r}:F${r})`,
    `=AVERAGE(C${r}:F${r})`,
    `=IF(H${r}>=G${r},"Lolos","Tidak Lolos")`,
    `=VLOOKUP(H${r},$B$15:$C$18,2,TRUE)`,
    `=HLOOKUP(MATCH(MAX(C${r}:F${r}),C${r}:F${r},0),$B$22:$E$23,2,FALSE)`,
    `=RANK(H${r},$H$4:$H$9,0)`,
  ]
}

// Row 9 (Excel 10): TOTAL label
grid[9] = ['TOTAL', '(per kategori)']

// Row 12 (Excel 13): tabel referensi komisi header
grid[12][0] = 'Tabel Referensi Komisi (untuk VLOOKUP)'
grid[13] = ['Kode', 'Min Total', 'Komisi (%)']
grid[14] = ['A', 0, 2.0]
grid[15] = ['B', 70, 3.5]
grid[16] = ['C', 100, 5.0]
grid[17] = ['D', 120, 7.5]

// Row 20 (Excel 21): tabel referensi kategori header
grid[20][0] = 'Tabel Referensi Kategori (untuk HLOOKUP)'
grid[21] = ['Kode', 1, 2, 3, 4, null, null, null, null, null, null, null, null]
grid[22] = ['Nama Kategori', 'Laptop', 'Handphone', 'Tablet', 'Aksesoris']
grid[23] = ['Harga Satuan', 8000000, 3000000, 4500000, 250000]

// Row 25 (Excel 26): COUNTIF summary
grid[25][0] = 'Jumlah Sales yang Lolos Target:'
grid[25][1] = '=COUNTIF(J4:J9,"Lolos")'
grid[26][0] = 'Jumlah Sales yang Tidak Lolos:'
grid[26][1] = '=COUNTIF(J4:J9,"Tidak Lolos")'

// Set sheet content
hf.setSheetContent(sheetId, grid)

// Read computed values
console.log('═══ HYPERFORMULA TEST (KELAS 8 PRACTICUM DATA) ═══\n')
console.log('Sales data + computed formula values:')
const salesNames = ['Adi', 'Budi', 'Citra', 'Dian', 'Eka', 'Fajar']
console.log('Name'.padEnd(8), 'SUM'.padEnd(8), 'AVG'.padEnd(8), 'Status'.padEnd(14), 'Komisi'.padEnd(8), 'Kategori'.padEnd(14), 'Rank')
for (let i = 0; i < 6; i++) {
  const row = 3 + i // 0-indexed
  const sum = hf.getCellValue({ sheet: sheetId, row, col: 7 }) // H
  const avg = hf.getCellValue({ sheet: sheetId, row, col: 8 }) // I
  const status = hf.getCellValue({ sheet: sheetId, row, col: 9 }) // J
  const komisi = hf.getCellValue({ sheet: sheetId, row, col: 10 }) // K
  const kategori = hf.getCellValue({ sheet: sheetId, row, col: 11 }) // L
  const rank = hf.getCellValue({ sheet: sheetId, row, col: 12 }) // M
  console.log(
    salesNames[i].padEnd(8),
    String(sum).padEnd(8),
    (typeof avg === 'number' ? avg.toFixed(2) : avg).toString().padEnd(8),
    String(status).padEnd(14),
    String(komisi).padEnd(8),
    String(kategori).padEnd(14),
    String(rank)
  )
}

console.log('\nCOUNTIF results:')
console.log('  Lolos:', hf.getCellValue({ sheet: sheetId, row: 25, col: 1 }))
console.log('  Tidak Lolos:', hf.getCellValue({ sheet: sheetId, row: 26, col: 1 }))

console.log('\nExpected:')
console.log('  Adi (12+25+8+40=85) ≥ 80 → Lolos, Komisi 3.5, Kategori=Handphone (25 max), Rank desc')
console.log('  Budi (15+30+6+35=86) ≥ 85 → Lolos, Komisi 3.5, Kategori=Handphone (30 max)')
console.log('  Citra (8+28+10+45=91) ≥ 90 → Lolos, Komisi 3.5, Kategori=Aksesoris (45 max)')
console.log('  Dian (18+22+12+30=82) ≥ 80 → Lolos, Komisi 3.5, Kategori=Laptop (18 max)')
console.log('  Eka (10+35+5+50=100) ≥ 95 → Lolos, Komisi 5.0 (≥100), Kategori=Aksesoris (50 max), Rank 1')
console.log('  Fajar (14+20+9+38=81) ≥ 75 → Lolos, Komisi 3.5, Kategori=Aksesoris (38 max)')
console.log('\nAll 6 should be "Lolos" → COUNTIF Lolos = 6, Tidak Lolos = 0')

// Verify all formulas detected
console.log('\nFormulas detected in cells:')
for (const r of [3, 4, 5, 6, 7, 8]) {
  for (const c of [7, 8, 9, 10, 11, 12]) {
    const formula = hf.getCellFormula({ sheet: sheetId, row: r, col: c })
    if (formula) {
      const addr = String.fromCharCode(65 + c) + (r + 1)
      const fns = extractFormulas('=' + formula)
      console.log(`  ${addr}: =${formula}  → formulas: ${fns.join(', ')}`)
    }
  }
}
