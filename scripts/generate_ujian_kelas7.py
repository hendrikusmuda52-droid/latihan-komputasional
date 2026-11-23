#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Ujian Kelas 7: Praktek Mengetik (30 menit) + Ujian Tertulis (40 menit)
40 PG + 5 Essai dengan stimulus
Bahan: Berpikir Komputasional, Sistem Komputer, Microsoft Word
"""

import os
OUTPUT_PATH = "/home/z/my-project/download/insert_ujian_kelas7.sql"
DUE_DATE = "2026-12-01T23:59:00+07:00"
GRADE = "7"
SUBJECT = "Informatika"
CP_ID = "cp_inf_7_1"
TP_ID = "tp_inf_7_1_1"

def sql_escape(text):
    if text is None: return ""
    return text.replace("'", "''")
def sql_str(text):
    return f"'{sql_escape(text)}'"

# ── 40 SOAL PG DENGAN STIMULUS ──
PG = [
    # Berpikir Komputasional (15 soal)
    ("**Stimulus:** Andi diminta membuat nasi goreng untuk pertama kali. Ia tidak tahu harus mulai dari mana, lalu mencari resep di internet dan mengikuti langkah demi langkah.\n\nDari kasus di atas, langkah sistematis yang dilakukan Andi merupakan penerapan pilar berpikir komputasional, yaitu...", ["Dekomposisi", "Algoritma", "Pengenalan pola", "Abstraksi"], 1, "Algoritma = urutan langkah berurutan untuk menyelesaikan masalah. Resep = algoritma memasak."),
    ("**Stimulus:** Bu Guru memberi tugas membuat poster. Siti membagi tugas menjadi: tentukan tema, cari referensi, buat sketsa, warnai, tambah teks.\n\nPilar berpikir komputasional yang diterapkan Siti adalah...", ["Algoritma", "Pengenalan pola", "Dekomposisi", "Abstraksi"], 2, "Dekomposisi = memecah masalah besar jadi bagian-bagian kecil yang lebih mudah dikerjakan."),
    ("**Stimulus:** Budi melihat deretan angka 2, 4, 6, 8, 10 dan langsung tahu angka berikutnya adalah 12.\n\nKemampuan Budi mengenali keteraturan tersebut merupakan pilar...", ["Dekomposisi", "Algoritma", "Abstraksi", "Pengenalan pola"], 3, "Pengenalan pola = mengidentifikasi keteraturan/pengulangan dalam data."),
    ("**Stimulus:** Saat membuat jadwal pelajaran, sekolah hanya mencantumkan nama mapel, jam, dan guru — tanpa menggambar wajah guru atau warna bajunya.\n\nPilar berpikir komputasional yang diterapkan adalah...", ["Algoritma", "Abstraksi", "Dekomposisi", "Pengenalan pola"], 1, "Abstraksi = fokus pada hal penting saja, abaikan detail tidak relevan."),
    ("**Stimulus:** Resep nasi goreng berisi langkah: cuci beras, masak nasi, siapkan bumbu, panaskan minyak, tumis bumbu, masukkan nasi, aduk, sajikan.\n\nJika langkah 'masak nasi' dihapus, apa yang terjadi?", ["Nasi tetap matang", "Proses gagal — nasi belum matang saat ditumis", "Lebih cepat", "Tidak ada efek"], 1, "Algoritma harus berurutan. Skip langkah = gagal. Nasi belum matang."),
    ("**Stimulus:** Dina melihat pola lampu lalu lintas: merah-kuning-hijau-merah-kuning-hijau. Warna setelah hijau adalah...", ["Biru", "Merah", "Kuning", "Putih"], 1, "Pola berulang: merah-kuning-hijau. Setelah hijau kembali ke merah."),
    ("**Stimulus:** Eka memecah masalah 'membuat video pembelajaran' menjadi: riset, skrip, rekam, edit, upload. Manakah yang BUKAN termasuk dekomposisi yang baik?", ["Membagi jadi 5 langkah urut", "Membagi jadi langkah kecil yang actionable", "Langsung mulai tanpa rencana", "Setiap langkah punya output jelas"], 2, "Dekomposisi = pecah jadi langkah kecil. 'Langsung mulai tanpa rencana' bukan dekomposisi."),
    ("**Stimulus:** Fajar melihat daftar nilai ujian: 60, 70, 80, 90, 100. Ia menyimpulkan semua siswa naik nilainya. Namun ternyata hanya 5 siswa dari 30 yang diambil.\n\nKesalahan Fajar adalah...", ["Pengenalan pola salah", "Overfitting — data terlalu sedikit untuk generalisasi", "Abstraksi berlebihan", "Algoritma salah"], 1, "Overfitting: 5 data tidak cukup untuk generalisasi 30 siswa. Sample terlalu kecil."),
    ("**Stimulus:** Gita ingin membuat jadwal harian. Ia hanya mencatat: jam belajar, jam makan, jam tidur — tanpa detail seperti warna baju atau menu makanan.\n\nPilar yang diterapkan...", ["Dekomposisi", "Algoritma", "Abstraksi", "Pengenalan pola"], 2, "Abstraksi: fokus info penting (jam, aktivitas), abaikan detail tidak relevan (warna baju, menu)."),
    ("**Stimulus:** Hari membuat flowchart untuk keputusan: 'Jika hujan, bawa payung. Jika tidak, tidak bawa payung.' Struktur ini merupakan...", ["Urutan", "Perulangan", "Percabangan (if-else)", "Dekomposisi"], 2, "Percabangan (if-else): jika kondisi A maka aksi X, jika tidak maka aksi Y."),
    ("**Stimulus:** Ivan menulis algoritma: 'Ambil gelas, tuang air, minum.' Jika urutan dibalik menjadi 'Minum, tuang air, ambil gelas', apa yang terjadi?", ["Tetap berhasil", "Gagal — tidak ada gelas untuk dituang", "Lebih cepat", "Air tumpah"], 1, "Algoritma harus urut. Balik urutan = gagal. Tidak ada gelas untuk dituang."),
    ("**Stimulus:** Juara mengamati 3 foto berturut-turut. Foto 1: langit cerah. Foto 2: langit berawan. Foto 3: hujan. Ia menyimpulkan pola cuaca berubah.\n\nPilar yang diterapkan...", ["Dekomposisi", "Algoritma", "Pengenalan pola", "Abstraksi"], 2, "Pengenalan pola: melihat tren perubahan cuaca dari foto berurutan."),
    ("**Stimulus:** Karma diminta menjelaskan apa itu 'sepeda' tanpa menunjukkan sepeda asli. Ia bilang: 'Sepeda punya 2 roda, stang, pedal, dan sadel.'\n\nIni contoh dari...", ["Dekomposisi", "Algoritma", "Pengenalan pola", "Abstraksi"], 3, "Abstraksi: fokus ciri utama (roda, stang, pedal), abaikan detail (warna, merek)."),
    ("**Stimulus:** Lina mengikuti resep kue. Langkah 3: 'Masukkan tepung.' Tapi ia skip langkah 3 dan langsung ke langkah 4: 'Aduk.' Hasilnya kue gagal.\n\nPelajaran tentang algoritma:", ["Urutan tidak penting", "Setiap langkah penting dan harus berurutan", "Langkah bisa di-skip", "Algoritma tidak perlu diikuti"], 1, "Algoritma: setiap langkah penting + harus berurutan. Skip = gagal."),
    ("**Stimulus:** Mantra melihat pola belajar: nilai naik saat belajar 2 jam, turun saat tidak belajar. Ia menyimpulkan 'belajar = nilai naik'. Evaluasi:", ["Valid — pola jelas", "Lemah — korelasi ≠ kausalitas, bisa ada faktor lain", "Salah total", "Tidak bisa dievaluasi"], 1, "Korelasi (belajar ↔ nilai) ≠ kausalitas. Bisa ada faktor lain (kesehatan, mood, kesulitan materi)."),

    # Sistem Komputer (15 soal)
    ("**Stimulus:** Andi membongkar CPU komputernya. Ia melihat motherboard, RAM, CPU, dan hard disk di dalamnya.\n\nKomponen yang disebutkan termasuk dalam kategori...", ["Software", "Hardware", "Operating system", "Aplikasi"], 1, "Hardware = perangkat keras yang bisa disentuh: motherboard, RAM, CPU, hard disk."),
    ("**Stimulus:** Siti menginstal Microsoft Word di laptopnya. Setelah instalasi, ia bisa mengetik dokumen.\n\nMicrosoft Word termasuk kategori...", ["Hardware", "Software aplikasi", "Operating system", "Brainware"], 1, "Software aplikasi = program untuk tugas spesifik. Word = word processor."),
    ("**Stimulus:** Budi menyalakan komputer. Layar menampilkan logo Windows, lalu muncul desktop.\n\nWindows yang muncul saat komputer dinyalakan merupakan...", ["Hardware", "Software aplikasi", "Operating system (software sistem)", "Brainware"], 2, "OS = software sistem yang mengelola hardware + software aplikasi. Windows, macOS, Linux."),
    ("**Stimulus:** Dina ingin menyimpan foto. Ia menyimpan ke hard disk.\n\nHard disk berfungsi sebagai...", ["Proses data", "Penyimpanan data permanen (storage)", "Menampilkan gambar", "Menerima input"], 1, "Hard disk = storage: menyimpan data permanen (tidak hilang saat mati)."),
    ("**Stimulus:** Eka sedang bermain game. Game-nya lag (berat). Ia cek dan menemukan RAM hanya 2GB.\n\nRAM berfungsi untuk...", ["Menyimpan data permanen", "Memori sementara saat program berjalan", "Menampilkan grafis", "Menghubungkan ke internet"], 1, "RAM = memori sementara. Program berjalan di RAM. RAM kecil = lag."),
    ("**Stimulus:** Fajar ingin membeli laptop untuk gaming. Ia melihat spec: CPU Intel i7, RAM 16GB, GPU RTX 4060.\n\nCPU berfungsi sebagai...", ["Otak komputer — memproses instruksi", "Penyimpanan data", "Menampilkan gambar", "Menghasilkan suara"], 0, "CPU = Central Processing Unit = otak komputer, memproses semua instruksi."),
    ("**Stimulus:** Gita mencoba mengubah wallpaper desktop. Ia klik kanan desktop → Personalize → pilih gambar.\n\nFitur ini disediakan oleh...", ["Microsoft Word", "Operating system", "Hard disk", "RAM"], 1, "OS menyediakan GUI (desktop, wallpaper, settings). Bukan aplikasi."),
    ("**Stimulus:** Hadi memindahkan foto dari HP ke laptop via kabel USB. Foto tersalin ke folder Download.\n\nProses ini melibatkan...", ["Hanya hardware", "Hanya software", "Hardware (kabel, port) + software (OS, file manager) + brainware (Hadi)", "Hanya brainware"], 2, "Sistem komputer = Hardware + Software + Brainware. Semua bekerja bersama."),
    ("**Stimulus:** Ira membeli printer baru. Ia colokkan kabel, tapi printer tidak bisa digunakan. Setelah instal driver, printer berfungsi.\n\nDriver printer adalah...", ["Hardware", "Software yang menghubungkan OS dengan hardware", "Brainware", "Storage"], 1, "Driver = software penghubung OS dengan hardware tertentu (printer, GPU, dll)."),
    ("**Stimulus:** Joko menekan tombol keyboard 'A'. Layar menampilkan huruf 'a'.\n\nProses yang terjadi secara berurutan:", ["Layar → keyboard → CPU", "Keyboard → CPU → layar", "CPU → keyboard → layar", "Layar → CPU → keyboard"], 1, "Input (keyboard) → Process (CPU) → Output (layar). Urutan siklus komputer."),
    ("**Stimulus:** Kiki melihat spec laptop: SSD 512GB. Sebelumnya laptop lamanya pakai HDD 500GB.\n\nKeuntungan utama SSD dibanding HDD:", ["Lebih murah", "Lebih cepat (no moving parts) + lebih tahan banting", "Kapasitas lebih besar", "Lebih berat"], 1, "SSD = no moving parts = lebih cepat, lebih tahan guncangan. HDD = piringan berputar."),
    ("**Stimulus:** Lia menjalankan 5 aplikasi sekaligus: Chrome, Word, Spotify, Excel, Zoom. Laptop mulai lambat.\n\nPenyebab kemungkinan besar:", ["CPU terlalu cepat", "RAM tidak cukup untuk 5 aplikasi", "Hard disk penuh", "Layar terlalu besar"], 1, "5 aplikasi = butuh RAM besar. RAM tidak cukup = laptop swap ke disk = lambat."),
    ("**Stimulus:** Maman menginstal antivirus. Setelah scan, ditemukan 3 virus.\n\nVirus komputer termasuk kategori...", ["Hardware", "Software (malicious/jahat)", "Brainware", "Storage device"], 1, "Virus = software jahat (malware). Bukan hardware, bukan brainware."),
    ("**Stimulus:** Nina melihat 3 jenis storage: HDD 1TB, SSD 512GB, Flashdisk 32GB. Mana yang PALING cepat?", ["HDD 1TB", "SSD 512GB", "Flashdisk 32GB", "Sama saja"], 1, "SSD paling cepat (no moving parts). Flashdisk lebih lambat dari SSD. HDD paling lambat."),
    ("**Stimulus:** Omar ingin belajar coding. Ia butuh software untuk menulis kode (text editor).\n\nContoh software yang tepat:", ["Microsoft Word", "Visual Studio Code", "Photoshop", "Chrome"], 1, "VS Code = code editor. Word = dokumen. Photoshop = gambar. Chrome = browser."),

    # Microsoft Word (10 soal)
    ("**Stimulus:** Andi ingin membuat surat resmi di Word. Ia buka Word, ketik teks, lalu ingin merubah ukuran font menjadi 12.\n\nFitur yang digunakan:", ["File → Save", "Home → Font Size → 12", "Insert → Table", "Page Layout → Margins"], 1, "Font Size ada di tab Home. Pilih teks → set ukuran 12."),
    ("**Stimulus:** Siti membuat laporan. Ia ingin judul di tengah halaman.\n\nTombol/cara yang tepat:", ["Bold (B)", "Italic (I)", "Center align", "Underline (U)"], 2, "Center align = teks di tengah. Bold/Italic/Underline = format teks, bukan posisi."),
    ("**Stimulus:** Budi mengetik dokumen 10 halaman. Ia ingin halaman 1 pakai nomor halaman.\n\nFitur Word yang digunakan:", ["Insert → Page Number", "Home → Page Number", "File → Print", "View → Page Number"], 0, "Page Number ada di tab Insert → Page Number."),
    ("**Stimulus:** Dina ingin membuat tabel jadwal pelajaran di Word.\n\nLangkah yang tepat:", ["Insert → Table → pilih ukuran", "Home → Table", "Page Layout → Table", "View → Table"], 0, "Table ada di tab Insert → Table → pilih jumlah baris/kolom."),
    ("**Stimulus:** Eka mengetik dokumen. Ia ingin kata penting 'PENTING' tebal dan bergaris bawah.\n\nTombol yang ditekan:", ["Ctrl+C", "Ctrl+B (bold) + Ctrl+U (underline)", "Ctrl+V", "Ctrl+Z"], 1, "Ctrl+B = bold. Ctrl+U = underline. Ctrl+C = copy. Ctrl+V = paste. Ctrl+Z = undo."),
    ("**Stimulus:** Fajar ingin simpan dokumen Word dengan nama baru tanpa menimpa file lama.\n\nLangkah:", ["Ctrl+S", "File → Save As → ketik nama baru", "File → Print", "Ctrl+P"], 1, "Save As = simpan dengan nama/lokasi baru. Ctrl+S = save (timpa file lama)."),
    ("**Stimulus:** Gita mengetik dokumen dan salah menghapus paragraf. Ia ingin membatalkan.\n\nShortcut keyboard:", ["Ctrl+Y", "Ctrl+Z (undo)", "Ctrl+A", "Ctrl+X"], 1, "Ctrl+Z = Undo (batalkan). Ctrl+Y = Redo (ulangi). Ctrl+A = Select All."),
    ("**Stimulus:** Hadi ingin copy teks dari halaman web ke Word.\n\nUrutan langkah yang tepat:", ["Ctrl+V → Ctrl+C → klik Word", "Select teks → Ctrl+C → buka Word → Ctrl+V", "Ctrl+X → Ctrl+V", "Ctrl+S → Ctrl+V"], 1, "Copy: select → Ctrl+C. Paste: buka Word → Ctrl+V. Urutan: copy dulu, paste kemudian."),
    ("**Stimulus:** Ira membuat dokumen. Ia ingin margin kiri-kanan 3cm.\n\nFitur yang digunakan:", ["Insert → Margin", "Page Layout (atau Layout) → Margins → Custom", "Home → Margins", "View → Margins"], 1, "Margins ada di tab Page Layout/Layout → Margins → Custom Margins."),
    ("**Stimulus:** Joko ingin header dokumen berisi nama sekolah di setiap halaman.\n\nFitur yang digunakan:", ["Insert → Header → ketik nama sekolah", "Home → Header", "File → Header", "View → Header"], 0, "Header/Footer ada di tab Insert → Header → pilih style → ketik."),
]

# ── 5 SOAL ESSAI DENGAN STIMULUS ──
ESSAI = [
    {"q": "**Stimulus:** Anda diminta membuat nasi goreng untuk 4 orang. Resep asli hanya untuk 1 porsi.\n\n**Tugas:** Jelaskan bagaimana Anda menggunakan pilar berpikir komputasional (dekomposisi, pengenalan pola, abstraksi, algoritma) untuk menyelesaikan masalah ini. Berikan minimal 2 contoh penerapan pilar yang berbeda.", "a": "Contoh jawaban:\n\n1. Dekomposisi: Pecah masalah 'masak nasi goreng 4 porsi' menjadi: hitung bahan (4x resep), siapkan alat, masak per batch, sajikan.\n\n2. Algoritma: Urutkan langkah: panaskan minyak → tumis bumbu → masukkan nasi → tambahkan bumbu → aduk → sajikan. Setiap langkah harus berurutan.\n\n3. Pengenalan pola: Resep 1 porsi → 4 porsi = kalikan semua bahan x4. Pola perbandingan proporsi.\n\n4. Abstraksi: Fokus pada bahan utama (nasi, bumbu, minyak). Abaikan detail tidak penting (warna piring, ukuran wajan)."},
    {"q": "**Stimulus:** Komputer di sekolah Anda tiba-tiba mati total. Teknisi datang dan menemukan RAM rusak. Setelah diganti, komputer berfungsi kembali.\n\n**Tugas:** Jelaskan fungsi RAM dalam sistem komputer dan mengapa komputer tidak bisa menyala tanpa RAM. Berikan analogi untuk memahami RAM.", "a": "Contoh jawaban:\n\nFungsi RAM: Memori sementara tempat program dan data aktif dijalankan. Saat kita buka Word, OS load Word ke RAM. CPU membaca instruksi dari RAM.\n\nTanpa RAM: CPU tidak punya tempat untuk me-load program. OS tidak bisa boot. Komputer mati total karena tidak ada working memory.\n\nAnalogi: RAM = meja kerja. Saat kita bekerja, kita taruh dokumen di meja. Meja kecil = hanya bisa buka sedikit dokumen. RAM kecil = hanya bisa buka sedikit aplikasi. Tanpa meja = tidak bisa bekerja sama sekali."},
    {"q": "**Stimulus:** Anda ingin membuat dokumen surat resmi sekolah di Microsoft Word. Surat harus memiliki: kop sekolah (header), nomor surat, tanggal, isi surat, dan tanda tangan.\n\n**Tugas:** Jelaskan langkah-langkah sistematis (algoritma) dari membuka Word hingga dokumen siap dicetak. Sertakan minimal 3 fitur Word yang Anda gunakan.", "a": "Contoh jawaban:\n\n1. Buka Word → Blank document\n2. Set Page Layout: margins 3cm (kiri-kanan-atas-bawah)\n3. Insert → Header: ketik nama sekolah + logo\n4. Ketik nomor surat, tanggal (rata kanan)\n5. Ketik isi surat (justify)\n6. Gunakan Bold untuk kata penting\n7. Tambahkan tanda tangan area (kosongkan ruang)\n8. Insert → Page Number (jika >1 halaman)\n9. File → Save As → nama file\n10. File → Print atau Ctrl+P\n\nFitur Word: Header, Margins, Bold, Save As, Print."},
    {"q": "**Stimulus:** Andi menyimpulkan: 'Semua siswa yang pakai laptop mahal pasti nilai tinggi.' Ia hanya mengecek 3 siswa yang memang demikian.\n\n**Tugas:** Identifikasi kesalahan berpikir Andi. Jelaskan apa yang seharusnya Andi lakukan untuk membuat kesimpulan yang lebih valid.", "a": "Kesalahan Andi:\n1. Overfitting: hanya 3 siswa, sample terlalu kecil untuk generalisasi.\n2. Bias konfirmasi: hanya cari data yang dukung kesimpulan, abaikan yang bertentangan.\n3. Korelasi ≠ kausalitas: laptop mahal ↔ nilai tinggi, tapi laptop tidak menyebabkan nilai naik. Faktor lain: motivasi, belajar, IQ.\n\nYang seharusnya dilakukan:\n1. Sample lebih besar (minimal 30 siswa)\n2. Cari data yang bertentangan (siswa nilai tinggi tanpa laptop mahal)\n3. Kontrol variabel (bandingkan siswa sama motivasi, beda laptop)\n4. Pertimbangkan faktor lain (ekonomi, akses belajar, guru)"},
    {"q": "**Stimulus:** Sekolah Anda ingin mengadakan lomba membuat poster digital. Panitia meminta siswa membuat algoritma (langkah-langkah) untuk membuat poster.\n\n**Tugas:** Buat algoritma (minimal 7 langkah berurutan) untuk membuat poster digital. Setiap langkah harus jelas dan bisa diikuti siapa pun.", "a": "Contoh algoritma membuat poster digital:\n\n1. Tentukan tema dan judul poster\n2. Tentukan ukuran poster (mis: A3 atau A4)\n3. Buka software desain (Photoshop/Canva/Word)\n4. Set background/warna dasar\n5. Buat layout: bagi area untuk judul, gambar, teks\n6. Cari dan tempel gambar pendukung\n7. Ketik judul dengan font besar dan menarik\n8. Ketik isi/info pendukung dengan font yang jelas\n9. Tambahkan elemen dekoratif (garis, shape, icon)\n10. Review: cek ejaan, warna, komposisi\n11. Save/Export ke format yang diminta (JPEG/PDF)\n12. Kirim ke panitia\n\nCatatan: algoritma harus berurutan, setiap langkah jelas dan actionable."},
]

def main():
    print(f"Generating: {OUTPUT_PATH}")
    c = []
    c.append(f"""-- Ujian Kelas 7: Praktek Mengetik (30 menit) + Tertulis (40 menit)
-- 40 PG + 5 Essai dengan stimulus
-- Bahan: Berpikir Komputasional, Sistem Komputer, Microsoft Word
-- CP: {CP_ID}, TP: {TP_ID} (sudah ada)

-- Materi ujian (ringkasan untuk siswa baca sebelum ujian)
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_ujian_k7', 'Materi Ujian Kelas 7: Berpikir Komputasional, Sistem Komputer, MS Word', '# Materi Ujian Kelas 7

## A. Berpikir Komputasional
- Dekomposisi: memecah masalah besar jadi bagian kecil
- Pengenalan pola: mengenali keteraturan/pengulangan
- Abstraksi: fokus hal penting, abaikan detail
- Algoritma: urutan langkah berurutan

## B. Sistem Komputer
- Hardware: CPU (otak), RAM (memori sementara), Storage/HDD/SSD (simpan permanen)
- Software: OS (Windows), aplikasi (Word, Chrome)
- Brainware: user/manusia
- Input → Process (CPU) → Output
- Driver: software penghubung OS dengan hardware

## C. Microsoft Word
- Home: Font size, Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U), Align
- Insert: Table, Header/Footer, Page Number
- Page Layout: Margins
- File: Save (Ctrl+S), Save As, Print (Ctrl+P)
- Undo: Ctrl+Z, Redo: Ctrl+Y, Copy: Ctrl+C, Paste: Ctrl+V
', 'Informatika', '7A,7B,7C', 'SMP', 'Ujian', '{CP_ID}', '{TP_ID}', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
""")

    # 40 PG
    for i, (q, opts, correct, expl) in enumerate(PG[:40], 1):
        qid = f"q_ujian_k7_pg_{i:03d}"
        c.append(f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(qid)}, '{GRADE}', '{SUBJECT}', {sql_str(q)}, {sql_str(opts[0])}, {sql_str(opts[1])}, {sql_str(opts[2])}, {sql_str(opts[3])}, {correct}, {sql_str(expl)}, 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', '{CP_ID}', '{TP_ID}', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    # 5 Essai
    for i, e in enumerate(ESSAI[:5], 1):
        qid = f"q_ujian_k7_essay_{i:03d}"
        c.append(f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(qid)}, '{GRADE}', '{SUBJECT}', {sql_str(e['q'])}, '', '', '', '', 0, '', 'Ujian Kelas 7', true, 'essai', '[]', '[]', '', {sql_str(e['a'])}, 'C5', '', '', '{CP_ID}', '{TP_ID}', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    # 2 Tugas terpisah: typing_only (30 menit) + quiz_only (40 menit)
    c.append(f"""
-- Tugas 1: Praktek Mengetik (30 menit, daring)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_ujian_k7_typing', 'Ujian 1 Kelas 7: Praktek Mengetik (30 menit)', 'Ujian praktek mengetik. Ketik teks bacaan dengan akurasi dan kecepatan tinggi. Waktu 30 menit.', '{SUBJECT}', '7A,7B,7C', 'SMP', true, '{DUE_DATE}', 'wajib', 0, 'typing_only', NULL, '{CP_ID}', '{TP_ID}', 'daring', '', '2026/2027', 'ganjil', 30, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas 2: Ujian Tertulis (40 menit, 45 soal, daring)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_ujian_k7_quiz', 'Ujian 2 Kelas 7: Tertulis (40 PG + 5 Essai, 40 menit)', 'Ujian tertulis tentang berpikir komputasional, sistem komputer, dan Microsoft Word. 40 soal PG dengan stimulus + 5 soal essai. Waktu 40 menit.', '{SUBJECT}', '7A,7B,7C', 'SMP', true, '{DUE_DATE}', 'wajib', 45, 'quiz_only', NULL, '{CP_ID}', '{TP_ID}', 'daring', '', '2026/2027', 'ganjil', 40, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Hapus tugas lama yang terpadu (jika sudah pernah di-insert)
DELETE FROM "Assignment" WHERE id = 'asg_ujian_k7_terpadu';

-- Verifikasi
SELECT "questionType", COUNT(*) FROM "Question" WHERE id LIKE 'q_ujian_k7_%' GROUP BY "questionType";
-- Expected: pilihan_ganda 40, essai 5
""")

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(content if 'content' in dir() else c))
    # Fix: use c not content
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(c))
    size = os.path.getsize(OUTPUT_PATH) / 1024
    print(f"✅ {OUTPUT_PATH} ({size:.1f} KB)")
    print(f"   40 PG + 5 Essai = 45 soal")
    print(f"   Tugas 1: Praktek Mengetik (30 menit, daring)")
    print(f"   Tugas 2: Ujian Tertulis (40 menit, 45 soal, daring)")
    print(f"   Deadline: {DUE_DATE[:10]}")

if __name__ == "__main__":
    main()
