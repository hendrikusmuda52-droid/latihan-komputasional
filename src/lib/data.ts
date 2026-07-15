// Data teks untuk latihan mengetik & soal HOTS berpikir komputasional
// Materi dibedakan per tingkat kelas:
//  - Kelas 8: pengenalan konsep dasar berpikir komputasional di kehidupan sehari-hari
//  - Kelas 9: isu hangat teknologi (AI, IoT, mobil otonom) & penerapan berpikir komputasional

export type GradeLevel = '8A' | '8B' | '8C' | '9A' | '9B'

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number // index 0-3
  explanation: string
  category: string // dekomposisi, pola, abstraksi, algoritma, dll
}

// =====================================================
// TEKS MENGETIK — satu teks unik per rombel kelas
// =====================================================

export const TYPING_TEXTS: Record<GradeLevel, string> = {
  // ---- Kelas 8A: Berpikir Komputasional di Kehidupan Sehari-hari ----
  '8A': `Pernahkah kalian memperhatikan bagaimana cara ibu kita memasak nasi di pagi hari? Pertama, ia mengukur beras dengan gelas takaran. Kedua, ia mencuci beras sampai bersih. Ketiga, ia memasukkan beras ke dalam rice cooker dan menambahkan air sesuai takaran. Keempat, ia menekan tombol cook dan menunggu sampai matang. Tahapan-tahapan ini sebenarnya adalah contoh sederhana dari sebuah konsep yang sangat penting di dunia teknologi, yaitu berpikir komputasional. Berpikir komputasional bukan berarti kita harus menjadi programmer atau menghafal bahasa pemrograman yang rumit. Berpikir komputasional adalah cara kita memecahkan masalah secara sistematis, logis, dan terstruktur, layaknya cara kerja sebuah komputer. Ada empat pilar utama dalam berpikir komputasional yang perlu kalian pahami sebagai siswa SMP. Pilar pertama adalah dekomposisi, yaitu kemampuan memecah masalah besar yang rumit menjadi bagian-bagian kecil yang lebih mudah diselesaikan. Sebagai contoh, ketika kalian mendapat tugas membuat poster untuk hari kemerdekaan, kalian tidak langsung menggambar sekaligus. Kalian memecahnya menjadi: menentukan tema, mencari referensi, membuat sketsa, mewarnai, dan menambahkan tulisan. Pilar kedua adalah pengenalan pola, yaitu kemampuan menemukan kesamaan atau pola yang berulang. Ketika kalian belajar matematika dan menemukan pola bilangan dua, empat, enam, delapan, kalian bisa menebak angka berikutnya adalah sepuluh. Itulah pengenalan pola. Pilar ketiga adalah abstraksi, yaitu fokus pada hal-hal penting saja dan mengabaikan detail yang tidak relevan. Saat kalian membuat jadwal pelajaran, kalian hanya menulis nama mapel, jam, dan guru. Kalian tidak perlu menggambar wajah guru atau warna bajunya. Itulah abstraksi. Pilar keempat adalah algoritma, yaitu langkah-langkah berurutan yang jelas untuk menyelesaikan suatu masalah. Resep masakan, cara membuat origami, atau cara login ke akun sekolah semuanya adalah algoritma. Dengan berpikir komputasional, kalian belajar memecahkan masalah dengan lebih tertib dan efisien. Inilah keterampilan penting di abad ke-21, bukan hanya untuk programmer, tetapi untuk semua orang.`,

  // ---- Kelas 8B: Mengenal Algoritma dan Pola di Sekitar Kita ----
  '8B': `Setiap pagi sebelum berangkat sekolah, kalian pasti memiliki urutan kegiatan yang sama: bangun tidur, mandi, sarapan, pakai seragam, ambil tas, lalu berangkat. Urutan ini tidak boleh diacak, kan? Kalian tidak bisa pakai seragam sebelum mandi, atau berangkat sebelum ambil tas. Urutan langkah yang harus diikuti secara berurutan inilah yang disebut dengan algoritma. Algoritma adalah salah satu pilar penting dalam berpikir komputasional. Berpikir komputasional sendiri adalah cara berpikir untuk memecahkan masalah secara sistematis seperti cara kerja komputer. Ada empat pilar berpikir komputasional yang perlu kalian kuasai. Pilar pertama, dekomposisi, adalah memecah masalah besar menjadi bagian-bagian kecil. Misalnya, saat kalian ingin mengadakan pesta ulang tahun, kalian memecahnya menjadi: tentukan tema, buat daftar tamu, siapkan makanan, dan susun acara. Setiap bagian menjadi lebih mudah dikerjakan. Pilar kedua, pengenalan pola, adalah mencari kesamaan yang berulang. Di sekolah, kalian mungkin memperhatikan bahwa nilai matematika cenderung lebih baik ketika kalian belajar malam sebelumnya. Itu adalah pola yang bisa kalian manfaatkan untuk meningkatkan prestasi. Pilar ketiga, abstraksi, adalah memilih informasi penting dan mengabaikan yang tidak penting. Peta sekolah yang hanya menampilkan ruang kelas, lapangan, dan toilet adalah contoh abstraksi. Tidak semua detail digambar, hanya yang penting untuk navigasi. Pilar keempat, algoritma, adalah urutan langkah yang jelas dan terbatas. Cara kalian mengirim pesan di WhatsApp adalah algoritma: buka aplikasi, pilih kontak, ketik pesan, lalu tekan kirim. Empat pilar ini bekerja sama dalam setiap teknologi yang kalian gunakan setiap hari. Aplikasi transportasi online, game favorit kalian, hingga smartwatch yang menghitung langkah kaki, semuanya dibangun dengan berpikir komputasional. Jadi, mulai sekarang, biasakan berpikir seperti komputer: pecah masalah jadi bagian kecil, cari polanya, fokus pada yang penting, dan susun langkah yang jelas. Dengan begitu, kalian bukan hanya pengguna teknologi, tetapi juga pemikir kreatif yang siap menghadapi masa depan.`,

  // ---- Kelas 8C: Bermain dengan Logika: Dunia Digital di Mata Pelajar SMP ----
  '8C': `Bayangkan kalian sedang bermain game puzzle favorit. Untuk menyelesaikan setiap level, kalian harus memikirkan langkah mana yang harus diambil terlebih dahulu, mengenali pola musuh yang muncul, dan fokus pada tujuan utama tanpa terganggu detail kecil. Tanpa kalian sadari, kalian sebenarnya sudah menerapkan berpikir komputasional. Berpikir komputasional adalah keterampilan memecahkan masalah dengan cara yang sistematis, logis, dan terstruktur, mirip dengan cara kerja komputer. Keterampilan ini sangat penting bagi kalian sebagai generasi muda di era digital. Ada empat pilar utama dalam berpikir komputasional. Pilar pertama adalah dekomposisi, yaitu memecah masalah besar menjadi tugas-tugas kecil yang lebih mudah dikerjakan. Misalnya, ketika guru memberi tugas membuat presentasi kelompok, kalian bisa memecahnya menjadi: mencari informasi, membuat slide, menyusun naskah, dan latihan presentasi. Setiap anggota kelompok bisa fokus pada satu tugas. Pilar kedua adalah pengenalan pola, yaitu menemukan kesamaan yang berulang di berbagai situasi. Ketika kalian belajar bahasa Inggris dan melihat pola bahwa kata yang berakhiran -ly biasanya merupakan keterangan, kalian bisa lebih cepat memahami kalimat baru. Itulah kekuatan pengenalan pola. Pilar ketiga adalah abstraksi, yaitu fokus pada informasi yang penting dan mengabaikan yang tidak relevan. Saat kalian menonton video pembelajaran, kalian tidak perlu mengingat warna baju presenter atau latar belakangnya. Yang penting adalah isi materi yang disampaikan. Pilar keempat adalah algoritma, yaitu urutan langkah yang jelas untuk menyelesaikan masalah. Cara kalian membuat akun media sosial adalah algoritma: unduh aplikasi, isi data, buat username dan password, lalu verifikasi. Empat pilar ini bukan teori yang sulit. Kalian sudah menggunakannya setiap hari, mungkin tanpa sadar. Yang perlu kalian lakukan sekarang adalah melatihnya dengan lebih sengaja. Ketika menghadapi soal matematika yang sulit, gunakan dekomposisi. Ketika belajar dari kesalahan, gunakan pengenalan pola. Ketika harus fokus belajar, gunakan abstraksi. Ketika menyelesaikan tugas, susunlah algoritma. Berpikir komputasional akan membuat kalian lebih cerdas dalam memecahkan masalah, lebih kreatif dalam berkarya, dan lebih siap menghadapi tantangan dunia digital di masa depan.`,

  // ---- Kelas 9A: Berpikir Komputasional di Era AI dan Teknologi Canggih ----
  '9A': `Pernahkah kalian berpikir bagaimana sebuah robot otonom bisa mengantar paket sampai ke depan rumah tanpa menabrak orang yang lewat? Atau bagaimana aplikasi pesan makanan tahu restoran mana yang paling dekat dengan rumah kita? Di balik semua kemudahan teknologi yang kita nikmati hari ini, ada satu kemampuan fundamental yang bekerja diam-diam, yaitu berpikir komputasional. Berpikir komputasional bukan berarti kita harus menjadi programmer atau menghafal kode pemrograman. Berpikir komputasional adalah cara kita memecahkan masalah yang kompleks dengan pendekatan yang sistematis, logis, dan efisien, layaknya cara kerja sebuah komputer. Ada empat pilar utama dalam berpikir komputasional yang perlu kalian pahami. Pilar pertama adalah dekomposisi, yaitu keterampilan memecah masalah besar yang rumit menjadi bagian-bagian kecil yang lebih mudah diselesaikan. Sebagai contoh, ketika kita ingin membuat sebuah aplikasi portal berita, kita tidak langsung membuat semuanya sekaligus. Kita pecah menjadi beberapa modul: halaman utama, halaman kategori berita, halaman detail berita, sistem login pengguna, dan panel admin. Pilar kedua adalah pengenalan pola, yaitu kemampuan menemukan kesamaan atau pola yang berulang di antara masalah-masalah yang berbeda. Dengan mengenali pola, kita bisa menggunakan solusi yang sudah pernah berhasil untuk masalah baru yang serupa. Misalnya, algoritma rekomendasi pada aplikasi streaming video mengenali pola tontonan kita, lalu merekomendasikan film lain yang kemungkinan besar akan kita sukai. Pilar ketiga adalah abstraksi, yaitu fokus pada hal-hal penting saja dan mengabaikan detail-detail yang tidak relevan. Peta transportasi kota adalah contoh abstraksi yang baik. Peta hanya menunjukkan jalur kereta dan stasiun, tanpa menggambar setiap rumah atau pohon di sepanjang jalan. Pilar keempat adalah algoritma, yaitu langkah-langkah berurutan yang jelas dan terbatas untuk menyelesaikan sebuah masalah. Resep masakan adalah algoritma sederhana: ada urutan langkah yang harus diikuti agar masakan berhasil. Hari ini, isu hangat di bidang teknologi seperti kecerdasan buatan atau AI, internet of things, dan komputasi awan semuanya bergantung pada berpikir komputasional. Model AI yang dapat menulis esai, membuat gambar, bahkan menjawab pertanyaan, dilatih menggunakan algoritma yang sangat rumit. Namun pada dasarnya, algoritma tersebut dibangun dari keempat pilar berpikir komputasional tersebut. Bahkan, ketika sebuah mobil otonom melaju di jalan raya, ia terus-menerus melakukan dekomposisi situasi lalu lintas, mengenali pola perilaku kendaraan lain, melakukan abstraksi terhadap rintangan yang penting, dan mengeksekusi algoritma pengambilan keputusan dalam hitungan milidetik. Inilah mengapa berpikir komputasional menjadi salah satu keterampilan paling penting di abad ke-21. Kalian sebagai generasi muda Indonesia perlu membekali diri dengan kemampuan ini. Bukan agar semua menjadi programmer, melainkan agar kita mampu memecahkan masalah di kehidupan sehari-hari secara terstruktur. Ketika kalian dihadapkan pada tugas kelompok yang rumit, gunakan dekomposisi. Ketika kalian belajar dari pengalaman, gunakan pengenalan pola. Ketika kalian harus fokus pada hal penting, gunakan abstraksi. Dan ketika kalian harus menyelesaikan sesuatu secara sistematis, susunlah algoritma. Dengan berpikir komputasional, kalian tidak hanya menjadi pengguna teknologi, tetapi juga pencipta solusi untuk masa depan yang lebih baik.`,

  // ---- Kelas 9B: Teknologi Masa Depan dan Peran Berpikir Komputasional ----
  '9B': `Dunia sedang berubah dengan kecepatan yang belum pernah terjadi sebelumnya. Mobil yang dapat menyetir sendiri sudah menjalankan rute di kota-kota besar. Asisten AI dapat menulis esai, membuat gambar, bahkan menulis kode program dalam hitungan detik. Rumah-rumah pintar kini dapat mengontrol lampu, suhu, dan keamanan hanya dengan perintah suara. Di balik semua revolusi teknologi ini, ada satu kemampuan yang menjadi fondasi utama, yaitu berpikir komputasional. Berpikir komputasional bukan sekadar kemampuan membuat program komputer. Lebih dari itu, berpikir komputasional adalah cara kita memecahkan masalah secara sistematis, logis, dan efisien. Ada empat pilar utama yang membentuk berpikir komputasional. Pilar pertama adalah dekomposisi, yaitu keterampilan memecah masalah besar yang kompleks menjadi sub-masalah yang lebih kecil dan mudah dikelola. Bayangkan sebuah tim yang ingin membangun aplikasi transportasi online seperti Gojek atau Grab. Mereka tidak membuat semuanya sekaligus, tetapi memecahnya menjadi modul pendaftaran pengguna, peta lokasi, pencocokan pengguna dengan pengemudi, sistem pembayaran, dan sistem rating. Setiap modul dikerjakan secara terpisah namun saling terhubung. Pilar kedua adalah pengenalan pola, yaitu kemampuan menemukan kesamaan atau pola berulang dalam data atau situasi yang berbeda. Sistem rekomendasi di TikTok atau YouTube adalah contoh nyata. Sistem ini menganalisis pola video yang kita tonton, durasi tontonan, dan pola interaksi kita, lalu merekomendasikan konten serupa yang kemungkinan besar akan kita sukai. Semakin lama kita menggunakan, semakin akurat rekomendasinya karena sistem terus belajar dari pola baru. Pilar ketiga adalah abstraksi, yaitu fokus pada aspek penting dari suatu masalah sambil mengabaikan detail yang tidak relevan. Saat kita menggunakan aplikasi pesan, kita tidak perlu memahami bagaimana data dikirimkan melalui jaringan internet atau bagaimana server memproses pesan kita. Kita hanya perlu tahu cara mengetik dan mengirim. Inilah kekuatan abstraksi, menyembunyikan kompleksitas agar pengguna mudah menggunakan teknologi. Pilar keempat adalah algoritma, yaitu urutan langkah yang jelas, terbatas, dan terurut untuk menyelesaikan masalah. Algoritma pencarian Google, algoritma pemberitaan Facebook, algoritma rute Google Maps, semua adalah hasil dari pemikiran komputasional yang matang. Bahkan algoritma yang mengatur lampu lalu lintas di persimpangan besar pun menggunakan prinsip yang sama. Kehadiran AI generatif seperti ChatGPT, Gemini, dan Claude memperlihatkan betapa kuatnya berpikir komputasional ketika digabungkan dengan data yang sangat besar dan komputasi yang sangat cepat. Model AI ini dilatih dengan menganalisis pola dari miliaran teks, gambar, dan suara. Mereka belajar mengenali pola bahasa manusia, lalu menghasilkan teks baru yang masuk akal. Namun perlu diingat, AI tidak menggantikan berpikir komputasional pada manusia. Justru sebaliknya, AI adalah produk dari berpikir komputasional. Manusialah yang merancang arsitektur AI, menentukan tujuan pelatihannya, dan menggunakan hasilnya untuk memecahkan masalah nyata. Inilah mengapa berpikir komputasional menjadi keterampilan paling krusial bagi generasi kalian. Kalian akan hidup di dunia yang dipenuhi AI, robot, dan sistem otomatis. Yang akan membedakan kalian bukan kemampuan menghafal informasi, karena AI bisa melakukannya lebih cepat. Yang akan membedakan adalah kemampuan kalian memecahkan masalah secara sistematis, berpikir kritis, dan berkarya secara kreatif. Ketika kalian menghadapi tantangan di sekolah, di rumah, atau di masyarakat, gunakan dekomposisi untuk memecah masalah. Gunakan pengenalan pola untuk belajar dari pengalaman. Gunakan abstraksi untuk fokus pada inti masalah. Dan gunakan algoritma untuk mengeksekusi solusi secara terstruktur. Dengan berbekal berpikir komputasional, kalian bukan sekadar konsumen teknologi, tetapi menjadi penjelajah, pencipta, dan pemimpin di era digital ini.`,
}

// =====================================================
// SOAL HOTS — per tingkat kelas (8 = dasar, 9 = advanced)
// =====================================================

export const QUESTIONS_BY_GRADE: Record<'8' | '9', Question[]> = {
  // ===== KELAS 8: 30 soal dasar berpikir komputasional =====
  '8': [
    {
      id: 1,
      question:
        'Ketika ibu memasak nasi, urutan langkahnya adalah: cuci beras, masukkan air, tekan tombol cook. Urutan langkah ini merupakan contoh penerapan...',
      options: ['Dekomposisi', 'Pengenalan pola', 'Abstraksi', 'Algoritma'],
      correctAnswer: 3,
      explanation:
        'Algoritma adalah urutan langkah yang jelas dan berurutan untuk menyelesaikan suatu tugas. Cara memasak nasi adalah contoh algoritma sehari-hari.',
      category: 'Algoritma',
    },
    {
      id: 2,
      question:
        'Seorang siswa mendapat tugas membuat poster hari kemerdekaan. Ia memecah tugas menjadi: tentukan tema, cari referensi, buat sketsa, warnai, tambah tulisan. Pendekatan ini disebut...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 0,
      explanation:
        'Dekomposisi adalah memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah dikerjakan. Membagi tugas membuat poster menjadi langkah-langkah kecil adalah contoh dekomposisi.',
      category: 'Dekomposisi',
    },
    {
      id: 3,
      question:
        'Pada jadwal pelajaran, hanya ditampilkan nama mapel, jam, dan nama guru. Tidak ada gambar wajah guru atau warna bajunya. Hal ini menunjukkan konsep...',
      options: [
        'Dekomposisi',
        'Abstraksi',
        'Algoritma',
        'Pengenalan pola',
      ],
      correctAnswer: 1,
      explanation:
        'Abstraksi berarti fokus pada informasi penting dan mengabaikan detail yang tidak relevan. Jadwal pelajaran hanya menampilkan info penting untuk keperluan belajar.',
      category: 'Abstraksi',
    },
    {
      id: 4,
      question:
        'Seorang siswa melihat deretan bilangan: 2, 4, 6, 8, ... Ia menyimpulkan angka berikutnya adalah 10. Keterampilan berpikir komputasional yang digunakan adalah...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 1,
      explanation:
        'Siswa mengenali pola bilangan genap yang bertambah 2 setiap langkah, lalu memprediksi angka berikutnya. Ini adalah penerapan pengenalan pola.',
      category: 'Pengenalan Pola',
    },
    {
      id: 5,
      question:
        'Berikut adalah langkah membuat origami burung: (1) lipat kertas menjadi segitiga, (2) lipat lagi menjadi lebih kecil, (3) bentuk sayap, (4) bentuk ekor. Langkah-langkah ini merupakan contoh...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 3,
      explanation:
        'Langkah membuat origami adalah algoritma karena berupa urutan instruksi yang jelas, terurut, dan terbatas untuk mencapai hasil tertentu.',
      category: 'Algoritma',
    },
    {
      id: 6,
      question:
        'Ketika menggunakan aplikasi WhatsApp, urutannya adalah: buka aplikasi, pilih kontak, ketik pesan, tekan kirim. Konsep berpikir komputasional yang diilustrasikan adalah...',
      options: [
        'Algoritma',
        'Abstraksi',
        'Dekomposisi',
        'Pengenalan pola',
      ],
      correctAnswer: 0,
      explanation:
        'Urutan langkah yang harus diikuti untuk mengirim pesan adalah algoritma. Jika urutan diubah, pesan tidak akan terkirim.',
      category: 'Algoritma',
    },
    {
      id: 7,
      question:
        'Saat membuat peta sekolah, kalian hanya menggambar ruang kelas, lapangan, toilet, dan kantin. Tidak menggambar setiap pohon atau detail kecil lain. Hal ini menunjukkan...',
      options: [
        'Abstraksi',
        'Algoritma',
        'Dekomposisi',
        'Pengenalan pola',
      ],
      correctAnswer: 0,
      explanation:
        'Peta sekolah fokus pada informasi penting untuk navigasi dan mengabaikan detail yang tidak relevan. Ini adalah penerapan abstraksi.',
      category: 'Abstraksi',
    },
    {
      id: 8,
      question:
        'Seorang siswa mengadakan pesta ulang tahun. Ia memecah tugas menjadi: tentukan tema, buat daftar tamu, siapkan makanan, susun acara. Pendekatan ini disebut...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 0,
      explanation:
        'Memecah perencanaan pesta menjadi beberapa sub-tugas yang lebih kecil adalah dekomposisi, sehingga setiap bagian lebih mudah dikelola.',
      category: 'Dekomposisi',
    },
    {
      id: 9,
      question:
        'Siswa memperhatikan bahwa nilai ulangannya lebih baik ketika ia belajar malam sebelumnya. Ia menyimpulkan pola "belajar malam = nilai bagus". Keterampilan yang digunakan adalah...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 1,
      explanation:
        'Siswa mengenali pola hubungan antara kebiasaan belajar malam dan nilai ulangan. Ini adalah penerapan pengenalan pola.',
      category: 'Pengenalan Pola',
    },
    {
      id: 10,
      question:
        'Manakah yang BUKAN merupakan ciri algoritma yang baik?',
      options: [
        'Langkahnya jelas dan tidak ambigu',
        'Jumlah langkahnya terbatas',
        'Hasilnya bisa berbeda untuk input yang sama',
        'Memiliki urutan awal dan akhir',
      ],
      correctAnswer: 2,
      explanation:
        'Algoritma yang baik harus deterministik: untuk input yang sama, hasilnya harus selalu sama. Hasil berbeda untuk input sama menandakan algoritma tidak valid.',
      category: 'Algoritma',
    },
    {
      id: 11,
      question:
        'Saat belajar bahasa Inggris, siswa memperhatikan bahwa kata berakhiran -ly biasanya adalah keterangan (adverb). Ia menggunakan pola ini untuk memahami kalimat baru. Keterampilan yang digunakan adalah...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 1,
      explanation:
        'Siswa mengenali pola akhiran -ly sebagai penanda adverb, lalu menggunakan pola tersebut untuk memahami kata baru. Ini adalah pengenalan pola.',
      category: 'Pengenalan Pola',
    },
    {
      id: 12,
      question:
        'Membuat akun media sosial dengan urutan: unduh aplikasi, isi data, buat username dan password, verifikasi. Konsep berpikir komputasional yang tergambar adalah...',
      options: [
        'Algoritma',
        'Abstraksi',
        'Dekomposisi',
        'Pengenalan pola',
      ],
      correctAnswer: 0,
      explanation:
        'Urutan langkah jelas untuk membuat akun adalah algoritma. Tiap langkah harus berurutan agar akun berhasil dibuat.',
      category: 'Algoritma',
    },
    {
      id: 13,
      question:
        'Ketika menonton video pembelajaran, siswa hanya mencatat isi materi dan tidak mengingat warna baju presenter. Hal ini menunjukkan penerapan...',
      options: [
        'Abstraksi',
        'Algoritma',
        'Dekomposisi',
        'Pengenalan pola',
      ],
      correctAnswer: 0,
      explanation:
        'Siswa fokus pada informasi penting (isi materi) dan mengabaikan detail yang tidak relevan (warna baju presenter). Ini adalah abstraksi.',
      category: 'Abstraksi',
    },
    {
      id: 14,
      question:
        'Untuk membuat presentasi kelompok, siswa membagi tugas: Ali cari informasi, Budi buat slide, Cici susun naskah, Doni latihan presentasi. Pendekatan ini disebut...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 0,
      explanation:
        'Memecah tugas presentasi menjadi sub-tugas yang dikerjakan tiap anggota adalah dekomposisi yang membuat pekerjaan kelompok lebih efisien.',
      category: 'Dekomposisi',
    },
    {
      id: 15,
      question:
        'Seorang siswa menyusun jadwal belajar harian: jam 16.00 mengerjakan PR, jam 18.00 belajar materi baru, jam 19.30 makan, jam 20.00 ulang baca. Susunan ini merupakan contoh...',
      options: [
        'Algoritma',
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
      ],
      correctAnswer: 0,
      explanation:
        'Jadwal belajar dengan urutan waktu yang jelas adalah algoritma. Setiap aktivitas memiliki urutan dan waktu tertentu untuk mencapai tujuan belajar.',
      category: 'Algoritma',
    },
    {
      id: 16,
      question:
        'Aplikasi transportasi online seperti Gojek dapat mencari pengemudi terdekat. Di balik layar, aplikasi menggunakan urutan langkah sistematis untuk menemukan pengemudi. Konsep yang digunakan adalah...',
      options: [
        'Algoritma pencarian',
        'Abstraksi warna motor',
        'Dekomposisi penumpang',
        'Pengenalan pola baju',
      ],
      correctAnswer: 0,
      explanation:
        'Aplikasi menggunakan algoritma pencarian untuk menemukan pengemudi terdekat berdasarkan lokasi GPS pengguna dan pengemudi.',
      category: 'Algoritma',
    },
    {
      id: 17,
      question:
        'Saat bermain game puzzle, pemain harus memikirkan langkah mana yang diambil lebih dulu dan mengenali pola musuh yang muncul. Keterampilan berpikir komputasional yang TIDAK terlibat dalam aktivitas ini adalah...',
      options: [
        'Pengenalan pola musuh',
        'Algoritma langkah',
        'Abstraksi fokus tujuan',
        'Dekomposisi warna layar',
      ],
      correctAnswer: 3,
      explanation:
        'Warna layar bukan informasi penting dalam menyelesaikan puzzle. Dekomposisi warna layar tidak relevan dan bukan penerapan berpikir komputasional.',
      category: 'Konsep Dasar',
    },
    {
      id: 18,
      question:
        'Pada peta Indonesia, hanya digambar pulau-pulau besar, batas provinsi, dan nama kota besar. Tidak digambar setiap rumah atau jalan kecil. Hal ini menunjukkan...',
      options: [
        'Abstraksi',
        'Algoritma',
        'Dekomposisi',
        'Pengenalan pola',
      ],
      correctAnswer: 0,
      explanation:
        'Peta hanya menampilkan informasi penting untuk navigasi geografis dan mengabaikan detail kecil. Ini adalah penerapan abstraksi.',
      category: 'Abstraksi',
    },
    {
      id: 19,
      question:
        'Seorang siswa ingin membersihkan kamarnya yang berantakan. Ia mulai dengan memilah mainan, lalu buku, lalu pakaian, terakhir sampah. Pendekatan ini menunjukkan...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 0,
      explanation:
        'Memilah pekerjaan membersihkan kamar berdasarkan kategori (mainan, buku, pakaian, sampah) adalah dekomposisi yang membuat tugas lebih terstruktur.',
      category: 'Dekomposisi',
    },
    {
      id: 20,
      question:
        'Saat berbelanja di minimarket, kasir memindai barang satu per satu, lalu sistem menjumlahkan harga, dan menampilkan total bayar. Proses ini menggunakan...',
      options: [
        'Algoritma perhitungan',
        'Abstraksi warna kemasan',
        'Dekomposisi kasir',
        'Pengenalan pola pelanggan',
      ],
      correctAnswer: 0,
      explanation:
        'Sistem kasir menggunakan algoritma: pindai barang, jumlahkan harga, tampilkan total. Urutan langkah ini jelas dan menghasilkan output yang akurat.',
      category: 'Algoritma',
    },
    {
      id: 21,
      question:
        'Seorang siswa memperhatikan bahwa teman-temannya yang rajin membaca memiliki kosakata yang lebih banyak. Ia menyimpulkan "rajin membaca = kosakata banyak". Kesimpulan ini merupakan hasil dari...',
      options: [
        'Pengenalan pola',
        'Dekomposisi',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 0,
      explanation:
        'Siswa mengenali pola hubungan antara kebiasaan membaca dan jumlah kosakata yang dikuasai. Ini adalah penerapan pengenalan pola.',
      category: 'Pengenalan Pola',
    },
    {
      id: 22,
      question:
        'Resep membuat telur dadar: kocok telur, panaskan minyak, tuang telur, tunggu matang, angkat. Resep ini adalah contoh algoritma karena...',
      options: [
        'Langkahnya harus urut, jelas, dan terbatas untuk menghasilkan telur dadar',
        'Resep bisa diubah-ubah urutannya',
        'Resep tidak perlu diikuti',
        'Resep hanya untuk chef profesional',
      ],
      correctAnswer: 0,
      explanation:
        'Algoritma harus memiliki urutan langkah yang jelas, terbatas, dan harus diikuti agar menghasilkan output yang diinginkan. Resep memenuhi kriteria ini.',
      category: 'Algoritma',
    },
    {
      id: 23,
      question:
        'Saat membuat denah rumah, arsitek hanya menggambar dinding, pintu, dan jendela, tanpa menggambar kabel atau pipa di dalam dinding. Konsep berpikir komputasional yang digunakan adalah...',
      options: [
        'Abstraksi',
        'Algoritma',
        'Dekomposisi',
        'Pengenalan pola',
      ],
      correctAnswer: 0,
      explanation:
        'Denah rumah fokus pada tata letak penting dan mengabaikan detail yang tidak relevan untuk tahap perencanaan. Ini adalah abstraksi.',
      category: 'Abstraksi',
    },
    {
      id: 24,
      question:
        'Seorang siswa diminta menjelaskan cara membuat sandwich kepada adiknya. Penjelasan yang sesuai prinsip algoritma adalah...',
      options: [
        'Buat sandwich sesuka hatimu',
        'Ambil dua lembar roti, olesi selai kacang pada satu lembar, olesi selai stroberi pada lembar lain, tutup keduanya, potong jadi dua segitiga',
        'Sandwich itu enak dan mudah dibuat',
        'Beli sandwich di toko terdekat',
      ],
      correctAnswer: 1,
      explanation:
        'Algoritma harus jelas, terurut, dan tidak ambigu. Penjelasan langkah-langkah membuat sandwich yang spesifik memenuhi kriteria algoritma yang baik.',
      category: 'Algoritma',
    },
    {
      id: 25,
      question:
        'Aplikasi game mobile legend memiliki urutan: buka aplikasi, login, pilih mode, pilih hero, mulai bertanding. Konsep berpikir komputasional yang terlihat adalah...',
      options: [
        'Algoritma',
        'Abstraksi',
        'Dekomposisi',
        'Pengenalan pola',
      ],
      correctAnswer: 0,
      explanation:
        'Urutan langkah untuk memulai permainan adalah algoritma. Setiap langkah harus berurutan agar game bisa dimulai dengan benar.',
      category: 'Algoritma',
    },
    {
      id: 26,
      question:
        'Manakah dari berikut yang merupakan contoh dekomposisi dalam kehidupan sehari-hari?',
      options: [
        'Mengenali bahwa hujan selalu diikuti pelangi',
        'Membagi tugas membersihkan rumah: sapu lantai, cuci piring, lipat baju',
        'Membuat peta yang hanya menampilkan jalan utama',
        'Mengikuti resep masakan langkah demi langkah',
      ],
      correctAnswer: 1,
      explanation:
        'Memecah tugas membersihkan rumah menjadi tiga sub-tugas spesifik adalah dekomposisi, karena masalah besar dipecah menjadi bagian yang lebih kecil.',
      category: 'Dekomposisi',
    },
    {
      id: 27,
      question:
        'Aplikasi musik seperti Spotify menampilkan playlist "Lagu Populer" berdasarkan lagu yang sering diputar pengguna lain. Hal ini menggunakan konsep...',
      options: [
        'Pengenalan pola pendengaran pengguna',
        'Dekomposisi lagu',
        'Abstraksi lirik',
        'Algoritma penghapusan data',
      ],
      correctAnswer: 0,
      explanation:
        'Spotify menganalisis pola pendengaran jutaan pengguna untuk merekomendasikan lagu populer. Ini adalah penerapan pengenalan pola pada skala besar.',
      category: 'Pengenalan Pola',
    },
    {
      id: 28,
      question:
        'Mengapa berpikir komputasional penting dipelajari sejak SMP, meskipun tidak semua siswa akan menjadi programmer?',
      options: [
        'Karena berpikir komputasional hanya berguna untuk membuat aplikasi',
        'Karena berpikir komputasional melatih cara memecahkan masalah secara sistematis yang berguna di semua bidang kehidupan',
        'Karena semua pekerjaan masa depan wajib menggunakan komputer',
        'Karena berpikir komputasional hanya untuk pelajaran informatika',
      ],
      correctAnswer: 1,
      explanation:
        'Berpikir komputasional bukan hanya soal coding, tetapi tentang cara berpikir sistematis untuk memecahkan masalah. Keterampilan ini berguna di semua bidang: belajar, pekerjaan, hingga kehidupan sehari-hari.',
      category: 'Konsep Dasar',
    },
    {
      id: 29,
      question:
        'Seorang siswa ingin menyelesaikan PR matematika yang banyak. Strategi terbaik dengan prinsip dekomposisi adalah...',
      options: [
        'Mengerjakan semuanya dalam satu malam tanpa istirahat',
        'Memilah PR berdasarkan topik, mengerjakan yang mudah dulu, lalu yang sulit',
        'Menunda sampai terakhir menit',
        'Meminta teman mengerjakan',
      ],
      correctAnswer: 1,
      explanation:
        'Dekomposisi mengajak kita memecah masalah besar menjadi bagian kecil. Memilah PR berdasarkan topik dan mengerjakan bertahap membuat tugas lebih ringan dan teratur.',
      category: 'Dekomposisi',
    },
    {
      id: 30,
      question:
        'Manakah pernyataan yang PALING TEPAT tentang hubungan berpikir komputasional dengan teknologi yang kita gunakan sehari-hari?',
      options: [
        'Berpikir komputasional hanya digunakan oleh ilmuwan komputer',
        'Semua aplikasi dan teknologi modern dibangun dengan prinsip berpikir komputasional, dan kita pun bisa menerapkannya dalam kehidupan',
        'Berpikir komputasional tidak berkaitan dengan teknologi',
        'Berpikir komputasional hanya untuk siswa SMA',
      ],
      correctAnswer: 1,
      explanation:
        'Setiap teknologi yang kita gunakan (aplikasi, game, smartwatch) dibangun dengan empat pilar berpikir komputasional. Kita pun bisa menerapkannya untuk menyelesaikan masalah sehari-hari.',
      category: 'Konsep Dasar',
    },
  ],

  // ===== KELAS 9: 30 soal advanced (AI, IoT, smart systems) =====
  '9': [
    {
      id: 1,
      question:
        'Seorang siswa ingin membuat aplikasi absensi digital untuk sekolahnya. Langkah pertama yang sebaiknya ia lakukan sesuai prinsip berpikir komputasional adalah...',
      options: [
        'Langsung menulis kode program tanpa perencanaan',
        'Memecah masalah menjadi fitur-fitur kecil seperti login, input absensi, dan rekapitulasi',
        'Membeli komputer dengan spesifikasi paling tinggi',
        'Menanyakan ke teman apakah aplikasi ini bagus atau tidak',
      ],
      correctAnswer: 1,
      explanation:
        'Dekomposisi adalah pilar pertama yang mengharuskan kita memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan sebelum mulai membangun sistem.',
      category: 'Dekomposisi',
    },
    {
      id: 2,
      question:
        'Pada aplikasi streaming musik, sistem sering menampilkan playlist "Mungkin Kamu Suka". Kemampuan berpikir komputasional yang paling tepat digunakan sistem adalah...',
      options: ['Abstraksi', 'Algoritma', 'Pengenalan pola', 'Dekomposisi'],
      correctAnswer: 2,
      explanation:
        'Sistem merekomendasikan musik berdasarkan kesamaan pola lagu yang sering kita dengar dengan pola pendengaran pengguna lain yang serupa. Inilah penerapan pengenalan pola.',
      category: 'Pengenalan Pola',
    },
    {
      id: 3,
      question:
        'Peta jaringan kereta bawah tanah di kota besar hanya menampilkan garis warna-warni dan nama stasiun, tanpa menggambar detail bangunan, sungai, atau jalan kecil di permukaan. Konsep berpikir komputasional yang diilustrasikan adalah...',
      options: ['Dekomposisi', 'Abstraksi', 'Algoritma', 'Pengenalan pola'],
      correctAnswer: 1,
      explanation:
        'Abstraksi berarti fokus pada informasi penting (jalur dan stasiun) dan mengabaikan detail yang tidak relevan untuk tujuan navigasi kereta.',
      category: 'Abstraksi',
    },
    {
      id: 4,
      question:
        'Berikut adalah langkah membuat mie instan: (1) rebus air, (2) masukkan mie, (3) tunggu 3 menit, (4) campur bumbu, (5) sajikan. Urutan langkah ini merupakan contoh penerapan...',
      options: ['Dekomposisi', 'Pengenalan pola', 'Abstraksi', 'Algoritma'],
      correctAnswer: 3,
      explanation:
        'Algoritma adalah urutan langkah yang jelas, terbatas, dan berurutan untuk menyelesaikan masalah. Resep memasak adalah contoh algoritma sehari-hari.',
      category: 'Algoritma',
    },
    {
      id: 5,
      question:
        'Mobil otonom (self-driving car) menggunakan kamera dan sensor untuk mendeteksi kendaraan lain, pejalan kaki, dan rambu lalu lintas. Saat mobil harus memutuskan mengerem atau menambah kecepatan, pilar berpikir komputasional yang paling banyak diandalkan adalah...',
      options: ['Algoritma', 'Abstraksi', 'Pengenalan pola', 'Dekomposisi'],
      correctAnswer: 0,
      explanation:
        'Keputusan mengerem atau menambah kecepatan memerlukan algoritma pengambilan keputusan yang mengeksekusi langkah-langkah berurutan berdasarkan data sensor secara real-time.',
      category: 'Algoritma',
    },
    {
      id: 6,
      question:
        'Ketika seorang programmer ingin membuat game RPG yang besar, ia mulai dengan membuat modul cerita, lalu modul karakter, modul pertarungan, dan modul inventaris. Pendekatan ini menunjukkan penerapan...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 0,
      explanation:
        'Memecah game besar menjadi modul-modul yang lebih kecil (cerita, karakter, pertarungan, inventaris) adalah contoh dekomposisi yang membuat masalah lebih mudah dikelola.',
      category: 'Dekomposisi',
    },
    {
      id: 7,
      question:
        'Seorang siswa memperhatikan bahwa setiap kali ia lupa mengerjakan PR, ia mendapat nilai rendah. Dari pengamatan ini, ia menyimpulkan pola "lupa PR = nilai rendah" dan mulai membuat jadwal belajar. Keterampilan berpikir komputasional yang digunakan adalah...',
      options: ['Dekomposisi', 'Pengenalan pola', 'Abstraksi', 'Algoritma'],
      correctAnswer: 1,
      explanation:
        'Siswa mengenali pola berulang antara "lupa PR" dan "nilai rendah", lalu menggunakan pola tersebut untuk memprediksi dan memperbaiki perilakunya. Ini adalah pengenalan pola.',
      category: 'Pengenalan Pola',
    },
    {
      id: 8,
      question:
        'Pada peta digital seperti Google Maps, kita bisa mencari rute tercepat ke sekolah. Peta tidak menampilkan setiap rumah atau pohon, hanya jalan utama dan lokasi penting. Hal ini menunjukkan konsep...',
      options: ['Abstraksi', 'Algoritma', 'Dekomposisi', 'Pengenalan pola'],
      correctAnswer: 0,
      explanation:
        'Peta digital hanya menampilkan informasi penting (jalan, lokasi) dan mengabaikan detail yang tidak relevan (rumah, pohon). Ini adalah penerapan abstraksi.',
      category: 'Abstraksi',
    },
    {
      id: 9,
      question:
        'Algoritma pengurutan angka dari terkecil ke terbesar dapat digunakan untuk mengurutkan: (1) nilai ulangan siswa, (2) tinggi badan pemain basket, (3) harga barang di toko, (4) jadwal kedatangan kereta. Pernyataan yang paling tepat adalah...',
      options: [
        'Algoritma hanya cocok untuk angka saja',
        'Algoritma yang sama dapat digunakan untuk semua situasi tersebut karena masalahnya memiliki pola yang serupa',
        'Setiap masalah memerlukan algoritma yang berbeda total',
        'Algoritma pengurutan tidak dapat diterapkan pada masalah nyata',
      ],
      correctAnswer: 1,
      explanation:
        'Pengenalan pola memungkinkan kita menggunakan algoritma yang sama untuk berbagai masalah yang memiliki struktur serupa, yaitu mengurutkan data berdasarkan suatu kriteria.',
      category: 'Pengenalan Pola',
    },
    {
      id: 10,
      question:
        'Ketika menghadapi masalah besar seperti "mengurangi sampah plastik di sekolah", berpikir komputasional menyarankan kita untuk...',
      options: [
        'Mencoba menyelesaikan semuanya dalam satu hari',
        'Memecah masalah menjadi sub-masalah: jenis sampah, sumber sampah, solusi daur ulang, dan sosialisasi',
        'Menunggu pemerintah menyelesaikannya',
        'Membuang semua sampah ke satu tempat saja',
      ],
      correctAnswer: 1,
      explanation:
        'Dekomposisi mengajak kita memecah masalah besar menjadi sub-masalah yang lebih kecil dan dapat ditangani satu per satu dengan lebih efektif.',
      category: 'Dekomposisi',
    },
    {
      id: 11,
      question:
        'Seorang siswa membuat flowchart untuk menentukan apakah suatu bilangan genap atau ganjil. Flowchart ini adalah representasi visual dari...',
      options: ['Abstraksi', 'Dekomposisi', 'Algoritma', 'Pengenalan pola'],
      correctAnswer: 2,
      explanation:
        'Flowchart adalah representasi visual dari algoritma, yang menunjukkan urutan langkah-langkah logis untuk menyelesaikan suatu masalah.',
      category: 'Algoritma',
    },
    {
      id: 12,
      question:
        'Dalam desain antarmuka aplikasi, tombol "Simpan" biasanya berwarna hijau dan tombol "Hapus" berwarna merah. Pengguna sudah terbiasa dengan pola ini. Penerapan konsep berpikir komputasional pada desain ini adalah...',
      options: ['Algoritma', 'Pengenalan pola', 'Dekomposisi', 'Abstraksi'],
      correctAnswer: 1,
      explanation:
        'Desainer menggunakan pola warna yang sudah dikenali pengguna (hijau=positif, merah=negatif) agar antarmuka lebih intuitif. Ini adalah penerapan pengenalan pola.',
      category: 'Pengenalan Pola',
    },
    {
      id: 13,
      question:
        'Saat kita menggunakan aplikasi pesan makanan, kita tidak perlu memahami bagaimana server bekerja, bagaimana pembayaran diproses, atau bagaimana kurir ditugaskan. Kita hanya perlu memilih makanan dan alamat. Hal ini menunjukkan konsep...',
      options: [
        'Abstraksi',
        'Dekomposisi',
        'Pengenalan pola',
        'Algoritma',
      ],
      correctAnswer: 0,
      explanation:
        'Aplikasi menyembunyikan kompleksitas di balik layar dan hanya menampilkan fungsi penting yang dibutuhkan pengguna. Ini adalah abstraksi yang menyembunyikan detail implementasi.',
      category: 'Abstraksi',
    },
    {
      id: 14,
      question: 'Manakah dari berikut yang BUKAN merupakan karakteristik algoritma yang baik?',
      options: [
        'Langkah-langkahnya harus jelas dan tidak ambigu',
        'Jumlah langkahnya terbatas',
        'Bisa memberikan hasil yang berbeda untuk input yang sama',
        'Memiliki titik awal dan titik akhir',
      ],
      correctAnswer: 2,
      explanation:
        'Algoritma yang baik harus deterministik, artinya untuk input yang sama, hasilnya harus selalu sama. Hasil yang berbeda untuk input yang sama menandakan algoritma tidak valid.',
      category: 'Algoritma',
    },
    {
      id: 15,
      question:
        'Seorang guru ingin membagi 30 siswa ke dalam kelompok berisi 5 orang. Langkah sistematis yang merupakan algoritma adalah...',
      options: [
        'Membagi siswa secara acak dan berharap hasilnya pas',
        'Mengurutkan siswa berdasarkan abjad nama, lalu mengelompokkan 5 siswa pertama, 5 siswa berikutnya, dan seterusnya',
        'Meminta siswa memilih kelompoknya sendiri',
        'Membagi siswa berdasarkan teman dekat saja',
      ],
      correctAnswer: 1,
      explanation:
        'Algoritma harus jelas, terurut, dan dapat diprediksi hasilnya. Mengurutkan berdasarkan abjad lalu membagi setiap 5 siswa adalah algoritma yang sistematis dan deterministik.',
      category: 'Algoritma',
    },
    {
      id: 16,
      question:
        'Internet of Things (IoT) memungkinkan perangkat seperti lampu, kulkas, dan AC terhubung ke internet dan saling bertukar data. Ketika kulkas pintar bisa memperingatkan bahwa susu akan habis, pilar berpikir komputasional yang paling dominan adalah...',
      options: [
        'Algoritma monitoring dan pengambilan keputusan otomatis',
        'Abstraksi visual antarmuka',
        'Dekomposisi susu menjadi molekul',
        'Pengenalan pola warna kemasan susu',
      ],
      correctAnswer: 0,
      explanation:
        'Kulkas pintar menggunakan algoritma untuk memantau stok dan memutuskan kapan harus memperingatkan pengguna. Ini menunjukkan penerapan algoritma pada perangkat IoT.',
      category: 'Algoritma',
    },
    {
      id: 17,
      question:
        'Aplikasi e-commerce seperti Tokopedia atau Shopee dapat menampilkan produk "Yang Mungkin Kamu Sukai" berdasarkan riwayat pencarian dan pembelian. Hal ini memanfaatkan teknologi AI yang bekerja dengan prinsip...',
      options: [
        'Dekomposisi produk',
        'Pengenalan pola perilaku pengguna',
        'Abstraksi harga produk',
        'Algoritma penghapusan data',
      ],
      correctAnswer: 1,
      explanation:
        'Sistem AI menganalisis pola perilaku pengguna (apa yang dicari, dibeli, dilihat) untuk merekomendasikan produk serupa. Ini adalah penerapan pengenalan pola pada skala besar.',
      category: 'Pengenalan Pola',
    },
    {
      id: 18,
      question:
        'Berikut adalah langkah mencuci pakaian dengan mesin cuci: (1) pisahkan pakaian putih dan berwarna, (2) masukkan pakaian ke mesin, (3) tambahkan deterjen, (4) pilih program cuci, (5) jalankan mesin, (6) jemur pakaian. Pemisahan pakaian putih dan berwarna pada langkah (1) merupakan bentuk...',
      options: [
        'Abstraksi',
        'Dekomposisi',
        'Pengenalan pola',
        'Algoritma acak',
      ],
      correctAnswer: 1,
      explanation:
        'Memisahkan pakaian berdasarkan warna adalah contoh dekomposisi, yaitu membagi kelompok besar (semua pakaian) menjadi sub-kelompok yang lebih spesifik agar penanganannya lebih tepat.',
      category: 'Dekomposisi',
    },
    {
      id: 19,
      question:
        'Dalam pembuatan aplikasi, seorang programmer sering menggunakan "fungsi" untuk tugas berulang seperti menghitung total belanja. Alih-alih menulis kode yang sama berkali-kali, ia cukup memanggil fungsi tersebut. Konsep berpikir komputasional yang paling tepat adalah...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 1,
      explanation:
        'Programmer mengenali pola perhitungan yang berulang, lalu membuat fungsi reusable untuk pola tersebut. Ini adalah penerapan pengenalan pola dalam pemrograman.',
      category: 'Pengenalan Pola',
    },
    {
      id: 20,
      question:
        'Seorang siswa diminta membuat daftar belanja untuk pesta ulang tahun. Ia membuat daftar kategori: makanan, minuman, peralatan, dan dekorasi. Pendekatan ini menunjukkan penerapan...',
      options: [
        'Dekomposisi',
        'Pengenalan pola',
        'Abstraksi',
        'Algoritma',
      ],
      correctAnswer: 0,
      explanation:
        'Memecah daftar belanja berdasarkan kategori (makanan, minuman, peralatan, dekorasi) membuat tugas lebih terorganisir dan mudah diselesaikan. Ini adalah dekomposisi.',
      category: 'Dekomposisi',
    },
    {
      id: 21,
      question:
        'Pada sistem keamanan berbasis pengenalan wajah (face recognition), ponsel dapat membuka kunci hanya dengan melihat wajah pemiliknya. Teknologi ini menggunakan pilar berpikir komputasional dalam bentuk...',
      options: [
        'Pengenalan pola wajah',
        'Dekomposisi wajah',
        'Abstraksi password',
        'Algoritma penghapusan data',
      ],
      correctAnswer: 0,
      explanation:
        'Sistem mempelajari pola fitur wajah (jarak mata, bentuk hidung, dll) untuk membedakan pemilik dengan orang lain. Ini adalah penerapan pengenalan pola pada data biometrik.',
      category: 'Pengenalan Pola',
    },
    {
      id: 22,
      question:
        'Manakah pernyataan berikut yang PALING TEPAT tentang hubungan antara kecerdasan buatan (AI) dan berpikir komputasional?',
      options: [
        'AI menggantikan kebutuhan berpikir komputasional pada manusia',
        'AI dibangun di atas dasar berpikir komputasional seperti dekomposisi, pengenalan pola, abstraksi, dan algoritma',
        'AI dan berpikir komputasional adalah dua hal yang tidak berkaitan',
        'Berpikir komputasional hanya digunakan untuk membuat AI, bukan untuk hal lain',
      ],
      correctAnswer: 1,
      explanation:
        'AI dibangun dengan menerapkan keempat pilar berpikir komputasional. Model machine learning misalnya, menggunakan algoritma untuk belajar dari pola data dan membuat abstraksi dari masalah yang kompleks.',
      category: 'Konsep Dasar',
    },
    {
      id: 23,
      question:
        'Seorang siswa diminta menjelaskan cara membuat sandwich kepada temannya yang belum pernah memasak. Penjelasan yang paling sesuai dengan prinsip algoritma adalah...',
      options: [
        'Buat sandwich sesuai perasaanmu',
        'Ambil dua lembar roti, olesi selai kacang pada satu lembar, olesi selai stroberi pada lembar lainnya, tutup keduanya, lalu potong menjadi dua segitiga',
        'Sandwich itu makanan enak',
        'Beli sandwich di toko terdekat',
      ],
      correctAnswer: 1,
      explanation:
        'Algoritma harus jelas, terurut, dan tidak ambigu. Langkah membuat sandwich yang spesifik dan berurutan memenuhi kriteria algoritma yang baik.',
      category: 'Algoritma',
    },
    {
      id: 24,
      question:
        'Ketika seorang arsitek membuat denah rumah, ia hanya menggambar dinding, pintu, dan jendela tanpa menggambar setiap baut atau kabel di dalam dinding. Konsep berpikir komputasional yang digunakan adalah...',
      options: [
        'Abstraksi',
        'Algoritma',
        'Dekomposisi',
        'Pengenalan pola',
      ],
      correctAnswer: 0,
      explanation:
        'Denah rumah fokus pada informasi penting (tata letak ruangan) dan mengabaikan detail yang tidak relevan untuk tahap perencanaan (baut, kabel). Ini adalah abstraksi.',
      category: 'Abstraksi',
    },
    {
      id: 25,
      question:
        'Aplikasi peta digital seperti Google Maps dapat menemukan rute tercepat ke suatu tujuan dengan mempertimbangkan jarak, kondisi lalu lintas, dan jalan tertutup. Di balik layar, aplikasi menggunakan...',
      options: [
        'Algoritma pencarian rute yang kompleks',
        'Abstraksi seluruh kota',
        'Dekomposisi setiap kendaraan',
        'Pengenalan pola warna mobil',
      ],
      correctAnswer: 0,
      explanation:
        'Aplikasi peta menggunakan algoritma pencarian jalur (seperti Dijkstra atau A*) yang mengevaluasi berbagai kemungkinan rute untuk menemukan yang tercepat berdasarkan data real-time.',
      category: 'Algoritma',
    },
    {
      id: 26,
      question:
        'Seorang siswa menganalisis data nilai ulangan kelasnya dan menemukan bahwa nilai matematika cenderung turun ketika siswa kurang tidur malam sebelumnya. Temuan ini merupakan hasil dari...',
      options: [
        'Pengenalan pola antara kebiasaan tidur dan prestasi belajar',
        'Dekomposisi data nilai',
        'Abstraksi matematika',
        'Algoritma penghitungan nilai',
      ],
      correctAnswer: 0,
      explanation:
        'Siswa mengenali pola hubungan antara durasi tidur dan nilai matematika. Ini adalah penerapan pengenalan pola pada analisis data sederhana.',
      category: 'Pengenalan Pola',
    },
    {
      id: 27,
      question:
        'Pada sebuah toko online, proses checkout terdiri dari: pilih barang -> masukkan keranjang -> isi alamat -> pilih pengiriman -> pilih pembayaran -> konfirmasi pesanan. Urutan ini tidak boleh diacak. Hal ini menunjukkan pentingnya...',
      options: [
        'Algoritma yang berurutan',
        'Abstraksi produk',
        'Dekomposisi pelanggan',
        'Pengenalan pola harga',
      ],
      correctAnswer: 0,
      explanation:
        'Urutan langkah checkout yang harus diikuti secara berurutan adalah algoritma. Mengubah urutan akan menyebabkan proses gagal atau error.',
      category: 'Algoritma',
    },
    {
      id: 28,
      question:
        'Saat membuat game sederhana, seorang siswa memutuskan untuk fokus pada logika permainan terlebih dahulu, dan menunda pekerjaan membuat grafik dan suara. Pendekatan ini mencerminkan pilar...',
      options: [
        'Abstraksi (fokus pada hal penting lebih dulu)',
        'Dekomposisi (membagi tugas)',
        'Pengenalan pola',
        'Algoritma rendering',
      ],
      correctAnswer: 0,
      explanation:
        'Memilih fokus pada logika inti lebih dulu dan mengabaikan detail visual untuk sementara adalah abstraksi: menangkap inti masalah sebelum mengurus detail tambahan.',
      category: 'Abstraksi',
    },
    {
      id: 29,
      question:
        'Sebuah smartwatch dapat memantau detak jantung pengguna dan memperingatkan jika detak jantung terlalu tinggi saat berolahraga. Untuk memberikan peringatan yang akurat, smartwatch menggunakan...',
      options: [
        'Algoritma yang membandingkan data detak jantung dengan ambang batas tertentu',
        'Dekomposisi jantung',
        'Abstraksi warna jam',
        'Pengenalan pola warna tali jam',
      ],
      correctAnswer: 0,
      explanation:
        'Smartwatch menggunakan algoritma sederhana: jika detak jantung > ambang batas, kirim peringatan. Ini menunjukkan algoritma pengambilan keputusan berbasis kondisi.',
      category: 'Algoritma',
    },
    {
      id: 30,
      question:
        'Mengapa berpikir komputasional dianggap sebagai keterampilan penting bagi siswa di abad ke-21, meskipun mereka tidak semua akan menjadi programmer?',
      options: [
        'Karena berpikir komputasional hanya berguna untuk membuat aplikasi',
        'Karena berpikir komputasional membekali kita dengan kemampuan memecahkan masalah secara sistematis, logis, dan efisien di berbagai bidang kehidupan',
        'Karena semua pekerjaan di masa depan akan menggunakan komputer',
        'Karena berpikir komputasional wajib untuk lulus sekolah',
      ],
      correctAnswer: 1,
      explanation:
        'Berpikir komputasional bukan hanya tentang coding, melainkan tentang cara berpikir sistematis untuk memecahkan masalah. Keterampilan ini berlaku di banyak bidang: sains, bisnis, kesehatan, hingga kehidupan sehari-hari.',
      category: 'Konsep Dasar',
    },
  ],
}

// =====================================================
// Helper functions
// =====================================================

export function getTypingText(gradeLevel: GradeLevel): string {
  return TYPING_TEXTS[gradeLevel] ?? TYPING_TEXTS['8A']
}

export function getQuestions(gradeLevel: GradeLevel): Question[] {
  // Ambil digit pertama (8 atau 9) untuk menentukan set soal
  const tier = gradeLevel.charAt(0) as '8' | '9'
  return QUESTIONS_BY_GRADE[tier] ?? QUESTIONS_BY_GRADE['8']
}

// Backward compatibility exports (legacy)
export const TYPING_TEXT = TYPING_TEXTS['9A']
export const QUESTIONS = QUESTIONS_BY_GRADE['9']

// Daftar pilihan kelas yang tersedia
export const GRADE_OPTIONS: GradeLevel[] = ['8A', '8B', '8C', '9A', '9B']
