-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: 5_force_stop_model
-- Date: 2026-08-12
-- Bug: #5 — ForceStop table was created on-demand via raw SQL, not in schema
--
-- This migration formalizes the ForceStop table as a Prisma model.
-- Strategy:
--   1. CREATE TABLE IF NOT EXISTS — safe whether or not the table already
--      exists (it may exist from the old raw-SQL pattern in production).
--   2. CREATE INDEX IF NOT EXISTS — same idempotent safety for indexes.
--   3. Do NOT drop existing data — preserve any force-stop records that
--      may have been created by the old raw-SQL code path.
-- ─────────────────────────────────────────────────────────────────────────────

-- Create table if not exists (idempotent — safe if table already exists from old raw-SQL code)
CREATE TABLE IF NOT EXISTS "ForceStop" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "triggeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "countdownSeconds" INTEGER NOT NULL DEFAULT 60,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ForceStop_pkey" PRIMARY KEY ("id")
);

-- Create indexes if not exists (idempotent)
CREATE INDEX IF NOT EXISTS "ForceStop_subject_expiresAt_idx" ON "ForceStop" ("subject", "expiresAt");
CREATE INDEX IF NOT EXISTS "ForceStop_teacherId_triggeredAt_idx" ON "ForceStop" ("teacherId", "triggeredAt");

-- Add createdAt column if it doesn't exist (for tables created by old raw-SQL code)
-- This is safe because the column is nullable in old records.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'ForceStop' AND column_name = 'createdAt'
    ) THEN
        ALTER TABLE "ForceStop" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
    END IF;
END$$;
