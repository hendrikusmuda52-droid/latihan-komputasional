# Panduan Insert CP, TP, dan Materi Informatika SMP

## Ringkasan

Skrip SQL ini berisi **14 Capaian Pembelajaran (CP)** + **14 Tujuan Pembelajaran (TP)** + **14 Materi** untuk mapel Informatika kelas 7, 8, dan 9 SMP, diambil dari Buku Siswa Kemendikbud.

**Struktur: 1 Bab = 1 CP = 1 TP = 1 Materi** (sesuai permintaan)

## Sumber Buku

| Kelas | File PDF | Penulis | Tahun | Jumlah Bab |
|---|---|---|---|---|
| 7 | BS_INFORMATIKA_VII.pdf | Maresha Caroline Wijanto, dkk. | 2023 | 5 |
| 8 | Informatika_BS_KLS_VIII_Rev.pdf | Bambang Subeno, dkk. | 2024 | 5 |
| 9 | Informatika_BS_KLS_IX_Rev.pdf | Erlangga, Erna Piantari, Khairur Rosyid | 2025 | 4 |

## Daftar Bab per Kelas

### Kelas 7 (5 Bab)
| Kode CP | Kode TP | Judul Bab | Halaman |
|---|---|---|---|
| CP.7.1 | TP.7.1.1 | Berpikir Komputasi untuk Penyelesaian Masalah | 1-36 |
| CP.7.2 | TP.7.2.1 | Pengolahan Data | 37-92 |
| CP.7.3 | TP.7.3.1 | Literasi Informasi | 93-136 |
| CP.7.4 | TP.7.4.1 | Keseimbangan Hidup di Dunia Digital | 137-166 |
| CP.7.5 | TP.7.5.1 | Perkakas Teknologi Informasi dan Komunikasi | 167-234 |

### Kelas 8 (5 Bab)
| Kode CP | Kode TP | Judul Bab | Halaman |
|---|---|---|---|
| CP.8.1 | TP.8.1.1 | Analisis Data | 1-56 |
| CP.8.2 | TP.8.2.1 | Berpikir Komputasional | 57-92 |
| CP.8.3 | TP.8.3.1 | Algoritma Pemrograman | 93-156 |
| CP.8.4 | TP.8.4.1 | Jejak Bermedia Digital | 157-186 |
| CP.8.5 | TP.8.5.1 | Pemanfaatan Perangkat Digital | 187-234 |

### Kelas 9 (4 Bab)
| Kode CP | Kode TP | Judul Bab | Halaman |
|---|---|---|---|
| CP.9.1 | TP.9.1.1 | Berpikir Komputasional dalam Analisis Data | 1-38 |
| CP.9.2 | TP.9.2.1 | Berpikir Komputasional dalam Algoritma dan Pemrograman | 39-114 |
| CP.9.3 | TP.9.3.1 | Literasi Digital untuk Produktivitas | 115-180 |
| CP.9.4 | TP.9.4.1 | Keamanan Digital | 181-234 |

## Cara Pakai

### Step 1: Backup Database (WAJIB)
1. Login ke https://supabase.com → pilih project `hendrikusmuda52-droid`
2. Menu **Database** → **Backups** → **Create a backup**
3. Beri nama "pre-insert-cp-tp-materi"

### Step 2: Buka SQL Editor
1. Di sidebar Supabase, klik **SQL Editor**
2. Klik **New query** di pojok kanan atas

### Step 3: Jalankan Skrip
1. Buka file `/home/z/my-project/download/insert_cp_tp_materi_informatika_smp.sql`
2. Salin seluruh isinya (Ctrl+A → Ctrl+C)
3. Paste ke SQL Editor (Ctrl+V)
4. Klik tombol **Run** (hijau, ikon play)
5. Tunggu pesan **"Success. No rows returned"**

### Step 4: Verifikasi
Hapus tanda komentar `--` di depan query verifikasi (di akhir file SQL), lalu jalankan:

```sql
SELECT 'CP per kelas' AS info, "gradeLevel", COUNT(*) 
FROM "CapaianPembelajaran" 
WHERE subject = 'Informatika' 
GROUP BY "gradeLevel" ORDER BY "gradeLevel";
```

Expected output:
| info | gradeLevel | count |
|---|---|---|
| CP per kelas | 7 | 5 |
| CP per kelas | 8 | 5 |
| CP per kelas | 9 | 4 |

## Karakteristik Skrip

### Idempotent (Aman Dijalankan Berulang)
- Menggunakan `ON CONFLICT DO NOTHING`
- Jika skrip sudah pernah dijalankan, jalankan ulang tidak akan menduplikasi data

### Format ID Stabil
- CP ID: `cp_inf_{kelas}_{bab}` (mis: `cp_inf_7_1`)
- TP ID: `tp_inf_{kelas}_{bab}_1` (mis: `tp_inf_7_1_1`)
- Materi ID: `mat_inf_{kelas}_{bab}` (mis: `mat_inf_7_1`)
- ID ini stabil → bisa di-reference di tabel lain (Assignment, Question, dll.)

### Format Kode CP/TP
- `CP.{kelas}.{bab}` → contoh: `CP.7.1` = Kelas 7 Bab 1
- `TP.{kelas}.{bab}.1` → contoh: `TP.7.1.1` = TP pertama di Kelas 7 Bab 1

### Target Kelas di Materi
- Kelas 7: `targetKelas = '7A,7B,7C'`
- Kelas 8: `targetKelas = '8A,8B,8C'`
- Kelas 9: `targetKelas = '9A,9B'`
- `targetJenjang = 'SMP'` untuk semua

### Isi Materi
- Format **Markdown** (`##` untuk heading, `###` untuk sub-heading, `-` untuk bullet)
- Bisa dirender oleh `material-markdown-renderer.tsx` yang sudah ada di proyek
- Berisi: ringkasan bab, sub-bab, poin-poin materi, sumber halaman

## Setelah Insert — Apa yang Bisa Dilakukan Guru?

1. **Buat Tugas per Bab**: Saat guru membuat tugas di Assignment Manager, dropdown CP/TP sekarang akan menampilkan 14 CP + 14 TP untuk Informatika SMP. Guru pilih CP.7.1 → tugas otomatis terikat ke Bab 1 Kelas 7.

2. **Bank Soal per CP**: Saat guru input soal di Bank Soal, bisa pilih CP yang sesuai. Soal akan ter-link ke bab spesifik.

3. **Siswa Lihat Materi**: Siswa kelas 7 akan melihat 5 materi di dashboard mereka (Bab 1-5). Materi bisa dibaca sebelum mengerjakan tugas.

4. **Export Nilai per CP**: Setelah nilai diinput, guru bisa export nilai per CP — sekarang akan ada 14 baris CP (bukan kosong seperti sebelumnya).

## Troubleshooting

### Error: "column "targetJenjang" does not exist"
Skema Anda mungkin belum punya kolom `targetJenjang`. Jalankan dulu:
```sql
ALTER TABLE "Material" ADD COLUMN IF NOT EXISTS "targetJenjang" TEXT DEFAULT 'ALL';
```

### Error: "duplicate key value violates unique constraint"
Skrip sudah pernah dijalankan sebagian. Tidak masalah — `ON CONFLICT DO NOTHING` akan skip yang sudah ada. Jalankan ulang seluruh skrip.

### Materi tidak muncul di dashboard siswa
Pastikan `targetKelas` sesuai dengan kelas siswa. Mis: siswa kelas `7A` hanya akan melihat materi dengan `targetKelas` mengandung `7A` ATAU `ALL`.

## File Terkait

- Skrip SQL: `/home/z/my-project/download/insert_cp_tp_materi_informatika_smp.sql`
- Panduan ini: `/home/z/my-project/download/PANDUAN_INSERT_CP_TP_MATERI.md`
