-- ============================================================
-- UPDATE: Tambah 4 wrong options (optionA-D) ke soal isian yang sudah ada
-- untuk Tugas Bab 2 11DKV
--
-- CARA PAKAI:
-- 1. Login ke Supabase → SQL Editor
-- 2. Copy paste script ini → Run
-- 3. Tunggu "Success. No rows returned"
--
-- CATATAN:
-- - Script ini UPDATE soal isian yang sudah ada di DB
--   (sebelumnya optionA-D kosong, sekarang diisi 4 wrong options)
-- - Idempotent — aman dijalankan berulang
-- ============================================================

-- Isian #001: Rule of... → shortAnswer='third|thirds|thirds', wrong=['half','quarter','fifth','tenth']
UPDATE "Question" SET "optionA" = 'half', "optionB" = 'quarter', "optionC" = 'fifth', "optionD" = 'tenth'
WHERE id = 'q_tugas2_11dkv_isian_001';

-- Isian #002: aperture besar → DOF... → shortAnswer='dangkal|shallow|dangkal', wrong=['lebar','tegas','runcing','keras']
UPDATE "Question" SET "optionA" = 'lebar', "optionB" = 'tegas', "optionC" = 'runcing', "optionD" = 'keras'
WHERE id = 'q_tugas2_11dkv_isian_002';

-- Isian #003: komplementer merah → shortAnswer='hijau|green|hijau', wrong=['biru','kuning','ungu','oranye']
UPDATE "Question" SET "optionA" = 'biru', "optionB" = 'kuning', "optionC" = 'ungu', "optionD" = 'oranye'
WHERE id = 'q_tugas2_11dkv_isian_003';

-- Isian #004: leading... → shortAnswer='lines|garis|lines', wrong=['curves','dots','shapes','colors']
UPDATE "Question" SET "optionA" = 'curves', "optionB" = 'dots', "optionC" = 'shapes', "optionD" = 'colors'
WHERE id = 'q_tugas2_11dkv_isian_004';

-- Isian #005: depth of... → shortAnswer='field|dof|field', wrong=['view','focus','lens','blur']
UPDATE "Question" SET "optionA" = 'view', "optionB" = 'focus', "optionC" = 'lens', "optionD" = 'blur'
WHERE id = 'q_tugas2_11dkv_isian_005';

-- Isian #006: framing → shortAnswer='framing|bingkai|framing', wrong=['crop','zoom','filter','border']
UPDATE "Question" SET "optionA" = 'crop', "optionB" = 'zoom', "optionC" = 'filter', "optionD" = 'border'
WHERE id = 'q_tugas2_11dkv_isian_006';

-- Isian #007: symmetry → shortAnswer='symmetry|simetri|symmetry', wrong=['chaos','random','asymmetry','distortion']
UPDATE "Question" SET "optionA" = 'chaos', "optionB" = 'random', "optionC" = 'asymmetry', "optionD" = 'distortion'
WHERE id = 'q_tugas2_11dkv_isian_007';

-- Isian #008: aperture kecil → DOF... → shortAnswer='dalam|deep|dalam', wrong=['sempit','tipis','rendah','cepat']
UPDATE "Question" SET "optionA" = 'sempit', "optionB" = 'tipis', "optionC" = 'rendah', "optionD" = 'cepat'
WHERE id = 'q_tugas2_11dkv_isian_008';

-- Isian #009: pattern → shortAnswer='pattern|pola|pattern', wrong=['chaos','noise','glitch','scatter']
UPDATE "Question" SET "optionA" = 'chaos', "optionB" = 'noise', "optionC" = 'glitch', "optionD" = 'scatter'
WHERE id = 'q_tugas2_11dkv_isian_009';

-- Isian #010: negative space → shortAnswer='negative|negatif|negative', wrong=['positive','blank','empty','void']
UPDATE "Question" SET "optionA" = 'positive', "optionB" = 'blank', "optionC" = 'empty', "optionD" = 'void'
WHERE id = 'q_tugas2_11dkv_isian_010';

-- ============================================================
-- VERIFIKASI
-- ============================================================

-- Cek 10 soal isian sekarang punya optionA-D non-empty
SELECT id, "shortAnswer", "optionA", "optionB", "optionC", "optionD"
FROM "Question"
WHERE id LIKE 'q_tugas2_11dkv_isian_%'
ORDER BY id;

-- Expected: 10 baris, semua optionA-D non-empty
-- shortAnswer format: 'right1|right2|best' (3 accepted, last = BEST)
-- optionA-D: 4 wrong options (untuk display sebagai chip)
