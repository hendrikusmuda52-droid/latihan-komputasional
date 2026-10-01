-- CP + TP + Materi + 150 Soal (100 PG + 50 Isian) + Tugas
-- Kelas 12 DKV — Mata Pelajaran Kejuruan
-- Fokus: Image Editing & Image Manipulation

-- CP (deskripsi < 100 chars)
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('cp_kej_12_1', 'Mata Pelajaran Kejuruan', '12DKV', 'CP.KEJ.1', 'Siswa mampu editing dan manipulasi gambar dengan teknik pencahayaan, warna, dan komposisi.', true, NOW(), NOW())
ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

-- TP (deskripsi < 100 chars)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_kej_12_1_1', 'cp_kej_12_1', 'TP.KEJ.1.1', 'Siswa mampu menerapkan teknik editing: pencahayaan, komposisi, warna, kontras, noise-blur.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

-- Materi
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_kej_12_1', 'Image Editing & Image Manipulation', '# Image Editing & Image Manipulation untuk DKV Kelas 12

## A. Pencahayaan (Lighting)

Pencahayaan adalah fondasi utama dalam image editing. Tanpa pencahayaan yang tepat, seluruh elemen visual lainnya (warna, kontras, komposisi) tidak akan terlihat optimal.

### Jenis Pencahayaan dalam Editing
- **Exposure**: Mengatur seberapa terang atau gelap keseluruhan foto. Exposure +1 = 2x lebih terang, -1 = 2x lebih gelap.
- **Highlights**: Mengatur area paling terang (langit, refleksi). Turunkan untuk recover detail yang terbakar (blown out).
- **Shadows**: Mengatur area paling gelap. Naikkan untuk membuka detail yang hilang di bayangan.
- **Whites**: Mengatur titik putih paling murni. Berbeda dari highlights — whites mengatur ujung (endpoint) histogram.
- **Blacks**: Mengatur titik hitam paling dalam. Turunkan untuk menambah "punch" kontras.

![Contoh exposure adjustment](https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400)

### White Balance
- **Temperature**: Hangat (kuning/oranye) vs Dingin (biru). Diukur dalam Kelvin.
- **Tint**: Magenta (merah-ungu) vs Green (hijau). Untuk koreksi lampu neon/LED.

## B. Komposisi dalam Editing

Komposisi membimbing mata penonton melalui foto. Dalam editing, kita bisa memperkuat atau mengoreksi komposisi melalui cropping dan transformasi.

### 1. Rule of Thirds
Bagi frame menjadi 9 kotak (3x3). Subjek utama diletakkan di titik temu (power points). Memberikan keseimbangan dinamis.

### 2. Diagonal
Garis diagonal menciptakan ketegangan dan gerakan. Subjek diletakkan sepanjang garis diagonal untuk efek dinamis.

### 3. Simetris (Symmetry)
Subjek di tengah, elemen kiri-kanan saling cermin. Memberikan kesan formal, seimbang, dan tenang.

### 4. Central
Subjek tepat di tengah frame. Berbeda dari simetri — central tidak butuh elemen kiri-kanan yang sama. Efektif untuk portrait dan close-up.

### 5. Pyramid (Segitiga)
Subjek disusun membentuk segitiga. Base lebar di bawah, puncak sempit di atas. Memberikan kesan stabil dan monumental.

### 6. Leading Line
Garis (jalan, rel, sungai) memandu mata dari tepi foto menuju subjek utama. Menciptakan kedalaman dan fokus.

## C. Warna (Color)

### Hue
Hue adalah nama warna (merah, biru, hijau). Dalam editing, hue shift mengubah warna ke arah lain di color wheel.

### Saturation
Saturation adalah intensitas warna. Saturation 0 = grayscale. Saturation tinggi = warna sangat pekat. Berlebihan = terlihat tidak natural.

### Vibrance vs Saturation
- **Saturation**: naikkan SEMUA warna secara merata (bisa merusak skin tone)
- **Vibrance**: naikkan hanya warna yang kurang pekat (lebih natural, protect skin tone)

### Color Grading
- **Shadows tint**: beri warna ke area gelap (mis: teal/biru untuk cinematic look)
- **Highlights tint**: beri warna ke area terang (mis: oranye untuk warm look)
- Kombinasi teal-orange = classic Hollywood cinematic look

## D. Kontras

Kontras adalah perbedaan antara area terang dan gelap.

- **Contrast global**: memperlebar jarak antara terang dan gelap di seluruh foto
- **Contrast lokal**: memperlebar kontras hanya di area tertentu (mis: texture detail)
- **Clarity**: kontras lokal di midtones — menambah "punch" dan detail tekstur
- **Dehaze**: mengurangi/menambah kabut — effective untuk foto landscape berkabut

Kontras tinggi = dramatis, tegas, punchy. Kontras rendah = lembut, flat, dreamy.

## E. Noise & Blur

### Noise
Noise = titik-titik acak yang muncul di foto (seperti grain film). Sering muncul di:
- ISO tinggi (low light)
- Shadow yang di-buka terlalu banyak (shadow recovery)

Jenis noise:
- **Luminance noise**: titik hitam-putih (seperti film grain) — lebih natural
- **Color noise**: titik warna acak (merah/hijau/biru) — tidak natural, harus dihilangkan

### Noise Reduction
- **Luminance**: turunkan untuk haluskan grain (tapi terlalu banyak = plastik/waxy)
- **Color**: turunkan untuk hilangkan color noise (aman untuk naikkan tinggi)

### Blur (Bokeh & Motion)
- **Bokeh**: background kabur karena aperture besar (f/1.4-f/2.8). Quality bokeh = creamy, smooth
- **Motion blur**: blur karena gerakan subjek atau kamera. Bisa intentional (panning) atau unwanted (shake)
- **Lens blur**: blur akibat lensa (chromatic aberration, vignetting)

### Sharpening (Kebalikan Blur)
- **Amount**: seberapa tajam (0-150)
- **Radius**: lebar edge detection (0.5-3 pixel)
- **Detail**: seberapa banyak detail kecil yang diperkuat
- **Masking**: batas area yang di-sharpen (0 = semua, 100 = hanya edge tegas)

## Latihan Self-Assessment

Ambil 1 foto Anda. Lakukan editing berurutan:
1. Koreksi exposure (highlights + shadows)
2. White balance (temperature + tint)
3. Kontras (contrast + clarity)
4. Warna (vibrance + saturation)
5. Noise reduction (jika perlu)
6. Sharpening (amount + masking)
7. Crop untuk perkuat komposisi
Bandingkan before-after. Apakah foto terlihat lebih baik? Mengapa?
', 'Mata Pelajaran Kejuruan', '12DKV', 'SMK', 'Image Editing', 'cp_kej_12_1', 'tp_kej_12_1_1', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;


-- PG #001
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_001', '12DKV', 'Mata Pelajaran Kejuruan', '**Andi** mengambil foto landscape saat matahari terbenam. Foto terlalu gelap di area foreground. Pengaturan yang TEPAT untuk memperbaiki:', 'Naikkan Exposure secara merata', 'Naikkan Shadows untuk buka detail foreground', 'Turunkan Highlights', 'Naikkan Contrast', 1, 'Shadows membuka detail area gelap tanpa menyilaukan area terang', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #002
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_002', '12DKV', 'Mata Pelajaran Kejuruan', '**Hadi** memotret gunung. Ia ingin gunung tampak dominan. Komposisi yang tepat:', 'Rule of Thirds — horison di 1/3 atas', 'Rule of Thirds — horison di 1/3 bawah, gunung 2/3', 'Central — gunung di tengah', 'Diagonal', 1, 'Horison di 1/3 atas = langit dominan. 1/3 bawah = darat/gunung dominan', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #003
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_003', '12DKV', 'Mata Pelajaran Kejuruan', '**Maman** naikkan saturation +100. Skin tone siswanya terlihat oranye. Kesalahan:', 'Harusnya naikkan vibrance, bukan saturation', 'Harusnya turunkan exposure', 'Harusnya naikkan contrast', 'Harusnya naikkan clarity', 0, 'Saturation naikkan SEMUA warna termasuk skin. Vibrance protect skin tone', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #004
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_004', '12DKV', 'Mata Pelajaran Kejuruan', '**Rina** foto flat dan kurang ''punch''. Pengaturan untuk menambah detail tekstur:', 'Clarity', 'Exposure', 'Saturation', 'Temperature', 0, 'Clarity = kontras lokal di midtones, menambah punch dan tekstur', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #005
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_005', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto malam **Vera** punya titik warna acak (merah/hijau/biru). Ini disebut:', 'Luminance noise', 'Color noise', 'Hot pixel', 'Chromatic aberration', 1, 'Color noise = titik warna acak, sering muncul saat shadow recovery', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #006
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_006', '12DKV', 'Mata Pelajaran Kejuruan', '**Siti** foto produk makanan. Background putih terlihat terbakar (blown out). Solusi edit yang tepat:', 'Naikkan Whites', 'Turunkan Highlights untuk recover detail', 'Naikkan Exposure', 'Turunkan Shadows', 1, 'Highlights mengontrol area paling terang — turunkan untuk recover detail yang blown out', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #007
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_007', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto pasar **Ira** terlihat berantakan. Solusi komposisi via cropping:', 'Crop tighter + leading lines ke 1 subjek', 'Crop lebih lebar', 'Tambah elemen lain', 'Pakai central composition', 0, 'Crop tighter + leading lines mengurangi clutter dan memandu mata ke subjek', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #008
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_008', '12DKV', 'Mata Pelajaran Kejuruan', 'Apa beda Hue dan Saturation?', 'Sama', 'Hue = nama warna, Saturation = intensitas warna', 'Hue = terang, Saturation = gelap', 'Hue = kontras, Saturation = blur', 1, 'Hue = posisi di color wheel (merah/biru). Saturation = seberapa pekat', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #009
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_009', '12DKV', 'Mata Pelajaran Kejuruan', 'Clarity berlebihan (+100) menyebabkan:', 'Halus dan natural', 'Halos di sekitar edge, over-processed look', 'Lebih terang', 'Lebih tajam', 1, 'Clarity +100 = halos/glow di sekitar edge, terlihat tidak natural', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #010
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_010', '12DKV', 'Mata Pelajaran Kejuruan', 'Cara menghilangkan color noise:', 'Naikkan luminance NR', 'Naikkan color noise reduction', 'Naikkan sharpening', 'Naikkan contrast', 1, 'Color noise reduction khusus untuk hilangkan color noise', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #011
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_011', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto outdoor **Budi** terlihat terlalu kuning karena lampu jalan. Koreksi yang tepat:', 'Turunkan Temperature (lebih biru)', 'Naikkan Temperature (lebih kuning)', 'Naikkan Tint', 'Turunkan Exposure', 0, 'Lampu jalan = warm/kuning. Turunkan temperature untuk kompensasi (tambah biru)', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #012
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_012', '12DKV', 'Mata Pelajaran Kejuruan', '**Joko** foto jembatan. Garis jembatan menyempit ke kejauhan. Komposisi yang otomatis terbentuk:', 'Symmetry', 'Leading lines', 'Central', 'Pyramid', 1, 'Garis yang menyempit = leading lines, memandu mata ke vanishing point', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #013
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_013', '12DKV', 'Mata Pelajaran Kejuruan', 'Cinematic teal-orange look dicapai dengan:', 'Shadows tint biru + Highlights tint oranye', 'Naikkan saturation', 'Turunkan contrast', 'Naikkan temperature', 0, 'Teal shadows + orange highlights = classic Hollywood look', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #014
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_014', '12DKV', 'Mata Pelajaran Kejuruan', '**Santi** foto landscape berkabut. Fitur untuk mengurangi kabut:', 'Dehaze', 'Clarity', 'Sharpening', 'Vibrance', 0, 'Dehaze = mengurangi/menambah kabut, effective untuk landscape', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #015
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_015', '12DKV', 'Mata Pelajaran Kejuruan', 'Luminance noise reduction berlebihan menyebabkan:', 'Foto lebih tajam', 'Foto terlihat plastik/waxy', 'Foto lebih kontras', 'Foto lebih terang', 1, 'Luminance NR berlebihan = hilang detail tekstur, terlihat plastik', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #016
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_016', '12DKV', 'Mata Pelajaran Kejuruan', '**Dina** membuka shadow foto malamnya +100. Hasilnya muncul titik warna acak. Apa itu dan cara fix?', 'Luminance noise — naikkan luminance NR', 'Color noise — naikkan color noise reduction', 'Hot pixel — ganti sensor', 'Chromatic aberration — enable lens correction', 1, 'Buka shadow ekstrem = muncul color noise. Fix: color noise reduction', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #017
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_017', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi pyramid (segitiga) memberikan kesan:', 'Dinamis dan energetik', 'Stabil dan monumental', 'Kacau', 'Intim', 1, 'Base lebar + puncak sempit = stabil, kokoh, monumental', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #018
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_018', '12DKV', 'Mata Pelajaran Kejuruan', '**Nina** foto B&W. Elemen yang PALING penting:', 'Saturation', 'Kontras tonal + tekstur + shape', 'Hue', 'Vibrance', 1, 'B&W tidak ada warna → fokus kontras tonal, tekstur, shape', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #019
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_019', '12DKV', 'Mata Pelajaran Kejuruan', 'Kontras tinggi cocok untuk foto:', 'Portrait lembut', 'Dramatis, tegas, punchy', 'Minimalis flat', 'Dreamy soft', 1, 'Kontras tinggi = dramatis, tegas, punchy', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #020
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_020', '12DKV', 'Mata Pelajaran Kejuruan', '**Wati** foto dengan aperture f/1.4. Background kabur halus. Ini disebut:', 'Motion blur', 'Bokeh', 'Lens flare', 'Chromatic aberration', 1, 'Aperture besar = shallow DOF = background kabur (bokeh)', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #021
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_021', '12DKV', 'Mata Pelajaran Kejuruan', '**Eka** ingin foto portrait-nya terlihat cinematic dengan area gelap kebiruan. Fitur yang dipakai:', 'Color grading → Shadows tint: biru/teal', 'Naikkan Temperature', 'Naikkan Saturation', 'Turunkan Contrast', 0, 'Color grading shadows tint biru/teal = classic cinematic look', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #022
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_022', '12DKV', 'Mata Pelajaran Kejuruan', '**Kiki** foto siluet orang di sunset. Subjek di tengah, langit simetris. Komposisi ini:', 'Diagonal', 'Symmetry', 'Rule of Thirds', 'Leading lines', 1, 'Subjek di tengah + elemen kiri-kanan saling cermin = symmetry', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #023
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_023', '12DKV', 'Mata Pelajaran Kejuruan', 'Vibrance berbeda dari Saturation karena:', 'Vibrance protect skin tone', 'Saturation lebih kuat', 'Vibrance hanya untuk warm colors', 'Tidak ada beda', 0, 'Vibrance naikkan hanya warna kurang pekat, protect skin tone', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #024
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_024', '12DKV', 'Mata Pelajaran Kejuruan', '**Tono** ingin foto portrait-nya lembut dan dreamy. Pengaturan:', 'Turunkan contrast + turunkan clarity', 'Naikkan contrast +100', 'Naikkan clarity +100', 'Naikkan dehaze', 0, 'Low contrast + low clarity = soft, flat, dreamy', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #025
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_025', '12DKV', 'Mata Pelajaran Kejuruan', 'Sharpening Amount +100 dengan Masking 0 menyebabkan:', 'Foto lebih halus', 'Noise juga di-sharpen (lebih terlihat)', 'Foto lebih gelap', 'Foto lebih terang', 1, 'Masking 0 = sharpen SEMUA termasuk noise. Masking tinggi = hanya edge', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #026
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_026', '12DKV', 'Mata Pelajaran Kejuruan', 'Apa beda Whites dan Highlights?', 'Sama saja', 'Whites = titik endpoint histogram, Highlights = area terang secara umum', 'Whites = area gelap, Highlights = area terang', 'Whites = kontras, Highlights = exposure', 1, 'Whites mengatur ujung histogram (titik putih murni), Highlights area terang secara umum', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #027
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_027', '12DKV', 'Mata Pelajaran Kejuruan', 'Apa beda Central dan Symmetry?', 'Sama saja', 'Central = subjek di tengah, Symmetry = kiri-kanan sama', 'Central = horizontal, Symmetry = vertikal', 'Tidak ada beda', 1, 'Central = subjek di tengah (tidak butuh elemen kiri-kanan sama). Symmetry = kiri-kanan cermin', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #028
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_028', '12DKV', 'Mata Pelajaran Kejuruan', '**Omar** foto landscape. Rumput hijau terlihat pucat. Cara memperkuat:', 'Naikkan vibrance hijau saja', 'Naikkan exposure', 'Turunkan contrast', 'Naikkan temperature', 0, 'Vibrance hijau atau HSL green saturation — lebih presisi dari global saturation', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #029
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_029', '12DKV', 'Mata Pelajaran Kejuruan', '**Rina** foto flat dan kurang ''punch''. Pengaturan untuk menambah detail tekstur:', 'Clarity', 'Exposure', 'Saturation', 'Temperature', 0, 'Clarity = kontras lokal di midtones, menambah punch dan tekstur', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #030
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_030', '12DKV', 'Mata Pelajaran Kejuruan', '**Yusuf** foto olahraga. Subjek kabur karena gerakan. Ini:', 'Bokeh', 'Motion blur', 'Lens blur', 'Defocus', 1, 'Motion blur = blur akibat gerakan subjek/kamera', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #031
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_031', '12DKV', 'Mata Pelajaran Kejuruan', '**Fajar** foto backlit. Subjek gelap, background terang. Solusi editing:', 'Naikkan Shadows + turunkan Highlights', 'Naikkan Exposure saja', 'Turunkan Contrast', 'Naikkan Saturation', 0, 'HDR-like: naikkan shadows (buka subjek) + turunkan highlights (tame background)', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #032
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_032', '12DKV', 'Mata Pelajaran Kejuruan', '**Lia** ingin foto produk terlihat formal dan seimbang. Komposisi:', 'Diagonal', 'Symmetry', 'Rule of Thirds', 'Leading lines', 1, 'Symmetry = formal, seimbang, rapi — cocok untuk produk', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #033
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_033', '12DKV', 'Mata Pelajaran Kejuruan', 'Color grading pada highlights untuk warm look:', 'Tint oranye/kuning', 'Tint biru/teal', 'Tint hijau', 'Tint ungu', 0, 'Warm = oranye/kuning. Highlights tint warm = sunset/golden hour look', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #034
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_034', '12DKV', 'Mata Pelajaran Kejuruan', 'Clarity berlebihan (+100) menyebabkan:', 'Halus dan natural', 'Halos di sekitar edge, over-processed look', 'Lebih terang', 'Lebih tajam', 1, 'Clarity +100 = halos/glow di sekitar edge, terlihat tidak natural', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #035
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_035', '12DKV', 'Mata Pelajaran Kejuruan', 'Chromatic aberration muncul sebagai:', 'Titik acak', 'Fringe warna di edge kontras tinggi', 'Vignette gelap', 'Distorsi lensa', 1, 'CA = fringe biru-ungu/merah-hijau di edge kontras tinggi', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #036
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_036', '12DKV', 'Mata Pelajaran Kejuruan', 'White balance auto pada foto indoor **Gita** menghasilkan warna kehijauan. Koreksi:', 'Naikkan Tint (arah magenta)', 'Turunkan Tint (arah green)', 'Naikkan Temperature', 'Turunkan Exposure', 0, 'Kehijauan = too much green. Naikkan tint ke arah magenta untuk kompensasi', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #037
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_037', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi diagonal cocok untuk foto yang ingin terlihat:', 'Tenang dan damai', 'Dinamis dan bergerak', 'Formal', 'Minimalis', 1, 'Diagonal = ketegangan, gerakan, dinamis', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #038
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_038', '12DKV', 'Mata Pelajaran Kejuruan', '**Maman** naikkan saturation +100. Skin tone siswanya terlihat oranye. Kesalahan:', 'Harusnya naikkan vibrance, bukan saturation', 'Harusnya turunkan exposure', 'Harusnya naikkan contrast', 'Harusnya naikkan clarity', 0, 'Saturation naikkan SEMUA warna termasuk skin. Vibrance protect skin tone', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #039
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_039', '12DKV', 'Mata Pelajaran Kejuruan', '**Santi** foto landscape berkabut. Fitur untuk mengurangi kabut:', 'Dehaze', 'Clarity', 'Sharpening', 'Vibrance', 0, 'Dehaze = mengurangi/menambah kabut, effective untuk landscape', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #040
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_040', '12DKV', 'Mata Pelajaran Kejuruan', 'Noise paling sering muncul di:', 'Area terang', 'Area gelap (shadow) yang di-buka', 'Midtone', 'Highlight', 1, 'Shadow yang di-buka = amplify noise yang awalnya tersembunyi', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #041
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_041', '12DKV', 'Mata Pelajaran Kejuruan', '**Andi** mengambil foto landscape saat matahari terbenam. Foto terlalu gelap di area foreground. Pengaturan yang TEPAT untuk memperbaiki:', 'Naikkan Exposure secara merata', 'Naikkan Shadows untuk buka detail foreground', 'Turunkan Highlights', 'Naikkan Contrast', 1, 'Shadows membuka detail area gelap tanpa menyilaukan area terang', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #042
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_042', '12DKV', 'Mata Pelajaran Kejuruan', '**Hadi** memotret gunung. Ia ingin gunung tampak dominan. Komposisi yang tepat:', 'Rule of Thirds — horison di 1/3 atas', 'Rule of Thirds — horison di 1/3 bawah, gunung 2/3', 'Central — gunung di tengah', 'Diagonal', 1, 'Horison di 1/3 atas = langit dominan. 1/3 bawah = darat/gunung dominan', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #043
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_043', '12DKV', 'Mata Pelajaran Kejuruan', 'Apa beda Hue dan Saturation?', 'Sama', 'Hue = nama warna, Saturation = intensitas warna', 'Hue = terang, Saturation = gelap', 'Hue = kontras, Saturation = blur', 1, 'Hue = posisi di color wheel (merah/biru). Saturation = seberapa pekat', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #044
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_044', '12DKV', 'Mata Pelajaran Kejuruan', 'Kontras tinggi cocok untuk foto:', 'Portrait lembut', 'Dramatis, tegas, punchy', 'Minimalis flat', 'Dreamy soft', 1, 'Kontras tinggi = dramatis, tegas, punchy', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #045
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_045', '12DKV', 'Mata Pelajaran Kejuruan', '**Zahra** ingin sharpen foto tanpa menambah noise. Pengaturan:', 'Amount tinggi + Masking 0', 'Amount sedang + Masking tinggi (60-80)', 'Amount 0', 'Radius maksimal', 1, 'Masking tinggi = hanya sharpen edge tegas, skip noise di area halus', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #046
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_046', '12DKV', 'Mata Pelajaran Kejuruan', '**Siti** foto produk makanan. Background putih terlihat terbakar (blown out). Solusi edit yang tepat:', 'Naikkan Whites', 'Turunkan Highlights untuk recover detail', 'Naikkan Exposure', 'Turunkan Shadows', 1, 'Highlights mengontrol area paling terang — turunkan untuk recover detail yang blown out', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #047
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_047', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto pasar **Ira** terlihat berantakan. Solusi komposisi via cropping:', 'Crop tighter + leading lines ke 1 subjek', 'Crop lebih lebar', 'Tambah elemen lain', 'Pakai central composition', 0, 'Crop tighter + leading lines mengurangi clutter dan memandu mata ke subjek', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #048
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_048', '12DKV', 'Mata Pelajaran Kejuruan', 'Cinematic teal-orange look dicapai dengan:', 'Shadows tint biru + Highlights tint oranye', 'Naikkan saturation', 'Turunkan contrast', 'Naikkan temperature', 0, 'Teal shadows + orange highlights = classic Hollywood look', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #049
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_049', '12DKV', 'Mata Pelajaran Kejuruan', '**Tono** ingin foto portrait-nya lembut dan dreamy. Pengaturan:', 'Turunkan contrast + turunkan clarity', 'Naikkan contrast +100', 'Naikkan clarity +100', 'Naikkan dehaze', 0, 'Low contrast + low clarity = soft, flat, dreamy', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #050
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_050', '12DKV', 'Mata Pelajaran Kejuruan', 'Bokeh yang berkualitas ditandai dengan:', 'Bentuk hexagon tajam', 'Creamy, smooth, halus', 'Berkabut', 'Berwarna', 1, 'Quality bokeh = creamy, smooth, tidak distract dari subjek', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #051
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_051', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto outdoor **Budi** terlihat terlalu kuning karena lampu jalan. Koreksi yang tepat:', 'Turunkan Temperature (lebih biru)', 'Naikkan Temperature (lebih kuning)', 'Naikkan Tint', 'Turunkan Exposure', 0, 'Lampu jalan = warm/kuning. Turunkan temperature untuk kompensasi (tambah biru)', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #052
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_052', '12DKV', 'Mata Pelajaran Kejuruan', '**Joko** foto jembatan. Garis jembatan menyempit ke kejauhan. Komposisi yang otomatis terbentuk:', 'Symmetry', 'Leading lines', 'Central', 'Pyramid', 1, 'Garis yang menyempit = leading lines, memandu mata ke vanishing point', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #053
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_053', '12DKV', 'Mata Pelajaran Kejuruan', '**Nina** foto B&W. Elemen yang PALING penting:', 'Saturation', 'Kontras tonal + tekstur + shape', 'Hue', 'Vibrance', 1, 'B&W tidak ada warna → fokus kontras tonal, tekstur, shape', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #054
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_054', '12DKV', 'Mata Pelajaran Kejuruan', '**Rina** foto flat dan kurang ''punch''. Pengaturan untuk menambah detail tekstur:', 'Clarity', 'Exposure', 'Saturation', 'Temperature', 0, 'Clarity = kontras lokal di midtones, menambah punch dan tekstur', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #055
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_055', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto malam **Vera** punya titik warna acak (merah/hijau/biru). Ini disebut:', 'Luminance noise', 'Color noise', 'Hot pixel', 'Chromatic aberration', 1, 'Color noise = titik warna acak, sering muncul saat shadow recovery', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #056
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_056', '12DKV', 'Mata Pelajaran Kejuruan', '**Dina** membuka shadow foto malamnya +100. Hasilnya muncul titik warna acak. Apa itu dan cara fix?', 'Luminance noise — naikkan luminance NR', 'Color noise — naikkan color noise reduction', 'Hot pixel — ganti sensor', 'Chromatic aberration — enable lens correction', 1, 'Buka shadow ekstrem = muncul color noise. Fix: color noise reduction', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #057
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_057', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi pyramid (segitiga) memberikan kesan:', 'Dinamis dan energetik', 'Stabil dan monumental', 'Kacau', 'Intim', 1, 'Base lebar + puncak sempit = stabil, kokoh, monumental', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #058
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_058', '12DKV', 'Mata Pelajaran Kejuruan', 'Vibrance berbeda dari Saturation karena:', 'Vibrance protect skin tone', 'Saturation lebih kuat', 'Vibrance hanya untuk warm colors', 'Tidak ada beda', 0, 'Vibrance naikkan hanya warna kurang pekat, protect skin tone', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #059
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_059', '12DKV', 'Mata Pelajaran Kejuruan', 'Clarity berlebihan (+100) menyebabkan:', 'Halus dan natural', 'Halos di sekitar edge, over-processed look', 'Lebih terang', 'Lebih tajam', 1, 'Clarity +100 = halos/glow di sekitar edge, terlihat tidak natural', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #060
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_060', '12DKV', 'Mata Pelajaran Kejuruan', 'Cara menghilangkan color noise:', 'Naikkan luminance NR', 'Naikkan color noise reduction', 'Naikkan sharpening', 'Naikkan contrast', 1, 'Color noise reduction khusus untuk hilangkan color noise', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #061
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_061', '12DKV', 'Mata Pelajaran Kejuruan', '**Eka** ingin foto portrait-nya terlihat cinematic dengan area gelap kebiruan. Fitur yang dipakai:', 'Color grading → Shadows tint: biru/teal', 'Naikkan Temperature', 'Naikkan Saturation', 'Turunkan Contrast', 0, 'Color grading shadows tint biru/teal = classic cinematic look', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #062
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_062', '12DKV', 'Mata Pelajaran Kejuruan', '**Kiki** foto siluet orang di sunset. Subjek di tengah, langit simetris. Komposisi ini:', 'Diagonal', 'Symmetry', 'Rule of Thirds', 'Leading lines', 1, 'Subjek di tengah + elemen kiri-kanan saling cermin = symmetry', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #063
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_063', '12DKV', 'Mata Pelajaran Kejuruan', '**Omar** foto landscape. Rumput hijau terlihat pucat. Cara memperkuat:', 'Naikkan vibrance hijau saja', 'Naikkan exposure', 'Turunkan contrast', 'Naikkan temperature', 0, 'Vibrance hijau atau HSL green saturation — lebih presisi dari global saturation', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #064
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_064', '12DKV', 'Mata Pelajaran Kejuruan', '**Santi** foto landscape berkabut. Fitur untuk mengurangi kabut:', 'Dehaze', 'Clarity', 'Sharpening', 'Vibrance', 0, 'Dehaze = mengurangi/menambah kabut, effective untuk landscape', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #065
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_065', '12DKV', 'Mata Pelajaran Kejuruan', 'Luminance noise reduction berlebihan menyebabkan:', 'Foto lebih tajam', 'Foto terlihat plastik/waxy', 'Foto lebih kontras', 'Foto lebih terang', 1, 'Luminance NR berlebihan = hilang detail tekstur, terlihat plastik', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #066
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_066', '12DKV', 'Mata Pelajaran Kejuruan', 'Apa beda Whites dan Highlights?', 'Sama saja', 'Whites = titik endpoint histogram, Highlights = area terang secara umum', 'Whites = area gelap, Highlights = area terang', 'Whites = kontras, Highlights = exposure', 1, 'Whites mengatur ujung histogram (titik putih murni), Highlights area terang secara umum', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #067
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_067', '12DKV', 'Mata Pelajaran Kejuruan', 'Apa beda Central dan Symmetry?', 'Sama saja', 'Central = subjek di tengah, Symmetry = kiri-kanan sama', 'Central = horizontal, Symmetry = vertikal', 'Tidak ada beda', 1, 'Central = subjek di tengah (tidak butuh elemen kiri-kanan sama). Symmetry = kiri-kanan cermin', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #068
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_068', '12DKV', 'Mata Pelajaran Kejuruan', 'Color grading pada highlights untuk warm look:', 'Tint oranye/kuning', 'Tint biru/teal', 'Tint hijau', 'Tint ungu', 0, 'Warm = oranye/kuning. Highlights tint warm = sunset/golden hour look', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #069
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_069', '12DKV', 'Mata Pelajaran Kejuruan', 'Kontras tinggi cocok untuk foto:', 'Portrait lembut', 'Dramatis, tegas, punchy', 'Minimalis flat', 'Dreamy soft', 1, 'Kontras tinggi = dramatis, tegas, punchy', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #070
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_070', '12DKV', 'Mata Pelajaran Kejuruan', '**Wati** foto dengan aperture f/1.4. Background kabur halus. Ini disebut:', 'Motion blur', 'Bokeh', 'Lens flare', 'Chromatic aberration', 1, 'Aperture besar = shallow DOF = background kabur (bokeh)', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #071
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_071', '12DKV', 'Mata Pelajaran Kejuruan', '**Fajar** foto backlit. Subjek gelap, background terang. Solusi editing:', 'Naikkan Shadows + turunkan Highlights', 'Naikkan Exposure saja', 'Turunkan Contrast', 'Naikkan Saturation', 0, 'HDR-like: naikkan shadows (buka subjek) + turunkan highlights (tame background)', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #072
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_072', '12DKV', 'Mata Pelajaran Kejuruan', '**Lia** ingin foto produk terlihat formal dan seimbang. Komposisi:', 'Diagonal', 'Symmetry', 'Rule of Thirds', 'Leading lines', 1, 'Symmetry = formal, seimbang, rapi — cocok untuk produk', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #073
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_073', '12DKV', 'Mata Pelajaran Kejuruan', '**Maman** naikkan saturation +100. Skin tone siswanya terlihat oranye. Kesalahan:', 'Harusnya naikkan vibrance, bukan saturation', 'Harusnya turunkan exposure', 'Harusnya naikkan contrast', 'Harusnya naikkan clarity', 0, 'Saturation naikkan SEMUA warna termasuk skin. Vibrance protect skin tone', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #074
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_074', '12DKV', 'Mata Pelajaran Kejuruan', '**Tono** ingin foto portrait-nya lembut dan dreamy. Pengaturan:', 'Turunkan contrast + turunkan clarity', 'Naikkan contrast +100', 'Naikkan clarity +100', 'Naikkan dehaze', 0, 'Low contrast + low clarity = soft, flat, dreamy', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #075
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_075', '12DKV', 'Mata Pelajaran Kejuruan', 'Sharpening Amount +100 dengan Masking 0 menyebabkan:', 'Foto lebih halus', 'Noise juga di-sharpen (lebih terlihat)', 'Foto lebih gelap', 'Foto lebih terang', 1, 'Masking 0 = sharpen SEMUA termasuk noise. Masking tinggi = hanya edge', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #076
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_076', '12DKV', 'Mata Pelajaran Kejuruan', 'White balance auto pada foto indoor **Gita** menghasilkan warna kehijauan. Koreksi:', 'Naikkan Tint (arah magenta)', 'Turunkan Tint (arah green)', 'Naikkan Temperature', 'Turunkan Exposure', 0, 'Kehijauan = too much green. Naikkan tint ke arah magenta untuk kompensasi', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #077
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_077', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi diagonal cocok untuk foto yang ingin terlihat:', 'Tenang dan damai', 'Dinamis dan bergerak', 'Formal', 'Minimalis', 1, 'Diagonal = ketegangan, gerakan, dinamis', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #078
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_078', '12DKV', 'Mata Pelajaran Kejuruan', 'Apa beda Hue dan Saturation?', 'Sama', 'Hue = nama warna, Saturation = intensitas warna', 'Hue = terang, Saturation = gelap', 'Hue = kontras, Saturation = blur', 1, 'Hue = posisi di color wheel (merah/biru). Saturation = seberapa pekat', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #079
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_079', '12DKV', 'Mata Pelajaran Kejuruan', '**Rina** foto flat dan kurang ''punch''. Pengaturan untuk menambah detail tekstur:', 'Clarity', 'Exposure', 'Saturation', 'Temperature', 0, 'Clarity = kontras lokal di midtones, menambah punch dan tekstur', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #080
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_080', '12DKV', 'Mata Pelajaran Kejuruan', '**Yusuf** foto olahraga. Subjek kabur karena gerakan. Ini:', 'Bokeh', 'Motion blur', 'Lens blur', 'Defocus', 1, 'Motion blur = blur akibat gerakan subjek/kamera', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #081
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_081', '12DKV', 'Mata Pelajaran Kejuruan', '**Andi** mengambil foto landscape saat matahari terbenam. Foto terlalu gelap di area foreground. Pengaturan yang TEPAT untuk memperbaiki:', 'Naikkan Exposure secara merata', 'Naikkan Shadows untuk buka detail foreground', 'Turunkan Highlights', 'Naikkan Contrast', 1, 'Shadows membuka detail area gelap tanpa menyilaukan area terang', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #082
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_082', '12DKV', 'Mata Pelajaran Kejuruan', '**Hadi** memotret gunung. Ia ingin gunung tampak dominan. Komposisi yang tepat:', 'Rule of Thirds — horison di 1/3 atas', 'Rule of Thirds — horison di 1/3 bawah, gunung 2/3', 'Central — gunung di tengah', 'Diagonal', 1, 'Horison di 1/3 atas = langit dominan. 1/3 bawah = darat/gunung dominan', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #083
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_083', '12DKV', 'Mata Pelajaran Kejuruan', 'Cinematic teal-orange look dicapai dengan:', 'Shadows tint biru + Highlights tint oranye', 'Naikkan saturation', 'Turunkan contrast', 'Naikkan temperature', 0, 'Teal shadows + orange highlights = classic Hollywood look', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #084
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_084', '12DKV', 'Mata Pelajaran Kejuruan', 'Clarity berlebihan (+100) menyebabkan:', 'Halus dan natural', 'Halos di sekitar edge, over-processed look', 'Lebih terang', 'Lebih tajam', 1, 'Clarity +100 = halos/glow di sekitar edge, terlihat tidak natural', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #085
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_085', '12DKV', 'Mata Pelajaran Kejuruan', 'Chromatic aberration muncul sebagai:', 'Titik acak', 'Fringe warna di edge kontras tinggi', 'Vignette gelap', 'Distorsi lensa', 1, 'CA = fringe biru-ungu/merah-hijau di edge kontras tinggi', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #086
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_086', '12DKV', 'Mata Pelajaran Kejuruan', '**Siti** foto produk makanan. Background putih terlihat terbakar (blown out). Solusi edit yang tepat:', 'Naikkan Whites', 'Turunkan Highlights untuk recover detail', 'Naikkan Exposure', 'Turunkan Shadows', 1, 'Highlights mengontrol area paling terang — turunkan untuk recover detail yang blown out', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #087
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_087', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto pasar **Ira** terlihat berantakan. Solusi komposisi via cropping:', 'Crop tighter + leading lines ke 1 subjek', 'Crop lebih lebar', 'Tambah elemen lain', 'Pakai central composition', 0, 'Crop tighter + leading lines mengurangi clutter dan memandu mata ke subjek', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #088
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_088', '12DKV', 'Mata Pelajaran Kejuruan', '**Nina** foto B&W. Elemen yang PALING penting:', 'Saturation', 'Kontras tonal + tekstur + shape', 'Hue', 'Vibrance', 1, 'B&W tidak ada warna → fokus kontras tonal, tekstur, shape', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #089
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_089', '12DKV', 'Mata Pelajaran Kejuruan', '**Santi** foto landscape berkabut. Fitur untuk mengurangi kabut:', 'Dehaze', 'Clarity', 'Sharpening', 'Vibrance', 0, 'Dehaze = mengurangi/menambah kabut, effective untuk landscape', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #090
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_090', '12DKV', 'Mata Pelajaran Kejuruan', 'Noise paling sering muncul di:', 'Area terang', 'Area gelap (shadow) yang di-buka', 'Midtone', 'Highlight', 1, 'Shadow yang di-buka = amplify noise yang awalnya tersembunyi', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #091
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_091', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto outdoor **Budi** terlihat terlalu kuning karena lampu jalan. Koreksi yang tepat:', 'Turunkan Temperature (lebih biru)', 'Naikkan Temperature (lebih kuning)', 'Naikkan Tint', 'Turunkan Exposure', 0, 'Lampu jalan = warm/kuning. Turunkan temperature untuk kompensasi (tambah biru)', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #092
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_092', '12DKV', 'Mata Pelajaran Kejuruan', '**Joko** foto jembatan. Garis jembatan menyempit ke kejauhan. Komposisi yang otomatis terbentuk:', 'Symmetry', 'Leading lines', 'Central', 'Pyramid', 1, 'Garis yang menyempit = leading lines, memandu mata ke vanishing point', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #093
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_093', '12DKV', 'Mata Pelajaran Kejuruan', 'Vibrance berbeda dari Saturation karena:', 'Vibrance protect skin tone', 'Saturation lebih kuat', 'Vibrance hanya untuk warm colors', 'Tidak ada beda', 0, 'Vibrance naikkan hanya warna kurang pekat, protect skin tone', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #094
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_094', '12DKV', 'Mata Pelajaran Kejuruan', 'Kontras tinggi cocok untuk foto:', 'Portrait lembut', 'Dramatis, tegas, punchy', 'Minimalis flat', 'Dreamy soft', 1, 'Kontras tinggi = dramatis, tegas, punchy', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #095
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_095', '12DKV', 'Mata Pelajaran Kejuruan', '**Zahra** ingin sharpen foto tanpa menambah noise. Pengaturan:', 'Amount tinggi + Masking 0', 'Amount sedang + Masking tinggi (60-80)', 'Amount 0', 'Radius maksimal', 1, 'Masking tinggi = hanya sharpen edge tegas, skip noise di area halus', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #096
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_096', '12DKV', 'Mata Pelajaran Kejuruan', '**Dina** membuka shadow foto malamnya +100. Hasilnya muncul titik warna acak. Apa itu dan cara fix?', 'Luminance noise — naikkan luminance NR', 'Color noise — naikkan color noise reduction', 'Hot pixel — ganti sensor', 'Chromatic aberration — enable lens correction', 1, 'Buka shadow ekstrem = muncul color noise. Fix: color noise reduction', 'Pencahayaan', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #097
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_097', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi pyramid (segitiga) memberikan kesan:', 'Dinamis dan energetik', 'Stabil dan monumental', 'Kacau', 'Intim', 1, 'Base lebar + puncak sempit = stabil, kokoh, monumental', 'Komposisi', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #098
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_098', '12DKV', 'Mata Pelajaran Kejuruan', '**Omar** foto landscape. Rumput hijau terlihat pucat. Cara memperkuat:', 'Naikkan vibrance hijau saja', 'Naikkan exposure', 'Turunkan contrast', 'Naikkan temperature', 0, 'Vibrance hijau atau HSL green saturation — lebih presisi dari global saturation', 'Warna', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #099
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_099', '12DKV', 'Mata Pelajaran Kejuruan', '**Tono** ingin foto portrait-nya lembut dan dreamy. Pengaturan:', 'Turunkan contrast + turunkan clarity', 'Naikkan contrast +100', 'Naikkan clarity +100', 'Naikkan dehaze', 0, 'Low contrast + low clarity = soft, flat, dreamy', 'Kontras', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #100
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_pg_100', '12DKV', 'Mata Pelajaran Kejuruan', 'Bokeh yang berkualitas ditandai dengan:', 'Bentuk hexagon tajam', 'Creamy, smooth, halus', 'Berkabut', 'Berwarna', 1, 'Quality bokeh = creamy, smooth, tidak distract dari subjek', 'Noise & Blur', true, 'pilihan_ganda', '[]', '[]', '', '', 'C5', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #001
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_001', '12DKV', 'Mata Pelajaran Kejuruan', 'Mengatur seberapa terang atau gelap keseluruhan foto disebut...', 'kontras', 'saturasi', 'clarity', 'sharpening', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'exposure|eksposur|exposure', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #002
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_002', '12DKV', 'Mata Pelajaran Kejuruan', 'Mengatur area paling terang dalam foto disebut...', 'shadows', 'whites', 'blacks', 'exposure', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'highlights|highlight|highlights', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #003
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_003', '12DKV', 'Mata Pelajaran Kejuruan', 'Mengatur area paling gelap dalam foto disebut...', 'highlights', 'whites', 'blacks', 'exposure', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'shadows|shadow|bayangan|shadows', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #004
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_004', '12DKV', 'Mata Pelajaran Kejuruan', 'Mengatur titik putih paling murni di histogram disebut...', 'highlights', 'shadows', 'blacks', 'exposure', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'whites|putih|whites', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #005
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_005', '12DKV', 'Mata Pelajaran Kejuruan', 'Mengatur titik hitam paling dalam di histogram disebut...', 'whites', 'highlights', 'shadows', 'exposure', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'blacks|hitam|blacks', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #006
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_006', '12DKV', 'Mata Pelajaran Kejuruan', 'Pengaturan suhu warna hangat vs dingin diukur dalam satuan...', 'lux', 'iso', 'fstop', 'candela', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'kelvin|k|kelvin', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #007
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_007', '12DKV', 'Mata Pelajaran Kejuruan', 'Temperature naik = warna lebih... (hangat/dingin)', 'dingin', 'biru', 'hijau', 'ungu', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'hangat|kuning|panas|hangat', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #008
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_008', '12DKV', 'Mata Pelajaran Kejuruan', 'Temperature turun = warna lebih... (hangat/dingin)', 'hangat', 'kuning', 'merah', 'oranye', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'dingin|biru|sejuk|dingin', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #009
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_009', '12DKV', 'Mata Pelajaran Kejuruan', 'Tint ke arah magenta untuk koreksi warna yang terlalu...', 'biru', 'merah', 'kuning', 'ungu', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'hijau|green|hijau', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #010
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_010', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi yang membagi frame jadi 9 kotak (3x3) disebut rule of...', 'half', 'quarter', 'fifth', 'sixth', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'thirds|ketiga|thirds', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #011
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_011', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi yang menggunakan garis miring untuk efek dinamis disebut...', 'horizontal', 'vertikal', 'lengkung', 'zigzag', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'diagonal|miring|diagonal', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #012
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_012', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi dengan kiri-kanan saling cermin disebut...', 'diagonal', 'asimetri', 'central', 'pyramid', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'simetri|simetris|symmetry|simetri', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #013
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_013', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi dengan subjek tepat di tengah frame disebut...', 'diagonal', 'simetri', 'pyramid', 'thirds', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'central|tengah|central', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #014
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_014', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi dengan susunan membentuk segitiga disebut...', 'diagonal', 'central', 'simetri', 'thirds', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'pyramid|segitiga|pyramid', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #015
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_015', '12DKV', 'Mata Pelajaran Kejuruan', 'Garis yang memandu mata ke subjek utama disebut... line', 'horizontal', 'vertikal', 'curved', 'broken', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'leading|pandu|leading', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #016
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_016', '12DKV', 'Mata Pelajaran Kejuruan', 'Nama warna di color wheel disebut...', 'saturation', 'brightness', 'contrast', 'exposure', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'hue|warna|hue', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #017
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_017', '12DKV', 'Mata Pelajaran Kejuruan', 'Intensitas atau kepekatan warna disebut...', 'hue', 'exposure', 'contrast', 'clarity', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'saturasi|saturation|saturasi', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #018
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_018', '12DKV', 'Mata Pelajaran Kejuruan', 'Versi saturation yang protect skin tone disebut...', 'contrast', 'clarity', 'exposure', 'hue', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'vibrance|vibransi|vibrance', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #019
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_019', '12DKV', 'Mata Pelajaran Kejuruan', 'Color grading shadows tint biru + highlights tint oranye = look...', 'vintage', 'noir', 'pastel', 'natural', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'cinematic|teal orange|cinematic', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #020
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_020', '12DKV', 'Mata Pelajaran Kejuruan', 'Kontras lokal di midtones yang menambah punch disebut...', 'contrast', 'dehaze', 'sharpening', 'vibrance', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'clarity|klaritas|clarity', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #021
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_021', '12DKV', 'Mata Pelajaran Kejuruan', 'Fitur untuk mengurangi kabut di foto landscape disebut...', 'clarity', 'contrast', 'sharpening', 'vibrance', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'dehaze|dehaze|dehaze', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #022
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_022', '12DKV', 'Mata Pelajaran Kejuruan', 'Titik acak hitam-putih di foto (seperti film grain) disebut... noise', 'color', 'hot', 'chromatic', 'digital', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'luminance|luminan|luminance', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #023
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_023', '12DKV', 'Mata Pelajaran Kejuruan', 'Titik acak berwarna di foto (merah/hijau/biru) disebut... noise', 'luminance', 'hot', 'chromatic', 'digital', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'color|warna|color', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #024
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_024', '12DKV', 'Mata Pelajaran Kejuruan', 'Background kabur akibat aperture besar disebut...', 'motion blur', 'lens blur', 'defocus', 'tilt', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'bokeh|bokeh|bokeh', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #025
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_025', '12DKV', 'Mata Pelajaran Kejuruan', 'Blur akibat gerakan subjek atau kamera disebut... blur', 'lens', 'bokeh', 'defocus', 'tilt', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'motion|gerak|motion', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #026
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_026', '12DKV', 'Mata Pelajaran Kejuruan', 'Fringe warna di edge kontras tinggi disebut chromatic...', 'noise', 'blur', 'distortion', 'vignette', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'aberasi|aberration|aberasi', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #027
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_027', '12DKV', 'Mata Pelajaran Kejuruan', 'Sharpening hanya di edge tegas menggunakan pengaturan...', 'amount', 'radius', 'detail', 'clarity', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'masking|mask|masking', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #028
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_028', '12DKV', 'Mata Pelajaran Kejuruan', 'Exposure +1 berarti foto... kali lebih terang', '1.5', '3', '10', '5', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', '2|dua|2', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #029
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_029', '12DKV', 'Mata Pelajaran Kejuruan', 'Saturation 0 = foto menjadi...', 'lebih berwarna', 'lebih terang', 'lebih gelap', 'lebih kontras', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'grayscale|hitam putih|grayscale', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #030
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_030', '12DKV', 'Mata Pelajaran Kejuruan', 'Clarity +100 berlebihan menyebabkan... di sekitar edge', 'noise', 'blur', 'shadow', 'highlight', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'halo|halos|halo', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #031
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_031', '12DKV', 'Mata Pelajaran Kejuruan', 'Noise paling sering muncul di area... yang di-buka', 'terang', 'midtone', 'highlight', 'putih', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'gelap|shadow|gelap', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #032
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_032', '12DKV', 'Mata Pelajaran Kejuruan', 'Luminance noise reduction berlebihan membuat foto terlihat...', 'lebih tajam', 'lebih kontras', 'lebih berwarna', 'lebih gelap', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'plastik|waxy|plastik', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #033
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_033', '12DKV', 'Mata Pelajaran Kejuruan', 'White balance auto pada foto indoor kehijauan → naikkan...', 'temperature', 'exposure', 'contrast', 'saturation', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'tint|magenta|tint', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #034
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_034', '12DKV', 'Mata Pelajaran Kejuruan', 'Foto backlit: subjek gelap, background terang → naikkan shadows, turunkan...', 'exposure', 'contrast', 'whites', 'blacks', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'highlights|highlight|highlights', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #035
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_035', '12DKV', 'Mata Pelajaran Kejuruan', 'Aperture f/1.4 menghasilkan depth of field yang...', 'dalam', 'lebar', 'sempit', 'tinggi', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'dangkal|shallow|dangkal', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #036
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_036', '12DKV', 'Mata Pelajaran Kejuruan', 'Aperture f/16 menghasilkan depth of field yang...', 'dangkal', 'shallow', 'tipis', 'rendah', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'dalam|deep|dalam', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #037
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_037', '12DKV', 'Mata Pelajaran Kejuruan', 'Rule of Thirds punya... titik temu (power points)', '2', '3', '6', '9', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', '4|empat|4', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #038
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_038', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi pyramid memberikan kesan... dan monumental', 'dinamis', 'kacau', 'intim', 'lemah', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'stabil|kokoh|stabil', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #039
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_039', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi diagonal memberikan kesan... dan bergerak', 'stabil', 'tenang', 'formal', 'lemah', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'dinamis|energetik|dinamis', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #040
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_040', '12DKV', 'Mata Pelajaran Kejuruan', 'Komposisi symmetry memberikan kesan... dan formal', 'dinamis', 'kacau', 'intim', 'lemah', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'seimbang|stabil|seimbang', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #041
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_041', '12DKV', 'Mata Pelajaran Kejuruan', 'Hue shift mengubah warna ke arah lain di...', 'histogram', 'spectrum', 'gradient', 'palette', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'color wheel|roda warna|color wheel', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #042
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_042', '12DKV', 'Mata Pelajaran Kejuruan', 'Vibrance hanya menaikkan warna yang...', 'sudah pekat', 'terang', 'gelap', 'netral', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'kurang pekat|pucat|kurang pekat', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #043
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_043', '12DKV', 'Mata Pelajaran Kejuruan', 'Kontras rendah menghasilkan foto yang... dan dreamy', 'dramatis', 'tegas', 'punchy', 'kontras', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'lembut|flat|lembut', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #044
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_044', '12DKV', 'Mata Pelajaran Kejuruan', 'Kontras tinggi menghasilkan foto yang... dan punchy', 'lembut', 'flat', 'dreamy', 'pucat', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'dramatis|tegas|dramatis', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #045
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_045', '12DKV', 'Mata Pelajaran Kejuruan', 'Motion blur bisa dihindari dengan... shutter speed', 'lambat', 'panjang', 'rendah', 'lebar', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'cepat|fast|cepat', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #046
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_046', '12DKV', 'Mata Pelajaran Kejuruan', 'Bokeh berkualitas ditandai dengan... dan smooth', 'tajam', 'keras', 'berwarna', 'berkabut', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'creamy|halus|creamy', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #047
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_047', '12DKV', 'Mata Pelajaran Kejuruan', 'Shadow recovery ekstrem menyebabkan munculnya... noise', 'luminance', 'hot', 'digital', 'film', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'color|warna|color', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #048
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_048', '12DKV', 'Mata Pelajaran Kejuruan', 'Sharpening Amount + Masking 0 = noise juga di...', 'haluskan', 'blur', 'hapus', 'kurangi', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'sharpen|perkuat|tajamkan|sharpen', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #049
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_049', '12DKV', 'Mata Pelajaran Kejuruan', 'Dehaze positif (+) mengurangi..., dehaze negatif (-) menambah...', 'kontras', 'noise', 'blur', 'warna', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'kabut|fog|kabut', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #050
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_kej_12_isian_050', '12DKV', 'Mata Pelajaran Kejuruan', 'Chromatic aberration muncul di... kontras tinggi', 'tengah', 'shadow', 'highlight', 'midtone', 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', 'edge|tepi|edge', '', 'C3', '', '', 'cp_kej_12_1', 'tp_kej_12_1_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_kej_12_1_tugas', 'Tugas: Image Editing & Manipulation (100 PG + 50 Isian)', 'Tugas tentang image editing dan manipulation. Mencakup pencahayaan, komposisi, warna, kontras, noise-blur. 100 soal PG HOTS + 50 soal isian. Waktu 120 menit.', 'Mata Pelajaran Kejuruan', '12DKV', 'SMK', true, '2026-10-15T23:59:00+07:00', 'wajib', 150, 'quiz_only', NULL, 'cp_kej_12_1', 'tp_kej_12_1_1', 'luring', '', '2026/2027', 'ganjil', 120, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verifikasi
SELECT "questionType", COUNT(*) FROM "Question" WHERE id LIKE 'q_kej_12_%' GROUP BY "questionType";
-- Expected: pilihan_ganda 100, isian_singkat 50
