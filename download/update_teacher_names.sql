-- ============================================================
-- UPDATE DATA GURU: Set nama lengkap berdasarkan username (kode guru)
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- HM: Hendrikus Frederik Lewo Muda (Informatika & Koding)
UPDATE "Teacher" SET "name" = 'Hendrikus Frederik Lewo Muda', "subject" = 'Informatika', "kelasDiampu" = '7,8,9', "role" = 'admin'
WHERE "username" = 'HM';

-- MR: Mardiana (Bahasa Inggris & Keterampilan)
UPDATE "Teacher" SET "name" = 'Mardiana', "subject" = 'Bahasa Inggris', "kelasDiampu" = '7,8,9'
WHERE "username" = 'MR';

-- MS: Hirim Marida Silaen (IPA)
UPDATE "Teacher" SET "name" = 'Hirim Marida Silaen', "subject" = 'IPA', "kelasDiampu" = '7,8,9'
WHERE "username" = 'MS';

-- AA: Andreas Anastasius (Bahasa Indonesia & PLH)
UPDATE "Teacher" SET "name" = 'Andreas Anastasius', "subject" = 'Bahasa Indonesia', "kelasDiampu" = '7,8,9'
WHERE "username" = 'AA';

-- SY: Susiyanti (Bahasa Mandarin)
UPDATE "Teacher" SET "name" = 'Susiyanti', "subject" = 'Mandarin', "kelasDiampu" = '7,8,9'
WHERE "username" = 'SY';

-- VN: Veneranda (PJOK & 7 KAI)
UPDATE "Teacher" SET "name" = 'Veneranda', "subject" = 'Penjaskes', "kelasDiampu" = '7,8,9'
WHERE "username" = 'VN';

-- TIK: Hendrikus Frederik Lewo Muda (TIK)
UPDATE "Teacher" SET "name" = 'Hendrikus Frederik Lewo Muda', "subject" = 'TIK', "kelasDiampu" = '7,8,9'
WHERE "username" = 'TIK';

-- RA: Ranika (PKN, IPS, & Keterampilan)
UPDATE "Teacher" SET "name" = 'Ranika', "subject" = 'PkN', "kelasDiampu" = '7,8,9'
WHERE "username" = 'RA';

-- MC: Mikael Chip (PLH & Keterampilan)
UPDATE "Teacher" SET "name" = 'Mikael Chip', "subject" = 'PLH', "kelasDiampu" = '7,8,9'
WHERE "username" = 'MC';

-- BP: Epeni (Matematika)
UPDATE "Teacher" SET "name" = 'Epeni', "subject" = 'Matematika', "kelasDiampu" = '7,8,9'
WHERE "username" = 'BP';

-- GV: Giovani (Seni Budaya & Keterampilan)
UPDATE "Teacher" SET "name" = 'Giovani', "subject" = 'Seni Budaya', "kelasDiampu" = '7,8,9'
WHERE "username" = 'GV';

-- HN: Herklana Haini (Agama, Bahasa Inggris, & 7 KAI)
UPDATE "Teacher" SET "name" = 'Herklana Haini', "subject" = 'Agama', "kelasDiampu" = '7,8,9'
WHERE "username" = 'HN';

-- VIK: Viktorianus (Koding kelas 7)
UPDATE "Teacher" SET "name" = 'Viktorianus', "subject" = 'Koding', "kelasDiampu" = '7'
WHERE "username" = 'VIK';

-- ============================================================
-- Jika guru belum ada di database, INSERT baru:
-- ============================================================

INSERT INTO "Teacher" (id, "username", "password", "name", "subject", "kelasDiampu", "role", "isActive", "createdAt")
SELECT gen_random_uuid()::text, "username", "password", "name", "subject", "kelasDiampu", "role", true, NOW()
FROM (VALUES
  ('HM', 'hm123', 'Hendrikus Frederik Lewo Muda', 'Informatika', '7,8,9', 'admin'),
  ('MR', 'mr123', 'Mardiana', 'Bahasa Inggris', '7,8,9', 'teacher'),
  ('MS', 'ms123', 'Hirim Marida Silaen', 'IPA', '7,8,9', 'teacher'),
  ('AA', 'aa123', 'Andreas Anastasius', 'Bahasa Indonesia', '7,8,9', 'teacher'),
  ('SY', 'sy123', 'Susiyanti', 'Mandarin', '7,8,9', 'teacher'),
  ('VN', 'vn123', 'Veneranda', 'Penjaskes', '7,8,9', 'teacher'),
  ('TIK', 'tik123', 'Hendrikus Frederik Lewo Muda', 'TIK', '7,8,9', 'teacher'),
  ('RA', 'ra123', 'Ranika', 'PkN', '7,8,9', 'teacher'),
  ('MC', 'mc123', 'Mikael Chip', 'PLH', '7,8,9', 'teacher'),
  ('BP', 'bp123', 'Epeni', 'Matematika', '7,8,9', 'teacher'),
  ('GV', 'gv123', 'Giovani', 'Seni Budaya', '7,8,9', 'teacher'),
  ('HN', 'hn123', 'Herklana Haini', 'Agama', '7,8,9', 'teacher'),
  ('VIK', 'vik123', 'Viktorianus', 'Koding', '7', 'teacher')
) AS t("username", "password", "name", "subject", "kelasDiampu", "role")
WHERE NOT EXISTS (SELECT 1 FROM "Teacher" WHERE "username" = t."username");

-- ============================================================
-- VERIFIKASI
-- ============================================================
SELECT "username", "name", "subject", "kelasDiampu", "role"
FROM "Teacher"
WHERE "username" IN ('HM','MR','MS','AA','SY','VN','TIK','RA','MC','BP','GV','HN','VIK')
ORDER BY "username";
