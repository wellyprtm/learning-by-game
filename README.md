# Milo si Kucing 🐾 - Game Belajar Anak Usia 5 Tahun

Aplikasi game petualangan belajar membaca dan berhitung berbasis web interaktif untuk anak usia 4-7 tahun, dipandu oleh maskot lucu **Milo si Kucing Petualang**.

Dibangun dengan arsitektur modern berstandar enterprise (**Clean Architecture**, **Clean Code**, **Design Patterns**, dan **Security Awareness**):
- **Backend**: Golang 1.26 + Chi Router + JWT Authentication + Bcrypt Hashing + PostgreSQL Driver
- **Database**: PostgreSQL 16
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Canvas Confetti
- **Audio & Sound**: Web Speech API (Narasi Suara Bahasa Indonesia `id-ID` ceria) + Web Audio API Synthesizer (efek suara lembut dan menyenangkan)

---

## 🌟 Fitur Utama

1. **Maskot Unik & Lucu: Milo si Kucing**
   - Karakter animasi vektor SVG responsif dengan 5 mood ekspresi: *Idle*, *Happy*, *Cheering*, *Thinking*, dan *Eating*.
   - 4 Pilihan varian kostum maskot kesukaan anak: *Milo Petualang (Topi Hijau)*, *Milo Belang Tiga (Calico)*, *Milo Putih Salju*, dan *Milo Topi Biru*.

2. **Katalog & List Game Petualangan**
   - **Pulau Membaca (Petualangan Huruf & Kata)**: Vokal ceria (A, I, U, E, O), suku kata terbuka (Ba, Bi, Bu.. Ma, Mi, Mu..), menyusun kata 2 suku kata (bola, buku, sapi), akhiran kata (-n, -k, -m, -r, -s), hingga kata berakhiran -ng (kucing, piring, bintang).
   - **Pulau Berhitung (Petualangan Angka & Logika)**: Kenalan angka 1-5, berhitung 6-10, perbandingan lebih banyak/sedikit, serta penjumlahan & pengurangan santai dengan piring makanan Milo.
   - **Pesta Makan Milo (Mini Game Tangkap Ikan)**: Menangkap ikan warna-warni yang berenang di kolam air dan memberi makan Milo.

3. **Autentikasi & Keamanan (Security Awareness)**
   - Registrasi & Login Akun Orang Tua (Email + Kata Sandi dengan enkripsi `bcrypt` cost 12).
   - Akses API terlindungi JWT Bearer token dengan claims aman dan masa berlaku token terkonfigurasi.
   - **Pintu Keamanan Orang Tua (Child Gate)**: Proteksi 4-digit PIN numerik (default: `1234`) untuk mencegah anak keluar dari mode bermain atau mengubah profil tanpa pengawasan.
   - Header keamanan HTTP (*X-Content-Type-Options*, *X-Frame-Options*, *X-XSS-Protection*, *Strict Referrer Policy*).
   - Rate limiting middleware per client IP untuk mencegah serangan brute-force.
   - Prepared statement / parameterized SQL queries untuk pencegahan SQL Injection secara mutlak.

4. **Dashboard Progres & Analitik Orang Tua**
   - Ringkasan total bintang emas, level yang dituntaskan, dan total durasi bermain (menit).
   - Bar persentase penguasaan untuk *Jalur Membaca* dan *Jalur Berhitung*.
   - Album stiker & lencana penghargaan yang berhasil dibuka anak (*Bintang Pertama*, *Pintar Membaca*, *Jagoan Berhitung*, *Sahabat Setia Milo*).
   - Riwayat sesi belajar terakhir (jam main, durasi, jawaban benar dan salah).
   - Saran aktivitas nyata offline di rumah untuk orang tua bersama anak.

5. **Profile Settings**
   - Mengubah nama dan usia anak.
   - Memilih varian kostum maskot Milo.
   - Menambah profil anak baru (mendukung multi-anak dalam satu akun orang tua).
   - Mengubah nama orang tua dan 4-digit PIN keamanan.

---

## 🏗️ Struktur Arsitektur Backend (Clean Architecture)

```
backend/
├── cmd/
│   └── server/
│       └── main.go                  # Entry point, dependency injection & graceful shutdown
├── internal/
│   ├── config/
│   │   └── config.go                # Konfigurasi environment & DSN
│   ├── domain/
│   │   ├── entity.go                # Entity domain structs & DTOs
│   │   ├── repository.go            # Interface Repository
│   │   ├── usecase.go               # Interface Usecase
│   │   └── errors.go                # Domain error definitions
│   ├── repository/
│   │   └── postgres/                # Implementasi repository PostgreSQL
│   ├── usecase/                     # Logika bisnis (Auth, Child, Game, Progress, Dashboard)
│   └── delivery/
│       └── http/
│           ├── handler/             # HTTP controller handlers
│           ├── middleware/          # JWT, CORS, RateLimiter, SecurityHeaders
│           └── router.go            # Routing endpoints dengan Chi
├── migrations/
│   ├── 001_init_schema.sql          # Skema database & tabel
│   └── 002_seed_data.sql            # Seed data katalog game & kurikulum level
└── pkg/
    ├── hash/                        # Bcrypt password hashing
    ├── response/                    # Standardized JSON response envelope
    └── token/                       # JWT generation & verification
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Database PostgreSQL
Pastikan PostgreSQL berjalan di port `5432` dengan database `game_kids`.
```bash
# Menjalankan migrasi database
psql -h localhost -U postgres -d game_kids -f backend/migrations/001_init_schema.sql
psql -h localhost -U postgres -d game_kids -f backend/migrations/002_seed_data.sql
```

### 2. Backend Golang
```bash
cd backend
go run ./cmd/server
```
Backend akan aktif di `http://localhost:8080`.

### 3. Frontend React
```bash
cd frontend
npm install
npm run dev
```
Buka browser di `http://localhost:5173`.

---

## 🔑 Akun Uji Coba Cepat (Demo Parent)

Tersedia tombol satu klik di halaman login atau gunakan kredensial berikut:
- **Email**: `bunda.tika@example.com`
- **Password**: `password123`
- **Nama Orang Tua**: Bunda Tika
- **Nama Anak**: Azam (Usia 5 Tahun)
- **PIN Orang Tua**: `1234`
