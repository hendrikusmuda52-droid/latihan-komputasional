-- VERIFIKASI — Jalankan setelah semua file
-- Auto-generated, jalankan di Supabase SQL Editor

-- ============================================================
-- VERIFIKASI: Cek hasil insert materi + soal
-- ============================================================

-- 1. Cek materi sudah ter-update (konten panjang)
SELECT id, title, LENGTH(content) AS konten_length, "cpId", "tpId"
FROM "Material" WHERE subject = 'Informatika'
ORDER BY "targetKelas", title;

-- 2. Cek jumlah soal per CP
SELECT cp."gradeLevel", cp."kodeCP", COUNT(q.id) AS jumlah_soal
FROM "Question" q
JOIN "CapaianPembelajaran" cp ON q."cpId" = cp.id
WHERE q.subject = 'Informatika'
GROUP BY cp."gradeLevel", cp."kodeCP"
ORDER BY cp."gradeLevel", cp."kodeCP";

-- 3. Cek distribusi level kognitif
SELECT "levelKognitif", COUNT(*) AS jumlah
FROM "Question" WHERE subject = 'Informatika'
GROUP BY "levelKognitif" ORDER BY "levelKognitif";

-- Expected:
-- - 14 materi dengan konten_length > 1000 (konten detail)
-- - 14 CP dengan masing-masing ~60 soal (total ~838)
-- - C4, C5, C6 masing-masing ~280 soal