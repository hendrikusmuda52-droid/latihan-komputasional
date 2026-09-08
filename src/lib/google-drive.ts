import { google } from 'googleapis'

// ─────────────────────────────────────────────────────────────────────────────
// Google Drive Service — Upload tugas siswa ke Google Drive
//
// Struktur folder:
//   Root Folder (FOLDER_ID env)
//     📁 Nama Siswa/
//       📁 Nama Tugas/
//         📄 namasiswa_kelas_namatugas.jpg
//         📄 namasiswa_kelas_namatugas_2.jpg
//
// Credentials dari environment variable GOOGLE_DRIVE_CREDENTIALS (JSON string)
// Folder ID dari environment variable GOOGLE_DRIVE_FOLDER_ID
// ─────────────────────────────────────────────────────────────────────────────

let _driveClient: ReturnType<typeof google.drive> | null = null

function getDriveClient() {
  if (_driveClient) return _driveClient

  const credentialsStr = process.env.GOOGLE_DRIVE_CREDENTIALS
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

  if (!credentialsStr || !folderId) {
    throw new Error('Google Drive credentials atau folder ID belum diset di environment variable')
  }

  const credentials = JSON.parse(credentialsStr)

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive'],
  })

  _driveClient = google.drive({ version: 'v3', auth })
  return _driveClient
}

// ── Helper: Cari folder by name di parent folder ──
async function findFolder(name: string, parentId: string): Promise<string | null> {
  const drive = getDriveClient()
  try {
    const res = await drive.files.list({
      q: `name = '${name.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and '${parentId}' in parents and trashed = false`,
      fields: 'files(id, name)',
      pageSize: 1,
    })
    return res.data.files && res.data.files.length > 0 ? res.data.files[0].id! : null
  } catch (err) {
    console.error('[google-drive] findFolder error:', err)
    return null
  }
}

// ── Helper: Buat folder baru ──
async function createFolder(name: string, parentId: string): Promise<string | null> {
  const drive = getDriveClient()
  try {
    const res = await drive.files.create({
      requestBody: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      },
      fields: 'id',
    })
    return res.data.id || null
  } catch (err) {
    console.error('[google-drive] createFolder error:', err)
    return null
  }
}

// ── Helper: Cari atau buat folder (idempotent) ──
async function findOrCreateFolder(name: string, parentId: string): Promise<string | null> {
  const existing = await findFolder(name, parentId)
  if (existing) return existing
  return createFolder(name, parentId)
}

// ── Sanitize nama untuk folder/file ──
function sanitizeName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s\-_]/g, '') // hapus karakter spesial
    .replace(/\s+/g, '_') // spasi jadi underscore
    .slice(0, 50) // max 50 char
}

// ── Main: Upload foto ke Google Drive ──
// Struktur: Root → Nama Siswa → Nama Tugas → file
export async function uploadTaskPhoto(params: {
  studentName: string
  kelas: string
  taskTitle: string
  fileName: string       // nama file asli dari upload
  fileBuffer: Buffer
  mimeType: string
  fileIndex: number       // 1, 2, 3... untuk multiple photos
}): Promise<{ success: boolean; fileId?: string; fileUrl?: string; error?: string }> {
  try {
    const drive = getDriveClient()
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID!

    const { studentName, kelas, taskTitle, fileName, fileBuffer, mimeType, fileIndex } = params

    // 1. Sanitize names
    const safeStudentName = sanitizeName(studentName)
    const safeTaskTitle = sanitizeName(taskTitle)

    // 2. Cari/buat folder siswa di root
    const studentFolderId = await findOrCreateFolder(safeStudentName, rootFolderId)
    if (!studentFolderId) {
      return { success: false, error: 'Gagal membuat folder siswa' }
    }

    // 3. Cari/buat folder tugas di dalam folder siswa
    const taskFolderId = await findOrCreateFolder(safeTaskTitle, studentFolderId)
    if (!taskFolderId) {
      return { success: false, error: 'Gagal membuat folder tugas' }
    }

    // 4. Generate nama file: namasiswa_kelas_namatugas.jpg
    const ext = fileName.split('.').pop() || 'jpg'
    const baseFileName = `${safeStudentName}_${kelas}_${safeTaskTitle}`
    const finalFileName = fileIndex > 1
      ? `${baseFileName}_${fileIndex}.${ext}`
      : `${baseFileName}.${ext}`

    // 5. Upload file ke folder tugas
    const res = await drive.files.create({
      requestBody: {
        name: finalFileName,
        parents: [taskFolderId],
      },
      media: {
        mimeType,
        body: fileBuffer,
      },
      fields: 'id, webViewLink, webContentLink',
    })

    // 6. Set permission agar bisa diakses (viewer)
    await drive.permissions.create({
      fileId: res.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })

    return {
      success: true,
      fileId: res.data.id || undefined,
      fileUrl: res.data.webViewLink || res.data.webContentLink || undefined,
    }
  } catch (error) {
    console.error('[google-drive] uploadTaskPhoto error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal upload ke Google Drive',
    }
  }
}

// ── List foto di folder tugas siswa ──
export async function listTaskPhotos(params: {
  studentName: string
  taskTitle: string
}): Promise<{ success: boolean; photos?: Array<{ id: string; name: string; url: string }>; error?: string }> {
  try {
    const drive = getDriveClient()
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID!

    const { studentName, taskTitle } = params
    const safeStudentName = sanitizeName(studentName)
    const safeTaskTitle = sanitizeName(taskTitle)

    // 1. Cari folder siswa
    const studentFolderId = await findFolder(safeStudentName, rootFolderId)
    if (!studentFolderId) {
      return { success: true, photos: [] }
    }

    // 2. Cari folder tugas
    const taskFolderId = await findFolder(safeTaskTitle, studentFolderId)
    if (!taskFolderId) {
      return { success: true, photos: [] }
    }

    // 3. List files di folder tugas
    const res = await drive.files.list({
      q: `'${taskFolderId}' in parents and trashed = false and mimeType contains 'image/'`,
      fields: 'files(id, name, webViewLink, thumbnailLink)',
      orderBy: 'name',
    })

    const photos = (res.data.files || []).map(f => ({
      id: f.id!,
      name: f.name!,
      url: f.thumbnailLink || f.webViewLink || `https://drive.google.com/uc?id=${f.id}`,
    }))

    return { success: true, photos }
  } catch (error) {
    console.error('[google-drive] listTaskPhotos error:', error)
    return { success: false, error: 'Gagal mengambil daftar foto' }
  }
}
