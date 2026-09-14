-- ============================================================
-- SKRIP SQL: Tambah kolom essayGrades + essayScore ke tabel Result
-- Untuk fitur penilaian essai manual oleh guru
-- ============================================================
--
-- CARA PAKAI:
-- 1. Login ke https://supabase.com → pilih project
-- 2. Buka menu "SQL Editor" → "New query"
-- 3. Salin seluruh skrip ini, paste ke editor
-- 4. Klik "Run" (tombol play)
-- 5. Tunggu pesan "Success. No rows returned"
--
-- Setelah migration ini, Result table akan punya 2 kolom baru:
-- - essayGrades TEXT NOT NULL DEFAULT '{}'  (JSON {questionId: score})
-- - essayScore  DOUBLE PRECISION NOT NULL DEFAULT 0  (average dari essayGrades)
--
-- Rumus nilai akhir (di-handle oleh API, BUKAN DB):
-- - Jika assignment punya essai: totalScore = 0.6 * quizScore + 0.4 * essayScore
-- - Jika assignment TIDAK punya essai: totalScore = quizScore (default, 100% PG)
-- ============================================================

ALTER TABLE "Result"
  ADD COLUMN IF NOT EXISTS "essayGrades" TEXT NOT NULL DEFAULT '{}';

ALTER TABLE "Result"
  ADD COLUMN IF NOT EXISTS "essayScore" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- Index untuk query cepat berdasarkan essayScore (opsional, untuk reporting)
CREATE INDEX IF NOT EXISTS idx_result_essay_score
  ON "Result" ("essayScore")
  WHERE "essayScore" > 0;

-- Verifikasi
SELECT
  column_name,
  data_type,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Result'
  AND column_name IN ('essayGrades', 'essayScore')
ORDER BY column_name;

-- Expected output:
-- | column_name  | data_type          | column_default | is_nullable |
-- |--------------|--------------------|----------------|-------------|
-- | essayGrades  | text               | '{}'::text     | NO          |
-- | essayScore   | double precision   | 0              | NO          |
