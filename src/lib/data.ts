// Data teks untuk latihan mengetik & 30 soal HOTS berpikir komputasional
// Materi disesuaikan untuk SMP kelas 9

export const TYPING_TEXT = `Pernahkah kalian berpikir bagaimana sebuah robot otonom bisa mengantar paket sampai ke depan rumah tanpa menabrak orang yang lewat? Atau bagaimana aplikasi pesan makanan tahu restoran mana yang paling dekat dengan rumah kita? Di balik semua kemudahan teknologi yang kita nikmati hari ini, ada satu kemampuan fundamental yang bekerja diam-diam, yaitu berpikir komputasional. Berpikir komputasional bukan berarti kita harus menjadi programmer atau menghafal kode pemrograman. Berpikir komputasional adalah cara kita memecahkan masalah yang kompleks dengan pendekatan yang sistematis, logis, dan efisien, layaknya cara kerja sebuah komputer. Ada empat pilar utama dalam berpikir komputasional yang perlu kalian pahami. Pilar pertama adalah dekomposisi, yaitu keterampilan memecah masalah besar yang rumit menjadi bagian-bagian kecil yang lebih mudah diselesaikan. Sebagai contoh, ketika kita ingin membuat sebuah aplikasi portal berita, kita tidak langsung membuat semuanya sekaligus. Kita pecah menjadi beberapa modul: halaman utama, halaman kategori berita, halaman detail berita, sistem login pengguna, dan panel admin. Pilar kedua adalah pengenalan pola, yaitu kemampuan menemukan kesamaan atau pola yang berulang di antara masalah-masalah yang berbeda. Dengan mengenali pola, kita bisa menggunakan solusi yang sudah pernah berhasil untuk masalah baru yang serupa. Misalnya, algoritma rekomendasi pada aplikasi streaming video mengenali pola tontonan kita, lalu merekomendasikan film lain yang kemungkinan besar akan kita sukai. Pilar ketiga adalah abstraksi, yaitu fokus pada hal-hal penting saja dan mengabaikan detail-detail yang tidak relevan. Peta transportasi kota adalah contoh abstraksi yang baik. Peta hanya menunjukkan jalur kereta dan stasiun, tanpa menggambar setiap rumah atau pohon di sepanjang jalan. Pilar keempat adalah algoritma, yaitu langkah-langkah berurutan yang jelas dan terbatas untuk menyelesaikan sebuah masalah. Resep masakan adalah algoritma sederhana: ada urutan langkah yang harus diikuti agar masakan berhasil. Hari ini, isu hangat di bidang teknologi seperti kecerdasan buatan atau AI, internet of things, dan komputasi awan semuanya bergantung pada berpikir komputasional. Model AI yang dapat menulis esai, membuat gambar, bahkan menjawab pertanyaan, dilatih menggunakan algoritma yang sangat rumit. Namun pada dasarnya, algoritma tersebut dibangun dari keempat pilar berpikir komputasional tersebut. Bahkan, ketika sebuah mobil otonom melaju di jalan raya, ia terus-menerus melakukan dekomposisi situasi lalu lintas, mengenali pola perilaku kendaraan lain, melakukan abstraksi terhadap rintangan yang penting, dan mengeksekusi algoritma pengambilan keputusan dalam hitungan milidetik. Inilah mengapa berpikir komputasional menjadi salah satu keterampilan paling penting di abad ke-21. Kalian sebagai generasi muda Indonesia perlu membekali diri dengan kemampuan ini. Bukan agar semua menjadi programmer, melainkan agar kita mampu memecahkan masalah di kehidupan sehari-hari secara terstruktur. Ketika kalian dihadapkan pada tugas kelompok yang rumit, gunakan dekomposisi. Ketika kalian belajar dari pengalaman, gunakan pengenalan pola. Ketika kalian harus fokus pada hal penting, gunakan abstraksi. Dan ketika kalian harus menyelesaikan sesuatu secara sistematis, susunlah algoritma. Dengan berpikir komputasional, kalian tidak hanya menjadi pengguna teknologi, tetapi juga pencipta solusi untuk masa depan yang lebih baik.`

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number // index 0-3
  explanation: string
  category: string // dekomposisi, pola, abstraksi, algoritma, dll
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Seorang siswa ingin membuat aplikasi absensi digital untuk sekolahnya. Langkah pertama yang sebaiknya ia lakukan sesuai prinsip berpikir komputasional adalah...",
    options: [
      "Langsung menulis kode program tanpa perencanaan",
      "Memecah masalah menjadi fitur-fitur kecil seperti login, input absensi, dan rekapitulasi",
      "Membeli komputer dengan spesifikasi paling tinggi",
      "Menanyakan ke teman apakah aplikasi ini bagus atau tidak"
    ],
    correctAnswer: 1,
    explanation: "Dekomposisi adalah pilar pertama yang mengharuskan kita memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan sebelum mulai membangun sistem.",
    category: "Dekomposisi"
  },
  {
    id: 2,
    question: "Pada aplikasi streaming musik, sistem sering menampilkan playlist 'Mungkin Kamu Suka'. Kemampuan berpikir komputasional yang paling tepat digunakan sistem adalah...",
    options: ["Abstraksi", "Algoritma", "Pengenalan pola", "Dekomposisi"],
    correctAnswer: 2,
    explanation: "Sistem merekomendasikan musik berdasarkan kesamaan pola lagu yang sering kita dengar dengan pola pendengaran pengguna lain yang serupa. Inilah penerapan pengenalan pola.",
    category: "Pengenalan Pola"
  },
  {
    id: 3,
    question: "Peta jaringan kereta bawah tanah di kota besar hanya menampilkan garis warna-warni dan nama stasiun, tanpa menggambar detail bangunan, sungai, atau jalan kecil di permukaan. Konsep berpikir komputasional yang diilustrasikan adalah...",
    options: ["Dekomposisi", "Abstraksi", "Algoritma", "Pengenalan pola"],
    correctAnswer: 1,
    explanation: "Abstraksi berarti fokus pada informasi penting (jalur dan stasiun) dan mengabaikan detail yang tidak relevan untuk tujuan navigasi kereta.",
    category: "Abstraksi"
  },
  {
    id: 4,
    question: "Berikut adalah langkah-langkah membuat mie instan: (1) rebus air, (2) masukkan mie, (3) tunggu 3 menit, (4) campurkan bumbu, (5) sajikan. Urutan langkah ini merupakan contoh penerapan...",
    options: ["Dekomposisi", "Pengenalan pola", "Abstraksi", "Algoritma"],
    correctAnswer: 3,
    explanation: "Algoritma adalah urutan langkah yang jelas, terbatas, dan berurutan untuk menyelesaikan suatu masalah. Resep memasak adalah contoh algoritma sehari-hari.",
    category: "Algoritma"
  },
  {
    id: 5,
    question: "Mobil otonom (self-driving car) menggunakan kamera dan sensor untuk mendeteksi kendaraan lain, pejalan kaki, dan rambu lalu lintas. Saat mobil harus memutuskan mengerem atau menambah kecepatan, pilar berpikir komputasional yang paling banyak diandalkan adalah...",
    options: ["Algoritma", "Abstraksi", "Pengenalan pola", "Dekomposisi"],
    correctAnswer: 0,
    explanation: "Keputusan mengerem atau menambah kecepatan memerlukan algoritma pengambilan keputusan yang mengeksekusi langkah-langkah berurutan berdasarkan data sensor secara real-time.",
    category: "Algoritma"
  },
  {
    id: 6,
    question: "Ketika seorang programmer ingin membuat game RPG yang besar, ia mulai dengan membuat modul cerita, lalu modul karakter, modul pertarungan, dan modul inventaris. Pendekatan ini menunjukkan penerapan...",
    options: [
      "Dekomposisi",
      "Pengenalan pola",
      "Abstraksi",
      "Algoritma"
    ],
    correctAnswer: 0,
    explanation: "Memecah game besar menjadi modul-modul yang lebih kecil (cerita, karakter, pertarungan, inventaris) adalah contoh dekomposisi yang membuat masalah lebih mudah dikelola.",
    category: "Dekomposisi"
  },
  {
    id: 7,
    question: "Seorang siswa memperhatikan bahwa setiap kali ia lupa mengerjakan PR, ia mendapat nilai rendah. Dari pengamatan ini, ia menyimpulkan pola 'lupa PR = nilai rendah' dan mulai membuat jadwal belajar. Keterampilan berpikir komputasional yang digunakan siswa tersebut adalah...",
    options: ["Dekomposisi", "Pengenalan pola", "Abstraksi", "Algoritma"],
    correctAnswer: 1,
    explanation: "Siswa mengenali pola berulang antara 'lupa PR' dan 'nilai rendah', lalu menggunakan pola tersebut untuk memprediksi dan memperbaiki perilakunya. Ini adalah pengenalan pola.",
    category: "Pengenalan Pola"
  },
  {
    id: 8,
    question: "Pada peta digital seperti Google Maps, kita bisa mencari rute tercepat ke sekolah. Peta tidak menampilkan setiap rumah atau pohon, hanya jalan utama dan lokasi penting. Hal ini menunjukkan konsep...",
    options: ["Abstraksi", "Algoritma", "Dekomposisi", "Pengenalan pola"],
    correctAnswer: 0,
    explanation: "Peta digital hanya menampilkan informasi penting (jalan, lokasi) dan mengabaikan detail yang tidak relevan (rumah, pohon). Ini adalah penerapan abstraksi.",
    category: "Abstraksi"
  },
  {
    id: 9,
    question: "Algoritma pengurutan angka dari terkecil ke terbesar dapat digunakan untuk mengurutkan: (1) nilai ulangan siswa, (2) tinggi badan pemain basket, (3) harga barang di toko, (4) jadwal kedatangan kereta. Pernyataan yang paling tepat adalah...",
    options: [
      "Algoritma hanya cocok untuk angka saja",
      "Algoritma yang sama dapat digunakan untuk semua situasi tersebut karena masalahnya memiliki pola yang serupa",
      "Setiap masalah memerlukan algoritma yang berbeda total",
      "Algoritma pengurutan tidak dapat diterapkan pada masalah nyata"
    ],
    correctAnswer: 1,
    explanation: "Pengenalan pola memungkinkan kita menggunakan algoritma yang sama untuk berbagai masalah yang memiliki struktur serupa, yaitu mengurutkan data berdasarkan suatu kriteria.",
    category: "Pengenalan Pola"
  },
  {
    id: 10,
    question: "Ketika menghadapi masalah yang besar seperti 'mengurangi sampah plastik di sekolah', berpikir komputasional menyarankan kita untuk...",
    options: [
      "Mencoba menyelesaikan semuanya dalam satu hari",
      "Memecah masalah menjadi sub-masalah: jenis sampah, sumber sampah, solusi daur ulang, dan sosialisasi",
      "Menunggu pemerintah menyelesaikannya",
      "Membuang semua sampah ke satu tempat saja"
    ],
    correctAnswer: 1,
    explanation: "Dekomposisi mengajak kita memecah masalah besar menjadi sub-masalah yang lebih kecil dan dapat ditangani satu per satu dengan lebih efektif.",
    category: "Dekomposisi"
  },
  {
    id: 11,
    question: "Seorang siswa membuat flowchart untuk menentukan apakah suatu bilangan genap atau ganjil. Flowchart ini adalah representasi visual dari...",
    options: ["Abstraksi", "Dekomposisi", "Algoritma", "Pengenalan pola"],
    correctAnswer: 2,
    explanation: "Flowchart adalah representasi visual dari algoritma, yang menunjukkan urutan langkah-langkah logis untuk menyelesaikan suatu masalah.",
    category: "Algoritma"
  },
  {
    id: 12,
    question: "Dalam desain antarmuka aplikasi, tombol 'Simpan' biasanya berwarna hijau dan tombol 'Hapus' berwarna merah. Pengguna sudah terbiasa dengan pola ini. Penerapan konsep berpikir komputasional pada desain ini adalah...",
    options: ["Algoritma", "Pengenalan pola", "Dekomposisi", "Abstraksi"],
    correctAnswer: 1,
    explanation: "Desainer menggunakan pola warna yang sudah dikenali pengguna (hijau=positif, merah=negatif) agar antarmuka lebih intuitif. Ini adalah penerapan pengenalan pola.",
    category: "Pengenalan Pola"
  },
  {
    id: 13,
    question: "Saat kita menggunakan aplikasi pesan makanan, kita tidak perlu memahami bagaimana server bekerja, bagaimana pembayaran diproses, atau bagaimana kurir ditugaskan. Kita hanya perlu memilih makanan dan alamat. Hal ini menunjukkan konsep...",
    options: [
      "Abstraksi",
      "Dekomposisi",
      "Pengenalan pola",
      "Algoritma"
    ],
    correctAnswer: 0,
    explanation: "Aplikasi menyembunyikan kompleksitas di balik layar dan hanya menampilkan fungsi penting yang dibutuhkan pengguna. Ini adalah abstraksi yang menyembunyikan detail implementasi.",
    category: "Abstraksi"
  },
  {
    id: 14,
    question: "Manakah dari berikut yang BUKAN merupakan karakteristik algoritma yang baik?",
    options: [
      "Langkah-langkahnya harus jelas dan tidak ambigu",
      "Jumlah langkahnya terbatas",
      "Bisa memberikan hasil yang berbeda untuk input yang sama",
      "Memiliki titik awal dan titik akhir"
    ],
    correctAnswer: 2,
    explanation: "Algoritma yang baik harus deterministik, artinya untuk input yang sama, hasilnya harus selalu sama. Hasil yang berbeda untuk input yang sama menandakan algoritma tidak valid.",
    category: "Algoritma"
  },
  {
    id: 15,
    question: "Seorang guru ingin membagi 30 siswa ke dalam kelompok berisi 5 orang. Langkah sistematis yang merupakan algoritma adalah...",
    options: [
      "Membagi siswa secara acak dan berharap hasilnya pas",
      "Mengurutkan siswa berdasarkan abjad nama, lalu mengelompokkan 5 siswa pertama, 5 siswa berikutnya, dan seterusnya",
      "Meminta siswa memilih kelompoknya sendiri",
      "Membagi siswa berdasarkan teman dekat saja"
    ],
    correctAnswer: 1,
    explanation: "Algoritma harus jelas, terurut, dan dapat diprediksi hasilnya. Mengurutkan berdasarkan abjad lalu membagi setiap 5 siswa adalah algoritma yang sistematis dan deterministik.",
    category: "Algoritma"
  },
  {
    id: 16,
    question: "Internet of Things (IoT) memungkinkan perangkat seperti lampu, kulkas, dan AC terhubung ke internet dan saling bertukar data. Ketika kulkas pintar bisa memperingatkan bahwa susu akan habis, pilar berpikir komputasional yang paling dominan adalah...",
    options: [
      "Algoritma monitoring dan pengambilan keputusan otomatis",
      "Abstraksi visual antarmuka",
      "Dekomposisi susu menjadi molekul",
      "Pengenalan pola warna kemasan susu"
    ],
    correctAnswer: 0,
    explanation: "Kulkas pintar menggunakan algoritma untuk memantau stok dan memutuskan kapan harus memperingatkan pengguna. Ini menunjukkan penerapan algoritma pada perangkat IoT.",
    category: "Algoritma"
  },
  {
    id: 17,
    question: "Aplikasi e-commerce seperti Tokopedia atau Shopee dapat menampilkan produk 'Yang Mungkin Kamu Sukai' berdasarkan riwayat pencarian dan pembelian. Hal ini memanfaatkan teknologi AI yang bekerja dengan prinsip...",
    options: [
      "Dekomposisi produk",
      "Pengenalan pola perilaku pengguna",
      "Abstraksi harga produk",
      "Algoritma penghapusan data"
    ],
    correctAnswer: 1,
    explanation: "Sistem AI menganalisis pola perilaku pengguna (apa yang dicari, dibeli, dilihat) untuk merekomendasikan produk serupa. Ini adalah penerapan pengenalan pola pada skala besar.",
    category: "Pengenalan Pola"
  },
  {
    id: 18,
    question: "Berikut adalah langkah mencuci pakaian dengan mesin cuci: (1) pisahkan pakaian putih dan berwarna, (2) masukkan pakaian ke mesin, (3) tambahkan deterjen, (4) pilih program cuci, (5) jalankan mesin, (6) jemur pakaian. Pemisahan pakaian putih dan berwarna pada langkah (1) merupakan bentuk...",
    options: [
      "Abstraksi",
      "Dekomposisi",
      "Pengenalan pola",
      "Algoritma acak"
    ],
    correctAnswer: 1,
    explanation: "Memisahkan pakaian berdasarkan warna adalah contoh dekomposisi, yaitu membagi kelompok besar (semua pakaian) menjadi sub-kelompok yang lebih spesifik agar penanganannya lebih tepat.",
    category: "Dekomposisi"
  },
  {
    id: 19,
    question: "Dalam pembuatan aplikasi, seorang programmer sering menggunakan 'fungsi' untuk tugas berulang seperti menghitung total belanja. Alih-alih menulis kode yang sama berkali-kali, ia cukup memanggil fungsi tersebut. Konsep berpikir komputasional yang paling tepat adalah...",
    options: [
      "Dekomposisi",
      "Pengenalan pola",
      "Abstraksi",
      "Algoritma"
    ],
    correctAnswer: 1,
    explanation: "Programmer mengenali pola perhitungan yang berulang, lalu membuat fungsi reusable untuk pola tersebut. Ini adalah penerapan pengenalan pola dalam pemrograman.",
    category: "Pengenalan Pola"
  },
  {
    id: 20,
    question: "Seorang siswa diminta membuat daftar belanja untuk pesta ulang tahun. Ia membuat daftar kategori: makanan, minuman, peralatan, dan dekorasi. Pendekatan ini menunjukkan penerapan...",
    options: [
      "Dekomposisi",
      "Pengenalan pola",
      "Abstraksi",
      "Algoritma"
    ],
    correctAnswer: 0,
    explanation: "Memecah daftar belanja berdasarkan kategori (makanan, minuman, peralatan, dekorasi) membuat tugas lebih terorganisir dan mudah diselesaikan. Ini adalah dekomposisi.",
    category: "Dekomposisi"
  },
  {
    id: 21,
    question: "Pada sistem keamanan berbasis pengenalan wajah (face recognition), ponsel dapat membuka kunci hanya dengan melihat wajah pemiliknya. Teknologi ini menggunakan pilar berpikir komputasional dalam bentuk...",
    options: [
      "Pengenalan pola wajah",
      "Dekomposisi wajah",
      "Abstraksi password",
      "Algoritma penghapusan data"
    ],
    correctAnswer: 0,
    explanation: "Sistem mempelajari pola fitur wajah (jarak mata, bentuk hidung, dll) untuk membedakan pemilik dengan orang lain. Ini adalah penerapan pengenalan pola pada data biometrik.",
    category: "Pengenalan Pola"
  },
  {
    id: 22,
    question: "Manakah pernyataan berikut yang PALING TEPAT tentang hubungan antara kecerdasan buatan (AI) dan berpikir komputasional?",
    options: [
      "AI menggantikan kebutuhan berpikir komputasional pada manusia",
      "AI dibangun di atas dasar berpikir komputasional seperti dekomposisi, pengenalan pola, abstraksi, dan algoritma",
      "AI dan berpikir komputasional adalah dua hal yang tidak berkaitan",
      "Berpikir komputasional hanya digunakan untuk membuat AI, bukan untuk hal lain"
    ],
    correctAnswer: 1,
    explanation: "AI dibangun dengan menerapkan keempat pilar berpikir komputasional. Model machine learning misalnya, menggunakan algoritma untuk belajar dari pola data dan membuat abstraksi dari masalah yang kompleks.",
    category: "Konsep Dasar"
  },
  {
    id: 23,
    question: "Seorang siswa diminta menjelaskan cara membuat sandwich kepada temannya yang belum pernah memasak. Penjelasan yang paling sesuai dengan prinsip algoritma adalah...",
    options: [
      "Buat sandwich sesuai perasaanmu",
      "Ambil dua lembar roti, olesi selai kacang pada satu lembar, olesi selai stroberi pada lembar lainnya, tutup keduanya, lalu potong menjadi dua segitiga",
      "Sandwich itu makanan enak",
      "Beli sandwich di toko terdekat"
    ],
    correctAnswer: 1,
    explanation: "Algoritma harus jelas, terurut, dan tidak ambigu. Langkah membuat sandwich yang spesifik dan berurutan memenuhi kriteria algoritma yang baik.",
    category: "Algoritma"
  },
  {
    id: 24,
    question: "Ketika seorang arsitek membuat denah rumah, ia hanya menggambar dinding, pintu, dan jendela tanpa menggambar setiap baut atau kabel di dalam dinding. Konsep berpikir komputasional yang digunakan adalah...",
    options: [
      "Abstraksi",
      "Algoritma",
      "Dekomposisi",
      "Pengenalan pola"
    ],
    correctAnswer: 0,
    explanation: "Denah rumah fokus pada informasi penting (tata letak ruangan) dan mengabaikan detail yang tidak relevan untuk tahap perencanaan (baut, kabel). Ini adalah abstraksi.",
    category: "Abstraksi"
  },
  {
    id: 25,
    question: "Aplikasi peta digital seperti Google Maps dapat menemukan rute tercepat ke suatu tujuan dengan mempertimbangkan jarak, kondisi lalu lintas, dan jalan tertutup. Di balik layar, aplikasi menggunakan...",
    options: [
      "Algoritma pencarian rute yang kompleks",
      "Abstraksi seluruh kota",
      "Dekomposisi setiap kendaraan",
      "Pengenalan pola warna mobil"
    ],
    correctAnswer: 0,
    explanation: "Aplikasi peta menggunakan algoritma pencarian jalur (seperti Dijkstra atau A*) yang mengevaluasi berbagai kemungkinan rute untuk menemukan yang tercepat berdasarkan data real-time.",
    category: "Algoritma"
  },
  {
    id: 26,
    question: "Seorang siswa menganalisis data nilai ulangan kelasnya dan menemukan bahwa nilai matematika cenderung turun ketika siswa kurang tidur malam sebelumnya. Temuan ini merupakan hasil dari...",
    options: [
      "Pengenalan pola antara kebiasaan tidur dan prestasi belajar",
      "Dekomposisi data nilai",
      "Abstraksi matematika",
      "Algoritma penghitungan nilai"
    ],
    correctAnswer: 0,
    explanation: "Siswa mengenali pola hubungan antara durasi tidur dan nilai matematika. Ini adalah penerapan pengenalan pola pada analisis data sederhana.",
    category: "Pengenalan Pola"
  },
  {
    id: 27,
    question: "Pada sebuah toko online, proses checkout terdiri dari: pilih barang -> masukkan keranjang -> isi alamat -> pilih pengiriman -> pilih pembayaran -> konfirmasi pesanan. Urutan ini tidak boleh diacak. Hal ini menunjukkan pentingnya...",
    options: [
      "Algoritma yang berurutan",
      "Abstraksi produk",
      "Dekomposisi pelanggan",
      "Pengenalan pola harga"
    ],
    correctAnswer: 0,
    explanation: "Urutan langkah checkout yang harus diikuti secara berurutan adalah algoritma. Mengubah urutan akan menyebabkan proses gagal atau error.",
    category: "Algoritma"
  },
  {
    id: 28,
    question: "Saat membuat game sederhana, seorang siswa memutuskan untuk fokus pada logika permainan terlebih dahulu, dan menunda pekerjaan membuat grafik dan suara. Pendekatan ini mencerminkan pilar...",
    options: [
      "Abstraksi (fokus pada hal penting lebih dulu)",
      "Dekomposisi (membagi tugas)",
      "Pengenalan pola",
      "Algoritma rendering"
    ],
    correctAnswer: 0,
    explanation: "Memilih fokus pada logika inti lebih dulu dan mengabaikan detail visual untuk sementara adalah abstraksi: menangkap inti masalah sebelum mengurus detail tambahan.",
    category: "Abstraksi"
  },
  {
    id: 29,
    question: "Sebuah smartwatch dapat memantau detak jantung pengguna dan memperingatkan jika detak jantung terlalu tinggi saat berolahraga. Untuk memberikan peringatan yang akurat, smartwatch menggunakan...",
    options: [
      "Algoritma yang membandingkan data detak jantung dengan ambang batas tertentu",
      "Dekomposisi jantung",
      "Abstraksi warna jam",
      "Pengenalan pola warna tali jam"
    ],
    correctAnswer: 0,
    explanation: "Smartwatch menggunakan algoritma sederhana: jika detak jantung > ambang batas, kirim peringatan. Ini menunjukkan algoritma pengambilan keputusan berbasis kondisi.",
    category: "Algoritma"
  },
  {
    id: 30,
    question: "Mengapa berpikir komputasional dianggap sebagai keterampilan penting bagi siswa di abad ke-21, meskipun mereka tidak semua akan menjadi programmer?",
    options: [
      "Karena berpikir komputasional hanya berguna untuk membuat aplikasi",
      "Karena berpikir komputasional membekali kita dengan kemampuan memecahkan masalah secara sistematis, logis, dan efisien di berbagai bidang kehidupan",
      "Karena semua pekerjaan di masa depan akan menggunakan komputer",
      "Karena berpikir komputasional wajib untuk lulus sekolah"
    ],
    correctAnswer: 1,
    explanation: "Berpikir komputasional bukan hanya tentang coding, melainkan tentang cara berpikir sistematis untuk memecahkan masalah. Keterampilan ini berlaku di banyak bidang: sains, bisnis, kesehatan, hingga kehidupan sehari-hari.",
    category: "Konsep Dasar"
  }
]
