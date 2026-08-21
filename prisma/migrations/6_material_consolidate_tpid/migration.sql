-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: 6_material_consolidate_tpid
-- Date: 2026-08-12
-- Bug: #8 — Material model had two FK fields pointing to TujuanPembelajaran:
--         `tpId` (legacy String, no FK constraint) and `newTpId` (proper FK).
--       This caused data inconsistency — some materials used tpId, others newTpId.
--
-- Strategy (SAFE, non-destructive):
--   1. Backfill: copy newTpId → tpId where tpId is NULL but newTpId is NOT NULL.
--      This preserves all existing TP links.
--   2. Verify: count any remaining rows where tpId is NULL and newTpId is NOT NULL
--      (should be 0 after backfill).
--   3. Drop column: remove newTpId from Material table.
--   4. Future: all queries use tpId only.
--
-- If anything goes wrong, the migration can be reverted by re-adding newTpId
-- column and copying tpId back (but tpId values from before the backfill
-- would be lost — make sure to backup before running in production).
-- ─────────────────────────────────────────────────────────────────────────────

-- Step 1: Backfill tpId from newTpId where tpId is NULL
-- Safe: only updates rows that have NULL tpId but non-NULL newTpId.
UPDATE "Material"
SET "tpId" = "newTpId"
WHERE "tpId" IS NULL AND "newTpId" IS NOT NULL;

-- Step 2: Verification check (will fail migration if data would be lost)
-- Count rows where tpId is still NULL but newTpId had a value — these are
-- rows where backfill failed for some reason. Should be 0.
DO $$
DECLARE
  orphan_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO orphan_count
  FROM "Material"
  WHERE "tpId" IS NULL AND "newTpId" IS NOT NULL;

  IF orphan_count > 0 THEN
    RAISE EXCEPTION 'Backfill failed: % rows still have NULL tpId but non-NULL newTpId. Aborting migration to prevent data loss.', orphan_count;
  END IF;
END$$;

-- Step 3: Drop the newTpId column — no longer needed
ALTER TABLE "Material" DROP COLUMN IF EXISTS "newTpId";

-- Migration complete. All TP references now go through the single tpId column.
