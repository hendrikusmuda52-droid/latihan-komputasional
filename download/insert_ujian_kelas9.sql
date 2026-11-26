-- ════════════════════════════════════════════════════════════════════════
-- UJIAN PRAKTEK KELAS 9 — INFORMATIKA
-- ════════════════════════════════════════════════════════════════════════
--
-- Tugas 1: Praktek Mengetik (25 menit) — daring
-- Tugas 2: Soal Pilihan Ganda (50 nomor, 40 menit) — daring
-- Materi: Bab 1 (Analisis Data), Bab 2 (Algoritma & Pemrograman),
--         Bab 3 (Produktivitas Digital), Bab 4 (Keamanan Digital)
-- Deadline: 1 Desember 2026
-- Kelas target: 9A, 9B
--
-- CARA RUN:
-- 1. Buka Supabase Dashboard → SQL Editor → New Query
-- 2. Copy SEMUA isi file ini, paste di SQL Editor
-- 3. Klik Run
-- ════════════════════════════════════════════════════════════════════════

-- ─── BAGIAN 1: MATERI UJIAN (ringkasan untuk siswa) ───
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_ujian_k9',
  'Materi Ujian Kelas 9: Bab 1-4 Informatika',
  '# Materi Ujian Praktek Kelas 9 — Informatika

## Bab 1: Berpikir Komputasional dalam Analisis Data
- **Tree**: struktur hierarkis (root, node, leaf, edge). Contoh: folder, DOM HTML, pohon keluarga
- **Graph**: node + edge, bisa siklus. Contoh: peta jalan, social network
- **Workflow analisis data**: tentukan tujuan → kumpulkan data → bersihkan data → eksplorasi → visualisasi
- **Visualisasi**: Line chart (tren waktu), Bar chart (kategori), Pie chart (proporsi), Scatter plot (korelasi), Histogram (distribusi)

## Bab 2: Algoritma dan Pemrograman
- **Modularisasi**: pecah program jadi modul kecil yang reusable
- **Library**: kumpulan fungsi siap pakai, bisa diimpor
- **Scratch (visual block)** vs **Python (textual)**: Scratch untuk pemula, Python untuk produksi
- **Pseudocode**: jembatan logika → kode. Contoh loop, if-else, while
- **Python**: indentasi penting, `def` untuk fungsi, `f-string` untuk format string

## Bab 3: Literasi Digital untuk Produktivitas
- **Format data**: CSV, JSON, XML, XLSX
- **Spreadsheet**: SUM, AVERAGE, IF, VLOOKUP, HLOOKUP, COUNTIF, RANK
- **Macro**: otomatisasi tugas berulang
- **Cloud collaboration**: Google Workspace, Office 365 (real-time)

## Bab 4: Keamanan Digital
- **Malware**: virus, trojan, ransomware, spyware
- **Phishing**: penipuan menyamar institusi resmi
- **Password kuat**: min 12 char, kombinasi huruf-angka-simbol
- **MFA/2FA**: Multi-Factor Authentication
- **Enkripsi**: plaintext → ciphertext dengan kunci
- **HTTPS**: HTTP + SSL/TLS, koneksi aman
- **Hash function**: SHA-256, tidak bisa di-reverse
- **UU PDP No. 27/2022**: Perlindungan Data Pribadi Indonesia
- **Backup 3-2-1**: 3 copy, 2 media, 1 offsite
',
  'Informatika', '9A,9B', 'SMP', 'Ujian',
  NULL, NULL, true, 'teks', NOW(), NOW()
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content, "updatedAt" = NOW();

-- ─── BAGIAN 2: TEKS BACAAN UNTUK UJIAN MENGETIK (25 menit) ───
INSERT INTO "TypingText" (id, "gradeLevel", subject, title, content, "isStructured", "isActive", "createdAt", "updatedAt")
VALUES (
  'tt_ujian_k9',
  '9',
  'Informatika',
  'Ujian Kelas 9: Ringkasan 4 Bab Informatika',
  'Informatika Kelas 9: Perjalanan Berpikir Komputasional dan Literasi Digital

Bab 1: Berpikir Komputasional dalam Analisis Data
Pada bab pertama, kita mempelajari struktur data kompleks yaitu tree dan graph. Tree adalah struktur hierarkis dengan root di puncak, node anak di bawahnya, dan leaf sebagai node tanpa anak. Contoh penerapan tree adalah struktur folder komputer, pohon keluarga, dan Document Object Model (DOM) pada halaman web. Graph adalah struktur dengan node dan edge yang dapat membentuk siklus. Graph cocok untuk memetakan jaringan transportasi, social network, dan peta jalan raya.

Workflow analisis data terdiri dari lima langkah: menentukan tujuan analisis, mengumpulkan data, membersihkan data, mengeksplorasi data, dan memvisualisasikan hasil. Pembersihan data meliputi handling missing values dan outlier. Visualisasi data menggunakan line chart untuk tren waktu, bar chart untuk perbandingan kategori, pie chart untuk proporsi, scatter plot untuk korelasi, dan histogram untuk distribusi.

Bab 2: Algoritma dan Pemrograman
Bab kedua membawa kita dari pemrograman visual blok Scratch ke pemrograman tekstual Python. Konsep modularisasi memungkinkan kita memecah program besar menjadi modul-modul kecil yang reusable. Library adalah kumpulan fungsi siap pakai yang dapat diimpor ke program lain.

Pseudocode adalah jembatan antara logika dan kode nyata. Contoh pseudocode untuk mencari nilai maksimum: set max sama dengan elemen pertama, lalu iterasi dari elemen kedua hingga akhir, jika elemen lebih besar dari max maka perbarui max. Di Python, indentasi sangat penting karena menentukan blok kode. Fungsi didefinisikan dengan kata kunci def, dan f-string digunakan untuk format string dengan variabel.

Bab 3: Literasi Digital untuk Produktivitas
Bab ketiga fokus pada penggunaan tools digital untuk produktivitas. Format data umum meliputi CSV, JSON, XML, dan XLSX. CSV adalah Comma-Separated Values, sedangkan JSON adalah JavaScript Object Notation yang menggunakan struktur key-value.

Spreadsheet memiliki fungsi powerful seperti SUM untuk menjumlahkan, AVERAGE untuk rata-rata, IF untuk percabangan, VLOOKUP untuk pencarian vertikal, HLOOKUP untuk pencarian horizontal, dan COUNTIF untuk menghitung sel yang memenuhi kriteria. Macro dapat mengotomatisasi tugas berulang. Cloud collaboration tools seperti Google Workspace dan Office 365 memungkinkan kolaborasi real-time dari mana saja.

Bab 4: Keamanan Digital
Bab terakhir membahas ancaman di dunia digital. Malware mencakup virus, trojan, ransomware, dan spyware. Phishing adalah penipuan yang menyamar sebagai institusi resmi melalui email atau SMS. Praktik keamanan meliputi password kuat minimal dua belas karakter, Multi-Factor Authentication, dan Single Sign-On.

Enkripsi mengubah plaintext menjadi ciphertext dengan kunci. HTTPS menggunakan SSL atau TLS untuk mengamankan transmisi data web. Hash function seperti SHA-256 mengubah input menjadi output fixed-length yang tidak bisa di-reverse, cocok untuk menyimpan password.

Di Indonesia, UU Perlindungan Data Pribadi Nomor 27 Tahun 2022 mengatur pengumpulan dan pemrosesan data pribadi. UU ITE mengatur transaksi elektronik. Jika menjadi korban cyberbullying, langkah tepat adalah block, report ke platform, simpan bukti screenshot, dan lapor ke polisi RESIK. Backup data mengikuti rule tiga dua satu: tiga copy data, dua media berbeda, satu offsite.',
  false, true, NOW(), NOW()
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content, "updatedAt" = NOW();

-- ─── BAGIAN 3: 50 SOAL PILIHAN GANDA ───
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_001', '9', 'Informatika', '**Stimulus:** Dina ingin memetakan struktur organisasi sekolah: Kepala Sekolah di puncak, di bawahnya Wakasek, lalu Koordinator, dan seterusnya.

Struktur data yang PALING tepat untuk merepresentasikan hierarki tersebut adalah...', 'Graph', 'Tree', 'Array', 'Queue', 1, 'Tree = struktur hierarkis dengan root di puncak, node anak di bawahnya. Cocok untuk struktur organisasi.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_002', '9', 'Informatika', '**Stimulus:** Budi melihat peta jaringan jalan raya di kota Bogor. Setiap persimpangan terhubung ke beberapa persimpangan lain.

Struktur data yang merepresentasikan peta jalan tersebut adalah...', 'Tree', 'Graph', 'Stack', 'Linked list', 1, 'Graph = node + edge, dapat memiliki siklus (jalan bolak-balik). Cocok untuk peta jaringan jalan.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_003', '9', 'Informatika', '**Stimulus:** Pada struktur folder komputer: C:/Users/Andi/Documents/Sekolah/Laporan.docx.

Elemen ''Documents'' dalam path ini bertindak sebagai...', 'Root', 'Leaf', 'Internal node (node tengah)', 'Edge', 2, 'Internal node = node yang punya anak tapi bukan root. Documents punya anak (Sekolah), tapi bukan root (C:/).', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_004', '9', 'Informatika', '**Stimulus:** Eka mengamati struktur pohon keluarga: Kakek-Nenek punya 3 anak, masing-masing punya 2 anak.

Pada tree ini, daun (leaf) adalah...', 'Kakek-Nenek', 'Anak ke-2 (orang tua)', 'Cucu (anak dari anak)', 'Root', 2, 'Leaf = node tanpa anak. Cucu adalah node paling bawah yang tidak punya anak lagi.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_005', '9', 'Informatika', '**Stimulus:** Pak Andi ingin menganalisis jaringan pertemanan di kelas. Ia ingin tahu siapa teman dekat siapa.

Penerapan struktur graph yang tepat adalah...', 'Tree of friends', 'Social network graph (node = orang, edge = pertemanan)', 'Binary tree', 'Stack pertemanan', 1, 'Social network graph: node = orang, edge = hubungan pertemanan. Graph bisa menunjukkan siapa teman siapa.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_006', '9', 'Informatika', '**Stimulus:** Siti membuat visualisasi data penjualan 12 bulan. Ia ingin menunjukkan tren naik/turun sepanjang tahun.

Jenis grafik yang PALING tepat untuk tren waktu adalah...', 'Pie chart', 'Bar chart', 'Line chart', 'Scatter plot', 2, 'Line chart ideal untuk tren data sepanjang waktu. Sumbu X = bulan, Y = penjualan. Garis menunjukkan naik/turun.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_007', '9', 'Informatika', '**Stimulus:** Budi ingin membandingkan jumlah siswa per ekstrakurikuler: Basket 25, Futsal 40, Pramuka 60, English Club 30.

Jenis grafik yang PALING tepat untuk perbandingan kategori adalah...', 'Line chart', 'Bar chart', 'Pie chart', 'Histogram', 1, 'Bar chart cocok untuk membandingkan kategori (bukan tren waktu). Tinggi bar = nilai per kategori.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_008', '9', 'Informatika', '**Stimulus:** Dina ingin menunjukkan proporsi anggaran rumah tangga: makanan 40%, pendidikan 30%, transport 15%, lainnya 15%.

Jenis grafik yang PALING tepat untuk proporsi adalah...', 'Line chart', 'Bar chart', 'Pie chart', 'Scatter plot', 2, 'Pie chart menunjukkan proporsi/persentase dari total. Setiap slice = persentase kategori.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_009', '9', 'Informatika', '**Stimulus:** Eka melakukan analisis data nilai siswa. Langkah pertama yang harus dilakukan sebelum visualisasi adalah...', 'Langsung buat grafik', 'Membersihkan data (handling missing values, outlier)', 'Posting ke media sosial', 'Menghapus semua data', 1, 'Workflow analisis data: kumpulkan → bersihkan → eksplorasi → visualisasikan. Cleaning data wajib sebelum visualisasi.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_010', '9', 'Informatika', '**Stimulus:** Fajar melihat dataset berisi 1000 baris. Ada beberapa baris dengan nilai kosong (null). Tindakan yang tepat:', 'Hapus semua baris', 'Biarkan saja', 'Handling missing values: isi dengan mean/median, atau hapus jika banyak null', 'Tukar dengan data lain', 2, 'Handling missing values: isi dengan mean/median (imputation) atau hapus baris jika null terlalu banyak.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_011', '9', 'Informatika', '**Stimulus:** Gita membuat binary tree dengan root 10, anak kiri 5, anak kanan 15. Anak kiri dari 5 adalah 3, anak kanan adalah 7.

Berapa node leaf pada tree ini?', '1', '2 (yaitu 3 dan 7)', '3', '4', 1, 'Leaf = node tanpa anak. 3 dan 7 tidak punya anak (node paling bawah). Root 10 dan 5 punya anak.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_012', '9', 'Informatika', '**Stimulus:** Hadi ingin memvisualisasikan korelasi antara jam belajar dan nilai ujian. Setiap titik = 1 siswa.

Jenis grafik yang tepat adalah...', 'Pie chart', 'Bar chart', 'Scatter plot', 'Line chart', 2, 'Scatter plot untuk korelasi 2 variabel (X = jam belajar, Y = nilai). Setiap titik = 1 data point.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_013', '9', 'Informatika', '**Stimulus:** Ira ingin menampilkan distribusi nilai ujian (berapa siswa dapat 50-60, 60-70, 70-80, dst).

Jenis grafik yang tepat adalah...', 'Pie chart', 'Histogram', 'Line chart', 'Scatter plot', 1, 'Histogram menunjukkan distribusi data dalam interval (bin). Sumbu X = interval nilai, Y = frekuensi.', 'Bab1-Analisis-Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_014', '9', 'Informatika', '**Stimulus:** Adi membuat game di Scratch. Ia sering menggunakan blok ''move 10 steps'' di banyak sprite. Ia ingin menyederhanakan dengan membuat 1 blok custom.

Konsep yang diterapkan Adi adalah...', 'Dekomposisi', 'Modularisasi (membuat custom block/library)', 'Pengenalan pola', 'Abstraksi', 1, 'Modularisasi: pecah program jadi modul/blok yang reusable. Custom block = library sederhana di Scratch.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_015', '9', 'Informatika', '**Stimulus:** Siti membuat library fungsi matematika: tambah, kurang, kali, bagi. Keuntungan utama library adalah...', 'Program lebih lambat', 'Kode reusable, mudah dipelihara, terstruktur', 'Hanya untuk programmer ahli', 'Tidak perlu testing', 1, 'Library = kumpulan fungsi siap pakai. Keuntungan: reusable, maintainable, terstruktur.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_016', '9', 'Informatika', '**Stimulus:** Budi transisi dari Scratch (visual block) ke Python (textual). Perbedaan utama yang ia temukan adalah...', 'Python tidak butuh logika', 'Python pakai syntax teks dan indentasi, bukan drag-drop block', 'Python lebih sulit dipelajari', 'Python tidak bisa membuat game', 1, 'Visual block (Scratch) = drag-drop. Textual (Python) = ketik kode dengan syntax + indentasi. Konsep logika sama.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_017', '9', 'Informatika', '**Stimulus:** Dina menulis pseudocode:
```
SET total = 0
FOR i FROM 1 TO 5
  SET total = total + i
END FOR
PRINT total
```

Output yang dihasilkan adalah...', '5', '10', '15', '25', 2, '1+2+3+4+5 = 15. Loop dari 1 sampai 5, akumulasi total.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_018', '9', 'Informatika', '**Stimulus:** Eka menulis pseudocode:
```
IF nilai >= 75 THEN
  PRINT ''Lulus''
ELSE
  PRINT ''Tidak Lulus''
END IF
```
Jika nilai = 80, output adalah...', 'Lulus', 'Tidak Lulus', 'Error', 'Tidak ada output', 0, '80 >= 75 → kondisi TRUE → cetak ''Lulus''.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_019', '9', 'Informatika', '**Stimulus:** Fajar menulis pseudocode untuk mencari angka terbesar:
```
SET max = angka[1]
FOR i FROM 2 TO N
  IF angka[i] > max THEN
    SET max = angka[i]
  END IF
END FOR
PRINT max
```

Algoritma ini merupakan...', 'Pengurutan', 'Pencarian biner', 'Pencarian nilai maksimum (linear scan)', 'Rekursif', 2, 'Linear scan untuk cari max: iterasi semua elemen, simpan yang terbesar. Kompleksitas O(n).', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_020', '9', 'Informatika', '**Stimulus:** Gita membuat library Scratch ''Hitung_Luas_Persegi'' yang menerima input sisi. Konsep ini di Python setara dengan...', 'Variabel', 'Fungsi (def)', 'Loop', 'Kondisi if-else', 1, 'Custom block Scratch = fungsi di Python. Sisi = parameter. Hasil = return value.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_021', '9', 'Informatika', '**Stimulus:** Hadi menulis kode Python:
```python
for i in range(3):
    print(''Halo'')
```

Output yang dihasilkan...', '''Halo'' 1 kali', '''Halo'' 3 kali', '''Halo'' 0 kali', 'Error', 1, 'range(3) = 0, 1, 2 (3 iterasi). Print ''Halo'' 3 kali. Indentasi penting di Python.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_022', '9', 'Informatika', '**Stimulus:** Ira menulis kode Python:
```python
nama = ''Andi''
usia = 15
print(f''Halo {nama}, umur {usia}'')
```

Konsep yang digunakan adalah...', 'List', 'Variabel dan f-string (formatted string)', 'Library', 'Loop', 1, 'Variabel menyimpan data (nama, usia). f-string = format string dengan {variabel} di dalam kurung kurawal.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_023', '9', 'Informatika', '**Stimulus:** Joko menulis kode:
```python
bilangan = [1, 2, 3, 4, 5]
for b in bilangan:
    if b % 2 == 0:
        print(b)
```

Output yang dihasilkan...', '1 3 5', '2 4', '1 2 3 4 5', 'Tidak ada output', 1, 'b % 2 == 0 = bilangan genap. Dari [1,2,3,4,5], yang genap = 2 dan 4.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_024', '9', 'Informatika', '**Stimulus:** Karma membuat library ''Matematika'' dengan fungsi tambah, kurang, kali. Ia ingin memakainya di program lain.

Langkah yang tepat:', 'Copy-paste semua kode', 'Import library dan panggil fungsi', 'Tulis ulang dari awal', 'Tidak bisa digunakan ulang', 1, 'Library = reusable. Import library (contoh: import matematika), lalu panggil matematika.tambah(a, b).', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_025', '9', 'Informatika', '**Stimulus:** Lina bingung memilih antara Scratch dan Python untuk membuat animasi sederhana.

Kapan Scratch LEBIH baik dari Python?', 'Untuk program kompleks skala besar', 'Untuk pemula yang baru belajar logika pemrograman', 'Untuk aplikasi web', 'Untuk data science', 1, 'Scratch cocok untuk pemula: visual block lebih intuitif, fokus pada logika tanpa syntax error. Python untuk produksi.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_026', '9', 'Informatika', '**Stimulus:** Mantra menulis pseudocode:
```
SET i = 1
WHILE i <= 5
  PRINT i
  SET i = i + 1
END WHILE
```

Jika dijalankan, outputnya...', '1 2 3 4 5', '1 2 3 4', '0 1 2 3 4', 'Tidak ada output (infinite loop)', 0, 'i mulai 1, naik 1 tiap iterasi, berhenti saat i > 5. Output: 1 2 3 4 5.', 'Bab2-Algoritma', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_027', '9', 'Informatika', '**Stimulus:** Andi punya file data dengan format .csv. Ia ingin membukanya di spreadsheet.

Apa kepanjangan CSV dan kegunaannya?', 'Computer Saved File — file komputer', 'Comma-Separated Values — format data teks dengan pemisah koma', 'Cloud Storage Vault — penyimpanan cloud', 'Common System Variable — variabel sistem', 1, 'CSV = Comma-Separated Values. Format teks dimana setiap kolom dipisah koma. Universal untuk pertukaran data.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_028', '9', 'Informatika', '**Stimulus:** Siti melihat file data.json. Ia ingin tahu apa isinya.

JSON adalah format data yang...', 'Hanya untuk gambar', 'Menggunakan struktur key-value, mudah dibaca mesin dan manusia', 'Hanya untuk video', 'Format dokumen Word', 1, 'JSON = JavaScript Object Notation. Format key-value (contoh: {"nama": "Andi"}). Universal untuk API/web.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_029', '9', 'Informatika', '**Stimulus:** Budi menggunakan spreadsheet untuk menghitung total nilai. Ia mengetik =SUM(B2:B10).

Fungsi SUM pada range B2:B10 akan...', 'Menjumlahkan nilai B2 sampai B10', 'Menghitung rata-rata B2 sampai B10', 'Mencari nilai terbesar di B2:B10', 'Menghitung jumlah sel kosong', 0, 'SUM(range) = menjumlahkan semua angka dalam range. B2:B10 = sel B2, B3, B4, ..., B10.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_030', '9', 'Informatika', '**Stimulus:** Dina ingin menghitung rata-rata nilai siswa di sel C2 sampai C11.

Formula yang tepat di spreadsheet:', '=SUM(C2:C11)', '=AVERAGE(C2:C11)', '=COUNT(C2:C11)', '=MAX(C2:C11)', 1, 'AVERAGE(range) = rata-rata aritmatika. SUM = total, COUNT = hitung, MAX = nilai terbesar.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_031', '9', 'Informatika', '**Stimulus:** Eka ingin menampilkan ''LULUS'' jika nilai >= 75, dan ''TIDAK LULUS'' jika kurang.

Formula IF yang tepat:', '=IF(B2>=75, ''LULUS'', ''TIDAK LULUS'')', '=IF(B2>=75, "LULUS", "TIDAK LULUS")', '=IF(B2>=75, LULUS, TIDAK LULUS)', '=IF(B2>=75)', 1, 'IF(logical_test, value_if_true, value_if_false). Teks harus diapit tanda kutip ganda "...".', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_032', '9', 'Informatika', '**Stimulus:** Fajar ingin mencari nama sales berdasarkan kode. Tabel referensi ada di A2:C10, nama di kolom 3.

Formula yang tepat adalah...', '=VLOOKUP(kode, A2:C10, 3, FALSE)', '=HLOOKUP(kode, A2:C10, 3, FALSE)', '=SUM(A2:C10)', '=IF(kode, A2:C10, 3)', 0, 'VLOOKUP(lookup_value, table_array, col_index, range_lookup). FALSE = exact match. Mencari vertikal.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_033', '9', 'Informatika', '**Stimulus:** Gita ingin mencari nilai berdasarkan kode di tabel horizontal (baris pertama berisi kode).

Formula yang digunakan:', '=VLOOKUP', '=HLOOKUP', '=COUNTIF', '=RANK', 1, 'HLOOKUP = Horizontal LOOKUP. Mencari nilai di BARIS pertama tabel. VLOOKUP = di KOLOM pertama.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_034', '9', 'Informatika', '**Stimulus:** Hadi ingin menghitung jumlah siswa yang mendapat nilai di atas 80. Range data: D2:D31.

Formula yang tepat:', '=COUNT(D2:D31)', '=COUNTIF(D2:D31, ">80")', '=SUMIF(D2:D31, 80)', '=IF(D2:D31>80)', 1, 'COUNTIF(range, criteria) = hitung sel yang memenuhi kriteria. ">80" = lebih besar dari 80.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_035', '9', 'Informatika', '**Stimulus:** Ira membuat laporan analisis data. Setelah data siap, langkah terakhir sebelum presentasi adalah...', 'Langsung print', 'Menghapus data', 'Visualisasi data (chart, dashboard) untuk komunikasi temuan', 'Mematikan komputer', 2, 'Workflow: data → analisis → visualisasi → presentasi. Visualisasi = cara komunikasi temuan ke audiens.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_036', '9', 'Informatika', '**Stimulus:** Joko ingin kolaborasi real-time dengan teman di dokumen yang sama, dari rumah masing-masing.

Tools yang tepat:', 'Microsoft Word offline', 'Google Docs / Google Workspace', 'Notepad', 'Excel offline', 1, 'Cloud collaboration tools: Google Docs, Office 365. Real-time, multi-user, autosave.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_037', '9', 'Informatika', '**Stimulus:** Karma ingin mengetahui apakah spreadsheet punya fitur otomatisasi (macro).

Macro di spreadsheet berfungsi untuk...', 'Menambah warna', 'Mengotomatisasi tugas berulang (recording serangkaian aksi)', 'Mengubah font', 'Menyimpan sebagai PDF', 1, 'Macro = rekam aksi berulang, jalankan dengan 1 klik. Mengotomatisasi task repetitif.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_038', '9', 'Informatika', '**Stimulus:** Lina ingin mengkonversi file Excel (.xlsx) ke format yang bisa dibaca aplikasi web.

Format yang PALING tepat:', '.docx', '.pdf', '.json atau .csv', '.png', 2, 'JSON/CSV = format teks universal untuk aplikasi web. XLSX = format proprietary Excel. PDF = dokumen final.', 'Bab3-Produktivitas', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_039', '9', 'Informatika', '**Stimulus:** Andi menerima email dari ''bank-aman@gmail.com'' yang menyuruh klik link dan masukkan password.

Jenis serangan yang dialami Andi adalah...', 'Malware', 'Phishing', 'Ransomware', 'DDoS', 1, 'Phishing = penipuan via email/SMS yang menyamar sebagai institusi resmi untuk mencuri data pribadi.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_040', '9', 'Informatika', '**Stimulus:** Siti mengunduh software gratis dari situs tidak resmi. Setelah diinstal, file-file dokumen siswa terkunci dan diminta tebusan.

Jenis malware yang menyerang adalah...', 'Virus', 'Trojan', 'Ransomware', 'Spyware', 2, 'Ransomware = malware yang mengenkripsi file dan minta tebusan (ransom) untuk membuka kembali.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_041', '9', 'Informatika', '**Stimulus:** Budi menggunakan password ''12345678'' untuk semua akun. Risiko utama:', 'Tidak ada risiko', 'Mudah ditebak (brute force) — akun bisa dibajak', 'Password terlalu panjang', 'Tidak bisa login', 1, 'Password lemah = mudah ditebak. Gunakan password kuat: min 12 char, kombinasi huruf-angka-simbol.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_042', '9', 'Informatika', '**Stimulus:** Dina ingin meningkatkan keamanan akun emailnya. Selain password, ia mengaktifkan verifikasi via SMS.

Fitur ini disebut...', 'Enkripsi', 'Multi-Factor Authentication (MFA / 2FA)', 'Firewall', 'Antivirus', 1, 'MFA/2FA = butuh 2+ faktor: password (something you know) + kode SMS (something you have).', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_043', '9', 'Informatika', '**Stimulus:** Eka ingin mengirim pesan rahasia ke teman. Ia menggunakan algoritma untuk mengubah teks jadi kode yang tidak bisa dibaca tanpa kunci.

Proses ini disebut...', 'Decoding', 'Enkripsi', 'Hashing', 'Compression', 1, 'Enkripsi = mengubah plaintext jadi ciphertext dengan kunci. Hanya penerima dengan kunci yang bisa dekripsi.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_044', '9', 'Informatika', '**Stimulus:** Fajar melihat website bank dengan URL ''https://''. Simbol gembok juga muncul di browser.

''Apa arti HTTPS dan gembok?', 'Website cepat', 'Koneksi aman (encrypted via SSL/TLS), data terenkripsi saat transmisi', 'Website gratis', 'Website pemerintah', 1, 'HTTPS = HTTP + SSL/TLS. Data antara browser dan server dienkripsi. Gembok = koneksi aman.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_045', '9', 'Informatika', '**Stimulus:** Gita menyimpan password di database. Ia tidak ingin password disimpan sebagai teks biasa.

Fungsi yang digunakan untuk mengubah password jadi hash adalah...', 'Enkripsi simetris', 'Hash function (SHA-256, bcrypt)', 'Compress', 'Encrypt with public key', 1, 'Hash function: input → output fixed-length yang tidak bisa di-reverse. Password disimpan sebagai hash, bukan plaintext.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_046', '9', 'Informatika', '**Stimulus:** Hadi menerima email dari teman dengan lampiran ''game.exe''. Setelah dijalankan, komputer jadi lambat.

Jenis malware yang mungkin menginfeksi adalah...', 'Virus/Trojan', 'Browser', 'Firewall', 'Antivirus', 0, 'Trojan = malware yang menyamar sebagai program sah (game). Saat dijalankan, malware aktif di latar belakang.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_047', '9', 'Informatika', '**Stimulus:** Ira ingin login sekali saja ke semua aplikasi sekolah (email, LMS, library) tanpa input password berulang.

Sistem yang digunakan sekolah adalah...', 'Single Sign-On (SSO)', 'Multi-Factor Authentication', 'Hash function', 'VPN', 0, 'SSO = 1 login → akses semua aplikasi terkait. Contoh: Google account → Gmail, Drive, YouTube.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_048', '9', 'Informatika', '**Stimulus:** Joko menjadi korban cyberbullying di media sosial. Langkah pertama yang tepat:', 'Balas dengan kata-kata kasar', 'Block + laporkan ke platform + simpan bukti + lapor ke polisi (RESIK)', 'Hapus akun dan diam', 'Sebarkan ke teman-teman', 1, 'Tangani cyberbullying: block, report ke platform, simpan bukti screenshot, lapor ke polisi RESIK atau Layanan Pengaduan Konten.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_049', '9', 'Informatika', '**Stimulus:** Karma ingin melindungi data pribadinya sesuai UU PDP (Perlindungan Data Pribadi) Indonesia.

UU PDP di Indonesia diatur dalam...', 'UU ITE No. 11/2008', 'UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi', 'UU Hak Cipta', 'UU Anti-Pornografi', 1, 'UU PDP = UU No. 27/2022. Mengatur pengumpulan, pemrosesan, dan perlindungan data pribadi. Berlaku sejak 2022.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k9_pg_050', '9', 'Informatika', '**Stimulus:** Lina ingin backup data agar tidak hilang saat komputer rusak. Strategi backup yang baik adalah...', 'Simpan di 1 flashdisk', 'Backup ke cloud + eksternal (rule 3-2-1: 3 copy, 2 media, 1 offsite)', 'Print semua dokumen', 'Tidak perlu backup', 1, 'Rule 3-2-1: 3 copy data, 2 media berbeda (HDD + cloud), 1 offsite (cloud). Lindungi dari hardware failure, theft, bencana.', 'Bab4-Keamanan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', NULL, NULL, NOW(), NOW());

-- ─── BAGIAN 4: ASSIGNMENT TUGAS 1 — UJIAN MENGETIK (25 menit) ───
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES (
  'asg_ujian_k9_typing',
  'Ujian 1 Kelas 9: Praktek Mengetik (25 menit)',
  'Ujian praktek mengetik. Ketik teks bacaan ringkasan 4 bab Informatika dengan akurasi dan kecepatan tinggi. Waktu 25 menit. Online/daring.',
  'Informatika', '9A,9B', 'SMP', true, '2026-12-01T23:59:00+07:00', 'wajib', 0, 'typing_only', NULL, NULL, NULL, 'daring', '', '2026/2027', 'ganjil', 25, NOW(), NOW()
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, duration = EXCLUDED.duration, "dueDate" = EXCLUDED."dueDate", "isActive" = EXCLUDED."isActive", "updatedAt" = NOW();

-- ─── BAGIAN 5: ASSIGNMENT TUGAS 2 — UJIAN SOAL PG (50 nomor, 40 menit) ───
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES (
  'asg_ujian_k9_quiz',
  'Ujian 2 Kelas 9: Soal Pilihan Ganda (50 nomor, 40 menit)',
  'Ujian tertulis pilihan ganda tentang Bab 1 (Analisis Data), Bab 2 (Algoritma & Pemrograman), Bab 3 (Produktivitas Digital), Bab 4 (Keamanan Digital). 50 soal dengan stimulus. Waktu 40 menit. Online/daring.',
  'Informatika', '9A,9B', 'SMP', true, '2026-12-01T23:59:00+07:00', 'wajib', 50, 'quiz_only', NULL, NULL, NULL, 'daring', '', '2026/2027', 'ganjil', 40, NOW(), NOW()
)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, "questionCount" = EXCLUDED."questionCount", duration = EXCLUDED.duration, "dueDate" = EXCLUDED."dueDate", "isActive" = EXCLUDED."isActive", "updatedAt" = NOW();

-- ─── BAGIAN 6: CLEANUP TUGAS LAMA (jika ada) ───
DELETE FROM "Assignment" WHERE id IN ('asg_ujian_k9_terpadu');

-- ─── VERIFIKASI ───
SELECT 'Materi' AS section, COUNT(*) AS total FROM "Material" WHERE id = 'mat_ujian_k9';
SELECT 'TypingText' AS section, COUNT(*) AS total FROM "TypingText" WHERE id = 'tt_ujian_k9';
SELECT 'Soal PG' AS section, COUNT(*) AS total FROM "Question" WHERE id LIKE 'q_ujian_k9_pg_%';
SELECT 'Assignment Mengetik' AS section, title, duration, "taskType" FROM "Assignment" WHERE id = 'asg_ujian_k9_typing';
SELECT 'Assignment Quiz' AS section, title, "questionCount", duration, "taskType" FROM "Assignment" WHERE id = 'asg_ujian_k9_quiz';

-- Expected output:
-- Materi: 1
-- TypingText: 1
-- Soal PG: 50
-- Assignment Mengetik: 'Ujian 1 Kelas 9: Praktek Mengetik (25 menit)' | 25 | typing_only
-- Assignment Quiz: 'Ujian 2 Kelas 9: Soal Pilihan Ganda (50 nomor, 40 menit)' | 50 | quiz_only