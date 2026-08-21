-- SAKOLA Initial Migration (Baseline)
-- Tanggal: 2026-08-10
-- Deskripsi: Baseline migration yang merepresentasikan struktur database SAKOLA saat ini.
-- Migration ini dibuat dari schema.prisma yang sudah ada (sebelumnya di-sync via prisma db push).
--
-- PENTING: Jika database sudah memiliki tabel ini (karena sebelumnya menggunakan prisma db push),
-- jalankan: npx prisma migrate resolve --applied 0_init
-- Ini menandai migration sebagai sudah diterapkan tanpa menjalankan SQL-nya lagi.

-- CreateTable: Student
CREATE TABLE IF NOT EXISTS "Student" (
    "id" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "kelas" TEXT NOT NULL,
    "jenjang" TEXT NOT NULL DEFAULT 'SMP',
    "sekolah" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Teacher
CREATE TABLE IF NOT EXISTS "Teacher" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'teacher',
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "kelasDiampu" TEXT NOT NULL DEFAULT '7,8,9',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Question
CREATE TABLE IF NOT EXISTS "Question" (
    "id" TEXT NOT NULL,
    "gradeLevel" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "question" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "correctAnswer" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable: TypingText
CREATE TABLE IF NOT EXISTS "TypingText" (
    "id" TEXT NOT NULL,
    "gradeLevel" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isStructured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TypingText_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Assignment
CREATE TABLE IF NOT EXISTS "Assignment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "targetKelas" TEXT NOT NULL DEFAULT 'ALL',
    "targetJenjang" TEXT NOT NULL DEFAULT 'ALL',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "dueDate" TIMESTAMP(3),
    "exerciseType" TEXT NOT NULL DEFAULT 'wajib',
    "questionCount" INTEGER NOT NULL DEFAULT 0,
    "taskType" TEXT NOT NULL DEFAULT 'typing_quiz',
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Material
CREATE TABLE IF NOT EXISTS "Material" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "targetKelas" TEXT NOT NULL DEFAULT 'ALL',
    "targetJenjang" TEXT NOT NULL DEFAULT 'ALL',
    "category" TEXT NOT NULL DEFAULT 'Umum',
    "tpId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable: LearningObjective
CREATE TABLE IF NOT EXISTS "LearningObjective" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "gradeLevel" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "tp" TEXT NOT NULL,
    "bobotTugas" DOUBLE PRECISION NOT NULL DEFAULT 40,
    "bobotUH" DOUBLE PRECISION NOT NULL DEFAULT 60,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningObjective_pkey" PRIMARY KEY ("id")
);

-- CreateTable: SubjectConfig
CREATE TABLE IF NOT EXISTS "SubjectConfig" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "kkm" DOUBLE PRECISION NOT NULL DEFAULT 75,
    "bobotNH" DOUBLE PRECISION NOT NULL DEFAULT 40,
    "bobotUTS" DOUBLE PRECISION NOT NULL DEFAULT 30,
    "bobotUAS" DOUBLE PRECISION NOT NULL DEFAULT 30,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubjectConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ManualGrade
CREATE TABLE IF NOT EXISTS "ManualGrade" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "gradeType" TEXT NOT NULL DEFAULT 'tugas',
    "babId" TEXT,
    "isReleased" BOOLEAN NOT NULL DEFAULT false,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManualGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Progress
CREATE TABLE IF NOT EXISTS "Progress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "currentStage" TEXT NOT NULL DEFAULT 'typing',
    "typedText" TEXT NOT NULL DEFAULT '',
    "charCount" INTEGER NOT NULL DEFAULT 0,
    "correctChars" INTEGER NOT NULL DEFAULT 0,
    "typingStartTime" TEXT NOT NULL DEFAULT '',
    "typingDuration" INTEGER NOT NULL DEFAULT 0,
    "quizAnswers" TEXT NOT NULL DEFAULT '{}',
    "quizStartTime" TEXT NOT NULL DEFAULT '',
    "quizDuration" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "lastSavedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Result
CREATE TABLE IF NOT EXISTS "Result" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "typedText" TEXT NOT NULL,
    "charCount" INTEGER NOT NULL,
    "correctChars" INTEGER NOT NULL,
    "typingSpeedWPM" DOUBLE PRECISION NOT NULL,
    "typingAccuracy" DOUBLE PRECISION NOT NULL,
    "typingDuration" INTEGER NOT NULL,
    "typingScore" DOUBLE PRECISION NOT NULL,
    "quizAnswers" TEXT NOT NULL,
    "quizCorrect" INTEGER NOT NULL,
    "quizTotal" INTEGER NOT NULL,
    "quizScore" DOUBLE PRECISION NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Informatika',
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isReleased" BOOLEAN NOT NULL DEFAULT false,
    "releasedAt" TIMESTAMP(3),

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS "Student_nisn_key" ON "Student"("nisn");
CREATE UNIQUE INDEX IF NOT EXISTS "Teacher_username_key" ON "Teacher"("username");
CREATE UNIQUE INDEX IF NOT EXISTS "SubjectConfig_subject_key" ON "SubjectConfig"("subject");

-- CreateIndex: Performance indexes
CREATE INDEX IF NOT EXISTS "ManualGrade_studentId_idx" ON "ManualGrade"("studentId");
CREATE INDEX IF NOT EXISTS "Progress_studentId_idx" ON "Progress"("studentId");

-- AddForeignKey: ManualGrade → Student
ALTER TABLE "ManualGrade" ADD CONSTRAINT "ManualGrade_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: Progress → Student
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: Result → Student
ALTER TABLE "Result" ADD CONSTRAINT "Result_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
