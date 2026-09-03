-- ============================================================
-- SKRIP SQL: Insert CP, TP, dan Materi untuk Mapel Pilihan Kelas 11 DKV
-- Sumber: Modul Terpadu Fotografi Komersial DKV
-- Mata Pelajaran: "Mata Pelajaran Pilihan"
-- Kelas: 11DKV
-- ============================================================
--
-- CARA PAKAI:
-- 1. Buka Supabase → SQL Editor → New query
-- 2. Salin seluruh skrip ini → paste → Run
-- 3. Tunggu "Success. No rows returned"
-- ============================================================

-- ── CP 1: Menguasai Teknik Pencahayaan Studio ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_dkv_pil_11_1', 'Mata Pelajaran Pilihan', '11DKV', 'CP.DKV.1',
  'Siswa mampu menganalisis karakter cahaya, memodifikasi intensitas, dan merancang skema pencahayaan studio untuk fotografi komersial.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_dkv_pil_11_1_1', 'cp_dkv_pil_11_1', 'TP.DKV.1.1',
  'Siswa dapat menguasai teknik pencahayaan studio untuk fotografi komersial.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_dkv_pil_11_1',
  'Bab 1: Menguasai Teknik Pencahayaan Studio',
  '# Bab 1: Menguasai Teknik Pencahayaan Studio

## Deskripsi Kompetensi
Siswa mampu menganalisis karakter cahaya, memodifikasi intensitas, dan merancang skema pencahayaan studio untuk fotografi komersial.

## A. Teori Dasar Pencahayaan

### 1. Dua Sumber Cahaya Utama
- **Natural Light**: cahaya matahari, fleksibel tapi tidak terkontrol penuh.
- **Artificial Light**: lampu studio (strobe, speedlight, continuous) yang bisa diatur.

### 2. Jenis-Jenis Artificial Light
- **Strobe/Monolight** — lampu kilat studio berdaya besar (200–1000 W), sumber utama studio profesional.
- **Speedlight/Flash** — lampu kilat kecil di kamera; fleksibel tapi berdaya terbatas.
- **Continuous Light (LED/Tungsten)** — menyala terus, bayangan bisa dilihat sebelum memotret; perlu diperhatikan suhu warna (Kelvin).

### 3. Fisika Cahaya
- **Inverse-Square Law**: Intensitas ∝ 1/Jarak². Jarak 1m → 2m = intensitas turun menjadi 1/4 (bukan 1/2).
- Menggeser lampu sedikit saat dekat subjek = eksposur berubah drastis.
- **CRI (Color Rendering Index)**: kemampuan sumber cahaya mereproduksi warna secara akurat. Standar komersial: CRI > 95.

## B. Karakteristik Cahaya

### 1. Hard Light vs Soft Light
- **Hard Light**: bayangan tajam, kontras tinggi (sumber kecil/langsung).
- **Soft Light**: bayangan lembut, kontras rendah (sumber besar/diffused).

### 2. Anatomi Bayangan
- **Umbra (Core Shadow)**: bayangan terdalam, gelap total.
- **Penumbra (Transition Edge)**: gradasi transisi gelap–terang. Lebar penumbra ditentukan ukuran sumber cahaya + kedekatan.

### 3. Rasio Kontras (Key–Fill Ratio) — MATERI PENTING
Rasio kontras = perbandingan kecerahan sisi Key Light (terang) dengan sisi Fill Light (gelap).

**Kunci**: Gejala "bayangan terlalu pekat dan tajam" = rasio kontras TERLALU TINGGI. Solusinya: MENAMBAH/MEMPERBESAR FILL LIGHT.

### 4. Cara Mengecilkan Rasio Kontras
- Tambah fill light di sisi berlawanan Key Light.
- Gunakan modifier lunak (softbox besar / umbrella).
- Gunakan reflector board untuk memantulkan cahaya Key ke area gelap.
- Dekatkan fill light ke subjek (ingat Inverse-Square Law).

## C. Setup Pencahayaan Studio

### 1. Three-Point Lighting (Standar Industri)
- **Key Light**: sumber utama, arah 45° dari kamera.
- **Fill Light**: sumber sekunder, sisi berlawanan, intensitas lebih rendah.
- **Back/Rim Light**: belakang subjek, memisahkan dari background.

### 2. Pola Pencahayaan Potret Lanjutan
- **Rembrandt**: segitiga cahaya di pipi.
- **Butterfly/Paramount**: cahaya dari depan atas, bayangan kupu-kupu di bawah hidung.
- **Loop**: bayangan hidung membentuk loop di pipi.
- **Split**: cahaya 90° samping, setengah wajah gelap.

## D. Aksesori Studio (Light Modifier)
- **Softbox**: melembutkan cahaya, ukuran besar = lebih lembut.
- **Umbrella**: reflector atau shoot-through, ekonomis.
- **Reflector Board**: memantulkan cahaya, fill light tanpa listrik.
- **Snoot/Honeycomb**: memusatkan cahaya ke area kecil.
- **Gel/Filter**: mengubah warna cahaya.

**Kunci**: Soal "mengurangi kepekatan bayangan" → pilih modifier lunak/lebar. Soal "memusatkan cahaya" → pilih snoot/honeycomb.

## E. Pengukuran Cahaya & Sinkronisasi

### 1. Light Meter
- **Incident meter** (dari subjek mengarah ke lampu): mengukur cahaya yang JATUH ke subjek — standar studio.
- **Reflected meter** (mengarah ke subjek): mengukur cahaya dipantulkan — cara kerja meter kamera.
- Mengukur rasio: ukur sisi Key, ukur sisi Fill → bandingkan (misal f/8 vs f/5.6 = rasio 1:2).

### 2. Sync Speed & HSS
- **Sync speed**: batas kecepatan rana sinkron dengan flash = 1/160s – 1/250s.
- Melampaui batas tanpa HSS → pita hitam setengah frame.
- **HSS (High-Speed Sync)**: flash memancarkan rentetan pulsa kilatan kecil selama tirai menyapu sensor.',
  'Mata Pelajaran Pilihan', '11DKV', 'SMK', 'Fotografi Komersial',
  'cp_dkv_pil_11_1', 'tp_dkv_pil_11_1_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── CP 2: Memahami Komposisi Estetika Fotografi ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_dkv_pil_11_2', 'Mata Pelajaran Pilihan', '11DKV', 'CP.DKV.2',
  'Siswa mampu mengevaluasi struktur visual gambar berdasarkan aturan estetika akademis untuk mengarahkan perhatian pemirsa.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_dkv_pil_11_2_1', 'cp_dkv_pil_11_2', 'TP.DKV.2.1',
  'Siswa dapat mengevaluasi komposisi estetika fotografi untuk kebutuhan DKV.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_dkv_pil_11_2',
  'Bab 2: Memahami Komposisi Estetika Fotografi',
  '# Bab 2: Memahami Komposisi Estetika Fotografi

## Deskripsi Kompetensi
Siswa mampu mengevaluasi struktur visual gambar berdasarkan aturan estetika akademis untuk mengarahkan perhatian pemirsa.

## 1. Geometri Visual Penuntun Mata
- **Rule of Thirds**: frame dibagi 9 kotak; objek pada 4 titik persimpangan → dinamis & seimbang.
- **Leading Lines**: garis natural/buatan menuntun mata ke objek utama.
- **Golden Ratio (Fibonacci Spiral)**: objek di pusaran spiral; tata letak paling nyaman bagi otak manusia.

## 2. Teori Gestalt dalam Tata Letak DKV
- **Proximity**: elemen dekat satu sama lain dipersepsi sebagai grup.
- **Similarity**: elemen serupa (warna/bentuk) dipersepsi sebagai unit.
- **Continuity**: mata mengikuti garis/bentuk yang mengalir.
- **Closure**: otak melengkapi bentuk tidak utuh.
- **Figure-Ground**: pemisahan subjek (figure) dari latar (ground).

## 3. Analisis Ruang: Positive & Negative Space
- **Positive Space**: area yang diisi subjek utama.
- **Negative Space**: area kosong di sekitar subjek.
- Fungsi strategis DKV: ruang wajib untuk copywriting, logo, CTA. Memberi kesan premium, eksklusif.

## 4. Kedalaman Dimensi (Visual Layers)
- **Foreground**: elemen depan subjek (biasanya blur) sebagai bingkai pembuka.
- **Midground**: area objek utama dengan fokus paling tajam.
- **Background**: pendukung konteks atau diburamkan untuk isolasi objek.
- **Framing in Framing**: elemen lingkungan (jendela, celah pintu) membingkai subjek.

## 5. Psikologi Sudut Pandang & Dinamika Garis
- **Eye-level**: netral, jujur.
- **Low angle**: dominan, kuat, menjulang.
- **High angle**: rentan, kecil, tidak berdaya.
- **Bird-eye**: abstrak, pola, konteks luas.
- Garis diagonal = dinamis/tensi; garis horizontal = tenang; garis vertikal = kekuatan.

## 6. Harmoni Warna dalam DKV
- **Complementary**: warna berlawanan di color wheel (biru-oranye) → kontras maksimal.
- **Analogous**: warna bersebelahan → harmoni lembut.
- **Monochromatic**: satu warna, berbagai nilai → elegan.
- **Triadic**: tiga warna sama jarak → vibrant tapi seimbang.',
  'Mata Pelajaran Pilihan', '11DKV', 'SMK', 'Komposisi & Estetika',
  'cp_dkv_pil_11_2', 'tp_dkv_pil_11_2_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── CP 3: Mengoperasikan Kamera DSLR/Mirrorless ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_dkv_pil_11_3', 'Mata Pelajaran Pilihan', '11DKV', 'CP.DKV.3',
  'Siswa mampu menghitung eksposur secara mekanis dan menentukan karakteristik optik lensa untuk menghasilkan foto komersial.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_dkv_pil_11_3_1', 'cp_dkv_pil_11_3', 'TP.DKV.3.1',
  'Siswa dapat mengoperasikan kamera DSLR/Mirrorless untuk fotografi komersial.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_dkv_pil_11_3',
  'Bab 3: Mengoperasikan Kamera DSLR/Mirrorless',
  '# Bab 3: Mengoperasikan Kamera DSLR/Mirrorless

## Deskripsi Kompetensi
Siswa mampu menghitung eksposur secara mekanis dan menentukan karakteristik optik lensa untuk menghasilkan foto komersial.

## 1. Segitiga Eksposur
- **ISO**: sensitivitas sensor. ISO tinggi = lebih terang tapi noise. Standar studio: ISO 100.
- **Aperture (Bukaan)**: ukuran lubang diafragma. f/kecil = bukaan besar = bokeh. f/besar = fokus luas.
- **Shutter Speed**: kecepatan rana. Cepat = bekukan gerak. Lambat = motion blur.

## 2. Kalkulasi Stop & Hukum Resiprositas
Deret standar aperture (tiap langkah = ½ cahaya):
f/1.4 → f/2 → f/2.8 → f/4 → f/5.6 → f/8 → f/11 → f/16 → f/22

**Studi Kasus:**
Setelan awal: ISO 100, f/8, 1/125s (eksposur sempurna).
Ingin bokeh ekstrem → ubah ke f/2.8 = +3 stop = cahaya 8× lebih banyak (overexposed).
Solusi resiprokal: percepat rana 3 stop: 1/125 → 1/250 → 1/500 → 1/1000s.

## 3. Fisika Lensa & Focal Length
- **Wide (14–35mm)**: perspektif luas, distorsi tepi.
- **Standard (50mm)**: natural, mirip mata manusia.
- **Tele (85–200mm)**: kompresi latar, isolasi subjek, bokeh creamy.
- **Macro (1:1)**: detail ekstrem untuk produk kecil.

## 4. Difraksi & Sweet Spot Lens
- **Mitos**: bukaan terkecil (f/22) ≠ ketajaman maksimum.
- **Difraksi**: lubang terlalu kecil → gelombang cahaya berinterferensi → seluruh foto menjadi soft.
- **Sweet spot**: 2–3 stop di atas bukaan maksimal (lensa f/1.8 → tajam di f/5.6–f/8).

## 5. Depth of Field & Jarak Hiperfokal
- DoF menyempit jika: bukaan besar, lensa panjang, kamera dekat subjek.
- **Hyperfocal Distance**: fokus di titik ini → ruang tajam membentang dari setengah jarak tersebut hingga ∞.

## 6. RAW vs JPEG & White Balance
- **RAW**: data mentah penuh, dynamic range luas; detail shadow/highlight bisa diselamatkan.
- **JPEG**: terkompresi, siap pakai; hancur jika diedit ekstrem.
- **White Balance (Kelvin)**: Tungsten ≈ 3200K (kuning); matahari siang ≈ 5500K (netral). Foto menguning → preset Tungsten.',
  'Mata Pelajaran Pilihan', '11DKV', 'SMK', 'Kamera & Optik',
  'cp_dkv_pil_11_3', 'tp_dkv_pil_11_3_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── CP 4: Melakukan Pascaproduksi Digital ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_dkv_pil_11_4', 'Mata Pelajaran Pilihan', '11DKV', 'CP.DKV.4',
  'Siswa mampu mengevaluasi restorasi visual, memanipulasi rentang dinamis, dan merancang color grading untuk foto komersial.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_dkv_pil_11_4_1', 'cp_dkv_pil_11_4', 'TP.DKV.4.1',
  'Siswa dapat melakukan pascaproduksi digital untuk foto komersial.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_dkv_pil_11_4',
  'Bab 4: Melakukan Pascaproduksi Digital',
  '# Bab 4: Melakukan Pascaproduksi Digital

## Deskripsi Kompetensi
Siswa mampu mengevaluasi restorasi visual, memanipulasi rentang dinamis, dan merancang color grading untuk foto komersial.

## 1. Non-Destructive Editing
Penyuntingan profesional tidak boleh merusak piksel asli. Gunakan Lightroom (catalog) atau Adjustment Layers & Smart Object di Photoshop.

## 2. Rekayasa Data: Bit Depth
- **8-bit**: 256 level per channel (16.7 juta warna) — JPEG standar.
- **16-bit**: 65.536 level per channel — RAW editing, gradasi halus.
- Editing ekstrem di 8-bit → banding (posterisasi).

## 3. Anatomi Histogram
- Distribusi kecerahan: kiri (Shadows/Blacks) — tengah (Midtones) — kanan (Highlights/Whites).
- Menempel kiri ekstrem = Underexposed (detail hitam mati).
- Menempel kanan ekstrem = Clipping/Overexposed (putih total tanpa data).
- Eksposur ideal: grafik seimbang, tidak menempel dinding.

## 4. Matematika Kurva Kontras (Tone Curve)
- Sumbu X = input piksel asli; sumbu Y = output baru.
- **S-Curve**: naikkan Highlights (kanan), turunkan Shadows (kiri) → kontras organik.
- **Faded Matte Look**: tarik True Black ke atas → hitam menjadi abu-abu → estetika retro.

## 5. Color Correction vs Color Grading
- **Color Correction**: menetralkan warna agar akurat (white balance, exposure).
- **Color Grading**: memberi gaya/mood kreatif (teal-orange, vintage, noir).
- Panel HSL: Hue (karakter warna), Saturation (kepekatan), Luminance (kecerahan per warna).

## 6. Retouching Industri: Frequency Separation
- **Low Frequency layer**: gradasi warna, bayangan, transisi cahaya (tanpa tekstur).
- **High Frequency layer**: pori-pori, rambut, tekstur kain (tanpa warna).
- Manfaat: meratakan kulit belang tanpa merusak pori asli → mulus tetapi alami.',
  'Mata Pelajaran Pilihan', '11DKV', 'SMK', 'Pascaproduksi Digital',
  'cp_dkv_pil_11_4', 'tp_dkv_pil_11_4_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── CP 5: Mengelola Portofolio Komersial DKV ──
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'cp_dkv_pil_11_5', 'Mata Pelajaran Pilihan', '11DKV', 'CP.DKV.5',
  'Siswa mampu menyusun kurasi karya, menganalisis regulasi legalitas industri, dan menyusun strategi bisnis fotografi.',
  true, NOW(), NOW()
) ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES (
  'tp_dkv_pil_11_5_1', 'cp_dkv_pil_11_5', 'TP.DKV.5.1',
  'Siswa dapat mengelola portofolio komersial dan memahami aspek legalitas fotografi.',
  true, NOW(), NOW()
) ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES (
  'mat_dkv_pil_11_5',
  'Bab 5: Mengelola Portofolio Komersial DKV',
  '# Bab 5: Mengelola Portofolio Komersial DKV

## Deskripsi Kompetensi
Siswa mampu menyusun kurasi karya, menganalisis regulasi legalitas industri, dan menyusun strategi bisnis fotografi.

## 1. Logika Kurasi: Quality Over Quantity
5–10 foto mahakarya dengan konsistensi tema & style kuat > 50 foto acak yang menurunkan profesionalisme di mata agensi.

## 2. Segmentasi Pasar
- **Still Life & Product**: bentuk geometris, detail material, pencahayaan presisi.
- **Food Photography**: kesegaran & kelezatan; kolaborasi Food Stylist.
- **Fashion Photography**: pakaian, gaya hidup, ekspresi model untuk identitas merek.
- **Corporate/Industrial**: profesional, clean, brand identity.

## 3. Alur Kerja Fotografi Industri
- Briefing klien → moodboard → pre-production → shooting → post-production → delivery → archive.

## 4. Aspek Hukum (HKI)
- **Copyright**: hak cipta melekat pada fotografer kecuali dialihkan kontrak.
- **Work for Hire**: klien punya hak penuh jika ada kontrak eksplisit.
- **Lisensi**: penggunaan terbatas (duration, territory, medium).
- Analisis Legalitas: Klien membayar service fee lalu menjual foto tanpa izin = pelanggaran hak cipta.

## 5. Manajemen Data Digital
### Backup 3-2-1:
- 3 salinan data (1 kerja + 2 cadangan)
- 2 jenis media berbeda (SSD + NAS)
- 1 salinan off-site (Cloud)

### Naming Convention:
TAHUNBULANHARI_NAMA-KLIEN_KODE-PRODUK_NOMOR-SERI.RAW
Contoh: 20260903_Samsung_GalaxyS27_001.RAW

### IPTC Metadata:
Nama fotografer, deskripsi, keywords, status lisensi tertanam dalam file.',
  'Mata Pelajaran Pilihan', '11DKV', 'SMK', 'Portofolio & Bisnis',
  'cp_dkv_pil_11_5', 'tp_dkv_pil_11_5_1', true, 'teks', NOW(), NOW()
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- VERIFIKASI
-- ============================================================
-- SELECT kodeCP, deskripsi FROM "CapaianPembelajaran" 
-- WHERE subject = 'Mata Pelajaran Pilihan' AND "gradeLevel" = '11DKV';
-- Expected: 5 CP (CP.DKV.1 s/d CP.DKV.5)
--
-- SELECT "kodeTP", deskripsi FROM "TujuanPembelajaran" tp
-- JOIN "CapaianPembelajaran" cp ON tp."cpId" = cp.id
-- WHERE cp.subject = 'Mata Pelajaran Pilihan' AND cp."gradeLevel" = '11DKV';
-- Expected: 5 TP
--
-- SELECT title, category FROM "Material" 
-- WHERE subject = 'Mata Pelajaran Pilihan' AND "targetKelas" = '11DKV';
-- Expected: 5 Materi
