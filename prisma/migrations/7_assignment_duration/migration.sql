-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: 7_assignment_duration
-- Date: 2026-08-12
-- Bug #2 fix: Add `duration` column to Assignment table
--
-- duration Int @default(0) — dalam satuan menit
-- 0 = no time limit (use default: 25 min quiz, 40 min typing)
-- >0 = custom duration (e.g., 30 = 30 minutes)
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE "Assignment" ADD COLUMN IF NOT EXISTS "duration" INTEGER NOT NULL DEFAULT 0;
