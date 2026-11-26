#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Ujian Teori Kelas 11 DKV — Mata Pelajaran Pilihan
Tanggal: 27 November 2026
Waktu Akses: 09:00 - 10:30 WIB (90 menit)
Materi: Fotografi Dasar, Adobe Illustrator, Blender Dasar

Menghasilkan 2 output:
1. Materi Persiapan Ujian (3 bab, bisa diakses kapan saja)
2. 50 Soal PG dengan stimulus anti-AI + Assignment dengan window akses

Anti-AI strategy untuk soal:
- Stimulus spesifik dengan kombinasi parameter (misal: "Aperture f/1.8 + ISO 1600 + Shutter 1/30")
- Pertanyaan troubleshooting aplikasi (kasus error, langkah perbaikan)
- Reasoning multi-step (bukan definisi murni)
- Istilah menu/panel spesifik yang cuma user aplikasi yang tahu
- Sertakan kondisi "apa yang terjadi jika..."
"""

import os

OUTPUT_PATH = "/home/z/my-project/download/insert_ujian_teori_k11_dkv.sql"
# 27 November 2026, 09:00 - 10:30 WIB (UTC+7)
# PENTING: Kolom openAt & closeAt di DB HARUS tipenya TIMESTAMPTZ
# (TIMESTAMP WITH TIME ZONE). Jika masih TIMESTAMP WITHOUT TIME ZONE,
# jalankan dulu: download/fix_migration_openat_closeat_timestamptz.sql
#
# Dengan TIMESTAMPTZ, offset +07:00 di-respect:
#   '2026-11-27T09:00:00+07:00' → disimpan sebagai 02:00 UTC
#   Browser di Asia/Jakarta (UTC+7) → render sebagai 09:00 WIB ✓
OPEN_AT = "2026-11-27T09:00:00+07:00"   # 27 Nov 2026 09:00 WIB
CLOSE_AT = "2026-11-27T10:30:00+07:00"  # 27 Nov 2026 10:30 WIB
DUE_DATE = "2026-11-27T10:30:00+07:00"  # 27 Nov 2026 10:30 WIB (sama dengan closeAt)
GRADE = "11DKV"
SUBJECT = "Mata Pelajaran Pilihan"


def sql_escape(text):
    if text is None:
        return ""
    return text.replace("'", "''").replace("\n", "\\n")


def sql_str(text):
    return f"'{sql_escape(text)}'"


# ════════════════════════════════════════════════════════════════════════
# MATERI PERSIAPAN UJIAN — 3 BAB (bisa diakses kapan saja)
# ════════════════════════════════════════════════════════════════════════

MATERI_FOTOGRAFI = """# Materi Persiapan Ujian: Fotografi Dasar

## A. Kamera dan Jenisnya

### 1. DSLR vs Mirrorless
- **DSLR (Digital Single-Lens Reflex)**: punya cermin (mirror) yang memantulkan cahaya dari lensa ke viewfinder. Saat jepret, cermin naik, shutter terbuka, sensor menangkap cahaya. Contoh: Canon EOS 5D, Nikon D850.
- **Mirrorless**: TIDAK punya cermin. Cahaya langsung ke sensor, preview via electronic viewfinder (EVF) atau LCD. Lebih ringan, lebih cepat burst. Contoh: Sony A7, Canon R5, Fuji X-T.

### 2. Sensor: Full Frame vs Crop (APS-C)
- **Full Frame (36×24mm)**: sensor seukuran film 35mm. Low light better, bokeh lebih creamy, wide angle tetap wide.
- **APS-C (≈23.6×15.6mm)**: sensor lebih kecil. Crop factor 1.5x (Nikon/Sony) atau 1.6x (Canon). Lensa 50mm di APS-C = setara 75mm di full frame.

## B. Exposure Triangle (Segitiga Eksposur)

Tiga parameter yang menentukan kecerahan foto:

### 1. Aperture (Bukaan Lensa) — f/number
- f/1.4, f/1.8, f/2.8 = BUKAAN LEBAR (lebih banyak cahaya, depth of field sempit = background blur)
- f/8, f/11, f/16 = BUKAAN SEMPIT (sedikit cahaya, depth of field lebar = semua tajam)
- f-number KECIL = bukaan LEBAR. f-number BESAR = bukaan SEMPIT.

### 2. Shutter Speed (Kecepatan Rana)
- 1/4000s, 1/2000s, 1/1000s = CEPAT (bekukan gerakan, olahraga)
- 1/60s = standar handheld (lebih lambat dari ini rawan blur)
- 1s, 5s, 30s = LAMBAT (light trail, waterfall halus, astrophotography)
- Rule of thumb: shutter >= 1/focal length. Lensa 50mm → minimal 1/50s handheld.

### 3. ISO (Sensitivitas Sensor)
- ISO 100, 200 = rendah (cahaya terang, noise minimal)
- ISO 800, 1600 = sedang (indoor, low light)
- ISO 6400, 12800 = tinggi (sangat gelap, noise tinggi = grain)

### 4. Hubungan Segitiga
- Naikkan aperture (f/16 → f/4) = +3 stop cahaya, DOF sempit
- Percepat shutter (1/30 → 1/250) = -3 stop cahaya, beku gerakan
- Naikkan ISO (100 → 800) = +3 stop cahaya, noise naik

## C. Komposisi Fotografi

### 1. Rule of Thirds
Bagi frame jadi 9 kotak (3x3). Letakkan subjek utama di titik potong (intersection point), BUKAN di tengah.

### 2. Leading Lines
Garis (jalan, rel, sungai) yang mengarah ke subjek. Membuat mata penonton terarah.

### 3. Framing
Gunakan elemen di sekitar (pintu, jendela, cabang pohon) untuk "membingkai" subjek.

### 4. Symmetry & Pattern
Komposisi simetris (refleksi air, gedung) atau pola berulang menarik perhatian.

### 5. Negative Space
Ruang kosong di sekitar subjek. Memberi "napas" dan menonjolkan subjek.

## D. Pencahayaan (Lighting)

### 1. Karakter Cahaya
- **Hard light**: sumber kecil, bayangan tegas (matahari siang, flash langsung). Kontras tinggi.
- **Soft light**: sumber besar/diffuse, bayangan halus (mendung, softbox). Kontras rendah.

### 2. Arah Cahaya
- **Front lighting**: cahaya dari depan subjek. Subjek terang, flat.
- **Side lighting**: dari samping. Tekstur muncul, dimensi 3D.
- **Backlighting**: dari belakang. Siluet, halo effect.
- **Top lighting**: dari atas (tengah hari). Bayangan di mata/bawah hidung.

### 3. White Balance (WB)
Suhu warna cahaya diukur Kelvin (K):
- 3200K = Tungsten (lampu pijar) — kekuningan
- 5500K = Daylight (matahari) — netral
- 7500K = Shade/Awan — kebiruan
WB salah → foto terlalu kuning atau biru. Set WB sesuai sumber cahaya.

## E. Depth of Field (DoF)

Jarak area yang tajam dalam foto.
- **DoF Sempit (shallow)**: aperture lebar (f/1.8), lensa tele (85mm), jarak dekat. Hanya subjek tajam, background blur (bokeh).
- **DoF Lebar (deep)**: aperture sempit (f/11), lensa wide (16mm), jarak jauh. Semua tajam (landscape).

## F. Focal Length (Panjang Fokus)

- **Wide angle (10-24mm)**: sudut lebar, distorsi pinggir. Cocok landscape, arsitektur.
- **Standard (35-50mm)**: sudut mirip mata manusia. Serbaguna.
- **Telephoto (85-200mm)**: sudut sempit, kompresi background. Cocok portrait, olahraga, wildlife.
- **Macro (50-100mm macro)**: fokus sangat dekat. Serangga, detail bunga.

## G. Format File
- **JPEG**: compressed, 8-bit, langsung jadi. Cocok sharing.
- **RAW**: tidak terkompresi, 12-14 bit, perlu post-process (Lightroom, Camera Raw). Lebih fleksibel untuk editing exposure, WB, shadow.
"""

MATERI_ILLUSTRATOR = """# Materi Persiapan Ujian: Adobe Illustrator Dasar

## A. Konsep Vector vs Raster

### 1. Raster (Bitmap)
- Terdiri dari pixel. Contoh: foto dari kamera/camera, JPEG, PNG, PSD Photoshop.
- Perbesar = pecah (pixelated). Tidak scalable tanpa kehilangan kualitas.
- Resolusi diukur PPI (pixel per inch). Web = 72 PPI, print = 300 PPI.

### 2. Vector
- Terdiri dari path matematis (titik + garis kurva). Contoh: logo, ilustrasi, font.
- Perbesar berapa pun = tetap tajam. Scalable tanpa batas.
- Ukuran file kecil, tidak tergantung resolusi.

Illustrator = editor VECTOR. Photoshop = editor RASTER (meskipun keduanya bisa campur).

## B. Workspace Illustrator

### 1. Komponen Utama
- **Menu Bar** (atas): File, Edit, Object, Type, Select, Effect, View, Window, Help
- **Tools Panel** (kiri): Selection (V), Direct Selection (A), Pen (P), Type (T), Rectangle (M), Ellipse (L), Paintbrush (B), Eyedropper (I), dll.
- **Control Panel** (atas, di bawah menu): kontekstual sesuai tool terpilih
- **Panels** (kanan): Color, Swatches, Layers, Align, Pathfinder, Stroke, Gradient, dll. Akses via menu Window.
- **Artboard**: kanvas kerja. 1 file .ai bisa punya multiple artboard.
- **Pasteboard**: area di luar artboard. Bisa taruh elemen sementara.

### 2. Shortcut Penting
- V = Selection Tool
- A = Direct Selection Tool (pilih anchor point individual)
- P = Pen Tool
- T = Type Tool
- M = Rectangle Tool
- L = Ellipse Tool
- Ctrl+Z = Undo, Ctrl+Shift+Z = Redo
- Ctrl+C = Copy, Ctrl+V = Paste, Ctrl+F = Paste in Front, Ctrl+B = Paste in Back
- Ctrl+G = Group, Ctrl+Shift+G = Ungroup
- Ctrl+2 = Lock, Ctrl+Alt+2 = Unlock All
- Ctrl+3 = Hide, Ctrl+Alt+3 = Show All
- Ctrl+Shift+O = Create Outlines (ubah teks jadi shape)

## C. Tools Utama

### 1. Pen Tool (P)
- Klik = titik sudut (corner point)
- Klik + drag = titik kurva (smooth point)
- Alt + drag handle = ubah ke corner
- P = close path (klik titik pertama)
- Tool paling powerful di Illustrator. Wajib dikuasai untuk tracing.

### 2. Shape Tools
- Rectangle (M): klik-drag = buat persegi. Shift = kotak sempurna. Alt = dari pusat.
- Ellipse (L): klik-drag = buat lingkaran. Shift = lingkaran sempurna.
- Polygon, Star, dll: klik = dialog ukuran.

### 3. Pathfinder (Window > Pathfinder)
Operasi boolean antar shape:
- **Unite (Add)**: gabung jadi 1 shape
- **Minus Front (Subtract)**: shape depan "memotong" shape belakang
- **Intersect**: hanya area yang tumpang tindih
- **Exclude**: hapus area tumpang tindih, sisanya jadi shape
- **Divide**: potong jadi banyak shape di area intersection

### 4. Shape Builder (Shift+M)
Alternatif visual Pathfinder. Drag antar shape untuk gabung, Alt+klik untuk hapus area.

### 5. Type Tool (T)
- Klik = point type (teks 1 baris, tidak wrap)
- Drag = area type (teks di dalam shape, wrap otomatis)
- Type on Path = teks mengikuti garis/path
- Create Outlines (Ctrl+Shift+O) = ubah font jadi vector shape. Wajib sebelum kirim ke print shop (jaga-jaga font tidak tersedia).

## D. Layers & Organization

- Setiap layer bisa di-lock (🔒), hide (👁), atau lock position.
- Sub-layer: layer di dalam layer. Untuk organisasi kompleks.
- Send to Back (Ctrl+Shift+[), Send Backward (Ctrl+[)
- Bring to Front (Ctrl+Shift+]), Bring Forward (Ctrl+])
- Layer atas menutupi layer bawah.

## E. Color Management

### 1. Color Mode
- **RGB**: untuk digital (web, screen). 0-255 per channel. Tambah cahaya = putih.
- **CMYK**: untuk print. 0-100% per channel (Cyan, Magenta, Yellow, Black). Tambah tinta = hitam.
- File > Document Color Mode: ubah RGB ↔ CMYK.

### 2. Swatches
- Panel Swatches: simpan warna yang sering dipakai.
- Global color: ubah 1 swatch → semua objek yang pakai berubah otomatis.
- Spot color: warna khusus cetak (Pantone). Bukan campuran CMYK.

### 3. Stroke & Fill
- Fill = warna isi. Stroke = warna garis tepi.
- Stroke weight = ketebalan garis (1pt, 2pt, dst).
- Dashed line = garis putus-putus.

## F. Effects & Appearance

- Effect > Stylize > Drop Shadow: bayangan
- Effect > Warp > Arch/Bulge/Fish: lengkung shape
- Effect > 3D > Extrude & Bevel: beri kedalaman 3D
- Appearance panel: lihat semua effect yang sudah diterapkan. Bisa edit/hapus.
- Penting: Effect = non-destructive (bisa undo). Expand Appearance = konversi jadi shape permanen.

## G. Export & Save

### 1. Save (File > Save / Save As)
- .ai = format native Illustrator (editable, vector, layer tersimpan)
- .eps = format lama, kompatibel print, vector

### 2. Export (File > Export > Export As)
- .png = raster, transparan, untuk web
- .jpeg = raster, tidak transparan, untuk foto
- .svg = vector, untuk web (modern, scalable)
- .pdf = bisa vector + raster, untuk print/share
- Export for Screens (Ctrl+Alt+E): export multiple artboard sekaligus berbagai format.

### 3. Export Selection
- Pilih objek → File > Export Selection. Hanya objek terpilih yang di-export.

## H. Tips Workflow

1. Selalu kerja di layer terpisah (sketch, line, color, text)
2. Group objek yang berkaitan (Ctrl+G)
3. Beri nama layer deskriptif (bukan "Layer 1, Layer 2")
4. Save versi (File_v1.ai, File_v2.ai) sebelum perubahan besar
5. Gunakan Smart Guides (Ctrl+U) untuk snapping otomatis
6. Align panel: rata kiri/kanan/tengah, distribusi merata
"""

MATERI_BLENDER = """# Materi Persiapan Ujian: Aplikasi Blender Dasar

## A. Pengenalan Blender

Blender = software 3D open-source gratis. Untuk modeling, animasi, rendering, simulation, compositing, video editing, bahkan game creation.

### Versi
- Blender 4.x (terbaru): UI modern, EEVEE Next, Cycles improved.
- Blender 3.x: LTS (long term support), stabil.

## B. Interface (UI)

### 1. Screen Layout
- **Splash screen**: pilih template (General, 2D Animation, Sculpting, Video Editing, dll)
- **Top menu bar**: File, Edit, Render, Window, Help
- **Tabs (top)**: Layout, Modeling, Sculpting, UV Editing, Texture Paint, Shading, Animation, Rendering, Compositing, Scripting
- **Workspace preset**: klik tab untuk switch workspace

### 2. Editor Types (di Layout)
- **3D Viewport** (tengah): area kerja utama, lihat & edit objek 3D
- **Outliner** (kanan atas): daftar semua objek di scene (seperti layers di Illustrator)
- **Properties** (kanan bawah): pengaturan objek, modifier, material, light, render
- **Timeline** (bawah): keyframe animation
- **Toolbar** (kiri viewport): tools aktif (move, scale, rotate, annotate)

### 3. Navigation di 3D Viewport
- **Middle mouse button (MMB) drag** = orbit (putar kamera di sekitar scene)
- **Shift + MMB drag** = pan (geser kamera)
- **Scroll wheel** = zoom in/out
- **Numpad 0** = view dari kamera render
- **Numpad 1, 3, 7** = front, side, top view (orthographic)
- **Numpad 5** = toggle perspective/orthographic
- **Numpad .** = frame selected object
- **Home** = frame all objects

### 4. Shortcut Transformasi
- G = Grab (move)
- R = Rotate
- S = Scale
- Setelah tekan G/R/S, ketik angka = precise (G X 2 = move 2 unit di sumbu X)
- X/Y/Z setelah G/R/S = constrain ke sumbu
- Shift+X = constrain ke plane YZ (semua kecuali X)

## C. Object Mode vs Edit Mode

- **Object Mode**: pilih & transformasi objek utuh. Operasi: move, scale, rotate, duplicate, delete.
- **Edit Mode**: edit geometry (vertex, edge, face) di dalam objek. Tekan Tab untuk toggle.
- Di Edit Mode, ada 3 sub-mode: Vertex (1), Edge (2), Face (3) — tekan angka di keyboard.

### 1. Operasi Edit Mode
- Pilih vertex/edge/face: klik kanan (default Blender) atau klik kiri (Blender 2.8+)
- Extrude (E): tarik keluar dari face/edge untuk buat geometry baru
- Inset (I): buat face lebih kecil di dalam face
- Loop Cut (Ctrl+R): tambah edge loop melingkar
- Bevel (Ctrl+B): bulatkan sudut
- Merge (M): gabung vertex
- Subdivide: bagi face jadi lebih banyak

## D. Primitives (Objek Dasar)

Menu Add (Shift+A) di Object Mode:
- Mesh > Cube, Sphere, Cylinder, Plane, Cone, Torus, Monkey (Suzanne)
- Curve > Bezier, Path
- Surface > Plane, Sphere
- Metaball
- Light > Point, Sun, Spot, Area
- Camera

## E. Modifier

Modifier = operasi non-destructive yang mengubah geometry. Tidak permanen sampai di-Apply.
- **Subdivision Surface** (Ctrl+1/2/3): haluskan mesh. Viewport vs Render bisa beda level.
- **Mirror**: mirror geometry di sumbu. Berguna untuk simetri (wajah, mobil).
- **Boolean**: operasi union/difference/intersect antar 2 mesh.
- **Array**: duplikasi berulang dengan offset.
- **Solidify**: beri ketebalan pada plane (jadi volumetrik).
- **Bevel**: bulatkan sudut secara procedural.

Apply modifier = klik "Apply" di Properties > Modifier. Setelah apply, tidak bisa undo via modifier.

## F. Material & Shader

### 1. Material System
- Blender pakai node-based shader (Principled BSDF default)
- Properties > Material > New
- Principled BSDF: 1 shader untuk semua (metallic, roughness, specular, dll)

### 2. Parameter Penting
- **Base Color**: warna dasar
- **Metallic**: 0 = non-logam (kulit, kayu), 1 = logam (besi, emas)
- **Roughness**: 0 = mengkilap (kaca, cermin), 1 = matte (kertas, kapur)
- **Specular**: intensitas highlight
- **Emission**: warna yang dipancarkan (lampu, layar)

### 3. Shader Editor (Shader Nodes)
- Window > Shader Editor, atau split viewport
- Drag kabel dari socket ke socket
- Texture node (Image, Noise, Voronoi) → ColorRamp → Principled BSDF
- Mixing shader: Mix Shader (gabung 2 BSDF)

## G. Lighting

### 1. Jenis Light
- **Point**: cahaya omnidirectional (seperti bohlam)
- **Sun**: cahaya paralel (seperti matahari). Intensitas tinggi, bayangan tegas.
- **Spot**: cahaya kerucut (seperti spotlight panggung)
- **Area**: cahaya dari area persegi/lingkaran. Soft shadow. Cocok untuk studio.

### 2. World Lighting
- Properties > World > Surface > Background
- Color + Strength = ambient light
- HDRI: gambar 360° sebagai environment light (realistic reflection)

### 3. Three-Point Lighting (Setup Standar)
- **Key Light**: cahaya utama (paling terang, dari depan-samping)
- **Fill Light**: cahaya pengisi (sisi lain, lebih redup, haluskan bayangan)
- **Rim/Back Light**: cahaya belakang (pisahkan subjek dari background)

## H. Render Engine

### 1. EEVEE (Real-time)
- Render cepat (GPU real-time). Mirip game engine.
- Kualitas: baik untuk preview, motion graphic, animasi cepat.
- Tidak seakurat Cycles untuk caustics, volumetrik, SSS.

### 2. Cycles (Path Tracing)
- Render ray tracing akurat. Lambat tapi realistis.
- Sample count = kualitas vs waktu (32-128 sample standar, 1024+ untuk final).
- GPU render (CUDA, OptiX, HIP, Metal) = lebih cepat.

### 3. Render Settings
- Properties > Render Properties
- Resolution: 1920x1080 (Full HD), 3840x2160 (4K)
- Samples: 32 (preview), 128 (medium), 256+ (final)
- Render > Render Image (F12) atau Render Animation (Ctrl+F12)

## I. Camera

- Add > Camera (Shift+A > Camera)
- Numpad 0 = view dari kamera
- Ctrl+Alt+Numpad 0 = align kamera ke view saat ini
- Properties > Camera > Lens: focal length (35mm, 50mm, 85mm)
- Depth of Field: aktifkan, pilih objek fokus, atur aperture (f/2.8, f/1.8)

## J. Save & Export

### 1. Save Blender File
- .blend = format native Blender. Semua tersimpan (object, material, modifier, animation).
- File > Save (Ctrl+S), Save As (Shift+Ctrl+S)

### 2. Export
- File > Export > glTF 2.0 (.glb): untuk web, game engine (Unity, Godot)
- File > Export > FBX (.fbx): untuk Unity, Unreal
- File > Export > OBJ (.obj): format universal 3D
- File > Export > STL (.stl): untuk 3D printing

### 3. Render Output
- Render > Render Image (F12) → Save As PNG/JPEG
- Properties > Output: set output path, format (PNG, JPEG, OpenEXR), frame range
- Render > Render Animation (Ctrl+F12) → save frame-by-frame
"""

# ════════════════════════════════════════════════════════════════════════
# 50 SOAL PG DENGAN STIMULUS ANTI-AI
# Strategi anti-AI:
# 1. Stimulus spesifik dengan kombinasi parameter
# 2. Reasoning multi-step (bukan definisi)
# 3. Troubleshooting kasus error aplikasi
# 4. Istilah menu/panel spesifik
# 5. Pertanyaan "what-if" yang butuh konteks penuh
# ════════════════════════════════════════════════════════════════════════

PG = [
    # ════════ FOTOGRAFI DASAR (17 soal) ════════
    ("**Stimulus:** Anda memotret konser indoor dengan pencahayaan panggung yang minim. Setting kamera: Aperture f/1.8, ISO 3200, Shutter Speed 1/60s. Setelah review, foto terlihat grainy dan sedikit blur di subjek yang bergerak.\n\nLangkah yang PALING tepat untuk mengurangi noise sekaligus membekukan gerakan subjek:", ["Turunkan ISO ke 800, perpanjang shutter ke 1/15s", "Naikkan ISO ke 6400, percepat shutter ke 1/250s, lebar aperture di f/1.8", "Tutup aperture ke f/8, ISO 100, shutter 1/1000s", "Pakai flash on-camera, ISO 100, shutter 1/200s"], 1, "Untuk bekukan gerakan butuh shutter cepat (1/250s+). Karena cahaya minim, ISO harus naik (6400) untuk kompensasi. Aperture tetap lebar (f/1.8) untuk max cahaya. Noise tinggi tapi motion blur hilang."),
    ("**Stimulus:** Anda memotret portrait outdoor jam 4 sore (golden hour). Subjek di posisi 3/4 side lighting. Hasil: satu sisi wajah terang, sisi lain terlalu gelap (lost detail).\n\nUntuk menyeimbangkan eksposur tanpa mengubah mood dramatic side lighting:", ["Pakai flash on-camera power penuh dari depan", "Gunakan reflector di sisi gelap untuk isi shadow (fill light)", "Pindahkan subjek ke front lighting", "Ubah aperture dari f/2.8 ke f/8"], 1, "Reflector isi shadow tanpa hilangkan karakter side lighting. Flash on-camera = flat & keras. Front lighting = hilang mood. f/8 = ubah depth of field, tidak solve exposure."),
    ("**Stimulus:** Anda ingin foto landscape gunung dengan segala detail tajam dari foreground (batu 2m di depan) sampai background (puncak gunung jauh). Lensa 16mm wide angle.\n\nSetting aperture yang tepat:", ["f/1.4 untuk bokeh maksimal", "f/2.8 untuk isolasi subjek", "f/11 atau f/16 untuk depth of field lebar", "f/22 untuk hasil terbaik"], 2, "Landscape butuh DoF lebar = aperture sempit (f/11-f/16). f/22 = diffraction (tajam turun). f/1.4/f/2.8 = bokeh (background blur), kontra dengan tujuan landscape."),
    ("**Stimulus:** Anda memotret olahraga basket indoor. Lensa 70-200mm f/2.8. Hasil: pemain beku, tapi foto underexposed (terlalu gelap).\n\nDiagnosis masalah & solusi:", ["Shutter terlalu lambat → perpanjang shutter ke 1/15s", "Cahaya kurang → naikkan ISO, pertahankan shutter 1/500s+, aperture f/2.8", "Lensa salah → ganti ke 50mm f/1.8", "ISO terlalu tinggi → turunkan ke 100"], 1, "Olahraga butuh shutter cepat (1/500s+). Underexposed = cahaya kurang. Solusi: naik ISO (bukan turun), pertahankan shutter. Aperture f/2.8 sudah lebar untuk lensa ini."),
    ("**Stimulus:** Anda mengambil foto interior rumah dengan lampu pijar (2700K). White Balance di-set Auto. Hasil: foto terlalu kuning/oranye.\n\nKoreksi yang tepat:", ["Set WB ke Tungsten (3200K) untuk netralkan kuning", "Set WB ke Daylight (5500K)", "Naikkan ISO", "Perpanjang shutter speed"], 0, "Sumber cahaya 2700K (kuning). WB Tungsten (3200K) akan mendinginkan/nekutralkan. Daylight = tambah biru (salah arah). ISO/shutter tidak atasi warna."),
    ("**Stimulus:** Anda memotret produk makanan di atas meja dengan jendela di kiri sebagai sumber cahaya. Hasil: bayangan keras di sisi kanan makanan.\n\nUntuk softening bayangan tanpa flash:", ["Tambah lampu LED di kanan dengan intensitas sama", "Pasang reflector putih/karton di kanan makanan untuk bounce cahaya jendela", "Tutup jendela separuh", "Pindah ke ruang gelap total"], 1, "Reflector putih di sisi shadow akan bounce cahaya jendela = soft fill light. Lampu LED = tambah sumber cahaya baru (ubah mood). Tutup jendela = kurangi cahaya utama."),
    ("**Stimulus:** Foto Anda dengan lensa 50mm di APS-C (crop factor 1.5x). Subjek portrait kelihatan terlalu besar dalam frame.\n\nEksplanasi & solusi:", ["Lensa 50mm di APS-C = setara 75mm full frame (telephoto). Mundur lebih jauh dari subjek", "Lensa 50mm di APS-C = setara 35mm. Maju lebih dekat", "Crop factor tidak mempengaruhi focal length", "Ganti ke lensa 35mm di APS-C = setara 75mm"], 0, "Crop factor 1.5x: 50mm × 1.5 = 75mm equivalent. Sudut menjadi lebih sempit = telephoto. Mundur untuk framing sama. 35mm di APS-C = 52.5mm equivalent (bukan 75)."),
    ("**Stimulus:** Anda memotret sunset. Metering kamera ke mode Evaluative/Matrix. Hasil: langit bagus eksposur, tapi foreground (pohon, orang) jadi siluet gelap total.\n\nUntuk mendapat detail foreground sekaligus langit tidak overexposed:", ["Set exposure compensation +2 (overexpose)", "Pakai graduated ND filter (gelap di atas, jernih di bawah)", "Ubah ISO ke 6400", "Pakai shutter 30 detik"], 1, "Selisih dynamic range langit-foreground besar. Graduated ND filter kurangi cahaya langit saja. +2 EV = langit putih total. ISO tinggi tidak solve dynamic range."),
    ("**Stimulus:** Anda memotret bokeh lights (lampu kota malam). Ingin bentuk bokeh bulat dengan halo creamy. Lensa: 50mm f/1.8.\n\nSetting yang tepat:", ["f/1.8, fokus ke subjek dekat, lampu jauh di belakang", "f/16, fokus ke lampu", "f/8, fokus ke infinity", "f/22 dengan flash"], 0, "Bokeh creamy butuh aperture LEBAR (f/1.8) + jarak subjek dekat + lampu jauh di background. f/16 = bokeh kecil & bentuk bintang. f/22 sama, lebih buruk."),
    ("**Stimulus:** Memotret air terjun ingin hasil halus seperti kabut (silky). Cahaya terang (siang hari).\n\nSetting & filter yang dibutuhkan:", ["Shutter 1/1000s, no filter", "Shutter 5-10 detik + ND filter (gelap) untuk kurangi cahaya", "ISO 6400, shutter 1/30s", "Aperture f/1.4, no filter"], 1, "Silky water butuh shutter LAMBAT (5-10s). Cahaya terang = overexpose. ND filter kurangi cahaya = bisa shutter lambat tanpa over."),
    ("**Stimulus:** Anda memotret foto produk di studio. Light meter kamera baca: aperture f/8, ISO 100, shutter 1/125s, hasil underexposed 1 stop.\n\nKoreksi yang tepat:", ["Naikkan ISO ke 200", "Ubah aperture ke f/5.6 (1 stop lebar)", "Ubah shutter ke 1/250s", "Pakai ISO 12800"], 1, "Underexposed 1 stop = butuh +1 stop cahaya. f/8 → f/5.6 = +1 stop (aperture LEBAR). ISO 200 = +1 stop (alternatif). Shutter 1/250s = -1 stop (salah arah). Produk butuh f/8 untuk DoF."),
    ("**Stimulus:** Memotret pada siang hari dengan matahari tepat di atas (top lighting). Subjek: portrait wajah.\n\nMasalah utama & solusi:", ["Tidak ada masalah, eksposur sempurna", "Bayangan keras di bawah mata, hidung, dagu. Solusi: pindah ke tempat teduh atau pakai reflector bawah", "ISO terlalu tinggi, turunkan", "Aperture harus f/1.4"], 1, "Top lighting = bayangan keras di bawah fitur wajah (raccoon eyes). Pindah ke shade/diffuse atau reflector bawah untuk fill. ISO/aperture tidak atasi masalah ini."),
    ("**Stimulus:** Anda memotret olahraga balap motor. Lensa 300mm. Hasil: subjek tajam tapi background masih kelihatan jelas (tidak isolated).\n\nUntuk isolasi subjek dengan background blur:", ["Tutup aperture ke f/11", "Buka aperture ke f/4 (atau f/2.8 jika lensa support) untuk DoF sempit", "Naikkan ISO ke 6400", "Pakai shutter 1/8000s"], 1, "Isolasi subjek = DoF sempit = aperture LEBAR (f/4 atau lebih lebar). f/11 = DoF lebar (semua tajam, kontra tujuan). ISO/shutter tidak atasi DoF."),
    ("**Stimulus:** Anda memotret street photography malam dengan lampu jalan. Tidak bawa tripod. Lensa 35mm f/1.4.\n\nSetting aman untuk menghindari motion blur handheld:", ["f/1.4, ISO 100, shutter 1s", "f/1.4, ISO 3200-6400, shutter 1/30s atau lebih cepat", "f/16, ISO 100, shutter 30s", "f/8, ISO 200, shutter 1/2s"], 1, "Handheld rule: shutter >= 1/focal length = 1/35s minimum. Lensa 35mm f/1.4 lebar = max cahaya. ISO naik untuk kompensasi low light. f/16 = kurang cahaya. Shutter 1s = blur handheld."),
    ("**Stimulus:** Foto portrait di studio. Light meter baca: f/8, ISO 100, shutter 1/200s, hasil overexposed 2 stop.\n\nKoreksi yang tepat:", ["f/8 → f/16 (tutup 2 stop) ATAU ISO 100 → ISO 25 (turun 2 stop)", "f/8 → f/4 (buka 2 stop)", "Shutter 1/200 → 1/50 (perlambat 2 stop)", "ISO 100 → 400"], 0, "Overexposed 2 stop = butuh -2 stop cahaya. f/8→f/16 = -2 stop (aperture SEMPIT). Alt: ISO 100→25 (-2 stop). f/8→f/4 = +2 stop (salah arah). Shutter 1/200→1/50 = +2 stop (salah)."),
    ("**Stimulus:** Memotret macro serangga (kupu-kupu) di pagi hari. Lensa macro 100mm f/2.8. Subjek sangat kecil, ingin detail sayap tajam.\n\nTantangan utama & solusi:", ["DoF sangat sempit di macro. Tutup aperture ke f/16-f/22 untuk DoF cukup, gunakan tripod", "Buka aperture f/2.8 untuk bokeh", "Pakai shutter 1/30s handheld", "Naikkan ISO ke 6400"], 0, "Macro di magnifikasi tinggi = DoF sangat tipis (mm). f/16-f/22 untuk DoF cukup. Tripod wajib karena shutter lambat + subjek kecil. f/2.8 = DoF terlalu tipis, hanya sebagian sayap tajam."),
    ("**Stimulus:** Anda memotret landscape golden hour. Inikah foto langsung JPEG atau RAW lebih baik untuk situasi ini?", ["JPEG karena file lebih kecil", "RAW karena lebih fleksibel untuk editing exposure, WB, dan shadow recovery di post-process", "JPEG karena lebih tajam", "Tidak ada bedanya"], 1, "RAW = data mentah 12-14 bit. Bisa recover shadow/highlight yang hilang di JPEG. WB bisa diubah tanpa loss. Golden hour = dynamic range besar, RAW wajib."),

    # ════════ ADOBE ILLUSTRATOR (17 soal) ════════
    ("**Stimulus:** Di Illustrator, Anda membuat logo dengan 2 shape lingkaran yang saling tumpang tindih. Anda ingin BAGIAN yang tumpang tindih HILANG, sehingga terlihat seperti 2 lingkaran terpotong (bentuk seperti Venn diagram kosong di tengah).\n\nOperasi Pathfinder yang tepat:", ["Unite (Add)", "Minus Front", "Intersect", "Exclude"], 3, "Exclude = hapus area intersection, sisanya jadi shape. Unite = gabung. Minus Front = shape depan potong belakang. Intersect = ambil hanya intersection."),
    ("**Stimulus:** Anda membuat typography logo. Setelah selesai, klien minta kirim ke print shop untuk dicetak. Font yang Anda pakai mungkin tidak ada di print shop.\n\nLangkah penting sebelum save .ai untuk kirim:", ["Flatten transparency", "Create Outlines (Ctrl+Shift+O) untuk ubah teks jadi vector shape", "Embed all linked images", "Convert color mode CMYK"], 1, "Create Outlines = ubah font jadi shape vector. Tidak lagi butuh font install. Wajib sebelum kirim ke print shop. Embed images = terkait gambar. CMYK = terkait warna."),
    ("**Stimulus:** Anda tracing logo kompleks dengan Pen Tool. Saat membuat kurva, handle terlalu panjang sehingga kurva berlebihan (overshoot). Anda ingin sesuaikan handle tanpa hilangkan smoothness.\n\nCara yang tepat:", ["Hapus anchor point dan ulangi", "Pakai Direct Selection Tool (A), drag handle untuk pendekkan", "Convert anchor point ke corner", "Pakai Shape Builder"], 1, "Direct Selection Tool (A) = pilih & edit anchor/handle individual. Drag handle = adjust kurva. Hapus anchor = rusak path. Convert corner = ubah tipe titik."),
    ("**Stimulus:** Anda kerja di Illustrator dengan 50+ layer. Beberapa objek tidak sengaja tergeser. Anda ingin kunci objek agar tidak bisa diedit sementara, tapi tetap terlihat.\n\nLangkah:", ["Hide (Ctrl+3)", "Lock (Ctrl+2)", "Delete objek", "Move ke layer terpisah"], 1, "Lock (Ctrl+2) = objek tidak bisa diseleksi/edit tapi tetap terlihat. Hide (Ctrl+3) = hilang dari view. Delete = permanen. Unlock All = Ctrl+Alt+2."),
    ("**Stimulus:** Anda membuat logo untuk web app. Klien minta file bisa di-scale tanpa pecah, file size kecil, support transparansi.\n\nFormat export yang tepat:", ["JPEG", "PNG 8-bit", "SVG (vector)", "PSD"], 2, "SVG = vector format untuk web. Scalable tanpa batas, file kecil, support transparansi. JPEG = raster, tidak transparan. PNG = raster, scalable = pecah. PSD = Photoshop."),
    ("**Stimulus:** Anda membuat desain poster untuk print. Saat ini dokumen Color Mode = RGB. Print shop minta CMYK.\n\nSetelah convert ke CMYK, beberapa warna (terutama bright neon/biru elektrik) terlihat pudar. Penyebab:", ["Color profile salah", "RGB gamut lebih besar dari CMYK. Warna di luar CMYK gamut (out of gamut) tidak bisa direproduksi tinta CMYK", "Resolusi terlalu rendah", "Blender tidak kompatibel"], 1, "RGB additive (cahaya) = gamut besar. CMYK subtractive (tinta) = gamut lebih kecil. Warna terang (neon, electric blue) tidak ada di CMYK, otomatis dipetakan ke warna terdekat = pudar."),
    ("**Stimulus:** Anda membuat ilustrasi karakter di Illustrator. Ada elemen mata, hidung, mulut, rambut. Saat ini semuanya terpisah. Anda ingin ketika warna kulit diubah, mata/hidung/mulut tidak ikut berubah.\n\nStrategi layer/organisasi:", ["Group semua jadi 1 group (Ctrl+G)", "Pakai global color untuk kulit saja, jangan untuk mata/hidung/mulut", "Pakai layer terpisah", "Lock semua objek"], 1, "Global color = ubah 1 swatch → semua objek yang pakai berubah. Pakai global untuk kulit, jangan untuk fitur lain. Group = organisasi, tidak atasi warna. Layer = organisasi."),
    ("**Stimulus:** Anda membuat brosur A4 dengan multiple artboard (4 halaman). Klien minta export semua halaman sekaligus ke PNG dengan ukuran 1080×1080 px untuk Instagram.\n\nFitur yang tepat:", ["File > Export > Export As (one by one)", "File > Export > Export for Screens (Ctrl+Alt+E) - batch export", "File > Save for Web", "Print to PDF"], 1, "Export for Screens = batch export multiple artboard, berbagai format & ukuran sekaligus. Export As = 1 file per save. Save for Web = 1 file. Print to PDF = bukan PNG."),
    ("**Stimulus:** Anda membuat logo dengan shape berbentuk 'donut' (lingkaran dengan lubang di tengah). Punya 2 lingkaran: besar (luar) dan kecil (dalam).\n\nOperasi Pathfinder yang tepat:", ["Unite", "Minus Front (lingkaran kecil di depan, besar di belakang)", "Intersect", "Crop"], 1, "Minus Front = shape depan (lingkaran kecil) memotong shape belakang (lingkaran besar) = lubang di tengah. Unite = gabung jadi 1 lingkaran besar. Intersect = bentuk kecil."),
    ("**Stimulus:** Anda mengetik judul di Illustrator dengan Type Tool. Setelah selesai, Anda ingin judul melengkung mengikuti bentuk setengah lingkaran (arc).\n\nCara yang tepat:", ["Effect > Warp > Arc (lalu Expand Appearance)", "Type on Path Tool ( klik di atas path setengah lingkaran)", "Rotasi manual tiap huruf", "Pakai Photoshop"], 1, "Type on Path = teks mengikuti garis/path. Buat path arc, lalu Type on Path tool, klik di path = teks mengikuti. Effect Warp Arc = distorsi teks (bukan follow path). Expand = permanen."),
    ("**Stimulus:** Anda membuat ilustrasi kompleks dengan banyak shape yang saling overlap. Ingin melihat bentuk akhir tanpa path individual terlihat.\n\nView mode yang tepat:", ["Outline view (Ctrl+Y)", "Preview view (Ctrl+Y toggle = kembali ke preview)", "Pixel Preview", "Overprint Preview"], 1, "Preview = tampilan final (warna, fill, stroke). Outline (Ctrl+Y) = hanya path (wireframe). Toggle Ctrl+Y untuk switch. Pixel Preview = lihat raster. Overprint = untuk print proofing."),
    ("**Stimulus:** Anda membuat shape dengan Pen Tool, tapi saat menutup path (close), ada gap kecil antara titik awal dan akhir.\n\nCara menutup path dengan benar:", ["Stop di titik akhir, biarkan gap", "Klik titik pertama saat tool Pen dekat titik awal (muncul icon 'close path' bulat kecil di cursor)", "Pakai Direct Selection Tool, drag kedua titik jadi tumpang", "Hapus path dan ulangi"], 1, "Pen Tool: hover di atas anchor pertama, cursor muncul icon */○ kecil = close path indicator. Klik = path tertutup. Otomatis gabung endpoint."),
    ("**Stimulus:** Anda ingin duplikasi objek dengan jarak konsisten & rotasi tertentu (misal 12 kelopak bunga dengan rotasi 30° tiap kelopak).\n\nFitur yang tepat:", ["Copy-paste manual 12 kali", "Effect > Distort & Transform > Transform (scale 100%, copy 11, rotate 30°)", "Blend Tool", "Pattern Brush"], 1, "Effect > Transform = duplikasi procedural dengan scale, move, rotate, copy. Bisa edit kapan saja (non-destructive). Expand Appearance untuk permanen. Manual = tedious. Blend = interpolasi 2 objek."),
    ("**Stimulus:** Anda membuat pattern berulang (contoh: pola batik) di Illustrator. Ingin pola otomatis berulang saat diisi di shape apapun.\n\nFitur yang tepat:", ["Object > Pattern > Make (Pattern Editor)", "Copy-paste manual", "Symbol Sprayer", "Brush"], 0, "Pattern Maker: buat 1 tile, otomatis repeat. Save ke Swatches. Apply ke shape = pattern fill otomatis. Edit pattern = update semua. Manual = tidak dynamic."),
    ("**Stimulus:** Anda membuat ilustrasi di Illustrator, lalu ingin export ke format yang bisa di-edit di Photoshop dengan layer terpisah (preservasi layer).\n\nFormat export:", ["JPEG", "PNG", "PSD (export as PSD dengan 'Write Layers' option)", "SVG"], 2, "Export As PSD dengan 'Write Layers' = layer terpisah di Photoshop. Buka di PSD = layer editable. JPEG/PNG = flatten (1 layer). SVG = vector, PSD tidak support vector sepenuhnya."),
    ("**Stimulus:** Anda membuat logo dengan teks yang diputar 45°. Setelah Create Outlines, ingin rotasi teks balik ke horizontal untuk editing, tanpa rotasi shape.\n\nMasalah yang terjadi:", ["Tidak bisa edit setelah Create Outlines", "Teks sudah jadi shape. Rotasi shape tidak bisa balik tanpa rotasi ulang. Pre-Create Outlines, rotasi teks masih reversible. Post-Outlines, rotasi dianggap shape rotation", "Create Outlines selalu reversible", "Tidak ada masalah"], 1, "Create Outlines = convert teks jadi shape. Rotasi setelahnya = rotasi shape (reversible via transform). Tapi teks tidak bisa di-edit lagi (sudah vector). Pre-Outlines, rotasi teks reversible. Post, treat as shape."),
    ("**Stimulus:** Anda membuat ilustrasi dengan banyak elemen. Beberapa objek tersembunyi di belakang objek lain. Ingin seleksi objek yang tertutup tanpa move objek di atas.\n\nCara yang tepat:", ["View > Outline (Ctrl+Y) lalu pilih", "Pakai Selection Tool + klik berulang dengan Cmd/Ctrl, atau Select > Next Object Below/Behind", "Hapus objek di atas", "Lock semua objek"], 1, "Cmd/Ctrl+click berulang = cycle through overlapping objects di bawah cursor. Select > Next Object Behind = alternatif. Outline view = lihat semua path tapi pilih manual."),

    # ════════ BLENDER DASAR (16 soal) ════════
    ("**Stimulus:** Di Blender, Anda sedang modeling di Object Mode dengan objek Cube terpilih. Anda ingin memodifikasi vertex/edge/face individual.\n\nLangkah pertama yang harus dilakukan:", ["Tekan G untuk move", "Tekan Tab untuk masuk Edit Mode", "Tekan Shift+A untuk add object", "Tekan Numpad 0"], 1, "Tab = toggle Object Mode ↔ Edit Mode. Tanpa masuk Edit Mode, tidak bisa edit vertex/edge/face. G = move (operasi Object Mode). Shift+A = add new object."),
    ("**Stulus:** Anda ingin membuat tangan karakter simetris. Sudah model tangan kanan. Cara tercepat untuk membuat tangan kiri yang identik:", ["Model ulang dari awal", "Tambah Modifier Mirror di sumbu X pada tangan kanan, lalu model = otomatis mirror", "Duplicate (Shift+D) dan scale -1 di X", "Pakai Boolean"], 1, "Mirror Modifier = otomatis mirror geometry di sumbu. Edit tangan kanan = tangan kiri ikut. Non-destructive. Duplicate + scale -1 = manual, tidak otomatis saat edit."),
    ("**Stimulus:** Anda modeling karakter di Edit Mode. Ada sudut yang terlalu tajam. Ingin bulatkan sedikit tanpa tambah banyak geometry manual.\n\nOperasi yang tepat:", ["Bevel (Ctrl+B) lalu drag untuk adjust width", "Subdivide", "Extrude (E)", "Inset (I)"], 0, "Bevel (Ctrl+B) = bulatkan sudut. Drag = width. Scroll = segment (jumlah loop, lebih banyak = lebih halus). Subdivide = bagi face, tidak khusus bevel. Extrude = tambah geometry keluar."),
    ("**Stimulus:** Anda ingin render scene Blender. Kualitas preview cepat untuk cek komposisi sebelum final render. Render engine yang tepat:", ["Cycles dengan sample 256", "EEVEE (real-time, cepat)", "Cycles dengan sample 4096", "Workbench"], 1, "EEVEE = real-time, cepat. Cocok preview komposisi. Cycles = ray tracing akurat tapi lambat. Workbench = viewport mode (bukan render final)."),
    ("**Stimulus:** Anda modeling di Blender. Ingin tambah edge loop melingkar di tengah kubus untuk detail (misal untuk bevel lebih halus di sudut).\n\nShortcut yang tepat:", ["Ctrl+R (Loop Cut)", "E (Extrude)", "I (Inset)", "M (Merge)"], 0, "Ctrl+R = Loop Cut. Hover di edge = preview loop. Klik = confirm. Scroll = multiple loops. E = extrude. I = inset face. M = merge vertex."),
    ("**Stimulus:** Anda ingin pindah kamera view di Blender ke perspektif tertentu, lalu set kamera render sesuai view saat ini.\n\nUrutan langkah yang tepat:", ["Numpad 0, lalu Ctrl+Alt+Numpad 0", "Ctrl+Alt+Numpad 0, lalu Numpad 0", "Shift+A > Camera, lalu F12", "Numpad 5"], 0, "Pertama Numpad 0 = view dari kamera existing (untuk lihat). Tapi untuk ALIGN kamera ke VIEW: position view 3D sesuai keinginan, lalu Ctrl+Alt+Numpad 0 = kamera pindah ke view. Atau: Numpad 0 first, lalu Lock Camera to View (N panel) untuk navigasi."),
    ("**Stimulus:** Material di Blender: Anda membuat objek logam besi. Property yang harus di-set di Principled BSDF?", ["Base Color hitam, Metallic 0, Roughness 0.5", "Base Color abu-abu metalik, Metallic 1.0, Roughness 0.2-0.4 (tergantung finish)", "Base Color silver, Metallic 0, Roughness 0", "Metallic 0.5, Roughness 1.0"], 1, "Logam = Metallic 1.0. Roughness: 0 = cermin mengkilap, 0.2-0.4 = besi standard, 0.5+ = matte/berkarat. Base Color = warna dasar (abu-abu, silver, gelap). Non-logam = Metallic 0."),
    ("**Stimulus:** Anda modeling di Blender, ingin hapus salah satu face dari kubus di Edit Mode.\n\nLangkah yang tepat:", ["Tekan X lalu pilih 'Faces' (atau Delete lalu Faces)", "Tekan Delete (no menu)", "Tekan H", "Tekan M"], 0, "X di Edit Mode = menu Delete (Vertices, Edges, Faces, All). Pilih Faces = hapus face terpilih. Delete (Del) = langsung hapus semua terpilih. H = hide. M = merge."),
    ("**Stimulus:** Anda ingin render scene dengan caustics (cahaya membengkok melalui kaca/air). Render engine yang HARUS dipakai:", ["EEVEE", "Cycles (ray tracing support caustics)", "Workbench", "Tidak bisa di Blender"], 1, "Cycles = path tracing, support caustics (refraksi cahaya kompleks). EEVEE = real-time, tidak support caustics akurat. Workbench = preview only. Untuk kaca/air realistis = Cycles."),
    ("**Stimulus:** Anda ingin lihat scene dari atas (top view) untuk cek alignment objek.\n\nShortcut yang tepat:", ["Numpad 1", "Numpad 3", "Numpad 7", "Numpad 0"], 2, "Numpad 7 = top view (orthographic). Numpad 1 = front view. Numpad 3 = side (right) view. Numpad 0 = camera view. Numpad 5 = toggle perspective/orthographic."),
    ("**Stimulus:** Anda modeling objek kompleks. Ingin hapus beberapa bagian dengan operasi boolean: shape A (kubus) dikurangi shape B (silinder) = kubus dengan lubang silinder.\n\nModifier yang tepat:", ["Subdivision Surface", "Boolean (Difference)", "Mirror", "Array"], 1, "Boolean modifier dengan operation = Difference. Object = silinder (B). Apply = kubus A dikurangi silinder B = lubang. Union = gabung. Intersect = ambil intersection."),
    ("**Stimulus:** Anda modeling di Blender, ingin duplikasi objek yang ada. Setelah duplikasi, objek asli tetap di tempat, objek baru bisa di-move terpisah.\n\nShortcut yang tepat:", ["Alt+D (linked duplicate)", "Shift+D (duplicate)", "Ctrl+D (copy)", "Ctrl+C, Ctrl+V"], 1, "Shift+D = duplicate (objek baru independent, punya data sendiri). Alt+D = linked duplicate (share mesh data, edit 1 = semua ikut). Untuk objek terpisah = Shift+D."),
    ("**Stimulus:** Anda membuat material kaca (glass) di Blender. Pengaturan yang tepat di Principled BSDF untuk efek transparan + refraksi:", ["Transmission 1.0, Roughness 0, IOR 1.45 (glass)", "Metallic 1.0", "Emission putih", "Roughness 1.0"], 0, "Transmission 1.0 = cahaya tembus (refraksi). IOR 1.45 = indeks refraksi kaca (air = 1.33, diamond = 2.42). Roughness 0 = transparan sempurna. Butuh Cycles untuk render transmission akurat (EEVEE limited)."),
    ("**Stimulus:** Anda ingin rendering animasi 100 frame. Setelah render selesai, format output yang PALING tepat untuk di-edit lagi di video editor (preservasi kualitas):", ["JPEG per frame", "PNG (lossless) per frame + sequence", "MP4 langsung dari Blender", "AVI uncompressed"], 1, "PNG sequence (frame_0001.png, frame_0002.png, ...) = lossless, bisa import ke video editor (Premiere, Resolve, Blender VSE). JPEG = lossy. MP4 langsung = sudah compressed, sulit edit ulang. AVI uncompressed = file besar."),
    ("**Stimulus:** Anda ingin setup three-point lighting di Blender untuk render karakter. Subjek di tengah scene.\n\nPosisi yang tepat:", ["1 light dari depan (Key), 1 light dari belakang (Rim), 1 light dari samping lain (Fill)", "1 light dari atas", "3 light semua dari depan", "1 light point di tengah"], 0, "Three-point: Key (depan-samping, terang), Fill (sisi lain, lebih redup, haluskan shadow), Rim/Back (belakang, pisahkan subjek dari bg)."),
    ("**Stimulus:** Anda modeling objek dengan modifier Subdivision Surface. Viewport halus, tapi render masih facet (kotak). Penyebab:", ["Modifier tidak aktif untuk render", "Viewport level = 2, Render level = 0. Set Render level ke 2 atau lebih", "Material salah", "Light kurang"], 1, "Subsurf punya 2 level: Viewport (real-time) dan Render. Viewport = 2 = halus di editor. Render = 0 = facet saat render. Set Render level sama/lebih tinggi dari Viewport."),
]

assert len(PG) == 50, f"Expected 50 questions, got {len(PG)}"


# ════════════════════════════════════════════════════════════════════════
# GENERATE SQL
# ════════════════════════════════════════════════════════════════════════

def generate_sql():
    sql = []
    sql.append("-- ════════════════════════════════════════════════════════════════════════")
    sql.append("-- UJIAN TEORI KELAS 11 DKV — MATA PELAJARAN PILIHAN")
    sql.append("-- ════════════════════════════════════════════════════════════════════════")
    sql.append("--")
    sql.append("-- Tanggal Ujian: 27 November 2026")
    sql.append("-- Waktu Akses: 09:00 - 10:30 WIB (90 menit)")
    sql.append("-- Materi: Fotografi Dasar, Adobe Illustrator, Blender Dasar")
    sql.append("-- Jumlah Soal: 50 PG dengan stimulus")
    sql.append("--")
    sql.append("-- PRASYARAT (WAJIB):")
    sql.append("--   Kolom openAt & closeAt di tabel Assignment HARUS tipenya TIMESTAMPTZ.")
    sql.append("--   Jika belum, jalankan SALAH SATU dari:")
    sql.append("--     - download/migration_assignment_openat_closeat.sql (jika kolom belum ada)")
    sql.append("--     - download/fix_migration_openat_closeat_timestamptz.sql (jika kolom sudah ada tapi tipe salah)")
    sql.append("--")
    sql.append("-- CARA RUN:")
    sql.append("-- 1. Buka Supabase Dashboard → SQL Editor → New Query")
    sql.append("-- 2. Copy SEMUA isi file ini, paste di SQL Editor")
    sql.append("-- 3. Klik Run")
    sql.append("-- ════════════════════════════════════════════════════════════════════════")
    sql.append("")

    # ── BAGIAN 1: MATERI PERSIAPAN UJIAN (3 bab, bisa diakses kapan saja) ──
    sql.append("-- ─── BAGIAN 1: MATERI PERSIAPAN UJIAN (3 bab, bisa diakses kapan saja) ───")
    materi_list = [
        ("mat_ujian_teori_dkv_fotografi", "Materi Persiapan Ujian: Fotografi Dasar", MATERI_FOTOGRAFI, "Fotografi"),
        ("mat_ujian_teori_dkv_illustrator", "Materi Persiapan Ujian: Adobe Illustrator Dasar", MATERI_ILLUSTRATOR, "Illustrator"),
        ("mat_ujian_teori_dkv_blender", "Materi Persiapan Ujian: Aplikasi Blender Dasar", MATERI_BLENDER, "Blender"),
    ]
    for mid, mtitle, mcontent, mcat in materi_list:
        sql.append("INSERT INTO \"Material\" (id, title, content, subject, \"targetKelas\", \"targetJenjang\", category, \"cpId\", \"tpId\", \"isActive\", \"mediaType\", \"createdAt\", \"updatedAt\")")
        sql.append("VALUES (")
        sql.append(f"  '{mid}',")
        sql.append(f"  {sql_str(mtitle)},")
        sql.append(f"  {sql_str(mcontent)},")
        sql.append(f"  '{SUBJECT}', '11DKV', 'SMK', '{mcat}',")
        sql.append(f"  NULL, NULL, true, 'teks', NOW(), NOW()")
        sql.append(")")
        sql.append(f"ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content, \"updatedAt\" = NOW();")
        sql.append("")

    # ── BAGIAN 2: 50 SOAL PG ──
    sql.append("-- ─── BAGIAN 2: 50 SOAL PILIHAN GANDA DENGAN STIMULUS ───")
    for i, (q, opts, correct, expl) in enumerate(PG):
        cat = "Fotografi" if i < 17 else "Illustrator" if i < 34 else "Blender"
        qid = f"q_ujian_teori_dkv_{i+1:03d}"
        sql.append(f"INSERT INTO \"Question\" (id, \"gradeLevel\", subject, question, \"optionA\", \"optionB\", \"optionC\", \"optionD\", \"correctAnswer\", explanation, category, \"isActive\", \"questionType\", \"correctAnswers\", \"matchPairs\", \"shortAnswer\", \"essayAnswer\", \"levelKognitif\", \"pembahasanBenar\", \"analisisDistraktor\", \"cpId\", \"tpId\", \"createdAt\", \"updatedAt\") VALUES")
        sql.append(f"('{qid}', '11DKV', {sql_str(SUBJECT)}, {sql_str(q)}, {sql_str(opts[0])}, {sql_str(opts[1])}, {sql_str(opts[2])}, {sql_str(opts[3])}, {correct}, {sql_str(expl)}, '{cat}', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', NULL, NULL, NOW(), NOW());")
    sql.append("")

    # ── BAGIAN 3: ASSIGNMENT UJIAN TEORI dengan window akses ──
    sql.append("-- ─── BAGIAN 3: ASSIGNMENT UJIAN TEORI (window akses 27 Nov 2026, 09:00-10:30 WIB) ───")
    sql.append("-- openAt: kapan ujian mulai bisa diakses (27 Nov 2026, 09:00 WIB)")
    sql.append("-- closeAt: kapan ujian berakhir (27 Nov 2026, 10:30 WIB)")
    sql.append("-- dueDate: deadline (sama dengan closeAt untuk ujian dengan window ketat)")
    sql.append("-- duration: 90 menit (dari 09:00 - 10:30)")
    sql.append("INSERT INTO \"Assignment\" (id, title, description, subject, \"targetKelas\", \"targetJenjang\", \"isActive\", \"dueDate\", \"exerciseType\", \"questionCount\", \"taskType\", \"teacherId\", \"cpId\", \"tpId\", \"taskCategory\", \"taskTypeName\", \"tahunAjaran\", \"semester\", \"duration\", \"openAt\", \"closeAt\", \"createdAt\", \"updatedAt\")")
    sql.append("VALUES (")
    sql.append(f"  'asg_ujian_teori_k11_dkv',")
    sql.append(f"  'Ujian Teori Kelas 11 DKV — Fotografi, Illustrator, Blender',")
    sql.append(f"  'Ujian teori mata pelajaran Pilihan. 50 soal PG dengan stimulus tentang Fotografi Dasar, Adobe Illustrator, dan Aplikasi Blender Dasar. Waktu pengerjaan 90 menit (09:00-10:30 WIB). Ujian hanya bisa diakses pada tanggal & jam yang ditentukan. Baca materi persiapan terlebih dahulu di menu Materi Belajar.',")
    sql.append(f"  '{SUBJECT}', '11DKV', 'SMK', true, '{DUE_DATE}', 'wajib', 50, 'quiz_only', NULL, NULL, NULL, 'daring', 'Ujian Teori', '2026/2027', 'ganjil', 90, '{OPEN_AT}', '{CLOSE_AT}', NOW(), NOW()")
    sql.append(")")
    sql.append("ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, \"questionCount\" = EXCLUDED.\"questionCount\", duration = EXCLUDED.duration, \"dueDate\" = EXCLUDED.\"dueDate\", \"openAt\" = EXCLUDED.\"openAt\", \"closeAt\" = EXCLUDED.\"closeAt\", \"isActive\" = EXCLUDED.\"isActive\", \"updatedAt\" = NOW();")
    sql.append("")

    # ── VERIFIKASI ──
    sql.append("-- ─── VERIFIKASI ───")
    sql.append("SELECT 'Materi Persiapan' AS section, COUNT(*) AS total FROM \"Material\" WHERE id LIKE 'mat_ujian_teori_dkv_%';")
    sql.append("SELECT 'Soal PG' AS section, COUNT(*) AS total FROM \"Question\" WHERE id LIKE 'q_ujian_teori_dkv_%';")
    sql.append("SELECT 'Assignment' AS section, title, \"questionCount\", duration, \"taskType\", \"openAt\", \"closeAt\" FROM \"Assignment\" WHERE id = 'asg_ujian_teori_k11_dkv';")
    sql.append("")
    sql.append("-- Expected output:")
    sql.append("-- Materi Persiapan: 3")
    sql.append("-- Soal PG: 50")
    sql.append("-- Assignment: 'Ujian Teori Kelas 11 DKV — Fotografi, Illustrator, Blender' | 50 | 90 | quiz_only | 2026-11-27 09:00:00+07 | 2026-11-27 10:30:00+07")

    return "\n".join(sql)


if __name__ == "__main__":
    sql = generate_sql()
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(sql)
    print(f"✓ SQL generated: {OUTPUT_PATH}")
    print(f"  Total soal PG: {len(PG)}")
    print(f"  Materi: 3 bab (Fotografi, Illustrator, Blender)")
    print(f"  Open at: {OPEN_AT}")
    print(f"  Close at: {CLOSE_AT}")
    print(f"  Duration: 90 menit")
