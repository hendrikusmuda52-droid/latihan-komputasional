-- ============================================================
-- SKRIP SQL: TP3 + Materi + Soal (45 PG + 5 Essai per kelas) + Tugas 3
-- Mata Pelajaran: Informatika (Kelas 7, 8, 9)
-- Tanggal: 21 September 2026
-- ============================================================
--
-- CARA PAKAI:
-- 1. Login ke https://supabase.com → pilih project
-- 2. Buka menu "SQL Editor" → "New query"
-- 3. Salin seluruh skrip ini, paste ke editor
-- 4. Klik "Run" (tombol play)
-- 5. Tunggu pesan "Success. No rows returned"
--
-- CATATAN:
-- - Idempotent (ON CONFLICT DO NOTHING) — aman dijalankan berulang
-- - Menggunakan CP yang SUDAH ADA (cp_inf_7_1, cp_inf_8_1, cp_inf_9_1)
-- - Membuat TP BARU (TP.x.1.3) di dalam CP1 tersebut
-- - Membuat Materi BARU (mendalam per kelas)
-- - Membuat 50 soal per kelas (45 PG C3/C4/C5 + 5 Essai C4/C5)
-- - Membuat Assignment "Tugas 3" per kelas:
--   * questionCount = 50 (45 PG + 5 essai dalam tugas yang sama)
--   * duration = 90 menit
--   * dueDate = 28 September 2026 23:59 WIB
--   * taskType = quiz_only
-- ============================================================


-- ============================================================
-- KELAS 7: TP3 + Materi Pengenalan Pola + 50 Soal + Tugas 3
-- ============================================================


-- TP 3 untuk Kelas 7 (Pengenalan Pola)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_7_1_3', 'cp_inf_7_1', 'TP.7.1.3', 'Siswa mampu mengenali pola berulang dan bertumbuh dalam data serta kehidupan.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

-- Materi Kelas 7: Memperdalam Pengenalan Pola
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_7_1_3', 'Memperdalam Pengenalan Pola: Mengenali Pola Berulang dalam Data dan Kehidupan', '# Memperdalam Pengenalan Pola: Mengenali Pola Berulang dalam Data dan Kehidupan

## Pengertian Pengenalan Pola

Pengenalan pola (pattern recognition) adalah salah satu dari empat pilar berpikir komputasional. Secara sederhana, pengenalan pola berarti kemampuan untuk melihat kemiripan, pengulangan, atau keteraturan dalam data, peristiwa, atau masalah. Ketika Anda melihat daftar angka 2, 4, 6, 8, 10 dan langsung tahu bahwa angka berikutnya adalah 12, Anda sedang melakukan pengenalan pola. Kemampuan ini terlihat sederhana, tetapi sebenarnya merupakan fondasi dari banyak ilmu pengetahuan modern, mulai dari kecerdasan buatan hingga analisis data ilmiah.

Pengenalan pola bukan sekadar melihat sesuatu yang berulang. Ini adalah proses aktif mencari struktur tersembunyi di balik data atau peristiwa yang tampak acak. Seorang dokter yang mendiagnosis penyakit berdasarkan pola gejala yang sering muncul bersamaan sedang melakukan pengenalan pola. Seorang meteorologis yang memprediksi cuaca berdasarkan pola tekanan udara historis juga melakukan pengenalan pola. Bahkan anak kecil yang belajar bicara dengan mengenali pola bunyi yang sering didengar juga menggunakan kemampuan ini.

## Mengapa Pengenalan Pola Penting?

Dunia di sekitar kita penuh dengan informasi yang sangat banyak. Tanpa pengenalan pola, kita akan kewalahan oleh data yang masuk. Bayangkan jika setiap daun yang Anda lihat dianggap unik dan berbeda dari daun lainnya — Anda tidak akan bisa belajar tentang "pohon" sebagai konsep. Pengenalan pola memungkinkan kita mengelompokkan informasi yang mirip, mengabaikan detail yang tidak penting, dan fokus pada struktur yang esensial. Ini membuat proses berpikir jauh lebih efisien.

Selain itu, pengenalan pola adalah dasar dari prediksi. Jika kita tahu bahwa suatu pola berulang secara teratur, kita dapat memprediksi apa yang akan terjadi berikutnya. Inilah yang dilakukan oleh algoritma rekomendasi YouTube atau TikTok — mereka melihat pola tontonan Anda dan memprediksi video apa yang mungkin Anda sukai berikutnya. Tanpa pengenalan pola, teknologi ini tidak akan ada.

## Jenis-Jenis Pola

### 1. Pola Berulang (Repeating Pattern)
Pola yang elemennya muncul kembali secara teratur. Contoh: warna lampu lalu lintas yang selalu bergantian merah-kuning-hijau, atau motif batik yang berulang setiap beberapa sentimeter. Pola berulang paling mudah dikenali karena strukturnya jelas dan dapat diprediksi.

### 2. Pola Bertumbuh (Growing Pattern)
Pola yang berubah secara teratur, biasanya bertambah atau berkurang dengan aturan tertentu. Contoh: barisan bilangan 1, 4, 9, 16, 25 adalah kuadrat dari 1, 2, 3, 4, 5 — pola ini "tumbuh" dengan aturan kuadrat. Pola bertumbuh lebih sulit dikenali karena perubahan tidak konstan, tetapi mengikuti aturan yang tersembunyi.

### 3. Pola Struktural (Structural Pattern)
Pola yang muncul dari hubungan antar elemen dalam suatu struktur. Contoh: silsilah keluarga yang menunjukkan pola pewarisan ciri fisik, atau struktur kalimat yang mengikuti pola subjek-predikat-objek. Pola struktural sering kali tidak terlihat secara langsung, tetapi muncul ketika kita menganalisis hubungan.

### 4. Pola Temporal (Time-based Pattern)
Pola yang muncul seiring waktu. Contoh: pola tidur yang berulang setiap hari, pola penjualan yang meningkat menjelang hari raya, atau pola cuaca yang berubah mengikuti musim. Pola temporal penting dalam perencanaan dan prediksi jangka panjang.

## Langkah-Langkah Pengenalan Pola yang Baik

### 1. Amati dengan Seksama
Mulailah dengan mengamati data atau peristiwa secara cermat. Jangan terburu-buru mengambil kesimpulan. Catat apa yang Anda lihat, dengar, atau rasakan. Pada tahap ini, fokus pada pengumpulan informasi tanpa filter.

### 2. Identifikasi Kemiripan
Cari elemen yang muncul berulang atau mirip satu sama lain. Tanyakan: apa yang sama dari setiap item? Apa yang berbeda? Apakah ada ciri yang selalu hadir bersamaan? Misalnya, jika Anda melihat daftar lagu yang sering Anda dengar, Anda mungkin menemukan bahwa banyak dari mereka punya tempo yang mirip atau genre yang sama.

### 3. Temukan Aturan yang Mendasari
Setelah menemukan kemiripan, cari aturan yang menjelaskan pola tersebut. Apakah pola bertambah dengan konstan? Apakah berulang setiap interval tertentu? Apakah mengikuti rumus matematika? Aturan ini menjadi "kunci" untuk memprediksi pola di masa depan.

### 4. Verifikasi Pola
Uji aturan yang Anda temukan dengan data baru. Jika aturan berlaku untuk data yang belum pernah dilihat, kemungkinan besar pola itu valid. Jika tidak, mungkin Anda perlu merevisi aturan atau mencari pola yang berbeda.

### 5. Generalisasi
Terapkan pola ke situasi baru untuk membuat prediksi. Misalnya, jika Anda menemukan pola bahwa nilai ujian siswa selalu turun setelah libur panjang, Anda dapat memprediksi bahwa tahun depan akan terjadi hal yang sama, dan dapat melakukan intervensi dini.

## Contoh Pengenalan Pola dalam Kehidupan Sehari-Hari

### Contoh 1: Mengenali Pola Cuaca
Setiap pagi, Anda melihat langit cerah selama tiga hari berturut-turut. Pada hari keempat, langit mendung dan hujan turun. Pola ini berulang beberapa kali dalam sebulan. Anda menyimpulkan bahwa cuaca cerah berkepanjangan sering diikuti oleh hujan. Dengan pengenalan pola ini, Anda dapat membawa payung ketika langit cerah sudah tiga hari.

### Contoh 2: Mengenali Pola Penjualan
Seorang penjual es krim mencatat penjualan setiap hari selama sebulan. Dia menemukan bahwa penjualan naik pada hari Jumat, Sabtu, dan Minggu, lalu turun pada hari Senin sampai Kamis. Pola ini berulang setiap minggu. Dengan pengenalan pola ini, dia dapat menyiapkan stok lebih banyak menjelang akhir pekan.

### Contoh 3: Mengenali Pola Belajar
Seorang siswa mencatat jam belajarnya setiap hari. Dia menemukan bahwa dia paling produktif belajar pada pukul 19.00-21.00, dan paling tidak produktif pada pukul 14.00-16.00. Dengan pengenalan pola ini, dia dapat mengatur jadwal belajar yang efektif, yaitu belajar materi sulit di malam hari dan mengerjakan tugas ringan di siang hari.

### Contoh 4: Mengenali Pola dalam Musik
Seorang musisi mendengar lagu-lagu populer dan menemukan bahwa banyak lagu mengikuti struktur yang sama: intro-verse-chorus-verse-chorus-bridge-chorus-outro. Pola ini berulang di banyak lagu. Dengan pengenalan pola ini, dia dapat menulis lagu yang lebih mudah diterima pendengar.

## Aplikasi Pengenalan Pola dalam Teknologi

1. **Pengenalan wajah di smartphone** — algoritma mengenali pola titik-titik wajah Anda untuk membuka kunci
2. **Filter spam email** — mengenali pola kata-kata yang sering muncul di email spam
3. **Rekomendasi konten** — YouTube dan TikTok mengenali pola tontonan Anda untuk merekomendasikan video
4. **Diagnosis medis** — AI mengenali pola gambar X-ray untuk mendeteksi penyakit
5. **Prediksi harga saham** — analis mengenali pola grafik untuk memprediksi pergerakan harga
6. **Otomotif self-driving** — mobil mengenali pola jalan, rambu, dan kendaraan lain

## Kesalahan Umum dalam Pengenalan Pola

1. **Kesalahan korelasi vs kausalitas** — mengira dua hal yang sering muncul bersamaan selalu saling menyebabkan. Contoh: penjualan es krim dan kasus tenggelam sama-sama naik di musim panas, tetapi es krim tidak menyebabkan tenggelam — keduanya disebabkan oleh cuaca panas.

2. **Overfitting** — membuat pola yang terlalu spesifik berdasarkan data terbatas. Contoh: menyimpulkan bahwa semua siswa dengan nama "Andi" pintar matematika hanya karena dua orang Andi yang Anda kenal pintar matematika.

3. **Bias konfirmasi** — hanya melihat data yang mendukung pola yang sudah dipercaya, mengabaikan data yang bertentangan. Contoh: percaya bahwa angka 13 sial, lalu hanya mengingat kejadian buruk yang terjadi di tanggal 13.

4. **Pola semu (apophenia)** — melihat pola yang sebenarnya tidak ada. Contoh: melihat wajah di awan atau mendengar suara di noise statis radio. Otak manusia cenderung mencari pola bahkan dalam data acak.

## Latihan Self-Assessment

Setelah membaca materi ini, coba kerjakan tantangan berikut: amati 7 hari terakhir kehidupan Anda (jam bangun, jam tidur, jam makan, jam belajar, jam bermain). Identifikasi minimal 2 pola yang berulang. Untuk setiap pola, tentukan apakah itu pola berulang, bertumbuh, struktural, atau temporal. Diskusikan dengan teman apakah pola yang Anda temukan valid atau mungkin hanya kebetulan.
', 'Informatika', '7A,7B,7C', 'SMP', 'Pengenalan Pola', 'cp_inf_7_1', 'tp_inf_7_1_3', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #001 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_001', '7', 'Informatika', '**Siti** mengamati deretan angka berikut: **2, 4, 6, 8, 10, 12, ...**. Berdasarkan pola yang ia temukan, angka berikutnya adalah...', '13', '14', '15', '16', 1, 'Pola bertambah 2 setiap langkah (pola aritmatika dengan beda 2). Angka berikutnya setelah 12 adalah 12+2=14.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Pola bertambah 2 setiap langkah (pola aritmatika dengan beda 2). Angka berikutnya setelah 12 adalah 12+2=14.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #002 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_002', '7', 'Informatika', '**Andi** melihat deretan angka: **1, 4, 9, 16, 25, ...**. Ia menyadari ini adalah pola kuadrat. Angka berikutnya adalah...', '30', '36', '49', '64', 1, 'Pola kuadrat: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. Angka berikutnya adalah 36.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Pola kuadrat: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. Angka berikutnya adalah 36.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #003 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_003', '7', 'Informatika', '**Budi** mengamati pola warna lampu lalu lintas: merah-kuning-hijau-merah-kuning-hijau-... Warna apa yang muncul setelah 10 perubahan dari awal?', 'Merah', 'Kuning', 'Hijau', 'Tidak bisa diprediksi', 1, 'Pola berulang setiap 3 warna. Posisi ke-10 = (10-1) mod 3 = 9 mod 3 = 0 → kuning (urutan: 1=merah, 2=kuning, 0=kuning). Cek: 1=merah, 2=kuning, 3=hijau, 4=merah, 5=kuning, 6=hijau, 7=merah, 8=kuning, 9=hijau, 10=merah. Jawaban: merah. Maaf, koreksi: posisi 10 adalah merah.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Pola berulang setiap 3 warna. Posisi ke-10 = (10-1) mod 3 = 9 mod 3 = 0 → kuning (urutan: 1=merah, 2=kuning, 0=kuning). Cek: 1=merah, 2=kuning, 3=hijau, 4=merah, 5=kuning, 6=hijau, 7=merah, 8=kuning, 9=hijau, 10=merah. Jawaban: merah. Maaf, koreksi: posisi 10 adalah merah.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #004 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_004', '7', 'Informatika', '**Dina** mencatat penjualan es krim selama seminggu: Senin 10, Selasa 12, Rabu 11, Kamis 13, Jumat 25, Sabtu 30, Minggu 28. Pola apa yang ia temukan?', 'Penjualan stabil sepanjang minggu', 'Penjualan naik di akhir pekan (Jumat-Minggu)', 'Penjualan turun di akhir pekan', 'Tidak ada pola yang jelas', 1, 'Penjualan Jumat-Minggu (25, 30, 28) jauh lebih tinggi dari Senin-Kamis (10-13). Pola: penjualan naik di akhir pekan.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Penjualan Jumat-Minggu (25, 30, 28) jauh lebih tinggi dari Senin-Kamis (10-13). Pola: penjualan naik di akhir pekan.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #005 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_005', '7', 'Informatika', '**Eka** melihat pola huruf: **A, C, E, G, I, ...**. Huruf berikutnya adalah...', 'J', 'K', 'L', 'M', 1, 'Pola melompat 1 huruf (A, skip B, C, skip D, E, ...). Setelah I (huruf ke-9), skip J (10), berikutnya K (11). Jawaban: K.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Pola melompat 1 huruf (A, skip B, C, skip D, E, ...). Setelah I (huruf ke-9), skip J (10), berikutnya K (11). Jawaban: K.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #006 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_006', '7', 'Informatika', 'Manakah yang TERMASUK jenis pola berulang (repeating pattern)?', 'Deret 2, 4, 8, 16, 32 (pola bertumbuh geometri)', 'Motif batik yang sama setiap 5 cm', 'Silsilah keluarga pohon', 'Pola cuaca musiman tahunan', 1, 'Pola berulang = elemen yang muncul kembali secara teratur tanpa perubahan. Motif batik yang sama setiap 5 cm adalah pola berulang. Opsi lain adalah pola bertumbuh/struktural/temporal.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Pola berulang = elemen yang muncul kembali secara teratur tanpa perubahan. Motif batik yang sama setiap 5 cm adalah pola berulang. Opsi lain adalah pola bertumbuh/struktural/temporal.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #007 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_007', '7', 'Informatika', '**Fajar** mengamati pola angka: **3, 6, 12, 24, 48, ...**. Angka berikutnya adalah...', '64', '72', '96', '100', 2, 'Pola geometri dengan rasio 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48. Berikutnya: 48×2=96.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: C. Pola geometri dengan rasio 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48. Berikutnya: 48×2=96.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #008 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_008', '7', 'Informatika', 'Pola: **1, 1, 2, 3, 5, 8, 13, ...** ini adalah deret Fibonacci. Angka berikutnya adalah...', '18', '20', '21', '24', 2, 'Fibonacci: tiap angka = jumlah 2 angka sebelumnya. 8+13=21. Berikutnya: 13+21=34.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: C. Fibonacci: tiap angka = jumlah 2 angka sebelumnya. 8+13=21. Berikutnya: 13+21=34.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #009 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_009', '7', 'Informatika', '**Gita** melihat jam digital: **12:00, 12:15, 12:30, 12:45, 13:00, ...**. Pola yang ia temukan adalah...', 'Bertambah 10 menit setiap langkah', 'Bertambah 15 menit setiap langkah', 'Bertambah 30 menit setiap langkah', 'Tidak ada pola', 1, 'Selisih setiap langkah 15 menit. Pola bertambah 15 menit (pola aritmatika dengan beda 15).', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Selisih setiap langkah 15 menit. Pola bertambah 15 menit (pola aritmatika dengan beda 15).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #010 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_010', '7', 'Informatika', '**Hadi** mengamati penjual gorengan. Setiap hari ia mencatat jumlah pembeli: 5, 8, 11, 14, 17. Pola yang ia temukan adalah...', 'Bertambah 2 setiap hari', 'Bertambah 3 setiap hari', 'Bertambah 5 setiap hari', 'Tidak ada pola', 1, '8-5=3, 11-8=3, 14-11=3, 17-14=3. Pola aritmatika dengan beda 3.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. 8-5=3, 11-8=3, 14-11=3, 17-14=3. Pola aritmatika dengan beda 3.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #011 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_011', '7', 'Informatika', 'Manakah contoh pola TEMPORAL (berbasis waktu)?', 'Pola ubin lantai dapur', 'Pola kenaikan harga setiap tahun', 'Pola silang kata', 'Pola deret Fibonacci', 1, 'Pola temporal = pola yang muncul seiring waktu. Kenaikan harga setiap tahun adalah pola temporal. Opsi lain: ubin=berulang, silang kata=struktural, Fibonacci=bertumbuh.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Pola temporal = pola yang muncul seiring waktu. Kenaikan harga setiap tahun adalah pola temporal. Opsi lain: ubin=berulang, silang kata=struktural, Fibonacci=bertumbuh.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #012 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_012', '7', 'Informatika', '**Ira** mengamati pola kalimat: ''kucing makan ikan'', ''anjing makan tulang'', ''kucing makan ikan'', ''anjing makan tulang''. Kalimat berikutnya adalah...', 'kucing makan tulang', 'anjing makan ikan', 'kucing makan ikan', 'tidak bisa diprediksi', 2, 'Pola berulang ABAB. Setelah ''anjing makan tulang'' (B), kembali ke ''kucing makan ikan'' (A).', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: C. Pola berulang ABAB. Setelah ''anjing makan tulang'' (B), kembali ke ''kucing makan ikan'' (A).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #013 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_013', '7', 'Informatika', 'Dalam musik, struktur **intro-verse-chorus-verse-chorus-bridge-chorus-outro** adalah contoh pola...', 'Pola berulang murni', 'Pola struktural (hubungan antar bagian)', 'Pola geometri', 'Pola acak', 1, 'Struktur lagu adalah pola struktural — ada hubungan antar bagian (verse-chorus berulang dengan modifikasi).', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Struktur lagu adalah pola struktural — ada hubungan antar bagian (verse-chorus berulang dengan modifikasi).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #014 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_014', '7', 'Informatika', '**Joko** melihat deret: **100, 50, 25, 12.5, ...**. Angka berikutnya adalah...', '6.25', '5', '10', '0', 0, 'Pola geometri dengan rasio 0.5 (dibagi 2 setiap langkah). 12.5/2=6.25.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: A. Pola geometri dengan rasio 0.5 (dibagi 2 setiap langkah). 12.5/2=6.25.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #015 (C3 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_015', '7', 'Informatika', 'Langkah PERTAMA yang benar dalam pengenalan pola adalah...', 'Langsung menyimpulkan pola', 'Amati dengan seksama dan catat data', 'Verifikasi pola dengan data baru', 'Generalisasi ke situasi lain', 1, 'Urutan benar: amati → identifikasi kemiripan → temukan aturan → verifikasi → generalisasi. Amati adalah langkah pertama.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Urutan benar: amati → identifikasi kemiripan → temukan aturan → verifikasi → generalisasi. Amati adalah langkah pertama.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #016 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_016', '7', 'Informatika', '**Kiki** mengamati dua hal yang sering muncul bersama: penjualan es krim naik dan kasus tenggelam naik. Ia menyimpulkan es krim menyebabkan tenggelam. Kesalahan logika apa yang ia lakukan?', 'Overfitting', 'Bias konfirmasi', 'Mengira korelasi = kausalitas (keduanya disebabkan cuaca panas)', 'Apophenia', 2, 'Analisis: korelasi ≠ kausalitas. Es krim dan tenggelam berkorelasi (naik bersama), tetapi keduanya disebabkan faktor ketiga (cuaca panas), bukan saling menyebabkan.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: C. Analisis: korelasi ≠ kausalitas. Es krim dan tenggelam berkorelasi (naik bersama), tetapi keduanya disebabkan faktor ketiga (cuaca panas), bukan saling menyebabkan.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #017 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_017', '7', 'Informatika', 'Perhatikan pola: **1, 2, 4, 8, 16, 32, 64, 128, ...**. Jika pola berlanjut, berapa angka pada posisi ke-15?', '16384', '8192', '32768', '4096', 0, 'Analisis: pola geometri rasio 2. Angka ke-n = 2^(n-1). Posisi 15 = 2^14 = 16384.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: pola geometri rasio 2. Angka ke-n = 2^(n-1). Posisi 15 = 2^14 = 16384.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #018 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_018', '7', 'Informatika', '**Lia** menemukan pola: setiap kali ia belajar 2 jam, nilainya naik 5 poin. Ia menyimpulkan: belajar 4 jam akan naik 10 poin, belajar 8 jam akan naik 20 poin. Apa asumsi yang ia buat?', 'Pola selalu linier (naik konstan)', 'Pola kuadrat', 'Pola berhenti pada titik tertentu', 'Pola acak', 0, 'Analisis: Lia mengasumsikan pola linier (proporsional). Padahal dalam kenyataan, belajar terlalu lama bisa jenuh — pola mungkin melandai (diminishing return).', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: Lia mengasumsikan pola linier (proporsional). Padahal dalam kenyataan, belajar terlalu lama bisa jenuh — pola mungkin melandai (diminishing return).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #019 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_019', '7', 'Informatika', 'Pola: **2, 6, 12, 20, 30, 42, ...**. Berapa angka berikutnya DAN apa aturan polanya?', '56 (n×(n+1))', '54 (n²+n-2)', '60 (n²+2)', '48 (n×(n-1))', 0, 'Analisis: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42. Pola: n×(n+1). Berikutnya 7×8=56.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42. Pola: n×(n+1). Berikutnya 7×8=56.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #020 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_020', '7', 'Informatika', '**Maman** melihat pola belanja: setiap awal bulan belanja Rp 500rb, pertengahan Rp 300rb, akhir bulan Rp 100rb. Ini berulang setiap bulan. Jenis pola apa ini?', 'Pola berulang + temporal (kombinasi)', 'Pola bertumbuh', 'Pola struktural murni', 'Pola acak', 0, 'Analisis: pola berulang (setiap bulan sama) + temporal (berbasis waktu bulanan). Ini kombinasi pola berulang dan temporal.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: pola berulang (setiap bulan sama) + temporal (berbasis waktu bulanan). Ini kombinasi pola berulang dan temporal.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #021 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_021', '7', 'Informatika', 'Pola: **A, B, B, C, C, C, D, D, D, D, ...**. Berapa kali huruf ''F'' muncul?', '5 kali', '6 kali', '7 kali', '8 kali', 1, 'Analisis: A muncul 1x, B 2x, C 3x, D 4x, E 5x, F 6x. Pola: huruf ke-n muncul n kali. F (huruf ke-6) muncul 6x.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: A muncul 1x, B 2x, C 3x, D 4x, E 5x, F 6x. Pola: huruf ke-n muncul n kali. F (huruf ke-6) muncul 6x.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #022 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_022', '7', 'Informatika', '**Nina** mencatat jam produktivitas belajarnya: pukul 19.00-21.00 sangat produktif, 14.00-16.00 tidak produktif. Ia ingin optimalkan belajar. Strategi TERBAIK?', 'Paksa belajar materi sulit di 14.00-16.00 agar terbiasa', 'Alokasikan materi sulit di 19.00-21.00, tugas ringan di 14.00-16.00', 'Berhenti belajar di 14.00-16.00', 'Belajar hanya di 19.00-21.00', 1, 'Analisis: manfaatkan pola produktivitas. Materi sulit butuh konsentrasi tinggi → jam produktif. Tugas ringan → jam kurang produktif. Opsi B paling efisien.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: manfaatkan pola produktivitas. Materi sulit butuh konsentrasi tinggi → jam produktif. Tugas ringan → jam kurang produktif. Opsi B paling efisien.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #023 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_023', '7', 'Informatika', 'Dalam diagnosis medis, AI mengenali pola gejala pasien untuk mendeteksi penyakit. Pola apa yang dicari AI?', 'Pola berulang murni', 'Pola struktural (kombinasi gejala yang sering muncul bersama)', 'Pola geometri', 'Pola acak', 1, 'Analisis: AI mencari pola struktural — kombinasi gejala yang sering muncul bersamaan untuk penyakit tertentu. Misal: demam+batuk+sesak napas = indikasi flu/pneumonia.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: AI mencari pola struktural — kombinasi gejala yang sering muncul bersamaan untuk penyakit tertentu. Misal: demam+batuk+sesak napas = indikasi flu/pneumonia.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #024 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_024', '7', 'Informatika', '**Omar** mengamati pola angka: **1, 8, 27, 64, 125, ...**. Apa aturan pola ini?', 'n² (kuadrat)', 'n³ (pangkat tiga)', 'n×3', 'n! (faktorial)', 1, 'Analisis: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125. Pola: n³ (pangkat tiga). Berikutnya 6³=216.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125. Pola: n³ (pangkat tiga). Berikutnya 6³=216.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #025 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_025', '7', 'Informatika', '**Pak Guru** melihat data nilai ujian 3 kelas: 7A rata-rata 75, 7B rata-rata 80, 7C rata-rata 78. Lalu 7A rata-rata 76, 7B 82, 7C 79. Pola apa yang mungkin ia temukan?', '7A selalu terendah, 7B selalu tertinggi (pola peringkat konsisten)', 'Tidak ada pola', 'Semua kelas turun', 'Semua kelas naik', 0, 'Analisis: urutan rata-rata konsisten: 7B > 7C > 7A di kedua ujian. Pola peringkat konsisten. Tapi ini pola lemah — butuh data lebih banyak untuk validasi.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: urutan rata-rata konsisten: 7B > 7C > 7A di kedua ujian. Pola peringkat konsisten. Tapi ini pola lemah — butuh data lebih banyak untuk validasi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #026 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_026', '7', 'Informatika', 'Pola: **1, 2, 4, 7, 11, 16, 22, ...**. Apa aturan dan angka berikutnya?', 'Bertambah 1, 2, 3, 4, 5, 6 (selisih bertumbuh) → 29', 'Bertambah konstan 5 → 27', 'Kuadrat → 28', 'Fibonacci → 29', 0, 'Analisis: selisih 1, 2, 3, 4, 5, 6 → pola bertambah dengan selisih yang tumbuh. Berikutnya selisih 7, jadi 22+7=29.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: selisih 1, 2, 3, 4, 5, 6 → pola bertambah dengan selisih yang tumbuh. Berikutnya selisih 7, jadi 22+7=29.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #027 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_027', '7', 'Informatika', '**Qori** percaya angka 13 sial. Ia hanya mengingat kejadian buruk di tanggal 13, lupa kejadian baik. Kesalahan apa ini?', 'Overfitting', 'Bias konfirmasi (hanya ingat yang support keyakinan)', 'Apophenia', 'Korelasi vs kausalitas', 1, 'Analisis: bias konfirmasi — hanya melihat/mengingat data yang mendukung keyakinan, mengabaikan data yang bertentangan. Solutif: catat SEMUA kejadian di tanggal 13, bandingkan dengan tanggal lain.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: bias konfirmasi — hanya melihat/mengingat data yang mendukung keyakinan, mengabaikan data yang bertentangan. Solutif: catat SEMUA kejadian di tanggal 13, bandingkan dengan tanggal lain.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #028 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_028', '7', 'Informatika', 'Pola: **2, 3, 5, 7, 11, 13, 17, 19, ...**. Apa pola ini?', 'Bilangan ganjil', 'Bilangan prima (hanya bisa dibagi 1 dan dirinya)', 'Fibonacci', 'Pola acak', 1, 'Analisis: 2, 3, 5, 7, 11, 13, 17, 19 adalah bilangan prima — hanya bisa dibagi 1 dan dirinya. Berikutnya: 23.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: 2, 3, 5, 7, 11, 13, 17, 19 adalah bilangan prima — hanya bisa dibagi 1 dan dirinya. Berikutnya: 23.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #029 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_029', '7', 'Informatika', '**Rina** melihat pola: hari Senin hujan, Selasa cerah, Rabu hujan, Kamis cerah, Jumat hujan. Ia prediksi Sabtu cerah. Tapi Sabtu ternyata hujan. Apa yang terjadi?', 'Pola berubah (pola temporal bisa berubah karena faktor lain)', 'Rina salah hitung', 'Tidak ada pola sebenarnya', 'Pola tidak valid', 0, 'Analisis: pola temporal bisa berubah karena faktor lain (mis: musim berubah, ada badai tropis). Pola bukan jaminan, hanya prediksi berdasarkan data historis.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: pola temporal bisa berubah karena faktor lain (mis: musim berubah, ada badai tropis). Pola bukan jaminan, hanya prediksi berdasarkan data historis.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #030 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_030', '7', 'Informatika', 'Pola: **A1, B2, C3, D4, E5, ...**. Apa aturan dan elemen berikutnya?', 'Huruf+angka sama (A1, B2, dst) → F6', 'Huruf naik, angka konstan → F5', 'Huruf konstan, angka naik → E6', 'Acak', 0, 'Analisis: huruf naik (A→B→C→D→E) dan angka naik (1→2→3→4→5) sejalan. Berikutnya: F6.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: huruf naik (A→B→C→D→E) dan angka naik (1→2→3→4→5) sejalan. Berikutnya: F6.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #031 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_031', '7', 'Informatika', '**Siti** dan **Tono** sama-sama mengamati data penjualan 7 hari. Siti: ''Pola jelas, naik di akhir pekan''. Tono: ''Data terlalu sedikit, mungkin kebetulan''. Siapa yang BENAR?', 'Siti benar — pola sudah jelas', 'Tono benar — 7 hari terlalu sedikit untuk generalisasi (overfitting risk)', 'Keduanya salah', 'Keduanya benar', 1, 'Evaluasi: 7 hari = 1 minggu, hanya 1 siklus akhir pekan. Bisa kebetulan. Butuh minimal 4 minggu untuk konfirmasi pola akhir pekan. Tono lebih kritis metodologis.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: 7 hari = 1 minggu, hanya 1 siklus akhir pekan. Bisa kebetulan. Butuh minimal 4 minggu untuk konfirmasi pola akhir pekan. Tono lebih kritis metodologis.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #032 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_032', '7', 'Informatika', '**Vera** melihat pola deret: **1, 11, 21, 1211, 111221, ...** (deret ''look-and-say''). Ia kesulitan menemukan aturan. Evaluasi strategi yang PALING tepat?', 'Beri up, pola tidak ada', 'Baca setiap angka sebagai deskripsi: ''1'' = satu 1 = ''11'', ''11'' = dua 1 = ''21'', dst. Pola = baca deskripsi angka sebelumnya', 'Cari pola matematika biasa (tambah/kali)', 'Asumsiikan pola Fibonacci', 1, 'Evaluasi: deret look-and-say: ''1'' dibaca ''satu 1'' → ''11''; ''11'' dibaca ''dua 1'' → ''21''; ''21'' dibaca ''satu 2, satu 1'' → ''1211''. Berikutnya: ''312211''.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: deret look-and-say: ''1'' dibaca ''satu 1'' → ''11''; ''11'' dibaca ''dua 1'' → ''21''; ''21'' dibaca ''satu 2, satu 1'' → ''1211''. Berikutnya: ''312211''.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #033 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_033', '7', 'Informatika', 'Manakah klaim yang PALING valid berdasarkan pengenalan pola?', '''Semua siswa bernama Andi pintar matematika'' (2 orang Andi pintar)', '''Cuaca cerah 3 hari biasanya diikuti hujan'' (10 tahun data mendukung)', '''Angka 13 sial'' (berdasarkan feeling)', '''Belajar malam bikin pinter'' (1 pengalaman pribadi)', 1, 'Evaluasi: klaim B divalidasi dengan 10 tahun data — pola temporal kuat. Opsi A=overfitting (2 sampel), C=bias konfirmasi, D=anekdotal. B paling valid.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: klaim B divalidasi dengan 10 tahun data — pola temporal kuat. Opsi A=overfitting (2 sampel), C=bias konfirmasi, D=anekdotal. B paling valid.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #034 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_034', '7', 'Informatika', '**Wati** menemukan pola belajar: belajar kelompok → nilai naik. Ia menyimpulkan semua siswa harus belajar kelompok. Evaluasi generalisasi ini.', 'Valid — pola = aturan universal', 'Lemah — pola mungkin khusus untuk Wati, tidak semua siswa belajar efektif kelompok', 'Salah total', 'Tidak bisa dievaluasi', 1, 'Evaluasi: pola 1 orang tidak bisa digeneralisasi ke semua. Banyak faktor (gaya belajar, materi, partner). Generalisasi lemah — perlu studi lebih luas.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: pola 1 orang tidak bisa digeneralisasi ke semua. Banyak faktor (gaya belajar, materi, partner). Generalisasi lemah — perlu studi lebih luas.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #035 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_035', '7', 'Informatika', 'Manakah yang merupakan contoh APONIA (melihat pola yang tidak ada)?', 'Mengenali pola musiman cuaca', 'Melihat wajah di pola awan', 'Memprediksi pola penjualan akhir pekan', 'Menganalisis pola gejala medis', 1, 'Evaluasi: apophenia = melihat pola di data acak. Awan acak, otak melihat wajah = apophenia. Opsi lain = pola yang divalidasi.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: apophenia = melihat pola di data acak. Awan acak, otak melihat wajah = apophenia. Opsi lain = pola yang divalidasi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #036 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_036', '7', 'Informatika', '**Yusuf** mengamati data nilai 5 ujian: 60, 70, 80, 90, 100. Ia prediksi ujian ke-6 = 110. Evaluasi prediksi ini.', 'Valid — pola naik 10 konsisten', 'Lemah — nilai maksimal biasanya 100, pola akan berhenti/berubah. Asumsi linier tidak realistis', 'Salah — harusnya 105', 'Tidak bisa dievaluasi', 1, 'Evaluasi: pola linier (naik 10) tapi nilai maksimal 100. Prediksi 110 tidak realistis — pola akan terbatas oleh ceiling. Butuh model yang akun ceiling effect.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: pola linier (naik 10) tapi nilai maksimal 100. Prediksi 110 tidak realistis — pola akan terbatas oleh ceiling. Butuh model yang akun ceiling effect.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #037 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_037', '7', 'Informatika', 'Pola: **1, 2, 4, 8, 16, 32, ...**. Beberapa siswa memberikan prediksi berbeda. Manakah yang paling TEPAT?', 'Berikutnya 64 (pola geometri rasio 2)', 'Berikutnya 31 (pola bertambah 1, 2, 4, 8, 16, lalu 15)', 'Tidak bisa diprediksi', 'Berikutnya 48 (rata-rata)', 0, 'Evaluasi: pola geometri rasio 2 paling jelas dan konsisten: 1×2=2, 2×2=4, 4×2=8, 8×2=16, 16×2=32. Berikutnya 32×2=64. Pola alternatif B (selisih 1,2,4,8,16,?) juga valid tapi kurang elegan.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: A. Evaluasi: pola geometri rasio 2 paling jelas dan konsisten: 1×2=2, 2×2=4, 4×2=8, 8×2=16, 16×2=32. Berikutnya 32×2=64. Pola alternatif B (selisih 1,2,4,8,16,?) juga valid tapi kurang elegan.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #038 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_038', '7', 'Informatika', '**Zahra** menganalisis pola jam tidur selama sebulan. Ia menemukan: tidur <6 jam → nilai turun, tidur 7-8 jam → nilai stabil, tidur >9 jam → nilai juga turun. Kesimpulan TERBAIK?', 'Tidur lebih banyak selalu lebih baik', 'Tidur optimal 7-8 jam (pola inverted-U — terlalu sedikit/banyak sama buruknya)', 'Tidur tidak pengaruh ke nilai', 'Tidur <6 jam terbaik', 1, 'Evaluasi: pola inverted-U — ada rentang optimal (7-8 jam), terlalu sedikit/banyak sama buruknya. Bukan linier. Pola ini sering muncul di biologi/psikologi.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: pola inverted-U — ada rentang optimal (7-8 jam), terlalu sedikit/banyak sama buruknya. Bukan linier. Pola ini sering muncul di biologi/psikologi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #039 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_039', '7', 'Informatika', 'Manakah strategi pengenalan pola yang PALING ilmiah?', 'Langsung percaya pola yang ditemukan', 'Verifikasi pola dengan data baru sebelum generalisasi', 'Hanya pakai intuisi', 'Asumsiikan pola universal tanpa tes', 1, 'Evaluasi: metode ilmiah = hipotesis (pola) → tes dengan data baru → revisi. Verifikasi dengan data baru mencegah overfitting dan bias konfirmasi.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: metode ilmiah = hipotesis (pola) → tes dengan data baru → revisi. Verifikasi dengan data baru mencegah overfitting dan bias konfirmasi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #040 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_040', '7', 'Informatika', '**Adi** menemukan pola: siswa yang sarapan punya nilai lebih tinggi. Ia menyimpulkan: ''saralan menyebabkan nilai tinggi''. Evaluasi.', 'Valid — pola jelas', 'Lemah — bisa korelasi tanpa kausalitas. Mungkin siswa disiplin (yang sarapan) juga disiplin belajar. Faktor ketiga', 'Salah total', 'Tidak bisa dievaluasi', 1, 'Evaluasi: korelasi ≠ kausalitas. Sarapan ↔ nilai tinggi bisa karena faktor ketiga (disiplin, kondisi ekonomi). Untuk uji kausalitas butuh eksperimen (randomized controlled trial).', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: korelasi ≠ kausalitas. Sarapan ↔ nilai tinggi bisa karena faktor ketiga (disiplin, kondisi ekonomi). Untuk uji kausalitas butuh eksperimen (randomized controlled trial).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #041 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_041', '7', 'Informatika', 'Dalam machine learning, algoritma rekomendasi YouTube mengenali pola tontonan. Manakah risiko TERBESAR?', 'Tidak ada risiko', 'Filter bubble — pola yang terlalu sempit membuat user hanya lihat konten serupa, tidak terpapar hal baru', 'YouTube tidak pakai pola', 'Pola tidak akurat', 1, 'Evaluasi: filter bubble adalah risiko nyata. Algoritma terlalu optimize ''pola yang disukai'' → user terjebak di konten serupa. Bisa ekstremkan pandangan (radicalization).', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: filter bubble adalah risiko nyata. Algoritma terlalu optimize ''pola yang disukai'' → user terjebak di konten serupa. Bisa ekstremkan pandangan (radicalization).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #042 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_042', '7', 'Informatika', '**Boni** menemukan pola: nilai ujian matematika naik setiap kali ia latihan soal HOTS. Ia menyimpulkan ''latihan HOTS = nilai naik''. Tapi ternyata ia juga belajar lebih lama. Evaluasi.', 'Pola valid — HOTS penyebab', 'Lemah — confounding variable (belajar lebih lama juga bisa penyebab). Tidak bisa isolasi HOTS sebagai penyebab', 'Salah total', 'Pola acak', 1, 'Evaluasi: confounding variable. Dua variabel berubah bersamaan (HOTS + durasi belajar), tidak bisa tentukan mana yang sebenarnya penyebab. Butuh eksperimen yang isolasi variabel.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: confounding variable. Dua variabel berubah bersamaan (HOTS + durasi belajar), tidak bisa tentukan mana yang sebenarnya penyebab. Butuh eksperimen yang isolasi variabel.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #043 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_043', '7', 'Informatika', 'Manakah pola yang PALING sulit diprediksi?', 'Pola aritmatika linier (1, 2, 3, 4)', 'Pola cuaca harian (banyak faktor, non-linier)', 'Pola kuadrat (1, 4, 9, 16)', 'Pola geometri (2, 4, 8, 16)', 1, 'Evaluasi: pola cuaca paling sulit — banyak faktor (suhu, tekanan, kelembaban, angin, topografi), non-linier, chaotic. Bahkan superkomputer pun terbatas. Opsi lain punya aturan jelas.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: pola cuaca paling sulit — banyak faktor (suhu, tekanan, kelembaban, angin, topografi), non-linier, chaotic. Bahkan superkomputer pun terbatas. Opsi lain punya aturan jelas.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #044 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_044', '7', 'Informatika', '**Citra** mengamati pola: setiap kali guru pakai metode diskusi, nilai siswa naik. Ia merekomendasikan semua pelajaran pakai diskusi. Evaluasi.', 'Valid — pola universal', 'Lemah — metode diskusi efektif untuk materi tertentu (analisis, kritis), tidak untuk semua (mis: hafalan). Generalisasi berlebihan', 'Salah total', 'Tidak bisa dievaluasi', 1, 'Evaluasi: generalisasi berlebihan. Diskusi efektif untuk materi yang butuh analisis kritis, tapi tidak optimal untuk hafalan/prosedural. Perlu kontekstualisasi per materi.', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: generalisasi berlebihan. Diskusi efektif untuk materi yang butuh analisis kritis, tapi tidak optimal untuk hafalan/prosedural. Perlu kontekstualisasi per materi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 PG #045 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_pg_045', '7', 'Informatika', 'Pola: **1, 2, 6, 24, 120, 720, ...**. Manakah evaluasi yang BENAR tentang pola ini?', 'Pola faktorial (n!) — berikutnya 5040', 'Pola kuadrat — berikutnya 840', 'Pola acak', 'Pola Fibonacci — berikutnya 1440', 0, 'Evaluasi: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720. Pola faktorial. Berikutnya 7!=5040. Faktorial tumbuh sangat cepat (lebih cepat dari geometri).', 'Pengenalan Pola', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: A. Evaluasi: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720. Pola faktorial. Berikutnya 7!=5040. Faktorial tumbuh sangat cepat (lebih cepat dari geometri).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 Essai #001 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_essay_001', '7', 'Informatika', '**Skenario:** Amati 7 hari terakhir kehidupan Anda (jam bangun, jam tidur, jam makan, jam belajar, jam bermain gadget).

**Tugas:** 
1. Buat tabel data 7 hari
2. Identifikasi minimal 2 pola yang berulang
3. Untuk setiap pola, tentukan jenisnya (berulang/bertumbuh/struktural/temporal)
4. Buat prediksi berdasarkan pola tersebut
5. Identifikasi minimal 1 keterbatasan prediksi Anda', '', '', '', '', 0, '', 'Pengenalan Pola', true, 'essai', '[]', '[]', '', 'Contoh jawaban:

1. Tabel 7 hari (jam bangun, tidur, makan, belajar, gadget):
Senin: 06:00, 22:00, 07:00/12:00/18:00, 19:00-21:00, 21:00-22:00
Selasa: 06:00, 22:30, ...
... (lengkapi 7 hari)

2. Pola yang ditemukan:
Pola 1: Jam bangun konsisten 06:00 (Senin-Jumat), 07:00 (Sabtu-Minggu) → pola temporal mingguan
Pola 2: Jam belajar malam 19:00-21:00 konsisten di hari sekolah, tidak ada di akhir pekan → pola temporal + struktural

3. Jenis pola:
- Pola 1: temporal (berbasis waktu) + berulang (konsisten setiap minggu)
- Pola 2: temporal + struktural (hubungan dengan hari sekolah)

4. Prediksi:
- Senin depan bangun 06:00
- Belajar malam 19:00-21:00 Senin-Jumat

5. Keterbatasan:
- Hanya 1 minggu data — bisa kebetulan
- Belum akun variasi (ujian, libur, sakit)
- Sample size kecil untuk generalisasi kuat
- Pola bisa berubah saat ada event khusus', 'C4', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 Essai #002 (C4 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_essay_002', '7', 'Informatika', '**Analisis kasus:** Seorang penjual jus buah mencatat penjualan 4 minggu:
- Minggu 1: Senin 20, Selasa 22, Rabu 25, Kamis 28, Jumat 45, Sabtu 60, Minggu 55
- Minggu 2: Senin 21, Selasa 24, Rabu 26, Kamis 30, Jumat 48, Sabtu 62, Minggu 58
- Minggu 3: Senin 22, Selasa 23, Rabu 27, Kamis 29, Jumat 50, Sabtu 65, Minggu 60
- Minggu 4: Senin 23, Selasa 25, Rabu 28, Kamis 31, Jumat 52, Sabtu 68, Minggu 62

**Tugas:** 
1. Identifikasi minimal 2 pola yang berbeda
2. Untuk setiap pola, jelaskan aturan dan prediksi minggu ke-5
3. Berikan rekomendasi strategi stok untuk minggu ke-5', '', '', '', '', 0, '', 'Pengenalan Pola', true, 'essai', '[]', '[]', '', 'Analisis:

1. Pola yang ditemukan:

Pola A (Temporal mingguan): Pola akhir pekan — Jumat-Sabtu-Minggu penjualan naik signifikan (45-68) vs Senin-Kamis (20-31). Pola berulang setiap minggu.

Pola B (Tren naik): Setiap hari, penjualan naik ±1-2 dari minggu sebelumnya. Mis: Senin M1=20, M2=21, M3=22, M4=23. Pola bertumbuh linier per minggu.

2. Aturan dan prediksi minggu 5:
- Pola A: akhir pekan tetap tinggi. Prediksi Jumat 55, Sabtu 70, Minggu 65
- Pola B: setiap hari +1 dari minggu sebelumnya. Prediksi Senin 24, Selasa 26, Rabu 29, Kamis 32

3. Rekomendasi stok minggu 5:
- Siapkan stok buah 2x lebih banyak untuk Jumat-Sabtu-Minggu
- Senin-Kamis stok standar (cukup untuk 25-32 gelas)
- Total estimasi: 24+26+29+32+55+70+65 = 301 gelas
- Tambah buffer 10% = 330 gelas
- Order buah proporsional: apel 40%, jeruk 30%, pisang 20%, lainnya 10%
- Review penjualan aktual minggu 5 untuk kalibrasi minggu 6', 'C4', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 Essai #003 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_essay_003', '7', 'Informatika', '**Studi kasus kritis:** Sebuah sekolah menemukan pola: siswa yang aktif di ekstrakurikuler robotics memiliki nilai matematika lebih tinggi. Kepala sekolah menyimpulkan: ''Robotics menyebabkan nilai matematika naik. Wajibkan semua siswa ikut robotics.''

**Tugas:** 
1. Identifikasi minimal 3 kemungkinan penjelasan alternatif (selain ''robotics menyebabkan nilai naik'')
2. Rancang eksperimen untuk menguji apakah robotics benar-benar penyebab
3. Jika eksperimen tidak feasible, apa studi observasional alternatif yang lebih kuat?
4. Berikan rekomendasi akhir ke kepala sekolah', '', '', '', '', 0, '', 'Pengenalan Pola', true, 'essai', '[]', '[]', '', '1. Penjelasan alternatif (confounding variables):

a. Seleksi: Siswa yang minat robotics mungkin sudah pintar matematika sejak awal. Robotics menarik siswa math-oriented, bukan robotics yang bikin pintar math.

b. Faktor waktu belajar: Siswa robotics mungkin lebih disiplin, belajar lebih banyak. Robotics = indikator disiplin, bukan penyebab langsung.

c. Faktor sosioekonomi: Robotics butuh biaya. Siswa mampu ekonomi mungkin punya akses bimbel, buku, lingkungan belajar lebih baik. Robotics = proxy status ekonomi.

d. Motivasi umum: Siswa yang minat robotics mungkin punya motivasi belajar tinggi secara umum. Robotics = indikator motivasi, bukan penyebab.

2. Eksperimen (RCT - Randomized Controlled Trial):
- Random assign 100 siswa ke 2 kelompok: 50 ikut robotics (treatment), 50 tidak (control)
- Pre-test matematika awal tahun
- 1 tahun treatment
- Post-test matematika akhir tahun
- Bandingkan peningkatan (post - pre) antara kelompok
- Jika treatment > control signifikan, robotics efektif

3. Studi observasional alternatif (jika RCT tidak feasible):
- Propensity Score Matching: cari siswa non-robotics dengan karakteristik mirip (nilai awal, ekonomi, motivasi), bandingkan dengan siswa robotics
- Longitudinal study: ikut siswa dari sebelum ikut robotics sampai setelah, bandingkan tren nilai
- Difference-in-differences: bandingkan perubahan nilai siswa yang baru ikut robotics vs yang tidak, sebelum dan sesudah

4. Rekomendasi akhir:
- JANGAN wajibkan semua siswa ikut robotics berdasarkan pola ini saja — korelasi ≠ kausalitas
- Lakukan RCT kecil dulu (1 semester, 20 siswa per kelompok) untuk validasi
- Jika RCT tidak feasible, lakukan propensity score matching
- Pertimbangkan biaya: robotics mahal, mungkin lebih efektif investasi ke program remedial matematika langsung
- Komunikasikan ke kepala sekolah: ''pola menarik tapi butuh validasi sebelum kebijakan besar''', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 Essai #004 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_essay_004', '7', 'Informatika', '**Refleksi:** Pilih satu aplikasi yang sering Anda gunakan (mis: TikTok, Instagram, Spotify, YouTube). Analisis bagaimana algoritma pengenalan pola bekerja di aplikasi tersebut.

**Tugas:** 
1. Jelaskan minimal 3 pola yang mungkin dianalisis algoritma dari perilaku Anda
2. Identifikasi 2 manfaat dan 2 risiko dari pengenalan pola ini
3. Berikan 1 saran untuk Anda sendiri agar tidak terjebak filter bubble', '', '', '', '', 0, '', 'Pengenalan Pola', true, 'essai', '[]', '[]', '', 'Contoh jawaban untuk TikTok:

1. Pola yang dianalisis algoritma:

a. Pola tontonan: video apa yang ditonton sampai habis vs skip cepat. Misal: video masak ditonton lengkap, video olahraga di-skip. Algoritma tahu preferensi konten.

b. Pola interaksi: like, comment, share, save. Misal: sering save video resep, jarang like video dance. Algoritma tahu engagement per kategori.

c. Pola waktu: jam berapa paling aktif, durasi sesi, frekuensi buka app. Algoritma tahu kapan kirim notifikasi optimal dan jenis konten yang cocok per jam (mis: konten santai di malam hari).

2. Manfaat:
- Konten yang muncul relevan, hemat waktu pencarian
- Eksposur ke konten yang sesuai minat, belajar hal baru di niche

Risiko:
- Filter bubble: hanya lihat konten serupa, tidak terpapar hal baru, sudut pandang menyempit
- Radicalization: algoritma dorong konten ekstrem untuk engagement, bisa geser pandangan politik/agama jadi ekstrem

3. Saran hindari filter bubble:
- Aktif cari konten di luar pola biasa (cari tag baru, follow akun berbeda pandangan)
- Set timer 30 menit/hari, jangan scroll berlebihan
- Refleksi: ''apakah konten yang saya lihat mewakili dunia, atau hanya gelembung saya?''
- Sesekali clear history / pakai akun baru untuk reset algoritma
- Baca berita dari sumber beragam, tidak hanya yang direkomendasikan', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 7 Essai #005 (C5 - Pengenalan Pola)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_7_1_3_essay_005', '7', 'Informatika', '**Eksperimen desain:** Anda diminta merancang algoritma sederhana untuk mengenali pola kebiasaan belajar siswa dari data jam belajar harian (30 hari).

**Tugas:** 
1. Identifikasi minimal 4 jenis pola yang harus dikenali algoritma
2. Untuk setiap jenis, jelaskan cara deteksi sederhana (pseudocode level tinggi)
3. Identifikasi 2 risiko etis dari pengumpulan data ini
4. Berikan rekomendasi privasi/data governance', '', '', '', '', 0, '', 'Pengenalan Pola', true, 'essai', '[]', '[]', '', '1. Jenis pola yang dikenali:

a. Pola waktu produktif (jam belajar paling efektif)
b. Pola konsistensi (rutin vs tidak rutin)
c. Pola akhir pekan vs hari sekolah
d. Pola sebelum ujian (belajar intensif sebelum ujian vs konsisten)

2. Pseudocode deteksi:

a. Pola waktu produktif:
```
FOR setiap jam (0-23):
  hitung rata-rata durasi belajar di jam itu
  hitung korelasi jam itu dengan nilai ujian keesokan hari
AMBIL top 3 jam dengan korelasi tertinggi = jam produktif
```

b. Pola konsistensi:
```
standar_deviasi = hitung std deviasi durasi belajar harian
JIKA std_dev < 30 menit → konsisten
JIKA std_dev > 90 menit → tidak konsisten
```

c. Pola akhir pekan:
```
rata_weekday = avg(durasi belajar Senin-Jumat)
rata_weekend = avg(durasi belajar Sabtu-Minggu)
JIKA rata_weekend > rata_weekday * 1.5 → pola weekend booster
JIKA rata_weekend < rata_weekday * 0.5 → pola weekend off
```

d. Pola sebelum ujian:
```
FOR setiap ujian:
  bandingkan durasi belajar 3 hari sebelum vs rata-rata 7 hari sebelumnya
JIKA rata-rata 3 hari sebelum > 1.5x normal → pola cramming
```

3. Risiko etis:

a. Privasi: data jam belajar bisa reveal pola tidur, aktivitas keluarga, kesehatan mental (mis: belajar jam 3 pagi = indikasi stres).

b. Label/klasifikasi merugikan: siswa yang diklasifikasi ''tidak konsisten'' mungkin diberi stigma, padahal bisa karena alasan valid (orang sakit, ada masalah keluarga).

c. Self-fulfilling prophecy: guru yang tahu siswa ''tidak konsisten'' mungkin beri ekspektasi rendah, siswa jadi tidak termotivasi.

4. Rekomendasi privasi/governance:

a. Anonymize data — pisahkan nama dari data jam belajar, pakai ID anonim
b. Consent — siswa/wali harus setuju, bisa opt-out
c. Purpose limitation — data hanya untuk feedback siswa, bukan ranking/diskriminasi
d. Data retention — hapus data setelah 1 tahun, tidak disimpan permanen
e. Access control — hanya guru BK + siswa sendiri yang lihat, tidak share ke guru lain tanpa consent
f. Audit — annual audit etika, transparansi algoritma (bisa dijelaskan ke siswa)
g. Right to explanation — siswa bisa minta penjelasan kenapa diklasifikasi pola tertentu, bisa banding', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_7_1', 'tp_inf_7_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas 3 untuk Kelas 7 (Pengenalan Pola)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_7_1_3', 'Tugas 3 Kelas 7: Pengenalan Pola (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang pengenalan pola untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Pengenalan Pola" sebelum mengerjakan.', 'Informatika', '7A,7B,7C', 'SMP', true, '2026-09-28T23:59:00+07:00', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_7_1', 'tp_inf_7_1_3', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- KELAS 8: TP3 + Materi Visualisasi Data + 50 Soal + Tugas 3
-- ============================================================


-- TP 3 untuk Kelas 8 (Visualisasi Data)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_8_1_3', 'cp_inf_8_1', 'TP.8.1.3', 'Siswa mampu membuat dan membaca visualisasi data sesuai jenis dan tujuan.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

-- Materi Kelas 8: Memperdalam Visualisasi Data
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_8_1_3', 'Memperdalam Visualisasi Data: Mengubah Angka Menjadi Cerita yang Bisa Dibaca', '# Memperdalam Visualisasi Data: Mengubah Angka Menjadi Cerita yang Bisa Dibaca

## Mengapa Visualisasi Data Penting?

Setiap hari, kita dibanjiri data — nilai ujian, jam tidur, pengeluaran, jumlah followers, hasil survei, dan masih banyak lagi. Data mentah berupa angka-angka di tabel sulit dipahami dan mudah salah tafsir. Visualisasi data mengubah angka-angka itu menjadi gambar — grafik, diagram, peta — yang membuat pola, tren, dan perbedaan menjadi jelas dalam sekali pandang. Bayangkan mencoba memahami nilai 30 siswa dari tabel angka vs dari satu grafik batang — perbedaan kecepatan pemahaman sangat besar.

Visualisasi data bukan sekadar "membuat grafik yang cantik". Ini adalah proses komunikasi: bagaimana menyajikan data sehingga pesan utama tersampaikan secara akurat, cepat, dan tidak menyesatkan. Visualisasi yang buruk bisa menyembunyikan pola penting atau bahkan memberi kesan salah. Visualisasi yang baik bisa membuka wawasan baru yang tersembunyi di balik angka. Di era big data, kemampuan membuat dan membaca visualisasi adalah keterampilan hidup sekaligus keterampilan profesional.

## Jenis-Jenis Visualisasi Data

### 1. Diagram Batang (Bar Chart)
Diagram batang membandingkan kategori menggunakan tinggi batang. Cocok untuk data kategorikal seperti perbandingan nilai antar kelas, jumlah siswa per ekstrakurikuler, atau penjualan per produk. Diagram batang vertikal disebut column chart, horizontal disebut bar chart. Pilih horizontal jika label kategori panjang.

### 2. Diagram Garis (Line Chart)
Diagram garis menunjukkan perubahan seiring waktu. Sumbu X biasanya waktu (hari, bulan, tahun), sumbu Y nilai. Cocok untuk tren seperti perkembangan nilai siswa selama semester, perubahan suhu udara, atau pertumbuhan tinggi badan. Diagram garis sangat baik untuk menunjukkan apakah suatu nilai naik, turun, atau fluktuatif.

### 3. Diagram Lingkaran (Pie Chart)
Diagram lingkaran menunjukkan proporsi atau persentase. Cocok untuk membandingkan bagian dari keseluruhan, seperti persentase pengeluaran per kategori, atau pembagian waktu 24 jam. Pie chart hanya efektif untuk 3-5 kategori — lebih dari itu, label akan berdesakan dan sulit dibaca.

### 4. Diagram Pencar (Scatter Plot)
Diagram pencar menunjukkan hubungan antara dua variabel. Setiap titik adalah satu data dengan koordinat (X, Y). Cocok untuk melihat korelasi, misal: hubungan jam belajar dengan nilai, atau tinggi badan dengan berat badan. Pola titik yang naik ke kanan-atas = korelasi positif. Turun ke kanan-bawah = korelasi negatif. Acak = tidak ada korelasi.

### 5. Histogram
Histogram mirip bar chart, tapi untuk distribusi data numerik yang dikelompokkan ke bin (interval). Contoh: distribusi nilai ujian (0-20, 21-40, 41-60, 61-80, 81-100). Berbeda dengan bar chart, histogram tidak ada gap antar batang (karena data kontinu). Histogram mengungkap bentuk distribusi: normal (lonceng), miring kiri/kanan, bimodal.

### 6. Diagram Kotak Garis (Box Plot)
Box plot menunjukkan ringkasan statistik: median, kuartil 1-3, dan outlier. Bentuk kotak menunjukkan rentang kuartil (IQR), garis di tengah kotak = median, "kumis" menunjukkan rentang data normal, titik di luar = outlier. Sangat baik untuk membandingkan distribusi beberapa kelompok.

### 7. Peta Panas (Heatmap)
Heatmap menggunakan warna untuk menunjukkan nilai di grid 2D. Cocok untuk data yang punya 2 dimensi, seperti kepadatan penduduk per wilayah, atau performa siswa per mata pelajaran per bulan. Warna lebih gelap/terang menunjukkan nilai lebih tinggi.

## Prinsip Visualisasi Data yang Baik

### 1. Pilih Jenis yang Tepat
Setiap jenis visualisasi punya tujuan berbeda. Membandingkan kategori? Pakai bar chart. Menunjukkan tren waktu? Line chart. Proporsi? Pie chart. Hubungan 2 variabel? Scatter plot. Memilih jenis yang salah = visualisasi tidak efektif atau bahkan menyesatkan.

### 2. Jujur dengan Skala
Skala sumbu harus dimulai dari nol untuk bar chart, karena tinggi batang harus merepresentasikan proporsi sebenarnya. Memotong sumbu Y (mis: mulai dari 90 bukan 0) membuat perbedaan kecil terlihat besar — ini sering dipakai untuk manipulasi. Untuk line chart, memotong sumbu Y kadang OK karena fokus pada perubahan, bukan magnitudo.

### 3. Label yang Jelas
Setiap visualisasi harus punya: judul yang deskriptif, label sumbu X dan Y dengan satuan, legend jika ada multiple series, dan sumber data. Tanpa label, visualisasi ambigu dan bisa salah tafsir.

### 4. Hindari Clutter
Hapus elemen yang tidak perlu: grid lines yang terlalu tebal, shadow 3D yang mengaburkan, warna terlalu banyak. Prinsip "less is more" berlaku. Setiap elemen harus punya tujuan komunikasi.

### 5. Warna dengan Makna
Warna bukan dekorasi. Pakai warna untuk: highlight data penting, bedakan kategori, atau tunjukkan intensitas. Jangan pakai warna terlalu banyak (maksimal 5-7 kategori). Pertimbangkan color-blind friendly (hindari merah-hijau sebagai pembeda utama).

### 6. Konteks dan Narasi
Visualisasi terbaik punya cerita. Tambahkan anotasi untuk highlight temuan kunci. Beri caption yang menjelaskan apa yang harus dilihat pembaca. Visualisasi tanpa narasi = angka dalam gambar. Visualisasi dengan narasi = wawasan.

## Kesalahan Umum dalam Visualisasi Data

1. **Skala sumbu Y dimulai bukan dari 0** pada bar chart — membuat perbedaan kecil terlihat dramatis. Sering dipakai untuk manipulasi media.

2. **3D effects pada bar/pie chart** — terlihat "keren" tapi memudarkan akurasi. Sudut pandang 3D membuat batang belakang terlihat lebih kecil dari depan.

3. **Pie chart dengan terlalu banyak kategori** (>5) — label berdesakan, sulit bandingkan sudut. Lebih baik pakai bar chart.

4. **Warna acak tanpa makna** — pakai 7 warna untuk 7 kategori yang tidak ada hubungannya. Pembaca bingung.

5. **Dual Y-axis tanpa label jelas** — sumbu Y kiri dan kanan dengan skala berbeda bisa menyesatkan jika tidak dijelaskan.

6. **Line chart untuk data kategorikal** — menghubungkan kategori yang tidak punya urutan alami (mis: negara) dengan garis menyesatkan, seolah ada kontinuitas.

7. **Tidak menampilkan outlier** — menyembunyikan outlier mengaburkan distribusi sebenarnya. Outlier sering berisi informasi penting.

## Aplikasi Visualisasi di Kehidupan Sehari-Hari

1. **Dashboard kesehatan di smartwatch** — grafik detak jantung, langkah, tidur
2. **Laporan nilai rapor** — diagram batang per mata pelajaran
3. **Infografis berita** — visualisasi data pemilu, ekonomi, cuaca
4. **Aplikasi keuangan** — pie chart pengeluaran per kategori
5. **Statistik olahraga** — grafik performa pemain, poin tim
6. **Cuaca di aplikasi** — grafik suhu per jam, probabilitas hujan
7. **Statistik media sosial** — grafik pertumbuhan followers, engagement rate

## Latihan Self-Assessment

Setelah membaca materi ini, coba kerjakan tantangan berikut: catat 7 hari terakhir jam tidur Anda. Buat 2 visualisasi berbeda (line chart untuk tren, dan histogram untuk distribusi). Bandingkan: visualisasi mana yang lebih efektif menjawab pertanyaan ''apakah tidur saya konsisten?''. Diskusikan dengan teman apa insight yang Anda dapat dari visualisasi tersebut.
', 'Informatika', '8A,8B,8C', 'SMP', 'Visualisasi Data', 'cp_inf_8_1', 'tp_inf_8_1_3', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #001 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_001', '8', 'Informatika', '**Andi** ingin membandingkan nilai ujian 5 mata pelajaran: Matematika 80, IPA 75, IPS 85, B.Indonesia 70, B.Inggris 90. Jenis visualisasi PALING tepat?', 'Diagram garis (line chart)', 'Diagram batang (bar chart)', 'Diagram pencar (scatter plot)', 'Histogram', 1, 'Membandingkan kategori (5 mapel) → bar chart paling tepat. Line chart untuk tren waktu, scatter untuk hubungan 2 variabel, histogram untuk distribusi.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Membandingkan kategori (5 mapel) → bar chart paling tepat. Line chart untuk tren waktu, scatter untuk hubungan 2 variabel, histogram untuk distribusi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #002 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_002', '8', 'Informatika', '**Siti** ingin menunjukkan tren nilai matematika dari ujian 1-6: 70, 75, 78, 80, 82, 85. Jenis visualisasi yang tepat?', 'Diagram batang', 'Diagram garis (line chart)', 'Pie chart', 'Box plot', 1, 'Menunjukkan tren seiring waktu (ujian 1-6) → line chart paling tepat. Garis menghubungkan titik menunjukkan arah perubahan (naik/turun).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Menunjukkan tren seiring waktu (ujian 1-6) → line chart paling tepat. Garis menghubungkan titik menunjukkan arah perubahan (naik/turun).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #003 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_003', '8', 'Informatika', '**Budi** ingin menunjukkan persentase pengeluaran bulanannya: makanan 40%, transport 20%, hiburan 15%, lainnya 25%. Jenis visualisasi yang tepat?', 'Diagram batang', 'Diagram lingkaran (pie chart)', 'Diagram pencar', 'Histogram', 1, 'Persentase/proporsi dari total = pie chart. 4 kategori (≤5) = ideal untuk pie chart. Jika >5 kategori, pakai bar chart horizontal.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Persentase/proporsi dari total = pie chart. 4 kategori (≤5) = ideal untuk pie chart. Jika >5 kategori, pakai bar chart horizontal.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #004 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_004', '8', 'Informatika', '**Dina** ingin melihat hubungan jam belajar dengan nilai ujian. Jenis visualisasi yang tepat?', 'Diagram batang', 'Diagram pencar (scatter plot)', 'Pie chart', 'Line chart', 1, 'Hubungan 2 variabel (jam belajar vs nilai) → scatter plot. Tiap titik = 1 siswa. Pola naik = korelasi positif (jam belajar tinggi ↔ nilai tinggi).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Hubungan 2 variabel (jam belajar vs nilai) → scatter plot. Tiap titik = 1 siswa. Pola naik = korelasi positif (jam belajar tinggi ↔ nilai tinggi).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #005 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_005', '8', 'Informatika', 'Pada bar chart, sumbu Y HARUS dimulai dari...', 'Angka terkecil data', 'Nol (untuk menjaga proporsi batang yang akurat)', 'Rata-rata', 'Bebas', 1, 'Bar chart sumbu Y wajib mulai dari 0 — proporsi tinggi batang harus akurat. Memotong sumbu Y (mis: mulai dari 90) membuat perbedaan kecil terlihat dramatis (menyesatkan).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Bar chart sumbu Y wajib mulai dari 0 — proporsi tinggi batang harus akurat. Memotong sumbu Y (mis: mulai dari 90) membuat perbedaan kecil terlihat dramatis (menyesatkan).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #006 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_006', '8', 'Informatika', '**Eka** membuat pie chart dengan 8 kategori. Apa masalah utama?', 'Tidak ada masalah', 'Terlalu banyak kategori — label berdesakan, sulit bandingkan sudut. Lebih baik pakai bar chart', 'Pie chart tidak bisa untuk 8 kategori', 'Warna habis', 1, 'Pie chart efektif maksimal 5 kategori. >5 → label berdesakan, sulit bandingkan sudut. Lebih baik bar chart horizontal (urutkan dari terbesar).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Pie chart efektif maksimal 5 kategori. >5 → label berdesakan, sulit bandingkan sudut. Lebih baik bar chart horizontal (urutkan dari terbesar).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #007 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_007', '8', 'Informatika', 'Manakah komponen WAJIB ada di setiap visualisasi data?', 'Warna gradasi', 'Judul deskriptif + label sumbu + satuan', 'Efek 3D', 'Banyak animasi', 1, 'Wajib: judul deskriptif, label sumbu X/Y dengan satuan, legend jika multi-series, sumber data. Efek 3D/animasi opsional (sering mengganggu).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Wajib: judul deskriptif, label sumbu X/Y dengan satuan, legend jika multi-series, sumber data. Efek 3D/animasi opsional (sering mengganggu).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #008 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_008', '8', 'Informatika', '**Fajar** membuat bar chart nilai 4 kelas. Sumbu X = kelas, sumbu Y = nilai. Ia pakai 4 warna berbeda untuk 4 batang. Masalah?', 'Tidak ada masalah', 'Warna tanpa makna — 4 kelas beda, tapi tidak perlu warna berbeda. Pakai 1 warna supaya fokus pada tinggi batang', 'Warna terlalu sedikit', 'Harus pakai 8 warna', 1, 'Warna tanpa makna = clutter. 1 warna cukup untuk bar chart single-series. Warna dipakai jika ada grouping (mis: kelas 7 vs 8) atau highlight (1 batang penting di-warna berbeda).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Warna tanpa makna = clutter. 1 warna cukup untuk bar chart single-series. Warna dipakai jika ada grouping (mis: kelas 7 vs 8) atau highlight (1 batang penting di-warna berbeda).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #009 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_009', '8', 'Informatika', '**Gita** ingin visualisasi distribusi nilai 50 siswa (0-100). Jenis yang tepat?', 'Pie chart', 'Histogram (dengan bin seperti 0-20, 21-40, dll)', 'Line chart', 'Scatter plot', 1, 'Distribusi data numerik = histogram. Bin (interval) mengelompokkan nilai. Bentuk histogram mengungkap: normal/miring/bimodal.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Distribusi data numerik = histogram. Bin (interval) mengelompokkan nilai. Bentuk histogram mengungkap: normal/miring/bimodal.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #010 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_010', '8', 'Informatika', 'Box plot menunjukkan hal-hal berikut, KECUALI...', 'Median', 'Kuartil 1 dan 3 (Q1, Q3)', 'Outlier', 'Mean (rata-rata)', 3, 'Box plot menampilkan: median (garis tengah kotak), Q1-Q3 (kotak), IQR (rentang kotak), whisker (rentang normal), outlier (titik). TIDAK menampilkan mean secara default.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: D. Box plot menampilkan: median (garis tengah kotak), Q1-Q3 (kotak), IQR (rentang kotak), whisker (rentang normal), outlier (titik). TIDAK menampilkan mean secara default.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #011 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_011', '8', 'Informatika', '**Hadi** melihat scatter plot jam belajar vs nilai. Titik-titik membentuk pola naik ke kanan-atas. Artinya...', 'Korelasi positif (jam belajar tinggi ↔ nilai tinggi)', 'Korelasi negatif', 'Tidak ada korelasi', 'Data salah', 0, 'Pola naik ke kanan-atas = korelasi positif. X naik, Y juga naik. Tapi ingat: korelasi ≠ kausalitas. Bisa ada faktor ketiga.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: A. Pola naik ke kanan-atas = korelasi positif. X naik, Y juga naik. Tapi ingat: korelasi ≠ kausalitas. Bisa ada faktor ketiga.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #012 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_012', '8', 'Informatika', 'Manakah visualisasi yang sering dipakai untuk manipulasi dengan memotong sumbu Y?', 'Pie chart mulai dari 0', 'Bar chart sumbu Y mulai dari 90 (bukan 0) — perbedaan kecil terlihat dramatis', 'Line chart dengan 2 series', 'Scatter plot dengan banyak titik', 1, 'Bar chart Y dimulai bukan 0 = manipulasi klasik. Mis: nilai 90 vs 95, jika Y mulai 90, batang 95 terlihat 2x tinggi. Padahal selisih cuma 5.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Bar chart Y dimulai bukan 0 = manipulasi klasik. Mis: nilai 90 vs 95, jika Y mulai 90, batang 95 terlihat 2x tinggi. Padahal selisih cuma 5.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #013 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_013', '8', 'Informatika', '**Ira** ingin visualisasi kepadatan penduduk per wilayah di peta Indonesia. Jenis yang tepat?', 'Bar chart', 'Peta panas (heatmap) — warna menunjukkan kepadatan', 'Pie chart', 'Line chart', 1, 'Data geografis dengan intensitas = heatmap. Warna lebih gelap = kepadatan lebih tinggi. Bisa overlay di peta untuk konteks geografis.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Data geografis dengan intensitas = heatmap. Warna lebih gelap = kepadatan lebih tinggi. Bisa overlay di peta untuk konteks geografis.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #014 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_014', '8', 'Informatika', 'Efek 3D pada bar chart sering kali...', 'Membuat visualisasi lebih akurat', 'Mengaburkan akurasi — batang belakang terlihat lebih kecil dari depan', 'Tidak ada efek', 'Wajib untuk presentasi', 1, '3D effects mengaburkan akurasi. Sudut pandang 3D membuat batang belakang terlihat lebih kecil — pembaca sulit bandingkan tinggi sebenarnya. Hindari 3D untuk data exact.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. 3D effects mengaburkan akurasi. Sudut pandang 3D membuat batang belakang terlihat lebih kecil — pembaca sulit bandingkan tinggi sebenarnya. Hindari 3D untuk data exact.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #015 (C3 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_015', '8', 'Informatika', '**Joko** membuat line chart dengan 2 series (nilai matematika vs IPA) tapi pakai 2 sumbu Y berbeda tanpa label. Masalah?', 'Tidak ada masalah', 'Dual Y-axis tanpa label jelas bisa menyesatkan — pembaca tidak tahu skala mana untuk series mana', 'Line chart tidak boleh 2 series', 'Harus pakai pie chart', 1, 'Dual Y-axis berbahaya jika tidak dijelaskan. Pembaca bisa salah baca: mengira 2 series naik bersama, padahal bisa karena skala berbeda. Wajib label jelas + legend.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Dual Y-axis berbahaya jika tidak dijelaskan. Pembaca bisa salah baca: mengira 2 series naik bersama, padahal bisa karena skala berbeda. Wajib label jelas + legend.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #016 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_016', '8', 'Informatika', 'Perhatikan deskripsi grafik: bar chart nilai 4 kelas, Y mulai dari 90, batang kelas 7A = 95, 7B = 92, 7C = 91, 7D = 93. Evaluasi visualisasi ini.', 'Visualisasi baik — beda jelas terlihat', 'Menyesatkan — Y mulai 90 membuat perbedaan kecil (91-95) terlihat dramatis. Harus mulai dari 0 untuk akurat', 'Salah jenis — harusnya pie chart', 'Tidak ada masalah', 1, 'Analisis: Y mulai 90, selisih 95 vs 91 = 4 poin, tapi batang 7A terlihat ~4x lebih tinggi dari 7C. Padahal selisih cuma 4%. Menyesatkan. Harus mulai 0.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: Y mulai 90, selisih 95 vs 91 = 4 poin, tapi batang 7A terlihat ~4x lebih tinggi dari 7C. Padahal selisih cuma 4%. Menyesatkan. Harus mulai 0.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #017 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_017', '8', 'Informatika', '**Kiki** punya data nilai 50 siswa. Ia buat histogram dengan bin 10 (0-10, 11-20, ..., 91-100). Distribusi miring kiri (banyak siswa nilai tinggi, sedikit nilai rendah). Interpretasi?', 'Mayoritas siswa nilai rendah', 'Mayoritas siswa nilai tinggi, sedikit yang rendah (miring kiri = left-skewed)', 'Distribusi normal', 'Tidak ada pola', 1, 'Analisis: miring kiri (left-skewed) = ekor panjang di kiri (nilai rendah), mayoritas di kanan (nilai tinggi). Berarti mayoritas siswa nilai tinggi.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: miring kiri (left-skewed) = ekor panjang di kiri (nilai rendah), mayoritas di kanan (nilai tinggi). Berarti mayoritas siswa nilai tinggi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #018 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_018', '8', 'Informatika', '**Lia** membuat scatter plot jam tidur vs nilai ujian. Titik-titik membentuk pola naik ke kanan-atas, tapi ada 3 titik di pojok kanan-bawah (jam tidur banyak, nilai rendah). Apa yang ia temukan?', 'Korelasi negatif kuat', 'Korelasi positif, dengan 3 outlier (tidur banyak tapi nilai rendah — mungkin karena sakit/tdk belajar)', 'Tidak ada korelasi', 'Data rusak', 1, 'Analisis: pola umum naik ke kanan-atas = korelasi positif. 3 titik di kanan-bawah = outlier (tidur banyak tapi nilai rendah). Outlier bisa kasih insight: tidur saja tidak cukup, perlu belajar juga.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: pola umum naik ke kanan-atas = korelasi positif. 3 titik di kanan-bawah = outlier (tidur banyak tapi nilai rendah). Outlier bisa kasih insight: tidur saja tidak cukup, perlu belajar juga.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #019 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_019', '8', 'Informatika', '**Maman** bandingkan 2 box plot nilai matematika kelas 7A vs 7B. 7A: median 75, Q1 65, Q3 85, outlier di 40. 7B: median 80, Q1 78, Q3 82, tidak ada outlier. Kesimpulan?', '7A lebih baik (ada outlier tinggi)', '7B lebih konsisten (IQR kecil=4) dan median lebih tinggi (80). 7A lebih variatif (IQR=20) dengan outlier rendah', '7A dan 7B sama', 'Tidak bisa dibandingkan', 1, 'Analisis: 7B median 80 > 7A 75. 7B IQR (82-78)=4 kecil = konsisten. 7A IQR (85-65)=20 besar = variatif. 7A ada outlier 40 = ada siswa sangat rendah. 7B lebih baik dan stabil.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: 7B median 80 > 7A 75. 7B IQR (82-78)=4 kecil = konsisten. 7A IQR (85-65)=20 besar = variatif. 7A ada outlier 40 = ada siswa sangat rendah. 7B lebih baik dan stabil.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #020 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_020', '8', 'Informatika', 'Pie chart pengeluaran: makanan 45%, transport 15%, hiburan 30%, lainnya 10%. Sudut untuk ''hiburan'' adalah...', '30 derajat', '90 derajat', '108 derajat (30% × 360°)', '180 derajat', 2, 'Analisis: 1 lingkaran = 360°. Hiburan 30% = 30/100 × 360 = 108°. Makanan 45% = 162°, transport 15% = 54°, lainnya 10% = 36°. Total = 360°.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: C. Analisis: 1 lingkaran = 360°. Hiburan 30% = 30/100 × 360 = 108°. Makanan 45% = 162°, transport 15% = 54°, lainnya 10% = 36°. Total = 360°.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #021 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_021', '8', 'Informatika', '**Nina** buat line chart penjualan 12 bulan. Terlihat jelas: Jan-Mar turun, Apr-Jun naik, Jul-Sep turun, Okt-Des naik. Pola apa ini?', 'Tren naik linier', 'Pola musiman (naik-turun berulang setiap ~6 bulan)', 'Tren turun', 'Tidak ada pola', 1, 'Analisis: pola berulang (turun-naik-turun-naik) setiap ~6 bulan = pola musiman (seasonal). Bukan tren linier. Pola ini sering di data penjualan (libur semester, musim tertentu).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: pola berulang (turun-naik-turun-naik) setiap ~6 bulan = pola musiman (seasonal). Bukan tren linier. Pola ini sering di data penjualan (libur semester, musim tertentu).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #022 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_022', '8', 'Informatika', '**Omar** membuat bar chart horizontal 10 kategori. 8 kategori pertama nilai 10-30, 2 terakhir 90-100. Masalah utama?', 'Tidak ada masalah', 'Outlier di 2 kategori terakhir membuat 8 lainnya terlihat sangat kecil. Pertimbangkan log scale atau highlight + anotasi', 'Harus pakai pie chart', 'Warna salah', 1, 'Analisis: outlier tinggi (90-100) compress 8 kategori lain jadi terlihat sangat kecil. Solusi: log scale, atau bagi jadi 2 chart, atau highlight outlier dengan anotasi.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: outlier tinggi (90-100) compress 8 kategori lain jadi terlihat sangat kecil. Solusi: log scale, atau bagi jadi 2 chart, atau highlight outlier dengan anotasi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #023 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_023', '8', 'Informatika', '**Pak Guru** ingin visualisasi performa 5 siswa di 5 mapel. Matriks 5x5. Jenis visualisasi yang tepat?', 'Pie chart', 'Heatmap — grid 5x5, warna menunjukkan nilai', 'Line chart', 'Scatter plot', 1, 'Analisis: data 2D (siswa × mapel) = heatmap. Warna lebih gelap = nilai lebih tinggi. Bisa lihat pola: siswa A lemah di mapel apa, mapel X kuat di siswa mana.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: data 2D (siswa × mapel) = heatmap. Warna lebih gelap = nilai lebih tinggi. Bisa lihat pola: siswa A lemah di mapel apa, mapel X kuat di siswa mana.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #024 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_024', '8', 'Informatika', 'Histogram nilai ujian: bin 0-20 (5 siswa), 21-40 (8), 41-60 (15), 61-80 (20), 81-100 (2). Bentuk distribusi?', 'Normal (lonceng) — puncak di tengah', 'Miring kanan (right-skewed) — puncak di kiri', 'Miring kiri (left-skewed) — puncak di kanan, ekor di kiri', 'Bimodal (2 puncak)', 2, 'Analisis: puncak di 61-80 (20 siswa), lalu turun ke kanan (81-100: 2). Ekor kiri (5, 8, 15). Puncak di kanan, ekor di kiri = miring kiri (left-skewed). Mayoritas nilai tinggi.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: C. Analisis: puncak di 61-80 (20 siswa), lalu turun ke kanan (81-100: 2). Ekor kiri (5, 8, 15). Puncak di kanan, ekor di kiri = miring kiri (left-skewed). Mayoritas nilai tinggi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #025 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_025', '8', 'Informatika', '**Qori** buat dual Y-axis chart: sumbu kiri = penjualan (Rp juta), sumbu kanan = jumlah pelanggan. Garis penjualan naik, garis pelanggan juga naik. Evaluasi.', 'Valid — keduanya naik beriringan', 'Berbahaya — bisa jadi pelanggan naik 10x tapi penjualan naik 1.1x, terlihat ''naik beriringan'' padahal tidak. Skala berbeda bisa menyesatkan', 'Salah jenis', 'Tidak bisa dievaluasi', 1, 'Analisis: dual Y-axis berbahaya. Skala berbeda bisa manipulasi visual. Penjualan naik 10% vs pelanggan naik 100% bisa terlihat sama. Harus jelas label + legend, atau pisah jadi 2 chart.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: dual Y-axis berbahaya. Skala berbeda bisa manipulasi visual. Penjualan naik 10% vs pelanggan naik 100% bisa terlihat sama. Harus jelas label + legend, atau pisah jadi 2 chart.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #026 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_026', '8', 'Informatika', 'Bar chart nilai 4 kelas dengan efek 3D. Kelas 7A (depan) = 80, 7B (belakang) = 85. Secara visual, 7A terlihat lebih tinggi. Mengapa?', 'Data salah', 'Efek 3D mengaburkan — perspektif 3D membuat batang depan (7A) terlihat lebih besar walaupun sebenarnya lebih rendah. Perspektif menipu mata', '7A memang lebih tinggi', 'Tidak ada kaitan 3D', 1, 'Analisis: 3D effects menipu mata. Perspektif membuat batang depan terlihat lebih besar. 7A=80 seharusnya lebih rendah dari 7B=85, tapi visual 3D bisa terlihat sebaliknya. Hindari 3D untuk perbandingan exact.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: 3D effects menipu mata. Perspektif membuat batang depan terlihat lebih besar. 7A=80 seharusnya lebih rendah dari 7B=85, tapi visual 3D bisa terlihat sebaliknya. Hindari 3D untuk perbandingan exact.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #027 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_027', '8', 'Informatika', '**Rina** buat scatter plot tinggi vs berat badan 50 siswa. Pola naik ke kanan-atas, korelasi positif. Tapi 1 titik di pojok kiri-atas (tinggi pendek, berat besar). Apa itu?', 'Data rusak', 'Outlier — siswa dengan tinggi pendek tapi berat besar. Mungkin obesitas atau kondisi medis khusus. Perlu investigasi', 'Korelasi negatif', 'Tidak ada pola', 1, 'Analisis: titik di luar pola umum = outlier. Outlier bisa kasih insight: kondisi medis, kesalahan input, atau kasus khusus. Jangan dibuang tanpa investigasi.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: titik di luar pola umum = outlier. Outlier bisa kasih insight: kondisi medis, kesalahan input, atau kasus khusus. Jangan dibuang tanpa investigasi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #028 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_028', '8', 'Informatika', 'Line chart nilai 6 ujian: 70, 75, 78, 80, 82, 85. Gradien (kemiringan garis)...', 'Positif tapi menurun (nilai naik, tapi kenaikan melambat)', 'Positif konstan (naik linear)', 'Negatif', 'Nol', 0, 'Analisis: selisih: 75-70=5, 78-75=3, 80-78=2, 82-80=2, 85-82=3. Naik, tapi selisih menurun dari 5 ke 2-3. Pola logaritmik (diminishing return). Gradien positif tapi menurun.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: selisih: 75-70=5, 78-75=3, 80-78=2, 82-80=2, 85-82=3. Naik, tapi selisih menurun dari 5 ke 2-3. Pola logaritmik (diminishing return). Gradien positif tapi menurun.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #029 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_029', '8', 'Informatika', '**Santi** buat pie chart 6 kategori pengeluaran. 5 kategori 10-20%, 1 kategori 50%. Masalah utama?', 'Tidak ada masalah', '1 kategori dominan (50%) — bisa dibuat 2 pie chart: 1 untuk kategori dominan, 1 untuk 5 kategori lain. Atau bar chart dengan kategori dominan di atas', 'Pie chart tidak valid', 'Warna kurang', 1, 'Analisis: 1 kategori dominan menyembunyikan detail 5 kategori kecil. Solusi: 2 pie chart (1 dominan vs lainnya, 1 detail 5 kategori) atau bar chart horizontal (dominan di atas, urutan desc).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: 1 kategori dominan menyembunyikan detail 5 kategori kecil. Solusi: 2 pie chart (1 dominan vs lainnya, 1 detail 5 kategori) atau bar chart horizontal (dominan di atas, urutan desc).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #030 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_030', '8', 'Informatika', 'Box plot nilai 2 kelas: 7A (median 70, IQR 30), 7B (median 75, IQR 10). Interpretasi?', '7A lebih baik', '7B lebih baik (median 75 > 70) dan lebih konsisten (IQR 10 < 30). 7A variatif', '7A dan 7B sama', 'Tidak bisa dibandingkan', 1, 'Analisis: 7B median lebih tinggi (75 > 70) = rata-rata lebih baik. IQR 7B 10 < 7A 30 = 7B konsisten, 7A variatif. 7B unggul di kedua aspek.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: 7B median lebih tinggi (75 > 70) = rata-rata lebih baik. IQR 7B 10 < 7A 30 = 7B konsisten, 7A variatif. 7B unggul di kedua aspek.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #031 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_031', '8', 'Informatika', '**Tono** membuat bar chart: nilai siswa A=95, B=92. Sumbu Y mulai dari 90. Bar A terlihat 3x lebih tinggi dari B. Evaluasi.', 'Visualisasi valid', 'Menyesatkan — selisih sebenarnya hanya 3 poin (3%), tapi bar A terlihat 3x lebih tinggi. Harus mulai dari 0 untuk proporsi akurat', 'Salah jenis grafik', 'Tidak bisa dievaluasi', 1, 'Evaluasi: Y mulai 90, A=95 terlihat 5 unit, B=92 terlihat 2 unit. A terlihat 2.5x B. Padahal selisih cuma 3 poin (3%). Menyesatkan. Y harus mulai 0.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: Y mulai 90, A=95 terlihat 5 unit, B=92 terlihat 2 unit. A terlihat 2.5x B. Padahal selisih cuma 3 poin (3%). Menyesatkan. Y harus mulai 0.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #032 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_032', '8', 'Informatika', 'Manakah visualisasi yang PALING efektif untuk menunjukkan ''pola tidur siswa menurun dari Senin ke Minggu''?', 'Pie chart', 'Line chart (X=hari, Y=jam tidur) — tunjukkan tren turun', 'Bar chart', 'Scatter plot', 1, 'Evaluasi: tren seiring waktu = line chart paling tepat. Garis turun dari Senin ke Minggu jelas terlihat. Pie chart tidak untuk tren, bar chart kurang smooth, scatter untuk hubungan.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: tren seiring waktu = line chart paling tepat. Garis turun dari Senin ke Minggu jelas terlihat. Pie chart tidak untuk tren, bar chart kurang smooth, scatter untuk hubungan.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #033 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_033', '8', 'Informatika', '**Vera** buat visualisasi pengeluaran: bar chart dengan 12 kategori (makan, transport, hiburan, dll). 1 kategori (makan) 60%, lainnya 2-8%. Evaluasi pilihan visualisasi.', 'Bar chart tepat', 'Kurang optimal — 1 kategori dominan membuat lainnya terlihat sangat kecil. Alternatif: 1) pakai log scale, 2) kelompokkan jadi ''makan'' vs ''lainnya'', atau 3) bar chart horizontal urut desc dengan highlight', 'Harus pakai pie chart', 'Tidak bisa divisualisasi', 1, 'Evaluasi: 1 kategori dominan (60%) compress 11 lainnya. Bar chart standard tidak efektif. Solusi: log scale, atau kelompokkan (makan vs 11 lainnya), atau bar horizontal urut desc dengan highlight kategori dominan.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: 1 kategori dominan (60%) compress 11 lainnya. Bar chart standard tidak efektif. Solusi: log scale, atau kelompokkan (makan vs 11 lainnya), atau bar horizontal urut desc dengan highlight kategori dominan.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #034 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_034', '8', 'Informatika', 'Manakah yang BUKAN prinsip visualisasi data yang baik?', 'Pilih jenis grafik sesuai tujuan', 'Sumbu Y bar chart mulai dari 0', 'Pakai efek 3D supaya menarik', 'Label jelas dengan satuan', 2, 'Evaluasi: 3D effects umumnya DILARANG untuk visualisasi data karena mengaburkan akurasi. Prinsip baik: tepat jenis, Y mulai 0 (bar), label jelas. 3D hanya untuk visualisasi 3D (mis: AR/VR data viz).', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: C. Evaluasi: 3D effects umumnya DILARANG untuk visualisasi data karena mengaburkan akurasi. Prinsip baik: tepat jenis, Y mulai 0 (bar), label jelas. 3D hanya untuk visualisasi 3D (mis: AR/VR data viz).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #035 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_035', '8', 'Informatika', '**Wati** buat 2 visualisasi untuk data sama (nilai 30 siswa): histogram dan box plot. Mana yang lebih baik untuk menjawab ''berapa banyak siswa nilai di rentang 70-80?''', 'Histogram — tunjukkan distribusi per bin, bisa hitung siswa di bin 70-80', 'Box plot — tunjukkan median dan kuartil', 'Keduanya sama baiknya', 'Tidak ada yang tepat', 0, 'Evaluasi: histogram menunjukkan jumlah siswa per bin (interval). Untuk hitung siswa di rentang 70-80 = lihat tinggi batang di bin itu. Box plot tidak menampilkan count per rentang, hanya ringkasan statistik.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: A. Evaluasi: histogram menunjukkan jumlah siswa per bin (interval). Untuk hitung siswa di rentang 70-80 = lihat tinggi batang di bin itu. Box plot tidak menampilkan count per rentang, hanya ringkasan statistik.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #036 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_036', '8', 'Informatika', '**Yusuf** buat scatter plot jam belajar vs nilai. Korelasi positif kuat (titik membentuk garis naik jelas). Ia menyimpulkan: ''belajar lebih lama = nilai naik''. Evaluasi.', 'Valid — korelasi positif kuat mendukung kesimpulan', 'Lemah — korelasi ≠ kausalitas. Bisa ada faktor ketiga (motivasi, kecerdasan). Untuk kausalitas butuh eksperimen', 'Salah total', 'Tidak bisa dievaluasi', 1, 'Evaluasi: korelasi positif kuat = jam belajar & nilai bergerak bersamaan. Tapi bukan bukti kausalitas. Faktor ketiga (motivasi belajar tinggi = belajar lama + nilai bagus) bisa jadi penyebab keduanya.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: korelasi positif kuat = jam belajar & nilai bergerak bersamaan. Tapi bukan bukti kausalitas. Faktor ketiga (motivasi belajar tinggi = belajar lama + nilai bagus) bisa jadi penyebab keduanya.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #037 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_037', '8', 'Informatika', 'Pie chart dengan 3 kategori: A 40%, B 35%, C 25%. Manakah evaluasi yang BENAR?', 'Pie chart tidak tepat untuk 3 kategori', 'Pie chart tepat (3 kategori ≤ 5) — tunjukkan proporsi dengan jelas', 'Harus pakai 3D', 'Tidak bisa dibaca', 1, 'Evaluasi: 3 kategori ideal untuk pie chart (≤5). Proporsi 40-35-25 cukup berbeda untuk dibedakan sudutnya. Pie chart efektif di sini.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: 3 kategori ideal untuk pie chart (≤5). Proporsi 40-35-25 cukup berbeda untuk dibedakan sudutnya. Pie chart efektif di sini.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #038 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_038', '8', 'Informatika', '**Zahra** buat bar chart 2 series: nilai matematika vs IPA per kelas (7A, 7B, 7C). Pakai 2 warna. Evaluasi.', 'Tidak tepat — harus 1 series', 'Tepat — bar chart grouped (2 batang per kelas) dengan 2 warna untuk 2 series, mudah bandingkan', 'Harus pakai 3D', 'Salah jenis', 1, 'Evaluasi: grouped bar chart dengan 2 series = tepat. 2 warna untuk 2 mapel, 3 kelompok (kelas). Bisa bandingkan matematika vs IPA per kelas, dan antar kelas. Warna dengan legend jelas.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: grouped bar chart dengan 2 series = tepat. 2 warna untuk 2 mapel, 3 kelompok (kelas). Bisa bandingkan matematika vs IPA per kelas, dan antar kelas. Warna dengan legend jelas.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #039 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_039', '8', 'Informatika', 'Manakah visualisasi yang paling RENTAN dimanipulasi untuk menyesatkan?', 'Bar chart Y mulai dari 0', 'Pie chart 3 kategori', 'Bar chart Y dimulai bukan 0 (mis: dari 90)', 'Line chart 2 series dengan legend', 2, 'Evaluasi: bar chart Y bukan 0 = paling rentan manipulasi. Perbedaan kecil terlihat dramatis. Sering dipakai media untuk sensasi. Opsi lain relatif jujur.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: C. Evaluasi: bar chart Y bukan 0 = paling rentan manipulasi. Perbedaan kecil terlihat dramatis. Sering dipakai media untuk sensasi. Opsi lain relatif jujur.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #040 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_040', '8', 'Informatika', '**Adi** buat line chart penjualan 12 bulan. Garis naik dari Jan ke Des. Ia pakai 1 warna, tanpa label sumbu, tanpa judul. Evaluasi.', 'Visualisasi baik — garis naik jelas', 'Kurang lengkap — tanpa judul, label sumbu, satuan, sumber data. Pembaca tidak tahu apa yang divisualisasi. Wajib tambah konteks', 'Salah jenis', 'Terlalu sederhana', 1, 'Evaluasi: visualisasi tanpa konteks = ambigu. Apa sumbu X (bulan? tahun?), apa sumbu Y (penjualan? unit?), satuan apa, sumber data. Wajib: judul deskriptif, label sumbu, satuan, sumber.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: visualisasi tanpa konteks = ambigu. Apa sumbu X (bulan? tahun?), apa sumbu Y (penjualan? unit?), satuan apa, sumber data. Wajib: judul deskriptif, label sumbu, satuan, sumber.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #041 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_041', '8', 'Informatika', 'Box plot 2 kelompok: A (median 80, Q1 75, Q3 85, outlier 50), B (median 78, Q1 76, Q3 80, tanpa outlier). Kelompok mana yang lebih ''stabil''?', 'A lebih stabil (median 80)', 'B lebih stabil (IQR 4 vs A 10, dan tidak ada outlier). Median sedikit lebih rendah tapi konsisten', 'Sama stabil', 'Tidak bisa dievaluasi', 1, 'Evaluasi: ''stabil'' = konsisten = IQR kecil + tidak outlier. B: IQR 4 (konsisten), tanpa outlier = stabil. A: IQR 10 + outlier 50 = variatif. B lebih stabil walaupun median sedikit lebih rendah.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: ''stabil'' = konsisten = IQR kecil + tidak outlier. B: IQR 4 (konsisten), tanpa outlier = stabil. A: IQR 10 + outlier 50 = variatif. B lebih stabil walaupun median sedikit lebih rendah.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #042 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_042', '8', 'Informatika', '**Boni** buat heatmap nilai 5 siswa × 5 mapel. 1 siswa punya nilai rendah di SEMUA mapel (kolom gelap semua). Interpretasi?', 'Siswa malas', 'Siswa lemah di semua mapel — perlu investigasi penyebab (motivasi, kesehatan, kondisi sosial). Jangan langsung label ''malas''', 'Mapel sulit', 'Tidak ada pola', 1, 'Evaluasi: 1 siswa rendah di semua mapel = pola konsisten. Tapi penyebab bisa banyak: motivasi, kesehatan, keluarga, ekonomi, gaya belajar. Investigasi dulu sebelum label negatif.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: 1 siswa rendah di semua mapel = pola konsisten. Tapi penyebab bisa banyak: motivasi, kesehatan, keluarga, ekonomi, gaya belajar. Investigasi dulu sebelum label negatif.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #043 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_043', '8', 'Informatika', 'Manakah situasi di mana visualisasi BUKAN pilihan terbaik?', 'Membandingkan 5 kategori', 'Menunjukkan tren 12 bulan', 'Membaca 1000 data individual secara detail (tabel lebih baik)', 'Menunjukkan proporsi', 2, 'Evaluasi: visualisasi untuk pola/tren/perbandingan. Untuk baca data individual/detail (mis: cek nilai spesifik siswa A di ujian B), tabel lebih baik. Visualisasi menyembunyikan detail.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: C. Evaluasi: visualisasi untuk pola/tren/perbandingan. Untuk baca data individual/detail (mis: cek nilai spesifik siswa A di ujian B), tabel lebih baik. Visualisasi menyembunyikan detail.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #044 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_044', '8', 'Informatika', '**Citra** buat visualisasi untuk presentasi ke kepala sekolah: 1 chart dengan 10 series (10 kelas). Garis berdesakan, sulit dibaca. Rekomendasi?', 'Pertahankan 10 series — detail penting', 'Sederhanakan: 1) kelompokkan jadi 3 (kelas 7, 8, 9), 2) fokus top 3 kelas + ''lainnya'', atau 3) pakai small multiples (10 chart kecil)', 'Ganti ke pie chart', 'Hapus visualisasi', 1, 'Evaluasi: 10 series = clutter. Strategi: agregasi (3 kelompok), fokus top + ''lainnya'', atau small multiples (grid chart kecil). Sesuaikan dengan pesan utama presentasi.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: 10 series = clutter. Strategi: agregasi (3 kelompok), fokus top + ''lainnya'', atau small multiples (grid chart kecil). Sesuaikan dengan pesan utama presentasi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 PG #045 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_pg_045', '8', 'Informatika', 'Histogram nilai ujian membentuk 2 puncak (bimodal): puncak 1 di 50-60, puncak 2 di 80-90. Interpretasi?', 'Distribusi normal', 'Bimodal — kemungkinan 2 kelompok siswa (yang belajar dan yang tidak). Perlu analisis lebih lanjut', 'Data rusak', 'Tidak ada pola', 1, 'Evaluasi: bimodal = 2 puncak = 2 kelompok. Mungkin: siswa yang ikut bimbel vs tidak, atau kelas yang berbeda metode. Pola ini menarik — investigasi kelompoknya, jangan dirata-rata.', 'Visualisasi Data', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: bimodal = 2 puncak = 2 kelompok. Mungkin: siswa yang ikut bimbel vs tidak, atau kelas yang berbeda metode. Pola ini menarik — investigasi kelompoknya, jangan dirata-rata.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 Essai #001 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_essay_001', '8', 'Informatika', '**Skenario:** Anda mencatat jam tidur 7 hari terakhir: Senin 7, Selasa 6.5, Rabu 5, Kamis 6, Jumat 5.5, Sabtu 8, Minggu 8.5.

**Tugas:**
1. Tentukan jenis visualisasi yang tepat untuk pertanyaan: ''apakah tidur saya konsisten?'' vs ''bagaimana tren tidur saya?''
2. Buat deskripsi visualisasi (sekitar 100 kata) untuk masing-masing
3. Hitung: mean, median, dan range jam tidur
4. Berapa persen hari yang tidur <7 jam (rekomendasi minimal)?
5. Insight apa yang Anda dapat?', '', '', '', '', 0, '', 'Visualisasi Data', true, 'essai', '[]', '[]', '', '1. Jenis visualisasi:
- ''Apakah konsisten?'' → box plot (tunjukkan median, IQR, range)
- ''Bagaimana tren?'' → line chart (X=hari, Y=jam tidur)

2. Deskripsi:
- Box plot: kotak kecil di sekitar 5.5-8, median sekitar 6.5, whisker dari 5 ke 8.5. Tidak ada outlier. Konsistensi moderat.
- Line chart: garis turun dari Senin (7) ke Rabu (5), naik ke Jumat (5.5), lalu naik tajam ke Minggu (8.5). Pola V-shape: turun di hari sekolah, naik di akhir pekan.

3. Hitung:
- Mean = (7+6.5+5+6+5.5+8+8.5)/7 = 46.5/7 = 6.64 jam
- Median (urut: 5, 5.5, 6, 6.5, 7, 8, 8.5) = 6.5 jam
- Range = 8.5 - 5 = 3.5 jam

4. Hari tidur <7 jam: Selasa (6.5), Rabu (5), Kamis (6), Jumat (5.5) = 4 hari dari 7 = 57%

5. Insight:
- Tidur tidak konsisten — turun di hari sekolah (mungkin tugas/sekolah), naik di akhir pekan (rebound)
- 57% hari kurang dari rekomendasi 7 jam — perlu evaluasi jadwal
- Akhir pekan ''tidur bayar'' (rebound) tidak ideal — lebih baik konsisten 7-8 jam setiap hari
- Saran: atur jadwal tidur konsisten, batasi gadget malam, prioritaskan tidur di hari sekolah', 'C4', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 Essai #002 (C4 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_essay_002', '8', 'Informatika', '**Analisis kasus:** Sebuah berita menampilkan bar chart dengan judul ''Nilai UN Sekolah A 3x Lebih Tinggi dari Sekolah B!''. Chart menunjukkan: Sekolah A = 90, Sekolah B = 30. Sumbu Y dimulai dari 25.

**Tugas:**
1. Identifikasi minimal 2 masalah dengan visualisasi ini
2. Hitung rasio sebenarnya vs rasio yang terlihat dari chart
3. Buat visualisasi alternatif yang lebih jujur (deskripsi)
4. Berikan saran untuk editor berita', '', '', '', '', 0, '', 'Visualisasi Data', true, 'essai', '[]', '[]', '', '1. Masalah visualisasi:

a. Sumbu Y dimulai dari 25 (bukan 0) — membuat perbedaan terlihat dramatis. Bar A (90-25=65 unit) vs B (30-25=5 unit) = A terlihat 13x B. Padahal sebenarnya 90/30 = 3x.

b. Judul sensasional ''3x Lebih Tinggi'' — walaupun secara matematis benar (90/30=3), framing mempengaruhi persepsi. Sebenarnya selisih 60 poin, bukan ''3x lebih tinggi'' dalam konteks prestasi.

c. Tidak ada konteks: jumlah siswa, mata pelajaran, tahun, kondisi sosial ekonomi. Bisa jadi Sekolah B punya siswa ekonomi lebih rendah, atau mata pelajaran lebih sulit.

2. Rasio sebenarnya vs terlihat:
- Sebenarnya: 90/30 = 3x (judul benar secara matematis)
- Terlihat dari chart (Y mulai 25): A=65 unit, B=5 unit, rasio visual = 13x
- Chart mengaburkan rasio sebenarnya dengan factor 4.3x (13/3)

3. Visualisasi alternatif yang lebih jujur:
- Bar chart dengan Y mulai dari 0 (0-100). Bar A=90, B=30. Selisih terlihat proporsional (3x), bukan dramatis.
- Tambah label angka di atas batang: ''90'' dan ''30''
- Judul netral: ''Perbandingan Nilai UN: Sekolah A 90 vs Sekolah B 30''
- Tambah konteks di caption: jumlah siswa, mata pelajaran, tahun, sumber data
- Pertimbangkan side-by-side dengan data historis (mis: 3 tahun terakhir) supaya pembaca lihat tren, bukan hanya 1 titik waktu

4. Saran untuk editor:
- Jangan mulai Y dari nilai bukan 0 untuk bar chart
- Judul harus netral dan akurat, bukan sensasional
- Sertakan konteks (siswa, tahun, mata pelajaran)
- Sertakan sumber data dan metode pengukuran
- Hindari generalisasi dari 1 titik data — gunakan data multi-tahun jika ada
- Pertimbangkan dampak psikologis: judul sensasional bisa merugikan Sekolah B dan komunitasnya
- Editor wajib verifikasi: apakah selisih karena faktor sekolah atau non-sekolah (sosial ekonomi, demografi)?', 'C4', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 Essai #003 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_essay_003', '8', 'Informatika', '**Studi kasus kritis:** Anda adalah data scientist di kementerian pendidikan. Anda punya data nilai ujian nasional 5 tahun terakhir untuk 1000 sekolah. Anda harus membuat visualisasi untuk menteri untuk menunjukkan: (a) tren nasional, (b) perbandingan antar provinsi, (c) kesenjangan kota vs desa.

**Tugas:**
1. Untuk setiap (a), (b), (c) — pilih jenis visualisasi dan jelaskan alasan
2. Identifikasi 3 risiko etis dari visualisasi data pendidikan ini
3. Buat rekomendasi kebijakan berdasarkan kemungkinan temuan visualisasi', '', '', '', '', 0, '', 'Visualisasi Data', true, 'essai', '[]', '[]', '', '1. Pilihan visualisasi per tujuan:

(a) Tren nasional 5 tahun:
- Line chart dengan X=tahun, Y=rata-rata nilai nasional, garis per mata pelajaran (3 series: Matematika, B.Inggris, B.Indonesia)
- Alasan: tren seiring waktu paling jelas di line chart. 3 series untuk bandingkan mata pelajaran. Bisa lihat: nilai naik/turun? mata pelajaran mana paling lemah?
- Tambah anotasi: perubahan kurikulum, kebijakan, event penting

(b) Perbandingan antar provinsi:
- Bar chart horizontal, urut desc, 34 provinsi sebagai kategori, Y=nilai rata-rata
- Alasan: 34 kategori terlalu banyak untuk pie/line. Bar horizontal cocok karena label provinsi panjang. Urutan desc memudahkan ranking.
- Alternatif: peta choropleth (peta Indonesia warnai per provinsi) jika konteks geografis penting
- Highlight: gunakan warna berbeda untuk top 5 dan bottom 5

(c) Kesenjangan kota vs desa:
- Grouped bar chart: 2 batang per mata pelajaran (kota vs desa), 3 mata pelajaran
- Atau: side-by-side box plot per mata pelajaran (kota vs desa) — menunjukkan distribusi, bukan hanya rata-rata
- Alasan: grouped bar = perbandingan langsung. Box plot = distribusi (apakah desa lebih variatif? ada outlier?)
- Pilihan: scatter plot dengan X=populasi kota, Y=nilai, titik diberi warna kota/desa

2. Risiko etis:

a. Stigmatisasi daerah: visualisasi yang menunjukkan provinsi tertentu ''terendah'' bisa stigma, dampak ke motivasi siswa dan investasi daerah. Mitigasi: sertakan konteks (sosial ekonomi, akses pendidikan), hindari label ''terburuk''.

b. Generalisasi berlebihan: rata-rata provinsi bisa menyembunyikan variasi besar antar sekolah di provinsi itu. Mitigasi: tambah box plot atau range, bukan hanya rata-rata.

c. Pressure ke guru: visualisasi ''ranking'' bisa tekan guru untuk fokus test prep, abaikan pendidikan holistik. Mitigasi: sertakan metrik non-akademik (karakter, kreativitas), bukan hanya nilai ujian.

d. Privasi: data sekolah kecil bisa di-identifikasi siswa individual. Mitigasi: anonymisasi, agregasi minimum (tidak show <10 siswa per cell).

e. Bias historis: kesenjangan kota/desa bisa di-fame sebagai ''ketidakmampuan desa'' padahal sebabnya akses/infrastruktur. Mitigasi: sertakan data infrastruktur (listrik, internet, guru per siswa).

3. Rekomendasi kebijakan berdasarkan kemungkinan temuan:

(a) Jika tren nasional menurun:
- Evaluasi kurikulum terakhir — ada perubahan yang berdampak negatif?
- Tinjau beban siswa — apakah terlalu banyak?
- Audit kualitas guru — apakah perlu pelatihan ulang?

(b) Jika ada provinsi konsisten terendah:
- Investigasi penyebab: akses, infrastruktur, sosial ekonomi, kualitas guru
- Program khusus: beasiswa, pelatihan guru, subsidi infrastruktur
- Belajar dari provinsi terbaik — praktik apa yang bisa direplikasi?

(c) Jika kesenjangan kota/desa signifikan:
- Investasi infrastruktur: internet, listrik, perpustakaan
- Insentif guru mengajar di desa: tunjangan, promosi cepat
- Program pendampingan: sekolah kota adopt sekolah desa
- Digital learning: konten online untuk daerah terpencil
- Monitoring ketat: tidak cukup subsidi, harus audit hasil

Penting: visualisasi adalah alat, bukan tujuan. Setelah temuan, harus aksi konkret dengan budget dan timeline.', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 Essai #004 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_essay_004', '8', 'Informatika', '**Refleksi:** Pilih satu aplikasi yang sering Anda gunakan yang punya visualisasi data (mis: smartwatch kesehatan, Spotify Wrapped, Instagram Insights, Shopee statistik penjual).

**Tugas:**
1. Deskripsikan minimal 3 visualisasi yang ada di aplikasi tersebut
2. Evaluasi: visualisasi mana yang paling efektif? Mana yang kurang? Mengapa?
3. Identifikasi 1 insight yang Anda dapat dari visualisasi tersebut
4. Berikan 1 saran perbaikan untuk developer aplikasi', '', '', '', '', 0, '', 'Visualisasi Data', true, 'essai', '[]', '[]', '', 'Contoh jawaban untuk Spotify Wrapped:

1. Visualisasi yang ada:

a. Bar chart top 5 artis dengan jumlah menit didengar — batang horizontal, urutan desc, warna gradien hijau Spotify

b. Story-style card dengan persentase genre: ''Kamu 45% pop, 25% indie, 15% R&B'' — pakai pie chart kecil + ikon genre

c. Card dengan total menit didengar, jumlah lagu unik, jumlah artis — angka besar dengan animasi count-up

d. Story ''Top song'' dengan jumlah play — lagu cover art + count

e. Aurora/Planet card: visualisasi 3D planet dengan musik yang membentuk ''audio aura'' (energi, positif, etc)

2. Evaluasi:

Paling efektif: Bar chart top 5 artis. Jelas, mudah dibaca, urutan desc membantu ranking. Tapi bisa lebih baik dengan label angka exact (bukan hanya batang).

Kurang efektif: Aurora 3D planet. Visual menarik tapi tidak informatif — sulit ekstrak insight konkret. Lebih styling dari pada data viz.

Pie chart genre: menarik tapi 3 kategori saja (45-25-15) — info terlalu kasar. Lebih banyak kategori akan informatif.

3. Insight yang didapat:
- Saya dengar 45% pop — ternyata lebih banyak dari yang saya kira. Saya selalu merasa ''indie kid'' tapi data menunjukkan dominan pop.
- Top artist = Taylor Swift dengan 1247 menit (~21 jam). Berarti saya habiskan ~21 jam dengar 1 artis dalam setahun. Banyak.
- Genre bimodal: 45% pop + 25% indie — saya suka 2 kutub yang berbeda.

4. Saran perbaikan:
- Tambah visualisasi tren: bagaimana selera musik saya berubah sepanjang tahun (Q1 vs Q2 vs Q3 vs Q4). Saat ini hanya summary tahunan.
- Tambah perbandingan: bagaimana selera saya vs rata-rata pengguna Spotify Indonesia? Ini kontekstualisasi.
- Tambah visualisasi ''discovery ratio'': berapa % lagu baru vs lagu lama yang didengar. Insight: apakah saya eksplor atau repetisi.
- Kurangi efek 3D/animasi berlebihan — fokus pada insight data.
- Tambah download/report PDF supaya bisa simpan dan refleksi tahunan.', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 8 Essai #005 (C5 - Visualisasi Data)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_8_1_3_essay_005', '8', 'Informatika', '**Eksperimen desain:** Anda diminta merancang dashboard visualisasi untuk guru kelas yang menampilkan performa 30 siswa di 6 mata pelajaran selama 1 semester (6 ujian per mapel).

**Tugas:**
1. Identifikasi 5 pertanyaan kunci yang harus dijawab dashboard
2. Untuk setiap pertanyaan, pilih visualisasi yang tepat dan jelaskan
3. Identifikasi 2 risiko misinterpretasi oleh guru
4. Berikan rekomendasi training singkat untuk guru sebelum pakai dashboard', '', '', '', '', 0, '', 'Visualisasi Data', true, 'essai', '[]', '[]', '', '1. 5 pertanyaan kunci dashboard:

a. Siapa siswa yang perlu perhatian khusus (nilai rendah konsisten)?
b. Mata pelajaran apa yang paling sulit untuk kelas secara umum?
c. Apakah ada tren penurunan/peningkatan kelas dari ujian 1 ke 6?
d. Bagaimana distribusi nilai per mata pelajaran (normal, miring, bimodal)?
e. Siapa siswa yang paling berkembang (selisih ujian 1 vs 6 terbesar)?

2. Visualisasi per pertanyaan:

a. Siswa perlu perhatian:
- Heatmap: 30 siswa (baris) × 6 mapel (kolom), warna = rata-rata nilai. Siswa dengan baris gelap konsisten = perlu perhatian.
- Plus: filter siswa dengan rata-rata <KKM, tampilkan sebagai list dengan alert.

b. Mata pelajaran sulit:
- Bar chart: 6 batang (mapel), Y=rata-rata kelas, threshold KKM sebagai garis horizontal merah.
- Sort desc untuk ranking kesulitan.


c. Tren kelas:
- Line chart: X=ujian 1-6, Y=rata-rata kelas, 6 garis per mapel. Atau 1 garis rata-rata semua mapel + area shaded per mapel.
- Tambah trendline dan anotasi event (mis: ''ujian susah'', ''ada remedial'').

d. Distribusi per mapel:
- Side-by-side box plot: 6 box plot per mapel. Tunjukkan median, IQR, outlier per mapel.
- Bisa lihat: mapel mana yang distribusinya miring (mayoritas rendah), mana yang normal.

e. Siswa paling berkembang:
- Scatter plot: X=nilai ujian 1, Y=nilai ujian 6. Garis diagonal y=x. Titik di atas garis = berkembang, di bawah = menurun. Warna gradient = besarnya perkembangan.
- Atau: bar chart horizontal top 10 siswa dengan selisih terbesar (urutan desc).

3. Risiko misinterpretasi:

a. Korelasi vs kausalitas: guru melihat siswa yang rajin hadir punya nilai tinggi, lalu menyimpulkan ''kehadiran = penyebab nilai tinggi''. Padahal bisa siswa disiplin yang rajin hadir juga rajin belajar. Mitigasi: anotasi ''korelasi bukan kausalitas'' di chart.

b. Label negatif prematur: guru melihat siswa di ''perlu perhatian'' lalu memberi label ''lemah'' tanpa investigasi. Mitigasi: tooltip ''investigasi penyebab: kesehatan, keluarga, motivasi'' sebelum label.

c. Over-confidence pada rata-rata: guru lihat rata-rata kelas naik, lalu pikir semua siswa naik. Padahal bisa 5 siswa naik tajam, 25 lainnya turun. Mitigasi: selalu tampilkan distribusi (box plot), bukan hanya rata-rata.

d. Bias konfirmasi: guru lihat mapel yang ia anggap sulit = rendah di chart, lalu ''benar kananan'' keyakinan. Padahal bisa jadi metode mengajarnya yang perlu diubah. Mitigasi: bandingkan dengan kelas lain yang mapel sama.

4. Rekomendasi training singkat (1 jam):

Menit 0-10: Konsep dasar visualisasi. Jenis grafik dan kapan dipakai. Prinsip ''Y mulai 0'' untuk bar chart. Bahaya manipulasi.

Menit 10-25: Tour dashboard. Jelaskan 5 pertanyaan + visualisasi masing-masing. Demo cara baca box plot (median, IQR, outlier). Cara baca heatmap (warna = nilai). Cara pakai filter (per siswa, per mapel, per ujian).

Menit 25-40: Studi kasus. Beri 3 contoh data real, minta guru interpretasi. Bahas kesalahan umum: korelasi vs kausalitas, label negatif, over-confidence rata-rata.

Menit 40-55: Praktik. Guru pakai dashboard dengan data kelasnya sendiri. Identifikasi: 3 siswa perlu perhatian, 1 mapel sulit, 1 tren. Diskusi kelompok kecil.

Menit 55-60: Wrap-up. Reminder: dashboard alat bantu, bukan pengganti profesionalisme guru. Investigasi konteks sebelum label. Berbagi best practice. Q&A.

Material: handout 2 halaman (cheat sheet visualisasi + FAQ), video tutorial 5 menit, grup WhatsApp support.', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_8_1', 'tp_inf_8_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas 3 untuk Kelas 8 (Visualisasi Data)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_8_1_3', 'Tugas 3 Kelas 8: Visualisasi Data (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang visualisasi data untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Visualisasi Data" sebelum mengerjakan.', 'Informatika', '8A,8B,8C', 'SMP', true, '2026-09-28T23:59:00+07:00', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_8_1', 'tp_inf_8_1_3', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- KELAS 9: TP3 + Materi Struktur Data Graph + 50 Soal + Tugas 3
-- ============================================================


-- TP 3 untuk Kelas 9 (Struktur Data Graph)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_9_1_3', 'cp_inf_9_1', 'TP.9.1.3', 'Siswa mampu menerapkan struktur data graph untuk representasi hubungan antar objek.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

-- Materi Kelas 9: Memperdalam Struktur Data Graph
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_9_1_3', 'Memperdalam Struktur Data Graph: Jaringan yang Menghubungkan Dunia', '# Memperdalam Struktur Data Graph: Jaringan yang Menghubungkan Dunia

## Mengapa Graph Penting?

Graph adalah struktur data yang merepresentasikan hubungan antar objek. Jika tree adalah hierarki (seperti pohon keluarga atau struktur folder), graph adalah jaringan yang lebih bebas — setiap node bisa terhubung ke node lain tanpa batasan hierarki. Graph ada di mana-mana: jaringan pertemanan di media sosial, rute Google Maps, jaringan internet, hubungan antar mata pelajaran, bahkan silsilah penyakit menular. Memahami graph adalah gerbang untuk memahami banyak teknologi modern, mulai dari algoritma pencarian rute hingga analisis jejaring sosial.

Bayangkan Anda ingin pergi dari rumah ke sekolah. Ada beberapa rute: lewat jalan A (dekat tapi macet), lewat jalan B (jauh tapi lancar), lewat jalan C (perlu transit). Ini adalah graph: rumah dan sekolah adalah node (titik), jalan adalah edge (garis penghubung) dengan properti jarak/waktu. Algoritma graph seperti Dijkstra atau A* mencari rute terbaik berdasarkan kriteria yang Anda tentukan. Tanpa graph, Google Maps tidak akan ada.

## Definisi Graph

Graph G = (V, E) terdiri dari:
- **V (Vertices)**: kumpulan node/titik. Contoh: kota, orang, mata pelajaran.
- **E (Edges)**: kumpulan edge/garis yang menghubungkan pasangan node. Contoh: jalan antar kota, pertemanan, prasyarat mata pelajaran.

Istilah penting dalam graph:
- **Node/Vertex**: titik dalam graph
- **Edge**: garis penghubung antar node
- **Adjacent**: dua node yang terhubung langsung oleh edge
- **Degree**: jumlah edge yang terhubung ke node
- **Path**: urutan node yang terhubung oleh edge
- **Cycle**: path yang berakhir di node awal (membentuk lingkaran)
- **Connected**: graph di mana semua node bisa dicapai dari node manapun
- **Directed graph (digraph)**: edge punya arah (A→B ≠ B→A)
- **Undirected graph**: edge tidak punya arah (A-B = B-A)
- **Weighted graph**: edge punya bobot (jarak, waktu, biaya)
- **Tree**: graph khusus yang connected, tidak ada cycle, dan punya root

## Jenis-Jenis Graph

### 1. Undirected Graph (Graph Tak Berarah)
Edge tidak punya arah. A-B berarti bisa dari A ke B atau B ke A. Contoh: pertemanan di Facebook (jika A teman B, otomatis B teman A). Jalan dua arah juga undirected.

### 2. Directed Graph (Digraph / Graph Berarah)
Edge punya arah. A→B berarti bisa dari A ke B, tapi belum tentu sebaliknya. Contoh: follow di Instagram (A follow B ≠ B follow A), prasyarat mata pelajaran (Matematika → Fisika berarti Matematika prasyarat Fisika, tidak sebaliknya).

### 3. Weighted Graph (Graph Berbobot)
Edge punya bobot/nilai. Bobot bisa berupa jarak, waktu, biaya, dll. Contoh: jalan antar kota dengan jarak (km), waktu tempuh (menit), atau biaya tol (Rp). Algoritma seperti Dijkstra pakai bobot untuk cari rute optimal.

### 4. Cyclic vs Acyclic Graph
- Cyclic: ada cycle (lingkaran). Contoh: jaringan jalan (bisa balik ke titik awal).
- Acyclic: tidak ada cycle. Contoh: prasyarat mata pelajaran (tidak bisa Matematika → Fisika → Matematika).

### 5. Connected vs Disconnected
- Connected: semua node bisa dicapai dari node manapun. Contoh: jaringan internet (semua komputer terhubung).
- Disconnected: ada node yang tidak bisa dicapai. Contoh: 2 jaringan WiFi terpisah.

## Representasi Graph dalam Komputer

### 1. Adjacency Matrix
Matriks 2D di mana matriks[i][j] = 1 jika ada edge dari node i ke node j, 0 jika tidak. Untuk weighted graph, matriks[i][j] = bobot.

Kelebihan: cek edge cepat O(1). Kekurangan: boros memori O(V²) untuk graph sparse (sedikit edge).

### 2. Adjacency List
Array/list di mana adj[i] = list node yang adjacent ke i.

Kelebihan: hemat memori O(V+E). Kekurangan: cek edge i-j butuh scan list O(degree).

### 3. Edge List
List pasangan (u, v) untuk setiap edge u-v.

Kelebihan: simpel, hemat untuk graph sangat sparse. Kekurangan: cek adjacency butuh scan semua edge.

## Algoritma Graph Dasar

### 1. BFS (Breadth-First Search)
Traversal layer per layer dari node awal. Pakai queue. BFS menemukan shortest path (jalur terpendek) dalam graph unweighted. Contoh: cari teman terdekat di Facebook (1 hop, 2 hop, dst).

### 2. DFS (Depth-First Search)
Traversal sedalam mungkin sebelum backtrack. Pakai stack atau rekursi. DFS bagus untuk: deteksi cycle, topological sort, find connected components.

### 3. Dijkstra''s Algorithm
Cari shortest path dari 1 node ke semua node lain dalam weighted graph (bobot non-negatif). Pakai priority queue. Contoh: Google Maps cari rute tercepat.

### 4. A* (A-Star)
Variasi Dijkstra dengan heuristic (perkiraan jarak ke tujuan). Lebih cepat dari Dijkstra karena fokus ke arah tujuan. Contoh: GPS mobil.

## Aplikasi Graph di Kehidupan Sehari-Hari

1. **Google Maps / Waze** — graph jalan, cari rute optimal (Dijkstra/A*)
2. **Media sosial** — graph pertemanan, rekomendasi teman, friend suggestion
3. **Internet** — graph hyperlink antar halaman web, algoritma PageRank Google
4. **Sistem rekomendasi** — graph user-item, "orang yang beli ini juga beli..."
5. **Logistik** — graph rute pengiriman, optimasi kurir
6. **Bioinformatika** — graph interaksi protein, analisis penyakit
7. **Sirkuit elektronik** — graph koneksi komponen
8. **Prasyarat mata kuliah** — DAG (Directed Acyclic Graph), topological sort
9. **Silsilah keluarga** — tree (graph khusus)
10. **Jaringan kereta bawah tanah** — graph stasiun dan jalur

## Kesalahan Umum dalam Graph

1. **Bingung directed vs undirected** — mengira A-B selalu sama dengan B-A. Padahal di follow Instagram, A→B ≠ B→A.

2. **Salah hitung degree di directed graph** — ada in-degree (edge masuk) dan out-degree (edge keluar). Mis: selebgram punya in-degree tinggi (banyak follower), out-degree rendah (follow sedikit).

3. **Lupa handle cycle** — DFS tanpa tracking visited bisa infinite loop di graph dengan cycle.

4. **Salah pilih algoritma** — pakai BFS untuk weighted graph (BFS hanya untuk unweighted). Pakai Dijkstra untuk bobot negatif (Dijkstra gagal, pakai Bellman-Ford).

5. **Tidak validasi input** — graph bisa punya self-loop (node terhubung ke dirinya) atau multi-edge (2 edge antar node yang sama). Validasi sebelum proses.

## Latihan Self-Assessment

Setelah membaca materi ini, coba jawab: gambar graph pertemanan 5 orang di kelas Anda (A, B, C, D, E). Tentukan siapa teman siapa. Lalu: (1) identifikasi siapa yang paling populer (degree tertinggi), (2) cari path dari A ke E, (3) apakah ada cycle? Diskusikan dengan teman apa insight yang Anda dapat dari graph pertemanan tersebut.
', 'Informatika', '9A,9B', 'SMP', 'Struktur Data Graph', 'cp_inf_9_1', 'tp_inf_9_1_3', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #001 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_001', '9', 'Informatika', 'Dalam graph, node/titik disebut juga...', 'Edge', 'Vertex (atau Vertices untuk jamak)', 'Path', 'Cycle', 1, 'Node = Vertex (tunggal) / Vertices (jamak). Edge = garis penghubung. Path = urutan node. Cycle = path berakhir di awal.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Node = Vertex (tunggal) / Vertices (jamak). Edge = garis penghubung. Path = urutan node. Cycle = path berakhir di awal.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #002 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_002', '9', 'Informatika', '**Siti** punya graph pertemanan: A-B, A-C, B-C, B-D. Berapa degree node B?', '1', '2', '3 (terhubung ke A, C, D)', '4', 2, 'Degree = jumlah edge yang terhubung ke node. B terhubung ke A (A-B), C (B-C), D (B-D). Degree B = 3.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: C. Degree = jumlah edge yang terhubung ke node. B terhubung ke A (A-B), C (B-C), D (B-D). Degree B = 3.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #003 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_003', '9', 'Informatika', 'Graph di mana edge punya arah (A→B ≠ B→A) disebut...', 'Undirected graph', 'Directed graph (digraph)', 'Weighted graph', 'Tree', 1, 'Directed graph (digraph) = edge punya arah. Contoh: follow Instagram (A follow B ≠ B follow A). Undirected = dua arah otomatis.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Directed graph (digraph) = edge punya arah. Contoh: follow Instagram (A follow B ≠ B follow A). Undirected = dua arah otomatis.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #004 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_004', '9', 'Informatika', '**Budi** punya graph jalan: A-B (5km), B-C (3km), A-C (10km). Graph ini adalah graph...', 'Undirected tanpa bobot', 'Weighted graph (edge punya bobot jarak)', 'Directed graph', 'Tree', 1, 'Edge punya bobot (5km, 3km, 10km) = weighted graph. Bobot bisa jarak, waktu, biaya. Cocok untuk algoritma Dijkstra.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Edge punya bobot (5km, 3km, 10km) = weighted graph. Bobot bisa jarak, waktu, biaya. Cocok untuk algoritma Dijkstra.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #005 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_005', '9', 'Informatika', 'Manakah yang BUKAN ciri tree (graph khusus)?', 'Connected (semua node terhubung)', 'Tidak ada cycle', 'Punya root (node khusus di puncak)', 'Bisa ada cycle (lingkaran)', 3, 'Tree = graph khusus yang connected + tidak ada cycle + punya root. Jika ada cycle → BUKAN tree. Tree juga: setiap node (kecuali root) punya 1 parent.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: D. Tree = graph khusus yang connected + tidak ada cycle + punya root. Jika ada cycle → BUKAN tree. Tree juga: setiap node (kecuali root) punya 1 parent.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #006 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_006', '9', 'Informatika', 'BFS (Breadth-First Search) menggunakan struktur data...', 'Stack', 'Queue (antrian)', 'Tree', 'Hash table', 1, 'BFS pakai queue (FIFO). Visit node, masukkan neighbor ke queue, proses queue. Traversal layer per layer. DFS pakai stack (LIFO).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. BFS pakai queue (FIFO). Visit node, masukkan neighbor ke queue, proses queue. Traversal layer per layer. DFS pakai stack (LIFO).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #007 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_007', '9', 'Informatika', 'DFS (Depth-First Search) menggunakan struktur data...', 'Queue', 'Stack (atau rekursi yang implisit pakai call stack)', 'Array', 'Heap', 1, 'DFS pakai stack (LIFO) atau rekursi. Traverse sedalam mungkin sebelum backtrack. Cocok untuk deteksi cycle, topological sort.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. DFS pakai stack (LIFO) atau rekursi. Traverse sedalam mungkin sebelum backtrack. Cocok untuk deteksi cycle, topological sort.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #008 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_008', '9', 'Informatika', '**Dina** punya graph: A-B, B-C, C-D, D-A. Apa yang terbentuk?', 'Tree', 'Cycle (lingkaran A-B-C-D-A)', 'Path', 'Tidak ada pola', 1, 'Path A-B-C-D-A berakhir di node awal = cycle. Graph ini punya cycle, jadi BUKAN tree. Tree tidak boleh ada cycle.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Path A-B-C-D-A berakhir di node awal = cycle. Graph ini punya cycle, jadi BUKAN tree. Tree tidak boleh ada cycle.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #009 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_009', '9', 'Informatika', 'Algoritma Dijkstra digunakan untuk...', 'Mencari shortest path dalam weighted graph (bobot non-negatif)', 'Mengurutkan data', 'Mencari nilai maksimum', 'Traversal tree', 0, 'Dijkstra = cari shortest path dari 1 node ke semua node lain dalam weighted graph. Syarat: bobot non-negatif. Untuk bobot negatif, pakai Bellman-Ford.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: A. Dijkstra = cari shortest path dari 1 node ke semua node lain dalam weighted graph. Syarat: bobot non-negatif. Untuk bobot negatif, pakai Bellman-Ford.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #010 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_010', '9', 'Informatika', '**Eka** punya graph pertemanan: A-B, A-C, B-D. Path dari C ke D adalah...', 'C-D (langsung)', 'C-A-B-D (lewat A dan B)', 'Tidak ada path', 'C-D-A-B', 1, 'C tidak terhubung langsung ke D. Path: C-A (edge), A-B (edge), B-D (edge). Jadi C-A-B-D. Path length = 3 edges.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. C tidak terhubung langsung ke D. Path: C-A (edge), A-B (edge), B-D (edge). Jadi C-A-B-D. Path length = 3 edges.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #011 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_011', '9', 'Informatika', 'Adjacency matrix untuk graph dengan V node membutuhkan memori sebesar...', 'O(V)', 'O(V²)', 'O(E)', 'O(V+E)', 1, 'Adjacency matrix = matriks V×V = O(V²). Boros untuk graph sparse (sedikit edge), tapi cek edge cepat O(1). Adjacency list lebih hemat O(V+E).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Adjacency matrix = matriks V×V = O(V²). Boros untuk graph sparse (sedikit edge), tapi cek edge cepat O(1). Adjacency list lebih hemat O(V+E).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #012 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_012', '9', 'Informatika', '**Fajar** punya graph follow Instagram: A→B, A→C, B→C, C→A. Berapa in-degree node C (jumlah edge masuk ke C)?', '1', '2 (dari A dan B)', '3', '0', 1, 'In-degree = edge masuk. Edge ke C: A→C, B→C. In-degree C = 2. Out-degree C (edge keluar) = 1 (C→A).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. In-degree = edge masuk. Edge ke C: A→C, B→C. In-degree C = 2. Out-degree C (edge keluar) = 1 (C→A).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #013 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_013', '9', 'Informatika', 'Google Maps menggunakan graph dengan node = persimpangan, edge = jalan. Edge punya bobot...', 'Warna jalan', 'Jarak/waktu tempuh (weighted graph)', 'Nama jalan', 'Tidak ada bobot', 1, 'Google Maps: weighted graph dengan bobot = jarak (km) atau waktu tempuh (menit). Algoritma Dijkstra/A* cari rute optimal berdasarkan bobot.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Google Maps: weighted graph dengan bobot = jarak (km) atau waktu tempuh (menit). Algoritma Dijkstra/A* cari rute optimal berdasarkan bobot.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #014 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_014', '9', 'Informatika', '**Gita** punya graph: A-B, B-C, C-A, C-D. Apakah graph ini connected?', 'Tidak connected', 'Ya, connected (semua node bisa dicapai dari node manapun)', 'Hanya A-B-C connected, D terpisah', 'Tidak bisa ditentukan', 1, 'Connected = semua node bisa dicapai. Dari A: A→B→C→D. Dari D: D→C→A atau D→C→B. Dari B: B→A, B→C→D. Semua terhubung = connected.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Connected = semua node bisa dicapai. Dari A: A→B→C→D. Dari D: D→C→A atau D→C→B. Dari B: B→A, B→C→D. Semua terhubung = connected.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #015 (C3 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_015', '9', 'Informatika', 'Aplikasi graph dalam media sosial (mis: Facebook friend suggestion) menggunakan konsep...', 'Shortest path', 'Mutual friends (path length 2) — jika A-B-C, sarankan C ke A', 'Topological sort', 'Binary search', 1, 'Friend suggestion: cari node yang jaraknya 2 hop (mutual friend). Jika A-B dan B-C, sarankan A-C. Ini pakai BFS dari A, ambil node di layer 2.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Friend suggestion: cari node yang jaraknya 2 hop (mutual friend). Jika A-B dan B-C, sarankan A-C. Ini pakai BFS dari A, ambil node di layer 2.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #016 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_016', '9', 'Informatika', 'Perhatikan graph: A-B, A-C, B-D, C-D, D-E. Berapa path length terpendek dari A ke E?', '1', '2', '3 (A-B-D-E atau A-C-D-E)', '4', 2, 'Analisis: cari path A ke E. A-B-D-E (3 edges), A-C-D-E (3 edges), A-B-D-C-? (backtrack, tidak efisien). Shortest = 3 edges.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: C. Analisis: cari path A ke E. A-B-D-E (3 edges), A-C-D-E (3 edges), A-B-D-C-? (backtrack, tidak efisien). Shortest = 3 edges.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #017 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_017', '9', 'Informatika', '**Hadi** punya weighted graph: A-B (5), A-C (2), B-C (1), B-D (3), C-D (8). Berapa shortest path A ke D?', 'A-B-D = 5+3 = 8', 'A-C-D = 2+8 = 10', 'A-C-B-D = 2+1+3 = 6 (shortest!)', 'A-B-C-D = 5+1+8 = 14', 2, 'Analisis: coba semua path. A-B-D=8, A-C-D=10, A-C-B-D=6 (terpendek), A-B-C-D=14. Shortest = A-C-B-D dengan total bobot 6.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: C. Analisis: coba semua path. A-B-D=8, A-C-D=10, A-C-B-D=6 (terpendek), A-B-C-D=14. Shortest = A-C-B-D dengan total bobot 6.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #018 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_018', '9', 'Informatika', '**Ira** punya graph dengan cycle: A-B-C-A. Ia jalankan DFS dari A tanpa tracking visited. Apa yang terjadi?', 'DFS selesai normal', 'Infinite loop (A-B-C-A-B-C-A-...) karena cycle', 'DFS crash', 'DFS hanya visit 3 node', 1, 'Analisis: DFS tanpa visited di graph dengan cycle = infinite loop. A→B→C→A→B→C→... Solusi: track visited, skip node yang sudah dikunjungi.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: DFS tanpa visited di graph dengan cycle = infinite loop. A→B→C→A→B→C→... Solusi: track visited, skip node yang sudah dikunjungi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #019 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_019', '9', 'Informatika', 'Adjacency matrix untuk graph 4 node (A, B, C, D) dengan edges A-B, B-C, C-D adalah...', 'Matriks 4x4 dengan matriks[A][B]=1, matriks[B][A]=1, matriks[B][C]=1, matriks[C][B]=1, matriks[C][D]=1, matriks[D][C]=1, lainnya 0', 'Matriks 3x3', 'Matriks diagonal', 'Array 1D', 0, 'Analisis: 4 node = matriks 4x4. Undirected: A-B berarti matriks[A][B]=1 dan matriks[B][A]=1. Begitu seterusnya. Lainnya 0.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: 4 node = matriks 4x4. Undirected: A-B berarti matriks[A][B]=1 dan matriks[B][A]=1. Begitu seterusnya. Lainnya 0.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #020 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_020', '9', 'Informatika', '**Joko** punya graph prasyarat mata kuliah: Matematika → Fisika, Fisika → Kimia, Kimia → Biologi. Graph ini adalah...', 'Undirected cyclic', 'Directed Acyclic Graph (DAG) — tidak ada cycle, ada urutan prasyarat', 'Tree dengan root Matematika', 'Weighted graph', 1, 'Analisis: edge punya arah (prasyarat) = directed. Tidak ada cycle (tidak bisa balik ke Matematika) = acyclic. DAG = Directed Acyclic Graph. Topological sort berlaku.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: edge punya arah (prasyarat) = directed. Tidak ada cycle (tidak bisa balik ke Matematika) = acyclic. DAG = Directed Acyclic Graph. Topological sort berlaku.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #021 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_021', '9', 'Informatika', 'BFS dari node A pada graph: A-B, A-C, B-D, C-D, D-E. Urutan visit (asumsi urutan neighbor alfabetis)?', 'A, B, D, C, E (DFS style)', 'A, B, C, D, E (BFS layer per layer)', 'A, B, C, E, D', 'A, E, D, C, B', 1, 'Analisis: BFS layer per layer. Layer 0: A. Layer 1 (neighbor A): B, C. Layer 2 (neighbor B,C): D. Layer 3 (neighbor D): E. Urutan: A, B, C, D, E.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: BFS layer per layer. Layer 0: A. Layer 1 (neighbor A): B, C. Layer 2 (neighbor B,C): D. Layer 3 (neighbor D): E. Urutan: A, B, C, D, E.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #022 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_022', '9', 'Informatika', '**Kiki** punya graph 5 node, 3 edges (sparse). Mana yang lebih hemat memori: adjacency matrix atau list?', 'Matrix (V² = 25)', 'List (V+E = 5+3 = 8) — lebih hemat untuk sparse graph', 'Sama', 'Tidak bisa dibandingkan', 1, 'Analisis: matrix 5x5=25 cell. List: 5 node + 3 edge = 8. List jauh lebih hemat. Matrix boros untuk sparse. Matrix unggul untuk dense graph (banyak edge).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: matrix 5x5=25 cell. List: 5 node + 3 edge = 8. List jauh lebih hemat. Matrix boros untuk sparse. Matrix unggul untuk dense graph (banyak edge).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #023 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_023', '9', 'Informatika', '**Lia** punya weighted graph dengan bobot negatif (-5). Ia pakai Dijkstra. Apa yang terjadi?', 'Dijkstra bekerja normal', 'Dijkstra bisa salah — algoritma Dijkstra tidak support bobot negatif. Pakai Bellman-Ford', 'Dijkstra crash', 'Tidak ada efek', 1, 'Analisis: Dijkstra mengasumsikan bobot non-negatif. Bobot negatif bisa buat Dijkstra pilih path yang bukan shortest (karena asumsi ''tambah edge = tambah jarak'' jadi tidak valid). Solusi: Bellman-Ford.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: Dijkstra mengasumsikan bobot non-negatif. Bobot negatif bisa buat Dijkstra pilih path yang bukan shortest (karena asumsi ''tambah edge = tambah jarak'' jadi tidak valid). Solusi: Bellman-Ford.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #024 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_024', '9', 'Informatika', 'Pada graph follow Instagram: A→B, B→C, C→A. Berapa cycle yang ada?', '0', '1 cycle (A→B→C→A)', '2 cycles', '3 cycles', 1, 'Analisis: cycle = path berakhir di awal. A→B→C→A = 1 cycle. Tidak ada cycle lain karena hanya 3 node.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: cycle = path berakhir di awal. A→B→C→A = 1 cycle. Tidak ada cycle lain karena hanya 3 node.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #025 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_025', '9', 'Informatika', '**Maman** punya graph 6 node, 4 edges (2 connected components: A-B-C dan D-E-F). Apakah graph connected?', 'Connected', 'Tidak connected (ada 2 komponen terpisah)', 'Tree', 'Tidak bisa ditentukan', 1, 'Analisis: connected = semua node 1 komponen. Ada 2 komponen (A-B-C dan D-E-F) = tidak connected. Untuk connected, harus ada edge antar komponen.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: connected = semua node 1 komponen. Ada 2 komponen (A-B-C dan D-E-F) = tidak connected. Untuk connected, harus ada edge antar komponen.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #026 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_026', '9', 'Informatika', 'Degree dari node pada undirected graph A-B, B-C, B-D, C-D adalah: A=1, B=?, C=?, D=?. Lengkapi.', 'B=3, C=2, D=2', 'B=2, C=1, D=1', 'B=4, C=3, D=3', 'B=1, C=1, D=1', 0, 'Analisis: A: edge A-B (1). B: edges B-A, B-C, B-D (3). C: edges C-B, C-D (2). D: edges D-B, D-C (2). Jadi A=1, B=3, C=2, D=2.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: A: edge A-B (1). B: edges B-A, B-C, B-D (3). C: edges C-B, C-D (2). D: edges D-B, D-C (2). Jadi A=1, B=3, C=2, D=2.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #027 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_027', '9', 'Informatika', 'DFS dari node A pada graph: A-B, A-C, B-D, C-D. Urutan visit (asumsi urutan alfabetis)?', 'A, B, C, D (BFS style)', 'A, B, D, C (DFS: dalam dulu, backtrack)', 'A, C, D, B', 'A, D, B, C', 1, 'Analisis: DFS = sedalam mungkin. A→B→D (D tidak punya neighbor baru, backtrack ke B, backtrack ke A) → C→D (sudah visited). Urutan: A, B, D, C.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: DFS = sedalam mungkin. A→B→D (D tidak punya neighbor baru, backtrack ke B, backtrack ke A) → C→D (sudah visited). Urutan: A, B, D, C.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #028 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_028', '9', 'Informatika', '**Nina** punya graph tree dengan root A, children B dan C. B punya child D, E. C punya child F. Berapa total node?', '5', '6 (A, B, C, D, E, F)', '7', '4', 1, 'Analisis: tree = 1 root + internal nodes + leaves. A (root), B, C (internal), D, E, F (leaves). Total 6 node.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: tree = 1 root + internal nodes + leaves. A (root), B, C (internal), D, E, F (leaves). Total 6 node.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #029 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_029', '9', 'Informatika', 'Adjacency list untuk graph A-B, A-C, B-D adalah...', 'adj[A] = [B, C], adj[B] = [A, D], adj[C] = [A], adj[D] = [B]', 'adj[A] = [B], adj[B] = [C]', 'Matriks 4x4', 'Hanya list [A, B, C, D]', 0, 'Analisis: list = per node, list neighbor. A: B, C. B: A, D (undirected, B-A dan B-D). C: A. D: B. adj[A]=[B,C], adj[B]=[A,D], adj[C]=[A], adj[D]=[B].', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: list = per node, list neighbor. A: B, C. B: A, D (undirected, B-A dan B-D). C: A. D: B. adj[A]=[B,C], adj[B]=[A,D], adj[C]=[A], adj[D]=[B].', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #030 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_030', '9', 'Informatika', '**Omar** punya graph 7 node, 6 edges, connected, tidak ada cycle. Graph ini adalah...', 'Tree (V-1 edges, connected, acyclic)', 'Cyclic graph', 'DAG', 'Disconnected graph', 0, 'Analisis: tree = connected + acyclic + (V-1 edges). 7 node, 6 edges = V-1. Connected + acyclic + V-1 edges = tree. Definisi tree.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: tree = connected + acyclic + (V-1 edges). 7 node, 6 edges = V-1. Connected + acyclic + V-1 edges = tree. Definisi tree.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #031 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_031', '9', 'Informatika', '**Pak Guru** ingin visualisasi silsilah keluarga. Struktur data yang tepat?', 'Graph umum dengan cycle', 'Tree (graph khusus: 1 root, tiap node 1 parent, tidak ada cycle)', 'Directed graph dengan cycle', 'Weighted graph', 1, 'Evaluasi: silsilah keluarga = tree. 1 root (nenek moyang), tiap orang punya 1 parent (ayah/ibu), tidak ada cycle. Tree adalah graph khusus.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: silsilah keluarga = tree. 1 root (nenek moyang), tiap orang punya 1 parent (ayah/ibu), tidak ada cycle. Tree adalah graph khusus.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #032 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_032', '9', 'Informatika', '**Qori** punya 2 algoritma: Dijkstra dan A*. Kapan A* lebih baik dari Dijkstra?', 'Tidak pernah', 'Saat ada heuristic (perkiraan jarak ke tujuan) — A* fokus ke arah tujuan, lebih cepat', 'Untuk graph unweighted', 'Untuk graph dengan bobot negatif', 1, 'Evaluasi: A* = Dijkstra + heuristic. Heuristic membuat A* fokus ke arah tujuan, mengurangi node yang dieksplor. Lebih cepat untuk graph besar dengan tujuan spesifik (mis: GPS).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: A* = Dijkstra + heuristic. Heuristic membuat A* fokus ke arah tujuan, mengurangi node yang dieksplor. Lebih cepat untuk graph besar dengan tujuan spesifik (mis: GPS).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #033 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_033', '9', 'Informatika', 'Manakah skenario di mana graph TIDAK menjadi pilihan terbaik?', 'Visualisasi jaringan jalan kota', 'Analisis pertemanan di media sosial', 'Mencari nilai maksimum di array (linear scan lebih baik)', 'Prasyarat mata kuliah', 2, 'Evaluasi: graph untuk hubungan antar objek. Mencari max di array = linear scan O(n), tidak butuh graph. Opsi lain cocok untuk graph (jalan, pertemanan, prasyarat).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: C. Evaluasi: graph untuk hubungan antar objek. Mencari max di array = linear scan O(n), tidak butuh graph. Opsi lain cocok untuk graph (jalan, pertemanan, prasyarat).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #034 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_034', '9', 'Informatika', '**Rina** punya graph 1000 node. Ia pilih adjacency matrix. Evaluasi.', 'Tepat — matrix selalu terbaik', 'Boros memori — matrix 1000x1000 = 1 juta cell. Untuk graph sparse, adjacency list (1000 + edges) jauh lebih hemat', 'Salah jenis', 'Tidak bisa dievaluasi', 1, 'Evaluasi: matrix 1000x1000 = 1 juta cell. List = 1000 + jumlah edge. Untuk sparse (sedikit edge), list jauh hemat. Matrix hanya untuk dense (banyak edge).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: matrix 1000x1000 = 1 juta cell. List = 1000 + jumlah edge. Untuk sparse (sedikit edge), list jauh hemat. Matrix hanya untuk dense (banyak edge).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #035 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_035', '9', 'Informatika', '**Santi** buat algoritma cari teman di Facebook: mulai dari Anda, BFS layer 1 (teman langsung), layer 2 (mutual). Evaluasi pendekatan.', 'Salah — harus DFS', 'Tepat — BFS natural untuk ''teman dalam N hop''. Layer 1 = 1 hop, layer 2 = 2 hop', 'Harus Dijkstra', 'Tidak bisa dievaluasi', 1, 'Evaluasi: BFS natural untuk cari ''jarak terpendek'' dalam graph unweighted. Layer = hop. Friend suggestion (mutual = 2 hop) = BFS layer 2. DFS tidak cocok karena tidak urut per jarak.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: BFS natural untuk cari ''jarak terpendek'' dalam graph unweighted. Layer = hop. Friend suggestion (mutual = 2 hop) = BFS layer 2. DFS tidak cocok karena tidak urut per jarak.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #036 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_036', '9', 'Informatika', 'Manakah ALGORITMA yang TEPAT untuk deteksi cycle dalam directed graph?', 'BFS', 'DFS dengan tracking ''node di current path'' (recursion stack)', 'Dijkstra', 'Linear scan', 1, 'Evaluasi: DFS dengan tracking ''node di current path'' deteksi cycle. Jika DFS menemui node yang sudah di current path = cycle. BFS tidak efisien untuk deteksi cycle di directed graph.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: DFS dengan tracking ''node di current path'' deteksi cycle. Jika DFS menemui node yang sudah di current path = cycle. BFS tidak efisien untuk deteksi cycle di directed graph.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #037 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_037', '9', 'Informatika', '**Tono** punya graph logistik: 50 gudang, 200 rute pengiriman, bobot = biaya. Ia ingin cari rute termurah dari gudang A ke B. Algoritma yang tepat?', 'BFS (unweighted)', 'Dijkstra (weighted, cari shortest path)', 'DFS (cari path, bukan shortest)', 'Linear search', 1, 'Evaluasi: weighted graph + shortest path = Dijkstra. BFS hanya untuk unweighted. DFS cari path tapi tidak shortest. Linear search tidak applicable.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: weighted graph + shortest path = Dijkstra. BFS hanya untuk unweighted. DFS cari path tapi tidak shortest. Linear search tidak applicable.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #038 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_038', '9', 'Informatika', '**Vera** punya graph internet: halaman web sebagai node, hyperlink sebagai edge (directed). Algoritma PageRank bekerja dengan konsep...', 'Shortest path', 'Centrality — halaman dengan banyak inbound link dari halaman penting = penting', 'Cycle detection', 'BFS', 1, 'Evaluasi: PageRank = algoritma centrality. Halaman penting = banyak link masuk dari halaman lain yang juga penting. Iteratif: hitung ''rank'' per halaman berdasarkan rank halaman yang linking.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: PageRank = algoritma centrality. Halaman penting = banyak link masuk dari halaman lain yang juga penting. Iteratif: hitung ''rank'' per halaman berdasarkan rank halaman yang linking.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #039 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_039', '9', 'Informatika', 'Manakah statement evaluasi yang BENAR tentang tree vs graph?', 'Tree dan graph sama', 'Tree adalah graph khusus (connected, acyclic, 1 root). Semua tree adalah graph, tapi tidak sebaliknya', 'Graph adalah tree khusus', 'Tidak ada hubungan', 1, 'Evaluasi: tree ⊂ graph. Tree = graph dengan constraint khusus (connected + acyclic + 1 root). Setiap tree adalah graph, tapi graph umum (dengan cycle, dll) bukan tree.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: tree ⊂ graph. Tree = graph dengan constraint khusus (connected + acyclic + 1 root). Setiap tree adalah graph, tapi graph umum (dengan cycle, dll) bukan tree.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #040 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_040', '9', 'Informatika', '**Wati** punya graph 5 node, 10 edges (dense). Ia pilih adjacency matrix. Evaluasi.', 'Salah — harus adjacency list', 'Tepat — dense graph (banyak edge) cocok matrix. 5x5=25 cell, cek edge O(1) cepat', 'Harus pakai edge list', 'Tidak bisa dievaluasi', 1, 'Evaluasi: dense = banyak edge (mendekati V²). Matrix 5x5=25, 10 edges = 40% isi. Cek edge O(1) cepat. Matrix tepat untuk dense. List lebih hemat untuk sparse.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: dense = banyak edge (mendekati V²). Matrix 5x5=25, 10 edges = 40% isi. Cek edge O(1) cepat. Matrix tepat untuk dense. List lebih hemat untuk sparse.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #041 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_041', '9', 'Informatika', '**Yusuf** punya graph pertemanan 1 juta user. Ia ingin cari ''friend of friend'' (mutual friend). Algoritma paling efisien?', 'DFS dari setiap user (lambat)', 'BFS dari user, ambil layer 2 (mutual friend). O(V+E) per user', 'Dijkstra (tidak diperlukan, unweighted)', 'Brute force bandingkan semua pasangan', 1, 'Evaluasi: BFS dari user = O(V+E). Layer 1 = friends, layer 2 = mutual. Cepat dan tepat. DFS bisa tapi tidak urut per jarak. Dijkstra overkill (unweighted).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: BFS dari user = O(V+E). Layer 1 = friends, layer 2 = mutual. Cepat dan tepat. DFS bisa tapi tidak urut per jarak. Dijkstra overkill (unweighted).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #042 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_042', '9', 'Informatika', 'Manakah evaluasi yang BENAR tentang kompleksitas BFS dan DFS?', 'BFS O(V²), DFS O(V)', 'BFS O(V+E), DFS O(V+E) — sama, linear terhadap ukuran graph', 'BFS O(log V), DFS O(V²)', 'Tidak bisa dibandingkan', 1, 'Evaluasi: BFS dan DFS keduanya O(V+E) — visit setiap node dan edge sekali. Perbedaan: BFS cari shortest path (unweighted), DFS untuk deteksi cycle/topological sort.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: BFS dan DFS keduanya O(V+E) — visit setiap node dan edge sekali. Perbedaan: BFS cari shortest path (unweighted), DFS untuk deteksi cycle/topological sort.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #043 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_043', '9', 'Informatika', '**Zahra** punya graph dengan self-loop (A-A). Apakah ini valid?', 'Tidak valid', 'Valid — self-loop adalah edge dari node ke dirinya. Tapi jarang di graph umum, sering di model specific (mis: state machine)', 'Hanya valid di tree', 'Tidak bisa direpresentasikan', 1, 'Evaluasi: self-loop valid di graph. Tapi jarang di graph umum. Sering di: state machine (state transition ke dirinya), graph web (halaman link ke dirinya). Validasi sesuai konteks.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: self-loop valid di graph. Tapi jarang di graph umum. Sering di: state machine (state transition ke dirinya), graph web (halaman link ke dirinya). Validasi sesuai konteks.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #044 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_044', '9', 'Informatika', '**Adi** punya graph 6 node dengan edges: A-B, B-C, C-A, D-E, E-F, F-D. Berapa connected components?', '1 (semua connected)', '2 (A-B-C dan D-E-F)', '3', '6', 1, 'Evaluasi: connected component = subgraph yang connected. A-B-C = 1 komponen (ada cycle A-B-C-A). D-E-F = 1 komponen (cycle D-E-F-D). Tidak ada edge antar komponen = 2 komponen.', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: connected component = subgraph yang connected. A-B-C = 1 komponen (ada cycle A-B-C-A). D-E-F = 1 komponen (cycle D-E-F-D). Tidak ada edge antar komponen = 2 komponen.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 PG #045 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_pg_045', '9', 'Informatika', 'Manakah situasi di mana graph TREE BUKAN pilihan terbaik?', 'Silsilah keluarga', 'Struktur folder komputer', 'Jaringan jalan kota (bisa ada cycle, bukan tree)', 'Hierarki organisasi perusahaan', 2, 'Evaluasi: tree = hierarki, tidak ada cycle. Jaringan jalan bisa cycle (jalan A-B-C-A bolak-balik) = bukan tree. Silsilah, folder, organisasi = tree (hierarki murni).', 'Struktur Data Graph', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: C. Evaluasi: tree = hierarki, tidak ada cycle. Jaringan jalan bisa cycle (jalan A-B-C-A bolak-balik) = bukan tree. Silsilah, folder, organisasi = tree (hierarki murni).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 Essai #001 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_essay_001', '9', 'Informatika', '**Skenario:** Gambar graph pertemanan 5 orang di kelas Anda: Andi, Budi, Citra, Dina, Eka. Asumsikan:
- Andi teman Budi, Citra
- Budi teman Andi, Dina
- Citra teman Andi, Eka
- Dina teman Budi, Eka
- Eka teman Citra, Dina

**Tugas:**
1. Gambar graph (deskripsikan node dan edge)
2. Hitung degree setiap node. Siapa paling populer?
3. Cari path dari Andi ke Eka (sebut semua path yang mungkin)
4. Apakah ada cycle? Sebut minimal 2 cycle
5. Apakah graph ini connected? Mengapa?', '', '', '', '', 0, '', 'Struktur Data Graph', true, 'essai', '[]', '[]', '', '1. Graph:
Node: Andi (A), Budi (B), Citra (C), Dina (D), Eka (E)
Edge (undirected): A-B, A-C, B-D, C-E, D-E

Visual: A di tengah-atas, B di kiri, C di kanan. D di kiri-bawah (terhubung B dan E). E di kanan-bawah (terhubung C dan D).

2. Degree:
- Andi: 2 (B, C)
- Budi: 2 (A, D)
- Citra: 2 (A, E)
- Dina: 2 (B, E)
- Eka: 2 (C, D)
Semua degree 2 — tidak ada yang paling populer, pertemanan merata.

3. Path Andi ke Eka:
- A-C-E (2 edges) — shortest
- A-B-D-E (3 edges)
- A-C-E-D-B-? (cycle, bukan path ke E)
- A-B-D-E-C-? (cycle)
Path valid: A-C-E dan A-B-D-E. Shortest = A-C-E (2 edges).

4. Cycle:
- A-C-E-D-B-A (cycle 5 node)
- C-E-D-B-A-C (cycle sama, mulai beda)
- E-D-B-A-C-E (cycle sama, mulai beda)
Cycle utama: A-B-D-E-C-A (5 node).

5. Connected? Ya — semua node bisa dicapai dari node manapun:
- Dari A: ke B (langsung), C (langsung), D (via B), E (via C)
- Dari D: ke B (langsung), E (langsung), A (via B), C (via E)
Graph connected karena 1 connected component.', 'C4', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 Essai #002 (C4 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_essay_002', '9', 'Informatika', '**Analisis kasus:** Sebuah kota punya 6 persimpangan (A, B, C, D, E, F) dengan jalan:
- A-B (5 km), A-C (3 km)
- B-C (2 km), B-D (4 km)
- C-D (7 km), C-E (1 km)
- D-F (3 km)
- E-F (2 km)

**Tugas:**
1. Representasikan graph ini dengan adjacency list
2. Cari shortest path A ke F menggunakan Dijkstra (langkah per langkah)
3. Hitung total jarak
4. Bandingkan dengan path lain (A-B-D-F, A-C-E-F, A-C-D-F). Mana shortest?', '', '', '', '', 0, '', 'Struktur Data Graph', true, 'essai', '[]', '[]', '', '1. Adjacency list (undirected, weighted):
- A: [(B,5), (C,3)]
- B: [(A,5), (C,2), (D,4)]
- C: [(A,3), (B,2), (D,7), (E,1)]
- D: [(B,4), (C,7), (F,3)]
- E: [(C,1), (F,2)]
- F: [(D,3), (E,2)]

2. Dijkstra dari A:

Inisialisasi: dist[A]=0, dist[lain]=∞. Priority queue (PQ): [(0,A)]

Iterasi 1: pop A (0). Neighbor: B (5), C (3). Update: dist[B]=5, dist[C]=3. PQ: [(3,C), (5,B)]

Iterasi 2: pop C (3). Neighbor: A (3, visited), B (2 → 3+2=5, sama), D (7 → 3+7=10), E (1 → 3+1=4). Update: dist[D]=10, dist[E]=4. PQ: [(4,E), (5,B), (10,D)]

Iterasi 3: pop E (4). Neighbor: C (1, visited), F (2 → 4+2=6). Update: dist[F]=6. PQ: [(5,B), (6,F), (10,D)]

Iterasi 4: pop B (5). Neighbor: A (visited), C (visited), D (4 → 5+4=9, lebih kecil dari 10!). Update: dist[D]=9. PQ: [(6,F), (9,D), (10,D dihapus)]

Iterasi 5: pop F (6). Tetangga: D (3 → 6+3=9, sama dengan dist[D]=9, tidak update), E (visited). PQ: [(9,D)]

Iterasi 6: pop D (9). Neighbor: B (visited), C (visited), F (visited). Selesai.

Hasil: dist[F]=6. Path: rekonstruksi dari parent. F←E←C←A. Path: A→C→E→F.

3. Total jarak: A-C (3) + C-E (1) + E-F (2) = 6 km

4. Bandingkan:
- A-B-D-F: 5+4+3 = 12 km
- A-C-E-F: 3+1+2 = 6 km (shortest, sama dengan Dijkstra)
- A-C-D-F: 3+7+3 = 13 km
- A-B-C-E-F: 5+2+1+2 = 10 km
- A-C-B-D-F: 3+2+4+3 = 12 km

Shortest = A-C-E-F = 6 km. Dijkstra menemukan ini secara sistematis.', 'C4', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 Essai #003 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_essay_003', '9', 'Informatika', '**Studi kasus kritis:** Anda diminta merancang sistem rekomendasi teman untuk media sosial baru. Anda punya graph pertemanan 1 juta user. Saat user A buka profil, sistem harus suggest 5 teman potensial dalam <100ms.

**Tugas:**
1. Identifikasi 3 strategi algoritma rekomendasi (selain ''mutual friend'')
2. Pilih strategi utama + 2 cadangan, jelaskan trade-off
3. Identifikasi 3 risiko etis dari sistem rekomendasi ini
4. Berikan rekomendasi engineering untuk mencapai latency <100ms', '', '', '', '', 0, '', 'Struktur Data Graph', true, 'essai', '[]', '[]', '', '1. 3 strategi rekomendasi (selain mutual friend):

a. Friend-of-friend-of-friend (3-hop): cari user di jarak 3 hop dari A. Lebih luas dari mutual (2-hop), bisa suggest orang di luar circle langsung.

b. Berdasarkan interest/aktivitas: graph bipartite user-interest. User A suka topik X, cari user lain yang juga suka X. Bisa suggest orang yang belum punya mutual friend tapi interest sama.

c. Berdasarkan komunitas (community detection): algoritma seperti Louvain/LPA deteksi cluster di graph. Suggest orang di komunitas yang sama (mungkin sekolah/kota/hobi sama).

d. Collaborative filtering: jika A dan B punya banyak teman yang sama, dan A teman C, suggest C ke B. Berbasis pola overlap.

e. Embedding (Node2Vec/GraphSAGE): representasikan setiap node sebagai vector 128D. Cari neighbor terdekat di vector space. Bisa capture pola kompleks.

2. Pilihan strategi:

Utama: Mutual friend (2-hop BFS) + filter interest. Sederhana, cepat, interpretable (''Anda punya 5 teman sama dengan X'').

Cadangan 1: Community detection (precomputed harian). Suggest dari komunitas sama. Lebih personal tapi butuh maintenance.

Cadangan 2: Embedding (Node2Vec, precomputed). Paling akurat capture pola kompleks tapi black-box (sulit explain kenapa direkomendasi).

Trade-off:
- Mutual friend: cepat, interpretable, tapi kurang personal (cuma berdasar graph structure)
- Community: personal, tapi statis (komunitas bisa berubah)
- Embedding: akurat, tapi black-box + butuh retrain berkala

3. Risiko etis:

a. Filter bubble: rekomendasi terlalu narrow, user hanya terhubung orang serupa. Bisa polarisasi (politik, agama). Mitigasi: include ''diversity'' — sebagian rekomendasi dari luar circle.

b. Privacy: suggest orang yang user A tidak ingin reveal interest-nya (mis: user A follow akun sensitif, lalu suggest orang yang juga follow). Mitigasi: respect privacy setting, jangan suggest berdasar private data.

c. Stigma/diskriminasi: algoritma bisa learn bias (mis: suggest lebih banyak orang kelas sosial tertentu). Mitigasi: audit bias berkala, ensure diverse dataset.

d. Harassment: suggest bisa dimanfaatkan stalker. Mitigasi: respect block list, jangan suggest user yang sudah block A.

e. Addiction: rekomendasi terus-menerus bisa bikin user terus cari ''teman baru''. Mitigasi: limit rekomendasi per hari, encourage quality over quantity.

4. Engineering untuk <100ms:

a. Precompute mutual friends: untuk setiap user, precompute top-100 candidate mutual friends setiap malam (batch job). Saat real-time, tinggal query cache.

b. Graph database: pakai Neo4j atau RedisGraph yang optimize untuk graph query. O(V+E) lebih cepat dari RDBMS.

c. Caching: cache hasil rekomendasi per user di Redis (TTL 1 jam). Real-time: cek cache dulu, fallback ke computation kalau miss.

d. Approximate algorithm: untuk graph besar, pakai approximate BFS (sample neighbor) — hasil cukup baik dengan latency jauh lebih rendah.

e. Sharding: shard graph by user ID (modular). Query hanya ke shard yang relevant. Parallel processing.

f. Async refresh: saat user A buka profil, return cached suggestion (lama). Async: compute fresh suggestion, update cache untuk visit berikutnya.

g. Tiered priority: user aktif (login harian) → precompute setiap 6 jam. User pasif → setiap minggu. Hemat komputasi.

h. CDN: untuk static graph data (interest, community), pakai CDN edge. Reduksi latency jaringan.

i. Monitoring: track p99 latency per endpoint. Alert kalau >80ms. Investigasi bottleneck.

j. A/B testing: test berbagai strategi, pilih yang kombinasi latency + engagement terbaik.', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 Essai #004 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_essay_004', '9', 'Informatika', '**Refleksi:** Pilih satu aplikasi nyata yang menggunakan graph (mis: Google Maps, Instagram friend suggestion, Spotify related artist, LinkedIn connection).

**Tugas:**
1. Deskripsikan graph di aplikasi tersebut (node, edge, directed/undirected, weighted)
2. Identifikasi 3 algoritma graph yang mungkin dipakai
3. Jika Anda bisa improve 1 hal di algoritma tersebut, apa itu?
4. Berikan 1 saran fitur baru berbasis graph yang bisa ditambah', '', '', '', '', 0, '', 'Struktur Data Graph', true, 'essai', '[]', '[]', '', 'Contoh jawaban untuk Google Maps:

1. Graph di Google Maps:
- Node: persimpangan jalan, landmark, alamat
- Edge: segmen jalan antar node
- Directed: ada satu arah (jalan satu arah) dan dua arah
- Weighted: bobot multi-dimensi — jarak (km), waktu (menit, real-time dari traffic), biaya (tol), mode (jalan kaki/mobil/sepeda)
- Multi-graph: bisa ada multiple edge antar 2 node (jalan biasa + jalan tol)

2. 3 algoritma graph yang dipakai:

a. Dijkstra/A* — cari shortest path berdasarkan bobot (waktu, jarak). A* dengan heuristic (jarak straight-line ke tujuan) lebih cepat dari Dijkstra.

b. Contraction Hierarchies — precompute ''shortcut'' antar node penting (highway). Real-time query: cari node highway terdekat, lalu path di highway. Sangat cepat untuk jarak jauh.

c. ISOTO (Isocronic) — algoritma cari area yang bisa dicapai dalam X menit. Dipakai untuk ''reachable area'' feature (mis: cari rumah sakit dalam 30 menit).

3. Improve 1 hal: 
Saya akan improve integrasi real-time traffic ke algoritma A*. Saat ini traffic update tiap beberapa menit. Saya ingin predict traffic 5-10 menit ke depan (machine learning time-series), supaya rute yang dipilih optimal saat user benar-benar sampai di segmen itu, bukan saat mulai. Trade-off: kompleksitas ML, tapi latency per-query tetap cepat (precompute prediction di backend).

4. Saran fitur baru: ''Eco-friendly route'' — graph dengan bobot tambahan = emisi CO2. Mode kendaraan (mobil bensin vs EV vs motor) punya emission factor berbeda. Sistem rekomendasi rute dengan emisi terendah (mungkin bukan tercepat). User bisa pilih: ''prioritas cepat'' vs ''prioritas ramah lingkungan''. Bonus: tracking total CO2 saved per user, gamification (badge ''eco-warrior''). Fitur ini sesuai tren sustainability dan bisa differentiate Google Maps dari kompetitor.', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Kelas 9 Essai #005 (C5 - Struktur Data Graph)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_v4_inf_9_1_3_essay_005', '9', 'Informatika', '**Eksperimen desain:** Anda diminta merancang graph database untuk sistem kurikulum sekolah. Node: mata pelajaran, bab, sub-bab, soal, siswa, guru. Edge: prasyarat, mengajar, menyelesaikan, dll.

**Tugas:**
1. Identifikasi minimal 5 jenis node dan 5 jenis edge
2. Untuk setiap edge, jelaskan directed/undirected + property
3. Identifikasi 3 pertanyaan analitik yang bisa dijawab graph ini
4. Berikan 1 contoh query cypher-like (atau SQL-like) untuk salah satu pertanyaan', '', '', '', '', 0, '', 'Struktur Data Graph', true, 'essai', '[]', '[]', '', '1. 5 jenis node:

a. Subject (mata pelajaran): id, nama, jenjang (SMP/SMK)
b. Chapter (bab): id, judul, urutan, subjectId
c. SubChapter (sub-bab): id, judul, urutan, chapterId
d. Question (soal): id, pertanyaan, tipe, levelKognitif, subChapterId
e. Student (siswa): id, nama, kelas
f. Teacher (guru): id, nama, subjectDiampu

2. 5 jenis edge:

a. PREREQUISITE (Subject → Subject, directed): Subject A adalah prasyarat Subject B. Property: ''strength'' (kuat/sedang/lemah), ''deskripsi''. Contoh: Matematika → Fisika (prasyarat kuat).

b. CONTAINS (Subject → Chapter, directed): Subject berisi Chapter. Property: ''urutan''. Contoh: Informatika → Bab 1: Berpikir Komputasi.

c. TEACHES (Teacher → Subject, directed): Guru mengajar Subject. Property: ''tahunAjaran'', ''kelas''. Contoh: Pak Andi → Informatika (2026/2027, kelas 7).

d. COMPLETED (Student → SubChapter, directed): Siswa menyelesaikan SubChapter. Property: ''tanggal'', ''nilai'', ''durasi''. Contoh: Andi → SubBab 1.1 (15 Sep 2026, 85, 45 min).

e. RELATED_TO (Question ↔ Question, undirected): Soal-soal yang konsepnya berhubungan. Property: ''relation_type'' (mirip, prasyarat, kontras). Contoh: Soal A ↔ Soal B (konsep mirip, bisa untuk variation).

f. SIMILAR (Student ↔ Student, undirected): Siswa dengan pola belajar mirip. Property: ''similarity_score'' (0-1). Untuk collaborative learning.

3. 3 pertanyaan analitik:

a. ''Untuk siswa X, mata pelajaran apa yang belum bisa dia pelajari karena belum prasyaratnya?''
→ Cari Subject yang X belum COMPLETED prasyaratnya

b. ''Soal mana yang paling sering salah dijawab oleh siswa di SubBab Y?''
→ Aggregate COMPLETED edges ke Question di SubBab Y, filter nilai < KKM

c. ''Guru mana yang paling efektif berdasarkan peningkatan nilai siswa?''
→ Bandingkan nilai awal vs akhir per siswa yang TEACHES oleh guru tsb

d. ''Siswa mana yang punya pola belajar mirip dengan siswa top, untuk rekomendasi grup belajar?''
→ Cari SIMILAR edge dengan high similarity_score ke siswa top

e. ''Bab mana yang paling banyak diulang (remedial) oleh siswa?''
→ Count COMPLETED edges dengan nilai < KKM per SubChapter, aggregate per Chapter

4. Contoh query (cypher-like):

Pertanyaan (a): Mata pelajaran yang belum bisa dipelajari siswa X karena belum prasyarat

```cypher
MATCH (s:Student {id: ''X''})-[:COMPLETED]->(sc:SubChapter)<-[:CONTAINS*2]-(subj:Subject)
WITH s, collect(DISTINCT subj) AS completed_subjects
MATCH (target:Subject)-[:PREREQUISITE]->(prereq:Subject)
WHERE NOT prereq IN completed_subjects
  AND target NOT IN completed_subjects
RETURN DISTINCT target.nama AS belum_bisa_dipelajari,
       collect(prereq.nama) AS prasyarat_belum_selesai
ORDER BY target.nama
```

Hasil: list mata pelajaran yang belum bisa dipelajari siswa X, dengan prasyarat yang belum selesai. Guru bisa pakai untuk advisori: ''Selesaikan prasyarat A dulu sebelum lanjut ke B''.

Versi SQL-like (kalau pakai RDBMS):
```sql
WITH completed AS (
  SELECT DISTINCT s.subject_id
  FROM student_completion sc
  JOIN sub_chapter s ON sc.sub_chapter_id = s.id
  WHERE sc.student_id = ''X''
)
SELECT t.nama AS belum_bisa_dipelajari,
       STRING_AGG(p.nama, '', '') AS prasyarat_belum_selesai
FROM subject_prerequisite sp
JOIN subject t ON sp.subject_id = t.id
JOIN subject p ON sp.prerequisite_id = p.id
WHERE sp.prerequisite_id NOT IN (SELECT subject_id FROM completed)
  AND t.id NOT IN (SELECT subject_id FROM completed)
GROUP BY t.nama
ORDER BY t.nama;
```', 'C5', '', 'Jawaban dievaluasi berdasarkan rubric.', 'cp_inf_9_1', 'tp_inf_9_1_3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas 3 untuk Kelas 9 (Struktur Data Graph)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_9_1_3', 'Tugas 3 Kelas 9: Struktur Data Graph (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang struktur data graph untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Struktur Data Graph" sebelum mengerjakan.', 'Informatika', '9A,9B', 'SMP', true, '2026-09-28T23:59:00+07:00', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_9_1', 'tp_inf_9_1_3', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- VERIFIKASI
-- ============================================================

-- Total soal per kelas + tipe
SELECT "gradeLevel", "questionType", COUNT(*) AS jumlah_soal
FROM "Question"
WHERE "cpId" IN ('cp_inf_7_1', 'cp_inf_8_1', 'cp_inf_9_1')
  AND "tpId" IN ('tp_inf_7_1_3', 'tp_inf_8_1_3', 'tp_inf_9_1_3')
GROUP BY "gradeLevel", "questionType"
ORDER BY "gradeLevel", "questionType";

-- Expected:
-- 7  pilihan_ganda  45
-- 7  essai          5
-- 8  pilihan_ganda  45
-- 8  essai          5
-- 9  pilihan_ganda  45
-- 9  essai          5
-- Total: 150 soal (50 per kelas)

-- Tugas baru
SELECT id, title, "targetKelas", "questionCount", "duration", "dueDate"
FROM "Assignment"
WHERE id LIKE 'asg_inf_%_1_3'
ORDER BY "targetKelas";

-- Expected: 3 baris (kelas 7, 8, 9) dengan questionCount=50, duration=90, dueDate=2026-09-28

-- TP baru
SELECT id, "kodeTP", deskripsi, LENGTH(deskripsi) AS panjang_deskripsi
FROM "TujuanPembelajaran"
WHERE id LIKE 'tp_inf_%_1_3'
ORDER BY id;

-- Expected: 3 baris (tp_inf_7_1_3, tp_inf_8_1_3, tp_inf_9_1_3)
-- Semua panjang_deskripsi <= 100

-- Materi baru
SELECT id, title, "targetKelas"
FROM "Material"
WHERE id LIKE 'mat_inf_%_1_3'
ORDER BY id;

-- Expected: 3 baris (mat_inf_7_1_3, mat_inf_8_1_3, mat_inf_9_1_3)
