/* ================================================================
   TOPIK 1 — ORDINALZAHLEN (bilangan tingkat untuk tanggal)
   ================================================================
   File ini berisi seluruh isi Topik 1:
     materi  → penjelasan. Tampil sebagai kartu di Mode Belajar DAN
               otomatis menjadi slide di Mode Presentasi.
     latihan → soal-soal (hanya di Mode Belajar).

   CARA MENGEDIT
     1. Buka file ini dengan Notepad (klik kanan → Open with → Notepad)
        atau VS Code.
     2. Ubah atau tambahkan isi. Paling mudah: salin contoh yang sudah
        ada (dari { sampai }, termasuk koma sesudahnya), lalu ganti
        teksnya.
     3. Simpan (Ctrl+S), lalu muat ulang website (tombol F5).
     Kalau muncul kotak kuning di atas website, berarti ada salah ketik
     — biasanya koma yang hilang di antara dua { … }.

   KODE WARNA (bisa dipakai di semua teks)
     *hole*       oranye         kata kerja / Modalverb
     [ab]         kotak oranye   awalan trennbar
     {dich}       biru           pronomen Akkusativ
     !!ersten!!   merah          bentuk tak beraturan
     ~~einten~~   dicoret       bentuk yang salah
     **teks**     huruf tebal
     ___          titik-titik (tempat jawaban di soal)
     ->           panah →

   Panduan lengkap semua jenis blok materi & jenis soal: README.md
   ================================================================ */

var TOPIK = TOPIK || {};   // ← baris ini jangan dihapus

TOPIK.ordinalzahlen = {
  nomor: 1,
  ikon: "📅",
  judul: "Ordinalzahlen",
  judulPendek: "Ordinalzahlen",          // nama pendek untuk menu
  subjudul: "Tanggal: am !!ersten!! Mai",
  ringkas: "Bilangan tingkat untuk menyebut tanggal. Aturannya sederhana — tapi hati-hati dengan 4 bentuk tak beraturan.",

  /* ==============================================================
     MATERI — setiap { judul, isi: [ … ] } = satu kartu = satu slide.
     Jenis blok yang bisa dipakai di dalam isi (lihat README.md):
       "teks biasa"                          paragraf
       { aturan: ["…", "…"] }                daftar aturan
       { rumus: ["am", "…", "Mai"], label: ["…"] }   kotak rumus
       { kolom: [...], tabel: [ [...], ... ] }       tabel
       { contoh: [ { de: "…", id: "…" } ] }  contoh kalimat + terjemahan
       { kata: [ ["Januar", "Januari"] ] }   daftar kata
       { catatan: "…", jenis: "penting" }    kotak catatan
                    jenis: info | penting | peringatan | tips | hubung
     Tambahan:  bertahap: true  → di presentasi muncul setelah diklik
                hanya: "belajar" / "presentasi"  → tampil di satu mode saja
     ============================================================== */
  materi: [
    {
      judul: "Wann? — Am !!ersten!! Mai.",
      isi: [
        "**Ordinalzahlen** adalah bilangan tingkat: pertama, kedua, ketiga … Di bahasa Jerman, bilangan tingkat dipakai untuk menyebut **tanggal**.",
        { contoh: [
          { de: "Wann hast du Geburtstag? — Am zwölften Mai.", id: "Kapan kamu ulang tahun? — Tanggal dua belas Mei." }
        ] },
        { rumus: ["am", "zwölf**ten**", "Mai"], label: ["selalu am", "bilangan tingkat", "bulan"] },
        { catatan: "Pertanyaannya **Wann?** (kapan?), jawabannya selalu dimulai dengan **am**.", jenis: "penting", bertahap: true }
      ]
    },

    {
      judul: "1 – 19: angka + ten",
      isi: [
        { aturan: ["Angka **1 sampai 19** → tambahkan akhiran **-ten**"] },
        { kolom: ["Angka", "Bilangan", "Tanggal"],
          tabel: [
            ["2.",  "zwei",     "am zwei**ten**"],
            ["4.",  "vier",     "am vier**ten**"],
            ["5.",  "fünf",     "am fünf**ten**"],
            ["6.",  "sechs",    "am sechs**ten**"],
            ["10.", "zehn",     "am zehn**ten**"],
            ["12.", "zwölf",    "am zwölf**ten**"],
            ["15.", "fünfzehn", "am fünfzehn**ten**"],
            ["19.", "neunzehn", "am neunzehn**ten**"]
          ] }
      ]
    },

    {
      judul: "⚠️ 4 bentuk tak beraturan",
      isi: [
        "Hanya empat angka yang tidak ikut aturan. Hafalkan: **1 · 3 · 7 · 8**.",
        { kolom: ["Angka", "Bilangan", "Tanggal", "Catatan"],
          tabel: [
            { tanda: "merah", isi: ["1.", "eins",   "am !!ersten!!",  "bukan ~~einten~~"] },
            { tanda: "merah", isi: ["3.", "drei",   "am !!dritten!!", "bukan ~~dreiten~~"] },
            { tanda: "merah", isi: ["7.", "sieben", "am !!siebten!!", "„en“ dari sieben hilang"] },
            { tanda: "merah", isi: ["8.", "acht",   "am !!achten!!",  "cukup satu t, bukan ~~achtten~~"] }
          ] },
        { catatan: "Angka yang mirip tetap **beraturan**: 13. dreizehn**ten** · 17. siebzehn**ten** · 18. achtzehn**ten**", jenis: "tips", bertahap: true }
      ]
    },

    {
      judul: "20 ke atas: angka + sten",
      isi: [
        { aturan: ["Mulai angka **20** → tambahkan akhiran **-sten**"] },
        { kolom: ["Angka", "Bilangan", "Tanggal"],
          tabel: [
            ["20.", "zwanzig",          "am zwanzig**sten**"],
            ["21.", "einundzwanzig",    "am einundzwanzig**sten**"],
            ["23.", "dreiundzwanzig",   "am dreiundzwanzig**sten**"],
            ["27.", "siebenundzwanzig", "am siebenundzwanzig**sten**"],
            ["30.", "dreißig",          "am dreißig**sten**"],
            ["31.", "einunddreißig",    "am einunddreißig**sten**"]
          ] },
        { catatan: "Di atas 20 tidak ada bentuk tak beraturan lagi: 21. = einundzwanzig**sten**, bukan ~~einundzwanzigersten~~.", jenis: "tips", bertahap: true }
      ]
    },

    {
      judul: "Menulis tanggal: pakai titik",
      isi: [
        "Di tulisan, bilangan tingkat ditandai dengan **titik** setelah angka. Titik itu dibaca sebagai **-ten / -sten**.",
        { kolom: ["Ditulis", "Dibaca"],
          tabel: [
            ["am 1. Mai",       "am !!ersten!! Mai"],
            ["am 3. Oktober",   "am !!dritten!! Oktober"],
            ["am 8. März",      "am !!achten!! März"],
            ["am 14. Februar",  "am vierzehnten Februar"],
            ["am 21. Dezember", "am einundzwanzigsten Dezember"]
          ] },
        { catatan: "Tanggal lengkap juga ditulis dengan titik: **03.10.** = am dritten Oktober. (Orang Jerman juga sering bilang: „am dritten Zehnten“ — bulan pun jadi bilangan tingkat.)", jenis: "info", hanya: "belajar" }
      ]
    },

    {
      judul: "Die Monate — 12 bulan",
      isi: [
        { kata: [
          ["Januar", "Januari"],  ["Februar", "Februari"], ["März", "Maret"],
          ["April", "April"],     ["Mai", "Mei"],          ["Juni", "Juni"],
          ["Juli", "Juli"],       ["August", "Agustus"],   ["September", "September"],
          ["Oktober", "Oktober"], ["November", "November"], ["Dezember", "Desember"]
        ] },
        { catatan: "Bulan saja → **im** Mai. Dengan tanggal → **am** ersten Mai.", jenis: "penting", bertahap: true },
        { contoh: [
          { de: "Ich habe **im** Mai Geburtstag.", id: "Aku ulang tahun di bulan Mei." },
          { de: "Ich habe **am** !!ersten!! Mai Geburtstag.", id: "Aku ulang tahun tanggal satu Mei." }
        ], bertahap: true }
      ]
    },

    {
      judul: "Ayo bicara: Wann …?",
      isi: [
        { contoh: [
          { de: "Wann hast du Geburtstag? — Am !!dritten!! März.", id: "Kapan kamu ulang tahun? — Tanggal tiga Maret." },
          { de: "Wann ist die Party? — Am zwanzigsten Juli.", id: "Kapan pestanya? — Tanggal dua puluh Juli." },
          { de: "Wann beginnt der Deutschkurs? — Am !!ersten!! September.", id: "Kapan kursus bahasa Jermannya mulai? — Tanggal satu September." },
          { de: "Wann ist das Konzert? — Am !!siebten!! Juni.", id: "Kapan konsernya? — Tanggal tujuh Juni." }
        ] },
        { catatan: "Sekarang giliranmu: **Wann hast du Geburtstag?**", jenis: "tips", hanya: "presentasi", bertahap: true }
      ]
    },

    {
      judul: "Daftar lengkap 1. – 31.",
      hanya: "belajar",
      isi: [
        "Untuk mencontek kalau ragu. Yang merah adalah 4 bentuk tak beraturan.",
        { lipat: "Lihat daftar lengkap", kecil: true, kata: [
          ["am !!ersten!!", "1."],             ["am zweiten", "2."],            ["am !!dritten!!", "3."],
          ["am vierten", "4."],                ["am fünften", "5."],            ["am sechsten", "6."],
          ["am !!siebten!!", "7."],            ["am !!achten!!", "8."],         ["am neunten", "9."],
          ["am zehnten", "10."],               ["am elften", "11."],            ["am zwölften", "12."],
          ["am dreizehnten", "13."],           ["am vierzehnten", "14."],       ["am fünfzehnten", "15."],
          ["am sechzehnten", "16."],           ["am siebzehnten", "17."],       ["am achtzehnten", "18."],
          ["am neunzehnten", "19."],           ["am zwanzigsten", "20."],       ["am einundzwanzigsten", "21."],
          ["am zweiundzwanzigsten", "22."],    ["am dreiundzwanzigsten", "23."], ["am vierundzwanzigsten", "24."],
          ["am fünfundzwanzigsten", "25."],    ["am sechsundzwanzigsten", "26."], ["am siebenundzwanzigsten", "27."],
          ["am achtundzwanzigsten", "28."],    ["am neunundzwanzigsten", "29."], ["am dreißigsten", "30."],
          ["am einunddreißigsten", "31."]
        ] }
      ]
    }
  ],

  /* ==============================================================
     LATIHAN
     Dua jenis soal dipakai di topik ini:

     1) ISIAN  — murid mengetik jawaban di titik-titik (___)
        {
          tipe: "isi",
          perintah: "Tulis tanggalnya dengan huruf.",   // instruksi (boleh dihapus)
          petunjuk: "1. Mai",                           // label kecil di atas soal (boleh dihapus)
          soal: "am ___ Mai",
          jawaban: "ersten",
          kalimat: "am !!ersten!! Mai",   // (boleh dihapus) kalimat lengkap berwarna untuk umpan balik
          arti: "tanggal satu Mei",       // terjemahan, tampil setelah menjawab
          penjelasan: "…",                // penjelasan langkah demi langkah kalau salah
          jikaMenjawab: {                 // (boleh dihapus) tanggapan khusus untuk jawaban tertentu
            "einten": "1 = ersten, bukan einten. …"
          }
        }
        • Dua titik-titik → dua jawaban:  jawaban: ["hole", "ab"]
        • Beberapa jawaban sama-sama benar → pisahkan dengan |
          contoh: jawaban: "siebten|siebenten"
        • "ss" otomatis diterima untuk "ß", "ae/oe/ue" untuk "ä/ö/ü".

     2) PILIHAN GANDA — murid mengetuk salah satu jawaban
        {
          tipe: "pilih",
          petunjuk: "3. Oktober",
          soal: "Die Party ist am ___ Oktober.",
          pilihan: ["dritten", "dreiten", "dreisten"],   // urutan diacak otomatis
          jawaban: "dritten",                            // harus sama persis dengan salah satu pilihan
          arti: "…", penjelasan: "…", jikaMenjawab: { … }
        }
     ============================================================== */
  latihan: [
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "4. Juli",
      soal: "am ___ Juli",
      jawaban: "vierten",
      arti: "tanggal empat Juli",
      penjelasan: "4 ada di antara 1–19 → pakai **-ten**. Jadi: vier + ten = **vierten**.",
      jikaMenjawab: {
        "viersten": "Akhiran -sten hanya untuk angka 20 ke atas.",
        "vierte": "Setelah **am**, akhirannya selalu **-en**: am vierte**n**."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "1. Mai",
      soal: "am ___ Mai",
      jawaban: "ersten",
      kalimat: "am !!ersten!! Mai",
      arti: "tanggal satu Mei",
      penjelasan: "Rumus biasa (angka + ten) tidak berlaku untuk 1. Hafalkan 4 bentuk tak beraturan: am !!ersten!! (1.) · am !!dritten!! (3.) · am !!siebten!! (7.) · am !!achten!! (8.)",
      jikaMenjawab: {
        "einten": "1 = **ersten**, bukan einten. Ini salah satu dari 4 bentuk tak beraturan.",
        "einsten": "1 = **ersten**, bukan einsten. Ini salah satu dari 4 bentuk tak beraturan.",
        "eins": "Tanggal selalu memakai bilangan tingkat, bukan angka biasa: 1. = **ersten**.",
        "erste": "Setelah **am**, akhirannya selalu **-en**: am erste**n**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang benar.",
      petunjuk: "3. Oktober",
      soal: "Die Party ist am ___ Oktober.",
      pilihan: ["dritten", "dreiten", "dreisten"],
      jawaban: "dritten",
      kalimat: "Die Party ist am !!dritten!! Oktober.",
      arti: "Pestanya tanggal tiga Oktober.",
      penjelasan: "Rumus biasa (angka + ten) tidak berlaku untuk 3. Hafalkan 4 bentuk tak beraturan: am !!ersten!! (1.) · am !!dritten!! (3.) · am !!siebten!! (7.) · am !!achten!! (8.)",
      jikaMenjawab: {
        "dreiten": "3 = **dritten**, bukan dreiten. Ini salah satu dari 4 bentuk tak beraturan.",
        "dreisten": "Akhiran -sten hanya untuk 20 ke atas — dan 3 memang tidak beraturan: **dritten**."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "12. Februar",
      soal: "am ___ Februar",
      jawaban: "zwölften",
      arti: "tanggal dua belas Februari",
      penjelasan: "12 ada di antara 1–19 → pakai **-ten**. Jadi: zwölf + ten = **zwölften**.",
      jikaMenjawab: {
        "zwölfsten": "Akhiran -sten hanya untuk angka 20 ke atas. 12 → zwölf + ten."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang benar.",
      petunjuk: "7. Juni",
      soal: "Das Konzert ist am ___ Juni.",
      pilihan: ["siebten", "siebsten", "sieben"],
      jawaban: "siebten",
      kalimat: "Das Konzert ist am !!siebten!! Juni.",
      arti: "Konsernya tanggal tujuh Juni.",
      penjelasan: "7 tidak ikut rumus biasa: „en“ dari sieben hilang → sieb + ten = **siebten**. Hafalkan 4 bentuk tak beraturan: am !!ersten!! (1.) · am !!dritten!! (3.) · am !!siebten!! (7.) · am !!achten!! (8.)",
      jikaMenjawab: {
        "siebsten": "Akhiran -sten hanya untuk 20 ke atas. 7 tidak beraturan: **siebten**.",
        "sieben": "Tanggal selalu memakai bilangan tingkat, bukan angka biasa. 7 = **siebten**."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "20. August",
      soal: "am ___ August",
      jawaban: "zwanzigsten",
      arti: "tanggal dua puluh Agustus",
      penjelasan: "Mulai angka 20 → pakai **-sten**. Jadi: zwanzig + sten = **zwanzigsten**.",
      jikaMenjawab: {
        "zwanzigten": "Mulai angka 20 akhirannya **-sten**, bukan -ten."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang benar.",
      petunjuk: "8. März",
      soal: "Wir fliegen am ___ März nach Berlin.",
      pilihan: ["achten", "achtten", "achtsten"],
      jawaban: "achten",
      kalimat: "Wir fliegen am !!achten!! März nach Berlin.",
      arti: "Kami terbang ke Berlin tanggal delapan Maret.",
      penjelasan: "8 tidak ikut rumus biasa: acht sudah berakhiran t, jadi cukup satu t → **achten**. Hafalkan 4 bentuk tak beraturan: am !!ersten!! (1.) · am !!dritten!! (3.) · am !!siebten!! (7.) · am !!achten!! (8.)",
      jikaMenjawab: {
        "achtten": "8 = **achten**, bukan achtten — cukup satu t. Ini salah satu dari 4 bentuk tak beraturan.",
        "achtsten": "Akhiran -sten hanya untuk 20 ke atas. 8 = **achten**."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "3. Mai",
      soal: "am ___ Mai",
      jawaban: "dritten",
      kalimat: "am !!dritten!! Mai",
      arti: "tanggal tiga Mei",
      penjelasan: "Rumus biasa (angka + ten) tidak berlaku untuk 3. Hafalkan 4 bentuk tak beraturan: am !!ersten!! (1.) · am !!dritten!! (3.) · am !!siebten!! (7.) · am !!achten!! (8.)",
      jikaMenjawab: {
        "dreiten": "3 = **dritten**, bukan dreiten. Ini salah satu dari 4 bentuk tak beraturan.",
        "dreitten": "3 = **dritten**, bukan dreitten. Ini salah satu dari 4 bentuk tak beraturan.",
        "dreisten": "Akhiran -sten hanya untuk 20 ke atas — dan 3 tidak beraturan: **dritten**.",
        "dritte": "Setelah **am**, akhirannya selalu **-en**: am dritte**n**."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "15. Januar",
      soal: "am ___ Januar",
      jawaban: "fünfzehnten",
      arti: "tanggal lima belas Januari",
      penjelasan: "15 ada di antara 1–19 → pakai **-ten**. Jadi: fünfzehn + ten = **fünfzehnten**.",
      jikaMenjawab: {
        "fünfzehnsten": "Akhiran -sten hanya untuk angka 20 ke atas. 15 → fünfzehn + ten."
      }
    },
    {
      tipe: "pilih",
      perintah: "Bagaimana cara membacanya?",
      petunjuk: "am 23. Juni",
      soal: "",
      pilihan: ["am dreiundzwanzigsten Juni", "am dreiundzwanzigten Juni", "am dreiundzwanzig Juni"],
      jawaban: "am dreiundzwanzigsten Juni",
      arti: "tanggal dua puluh tiga Juni",
      penjelasan: "23 ada di atas 20 → pakai **-sten**: dreiundzwanzig + sten. Bentuk tak beraturan (dritten) tidak dipakai di atas 20.",
      jikaMenjawab: {
        "am dreiundzwanzigten Juni": "Mulai angka 20 akhirannya **-sten**, bukan -ten.",
        "am dreiundzwanzig Juni": "Tanggal selalu memakai bilangan tingkat — titik setelah 23 dibaca **-sten**."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "8. Oktober",
      soal: "am ___ Oktober",
      jawaban: "achten",
      kalimat: "am !!achten!! Oktober",
      arti: "tanggal delapan Oktober",
      penjelasan: "8 tidak ikut rumus biasa: acht sudah berakhiran t, jadi cukup satu t → **achten**. Hafalkan 4 bentuk tak beraturan: am !!ersten!! (1.) · am !!dritten!! (3.) · am !!siebten!! (7.) · am !!achten!! (8.)",
      jikaMenjawab: {
        "achtten": "8 = **achten**, bukan achtten — cukup satu t. Ini salah satu dari 4 bentuk tak beraturan.",
        "achtsten": "Akhiran -sten hanya untuk 20 ke atas. 8 = **achten**.",
        "achte": "Setelah **am**, akhirannya selalu **-en**: am achte**n**."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "21. Dezember",
      soal: "am ___ Dezember",
      jawaban: "einundzwanzigsten",
      arti: "tanggal dua puluh satu Desember",
      penjelasan: "21 ada di atas 20 → pakai **-sten**: einundzwanzig + sten = **einundzwanzigsten**. Di atas 20 tidak ada bentuk tak beraturan.",
      jikaMenjawab: {
        "einundzwanzigersten": "Di atas 20 bentuk tak beraturan (ersten) tidak dipakai. 21 = einundzwanzig + **sten**.",
        "einundzwanzigten": "Mulai angka 20 akhirannya **-sten**, bukan -ten."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang benar.",
      petunjuk: "1. Januar",
      soal: "Am ___ Januar ist Neujahr.",
      pilihan: ["ersten", "einten", "einsten"],
      jawaban: "ersten",
      kalimat: "Am !!ersten!! Januar ist Neujahr.",
      arti: "Tanggal satu Januari adalah Tahun Baru.",
      penjelasan: "Rumus biasa (angka + ten) tidak berlaku untuk 1. Hafalkan 4 bentuk tak beraturan: am !!ersten!! (1.) · am !!dritten!! (3.) · am !!siebten!! (7.) · am !!achten!! (8.)",
      jikaMenjawab: {
        "einten": "1 = **ersten**, bukan einten. Ini salah satu dari 4 bentuk tak beraturan.",
        "einsten": "1 = **ersten**, bukan einsten. Ini salah satu dari 4 bentuk tak beraturan."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "7. September",
      soal: "am ___ September",
      jawaban: "siebten|siebenten",
      kalimat: "am !!siebten!! September",
      arti: "tanggal tujuh September",
      penjelasan: "7 tidak ikut rumus biasa: „en“ dari sieben hilang → sieb + ten = **siebten**. Hafalkan 4 bentuk tak beraturan: am !!ersten!! (1.) · am !!dritten!! (3.) · am !!siebten!! (7.) · am !!achten!! (8.)",
      jikaMenjawab: {
        "siebenten": "Bentuk ini ada, tapi kuno. Yang dipakai sekarang (dan di ujian A1): **siebten**.",
        "siebsten": "Akhiran -sten hanya untuk 20 ke atas. 7 tidak beraturan: **siebten**.",
        "siebte": "Setelah **am**, akhirannya selalu **-en**: am siebte**n**."
      }
    },
    {
      tipe: "pilih",
      perintah: "im atau am?",
      soal: "Ich habe ___ Mai Geburtstag.",
      pilihan: ["im", "am"],
      jawaban: "im",
      acak: false,
      kalimat: "Ich habe **im** Mai Geburtstag.",
      arti: "Aku ulang tahun di bulan Mei.",
      penjelasan: "Hanya bulan, tanpa tanggal → **im** Mai. Kalau ada tanggal → **am** ersten Mai."
    },
    {
      tipe: "pilih",
      perintah: "im atau am?",
      soal: "Ich habe ___ 5. Mai Geburtstag.",
      pilihan: ["im", "am"],
      jawaban: "am",
      acak: false,
      kalimat: "Ich habe **am** fünften Mai Geburtstag.",
      arti: "Aku ulang tahun tanggal lima Mei.",
      penjelasan: "Ada tanggal → **am**. Dibaca: am fünften Mai."
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "30. April",
      soal: "am ___ April",
      jawaban: "dreißigsten",
      arti: "tanggal tiga puluh April",
      penjelasan: "Mulai angka 20 → pakai **-sten**. Jadi: dreißig + sten = **dreißigsten**.",
      jikaMenjawab: {
        "dreißigten": "Mulai angka 20 akhirannya **-sten**, bukan -ten."
      }
    },
    {
      tipe: "isi",
      perintah: "Tulis tanggalnya dengan huruf.",
      petunjuk: "17. März",
      soal: "am ___ März",
      jawaban: "siebzehnten",
      arti: "tanggal tujuh belas Maret",
      penjelasan: "17 beraturan: siebzehn + ten = **siebzehnten**. Yang tidak beraturan hanya 7 sendirian (siebten).",
      jikaMenjawab: {
        "siebzehnsten": "Akhiran -sten hanya untuk angka 20 ke atas. 17 → siebzehn + ten.",
        "siebenzehnten": "Angkanya ditulis **siebzehn** (tanpa -en), jadi: siebzehn + ten = siebzehnten."
      }
    }
  ]
};
