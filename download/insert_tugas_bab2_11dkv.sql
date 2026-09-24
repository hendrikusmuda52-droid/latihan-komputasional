-- ============================================================
-- SKRIP SQL: Tugas Bab 2 untuk Kelas 11 DKV
-- Mata Pelajaran: Mata Pelajaran Pilihan
-- Bab 2: Memahami Komposisi Estetika Fotografi
-- Total: 55 soal (35 PG + 10 PG Kompleks + 10 Isian)
-- Bobot: PG 50%, PG Kompleks 30%, Isian 20% (total 100)
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
-- - Idempotent (ON CONFLICT DO NOTHING)
-- - Menggunakan CP yang SUDAH ADA: cp_dkv_pil_11_2
-- - Menggunakan TP yang SUDAH ADA: tp_dkv_pil_11_2_1
-- - Membuat 55 soal baru:
--   * 35 Pilihan Ganda (HOTS, C3/C4/C5)
--   * 10 Pilihan Ganda Kompleks (multi-answer)
--   * 10 Isian Singkat (4 salah + 2 benar + 1 paling benar)
-- - Membuat Assignment "Tugas Bab 2: Komposisi Estetika":
--   * questionCount = 55 (35 PG + 10 PG Kompleks + 10 Isian dalam tugas yang sama)
--   * duration = 90 menit
--   * dueDate = 28 September 2026 23:59 WIB
--   * taskType = quiz_only
--
-- Bobot nilai (di-handle frontend quiz-stage.tsx):
-- - PG (35 soal × ~1.43 poin) = 50 poin
-- - PG Kompleks (10 soal × 3 poin) = 30 poin
-- - Isian (10 soal × 2 poin) = 20 poin
-- - Total: 100 poin
-- ============================================================


-- ============================================================
-- 35 SOAL PILIHAN GANDA (HOTS, C3/C4/C5)
-- Bobot: 50% (1.43 poin per soal)
-- ============================================================


-- PG #001 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_001', '11DKV', 'Mata Pelajaran Pilihan', '**Andi** memotret pemandangan gunung dan ingin gunung tampak lebih dominan. Aturan komposisi yang paling tepat digunakan adalah...', 'Rule of Thirds (garis horisontal di bawah)', 'Rule of Thirds (garis horisontal di atas, gunung dominan di 2/3 bawah)', 'Leading Lines', 'Framing', 1, 'Untuk membuat gunung dominan, gunakan Rule of Thirds dengan garis horisontal di atas sehingga gunung mengisi 2/3 bawah frame.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Untuk membuat gunung dominan, gunakan Rule of Thirds dengan garis horisontal di atas sehingga gunung mengisi 2/3 bawah frame.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #002 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_002', '11DKV', 'Mata Pelajaran Pilihan', '**Siti** ingin memotret subjek manusia dengan latar belakang kabur (bokeh). Konsep estetika yang ia terapkan adalah...', 'Depth of Field dangkal (aperture besar f/1.8)', 'Depth of Field dalam (aperture kecil f/16)', 'Leading lines', 'Symmetry', 0, 'Depth of Field dangkal dengan aperture besar (f/1.8) menghasilkan latar belakang kabur (bokeh), fokus ke subjek.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: A. Depth of Field dangkal dengan aperture besar (f/1.8) menghasilkan latar belakang kabur (bokeh), fokus ke subjek.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #003 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_003', '11DKV', 'Mata Pelajaran Pilihan', 'Aturan **Rule of Thirds** membagi frame menjadi...', '2 bagian sama besar', '3 bagian horizontal dan 3 bagian vertikal (9 kotak, 4 titik temu)', '4 bagian diagonal', 'Lingkaran konsentris', 1, 'Rule of Thirds membagi frame jadi 3 horizontal × 3 vertikal = 9 kotak, dengan 4 titik temu (power points) sebagai posisi ideal subjek.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Rule of Thirds membagi frame jadi 3 horizontal × 3 vertikal = 9 kotak, dengan 4 titik temu (power points) sebagai posisi ideal subjek.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #004 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_004', '11DKV', 'Mata Pelajaran Pilihan', '**Budi** memotret jalan yang membentang ke horison, jalanan terlihat menyempit di kejauhan. Komposisi yang otomatis terbentuk adalah...', 'Symmetry', 'Leading Lines (garis panduan mata ke titik hilang)', 'Framing', 'Pattern', 1, 'Jalanan yang menyempit ke horison membentuk leading lines yang memandu mata ke titik hilang (vanishing point).', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Jalanan yang menyempit ke horison membentuk leading lines yang memandu mata ke titik hilang (vanishing point).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #005 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_005', '11DKV', 'Mata Pelajaran Pilihan', 'Kontras warna **komplementer** terjadi antara...', 'Merah-hijau, biru-oranye, kuning-ungu (berseberangan di color wheel)', 'Merah-kuning (berdekatan)', 'Biru-hijau (analog)', 'Hitam-putih (netral)', 0, 'Warna komplementer = berseberangan di color wheel: merah-hijau, biru-oranye, kuning-ungu. Kontras ini sangat kuat secara visual.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: A. Warna komplementer = berseberangan di color wheel: merah-hijau, biru-oranye, kuning-ungu. Kontras ini sangat kuat secara visual.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #006 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_006', '11DKV', 'Mata Pelajaran Pilihan', '**Dina** memotret bayangan cermin di danau, gunung dan pantulan terlihat simetris. Komposisi yang terbentuk...', 'Symmetry (simetri refleksi)', 'Rule of Thirds', 'Negative space', 'Pattern', 0, 'Pantulan cermin di air menciptakan simetri refleksi — subjek dan bayangan saling cermin di garis horisontal.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: A. Pantulan cermin di air menciptakan simetri refleksi — subjek dan bayangan saling cermin di garis horisontal.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #007 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_007', '11DKV', 'Mata Pelajaran Pilihan', 'Konsep **negative space** dalam fotografi adalah...', 'Ruang kosong di sekitar subjek utama untuk menonjolkan subjek', 'Ruang untuk teks', 'Background hitam', 'Ruang di luar frame', 0, 'Negative space = ruang kosong di sekitar subjek. Ini menonjolkan subjek dan menciptakan kesan minimalis/dramatis.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: A. Negative space = ruang kosong di sekitar subjek. Ini menonjolkan subjek dan menciptakan kesan minimalis/dramatis.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #008 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_008', '11DKV', 'Mata Pelajaran Pilihan', '**Eka** memotret sepuluh kacamata yang tersusun rapi di etalase. Komposisi yang terbentuk...', 'Pattern (pola berulang)', 'Leading lines', 'Symmetry', 'Negative space', 0, 'Susunan rapi benda berulang (kacamata) membentuk pattern — pola berulang yang menarik secara visual.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: A. Susunan rapi benda berulang (kacamata) membentuk pattern — pola berulang yang menarik secara visual.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #009 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_009', '11DKV', 'Mata Pelajaran Pilihan', 'Aperture f/2.8 akan menghasilkan depth of field yang lebih...', 'Dalam (semua tajam)', 'Dangkal (subjek tajam, background kabur)', 'Tidak ada efek', 'Selalu tajam', 1, 'Aperture besar (f/2.8, f/1.8, f/1.4) = Depth of Field dangkal. Subjek tajam, background/foreground kabur (bokeh).', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Aperture besar (f/2.8, f/1.8, f/1.4) = Depth of Field dangkal. Subjek tajam, background/foreground kabur (bokeh).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #010 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_010', '11DKV', 'Mata Pelajaran Pilihan', '**Fajar** ingin foto produk makanan yang tajam dari depan sampai belakang. Setting aperture yang tepat...', 'f/1.8 (DOF dangkal)', 'f/16 (DOF dalam, semua tajam)', 'f/2.8', 'f/4', 1, 'Untuk semua tajam (DOF dalam), gunakan aperture kecil f/16 atau lebih. Sering dipakai di food photography, landscape.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Untuk semua tajam (DOF dalam), gunakan aperture kecil f/16 atau lebih. Sering dipakai di food photography, landscape.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #011 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_011', '11DKV', 'Mata Pelajaran Pilihan', 'Konsep **framing** dalam komposisi fotografi berarti...', 'Memberi bingkai foto di digital', 'Menggunakan elemen sekitar (jendela, pintu, cabang pohon) sebagai bingkai alami subjek', 'Mengatur ukuran cetak', 'Menggunakan filter bingkai', 1, 'Framing = gunakan elemen sekitar (jendela, daun, lengkung pintu) sebagai ''bingkai alami'' yang mengelilingi subjek.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Framing = gunakan elemen sekitar (jendela, daun, lengkung pintu) sebagai ''bingkai alami'' yang mengelilingi subjek.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #012 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_012', '11DKV', 'Mata Pelajaran Pilihan', '**Gita** memotret fashion model. Ia ingin model jadi fokus utama, background polos dan tidak mengganggu. Strategi komposisinya...', 'Pattern background ramai', 'Negative space + DOF dangkal (background kabur)', 'Leading lines ke background', 'Symmetry dengan background rumit', 1, 'Kombinasi negative space (background polos) + DOF dangkal (background kabur) paling efektif untuk isolasi subjek fashion.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', 'Jawaban benar: B. Kombinasi negative space (background polos) + DOF dangkal (background kabur) paling efektif untuk isolasi subjek fashion.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #013 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_013', '11DKV', 'Mata Pelajaran Pilihan', 'Perhatikan deskripsi foto: subjek diletakkan tepat di tengah frame, latar belakang simetris. Analisis: aturan komposisi apa yang dipakai DAN kapan efektif?', 'Rule of Thirds — selalu efektif', 'Symmetry — efektif untuk arsitektur, refleksi, formal portrait', 'Leading lines — efektif untuk landscape', 'Pattern — efektif untuk close-up', 1, 'Analisis: subjek di tengah + latar simetris = komposisi symmetry. Efektif untuk: arsitektur (jembatan, gedung), refleksi (cermin/air), formal portrait.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: subjek di tengah + latar simetris = komposisi symmetry. Efektif untuk: arsitektur (jembatan, gedung), refleksi (cermin/air), formal portrait.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #014 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_014', '11DKV', 'Mata Pelajaran Pilihan', '**Hadi** memotret produk jam tangan. Ia pakai aperture f/16. Background terlihat tajam dan mengganggu. Analisis masalah + solusi:', 'Masalah: overexposed. Solusi: ISO rendah', 'Masalah: DOF terlalu dalam, background mengganggu. Solusi: aperture besar f/2.8 untuk isolasi subjek', 'Masalah: subjek blur. Solusi: tripod', 'Tidak ada masalah', 1, 'Analisis: f/16 = DOF dalam = background tajam. Untuk produk, biasanya background kabur agar subjek menonjol. Solusi: aperture besar f/2.8.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: f/16 = DOF dalam = background tajam. Untuk produk, biasanya background kabur agar subjek menonjol. Solusi: aperture besar f/2.8.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #015 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_015', '11DKV', 'Mata Pelajaran Pilihan', '**Ira** memotret dua subjek yang berdiri berhadapan. Ia ingin konflik/ketegangan terasa. Strategi komposisi terbaik?', 'Symmetry (simetri harmonis)', 'Asimetri + leading lines yang berlawanan arah (ketegangan visual)', 'Pattern', 'Negative space', 1, 'Analisis: simetri = harmoni. Asimetri + leading lines berlawanan = ketegangan/konflik visual. Cocok untuk dramatisasi konflik.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: simetri = harmoni. Asimetri + leading lines berlawanan = ketegangan/konflik visual. Cocok untuk dramatisasi konflik.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #016 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_016', '11DKV', 'Mata Pelajaran Pilihan', 'Seorang fotografer memotret dengan garis horisontal tepat di tengah (50-50 langit-darat). Analisis dampak visual:', 'Dinamis dan menarik', 'Statis dan membosankan (tidak ada focus). Rule of Thirds (1/3-2/3) lebih dinamis', 'Salah secara teknis', 'Selalu bagus', 1, 'Analisis: horison di tengah (50-50) = statis, tidak ada emphasis. Rule of Thirds (1/3 langit + 2/3 darat, atau kebalikannya) lebih dinamis.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: horison di tengah (50-50) = statis, tidak ada emphasis. Rule of Thirds (1/3 langit + 2/3 darat, atau kebalikannya) lebih dinamis.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #017 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_017', '11DKV', 'Mata Pelajaran Pilihan', '**Joko** memotret pasar tradisional. Banyak orang, barang, warna. Foto terlihat berantakan. Analisis + solusi komposisi:', 'Salah subjek. Ganti ke landscape', 'Terlalu banyak elemen. Solusi: framing (isolasi 1 pedagang di antara tenda), atau leading lines ke 1 subjek fokus', 'Tambah elemen lain', 'Salah aperture', 1, 'Analisis: clutter visual. Solusi: framing (gunakan tenda/kain sebagai bingkai alami isolasi 1 subjek) atau leading lines ke subjek fokus.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: clutter visual. Solusi: framing (gunakan tenda/kain sebagai bingkai alami isolasi 1 subjek) atau leading lines ke subjek fokus.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #018 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_018', '11DKV', 'Mata Pelajaran Pilihan', 'Kontras **warna hangat vs dingin** dalam foto sunset (oranye langit + biru air) menciptakan...', 'Monotoni', 'Keseimbangan visual yang dinamis (warm-cool color theory)', 'Distorsi', 'Blur', 1, 'Analisis: hangat (oranye/merah/kuning) vs dingin (biru/hijau) = kontras warna complementary. Menciptakan keseimbangan dinamis.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: hangat (oranye/merah/kuning) vs dingin (biru/hijau) = kontras warna complementary. Menciptakan keseimbangan dinamis.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #019 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_019', '11DKV', 'Mata Pelajaran Pilihan', '**Kiki** memotret arsitektur gedung tinggi dari bawah. Garis vertikal bangunan terlihat konvergen (bertemu di atas). Efek ini disebut...', 'Distorsi lensa (perspektive distortion) — sering dihindari di arsitektur formal, tapi bisa dramatic', 'Symmetry', 'Pattern', 'Negative space', 0, 'Analisis: foto dari bawah bangunan tinggi = perspektive distortion (garis konvergen). Bisa unwanted (arsitektur formal butuh tilt-shift lens), atau dramatic (artistic).', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: A. Analisis: foto dari bawah bangunan tinggi = perspektive distortion (garis konvergen). Bisa unwanted (arsitektur formal butuh tilt-shift lens), atau dramatic (artistic).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #020 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_020', '11DKV', 'Mata Pelajaran Pilihan', '**Lia** memotret potret wajah dengan mata subjek di titik temu Rule of Thirds (power point). Analisis dampak:', 'Salah — harus di tengah', 'Tepat — mata di power point menciptakan keseimbangan + dinamis. Pengamat merasa ''terhubung'' dengan subjek', 'Tidak ada efek', 'Harus mata di pinggir', 1, 'Analisis: mata di power point Rule of Thirds = komposisi potret klasik. Dinamis + seimbang, pengamat merasa terhubung dengan subjek.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: mata di power point Rule of Thirds = komposisi potret klasik. Dinamis + seimbang, pengamat merasa terhubung dengan subjek.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #021 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_021', '11DKV', 'Mata Pelajaran Pilihan', 'Seorang fotografer street photography ingin foto terlihat candid/tidak terencana. Komposisi yang TEPAT?', 'Symmetry sempurna', 'Asimetri + sedikit off-balance (candid feel) + leading lines natural (jalan, kerumunan)', 'Pattern rapi', 'Negative space besar', 1, 'Analisis: street photography candid = asimetri + off-balance + leading lines natural (jalan, kerumunan). Hindari komposisi terlalu rapi/formal.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: street photography candid = asimetri + off-balance + leading lines natural (jalan, kerumunan). Hindari komposisi terlalu rapi/formal.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #022 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_022', '11DKV', 'Mata Pelajaran Pilihan', '**Maman** memotret macro bunga. Ia pakai aperture f/4. Hanya sebagian bunga tajam, sebagian blur. Analisis:', 'Salah — macro harus semua tajam', 'Tepat — macro dengan DOF dangkal menciptakan isolasi + fokus ke detail tertentu (benang sari, kelopak)', 'Harus f/22', 'Tidak ada efek', 1, 'Analisis: macro photography sering pakai DOF dangkal (f/4-f/8) untuk isolasi detail. f/22 (DOF dalam) butuh tripod + lighting kuat, jarang praktis.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: macro photography sering pakai DOF dangkal (f/4-f/8) untuk isolasi detail. f/22 (DOF dalam) butuh tripod + lighting kuat, jarang praktis.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #023 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_023', '11DKV', 'Mata Pelajaran Pilihan', 'Foto hitam-putih (B&W) yang menarik biasanya punya...', 'Banyak warna', 'Kontras tonal yang kuat (hitam pekat + putih bersih + gradasi abu-abu)', 'Hanya abu-abu', 'Tidak ada kontras', 1, 'Analisis: B&W tidak punya warna, jadi fokus ke kontras tonal (terang-gelap) + tekstur + bentuk. Kontras tonal kuat = foto B&W menarik.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: B&W tidak punya warna, jadi fokus ke kontras tonal (terang-gelap) + tekstur + bentuk. Kontras tonal kuat = foto B&W menarik.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #024 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_024', '11DKV', 'Mata Pelajaran Pilihan', '**Nina** memotret silhouette orang di sunset. Subjek hitam pekat, langit berwarna. Analisis dampak estetika:', 'Salah — subjek harus terlihat', 'Tepat — silhouette menonjolkan bentuk (shape) + dramatis. Subjek jadi simbolik, bukan detail', 'Harus pakai flash', 'Tidak menarik', 1, 'Analisis: silhouette = expose untuk background (langit), subjek jadi hitam pekat. Menonjolkan bentuk (shape) + dramatis + simbolik.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', 'Jawaban benar: B. Analisis: silhouette = expose untuk background (langit), subjek jadi hitam pekat. Menonjolkan bentuk (shape) + dramatis + simbolik.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #025 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_025', '11DKV', 'Mata Pelajaran Pilihan', '**Omar** punya 2 foto potret: (A) Subjek di tengah, simetri sempurna, formal. (B) Subjek di Rule of Thirds, candid, natural. Mana lebih baik?', 'A selalu lebih baik (formal)', 'B selalu lebih baik (dinamis)', 'Tergantung tujuan: A untuk formal/official (paspor, korporat), B untuk natural/lifestyle (magazine, personal). Konteks menentukan', 'Keduanya buruk', 2, 'Evaluasi: tidak ada ''lebih baik'' absolut. A cocok untuk formal (paspor, ID, korporat). B cocok untuk natural (magazine, lifestyle). Konteks komunikasi menentukan.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: C. Evaluasi: tidak ada ''lebih baik'' absolut. A cocok untuk formal (paspor, ID, korporat). B cocok untuk natural (magazine, lifestyle). Konteks komunikasi menentukan.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #026 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_026', '11DKV', 'Mata Pelajaran Pilihan', 'Manakah yang BUKAN prinsip komposisi fotografi yang baik?', 'Rule of Thirds', 'Leading lines', 'Selalu pusatkan subjek (pakistan center — monoton, hindari)', 'Negative space', 2, 'Evaluasi: ''selalu pusatkan'' = monoton. Pusat kadang OK (symmetry, formal), tapi tidak selalu. Variasikan dengan Rule of Thirds, off-center.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: C. Evaluasi: ''selalu pusatkan'' = monoton. Pusat kadang OK (symmetry, formal), tapi tidak selalu. Variasikan dengan Rule of Thirds, off-center.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #027 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_027', '11DKV', 'Mata Pelajaran Pilihan', '**Qori** mengevaluasi 3 foto wedding-nya: (1) Rule of Thirds, (2) Symmetry, (3) Negative space. Mana paling cocok untuk ''first kiss moment''?', '(1) Rule of Thirds — dinamis', '(2) Symmetry — formal/seimbang', '(3) Negative space — dramatis/intim (subjek kecil di ruang besar, fokus ke momen)', 'Semua sama', 2, 'Evaluasi: ''first kiss'' = momen intim/dramatis. Negative space (subjek kecil di ruang besar) paling efektif menonjolkan intimasi + dramatis. Symmetry bisa terlalu kaku untuk momen emosional.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: C. Evaluasi: ''first kiss'' = momen intim/dramatis. Negative space (subjek kecil di ruang besar) paling efektif menonjolkan intimasi + dramatis. Symmetry bisa terlalu kaku untuk momen emosional.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #028 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_028', '11DKV', 'Mata Pelajaran Pilihan', 'Manakah strategi komposisi untuk foto produk e-commerce (Shopee/Tokopedia)?', 'Candid + bokeh ekstrem', 'Background putih polos + subjek tengah + DOF dalam (semua tajam, jelas) — standar marketplace', 'Negative space ekstrem', 'Symmetry asimetris', 1, 'Evaluasi: e-commerce butuh foto produk JELAS (detail terlihat, background tidak ganggu). Background putih + DOF dalam = standar marketplace. Bokeh ekstrem justru mengganggu detail produk.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: e-commerce butuh foto produk JELAS (detail terlihat, background tidak ganggu). Background putih + DOF dalam = standar marketplace. Bokeh ekstrem justru mengganggu detail produk.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #029 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_029', '11DKV', 'Mata Pelajaran Pilihan', '**Rina** mengevaluasi foto street-nya: terlalu banyak elemen, subjek tenggelam. Rekomendasi perbaikan?', 'Tambah elemen lain', 'Crop tighter ke subjek + gunakan framing (jendela/pintu) untuk isolasi + leading lines ke subjek', 'Ganti lensa', 'Hapus foto', 1, 'Evaluasi: clutter visual. Solusi: crop tighter (subyek dominan), framing (isolasi), leading lines (guide mata ke subjek). Reduksi elemen agar subjek menonjol.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: clutter visual. Solusi: crop tighter (subyek dominan), framing (isolasi), leading lines (guide mata ke subjek). Reduksi elemen agar subjek menonjol.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #030 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_030', '11DKV', 'Mata Pelajaran Pilihan', 'Untuk foto **makanan** (food photography), kombinasi komposisi terbaik?', 'Top-down (flat lay) + DOF dalam + props minimal', 'Eye-level + DOF dangkal + props ramai', 'Bottom-up + negative space', 'Side angle + symmetry', 0, 'Evaluasi: food photography sering pakai top-down (flat lay) + DOF dalam (semua tajam) + props minimal (sendok/garnish). Tren Instagram-style. Eye-level + DOF dangkal untuk dramatic shot.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: A. Evaluasi: food photography sering pakai top-down (flat lay) + DOF dalam (semua tajam) + props minimal (sendok/garnish). Tren Instagram-style. Eye-level + DOF dangkal untuk dramatic shot.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #031 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_031', '11DKV', 'Mata Pelajaran Pilihan', '**Santi** punya foto landscape dengan foreground (batu) + midground (danau) + background (gunung). Komposisi ini disebut...', 'Symmetry', 'Foreground-midground-background layering (depth composition) — menciptakan kedalaman 3D', 'Pattern', 'Framing', 1, 'Evaluasi: foreground-midground-background layering menciptakan depth (kedalaman 3D di foto 2D). Pembaca mata ''tour'' dari depan ke belakang, merasa immersive.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: foreground-midground-background layering menciptakan depth (kedalaman 3D di foto 2D). Pembaca mata ''tour'' dari depan ke belakang, merasa immersive.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #032 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_032', '11DKV', 'Mata Pelajaran Pilihan', 'Manakah evaluasi BENAR tentang **golden ratio** (1:1.618) dalam fotografi?', 'Selalu lebih baik dari Rule of Thirds', 'Alternatif Rule of Thirds dengan kurva spiral. Tidak selalu lebih baik — pilihan estetika. Rule of Thirds lebih mudah + umum', 'Tidak ada di fotografi', 'Hanya untuk portrait', 1, 'Evaluasi: golden ratio (phi) = alternatif Rule of Thirds dengan kurva spiral. Estetik, tapi tidak ''lebih baik'' absolut. Rule of Thirds lebih simple + populer.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: golden ratio (phi) = alternatif Rule of Thirds dengan kurva spiral. Estetik, tapi tidak ''lebih baik'' absolut. Rule of Thirds lebih simple + populer.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #033 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_033', '11DKV', 'Mata Pelajaran Pilihan', '**Tono** mengevaluasi foto arsitektur modern-nya: garis-garis tegas, banyak sudut, simetri kuat. Estetika yang dihasilkan?', 'Romantis', 'Modern/minimalis — geometric composition (bentuk geometris dominan) cocok untuk arsitektur kontemporer', 'Vintage', 'Tidak ada estetika', 1, 'Evaluasi: garis tegas + sudut + simetri = geometric composition. Estetika modern/minimalis, cocok arsitektur kontemporer, brutalist, abstract.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: garis tegas + sudut + simetri = geometric composition. Estetika modern/minimalis, cocok arsitektur kontemporer, brutalist, abstract.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #034 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_034', '11DKV', 'Mata Pelajaran Pilihan', 'Untuk foto **black & white street photography**, elemen yang PALING penting?', 'Warna', 'Kontras tonal + tekstur + pola + shape (karena tidak ada warna, semua harus lewat tonalitas/bentuk)', 'Bokeh', 'Vibrance', 1, 'Evaluasi: B&W hilangkan warna, jadi fokus ke: kontras tonal (terang-gelap), tekstur, pola, shape. Komposisi harus kuat karena tidak ada warna sebagai ''penolong''.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: B&W hilangkan warna, jadi fokus ke: kontras tonal (terang-gelap), tekstur, pola, shape. Komposisi harus kuat karena tidak ada warna sebagai ''penolong''.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #035 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pg_035', '11DKV', 'Mata Pelajaran Pilihan', '**Vera** mengevaluasi 2 foto produk: (A) Background ramai pattern, (B) Background putih polos. Untuk iklan billboard, mana lebih baik?', '(A) — lebih artistik', '(B) — background polos = subjek menonjol + teks iklan bisa diletakkan di ruang kosong (negative space)', 'Sama saja', 'Keduanya buruk', 1, 'Evaluasi: billboard butuh pesan cepat + teks ruang kosong. (B) background polos = subjek menonjol + ruang untuk headline/CTA. (A) ramai = pesan hilang.', 'Komposisi & Estetika', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', 'Jawaban benar: B. Evaluasi: billboard butuh pesan cepat + teks ruang kosong. (B) background polos = subjek menonjol + ruang untuk headline/CTA. (A) ramai = pesan hilang.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 10 SOAL PILIHAN GANDA KOMPLEKS (multi-answer)
-- Bobot: 30% (3 poin per soal)
-- ============================================================


-- PG Kompleks #001 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_001', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA aturan komposisi yang dapat dipakai untuk memotret pemandangan gunung (landscape):', 'Rule of Thirds (horison di 1/3 atas/bawah)', 'Leading Lines (jalan/sungai ke gunung)', 'Framing (cabang pohon sebagai bingkai)', 'Symmetry (jika ada pantulan danau)', 0, 'Semua 4 opsi adalah komposisi yang valid untuk landscape: Rule of Thirds, Leading Lines, Framing, dan Symmetry (jika ada refleksi).', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2,3]', '[]', '', '', 'C4', 'Jawaban benar: A, B, C, D. Semua 4 opsi adalah komposisi yang valid untuk landscape: Rule of Thirds, Leading Lines, Framing, dan Symmetry (jika ada refleksi).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #002 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_002', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang termasuk kontras warna KOMPLEMENTER (berseberangan di color wheel):', 'Merah-hijau', 'Biru-oranye', 'Kuning-ungu', 'Merah-kuning (analog)', 0, 'Komplementer = berseberangan color wheel: merah-hijau, biru-oranye, kuning-ungu. Merah-kuning = analog (berdekatan).', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', 'Jawaban benar: A, B, C. Komplementer = berseberangan color wheel: merah-hijau, biru-oranye, kuning-ungu. Merah-kuning = analog (berdekatan).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #003 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_003', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang akan menghasilkan Depth of Field DANGKAL (background kabur):', 'Aperture besar (f/1.4, f/1.8, f/2.8)', 'Subjek dekat ke kamera', 'Lensa telephoto (85mm, 135mm)', 'Aperture kecil (f/16, f/22)', 0, 'DOF dangkal: aperture besar + subjek dekat + lensa telephoto. Aperture kecil (f/16) = DOF dalam (semua tajam).', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', 'Jawaban benar: A, B, C. DOF dangkal: aperture besar + subjek dekat + lensa telephoto. Aperture kecil (f/16) = DOF dalam (semua tajam).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #004 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_004', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA komposisi yang cocok untuk FOTOGRAFI PORTRAIT:', 'Rule of Thirds (mata di power point)', 'Negative space (subjek kecil, dramatis)', 'Symmetry (formal portrait)', 'Leading lines (garis tubuh ke wajah)', 0, 'Semua 4 opsi valid untuk portrait: Rule of Thirds, Negative space (dramatis), Symmetry (formal), Leading lines (garis tubuh/lengan ke wajah).', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2,3]', '[]', '', '', 'C4', 'Jawaban benar: A, B, C, D. Semua 4 opsi valid untuk portrait: Rule of Thirds, Negative space (dramatis), Symmetry (formal), Leading lines (garis tubuh/lengan ke wajah).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #005 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_005', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA prinsip yang membuat foto BLACK & WHITE kuat:', 'Kontras tonal (hitam-putih tegas)', 'Tekstur (detail permukaan)', 'Pola (pattern berulang)', 'Banyak warna saturasi tinggi', 0, 'B&W fokus ke: kontras tonal, tekstur, pola, shape. Banyak warna tidak relevan (B&W tidak ada warna). Saturasi tinggi = konsep color, bukan B&W.', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C5', 'Jawaban benar: A, B, C. B&W fokus ke: kontras tonal, tekstur, pola, shape. Banyak warna tidak relevan (B&W tidak ada warna). Saturasi tinggi = konsep color, bukan B&W.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #006 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_006', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang termasuk komposisi fotografi:', 'Rule of Thirds', 'Leading Lines', 'Symmetry', 'ISO 3200', 0, 'Rule of Thirds, Leading Lines, Symmetry = komposisi (estetika penataan). ISO 3200 = setting eksposur (teknis), bukan komposisi.', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', 'Jawaban benar: A, B, C. Rule of Thirds, Leading Lines, Symmetry = komposisi (estetika penataan). ISO 3200 = setting eksposur (teknis), bukan komposisi.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #007 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_007', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA situasi di mana SYMMETRY komposisi efektif:', 'Arsitektur (gedung, jembatan)', 'Refleksi (cermin, danau)', 'Formal portrait (paspor, korporat)', 'Street photography candid', 0, 'Symmetry efektif untuk: arsitektur (formal/rapi), refleksi (cermin/air), formal portrait. Street candid biasanya asimetris (candid feel).', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', 'Jawaban benar: A, B, C. Symmetry efektif untuk: arsitektur (formal/rapi), refleksi (cermin/air), formal portrait. Street candid biasanya asimetris (candid feel).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #008 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_008', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang akan MEMPERKUAT komposisi foto produk (e-commerce):', 'Background putih polos', 'DOF dalam (semua tajam)', 'Pencahayaan rata (even lighting)', 'Background pattern ramai', 0, 'E-commerce: background putih + DOF dalam + lighting rata = produk JELAS. Background ramai = ganggu produk, hindari.', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C5', 'Jawaban benar: A, B, C. E-commerce: background putih + DOF dalam + lighting rata = produk JELAS. Background ramai = ganggu produk, hindari.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #009 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_009', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang termasuk leading lines (garis panduan mata):', 'Jalan yang menyempit ke horison', 'Rel kereta api', 'Garis pantai', 'Langit biru polos', 0, 'Leading lines: jalan, rel kereta, garis pantai = garis yang memandu mata. Langit biru polos = tidak ada garis (negative space).', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', 'Jawaban benar: A, B, C. Leading lines: jalan, rel kereta, garis pantai = garis yang memandu mata. Langit biru polos = tidak ada garis (negative space).', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG Kompleks #010 (C5 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_pgk_010', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA kesalahan komposisi yang harus dihindari:', 'Horison miring (kecuali intentional)', 'Subjek terpotong di tepi frame', 'Distorsi perspektif pada arsitektur formal (kecuali artistic)', 'Rule of Thirds', 0, 'Hindari: horison miring (kecuali intentional), subjek terpotong, distorsi arsitektur formal. Rule of Thirds = prinsip BAIK, bukan kesalahan.', 'Komposisi & Estetika', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C5', 'Jawaban benar: A, B, C. Hindari: horison miring (kecuali intentional), subjek terpotong, distorsi arsitektur formal. Rule of Thirds = prinsip BAIK, bukan kesalahan.', 'Opsi lain tidak tepat karena tidak sesuai konsep.', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 10 SOAL ISIAN SINGKAT
-- Format: shortAnswer = "right1|right2|best" (3 accepted, urutan: 2 benar + 1 paling benar)
-- Bobot: 20% (2 poin per soal)
-- - BEST (paling benar): 100% poin (2 poin)
-- - RIGHT (benar parsial): 50% poin (1 poin)
-- - Lain: 0 poin
-- Siswa harus ketik salah satu accepted answer (case-insensitive)
-- Di luar accepted = jawaban tidak bisa disimpan
-- ============================================================


-- Isian #001 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_001', '11DKV', 'Mata Pelajaran Pilihan', 'Aturan komposisi yang membagi frame menjadi 3 bagian horizontal dan 3 vertikal (9 kotak, 4 titik temu) disebut Rule of...', '', '', '', '', 2, 'Rule of Thirds — bagi frame jadi 9 kotak, 4 power points. ''Thirds'' (jamak) paling tepat, ''Third'' (tunggal) accepted.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'third|thirds|thirds', '', 'C3', 'Jawaban: third|thirds|thirds. Rule of Thirds — bagi frame jadi 9 kotak, 4 power points. ''Thirds'' (jamak) paling tepat, ''Third'' (tunggal) accepted.', 'Skor: BEST (thirds)=100, RIGHT (third,thirds)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #002 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_002', '11DKV', 'Mata Pelajaran Pilihan', 'Pengaturan aperture yang BESAR (misalnya f/1.4, f/1.8, f/2.8) menghasilkan depth of field yang... (gunakan istilah: dangkal/dalam)', '', '', '', '', 2, 'Aperture besar = DOF dangkal (shallow). Background kabur. ''Dangkal'' paling tepat (istilah Indonesia).', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'dangkal|shallow|dangkal', '', 'C3', 'Jawaban: dangkal|shallow|dangkal. Aperture besar = DOF dangkal (shallow). Background kabur. ''Dangkal'' paling tepat (istilah Indonesia).', 'Skor: BEST (dangkal)=100, RIGHT (dangkal,shallow)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #003 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_003', '11DKV', 'Mata Pelajaran Pilihan', 'Warna komplementer warna MERAH adalah... (sebut nama warna)', '', '', '', '', 2, 'Merah-hijau = komplementer (berseberangan color wheel). ''Hijau'' (Indonesia) paling tepat.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'hijau|green|hijau', '', 'C3', 'Jawaban: hijau|green|hijau. Merah-hijau = komplementer (berseberangan color wheel). ''Hijau'' (Indonesia) paling tepat.', 'Skor: BEST (hijau)=100, RIGHT (hijau,green)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #004 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_004', '11DKV', 'Mata Pelajaran Pilihan', 'Garis yang memandu mata pengamat ke subjek disebut... (istilah Inggris: leading...)', '', '', '', '', 2, 'Leading Lines — garis yang memandu mata. ''Lines'' (English, full term ''leading lines'') paling tepat.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'lines|garis|lines', '', 'C3', 'Jawaban: lines|garis|lines. Leading Lines — garis yang memandu mata. ''Lines'' (English, full term ''leading lines'') paling tepat.', 'Skor: BEST (lines)=100, RIGHT (lines,garis)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #005 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_005', '11DKV', 'Mata Pelajaran Pilihan', 'Jarak fokus yang menghasilkan background kabur (bokeh) disebut depth of...', '', '', '', '', 2, 'Depth of Field (DOF). DOF dangkal = background kabur. ''Field'' (full term ''depth of field'') paling tepat.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'field|dof|field', '', 'C3', 'Jawaban: field|dof|field. Depth of Field (DOF). DOF dangkal = background kabur. ''Field'' (full term ''depth of field'') paling tepat.', 'Skor: BEST (field)=100, RIGHT (field,dof)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #006 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_006', '11DKV', 'Mata Pelajaran Pilihan', 'Komposisi yang menggunakan elemen sekitar (jendela, daun, pintu) sebagai bingkai alami subjek disebut...', '', '', '', '', 2, 'Framing — menggunakan elemen sekitar sebagai bingkai alami. ''Framing'' (istilah fotografi) paling tepat.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'framing|bingkai|framing', '', 'C4', 'Jawaban: framing|bingkai|framing. Framing — menggunakan elemen sekitar sebagai bingkai alami. ''Framing'' (istilah fotografi) paling tepat.', 'Skor: BEST (framing)=100, RIGHT (framing,bingkai)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #007 (C4 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_007', '11DKV', 'Mata Pelajaran Pilihan', 'Foto pantulan cermin di danau menghasilkan komposisi yang disebut...', '', '', '', '', 2, 'Symmetry (simetri) — pantulan menciptakan simetri refleksi. ''Symmetry'' (English) paling tepat.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'symmetry|simetri|symmetry', '', 'C4', 'Jawaban: symmetry|simetri|symmetry. Symmetry (simetri) — pantulan menciptakan simetri refleksi. ''Symmetry'' (English) paling tepat.', 'Skor: BEST (symmetry)=100, RIGHT (symmetry,simetri)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #008 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_008', '11DKV', 'Mata Pelajaran Pilihan', 'Pengaturan aperture yang KECIL (f/16, f/22) menghasilkan depth of field yang... (istilah: dalam)', '', '', '', '', 2, 'Aperture kecil = DOF dalam (deep). Semua tajam. ''Dalam'' (istilah Indonesia) paling tepat.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'dalam|deep|dalam', '', 'C3', 'Jawaban: dalam|deep|dalam. Aperture kecil = DOF dalam (deep). Semua tajam. ''Dalam'' (istilah Indonesia) paling tepat.', 'Skor: BEST (dalam)=100, RIGHT (dalam,deep)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #009 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_009', '11DKV', 'Mata Pelajaran Pilihan', 'Pola berulang dari benda-benda identik (misal: susunan kacamata di etalase) disebut komposisi...', '', '', '', '', 2, 'Pattern (pola) — benda berulang membentuk komposisi menarik. ''Pattern'' (English) paling tepat.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'pattern|pola|pattern', '', 'C3', 'Jawaban: pattern|pola|pattern. Pattern (pola) — benda berulang membentuk komposisi menarik. ''Pattern'' (English) paling tepat.', 'Skor: BEST (pattern)=100, RIGHT (pattern,pola)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #010 (C3 - Komposisi & Estetika)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_tugas2_11dkv_isian_010', '11DKV', 'Mata Pelajaran Pilihan', 'Ruang kosong di sekitar subjek yang menonjolkan subjek disebut... space (istilah Inggris)', '', '', '', '', 2, 'Negative Space — ruang kosong yang menonjolkan subjek. ''Negative'' (full term ''negative space'') paling tepat.', 'Komposisi & Estetika', true, 'isian_singkat', '[]', '[]', 'negative|negatif|negative', '', 'C3', 'Jawaban: negative|negatif|negative. Negative Space — ruang kosong yang menonjolkan subjek. ''Negative'' (full term ''negative space'') paling tepat.', 'Skor: BEST (negative)=100, RIGHT (negative,negatif)=50, lain=0', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ASSIGNMENT: Tugas Bab 2 untuk Kelas 11 DKV
-- ============================================================
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_dkv_11_2_tugas', 'Tugas Bab 2: Komposisi Estetika Fotografi (35 PG + 10 PG Kompleks + 10 Isian)', 'Tugas mendalam tentang komposisi estetika fotografi untuk Bab 2. Berisi 35 soal pilihan ganda HOTS (C3/C4/C5), 10 soal pilihan ganda kompleks (multi-answer), dan 10 soal isian singkat dengan 3 opsi jawaban yang diterima (2 benar + 1 paling benar). Waktu pengerjaan 90 menit. Bobot: PG 50%, PG Kompleks 30%, Isian 20%. Anti copy-paste dan screenshot aktif. Baca materi "Bab 2: Memahami Komposisi Estetika Fotografi" sebelum mengerjakan.', 'Mata Pelajaran Pilihan', '11DKV', 'SMK', true, '2026-09-28T23:59:00+07:00', 'wajib', 55, 'quiz_only', NULL, 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- VERIFIKASI
-- ============================================================

-- Total soal per tipe
SELECT "questionType", COUNT(*) AS jumlah_soal
FROM "Question"
WHERE "cpId" = 'cp_dkv_pil_11_2'
  AND "tpId" = 'tp_dkv_pil_11_2_1'
  AND id LIKE 'q_tugas2_11dkv_%'
GROUP BY "questionType"
ORDER BY "questionType";

-- Expected:
-- isian_singkat          10
-- pilihan_ganda          35
-- pilihan_ganda_kompleks 10
-- Total: 55 soal

-- Tugas baru
SELECT id, title, "targetKelas", "questionCount", "duration", "dueDate"
FROM "Assignment"
WHERE id = 'asg_dkv_11_2_tugas';

-- Expected: 1 baris dengan questionCount=55, duration=90, dueDate=2026-09-28

-- Cek sample isian singkat (shortAnswer format)
SELECT id, LEFT(question, 60) AS pertanyaan, "shortAnswer"
FROM "Question"
WHERE id LIKE 'q_tugas2_11dkv_isian_%'
ORDER BY id
LIMIT 5;

-- Expected: shortAnswer format "right1|right2|best" (3 accepted answers)
