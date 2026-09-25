-- ============================================================
-- MIGRATION: Tabel Announcement, AnnouncementRead, DailyAttendance
-- Untuk fitur: Pengumuman guru + Presensi harian GPS
-- ============================================================

-- ── Tabel: Announcement ──
CREATE TABLE IF NOT EXISTS "Announcement" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "teacherId" TEXT,
  "teacherName" TEXT NOT NULL DEFAULT '',
  "subject" TEXT NOT NULL DEFAULT 'Informatika',
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "targetKelas" TEXT NOT NULL DEFAULT 'ALL',
  "targetJenjang" TEXT NOT NULL DEFAULT 'ALL',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "Announcement_subject_isActive_createdAt_idx" ON "Announcement"("subject", "isActive", "createdAt");
CREATE INDEX IF NOT EXISTS "Announcement_targetKelas_idx" ON "Announcement"("targetKelas");

-- ── Tabel: AnnouncementRead ──
CREATE TABLE IF NOT EXISTS "AnnouncementRead" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "announcementId" TEXT NOT NULL REFERENCES "Announcement"("id") ON DELETE CASCADE,
  "studentId" TEXT NOT NULL REFERENCES "Student"("id") ON DELETE CASCADE,
  "readAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
  UNIQUE("announcementId", "studentId")
);
CREATE INDEX IF NOT EXISTS "AnnouncementRead_studentId_idx" ON "AnnouncementRead"("studentId");

-- ── Tabel: DailyAttendance ──
CREATE TABLE IF NOT EXISTS "DailyAttendance" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "studentId" TEXT NOT NULL REFERENCES "Student"("id") ON DELETE CASCADE,
  "subject" TEXT NOT NULL DEFAULT 'Umum',
  "kelas" TEXT NOT NULL,
  "tanggal" TIMESTAMP(3) NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'H',
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "accuracy" DOUBLE PRECISION,
  "deviceInfo" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
  UNIQUE("studentId", "tanggal")
);
CREATE INDEX IF NOT EXISTS "DailyAttendance_kelas_tanggal_idx" ON "DailyAttendance"("kelas", "tanggal");
CREATE INDEX IF NOT EXISTS "DailyAttendance_studentId_tanggal_idx" ON "DailyAttendance"("studentId", "tanggal");
