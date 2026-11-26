-- ════════════════════════════════════════════════════════════════════════
-- FIX MIGRATION: Ubah tipe kolom openAt & closeAt jadi TIMESTAMPTZ
-- ════════════════════════════════════════════════════════════════════════
--
-- WAJIB dijalankan JIKA Anda sudah run migration_assignment_openat_closeat.sql
-- versi LAMA (yang pakai TIMESTAMP(3) tanpa TIME ZONE).
--
-- GEJALA: Setelah insert ujian DKV, di dashboard siswa tertulis:
--   "Akses: 16:00 – 17:30 WIB"
-- Padahal seharusnya "09:00 – 10:30 WIB".
--
-- PENYEBAB: Kolom openAt/closeAt tipenya TIMESTAMP WITHOUT TIME ZONE.
-- Saat insert '2026-11-26T09:00:00+07:00', offset +07:00 diabaikan,
-- nilai disimpan sebagai '2026-11-26 09:00:00' (tanpa TZ info).
-- Lalu client (di Asia/Jakarta = UTC+7) menganggap '09:00' sebagai UTC,
-- konversi ke lokal = 16:00 WIB. BUG!
--
-- FIX: Ubah tipe kolom jadi TIMESTAMPTZ (TIMESTAMP WITH TIME ZONE).
-- Data lama akan di-reinterpret sebagai UTC (karena kolom lama tanpa TZ).
--
-- CARA RUN:
-- 1. Buka Supabase Dashboard → SQL Editor → New Query
-- 2. Copy SEMUA isi file ini, paste di SQL Editor
-- 3. Klik Run
-- 4. Lalu run ulang: download/insert_ujian_teori_k11_dkv.sql (yang baru)
--    supaya data ujian ter-update dengan timestamp yang benar
-- ════════════════════════════════════════════════════════════════════════

-- ─── Cek tipe kolom SEBELUM fix ───
SELECT
  column_name,
  data_type AS before_type
FROM information_schema.columns
WHERE table_name = 'Assignment'
  AND column_name IN ('openAt', 'closeAt')
ORDER BY column_name;
-- Expected (sebelum fix): data_type = 'timestamp without time zone'

-- ─── ALTER COLUMN TYPE ke TIMESTAMPTZ ───
-- USING clause: reinterpret nilai yang ada sebagai UTC, lalu set timezone
ALTER TABLE "Assignment"
  ALTER COLUMN "openAt" TYPE TIMESTAMPTZ
  USING "openAt" AT TIME ZONE 'UTC';

ALTER TABLE "Assignment"
  ALTER COLUMN "closeAt" TYPE TIMESTAMPTZ
  USING "closeAt" AT TIME ZONE 'UTC';

-- ─── Cek tipe kolom SESUDAH fix ───
SELECT
  column_name,
  data_type AS after_type
FROM information_schema.columns
WHERE table_name = 'Assignment'
  AND column_name IN ('openAt', 'closeAt')
ORDER BY column_name;
-- Expected (sesudah fix): data_type = 'timestamp with time zone'

-- ─── Cek data existing ───
-- Sebelum run insert baru, cek apakah ada data openAt/closeAt yang salah
SELECT
  id,
  title,
  "openAt",
  "closeAt",
  "openAt" AT TIME ZONE 'Asia/Jakarta' AS open_at_wib,
  "closeAt" AT TIME ZONE 'Asia/Jakarta' AS close_at_wib
FROM "Assignment"
WHERE "openAt" IS NOT NULL OR "closeAt" IS NOT NULL;
