/* ================================================================
   TOPIK 4 — TRENNBARE VERBEN + PRÄPOSITION "für"
   ================================================================
   Isi file ini: materi (kartu Mode Belajar + slide Mode Presentasi)
   dan latihan (soal Mode Belajar).

   Cara mengedit dan contoh lengkap: lihat komentar di atas file
   js/data/ordinalzahlen.js dan README.md.

   KODE WARNA
     *hole* *kann*  oranye         kata kerja (hole) · Modalverb (kann)
     [ab]         kotak oranye   awalan trennbar (terlihat "lepas")
     *[ab]holen*  kata kerja utuh dengan awalan yang masih menempel
     {dich}       biru           pronomen Akkusativ
     !!ersten!!   merah          bentuk tak beraturan
     ~~abhole~~   dicoret        bentuk yang salah
     **teks**     huruf tebal
     ___          titik-titik (tempat jawaban di soal)

   GARIS LENGKUNG (Satzklammer)
     Muncul OTOMATIS di contoh kalimat & umpan balik kalau kalimatnya
     berisi awalan lepas di akhir, misalnya  "Ich *hole* {dich} [ab]."
     atau infinitiv utuh:  "Sie *wollen* Sofia *[ab]holen*."
     Untuk Modalverb + kata kerja biasa ("Wir *können* ins Kino *gehen*.")
     tambahkan  klammer: true  pada contoh itu.
     Label di bawah ujung garis:  klammer: ["Modalverb", "Infinitiv"]

   BLOK KHUSUS DI TOPIK INI
     { pisah: "*[ab]holen*", kalimat: "Ich *hole* {dich} [ab].", id: "…" }
         → infinitiv di atas, kalimat di bawah; awalannya "terbang" ke akhir
     { salahBenar: [ { salah: "…", benar: "…", alasan: "…" } ] }
         → ✗ kalimat salah / ✓ kalimat benar
   ================================================================ */

var TOPIK = TOPIK || {};   // ← baris ini jangan dihapus

TOPIK.trennbare = {
  nomor: 4,
  ikon: "✂️",
  judul: "Trennbare Verben + für",
  judulPendek: "Trennbare Verben",
  subjudul: "Ich *hole* {dich} [ab].",
  ringkas: "Kata kerja yang awalannya lepas dan pindah ke akhir kalimat — plus preposisi für yang selalu diikuti Akkusativ.",

  /* ==============================================================
     MATERI
     ============================================================== */
  materi: [
    {
      judul: "Awalan yang lepas ✂️",
      isi: [
        "Beberapa kata kerja punya **awalan** yang bisa **lepas**. Di dalam kalimat, awalan itu pindah ke **AKHIR** kalimat.",
        { pisah: "*[ab]holen*", keterangan: "infinitiv · menjemput", kalimat: "Ich *hole* {dich} [ab].", id: "Aku menjemputmu." },
        { catatan: "Di kalimat biasa, kata kerjanya (tanpa awalan) tetap di **posisi 2**. Awalannya pindah ke **akhir**.", jenis: "penting", bertahap: true }
      ]
    },

    {
      judul: "10 kata kerja terpisah",
      isi: [
        { kata: [
          ["*[ab]holen*", "menjemput"],       ["*[an]fangen*", "memulai"],
          ["*[an]rufen*", "menelepon"],       ["*[ein]laden*", "mengundang"],
          ["*[ein]sammeln*", "mengumpulkan"], ["*[mit]bringen*", "membawa"],
          ["*[mit]kommen*", "ikut"],          ["*[mit]machen*", "ikut serta"],
          ["*[auf]stehen*", "bangun"],        ["*[ein]kaufen*", "belanja"]
        ] },
        { catatan: "Awalan yang sering lepas: **ab- · an- · auf- · ein- · mit-**. Tekanan suara selalu di awalan: **ÁB**holen, **MÍT**kommen.", jenis: "tips", bertahap: true }
      ]
    },

    {
      judul: "Situasi 1 — kalimat biasa: TERPISAH",
      isi: [
        { rumus: ["Ich", "*hole*", "{dich}", "[ab]"], label: ["posisi 1", "posisi 2", "tengah", "akhir"], pemisah: "", klammer: true },
        { contoh: [
          { de: "Sie *laden* die Freunde [ein].", id: "Mereka mengundang teman-teman. (einladen)" },
          { de: "Ich *stehe* um 7 Uhr [auf].", id: "Aku bangun jam 7. (aufstehen)" },
          { de: "Wir *kaufen* heute [ein].", id: "Kami belanja hari ini. (einkaufen)" }
        ], duaKolom: true }
      ]
    },

    {
      judul: "Situasi 2 — dengan Modalverb: UTUH",
      isi: [
        { rumus: ["Sie", "*wollen*", "Sofia", "*[ab]holen*"], label: ["posisi 1", "Modalverb", "tengah", "infinitiv utuh"], pemisah: "", klammer: true },
        { teks: "Modalverb mengambil **posisi 2**. Kata kerja trennbar tidak dikonjugasi — ia tetap **utuh** (awalan menempel) di akhir kalimat.", hanya: "belajar" },
        { contoh: [
          { de: "Ich *muss* heute *[ein]kaufen*.", id: "Aku harus belanja hari ini." },
          { de: "*Kannst* du {mich} *[an]rufen*?", id: "Bisakah kamu meneleponku?" }
        ] },
        { catatan: "Bandingkan: Ich *hole* {dich} [ab]. ↔ Ich *will* {dich} *[ab]holen*.", jenis: "penting", bertahap: true }
      ]
    },

    {
      judul: "Situasi 3 — pertanyaan: TERPISAH",
      isi: [
        { contoh: [
          { de: "*Macht* ihr [mit]?", id: "Kalian ikut serta? (mitmachen)" },
          { de: "*Kommst* du [mit]?", id: "Kamu ikut? (mitkommen)" },
          { de: "*Rufst* du {mich} [an]?", id: "Kamu akan meneleponku? (anrufen)" },
          { de: "Wann *fängt* der Kurs [an]?", id: "Kapan kursusnya mulai? (anfangen)" }
        ] },
        { catatan: "Pertanyaan ja/nein: kata kerja di **posisi 1**. Pertanyaan W: kata kerja di **posisi 2**. Awalan tetap di **akhir**.", jenis: "info", bertahap: true }
      ]
    },

    {
      judul: "Situasi 4 — Imperativ: TERPISAH",
      isi: [
        { contoh: [
          { de: "*Hol* {mich} [ab]!", id: "Jemput aku!" },
          { de: "*Komm* [mit]!", id: "Ayo ikut!" },
          { de: "*Steh* [auf]!", id: "Bangun!" },
          { de: "*Bring* Wasser [mit]!", id: "Bawa air!" }
        ] },
        { catatan: "Perintah: kata kerja di **posisi 1**, awalan di **akhir**.", jenis: "info", bertahap: true }
      ]
    },

    {
      judul: "Ringkasan: terpisah atau utuh?",
      isi: [
        { kolom: ["Situasi", "Contoh", "Awalan"],
          tabel: [
            ["Kalimat biasa", "Ich *hole* {dich} [ab].", "✂️ terpisah"],
            ["Pertanyaan",    "*Holst* du {mich} [ab]?", "✂️ terpisah"],
            ["Imperativ",     "*Hol* {mich} [ab]!",      "✂️ terpisah"],
            { tanda: "sama", isi: ["+ Modalverb", "Ich *will* {dich} *[ab]holen*.", "🔗 **utuh** di akhir"] }
          ] },
        { catatan: "Hanya kalau ada **Modalverb**, awalannya tidak lepas.", jenis: "penting", bertahap: true }
      ]
    },

    {
      judul: "Satzklammer: kurung kalimat",
      isi: [
        "Ingat Modalverb? Kalimatnya punya **kurung**: satu bagian di posisi 2, satu bagian di akhir. Trennbare Verben membuat kurung yang **sama**.",
        { contoh: [
          { de: "Wir *können* ins Kino *gehen*.", id: "Kita bisa pergi ke bioskop.", klammer: ["Modalverb", "Infinitiv"] },
          { de: "Ich *hole* {dich} [ab].", id: "Aku menjemputmu.", klammer: ["kata kerja", "awalan"] }
        ] },
        { catatan: "Semua yang lain (dich, ins Kino, am Montag …) ada **di dalam** kurung.", jenis: "hubung", bertahap: true }
      ]
    },

    {
      judul: "Kesalahan umum",
      isi: [
        { salahBenar: [
          { salah: "Ich abhole dich.", benar: "Ich *hole* {dich} [ab].", alasan: "Awalan tidak menempel di depan — ia lepas dan pindah ke akhir." },
          { salah: "Ich hole ab dich.", benar: "Ich *hole* {dich} [ab].", alasan: "Awalan tidak di samping kata kerja, tapi di paling akhir." },
          { salah: "Wir wollen dich holen ab.", benar: "Wir *wollen* {dich} *[ab]holen*.", alasan: "Dengan Modalverb, kata kerjanya tetap utuh: abholen." }
        ] }
      ]
    },

    {
      judul: "für + Akkusativ",
      isi: [
        "Setelah **für** selalu **Akkusativ**. Untuk artikel dan er/es/sie: hanya **maskulin** yang berubah — aturan yang sama seperti biasa.",
        { kolom: ["", "Artikel", "Pronomen"],
          tabel: [
            { tanda: "biru", isi: ["maskulin (der)", "für de**n** Hund", "für {ihn}"] },
            ["feminin (die)", "für die Katze",  "für {sie}"],
            ["neutral (das)", "für das Kind",   "für {es}"],
            ["plural (die)",  "für die Kinder", "für {sie}"]
          ] },
        { catatan: "Semua pronomen sesudah für juga Akkusativ: für {mich} · für {dich} · für {ihn} · für {sie} · für {uns} · für {euch} · für {Sie}", jenis: "info", bertahap: true }
      ]
    },

    {
      judul: "Für wen …?",
      isi: [
        { contoh: [
          { de: "Für wen *ist* das Wasser? — Für den Hund.", id: "Air itu untuk siapa? — Untuk anjingnya." },
          { de: "Das Wasser *ist* für {ihn}.", id: "Air itu untuknya." },
          { de: "Das Geschenk *ist* für {dich}!", id: "Hadiah ini untukmu!" },
          { de: "*Ist* der Kaffee für {mich}?", id: "Apakah kopinya untukku?" }
        ] }
      ]
    },

    {
      judul: "Kata tanya baru: wer atau wen?",
      isi: [
        { kolom: ["Kata tanya", "Kasus", "Artinya"],
          tabel: [
            ["**wer**", "Nominativ", "siapa (yang **melakukan**)"],
            ["**wen**", "Akkusativ", "siapa (yang **dikenai**)"]
          ] },
        { contoh: [
          { de: "Wer *kommt* heute? — Paul *kommt*.", id: "Siapa yang datang hari ini? — Paul." },
          { de: "Wen *besuchst* du? — Ich *besuche* Paul.", id: "Siapa yang kamu kunjungi? — Aku mengunjungi Paul." },
          { de: "Für wen *ist* das Geschenk? — Für {dich}!", id: "Hadiah itu untuk siapa? — Untukmu!" }
        ] },
        { catatan: "we**r** → we**n**, sama seperti de**r** → de**n** dan e**r** → {ih**n**}!", jenis: "hubung", bertahap: true }
      ]
    }
  ],

  /* ==============================================================
     LATIHAN
     Selain "isi" dan "pilih" (lihat js/data/ordinalzahlen.js), topik
     ini memakai dua jenis soal khusus:

     1) SUSUN KALIMAT — murid menyeret/mengetuk kata acak
        {
          tipe: "susun",
          perintah: "Susun menjadi kalimat yang benar.",
          petunjuk: "*[ab]holen* — menjemput",
          kata: ["Ich", "*hole*", "{dich}", "[ab]"],   // tulis dalam URUTAN BENAR; website mengacaknya sendiri
          tanda: ".",                                  // tanda baca di akhir: "." "?" atau "!"
          jawabanLain: [ ["…", "…"] ],                 // (boleh dihapus) urutan lain yang juga benar
          arti: "Aku menjemputmu.",
          penjelasan: "…"
        }
        • Satu kotak boleh berisi beberapa kata: "die Freunde", "um 7 Uhr".
        • Warna kata ikut terlihat di kotaknya: awalan [ab] berkotak putus-putus.
        • Kalau salah, website otomatis menjelaskan posisi awalan / kata kerja,
          lalu menampilkan "penjelasan" Anda.

     2) BANDING — dua kalimat berpasangan (terpisah vs. dengan Modalverb)
        {
          tipe: "banding",
          perintah: "Isi dengan bentuk yang tepat.",
          petunjuk: "*[ab]holen* — menjemput",
          baris: [
            { soal: "Ich ___ {dich} ___.", jawaban: ["hole", "ab"], kalimat: "Ich *hole* {dich} [ab].", arti: "…" },
            { soal: "Ich *will* {dich} ___.", jawaban: "abholen", kalimat: "Ich *will* {dich} *[ab]holen*.", arti: "…" }
          ],
          penjelasan: "…",
          jikaMenjawab: { "abhole": "…" }
        }
        • Label kalimat otomatis "Tanpa Modalverb" / "Dengan Modalverb".
          Ingin label lain? Tambahkan  label: "…"  di baris itu.
     ============================================================== */
  latihan: [
    {
      tipe: "susun",
      perintah: "Susun menjadi kalimat yang benar.",
      petunjuk: "*[ab]holen* — menjemput",
      kata: ["Ich", "*hole*", "{dich}", "[ab]"],
      tanda: ".",
      arti: "Aku menjemputmu.",
      penjelasan: "**abholen** itu kata kerja terpisah. Kata dasarnya (**hole**) di posisi 2, awalannya (**ab**) di **AKHIR** kalimat. Jadi: Ich hole dich ab."
    },
    {
      tipe: "susun",
      perintah: "Susun menjadi kalimat yang benar.",
      petunjuk: "*[ein]laden* — mengundang",
      kata: ["Sie", "*laden*", "die Freunde", "[ein]"],
      tanda: ".",
      arti: "Mereka mengundang teman-teman.",
      penjelasan: "**einladen** itu kata kerja terpisah. **laden** di posisi 2, **ein** di **AKHIR** kalimat. Jadi: Sie laden die Freunde ein."
    },
    {
      tipe: "banding",
      perintah: "Isi dengan bentuk yang tepat. Perhatikan: ada Modalverb atau tidak?",
      petunjuk: "*[ab]holen* — menjemput",
      baris: [
        { soal: "Ich ___ {dich} ___.", jawaban: ["hole", "ab"], kalimat: "Ich *hole* {dich} [ab].", arti: "Aku menjemputmu." },
        { soal: "Ich *will* {dich} ___.", jawaban: "abholen", kalimat: "Ich *will* {dich} *[ab]holen*.", arti: "Aku mau menjemputmu." }
      ],
      penjelasan: "Tanpa Modalverb → **terpisah**: hole (posisi 2) … ab (akhir). Dengan Modalverb (will) → **utuh** di akhir: abholen.",
      jikaMenjawab: {
        "abhole": "Tanpa Modalverb awalannya lepas: **hole** … **ab**.",
        "holen ab": "Dengan Modalverb kata kerja tidak dipisah: **abholen**.",
        "hole ab": "Dengan Modalverb kata kerja tidak dipisah dan tidak dikonjugasi: **abholen**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Mana kalimat yang benar?",
      petunjuk: "*[ab]holen*",
      soal: "",
      pilihan: ["Ich hole dich ab.", "Ich abhole dich.", "Ich hole ab dich."],
      jawaban: "Ich hole dich ab.",
      kalimat: "Ich *hole* {dich} [ab].",
      arti: "Aku menjemputmu.",
      penjelasan: "**hole** di posisi 2, **ab** di paling **akhir**. Semua yang lain (dich) ada di tengah.",
      jikaMenjawab: {
        "Ich abhole dich.": "Awalan tidak menempel di depan kata kerja — ia lepas dan pindah ke **akhir**.",
        "Ich hole ab dich.": "Awalan tidak ikut di samping kata kerja — ia pindah ke paling **akhir**."
      }
    },
    {
      tipe: "susun",
      perintah: "Susun menjadi pertanyaan.",
      petunjuk: "*[mit]machen* — ikut serta",
      kata: ["*Macht*", "ihr", "[mit]"],
      tanda: "?",
      arti: "Kalian ikut serta?",
      penjelasan: "Pertanyaan ja/nein: **Macht** di posisi 1, **mit** tetap di **AKHIR**."
    },
    {
      tipe: "banding",
      perintah: "Isi dengan bentuk yang tepat. Perhatikan: ada Modalverb atau tidak?",
      petunjuk: "*[an]rufen* — menelepon",
      baris: [
        { soal: "Ich ___ {dich} morgen ___.", jawaban: ["rufe", "an"], kalimat: "Ich *rufe* {dich} morgen [an].", arti: "Aku meneleponmu besok." },
        { soal: "Ich *kann* {dich} morgen ___.", jawaban: "anrufen", kalimat: "Ich *kann* {dich} morgen *[an]rufen*.", arti: "Aku bisa meneleponmu besok." }
      ],
      penjelasan: "Tanpa Modalverb → **terpisah**: rufe (posisi 2) … an (akhir). Dengan Modalverb (kann) → **utuh** di akhir: anrufen.",
      jikaMenjawab: {
        "anrufe": "Tanpa Modalverb awalannya lepas: **rufe** … **an**.",
        "rufen an": "Dengan Modalverb kata kerja tidak dipisah: **anrufen**.",
        "rufe an": "Dengan Modalverb kata kerja tidak dipisah dan tidak dikonjugasi: **anrufen**."
      }
    },
    {
      tipe: "susun",
      perintah: "Susun menjadi kalimat perintah.",
      petunjuk: "*[ab]holen* — Imperativ untuk du",
      kata: ["*Hol*", "{mich}", "[ab]"],
      tanda: "!",
      arti: "Jemput aku!",
      penjelasan: "Imperativ: **Hol** di posisi 1, **ab** di **AKHIR**."
    },
    {
      tipe: "banding",
      perintah: "Isi dengan bentuk yang tepat. Perhatikan: ada Modalverb atau tidak?",
      petunjuk: "*[ein]laden* — mengundang",
      baris: [
        { soal: "Wir ___ {euch} zur Party ___.", jawaban: ["laden", "ein"], kalimat: "Wir *laden* {euch} zur Party [ein].", arti: "Kami mengundang kalian ke pesta." },
        { soal: "Wir *möchten* {euch} zur Party ___.", jawaban: "einladen", kalimat: "Wir *möchten* {euch} zur Party *[ein]laden*.", arti: "Kami ingin mengundang kalian ke pesta." }
      ],
      penjelasan: "Tanpa Modalverb → **terpisah**: laden (posisi 2) … ein (akhir). Dengan Modalverb (möchten) → **utuh** di akhir: einladen.",
      jikaMenjawab: {
        "einlade": "Tanpa Modalverb awalannya lepas: **laden** … **ein**.",
        "laden ein": "Dengan Modalverb kata kerja tidak dipisah: **einladen**."
      }
    },
    {
      tipe: "susun",
      perintah: "Susun menjadi kalimat yang benar.",
      petunjuk: "*wollen* + *[ab]holen*",
      kata: ["Sie", "*wollen*", "Sofia", "*[ab]holen*"],
      tanda: ".",
      arti: "Mereka mau menjemput Sofia.",
      penjelasan: "Dengan Modalverb: **wollen** di posisi 2, **abholen** tetap **utuh** di akhir."
    },
    {
      tipe: "banding",
      perintah: "Isi dengan bentuk yang tepat. Perhatikan: ada Modalverb atau tidak?",
      petunjuk: "*[mit]kommen* — ikut",
      baris: [
        { soal: "___ du ins Kino ___?", jawaban: ["Kommst", "mit"], kalimat: "*Kommst* du ins Kino [mit]?", arti: "Kamu ikut ke bioskop?" },
        { soal: "*Willst* du ins Kino ___?", jawaban: "mitkommen", kalimat: "*Willst* du ins Kino *[mit]kommen*?", arti: "Kamu mau ikut ke bioskop?" }
      ],
      penjelasan: "Pertanyaan tanpa Modalverb → **terpisah**: Kommst (posisi 1) … mit (akhir). Dengan Modalverb (Willst) → **utuh** di akhir: mitkommen.",
      jikaMenjawab: {
        "mitkommst": "Tanpa Modalverb awalannya lepas: **Kommst** … **mit**.",
        "kommen mit": "Dengan Modalverb kata kerja tidak dipisah: **mitkommen**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang benar.",
      petunjuk: "*[ab]holen*",
      soal: "Wir *wollen* {dich} ___.",
      pilihan: ["abholen", "holen ab", "ab holen"],
      jawaban: "abholen",
      kalimat: "Wir *wollen* {dich} *[ab]holen*.",
      arti: "Kami mau menjemputmu.",
      penjelasan: "Ada Modalverb (wollen) → kata kerja trennbar tetap **utuh** di akhir: **abholen**.",
      jikaMenjawab: {
        "holen ab": "Dengan Modalverb kata kerja tidak dipisah: **abholen**.",
        "ab holen": "Awalan menempel jadi satu kata: **abholen**."
      }
    },
    {
      tipe: "banding",
      perintah: "Isi dengan bentuk yang tepat. Perhatikan: ada Modalverb atau tidak?",
      petunjuk: "*[auf]stehen* — bangun",
      baris: [
        { soal: "Er ___ um 6 Uhr ___.", jawaban: ["steht", "auf"], kalimat: "Er *steht* um 6 Uhr [auf].", arti: "Dia bangun jam 6." },
        { soal: "Er *muss* um 6 Uhr ___.", jawaban: "aufstehen", kalimat: "Er *muss* um 6 Uhr *[auf]stehen*.", arti: "Dia harus bangun jam 6." }
      ],
      penjelasan: "Tanpa Modalverb → **terpisah**: steht (posisi 2) … auf (akhir). Dengan Modalverb (muss) → **utuh** di akhir: aufstehen.",
      jikaMenjawab: {
        "aufsteht": "Tanpa Modalverb awalannya lepas: **steht** … **auf**.",
        "stehen auf": "Dengan Modalverb kata kerja tidak dipisah: **aufstehen**."
      }
    },
    {
      tipe: "susun",
      perintah: "Susun menjadi kalimat yang benar.",
      petunjuk: "*[auf]stehen* — bangun",
      kata: ["Ich", "*stehe*", "um 7 Uhr", "[auf]"],
      tanda: ".",
      jawabanLain: [["um 7 Uhr", "*stehe*", "Ich", "[auf]"]],
      arti: "Aku bangun jam 7.",
      penjelasan: "**stehe** di posisi 2, **auf** di **AKHIR**. (Boleh juga: Um 7 Uhr stehe ich auf.)"
    },
    {
      tipe: "banding",
      perintah: "Isi dengan bentuk yang tepat. Perhatikan: ada Modalverb atau tidak?",
      petunjuk: "*[ein]kaufen* — belanja",
      baris: [
        { soal: "Ihr ___ im Supermarkt ___.", jawaban: ["kauft", "ein"], kalimat: "Ihr *kauft* im Supermarkt [ein].", arti: "Kalian belanja di supermarket." },
        { soal: "Ihr *könnt* im Supermarkt ___.", jawaban: "einkaufen", kalimat: "Ihr *könnt* im Supermarkt *[ein]kaufen*.", arti: "Kalian bisa belanja di supermarket." }
      ],
      penjelasan: "Tanpa Modalverb → **terpisah**: kauft (posisi 2) … ein (akhir). Dengan Modalverb (könnt) → **utuh** di akhir: einkaufen.",
      jikaMenjawab: {
        "einkauft": "Tanpa Modalverb awalannya lepas: **kauft** … **ein**.",
        "kaufen ein": "Dengan Modalverb kata kerja tidak dipisah: **einkaufen**."
      }
    },
    {
      tipe: "susun",
      perintah: "Susun menjadi pertanyaan.",
      petunjuk: "*können* + *[an]rufen*",
      kata: ["*Kannst*", "du", "{mich}", "*[an]rufen*"],
      tanda: "?",
      arti: "Bisakah kamu meneleponku?",
      penjelasan: "Pertanyaan ja/nein dengan Modalverb: **Kannst** di posisi 1, **anrufen** tetap **utuh** di akhir."
    },
    {
      tipe: "banding",
      perintah: "Isi dengan bentuk yang tepat. Perhatikan: ada Modalverb atau tidak?",
      petunjuk: "*[mit]bringen* — membawa",
      baris: [
        { soal: "Ich ___ einen Kuchen ___.", jawaban: ["bringe", "mit"], kalimat: "Ich *bringe* einen Kuchen [mit].", arti: "Aku membawa kue." },
        { soal: "Ich *soll* einen Kuchen ___.", jawaban: "mitbringen", kalimat: "Ich *soll* einen Kuchen *[mit]bringen*.", arti: "Aku disuruh membawa kue." }
      ],
      penjelasan: "Tanpa Modalverb → **terpisah**: bringe (posisi 2) … mit (akhir). Dengan Modalverb (soll) → **utuh** di akhir: mitbringen.",
      jikaMenjawab: {
        "mitbringe": "Tanpa Modalverb awalannya lepas: **bringe** … **mit**.",
        "bringen mit": "Dengan Modalverb kata kerja tidak dipisah: **mitbringen**."
      }
    },
    {
      tipe: "susun",
      perintah: "Susun menjadi pertanyaan.",
      petunjuk: "*[an]fangen* — mulai (er fängt … an)",
      kata: ["Wann", "*fängt*", "der Kurs", "[an]"],
      tanda: "?",
      arti: "Kapan kursusnya mulai?",
      penjelasan: "Pertanyaan W: **Wann** di posisi 1, **fängt** di posisi 2, **an** di **AKHIR**."
    },

    /* ---------- für + Akkusativ, wer / wen ---------- */
    {
      tipe: "isi",
      perintah: "Isi artikel yang tepat.",
      petunjuk: "der Hund → ?",
      soal: "Das Wasser ist für ___ Hund.",
      jawaban: "den",
      kalimat: "Das Wasser *ist* für de**n** Hund.",
      arti: "Air itu untuk anjingnya.",
      penjelasan: "Setelah **für** selalu Akkusativ. der Hund (maskulin) → **den** Hund.",
      jikaMenjawab: {
        "der": "Setelah für selalu Akkusativ: der → **den**.",
        "dem": "dem itu Dativ. für + Akkusativ: **den**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi pronomen yang tepat.",
      petunjuk: "du → ?",
      soal: "Das Geschenk ist für ___!",
      jawaban: "dich",
      kalimat: "Das Geschenk *ist* für {dich}!",
      arti: "Hadiah ini untukmu!",
      penjelasan: "Setelah **für** selalu Akkusativ: du → **dich**.",
      jikaMenjawab: {
        "du": "Setelah für selalu Akkusativ: du → **dich**.",
        "dir": "dir itu Dativ. für + Akkusativ: **dich**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih bentuk yang tepat.",
      petunjuk: "meine Mutter → ?",
      soal: "Die Blumen sind für ___ Mutter.",
      pilihan: ["meine", "meinen", "meiner"],
      jawaban: "meine",
      kalimat: "Die Blumen *sind* für meine Mutter.",
      arti: "Bunga-bunga itu untuk ibuku.",
      penjelasan: "die Mutter (feminin) → di Akkusativ tetap **meine**. Hanya maskulin yang berubah.",
      jikaMenjawab: {
        "meinen": "Akhiran -en hanya untuk maskulin. Mutter itu feminin → **meine**.",
        "meiner": "meiner itu Dativ. für + Akkusativ: **meine**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi bentuk yang tepat.",
      petunjuk: "mein Vater → ?",
      soal: "Ich *kaufe* einen Kuchen für ___ Vater.",
      jawaban: "meinen",
      kalimat: "Ich *kaufe* einen Kuchen für mein**en** Vater.",
      arti: "Aku membeli kue untuk ayahku.",
      penjelasan: "Setelah **für** selalu Akkusativ. der Vater (maskulin) → mein**en** Vater.",
      jikaMenjawab: {
        "mein": "Setelah für selalu Akkusativ. Vater maskulin → mein**en**.",
        "meinem": "meinem itu Dativ. für + Akkusativ: **meinen**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih kata tanya yang tepat.",
      soal: "Für ___ ist der Kaffee? — Für mich.",
      pilihan: ["wen", "wer", "wem"],
      jawaban: "wen",
      kalimat: "Für wen *ist* der Kaffee? — Für {mich}.",
      arti: "Kopi itu untuk siapa? — Untukku.",
      penjelasan: "Setelah **für** → Akkusativ → **wen**. (wer → wen, sama seperti der → den.)",
      jikaMenjawab: {
        "wer": "wer untuk yang **melakukan** (Nominativ). Setelah für → **wen**.",
        "wem": "wem itu Dativ. für + Akkusativ: **wen**."
      }
    },
    {
      tipe: "pilih",
      perintah: "Pilih kata tanya yang tepat.",
      soal: "___ kommt heute Abend? — Paul und Lisa.",
      pilihan: ["Wer", "Wen"],
      acak: false,
      jawaban: "Wer",
      kalimat: "Wer *kommt* heute Abend? — Paul und Lisa.",
      arti: "Siapa yang datang nanti malam? — Paul dan Lisa.",
      penjelasan: "Yang ditanyakan adalah **pelaku** (siapa yang datang) → Nominativ → **Wer**.",
      jikaMenjawab: {
        "Wen": "wen untuk yang **dikenai** (objek). Paul dan Lisa di sini pelaku (yang datang) → **Wer**."
      }
    },
    {
      tipe: "isi",
      perintah: "Isi pronomen yang tepat.",
      petunjuk: "wir → ?",
      soal: "Ist die Pizza für ___?",
      jawaban: "uns",
      kalimat: "*Ist* die Pizza für {uns}?",
      arti: "Apakah pizzanya untuk kami?",
      penjelasan: "Setelah **für** selalu Akkusativ: wir → **uns**.",
      jikaMenjawab: {
        "wir": "Setelah für selalu Akkusativ: wir → **uns**.",
        "euch": "euch untuk **ihr**. Untuk wir: **uns**."
      }
    }
  ]
};
