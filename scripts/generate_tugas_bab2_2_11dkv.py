#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator SQL: TP 2.2 + Materi + Soal (30 Isian + 20 PGK) + Tugas Bab 2.2
DKV Kelas 11 — Mata Pelajaran Pilihan
Fokus: Psikologi Sudut Pandang & Dinamika Garis + Harmoni Warna
"""

import os

OUTPUT_PATH = "/home/z/my-project/download/insert_tugas_bab2_2_11dkv.sql"
DUE_DATE_ISO = "2026-10-05T23:59:00+07:00"
CP_ID = "cp_dkv_pil_11_2"
TP_ID = "tp_dkv_pil_11_2_2"
GRADE = "11DKV"
SUBJECT = "Mata Pelajaran Pilihan"

def sql_escape(text):
    if text is None: return ""
    return text.replace("'", "''")

def sql_str(text):
    return f"'{sql_escape(text)}'"

MATERI = """# Psikologi Sudut Pandang, Dinamika Garis & Harmoni Warna dalam Fotografi

## Psikologi Sudut Pandang (Camera Angle)

Sudut pandang kamera menentukan bagaimana penonton mempersepsikan subjek. Setiap sudut mengandung muatan psikologis yang memengaruhi emosi dan interpretasi.

### 1. Sudut Normal (Eye Level)
Kamera sejajar dengan mata subjek. Menghasilkan kesan **netral, objektif, setara**. Penonton merasa berada di posisi yang sama dengan subjek. Cocok untuk dokumenter, wawancara, dan foto formal.

### 2. Sudut Rendah (Low Angle)
Kamera di bawah subjek, menengok ke atas. Subjek terlihat **dominan, kuat, agung, berkuasa**. Sering dipakai untuk tokoh pahlawan, tokoh antagonis yang menakutkan, atau gedung tinggi yang mengesankan.

### 3. Sudut Tinggi (High Angle)
Kamera di atas subjek, menengok ke bawah. Subjek terlihat **lemah, kecil, rentan, tidak berdaya**. Digunakan untuk menunjukkan kerentanan, kesepian, atau kekalahan.

### 4. Sudut Burung (Bird's Eye / Top Shot)
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
"""

# ── 30 SOAL ISIAN SINGKAT ──
ISIAN_QUESTIONS = [
    {"q": "Sudut pandang kamera di bawah subjek, menengok ke atas, membuat subjek terlihat dominan dan kuat disebut sudut...", "a": "rendah|bawah|rendah", "w": ["tinggi", "normal", "datar", "samping"]},
    {"q": "Sudut pandang kamera di atas subjek, menengok ke bawah, membuat subjek terlihat lemah dan kecil disebut sudut...", "a": "tinggi|atas|tinggi", "w": ["rendah", "normal", "burung", "samping"]},
    {"q": "Sudut pandang kamera sejajar dengan mata subjek, menghasilkan kesan netral dan objektif disebut sudut...", "a": "normal|eye level|sejajar|normal", "w": ["tinggi", "rendah", "miring", "burung"]},
    {"q": "Kamera dimiringkan dari sumbu horizontal, menciptakan ketegangan dan disorientasi disebut sudut...", "a": "belanda|miring|tilt|belanda", "w": ["normal", "tinggi", "rendah", "datar"]},
    {"q": "Sudut pandang tepat di atas subjek, menengok lurus ke bawah, disebut sudut...", "a": "burung|top shot|bird eye|burung", "w": ["normal", "tinggi", "rendah", "belanda"]},
    {"q": "Garis yang posisinya mendatar, menciptakan kesan tenang dan stabil adalah garis...", "a": "horizontal|mendatar|horizontal", "w": ["vertikal", "diagonal", "lengkung", "zigzag"]},
    {"q": "Garis yang posisinya tegak lurus, menciptakan kesan kuat dan agung adalah garis...", "a": "vertikal|tegak|vertikal", "w": ["horizontal", "diagonal", "lengkung", "zigzag"]},
    {"q": "Garis yang miring, menciptakan kesan dinamis dan energetik adalah garis...", "a": "diagonal|miring|diagonal", "w": ["horizontal", "vertikal", "lengkung", "zigzag"]},
    {"q": "Garis yang melengkung, menciptakan kesan lembut dan organik adalah garis...", "a": "lengkung|melengkung|kurva|lengkung", "w": ["horizontal", "vertikal", "diagonal", "zigzag"]},
    {"q": "Garis yang memandu mata penonton dari tepi foto menuju subjek utama disebut garis...", "a": "pandu|pemandu|leading|pandu", "w": ["horizontal", "vertikal", "lengkung", "zigzag"]},
    {"q": "Dua atau lebih garis yang bertemu di satu titik, menciptakan ilusi kedalaman disebut garis...", "a": "konvergen|bertemu|converging|konvergen", "w": ["paralel", "horizontal", "zigzag", "lengkung"]},
    {"q": "Titik di mana garis konvergen bertemu disebut titik...", "a": "hilang|vanishing|hilang", "w": ["fokus", "tengah", "tepi", "awal"]},
    {"q": "Dua warna berseberangan di color wheel (misal merah-hijau) disebut warna...", "a": "komplementer|komplementer|komplementer", "w": ["analog", "monokromatik", "triadik", "netral"]},
    {"q": "Tiga atau lebih warna berdekatan di color wheel disebut warna...", "a": "analog|analog|analog", "w": ["komplementer", "monokromatik", "triadik", "netral"]},
    {"q": "Variasi tint dan shade dari satu warna disebut warna...", "a": "monokromatik|monokrom|monokromatik", "w": ["analog", "komplementer", "triadik", "netral"]},
    {"q": "Tiga warna berjarak sama di color wheel disebut warna...", "a": "triadik|triad|triadik", "w": ["analog", "komplementer", "monokromatik", "netral"]},
    {"q": "Warna merah, oranye, kuning termasuk suhu warna...", "a": "hangat|panas|hangat", "w": ["dingin", "netral", "gelap", "terang"]},
    {"q": "Warna biru, hijau, ungu termasuk suhu warna...", "a": "dingin|sejuk|dingin", "w": ["hangat", "netral", "gelap", "terang"]},
    {"q": "Low angle membuat subjek terlihat...", "a": "kuat|dominan|kuat", "w": ["lemah", "kecil", "tenang", "netral"]},
    {"q": "High angle membuat subjek terlihat...", "a": "lemah|kecil|rentan|lemah", "w": ["kuat", "dominan", "agung", "netral"]},
    {"q": "Dutch angle menciptakan rasa...", "a": "ketegangan|disorientasi|tegang|ketegangan", "w": ["tenang", "damai", "stabil", "netral"]},
    {"q": "Garis horizontal menciptakan rasa...", "a": "tenang|stabil|damai|tenang", "w": ["dinamis", "tegang", "kuat", "kacau"]},
    {"q": "Garis diagonal menciptakan rasa...", "a": "dinamis|energetik|dinamis", "w": ["tenang", "stabil", "damai", "lemah"]},
    {"q": "Garis vertikal menciptakan rasa...", "a": "kuat|tegak|agung|kuat", "w": ["tenang", "lemah", "lembut", "kacau"]},
    {"q": "Kombinasi warna komplementer menghasilkan kontras yang...", "a": "tinggi|kuat|maximal|tinggi", "w": ["rendah", "lemah", "halus", "lembut"]},
    {"q": "Kombinasi warna analog menghasilkan kesan yang...", "a": "harmonis|tenang|nyaman|harmonis", "w": ["kontras", "tegang", "silau", "kacau"]},
    {"q": "Eye level menghasilkan kesan yang...", "a": "netral|objektif|setara|netral", "w": ["dominan", "lemah", "tegang", "kacau"]},
    {"q": "Bird's eye view membuat penonton merasa seperti mengamati dari...", "a": "atas|langit|atas", "w": ["bawah", "samping", "depan", "belakang"]},
    {"q": "Split-komplementer adalah satu warna dasar ditambah dua warna di samping warna...", "a": "komplementer|komplementer|komplementer", "w": ["analog", "triadik", "monokromatik", "netral"]},
    {"q": "Garis zigzag menciptakan kesan yang...", "a": "kacau|energetik|tidak stabil|kacau", "w": ["tenang", "damai", "stabil", "lembut"]},
]

# ── 20 SOAL PG KOMPLEKS ──
PGK_QUESTIONS = [
    {"q": "Pilih SEMUA sudut pandang yang membuat subjek terlihat DOMINAN/KUAT:", "o": ["Low angle (sudut rendah)", "Eye level (sudut normal)", "High angle (sudut tinggi)", "Bird's eye (sudut burung)"], "c": [0]},
    {"q": "Pilih SEMUA efek psikologis dari DUTCH ANGLE:", "o": ["Ketegangan", "Disorientasi", "Kestabilan", "Kekacauan"], "c": [0,1,3]},
    {"q": "Pilih SEMUA garis yang menciptakan kesan DINAMIS/ENERGETIK:", "o": ["Garis diagonal", "Garis horizontal", "Garis zigzag", "Garis lengkung"], "c": [0,2]},
    {"q": "Pilih SEMUA garis yang menciptakan kesan TENANG/STABIL:", "o": ["Garis horizontal", "Garis vertikal", "Garis diagonal", "Garis lengkung"], "c": [0,1]},
    {"q": "Pilih SEMUA yang termasuk warna KOMPLEMENTER:", "o": ["Merah-hijau", "Biru-oranye", "Kuning-ungu", "Merah-kuning"], "c": [0,1,2]},
    {"q": "Pilih SEMUA yang termasuk warna HANGAT:", "o": ["Merah", "Oranye", "Kuning", "Biru"], "c": [0,1,2]},
    {"q": "Pilih SEMUA yang termasuk warna DINGIN:", "o": ["Biru", "Hijau", "Ungu", "Oranye"], "c": [0,1,2]},
    {"q": "Pilih SEMUA efek dari LOW ANGLE:", "o": ["Subjek terlihat kuat", "Subjek terlihat dominan", "Subjek terlihat agung", "Subjek terlihat lemah"], "c": [0,1,2]},
    {"q": "Pilih SEMUA efek dari HIGH ANGLE:", "o": ["Subjek terlihat kecil", "Subjek terlihat lemah", "Subjek terlihat rentan", "Subjek terlihat agung"], "c": [0,1,2]},
    {"q": "Pilih SEMUA yang termasuk leading lines:", "o": ["Jalan yang menyempit", "Rel kereta api", "Garis pantai", "Langit polos"], "c": [0,1,2]},
    {"q": "Pilih SEMUA kombinasi warna yang HARMONIS:", "o": ["Analog", "Monokromatik", "Komplementer (dengan hati-hati)", "Acak tanpa pola"], "c": [0,1,2]},
    {"q": "Pilih SEMUA ciri warna ANALOG:", "o": ["Berdekatan di color wheel", "Tenang dan nyaman", "Kontras tinggi", "Harmonis"], "c": [0,1,3]},
    {"q": "Pilih SEMUA ciri warna MONOKROMATIK:", "o": ["Variasi tint dan shade satu warna", "Elegan dan minimalis", "Kontras sangat tinggi", "Rapi dan terstruktur"], "c": [0,1,3]},
    {"q": "Pilih SEMUA yang membuat konverging lines efektif:", "o": ["Menciptakan ilusi kedalaman", "Menarik perhatian ke titik temu", "Menciptakan ketenangan", "Memberi kesan 3D"], "c": [0,1,3]},
    {"q": "Pilih SEMUA situasi yang cocok untuk EYE LEVEL:", "o": ["Wawancara formal", "Dokumenter", "Foto paspor", "Foto horor"], "c": [0,1,2]},
    {"q": "Pilih SEMUA situasi yang cocok untuk LOW ANGLE:", "o": ["Tokoh pahlawan", "Gedung tinggi", "Tokoh antagonis menakutkan", "Anak yang ketakutan"], "c": [0,1,2]},
    {"q": "Pilih SEMUA situasi yang cocok untuk DUTCH ANGLE:", "o": ["Adegan thriller", "Ketidakstabilan mental", "Situasi berbahaya", "Foto wisata formal"], "c": [0,1,2]},
    {"q": "Pilih SEMUA efek garis LENGKUNG:", "o": ["Lembut", "Organik", "Mengalir", "Tegas dan kuat"], "c": [0,1,2]},
    {"q": "Pilih SEMUA yang termasuk warna TRIADIK:", "o": ["Merah-biru-kuning", "Tiga warna berjarak sama", "Satu warna dominan + dua aksen", "Dua warna berseberangan"], "c": [0,1,2]},
    {"q": "Pilih SEMUA yang memengaruhi MOOD foto:", "o": ["Sudut pandang kamera", "Jenis garis dominan", "Skema warna", "ISO kamera"], "c": [0,1,2]},
]

def make_isian_sql(q_id, q_data, idx):
    short_answer = q_data["a"]
    wrong_opts = q_data.get("w", [])
    option_a = wrong_opts[0] if len(wrong_opts) > 0 else ""
    option_b = wrong_opts[1] if len(wrong_opts) > 1 else ""
    option_c = wrong_opts[2] if len(wrong_opts) > 2 else ""
    option_d = wrong_opts[3] if len(wrong_opts) > 3 else ""
    return f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data["q"])}, {sql_str(option_a)}, {sql_str(option_b)}, {sql_str(option_c)}, {sql_str(option_d)}, 2, '', 'Psikologi & Warna', true, 'isian_singkat', '[]', '[]', {sql_str(short_answer)}, '', 'C3', '', '', {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""

def make_pgk_sql(q_id, q_data, idx):
    opts = q_data["o"]
    correct_answers_json = str(q_data["c"]).replace(" ", "")
    return f"""INSERT INTO "Question" (id, "gradeLevel", subject, question, "optionA", "optionB", "optionC", "optionD", "correctAnswer", explanation, category, "isActive", "questionType", "correctAnswers", "matchPairs", "shortAnswer", "essayAnswer", "levelKognitif", "pembahasanBenar", "analisisDistraktor", "cpId", "tpId", "createdAt", "updatedAt") VALUES
({sql_str(q_id)}, {sql_str(GRADE)}, {sql_str(SUBJECT)}, {sql_str(q_data["q"])}, {sql_str(opts[0])}, {sql_str(opts[1])}, {sql_str(opts[2])}, {sql_str(opts[3])}, {q_data["c"][0]}, '', 'Psikologi & Warna', true, 'pilihan_ganda_kompleks', '{correct_answers_json}', '[]', '', '', 'C4', '', '', {sql_str(CP_ID)}, {sql_str(TP_ID)}, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;"""

def main():
    print(f"Generating SQL: {OUTPUT_PATH}")
    content = []
    content.append(f"""-- Tugas Bab 2.2 DKV 11: Psikologi Sudut Pandang & Harmoni Warna
-- 30 Isian + 20 PGK, duration 60 menit, deadline 5 Okt 2026

-- TP 2.2
INSERT INTO "TujuanPembelajaran" (id, "cpId", "kodeTP", deskripsi, "isActive", "createdAt", "updatedAt")
VALUES ('{TP_ID}', '{CP_ID}', 'TP.DKV.2.2', 'Siswa mampu menerapkan psikologi sudut pandang, garis, dan harmoni warna.', true, NOW(), NOW())
ON CONFLICT ("cpId", "kodeTP") DO NOTHING;

-- Materi
INSERT INTO "Material" (id, title, content, subject, "targetKelas", "targetJenjang", category, "cpId", "tpId", "isActive", "mediaType", "createdAt", "updatedAt")
VALUES ('mat_dkv_pil_11_2_2', 'Psikologi Sudut Pandang, Dinamika Garis & Harmoni Warna', {sql_str(MATERI)}, '{SUBJECT}', '11DKV', 'SMK', 'Psikologi & Warna', '{CP_ID}', '{TP_ID}', true, 'teks', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
""")

    for i, q in enumerate(ISIAN_QUESTIONS[:30], 1):
        q_id = f"q_bab22_11dkv_isian_{i:03d}"
        content.append(f"\n-- Isian #{i:03d}")
        content.append(make_isian_sql(q_id, q, i))

    for i, q in enumerate(PGK_QUESTIONS[:20], 1):
        q_id = f"q_bab22_11dkv_pgk_{i:03d}"
        content.append(f"\n-- PGK #{i:03d}")
        content.append(make_pgk_sql(q_id, q, i))

    content.append(f"""
-- Tugas Bab 2.2
INSERT INTO "Assignment" (id, title, description, subject, "targetKelas", "targetJenjang", "isActive", "dueDate", "exerciseType", "questionCount", "taskType", "teacherId", "cpId", "tpId", "taskCategory", "taskTypeName", "tahunAjaran", "semester", "duration", "createdAt", "updatedAt")
VALUES ('asg_dkv_11_2_2_tugas', 'Tugas Bab 2.2: Psikologi Sudut Pandang & Harmoni Warna (30 Isian + 20 PGK)', 'Tugas tentang psikologi sudut pandang, dinamika garis, dan harmoni warna. 30 soal isian + 20 soal PG kompleks. Waktu 60 menit.', '{SUBJECT}', '11DKV', 'SMK', true, '{DUE_DATE_ISO}', 'wajib', 50, 'quiz_only', NULL, '{CP_ID}', '{TP_ID}', 'luring', '', '2026/2027', 'ganjil', 60, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verifikasi
SELECT "questionType", COUNT(*) FROM "Question" WHERE id LIKE 'q_bab22_11dkv_%' GROUP BY "questionType";
-- Expected: isian_singkat 30, pilihan_ganda_kompleks 20
""")

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(content))
    size = os.path.getsize(OUTPUT_PATH) / 1024
    print(f"✅ {OUTPUT_PATH} ({size:.1f} KB)")
    print(f"   30 Isian + 20 PGK = 50 soal")
    print(f"   TP: {TP_ID} (deskripsi < 100 chars)")
    print(f"   Duration: 60 menit, Deadline: 5 Okt 2026")

if __name__ == "__main__":
    main()
