-- Migration: 3_multi_type_questions
-- Tanggal: 2026-08-11
-- Deskripsi: Multi-type questions (5 jenis Kurikulum Merdeka), level kognitif,
--             pembahasan benar + analisis distraktor, media fields for Material.
-- BACKWARD COMPATIBLE: semua kolom baru memiliki DEFAULT.

-- ══════════════════════════════════════════════════════════════════
-- 1. ALTER TABLE: Question — multi-type fields
-- ══════════════════════════════════════════════════════════════════
ALTER TABLE "Question" ALTER COLUMN "optionA" SET DEFAULT '';
ALTER TABLE "Question" ALTER COLUMN "optionB" SET DEFAULT '';
ALTER TABLE "Question" ALTER COLUMN "optionC" SET DEFAULT '';
ALTER TABLE "Question" ALTER COLUMN "optionD" SET DEFAULT '';
ALTER TABLE "Question" ALTER COLUMN "correctAnswer" SET DEFAULT 0;
ALTER TABLE "Question" ALTER COLUMN "explanation" SET DEFAULT '';

ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "questionType" TEXT NOT NULL DEFAULT 'pilihan_ganda';
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "correctAnswers" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "matchPairs" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "shortAnswer" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "essayAnswer" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "levelKognitif" TEXT NOT NULL DEFAULT 'C2';
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "pembahasanBenar" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "analisisDistraktor" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "cpId" TEXT;
ALTER TABLE "Question" ADD COLUMN IF NOT EXISTS "tpId" TEXT;

CREATE INDEX IF NOT EXISTS "Question_subject_questionType_idx" ON "Question"("subject", "questionType");
CREATE INDEX IF NOT EXISTS "Question_cpId_tpId_idx" ON "Question"("cpId", "tpId");

-- ══════════════════════════════════════════════════════════════════
-- 2. ALTER TABLE: Material — media fields
-- ══════════════════════════════════════════════════════════════════
ALTER TABLE "Material" ADD COLUMN IF NOT EXISTS "mediaType" TEXT NOT NULL DEFAULT 'teks';
ALTER TABLE "Material" ADD COLUMN IF NOT EXISTS "mediaUrl" TEXT;
ALTER TABLE "Material" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
