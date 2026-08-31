#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Materi detail Kelas 9 (4 bab) - Buku Informatika Kemendikbud 2025"""

MATERI_KELAS_9 = [
    {
        "id": "mat_inf_9_1",
        "title": "Bab 1: Berpikir Komputasional dalam Analisis Data",
        "targetKelas": "9A,9B",
        "cpId": "cp_inf_9_1",
        "tpId": "tp_inf_9_1_1",
        "category": "Struktur Data",
        "content": """# Bab 1: Berpikir Komputasional dalam Analisis Data

## Dari Data ke Insight

Di kelas 7 dan 8, kamu belajar spreadsheet dan statistik dasar. Sekarang kelas 9, kamu naik level: **struktur data kompleks** (tree, graph) dan **workflow analisis data profesional**. Ini modal untuk kerja di era big data.

## A. Struktur Data Tree

### Konsep Tree
**Tree** = struktur hierarki seperti pohon keluarga. Ada 1 akar (root), bercabang ke bawah.

**Istilah:**
- **Root**: simpul paling atas
- **Node**: simpul (titik)
- **Edge**: garis penghubung
- **Leaf**: simpul paling bawah (tidak punya anak)
- **Parent/Child**: induk/anak
- **Subtree**: cabang kecil dari tree utama

```
        A (root)
       / \\
      B   C (parent of D, E, F)
     / \\   \\
    D   E   F (leaves)
```

### Binary Tree
Tree di mana setiap node punya **maksimal 2 anak** (left, right).

```
       10
      /  \\
     5    15
    / \\   \\
   3   7   18
```

### Penerapan Tree di Kehupan

#### 1. Struktur Folder Komputer
```
C:\\
├── Users
│   ├── Andi
│   │   ├── Documents
│   │   ├── Pictures
│   │   └── Downloads
│   ├── Budi
│   └── Public
├── Program Files
└── Windows
```
Setiap folder = node. Folder utama = root.

#### 2. DOM HTML
Document Object Model — struktur halaman web.
```
<html>
  <head>
    <title>...</title>
  </head>
  <body>
    <header>...</header>
    <main>
      <article>...</article>
    </main>
    <footer>...</footer>
  </body>
</html>
```
Browser render halaman berdasarkan tree ini.

#### 3. Pohon Keputusan (Decision Tree)
Algoritma AI untuk klasifikasi.
```
          [Umur?]
        /         \\
    <18           ≥18
     |             |
  [Tidak      [Punya SIM?]
  boleh       /         \\
  mobil]   Ya            Tidak
            |             |
         [Boleh        [Tidak
          mobil]       boleh mobil]
```

#### 4. Parse Tree (Linguistik)
Kalimat "Budi makan nasi" dipecah:
```
        [S]
       /   \\
     [NP]  [VP]
      |    /  \\
    [Budi][V][NP]
           |   |
         [makan][nasi]
```

### Traversal Tree (Cara Mengunjungi Semua Node)

#### 1. Pre-order (Root, Left, Right)
Kunjungi root dulu, lalu anak kiri, lalu anak kanan.
Hasil dari tree di atas: A, B, D, E, C, F

#### 2. In-order (Left, Root, Right)
Kunjungi anak kiri, root, anak kanan.
Hasil: D, B, E, A, C, F

#### 3. Post-order (Left, Right, Root)
Kunjungi anak kiri, anak kanan, root terakhir.
Hasil: D, E, B, F, C, A

**Contoh real:** 
- Pre-order: cetak struktur folder (parent dulu, lalu isinya)
- In-order: ekspresi matematika (a + b)
- Post-order: hapus folder (hapus isi dulu, baru folder-nya)

## B. Struktur Data Graph

### Konsep Graph
**Graph** = kumpulan node (vertex) yang terhubung oleh edge.

**Istilah:**
- **Vertex**: titik (simpul)
- **Edge**: garis penghubung
- **Directed**: edge punya arah (panah)
- **Undirected**: edge tanpa arah
- **Weighted**: edge punya bobot (jarak, biaya)
- **Degree**: jumlah edge di suatu vertex

### Jenis Graph

#### 1. Undirected Graph
Edge bisa dilewati dua arah.
```
A --- B
|     |
C --- D
```
A ke B = B ke A (sama)

#### 2. Directed Graph (Digraph)
Edge punya arah.
```
A → B
↓   ↓
C ← D
```
A ke B ≠ B ke A (beda!)

#### 3. Weighted Graph
Edge punya bobot.
```
A --4-- B
|       |
2       5
|       |
C --3-- D
```
Bobot A ke B = 4, A ke C = 2, dst.

### Penerapan Graph

#### 1. Peta Jaringan Transportasi
Google Maps pakai weighted graph untuk cari rute tercepat.

**Contoh:** Jakarta → Bandung bisa lewat:
- Tol Cipularang: 150 km, 2 jam (weight = 2)
- Jalanan biasa: 180 km, 4 jam (weight = 4)

Algoritma Dijkstra pilih rute dengan total weight minimum.

#### 2. Social Network
Facebook/Twitter pakai graph untuk:
- Friend suggestion: kalau A-B friend, B-C friend, maka A-C mungkin kenal
- Mencari influencer: node dengan degree tinggi = banyak follower
- Deteksi komunitas: cluster node yang saling terhubung rapat

#### 3. Jaringan Internet
Router = node. Koneksi = edge. Pakai algoritma routing (BGP, OSPF).

#### 4. Blockchain
Bitcoin blockchain = graph transaksi. Setiap block terhubung ke block sebelumnya.

### Algoritma Graph Populer

#### 1. BFS (Breadth-First Search)
Jelajah level demi level. Cocok untuk cari rute terpendek di graph tak berbobot.

#### 2. DFS (Depth-First Search)
Jelajah sedalam mungkin dulu, lalu backtrack. Cocok untuk cari path (tidak harus terpendek).

#### 3. Dijkstra
Cari rute terpendek di weighted graph. Pakai di Google Maps.

#### 4. A* (A-star)
Dijkstra + heuristic. Lebih cepat untuk game (NPC cari jalan).

## C. Analisis Himpunan Data Terstruktur

### Workflow Analisis Data Profesional

#### 1. Menentukan Tujuan Analisis
**Pertanyaan kunci:**
- Apa masalah yang ingin dipecahkan?
- Apa keputusan yang akan diambil dari hasil analisis?
- Siapa stakeholder-nya?

**Contoh real:**
- ❌ Buruk: "Analisis data penjualan"
- ✅ Baik: "Produk mana yang harus di-restock bulan depan berdasarkan tren penjualan 3 bulan terakhir?"

#### 2. Mengumpulkan Data
**Sumber:**
- Internal: database perusahaan (CRM, ERP, POS)
- Eksternal: BPS, World Bank, Kaggle, API publik
- Primer: survei, wawancara, observasi

**Format data:**
- CSV/Excel: tabel sederhana
- JSON: untuk data dari API
- SQL: dari database relasional
- Big Data: Hadoop, Spark (untuk data > 1 TB)

#### 3. Menyiapkan dan Membersihkan Data
**Data cleaning = 80% pekerjaan data scientist.**

**Langkah:**
- **Hapus duplikat**: data yang sama persis muncul 2x
- **Handling missing values**:
  - Hapus baris kosong (kalau sedikit)
  - Isi dengan mean/median (untuk numerik)
  - Isi dengan modus (untuk kategorikal)
  - Prediksi dengan machine learning
- **Standardisasi format**:
  - Tanggal: 2026-08-26 (ISO) bukan 26/08/2026
  - Mata uang: 5000000 bukan "5 juta"
  - Case: "Jakarta" bukan "JAKARTA" atau "jakarta"
- **Hapus outlier**: nilai ekstrem yang tidak masuk akal
- **Validasi**: cek apakah data masuk akal

**Contoh real:** Dataset nilai 100 siswa. Satu siswa punya nilai 999 (maksimum seharusnya 100). Itu outlier — kemungkinan typo. Hapus atau perbaiki.

#### 4. Mengeksplorasi Data (EDA - Exploratory Data Analysis)
**Statistik deskriptif:**
- Mean, median, modus
- Standar deviasi, variance
- Min, max, quartile
- Skewness, kurtosis

**Visualisasi:**
- Histogram: distribusi
- Box plot: outlier
- Scatter plot: hubungan 2 variabel
- Correlation matrix: hubungan banyak variabel
- Heatmap: data matrix dalam warna

#### 5. Memvisualisasikan dan Memublikasikan

**Prinsip visualisasi yang baik:**
1. **Pilih grafik yang tepat** untuk pesan yang ingin disampaikan
2. **Hindari chart junk** — elemen tidak perlu yang mengganggu
3. **Label jelas** — title, axis, legend
4. **Skala tidak menyesatkan** — jangan manipulasi axis y untuk dramatisasi
5. **Warna bermakna** — pakai colorblind-friendly palette

**Tools:**
- Excel/Google Sheets: basic
- Tableau: professional, drag-drop
- Power BI: dari Microsoft
- Python (matplotlib, seaborn, plotly): custom
- Datawrapper: untuk jurnalisme

### Studi Kasus: Analisis Data Transportasi Kota

**Tujuan:** Mengurangi kemacetan Jakarta.

**Data yang dikumpulkan:**
- Volume kendaraan per jam per junction (5 tahun)
- Data kecelakaan
- Cuaca harian
- Event kota (konser, demo)

**Cleaning:**
- Hapus junction yang tidak konsisten sensor-nya
- Isi missing data cuaca dengan prediksi

**Analisis:**
- Buat graph kota (junction = node, jalan = edge)
- Identifikasi bottleneck dengan algoritma centrality
- Korelasi: hujan + kemacetan?
- Pattern: kemacetan parah setiap Jumat 17:00-19:00

**Visualisasi:**
- Heatmap kemacetan di peta Jakarta
- Line chart tren tahunan
- Bar chart junction paling macet

**Rekomendasi:**
- Tambah jalur khusus bus Jumat sore
- Atur lampu hijau lebih lama di junction X
- Promosi WFH hari Jumat

## D. Uji Kompetensi

### Soal Latihan
1. Gambar binary tree dengan 7 node. Lakukan traversal pre-order, in-order, post-order!
2. Buat graph transportasi 5 kota di Indonesia. Tentukan rute terpendek Jakarta → Surabaya pakai algoritma Dijkstra!
3. Cari dataset publik (Kaggle). Lakukan EDA: statistik deskriptif + 3 visualisasi.
4. Beri contoh masalah di sekolah yang bisa dipecahkan dengan analisis data. Jelaskan workflow-nya!

### Proyek Mini
**Analisis Data Sekolah:**
1. Kumpulkan data nilai kelas 9 semester 1 (mintai guru)
2. Cleaning: cek duplikat, missing value
3. EDA: distribusi nilai per mapel, korelasi mapel
4. Visualisasi: histogram, box plot, scatter plot
5. Insight: 3 temuan menarik
6. Presentasi: 5 slide di Canva

---
**Sumber:** Buku Siswa Informatika Kelas IX (Edisi Revisi) - Kemendikbud 2025, Bab I, hal. 1-38
**Tools:** Python (pandas, matplotlib), Tableau Public (gratis), Kaggle (dataset)
"""
    },
    {
        "id": "mat_inf_9_2",
        "title": "Bab 2: Berpikir Komputasional dalam Algoritma dan Pemrograman",
        "targetKelas": "9A,9B",
        "cpId": "cp_inf_9_2",
        "tpId": "tp_inf_9_2_1",
        "category": "Algoritma Pemrograman",
        "content": """# Bab 2: Berpikir Komputasional dalam Algoritma dan Pemrograman

## Dari Visual Blok ke Teks Kode

Kelas 7-8 kamu pakai Scratch (visual). Sekarang kelas 9, kamu transisi ke **pemrograman tekstual** (Python, JavaScript). Ini seperti naik dari sepeda roda tiga ke motor — lebih cepat, lebih powerful, tapi butuh keseimbangan baru.

## A. Mengembangkan Library dalam Pemrograman Visual Blok

### 1. Modularisasi Program

#### Kenapa Modular?
Bayangkan kamu bangun rumah 3 lantai. Daripada bangun 1 rumah raksasa sekaligus, lebih baik:
- Bangun pondasi dulu
- Lantai 1
- Lantai 2
- Lantai 3
- Atap

Di programming, ini namanya **modularisasi** — pecah program besar jadi modul-modul kecil.

**Manfaat:**
- **Reusable**: modul bisa dipakai ulang di proyek lain
- **Testable**: modul kecil mudah di-test
- **Maintainable**: bug mudah dilacak ke modul spesifik
- **Readable**: kode jelas, tidak monolithic
- **Team-friendly**: tim bisa kerja paralel di modul berbeda

#### Implementasi di Scratch: Custom Blocks

**Contoh:** Modul "gambar_persegi(ukuran)":
```
define gambar_persegi (ukuran)
  repeat (4)
    move (ukuran) steps
    turn cw (90) degrees
  end
```

Lalu pakai berulang:
```
when green flag clicked
  gambar_persegi (50)
  pen up
  move (60) steps
  pen down
  gambar_persegi (80)
  pen up
  move (90) steps
  pen down
  gambar_persegi (100)
```

Tanpa custom block, kamu harus tulis 4 baris `move + turn` 3 kali = 12 baris. Dengan custom block: 9 baris (lebih pendek, lebih jelas).

### 2. Library

#### Apa Itu Library?
**Library** = kumpulan fungsi/modul siap pakai. Kamu tinggal import, tidak perlu tulis dari nol.

**Analogi:** Daripada kamu bikin sendiri kalkulator dari nol, kamu beli kalkulator di toko. Pakai langsung.

**Contoh library Scratch:**
- Backpack: simpan sprite + script, pakai di proyek lain
- Scratch extensions: tambah blok baru (music, pen, video sensing)

**Contoh library Python:**
```python
import math        # fungsi matematika
import random      # angka acak
import datetime    # tanggal/waktu
import requests    # HTTP request
import pandas      # analisis data
```

#### Membuat Library Sederhana di Python

File `matematika_ku.py`:
```python
def luas_persegi(sisi):
    return sisi * sisi

def luas_segitiga(alas, tinggi):
    return 0.5 * alas * tinggi

def luas_lingkaran(jari):
    return 3.14 * jari * jari

def volume_kubus(sisi):
    return sisi ** 3
```

File `main.py`:
```python
import matematika_ku

print(matematika_ku.luas_persegi(5))      # 25
print(matematika_ku.luas_lingkaran(7))    # 153.86
print(matematika_ku.volume_kubus(3))      # 27
```

### 3. Penggunaan Library

#### Best Practices

1. **Dokumentasi setiap fungsi**:
```python
def luas_persegi(sisi):
    '''
    Menghitung luas persegi.
    
    Args:
        sisi (float): panjang sisi persegi
    
    Returns:
        float: luas persegi (sisi * sisi)
    
    Example:
        >>> luas_persegi(5)
        25
    '''
    return sisi * sisi
```

2. **Naming convention**:
- Fungsi: `snake_case` (luas_persegi)
- Class: `PascalCase` (HitungLuas)
- Konstanta: `UPPER_CASE` (PI = 3.14)

3. **Versioning**:
- v1.0.0: major.minor.patch
- v1.0.0 → v1.0.1: bug fix
- v1.0.0 → v1.1.0: fitur baru, backward compatible
- v1.0.0 → v2.0.0: breaking changes

**Contoh real:** Library `pandas`:
- 1.5.0 → 1.5.1 (bug fix)
- 1.5.1 → 1.6.0 (fitur baru)
- 1.6.0 → 2.0.0 (API berubah, kode lama mungkin break)

## B. Pemrograman Visual Blok vs Pemrograman Tekstual

### 1. Transisi dari Visual Blok ke Pemrograman Tekstual

#### Perbandingan Scratch vs Python

| Aspek | Scratch | Python |
|---|---|---|
| Tipe | Visual blok | Tekstual |
| Syntax | Drag-drop, tidak bisa salah syntax | Harus hafal syntax |
| Indentasi | Otomatis | Wajib (4 spasi) |
| Variabel | Tipenya otomatis | Harus paham tipe data |
| Debugging | Mudah (lihat blok) | Pakai print/debugger |
| Skalabilitas | Kecil-sedang | Besar |
| Komunitas | Edukasi | Profesional |

#### Konsep Syntax dan Indentasi

**Python pakai indentasi** untuk blok kode (bukan kurung kurawal seperti JavaScript).

```python
# Benar (indentasi konsisten 4 spasi)
if umur >= 17:
    print("Dewasa")
    print("Boleh buat KTP")

# Salah (indentasi tidak konsisten)
if umur >= 17:
  print("Dewasa")
      print("Boleh buat KTP")  # IndentationError!
```

#### Tipe Data dan Variabel di Python

```python
# Integer
umur = 15

# Float
tinggi = 165.5

# String
nama = "Budi Santoso"

# Boolean
lulus = True

# List (array)
nilai = [80, 75, 90, 65]

# Dictionary (object)
siswa = {
    "nama": "Budi",
    "umur": 15,
    "kelas": "9A"
}

# Tuple (immutable)
koordinat = (-6.2, 106.8)

# Set (unique items)
hobi = {"game", "musik", "game"}  # jadi {"game", "musik"}
```

**Dynamic typing:** Python otomatis deteksi tipe data. Tapi hati-hati:
```python
x = 5          # int
x = "lima"     # sekarang string
x = True       # sekarang bool
```

#### Struktur Kontrol di Python

**If-else:**
```python
if nilai >= 90:
    grade = "A"
elif nilai >= 80:
    grade = "B"
elif nilai >= 70:
    grade = "C"
else:
    grade = "D"
```

**For loop:**
```python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for siswa in ["Andi", "Budi", "Citra"]:
    print(siswa)
```

**While loop:**
```python
angka = 1
while angka <= 5:
    print(angka)
    angka += 1
```

**Function:**
```python
def sapa(nama):
    return f"Halo, {nama}!"

print(sapa("Budi"))  # Halo, Budi!
```

### 2. Analisis Pseudocode

#### Apa Itu Pseudocode?
Kode tiruan yang mirip bahasa manusia, untuk merancang algoritma sebelum tulis kode asli.

**Aturan pseudocode:**
- Pakai kata kunci: BEGIN, END, INPUT, OUTPUT, IF, THEN, ELSE, WHILE, FOR, REPEAT
- Tidak ada syntax kaku (boleh Indonesia/Inggris)
- Fokus pada logika, bukan syntax

**Contoh pseudocode:**
```
BEGIN
  INPUT nilai
  IF nilai >= 75 THEN
    OUTPUT "Lulus"
  ELSE
    OUTPUT "Remedial"
  ENDIF
END
```

#### Konversi Pseudocode → Python

**Pseudocode:**
```
BEGIN
  INPUT nama, umur
  IF umur >= 17 THEN
    OUTPUT nama + " dewasa"
  ELSE
    OUTPUT nama + " masih di bawah umur"
  ENDIF
END
```

**Python:**
```python
nama = input("Nama: ")
umur = int(input("Umur: "))

if umur >= 17:
    print(f"{nama} dewasa")
else:
    print(f"{nama} masih di bawah umur")
```

#### Latihan Konversi

**Pseudocode:**
```
BEGIN
  SET total = 0
  FOR i = 1 TO 10
    total = total + i
  ENDFOR
  OUTPUT total
END
```

**Python:**
```python
total = 0
for i in range(1, 11):
    total += i
print(total)  # 55
```

## C. Mini Proyek

### Proyek: Kalkulator BMI

**Pseudocode:**
```
BEGIN
  INPUT berat, tinggi
  bmi = berat / (tinggi * tinggi)
  IF bmi < 18.5 THEN
    kategori = "Kurus"
  ELSEIF bmi < 25 THEN
    kategori = "Normal"
  ELSEIF bmi < 30 THEN
    kategori = "Gemuk"
  ELSE
    kategori = "Obesitas"
  ENDIF
  OUTPUT bmi, kategori
END
```

**Python:**
```python
berat = float(input("Berat (kg): "))
tinggi = float(input("Tinggi (m): "))

bmi = berat / (tinggi ** 2)

if bmi < 18.5:
    kategori = "Kurus"
elif bmi < 25:
    kategori = "Normal"
elif bmi < 30:
    kategori = "Gemuk"
else:
    kategori = "Obesitas"

print(f"BMI: {bmi:.1f} ({kategori})")
```

## D. Uji Kompetensi

### Soal Latihan
1. Buat library `geometri.py` dengan fungsi: luas_persegi, luas_persegi_panjang, luas_segitiga, luas_lingkaran!
2. Tulis pseudocode untuk: cek apakah bilangan genap/ganjil. Konversi ke Python!
3. Tulis pseudocode untuk: cari nilai tertinggi dari 5 input. Konversi ke Python!
4. Buat program Python: input nama + 3 nilai, output rata-rata + grade!
5. Buat fungsi `is_prima(n)` yang return True kalau n bilangan prima!

### Proyek Mini
**Sistem Manajemen Nilai Siswa:**
- Library `nilai_ku.py` dengan fungsi: hitung_rata, tentukan_grade, cari_tertinggi, cari_terendah
- Program utama: input 5 siswa (nama + 3 nilai), output laporan semua siswa + ranking
- Tambah: simpan ke file CSV, baca dari CSV

---
**Sumber:** Buku Siswa Informatika Kelas IX (Edisi Revisi) - Kemendikbud 2025, Bab II, hal. 39-114
**Tools:** Python 3 (python.org), VS Code, repl.it (online IDE)
"""
    },
    {
        "id": "mat_inf_9_3",
        "title": "Bab 3: Literasi Digital untuk Produktivitas",
        "targetKelas": "9A,9B",
        "cpId": "cp_inf_9_3",
        "tpId": "tp_inf_9_3_1",
        "category": "Produktivitas Digital",
        "content": """# Bab 3: Literasi Digital untuk Produktivitas

## Produktivitas di Era Digital

Produktivitas = mengerjakan lebih banyak hal berkualitas dalam waktu lebih sedikit. Teknologi digital, kalau dipakai benar, bisa melipatgandakan produktivitas. Tapi kalau salah pakai, justru jadi distraksi.

## A. Pemrosesan Data

### 1. Permasalahan Dasar Pemrosesan Data

#### Identifikasi Kebutuhan Data
Sebelum proses data, tanya: **untuk apa?**

**Contoh real:** Kepala sekolah ingin laporan nilai semester. Data yang dibutuhkan:
- Nilai siswa per mapel
- Absensi
- Ekstrakurikuler
- Catatan sikap

Tapi kalau cuma untuk laporan ke orangtua, cukup: nilai + absensi.

#### Sumber dan Validitas Data
- **Sumber resmi**: Kemendikbud, BPS, WHO
- **Sumber komersial**: Bloomberg, Nielsen
- **Sumber publik**: Kaggle, data.go.id
- **Sumber internal**: database sekolah

**Validitas:** cek reputasi sumber, tanggal publikasi, metodologi pengumpulan.

#### Etika Penggunaan Data
- **Privacy**: jangan share data pribadi tanpa izin
- **Consent**: minta izin sebelum kumpul data
- **Anonymization**: hapus identitas saat publikasi
- **Bias**: waspadai bias dalam data (gender, ras, sosial-ekonomi)

**Contoh real:** Peneliti Stanford kumpul data kesehatan 1000 siswa. Untuk publikasi, hapus nama + NIK, ganti dengan ID anonim (S001, S002, ...). Kalau bocor, tidak bisa dilacak ke siswa spesifik.

### 2. Dampak Penggunaan Perkakas yang Baik dan Benar

#### Produktivitas vs Distraksi
**Tools produktivitas:**
- Notion (notes + tasks)
- Trello (project management)
- Slack (komunikasi tim)
- Focus@Will (musik untuk fokus)

**Distraksi:**
- TikTok (scroll tanpa sadar)
- Instagram (FOMO)
- Game mobile (micro-transaction)

**Manajemen:**
- Time blocking: 25 menit fokus + 5 menit istirahat (Pomodoro)
- App limits: batasi TikTok 30 menit/hari
- Notification off saat belajar

#### Workflow Otomatisasi

##### Macros di Excel
Rekam aksi berulang, jalankan dengan 1 klik.

**Contoh:** Setiap minggu format laporan sama:
1. Buka file CSV
2. Hapus kolom A, C
3. Format tanggal di kolom B
4. Tambah header
5. Save as XLSX

Daripada lakukan manual 30 menit, rekam macro sekali, lalu jalankan 5 detik.

##### Zapier/Make
Otomatisasi antar aplikasi.

**Contoh workflow:**
- Trigger: ada email baru di Gmail
- Action 1: simpan attachment ke Google Drive
- Action 2: kirim notifikasi ke Slack
- Action 3: buat task di Trello

##### Python Scripting
Otomatisasi tugas kompleks.

```python
# Script: hitung rata-rata nilai semua kelas dari 10 file Excel
import pandas as pd
import glob

files = glob.glob("nilai_*.xlsx")
for file in files:
    df = pd.read_excel(file)
    rata = df["nilai"].mean()
    print(f"{file}: rata-rata = {rata:.1f}")
```

#### Dampak Positif Teknologi pada Pekerjaan
- **Efisiensi**: tugas 8 jam → 1 jam dengan otomatisasi
- **Akurasi**: komputer tidak salah hitung
- **Skalabilitas**: layani 1 atau 1 juta user sama saja
- **Kolaborasi**: tim global real-time
- **Akses**: info dari mana saja

## B. Penyajian Data

### 1. Jenis dan Format Data

#### Format Data

##### CSV (Comma-Separated Values)
Teks sederhana, kolom dipisah koma.
```
nama,umur,kelas
Andi,15,9A
Budi,14,9A
Citra,15,9B
```
- **Pro**: universal, kecil, mudah dibaca
- **Kontra**: tidak mendukung format kompleks (formula, chart)

##### JSON (JavaScript Object Notation)
Format untuk pertukaran data web.
```json
{
  "siswa": [
    {"nama": "Andi", "umur": 15, "kelas": "9A"},
    {"nama": "Budi", "umur": 14, "kelas": "9A"}
  ]
}
```
- **Pro**: nested structure, dipakai API
- **Kontra**: lebih besar dari CSV

##### XML (eXtensible Markup Language)
Mirip HTML, untuk data terstruktur.
```xml
<siswa>
  <nama>Andi</nama>
  <umur>15</umur>
  <kelas>9A</kelas>
</siswa>
```
- **Pro**: validasi schema, dipakai enterprise
- **Kontra**: verbose (banyak tag)

##### XLSX
Format Excel, mendukung formula + chart.

#### Konversi Antar Format

**Excel → CSV:** Save As → CSV
**CSV → JSON (pakai Python):**
```python
import pandas as pd
df = pd.read_csv("data.csv")
df.to_json("data.json", orient="records")
```

**JSON → Excel:**
```python
import pandas as pd
df = pd.read_json("data.json")
df.to_excel("data.xlsx", index=False)
```

### 2. Perangkat Lunak Produktivitas

#### Spreadsheet Lanjutan: Macro dan VBA

##### Macro
Rekam aksi, jalankan berulang.

**Cara rekam macro di Excel:**
1. Developer → Record Macro
2. Lakukan aksi (format, formula, dll)
3. Stop Recording
4. Save macro

**Cara pakai:** Developer → Macros → pilih → Run

##### VBA (Visual Basic for Applications)
Bahasa pemrograman untuk macro Excel.

**Contoh VBA:**
```vba
Sub FormatLaporan()
    Range("A1:D1").Font.Bold = True
    Range("A1:D1").Interior.Color = RGB(255, 255, 0)
    Columns("A:D").AutoFit
End Sub
```

Jalankan: otomatis format header tabel.

#### Database Sederhana

##### LibreOffice Base / Microsoft Access
Database desktop dengan GUI.

**Komponen:**
- **Tables**: simpan data
- **Queries**: cari/filter data
- **Forms**: input data user-friendly
- **Reports**: cetak laporan

**Contoh real:** Database perpustakaan sekolah:
- Table `buku`: id, judul, penulis, tahun
- Table `siswa`: id, nama, kelas
- Table `pinjam`: id, buku_id, siswa_id, tanggal_pinjam, tanggal_kembali

Query: "Siapa yang belum kembalikan buku lebih dari 7 hari?"

#### Aplikasi Presentasi Lanjutan

##### PowerPoint Lanjutan
- **Master slide**: template konsisten
- **Animation**: entrance, emphasis, exit
- **Hyperlink**: lompat ke slide/file/web
- **Embed**: video, audio, chart interaktif
- **Presenter view**: note di laptop, slide di proyektor

##### Canva
Desain presentasi + poster + logo. Template profesional.

##### Google Slides
Online, kolaboratif, gratis.

### 3. Integrasi Data Konten

#### Embed Data Antar Aplikasi (OLE)

**OLE (Object Linking and Embedding):**
- **Link**: data tetap di sumber, tampil di tujuan. Update sumber → tujuan ikut update.
- **Embed**: data disalin ke tujuan. Sumber update → tujuan tidak ikut.

**Contoh:** Excel chart di Word:
- Link: chart di Word ter-update otomatis saat Excel diubah
- Embed: chart di Word statis, tidak ikut Excel

#### Cloud Collaboration

##### Google Workspace
- Docs/Sheets/Slides: edit real-time bareng tim
- Comments + suggestions
- Version history (rollback kalau perlu)

##### Microsoft 365
- Word/Excel/PowerPoint Online
- Co-authoring
- OneDrive sync

##### Notion
- All-in-one workspace
- Database + page + task
- Real-time collab

#### Workflow: Data → Analisis → Visualisasi → Presentasi

**Contoh workflow lengkap:**

1. **Kumpul data** (Google Forms survei)
2. **Bersihkan** (Google Sheets: hapus duplikat, isi missing)
3. **Analisis** (Excel: pivot table, formula)
4. **Visualisasi** (Excel chart atau Google Data Studio)
5. **Presentasi** (Google Slides dengan embed chart)
6. **Share** (link Google Workspace, atur permission)
7. **Iterate** (komentar + revisi real-time)

## C. Proyek Akhir

### Laporan Analisis Data End-to-End

**Tema:** Analisis minat baca siswa SMP

**Workflow:**
1. **Survei** 50 siswa via Google Forms (judul buku, genre, durasi baca/minggu)
2. **Cleaning** di Google Sheets (hapus respons tidak lengkap)
3. **Analisis** (pivot table: genre favorit per kelas)
4. **Visualisasi** (bar chart genre, pie chart sumber buku)
5. **Insight** (3 temuan: mis "siswa kelas 9 lebih suka novel misteri")
6. **Presentasi** (5 slide Google Slides dengan chart embed)
7. **Bagikan** ke guru + kepala perpustakaan
8. **Rekomendasi** (beli buku sesuai minat siswa)

## D. Uji Kompetensi

### Soal Latihan
1. Konversi file CSV berisi 100 baris data siswa ke JSON. Pakai Python atau tools online!
2. Buat macro Excel: format header tabel (bold, kuning, autofit columns)!
3. Rancang database perpustakaan: tabel + relasi. Buat 1 query: siapa yang pinjam buku > 7 hari?
4. Workflow: dari data nilai 30 siswa, buat dashboard presentasi untuk rapat orangtua!

### Proyek Mini
**Sistem Manajemen Inventaris Sekolah:**
- Database: barang, lokasi, peminjam
- Form input (Google Forms atau Access)
- Laporan bulanan (Excel + chart)
- Dashboard untuk kepala sekolah
- Workflow otomatis: notifikasi email saat barang dipinjam > 2 minggu

---
**Sumber:** Buku Siswa Informatika Kelas IX (Edisi Revisi) - Kemendikbud 2025, Bab III, hal. 115-180
**Tools:** Google Workspace, Microsoft 365, Notion, Canva, Tableau Public
"""
    },
    {
        "id": "mat_inf_9_4",
        "title": "Bab 4: Keamanan Digital",
        "targetKelas": "9A,9B",
        "cpId": "cp_inf_9_4",
        "tpId": "tp_inf_9_4_1",
        "category": "Keamanan Digital",
        "content": """# Bab 4: Keamanan Digital

## Mengapa Keamanan Digital Penting?

Tahun 2024, **data 279 juta akun bocor** di Indonesia (Kompas). Termasuk: KTP, NPWP, nomor rekening, foto selfie. Akibatnya: penipuan online naik 200%, identitas palsu marak. Di era digital, **keamanan = melindungi diri sendiri dan orang lain**.

## A. Ancaman di Dunia Digital

### Malware (Malicious Software)
Program jahat yang merusak/mencuri data.

#### Jenis Malware

##### 1. Virus
Kode jahat yang menempel ke file lain. Menyebar saat file dijalankan.

**Contoh real:** Siswa download "game gratis" dari situs aneh. File .exe-nya ternyata virus. Saat dijalankan, virus menyebar ke file Word, Excel, dll. Komputer rusak.

##### 2. Trojan
Program yang menyamar sebagai aplikasi sah, tapi punya "payload" jahat.

**Contoh:** Aplikasi "WhatsApp Plus" (tidak resmi). Tampak seperti WhatsApp premium, tapi sebenarnya mencuri chat dan kontak.

##### 3. Ransomware
Mengenkripsi file korban, lalu minta tebusan (biasanya Bitcoin).

**Contoh real:** RS di Surabaya terkena ransomware 2023. Data 5000 pasien terkunci. Hacker minta Rp 5 miliar. RS tidak bayar, restore dari backup (yang juga ikut terenkripsi sebagian).

##### 4. Spyware
Mengintai aktivitas korban tanpa diketahui.

**Contoh:** Keylogger di komputer warnet. Saat kamu login Gmail, keylogger rekam setiap tombol yang kamu tekan. Hacker punya password-mu.

##### 5. Adware
Memaksa iklan muncul di komputer korban.

**Contoh:** Browser tiba-tiba punya toolbar aneh + popup iklan tiap buka website.

### Phishing dan Social Engineering

#### Phishing
Email/SMS/WhatsApp palsu yang menyamar institusi resmi.

**Ciri phishing:**
- URL mencurigakan (`paypa1.com` bukan `paypal.com`, huruf `l` jadi `1`)
- Bahasa formal berlebihan atau sebaliknya, grammar buruk
- Urgent: "Akun diblokir 24 jam!"
- Minta data sensitif (password, PIN, OTP)
- Generic greeting ("Dear Customer" bukan "Budi Santoso")
- Attachments mencurigakan (.exe, .scr)

**Contoh real:** Email "Anda menang undian Google. Klik link untuk klaim." Link-nya ke `google-winner.tk` (bukan google.com). Setelah klik, diminta input data kartu kredit.

#### Social Engineering
Manipulasi psikologis agar korban menyerahkan info.

##### 1. Pretexting
Pura-pura figur otoritas.

**Contoh:** Telepon "Halo, ini dari Bank BCA. Kami deteksi transaksi mencurigakan. Sebutkan OTP Anda untuk verifikasi." Bank asli TIDAK PERNAHA minta OTP.

##### 2. Baiting
Godaan hadiah.

**Contoh:** Flashdisk ditemukan di parkiran, labelnya "Gaji Karyawan 2026". Korban penasaran, colok ke komputer. Flashdisk berisi malware yang auto-run.

##### 3. Quid Pro Quo
"Saya bantu Anda, Anda kasih saya info."

**Contoh:** Telepon "Ini IT Support. KamiMaintenance server, sebutkan password Anda." Korban pikir bantu, kasih password.

##### 4. Tailgating
Ikut masuk area terbatas.

**Contoh:** Orang antri di pintu gerbet kantor, pura-pura lupa kartu. Karyawan baik hati bukakan pintu. Orang itu masuk dan mencuri laptop.

### Identity Theft
Pencurian identitas untuk melakukan penipuan.

**Data yang biasa dicuri:**
- NIK + KK
- Paspor
- SIM
- Rekening bank
- Foto selfie (untuk face verification)

**Modus:**
- Buka akun bank atas namamu → minjem pinjaman online → kamu yang ditagih
- Buat akun Shopee/Tokopedia → beli barang → kamu yang ditagih
- Palsukan KTP → buka nomor HP → kirim penipuan

### Cyberbullying
Bullyng via dunia digital.

**Bentuk:**
- Hinaan via DM/comment
- Sebarkan foto tanpa izin
- Buat akun palsu atas nama korban
- Doxxing (sebar info pribadi)
- Mass report akun

**Dampak:**
- Depresi, anxiety
- Bunuh diri (kasus ekstrem)
- Nilai turun
- Sosial isolate

**Cara mengatasi:**
- Save evidence (screenshot)
- Block pelaku
- Report ke platform
- Bicara dengan orang dewasa yang dipercaya
- Lapor polisi kalau berat

## B. Praktik Keamanan Data

### Enkripsi
Mengubah data menjadi kode rahasia agar tidak bisa dibaca tanpa kunci.

#### Jenis Enkripsi

##### 1. Simetris (Symmetric)
Kunci untuk enkripsi = kunci untuk dekripsi.

**Analogi:** Kunci rumah. Pakai kunci yang sama untuk kunci dan buka pintu.

**Algoritma:** AES, DES
**Kecepatan:** Cepat
**Kelemahan:** Distribusi kunci sulit

##### 2. Asimetris (Public Key Cryptography)
Sepasang kunci: public (untuk enkripsi) + private (untuk dekripsi).

**Analogi:** Kotak surat. Semua orang bisa masukkan surat (public key), tapi hanya kamu yang punya kunci untuk membuka (private key).

**Algoritma:** RSA, ECC
**Kecepatan:** Lebih lambat
**Kelebihan:** Aman untuk distribusi kunci

**Contoh real:** Kamu kirim email terenkripsi ke teman. Pakai public key temanmu (yang publik). Hanya temanmu bisa baca dengan private key-nya.

### Hash Function
Fungsi satu arah: input → output fixed-length. Tidak bisa di-reverse.

**Karakteristik:**
- Output selalu sama panjang (meski input beda)
- Sedikit perubahan input → output berubah drastis
- Tidak bisa recover input dari output

**Algoritma:** MD5, SHA-1, SHA-256

**Use case:**
- Simpan password (database simpan hash, bukan plain text)
- Verifikasi integritas file (download + cek hash, pastikan tidak dimodifikasi)
- Blockchain (hash block untuk immutability)

**Contoh real:**
- Password "budi123" → hash SHA-256 = `a1b2c3...`
- Database simpan `a1b2c3...`, bukan "budi123"
- Saat login, hash input user → bandingkan dengan database
- Walau database bocor, hacker tidak tahu password asli

### SSL/TLS (HTTPS)
Protocol untuk transmisi data aman di internet.

**Cara kerja:**
1. Browser request HTTPS ke server
2. Server kirim certificate (berisi public key)
3. Browser verifikasi certificate (lewat CA - Certificate Authority)
4. Browser generate session key, enkripsi dengan public key server
5. Server dekripsi dengan private key, dapat session key
6. Komunikasi selanjutnya dienkripsi dengan session key

**Cara cek HTTPS:**
- URL diawali `https://` (bukan `http://`)
- Ikon gembok di address bar
- Klik gembok → lihat certificate details

**Risiko HTTP:** Data bisa diintip saat transmisi (man-in-the-middle attack). Jangan pernah login ke website HTTP!

## C. Otentikasi dan Otorisasi

### Password Management (Lanjutan)

#### Password Strength
**Meter kekuatan password:**
- < 8 char: SANGAT LEMAH
- 8-11 char: LEMAH
- 12-15 char + kombinasi: CUKUP
- 16+ char + kombinasi + unik: KUAT
- Passphrase (4-5 kata acak): SANGAT KUAT

**Contoh passphrase:** "kucing-merah-lompat-pagar-tinggi" = 31 char, mudah diingat, sangat sulit dibobol.

#### Password Manager

**Tools:**
- **Bitwarden**: open source, free tier bagus
- **1Password**: premium, fitur lengkap
- **KeePass**: lokal, gratis, open source
- **LastPass**: populer, free tier terbatas

**Cara kerja:**
1. Generate password random untuk setiap akun
2. Simpan di vault terenkripsi
3. Hafal 1 master password
4. Auto-fill saat login

### Multi-Factor Authentication (MFA)

#### Faktor Otentikasi
- **Something you know**: password, PIN
- **Something you have**: HP (SMS OTP), token, security key
- **Something you are**: biometrik (sidik jari, face, iris)

**MFA** = pakai 2+ faktor. Walau 1 bocor, hacker masih butuh faktor lain.

#### Jenis MFA

##### 1. SMS OTP
Kode 6 digit dikirim via SMS.

**Risiko:** SIM swapping. Hacker manipulasi operator untuk pindahkan nomor ke kartu mereka. OTP masuk ke HP hacker.

##### 2. Authenticator App
Google Authenticator, Authy, Microsoft Authenticator. Generate kode 6 digit yang berubah tiap 30 detik.

**Lebih aman** dari SMS karena tidak tergantung kartu SIM.

##### 3. Security Key (Hardware)
YubiKey, Google Titan. USB/NFC device yang harus di-tap untuk login.

**Paling aman**, tidak bisa di-phish.

##### 4. Push Notification
Login → notifikasi ke HP → approve/deny.

**Mudah**, tapi waspadai "MFA fatigue" (hacker spam notif sampai korban approve bosan).

### Biometric Authentication

#### Jenis
- **Fingerprint**: sidik jari (Touch ID)
- **Face recognition**: Face ID, Windows Hello
- **Iris scan**: scan mata
- **Voice recognition**: voice ID
- **Behavioral**: cara kamu mengetik, berjalan

#### Kelebihan
- Tidak perlu hafal
- Cepat
- Sulit dipalsukan

#### Kelemahan
- Tidak bisa diubah (kalau bocor, selamanya)
- False positive/negative
- Privacy issue (data biometrik sensitif)

### Single Sign-On (SSO)
Login sekali → akses banyak aplikasi.

**Contoh:** Login Google sekali → akses Gmail, YouTube, Drive, Calendar, Maps tanpa login ulang.

**Protokol:** OAuth 2.0, SAML, OpenID Connect

**Implementasi:** "Login with Google" / "Login with Facebook" di website lain.

## D. Privasi dan Perlindungan Data

### UU PDP (Perlindungan Data Pribadi) Indonesia
UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi.

**Hak pengguna:**
- Hak akses: tahu data apa yang dikumpul
- Hak koreksi: perbaiki data salah
- Hak hapus: hapus data
- Hak portabilitas: pindahkan data ke platform lain
- Hak menolak: tidak jadi subjek data

**Kewajiban perusahaan:**
- Consent: minta izin sebelum kumpul data
- Transparansi: jelas untuk apa data dipakai
- Keamanan: lindungi data dari bocor
- Notifikasi: lapor dalam 72 jam kalau bocor

**Sanksi:** denda sampai 2% omzet tahunan.

### GDPR (General Data Protection Regulation)
Regulasi privasi Eropa, berlaku global untuk perusahaan yang layani user EU.

**Prinsip:**
- Lawfulness, fairness, transparency
- Purpose limitation
- Data minimization
- Accuracy
- Storage limitation
- Integrity and confidentiality
- Accountability

**Dampak ke Indonesia:** Banyak situs internasional tampilkan "Cookie consent" banner untuk kepatuhan GDPR.

### Hak dan Kewajiban Pengguna Data

#### Hak Kamu
- Tahu data apa yang dikumpul perusahaan
- Minta akses ke data sendiri
- Minta hapus data
- Tarik consent kapan saja

#### Kewajiban Kamu
- Baca privacy policy sebelum daftar akun
- Hanya share data yang perlu
- Pakai password kuat + MFA
- Cek secara berkala aktivitas akun

## E. Etika dan Hukum Siber

### Hak Cipta Konten Digital
- Artikel blog: otomatis protected saat dipublikasi
- Foto: yang motret punya hak cipta
- Musik: komposer + label punya hak
- Source code: otomatis protected

**Lisensi open:**
- **Creative Commons (CC BY)**: bebas pakai dengan atribusi
- **CC BY-SA**: bebas pakai dengan atribusi + share alike
- **CC BY-NC**: bebas pakai non-komersial
- **MIT/GPL**: untuk source code

**Contoh real:** Kamu mau pakai foto dari Unsplash di blog sekolah. Unsplash pakai CC0 (public domain) — bebas pakai tanpa atribusi. Tapi kalau dari Pexels, harus kasih atribusi ke fotografer.

### UU ITE
UU No. 11 Tahun 2008 (diamandemen UU 19 Tahun 2016) tentang Informasi dan Transaksi Elektronik.

**Yang dilarang:**
- Distribusi konten SARA
- Penyebaran hoaks
- Defamasi (fitnah)
- Identitas palsu
- Carding (pencurian kartu kredit)
- Hacking tanpa izin

**Sanksi:** denda ratusan juta + penjara 6-12 tahun.

**Studi kasus:** Sarrah (bukan nama sebenarnya) tweet fitnah guru. Guru lapor polisi. Sarrah dihukum 1 tahun penjara + denda.

### Sertifikasi Keamanan Siber Dasar

**Untuk pemula:**
- **CompTIA Security+**: fondasi keamanan
- **Cisco CyberOps Associate**: security operations
- **EC-Council CEH** (Certified Ethical Hacker): pentesting

**Untuk lanjutan:**
- **CISSP** (Certified Information Systems Security Professional)
- **CISM** (Certified Information Security Manager)
- **OSCP** (Offensive Security Certified Professional)

**Sumber belajar gratis:**
- TryHackMe (free tier)
- HackTheBox (free tier)
- PortSwigger Web Security Academy (free)
- Cybrary (free tier)

## F. Tanggap Insiden

### Cara Melaporkan Cybercrime di Indonesia

#### 1. Patroli Siber Polri
- Website: patrolisiber.id
- Layanan: 0811-109-8110 (call center)
- Email: pengaduan@patrolisiber.id

#### 2. BSSN (Badan Siber dan Sandi Negara)
- Website: bssn.go.id
- Untuk: insiden siber tingkat nasional

#### 3. Kementerian Komunikasi dan Informatika (Kominfo)
- Layanan: aduankonten.id
- Untuk: konten ilegal/negatif

#### 4. Polisi Sekitar
- Lapor BAP di polsek
- Sertakan evidence (screenshot, chat, log)

### Backup dan Recovery Data

#### Strategi Backup 3-2-1
- **3** copy data
- **2** media berbeda (internal HDD + external SSD)
- **1** offsite (cloud)

**Contoh real:**
- Copy 1: di laptop (HDD internal)
- Copy 2: di external SSD
- Copy 3: di Google Drive

Kalau laptop rusak → ambil dari SSD
Kalau rumah kebakaran → ambil dari cloud

#### Jenis Backup
- **Full**: backup semua data
- **Incremental**: backup yang berubah sejak backup terakhir
- **Differential**: backup yang berubah sejak full backup terakhir

#### Disaster Recovery Plan (DRP)
Rencana pemulihan saat terjadi bencana (natural, cyber attack, hardware failure).

**Komponen:**
- RPO (Recovery Point Objective): maksimal data yang boleh hilang (mis: 1 jam)
- RTO (Recovery Time Objective): maksimal waktu pemulihan (mis: 4 jam)
- Backup strategy
- Failover plan
- Communication plan

### Incident Response Plan

#### Fase 1: Preparation
- Training tim
- Tools siap (forensic, backup)
- Contact list (BSSN, polisi, vendor)

#### Fase 2: Identification
- Deteksi insiden (alarm, laporan user)
- Analisis: insiden apa? Severity?
- Dokumentasi awal

#### Fase 3: Containment
- Isolate sistem terinfeksi (disconnect dari network)
- Halt proses yang mencurigakan
- Cegah penyebaran

#### Fase 4: Eradication
- Hapus malware
- Patch vulnerability
- Reset password yang terkompromi

#### Fase 5: Recovery
- Restore dari backup
- Verifikasi sistem bersih
- Online kembali secara bertahap

#### Fase 6: Lessons Learned
- Post-mortem: apa yang terjadi?
- Apa yang bisa diperbaiki?
- Update policy + training

## G. Proyek Akhir

### Audit Keamanan Akun Digital Pribadi

**Checklist:**

1. **Password audit**
   - List semua akun penting (email, bank, socmed utama)
   - Cek kekuatan password (password meter)
   - Identifikasi password yang dipakai berulang
   - Buat password unik per akun
   - Pasang password manager

2. **MFA audit**
   - Aktifkan MFA di: Gmail, Instagram, Facebook, bank, e-commerce
   - Pakai authenticator app (bukan SMS)

3. **Privacy checkup**
   - Google: My Activity → hapus history yang tidak perlu
   - Facebook: Privacy Checkup
   - Instagram: Account privacy → private
   - Review app yang punya akses ke akunmu

4. **Backup strategy**
   - Foto: Google Photos + external HDD
   - Dokumen: cloud + lokal
   - Email: backup penting ke PDF

5. **Phishing defense**
   - Enable spam filter
   - Hati-hati link di email/SMS
   - Verifikasi pengirim via channel lain

6. **Software update**
   - OS: Windows/Mac update otomatis
   - Browser: update otomatis
   - Antivirus: update database
   - HP: update Android/iOS

**Output:** Laporan audit + rencana perbaikan + progress 30 hari

## H. Uji Kompetensi

### Soal Latihan
1. Bedakan enkripsi simetris vs asimetris. Beri contoh use case masing-masing!
2. Apa beda MD5 dan SHA-256? Mana yang lebih aman?
3. Bagaimana cara kerja HTTPS? Mengapa lebih aman dari HTTP?
4. Sebutkan 3 jenis MFA. Mana yang paling aman? Mengapa?
5. Kamu terima email "Anda menang undian Toyota Avanza". Apa yang kamu lakukan?
6. Jelaskan strategi backup 3-2-1 dengan contoh real!
7. Sebutkan 3 hak kamu sebagai subjek data di UU PDP Indonesia!

### Proyek Mini
**Pentest Sederhana (Ethical Hacking):**
- Pilih website milik sendiri/sekolah (dengan izin)
- Cek: HTTPS? Security headers? Password policy?
- Pakai tools: SSL Labs (ssllabs.com), SecurityHeaders.com
- Buat laporan: temuan + rekomendasi perbaikan

---
**Sumber:** Buku Siswa Informatika Kelas IX (Edisi Revisi) - Kemendikbud 2025, Bab IV, hal. 181-234
**Tools & Sumber Belajar:** Bitwarden, haveIBeenPwned, TryHackMe, BSSN.go.id, PatroliSiber.id
"""
    }
]

if __name__ == "__main__":
    print(f"Materi Kelas 9: {len(MATERI_KELAS_9)} bab")
    for m in MATERI_KELAS_9:
        print(f"  - {m['id']}: {m['title']} ({len(m['content'])} chars)")
