# Implementation Plan: Game Belajar Membaca & Berhitung untuk Anak (4 Tahun)

Game berbasis website (PWA) yang bisa dibuka di HP. Konsep: anak belajar lewat petualangan bersama satu maskot, dengan sesi pendek, tanpa kalah, tanpa timer, dan semua arahan lewat suara.

**Keputusan yang sudah ditetapkan**

- Platform: website yang bisa dibuka di HP (PWA)
- Audio: **suara TTS** (dibuat sekali, disimpan sebagai file audio)
- Jalur membaca: sampai **akhiran di akhir kata dan akhiran di tengah kata**, termasuk **ng** dan digraf sejenis
- Jalur berhitung: sampai **angka 50**, termasuk **penjumlahan dan pengurangan**, bertahap per level

---

## 1. Prinsip Desain

- **Tanpa instruksi tertulis.** Semua arahan lewat suara dan animasi petunjuk.
- **Sesi pendek, 5-10 menit**, dengan akhir yang jelas.
- **Tanpa kalah dan tanpa timer.** Salah = bunyi lembut + coba lagi.
- **Tombol besar, interaksi sederhana** (ketuk dan seret).
- **Respon instan dan meriah** untuk setiap aksi benar.
- **Aman:** tanpa iklan, tanpa link keluar, tanpa chat.
- **Naik level karena menguasai**, bukan karena umur atau waktu.

## 2. Tema dan Karakter

- **Maskot** (hewan/dinosaurus/robot) yang jadi teman belajar: bicara, memberi semangat, bereaksi lucu.
- **Peta petualangan** dengan pulau-pulau (Pulau Huruf, Pulau Angka, dst.). Tiap pulau punya beberapa stasiun permainan.
- Anak merasa membantu maskot, bukan sedang diuji.

---

## 3. Kurikulum per Level

### 3.1 Jalur Membaca (R1-R12)

| Level | Materi | Contoh |
|---|---|---|
| R1 | Vokal | a, i, u, e, o |
| R2 | Suku kata terbuka, kelompok 1 | b, m, p, s + vokal (ba, bi, bu, be, bo) |
| R3 | Kelompok 2 | t, k, d, l |
| R4 | Kelompok 3 | n, r, h, j |
| R5 | Kelompok 4 | g, w, y, c (f, v, z sebagai pengenalan) |
| R6 | Kata 2 suku kata terbuka | bola, buku, sapi, mata |
| R7 | Kata 3 suku kata terbuka | kelapa, pepaya |
| R8 | **Akhiran di akhir kata** (satu per sub-level) | -n (ikan, makan), -k (anak), -m (malam), -r (pasar), -l (bel), -s (bus), -t (obat), -p (atap), -h (rumah) |
| R9 | **Akhiran "ng"** di akhir kata | kucing, piring, bintang |
| R10 | **Akhiran di tengah kata** | lampu, pensil, kursi, tangga, mangga |
| R11 | **Digraf**: ng di awal suku kata, ny (kh dan sy sebagai bonus) | bunga, angin, nyamuk, banyak |
| R12 (opsional) | Diftong dan kalimat pendek | ai, au, oi (pantai, kerbau); "Ibu makan." |

Target inti sampai **R11**. R12 adalah bonus kalau anak sudah lancar.

### 3.2 Jalur Berhitung (N1-N12)

| Level | Materi |
|---|---|
| N1 | Angka 1-5: bentuk, bunyi, jumlah benda |
| N2 | Angka 1-10: hitung benda, urutan |
| N3 | Angka 0, lebih banyak/lebih sedikit, mengurutkan 1-10 |
| N4 | 11-20 (belasan, dengan kotak sepuluh / ten-frame) |
| N5 | 21-30 |
| N6 | 31-50, kenalan puluhan (10, 20, 30, 40, 50) |
| N7 | **Penjumlahan** dengan benda nyata, hasil <= 5 |
| N8 | **Pengurangan** dengan benda nyata, hasil <= 5 |
| N9 | Tambah dan kurang <= 10, mulai memakai simbol + - = |
| N10 | Tambah dan kurang <= 20 |
| N11 | Sampai 50 tanpa menyimpan/meminjam (20 + 5, 23 + 4, 35 - 2) |
| N12 (opsional) | Sampai 50 dengan menyimpan/meminjam (mis. 18 + 5) |

Urutan visual yang konsisten: **benda nyata -> kotak sepuluh -> garis bilangan -> simbol angka.**

Kedua jalur berjalan **paralel**: satu sesi bisa berisi satu aktivitas membaca dan satu aktivitas berhitung.

---

## 4. Teknologi

**PWA tanpa backend di tahap awal.**

- **Frontend:** Angular + `@angular/pwa` (service worker, offline). Interaksi sebagian besar sentuh, seret, dan jiplak, jadi cukup HTML/CSS/SVG + Pointer Events, ditambah satu komponen Canvas untuk menjiplak huruf/angka. Phaser opsional kalau ingin animasi lebih kaya.
- **Penyimpanan progres:** IndexedDB / localStorage di perangkat.
- **Audio:** file MP3/OGG hasil TTS yang dibuat sebelumnya (build-time), dimuat lewat satu *audio manager*.
- **Deploy:** file statis di Nginx + HTTPS (wajib untuk service worker/PWA).
- **Tahap lanjut (opsional):** backend Go untuk sinkronisasi progres antar perangkat.

**Catatan teknis untuk HP**

- Layar **"Mulai"** di awal, karena browser mobile memblokir audio sebelum ada sentuhan pertama.
- `touch-action: manipulation`, nonaktifkan zoom dan seleksi teks.
- Target sentuh minimal sekitar 80px.
- Kunci orientasi (pilih satu: portrait atau landscape) dan Wake Lock agar layar tidak mati.
- Pre-load aset per level agar tidak ada jeda.

---

## 5. Arsitektur: Berbasis Data

Menambah level cukup menambah data, bukan menulis ulang kode.

```
Konten (JSON)  ->  Session Director  ->  Activity Template  ->  Progress Tracker
(level, item)      (susun sesi)          (mini-game generik)    (penguasaan, review)
```

Contoh data satu level:

```json
{
  "id": "R8-03",
  "track": "baca",
  "title": "Akhiran -m",
  "items": [
    {
      "id": "w_malam",
      "type": "word",
      "text": "malam",
      "syllables": ["ma", "lam"],
      "audio": "audio/w_malam.mp3",
      "image": "img/malam.svg"
    }
  ],
  "activities": ["tap-choose", "build-word", "match-picture"],
  "unlock": { "requires": "R8-02", "mastery": 0.8 }
}
```

**Komponen inti**

- **Content loader:** membaca JSON level/item.
- **Session Director:** menyusun sesi sekitar 8 menit (pemanasan dari materi lama, materi baru, hadiah, penutup).
- **Activity templates:** komponen mini-game generik yang menerima item sebagai parameter.
- **Mastery tracker:** mencatat benar/salah per item.
- **Reward system:** bintang, stiker, album.
- **Audio manager:** antrean suara narasi dan efek, mencegah suara bertumpuk.
- **Parent area:** progres dan pengaturan.

**Aturan penguasaan**

- Item *dikuasai* setelah 3 benar berturut-turut di 2 sesi berbeda.
- Level lulus saat >= 80% item dikuasai.
- Item lama muncul lagi sesekali sebagai review (pengulangan berjarak).
- Kesulitan adaptif diam-diam: salah 2-3 kali -> petunjuk lebih jelas; selalu benar -> tantangan naik pelan-pelan.

## 6. Template Aktivitas

| Template | Dipakai untuk |
|---|---|
| Tap-choose (pilih yang benar) | Semua level baca dan angka |
| Drag-drop (seret ke tempat) | Menghitung benda, mencocokkan gambar ke huruf/kata |
| Tracing (jiplak) | Huruf (R1-R5), angka (N1-N6) |
| Build-word (susun suku kata) | R6 ke atas, termasuk akhiran dan "ng" |
| Count-tap (ketuk sambil menghitung) | N1-N6 |
| Feed-the-mascot | Penjumlahan dan pengurangan (N7-N11) |
| Balloon pop | Pengenalan cepat huruf/angka (variasi) |
| Ten-frame builder | N4 sampai N12 |

Tiap level mengizinkan 3-4 template agar ada variasi dalam satu level.

## 7. Struktur Satu Sesi (sekitar 8 menit)

1. Sapaan maskot (sekitar 15 detik)
2. Pemanasan: ulang materi yang sudah dikuasai
3. Materi baru: 2-3 mini-game berbeda untuk topik yang sama
4. Permainan bebas / hadiah
5. Penutup: pujian, stiker, game berhenti dengan lembut

## 8. Hadiah dan Motivasi

- Bintang di setiap jawaban benar, stiker/koleksi di akhir sesi.
- Album stiker yang terus terisi (alasan untuk kembali besok).
- Pujian maskot yang bervariasi.
- Hadiah untuk usaha dan kemajuan, tanpa hukuman.

## 9. Area Orang Tua

Dikunci dengan pertanyaan sederhana yang hanya bisa dijawab orang dewasa.

- Progres: huruf/angka yang sudah dikuasai dan yang masih sulit
- Pengaturan: batas durasi harian, suara, level awal, reset progres
- Saran kegiatan offline sesuai topik (mis. "cari 5 benda berwarna merah di rumah")

---

## 10. Audio dengan TTS

Keputusan: memakai suara TTS bahasa Indonesia. Audio **dibuat sekali di build-time**, bukan dipanggil saat anak bermain, sehingga game tetap cepat, offline, dan tanpa biaya per pemakaian.

### 10.1 Alur produksi audio

```
content/*.json  ->  audio manifest  ->  skrip generator TTS  ->  normalisasi (ffmpeg)  ->  assets/audio/*.mp3
```

- **Audio manifest:** daftar semua suara yang dibutuhkan (suku kata, kata, angka, kalimat instruksi, pujian), masing-masing dengan teks atau SSML.
- **Skrip generator:** membaca manifest, memanggil API TTS, menyimpan file. Pakai **hash (teks + suara + pengaturan)** agar hanya item yang berubah yang digenerate ulang.
- **Normalisasi volume:** satu level loudness untuk semua file agar tidak ada suara yang tiba-tiba keras atau pelan.
- **Satu suara yang konsisten** untuk narasi, dengan kecepatan sedikit lebih lambat dari normal (sekitar 0.85-0.9) agar mudah ditiru anak.
- **Sprite/bundel per level** bila jumlah file kecil terlalu banyak, supaya loading ringan.

Contoh entri manifest:

```json
{
  "id": "syl_ba",
  "text": "ba",
  "ssml": "<speak><prosody rate=\"85%\">ba</prosody></speak>",
  "file": "audio/syl_ba.mp3"
}
```

### 10.2 Jenis audio yang perlu dibuat

| Kelompok | Contoh |
|---|---|
| Bunyi suku kata | ba, bi, bu, be, bo, ... |
| Nama/bunyi huruf | a, b, c (untuk pengenalan huruf) |
| Kata | bola, ikan, kucing, lampu, nyamuk |
| Angka | satu sampai lima puluh, nol |
| Kalimat instruksi | "Ketuk huruf B!", "Seret apelnya ke keranjang!" |
| Pujian dan dorongan | "Hebat!", "Ayo coba lagi!" |
| Cerita maskot | sapaan, penutup, transisi antar pulau |

### 10.3 Risiko khusus TTS dan antisipasinya

- **Suku kata sering terbaca aneh.** Suku kata pendek seperti "ba" atau "ng" bisa dibaca sebagai singkatan atau dengan intonasi yang salah. Antisipasi: pakai SSML (jeda, `phoneme`) atau ejaan pengganti, dan uji hasilnya.
- **Bunyi huruf vs nama huruf.** TTS yang membaca "b" biasanya mengucapkan namanya ("be"), bukan bunyinya. Untuk membaca, fokus ke bunyi **suku kata** (ba, bi, bu), dan pakai nama huruf hanya di pengenalan huruf.
- **Digraf dan akhiran** (ng, ny, -k, -h) harus didengar jelas. Cek satu per satu karena ini inti level R8-R11.
- **Intonasi kaku.** Beri kalimat instruksi dan pujian yang pendek, ceria, dan bervariasi.
- **Lisensi.** Periksa ketentuan penyedia TTS yang dipilih terkait penyimpanan dan pemakaian file audio hasil generate di dalam aplikasi.

**Langkah awal yang disarankan (di Fase 0):** buat dulu **tes kecil** dengan 20-30 suara (beberapa suku kata, kata dengan -ng/-k/-h, angka, dan satu kalimat instruksi) dari 2-3 pilihan suara, lalu dengarkan bersama anak. Pilih satu suara sebelum memproduksi sisanya.

---

## 11. Aset yang Perlu Disiapkan

- **Audio:** lihat bagian 10 (dihasilkan lewat TTS).
- **Gambar:** satu set ilustrasi SVG dengan gaya konsisten. Hindari emoji karena tampilannya berbeda di tiap perangkat. Cek lisensi bila memakai set gratis.
- **Maskot:** beberapa pose (senang, berpikir, melompat, tidur).
- **Efek suara:** benar, coba lagi, bintang, hadiah (bukan TTS, pakai efek yang ringan dan lembut).

---

## 12. Fase Pengerjaan

| Fase | Isi | Hasil |
|---|---|---|
| 0. Fondasi | Pilih maskot dan gaya visual, finalkan daftar item tiap level, buat audio manifest, **tes suara TTS dan pilih satu suara** | Dokumen konten, style guide, suara terpilih |
| 1. Kerangka | Proyek PWA, routing, audio manager, loader, layar Mulai, penyimpanan progres, **skrip generator audio TTS** | Aplikasi kosong yang bisa dibuka di HP + pipeline audio jalan |
| 2. Template inti | Tap-choose, drag-drop, tracing, count-tap | Mini-game generik yang berfungsi |
| 3. **Vertical slice** | R1-R3 + N1-N3 lengkap dengan audio dan hadiah | Versi pertama untuk **diuji ke anak** |
| 4. Isi sisa level | R4-R11 dan N4-N11 (+ build-word, feed, ten-frame) | Seluruh kurikulum |
| 5. Progres dan hadiah | Mastery tracker, review berjarak, album stiker, area orang tua | Sistem adaptif |
| 6. Polish | Offline, performa di HP lama, animasi, bug sentuhan, deploy | Rilis |

**Fase 3 paling penting:** uji lebih awal dengan anak selama sekitar 5 menit. Amati di mana ia bingung, bosan, atau salah tekan, lalu sesuaikan desain sebelum membuat sisa level.

## 13. Risiko dan Antisipasi

| Risiko | Antisipasi |
|---|---|
| Volume konten besar (ratusan audio dan gambar) | Kerjakan per level; pipeline audio otomatis dari manifest |
| Kualitas bunyi TTS untuk suku kata dan digraf | Tes di Fase 0, SSML/ejaan pengganti, cek manual tiap file |
| Anak cepat bosan atau frustrasi | Variasi template, sesi pendek, petunjuk adaptif |
| Kecepatan belajar tiap anak berbeda | R12/N12 opsional; naik level berdasarkan penguasaan |
| Layar kecil dan sentuhan tidak sengaja | Target sentuh besar; uji di HP yang benar-benar dipakai anak |
| Scope membengkak | Patuhi urutan fase; vertical slice dulu |

## 14. Langkah Berikutnya

1. Tentukan maskot dan tema dunia.
2. Susun daftar lengkap item per level (suku kata, kata, angka) dalam format JSON.
3. Lakukan tes suara TTS (20-30 sampel) dan pilih satu suara.
4. Mulai Fase 1: kerangka PWA + pipeline audio.
