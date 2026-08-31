-- UPDATE MATERI DETAIL — Jalankan pertama kali
-- Auto-generated, jalankan di Supabase SQL Editor

-- ============================================================
-- UPDATE MATERI DETAIL (14 Bab)
-- ============================================================

-- ── Bab 1: Berpikir Komputasi untuk Penyelesaian Masalah ──
UPDATE "Material" SET
  title = 'Bab 1: Berpikir Komputasi untuk Penyelesaian Masalah',
  content = '# Bab 1: Berpikir Komputasi untuk Penyelesaian Masalah

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
',
  category = 'Konsep Dasar',
  "cpId" = 'cp_inf_7_1',
  "tpId" = 'tp_inf_7_1_1',
  "targetKelas" = '7A,7B,7C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_7_1';

-- ── Bab 2: Pengolahan Data ──
UPDATE "Material" SET
  title = 'Bab 2: Pengolahan Data',
  content = '# Bab 2: Pengolahan Data

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
',
  category = 'Pengolahan Data',
  "cpId" = 'cp_inf_7_2',
  "tpId" = 'tp_inf_7_2_1',
  "targetKelas" = '7A,7B,7C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_7_2';

-- ── Bab 3: Literasi Informasi ──
UPDATE "Material" SET
  title = 'Bab 3: Literasi Informasi',
  content = '# Bab 3: Literasi Informasi

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
- **Lokal**: di komputer sendiri (C:\Documents\tugas.docx)
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
',
  category = 'Literasi Digital',
  "cpId" = 'cp_inf_7_3',
  "tpId" = 'tp_inf_7_3_1',
  "targetKelas" = '7A,7B,7C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_7_3';

-- ── Bab 4: Keseimbangan Hidup di Dunia Digital ──
UPDATE "Material" SET
  title = 'Bab 4: Keseimbangan Hidup di Dunia Digital',
  content = '# Bab 4: Keseimbangan Hidup di Dunia Digital

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
',
  category = 'Kesehatan Digital',
  "cpId" = 'cp_inf_7_4',
  "tpId" = 'tp_inf_7_4_1',
  "targetKelas" = '7A,7B,7C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_7_4';

-- ── Bab 5: Perkakas Teknologi Informasi dan Komunikasi ──
UPDATE "Material" SET
  title = 'Bab 5: Perkakas Teknologi Informasi dan Komunikasi',
  content = '# Bab 5: Perkakas Teknologi Informasi dan Komunikasi

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
',
  category = 'Hardware & Jaringan',
  "cpId" = 'cp_inf_7_5',
  "tpId" = 'tp_inf_7_5_1',
  "targetKelas" = '7A,7B,7C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_7_5';

-- ── Bab 1: Analisis Data ──
UPDATE "Material" SET
  title = 'Bab 1: Analisis Data',
  content = '# Bab 1: Analisis Data

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
',
  category = 'Analisis Data',
  "cpId" = 'cp_inf_8_1',
  "tpId" = 'tp_inf_8_1_1',
  "targetKelas" = '8A,8B,8C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_8_1';

-- ── Bab 2: Berpikir Komputasional ──
UPDATE "Material" SET
  title = 'Bab 2: Berpikir Komputasional',
  content = '# Bab 2: Berpikir Komputasional

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
',
  category = 'Berpikir Komputasional',
  "cpId" = 'cp_inf_8_2',
  "tpId" = 'tp_inf_8_2_1',
  "targetKelas" = '8A,8B,8C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_8_2';

-- ── Bab 3: Algoritma Pemrograman ──
UPDATE "Material" SET
  title = 'Bab 3: Algoritma Pemrograman',
  content = '# Bab 3: Algoritma Pemrograman

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
',
  category = 'Algoritma Pemrograman',
  "cpId" = 'cp_inf_8_3',
  "tpId" = 'tp_inf_8_3_1',
  "targetKelas" = '8A,8B,8C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_8_3';

-- ── Bab 4: Jejak Bermedia Digital ──
UPDATE "Material" SET
  title = 'Bab 4: Jejak Bermedia Digital',
  content = '# Bab 4: Jejak Bermedia Digital

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
- **Instagram**: Report → It''s inappropriate → pilih alasan
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
',
  category = 'Jejak Digital',
  "cpId" = 'cp_inf_8_4',
  "tpId" = 'tp_inf_8_4_1',
  "targetKelas" = '8A,8B,8C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_8_4';

-- ── Bab 5: Pemanfaatan Perangkat Digital ──
UPDATE "Material" SET
  title = 'Bab 5: Pemanfaatan Perangkat Digital',
  content = '# Bab 5: Pemanfaatan Perangkat Digital

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
',
  category = 'Perangkat Digital',
  "cpId" = 'cp_inf_8_5',
  "tpId" = 'tp_inf_8_5_1',
  "targetKelas" = '8A,8B,8C',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_8_5';

-- ── Bab 1: Berpikir Komputasional dalam Analisis Data ──
UPDATE "Material" SET
  title = 'Bab 1: Berpikir Komputasional dalam Analisis Data',
  content = '# Bab 1: Berpikir Komputasional dalam Analisis Data

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
       / \
      B   C (parent of D, E, F)
     / \   \
    D   E   F (leaves)
```

### Binary Tree
Tree di mana setiap node punya **maksimal 2 anak** (left, right).

```
       10
      /  \
     5    15
    / \   \
   3   7   18
```

### Penerapan Tree di Kehupan

#### 1. Struktur Folder Komputer
```
C:\
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
        /         \
    <18           ≥18
     |             |
  [Tidak      [Punya SIM?]
  boleh       /         \
  mobil]   Ya            Tidak
            |             |
         [Boleh        [Tidak
          mobil]       boleh mobil]
```

#### 4. Parse Tree (Linguistik)
Kalimat "Budi makan nasi" dipecah:
```
        [S]
       /   \
     [NP]  [VP]
      |    /  \
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
',
  category = 'Struktur Data',
  "cpId" = 'cp_inf_9_1',
  "tpId" = 'tp_inf_9_1_1',
  "targetKelas" = '9A,9B',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_9_1';

-- ── Bab 2: Berpikir Komputasional dalam Algoritma dan Pemrograman ──
UPDATE "Material" SET
  title = 'Bab 2: Berpikir Komputasional dalam Algoritma dan Pemrograman',
  content = '# Bab 2: Berpikir Komputasional dalam Algoritma dan Pemrograman

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
    ''''''
    Menghitung luas persegi.
    
    Args:
        sisi (float): panjang sisi persegi
    
    Returns:
        float: luas persegi (sisi * sisi)
    
    Example:
        >>> luas_persegi(5)
        25
    ''''''
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
',
  category = 'Algoritma Pemrograman',
  "cpId" = 'cp_inf_9_2',
  "tpId" = 'tp_inf_9_2_1',
  "targetKelas" = '9A,9B',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_9_2';

-- ── Bab 3: Literasi Digital untuk Produktivitas ──
UPDATE "Material" SET
  title = 'Bab 3: Literasi Digital untuk Produktivitas',
  content = '# Bab 3: Literasi Digital untuk Produktivitas

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
',
  category = 'Produktivitas Digital',
  "cpId" = 'cp_inf_9_3',
  "tpId" = 'tp_inf_9_3_1',
  "targetKelas" = '9A,9B',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_9_3';

-- ── Bab 4: Keamanan Digital ──
UPDATE "Material" SET
  title = 'Bab 4: Keamanan Digital',
  content = '# Bab 4: Keamanan Digital

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
',
  category = 'Keamanan Digital',
  "cpId" = 'cp_inf_9_4',
  "tpId" = 'tp_inf_9_4_1',
  "targetKelas" = '9A,9B',
  "targetJenjang" = 'SMP',
  "updatedAt" = NOW()
WHERE id = 'mat_inf_9_4';
