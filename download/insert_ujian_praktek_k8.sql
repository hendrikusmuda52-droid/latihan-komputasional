-- ════════════════════════════════════════════════════════════════════════
-- UJIAN PRAKTEK KELAS 8 — PENGOLAHAN DATA MENGGUNAKAN SPREADSHEET
-- ════════════════════════════════════════════════════════════════════════
--
-- Skenario: Toko Elektronik Nusantara Jaya — pengolahan data penjualan 6 sales
-- Formula yang diuji: SUM, AVERAGE, IF, VLOOKUP, HLOOKUP, COUNTIF, RANK
-- Penilaian: berdasarkan penggunaan formula yang tepat (auto-graded)
--
-- Durasi: 60 menit
-- Kelas target: 8A, 8B, 8C
-- Subject: Informatika
--
-- CARA RUN:
-- 1. Buka Supabase Dashboard → SQL Editor
-- 2. Copy paste SQL ini, jalankan
-- 3. Pastikan tabel "PracticumSubmission" sudah dibuat via prisma db push
--    (atau lihat migration_practicum_table.sql)
-- ════════════════════════════════════════════════════════════════════════

-- ─── LANGKAH 1: Buat Assignment "Ujian Praktek Kelas 8 — Spreadsheet" ───
INSERT INTO "Assignment" (
  id, title, description, subject, "targetKelas", "targetJenjang",
  "isActive", "dueDate", "exerciseType", "questionCount",
  "taskType", "cpId", "tpId", "taskCategory", "taskTypeName",
  "tahunAjaran", "semester", "duration",
  "isPunishment", "createdAt", "updatedAt"
) VALUES (
  'asg_ujian_praktek_k8',
  'Ujian Praktek Kelas 8 — Pengolahan Data Spreadsheet',
  'Ujian praktek pengolahan data menggunakan spreadsheet dengan 7 formula: SUM, AVERAGE, IF, VLOOKUP, HLOOKUP, COUNTIF, RANK. Siswa mengolah data penjualan 6 sales Toko Elektronik Nusantara Jaya. Penilaian otomatis berdasarkan formula yang tepat.',
  'Informatika',
  '8A,8B,8C',
  'SMP',
  true,
  NULL,
  'wajib',
  7, -- 7 jenis formula yang diuji
  'practicum_spreadsheet',
  NULL, NULL,
  'luring',
  'Ujian Praktek Spreadsheet',
  '2026/2027',
  'ganjil',
  60, -- 60 menit
  false,
  NOW(), NOW()
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  "taskType" = EXCLUDED."taskType",
  "taskTypeName" = EXCLUDED."taskTypeName",
  duration = EXCLUDED.duration,
  "isActive" = EXCLUDED."isActive",
  "updatedAt" = NOW();

-- ─── Verifikasi ───
SELECT id, title, "taskType", duration, "targetKelas", "isActive"
FROM "Assignment"
WHERE id = 'asg_ujian_praktek_k8';

-- ════════════════════════════════════════════════════════════════════════
-- CATATAN UNTUK GURU:
--
-- 1. Tabel PracticumSubmission akan dibuat otomatis saat prisma db push
--    dijalankan (lihat schema.prisma model PracticumSubmission).
--    Atau jalankan SQL DDL di migration_practicum_table.sql
--
-- 2. Setelah siswa submit, nilai auto-graded muncul di:
--    - Tabel PracticumSubmission (totalScore, formulaScore, infoScore)
--    - Tabel Result (untuk dashboard siswa)
--
-- 3. Guru dapat memberi nilai manual override via:
--    POST /api/practicum/manual-grade
--    body: { submissionId, manualGrade, release: true }
--
-- 4. Guru dapat melihat detail spreadsheet siswa via:
--    - GET /api/practicum/list?assignmentId=asg_ujian_praktek_k8
--    - GET /api/practicum/review?id=<submissionId>
-- ════════════════════════════════════════════════════════════════════════
