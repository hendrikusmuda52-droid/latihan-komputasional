-- Tugas Bab 2.2 DKV 11: Psikologi Sudut Pandang & Harmoni Warna
-- 30 Isian + 20 PGK, duration 60 menit, deadline 5 Okt 2026

-- TP 2.2
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('tp_dkv_pil_11_2_2', 'cp_dkv_pil_11_2', 'TP.DKV.2.2', 'Siswa mampu menerapkan psikologi sudut pandang, garis, dan harmoni warna.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

-- Materi
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_dkv_pil_11_2_2', 'Psikologi Sudut Pandang, Dinamika Garis & Harmoni Warna', '# Psikologi Sudut Pandang, Dinamika Garis & Harmoni Warna dalam Fotografi

## Psikologi Sudut Pandang (Camera Angle)

Sudut pandang kamera menentukan bagaimana penonton mempersepsikan subjek. Setiap sudut mengandung muatan psikologis yang memengaruhi emosi dan interpretasi.

### 1. Sudut Normal (Eye Level)
Kamera sejajar dengan mata subjek. Menghasilkan kesan **netral, objektif, setara**. Penonton merasa berada di posisi yang sama dengan subjek. Cocok untuk dokumenter, wawancara, dan foto formal.

### 2. Sudut Rendah (Low Angle)
Kamera di bawah subjek, menengok ke atas. Subjek terlihat **dominan, kuat, agung, berkuasa**. Sering dipakai untuk tokoh pahlawan, tokoh antagonis yang menakutkan, atau gedung tinggi yang mengesankan.

### 3. Sudut Tinggi (High Angle)
Kamera di atas subjek, menengok ke bawah. Subjek terlihat **lemah, kecil, rentan, tidak berdaya**. Digunakan untuk menunjukkan kerentanan, kesepian, atau kekalahan.

### 4. Sudut Burung (Bird''s Eye / Top Shot)
Kamera tepat di atas subjek, menengok lurus ke bawah. Menghasilkan **pola geometris, abstrak, detasemen emosional**. Penonton merasa seperti Tuhan yang mengamati dari atas.

### 5. Sudut Belanda (Dutch Angle / Tilted)
Kamera dimiringkan dari sumbu horizontal. Menciptakan **ketegangan, ketidaknyamanan, kekacauan, disorientasi**. Sering dipakai dalam thriller horor untuk menunjukkan ketidakstabilan mental atau situasi berbahaya.

## Dinamika Garis dalam Komposisi

Garis adalah elemen visual paling dasar yang memandu mata dan menciptakan struktur dalam foto.

### Jenis Garis dan Efek Psikologis

- **Garis Horizontal**: menenangkan, stabil, damai. Mengingatkan pada horison dan istirahat.
- **Garis Vertikal**: kuat, tegak, agung, formal. Mengingatkan pada tiang dan menara.
- **Garis Diagonal**: dinamis, energetik, bergerak. Menciptakan ketegangan dan arah.
- **Garis Lengkung**: lembut, organik, mengalir. Mengingatkan pada alam dan kelembutan.
- **Garis Zigzag**: kacau, energetik, tidak stabil. Menciptakan kegembiraan atau kecemasan.

### Leading Lines (Garis Pandu)
Garis yang memandu mata penonton dari tepi foto menuju subjek utama. Bisa berupa jalan, rel, sungai, atau deretan pohon. Efektif untuk menciptakan kedalaman dan fokus.

### Converging Lines (Garis Konvergen)
Dua atau lebih garis yang bertemu di satu titik (vanishing point). Menciptakan ilusi kedalaman 3D dan menarik perhatian ke titik temu.

## Harmoni Warna

Harmoni warna adalah kombinasi warna yang menyenangkan secara visual, berdasarkan prinsip teori warna.

### 1. Warna Komplementer
Dua warna berseberangan di color wheel (merah-hijau, biru-oranye, kuning-ungu). Kontras tertinggi, sangat menarik perhatian. Gunakan dengan hati-hati — terlalu banyak bisa silau.

### 2. Warna Analog
Tiga atau lebih warna berdekatan di color wheel (biru-biru-hijau-hijau). Harmonis, tenang, nyaman dipandang. Cocok untuk foto alam dan suasana damai.

### 3. Warna Monokromatik
Variasi tint dan shade dari satu warna. elegan, minimalis, sophisticated. Memberi kesan rapi dan terstruktur.

### 4. Warna Triadik
Tiga warna yang berjarak sama di color wheel (merah-biru-kuning). Seimbang tapi dinamis. Gunakan satu warna dominan dan dua lain sebagai aksen.

### 5. Warna Split-Komplementer
Satu warna dasar + dua warna di samping komplementernya. Kontras tapi lebih lembut dari komplementer murni.

### Suhu Warna
- **Hangat** (merah, oranye, kuning): energetik, passionate, intim, agresif.
- **Dingin** (biru, hijau, ungu): tenang, profesional, jauh, melankolis.

## Latihan Self-Assessment

Amati 3 foto favorit Anda. Identifikasi: (1) sudut pandang yang dipakai dan efek psikologisnya, (2) garis dominan dan arah panduan mata, (3) skema warna dan suhu warna. Diskusikan dengan teman bagaimana ketiga elemen ini bekerja sama menciptakan mood.
', 'Mata Pelajaran Pilihan', '11DKV', 'SMK', 'Psikologi & Warna', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;


-- Isian #001
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_001', '11DKV', 'Mata Pelajaran Pilihan', 'Sudut pandang kamera di bawah subjek, menengok ke atas, membuat subjek terlihat dominan dan kuat disebut sudut...', 'tinggi', 'normal', 'datar', 'samping', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'rendah|bawah|rendah', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #002
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_002', '11DKV', 'Mata Pelajaran Pilihan', 'Sudut pandang kamera di atas subjek, menengok ke bawah, membuat subjek terlihat lemah dan kecil disebut sudut...', 'rendah', 'normal', 'burung', 'samping', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'tinggi|atas|tinggi', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #003
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_003', '11DKV', 'Mata Pelajaran Pilihan', 'Sudut pandang kamera sejajar dengan mata subjek, menghasilkan kesan netral dan objektif disebut sudut...', 'tinggi', 'rendah', 'miring', 'burung', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'normal|eye level|sejajar|normal', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #004
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_004', '11DKV', 'Mata Pelajaran Pilihan', 'Kamera dimiringkan dari sumbu horizontal, menciptakan ketegangan dan disorientasi disebut sudut...', 'normal', 'tinggi', 'rendah', 'datar', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'belanda|miring|tilt|belanda', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #005
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_005', '11DKV', 'Mata Pelajaran Pilihan', 'Sudut pandang tepat di atas subjek, menengok lurus ke bawah, disebut sudut...', 'normal', 'tinggi', 'rendah', 'belanda', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'burung|top shot|bird eye|burung', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #006
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_006', '11DKV', 'Mata Pelajaran Pilihan', 'Garis yang posisinya mendatar, menciptakan kesan tenang dan stabil adalah garis...', 'vertikal', 'diagonal', 'lengkung', 'zigzag', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'horizontal|mendatar|horizontal', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #007
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_007', '11DKV', 'Mata Pelajaran Pilihan', 'Garis yang posisinya tegak lurus, menciptakan kesan kuat dan agung adalah garis...', 'horizontal', 'diagonal', 'lengkung', 'zigzag', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'vertikal|tegak|vertikal', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #008
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_008', '11DKV', 'Mata Pelajaran Pilihan', 'Garis yang miring, menciptakan kesan dinamis dan energetik adalah garis...', 'horizontal', 'vertikal', 'lengkung', 'zigzag', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'diagonal|miring|diagonal', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #009
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_009', '11DKV', 'Mata Pelajaran Pilihan', 'Garis yang melengkung, menciptakan kesan lembut dan organik adalah garis...', 'horizontal', 'vertikal', 'diagonal', 'zigzag', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'lengkung|melengkung|kurva|lengkung', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #010
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_010', '11DKV', 'Mata Pelajaran Pilihan', 'Garis yang memandu mata penonton dari tepi foto menuju subjek utama disebut garis...', 'horizontal', 'vertikal', 'lengkung', 'zigzag', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'pandu|pemandu|leading|pandu', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #011
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_011', '11DKV', 'Mata Pelajaran Pilihan', 'Dua atau lebih garis yang bertemu di satu titik, menciptakan ilusi kedalaman disebut garis...', 'paralel', 'horizontal', 'zigzag', 'lengkung', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'konvergen|bertemu|converging|konvergen', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #012
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_012', '11DKV', 'Mata Pelajaran Pilihan', 'Titik di mana garis konvergen bertemu disebut titik...', 'fokus', 'tengah', 'tepi', 'awal', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'hilang|vanishing|hilang', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #013
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_013', '11DKV', 'Mata Pelajaran Pilihan', 'Dua warna berseberangan di color wheel (misal merah-hijau) disebut warna...', 'analog', 'monokromatik', 'triadik', 'netral', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'komplementer|komplementer|komplementer', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #014
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_014', '11DKV', 'Mata Pelajaran Pilihan', 'Tiga atau lebih warna berdekatan di color wheel disebut warna...', 'komplementer', 'monokromatik', 'triadik', 'netral', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'analog|analog|analog', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #015
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_015', '11DKV', 'Mata Pelajaran Pilihan', 'Variasi tint dan shade dari satu warna disebut warna...', 'analog', 'komplementer', 'triadik', 'netral', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'monokromatik|monokrom|monokromatik', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #016
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_016', '11DKV', 'Mata Pelajaran Pilihan', 'Tiga warna berjarak sama di color wheel disebut warna...', 'analog', 'komplementer', 'monokromatik', 'netral', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'triadik|triad|triadik', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #017
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_017', '11DKV', 'Mata Pelajaran Pilihan', 'Warna merah, oranye, kuning termasuk suhu warna...', 'dingin', 'netral', 'gelap', 'terang', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'hangat|panas|hangat', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #018
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_018', '11DKV', 'Mata Pelajaran Pilihan', 'Warna biru, hijau, ungu termasuk suhu warna...', 'hangat', 'netral', 'gelap', 'terang', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'dingin|sejuk|dingin', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #019
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_019', '11DKV', 'Mata Pelajaran Pilihan', 'Low angle membuat subjek terlihat...', 'lemah', 'kecil', 'tenang', 'netral', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'kuat|dominan|kuat', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #020
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_020', '11DKV', 'Mata Pelajaran Pilihan', 'High angle membuat subjek terlihat...', 'kuat', 'dominan', 'agung', 'netral', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'lemah|kecil|rentan|lemah', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #021
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_021', '11DKV', 'Mata Pelajaran Pilihan', 'Dutch angle menciptakan rasa...', 'tenang', 'damai', 'stabil', 'netral', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'ketegangan|disorientasi|tegang|ketegangan', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #022
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_022', '11DKV', 'Mata Pelajaran Pilihan', 'Garis horizontal menciptakan rasa...', 'dinamis', 'tegang', 'kuat', 'kacau', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'tenang|stabil|damai|tenang', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #023
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_023', '11DKV', 'Mata Pelajaran Pilihan', 'Garis diagonal menciptakan rasa...', 'tenang', 'stabil', 'damai', 'lemah', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'dinamis|energetik|dinamis', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #024
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_024', '11DKV', 'Mata Pelajaran Pilihan', 'Garis vertikal menciptakan rasa...', 'tenang', 'lemah', 'lembut', 'kacau', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'kuat|tegak|agung|kuat', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #025
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_025', '11DKV', 'Mata Pelajaran Pilihan', 'Kombinasi warna komplementer menghasilkan kontras yang...', 'rendah', 'lemah', 'halus', 'lembut', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'tinggi|kuat|maximal|tinggi', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #026
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_026', '11DKV', 'Mata Pelajaran Pilihan', 'Kombinasi warna analog menghasilkan kesan yang...', 'kontras', 'tegang', 'silau', 'kacau', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'harmonis|tenang|nyaman|harmonis', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #027
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_027', '11DKV', 'Mata Pelajaran Pilihan', 'Eye level menghasilkan kesan yang...', 'dominan', 'lemah', 'tegang', 'kacau', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'netral|objektif|setara|netral', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #028
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_028', '11DKV', 'Mata Pelajaran Pilihan', 'Bird''s eye view membuat penonton merasa seperti mengamati dari...', 'bawah', 'samping', 'depan', 'belakang', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'atas|langit|atas', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #029
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_029', '11DKV', 'Mata Pelajaran Pilihan', 'Split-komplementer adalah satu warna dasar ditambah dua warna di samping warna...', 'analog', 'triadik', 'monokromatik', 'netral', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'komplementer|komplementer|komplementer', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #030
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_isian_030', '11DKV', 'Mata Pelajaran Pilihan', 'Garis zigzag menciptakan kesan yang...', 'tenang', 'damai', 'stabil', 'lembut', 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', 'kacau|energetik|tidak stabil|kacau', '', 'C3', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #001
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_001', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA sudut pandang yang membuat subjek terlihat DOMINAN/KUAT:', 'Low angle (sudut rendah)', 'Eye level (sudut normal)', 'High angle (sudut tinggi)', 'Bird''s eye (sudut burung)', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #002
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_002', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA efek psikologis dari DUTCH ANGLE:', 'Ketegangan', 'Disorientasi', 'Kestabilan', 'Kekacauan', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,3]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #003
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_003', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA garis yang menciptakan kesan DINAMIS/ENERGETIK:', 'Garis diagonal', 'Garis horizontal', 'Garis zigzag', 'Garis lengkung', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #004
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_004', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA garis yang menciptakan kesan TENANG/STABIL:', 'Garis horizontal', 'Garis vertikal', 'Garis diagonal', 'Garis lengkung', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #005
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_005', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang termasuk warna KOMPLEMENTER:', 'Merah-hijau', 'Biru-oranye', 'Kuning-ungu', 'Merah-kuning', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #006
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_006', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang termasuk warna HANGAT:', 'Merah', 'Oranye', 'Kuning', 'Biru', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #007
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_007', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang termasuk warna DINGIN:', 'Biru', 'Hijau', 'Ungu', 'Oranye', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #008
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_008', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA efek dari LOW ANGLE:', 'Subjek terlihat kuat', 'Subjek terlihat dominan', 'Subjek terlihat agung', 'Subjek terlihat lemah', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #009
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_009', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA efek dari HIGH ANGLE:', 'Subjek terlihat kecil', 'Subjek terlihat lemah', 'Subjek terlihat rentan', 'Subjek terlihat agung', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #010
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_010', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang termasuk leading lines:', 'Jalan yang menyempit', 'Rel kereta api', 'Garis pantai', 'Langit polos', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #011
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_011', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA kombinasi warna yang HARMONIS:', 'Analog', 'Monokromatik', 'Komplementer (dengan hati-hati)', 'Acak tanpa pola', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #012
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_012', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA ciri warna ANALOG:', 'Berdekatan di color wheel', 'Tenang dan nyaman', 'Kontras tinggi', 'Harmonis', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,3]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #013
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_013', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA ciri warna MONOKROMATIK:', 'Variasi tint dan shade satu warna', 'Elegan dan minimalis', 'Kontras sangat tinggi', 'Rapi dan terstruktur', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,3]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #014
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_014', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang membuat konverging lines efektif:', 'Menciptakan ilusi kedalaman', 'Menarik perhatian ke titik temu', 'Menciptakan ketenangan', 'Memberi kesan 3D', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,3]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #015
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_015', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA situasi yang cocok untuk EYE LEVEL:', 'Wawancara formal', 'Dokumenter', 'Foto paspor', 'Foto horor', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #016
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_016', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA situasi yang cocok untuk LOW ANGLE:', 'Tokoh pahlawan', 'Gedung tinggi', 'Tokoh antagonis menakutkan', 'Anak yang ketakutan', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #017
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_017', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA situasi yang cocok untuk DUTCH ANGLE:', 'Adegan thriller', 'Ketidakstabilan mental', 'Situasi berbahaya', 'Foto wisata formal', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #018
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_018', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA efek garis LENGKUNG:', 'Lembut', 'Organik', 'Mengalir', 'Tegas dan kuat', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #019
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_019', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang termasuk warna TRIADIK:', 'Merah-biru-kuning', 'Tiga warna berjarak sama', 'Satu warna dominan + dua aksen', 'Dua warna berseberangan', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PGK #020
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab22_11dkv_pgk_020', '11DKV', 'Mata Pelajaran Pilihan', 'Pilih SEMUA yang memengaruhi MOOD foto:', 'Sudut pandang kamera', 'Jenis garis dominan', 'Skema warna', 'ISO kamera', 0, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '[0,1,2]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas Bab 2.2
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_dkv_11_2_2_tugas', 'Tugas Bab 2.2: Psikologi Sudut Pandang & Harmoni Warna (30 Isian + 20 PGK)', 'Tugas tentang psikologi sudut pandang, dinamika garis, dan harmoni warna. 30 soal isian + 20 soal PG kompleks. Waktu 60 menit.', 'Mata Pelajaran Pilihan', '11DKV', 'SMK', true, '2026-10-05T23:59:00+07:00', 'wajib', 50, 'quiz_only', NULL, 'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_2', 'luring', '', '2026/2027', 'ganjil', 60, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verifikasi
SELECT "questionType", COUNT(*) FROM "Question" WHERE id LIKE 'q_bab22_11dkv_%' GROUP BY "questionType";
-- Expected: isian_singkat 30, pilihan_ganda_kompleks 20
