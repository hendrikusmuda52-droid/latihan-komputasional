#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator SQL: Tugas Bab 2 untuk Kelas 11 DKV
- 35 soal Pilihan Ganda (HOTS)
- 10 soal Pilihan Ganda Kompleks (multi-answer)
- 10 soal Isian Singkat (dengan 4 jawaban salah + 2 benar + 1 paling benar)
- Total: 55 soal
- Bobot: PG 50%, PG Kompleks 30%, Isian 20% (total 100)
- dueDate: 28 September 2026 23:59 WIB
- duration: 90 menit
- subject: Mata Pelajaran Pilihan
- targetKelas: 11DKV
- CP: cp_dkv_pil_11_2 (Bab 2: Memahami Komposisi Estetika Fotografi)
- TP: tp_dkv_pil_11_2_1
"""

import os

OUTPUT_PATH = "/home/z/my-project/download/insert_tugas_bab2_11dkv.sql"
DUE_DATE_ISO = "2026-09-28T23:59:00+07:00"

CP_ID = "cp_dkv_pil_11_2"
TP_ID = "tp_dkv_pil_11_2_1"
GRADE = "11DKV"
SUBJECT = "Mata Pelajaran Pilihan"


def sql_escape(text: str) -> str:
    if text is None:
        return ""
    return text.replace("'", "''")


def sql_str(text: str) -> str:
    return f"'{sql_escape(text)}'"


# ============================================================
# 35 SOAL PILIHAN GANDA (HOTS) — Komposisi Estetika Fotografi
# ============================================================

PG_QUESTIONS = [
    # ── C3 (Menerapkan) — 12 soal ──
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "**Andi** memotret pemandangan gunung dan ingin gunung tampak lebih dominan. Aturan komposisi yang paling tepat digunakan adalah...",
        "options": ["Rule of Thirds (garis horisontal di bawah)", "Rule of Thirds (garis horisontal di atas, gunung dominan di 2/3 bawah)", "Leading Lines", "Framing"],
        "correct": 1,
        "explanation": "Untuk membuat gunung dominan, gunakan Rule of Thirds dengan garis horisontal di atas sehingga gunung mengisi 2/3 bawah frame."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "**Siti** ingin memotret subjek manusia dengan latar belakang kabur (bokeh). Konsep estetika yang ia terapkan adalah...",
        "options": ["Depth of Field dangkal (aperture besar f/1.8)", "Depth of Field dalam (aperture kecil f/16)", "Leading lines", "Symmetry"],
        "correct": 0,
        "explanation": "Depth of Field dangkal dengan aperture besar (f/1.8) menghasilkan latar belakang kabur (bokeh), fokus ke subjek."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Aturan **Rule of Thirds** membagi frame menjadi...",
        "options": ["2 bagian sama besar", "3 bagian horizontal dan 3 bagian vertikal (9 kotak, 4 titik temu)", "4 bagian diagonal", "Lingkaran konsentris"],
        "correct": 1,
        "explanation": "Rule of Thirds membagi frame jadi 3 horizontal × 3 vertikal = 9 kotak, dengan 4 titik temu (power points) sebagai posisi ideal subjek."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "**Budi** memotret jalan yang membentang ke horison, jalanan terlihat menyempit di kejauhan. Komposisi yang otomatis terbentuk adalah...",
        "options": ["Symmetry", "Leading Lines (garis panduan mata ke titik hilang)", "Framing", "Pattern"],
        "correct": 1,
        "explanation": "Jalanan yang menyempit ke horison membentuk leading lines yang memandu mata ke titik hilang (vanishing point)."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Kontras warna **komplementer** terjadi antara...",
        "options": ["Merah-hijau, biru-oranye, kuning-ungu (berseberangan di color wheel)", "Merah-kuning (berdekatan)", "Biru-hijau (analog)", "Hitam-putih (netral)"],
        "correct": 0,
        "explanation": "Warna komplementer = berseberangan di color wheel: merah-hijau, biru-oranye, kuning-ungu. Kontras ini sangat kuat secara visual."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "**Dina** memotret bayangan cermin di danau, gunung dan pantulan terlihat simetris. Komposisi yang terbentuk...",
        "options": ["Symmetry (simetri refleksi)", "Rule of Thirds", "Negative space", "Pattern"],
        "correct": 0,
        "explanation": "Pantulan cermin di air menciptakan simetri refleksi — subjek dan bayangan saling cermin di garis horisontal."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Konsep **negative space** dalam fotografi adalah...",
        "options": ["Ruang kosong di sekitar subjek utama untuk menonjolkan subjek", "Ruang untuk teks", "Background hitam", "Ruang di luar frame"],
        "correct": 0,
        "explanation": "Negative space = ruang kosong di sekitar subjek. Ini menonjolkan subjek dan menciptakan kesan minimalis/dramatis."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "**Eka** memotret sepuluh kacamata yang tersusun rapi di etalase. Komposisi yang terbentuk...",
        "options": ["Pattern (pola berulang)", "Leading lines", "Symmetry", "Negative space"],
        "correct": 0,
        "explanation": "Susunan rapi benda berulang (kacamata) membentuk pattern — pola berulang yang menarik secara visual."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Aperture f/2.8 akan menghasilkan depth of field yang lebih...",
        "options": ["Dalam (semua tajam)", "Dangkal (subjek tajam, background kabur)", "Tidak ada efek", "Selalu tajam"],
        "correct": 1,
        "explanation": "Aperture besar (f/2.8, f/1.8, f/1.4) = Depth of Field dangkal. Subjek tajam, background/foreground kabur (bokeh)."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "**Fajar** ingin foto produk makanan yang tajam dari depan sampai belakang. Setting aperture yang tepat...",
        "options": ["f/1.8 (DOF dangkal)", "f/16 (DOF dalam, semua tajam)", "f/2.8", "f/4"],
        "correct": 1,
        "explanation": "Untuk semua tajam (DOF dalam), gunakan aperture kecil f/16 atau lebih. Sering dipakai di food photography, landscape."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Konsep **framing** dalam komposisi fotografi berarti...",
        "options": ["Memberi bingkai foto di digital", "Menggunakan elemen sekitar (jendela, pintu, cabang pohon) sebagai bingkai alami subjek", "Mengatur ukuran cetak", "Menggunakan filter bingkai"],
        "correct": 1,
        "explanation": "Framing = gunakan elemen sekitar (jendela, daun, lengkung pintu) sebagai 'bingkai alami' yang mengelilingi subjek."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "**Gita** memotret fashion model. Ia ingin model jadi fokus utama, background polos dan tidak mengganggu. Strategi komposisinya...",
        "options": ["Pattern background ramai", "Negative space + DOF dangkal (background kabur)", "Leading lines ke background", "Symmetry dengan background rumit"],
        "correct": 1,
        "explanation": "Kombinasi negative space (background polos) + DOF dangkal (background kabur) paling efektif untuk isolasi subjek fashion."
    },
    # ── C4 (Menganalisis) — 12 soal ──
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Perhatikan deskripsi foto: subjek diletakkan tepat di tengah frame, latar belakang simetris. Analisis: aturan komposisi apa yang dipakai DAN kapan efektif?",
        "options": ["Rule of Thirds — selalu efektif", "Symmetry — efektif untuk arsitektur, refleksi, formal portrait", "Leading lines — efektif untuk landscape", "Pattern — efektif untuk close-up"],
        "correct": 1,
        "explanation": "Analisis: subjek di tengah + latar simetris = komposisi symmetry. Efektif untuk: arsitektur (jembatan, gedung), refleksi (cermin/air), formal portrait."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "**Hadi** memotret produk jam tangan. Ia pakai aperture f/16. Background terlihat tajam dan mengganggu. Analisis masalah + solusi:",
        "options": ["Masalah: overexposed. Solusi: ISO rendah", "Masalah: DOF terlalu dalam, background mengganggu. Solusi: aperture besar f/2.8 untuk isolasi subjek", "Masalah: subjek blur. Solusi: tripod", "Tidak ada masalah"],
        "correct": 1,
        "explanation": "Analisis: f/16 = DOF dalam = background tajam. Untuk produk, biasanya background kabur agar subjek menonjol. Solusi: aperture besar f/2.8."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "**Ira** memotret dua subjek yang berdiri berhadapan. Ia ingin konflik/ketegangan terasa. Strategi komposisi terbaik?",
        "options": ["Symmetry (simetri harmonis)", "Asimetri + leading lines yang berlawanan arah (ketegangan visual)", "Pattern", "Negative space"],
        "correct": 1,
        "explanation": "Analisis: simetri = harmoni. Asimetri + leading lines berlawanan = ketegangan/konflik visual. Cocok untuk dramatisasi konflik."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Seorang fotografer memotret dengan garis horisontal tepat di tengah (50-50 langit-darat). Analisis dampak visual:",
        "options": ["Dinamis dan menarik", "Statis dan membosankan (tidak ada focus). Rule of Thirds (1/3-2/3) lebih dinamis", "Salah secara teknis", "Selalu bagus"],
        "correct": 1,
        "explanation": "Analisis: horison di tengah (50-50) = statis, tidak ada emphasis. Rule of Thirds (1/3 langit + 2/3 darat, atau kebalikannya) lebih dinamis."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "**Joko** memotret pasar tradisional. Banyak orang, barang, warna. Foto terlihat berantakan. Analisis + solusi komposisi:",
        "options": ["Salah subjek. Ganti ke landscape", "Terlalu banyak elemen. Solusi: framing (isolasi 1 pedagang di antara tenda), atau leading lines ke 1 subjek fokus", "Tambah elemen lain", "Salah aperture"],
        "correct": 1,
        "explanation": "Analisis: clutter visual. Solusi: framing (gunakan tenda/kain sebagai bingkai alami isolasi 1 subjek) atau leading lines ke subjek fokus."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Kontras **warna hangat vs dingin** dalam foto sunset (oranye langit + biru air) menciptakan...",
        "options": ["Monotoni", "Keseimbangan visual yang dinamis (warm-cool color theory)", "Distorsi", "Blur"],
        "correct": 1,
        "explanation": "Analisis: hangat (oranye/merah/kuning) vs dingin (biru/hijau) = kontras warna complementary. Menciptakan keseimbangan dinamis."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "**Kiki** memotret arsitektur gedung tinggi dari bawah. Garis vertikal bangunan terlihat konvergen (bertemu di atas). Efek ini disebut...",
        "options": ["Distorsi lensa (perspektive distortion) — sering dihindari di arsitektur formal, tapi bisa dramatic", "Symmetry", "Pattern", "Negative space"],
        "correct": 0,
        "explanation": "Analisis: foto dari bawah bangunan tinggi = perspektive distortion (garis konvergen). Bisa unwanted (arsitektur formal butuh tilt-shift lens), atau dramatic (artistic)."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "**Lia** memotret potret wajah dengan mata subjek di titik temu Rule of Thirds (power point). Analisis dampak:",
        "options": ["Salah — harus di tengah", "Tepat — mata di power point menciptakan keseimbangan + dinamis. Pengamat merasa 'terhubung' dengan subjek", "Tidak ada efek", "Harus mata di pinggir"],
        "correct": 1,
        "explanation": "Analisis: mata di power point Rule of Thirds = komposisi potret klasik. Dinamis + seimbang, pengamat merasa terhubung dengan subjek."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Seorang fotografer street photography ingin foto terlihat candid/tidak terencana. Komposisi yang TEPAT?",
        "options": ["Symmetry sempurna", "Asimetri + sedikit off-balance (candid feel) + leading lines natural (jalan, kerumunan)", "Pattern rapi", "Negative space besar"],
        "correct": 1,
        "explanation": "Analisis: street photography candid = asimetri + off-balance + leading lines natural (jalan, kerumunan). Hindari komposisi terlalu rapi/formal."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "**Maman** memotret macro bunga. Ia pakai aperture f/4. Hanya sebagian bunga tajam, sebagian blur. Analisis:",
        "options": ["Salah — macro harus semua tajam", "Tepat — macro dengan DOF dangkal menciptakan isolasi + fokus ke detail tertentu (benang sari, kelopak)", "Harus f/22", "Tidak ada efek"],
        "correct": 1,
        "explanation": "Analisis: macro photography sering pakai DOF dangkal (f/4-f/8) untuk isolasi detail. f/22 (DOF dalam) butuh tripod + lighting kuat, jarang praktis."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Foto hitam-putih (B&W) yang menarik biasanya punya...",
        "options": ["Banyak warna", "Kontras tonal yang kuat (hitam pekat + putih bersih + gradasi abu-abu)", "Hanya abu-abu", "Tidak ada kontras"],
        "correct": 1,
        "explanation": "Analisis: B&W tidak punya warna, jadi fokus ke kontras tonal (terang-gelap) + tekstur + bentuk. Kontras tonal kuat = foto B&W menarik."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "**Nina** memotret silhouette orang di sunset. Subjek hitam pekat, langit berwarna. Analisis dampak estetika:",
        "options": ["Salah — subjek harus terlihat", "Tepat — silhouette menonjolkan bentuk (shape) + dramatis. Subjek jadi simbolik, bukan detail", "Harus pakai flash", "Tidak menarik"],
        "correct": 1,
        "explanation": "Analisis: silhouette = expose untuk background (langit), subjek jadi hitam pekat. Menonjolkan bentuk (shape) + dramatis + simbolik."
    },
    # ── C5 (Mengevaluasi) — 11 soal ──
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "**Omar** punya 2 foto potret: (A) Subjek di tengah, simetri sempurna, formal. (B) Subjek di Rule of Thirds, candid, natural. Mana lebih baik?",
        "options": ["A selalu lebih baik (formal)", "B selalu lebih baik (dinamis)", "Tergantung tujuan: A untuk formal/official (paspor, korporat), B untuk natural/lifestyle (magazine, personal). Konteks menentukan", "Keduanya buruk"],
        "correct": 2,
        "explanation": "Evaluasi: tidak ada 'lebih baik' absolut. A cocok untuk formal (paspor, ID, korporat). B cocok untuk natural (magazine, lifestyle). Konteks komunikasi menentukan."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "Manakah yang BUKAN prinsip komposisi fotografi yang baik?",
        "options": ["Rule of Thirds", "Leading lines", "Selalu pusatkan subjek (pakistan center — monoton, hindari)", "Negative space"],
        "correct": 2,
        "explanation": "Evaluasi: 'selalu pusatkan' = monoton. Pusat kadang OK (symmetry, formal), tapi tidak selalu. Variasikan dengan Rule of Thirds, off-center."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "**Qori** mengevaluasi 3 foto wedding-nya: (1) Rule of Thirds, (2) Symmetry, (3) Negative space. Mana paling cocok untuk 'first kiss moment'?",
        "options": ["(1) Rule of Thirds — dinamis", "(2) Symmetry — formal/seimbang", "(3) Negative space — dramatis/intim (subjek kecil di ruang besar, fokus ke momen)", "Semua sama"],
        "correct": 2,
        "explanation": "Evaluasi: 'first kiss' = momen intim/dramatis. Negative space (subjek kecil di ruang besar) paling efektif menonjolkan intimasi + dramatis. Symmetry bisa terlalu kaku untuk momen emosional."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "Manakah strategi komposisi untuk foto produk e-commerce (Shopee/Tokopedia)?",
        "options": ["Candid + bokeh ekstrem", "Background putih polos + subjek tengah + DOF dalam (semua tajam, jelas) — standar marketplace", "Negative space ekstrem", "Symmetry asimetris"],
        "correct": 1,
        "explanation": "Evaluasi: e-commerce butuh foto produk JELAS (detail terlihat, background tidak ganggu). Background putih + DOF dalam = standar marketplace. Bokeh ekstrem justru mengganggu detail produk."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "**Rina** mengevaluasi foto street-nya: terlalu banyak elemen, subjek tenggelam. Rekomendasi perbaikan?",
        "options": ["Tambah elemen lain", "Crop tighter ke subjek + gunakan framing (jendela/pintu) untuk isolasi + leading lines ke subjek", "Ganti lensa", "Hapus foto"],
        "correct": 1,
        "explanation": "Evaluasi: clutter visual. Solusi: crop tighter (subyek dominan), framing (isolasi), leading lines (guide mata ke subjek). Reduksi elemen agar subjek menonjol."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "Untuk foto **makanan** (food photography), kombinasi komposisi terbaik?",
        "options": ["Top-down (flat lay) + DOF dalam + props minimal", "Eye-level + DOF dangkal + props ramai", "Bottom-up + negative space", "Side angle + symmetry"],
        "correct": 0,
        "explanation": "Evaluasi: food photography sering pakai top-down (flat lay) + DOF dalam (semua tajam) + props minimal (sendok/garnish). Tren Instagram-style. Eye-level + DOF dangkal untuk dramatic shot."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "**Santi** punya foto landscape dengan foreground (batu) + midground (danau) + background (gunung). Komposisi ini disebut...",
        "options": ["Symmetry", "Foreground-midground-background layering (depth composition) — menciptakan kedalaman 3D", "Pattern", "Framing"],
        "correct": 1,
        "explanation": "Evaluasi: foreground-midground-background layering menciptakan depth (kedalaman 3D di foto 2D). Pembaca mata 'tour' dari depan ke belakang, merasa immersive."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "Manakah evaluasi BENAR tentang **golden ratio** (1:1.618) dalam fotografi?",
        "options": ["Selalu lebih baik dari Rule of Thirds", "Alternatif Rule of Thirds dengan kurva spiral. Tidak selalu lebih baik — pilihan estetika. Rule of Thirds lebih mudah + umum", "Tidak ada di fotografi", "Hanya untuk portrait"],
        "correct": 1,
        "explanation": "Evaluasi: golden ratio (phi) = alternatif Rule of Thirds dengan kurva spiral. Estetik, tapi tidak 'lebih baik' absolut. Rule of Thirds lebih simple + populer."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "**Tono** mengevaluasi foto arsitektur modern-nya: garis-garis tegas, banyak sudut, simetri kuat. Estetika yang dihasilkan?",
        "options": ["Romantis", "Modern/minimalis — geometric composition (bentuk geometris dominan) cocok untuk arsitektur kontemporer", "Vintage", "Tidak ada estetika"],
        "correct": 1,
        "explanation": "Evaluasi: garis tegas + sudut + simetri = geometric composition. Estetika modern/minimalis, cocok arsitektur kontemporer, brutalist, abstract."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "Untuk foto **black & white street photography**, elemen yang PALING penting?",
        "options": ["Warna", "Kontras tonal + tekstur + pola + shape (karena tidak ada warna, semua harus lewat tonalitas/bentuk)", "Bokeh", "Vibrance"],
        "correct": 1,
        "explanation": "Evaluasi: B&W hilangkan warna, jadi fokus ke: kontras tonal (terang-gelap), tekstur, pola, shape. Komposisi harus kuat karena tidak ada warna sebagai 'penolong'."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "**Vera** mengevaluasi 2 foto produk: (A) Background ramai pattern, (B) Background putih polos. Untuk iklan billboard, mana lebih baik?",
        "options": ["(A) — lebih artistik", "(B) — background polos = subjek menonjol + teks iklan bisa diletakkan di ruang kosong (negative space)", "Sama saja", "Keduanya buruk"],
        "correct": 1,
        "explanation": "Evaluasi: billboard butuh pesan cepat + teks ruang kosong. (B) background polos = subjek menonjol + ruang untuk headline/CTA. (A) ramai = pesan hilang."
    },
]


# ============================================================
# 10 SOAL PILIHAN GANDA KOMPLEKS (multi-answer)
# ============================================================

PG_KOMPLEKS_QUESTIONS = [
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA aturan komposisi yang dapat dipakai untuk memotret pemandangan gunung (landscape):",
        "options": ["Rule of Thirds (horison di 1/3 atas/bawah)", "Leading Lines (jalan/sungai ke gunung)", "Framing (cabang pohon sebagai bingkai)", "Symmetry (jika ada pantulan danau)"],
        "correct": [0, 1, 2, 3],
        "explanation": "Semua 4 opsi adalah komposisi yang valid untuk landscape: Rule of Thirds, Leading Lines, Framing, dan Symmetry (jika ada refleksi)."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA yang termasuk kontras warna KOMPLEMENTER (berseberangan di color wheel):",
        "options": ["Merah-hijau", "Biru-oranye", "Kuning-ungu", "Merah-kuning (analog)"],
        "correct": [0, 1, 2],
        "explanation": "Komplementer = berseberangan color wheel: merah-hijau, biru-oranye, kuning-ungu. Merah-kuning = analog (berdekatan)."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA yang akan menghasilkan Depth of Field DANGKAL (background kabur):",
        "options": ["Aperture besar (f/1.4, f/1.8, f/2.8)", "Subjek dekat ke kamera", "Lensa telephoto (85mm, 135mm)", "Aperture kecil (f/16, f/22)"],
        "correct": [0, 1, 2],
        "explanation": "DOF dangkal: aperture besar + subjek dekat + lensa telephoto. Aperture kecil (f/16) = DOF dalam (semua tajam)."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA komposisi yang cocok untuk FOTOGRAFI PORTRAIT:",
        "options": ["Rule of Thirds (mata di power point)", "Negative space (subjek kecil, dramatis)", "Symmetry (formal portrait)", "Leading lines (garis tubuh ke wajah)"],
        "correct": [0, 1, 2, 3],
        "explanation": "Semua 4 opsi valid untuk portrait: Rule of Thirds, Negative space (dramatis), Symmetry (formal), Leading lines (garis tubuh/lengan ke wajah)."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA prinsip yang membuat foto BLACK & WHITE kuat:",
        "options": ["Kontras tonal (hitam-putih tegas)", "Tekstur (detail permukaan)", "Pola (pattern berulang)", "Banyak warna saturasi tinggi"],
        "correct": [0, 1, 2],
        "explanation": "B&W fokus ke: kontras tonal, tekstur, pola, shape. Banyak warna tidak relevan (B&W tidak ada warna). Saturasi tinggi = konsep color, bukan B&W."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA yang termasuk komposisi fotografi:",
        "options": ["Rule of Thirds", "Leading Lines", "Symmetry", "ISO 3200"],
        "correct": [0, 1, 2],
        "explanation": "Rule of Thirds, Leading Lines, Symmetry = komposisi (estetika penataan). ISO 3200 = setting eksposur (teknis), bukan komposisi."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA situasi di mana SYMMETRY komposisi efektif:",
        "options": ["Arsitektur (gedung, jembatan)", "Refleksi (cermin, danau)", "Formal portrait (paspor, korporat)", "Street photography candid"],
        "correct": [0, 1, 2],
        "explanation": "Symmetry efektif untuk: arsitektur (formal/rapi), refleksi (cermin/air), formal portrait. Street candid biasanya asimetris (candid feel)."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA yang akan MEMPERKUAT komposisi foto produk (e-commerce):",
        "options": ["Background putih polos", "DOF dalam (semua tajam)", "Pencahayaan rata (even lighting)", "Background pattern ramai"],
        "correct": [0, 1, 2],
        "explanation": "E-commerce: background putih + DOF dalam + lighting rata = produk JELAS. Background ramai = ganggu produk, hindari."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA yang termasuk leading lines (garis panduan mata):",
        "options": ["Jalan yang menyempit ke horison", "Rel kereta api", "Garis pantai", "Langit biru polos"],
        "correct": [0, 1, 2],
        "explanation": "Leading lines: jalan, rel kereta, garis pantai = garis yang memandu mata. Langit biru polos = tidak ada garis (negative space)."
    },
    {
        "level": "C5", "category": "Komposisi & Estetika",
        "question": "Pilih SEMUA kesalahan komposisi yang harus dihindari:",
        "options": ["Horison miring (kecuali intentional)", "Subjek terpotong di tepi frame", "Distorsi perspektif pada arsitektur formal (kecuali artistic)", "Rule of Thirds"],
        "correct": [0, 1, 2],
        "explanation": "Hindari: horison miring (kecuali intentional), subjek terpotong, distorsi arsitektur formal. Rule of Thirds = prinsip BAIK, bukan kesalahan."
    },
]


# ============================================================
# 10 SOAL ISIAN SINGKAT
# Format: 4 jawaban salah + 2 benar + 1 paling benar
# shortAnswer format: "jawaban salah 1|jawaban salah 2|jawaban salah 3|jawaban salah 4|jawaban benar 1|jawaban benar 2|jawaban paling benar"
# CATATAN: Dalam implementasi, kita akan uraikan ke format yang lebih jelas di frontend
# ============================================================
# Format khusus: 6 accepted answers (4 wrong + 2 right) + 1 best (paling benar)
# Paling benar dapat poin penuh, 2 benar dapat poin parsial, 4 salah dapat 0
# shortAnswer format: "WRONG1|WRONG2|WRONG3|WRONG4|RIGHT1|RIGHT2|BEST"
# Untuk kompatibilitas dengan sistem lama (pipe-separated accepted answers), kita pakai format:
#   shortAnswer = "RIGHT1|RIGHT2|BEST" (yang accepted, case-insensitive)
#   analisisDistraktor = "WRONG1|WRONG2|WRONG3|WRONG4" (yang ditolak)
#   correctAnswer = index BEST di shortAnswer (0=RIGHT1, 1=RIGHT2, 2=BEST)
# Tapi karena field correctAnswer adalah number 0-3 untuk PG, kita tidak bisa pakai.
# Solusi: gunakan field matchPairs untuk simpan metadata isian
# Atau: pakai shortAnswer saja dengan convention: RIGHT1|RIGHT2|BEST (urutan penting, BEST = last)
# Kita pakai pendekatan: shortAnswer = "right1|right2|best" (3 accepted, BEST = terakhir)

ISIAN_QUESTIONS = [
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Aturan komposisi yang membagi frame menjadi 3 bagian horizontal dan 3 vertikal (9 kotak, 4 titik temu) disebut Rule of...",
        "shortAnswer": "third|thirds|thirds",
        "wrongOptions": ["setengah", "seperempat", "seperlima", "sepersepuluh"],
        "explanation": "Rule of Thirds — bagi frame jadi 9 kotak, 4 power points. 'Thirds' (jamak) paling tepat, 'Third' (tunggal) accepted."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Pengaturan aperture yang BESAR (misalnya f/1.4, f/1.8, f/2.8) menghasilkan depth of field yang... (gunakan istilah: dangkal/dalam)",
        "shortAnswer": "dangkal|tipis|dangkal",
        "wrongOptions": ["lebar", "tegas", "runcing", "keras"],
        "explanation": "Aperture besar = DOF dangkal. Background kabur. 'Dangkal' paling tepat (istilah Indonesia), 'Tipis' accepted (sinonim)."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Warna komplementer warna MERAH adalah... (sebut nama warna)",
        "shortAnswer": "hijau|hijau daun|hijau",
        "wrongOptions": ["biru", "kuning", "ungu", "oranye"],
        "explanation": "Merah-hijau = komplementer (berseberangan color wheel). 'Hijau' paling tepat (istilah Indonesia)."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Garis yang memandu mata pengamat ke subjek disebut garis...",
        "shortAnswer": "pandu|pemandu|pandu",
        "wrongOptions": ["kurva", "titik", "bentuk", "warna"],
        "explanation": "Garis pandu (leading lines) — garis yang memandu mata. 'Pandu' paling tepat (Indonesia), 'Pemandu' accepted (sinonim)."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Jarak fokus yang menghasilkan background kabur (bokeh) disebut kedalaman...",
        "shortAnswer": "ruang|bidang|ruang",
        "wrongOptions": ["pandangan", "fokus", "lensa", "kabur"],
        "explanation": "Kedalaman ruang (depth of field). DOF dangkal = background kabur. 'Ruang' paling tepat (Indonesia), 'Bidang' accepted (sinonim)."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Komposisi yang menggunakan elemen sekitar (jendela, daun, pintu) sebagai bingkai alami subjek disebut...",
        "shortAnswer": "bingkai|bingkai alami|bingkai",
        "wrongOptions": ["pangkas", "perbesar", "filter", "tepi"],
        "explanation": "Bingkai (framing) — menggunakan elemen sekitar sebagai bingkai alami. 'Bingkai' paling tepat (Indonesia)."
    },
    {
        "level": "C4", "category": "Komposisi & Estetika",
        "question": "Foto pantulan cermin di danau menghasilkan komposisi yang disebut...",
        "shortAnswer": "simetri|seimbang|simetri",
        "wrongOptions": ["kacau", "acak", "asimetri", "distorsi"],
        "explanation": "Simetri — pantulan menciptakan simetri refleksi. 'Simetri' paling tepat (Indonesia), 'Seimbang' accepted (sinonim)."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Pengaturan aperture yang KECIL (f/16, f/22) menghasilkan depth of field yang... (istilah: dalam)",
        "shortAnswer": "dalam|mendalam|dalam",
        "wrongOptions": ["sempit", "tipis", "rendah", "cepat"],
        "explanation": "Aperture kecil = DOF dalam. Semua tajam. 'Dalam' paling tepat (istilah Indonesia), 'Mendalam' accepted (sinonim)."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Pola berulang dari benda-benda identik (misal: susunan kacamata di etalase) disebut komposisi...",
        "shortAnswer": "pola|pola berulang|pola",
        "wrongOptions": ["kacau", "gangguan", "rusak", "berserakan"],
        "explanation": "Pola (pattern) — benda berulang membentuk komposisi menarik. 'Pola' paling tepat (Indonesia)."
    },
    {
        "level": "C3", "category": "Komposisi & Estetika",
        "question": "Ruang kosong di sekitar subjek yang menonjolkan subjek disebut ruang...",
        "shortAnswer": "negatif|kosong|negatif",
        "wrongOptions": ["positif", "hampa", "penuh", "ramai"],
        "explanation": "Ruang negatif (negative space) — ruang kosong yang menonjolkan subjek. 'Negatif' paling tepat (Indonesia), 'Kosong' accepted (sinonim)."
    },
]


# ============================================================
# GENERATE SQL FILE
# ============================================================

def make_pg_sql(q_id, q_data):
    """PG biasa — optionA-D + correctAnswer"""
    opts = q_data["options"]
    sql = f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data["question"])}, {sql_str(opts[0])}, {sql_str(opts[1])}, {sql_str(opts[2])}, {sql_str(opts[3])}, {q_data["correct"]}, {sql_str(q_data["explanation"])}, {sql_str(q_data["category"])}, true, 'pilihan_ganda', '[]', '[]', '', '', {sql_str(q_data["level"])}, {sql_str('Jawaban benar: ' + chr(65 + q_data['correct']) + '. ' + q_data['explanation'])}, {sql_str('Opsi lain tidak tepat karena tidak sesuai konsep.')}, {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""
    return sql


def make_pg_kompleks_sql(q_id, q_data):
    """PG Kompleks — optionA-D + correctAnswers JSON array"""
    opts = q_data["options"]
    correct_answers_json = str(q_data["correct"]).replace(" ", "")
    sql = f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data["question"])}, {sql_str(opts[0])}, {sql_str(opts[1])}, {sql_str(opts[2])}, {sql_str(opts[3])}, {q_data["correct"][0]}, {sql_str(q_data["explanation"])}, {sql_str(q_data["category"])}, true, 'pilihan_ganda_kompleks', '{correct_answers_json}', '[]', '', '', {sql_str(q_data["level"])}, {sql_str('Jawaban benar: ' + ', '.join([chr(65 + i) for i in q_data['correct']]) + '. ' + q_data['explanation'])}, {sql_str('Opsi lain tidak tepat karena tidak sesuai konsep.')}, {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""
    return sql


def make_isian_sql(q_id, q_data):
    """Isian Singkat — shortAnswer pipe-separated (3 accepted: RIGHT1|RIGHT2|BEST)
    Format: 4 salah + 2 benar + 1 paling benar
    Implementasi: shortAnswer = "right1|right2|best" (urutan: index 0,1 = benar parsial, index 2 = best)
    correctAnswer = 2 (index BEST, untuk backward compat)
    analisisDistraktor: simpan informasi scoring rubric sebagai JSON string
    """
    short_answer = q_data["shortAnswer"]  # format: "right1|right2|best"
    # correctAnswer = 2 (index BEST di shortAnswer) — untuk backward compat
    parts = short_answer.split('|')
    correct_answer_idx = len(parts) - 1  # last is BEST

    # 4 wrong options dari q_data, fallback ke empty string jika kurang
    wrong_opts = q_data.get("wrongOptions", [])
    option_a = wrong_opts[0] if len(wrong_opts) > 0 else ""
    option_b = wrong_opts[1] if len(wrong_opts) > 1 else ""
    option_c = wrong_opts[2] if len(wrong_opts) > 2 else ""
    option_d = wrong_opts[3] if len(wrong_opts) > 3 else ""

    # Store scoring rubric in analisisDistraktor sebagai JSON
    # Format: {"right_partial": ["right1","right2"], "best": "best", "score_partial": 50, "score_best": 100}
    if len(parts) >= 3:
        right_partial = parts[:-1]  # semua kecuali terakhir
        best = parts[-1]  # terakhir
        rubric = f'Skor: BEST ({best})=100, RIGHT ({",".join(right_partial)})=50, lain=0'
    else:
        rubric = q_data["explanation"]

    sql = f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data["question"])}, {sql_str(option_a)}, {sql_str(option_b)}, {sql_str(option_c)}, {sql_str(option_d)}, {correct_answer_idx}, {sql_str(q_data["explanation"])}, {sql_str(q_data["category"])}, true, 'isian_singkat', '[]', '[]', {sql_str(short_answer)}, '', {sql_str(q_data["level"])}, {sql_str('Jawaban: ' + short_answer + '. ' + q_data['explanation'])}, {sql_str(rubric)}, {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""
    return sql


def main():
    print(f"Generating SQL file: {OUTPUT_PATH}")

    content = []
    content.append("""-- ============================================================
-- SKRIP SQL: Tugas Bab 2 untuk Kelas 11 DKV
-- Mata Pelajaran: Mata Pelajaran Pilihan
-- Bab 2: Memahami Komposisi Estetika Fotografi
-- Total: 55 soal (35 PG + 10 PG Kompleks + 10 Isian)
-- Bobot: PG 50%, PG Kompleks 30%, Isian 20% (total 100)
-- ============================================================
--
-- CARA PAKAI:
-- 1. Login ke https://supabase.com → pilih project
-- 2. Buka menu "SQL Editor" → "New query"
-- 3. Salin seluruh skrip ini, paste ke editor
-- 4. Klik "Run" (tombol play)
-- 5. Tunggu pesan "Success. No rows returned"
--
-- CATATAN:
-- - Idempotent (ON CONFLICT DO NOTHING)
-- - Menggunakan CP yang SUDAH ADA: cp_dkv_pil_11_2
-- - Menggunakan TP yang SUDAH ADA: tp_dkv_pil_11_2_1
-- - Membuat 55 soal baru:
--   * 35 Pilihan Ganda (HOTS, C3/C4/C5)
--   * 10 Pilihan Ganda Kompleks (multi-answer)
--   * 10 Isian Singkat (4 salah + 2 benar + 1 paling benar)
-- - Membuat Assignment "Tugas Bab 2: Komposisi Estetika":
--   * questionCount = 55 (35 PG + 10 PG Kompleks + 10 Isian dalam tugas yang sama)
--   * duration = 90 menit
--   * dueDate = 28 September 2026 23:59 WIB
--   * taskType = quiz_only
--
-- Bobot nilai (di-handle frontend quiz-stage.tsx):
-- - PG (35 soal × ~1.43 poin) = 50 poin
-- - PG Kompleks (10 soal × 3 poin) = 30 poin
-- - Isian (10 soal × 2 poin) = 20 poin
-- - Total: 100 poin
-- ============================================================
""")

    # ============================================================
    # 35 SOAL PILIHAN GANDA
    # ============================================================
    content.append("""
-- ============================================================
-- 35 SOAL PILIHAN GANDA (HOTS, C3/C4/C5)
-- Bobot: 50% (1.43 poin per soal)
-- ============================================================
""")
    for i, q in enumerate(PG_QUESTIONS[:35], start=1):
        q_id = f"q_tugas2_11dkv_pg_{i:03d}"
        content.append(f"\n-- PG #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_pg_sql(q_id, q))

    # ============================================================
    # 10 SOAL PILIHAN GANDA KOMPLEKS
    # ============================================================
    content.append("""
-- ============================================================
-- 10 SOAL PILIHAN GANDA KOMPLEKS (multi-answer)
-- Bobot: 30% (3 poin per soal)
-- ============================================================
""")
    for i, q in enumerate(PG_KOMPLEKS_QUESTIONS[:10], start=1):
        q_id = f"q_tugas2_11dkv_pgk_{i:03d}"
        content.append(f"\n-- PG Kompleks #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_pg_kompleks_sql(q_id, q))

    # ============================================================
    # 10 SOAL ISIAN SINGKAT
    # ============================================================
    content.append("""
-- ============================================================
-- 10 SOAL ISIAN SINGKAT
-- Format: shortAnswer = "right1|right2|best" (3 accepted, urutan: 2 benar + 1 paling benar)
-- Bobot: 20% (2 poin per soal)
-- - BEST (paling benar): 100% poin (2 poin)
-- - RIGHT (benar parsial): 50% poin (1 poin)
-- - Lain: 0 poin
-- Siswa harus ketik salah satu accepted answer (case-insensitive)
-- Di luar accepted = jawaban tidak bisa disimpan
-- ============================================================
""")
    for i, q in enumerate(ISIAN_QUESTIONS[:10], start=1):
        q_id = f"q_tugas2_11dkv_isian_{i:03d}"
        content.append(f"\n-- Isian #{i:03d} ({q['level']} - {q['category']})")
        content.append(make_isian_sql(q_id, q))

    # ============================================================
    # ASSIGNMENT TUGAS BAB 2
    # ============================================================
    content.append(f"""
-- ============================================================
-- ASSIGNMENT: Tugas Bab 2 untuk Kelas 11 DKV
-- ============================================================
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_dkv_11_2_tugas', 'Tugas Bab 2: Komposisi Estetika Fotografi (35 PG + 10 PG Kompleks + 10 Isian)', 'Tugas mendalam tentang komposisi estetika fotografi untuk Bab 2. Berisi 35 soal pilihan ganda HOTS (C3/C4/C5), 10 soal pilihan ganda kompleks (multi-answer), dan 10 soal isian singkat dengan 3 opsi jawaban yang diterima (2 benar + 1 paling benar). Waktu pengerjaan 90 menit. Bobot: PG 50%, PG Kompleks 30%, Isian 20%. Anti copy-paste dan screenshot aktif. Baca materi "Bab 2: Memahami Komposisi Estetika Fotografi" sebelum mengerjakan.', {sql_str(SUBJECT)}, '11DKV', 'SMK', true, '{DUE_DATE_ISO}', 'wajib', 55, 'quiz_only', NULL, {sql_str(CP_ID)}, {sql_str(TP_ID)}, 'luring', '', '2026/2027', 'ganjil', 90, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;""")

    # ============================================================
    # VERIFIKASI
    # ============================================================
    content.append("""
-- ============================================================
-- VERIFIKASI
-- ============================================================

-- Total soal per tipe
SELECT "questionType", COUNT(*) AS jumlah_soal
FROM "Question"
WHERE "cpId" = 'cp_dkv_pil_11_2'
  AND "tpId" = 'tp_dkv_pil_11_2_1'
  AND id LIKE 'q_tugas2_11dkv_%'
GROUP BY "questionType"
ORDER BY "questionType";

-- Expected:
-- isian_singkat          10
-- pilihan_ganda          35
-- pilihan_ganda_kompleks 10
-- Total: 55 soal

-- Tugas baru
SELECT id, title, "targetKelas", "questionCount", "duration", "dueDate"
FROM "Assignment"
WHERE id = 'asg_dkv_11_2_tugas';

-- Expected: 1 baris dengan questionCount=55, duration=90, dueDate=2026-09-28

-- Cek sample isian singkat (shortAnswer format)
SELECT id, LEFT(question, 60) AS pertanyaan, "shortAnswer"
FROM "Question"
WHERE id LIKE 'q_tugas2_11dkv_isian_%'
ORDER BY id
LIMIT 5;

-- Expected: shortAnswer format "right1|right2|best" (3 accepted answers)
""")

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(content))

    file_size = os.path.getsize(OUTPUT_PATH) / 1024
    print(f"\n✅ SQL file berhasil dibuat: {OUTPUT_PATH}")
    print(f"   📊 File size: {file_size:.1f} KB")
    print(f"   📝 Total soal: 55 (35 PG + 10 PG Kompleks + 10 Isian)")
    print(f"   📋 Assignment: 1 (Tugas Bab 2 Komposisi Estetika)")
    print(f"   ⏱️  Duration: 90 menit")
    print(f"   📅 Deadline: 28 September 2026 23:59 WIB")
    print(f"   🎯 Bobot: PG 50%, PG Kompleks 30%, Isian 20%")
    print(f"   🔒 Anti copy-paste + screenshot: aktif di frontend")
    print(f"   ✏️  Isian: 3 accepted answers (2 benar + 1 paling benar)")


if __name__ == "__main__":
    main()
