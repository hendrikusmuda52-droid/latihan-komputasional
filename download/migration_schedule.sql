-- Tabel: Schedule (Jadwal Pelajaran)
CREATE TABLE IF NOT EXISTS "Schedule" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "hari" TEXT NOT NULL,
  "jamPelajaran" TEXT NOT NULL,
  "kelas" TEXT NOT NULL,
  "subjectCode" TEXT NOT NULL,
  "teacherCode" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
  UNIQUE("hari", "jamPelajaran", "kelas")
);
CREATE INDEX IF NOT EXISTS "Schedule_hari_kelas_idx" ON "Schedule"("hari", "kelas");
CREATE INDEX IF NOT EXISTS "Schedule_teacherCode_hari_idx" ON "Schedule"("teacherCode", "hari");
