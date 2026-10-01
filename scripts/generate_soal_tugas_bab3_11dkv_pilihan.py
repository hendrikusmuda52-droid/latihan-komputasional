#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator SQL: Bank Soal Bab 3 (100 PG + 50 Isian) + Tugas (75 PG + 20 Isian)
Kelas 11 DKV — Mata Pelajaran Pilihan
Bab 3: Mengoperasikan Kamera DSLR/Mirrorless
"""

import os

OUTPUT_PATH = "/home/z/my-project/download/insert_soal_tugas_bab3_11dkv_pilihan.sql"
DUE_DATE_ISO = "2026-10-02T23:59:00+07:00"  # Besok
GRADE = "11DKV"
SUBJECT = "Mata Pelajaran Pilihan"
CP_ID = "cp_dkv_pil_11_3"
TP_ID = "tp_dkv_pil_11_3_1"
ASG_ID = "asg_dkv_pil_11_3_tugas"

def sql_escape(text):
    if text is None: return ""
    return text.replace("'", "''")

def sql_str(text):
    return f"'{sql_escape(text)}'"

# ── 100 SOAL PG HOTS (Analysis) — Kamera DSLR/Mirrorless ──
PG_DATA = [
    # ── Eksposur Segitiga (15 soal) ──
    ("**Andi** memotret di ruangan gelap. Foto hasilnya terlalu gelap. Ia ingin memperbaiki tanpa flash. Analisis: pengaturan yang TEPAT adalah...", ["Naikkan ISO saja tanpa pertimbangan lain", "Buka aperture lebih lebar (f/1.8) + naikkan ISO + perpanjang shutter", "Pendekkan shutter speed saja", "Turunkan ISO"], 1, "Segitiga eksposur: aperture lebar + ISO tinggi + shutter lambat = lebih banyak cahaya masuk"),
    ("**Siti** foto olahraga dalam ruangan. Subjek blur karena gerakan. Analisis penyebab dan solusi:", ["ISO terlalu rendah → naikkan ISO untuk shorten shutter", "Aperture terlalu lebar → tutup aperture", "Shutter terlalu cepat → perlambat", "Tidak ada hubungannya dengan eksposur"], 0, "Motion blur terjadi karena shutter terlalu lambat. Naikkan ISO supaya bisa shorten shutter tanpa underexpose"),
    ("**Budi** pakai aperture f/2.8, ISO 400, shutter 1/60. Foto overexpose. Analisis langkah fix yang TEPAT:", ["Turunkan ISO ke 100 atau shorten shutter ke 1/250", "Buka aperture lebih lebar", "Naikkan ISO", "Pakai flash"], 0, "Overexpose = terlalu banyak cahaya. Turunkan ISO atau shorten shutter untuk kurangi cahaya"),
    ("Apa yang terjadi jika **Dina** naikkan ISO dari 800 ke 6400 di kondisi cahaya sama?", ["Foto lebih gelap", "Foto lebih terang tapi noise meningkat", "Foto lebih tajam", "Tidak ada perubahan"], 1, "ISO tinggi = sensor lebih sensitif = lebih terang, tapi noise meningkat signifikan"),
    ("**Eka** pakai f/4, ISO 200, 1/125. **Fajar** pakai f/8, ISO 200, 1/125. Analisis perbedaan hasil:", ["Foto Eka lebih gelap (aperture lebih kecil = lebih sedikit cahaya)", "Foto Fajar lebih terang", "Sama saja", "Foto Eka lebih tajam"], 0, "f/4 (angka kecil = bukaan besar) = lebih banyak cahaya daripada f/8. Foto Eka lebih terang"),
    ("Segitiga eksposur terdiri dari 3 elemen yang saling memengaruhi:", ["ISO, WB, Metering", "Aperture, Shutter Speed, ISO", "Focal length, Focus, Zoom", "Megapixel, Sensor, Lens"], 1, "Segitiga eksposur: Aperture (bukaan) + Shutter Speed (kecepatan) + ISO (sensitivitas)"),
    ("**Gita** foto landscape. Ia ingin semua tajam dari depan ke belakang. Pengaturan yang TEPAT:", ["f/1.4, ISO 6400, 1/1000", "f/16, ISO 100, 1/60 (pakai tripod)", "f/2.8, ISO 3200, 1/30", "f/8, ISO 6400, 1/4000"], 1, "f/16 = DOF dalam (semua tajam). ISO 100 = clean. Tripod untuk hindari shake di 1/60"),
    ("**Hadi** foto malam tanpa tripod. Shutter 1/15 menghasilkan blur. Solusi praktis:", ["Pakai tripod atau naikkan ISO untuk shorten shutter", "Tutup aperture", "Turunkan ISO", "Ganti lensa"], 0, "Tripod = stabil. Atau naikkan ISO supaya shutter lebih cepat (1/60+) untuk handheld"),
    ("Hubungan aperture dan depth of field:", ["Aperture besar (f/1.4) = DOF dalam", "Aperture kecil (f/16) = DOF dangkal", "Aperture besar (f/1.4) = DOF dangkal", "Tidak ada hubungan"], 2, "Aperture besar (f/1.4) = bukaan lebar = DOF dangkal (background kabur). Aperture kecil (f/16) = DOF dalam"),
    ("**Ira** pakai shutter 1/4000. Analisis efek pada foto:", ["Motion blur maksimal", "Freeze motion (hentikan gerakan)", "Foto overexpose pasti", "Background kabur"], 1, "Shutter sangat cepat (1/4000) = freeze motion, hentikan gerakan subjek"),
    ("**Joko** foto air terjun. Ia ingin efek air mengalir halus (smooth). Pengaturan:", ["Shutter 1/4000", "Shutter 1/2000", "Shutter 2-5 detik (pakai tripod + ND filter)", "Shutter 1/60"], 2, "Shutter lambat (2-5s) = motion blur pada air = efek smooth. Butuh tripod + ND filter"),
    ("ISO 100 vs ISO 6400. Analisis perbedaan utama:", ["Tidak ada beda", "ISO 100 = clean/no noise, ISO 6400 = noisy", "ISO 100 = lebih terang", "ISO 6400 = lebih tajam"], 1, "ISO rendah = clean, ISO tinggi = noisy. ISO tidak membuat foto lebih tajam"),
    ("Aperture f/2.8 dibandingkan f/8. Mana yang menghasilkan lebih banyak cahaya?", ["f/8", "f/2.8", "Sama", "Tergantung ISO"], 1, "f/2.8 = bukaan lebih besar = lebih banyak cahaya masuk dibanding f/8"),
    ("**Kiki** foto concert. Cahaya minim, subjek bergerak. Strategi terbaik:", ["f/16, ISO 100, 1/4000", "f/2.8, ISO 3200-6400, 1/250", "f/8, ISO 200, 1/30", "f/22, ISO 100, 30s"], 1, "Concert: aperture lebar (f/2.8) + ISO tinggi (3200-6400) + shutter cukup cepat (1/250) untuk freeze"),
    ("Metering mode yang mengukur cahaya dari seluruh frame secara merata disebut:", ["Spot metering", "Center-weighted", "Evaluative/Matrix", "Partial"], 2, "Evaluative/Matrix = ukur seluruh frame secara merata. Spot = titik kecil. Center = area tengah"),
    # ── Mode Kamera (10 soal) ──
    ("Mode 'A' atau 'Av' pada kamera DSLR berarti:", ["Aperture Priority — fotografer atur aperture, kamera atur shutter", "Auto — kamera atur semua", "Action mode", "Aperture locked"], 0, "Aperture Priority: fotografer set aperture, kamera otomatis atur shutter speed"),
    ("Mode 'S' atau 'Tv' pada kamera berarti:", ["Shutter Priority — fotografer atur shutter, kamera atur aperture", "Self-timer", "Silent mode", "Sports mode"], 0, "Shutter Priority: fotografer set shutter speed, kamera otomatis atur aperture"),
    ("Mode 'M' pada kamera berarti:", ["Macro", "Manual — fotografer atur aperture DAN shutter sendiri", "Movie/Video", "Memory"], 1, "Manual: fotografer full kontrol aperture + shutter. Kamera tidak auto-adjust"),
    ("Mode 'P' (Program) berarti:", ["Professional mode", "Program AE — kamera atur aperture + shutter, fotografer bisa shift", "Portrait", "Panorama"], 1, "Program AE: kamera atur aperture + shutter, tapi fotografer bisa shift (program shift)"),
    ("**Lia** ingin blur background maksimal untuk portrait. Mode yang tepat:", ["M dengan f/16", "Av/A dengan f/1.8", "P mode", "Auto mode"], 1, "Av/A mode + aperture lebar (f/1.8) = blur background maksimal. Kamera atur shutter otomatis"),
    # ── Fokus & Autofokus (15 soal) ──
    ("AF-S (Single AF) cocok untuk:", ["Subjek bergerak cepat", "Subjek diam (landscape, still life, portrait)", "Video", "Macro saja"], 1, "AF-S = fokus sekali, lock. Cocok untuk subjek diam"),
    ("AF-C (Continuous AF) cocok untuk:", ["Subjek diam", "Landscape", "Subjek bergerak (olahraga, wildlife)", "Tripod shot"], 2, "AF-C = fokus terus menerus menyesuaikan. Cocok untuk subjek bergerak"),
    ("**Maman** foto burung terbang. AF mode yang tepat:", ["AF-S", "AF-C + tracking", "Manual focus", "Macro AF"], 1, "AF-C + tracking = fokus mengikuti subjek bergerak. AF-S hanya untuk subjek diam"),
    ("Focus point tunggal (single point AF) digunakan untuk:", ["Subjek bergerak cepat", "Presisi tinggi — pilih titik fokus spesifik (mis: mata portrait)", "Landscape", "Wide angle"], 1, "Single point = presisi tinggi, cocok untuk portrait (fokus ke mata)"),
    ("**Nina** foto portrait. Fokus harus tepat di:", ["Hidung", "Mata (nearest eye)", "Telinga", "Rambut"], 1, "Aturan portrait: fokus ke mata terdekat kamera. Mata = elemen paling penting"),
    ("Back-button focus memisahkan tombol fokus dari tombol shutter. Keuntungannya:", ["Tidak ada keuntungan", "Bisa lock fokus tanpa tekan shutter, fleksibel untuk recompose", "Foto lebih terang", "Shutter lebih cepat"], 1, "Back-button: fokus dengan tombol belakang, shutter hanya untuk jepret. Bisa lock + recompose"),
    ("**Omar** foto produk kecil (macro). AF sering gagal. Solusi:", ["Pakai AF-C", "Switch ke manual focus + live view magnify", "Naikkan ISO", "Buka aperture maksimal"], 1, "Macro: DOF sangat tipis, AF sering miss. Manual focus + live view magnify = presisi"),
    ("Depth of field dipengaruhi oleh 3 faktor:", ["ISO, WB, Metering", "Aperture, focal length, jarak ke subjek", "Shutter, ISO, WB", "Megapixel, sensor, lens"], 1, "DOF dipengaruhi: aperture (f/1.4=dangkal), focal length (200mm=dangkal), jarak (dekat=dangkal)"),
    ("**Qori** pakai lensa 50mm f/1.8. DOF-nya dibandingkan 50mm f/8:", ["Sama", "f/1.8 lebih dangkal (background lebih kabur)", "f/8 lebih dangkal", "Tidak ada hubungan"], 1, "f/1.8 = aperture besar = DOF lebih dangkal = background lebih kabur dibanding f/8"),
    ("Hyperfocal distance adalah:", ["Jarak fokus maksimal lensa", "Jarak di mana semua dari setengah jarak itu sampai infinity terlihat tajam", "Jarak minimal fokus macro", "Jarak antara kamera dan tripod"], 1, "Hyperfocal = fokus di titik tertentu → semua dari setengah jarak itu sampai infinity tajam. Cocok landscape"),
    ("**Rina** foto group foto 10 orang berbaris. Agar semua tajam:", ["f/1.4, fokus ke orang depan", "f/8-f/11, fokus ke orang tengah baris ke-2", "f/2.8, fokus ke orang belakang", "f/22, fokus ke infinity"], 1, "Group photo: aperture kecil (f/8-f/11) untuk DOF dalam + fokus ke baris tengah"),
    ("Focus peaking (di mirrorless) membantu:", ["Menambah bokeh", "Highlight area yang in-focus (warna) untuk manual focus", "Menambah kontras", "Kurangi noise"], 1, "Focus peaking = highlight edge yang in-focus dengan warna. Membantu manual focus presisi"),
    ("Face/Eye detection AF paling berguna untuk:", ["Landscape", "Portrait — auto detect dan fokus ke mata", "Astrofotografi", "Macro"], 1, "Face/Eye AF = auto detect wajah + fokus ke mata. Sangat berguna untuk portrait"),
    ("**Santi** foto bunga dengan lensa macro 100mm. DOF sangat tipis. Cara memperluas DOF:", ["Buka aperture ke f/2.8", "Tutup aperture ke f/16-f/22", "Naikkan ISO", "Shorten shutter"], 1, "Macro DOF tipis. Tutup aperture (f/16-f/22) untuk perluas DOF — semua bagian bunga tajam"),
    # ── Lensa & Focal Length (15 soal) ──
    ("Lensa 50mm f/1.8 disebut lensa:", ["Wide angle", "Standard/Normal (mendekati pandangan mata)", "Telephoto", "Fisheye"], 1, "50mm = standard/normal lens, mendekati field of view mata manusia"),
    ("Lensa 200mm termasuk kategori:", ["Wide angle", "Standard", "Telephoto (untuk subjek jauh)", "Macro"], 2, "200mm = telephoto, untuk subjek jauh (wildlife, sport, portrait dengan kompresi background"),
    ("Lensa 16mm termasuk kategori:", ["Wide angle (bidang luas, distorsi pinggiran)", "Telephoto", "Macro", "Fisheye"], 0, "16mm = wide angle, bidang luas, ada distorsi pinggiran (barrel distortion)"),
    ("**Tono** foto architecture. Ia butuh bidang luas tanpa distorsi. Lensa:", ["Fisheye 8mm", "Wide angle 16-24mm (prime/tilt-shift ideal)", "Telephoto 200mm", "Macro 100mm"], 1, "Wide 16-24mm untuk architecture. Tilt-shift lebih ideal (koreksi converging lines)"),
    ("Lensa zoom vs prime:", ["Zoom lebih tajam selalu", "Prime (fixed focal length) biasanya lebih tajam + aperture lebih lebar", "Sama saja", "Zoom lebih ringan"], 1, "Prime (fixed) = lebih tajam, aperture lebar (f/1.4), ringan. Zoom = fleksibel tapi trade-off kualitas"),
    ("**Vera** foto portrait. Ia ingin background terkompresi (dekat dengan subjek). Lensa:", ["16mm wide", "85mm-135mm telephoto", "50mm standard", "Fisheye"], 1, "Telephoto (85-135mm) = kompresi background (background terlihat lebih dekat) + bokeh creamy"),
    ("Crop factor pada kamera APS-C (mis: 1.5x) memengaruhi:", ["Megapixel", "Focal length efektif (50mm = 75mm equivalent)", "ISO range", "Tidak ada efek"], 1, "APS-C crop 1.5x: 50mm menjadi 75mm equivalent. Bidang lebih sempit dibanding full-frame"),
    ("Image stabilization (IS/VR/OS) pada lensa berfungsi untuk:", ["Menambah tajam foto", "Kompensasi getaran tangan (shake) — bisa shutter lebih lambat handheld", "Menambah cahaya", "Kurangi noise"], 1, "IS/VR = kompensasi shake. Bisa handheld di shutter lebih lambat (3-4 stop) tanpa blur"),
    ("**Wati** foto landscape. Lensa terbaik:", ["200mm telephoto", "16-35mm wide angle", "100mm macro", "600mm super tele"], 1, "Landscape: wide angle 16-35mm untuk bidang luas. Tele untuk detail/compress"),
    ("Lensa f/2.8 dibandingkan f/4. Keuntungan utama f/2.8:", ["Lebih ringan", "Lebih banyak cahaya (1 stop) + bokeh lebih creamy", "Lebih tajam", "Lebih murah"], 1, "f/2.8 = 1 stop lebih banyak cahaya dari f/4. Bokeh lebih creamy. Tapi lebih berat + mahal"),
    ("Bokeh dipengaruhi oleh:", ["Hanya aperture", "Aperture + focal length + jarak subjek-background + desain lensa", "ISO saja", "Shutter speed"], 1, "Bokeh: aperture lebar + focal length panjang + subjek dekat + background jauh = bokeh maksimal"),
    ("**Yusuf** foto di ruang sempit. Lensa yang tepat:", ["200mm", "85mm", "24mm atau lebih wide", "100mm macro"], 2, "Ruang sempit = wide angle (24mm atau lebih wide) untuk muat semua subjek"),
    ("Lens distortion (barrel/pincushion) paling terlihat pada:", ["Telephoto", "Wide angle", "Macro", "Standard 50mm"], 1, "Wide angle = barrel distortion (pinggir melengkung). Dapat dikoreksi di post-processing"),
    ("Chromatic aberration (color fringing) muncul di:", ["Tengah frame", "Edge/kontras tinggi — fringe biru-ungu/merah-hijau", "Shadow area", "Highlight area"], 1, "CA muncul di edge kontras tinggi sebagai fringe warna. Dapat dikoreksi di Lightroom"),
    ("**Zahra** punya budget terbatas. Lensa pertama yang direkomendasikan:", ["400mm f/2.8", "50mm f/1.8 (nifty fifty — murah, tajam, bokeh)", "8mm fisheye", "100mm macro"], 1, "50mm f/1.8 = 'nifty fifty': murah, tajam, aperture lebar, bokeh bagus. Lensa serbaguna"),
    # ── White Balance & File Format (15 soal) ──
    ("White balance berfungsi untuk:", ["Mengatur eksposur", "Mengatur suhu warna agar putih terlihat putih (tidak kekuningan/kebiruan)", "Menambah kontras", "Mengatur ISO"], 1, "WB = koreksi suhu warna agar neutral. Putih = putih, tidak warm/cool"),
    ("AWB (Auto White Balance) sering gagal di:", ["Outdoor siang", "Lampu neon/LED (green tint) atau campuran sumber cahaya", "Studio strobe", "Sunset"], 1, "AWB gagal di: neon/LED (green), mixed lighting, sunset (terlalu warm). Manual WB lebih akurat"),
    ("Custom white balance menggunakan:", ["ISO setting", "Kartu abu-abu 18% atau white card", "Aperture setting", "Shutter speed"], 1, "Custom WB: foto kartu abu-abu/putih → set sebagai referensi WB. Paling akurat"),
    ("RAW vs JPEG. Keuntungan utama RAW:", ["File lebih kecil", "Data mentah sensor — lebih banyak info untuk editing (WB, exposure, highlight recovery)", "Langsung jadi", "Bisa langsung upload"], 1, "RAW = data mentah, 12-14 bit. Bisa recover highlight/shadow ekstrem, ubah WB lossless. JPEG = 8 bit, compressed"),
    ("**Adi** foto JPEG. Ia salah white balance. Solusi:", ["Tidak bisa diperbaiki", "Bisa diperbaiki di post tapi kualitas turun (artifacts)", "Bisa diperbaiki sempurna", "Hanya bisa di RAW"], 1, "JPEG: WB bisa di-fix tapi kualitas turun (color cast artifacts). RAW: fix WB lossless"),
    ("RAW file ukurannya:", ["Lebih kecil dari JPEG", "5-10x lebih besar dari JPEG", "Sama dengan JPEG", "Tergantung ISO"], 1, "RAW = 25-50MB per file (vs JPEG 5-10MB). Tapi menyimpan lebih banyak data"),
    ("Color space sRGB vs Adobe RGB:", ["Sama saja", "sRGB = standar web/layar. Adobe RGB = lebih luas (untuk print)", "Adobe RGB untuk video", "sRGB untuk print"], 1, "sRGB = standar web/layar. Adobe RGB = gamut lebih luas untuk print pro"),
    ("**Boni** foto sunset. AWB menghasilkan warna terlalu netral (hilang warm). Solusi:", ["Pakai AWB saja", "Set WB manual ke Daylight/Shady (pertahankan warm)", "Set WB Tungsten", "Ganti ISO"], 1, "Daylight/Shady WB = pertahankan warm sunset. AWB sering netralisasi warm sunset"),
    ("WB Tungsten/Incandescent (3200K) menghasilkan:", ["Warna hangat", "Warna sangat biru (kompensasi lampu kuning)", "Warna hijau", "Warna netral"], 1, "Tungsten = very cool/blue, untuk kompensasi lampu pijar yang sangat kuning"),
    ("WB Daylight/Sunny (5500K) cocok untuk:", ["Lampu neon", "Cahaya matahari siang hari", "Lampu lilin", "Bayangan"], 1, "Daylight 5500K = standar cahaya matahari siang. Netral, natural"),
    ("**Citra** foto indoor dengan lampu kunang-kunang (warm). WB yang tepat:", ["Daylight", "Custom WB atau auto dengan koreksi", "Tungsten", "Fluorescent"], 1, "Mixed warm light = custom WB paling akurat. Atau auto + koreksi di post (RAW)"),
    ("Bit depth 14-bit vs 12-bit. Keuntungan 14-bit:", ["File lebih kecil", "Lebih banyak gradasi warna (16,384 vs 4,096 level per channel)", "Foto lebih terang", "Tidak ada beda"], 1, "14-bit = 16,384 level per channel vs 12-bit = 4,096. Lebih banyak gradasi = smoother gradient"),
    ("**Dina** foto produk untuk e-commerce. Format file yang tepat:", ["RAW (edit dulu lalu export JPEG)", "JPEG langsung dari kamera", "TIFF saja", "PNG"], 0, "Produk: foto RAW → edit presisi (WB, exposure, color) → export JPEG. Kualitas terbaik"),
    ("Noise reduction in-camera (High ISO NR) sebaiknya:", ["Selalu maksimal", "Low/Off — lebih baik edit di post (Lightroom) untuk kontrol penuh", "Selalu Off", "Tergantung WB"], 1, "In-camera NR sering over-processing. Better: NR low/off di kamera, edit di post untuk kontrol"),
    ("**Eka** foto dengan Dual SD Card. Strategi backup:", ["Simpan di 1 card saja", "Card 1: RAW, Card 2: JPEG (atau backup RAW)", "Card 1: JPEG, Card 2: video", "Tidak perlu backup"], 1, "Dual card: Card 1 RAW + Card 2 backup (RAW atau JPEG). Redundansi = aman dari card corruption"),
    # ── Komposisi & Praktik (15 soal) ──
    ("Rule of Thirds membagi frame menjadi:", ["2 bagian", "9 kotak (3x3) dengan 4 titik temu", "4 bagian diagonal", "Lingkaran"], 1, "Rule of Thirds = 3x3 = 9 kotak, 4 power points di titik temu"),
    ("**Fajar** foto silhouette di sunset. Subjek harus:", ["Terang", "Gelap (underexpose subjek, expose untuk langit)", "Setengah terang", "Tergantung ISO"], 1, "Silhouette: expose untuk background (langit), subjek jadi gelap. Metering ke langit"),
    ("Leading lines dalam komposisi berfungsi untuk:", ["Mengaburkan background", "Memandu mata ke subjek utama", "Menambah kontras", "Mengatur WB"], 1, "Leading lines = garis yang memandu mata penonton menuju subjek utama"),
    ("**Gita** foto street. Ia ingin candid natural. Lensa terbaik:", ["200mm tele (jauh, tidak terlihat)", "35mm atau 50mm (dekat, natural perspective)", "16mm wide", "100mm macro"], 1, "35mm/50mm = natural perspective, dekat dengan subjek, immersive. 200mm = terlalu jauh/spying feel"),
    ("Negative space digunakan untuk:", ["Menambah elemen", "Memberi ruang kosong yang menonjolkan subjek", "Mengatur eksposur", "Menambah noise"], 1, "Negative space = ruang kosong di sekitar subjek → menonjolkan subjek, kesan minimalis/dramatis"),
    ("**Hadi** foto food. Sudut yang paling umum dan efektif:", ["Eye level", "Top-down/flat lay (90°)", "Bottom-up", "45° angle"], 1, "Food: top-down/flat lay paling populer (Instagram style). 45° juga umum untuk dimensional"),
    ("Golden hour adalah waktu:", ["Tengah hari", "1 jam setelah sunrise dan 1 jam sebelum sunset", "Tengah malam", "Kapan saja"], 1, "Golden hour = cahaya hangat, lembut, shadow panjang. 1 jam setelah sunrise / sebelum sunset"),
    ("Blue hour adalah waktu:", ["Siang hari", "20-30 menit setelah sunset / sebelum sunrise — langit biru deep", "Golden hour", "Malam hari"], 1, "Blue hour = langit biru-deep, suasana cool/moody. 20-30 menit setelah sunset/sebelum sunrise"),
    ("**Ira** foto landscape. Filter yang berguna:", ["UV filter", "ND filter (kurangi cahaya untuk shutter lambat) + CPL (kurangi refleksi/polarisasi)", "Flash", "Tidak perlu filter"], 1, "ND = shutter lambat (smooth air). CPL = kurangi refleksi, kontras langit. Sangat berguna landscape"),
    ("CPL (Circular Polarizer) filter berfungsi untuk:", ["Menambah cahaya", "Kurangi refleksi di air/kaca + kontras langit + saturasi alami", "Soft focus", "Menambah bokeh"], 1, "CPL = kurangi refleksi, darken langit, saturasi alami. Tidak bisa diganti di post"),
    ("**Joko** foto long exposure 30 detik di siang hari. Filter wajib:", ["UV filter", "ND filter (10 stop) untuk kurangi cahaya", "CPL", "Tidak perlu"], 1, "Siang hari = terlalu terang untuk 30s. ND 10-stop = kurangi cahaya 1000x supaya 30s possible"),
    ("Histogram yang ideal (exposure correct) biasanya:", ["Semua di kiri (underexpose)", "Semua di kanan (overexpose)", "Distribusi merata, tidak menumpuk di ujung", "Tidak terlihat"], 2, "Histogram ideal = bell curve di tengah, tidak clip di kiri (shadow) atau kanan (highlight)"),
    ("**Kiki** cek histogram. Data menumpuk di ujung kanan. Artinya:", ["Underexpose", "Overexpose (highlight clipped/blown out)", "Tepat eksposur", "ISO terlalu rendah"], 1, "Numpuk di kanan = overexpose, highlight blown out. Detail terang hilang permanen"),
    ("ETTR (Expose To The Right) adalah teknik:", ["Underexpose", "Eksposur sedikit over (histogram ke kanan) untuk maksimalkan data tanpa clip", "Selalu ISO 100", "Pakai tripod"], 1, "ETTR = eksposur sedikit terang (kanan histogram) untuk capture lebih banyak data (less noise in shadow). RAW only"),
    ("**Lia** foto dengan lensa 24mm. Karakteristik foto:", ["Kompresi background kuat", "Bidang luas, distorsi pinggir, foreground tampak besar", "Background dekat", "Bokeh maksimal"], 1, "24mm wide = bidang luas, barrel distortion, foreground exaggeration (benda dekat terlihat lebih besar)"),
    ("Rule of thumb shutter speed untuk handheld (tanpa IS):", ["1/30 selalu", "1/focal_length (50mm → 1/50, 200mm → 1/200)", "1/1000 selalu", "Tidak ada rule"], 1, "Reciprocal rule: shutter ≥ 1/focal_length. 50mm → 1/50, 200mm → 1/200. Dengan IS bisa 3-4 stop lebih lambat"),
    # ── Post-Processing & Output (15 soal) ──
    ("**Maman** edit RAW di Lightroom. Urutan editing yang logis:", ["Sharpening dulu, lalu exposure", "Exposure/WB dulu, lalu kontras/warna, terakhir sharpening NR", "Crop pertama, NR terakhir", "Tidak ada urutan"], 1, "Urutan: 1) WB/exposure 2) kontras/clarity 3) warna/vibrance 4) NR 5) sharpening. Sharpening selalu terakhir"),
    ("Clarity di Lightroom adalah:", ["Global contrast", "Local/midtone contrast — menambah punch dan tekstur", "Saturation", "Exposure"], 1, "Clarity = kontras lokal di midtone. Tambah punch/tekstur. Berlebihan = halo"),
    ("Dehaze berfungsi untuk:", ["Menambah bokeh", "Mengurangi/menambah kabut — kontras directional", "Mengatur WB", "Sharpening"], 1, "Dehaze = kurangi/tambah kabut. Effective untuk landscape berkabut atau tambah mood"),
    ("**Nina** ekspor foto untuk Instagram. Format dan ukuran:", ["RAW 50MB", "JPEG sRGB, 1080x1080px (square) atau 1080x1350 (portrait), quality 80%", "JPEG Adobe RGB, 4000px", "PNG 100%"], 1, "Instagram: JPEG sRGB, 1080px (max), quality 80%. sRGB wajib (Adobe RGB akan terlihat flat di web)"),
    ("Sharpening output (for screen vs print):", ["Sama saja", "Print butuh lebih banyak sharpening daripada screen", "Screen butuh lebih banyak", "Tidak perlu sharpening"], 1, "Print = butuh lebih banyak sharpening (paper absorbs ink = softer). Screen = sharpening moderat"),
    ("**Omar** foto landscape. Ia pakai HDR (3 bracket exposures). Tujuan:", ["Menambah bokeh", "Capture dynamic range luas — detail di shadow + highlight", "Menambah ISO", "Menambah focal length"], 1, "HDR = multiple exposures (under, normal, over) → merge. Capture detail di shadow + highlight yang tidak mungkin 1 frame"),
    ("Over-editing (over-processed) ditandai oleh:", ["Foto natural", "Halos di clarity, saturasi berlebih, HDR glow, skin tone rusak", "Foto tajam", "Foto terang"], 1, "Over-editing: halos (clarity tinggi), neon saturation, HDR glow, waxy skin. Natural is better"),
    ("**Qori** batch edit 100 foto. Fitur Lightroom yang berguna:", ["Sync settings — copy edit dari 1 foto ke lainnya", "Edit manual satu per satu", "Export dulu", "Tidak bisa batch"], 0, "Sync = copy settings dari 1 foto ke multiple. Sangat efisien untuk batch edit (mis: wedding)"),
    ("Lens correction profile di Lightroom berfungsi untuk:", ["Menambah bokeh", "Koreksi distorsi + chromatic aberration + vignetting otomatis", "Mengatur eksposur", "Sharpening"], 1, "Lens profile = koreksi otomatis distorsi + CA + vignetting berdasarkan profil lensa"),
    ("**Rina** foto portrait. Skin tone terlihat oranye setelah edit. Penyebab:", ["Sharpening berlebih", "Saturation berlebih — pakai vibrance atau HSL untuk protect skin", "ISO tinggi", "WB salah"], 1, "Saturation naikkan semua warna termasuk skin. Fix: vibrance (protect skin) atau HSL orange/red adjustment"),
    ("Export sharpening 'Screen' vs 'Print':", ["Sama", "Screen = softer, Print = stronger", "Screen = stronger, Print = softer", "Tidak ada beda"], 1, "Screen = softer sharpening (layar = sharp). Print = stronger (paper absorbs = softer)"),
    ("**Santi** mau backup foto. Strategi 3-2-1:", ["3 copy di 1 tempat", "3 copy, 2 media berbeda, 1 offsite (cloud)", "1 copy di memory card", "2 copy di laptop"], 1, "3-2-1: 3 copy, 2 media berbeda (HDD + SSD), 1 offsite (cloud). Rule backup terbaik"),
    ("Vignette (tepi gelap) bisa:", ["Hanya ditambah", "Ditambah atau dikurangi (post-crop vignette)", "Hanya dikurangi", "Tidak bisa di-edit"], 1, "Vignette: tambah (darken edge = fokus ke tengah) atau kurangi (brighten edge). Post-crop vignette di Lightroom"),
    ("**Tono** foto produk untuk marketplace. Background harus:", ["Ramai pattern", "Putih polos (easy cutout, clean, profesional)", "Gradient", "Hitam"], 1, "Marketplace: putih polos = clean, easy cutout, standar. Background ramai mengganggu produk"),
    ("**Vera** edit foto B&W. Elemen paling penting:", ["Saturation", "Kontras tonal + tekstur + shape (tidak ada warna)", "Hue", "Vibrance"], 1, "B&W: fokus kontras tonal (terang-gelap), tekstur, shape. Warna tidak ada = harus kuat secara tonal"),
    # ── Mirrorless Specific (10 soal) ──
    ("Mirrorless vs DSLR. Keuntungan utama mirrorless:", ["Battery lebih tahan", "Lebih ringkas, EVF (real-time preview), faster AF (on-sensor)", "Lebih murah selalu", "Optical viewfinder"], 1, "Mirrorless: ringkas, EVF (lihat exposure real-time), AF cepat (on-sensor PDAF). Battery lebih boros"),
    ("EVF (Electronic Viewfinder) keuntungan dibanding OVF:", ["Lebih natural", "Real-time preview exposure, WB, depth of field + focus peaking", "Tidak ada lag", "Battery hemat"], 1, "EVF: preview exposure/WB/DOF real-time + focus peaking + histogram. OVF = optical, natural, no lag"),
    ("**Wati** pakai mirrorless. AF coverage hampir seluruh frame. Keuntungan:", ["Tidak ada", "Bisa fokus di pinggir frame (tidak hanya tengah seperti DSLR)", "Foto lebih terang", "Battery hemat"], 1, "Mirrorless: AF point cover hampir seluruh frame (90%+). DSLR terbatas di tengah. Fleksibel untuk komposisi"),
    ("Silent shutter (electronic shutter) di mirrorless:", ["Tidak ada", "Bisa foto tanpa suara shutter — cocok concert/wedding/wildlife", "Menambah noise", "Hanya untuk video"], 1, "Electronic shutter = silent. Cocok: concert, wedding ceremony, wildlife. Tapi rolling shutter distortion possible"),
    ("Battery mirrorless dibanding DSLR:", ["Lebih tahan", "Lebih boros (EVF + LCD + AF continuous)", "Sama", "Tergantung lensa"], 1, "Mirrorless: EVF + LCD + AF continuous = boros battery. Bawa spare battery wajib"),
    ("**Yusuf** video dengan mirrorless. Keuntungan dibanding DSLR:", ["Tidak ada", "On-sensor AF (smooth tracking) + EVF + compact", "Video lebih pendek", "Tidak bisa video"], 1, "Mirrorless: on-sensor PDAF = smooth AF tracking video. EVF untuk outdoor. Compact. DSLR video AF = slow"),
    ("Crop vs Full-frame mirrorless. Full-frame keuntungan:", ["Lebih ringkas", "Sensor lebih besar = low light better + DOF lebih dangkal + dynamic range tinggi", "Lebih murah", "Battery hemat"], 1, "Full-frame: sensor besar = ISO clean, DOF dangkal, DR tinggi. Crop = lebih murah, lebih ringkas, tele advantage"),
    ("In-body image stabilization (IBIS) di mirrorless:", ["Tidak ada", "Stabilisasi di body — stabil untuk SEMUA lensa (termasuk lensa tanpa IS)", "Hanya untuk video", "Menambah noise"], 1, "IBIS = stabilisasi di sensor body. Semua lensa jadi stabilized (termasuk lensa vintage/manual). Combine dengan lens IS = dual IS"),
    ("**Zahra** pindah dari DSLR ke mirrorless. Apa yang berubah?", ["Tidak ada", "EVF real-time preview + AF coverage luas + lebih ringkas + adaptasi lensa", "Foto jadi lebih buruk", "Tidak bisa pakai lensa lama"], 1, "Mirrorless: EVF preview, AF luas, ringkas. Bisa pakai lensa lama via adapter (preservasi investasi lensa)"),
    ("Rolling shutter di electronic shutter mirrorless:", ["Tidak ada", "Distorsi pada subjek bergerak cepat (bengkok) — karena sensor scan baris per baris", "Menambah noise", "Menambah bokeh"], 1, "Rolling shutter: sensor baca baris per baris → subjek cepat (propeller, golf swing) terlihat bengkok. Mechanical shutter tidak ada ini"),
]

# ── 50 SOAL ISIAN SINGKAT ──
ISIAN_DATA = [
    {"q": "Tiga elemen segitiga eksposur: aperture, shutter speed, dan...", "a": "iso|iso|iso", "w": ["wb", "metering", "focus", "zoom"]},
    {"q": "Bukaan lensa yang mengatur jumlah cahaya masuk disebut...", "a": "aperture|bukaan|aperture", "w": ["shutter", "iso", "wb", "zoom"]},
    {"q": "Kecepatan rana menangkap cahaya disebut... speed", "a": "shutter|rana|shutter", "w": ["aperture", "iso", "focus", "metering"]},
    {"q": "Sensitivitas sensor terhadap cahaya disebut...", "a": "iso|iso|iso", "w": ["aperture", "shutter", "wb", "exposure"]},
    {"q": "Aperture f/1.4 menghasilkan depth of field yang... (dangkal/dalam)", "a": "dangkal|shallow|dangkal", "w": ["dalam", "lebar", "sempit", "tinggi"]},
    {"q": "Aperture f/16 menghasilkan depth of field yang... (dangkal/dalam)", "a": "dalam|deep|dalam", "w": ["dangkal", "shallow", "tipis", "rendah"]},
    {"q": "ISO tinggi menghasilkan foto lebih terang tapi muncul...", "a": "noise|grain|noise", "w": ["bokeh", "blur", "kontras", "tajam"]},
    {"q": "Mode kamera di mana fotografer atur aperture, kamera atur shutter disebut aperture...", "a": "priority|av|priority", "w": ["manual", "auto", "shutter", "program"]},
    {"q": "Mode kamera di mana fotografer atur shutter, kamera atur aperture disebut shutter...", "a": "priority|tv|priority", "w": ["manual", "auto", "aperture", "program"]},
    {"q": "Mode kamera di mana fotografer atur aperture DAN shutter sendiri disebut mode...", "a": "manual|m|manual", "w": ["auto", "program", "av", "tv"]},
    {"q": "AF untuk subjek diam (landscape, still life) disebut AF...", "a": "s|single|s", "w": ["c", "continuous", "auto", "manual"]},
    {"q": "AF untuk subjek bergerak (olahraga, wildlife) disebut AF...", "a": "c|continuous|c", "w": ["s", "single", "macro", "manual"]},
    {"q": "Pada portrait, fokus harus tepat di... subjek", "a": "mata|eye|mata", "w": ["hidung", "telinga", "rambut", "mulut"]},
    {"q": "Lensa 50mm disebut lensa... (mendekati pandangan mata)", "a": "standard|normal|standard", "w": ["wide", "tele", "macro", "fisheye"]},
    {"q": "Lensa 200mm termasuk kategori... (untuk subjek jauh)", "a": "telephoto|tele|telephoto", "w": ["wide", "standard", "macro", "fisheye"]},
    {"q": "Lensa 16mm termasuk kategori... (bidang luas)", "a": "wide angle|wide|wide angle", "w": ["tele", "standard", "macro", "fisheye"]},
    {"q": "Lensa fixed (tidak bisa zoom) disebut lensa...", "a": "prime|prime|prime", "w": ["zoom", "vario", "tele", "wide"]},
    {"q": "Background kabur akibat aperture besar disebut...", "a": "bokeh|bokeh|bokeh", "w": ["noise", "blur", "flare", "ghost"]},
    {"q": "Fungsi white balance adalah mengatur suhu... agar putih terlihat putih", "a": "warna|color|warna", "w": ["cahaya", "eksposur", "fokus", "iso"]},
    {"q": "Format file mentah sensor yang menyimpan data lengkap disebut...", "a": "raw|raw|raw", "w": ["jpeg", "png", "tiff", "gif"]},
    {"q": "Format file terkompresi yang langsung bisa dipakai disebut...", "a": "jpeg|jpg|jpeg", "w": ["raw", "tiff", "psd", "raw"]},
    {"q": "White balance otomatis disingkat...", "a": "awb|awb|awb", "w": ["abc", "afb", "iso", "wb"]},
    {"q": "Kartu abu-abu 18% digunakan untuk set white balance...", "a": "custom|manual|custom", "w": ["auto", "preset", "awb", "daylight"]},
    {"q": "Fitur kompensasi getaran tangan pada lensa disebut image...", "a": "stabilization|is|stabilization", "w": ["correction", "reduction", "balance", "focus"]},
    {"q": "Rule of thirds membagi frame menjadi... kotak (3x3)", "a": "9|sembilan|9", "w": ["4", "6", "3", "12"]},
    {"q": "Waktu 1 jam setelah sunrise/sebelum sunset dengan cahaya hangat disebut... hour", "a": "golden|golden|golden", "w": ["blue", "magic", "sunny", "warm"]},
    {"q": "Filter yang mengurangi cahaya untuk long exposure disebut... filter", "a": "nd|nd|nd", "w": ["uv", "cpl", "nd", "ir"]},
    {"q": "Filter yang mengurangi refleksi dan kontras langit disebut...", "a": "cpl|polarizer|cpl", "w": ["nd", "uv", "ir", "soft"]},
    {"q": "Grafik distribusi terang-gelap foto disebut...", "a": "histogram|histogram|histogram", "w": ["chart", "graph", "meter", "curve"]},
    {"q": "Data menumpuk di ujung kanan histogram berarti foto...", "a": "overexpose|terlalu terang|overexpose", "w": ["underexpose", "tepat", "gelap", "noise"]},
    {"q": "Data menumpuk di ujung kiri histogram berarti foto...", "a": "underexpose|terlalu gelap|underexpose", "w": ["overexpose", "tepat", "terang", "noise"]},
    {"q": "Teknik eksposur sedikit over (histogram ke kanan tanpa clip) disingkat...", "a": "ettr|ettr|ettr", "w": ["ettl", "httr", "ettr", "iso"]},
    {"q": "Kontras lokal di midtones yang menambah punch disebut...", "a": "clarity|klaritas|clarity", "w": ["contrast", "dehaze", "sharpening", "vibrance"]},
    {"q": "Fitur untuk mengurangi kabut di foto disebut...", "a": "dehaze|dehaze|dehaze", "w": ["clarity", "contrast", "sharpening", "vibrance"]},
    {"q": "Intensitas warna dalam editing disebut...", "a": "saturasi|saturation|saturasi", "w": ["hue", "exposure", "contrast", "clarity"]},
    {"q": "Versi saturation yang protect skin tone disebut...", "a": "vibrance|vibrance|vibrance", "w": ["contrast", "clarity", "hue", "exposure"]},
    {"q": "Mirrorless menggunakan viewfinder elektronik disingkat...", "a": "evf|evf|evf", "w": ["ovf", "lcd", "led", "vf"]},
    {"q": "DSLR menggunakan viewfinder optik disingkat...", "a": "ovf|ovf|ovf", "w": ["evf", "lcd", "led", "vf"]},
    {"q": "Stabilisasi di body kamera mirrorless disingkat...", "a": "ibis|ibis|ibis", "w": ["is", "vr", "os", "oss"]},
    {"q": "Shutter elektronik tanpa suara di mirrorless disebut... shutter", "a": "silent|electronic|silent", "w": ["mechanical", "loud", "fast", "slow"]},
    {"q": "Crop factor APS-C umumnya...x (mis: 1.5x)", "a": "1.5|1.5|1.5", "w": ["2", "1", "3", "0.5"]},
    {"q": "Lens 50mm di APS-C 1.5x menjadi...mm equivalent", "a": "75|75|75", "w": ["50", "100", "35", "85"]},
    {"q": "Backup strategy 3-2-1: 3 copy, 2 media, 1...", "a": "offsite|cloud|offsite", "w": ["local", "laptop", "card", "drive"]},
    {"q": "Color space standar untuk web/layar disebut...", "a": "srgb|srgb|srgb", "w": ["adobe rgb", "prophoto", "cmyk", "lab"]},
    {"q": "Color space dengan gamut lebih luas untuk print disebut... RGB", "a": "adobe|adobe|adobe", "w": ["s", "pro", "wide", "print"]},
    {"q": "Distorsi pinggir melengkung pada lensa wide disebut... distortion", "a": "barrel|barrel|barrel", "w": ["pincushion", "mustache", "perspective", "chromatic"]},
    {"q": "Fringe warna di edge kontras tinggi disebut chromatic...", "a": "aberasi|aberration|aberasi", "w": ["noise", "blur", "distortion", "vignette"]},
    {"q": "Vignette adalah penggelapan di... frame", "a": "tepi|pinggir|tepi", "w": ["tengah", "atas", "bawah", "sudut"]},
    {"q": "HDR = High Dynamic... (capture detail shadow + highlight)", "a": "range|range|range", "w": ["resolution", "ratio", "reach", "raw"]},
    {"q": "Rule of thumb shutter handheld: shutter ≥ 1/... (focal length)", "a": "focal length|focal|focal length", "w": ["iso", "aperture", "exposure", "metering"]},
    {"q": "Mode metering yang ukur seluruh frame merata disebut...", "a": "evaluative|matrix|evaluative", "w": ["spot", "center", "partial", "point"]},
]

def make_pg_sql(q_id, q_data):
    opts = q_data[1]
    return f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data[0])}, {sql_str(opts[0])}, {sql_str(opts[1])}, {sql_str(opts[2])}, {sql_str(opts[3])}, {q_data[2]}, {sql_str(q_data[3])}, 'Kamera DSLR', true, 'pilihan_ganda', '[]', '[]', '', '', 'C4', '', '', {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""

def make_isian_sql(q_id, q_data):
    short_answer = q_data["a"]
    wrong_opts = q_data.get("w", [])
    option_a = wrong_opts[0] if len(wrong_opts) > 0 else ""
    option_b = wrong_opts[1] if len(wrong_opts) > 1 else ""
    option_c = wrong_opts[2] if len(wrong_opts) > 2 else ""
    option_d = wrong_opts[3] if len(wrong_opts) > 3 else ""
    return f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data["q"])}, {sql_str(option_a)}, {sql_str(option_b)}, {sql_str(option_c)}, {sql_str(option_d)}, 2, '', 'Kamera DSLR', true, 'isian_singkat', '[]', '[]', {sql_str(short_answer)}, '', 'C3', '', '', {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""

def main():
    print(f"Generating: {OUTPUT_PATH}")
    content = []
    content.append(f"""-- Bank Soal Bab 3 + Tugas untuk 11DKV Mata Pelajaran Pilihan
-- Bab 3: Mengoperasikan Kamera DSLR/Mirrorless
-- CP: {CP_ID} (sudah ada), TP: {TP_ID} (sudah ada)
-- 100 PG (bank) + 50 Isian (bank) + Tugas 75 PG + 20 Isian
""")

    # 100 PG
    for i, q in enumerate(PG_DATA[:100], 1):
        q_id = f"q_bab3_11dkv_pg_{i:03d}"
        content.append(f"\n-- PG #{i:03d}")
        content.append(make_pg_sql(q_id, q))

    # 50 Isian
    for i, q in enumerate(ISIAN_DATA[:50], 1):
        q_id = f"q_bab3_11dkv_isian_{i:03d}"
        content.append(f"\n-- Isian #{i:03d}")
        content.append(make_isian_sql(q_id, q))

    # Tugas: 75 PG + 20 Isian = 95 soal, 90 menit, besok
    content.append(f"""
-- Tugas
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('{ASG_ID}', 'Tugas Bab 3: Kamera DSLR/Mirrorless (75 PG + 20 Isian)', 'Tugas tentang mengoperasikan kamera DSLR/mirrorless. Mencakup eksposur, fokus, lensa, WB, komposisi, mirrorless. 75 soal PG HOTS + 20 soal isian. Waktu 90 menit.', '{SUBJECT}', '11DKV', 'SMK', true, '{DUE_DATE_ISO}', 'wajib', 95, 'quiz_only', NULL, '{CP_ID}', '{TP_ID}', 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verifikasi
SELECT "questionType", COUNT(*) FROM "Question" WHERE id LIKE 'q_bab3_11dkv_%' GROUP BY "questionType";
-- Expected: pilihan_ganda 100, isian_singkat 50
""")

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(content))
    size = os.path.getsize(OUTPUT_PATH) / 1024
    pg_count = min(len(PG_DATA), 100)
    isian_count = min(len(ISIAN_DATA), 50)
    print(f"✅ {OUTPUT_PATH} ({size:.1f} KB)")
    print(f"   Bank soal: {pg_count} PG + {isian_count} Isian = {pg_count + isian_count} soal")
    print(f"   Tugas: 75 PG + 20 Isian = 95 soal, 90 menit, deadline besok ({DUE_DATE_ISO[:10]})")

if __name__ == "__main__":
    main()
