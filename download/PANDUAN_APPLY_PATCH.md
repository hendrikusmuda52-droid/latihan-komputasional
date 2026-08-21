# Panduan Apply Patch — Semua Fix Bug (Versi Bersih)

> **Status**: Patch sudah di-verify clean apply di atas kode terbaru Anda (origin/main = 85fdcd8).
> Dry-run check: ✅ PASS untuk kedua patch.

## APA YANG DIPERBAIKI PATCH INI

### Patch #1: Fix Bug #1 (CP/TP Sync) + Bug #2 (SMK Assignments)
- **Bug #1**: Nilai tugas siswa tidak terikat ke CP/TP yang dipilih guru di grade-book
- **Bug #2**: Tugas untuk kelas 11 DKV / 12 DKV tidak muncul di dashboard siswa SMK
- **File yang diubah** (9 files + 1 file baru + 1 SQL script):
  - `src/lib/kelas.ts` (BARU) — helper `normalizeKelas()` + `isKelasMatch()`
  - `src/app/api/student/assignments/route.ts` — pakai `isKelasMatch()` untuk filter
  - `src/app/api/student/materials/route.ts` — pakai `isKelasMatch()` untuk filter
  - `src/app/api/teacher/students/route.ts` (POST) — sanitasi kelas + set jenjang
  - `src/app/api/teacher/students/[id]/route.ts` (PUT) — sanitasi kelas + sinkron jenjang
  - `src/app/api/student/route.ts` (self-register) — sanitasi kelas + set jenjang
  - `src/app/api/manual-grades/route.ts` (single + bulk) — simpan cpId/tpId/tahunAjaran/semester/gradeCategory/isOverride
  - `src/app/api/result/route.ts` — lookup Assignment untuk inherit cpId/tpId
  - `download/skrip_sql_maintenance.sql` (BARU) — skrip SQL untuk normalisasi data + backfill + index

### Patch #2: Fix Bug "Tidak ada soal di Bank Soal" (False Warning)
- **Akar masalah**: Frontend fetch ke `/api/questions?stockCheck=1` hanya kirim `cpId`, tidak kirim `grade` & `subject` → backend salah anggap mapel = "Informatika" → count = 0 → false warning
- **Sekunder**: Next.js Data Cache membuat count=0 ter-cache
- **File yang diubah** (2 files):
  - `src/app/api/questions/route.ts` — tambah `force-dynamic`, `force-no-store`, `Cache-Control` headers, logging, fallback `stockCountWithoutCp`
  - `src/components/teacher/assignments-manager.tsx` — kirim `grade` + `subject` eksplisit + `cache: 'no-store'` + UI warning 3 level

---

## CARA APPLY (2 OPSI)

### Opsi A: Git Apply (CEPAT — 30 detik)

```bash
# 1. Di komputer Anda, buka terminal di folder repo lokal:
cd /path/ke/latihan-komputasional

# 2. Pastikan di branch main dan up-to-date
git checkout main
git pull origin main

# 3. Download 2 file patch dari z.ai workspace:
#    - 0001-fix-CP-TP-sync-SMK-assignment-filter-Bug-1-2.patch
#    - 0002-fix-false-Tidak-ada-soal-di-Bank-Soal-warning-cache-.patch
#    Letakkan di root folder repo Anda.

# 4. Apply patch #1 (Bug #1 + Bug #2)
git apply 0001-fix-CP-TP-sync-SMK-assignment-filter-Bug-1-2.patch

# 5. Apply patch #2 (stockCheck cache)
git apply 0002-fix-false-Tidak-ada-soal-di-Bank-Soal-warning-cache-.patch

# 6. Verifikasi tidak ada error
npx tsc --noEmit
npx eslint src/lib/kelas.ts src/app/api/questions/route.ts src/app/api/manual-grades/route.ts src/app/api/result/route.ts src/app/api/student/assignments/route.ts src/app/api/student/materials/route.ts src/app/api/student/route.ts src/app/api/teacher/students/route.ts "src/app/api/teacher/students/[id]/route.ts" src/components/teacher/assignments-manager.tsx

# 7. Commit & push
git add -A
git commit -m "fix: CP/TP sync + SMK assignments + stockCheck cache (Bug #1, #2, #3)"
git push origin main
```

### Opsi B: Manual Copy-Paste (Jika Opsi A Gagal)

Download file `0001-fix-CP-TP-sync-SMK-assignment-filter-Bug-1-2.patch` dan buka di text editor. Format patch file cukup mudah dibaca:

```
diff --git a/src/lib/kelas.ts b/src/lib/kelas.ts
new file mode 100644
--- /dev/null
+++ b/src/lib/kelas.ts
@@ -0,0 +1,85 @@
+// File: src/lib/kelas.ts
+... (isi file baru)
```

- Baris yang diawali `+` = tambahkan baris ini
- Baris yang diawali `-` = hapus baris ini
- Baris tanpa prefix = konteks (tidak diubah)

Apply per perubahan secara manual di editor Anda (VS Code).

---

## SETELAH APPLY — VERIFIKASI

### Step 1: Pastikan Build Tidak Error
```bash
npx tsc --noEmit
# Harus: exit 0, no errors

npx eslint src/lib/kelas.ts src/app/api/questions/route.ts src/app/api/manual-grades/route.ts src/app/api/result/route.ts src/app/api/student/assignments/route.ts src/app/api/student/materials/route.ts src/app/api/student/route.ts src/app/api/teacher/students/route.ts "src/app/api/teacher/students/[id]/route.ts" src/components/teacher/assignments-manager.tsx
# Harus: exit 0, no warnings
```

### Step 2: Push ke Vercel
```bash
git add -A
git commit -m "fix: CP/TP sync + SMK assignments + stockCheck cache"
git push origin main
# Vercel akan auto-deploy dalam 1-3 menit
```

### Step 3: Testing Bug "Tidak ada soal di Bank Soal"
1. Buka aplikasi di browser
2. Login sebagai guru
3. Buka Assignment Manager → klik "Tambah Tugas"
4. Pilih kelas **11 DKV**
5. Pilih mapel **"Mata Pelajaran Pilihan"** (atau "Mata Pelajaran Kejuruan")
6. Pilih CP
7. **Cek Vercel Logs** → cari request ke `/api/questions?...&stockCheck=1`
   - **SEHARUSNYA sekarang berisi**: `grade=11DKV&subject=Mata+Pelajaran+Pilihan&cpId=...&stockCheck=1`
   - **BUKAN**: hanya `cpId=...&stockCheck=1` seperti sebelumnya
8. Warning "Tidak ada soal" seharusnya **tidak muncul lagi** jika soal ada di DB

### Step 4: Jalankan Skrip SQL Maintenance (Untuk Bug #1)
Patch kode saja tidak cukup untuk Bug #1 — data lama di database perlu di-backfill. Jalankan skrip SQL yang sudah disediakan:

1. Login ke https://supabase.com → pilih project hendrikusmuda52-droid
2. **Backup database dulu**: menu Database → Backups → Create a backup
3. Buka menu **SQL Editor** → **New query**
4. Buka file `download/skrip_sql_maintenance.sql` dari z.ai workspace
5. Copy seluruh isinya, paste ke SQL Editor
6. Klik **Run**
7. Tunggu pesan "Success. No rows returned"
8. Cek panel **Results** — akan muncul 4 tabel statistik verifikasi

### Step 5: Testing Bug #1 (CP/TP Sync)
1. Login sebagai guru → buka Grade Book
2. Pilih siswa → klik "Tambah Nilai"
3. Pilih CP dan TP tertentu, input nilai 85, simpan
4. Buka Supabase Table Editor → tabel `ManualGrade`
5. Cari record baru → **kolom `cpId` dan `tpId` harus TERISI** (tidak NULL)
6. Buka menu Export Nilai → pilih format "per CP"
7. File Excel harus berisi nilai yang baru diinput

### Step 6: Testing Bug #2 (SMK Assignments)
1. Login sebagai guru → buat tugas untuk kelas "11 DKV"
2. Login sebagai siswa kelas 11 DKV
3. Buka dashboard → **tugas baru harus muncul** di daftar tugas aktif

---

## JIKA PATCH GAGAL APPLY

Jika `git apply` error dengan message seperti:
```
error: patch failed: src/app/api/manual-grades/route.ts:60
error: src/app/api/manual-grades/route.ts: patch does not apply
```

Penyebab: file Anda sudah berubah sejak saya generate patch. Solusi:

1. **Coba dengan flag `--3way`**:
   ```bash
   git apply --3way 0001-fix-CP-TP-sync-SMK-assignment-filter-Bug-1-2.patch
   ```
   Git akan coba merge otomatis dan kasih marker conflict kalau ada.

2. **Atau apply manual**: Buka patch file di text editor, cari baris `+` dan `-`, terapkan perubahan secara manual di file Anda.

3. **Atau hubungi saya lagi**: kirim saya file Anda yang terbaru, saya regenerate patch di atas kode Anda.

---

## CHECKLIST FINAL

Setelah semua step selesai, centang checklist berikut:

- [ ] Patch #1 (Bug #1 + Bug #2) sukses di-apply
- [ ] Patch #2 (stockCheck cache) sukses di-apply
- [ ] `npx tsc --noEmit` exit 0
- [ ] `npx eslint ...` exit 0
- [ ] `git push origin main` sukses
- [ ] Vercel deploy selesai (status: Ready)
- [ ] Request `/api/questions?stockCheck=1` sekarang berisi `grade` + `subject`
- [ ] Warning "Tidak ada soal" tidak muncul lagi (jika soal ada di DB)
- [ ] Skrip SQL maintenance sudah dijalankan di Supabase
- [ ] Testing Bug #1: cpId/tpId terisi di tabel ManualGrade & Result
- [ ] Testing Bug #2: tugas SMK muncul di dashboard siswa 11 DKV / 12 DKV

Selamat! Setelah semua checklist tercentang, ketiga bug kritis sudah teratasi.
