// ════════════════════════════════════════════════════════════════════════
// UJIAN PRAKTIK KELAS 8 — PENGOLAHAN DATA MENGGUNAKAN SPREADSHEET
// ════════════════════════════════════════════════════════════════════════
//
// Skenario: Siswa adalah asisten manajer "Toko Elektronik Nusantara Jaya"
// yang diminta mengolah data penjualan 6 sales untuk 4 kategori produk
// selama 1 bulan. Siswa diminta menggunakan formula:
//   - SUM         : menghitung total penjualan per sales
//   - AVERAGE     : menghitung rata-rata penjualan per sales
//   - COUNTIF     : menghitung jumlah transaksi yang memenuhi kriteria
//   - IF          : menentukan status kelulusan target per sales
//   - VLOOKUP      : mengambil komisi (% bonus) dari tabel referensi
//   - HLOOKUP      : mengambil nama kategori produk dari tabel referensi horizontal
//   - RANK        : menentukan peringkat sales berdasarkan total penjualan

// ── DATASET AWAL (di-preload ke spreadsheet siswa) ──
// Kolom: A=Nama Sales, B=Laptop, C=Handphone, D=Tablet, E=Aksesoris, F=Target

export interface CellData {
  v?: string | number // value (raw)
  f?: string // formula (without '=')
}

export interface InitialSheet {
  cells: Record<string, CellData>
  colWidths?: number[]
}

// ── Soal cerita stimulus ──
export const PRACTICUM_STORY = `# Ujian Praktek Kelas 8 — Pengolahan Data Penjualan Toko Elektronik

## Latar Belakang

Anda adalah asisten manajer di **Toko Elektronik Nusantara Jaya**, sebuah toko yang menjual 4 kategori produk: **Laptop, Handphone, Tablet, dan Aksesoris**. Toko Anda memiliki **6 orang sales** yang bertugas menjual produk ke pelanggan.

Manajer toko, Bapak **Andi Wijaya**, meminta Anda untuk mengolah data penjualan bulanan ke dalam spreadsheet agar mudah dianalisis. Berikut adalah data penjualan selama bulan **Oktober 2026**:

## Data Penjualan (per sales, dalam unit terjual)

| No | Nama Sales   | Laptop | Handphone | Tablet | Aksesoris | Target (unit) |
|----|--------------|--------|-----------|--------|-----------|---------------|
| 1  | Adi Saputra  | 12     | 25        | 8      | 40        | 80            |
| 2  | Budi Hartono | 15     | 30        | 6      | 35        | 85            |
| 3  | Citra Lestari| 8      | 28        | 10     | 45        | 90            |
| 4  | Dian Pertiwi | 18     | 22        | 12     | 30        | 80            |
| 5  | Eka Nugroho  | 10     | 35        | 5      | 50        | 95            |
| 6  | Fajar Ramadhan | 14   | 20        | 9      | 38        | 75            |

## Tabel Referensi Komisi (untuk VLOOKUP)

| Kode | Total Penjualan (unit) | Komisi (%) |
|------|------------------------|------------|
| A    | < 70                   | 2.0%       |
| B    | 70 - 99                | 3.5%       |
| C    | 100 - 119              | 5.0%       |
| D    | ≥ 120                  | 7.5%       |

## Tabel Referensi Kategori (untuk HLOOKUP)

|            | K1 | K2 | K3 | K4 |
|------------|----|----|----|----|
| Kode       | 1  | 2  | 3  | 4  |
| Nama Kategori | Laptop | Handphone | Tablet | Aksesoris |
| Harga Satuan (Rp) | 8.000.000 | 3.000.000 | 4.500.000 | 250.000 |

## Instruksi Pengerjaan

Anda WAJIB menggunakan **formula** untuk mengolah data berikut. Penilaian didasarkan pada **penggunaan formula yang tepat**, bukan pada hasil akhirnya saja:

1. **Total Penjualan per Sales** (kolom G) — gunakan **SUM**
2. **Rata-rata Penjualan per Sales** (kolom H) — gunakan **AVERAGE**
3. **Status Kelulusan Target** (kolom I) — gunakan **IF** (Lolos / Tidak Lolos)
4. **Komisi (%) per Sales** (kolom J) — gunakan **VLOOKUP** dari tabel referensi
5. **Kategori Produk Terlaris** (kolom K) — gunakan **HLOOKUP** dari tabel kategori
6. **Jumlah Sales yang Lolos Target** (sel di atas) — gunakan **COUNTIF**
7. **Peringkat Sales** (kolom L) — gunakan **RANK** berdasarkan total penjualan

## Pertanyaan Informasi

Setelah mengolah data, jawab pertanyaan informasi berikut di bagian bawah. Gunakan hasil dari spreadsheet yang sudah Anda olah.
`

// ── Konfigurasi spreadsheet awal ──
// Cell layout (1-indexed):
//   A1: "Data Penjualan Toko Elektronik Nusantara Jaya — Oktober 2026"
//   Row 3: header tabel penjualan utama
//   Rows 4-9: data 6 sales
//   Row 10: TOTAL (sum per kategori)
//
//   Row 13-17: tabel referensi komisi (untuk VLOOKUP)
//   Row 20-22: tabel referensi kategori (untuk HLOOKUP)
//
//   Row 25: jumlah sales yang lolos target (COUNTIF)
//
// Output columns: G (Total), H (Average), I (Status), J (Komisi), K (Kategori Terlaris), L (Rank)

// ── Judul spreadsheet (dirender sebagai heading di luar tabel) ──
export const PRACTICUM_TITLE = 'Data Penjualan Toko Elektronik Nusantara Jaya — Oktober 2026'

export function getInitialSheetState(): InitialSheet {
  const cells: Record<string, CellData> = {}

  // (Title dipindah ke heading di luar tabel — lihat PRACTICUM_TITLE)

  // ── Tabel utama (rows 3-9) ──
  // Header row 3
  cells['A3'] = { v: 'No' }
  cells['B3'] = { v: 'Nama Sales' }
  cells['C3'] = { v: 'Laptop' }
  cells['D3'] = { v: 'Handphone' }
  cells['E3'] = { v: 'Tablet' }
  cells['F3'] = { v: 'Aksesoris' }
  cells['G3'] = { v: 'Target' }
  cells['H3'] = { v: 'Total Penjualan' }
  cells['I3'] = { v: 'Rata-rata' }
  cells['J3'] = { v: 'Status Target' }
  cells['K3'] = { v: 'Komisi (%)' }
  cells['L3'] = { v: 'Kategori Terlaris' }
  cells['M3'] = { v: 'Peringkat' }

  // Data 6 sales (rows 4-9)
  const salesData = [
    [1, 'Adi Saputra',   12, 25, 8, 40, 80],
    [2, 'Budi Hartono',  15, 30, 6, 35, 85],
    [3, 'Citra Lestari', 8,  28, 10, 45, 90],
    [4, 'Dian Pertiwi',  18, 22, 12, 30, 80],
    [5, 'Eka Nugroho',   10, 35, 5, 50, 95],
    [6, 'Fajar Ramadhan',14, 20, 9, 38, 75],
  ]

  salesData.forEach((row, i) => {
    const r = 4 + i // rows 4-9
    cells[`A${r}`] = { v: row[0] } // No
    cells[`B${r}`] = { v: row[1] } // Nama
    cells[`C${r}`] = { v: row[2] } // Laptop
    cells[`D${r}`] = { v: row[3] } // Handphone
    cells[`E${r}`] = { v: row[4] } // Tablet
    cells[`F${r}`] = { v: row[5] } // Aksesoris
    cells[`G${r}`] = { v: row[6] } // Target
    // H, I, J, K, L, M kosong — siswa harus isi dengan formula
  })

  // Row 10: TOTAL per kategori (siswa juga bisa pakai SUM di sini sebagai bonus)
  cells['A10'] = { v: 'TOTAL' }
  cells['B10'] = { v: '(per kategori)' }

  // ── Tabel referensi komisi (VLOOKUP) — rows 13-17 ──
  cells['A13'] = { v: 'Tabel Referensi Komisi (untuk VLOOKUP)' }
  cells['A14'] = { v: 'Kode' }
  cells['B14'] = { v: 'Min Total' }
  cells['C14'] = { v: 'Komisi (%)' }
  cells['A15'] = { v: 'A' }
  cells['B15'] = { v: 0 }
  cells['C15'] = { v: 2.0 }
  cells['A16'] = { v: 'B' }
  cells['B16'] = { v: 70 }
  cells['C16'] = { v: 3.5 }
  cells['A17'] = { v: 'C' }
  cells['B17'] = { v: 100 }
  cells['C17'] = { v: 5.0 }
  cells['A18'] = { v: 'D' }
  cells['B18'] = { v: 120 }
  cells['C18'] = { v: 7.5 }

  // ── Tabel referensi kategori (HLOOKUP) — rows 21-23 ──
  cells['A21'] = { v: 'Tabel Referensi Kategori (untuk HLOOKUP)' }
  cells['A22'] = { v: 'Kode' }
  cells['B22'] = { v: 1 }
  cells['C22'] = { v: 2 }
  cells['D22'] = { v: 3 }
  cells['E22'] = { v: 4 }
  cells['A23'] = { v: 'Nama Kategori' }
  cells['B23'] = { v: 'Laptop' }
  cells['C23'] = { v: 'Handphone' }
  cells['D23'] = { v: 'Tablet' }
  cells['E23'] = { v: 'Aksesoris' }
  cells['A24'] = { v: 'Harga Satuan' }
  cells['B24'] = { v: 8000000 }
  cells['C24'] = { v: 3000000 }
  cells['D24'] = { v: 4500000 }
  cells['E24'] = { v: 250000 }

  // ── Sel ringkasan (di samping tabel utama) ──
  cells['A26'] = { v: 'Jumlah Sales yang Lolos Target:' }
  // B26 akan diisi siswa dengan COUNTIF
  cells['A27'] = { v: 'Jumlah Sales yang Tidak Lolos:' }
  // B27 akan diisi siswa dengan COUNTIF

  // Col widths (chars)
  const colWidths = [6, 18, 10, 12, 10, 12, 10, 14, 12, 16, 12, 18, 10]

  return { cells, colWidths }
}

// ── Soal Informasi (siswa beri jawaban dari hasil olahan) ──
export interface InfoQuestion {
  id: string
  question: string
  hint?: string
  // Expected answer (string, dipakai untuk auto-grading, normalisasi dulu)
  // Bisa di-set ke null jika ingin guru yang menilai manual
  expectedAnswer?: string | null
  acceptedAnswers?: string[] // alternatif jawaban yang diterima
  points: number
}

export const INFO_QUESTIONS: InfoQuestion[] = [
  {
    id: 'q1',
    question:
      'Siapa sales yang mendapatkan peringkat #1 (penjualan tertinggi)? Sebutkan namanya.',
    hint: 'Lihat kolom Peringkat (M). Sales dengan peringkat 1 adalah pemenangnya.',
    expectedAnswer: 'Eka Nugroho',
    acceptedAnswers: ['Eka Nugroho', 'Eka', 'eka nugroho', 'EKA NUGROHO'],
    points: 5,
  },
  {
    id: 'q2',
    question:
      'Berapa total penjualan (semua kategori) dari sales dengan peringkat #1?',
    hint: 'Lihat kolom Total Penjualan (H) pada baris sales peringkat 1.',
    expectedAnswer: '100',
    acceptedAnswers: ['100', '100 unit', '100.0'],
    points: 5,
  },
  {
    id: 'q3',
    question:
      'Berapa persen komisi yang diterima oleh sales peringkat #1? (Berdasarkan total penjualannya)',
    hint: 'Lihat kolom Komisi (K) pada baris sales peringkat 1. Total 100 unit jatuh pada kategori C.',
    expectedAnswer: '5.0',
    acceptedAnswers: ['5', '5.0', '5%', '5.0%'],
    points: 5,
  },
  {
    id: 'q4',
    question:
      'Berapa jumlah sales yang berhasil LOLOS target penjualan? (Gunakan COUNTIF di sel ringkasan)',
    hint: 'COUNTIF pada kolom Status Target (J), kriteria "Lolos". Semua 6 sales totalnya melampaui target masing-masing.',
    expectedAnswer: '6',
    acceptedAnswers: ['6', '6 sales', 'enam', 'semua'],
    points: 5,
  },
  {
    id: 'q5',
    question:
      'Apakah Budi Hartono lolos target? Sebutkan kategori produk yang paling banyak dijualnya.',
    hint: 'Cek kolom Status Target (J) dan kolom Kategori Terlaris (L) baris Budi. Budi menjual Laptop 15, Handphone 30, Tablet 6, Aksesoris 35 — mana yang terbesar?',
    expectedAnswer: 'Lolos, Aksesoris',
    acceptedAnswers: [
      'Lolos, Aksesoris',
      'Lolos; Aksesoris',
      'Lolos Aksesoris',
      'Ya, Aksesoris',
    ],
    points: 5,
  },
  {
    id: 'q6',
    question:
      'Sebutkan nama sales yang TIDAK lolos target. (Pisahkan dengan koma jika lebih dari satu)',
    hint: 'Cek kolom Status Target (J) — cari yang "Tidak Lolos". Jika tidak ada, tulis "Tidak ada".',
    expectedAnswer: 'Tidak ada',
    acceptedAnswers: [
      'Tidak ada',
      'Tidak ada sales yang tidak lolos',
      'tidak ada',
      'TIDAK ADA',
      'kosong',
      '-',
      'tidak',
      'none',
    ],
    points: 5,
  },
]

// ── Rubrik Penilaian Formula (7 kriteria utama) ──
// Setiap kriteria diuji pada cell tertentu, dengan formula yang diharapkan
// Auto-grader akan memeriksa apakah formula siswa di cell tersebut mengandung
// nama formula yang diharapkan (e.g. "SUM"), dan idealnya range yang benar.

export interface FormulaCriterion {
  id: string
  description: string // deskripsi tugasan
  // Cell target yang harus berisi formula
  cell: string // e.g. "H4"
  // Nama formula yang diharapkan (uppercase)
  expectedFormula: string // e.g. "SUM"
  // Range/value yang diharapkan ada di formula (regex, optional)
  // e.g. /C4:F4/i untuk SUM(C4:F4)
  expectedPattern?: RegExp
  // Range yang valid (untuk info grading, tidak untuk strict match)
  expectedRangeHint?: string
  points: number
  // Kategori (untuk grouping di UI grading)
  category: 'sum' | 'average' | 'if' | 'vlookup' | 'hlookup' | 'countif' | 'rank'
}

export const FORMULA_CRITERIA: FormulaCriterion[] = [
  // ── 1. SUM: Total penjualan per sales (kolom H, rows 4-9) ──
  // Setiap cell H4..H9 harus berisi =SUM(C4:F4) atau range yang setara
  // 6 baris × 2 poin = 12 poin
  {
    id: 'sum-4',
    description: 'SUM Total penjualan Adi (H4) = SUM(C4:F4)',
    cell: 'H4',
    expectedFormula: 'SUM',
    expectedPattern: /C4\s*:\s*F4/i,
    expectedRangeHint: 'C4:F4',
    points: 2,
    category: 'sum',
  },
  {
    id: 'sum-5',
    description: 'SUM Total penjualan Budi (H5) = SUM(C5:F5)',
    cell: 'H5',
    expectedFormula: 'SUM',
    expectedPattern: /C5\s*:\s*F5/i,
    expectedRangeHint: 'C5:F5',
    points: 2,
    category: 'sum',
  },
  {
    id: 'sum-6',
    description: 'SUM Total penjualan Citra (H6) = SUM(C6:F6)',
    cell: 'H6',
    expectedFormula: 'SUM',
    expectedPattern: /C6\s*:\s*F6/i,
    expectedRangeHint: 'C6:F6',
    points: 2,
    category: 'sum',
  },
  {
    id: 'sum-7',
    description: 'SUM Total penjualan Dian (H7) = SUM(C7:F7)',
    cell: 'H7',
    expectedFormula: 'SUM',
    expectedPattern: /C7\s*:\s*F7/i,
    expectedRangeHint: 'C7:F7',
    points: 2,
    category: 'sum',
  },
  {
    id: 'sum-8',
    description: 'SUM Total penjualan Eka (H8) = SUM(C8:F8)',
    cell: 'H8',
    expectedFormula: 'SUM',
    expectedPattern: /C8\s*:\s*F8/i,
    expectedRangeHint: 'C8:F8',
    points: 2,
    category: 'sum',
  },
  {
    id: 'sum-9',
    description: 'SUM Total penjualan Fajar (H9) = SUM(C9:F9)',
    cell: 'H9',
    expectedFormula: 'SUM',
    expectedPattern: /C9\s*:\s*F9/i,
    expectedRangeHint: 'C9:F9',
    points: 2,
    category: 'sum',
  },

  // ── 2. AVERAGE: Rata-rata penjualan per sales (kolom I, rows 4-9) ──
  // 6 baris × 2 poin = 12 poin
  {
    id: 'avg-4',
    description: 'AVERAGE Rata-rata penjualan Adi (I4) = AVERAGE(C4:F4)',
    cell: 'I4',
    expectedFormula: 'AVERAGE',
    expectedPattern: /C4\s*:\s*F4/i,
    expectedRangeHint: 'C4:F4',
    points: 2,
    category: 'average',
  },
  {
    id: 'avg-5',
    description: 'AVERAGE Rata-rata penjualan Budi (I5) = AVERAGE(C5:F5)',
    cell: 'I5',
    expectedFormula: 'AVERAGE',
    expectedPattern: /C5\s*:\s*F5/i,
    expectedRangeHint: 'C5:F5',
    points: 2,
    category: 'average',
  },
  {
    id: 'avg-6',
    description: 'AVERAGE Rata-rata penjualan Citra (I6) = AVERAGE(C6:F6)',
    cell: 'I6',
    expectedFormula: 'AVERAGE',
    expectedPattern: /C6\s*:\s*F6/i,
    expectedRangeHint: 'C6:F6',
    points: 2,
    category: 'average',
  },
  {
    id: 'avg-7',
    description: 'AVERAGE Rata-rata penjualan Dian (I7) = AVERAGE(C7:F7)',
    cell: 'I7',
    expectedFormula: 'AVERAGE',
    expectedPattern: /C7\s*:\s*F7/i,
    expectedRangeHint: 'C7:F7',
    points: 2,
    category: 'average',
  },
  {
    id: 'avg-8',
    description: 'AVERAGE Rata-rata penjualan Eka (I8) = AVERAGE(C8:F8)',
    cell: 'I8',
    expectedFormula: 'AVERAGE',
    expectedPattern: /C8\s*:\s*F8/i,
    expectedRangeHint: 'C8:F8',
    points: 2,
    category: 'average',
  },
  {
    id: 'avg-9',
    description: 'AVERAGE Rata-rata penjualan Fajar (I9) = AVERAGE(C9:F9)',
    cell: 'I9',
    expectedFormula: 'AVERAGE',
    expectedPattern: /C9\s*:\s*F9/i,
    expectedRangeHint: 'C9:F9',
    points: 2,
    category: 'average',
  },

  // ── 3. IF: Status kelulusan target (kolom J, rows 4-9) ──
  // J4 = IF(H4>=G4,"Lolos","Tidak Lolos")
  // 6 baris × 2 poin = 12 poin
  {
    id: 'if-4',
    description: 'IF Status Adi (J4) = IF(H4>=G4,"Lolos","Tidak Lolos")',
    cell: 'J4',
    expectedFormula: 'IF',
    expectedPattern: /H4\s*>=?\s*G4/i,
    expectedRangeHint: 'H4>=G4',
    points: 2,
    category: 'if',
  },
  {
    id: 'if-5',
    description: 'IF Status Budi (J5) = IF(H5>=G5,"Lolos","Tidak Lolos")',
    cell: 'J5',
    expectedFormula: 'IF',
    expectedPattern: /H5\s*>=?\s*G5/i,
    expectedRangeHint: 'H5>=G5',
    points: 2,
    category: 'if',
  },
  {
    id: 'if-6',
    description: 'IF Status Citra (J6) = IF(H6>=G6,"Lolos","Tidak Lolos")',
    cell: 'J6',
    expectedFormula: 'IF',
    expectedPattern: /H6\s*>=?\s*G6/i,
    expectedRangeHint: 'H6>=G6',
    points: 2,
    category: 'if',
  },
  {
    id: 'if-7',
    description: 'IF Status Dian (J7) = IF(H7>=G7,"Lolos","Tidak Lolos")',
    cell: 'J7',
    expectedFormula: 'IF',
    expectedPattern: /H7\s*>=?\s*G7/i,
    expectedRangeHint: 'H7>=G7',
    points: 2,
    category: 'if',
  },
  {
    id: 'if-8',
    description: 'IF Status Eka (J8) = IF(H8>=G8,"Lolos","Tidak Lolos")',
    cell: 'J8',
    expectedFormula: 'IF',
    expectedPattern: /H8\s*>=?\s*G8/i,
    expectedRangeHint: 'H8>=G8',
    points: 2,
    category: 'if',
  },
  {
    id: 'if-9',
    description: 'IF Status Fajar (J9) = IF(H9>=G9,"Lolos","Tidak Lolos")',
    cell: 'J9',
    expectedFormula: 'IF',
    expectedPattern: /H9\s*>=?\s*G9/i,
    expectedRangeHint: 'H9>=G9',
    points: 2,
    category: 'if',
  },

  // ── 4. VLOOKUP: Komisi (%) per sales (kolom K, rows 4-9) ──
  // K4 = VLOOKUP(H4, B15:C18, 2, TRUE)  — approximate match
  // 6 baris × 3 poin = 18 poin
  {
    id: 'vlookup-4',
    description: 'VLOOKUP Komisi Adi (K4) = VLOOKUP(H4, B15:C18, 2, TRUE)',
    cell: 'K4',
    expectedFormula: 'VLOOKUP',
    expectedPattern: /B15\s*:\s*C18/i,
    expectedRangeHint: 'B15:C18',
    points: 3,
    category: 'vlookup',
  },
  {
    id: 'vlookup-5',
    description: 'VLOOKUP Komisi Budi (K5) = VLOOKUP(H5, B15:C18, 2, TRUE)',
    cell: 'K5',
    expectedFormula: 'VLOOKUP',
    expectedPattern: /B15\s*:\s*C18/i,
    expectedRangeHint: 'B15:C18',
    points: 3,
    category: 'vlookup',
  },
  {
    id: 'vlookup-6',
    description: 'VLOOKUP Komisi Citra (K6) = VLOOKUP(H6, B15:C18, 2, TRUE)',
    cell: 'K6',
    expectedFormula: 'VLOOKUP',
    expectedPattern: /B15\s*:\s*C18/i,
    expectedRangeHint: 'B15:C18',
    points: 3,
    category: 'vlookup',
  },
  {
    id: 'vlookup-7',
    description: 'VLOOKUP Komisi Dian (K7) = VLOOKUP(H7, B15:C18, 2, TRUE)',
    cell: 'K7',
    expectedFormula: 'VLOOKUP',
    expectedPattern: /B15\s*:\s*C18/i,
    expectedRangeHint: 'B15:C18',
    points: 3,
    category: 'vlookup',
  },
  {
    id: 'vlookup-8',
    description: 'VLOOKUP Komisi Eka (K8) = VLOOKUP(H8, B15:C18, 2, TRUE)',
    cell: 'K8',
    expectedFormula: 'VLOOKUP',
    expectedPattern: /B15\s*:\s*C18/i,
    expectedRangeHint: 'B15:C18',
    points: 3,
    category: 'vlookup',
  },
  {
    id: 'vlookup-9',
    description: 'VLOOKUP Komisi Fajar (K9) = VLOOKUP(H9, B15:C18, 2, TRUE)',
    cell: 'K9',
    expectedFormula: 'VLOOKUP',
    expectedPattern: /B15\s*:\s*C18/i,
    expectedRangeHint: 'B15:C18',
    points: 3,
    category: 'vlookup',
  },

  // ── 5. HLOOKUP: Kategori Terlaris per sales (kolom L, rows 4-9) ──
  // L4 = HLOOKUP(MATCH(MAX(C4:F4), C4:F4, 0), B22:E23, 2, FALSE)
  // Untuk menyederhanakan, siswa juga boleh pakai:
  //   L4 = HLOOKUP(MATCH(MAX(C4:F4),C4:F4,0),$B$22:$E$23,2,FALSE)
  // Atau bisa juga: L4 = INDEX(C3:F3, MATCH(MAX(C4:F4), C4:F4, 0))
  // Tapi karena instruksi HLOOKUP wajib, kriteria wajib HLOOKUP
  // 6 baris × 3 poin = 18 poin
  {
    id: 'hlookup-4',
    description: 'HLOOKUP Kategori Terlaris Adi (L4) — HLOOKUP dari tabel B22:E23',
    cell: 'L4',
    expectedFormula: 'HLOOKUP',
    expectedPattern: /B22\s*:\s*E23/i,
    expectedRangeHint: 'B22:E23',
    points: 3,
    category: 'hlookup',
  },
  {
    id: 'hlookup-5',
    description: 'HLOOKUP Kategori Terlaris Budi (L5) — HLOOKUP dari tabel B22:E23',
    cell: 'L5',
    expectedFormula: 'HLOOKUP',
    expectedPattern: /B22\s*:\s*E23/i,
    expectedRangeHint: 'B22:E23',
    points: 3,
    category: 'hlookup',
  },
  {
    id: 'hlookup-6',
    description: 'HLOOKUP Kategori Terlaris Citra (L6) — HLOOKUP dari tabel B22:E23',
    cell: 'L6',
    expectedFormula: 'HLOOKUP',
    expectedPattern: /B22\s*:\s*E23/i,
    expectedRangeHint: 'B22:E23',
    points: 3,
    category: 'hlookup',
  },
  {
    id: 'hlookup-7',
    description: 'HLOOKUP Kategori Terlaris Dian (L7) — HLOOKUP dari tabel B22:E23',
    cell: 'L7',
    expectedFormula: 'HLOOKUP',
    expectedPattern: /B22\s*:\s*E23/i,
    expectedRangeHint: 'B22:E23',
    points: 3,
    category: 'hlookup',
  },
  {
    id: 'hlookup-8',
    description: 'HLOOKUP Kategori Terlaris Eka (L8) — HLOOKUP dari tabel B22:E23',
    cell: 'L8',
    expectedFormula: 'HLOOKUP',
    expectedPattern: /B22\s*:\s*E23/i,
    expectedRangeHint: 'B22:E23',
    points: 3,
    category: 'hlookup',
  },
  {
    id: 'hlookup-9',
    description: 'HLOOKUP Kategori Terlaris Fajar (L9) — HLOOKUP dari tabel B22:E23',
    cell: 'L9',
    expectedFormula: 'HLOOKUP',
    expectedPattern: /B22\s*:\s*E23/i,
    expectedRangeHint: 'B22:E23',
    points: 3,
    category: 'hlookup',
  },

  // ── 6. COUNTIF: Jumlah sales yang lolos target (sel B26 & B27) ──
  // B26 = COUNTIF(J4:J9, "Lolos")
  // B27 = COUNTIF(J4:J9, "Tidak Lolos")
  // 2 cell × 4 poin = 8 poin
  {
    id: 'countif-26',
    description: 'COUNTIF Jumlah Sales Lolos (B26) = COUNTIF(J4:J9, "Lolos")',
    cell: 'B26',
    expectedFormula: 'COUNTIF',
    expectedPattern: /J4\s*:\s*J9/i,
    expectedRangeHint: 'J4:J9',
    points: 4,
    category: 'countif',
  },
  {
    id: 'countif-27',
    description: 'COUNTIF Jumlah Sales Tidak Lolos (B27) = COUNTIF(J4:J9, "Tidak Lolos")',
    cell: 'B27',
    expectedFormula: 'COUNTIF',
    expectedPattern: /J4\s*:\s*J9/i,
    expectedRangeHint: 'J4:J9',
    points: 4,
    category: 'countif',
  },

  // ── 7. RANK: Peringkat sales berdasarkan total penjualan (kolom M, rows 4-9) ──
  // M4 = RANK(H4, H4:H9, 0) — descending (tertinggi = rank 1)
  // 6 baris × 3 poin = 18 poin
  {
    id: 'rank-4',
    description: 'RANK Peringkat Adi (M4) = RANK(H4, H4:H9, 0)',
    cell: 'M4',
    expectedFormula: 'RANK',
    expectedPattern: /H4\s*:\s*H9/i,
    expectedRangeHint: 'H4:H9',
    points: 3,
    category: 'rank',
  },
  {
    id: 'rank-5',
    description: 'RANK Peringkat Budi (M5) = RANK(H5, H4:H9, 0)',
    cell: 'M5',
    expectedFormula: 'RANK',
    expectedPattern: /H4\s*:\s*H9/i,
    expectedRangeHint: 'H4:H9',
    points: 3,
    category: 'rank',
  },
  {
    id: 'rank-6',
    description: 'RANK Peringkat Citra (M6) = RANK(H6, H4:H9, 0)',
    cell: 'M6',
    expectedFormula: 'RANK',
    expectedPattern: /H4\s*:\s*H9/i,
    expectedRangeHint: 'H4:H9',
    points: 3,
    category: 'rank',
  },
  {
    id: 'rank-7',
    description: 'RANK Peringkat Dian (M7) = RANK(H7, H4:H9, 0)',
    cell: 'M7',
    expectedFormula: 'RANK',
    expectedPattern: /H4\s*:\s*H9/i,
    expectedRangeHint: 'H4:H9',
    points: 3,
    category: 'rank',
  },
  {
    id: 'rank-8',
    description: 'RANK Peringkat Eka (M8) = RANK(H8, H4:H9, 0)',
    cell: 'M8',
    expectedFormula: 'RANK',
    expectedPattern: /H4\s*:\s*H9/i,
    expectedRangeHint: 'H4:H9',
    points: 3,
    category: 'rank',
  },
  {
    id: 'rank-9',
    description: 'RANK Peringkat Fajar (M9) = RANK(H9, H4:H9, 0)',
    cell: 'M9',
    expectedFormula: 'RANK',
    expectedPattern: /H4\s*:\s*H9/i,
    expectedRangeHint: 'H4:H9',
    points: 3,
    category: 'rank',
  },
]

// Total poin formula: 12+12+12+18+18+8+18 = 98 → dinormalisasi ke 100
export const TOTAL_FORMULA_POINTS = FORMULA_CRITERIA.reduce(
  (s, c) => s + c.points,
  0
)

// Total poin info: 6 × 5 = 30 → dinormalisasi ke 100
export const TOTAL_INFO_POINTS = INFO_QUESTIONS.reduce(
  (s, q) => s + q.points,
  0
)

// Bobot: 70% formula, 30% info
export const FORMULA_WEIGHT = 0.7
export const INFO_WEIGHT = 0.3

// ── Panduan penggunaan formula (untuk display di UI siswa) ──
export const FORMULA_GUIDE: { name: string; syntax: string; example: string; description: string }[] = [
  {
    name: 'SUM',
    syntax: 'SUM(range)',
    example: '=SUM(C4:F4)',
    description: 'Menjumlahkan semua angka dalam rentang sel.',
  },
  {
    name: 'AVERAGE',
    syntax: 'AVERAGE(range)',
    example: '=AVERAGE(C4:F4)',
    description: 'Menghitung rata-rata aritmatika dari angka dalam rentang.',
  },
  {
    name: 'IF',
    syntax: 'IF(logical_test, value_if_true, value_if_false)',
    example: '=IF(H4>=G4, "Lolos", "Tidak Lolos")',
    description: 'Mengembalikan nilai berdasarkan kondisi logika.',
  },
  {
    name: 'VLOOKUP',
    syntax: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    example: '=VLOOKUP(H4, B15:C18, 2, TRUE)',
    description: 'Mencari nilai di kolom pertama tabel referensi (vertikal).',
  },
  {
    name: 'HLOOKUP',
    syntax: 'HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])',
    example: '=HLOOKUP(2, B22:E23, 2, FALSE)',
    description: 'Mencari nilai di baris pertama tabel referensi (horizontal).',
  },
  {
    name: 'COUNTIF',
    syntax: 'COUNTIF(range, criteria)',
    example: '=COUNTIF(J4:J9, "Lolos")',
    description: 'Menghitung jumlah sel yang memenuhi kriteria.',
  },
  {
    name: 'RANK',
    syntax: 'RANK(number, ref, [order])',
    example: '=RANK(H4, H4:H9, 0)',
    description: 'Menentukan peringkat nilai dalam daftar. order=0 (desc), 1 (asc).',
  },
]
