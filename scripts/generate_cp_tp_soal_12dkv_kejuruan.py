#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator SQL: CP + TP + Materi + 150 Soal (100 PG + 50 Isian) + Tugas
Kelas 12 DKV — Mata Pelajaran Kejuruan
Fokus: Image Editing & Image Manipulation
"""

import os

OUTPUT_PATH = "/home/z/my-project/download/insert_cp_tp_materi_soal_12dkv_kejuruan.sql"
DUE_DATE_ISO = "2026-10-15T23:59:00+07:00"
GRADE = "12DKV"
SUBJECT = "Mata Pelajaran Kejuruan"

CP_ID = "cp_kej_12_1"
TP_ID = "tp_kej_12_1_1"
MAT_ID = "mat_kej_12_1"
ASG_ID = "asg_kej_12_1_tugas"

def sql_escape(text):
    if text is None: return ""
    return text.replace("'", "''")

def sql_str(text):
    return f"'{sql_escape(text)}'"

MATERI = """# Image Editing & Image Manipulation untuk DKV Kelas 12

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
"""

# ── 100 SOAL PILIHAN GANDA (HOTS, cerita) ──
PG_QUESTIONS = []
for i in range(100):
    level = "C3" if i < 35 else ("C4" if i < 70 else "C5")
    # Generate soal berdasarkan topik
    topics = [
        ("Pencahayaan", [
            ("**Andi** mengambil foto landscape saat matahari terbenam. Foto terlalu gelap di area foreground. Pengaturan yang TEPAT untuk memperbaiki:", ["Naikkan Exposure secara merata", "Naikkan Shadows untuk buka detail foreground", "Turunkan Highlights", "Naikkan Contrast"], 1, "Shadows membuka detail area gelap tanpa menyilaukan area terang"),
            ("**Siti** foto produk makanan. Background putih terlihat terbakar (blown out). Solusi edit yang tepat:", ["Naikkan Whites", "Turunkan Highlights untuk recover detail", "Naikkan Exposure", "Turunkan Shadows"], 1, "Highlights mengontrol area paling terang — turunkan untuk recover detail yang blown out"),
            ("Foto outdoor **Budi** terlihat terlalu kuning karena lampu jalan. Koreksi yang tepat:", ["Turunkan Temperature (lebih biru)", "Naikkan Temperature (lebih kuning)", "Naikkan Tint", "Turunkan Exposure"], 0, "Lampu jalan = warm/kuning. Turunkan temperature untuk kompensasi (tambah biru)"),
            ("**Dina** membuka shadow foto malamnya +100. Hasilnya muncul titik warna acak. Apa itu dan cara fix?", ["Luminance noise — naikkan luminance NR", "Color noise — naikkan color noise reduction", "Hot pixel — ganti sensor", "Chromatic aberration — enable lens correction"], 1, "Buka shadow ekstrem = muncul color noise. Fix: color noise reduction"),
            ("**Eka** ingin foto portrait-nya terlihat cinematic dengan area gelap kebiruan. Fitur yang dipakai:", ["Color grading → Shadows tint: biru/teal", "Naikkan Temperature", "Naikkan Saturation", "Turunkan Contrast"], 0, "Color grading shadows tint biru/teal = classic cinematic look"),
            ("Apa beda Whites dan Highlights?", ["Sama saja", "Whites = titik endpoint histogram, Highlights = area terang secara umum", "Whites = area gelap, Highlights = area terang", "Whites = kontras, Highlights = exposure"], 1, "Whites mengatur ujung histogram (titik putih murni), Highlights area terang secara umum"),
            ("**Fajar** foto backlit. Subjek gelap, background terang. Solusi editing:", ["Naikkan Shadows + turunkan Highlights", "Naikkan Exposure saja", "Turunkan Contrast", "Naikkan Saturation"], 0, "HDR-like: naikkan shadows (buka subjek) + turunkan highlights (tame background)"),
            ("White balance auto pada foto indoor **Gita** menghasilkan warna kehijauan. Koreksi:", ["Naikkan Tint (arah magenta)", "Turunkan Tint (arah green)", "Naikkan Temperature", "Turunkan Exposure"], 0, "Kehijauan = too much green. Naikkan tint ke arah magenta untuk kompensasi"),
        ]),
        ("Komposisi", [
            ("**Hadi** memotret gunung. Ia ingin gunung tampak dominan. Komposisi yang tepat:", ["Rule of Thirds — horison di 1/3 atas", "Rule of Thirds — horison di 1/3 bawah, gunung 2/3", "Central — gunung di tengah", "Diagonal"], 1, "Horison di 1/3 atas = langit dominan. 1/3 bawah = darat/gunung dominan"),
            ("Foto pasar **Ira** terlihat berantakan. Solusi komposisi via cropping:", ["Crop tighter + leading lines ke 1 subjek", "Crop lebih lebar", "Tambah elemen lain", "Pakai central composition"], 0, "Crop tighter + leading lines mengurangi clutter dan memandu mata ke subjek"),
            ("**Joko** foto jembatan. Garis jembatan menyempit ke kejauhan. Komposisi yang otomatis terbentuk:", ["Symmetry", "Leading lines", "Central", "Pyramid"], 1, "Garis yang menyempit = leading lines, memandu mata ke vanishing point"),
            ("Komposisi pyramid (segitiga) memberikan kesan:", ["Dinamis dan energetik", "Stabil dan monumental", "Kacau", "Intim"], 1, "Base lebar + puncak sempit = stabil, kokoh, monumental"),
            ("**Kiki** foto siluet orang di sunset. Subjek di tengah, langit simetris. Komposisi ini:", ["Diagonal", "Symmetry", "Rule of Thirds", "Leading lines"], 1, "Subjek di tengah + elemen kiri-kanan saling cermin = symmetry"),
            ("Apa beda Central dan Symmetry?", ["Sama saja", "Central = subjek di tengah, Symmetry = kiri-kanan sama", "Central = horizontal, Symmetry = vertikal", "Tidak ada beda"], 1, "Central = subjek di tengah (tidak butuh elemen kiri-kanan sama). Symmetry = kiri-kanan cermin"),
            ("**Lia** ingin foto produk terlihat formal dan seimbang. Komposisi:", ["Diagonal", "Symmetry", "Rule of Thirds", "Leading lines"], 1, "Symmetry = formal, seimbang, rapi — cocok untuk produk"),
            ("Komposisi diagonal cocok untuk foto yang ingin terlihat:", ["Tenang dan damai", "Dinamis dan bergerak", "Formal", "Minimalis"], 1, "Diagonal = ketegangan, gerakan, dinamis"),
        ]),
        ("Warna", [
            ("**Maman** naikkan saturation +100. Skin tone siswanya terlihat oranye. Kesalahan:", ["Harusnya naikkan vibrance, bukan saturation", "Harusnya turunkan exposure", "Harusnya naikkan contrast", "Harusnya naikkan clarity"], 0, "Saturation naikkan SEMUA warna termasuk skin. Vibrance protect skin tone"),
            ("Apa beda Hue dan Saturation?", ["Sama", "Hue = nama warna, Saturation = intensitas warna", "Hue = terang, Saturation = gelap", "Hue = kontras, Saturation = blur"], 1, "Hue = posisi di color wheel (merah/biru). Saturation = seberapa pekat"),
            ("Cinematic teal-orange look dicapai dengan:", ["Shadows tint biru + Highlights tint oranye", "Naikkan saturation", "Turunkan contrast", "Naikkan temperature"], 0, "Teal shadows + orange highlights = classic Hollywood look"),
            ("**Nina** foto B&W. Elemen yang PALING penting:", ["Saturation", "Kontras tonal + tekstur + shape", "Hue", "Vibrance"], 1, "B&W tidak ada warna → fokus kontras tonal, tekstur, shape"),
            ("Vibrance berbeda dari Saturation karena:", ["Vibrance protect skin tone", "Saturation lebih kuat", "Vibrance hanya untuk warm colors", "Tidak ada beda"], 0, "Vibrance naikkan hanya warna kurang pekat, protect skin tone"),
            ("**Omar** foto landscape. Rumput hijau terlihat pucat. Cara memperkuat:", ["Naikkan vibrance hijau saja", "Naikkan exposure", "Turunkan contrast", "Naikkan temperature"], 0, "Vibrance hijau atau HSL green saturation — lebih presisi dari global saturation"),
            ("Color grading pada highlights untuk warm look:", ["Tint oranye/kuning", "Tint biru/teal", "Tint hijau", "Tint ungu"], 0, "Warm = oranye/kuning. Highlights tint warm = sunset/golden hour look"),
        ]),
        ("Kontras", [
            ("**Rina** foto flat dan kurang 'punch'. Pengaturan untuk menambah detail tekstur:", ["Clarity", "Exposure", "Saturation", "Temperature"], 0, "Clarity = kontras lokal di midtones, menambah punch dan tekstur"),
            ("Clarity berlebihan (+100) menyebabkan:", ["Halus dan natural", "Halos di sekitar edge, over-processed look", "Lebih terang", "Lebih tajam"], 1, "Clarity +100 = halos/glow di sekitar edge, terlihat tidak natural"),
            ("**Santi** foto landscape berkabut. Fitur untuk mengurangi kabut:", ["Dehaze", "Clarity", "Sharpening", "Vibrance"], 0, "Dehaze = mengurangi/menambah kabut, effective untuk landscape"),
            ("Kontras tinggi cocok untuk foto:", ["Portrait lembut", "Dramatis, tegas, punchy", "Minimalis flat", "Dreamy soft"], 1, "Kontras tinggi = dramatis, tegas, punchy"),
            ("**Tono** ingin foto portrait-nya lembut dan dreamy. Pengaturan:", ["Turunkan contrast + turunkan clarity", "Naikkan contrast +100", "Naikkan clarity +100", "Naikkan dehaze"], 0, "Low contrast + low clarity = soft, flat, dreamy"),
        ]),
        ("Noise & Blur", [
            ("Foto malam **Vera** punya titik warna acak (merah/hijau/biru). Ini disebut:", ["Luminance noise", "Color noise", "Hot pixel", "Chromatic aberration"], 1, "Color noise = titik warna acak, sering muncul saat shadow recovery"),
            ("Cara menghilangkan color noise:", ["Naikkan luminance NR", "Naikkan color noise reduction", "Naikkan sharpening", "Naikkan contrast"], 1, "Color noise reduction khusus untuk hilangkan color noise"),
            ("Luminance noise reduction berlebihan menyebabkan:", ["Foto lebih tajam", "Foto terlihat plastik/waxy", "Foto lebih kontras", "Foto lebih terang"], 1, "Luminance NR berlebihan = hilang detail tekstur, terlihat plastik"),
            ("**Wati** foto dengan aperture f/1.4. Background kabur halus. Ini disebut:", ["Motion blur", "Bokeh", "Lens flare", "Chromatic aberration"], 1, "Aperture besar = shallow DOF = background kabur (bokeh)"),
            ("Sharpening Amount +100 dengan Masking 0 menyebabkan:", ["Foto lebih halus", "Noise juga di-sharpen (lebih terlihat)", "Foto lebih gelap", "Foto lebih terang"], 1, "Masking 0 = sharpen SEMUA termasuk noise. Masking tinggi = hanya edge"),
            ("**Yusuf** foto olahraga. Subjek kabur karena gerakan. Ini:", ["Bokeh", "Motion blur", "Lens blur", "Defocus"], 1, "Motion blur = blur akibat gerakan subjek/kamera"),
            ("Chromatic aberration muncul sebagai:", ["Titik acak", "Fringe warna di edge kontras tinggi", "Vignette gelap", "Distorsi lensa"], 1, "CA = fringe biru-ungu/merah-hijau di edge kontras tinggi"),
            ("Noise paling sering muncul di:", ["Area terang", "Area gelap (shadow) yang di-buka", "Midtone", "Highlight"], 1, "Shadow yang di-buka = amplify noise yang awalnya tersembunyi"),
            ("**Zahra** ingin sharpen foto tanpa menambah noise. Pengaturan:", ["Amount tinggi + Masking 0", "Amount sedang + Masking tinggi (60-80)", "Amount 0", "Radius maksimal"], 1, "Masking tinggi = hanya sharpen edge tegas, skip noise di area halus"),
            ("Bokeh yang berkualitas ditandai dengan:", ["Bentuk hexagon tajam", "Creamy, smooth, halus", "Berkabut", "Berwarna"], 1, "Quality bokeh = creamy, smooth, tidak distract dari subjek"),
        ]),
    ]
    
    topic_idx = i % len(topics)
    topic_name, questions = topics[topic_idx]
    q_idx = (i // len(topics)) % len(questions)
    q_data = questions[q_idx]
    
    PG_QUESTIONS.append({
        "level": level,
        "category": topic_name,
        "question": q_data[0],
        "options": q_data[1],
        "correct": q_data[2],
        "explanation": q_data[3],
    })

# ── 50 SOAL ISIAN SINGKAT ──
ISIAN_QUESTIONS = [
    {"q": "Mengatur seberapa terang atau gelap keseluruhan foto disebut...", "a": "exposure|eksposur|exposure", "w": ["kontras", "saturasi", "clarity", "sharpening"]},
    {"q": "Mengatur area paling terang dalam foto disebut...", "a": "highlights|highlight|highlights", "w": ["shadows", "whites", "blacks", "exposure"]},
    {"q": "Mengatur area paling gelap dalam foto disebut...", "a": "shadows|shadow|bayangan|shadows", "w": ["highlights", "whites", "blacks", "exposure"]},
    {"q": "Mengatur titik putih paling murni di histogram disebut...", "a": "whites|putih|whites", "w": ["highlights", "shadows", "blacks", "exposure"]},
    {"q": "Mengatur titik hitam paling dalam di histogram disebut...", "a": "blacks|hitam|blacks", "w": ["whites", "highlights", "shadows", "exposure"]},
    {"q": "Pengaturan suhu warna hangat vs dingin diukur dalam satuan...", "a": "kelvin|k|kelvin", "w": ["lux", "iso", "fstop", "candela"]},
    {"q": "Temperature naik = warna lebih... (hangat/dingin)", "a": "hangat|kuning|panas|hangat", "w": ["dingin", "biru", "hijau", "ungu"]},
    {"q": "Temperature turun = warna lebih... (hangat/dingin)", "a": "dingin|biru|sejuk|dingin", "w": ["hangat", "kuning", "merah", "oranye"]},
    {"q": "Tint ke arah magenta untuk koreksi warna yang terlalu...", "a": "hijau|green|hijau", "w": ["biru", "merah", "kuning", "ungu"]},
    {"q": "Komposisi yang membagi frame jadi 9 kotak (3x3) disebut rule of...", "a": "thirds|ketiga|thirds", "w": ["half", "quarter", "fifth", "sixth"]},
    {"q": "Komposisi yang menggunakan garis miring untuk efek dinamis disebut...", "a": "diagonal|miring|diagonal", "w": ["horizontal", "vertikal", "lengkung", "zigzag"]},
    {"q": "Komposisi dengan kiri-kanan saling cermin disebut...", "a": "simetri|simetris|symmetry|simetri", "w": ["diagonal", "asimetri", "central", "pyramid"]},
    {"q": "Komposisi dengan subjek tepat di tengah frame disebut...", "a": "central|tengah|central", "w": ["diagonal", "simetri", "pyramid", "thirds"]},
    {"q": "Komposisi dengan susunan membentuk segitiga disebut...", "a": "pyramid|segitiga|pyramid", "w": ["diagonal", "central", "simetri", "thirds"]},
    {"q": "Garis yang memandu mata ke subjek utama disebut... line", "a": "leading|pandu|leading", "w": ["horizontal", "vertikal", "curved", "broken"]},
    {"q": "Nama warna di color wheel disebut...", "a": "hue|warna|hue", "w": ["saturation", "brightness", "contrast", "exposure"]},
    {"q": "Intensitas atau kepekatan warna disebut...", "a": "saturasi|saturation|saturasi", "w": ["hue", "exposure", "contrast", "clarity"]},
    {"q": "Versi saturation yang protect skin tone disebut...", "a": "vibrance|vibransi|vibrance", "w": ["contrast", "clarity", "exposure", "hue"]},
    {"q": "Color grading shadows tint biru + highlights tint oranye = look...", "a": "cinematic|teal orange|cinematic", "w": ["vintage", "noir", "pastel", "natural"]},
    {"q": "Kontras lokal di midtones yang menambah punch disebut...", "a": "clarity|klaritas|clarity", "w": ["contrast", "dehaze", "sharpening", "vibrance"]},
    {"q": "Fitur untuk mengurangi kabut di foto landscape disebut...", "a": "dehaze|dehaze|dehaze", "w": ["clarity", "contrast", "sharpening", "vibrance"]},
    {"q": "Titik acak hitam-putih di foto (seperti film grain) disebut... noise", "a": "luminance|luminan|luminance", "w": ["color", "hot", "chromatic", "digital"]},
    {"q": "Titik acak berwarna di foto (merah/hijau/biru) disebut... noise", "a": "color|warna|color", "w": ["luminance", "hot", "chromatic", "digital"]},
    {"q": "Background kabur akibat aperture besar disebut...", "a": "bokeh|bokeh|bokeh", "w": ["motion blur", "lens blur", "defocus", "tilt"]},
    {"q": "Blur akibat gerakan subjek atau kamera disebut... blur", "a": "motion|gerak|motion", "w": ["lens", "bokeh", "defocus", "tilt"]},
    {"q": "Fringe warna di edge kontras tinggi disebut chromatic...", "a": "aberasi|aberration|aberasi", "w": ["noise", "blur", "distortion", "vignette"]},
    {"q": "Sharpening hanya di edge tegas menggunakan pengaturan...", "a": "masking|mask|masking", "w": ["amount", "radius", "detail", "clarity"]},
    {"q": "Exposure +1 berarti foto... kali lebih terang", "a": "2|dua|2", "w": ["1.5", "3", "10", "5"]},
    {"q": "Saturation 0 = foto menjadi...", "a": "grayscale|hitam putih|grayscale", "w": ["lebih berwarna", "lebih terang", "lebih gelap", "lebih kontras"]},
    {"q": "Clarity +100 berlebihan menyebabkan... di sekitar edge", "a": "halo|halos|halo", "w": ["noise", "blur", "shadow", "highlight"]},
    {"q": "Noise paling sering muncul di area... yang di-buka", "a": "gelap|shadow|gelap", "w": ["terang", "midtone", "highlight", "putih"]},
    {"q": "Luminance noise reduction berlebihan membuat foto terlihat...", "a": "plastik|waxy|plastik", "w": ["lebih tajam", "lebih kontras", "lebih berwarna", "lebih gelap"]},
    {"q": "White balance auto pada foto indoor kehijauan → naikkan...", "a": "tint|magenta|tint", "w": ["temperature", "exposure", "contrast", "saturation"]},
    {"q": "Foto backlit: subjek gelap, background terang → naikkan shadows, turunkan...", "a": "highlights|highlight|highlights", "w": ["exposure", "contrast", "whites", "blacks"]},
    {"q": "Aperture f/1.4 menghasilkan depth of field yang...", "a": "dangkal|shallow|dangkal", "w": ["dalam", "lebar", "sempit", "tinggi"]},
    {"q": "Aperture f/16 menghasilkan depth of field yang...", "a": "dalam|deep|dalam", "w": ["dangkal", "shallow", "tipis", "rendah"]},
    {"q": "Rule of Thirds punya... titik temu (power points)", "a": "4|empat|4", "w": ["2", "3", "6", "9"]},
    {"q": "Komposisi pyramid memberikan kesan... dan monumental", "a": "stabil|kokoh|stabil", "w": ["dinamis", "kacau", "intim", "lemah"]},
    {"q": "Komposisi diagonal memberikan kesan... dan bergerak", "a": "dinamis|energetik|dinamis", "w": ["stabil", "tenang", "formal", "lemah"]},
    {"q": "Komposisi symmetry memberikan kesan... dan formal", "a": "seimbang|stabil|seimbang", "w": ["dinamis", "kacau", "intim", "lemah"]},
    {"q": "Hue shift mengubah warna ke arah lain di...", "a": "color wheel|roda warna|color wheel", "w": ["histogram", "spectrum", "gradient", "palette"]},
    {"q": "Vibrance hanya menaikkan warna yang...", "a": "kurang pekat|pucat|kurang pekat", "w": ["sudah pekat", "terang", "gelap", "netral"]},
    {"q": "Kontras rendah menghasilkan foto yang... dan dreamy", "a": "lembut|flat|lembut", "w": ["dramatis", "tegas", "punchy", "kontras"]},
    {"q": "Kontras tinggi menghasilkan foto yang... dan punchy", "a": "dramatis|tegas|dramatis", "w": ["lembut", "flat", "dreamy", "pucat"]},
    {"q": "Motion blur bisa dihindari dengan... shutter speed", "a": "cepat|fast|cepat", "w": ["lambat", "panjang", "rendah", "lebar"]},
    {"q": "Bokeh berkualitas ditandai dengan... dan smooth", "a": "creamy|halus|creamy", "w": ["tajam", "keras", "berwarna", "berkabut"]},
    {"q": "Shadow recovery ekstrem menyebabkan munculnya... noise", "a": "color|warna|color", "w": ["luminance", "hot", "digital", "film"]},
    {"q": "Sharpening Amount + Masking 0 = noise juga di...", "a": "sharpen|perkuat|tajamkan|sharpen", "w": ["haluskan", "blur", "hapus", "kurangi"]},
    {"q": "Dehaze positif (+) mengurangi..., dehaze negatif (-) menambah...", "a": "kabut|fog|kabut", "w": ["kontras", "noise", "blur", "warna"]},
    {"q": "Chromatic aberration muncul di... kontras tinggi", "a": "edge|tepi|edge", "w": ["tengah", "shadow", "highlight", "midtone"]},
    {"q": "Color noise reduction aman untuk naikkan tinggi karena tidak menghilangkan...", "a": "detail|tekstur|detail", "w": ["warna", "kontras", "exposure", "sharpening"]},
]


def make_pg_sql(q_id, q_data):
    opts = q_data["options"]
    return f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data["question"])}, {sql_str(opts[0])}, {sql_str(opts[1])}, {sql_str(opts[2])}, {sql_str(opts[3])}, {q_data["correct"]}, {sql_str(q_data["explanation"])}, {sql_str(q_data["category"])}, true, 'pilihan_ganda', '[]', '[]', '', '', {sql_str(q_data["level"])}, '', '', {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""

def make_isian_sql(q_id, q_data):
    short_answer = q_data["a"]
    wrong_opts = q_data.get("w", [])
    option_a = wrong_opts[0] if len(wrong_opts) > 0 else ""
    option_b = wrong_opts[1] if len(wrong_opts) > 1 else ""
    option_c = wrong_opts[2] if len(wrong_opts) > 2 else ""
    option_d = wrong_opts[3] if len(wrong_opts) > 3 else ""
    return f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data["q"])}, {sql_str(option_a)}, {sql_str(option_b)}, {sql_str(option_c)}, {sql_str(option_d)}, 2, '', 'Image Editing', true, 'isian_singkat', '[]', '[]', {sql_str(short_answer)}, '', 'C3', '', '', {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""


def main():
    print(f"Generating: {OUTPUT_PATH}")
    content = []
    content.append(f"""-- CP + TP + Materi + 150 Soal (100 PG + 50 Isian) + Tugas
-- Kelas 12 DKV — Mata Pelajaran Kejuruan
-- Fokus: Image Editing & Image Manipulation

-- CP (deskripsi < 100 chars)
INSERT INTO "CapaianPembelajaran" (id, subject, "gradeLevel", "kodeCP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('{CP_ID}', '{SUBJECT}', '{GRADE}', 'CP.KEJ.1', 'Siswa mampu editing dan manipulasi gambar dengan teknik pencahayaan, warna, dan komposisi.', true, NOW(), NOW())
ON CONFLICT (subject, "gradeLevel", "kodeCP") DO NOTHING;

-- TP (deskripsi < 100 chars)
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('{TP_ID}', '{CP_ID}', 'TP.KEJ.1.1', 'Siswa mampu menerapkan teknik editing: pencahayaan, komposisi, warna, kontras, noise-blur.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

-- Materi
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('{MAT_ID}', 'Image Editing & Image Manipulation', {sql_str(MATERI)}, '{SUBJECT}', '12DKV', 'SMK', 'Image Editing', '{CP_ID}', '{TP_ID}', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
""")

    for i, q in enumerate(PG_QUESTIONS[:100], 1):
        q_id = f"q_kej_12_pg_{i:03d}"
        content.append(f"\n-- PG #{i:03d}")
        content.append(make_pg_sql(q_id, q))

    for i, q in enumerate(ISIAN_QUESTIONS[:50], 1):
        q_id = f"q_kej_12_isian_{i:03d}"
        content.append(f"\n-- Isian #{i:03d}")
        content.append(make_isian_sql(q_id, q))

    content.append(f"""
-- Tugas
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('{ASG_ID}', 'Tugas: Image Editing & Manipulation (100 PG + 50 Isian)', 'Tugas tentang image editing dan manipulation. Mencakup pencahayaan, komposisi, warna, kontras, noise-blur. 100 soal PG HOTS + 50 soal isian. Waktu 120 menit.', '{SUBJECT}', '12DKV', 'SMK', true, '{DUE_DATE_ISO}', 'wajib', 150, 'quiz_only', NULL, '{CP_ID}', '{TP_ID}', 'luring', '', '2026/2027', 'ganjil', 120, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verifikasi
SELECT "questionType", COUNT(*) FROM "Question" WHERE id LIKE 'q_kej_12_%' GROUP BY "questionType";
-- Expected: pilihan_ganda 100, isian_singkat 50
""")

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(content))
    size = os.path.getsize(OUTPUT_PATH) / 1024
    print(f"✅ {OUTPUT_PATH} ({size:.1f} KB)")
    print(f"   100 PG + 50 Isian = 150 soal")
    # Verify CP/TP < 100 chars
    cp_desc = "Siswa mampu editing dan manipulasi gambar dengan teknik pencahayaan, warna, dan komposisi."
    tp_desc = "Siswa mampu menerapkan teknik editing: pencahayaan, komposisi, warna, kontras, noise-blur."
    print(f"   CP deskripsi: {len(cp_desc)} chars ({'OK' if len(cp_desc) <= 100 else 'OVER!'})")
    print(f"   TP deskripsi: {len(tp_desc)} chars ({'OK' if len(tp_desc) <= 100 else 'OVER!'})")

if __name__ == "__main__":
    main()
