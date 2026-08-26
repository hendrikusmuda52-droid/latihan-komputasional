-- ============================================================
-- SKRIP SQL: Insert CP, TP, dan Materi Informatika SMP Kelas 7, 8, 9
-- Sumber: Buku Siswa Informatika Kemendikbud (Edisi Revisi)
--   - Kelas 7: BS_INFORMATIKA_VII.pdf (5 Bab)
--   - Kelas 8: Informatika_BS_KLS_VIII_Rev.pdf (5 Bab)
--   - Kelas 9: Informatika_BS_KLS_IX_Rev.pdf (4 Bab)
-- Tanggal: 26 Agustus 2026
-- ============================================================
--
-- CARA PAKAI:
-- 1. Login ke https://supabase.com → pilih project hendrikusmuda52-droid
-- 2. Buka menu "SQL Editor" → "New query"
-- 3. Salin seluruh skrip ini, paste ke editor
-- 4. Klik "Run" (tombol hijau play)
-- 5. Tunggu pesan "Success. No rows returned"
--
-- CATATAN:
-- - Skrip ini idempotent (ON CONFLICT DO NOTHING) — aman dijalankan berulang
-- - 1 Bab = 1 CP = 1 TP (sesuai permintaan user)
-- - Setiap Bab punya 1 Materi sebagai ringkasan/pengantar
-- - Field `kodeCP` format: CP.{kelas}.{bab} (mis: CP.7.1 = Kelas 7 Bab 1)
-- - Field `kodeTP` format: TP.{kelas}.{bab}.1 (1 TP per Bab)
-- ============================================================

-- ============================================================
-- KELAS 7 — Berpikir Komputasi & Pengolahan Data (5 Bab)
-- Buku: Informatika untuk SMP/MTs Kelas VII (Edisi Revisi)
-- Penulis: Maresha Caroline Wijanto, dkk. (Kemendikbud 2023)
-- ============================================================

-- ── Kelas 7 Bab 1: Berpikir Komputasi untuk Penyelesaian Masalah ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_7_1', 'Informatika', '7', 'CP.7.1',
  'Peserta didik mampu menerapkan berpikir komputasi untuk menyelesaikan masalah dengan mengidentifikasi, menganalisis, dan merumuskan langkah algoritma secara sistematis.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_7_1_1', 'cp_inf_7_1', 'TP.7.1.1',
  'Peserta didik dapat menjelaskan konsep berpikir komputasional dan menyusun algoritma sederhana untuk penyelesaian masalah.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_7_1',
  'Bab 1: Berpikir Komputasi untuk Penyelesaian Masalah',
  '## Berpikir Komputasi untuk Penyelesaian Masalah

Pada bab ini, peserta didik mempelajari konsep dasar berpikir komputasional sebagai fondasi penyelesaian masalah. Materi meliputi:

### A. Berpikir Komputasional
- Pengertian berpikir komputasional
- Empat pilar: dekomposisi, pengenalan pola, abstraksi, algoritma
- Contoh penerapan dalam kehidupan sehari-hari

### B. Algoritma dan Dasar Pemrograman
- Konsep algoritma: urutan langkah logis
- Notasi algoritma: deskriptif, pseudocode, flowchart
- Variabel dan tipe data dasar
- Struktur kontrol: percabangan (if-else) dan perulangan (for, while)

### C. Uji Kompetensi
Latihan soal untuk menguji pemahaman berpikir komputasional dan penyusunan algoritma.

**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 1, hal. 1-36',
  'Informatika', '7A,7B,7C', 'SMP', 'Konsep Dasar',
  'cp_inf_7_1', 'tp_inf_7_1_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 7 Bab 2: Pengolahan Data ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_7_2', 'Informatika', '7', 'CP.7.2',
  'Peserta didik mampu mengolah data menggunakan perkakas lembar kerja (spreadsheet) untuk menghasilkan informasi yang bermakna.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_7_2_1', 'cp_inf_7_2', 'TP.7.2.1',
  'Peserta didik dapat menggunakan perkakas pengolah lembar kerja untuk pengolahan data dasar dan lanjutan.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_7_2',
  'Bab 2: Pengolahan Data',
  '## Pengolahan Data

Bab ini membekali peserta didik dengan keterampilan mengolah data menggunakan spreadsheet.

### A. Mengenal Data
- Pengertian data dan informasi
- Jenis data: kualitatif vs kuantitatif
- Sumber data dan cara pengumpulan

### B. Perkakas Pengolah Lembar Kerja
- Pengenalan spreadsheet (LibreOffice Calc, Microsoft Excel)
- Sel, baris, kolom, dan rentang
- Format sel dan tipe data

### C. Pengolahan Data Dasar
- Rumus dasar: SUM, AVERAGE, MIN, MAX, COUNT
- Referensi sel: relatif, absolut, campuran
- Operator aritmatika

### D. Pengolahan Data Lanjutan
- Fungsi logika: IF, AND, OR
- Fungsi pencarian: VLOOKUP, HLOOKUP
- Sortir dan filter data

### E. Uji Kompetensi
Latihan pengolahan data dengan studi kasus nyata.

**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 2, hal. 37-92',
  'Informatika', '7A,7B,7C', 'SMP', 'Pengolahan Data',
  'cp_inf_7_2', 'tp_inf_7_2_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 7 Bab 3: Literasi Informasi ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_7_3', 'Informatika', '7', 'CP.7.3',
  'Peserta didik mampu mencari, mengevaluasi, dan menggunakan informasi dari berbagai sumber digital secara bertanggung jawab.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_7_3_1', 'cp_inf_7_3', 'TP.7.3.1',
  'Peserta didik dapat menerapkan literasi informasi dengan mengevaluasi kredibilitas sumber dan membedakan fakta, opini, serta hoaks.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_7_3',
  'Bab 3: Literasi Informasi',
  '## Literasi Informasi

Bab ini mengajarkan peserta didik menjadi konsumen informasi yang kritis dan bijak.

### A. Data, Informasi, dan Konten
- Perbedaan data, informasi, dan konten
- Siklus informasi

### B. Pengolahan Data, Informasi, dan Konten
- Cara mengorganisir informasi
- Teknik merangkum dan menyajikan

### C. Cara Menyimpan Konten
- Format file: PDF, DOCX, HTML
- Cloud storage vs penyimpanan lokal

### D. Relevansi Hasil Pencarian
- Menentukan kata kunci pencarian
- Memfilter hasil yang relevan

### E. Mesin Pencari di Internet
- Cara kerja search engine
- Operator pencarian (site:, filetype:, intitle:)

### F. Kredibilitas Sumber Informasi
- Kriteria evaluasi: otoritas, akurasi, objektivitas, aktualitas
- Cross-check antar sumber

### G. Ekosistem Media Pers Digital
- Jenis media digital
- Peran pers dalam demokrasi

### H. Fakta, Opini, dan Hoaks
- Perbedaan fakta vs opini
- Jenis-jenis hoaks
- Cara verifikasi informasi (CekFakta, Mafindo)

### I. Uji Kompetensi
Studi kasus verifikasi berita dan analisis kredibilitas sumber.

**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 3, hal. 93-136',
  'Informatika', '7A,7B,7C', 'SMP', 'Literasi Digital',
  'cp_inf_7_3', 'tp_inf_7_3_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 7 Bab 4: Keseimbangan Hidup di Dunia Digital ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_7_4', 'Informatika', '7', 'CP.7.4',
  'Peserta didik mampu menjaga keseimbangan hidup di dunia digital dan melindungi informasi pribadi saat beraktivitas online.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_7_4_1', 'cp_inf_7_4', 'TP.7.4.1',
  'Peserta didik dapat menerapkan keseimbangan aktivitas digital dan melindungi informasi privat dengan kata sandi yang aman.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_7_4',
  'Bab 4: Keseimbangan Hidup di Dunia Digital',
  '## Keseimbangan Hidup di Dunia Digital

Bab ini membahas pentingnya menjaga keseimbangan antara dunia virtual dan nyata.

### A. Ruang Publik Virtual
- Konsep ruang publik digital
- Etika bermedia sosial
- Dampak postingan terhadap reputasi

### B. Keseimbangan Dunia Virtual dan Nyata
- Tanda kecanduan digital
- Digital detox
- Manajemen waktu layar (screen time)

### C. Memilah Informasi Privat dan Publik
- Data pribadi: NIK, alamat, nomor rekening
- Konsep privasi digital
- Risiko oversharing

### D. Membuat Kata Sandi yang Aman
- Karakteristik password kuat
- Pengelolaan password (password manager)
- Two-Factor Authentication (2FA)

### E. Uji Kompetensi
Studi kasus: audit jejak digital pribadi dan rencana digital detox.

**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 4, hal. 137-166',
  'Informatika', '7A,7B,7C', 'SMP', 'Kesehatan Digital',
  'cp_inf_7_4', 'tp_inf_7_4_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 7 Bab 5: Perkakas Teknologi Informasi dan Komunikasi ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_7_5', 'Informatika', '7', 'CP.7.5',
  'Peserta didik mampu memahami sistem komputer, perangkat lunak produktivitas, dan dasar jaringan komputer serta internet.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_7_5_1', 'cp_inf_7_5', 'TP.7.5.1',
  'Peserta didik dapat menjelaskan komponen sistem komputer, perangkat lunak produktivitas, dan dasar jaringan internet.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_7_5',
  'Bab 5: Perkakas Teknologi Informasi dan Komunikasi',
  '## Perkakas Teknologi Informasi dan Komunikasi

Bab ini mengenalkan perangkat keras, lunak, dan jaringan yang mendukung aktivitas digital.

### A. Sistem Komputer
- Perangkat keras (hardware): CPU, RAM, storage, I/O
- Perangkat lunak (software): sistem operasi, aplikasi
- Siklus pengolahan data: input → proses → output → storage

### B. Perangkat Lunak untuk Produktivitas
- Pengolah kata (word processor)
- Pengolah angka (spreadsheet)
- Presentasi
- Pengolah gambar

### C. Pengantar Jaringan Komputer dan Internet
- Jenis jaringan: LAN, WAN, WLAN
- Topologi jaringan
- Protocol TCP/IP dasar
- Cara kerja internet: DNS, HTTP, bandwidth

### D. Uji Kompetensi
Latihan identifikasi komponen sistem komputer dan simulasi setup jaringan sederhana.

**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 5, hal. 167-234',
  'Informatika', '7A,7B,7C', 'SMP', 'Hardware & Jaringan',
  'cp_inf_7_5', 'tp_inf_7_5_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- KELAS 8 — Analisis Data & Algoritma (5 Bab)
-- Buku: Informatika untuk SMP/MTs Kelas VIII (Edisi Revisi)
-- Penulis: Bambang Subeno, dkk. (Kemendikbud 2024)
-- ============================================================

-- ── Kelas 8 Bab 1: Analisis Data ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_8_1', 'Informatika', '8', 'CP.8.1',
  'Peserta didik mampu melakukan analisis data melalui pencarian, visualisasi, dan peringkasan data untuk pengambilan keputusan.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_8_1_1', 'cp_inf_8_1', 'TP.8.1.1',
  'Peserta didik dapat mencari, memvisualisasikan, dan meringkas data untuk analisis.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_8_1',
  'Bab 1: Analisis Data',
  '## Analisis Data

Bab ini melanjutkan keterampilan spreadsheet ke arah analisis data yang lebih kompleks.

### A. Pencarian Data
- Lookup functions (VLOOKUP, HLOOKUP, INDEX-MATCH)
- Database functions (DSUM, DCOUNT, DAVERAGE)
- Filter lanjutan dan query

### B. Visualisasi Data
- Jenis grafik: bar, line, pie, scatter
- Pemilihan grafik sesuai tujuan
- Pivot table dan pivot chart
- Dashboard sederhana

### C. Peringkasan Data
- Statistik deskriptif: mean, median, modus, standar deviasi
- Distribusi data
- Korelasi dasar

### D. Uji Kompetensi
Proyek mini: analisis dataset nyata (mis: nilai siswa, cuaca) dengan visualisasi.

**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 1, hal. 1-56',
  'Informatika', '8A,8B,8C', 'SMP', 'Analisis Data',
  'cp_inf_8_1', 'tp_inf_8_1_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 8 Bab 2: Berpikir Komputasional ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_8_2', 'Informatika', '8', 'CP.8.2',
  'Peserta didik mampu menerapkan berpikir komputasional melalui konsep fungsi, sistem bilangan, dan struktur data.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_8_2_1', 'cp_inf_8_2', 'TP.8.2.1',
  'Peserta didik dapat menerapkan fungsi, himpunan dan sistem bilangan, serta struktur data dalam penyelesaian masalah.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_8_2',
  'Bab 2: Berpikir Komputasional',
  '## Berpikir Komputasional

Bab ini memperdalam konsep berpikir komputasional dengan elemen formal.

### A. Fungsi
- Definisi fungsi: input → proses → output
- Notasi fungsi f(x)
- Fungsi komposisi
- Aplikasi fungsi dalam pemrograman

### B. Himpunan dan Sistem Bilangan
- Himpunan: anggota, himpunan bagian, operasi (union, intersection)
- Sistem bilangan: desimal, biner, oktal, heksadesimal
- Konversi antar sistem bilangan
- Operasi aritmatika biner

### C. Struktur Data
- Konsep struktur data
- Array (larik): 1D, 2D
- List dan stack (dasar)
- Penerapan struktur data dalam kehidupan

### D. Uji Kompetensi
Latihan konversi bilangan, operasi himpunan, dan representasi data.

**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 2, hal. 57-92',
  'Informatika', '8A,8B,8C', 'SMP', 'Berpikir Komputasional',
  'cp_inf_8_2', 'tp_inf_8_2_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 8 Bab 3: Algoritma Pemrograman ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_8_3', 'Informatika', '8', 'CP.8.3',
  'Peserta didik mampu menerapkan algoritma pemrograman melalui pemrograman visual blok dan pengenalan robotika dasar.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_8_3_1', 'cp_inf_8_3', 'TP.8.3.1',
  'Peserta didik dapat membuat program sederhana dengan Scratch, Blockly Games, dan mengenal robot Ozobot.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_8_3',
  'Bab 3: Algoritma Pemrograman',
  '## Algoritma Pemrograman

Bab ini mengajak peserta didik mempraktikkan algoritma melalui pemrograman visual.

### A. Literasi Numerasi
- Hubungan literasi numerasi dan pemrograman
- Pola bilangan dan deret

### B. Eksplorasi Lanjutan Scratch
- Variabel dan list di Scratch
- Custom block (make a block)
- Event-driven programming
- Mini-proyek: game sederhana

### C. Pengantar Blockly Games
- Pengenalan Blockly Games
- Puzzle Maze: logika urutan & perulangan
- Strategi penyelesaian maze

### D. Eksplorasi Blockly Games Music
- Notasi musik sebagai data
- Loop dan fungsi di Music
- Kreativitas: komposisi lagu

### E. Pengenalan Pemrograman Prosedural
- Konsep prosedur dan fungsi
- Parameter dan return value
- Modularisasi kode

### F. Pengenalan Robot Ozobot
- Ozobot: robot mini pengikut garis
- Color code: kode warna untuk kontrol
- Pengenalan block-based programming Ozobot

**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 3, hal. 93-156',
  'Informatika', '8A,8B,8C', 'SMP', 'Algoritma Pemrograman',
  'cp_inf_8_3', 'tp_inf_8_3_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 8 Bab 4: Jejak Bermedia Digital ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_8_4', 'Informatika', '8', 'CP.8.4',
  'Peserta didik mampu memahami jejak digital dan mengelola identitas online secara bertanggung jawab.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_8_4_1', 'cp_inf_8_4', 'TP.8.4.1',
  'Peserta didik dapat mengelola jejak digital pribadi dan menjaga reputasi online.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_8_4',
  'Bab 4: Jejak Bermedia Digital',
  '## Jejak Bermedia Digital

Bab ini membekali peserta didik untuk sadar jejak digital dan reputasi online.

### A. Konsep Jejak Digital
- Active vs passive digital footprint
- Cookies dan tracking
- Data trail di media sosial

### B. Identitas Digital
- Personal branding online
- Profesionalisme di LinkedIn/socmed
- Netiqueta (etika online)

### C. Reputasi Online
- Cara membangun reputasi baik
- Dampak postingan terhadap karier
- Cara menghapus jejak negatif

### D. Privasi dan Keamanan Data
- Pengaturan privasi socmed
- Risiko phishing dan social engineering
- Cara melaporkan konten abuse

**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 4, hal. 157-186',
  'Informatika', '8A,8B,8C', 'SMP', 'Jejak Digital',
  'cp_inf_8_4', 'tp_inf_8_4_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 8 Bab 5: Pemanfaatan Perangkat Digital ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_8_5', 'Informatika', '8', 'CP.8.5',
  'Peserta didik mampu memanfaatkan perangkat digital untuk produktivitas dan komunikasi data.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_8_5_1', 'cp_inf_8_5', 'TP.8.5.1',
  'Peserta didik dapat memanfaatkan perangkat digital untuk pengiriman data dan komunikasi.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_8_5',
  'Bab 5: Pemanfaatan Perangkat Digital',
  '## Pemanfaatan Perangkat Digital

Bab ini membahas pemanfaatan perangkat digital untuk komunikasi dan transfer data.

### A. Perangkat Digital dan Komunikasi Data
- Smart device: smartphone, tablet, laptop
- Cara kerja pengiriman data: Bluetooth, WiFi, seluler
- Bandwidth dan latency

### B. Aplikasi Produktivitas Mobile
- Office mobile (Word, Excel, PowerPoint)
- Cloud sync (Google Drive, OneDrive)
- Note-taking apps

### C. Kolaborasi Online
- Google Workspace: Docs, Sheets, Slides
- Microsoft 365 online
- Tools kolaborasi real-time

### D. Tren Teknologi Terkini
- IoT (Internet of Things)
- AI assistants
- Cloud computing dasar

**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 5, hal. 187-234',
  'Informatika', '8A,8B,8C', 'SMP', 'Perangkat Digital',
  'cp_inf_8_5', 'tp_inf_8_5_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- KELAS 9 — Struktur Data Lanjut & Keamanan Digital (4 Bab)
-- Buku: Informatika untuk SMP/MTs Kelas IX (Edisi Revisi)
-- Penulis: Erlangga, Erna Piantari, Khairur Rosyid (Kemendikbud 2025)
-- ============================================================

-- ── Kelas 9 Bab 1: Berpikir Komputasional dalam Analisis Data ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_9_1', 'Informatika', '9', 'CP.9.1',
  'Peserta didik mampu menerapkan berpikir komputasional dalam analisis data menggunakan struktur data tree dan graph.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_9_1_1', 'cp_inf_9_1', 'TP.9.1.1',
  'Peserta didik dapat menerapkan struktur data tree dan graph untuk analisis himpunan data terstruktur.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_9_1',
  'Bab 1: Berpikir Komputasional dalam Analisis Data',
  '## Berpikir Komputasional dalam Analisis Data

Bab ini memperkenalkan struktur data kompleks: tree dan graph, serta workflow analisis data.

### A. Struktur Data Tree
- Konsep hierarki tree
- Root, node, leaf, edge
- Binary tree dan implementasi
- Pohon keluarga, struktur folder, DOM HTML sebagai tree

### B. Struktur Data Graph
- Node dan edge
- Directed vs undirected graph
- Weighted graph
- Penerapan: peta jaringan transportasi, social network

### C. Analisis Himpunan Data Terstruktur dengan Teknik Visualisasi
Workflow analisis data:
1. **Menentukan tujuan analisis** — pertanyaan yang ingin dijawab
2. **Mengumpulkan data** — sumber data primer/sekunder
3. **Menyiapkan dan membersihkan data** — handling missing values, outlier
4. **Mengeksplorasi data** — statistik deskriptif, distribusi
5. **Memvisualisasikan dan memublikasikan** — grafik, dashboard, laporan

### D. Studi Kasus
Analisis dataset transportasi kota dengan graph, visualisasi pohon keputusan.

**Sumber:** Buku Siswa Informatika Kelas IX (Edisi Revisi) - Kemendikbud 2025, Bab I, hal. 1-38',
  'Informatika', '9A,9B', 'SMP', 'Struktur Data',
  'cp_inf_9_1', 'tp_inf_9_1_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 9 Bab 2: Berpikir Komputasional dalam Algoritma dan Pemrograman ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_9_2', 'Informatika', '9', 'CP.9.2',
  'Peserta didik mampu mengembangkan library dalam pemrograman visual blok dan transisi ke pemrograman tekstual.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_9_2_1', 'cp_inf_9_2', 'TP.9.2.1',
  'Peserta didik dapat mengembangkan library pada pemrograman visual blok dan transisi ke pemrograman tekstual dengan pseudocode.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_9_2',
  'Bab 2: Berpikir Komputasional dalam Algoritma dan Pemrograman',
  '## Berpikir Komputasional dalam Algoritma dan Pemrograman

Bab ini membawa peserta didik dari visual block ke pemrograman tekstual.

### A. Mengembangkan Library dalam Pemrograman Visual Blok

#### 1. Modularisasi Program
- Konsep modularitas: pecah program besar jadi modul kecil
- Keuntungan: reusable, maintainable, testable
- Implementasi custom blocks di Scratch

#### 2. Library
- Definisi library: kumpulan fungsi siap pakai
- Membuat library sederhana
- Import dan gunakan library

#### 3. Penggunaan Library
- Studi kasus: game dengan library custom
- Best practices dokumentasi fungsi

### B. Pemrograman Visual Blok vs Pemrograman Tekstual

#### 1. Transisi dari Visual Blok ke Pemrograman Tekstual
- Perbandingan Scratch vs Python/JavaScript
- Konsep syntax dan indentasi
- Tipe data dan variabel di Python

#### 2. Analisis Pseudocode
- Pseudocode sebagai jembatan
- Aturan penulisan pseudocode
- Konversi pseudocode → kode Python

### C. Mini Proyek
Buat program sederhana di Python berdasarkan library Scratch yang sudah dibuat.

**Sumber:** Buku Siswa Informatika Kelas IX (Edisi Revisi) - Kemendikbud 2025, Bab II, hal. 39-114',
  'Informatika', '9A,9B', 'SMP', 'Algoritma Pemrograman',
  'cp_inf_9_2', 'tp_inf_9_2_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 9 Bab 3: Literasi Digital untuk Produktivitas ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_9_3', 'Informatika', '9', 'CP.9.3',
  'Peserta didik mampu memanfaatkan literasi digital untuk produktivitas melalui pemrosesan dan penyajian data.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_9_3_1', 'cp_inf_9_3', 'TP.9.3.1',
  'Peserta didik dapat melakukan pemrosesan data dan penyajian data dengan perangkat lunak produktivitas.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_9_3',
  'Bab 3: Literasi Digital untuk Produktivitas',
  '## Literasi Digital untuk Produktivitas

Bab ini fokus pada penggunaan tools digital untuk produktivitas akademik dan profesional.

### A. Pemrosesan Data

#### 1. Permasalahan Dasar Pemrosesan Data
- Identifikasi kebutuhan data
- Sumber dan validitas data
- Etika penggunaan data

#### 2. Dampak Penggunaan Perkakas yang Baik dan Benar
- Produktivitas vs distraksi
- Workflow otomatisasi (macros, Zapier)
- Dampak positif teknologi pada pekerjaan

### B. Penyajian Data

#### 1. Jenis dan Format Data
- Format data: CSV, JSON, XML, XLSX
- Konversi antar format
- Streaming data vs batch

#### 2. Perangkat Lunak Produktivitas
- Spreadsheet lanjutan: macro, VBA dasar
- Database sederhana: LibreOffice Base, Microsoft Access
- Aplikasi presentasi lanjutan

#### 3. Integrasi Data Konten
- Embed data antar aplikasi (OLE)
- Cloud collaboration: Google Workspace, Office 365
- Workflow: data → analisis → visualisasi → presentasi

### C. Proyek Akhir
Buat laporan analisis data end-to-end: dari pengumpulan data, pemrosesan, visualisasi, hingga presentasi.

**Sumber:** Buku Siswa Informatika Kelas IX (Edisi Revisi) - Kemendikbud 2025, Bab III, hal. 115-180',
  'Informatika', '9A,9B', 'SMP', 'Produktivitas Digital',
  'cp_inf_9_3', 'tp_inf_9_3_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── Kelas 9 Bab 4: Keamanan Digital ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_inf_9_4', 'Informatika', '9', 'CP.9.4',
  'Peserta didik mampu menjaga keamanan data dan informasi pribadi saat beraktivitas di internet.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_inf_9_4_1', 'cp_inf_9_4', 'TP.9.4.1',
  'Peserta didik dapat menerapkan praktik keamanan digital untuk melindungi data dan aktivitas online.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_inf_9_4',
  'Bab 4: Keamanan Digital',
  '## Keamanan Digital

Bab terakhir kelas 9 membahas aspek keamanan siber yang relevan untuk siswa.

### A. Ancaman di Dunia Digital
- Malware: virus, trojan, ransomware, spyware
- Phishing dan social engineering
- Identity theft
- Cyberbullying

### B. Praktik Keamanan Data
- Enkripsi: simetris vs asimetris
- Hash function (SHA, MD5)
- SSL/TLS untuk transmisi aman

### C. Otentikasi dan Otorisasi
- Password management (lanjutan)
- Multi-Factor Authentication (MFA)
- Biometric authentication
- Single Sign-On (SSO)

### D. Privasi dan Perlindungan Data
- UU PDP (Perlindungan Data Pribadi) Indonesia
- GDPR dasar
- Hak dan kewajiban pengguna data

### E. Etika dan Hukum Siber
- Hak cipta konten digital
- UU ITE
- Sertifikasi keamanan siber dasar

### F. Tanggap Insiden
- Cara melaporkan cybercrime di Indonesia
- Backup dan recovery data
- Incident response plan

### G. Proyek Akhir
Audit keamanan akun digital pribadi: password strength, 2FA setup, dan privacy checkup.

**Sumber:** Buku Siswa Informatika Kelas IX (Edisi Revisi) - Kemendikbud 2025, Bab IV, hal. 181-234',
  'Informatika', '9A,9B', 'SMP', 'Keamanan Digital',
  'cp_inf_9_4', 'tp_inf_9_4_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- VERIFIKASI
-- ============================================================
-- Jalankan query berikut (terpisah) untuk verifikasi insert berhasil:

-- SELECT 'CP per kelas' AS info, "gradeLevel", COUNT(*) 
-- FROM "CapaianPembelajaran" 
-- WHERE subject = 'Informatika' 
-- GROUP BY "gradeLevel" ORDER BY "gradeLevel";

-- SELECT 'TP per kelas' AS info, cp."gradeLevel", COUNT(*) 
-- FROM "TujuanPembelajaran" tp 
-- JOIN "CapaianPembelajaran" cp ON tp."cpId" = cp.id 
-- WHERE cp.subject = 'Informatika' 
-- GROUP BY cp."gradeLevel" ORDER BY cp."gradeLevel";

-- SELECT 'Materi per kelas' AS info, m."targetKelas", COUNT(*) 
-- FROM "Material" m 
-- WHERE m.subject = 'Informatika' 
-- GROUP BY m."targetKelas" ORDER BY m."targetKelas";

-- Expected output:
-- CP per kelas: 7→5, 8→5, 9→4 (total 14 CP)
-- TP per kelas: 7→5, 8→5, 9→4 (total 14 TP — 1 per bab)
-- Materi per kelas: 7A/7B/7C→5, 8A/8B/8C→5, 9A/9B→4 (total 14 materi)
