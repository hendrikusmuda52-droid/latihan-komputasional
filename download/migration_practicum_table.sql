-- ════════════════════════════════════════════════════════════════════════
-- DDL: Tabel PracticumSubmission (untuk Ujian Praktek Spreadsheet Kelas 8)
-- ════════════════════════════════════════════════════════════════════════
-- Run SQL ini di Supabase SQL Editor jika Anda belum menjalankan
-- `npx prisma db push` (yang akan membuat tabel ini otomatis).
--
-- Setelah run SQL ini, juga jalankan: insert_ujian_praktek_k8.sql
-- ════════════════════════════════════════════════════════════════════════

-- Drop jika sudah ada (idempotent — aman di-run ulang)
DROP TABLE IF EXISTS "PracticumSubmission" CASCADE;

CREATE TABLE "PracticumSubmission" (
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
  "isSubmitted"    BOOLEAN NOT NULL DEFAULT false,
  "isGraded"        BOOLEAN NOT NULL DEFAULT false,
  "isReleased"      BOOLEAN NOT NULL DEFAULT false,

  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "submittedAt"     TIMESTAMP(3)
);

-- Indexes (harus match dengan @@index di schema.prisma)
CREATE INDEX "PracticumSubmission_student_assignment_idx"
  ON "PracticumSubmission"("studentId", "assignmentId");
CREATE INDEX "PracticumSubmission_kelas_subject_idx"
  ON "PracticumSubmission"("kelas", "subject");
CREATE INDEX "PracticumSubmission_assignment_idx"
  ON "PracticumSubmission"("assignmentId");

-- ─── Verifikasi ───
SELECT 'PracticumSubmission table created' AS status;
