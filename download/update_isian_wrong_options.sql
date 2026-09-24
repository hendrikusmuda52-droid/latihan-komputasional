-- ============================================================
-- UPDATE: Tambah 4 wrong options (optionA-D) ke soal isian yang sudah ada
-- untuk Tugas Bab 2 11DKV — versi Bahasa Indonesia
--
-- CARA PAKAI:
-- 1. Login ke Supabase → SQL Editor
-- 2. Copy paste script ini → Run
-- 3. Tunggu "Success. No rows returned"
-- ============================================================

-- Isian #001: Rule of... → shortAnswer='third|thirds|thirds', wrong=ID
UPDATE "Question" SET "optionA" = 'setengah', "optionB" = 'seperempat', "optionC" = 'seperlima', "optionD" = 'sepersepuluh', "shortAnswer" = 'third|thirds|thirds'
WHERE id = 'q_tugas2_11dkv_isian_001';

-- Isian #002: DOF besar → shortAnswer='dangkal|tipis|dangkal', wrong=ID
UPDATE "Question" SET "optionA" = 'lebar', "optionB" = 'tegas', "optionC" = 'runcing', "optionD" = 'keras', "shortAnswer" = 'dangkal|tipis|dangkal'
WHERE id = 'q_tugas2_11dkv_isian_002';

-- Isian #003: komplementer merah → shortAnswer='hijau|hijau daun|hijau', wrong=ID
UPDATE "Question" SET "optionA" = 'biru', "optionB" = 'kuning', "optionC" = 'ungu', "optionD" = 'oranye', "shortAnswer" = 'hijau|hijau daun|hijau'
WHERE id = 'q_tugas2_11dkv_isian_003';

-- Isian #004: garis pandu → shortAnswer='pandu|pemandu|pandu', wrong=ID
UPDATE "Question" SET "optionA" = 'kurva', "optionB" = 'titik', "optionC" = 'bentuk', "optionD" = 'warna', "shortAnswer" = 'pandu|pemandu|pandu'
WHERE id = 'q_tugas2_11dkv_isian_004';

-- Isian #005: kedalaman ruang → shortAnswer='ruang|bidang|ruang', wrong=ID
UPDATE "Question" SET "optionA" = 'pandangan', "optionB" = 'fokus', "optionC" = 'lensa', "optionD" = 'kabur', "shortAnswer" = 'ruang|bidang|ruang'
WHERE id = 'q_tugas2_11dkv_isian_005';

-- Isian #006: bingkai → shortAnswer='bingkai|bingkai alami|bingkai', wrong=ID
UPDATE "Question" SET "optionA" = 'pangkas', "optionB" = 'perbesar', "optionC" = 'filter', "optionD" = 'tepi', "shortAnswer" = 'bingkai|bingkai alami|bingkai'
WHERE id = 'q_tugas2_11dkv_isian_006';

-- Isian #007: simetri → shortAnswer='simetri|seimbang|simetri', wrong=ID
UPDATE "Question" SET "optionA" = 'kacau', "optionB" = 'acak', "optionC" = 'asimetri', "optionD" = 'distorsi', "shortAnswer" = 'simetri|seimbang|simetri'
WHERE id = 'q_tugas2_11dkv_isian_007';

-- Isian #008: DOF kecil → shortAnswer='dalam|mendalam|dalam', wrong=ID
UPDATE "Question" SET "optionA" = 'sempit', "optionB" = 'tipis', "optionC" = 'rendah', "optionD" = 'cepat', "shortAnswer" = 'dalam|mendalam|dalam'
WHERE id = 'q_tugas2_11dkv_isian_008';

-- Isian #009: pola → shortAnswer='pola|pola berulang|pola', wrong=ID
UPDATE "Question" SET "optionA" = 'kacau', "optionB" = 'gangguan', "optionC" = 'rusak', "optionD" = 'berserakan', "shortAnswer" = 'pola|pola berulang|pola'
WHERE id = 'q_tugas2_11dkv_isian_009';

-- Isian #010: ruang negatif → shortAnswer='negatif|kosong|negatif', wrong=ID
UPDATE "Question" SET "optionA" = 'positif', "optionB" = 'hampa', "optionC" = 'penuh', "optionD" = 'ramai', "shortAnswer" = 'negatif|kosong|negatif'
WHERE id = 'q_tugas2_11dkv_isian_010';

-- ============================================================
-- VERIFIKASI
-- ============================================================
SELECT id, "shortAnswer", "optionA", "optionB", "optionC", "optionD"
FROM "Question"
WHERE id LIKE 'q_tugas2_11dkv_isian_%'
ORDER BY id;
