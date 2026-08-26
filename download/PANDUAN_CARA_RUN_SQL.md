# Panduan: Cara Menjalankan SQL yang Terlalu Besar

## Masalah

File `insert_materi_detail_dan_soal_hots.sql` (1.5 MB) terlalu besar untuk dijalankan di Supabase SQL Editor. SQL Editor punya limit ~1 MB per eksekusi.

## Solusi: 2 Opsi

### OPSI 1: Pecah Jadi File Kecil (PALING MUDAH)

Saya sudah pecah file besar menjadi **16 file kecil** di folder `download/sql_parts/`:

| File | Isi | Ukuran |
|---|---|---|
| `00_update_materi.sql` | 14 UPDATE materi detail | ~100 KB |
| `01_soal_k7_cp7_1.sql` | 60 soal CP 7.1 (Berpikir Komputasi) | ~91 KB |
| `02_soal_k7_cp7_2.sql` | 60 soal CP 7.2 (Pengolahan Data) | ~99 KB |
| `03_soal_k7_cp7_3.sql` | 60 soal CP 7.3 (Literasi Informasi) | ~100 KB |
| `04_soal_k7_cp7_4.sql` | 60 soal CP 7.4 (Keseimbangan Digital) | ~100 KB |
| `05_soal_k7_cp7_5.sql` | 60 soal CP 7.5 (Perkakas TIK) | ~98 KB |
| `06_soal_k8_cp8_1.sql` | 60 soal CP 8.1 (Analisis Data) | ~99 KB |
| `07_soal_k8_cp8_2.sql` | 60 soal CP 8.2 (Berpikir Komputasional) | ~99 KB |
| `08_soal_k8_cp8_3.sql` | 60 soal CP 8.3 (Algoritma Pemrograman) | ~100 KB |
| `09_soal_k8_cp8_4.sql` | 60 soal CP 8.4 (Jejak Digital) | ~99 KB |
| `10_soal_k8_cp8_5.sql` | 60 soal CP 8.5 (Perangkat Digital) | ~99 KB |
| `11_soal_k9_cp9_1.sql` | 60 soal CP 9.1 (Struktur Data) | ~98 KB |
| `12_soal_k9_cp9_2.sql` | 60 soal CP 9.2 (Algoritma Pemrograman) | ~100 KB |
| `13_soal_k9_cp9_3.sql` | 60 soal CP 9.3 (Produktivitas Digital) | ~99 KB |
| `14_soal_k9_cp9_4.sql` | 60 soal CP 9.4 (Keamanan Digital) | ~99 KB |
| `99_verifikasi.sql` | Query verifikasi | ~1 KB |

**Masing-masing file < 110 KB, aman untuk SQL Editor.**

### Cara Pakai Opsi 1

1. **Backup database** dulu (Supabase → Database → Backups → Create a backup)

2. **Download folder `sql_parts/`** dari z.ai workspace

3. **Jalankan satu per satu** di Supabase SQL Editor:
   - Buka Supabase → SQL Editor → New query
   - Buka file `00_update_materi.sql`, copy isi, paste ke editor
   - Klik **Run**
   - Ulangi untuk file `01_soal_k7_cp7_1.sql`, `02_soal_k7_cp7_2.sql`, ... sampai `14_soal_k9_cp9_4.sql`
   - Terakhir, jalankan `99_verifikasi.sql` untuk cek hasil

4. **Tips**: Anda bisa buka multiple tab di SQL Editor. Jalankan file berbeda di tab berbeda secara paralel (tapi jangan terlalu banyak sekaligus agar tidak overload).

---

### OPSI 2: Direct Database Connection (Lebih Cepat)

Kalau Anda punya Python di komputer lokal, bisa pakai script `run_sql_direct.py` yang saya sediakan. Script ini connect langsung ke database Supabase dan jalankan semua file SQL otomatis.

#### Step 1: Install Python + psycopg2

```bash
# Install Python 3 (kalau belum ada)
# Download dari python.org

# Install psycopg2
pip install psycopg2-binary
```

#### Step 2: Download File

Download dari z.ai workspace:
- Folder `download/sql_parts/` (16 file SQL)
- File `scripts/run_sql_direct.py`

#### Step 3: Dapatkan DATABASE_URL

1. Login ke https://supabase.com
2. Pilih project `hendrikusmuda52-droid`
3. Menu **Settings** → **Database**
4. Scroll ke **Connection string**
5. Pilih tab **"Transaction"** (port 6543)
6. Copy URL-nya, format:
   ```
   postgresql://postgres.PROJECT:PASSWORD@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
   ```

#### Step 4: Set DATABASE_URL

**Opsi A**: Set environment variable (recommended)
```bash
# Linux/Mac:
export DATABASE_URL="postgresql://postgres.PROJECT:PASSWORD@host:6543/postgres"

# Windows (PowerShell):
$env:DATABASE_URL="postgresql://postgres.PROJECT:PASSWORD@host:6543/postgres"
```

**Opsi B**: Edit langsung di file `run_sql_direct.py` baris 19
```python
DATABASE_URL = "postgresql://postgres.PROJECT:PASSWORD@host:6543/postgres"
```

#### Step 5: Jalankan Script

```bash
python3 run_sql_direct.py
```

Script akan:
1. Connect ke database
2. Konfirmasi (anda ketik 'ya')
3. Jalankan 16 file SQL satu per satu
4. Tampilkan progress + summary
5. Disconnect

---

## Rekomendasi

| Situasi | Opsi yang Direkomendasikan |
|---|---|
| Anda tidak punya Python di komputer | **Opsi 1** (SQL Editor manual) |
| Anda familiar dengan terminal/command line | **Opsi 2** (Python script) |
| Anda ingin cepat (sekaligus) | **Opsi 2** (otomatis 16 file) |
| Anda ingin kontrol per-file | **Opsi 1** (bisa skip file tertentu) |

## Troubleshooting

### Error: "syntax error at or near..."

Kemungkinan ada karakter escape yang salah. Kirim saya error detail + nama file yang gagal.

### Error: "duplicate key value violates unique constraint"

Itu normal — artinya soal/materi sudah pernah di-insert. `ON CONFLICT DO NOTHING` akan skip, bukan error fatal.

### Error: "value too long for type character varying(100)"

Sudah saya fix di versi terbaru (deskripsi TP < 100 char). Kalau masih error, kirim nama field + value yang bermasalah.

### Verification: soal kurang dari 838

Beberapa soal mungkin di-skip karena format. Cek log script generator. Total seharusnya ~838 soal.

## Status

✅ File SQL sudah dipecah menjadi 16 file kecil di `download/sql_parts/`
✅ Script Python `run_sql_direct.py` sudah dibuat untuk direct connection
✅ Panduan ini (file ini) sudah dibuat

**Tinggal pilih opsi mana yang cocok untuk Anda, lalu jalankan!**
