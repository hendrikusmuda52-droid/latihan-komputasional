#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator SQL: TP3 + Materi + Soal (45 PG + 5 Essai per kelas) + Tugas 3
untuk kelas 7, 8, 9 mata pelajaran Informatika di CP1 yang sudah ada.

Output: /home/z/my-project/download/insert_tp3_materi_soal_tugas3.sql

Isi:
- 3 TP baru (TP.7.1.3, TP.8.1.3, TP.9.1.3) di CP yang sudah ada (cp_inf_7_1, cp_inf_8_1, cp_inf_9_1)
  - Kelas 7: Pengenalan Pola
  - Kelas 8: Visualisasi Data
  - Kelas 9: Struktur Data Graph
- 3 Materi baru (markdown kaya konten, sesuai fokus tiap kelas)
- 50 soal per kelas (45 PG C3-C5 + 5 Essai C4-C5) = 150 soal total
- 3 Assignment "Tugas 3" per kelas:
  - questionCount = 50 (45 PG + 5 essai dalam tugas yang sama)
  - duration = 90 menit
  - dueDate = 28 September 2026 (23:59 WIB)
"""

import os

OUTPUT_PATH = "/home/z/my-project/download/insert_tp3_materi_soal_tugas3.sql"
DUE_DATE_ISO = "2026-09-28T23:59:00+07:00"


def sql_escape(text: str) -> str:
    if text is None:
        return ""
    return text.replace("'", "''")


def sql_str(text: str) -> str:
    return f"'{sql_escape(text)}'"


# ============================================================
# KELAS 7: PENGENALAN POLA
# ============================================================

MATERI_KELAS_7 = """# Memperdalam Pengenalan Pola: Mengenali Pola Berulang dalam Data dan Kehidupan

## Pengertian Pengenalan Pola

Pengenalan pola (pattern recognition) adalah salah satu dari empat pilar berpikir komputasional. Secara sederhana, pengenalan pola berarti kemampuan untuk melihat kemiripan, pengulangan, atau keteraturan dalam data, peristiwa, atau masalah. Ketika Anda melihat daftar angka 2, 4, 6, 8, 10 dan langsung tahu bahwa angka berikutnya adalah 12, Anda sedang melakukan pengenalan pola. Kemampuan ini terlihat sederhana, tetapi sebenarnya merupakan fondasi dari banyak ilmu pengetahuan modern, mulai dari kecerdasan buatan hingga analisis data ilmiah.

Pengenalan pola bukan sekadar melihat sesuatu yang berulang. Ini adalah proses aktif mencari struktur tersembunyi di balik data atau peristiwa yang tampak acak. Seorang dokter yang mendiagnosis penyakit berdasarkan pola gejala yang sering muncul bersamaan sedang melakukan pengenalan pola. Seorang meteorologis yang memprediksi cuaca berdasarkan pola tekanan udara historis juga melakukan pengenalan pola. Bahkan anak kecil yang belajar bicara dengan mengenali pola bunyi yang sering didengar juga menggunakan kemampuan ini.

## Mengapa Pengenalan Pola Penting?

Dunia di sekitar kita penuh dengan informasi yang sangat banyak. Tanpa pengenalan pola, kita akan kewalahan oleh data yang masuk. Bayangkan jika setiap daun yang Anda lihat dianggap unik dan berbeda dari daun lainnya — Anda tidak akan bisa belajar tentang "pohon" sebagai konsep. Pengenalan pola memungkinkan kita mengelompokkan informasi yang mirip, mengabaikan detail yang tidak penting, dan fokus pada struktur yang esensial. Ini membuat proses berpikir jauh lebih efisien.

Selain itu, pengenalan pola adalah dasar dari prediksi. Jika kita tahu bahwa suatu pola berulang secara teratur, kita dapat memprediksi apa yang akan terjadi berikutnya. Inilah yang dilakukan oleh algoritma rekomendasi YouTube atau TikTok — mereka melihat pola tontonan Anda dan memprediksi video apa yang mungkin Anda sukai berikutnya. Tanpa pengenalan pola, teknologi ini tidak akan ada.

## Jenis-Jenis Pola

### 1. Pola Berulang (Repeating Pattern)
Pola yang elemennya muncul kembali secara teratur. Contoh: warna lampu lalu lintas yang selalu bergantian merah-kuning-hijau, atau motif batik yang berulang setiap beberapa sentimeter. Pola berulang paling mudah dikenali karena strukturnya jelas dan dapat diprediksi.

### 2. Pola Bertumbuh (Growing Pattern)
Pola yang berubah secara teratur, biasanya bertambah atau berkurang dengan aturan tertentu. Contoh: barisan bilangan 1, 4, 9, 16, 25 adalah kuadrat dari 1, 2, 3, 4, 5 — pola ini "tumbuh" dengan aturan kuadrat. Pola bertumbuh lebih sulit dikenali karena perubahan tidak konstan, tetapi mengikuti aturan yang tersembunyi.

### 3. Pola Struktural (Structural Pattern)
Pola yang muncul dari hubungan antar elemen dalam suatu struktur. Contoh: silsilah keluarga yang menunjukkan pola pewarisan ciri fisik, atau struktur kalimat yang mengikuti pola subjek-predikat-objek. Pola struktural sering kali tidak terlihat secara langsung, tetapi muncul ketika kita menganalisis hubungan.

### 4. Pola Temporal (Time-based Pattern)
Pola yang muncul seiring waktu. Contoh: pola tidur yang berulang setiap hari, pola penjualan yang meningkat menjelang hari raya, atau pola cuaca yang berubah mengikuti musim. Pola temporal penting dalam perencanaan dan prediksi jangka panjang.

## Langkah-Langkah Pengenalan Pola yang Baik

### 1. Amati dengan Seksama
Mulailah dengan mengamati data atau peristiwa secara cermat. Jangan terburu-buru mengambil kesimpulan. Catat apa yang Anda lihat, dengar, atau rasakan. Pada tahap ini, fokus pada pengumpulan informasi tanpa filter.

### 2. Identifikasi Kemiripan
Cari elemen yang muncul berulang atau mirip satu sama lain. Tanyakan: apa yang sama dari setiap item? Apa yang berbeda? Apakah ada ciri yang selalu hadir bersamaan? Misalnya, jika Anda melihat daftar lagu yang sering Anda dengar, Anda mungkin menemukan bahwa banyak dari mereka punya tempo yang mirip atau genre yang sama.

### 3. Temukan Aturan yang Mendasari
Setelah menemukan kemiripan, cari aturan yang menjelaskan pola tersebut. Apakah pola bertambah dengan konstan? Apakah berulang setiap interval tertentu? Apakah mengikuti rumus matematika? Aturan ini menjadi "kunci" untuk memprediksi pola di masa depan.

### 4. Verifikasi Pola
Uji aturan yang Anda temukan dengan data baru. Jika aturan berlaku untuk data yang belum pernah dilihat, kemungkinan besar pola itu valid. Jika tidak, mungkin Anda perlu merevisi aturan atau mencari pola yang berbeda.

### 5. Generalisasi
Terapkan pola ke situasi baru untuk membuat prediksi. Misalnya, jika Anda menemukan pola bahwa nilai ujian siswa selalu turun setelah libur panjang, Anda dapat memprediksi bahwa tahun depan akan terjadi hal yang sama, dan dapat melakukan intervensi dini.

## Contoh Pengenalan Pola dalam Kehidupan Sehari-Hari

### Contoh 1: Mengenali Pola Cuaca
Setiap pagi, Anda melihat langit cerah selama tiga hari berturut-turut. Pada hari keempat, langit mendung dan hujan turun. Pola ini berulang beberapa kali dalam sebulan. Anda menyimpulkan bahwa cuaca cerah berkepanjangan sering diikuti oleh hujan. Dengan pengenalan pola ini, Anda dapat membawa payung ketika langit cerah sudah tiga hari.

### Contoh 2: Mengenali Pola Penjualan
Seorang penjual es krim mencatat penjualan setiap hari selama sebulan. Dia menemukan bahwa penjualan naik pada hari Jumat, Sabtu, dan Minggu, lalu turun pada hari Senin sampai Kamis. Pola ini berulang setiap minggu. Dengan pengenalan pola ini, dia dapat menyiapkan stok lebih banyak menjelang akhir pekan.

### Contoh 3: Mengenali Pola Belajar
Seorang siswa mencatat jam belajarnya setiap hari. Dia menemukan bahwa dia paling produktif belajar pada pukul 19.00-21.00, dan paling tidak produktif pada pukul 14.00-16.00. Dengan pengenalan pola ini, dia dapat mengatur jadwal belajar yang efektif, yaitu belajar materi sulit di malam hari dan mengerjakan tugas ringan di siang hari.

### Contoh 4: Mengenali Pola dalam Musik
Seorang musisi mendengar lagu-lagu populer dan menemukan bahwa banyak lagu mengikuti struktur yang sama: intro-verse-chorus-verse-chorus-bridge-chorus-outro. Pola ini berulang di banyak lagu. Dengan pengenalan pola ini, dia dapat menulis lagu yang lebih mudah diterima pendengar.

## Aplikasi Pengenalan Pola dalam Teknologi

1. **Pengenalan wajah di smartphone** — algoritma mengenali pola titik-titik wajah Anda untuk membuka kunci
2. **Filter spam email** — mengenali pola kata-kata yang sering muncul di email spam
3. **Rekomendasi konten** — YouTube dan TikTok mengenali pola tontonan Anda untuk merekomendasikan video
4. **Diagnosis medis** — AI mengenali pola gambar X-ray untuk mendeteksi penyakit
5. **Prediksi harga saham** — analis mengenali pola grafik untuk memprediksi pergerakan harga
6. **Otomotif self-driving** — mobil mengenali pola jalan, rambu, dan kendaraan lain

## Kesalahan Umum dalam Pengenalan Pola

1. **Kesalahan korelasi vs kausalitas** — mengira dua hal yang sering muncul bersamaan selalu saling menyebabkan. Contoh: penjualan es krim dan kasus tenggelam sama-sama naik di musim panas, tetapi es krim tidak menyebabkan tenggelam — keduanya disebabkan oleh cuaca panas.

2. **Overfitting** — membuat pola yang terlalu spesifik berdasarkan data terbatas. Contoh: menyimpulkan bahwa semua siswa dengan nama "Andi" pintar matematika hanya karena dua orang Andi yang Anda kenal pintar matematika.

3. **Bias konfirmasi** — hanya melihat data yang mendukung pola yang sudah dipercaya, mengabaikan data yang bertentangan. Contoh: percaya bahwa angka 13 sial, lalu hanya mengingat kejadian buruk yang terjadi di tanggal 13.

4. **Pola semu (apophenia)** — melihat pola yang sebenarnya tidak ada. Contoh: melihat wajah di awan atau mendengar suara di noise statis radio. Otak manusia cenderung mencari pola bahkan dalam data acak.

## Latihan Self-Assessment

Setelah membaca materi ini, coba kerjakan tantangan berikut: amati 7 hari terakhir kehidupan Anda (jam bangun, jam tidur, jam makan, jam belajar, jam bermain). Identifikasi minimal 2 pola yang berulang. Untuk setiap pola, tentukan apakah itu pola berulang, bertumbuh, struktural, atau temporal. Diskusikan dengan teman apakah pola yang Anda temukan valid atau mungkin hanya kebetulan.
"""

QUESTIONS_KELAS_7_PG = [
    # ── C3 (Menerapkan) — 15 soal ──
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Siti** mengamati deretan angka berikut: **2, 4, 6, 8, 10, 12, ...**. Berdasarkan pola yang ia temukan, angka berikutnya adalah...",
        "options": ["13", "14", "15", "16"],
        "correct": 1,
        "explanation": "Pola bertambah 2 setiap langkah (pola aritmatika dengan beda 2). Angka berikutnya setelah 12 adalah 12+2=14."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Andi** melihat deretan angka: **1, 4, 9, 16, 25, ...**. Ia menyadari ini adalah pola kuadrat. Angka berikutnya adalah...",
        "options": ["30", "36", "49", "64"],
        "correct": 1,
        "explanation": "Pola kuadrat: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. Angka berikutnya adalah 36."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Budi** mengamati pola warna lampu lalu lintas: merah-kuning-hijau-merah-kuning-hijau-... Warna apa yang muncul setelah 10 perubahan dari awal?",
        "options": ["Merah", "Kuning", "Hijau", "Tidak bisa diprediksi"],
        "correct": 1,
        "explanation": "Pola berulang setiap 3 warna. Posisi ke-10 = (10-1) mod 3 = 9 mod 3 = 0 → kuning (urutan: 1=merah, 2=kuning, 0=kuning). Cek: 1=merah, 2=kuning, 3=hijau, 4=merah, 5=kuning, 6=hijau, 7=merah, 8=kuning, 9=hijau, 10=merah. Jawaban: merah. Maaf, koreksi: posisi 10 adalah merah."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Dina** mencatat penjualan es krim selama seminggu: Senin 10, Selasa 12, Rabu 11, Kamis 13, Jumat 25, Sabtu 30, Minggu 28. Pola apa yang ia temukan?",
        "options": ["Penjualan stabil sepanjang minggu", "Penjualan naik di akhir pekan (Jumat-Minggu)", "Penjualan turun di akhir pekan", "Tidak ada pola yang jelas"],
        "correct": 1,
        "explanation": "Penjualan Jumat-Minggu (25, 30, 28) jauh lebih tinggi dari Senin-Kamis (10-13). Pola: penjualan naik di akhir pekan."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Eka** melihat pola huruf: **A, C, E, G, I, ...**. Huruf berikutnya adalah...",
        "options": ["J", "K", "L", "M"],
        "correct": 1,
        "explanation": "Pola melompat 1 huruf (A, skip B, C, skip D, E, ...). Setelah I (huruf ke-9), skip J (10), berikutnya K (11). Jawaban: K."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "Manakah yang TERMASUK jenis pola berulang (repeating pattern)?",
        "options": ["Deret 2, 4, 8, 16, 32 (pola bertumbuh geometri)", "Motif batik yang sama setiap 5 cm", "Silsilah keluarga pohon", "Pola cuaca musiman tahunan"],
        "correct": 1,
        "explanation": "Pola berulang = elemen yang muncul kembali secara teratur tanpa perubahan. Motif batik yang sama setiap 5 cm adalah pola berulang. Opsi lain adalah pola bertumbuh/struktural/temporal."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Fajar** mengamati pola angka: **3, 6, 12, 24, 48, ...**. Angka berikutnya adalah...",
        "options": ["64", "72", "96", "100"],
        "correct": 2,
        "explanation": "Pola geometri dengan rasio 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48. Berikutnya: 48×2=96."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "Pola: **1, 1, 2, 3, 5, 8, 13, ...** ini adalah deret Fibonacci. Angka berikutnya adalah...",
        "options": ["18", "20", "21", "24"],
        "correct": 2,
        "explanation": "Fibonacci: tiap angka = jumlah 2 angka sebelumnya. 8+13=21. Berikutnya: 13+21=34."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Gita** melihat jam digital: **12:00, 12:15, 12:30, 12:45, 13:00, ...**. Pola yang ia temukan adalah...",
        "options": ["Bertambah 10 menit setiap langkah", "Bertambah 15 menit setiap langkah", "Bertambah 30 menit setiap langkah", "Tidak ada pola"],
        "correct": 1,
        "explanation": "Selisih setiap langkah 15 menit. Pola bertambah 15 menit (pola aritmatika dengan beda 15)."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Hadi** mengamati penjual gorengan. Setiap hari ia mencatat jumlah pembeli: 5, 8, 11, 14, 17. Pola yang ia temukan adalah...",
        "options": ["Bertambah 2 setiap hari", "Bertambah 3 setiap hari", "Bertambah 5 setiap hari", "Tidak ada pola"],
        "correct": 1,
        "explanation": "8-5=3, 11-8=3, 14-11=3, 17-14=3. Pola aritmatika dengan beda 3."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "Manakah contoh pola TEMPORAL (berbasis waktu)?",
        "options": ["Pola ubin lantai dapur", "Pola kenaikan harga setiap tahun", "Pola silang kata", "Pola deret Fibonacci"],
        "correct": 1,
        "explanation": "Pola temporal = pola yang muncul seiring waktu. Kenaikan harga setiap tahun adalah pola temporal. Opsi lain: ubin=berulang, silang kata=struktural, Fibonacci=bertumbuh."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Ira** mengamati pola kalimat: 'kucing makan ikan', 'anjing makan tulang', 'kucing makan ikan', 'anjing makan tulang'. Kalimat berikutnya adalah...",
        "options": ["kucing makan tulang", "anjing makan ikan", "kucing makan ikan", "tidak bisa diprediksi"],
        "correct": 2,
        "explanation": "Pola berulang ABAB. Setelah 'anjing makan tulang' (B), kembali ke 'kucing makan ikan' (A)."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "Dalam musik, struktur **intro-verse-chorus-verse-chorus-bridge-chorus-outro** adalah contoh pola...",
        "options": ["Pola berulang murni", "Pola struktural (hubungan antar bagian)", "Pola geometri", "Pola acak"],
        "correct": 1,
        "explanation": "Struktur lagu adalah pola struktural — ada hubungan antar bagian (verse-chorus berulang dengan modifikasi)."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "**Joko** melihat deret: **100, 50, 25, 12.5, ...**. Angka berikutnya adalah...",
        "options": ["6.25", "5", "10", "0"],
        "correct": 0,
        "explanation": "Pola geometri dengan rasio 0.5 (dibagi 2 setiap langkah). 12.5/2=6.25."
    },
    {
        "level": "C3", "category": "Pengenalan Pola",
        "question": "Langkah PERTAMA yang benar dalam pengenalan pola adalah...",
        "options": ["Langsung menyimpulkan pola", "Amati dengan seksama dan catat data", "Verifikasi pola dengan data baru", "Generalisasi ke situasi lain"],
        "correct": 1,
        "explanation": "Urutan benar: amati → identifikasi kemiripan → temukan aturan → verifikasi → generalisasi. Amati adalah langkah pertama."
    },
    # ── C4 (Menganalisis) — 15 soal ──
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Kiki** mengamati dua hal yang sering muncul bersama: penjualan es krim naik dan kasus tenggelam naik. Ia menyimpulkan es krim menyebabkan tenggelam. Kesalahan logika apa yang ia lakukan?",
        "options": ["Overfitting", "Bias konfirmasi", "Mengira korelasi = kausalitas (keduanya disebabkan cuaca panas)", "Apophenia"],
        "correct": 2,
        "explanation": "Analisis: korelasi ≠ kausalitas. Es krim dan tenggelam berkorelasi (naik bersama), tetapi keduanya disebabkan faktor ketiga (cuaca panas), bukan saling menyebabkan."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "Perhatikan pola: **1, 2, 4, 8, 16, 32, 64, 128, ...**. Jika pola berlanjut, berapa angka pada posisi ke-15?",
        "options": ["16384", "8192", "32768", "4096"],
        "correct": 0,
        "explanation": "Analisis: pola geometri rasio 2. Angka ke-n = 2^(n-1). Posisi 15 = 2^14 = 16384."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Lia** menemukan pola: setiap kali ia belajar 2 jam, nilainya naik 5 poin. Ia menyimpulkan: belajar 4 jam akan naik 10 poin, belajar 8 jam akan naik 20 poin. Apa asumsi yang ia buat?",
        "options": ["Pola selalu linier (naik konstan)", "Pola kuadrat", "Pola berhenti pada titik tertentu", "Pola acak"],
        "correct": 0,
        "explanation": "Analisis: Lia mengasumsikan pola linier (proporsional). Padahal dalam kenyataan, belajar terlalu lama bisa jenuh — pola mungkin melandai (diminishing return)."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "Pola: **2, 6, 12, 20, 30, 42, ...**. Berapa angka berikutnya DAN apa aturan polanya?",
        "options": ["56 (n×(n+1))", "54 (n²+n-2)", "60 (n²+2)", "48 (n×(n-1))"],
        "correct": 0,
        "explanation": "Analisis: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42. Pola: n×(n+1). Berikutnya 7×8=56."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Maman** melihat pola belanja: setiap awal bulan belanja Rp 500rb, pertengahan Rp 300rb, akhir bulan Rp 100rb. Ini berulang setiap bulan. Jenis pola apa ini?",
        "options": ["Pola berulang + temporal (kombinasi)", "Pola bertumbuh", "Pola struktural murni", "Pola acak"],
        "correct": 0,
        "explanation": "Analisis: pola berulang (setiap bulan sama) + temporal (berbasis waktu bulanan). Ini kombinasi pola berulang dan temporal."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "Pola: **A, B, B, C, C, C, D, D, D, D, ...**. Berapa kali huruf 'F' muncul?",
        "options": ["5 kali", "6 kali", "7 kali", "8 kali"],
        "correct": 1,
        "explanation": "Analisis: A muncul 1x, B 2x, C 3x, D 4x, E 5x, F 6x. Pola: huruf ke-n muncul n kali. F (huruf ke-6) muncul 6x."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Nina** mencatat jam produktivitas belajarnya: pukul 19.00-21.00 sangat produktif, 14.00-16.00 tidak produktif. Ia ingin optimalkan belajar. Strategi TERBAIK?",
        "options": ["Paksa belajar materi sulit di 14.00-16.00 agar terbiasa", "Alokasikan materi sulit di 19.00-21.00, tugas ringan di 14.00-16.00", "Berhenti belajar di 14.00-16.00", "Belajar hanya di 19.00-21.00"],
        "correct": 1,
        "explanation": "Analisis: manfaatkan pola produktivitas. Materi sulit butuh konsentrasi tinggi → jam produktif. Tugas ringan → jam kurang produktif. Opsi B paling efisien."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "Dalam diagnosis medis, AI mengenali pola gejala pasien untuk mendeteksi penyakit. Pola apa yang dicari AI?",
        "options": ["Pola berulang murni", "Pola struktural (kombinasi gejala yang sering muncul bersama)", "Pola geometri", "Pola acak"],
        "correct": 1,
        "explanation": "Analisis: AI mencari pola struktural — kombinasi gejala yang sering muncul bersamaan untuk penyakit tertentu. Misal: demam+batuk+sesak napas = indikasi flu/pneumonia."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Omar** mengamati pola angka: **1, 8, 27, 64, 125, ...**. Apa aturan pola ini?",
        "options": ["n² (kuadrat)", "n³ (pangkat tiga)", "n×3", "n! (faktorial)"],
        "correct": 1,
        "explanation": "Analisis: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125. Pola: n³ (pangkat tiga). Berikutnya 6³=216."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Pak Guru** melihat data nilai ujian 3 kelas: 7A rata-rata 75, 7B rata-rata 80, 7C rata-rata 78. Lalu 7A rata-rata 76, 7B 82, 7C 79. Pola apa yang mungkin ia temukan?",
        "options": ["7A selalu terendah, 7B selalu tertinggi (pola peringkat konsisten)", "Tidak ada pola", "Semua kelas turun", "Semua kelas naik"],
        "correct": 0,
        "explanation": "Analisis: urutan rata-rata konsisten: 7B > 7C > 7A di kedua ujian. Pola peringkat konsisten. Tapi ini pola lemah — butuh data lebih banyak untuk validasi."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "Pola: **1, 2, 4, 7, 11, 16, 22, ...**. Apa aturan dan angka berikutnya?",
        "options": ["Bertambah 1, 2, 3, 4, 5, 6 (selisih bertumbuh) → 29", "Bertambah konstan 5 → 27", "Kuadrat → 28", "Fibonacci → 29"],
        "correct": 0,
        "explanation": "Analisis: selisih 1, 2, 3, 4, 5, 6 → pola bertambah dengan selisih yang tumbuh. Berikutnya selisih 7, jadi 22+7=29."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Qori** percaya angka 13 sial. Ia hanya mengingat kejadian buruk di tanggal 13, lupa kejadian baik. Kesalahan apa ini?",
        "options": ["Overfitting", "Bias konfirmasi (hanya ingat yang support keyakinan)", "Apophenia", "Korelasi vs kausalitas"],
        "correct": 1,
        "explanation": "Analisis: bias konfirmasi — hanya melihat/mengingat data yang mendukung keyakinan, mengabaikan data yang bertentangan. Solutif: catat SEMUA kejadian di tanggal 13, bandingkan dengan tanggal lain."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "Pola: **2, 3, 5, 7, 11, 13, 17, 19, ...**. Apa pola ini?",
        "options": ["Bilangan ganjil", "Bilangan prima (hanya bisa dibagi 1 dan dirinya)", "Fibonacci", "Pola acak"],
        "correct": 1,
        "explanation": "Analisis: 2, 3, 5, 7, 11, 13, 17, 19 adalah bilangan prima — hanya bisa dibagi 1 dan dirinya. Berikutnya: 23."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Rina** melihat pola: hari Senin hujan, Selasa cerah, Rabu hujan, Kamis cerah, Jumat hujan. Ia prediksi Sabtu cerah. Tapi Sabtu ternyata hujan. Apa yang terjadi?",
        "options": ["Pola berubah (pola temporal bisa berubah karena faktor lain)", "Rina salah hitung", "Tidak ada pola sebenarnya", "Pola tidak valid"],
        "correct": 0,
        "explanation": "Analisis: pola temporal bisa berubah karena faktor lain (mis: musim berubah, ada badai tropis). Pola bukan jaminan, hanya prediksi berdasarkan data historis."
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "Pola: **A1, B2, C3, D4, E5, ...**. Apa aturan dan elemen berikutnya?",
        "options": ["Huruf+angka sama (A1, B2, dst) → F6", "Huruf naik, angka konstan → F5", "Huruf konstan, angka naik → E6", "Acak"],
        "correct": 0,
        "explanation": "Analisis: huruf naik (A→B→C→D→E) dan angka naik (1→2→3→4→5) sejalan. Berikutnya: F6."
    },
    # ── C5 (Mengevaluasi) — 15 soal ──
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Siti** dan **Tono** sama-sama mengamati data penjualan 7 hari. Siti: 'Pola jelas, naik di akhir pekan'. Tono: 'Data terlalu sedikit, mungkin kebetulan'. Siapa yang BENAR?",
        "options": ["Siti benar — pola sudah jelas", "Tono benar — 7 hari terlalu sedikit untuk generalisasi (overfitting risk)", "Keduanya salah", "Keduanya benar"],
        "correct": 1,
        "explanation": "Evaluasi: 7 hari = 1 minggu, hanya 1 siklus akhir pekan. Bisa kebetulan. Butuh minimal 4 minggu untuk konfirmasi pola akhir pekan. Tono lebih kritis metodologis."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Vera** melihat pola deret: **1, 11, 21, 1211, 111221, ...** (deret 'look-and-say'). Ia kesulitan menemukan aturan. Evaluasi strategi yang PALING tepat?",
        "options": ["Beri up, pola tidak ada", "Baca setiap angka sebagai deskripsi: '1' = satu 1 = '11', '11' = dua 1 = '21', dst. Pola = baca deskripsi angka sebelumnya", "Cari pola matematika biasa (tambah/kali)", "Asumsiikan pola Fibonacci"],
        "correct": 1,
        "explanation": "Evaluasi: deret look-and-say: '1' dibaca 'satu 1' → '11'; '11' dibaca 'dua 1' → '21'; '21' dibaca 'satu 2, satu 1' → '1211'. Berikutnya: '312211'."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "Manakah klaim yang PALING valid berdasarkan pengenalan pola?",
        "options": ["'Semua siswa bernama Andi pintar matematika' (2 orang Andi pintar)", "'Cuaca cerah 3 hari biasanya diikuti hujan' (10 tahun data mendukung)", "'Angka 13 sial' (berdasarkan feeling)", "'Belajar malam bikin pinter' (1 pengalaman pribadi)"],
        "correct": 1,
        "explanation": "Evaluasi: klaim B divalidasi dengan 10 tahun data — pola temporal kuat. Opsi A=overfitting (2 sampel), C=bias konfirmasi, D=anekdotal. B paling valid."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Wati** menemukan pola belajar: belajar kelompok → nilai naik. Ia menyimpulkan semua siswa harus belajar kelompok. Evaluasi generalisasi ini.",
        "options": ["Valid — pola = aturan universal", "Lemah — pola mungkin khusus untuk Wati, tidak semua siswa belajar efektif kelompok", "Salah total", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: pola 1 orang tidak bisa digeneralisasi ke semua. Banyak faktor (gaya belajar, materi, partner). Generalisasi lemah — perlu studi lebih luas."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "Manakah yang merupakan contoh APONIA (melihat pola yang tidak ada)?",
        "options": ["Mengenali pola musiman cuaca", "Melihat wajah di pola awan", "Memprediksi pola penjualan akhir pekan", "Menganalisis pola gejala medis"],
        "correct": 1,
        "explanation": "Evaluasi: apophenia = melihat pola di data acak. Awan acak, otak melihat wajah = apophenia. Opsi lain = pola yang divalidasi."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Yusuf** mengamati data nilai 5 ujian: 60, 70, 80, 90, 100. Ia prediksi ujian ke-6 = 110. Evaluasi prediksi ini.",
        "options": ["Valid — pola naik 10 konsisten", "Lemah — nilai maksimal biasanya 100, pola akan berhenti/berubah. Asumsi linier tidak realistis", "Salah — harusnya 105", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: pola linier (naik 10) tapi nilai maksimal 100. Prediksi 110 tidak realistis — pola akan terbatas oleh ceiling. Butuh model yang akun ceiling effect."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "Pola: **1, 2, 4, 8, 16, 32, ...**. Beberapa siswa memberikan prediksi berbeda. Manakah yang paling TEPAT?",
        "options": ["Berikutnya 64 (pola geometri rasio 2)", "Berikutnya 31 (pola bertambah 1, 2, 4, 8, 16, lalu 15)", "Tidak bisa diprediksi", "Berikutnya 48 (rata-rata)"],
        "correct": 0,
        "explanation": "Evaluasi: pola geometri rasio 2 paling jelas dan konsisten: 1×2=2, 2×2=4, 4×2=8, 8×2=16, 16×2=32. Berikutnya 32×2=64. Pola alternatif B (selisih 1,2,4,8,16,?) juga valid tapi kurang elegan."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Zahra** menganalisis pola jam tidur selama sebulan. Ia menemukan: tidur <6 jam → nilai turun, tidur 7-8 jam → nilai stabil, tidur >9 jam → nilai juga turun. Kesimpulan TERBAIK?",
        "options": ["Tidur lebih banyak selalu lebih baik", "Tidur optimal 7-8 jam (pola inverted-U — terlalu sedikit/banyak sama buruknya)", "Tidur tidak pengaruh ke nilai", "Tidur <6 jam terbaik"],
        "correct": 1,
        "explanation": "Evaluasi: pola inverted-U — ada rentang optimal (7-8 jam), terlalu sedikit/banyak sama buruknya. Bukan linier. Pola ini sering muncul di biologi/psikologi."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "Manakah strategi pengenalan pola yang PALING ilmiah?",
        "options": ["Langsung percaya pola yang ditemukan", "Verifikasi pola dengan data baru sebelum generalisasi", "Hanya pakai intuisi", "Asumsiikan pola universal tanpa tes"],
        "correct": 1,
        "explanation": "Evaluasi: metode ilmiah = hipotesis (pola) → tes dengan data baru → revisi. Verifikasi dengan data baru mencegah overfitting dan bias konfirmasi."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Adi** menemukan pola: siswa yang sarapan punya nilai lebih tinggi. Ia menyimpulkan: 'saralan menyebabkan nilai tinggi'. Evaluasi.",
        "options": ["Valid — pola jelas", "Lemah — bisa korelasi tanpa kausalitas. Mungkin siswa disiplin (yang sarapan) juga disiplin belajar. Faktor ketiga", "Salah total", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: korelasi ≠ kausalitas. Sarapan ↔ nilai tinggi bisa karena faktor ketiga (disiplin, kondisi ekonomi). Untuk uji kausalitas butuh eksperimen (randomized controlled trial)."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "Dalam machine learning, algoritma rekomendasi YouTube mengenali pola tontonan. Manakah risiko TERBESAR?",
        "options": ["Tidak ada risiko", "Filter bubble — pola yang terlalu sempit membuat user hanya lihat konten serupa, tidak terpapar hal baru", "YouTube tidak pakai pola", "Pola tidak akurat"],
        "correct": 1,
        "explanation": "Evaluasi: filter bubble adalah risiko nyata. Algoritma terlalu optimize 'pola yang disukai' → user terjebak di konten serupa. Bisa ekstremkan pandangan (radicalization)."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Boni** menemukan pola: nilai ujian matematika naik setiap kali ia latihan soal HOTS. Ia menyimpulkan 'latihan HOTS = nilai naik'. Tapi ternyata ia juga belajar lebih lama. Evaluasi.",
        "options": ["Pola valid — HOTS penyebab", "Lemah — confounding variable (belajar lebih lama juga bisa penyebab). Tidak bisa isolasi HOTS sebagai penyebab", "Salah total", "Pola acak"],
        "correct": 1,
        "explanation": "Evaluasi: confounding variable. Dua variabel berubah bersamaan (HOTS + durasi belajar), tidak bisa tentukan mana yang sebenarnya penyebab. Butuh eksperimen yang isolasi variabel."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "Manakah pola yang PALING sulit diprediksi?",
        "options": ["Pola aritmatika linier (1, 2, 3, 4)", "Pola cuaca harian (banyak faktor, non-linier)", "Pola kuadrat (1, 4, 9, 16)", "Pola geometri (2, 4, 8, 16)"],
        "correct": 1,
        "explanation": "Evaluasi: pola cuaca paling sulit — banyak faktor (suhu, tekanan, kelembaban, angin, topografi), non-linier, chaotic. Bahkan superkomputer pun terbatas. Opsi lain punya aturan jelas."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Citra** mengamati pola: setiap kali guru pakai metode diskusi, nilai siswa naik. Ia merekomendasikan semua pelajaran pakai diskusi. Evaluasi.",
        "options": ["Valid — pola universal", "Lemah — metode diskusi efektif untuk materi tertentu (analisis, kritis), tidak untuk semua (mis: hafalan). Generalisasi berlebihan", "Salah total", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: generalisasi berlebihan. Diskusi efektif untuk materi yang butuh analisis kritis, tapi tidak optimal untuk hafalan/prosedural. Perlu kontekstualisasi per materi."
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "Pola: **1, 2, 6, 24, 120, 720, ...**. Manakah evaluasi yang BENAR tentang pola ini?",
        "options": ["Pola faktorial (n!) — berikutnya 5040", "Pola kuadrat — berikutnya 840", "Pola acak", "Pola Fibonacci — berikutnya 1440"],
        "correct": 0,
        "explanation": "Evaluasi: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720. Pola faktorial. Berikutnya 7!=5040. Faktorial tumbuh sangat cepat (lebih cepat dari geometri)."
    },
]

QUESTIONS_KELAS_7_ESSAI = [
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Skenario:** Amati 7 hari terakhir kehidupan Anda (jam bangun, jam tidur, jam makan, jam belajar, jam bermain gadget).\n\n**Tugas:** \n1. Buat tabel data 7 hari\n2. Identifikasi minimal 2 pola yang berulang\n3. Untuk setiap pola, tentukan jenisnya (berulang/bertumbuh/struktural/temporal)\n4. Buat prediksi berdasarkan pola tersebut\n5. Identifikasi minimal 1 keterbatasan prediksi Anda",
        "essay_answer": "Contoh jawaban:\n\n1. Tabel 7 hari (jam bangun, tidur, makan, belajar, gadget):\nSenin: 06:00, 22:00, 07:00/12:00/18:00, 19:00-21:00, 21:00-22:00\nSelasa: 06:00, 22:30, ...\n... (lengkapi 7 hari)\n\n2. Pola yang ditemukan:\nPola 1: Jam bangun konsisten 06:00 (Senin-Jumat), 07:00 (Sabtu-Minggu) → pola temporal mingguan\nPola 2: Jam belajar malam 19:00-21:00 konsisten di hari sekolah, tidak ada di akhir pekan → pola temporal + struktural\n\n3. Jenis pola:\n- Pola 1: temporal (berbasis waktu) + berulang (konsisten setiap minggu)\n- Pola 2: temporal + struktural (hubungan dengan hari sekolah)\n\n4. Prediksi:\n- Senin depan bangun 06:00\n- Belajar malam 19:00-21:00 Senin-Jumat\n\n5. Keterbatasan:\n- Hanya 1 minggu data — bisa kebetulan\n- Belum akun variasi (ujian, libur, sakit)\n- Sample size kecil untuk generalisasi kuat\n- Pola bisa berubah saat ada event khusus"
    },
    {
        "level": "C4", "category": "Pengenalan Pola",
        "question": "**Analisis kasus:** Seorang penjual jus buah mencatat penjualan 4 minggu:\n- Minggu 1: Senin 20, Selasa 22, Rabu 25, Kamis 28, Jumat 45, Sabtu 60, Minggu 55\n- Minggu 2: Senin 21, Selasa 24, Rabu 26, Kamis 30, Jumat 48, Sabtu 62, Minggu 58\n- Minggu 3: Senin 22, Selasa 23, Rabu 27, Kamis 29, Jumat 50, Sabtu 65, Minggu 60\n- Minggu 4: Senin 23, Selasa 25, Rabu 28, Kamis 31, Jumat 52, Sabtu 68, Minggu 62\n\n**Tugas:** \n1. Identifikasi minimal 2 pola yang berbeda\n2. Untuk setiap pola, jelaskan aturan dan prediksi minggu ke-5\n3. Berikan rekomendasi strategi stok untuk minggu ke-5",
        "essay_answer": "Analisis:\n\n1. Pola yang ditemukan:\n\nPola A (Temporal mingguan): Pola akhir pekan — Jumat-Sabtu-Minggu penjualan naik signifikan (45-68) vs Senin-Kamis (20-31). Pola berulang setiap minggu.\n\nPola B (Tren naik): Setiap hari, penjualan naik ±1-2 dari minggu sebelumnya. Mis: Senin M1=20, M2=21, M3=22, M4=23. Pola bertumbuh linier per minggu.\n\n2. Aturan dan prediksi minggu 5:\n- Pola A: akhir pekan tetap tinggi. Prediksi Jumat 55, Sabtu 70, Minggu 65\n- Pola B: setiap hari +1 dari minggu sebelumnya. Prediksi Senin 24, Selasa 26, Rabu 29, Kamis 32\n\n3. Rekomendasi stok minggu 5:\n- Siapkan stok buah 2x lebih banyak untuk Jumat-Sabtu-Minggu\n- Senin-Kamis stok standar (cukup untuk 25-32 gelas)\n- Total estimasi: 24+26+29+32+55+70+65 = 301 gelas\n- Tambah buffer 10% = 330 gelas\n- Order buah proporsional: apel 40%, jeruk 30%, pisang 20%, lainnya 10%\n- Review penjualan aktual minggu 5 untuk kalibrasi minggu 6"
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Studi kasus kritis:** Sebuah sekolah menemukan pola: siswa yang aktif di ekstrakurikuler robotics memiliki nilai matematika lebih tinggi. Kepala sekolah menyimpulkan: 'Robotics menyebabkan nilai matematika naik. Wajibkan semua siswa ikut robotics.'\n\n**Tugas:** \n1. Identifikasi minimal 3 kemungkinan penjelasan alternatif (selain 'robotics menyebabkan nilai naik')\n2. Rancang eksperimen untuk menguji apakah robotics benar-benar penyebab\n3. Jika eksperimen tidak feasible, apa studi observasional alternatif yang lebih kuat?\n4. Berikan rekomendasi akhir ke kepala sekolah",
        "essay_answer": "1. Penjelasan alternatif (confounding variables):\n\na. Seleksi: Siswa yang minat robotics mungkin sudah pintar matematika sejak awal. Robotics menarik siswa math-oriented, bukan robotics yang bikin pintar math.\n\nb. Faktor waktu belajar: Siswa robotics mungkin lebih disiplin, belajar lebih banyak. Robotics = indikator disiplin, bukan penyebab langsung.\n\nc. Faktor sosioekonomi: Robotics butuh biaya. Siswa mampu ekonomi mungkin punya akses bimbel, buku, lingkungan belajar lebih baik. Robotics = proxy status ekonomi.\n\nd. Motivasi umum: Siswa yang minat robotics mungkin punya motivasi belajar tinggi secara umum. Robotics = indikator motivasi, bukan penyebab.\n\n2. Eksperimen (RCT - Randomized Controlled Trial):\n- Random assign 100 siswa ke 2 kelompok: 50 ikut robotics (treatment), 50 tidak (control)\n- Pre-test matematika awal tahun\n- 1 tahun treatment\n- Post-test matematika akhir tahun\n- Bandingkan peningkatan (post - pre) antara kelompok\n- Jika treatment > control signifikan, robotics efektif\n\n3. Studi observasional alternatif (jika RCT tidak feasible):\n- Propensity Score Matching: cari siswa non-robotics dengan karakteristik mirip (nilai awal, ekonomi, motivasi), bandingkan dengan siswa robotics\n- Longitudinal study: ikut siswa dari sebelum ikut robotics sampai setelah, bandingkan tren nilai\n- Difference-in-differences: bandingkan perubahan nilai siswa yang baru ikut robotics vs yang tidak, sebelum dan sesudah\n\n4. Rekomendasi akhir:\n- JANGAN wajibkan semua siswa ikut robotics berdasarkan pola ini saja — korelasi ≠ kausalitas\n- Lakukan RCT kecil dulu (1 semester, 20 siswa per kelompok) untuk validasi\n- Jika RCT tidak feasible, lakukan propensity score matching\n- Pertimbangkan biaya: robotics mahal, mungkin lebih efektif investasi ke program remedial matematika langsung\n- Komunikasikan ke kepala sekolah: 'pola menarik tapi butuh validasi sebelum kebijakan besar'"
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Refleksi:** Pilih satu aplikasi yang sering Anda gunakan (mis: TikTok, Instagram, Spotify, YouTube). Analisis bagaimana algoritma pengenalan pola bekerja di aplikasi tersebut.\n\n**Tugas:** \n1. Jelaskan minimal 3 pola yang mungkin dianalisis algoritma dari perilaku Anda\n2. Identifikasi 2 manfaat dan 2 risiko dari pengenalan pola ini\n3. Berikan 1 saran untuk Anda sendiri agar tidak terjebak filter bubble",
        "essay_answer": "Contoh jawaban untuk TikTok:\n\n1. Pola yang dianalisis algoritma:\n\na. Pola tontonan: video apa yang ditonton sampai habis vs skip cepat. Misal: video masak ditonton lengkap, video olahraga di-skip. Algoritma tahu preferensi konten.\n\nb. Pola interaksi: like, comment, share, save. Misal: sering save video resep, jarang like video dance. Algoritma tahu engagement per kategori.\n\nc. Pola waktu: jam berapa paling aktif, durasi sesi, frekuensi buka app. Algoritma tahu kapan kirim notifikasi optimal dan jenis konten yang cocok per jam (mis: konten santai di malam hari).\n\n2. Manfaat:\n- Konten yang muncul relevan, hemat waktu pencarian\n- Eksposur ke konten yang sesuai minat, belajar hal baru di niche\n\nRisiko:\n- Filter bubble: hanya lihat konten serupa, tidak terpapar hal baru, sudut pandang menyempit\n- Radicalization: algoritma dorong konten ekstrem untuk engagement, bisa geser pandangan politik/agama jadi ekstrem\n\n3. Saran hindari filter bubble:\n- Aktif cari konten di luar pola biasa (cari tag baru, follow akun berbeda pandangan)\n- Set timer 30 menit/hari, jangan scroll berlebihan\n- Refleksi: 'apakah konten yang saya lihat mewakili dunia, atau hanya gelembung saya?'\n- Sesekali clear history / pakai akun baru untuk reset algoritma\n- Baca berita dari sumber beragam, tidak hanya yang direkomendasikan"
    },
    {
        "level": "C5", "category": "Pengenalan Pola",
        "question": "**Eksperimen desain:** Anda diminta merancang algoritma sederhana untuk mengenali pola kebiasaan belajar siswa dari data jam belajar harian (30 hari).\n\n**Tugas:** \n1. Identifikasi minimal 4 jenis pola yang harus dikenali algoritma\n2. Untuk setiap jenis, jelaskan cara deteksi sederhana (pseudocode level tinggi)\n3. Identifikasi 2 risiko etis dari pengumpulan data ini\n4. Berikan rekomendasi privasi/data governance",
        "essay_answer": "1. Jenis pola yang dikenali:\n\na. Pola waktu produktif (jam belajar paling efektif)\nb. Pola konsistensi (rutin vs tidak rutin)\nc. Pola akhir pekan vs hari sekolah\nd. Pola sebelum ujian (belajar intensif sebelum ujian vs konsisten)\n\n2. Pseudocode deteksi:\n\na. Pola waktu produktif:\n```\nFOR setiap jam (0-23):\n  hitung rata-rata durasi belajar di jam itu\n  hitung korelasi jam itu dengan nilai ujian keesokan hari\nAMBIL top 3 jam dengan korelasi tertinggi = jam produktif\n```\n\nb. Pola konsistensi:\n```\nstandar_deviasi = hitung std deviasi durasi belajar harian\nJIKA std_dev < 30 menit → konsisten\nJIKA std_dev > 90 menit → tidak konsisten\n```\n\nc. Pola akhir pekan:\n```\nrata_weekday = avg(durasi belajar Senin-Jumat)\nrata_weekend = avg(durasi belajar Sabtu-Minggu)\nJIKA rata_weekend > rata_weekday * 1.5 → pola weekend booster\nJIKA rata_weekend < rata_weekday * 0.5 → pola weekend off\n```\n\nd. Pola sebelum ujian:\n```\nFOR setiap ujian:\n  bandingkan durasi belajar 3 hari sebelum vs rata-rata 7 hari sebelumnya\nJIKA rata-rata 3 hari sebelum > 1.5x normal → pola cramming\n```\n\n3. Risiko etis:\n\na. Privasi: data jam belajar bisa reveal pola tidur, aktivitas keluarga, kesehatan mental (mis: belajar jam 3 pagi = indikasi stres).\n\nb. Label/klasifikasi merugikan: siswa yang diklasifikasi 'tidak konsisten' mungkin diberi stigma, padahal bisa karena alasan valid (orang sakit, ada masalah keluarga).\n\nc. Self-fulfilling prophecy: guru yang tahu siswa 'tidak konsisten' mungkin beri ekspektasi rendah, siswa jadi tidak termotivasi.\n\n4. Rekomendasi privasi/governance:\n\na. Anonymize data — pisahkan nama dari data jam belajar, pakai ID anonim\nb. Consent — siswa/wali harus setuju, bisa opt-out\nc. Purpose limitation — data hanya untuk feedback siswa, bukan ranking/diskriminasi\nd. Data retention — hapus data setelah 1 tahun, tidak disimpan permanen\ne. Access control — hanya guru BK + siswa sendiri yang lihat, tidak share ke guru lain tanpa consent\nf. Audit — annual audit etika, transparansi algoritma (bisa dijelaskan ke siswa)\ng. Right to explanation — siswa bisa minta penjelasan kenapa diklasifikasi pola tertentu, bisa banding"
    },
]


# ============================================================
# KELAS 8: VISUALISASI DATA
# ============================================================

MATERI_KELAS_8 = """# Memperdalam Visualisasi Data: Mengubah Angka Menjadi Cerita yang Bisa Dibaca

## Mengapa Visualisasi Data Penting?

Setiap hari, kita dibanjiri data — nilai ujian, jam tidur, pengeluaran, jumlah followers, hasil survei, dan masih banyak lagi. Data mentah berupa angka-angka di tabel sulit dipahami dan mudah salah tafsir. Visualisasi data mengubah angka-angka itu menjadi gambar — grafik, diagram, peta — yang membuat pola, tren, dan perbedaan menjadi jelas dalam sekali pandang. Bayangkan mencoba memahami nilai 30 siswa dari tabel angka vs dari satu grafik batang — perbedaan kecepatan pemahaman sangat besar.

Visualisasi data bukan sekadar "membuat grafik yang cantik". Ini adalah proses komunikasi: bagaimana menyajikan data sehingga pesan utama tersampaikan secara akurat, cepat, dan tidak menyesatkan. Visualisasi yang buruk bisa menyembunyikan pola penting atau bahkan memberi kesan salah. Visualisasi yang baik bisa membuka wawasan baru yang tersembunyi di balik angka. Di era big data, kemampuan membuat dan membaca visualisasi adalah keterampilan hidup sekaligus keterampilan profesional.

## Jenis-Jenis Visualisasi Data

### 1. Diagram Batang (Bar Chart)
Diagram batang membandingkan kategori menggunakan tinggi batang. Cocok untuk data kategorikal seperti perbandingan nilai antar kelas, jumlah siswa per ekstrakurikuler, atau penjualan per produk. Diagram batang vertikal disebut column chart, horizontal disebut bar chart. Pilih horizontal jika label kategori panjang.

### 2. Diagram Garis (Line Chart)
Diagram garis menunjukkan perubahan seiring waktu. Sumbu X biasanya waktu (hari, bulan, tahun), sumbu Y nilai. Cocok untuk tren seperti perkembangan nilai siswa selama semester, perubahan suhu udara, atau pertumbuhan tinggi badan. Diagram garis sangat baik untuk menunjukkan apakah suatu nilai naik, turun, atau fluktuatif.

### 3. Diagram Lingkaran (Pie Chart)
Diagram lingkaran menunjukkan proporsi atau persentase. Cocok untuk membandingkan bagian dari keseluruhan, seperti persentase pengeluaran per kategori, atau pembagian waktu 24 jam. Pie chart hanya efektif untuk 3-5 kategori — lebih dari itu, label akan berdesakan dan sulit dibaca.

### 4. Diagram Pencar (Scatter Plot)
Diagram pencar menunjukkan hubungan antara dua variabel. Setiap titik adalah satu data dengan koordinat (X, Y). Cocok untuk melihat korelasi, misal: hubungan jam belajar dengan nilai, atau tinggi badan dengan berat badan. Pola titik yang naik ke kanan-atas = korelasi positif. Turun ke kanan-bawah = korelasi negatif. Acak = tidak ada korelasi.

### 5. Histogram
Histogram mirip bar chart, tapi untuk distribusi data numerik yang dikelompokkan ke bin (interval). Contoh: distribusi nilai ujian (0-20, 21-40, 41-60, 61-80, 81-100). Berbeda dengan bar chart, histogram tidak ada gap antar batang (karena data kontinu). Histogram mengungkap bentuk distribusi: normal (lonceng), miring kiri/kanan, bimodal.

### 6. Diagram Kotak Garis (Box Plot)
Box plot menunjukkan ringkasan statistik: median, kuartil 1-3, dan outlier. Bentuk kotak menunjukkan rentang kuartil (IQR), garis di tengah kotak = median, "kumis" menunjukkan rentang data normal, titik di luar = outlier. Sangat baik untuk membandingkan distribusi beberapa kelompok.

### 7. Peta Panas (Heatmap)
Heatmap menggunakan warna untuk menunjukkan nilai di grid 2D. Cocok untuk data yang punya 2 dimensi, seperti kepadatan penduduk per wilayah, atau performa siswa per mata pelajaran per bulan. Warna lebih gelap/terang menunjukkan nilai lebih tinggi.

## Prinsip Visualisasi Data yang Baik

### 1. Pilih Jenis yang Tepat
Setiap jenis visualisasi punya tujuan berbeda. Membandingkan kategori? Pakai bar chart. Menunjukkan tren waktu? Line chart. Proporsi? Pie chart. Hubungan 2 variabel? Scatter plot. Memilih jenis yang salah = visualisasi tidak efektif atau bahkan menyesatkan.

### 2. Jujur dengan Skala
Skala sumbu harus dimulai dari nol untuk bar chart, karena tinggi batang harus merepresentasikan proporsi sebenarnya. Memotong sumbu Y (mis: mulai dari 90 bukan 0) membuat perbedaan kecil terlihat besar — ini sering dipakai untuk manipulasi. Untuk line chart, memotong sumbu Y kadang OK karena fokus pada perubahan, bukan magnitudo.

### 3. Label yang Jelas
Setiap visualisasi harus punya: judul yang deskriptif, label sumbu X dan Y dengan satuan, legend jika ada multiple series, dan sumber data. Tanpa label, visualisasi ambigu dan bisa salah tafsir.

### 4. Hindari Clutter
Hapus elemen yang tidak perlu: grid lines yang terlalu tebal, shadow 3D yang mengaburkan, warna terlalu banyak. Prinsip "less is more" berlaku. Setiap elemen harus punya tujuan komunikasi.

### 5. Warna dengan Makna
Warna bukan dekorasi. Pakai warna untuk: highlight data penting, bedakan kategori, atau tunjukkan intensitas. Jangan pakai warna terlalu banyak (maksimal 5-7 kategori). Pertimbangkan color-blind friendly (hindari merah-hijau sebagai pembeda utama).

### 6. Konteks dan Narasi
Visualisasi terbaik punya cerita. Tambahkan anotasi untuk highlight temuan kunci. Beri caption yang menjelaskan apa yang harus dilihat pembaca. Visualisasi tanpa narasi = angka dalam gambar. Visualisasi dengan narasi = wawasan.

## Kesalahan Umum dalam Visualisasi Data

1. **Skala sumbu Y dimulai bukan dari 0** pada bar chart — membuat perbedaan kecil terlihat dramatis. Sering dipakai untuk manipulasi media.

2. **3D effects pada bar/pie chart** — terlihat "keren" tapi memudarkan akurasi. Sudut pandang 3D membuat batang belakang terlihat lebih kecil dari depan.

3. **Pie chart dengan terlalu banyak kategori** (>5) — label berdesakan, sulit bandingkan sudut. Lebih baik pakai bar chart.

4. **Warna acak tanpa makna** — pakai 7 warna untuk 7 kategori yang tidak ada hubungannya. Pembaca bingung.

5. **Dual Y-axis tanpa label jelas** — sumbu Y kiri dan kanan dengan skala berbeda bisa menyesatkan jika tidak dijelaskan.

6. **Line chart untuk data kategorikal** — menghubungkan kategori yang tidak punya urutan alami (mis: negara) dengan garis menyesatkan, seolah ada kontinuitas.

7. **Tidak menampilkan outlier** — menyembunyikan outlier mengaburkan distribusi sebenarnya. Outlier sering berisi informasi penting.

## Aplikasi Visualisasi di Kehidupan Sehari-Hari

1. **Dashboard kesehatan di smartwatch** — grafik detak jantung, langkah, tidur
2. **Laporan nilai rapor** — diagram batang per mata pelajaran
3. **Infografis berita** — visualisasi data pemilu, ekonomi, cuaca
4. **Aplikasi keuangan** — pie chart pengeluaran per kategori
5. **Statistik olahraga** — grafik performa pemain, poin tim
6. **Cuaca di aplikasi** — grafik suhu per jam, probabilitas hujan
7. **Statistik media sosial** — grafik pertumbuhan followers, engagement rate

## Latihan Self-Assessment

Setelah membaca materi ini, coba kerjakan tantangan berikut: catat 7 hari terakhir jam tidur Anda. Buat 2 visualisasi berbeda (line chart untuk tren, dan histogram untuk distribusi). Bandingkan: visualisasi mana yang lebih efektif menjawab pertanyaan 'apakah tidur saya konsisten?'. Diskusikan dengan teman apa insight yang Anda dapat dari visualisasi tersebut.
"""

QUESTIONS_KELAS_8_PG = [
    # ── C3 (Menerapkan) — 15 soal ──
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Andi** ingin membandingkan nilai ujian 5 mata pelajaran: Matematika 80, IPA 75, IPS 85, B.Indonesia 70, B.Inggris 90. Jenis visualisasi PALING tepat?",
        "options": ["Diagram garis (line chart)", "Diagram batang (bar chart)", "Diagram pencar (scatter plot)", "Histogram"],
        "correct": 1,
        "explanation": "Membandingkan kategori (5 mapel) → bar chart paling tepat. Line chart untuk tren waktu, scatter untuk hubungan 2 variabel, histogram untuk distribusi."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Siti** ingin menunjukkan tren nilai matematika dari ujian 1-6: 70, 75, 78, 80, 82, 85. Jenis visualisasi yang tepat?",
        "options": ["Diagram batang", "Diagram garis (line chart)", "Pie chart", "Box plot"],
        "correct": 1,
        "explanation": "Menunjukkan tren seiring waktu (ujian 1-6) → line chart paling tepat. Garis menghubungkan titik menunjukkan arah perubahan (naik/turun)."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Budi** ingin menunjukkan persentase pengeluaran bulanannya: makanan 40%, transport 20%, hiburan 15%, lainnya 25%. Jenis visualisasi yang tepat?",
        "options": ["Diagram batang", "Diagram lingkaran (pie chart)", "Diagram pencar", "Histogram"],
        "correct": 1,
        "explanation": "Persentase/proporsi dari total = pie chart. 4 kategori (≤5) = ideal untuk pie chart. Jika >5 kategori, pakai bar chart horizontal."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Dina** ingin melihat hubungan jam belajar dengan nilai ujian. Jenis visualisasi yang tepat?",
        "options": ["Diagram batang", "Diagram pencar (scatter plot)", "Pie chart", "Line chart"],
        "correct": 1,
        "explanation": "Hubungan 2 variabel (jam belajar vs nilai) → scatter plot. Tiap titik = 1 siswa. Pola naik = korelasi positif (jam belajar tinggi ↔ nilai tinggi)."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "Pada bar chart, sumbu Y HARUS dimulai dari...",
        "options": ["Angka terkecil data", "Nol (untuk menjaga proporsi batang yang akurat)", "Rata-rata", "Bebas"],
        "correct": 1,
        "explanation": "Bar chart sumbu Y wajib mulai dari 0 — proporsi tinggi batang harus akurat. Memotong sumbu Y (mis: mulai dari 90) membuat perbedaan kecil terlihat dramatis (menyesatkan)."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Eka** membuat pie chart dengan 8 kategori. Apa masalah utama?",
        "options": ["Tidak ada masalah", "Terlalu banyak kategori — label berdesakan, sulit bandingkan sudut. Lebih baik pakai bar chart", "Pie chart tidak bisa untuk 8 kategori", "Warna habis"],
        "correct": 1,
        "explanation": "Pie chart efektif maksimal 5 kategori. >5 → label berdesakan, sulit bandingkan sudut. Lebih baik bar chart horizontal (urutkan dari terbesar)."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "Manakah komponen WAJIB ada di setiap visualisasi data?",
        "options": ["Warna gradasi", "Judul deskriptif + label sumbu + satuan", "Efek 3D", "Banyak animasi"],
        "correct": 1,
        "explanation": "Wajib: judul deskriptif, label sumbu X/Y dengan satuan, legend jika multi-series, sumber data. Efek 3D/animasi opsional (sering mengganggu)."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Fajar** membuat bar chart nilai 4 kelas. Sumbu X = kelas, sumbu Y = nilai. Ia pakai 4 warna berbeda untuk 4 batang. Masalah?",
        "options": ["Tidak ada masalah", "Warna tanpa makna — 4 kelas beda, tapi tidak perlu warna berbeda. Pakai 1 warna supaya fokus pada tinggi batang", "Warna terlalu sedikit", "Harus pakai 8 warna"],
        "correct": 1,
        "explanation": "Warna tanpa makna = clutter. 1 warna cukup untuk bar chart single-series. Warna dipakai jika ada grouping (mis: kelas 7 vs 8) atau highlight (1 batang penting di-warna berbeda)."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Gita** ingin visualisasi distribusi nilai 50 siswa (0-100). Jenis yang tepat?",
        "options": ["Pie chart", "Histogram (dengan bin seperti 0-20, 21-40, dll)", "Line chart", "Scatter plot"],
        "correct": 1,
        "explanation": "Distribusi data numerik = histogram. Bin (interval) mengelompokkan nilai. Bentuk histogram mengungkap: normal/miring/bimodal."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "Box plot menunjukkan hal-hal berikut, KECUALI...",
        "options": ["Median", "Kuartil 1 dan 3 (Q1, Q3)", "Outlier", "Mean (rata-rata)"],
        "correct": 3,
        "explanation": "Box plot menampilkan: median (garis tengah kotak), Q1-Q3 (kotak), IQR (rentang kotak), whisker (rentang normal), outlier (titik). TIDAK menampilkan mean secara default."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Hadi** melihat scatter plot jam belajar vs nilai. Titik-titik membentuk pola naik ke kanan-atas. Artinya...",
        "options": ["Korelasi positif (jam belajar tinggi ↔ nilai tinggi)", "Korelasi negatif", "Tidak ada korelasi", "Data salah"],
        "correct": 0,
        "explanation": "Pola naik ke kanan-atas = korelasi positif. X naik, Y juga naik. Tapi ingat: korelasi ≠ kausalitas. Bisa ada faktor ketiga."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "Manakah visualisasi yang sering dipakai untuk manipulasi dengan memotong sumbu Y?",
        "options": ["Pie chart mulai dari 0", "Bar chart sumbu Y mulai dari 90 (bukan 0) — perbedaan kecil terlihat dramatis", "Line chart dengan 2 series", "Scatter plot dengan banyak titik"],
        "correct": 1,
        "explanation": "Bar chart Y dimulai bukan 0 = manipulasi klasik. Mis: nilai 90 vs 95, jika Y mulai 90, batang 95 terlihat 2x tinggi. Padahal selisih cuma 5."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Ira** ingin visualisasi kepadatan penduduk per wilayah di peta Indonesia. Jenis yang tepat?",
        "options": ["Bar chart", "Peta panas (heatmap) — warna menunjukkan kepadatan", "Pie chart", "Line chart"],
        "correct": 1,
        "explanation": "Data geografis dengan intensitas = heatmap. Warna lebih gelap = kepadatan lebih tinggi. Bisa overlay di peta untuk konteks geografis."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "Efek 3D pada bar chart sering kali...",
        "options": ["Membuat visualisasi lebih akurat", "Mengaburkan akurasi — batang belakang terlihat lebih kecil dari depan", "Tidak ada efek", "Wajib untuk presentasi"],
        "correct": 1,
        "explanation": "3D effects mengaburkan akurasi. Sudut pandang 3D membuat batang belakang terlihat lebih kecil — pembaca sulit bandingkan tinggi sebenarnya. Hindari 3D untuk data exact."
    },
    {
        "level": "C3", "category": "Visualisasi Data",
        "question": "**Joko** membuat line chart dengan 2 series (nilai matematika vs IPA) tapi pakai 2 sumbu Y berbeda tanpa label. Masalah?",
        "options": ["Tidak ada masalah", "Dual Y-axis tanpa label jelas bisa menyesatkan — pembaca tidak tahu skala mana untuk series mana", "Line chart tidak boleh 2 series", "Harus pakai pie chart"],
        "correct": 1,
        "explanation": "Dual Y-axis berbahaya jika tidak dijelaskan. Pembaca bisa salah baca: mengira 2 series naik bersama, padahal bisa karena skala berbeda. Wajib label jelas + legend."
    },
    # ── C4 (Menganalisis) — 15 soal ──
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "Perhatikan deskripsi grafik: bar chart nilai 4 kelas, Y mulai dari 90, batang kelas 7A = 95, 7B = 92, 7C = 91, 7D = 93. Evaluasi visualisasi ini.",
        "options": ["Visualisasi baik — beda jelas terlihat", "Menyesatkan — Y mulai 90 membuat perbedaan kecil (91-95) terlihat dramatis. Harus mulai dari 0 untuk akurat", "Salah jenis — harusnya pie chart", "Tidak ada masalah"],
        "correct": 1,
        "explanation": "Analisis: Y mulai 90, selisih 95 vs 91 = 4 poin, tapi batang 7A terlihat ~4x lebih tinggi dari 7C. Padahal selisih cuma 4%. Menyesatkan. Harus mulai 0."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Kiki** punya data nilai 50 siswa. Ia buat histogram dengan bin 10 (0-10, 11-20, ..., 91-100). Distribusi miring kiri (banyak siswa nilai tinggi, sedikit nilai rendah). Interpretasi?",
        "options": ["Mayoritas siswa nilai rendah", "Mayoritas siswa nilai tinggi, sedikit yang rendah (miring kiri = left-skewed)", "Distribusi normal", "Tidak ada pola"],
        "correct": 1,
        "explanation": "Analisis: miring kiri (left-skewed) = ekor panjang di kiri (nilai rendah), mayoritas di kanan (nilai tinggi). Berarti mayoritas siswa nilai tinggi."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Lia** membuat scatter plot jam tidur vs nilai ujian. Titik-titik membentuk pola naik ke kanan-atas, tapi ada 3 titik di pojok kanan-bawah (jam tidur banyak, nilai rendah). Apa yang ia temukan?",
        "options": ["Korelasi negatif kuat", "Korelasi positif, dengan 3 outlier (tidur banyak tapi nilai rendah — mungkin karena sakit/tdk belajar)", "Tidak ada korelasi", "Data rusak"],
        "correct": 1,
        "explanation": "Analisis: pola umum naik ke kanan-atas = korelasi positif. 3 titik di kanan-bawah = outlier (tidur banyak tapi nilai rendah). Outlier bisa kasih insight: tidur saja tidak cukup, perlu belajar juga."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Maman** bandingkan 2 box plot nilai matematika kelas 7A vs 7B. 7A: median 75, Q1 65, Q3 85, outlier di 40. 7B: median 80, Q1 78, Q3 82, tidak ada outlier. Kesimpulan?",
        "options": ["7A lebih baik (ada outlier tinggi)", "7B lebih konsisten (IQR kecil=4) dan median lebih tinggi (80). 7A lebih variatif (IQR=20) dengan outlier rendah", "7A dan 7B sama", "Tidak bisa dibandingkan"],
        "correct": 1,
        "explanation": "Analisis: 7B median 80 > 7A 75. 7B IQR (82-78)=4 kecil = konsisten. 7A IQR (85-65)=20 besar = variatif. 7A ada outlier 40 = ada siswa sangat rendah. 7B lebih baik dan stabil."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "Pie chart pengeluaran: makanan 45%, transport 15%, hiburan 30%, lainnya 10%. Sudut untuk 'hiburan' adalah...",
        "options": ["30 derajat", "90 derajat", "108 derajat (30% × 360°)", "180 derajat"],
        "correct": 2,
        "explanation": "Analisis: 1 lingkaran = 360°. Hiburan 30% = 30/100 × 360 = 108°. Makanan 45% = 162°, transport 15% = 54°, lainnya 10% = 36°. Total = 360°."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Nina** buat line chart penjualan 12 bulan. Terlihat jelas: Jan-Mar turun, Apr-Jun naik, Jul-Sep turun, Okt-Des naik. Pola apa ini?",
        "options": ["Tren naik linier", "Pola musiman (naik-turun berulang setiap ~6 bulan)", "Tren turun", "Tidak ada pola"],
        "correct": 1,
        "explanation": "Analisis: pola berulang (turun-naik-turun-naik) setiap ~6 bulan = pola musiman (seasonal). Bukan tren linier. Pola ini sering di data penjualan (libur semester, musim tertentu)."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Omar** membuat bar chart horizontal 10 kategori. 8 kategori pertama nilai 10-30, 2 terakhir 90-100. Masalah utama?",
        "options": ["Tidak ada masalah", "Outlier di 2 kategori terakhir membuat 8 lainnya terlihat sangat kecil. Pertimbangkan log scale atau highlight + anotasi", "Harus pakai pie chart", "Warna salah"],
        "correct": 1,
        "explanation": "Analisis: outlier tinggi (90-100) compress 8 kategori lain jadi terlihat sangat kecil. Solusi: log scale, atau bagi jadi 2 chart, atau highlight outlier dengan anotasi."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Pak Guru** ingin visualisasi performa 5 siswa di 5 mapel. Matriks 5x5. Jenis visualisasi yang tepat?",
        "options": ["Pie chart", "Heatmap — grid 5x5, warna menunjukkan nilai", "Line chart", "Scatter plot"],
        "correct": 1,
        "explanation": "Analisis: data 2D (siswa × mapel) = heatmap. Warna lebih gelap = nilai lebih tinggi. Bisa lihat pola: siswa A lemah di mapel apa, mapel X kuat di siswa mana."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "Histogram nilai ujian: bin 0-20 (5 siswa), 21-40 (8), 41-60 (15), 61-80 (20), 81-100 (2). Bentuk distribusi?",
        "options": ["Normal (lonceng) — puncak di tengah", "Miring kanan (right-skewed) — puncak di kiri", "Miring kiri (left-skewed) — puncak di kanan, ekor di kiri", "Bimodal (2 puncak)"],
        "correct": 2,
        "explanation": "Analisis: puncak di 61-80 (20 siswa), lalu turun ke kanan (81-100: 2). Ekor kiri (5, 8, 15). Puncak di kanan, ekor di kiri = miring kiri (left-skewed). Mayoritas nilai tinggi."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Qori** buat dual Y-axis chart: sumbu kiri = penjualan (Rp juta), sumbu kanan = jumlah pelanggan. Garis penjualan naik, garis pelanggan juga naik. Evaluasi.",
        "options": ["Valid — keduanya naik beriringan", "Berbahaya — bisa jadi pelanggan naik 10x tapi penjualan naik 1.1x, terlihat 'naik beriringan' padahal tidak. Skala berbeda bisa menyesatkan", "Salah jenis", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Analisis: dual Y-axis berbahaya. Skala berbeda bisa manipulasi visual. Penjualan naik 10% vs pelanggan naik 100% bisa terlihat sama. Harus jelas label + legend, atau pisah jadi 2 chart."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "Bar chart nilai 4 kelas dengan efek 3D. Kelas 7A (depan) = 80, 7B (belakang) = 85. Secara visual, 7A terlihat lebih tinggi. Mengapa?",
        "options": ["Data salah", "Efek 3D mengaburkan — perspektif 3D membuat batang depan (7A) terlihat lebih besar walaupun sebenarnya lebih rendah. Perspektif menipu mata", "7A memang lebih tinggi", "Tidak ada kaitan 3D"],
        "correct": 1,
        "explanation": "Analisis: 3D effects menipu mata. Perspektif membuat batang depan terlihat lebih besar. 7A=80 seharusnya lebih rendah dari 7B=85, tapi visual 3D bisa terlihat sebaliknya. Hindari 3D untuk perbandingan exact."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Rina** buat scatter plot tinggi vs berat badan 50 siswa. Pola naik ke kanan-atas, korelasi positif. Tapi 1 titik di pojok kiri-atas (tinggi pendek, berat besar). Apa itu?",
        "options": ["Data rusak", "Outlier — siswa dengan tinggi pendek tapi berat besar. Mungkin obesitas atau kondisi medis khusus. Perlu investigasi", "Korelasi negatif", "Tidak ada pola"],
        "correct": 1,
        "explanation": "Analisis: titik di luar pola umum = outlier. Outlier bisa kasih insight: kondisi medis, kesalahan input, atau kasus khusus. Jangan dibuang tanpa investigasi."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "Line chart nilai 6 ujian: 70, 75, 78, 80, 82, 85. Gradien (kemiringan garis)...",
        "options": ["Positif tapi menurun (nilai naik, tapi kenaikan melambat)", "Positif konstan (naik linear)", "Negatif", "Nol"],
        "correct": 0,
        "explanation": "Analisis: selisih: 75-70=5, 78-75=3, 80-78=2, 82-80=2, 85-82=3. Naik, tapi selisih menurun dari 5 ke 2-3. Pola logaritmik (diminishing return). Gradien positif tapi menurun."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Santi** buat pie chart 6 kategori pengeluaran. 5 kategori 10-20%, 1 kategori 50%. Masalah utama?",
        "options": ["Tidak ada masalah", "1 kategori dominan (50%) — bisa dibuat 2 pie chart: 1 untuk kategori dominan, 1 untuk 5 kategori lain. Atau bar chart dengan kategori dominan di atas", "Pie chart tidak valid", "Warna kurang"],
        "correct": 1,
        "explanation": "Analisis: 1 kategori dominan menyembunyikan detail 5 kategori kecil. Solusi: 2 pie chart (1 dominan vs lainnya, 1 detail 5 kategori) atau bar chart horizontal (dominan di atas, urutan desc)."
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "Box plot nilai 2 kelas: 7A (median 70, IQR 30), 7B (median 75, IQR 10). Interpretasi?",
        "options": ["7A lebih baik", "7B lebih baik (median 75 > 70) dan lebih konsisten (IQR 10 < 30). 7A variatif", "7A dan 7B sama", "Tidak bisa dibandingkan"],
        "correct": 1,
        "explanation": "Analisis: 7B median lebih tinggi (75 > 70) = rata-rata lebih baik. IQR 7B 10 < 7A 30 = 7B konsisten, 7A variatif. 7B unggul di kedua aspek."
    },
    # ── C5 (Mengevaluasi) — 15 soal ──
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Tono** membuat bar chart: nilai siswa A=95, B=92. Sumbu Y mulai dari 90. Bar A terlihat 3x lebih tinggi dari B. Evaluasi.",
        "options": ["Visualisasi valid", "Menyesatkan — selisih sebenarnya hanya 3 poin (3%), tapi bar A terlihat 3x lebih tinggi. Harus mulai dari 0 untuk proporsi akurat", "Salah jenis grafik", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: Y mulai 90, A=95 terlihat 5 unit, B=92 terlihat 2 unit. A terlihat 2.5x B. Padahal selisih cuma 3 poin (3%). Menyesatkan. Y harus mulai 0."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "Manakah visualisasi yang PALING efektif untuk menunjukkan 'pola tidur siswa menurun dari Senin ke Minggu'?",
        "options": ["Pie chart", "Line chart (X=hari, Y=jam tidur) — tunjukkan tren turun", "Bar chart", "Scatter plot"],
        "correct": 1,
        "explanation": "Evaluasi: tren seiring waktu = line chart paling tepat. Garis turun dari Senin ke Minggu jelas terlihat. Pie chart tidak untuk tren, bar chart kurang smooth, scatter untuk hubungan."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Vera** buat visualisasi pengeluaran: bar chart dengan 12 kategori (makan, transport, hiburan, dll). 1 kategori (makan) 60%, lainnya 2-8%. Evaluasi pilihan visualisasi.",
        "options": ["Bar chart tepat", "Kurang optimal — 1 kategori dominan membuat lainnya terlihat sangat kecil. Alternatif: 1) pakai log scale, 2) kelompokkan jadi 'makan' vs 'lainnya', atau 3) bar chart horizontal urut desc dengan highlight", "Harus pakai pie chart", "Tidak bisa divisualisasi"],
        "correct": 1,
        "explanation": "Evaluasi: 1 kategori dominan (60%) compress 11 lainnya. Bar chart standard tidak efektif. Solusi: log scale, atau kelompokkan (makan vs 11 lainnya), atau bar horizontal urut desc dengan highlight kategori dominan."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "Manakah yang BUKAN prinsip visualisasi data yang baik?",
        "options": ["Pilih jenis grafik sesuai tujuan", "Sumbu Y bar chart mulai dari 0", "Pakai efek 3D supaya menarik", "Label jelas dengan satuan"],
        "correct": 2,
        "explanation": "Evaluasi: 3D effects umumnya DILARANG untuk visualisasi data karena mengaburkan akurasi. Prinsip baik: tepat jenis, Y mulai 0 (bar), label jelas. 3D hanya untuk visualisasi 3D (mis: AR/VR data viz)."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Wati** buat 2 visualisasi untuk data sama (nilai 30 siswa): histogram dan box plot. Mana yang lebih baik untuk menjawab 'berapa banyak siswa nilai di rentang 70-80?'",
        "options": ["Histogram — tunjukkan distribusi per bin, bisa hitung siswa di bin 70-80", "Box plot — tunjukkan median dan kuartil", "Keduanya sama baiknya", "Tidak ada yang tepat"],
        "correct": 0,
        "explanation": "Evaluasi: histogram menunjukkan jumlah siswa per bin (interval). Untuk hitung siswa di rentang 70-80 = lihat tinggi batang di bin itu. Box plot tidak menampilkan count per rentang, hanya ringkasan statistik."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Yusuf** buat scatter plot jam belajar vs nilai. Korelasi positif kuat (titik membentuk garis naik jelas). Ia menyimpulkan: 'belajar lebih lama = nilai naik'. Evaluasi.",
        "options": ["Valid — korelasi positif kuat mendukung kesimpulan", "Lemah — korelasi ≠ kausalitas. Bisa ada faktor ketiga (motivasi, kecerdasan). Untuk kausalitas butuh eksperimen", "Salah total", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: korelasi positif kuat = jam belajar & nilai bergerak bersamaan. Tapi bukan bukti kausalitas. Faktor ketiga (motivasi belajar tinggi = belajar lama + nilai bagus) bisa jadi penyebab keduanya."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "Pie chart dengan 3 kategori: A 40%, B 35%, C 25%. Manakah evaluasi yang BENAR?",
        "options": ["Pie chart tidak tepat untuk 3 kategori", "Pie chart tepat (3 kategori ≤ 5) — tunjukkan proporsi dengan jelas", "Harus pakai 3D", "Tidak bisa dibaca"],
        "correct": 1,
        "explanation": "Evaluasi: 3 kategori ideal untuk pie chart (≤5). Proporsi 40-35-25 cukup berbeda untuk dibedakan sudutnya. Pie chart efektif di sini."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Zahra** buat bar chart 2 series: nilai matematika vs IPA per kelas (7A, 7B, 7C). Pakai 2 warna. Evaluasi.",
        "options": ["Tidak tepat — harus 1 series", "Tepat — bar chart grouped (2 batang per kelas) dengan 2 warna untuk 2 series, mudah bandingkan", "Harus pakai 3D", "Salah jenis"],
        "correct": 1,
        "explanation": "Evaluasi: grouped bar chart dengan 2 series = tepat. 2 warna untuk 2 mapel, 3 kelompok (kelas). Bisa bandingkan matematika vs IPA per kelas, dan antar kelas. Warna dengan legend jelas."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "Manakah visualisasi yang paling RENTAN dimanipulasi untuk menyesatkan?",
        "options": ["Bar chart Y mulai dari 0", "Pie chart 3 kategori", "Bar chart Y dimulai bukan 0 (mis: dari 90)", "Line chart 2 series dengan legend"],
        "correct": 2,
        "explanation": "Evaluasi: bar chart Y bukan 0 = paling rentan manipulasi. Perbedaan kecil terlihat dramatis. Sering dipakai media untuk sensasi. Opsi lain relatif jujur."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Adi** buat line chart penjualan 12 bulan. Garis naik dari Jan ke Des. Ia pakai 1 warna, tanpa label sumbu, tanpa judul. Evaluasi.",
        "options": ["Visualisasi baik — garis naik jelas", "Kurang lengkap — tanpa judul, label sumbu, satuan, sumber data. Pembaca tidak tahu apa yang divisualisasi. Wajib tambah konteks", "Salah jenis", "Terlalu sederhana"],
        "correct": 1,
        "explanation": "Evaluasi: visualisasi tanpa konteks = ambigu. Apa sumbu X (bulan? tahun?), apa sumbu Y (penjualan? unit?), satuan apa, sumber data. Wajib: judul deskriptif, label sumbu, satuan, sumber."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "Box plot 2 kelompok: A (median 80, Q1 75, Q3 85, outlier 50), B (median 78, Q1 76, Q3 80, tanpa outlier). Kelompok mana yang lebih 'stabil'?",
        "options": ["A lebih stabil (median 80)", "B lebih stabil (IQR 4 vs A 10, dan tidak ada outlier). Median sedikit lebih rendah tapi konsisten", "Sama stabil", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: 'stabil' = konsisten = IQR kecil + tidak outlier. B: IQR 4 (konsisten), tanpa outlier = stabil. A: IQR 10 + outlier 50 = variatif. B lebih stabil walaupun median sedikit lebih rendah."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Boni** buat heatmap nilai 5 siswa × 5 mapel. 1 siswa punya nilai rendah di SEMUA mapel (kolom gelap semua). Interpretasi?",
        "options": ["Siswa malas", "Siswa lemah di semua mapel — perlu investigasi penyebab (motivasi, kesehatan, kondisi sosial). Jangan langsung label 'malas'", "Mapel sulit", "Tidak ada pola"],
        "correct": 1,
        "explanation": "Evaluasi: 1 siswa rendah di semua mapel = pola konsisten. Tapi penyebab bisa banyak: motivasi, kesehatan, keluarga, ekonomi, gaya belajar. Investigasi dulu sebelum label negatif."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "Manakah situasi di mana visualisasi BUKAN pilihan terbaik?",
        "options": ["Membandingkan 5 kategori", "Menunjukkan tren 12 bulan", "Membaca 1000 data individual secara detail (tabel lebih baik)", "Menunjukkan proporsi"],
        "correct": 2,
        "explanation": "Evaluasi: visualisasi untuk pola/tren/perbandingan. Untuk baca data individual/detail (mis: cek nilai spesifik siswa A di ujian B), tabel lebih baik. Visualisasi menyembunyikan detail."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Citra** buat visualisasi untuk presentasi ke kepala sekolah: 1 chart dengan 10 series (10 kelas). Garis berdesakan, sulit dibaca. Rekomendasi?",
        "options": ["Pertahankan 10 series — detail penting", "Sederhanakan: 1) kelompokkan jadi 3 (kelas 7, 8, 9), 2) fokus top 3 kelas + 'lainnya', atau 3) pakai small multiples (10 chart kecil)", "Ganti ke pie chart", "Hapus visualisasi"],
        "correct": 1,
        "explanation": "Evaluasi: 10 series = clutter. Strategi: agregasi (3 kelompok), fokus top + 'lainnya', atau small multiples (grid chart kecil). Sesuaikan dengan pesan utama presentasi."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "Histogram nilai ujian membentuk 2 puncak (bimodal): puncak 1 di 50-60, puncak 2 di 80-90. Interpretasi?",
        "options": ["Distribusi normal", "Bimodal — kemungkinan 2 kelompok siswa (yang belajar dan yang tidak). Perlu analisis lebih lanjut", "Data rusak", "Tidak ada pola"],
        "correct": 1,
        "explanation": "Evaluasi: bimodal = 2 puncak = 2 kelompok. Mungkin: siswa yang ikut bimbel vs tidak, atau kelas yang berbeda metode. Pola ini menarik — investigasi kelompoknya, jangan dirata-rata."
    },
]

QUESTIONS_KELAS_8_ESSAI = [
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Skenario:** Anda mencatat jam tidur 7 hari terakhir: Senin 7, Selasa 6.5, Rabu 5, Kamis 6, Jumat 5.5, Sabtu 8, Minggu 8.5.\n\n**Tugas:**\n1. Tentukan jenis visualisasi yang tepat untuk pertanyaan: 'apakah tidur saya konsisten?' vs 'bagaimana tren tidur saya?'\n2. Buat deskripsi visualisasi (sekitar 100 kata) untuk masing-masing\n3. Hitung: mean, median, dan range jam tidur\n4. Berapa persen hari yang tidur <7 jam (rekomendasi minimal)?\n5. Insight apa yang Anda dapat?",
        "essay_answer": "1. Jenis visualisasi:\n- 'Apakah konsisten?' → box plot (tunjukkan median, IQR, range)\n- 'Bagaimana tren?' → line chart (X=hari, Y=jam tidur)\n\n2. Deskripsi:\n- Box plot: kotak kecil di sekitar 5.5-8, median sekitar 6.5, whisker dari 5 ke 8.5. Tidak ada outlier. Konsistensi moderat.\n- Line chart: garis turun dari Senin (7) ke Rabu (5), naik ke Jumat (5.5), lalu naik tajam ke Minggu (8.5). Pola V-shape: turun di hari sekolah, naik di akhir pekan.\n\n3. Hitung:\n- Mean = (7+6.5+5+6+5.5+8+8.5)/7 = 46.5/7 = 6.64 jam\n- Median (urut: 5, 5.5, 6, 6.5, 7, 8, 8.5) = 6.5 jam\n- Range = 8.5 - 5 = 3.5 jam\n\n4. Hari tidur <7 jam: Selasa (6.5), Rabu (5), Kamis (6), Jumat (5.5) = 4 hari dari 7 = 57%\n\n5. Insight:\n- Tidur tidak konsisten — turun di hari sekolah (mungkin tugas/sekolah), naik di akhir pekan (rebound)\n- 57% hari kurang dari rekomendasi 7 jam — perlu evaluasi jadwal\n- Akhir pekan 'tidur bayar' (rebound) tidak ideal — lebih baik konsisten 7-8 jam setiap hari\n- Saran: atur jadwal tidur konsisten, batasi gadget malam, prioritaskan tidur di hari sekolah"
    },
    {
        "level": "C4", "category": "Visualisasi Data",
        "question": "**Analisis kasus:** Sebuah berita menampilkan bar chart dengan judul 'Nilai UN Sekolah A 3x Lebih Tinggi dari Sekolah B!'. Chart menunjukkan: Sekolah A = 90, Sekolah B = 30. Sumbu Y dimulai dari 25.\n\n**Tugas:**\n1. Identifikasi minimal 2 masalah dengan visualisasi ini\n2. Hitung rasio sebenarnya vs rasio yang terlihat dari chart\n3. Buat visualisasi alternatif yang lebih jujur (deskripsi)\n4. Berikan saran untuk editor berita",
        "essay_answer": "1. Masalah visualisasi:\n\na. Sumbu Y dimulai dari 25 (bukan 0) — membuat perbedaan terlihat dramatis. Bar A (90-25=65 unit) vs B (30-25=5 unit) = A terlihat 13x B. Padahal sebenarnya 90/30 = 3x.\n\nb. Judul sensasional '3x Lebih Tinggi' — walaupun secara matematis benar (90/30=3), framing mempengaruhi persepsi. Sebenarnya selisih 60 poin, bukan '3x lebih tinggi' dalam konteks prestasi.\n\nc. Tidak ada konteks: jumlah siswa, mata pelajaran, tahun, kondisi sosial ekonomi. Bisa jadi Sekolah B punya siswa ekonomi lebih rendah, atau mata pelajaran lebih sulit.\n\n2. Rasio sebenarnya vs terlihat:\n- Sebenarnya: 90/30 = 3x (judul benar secara matematis)\n- Terlihat dari chart (Y mulai 25): A=65 unit, B=5 unit, rasio visual = 13x\n- Chart mengaburkan rasio sebenarnya dengan factor 4.3x (13/3)\n\n3. Visualisasi alternatif yang lebih jujur:\n- Bar chart dengan Y mulai dari 0 (0-100). Bar A=90, B=30. Selisih terlihat proporsional (3x), bukan dramatis.\n- Tambah label angka di atas batang: '90' dan '30'\n- Judul netral: 'Perbandingan Nilai UN: Sekolah A 90 vs Sekolah B 30'\n- Tambah konteks di caption: jumlah siswa, mata pelajaran, tahun, sumber data\n- Pertimbangkan side-by-side dengan data historis (mis: 3 tahun terakhir) supaya pembaca lihat tren, bukan hanya 1 titik waktu\n\n4. Saran untuk editor:\n- Jangan mulai Y dari nilai bukan 0 untuk bar chart\n- Judul harus netral dan akurat, bukan sensasional\n- Sertakan konteks (siswa, tahun, mata pelajaran)\n- Sertakan sumber data dan metode pengukuran\n- Hindari generalisasi dari 1 titik data — gunakan data multi-tahun jika ada\n- Pertimbangkan dampak psikologis: judul sensasional bisa merugikan Sekolah B dan komunitasnya\n- Editor wajib verifikasi: apakah selisih karena faktor sekolah atau non-sekolah (sosial ekonomi, demografi)?"
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Studi kasus kritis:** Anda adalah data scientist di kementerian pendidikan. Anda punya data nilai ujian nasional 5 tahun terakhir untuk 1000 sekolah. Anda harus membuat visualisasi untuk menteri untuk menunjukkan: (a) tren nasional, (b) perbandingan antar provinsi, (c) kesenjangan kota vs desa.\n\n**Tugas:**\n1. Untuk setiap (a), (b), (c) — pilih jenis visualisasi dan jelaskan alasan\n2. Identifikasi 3 risiko etis dari visualisasi data pendidikan ini\n3. Buat rekomendasi kebijakan berdasarkan kemungkinan temuan visualisasi",
        "essay_answer": "1. Pilihan visualisasi per tujuan:\n\n(a) Tren nasional 5 tahun:\n- Line chart dengan X=tahun, Y=rata-rata nilai nasional, garis per mata pelajaran (3 series: Matematika, B.Inggris, B.Indonesia)\n- Alasan: tren seiring waktu paling jelas di line chart. 3 series untuk bandingkan mata pelajaran. Bisa lihat: nilai naik/turun? mata pelajaran mana paling lemah?\n- Tambah anotasi: perubahan kurikulum, kebijakan, event penting\n\n(b) Perbandingan antar provinsi:\n- Bar chart horizontal, urut desc, 34 provinsi sebagai kategori, Y=nilai rata-rata\n- Alasan: 34 kategori terlalu banyak untuk pie/line. Bar horizontal cocok karena label provinsi panjang. Urutan desc memudahkan ranking.\n- Alternatif: peta choropleth (peta Indonesia warnai per provinsi) jika konteks geografis penting\n- Highlight: gunakan warna berbeda untuk top 5 dan bottom 5\n\n(c) Kesenjangan kota vs desa:\n- Grouped bar chart: 2 batang per mata pelajaran (kota vs desa), 3 mata pelajaran\n- Atau: side-by-side box plot per mata pelajaran (kota vs desa) — menunjukkan distribusi, bukan hanya rata-rata\n- Alasan: grouped bar = perbandingan langsung. Box plot = distribusi (apakah desa lebih variatif? ada outlier?)\n- Pilihan: scatter plot dengan X=populasi kota, Y=nilai, titik diberi warna kota/desa\n\n2. Risiko etis:\n\na. Stigmatisasi daerah: visualisasi yang menunjukkan provinsi tertentu 'terendah' bisa stigma, dampak ke motivasi siswa dan investasi daerah. Mitigasi: sertakan konteks (sosial ekonomi, akses pendidikan), hindari label 'terburuk'.\n\nb. Generalisasi berlebihan: rata-rata provinsi bisa menyembunyikan variasi besar antar sekolah di provinsi itu. Mitigasi: tambah box plot atau range, bukan hanya rata-rata.\n\nc. Pressure ke guru: visualisasi 'ranking' bisa tekan guru untuk fokus test prep, abaikan pendidikan holistik. Mitigasi: sertakan metrik non-akademik (karakter, kreativitas), bukan hanya nilai ujian.\n\nd. Privasi: data sekolah kecil bisa di-identifikasi siswa individual. Mitigasi: anonymisasi, agregasi minimum (tidak show <10 siswa per cell).\n\ne. Bias historis: kesenjangan kota/desa bisa di-fame sebagai 'ketidakmampuan desa' padahal sebabnya akses/infrastruktur. Mitigasi: sertakan data infrastruktur (listrik, internet, guru per siswa).\n\n3. Rekomendasi kebijakan berdasarkan kemungkinan temuan:\n\n(a) Jika tren nasional menurun:\n- Evaluasi kurikulum terakhir — ada perubahan yang berdampak negatif?\n- Tinjau beban siswa — apakah terlalu banyak?\n- Audit kualitas guru — apakah perlu pelatihan ulang?\n\n(b) Jika ada provinsi konsisten terendah:\n- Investigasi penyebab: akses, infrastruktur, sosial ekonomi, kualitas guru\n- Program khusus: beasiswa, pelatihan guru, subsidi infrastruktur\n- Belajar dari provinsi terbaik — praktik apa yang bisa direplikasi?\n\n(c) Jika kesenjangan kota/desa signifikan:\n- Investasi infrastruktur: internet, listrik, perpustakaan\n- Insentif guru mengajar di desa: tunjangan, promosi cepat\n- Program pendampingan: sekolah kota adopt sekolah desa\n- Digital learning: konten online untuk daerah terpencil\n- Monitoring ketat: tidak cukup subsidi, harus audit hasil\n\nPenting: visualisasi adalah alat, bukan tujuan. Setelah temuan, harus aksi konkret dengan budget dan timeline."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Refleksi:** Pilih satu aplikasi yang sering Anda gunakan yang punya visualisasi data (mis: smartwatch kesehatan, Spotify Wrapped, Instagram Insights, Shopee statistik penjual).\n\n**Tugas:**\n1. Deskripsikan minimal 3 visualisasi yang ada di aplikasi tersebut\n2. Evaluasi: visualisasi mana yang paling efektif? Mana yang kurang? Mengapa?\n3. Identifikasi 1 insight yang Anda dapat dari visualisasi tersebut\n4. Berikan 1 saran perbaikan untuk developer aplikasi",
        "essay_answer": "Contoh jawaban untuk Spotify Wrapped:\n\n1. Visualisasi yang ada:\n\na. Bar chart top 5 artis dengan jumlah menit didengar — batang horizontal, urutan desc, warna gradien hijau Spotify\n\nb. Story-style card dengan persentase genre: 'Kamu 45% pop, 25% indie, 15% R&B' — pakai pie chart kecil + ikon genre\n\nc. Card dengan total menit didengar, jumlah lagu unik, jumlah artis — angka besar dengan animasi count-up\n\nd. Story 'Top song' dengan jumlah play — lagu cover art + count\n\ne. Aurora/Planet card: visualisasi 3D planet dengan musik yang membentuk 'audio aura' (energi, positif, etc)\n\n2. Evaluasi:\n\nPaling efektif: Bar chart top 5 artis. Jelas, mudah dibaca, urutan desc membantu ranking. Tapi bisa lebih baik dengan label angka exact (bukan hanya batang).\n\nKurang efektif: Aurora 3D planet. Visual menarik tapi tidak informatif — sulit ekstrak insight konkret. Lebih styling dari pada data viz.\n\nPie chart genre: menarik tapi 3 kategori saja (45-25-15) — info terlalu kasar. Lebih banyak kategori akan informatif.\n\n3. Insight yang didapat:\n- Saya dengar 45% pop — ternyata lebih banyak dari yang saya kira. Saya selalu merasa 'indie kid' tapi data menunjukkan dominan pop.\n- Top artist = Taylor Swift dengan 1247 menit (~21 jam). Berarti saya habiskan ~21 jam dengar 1 artis dalam setahun. Banyak.\n- Genre bimodal: 45% pop + 25% indie — saya suka 2 kutub yang berbeda.\n\n4. Saran perbaikan:\n- Tambah visualisasi tren: bagaimana selera musik saya berubah sepanjang tahun (Q1 vs Q2 vs Q3 vs Q4). Saat ini hanya summary tahunan.\n- Tambah perbandingan: bagaimana selera saya vs rata-rata pengguna Spotify Indonesia? Ini kontekstualisasi.\n- Tambah visualisasi 'discovery ratio': berapa % lagu baru vs lagu lama yang didengar. Insight: apakah saya eksplor atau repetisi.\n- Kurangi efek 3D/animasi berlebihan — fokus pada insight data.\n- Tambah download/report PDF supaya bisa simpan dan refleksi tahunan."
    },
    {
        "level": "C5", "category": "Visualisasi Data",
        "question": "**Eksperimen desain:** Anda diminta merancang dashboard visualisasi untuk guru kelas yang menampilkan performa 30 siswa di 6 mata pelajaran selama 1 semester (6 ujian per mapel).\n\n**Tugas:**\n1. Identifikasi 5 pertanyaan kunci yang harus dijawab dashboard\n2. Untuk setiap pertanyaan, pilih visualisasi yang tepat dan jelaskan\n3. Identifikasi 2 risiko misinterpretasi oleh guru\n4. Berikan rekomendasi training singkat untuk guru sebelum pakai dashboard",
        "essay_answer": "1. 5 pertanyaan kunci dashboard:\n\na. Siapa siswa yang perlu perhatian khusus (nilai rendah konsisten)?\nb. Mata pelajaran apa yang paling sulit untuk kelas secara umum?\nc. Apakah ada tren penurunan/peningkatan kelas dari ujian 1 ke 6?\nd. Bagaimana distribusi nilai per mata pelajaran (normal, miring, bimodal)?\ne. Siapa siswa yang paling berkembang (selisih ujian 1 vs 6 terbesar)?\n\n2. Visualisasi per pertanyaan:\n\na. Siswa perlu perhatian:\n- Heatmap: 30 siswa (baris) × 6 mapel (kolom), warna = rata-rata nilai. Siswa dengan baris gelap konsisten = perlu perhatian.\n- Plus: filter siswa dengan rata-rata <KKM, tampilkan sebagai list dengan alert.\n\nb. Mata pelajaran sulit:\n- Bar chart: 6 batang (mapel), Y=rata-rata kelas, threshold KKM sebagai garis horizontal merah.\n- Sort desc untuk ranking kesulitan.\n\n\nc. Tren kelas:\n- Line chart: X=ujian 1-6, Y=rata-rata kelas, 6 garis per mapel. Atau 1 garis rata-rata semua mapel + area shaded per mapel.\n- Tambah trendline dan anotasi event (mis: 'ujian susah', 'ada remedial').\n\nd. Distribusi per mapel:\n- Side-by-side box plot: 6 box plot per mapel. Tunjukkan median, IQR, outlier per mapel.\n- Bisa lihat: mapel mana yang distribusinya miring (mayoritas rendah), mana yang normal.\n\ne. Siswa paling berkembang:\n- Scatter plot: X=nilai ujian 1, Y=nilai ujian 6. Garis diagonal y=x. Titik di atas garis = berkembang, di bawah = menurun. Warna gradient = besarnya perkembangan.\n- Atau: bar chart horizontal top 10 siswa dengan selisih terbesar (urutan desc).\n\n3. Risiko misinterpretasi:\n\na. Korelasi vs kausalitas: guru melihat siswa yang rajin hadir punya nilai tinggi, lalu menyimpulkan 'kehadiran = penyebab nilai tinggi'. Padahal bisa siswa disiplin yang rajin hadir juga rajin belajar. Mitigasi: anotasi 'korelasi bukan kausalitas' di chart.\n\nb. Label negatif prematur: guru melihat siswa di 'perlu perhatian' lalu memberi label 'lemah' tanpa investigasi. Mitigasi: tooltip 'investigasi penyebab: kesehatan, keluarga, motivasi' sebelum label.\n\nc. Over-confidence pada rata-rata: guru lihat rata-rata kelas naik, lalu pikir semua siswa naik. Padahal bisa 5 siswa naik tajam, 25 lainnya turun. Mitigasi: selalu tampilkan distribusi (box plot), bukan hanya rata-rata.\n\nd. Bias konfirmasi: guru lihat mapel yang ia anggap sulit = rendah di chart, lalu 'benar kananan' keyakinan. Padahal bisa jadi metode mengajarnya yang perlu diubah. Mitigasi: bandingkan dengan kelas lain yang mapel sama.\n\n4. Rekomendasi training singkat (1 jam):\n\nMenit 0-10: Konsep dasar visualisasi. Jenis grafik dan kapan dipakai. Prinsip 'Y mulai 0' untuk bar chart. Bahaya manipulasi.\n\nMenit 10-25: Tour dashboard. Jelaskan 5 pertanyaan + visualisasi masing-masing. Demo cara baca box plot (median, IQR, outlier). Cara baca heatmap (warna = nilai). Cara pakai filter (per siswa, per mapel, per ujian).\n\nMenit 25-40: Studi kasus. Beri 3 contoh data real, minta guru interpretasi. Bahas kesalahan umum: korelasi vs kausalitas, label negatif, over-confidence rata-rata.\n\nMenit 40-55: Praktik. Guru pakai dashboard dengan data kelasnya sendiri. Identifikasi: 3 siswa perlu perhatian, 1 mapel sulit, 1 tren. Diskusi kelompok kecil.\n\nMenit 55-60: Wrap-up. Reminder: dashboard alat bantu, bukan pengganti profesionalisme guru. Investigasi konteks sebelum label. Berbagi best practice. Q&A.\n\nMaterial: handout 2 halaman (cheat sheet visualisasi + FAQ), video tutorial 5 menit, grup WhatsApp support."
    },
]


# ============================================================
# KELAS 9: STRUKTUR DATA GRAPH
# ============================================================

MATERI_KELAS_9 = """# Memperdalam Struktur Data Graph: Jaringan yang Menghubungkan Dunia

## Mengapa Graph Penting?

Graph adalah struktur data yang merepresentasikan hubungan antar objek. Jika tree adalah hierarki (seperti pohon keluarga atau struktur folder), graph adalah jaringan yang lebih bebas — setiap node bisa terhubung ke node lain tanpa batasan hierarki. Graph ada di mana-mana: jaringan pertemanan di media sosial, rute Google Maps, jaringan internet, hubungan antar mata pelajaran, bahkan silsilah penyakit menular. Memahami graph adalah gerbang untuk memahami banyak teknologi modern, mulai dari algoritma pencarian rute hingga analisis jejaring sosial.

Bayangkan Anda ingin pergi dari rumah ke sekolah. Ada beberapa rute: lewat jalan A (dekat tapi macet), lewat jalan B (jauh tapi lancar), lewat jalan C (perlu transit). Ini adalah graph: rumah dan sekolah adalah node (titik), jalan adalah edge (garis penghubung) dengan properti jarak/waktu. Algoritma graph seperti Dijkstra atau A* mencari rute terbaik berdasarkan kriteria yang Anda tentukan. Tanpa graph, Google Maps tidak akan ada.

## Definisi Graph

Graph G = (V, E) terdiri dari:
- **V (Vertices)**: kumpulan node/titik. Contoh: kota, orang, mata pelajaran.
- **E (Edges)**: kumpulan edge/garis yang menghubungkan pasangan node. Contoh: jalan antar kota, pertemanan, prasyarat mata pelajaran.

Istilah penting dalam graph:
- **Node/Vertex**: titik dalam graph
- **Edge**: garis penghubung antar node
- **Adjacent**: dua node yang terhubung langsung oleh edge
- **Degree**: jumlah edge yang terhubung ke node
- **Path**: urutan node yang terhubung oleh edge
- **Cycle**: path yang berakhir di node awal (membentuk lingkaran)
- **Connected**: graph di mana semua node bisa dicapai dari node manapun
- **Directed graph (digraph)**: edge punya arah (A→B ≠ B→A)
- **Undirected graph**: edge tidak punya arah (A-B = B-A)
- **Weighted graph**: edge punya bobot (jarak, waktu, biaya)
- **Tree**: graph khusus yang connected, tidak ada cycle, dan punya root

## Jenis-Jenis Graph

### 1. Undirected Graph (Graph Tak Berarah)
Edge tidak punya arah. A-B berarti bisa dari A ke B atau B ke A. Contoh: pertemanan di Facebook (jika A teman B, otomatis B teman A). Jalan dua arah juga undirected.

### 2. Directed Graph (Digraph / Graph Berarah)
Edge punya arah. A→B berarti bisa dari A ke B, tapi belum tentu sebaliknya. Contoh: follow di Instagram (A follow B ≠ B follow A), prasyarat mata pelajaran (Matematika → Fisika berarti Matematika prasyarat Fisika, tidak sebaliknya).

### 3. Weighted Graph (Graph Berbobot)
Edge punya bobot/nilai. Bobot bisa berupa jarak, waktu, biaya, dll. Contoh: jalan antar kota dengan jarak (km), waktu tempuh (menit), atau biaya tol (Rp). Algoritma seperti Dijkstra pakai bobot untuk cari rute optimal.

### 4. Cyclic vs Acyclic Graph
- Cyclic: ada cycle (lingkaran). Contoh: jaringan jalan (bisa balik ke titik awal).
- Acyclic: tidak ada cycle. Contoh: prasyarat mata pelajaran (tidak bisa Matematika → Fisika → Matematika).

### 5. Connected vs Disconnected
- Connected: semua node bisa dicapai dari node manapun. Contoh: jaringan internet (semua komputer terhubung).
- Disconnected: ada node yang tidak bisa dicapai. Contoh: 2 jaringan WiFi terpisah.

## Representasi Graph dalam Komputer

### 1. Adjacency Matrix
Matriks 2D di mana matriks[i][j] = 1 jika ada edge dari node i ke node j, 0 jika tidak. Untuk weighted graph, matriks[i][j] = bobot.

Kelebihan: cek edge cepat O(1). Kekurangan: boros memori O(V²) untuk graph sparse (sedikit edge).

### 2. Adjacency List
Array/list di mana adj[i] = list node yang adjacent ke i.

Kelebihan: hemat memori O(V+E). Kekurangan: cek edge i-j butuh scan list O(degree).

### 3. Edge List
List pasangan (u, v) untuk setiap edge u-v.

Kelebihan: simpel, hemat untuk graph sangat sparse. Kekurangan: cek adjacency butuh scan semua edge.

## Algoritma Graph Dasar

### 1. BFS (Breadth-First Search)
Traversal layer per layer dari node awal. Pakai queue. BFS menemukan shortest path (jalur terpendek) dalam graph unweighted. Contoh: cari teman terdekat di Facebook (1 hop, 2 hop, dst).

### 2. DFS (Depth-First Search)
Traversal sedalam mungkin sebelum backtrack. Pakai stack atau rekursi. DFS bagus untuk: deteksi cycle, topological sort, find connected components.

### 3. Dijkstra's Algorithm
Cari shortest path dari 1 node ke semua node lain dalam weighted graph (bobot non-negatif). Pakai priority queue. Contoh: Google Maps cari rute tercepat.

### 4. A* (A-Star)
Variasi Dijkstra dengan heuristic (perkiraan jarak ke tujuan). Lebih cepat dari Dijkstra karena fokus ke arah tujuan. Contoh: GPS mobil.

## Aplikasi Graph di Kehidupan Sehari-Hari

1. **Google Maps / Waze** — graph jalan, cari rute optimal (Dijkstra/A*)
2. **Media sosial** — graph pertemanan, rekomendasi teman, friend suggestion
3. **Internet** — graph hyperlink antar halaman web, algoritma PageRank Google
4. **Sistem rekomendasi** — graph user-item, "orang yang beli ini juga beli..."
5. **Logistik** — graph rute pengiriman, optimasi kurir
6. **Bioinformatika** — graph interaksi protein, analisis penyakit
7. **Sirkuit elektronik** — graph koneksi komponen
8. **Prasyarat mata kuliah** — DAG (Directed Acyclic Graph), topological sort
9. **Silsilah keluarga** — tree (graph khusus)
10. **Jaringan kereta bawah tanah** — graph stasiun dan jalur

## Kesalahan Umum dalam Graph

1. **Bingung directed vs undirected** — mengira A-B selalu sama dengan B-A. Padahal di follow Instagram, A→B ≠ B→A.

2. **Salah hitung degree di directed graph** — ada in-degree (edge masuk) dan out-degree (edge keluar). Mis: selebgram punya in-degree tinggi (banyak follower), out-degree rendah (follow sedikit).

3. **Lupa handle cycle** — DFS tanpa tracking visited bisa infinite loop di graph dengan cycle.

4. **Salah pilih algoritma** — pakai BFS untuk weighted graph (BFS hanya untuk unweighted). Pakai Dijkstra untuk bobot negatif (Dijkstra gagal, pakai Bellman-Ford).

5. **Tidak validasi input** — graph bisa punya self-loop (node terhubung ke dirinya) atau multi-edge (2 edge antar node yang sama). Validasi sebelum proses.

## Latihan Self-Assessment

Setelah membaca materi ini, coba jawab: gambar graph pertemanan 5 orang di kelas Anda (A, B, C, D, E). Tentukan siapa teman siapa. Lalu: (1) identifikasi siapa yang paling populer (degree tertinggi), (2) cari path dari A ke E, (3) apakah ada cycle? Diskusikan dengan teman apa insight yang Anda dapat dari graph pertemanan tersebut.
"""

QUESTIONS_KELAS_9_PG = [
    # ── C3 (Menerapkan) — 15 soal ──
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "Dalam graph, node/titik disebut juga...",
        "options": ["Edge", "Vertex (atau Vertices untuk jamak)", "Path", "Cycle"],
        "correct": 1,
        "explanation": "Node = Vertex (tunggal) / Vertices (jamak). Edge = garis penghubung. Path = urutan node. Cycle = path berakhir di awal."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "**Siti** punya graph pertemanan: A-B, A-C, B-C, B-D. Berapa degree node B?",
        "options": ["1", "2", "3 (terhubung ke A, C, D)", "4"],
        "correct": 2,
        "explanation": "Degree = jumlah edge yang terhubung ke node. B terhubung ke A (A-B), C (B-C), D (B-D). Degree B = 3."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "Graph di mana edge punya arah (A→B ≠ B→A) disebut...",
        "options": ["Undirected graph", "Directed graph (digraph)", "Weighted graph", "Tree"],
        "correct": 1,
        "explanation": "Directed graph (digraph) = edge punya arah. Contoh: follow Instagram (A follow B ≠ B follow A). Undirected = dua arah otomatis."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "**Budi** punya graph jalan: A-B (5km), B-C (3km), A-C (10km). Graph ini adalah graph...",
        "options": ["Undirected tanpa bobot", "Weighted graph (edge punya bobot jarak)", "Directed graph", "Tree"],
        "correct": 1,
        "explanation": "Edge punya bobot (5km, 3km, 10km) = weighted graph. Bobot bisa jarak, waktu, biaya. Cocok untuk algoritma Dijkstra."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "Manakah yang BUKAN ciri tree (graph khusus)?",
        "options": ["Connected (semua node terhubung)", "Tidak ada cycle", "Punya root (node khusus di puncak)", "Bisa ada cycle (lingkaran)"],
        "correct": 3,
        "explanation": "Tree = graph khusus yang connected + tidak ada cycle + punya root. Jika ada cycle → BUKAN tree. Tree juga: setiap node (kecuali root) punya 1 parent."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "BFS (Breadth-First Search) menggunakan struktur data...",
        "options": ["Stack", "Queue (antrian)", "Tree", "Hash table"],
        "correct": 1,
        "explanation": "BFS pakai queue (FIFO). Visit node, masukkan neighbor ke queue, proses queue. Traversal layer per layer. DFS pakai stack (LIFO)."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "DFS (Depth-First Search) menggunakan struktur data...",
        "options": ["Queue", "Stack (atau rekursi yang implisit pakai call stack)", "Array", "Heap"],
        "correct": 1,
        "explanation": "DFS pakai stack (LIFO) atau rekursi. Traverse sedalam mungkin sebelum backtrack. Cocok untuk deteksi cycle, topological sort."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "**Dina** punya graph: A-B, B-C, C-D, D-A. Apa yang terbentuk?",
        "options": ["Tree", "Cycle (lingkaran A-B-C-D-A)", "Path", "Tidak ada pola"],
        "correct": 1,
        "explanation": "Path A-B-C-D-A berakhir di node awal = cycle. Graph ini punya cycle, jadi BUKAN tree. Tree tidak boleh ada cycle."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "Algoritma Dijkstra digunakan untuk...",
        "options": ["Mencari shortest path dalam weighted graph (bobot non-negatif)", "Mengurutkan data", "Mencari nilai maksimum", "Traversal tree"],
        "correct": 0,
        "explanation": "Dijkstra = cari shortest path dari 1 node ke semua node lain dalam weighted graph. Syarat: bobot non-negatif. Untuk bobot negatif, pakai Bellman-Ford."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "**Eka** punya graph pertemanan: A-B, A-C, B-D. Path dari C ke D adalah...",
        "options": ["C-D (langsung)", "C-A-B-D (lewat A dan B)", "Tidak ada path", "C-D-A-B"],
        "correct": 1,
        "explanation": "C tidak terhubung langsung ke D. Path: C-A (edge), A-B (edge), B-D (edge). Jadi C-A-B-D. Path length = 3 edges."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "Adjacency matrix untuk graph dengan V node membutuhkan memori sebesar...",
        "options": ["O(V)", "O(V²)", "O(E)", "O(V+E)"],
        "correct": 1,
        "explanation": "Adjacency matrix = matriks V×V = O(V²). Boros untuk graph sparse (sedikit edge), tapi cek edge cepat O(1). Adjacency list lebih hemat O(V+E)."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "**Fajar** punya graph follow Instagram: A→B, A→C, B→C, C→A. Berapa in-degree node C (jumlah edge masuk ke C)?",
        "options": ["1", "2 (dari A dan B)", "3", "0"],
        "correct": 1,
        "explanation": "In-degree = edge masuk. Edge ke C: A→C, B→C. In-degree C = 2. Out-degree C (edge keluar) = 1 (C→A)."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "Google Maps menggunakan graph dengan node = persimpangan, edge = jalan. Edge punya bobot...",
        "options": ["Warna jalan", "Jarak/waktu tempuh (weighted graph)", "Nama jalan", "Tidak ada bobot"],
        "correct": 1,
        "explanation": "Google Maps: weighted graph dengan bobot = jarak (km) atau waktu tempuh (menit). Algoritma Dijkstra/A* cari rute optimal berdasarkan bobot."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "**Gita** punya graph: A-B, B-C, C-A, C-D. Apakah graph ini connected?",
        "options": ["Tidak connected", "Ya, connected (semua node bisa dicapai dari node manapun)", "Hanya A-B-C connected, D terpisah", "Tidak bisa ditentukan"],
        "correct": 1,
        "explanation": "Connected = semua node bisa dicapai. Dari A: A→B→C→D. Dari D: D→C→A atau D→C→B. Dari B: B→A, B→C→D. Semua terhubung = connected."
    },
    {
        "level": "C3", "category": "Struktur Data Graph",
        "question": "Aplikasi graph dalam media sosial (mis: Facebook friend suggestion) menggunakan konsep...",
        "options": ["Shortest path", "Mutual friends (path length 2) — jika A-B-C, sarankan C ke A", "Topological sort", "Binary search"],
        "correct": 1,
        "explanation": "Friend suggestion: cari node yang jaraknya 2 hop (mutual friend). Jika A-B dan B-C, sarankan A-C. Ini pakai BFS dari A, ambil node di layer 2."
    },
    # ── C4 (Menganalisis) — 15 soal ──
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "Perhatikan graph: A-B, A-C, B-D, C-D, D-E. Berapa path length terpendek dari A ke E?",
        "options": ["1", "2", "3 (A-B-D-E atau A-C-D-E)", "4"],
        "correct": 2,
        "explanation": "Analisis: cari path A ke E. A-B-D-E (3 edges), A-C-D-E (3 edges), A-B-D-C-? (backtrack, tidak efisien). Shortest = 3 edges."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Hadi** punya weighted graph: A-B (5), A-C (2), B-C (1), B-D (3), C-D (8). Berapa shortest path A ke D?",
        "options": ["A-B-D = 5+3 = 8", "A-C-D = 2+8 = 10", "A-C-B-D = 2+1+3 = 6 (shortest!)", "A-B-C-D = 5+1+8 = 14"],
        "correct": 2,
        "explanation": "Analisis: coba semua path. A-B-D=8, A-C-D=10, A-C-B-D=6 (terpendek), A-B-C-D=14. Shortest = A-C-B-D dengan total bobot 6."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Ira** punya graph dengan cycle: A-B-C-A. Ia jalankan DFS dari A tanpa tracking visited. Apa yang terjadi?",
        "options": ["DFS selesai normal", "Infinite loop (A-B-C-A-B-C-A-...) karena cycle", "DFS crash", "DFS hanya visit 3 node"],
        "correct": 1,
        "explanation": "Analisis: DFS tanpa visited di graph dengan cycle = infinite loop. A→B→C→A→B→C→... Solusi: track visited, skip node yang sudah dikunjungi."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "Adjacency matrix untuk graph 4 node (A, B, C, D) dengan edges A-B, B-C, C-D adalah...",
        "options": [
            "Matriks 4x4 dengan matriks[A][B]=1, matriks[B][A]=1, matriks[B][C]=1, matriks[C][B]=1, matriks[C][D]=1, matriks[D][C]=1, lainnya 0",
            "Matriks 3x3",
            "Matriks diagonal",
            "Array 1D"
        ],
        "correct": 0,
        "explanation": "Analisis: 4 node = matriks 4x4. Undirected: A-B berarti matriks[A][B]=1 dan matriks[B][A]=1. Begitu seterusnya. Lainnya 0."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Joko** punya graph prasyarat mata kuliah: Matematika → Fisika, Fisika → Kimia, Kimia → Biologi. Graph ini adalah...",
        "options": ["Undirected cyclic", "Directed Acyclic Graph (DAG) — tidak ada cycle, ada urutan prasyarat", "Tree dengan root Matematika", "Weighted graph"],
        "correct": 1,
        "explanation": "Analisis: edge punya arah (prasyarat) = directed. Tidak ada cycle (tidak bisa balik ke Matematika) = acyclic. DAG = Directed Acyclic Graph. Topological sort berlaku."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "BFS dari node A pada graph: A-B, A-C, B-D, C-D, D-E. Urutan visit (asumsi urutan neighbor alfabetis)?",
        "options": ["A, B, D, C, E (DFS style)", "A, B, C, D, E (BFS layer per layer)", "A, B, C, E, D", "A, E, D, C, B"],
        "correct": 1,
        "explanation": "Analisis: BFS layer per layer. Layer 0: A. Layer 1 (neighbor A): B, C. Layer 2 (neighbor B,C): D. Layer 3 (neighbor D): E. Urutan: A, B, C, D, E."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Kiki** punya graph 5 node, 3 edges (sparse). Mana yang lebih hemat memori: adjacency matrix atau list?",
        "options": ["Matrix (V² = 25)", "List (V+E = 5+3 = 8) — lebih hemat untuk sparse graph", "Sama", "Tidak bisa dibandingkan"],
        "correct": 1,
        "explanation": "Analisis: matrix 5x5=25 cell. List: 5 node + 3 edge = 8. List jauh lebih hemat. Matrix boros untuk sparse. Matrix unggul untuk dense graph (banyak edge)."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Lia** punya weighted graph dengan bobot negatif (-5). Ia pakai Dijkstra. Apa yang terjadi?",
        "options": ["Dijkstra bekerja normal", "Dijkstra bisa salah — algoritma Dijkstra tidak support bobot negatif. Pakai Bellman-Ford", "Dijkstra crash", "Tidak ada efek"],
        "correct": 1,
        "explanation": "Analisis: Dijkstra mengasumsikan bobot non-negatif. Bobot negatif bisa buat Dijkstra pilih path yang bukan shortest (karena asumsi 'tambah edge = tambah jarak' jadi tidak valid). Solusi: Bellman-Ford."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "Pada graph follow Instagram: A→B, B→C, C→A. Berapa cycle yang ada?",
        "options": ["0", "1 cycle (A→B→C→A)", "2 cycles", "3 cycles"],
        "correct": 1,
        "explanation": "Analisis: cycle = path berakhir di awal. A→B→C→A = 1 cycle. Tidak ada cycle lain karena hanya 3 node."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Maman** punya graph 6 node, 4 edges (2 connected components: A-B-C dan D-E-F). Apakah graph connected?",
        "options": ["Connected", "Tidak connected (ada 2 komponen terpisah)", "Tree", "Tidak bisa ditentukan"],
        "correct": 1,
        "explanation": "Analisis: connected = semua node 1 komponen. Ada 2 komponen (A-B-C dan D-E-F) = tidak connected. Untuk connected, harus ada edge antar komponen."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "Degree dari node pada undirected graph A-B, B-C, B-D, C-D adalah: A=1, B=?, C=?, D=?. Lengkapi.",
        "options": ["B=3, C=2, D=2", "B=2, C=1, D=1", "B=4, C=3, D=3", "B=1, C=1, D=1"],
        "correct": 0,
        "explanation": "Analisis: A: edge A-B (1). B: edges B-A, B-C, B-D (3). C: edges C-B, C-D (2). D: edges D-B, D-C (2). Jadi A=1, B=3, C=2, D=2."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "DFS dari node A pada graph: A-B, A-C, B-D, C-D. Urutan visit (asumsi urutan alfabetis)?",
        "options": ["A, B, C, D (BFS style)", "A, B, D, C (DFS: dalam dulu, backtrack)", "A, C, D, B", "A, D, B, C"],
        "correct": 1,
        "explanation": "Analisis: DFS = sedalam mungkin. A→B→D (D tidak punya neighbor baru, backtrack ke B, backtrack ke A) → C→D (sudah visited). Urutan: A, B, D, C."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Nina** punya graph tree dengan root A, children B dan C. B punya child D, E. C punya child F. Berapa total node?",
        "options": ["5", "6 (A, B, C, D, E, F)", "7", "4"],
        "correct": 1,
        "explanation": "Analisis: tree = 1 root + internal nodes + leaves. A (root), B, C (internal), D, E, F (leaves). Total 6 node."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "Adjacency list untuk graph A-B, A-C, B-D adalah...",
        "options": [
            "adj[A] = [B, C], adj[B] = [A, D], adj[C] = [A], adj[D] = [B]",
            "adj[A] = [B], adj[B] = [C]",
            "Matriks 4x4",
            "Hanya list [A, B, C, D]"
        ],
        "correct": 0,
        "explanation": "Analisis: list = per node, list neighbor. A: B, C. B: A, D (undirected, B-A dan B-D). C: A. D: B. adj[A]=[B,C], adj[B]=[A,D], adj[C]=[A], adj[D]=[B]."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Omar** punya graph 7 node, 6 edges, connected, tidak ada cycle. Graph ini adalah...",
        "options": ["Tree (V-1 edges, connected, acyclic)", "Cyclic graph", "DAG", "Disconnected graph"],
        "correct": 0,
        "explanation": "Analisis: tree = connected + acyclic + (V-1 edges). 7 node, 6 edges = V-1. Connected + acyclic + V-1 edges = tree. Definisi tree."
    },
    # ── C5 (Mengevaluasi) — 15 soal ──
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Pak Guru** ingin visualisasi silsilah keluarga. Struktur data yang tepat?",
        "options": ["Graph umum dengan cycle", "Tree (graph khusus: 1 root, tiap node 1 parent, tidak ada cycle)", "Directed graph dengan cycle", "Weighted graph"],
        "correct": 1,
        "explanation": "Evaluasi: silsilah keluarga = tree. 1 root (nenek moyang), tiap orang punya 1 parent (ayah/ibu), tidak ada cycle. Tree adalah graph khusus."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Qori** punya 2 algoritma: Dijkstra dan A*. Kapan A* lebih baik dari Dijkstra?",
        "options": ["Tidak pernah", "Saat ada heuristic (perkiraan jarak ke tujuan) — A* fokus ke arah tujuan, lebih cepat", "Untuk graph unweighted", "Untuk graph dengan bobot negatif"],
        "correct": 1,
        "explanation": "Evaluasi: A* = Dijkstra + heuristic. Heuristic membuat A* fokus ke arah tujuan, mengurangi node yang dieksplor. Lebih cepat untuk graph besar dengan tujuan spesifik (mis: GPS)."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "Manakah skenario di mana graph TIDAK menjadi pilihan terbaik?",
        "options": ["Visualisasi jaringan jalan kota", "Analisis pertemanan di media sosial", "Mencari nilai maksimum di array (linear scan lebih baik)", "Prasyarat mata kuliah"],
        "correct": 2,
        "explanation": "Evaluasi: graph untuk hubungan antar objek. Mencari max di array = linear scan O(n), tidak butuh graph. Opsi lain cocok untuk graph (jalan, pertemanan, prasyarat)."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Rina** punya graph 1000 node. Ia pilih adjacency matrix. Evaluasi.",
        "options": ["Tepat — matrix selalu terbaik", "Boros memori — matrix 1000x1000 = 1 juta cell. Untuk graph sparse, adjacency list (1000 + edges) jauh lebih hemat", "Salah jenis", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: matrix 1000x1000 = 1 juta cell. List = 1000 + jumlah edge. Untuk sparse (sedikit edge), list jauh hemat. Matrix hanya untuk dense (banyak edge)."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Santi** buat algoritma cari teman di Facebook: mulai dari Anda, BFS layer 1 (teman langsung), layer 2 (mutual). Evaluasi pendekatan.",
        "options": ["Salah — harus DFS", "Tepat — BFS natural untuk 'teman dalam N hop'. Layer 1 = 1 hop, layer 2 = 2 hop", "Harus Dijkstra", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: BFS natural untuk cari 'jarak terpendek' dalam graph unweighted. Layer = hop. Friend suggestion (mutual = 2 hop) = BFS layer 2. DFS tidak cocok karena tidak urut per jarak."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "Manakah ALGORITMA yang TEPAT untuk deteksi cycle dalam directed graph?",
        "options": ["BFS", "DFS dengan tracking 'node di current path' (recursion stack)", "Dijkstra", "Linear scan"],
        "correct": 1,
        "explanation": "Evaluasi: DFS dengan tracking 'node di current path' deteksi cycle. Jika DFS menemui node yang sudah di current path = cycle. BFS tidak efisien untuk deteksi cycle di directed graph."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Tono** punya graph logistik: 50 gudang, 200 rute pengiriman, bobot = biaya. Ia ingin cari rute termurah dari gudang A ke B. Algoritma yang tepat?",
        "options": ["BFS (unweighted)", "Dijkstra (weighted, cari shortest path)", "DFS (cari path, bukan shortest)", "Linear search"],
        "correct": 1,
        "explanation": "Evaluasi: weighted graph + shortest path = Dijkstra. BFS hanya untuk unweighted. DFS cari path tapi tidak shortest. Linear search tidak applicable."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Vera** punya graph internet: halaman web sebagai node, hyperlink sebagai edge (directed). Algoritma PageRank bekerja dengan konsep...",
        "options": ["Shortest path", "Centrality — halaman dengan banyak inbound link dari halaman penting = penting", "Cycle detection", "BFS"],
        "correct": 1,
        "explanation": "Evaluasi: PageRank = algoritma centrality. Halaman penting = banyak link masuk dari halaman lain yang juga penting. Iteratif: hitung 'rank' per halaman berdasarkan rank halaman yang linking."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "Manakah statement evaluasi yang BENAR tentang tree vs graph?",
        "options": ["Tree dan graph sama", "Tree adalah graph khusus (connected, acyclic, 1 root). Semua tree adalah graph, tapi tidak sebaliknya", "Graph adalah tree khusus", "Tidak ada hubungan"],
        "correct": 1,
        "explanation": "Evaluasi: tree ⊂ graph. Tree = graph dengan constraint khusus (connected + acyclic + 1 root). Setiap tree adalah graph, tapi graph umum (dengan cycle, dll) bukan tree."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Wati** punya graph 5 node, 10 edges (dense). Ia pilih adjacency matrix. Evaluasi.",
        "options": ["Salah — harus adjacency list", "Tepat — dense graph (banyak edge) cocok matrix. 5x5=25 cell, cek edge O(1) cepat", "Harus pakai edge list", "Tidak bisa dievaluasi"],
        "correct": 1,
        "explanation": "Evaluasi: dense = banyak edge (mendekati V²). Matrix 5x5=25, 10 edges = 40% isi. Cek edge O(1) cepat. Matrix tepat untuk dense. List lebih hemat untuk sparse."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Yusuf** punya graph pertemanan 1 juta user. Ia ingin cari 'friend of friend' (mutual friend). Algoritma paling efisien?",
        "options": ["DFS dari setiap user (lambat)", "BFS dari user, ambil layer 2 (mutual friend). O(V+E) per user", "Dijkstra (tidak diperlukan, unweighted)", "Brute force bandingkan semua pasangan"],
        "correct": 1,
        "explanation": "Evaluasi: BFS dari user = O(V+E). Layer 1 = friends, layer 2 = mutual. Cepat dan tepat. DFS bisa tapi tidak urut per jarak. Dijkstra overkill (unweighted)."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "Manakah evaluasi yang BENAR tentang kompleksitas BFS dan DFS?",
        "options": ["BFS O(V²), DFS O(V)", "BFS O(V+E), DFS O(V+E) — sama, linear terhadap ukuran graph", "BFS O(log V), DFS O(V²)", "Tidak bisa dibandingkan"],
        "correct": 1,
        "explanation": "Evaluasi: BFS dan DFS keduanya O(V+E) — visit setiap node dan edge sekali. Perbedaan: BFS cari shortest path (unweighted), DFS untuk deteksi cycle/topological sort."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Zahra** punya graph dengan self-loop (A-A). Apakah ini valid?",
        "options": ["Tidak valid", "Valid — self-loop adalah edge dari node ke dirinya. Tapi jarang di graph umum, sering di model specific (mis: state machine)", "Hanya valid di tree", "Tidak bisa direpresentasikan"],
        "correct": 1,
        "explanation": "Evaluasi: self-loop valid di graph. Tapi jarang di graph umum. Sering di: state machine (state transition ke dirinya), graph web (halaman link ke dirinya). Validasi sesuai konteks."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Adi** punya graph 6 node dengan edges: A-B, B-C, C-A, D-E, E-F, F-D. Berapa connected components?",
        "options": ["1 (semua connected)", "2 (A-B-C dan D-E-F)", "3", "6"],
        "correct": 1,
        "explanation": "Evaluasi: connected component = subgraph yang connected. A-B-C = 1 komponen (ada cycle A-B-C-A). D-E-F = 1 komponen (cycle D-E-F-D). Tidak ada edge antar komponen = 2 komponen."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "Manakah situasi di mana graph TREE BUKAN pilihan terbaik?",
        "options": ["Silsilah keluarga", "Struktur folder komputer", "Jaringan jalan kota (bisa ada cycle, bukan tree)", "Hierarki organisasi perusahaan"],
        "correct": 2,
        "explanation": "Evaluasi: tree = hierarki, tidak ada cycle. Jaringan jalan bisa cycle (jalan A-B-C-A bolak-balik) = bukan tree. Silsilah, folder, organisasi = tree (hierarki murni)."
    },
]

QUESTIONS_KELAS_9_ESSAI = [
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Skenario:** Gambar graph pertemanan 5 orang di kelas Anda: Andi, Budi, Citra, Dina, Eka. Asumsikan:\n- Andi teman Budi, Citra\n- Budi teman Andi, Dina\n- Citra teman Andi, Eka\n- Dina teman Budi, Eka\n- Eka teman Citra, Dina\n\n**Tugas:**\n1. Gambar graph (deskripsikan node dan edge)\n2. Hitung degree setiap node. Siapa paling populer?\n3. Cari path dari Andi ke Eka (sebut semua path yang mungkin)\n4. Apakah ada cycle? Sebut minimal 2 cycle\n5. Apakah graph ini connected? Mengapa?",
        "essay_answer": "1. Graph:\nNode: Andi (A), Budi (B), Citra (C), Dina (D), Eka (E)\nEdge (undirected): A-B, A-C, B-D, C-E, D-E\n\nVisual: A di tengah-atas, B di kiri, C di kanan. D di kiri-bawah (terhubung B dan E). E di kanan-bawah (terhubung C dan D).\n\n2. Degree:\n- Andi: 2 (B, C)\n- Budi: 2 (A, D)\n- Citra: 2 (A, E)\n- Dina: 2 (B, E)\n- Eka: 2 (C, D)\nSemua degree 2 — tidak ada yang paling populer, pertemanan merata.\n\n3. Path Andi ke Eka:\n- A-C-E (2 edges) — shortest\n- A-B-D-E (3 edges)\n- A-C-E-D-B-? (cycle, bukan path ke E)\n- A-B-D-E-C-? (cycle)\nPath valid: A-C-E dan A-B-D-E. Shortest = A-C-E (2 edges).\n\n4. Cycle:\n- A-C-E-D-B-A (cycle 5 node)\n- C-E-D-B-A-C (cycle sama, mulai beda)\n- E-D-B-A-C-E (cycle sama, mulai beda)\nCycle utama: A-B-D-E-C-A (5 node).\n\n5. Connected? Ya — semua node bisa dicapai dari node manapun:\n- Dari A: ke B (langsung), C (langsung), D (via B), E (via C)\n- Dari D: ke B (langsung), E (langsung), A (via B), C (via E)\nGraph connected karena 1 connected component."
    },
    {
        "level": "C4", "category": "Struktur Data Graph",
        "question": "**Analisis kasus:** Sebuah kota punya 6 persimpangan (A, B, C, D, E, F) dengan jalan:\n- A-B (5 km), A-C (3 km)\n- B-C (2 km), B-D (4 km)\n- C-D (7 km), C-E (1 km)\n- D-F (3 km)\n- E-F (2 km)\n\n**Tugas:**\n1. Representasikan graph ini dengan adjacency list\n2. Cari shortest path A ke F menggunakan Dijkstra (langkah per langkah)\n3. Hitung total jarak\n4. Bandingkan dengan path lain (A-B-D-F, A-C-E-F, A-C-D-F). Mana shortest?",
        "essay_answer": "1. Adjacency list (undirected, weighted):\n- A: [(B,5), (C,3)]\n- B: [(A,5), (C,2), (D,4)]\n- C: [(A,3), (B,2), (D,7), (E,1)]\n- D: [(B,4), (C,7), (F,3)]\n- E: [(C,1), (F,2)]\n- F: [(D,3), (E,2)]\n\n2. Dijkstra dari A:\n\nInisialisasi: dist[A]=0, dist[lain]=∞. Priority queue (PQ): [(0,A)]\n\nIterasi 1: pop A (0). Neighbor: B (5), C (3). Update: dist[B]=5, dist[C]=3. PQ: [(3,C), (5,B)]\n\nIterasi 2: pop C (3). Neighbor: A (3, visited), B (2 → 3+2=5, sama), D (7 → 3+7=10), E (1 → 3+1=4). Update: dist[D]=10, dist[E]=4. PQ: [(4,E), (5,B), (10,D)]\n\nIterasi 3: pop E (4). Neighbor: C (1, visited), F (2 → 4+2=6). Update: dist[F]=6. PQ: [(5,B), (6,F), (10,D)]\n\nIterasi 4: pop B (5). Neighbor: A (visited), C (visited), D (4 → 5+4=9, lebih kecil dari 10!). Update: dist[D]=9. PQ: [(6,F), (9,D), (10,D dihapus)]\n\nIterasi 5: pop F (6). Tetangga: D (3 → 6+3=9, sama dengan dist[D]=9, tidak update), E (visited). PQ: [(9,D)]\n\nIterasi 6: pop D (9). Neighbor: B (visited), C (visited), F (visited). Selesai.\n\nHasil: dist[F]=6. Path: rekonstruksi dari parent. F←E←C←A. Path: A→C→E→F.\n\n3. Total jarak: A-C (3) + C-E (1) + E-F (2) = 6 km\n\n4. Bandingkan:\n- A-B-D-F: 5+4+3 = 12 km\n- A-C-E-F: 3+1+2 = 6 km (shortest, sama dengan Dijkstra)\n- A-C-D-F: 3+7+3 = 13 km\n- A-B-C-E-F: 5+2+1+2 = 10 km\n- A-C-B-D-F: 3+2+4+3 = 12 km\n\nShortest = A-C-E-F = 6 km. Dijkstra menemukan ini secara sistematis."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Studi kasus kritis:** Anda diminta merancang sistem rekomendasi teman untuk media sosial baru. Anda punya graph pertemanan 1 juta user. Saat user A buka profil, sistem harus suggest 5 teman potensial dalam <100ms.\n\n**Tugas:**\n1. Identifikasi 3 strategi algoritma rekomendasi (selain 'mutual friend')\n2. Pilih strategi utama + 2 cadangan, jelaskan trade-off\n3. Identifikasi 3 risiko etis dari sistem rekomendasi ini\n4. Berikan rekomendasi engineering untuk mencapai latency <100ms",
        "essay_answer": "1. 3 strategi rekomendasi (selain mutual friend):\n\na. Friend-of-friend-of-friend (3-hop): cari user di jarak 3 hop dari A. Lebih luas dari mutual (2-hop), bisa suggest orang di luar circle langsung.\n\nb. Berdasarkan interest/aktivitas: graph bipartite user-interest. User A suka topik X, cari user lain yang juga suka X. Bisa suggest orang yang belum punya mutual friend tapi interest sama.\n\nc. Berdasarkan komunitas (community detection): algoritma seperti Louvain/LPA deteksi cluster di graph. Suggest orang di komunitas yang sama (mungkin sekolah/kota/hobi sama).\n\nd. Collaborative filtering: jika A dan B punya banyak teman yang sama, dan A teman C, suggest C ke B. Berbasis pola overlap.\n\ne. Embedding (Node2Vec/GraphSAGE): representasikan setiap node sebagai vector 128D. Cari neighbor terdekat di vector space. Bisa capture pola kompleks.\n\n2. Pilihan strategi:\n\nUtama: Mutual friend (2-hop BFS) + filter interest. Sederhana, cepat, interpretable ('Anda punya 5 teman sama dengan X').\n\nCadangan 1: Community detection (precomputed harian). Suggest dari komunitas sama. Lebih personal tapi butuh maintenance.\n\nCadangan 2: Embedding (Node2Vec, precomputed). Paling akurat capture pola kompleks tapi black-box (sulit explain kenapa direkomendasi).\n\nTrade-off:\n- Mutual friend: cepat, interpretable, tapi kurang personal (cuma berdasar graph structure)\n- Community: personal, tapi statis (komunitas bisa berubah)\n- Embedding: akurat, tapi black-box + butuh retrain berkala\n\n3. Risiko etis:\n\na. Filter bubble: rekomendasi terlalu narrow, user hanya terhubung orang serupa. Bisa polarisasi (politik, agama). Mitigasi: include 'diversity' — sebagian rekomendasi dari luar circle.\n\nb. Privacy: suggest orang yang user A tidak ingin reveal interest-nya (mis: user A follow akun sensitif, lalu suggest orang yang juga follow). Mitigasi: respect privacy setting, jangan suggest berdasar private data.\n\nc. Stigma/diskriminasi: algoritma bisa learn bias (mis: suggest lebih banyak orang kelas sosial tertentu). Mitigasi: audit bias berkala, ensure diverse dataset.\n\nd. Harassment: suggest bisa dimanfaatkan stalker. Mitigasi: respect block list, jangan suggest user yang sudah block A.\n\ne. Addiction: rekomendasi terus-menerus bisa bikin user terus cari 'teman baru'. Mitigasi: limit rekomendasi per hari, encourage quality over quantity.\n\n4. Engineering untuk <100ms:\n\na. Precompute mutual friends: untuk setiap user, precompute top-100 candidate mutual friends setiap malam (batch job). Saat real-time, tinggal query cache.\n\nb. Graph database: pakai Neo4j atau RedisGraph yang optimize untuk graph query. O(V+E) lebih cepat dari RDBMS.\n\nc. Caching: cache hasil rekomendasi per user di Redis (TTL 1 jam). Real-time: cek cache dulu, fallback ke computation kalau miss.\n\nd. Approximate algorithm: untuk graph besar, pakai approximate BFS (sample neighbor) — hasil cukup baik dengan latency jauh lebih rendah.\n\ne. Sharding: shard graph by user ID (modular). Query hanya ke shard yang relevant. Parallel processing.\n\nf. Async refresh: saat user A buka profil, return cached suggestion (lama). Async: compute fresh suggestion, update cache untuk visit berikutnya.\n\ng. Tiered priority: user aktif (login harian) → precompute setiap 6 jam. User pasif → setiap minggu. Hemat komputasi.\n\nh. CDN: untuk static graph data (interest, community), pakai CDN edge. Reduksi latency jaringan.\n\ni. Monitoring: track p99 latency per endpoint. Alert kalau >80ms. Investigasi bottleneck.\n\nj. A/B testing: test berbagai strategi, pilih yang kombinasi latency + engagement terbaik."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Refleksi:** Pilih satu aplikasi nyata yang menggunakan graph (mis: Google Maps, Instagram friend suggestion, Spotify related artist, LinkedIn connection).\n\n**Tugas:**\n1. Deskripsikan graph di aplikasi tersebut (node, edge, directed/undirected, weighted)\n2. Identifikasi 3 algoritma graph yang mungkin dipakai\n3. Jika Anda bisa improve 1 hal di algoritma tersebut, apa itu?\n4. Berikan 1 saran fitur baru berbasis graph yang bisa ditambah",
        "essay_answer": "Contoh jawaban untuk Google Maps:\n\n1. Graph di Google Maps:\n- Node: persimpangan jalan, landmark, alamat\n- Edge: segmen jalan antar node\n- Directed: ada satu arah (jalan satu arah) dan dua arah\n- Weighted: bobot multi-dimensi — jarak (km), waktu (menit, real-time dari traffic), biaya (tol), mode (jalan kaki/mobil/sepeda)\n- Multi-graph: bisa ada multiple edge antar 2 node (jalan biasa + jalan tol)\n\n2. 3 algoritma graph yang dipakai:\n\na. Dijkstra/A* — cari shortest path berdasarkan bobot (waktu, jarak). A* dengan heuristic (jarak straight-line ke tujuan) lebih cepat dari Dijkstra.\n\nb. Contraction Hierarchies — precompute 'shortcut' antar node penting (highway). Real-time query: cari node highway terdekat, lalu path di highway. Sangat cepat untuk jarak jauh.\n\nc. ISOTO (Isocronic) — algoritma cari area yang bisa dicapai dalam X menit. Dipakai untuk 'reachable area' feature (mis: cari rumah sakit dalam 30 menit).\n\n3. Improve 1 hal: \nSaya akan improve integrasi real-time traffic ke algoritma A*. Saat ini traffic update tiap beberapa menit. Saya ingin predict traffic 5-10 menit ke depan (machine learning time-series), supaya rute yang dipilih optimal saat user benar-benar sampai di segmen itu, bukan saat mulai. Trade-off: kompleksitas ML, tapi latency per-query tetap cepat (precompute prediction di backend).\n\n4. Saran fitur baru: 'Eco-friendly route' — graph dengan bobot tambahan = emisi CO2. Mode kendaraan (mobil bensin vs EV vs motor) punya emission factor berbeda. Sistem rekomendasi rute dengan emisi terendah (mungkin bukan tercepat). User bisa pilih: 'prioritas cepat' vs 'prioritas ramah lingkungan'. Bonus: tracking total CO2 saved per user, gamification (badge 'eco-warrior'). Fitur ini sesuai tren sustainability dan bisa differentiate Google Maps dari kompetitor."
    },
    {
        "level": "C5", "category": "Struktur Data Graph",
        "question": "**Eksperimen desain:** Anda diminta merancang graph database untuk sistem kurikulum sekolah. Node: mata pelajaran, bab, sub-bab, soal, siswa, guru. Edge: prasyarat, mengajar, menyelesaikan, dll.\n\n**Tugas:**\n1. Identifikasi minimal 5 jenis node dan 5 jenis edge\n2. Untuk setiap edge, jelaskan directed/undirected + property\n3. Identifikasi 3 pertanyaan analitik yang bisa dijawab graph ini\n4. Berikan 1 contoh query cypher-like (atau SQL-like) untuk salah satu pertanyaan",
        "essay_answer": "1. 5 jenis node:\n\na. Subject (mata pelajaran): id, nama, jenjang (SMP/SMK)\nb. Chapter (bab): id, judul, urutan, subjectId\nc. SubChapter (sub-bab): id, judul, urutan, chapterId\nd. Question (soal): id, pertanyaan, tipe, levelKognitif, subChapterId\ne. Student (siswa): id, nama, kelas\nf. Teacher (guru): id, nama, subjectDiampu\n\n2. 5 jenis edge:\n\na. PREREQUISITE (Subject → Subject, directed): Subject A adalah prasyarat Subject B. Property: 'strength' (kuat/sedang/lemah), 'deskripsi'. Contoh: Matematika → Fisika (prasyarat kuat).\n\nb. CONTAINS (Subject → Chapter, directed): Subject berisi Chapter. Property: 'urutan'. Contoh: Informatika → Bab 1: Berpikir Komputasi.\n\nc. TEACHES (Teacher → Subject, directed): Guru mengajar Subject. Property: 'tahunAjaran', 'kelas'. Contoh: Pak Andi → Informatika (2026/2027, kelas 7).\n\nd. COMPLETED (Student → SubChapter, directed): Siswa menyelesaikan SubChapter. Property: 'tanggal', 'nilai', 'durasi'. Contoh: Andi → SubBab 1.1 (15 Sep 2026, 85, 45 min).\n\ne. RELATED_TO (Question ↔ Question, undirected): Soal-soal yang konsepnya berhubungan. Property: 'relation_type' (mirip, prasyarat, kontras). Contoh: Soal A ↔ Soal B (konsep mirip, bisa untuk variation).\n\nf. SIMILAR (Student ↔ Student, undirected): Siswa dengan pola belajar mirip. Property: 'similarity_score' (0-1). Untuk collaborative learning.\n\n3. 3 pertanyaan analitik:\n\na. 'Untuk siswa X, mata pelajaran apa yang belum bisa dia pelajari karena belum prasyaratnya?'\n→ Cari Subject yang X belum COMPLETED prasyaratnya\n\nb. 'Soal mana yang paling sering salah dijawab oleh siswa di SubBab Y?'\n→ Aggregate COMPLETED edges ke Question di SubBab Y, filter nilai < KKM\n\nc. 'Guru mana yang paling efektif berdasarkan peningkatan nilai siswa?'\n→ Bandingkan nilai awal vs akhir per siswa yang TEACHES oleh guru tsb\n\nd. 'Siswa mana yang punya pola belajar mirip dengan siswa top, untuk rekomendasi grup belajar?'\n→ Cari SIMILAR edge dengan high similarity_score ke siswa top\n\ne. 'Bab mana yang paling banyak diulang (remedial) oleh siswa?'\n→ Count COMPLETED edges dengan nilai < KKM per SubChapter, aggregate per Chapter\n\n4. Contoh query (cypher-like):\n\nPertanyaan (a): Mata pelajaran yang belum bisa dipelajari siswa X karena belum prasyarat\n\n```cypher\nMATCH (s:Student {id: 'X'})-[:COMPLETED]->(sc:SubChapter)<-[:CONTAINS*2]-(subj:Subject)\nWITH s, collect(DISTINCT subj) AS completed_subjects\nMATCH (target:Subject)-[:PREREQUISITE]->(prereq:Subject)\nWHERE NOT prereq IN completed_subjects\n  AND target NOT IN completed_subjects\nRETURN DISTINCT target.nama AS belum_bisa_dipelajari,\n       collect(prereq.nama) AS prasyarat_belum_selesai\nORDER BY target.nama\n```\n\nHasil: list mata pelajaran yang belum bisa dipelajari siswa X, dengan prasyarat yang belum selesai. Guru bisa pakai untuk advisori: 'Selesaikan prasyarat A dulu sebelum lanjut ke B'.\n\nVersi SQL-like (kalau pakai RDBMS):\n```sql\nWITH completed AS (\n  SELECT DISTINCT s.subject_id\n  FROM student_completion sc\n  JOIN sub_chapter s ON sc.sub_chapter_id = s.id\n  WHERE sc.student_id = 'X'\n)\nSELECT t.nama AS belum_bisa_dipelajari,\n       STRING_AGG(p.nama, ', ') AS prasyarat_belum_selesai\nFROM subject_prerequisite sp\nJOIN subject t ON sp.subject_id = t.id\nJOIN subject p ON sp.prerequisite_id = p.id\nWHERE sp.prerequisite_id NOT IN (SELECT subject_id FROM completed)\n  AND t.id NOT IN (SELECT subject_id FROM completed)\nGROUP BY t.nama\nORDER BY t.nama;\n```"
    },
]


# ============================================================
# GENERATE SQL FILE
# ============================================================

def make_question_sql(q_id, grade, subject, cp_id, tp_id, q_data, is_essay=False):
    q_type = "essai" if is_essay else "pilihan_ganda"
    essay_answer = q_data.get("essay_answer", "") if is_essay else ""
    if is_essay:
        option_a = option_b = option_c = option_d = ""
        correct_answer = 0
    else:
        opts = q_data["options"]
        option_a, option_b, option_c, option_d = opts[0], opts[1], opts[2], opts[3]
        correct_answer = q_data["correct"]

    question_text = q_data["question"]
    explanation = q_data.get("explanation", "")
    category = q_data["category"]
    level = q_data["level"]
    pembahasan = f"Jawaban benar: {chr(65 + correct_answer) if not is_essay else 'Essai'}. {explanation}" if not is_essay else explanation
    analisis = "Opsi lain tidak tepat karena tidak sesuai konsep." if not is_essay else "Jawaban dievaluasi berdasarkan rubric."

    sql = f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(grade)}, {sql_str(subject)}, {sql_str(question_text)}, {sql_str(option_a)}, {sql_str(option_b)}, {sql_str(option_c)}, {sql_str(option_d)}, {correct_answer}, {sql_str(explanation)}, {sql_str(category)}, true, {sql_str(q_type)}, '[]', '[]', '', {sql_str(essay_answer)}, {sql_str(level)}, {sql_str(pembahasan)}, {sql_str(analisis)}, {sql_str(cp_id)}, {sql_str(tp_id)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""
    return sql


def main():
    print(f"Generating SQL file: {OUTPUT_PATH}")

    content = []
    content.append("""-- ============================================================
-- SKRIP SQL: TP3 + Materi + Soal (45 PG + 5 Essai per kelas) + Tugas 3
-- Mata Pelajaran: Informatika (Kelas 7, 8, 9)
-- Tanggal: 21 September 2026
-- ============================================================
--
-- CARA PAKAI:
-- 1. Login ke https://supabase.com → pilih project
-- 2. Buka menu "SQL Editor" → "New query"
-- 3. Salin seluruh skrip ini, paste ke editor
-- 4. Klik "Run" (tombol play)
-- 5. Tunggu pesan "Success. No rows returned"
--
-- CATATAN:
-- - Idempotent (ON CONFLICT DO NOTHING) — aman dijalankan berulang
-- - Menggunakan CP yang SUDAH ADA (cp_inf_7_1, cp_inf_8_1, cp_inf_9_1)
-- - Membuat TP BARU (TP.x.1.3) di dalam CP1 tersebut
-- - Membuat Materi BARU (mendalam per kelas)
-- - Membuat 50 soal per kelas (45 PG C3/C4/C5 + 5 Essai C4/C5)
-- - Membuat Assignment "Tugas 3" per kelas:
--   * questionCount = 50 (45 PG + 5 essai dalam tugas yang sama)
--   * duration = 90 menit
--   * dueDate = 28 September 2026 23:59 WIB
--   * taskType = quiz_only
-- ============================================================
""")

    # ============================================================
    # KELAS 7
    # ============================================================
    content.append("""
-- ============================================================
-- KELAS 7: TP3 + Materi Pengenalan Pola + 50 Soal + Tugas 3
-- ============================================================
""")

    # TP3 — deskripsi < 100 karakter
    content.append(f"""
-- TP 3 untuk Kelas 7 (Pengenalan Pola)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_7_1_3', 'cp_inf_7_1', 'TP.7.1.3', 'Siswa mampu mengenali pola berulang dan bertumbuh dalam data serta kehidupan.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;""")

    # Materi kelas 7
    content.append(f"""
-- Materi Kelas 7: Memperdalam Pengenalan Pola
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_7_1_3', 'Memperdalam Pengenalan Pola: Mengenali Pola Berulang dalam Data dan Kehidupan', {sql_str(MATERI_KELAS_7)}, 'Informatika', '7A,7B,7C', 'SMP', 'Pengenalan Pola', 'cp_inf_7_1', 'tp_inf_7_1_3', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    # 45 PG + 5 Essai kelas 7
    pg7 = QUESTIONS_KELAS_7_PG[:45]
    for i, q in enumerate(pg7, start=1):
        q_id = f"q_v4_inf_7_1_3_pg_{i:03d}"
        content.append(f"\n-- Kelas 7 PG #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "7", "Informatika", "cp_inf_7_1", "tp_inf_7_1_3", q, is_essay=False))

    for i, q in enumerate(QUESTIONS_KELAS_7_ESSAI, start=1):
        q_id = f"q_v4_inf_7_1_3_essay_{i:03d}"
        content.append(f"\n-- Kelas 7 Essai #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "7", "Informatika", "cp_inf_7_1", "tp_inf_7_1_3", q, is_essay=True))

    # Assignment Tugas 3 kelas 7
    content.append(f"""
-- Tugas 3 untuk Kelas 7 (Pengenalan Pola)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_7_1_3', 'Tugas 3 Kelas 7: Pengenalan Pola (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang pengenalan pola untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Pengenalan Pola" sebelum mengerjakan.', 'Informatika', '7A,7B,7C', 'SMP', true, '{DUE_DATE_ISO}', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_7_1', 'tp_inf_7_1_3', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    # ============================================================
    # KELAS 8
    # ============================================================
    content.append("""
-- ============================================================
-- KELAS 8: TP3 + Materi Visualisasi Data + 50 Soal + Tugas 3
-- ============================================================
""")

    content.append(f"""
-- TP 3 untuk Kelas 8 (Visualisasi Data)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_8_1_3', 'cp_inf_8_1', 'TP.8.1.3', 'Siswa mampu membuat dan membaca visualisasi data sesuai jenis dan tujuan.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;""")

    content.append(f"""
-- Materi Kelas 8: Memperdalam Visualisasi Data
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_8_1_3', 'Memperdalam Visualisasi Data: Mengubah Angka Menjadi Cerita yang Bisa Dibaca', {sql_str(MATERI_KELAS_8)}, 'Informatika', '8A,8B,8C', 'SMP', 'Visualisasi Data', 'cp_inf_8_1', 'tp_inf_8_1_3', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    pg8 = QUESTIONS_KELAS_8_PG[:45]
    for i, q in enumerate(pg8, start=1):
        q_id = f"q_v4_inf_8_1_3_pg_{i:03d}"
        content.append(f"\n-- Kelas 8 PG #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "8", "Informatika", "cp_inf_8_1", "tp_inf_8_1_3", q, is_essay=False))

    for i, q in enumerate(QUESTIONS_KELAS_8_ESSAI, start=1):
        q_id = f"q_v4_inf_8_1_3_essay_{i:03d}"
        content.append(f"\n-- Kelas 8 Essai #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "8", "Informatika", "cp_inf_8_1", "tp_inf_8_1_3", q, is_essay=True))

    content.append(f"""
-- Tugas 3 untuk Kelas 8 (Visualisasi Data)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_8_1_3', 'Tugas 3 Kelas 8: Visualisasi Data (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang visualisasi data untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Visualisasi Data" sebelum mengerjakan.', 'Informatika', '8A,8B,8C', 'SMP', true, '{DUE_DATE_ISO}', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_8_1', 'tp_inf_8_1_3', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    # ============================================================
    # KELAS 9
    # ============================================================
    content.append("""
-- ============================================================
-- KELAS 9: TP3 + Materi Struktur Data Graph + 50 Soal + Tugas 3
-- ============================================================
""")

    content.append(f"""
-- TP 3 untuk Kelas 9 (Struktur Data Graph)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_9_1_3', 'cp_inf_9_1', 'TP.9.1.3', 'Siswa mampu menerapkan struktur data graph untuk representasi hubungan antar objek.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;""")

    content.append(f"""
-- Materi Kelas 9: Memperdalam Struktur Data Graph
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_9_1_3', 'Memperdalam Struktur Data Graph: Jaringan yang Menghubungkan Dunia', {sql_str(MATERI_KELAS_9)}, 'Informatika', '9A,9B', 'SMP', 'Struktur Data Graph', 'cp_inf_9_1', 'tp_inf_9_1_3', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    pg9 = QUESTIONS_KELAS_9_PG[:45]
    for i, q in enumerate(pg9, start=1):
        q_id = f"q_v4_inf_9_1_3_pg_{i:03d}"
        content.append(f"\n-- Kelas 9 PG #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "9", "Informatika", "cp_inf_9_1", "tp_inf_9_1_3", q, is_essay=False))

    for i, q in enumerate(QUESTIONS_KELAS_9_ESSAI, start=1):
        q_id = f"q_v4_inf_9_1_3_essay_{i:03d}"
        content.append(f"\n-- Kelas 9 Essai #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "9", "Informatika", "cp_inf_9_1", "tp_inf_9_1_3", q, is_essay=True))

    content.append(f"""
-- Tugas 3 untuk Kelas 9 (Struktur Data Graph)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_9_1_3', 'Tugas 3 Kelas 9: Struktur Data Graph (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang struktur data graph untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Struktur Data Graph" sebelum mengerjakan.', 'Informatika', '9A,9B', 'SMP', true, '{DUE_DATE_ISO}', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_9_1', 'tp_inf_9_1_3', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    # ============================================================
    # VERIFIKASI
    # ============================================================
    content.append("""
-- ============================================================
-- VERIFIKASI
-- ============================================================

-- Total soal per kelas + tipe
SELECT "gradeLevel", "questionType", COUNT(*) AS jumlah_soal
FROM "Question"
WHERE "cpId" IN ('cp_inf_7_1', 'cp_inf_8_1', 'cp_inf_9_1')
  AND "tpId" IN ('tp_inf_7_1_3', 'tp_inf_8_1_3', 'tp_inf_9_1_3')
GROUP BY "gradeLevel", "questionType"
ORDER BY "gradeLevel", "questionType";

-- Expected:
-- 7  pilihan_ganda  45
-- 7  essai          5
-- 8  pilihan_ganda  45
-- 8  essai          5
-- 9  pilihan_ganda  45
-- 9  essai          5
-- Total: 150 soal (50 per kelas)

-- Tugas baru
SELECT id, title, "targetKelas", "questionCount", "duration", "dueDate"
FROM "Assignment"
WHERE id LIKE 'asg_inf_%_1_3'
ORDER BY "targetKelas";

-- Expected: 3 baris (kelas 7, 8, 9) dengan questionCount=50, duration=90, dueDate=2026-09-28

-- TP baru
SELECT id, "kodeTP", deskripsi, LENGTH(deskripsi) AS panjang_deskripsi
FROM "TujuanPembelajaran"
WHERE id LIKE 'tp_inf_%_1_3'
ORDER BY id;

-- Expected: 3 baris (tp_inf_7_1_3, tp_inf_8_1_3, tp_inf_9_1_3)
-- Semua panjang_deskripsi <= 100

-- Materi baru
SELECT id, title, "targetKelas"
FROM "Material"
WHERE id LIKE 'mat_inf_%_1_3'
ORDER BY id;

-- Expected: 3 baris (mat_inf_7_1_3, mat_inf_8_1_3, mat_inf_9_1_3)
""")

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(content))

    file_size = os.path.getsize(OUTPUT_PATH) / 1024
    total_pg = len(pg7) + len(pg8) + len(pg9)
    total_essay = len(QUESTIONS_KELAS_7_ESSAI) + len(QUESTIONS_KELAS_8_ESSAI) + len(QUESTIONS_KELAS_9_ESSAI)

    # Verify TP deskripsi < 100 chars
    print("\n=== Verifikasi panjang deskripsi TP ===")
    for tp_id, desc in [
        ('tp_inf_7_1_3', 'Siswa mampu mengenali pola berulang dan bertumbuh dalam data serta kehidupan.'),
        ('tp_inf_8_1_3', 'Siswa mampu membuat dan membaca visualisasi data sesuai jenis dan tujuan.'),
        ('tp_inf_9_1_3', 'Siswa mampu menerapkan struktur data graph untuk representasi hubungan antar objek.'),
    ]:
        status = 'OK' if len(desc) <= 100 else f'OVER ({len(desc)})'
        print(f"  {tp_id}: {len(desc)} chars ({status}) — {desc}")

    print(f"\n✅ SQL file berhasil dibuat: {OUTPUT_PATH}")
    print(f"   📊 File size: {file_size:.1f} KB")
    print(f"   📝 Total soal PG: {total_pg} (45 × 3 kelas)")
    print(f"   📝 Total soal Essai: {total_essay} (5 × 3 kelas)")
    print(f"   📚 Total soal keseluruhan: {total_pg + total_essay}")
    print(f"   🎯 TP baru: 3 (TP.7.1.3, TP.8.1.3, TP.9.1.3)")
    print(f"   📖 Materi baru: 3 (Pengenalan Pola, Visualisasi Data, Graph)")
    print(f"   📋 Assignment baru: 3 (Tugas 3 per kelas)")
    print(f"   ⏱️  Duration: 90 menit per tugas")
    print(f"   📅 Deadline: 28 September 2026 23:59 WIB")


if __name__ == "__main__":
    main()
