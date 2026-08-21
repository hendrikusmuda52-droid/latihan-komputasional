-- Migration: 1_cp_tp_upgrade
-- Tanggal: 2026-08-10
-- Deskripsi: CP-TP hierarchy, task categories (Luring/Daring), tahun ajaran/semester,
--             grade categories (tugas_harian/ulangan_harian/sts/sas), override manual,
--             custom bobot NH/STS/SAS per tahun ajaran + semester.
--
-- BACKWARD COMPATIBLE: semua kolom baru memiliki DEFAULT, tidak menghapus kolom lama.

-- ══════════════════════════════════════════════════════════════════
-- 1. NEW TABLE: CapaianPembelajaran (CP — parent)
-- ══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS "CapaianPembelajaran" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "gradeLevel" TEXT NOT NULL,
    "kodeCP" TEXT NOT NULL DEFAULT '',
    "deskripsi" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CapaianPembelajaran_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "CapaianPembelajaran_subject_gradeLevel_kodeCP_key"
    ON "CapaianPembelajaran"("subject", "gradeLevel", "kodeCP");

-- ══════════════════════════════════════════════════════════════════
-- 2. NEW TABLE: TujuanPembelajaran (TP — child of CP, MAX 100 chars)
-- ══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS "TujuanPembelajaran" (
    "id" TEXT NOT NULL,
    "cpId" TEXT NOT NULL,
    "kodeTP" TEXT NOT NULL DEFAULT '',
    "deskripsi" VARCHAR(100) NOT NULL,  -- MAX 100 chars — e-Rapor safe
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TujuanPembelajaran_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "TujuanPembelajaran_cpId_kodeTP_key"
    ON "TujuanPembelajaran"("cpId", "kodeTP");

CREATE INDEX IF NOT EXISTS "TujuanPembelajaran_cpId_idx"
    ON "TujuanPembelajaran"("cpId");

-- AddForeignKey: TujuanPembelajaran → CapaianPembelajaran
ALTER TABLE "TujuanPembelajaran" ADD CONSTRAINT "TujuanPembelajaran_cpId_fkey"
    FOREIGN KEY ("cpId") REFERENCES "CapaianPembelajaran"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ══════════════════════════════════════════════════════════════════
-- 3. ALTER TABLE: Assignment — add cpId, tpId, taskCategory, taskTypeName, tahunAjaran, semester
-- ══════════════════════════════════════════════════════════════════
ALTER TABLE "Assignment" ADD COLUMN IF NOT EXISTS "cpId" TEXT;
ALTER TABLE "Assignment" ADD COLUMN IF NOT EXISTS "tpId" TEXT;
ALTER TABLE "Assignment" ADD COLUMN IF NOT EXISTS "taskCategory" TEXT NOT NULL DEFAULT 'luring';
ALTER TABLE "Assignment" ADD COLUMN IF NOT EXISTS "taskTypeName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Assignment" ADD COLUMN IF NOT EXISTS "tahunAjaran" TEXT NOT NULL DEFAULT '2026/2027';
ALTER TABLE "Assignment" ADD COLUMN IF NOT EXISTS "semester" TEXT NOT NULL DEFAULT 'ganjil';

-- ══════════════════════════════════════════════════════════════════
-- 4. ALTER TABLE: Material — add cpId, newTpId (proper FK to new TP model)
-- ══════════════════════════════════════════════════════════════════
ALTER TABLE "Material" ADD COLUMN IF NOT EXISTS "cpId" TEXT;
ALTER TABLE "Material" ADD COLUMN IF NOT EXISTS "newTpId" TEXT;

-- ══════════════════════════════════════════════════════════════════
-- 5. ALTER TABLE: SubjectConfig — add tahunAjaran, semester, bobotSTS, bobotSAS
--    Change unique constraint from [subject] to [subject, tahunAjaran, semester]
-- ══════════════════════════════════════════════════════════════════
ALTER TABLE "SubjectConfig" ADD COLUMN IF NOT EXISTS "tahunAjaran" TEXT NOT NULL DEFAULT '2026/2027';
ALTER TABLE "SubjectConfig" ADD COLUMN IF NOT EXISTS "semester" TEXT NOT NULL DEFAULT 'ganjil';
ALTER TABLE "SubjectConfig" ADD COLUMN IF NOT EXISTS "bobotSTS" DOUBLE PRECISION NOT NULL DEFAULT 30;
ALTER TABLE "SubjectConfig" ADD COLUMN IF NOT EXISTS "bobotSAS" DOUBLE PRECISION NOT NULL DEFAULT 30;

-- Drop old unique index on subject alone
DROP INDEX IF EXISTS "SubjectConfig_subject_key";
-- Create new composite unique index
CREATE UNIQUE INDEX IF NOT EXISTS "SubjectConfig_subject_tahunAjaran_semester_key"
    ON "SubjectConfig"("subject", "tahunAjaran", "semester");

-- ══════════════════════════════════════════════════════════════════
-- 6. ALTER TABLE: ManualGrade — add gradeCategory, cpId, tpId, tahunAjaran, semester, isOverride
-- ══════════════════════════════════════════════════════════════════
ALTER TABLE "ManualGrade" ADD COLUMN IF NOT EXISTS "gradeCategory" TEXT NOT NULL DEFAULT 'tugas_harian';
ALTER TABLE "ManualGrade" ADD COLUMN IF NOT EXISTS "cpId" TEXT;
ALTER TABLE "ManualGrade" ADD COLUMN IF NOT EXISTS "tpId" TEXT;
ALTER TABLE "ManualGrade" ADD COLUMN IF NOT EXISTS "tahunAjaran" TEXT NOT NULL DEFAULT '2026/2027';
ALTER TABLE "ManualGrade" ADD COLUMN IF NOT EXISTS "semester" TEXT NOT NULL DEFAULT 'ganjil';
ALTER TABLE "ManualGrade" ADD COLUMN IF NOT EXISTS "isOverride" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS "ManualGrade_subject_tahunAjaran_semester_idx"
    ON "ManualGrade"("subject", "tahunAjaran", "semester");

-- ══════════════════════════════════════════════════════════════════
-- 7. ALTER TABLE: Result — add cpId, tpId, tahunAjaran, semester, assignmentId
-- ══════════════════════════════════════════════════════════════════
ALTER TABLE "Result" ADD COLUMN IF NOT EXISTS "cpId" TEXT;
ALTER TABLE "Result" ADD COLUMN IF NOT EXISTS "tpId" TEXT;
ALTER TABLE "Result" ADD COLUMN IF NOT EXISTS "tahunAjaran" TEXT NOT NULL DEFAULT '2026/2027';
ALTER TABLE "Result" ADD COLUMN IF NOT EXISTS "semester" TEXT NOT NULL DEFAULT 'ganjil';
ALTER TABLE "Result" ADD COLUMN IF NOT EXISTS "assignmentId" TEXT;

CREATE INDEX IF NOT EXISTS "Result_subject_tahunAjaran_semester_idx"
    ON "Result"("subject", "tahunAjaran", "semester");
