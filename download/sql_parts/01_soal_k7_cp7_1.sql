-- SOAL HOTS CP cp_inf_7_1 — Kelas 7 Berpikir Komputasi — 58 soal
-- Auto-generated, jalankan di Supabase SQL Editor

-- ============================================================
-- SOAL HOTS — CP cp_inf_7_1 (Kelas 7, Berpikir Komputasi)
-- Total: 59 soal (C4/C5/C6)
-- ============================================================

-- Soal 1 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_001',
  '7',
  'Informatika',
  'Siti ingin membuat nasi goreng untuk pertama kalinya. Dia menulis langkah-langkah: (1) siapkan bahan, (2) panaskan minyak, (3) tumis bumbu, (4) masukkan nasi, (5) beri garam, (6) aduk, (7) sajikan. Ketika Siti ingin memasak nasi putih terlebih dahulu sebelum menggoreng, dia menyadari langkah ''masak nasi'' belum ada. Siti memasukkan langkah ini di antara langkah 1 dan 2. Namun hasilnya, nasi tidak matang sempurna karena minyak terlalu panas menunggu.

Mengapa langkah ''masak nasi'' harus ditempatkan tepat setelah ''siapkan bahan'' dan bukan sebelum ''panaskan minyak''?',
  'Karena masak nasi lebih lama daripada panaskan minyak, jadi harus didahulukan',
  'Karena algoritma harus urut — masak nasi adalah sub-tugas dari ''siapkan bahan''',
  'Karena memasak nasi dan memanaskan minyak bisa paralel untuk efisiensi waktu',
  'Karena minyak yang dipanaskan terlalu lama bisa terbakar dan mempengaruhi rasa',
  2,
  'Analisis algoritma paralel — masak nasi dan panaskan minyak adalah langkah independen yang bisa dikerjakan bersamaan untuk hemat waktu. Opsi lain benar tapi tidak menjawab ''mengapa ditempatkan setelah siapkan bahan''.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: C. Analisis algoritma paralel — masak nasi dan panaskan minyak adalah langkah independen yang bisa dikerjakan bersamaan untuk hemat waktu. Opsi lain benar tapi tidak menjawab ''mengapa ditempatkan setelah siapkan bahan''.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 2 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_002',
  '7',
  'Informatika',
  'Andi memecah tugas ''membuat website sekolah'' menjadi: (1) halaman utama, (2) profil guru, (3) berita, (4) kontak. Namun saat develop, Andi bingung karena halaman ''berita'' butuh data dari ''profil guru'' (penulis berita), dan halaman ''kontak'' butuh data dari ''profil guru'' (guru yang bisa dihubungi).

Pola apakah yang Andi temukan saat memetakan dependensi antar-modul website?',
  'Dekomposisi — memecah masalah besar jadi kecil',
  'Pengenalan pola — modul ''profil guru'' adalah dependency bersama',
  'Abstraksi — fokus pada fitur utama saja',
  'Algoritma — urutan langkah yang jelas',
  1,
  'Pola ''profil guru menjadi dependency untuk modul lain'' adalah contoh pengenalan pola — Andi mengidentifikasi modul yang muncul berulang sebagai kebutuhan. Dekomposisi adalah proses awal Andi memecah, bukan pola yang dia temukan setelahnya.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Pola ''profil guru menjadi dependency untuk modul lain'' adalah contoh pengenalan pola — Andi mengidentifikasi modul yang muncul berulang sebagai kebutuhan. Dekomposisi adalah proses awal Andi memecah, bukan pola yang dia temukan setelahnya.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 3 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_003',
  '7',
  'Informatika',
  'Bu Guru menemukan bahwa 3 siswa yang kesulitan matematika juga kesulitan membaca peta. Bu Guru membuat latihan gabungan matematika-peta dan nilai siswa naik. Di sisi lain, Pak Guru melihat siswa yang suka game strategi (catur, Mobile Legends) cenderung lebih cepat paham algoritma di kelas Informatika.

Apa pilar berpikir komputasional yang dipakai Bu Guru dan Pak Guru?',
  'Dekomposisi — memecah masalah jadi bagian kecil',
  'Pengenalan pola — menemukan hubungan berulang antar fenomena',
  'Abstraksi — mengabaikan detail tidak penting',
  'Algoritma — menyusun langkah berurutan',
  1,
  'Baik Bu Guru (matematika-peta) maupun Pak Guru (game-algoritma) menemukan pola korelasi antar dua hal yang tampaknya tidak berhubungan. Ini adalah pilar ''pengenalan pola'' — mengidentifikasi hubungan berulang di antara masalah yang berbeda.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Baik Bu Guru (matematika-peta) maupun Pak Guru (game-algoritma) menemukan pola korelasi antar dua hal yang tampaknya tidak berhubungan. Ini adalah pilar ''pengenalan pola'' — mengidentifikasi hubungan berulang di antara masalah yang berbeda.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 4 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_004',
  '7',
  'Informatika',
  'Peta Jakarta di Google Maps tidak menampilkan setiap pohon, tiang listrik, atau kucing jalanan. Peta hanya menampilkan: jalan utama, bangunan penting (sekolah, rumah sakit), nama tempat. Sementara itu, peta topografi yang dipakai pendaki gunung menampilkan ketinggian, kontur, jalur pendakian, sumber air.

Mengapa dua peta tersebut menampilkan informasi berbeda meskipun untuk lokasi yang sama?',
  'Karena peta Jakarta dibuat oleh Google, peta topografi oleh pemerintah',
  'Karena tujuan pengguna berbeda — navigasi kota vs pendakian, sehingga abstraksi berbeda',
  'Karena peta Jakarta digital, peta topografi cetak',
  'Karena peta topografi lebih detail karena pendaki butuh info lengkap',
  1,
  'Abstraksi = fokus pada hal penting, abaikan yang tidak relevan. Untuk navigasi kota: jalan + tempat penting. Untuk pendakian: ketinggian + jalur + sumber air. Tujuan penggunaan menentukan apa yang ''penting'' dan apa yang diabstraksi.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Abstraksi = fokus pada hal penting, abaikan yang tidak relevan. Untuk navigasi kota: jalan + tempat penting. Untuk pendakian: ketinggian + jalur + sumber air. Tujuan penggunaan menentukan apa yang ''penting'' dan apa yang diabstraksi.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 5 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_005',
  '7',
  'Informatika',
  'Algoritma menggosok gigi biasanya: (1) ambil sikat, (2) beri pasta, (3) basahi sikat, (4) gosok gigi atas, (5) gosok gigi bawah, (6) berkumur, (7) cuci sikat. Doni menukar langkah 2 dan 3: (1) ambil sikat, (2) basahi sikat, (3) beri pasta, dst. Hasilnya gigi tetap bersih.

Apa yang bisa disimpulkan dari kasus Doni?',
  'Algoritma harus kaku — tidak boleh diubah urutan langkahnya',
  'Beberapa langkah dalam algoritma bersifat komutatif (urutan bisa ditukar tanpa mengubah hasil)',
  'Doni salah — harus kembali ke urutan asli',
  'Pasta gigi lebih baik dilarutkan dulu sebelum dipakai',
  1,
  'Komutatif = urutan bisa ditukar. ''Beri pasta'' dan ''basahi sikat'' bisa ditukar karena keduanya independen — tidak ada langkah yang tergantung hasil langkah lain. Berbeda dengan ''ambil sikat'' yang harus pertama (sebelum ''beri pasta'').',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Komutatif = urutan bisa ditukar. ''Beri pasta'' dan ''basahi sikat'' bisa ditukar karena keduanya independen — tidak ada langkah yang tergantung hasil langkah lain. Berbeda dengan ''ambil sikat'' yang harus pertama (sebelum ''beri pasta'').',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 6 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_006',
  '7',
  'Informatika',
  'Variabel `nilai_ujian` berisi 85. Variabel `KKM` berisi 75. Variabel `status` diisi dengan formula: `IF nilai_ujian >= KKM THEN ''Lulus'' ELSE ''Remedial''`. Siswa lain bernama Budi punya nilai 75.

Apa status Budi berdasarkan algoritma di atas?',
  'Lulus, karena 75 >= 75',
  'Remedial, karena 75 tidak lebih besar dari 75',
  'Tidak bisa ditentukan tanpa melihat nilai siswa lain',
  'Remedial, karena KKM adalah batas minimum kelulusan',
  0,
  'Operator ''>='' berarti ''lebih besar atau sama dengan''. 75 >= 75 = True. Jadi Budi ''Lulus''. Opsi B salah karena 75 = 75 memenuhi kondisi >=. Opsi D konseptual benar tapi tidak menjawab pertanyaan yang ditanya status Budi.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: A. Operator ''>='' berarti ''lebih besar atau sama dengan''. 75 >= 75 = True. Jadi Budi ''Lulus''. Opsi B salah karena 75 = 75 memenuhi kondisi >=. Opsi D konseptual benar tapi tidak menjawab pertanyaan yang ditanya status Budi.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 7 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_007',
  '7',
  'Informatika',
  'Di sebuah warung, harga Indomie Rp 3,500. Variabel: harga = 3500, stok = 24.5, tersedia = true. Pemilik warung ingin menampilkan harga dengan format ''Rp 3.500'' (titik sebagai pemisah ribuan).

Tipe data apa yang tepat untuk variabel ''harga'' agar bisa diformat sebagai ''Rp 3.500''?',
  'Integer — karena harga selalu bilangan bulat',
  'Float — karena bisa ada desimal',
  'String — agar bisa langsung menyimpan format ''Rp 3.500''',
  'Boolean — karena cukup tahu ada/tidak ada stok',
  2,
  'Untuk menampilkan format ''Rp 3.500'' dengan titik, nilai harus disimpan sebagai String agar formattingnya tetap utuh. Integer 3500 akan ditampilkan apa adanya tanpa pemisah ribuan kecuali diformat ulang. Namun praktik terbaik: simpan sebagai Integer untuk perhitungan, format sebagai String hanya saat tampilan.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: C. Untuk menampilkan format ''Rp 3.500'' dengan titik, nilai harus disimpan sebagai String agar formattingnya tetap utuh. Integer 3500 akan ditampilkan apa adanya tanpa pemisah ribuan kecuali diformat ulang. Namun praktik terbaik: simpan sebagai Integer untuk perhitungan, format sebagai String hanya saat tampilan.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 8 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_008',
  '7',
  'Informatika',
  'Flowchart algoritma: Mulai → Input suhu → Apakah suhu > 100°C? → Jika ya: ''Air mendidih'' → Jika tidak: ''Air belum mendidih'' → Selesai. Suhu yang diinput adalah 95°C.

Output algoritma di atas adalah?',
  'Air mendidih, karena 95 mendekati 100',
  'Air belum mendidih, karena 95 < 100',
  'Tidak bisa ditentukan',
  'Error, karena 95 bukan bilangan bulat',
  1,
  'Kondisi `suhu > 100` dievaluasi: 95 > 100 = False. Maka output adalah branch ''Jika tidak'' yaitu ''Air belum mendidih''. Opsi A salah karena algoritma tidak peduli ''mendekati'', hanya peduli kondisi benar/salah.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Kondisi `suhu > 100` dievaluasi: 95 > 100 = False. Maka output adalah branch ''Jika tidak'' yaitu ''Air belum mendidih''. Opsi A salah karena algoritma tidak peduli ''mendekati'', hanya peduli kondisi benar/salah.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 9 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_009',
  '7',
  'Informatika',
  'Loop untuk absen siswa: UNTUK setiap siswa di kelas 7A: panggil nama, tunggu jawaban, catat, lanjut. Kelas 7A punya 30 siswa. Bu Guru menghabiskan waktu 5 detik per siswa.

Berapa total waktu yang dibutuhkan Bu Guru untuk absen?',
  '30 detik',
  '150 detik (2 menit 30 detik)',
  '5 detik',
  'Tidak bisa dihitung karena tergantung respons siswa',
  1,
  'Total waktu = jumlah siswa × waktu per siswa = 30 × 5 = 150 detik = 2 menit 30 detik. Loop adalah struktur repetitif yang bisa diprediksi total waktunya jika iterasi dan waktu per iterasi diketahui.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Total waktu = jumlah siswa × waktu per siswa = 30 × 5 = 150 detik = 2 menit 30 detik. Loop adalah struktur repetitif yang bisa diprediksi total waktunya jika iterasi dan waktu per iterasi diketahui.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 10 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_010',
  '7',
  'Informatika',
  'Algoritma penjualan tiket bioscop: JIKA usia_penonton >= 17 MAKA tiket = ''Boleh masuk'' LAIN tiket = ''Tidak boleh masuk sendiri''. Budi berusia 16 tahun ingin nonton film horror 17+.

Apa hasil evaluasi algoritma untuk Budi?',
  '16 >= 17 adalah True, jadi Budi boleh masuk',
  '16 >= 17 adalah False, jadi Budi tidak boleh masuk sendiri',
  'Budi boleh masuk kalau damping orangtua',
  'Algoritma error karena 16 tidak terdefinisi',
  1,
  '16 >= 17 dievaluasi: 16 > 17 = False, 16 = 17 = False, jadi 16 >= 17 = False. Branch ''LAIN'' diambil: ''Tidak boleh masuk sendiri''. Opsi C benar di dunia nyata tapi tidak sesuai algoritma — algoritma hanya mengembalikan status, tidak ada opsi dampingan.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. 16 >= 17 dievaluasi: 16 > 17 = False, 16 = 17 = False, jadi 16 >= 17 = False. Branch ''LAIN'' diambil: ''Tidak boleh masuk sendiri''. Opsi C benar di dunia nyata tapi tidak sesuai algoritma — algoritma hanya mengembalikan status, tidak ada opsi dampingan.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 11 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_011',
  '7',
  'Informatika',
  'Sinta sedang belajar Scratch. Dia membuat variabel `skor` dengan nilai awal 0. Setiap kali sprite musuh diklik, skor bertambah 10. Setelah 5 klik, Sinta ingin menampilkan skor akhir.

Berapa skor akhir Sinta?',
  '0, karena variabel tidak berubah',
  '10, karena hanya klik terakhir yang dihitung',
  '50, karena 5 × 10 = 50',
  'Tidak bisa ditentukan tanpa melihat kode lengkap',
  2,
  'Variabel skor dimulai dari 0. Setiap klik menambah 10 (`skor = skor + 10`). Setelah 5 klik: 0 + 10 + 10 + 10 + 10 + 10 = 50. Ini operasi akumulasi pada variabel.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: C. Variabel skor dimulai dari 0. Setiap klik menambah 10 (`skor = skor + 10`). Setelah 5 klik: 0 + 10 + 10 + 10 + 10 + 10 = 50. Ini operasi akumulasi pada variabel.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 12 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_012',
  '7',
  'Informatika',
  'Algoritma mengirim WhatsApp: (1) buka aplikasi, (2) pilih kontak, (3) ketik pesan, (4) klik send. Bagas ingin kirim pesan yang sama ke 5 teman.

Bagaimana algoritma yang efisien untuk Bagas?',
  'Ulangi langkah 1-4 sebanyak 5 kali',
  'Buat loop: untuk setiap teman, lakukan langkah 2-4 (langkah 1 cukup sekali)',
  'Salin pesan 5 kali, kirim manual satu per satu',
  'Tidak bisa dilakukan tanpa aplikasi pihak ketiga',
  1,
  'Optimasi: langkah 1 (buka aplikasi) cukup sekali, lalu loop langkah 2-4 untuk setiap kontak. Ini contoh dekomposisi + loop — identifikasi langkah yang bisa di-share dan langkah yang harus diulang.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Optimasi: langkah 1 (buka aplikasi) cukup sekali, lalu loop langkah 2-4 untuk setiap kontak. Ini contoh dekomposisi + loop — identifikasi langkah yang bisa di-share dan langkah yang harus diulang.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 13 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_013',
  '7',
  'Informatika',
  'Pseudocode berikut: BEGIN SET total = 0 FOR i = 1 TO 5 total = total + i ENDFOR OUTPUT total END

Apa output algoritma di atas?',
  '5',
  '10',
  '15',
  '25',
  2,
  'Loop dari 1 sampai 5: total = 0 + 1 + 2 + 3 + 4 + 5 = 15. Ini deret aritmatika dengan rumus n(n+1)/2 = 5(6)/2 = 15.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: C. Loop dari 1 sampai 5: total = 0 + 1 + 2 + 3 + 4 + 5 = 15. Ini deret aritmatika dengan rumus n(n+1)/2 = 5(6)/2 = 15.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 14 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_014',
  '7',
  'Informatika',
  'Dalam sebuah game, pemain mengumpulkan koin. Variabel `koin` dimulai dari 0. Setiap musuh yang dikalahkan menambah 5 koin. Setiap level memiliki 10 musuh. Pemain sudah menyelesaikan 3 level.

Berapa total koin yang dimiliki pemain?',
  '15 koin',
  '30 koin',
  '50 koin',
  '150 koin',
  3,
  'Total musuh dikalahkan = 3 level × 10 musuh/level = 30 musuh. Koin = 30 × 5 = 150. Variabel koin mengakumulasi nilai seiring loop iterasi.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: D. Total musuh dikalahkan = 3 level × 10 musuh/level = 30 musuh. Koin = 30 × 5 = 150. Variabel koin mengakumulasi nilai seiring loop iterasi.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 15 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_015',
  '7',
  'Informatika',
  'Flowchart login: Mulai → Input username + password → Cek di database → Apakah cocok? → Jika ya: tampilkan dashboard → Jika tidak: tampilkan error → Selesai. Andi input password salah 3 kali berturut-turut.

Apa yang terjadi pada sistem?',
  'Sistem akan tetap mengulang prompt login sampai password benar',
  'Sistem menampilkan dashboard setelah percobaan ke-3',
  'Sistem menampilkan error 3 kali dan kemungkinan mengunci akun untuk keamanan',
  'Sistem error karena tidak bisa menangani input salah',
  2,
  'Algoritma dasar hanya menampilkan error. Tapi sistem nyata punya logika tambahan: setelah 3x salah, akun dikunci untuk mencegah brute force. Ini adalah pengembangan algoritma dasar dengan keamanan tambahan.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: C. Algoritma dasar hanya menampilkan error. Tapi sistem nyata punya logika tambahan: setelah 3x salah, akun dikunci untuk mencegah brute force. Ini adalah pengembangan algoritma dasar dengan keamanan tambahan.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 16 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_016',
  '7',
  'Informatika',
  'Siswa kelas 7 diminta membuat algoritma ''cara membuat teh manis''. Aldi menulis 7 langkah, tiap langkah 1 kalimat. Bella menulis 10 langkah dengan detail (mis: ''masukkan teh celup ke gelas'' daripada ''masukkan teh'').

Mengapa algoritma Bella lebih baik meski lebih panjang?',
  'Karena lebih panjang = lebih lengkap',
  'Karena setiap langkah lebih spesifik, mengurangi ambiguitas saat dijalankan orang lain',
  'Karena algoritma harus selalu punya 10+ langkah',
  'Tidak selalu — algoritma Aldi lebih baik karena lebih ringkas',
  1,
  'Kualitas algoritma bukan soal panjang/pendek, tapi soal kejelasan. Langkah spesifik (Bella) mengurangi interpretasi berbeda. Orang lain yang ikut algoritma Bella akan membuat teh dengan cara yang sama, sementara algoritma Aldi bisa ditafsirkan berbeda.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Kualitas algoritma bukan soal panjang/pendek, tapi soal kejelasan. Langkah spesifik (Bella) mengurangi interpretasi berbeda. Orang lain yang ikut algoritma Bella akan membuat teh dengan cara yang sama, sementara algoritma Aldi bisa ditafsirkan berbeda.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 17 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_017',
  '7',
  'Informatika',
  'Algoritma binary search mencari elemen di array terurut dengan membagi array jadi 2 setiap iterasi. Untuk array 1 juta elemen, binary search butuh sekitar 20 iterasi. Sementara linear search (cek satu per satu) butuh rata-rata 500 ribu iterasi.

Apa konsep berpikir komputasional yang dipakai binary search?',
  'Dekomposisi — memecah array jadi 2 bagian',
  'Abstraksi — abaikan elemen yang tidak mungkin',
  'Algoritma divide and conquer — bagi masalah jadi sub-masalah lebih kecil',
  'Pengenalan pola — pola pembagian array',
  2,
  'Binary search adalah contoh algoritma ''divide and conquer'' — bagi masalah jadi 2, eliminasi setengahnya, ulangi. Konsep ini lebih spesifik daripada dekomposisi (yang umum). Meski ada elemen abstraksi (abaikan bagian yang tidak mungkin), nama resminya adalah divide and conquer.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: C. Binary search adalah contoh algoritma ''divide and conquer'' — bagi masalah jadi 2, eliminasi setengahnya, ulangi. Konsep ini lebih spesifik daripada dekomposisi (yang umum). Meski ada elemen abstraksi (abaikan bagian yang tidak mungkin), nama resminya adalah divide and conquer.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 18 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_018',
  '7',
  'Informatika',
  'Seorang programmer menulis fungsi `hitung_diskon(harga, persen) { return harga - (harga * persen / 100) }`. Dia memanggil: `hitung_diskon(100000, 20)`. Hasilnya 80000.

Jika programmer memanggil `hitung_diskon(50000, 50)`, apa hasilnya?',
  '25000',
  '50000',
  '100000',
  '0',
  0,
  'hitung_diskon(50000, 50) = 50000 - (50000 × 50 / 100) = 50000 - 25000 = 25000. Diskon 50% artinya harga turun setengah, jadi 50000 jadi 25000.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: A. hitung_diskon(50000, 50) = 50000 - (50000 × 50 / 100) = 50000 - 25000 = 25000. Diskon 50% artinya harga turun setengah, jadi 50000 jadi 25000.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 19 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_019',
  '7',
  'Informatika',
  'Algoritma sortir bubble sort membandingkan elemen berdekatan dan tukar jika urutan salah. Untuk array [5, 2, 8, 1], iterasi pertama menukar 5↔2 → [2, 5, 8, 1], lalu 8↔1 → [2, 5, 1, 8].

Setelah iterasi pertama, apa kondisi array?',
  '[1, 2, 5, 8] — sudah terurut',
  '[2, 5, 1, 8] — elemen terbesar (8) sudah di posisi akhir',
  '[2, 5, 8, 1] — tidak ada perubahan',
  '[8, 5, 2, 1] — terurut descending',
  1,
  'Bubble sort iterasi pertama menggeser elemen terbesar ke posisi paling kanan. Dari [5,2,8,1]: bandingkan 5,2 → swap → [2,5,8,1]; bandingkan 5,8 → tetap; bandingkan 8,1 → swap → [2,5,1,8]. Hasil: 8 di posisi akhir, sisanya belum terurut.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Bubble sort iterasi pertama menggeser elemen terbesar ke posisi paling kanan. Dari [5,2,8,1]: bandingkan 5,2 → swap → [2,5,8,1]; bandingkan 5,8 → tetap; bandingkan 8,1 → swap → [2,5,1,8]. Hasil: 8 di posisi akhir, sisanya belum terurut.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 20 (C4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_020',
  '7',
  'Informatika',
  'Variabel A = 5, B = 10. Algoritma tukar nilai: temp = A; A = B; B = temp;

Setelah algoritma dijalankan, berapa nilai A dan B?',
  'A = 5, B = 10 (tidak berubah)',
  'A = 10, B = 5 (bernilai tertukar)',
  'A = 5, B = 5 (keduanya sama)',
  'A = 10, B = 10 (keduanya sama)',
  1,
  'Algoritma swap pakai variabel sementara `temp`. temp = A (temp=5); A = B (A=10); B = temp (B=5). Hasil: A=10, B=5. Tanpa `temp`, nilai A akan hilang saat ditimpa.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C4',
  'Jawaban benar: B. Algoritma swap pakai variabel sementara `temp`. temp = A (temp=5); A = B (A=10); B = temp (B=5). Hasil: A=10, B=5. Tanpa `temp`, nilai A akan hilang saat ditimpa.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 21 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_021',
  '7',
  'Informatika',
  'Dua siswa diminta membuat algoritma ''menyalakan AC''. Siswa A: (1) ambil remote, (2) arahkan ke AC, (3) tekan tombol ON, (4) set suhu 24°C. Siswa B: (1) ambil remote, (2) tekan ON, (3) arahkan ke AC. Saat diuji, algoritma A berhasil menyalakan AC, algoritma B gagal.

Mana algoritma yang lebih baik dan mengapa?',
  'Siswa A — urutan ''arahkan ke AC sebelum tekan ON'' benar karena sinyal infrared butuh line-of-sight',
  'Siswa B — lebih ringkas = lebih efisien',
  'Sama saja — keduanya valid',
  'Siswa A salah karena harusnya set suhu dulu sebelum ON',
  0,
  'AC pakai infrared yang butuh line-of-sight. Urutan yang benar: arahkan remote → tekan tombol. Algoritma B salah urutan, sinyal infrared tidak sampai ke AC. Evaluasi algoritma tidak hanya soal benar/salah, tapi soal urutan logis berdasarkan constraint fisik.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: A. AC pakai infrared yang butuh line-of-sight. Urutan yang benar: arahkan remote → tekan tombol. Algoritma B salah urutan, sinyal infrared tidak sampai ke AC. Evaluasi algoritma tidak hanya soal benar/salah, tapi soal urutan logis berdasarkan constraint fisik.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 22 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_022',
  '7',
  'Informatika',
  'Bu Guru memberi tugas: buat algoritma ''meminjam buku di perpustakaan''. Aldi menulis 5 langkah. Bella menulis 15 langkah dengan kondisi IF (mis: IF buku tersedia THEN lanjut, ELSE cari buku lain).

Algoritma mana yang lebih baik untuk perpustakaan nyata?',
  'Aldi — lebih ringkas dan mudah diingat',
  'Bella — punya penanganan kasus khusus (buku tidak tersedia), lebih robust',
  'Sama saja — keduanya akan berhasil',
  'Tidak bisa dievaluasi tanpa implementasi nyata',
  1,
  'Algoritma nyata harus handle edge cases (buku tidak tersedia, kartu anggota hilang, dll). Algoritma Bella lebih robust karena punya kondisional. Evaluasi algoritma mempertimbangkan kelengkapan, bukan hanya panjang.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Algoritma nyata harus handle edge cases (buku tidak tersedia, kartu anggota hilang, dll). Algoritma Bella lebih robust karena punya kondisional. Evaluasi algoritma mempertimbangkan kelengkapan, bukan hanya panjang.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 23 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_023',
  '7',
  'Informatika',
  'Andi menulis fungsi Python: `def is_genap(n): if n % 2 == 0: return True`. Saat dipanggil `is_genap(7)`, hasilnya `None`, bukan `False`.

Apa kelemahan fungsi Andi?',
  'Tidak ada — fungsi sudah benar',
  'Tidak ada return untuk kasus ganjil — fungsi implicit return None, seharusnya explicit `return False` di else',
  'Menggunakan modulo (%) yang lambat',
  'Harus pakai `n % 2 == 1` untuk cek ganjil',
  1,
  'Fungsi Andi hanya return True untuk genap. Untuk ganjil, tidak ada return statement, jadi Python implicit return None. Seharusnya: `if n % 2 == 0: return True; else: return False` atau singkatnya `return n % 2 == 0`. Evaluasi: fungsi tidak handle semua kasus.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Fungsi Andi hanya return True untuk genap. Untuk ganjil, tidak ada return statement, jadi Python implicit return None. Seharusnya: `if n % 2 == 0: return True; else: return False` atau singkatnya `return n % 2 == 0`. Evaluasi: fungsi tidak handle semua kasus.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 24 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_024',
  '7',
  'Informatika',
  'Tiga algoritma sortir untuk array 1000 elemen: Bubble sort (10 detik), Quick sort (0.1 detik), Selection sort (5 detik).

Algoritma mana yang paling efisien untuk array 1 juta elemen?',
  'Bubble sort — paling reliable',
  'Quick sort — paling cepat untuk dataset besar',
  'Selection sort — paling sederhana',
  'Tidak bisa ditentukan tanpa test di 1 juta elemen',
  1,
  'Quick sort punya kompleksitas O(n log n), sementara Bubble dan Selection O(n²). Untuk n=1000, perbedaan sudah jelas. Untuk n=1 juta, perbedaan akan jauh lebih besar (Quick sort ~1000x lebih cepat). Evaluasi kompleksitas algoritma penting untuk skala besar.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Quick sort punya kompleksitas O(n log n), sementara Bubble dan Selection O(n²). Untuk n=1000, perbedaan sudah jelas. Untuk n=1 juta, perbedaan akan jauh lebih besar (Quick sort ~1000x lebih cepat). Evaluasi kompleksitas algoritma penting untuk skala besar.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 25 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_025',
  '7',
  'Informatika',
  'Algoritma login sederhana: input password → bandingkan dengan password di database → jika cocok: beri akses. Pak Budi mengkritisi: ''Ini tidak aman! Kalau database bocor, password user ketahuan.''

Evaluasi kritik Pak Budi. Solusi apa yang tepat?',
  'Pak Budi salah — password di database sudah aman selama DB terproteksi',
  'Pak Budi benar — solusinya: simpan hash password, bukan plain text. Saat login, hash input user lalu bandingkan dengan hash di DB',
  'Pak Budi benar — solusinya: encrypt database saja',
  'Pak Budi benar — solusinya: pakai password yang lebih panjang',
  1,
  'Kritik Pak Budi valid. Plain text password di DB adalah risiko keamanan. Solusi: simpan hash (SHA-256/bcrypt). Saat login: hash(input) == hash_di_DB. Walau DB bocor, hacker tidak dapat password asli. Ini praktik standar industri.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Kritik Pak Budi valid. Plain text password di DB adalah risiko keamanan. Solusi: simpan hash (SHA-256/bcrypt). Saat login: hash(input) == hash_di_DB. Walau DB bocor, hacker tidak dapat password asli. Ini praktik standar industri.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 26 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_026',
  '7',
  'Informatika',
  'Dua kelompok siswa membuat game di Scratch. Kelompok A: 1 script panjang 50 blok untuk semua logic. Kelompok B: 5 custom blocks (masing-masing 10 blok) yang dipanggil di main script.

Mana pendekatan yang lebih baik untuk maintenance jangka panjang?',
  'Kelompok A — script tunggal lebih mudah dibaca',
  'Kelompok B — modularitas custom block bikin debugging dan update lebih mudah',
  'Sama saja — keduanya menghasilkan game yang sama',
  'Tidak bisa dievaluasi tanpa mainkan gamenya',
  1,
  'Modularitas (Kelompok B) memudahkan: (1) debug — temukan bug di modul spesifik, (2) update — ubah 1 modul tanpa sentuh lain, (3) reuse — pakai modul di proyek lain. Best practice software engineering.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Modularitas (Kelompok B) memudahkan: (1) debug — temukan bug di modul spesifik, (2) update — ubah 1 modul tanpa sentuh lain, (3) reuse — pakai modul di proyek lain. Best practice software engineering.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 27 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_027',
  '7',
  'Informatika',
  'Algoritma cek tahun kabisat: IF (tahun % 400 == 0) OR (tahun % 4 == 0 AND tahun % 100 != 0) THEN kabisat. Tahun 1900: 1900 % 4 == 0 (True), 1900 % 100 == 0 (True), 1900 % 400 == 0? Tidak (1900 % 400 = 300).

Apakah 1900 tahun kabisat menurut algoritma di atas?',
  'Ya, karena 1900 % 4 == 0',
  'Tidak, karena 1900 % 100 == 0 tapi 1900 % 400 != 0',
  'Tidak bisa ditentukan',
  'Ya, karena 1900 habis dibagi 4 dan 100',
  1,
  'Algoritma: kabisat jika (÷400) ATAU (÷4 DAN tidak ÷100). 1900: ÷400? Tidak. ÷4? Ya. ÷100? Ya (jadi ''tidak ÷100'' = False). Maka kondisi kedua: True AND False = False. Hasil: False OR False = False → 1900 BUKAN kabisat. Tahun 2000: ÷400? Ya → kabisat.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Algoritma: kabisat jika (÷400) ATAU (÷4 DAN tidak ÷100). 1900: ÷400? Tidak. ÷4? Ya. ÷100? Ya (jadi ''tidak ÷100'' = False). Maka kondisi kedua: True AND False = False. Hasil: False OR False = False → 1900 BUKAN kabisat. Tahun 2000: ÷400? Ya → kabisat.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 28 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_028',
  '7',
  'Informatika',
  'Function `hitung_rata(values)` menerima array angka. Implementasi: `total = sum(values); return total / len(values)`. Saat dipanggil `hitung_rata([])` (array kosong), hasilnya ZeroDivisionError.

Apa yang salah dengan fungsi ini?',
  'Tidak ada yang salah — error wajar untuk input kosong',
  'Fungsi tidak handle edge case — seharusnya cek `if len(values) == 0: return 0` atau raise error yang lebih jelas',
  'sum() salah — harusnya pakai loop manual',
  'len() salah — harusnya pakai count()',
  1,
  'Edge case (input kosong) tidak ditangani. Fungsi robust harus anticipate edge case. Solusi: validasi input di awal, return default value atau raise exception yang informatif. Evaluasi: fungsi belum production-ready.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Edge case (input kosong) tidak ditangani. Fungsi robust harus anticipate edge case. Solusi: validasi input di awal, return default value atau raise exception yang informatif. Evaluasi: fungsi belum production-ready.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 29 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_029',
  '7',
  'Informatika',
  'Siswa diminta buat algoritma ''memilih jurusan SMA''. Aldi: (1) lihat nilai rapor, (2) pilih jurusan sesuai nilai tertinggi. Bella: (1) lihat nilai, (2) lihat minat, (3) lihat bakat, (4) diskusi orangtua, (5) pilih jurusan.

Algoritma mana yang lebih realistis untuk keputusan besar seperti jurusan?',
  'Aldi — lebih objektif berdasarkan data',
  'Bella — keputusan besar butuh multi-kriteria, bukan hanya 1 faktor',
  'Aldi — lebih simpel, mudah dijalankan',
  'Tidak bisa dievaluasi — tergantung siswa',
  1,
  'Keputusan kompleks (jurusan) butuh multi-kriteria. Algoritma Aldi terlalu simplistic — hanya 1 faktor. Algoritma Bella lebih realistis: nilai + minat + bakat + diskusi = pertimbangan holistik. Evaluasi: konteks masalah menentukan kompleksitas algoritma yang dibutuhkan.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Keputusan kompleks (jurusan) butuh multi-kriteria. Algoritma Aldi terlalu simplistic — hanya 1 faktor. Algoritma Bella lebih realistis: nilai + minat + bakat + diskusi = pertimbangan holistik. Evaluasi: konteks masalah menentukan kompleksitas algoritma yang dibutuhkan.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 30 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_030',
  '7',
  'Informatika',
  'Bu Guru mengevaluasi 2 algoritma absensi. Algoritma A: panggil nama urut abjad, catat hadir/tidak. Algoritma B: scan QR code siswa, otomatis catat.

Algoritma mana yang lebih efisien dan apa trade-off-nya?',
  'Algoritma A — lebih cepat karena tidak perlu teknologi',
  'Algoritma B — lebih cepat dan akurat, tapi butuh investasi awal (HP siswa, app, training)',
  'Sama efisien — tergantung jumlah siswa',
  'Tidak bisa dibandingkan',
  1,
  'Algoritma B lebih efisien waktu + akurat (no human error). Tapi trade-off: butuh HP/QR per siswa, app development, training. Evaluasi harus pertimbangkan: efisiensi, akurasi, biaya, dan feasibility. Tidak ada algoritma ''satu ukuran untuk semua''.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Algoritma B lebih efisien waktu + akurat (no human error). Tapi trade-off: butuh HP/QR per siswa, app development, training. Evaluasi harus pertimbangkan: efisiensi, akurasi, biaya, dan feasibility. Tidak ada algoritma ''satu ukuran untuk semua''.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 31 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_031',
  '7',
  'Informatika',
  'Function Python `def login(username, password): query_db(username)` mengambil password dari DB dan bandingkan di aplikasi. Security expert mengkritisi: ''Ini vulnerable ke SQL injection!''

Evaluasi kritik expert. Solusi yang tepat?',
  'Expert salah — bandingkan di aplikasi sudah aman',
  'Expert benar — solusi: pakai parameterized query (prepared statement) untuk hindari SQL injection',
  'Expert benar — solusi: encrypt password di DB',
  'Expert benar — solusi: pakai HTTPS',
  1,
  'SQL injection terjadi saat input user disisipkan ke query string tanpa sanitasi. Solusi: parameterized query (e.g., `cursor.execute(''SELECT * FROM users WHERE username = ?'', (username,))`). Encrypt password dan HTTPS juga penting, tapi bukan solusi spesifik untuk SQL injection.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. SQL injection terjadi saat input user disisipkan ke query string tanpa sanitasi. Solusi: parameterized query (e.g., `cursor.execute(''SELECT * FROM users WHERE username = ?'', (username,))`). Encrypt password dan HTTPS juga penting, tapi bukan solusi spesifik untuk SQL injection.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 32 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_032',
  '7',
  'Informatika',
  'Algoritma reverse string ''halo'' menjadi ''olah'': for i in range(len(s)-1, -1, -1): result += s[i]. Kompleksitas O(n).

Apakah algoritma ini optimal? Bandingkan dengan `s[::-1]` di Python.',
  'Sangat optimal — tidak bisa lebih cepat dari O(n)',
  'Tidak optimal — `s[::-1]` pakai C implementation yang lebih cepat (meskipun sama-sama O(n))',
  'Tidak optimal — harus pakai rekursi',
  'Sama saja — keduanya O(n)',
  1,
  'Kompleksitas waktu sama (O(n)), tapi implementasi Python `s[::-1]` jauh lebih cepat karena: (1) dijalankan di C (bukan Python loop), (2) pre-allocated memory. Evaluasi algoritma tidak hanya soal Big-O, tapi juga konstanta implementasi.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Kompleksitas waktu sama (O(n)), tapi implementasi Python `s[::-1]` jauh lebih cepat karena: (1) dijalankan di C (bukan Python loop), (2) pre-allocated memory. Evaluasi algoritma tidak hanya soal Big-O, tapi juga konstanta implementasi.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 33 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_033',
  '7',
  'Informatika',
  'Bu Guru memberi 2 algoritma untuk cek plagiarism tugas siswa. Algoritma A: bandingkan teks siswa dengan database tugas (exact match). Algoritma B: pakai NLP untuk cek semantic similarity (artinya mirip meski kata beda).

Mana algoritma yang lebih efektif dan apa trade-off-nya?',
  'A — lebih akurat karena exact match',
  'B — lebih efektif tangkap parafrase, tapi lebih lambat dan butuh model NLP',
  'Sama efektif',
  'Tidak bisa dievaluasi',
  1,
  'Plagiarism modern sering pakai parafrase (ganti kata, ubah struktur kalimat). Exact match (A) akan lewat banyak kasus. Semantic similarity (B) lebih efektif tapi: (1) butuh model NLP, (2) lebih lambat, (3) false positive (mirip topik bukan plagiarism). Trade-off: akurasi vs kompleksitas.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Plagiarism modern sering pakai parafrase (ganti kata, ubah struktur kalimat). Exact match (A) akan lewat banyak kasus. Semantic similarity (B) lebih efektif tapi: (1) butuh model NLP, (2) lebih lambat, (3) false positive (mirip topik bukan plagiarism). Trade-off: akurasi vs kompleksitas.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 34 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_034',
  '7',
  'Informatika',
  'Seorang programmer menulis `if x == True:` untuk cek boolean. Reviewer menyarankan: tulis saja `if x:`.

Evaluasi saran reviewer. Mana yang lebih baik?',
  'Programmer asli — explicit lebih jelas',
  'Reviewer — `if x:` adalah Pythonic way, lebih ringkas dan idiomatik',
  'Sama saja — kompiler optimasi akan sama',
  'Reviewer salah — bisa error kalau x bukan boolean',
  1,
  'Dalam Python, `if x:` adalah idiom standar. `if x == True:` redundant dan bisa misleading (mis: `1 == True` True, tapi `2 == True` False padahal `if 2:` True). Evaluasi: kode Pythonic lebih readable untuk developer Python berpengalaman.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Dalam Python, `if x:` adalah idiom standar. `if x == True:` redundant dan bisa misleading (mis: `1 == True` True, tapi `2 == True` False padahal `if 2:` True). Evaluasi: kode Pythonic lebih readable untuk developer Python berpengalaman.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 36 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_036',
  '7',
  'Informatika',
  'Dua algoritma cari rata-rata. Algoritma A: `sum / count`. Algoritma B: `sum / count` tapi sebelumnya cek `if count == 0: return 0`. Untuk array normal, keduanya return nilai yang sama.

Mengapa algoritma B lebih baik?',
  'Lebih cepat',
  'Handle edge case (array kosong) — algoritma A akan crash (ZeroDivisionError)',
  'Lebih akurat',
  'Lebih mudah dibaca',
  1,
  'Algoritma B defensive programming — anticipate edge case. Walau untuk input normal hasil sama, algoritma B tidak crash untuk input kosong. Evaluasi: robustness penting untuk production code.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Algoritma B defensive programming — anticipate edge case. Walau untuk input normal hasil sama, algoritma B tidak crash untuk input kosong. Evaluasi: robustness penting untuk production code.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 37 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_037',
  '7',
  'Informatika',
  'Pak Budi menulis algoritma: `def tambah(a, b): return a + b`. Test: `tambah(5, 3)` = 8, `tambah(''5'', ''3'')` = ''53''. Hasil kedua test benar menurut Python, tapi Pak Budi kaget.

Apa masalah dengan fungsi Pak Budi?',
  'Tidak ada — Python dinamis, jadi wajar',
  'Tidak ada type checking — fungsi menerima input apa saja, bisa menghasilkan bug tak terduga (string concatenation bukan numeric addition)',
  'Python salah — harusnya error',
  'Pak Budi salah test — harus konsisten tipe data',
  1,
  'Python dynamic typing memungkinkan `+` untuk int dan string, dengan hasil berbeda (penambahan vs concatenation). Tanpa type annotation atau validasi, fungsi tidak aman untuk semua input. Solusi: pakai type hints (`def tambah(a: int, b: int) -> int`) atau validasi di awal.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Python dynamic typing memungkinkan `+` untuk int dan string, dengan hasil berbeda (penambahan vs concatenation). Tanpa type annotation atau validasi, fungsi tidak aman untuk semua input. Solusi: pakai type hints (`def tambah(a: int, b: int) -> int`) atau validasi di awal.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 38 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_038',
  '7',
  'Informatika',
  'Algoritma binary search butuh array terurut. Andi punya array tidak terurut. Dia pikir: ''Kalau saya sort dulu lalu binary search, apakah lebih cepat dari linear search?''

Evaluasi ide Andi. Apakah lebih cepat?',
  'Ya — binary search selalu lebih cepat',
  'Tidak — sorting butuh O(n log n), linear search O(n). Total sorting + binary search = O(n log n) + O(log n) = O(n log n) > O(n)',
  'Sama cepat',
  'Tergantung ukuran array',
  1,
  'Untuk 1x pencarian: linear search O(n) lebih cepat daripada sort + binary search O(n log n). Binary search unggul kalau kita akan search banyak kali pada array yang sama (sort sekali, search berkali-kali). Evaluasi trade-off: konteks pemakaian menentukan pilihan algoritma.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Untuk 1x pencarian: linear search O(n) lebih cepat daripada sort + binary search O(n log n). Binary search unggul kalau kita akan search banyak kali pada array yang sama (sort sekali, search berkali-kali). Evaluasi trade-off: konteks pemakaian menentukan pilihan algoritma.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 39 (C5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_039',
  '7',
  'Informatika',
  'Algoritma rekursif faktorial: `def fact(n): if n == 0: return 1; return n * fact(n-1)`. Saat dipanggil `fact(1000)`, Python error: RecursionError.

Apa kelemahan algoritma rekursif ini?',
  'Tidak ada — rekursi selalu bagus',
  'Python punya batas rekursi (default 1000) — untuk n besar, sebaiknya pakai iteratif',
  'Algoritma salah — harusnya `fact(n-1) * n`',
  'Harus pakai memoization',
  1,
  'Python default recursion limit = 1000. Rekursi dalam memakai call stack yang terbatas. Solusi: (1) naikkan limit (sys.setrecursionlimit), (2) pakai iteratif (`result = 1; for i in range(1, n+1): result *= i`), (3) pakai tail recursion (Python tidak optimasi ini). Evaluasi: rekursi tidak selalu lebih baik.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C5',
  'Jawaban benar: B. Python default recursion limit = 1000. Rekursi dalam memakai call stack yang terbatas. Solusi: (1) naikkan limit (sys.setrecursionlimit), (2) pakai iteratif (`result = 1; for i in range(1, n+1): result *= i`), (3) pakai tail recursion (Python tidak optimasi ini). Evaluasi: rekursi tidak selalu lebih baik.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 40 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_040',
  '7',
  'Informatika',
  'Siti diminta membuat algoritma ''cara memesan makanan via GoFood''. Algoritma harus mengakomodasi: (1) user tidak punya akun, (2) user punya akun tapi lupa password, (3) restoran tutup, (4) pesanan habis, (5) pembayaran gagal.

Struktur algoritma yang paling tepat untuk menangani semua skenario ini?',
  'Algoritma linier sederhana — 10 langkah berurutan',
  'Algoritma dengan banyak IF-ELSE bercabang untuk handle tiap edge case',
  'Algoritma rekursif',
  'Algoritma tanpa kondisional — handle error saat runtime',
  1,
  'Untuk handle multiple skenario, algoritma butuh struktur IF-ELSE bercabang (decision tree). Tiap titik decision (punya akun? restoran buka? stok tersedia? pembayaran sukses?) butuh kondisional. Ini menciptakan algoritma robust.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Untuk handle multiple skenario, algoritma butuh struktur IF-ELSE bercabang (decision tree). Tiap titik decision (punya akun? restoran buka? stok tersedia? pembayaran sukses?) butuh kondisional. Ini menciptakan algoritma robust.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 41 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_041',
  '7',
  'Informatika',
  'Andi ingin membuat program Python yang bisa: (1) input 5 nilai siswa, (2) hitung rata-rata, (3) tentukan grade (A/B/C/D), (4) tampilkan laporan lengkap.

Struktur kode Python yang paling tepat?',
  '1 function panjang yang handle semua',
  'Pisah jadi 4 function: `input_nilai()`, `hitung_rata(nilai)`, `tentukan_grade(rata)`, `tampilkan_laporan(data)`',
  '1 function dengan banyak parameter',
  'Tidak perlu function — tulis di global scope',
  1,
  'Modularitas: 4 function terpisah. Tiap function punya 1 responsibility (Single Responsibility Principle). Keuntungan: (1) testable — test tiap function independen, (2) reusable — `tentukan_grade` bisa dipakai di proyek lain, (3) readable — alur jelas.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Modularitas: 4 function terpisah. Tiap function punya 1 responsibility (Single Responsibility Principle). Keuntungan: (1) testable — test tiap function independen, (2) reusable — `tentukan_grade` bisa dipakai di proyek lain, (3) readable — alur jelas.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 42 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_042',
  '7',
  'Informatika',
  'Buatlah pseudocode untuk algoritma yang mendeteksi apakah sebuah kata adalah palindrom (dibaca sama dari depan dan belakang, mis: ''katak'').

Pseudocode yang benar?',
  'BEGIN INPUT kata; IF kata == kata[dibalik] THEN palindrom ELSE bukan END',
  'BEGIN INPUT kata; SET rev = ''''; FOR i = len(kata)-1 TO 0 STEP -1: rev += kata[i]; ENDFOR; IF kata == rev THEN palindrom ELSE bukan END',
  'BEGIN INPUT kata; FOR i = 0 TO len(kata)/2: IF kata[i] != kata[len-i-1] THEN bukan; ENDFOR; palindrom END',
  'B dan C keduanya benar — B membangun string reverse dulu lalu bandingkan, C bandingkan karakter per karakter tanpa string tambahan',
  3,
  'Pilihan B (build reversed string) dan C (compare symmetrically) keduanya valid. B lebih intuitif tapi butuh memori tambahan O(n). C lebih efisien O(1) space, berhenti early saat ketemu mismatch. Keduanya benar — pilih berdasarkan konteks (readability vs efficiency).',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: D. Pilihan B (build reversed string) dan C (compare symmetrically) keduanya valid. B lebih intuitif tapi butuh memori tambahan O(n). C lebih efisien O(1) space, berhenti early saat ketemu mismatch. Keduanya benar — pilih berdasarkan konteks (readability vs efficiency).',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 43 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_043',
  '7',
  'Informatika',
  'Siswa diminta merancang algoritma ''sistem antrian bank''. Sistem harus: (1) kasih nomor antrian ke customer, (2) panggil nomor berikutnya, (3) skip customer yang tidak hadir saat dipanggil, (4) tampilkan estimasi waktu tunggu.

Struktur data apa yang paling tepat?',
  'Array — index jadi nomor antrian',
  'Queue (FIFO) — First In First Out, cocok untuk antrian',
  'Stack (LIFO) — Last In First Out',
  'Tree — hierarki customer',
  1,
  'Queue adalah struktur data yang diciptakan untuk skenario antrian. Customer yang datang pertama = dilayani pertama (FIFO). Operasi: enqueue (tambah antrian), dequeue (panggil berikutnya). Estimasi waktu = jumlah antrian × rata-rata waktu layanan.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Queue adalah struktur data yang diciptakan untuk skenario antrian. Customer yang datang pertama = dilayani pertama (FIFO). Operasi: enqueue (tambah antrian), dequeue (panggil berikutnya). Estimasi waktu = jumlah antrian × rata-rata waktu layanan.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 44 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_044',
  '7',
  'Informatika',
  'Buat algoritma Python yang mengubah angka desimal ke biner tanpa pakai function `bin()` bawaan.

Implementasi yang benar?',
  'def dec_to_bin(n): return str(n) + ''b''',
  'def dec_to_bin(n): result = ''''; while n > 0: result = str(n % 2) + result; n = n // 2; return result',
  'def dec_to_bin(n): return format(n, ''b'')',
  'B dan C benar, tapi B menunjukkan algoritma manual (divide by 2, prepend remainder)',
  3,
  'Pilihan B mengimplementasikan algoritma konversi manual: bagi 2, sisa prepend ke result, ulangi sampai 0. Pilihan C pakai `format()` bawaan Python yang juga benar tapi bukan ''algoritma manual''. Soal minta tanpa `bin()`, jadi B lebih sesuai dengan semangat soal. C technically valid juga.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: D. Pilihan B mengimplementasikan algoritma konversi manual: bagi 2, sisa prepend ke result, ulangi sampai 0. Pilihan C pakai `format()` bawaan Python yang juga benar tapi bukan ''algoritma manual''. Soal minta tanpa `bin()`, jadi B lebih sesuai dengan semangat soal. C technically valid juga.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 45 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_045',
  '7',
  'Informatika',
  'Rancang algoritma ''detektor hoaks'' sederhana. Input: sebuah berita (text). Output: ''Mungkin hoaks'' atau ''Mungkin valid''.

Fitur apa yang harus ada di algoritma?',
  'Cek apakah berita mengandung kata ''viral'' atau ''segera sebarkan''',
  'Cek multiple criteria: (1) sumber (anonim/tidak), (2) bahasa sensational, (3) tidak ada referensi, (4) cross-check dengan database berita terverifikasi',
  'Cek apakah berita panjang atau pendek',
  'Cek tanggal publikasi',
  1,
  'Detektor hoaks butuh multi-kriteria. Satu cek (seperti pilihan A) terlalu simplistic — banyak berita valid juga pakai kata ''viral''. Multi-criteria (pilihan B) lebih robust: sumber + bahasa + referensi + database. Algoritma nyata (CekFakta, Mafindo) pakai pendekatan ini + ML.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Detektor hoaks butuh multi-kriteria. Satu cek (seperti pilihan A) terlalu simplistic — banyak berita valid juga pakai kata ''viral''. Multi-criteria (pilihan B) lebih robust: sumber + bahasa + referensi + database. Algoritma nyata (CekFakta, Mafindo) pakai pendekatan ini + ML.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 46 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_046',
  '7',
  'Informatika',
  'Buatlah function Python `is_prime(n)` yang return True jika n bilangan prima.

Implementasi yang paling efisien untuk n besar?',
  'def is_prime(n): for i in range(2, n): if n % i == 0: return False; return True',
  'def is_prime(n): if n < 2: return False; for i in range(2, int(n**0.5) + 1): if n % i == 0: return False; return True',
  'def is_prime(n): return n > 1 and all(n % i for i in range(2, n))',
  'B paling efisien — cek pembagi hanya sampai √n, karena jika n = a × b, salah satu pasti ≤ √n',
  3,
  'Pilihan B paling efisien: cek pembagi hanya sampai √n. Kompleksitas O(√n) vs A dan C yang O(n). Untuk n=10000, A cek 9998 pembagi, B cek 99 pembagi. Optimasi: skip angka genap (cuma cek 2 lalu ganjil saja) bisa lebih cepat 2x.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: D. Pilihan B paling efisien: cek pembagi hanya sampai √n. Kompleksitas O(√n) vs A dan C yang O(n). Untuk n=10000, A cek 9998 pembagi, B cek 99 pembagi. Optimasi: skip angka genap (cuma cek 2 lalu ganjil saja) bisa lebih cepat 2x.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 47 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_047',
  '7',
  'Informatika',
  'Sinta ingin membuat game ''Tebak Angka'' di Python. Sistem generate angka 1-100, user menebak, sistem beri feedback ''terlalu tinggi'' / ''terlalu rendah'' / ''benar''.

Struktur algoritma yang paling tepat?',
  'Linear search — user tebak 1, 2, 3, ... sampai benar (maks 100 tebakan)',
  'Binary search — user tebak 50, jika ''rendah'' tebak 75, jika ''tinggi'' tebak 25, dst (maks 7 tebakan)',
  'Random guess — user tebak angka acak sampai benar',
  'Tidak bisa dioptimasi — tergantung keberuntungan',
  1,
  'Binary search optimal untuk tebak angka di range terurut. Log2(100) ≈ 6.64, jadi maks 7 tebakan. Strategi: tebak tengah, eliminasi setengah, ulangi. Ini menciptakan strategi optimal dari pada random guessing.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Binary search optimal untuk tebak angka di range terurut. Log2(100) ≈ 6.64, jadi maks 7 tebakan. Strategi: tebak tengah, eliminasi setengah, ulangi. Ini menciptakan strategi optimal dari pada random guessing.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 48 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_048',
  '7',
  'Informatika',
  'Buatlah function Python `hitung_fibonacci(n)` yang return bilangan Fibonacci ke-n (0, 1, 1, 2, 3, 5, 8, 13, ...).

Implementasi paling efisien?',
  'def fib(n): if n <= 1: return n; return fib(n-1) + fib(n-2)  # rekursif',
  'def fib(n): a, b = 0, 1; for _ in range(n): a, b = b, a+b; return a  # iteratif',
  'def fib(n): return int((1.618**n) / 2.236)  # Binet''s formula',
  'B paling efisien untuk umum — iteratif O(n), tanpa overhead call stack. A eksponensial O(2^n), C ada rounding error untuk n besar',
  3,
  'Rekursif (A) O(2^n) — sangat lambat untuk n=50. Iteratif (B) O(n) — cepat dan aman. Binet (C) cepat O(1) tapi ada precision issue untuk n besar. Untuk umumnya, B adalah pilihan terbaik: cepat, akurat, mudah dibaca. Mencipta: pilih algoritma berdasarkan trade-off.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: D. Rekursif (A) O(2^n) — sangat lambat untuk n=50. Iteratif (B) O(n) — cepat dan aman. Binet (C) cepat O(1) tapi ada precision issue untuk n besar. Untuk umumnya, B adalah pilihan terbaik: cepat, akurat, mudah dibaca. Mencipta: pilih algoritma berdasarkan trade-off.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 49 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_049',
  '7',
  'Informatika',
  'Rancang algoritma ''rekomendasi lagu Spotify'' sederhana. Input: riwayat lagu yang didengar user. Output: 5 lagu rekomendasi.

Struktur algoritma yang paling tepat?',
  'Cek lagu yang sering diputar, rekomendasikan lagu yang sama persis',
  'Identifikasi genre/artist yang sering diputar → cari lagu lain dengan genre/artist sama yang belum diputar → rekomendasikan 5 lagu',
  'Rekomendasikan lagu populer secara global',
  'Rekomendasikan lagu acak',
  1,
  'Algoritma rekomendasi butuh: (1) analisis riwayat (genre/artist favorit), (2) filter lagu belum diputar, (3) ranking berdasarkan similarity. Ini dasar content-based filtering. Algoritma nyata (Spotify, Netflix) lebih kompleks (collaborative filtering + ML), tapi prinsipnya sama.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Algoritma rekomendasi butuh: (1) analisis riwayat (genre/artist favorit), (2) filter lagu belum diputar, (3) ranking berdasarkan similarity. Ini dasar content-based filtering. Algoritma nyata (Spotify, Netflix) lebih kompleks (collaborative filtering + ML), tapi prinsipnya sama.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 50 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_050',
  '7',
  'Informatika',
  'Buatlah function Python yang menerima string dan return kata yang paling sering muncul. Jika ada tie, return kata pertama (urutan alfabet).

Implementasi yang tepat?',
  'def most_frequent(s): words = s.split(); counts = {}; for w in words: counts[w] = counts.get(w, 0) + 1; max_count = max(counts.values()); candidates = [w for w, c in counts.items() if c == max_count]; return sorted(candidates)[0]',
  'def most_frequent(s): return s.split()[0]',
  'def most_frequent(s): return max(s.split())',
  'def most_frequent(s): return sorted(s.split())[0]',
  0,
  'Algoritma: (1) split jadi kata, (2) hitung freq tiap kata pakai dict, (3) cari max count, (4) filter kata dengan max count, (5) sort alfabet, ambil pertama. Mencipta algoritma butuh dekomposisi langkah + struktur data yang tepat (dict untuk counting).',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: A. Algoritma: (1) split jadi kata, (2) hitung freq tiap kata pakai dict, (3) cari max count, (4) filter kata dengan max count, (5) sort alfabet, ambil pertama. Mencipta algoritma butuh dekomposisi langkah + struktur data yang tepat (dict untuk counting).',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 51 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_051',
  '7',
  'Informatika',
  'Rancang algoritma ''sistem parkir mall''. Sistem harus: (1) catat kendaraan masuk (plat, waktu), (2) hitung biaya saat keluar (Rp 5000/jam, minimum 1 jam), (3) cek member (kalau member, gratis 2 jam pertama).

Struktur data + algoritma yang paling tepat?',
  'Array of string — simpan plat masuk dan keluar',
  'Dictionary {plat: {masuk: waktu, is_member: bool}} + function `hitung_biaya(plat, keluar)` dengan logic IF member',
  'List of tuple — [(plat, masuk, keluar, biaya)]',
  'Stack — push plat saat masuk, pop saat keluar',
  1,
  'Dict of dict memungkinkan lookup cepat by plat (O(1)) + simpan multiple attribute (waktu masuk, status member). Function `hitung_biaya` encapsulate logic: hitung durasi, cek member, apply tarif. Mencipta struktur data sesuai kebutuhan access pattern.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Dict of dict memungkinkan lookup cepat by plat (O(1)) + simpan multiple attribute (waktu masuk, status member). Function `hitung_biaya` encapsulate logic: hitung durasi, cek member, apply tarif. Mencipta struktur data sesuai kebutuhan access pattern.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 52 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_052',
  '7',
  'Informatika',
  'Buat function Python `compress_string(s)` yang kompres string dengan run-length encoding. Contoh: ''aaabbc'' → ''a3b2c1''.

Implementasi yang tepat?',
  'def compress(s): return s',
  'def compress(s): if not s: return ''''; result = ''''; count = 1; for i in range(1, len(s)): if s[i] == s[i-1]: count += 1; else: result += s[i-1] + str(count); count = 1; result += s[-1] + str(count); return result',
  'def compress(s): return ''''.join(f''{c}{s.count(c)}'' for c in set(s))',
  'def compress(s): return s.replace(''a'', ''a1'').replace(''b'', ''b1'')',
  1,
  'Algoritma: iterasi string, hitung consecutive chars, saat char beda, append ke result. Edge case: string kosong, char terakhir. Mencipta algoritma butuh handle semua kasus + struktur yang tepat (loop + accumulator). Pilihan C salah: set hilangkan urutan dan count global, bukan consecutive.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Algoritma: iterasi string, hitung consecutive chars, saat char beda, append ke result. Edge case: string kosong, char terakhir. Mencipta algoritma butuh handle semua kasus + struktur yang tepat (loop + accumulator). Pilihan C salah: set hilangkan urutan dan count global, bukan consecutive.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 53 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_053',
  '7',
  'Informatika',
  'Rancang algoritma ''sistem rekomendasi film'' berdasarkan rating user. Input: matrix user × film dengan rating 1-5 (0 = belum ditonton). Output: 3 film rekomendasi untuk user X.

Algoritma yang paling tepat?',
  'Cari film dengan rating tertinggi global, rekomendasikan 3 teratas ke user X',
  'Cari user lain yang mirip ratingnya dengan user X (cosine similarity) → rekomendasikan film yang dirating tinggi oleh user mirip tersebut, tapi belum ditonton user X',
  'Rekomendasikan film acak yang belum ditonton',
  'Rekomendasikan film dengan rating terendah',
  1,
  'Ini disebut collaborative filtering. Algoritma: (1) cari user mirip (similar taste), (2) lihat film yang mereka suka, (3) filter yang belum user X tonton, (4) ranking, ambil top 3. Mencipta algoritma ML butuh paham konsep similarity + filtering.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Ini disebut collaborative filtering. Algoritma: (1) cari user mirip (similar taste), (2) lihat film yang mereka suka, (3) filter yang belum user X tonton, (4) ranking, ambil top 3. Mencipta algoritma ML butuh paham konsep similarity + filtering.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 54 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_054',
  '7',
  'Informatika',
  'Buatlah function Python `validate_password(pwd)` yang return True jika password kuat: minimal 12 char, ada huruf besar, huruf kecil, angka, simbol, tidak mengandung kata kamus umum (password, 123, admin).

Implementasi yang tepat?',
  'def validate(pwd): return len(pwd) >= 12',
  'def validate(pwd): if len(pwd) < 12: return False; has_upper = any(c.isupper() for c in pwd); has_lower = any(c.islower() for c in pwd); has_digit = any(c.isdigit() for c in pwd); has_symbol = any(not c.isalnum() for c in pwd); common = [''password'', ''123'', ''admin'', ''qwerty'']; has_common = any(w in pwd.lower() for w in common); return all([has_upper, has_lower, has_digit, has_symbol, not has_common])',
  'def validate(pwd): return True',
  'def validate(pwd): return pwd != ''password''',
  1,
  'Algoritma: cek panjang, cek 4 kategori char (upper, lower, digit, symbol), cek kata kamus umum. Pakai `any()` dengan generator expression untuk efisiensi. Mencipta algoritma validasi butuh dekomposisi kriteria + handle semua kasus.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Algoritma: cek panjang, cek 4 kategori char (upper, lower, digit, symbol), cek kata kamus umum. Pakai `any()` dengan generator expression untuk efisiensi. Mencipta algoritma validasi butuh dekomposisi kriteria + handle semua kasus.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 55 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_055',
  '7',
  'Informatika',
  'Rancang algoritma ''cari teman dekat di social media'' berdasarkan interaksi (like, comment, share). Input: log interaksi user X dengan user lain selama 1 bulan.

Algoritma yang paling tepat?',
  'Hitung total interaksi per user → sort descending → ambil top 5',
  'Weighted scoring: like=1, comment=3, share=5 → total per user → sort descending → ambil top 5',
  'Hitung user yang paling sering DM',
  'Ambil user pertama yang pernah interaksi',
  1,
  'Weighted scoring lebih akurat — share menandakan deeper engagement daripada like. Algoritma: (1) iterasi log, (2) accumulate score per user dengan weight, (3) sort by score descending, (4) ambil top N. Mencipta algoritma butuh paham konteks bisnis + pilih weighting yang masuk akal.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Weighted scoring lebih akurat — share menandakan deeper engagement daripada like. Algoritma: (1) iterasi log, (2) accumulate score per user dengan weight, (3) sort by score descending, (4) ambil top N. Mencipta algoritma butuh paham konteks bisnis + pilih weighting yang masuk akal.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 56 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_056',
  '7',
  'Informatika',
  'Buatlah function Python `merge_sorted_arrays(a, b)` yang merge 2 array terurut menjadi 1 array terurut, tanpa pakai `sorted()` bawaan.

Implementasi yang efisien (O(n+m))?',
  'def merge(a, b): return sorted(a + b)',
  'def merge(a, b): result = []; i = j = 0; while i < len(a) and j < len(b): if a[i] <= b[j]: result.append(a[i]); i += 1; else: result.append(b[j]); j += 1; result.extend(a[i:]); result.extend(b[j:]); return result',
  'def merge(a, b): result = a + b; result.sort(); return result',
  'def merge(a, b): return [x for x in a] + [y for y in b]',
  1,
  'Algoritma merge sort: 2 pointer (i untuk a, j untuk b), bandingkan elemen, append yang lebih kecil, majukan pointer. Setelah salah array habis, extend sisa array lain. Kompleksitas O(n+m) — lebih efisien dari sort ulang O((n+m) log(n+m)).',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Algoritma merge sort: 2 pointer (i untuk a, j untuk b), bandingkan elemen, append yang lebih kecil, majukan pointer. Setelah salah array habis, extend sisa array lain. Kompleksitas O(n+m) — lebih efisien dari sort ulang O((n+m) log(n+m)).',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 57 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_057',
  '7',
  'Informatika',
  'Rancang algoritma ''sistem pemberian rekomendasi tugas'' untuk siswa. Sistem harus: (1) identifikasi topik yang siswa lemah (dari nilai), (2) cari materi yang sesuai, (3) rekomendasikan tugas bertingkat (mudah → sedang → sulit).

Struktur algoritma yang paling tepat?',
  'Cari topik dengan nilai terendah, rekomendasikan tugas sulit di topik itu',
  'Threshold-based: topik nilai < 70 = lemah → cari materi topik itu → rekomendasikan tugas dari level mudah, setelah lulus naik ke sedang, setelah lulus naik ke sulit',
  'Rekomendasikan tugas acak',
  'Rekomendasikan tugas di topik yang sudah dikuasai',
  1,
  'Adaptive learning: (1) identifikasi gap, (2) cari materi sesuai, (3) progression bertingkat (scaffolding). Mencipta algoritma edukasi butuh paham pedagogi + implementasi teknis. Algoritma nyata (Khan Academy, Duolingo) pakai pendekatan ini + ML.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Adaptive learning: (1) identifikasi gap, (2) cari materi sesuai, (3) progression bertingkat (scaffolding). Mencipta algoritma edukasi butuh paham pedagogi + implementasi teknis. Algoritma nyata (Khan Academy, Duolingo) pakai pendekatan ini + ML.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 58 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_058',
  '7',
  'Informatika',
  'Buatlah function Python `remove_duplicates(lst)` yang hapus duplikat dari list, preserve urutan pertama kemunculan. Tanpa pakai `set()` langsung.

Implementasi yang benar?',
  'def remove_dupes(lst): return list(set(lst))',
  'def remove_dupes(lst): seen = set(); result = []; for x in lst: if x not in seen: seen.add(x); result.append(x); return result',
  'def remove_dupes(lst): return [x for i, x in enumerate(lst) if x not in lst[:i]]',
  'B dan C benar — B pakai set untuk O(1) lookup, C pakai list slicing (O(n²))',
  3,
  'B dan C benar secara output, tapi B lebih efisien O(n) karena pakai set untuk lookup O(1). C O(n²) karena `x not in lst[:i]` scan list setiap iterasi. Mencipta algoritma: pilih struktur data yang tepat (set untuk membership test).',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: D. B dan C benar secara output, tapi B lebih efisien O(n) karena pakai set untuk lookup O(1). C O(n²) karena `x not in lst[:i]` scan list setiap iterasi. Mencipta algoritma: pilih struktur data yang tepat (set untuk membership test).',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 59 (C6)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES 
(
  'q_inf_7_7_1_059',
  '7',
  'Informatika',
  'Rancang algoritma ''deteksi anomali'' untuk transaksi bank. Sistem harus flag transaksi yang mencurigakan (potential fraud).

Struktur algoritma yang paling tepat?',
  'Flag semua transaksi > Rp 1 juta',
  'Multiple criteria: (1) amount > rata-rata user × 3, (2) lokasi tidak biasa, (3) waktu mencurigakan (3 AM), (4) merchant kategori high-risk, (5) multiple transaksi cepat berturut → flag jika 2+ criteria terpenuhi',
  'Flag transaksi dari merchant baru',
  'Random flag 1% transaksi',
  1,
  'Fraud detection butuh multi-criteria + threshold. Satu cek (seperti A) terlalu simplistic — banyak transaksi valid > Rp 1 juta. Multi-criteria dengan threshold (2+ criteria terpenuhi) lebih akurat. Algoritma nyata pakai ML (Isolation Forest, Autoencoder) + rules-based.',
  'Berpikir Komputasi',
  true,
  'pilihan_ganda',
  'C6',
  'Jawaban benar: B. Fraud detection butuh multi-criteria + threshold. Satu cek (seperti A) terlalu simplistic — banyak transaksi valid > Rp 1 juta. Multi-criteria dengan threshold (2+ criteria terpenuhi) lebih akurat. Algoritma nyata pakai ML (Isolation Forest, Autoencoder) + rules-based.',
  'Opsi lain kurang tepat karena tidak sesuai dengan konsep yang ditanyakan.',
  'cp_inf_7_1',
  'tp_inf_7_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Total: 58 soal untuk cp_inf_7_1