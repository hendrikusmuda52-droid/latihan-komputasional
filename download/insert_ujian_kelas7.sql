-- Ujian Kelas 7: Praktek Mengetik (30 menit) + Tertulis (40 menit)
-- 40 PG + 5 Essai dengan stimulus
-- Bahan: Berpikir Komputasional, Sistem Komputer, Microsoft Word
-- CP: cp_inf_7_1, TP: tp_inf_7_1_1 (sudah ada)

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
', 'Informatika', '7A,7B,7C', 'SMP', 'Ujian', 'cp_inf_7_1', 'tp_inf_7_1_1', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_001', '7', 'Informatika', '**Stimulus:** Andi diminta membuat nasi goreng untuk pertama kali. Ia tidak tahu harus mulai dari mana, lalu mencari resep di internet dan mengikuti langkah demi langkah.

Dari kasus di atas, langkah sistematis yang dilakukan Andi merupakan penerapan pilar berpikir komputasional, yaitu...', 'Dekomposisi', 'Algoritma', 'Pengenalan pola', 'Abstraksi', 1, 'Algoritma = urutan langkah berurutan untuk menyelesaikan masalah. Resep = algoritma memasak.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_002', '7', 'Informatika', '**Stimulus:** Bu Guru memberi tugas membuat poster. Siti membagi tugas menjadi: tentukan tema, cari referensi, buat sketsa, warnai, tambah teks.

Pilar berpikir komputasional yang diterapkan Siti adalah...', 'Algoritma', 'Pengenalan pola', 'Dekomposisi', 'Abstraksi', 2, 'Dekomposisi = memecah masalah besar jadi bagian-bagian kecil yang lebih mudah dikerjakan.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_003', '7', 'Informatika', '**Stimulus:** Budi melihat deretan angka 2, 4, 6, 8, 10 dan langsung tahu angka berikutnya adalah 12.

Kemampuan Budi mengenali keteraturan tersebut merupakan pilar...', 'Dekomposisi', 'Algoritma', 'Abstraksi', 'Pengenalan pola', 3, 'Pengenalan pola = mengidentifikasi keteraturan/pengulangan dalam data.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_004', '7', 'Informatika', '**Stimulus:** Saat membuat jadwal pelajaran, sekolah hanya mencantumkan nama mapel, jam, dan guru — tanpa menggambar wajah guru atau warna bajunya.

Pilar berpikir komputasional yang diterapkan adalah...', 'Algoritma', 'Abstraksi', 'Dekomposisi', 'Pengenalan pola', 1, 'Abstraksi = fokus pada hal penting saja, abaikan detail tidak relevan.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_005', '7', 'Informatika', '**Stimulus:** Resep nasi goreng berisi langkah: cuci beras, masak nasi, siapkan bumbu, panaskan minyak, tumis bumbu, masukkan nasi, aduk, sajikan.

Jika langkah ''masak nasi'' dihapus, apa yang terjadi?', 'Nasi tetap matang', 'Proses gagal — nasi belum matang saat ditumis', 'Lebih cepat', 'Tidak ada efek', 1, 'Algoritma harus berurutan. Skip langkah = gagal. Nasi belum matang.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_006', '7', 'Informatika', '**Stimulus:** Dina melihat pola lampu lalu lintas: merah-kuning-hijau-merah-kuning-hijau. Warna setelah hijau adalah...', 'Biru', 'Merah', 'Kuning', 'Putih', 1, 'Pola berulang: merah-kuning-hijau. Setelah hijau kembali ke merah.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_007', '7', 'Informatika', '**Stimulus:** Eka memecah masalah ''membuat video pembelajaran'' menjadi: riset, skrip, rekam, edit, upload. Manakah yang BUKAN termasuk dekomposisi yang baik?', 'Membagi jadi 5 langkah urut', 'Membagi jadi langkah kecil yang actionable', 'Langsung mulai tanpa rencana', 'Setiap langkah punya output jelas', 2, 'Dekomposisi = pecah jadi langkah kecil. ''Langsung mulai tanpa rencana'' bukan dekomposisi.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_008', '7', 'Informatika', '**Stimulus:** Fajar melihat daftar nilai ujian: 60, 70, 80, 90, 100. Ia menyimpulkan semua siswa naik nilainya. Namun ternyata hanya 5 siswa dari 30 yang diambil.

Kesalahan Fajar adalah...', 'Pengenalan pola salah', 'Overfitting — data terlalu sedikit untuk generalisasi', 'Abstraksi berlebihan', 'Algoritma salah', 1, 'Overfitting: 5 data tidak cukup untuk generalisasi 30 siswa. Sample terlalu kecil.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_009', '7', 'Informatika', '**Stimulus:** Gita ingin membuat jadwal harian. Ia hanya mencatat: jam belajar, jam makan, jam tidur — tanpa detail seperti warna baju atau menu makanan.

Pilar yang diterapkan...', 'Dekomposisi', 'Algoritma', 'Abstraksi', 'Pengenalan pola', 2, 'Abstraksi: fokus info penting (jam, aktivitas), abaikan detail tidak relevan (warna baju, menu).', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_010', '7', 'Informatika', '**Stimulus:** Hari membuat flowchart untuk keputusan: ''Jika hujan, bawa payung. Jika tidak, tidak bawa payung.'' Struktur ini merupakan...', 'Urutan', 'Perulangan', 'Percabangan (if-else)', 'Dekomposisi', 2, 'Percabangan (if-else): jika kondisi A maka aksi X, jika tidak maka aksi Y.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_011', '7', 'Informatika', '**Stimulus:** Ivan menulis algoritma: ''Ambil gelas, tuang air, minum.'' Jika urutan dibalik menjadi ''Minum, tuang air, ambil gelas'', apa yang terjadi?', 'Tetap berhasil', 'Gagal — tidak ada gelas untuk dituang', 'Lebih cepat', 'Air tumpah', 1, 'Algoritma harus urut. Balik urutan = gagal. Tidak ada gelas untuk dituang.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_012', '7', 'Informatika', '**Stimulus:** Juara mengamati 3 foto berturut-turut. Foto 1: langit cerah. Foto 2: langit berawan. Foto 3: hujan. Ia menyimpulkan pola cuaca berubah.

Pilar yang diterapkan...', 'Dekomposisi', 'Algoritma', 'Pengenalan pola', 'Abstraksi', 2, 'Pengenalan pola: melihat tren perubahan cuaca dari foto berurutan.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_013', '7', 'Informatika', '**Stimulus:** Karma diminta menjelaskan apa itu ''sepeda'' tanpa menunjukkan sepeda asli. Ia bilang: ''Sepeda punya 2 roda, stang, pedal, dan sadel.''

Ini contoh dari...', 'Dekomposisi', 'Algoritma', 'Pengenalan pola', 'Abstraksi', 3, 'Abstraksi: fokus ciri utama (roda, stang, pedal), abaikan detail (warna, merek).', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_014', '7', 'Informatika', '**Stimulus:** Lina mengikuti resep kue. Langkah 3: ''Masukkan tepung.'' Tapi ia skip langkah 3 dan langsung ke langkah 4: ''Aduk.'' Hasilnya kue gagal.

Pelajaran tentang algoritma:', 'Urutan tidak penting', 'Setiap langkah penting dan harus berurutan', 'Langkah bisa di-skip', 'Algoritma tidak perlu diikuti', 1, 'Algoritma: setiap langkah penting + harus berurutan. Skip = gagal.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_015', '7', 'Informatika', '**Stimulus:** Mantra melihat pola belajar: nilai naik saat belajar 2 jam, turun saat tidak belajar. Ia menyimpulkan ''belajar = nilai naik''. Evaluasi:', 'Valid — pola jelas', 'Lemah — korelasi ≠ kausalitas, bisa ada faktor lain', 'Salah total', 'Tidak bisa dievaluasi', 1, 'Korelasi (belajar ↔ nilai) ≠ kausalitas. Bisa ada faktor lain (kesehatan, mood, kesulitan materi).', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_016', '7', 'Informatika', '**Stimulus:** Andi membongkar CPU komputernya. Ia melihat motherboard, RAM, CPU, dan hard disk di dalamnya.

Komponen yang disebutkan termasuk dalam kategori...', 'Software', 'Hardware', 'Operating system', 'Aplikasi', 1, 'Hardware = perangkat keras yang bisa disentuh: motherboard, RAM, CPU, hard disk.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_017', '7', 'Informatika', '**Stimulus:** Siti menginstal Microsoft Word di laptopnya. Setelah instalasi, ia bisa mengetik dokumen.

Microsoft Word termasuk kategori...', 'Hardware', 'Software aplikasi', 'Operating system', 'Brainware', 1, 'Software aplikasi = program untuk tugas spesifik. Word = word processor.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_018', '7', 'Informatika', '**Stimulus:** Budi menyalakan komputer. Layar menampilkan logo Windows, lalu muncul desktop.

Windows yang muncul saat komputer dinyalakan merupakan...', 'Hardware', 'Software aplikasi', 'Operating system (software sistem)', 'Brainware', 2, 'OS = software sistem yang mengelola hardware + software aplikasi. Windows, macOS, Linux.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_019', '7', 'Informatika', '**Stimulus:** Dina ingin menyimpan foto. Ia menyimpan ke hard disk.

Hard disk berfungsi sebagai...', 'Proses data', 'Penyimpanan data permanen (storage)', 'Menampilkan gambar', 'Menerima input', 1, 'Hard disk = storage: menyimpan data permanen (tidak hilang saat mati).', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_020', '7', 'Informatika', '**Stimulus:** Eka sedang bermain game. Game-nya lag (berat). Ia cek dan menemukan RAM hanya 2GB.

RAM berfungsi untuk...', 'Menyimpan data permanen', 'Memori sementara saat program berjalan', 'Menampilkan grafis', 'Menghubungkan ke internet', 1, 'RAM = memori sementara. Program berjalan di RAM. RAM kecil = lag.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_021', '7', 'Informatika', '**Stimulus:** Fajar ingin membeli laptop untuk gaming. Ia melihat spec: CPU Intel i7, RAM 16GB, GPU RTX 4060.

CPU berfungsi sebagai...', 'Otak komputer — memproses instruksi', 'Penyimpanan data', 'Menampilkan gambar', 'Menghasilkan suara', 0, 'CPU = Central Processing Unit = otak komputer, memproses semua instruksi.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_022', '7', 'Informatika', '**Stimulus:** Gita mencoba mengubah wallpaper desktop. Ia klik kanan desktop → Personalize → pilih gambar.

Fitur ini disediakan oleh...', 'Microsoft Word', 'Operating system', 'Hard disk', 'RAM', 1, 'OS menyediakan GUI (desktop, wallpaper, settings). Bukan aplikasi.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_023', '7', 'Informatika', '**Stimulus:** Hadi memindahkan foto dari HP ke laptop via kabel USB. Foto tersalin ke folder Download.

Proses ini melibatkan...', 'Hanya hardware', 'Hanya software', 'Hardware (kabel, port) + software (OS, file manager) + brainware (Hadi)', 'Hanya brainware', 2, 'Sistem komputer = Hardware + Software + Brainware. Semua bekerja bersama.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_024', '7', 'Informatika', '**Stimulus:** Ira membeli printer baru. Ia colokkan kabel, tapi printer tidak bisa digunakan. Setelah instal driver, printer berfungsi.

Driver printer adalah...', 'Hardware', 'Software yang menghubungkan OS dengan hardware', 'Brainware', 'Storage', 1, 'Driver = software penghubung OS dengan hardware tertentu (printer, GPU, dll).', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_025', '7', 'Informatika', '**Stimulus:** Joko menekan tombol keyboard ''A''. Layar menampilkan huruf ''a''.

Proses yang terjadi secara berurutan:', 'Layar → keyboard → CPU', 'Keyboard → CPU → layar', 'CPU → keyboard → layar', 'Layar → CPU → keyboard', 1, 'Input (keyboard) → Process (CPU) → Output (layar). Urutan siklus komputer.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_026', '7', 'Informatika', '**Stimulus:** Kiki melihat spec laptop: SSD 512GB. Sebelumnya laptop lamanya pakai HDD 500GB.

Keuntungan utama SSD dibanding HDD:', 'Lebih murah', 'Lebih cepat (no moving parts) + lebih tahan banting', 'Kapasitas lebih besar', 'Lebih berat', 1, 'SSD = no moving parts = lebih cepat, lebih tahan guncangan. HDD = piringan berputar.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_027', '7', 'Informatika', '**Stimulus:** Lia menjalankan 5 aplikasi sekaligus: Chrome, Word, Spotify, Excel, Zoom. Laptop mulai lambat.

Penyebab kemungkinan besar:', 'CPU terlalu cepat', 'RAM tidak cukup untuk 5 aplikasi', 'Hard disk penuh', 'Layar terlalu besar', 1, '5 aplikasi = butuh RAM besar. RAM tidak cukup = laptop swap ke disk = lambat.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_028', '7', 'Informatika', '**Stimulus:** Maman menginstal antivirus. Setelah scan, ditemukan 3 virus.

Virus komputer termasuk kategori...', 'Hardware', 'Software (malicious/jahat)', 'Brainware', 'Storage device', 1, 'Virus = software jahat (malware). Bukan hardware, bukan brainware.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_029', '7', 'Informatika', '**Stimulus:** Nina melihat 3 jenis storage: HDD 1TB, SSD 512GB, Flashdisk 32GB. Mana yang PALING cepat?', 'HDD 1TB', 'SSD 512GB', 'Flashdisk 32GB', 'Sama saja', 1, 'SSD paling cepat (no moving parts). Flashdisk lebih lambat dari SSD. HDD paling lambat.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_030', '7', 'Informatika', '**Stimulus:** Omar ingin belajar coding. Ia butuh software untuk menulis kode (text editor).

Contoh software yang tepat:', 'Microsoft Word', 'Visual Studio Code', 'Photoshop', 'Chrome', 1, 'VS Code = code editor. Word = dokumen. Photoshop = gambar. Chrome = browser.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_031', '7', 'Informatika', '**Stimulus:** Andi ingin membuat surat resmi di Word. Ia buka Word, ketik teks, lalu ingin merubah ukuran font menjadi 12.

Fitur yang digunakan:', 'File → Save', 'Home → Font Size → 12', 'Insert → Table', 'Page Layout → Margins', 1, 'Font Size ada di tab Home. Pilih teks → set ukuran 12.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_032', '7', 'Informatika', '**Stimulus:** Siti membuat laporan. Ia ingin judul di tengah halaman.

Tombol/cara yang tepat:', 'Bold (B)', 'Italic (I)', 'Center align', 'Underline (U)', 2, 'Center align = teks di tengah. Bold/Italic/Underline = format teks, bukan posisi.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_033', '7', 'Informatika', '**Stimulus:** Budi mengetik dokumen 10 halaman. Ia ingin halaman 1 pakai nomor halaman.

Fitur Word yang digunakan:', 'Insert → Page Number', 'Home → Page Number', 'File → Print', 'View → Page Number', 0, 'Page Number ada di tab Insert → Page Number.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_034', '7', 'Informatika', '**Stimulus:** Dina ingin membuat tabel jadwal pelajaran di Word.

Langkah yang tepat:', 'Insert → Table → pilih ukuran', 'Home → Table', 'Page Layout → Table', 'View → Table', 0, 'Table ada di tab Insert → Table → pilih jumlah baris/kolom.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_035', '7', 'Informatika', '**Stimulus:** Eka mengetik dokumen. Ia ingin kata penting ''PENTING'' tebal dan bergaris bawah.

Tombol yang ditekan:', 'Ctrl+C', 'Ctrl+B (bold) + Ctrl+U (underline)', 'Ctrl+V', 'Ctrl+Z', 1, 'Ctrl+B = bold. Ctrl+U = underline. Ctrl+C = copy. Ctrl+V = paste. Ctrl+Z = undo.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_036', '7', 'Informatika', '**Stimulus:** Fajar ingin simpan dokumen Word dengan nama baru tanpa menimpa file lama.

Langkah:', 'Ctrl+S', 'File → Save As → ketik nama baru', 'File → Print', 'Ctrl+P', 1, 'Save As = simpan dengan nama/lokasi baru. Ctrl+S = save (timpa file lama).', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_037', '7', 'Informatika', '**Stimulus:** Gita mengetik dokumen dan salah menghapus paragraf. Ia ingin membatalkan.

Shortcut keyboard:', 'Ctrl+Y', 'Ctrl+Z (undo)', 'Ctrl+A', 'Ctrl+X', 1, 'Ctrl+Z = Undo (batalkan). Ctrl+Y = Redo (ulangi). Ctrl+A = Select All.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_038', '7', 'Informatika', '**Stimulus:** Hadi ingin copy teks dari halaman web ke Word.

Urutan langkah yang tepat:', 'Ctrl+V → Ctrl+C → klik Word', 'Select teks → Ctrl+C → buka Word → Ctrl+V', 'Ctrl+X → Ctrl+V', 'Ctrl+S → Ctrl+V', 1, 'Copy: select → Ctrl+C. Paste: buka Word → Ctrl+V. Urutan: copy dulu, paste kemudian.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_039', '7', 'Informatika', '**Stimulus:** Ira membuat dokumen. Ia ingin margin kiri-kanan 3cm.

Fitur yang digunakan:', 'Insert → Margin', 'Page Layout (atau Layout) → Margins → Custom', 'Home → Margins', 'View → Margins', 1, 'Margins ada di tab Page Layout/Layout → Margins → Custom Margins.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_pg_040', '7', 'Informatika', '**Stimulus:** Joko ingin header dokumen berisi nama sekolah di setiap halaman.

Fitur yang digunakan:', 'Insert → Header → ketik nama sekolah', 'Home → Header', 'File → Header', 'View → Header', 0, 'Header/Footer ada di tab Insert → Header → pilih style → ketik.', 'Ujian Kelas 7', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_essay_001', '7', 'Informatika', '**Stimulus:** Anda diminta membuat nasi goreng untuk 4 orang. Resep asli hanya untuk 1 porsi.

**Tugas:** Jelaskan bagaimana Anda menggunakan pilar berpikir komputasional (dekomposisi, pengenalan pola, abstraksi, algoritma) untuk menyelesaikan masalah ini. Berikan minimal 2 contoh penerapan pilar yang berbeda.', '', '', '', '', 0, '', 'Ujian Kelas 7', true, 'essai', '[]', '[]', '', 'Contoh jawaban:

1. Dekomposisi: Pecah masalah ''masak nasi goreng 4 porsi'' menjadi: hitung bahan (4x resep), siapkan alat, masak per batch, sajikan.

2. Algoritma: Urutkan langkah: panaskan minyak → tumis bumbu → masukkan nasi → tambahkan bumbu → aduk → sajikan. Setiap langkah harus berurutan.

3. Pengenalan pola: Resep 1 porsi → 4 porsi = kalikan semua bahan x4. Pola perbandingan proporsi.

4. Abstraksi: Fokus pada bahan utama (nasi, bumbu, minyak). Abaikan detail tidak penting (warna piring, ukuran wajan).', 'C5', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_essay_002', '7', 'Informatika', '**Stimulus:** Komputer di sekolah Anda tiba-tiba mati total. Teknisi datang dan menemukan RAM rusak. Setelah diganti, komputer berfungsi kembali.

**Tugas:** Jelaskan fungsi RAM dalam sistem komputer dan mengapa komputer tidak bisa menyala tanpa RAM. Berikan analogi untuk memahami RAM.', '', '', '', '', 0, '', 'Ujian Kelas 7', true, 'essai', '[]', '[]', '', 'Contoh jawaban:

Fungsi RAM: Memori sementara tempat program dan data aktif dijalankan. Saat kita buka Word, OS load Word ke RAM. CPU membaca instruksi dari RAM.

Tanpa RAM: CPU tidak punya tempat untuk me-load program. OS tidak bisa boot. Komputer mati total karena tidak ada working memory.

Analogi: RAM = meja kerja. Saat kita bekerja, kita taruh dokumen di meja. Meja kecil = hanya bisa buka sedikit dokumen. RAM kecil = hanya bisa buka sedikit aplikasi. Tanpa meja = tidak bisa bekerja sama sekali.', 'C5', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_essay_003', '7', 'Informatika', '**Stimulus:** Anda ingin membuat dokumen surat resmi sekolah di Microsoft Word. Surat harus memiliki: kop sekolah (header), nomor surat, tanggal, isi surat, dan tanda tangan.

**Tugas:** Jelaskan langkah-langkah sistematis (algoritma) dari membuka Word hingga dokumen siap dicetak. Sertakan minimal 3 fitur Word yang Anda gunakan.', '', '', '', '', 0, '', 'Ujian Kelas 7', true, 'essai', '[]', '[]', '', 'Contoh jawaban:

1. Buka Word → Blank document
2. Set Page Layout: margins 3cm (kiri-kanan-atas-bawah)
3. Insert → Header: ketik nama sekolah + logo
4. Ketik nomor surat, tanggal (rata kanan)
5. Ketik isi surat (justify)
6. Gunakan Bold untuk kata penting
7. Tambahkan tanda tangan area (kosongkan ruang)
8. Insert → Page Number (jika >1 halaman)
9. File → Save As → nama file
10. File → Print atau Ctrl+P

Fitur Word: Header, Margins, Bold, Save As, Print.', 'C5', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_essay_004', '7', 'Informatika', '**Stimulus:** Andi menyimpulkan: ''Semua siswa yang pakai laptop mahal pasti nilai tinggi.'' Ia hanya mengecek 3 siswa yang memang demikian.

**Tugas:** Identifikasi kesalahan berpikir Andi. Jelaskan apa yang seharusnya Andi lakukan untuk membuat kesimpulan yang lebih valid.', '', '', '', '', 0, '', 'Ujian Kelas 7', true, 'essai', '[]', '[]', '', 'Kesalahan Andi:
1. Overfitting: hanya 3 siswa, sample terlalu kecil untuk generalisasi.
2. Bias konfirmasi: hanya cari data yang dukung kesimpulan, abaikan yang bertentangan.
3. Korelasi ≠ kausalitas: laptop mahal ↔ nilai tinggi, tapi laptop tidak menyebabkan nilai naik. Faktor lain: motivasi, belajar, IQ.

Yang seharusnya dilakukan:
1. Sample lebih besar (minimal 30 siswa)
2. Cari data yang bertentangan (siswa nilai tinggi tanpa laptop mahal)
3. Kontrol variabel (bandingkan siswa sama motivasi, beda laptop)
4. Pertimbangkan faktor lain (ekonomi, akses belajar, guru)', 'C5', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_ujian_k7_essay_005', '7', 'Informatika', '**Stimulus:** Sekolah Anda ingin mengadakan lomba membuat poster digital. Panitia meminta siswa membuat algoritma (langkah-langkah) untuk membuat poster.

**Tugas:** Buat algoritma (minimal 7 langkah berurutan) untuk membuat poster digital. Setiap langkah harus jelas dan bisa diikuti siapa pun.', '', '', '', '', 0, '', 'Ujian Kelas 7', true, 'essai', '[]', '[]', '', 'Contoh algoritma membuat poster digital:

1. Tentukan tema dan judul poster
2. Tentukan ukuran poster (mis: A3 atau A4)
3. Buka software desain (Photoshop/Canva/Word)
4. Set background/warna dasar
5. Buat layout: bagi area untuk judul, gambar, teks
6. Cari dan tempel gambar pendukung
7. Ketik judul dengan font besar dan menarik
8. Ketik isi/info pendukung dengan font yang jelas
9. Tambahkan elemen dekoratif (garis, shape, icon)
10. Review: cek ejaan, warna, komposisi
11. Save/Export ke format yang diminta (JPEG/PDF)
12. Kirim ke panitia

Catatan: algoritma harus berurutan, setiap langkah jelas dan actionable.', 'C5', '', '', 'cp_inf_7_1', 'tp_inf_7_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas A: Praktek Mengetik (30 menit)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_ujian_k7_typing', 'Ujian Praktek Mengetik Kelas 7 (30 menit)', 'Ujian praktek mengetik. Ketik teks yang muncul dengan akurasi dan kecepatan tinggi. Waktu 30 menit.', 'Informatika', '7A,7B,7C', 'SMP', true, '2026-10-10T23:59:00+07:00', 'wajib', 0, 'typing_only', NULL, 'cp_inf_7_1', 'tp_inf_7_1_1', 'daring', '', '2026/2027', 'ganjil', 30, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas B: Ujian Tertulis (40 menit, 40 PG + 5 Essai = 45 soal)
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_ujian_k7_quiz', 'Ujian Tertulis Kelas 7: Berpikir Komputasional + Sistem Komputer + MS Word (40 PG + 5 Essai, 40 menit)', 'Ujian tertulis tentang berpikir komputasional (dekomposisi, pengenalan pola, abstraksi, algoritma), sistem komputer (hardware, software, brainware), dan Microsoft Word. 40 soal PG dengan stimulus + 5 soal essai. Waktu 40 menit.', 'Informatika', '7A,7B,7C', 'SMP', true, '2026-10-10T23:59:00+07:00', 'wajib', 45, 'quiz_only', NULL, 'cp_inf_7_1', 'tp_inf_7_1_1', 'luring', '', '2026/2027', 'ganjil', 40, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verifikasi
SELECT "questionType", COUNT(*) FROM "Question" WHERE id LIKE 'q_ujian_k7_%' GROUP BY "questionType";
-- Expected: pilihan_ganda 40, essai 5
