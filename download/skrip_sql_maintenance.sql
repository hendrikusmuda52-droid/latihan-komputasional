-- ============================================================
-- SKRIP SQL MAINTENANCE HENDRIKUSMUDA52-DROID
-- Tanggal: 20 Agustus 2026
-- Versi: 1.0
-- ============================================================
--
-- CARA PAKAI:
-- 1. Login ke https://supabase.com, pilih project hendrikusmuda52-droid.
-- 2. Buka menu "SQL Editor" di sidebar kiri.
-- 3. Klik "New query" di pojok kanan atas.
-- 4. Backup database dulu: menu "Database" → "Backups" → "Create a backup".
-- 5. Salin seluruh skrip di bawah ini, paste ke SQL Editor.
-- 6. Klik tombol "Run" (hijau, ikon play).
-- 7. Tunggu sampai muncul pesan "Success. No rows returned".
-- 8. Cek output di panel "Results" untuk verifikasi.
--
-- CATATAN: Skrip ini aman dijalankan berulang kali (idempotent).
-- Jika sudah pernah dijalankan, jalankan ulang tidak akan
-- mengubah data yang sudah dinormalisasi.
-- ============================================================

-- ============================================================
-- BLOK 1: Normalisasi string kelas di tabel Student
-- ============================================================
-- Mengubah semua variasi penulisan kelas menjadi format konsisten:
--   - huruf kapital semua (UPPER)
--   - trim spasi di awal/akhir (TRIM)
--   - hapus spasi di tengah (REGEXP_REPLACE \s+)
--
-- Contoh transformasi:
--   "11 DKV"     → "11DKV"
--   "  11dkv  "  → "11DKV"
--   "11  DKV"    → "11DKV"
--   "7A"         → "7A"  (sudah benar, tidak diubah)
-- ============================================================

UPDATE "Student"
SET kelas = UPPER(TRIM(REGEXP_REPLACE(kelas, '\s+', '', 'g')))
WHERE kelas IS NOT NULL
  AND kelas != UPPER(TRIM(REGEXP_REPLACE(kelas, '\s+', '', 'g')));

-- Verifikasi hasil normalisasi:
-- (uncomment baris di bawah untuk melihat ringkasan jumlah siswa per kelas)
-- SELECT kelas, COUNT(*) AS jumlah_siswa
-- FROM "Student"
-- GROUP BY kelas
-- ORDER BY kelas;

-- ============================================================
-- BLOK 2: Backfill cpId/tpId pada tabel Result dari Assignment
-- ============================================================
-- Untuk setiap record Result yang memiliki assignmentId tapi cpId-nya
-- masih NULL, ambil cpId/tpId/tahunAjaran/semester dari tabel Assignment
-- yang terhubung.
--
-- Hanya update record yang cpId-nya masih NULL dan Assignment-nya
-- punya cpId (tidak NULL). Data legacy tanpa assignmentId akan tetap
-- NULL (tidak bisa di-backfill).
--
-- COALESCE dipakai pada tahunAjaran dan semester: jika Result sudah
-- punya nilai, jangan overwrite (mungkin sudah diset manual sebelumnya).
-- ============================================================

UPDATE "Result" r
SET
  "cpId"        = a."cpId",
  "tpId"        = a."tpId",
  "tahunAjaran" = COALESCE(r."tahunAjaran", a."tahunAjaran"),
  "semester"    = COALESCE(r."semester", a."semester")
FROM "Assignment" a
WHERE r."assignmentId" = a.id
  AND r."cpId" IS NULL
  AND a."cpId" IS NOT NULL;

-- Verifikasi: hitung berapa record Result yang masih cpId NULL
-- (uncomment untuk melihat statistik)
-- SELECT
--   COUNT(*) FILTER (WHERE "cpId" IS NULL) AS cp_null,
--   COUNT(*) FILTER (WHERE "cpId" IS NOT NULL) AS cp_filled,
--   COUNT(*) AS total
-- FROM "Result";

-- ============================================================
-- BLOK 3: Tambah index untuk mempercepat query export
-- ============================================================
-- Setelah backfill, query export nilai per CP akan sering memfilter
-- WHERE cpId = ? pada tabel Result dan ManualGrade. Tanpa index,
-- query ini melakukan sequential scan yang lambat ketika data
-- sudah mencapai ribuan record.
--
-- Index partial (WHERE cpId IS NOT NULL) hanya mengindeks baris yang
-- punya cpId, jadi ukuran index lebih kecil dan lebih cepat.
-- ============================================================

-- Index tunggal untuk cpId dan tpId
CREATE INDEX IF NOT EXISTS idx_result_cpid
  ON "Result" ("cpId")
  WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_result_tpid
  ON "Result" ("tpId")
  WHERE "tpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_cpid
  ON "ManualGrade" ("cpId")
  WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_tpid
  ON "ManualGrade" ("tpId")
  WHERE "tpId" IS NOT NULL;

-- Index gabungan untuk filter export (cpId + tahunAjaran + semester)
-- Query export: WHERE cpId = ? AND tahunAjaran = ? AND semester = ?
CREATE INDEX IF NOT EXISTS idx_result_cp_tahun_semester
  ON "Result" ("cpId", "tahunAjaran", "semester")
  WHERE "cpId" IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manualgrade_cp_tahun_semester
  ON "ManualGrade" ("cpId", "tahunAjaran", "semester")
  WHERE "cpId" IS NOT NULL;

-- ============================================================
-- BLOK 4: Verifikasi akhir
-- ============================================================
-- Jalankan query berikut (terpisah dari blok di atas) untuk memastikan
-- semua perubahan sudah benar. Hasilnya harus menunjukkan:
--   - Student.kelas: hanya format "11DKV", "12DKV", "7A", dll (tanpa spasi)
--   - Result.cpId: mayoritas tidak NULL (kecuali legacy tanpa assignment)
-- ============================================================

-- Statistik 1: Distribusi kelas siswa setelah normalisasi
SELECT '== Distribusi kelas siswa ==' AS info;
SELECT kelas, COUNT(*) AS jumlah
FROM "Student"
GROUP BY kelas
ORDER BY kelas;

-- Statistik 2: Status cpId di tabel Result
SELECT '== Status cpId di tabel Result ==' AS info;
SELECT
  COUNT(*) FILTER (WHERE "cpId" IS NULL) AS cp_null,
  COUNT(*) FILTER (WHERE "cpId" IS NOT NULL) AS cp_filled,
  COUNT(*) AS total
FROM "Result";

-- Statistik 3: Status cpId di tabel ManualGrade
SELECT '== Status cpId di tabel ManualGrade ==' AS info;
SELECT
  COUNT(*) FILTER (WHERE "cpId" IS NULL) AS cp_null,
  COUNT(*) FILTER (WHERE "cpId" IS NOT NULL) AS cp_filled,
  COUNT(*) AS total
FROM "ManualGrade";

-- Statistik 4: Daftar index yang sudah dibuat
SELECT '== Indexes pada Result & ManualGrade ==' AS info;
SELECT
  tablename AS tabel,
  indexname AS nama_index,
  indexdef AS definisi
FROM pg_indexes
WHERE schemaname = 'public'
  AND (indexname LIKE 'idx_result%' OR indexname LIKE 'idx_manualgrade%')
ORDER BY tablename, indexname;

-- ============================================================
-- SELESAI
-- ============================================================
-- Jika semua blok di atas sukses, database sudah siap.
-- Selanjutnya: deploy kode fix ke Vercel, lalu lakukan testing
-- T1-T14 sesuai Laporan Maintenance Bab 8.
-- ============================================================
