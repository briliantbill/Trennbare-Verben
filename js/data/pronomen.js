/* ================================================================
   TOPIK 3 — PERSONALPRONOMEN IM AKKUSATIV
   ================================================================
   Isi file ini: materi (kartu Mode Belajar + slide Mode Presentasi)
   dan latihan (soal Mode Belajar).

   Cara mengedit dan contoh lengkap: lihat komentar di atas file
   js/data/ordinalzahlen.js dan README.md.

   KODE WARNA
     *sehe*       oranye         kata kerja / Modalverb
     [ab]         kotak oranye   awalan trennbar
     {ihn}        biru           pronomen Akkusativ
     !!ersten!!   merah          bentuk tak beraturan
     ~~er~~       dicoret        bentuk yang salah
     **teks**     huruf tebal
     ___          titik-titik (tempat jawaban di soal)

   Ingat: yang berubah hanya mich, dich, ihn, uns, euch.
   Yang tetap sama: es, sie, sie, Sie. Paling penting: er → ihn.

   PERHATIAN saat menambah soal: pakai kata kerja yang diikuti
   Akkusativ (sehen, kaufen, besuchen, kennen, lieben, brauchen,
   mögen, fragen, suchen, anrufen, abholen, einladen …).
   Jangan pakai helfen, danken, gefallen — itu Dativ (ihm, ihr, mir).
   ================================================================ */

var TOPIK = TOPIK || {};   // ← baris ini jangan dihapus

TOPIK.pronomen = {
  nomor: 3,
  ikon: "👉",
  judul: "Personalpronomen im Akkusativ",
  judulPendek: "Pronomen Akk.",
  subjudul: "{mich}, {dich}, {ihn}, {uns}, {euch}",
  ringkas: "Kata ganti orang sebagai objek kalimat. Yang terpenting: er → ihn, persis seperti der → den.",

  /* ==============================================================
     MATERI
     ============================================================== */
  materi: [
    {
      judul: "Ich *sehe* {ihn}.",
      isi: [
        "**Pronomen Akkusativ** adalah kata ganti untuk **objek** — orang atau benda yang dikenai pekerjaan. Di website ini selalu berwarna **biru**.",
        { contoh: [
          { de: "Ich *lade* {dich} [ein].", id: "Aku mengundangmu." },
          { de: "*Holst* du {mich} [ab]?", id: "Kamu menjemputku?" },
          { de: "Ich *sehe* {ihn}.", id: "Aku melihatnya (dia laki-laki)." }
        ] },
        { catatan: "Subjek (yang melakukan) → Nominativ: ich, du, er … Objek (yang dikenai) → Akkusativ: {mich}, {dich}, {ihn} …", jenis: "penting", bertahap: true }
      ]
    },

    {
      judul: "Tabel lengkap",
      isi: [
        "Baris biru = bentuknya **berubah**. Baris abu-abu = **tetap sama**.",
        { kolom: ["Nominativ", "Akkusativ", "Arti"],
          tabel: [
            { tanda: "biru", isi: ["ich", "{mich}", "aku / saya"] },
            { tanda: "biru", isi: ["du",  "{dich}", "kamu"] },
            { tanda: "biru", isi: ["er",  "{ihn}",  "dia (laki-laki) · benda **der**"] },
            { tanda: "abu",  isi: ["es",  "{es}",   "dia / itu · benda **das**"] },
            { tanda: "abu",  isi: ["sie", "{sie}",  "dia (perempuan) · benda **die**"] },
            { tanda: "biru", isi: ["wir", "{uns}",  "kami / kita"] },
            { tanda: "biru", isi: ["ihr", "{euch}", "kalian"] },
            { tanda: "abu",  isi: ["sie", "{sie}",  "mereka"] },
            { tanda: "abu",  isi: ["Sie", "{Sie}",  "Anda"] }
          ] }
      ]
    },

    {
      judul: "Hanya 5 yang berubah",
      isi: [
        { kolom: ["✏️ Berubah", "= Tetap sama"],
          tabel: [
            ["ich → {mich}", "es → {es}"],
            ["du → {dich}",  "sie → {sie}"],
            ["er → {ihn}",   "sie → {sie}"],
            ["wir → {uns}",  "Sie → {Sie}"],
            ["ihr → {euch}", ""]
          ] },
        { catatan: "Cukup hafalkan lima ini: **mich · dich · ihn · uns · euch**. Sisanya tidak berubah.", jenis: "tips", bertahap: true }
      ]
    },

    {
      judul: "Paling penting: er → {ihn}",
      isi: [
        "Kamu sudah tahu aturan ini: di Akkusativ **hanya maskulin yang berubah**. Sekarang pronomennya juga ikut.",
        { kolom: ["Nominativ (maskulin)", "Akkusativ"],
          tabel: [
            ["der Hund",  "de**n** Hund"],
            ["ein Hund",  "ein**en** Hund"],
            ["mein Hund", "mein**en** Hund"],
            { tanda: "biru", isi: ["er", "{ihn}"] }
          ] },
        { catatan: "Trik: de**n** → {ih**n**}. Keduanya berakhiran **-n**.", jenis: "hubung", bertahap: true },
        { catatan: "Feminin, neutral, dan plural tetap sama: die → die · das → das · sie → sie · es → es", jenis: "info", bertahap: true }
      ]
    },

    {
      judul: "Kata benda → pronomen",
      isi: [
        { teks: "Tebak dulu pronomennya — klik untuk melihat jawabannya.", hanya: "presentasi" },
        { ubah: [
          { dari: "Ich *sehe* den Hund.",         ke: "Ich *sehe* {ihn}.",  id: "Aku melihatnya." },
          { dari: "Ich *kaufe* die Tasche.",      ke: "Ich *kaufe* {sie}.", id: "Aku membelinya." },
          { dari: "Ich *nehme* das Auto.",        ke: "Ich *nehme* {es}.",  id: "Aku memakainya (mobil itu)." },
          { dari: "Ich *besuche* meine Eltern.",  ke: "Ich *besuche* {sie}.", id: "Aku mengunjungi mereka." }
        ], label: ["Kata benda", "Pronomen"] },
        { catatan: "Lihat artikelnya: **den** → {ihn} · **die** → {sie} · **das** → {es} · plural → {sie}. Benda juga begitu: der Computer → {ihn}, bukan ~~es~~!", jenis: "tips", bertahap: true }
      ]
    },

    {
      judul: "Contoh kalimat",
      isi: [
        { contoh: [
          { de: "Ich *liebe* {dich}.", id: "Aku mencintaimu." },
          { de: "Ich *rufe* {euch} morgen [an].", id: "Aku menelepon kalian besok." },
          { de: "*Besuchst* du {uns} morgen?", id: "Kamu mengunjungi kami besok?" }
        ] },
        { contoh: [
          { de: "*Kennst* du Paul? — Ja, ich *kenne* {ihn}.", id: "Kamu kenal Paul? — Ya, aku kenal dia." },
          { de: "Der Kaffee ist super. Ich *trinke* {ihn} gern.", id: "Kopinya enak sekali. Aku suka meminumnya." }
        ] }
      ]
    }
  ],

  /* ==============================================================
     LATIHAN
     Format soal sama seperti Topik 1 (lihat js/data/ordinalzahlen.js):
       tipe: "isi"   → ketik jawaban di ___
       tipe: "pilih" → ketuk salah satu pilihan
     Untuk soal "ganti kata benda", taruh kalimat aslinya di "petunjuk".
     ============================================================== */
  latihan: [
    {
      tipe: "isi",
      perintah: "Ganti kata benda dengan pronomen.",
      petunjuk: "Ich *sehe* den Hund.",
      soal: "Ich *sehe* ___.",
      jawaban: "ihn",
      kalimat: "Ich *sehe* {ihn}.",
      arti: "Aku melihatnya (anjing itu).",
      penjelasan: "der Hund → maskulin → er. Sebagai objek (Akkusativ): **ihn**. Trik: de**n** Hund → ih**n**.",
      jikaMenjawab: {
        "er": "er itu Nominativ (subjek). Sebagai objek: **ihn** — sama seperti der → den.",
        "es": "Hund itu maskulin (**der** Hund), bukan das. Jadi: **ihn**.",
        "ihm": "ihm itu Dativ (nanti di A2). Untuk Akkusativ: **ihn**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi pronomen Akkusativ yang tepat.",
      petunjuk: "du",
      soal: "Ich *liebe* ___.",
      jawaban: "dich",
      kalimat: "Ich *liebe* {dich}.",
      arti: "Aku mencintaimu.",
      penjelasan: "du sebagai objek → **dich**.",
      jikaMenjawab: {
        "du": "du itu Nominativ (subjek). Sebagai objek berubah: **dich**.",
        "dir": "dir itu Dativ. Untuk Akkusativ: **dich**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ganti kata benda dengan pronomen.",
      petunjuk: "Ich *kaufe* die Tasche.",
      soal: "Ich *kaufe* ___.",
      jawaban: "sie",
      kalimat: "Ich *kaufe* {sie}.",
      arti: "Aku membelinya (tas itu).",
      penjelasan: "die Tasche → feminin → sie. Feminin **tetap sama** di Akkusativ: **sie**.",
      jikaMenjawab: {
        "ihn": "ihn hanya untuk maskulin (der). Tasche itu **die** → **sie**.",
        "es": "es untuk das. Tasche itu **die** → **sie**.",
        "ihr": "ihr bukan Akkusativ. die Tasche → **sie** (tetap sama)."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi pronomen Akkusativ yang tepat.",
      petunjuk: "ich",
      soal: "*Holst* du ___ [ab]?",
      jawaban: "mich",
      kalimat: "*Holst* du {mich} [ab]?",
      arti: "Kamu menjemputku?",
      penjelasan: "ich sebagai objek → **mich**.",
      jikaMenjawab: {
        "ich": "ich itu Nominativ (subjek). Sebagai objek berubah: **mich**.",
        "mir": "mir itu Dativ. Untuk Akkusativ: **mich**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih pronomen yang tepat.",
      petunjuk: "der Kaffee",
      soal: "Der Kaffee ist super. Ich *trinke* ___ gern.",
      pilihan: ["ihn", "es", "sie"],
      jawaban: "ihn",
      kalimat: "Der Kaffee ist super. Ich *trinke* {ihn} gern.",
      arti: "Kopinya enak sekali. Aku suka meminumnya.",
      penjelasan: "**der** Kaffee → maskulin → Akkusativ **ihn**. Benda juga ikut artikelnya — bukan otomatis es.",
      jikaMenjawab: {
        "es": "Benda tidak otomatis es! Kaffee itu **der** Kaffee → **ihn**.",
        "sie": "sie untuk die / plural. Kaffee itu **der** Kaffee → **ihn**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ganti kata benda dengan pronomen.",
      petunjuk: "Wir *besuchen* das Museum.",
      soal: "Wir *besuchen* ___.",
      jawaban: "es",
      kalimat: "Wir *besuchen* {es}.",
      arti: "Kami mengunjunginya (museum itu).",
      penjelasan: "das Museum → neutral → es. Neutral **tetap sama** di Akkusativ: **es**.",
      jikaMenjawab: {
        "ihn": "ihn hanya untuk maskulin (der). Museum itu **das** → **es**.",
        "sie": "sie untuk die / plural. Museum itu **das** → **es**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi pronomen Akkusativ yang tepat.",
      petunjuk: "ihr",
      soal: "Wir *besuchen* ___ morgen.",
      jawaban: "euch",
      kalimat: "Wir *besuchen* {euch} morgen.",
      arti: "Kami mengunjungi kalian besok.",
      penjelasan: "ihr sebagai objek → **euch**.",
      jikaMenjawab: {
        "ihr": "ihr itu Nominativ (subjek). Sebagai objek berubah: **euch**.",
        "uns": "uns untuk **wir**. Untuk ihr: **euch**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ganti nama orang dengan pronomen.",
      petunjuk: "*Kennst* du Paul?",
      soal: "*Kennst* du ___?",
      jawaban: "ihn",
      kalimat: "*Kennst* du {ihn}?",
      arti: "Kamu kenal dia?",
      penjelasan: "Paul → laki-laki → er. Sebagai objek: **ihn**.",
      jikaMenjawab: {
        "er": "er itu Nominativ (subjek). Paul di sini objek → **ihn**.",
        "ihm": "ihm itu Dativ (nanti di A2). Untuk Akkusativ: **ihn**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih pronomen yang tepat.",
      petunjuk: "die Brille",
      soal: "Wo ist die Brille? Ich *suche* ___.",
      pilihan: ["sie", "ihn", "es"],
      jawaban: "sie",
      kalimat: "Wo ist die Brille? Ich *suche* {sie}.",
      arti: "Di mana kacamatanya? Aku sedang mencarinya.",
      penjelasan: "**die** Brille → feminin → **sie** (tetap sama di Akkusativ).",
      jikaMenjawab: {
        "ihn": "ihn hanya untuk maskulin (der). Brille itu **die** → **sie**.",
        "es": "es untuk das. Brille itu **die** → **sie**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi pronomen Akkusativ yang tepat.",
      petunjuk: "du",
      soal: "Ich *mache* am Samstag eine Party. Ich *lade* ___ [ein].",
      jawaban: "dich",
      kalimat: "Ich *mache* am Samstag eine Party. Ich *lade* {dich} [ein].",
      arti: "Hari Sabtu aku mengadakan pesta. Aku mengundangmu.",
      penjelasan: "du sebagai objek → **dich**.",
      jikaMenjawab: {
        "du": "du itu Nominativ (subjek). Sebagai objek berubah: **dich**.",
        "dir": "dir itu Dativ. Untuk Akkusativ: **dich**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ganti nama orang dengan pronomen.",
      petunjuk: "Ich *rufe* Anna [an].",
      soal: "Ich *rufe* ___ [an].",
      jawaban: "sie",
      kalimat: "Ich *rufe* {sie} [an].",
      arti: "Aku meneleponnya (Anna).",
      penjelasan: "Anna → perempuan → sie. Feminin **tetap sama** di Akkusativ: **sie**.",
      jikaMenjawab: {
        "ihr": "ihr bukan Akkusativ. Anna → **sie** (tetap sama).",
        "ihn": "ihn untuk laki-laki. Anna perempuan → **sie**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi pronomen Akkusativ yang tepat.",
      petunjuk: "wir",
      soal: "*Ruft* ihr ___ heute [an]?",
      jawaban: "uns",
      kalimat: "*Ruft* ihr {uns} heute [an]?",
      arti: "Kalian menelepon kami hari ini?",
      penjelasan: "wir sebagai objek → **uns**.",
      jikaMenjawab: {
        "wir": "wir itu Nominativ (subjek). Sebagai objek berubah: **uns**.",
        "euch": "euch untuk **ihr**. Untuk wir: **uns**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ganti kata benda dengan pronomen.",
      petunjuk: "Ich *brauche* den Computer.",
      soal: "Ich *brauche* ___.",
      jawaban: "ihn",
      kalimat: "Ich *brauche* {ihn}.",
      arti: "Aku membutuhkannya (komputer itu).",
      penjelasan: "**der** Computer → maskulin → **ihn**. Benda juga ikut artikelnya — bukan otomatis es.",
      jikaMenjawab: {
        "es": "Benda tidak otomatis es! Computer itu **der** Computer → **ihn**.",
        "er": "er itu Nominativ (subjek). Sebagai objek: **ihn**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi pronomen Akkusativ yang tepat.",
      petunjuk: "Sie (sopan)",
      soal: "Frau Müller, ich *verstehe* ___ nicht.",
      jawaban: "Sie",
      kalimat: "Frau Müller, ich *verstehe* {Sie} nicht.",
      arti: "Bu Müller, saya tidak mengerti Anda.",
      penjelasan: "Sie (sopan) **tetap sama** di Akkusativ: **Sie** — selalu dengan huruf besar.",
      jikaMenjawab: {
        "ihnen": "Ihnen itu Dativ. Untuk Akkusativ tetap: **Sie**.",
        "euch": "euch untuk ihr (kalian, tidak formal). Untuk Frau Müller (sopan): **Sie**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih pronomen yang tepat.",
      petunjuk: "das Buch",
      soal: "Das Buch ist spannend. Ich *lese* ___ heute.",
      pilihan: ["es", "ihn", "sie"],
      jawaban: "es",
      kalimat: "Das Buch ist spannend. Ich *lese* {es} heute.",
      arti: "Buku itu seru. Aku membacanya hari ini.",
      penjelasan: "**das** Buch → neutral → **es** (tetap sama di Akkusativ).",
      jikaMenjawab: {
        "ihn": "ihn hanya untuk maskulin (der). Buch itu **das** → **es**.",
        "sie": "sie untuk die / plural. Buch itu **das** → **es**."
      }
    },
    {
      tipe: "isi",
      perintah: "Ganti kata benda dengan pronomen.",
      petunjuk: "Er *liebt* die Kinder.",
      soal: "Er *liebt* ___.",
      jawaban: "sie",
      kalimat: "Er *liebt* {sie}.",
      arti: "Dia mencintai mereka.",
      penjelasan: "die Kinder → plural → sie. Plural **tetap sama** di Akkusativ: **sie**.",
      jikaMenjawab: {
        "ihnen": "ihnen itu Dativ. Plural di Akkusativ: **sie**.",
        "es": "Kinder di sini plural (**die** Kinder) → **sie**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih pronomen yang tepat.",
      petunjuk: "er",
      soal: "Mein Bruder wohnt in Berlin. Ich *besuche* ___ im Mai.",
      pilihan: ["ihn", "er", "sein"],
      jawaban: "ihn",
      kalimat: "Mein Bruder wohnt in Berlin. Ich *besuche* {ihn} im Mai.",
      arti: "Saudara laki-lakiku tinggal di Berlin. Aku mengunjunginya bulan Mei.",
      penjelasan: "mein Bruder = er. Di sini dia objek (yang dikunjungi) → **ihn**. Sama seperti der → den.",
      jikaMenjawab: {
        "er": "er itu Nominativ — untuk subjek. Bruder di sini **objek** → **ihn**.",
        "sein": "sein artinya \"miliknya\" (Possessivartikel). Yang dibutuhkan pronomen objek: **ihn**."
      }
    }
  ]
};
