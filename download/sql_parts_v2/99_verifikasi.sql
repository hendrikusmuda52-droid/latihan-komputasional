-- ============================================================
-- VERIFIKASI SOAL V2
-- ============================================================

-- 1. Total soal per CP
SELECT cp."gradeLevel", cp."kodeCP", COUNT(q.id) AS jumlah_soal
FROM "Question" q
JOIN "CapaianPembelajaran" cp ON q."cpId" = cp.id
WHERE q.subject = 'Informatika'
GROUP BY cp."gradeLevel", cp."kodeCP"
ORDER BY cp."gradeLevel", cp."kodeCP";

-- 2. Distribusi level kognitif
SELECT "levelKognitif", COUNT(*) AS jumlah
FROM "Question" WHERE subject = 'Informatika'
GROUP BY "levelKognitif" ORDER BY "levelKognitif";

-- Expected:
-- - 14 CP × 60 soal = 840 soal total
-- - C3 (Aplikasi): ~350 soal
-- - C4 (Analisis): ~280 soal
-- - C5 (Evaluasi): ~210 soal
