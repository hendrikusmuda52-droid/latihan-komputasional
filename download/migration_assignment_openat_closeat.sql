-- ════════════════════════════════════════════════════════════════════════
-- MIGRATION v2: Tambah kolom openAt & closeAt di tabel Assignment
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
-- JIKA ANDA SUDAH PERNAH RUN MIGRATION LAMA (TIMESTAMP(3) tanpa TZ):
-- Script ini akan ALTER COLUMN menjadi TIMESTAMPTZ secara otomatis
-- (menggunakan USING clause untuk konversi data lama ke TIMESTAMPTZ).
-- ════════════════════════════════════════════════════════════════════════

-- Tambah kolom openAt (kapan ujian mulai bisa diakses)
-- PENTING: Pakai TIMESTAMPTZ (WITH TIME ZONE) supaya timezone info
-- tersimpan & dikembalikan dengan benar oleh Prisma.
-- Jika kolom sudah ada (dari migration lama), ALTER ke TIMESTAMPTZ.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Assignment' AND column_name = 'openAt'
  ) THEN
    ALTER TABLE "Assignment" ADD COLUMN "openAt" TIMESTAMPTZ;
  ELSE
    ALTER TABLE "Assignment" ALTER COLUMN "openAt" TYPE TIMESTAMPTZ USING "openAt" AT TIME ZONE 'UTC';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Assignment' AND column_name = 'closeAt'
  ) THEN
    ALTER TABLE "Assignment" ADD COLUMN "closeAt" TIMESTAMPTZ;
  ELSE
    ALTER TABLE "Assignment" ALTER COLUMN "closeAt" TYPE TIMESTAMPTZ USING "closeAt" AT TIME ZONE 'UTC';
  END IF;
END $$;

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
-- column_name | data_type                   | is_nullable
-- ------------|-----------------------------|-------------
-- closeAt     | timestamp with time zone    | YES
-- openAt      | timestamp with time zone    | YES
