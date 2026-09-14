#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator SQL: TP2 + Materi + Soal (45 PG + 5 Essai per kelas) + Tugas 2
untuk kelas 7, 8, 9 mata pelajaran Informatika di CP1 yang sudah ada.

Output: /home/z/my-project/download/insert_tp2_materi_soal_tugas2_v2.sql

Isi:
- 3 TP baru (TP.7.1.2, TP.8.1.2, TP.9.1.2) di CP yang sudah ada (cp_inf_7_1, cp_inf_8_1, cp_inf_9_1)
  - Kelas 7: Dekomposisi (Bab 1 - Berpikir Komputasi)
  - Kelas 8: Pencarian Data (Bab 1 - Berpikir Komputasi)
  - Kelas 9: Struktur Data Tree (Bab 1 - Berpikir Komputasi)
- 3 Materi baru (markdown kaya konten, sesuai fokus tiap kelas)
- 50 soal per kelas (45 PG C3-C5 + 5 Essai C4-C5) = 150 soal total
- 3 Assignment "Tugas 2" per kelas:
  - questionCount = 50 (45 PG + 5 essai dalam tugas yang sama)
  - duration = 90 menit
  - dueDate = 21 September 2026 (23:59 WIB)
  - targetKelas = 7A,7B,7C / 8A,8B,8C / 9A,9B
  - cpId = cp_inf_7_1 / cp_inf_8_1 / cp_inf_9_1
  - tpId = tp_inf_7_1_2 / tp_inf_8_1_2 / tp_inf_9_1_2
  - taskType = quiz_only (mixed PG + essai, di-handle quiz-stage.tsx)
"""

import os
import json
from datetime import datetime

OUTPUT_PATH = "/home/z/my-project/download/insert_tp2_materi_soal_tugas2_v2.sql"

# Tanggal deadline: 21 September 2026, 23:59 WIB (UTC+7) = 16:59 UTC
DUE_DATE_ISO = "2026-09-21T23:59:00+07:00"


def sql_escape(text: str) -> str:
    """Escape single quote untuk SQL string literal."""
    if text is None:
        return ""
    return text.replace("'", "''")


def sql_str(text: str) -> str:
    """Wrap text dalam single quote SQL."""
    return f"'{sql_escape(text)}'"


# ============================================================
# KELAS 7: DEKOMPOSISI
# ============================================================

MATERI_KELAS_7 = """# Memperdalam Dekomposisi: Memecah Masalah Besar Menjadi Langkah-Langkah Kecil

## Pengertian Dekomposisi

Dekomposisi adalah salah satu dari empat pilar berpikir komputasional. Secara sederhana, dekomposisi berarti memecah masalah yang besar dan kompleks menjadi bagian-bagian yang lebih kecil dan mudah dikelola. Bayangkan Anda ingin membuat nasi goreng. Anda tidak langsung memasak, tetapi membagi tugas menjadi: menyiapkan bahan, mengiris bumbu, menyalakan kompor, menggoreng nasi, dan menyajikan. Setiap langkah kecil ini lebih mudah diselesaikan daripada langsung berpikir tentang "nasi goreng" secara keseluruhan.

Dekomposisi bukan sekadar memotong tugas, melainkan memotong dengan **strategi**. Bagian-bagian kecil harus logis, berurutan, dan saling terkait. Pemecahan yang buruk justru membuat masalah menjadi lebih rumit, bukan lebih mudah. Oleh karena itu, kita perlu memahami prinsip-prinsip dekomposisi yang baik agar dapat menerapkannya dengan tepat dalam kehidupan sehari-hari maupun dalam dunia teknologi.

## Mengapa Dekomposisi Penting?

Dekomposisi penting karena otak manusia mempunyai keterbatasan dalam menangani informasi sekaligus. Penelitian menunjukkan bahwa manusia hanya dapat memproses sekitar 7±2 informasi pada satu waktu. Ketika menghadapi masalah besar seperti "membuat website sekolah", otak akan kelebihan beban jika mencoba menyelesaikannya sekaligus. Dengan dekomposisi, kita fokus pada satu bagian kecil pada satu waktu, sehingga otak bekerja lebih efektif dan efisien.

Selain itu, dekomposisi memungkinkan pembagian kerja dalam tim. Jika satu orang tidak mungkin menyelesaikan seluruh masalah, beberapa orang dapat mengerjakan bagian yang berbeda secara paralel. Dalam pengembangan perangkat lunak modern, dekomposisi adalah fondasi dari metodologi agile seperti Scrum, di mana pekerjaan dipecah menjadi sprint dan task yang lebih kecil.

## Langkah-Langkah Dekomposisi yang Baik

### 1. Pahami Masalah Secara Menyeluruh
Sebelum memecah, pahami dulu apa tujuan akhirnya. Apa yang ingin dicapai? Apa batasan-batasannya? Tanpa pemahaman yang jelas, pemecahan akan kacau. Contoh: untuk membuat poster, kita harus tahu dulu poster tentang apa, untuk siapa, dan kapan harus selesai.

### 2. Identifikasi Bagian-Bagian Utama
Pecah masalah menjadi 3-7 bagian utama. Lebih dari itu, otak akan kewalahan. Contoh membuat poster: (1) menentukan tema, (2) mencari referensi, (3) membuat sketsa, (4) mewarnai, (5) menambahkan teks.

### 3. Pecah Lagi Jika Perlu
Setiap bagian utama dapat dipecah lagi menjadi sub-bagian. "Mencari referensi" dapat dipecah menjadi: browsing Pinterest, melihat poster lama, membaca buku desain. Pemecahan berlapis ini disebut hierarki dekomposisi.

### 4. Urutkan Langkah Secara Logis
Beberapa langkah harus dikerjakan sebelum langkah lain. Mewarnai sebelum sketsa selesai tidak masuk akal. Tentukan urutan yang logis agar tidak ada langkah yang menghambat langkah lain.

### 5. Verifikasi Kelengkapan
Setelah dekomposisi selesai, periksa: apakah semua bagian penting sudah tercakup? Apakah ada yang terlewat? Verifikasi mencegah kejutan di tengah pengerjaan.

## Contoh Dekomposisi dalam Kehidupan Sehari-Hari

### Contoh 1: Menghadapi Ulangan
Masalah besar: "Lulus ulangan matematika dengan nilai bagus."
Pemecahan:
- Minggu 1: Pelajari bab 1 (aljabar) — baca buku, kerjakan 10 soal
- Minggu 2: Pelajari bab 2 (geometri) — baca buku, kerjakan 10 soal
- Minggu 3: Pelajari bab 3 (statistika) — baca buku, kerjakan 10 soal
- Minggu 4: Review semua bab + kerjakan tryout
- Hari sebelum ulangan: tidur cukup, sarapan, baca ringkasan

### Contoh 2: Merencanakan Pesta Ulang Tahun
Masalah besar: "Pesta ulang tahun yang menyenangkan."
Pemecahan:
- Tentukan tema dan tanggal
- Buat daftar tamu
- Pilih lokasi dan kirim undangan
- Rencanakan makanan dan minuman
- Siapkan dekorasi dan hiburan
- Hari-H: eksekusi rencana

### Contoh 3: Membuat Video Pembelajaran
Masalah besar: "Video pembelajaran 5 menit tentang fotosintesis."
Pemecahan:
- Riset materi fotosintesis
- Tulis skrip
- Buat storyboard
- Rekam voice over
- Kumpulkan gambar/animasi
- Edit video
- Tambahkan musik latar
- Render dan upload

## Dekomposisi dalam Pemrograman

Dalam dunia pemrograman, dekomposisi diwujudkan dalam bentuk **fungsi** atau **modul**. Sebuah program besar dipecah menjadi fungsi-fungsi kecil yang masing-masing melakukan satu tugas spesifik. Contoh: program kalkulator dapat dipecah menjadi fungsi `tambah()`, `kurang()`, `kali()`, `bagi()`. Setiap fungsi diuji secara terpisah sebelum digabungkan.

Dekomposisi juga diterapkan dalam struktur file proyek: folder `css/` untuk styling, `js/` untuk logika, `images/` untuk gambar. Pembagian ini membuat kode lebih mudah dipelihara dan dikembangkan.

## Kesalahan Umum dalam Dekomposisi

1. **Pemecahan terlalu halus** — setiap detail dipecah sampai tingkat mikro, sehingga mengaburkan gambaran besar. Solusi: batasi hingga 3-5 level hierarki.
2. **Pemecahan tidak seimbang** — satu bagian sangat detail, bagian lain sangat kasar. Solusi: pakai kriteria konsisten (waktu, kompleksitas, atau sumber daya).
3. **Mengabaikan dependensi** — bagian-bagian dianggap independen padahal saling tergantung. Solusi: petakan dependensi sebelum eksekusi.
4. **Tidak ada verifikasi** — pemecahan dianggap selesai tanpa dicek. Solusi: selalu lakukan review sebelum mulai mengerjakan.

## Latihan Self-Assessment

Setelah membaca materi ini, coba pecahkan masalah berikut dengan dekomposisi yang baik: "Anda ingin mengikuti lomba robotik tingkat nasional dalam 3 bulan." Buat hierarki dekomposisi 2 level (bagian utama + sub-bagian). Diskusikan dengan teman apakah pemecahan Anda sudah logis dan lengkap.
"""

QUESTIONS_KELAS_7_PG = [
    # ── C3 (Menerapkan) — 15 soal ──
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "**Andi** ingin membuat nasi goreng untuk pertama kalinya. Langkah dekomposisi yang PALING tepat adalah...",
        "options": [
            "Langsung masak dan improvisasi di tengah jalan",
            "Pecah menjadi: siapkan bahan, iris bumbu, nyalakan kompor, goreng nasi, sajikan",
            "Tonton video masak lalu coba tanpa rencana",
            "Minta orang lain memasakkan saja"
        ],
        "correct": 1,
        "explanation": "Dekomposisi yang baik memecah tugas besar menjadi langkah kecil yang berurutan dan logis: siapkan bahan, iris bumbu, nyalakan kompor, goreng, sajikan."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "**Siti** mendapat tugas membuat poster kemerdekaan. Ia membagi tugas menjadi: tentukan tema, cari referensi, sketsa, warnai, tambah teks. Langkah yang PALING tepat selanjutnya adalah...",
        "options": [
            "Langsung mulai dari warnai saja",
            "Verifikasi kelengkapan: apakah semua bagian penting sudah tercakup?",
            "Tidak perlu urutan, kerjakan yang paling mudah dulu",
            "Tambahkan langkah baru tanpa pertimbangan"
        ],
        "correct": 1,
        "explanation": "Setelah pemecahan awal, langkah wajib adalah verifikasi kelengkapan untuk memastikan tidak ada bagian penting yang terlewat."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "Manakah contoh dekomposisi yang BENAR untuk masalah 'lulus ulangan matematika'?",
        "options": [
            "Belajar saja sampai pusing",
            "Pecah per bab: pelajari aljabar minggu 1, geometri minggu 2, statistika minggu 3, tryout minggu 4",
            "Hanya berdoa tanpa belajar",
            "Menyontek teman saat ulangan"
        ],
        "correct": 1,
        "explanation": "Dekomposisi memecah tujuan besar menjadi langkah-langkah kecil per minggu dengan fokus yang jelas pada setiap periode."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "**Budi** ingin membuat video pembelajaran 5 menit. Ia memecah menjadi: riset materi, tulis skrip, rekam voice over, edit video. Apa yang KURANG dari dekomposisi ini?",
        "options": [
            "Tidak ada yang kurang, sudah lengkap",
            "Tidak ada langkah storyboard dan render/upload",
            "Terlalu banyak langkah",
            "Tidak ada tahap menulis skrip"
        ],
        "correct": 1,
        "explanation": "Dekomposisi video pembelajaran idealnya mencakup: riset, skrip, storyboard, rekam, kumpulkan gambar, edit, render. Langkah storyboard dan render/upload terlewat."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "Saat membuat pesta ulang tahun, langkah mana yang SEBAIKNYA dikerjakan PALING AWAL?",
        "options": [
            "Memesan kue",
            "Tentukan tema dan tanggal",
            "Beli dekorasi",
            "Sewa MC"
        ],
        "correct": 1,
        "explanation": "Menentukan tema dan tanggal adalah fondasi. Keputusan lain (kue, dekorasi, MC) bergantung pada tema dan tanggal tersebut."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "**Dina** membuat program kalkulator. Ia membagi menjadi fungsi `tambah()`, `kurang()`, `kali()`, `bagi()`. Prinsip dekomposisi apa yang diterapkan?",
        "options": [
            "Pengenalan pola",
            "Abstraksi",
            "Algoritma",
            "Memecah masalah besar menjadi fungsi-fungsi kecil yang spesifik"
        ],
        "correct": 3,
        "explanation": "Memecah program besar menjadi fungsi-fungsi kecil dengan tugas spesifik adalah contoh dekomposisi dalam pemrograman."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "Manakah urutan dekomposisi yang BENAR untuk menulis esai 3 paragraf?",
        "options": [
            "Tulis paragraf 3, lalu 2, lalu 1",
            "Tulis kesimpulan dulu, baru isi, baru pendahuluan",
            "Riset, susun kerangka, tulis pendahuluan, tulis isi, tulis kesimpulan, revisi",
            "Langsung tulis tanpa kerangka"
        ],
        "correct": 2,
        "explanation": "Urutan logis: riset dulu, lalu kerangka, kemudian tulis berurutan (pendahuluan → isi → kesimpulan), terakhir revisi."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "**Eka** ingin merakit komputer. Ia memecah menjadi: siapkan alat, pasang CPU ke motherboard, pasang RAM, pasang storage, pasang PSU, pasang motherboard ke casing, hubungkan kabel. Apa prinsip yang harus diperhatikan?",
        "options": [
            "Urutan tidak penting, yang penting cepat selesai",
            "Urutan logis karena ada bagian yang harus dipasang sebelum bagian lain",
            "Hanya fokus pada bagian yang mudah",
            "Mulai dari bagian yang paling sulit"
        ],
        "correct": 1,
        "explanation": "Dekomposisi harus memperhatikan urutan logis dan dependensi: CPU ke motherboard sebelum motherboard ke casing, PSU setelah komponen lain."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "Saat dekomposisi, mengapa sebaiknya dibatasi 3-7 bagian utama?",
        "options": [
            "Supaya tidak terlalu banyak dikerjakan",
            "Karena otak manusia terbatas menangani sekitar 7±2 informasi pada satu waktu",
            "Agar terlihat rapi saja",
            "Karena aturan matematika"
        ],
        "correct": 1,
        "explanation": "Penelitian psikologi kognitif menunjukkan otak manusia hanya dapat memproses sekitar 7±2 informasi sekaligus, sehingga pemecahan sebaiknya tidak lebih dari 7 bagian utama."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "Apa manfaat UTAMA dekomposisi dalam kerja tim?",
        "options": [
            "Membuat tugas terlihat sulit",
            "Memungkinkan pembagian kerja, beberapa orang mengerjakan bagian berbeda secara paralel",
            "Memperpanjang waktu pengerjaan",
            "Menghilangkan tanggung jawab individu"
        ],
        "correct": 1,
        "explanation": "Dekomposisi memungkinkan pembagian kerja paralel — anggota tim yang berbeda mengerjakan bagian berbeda secara bersamaan, mempercepat penyelesaian."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "**Fajar** membuat daftar belanja: beras, minyak, gula, garam, telur, sabun, pasta gigi, shampo, tisue, air mineral. Ia lalu mengelompokkan menjadi: kebutuhan dapur, kebutuhan mandi, kebutuhan rumah tangga. Apa yang ia lakukan?",
        "options": [
            "Abstraksi saja",
            "Dekomposisi dengan pengelompokan kategori (sub-bagian)",
            "Pengenalan pola",
            "Algoritma"
        ],
        "correct": 1,
        "explanation": "Mengelompokkan item ke dalam kategori adalah bentuk dekomposisi hierarkis: masalah besar (10 item) dipecah menjadi 3 kategori yang lebih mudah dikelola."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "Manakah contoh dekomposisi yang BURUK?",
        "options": [
            "Membuat website: pecah menjadi front-end, back-end, database",
            "Membuat makanan: pecah menjadi sarapan, makan siang, makan malam",
            "Belajar ujian: langsung baca semua bab sekaligus tanpa rencana",
            "Belajar ujian: pecah per bab dengan jadwal mingguan"
        ],
        "correct": 2,
        "explanation": "Membaca semua bab sekaligus tanpa rencana BUKAN dekomposisi karena tidak ada pemecahan terstruktur. Opsi lain adalah contoh dekomposisi yang baik."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "Hierarki dekomposisi adalah...",
        "options": [
            "Memecah masalah lalu memecah lagi setiap bagian menjadi sub-bagian (pemecahan berlapis)",
            "Mengurutkan langkah dari yang paling sulit",
            "Menggambar diagram alir",
            "Membuat daftar belanja"
        ],
        "correct": 0,
        "explanation": "Hierarki dekomposisi adalah pemecahan berlapis: masalah utama dipecah menjadi bagian, setiap bagian dipecah lagi menjadi sub-bagian, dan seterusnya."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "**Gita** akan membersihkan kamar yang berantakan. Dekomposisi yang tepat adalah...",
        "options": [
            "Rapikan tempat tidur, sapu lantai, pel lantai, rapikan meja, buang sampah",
            "Langsung tidur saja",
            "Bersihkan sebagian saja setiap hari tanpa rencana",
            "Pindahkan semua barang ke luar kamar"
        ],
        "correct": 0,
        "explanation": "Pemecahan menjadi tugas spesifik berurutan (rapikan tidur, sapu, pel, rapikan meja, buang sampah) adalah dekomposisi yang baik."
    },
    {
        "level": "C3", "category": "Dekomposisi",
        "question": "Apa langkah PERTAMA yang harus dilakukan sebelum melakukan dekomposisi?",
        "options": [
            "Langsung pecah masalah",
            "Pahami masalah secara menyeluruh: tujuan, batasan, konteks",
            "Tulis kode program",
            "Cari orang yang bisa membantu"
        ],
        "correct": 1,
        "explanation": "Sebelum memecah, kita harus memahami dulu apa masalahnya. Tanpa pemahaman, pemecahan akan kacau dan tidak terarah."
    },
    # ── C4 (Menganalisis) — 15 soal ──
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Perhatikan dekomposisi berikut:\n\n**Masalah:** Membuat presentasi kelompok.\n**Pecahan:** (1) Bagi tugas anggota, (2) Riset materi, (3) Buat slide, (4) Latihan presentasi.\n\nBagian mana yang kemungkinan besar TIDAK seimbang dibandingkan yang lain dalam hal waktu?",
        "options": [
            "(1) Bagi tugas anggota — terlalu singkat dibandingkan riset dan slide",
            "(2) Riset materi — biasanya paling lama",
            "(3) Buat slide — biasanya paling cepat",
            "(4) Latihan presentasi — biasanya paling lama"
        ],
        "correct": 1,
        "explanation": "Analisis: riset materi biasanya paling lama karena membaca banyak sumber, sementara bagi tugas cepat, buat slide sedang, latihan presentasi singkat. Pemecahan yang baik memperhatikan keseimbangan waktu."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "**Hadi** memecah masalah 'membuat website sekolah' menjadi: (a) desain UI, (b) koding front-end, (c) koding back-end, (d) setup database. Dependensi mana yang PALING logis?",
        "options": [
            "Database → back-end → front-end → desain UI",
            "Desain UI → front-end → back-end → database",
            "Desain UI dan database bisa paralel → back-end setelah database → front-end setelah UI",
            "Semua bisa dikerjakan bersamaan tanpa urutan"
        ],
        "correct": 2,
        "explanation": "Analisis dependensi: desain UI dan setup database tidak saling bergantung, bisa paralel. Back-end butuh database. Front-end butuh desain UI. Ini pemecahan dengan pertimbangan dependensi yang baik."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Dekomposisi mana yang menunjukkan KETIDAKSEIMBANGAN yang paling jelas?",
        "options": [
            "Belajar: bab 1 (1 jam), bab 2 (1 jam), bab 3 (1 jam)",
            "Belajar: bab 1 (10 menit), bab 2 (5 jam), bab 3 (10 menit)",
            "Belajar: bab 1 (2 jam), bab 2 (2 jam), bab 3 (2 jam)",
            "Belajar: bab 1 (1 jam), bab 2 (1.5 jam), bab 3 (1 jam)"
        ],
        "correct": 1,
        "explanation": "Opsi B sangat tidak seimbang: bab 2 (5 jam) vs bab 1 dan 3 (10 menit). Pemecahan tidak seimbang mengindikasikan kriteria pemecahan tidak konsisten."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Mengapa pemecahan terlalu halus (mikro) bisa menjadi masalah?",
        "options": [
            "Karena membuat pekerjaan terlihat mudah",
            "Karena mengaburkan gambaran besar dan menambah biaya koordinasi antar-langkah",
            "Karena melanggar aturan matematika",
            "Karena otak tidak bisa memproses informasi kecil"
        ],
        "correct": 1,
        "explanation": "Analisis: pemecahan terlalu halus membuat gambaran besar hilang, koordinasi antar-langkah mikro menjadi beban tersendiri, dan dokumentasi membengkak. Solusinya batasi 3-5 level hierarki."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "**Ira** membuat dekomposisi: (1) siapkan bahan, (2) masak, (3) sajikan. Lalu ia pecah lagi (2) masak menjadi: (2a) tumis bumbu, (2b) masukkan bahan utama, (2c) beri bumbu, (2d) aduk dan cicip. Apa yang dilakukan Ira?",
        "options": [
            "Membuat algoritma baru",
            "Membuat hierarki dekomposisi (pemecahan berlapis)",
            "Membuat pengenalan pola",
            "Membuat abstraksi"
        ],
        "correct": 1,
        "explanation": "Analisis: Ira memecah bagian utama (masak) menjadi sub-bagian. Ini hierarki dekomposisi level 2, yang memungkinkan detail lebih dalam pada bagian kompleks."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Manakah yang BUKAN termasuk langkah-langkah dekomposisi yang baik?",
        "options": [
            "Pahami masalah secara menyeluruh",
            "Identifikasi bagian-bagian utama",
            "Pecah lagi jika perlu",
            "Langsung mulai tanpa rencana"
        ],
        "correct": 3,
        "explanation": "Analisis: 'Langsung mulai tanpa rencana' adalah kebalikan dari dekomposisi. Langkah yang benar adalah: pahami masalah → identifikasi bagian utama → pecah lagi jika perlu → urutkan logis → verifikasi kelengkapan."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Perhatikan daftar tugas harian berikut:\n\n**Tugas:** (1) Mandi, (2) Sarapan, (3) Berangkat sekolah, (4) Belajar di sekolah, (5) Pulang, (6) Makan malam, (7) Tidur.\n\nJika satu tugas hilang, yang mana yang akan paling mengacaukan jadwal?",
        "options": [
            "Mandi",
            "Sarapan",
            "Berangkat sekolah",
            "Belajar di sekolah"
        ],
        "correct": 2,
        "explanation": "Analisis: 'berangkat sekolah' adalah jembatan kritis antara pagi di rumah dan aktivitas sekolah. Tanpa berangkat, semua aktivitas sekolah gagal. Dependensi ini paling kritis."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "**Joko** memecah masalah 'lulus ujian' menjadi 10 langkah yang sangat detail sampai level mikro. Apa masalahnya?",
        "options": [
            "Pemecahan terlalu kasar",
            "Pemecahan terlalu halus — mengaburkan gambaran besar dan menambah beban koordinasi",
            "Tidak ada pemecahan",
            "Pemecahan tidak seimbang"
        ],
        "correct": 1,
        "explanation": "Analisis: 10 langkah mikro tergolong terlalu halus. Otak sulit menangani >9 informasi sekaligus, dan koordinasi antar-langkah mikro menjadi beban."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Dalam pengembangan perangkat lunak, dekomposisi sering diwujudkan sebagai...",
        "options": [
            "Algoritma pengurutan",
            "Fungsi/modul: program besar dipecah menjadi fungsi-fungsi kecil dengan tugas spesifik",
            "Struktur data tree",
            "Operator pencarian"
        ],
        "correct": 1,
        "explanation": "Analisis: dalam pemrograman, dekomposisi diwujudkan sebagai fungsi/modul. Program kalkulator dipecah menjadi fungsi tambah(), kurang(), kali(), bagi()."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "**Kiki** mengelompokkan dekomposisi 'membuat aplikasi' menjadi: front-end, back-end, database, deployment. Ia lalu menugaskan 4 orang masing-masing satu bagian. Apa risiko strategi ini?",
        "options": [
            "Tidak ada risiko, sangat ideal",
            "Risiko dependensi: front-end butuh data back-end, back-end butuh skema database — perlu koordinasi dan kontrak API awal",
            "Risiko waktu: semua akan selesai bersamaan",
            "Risiko biaya: 4 orang terlalu banyak"
        ],
        "correct": 1,
        "explanation": "Analisis dependensi: front-end butuh API contract dari back-end, back-end butuh skema dari database. Tanpa koordinasi awal, integrasi akhir akan gagal. Strategi paralel butuh kontrak API yang jelas."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Manakah dekomposisi yang menunjukkan kesalahan 'mengabaikan dependensi'?",
        "options": [
            "Bangun → mandi → sarapan → berangkat",
            "Berangkat → bangun → mandi → sarapan",
            "Mandi → sarapan → bangun → berangkat",
            "Sarapan → mandi → bangun → berangkat"
        ],
        "correct": 1,
        "explanation": "Analisis: 'berangkat' sebelum 'bangun' jelas tidak logis. Dependensi: harus bangun dulu, lalu mandi, lalu sarapan, baru berangkat. Opsi A adalah urutan yang benar."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Saat verifikasi kelengkapan dekomposisi 'pesta ulang tahun', apa yang PALING sering terlewat?",
        "options": [
            "Tentukan tema",
            "Buat daftar tamu",
            "Siapkan trash bag untuk dibersihkan setelah pesta",
            "Kirim undangan"
        ],
        "correct": 2,
        "explanation": "Analisis: orang sering fokus pada persiapan (tema, tamu, undangan, makanan) tetapi lupa tahap 'paska-acara' (kebersihan, ucapan terima kasih). Ini kesalahan verifikasi kelengkapan."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "**Lia** dekomposisi 'belajar ulangan' menjadi: (1) baca bab 1, (2) kerjakan latihan bab 1, (3) baca bab 2, (4) kerjakan latihan bab 2, ..., (10) kerjakan latihan bab 5. Apa ciri pemecahan ini?",
        "options": [
            "Pemecahan tidak seimbang",
            "Pemecahan dengan pola berulang (pengenalan pola dalam dekomposisi)",
            "Pemecahan terlalu halus",
            "Tidak ada dekomposisi"
        ],
        "correct": 1,
        "explanation": "Analisis: pola 'baca bab N, kerjakan latihan bab N' berulang 5 kali. Ini menunjukkan pengenalan pola dalam dekomposisi — bagian-bagian memiliki struktur yang sama."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Mengapa dekomposisi yang baik membuat kode program lebih mudah diuji?",
        "options": [
            "Karena kode jadi lebih panjang",
            "Karena setiap fungsi kecil dapat diuji secara terpisah sebelum digabungkan",
            "Karena tidak perlu pengujian lagi",
            "Karena kode jadi lebih cepat dieksekusi"
        ],
        "correct": 1,
        "explanation": "Analisis: fungsi kecil yang spesifik dapat diuji unit-test secara independen. Jika semua unit lulus uji, integrasi akan lebih mudah. Tanpa dekomposisi, bug sulit dilacak."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "**Maman** punya masalah 'rumah berantakan'. Ia memecah menjadi: bersihkan kamar tidur, bersihkan dapur, bersihkan kamar mandi, bersihkan ruang tamu, bersihkan teras. Lalu ia kerjakan berurutan. Apa KELEMAHAN strategi ini?",
        "options": [
            "Tidak ada kelemahan",
            "Tidak paralel — jika ada anggota keluarga lain, mereka bisa membantu mengerjakan bagian berbeda bersamaan",
            "Terlalu banyak bagian",
            "Urutan salah"
        ],
        "correct": 1,
        "explanation": "Analisis: dekomposisi sudah benar, tapi strategi eksekusi berurutan tidak efisien jika ada tenaga bantu. Eksekusi paralel dapat mempercepat 4-5 kali lipat."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "Dalam Scrum (metodologi pengembangan perangkat lunak), pekerjaan dipecah menjadi sprint dan task. Ini adalah contoh dekomposisi pada level...",
        "options": [
            "Hanya level manajerial",
            "Level metodologi: memungkinkan tim besar bekerja paralel dengan iterasi singkat",
            "Level teknis saja",
            "Bukan dekomposisi"
        ],
        "correct": 1,
        "explanation": "Analisis: Scrum memecah proyek besar menjadi sprint (2-4 minggu), lalu sprint dipecah menjadi task harian. Ini dekomposisi level metodologi yang memungkinkan iterasi dan paralelisme."
    },
    # ── C5 (Mengevaluasi) — 15 soal ──
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Nina** dan **Omar** sama-sama memecah masalah 'membuat blog pribadi'. Nina pecah jadi: desain, tulis konten, deploy. Omar pecah jadi: beli domain, setup hosting, install WordPress, tulis artikel pertama, promote di media sosial. Dekomposisi mana yang LEBIH BAIK dan mengapa?",
        "options": [
            "Nina — lebih singkat dan abstrak",
            "Omar — lebih konkret, dapat ditugaskan, dan tiap langkah jelas kapan selesai",
            "Sama-sama baik",
            "Keduanya buruk"
        ],
        "correct": 1,
        "explanation": "Evaluasi: dekomposisi Omar lebih baik karena setiap langkah konkret (bisa diukur selesai atau tidak), dapat ditugaskan ke orang berbeda, dan jelas deliverable-nya. Pemecahan Nina terlalu abstrak."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Manakah dekomposisi yang sebaiknya DITOLAK dan dilakukan ulang?",
        "options": [
            "Belajar: pecah per bab dengan jadwal mingguan",
            "Membuat website: front-end, back-end, database",
            "Membuat makanan: pecah menjadi masak, sajikan, makan, cuci piring, masak lagi",
            "Belajar: pecah per topik dengan latihan soal"
        ],
        "correct": 2,
        "explanation": "Evaluasi: opsi C salah karena 'masak lagi' adalah pengulangan yang menandakan dekomposisi tidak lengkap atau tidak logis. Setelah cuci piring, siklus seharusnya tidak kembali ke 'masak lagi' dalam konteks yang sama."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Pak Guru** memberi tugas: buat dekomposisi untuk 'mengikuti lomba robotik 3 bulan'. Siswa A pecah jadi 4 tahap bulanan. Siswa B pecah jadi 20 tahap harian. Mana yang SEHARUSNYA dipilih?",
        "options": [
            "Siswa A — 4 tahap bulanan lebih seimbang dengan horison waktu 3 bulan",
            "Siswa B — 20 tahap harian lebih detail",
            "Keduanya sama baiknya",
            "Tergantung mood siswa"
        ],
        "correct": 0,
        "explanation": "Evaluasi: untuk horison 3 bulan, 4 tahap bulanan memberi gambaran besar yang jelas tanpa beban koordinasi mikro. 20 tahap harian terlalu halus dan mengaburkan gambaran besar. Detail harian bisa dibuat saat eksekusi, bukan saat dekomposisi awal."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Manakah kriteria dekomposisi yang BAIK?",
        "options": [
            "Bagian saling tumpang tindih agar tidak ada yang terlewat",
            "Bagian saling lepas (mutually exclusive) dan kolektif lengkap (collectively exhaustive)",
            "Bagian sembarang asalkan banyak",
            "Bagian semua sama ukurannya"
        ],
        "correct": 1,
        "explanation": "Evaluasi: prinsip MECE (Mutually Exclusive, Collectively Exhaustive) adalah standar emas dekomposisi. Tidak ada bagian yang tumpang tindih (efisien) dan semua aspek tercakup (lengkap)."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Qori** memecah masalah 'membuat aplikasi mobile' menjadi: UI design, coding, testing, deployment. Kritik mana yang PALING tepat?",
        "options": [
            "Terlalu banyak bagian",
            "Bagian 'coding' terlalu besar dibandingkan yang lain — sebaiknya dipecah lagi jadi front-end, back-end, integrasi",
            "Tidak ada testing",
            "Tidak ada deployment"
        ],
        "correct": 1,
        "explanation": "Evaluasi: 'coding' adalah black box yang menelan 60-70% effort. UI design, testing, deployment masing-masing 10-15%. Pemecahan tidak seimbang. Solusi: pecah 'coding' jadi sub-bagian."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Manakah situasi di mana dekomposisi TIDAK diperlukan?",
        "options": [
            "Tugas kompleks dengan banyak dependensi",
            "Proyek dengan tim besar",
            "Tugas sederhana yang bisa diselesaikan dalam 5 menit tanpa banyak langkah",
            "Pembuatan aplikasi besar"
        ],
        "correct": 2,
        "explanation": "Evaluasi: tugas sederhana (mis: 'minum air') tidak perlu dekomposisi formal. Overhead pemecahan justru memperlambat. Dekomposisi dibutuhkan saat kompleksitas > kapasitas otak short-term."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Rina** dekomposisi 'menulis esai 500 kata' menjadi: (1) pilih topik, (2) riset, (3) kerangka, (4) tulis, (5) revisi. **Santi** dekomposisi menjadi: (1) tulis pendahuluan, (2) tulis isi 1, (3) tulis isi 2, (4) tulis kesimpulan. Mana LEBIH BAIK?",
        "options": [
            "Santi — lebih langsung ke tulisan",
            "Rina — ada tahap riset, kerangka, dan revisi yang krusial untuk kualitas esai",
            "Sama baiknya",
            "Tergantung panjang esai"
        ],
        "correct": 1,
        "explanation": "Evaluasi: dekomposisi Rina lebih baik karena mencakup riset (dasar konten), kerangka (struktur), dan revisi (kualitas). Santi langsung menulis tanpa riset/kerangka, menghasilkan esai dangkal."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Apa kriteria TERBAIK untuk menilai apakah dekomposisi sudah 'selesai'?",
        "options": [
            "Jumlah bagian sudah genap 7",
            "Setiap bagian dapat diselesaikan oleh satu orang dalam waktu yang wajar, dan gabungannya menutupi seluruh masalah",
            "Bagian tidak saling berhubungan",
            "Bagian semua berukuran sama persis"
        ],
        "correct": 1,
        "explanation": "Evaluasi: dekomposisi selesai jika (1) setiap bagian actionable (satu orang, waktu wajar), (2) kolektif lengkap (collectively exhaustive), (3) tidak ada tumpang tindih (mutually exclusive). Ini prinsip MECE."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Tono** memecah 'belajar ulangan harian' menjadi 50 langkah mikro. Setelah evaluasi, ia menyadari terlalu halus. Solusi TERBAIK adalah...",
        "options": [
            "Hapus semua langkah, mulai dari nol",
            "Gabungkan langkah-langkah yang berdekatan menjadi 5-7 kelompok besar (re-dekomposisi)",
            "Tambah lebih banyak langkah lagi",
            "Pertahankan karena detail itu baik"
        ],
        "correct": 1,
        "explanation": "Evaluasi: re-dekomposisi (gabungkan langkah mikro jadi kelompok besar) adalah solusi. 50 langkah mikro → 5-7 kelompok macro lebih mudah dikelola. Ini iterasi dekomposisi yang sehat."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Dekomposisi untuk masalah 'mengurangi penggunaan plastik di sekolah'. Manakah yang PALING tepat secara prinsip MECE?",
        "options": [
            "Edukasi siswa, ganti plastik dengan kertas, kurangi plastik di kantin — bagian tumpang tindih",
            "Kantin (ganti wadah), kelas (stop sedotan), acara sekolah (stop botol plastik), administrasi (stop print) — lepas & lengkap",
            "Edukasi, sosialisasi, kampanye — tumpang tindih",
            "Kantin, kelas, kantin lagi, acara — tumpang tindih"
        ],
        "correct": 1,
        "explanation": "Evaluasi: opsi B adalah MECE — kantin, kelas, acara, administrasi adalah domain yang lepas (tidak overlap) dan kolektif lengkap (mencakup semua area sekolah). Opsi lain tumpang tindih atau tidak lengkap."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Umar** dekomposisi masalah 'membuat game sederhana' menjadi: (1) desain karakter, (2) desain level, (3) coding, (4) musik, (5) testing. Ia kerjakan berurutan. Apa kritik Anda?",
        "options": [
            "Urutan benar, tidak ada kritik",
            "Testing seharusnya tidak terakhir — testing harus dilakukan iteratif selama coding, bukan setelahnya",
            "Tidak ada desain UI",
            "Tidak ada deploy"
        ],
        "correct": 1,
        "explanation": "Evaluasi: testing setelah coding selesai sepenuhnya adalah anti-pattern. Testing harus iteratif (unit test per fitur). Jika testing hanya di akhir, bug akumulasi sulit diperbaiki."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Manakah dekomposisi yang BURUK untuk masalah 'menyelesaikan PR 5 mapel dalam 1 malam'?",
        "options": [
            "Urutkan berdasarkan deadline → kerjakan dari yang paling dekat deadline",
            "Urutkan berdasarkan tingkat kesulitan → kerjakan yang sulit saat masih segar",
            "Kerjakan semua secara acak, lompat-lompat antar mapel",
            "Bagi waktu 30 menit per mapel, kerjakan berurutan"
        ],
        "correct": 2,
        "explanation": "Evaluasi: lompat-lompat antar mapel (context switching) adalah strategi buruk — otak perlu 5-10 menit untuk masuk kembali ke konteks. Lebih baik fokus satu mapel sampai selesai."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Mengapa dekomposisi 'membuat aplikasi menjadi 100 fungsi mikro' bisa jadi masalah meskipun terlihat rapi?",
        "options": [
            "Tidak masalah, 100 fungsi mikro bagus",
            "Overhead koordinasi antar-fungsi bisa melebihi manfaat — batasi 7±2 fungsi per modul",
            "Karena fungsi mikro lambat",
            "Karena tidak ada dokumentasi"
        ],
        "correct": 1,
        "explanation": "Evaluasi: 100 fungsi mikro menyebabkan overhead komunikasi antar-fungsi (call stack, parameter passing) yang bisa melebihi waktu eksekusi fungsi itu sendiri. Prinsip 7±2 per modul lebih sehat."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Vera** harus memilih antara 2 strategi dekomposisi proyek: (A) top-down — pecah dari masalah utama ke sub-bagian, (B) bottom-up — kumpulkan ide-ide kecil lalu gabungkan. Kapan strategi A LEBIH BAIK?",
        "options": [
            "Saat masalah belum jelas dan perlu eksplorasi",
            "Saat masalah sudah jelas dan terstruktur — top-down langsung ke poin",
            "Saat tidak ada waktu",
            "Saat anggota tim banyak"
        ],
        "correct": 1,
        "explanation": "Evaluasi: top-down cocok saat masalah sudah terstruktur dan jelas (mis: membuat CRUD app standar). Bottom-up cocok untuk eksplorasi (mis: riset produk baru yang belum jelas)."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Sebagai siswa, Anda diminta memecah masalah 'menjadi juara kelas'. Manakah dekomposisi yang menurut Anda PALING efektif?",
        "options": [
            "Belajar setiap hari tanpa target spesifik",
            "Tentukan target peringkat → analisis mapel lemah → alokasi waktu ekstra untuk mapel lemah → ikut bimbingan → evaluasi mingguan → sesuaikan strategi",
            "Hanya fokus mapel favorit",
            "Salin strategi teman yang sudah juara"
        ],
        "correct": 1,
        "explanation": "Evaluasi: opsi B mencakup target spesifik, analisis kelemahan, strategi (alokasi waktu), intervensi (bimbingan), dan iterasi (evaluasi mingguan + sesuaikan). Ini dekomposisi strategis, bukan sekadar 'belajar'."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "Dekomposisi 'menulis buku 200 halaman' menjadi: tulis 1 halaman per hari. Apa evaluasi Anda?",
        "options": [
            "Strategi sempurna, tidak perlu revisi",
            "Terlalu simplistik — tidak ada tahap riset, kerangka, revisi, editing, layout. Tulis 1 hal/hari tanpa rencana menghasilkan buku tanpa struktur",
            "Bagus karena konsisten",
            "Salah karena 1 halaman terlalu sedikit"
        ],
        "correct": 1,
        "explanation": "Evaluasi: 'tulis 1 halaman per hari' mengabaikan tahap pra-menulis (riset, kerangka) dan pasca-menulis (revisi, editing, layout). Hasil akhir bukan buku, melainkan kumpulan halaman tanpa struktur."
    },
]

QUESTIONS_KELAS_7_ESSAI = [
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "**Skenario:** Anda diminta membuat dekomposisi untuk masalah 'menyelenggarakan class meeting akhir semester' yang melibatkan 3 kelas (7A, 7B, 7C) selama 2 hari.\n\n**Tugas:** Buat hierarki dekomposisi 2 level (bagian utama + sub-bagian) dengan minimal 4 bagian utama. Jelaskan alasan setiap bagian dan identifikasi minimal 2 dependensi antar-bagian.",
        "essay_answer": "Contoh jawaban yang baik:\n\nHierarki dekomposisi:\n1. Perencanaan\n   - Tentukan tema dan tanggal\n   - Buat proposal dan anggaran\n   - Dapatkan persetujuan wali kelas\n2. Persiapan teknis\n   - Booking ruangan dan peralatan\n   - Susun jadwal lomba\n   - Siapkan hadiah\n3. Pelaksanaan\n   - Hari 1: lomba akademik\n   - Hari 2: lomba olahraga/seni\n   - Dokumentasi\n4. Pasca-acara\n   - Bersihkan ruangan\n   - Buat laporan dan ucapan terima kasih\n\nDependensi:\n- Persiapan teknis BUTUH persetujuan proposal dari tahap perencanaan\n- Pelaksanaan BUTUH jadwal dari persiapan teknis\n\nAlasan: 4 bagian utama mengikuti alur hidup acara (plan → prep → execute → close). Setiap bagian self-contained dan dapat ditugaskan ke tim berbeda."
    },
    {
        "level": "C4", "category": "Dekomposisi",
        "question": "**Analisis kasus:** Seorang siswa memecah masalah 'belajar untuk ujian matematika 5 bab dalam 1 minggu' menjadi 50 langkah mikro (mulai dari 'buka buku halaman 1', 'baca paragraf 1', dst). Evaluasi dekomposisi tersebut dan berikan saran perbaikan.",
        "essay_answer": "Evaluasi:\n- KELEMAHAN: Pemecahan terlalu halus (50 langkah mikro). Mengaburkan gambaran besar, menambah beban koordinasi, dan tidak fleksibel jika ada gangguan jadwal.\n- KELEMAHAN: Tidak ada struktur hierarki (semua langkah setara, tidak ada pengelompokan per bab atau per aktivitas).\n- KELEMAHAN: Tidak ada tahap evaluasi/tryout, padahal krusial untuk ujian.\n\nSaran perbaikan (re-dekomposisi MECE):\n- Level 1 (bagian utama, 4 bagian):\n  1. Belajar bab 1-2 (hari 1-2)\n  2. Belajar bab 3-4 (hari 3-4)\n  3. Belajar bab 5 + review singkat (hari 5)\n  4. Tryout + revisi (hari 6-7)\n- Level 2 (sub-bagian per bab):\n  - Baca teori (30 menit)\n  - Kerjakan 10 latihan soal (45 menit)\n  - Review jawaban + catat kesalahan (15 menit)\n\nPrinsip 7±2 per level dijaga, dependensi jelas (bab harus sebelum tryout), dan ada iterasi (review + tryout)."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Skenario:** Tim Anda (4 orang) harus membuat aplikasi 'e-lib sekolah' dalam 4 minggu. Buat dekomposisi yang memungkinkan 4 anggota tim bekerja paralel. Identifikasi minimal 3 dependensi kritis dan jelaskan strategi koordinasi awal yang diperlukan.",
        "essay_answer": "Contoh jawaban yang baik:\n\nDekomposisi paralel:\n- Anggota 1 (Front-end): desain UI + coding front-end React\n- Anggota 2 (Back-end): coding API + autentikasi\n- Anggota 3 (Database): skema DB + seeding data buku\n- Anggota 4 (DevOps): setup Vercel + CI/CD + dokumentasi\n\nDependensi kritis:\n1. Front-end BUTUH API contract dari back-end (endpoint, request/response shape)\n2. Back-end BUTUH skema database dari anggota 3\n3. Deployment (DevOps) BUTUH kode final dari front-end dan back-end\n\nStrategi koordinasi awal:\n- Hari 1-2: Kick-off meeting, definisikan API contract (OpenAPI/Swagger) bersama sebelum coding dimulai\n- Hari 1-2: Anggota 3 finalisasi skema database (tabel User, Book, Loan, Review) dan bagikan ke tim\n- Setup Git branch strategy: main, dev, feature/* — wajib Pull Request review\n- Daily standup 10 menit tiap pagi untuk sinkronisasi\n- Mock data shared di repo agar front-end bisa coding tanpa tunggu back-end selesai\n\nManfaat strategi ini: paralel maksimal, dependensi diidentifikasi awal, kontrak API mengunci interface sehingga integrasi akhir lancar."
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Refleksi:** Pilih satu masalah pribadi Anda saat ini (contoh: menyiapkan diri untuk lomba, menghadapi ujian akhir, membuat proyek kreatif). Buat dekomposisi pribadi yang lengkap mengikuti 5 langkah yang dipelajari. Sertakan kriteria keberhasilan untuk setiap bagian.",
        "essay_answer": "Contoh jawaban yang baik (siswa memilih 'menyiapkan diri untuk lomba debat'):\n\nLangkah 1 — Pahami masalah: Tujuan lolos seleksi sekolah dan masuk tim debat. Batasan: 3 minggu persiapan, jadwal sekolah tetap berjalan.\n\nLangkah 2 — Bagian utama (MECE, 4 bagian):\n1. Kuasai materi (motion analysis, argumentasi)\n2. Latihan skill debat (public speaking, rebuttal)\n3. Simulasi seleksi (mock debate)\n4. Persiapan mental & logistik\n\nLangkah 3 — Sub-bagian:\n- (1) Kuasai materi: baca berita harian, kumpulkan motion pool, susun argumen pro/kontra 10 motion\n- (2) Latihan skill: rekam diri sendiri berbicara, latihan rebuttal dengan teman, pelajari gaya juri\n- (3) Simulasi: ikut 3 mock debate, minta feedback pelatih\n- (4) Persiapan mental: tidur cukup, makan sehat, siapkan pakaian formal\n\nLangkah 4 — Urutan logis: (1) dan (2) paralel selama minggu 1-2, (3) di minggu 3, (4) paralel sepanjang waktu.\n\nLangkah 5 — Verifikasi: sudahkah mencakup kognitif (materi), skill (debat), simulasi (pengalaman), dan mental? Ya, MECE.\n\nKriteria keberhasilan:\n- (1) Mampu menyusun 3 argumen pro/kontra untuk 5 motion acak dalam 30 menit\n- (2) Skor rekaman diri ≥7/10 dari 3 penonton\n- (3) Memenangkan minimal 1 dari 3 mock debate\n- (4) Tidur 7+ jam setiap malam selama minggu terakhir"
    },
    {
        "level": "C5", "category": "Dekomposisi",
        "question": "**Studi kasus kritis:** Sebuah tim pengembang game memecah proyek mereka menjadi 200 task kecil. Setelah 6 bulan, proyek terlambat 4 bulan dan banyak task saling bertabrakan. Sebagai konsultan, diagnosis masalah dekomposisi mereka dan berikan rekomendasi konkrit untuk perbaikan.",
        "essay_answer": "Diagnosis:\n1. PEMECAHAN TERLALU HALUS — 200 task mikro menyebabkan overhead koordinasi yang luar biasa. Setiap task butuh review, merge, test sendiri. Total overhead bisa 50%+ dari total effort.\n2. TIDAK ADA HIERARKI — 200 task setara tanpa pengelompokan menyulitkan prioritisasi dan tracking. Tidak jelas mana yang kritis vs nice-to-have.\n3. DEPENDENSI TIDAK DIPETAKAN — task-task saling bertabrakan karena dependensi tidak diidentifikasi di awal. Sering terjadi 'task A butuh B, tapi B belum mulai'.\n4. TIDAK ADA ITERASI — proyek besar 6 bulan tanpa checkpoint iteratif membuat masalah akumulasi tak terdeteksi sampai krisis.\n\nRekomendasi:\n1. RE-DEKOMPOSISI: Kelompokkan 200 task menjadi 5-7 EPIC besar (mis: Core Gameplay, Art Asset, Audio, Multiplayer, UI, Polish, Release). Setiap epic dipecah lagi menjadi 5-9 USER STORY yang actionable.\n2. PETAKAN DEPENDENSI: Buat dependency graph (DAG) untuk semua story. Identifikasi critical path dan identifikasi bottleneck.\n3. ADOPTASI SCRUM: Pecah proyek menjadi sprint 2 minggu. Setiap sprint, pilih story dari epic sesuai prioritas. Daily standup untuk deteksi blocker.\n4. DEFINISIKAN DEFINITION OF DONE: Setiap story harus punya kriteria selesai yang jelas (unit test lulus, code review, QA approve).\n5. PRIORITAS MOSCOW: Klasifikasikan story sebagai Must/Should/Could/Won't. Fokus Must dulu.\n6. RETROSPEKTIF: Setiap akhir sprint, evaluasi apa yang berjalan dan apa yang tidak. Sesuaikan strategi.\n\nTujuan akhir: dari 200 task mikro → 5-7 epic + 30-50 story terstruktur, dengan dependensi jelas dan iterasi 2 mingguan. Estimasi hemat waktu 30-40%."
    },
]


# ============================================================
# KELAS 8: PENCARIAN DATA
# ============================================================

MATERI_KELAS_8 = """# Memperdalam Pencarian Data: Algoritma Sequential dan Binary Search

## Mengapa Pencarian Data Penting?

Setiap hari kita berinteraksi dengan data dalam jumlah masif. Saat mencari kontak di ponsel, mencari kata di dokumen, atau mencari produk di e-commerce, di baliknya ada algoritma pencarian yang bekerja. Algoritma pencarian menentukan seberapa cepat kita menemukan informasi yang dibutuhkan dari sekumpulan data. Pencarian yang lambat dapat membuat pengguna frustrasi, sementara pencarian yang cepat meningkatkan pengalaman pengguna secara signifikan.

Bayangkan mencari satu kata dalam buku 1000 halaman. Jika Anda membaca halaman demi halaman, mungkin butuh berjam-jam. Tapi jika Anda menggunakan indeks di akhir buku, pencarian hanya butuh detik. Perbedaan kecepatan ini disebabkan oleh algoritma pencarian yang berbeda. Dalam ilmu komputer, memahami algoritma pencarian adalah fondasi penting untuk mengelola data efisien.

## Konsep Dasar Pencarian Data

Pencarian data adalah proses menemukan posisi atau keberadaan suatu nilai (kunci pencarian) dalam sekumpulan data. Dua algoritma pencarian paling dasar adalah **Sequential Search** dan **Binary Search**. Pemilihan algoritma bergantung pada karakteristik data: apakah data sudah terurut atau belum, seberapa besar ukuran data, dan seberapa sering pencarian dilakukan.

Setiap algoritma memiliki trade-off antara kecepatan dan kompleksitas implementasi. Sequential search mudah diimplementasikan tapi lambat untuk data besar. Binary search cepat untuk data besar, tapi membutuhkan data terurut dan implementasi yang lebih kompleks. Memahami trade-off ini adalah keterampilan krusial bagi programmer.

## Sequential Search (Pencarian Berurutan)

Sequential search adalah algoritma pencarian paling sederhana: periksa setiap elemen satu per satu dari awal sampai akhir, hingga elemen yang dicari ditemukan atau seluruh data diperiksa. Bayangkan mencari kunci di rumah yang berantakan — Anda periksa setiap sudut satu per satu.

**Kelebihan sequential search:**
- Implementasi sederhana, hanya butuh perulangan dan perbandingan
- Tidak butuh data terurut
- Cocok untuk data kecil (kurang dari 100 elemen)

**Kekurangan sequential search:**
- Lambat untuk data besar
- Kompleksitas waktu O(n) — waktu tumbuh linier dengan ukuran data

**Contoh implementasi pseudocode:**
```
FUNGSI sequentialSearch(arr, key):
  UNTUK i DARI 0 SAMPAI panjang(arr) - 1:
    JIKA arr[i] == key:
      KEMBALIKAN i  // posisi ditemukan
  KEMBALIKAN -1  // tidak ditemukan
```

## Binary Search (Pencarian Biner)

Binary search adalah algoritma pencarian yang jauh lebih cepat, tetapi datanya **harus sudah terurut** (ascending atau descending). Konsepnya seperti mencari kata di kamus: kita buka tengah-tengah buku, lalu lihat apakah kata yang dicari lebih awal atau lebih akhir dari halaman saat ini. Jika lebih awal, kita buka paruh kiri; jika lebih akhir, kita buka paruh kanan. Kita ulangi sampai menemukan kata atau tidak ada lagi halaman untuk diperiksa.

**Kelebihan binary search:**
- Sangat cepat untuk data besar
- Kompleksitas waktu O(log n) — untuk 1 juta data, hanya butuh sekitar 20 perbandingan

**Kekurangan binary search:**
- Data harus terurut dulu (sorting juga butuh waktu)
- Implementasi lebih kompleks
- Tidak cocok untuk struktur data yang sering berubah (insert/delete mahal)

**Contoh implementasi pseudocode:**
```
FUNGSI binarySearch(arr, key):
  kiri = 0
  kanan = panjang(arr) - 1
  SELAMA kiri <= kanan:
    tengah = (kiri + kanan) / 2  // pembulatan ke bawah
    JIKA arr[tengah] == key:
      KEMBALIKAN tengah  // posisi ditemukan
    JIKA arr[tengah] < key:
      kiri = tengah + 1   // cari di paruh kanan
    LAIN:
      kanan = tengah - 1  // cari di paruh kiri
  KEMBALIKAN -1  // tidak ditemukan
```

## Perbandingan Sequential vs Binary Search

| Aspek | Sequential Search | Binary Search |
|-------|-------------------|---------------|
| Data harus terurut? | Tidak | Ya |
| Kompleksitas waktu | O(n) | O(log n) |
| Untuk data 1.000.000 | ~1.000.000 langkah | ~20 langkah |
| Implementasi | Sederhana | Lebih kompleks |
| Cocok untuk | Data kecil, tidak terurut | Data besar, sudah terurut |
| Trade-off | Lambat di data besar | Butuh sorting awal |

Untuk data 1 juta elemen, sequential search rata-rata butuh 500.000 perbandingan, sementara binary search hanya butuh 20 perbandingan. Perbedaan kecepatan ini sangat signifikan dalam aplikasi nyata.

## Aplikasi Pencarian Data di Kehidupan Sehari-Hari

1. **Mesin pencari Google** menggunakan algoritma pencarian canggih untuk menemukan halaman web relevan dari miliaran halaman dalam milidetik
2. **Database SQL** menggunakan indeks (mirip binary search) untuk query cepat pada kolom yang diindeks
3. **Aplikasi kontak di ponsel** menggunakan sequential search saat user mengetik nama, lalu autocomplete dengan prefix matching
4. **Sistem reservasi tiket** mencari kursi tersedia dengan algoritma pencarian yang efisien
5. **E-commerce** seperti Tokopedia/Shopee menggunakan search engine untuk menemukan produk dari katalog jutaan item

## Kesalahan Umum dalam Pencarian Data

1. **Menggunakan sequential search untuk data besar terurut** — boros waktu. Gunakan binary search.
2. **Lupa sorting sebelum binary search** — hasil tidak terprediksi atau infinite loop.
3. **Implementasi binary search salah** — bug off-by-one sangat umum (kiri <= kanan vs kiri < kanan).
4. **Tidak mempertimbangkan overhead sorting** — jika data sering berubah, sorting tiap kali pencarian bisa lebih lambat dari sequential search.

## Latihan Self-Assessment

Setelah membaca materi ini, coba jawab: kapan Anda harus memilih sequential search vs binary search? Apa trade-off yang harus dipertimbangkan? Diskusikan dengan teman satu skenario nyata di mana pemilihan algoritma pencarian yang salah menyebabkan aplikasi terasa lambat.
"""

QUESTIONS_KELAS_8_PG = [
    # ── C3 (Menerapkan) — 15 soal ──
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "**Andi** mencari angka 7 dalam array `[3, 1, 7, 5, 9]` menggunakan sequential search. Berapa kali perbandingan dilakukan sebelum angka 7 ditemukan?",
        "options": ["1 kali", "2 kali", "3 kali", "5 kali"],
        "correct": 2,
        "explanation": "Sequential search periksa elemen dari awal: arr[0]=3 (tidak sama), arr[1]=1 (tidak sama), arr[2]=7 (sama, berhenti). Total 3 perbandingan."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Pada binary search, data HARUS...",
        "options": ["Berukuran genap", "Sudah terurut (ascending atau descending)", "Berisi angka saja", "Tidak boleh ada duplikat"],
        "correct": 1,
        "explanation": "Syarat mutlak binary search: data harus terurut. Jika tidak, algoritma tidak bisa memutuskan arah pencarian."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "**Siti** melakukan binary search pada array `[2, 5, 8, 12, 16, 23, 38, 45]` untuk mencari angka 16. Nilai tengah pertama yang diperiksa adalah...",
        "options": ["8 (indeks 2)", "12 (indeks 3)", "16 (indeks 4)", "23 (indeks 5)"],
        "correct": 1,
        "explanation": "Array 8 elemen (indeks 0-7). Tengah = (0+7)/2 = 3 (pembulatan bawah). arr[3] = 12. Karena 12 < 16, lanjut cari di kanan."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Manakah implementasi pseudocode sequential search yang BENAR?",
        "options": [
            "UNTUK i: JIKA arr[i] == key KEMBALIKAN i",
            "ULANGI selama tidak ketemu: periksa arr[i] bertambah 1",
            "Bagi dua array, periksa tengah, lanjut ke paruh relevan",
            "Mulai dari akhir, periksa mundur"
        ],
        "correct": 0,
        "explanation": "Sequential search sederhana: iterasi dari awal sampai akhir, kembalikan indeks saat ditemukan. Pseudocode paling tepat adalah opsi A."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Kompleksitas waktu sequential search adalah...",
        "options": ["O(1) — konstan", "O(log n) — logaritmik", "O(n) — linier", "O(n²) — kuadratik"],
        "correct": 2,
        "explanation": "Sequential search periksa satu per satu: untuk n elemen, paling buruk butuh n perbandingan. Maka kompleksitas O(n) — linier."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Kompleksitas waktu binary search adalah...",
        "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        "correct": 1,
        "explanation": "Binary search membagi dua setiap iterasi: untuk n elemen, butuh log₂(n) iterasi. Untuk 1 juta elemen, hanya butuh ~20 iterasi. Kompleksitas O(log n)."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "**Budi** punya array berisi 1.000.000 elemen terurut. Ia mencari satu nilai. Algoritma TERBAIK adalah...",
        "options": ["Sequential search — lebih sederhana", "Binary search — butuh ~20 perbandingan saja", "Acak saja, keduanya sama", "Cari manual tanpa algoritma"],
        "correct": 1,
        "explanation": "Binary search pada 1 juta data terurut hanya butuh ~20 perbandingan (log₂ 1.000.000 ≈ 20). Sequential search butuh hingga 1 juta perbandingan. Binary search jauh lebih cepat."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Pada binary search array `[10, 20, 30, 40, 50]` mencari 25, langkah setelah periksa arr[2]=30 adalah...",
        "options": [
            "Cari di paruh kanan (40, 50)",
            "Cari di paruh kiri (10, 20) — karena 30 > 25",
            "Berhenti, 25 tidak ada",
            "Mulai dari awal lagi"
        ],
        "correct": 1,
        "explanation": "Karena arr[tengah]=30 > key=25, kita cari di paruh KIRI. kiri=0, kanan=2-1=1. Iterasi berikutnya akan periksa indeks 0."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Saat sequential search tidak menemukan key, nilai yang dikembalikan biasanya adalah...",
        "options": ["0", "Posisi terakhir", "-1 (penanda tidak ditemukan)", "Infinity"],
        "correct": 2,
        "explanation": "Konvensi: jika tidak ditemukan, kembalikan -1 (indeks yang tidak valid). Ini sinyal ke pemanggil bahwa key tidak ada di array."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "**Dina** mencari kontak 'Andi' di ponselnya yang punya 50 kontak terurut alfabetis. Algoritma paling efisien adalah...",
        "options": ["Sequential search", "Binary search (karena kontak terurut alfabetis)", "Random search", "Tidak bisa pakai algoritma"],
        "correct": 1,
        "explanation": "Karena kontak terurut alfabetis, binary search efisien. Untuk 50 kontak, butuh hanya ~6 perbandingan (log₂ 50 ≈ 6), vs sequential yang butuh hingga 50."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Pada binary search, setiap iterasi membagi area pencarian menjadi...",
        "options": ["3 bagian", "2 bagian sama besar (paruh kiri dan kanan)", "10 bagian", "Tidak dibagi"],
        "correct": 1,
        "explanation": "Binary search selalu membagi area pencarian jadi 2 paruh. Itulah asal nama 'binary' (dua). Hanya satu paruh yang diperiksa lebih lanjut."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Manakah kondisi yang membuat sequential search LEBIH tepat dipilih daripada binary search?",
        "options": [
            "Data berukuran besar dan terurut",
            "Data berukuran kecil dan tidak terurut",
            "Data sering dicari",
            "Data harus diproses paralel"
        ],
        "correct": 1,
        "explanation": "Sequential search cocok untuk data kecil (mis: <100 elemen) yang tidak terurut. Overhead sorting untuk binary search tidak sebanding dengan gain kecepatan untuk data kecil."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "**Eka** mencari kata 'kucing' di kamus. Ia membuka tengah, lihat halaman 'M', lalu membuka paruh kiri (A-L). Strategi apa yang ia pakai?",
        "options": ["Sequential search", "Binary search", "Random search", "Linear scan"],
        "correct": 1,
        "explanation": "Strategi 'buka tengah, bandingkan, lanjut ke paruh relevan' adalah binary search. Kamus terurut alfabetis, jadi binary search efisien."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Pada binary search, kondisi BERHENTI (loop selesai) adalah ketika...",
        "options": [
            "Key ditemukan ATAU kiri > kanan (area pencarian habis)",
            "Semua elemen sudah diperiksa",
            "Waktu habis",
            "Memori penuh"
        ],
        "correct": 0,
        "explanation": "Binary search berhenti saat (1) key ditemukan (arr[tengah]==key) ATAU (2) kiri > kanan (area pencarian sudah kosong, key tidak ada)."
    },
    {
        "level": "C3", "category": "Pencarian Data",
        "question": "Manakah implementasi binary search yang BENAR?",
        "options": [
            "kiri=0, kanan=n-1, SELAMA kiri<=kanan: tengah=(kiri+kanan)/2; periksa",
            "kiri=0, kanan=n, SELAMA kiri<kanan: tengah=(kiri+kanan)/2",
            "kiri=1, kanan=n, SELAMA kiri!=kanan: tengah=kiri+kanan",
            "kiri=-1, kanan=n+1, SELAMA kiri<kanan: tengah=acak"
        ],
        "correct": 0,
        "explanation": "Implementasi standar: kiri=0, kanan=n-1 (indeks terakhir), SELAMA kiri<=kanan. Kondisi <= penting untuk kasus 1 elemen."
    },
    # ── C4 (Menganalisis) — 15 soal ──
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Perhatikan tabel kompleksitas:\n\n- Sequential: O(n)\n- Binary: O(log n)\n\nUntuk n=1.000.000, kira-kira berapa perbandingan masing-masing algoritma (worst case)?",
        "options": [
            "Sequential ~1 juta, Binary ~20",
            "Sequential ~20, Binary ~1 juta",
            "Sequential ~1000, Binary ~100",
            "Sequential ~100, Binary ~1000"
        ],
        "correct": 0,
        "explanation": "Analisis: O(n) untuk n=1.000.000 berarti hingga 1 juta perbandingan. O(log n) dengan basis 2: log₂ 1.000.000 ≈ 20. Binary search jauh lebih efisien untuk data besar."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "**Fajar** punya array TIDAK terurut `[5, 2, 8, 1, 9]` dan ingin mencari angka 8. Ia memilih binary search. Apa yang terjadi?",
        "options": [
            "Algoritma bekerja dengan benar",
            "Hasil tidak terprediksi — binary search butuh data terurut",
            "Algoritma crash",
            "Algoritma lebih cepat dari sequential"
        ],
        "correct": 1,
        "explanation": "Analisis: binary search pada data tidak terurut akan menghasilkan output tidak terprediksi. Algoritma mungkin tidak menemukan key meski ada, atau infinite loop. Syarat mutlak: data harus terurut."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Pada binary search array `[1, 3, 5, 7, 9, 11, 13]` (7 elemen) mencari 9, berapa iterasi yang dibutuhkan?",
        "options": [
            "1 iterasi — arr[3]=7, lanjut kanan, arr[5]=11, lanjut kiri, arr[4]=9 (3 iterasi sebenarnya)",
            "3 iterasi (indeks 3→5→4)",
            "5 iterasi",
            "7 iterasi"
        ],
        "correct": 1,
        "explanation": "Analisis langkah:\n- Iter 1: kiri=0, kanan=6, tengah=3, arr[3]=7 < 9 → kiri=4\n- Iter 2: kiri=4, kanan=6, tengah=5, arr[5]=11 > 9 → kanan=4\n- Iter 3: kiri=4, kanan=4, tengah=4, arr[4]=9 == 9 → KETEMU. Total 3 iterasi."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Mengapa binary search cocok untuk kamus tetapi tidak untuk aplikasi kontak yang sering berubah?",
        "options": [
            "Kamus lebih besar",
            "Kamus stabil (tidak sering tambah kata) sehingga sorting awal cukup. Kontak sering tambah → sorting ulang tiap kali boros",
            "Kontak lebih kompleks",
            "Kamus lebih cepat"
        ],
        "correct": 1,
        "explanation": "Analisis trade-off: binary search butuh data terurut. Kamus stabil (jarang tambah kata) sehingga sorting sekali di awal cukup. Kontak sering ditambah → sorting ulang tiap tambah = O(n log n) per insert, lebih lambat dari sequential O(n)."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "**Gita** mencari angka 100 dalam array 1000 elemen terurut. Sequential search worst case butuh 1000 perbandingan. Berapa binary search worst case?",
        "options": ["~10 (log₂ 1000 ≈ 10)", "~100", "~500", "~1000"],
        "correct": 0,
        "explanation": "Analisis: log₂ 1000 ≈ 9.97, dibulatkan 10. Binary search worst case = 10 perbandingan, vs sequential 1000. Binary search 100x lebih cepat."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Pada binary search, bug 'off-by-one' paling umum terjadi pada kondisi loop. Manakah yang BENAR?",
        "options": [
            "SELAMA kiri <= kanan (inklusif — benar)",
            "SELAMA kiri < kanan (eksklusif — bug, lewatkan 1 elemen)",
            "SELAMA kiri != kanan (bisa infinite loop)",
            "SELAMA kiri == kanan (langsung berhenti)"
        ],
        "correct": 0,
        "explanation": "Analisis: kondisi 'kiri <= kanan' memastikan kasus 1 elemen (kiri==kanan) tetap diperiksa. Jika pakai '<', elemen terakhir tak pernah diperiksa — bug off-by-one klasik."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Manakah pernyataan yang BENAR tentang kompleksitas waktu?",
        "options": [
            "O(n) lebih cepat dari O(log n) untuk data besar",
            "O(log n) lebih cepat dari O(n) untuk data besar — pertumbuhan logaritmik lebih lambat dari linier",
            "O(n) dan O(log n) sama saja",
            "O(log n) hanya untuk data kecil"
        ],
        "correct": 1,
        "explanation": "Analisis: untuk n=1000, O(n)=1000, O(log n)=10. Untuk n=1 juta, O(n)=1 juta, O(log n)=20. Pertumbuhan logaritmik jauh lebih lambat dari linier — semakin besar n, semakin besar gap."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "**Hadi** mencari angka 5 dalam array `[1, 3, 5, 7, 9]` (5 elemen). Ia pakai binary search. Setelah iterasi pertama (tengah=2, arr[2]=5), apa yang terjadi?",
        "options": [
            "Lanjut ke iterasi 2",
            "Berhenti — arr[tengah] == key, kembalikan indeks 2",
            "Error",
            "Kembali ke awal"
        ],
        "correct": 1,
        "explanation": "Analisis: pada iterasi 1, kiri=0, kanan=4, tengah=2. arr[2]=5 == key=5 → ketemu! Berhenti dan kembalikan indeks 2. Hanya 1 iterasi."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Dalam database SQL, index pada kolom biasanya menggunakan struktur B-Tree. Konsep ini paling dekat dengan algoritma...",
        "options": ["Sequential search", "Binary search (B-Tree adalah generalisasi binary search)", "Random search", "Linear scan"],
        "correct": 1,
        "explanation": "Analisis: B-Tree adalah generalisasi binary search ke multi-level. Setiap node punya banyak key dan banyak child, tapi prinsip 'bagi dua dan cari di paruh relevan' sama dengan binary search."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Saat mencari elemen yang TIDAK ADA di array, mana yang lebih efisien?",
        "options": [
            "Sequential search — selalu periksa semua, lalu kembalikan -1",
            "Binary search — converge ke area kosong setelah log n langkah",
            "Keduanya sama efisien",
            "Tidak ada yang efisien"
        ],
        "correct": 1,
        "explanation": "Analisis: untuk key yang tidak ada, sequential search periksa semua n elemen (worst case n). Binary search converge setelah log n langkah, lalu kiri > kanan → return -1. Binary search jauh lebih cepat."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "**Ira** punya array `[10, 20, 30, 40, 50]` dan mencari 25. Binary search berakhir dengan kembalian -1 (tidak ada). Berapa iterasi?",
        "options": ["1 iterasi", "2 iterasi", "3 iterasi", "5 iterasi"],
        "correct": 2,
        "explanation": "Analisis:\n- Iter 1: kiri=0, kanan=4, tengah=2, arr[2]=30 > 25 → kanan=1\n- Iter 2: kiri=0, kanan=1, tengah=0, arr[0]=10 < 25 → kiri=1\n- Iter 3: kiri=1, kanan=1, tengah=1, arr[1]=20 < 25 → kiri=2. Sekarang kiri > kanan (2 > 1) → berhenti, return -1. Total 3 iterasi."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Apa yang terjadi jika binary search diimplementasikan dengan kondisi 'kiri < kanan' (bukan <=)?",
        "options": [
            "Tidak ada efek, sama saja",
            "Bug: kasus 1 elemen (kiri==kanan) tak pernah diperiksa — elemen terakhir bisa terlewat",
            "Lebih cepat",
            "Infinite loop"
        ],
        "correct": 1,
        "explanation": "Analisis bug off-by-one: jika kiri==kanan (kasus 1 elemen tersisa), loop '<' akan berhenti sebelum periksa elemen itu. Jika key ada di elemen terakhir, return -1 (salah). Solusi: pakai '<='."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Manakah skenario di mana sequential search adalah pilihan TERBAIK?",
        "options": [
            "Database 1 juta record terurut",
            "Daftar belanja 10 item tidak terurut",
            "Indeks buku 1000 halaman",
            "Kamus 100.000 kata"
        ],
        "correct": 1,
        "explanation": "Analisis: daftar belanja 10 item tidak terurut — sequential search O(10) lebih cepat dari binary search + sorting O(10 log 10) + O(log 10). Untuk data kecil, overhead sorting mengalahkan gain binary search."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Mengapa mesin pencari Google tidak hanya menggunakan binary search sederhana?",
        "options": [
            "Karena Google tidak tahu binary search",
            "Web pages tidak terurut dan sering berubah — Google pakai inverted index + algoritma ranking yang lebih kompleks",
            "Binary search tidak bisa untuk data besar",
            "Google pakai random search"
        ],
        "correct": 1,
        "explanation": "Analisis: web pages tidak terurut, jumlahnya miliaran, dan sering berubah. Google pakai inverted index ( struktur khusus untuk pencarian teks) + PageRank + ML ranking. Binary search sederhana tidak cukup."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "Pada binary search array `[2, 4, 6, 8, 10, 12, 14, 16]` (8 elemen) mencari 1 (tidak ada), berapa iterasi?",
        "options": ["2 iterasi", "3 iterasi", "4 iterasi", "8 iterasi"],
        "correct": 2,
        "explanation": "Analisis:\n- Iter 1: kiri=0, kanan=7, tengah=3, arr[3]=8 > 1 → kanan=2\n- Iter 2: kiri=0, kanan=2, tengah=1, arr[1]=4 > 1 → kanan=0\n- Iter 3: kiri=0, kanan=0, tengah=0, arr[0]=2 > 1 → kanan=-1. kiri(0) > kanan(-1) → berhenti. Total 3 iterasi (sebagian literature hitung 4 karena termasuk iterasi terakhir yang deteksi stop)."
    },
    # ── C5 (Mengevaluasi) — 15 soal ──
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Joko** mengimplementasikan binary search dengan kode berikut:\n\n```\nwhile (kiri < kanan) {\n  tengah = (kiri + kanan) / 2;\n  if (arr[tengah] == key) return tengah;\n  if (arr[tengah] < key) kiri = tengah + 1;\n  else kanan = tengah;\n}\nreturn -1;\n```\n\nApa evaluasi Anda?",
        "options": [
            "Sempurna, tidak ada bug",
            "Bug off-by-one: kondisi '<' menyebabkan elemen terakhir tak diperiksa. Harusnya '<=' dan 'kanan = tengah - 1'",
            "Bug infinite loop",
            "Bug array out of bound"
        ],
        "correct": 1,
        "explanation": "Evaluasi: dua bug halus: (1) '<' seharusnya '<=', (2) 'kanan = tengah' seharusnya 'kanan = tengah - 1' (karena arr[tengah] sudah diperiksa, tidak perlu include). Kombinasi ini menyebabkan elemen terakhir terlewat."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Manakah pernyataan evaluasi yang PALING tepat tentang kapan memilih binary search?",
        "options": [
            "Selalu pilih binary search karena lebih cepat",
            "Pilih binary search jika data sudah terurut ATAU sorting dilakukan sekali untuk banyak pencarian",
            "Jangan pernah pakai binary search",
            "Pilih binary search hanya untuk data < 100 elemen"
        ],
        "correct": 1,
        "explanation": "Evaluasi: binary search optimal saat (1) data sudah terurut (sorting cost = 0) atau (2) sorting dilakukan sekali lalu banyak pencarian (sorting cost teramortisasi). Untuk data tidak terurut + 1 pencarian, sequential search lebih cepat."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Kiki** punya array 100 elemen yang akan dicari 1000 kali. Data tidak terurut. Strategi mana PALING efisien?",
        "options": [
            "Sequential search 1000 kali — total 1000×100 = 100.000 operasi",
            "Sort dulu (100 log 100 ≈ 700), lalu binary search 1000 kali (1000×7 = 7000) — total 7700 operasi",
            "Random search 1000 kali",
            "Tidak bisa dijawab"
        ],
        "correct": 1,
        "explanation": "Evaluasi: sort sekali (700 ops) + 1000 binary search (7000 ops) = 7700 total. vs 1000 sequential (100.000 ops). Binary search + sort teramortisasi jauh lebih efisien untuk multiple search."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Manakah kritik PALING tepat untuk pernyataan 'Binary search selalu lebih cepat dari sequential search'?",
        "options": [
            "Tidak ada kritik, pernyataan benar",
            "Salah: untuk data kecil tidak terurut, sequential search lebih cepat karena tak perlu sorting",
            "Salah: binary search tidak pernah lebih cepat",
            "Salah: keduanya selalu sama kecepatan"
        ],
        "correct": 1,
        "explanation": "Evaluasi: pernyataan terlalu general. Untuk data kecil tidak terurut + 1 pencarian, sequential search O(n) lebih cepat dari sort + binary search O(n log n) + O(log n). Konteks menentukan pilihan algoritma."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Lia** mengklaim binary search-nya berjalan dengan 5 iterasi pada array 30 elemen. Apakah klaim ini MASUK AKAL?",
        "options": [
            "Tidak, seharusnya butuh 30 iterasi",
            "Ya, log₂ 30 ≈ 4.9, jadi 5 iterasi untuk worst case masuk akal",
            "Tidak mungkin, binary search butuh selalu 10 iterasi",
            "Tidak bisa dievaluasi"
        ],
        "correct": 1,
        "explanation": "Evaluasi: log₂ 30 = log(30)/log(2) ≈ 4.91. Jadi worst case binary search pada 30 elemen = 5 iterasi (pembulatan ke atas). Klaim Lia masuk akal."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Manakah implementasi binary search yang PALING baik untuk produksi?",
        "options": [
            "Pakai rekursi tanpa batas — elegan",
            "Pakai loop while dengan kondisi <= dan update 'kanan = tengah - 1' / 'kiri = tengah + 1'",
            "Pakai goto statement",
            "Pakai nested for loop"
        ],
        "correct": 1,
        "explanation": "Evaluasi: loop while dengan kondisi <= dan update kiri/kanan = tengah ± 1 adalah implementasi standar produksi. Lebih efisien dari rekursi (no stack overhead), dan hindari infinite loop dengan update yang benar."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Pada binary search, mengapa update 'kiri = tengah + 1' (bukan 'kiri = tengah')?",
        "options": [
            "Tidak ada alasan",
            "Karena arr[tengah] sudah diperiksa dan != key, jadi tak perlu include di area pencarian berikutnya — skip untuk hindari infinite loop",
            "Supaya lebih cepat",
            "Karena aturan matematika"
        ],
        "correct": 1,
        "explanation": "Evaluasi: jika arr[tengah] != key, kita tahu tengah bukan jawaban, jadi skip (tengah+1 atau tengah-1). Tanpa skip, kiri=tengah bisa menyebabkan infinite loop saat area tak pernah mengecil."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Maman** menulis binary search di JavaScript:\n```javascript\nlet mid = (kiri + kanan) / 2;\n```\nApa potensi bug yang sering muncul di array besar?",
        "options": [
            "Tidak ada bug",
            "Overflow integer: kiri+kanan bisa exceed Number.MAX_SAFE_INTEGER untuk array besar (>2^53) — gunakan mid = kiri + (kanan - kiri) / 2",
            "Bug tipe data: hasil bisa float",
            "Bug sintaks"
        ],
        "correct": 1,
        "explanation": "Evaluasi: di JavaScript, integer bisa overflow jadi float (kehilangan presisi) untuk array > 2^53. Solusi kanonik: mid = kiri + Math.floor((kanan - kiri) / 2). Bug klasik yang sering terlewat di sistem besar."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Manakah pernyataan evaluasi yang BENAR tentang trade-off binary search?",
        "options": [
            "Binary search selalu menang di kecepatan, trade-off tidak ada",
            "Binary search trade-off: butuh data terurut (sorting butuh waktu), tidak cocok untuk data yang sering berubah",
            "Binary search tidak punya trade-off",
            "Binary search selalu kalah dari sequential search"
        ],
        "correct": 1,
        "explanation": "Evaluasi trade-off: binary search menang di kecepatan pencarian O(log n), tapi kalah di fleksibilitas (butuh data terurut) dan update (insert/delete butuh re-sort). Trade-off ini krusial untuk pemilihan algoritma."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Nina** mengimplementasikan binary search pada array terurut descending `[50, 40, 30, 20, 10]` mencari 30. Apa yang HARUS ia ubah dari implementasi standar (untuk ascending)?",
        "options": [
            "Tidak perlu ubah apa-apa",
            "Balik logika perbandingan: jika arr[tengah] < key, cari di paruh KIRI (descending berarti lebih besar di kiri)",
            "Balik array dulu",
            "Pakai sequential search saja"
        ],
        "correct": 1,
        "explanation": "Evaluasi: untuk descending, logika perbandingan terbalik. Jika arr[tengah] < key, di ascending cari kanan; di descending cari kiri (karena nilai besar ada di kiri). Implementasi standar harus dimodifikasi."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Untuk aplikasi real-time yang butuh pencarian < 1 ms pada 10 juta record, manakah strategi TERBAIK?",
        "options": [
            "Sequential search — terlalu lambat",
            "Binary search — butuh data terurut, tapi insert delete mahal",
            "Hash table (O(1) lookup) atau B-Tree index (log n + multi-level) — pilihan produksi",
            "Random search"
        ],
        "correct": 2,
        "explanation": "Evaluasi: untuk 10 juta record real-time, hash table (O(1)) atau B-Tree (log n) lebih baik dari binary search murni. B-Tree cocok jika butuh range query, hash table untuk exact match."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Omar** menguji binary search dengan array `[1, 2, 3, 4, 5]` mencari 3. Hasil: 5 iterasi. Apakah ini benar?",
        "options": [
            "Ya, 5 elemen = 5 iterasi",
            "Tidak, seharusnya 1 iterasi — tengah langsung arr[2]=3 == key",
            "Tidak, seharusnya 3 iterasi",
            "Tidak bisa dievaluasi"
        ],
        "correct": 1,
        "explanation": "Evaluasi: kiri=0, kanan=4, tengah=2, arr[2]=3 == key=3 → ketemu iterasi 1! Kalau Omar dapat 5 iterasi, ada bug di implementasinya (mungkin pakai sequential, atau infinite loop yang berhenti setelah n langkah)."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Manakah evaluasi TERBAIK tentang kapan HARUS pakai sequential search?",
        "options": [
            "Data besar terurut, dicari 1 kali",
            "Data kecil (<100 elemen) tidak terurut, dicari 1 kali — sequential paling efisien",
            "Database produksi",
            "Selalu"
        ],
        "correct": 1,
        "explanation": "Evaluasi: sequential search optimal untuk data kecil tidak terurut + 1 pencarian. Overhead sorting untuk binary search (O(n log n)) > sequential O(n) untuk n kecil. Trade-off kontekstual, bukan absolut."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Pak Guru** memberi tugas: implementasikan binary search untuk array of strings (kata). Apa pertimbangan utama yang sering terlewat?",
        "options": [
            "Tidak ada pertimbangan khusus",
            "Perbandingan string pakai locale-aware comparison (localeCompare) — case sensitivity dan unicode bisa bikin sort order berbeda",
            "Array string tidak bisa di-binary search",
            "String lebih lambat dari angka"
        ],
        "correct": 1,
        "explanation": "Evaluasi: untuk string, sorting dan perbandingan harus konsisten (mis: selalu lowercase, atau pakai localeCompare). Jika tidak, binary search bisa gagal menemukan key meski ada. Case-sensitivity adalah jebakan klasik."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Manakah strategi PALING efisien untuk pencarian 'nama dimulai dengan An' (prefix search) pada array 1 juta nama terurut?",
        "options": [
            "Sequential search semua — lambat",
            "Binary search untuk batas bawah 'An' dan batas atas 'Ao', lalu ambil semua antara — O(log n + k)",
            "Random search",
            "Tidak bisa pakai binary search"
        ],
        "correct": 1,
        "explanation": "Evaluasi: untuk prefix search, gunakan lower_bound ('An') + upper_bound ('Ao' — huruf setelah 'n' di alfabet). Kembalikan semua di antara. O(log n) untuk binary search + O(k) untuk iterate hasil, jauh lebih cepat dari sequential O(n)."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "Saat mengoptimasi aplikasi, Profiler menunjukkan 80% waktu dihabiskan di loop sequential search pada array 10.000 elemen terurut. Rekomendasi Anda?",
        "options": [
            "Tidak perlu optimasi, 10.000 cepat",
            "Konversi ke binary search — estimasi 1000x lebih cepat (10.000 → 14)",
            "Pakai random search",
            "Pindahkan ke database saja"
        ],
        "correct": 1,
        "explanation": "Evaluasi: 80% waktu di sequential search = bottleneck. Konversi ke binary search (karena data terurut) mengubah O(n) → O(log n): 10.000 → log₂ 10.000 ≈ 14. Estimasi 1000x speedup. Optimasi high-impact."
    },
]

QUESTIONS_KELAS_8_ESSAI = [
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "**Skenario:** Anda punya array `[2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78, 89]` (12 elemen terurut ascending).\n\n**Tugas:** Lakukan binary search secara manual untuk mencari angka 23. Tuliskan setiap iterasi: nilai kiri, kanan, tengah, arr[tengah], dan keputusan (lanjut kiri/kanan/berhenti).",
        "essay_answer": "Iterasi 1: kiri=0, kanan=11, tengah=(0+11)/2=5, arr[5]=23. 23 == 23 → KETEMU di indeks 5. Berhenti.\n\nHanya butuh 1 iterasi karena kebetulan angka 23 ada di tengah array.\n\nJika dicari 56:\n- Iter 1: kiri=0, kanan=11, tengah=5, arr[5]=23 < 56 → kiri=6\n- Iter 2: kiri=6, kanan=11, tengah=8, arr[8]=56 == 56 → KETEMU. 2 iterasi."
    },
    {
        "level": "C4", "category": "Pencarian Data",
        "question": "**Analisis kasus:** Seorang programmer mengimplementasikan binary search dengan bug berikut:\n\n```python\ndef binary_search(arr, key):\n    kiri, kanan = 0, len(arr)\n    while kiri < kanan:\n        tengah = (kiri + kanan) // 2\n        if arr[tengah] == key:\n            return tengah\n        elif arr[tengah] < key:\n            kiri = tengah\n        else:\n            kanan = tengah\n    return -1\n```\n\nIdentifikasi minimal 3 bug dan jelaskan cara memperbaikinya.",
        "essay_answer": "Bug yang teridentifikasi:\n\n1. **kanan = len(arr) — off-by-one**: harusnya len(arr) - 1 (indeks terakhir). Dengan len(arr), indeks arr[len(arr)] out of bound saat diperiksa.\n\n2. **while kiri < kanan — bug kondisi loop**: harusnya kiri <= kanan. Dengan '<', kasus 1 elemen (kiri==kanan) tak pernah diperiksa, mengembalikan -1 meski elemen ada.\n\n3. **kiri = tengah (BUKAN tengah + 1)**: jika arr[tengah] < key, kiri harus = tengah + 1 (skip tengah karena sudah diperiksa). Dengan 'kiri = tengah', infinite loop bisa terjadi jika area tak mengecil.\n\n4. **kanan = tengah (BUKAN tengah - 1)**: sama, harus tengah - 1 agar area mengecil.\n\nVersi yang benar:\n```python\ndef binary_search(arr, key):\n    kiri, kanan = 0, len(arr) - 1\n    while kiri <= kanan:\n        tengah = (kiri + kanan) // 2\n        if arr[tengah] == key:\n            return tengah\n        elif arr[tengah] < key:\n            kiri = tengah + 1\n        else:\n            kanan = tengah - 1\n    return -1\n```"
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Studi kasus kritis:** Aplikasi e-commerce Anda punya 10 juta produk. Saat user search 'laptop gaming', butuh 5 detik untuk menampilkan hasil. Profiler menunjukkan 90% waktu di sequential search pada array produk.\n\n**Tugas:** Diagnosa masalah dan rancang solusi lengkap. Sertakan estimasi improvement (operasi per detik), trade-off setiap solusi, dan timeline implementasi.",
        "essay_answer": "Diagnosa:\n- Sequential search O(n) pada 10 juta produk = hingga 10 juta perbandingan per query → 5 detik.\n- Tidak ada index, tidak ada sorting, tidak ada caching.\n\nSolusi (dari paling cepat implementasi hingga paling kompleks):\n\n1. **Sort + Binary Search (1-2 hari)**: Sort produk by nama (O(n log n) = 230 juta ops, sekali di startup). Binary search O(log n) = 23 ops per query. Estimasi: 10 jutax lebih cepat. Trade-off: hanya cocok untuk exact match, tidak untuk partial/fuzzy search.\n\n2. **Hash Table Index (3-5 hari)**: Build HashMap<product_name, product_id>. Lookup O(1) ≈ 1 op. Estimasi: 5 jutax lebih cepat dari sequential. Trade-off: only exact match, memory ~2x data size.\n\n3. **Inverted Index + TF-IDF (2-3 minggu)**: Untuk partial/fuzzy search ('laptop gaming'), build inverted index term→product_ids. Rank dengan TF-IDF. Estimasi: 1000x lebih cepat dari sequential, dengan relevance ranking. Trade-off: kompleks, butuh maintenance saat product add/delete.\n\n4. **Elasticsearch / Algolia (1-2 minggu setup)**: Outsource ke search engine specialist. Fitur lengkap: fuzzy search, autocomplete, synonyms, multilingual. Estimasi: < 100ms per query. Trade-off: cost $500-5000/bulan, dependency eksternal.\n\n5. **Multi-tier cache + CDN (ongoing)**: Cache query populer di Redis (in-memory). Estimasi: < 10ms untuk cache hit. Trade-off: cache invalidation complex.\n\nRekomendasi implementasi bertahap:\n- Minggu 1: Sort + binary search (quick win, 1000x improvement)\n- Bulan 1: Hash table index untuk exact match, inverted index untuk partial\n- Bulan 3: Migrate ke Algolia/Elasticsearch untuk skala dan fitur\n- Ongoing: Cache layer untuk hot queries\n\nEstimasi final: 5 detik → < 100ms (50x improvement)."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Refleksi:** Pilih satu aplikasi yang sering Anda gunakan (mis: Spotify, Instagram, Tokopedia). Analisis bagaimana algoritma pencarian bekerja di aplikasi tersebut. Jelaskan minimal 3 fitur pencarian yang Anda amati, dan hipotesis algoritma struktur data di baliknya.",
        "essay_answer": "Contoh jawaban untuk Spotify:\n\n1. **Search lagu dengan autocomplete** — saat user ketik 'desk', muncul 'Despacito', 'Desember', dll dalam < 100ms. Hipotesis: Trie (prefix tree) atau inverted index dengan prefix matching. Trie O(m) lookup dimana m = panjang query, jauh lebih cepat dari binary search untuk autocomplete.\n\n2. **Search artist exact match** — ketik 'Coldplay', langsung dapat profil. Hipotesis: Hash table O(1) atau B-Tree index pada kolom artist_name di database. Sorted alphabetically untuk browse view.\n\n3. **Recommendation 'Listeners like you also enjoy'** — fitur search tak langsung tapi content-based filtering. Hipotesis: Collaborative filtering (matrix factorization) + nearest neighbor search pada vector fitur user. Bukan binary search, tapi similar search di high-dimensional space (ANN - approximate nearest neighbor).\n\n4. **Search lirik** — cari kata di lirik lagu. Hipotesis: Inverted index tokenized (kata → list of song_ids). TF-IDF atau BM25 ranking. Mirip search engine Google tapi untuk lirik.\n\n5. **Genre/playlist filter** — filter lagu by genre. Hipotesis: B-Tree index pada kolom genre, atau bitmap index untuk filter multi-kriteria (genre + year + tempo).\n\nRefleksi: aplikasi modern tidak pakai satu algoritma search, tapi kombinasi sesuai use case. Exact match → hash table. Prefix → Trie. Full-text → inverted index. Recommendation → vector search. Ini menunjukkan pentingnya memahami trade-off setiap algoritma."
    },
    {
        "level": "C5", "category": "Pencarian Data",
        "question": "**Eksperimen desain:** Anda diminta merancang struktur data untuk 'spell checker' yang memeriksa apakah kata yang diketik user ada di kamus 200.000 kata Bahasa Indonesia. \n\n**Tugas:** Bandingkan minimal 3 pendekatan (sequential search, sort + binary search, hash table, trie) dari sisi: kecepatan lookup, memory, dukungan prefix/autocomplete, dan kompleksitas implementasi. Berikan rekomendasi akhir.",
        "essay_answer": "Perbandingan 4 pendekatan untuk kamus 200.000 kata:\n\n| Aspek | Sequential | Sort + Binary | Hash Table | Trie |\n|-------|-----------|--------------|------------|------|\n| Lookup | O(n) = 200k ops | O(log n) ≈ 18 ops | O(1) ≈ 1 op | O(m) dimana m = panjang kata ≈ 8 ops |\n| Memory | 200k × 20 byte = 4 MB | 4 MB + sort overhead | 200k × 50 byte (overhead) = 10 MB | 200k × 8 × node size ≈ 30-50 MB |\n| Prefix/autocomplete | Tidak efisien (scan all) | Bisa (lower_bound + iterate) | Tidak support (exact match only) | Native support (traverse subtree) |\n| Implementasi | Mudah | Sedang | Mudah (built-in di sebagian besar bahasa) | Sulit (custom class) |\n| Update (add/delete) | O(1) insert, O(n) delete | O(n log n) re-sort | O(1) | O(m) per kata |\n\nRekomendasi akhir: **Trie**\n\nAlasan:\n1. Spell checker butuh prefix matching ('mem' → 'membr...', 'memb...', 'memo...') untuk suggestion. Trie adalah satu-satunya yang native support ini.\n2. Lookup O(m) dimana m = panjang kata (8-10), efektif konstan untuk kata Bahasa Indonesia.\n3. Memory 30-50 MB masih reasonable untuk aplikasi modern.\n4. Update O(m) per kata, efisien untuk add kata baru (Bahasa Indonesia terus berkembang).\n5. Bonus: Trie bisa disimpan di disk dengan struktur compact (Radix Tree / Patricia Trie) untuk hemat memory.\n\nUntuk produksi: gunakan library seperti `marisa-trie` (Python) atau `DoubleArrayTrie` (Java) yang dioptimasi. Hindari implementasi naive Trie dari awal — bug di edge case (unicode, case folding) common.\n\nTrade-off yang diterima: implementasi lebih sulit di awal, tapi gain di fitur (autocomplete) dan kecepatan lookup membuatnya worthwhile untuk spell checker."
    },
]


# ============================================================
# KELAS 9: STRUKTUR DATA TREE
# ============================================================

MATERI_KELAS_9 = """# Memperdalam Struktur Data Tree: Hierarki yang Memungkinkan Pencarian Efisien

## Mengapa Tree Penting?

Sebagian besar data di dunia nyata memiliki struktur hierarkis. Struktur organisasi perusahaan: CEO di puncak, di bawahnya direktur, manajer, staf. Sistem file komputer: drive C:, folder Program Files, subfolder, file. Klasifikasi biologi: Kingdom, Filum, Kelas, Ordo, Famili, Genus, Spesies. Semua ini adalah tree — struktur data yang merepresentasikan hierarki.

Tanpa tree, kita tidak akan punya database cepat (B-Tree di SQL), tidak ada DOM untuk halaman web, tidak ada filesystem yang efisien, dan tidak ada routing di jaringan komputer. Memahami tree adalah gerbang untuk memahami hampir semua struktur data lanjutan dalam ilmu komputer.

## Definisi Tree

Tree adalah struktur data hierarkis yang terdiri dari **node** (titik) dan **edge** (garis penghubung). Tree memiliki satu node khusus bernama **root** (akar) yang berada di puncak. Setiap node (kecuali root) memiliki tepat satu **parent** (induk), dan dapat memiliki nol atau lebih **child** (anak). Node yang tidak punya child disebut **leaf** (daun).

Istilah penting dalam tree:
- **Root**: node di puncak, tidak punya parent
- **Parent**: node induk langsung
- **Child**: node anak langsung
- **Sibling**: node dengan parent yang sama
- **Leaf**: node tanpa child
- **Internal node**: node dengan minimal 1 child
- **Subtree**: tree bagian dari tree yang lebih besar
- **Depth**: jarak dari root ke node (root depth = 0)
- **Height**: jarak terjauh dari root ke leaf

## Jenis-Jenis Tree

### 1. General Tree (Tree Umum)
Setiap node bisa punya child sebanyak apapun. Contoh: struktur folder, genealogy.

### 2. Binary Tree (Tree Biner)
Setiap node punya maksimal 2 child: **left child** dan **right child**. Ini jenis tree paling umum dipelajari dan menjadi dasar banyak algoritma.

### 3. Binary Search Tree (BST)
Binary tree dengan properti khusus: untuk setiap node, semua nilai di subtree kiri lebih kecil dari node, dan semua nilai di subtree kanan lebih besar dari node. Properti ini membuat BST ideal untuk pencarian, insertion, dan deletion — semuanya O(log n) jika tree balanced.

### 4. Balanced Tree (AVL, Red-Black)
BST yang otomatis menyeimbangkan diri saat insert/delete untuk menjaga height tetap O(log n). Tanpa balancing, BST bisa degenerate jadi linked list O(n).

### 5. B-Tree
Tree berorde banyak (bukan biner) yang digunakan di database dan filesystem. Setiap node bisa punya ratusan child, cocok untuk data di disk (minimize I/O).

## Traversal Tree (Penjelajahan Tree)

Traversal adalah proses mengunjungi setiap node dalam tree. Ada 4 strategi utama:

### 1. In-order Traversal (Left, Root, Right)
Kunjungi subtree kiri → root → subtree kanan. Pada BST, in-order menghasilkan nilai terurut ascending. Ini properti penting untuk sorting.

```
FUNGSI inOrder(node):
  JIKA node == null: KEMBALIKAN
  inOrder(node.kiri)
  cetak(node.nilai)
  inOrder(node.kanan)
```

### 2. Pre-order Traversal (Root, Left, Right)
Kunjungi root dulu, lalu subtree kiri, lalu subtree kanan. Cocok untuk membuat copy tree atau prefix expression.

### 3. Post-order Traversal (Left, Right, Root)
Kunjungi subtree kiri, subtree kanan, lalu root. Cocok untuk menghapus tree (hapus child dulu sebelum parent).

### 4. Level-order Traversal (BFS)
Kunjungi node per level, dari root ke leaf. Gunakan queue (antrian).

## Binary Search Tree: Operasi Dasar

### Search (Pencarian)
Mirip binary search: mulai dari root, bandingkan key dengan nilai node. Jika sama, ketemu. Jika lebih kecil, ke subtree kiri. Jika lebih besar, ke subtree kanan. Kompleksitas O(log n) jika tree balanced, O(n) jika degenerate.

### Insertion
Cari posisi yang tepat (mirip search), lalu tambahkan node baru di posisi tersebut. Kompleksitas O(log n) jika balanced.

### Deletion
Tiga kasus:
1. Node tanpa child: hapus langsung
2. Node dengan 1 child: ganti node dengan child-nya
3. Node dengan 2 child: cari successor in-order (node terkecil di subtree kanan), ganti nilai node dengan successor, lalu hapus successor

## Aplikasi Tree di Kehidupan Sehari-Hari

1. **DOM (Document Object Model)** halaman web adalah tree: `<html>` root, `<head>` dan `<body>` child-nya, dst.
2. **Filesystem** adalah tree: root `/`, folder dan subfolder, file di leaf
3. **Database index** menggunakan B-Tree untuk query cepat pada kolom terindeks
4. **Syntax tree** dalam compiler untuk parsing kode
5. **Decision tree** dalam machine learning untuk klasifikasi
6. **Huffman tree** dalam kompresi data (zip, jpeg)
7. **Routing table** di jaringan komputer menggunakan tree untuk longest prefix match

## Kesalahan Umum dalam Tree

1. **BST tidak balanced** — insert terurut menyebabkan degenerate menjadi linked list, O(n)
2. **Lupa base case di rekursi** — infinite recursion jika tidak cek null
3. **Salah urutan traversal** — in-order vs pre-order vs post-order menghasilkan output berbeda
4. **Deletion BST salah** — kasus 2 child sering salah ditangani

## Latihan Self-Assessment

Setelah membaca materi ini, coba jawab: mengapa in-order traversal pada BST menghasilkan nilai terurut? Bagaimana cara menjaga BST tetap balanced? Diskusikan satu skenario nyata di mana tree lebih baik dari array atau linked list.
"""

QUESTIONS_KELAS_9_PG = [
    # ── C3 (Menerapkan) — 15 soal ──
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Dalam sebuah tree, node yang TIDAK punya child disebut...",
        "options": ["Root", "Internal node", "Leaf (daun)", "Parent"],
        "correct": 2,
        "explanation": "Leaf adalah node tanpa child. Node ini berada di ujung tree dan tidak punya subtree."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "**Siti** punya binary tree dengan root A, left child B, right child C, dan B punya left child D serta right child E. Berapa leaf pada tree ini?",
        "options": ["2 (D dan E)", "3 (D, E, dan C)", "1 (hanya C)", "5 (semua)"],
        "correct": 1,
        "explanation": "Leaf = node tanpa child. D tidak punya child, E tidak punya child, C tidak punya child. Total 3 leaf. A dan B punya child, jadi internal."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Dalam BST (Binary Search Tree), semua nilai di subtree KIRI suatu node harus...",
        "options": ["Lebih besar dari node", "Lebih kecil dari node", "Sama dengan node", "Acak"],
        "correct": 1,
        "explanation": "Properti BST: subtree kiri < node < subtree kanan. In-order traversal BST menghasilkan nilai terurut ascending."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Traversal mana yang pada BST menghasilkan nilai terurut ascending?",
        "options": ["Pre-order", "In-order", "Post-order", "Level-order"],
        "correct": 1,
        "explanation": "In-order (Left, Root, Right) pada BST menghasilkan nilai terurut ascending. Properti ini sering dipakai untuk sorting dan validasi BST."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Urutan in-order traversal dari tree berikut (root=5, left=3 dengan left=1 dan right=4, right=8) adalah...",
        "options": ["5 3 1 4 8", "1 3 4 5 8", "1 4 3 8 5", "5 3 8 1 4"],
        "correct": 1,
        "explanation": "In-order = Left, Root, Right. Mulai dari root 5: traverse kiri (3 → 1 → kembalikan 1 → kembalikan 3 → traverse kanan 4 → kembalikan 4) → kembalikan 5 → traverse kanan (8). Hasil: 1, 3, 4, 5, 8."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Pre-order traversal dari tree (root=A, left=B, right=C, B left=D, B right=E) adalah...",
        "options": ["D B E A C", "A B D E C", "D E B C A", "A B C D E"],
        "correct": 1,
        "explanation": "Pre-order = Root, Left, Right. Mulai root A → traverse kiri (B: root B, left D, right E) → A B D E → traverse kanan C → A B D E C."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Post-order traversal dari tree (root=A, left=B, right=C, B left=D) adalah...",
        "options": ["A B D C", "D B C A", "A B C D", "D A B C"],
        "correct": 1,
        "explanation": "Post-order = Left, Right, Root. Traverse kiri B → traverse kiri D (leaf, kembalikan D) → B tidak punya right → kembalikan B → traverse kanan C (leaf, kembalikan C) → kembalikan A. Hasil: D, B, C, A."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Kompleksitas pencarian pada BST balanced adalah...",
        "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        "correct": 1,
        "explanation": "BST balanced: setiap iterasi eliminasi setengah node (mirip binary search). Height = log n, jadi search O(log n). Tapi jika tree tidak balanced (degenerate), kompleksitas jadi O(n)."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "**Budi** insert angka 5, 3, 7, 1, 4 ke BST kosong. Root adalah...",
        "options": ["1 (paling kecil)", "5 (yang pertama di-insert)", "7 (paling besar)", "4 (median)"],
        "correct": 1,
        "explanation": "Insert pertama jadi root. Insert berurutan: 5 jadi root, 3 < 5 ke kiri, 7 > 5 ke kanan, 1 < 5 ke kiri lalu < 3 ke kiri, 4 < 5 ke kiri lalu > 3 ke kanan. Root tetap 5."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Dalam BST, jika kita insert angka terurut ascending (1, 2, 3, 4, 5), apa yang terjadi?",
        "options": [
            "BST balanced sempurna",
            "BST degenerate menjadi seperti linked list (semua node di right child)",
            "BST crash",
            "BST auto-balance"
        ],
        "correct": 1,
        "explanation": "Insert ascending ke BST kosong: 1 jadi root, 2 > 1 ke kanan, 3 > 2 ke kanan, dst. Hasilnya tree miring ke kanan seperti linked list. Search menjadi O(n), bukan O(log n). Solusi: pakai self-balancing tree (AVL, Red-Black)."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Level-order traversal menggunakan struktur data...",
        "options": ["Stack (tumpukan)", "Queue (antrian)", "Array", "Linked list"],
        "correct": 1,
        "explanation": "Level-order adalah BFS (Breadth-First Search). Pakai queue: pop node, push child-nya, ulangi. In-order/pre-order/post-order pakai stack (atau rekursi yang implisit pakai call stack)."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Dalam tree, 'depth' dari root adalah...",
        "options": ["0", "1", "-1", "Tergantung jumlah node"],
        "correct": 0,
        "explanation": "Konvensi: depth root = 0. Depth node = jumlah edge dari root ke node tersebut. Anak root depth=1, cucu depth=2, dst."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Height tree dengan 1 node (hanya root) adalah...",
        "options": ["0", "1", "-1", "Tidak terdefinisi"],
        "correct": 0,
        "explanation": "Konvensi umum: height = jumlah edge di path terpanjang dari root ke leaf. Untuk tree 1 node, tidak ada edge, height = 0. (Beberapa literature pakai height = 1 untuk 1 node, tapi 0 lebih umum.)"
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "**Eka** punya BST dengan root 10, left child 5, right child 15. Ia mencari angka 7. Langkah pertama adalah...",
        "options": [
            "Periksa right child (15)",
            "Periksa left child (5) — karena 7 < 10",
            "Periksa root lagi",
            "Berhenti, 7 tidak ada"
        ],
        "correct": 1,
        "explanation": "Search BST: bandingkan key dengan root. 7 < 10, jadi cari di subtree kiri (root 5). Dari 5, 7 > 5, cari di subtree kanan 5 (kosong) → tidak ada."
    },
    {
        "level": "C3", "category": "Struktur Data Tree",
        "question": "Manakah yang BUKAN merupakan aplikasi tree?",
        "options": [
            "DOM halaman web",
            "Filesystem komputer",
            "Database index (B-Tree)",
            "Random access array"
        ],
        "correct": 3,
        "explanation": "Array bukan tree, melainkan struktur data linier. DOM, filesystem, dan B-Tree adalah aplikasi tree yang umum."
    },
    # ── C4 (Menganalisis) — 15 soal ──
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Perhatikan BST berikut:\n\n```\n       10\n      /  \\\n     5    15\n    / \\     \\\n   3   7    20\n```\n\nBerapa node leaf pada tree ini?",
        "options": ["2 (3 dan 20)", "3 (3, 7, dan 20)", "4 (3, 7, 15, 20)", "1 (hanya 3)"],
        "correct": 1,
        "explanation": "Analisis: leaf = node tanpa child. 3 (no child), 7 (no child), 20 (no child). 5 punya child (3, 7), 15 punya child (20), 10 punya child (5, 15). Total 3 leaf."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "BST dengan insert order [50, 30, 70, 20, 40, 60, 80] menghasilkan tree dengan height...",
        "options": ["1 (perfect balanced)", "2 (balanced)", "3 (moderate)", "7 (degenerate)"],
        "correct": 1,
        "explanation": "Analisis: insert 50 (root) → 30 kiri, 70 kanan → 20 kiri-nya 30, 40 kanan-nya 30, 60 kiri-nya 70, 80 kanan-nya 70. Tree:\n```\n       50\n     /    \\\n    30     70\n   / \\    / \\\n  20 40  60 80\n```\nHeight = 2 (root ke leaf terbanyak 2 edge). Balanced sempurna."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "BST dengan insert order [1, 2, 3, 4, 5] menghasilkan tree dengan height... (asumsi height = edge count)",
        "options": ["2 (balanced)", "4 (degenerate ke kanan)", "5 (degenerate)", "1 (root only)"],
        "correct": 1,
        "explanation": "Analisis: insert 1 (root), 2 > 1 ke kanan, 3 > 2 ke kanan, 4 > 3 ke kanan, 5 > 4 ke kanan. Tree miring ke kanan semua, height = 4 edge (1→2→3→4→5). Degenerate = seperti linked list."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Pada BST berikut, in-order traversal menghasilkan...\n\n```\n       8\n      / \\\n     3   10\n    / \\    \\\n   1   6    14\n```\n",
        "options": [
            "8 3 1 6 10 14",
            "1 3 6 8 10 14 (terurut ascending)",
            "1 6 3 14 10 8",
            "8 10 14 3 6 1"
        ],
        "correct": 1,
        "explanation": "Analisis: In-order (L, Root, R) pada BST = sorted ascending. traverse: leftmost 1, kembali 3, traverse kanan 6, kembali 8, traverse kanan 10, traverse kanan 14. Hasil: 1, 3, 6, 8, 10, 14. Terurut."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Mengapa BST degenerate (insert ascending) menyebabkan search O(n)?",
        "options": [
            "Karena tree tidak balanced",
            "Karena search BST pada degenerate tree mirip sequential search linked list — harus traverse semua node",
            "Karena BST rusak",
            "Karena height = 0"
        ],
        "correct": 1,
        "explanation": "Analisis: insert ascending membuat BST miring ke kanan (1→2→3→4→5). Search worst case = traverse semua node dari root ke leaf = O(n). Tanpa balancing, BST tidak ada gunanya vs sorted array."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Manakah yang MENYEBABKAN BST tidak terbalanced?",
        "options": [
            "Insert data random",
            "Insert data terurut (ascending atau descending)",
            "Insert terlalu banyak",
            "Tidak ada yang menyebabkan"
        ],
        "correct": 1,
        "explanation": "Analisis: insert terurut (1, 2, 3, ...) membuat semua node ke child kanan saja → degenerate ke kanan. Insert descending (5, 4, 3, ...) → degenerate ke kiri. Random insert cenderung balanced."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Penghapusan node BST dengan 2 child. Strategi standar adalah...",
        "options": [
            "Hapus node dan kedua child-nya",
            "Cari successor in-order (node terkecil di subtree kanan), ganti nilai node dengan successor, hapus successor",
            "Hapus node saja, biarkan child menjadi orphan",
            "Tidak bisa dihapus"
        ],
        "correct": 1,
        "explanation": "Analisis: successor in-order = node terkecil di subtree kanan (paling kiri di subtree kanan). Ganti nilai node yang dihapus dengan successor, lalu hapus successor (yang pasti punya 0 atau 1 child, mudah dihapus). Properti BST tetap terjaga."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "AVL Tree dan Red-Black Tree adalah jenis BST yang...",
        "options": [
            "Tidak bisa diinsert",
            "Self-balancing — otomatis menjaga height tetap O(log n) setelah insert/delete",
            "Hanya untuk angka genap",
            "Lebih lambat dari BST biasa"
        ],
        "correct": 1,
        "explanation": "Analisis: AVL dan Red-Black Tree melakukan rotasi otomatis saat insert/delete untuk menjaga balance. AVL lebih ketat (balance factor ±1), Red-Black lebih longgar. Keduanya menjamin O(log n) untuk semua operasi."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Pada tree berikut, parent dari node 6 adalah...\n\n```\n       8\n      / \\\n     3   10\n    / \\    \\\n   1   6    14\n```\n",
        "options": ["8", "3", "10", "1"],
        "correct": 1,
        "explanation": "Analisis: node 6 ada di subtree kiri root 8, sebagai right child dari 3. Parent langsung 6 = 3. (8 adalah grandparent, 10 adalah uncle.)"
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Subtree dari node 3 pada tree berikut adalah...\n\n```\n       8\n      / \\\n     3   10\n    / \\    \\\n   1   6    14\n```\n",
        "options": [
            "Hanya node 3",
            "Tree yang berakar di 3: nodes {3, 1, 6}",
            "Tree yang berakar di 3: nodes {3, 1, 6, 8, 10, 14}",
            "Tidak ada subtree"
        ],
        "correct": 1,
        "explanation": "Analisis: subtree dari node 3 = tree yang berakar di 3, mencakup node 3 dan semua descendant-nya (1 dan 6). Subtree = bagian dari tree yang merupakan tree itu sendiri."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Manakah traversal yang cocok untuk menghapus tree (free memory)?",
        "options": [
            "Pre-order — hapus parent dulu",
            "In-order — hapus kiri, root, kanan",
            "Post-order — hapus child dulu sebelum parent (penting karena hapus parent dulu = child orphan)",
            "Level-order — hapus per level"
        ],
        "correct": 2,
        "explanation": "Analisis: post-order (Left, Right, Root) menghapus child dulu, baru parent. Ini penting karena setelah parent dihapus, pointer ke child hilang → memory leak. Post-order memastikan child di-free dulu."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Mengapa in-order traversal pada BST menghasilkan nilai terurut ascending?",
        "options": [
            "Karena traversal dari kiri ke kanan",
            "Karena properti BST: subtree kiri < node < subtree kanan. In-order = kiri-node-kanan, sehingga nilai terurut dari kecil ke besar",
            "Karena algoritma sorting",
            "Karena rekursi"
        ],
        "correct": 1,
        "explanation": "Analisis: properti BST: left < root < right. In-order mengunjungi: left (semua nilai < root) → root → right (semua nilai > root). Maka output terurut ascending. Properti fundamental BST."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "B-Tree berbeda dari BST karena...",
        "options": [
            "B-Tree tidak punya root",
            "B-Tree adalah tree berorde banyak (setiap node bisa punya ratusan child), dioptimasi untuk disk I/O",
            "B-Tree lebih lambat dari BST",
            "B-Tree hanya untuk angka"
        ],
        "correct": 1,
        "explanation": "Analisis: B-Tree adalah generalisasi BST ke multi-way. Setiap node bisa punya 100+ child, ideal untuk database karena minimizes disk reads (1 node = 1 disk page). BST biner terlalu dalam untuk disk-based storage."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Pada tree berikut, sibling dari node 6 adalah...\n\n```\n       8\n      / \\\n     3   10\n    / \\    \\\n   1   6    14\n```\n",
        "options": ["1", "3", "10", "14"],
        "correct": 0,
        "explanation": "Analisis: sibling = node dengan parent yang sama. Parent 6 = 3. Child 3 = 1 dan 6. Jadi sibling 6 = 1."
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "Kompleksitas waktu insert BST balanced vs BST degenerate (worst case)?",
        "options": [
            "Balanced O(log n), Degenerate O(n)",
            "Balanced O(n), Degenerate O(log n)",
            "Keduanya O(log n)",
            "Keduanya O(n)"
        ],
        "correct": 0,
        "explanation": "Analisis: BST balanced height = log n, insert butuh traverse dari root ke leaf = O(log n). BST degenerate height = n (mirip linked list), insert O(n). Tanpa balancing, BST tidak menjamin O(log n)."
    },
    # ── C5 (Mengevaluasi) — 15 soal ──
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Nina** mengklaim BST-nya bisa search O(1). Apakah klaim ini mungkin?",
        "options": [
            "Ya, jika BST perfect balanced",
            "Tidak, BST search best case O(1) (root == key), tapi average dan worst case O(log n) atau O(n)",
            "Ya, selalu O(1)",
            "Tidak, BST selalu O(n)"
        ],
        "correct": 1,
        "explanation": "Evaluasi: best case O(1) hanya jika root == key. Average balanced O(log n). Worst case degenerate O(n). Klaim 'bisa search O(1)' menyesatkan jika tidak dijelaskan konteks best case."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Manakah strategi TERBAIK jika data sering diinsert/delete dan butuh search O(log n) garant?",
        "options": [
            "BST biasa — riskan degenerate",
            "Self-balancing BST (AVL atau Red-Black) — menjamin O(log n) untuk semua operasi",
            "Sorted array — search O(log n) tapi insert O(n)",
            "Hash table — search O(1) tapi tidak support range query"
        ],
        "correct": 1,
        "explanation": "Evaluasi: AVL/Red-Black menjamin balanced via rotasi otomatis. Insert/delete/search semua O(log n). Sorted array: search cepat tapi insert/delete O(n). Hash table: O(1) tapi tidak support range/ordered query. Self-balancing BST pilihan terbaik."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Omar** memilih hash table untuk implementasi 'leaderboard game' yang butuh top 10 player. Evaluasi pilihan ini.",
        "options": [
            "Tepat, hash table optimal",
            "Salah — hash table tidak support range/top-k query. Sebaiknya pakai max-heap atau sorted set (Red-Black Tree)",
            "Salah, pakai array saja",
            "Salah, pakai BST biasa"
        ],
        "correct": 1,
        "explanation": "Evaluasi: hash table O(1) untuk exact lookup, tapi tidak bisa ambil 'top 10 highest score' tanpa scan semua = O(n). Max-heap bisa ambil top-k O(k log n). Sorted set (Red-Black Tree) bisa ambil range O(log n + k). Hash table pilihan salah untuk leaderboard."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Manakah alasan utama filesystem pakai tree (B-Tree khususnya)?",
        "options": [
            "Karena tree estetis",
            "Hierarki folder natural, plus B-Tree minimizes disk I/O (1 node = 1 disk page = 1 read)",
            "Karena tree lebih mudah diprogram",
            "Karena tree hanya untuk filesystem"
        ],
        "correct": 1,
        "explanation": "Evaluasi: filesystem punya struktur hierarki (folder dalam folder), cocok dengan tree. B-Tree khususnya efisien di disk karena 1 node = 1 block disk, sehingga traverse 1 level = 1 disk read. Minimizes I/O krusial untuk performance disk-based storage."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Pak Guru** menanyakan: kapan BST LEBIH BAIK dari hash table?",
        "options": [
            "Selalu, BST selalu lebih baik",
            "Saat butuh range query (cari semua nilai 50-100), ordered iteration, atau predecessor/successor query",
            "Tidak pernah, hash table selalu lebih baik",
            "Hanya untuk data kecil"
        ],
        "correct": 1,
        "explanation": "Evaluasi: hash table O(1) untuk exact match, tapi tidak support range query (cari 50 ≤ x ≤ 100). BST support range query O(log n + k). BST juga support in-order iteration terurut. Trade-off: BST lebih lambat untuk exact match, tapi lebih fleksibel."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Manakah evaluasi yang BENAR tentang kompleksitas operasi BST?",
        "options": [
            "Search O(1), Insert O(1), Delete O(1) — selalu konstan",
            "Search O(log n) balanced, O(n) degenerate. Insert dan Delete sama",
            "Search O(n), Insert O(1), Delete O(1)",
            "Search O(n²), Insert O(n²), Delete O(n²)"
        ],
        "correct": 1,
        "explanation": "Evaluasi: BST search/insert/delete semua butuh traverse dari root ke target → height tree. Balanced height = log n → O(log n). Degenerate height = n → O(n). Kompleksitas tergantung shape tree."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Qori** mengimplementasikan BST tanpa balancing. Setelah insert 10.000 data terurut, search jadi lambat. Solusi TERBAIK?",
        "options": [
            "Hapus BST, pakai hash table",
            "Pakai self-balancing BST (AVL/Red-Black) yang auto-rotate saat insert",
            "Re-sort data secara berkala",
            "Tidak bisa diatasi"
        ],
        "correct": 1,
        "explanation": "Evaluasi: insert 10k data terurut → BST degenerate (mirip linked list) → search O(n). Solusi: pakai AVL/Red-Black yang auto-balance via rotasi. Setelah insert, height tetap log n. Implementasi lebih kompleks tapi performance terjamin."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Saat menghapus node BST dengan 2 child, mengapa cari successor in-order (bukan predecessor)?",
        "options": [
            "Karena successor lebih mudah dicari",
            "Successor in-order adalah nilai terkecil di subtree kanan — pasti lebih besar dari node (memenuhi properti BST) dan pasti punya ≤1 child (mudah dihapus)",
            "Karena aturan matematika",
            "Tidak ada alasan, bisa pilih sembarang"
        ],
        "correct": 1,
        "explanation": "Evaluasi: successor in-order = node paling kiri di subtree kanan. Karena paling kiri, dia pasti tidak punya left child (kalau punya, bukan paling kiri). Jadi successor pasti punya ≤1 child (right child saja), mudah dihapus. Properti BST terjaga."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Manakah alasan utama AVL Tree lebih ketat balance daripada Red-Black Tree?",
        "options": [
            "AVL lebih baru",
            "AVL menjamin balance factor ≤1 (height difference antar subtree ≤1), Red-Black lebih longgar (height ratio ≤2). AVL lebih cepat search, Red-Black lebih cepat insert/delete (lebih sedikit rotasi)",
            "AVL lebih mudah diprogram",
            "Tidak ada perbedaan"
        ],
        "correct": 1,
        "explanation": "Evaluasi: AVL balance factor ≤1 → height selalu optimal untuk search. Red-Black longgar (max height 2x min) → lebih sedikit rotasi saat insert/delete, lebih cepat update. Trade-off: AVL untuk read-heavy, Red-Black untuk write-heavy."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Manakah kasus di mana tree BUKAN struktur data terbaik?",
        "options": [
            "Hierarki file dan folder",
            "Query range pada data terurut",
            "Akses random by index (mis: array[i]) — array lebih baik O(1) vs tree O(log n)",
            "Implementasi autocomplete (Trie)"
        ],
        "correct": 2,
        "explanation": "Evaluasi: akses random by index = O(1) di array, O(log n) di BST. Array menang untuk random access. Tree menang untuk hierarki, range query, ordered iteration. Tidak ada satu struktur terbaik untuk semua kasus."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Tono** membuat BST dari angka [50, 30, 70, 40, 60, 20]. Apakah tree ini balanced?",
        "options": [
            "Ya, balanced sempurna",
            "Tidak, subtree kiri 30 punya 2 level (30-20, 30-40), subtree kanan 70 punya 1 level (70-60). Height left = 2, right = 1. Balance factor root = 1, masih dalam toleransi AVL (≤1) tapi tidak sempurna balanced",
            "Tidak tahu, harus diuji dulu",
            "Salah, ini bukan BST"
        ],
        "correct": 1,
        "explanation": "Evaluasi: Insert order: 50 root, 30 kiri, 70 kanan, 40 kanan-nya 30, 60 kiri-nya 70, 20 kiri-nya 30. Tree:\n```\n      50\n     /  \\\n    30   70\n   / \\   /\n  20 40 60\n```\nLeft subtree height=2 (30-20 atau 30-40), right subtree height=1 (70-60). Balance factor = 2-1 = 1, masih AVL-valid (≤1) tapi tidak perfect balanced."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Manakah pernyataan evaluasi yang PALING tepat tentang trie (prefix tree)?",
        "options": [
            "Trie adalah BST khusus untuk string",
            "Trie adalah tree yang setiap node merepresentasikan 1 karakter. Lookup O(m) dimana m = panjang string. Cocok untuk autocomplete dan spell check",
            "Trie sama dengan hash table",
            "Trie hanya untuk angka"
        ],
        "correct": 1,
        "explanation": "Evaluasi: Trie: setiap node = 1 karakter, path dari root = 1 string. Lookup O(m) dimana m = panjang string (konstan untuk kata pendek). Cocok untuk autocomplete (traverse subtree) dan spell check (cari kata di kamus). Berbeda dari BST."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Heap (binary heap) berbeda dari BST karena...",
        "options": [
            "Heap tidak punya root",
            "Heap hanya menjamin properti parent ≥ child (max-heap) atau parent ≤ child (min-heap), TIDAK menjamin inorder terurut. BST menjamin left < root < right",
            "Heap lebih lambat dari BST",
            "Heap hanya untuk angka positif"
        ],
        "correct": 1,
        "explanation": "Evaluasi: Heap properti: parent ≥ child (max-heap). Tidak ada jaminan antara sibling kiri vs kanan. In-order heap tidak terurut. BST: left < root < right, in-order terurut. Heap untuk priority queue, BST untuk ordered storage. Tujuan berbeda."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "Untuk implementasi 'undo/redo' di aplikasi text editor, struktur data yang paling tepat adalah...",
        "options": [
            "BST — tidak ideal karena tidak ada parent pointer",
            "Doubly linked list atau tree dengan parent pointer (untuk navigation back/forward)",
            "Hash table",
            "Array statis"
        ],
        "correct": 1,
        "explanation": "Evaluasi: undo/redo butuh navigation maju/mundur. Doubly linked list natural untuk ini (prev/next pointer). Tree dengan parent pointer juga bisa untuk versi history branching (multiple redo paths). BST tanpa parent pointer tidak ideal karena tidak bisa traverse mundur."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Vera** membandingkan BST vs sorted array untuk 1 juta data dengan 90% search, 10% insert/delete. Mana yang lebih baik?",
        "options": [
            "Sorted array — search O(log n) cepat",
            "BST balanced — search O(log n) sama, tapi insert/delete O(log n) vs sorted array O(n). BST menang overall",
            "Hash table",
            "Linked list"
        ],
        "correct": 1,
        "explanation": "Evaluasi: 90% search × O(log n) + 10% insert/delete × O(log n) = O(log n) average untuk BST. Sorted array: 90% × O(log n) + 10% × O(n) = O(n) average (insert/delete dom). BST menang untuk workload dengan banyak update."
    },
]

QUESTIONS_KELAS_9_ESSAI = [
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "**Skenario:** Diberikan BST berikut:\n\n```\n         15\n        /  \\\n       8    20\n      / \\     \\\n     4   11    25\n    / \\   /\n   2   6 10\n```\n\n**Tugas:** \n1. Tentukan root, leaf, dan internal node.\n2. Hitung depth setiap node.\n3. Hitung height tree.\n4. Lakukan in-order traversal, tuliskan urutan outputnya.",
        "essay_answer": "1. **Root**: 15\n   **Leaf**: 2, 6, 10, 25\n   **Internal node**: 15, 8, 20, 4, 11\n\n2. **Depth** (jumlah edge dari root):\n   - 15: 0\n   - 8, 20: 1\n   - 4, 11, 25: 2\n   - 2, 6, 10: 3\n\n3. **Height tree** = path terpanjang dari root ke leaf = 3 (15→8→4→2 atau 15→8→4→6 atau 15→8→11→10)\n\n4. **In-order traversal** (Left, Root, Right):\n   traverse dari 15: \n   - left subtree 8: traverse left 4: traverse left 2 (kembalikan 2) → 4 → traverse right 6 (kembalikan 6) → kembalikan 4 (selesai subtree 4)\n   - kembalikan 8\n   - right subtree 11: traverse left 10 (kembalikan 10) → kembalikan 11 (no right child)\n   - kembalikan 8 (selesai left subtree 15)\n   - kembalikan 15\n   - right subtree 20: no left → kembalikan 20 → traverse right 25 (kembalikan 25)\n   \n   Output: 2, 4, 6, 8, 10, 11, 15, 20, 25\n   \n   (Terurut ascending — properti BST terpenuhi)"
    },
    {
        "level": "C4", "category": "Struktur Data Tree",
        "question": "**Analisis kasus:** Seorang programmer membuat BST dengan insert order: [10, 5, 15, 3, 7, 12, 20, 1, 4, 6, 8, 11, 13, 18, 25].\n\n**Tugas:**\n1. Gambar struktur tree yang dihasilkan.\n2. Identifikasi apakah tree balanced, dan jika tidak, di subtree mana ketidakseimbangan terjadi.\n3. Jelaskan dampak ketidakseimbangan terhadap performance search.",
        "essay_answer": "1. **Struktur tree hasil insert:**\n```\n              10\n           /      \\\n          5        15\n         / \\     /    \\\n        3   7   12     20\n       / \\ / \\  / \\   / \\\n      1  4 6 8 11 13 18 25\n```\nTree perfect balanced: setiap node punya 2 child (kecuali leaf), height = 3.\n\n2. **Balance analysis:**\n- Subtree kiri root 10 (akar 5): height = 2 (5→3→1 atau 5→7→6)\n- Subtree kanan root 10 (akar 15): height = 2 (15→12→11 atau 15→20→18)\n- Balance factor root = 2-2 = 0 → PERFECT balanced\n- Semua subtree juga balanced karena insert order dirancang untuk balanced.\n\n3. **Dampak jika tidak balanced:**\nJika insert order ascending [1, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 15, 18, 20, 25], tree akan degenerate (miring ke kanan semua), height = 14 (mirip linked list).\n\nKonsekuensi:\n- Search: O(n) = 15 langkah worst case (vs O(log n) = 4 langkah jika balanced)\n- Insert: O(n) = traverse semua node\n- Delete: O(n)\n\nUntuk 15 elemen perbedaan tidak signifikan. Tapi untuk 1 juta elemen, balanced O(log n) = 20 langkah vs degenerate O(n) = 1 juta langkah — perbedaan 50.000x.\n\nSolusi: gunakan self-balancing BST (AVL/Red-Black Tree) yang otomatis melakukan rotasi saat insert/delete untuk menjaga balance."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Studi kasus kritis:** Anda diminta merancang struktur data untuk 'autocomplete' di mesin pencari. Saat user mengetik 'jav', harus muncul saran: 'java', 'javascript', 'javscript framework', 'java developer', dll (1 miliar query history).\n\n**Tugas:** Bandingkan minimal 3 struktur data (BST, Hash Table, Trie) untuk use case ini. Sertakan kompleksitas lookup, memory, dan dukungan prefix. Berikan rekomendasi akhir dengan justifikasi.",
        "essay_answer": "Perbandingan 3 struktur data untuk autocomplete dengan 1 miliar query history:\n\n| Aspek | BST (sorted strings) | Hash Table | Trie (prefix tree) |\n|-------|----------------------|------------|---------------------|\n| Exact lookup | O(log n) = 30 ops | O(1) = 1 op | O(m) = 4 ops (m=panjang 'java'=4) |\n| Prefix lookup ('jav*') | O(log n + k) — lower_bound + iterate | Tidak support | O(m + k) — traverse subtree |\n| Memory | 1B × 20 byte = 20 GB (sorted strings) | 1B × 50 byte = 50 GB (hash overhead) | 1B × ~10 byte (shared prefix) = 10 GB |\n| Update (add new query) | O(log n) = 30 ops | O(1) | O(m) |\n| Autocomplete top-K | Perlu scan semua prefix match O(n) | Tidak support | O(m + k log k) |\n| Fuzzy search (typo) | Sulit | Sulit | Bisa dengan edit distance |\n\nAnalisis:\n\n1. **BST sorted strings**: search prefix butuh lower_bound ('jav') + upper_bound ('jaw') + iterate. O(log n + k). Untuk autocomplete top-10, butuh scan semua match (bisa ribuan), lalu sort by frequency. Mahal.\n\n2. **Hash Table**: tidak support prefix query sama sekali. Harus scan semua keys = O(n) = 1 miliar. Tidak feasible.\n\n3. **Trie**: setiap node = 1 karakter, path dari root = 1 string. Lookup 'java' = traverse 4 node. Untuk autocomplete, traverse subtree dari node 'jav' (3 level) → semua descendant adalah kandidat. Memory efisien karena prefix shared (1B query 'javascript...' dan 'java developer...' share prefix 'java').\n\nRekomendasi akhir: **Trie dengan optimasi**\n\nImplementasi produksi:\n1. **Compressed Trie (Radix Tree / Patricia Trie)**: gabung node dengan 1 child menjadi edge panjang. Hemat memory 50-80%.\n2. **Cached top-K di setiap node**: setiap node simpan top-10 query terpopuler di subtree-nya. Autocomplete = O(m) langsung dapat top-10, tanpa traverse subtree.\n3. **Distributed Trie**: 1 miliar query tidak muat di 1 server. Sharding by first character (atau prefix 2 char) ke multiple server. Setiap server muat 100 juta query.\n4. **Aging / decay**: query lama (5 tahun lalu) dikurangi weight-nya. Periodic rebuild untuk compact.\n5. **Layer cache**: in-memory Trie (Redis) untuk hot queries + persistent Trie di disk (LMDB/RocksDB) untuk cold queries.\n\nEstimasi: autocomplete < 5ms, memory 10-15 GB (dengan compression), update real-time O(m).\n\nTrade-off yang diterima: implementasi kompleks (custom Trie + sharding + cache), tapi gain di fitur (prefix autocomplete) dan kecepatan membuatnya worthwhile untuk search engine skala besar."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Refleksi kreatif:** Pilih satu aplikasi yang sering Anda gunakan (mis: file explorer di komputer, GitHub, Google Drive, Notion, dll). Identifikasi minimal 3 penggunaan struktur tree di aplikasi tersebut. Jelaskan bagaimana tree berkontribusi pada fitur/UX aplikasi.",
        "essay_answer": "Contoh jawaban untuk Google Drive:\n\n1. **Filesystem sebagai tree** — folder dan file disusun hierarkis: My Drive → Folder Kuliah → Subfolder Matematika → File PDF. Root = My Drive, setiap folder = internal node, file = leaf.\n\nKontribusi UX: user bisa organize files secara intuitif (drag-drop ke folder), navigasi breadcrumb (path dari root), collapse/expand folder di sidebar.\n\n2. **Permission inheritance sebagai tree** — permission folder diteruskan ke child (seperti parent permission). Jika folder 'Tim A' di-share ke user X, semua file di dalamnya otomatis di-share.\n\nKontribusi UX: tidak perlu set permission per file. Cukup set di parent, child inherit. Mengurangi friction dalam kolaborasi.\n\nImplementasi teknis: tree traversal DFS untuk apply permission cascade. Properti tree (1 parent per node) memastikan tidak ada ambiguity.\n\n3. **Version history sebagai tree (branch)** — setiap edit file membuat versi baru. Beberapa versi bisa diverge (multiple user edit simultaneously) lalu merge. Mirip Git branch.\n\nKontribusi UX: user bisa lihat history, restore versi lama, resolve conflict dengan UI yang jelas.\n\nImplementasi teknis: setiap file punya version tree. Revisions adalah node, parent = versi sebelumnya. Merge = combine 2 branch dengan conflict resolution.\n\n4. **Shared with me vs My Drive sebagai 2 root tree** — Drive UI memisahkan 'My Drive' (files yang user own) dan 'Shared with me' (files yang di-share ke user).\n\nKontribusi UX: filter cepat, tidak bingung dengan file milik orang lain.\n\nImplementasi teknis: virtual root dengan 2 child subtree. Drive sebenarnya mengizinkan 1 file ada di multiple folder (multi-parent via shortcut), tapi UI menyembunyikan kompleksitas ini.\n\nRefleksi: Google Drive adalah aplikasi yang heavily tree-based di backend (filesystem + permission + version). UX yang intuitif (folder, breadcrumb, share) di-enable oleh struktur tree yang natural. Tanpa tree, organisasi file akan jauh lebih sulit dipahami user."
    },
    {
        "level": "C5", "category": "Struktur Data Tree",
        "question": "**Eksperimen desain:** Anda diminta merancang struktur data untuk 'priority queue' yang harus support operasi berikut dengan efisien:\n- `insert(value, priority)` — tambah elemen\n- `extractMax()` — ambil elemen dengan priority tertinggi\n- `updatePriority(value, newPriority)` — ubah priority elemen\n- `delete(value)` — hapus elemen\n- `topK(k)` — ambil k elemen dengan priority tertinggi\n\nBandingkan 3 pendekatan: Max-Heap, BST balanced, dan Hash + Heap hybrid. Berikan rekomendasi dengan justifikasi trade-off.",
        "essay_answer": "Perbandingan 3 pendekatan untuk priority queue advanced:\n\n| Operasi | Max-Heap | BST Balanced (AVL/Red-Black) | Hash + Heap Hybrid |\n|---------|----------|-------------------------------|--------------------|\n| insert | O(log n) — sift up | O(log n) | O(log n) |\n| extractMax | O(log n) — swap root dengan last, sift down | O(log n) — cari max (rightmost), delete | O(log n) |\n| updatePriority | O(n) — harus scan untuk cari value, lalu sift up/down | O(log n) — search + delete + reinsert | O(log n) — hash lookup O(1) + sift |\n| delete | O(n) — scan untuk cari value | O(log n) | O(log n) |\n| topK | O(k log n) — extract k kali | O(k) — traverse right-to-left in-order | O(k log n) — extract k kali |\n\nAnalisis trade-off:\n\n1. **Max-Heap**: cepat untuk insert/extractMax (operasi klasik priority queue). Tapi updatePriority dan delete butuh scan O(n) karena heap tidak mendukung search by value. Tidak ideal untuk use case dengan banyak update/delete.\n\n2. **BST Balanced**: semua operasi O(log n) kecuali topK O(k) — paling efisien untuk topK. Tapi updatePriority butuh delete + insert (2x O(log n)), dan implementasi lebih kompleks dari heap. Memory overhead lebih besar (pointer parent, left, right).\n\n3. **Hash + Heap Hybrid**: heap untuk struktur priority, hash table untuk index value→position-in-heap. Lookup by value O(1) via hash, lalu sift up/down O(log n). Best of both worlds untuk use case dengan banyak update/delete.\n\nRekomendasi akhir: **Hash + Heap Hybrid**\n\nAlasan:\n- Use case spesifik: ada updatePriority dan delete by value — butuh search by value yang cepat.\n- Heap murni gagal di updatePriority/delete (O(n)).\n- BST balanced menang di topK tapi implementasi kompleks dan memory lebih besar.\n- Hybrid memberi: insert O(log n), extractMax O(log n), updatePriority O(log n), delete O(log n), topK O(k log n).\n- Implementasi: heap array-based + hash map<value, index>. Saat sift up/down, update index di hash map.\n\nTrade-off:\n- Memory 2x (heap array + hash map) — acceptable untuk use case enterprise.\n- Kompleksitas implementasi sedang — library seperti `heapdict` (Python) atau `PriorityQueue` dengan index (Java) sudah menyediakan ini.\n- topK O(k log n) lebih lambat dari BST O(k), tapi untuk k kecil (top 10/100) masih sangat cepat.\n\nImplementasi produksi: gunakan library siap pakai seperti `IndexedPriorityQueue` di Apache Commons Collections, atau Fibonacci Heap jika operasi decrease-key sangat sering (advanced algorithm, O(1) amortized). Hindari implementasi dari nol — bug di heap index update susah ditemukan dan debug."
    },
]


# ============================================================
# GENERATE SQL FILE
# ============================================================

def make_question_sql(q_id, grade, subject, cp_id, tp_id, q_data, is_essay=False):
    """Generate SQL INSERT untuk Question."""
    q_type = "essai" if is_essay else "pilihan_ganda"
    essay_answer = q_data.get("essay_answer", "") if is_essay else ""
    # Untuk PG: opsi A-D diperlukan. Untuk essai: kosong.
    if is_essay:
        option_a = option_b = option_c = option_d = ""
        correct_answer = 0
    else:
        opts = q_data["options"]
        option_a = opts[0]
        option_b = opts[1]
        option_c = opts[2]
        option_d = opts[3]
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
-- SKRIP SQL: TP2 + Materi + Soal (45 PG + 5 Essai per kelas) + Tugas 2
-- Mata Pelajaran: Informatika (Kelas 7, 8, 9)
-- Tanggal: 14 September 2026
-- ============================================================
--
-- CARA PAKAI:
-- 1. Login ke https://supabase.com → pilih project
-- 2. Buka menu "SQL Editor" → "New query"
-- 3. Salin seluruh skrip ini, paste ke editor
-- 4. Klik "Run" (tombol play)
-- 5. Tunggu pesan "Success. No rows returned"
--
-- ATAU alternatif: jalankan via run_sql_direct.py
-- (lihat scripts/run_sql_direct.py)
--
-- CATATAN:
-- - Idempotent (ON CONFLICT DO NOTHING) — aman dijalankan berulang
-- - Menggunakan CP yang SUDAH ADA (cp_inf_7_1, cp_inf_8_1, cp_inf_9_1)
-- - Membuat TP BARU (TP.x.1.2) di dalam CP1 tersebut
-- - Membuat Materi BARU (mendalam per kelas)
-- - Membuat 50 soal per kelas (45 PG C3/C4/C5 + 5 Essai C4/C5)
-- - Membuat Assignment "Tugas 2" per kelas:
--   * questionCount = 50 (45 PG + 5 essai dalam tugas yang sama)
--   * duration = 90 menit
--   * dueDate = 21 September 2026 23:59 WIB
--   * taskType = quiz_only
-- ============================================================
""")
    
    # ============================================================
    # KELAS 7
    # ============================================================
    content.append("""
-- ============================================================
-- KELAS 7: TP2 + Materi Dekomposisi + 50 Soal + Tugas 2
-- ============================================================
""")
    
    # TP2 untuk kelas 7
    content.append(f"""
-- TP 2 untuk Kelas 7 (Dekomposisi Mendalam)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_7_1_2', 'cp_inf_7_1', 'TP.7.1.2', 'Siswa mampu memecah masalah kompleks jadi langkah-langkah sistematis dengan dekomposisi.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;""")
    
    # Materi kelas 7
    content.append(f"""
-- Materi Kelas 7: Memperdalam Dekomposisi
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_7_1_2', 'Memperdalam Dekomposisi: Memecah Masalah Besar Menjadi Langkah-Langkah Kecil', {sql_str(MATERI_KELAS_7)}, 'Informatika', '7A,7B,7C', 'SMP', 'Dekomposisi', 'cp_inf_7_1', 'tp_inf_7_1_2', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")
    
    # 45 PG + 5 Essai untuk kelas 7
    # ── Trim ke 45 PG per grade (sesuai permintaan user) ──
    pg7 = QUESTIONS_KELAS_7_PG[:45]
    for i, q in enumerate(pg7, start=1):
        q_id = f"q_v3_inf_7_1_2_pg_{i:03d}"
        content.append(f"\n-- Kelas 7 PG #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "7", "Informatika", "cp_inf_7_1", "tp_inf_7_1_2", q, is_essay=False))
    
    for i, q in enumerate(QUESTIONS_KELAS_7_ESSAI, start=1):
        q_id = f"q_v3_inf_7_1_2_essay_{i:03d}"
        content.append(f"\n-- Kelas 7 Essai #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "7", "Informatika", "cp_inf_7_1", "tp_inf_7_1_2", q, is_essay=True))
    
    # Assignment Tugas 2 kelas 7
    content.append(f"""
-- Tugas 2 untuk Kelas 7 (Dekomposisi Mendalam)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_7_1_2', 'Tugas 2 Kelas 7: Dekomposisi (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang dekomposisi untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Dekomposisi" sebelum mengerjakan.', 'Informatika', '7A,7B,7C', 'SMP', true, '{DUE_DATE_ISO}', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_7_1', 'tp_inf_7_1_2', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")
    
    # ============================================================
    # KELAS 8
    # ============================================================
    content.append("""
-- ============================================================
-- KELAS 8: TP2 + Materi Pencarian Data + 50 Soal + Tugas 2
-- ============================================================
""")
    
    content.append(f"""
-- TP 2 untuk Kelas 8 (Pencarian Data)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_8_1_2', 'cp_inf_8_1', 'TP.8.1.2', 'Siswa mampu menerapkan algoritma pencarian data (sequential dan binary search).', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;""")
    
    content.append(f"""
-- Materi Kelas 8: Memperdalam Pencarian Data
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_8_1_2', 'Memperdalam Pencarian Data: Algoritma Sequential dan Binary Search', {sql_str(MATERI_KELAS_8)}, 'Informatika', '8A,8B,8C', 'SMP', 'Pencarian Data', 'cp_inf_8_1', 'tp_inf_8_1_2', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")
    
    pg8 = QUESTIONS_KELAS_8_PG[:45]
    for i, q in enumerate(pg8, start=1):
        q_id = f"q_v3_inf_8_1_2_pg_{i:03d}"
        content.append(f"\n-- Kelas 8 PG #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "8", "Informatika", "cp_inf_8_1", "tp_inf_8_1_2", q, is_essay=False))
    
    for i, q in enumerate(QUESTIONS_KELAS_8_ESSAI, start=1):
        q_id = f"q_v3_inf_8_1_2_essay_{i:03d}"
        content.append(f"\n-- Kelas 8 Essai #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "8", "Informatika", "cp_inf_8_1", "tp_inf_8_1_2", q, is_essay=True))
    
    content.append(f"""
-- Tugas 2 untuk Kelas 8 (Pencarian Data)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_8_1_2', 'Tugas 2 Kelas 8: Pencarian Data (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang algoritma pencarian data (sequential search dan binary search) untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Pencarian Data" sebelum mengerjakan.', 'Informatika', '8A,8B,8C', 'SMP', true, '{DUE_DATE_ISO}', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_8_1', 'tp_inf_8_1_2', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")
    
    # ============================================================
    # KELAS 9
    # ============================================================
    content.append("""
-- ============================================================
-- KELAS 9: TP2 + Materi Struktur Data Tree + 50 Soal + Tugas 2
-- ============================================================
""")
    
    content.append(f"""
-- TP 2 untuk Kelas 9 (Struktur Data Tree)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_inf_9_1_2', 'cp_inf_9_1', 'TP.9.1.2', 'Siswa mampu menerapkan struktur data tree (binary tree dan BST) untuk data efisien.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;""")
    
    content.append(f"""
-- Materi Kelas 9: Memperdalam Struktur Data Tree
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_inf_9_1_2', 'Memperdalam Struktur Data Tree: Hierarki yang Memungkinkan Pencarian Efisien', {sql_str(MATERI_KELAS_9)}, 'Informatika', '9A,9B', 'SMP', 'Struktur Data Tree', 'cp_inf_9_1', 'tp_inf_9_1_2', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")
    
    pg9 = QUESTIONS_KELAS_9_PG[:45]
    for i, q in enumerate(pg9, start=1):
        q_id = f"q_v3_inf_9_1_2_pg_{i:03d}"
        content.append(f"\n-- Kelas 9 PG #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "9", "Informatika", "cp_inf_9_1", "tp_inf_9_1_2", q, is_essay=False))
    
    for i, q in enumerate(QUESTIONS_KELAS_9_ESSAI, start=1):
        q_id = f"q_v3_inf_9_1_2_essay_{i:03d}"
        content.append(f"\n-- Kelas 9 Essai #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_question_sql(q_id, "9", "Informatika", "cp_inf_9_1", "tp_inf_9_1_2", q, is_essay=True))
    
    content.append(f"""
-- Tugas 2 untuk Kelas 9 (Struktur Data Tree)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_inf_9_1_2', 'Tugas 2 Kelas 9: Struktur Data Tree (45 PG + 5 Essai, 90 menit)', 'Tugas mendalam tentang struktur data tree (binary tree, BST, traversal) untuk bab 1 berpikir komputasi. Berisi 45 soal pilihan ganda (C3/C4/C5) dan 5 soal essai (C4/C5) dalam tugas yang sama. Waktu pengerjaan 90 menit. Baca materi "Memperdalam Struktur Data Tree" sebelum mengerjakan.', 'Informatika', '9A,9B', 'SMP', true, '{DUE_DATE_ISO}', 'wajib', 50, 'quiz_only', NULL, 'cp_inf_9_1', 'tp_inf_9_1_2', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
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
  AND "tpId" IN ('tp_inf_7_1_2', 'tp_inf_8_1_2', 'tp_inf_9_1_2')
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
WHERE id LIKE 'asg_inf_%_1_2'
ORDER BY "targetKelas";

-- Expected: 3 baris (kelas 7, 8, 9) dengan questionCount=50, duration=90, dueDate=2026-09-21

-- TP baru
SELECT id, "kodeTP", deskripsi
FROM "TujuanPembelajaran"
WHERE id LIKE 'tp_inf_%_1_2'
ORDER BY id;

-- Expected: 3 baris (tp_inf_7_1_2, tp_inf_8_1_2, tp_inf_9_1_2)

-- Materi baru
SELECT id, title, "targetKelas"
FROM "Material"
WHERE id LIKE 'mat_inf_%_1_2'
ORDER BY id;

-- Expected: 3 baris (mat_inf_7_1_2, mat_inf_8_1_2, mat_inf_9_1_2)
""")
    
    # Write to file
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(content))
    
    # Stats
    file_size = os.path.getsize(OUTPUT_PATH) / 1024
    total_pg = len(QUESTIONS_KELAS_7_PG[:45]) + len(QUESTIONS_KELAS_8_PG[:45]) + len(QUESTIONS_KELAS_9_PG[:45])
    total_essay = len(QUESTIONS_KELAS_7_ESSAI) + len(QUESTIONS_KELAS_8_ESSAI) + len(QUESTIONS_KELAS_9_ESSAI)
    
    print(f"\n✅ SQL file berhasil dibuat: {OUTPUT_PATH}")
    print(f"   📊 File size: {file_size:.1f} KB")
    print(f"   📝 Total soal PG: {total_pg} (45 × 3 kelas)")
    print(f"   📝 Total soal Essai: {total_essay} (5 × 3 kelas)")
    print(f"   📚 Total soal keseluruhan: {total_pg + total_essay}")
    print(f"   🎯 TP baru: 3 (TP.7.1.2, TP.8.1.2, TP.9.1.2)")
    print(f"   📖 Materi baru: 3 (Dekomposisi, Pencarian Data, Tree)")
    print(f"   📋 Assignment baru: 3 (Tugas 2 per kelas)")
    print(f"   ⏱️  Duration: 90 menit per tugas")
    print(f"   📅 Deadline: 21 September 2026 23:59 WIB")


if __name__ == "__main__":
    main()
