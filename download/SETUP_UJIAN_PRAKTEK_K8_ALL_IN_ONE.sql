-- ════════════════════════════════════════════════════════════════════════════
-- UJIAN PRAKTEK KELAS 8 — SPREADSHEET (ALL-IN-ONE SQL)
-- ════════════════════════════════════════════════════════════════════════════
--
-- CARA RUN:
-- 1. Buka Supabase Dashboard → SQL Editor → New Query
-- 2. Copy SEMUA isi file ini, paste di SQL Editor
-- 3. Klik "Run" (tunggu sampai sukses)
-- 4. Refresh dashboard siswa → tugas baru "Ujian Praktek Spreadsheet" akan muncul
--
-- Setelah run SQL ini:
-- - Tabel PracticumSubmission akan dibuat
-- - Assignment baru "Ujian Praktek Kelas 8 — Pengolahan Data Spreadsheet" akan dibuat
-- - Siswa kelas 8A, 8B, 8C akan melihat tugas ini di dashboard mereka
-- - Siswa klik "Mulai" → masuk ke halaman spreadsheet (bukan mengetik)
--
-- File ini IDEMPOTENT — aman di-run ulang.
-- ════════════════════════════════════════════════════════════════════════════


-- ─── BAGIAN 1: BUAT TABEL PracticumSubmission ─────────────────────────────
-- (skip jika sudah ada — pakai CREATE TABLE IF NOT EXISTS)

CREATE TABLE IF NOT EXISTS "PracticumSubmission" (
  "id"              TEXT PRIMARY KEY,
  "studentId"       TEXT NOT NULL REFERENCES "Student"(id) ON DELETE CASCADE,
  "assignmentId"    TEXT NOT NULL REFERENCES "Assignment"(id) ON DELETE CASCADE,
  "subject"         TEXT NOT NULL DEFAULT 'Informatika',
  "kelas"           TEXT NOT NULL,

  -- State spreadsheet siswa (JSON: cells, formulas, colWidths, etc.)
  "spreadsheetData" TEXT NOT NULL DEFAULT '{}',

  -- Tracking penggunaan formula (JSON: { "SUM": {count, cells}, ... })
  "formulasUsed"    TEXT NOT NULL DEFAULT '{}',

  -- Jawaban pertanyaan informasi (JSON: { questionId: answer })
  "infoAnswers"     TEXT NOT NULL DEFAULT '{}',

  -- Hasil auto-grade (0-100)
  "formulaScore"    DOUBLE PRECISION NOT NULL DEFAULT 0,
  "infoScore"       DOUBLE PRECISION NOT NULL DEFAULT 0,
  "totalScore"      DOUBLE PRECISION NOT NULL DEFAULT 0,
  "manualGrade"     DOUBLE PRECISION,
  "finalScore"      DOUBLE PRECISION NOT NULL DEFAULT 0,

  -- Detail penilaian per-kriteria (JSON array)
  "gradingDetails"  TEXT NOT NULL DEFAULT '[]',

  -- Metadata
  "durationSec"     INTEGER NOT NULL DEFAULT 0,
  "isSubmitted"     BOOLEAN NOT NULL DEFAULT false,
  "isGraded"        BOOLEAN NOT NULL DEFAULT false,
  "isReleased"      BOOLEAN NOT NULL DEFAULT false,

  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "submittedAt"     TIMESTAMP(3)
);

-- Indexes (IF NOT EXISTS untuk idempotency)
CREATE INDEX IF NOT EXISTS "PracticumSubmission_student_assignment_idx"
  ON "PracticumSubmission"("studentId", "assignmentId");
CREATE INDEX IF NOT EXISTS "PracticumSubmission_kelas_subject_idx"
  ON "PracticumSubmission"("kelas", "subject");
CREATE INDEX IF NOT EXISTS "PracticumSubmission_assignment_idx"
  ON "PracticumSubmission"("assignmentId");

-- Verifikasi tabel dibuat
SELECT '✓ Tabel PracticumSubmission dibuat' AS step_1_status;


-- ─── BAGIAN 2: INSERT ASSIGNMENT "Ujian Praktek Spreadsheet" ─────────────
-- taskType = 'practicum_spreadsheet' — penting! Inilah yang membedakan
-- dengan tugas mengetik biasa (taskType = 'typing_quiz' atau 'typing_only')

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
  7,
  'practicum_spreadsheet',
  NULL, NULL,
  'luring',
  'Ujian Praktek Spreadsheet',
  '2026/2027',
  'ganjil',
  60,
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
  "targetKelas" = EXCLUDED."targetKelas",
  "updatedAt" = NOW();

-- Verifikasi assignment dibuat
SELECT
  '✓ Assignment dibuat' AS step_2_status,
  id, title, "taskType", duration, "targetKelas", "isActive"
FROM "Assignment"
WHERE id = 'asg_ujian_praktek_k8';


-- ════════════════════════════════════════════════════════════════════════════
-- SELESAI!
--
-- Setelah semua step di atas sukses, lakukan:
--
-- 1. Tunggu 1-2 menit (Vercel otomatis re-deploy dari GitHub jika ada commit baru)
--    Atau cek status deploy di: https://vercel.com/dashboard
--
-- 2. Buka aplikasi: https://sakola-staugustinelearningsystem.vercel.app
--
-- 3. Login sebagai siswa kelas 8 (8A, 8B, atau 8C)
--
-- 4. Pilih mata pelajaran "Informatika"
--
-- 5. Di daftar tugas, cari "Ujian Praktek Kelas 8 — Pengolahan Data Spreadsheet"
--    (Badge: "Praktikum" — bukan "Mengetik + Soal")
--
-- 6. Klik "Mulai" → siswa akan masuk ke halaman spreadsheet dengan:
--    - Tab Stimulus (soal cerita Toko Elektronik Nusantara Jaya)
--    - Tab Spreadsheet (UI spreadsheet + formula bar)
--    - Tab Pertanyaan (6 info questions)
--    - Tab Panduan (sintaks 7 formula)
--
-- 7. Klik tombol "Mulai" → siswa akan masuk ke halaman spreadsheet dengan:
--    - Tab Stimulus (soal cerita Toko Elektronik Nusantara Jaya)
--    - Tab Spreadsheet (UI spreadsheet + formula bar)
--    - Tab Pertanyaan (6 info questions)
--    - Tab Panduan (sintaks 7 formula)
--
-- ─── TROUBLESHOOTING ────────────────────────────────────────────────────────
--
-- MASALAH: Siswa masih lihat tugas mengetik lama "Berpikir Komputasional"
-- SOLUSI: Tugas lama itu tetap muncul karena memang sudah ada di database.
--         Untuk menyembunyikannya, jalankan SQL:
--
--         UPDATE "Assignment"
--         SET "isActive" = false
--         WHERE title LIKE '%Berpikir Komputasional%'
--           AND "targetKelas" LIKE '%8%';
--
--         Atau nonaktifkan dari dashboard guru → menu Tugas → klik toggle Aktif.
--
-- MASALAH: Siswa tidak lihat tugas baru
-- SOLUSI:
--  a. Pastikan siswa kelas 8A, 8B, atau 8C (bukan 7 atau 9)
--  b. Pastikan Vercel sudah deploy commit terbaru (cek di Vercel dashboard)
--  c. Hard refresh browser siswa (Ctrl+Shift+R)
--  d. Cek di dashboard guru → menu "Tugas" → pastikan "Ujian Praktek" muncul
--
-- MASALAH: Error "table PracticumSubmission does not exist"
-- SOLUSI: Tabel belum dibuat. Run ulang BAGIAN 1 di atas.
--
-- MASALAH: Saya pakai prisma db push sebelumnya dan tabel error saat dibuat manual
-- SOLUSI: Jika Anda sudah run `npx prisma db push` dan tabel PracticumSubmission
--         belum ada, jalankan BAGIAN 1 saja (CREATE TABLE IF NOT EXISTS aman).
--         Prisma dan SQL manual menghasilkan struktur tabel yang sama.
--
-- ════════════════════════════════════════════════════════════════════════════
