-- Migration: 2_academic_features
-- Tanggal: 2026-08-10
-- Deskripsi: Fitur penunjang akademik — Absensi, Jurnal Guru, Catatan Sikap
--
-- BACKWARD COMPATIBLE: semua kolom baru memiliki DEFAULT, tidak mengubah tabel lama.

-- ══════════════════════════════════════════════════════════════════
-- 1. Attendance (Daftar Hadir Siswa)
-- ══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS "Attendance" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "kelas" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'H',
    "keterangan" TEXT NOT NULL DEFAULT '',
    "tahunAjaran" TEXT NOT NULL DEFAULT '2026/2027',
    "semester" TEXT NOT NULL DEFAULT 'ganjil',
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Attendance_studentId_subject_tanggal_key"
    ON "Attendance"("studentId", "subject", "tanggal");

CREATE INDEX IF NOT EXISTS "Attendance_subject_kelas_tanggal_idx"
    ON "Attendance"("subject", "kelas", "tanggal");

CREATE INDEX IF NOT EXISTS "Attendance_subject_tahunAjaran_semester_idx"
    ON "Attendance"("subject", "tahunAjaran", "semester");

ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ══════════════════════════════════════════════════════════════════
-- 2. JurnalGuru (Jurnal Pembelajaran dengan Slot JP Dinamis)
-- ══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS "JurnalGuru" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "tanggal" TIMESTAMP(3) NOT NULL,
    "hari" TEXT NOT NULL,
    "jamPelajaran" INTEGER NOT NULL,
    "kelas" TEXT NOT NULL,
    "mapel" TEXT NOT NULL,
    "cpId" TEXT,
    "tpId" TEXT,
    "materiPokok" TEXT NOT NULL DEFAULT '',
    "hambatan" TEXT NOT NULL DEFAULT '',
    "tahunAjaran" TEXT NOT NULL DEFAULT '2026/2027',
    "semester" TEXT NOT NULL DEFAULT 'ganjil',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JurnalGuru_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "JurnalGuru_teacherId_tanggal_jamPelajaran_key"
    ON "JurnalGuru"("teacherId", "tanggal", "jamPelajaran");

CREATE INDEX IF NOT EXISTS "JurnalGuru_teacherId_tanggal_idx"
    ON "JurnalGuru"("teacherId", "tanggal");

CREATE INDEX IF NOT EXISTS "JurnalGuru_subject_tahunAjaran_semester_idx"
    ON "JurnalGuru"("subject", "tahunAjaran", "semester");

-- ══════════════════════════════════════════════════════════════════
-- 3. CatatanSikap (Jurnal Observasi Anekdot)
-- ══════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS "CatatanSikap" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "kelas" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "kategori" TEXT NOT NULL DEFAULT 'Sosial',
    "deskripsi" TEXT NOT NULL,
    "tindakLanjut" TEXT NOT NULL DEFAULT '',
    "tahunAjaran" TEXT NOT NULL DEFAULT '2026/2027',
    "semester" TEXT NOT NULL DEFAULT 'ganjil',
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatatanSikap_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "CatatanSikap_studentId_subject_idx"
    ON "CatatanSikap"("studentId", "subject");

CREATE INDEX IF NOT EXISTS "CatatanSikap_subject_kelas_tanggal_idx"
    ON "CatatanSikap"("subject", "kelas", "tanggal");

CREATE INDEX IF NOT EXISTS "CatatanSikap_subject_tahunAjaran_semester_idx"
    ON "CatatanSikap"("subject", "tahunAjaran", "semester");

ALTER TABLE "CatatanSikap" ADD CONSTRAINT "CatatanSikap_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
