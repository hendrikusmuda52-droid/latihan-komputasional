-- ════════════════════════════════════════════════════════════════════════
-- MIGRATION: Tambah kolom openAt & closeAt di tabel Assignment
-- ════════════════════════════════════════════════════════════════════════
--
-- WAJIB dijalankan SEBELUM insert_ujian_teori_k11_dkv.sql
--
-- CARA RUN:
-- 1. Buka Supabase Dashboard → SQL Editor → New Query
-- 2. Copy SEMUA isi file ini, paste di SQL Editor
-- 3. Klik Run
-- 4. Setelah sukses, lanjut run: download/insert_ujian_teori_k11_dkv.sql
--
-- Setelah migration ini:
-- - Assignment punya 2 kolom baru: openAt, closeAt (TIMESTAMP WITH TIME ZONE)
-- - NULL = tidak ada batasan window (default, tugas lama tidak terpengaruh)
-- - Set nilai untuk tugas yang butuh batasan waktu ketat (ujian terjadwal)
--
-- PENTING: Kolom pakai TIMESTAMPTZ (TIMESTAMP WITH TIME ZONE) supaya
-- offset +07:00 di-respect. Tanpa ini, '2026-11-27T09:00:00+07:00'
-- akan disimpan sebagai '2026-11-27 09:00:00+00' (UTC), lalu di-render
-- di client Asia/Jakarta sebagai 16:00 WIB — BUG!
-- ════════════════════════════════════════════════════════════════════════

-- Tambah kolom openAt (kapan ujian mulai bisa diakses)
-- PENTING: pakai TIMESTAMPTZ bukan TIMESTAMP, supaya offset timezone di-respect
ALTER TABLE "Assignment"
  ADD COLUMN IF NOT EXISTS "openAt" TIMESTAMPTZ;

-- Tambah kolom closeAt (kapan ujian berakhir/tidak bisa diakses lagi)
ALTER TABLE "Assignment"
  ADD COLUMN IF NOT EXISTS "closeAt" TIMESTAMPTZ;

-- ─── Verifikasi ───
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'Assignment'
  AND column_name IN ('openAt', 'closeAt')
ORDER BY column_name;

-- Expected output:
-- column_name | data_type                      | is_nullable
-- ------------|--------------------------------|-------------
-- closeAt     | timestamp with time zone       | YES
-- openAt      | timestamp with time zone       | YES
