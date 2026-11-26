-- ════════════════════════════════════════════════════════════════════════
-- FIX DATA: Replace literal '\n' (backslash-n, 2 chars) dengan newline char
-- di kolom content tabel Material
-- ════════════════════════════════════════════════════════════════════════
--
-- MASALAH:
-- Materi persiapan ujian DKV (Fotografi, Illustrator, Blender) tampil
-- sebagai raw text di dashboard siswa. Markdown symbols (##, **) dan
-- literal '\n' terlihat sebagai teks biasa, tidak di-render.
--
-- PENYEBAB:
-- Generator Python (generate_ujian_teori_k11_dkv.py) lama pakai
-- sql_escape() yang .replace('\n', '\\n') — mengubah newline char (1 byte)
-- menjadi 2 chars literal '\n' (backslash + n).
--
-- PostgreSQL single-quoted string TIDAK interpret '\n' sebagai newline
-- (kecuali pakai E'...' escape syntax). Jadi yang disimpan di DB adalah
-- literal '\n' (2 chars), bukan newline.
--
-- Akibatnya MaterialMarkdownRenderer.split('\n') tidak pecah baris,
-- semua jadi 1 paragraf, heading ## tidak di-render.
--
-- FIX:
-- 1. Run SQL ini untuk replace literal '\n' (2 chars) → CHR(10) (newline)
--    di kolom content tabel Material
-- 2. Re-run insert_ujian_teori_k11_dkv.sql (yang sudah di-fix)
--    untuk overwrite data dengan content yang benar
--
-- CARA RUN:
-- 1. Buka Supabase Dashboard → SQL Editor → New Query
-- 2. Copy SEMUA isi file ini, paste di SQL Editor
-- 3. Klik Run
-- 4. Lalu run: download/insert_ujian_teori_k11_dkv.sql (yang baru)
-- ════════════════════════════════════════════════════════════════════════

-- ─── Cek data SEBELUM fix ───
-- Tampilkan beberapa baris pertama content untuk verifikasi ada literal \n
SELECT
  id,
  title,
  LEFT(content, 200) AS content_preview,
  POSITION(E'\\n' IN content) AS has_literal_backslash_n,
  POSITION(CHR(10) IN content) AS has_actual_newline
FROM "Material"
WHERE id IN (
  'mat_ujian_teori_dkv_fotografi',
  'mat_ujian_teori_dkv_illustrator',
  'mat_ujian_teori_dkv_blender',
  'mat_ujian_k9'
)
ORDER BY id;
-- Expected (sebelum fix): has_literal_backslash_n > 0, has_actual_newline = 0

-- ─── UPDATE: replace literal '\n' (2 chars) dengan CHR(10) (newline) ───
-- PENTING: Pakai E'\\n' (escape string syntax) supaya PostgreSQL interpret
-- \\n sebagai literal backslash-n (2 chars), BUKAN newline.
UPDATE "Material"
SET
  content = REPLACE(content, E'\\n', CHR(10)),
  "updatedAt" = NOW()
WHERE id IN (
  'mat_ujian_teori_dkv_fotografi',
  'mat_ujian_teori_dkv_illustrator',
  'mat_ujian_teori_dkv_blender',
  'mat_ujian_k9'
);

-- ─── Cek data SESUDAH fix ───
SELECT
  id,
  title,
  LEFT(content, 200) AS content_preview,
  POSITION(E'\\n' IN content) AS still_has_literal_backslash_n,
  POSITION(CHR(10) IN content) AS now_has_actual_newline
FROM "Material"
WHERE id IN (
  'mat_ujian_teori_dkv_fotografi',
  'mat_ujian_teori_dkv_illustrator',
  'mat_ujian_teori_dkv_blender',
  'mat_ujian_k9'
)
ORDER BY id;
-- Expected (sesudah fix): still_has_literal_backslash_n = 0 (atau NULL),
--   now_has_actual_newline > 0

-- ════════════════════════════════════════════════════════════════════════
-- CATATAN:
-- Setelah run SQL ini, materi yang sudah ada akan punya content dengan
-- newline char yang benar. Markdown renderer akan bisa parse heading,
-- list, dan format lainnya.
--
-- Alternatif (LEBIH BAIK): run ulang insert_ujian_teori_k11_dkv.sql yang
-- baru (sudah di-fix sql_escape-nya). Karena INSERT pakai ON CONFLICT
-- DO UPDATE, content akan di-overwrite dengan versi yang benar.
-- ════════════════════════════════════════════════════════════════════════
