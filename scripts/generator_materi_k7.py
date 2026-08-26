#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator SQL: Update Materi + Insert 840 Soal HOTS Informatika SMP
Output: /home/z/my-project/download/insert_materi_detail_dan_soal_hots.sql

Sumber data:
- Materi: Buku Siswa Informatika Kemendikbud Kelas 7, 8, 9 (Edisi Revisi)
- Soal: Dibuat dengan cerita literasi panjang (stimulus) untuk merangsang
  literasi siswa, mengikuti pola HOTS (C4-C6 Taksonomi Bloom)
"""

import os
from datetime import datetime

# ============================================================
# STRUKTUR DATA: MATERI DETAIL PER BAB
# ============================================================
# Setiap materi punya:
# - id: stabil identifier (mat_inf_x_y)
# - title: judul bab
# - targetKelas: kelas target (CSV)
# - cpId, tpId: link ke CP/TP
# - category: kategori materi
# - content: konten Markdown lengkap dengan contoh real

MATERI_KELAS_7 = [
    {
        "id": "mat_inf_7_1",
        "title": "Bab 1: Berpikir Komputasi untuk Penyelesaian Masalah",
        "targetKelas": "7A,7B,7C",
        "cpId": "cp_inf_7_1",
        "tpId": "tp_inf_7_1_1",
        "category": "Konsep Dasar",
        "content": """# Bab 1: Berpikir Komputasi untuk Penyelesaian Masalah

## Mengapa Berpikir Komputasi Penting?

Bayangkan kamu ingin membuat nasi goreng untuk pertama kalinya. Apa yang kamu lakukan? Kamu tidak langsung menggoreng nasi sembarangan. Kamu pasti akan **memecah tugas** menjadi langkah-langkah: cuci beras, masak nasi, siapkan bumbu, panaskan minyak, tumis bumbu, masukkan nasi, aduk, beri garam, sajikan. Tanpa sadar, kamu sudah menerapkan **berpikir komputasional** — sebuah cara berpikir yang dipakai ilmuwan komputer untuk menyelesaikan masalah kompleks.

## A. Berpikir Komputasional: Empat Pilar

Berpikir komputasional bukan berarti "berpikir seperti komputer". Komputer tidak bisa berpikir. Yang berpikir adalah **kamu** — dengan struktur yang sistematis. Ada 4 pilar utamanya:

### 1. Dekomposisi (Decomposition)
Memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah dipecahkan.

**Contoh real:** Andi ingin membuat website sekolah. Daripada langsung coding, Andi memecah jadi: (1) halaman utama, (2) halaman profil guru, (3) halaman berita, (4) halaman kontak. Setiap bagian bisa dikerjakan terpisah.

**Latihan:** Pecah tugas "mengadakan ulang tahun teman" jadi minimal 5 sub-tugas!

### 2. Pengenalan Pola (Pattern Recognition)
Mencari kesamaan atau pola yang berulang di antara masalah-masalah yang berbeda.

**Contoh real:** Bu Guru Siti melihat bahwa 3 siswa yang kesulitan matematika juga kesulitan membaca peta. Pola: kemampuan spasial berhubungan dengan kemampuan numerik. Bu Siti lalu membuat latihan gabungan.

**Contoh lain:** Saat login Instagram, kamu lihat pola "input email → input password → klik login". Pola yang sama muncul di Facebook, Twitter, TikTok. Sekali paham, kamu bisa login di mana saja.

### 3. Abstraksi (Abstraction)
Fokus pada hal penting, abaikan detail yang tidak relevan.

**Contoh real:** Peta Jakarta di Google Maps tidak menampilkan setiap pohon, tiang listrik, atau kucing jalanan. Peta hanya menampilkan: jalan, bangunan penting, nama tempat. Itu abstraksi — membuang detail tidak penting agar peta tetap terbaca.

**Contoh lain:** Buku resep. Resep "nasi goreng" tidak menjelaskan dari mana beras berasal, atau sejarah wajan. Resep hanya fokus: bahan, alat, langkah masak.

### 4. Algoritma (Algorithm)
Susunan langkah berurutan yang jelas untuk menyelesaikan masalah.

**Contoh real:** Algoritma menggosok gigi:
1. Ambil sikat gigi
2. Beri pasta gigi sebesar kacang
3. Basahi sikat
4. Gosok gigi atas dari kiri ke kanan, 10 kali
5. Gosok gigi bawah dari kiri ke kanan, 10 kali
6. Berkumur dengan air
7. Cuci sikat, simpan

Kalau langkah 4 dan 5 ditukar, hasilnya tetap bersih. Tapi kalau langkah 1 dan 2 ditukar (beri pasta sebelum ambil sikat), pasti kacau! Urutan langkah penting.

## B. Algoritma dan Dasar Pemrograman

### Notasi Algoritma
Ada 3 cara menulis algoritma:

**1. Deskriptif (kalimat biasa)**
> "Ambil gelas, tuangkan air sampai tiga perempat penuh, masukkan satu sendok gula, aduk sampai larut."

**2. Pseudocode (mirip kode tapi bukan kode asli)**
```
BEGIN
  AMBIL gelas
  TUANGKAN air sebanyak 3/4 gelas
  MASUKKAN gula 1 sendok
  ADUK hingga larut
END
```

**3. Flowchart (diagram alur)**
Mulai → Ambil gelas → Tuang air → Masukkan gula → Aduk → Selesai

### Variabel dan Tipe Data
**Variabel** = wadah untuk menyimpan data. Analogi: kotak pensil. Kotaknya adalah variabel, isi pensilnya adalah data.

**Tipe data dasar:**
- **Integer**: bilangan bulat (1, 50, -7)
- **Float**: bilangan desimal (3.14, 0.5)
- **String**: teks ("Halo", "Budi")
- **Boolean**: benar/salah (true/false)

**Contoh real:** Daftar harga di warung:
```
nama_barang = "Indomie"     # String
harga = 3500                # Integer
stok = 24.5                 # Float (kalau dihitung gram)
tersedia = true             # Boolean
```

### Struktur Kontrol: Percabangan (if-else)
Komputer bisa mengambil keputusan berdasarkan kondisi.

**Contoh real:** Algoritma penjualan tiket bioskop:
```
JIKA usia_penonton >= 17 MAKA
  TIKET = "Boleh masuk"
LAIN
  TIKET = "Tidak boleh masuk sendiri"
```

Skenario: Budi (16 tahun) ingin nonton film horror 17+. Sistem cek: 16 >= 17? **False**. Maka Budi tidak boleh masuk sendiri.

### Struktur Kontrol: Perulangan (loop)
Komputer bisa mengulang tugas yang sama berkali-kali tanpa lelah.

**Contoh real:** Cara guru absen siswa:
```
UNTUK setiap siswa di kelas 7A:
  Panggil nama siswa
  Tunggu jawaban "Hadir" / "Tidak hadir"
  Catat hasilnya
  Lanjut ke siswa berikutnya
```

Kalau ada 30 siswa, guru tidak perlu menulis "panggil nama" 30 kali. Cukup 1 kali dengan loop.

## C. Uji Kompetensi

### Soal Refleksi
1. Berikan contoh masalah di kehidupan sehari-hari yang bisa dipecahkan dengan dekomposisi!
2. Apa pola yang kamu temukan di login Instagram, Facebook, dan Twitter?
3. Buat algoritma untuk "membuat teh manis" — minimal 7 langkah berurutan!
4. Identifikasi: pada algoritma "membuat teh", langkah mana yang krusial (tidak boleh ditukar)?

### Proyek Mini
Buat algoritma "Cara mengirim pesan WhatsApp" — pecah jadi minimal 10 langkah. Tukar dengan teman, lihat apakah algoritma mereka bisa diikuti tanpa bingung.

---
**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 1, hal. 1-36
**Pengayaan:** Coba aplikasi Scratch (scratch.mit.edu) untuk latihan algoritma visual!
"""
    },
    {
        "id": "mat_inf_7_2",
        "title": "Bab 2: Pengolahan Data",
        "targetKelas": "7A,7B,7C",
        "cpId": "cp_inf_7_2",
        "tpId": "tp_inf_7_2_1",
        "category": "Pengolahan Data",
        "content": """# Bab 2: Pengolahan Data

## Mengapa Pengolahan Data Penting?

Ibu Guru Ani punya 30 siswa. Setelah ulangan, dia punya 30 angka nilai di kertas. Tapi dia tidak bisa langsung tahu: "Siapa yang nilai tertinggi? Berapa rata-rata kelas? Berapa yang lulus?" Angka-angka itu harus **diolah** menjadi informasi. Di sinilah peran **spreadsheet** — alat pengolah data otomatis.

## A. Mengenal Data

### Data vs Informasi
- **Data**: fakta mentah, belum diolah. Contoh: "30, 25, 17, 80, 90" (angka tanpa konteks)
- **Informasi**: data yang sudah diolah dan punya makna. Contoh: "Rata-rata nilai kelas = 48.4, 2 siswa lulus, 3 siswa tidak lulus"

**Contoh real:** Harga saham di TV berjalan: "BBCA 8,750; TLKM 3,200; ASII 7,400". Itu data. Kalau kamu baca "saham BBCA naik 2% minggu ini", itu informasi.

### Jenis Data
**1. Kualitatif** (deskriptif, tidak bisa dihitung)
- Warna favorit: "biru"
- Nama: "Budi Santoso"
- Pendapat: "enak"

**2. Kuantitatif** (numerik, bisa dihitung)
- Diskrit: jumlah siswa (30), jumlah mobil (5)
- Kontinu: berat badan (52.3 kg), tinggi (160.5 cm)

**Latihan:** Klasifikasikan: "umur 14 tahun", "nama Budi", "tinggi 165cm", "cita-cita dokter", "nilai 85".

### Sumber Data
- **Primer**: data yang kamu kumpul sendiri (wawancara, observasi, kuesioner)
- **Sekunder**: data orang lain yang kamu pakai (BPS, Kemendikbud, jurnal)

## B. Perkakas Pengolah Lembar Kerja (Spreadsheet)

### Pengenalan Spreadsheet
**Spreadsheet** adalah aplikasi untuk mengolah data berbentuk tabel. Contoh: Microsoft Excel, LibreOffice Calc, Google Sheets.

**Elemen dasar:**
- **Sel**: kotak tunggal (contoh: A1, B3, C7)
- **Baris (row)**: deret horizontal (1, 2, 3, ...)
- **Kolom (column)**: deret vertikal (A, B, C, ...)
- **Range**: kumpulan sel (contoh: A1:C10 = dari A1 sampai C10)

**Contoh real:** Daftar nilai siswa:
```
     A           B        C
1   Nama       Nilai   Status
2   Andi         85      Lulus
3   Budi         60      Remedial
4   Citra        90      Lulus
```

### Format Sel dan Tipe Data
Spreadsheet otomatis mendeteksi tipe data:
- Ketik "85" → dianggap **angka** (rata kanan)
- Ketik "Andi" → dianggap **teks** (rata kiri)
- Ketik "2026-08-26" → dianggap **tanggal**
- Ketik "85%" → dianggap **persentase**

### Operasi Dasar
- **Penjumlahan**: `=A1+A2`
- **Pengurangan**: `=A1-A2`
- **Perkalian**: `=A1*A2`
- **Pembagian**: `=A1/A2`
- **Pangkat**: `=A1^2`

## C. Pengolahan Data Dasar: Fungsi Statistik

### Fungsi SUM (penjumlahan)
```
=SUM(B2:B4)  → menjumlahkan B2 + B3 + B4
```
**Contoh:** Total nilai Andi+Budi+Citra = 85+60+90 = 235.

### Fungsi AVERAGE (rata-rata)
```
=AVERAGE(B2:B4)  → (85+60+90)/3 = 78.33
```

### Fungsi MIN dan MAX
```
=MIN(B2:B4)  → 60 (nilai terkecil)
=MAX(B2:B4)  → 90 (nilai terbesar)
```

### Fungsi COUNT
```
=COUNT(B2:B4)  → 3 (jumlah sel berisi angka)
=COUNTA(A2:A4) → 3 (jumlah sel berisi data apapun)
```

### Referensi Sel
**1. Relatif** (berubah saat di-copy)
- Formula `=A1` di sel C1, kalau di-copy ke C2, jadi `=A2`

**2. Absolut** (tidak berubah, pakai $)
- Formula `=$A$1` di sel C1, kalau di-copy ke C2, tetap `=$A$1`

**3. Campuran**
- `=$A1` → kolom A dikunci, baris bisa ubah
- `=A$1` → baris 1 dikunci, kolom bisa ubah

**Contoh real:** Bu Guru punya kurs USD di sel E1 (= Rp 15,500). Dia ingin konversi 100 harga dollar di kolom A ke rupiah di kolom B. Pakai `=A2*$E$1` lalu copy ke bawah. Tanpa $, formula akan jadi `=A3*E2` (salah, E2 kosong).

## D. Pengolahan Data Lanjutan

### Fungsi Logika: IF
```
=IF(kondisi, nilai_jika_benar, nilai_jika_salah)
```

**Contoh real:** Menentukan lulus/tidak:
```
=IF(B2>=75, "Lulus", "Remedial")
```
- B2=85 → "Lulus"
- B2=60 → "Remedial"

### Fungsi IF Bertingkat
```
=IF(B2>=90, "A", IF(B2>=80, "B", IF(B2>=70, "C", "D")))
```
- 95 → "A"
- 85 → "B"
- 75 → "C"
- 60 → "D"

### Fungsi AND, OR
```
=IF(AND(B2>=75, C2>=75), "Lulus Komplit", "Ada Remedial")
```
Lulus komplit hanya kalau B DAN C keduanya >= 75.

### Fungsi VLOOKUP (pencarian vertikal)
```
=VLOOKUP(nilai_dicari, tabel_referensi, kolom_hasil, FALSE)
```

**Contoh real:** Tabel konversi nilai:
```
E         F
1  0      D
2  60     C
3  70     B
4  85     A
```
Untuk cari predikat nilai 78:
```
=VLOOKUP(78, E1:F4, 2, FALSE)  →  ERROR (karena 78 tidak ada persis)
=VLOOKUP(78, E1:F4, 2, TRUE)   →  "B" (cari yang terdekat di bawahnya)
```

### Sortir dan Filter
- **Sortir**: urutkan data (A-Z, Z-A, kecil-besar, besar-kecil)
- **Filter**: tampilkan hanya data yang cocok kriteria

**Contoh real:** Daftar 100 siswa. Filter: tampilkan hanya kelas 7A. Sortir: urutkan nilai tertinggi ke terendah.

## E. Uji Kompetensi

### Soal Latihan
1. Bu Guru punya nilai: 80, 75, 90, 65, 85. Hitung SUM, AVERAGE, MIN, MAX, COUNT tanpa spreadsheet, lalu verifikasi dengan spreadsheet!
2. Di sel A1 ada harga Rp 10,000. Di sel B1 ada jumlah beli 5. Tulis formula di C1 untuk total harga!
3. Buat formula IF untuk menentukan "Murah" jika harga < 5000, "Sedang" jika 5000-10000, "Mahal" jika > 10000.
4. Pakai VLOOKUP untuk cari gaji karyawan berdasarkan NIK dari tabel master.

### Proyek Mini
Buat spreadsheet keuangan pribadi: catat uang saku mingguan, pengeluaran harian, dan otomatis hitung sisa uang. Tambahkan kolom "Status" yang menampilkan "Hemat" jika sisa > 50% uang saku, "Boros" jika < 20%.

---
**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 2, hal. 37-92
**Aplikasi latihan:** Google Sheets (gratis), LibreOffice Calc (gratis), Microsoft Excel
"""
    },
    {
        "id": "mat_inf_7_3",
        "title": "Bab 3: Literasi Informasi",
        "targetKelas": "7A,7B,7C",
        "cpId": "cp_inf_7_3",
        "tpId": "tp_inf_7_3_1",
        "category": "Literasi Digital",
        "content": """# Bab 3: Literasi Informasi

## Mengapa Literasi Informasi Penting?

Saat pandemic COVID-19, banyak berita beredar di WhatsApp: "Minum air hangat + jeruk nipis bisa sembuhkan COVID". Berita ini **viral** — diteruskan ribuan orang. Tapi faktanya? **Tidak ada bukti ilmiah**. Banyak orang tertipu karena tidak literat informasi.

Di era digital, masalah bukan **kekurangan informasi**, tapi **kelebihan informasi** — banyak yang palsu, bias, atau menyesatkan. Literasi informasi adalah **kemampuan mencari, mengevaluasi, dan menggunakan informasi secara kritis**.

## A. Data, Informasi, dan Konten

- **Data**: angka/fakta mentah (contoh: "37.5°C")
- **Informasi**: data dengan konteks ("suhu tubuh 37.5°C = demam ringan")
- **Konten**: informasi yang dipaket untuk dikonsumsi (artikel, video, infografis)

**Contoh real:** Pengukuran suhu tubuh Budi:
- Data: 38.2°C
- Informasi: Budi demam (di atas 37.5°C)
- Konten: Artikel "Cara Mengatasi Demam pada Anak" yang Budi baca

## B. Cara Menyimpan Konten

### Format File
- **PDF**: untuk dokumen final (tidak bisa diedit)
- **DOCX**: untuk dokumen yang masih akan diedit
- **HTML**: untuk halaman web
- **MP4**: untuk video
- **JPG/PNG**: untuk gambar

**Contoh real:** Kamu buat tugas di Word (.docx). Setelah selesai, simpan juga sebagai PDF sebelum dikirim ke guru — supaya formatnya tidak berubah di komputer guru.

### Cloud Storage vs Lokal
- **Lokal**: di komputer sendiri (C:\\Documents\\tugas.docx)
- **Cloud**: di internet (Google Drive, OneDrive, Dropbox)

**Keuntungan cloud:** bisa diakses dari mana saja, tidak hilang kalau komputer rusak.
**Risiko cloud:** butuh internet, privasi tergantung provider.

## C. Relevansi Hasil Pencarian

### Tips Pencarian yang Efektif
1. **Gunakan kata kunci spesifik**
   - Buruk: "sejarah indonesia"
   - Baik: "proklamasi kemerdekaan indonesia 17 agustus 1945"

2. **Gunakan tanda kutip untuk frase persis**
   - "pancasila sebagai dasar negara" → cari halaman dengan frase persis ini

3. **Operator pencarian**
   - `site:go.id` → hanya situs pemerintah
   - `site:ac.id` → hanya situs kampus
   - `filetype:pdf` → hanya PDF
   - `-` (minus) → exclude kata

**Contoh real:** Cari jurnal tentang "dampak game online pada siswa" di Google:
```
"dampak game online" siswa filetype:pdf site:ac.id
```
Hasil: jurnal PDF dari kampus, lebih kredibel daripada blog random.

## D. Mesin Pencari di Internet

### Cara Kerja Search Engine
1. **Crawling**: robot Google menjelajah web, mengumpulkan halaman
2. **Indexing**: halaman disimpan di database dengan kata kunci
3. **Ranking**: saat user search, algoritma urutkan halaman paling relevan
4. **Displaying**: tampilkan 10 hasil teratas di halaman 1

**Mengapa halaman 1 penting?** Studi menunjukkan 75% user tidak pernah klik ke halaman 2. Jadi ranking tinggi = lebih banyak visitor.

## E. Kredibilitas Sumber Informasi

### Kriteria Evaluasi (CRAAP Test)
- **C**urrency: kapan dipublikas? Apa masih aktual?
- **R**elevance: cocok dengan kebutuhan?
- **A**uthority: siapa penulis? Apa ahlinya?
- **A**ccuracy: ada referensi? Bisa diverifikasi?
- **P**urpose: apa tujuan penulis? (informasi, jualan, propaganda?)

**Contoh real:** Kamu cari info tentang vaksin. Sumber A: blog anonim "Vaksin Berbahaya!" Sumber B: situs WHO dengan referensi jurnal. Mana lebih kredibel? **B**, karena WHO authority-nya tinggi dan ada referensi.

### Cross-Check (Verifikasi Silang)
Jangan percaya satu sumber. Cari 2-3 sumber lain. Kalau semua sumber kredibel mengatakan hal sama, kemungkinan besar benar.

## F. Ekosistem Media Pers Digital

### Jenis Media Digital
- **Media mainstream**: Kompas, Tempo, CNN Indonesia (ada editor, kode etik)
- **Media alternatif**: blog independen, kanal YouTube
- **Sosial media**: Twitter, TikTok, Instagram (siapapun bisa posting)

**Risiko media sosial:** tidak ada editor. Siapapun bisa posting apa saja, termasuk hoaks.

## G. Fakta, Opini, dan Hoaks

### Perbedaan
- **Fakta**: bisa dibuktikan benar/salah. "Air mendidih di 100°C"
- **Opini**: pendapat pribadi. "Air kemasan A lebih enak dari B"
- **Hoaks**: informasi palsu yang sengaja disebar. "Air kemasan A mengandung racun"

### Jenis Hoaks
1. **Misinformation**: salah tapi tidak sengaja (tidak cek dulu)
2. **Disinformation**: sengaja dibuat palsu untuk menipu
3. **Malinformation**: info benar tapi dipakai untuk menyakiti (doxxing)

### Cara Verifikasi
- **CekFakta.com**: situs cek fakta Indonesia
- **Mafindo**: masyarakat anti fitnah Indonesia
- **Reverse image search**: cek apakah foto asli atau dipotong

**Contoh real:** Foto "banjir di Jakarta" viral. Kamu cek di Google Images — ternyata foto banjir Manila 2018. Itu hoaks.

## H. Uji Kompetensi

### Soal Refleksi
1. Cari 1 berita di socmed. Evaluasi dengan CRAAP test!
2. Berapa sumber yang kamu pakai sebelum percaya suatu informasi?
3. Apa perbedaan "menurut saya" (opini) dan "menurut data BPS" (fakta)?
4. Kamu terima forward WhatsApp "Aduk garam ke air, bisa sembuhkan sakit kepala". Apa yang kamu lakukan?

### Proyek Mini
Pilih 1 topik (mis: "dampak AI pada pendidikan"). Cari 5 sumber dari berbagai jenis (1 mainstream news, 1 jurnal, 1 blog, 1 video YouTube, 1 socmed). Evaluasi kredibilitas masing-masing dengan CRAAP test. Buat laporan: sumber mana paling kredibel, dan mengapa.

---
**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 3, hal. 93-136
**Tools verifikasi:** CekFakta.com, Mafindo, Google Fact Check
"""
    },
    {
        "id": "mat_inf_7_4",
        "title": "Bab 4: Keseimbangan Hidup di Dunia Digital",
        "targetKelas": "7A,7B,7C",
        "cpId": "cp_inf_7_4",
        "tpId": "tp_inf_7_4_1",
        "category": "Kesehatan Digital",
        "content": """# Bab 4: Keseimbangan Hidup di Dunia Digital

## Mengapa Keseimbangan Digital Penting?

Studi 2023 menemukan: rata-rata remaja Indonesia menghabiskan **7 jam 32 menit per hari** di depan layar (Kemdikbud). Itu lebih lama dari waktu tidur! Akibatnya: mata lelah, postur badan buruk, sulit tidur, nilai turun, hubungan dengan keluarga renggang.

Dunia digital **tidak musuh**. Tapi kalau tidak seimbang, dia bisa **menjadi tuan** yang menguasai kita. Kita harus jadi **tuan atas teknologi**, bukan sebaliknya.

## A. Ruang Publik Virtual

### Konsep Ruang Publik
Di dunia nyata, ruang publik = taman, alun-alun, kafe. Di dunia digital, ruang publik = Twitter, Instagram, TikTok, grup WhatsApp. Apa yang kamu posting di sana **bisa dilihat publik**.

### Etika Bermedia Sosial
1. **Hati-hati konten permanen** — yang di-post bisa discreenshot, disimpan, disebar ulang
2. **Pikir sebelum posting** — T.H.I.N.K.:
   - **T**rue (benar)?
   - **H**elpful (membantu)?
   - **I**nspiring (menginspirasi)?
   - **N**ecessary (perlu)?
   - **K**ind (baik)?
3. **Hormati privasi orang lain** — jangan posting foto teman tanpa izin

**Contoh real:** Sinta marah sama teman, lalu curhat di Twitter dengan menyebut nama. 1 minggu kemudian, temannya lihat. Hubungan mereka rusak permanen. Tweet bisa dihapus, tapi screenshot tidak bisa.

### Dampak Postingan terhadap Reputasi
- **Positif**: posting prestasi → kena prestise
- **Negatif**: posting kontenSensitive → dijauhi, ditolak saat interview kerja

**Studi kasus:** Seorang kandidat ditolak perusahaan karena posting Instagram-nya penuh keluhan dan makian. HRD cek socmed sebelum hire.

## B. Keseimbangan Dunia Virtual dan Nyata

### Tanda Kecanduan Digital
- Cek ponsel > 100 kali sehari
- Merasa cemas tanpa ponsel (nomophobia)
- Tidur larut karena main HP
- Nilai turun
- Hubungan dengan keluarga renggang
- Lupa makan/minum saat main game

### Digital Detox
Cara sengaja mengurangi penggunaan teknologi:
1. **Setting screen time** — batasi aplikasi tertentu 1 jam/hari
2. **No-phone zone** — area bebas HP (meja makan, kamar tidur)
3. **Offline day** — 1 hari minggu tanpa socmed
4. **Grayscale mode** — layar hitam-putih mengurangi ketagihan (warna-warna = trigger dopamine)

**Contoh real:** Andi coba digital detox 1 minggu. Hasilnya: tidur lebih nyenyak, nilai naik, lebih sering ngobrol sama orangtua. Sekarang jadi rutin.

### Manajemen Waktu Layar
Pakai fitur **Digital Wellbeing** (Android) atau **Screen Time** (iOS) untuk pantau:
- Aplikasi yang paling sering dipakai
- Total waktu layar
- Berapa kali unlock ponsel

## C. Memilah Informasi Privat dan Publik

### Data Pribadi (JANGAN DIBAGI)
- NIK (Nomor Induk Kependudukan)
- Alamat lengkap rumah
- Nomor rekening + PIN
- Password
- Tanggal lahir lengkap
- Biometrik (foto wajah untuk face ID)
- Lokasi real-time (check-in rumah)

### Data Semi-Privat (Hati-hati)
- Nomor HP (bisa disebar tapi hati-hati)
- Email pribadi
- Foto keluarga
- Sekolah
- Foto identitas

### Data Publik (Aman)
- Nama panggilan
- Hobi
- Kota (tidak spesifik alamat)
- Pendapat tentang film/buku

**Contoh real:** Kamu posting "Lagi di rumah sendirian, kasur empuk banget" + foto kamar. Hacker bisa tahu: (1) rumahmu kosong = bisa dibobol, (2) layout kamar = bisa diintip. Hati-hati!

### Risiko Oversharing
- **Identity theft**: pencuri identitas buka akun palsu atas namamu
- **Stalking**: orang tak dikenal lacak aktivitas harian
- **Burglary**: maling tahu kapan rumah kosong
- **Bullying**: info pribadi dipakai menjatuhkan

## D. Membuat Kata Sandi yang Aman

### Karakteristik Password Kuat
- Minimal 12 karakter
- Kombinasi: huruf besar, huruf kecil, angka, simbol
- Tidak mengandung info pribadi (nama, tanggal lahir)
- Tidak kata kamus (password, qwerty, 123456)
- Unik per akun

**Contoh real:**
- LEMAH: `budi2010` (nama + tahun lahir)
- LEMAH: `password123` (kata kamus)
- LEMAH: `qwerty` (urutan keyboard)
- KUAT: `Budi!2010#Kucing` (12+ char, kombinasi, susah ditebak)
- KUAT: `7K@mpUngM4wAr!nG` (kalimat dengan substitusi)

### Pengelolaan Password
**Jangan pakai 1 password untuk semua akun!** Kalau 1 bocor, semua ambruk.

**Solusi: Password Manager**
- Aplikasi: Bitwarden, 1Password, KeePass
- Simpan semua password di vault terenkripsi
- Kamu cuma perlu hafal 1 master password

### Two-Factor Authentication (2FA)
Login butuh 2 langkah:
1. Password (sesuatu yang kamu tahu)
2. Kode dari SMS/Authenticator (sesuatu yang kamu punya)

**Contoh real:** Login Google. Setelah password, Google kirim kode ke HP. Walau password bocor, hacker tidak bisa login tanpa HP-mu.

### Phishing (Penipuan)
Email/SMS palsu yang menyamar sebagai institusi resmi (bank, sekolah, socmed).

**Ciri phishing:**
- URL aneh (paypa1.com bukan paypal.com)
- Urgent (kalimat menekan)
- Minta password/PIN
- Grammar buruk

**Contoh real:** Email "Akun BCA Anda diblokir! Klik di sini untuk verifikasi." Kamu klik, diarahkan ke situs mirip BCA. Kamu input password. Boom, hacker punya akses.

## E. Uji Kompetensi

### Soal Refleksi
1. Berapa jam per hari kamu di depan layar? Hitung jujur!
2. Apa 3 tanda kecanduan digital yang kamu rasakan?
3. Klasifikasikan: alamat rumah, hobi, NIK, foto kucing — mana yang boleh diposting?
4. Buat password kuat untuk akun email sekolahmu. Jangan pakai password aslimu!

### Proyek Mini
**Digital Detox Challenge 7 hari:**
- Hari 1-2: catat waktu layar tanpa diubah
- Hari 3-5: kurangi 30% socmed
- Hari 6-7: no-phone zone di meja makan
- Catat perubahan: tidur, mood, hubungan keluarga, nilai

---
**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 4, hal. 137-166
**Tools:** Google Digital Wellbeing, Apple Screen Time, Bitwarden (password manager gratis)
"""
    },
    {
        "id": "mat_inf_7_5",
        "title": "Bab 5: Perkakas Teknologi Informasi dan Komunikasi",
        "targetKelas": "7A,7B,7C",
        "cpId": "cp_inf_7_5",
        "tpId": "tp_inf_7_5_1",
        "category": "Hardware & Jaringan",
        "content": """# Bab 5: Perkakas Teknologi Informasi dan Komunikasi

## Mengapa Memahami Sistem Komputer?

Kamu pakai HP setiap hari. Tapi pernahkah kamu bertanya: "Bagaimana foto yang saya ambil bisa muncul di Instagram teman saya dalam 1 detik?" Jawabannya melibatkan: kamera → prosesor → memori → WiFi → server → jaringan teman → HP teman. Tanpa memahami ini, kamu seperti mengemudi mobil tanpa tahu cara mesinnya bekerja — kalau rusak, bingung.

## A. Sistem Komputer

### Definisi Sistem Komputer
Sistem komputer = kombinasi **hardware** (perangkat keras) + **software** (perangkat lunak) + **brainware** (user) yang bekerja bersama memproses data menjadi informasi.

### Perangkat Keras (Hardware)

#### 1. Input Device (Masukan)
- **Keyboard**: input teks
- **Mouse**: input klik/gestur
- **Microphone**: input suara
- **Camera**: input gambar/video
- **Scanner**: input dokumen fisik
- **Touchscreen**: input sentuh

**Contoh real:** Saat kamu foto selfie, kamera HP = input device. Cahaya wajahmu diubah jadi sinyal digital.

#### 2. Process Device (Pemroses)
- **CPU (Central Processing Unit)**: otak komputer
  - Komponen: ALU (arithmetic), CU (control), Register
  - Contoh brand: Intel Core i5, AMD Ryzen 5, Apple M2
- **GPU (Graphics Processing Unit)**: otak untuk grafik/game
- **RAM**: memori sementara (cepat hilang saat mati)
- **Storage**: memori permanen

**Contoh real:** Saat main Mobile Legends:
- CPU: hitung posisi karakter, logika game
- GPU: render grafis ( efek, bayangan)
- RAM: simpan data sementara (lokasi hero, HP)
- Storage: simpan game data, save progress

#### 3. Output Device (Keluaran)
- **Monitor**: output visual
- **Speaker**: output suara
- **Printer**: output fisik (kertas)
- **Projector**: output ke layar besar

#### 4. Storage Device
- **HDD (Hard Disk Drive)**: murah, kapasitas besar, lambat
- **SSD (Solid State Drive)**: cepat, tahan banting, mahal
- **Flashdisk**: portable, kapasitas kecil
- **Cloud Storage**: di internet (Google Drive, OneDrive)

**Perbandingan SSD vs HDD:**
| Aspek | HDD | SSD |
|---|---|---|
| Kecepatan | Lambat (100 MB/s) | Cepat (500-7000 MB/s) |
| Harga | Murah | Mahal |
| Daya tahan | Rapuh (ada bagian bergerak) | Kuat (no moving parts) |
| Booting Windows | 30-60 detik | 5-10 detik |

### Siklus Pengolahan Data
```
INPUT → PROCESS → OUTPUT → STORAGE
  ↓        ↓         ↓         ↓
 Keyboard  CPU     Monitor    SSD
```

**Contoh real:** Kamu ketik "Halo" di Word:
1. **Input**: keyboard mengirim sinyal "H", "a", "l", "o"
2. **Process**: CPU terjemahkan jadi kode ASCII, simpan di RAM
3. **Output**: monitor tampilkan "Halo"
4. **Storage**: saat Save, disimpan ke SSD sebagai file .docx

### Perangkat Lunak (Software)

#### 1. Sistem Operasi (OS)
Mengatur hardware + software. Contoh: Windows, macOS, Linux, Android, iOS.

**Fungsi OS:**
- Manajemen file (create, delete, copy)
- Manajemen memori (alokasi RAM)
- Manajemen proses (multitasking)
- Driver hardware (printer, scanner)
- User interface (GUI/CLI)

#### 2. Aplikasi (Application Software)
- **Produktivitas**: Word, Excel, PowerPoint, Google Docs
- **Multimedia**: Photoshop, Premiere, Canva
- **Browser**: Chrome, Firefox, Safari
- **Game**: Mobile Legends, Minecraft
- **Komunikasi**: WhatsApp, Zoom, Discord

#### 3. Utility
- **Antivirus**: Windows Defender, Avast
- **Compression**: WinRAR, 7-Zip
- **Backup**: Time Machine, Google Backup

## B. Perangkat Lunak untuk Produktivitas

### Pengolah Kata (Word Processor)
- **Microsoft Word**: standar industri, berbayar
- **Google Docs**: online, gratis, kolaboratif
- **LibreOffice Writer**: gratis, open source

**Fitur utama:** format teks, paragraf, gambar, tabel, mail merge.

### Pengolah Angka (Spreadsheet)
- **Microsoft Excel**: powerful, berbayar
- **Google Sheets**: online, gratis, kolaboratif
- **LibreOffice Calc**: gratis

**Use case:** keuangan, statistik, database sederhana.

### Presentasi
- **PowerPoint**: standar
- **Google Slides**: online
- **Canva**: design-first, banyak template

### Pengolah Gambar
- **Photoshop**: profesional, berbayar
- **GIMP**: gratis, open source
- **Paint.NET**: simpel, gratis
- **Canva**: online, friendly

## C. Pengantar Jaringan Komputer dan Internet

### Jenis Jaringan Berdasarkan Skala
- **PAN** (Personal Area Network): Bluetooth headset → HP (1-10m)
- **LAN** (Local Area Network): warnet, lab sekolah (1-100m)
- **MAN** (Metropolitan Area Network): kota (1-50km)
- **WAN** (Wide Area Network): antar kota/negara (50km+)
- **Internet**: jaringan global jutaan jaringan

### Topologi Jaringan
1. **Star**: semua ke 1 hub/switch (paling umum di kantor)
2. **Bus**: 1 kabel utama, semua nempel
3. **Ring**: melingkar, token passing
4. **Mesh**: semua terhubung ke semua (paling tangguh, mahal)

### Protocol TCP/IP
**TCP/IP** = bahasa yang dipakai komputer untuk komunikasi.

- **IP Address**: alamat unik setiap perangkat (192.168.1.1)
- **DNS**: buku telepon internet (google.com → 142.250.x.x)
- **HTTP/HTTPS**: protocol web (HTTPS = encrypted)
- **Port**: jalur spesifik (80 = HTTP, 443 = HTTPS, 25 = email)

**Contoh real:** Kamu akses www.google.com:
1. Browser tanya DNS: "IP google.com?"
2. DNS jawab: "142.250.193.78"
3. Browser koneksi ke IP itu via HTTPS (port 443)
4. Server Google kirim halaman search

### Cara Kerja Internet
- **ISP** (Internet Service Provider): Telkom, IndiHome, Biznet
- **Bandwidth**: kapasitas jalur (Mbps = megabit per second)
- **Latency**: delay (ms = milidetik)
- **Ping**: waktu round-trip

**Contoh real:** Saat main Mobile Legends:
- Bandwidth 10 Mbps = bisa download update cepat
- Latency 30ms = responsif, tidak lag
- Latency 200ms = lag, skill telat keluar

## D. Uji Kompetensi

### Soal Refleksi
1. Sebutkan hardware input, process, output di smartphone kamu!
2. Kenapa SSD lebih cepat dari HDD? Jelaskan dengan analogi.
3. Kamu download file 1 GB dengan koneksi 10 Mbps. Berapa lama? (Hint: 1 byte = 8 bit)
4. Apa bedanya HTTP dan HTTPS? Mana yang lebih aman untuk login bank?

### Proyek Mini
Rancang jaringan untuk lab komputer sekolah dengan 20 PC. Tentukan: topologi, hardware yang dibutuhkan (switch, kabel, router), dan estimasi biaya. Buat diagramnya di kertas atau aplikasi draw.io.

---
**Sumber:** Buku Siswa Informatika Kelas VII (Edisi Revisi) - Kemendikbud 2023, Bab 5, hal. 167-234
**Tools belajar:** Cisco Packet Tracer (simulasi jaringan gratis), draw.io (diagram)
"""
    }
]

# Export untuk dipakai script utama
if __name__ == "__main__":
    print(f"Materi Kelas 7: {len(MATERI_KELAS_7)} bab")
    for m in MATERI_KELAS_7:
        print(f"  - {m['id']}: {m['title']} ({len(m['content'])} chars)")
