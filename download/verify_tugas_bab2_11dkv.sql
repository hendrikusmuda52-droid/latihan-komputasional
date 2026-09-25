-- ============================================================
-- VERIFIKASI: Cek apakah soal Tugas Bab 2 11DKV sudah terisi dengan benar
-- Jalankan di Supabase SQL Editor untuk verifikasi
-- ============================================================

-- 1. Cek total soal per tipe untuk Tugas Bab 2 11DKV
SELECT "questionType", COUNT(*) AS jumlah
FROM "Question"
WHERE id LIKE 'q_tugas2_11dkv_%'
GROUP BY "questionType"
ORDER BY "questionType";

-- Expected:
-- isian_singkat          10
-- pilihan_ganda          35
-- pilihan_ganda_kompleks 10
-- Total: 55 soal

-- 2. Cek sample soal isian (harus punya shortAnswer non-empty)
SELECT id, LEFT(question, 80) AS pertanyaan, "questionType", "shortAnswer"
FROM "Question"
WHERE id LIKE 'q_tugas2_11dkv_isian_%'
ORDER BY id
LIMIT 5;

-- Expected: questionType = 'isian_singkat', shortAnswer = 'right1|right2|best' (3 accepted)

-- 3. Cek sample soal PG Kompleks (harus punya correctAnswers JSON array non-empty)
SELECT id, LEFT(question, 80) AS pertanyaan, "questionType", "correctAnswers"
FROM "Question"
WHERE id LIKE 'q_tugas2_11dkv_pgk_%'
ORDER BY id
LIMIT 3;

-- Expected: questionType = 'pilihan_ganda_kompleks', correctAnswers = '[0,1,2,3]' (array)

-- 4. Cek sample soal PG biasa
SELECT id, LEFT(question, 80) AS pertanyaan, "questionType", "correctAnswer", "optionA"
FROM "Question"
WHERE id LIKE 'q_tugas2_11dkv_pg_001'
OR id LIKE 'q_tugas2_11dkv_pg_002'
ORDER BY id;

-- Expected: questionType = 'pilihan_ganda', correctAnswer = 0-3, optionA non-empty

-- 5. Cek assignment Tugas Bab 2
SELECT id, title, "targetKelas", "questionCount", "duration", "dueDate"
FROM "Assignment"
WHERE id = 'asg_dkv_11_2_tugas';

-- Expected: 1 baris dengan questionCount=55, duration=90, dueDate=2026-09-28

-- ============================================================
-- JIKA HASIL TIDAK SESUAI:
-- 1. Pastikan file download/insert_tugas_bab2_11dkv.sql sudah dijalankan
-- 2. Jika sudah dijalankan tapi soal tidak muncul, cek error di Supabase SQL Editor
-- 3. Jika soal muncul tapi tipe salah (semua jadi pilihan_ganda), 
--    kemungkinan ada trigger/constraint yang override questionType
-- ============================================================

-- Jika perlu fix manual (mis: soal isian masih questionType='pilihan_ganda'):
-- UPDATE "Question" SET "questionType" = 'isian_singkat' 
-- WHERE id LIKE 'q_tugas2_11dkv_isian_%' AND "questionType" != 'isian_singkat';

-- UPDATE "Question" SET "questionType" = 'pilihan_ganda_kompleks' 
-- WHERE id LIKE 'q_tugas2_11dkv_pgk_%' AND "questionType" != 'pilihan_ganda_kompleks';
