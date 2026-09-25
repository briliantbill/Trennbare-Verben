/* ================================================================
   LATIHAN GABUNGAN — beberapa topik dalam satu kalimat
   ================================================================
   Di kalimat nyata, topik-topik ini muncul bersamaan, misalnya:
     "Ich hole dich am ersten Mai ab."
      → trennbar (abholen) + pronomen (dich) + tanggal (ersten)

   Bagian ini hanya berisi latihan (tidak ada materi / slide).
   Semua jenis soal bisa dipakai: "isi", "pilih", "susun", "banding"
   — formatnya sama dengan topik lain (lihat README.md).

   TAMBAHAN KHUSUS DI SINI:
     topik: ["trennbare", "pronomen", "ordinalzahlen"]
       → label kecil di atas soal yang menunjukkan topik apa saja yang
         dicampur. Nama yang bisa dipakai:
         ordinalzahlen · praeteritum · pronomen · trennbare

   KODE WARNA
     *hole* *kann*  oranye         kata kerja (hole) · Modalverb (kann)
     [ab]         kotak oranye   awalan trennbar
     {dich}       biru           pronomen Akkusativ
     !!ersten!!   merah          bentuk tak beraturan
     **teks**     huruf tebal
     ___          titik-titik (tempat jawaban di soal)
   ================================================================ */

var TOPIK = TOPIK || {};   // ← baris ini jangan dihapus

TOPIK.gabungan = {
  ikon: "🧩",
  judul: "Latihan Gabungan",
  judulPendek: "Gabungan",
  subjudul: "Beberapa topik dalam satu kalimat",
  ringkas: "Tanggal, Präteritum, pronomen, dan trennbare Verben — dicampur seperti di percakapan sungguhan. Label di atas setiap soal menunjukkan topik mana saja yang dipakai.",

  /* ==============================================================
     LATIHAN
     ============================================================== */
  latihan: [
    {
      tipe: "susun",
      topik: ["trennbare", "pronomen", "ordinalzahlen"],
      perintah: "Susun menjadi kalimat yang benar.",
      petunjuk: "*[ab]holen* · du · 1. Mai",
      kata: ["Ich", "*hole*", "{dich}", "am !!ersten!! Mai", "[ab]"],
      tanda: ".",
      jawabanLain: [["am !!ersten!! Mai", "*hole*", "Ich", "{dich}", "[ab]"]],
      arti: "Aku menjemputmu tanggal satu Mei.",
      penjelasan: "① **abholen** terpisah: **hole** di posisi 2, **ab** di **AKHIR**. ② **dich** (objek) dan **am ersten Mai** ada di tengah, di dalam kurung kalimat. (Boleh juga: Am ersten Mai hole ich dich ab.)"
    },
    {
      tipe: "isi",
      topik: ["trennbare", "pronomen", "ordinalzahlen"],
      perintah: "Lengkapi kalimatnya.",
      petunjuk: "*[an]rufen* · 3. Mai",
      soal: "Ich ___ {dich} am ___ Mai ___.",
      jawaban: ["rufe", "dritten", "an"],
      kalimat: "Ich *rufe* {dich} am !!dritten!! Mai [an].",
      arti: "Aku meneleponmu tanggal tiga Mei.",
      penjelasan: "① **anrufen** terpisah: **rufe** di posisi 2, **an** di akhir. ② 3. = **dritten** — salah satu dari 4 bentuk tak beraturan.",
      jikaMenjawab: {
        "dreiten": "3 = **dritten**, bukan dreiten. Ini salah satu dari 4 bentuk tak beraturan.",
        "anrufe": "Tanpa Modalverb awalannya lepas: **rufe** … **an**."
      }
    },
    {
      tipe: "isi",
      topik: ["ordinalzahlen", "praeteritum"],
      perintah: "Lengkapi kalimatnya.",
      petunjuk: "7. Juli · sein (lampau)",
      soal: "Am ___ Juli ___ ich in Berlin.",
      jawaban: ["siebten|siebenten", "war"],
      kalimat: "Am !!siebten!! Juli *war* ich in Berlin.",
      arti: "Tanggal tujuh Juli aku (waktu itu) di Berlin.",
      penjelasan: "① 7. = **siebten** („en“ dari sieben hilang). ② sein lampau untuk ich → **war**. Kata waktu di depan, jadi kata kerja tetap di posisi 2: *war* ich.",
      jikaMenjawab: {
        "bin": "bin adalah bentuk **sekarang**. Lampaunya: **war**.",
        "sieben": "Tanggal memakai bilangan tingkat: 7. = **siebten**."
      }
    },
    {
      tipe: "pilih",
      topik: ["trennbare", "pronomen"],
      perintah: "Pilih yang tepat.",
      petunjuk: "können + *[ab]holen* · ich",
      soal: "*Kannst* du ___ am Samstag ___?",
      pilihan: ["mich … abholen", "mich … holen ab", "ich … abholen"],
      jawaban: "mich … abholen",
      kalimat: "*Kannst* du {mich} am Samstag *[ab]holen*?",
      arti: "Bisakah kamu menjemputku hari Sabtu?",
      penjelasan: "① Objeknya aku → Akkusativ **mich**. ② Ada Modalverb (kannst) → **abholen** tetap utuh di akhir.",
      jikaMenjawab: {
        "mich … holen ab": "Dengan Modalverb kata kerja tidak dipisah: **abholen**.",
        "ich … abholen": "ich itu subjek. Di sini aku objek (yang dijemput) → **mich**."
      }
    },
    {
      tipe: "susun",
      topik: ["trennbare", "pronomen"],
      perintah: "Susun menjadi kalimat yang benar.",
      petunjuk: "*[ein]laden* · ihr",
      kata: ["Wir", "*laden*", "{euch}", "zur Party", "[ein]"],
      tanda: ".",
      arti: "Kami mengundang kalian ke pesta.",
      penjelasan: "① **einladen** terpisah: **laden** di posisi 2, **ein** di **AKHIR**. ② ihr sebagai objek → **euch**, di tengah kalimat."
    },
    {
      tipe: "isi",
      topik: ["praeteritum", "trennbare", "pronomen"],
      perintah: "Lengkapi kalimatnya.",
      petunjuk: "haben (lampau) · *[an]rufen*",
      soal: "Gestern ___ ich keine Zeit. Ich ___ {dich} morgen ___.",
      jawaban: ["hatte", "rufe", "an"],
      kalimat: "Gestern *hatte* ich keine Zeit. Ich *rufe* {dich} morgen [an].",
      arti: "Kemarin aku tidak punya waktu. Besok aku meneleponmu.",
      penjelasan: "① haben lampau untuk ich → **hatte** (Gestern *hatte* ich: kata kerja posisi 2). ② **anrufen** terpisah: **rufe** … **an**.",
      jikaMenjawab: {
        "habe": "habe adalah bentuk **sekarang**. Lampaunya: **hatte**.",
        "anrufe": "Tanpa Modalverb awalannya lepas: **rufe** … **an**."
      }
    },
    {
      tipe: "pilih",
      topik: ["praeteritum", "ordinalzahlen"],
      perintah: "Pilih bentuk yang benar.",
      petunjuk: "sein (lampau) · 3. Oktober",
      soal: "___ ihr am 3. Oktober in Hamburg?",
      pilihan: ["Wart", "Waren", "War"],
      jawaban: "Wart",
      kalimat: "*Wart* ihr am !!dritten!! Oktober in Hamburg?",
      arti: "Apakah kalian (waktu itu) di Hamburg tanggal tiga Oktober?",
      penjelasan: "① ihr → war + t = **Wart**. ② Tanggalnya dibaca: am **dritten** Oktober (3 = tak beraturan).",
      jikaMenjawab: {
        "Waren": "waren untuk **wir** dan **sie/Sie**. Untuk ihr: war + t = **Wart**.",
        "War": "war untuk ich dan er/es/sie. Untuk ihr: war + t = **Wart**."
      }
    },
    {
      tipe: "isi",
      topik: ["ordinalzahlen", "pronomen"],
      perintah: "Lengkapi kalimatnya.",
      petunjuk: "21. Mai · er",
      soal: "Mein Bruder hat am ___ Mai Geburtstag. Das Geschenk ist für ___.",
      jawaban: ["einundzwanzigsten", "ihn"],
      kalimat: "Mein Bruder *hat* am einundzwanzigsten Mai Geburtstag. Das Geschenk *ist* für {ihn}.",
      arti: "Saudara laki-lakiku ulang tahun tanggal 21 Mei. Hadiahnya untuk dia.",
      penjelasan: "① 21 ada di atas 20 → **-sten**: einundzwanzig**sten**. ② Setelah **für** selalu Akkusativ: er → **ihn**.",
      jikaMenjawab: {
        "er": "Setelah für selalu Akkusativ: er → **ihn**.",
        "einundzwanzigersten": "Di atas 20 bentuk tak beraturan tidak dipakai: einundzwanzig + **sten**."
      }
    },
    {
      tipe: "susun",
      topik: ["trennbare", "pronomen"],
      perintah: "Susun menjadi pertanyaan.",
      petunjuk: "*[ab]holen* · ich",
      kata: ["*Holst*", "du", "{mich}", "am Freitag", "[ab]"],
      tanda: "?",
      arti: "Kamu menjemputku hari Jumat?",
      penjelasan: "① Pertanyaan ja/nein: **Holst** di posisi 1. ② **ab** tetap di **AKHIR**. ③ **mich** dan **am Freitag** di tengah."
    },
    {
      tipe: "banding",
      topik: ["trennbare", "pronomen", "ordinalzahlen"],
      perintah: "Lengkapi kedua kalimat. Ada Modalverb atau tidak?",
      petunjuk: "*[ein]laden* · ihr · 8. Juni",
      baris: [
        { soal: "Ich ___ {euch} am ___ Juni ___.", jawaban: ["lade", "achten", "ein"],
          kalimat: "Ich *lade* {euch} am !!achten!! Juni [ein].", arti: "Aku mengundang kalian tanggal delapan Juni." },
        { soal: "Ich *möchte* {euch} am ___ Juni ___.", jawaban: ["achten", "einladen"],
          kalimat: "Ich *möchte* {euch} am !!achten!! Juni *[ein]laden*.", arti: "Aku ingin mengundang kalian tanggal delapan Juni." }
      ],
      penjelasan: "① Tanpa Modalverb → terpisah: **lade** … **ein**. Dengan Modalverb → utuh di akhir: **einladen**. ② 8. = **achten** (cukup satu t).",
      jikaMenjawab: {
        "achtten": "8 = **achten**, bukan achtten — cukup satu t.",
        "einlade": "Tanpa Modalverb awalannya lepas: **lade** … **ein**.",
        "laden ein": "Dengan Modalverb kata kerja tidak dipisah: **einladen**."
      }
    },
    {
      tipe: "isi",
      topik: ["praeteritum", "pronomen", "trennbare"],
      perintah: "Lengkapi kalimatnya.",
      petunjuk: "sein (lampau) · Paul",
      soal: "Paul ___ gestern krank. Ich *rufe* ___ heute [an].",
      jawaban: ["war", "ihn"],
      kalimat: "Paul *war* gestern krank. Ich *rufe* {ihn} heute [an].",
      arti: "Kemarin Paul sakit. Hari ini aku meneleponnya.",
      penjelasan: "① Paul = er → sein lampau: **war** (sama seperti ich). ② Paul di sini objek (yang ditelepon) → **ihn**.",
      jikaMenjawab: {
        "ist": "ist adalah bentuk **sekarang**. Lampaunya: **war**.",
        "er": "er itu subjek. Paul di sini objek → **ihn**."
      }
    },
    {
      tipe: "susun",
      topik: ["trennbare", "pronomen", "ordinalzahlen"],
      perintah: "Susun menjadi kalimat yang benar.",
      petunjuk: "wollen + *[ab]holen* · du · 1. Mai",
      kata: ["Wir", "*wollen*", "{dich}", "am !!ersten!! Mai", "*[ab]holen*"],
      tanda: ".",
      jawabanLain: [["am !!ersten!! Mai", "*wollen*", "Wir", "{dich}", "*[ab]holen*"]],
      arti: "Kami mau menjemputmu tanggal satu Mei.",
      penjelasan: "① Modalverb **wollen** di posisi 2, **abholen** utuh di **AKHIR**. ② **dich** dan **am ersten Mai** di tengah kurung kalimat."
    },
    {
      tipe: "pilih",
      topik: ["trennbare", "ordinalzahlen"],
      perintah: "Mana kalimat yang benar?",
      soal: "",
      pilihan: ["Ich hole dich am ersten Mai ab.", "Ich hole dich am einten Mai ab.", "Ich hole dich ab am ersten Mai."],
      jawaban: "Ich hole dich am ersten Mai ab.",
      kalimat: "Ich *hole* {dich} am !!ersten!! Mai [ab].",
      arti: "Aku menjemputmu tanggal satu Mei.",
      penjelasan: "① 1. = **ersten** (tak beraturan). ② Awalan **ab** selalu paling **akhir** — tanggalnya ada di tengah kurung kalimat.",
      jikaMenjawab: {
        "Ich hole dich am einten Mai ab.": "1 = **ersten**, bukan einten. Ini salah satu dari 4 bentuk tak beraturan.",
        "Ich hole dich ab am ersten Mai.": "Awalan **ab** harus di paling **akhir** kalimat, sesudah tanggal."
      }
    },
    {
      tipe: "isi",
      topik: ["praeteritum", "pronomen"],
      perintah: "Lengkapi kalimatnya.",
      petunjuk: "sein (lampau) · meine Mutter",
      soal: "Der Kuchen ___ für ___ Mutter.",
      jawaban: ["war", "meine"],
      kalimat: "Der Kuchen *war* für meine Mutter.",
      arti: "Kue itu (waktu itu) untuk ibuku.",
      penjelasan: "① Der Kuchen = er → sein lampau: **war**. ② Setelah **für** Akkusativ — Mutter feminin, jadi tetap **meine**.",
      jikaMenjawab: {
        "meinen": "Akhiran -en hanya untuk maskulin. Mutter itu feminin → **meine**.",
        "ist": "ist adalah bentuk **sekarang**. Lampaunya: **war**."
      }
    },
    {
      tipe: "susun",
      topik: ["praeteritum"],
      perintah: "Susun menjadi kalimat yang benar. Mulai dengan kata waktu!",
      petunjuk: "sein (lampau) · wir",
      kata: ["Am Wochenende", "*waren*", "wir", "in Berlin"],
      tanda: ".",
      jawabanLain: [["wir", "*waren*", "Am Wochenende", "in Berlin"]],
      arti: "Akhir pekan kemarin kami di Berlin.",
      penjelasan: "Kata waktu di posisi 1 → kata kerja (**waren**) tetap di **posisi 2**, subjek (**wir**) pindah ke belakang kata kerja. (Boleh juga: Wir waren am Wochenende in Berlin.)"
    },
    {
      tipe: "isi",
      topik: ["trennbare", "ordinalzahlen"],
      perintah: "Lengkapi pertanyaan dan jawabannya.",
      petunjuk: "*[an]fangen* · 20. September",
      soal: "Wann ___ der Kurs ___? — Am ___ September.",
      jawaban: ["fängt", "an", "zwanzigsten"],
      kalimat: "Wann *fängt* der Kurs [an]? — Am zwanzigsten September.",
      arti: "Kapan kursusnya mulai? — Tanggal dua puluh September.",
      penjelasan: "① **anfangen** terpisah: **fängt** (posisi 2) … **an** (akhir). ② 20 → **-sten**: zwanzig**sten**.",
      jikaMenjawab: {
        "anfängt": "Tanpa Modalverb awalannya lepas: **fängt** … **an**.",
        "zwanzigten": "Mulai angka 20 akhirannya **-sten**: zwanzig**sten**."
      }
    }
  ]
};
