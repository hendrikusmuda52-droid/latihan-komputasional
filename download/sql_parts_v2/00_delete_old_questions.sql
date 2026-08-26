-- ============================================================
-- HAPUS SOAL LAMA (opsional, agar tidak duplikat)
-- ============================================================
-- ⚠️ HATI-HATI: query ini akan menghapus SEMUA soal Informatika
-- Hanya jalankan jika ingin replace semua soal

DELETE FROM "Question" WHERE subject = 'Informatika';

-- Verifikasi: harus 0
-- SELECT COUNT(*) FROM "Question" WHERE subject = 'Informatika';
