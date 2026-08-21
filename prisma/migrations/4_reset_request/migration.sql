-- Migration: 4_reset_request
-- Tanggal: 2026-08-11
-- Deskripsi: ResetRequest model for student remedial requests

CREATE TABLE IF NOT EXISTS "ResetRequest" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "assignmentId" TEXT,
    "kelas" TEXT NOT NULL,
    "cpId" TEXT,
    "tpId" TEXT,
    "reason" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "teacherId" TEXT,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ResetRequest_subject_status_idx" ON "ResetRequest"("subject", "status");
CREATE INDEX IF NOT EXISTS "ResetRequest_studentId_subject_idx" ON "ResetRequest"("studentId", "subject");
CREATE INDEX IF NOT EXISTS "ResetRequest_teacherId_status_idx" ON "ResetRequest"("teacherId", "status");

ALTER TABLE "ResetRequest" ADD CONSTRAINT "ResetRequest_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
