// Konstanta Multi-Subject & Multi-Teacher Isolation untuk SAKOLA

// Mapel Utama SMP (14 mapel — Matematika ditambahkan resmi per 2026)
export const SMP_SUBJECTS = [
  'Matematika',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Mandarin',
  'Informatika',
  'IPS',
  'IPA',
  'Seni Budaya',
  'Agama',
  'PLH',
  'KKA',
  'Kerohanian',
  'PkN',
  'Penjaskes',
] as const

// Mapel Kejuruan SMK Santo Petrus
// Ditambahkan: "Mapel Kejuruan" dan "Mapel Pilihan" sebagai mapel utama SMK DKV
export const SMK_SUBJECTS = [
  'Mata Pelajaran Kejuruan',
  'Mata Pelajaran Pilihan',
  'DKV',
  'Komputer Akuntansi',
  'Multimedia',
  'TKJ',
  'RPL',
] as const

// Semua mapel gabungan
export const ALL_SUBJECTS = [...SMP_SUBJECTS, ...SMK_SUBJECTS] as const

// Jenjang
export const JENJANG_OPTIONS = [
  { value: 'SMP', label: 'SMP', grades: ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B'] },
  { value: 'SMK', label: 'SMK Santo Petrus', grades: ['11DKV', '12DKV'] },
] as const

// Semua kelas (SMP + SMK)
export const ALL_GRADES = [
  '7A', '7B', '7C',
  '8A', '8B', '8C',
  '9A', '9B',
  '11DKV', '12DKV',
] as const

// Grade tier untuk soal (digit pertama: 7, 8, 9, 11DKV, 12DKV)
export const GRADE_TIERS = ['7', '8', '9', '11DKV', '12DKV'] as const

// Map kelas → tier
export function getGradeTier(kelas: string): string {
  if (kelas.startsWith('7')) return '7'
  if (kelas.startsWith('8')) return '8'
  if (kelas.startsWith('9')) return '9'
  if (kelas.startsWith('11')) return '11DKV'
  if (kelas.startsWith('12')) return '12DKV'
  return '7'
}

// Map kelas → jenjang
export function getJenjang(kelas: string): string {
  if (kelas.startsWith('11') || kelas.startsWith('12')) return 'SMK'
  return 'SMP'
}

// Mapel berdasarkan jenjang
export function getSubjectsByJenjang(jenjang: string): readonly string[] {
  if (jenjang === 'SMK') return SMK_SUBJECTS
  return SMP_SUBJECTS
}

// Subject categories untuk bank soal
export const SUBJECT_CATEGORIES: Record<string, string[]> = {
  'Informatika': ['Dekomposisi', 'Pengenalan Pola', 'Abstraksi', 'Algoritma', 'Konsep Dasar', 'Internet', 'Etika Digital', 'Keamanan Digital', 'Kesehatan Digital'],
  'DKV': ['Desain Grafis', 'Animasi', 'Fotografi', 'Videografi', 'Tipografi', 'Komposisi'],
  'Mata Pelajaran Kejuruan': ['Desain Grafis', 'Animasi', 'Fotografi', 'Videografi', 'Tipografi', 'Komposisi', 'Praktik Kerja Lapangan'],
  'Mata Pelajaran Pilihan': ['Kewirausahaan', 'Komunikasi Bisnis', 'Etika Profesi', 'Manajemen Proyek', 'Konsep Dasar'],
  'Bahasa Indonesia': ['Membaca', 'Menulis', 'Berbicara', 'Mendengarkan', 'Sastra', 'EYD'],
  'Bahasa Inggris': ['Grammar', 'Vocabulary', 'Reading', 'Writing', 'Listening', 'Speaking'],
  'Mandarin': ['Hanzi', 'Pinyin', 'Tata Bahasa', 'Kosakata', 'Budaya'],
  'Matematika': ['Aljabar', 'Geometri', 'Statistika', 'Aritmatika', 'Peluang'],
  'IPA': ['Fisika', 'Biologi', 'Kimia', 'Geologi'],
  'IPS': ['Sejarah', 'Geografi', 'Ekonomi', 'Sosiologi'],
  'Seni Budaya': ['Seni Rupa', 'Seni Musik', 'Seni Tari', 'Seni Teater'],
  'Agama': ['Alkitab', 'Moral', 'Ibadah', 'Sejarah Agama'],
  'PLH': ['Lingkungan', 'Pencemaran', 'Konservasi', 'Energi'],
  'KKA': ['Komunikasi', 'Kolaborasi', 'Kreativitas', 'Berpikir Kritis'],
  'Kerohanian': ['Rohani', 'Doa', 'Iman', 'Pelayanan'],
  'PkN': ['Pancasila', 'UUD', 'BHinneka', 'Negara'],
  'Penjaskes': ['Olahraga', 'Kesehatan', 'Kebugaran', 'Permainan'],
  'default': ['Umum', 'Konsep Dasar', 'Latihan', 'Ulangan'],
}

export function getCategoriesForSubject(subject: string): string[] {
  return SUBJECT_CATEGORIES[subject] || SUBJECT_CATEGORIES['default']
}

// IT subjects yang punya fitur khusus (mengetik, game, dll)
export const IT_SUBJECTS = ['Informatika', 'DKV']

// Subjects yang boleh punya fitur mengetik saat DARING (Informatika + KKA)
export const TYPING_SUBJECTS_DARING = ['Informatika', 'KKA']

// Cek apakah subject punya fitur mengetik
export function hasTypingFeature(subject: string): boolean {
  return IT_SUBJECTS.includes(subject)
}

// ── v2: Task Categories (Luring / Daring) ──
export const TASK_CATEGORIES = [
  { value: 'luring', label: 'Luring (Offline)' },
  { value: 'daring', label: 'Daring (Online)' },
] as const

// ── v2: Jenis tugas Kurikulum Merdeka ──
export const KURIKULUM_MERDEKA_TASK_TYPES = [
  { value: 'tugas_proyek', label: 'Tugas Proyek' },
  { value: 'belajar_bermain', label: 'Belajar Sambil Bermain' },
  { value: 'quiz_only', label: 'Soal HOTS (Kuis)' },
  { value: 'drawing', label: 'Tugas Menggambar / Peta Konsep' },
  { value: 'game', label: 'Game Interaktif (Benar/Salah)' },
  { value: 'typing_quiz', label: 'Tugas Mengetik + Soal HOTS' },
  { value: 'typing_only', label: 'Tugas Mengetik Saja' },
  { value: 'manual', label: 'Lainnya (Input Manual)' },
] as const

// ── v2: Grade categories untuk Nilai Harian ──
export const GRADE_CATEGORIES = [
  { value: 'tugas_harian', label: 'Tugas Harian' },
  { value: 'ulangan_harian', label: 'Ulangan Harian' },
  { value: 'sts', label: 'Asesmen Tengah Semester (STS/MID)' },
  { value: 'sas', label: 'Asesmen Akhir Semester (SAS/UAS)' },
] as const

// ── v2: Tahun Ajaran options ──
export const TAHUN_AJARAN_OPTIONS = [
  '2025/2026',
  '2026/2027',
  '2027/2028',
] as const

// ── v2: Semester options ──
export const SEMESTER_OPTIONS = [
  { value: 'ganjil', label: 'Ganjil' },
  { value: 'genap', label: 'Genap' },
] as const

// ── v2: Get task types based on category (Luring/Daring) + subject ──
// Luring: all types except typing-specific
// Daring + Informatika/KKA: include typing options
// Daring + other subjects: no typing, but include game + manual
export function getTaskTypesForCategory(
  category: string,
  subject: string
): Array<{ value: string; label: string }> {
  const baseTypes = [
    { value: 'tugas_proyek', label: 'Tugas Proyek' },
    { value: 'belajar_bermain', label: 'Belajar Sambil Bermain' },
    { value: 'quiz_only', label: 'Soal HOTS (Kuis)' },
    { value: 'drawing', label: 'Tugas Menggambar / Peta Konsep' },
    { value: 'manual', label: 'Lainnya (Input Manual)' },
  ]

  if (category === 'daring') {
    // Daring + Informatika/KKA: include typing options
    if (TYPING_SUBJECTS_DARING.includes(subject)) {
      return [
        { value: 'tugas_proyek', label: 'Tugas Proyek' },
        { value: 'belajar_bermain', label: 'Belajar Sambil Bermain' },
        { value: 'quiz_only', label: 'Soal HOTS (Kuis)' },
        { value: 'drawing', label: 'Tugas Menggambar / Peta Konsep' },
        { value: 'typing_quiz', label: 'Tugas Mengetik + Soal HOTS' },
        { value: 'typing_only', label: 'Tugas Mengetik Saja' },
        { value: 'game', label: 'Game Interaktif (Benar/Salah)' },
        { value: 'manual', label: 'Lainnya (Input Manual)' },
      ]
    }
    // Daring + Non-IT: no typing, but add game
    return [
      { value: 'tugas_proyek', label: 'Tugas Proyek' },
      { value: 'belajar_bermain', label: 'Belajar Sambil Bermain' },
      { value: 'quiz_only', label: 'Soal HOTS (Kuis)' },
      { value: 'drawing', label: 'Tugas Menggambar / Peta Konsep' },
      { value: 'game', label: 'Game Interaktif (Benar/Salah)' },
      { value: 'manual', label: 'Lainnya (Input Manual)' },
    ]
  }

  // Luring: all Kurikulum Merdeka types except typing-specific
  return baseTypes
}

// Legacy: getTaskTypesForSubject (kept for backward compat, delegates to luring category)
export function getTaskTypesForSubject(subject: string): Array<{ value: string; label: string }> {
  return getTaskTypesForCategory('luring', subject)
}

// ── v3: Question Types (5 jenis Kurikulum Merdeka) ──
export const QUESTION_TYPES = [
  { value: 'pilihan_ganda', label: 'Pilihan Ganda' },
  { value: 'pilihan_ganda_kompleks', label: 'Pilihan Ganda Kompleks (Checkbox)' },
  { value: 'mencocokkan', label: 'Mencocokkan / Jodohkan' },
  { value: 'isian_singkat', label: 'Isian Singkat' },
  { value: 'essai', label: 'Essai / Uraian' },
] as const

// ── v3: Level Kognitif (Taksonomi Bloom C1-C6) ──
export const LEVEL_KOGNITIF = [
  { value: 'C1', label: 'C1 - Mengingat' },
  { value: 'C2', label: 'C2 - Memahami' },
  { value: 'C3', label: 'C3 - Menerapkan' },
  { value: 'C4', label: 'C4 - Menganalisis' },
  { value: 'C5', label: 'C5 - Mengevaluasi' },
  { value: 'C6', label: 'C6 - Mencipta' },
] as const

// ── v3: Media Types for Material ──
export const MEDIA_TYPES = [
  { value: 'teks', label: 'Teks' },
  { value: 'gambar', label: 'Gambar' },
  { value: 'teks_gambar', label: 'Gabungan Teks + Gambar' },
  { value: 'powerpoint', label: 'PowerPoint (Embed Viewer)' },
  { value: 'video', label: 'Video (YouTube Embed)' },
] as const

// ── v3: Task types for video analysis & image analysis ──
export const MEDIA_TASK_TYPES = [
  { value: 'analisis_gambar', label: 'Analisis Gambar' },
  { value: 'refleksi_video', label: 'Refleksi / Rangkuman Video' },
] as const
