#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Materi detail Kelas 8 (5 bab) - Buku Informatika Kemendikbud 2024"""

MATERI_KELAS_8 = [
    {
        "id": "mat_inf_8_1",
        "title": "Bab 1: Analisis Data",
        "targetKelas": "8A,8B,8C",
        "cpId": "cp_inf_8_1",
        "tpId": "tp_inf_8_1_1",
        "category": "Analisis Data",
        "content": """# Bab 1: Analisis Data

## Mengapa Analisis Data Penting?

Pak Budi adalah kepala sekolah. Dia punya data nilai 500 siswa dari 3 tahun terakhir. Tanpa analisis, datanya cuma angka mati. Tapi setelah dianalisis, dia temukan: "Siswa kelas 8 selalu turun nilainya di semester 2 — kenapa?" Ternyata, di semester 2 ada event ekstrakurikuler yang menguras waktu belajar. Pak Budi lalu atur jadwal ulangan setelah event selesai. **Itu kekuatan analisis data** — mengubah angka menjadi keputusan.

## A. Pencarian Data

### Lookup Functions

#### VLOOKUP (Vertical Lookup)
Mencari nilai di kolom pertama tabel, lalu mengembalikan nilai di kolom yang ditunjuk.

```
=VLOOKUP(nilai_dicari, tabel_referensi, nomor_kolom, [range_lookup])
```

**Contoh real:** Tabel gaji karyawan:
```
A          B          C
NIK       Nama       Gaji
1001      Andi       5,000,000
1002      Budi       6,500,000
1003      Citra      7,200,000
```

Cari gaji Budi: `=VLOOKUP("1002", A1:C4, 3, FALSE)` → 6,500,000

**Catatan:**
- `FALSE` = cari yang persis sama (exact match)
- `TRUE` = cari yang terdekat (approximate match, untuk range)
- VLOOKUP selalu cari di kolom **paling kiri** tabel referensi

#### HLOOKUP (Horizontal Lookup)
Mirip VLOOKUP tapi untuk tabel horizontal (header di baris atas).

#### INDEX-MATCH (Lebih Powerful)
```
=INDEX(kolom_hasil, MATCH(nilai_dicari, kolom_pencarian, 0))
```

**Keunggulan INDEX-MATCH:**
- Bisa cari di kolom mana saja (tidak harus paling kiri)
- Lebih cepat untuk data besar
- Tidak rusak kalau ada kolom di-insert

**Contoh real:**
```
A         B          C
Nama     NIK        Gaji
Andi     1001       5,000,000
Budi     1002       6,500,000
```
Cari gaji berdasarkan NIK: `=INDEX(C2:C4, MATCH("1002", B2:B4, 0))` → 6,500,000

### Database Functions
- **DSUM**: jumlah dengan kriteria
- **DCOUNT**: hitung dengan kriteria
- **DAVERAGE**: rata-rata dengan kriteria

**Contoh:** Hitung rata-rata gaji karyawan departemen IT:
```
=DAVERAGE(A1:C100, "Gaji", F1:F2)
```
di mana F1 = "Departemen", F2 = "IT"

## B. Visualisasi Data

### Memilih Grafik yang Tepat

| Tujuan | Grafik Cocok | Contoh |
|---|---|---|
| Bandingkan kategori | Bar chart | Penjualan per produk |
| Tren waktu | Line chart | Saham per bulan |
| Proporsi | Pie chart | Demografi pemilih |
| Hubungan 2 variabel | Scatter | Tinggi vs berat |
| Distribusi | Histogram | Distribusi nilai ujian |
| Komposisi waktu | Stacked bar | Pengeluaran per kategori |

**Contoh real:** Bu Guru ingin tahu tren nilai kelas dari ulangan 1-5:
- ❌ Pie chart: tidak bisa tunjukkan tren
- ✅ Line chart: jelas terlihat naik/turun

### Pivot Table
Alat untuk **meringkas** data besar berdasarkan dimensi.

**Contoh real:** Tabel 1000 baris data penjualan (tanggal, produk, kota, jumlah). Pivot table bisa jawab:
- Total penjualan per kota (rows = kota, values = sum jumlah)
- Penjualan per produk per bulan (rows = produk, columns = bulan)
- Rata-rata penjualan per salesman (rows = salesman, values = avg)

### Pivot Chart
Grafik yang otomatis ter-update dari pivot table. Saat pivot table berubah, grafik ikut.

### Dashboard Sederhana
Kombinasi beberapa grafik + KPI (Key Performance Indicator) dalam 1 layar.

**Contoh real:** Dashboard penjualan sekolah:
- KPI: total penjualan bulan ini
- Bar chart: penjualan per kelas
- Line chart: tren mingguan
- Pie chart: distribusi produk

## C. Peringkasan Data

### Statistik Deskriptif

#### Mean (Rata-rata)
```
= AVERAGE(range) atau = SUM(range)/COUNT(range)
```
**Contoh:** Nilai 80, 75, 90, 65, 85 → mean = 79

#### Median (Nilai Tengah)
Urutkan data, ambil yang di tengah.
```
=MEDIAN(range)
```
**Contoh:** 65, 75, 80, 85, 90 → median = 80 (yang di tengah)

**Kenapa median kadang lebih baik dari mean?**
- Data: 5, 5, 5, 5, 100
- Mean = 24 (terlihat tinggi, menyesatkan)
- Median = 5 (lebih mewakili)

#### Modus (Paling Sering Muncul)
```
=MODE(range)
```
**Contoh:** 80, 75, 80, 90, 80 → modus = 80

#### Standar Deviasi (Sebaran Data)
Mengukur seberapa jauh data dari rata-rata.
```
=STDEV(range)
```
**Contoh:**
- Kelas A: 80, 80, 80, 80, 80 (STDEV = 0, semua sama)
- Kelas B: 60, 70, 80, 90, 100 (STDEV = 15.8, menyebar)

### Distribusi Data
- **Normal**: bentuk lonceng (sebagian besar di tengah)
- **Skewed**: miring ke kiri/kanan
- **Bimodal**: 2 puncak

### Korelasi
Mengukur hubungan 2 variabel (range -1 sampai +1).
```
=CORREL(range1, range2)
```

**Contoh real:**
- Jam belajar vs nilai: korelasi +0.7 (makin lama belajar, makin tinggi nilai)
- Jam main game vs nilai: korelasi -0.5 (makin sering main, makin turun nilai)
- Tinggi vs warna mata: korelasi 0 (tidak berhubungan)

**HATI-HATI:** Korelasi TIDAK sama dengan kausalitas!
- Penjualan es krim vs serangan hiu: korelasi +0.8
- Bukan berarti es krim sebabkan serangan hiu
- Penyebab: musim panas (keduanya naik saat panas)

## D. Uji Kompetensi

### Soal Latihan
1. Bu Guru punya 30 nilai siswa. Hitung mean, median, modus, dan STDEV. Apa yang bisa kamu simpulkan?
2. Buat pivot table dari data penjualan sekolah: rows = kelas, columns = produk, values = sum jumlah.
3. Pilih grafik untuk: (a) tren nilai 5 ulangan, (b) proporsi pilihan SMA/SMK/SMK siswa kelas 9.
4. Cari korelasi jam belajar vs nilai. Apa kausalitasnya? Apa mungkin ada variabel lain?

### Proyek Mini
Ambil dataset publik (BPS, Kaggle, data.go.id). Buat analisis end-to-end:
- Pembersihan data (hapus duplikat, isi missing)
- Statistik deskriptif
- Visualisasi (min 3 grafik)
- Dashboard 1 halaman
- Kesimpulan: insight apa yang kamu temukan?

---
**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 1, hal. 1-56
**Tools:** Google Sheets (gratis), Excel, Tableau Public (gratis untuk publik)
"""
    },
    {
        "id": "mat_inf_8_2",
        "title": "Bab 2: Berpikir Komputasional",
        "targetKelas": "8A,8B,8C",
        "cpId": "cp_inf_8_2",
        "tpId": "tp_inf_8_2_1",
        "category": "Berpikir Komputasional",
        "content": """# Bab 2: Berpikir Komputasional

## Dari Konsep ke Formal

Di kelas 7, kamu belajar 4 pilar berpikir komputasional: dekomposisi, pola, abstraksi, algoritma. Sekarang di kelas 8, kita masuk ke level **formal** — pakai notasi matematika dan struktur data yang lebih ketat.

## A. Fungsi

### Definisi Fungsi
**Fungsi** = pemetaan dari input ke output, di mana setiap input punya tepat 1 output.

Notasi: `f(x) = ...`

**Contoh real:**
- `f(x) = 2x + 1` → f(3) = 2(3)+1 = 7
- `f(panjang, lebar) = panjang × lebar` → luas persegi panjang

### Fungsi Komposisi
Menggabungkan 2 atau lebih fungsi.

`f(g(x))` = fungsi f diterapkan ke hasil g(x)

**Contoh real:** 
- g(x) = x + 5 (tambah 5)
- f(x) = 2x (kali 2)
- f(g(3)) = f(3+5) = f(8) = 2(8) = 16

### Aplikasi di Pemrograman
```python
def hitung_luas(panjang, lebar):
    return panjang * lebar

def format_hasil(luas):
    return f"Luas: {luas} cm²"

# Komposisi:
print(format_hasil(hitung_luas(10, 5)))
# Output: "Luas: 50 cm²"
```

## B. Himpunan dan Sistem Bilangan

### Himpunan
Kumpulan objek unik.

**Operasi:**
- **Union (∪)**: gabungan
- **Intersection (∩)**: irisan
- **Difference (-)**: selisih

**Contoh real:**
- A = siswa kelas 8A = {Andi, Budi, Citra}
- B = siswa yang ikut basket = {Budi, Citra, Doni}

- A ∪ B = {Andi, Budi, Citra, Doni} (semua siswa unik)
- A ∩ B = {Budi, Citra} (siswa 8A yang ikut basket)
- A - B = {Andi} (siswa 8A yang tidak ikut basket)

### Sistem Bilangan

#### 1. Desimal (Basis 10)
Digit: 0-9. Yang kita pakai sehari-hari.

#### 2. Biner (Basis 2)
Digit: 0, 1. Yang dipakai komputer.

**Konversi Desimal → Biner:**
- Bagi 2, catat sisa
- Ulangi sampai 0
- Baca sisa dari bawah ke atas

**Contoh:** 13 desimal ke biner:
```
13 ÷ 2 = 6 sisa 1
 6 ÷ 2 = 3 sisa 0
 3 ÷ 2 = 1 sisa 1
 1 ÷ 2 = 0 sisa 1
```
Baca dari bawah: **1101**

**Verifikasi:** 1×8 + 1×4 + 0×2 + 1×1 = 8+4+0+1 = 13 ✓

**Konversi Biner → Desimal:**
Kalikan setiap digit dengan 2^posisi (dari kanan, mulai 0).

**Contoh:** 1011 biner = 1×8 + 0×4 + 1×2 + 1×1 = 8+0+2+1 = 11

#### 3. Oktal (Basis 8)
Digit: 0-7. Dipakai untuk permission Linux (chmod 755).

#### 4. Heksadesimal (Basis 16)
Digit: 0-9, A-F. Dipakai untuk warna HTML (#FF0000 = merah).

**Contoh real:**
- Warna putih di HTML: `#FFFFFF` = (255, 255, 255) dalam RGB
- `FF` heksa = 255 desimal = 11111111 biner

### Operasi Aritmatika Biner

#### Penjumlahan Biner
Aturan:
- 0 + 0 = 0
- 0 + 1 = 1
- 1 + 0 = 1
- 1 + 1 = 10 (0 dengan carry 1)

**Contoh:** 1011 + 0110
```
  1011
+ 0110
  ----
 10001
```
Verifikasi: 11 + 6 = 17 ✓ (10001 biner = 17 desimal)

## C. Struktur Data

### Konsep
Struktur data = cara mengorganisir data agar efisien diakses.

### Array (Larik)
Kumpulan data sejenis dengan index.

**Array 1D:**
```
[Andi, Budi, Citra, Doni]
   0     1      2      3     ← index
```
Akses: `nama[0]` = "Andi"

**Array 2D (Matriks):**
```
[[85, 90, 75],     ← siswa 0
 [60, 70, 80],     ← siswa 1
 [90, 85, 95]]     ← siswa 2
```
Akses: `nilai[1][2]` = 80 (siswa 1, ulangan ke-3)

**Contoh real:** Papan catur = array 2D 8x8. Setiap sel berisi: kosong, bidak putih, atau bidak hitam.

### List
Mirip array, tapi **dinamis** (bisa tambah/hapus elemen).

**Operasi:**
- `append(x)`: tambah di akhir
- `insert(i, x)`: sisipkan di index i
- `remove(x)`: hapus elemen x
- `pop()`: ambil elemen terakhir

### Stack (Tumpukan)
**LIFO** (Last In First Out). Seperti tumpukan piring: yang terakhir ditaruh, pertama diambil.

**Operasi:**
- `push(x)`: taruh di atas
- `pop()`: ambil dari atas
- `peek()`: lihat yang atas tanpa ambil

**Contoh real:**
- Tombol Back di browser: halaman terakhir dikunjungi, pertama dikembalikan
- Undo di Word: aksi terakhir, pertama di-undo

### Queue (Antrian)
**FIFO** (First In First Out). Seperti antrian kasir: yang pertama datang, pertama dilayani.

**Operasi:**
- `enqueue(x)`: tambah di belakang
- `dequeue()`: ambil dari depan

**Contoh real:**
- Antrian printer: dokumen pertama dikirim, pertama dicetak
- Antrian tiket online

### Penerapan Struktur Data dalam Kehidupan
- **Array**: daftar absen siswa
- **List**: playlist Spotify (bisa tambah/hapus lagu)
- **Stack**: history browser, undo/redo
- **Queue**: antrian CS, antrian print

## D. Uji Kompetensi

### Soal Latihan
1. Konversi 25 desimal ke biner, oktal, heksadesimal!
2. Hitung 1101 + 1011 dalam biner. Verifikasi dalam desimal!
3. Buat fungsi f(x) = 3x - 5. Hitung f(4) dan f(f(2)).
4. Jika A = {1,2,3,4} dan B = {3,4,5,6}, hitung A∪B, A∩B, A-B!
5. Buat array 2D 3x3 berisi nilai siswa. Akses nilai siswa ke-2 di ulangan ke-3.

### Proyek Mini
Buat "kalkulator biner" sederhana di Scratch atau Python:
- Input: 2 angka desimal
- Output: hasil penjumlahan dalam biner, oktal, heksadesimal
- Tampilkan proses konversi step-by-step

---
**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 2, hal. 57-92
**Tools latihan:** Python (di replit.com), Scratch (scratch.mit.edu)
"""
    },
    {
        "id": "mat_inf_8_3",
        "title": "Bab 3: Algoritma Pemrograman",
        "targetKelas": "8A,8B,8C",
        "cpId": "cp_inf_8_3",
        "tpId": "tp_inf_8_3_1",
        "category": "Algoritma Pemrograman",
        "content": """# Bab 3: Algoritma Pemrograman

## Dari Teori ke Praktik

Kelas 7 kamu belajar algoritma sebagai konsep. Sekarang kelas 8, kamu akan **menulis program nyata** — pakai Scratch (visual blok), Blockly Games (edukasi), dan dikenalkan robot Ozobot.

## A. Literasi Numerasi

### Hubungan Numerasi dengan Pemrograman
Pemrograman = numerasi yang diimplementasikan. Kalau kamu lemah numerasi, susah membuat program yang akurat.

**Contoh:** Looping `for i = 1 to 10` butuh paham pola bilangan. Loop `while n > 0` butuh paham decrement.

### Pola Bilangan dan Deret

#### Deret Aritmatika
Selisih antar suku tetap.
- Contoh: 2, 5, 8, 11, 14, ... (selisih = 3)
- Rumus suku ke-n: a_n = a_1 + (n-1) × d

#### Deret Geometri
Rasio antar suku tetap.
- Contoh: 3, 6, 12, 24, 48, ... (rasio = 2)
- Rumus: a_n = a_1 × r^(n-1)

**Aplikasi di kode:**
```python
# Cetak deret aritmatika 2, 5, 8, 11, 14
for i in range(5):
    print(2 + i * 3)
```

## B. Eksplorasi Lanjutan Scratch

### Variabel dan List di Scratch

#### Variabel
Kotak penyimpanan 1 nilai.

**Cara buat:** Variables → Make a Variable → beri nama

**Contoh:** Buat skor game:
```
when green flag clicked
set [skor v] to [0]
...
change [skor v] by [10]  ← tambah 10 tiap musuh kalah
```

#### List
Variabel yang bisa simpan banyak nilai (seperti array).

**Cara buat:** Variables → Make a List

**Contoh:** Daftar nama siswa:
```
add [Andi] to [daftar_siswa v]
add [Budi] to [daftar_siswa v]
add [Citra] to [daftar_siswa v]

say (item (1) of [daftar_siswa v])  ← "Andi"
say (length of [daftar_siswa v])     ← "3"
```

### Custom Block (Make a Block)
Membuat blok sendiri = membuat fungsi/prosedur.

**Kenapa penting?** Modularitas. Daripada tulis kode panjang berulang, buat 1 blok reusable.

**Contoh:** Blok `gambar_persegi(ukuran)`:
```
define gambar_persegi (ukuran)
repeat (4)
  move (ukuran) steps
  turn cw (90) degrees
end

when green flag clicked
gambar_persegi (100)  ← gambar persegi ukuran 100
pen up
go to x: 100 y: 0
pen down
gambar_persegi (50)   ← gambar persegi ukuran 50
```

### Event-Driven Programming
Program merespon event (klik, tombol, broadcast).

**Contoh:**
```
when [space v] key pressed
say [Lompat!] for (1) seconds

when this sprite clicked
broadcast [mulai_game v]

when I receive [mulai_game v]
set [skor v] to [0]
```

### Mini-Proyek: Game Sederhana
**Game: Kucing kejar tikus**
- Kucing follow mouse
- Skor +1 tiap kucing ketemu tikus
- Game over kalau 30 detik habis

Komponen yang dipakai:
- Variabel: skor, waktu
- Event: when green flag, when key pressed
- Conditional: if skor > 10 then ...
- Loop: forever, repeat

## C. Pengantar Blockly Games

### Apa itu Blockly Games?
Platform game edukasi dari Google untuk belajar pemrograman visual. URL: blockly.games

### Puzzle Maze
Game maze yang diselesaikan dengan blok kode.

**Konsep yang diajarkan:**
1. **Maze level 1-3**: urutan langkah (sequence)
   ```
   move forward
   move forward
   turn left
   move forward
   ```

2. **Maze level 4-6**: perulangan (loop)
   ```
   repeat until goal:
     if path ahead:
       move forward
     else if path left:
       turn left
     else:
       turn right
   ```

3. **Maze level 7-10**: kondisi + loop bersarang
   ```
   while not at goal:
     if path right:
       turn right
     else if path forward:
       move forward
     else:
       turn left
   ```

**Strategi:**
- Pakai loop `while`/`until` (lebih fleksibel)
- Cek kondisi dulu sebelum gerak
- Jangan hardcode semua langkah

### Eksplorasi Blockly Games Music
Game untuk membuat komposisi musik dengan blok.

**Konsep:**
- Not balok → blok nada
- Loop → pengulangan melodi
- Fungsi → blok custom untuk motif

**Kreativitas:** Siswa bisa komposisi lagu sendiri sambil belajar konsep pemrograman.

## D. Pengenalan Pemrograman Prosedural

### Konsep Prosedur dan Fungsi
- **Prosedur**: blok kode yang melakukan tugas, tidak return nilai
- **Fungsi**: blok kode yang return nilai

**Contoh prosedur:** `cetak_laporan()` — hanya cetak, tidak return
**Contoh fungsi:** `hitung_luas(panjang, lebar)` → return panjang × lebar

### Parameter dan Return Value
**Parameter** = input ke fungsi.
**Return value** = output fungsi.

```python
# Definisi fungsi dengan 2 parameter
def hitung_luas(panjang, lebar):
    return panjang * lebar   # return value

# Pemanggilan dengan argumen
luas = hitung_luas(10, 5)   # luas = 50
```

### Modularisasi Kode
Pecah program besar jadi fungsi-fungsi kecil.

**Manfaat:**
- **Reusable**: fungsi bisa dipakai ulang
- **Testable**: fungsi kecil mudah dites
- **Maintainable**: bug mudah dilacak
- **Readable**: kode jadi jelas

**Contoh real:** Game RPG kompleks dipecah jadi:
- `gerak_karakter()`
- `cek_tabrakan()`
- `hitung_skor()`
- `simpan_progress()`
- `tampilkan_UI()`

## E. Pengenalan Robot Ozobot

### Apa itu Ozobot?
Robot mini seukuran bola pingpong yang mengikuti garis warna di kertas.

### Color Code: Kode Warna
Ozobot membaca urutan warna sebagai perintah:
- **Hitam**: ikuti garis (default)
- **Merah, Hijau, Biru, Hitam** (kombinasi): perintah khusus

**Contoh color code:**
- `Merah-Hijau-Merah`: belok kiri di pertigaan
- `Biru-Hijau-Biru`: belok kanan
- `Hitam-Hijau-Hijau`: turbo (cepat)
- `Merah-Merah-Hijau`: putar balik

### Pengenalan Block-Based Programming Ozobot
**Ozobot Blockly** (ozoblockly.com): editor visual seperti Scratch.

**Level:**
1. Master: blok sederhana (warna, gerak)
2. Track: kondisi (if sensor warna)
3. Pro: variabel + fungsi

**Contoh kode:**
```
when start:
  drive forward 5 cm
  turn right 90°
  drive forward 3 cm
  set LED color green
  play sound "beep"
```

## F. Uji Kompetensi

### Soal Latihan
1. Buat deret aritmatika dengan suku pertama 5 dan selisih 4. Tulis 8 suku pertama!
2. Buat custom block Scratch `gambar_segitiga(sisi)` yang gambar segitiga sama sisi!
3. Selesaikan Blockly Maze level 5. Berapa blok yang kamu pakai?
4. Buat fungsi Python `is_genap(n)` yang return True kalau n genap, False kalau ganjil!
5. Buat Ozobot mengikuti jalur: maju → belok kiri → mundur → stop. Tulis color code-nya!

### Proyek Mini
**Proyek: Game Edukasi Matematika di Scratch**
- Tampilkan soal: 7 × 8 = ?
- User input jawaban
- Cek jawaban: +10 skor kalau benar, -5 kalau salah
- 10 soal, tampilkan total skor di akhir

**Bonus:** Tambahkan timer 30 detik per soal. Kalau habis, otomatis salah.

---
**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 3, hal. 93-156
**Tools:** scratch.mit.edu, blockly.games, ozoblockly.com
"""
    },
    {
        "id": "mat_inf_8_4",
        "title": "Bab 4: Jejak Bermedia Digital",
        "targetKelas": "8A,8B,8C",
        "cpId": "cp_inf_8_4",
        "tpId": "tp_inf_8_4_1",
        "category": "Jejak Digital",
        "content": """# Bab 4: Jejak Bermedia Digital

## Apa Itu Jejak Digital?

Setiap aktivitas onlinemu meninggalkan jejak. Kamu like foto teman di Instagram → jejak. Kamu cari "sepatu Nike" di Google → jejak. Kamu tonton video kucing di YouTube → jejak. Semua ini tercatat di server perusahaan teknologi — selamanya.

**Fakta:** Seorang anak yang lahir tahun 2025 akan punya **jejak digital sebelum bisa bicara** — foto USG di-posting orangtua, tanggal lahir di socmed, akun PB mandiri di bank digital. Di usia 18 tahun, dia sudah punya 18 tahun data.

## A. Konsep Jejak Digital

### Active vs Passive Digital Footprint

#### Active Footprint (Aktif)
Jejak yang kamu **sengaja** tinggalkan:
- Posting foto Instagram
- Komentar di YouTube
- Email yang kamu kirim
- Review di GoFood/Grab

#### Passive Footprint (Pasif)
Jejak yang **tercatat tanpa kamu sadari**:
- IP address saat browsing
- Lokasi GPS saat buka Google Maps
- Cookies yang terpasang otomatis
- Search history
- Watch time di YouTube

**Contoh real:** Kamu buka TikTok 10 menit. Walaupun tidak like/comment/share, TikTok tahu:
- Video apa yang kamu tonton
- Berapa lama tiap video
- Jam berapa kamu online
- Dari lokasi mana (GPS/WiFi)
- Tipe HP-mu

### Cookies dan Tracking

#### Apa Itu Cookies?
File kecil yang disimpan website di browser-mu untuk "mengingat" kamu.

**Jenis cookies:**
- **Session cookies**: hilang saat tutup browser
- **Persistent cookies**: bertahan sampai tanggal expired
- **First-party**: dari website yang kamu kunjungi
- **Third-party**: dari domain lain (biasanya untuk tracking)

**Contoh real:** Kamu masukkan sepatu ke keranjang Tokopedia. Tutup browser. Besoknya buka Tokopedia lagi — sepatunya masih ada di keranjang. Itu kerja cookies.

#### Tracking
Perusahaan teknologi lacak aktivitasmu untuk:
- **Personalisasi iklan**: kamu cari "laptop gaming", besoknya iklan laptop di mana-mana
- **Analisis**: tahu video mana yang viral
- **Profil pengguna**: tahu umur, lokasi, minat, kebiasaan

**Studi kasus:** Facebook pernah dituduh Cambridge Analytica pakai data 87 juta user untuk iklan politik. Facebook didenda $5 miliar.

### Data Trail di Media Sosial
Setiap platform punya data berbeda tentang kamu:

| Platform | Data yang Dikumpulkan |
|---|---|
| Facebook | likes, postingan, lokasi check-in, kontak |
| Instagram | foto, video, story, DM, waktu tonton |
| TikTok | video ditonton, durasi, like, share, comment |
| WhatsApp | kontak, chat, lokasi, status |
| Google | search history, YouTube, Gmail, Maps, Drive |

## B. Identitas Digital

### Personal Branding Online
Identitasmu di dunia digital = **gabungan semua akun dan konten** yang kamu miliki.

**Tips membangun personal branding:**
1. **Konsisten** — username sama di semua platform
2. **Profil profesional** — foto profile yang sopan, bio yang jelas
3. **Konten positif** — posting prestasi, ilmu, hobi yang bermanfaat
4. **Hindari drama** — jangan terlibat perdebatan toxic

### Netiqueta (Etika Online)
- **Sopan**: gunakan bahasa yang baik
- **Hormati privasi**: jangan tag tanpa izin
- **Jangan spam**: hindari post berulang kali
- **Cek sumber**: sebelum share, pastikan bukan hoaks
- **Hindari flame war**: jangan terlibat perdebatan emosional

## C. Reputasi Online

### Cara Membangun Reputasi Baik
1. **Posting prestasi** — juara lomba, sertifikat, project
2. **Bagikan ilmu** — tulis artikel, buat video edukasi
3. **Bantu orang lain** — jawab pertanyaan di forum
4. **Kolaborasi** — tag kreator yang kamu hormati

### Dampak Postingan terhadap Karier
Studi 2023: **93% HRD cek media sosial kandidat** sebelum hire.

**Yang bikin ditolak:**
- Posting makian/keluhan
- Foto dengan konten tidak pantas
- Komentar rasis/SARA
- Bukti penggunaan narkoba
- Penyebaran hoaks

**Yang bikin diterima:**
- Profil profesional
- Portofolio project
- Rekomendasi dari koneksi
- Posting terkait industri

**Contoh real:** Seorang fresh graduate di-Tolak di tahap akhir karena posting tweet 5 tahun lalu yang menghina perusahaan tersebut. Twitter-nya public, HRD temukan.

### Cara Menghapus Jejak Negatif

#### 1. Google Yourself
Cari nama kamu di Google. Lihat apa yang muncul. Kalau ada yang negatif, catat URL-nya.

#### 2. Hapus Konten Sendiri
- Login ke socmed masing-masing
- Hapus postingan negatif
- Hapus tag foto yang tidak menguntungkan

#### 3. Request Removal dari Google
- Google Search → "Remove information"
- Isi form untuk URL yang ingin dihapus
- Google evaluasi, kalau memenuhi kriteria, akan hapus dari index

#### 4. Hubungi Webmaster
Kalau konten negatif ada di website orang lain, hubungi admin website tersebut untuk hapus.

#### 5. Buat Konten Positif Baru
Buat konten baru yang menempatkan konten negatif ke halaman 2-3 Google. Karena jarang yang lihat halaman 2, efek negatif berkurang.

## D. Privasi dan Keamanan Data

### Pengaturan Privasi Sosmed

#### Instagram
- Settings → Privacy → Account private (hanya follower yang lihat)
- Settings → Privacy → Comments → block kata kasar
- Settings → Privacy → Tags → approve manual

#### Facebook
- Settings → Privacy → Who can see your future posts? → Friends (bukan Public)
- Settings → Timeline and Tagging → Review posts before they appear

#### TikTok
- Settings → Privacy → Private account
- Settings → Privacy → Suggest your account to others → Off

### Risiko Phishing dan Social Engineering

#### Phishing
Email/SMS palsu menyamar institusi resmi.

**Ciri phishing:**
- URL mencurigakan (paypa1.com bukan paypal.com)
- Bahasa formal berlebihan
- Urgent: "Akun diblokir dalam 24 jam!"
- Minta data sensitif (password, PIN, OTP)

**Contoh real:** SMS "Anda menang undian Toyota Avanza. Transfer biaya administrasi Rp 250.000 ke rekening XXX." → penipuan.

#### Social Engineering
Manipulasi psikologis agar korban menyerahkan info.

**Teknik:**
- **Pretexting**: pura-pura figur otoritas (polisi, bank)
- **Baiting**: godaan hadiah gratis
- **Quid pro quo**: "saya bantu Anda, Anda kasih saya..."
- **Tailgating**: ikut masuk area terbatas

### Cara Melaporkan Konten Abuse
- **Instagram**: Report → It's inappropriate → pilih alasan
- **Facebook**: Report post → pilih kategori
- **Twitter**: Report Tweet → pilih alasan
- **Polisi**: cybercrime.co.id (Indonesia)

## E. Uji Kompetensi

### Soal Refleksi
1. Google diri sendiri. Apa yang muncul di halaman 1? Apakah ada yang negatif?
2. Cek pengaturan privasi Instagram-mu. Apakah akunmu private atau public?
3. Buat daftar 5 akun socmed-mu. Untuk tiap akun: kapan terakhir cek pengaturan privasi?
4. Pernahkah kamu terima phishing? Ceritakan. Bagaimana kamu tahu itu phishing?

### Proyek Mini
**Audit Jejak Digital:**
1. Buat daftar semua akun online yang kamu punya (socmed, email, game, e-commerce)
2. Untuk tiap akun: tulis jenis data yang kamu share (profil, foto, lokasi, kontak)
3. Audit pengaturan privasi: apakah sudah private atau masih public?
4. Rencana perbaikan: 3 hal yang akan kamu lakukan minggu ini untuk bersih-bersih jejak

---
**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 4, hal. 157-186
**Tools:** haveibeenpwned.com (cek email bocor), Google Account Activity, Facebook Privacy Checkup
"""
    },
    {
        "id": "mat_inf_8_5",
        "title": "Bab 5: Pemanfaatan Perangkat Digital",
        "targetKelas": "8A,8B,8C",
        "cpId": "cp_inf_8_5",
        "tpId": "tp_inf_8_5_1",
        "category": "Perangkat Digital",
        "content": """# Bab 5: Pemanfaatan Perangkat Digital

## Dari Konsumen ke Produsen Teknologi

Di kelas 7 kamu belajar "apa itu komputer". Sekarang kelas 8, kamu belajar **cara memanfaatkan perangkat digital** untuk produktivitas, kolaborasi, dan komunikasi — bekal hidup di abad 21.

## A. Perangkat Digital dan Komunikasi Data

### Smart Device
Perangkat pintar yang bisa terhubung internet dan jalankan aplikasi.

**Jenis:**
- **Smartphone**: HP pintar (Android, iPhone)
- **Tablet**: layar besar, sentuh
- **Laptop**: portable, keyboard fisik
- **Smartwatch**: jam tangan pintar
- **Smart speaker**: Google Home, Alexa
- **Smart TV**: TV dengan app (Netflix, YouTube)

### Cara Kerja Pengiriman Data

#### Bluetooth
- Jarak pendek (10m)
- Cocok untuk: headset, transfer file antar HP
- Kecepatan: 1-3 Mbps (Bluetooth 5.0)

#### WiFi
- Jarak menengah (30-100m)
- Cocok untuk: home, kantor, kafe
- Kecepatan: 100 Mbps - 6 Gbps (WiFi 6E)

#### Seluler (4G/5G)
- Jarak: jangkauan menara (km)
- Cocok untuk: mobile di mana saja
- Kecepatan: 4G = 100 Mbps, 5G = 10 Gbps

### Bandwidth dan Latency
- **Bandwidth**: kapasitas jalur (Mbps)
  - Analogi: lebar jalan raya. Jalan 4 lajur = lewat banyak mobil sekaligus
- **Latency**: delay sinyal (ms)
  - Analogi: waktu tempuh. Jalan macet = latency tinggi

**Contoh real:**
- Streaming Netflix butuh bandwidth tinggi (5-25 Mbps), latency tidak terlalu penting
- Game online butuh latency rendah (<50ms), bandwidth tidak terlalu tinggi

## B. Aplikasi Produktivitas Mobile

### Office Mobile
- **Microsoft Office Mobile**: Word, Excel, PowerPoint di HP
- **Google Docs/Sheets/Slides**: online + offline, kolaboratif
- **WPS Office**: gratis, kompatibel dengan MS Office

### Cloud Sync
Sinkronisasi data antar perangkat via cloud.

**Contoh real:**
- Kamu tulis tugas di HP (Google Docs)
- Di rumah, buka laptop → tugasnya masih ada
- Di sekolah, buka komputer lab → tugasnya masih ada
- Edit di mana saja, sync otomatis

**Cloud storage populer:**
- Google Drive: 15 GB gratis
- OneDrive: 5 GB gratis
- Dropbox: 2 GB gratis
- iCloud: 5 GB gratis

### Note-Taking Apps
- **Google Keep**: sticky notes, gratis
- **Evernote**: powerful, ada free tier
- **Notion**: all-in-one workspace
- **OneNote**: dari Microsoft

**Use case:** Catat ide, simpan link, buat to-do list, kerjakan tugas.

## C. Kolaborasi Online

### Google Workspace
Paket aplikasi Google untuk produktivitas + kolaborasi.

**Aplikasi:**
- **Google Docs**: dokumen, kolaborasi real-time
- **Google Sheets**: spreadsheet
- **Google Slides**: presentasi
- **Google Drive**: storage
- **Gmail**: email
- **Google Meet**: video conference
- **Google Calendar**: jadwal

**Fitur kolaborasi:**
- **Real-time editing**: multiple orang edit dokumen yang sama
- **Comments**: diskusi di pinggir dokumen
- **Version history**: lihat perubahan dari waktu ke waktu
- **Share with permissions**: viewer/commenter/editor

**Contoh real:** Kelompok 5 siswa kerjakan tugas bersama:
- Buat 1 Google Doc, share ke 4 teman (editor)
- Semua edit bersamaan, lihat cursor teman real-time
- Komentar di bagian yang perlu diskusi
- Tidak perlu kirim-kirim file via WhatsApp

### Microsoft 365 Online
Versi cloud dari Microsoft Office.

**Aplikasi:**
- Word Online, Excel Online, PowerPoint Online
- OneDrive
- Teams (chat + video call)
- Outlook (email)

**Bedanya dengan Google Workspace:**
- Microsoft: lebih powerful di fitur, dokumentasi profesional
- Google: lebih simpel, real-time collab lebih mulus

### Tools Kolaborasi Lainnya

#### Slack
Chat tim untuk pekerjaan. Channel-based (mis: #marketing, #dev, #random).

#### Trello
Manajemen proyek dengan board (kanban).
- Cards = tugas
- Lists = status (To Do, Doing, Done)
- Drag-and-drop untuk pindah status

#### Notion
All-in-one workspace: notes, tasks, wiki, database.

#### Figma
Desain kolaboratif (UI/UX, presentasi, poster). Real-time multiplayer.

## D. Tren Teknologi Terkini

### IoT (Internet of Things)
Benda sehari-hari yang terhubung internet dan bisa saling komunikasi.

**Contoh:**
- Smart lamp (Philips Hue): nyalakan/matikan via HP, jadwal otomatis
- Smart thermostat (Nest): atur suhu AC otomatis
- Smart lock: buka pintu via HP, log siapa masuk
- Smart fridge: tahu stok makanan, reorder otomatis

**Manfaat:** otomatisasi, efisiensi, kenyamanan.
**Risiko:** keamanan (kalau dibobol, hacker bisa kontrol rumah).

### AI Assistants
- **Google Assistant**: di Android
- **Siri**: di iPhone
- **Alexa**: di Amazon Echo
- **ChatGPT**: text-based AI

**Use case:**
- Voice command: "Hey Google, set alarm 6 pagi"
- Q&A: "Berapa ibu kota Jepang?"
- Automation: "Jika hujan, nyalakan lampu teras"

### Cloud Computing
Layanan komputasi via internet.

**Jenis:**
- **SaaS** (Software as a Service): aplikasi siap pakai (Gmail, Netflix)
- **PaaS** (Platform as a Service): platform untuk developer (Heroku)
- **IaaS** (Infrastructure as a Service): server virtual (AWS, Google Cloud)

**Manfaat:**
- Tidak perlu beli server sendiri
- Bayar sesuai pemakaian
- Skalabel (bisa naik/turun)
- Akses dari mana saja

**Contoh real:** Startup Gojek tidak punya server sendiri. Mereka pakai AWS Cloud. Saat promo, traffic naik 10x — tinggal tambah server di AWS dalam 5 menit.

## E. Uji Kompetensi

### Soal Refleksi
1. Bandingkan WiFi dan Bluetooth. Kapan pakai WiFi, kapan pakai Bluetooth?
2. Kamu kerja kelompok 5 orang. Pilih: Google Docs atau kirim Word via WhatsApp? Mengapa?
3. Sebutkan 3 smart device yang ada di rumahmu. Apa manfaatnya?
4. Cloud computing membantu startup seperti apa? Beri contoh selain Gojek.

### Proyek Mini
**Rancang Smart Home:**
- Pilih 5 perangkat smart untuk rumah 4-juta-per-bulan
- Jelaskan fungsi masing-masing
- Identifikasi risiko keamanan
- Buat skenario otomatisasi (mis: "pagi hari, lampu kamar nyalakan pelan, gorden buka, kopi otomatis dibuat")

---
**Sumber:** Buku Siswa Informatika Kelas VIII (Edisi Revisi) - Kemendikbud 2024, Bab 5, hal. 187-234
**Tools:** Google Workspace (gratis untuk personal), Notion (free tier), Trello (free tier)
"""
    }
]

if __name__ == "__main__":
    print(f"Materi Kelas 8: {len(MATERI_KELAS_8)} bab")
    for m in MATERI_KELAS_8:
        print(f"  - {m['id']}: {m['title']} ({len(m['content'])} chars)")
