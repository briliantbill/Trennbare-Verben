/* ================================================================
   TOPIK 2 — PRÄTERITUM: haben & sein
   ================================================================
   Isi file ini: materi (kartu Mode Belajar + slide Mode Presentasi)
   dan latihan (soal Mode Belajar).

   Cara mengedit dan contoh lengkap: lihat komentar di atas file
   js/data/ordinalzahlen.js dan README.md.

   KODE WARNA
     *hatte* *kann*  oranye         kata kerja (hatte) · Modalverb (kann)
     *hatte**st***  kata kerja oranye dengan akhiran tebal (hatte + st)
     [ab]         kotak oranye   awalan trennbar
     {dich}       biru           pronomen Akkusativ
     !!ersten!!   merah          bentuk tak beraturan
     ~~habe~~     dicoret        bentuk yang salah
     **teks**     huruf tebal
     ___          titik-titik (tempat jawaban di soal)

   BLOK KHUSUS DI TOPIK INI: "sekarang → dulu"
     { ubah: [
         { dari: "Ich *habe* keine Zeit.", ke: "Ich *hatte* keine Zeit.", id: "terjemahan" }
       ],
       label: ["Sekarang", "Dulu"] }          // label boleh dihapus
     Di Mode Presentasi, kalimat "dulu" baru muncul setelah diklik
     (murid bisa menebak dulu). Tidak mau begitu? Tambahkan bertahap: false
   ================================================================ */

var TOPIK = TOPIK || {};   // ← baris ini jangan dihapus

TOPIK.praeteritum = {
  nomor: 2,
  ikon: "🕰️",
  judul: "Präteritum: haben & sein",
  judulPendek: "Präteritum",
  subjudul: "Ich *hatte* … · Ich *war* …",
  ringkas: "Bercerita tentang masa lalu dengan dua kata kerja terpenting. Kabar baik: bentuk ich dan er/es/sie selalu sama.",

  /* ==============================================================
     MATERI
     ============================================================== */
  materi: [
    {
      judul: "Dulu: *hatte* & *war*",
      isi: [
        "**Präteritum** adalah bentuk lampau. Dipakai untuk bercerita tentang kemarin, minggu lalu, atau liburan.",
        { ubah: [
          { dari: "Ich *habe* keine Zeit.", ke: "Ich *hatte* keine Zeit.", id: "Aku (waktu itu) tidak punya waktu." },
          { dari: "Ich *bin* in Hamburg.",  ke: "Ich *war* in Hamburg.",   id: "Aku (dulu) ada di Hamburg." }
        ] },
        { catatan: "Untuk A1 cukup **dua kata kerja** ini: haben → *hatte*, sein → *war*.", jenis: "penting", bertahap: true }
      ]
    },

    {
      judul: "haben → *hatte*",
      isi: [
        "Dasarnya **hatte**. Lalu tambahkan akhiran sesuai subjek.",
        { kolom: ["Subjek", "Sekarang", "Dulu (Präteritum)"],
          tabel: [
            { tanda: "sama", isi: ["ich",       "habe",  "*hatte*"] },
            [                     "du",         "hast",  "*hatte**st***"],
            { tanda: "sama", isi: ["er/es/sie", "hat",   "*hatte*"] },
            [                     "wir",        "haben", "*hatte**n***"],
            [                     "ihr",        "habt",  "*hatte**t***"],
            [                     "sie/Sie",    "haben", "*hatte**n***"]
          ] },
        { catatan: "Lihat baris kuning: **ich hatte = er hatte**. Sama persis!", jenis: "tips", bertahap: true }
      ]
    },

    {
      judul: "sein → *war*",
      isi: [
        "Dasarnya **war**. Lalu tambahkan akhiran sesuai subjek.",
        { kolom: ["Subjek", "Sekarang", "Dulu (Präteritum)"],
          tabel: [
            { tanda: "sama", isi: ["ich",       "bin",  "*war*"] },
            [                     "du",         "bist", "*war**st***"],
            { tanda: "sama", isi: ["er/es/sie", "ist",  "*war*"] },
            [                     "wir",        "sind", "*war**en***"],
            [                     "ihr",        "seid", "*war**t***"],
            [                     "sie/Sie",    "sind", "*war**en***"]
          ] },
        { catatan: "Lihat baris kuning: **ich war = er war**. Sama persis!", jenis: "tips", bertahap: true }
      ]
    },

    {
      judul: "Trik: ich = er/es/sie",
      isi: [
        "Bentuk **ich** dan **er/es/sie** selalu **sama persis** — tanpa akhiran apa pun.",
        { kolom: ["Subjek", "haben (lampau)", "sein (lampau)", "können (sekarang)"],
          tabel: [
            { tanda: "sama", isi: ["ich",       "*hatte*",       "*war*",       "*kann*"] },
            [                     "du",         "*hatte**st***", "*war**st***", "*kann**st***"],
            { tanda: "sama", isi: ["er/es/sie", "*hatte*",       "*war*",       "*kann*"] },
            [                     "wir",        "*hatte**n***",  "*war**en***", "*könn**en***"],
            [                     "ihr",        "*hatte**t***",  "*war**t***",  "*könn**t***"],
            [                     "sie/Sie",    "*hatte**n***",  "*war**en***", "*könn**en***"]
          ] },
        { catatan: "Pola ini sama dengan **Modalverben** yang sudah kamu pelajari: ich *kann* = er *kann*, ich *will* = er *will*, ich *muss* = er *muss*.", jenis: "hubung", bertahap: true },
        { catatan: "Akhiran yang perlu diingat hanya: du **-st** · wir **-(e)n** · ihr **-t** · sie/Sie **-(e)n**. hatte sudah berakhiran e → cukup + n: hatte**n**. war → + en: war**en**.", jenis: "penting", bertahap: true }
      ]
    },

    {
      judul: "Sekarang → dulu",
      isi: [
        { teks: "Tebak dulu bentuk lampaunya — klik untuk melihat jawabannya.", hanya: "presentasi" },
        { ubah: [
          { dari: "Wir *haben* Hunger.",      ke: "Wir *hatten* Hunger.",      id: "Kami (tadi) lapar." },
          { dari: "*Bist* du krank?",         ke: "*Warst* du krank?",         id: "Apakah kamu (kemarin) sakit?" },
          { dari: "Ihr *habt* Glück.",        ke: "Ihr *hattet* Glück.",       id: "Kalian (waktu itu) beruntung." },
          { dari: "Das Wetter *ist* schön.",  ke: "Das Wetter *war* schön.",   id: "Cuacanya (waktu itu) cerah." }
        ] },
        { catatan: "Hanya kata kerjanya yang berubah. Posisinya tetap: posisi 2 di kalimat biasa, posisi 1 di pertanyaan ja/nein.", jenis: "info", bertahap: true }
      ]
    },

    {
      judul: "Kapan? Kata penanda waktu",
      isi: [
        "Kata-kata ini menandakan bahwa ceritanya sudah lewat:",
        { kata: [
          ["gestern", "kemarin"], ["vorgestern", "kemarin lusa"], ["letzte Woche", "minggu lalu"],
          ["letzten Monat", "bulan lalu"], ["letztes Jahr", "tahun lalu"], ["früher", "dulu"]
        ] },
        { contoh: [
          { de: "Gestern *war* ich im Kino.", id: "Kemarin aku ke bioskop." },
          { de: "Letzte Woche *hatte* ich keine Zeit.", id: "Minggu lalu aku tidak punya waktu." }
        ] },
        { catatan: "Kalau kata waktu di depan, kata kerja tetap di **posisi 2**: Gestern *war* ich …", jenis: "info", bertahap: true }
      ]
    },

    {
      judul: "Ayo bicara: Wo *warst* du?",
      isi: [
        { contoh: [
          { de: "Wo *warst* du gestern? — Ich *war* im Kino.", id: "Kemarin kamu di mana? — Aku di bioskop." },
          { de: "*Hattest* du am Wochenende Zeit? — Nein, ich *hatte* keine Zeit.", id: "Akhir pekan kemarin kamu ada waktu? — Tidak, aku tidak punya waktu." },
          { de: "Wie *war* der Urlaub? — Er *war* super!", id: "Bagaimana liburannya? — Seru sekali!" },
          { de: "*Wart* ihr schon in Berlin? — Ja, wir *waren* letztes Jahr dort.", id: "Kalian sudah pernah ke Berlin? — Ya, kami ke sana tahun lalu." }
        ] },
        { catatan: "Sekarang giliranmu: **Wo warst du gestern?**", jenis: "tips", hanya: "presentasi", bertahap: true }
      ]
    }
  ],

  /* ==============================================================
     LATIHAN
     Format soal sama seperti Topik 1 (lihat js/data/ordinalzahlen.js):
       tipe: "isi"   → ketik jawaban di ___
       tipe: "pilih" → ketuk salah satu pilihan
     Untuk soal "ubah ke lampau", taruh kalimat sekarang di "petunjuk".
     ============================================================== */
  latihan: [
    {
      tipe: "isi",
      perintah: "Isi dengan bentuk Präteritum.",
      petunjuk: "haben",
      soal: "Ich ___ keine Zeit.",
      jawaban: "hatte",
      kalimat: "Ich *hatte* keine Zeit.",
      arti: "Aku (waktu itu) tidak punya waktu.",
      penjelasan: "Subjek **ich** → tanpa akhiran. haben → **hatte**. (Ingat: ich hatte = er hatte.)",
      jikaMenjawab: {
        "habe": "habe adalah bentuk **sekarang**. Bentuk lampaunya: **hatte**.",
        "hattest": "hattest untuk **du**. Untuk ich tanpa akhiran: **hatte**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ubah ke bentuk lampau.",
      petunjuk: "Ich *bin* in Hamburg.",
      soal: "Ich ___ in Hamburg.",
      jawaban: "war",
      kalimat: "Ich *war* in Hamburg.",
      arti: "Aku (dulu) ada di Hamburg.",
      penjelasan: "bin → bentuk lampau dari sein. Subjek **ich** → tanpa akhiran: **war**.",
      jikaMenjawab: {
        "bin": "bin adalah bentuk **sekarang**. Lampaunya: **war**.",
        "warst": "warst untuk **du**. Untuk ich tanpa akhiran: **war**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi dengan bentuk Präteritum.",
      petunjuk: "haben",
      soal: "Du ___ gestern Geburtstag.",
      jawaban: "hattest",
      kalimat: "Du *hattest* gestern Geburtstag.",
      arti: "Kemarin kamu ulang tahun.",
      penjelasan: "Subjek **du** → akhiran **-st**. hatte + st = **hattest**.",
      jikaMenjawab: {
        "hatte": "Untuk **du** selalu ada akhiran **-st**: hatte**st**.",
        "hast": "hast adalah bentuk **sekarang**. Lampaunya: hatte + st = **hattest**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang benar.",
      soal: "Wo ___ du gestern?",
      pilihan: ["warst", "war", "wart"],
      jawaban: "warst",
      kalimat: "Wo *warst* du gestern?",
      arti: "Kemarin kamu di mana?",
      penjelasan: "Subjek **du** → akhiran **-st**. war + st = **warst**.",
      jikaMenjawab: {
        "war": "war untuk **ich** dan **er/es/sie**. Untuk du: war + st = **warst**.",
        "wart": "wart untuk **ihr**. Untuk du: war + st = **warst**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi dengan bentuk Präteritum.",
      petunjuk: "sein",
      soal: "Wir ___ letzte Woche im Urlaub.",
      jawaban: "waren",
      kalimat: "Wir *waren* letzte Woche im Urlaub.",
      arti: "Minggu lalu kami sedang liburan.",
      penjelasan: "Subjek **wir** → akhiran **-en**. war + en = **waren**.",
      jikaMenjawab: {
        "war": "Untuk **wir** ada akhiran **-en**: war**en**.",
        "sind": "sind adalah bentuk **sekarang**. Lampaunya: **waren**.",
        "wart": "wart untuk **ihr**. Untuk wir: **waren**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ubah ke bentuk lampau.",
      petunjuk: "Wir *haben* Hunger.",
      soal: "Wir ___ Hunger.",
      jawaban: "hatten",
      kalimat: "Wir *hatten* Hunger.",
      arti: "Kami (tadi) lapar.",
      penjelasan: "Subjek **wir** → akhiran **-(e)n**. hatte sudah berakhiran e, jadi cukup + n = **hatten**.",
      jikaMenjawab: {
        "hatte": "Untuk **wir** ada akhiran: hatte**n**.",
        "haben": "haben adalah bentuk **sekarang**. Lampaunya: **hatten**.",
        "hattet": "hattet untuk **ihr**. Untuk wir: **hatten**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi dengan bentuk Präteritum.",
      petunjuk: "sein",
      soal: "Er ___ gestern krank.",
      jawaban: "war",
      kalimat: "Er *war* gestern krank.",
      arti: "Kemarin dia sakit.",
      penjelasan: "Subjek **er** → sama seperti ich, tanpa akhiran: **war**.",
      jikaMenjawab: {
        "ist": "ist adalah bentuk **sekarang**. Lampaunya: **war**.",
        "warst": "warst untuk **du**. Untuk er sama seperti ich: **war**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ubah ke bentuk lampau.",
      petunjuk: "*Bist* du müde?",
      soal: "___ du müde?",
      jawaban: "Warst",
      kalimat: "*Warst* du müde?",
      arti: "Apakah kamu (tadi) capek?",
      penjelasan: "Subjek **du** → akhiran **-st**: war + st = **Warst**. Di pertanyaan ja/nein, kata kerja ada di posisi 1 (huruf besar).",
      jikaMenjawab: {
        "bist": "bist adalah bentuk **sekarang**. Lampaunya: **Warst**.",
        "war": "Untuk **du** selalu ada akhiran **-st**: War**st**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi dengan bentuk Präteritum.",
      petunjuk: "haben",
      soal: "Ihr ___ keine Zeit.",
      jawaban: "hattet",
      kalimat: "Ihr *hattet* keine Zeit.",
      arti: "Kalian (waktu itu) tidak punya waktu.",
      penjelasan: "Subjek **ihr** → akhiran **-t**. hatte + t = **hattet**.",
      jikaMenjawab: {
        "hatten": "hatten untuk **wir** dan **sie/Sie**. Untuk ihr: hatte + t = **hattet**.",
        "habt": "habt adalah bentuk **sekarang**. Lampaunya: **hattet**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang benar.",
      soal: "Ich ___ keine Lust.",
      pilihan: ["hatte", "hattest", "hatten"],
      jawaban: "hatte",
      kalimat: "Ich *hatte* keine Lust.",
      arti: "Aku (waktu itu) sedang tidak mood.",
      penjelasan: "Subjek **ich** → tanpa akhiran: **hatte**.",
      jikaMenjawab: {
        "hattest": "hattest untuk **du**. Untuk ich tanpa akhiran: **hatte**.",
        "hatten": "hatten untuk **wir** dan **sie/Sie**. Untuk ich tanpa akhiran: **hatte**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ubah ke bentuk lampau.",
      petunjuk: "Ihr *seid* im Kino.",
      soal: "Ihr ___ im Kino.",
      jawaban: "wart",
      kalimat: "Ihr *wart* im Kino.",
      arti: "Kalian (tadi) di bioskop.",
      penjelasan: "Subjek **ihr** → akhiran **-t**. war + t = **wart**.",
      jikaMenjawab: {
        "wartet": "Hati-hati: **wartet** artinya \"menunggu\" (warten). Lampau dari seid: war + t = **wart**.",
        "waren": "waren untuk **wir** dan **sie/Sie**. Untuk ihr: war + t = **wart**.",
        "seid": "seid adalah bentuk **sekarang**. Lampaunya: **wart**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi dengan bentuk Präteritum.",
      petunjuk: "sein",
      soal: "Das Wetter ___ super.",
      jawaban: "war",
      kalimat: "Das Wetter *war* super.",
      arti: "Cuacanya (waktu itu) bagus sekali.",
      penjelasan: "**Das Wetter** = es. Untuk es sama seperti ich, tanpa akhiran: **war**.",
      jikaMenjawab: {
        "waren": "Das Wetter hanya satu (= es), bukan jamak. Jadi: **war**.",
        "ist": "ist adalah bentuk **sekarang**. Lampaunya: **war**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ubah ke bentuk lampau.",
      petunjuk: "*Hast* du Zeit?",
      soal: "___ du Zeit?",
      jawaban: "Hattest",
      kalimat: "*Hattest* du Zeit?",
      arti: "Apakah kamu (waktu itu) punya waktu?",
      penjelasan: "Subjek **du** → akhiran **-st**: hatte + st = **Hattest**. Pertanyaan ja/nein → kata kerja di posisi 1.",
      jikaMenjawab: {
        "hast": "hast adalah bentuk **sekarang**. Lampaunya: **Hattest**.",
        "hatte": "Untuk **du** selalu ada akhiran **-st**: Hatte**st**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi dengan bentuk Präteritum.",
      petunjuk: "haben",
      soal: "Meine Eltern ___ früher ein Restaurant.",
      jawaban: "hatten",
      kalimat: "Meine Eltern *hatten* früher ein Restaurant.",
      arti: "Dulu orang tuaku punya restoran.",
      penjelasan: "**Meine Eltern** = sie (jamak) → akhiran **-n**: hatte + n = **hatten**.",
      jikaMenjawab: {
        "hatte": "Meine Eltern itu jamak (= sie). Jadi ada akhiran: hatte**n**.",
        "hattet": "hattet untuk **ihr**. Meine Eltern = sie → **hatten**.",
        "haben": "haben adalah bentuk **sekarang**. Lampaunya: **hatten**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang benar.",
      soal: "Wie ___ der Urlaub?",
      pilihan: ["war", "waren", "warst"],
      jawaban: "war",
      kalimat: "Wie *war* der Urlaub?",
      arti: "Bagaimana liburannya?",
      penjelasan: "**Der Urlaub** = er. Untuk er sama seperti ich, tanpa akhiran: **war**.",
      jikaMenjawab: {
        "waren": "Der Urlaub hanya satu (= er), bukan jamak. Jadi: **war**.",
        "warst": "warst untuk **du**. Der Urlaub = er → **war**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi kedua kata kerja dalam bentuk Präteritum.",
      petunjuk: "sein · haben",
      soal: "Gestern ___ ich krank und ___ keine Energie.",
      jawaban: ["war", "hatte"],
      kalimat: "Gestern *war* ich krank und *hatte* keine Energie.",
      arti: "Kemarin aku sakit dan tidak punya tenaga.",
      penjelasan: "Subjeknya **ich** untuk kedua kata kerja → tanpa akhiran: sein → **war**, haben → **hatte**.",
      jikaMenjawab: {
        "bin": "bin adalah bentuk **sekarang**. Lampaunya: **war**.",
        "habe": "habe adalah bentuk **sekarang**. Lampaunya: **hatte**.",
        "hatte war": "Urutannya terbalik: yang pertama sein (krank sein) → **war**, yang kedua haben (Energie haben) → **hatte**."
      }
    }
  ]
};
