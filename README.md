# Deutsch A1 · Teil 2 — Grammar

Website latihan grammar Bahasa Jerman A1 untuk murid Indonesia. Satu website, dua fungsi:

- **Mode Belajar** — dibuka murid sendiri di HP/laptop: materi, tabel, dan latihan dengan skor serta
  penjelasan.
- **Mode Presentasi** — untuk Anda saat mengajar lewat share screen: huruf sangat besar, satu konsep
  per layar, tabel muncul baris demi baris.

Pindah mode dengan tombol **Belajar / Presentasi** di pojok kanan atas.

## Cara membuka

Klik dua kali `index.html`. Website langsung terbuka di browser — tanpa instalasi, tanpa internet
(kecuali untuk jenis huruf; kalau offline, dipakai huruf bawaan perangkat).

Untuk murid: kirim seluruh folder ini (misalnya di-zip), atau taruh di hosting gratis seperti Netlify
atau GitHub Pages lalu bagikan tautannya.

## Mode Presentasi

Slide dibuat otomatis dari materi: **sampul** (judul + daftar isi) → satu slide per bagian materi →
**penutup** (ringkasan + tugas "latihan di rumah" berisi jumlah soal dan cara membukanya).

- Huruf menyesuaikan ukuran layar sendiri. Kalau isi slide panjang, huruf dikecilkan sedikit supaya
  muat; tabel panjang dipindah ke kolom kanan. Di layar 1920×1080 huruf isi slide sekitar 36–50 px.
- Baris tabel, kalimat "dulu", dan kalimat yang benar di "Kesalahan umum" muncul **satu per satu**.
- Terjemahan contoh kalimat baru muncul setelah kalimatnya diklik.
- Kursor mouse menghilang sendiri setelah 2,5 detik diam, supaya tidak menutupi tulisan.

### Tombol keyboard

Tekan **?** di Mode Presentasi untuk melihat daftar ini di layar.

| Tombol | Fungsi |
|---|---|
| → atau Spasi | maju: munculkan langkah berikutnya, atau pindah ke slide berikutnya |
| ← | slide sebelumnya |
| Home / End | slide pertama / terakhir |
| 1 2 3 4 | pindah ke Topik 1–4 |
| A | tampilkan semua langkah di slide ini sekaligus |
| T | buka / tutup semua terjemahan di slide ini |
| O | daftar semua slide — klik untuk lompat (bisa juga klik tulisan "Slide x / y") |
| B atau . | tutup layar sementara (layar gelap; tekan tombol apa saja untuk membuka) |
| + / − / 0 | perbesar / perkecil / kembalikan ukuran huruf |
| F | layar penuh (tekan lagi atau Esc untuk keluar) |
| ? | bantuan tombol |
| klik tabel | munculkan baris berikutnya |
| klik contoh kalimat | tampilkan / sembunyikan terjemahan |
| geser jari kiri/kanan | pindah slide (tablet) |

Remote presentasi (clicker) juga bisa dipakai, karena tombolnya sama dengan PageDown/PageUp (dan B atau .
untuk layar gelap).

## Struktur file

```
deutsch-a1-teil2/
├── index.html              halaman utama (buka file ini)
├── css/
│   ├── style.css           tampilan umum & Mode Belajar (warna diatur di bagian atas)
│   └── presentation.css    tampilan Mode Presentasi (huruf besar)
├── js/
│   ├── data/               ← MATERI & SOAL. Bagian yang boleh Anda edit.
│   │   ├── ordinalzahlen.js    Topik 1
│   │   ├── praeteritum.js      Topik 2
│   │   ├── pronomen.js         Topik 3
│   │   ├── trennbare.js        Topik 4
│   │   └── gabungan.js         Latihan Gabungan
│   ├── quiz.js             engine latihan
│   ├── presentation.js     engine Mode Presentasi
│   └── main.js             navigasi, toggle mode, gambar materi
└── README.md               panduan ini
```

Satu bagian materi ditulis **sekali** di file data, lalu tampil di dua tempat: sebagai kartu di Mode
Belajar dan sebagai slide di Mode Presentasi.

## Mengedit materi & soal

1. Buka file di `js/data/` dengan Notepad (klik kanan → *Open with* → *Notepad*) atau VS Code.
2. Salin contoh yang sudah ada, lalu ganti teksnya.
3. Simpan (Ctrl+S), lalu muat ulang website (F5).

Kalau muncul **kotak kuning** di atas website, ada salah ketik di file data. Biasanya penyebabnya koma
yang hilang di antara dua `{ … }`, tanda kutip yang tidak ditutup, atau kurung yang kurang. Kotak itu
menyebut nama file yang bermasalah.

### Kode warna

Bisa dipakai di semua teks (materi, soal, penjelasan):

| Tulis di file data | Tampil sebagai | Untuk |
|---|---|---|
| `*hole*`, `*kann*` | oranye | kata kerja (hole) dan Modalverb (kann) |
| `[ab]` | kotak oranye | awalan trennbar yang "lepas" |
| `*[ab]holen*` | kata kerja oranye, awalan berkotak | kata kerja utuh (awalan masih menempel) |
| `*hatte**st***` | kata kerja oranye, akhiran bergaris bawah | menunjukkan akhiran (hatte + st) |
| `{dich}` | biru | pronomen Akkusativ |
| `!!ersten!!` | merah | bentuk tak beraturan |
| `~~einten~~` | dicoret | bentuk yang salah |
| `**teks**` | huruf tebal | penekanan |
| `___` | titik-titik | tempat jawaban di soal |
| `->` | → | panah |

Hati-hati: satu bintang `*…*` selalu berarti kata kerja (oranye). Untuk huruf tebal pakai dua bintang
`**…**`.

### Menulis materi

Materi adalah daftar **bagian**. Setiap bagian = satu kartu di Mode Belajar = satu slide di Mode
Presentasi:

```js
{
  judul: "1 – 19: angka + ten",
  isi: [
    "Paragraf biasa cukup ditulis sebagai teks.",
    { aturan: ["Angka **1 sampai 19** → tambahkan akhiran **-ten**"] }
  ]
},
```

Pengaturan tambahan untuk satu bagian:

- `hanya: "belajar"` → hanya muncul di Mode Belajar (tidak jadi slide). `hanya: "presentasi"` sebaliknya.
- `tataLetak: "satu"` → di presentasi, tabel panjang tidak dipindah ke kolom kanan.

Jenis blok yang bisa ditaruh di dalam `isi`:

| Blok | Contoh | Hasilnya |
|---|---|---|
| teks | `"Paragraf …"` | paragraf |
| aturan | `{ aturan: ["…", "…"] }` | daftar aturan bertanda → |
| rumus | `{ rumus: ["am", "zwölf**ten**", "Mai"], label: ["selalu am", "bilangan tingkat", "bulan"] }` | kotak + kotak + kotak |
| tabel | `{ kolom: ["Angka", "Tanggal"], tabel: [ ["1.", "am !!ersten!!"], ["2.", "am zweiten"] ] }` | tabel |
| contoh | `{ contoh: [ { de: "Am ersten Mai.", id: "Tanggal satu Mei." } ] }` | kalimat + terjemahan |
| kata | `{ kata: [ ["Januar", "Januari"], ["Februar", "Februari"] ] }` | kotak-kotak kosakata |
| catatan | `{ catatan: "…", jenis: "penting" }` | kotak catatan |
| sekarang → dulu | `{ ubah: [ { dari: "Ich *habe* …", ke: "Ich *hatte* …", id: "terjemahan" } ] }` | dua kalimat dengan panah; di presentasi kalimat kanan muncul setelah diklik |
| awalan lepas | `{ pisah: "*[ab]holen*", kalimat: "Ich *hole* {dich} [ab].", id: "…" }` | infinitiv di atas, kalimat di bawah; awalannya "terbang" ke akhir kalimat |
| salah → benar | `{ salahBenar: [ { salah: "Ich abhole dich.", benar: "Ich *hole* {dich} [ab].", alasan: "…" } ] }` | ✗ kalimat salah / ✓ kalimat benar + alasan |

- `jenis` untuk catatan: `info` ℹ️ · `penting` ⭐ · `peringatan` ⚠️ · `tips` 💡 · `hubung` 🔗
- Baris tabel bisa diberi warna latar: `{ tanda: "merah", isi: ["1.", "am !!ersten!!"] }`.
  Pilihan: `merah`, `sama`, `biru`, `abu`.
- Di presentasi, baris tabel muncul **satu per satu**. Kalau ingin langsung semua, tambahkan
  `bertahap: false` pada blok tabel.
- Blok lain bisa dibuat muncul setelah diklik di presentasi dengan `bertahap: true`.
- `hanya: "belajar"` atau `hanya: "presentasi"` juga bisa dipakai pada satu blok.
- `lipat: "Lihat daftar lengkap"` → di Mode Belajar blok itu tertutup sampai judulnya diklik.
- `kecil: true` pada blok kata → kotak lebih kecil, cocok untuk daftar panjang.
- `duaKolom: true` pada blok contoh → di presentasi contoh ditaruh dua kolom (otomatis untuk 3+ kalimat
  pendek; `duaKolom: false` untuk mematikannya).

### Garis lengkung Satzklammer

Garis lengkung oranye yang menghubungkan kata kerja dengan awalan/infinitiv di akhir kalimat muncul
**otomatis** di contoh kalimat dan di umpan balik latihan, asal kalimatnya memakai kode warna:

- awalan lepas di akhir: `"Ich *hole* {dich} [ab]."` → garis hole ⌒ ab
- infinitiv trennbar utuh: `"Sie *wollen* Sofia *[ab]holen*."` → garis wollen ⌒ abholen

Untuk Modalverb + kata kerja biasa, tambahkan `klammer: true` pada contohnya:
`{ de: "Wir *können* ins Kino *gehen*.", id: "…", klammer: true }`.
Label di bawah kedua ujung garis: `klammer: ["Modalverb", "Infinitiv"]`. Tanpa garis: `klammer: false`.
Pada blok rumus, garis dinyalakan dengan `klammer: true`.

### Menulis soal latihan

Soal ditulis di bagian `latihan: [ … ]` pada file topik. Kolom yang dipakai semua jenis soal:

| Kolom | Wajib? | Isi |
|---|---|---|
| `tipe` | ya | jenis soal (lihat di bawah) |
| `perintah` | tidak | instruksi kecil, mis. "Tulis tanggalnya dengan huruf." |
| `petunjuk` | tidak | label di atas soal, mis. "1. Mai" |
| `soal` | ya | kalimat soal; `___` = tempat jawaban |
| `jawaban` | ya | jawaban yang benar |
| `arti` | disarankan | terjemahan Indonesia, tampil setelah menjawab |
| `penjelasan` | disarankan | penjelasan langkah demi langkah kalau murid salah |
| `kalimat` | tidak | kalimat lengkap berwarna untuk umpan balik, mis. `"am !!ersten!! Mai"` |
| `jikaMenjawab` | tidak | tanggapan khusus untuk jawaban salah tertentu |

**Isian** — murid mengetik jawaban:

```js
{
  tipe: "isi",
  perintah: "Tulis tanggalnya dengan huruf.",
  petunjuk: "1. Mai",
  soal: "am ___ Mai",
  jawaban: "ersten",
  kalimat: "am !!ersten!! Mai",
  arti: "tanggal satu Mei",
  penjelasan: "Rumus biasa (angka + ten) tidak berlaku untuk 1. …",
  jikaMenjawab: {
    "einten": "1 = **ersten**, bukan einten. Ini salah satu dari 4 bentuk tak beraturan."
  }
},
```

- Dua titik-titik → dua jawaban: `jawaban: ["hole", "ab"]`.
- Beberapa jawaban sama-sama benar → pisahkan dengan `|`: `jawaban: "siebten|siebenten"`.
- Huruf besar/kecil tidak dihitung salah. `ss` diterima untuk `ß`, dan `ae/oe/ue` untuk `ä/ö/ü`
  (murid mendapat catatan tulisan yang tepat). Murid yang lupa umlaut juga dianggap benar, dengan
  catatan "jangan lupa umlaut".

**Pilihan ganda** — murid mengetuk salah satu jawaban:

```js
{
  tipe: "pilih",
  petunjuk: "3. Oktober",
  soal: "Die Party ist am ___ Oktober.",
  pilihan: ["dritten", "dreiten", "dreisten"],
  jawaban: "dritten",
  arti: "Pestanya tanggal tiga Oktober.",
  penjelasan: "…"
},
```

- `jawaban` harus sama persis dengan salah satu `pilihan`.
- Urutan pilihan diacak otomatis. Kalau urutannya harus tetap (mis. "im / am"), tambahkan
  `acak: false`.

**Susun kalimat** — murid menyeret kata (mouse atau jari) atau cukup mengetuknya:

```js
{
  tipe: "susun",
  perintah: "Susun menjadi kalimat yang benar.",
  petunjuk: "*[ab]holen* — menjemput",
  kata: ["Ich", "*hole*", "{dich}", "[ab]"],
  tanda: ".",
  arti: "Aku menjemputmu.",
  penjelasan: "abholen itu kata kerja terpisah. …"
},
```

- Tulis `kata` dalam **urutan yang benar** — website mengacaknya sendiri.
- Satu kotak boleh berisi beberapa kata: `"die Freunde"`, `"um 7 Uhr"`.
- `tanda` = tanda baca di akhir: `"."`, `"?"` atau `"!"`.
- Urutan lain yang juga benar: `jawabanLain: [["um 7 Uhr", "*stehe*", "Ich", "[auf]"]]`.
- Kalau salah, website otomatis menjelaskan posisi awalan dan kata kerja (posisi 1/2/akhir), lalu
  menampilkan `penjelasan` Anda, lengkap dengan garis lengkung di kalimat yang benar.

**Banding** — dua kalimat berpasangan, dicek sekaligus (mis. terpisah vs. dengan Modalverb):

```js
{
  tipe: "banding",
  perintah: "Isi dengan bentuk yang tepat.",
  petunjuk: "*[ab]holen* — menjemput",
  baris: [
    { soal: "Ich ___ {dich} ___.",   jawaban: ["hole", "ab"], kalimat: "Ich *hole* {dich} [ab].",       arti: "Aku menjemputmu." },
    { soal: "Ich *will* {dich} ___.", jawaban: "abholen",     kalimat: "Ich *will* {dich} *[ab]holen*.", arti: "Aku mau menjemputmu." }
  ],
  penjelasan: "Tanpa Modalverb → terpisah … Dengan Modalverb → utuh …"
},
```

- Label kalimat otomatis "Tanpa Modalverb" / "Dengan Modalverb"; ganti dengan `label: "…"` pada baris.
- Umpan baliknya menampilkan kedua kalimat yang benar berdampingan, masing-masing dengan garis lengkung.

**Label topik (Latihan Gabungan)** — di `js/data/gabungan.js`, setiap soal bisa diberi label topik yang
dicampur, misalnya `topik: ["trennbare", "pronomen", "ordinalzahlen"]`. Nama yang bisa dipakai:
`ordinalzahlen`, `praeteritum`, `pronomen`, `trennbare`.

Kalau ada soal yang formatnya keliru (mis. jawaban tidak ada di daftar pilihan), di atas latihan muncul
kotak kuning **"Catatan untuk guru"** yang menyebut nomor soalnya.

## Catatan teknis

- HTML, CSS, dan JavaScript murni: tanpa framework dan tanpa *build step*.
- Tidak memakai localStorage/sessionStorage. Skor latihan hanya ada selama halaman terbuka.
- Alamat halaman menunjukkan posisi, misalnya `index.html#/belajar/trennbare/latihan` atau
  `index.html#/presentasi/pronomen/3`. Jadi tombol *Back* browser dan tombol *refresh* tetap di tempat
  yang sama.
- Folder `_arsip-kerangka-lama/` (hanya di komputer, tidak ikut ke GitHub) berisi kerangka versi sebelumnya.
  Tidak dipakai website; boleh dihapus.

## Isi website

| Bagian | Materi (slide) | Soal latihan |
|---|---|---|
| Topik 1 · Ordinalzahlen | 8 bagian | 18 |
| Topik 2 · Präteritum haben & sein | 7 bagian | 16 |
| Topik 3 · Personalpronomen im Akkusativ | 6 bagian | 17 |
| Topik 4 · Trennbare Verben + für | 12 bagian | 24 |
| Latihan Gabungan | — | 16 |

## Status pengerjaan

- [x] Tahap 1 — struktur folder, navigasi 4 topik + Latihan Gabungan, toggle mode, kerangka Mode
      Presentasi
- [x] Tahap 2 — Topik 1: Ordinalzahlen (8 bagian materi, 18 soal) + engine latihan (isian & pilihan
      ganda, penjelasan, skor, ringkasan untuk PR)
- [x] Tahap 3 — Topik 2: Präteritum haben & sein (7 bagian materi, 16 soal)
- [x] Tahap 4 — Topik 3: Personalpronomen im Akkusativ (6 bagian materi, 17 soal)
- [x] Tahap 5 — Topik 4: Trennbare Verben + für (12 bagian materi, 24 soal; garis lengkung Satzklammer,
      animasi awalan lepas, drag & drop mouse + sentuhan)
- [x] Tahap 6 — Mode Presentasi lengkap (slide penutup, daftar slide, tutup layar, ukuran huruf, bantuan
      tombol, semua slide dicek di 1366×768 dan 1920×1080)
- [x] Tahap 7 — Latihan Gabungan (16 soal yang mencampur 2–3 topik, dengan label topik di tiap soal)
