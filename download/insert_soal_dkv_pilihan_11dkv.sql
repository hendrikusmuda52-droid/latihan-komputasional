-- ============================================================
-- SKRIP SQL: Insert 250 Soal Bank Soal Fotografi DKV Kelas 11DKV
-- Subject: Mata Pelajaran Pilihan
-- 5 CP x 50 Soal = 250 Soal HOTS (C4-C5)
-- ============================================================

-- Soal 1 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_001',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 2 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_002',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 3 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_003',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 4 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_004',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 5 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_005',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 6 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_006',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 7 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_007',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 8 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_008',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 9 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_009',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 10 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_010',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 11 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_011',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 12 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_012',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 13 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_013',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 14 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_014',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 15 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_015',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 16 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_016',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 17 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_017',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 18 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_018',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 19 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_019',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 20 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_020',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 21 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_021',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 22 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_022',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 23 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_023',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 24 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_024',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 25 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_025',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 26 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_026',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 27 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_027',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 28 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_028',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 29 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_029',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 30 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_030',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 31 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_031',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 32 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_032',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 33 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_033',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 34 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_034',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 35 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_035',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 36 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_036',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 37 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_037',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 38 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_038',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 39 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_039',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 40 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_040',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 41 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_041',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 42 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_042',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 43 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_043',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 44 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_044',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 45 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_045',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 46 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_046',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap B. Karakteristik Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 47 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_047',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap C. Setup Pencahayaan Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 48 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_048',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap D. Aksesoris Studio, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 49 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_049',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap E. Pengukuran Cahaya, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 50 (CP 1)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_1_050',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Perhatikan skenario berikut. Seorang fotografer studio DKV sedang mengeksekusi proyek potret komersial berkonsep high-fashion. Kendala muncul ketika bayangan di bawah hidung model terlalu pekat dan tajam, sehingga mengurangi estetika kehalusan kulit wajah yang diminta klien. Berdasarkan analisis Anda terhadap A. Teori Dasar Pencahayaan, langkah modifikasi pencahayaan studio manakah yang paling efektif dan rasional untuk memecahkan masalah tersebut tanpa mengubah intensitas cahaya utama?',
  'Mengganti key light dengan hard light reflectors tanpa diffuser.',
  'Menambahkan fill light dengan softbox besar atau reflector board di sisi berlawanan untuk mengurangi rasio kontras.',
  'Menaikkan shutter speed pada kamera melewati batas sync speed flash studio.',
  'Memindahkan posisi background light tepat ke depan wajah model secara langsung.',
  1,
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Kasus ini membutuhkan penurunan rasio kontras (C4) dengan melembutkan bayangan melalui pengisian cahaya (fill light) menggunakan modifier lunak seperti softbox atau reflektor.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_1',
  'tp_dkv_pil_11_1_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 1 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_001',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 2 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_002',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 3 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_003',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 4 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_004',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 5 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_005',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 6 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_006',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 7 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_007',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 8 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_008',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 9 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_009',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 10 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_010',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 11 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_011',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 12 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_012',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 13 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_013',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 14 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_014',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 15 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_015',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 16 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_016',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 17 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_017',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 18 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_018',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 19 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_019',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 20 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_020',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 21 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_021',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 22 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_022',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 23 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_023',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 24 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_024',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 25 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_025',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 26 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_026',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 27 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_027',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 28 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_028',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 29 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_029',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 30 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_030',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 31 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_031',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 32 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_032',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 33 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_033',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 34 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_034',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 35 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_035',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 36 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_036',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 37 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_037',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 38 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_038',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 39 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_039',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 40 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_040',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 41 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_041',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 42 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_042',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 43 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_043',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 44 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_044',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 45 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_045',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 46 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_046',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan B. Kedalaman Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 47 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_047',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan C. Sudut Pandang dan Perspektif tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 48 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_048',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan D. Keseimbangan Visual tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 49 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_049',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan E. Teori Warna Fotografi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 50 (CP 2)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_2_050',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Dalam sebuah proyek desain media sosial produk jam tangan mewah, fotografer DKV memutuskan untuk tidak menempatkan produk tepat di tengah frame, melainkan memposisikannya pada titik persimpangan sepertiga bidang gambar. Evaluasilah efektivitas penerapan A. Prinsip Dasar Komposisi tersebut dalam konteks psikologi visual audiens komersial!',
  'Tidak efektif karena produk utama tampak tersisih dan mengurangi fokus utama mata audiens.',
  'Sangat efektif karena menciptakan keseimbangan dinamis yang menuntun gerakan mata audiens secara alami ke area krusial produk.',
  'Efektif hanya jika latar belakang foto memiliki warna yang sangat kontras dengan jam tangan.',
  'Kurang tepat karena rule of thirds hanya berlaku untuk fotografi pemandangan alam berskala luas.',
  1,
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi (C5) penerapan rule of thirds dalam ruang komersial untuk menciptakan ketegangan visual yang terarah dan estetis.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_2',
  'tp_dkv_pil_11_2_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 1 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_001',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 2 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_002',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 3 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_003',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 4 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_004',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 5 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_005',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 6 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_006',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 7 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_007',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 8 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_008',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 9 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_009',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 10 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_010',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 11 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_011',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 12 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_012',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 13 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_013',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 14 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_014',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 15 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_015',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 16 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_016',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 17 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_017',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 18 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_018',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 19 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_019',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 20 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_020',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 21 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_021',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 22 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_022',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 23 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_023',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 24 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_024',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 25 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_025',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 26 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_026',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 27 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_027',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 28 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_028',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 29 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_029',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 30 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_030',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 31 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_031',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 32 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_032',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 33 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_033',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 34 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_034',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 35 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_035',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 36 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_036',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 37 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_037',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 38 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_038',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 39 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_039',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 40 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_040',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 41 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_041',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 42 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_042',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 43 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_043',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 44 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_044',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 45 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_045',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 46 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_046',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait B. Mekanisme Fokus Kamera. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 47 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_047',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait C. Format File Digital. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 48 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_048',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait D. White Balance (WB). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 49 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_049',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait E. Karakteristik Lensa. Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 50 (CP 3)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_3_050',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Saat memotret subjek yang bergerak sangat cepat dalam kondisi pencahayaan redup (low light) menggunakan kamera Mirrorless, seorang fotografer dihadapkan pada dilema eksposur terkait A. Segitiga Eksposur (Exposure Triangle). Jika fotografer memprioritaskan shutter speed tinggi untuk membekukan gerakan namun ingin menghindari digital noise yang parah, analisislah kombinasi parameter eksposur yang paling optimal!',
  'Membuka aperture selebar mungkin (f-number terkecil), menaikkan ISO secara moderat, dan memanfaatkan format RAW untuk kompensasi shadow saat editing.',
  'Menggunakan aperture terkecil (f/22) agar ketajaman merata dan memaksimalkan nilai ISO hingga batas tertinggi kamera.',
  'Menurunkan shutter speed secara drastis dan mengandalkan kestabilan tangan tanpa bantuan tripod.',
  'Mengubah format file menjadi JPEG terkecil agar proses penulisan data ke kartu memori menjadi lebih instan.',
  0,
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C4',
  'Analisis: Memecahkan dilema exposure triangle (C4) dengan memaksimalkan light gathering lewat aperture, menjaga ISO aman, dan mengandalkan fleksibilitas data RAW.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_3',
  'tp_dkv_pil_11_3_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 1 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_001',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 2 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_002',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 3 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_003',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 4 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_004',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 5 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_005',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 6 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_006',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 7 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_007',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 8 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_008',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 9 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_009',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 10 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_010',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 11 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_011',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 12 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_012',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 13 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_013',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 14 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_014',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 15 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_015',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 16 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_016',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 17 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_017',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 18 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_018',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 19 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_019',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 20 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_020',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 21 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_021',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 22 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_022',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 23 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_023',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 24 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_024',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 25 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_025',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 26 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_026',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 27 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_027',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 28 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_028',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 29 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_029',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 30 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_030',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 31 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_031',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 32 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_032',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 33 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_033',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 34 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_034',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 35 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_035',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 36 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_036',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 37 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_037',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 38 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_038',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 39 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_039',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 40 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_040',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 41 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_041',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 42 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_042',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 43 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_043',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 44 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_044',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 45 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_045',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 46 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_046',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan B. Koreksi Warna Dasar (Color Correction) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 47 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_047',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan C. Penyelarasan Warna Estetis (Color Grading) sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 48 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_048',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan D. Teknik Retouching Digital sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 49 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_049',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan E. Manajemen Output dan Ekspor sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 50 (CP 4)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_4_050',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang editor foto DKV menerima file komersial untuk baliho cetak berukuran besar, namun menemukan bahwa color space file tersebut berada dalam format sRGB standar web. Analisislah dampak serta langkah korektif pascaproduksi digital berdasarkan A. Workflow Digital Perangkat Lunak sebelum file dikirim ke mesin cetak offset!',
  'Langsung mencetak file tanpa perubahan karena sRGB memiliki cakupan warna paling luas untuk mesin cetak skala besar.',
  'Mengonversi profil warna ke CMYK/Adobe RGB secara non-destructive, memeriksa color gamut warning, dan melakukan soft proofing untuk meminimalkan pergeseran warna.',
  'Menaikkan nilai saturation hingga 100% pada Adobe Photoshop untuk memaksa warna sRGB keluar secara paksa.',
  'Mengubah resolusi file menjadi 72 DPI agar ukuran file mengecil dan proses rendering cetak berjalan lebih cepat.',
  1,
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Melakukan analisis dan evaluasi (C4/C5) terhadap manajemen ruang warna industri untuk kebutuhan konversi output cetak presisi.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_4',
  'tp_dkv_pil_11_4_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 1 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_001',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 2 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_002',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 3 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_003',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 4 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_004',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 5 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_005',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 6 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_006',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 7 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_007',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 8 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_008',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 9 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_009',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 10 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_010',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 11 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_011',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 12 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_012',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 13 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_013',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 14 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_014',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 15 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_015',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 16 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_016',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 17 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_017',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 18 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_018',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 19 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_019',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 20 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_020',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 21 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_021',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 22 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_022',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 23 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_023',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 24 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_024',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 25 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_025',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 26 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_026',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 27 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_027',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 28 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_028',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 29 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_029',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 30 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_030',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 31 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_031',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 32 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_032',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 33 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_033',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 34 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_034',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 35 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_035',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 36 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_036',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 37 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_037',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 38 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_038',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 39 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_039',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 40 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_040',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 41 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_041',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 42 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_042',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 43 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_043',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 44 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_044',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 45 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_045',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 46 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_046',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait B. Kategori Fotografi Komersial dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 47 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_047',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait C. Hak Kekayaan Intelektual (HKI) dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 48 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_048',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait D. Manajemen File dan Pengarsipan dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 49 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_049',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait E. Presentasi Bisnis dan Platform dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- Soal 50 (CP 5)
INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
(
  'q_dkv_pil_11_5_050',
  '11DKV',
  'Mata Pelajaran Pilihan',
  'Seorang lulusan SMK DKV ingin mengunggah karya fotografi komersialnya ke platform portfolio digital publik untuk menarik klien korporat. Namun, karya tersebut memuat wajah model profesional tanpa adanya dokumen legal tertulis. Analisislah risiko hukum terkait A. Konsep Portofolio Kreatif dan solusi manajerial yang harus ditempuh!',
  'Tidak ada risiko karena portofolio bersifat edukasi non-komersial sehingga bebas dari jerat hukum hak cipta.',
  'Risiko pelanggaran privasi dan hak ekonomi model tinggi; solusinya fotografer wajib mengamankan Model Release tertulis sebelum mempublikasikannya.',
  'Solusinya adalah mengaburkan (blur) seluruh wajah model secara total hingga estetika foto hilang.',
  'Risiko dapat dihindari dengan mendaftarkan foto tersebut ke HKI atas nama fotografer secara sepihak tanpa persetujuan model.',
  1,
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Fotografi Komersial',
  true,
  'pilihan_ganda',
  'C5',
  'Analisis: Mengevaluasi aspek legalitas regulasi (C5) dalam manajemen portofolio komersial desain komunikasi visual.',
  'Opsi lain tidak sesuai dengan prinsip pencahayaan yang tepat.',
  'cp_dkv_pil_11_5',
  'tp_dkv_pil_11_5_1',
  NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- VERIFIKASI
-- ============================================================
-- SELECT cp."kodeCP", COUNT(q.id) AS jumlah_soal
-- FROM "Question" q
-- JOIN "CapaianPembelajaran" cp ON q."cpId" = cp.id
-- WHERE q.subject = 'Mata Pelajaran Pilihan' AND q."gradeLevel" = '11DKV'
-- GROUP BY cp."kodeCP" ORDER BY cp."kodeCP";
-- Expected: 5 CP × 50 soal = 250 soal total