# PANDUAN: Setup Tugas 2 Informatika (Kelas 7, 8, 9) — TP2 CP1

## Ringkasan

Dokumen ini menjelaskan cara setup konten akademik baru:

- **Mata pelajaran**: Informatika
- **Kelas**: 7, 8, 9 (SMP Santo Augustinus)
- **Bab**: 1 (Berpikir Komputasi) — mengunakan CP1 yang sudah ada
- **TP baru**: TP2 di dalam CP1 (TP.7.1.2, TP.8.1.2, TP.9.1.2)
- **Fokus tiap kelas**:
  - Kelas 7: **Dekomposisi** (memecah masalah besar jadi langkah kecil)
  - Kelas 8: **Pencarian Data** (sequential search & binary search)
  - Kelas 9: **Struktur Data Tree** (binary tree, BST, traversal)
- **Konten yang dibuat**:
  - 3 TP baru
  - 3 materi markdown (mendalam, sesuai fokus)
  - 150 soal (45 PG + 5 essai per kelas × 3 kelas)
  - 3 assignment "Tugas 2" per kelas
- **Spesifikasi tugas**:
  - questionCount = 50 (45 PG + 5 essai dalam tugas yang sama — TIDAK terpisah)
  - duration = 90 menit
  - dueDate = **21 September 2026 23:59 WIB**
  - targetKelas: 7A,7B,7C / 8A,8B,8C / 9A,9B
  - taskType = quiz_only (mixed PG + essai, di-handle quiz-stage.tsx)

---

## Komponen yang Dimodifikasi

### 1. Kode Frontend (sudah di-push ke GitHub)

#### `src/lib/data.ts` — Interface `Question`
Ditambahkan field:
- `questionType?: string` — menandai tipe soal ('pilihan_ganda' atau 'essai')
- `essayAnswer?: string` — jawaban contoh/rubric untuk essai
- `correctAnswers?: string` — untuk multi-answer (checkbox)
- `shortAnswer?: string` — untuk isian singkat

#### `src/lib/store.ts` — Interface `QuizResult` & `ResumableProgress`
- `answers: Record<number, number | string>` — typed union untuk support jawaban PG (number) dan essai (string)
- `quizAnswers: Record<number, number | string>` — sama untuk progress resume

#### `src/components/stages/quiz-stage.tsx`
- Render otomatis berdasarkan `questionType`:
  - 'pilihan_ganda' → RadioGroup (seperti sebelumnya)
  - 'essai' → Textarea (text input panjang)
- Navigator soal: badge ✎ untuk essai (warna amber)
- `computeResult()`:
  - Pisahkan PG dan essai
  - Hitung `quizScore` berdasarkan PG saja (auto-grade)
  - `quizTotal = pgCount` (essai tidak masuk hitungan auto-score)
  - Jawaban essai tetap disimpan di `quizAnswers` JSON untuk review guru

#### `src/components/stages/results-stage.tsx`
- Tampilan hasil untuk essai:
  - Badge "Essai" amber
  - Tampilkan jawaban siswa (textarea content)
  - Tampilkan jawaban contoh / rubric dari `essayAnswer`
  - Catatan: "Soal essai akan dinilai oleh guru secara manual."

### 2. File SQL (harus dijalankan di Supabase)

Lokasi: `download/insert_tp2_materi_soal_tugas2_v2.sql` (228 KB, ~150 INSERT statements)

Struktur file SQL:
- Bagian 1: Kelas 7 (TP2 + Materi + 45 PG + 5 essai + Tugas 2)
- Bagian 2: Kelas 8 (TP2 + Materi + 45 PG + 5 essai + Tugas 2)
- Bagian 3: Kelas 9 (TP2 + Materi + 45 PG + 5 essai + Tugas 2)
- Bagian 4: Verifikasi (SELECT queries untuk cek hasil)

Semua INSERT menggunakan `ON CONFLICT DO NOTHING` — idempotent, aman dijalankan berulang.

---

## CARA MENJALANKAN SQL (Pilih Salah Satu)

### Opsi A: Via Supabase Dashboard (PALING MUDAH)

1. Login ke https://supabase.com
2. Pilih project SAKOLA Anda
3. Klik menu **"SQL Editor"** (ikon database di sidebar kiri)
4. Klik tombol **"+ New query"** (pojok kanan atas)
5. Buka file `download/insert_tp2_materi_soal_tugas2_v2.sql` di VS Code / Notepad
6. Salin SELURUH isi file (Ctrl+A, Ctrl+C)
7. Paste ke editor Supabase (Ctrl+V)
8. Klik tombol **"Run"** (tombol hijau play, atau tekan Ctrl+Enter)
9. Tunggu sampai muncul pesan **"Success. No rows returned"** (~30-60 detik)
10. Verifikasi hasil — jalankan query verifikasi di bagian bawah SQL file

### Opsi B: Via Python Script (run_sql_direct.py)

1. Pastikan `psycopg2-binary` sudah terinstall:
   ```bash
   pip install psycopg2-binary python-dotenv
   ```

2. Setup `DATABASE_URL` di file `.env` di folder `scripts/`:
   ```
   DATABASE_URL=postgresql://postgres.PROJECT_ID:PASSWORD_ANDA@aws-0-XX.pooler.supabase.com:6543/postgres
   ```
   - Dapat URL ini dari: Supabase Dashboard → Connect → Direct → Transaction pooler → Python
   - **PENTING**: Gunakan port 6543 (Transaction pooler), BUKAN 5432

3. Copy file SQL ke folder yang diharapkan script:
   ```bash
   mkdir -p /home/z/my-project/download/sql_parts_v3
   cp /home/z/my-project/download/insert_tp2_materi_soal_tugas2_v2.sql /home/z/my-project/download/sql_parts_v3/01_tugas2_informatika.sql
   ```

   Atau, edit path di `scripts/run_sql_direct.py` baris 48:
   ```python
   SQL_PARTS_DIR = os.path.join(PROJECT_ROOT, "download")  # folder baru
   ```
   Lalu rename file SQL jadi nama yang sortable (mis: `01_tugas2_informatika.sql`).

4. Jalankan script:
   ```bash
   cd /home/z/my-project
   python3 scripts/run_sql_direct.py
   ```

5. Ikuti instruksi di layar (ketik "ya" untuk konfirmasi).

---

## VERIFIKASI HASIL SETELAH RUN SQL

Setelah SQL dijalankan, jalankan query verifikasi ini di Supabase SQL Editor:

### Cek 1: Total soal per kelas + tipe

```sql
SELECT "gradeLevel", "questionType", COUNT(*) AS jumlah_soal
FROM "Question"
WHERE "cpId" IN ('cp_inf_7_1', 'cp_inf_8_1', 'cp_inf_9_1')
  AND "tpId" IN ('tp_inf_7_1_2', 'tp_inf_8_1_2', 'tp_inf_9_1_2')
GROUP BY "gradeLevel", "questionType"
ORDER BY "gradeLevel", "questionType";
```

**Expected output:**

| gradeLevel | questionType   | jumlah_soal |
|------------|----------------|-------------|
| 7          | pilihan_ganda  | 45          |
| 7          | essai          | 5           |
| 8          | pilihan_ganda  | 45          |
| 8          | essai          | 5           |
| 9          | pilihan_ganda  | 45          |
| 9          | essai          | 5           |

Total: 150 soal (50 per kelas)

### Cek 2: Assignment baru

```sql
SELECT id, title, "targetKelas", "questionCount", "duration", "dueDate"
FROM "Assignment"
WHERE id LIKE 'asg_inf_%_1_2'
ORDER BY "targetKelas";
```

**Expected output:** 3 baris dengan:
- `questionCount = 50`
- `duration = 90`
- `dueDate = 2026-09-21T23:59:00+00:00` (UTC) atau `2026-09-22 06:59 WIB`

### Cek 3: TP baru

```sql
SELECT id, "kodeTP", deskripsi
FROM "TujuanPembelajaran"
WHERE id LIKE 'tp_inf_%_1_2'
ORDER BY id;
```

**Expected:** 3 baris:
- tp_inf_7_1_2 — TP.7.1.2 — Siswa mampu menerapkan dekomposisi...
- tp_inf_8_1_2 — TP.8.1.2 — Siswa mampu menerapkan algoritma pencarian data...
- tp_inf_9_1_2 — TP.9.1.2 — Siswa mampu menerapkan struktur data tree...

### Cek 4: Materi baru

```sql
SELECT id, title, "targetKelas"
FROM "Material"
WHERE id LIKE 'mat_inf_%_1_2'
ORDER BY id;
```

**Expected:** 3 baris (mat_inf_7_1_2, mat_inf_8_1_2, mat_inf_9_1_2)

---

## CARA UJI DI BROWSER

Setelah SQL dijalankan + Vercel auto-deploy selesai (1-3 menit setelah push kode):

### Test sebagai Guru (Dashboard Guru)
1. Login sebagai guru di `https://sakola-staugustinelearningsystem.vercel.app/?view=teacher`
2. Buka **Daftar Nilai** → harus muncul CP1 + TP2 baru per kelas
3. Buka **Assignment Manager**:
   - Filter kelas 7 → harus muncul "Tugas 2 Kelas 7: Dekomposisi (45 PG + 5 Essai, 90 menit)"
   - Filter kelas 8 → "Tugas 2 Kelas 8: Pencarian Data..."
   - Filter kelas 9 → "Tugas 2 Kelas 9: Struktur Data Tree..."
4. Buka **Bank Soal**:
   - Filter kelas 7 + CP1 → harus muncul 50 soal baru (45 PG + 5 essai)
   - Idem untuk kelas 8 dan 9
5. Buka **Materi** → harus muncul 3 materi baru ("Memperdalam Dekomposisi", dst.)

### Test sebagai Siswa (Kelas 7A, 8A, 9A)
1. Login sebagai siswa
2. Buka **Dashboard Siswa** → harus muncul "Tugas 2 Kelas X" di list
3. Klik **"Kerjakan"**:
   - Timer 90 menit dimulai
   - Soal muncul berurutan (campuran PG + essai)
   - Soal PG → opsi A/B/C/D (RadioGroup)
   - Soal essai → textarea besar
   - Navigator soal (pojok kanan) → badge ✎ untuk essai
4. Jawab beberapa soal, klik "Selesai"
5. Hasil: skor PG dihitung otomatis, essai menunggu review guru

---

## RUBRIC PENILAIAN ESSAI (untuk guru)

Karena essai tidak bisa di-auto-grade, guru perlu review manual. Berikut panduan rubric:

### Kelas 7 — Essai Dekomposisi
- **Soal 1** (Hierarki dekomposisi class meeting): rubric 0-100
  - 100: 4+ bagian utama, sub-bagian lengkap, 2+ dependensi diidentifikasi, alasan jelas
  - 70: 3 bagian utama, beberapa sub-bagian, 1 dependensi
  - 40: pemecahan dangkal, dependensi tidak diidentifikasi
  - 0: tidak menjawab / jawaban asal

### Kelas 8 — Essai Pencarian Data
- **Soal 2** (Debug binary search code): rubric 0-100
  - 100: 3+ bug teridentifikasi (off-by-one, infinite loop risk) + solusi kode benar
  - 70: 2 bug teridentifikasi, solusi benar
  - 40: 1 bug, solusi tidak lengkap
  - 0: tidak menjawab

### Kelas 9 — Essai Struktur Data Tree
- **Soal 1** (Analisis BST dengan gambar): rubric 0-100
  - 100: root/leaf/internal benar, depth setiap node benar, height benar, in-order traversal benar (terurut ascending)
  - 70: 3 dari 4 aspek benar
  - 40: 2 dari 4 aspek benar
  - 0: tidak menjawab

### Cara beri nilai manual (lewat Daftar Nilai):
1. Buka **Daftar Nilai** → expand CP1 + TP2
2. Cari siswa → lihat kolom "Skor Essai" (kolom baru, akan ditambahkan otomatis)
3. Edit nilai manual → update ke database

Alternatif: gunakan endpoint API nilai manual (sudah ada):
```
POST /api/manual-grades
{
  "studentId": "...",
  "title": "Essai Tugas 2 - Soal 1",
  "score": 80,
  "description": "Hierarki dekomposisi class meeting",
  "gradeCategory": "tugas_harian",
  "cpId": "cp_inf_7_1",
  "tpId": "tp_inf_7_1_2"
}
```

---

## TROUBLESHOOTING

### Problem: Tugas tidak muncul di dashboard siswa
- Cek `targetKelas` di Assignment: harus `7A,7B,7C` (kelas siswa)
- Cek `subject` = 'Informatika'
- Cek `isActive = true`
- Cek `dueDate` belum lewat (atau masih ada hari tersisa)

### Problem: Soal essai tidak muncul di quiz-stage
- Pastikan `questionType = 'essai'` di Question
- Pastikan kode `quiz-stage.tsx` sudah ter-deploy (cek versi di Vercel)
- Cek localStorage siswa: `currentAssignmentCpId` dan `tpId` harus sesuai

### Problem: Skor auto-grade 0 untuk semua siswa
- Bisa terjadi jika quiz-stage versi baru belum ter-deploy (masih pakai kode lama)
- Cek commit hash terbaru di Vercel deployment
- Force refresh (Ctrl+Shift+R) untuk clear cache browser

### Problem: Timer tidak dimulai dari 90 menit
- Cek assignment `duration = 90`
- Cek localStorage `currentAssignmentDuration` = "90"

### Problem: Jawaban essai tidak tersimpan
- Cek network tab saat submit — POST `/api/result` harus include `quizAnswers` JSON
- Cek DB Result.quizAnswers berisi essay text (bukan kosong)

---

## FILE YANG DIEDIT DI PROYEK

### Kode (sudah di-push ke GitHub):
- `src/lib/data.ts` — Question interface +essayAnswer, +questionType, +correctAnswers, +shortAnswer
- `src/lib/store.ts` — QuizResult & ResumableProgress typed union
- `src/components/stages/quiz-stage.tsx` — render Textarea for essai, badge ✎, scored PG-only
- `src/components/stages/results-stage.tsx` — tampilkan essai answer + rubric

### File SQL (perlu di-run di Supabase):
- `download/insert_tp2_materi_soal_tugas2_v2.sql` — 228 KB, 150 INSERT statements

### Generator script (untuk regenerasi jika perlu edit konten):
- `scripts/generate_tp2_materi_soal_tugas2.py` — Python script (jalankan: `python3 scripts/generate_tp2_materi_soal_tugas2.py`)

---

## RINGKASAN ALUR SISWA

1. Siswa login → dashboard
2. Lihat "Tugas 2 Kelas X" → klik "Kerjakan"
3. Baca materi "Memperdalam ..." (link di deskripsi tugas) — opsional
4. Klik "Mulai" → timer 90 menit dimulai
5. Soal muncul satu per satu:
   - Soal 1-45 (PG): RadioGroup A/B/C/D
   - Soal 46-50 (Essai): Textarea besar
6. Navigasi soal via panel kanan (badge ✎ = essai)
7. Auto-save setiap 1 detik
8. Klik "Selesai" → submit
9. Hasil:
   - Skor PG: auto-grade (X / 45 benar)
   - Essai: tampil jawaban + rubric, "akan dinilai guru"
10. Guru nilai essai via Daftar Nilai → tambah manual grade

Selamat mengerjakan! 🎓
