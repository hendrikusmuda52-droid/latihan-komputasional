-- Bank Soal Bab 3 + Tugas untuk 11DKV Mata Pelajaran Pilihan
-- Bab 3: Mengoperasikan Kamera DSLR/Mirrorless
-- CP: cp_dkv_pil_11_3 (sudah ada), TP: tp_dkv_pil_11_3_1 (sudah ada)
-- 100 PG (bank) + 50 Isian (bank) + Tugas 75 PG + 20 Isian


-- PG #001
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_001', '11DKV', 'Mata Pelajaran Pilihan', '**Andi** memotret di ruangan gelap. Foto hasilnya terlalu gelap. Ia ingin memperbaiki tanpa flash. Analisis: pengaturan yang TEPAT adalah...', 'Naikkan ISO saja tanpa pertimbangan lain', 'Buka aperture lebih lebar (f/1.8) + naikkan ISO + perpanjang shutter', 'Pendekkan shutter speed saja', 'Turunkan ISO', 1, 'Segitiga eksposur: aperture lebar + ISO tinggi + shutter lambat = lebih banyak cahaya masuk', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #002
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_002', '11DKV', 'Mata Pelajaran Pilihan', '**Siti** foto olahraga dalam ruangan. Subjek blur karena gerakan. Analisis penyebab dan solusi:', 'ISO terlalu rendah → naikkan ISO untuk shorten shutter', 'Aperture terlalu lebar → tutup aperture', 'Shutter terlalu cepat → perlambat', 'Tidak ada hubungannya dengan eksposur', 0, 'Motion blur terjadi karena shutter terlalu lambat. Naikkan ISO supaya bisa shorten shutter tanpa underexpose', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #003
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_003', '11DKV', 'Mata Pelajaran Pilihan', '**Budi** pakai aperture f/2.8, ISO 400, shutter 1/60. Foto overexpose. Analisis langkah fix yang TEPAT:', 'Turunkan ISO ke 100 atau shorten shutter ke 1/250', 'Buka aperture lebih lebar', 'Naikkan ISO', 'Pakai flash', 0, 'Overexpose = terlalu banyak cahaya. Turunkan ISO atau shorten shutter untuk kurangi cahaya', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #004
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_004', '11DKV', 'Mata Pelajaran Pilihan', 'Apa yang terjadi jika **Dina** naikkan ISO dari 800 ke 6400 di kondisi cahaya sama?', 'Foto lebih gelap', 'Foto lebih terang tapi noise meningkat', 'Foto lebih tajam', 'Tidak ada perubahan', 1, 'ISO tinggi = sensor lebih sensitif = lebih terang, tapi noise meningkat signifikan', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #005
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_005', '11DKV', 'Mata Pelajaran Pilihan', '**Eka** pakai f/4, ISO 200, 1/125. **Fajar** pakai f/8, ISO 200, 1/125. Analisis perbedaan hasil:', 'Foto Eka lebih gelap (aperture lebih kecil = lebih sedikit cahaya)', 'Foto Fajar lebih terang', 'Sama saja', 'Foto Eka lebih tajam', 0, 'f/4 (angka kecil = bukaan besar) = lebih banyak cahaya daripada f/8. Foto Eka lebih terang', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #006
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_006', '11DKV', 'Mata Pelajaran Pilihan', 'Segitiga eksposur terdiri dari 3 elemen yang saling memengaruhi:', 'ISO, WB, Metering', 'Aperture, Shutter Speed, ISO', 'Focal length, Focus, Zoom', 'Megapixel, Sensor, Lens', 1, 'Segitiga eksposur: Aperture (bukaan) + Shutter Speed (kecepatan) + ISO (sensitivitas)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #007
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_007', '11DKV', 'Mata Pelajaran Pilihan', '**Gita** foto landscape. Ia ingin semua tajam dari depan ke belakang. Pengaturan yang TEPAT:', 'f/1.4, ISO 6400, 1/1000', 'f/16, ISO 100, 1/60 (pakai tripod)', 'f/2.8, ISO 3200, 1/30', 'f/8, ISO 6400, 1/4000', 1, 'f/16 = DOF dalam (semua tajam). ISO 100 = clean. Tripod untuk hindari shake di 1/60', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #008
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_008', '11DKV', 'Mata Pelajaran Pilihan', '**Hadi** foto malam tanpa tripod. Shutter 1/15 menghasilkan blur. Solusi praktis:', 'Pakai tripod atau naikkan ISO untuk shorten shutter', 'Tutup aperture', 'Turunkan ISO', 'Ganti lensa', 0, 'Tripod = stabil. Atau naikkan ISO supaya shutter lebih cepat (1/60+) untuk handheld', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #009
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_009', '11DKV', 'Mata Pelajaran Pilihan', 'Hubungan aperture dan depth of field:', 'Aperture besar (f/1.4) = DOF dalam', 'Aperture kecil (f/16) = DOF dangkal', 'Aperture besar (f/1.4) = DOF dangkal', 'Tidak ada hubungan', 2, 'Aperture besar (f/1.4) = bukaan lebar = DOF dangkal (background kabur). Aperture kecil (f/16) = DOF dalam', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #010
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_010', '11DKV', 'Mata Pelajaran Pilihan', '**Ira** pakai shutter 1/4000. Analisis efek pada foto:', 'Motion blur maksimal', 'Freeze motion (hentikan gerakan)', 'Foto overexpose pasti', 'Background kabur', 1, 'Shutter sangat cepat (1/4000) = freeze motion, hentikan gerakan subjek', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #011
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_011', '11DKV', 'Mata Pelajaran Pilihan', '**Joko** foto air terjun. Ia ingin efek air mengalir halus (smooth). Pengaturan:', 'Shutter 1/4000', 'Shutter 1/2000', 'Shutter 2-5 detik (pakai tripod + ND filter)', 'Shutter 1/60', 2, 'Shutter lambat (2-5s) = motion blur pada air = efek smooth. Butuh tripod + ND filter', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #012
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_012', '11DKV', 'Mata Pelajaran Pilihan', 'ISO 100 vs ISO 6400. Analisis perbedaan utama:', 'Tidak ada beda', 'ISO 100 = clean/no noise, ISO 6400 = noisy', 'ISO 100 = lebih terang', 'ISO 6400 = lebih tajam', 1, 'ISO rendah = clean, ISO tinggi = noisy. ISO tidak membuat foto lebih tajam', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #013
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_013', '11DKV', 'Mata Pelajaran Pilihan', 'Aperture f/2.8 dibandingkan f/8. Mana yang menghasilkan lebih banyak cahaya?', 'f/8', 'f/2.8', 'Sama', 'Tergantung ISO', 1, 'f/2.8 = bukaan lebih besar = lebih banyak cahaya masuk dibanding f/8', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #014
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_014', '11DKV', 'Mata Pelajaran Pilihan', '**Kiki** foto concert. Cahaya minim, subjek bergerak. Strategi terbaik:', 'f/16, ISO 100, 1/4000', 'f/2.8, ISO 3200-6400, 1/250', 'f/8, ISO 200, 1/30', 'f/22, ISO 100, 30s', 1, 'Concert: aperture lebar (f/2.8) + ISO tinggi (3200-6400) + shutter cukup cepat (1/250) untuk freeze', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #015
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_015', '11DKV', 'Mata Pelajaran Pilihan', 'Metering mode yang mengukur cahaya dari seluruh frame secara merata disebut:', 'Spot metering', 'Center-weighted', 'Evaluative/Matrix', 'Partial', 2, 'Evaluative/Matrix = ukur seluruh frame secara merata. Spot = titik kecil. Center = area tengah', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #016
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_016', '11DKV', 'Mata Pelajaran Pilihan', 'Mode ''A'' atau ''Av'' pada kamera DSLR berarti:', 'Aperture Priority — fotografer atur aperture, kamera atur shutter', 'Auto — kamera atur semua', 'Action mode', 'Aperture locked', 0, 'Aperture Priority: fotografer set aperture, kamera otomatis atur shutter speed', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #017
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_017', '11DKV', 'Mata Pelajaran Pilihan', 'Mode ''S'' atau ''Tv'' pada kamera berarti:', 'Shutter Priority — fotografer atur shutter, kamera atur aperture', 'Self-timer', 'Silent mode', 'Sports mode', 0, 'Shutter Priority: fotografer set shutter speed, kamera otomatis atur aperture', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #018
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_018', '11DKV', 'Mata Pelajaran Pilihan', 'Mode ''M'' pada kamera berarti:', 'Macro', 'Manual — fotografer atur aperture DAN shutter sendiri', 'Movie/Video', 'Memory', 1, 'Manual: fotografer full kontrol aperture + shutter. Kamera tidak auto-adjust', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #019
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_019', '11DKV', 'Mata Pelajaran Pilihan', 'Mode ''P'' (Program) berarti:', 'Professional mode', 'Program AE — kamera atur aperture + shutter, fotografer bisa shift', 'Portrait', 'Panorama', 1, 'Program AE: kamera atur aperture + shutter, tapi fotografer bisa shift (program shift)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #020
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_020', '11DKV', 'Mata Pelajaran Pilihan', '**Lia** ingin blur background maksimal untuk portrait. Mode yang tepat:', 'M dengan f/16', 'Av/A dengan f/1.8', 'P mode', 'Auto mode', 1, 'Av/A mode + aperture lebar (f/1.8) = blur background maksimal. Kamera atur shutter otomatis', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #021
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_021', '11DKV', 'Mata Pelajaran Pilihan', 'AF-S (Single AF) cocok untuk:', 'Subjek bergerak cepat', 'Subjek diam (landscape, still life, portrait)', 'Video', 'Macro saja', 1, 'AF-S = fokus sekali, lock. Cocok untuk subjek diam', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #022
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_022', '11DKV', 'Mata Pelajaran Pilihan', 'AF-C (Continuous AF) cocok untuk:', 'Subjek diam', 'Landscape', 'Subjek bergerak (olahraga, wildlife)', 'Tripod shot', 2, 'AF-C = fokus terus menerus menyesuaikan. Cocok untuk subjek bergerak', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #023
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_023', '11DKV', 'Mata Pelajaran Pilihan', '**Maman** foto burung terbang. AF mode yang tepat:', 'AF-S', 'AF-C + tracking', 'Manual focus', 'Macro AF', 1, 'AF-C + tracking = fokus mengikuti subjek bergerak. AF-S hanya untuk subjek diam', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #024
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_024', '11DKV', 'Mata Pelajaran Pilihan', 'Focus point tunggal (single point AF) digunakan untuk:', 'Subjek bergerak cepat', 'Presisi tinggi — pilih titik fokus spesifik (mis: mata portrait)', 'Landscape', 'Wide angle', 1, 'Single point = presisi tinggi, cocok untuk portrait (fokus ke mata)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #025
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_025', '11DKV', 'Mata Pelajaran Pilihan', '**Nina** foto portrait. Fokus harus tepat di:', 'Hidung', 'Mata (nearest eye)', 'Telinga', 'Rambut', 1, 'Aturan portrait: fokus ke mata terdekat kamera. Mata = elemen paling penting', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #026
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_026', '11DKV', 'Mata Pelajaran Pilihan', 'Back-button focus memisahkan tombol fokus dari tombol shutter. Keuntungannya:', 'Tidak ada keuntungan', 'Bisa lock fokus tanpa tekan shutter, fleksibel untuk recompose', 'Foto lebih terang', 'Shutter lebih cepat', 1, 'Back-button: fokus dengan tombol belakang, shutter hanya untuk jepret. Bisa lock + recompose', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #027
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_027', '11DKV', 'Mata Pelajaran Pilihan', '**Omar** foto produk kecil (macro). AF sering gagal. Solusi:', 'Pakai AF-C', 'Switch ke manual focus + live view magnify', 'Naikkan ISO', 'Buka aperture maksimal', 1, 'Macro: DOF sangat tipis, AF sering miss. Manual focus + live view magnify = presisi', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #028
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_028', '11DKV', 'Mata Pelajaran Pilihan', 'Depth of field dipengaruhi oleh 3 faktor:', 'ISO, WB, Metering', 'Aperture, focal length, jarak ke subjek', 'Shutter, ISO, WB', 'Megapixel, sensor, lens', 1, 'DOF dipengaruhi: aperture (f/1.4=dangkal), focal length (200mm=dangkal), jarak (dekat=dangkal)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #029
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_029', '11DKV', 'Mata Pelajaran Pilihan', '**Qori** pakai lensa 50mm f/1.8. DOF-nya dibandingkan 50mm f/8:', 'Sama', 'f/1.8 lebih dangkal (background lebih kabur)', 'f/8 lebih dangkal', 'Tidak ada hubungan', 1, 'f/1.8 = aperture besar = DOF lebih dangkal = background lebih kabur dibanding f/8', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #030
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_030', '11DKV', 'Mata Pelajaran Pilihan', 'Hyperfocal distance adalah:', 'Jarak fokus maksimal lensa', 'Jarak di mana semua dari setengah jarak itu sampai infinity terlihat tajam', 'Jarak minimal fokus macro', 'Jarak antara kamera dan tripod', 1, 'Hyperfocal = fokus di titik tertentu → semua dari setengah jarak itu sampai infinity tajam. Cocok landscape', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #031
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_031', '11DKV', 'Mata Pelajaran Pilihan', '**Rina** foto group foto 10 orang berbaris. Agar semua tajam:', 'f/1.4, fokus ke orang depan', 'f/8-f/11, fokus ke orang tengah baris ke-2', 'f/2.8, fokus ke orang belakang', 'f/22, fokus ke infinity', 1, 'Group photo: aperture kecil (f/8-f/11) untuk DOF dalam + fokus ke baris tengah', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #032
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_032', '11DKV', 'Mata Pelajaran Pilihan', 'Focus peaking (di mirrorless) membantu:', 'Menambah bokeh', 'Highlight area yang in-focus (warna) untuk manual focus', 'Menambah kontras', 'Kurangi noise', 1, 'Focus peaking = highlight edge yang in-focus dengan warna. Membantu manual focus presisi', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #033
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_033', '11DKV', 'Mata Pelajaran Pilihan', 'Face/Eye detection AF paling berguna untuk:', 'Landscape', 'Portrait — auto detect dan fokus ke mata', 'Astrofotografi', 'Macro', 1, 'Face/Eye AF = auto detect wajah + fokus ke mata. Sangat berguna untuk portrait', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #034
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_034', '11DKV', 'Mata Pelajaran Pilihan', '**Santi** foto bunga dengan lensa macro 100mm. DOF sangat tipis. Cara memperluas DOF:', 'Buka aperture ke f/2.8', 'Tutup aperture ke f/16-f/22', 'Naikkan ISO', 'Shorten shutter', 1, 'Macro DOF tipis. Tutup aperture (f/16-f/22) untuk perluas DOF — semua bagian bunga tajam', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #035
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_035', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa 50mm f/1.8 disebut lensa:', 'Wide angle', 'Standard/Normal (mendekati pandangan mata)', 'Telephoto', 'Fisheye', 1, '50mm = standard/normal lens, mendekati field of view mata manusia', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #036
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_036', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa 200mm termasuk kategori:', 'Wide angle', 'Standard', 'Telephoto (untuk subjek jauh)', 'Macro', 2, '200mm = telephoto, untuk subjek jauh (wildlife, sport, portrait dengan kompresi background', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #037
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_037', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa 16mm termasuk kategori:', 'Wide angle (bidang luas, distorsi pinggiran)', 'Telephoto', 'Macro', 'Fisheye', 0, '16mm = wide angle, bidang luas, ada distorsi pinggiran (barrel distortion)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #038
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_038', '11DKV', 'Mata Pelajaran Pilihan', '**Tono** foto architecture. Ia butuh bidang luas tanpa distorsi. Lensa:', 'Fisheye 8mm', 'Wide angle 16-24mm (prime/tilt-shift ideal)', 'Telephoto 200mm', 'Macro 100mm', 1, 'Wide 16-24mm untuk architecture. Tilt-shift lebih ideal (koreksi converging lines)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #039
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_039', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa zoom vs prime:', 'Zoom lebih tajam selalu', 'Prime (fixed focal length) biasanya lebih tajam + aperture lebih lebar', 'Sama saja', 'Zoom lebih ringan', 1, 'Prime (fixed) = lebih tajam, aperture lebar (f/1.4), ringan. Zoom = fleksibel tapi trade-off kualitas', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #040
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_040', '11DKV', 'Mata Pelajaran Pilihan', '**Vera** foto portrait. Ia ingin background terkompresi (dekat dengan subjek). Lensa:', '16mm wide', '85mm-135mm telephoto', '50mm standard', 'Fisheye', 1, 'Telephoto (85-135mm) = kompresi background (background terlihat lebih dekat) + bokeh creamy', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #041
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_041', '11DKV', 'Mata Pelajaran Pilihan', 'Crop factor pada kamera APS-C (mis: 1.5x) memengaruhi:', 'Megapixel', 'Focal length efektif (50mm = 75mm equivalent)', 'ISO range', 'Tidak ada efek', 1, 'APS-C crop 1.5x: 50mm menjadi 75mm equivalent. Bidang lebih sempit dibanding full-frame', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #042
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_042', '11DKV', 'Mata Pelajaran Pilihan', 'Image stabilization (IS/VR/OS) pada lensa berfungsi untuk:', 'Menambah tajam foto', 'Kompensasi getaran tangan (shake) — bisa shutter lebih lambat handheld', 'Menambah cahaya', 'Kurangi noise', 1, 'IS/VR = kompensasi shake. Bisa handheld di shutter lebih lambat (3-4 stop) tanpa blur', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #043
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_043', '11DKV', 'Mata Pelajaran Pilihan', '**Wati** foto landscape. Lensa terbaik:', '200mm telephoto', '16-35mm wide angle', '100mm macro', '600mm super tele', 1, 'Landscape: wide angle 16-35mm untuk bidang luas. Tele untuk detail/compress', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #044
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_044', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa f/2.8 dibandingkan f/4. Keuntungan utama f/2.8:', 'Lebih ringan', 'Lebih banyak cahaya (1 stop) + bokeh lebih creamy', 'Lebih tajam', 'Lebih murah', 1, 'f/2.8 = 1 stop lebih banyak cahaya dari f/4. Bokeh lebih creamy. Tapi lebih berat + mahal', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #045
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_045', '11DKV', 'Mata Pelajaran Pilihan', 'Bokeh dipengaruhi oleh:', 'Hanya aperture', 'Aperture + focal length + jarak subjek-background + desain lensa', 'ISO saja', 'Shutter speed', 1, 'Bokeh: aperture lebar + focal length panjang + subjek dekat + background jauh = bokeh maksimal', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #046
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_046', '11DKV', 'Mata Pelajaran Pilihan', '**Yusuf** foto di ruang sempit. Lensa yang tepat:', '200mm', '85mm', '24mm atau lebih wide', '100mm macro', 2, 'Ruang sempit = wide angle (24mm atau lebih wide) untuk muat semua subjek', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #047
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_047', '11DKV', 'Mata Pelajaran Pilihan', 'Lens distortion (barrel/pincushion) paling terlihat pada:', 'Telephoto', 'Wide angle', 'Macro', 'Standard 50mm', 1, 'Wide angle = barrel distortion (pinggir melengkung). Dapat dikoreksi di post-processing', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #048
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_048', '11DKV', 'Mata Pelajaran Pilihan', 'Chromatic aberration (color fringing) muncul di:', 'Tengah frame', 'Edge/kontras tinggi — fringe biru-ungu/merah-hijau', 'Shadow area', 'Highlight area', 1, 'CA muncul di edge kontras tinggi sebagai fringe warna. Dapat dikoreksi di Lightroom', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #049
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_049', '11DKV', 'Mata Pelajaran Pilihan', '**Zahra** punya budget terbatas. Lensa pertama yang direkomendasikan:', '400mm f/2.8', '50mm f/1.8 (nifty fifty — murah, tajam, bokeh)', '8mm fisheye', '100mm macro', 1, '50mm f/1.8 = ''nifty fifty'': murah, tajam, aperture lebar, bokeh bagus. Lensa serbaguna', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #050
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_050', '11DKV', 'Mata Pelajaran Pilihan', 'White balance berfungsi untuk:', 'Mengatur eksposur', 'Mengatur suhu warna agar putih terlihat putih (tidak kekuningan/kebiruan)', 'Menambah kontras', 'Mengatur ISO', 1, 'WB = koreksi suhu warna agar neutral. Putih = putih, tidak warm/cool', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #051
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_051', '11DKV', 'Mata Pelajaran Pilihan', 'AWB (Auto White Balance) sering gagal di:', 'Outdoor siang', 'Lampu neon/LED (green tint) atau campuran sumber cahaya', 'Studio strobe', 'Sunset', 1, 'AWB gagal di: neon/LED (green), mixed lighting, sunset (terlalu warm). Manual WB lebih akurat', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #052
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_052', '11DKV', 'Mata Pelajaran Pilihan', 'Custom white balance menggunakan:', 'ISO setting', 'Kartu abu-abu 18% atau white card', 'Aperture setting', 'Shutter speed', 1, 'Custom WB: foto kartu abu-abu/putih → set sebagai referensi WB. Paling akurat', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #053
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_053', '11DKV', 'Mata Pelajaran Pilihan', 'RAW vs JPEG. Keuntungan utama RAW:', 'File lebih kecil', 'Data mentah sensor — lebih banyak info untuk editing (WB, exposure, highlight recovery)', 'Langsung jadi', 'Bisa langsung upload', 1, 'RAW = data mentah, 12-14 bit. Bisa recover highlight/shadow ekstrem, ubah WB lossless. JPEG = 8 bit, compressed', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #054
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_054', '11DKV', 'Mata Pelajaran Pilihan', '**Adi** foto JPEG. Ia salah white balance. Solusi:', 'Tidak bisa diperbaiki', 'Bisa diperbaiki di post tapi kualitas turun (artifacts)', 'Bisa diperbaiki sempurna', 'Hanya bisa di RAW', 1, 'JPEG: WB bisa di-fix tapi kualitas turun (color cast artifacts). RAW: fix WB lossless', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #055
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_055', '11DKV', 'Mata Pelajaran Pilihan', 'RAW file ukurannya:', 'Lebih kecil dari JPEG', '5-10x lebih besar dari JPEG', 'Sama dengan JPEG', 'Tergantung ISO', 1, 'RAW = 25-50MB per file (vs JPEG 5-10MB). Tapi menyimpan lebih banyak data', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #056
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_056', '11DKV', 'Mata Pelajaran Pilihan', 'Color space sRGB vs Adobe RGB:', 'Sama saja', 'sRGB = standar web/layar. Adobe RGB = lebih luas (untuk print)', 'Adobe RGB untuk video', 'sRGB untuk print', 1, 'sRGB = standar web/layar. Adobe RGB = gamut lebih luas untuk print pro', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #057
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_057', '11DKV', 'Mata Pelajaran Pilihan', '**Boni** foto sunset. AWB menghasilkan warna terlalu netral (hilang warm). Solusi:', 'Pakai AWB saja', 'Set WB manual ke Daylight/Shady (pertahankan warm)', 'Set WB Tungsten', 'Ganti ISO', 1, 'Daylight/Shady WB = pertahankan warm sunset. AWB sering netralisasi warm sunset', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #058
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_058', '11DKV', 'Mata Pelajaran Pilihan', 'WB Tungsten/Incandescent (3200K) menghasilkan:', 'Warna hangat', 'Warna sangat biru (kompensasi lampu kuning)', 'Warna hijau', 'Warna netral', 1, 'Tungsten = very cool/blue, untuk kompensasi lampu pijar yang sangat kuning', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #059
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_059', '11DKV', 'Mata Pelajaran Pilihan', 'WB Daylight/Sunny (5500K) cocok untuk:', 'Lampu neon', 'Cahaya matahari siang hari', 'Lampu lilin', 'Bayangan', 1, 'Daylight 5500K = standar cahaya matahari siang. Netral, natural', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #060
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_060', '11DKV', 'Mata Pelajaran Pilihan', '**Citra** foto indoor dengan lampu kunang-kunang (warm). WB yang tepat:', 'Daylight', 'Custom WB atau auto dengan koreksi', 'Tungsten', 'Fluorescent', 1, 'Mixed warm light = custom WB paling akurat. Atau auto + koreksi di post (RAW)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #061
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_061', '11DKV', 'Mata Pelajaran Pilihan', 'Bit depth 14-bit vs 12-bit. Keuntungan 14-bit:', 'File lebih kecil', 'Lebih banyak gradasi warna (16,384 vs 4,096 level per channel)', 'Foto lebih terang', 'Tidak ada beda', 1, '14-bit = 16,384 level per channel vs 12-bit = 4,096. Lebih banyak gradasi = smoother gradient', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #062
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_062', '11DKV', 'Mata Pelajaran Pilihan', '**Dina** foto produk untuk e-commerce. Format file yang tepat:', 'RAW (edit dulu lalu export JPEG)', 'JPEG langsung dari kamera', 'TIFF saja', 'PNG', 0, 'Produk: foto RAW → edit presisi (WB, exposure, color) → export JPEG. Kualitas terbaik', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #063
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_063', '11DKV', 'Mata Pelajaran Pilihan', 'Noise reduction in-camera (High ISO NR) sebaiknya:', 'Selalu maksimal', 'Low/Off — lebih baik edit di post (Lightroom) untuk kontrol penuh', 'Selalu Off', 'Tergantung WB', 1, 'In-camera NR sering over-processing. Better: NR low/off di kamera, edit di post untuk kontrol', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #064
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_064', '11DKV', 'Mata Pelajaran Pilihan', '**Eka** foto dengan Dual SD Card. Strategi backup:', 'Simpan di 1 card saja', 'Card 1: RAW, Card 2: JPEG (atau backup RAW)', 'Card 1: JPEG, Card 2: video', 'Tidak perlu backup', 1, 'Dual card: Card 1 RAW + Card 2 backup (RAW atau JPEG). Redundansi = aman dari card corruption', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #065
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_065', '11DKV', 'Mata Pelajaran Pilihan', 'Rule of Thirds membagi frame menjadi:', '2 bagian', '9 kotak (3x3) dengan 4 titik temu', '4 bagian diagonal', 'Lingkaran', 1, 'Rule of Thirds = 3x3 = 9 kotak, 4 power points di titik temu', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #066
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_066', '11DKV', 'Mata Pelajaran Pilihan', '**Fajar** foto silhouette di sunset. Subjek harus:', 'Terang', 'Gelap (underexpose subjek, expose untuk langit)', 'Setengah terang', 'Tergantung ISO', 1, 'Silhouette: expose untuk background (langit), subjek jadi gelap. Metering ke langit', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #067
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_067', '11DKV', 'Mata Pelajaran Pilihan', 'Leading lines dalam komposisi berfungsi untuk:', 'Mengaburkan background', 'Memandu mata ke subjek utama', 'Menambah kontras', 'Mengatur WB', 1, 'Leading lines = garis yang memandu mata penonton menuju subjek utama', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #068
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_068', '11DKV', 'Mata Pelajaran Pilihan', '**Gita** foto street. Ia ingin candid natural. Lensa terbaik:', '200mm tele (jauh, tidak terlihat)', '35mm atau 50mm (dekat, natural perspective)', '16mm wide', '100mm macro', 1, '35mm/50mm = natural perspective, dekat dengan subjek, immersive. 200mm = terlalu jauh/spying feel', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #069
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_069', '11DKV', 'Mata Pelajaran Pilihan', 'Negative space digunakan untuk:', 'Menambah elemen', 'Memberi ruang kosong yang menonjolkan subjek', 'Mengatur eksposur', 'Menambah noise', 1, 'Negative space = ruang kosong di sekitar subjek → menonjolkan subjek, kesan minimalis/dramatis', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #070
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_070', '11DKV', 'Mata Pelajaran Pilihan', '**Hadi** foto food. Sudut yang paling umum dan efektif:', 'Eye level', 'Top-down/flat lay (90°)', 'Bottom-up', '45° angle', 1, 'Food: top-down/flat lay paling populer (Instagram style). 45° juga umum untuk dimensional', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #071
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_071', '11DKV', 'Mata Pelajaran Pilihan', 'Golden hour adalah waktu:', 'Tengah hari', '1 jam setelah sunrise dan 1 jam sebelum sunset', 'Tengah malam', 'Kapan saja', 1, 'Golden hour = cahaya hangat, lembut, shadow panjang. 1 jam setelah sunrise / sebelum sunset', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #072
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_072', '11DKV', 'Mata Pelajaran Pilihan', 'Blue hour adalah waktu:', 'Siang hari', '20-30 menit setelah sunset / sebelum sunrise — langit biru deep', 'Golden hour', 'Malam hari', 1, 'Blue hour = langit biru-deep, suasana cool/moody. 20-30 menit setelah sunset/sebelum sunrise', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #073
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_073', '11DKV', 'Mata Pelajaran Pilihan', '**Ira** foto landscape. Filter yang berguna:', 'UV filter', 'ND filter (kurangi cahaya untuk shutter lambat) + CPL (kurangi refleksi/polarisasi)', 'Flash', 'Tidak perlu filter', 1, 'ND = shutter lambat (smooth air). CPL = kurangi refleksi, kontras langit. Sangat berguna landscape', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #074
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_074', '11DKV', 'Mata Pelajaran Pilihan', 'CPL (Circular Polarizer) filter berfungsi untuk:', 'Menambah cahaya', 'Kurangi refleksi di air/kaca + kontras langit + saturasi alami', 'Soft focus', 'Menambah bokeh', 1, 'CPL = kurangi refleksi, darken langit, saturasi alami. Tidak bisa diganti di post', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #075
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_075', '11DKV', 'Mata Pelajaran Pilihan', '**Joko** foto long exposure 30 detik di siang hari. Filter wajib:', 'UV filter', 'ND filter (10 stop) untuk kurangi cahaya', 'CPL', 'Tidak perlu', 1, 'Siang hari = terlalu terang untuk 30s. ND 10-stop = kurangi cahaya 1000x supaya 30s possible', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #076
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_076', '11DKV', 'Mata Pelajaran Pilihan', 'Histogram yang ideal (exposure correct) biasanya:', 'Semua di kiri (underexpose)', 'Semua di kanan (overexpose)', 'Distribusi merata, tidak menumpuk di ujung', 'Tidak terlihat', 2, 'Histogram ideal = bell curve di tengah, tidak clip di kiri (shadow) atau kanan (highlight)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #077
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_077', '11DKV', 'Mata Pelajaran Pilihan', '**Kiki** cek histogram. Data menumpuk di ujung kanan. Artinya:', 'Underexpose', 'Overexpose (highlight clipped/blown out)', 'Tepat eksposur', 'ISO terlalu rendah', 1, 'Numpuk di kanan = overexpose, highlight blown out. Detail terang hilang permanen', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #078
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_078', '11DKV', 'Mata Pelajaran Pilihan', 'ETTR (Expose To The Right) adalah teknik:', 'Underexpose', 'Eksposur sedikit over (histogram ke kanan) untuk maksimalkan data tanpa clip', 'Selalu ISO 100', 'Pakai tripod', 1, 'ETTR = eksposur sedikit terang (kanan histogram) untuk capture lebih banyak data (less noise in shadow). RAW only', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #079
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_079', '11DKV', 'Mata Pelajaran Pilihan', '**Lia** foto dengan lensa 24mm. Karakteristik foto:', 'Kompresi background kuat', 'Bidang luas, distorsi pinggir, foreground tampak besar', 'Background dekat', 'Bokeh maksimal', 1, '24mm wide = bidang luas, barrel distortion, foreground exaggeration (benda dekat terlihat lebih besar)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #080
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_080', '11DKV', 'Mata Pelajaran Pilihan', 'Rule of thumb shutter speed untuk handheld (tanpa IS):', '1/30 selalu', '1/focal_length (50mm → 1/50, 200mm → 1/200)', '1/1000 selalu', 'Tidak ada rule', 1, 'Reciprocal rule: shutter ≥ 1/focal_length. 50mm → 1/50, 200mm → 1/200. Dengan IS bisa 3-4 stop lebih lambat', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #081
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_081', '11DKV', 'Mata Pelajaran Pilihan', '**Maman** edit RAW di Lightroom. Urutan editing yang logis:', 'Sharpening dulu, lalu exposure', 'Exposure/WB dulu, lalu kontras/warna, terakhir sharpening NR', 'Crop pertama, NR terakhir', 'Tidak ada urutan', 1, 'Urutan: 1) WB/exposure 2) kontras/clarity 3) warna/vibrance 4) NR 5) sharpening. Sharpening selalu terakhir', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #082
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_082', '11DKV', 'Mata Pelajaran Pilihan', 'Clarity di Lightroom adalah:', 'Global contrast', 'Local/midtone contrast — menambah punch dan tekstur', 'Saturation', 'Exposure', 1, 'Clarity = kontras lokal di midtone. Tambah punch/tekstur. Berlebihan = halo', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #083
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_083', '11DKV', 'Mata Pelajaran Pilihan', 'Dehaze berfungsi untuk:', 'Menambah bokeh', 'Mengurangi/menambah kabut — kontras directional', 'Mengatur WB', 'Sharpening', 1, 'Dehaze = kurangi/tambah kabut. Effective untuk landscape berkabut atau tambah mood', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #084
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_084', '11DKV', 'Mata Pelajaran Pilihan', '**Nina** ekspor foto untuk Instagram. Format dan ukuran:', 'RAW 50MB', 'JPEG sRGB, 1080x1080px (square) atau 1080x1350 (portrait), quality 80%', 'JPEG Adobe RGB, 4000px', 'PNG 100%', 1, 'Instagram: JPEG sRGB, 1080px (max), quality 80%. sRGB wajib (Adobe RGB akan terlihat flat di web)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #085
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_085', '11DKV', 'Mata Pelajaran Pilihan', 'Sharpening output (for screen vs print):', 'Sama saja', 'Print butuh lebih banyak sharpening daripada screen', 'Screen butuh lebih banyak', 'Tidak perlu sharpening', 1, 'Print = butuh lebih banyak sharpening (paper absorbs ink = softer). Screen = sharpening moderat', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #086
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_086', '11DKV', 'Mata Pelajaran Pilihan', '**Omar** foto landscape. Ia pakai HDR (3 bracket exposures). Tujuan:', 'Menambah bokeh', 'Capture dynamic range luas — detail di shadow + highlight', 'Menambah ISO', 'Menambah focal length', 1, 'HDR = multiple exposures (under, normal, over) → merge. Capture detail di shadow + highlight yang tidak mungkin 1 frame', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #087
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_087', '11DKV', 'Mata Pelajaran Pilihan', 'Over-editing (over-processed) ditandai oleh:', 'Foto natural', 'Halos di clarity, saturasi berlebih, HDR glow, skin tone rusak', 'Foto tajam', 'Foto terang', 1, 'Over-editing: halos (clarity tinggi), neon saturation, HDR glow, waxy skin. Natural is better', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #088
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_088', '11DKV', 'Mata Pelajaran Pilihan', '**Qori** batch edit 100 foto. Fitur Lightroom yang berguna:', 'Sync settings — copy edit dari 1 foto ke lainnya', 'Edit manual satu per satu', 'Export dulu', 'Tidak bisa batch', 0, 'Sync = copy settings dari 1 foto ke multiple. Sangat efisien untuk batch edit (mis: wedding)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #089
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_089', '11DKV', 'Mata Pelajaran Pilihan', 'Lens correction profile di Lightroom berfungsi untuk:', 'Menambah bokeh', 'Koreksi distorsi + chromatic aberration + vignetting otomatis', 'Mengatur eksposur', 'Sharpening', 1, 'Lens profile = koreksi otomatis distorsi + CA + vignetting berdasarkan profil lensa', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #090
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_090', '11DKV', 'Mata Pelajaran Pilihan', '**Rina** foto portrait. Skin tone terlihat oranye setelah edit. Penyebab:', 'Sharpening berlebih', 'Saturation berlebih — pakai vibrance atau HSL untuk protect skin', 'ISO tinggi', 'WB salah', 1, 'Saturation naikkan semua warna termasuk skin. Fix: vibrance (protect skin) atau HSL orange/red adjustment', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #091
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_091', '11DKV', 'Mata Pelajaran Pilihan', 'Export sharpening ''Screen'' vs ''Print'':', 'Sama', 'Screen = softer, Print = stronger', 'Screen = stronger, Print = softer', 'Tidak ada beda', 1, 'Screen = softer sharpening (layar = sharp). Print = stronger (paper absorbs = softer)', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #092
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_092', '11DKV', 'Mata Pelajaran Pilihan', '**Santi** mau backup foto. Strategi 3-2-1:', '3 copy di 1 tempat', '3 copy, 2 media berbeda, 1 offsite (cloud)', '1 copy di memory card', '2 copy di laptop', 1, '3-2-1: 3 copy, 2 media berbeda (HDD + SSD), 1 offsite (cloud). Rule backup terbaik', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #093
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_093', '11DKV', 'Mata Pelajaran Pilihan', 'Vignette (tepi gelap) bisa:', 'Hanya ditambah', 'Ditambah atau dikurangi (post-crop vignette)', 'Hanya dikurangi', 'Tidak bisa di-edit', 1, 'Vignette: tambah (darken edge = fokus ke tengah) atau kurangi (brighten edge). Post-crop vignette di Lightroom', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #094
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_094', '11DKV', 'Mata Pelajaran Pilihan', '**Tono** foto produk untuk marketplace. Background harus:', 'Ramai pattern', 'Putih polos (easy cutout, clean, profesional)', 'Gradient', 'Hitam', 1, 'Marketplace: putih polos = clean, easy cutout, standar. Background ramai mengganggu produk', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #095
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_095', '11DKV', 'Mata Pelajaran Pilihan', '**Vera** edit foto B&W. Elemen paling penting:', 'Saturation', 'Kontras tonal + tekstur + shape (tidak ada warna)', 'Hue', 'Vibrance', 1, 'B&W: fokus kontras tonal (terang-gelap), tekstur, shape. Warna tidak ada = harus kuat secara tonal', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #096
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_096', '11DKV', 'Mata Pelajaran Pilihan', 'Mirrorless vs DSLR. Keuntungan utama mirrorless:', 'Battery lebih tahan', 'Lebih ringkas, EVF (real-time preview), faster AF (on-sensor)', 'Lebih murah selalu', 'Optical viewfinder', 1, 'Mirrorless: ringkas, EVF (lihat exposure real-time), AF cepat (on-sensor PDAF). Battery lebih boros', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #097
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_097', '11DKV', 'Mata Pelajaran Pilihan', 'EVF (Electronic Viewfinder) keuntungan dibanding OVF:', 'Lebih natural', 'Real-time preview exposure, WB, depth of field + focus peaking', 'Tidak ada lag', 'Battery hemat', 1, 'EVF: preview exposure/WB/DOF real-time + focus peaking + histogram. OVF = optical, natural, no lag', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #098
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_098', '11DKV', 'Mata Pelajaran Pilihan', '**Wati** pakai mirrorless. AF coverage hampir seluruh frame. Keuntungan:', 'Tidak ada', 'Bisa fokus di pinggir frame (tidak hanya tengah seperti DSLR)', 'Foto lebih terang', 'Battery hemat', 1, 'Mirrorless: AF point cover hampir seluruh frame (90%+). DSLR terbatas di tengah. Fleksibel untuk komposisi', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #099
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_099', '11DKV', 'Mata Pelajaran Pilihan', 'Silent shutter (electronic shutter) di mirrorless:', 'Tidak ada', 'Bisa foto tanpa suara shutter — cocok concert/wedding/wildlife', 'Menambah noise', 'Hanya untuk video', 1, 'Electronic shutter = silent. Cocok: concert, wedding ceremony, wildlife. Tapi rolling shutter distortion possible', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- PG #100
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_pg_100', '11DKV', 'Mata Pelajaran Pilihan', 'Battery mirrorless dibanding DSLR:', 'Lebih tahan', 'Lebih boros (EVF + LCD + AF continuous)', 'Sama', 'Tergantung lensa', 1, 'Mirrorless: EVF + LCD + AF continuous = boros battery. Bawa spare battery wajib', 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #001
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_001', '11DKV', 'Mata Pelajaran Pilihan', 'Tiga elemen segitiga eksposur: aperture, shutter speed, dan...', 'wb', 'metering', 'focus', 'zoom', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'iso|iso|iso', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #002
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_002', '11DKV', 'Mata Pelajaran Pilihan', 'Bukaan lensa yang mengatur jumlah cahaya masuk disebut...', 'shutter', 'iso', 'wb', 'zoom', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'aperture|bukaan|aperture', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #003
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_003', '11DKV', 'Mata Pelajaran Pilihan', 'Kecepatan rana menangkap cahaya disebut... speed', 'aperture', 'iso', 'focus', 'metering', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'shutter|rana|shutter', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #004
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_004', '11DKV', 'Mata Pelajaran Pilihan', 'Sensitivitas sensor terhadap cahaya disebut...', 'aperture', 'shutter', 'wb', 'exposure', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'iso|iso|iso', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #005
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_005', '11DKV', 'Mata Pelajaran Pilihan', 'Aperture f/1.4 menghasilkan depth of field yang... (dangkal/dalam)', 'dalam', 'lebar', 'sempit', 'tinggi', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'dangkal|shallow|dangkal', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #006
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_006', '11DKV', 'Mata Pelajaran Pilihan', 'Aperture f/16 menghasilkan depth of field yang... (dangkal/dalam)', 'dangkal', 'shallow', 'tipis', 'rendah', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'dalam|deep|dalam', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #007
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_007', '11DKV', 'Mata Pelajaran Pilihan', 'ISO tinggi menghasilkan foto lebih terang tapi muncul...', 'bokeh', 'blur', 'kontras', 'tajam', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'noise|grain|noise', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #008
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_008', '11DKV', 'Mata Pelajaran Pilihan', 'Mode kamera di mana fotografer atur aperture, kamera atur shutter disebut aperture...', 'manual', 'auto', 'shutter', 'program', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'priority|av|priority', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #009
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_009', '11DKV', 'Mata Pelajaran Pilihan', 'Mode kamera di mana fotografer atur shutter, kamera atur aperture disebut shutter...', 'manual', 'auto', 'aperture', 'program', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'priority|tv|priority', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #010
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_010', '11DKV', 'Mata Pelajaran Pilihan', 'Mode kamera di mana fotografer atur aperture DAN shutter sendiri disebut mode...', 'auto', 'program', 'av', 'tv', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'manual|m|manual', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #011
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_011', '11DKV', 'Mata Pelajaran Pilihan', 'AF untuk subjek diam (landscape, still life) disebut AF...', 'c', 'continuous', 'auto', 'manual', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 's|single|s', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #012
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_012', '11DKV', 'Mata Pelajaran Pilihan', 'AF untuk subjek bergerak (olahraga, wildlife) disebut AF...', 's', 'single', 'macro', 'manual', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'c|continuous|c', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #013
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_013', '11DKV', 'Mata Pelajaran Pilihan', 'Pada portrait, fokus harus tepat di... subjek', 'hidung', 'telinga', 'rambut', 'mulut', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'mata|eye|mata', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #014
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_014', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa 50mm disebut lensa... (mendekati pandangan mata)', 'wide', 'tele', 'macro', 'fisheye', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'standard|normal|standard', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #015
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_015', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa 200mm termasuk kategori... (untuk subjek jauh)', 'wide', 'standard', 'macro', 'fisheye', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'telephoto|tele|telephoto', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #016
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_016', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa 16mm termasuk kategori... (bidang luas)', 'tele', 'standard', 'macro', 'fisheye', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'wide angle|wide|wide angle', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #017
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_017', '11DKV', 'Mata Pelajaran Pilihan', 'Lensa fixed (tidak bisa zoom) disebut lensa...', 'zoom', 'vario', 'tele', 'wide', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'prime|prime|prime', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #018
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_018', '11DKV', 'Mata Pelajaran Pilihan', 'Background kabur akibat aperture besar disebut...', 'noise', 'blur', 'flare', 'ghost', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'bokeh|bokeh|bokeh', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #019
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_019', '11DKV', 'Mata Pelajaran Pilihan', 'Fungsi white balance adalah mengatur suhu... agar putih terlihat putih', 'cahaya', 'eksposur', 'fokus', 'iso', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'warna|color|warna', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #020
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_020', '11DKV', 'Mata Pelajaran Pilihan', 'Format file mentah sensor yang menyimpan data lengkap disebut...', 'jpeg', 'png', 'tiff', 'gif', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'raw|raw|raw', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #021
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_021', '11DKV', 'Mata Pelajaran Pilihan', 'Format file terkompresi yang langsung bisa dipakai disebut...', 'raw', 'tiff', 'psd', 'raw', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'jpeg|jpg|jpeg', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #022
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_022', '11DKV', 'Mata Pelajaran Pilihan', 'White balance otomatis disingkat...', 'abc', 'afb', 'iso', 'wb', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'awb|awb|awb', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #023
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_023', '11DKV', 'Mata Pelajaran Pilihan', 'Kartu abu-abu 18% digunakan untuk set white balance...', 'auto', 'preset', 'awb', 'daylight', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'custom|manual|custom', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #024
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_024', '11DKV', 'Mata Pelajaran Pilihan', 'Fitur kompensasi getaran tangan pada lensa disebut image...', 'correction', 'reduction', 'balance', 'focus', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'stabilization|is|stabilization', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #025
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_025', '11DKV', 'Mata Pelajaran Pilihan', 'Rule of thirds membagi frame menjadi... kotak (3x3)', '4', '6', '3', '12', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', '9|sembilan|9', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #026
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_026', '11DKV', 'Mata Pelajaran Pilihan', 'Waktu 1 jam setelah sunrise/sebelum sunset dengan cahaya hangat disebut... hour', 'blue', 'magic', 'sunny', 'warm', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'golden|golden|golden', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #027
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_027', '11DKV', 'Mata Pelajaran Pilihan', 'Filter yang mengurangi cahaya untuk long exposure disebut... filter', 'uv', 'cpl', 'nd', 'ir', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'nd|nd|nd', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #028
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_028', '11DKV', 'Mata Pelajaran Pilihan', 'Filter yang mengurangi refleksi dan kontras langit disebut...', 'nd', 'uv', 'ir', 'soft', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'cpl|polarizer|cpl', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #029
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_029', '11DKV', 'Mata Pelajaran Pilihan', 'Grafik distribusi terang-gelap foto disebut...', 'chart', 'graph', 'meter', 'curve', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'histogram|histogram|histogram', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #030
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_030', '11DKV', 'Mata Pelajaran Pilihan', 'Data menumpuk di ujung kanan histogram berarti foto...', 'underexpose', 'tepat', 'gelap', 'noise', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'overexpose|terlalu terang|overexpose', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #031
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_031', '11DKV', 'Mata Pelajaran Pilihan', 'Data menumpuk di ujung kiri histogram berarti foto...', 'overexpose', 'tepat', 'terang', 'noise', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'underexpose|terlalu gelap|underexpose', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #032
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_032', '11DKV', 'Mata Pelajaran Pilihan', 'Teknik eksposur sedikit over (histogram ke kanan tanpa clip) disingkat...', 'ettl', 'httr', 'ettr', 'iso', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'ettr|ettr|ettr', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #033
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_033', '11DKV', 'Mata Pelajaran Pilihan', 'Kontras lokal di midtones yang menambah punch disebut...', 'contrast', 'dehaze', 'sharpening', 'vibrance', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'clarity|klaritas|clarity', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #034
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_034', '11DKV', 'Mata Pelajaran Pilihan', 'Fitur untuk mengurangi kabut di foto disebut...', 'clarity', 'contrast', 'sharpening', 'vibrance', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'dehaze|dehaze|dehaze', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #035
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_035', '11DKV', 'Mata Pelajaran Pilihan', 'Intensitas warna dalam editing disebut...', 'hue', 'exposure', 'contrast', 'clarity', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'saturasi|saturation|saturasi', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #036
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_036', '11DKV', 'Mata Pelajaran Pilihan', 'Versi saturation yang protect skin tone disebut...', 'contrast', 'clarity', 'hue', 'exposure', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'vibrance|vibrance|vibrance', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #037
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_037', '11DKV', 'Mata Pelajaran Pilihan', 'Mirrorless menggunakan viewfinder elektronik disingkat...', 'ovf', 'lcd', 'led', 'vf', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'evf|evf|evf', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #038
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_038', '11DKV', 'Mata Pelajaran Pilihan', 'DSLR menggunakan viewfinder optik disingkat...', 'evf', 'lcd', 'led', 'vf', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'ovf|ovf|ovf', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #039
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_039', '11DKV', 'Mata Pelajaran Pilihan', 'Stabilisasi di body kamera mirrorless disingkat...', 'is', 'vr', 'os', 'oss', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'ibis|ibis|ibis', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #040
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_040', '11DKV', 'Mata Pelajaran Pilihan', 'Shutter elektronik tanpa suara di mirrorless disebut... shutter', 'mechanical', 'loud', 'fast', 'slow', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'silent|electronic|silent', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #041
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_041', '11DKV', 'Mata Pelajaran Pilihan', 'Crop factor APS-C umumnya...x (mis: 1.5x)', '2', '1', '3', '0.5', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', '1.5|1.5|1.5', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #042
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_042', '11DKV', 'Mata Pelajaran Pilihan', 'Lens 50mm di APS-C 1.5x menjadi...mm equivalent', '50', '100', '35', '85', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', '75|75|75', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #043
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_043', '11DKV', 'Mata Pelajaran Pilihan', 'Backup strategy 3-2-1: 3 copy, 2 media, 1...', 'local', 'laptop', 'card', 'drive', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'offsite|cloud|offsite', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #044
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_044', '11DKV', 'Mata Pelajaran Pilihan', 'Color space standar untuk web/layar disebut...', 'adobe rgb', 'prophoto', 'cmyk', 'lab', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'srgb|srgb|srgb', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #045
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_045', '11DKV', 'Mata Pelajaran Pilihan', 'Color space dengan gamut lebih luas untuk print disebut... RGB', 's', 'pro', 'wide', 'print', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'adobe|adobe|adobe', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #046
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_046', '11DKV', 'Mata Pelajaran Pilihan', 'Distorsi pinggir melengkung pada lensa wide disebut... distortion', 'pincushion', 'mustache', 'perspective', 'chromatic', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'barrel|barrel|barrel', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #047
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_047', '11DKV', 'Mata Pelajaran Pilihan', 'Fringe warna di edge kontras tinggi disebut chromatic...', 'noise', 'blur', 'distortion', 'vignette', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'aberasi|aberration|aberasi', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #048
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_048', '11DKV', 'Mata Pelajaran Pilihan', 'Vignette adalah penggelapan di... frame', 'tengah', 'atas', 'bawah', 'sudut', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'tepi|pinggir|tepi', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #049
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_049', '11DKV', 'Mata Pelajaran Pilihan', 'HDR = High Dynamic... (capture detail shadow + highlight)', 'resolution', 'ratio', 'reach', 'raw', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'range|range|range', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Isian #050
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
('q_bab3_11dkv_isian_050', '11DKV', 'Mata Pelajaran Pilihan', 'Rule of thumb shutter handheld: shutter ≥ 1/... (focal length)', 'iso', 'aperture', 'exposure', 'metering', 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', 'focal length|focal|focal length', '', 'C3', '', '', 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Tugas
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_dkv_pil_11_3_tugas', 'Tugas Bab 3: Kamera DSLR/Mirrorless (75 PG + 20 Isian)', 'Tugas tentang mengoperasikan kamera DSLR/mirrorless. Mencakup eksposur, fokus, lensa, WB, komposisi, mirrorless. 75 soal PG HOTS + 20 soal isian. Waktu 90 menit.', 'Mata Pelajaran Pilihan', '11DKV', 'SMK', true, '2026-10-02T23:59:00+07:00', 'wajib', 95, 'quiz_only', NULL, 'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verifikasi
SELECT "questionType", COUNT(*) FROM "Question" WHERE id LIKE 'q_bab3_11dkv_%' GROUP BY "questionType";
-- Expected: pilihan_ganda 100, isian_singkat 50
