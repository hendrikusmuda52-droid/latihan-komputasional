// Konstanta Multi-Subject & Multi-Teacher Isolation untuk SAKOLA

// 13 Mapel Utama SMP
export const SMP_SUBJECTS = [
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
export const SMK_SUBJECTS = [
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

// Cek apakah subject punya fitur mengetik
export function hasTypingFeature(subject: string): boolean {
  return IT_SUBJECTS.includes(subject)
}

// Jenis tugas yang tersedia berdasarkan subject
export function getTaskTypesForSubject(subject: string): Array<{ value: string; label: string }> {
  if (IT_SUBJECTS.includes(subject)) {
    return [
      { value: 'typing_quiz', label: 'Mengetik + Soal HOTS' },
      { value: 'quiz_only', label: 'Soal HOTS Saja' },
      { value: 'typing_only', label: 'Mengetik Saja' },
      { value: 'game', label: 'Game Interaktif (Benar/Salah)' },
      { value: 'drawing', label: 'Tugas Menggambar / Peta Konsep' },
    ]
  }
  // Non-IT: hanya soal dan menggambar
  return [
    { value: 'quiz_only', label: 'Soal HOTS Saja' },
    { value: 'drawing', label: 'Tugas Menggambar / Peta Konsep' },
  ]
}
