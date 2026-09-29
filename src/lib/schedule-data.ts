// Data jadwal pelajaran SAKOLA — statis untuk 1 semester
// Format: schedule[hari][jam][kelas] = [kodeMapel, kodeGuru]
// subjects: kamus kode → nama lengkap

export const SUBJECTS: Record<string, string> = {
  AGM: 'Agama', KR: 'Kerohanian', BIN: 'Bahasa Indonesia', PJOK: 'Olahraga',
  PLH: 'Pendidikan Lingkungan Hidup', IPA: 'Ilmu Pengetahuan Alam', BING: 'Inggris',
  KET: 'Keterampilan', INFO: 'Informatika', KOD: 'Koding', PKN: 'Pendidikan Kewarganegaraan',
  IPS: 'Ilmu Pengetahuan Sosial', MTK: 'Matematika', KAI: '7 Kebiasaan Anak Indonesia',
  SB: 'Seni Budaya', MAN: 'Mandarin', TIK: 'TIK',
  UPACARA: 'Upacara', ISTIRAHAT: 'Istirahat', LITERASI: 'Literasi', SENAM: 'Senam',
}

// Slot non-akademik yang TIDAK bisa diisi jurnal
export const NON_ACADEMIC_SLOTS = ['UPACARA', 'ISTIRAHAT', 'LITERASI', 'SENAM']

export const TEACHERS: Record<string, { name: string; subjects: string[] }> = {
  HM: { name: 'HM', subjects: ['INFO', 'KOD', 'TIK'] },
  MR: { name: 'MR', subjects: ['BING', 'KET'] },
  MS: { name: 'MS', subjects: ['IPA'] },
  AA: { name: 'AA', subjects: ['BIN', 'PLH'] },
  SY: { name: 'SY', subjects: ['MAN'] },
  VN: { name: 'VN', subjects: ['KAI', 'PJOK'] },
  TIK: { name: 'TIK', subjects: ['TIK'] },
  RA: { name: 'RA', subjects: ['PKN', 'IPS', 'KET'] },
  MC: { name: 'MC', subjects: ['PLH', 'KET', 'KR'] },
  BP: { name: 'BP', subjects: ['MTK'] },
  GV: { name: 'GV', subjects: ['SB', 'KET'] },
  HN: { name: 'HN', subjects: ['AGM', 'BING', 'KAI', 'KR'] },
  VIK: { name: 'VIK', subjects: ['KOD'] },
}

type ScheduleSlot = Record<string, [string, string]> // kelas → [mapel, guru]
type DaySchedule = Record<string, ScheduleSlot>      // jam → ScheduleSlot

export const SCHEDULE: Record<string, DaySchedule> = {
  Senin: {
    '07.00-07.40': { '7A': ['UPACARA','-'], '7B': ['UPACARA','-'], '7C': ['UPACARA','-'], '8A': ['UPACARA','-'], '8B': ['UPACARA','-'], '8C': ['UPACARA','-'], '9A': ['UPACARA','-'], '9B': ['UPACARA','-'] },
    '07.40-08.20': { '7A': ['BING','MR'], '7B': ['IPA','MS'], '7C': ['BIN','AA'], '8A': ['MTK','BP'], '8B': ['TIK','HM'], '8C': ['PJOK','VN'], '9A': ['SB','GV'], '9B': ['BIN','AA'] },
    '08.20-09.00': { '7A': ['BING','MR'], '7B': ['IPA','MS'], '7C': ['BIN','AA'], '8A': ['MTK','BP'], '8B': ['TIK','HM'], '8C': ['PJOK','VN'], '9A': ['SB','GV'], '9B': ['BIN','AA'] },
    '09.00-09.40': { '7A': ['MTK','BP'], '7B': ['MAN','SY'], '7C': ['KAI','VN'], '8A': ['IPA','MS'], '8B': ['PKN','RA'], '8C': ['SB','GV'], '9A': ['BIN','AA'], '9B': ['IPS','RA'] },
    '09.40-10.00': { 'ALL': ['ISTIRAHAT','-'] },
    '10.00-10.40': { '7A': ['MTK','BP'], '7B': ['MAN','SY'], '7C': ['PLH','AA'], '8A': ['MAN','SY'], '8B': ['PKN','RA'], '8C': ['SB','GV'], '9A': ['TIK','HM'], '9B': ['IPS','RA'] },
    '10.40-11.20': { '7A': ['PKN','RA'], '7B': ['BIN','AA'], '7C': ['PLH','AA'], '8A': ['KET','GV'], '8B': ['MTK','BP'], '8C': ['IPS','RA'], '9A': ['TIK','HM'], '9B': ['BING','MR'] },
    '11.20-12.00': { '7A': ['PKN','RA'], '7B': ['BIN','AA'], '7C': ['BING','MR'], '8A': ['AGM','HN'], '8B': ['MTK','BP'], '8C': ['IPS','RA'], '9A': ['MAN','SY'], '9B': ['KR','HN'] },
    '12.00-12.20': { 'ALL': ['ISTIRAHAT','-'] },
    '12.20-13.00': { '7A': ['BIN','AA'], '7B': ['KOD','VIK'], '7C': ['TIK','HM'], '8A': ['AGM','HN'], '8B': ['IPA','MS'], '8C': ['PLH','MC'], '9A': ['MAN','SY'], '9B': ['KR','HN'] },
    '13.00-13.40': { '7A': ['SB','GV'], '7B': ['KOD','VIK'], '7C': ['TIK','HM'], '8A': ['PKN','RA'], '8B': ['IPA','MS'], '8C': ['PLH','MC'], '9A': ['MTK','BP'], '9B': ['KAI','VN'] },
    '13.40-14.20': { '7A': ['SB','GV'], '7B': ['BING','MR'], '7C': ['MTK','BP'], '8A': ['PKN','RA'], '8B': ['BIN','AA'], '8C': ['BING','MR'], '9A': ['MTK','BP'], '9B': ['KAI','VN'] },
  },
  Selasa: {
    '07.00-07.40': { '7A': ['BING','MR'], '7B': ['IPA','MS'], '7C': ['PJOK','VN'], '8A': ['MTK','BP'], '8B': ['IPS','RA'], '8C': ['KOD','HM'], '9A': ['BIN','AA'], '9B': ['PJOK','VN'] },
    '07.40-08.20': { '7A': ['BING','MR'], '7B': ['IPA','MS'], '7C': ['PJOK','VN'], '8A': ['MTK','BP'], '8B': ['IPS','RA'], '8C': ['KOD','HM'], '9A': ['BIN','AA'], '9B': ['PJOK','VN'] },
    '08.20-09.00': { '7A': ['TIK','HM'], '7B': ['MTK','BP'], '7C': ['IPS','RA'], '8A': ['BIN','AA'], '8B': ['AGM','HN'], '8C': ['IPA','MS'], '9A': ['PKN','RA'], '9B': ['MAN','SY'] },
    '09.00-09.40': { '7A': ['TIK','HM'], '7B': ['MTK','BP'], '7C': ['IPS','RA'], '8A': ['BIN','AA'], '8B': ['AGM','HN'], '8C': ['IPA','MS'], '9A': ['PKN','RA'], '9B': ['MAN','SY'] },
    '09.40-10.00': { 'ALL': ['ISTIRAHAT','-'] },
    '10.00-10.40': { '7A': ['PLH','AA'], '7B': ['KR','MC'], '7C': ['BIN','AA'], '8A': ['KR','HN'], '8B': ['KOD','HM'], '8C': ['PKN','RA'], '9A': ['BING','MR'], '9B': ['IPA','MS'] },
    '10.40-11.20': { '7A': ['PLH','AA'], '7B': ['KR','MC'], '7C': ['BIN','AA'], '8A': ['KR','HN'], '8B': ['KOD','HM'], '8C': ['PKN','RA'], '9A': ['BING','MR'], '9B': ['IPA','MS'] },
    '11.20-12.00': { '7A': ['BING','MR'], '7B': ['KAI','VN'], '7C': ['BIN','AA'], '8A': ['KOD','HM'], '8B': ['IPA','MS'], '8C': ['BIN','AA'], '9A': ['IPS','RA'], '9B': ['SB','GV'] },
    '12.00-12.20': { 'ALL': ['ISTIRAHAT','-'] },
    '12.20-13.00': { '7A': ['BIN','AA'], '7B': ['BING','MR'], '7C': ['MTK','BP'], '8A': ['KOD','HM'], '8B': ['IPS','RA'], '8C': ['AGM','HN'], '9A': ['AGM','HN'], '9B': ['SB','GV'] },
    '13.00-13.40': { '7A': ['BIN','AA'], '7B': ['BING','MR'], '7C': ['MTK','BP'], '8A': ['KET','MC'], '8B': ['IPS','RA'], '8C': ['AGM','HN'], '9A': ['AGM','HN'], '9B': ['BIN','AA'] },
  },
  Rabu: {
    '07.00-07.40': { '7A': ['MTK','BP'], '7B': ['AGM','HN'], '7C': ['IPA','MS'], '8A': ['IPS','RA'], '8B': ['PJOK','VN'], '8C': ['BING','MR'], '9A': ['BIN','AA'], '9B': ['TIK','HM'] },
    '07.40-08.20': { '7A': ['MTK','BP'], '7B': ['AGM','HN'], '7C': ['IPA','MS'], '8A': ['IPS','RA'], '8B': ['PJOK','VN'], '8C': ['BING','MR'], '9A': ['BIN','AA'], '9B': ['TIK','HM'] },
    '08.20-09.00': { '7A': ['MAN','SY'], '7B': ['IPS','RA'], '7C': ['KR','MC'], '8A': ['IPA','MS'], '8B': ['MTK','BP'], '8C': ['TIK','HM'], '9A': ['PJOK','VN'], '9B': ['BIN','AA'] },
    '09.00-09.40': { '7A': ['MAN','SY'], '7B': ['IPS','RA'], '7C': ['KR','MC'], '8A': ['IPA','MS'], '8B': ['MTK','BP'], '8C': ['TIK','HM'], '9A': ['PJOK','VN'], '9B': ['BIN','AA'] },
    '09.40-10.00': { 'ALL': ['ISTIRAHAT','-'] },
    '10.00-10.40': { '7A': ['KAI','VN'], '7B': ['BIN','AA'], '7C': ['BING','MR'], '8A': ['TIK','HM'], '8B': ['BIN','AA'], '8C': ['MTK','BP'], '9A': ['PLH','MC'], '9B': ['PKN','RA'] },
    '10.40-11.20': { '7A': ['IPA','MS'], '7B': ['BIN','AA'], '7C': ['MAN','SY'], '8A': ['TIK','HM'], '8B': ['BIN','AA'], '8C': ['MTK','BP'], '9A': ['PLH','MC'], '9B': ['PKN','RA'] },
    '11.20-12.00': { '7A': ['IPA','MS'], '7B': ['BIN','AA'], '7C': ['MAN','SY'], '8A': ['BIN','AA'], '8B': ['PLH','MC'], '8C': ['KAI','VN'], '9A': ['BING','MR'], '9B': ['IPS','RA'] },
    '12.00-12.20': { 'ALL': ['ISTIRAHAT','-'] },
    '12.20-13.00': { '7A': ['BIN','AA'], '7B': ['TIK','HM'], '7C': ['PKN','RA'], '8A': ['BING','MR'], '8B': ['KR','MC'], '8C': ['KR','HN'], '9A': ['IPA','MS'], '9B': ['MTK','BP'] },
    '13.00-13.40': { '7A': ['BIN','AA'], '7B': ['TIK','HM'], '7C': ['PKN','RA'], '8A': ['BING','MR'], '8B': ['KR','MC'], '8C': ['KR','HN'], '9A': ['IPA','MS'], '9B': ['MTK','BP'] },
  },
  Kamis: {
    '07.00-07.40': { 'ALL': ['LITERASI','-'] },
    '07.40-08.20': { '7A': ['PJOK','VN'], '7B': ['MTK','BP'], '7C': ['IPA','MS'], '8A': ['SB','GV'], '8B': ['BING','MR'], '8C': ['BIN','AA'], '9A': ['IPS','RA'], '9B': ['AGM','HN'] },
    '08.20-09.00': { '7A': ['PJOK','VN'], '7B': ['MTK','BP'], '7C': ['IPA','MS'], '8A': ['SB','GV'], '8B': ['BING','MR'], '8C': ['BIN','AA'], '9A': ['IPS','RA'], '9B': ['AGM','HN'] },
    '09.00-09.40': { '7A': ['IPA','MS'], '7B': ['PKN','RA'], '7C': ['KOD','VIK'], '8A': ['BING','MR'], '8B': ['KR','HN'], '8C': ['KET','GV'], '9A': ['KAI','VN'], '9B': ['MTK','BP'] },
    '09.40-10.00': { 'ALL': ['ISTIRAHAT','-'] },
    '10.00-10.40': { '7A': ['IPA','MS'], '7B': ['PKN','RA'], '7C': ['KOD','VIK'], '8A': ['MAN','SY'], '8B': ['KR','HN'], '8C': ['BING','MR'], '9A': ['KAI','VN'], '9B': ['MTK','BP'] },
    '10.40-11.20': { '7A': ['IPS','RA'], '7B': ['PLH','AA'], '7C': ['AGM','HN'], '8A': ['MAN','SY'], '8B': ['SB','GV'], '8C': ['MTK','BP'], '9A': ['IPA','MS'], '9B': ['KET','MR'] },
    '11.20-12.00': { '7A': ['KET','RA'], '7B': ['PLH','AA'], '7C': ['AGM','HN'], '8A': ['KAI','VN'], '8B': ['SB','GV'], '8C': ['MTK','BP'], '9A': ['IPA','MS'], '9B': ['KET','MR'] },
    '12.00-12.20': { 'ALL': ['ISTIRAHAT','-'] },
    '12.20-13.00': { '7A': ['KOD','VIK'], '7B': ['IPS','RA'], '7C': ['SB','GV'], '8A': ['BIN','AA'], '8B': ['BING','MR'], '8C': ['MAN','SY'], '9A': ['AGM','HN'], '9B': ['IPA','MS'] },
    '13.00-13.40': { '7A': ['KOD','VIK'], '7B': ['KET','RA'], '7C': ['SB','GV'], '8A': ['BIN','AA'], '8B': ['BING','MR'], '8C': ['MAN','SY'], '9A': ['AGM','HN'], '9B': ['IPA','MS'] },
  },
  Jumat: {
    '07.00-07.40': { 'ALL': ['SENAM','-'] },
    '07.40-08.20': { '7A': ['IPS','RA'], '7B': ['SB','GV'], '7C': ['MTK','BP'], '8A': ['PJOK','VN'], '8B': ['MAN','SY'], '8C': ['BIN','AA'], '9A': ['KET','MR'], '9B': ['PLH','MC'] },
    '08.20-09.00': { '7A': ['IPS','RA'], '7B': ['SB','GV'], '7C': ['MTK','BP'], '8A': ['PJOK','VN'], '8B': ['MAN','SY'], '8C': ['BIN','AA'], '9A': ['KET','MR'], '9B': ['PLH','MC'] },
    '09.00-09.20': { 'ALL': ['ISTIRAHAT','-'] },
    '09.20-10.00': { '7A': ['AGM','HN'], '7B': ['PJOK','VN'], '7C': ['IPS','RA'], '8A': ['PLH','MC'], '8B': ['BIN','AA'], '8C': ['IPA','MS'], '9A': ['MTK','BP'], '9B': ['BING','MR'] },
    '10.00-10.40': { '7A': ['AGM','HN'], '7B': ['PJOK','VN'], '7C': ['KET','RA'], '8A': ['PLH','MC'], '8B': ['BIN','AA'], '8C': ['IPA','MS'], '9A': ['MTK','BP'], '9B': ['BING','MR'] },
  },
}

// Helper: dapatkan hari ini dalam bahasa Indonesia
export function getTodayName(): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  return days[new Date().getDay()] || 'Senin'
}

// Helper: cek apakah jam sedang berlangsung (real-time)
export function isCurrentTimeSlot(timeRange: string): boolean {
  const now = new Date()
  const tzOffset = now.getTimezoneOffset() * 60000
  const localStr = new Date(now.getTime() - tzOffset).toISOString()
  const currentHour = parseInt(localStr.substring(11, 13))
  const currentMin = parseInt(localStr.substring(14, 16))
  const currentTotal = currentHour * 60 + currentMin

  const [start, end] = timeRange.split('-')
  const [sh, sm] = start.split('.').map(Number)
  const [eh, em] = end.split('.').map(Number)
  const startTotal = sh * 60 + sm
  const endTotal = eh * 60 + em

  return currentTotal >= startTotal && currentTotal < endTotal
}

// Helper: filter jadwal untuk guru tertentu pada hari tertentu
// Return: array of { time, kelas, mapelCode, guruCode, mapelName, isNonAcademic }
export function getTeacherSchedule(teacherCode: string, day: string) {
  const daySchedule = SCHEDULE[day]
  if (!daySchedule) return []

  const result: Array<{
    time: string
    kelas: string
    mapelCode: string
    guruCode: string
    mapelName: string
    isNonAcademic: boolean
  }> = []

  for (const [time, slots] of Object.entries(daySchedule)) {
    // Cek apakah guru ini mengajar di slot ini (di kelas manapun)
    for (const [kelas, [mapelCode, guruCode]] of Object.entries(slots)) {
      if (guruCode === teacherCode) {
        const isNonAcademic = NON_ACADEMIC_SLOTS.includes(mapelCode)
        result.push({
          time,
          kelas: kelas === 'ALL' ? 'Semua' : kelas,
          mapelCode,
          guruCode,
          mapelName: SUBJECTS[mapelCode] || mapelCode,
          isNonAcademic,
        })
      }
    }
  }

  return result
}

// Helper: filter jadwal untuk kelas tertentu pada hari tertentu
export function getClassSchedule(kelas: string, day: string) {
  const daySchedule = SCHEDULE[day]
  if (!daySchedule) return []

  const result: Array<{
    time: string
    kelas: string
    mapelCode: string
    guruCode: string
    mapelName: string
    isNonAcademic: boolean
    isCurrent: boolean
  }> = []

  for (const [time, slots] of Object.entries(daySchedule)) {
    // Cek slot untuk kelas ini (atau ALL)
    const slot = slots[kelas] || slots['ALL']
    if (slot) {
      const [mapelCode, guruCode] = slot
      const isNonAcademic = NON_ACADEMIC_SLOTS.includes(mapelCode)
      result.push({
        time,
        kelas,
        mapelCode,
        guruCode,
        mapelName: SUBJECTS[mapelCode] || mapelCode,
        isNonAcademic,
        isCurrent: isCurrentTimeSlot(time),
      })
    }
  }

  return result
}

// Helper: dapatkan semua slot mengajar untuk semua guru pada hari tertentu (untuk admin rekap)
export function getAllTeacherSlots(day: string) {
  const daySchedule = SCHEDULE[day]
  if (!daySchedule) return []

  const result: Array<{
    time: string
    kelas: string
    mapelCode: string
    guruCode: string
    mapelName: string
    isNonAcademic: boolean
  }> = []

  const seen = new Set<string>()
  for (const [time, slots] of Object.entries(daySchedule)) {
    for (const [kelas, [mapelCode, guruCode]] of Object.entries(slots)) {
      if (kelas === 'ALL') continue
      const key = `${time}-${kelas}-${guruCode}`
      if (seen.has(key)) continue
      seen.add(key)
      const isNonAcademic = NON_ACADEMIC_SLOTS.includes(mapelCode)
      result.push({
        time,
        kelas,
        mapelCode,
        guruCode,
        mapelName: SUBJECTS[mapelCode] || mapelCode,
        isNonAcademic,
      })
    }
  }

  return result
}
