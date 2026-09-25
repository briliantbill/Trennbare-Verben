/* ================================================================
   QUIZ.JS — engine latihan (hanya di Mode Belajar)

   Membaca soal dari TOPIK.<topik>.latihan (js/data/*.js), lalu:
     • menampilkan satu soal per layar
     • mengecek jawaban dan memberi penjelasan dalam bahasa Indonesia
     • menghitung skor dan menampilkan ringkasan di akhir

   Jenis soal:
     "pilih"   pilihan ganda
     "isi"     ketik jawaban di titik-titik
     "susun"   susun kata acak jadi kalimat (seret dengan mouse/jari, atau ketuk)
     "banding" dua kalimat berpasangan (mis. terpisah vs. dengan Modalverb)
   Format lengkap ada di README.md dan di komentar file data.

   Biasanya Anda TIDAK perlu mengubah file ini.
   ================================================================ */
"use strict";

const JENIS_SOAL = {
  pilih: "Pilihan ganda",
  isi: "Isian",
  susun: "Susun kalimat",
  banding: "Bandingkan"
};
const HURUF_KHUSUS = ["ä", "ö", "ü", "ß"];

/* ---------------------------------------------------------------
   MEMULAI LATIHAN
   --------------------------------------------------------------- */
function renderLatihan(wadah, idTopik) {
  const topik = TOPIK[idTopik];
  const daftar = (topik && topik.latihan) || [];

  if (!daftar.length) {
    wadah.innerHTML = `
      <div class="kartu kosong">
        <span class="ikon" aria-hidden="true">✏️</span>
        <b>Latihan belum diisi</b>
        Soal latihan topik ini sedang disiapkan.
      </div>`;
    return;
  }

  const masalah = periksaDaftarSoal(daftar);
  const sesi = {
    idTopik,
    judul: topik.judul,
    soal: daftar.map(siapkanSoal),
    hasil: daftar.map(() => null),
    draf: {},            // susunan sementara soal "susun" yang belum dicek
    aktif: 0,            // nomor soal yang tampil, atau "hasil"
    putaran: 1,
    nama: "",
    wadah
  };

  wadah.innerHTML = `
    ${masalah.length ? htmlMasalahData(masalah) : ""}
    <div class="latihan">
      <div class="latihan-kepala">
        <div class="latihan-status" data-status aria-live="polite"></div>
        <div class="titik-soal" data-titik></div>
      </div>
      <div class="kartu-soal" data-kartu></div>
    </div>`;

  pasangEventLatihan(sesi);
  pasangSeret(sesi);
  gambarLatihan(sesi);
}

/* Menyiapkan salinan soal: urutan diacak, kunci isian dipecah. */
function siapkanSoal(asli) {
  const s = Object.assign({}, asli);
  if (s.tipe === "pilih") {
    const urutan = (s.pilihan || []).map((_, i) => i);
    s.urutan = s.acak === false ? urutan : acakBeda(urutan);
  }
  if (s.tipe === "isi") s.kunci = kunciIsian(s);
  if (s.tipe === "banding") {
    s.kunci = [];
    s.jumlahIsian = [];
    (s.baris || []).forEach((b) => {
      const k = kunciIsian(b);
      s.jumlahIsian.push(k.length);
      s.kunci.push(...k);
    });
  }
  if (s.tipe === "susun") s.urutan = acakSusun(s);
  return s;
}

/* Acak, tapi usahakan tidak sama dengan urutan asli (jawaban benar tidak selalu di atas). */
function acakBeda(urutan) {
  if (urutan.length < 2) return urutan;
  for (let coba = 0; coba < 6; coba++) {
    const hasil = acak(urutan);
    if (hasil[0] !== urutan[0]) return hasil;
  }
  return acak(urutan);
}

/* Kata-kata susun diacak sampai urutannya bukan jawaban yang benar. */
function acakSusun(s) {
  const asli = (s.kata || []).map((_, i) => i);
  if (asli.length < 2) return asli;
  const jadiKalimat = (urutan) => urutan.map((i) => polos(s.kata[i]).toLowerCase()).join(" ");
  const terlarang = [s.kata].concat(s.jawabanLain || []).map((k) => k.map((x) => polos(x).toLowerCase()).join(" "));
  let hasil = asli;
  for (let coba = 0; coba < 30; coba++) {
    hasil = acak(asli);
    if (!terlarang.includes(jadiKalimat(hasil))) break;
  }
  return hasil;
}

function jumlahTitik(teks) {
  return (String(teks || "").match(/_{3,}/g) || []).length;
}

/* jawaban: "ersten"  atau  ["hole", "ab"]  ;  "a|b" = beberapa jawaban benar */
function kunciIsian(s) {
  const daftar = Array.isArray(s.jawaban) ? s.jawaban : [s.jawaban];
  return daftar.map((j) => String(j == null ? "" : j).split("|").map((a) => a.trim()).filter(Boolean));
}

/* ---------------------------------------------------------------
   MEMBANDINGKAN JAWABAN
   --------------------------------------------------------------- */

/* Bentuk baku untuk dibandingkan: huruf kecil, tanpa tanda baca,
   ß = ss, ä = ae, ö = oe, ü = ue. */
function normal(teks) {
  return polos(teks).toLowerCase()
    .replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    .replace(/[„“”"'’.,!?;:()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* Untuk murid yang lupa umlaut (menulis u untuk ü): hanya dipakai satu arah. */
function tanpaUmlaut(teks) {
  return polos(teks).toLowerCase()
    .replace(/ß/g, "ss").replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u")
    .replace(/[„“”"'’.,!?;:()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function bersihkanMasukan(teks) {
  return String(teks || "").trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
}

/* Menilai satu isian terhadap daftar jawaban yang diterima.
   Hasil: { benar, catatan } — catatan = saran tulisan (umlaut, ß, huruf besar). */
function nilaiIsian(masukan, diterima) {
  const bersih = bersihkanMasukan(masukan);
  for (const a of diterima) {
    if (normal(bersih) !== normal(a)) continue;
    const baku = polos(a);
    if (bersih.toLowerCase() !== baku.toLowerCase()) {
      return { benar: true, catatan: `Tulisan yang tepat: **${baku}**` };
    }
    if (bersih !== baku && /[A-ZÄÖÜ]/.test(baku)) {
      return { benar: true, catatan: `Perhatikan huruf besar: **${baku}**` };
    }
    return { benar: true, catatan: "" };
  }
  for (const a of diterima) {
    if (/[äöüÄÖÜ]/.test(a) && tanpaUmlaut(bersih) === tanpaUmlaut(a) && !/[äöüÄÖÜ]/.test(bersih)) {
      return { benar: true, catatan: `Hampir sempurna — jangan lupa umlaut: **${polos(a)}**` };
    }
  }
  return { benar: false, catatan: "" };
}

/* Tanggapan khusus dari data: jikaMenjawab: { "einten": "…" } */
function cariTanggapan(s, masukan) {
  if (!s.jikaMenjawab) return "";
  const calon = masukan.concat(masukan.length > 1 ? [masukan.join(" ")] : []).map(normal);
  for (const kunci of Object.keys(s.jikaMenjawab)) {
    if (calon.includes(normal(kunci))) return s.jikaMenjawab[kunci];
  }
  return "";
}

/* ---------------------------------------------------------------
   MENGGAMBAR
   --------------------------------------------------------------- */
function gambarLatihan(sesi, opsi = {}) {
  const w = sesi.wadah;
  const total = sesi.soal.length;
  const benar = sesi.hasil.filter((h) => h && h.status === "benar").length;
  const salah = sesi.hasil.filter((h) => h && h.status === "salah").length;
  const dijawab = benar + salah;

  $("[data-status]", w).innerHTML = `
    <span class="status-angka benar" title="Benar">✓ ${benar}</span>
    <span class="status-angka salah" title="Salah">✗ ${salah}</span>
    <span class="status-teks">${dijawab} dari ${total} soal dijawab${sesi.putaran > 1 ? ` · putaran ${sesi.putaran}` : ""}</span>
    ${dijawab === total && sesi.aktif !== "hasil" ? `<button type="button" class="tautan" data-hasil>Lihat hasil →</button>` : ""}`;

  $("[data-titik]", w).innerHTML = sesi.soal.map((_, i) => {
    const h = sesi.hasil[i];
    const kelas = h ? ` ${h.status}` : "";
    const aktif = sesi.aktif === i ? ' aria-current="step"' : "";
    return `<button type="button" class="titik${kelas}" data-ke="${i}"${aktif} aria-label="Soal ${i + 1}${h ? (h.status === "benar" ? ", benar" : ", salah") : ""}">${i + 1}</button>`;
  }).join("") + (dijawab === total
    ? `<button type="button" class="titik titik-hasil"${sesi.aktif === "hasil" ? ' aria-current="step"' : ""} data-hasil aria-label="Hasil">🏁</button>`
    : "");

  const kartu = $("[data-kartu]", w);
  kartu.innerHTML = sesi.aktif === "hasil" ? htmlHasil(sesi) : htmlSoal(sesi, sesi.aktif);
  setelahRenderMateri(kartu);            // garis lengkung Satzklammer di umpan balik

  if (opsi.gulir) {
    const atas = kartu.getBoundingClientRect().top;
    if (atas < 70 || atas > window.innerHeight * 0.6) kartu.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  if (opsi.fokus && sesi.aktif !== "hasil" && !sesi.hasil[sesi.aktif]) {
    const input = $(".isian", kartu);
    if (input) input.focus({ preventScroll: true });
  }
  if (opsi.umpan) {
    const umpan = $(".umpan", kartu);
    if (umpan) umpan.scrollIntoView({ block: "nearest", behavior: "smooth" });
    const lanjut = $("[data-lanjut]", kartu);
    if (lanjut) lanjut.focus({ preventScroll: true });
  }
}

function htmlSoal(sesi, i) {
  const s = sesi.soal[i];
  const h = sesi.hasil[i];
  const total = sesi.soal.length;

  let badan = "";
  if (s.tipe === "pilih") badan = htmlPilih(s, h);
  else if (s.tipe === "isi") badan = htmlIsi(s, h);
  else if (s.tipe === "banding") badan = htmlBanding(s, h);
  else if (s.tipe === "susun") badan = htmlSusun(sesi, i, s, h);
  else badan = `<p class="soal-perintah">Jenis soal "${esc(s.tipe)}" belum didukung.</p>`;

  const berikut = cariBerikutnya(sesi, i);
  const labelLanjut = h
    ? (berikut === "hasil" ? "Lihat hasil" : "Lanjut")
    : "Lewati";

  // Latihan gabungan: label topik yang dicampur di soal ini
  const labelTopik = (s.topik || []).filter((id) => TOPIK[id]).map((id) =>
    `<span class="soal-topik"><span aria-hidden="true">${TOPIK[id].ikon || ""}</span> ${esc(TOPIK[id].judulPendek || TOPIK[id].judul)}</span>`).join("");

  return `
    <div class="soal-atas">
      <span>Soal ${i + 1} <span class="soal-dari">dari ${total}</span></span>
      <span class="soal-jenis">${JENIS_SOAL[s.tipe] || ""}</span>
    </div>
    ${labelTopik ? `<div class="soal-topik-daftar" aria-label="Topik yang dipakai">${labelTopik}</div>` : ""}
    ${s.perintah ? `<p class="soal-perintah">${fmt(s.perintah)}</p>` : ""}
    ${s.petunjuk ? `<p class="soal-petunjuk" lang="de">${fmt(s.petunjuk)}</p>` : ""}
    ${badan}
    ${h ? htmlUmpanBalik(s, h) : ""}
    <div class="soal-nav">
      <button type="button" class="tombol tipis" data-mundur ${i === 0 ? "disabled" : ""}>◀<span class="lbl-hp"> Sebelumnya</span></button>
      <button type="button" class="tombol${h ? "" : " tipis"}" data-lanjut>${labelLanjut} ▶</button>
    </div>`;
}

/* --- Pilihan ganda --- */
function htmlPilih(s, h) {
  const tombol = s.urutan.map((idx) => {
    const teks = s.pilihan[idx];
    let kelas = "";
    if (h) {
      if (normal(teks) === normal(s.jawaban)) kelas = " benar";
      else if (idx === h.pilihan) kelas = " salah";
      else kelas = " redup";
    }
    return `<button type="button" class="opsi${kelas}" data-pilih="${idx}" lang="de" ${h ? "disabled" : ""}>${fmt(teks)}</button>`;
  }).join("");

  return `
    ${s.soal ? `<p class="soal-kalimat" lang="de">${fmt(s.soal)}</p>` : ""}
    <div class="opsi-daftar">${tombol}</div>`;
}

/* --- Isian --- */
/* Kalimat dengan kotak isian di tempat ___. `mulai` = nomor isian pertama
   (soal banding punya beberapa kalimat, nomor isiannya bersambung). */
function htmlKalimatIsian(soal, s, h, mulai) {
  const potongan = String(soal || "").split(/_{3,}/);
  const n = Math.max(potongan.length - 1, 1);
  const totalIsian = s.kunci.length;

  const input = (k) => {
    const nomor = mulai + k;
    const diterima = s.kunci[nomor] || [];
    const lebar = Math.max(5, ...diterima.map((a) => polos(a).length)) + 2;
    const nilai = h ? h.masukan[nomor] || "" : "";
    const kelas = h ? (h.perIsian[nomor] ? " benar" : " salah") : "";
    return `<input class="isian${kelas}" data-isian="${nomor}" type="text" value="${esc(nilai)}"
      style="width:${lebar}ch" ${h ? "disabled" : ""}
      autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
      enterkeyhint="${nomor < totalIsian - 1 ? "next" : "done"}" aria-label="Isian ${nomor + 1}">`;
  };

  if (potongan.length === 1) {
    return { html: `<p class="soal-kalimat" lang="de">${fmt(soal)}</p><div class="isian-baris">${input(0)}</div>`, jumlah: 1 };
  }
  const html = `<p class="soal-kalimat" lang="de">${potongan.map((p, k) => fmt(p) + (k < n ? input(k) : "")).join("")}</p>`;
  return { html, jumlah: n };
}

function kontrolIsian() {
  return `
    <div class="huruf-khusus" aria-label="Huruf khusus">
      ${HURUF_KHUSUS.map((c) => `<button type="button" data-huruf="${c}" tabindex="-1">${c}</button>`).join("")}
    </div>
    <p class="isian-pesan" data-pesan role="alert"></p>
    <div class="soal-aksi">
      <button type="button" class="tombol" data-cek>Cek jawaban</button>
    </div>`;
}

function htmlIsi(s, h) {
  const kalimat = htmlKalimatIsian(s.soal, s, h, 0).html;
  return h ? kalimat : kalimat + kontrolIsian();
}

/* --- Banding: beberapa kalimat berpasangan --- */
function htmlBanding(s, h) {
  let mulai = 0;
  const baris = (s.baris || []).map((b, k) => {
    const r = htmlKalimatIsian(b.soal, s, h, mulai);
    mulai += s.jumlahIsian[k];
    const status = h ? (barisBandingBenar(s, h, k) ? " benar" : " salah") : "";
    return `
      <div class="banding-baris${status}">
        <span class="banding-label">${fmt(labelBanding(b, k))}</span>
        ${r.html}
      </div>`;
  }).join("");
  return `<div class="banding">${baris}</div>${h ? "" : kontrolIsian()}`;
}

function labelBanding(b, k) {
  return b.label || (k === 0 ? "Tanpa Modalverb" : "Dengan Modalverb");
}

function barisBandingBenar(s, h, k) {
  const mulai = s.jumlahIsian.slice(0, k).reduce((a, b) => a + b, 0);
  return h.perIsian.slice(mulai, mulai + s.jumlahIsian[k]).every(Boolean);
}

/* --- Susun kalimat --- */
function peranKata(teks) {
  const t = String(teks).trim();
  if (/^\[[^\]]+\]$/.test(t)) return "peran-awalan";
  if (/^\*/.test(t)) return "peran-verb";
  if (/^\{[^}]+\}$/.test(t)) return "peran-pro";
  return "";
}

function htmlChip(s, idx, kelas, nonaktif) {
  return `<button type="button" class="chip ${peranKata(s.kata[idx])}${kelas || ""}" data-chip="${idx}" lang="de" ${nonaktif ? "disabled" : ""}><span class="chip-isi">${fmt(s.kata[idx])}</span></button>`;
}

function htmlSusun(sesi, i, s, h) {
  const tanda = `<span class="susun-tanda">${esc(s.tanda || "")}</span>`;

  if (h) {
    const benarKata = s.kata.map((k) => polos(k).toLowerCase());
    const chips = h.susunan.map((idx, p) => {
      const pas = h.status === "benar" || polos(s.kata[idx]).toLowerCase() === benarKata[p];
      return htmlChip(s, idx, pas ? " pas" : " meleset", true);
    }).join("");
    return `
      <div class="susun selesai">
        <p class="susun-label">Kalimatmu:</p>
        <div class="susun-jawaban">${chips}${tanda}</div>
      </div>`;
  }

  const draf = sesi.draf[i] || [];
  const jawaban = draf.map((idx) => htmlChip(s, idx)).join("");
  const bank = s.urutan.map((idx) => (draf.includes(idx)
    ? `<span class="chip ${peranKata(s.kata[idx])} terpakai" aria-hidden="true"><span class="chip-isi">${fmt(s.kata[idx])}</span></span>`
    : htmlChip(s, idx))).join("");

  return `
    <div class="susun" data-susun>
      <p class="susun-label">Kalimatmu:</p>
      <div class="susun-jawaban${draf.length ? "" : " kosong"}" data-zona="jawaban" aria-label="Kalimat jawaban">
        ${jawaban || '<span class="susun-petunjuk">Ketuk kata di bawah — atau seret ke sini.</span>'}${tanda}
      </div>
      <p class="susun-label">Kata-kata:</p>
      <div class="susun-bank" data-zona="bank" aria-label="Kata-kata acak">${bank}</div>
    </div>
    <p class="isian-pesan" data-pesan role="alert"></p>
    <div class="soal-aksi">
      <button type="button" class="tombol" data-cek>Cek jawaban</button>
      <button type="button" class="tombol tipis" data-kosongkan ${draf.length ? "" : "disabled"}>↺ Ulang</button>
    </div>`;
}

/* Untuk urutan lain yang juga benar (mis. "Um 7 Uhr stehe ich auf."):
   kata pertama huruf besar; kata tugas yang pindah ke tengah jadi huruf kecil.
   Kata benda dan nama orang tidak diubah. */
const KATA_BIASA_KECIL = ["ich", "du", "er", "es", "wir", "ihr", "am", "im", "um", "in", "an", "auf", "für",
  "gestern", "heute", "morgen", "dann", "jetzt", "letzte", "letztes", "letzten"];

function rapikanKalimat(kata) {
  return kata.map((k, i) => {
    if (i === 0) return k.replace(/^(\W*)(\p{Ll})/u, (_, a, b) => a + b.toUpperCase());
    return k.replace(/^(\W*)(\p{Lu})(\p{Ll}*)/u, (asli, a, b, c) =>
      (KATA_BIASA_KECIL.includes((b + c).toLowerCase()) ? a + b.toLowerCase() + c : asli));
  });
}

/* Membaca susunan murid dan mencari kesalahan posisi yang khas trennbare Verben. */
function diagnosaSusun(s, susunan) {
  const n = s.kata.length;
  const peran = s.kata.map(peranKata);
  const verb = peran.map((p, i) => (p === "peran-verb" ? i : -1)).filter((i) => i >= 0);
  const awalan = peran.indexOf("peran-awalan");
  const posisiMurid = (idx) => susunan.indexOf(idx);
  const nama = (idx) => polos(s.kata[idx]);
  const pesan = [];

  if (awalan >= 0 && posisiMurid(awalan) !== n - 1) {
    const pa = posisiMurid(awalan);
    const pv = verb.length ? posisiMurid(verb[0]) : -9;
    if (pa === pv - 1) pesan.push(`Awalan **${nama(awalan)}** tidak menempel di depan kata kerja. Ia lepas dan pindah ke **AKHIR** kalimat.`);
    else if (pa === pv + 1) pesan.push(`Awalan **${nama(awalan)}** tidak ikut di samping kata kerja — ia pindah ke paling **AKHIR** kalimat.`);
    else pesan.push(`Awalan **${nama(awalan)}** selalu di paling **AKHIR** kalimat.`);
  }
  if (verb.length && posisiMurid(verb[0]) !== verb[0]) {
    if (verb[0] === 0) pesan.push(`Di pertanyaan ja/nein dan kalimat perintah, kata kerja (**${nama(verb[0])}**) ada di **posisi 1**.`);
    else if (verb[0] === 1) pesan.push(`Kata kerja (**${nama(verb[0])}**) harus di **posisi 2**.`);
  }
  if (verb.length >= 2) {
    const utama = verb[verb.length - 1];
    if (utama === n - 1 && posisiMurid(utama) !== n - 1) {
      pesan.push(`Dengan Modalverb, kata kerja utama (**${nama(utama)}**) tetap **utuh** di **AKHIR** kalimat.`);
    }
  }
  return pesan;
}

/* --- Kalimat lengkap yang benar (untuk umpan balik) --- */
function isiKalimat(soal, kunci, mulai) {
  const tandai = (teks) => `<span class="isian-hasil">${fmt(teks)}</span>`;
  const potongan = String(soal || "").split(/_{3,}/);
  if (potongan.length === 1) return tandai((kunci[mulai] || [""])[0]);
  return potongan.map((p, k) => fmt(p) + (k < potongan.length - 1 ? tandai((kunci[mulai + k] || [""])[0]) : "")).join("");
}

function kalimatBaris(s, k) {
  const b = s.baris[k];
  if (b.kalimat) return fmt(b.kalimat);
  const mulai = s.jumlahIsian.slice(0, k).reduce((a, x) => a + x, 0);
  return isiKalimat(b.soal, s.kunci, mulai);
}

function kalimatBenar(s, h) {
  if (s.tipe === "susun") {
    const benarDariMurid = h && h.status === "benar";
    const kata = benarDariMurid ? rapikanKalimat(h.susunan.map((i) => s.kata[i])) : s.kata;
    return fmt(kata.join(" ") + (s.tanda || ""));
  }
  if (s.tipe === "banding") return s.baris.map((_, k) => kalimatBaris(s, k)).join("<br>");
  if (s.kalimat) return fmt(s.kalimat);
  if (s.tipe === "isi") return isiKalimat(s.soal, s.kunci, 0);
  if (s.tipe === "pilih") {
    const tandai = `<span class="isian-hasil">${fmt(s.jawaban)}</span>`;
    if (!s.soal || jumlahTitik(s.soal) === 0) return tandai;
    return String(s.soal).split(/_{3,}/).map(fmt).join(tandai);
  }
  return "";
}

/* Kalimat benar + garis lengkung Satzklammer (otomatis untuk kalimat trennbar). */
function kalimatBerklammer(html, klammer) {
  if (klammer === false) return html;
  return `<span class="klammer" data-klammer="${klammer ? "ya" : "auto"}">${html}</span>`;
}

function htmlUmpanBalik(s, h) {
  const tanggapan = s.tipe === "susun" ? "" : cariTanggapan(s, h.masukan);
  const arti = (teks) => (teks ? `<p class="umpan-arti"><span class="umpan-arti-lbl">Artinya:</span> ${fmt(teks)}</p>` : "");

  // Kalimat yang benar: soal banding menampilkan dua kalimat berdampingan
  let blokBenar;
  if (s.tipe === "banding") {
    blokBenar = s.baris.map((b, k) => {
      const ok = barisBandingBenar(s, h, k);
      return `
        <div class="umpan-banding ${ok ? "benar" : "salah"}">
          <span class="banding-label">${fmt(labelBanding(b, k))}</span>
          <p class="umpan-kalimat" lang="de">${kalimatBerklammer(kalimatBaris(s, k), b.klammer)}</p>
          ${arti(b.arti)}
        </div>`;
    }).join("");
  } else {
    blokBenar = `<p class="umpan-kalimat" lang="de">${kalimatBerklammer(kalimatBenar(s, h), s.klammer)}</p>${arti(s.arti)}`;
  }

  if (h.status === "benar") {
    const catatan = h.catatan.concat(tanggapan ? [tanggapan] : []);
    return `
      <div class="umpan benar" role="status">
        <p class="umpan-judul">✓ Benar!</p>
        ${blokBenar}
        ${catatan.map((c) => `<p class="umpan-catatan">💡 ${fmt(c)}</p>`).join("")}
      </div>`;
  }

  const penjelasan = (s.tipe === "susun" ? diagnosaSusun(s, h.susunan) : [])
    .concat(tanggapan ? [tanggapan] : [])
    .concat(s.penjelasan ? [s.penjelasan] : []);
  const jawabanmu = h.masukan.filter((m) => m.trim()).map(esc).join(" … ");

  return `
    <div class="umpan salah" role="status">
      <p class="umpan-judul">✗ Belum tepat</p>
      ${s.tipe === "susun" ? "" : `<p class="umpan-jawabanmu">Jawabanmu: <s>${jawabanmu || "—"}</s></p>`}
      <div class="umpan-benar">
        <p class="umpan-label">Yang benar:</p>
        ${blokBenar}
      </div>
      ${penjelasan.length ? `
        <div class="umpan-penjelasan">
          <p class="umpan-label">Kenapa?</p>
          ${penjelasan.map((p) => `<p>${fmt(p)}</p>`).join("")}
        </div>` : ""}
    </div>`;
}

/* --- Ringkasan akhir --- */
function htmlHasil(sesi) {
  const total = sesi.soal.length;
  const benar = sesi.hasil.filter((h) => h && h.status === "benar").length;
  const persen = Math.round((benar / total) * 100);
  const salah = sesi.hasil.map((h, i) => (h && h.status === "salah" ? i : -1)).filter((i) => i >= 0);

  let emoji = "💪", pesan = "Tidak apa-apa! Baca lagi materinya, lalu ulangi soal yang salah.";
  if (persen === 100) { emoji = "🏆"; pesan = "Sempurna — semua benar!"; }
  else if (persen >= 80) { emoji = "🎉"; pesan = "Bagus sekali! Tinggal sedikit lagi."; }
  else if (persen >= 50) { emoji = "👍"; pesan = "Lumayan! Ulangi yang salah sampai polanya terasa otomatis."; }

  const tanggal = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const daftarSalah = salah.length ? `
    <div class="hasil-salah">
      <p class="umpan-label">Soal yang masih salah:</p>
      <ul>
        ${salah.map((i) => `
          <li>
            <button type="button" class="tautan" data-ke="${i}">Soal ${i + 1}</button>
            <span lang="de">${kalimatBenar(sesi.soal[i])}</span>
          </li>`).join("")}
      </ul>
    </div>` : "";

  return `
    <div class="hasil">
      <p class="hasil-emoji" aria-hidden="true">${emoji}</p>
      <p class="hasil-skor">${benar}<span>/${total}</span></p>
      <p class="hasil-pesan">${pesan}</p>
      <div class="hasil-identitas">
        <label>Nama <input type="text" class="hasil-nama" data-nama value="${esc(sesi.nama)}" placeholder="Tulis namamu" autocomplete="name"></label>
        <p>${esc(sesi.judul)} · ${tanggal}${sesi.putaran > 1 ? ` · putaran ${sesi.putaran}` : ""}</p>
        <p class="hasil-tips">📸 Untuk PR: tulis namamu, lalu screenshot layar ini dan kirim ke guru.</p>
      </div>
      ${daftarSalah}
      <div class="hasil-tombol">
        ${salah.length ? `<button type="button" class="tombol" data-ulang="salah">🔁 Ulangi yang salah (${salah.length})</button>` : ""}
        <button type="button" class="tombol tipis" data-ulang="semua">Ulangi semua soal</button>
      </div>
    </div>`;
}

function htmlMasalahData(masalah) {
  return `
    <div class="kartu masalah-data">
      <b>⚠️ Catatan untuk guru: ada soal yang perlu diperbaiki di file data</b>
      <ul>${masalah.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
    </div>`;
}

/* ---------------------------------------------------------------
   INTERAKSI (klik, ketik, Enter)
   --------------------------------------------------------------- */
function pasangEventLatihan(sesi) {
  const w = sesi.wadah;

  w.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t || t.disabled) return;

    if (t.hasAttribute("data-chip")) {
      if (performance.now() < (sesi.abaikanKlikSampai || 0)) return;   // baru saja diseret
      return ketukChip(sesi, t, e.detail === 0);
    }
    if (t.hasAttribute("data-pilih")) return jawabPilih(sesi, Number(t.dataset.pilih));
    if (t.hasAttribute("data-cek")) return sesi.soal[sesi.aktif].tipe === "susun" ? cekSusun(sesi) : cekIsian(sesi);
    if (t.hasAttribute("data-kosongkan")) { sesi.draf[sesi.aktif] = []; return gambarLatihan(sesi); }
    if (t.hasAttribute("data-huruf")) return sisipkanHuruf(sesi, t.dataset.huruf);
    if (t.hasAttribute("data-ke")) return keSoal(sesi, Number(t.dataset.ke));
    if (t.hasAttribute("data-hasil")) return keSoal(sesi, "hasil");
    if (t.hasAttribute("data-mundur")) return keSoal(sesi, sesi.aktif - 1);
    if (t.hasAttribute("data-lanjut")) return keSoal(sesi, cariBerikutnya(sesi, sesi.aktif));
    if (t.hasAttribute("data-ulang")) return ulangi(sesi, t.dataset.ulang);
  });

  // Tombol ä ö ü ß: jangan sampai kursor pindah dari kotak isian (keyboard HP tetap terbuka)
  w.addEventListener("pointerdown", (e) => {
    if (e.target.closest("[data-huruf]")) e.preventDefault();
  });

  w.addEventListener("focusin", (e) => {
    if (e.target.matches(".isian")) sesi.isianTerakhir = e.target;
  });

  w.addEventListener("input", (e) => {
    if (e.target.matches("[data-nama]")) sesi.nama = e.target.value;
    if (e.target.matches(".isian")) tampilkanPesan(sesi, "");
  });

  // Enter: pindah ke titik-titik berikutnya, atau cek jawaban
  w.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" || !e.target.matches(".isian")) return;
    e.preventDefault();
    const semua = $$(".isian", $("[data-kartu]", w));
    const posisi = semua.indexOf(e.target);
    const kosong = semua.find((x, k) => k > posisi && !x.value.trim());
    if (e.target.value.trim() && kosong) kosong.focus();
    else cekIsian(sesi);
  });
}

function cariBerikutnya(sesi, dari) {
  const n = sesi.soal.length;
  for (let k = 1; k <= n; k++) {
    const j = (dari + k) % n;
    if (!sesi.hasil[j]) return j;
  }
  return "hasil";
}

function keSoal(sesi, tujuan) {
  if (tujuan !== "hasil" && (tujuan < 0 || tujuan >= sesi.soal.length)) return;
  sesi.aktif = tujuan;
  gambarLatihan(sesi, { gulir: true, fokus: true });
}

function jawabPilih(sesi, idx) {
  const i = sesi.aktif;
  const s = sesi.soal[i];
  if (sesi.hasil[i]) return;
  const teks = s.pilihan[idx];
  sesi.hasil[i] = {
    status: normal(teks) === normal(s.jawaban) ? "benar" : "salah",
    pilihan: idx,
    masukan: [polos(teks)],
    catatan: []
  };
  gambarLatihan(sesi, { umpan: true });
}

function cekIsian(sesi) {
  const i = sesi.aktif;
  const s = sesi.soal[i];
  if (sesi.hasil[i]) return;

  const kartu = $("[data-kartu]", sesi.wadah);
  const semua = $$(".isian", kartu);
  const kosong = semua.find((x) => !x.value.trim());
  if (kosong) {
    tampilkanPesan(sesi, semua.length > 1 ? "Isi semua titik-titik dulu, ya." : "Tulis jawabanmu dulu, ya.");
    kosong.focus();
    return;
  }

  const masukan = semua.map((x) => x.value);
  const nilai = masukan.map((m, k) => nilaiIsian(m, s.kunci[k] || []));
  sesi.hasil[i] = {
    status: nilai.every((n) => n.benar) ? "benar" : "salah",
    masukan: masukan.map(bersihkanMasukan),
    perIsian: nilai.map((n) => n.benar),
    catatan: nilai.map((n) => n.catatan).filter(Boolean)
  };
  gambarLatihan(sesi, { umpan: true });
}

function cekSusun(sesi) {
  const i = sesi.aktif;
  const s = sesi.soal[i];
  if (sesi.hasil[i]) return;
  const draf = sesi.draf[i] || [];
  if (draf.length < s.kata.length) {
    tampilkanPesan(sesi, draf.length ? "Masih ada kata yang belum dipakai." : "Susun kata-katanya dulu, ya.");
    return;
  }
  const kalimatMurid = draf.map((idx) => polos(s.kata[idx]).toLowerCase()).join(" ");
  const cocok = (urutan) => urutan.map((k) => polos(k).toLowerCase()).join(" ") === kalimatMurid;
  const benar = cocok(s.kata) || (s.jawabanLain || []).some(cocok);

  sesi.hasil[i] = {
    status: benar ? "benar" : "salah",
    susunan: draf.slice(),
    masukan: [draf.map((idx) => polos(s.kata[idx])).join(" ") + (s.tanda || "")],
    catatan: []
  };
  delete sesi.draf[i];
  gambarLatihan(sesi, { umpan: true });
}

/* Ketuk kata: dari bawah → masuk ke kalimat; di kalimat → kembali ke bawah. */
function ketukChip(sesi, chip, dariKeyboard) {
  const i = sesi.aktif;
  const idx = Number(chip.dataset.chip);
  const zona = chip.closest("[data-zona]").dataset.zona;
  const draf = (sesi.draf[i] || []).slice();
  const posisiLama = $$(`[data-zona="${zona}"] .chip[data-chip]`, sesi.wadah).indexOf(chip);

  if (zona === "bank") draf.push(idx);
  else draf.splice(draf.indexOf(idx), 1);
  sesi.draf[i] = draf;
  gambarLatihan(sesi);

  if (dariKeyboard) {   // pengguna keyboard: fokus pindah ke kata berikutnya
    const sisa = $$(`[data-zona="${zona}"] .chip[data-chip]`, sesi.wadah);
    const target = sisa[posisiLama] || sisa[sisa.length - 1] || $("[data-cek]", sesi.wadah);
    if (target) target.focus();
  }
}

function tampilkanPesan(sesi, teks) {
  const el = $("[data-pesan]", sesi.wadah);
  if (el) el.textContent = teks;
}

function sisipkanHuruf(sesi, huruf) {
  const kartu = $("[data-kartu]", sesi.wadah);
  let input = sesi.isianTerakhir;
  if (!input || !kartu.contains(input) || input.disabled) input = $(".isian", kartu);
  if (!input || input.disabled) return;

  const awal = input.selectionStart != null ? input.selectionStart : input.value.length;
  const akhir = input.selectionEnd != null ? input.selectionEnd : input.value.length;
  input.value = input.value.slice(0, awal) + huruf + input.value.slice(akhir);
  input.focus();
  input.setSelectionRange(awal + huruf.length, awal + huruf.length);
  tampilkanPesan(sesi, "");
}

function ulangi(sesi, apa) {
  let pertama = 0;
  if (apa === "salah") {
    const salah = sesi.hasil.map((h, i) => (h && h.status === "salah" ? i : -1)).filter((i) => i >= 0);
    salah.forEach((i) => {
      sesi.hasil[i] = null;
      sesi.soal[i] = siapkanSoal(TOPIK[sesi.idTopik].latihan[i]);
      delete sesi.draf[i];
    });
    pertama = salah[0] || 0;
  } else {
    sesi.soal = TOPIK[sesi.idTopik].latihan.map(siapkanSoal);
    sesi.hasil = sesi.soal.map(() => null);
    sesi.draf = {};
  }
  sesi.putaran += 1;
  sesi.aktif = pertama;
  gambarLatihan(sesi, { gulir: true, fokus: true });
}

/* ---------------------------------------------------------------
   SERET & LEPAS (drag & drop) UNTUK SOAL SUSUN
   Bekerja dengan mouse DAN sentuhan jari:
     • Pointer Events (semua browser modern: mouse, jari, pena)
     • cadangan Touch Events + Mouse Events untuk browser lama
   Ketukan biasa (tanpa menyeret) ditangani oleh event "click" di atas.
   --------------------------------------------------------------- */
function pasangSeret(sesi) {
  const w = sesi.wadah;
  let seret = null;

  const kartu = () => $("[data-kartu]", w);

  function mulaiDari(target, x, y) {
    const chip = target && target.closest ? target.closest(".chip[data-chip]") : null;
    if (!chip || chip.disabled || !w.contains(chip) || !chip.closest("[data-susun]")) return false;
    seret = { chip, idx: Number(chip.dataset.chip), asal: chip.closest("[data-zona]").dataset.zona, x0: x, y0: y, aktif: false };
    return true;
  }

  function mulaiSeret(x, y) {
    const r = seret.chip.getBoundingClientRect();
    seret.aktif = true;
    seret.dx = x - r.left;
    seret.dy = y - r.top;
    const bayangan = seret.chip.cloneNode(true);
    bayangan.classList.add("chip-bayangan");
    bayangan.removeAttribute("data-chip");
    bayangan.style.width = `${r.width}px`;
    bayangan.style.height = `${r.height}px`;
    document.body.appendChild(bayangan);
    seret.bayangan = bayangan;
    seret.chip.classList.add("diseret");
    document.body.classList.add("sedang-menyeret");
  }

  function gerak(x, y) {
    if (!seret) return false;
    if (!seret.aktif) {
      if (Math.hypot(x - seret.x0, y - seret.y0) < 6) return false;
      mulaiSeret(x, y);
    }
    seret.bayangan.style.transform = `translate(${x - seret.dx}px, ${y - seret.dy}px) rotate(-2deg) scale(1.06)`;
    perbaruiTarget(x, y);
    if (y < 90) window.scrollBy(0, -12);
    else if (y > window.innerHeight - 70) window.scrollBy(0, 12);
    return true;
  }

  function hapusPenanda() {
    $$(".penanda-sisip", w).forEach((p) => p.remove());
  }

  function hitungPosisi(zona, x, y) {
    const chips = $$(".chip[data-chip]", zona).filter((c) => c !== seret.chip);
    for (let p = 0; p < chips.length; p++) {
      const r = chips[p].getBoundingClientRect();
      if (y < r.top - 6) return p;
      if (y <= r.bottom + 6 && x < r.left + r.width / 2) return p;
    }
    return chips.length;
  }

  function perbaruiTarget(x, y) {
    const k = kartu();
    const zJawab = $('[data-zona="jawaban"]', k);
    const zBank = $('[data-zona="bank"]', k);
    if (!zJawab || !zBank) return;
    const bawah = document.elementFromPoint(x, y);
    const zona = bawah && bawah.closest ? bawah.closest("[data-zona]") : null;

    hapusPenanda();
    zJawab.classList.toggle("disorot", zona === zJawab);
    zBank.classList.toggle("disorot", zona === zBank && seret.asal === "jawaban");
    seret.target = null;

    if (zona === zJawab) {
      const posisi = hitungPosisi(zJawab, x, y);
      seret.target = { zona: "jawaban", posisi };
      const chips = $$(".chip[data-chip]", zJawab).filter((c) => c !== seret.chip);
      const penanda = document.createElement("span");
      penanda.className = "penanda-sisip";
      zJawab.insertBefore(penanda, chips[posisi] || $(".susun-tanda", zJawab));
    } else if (zona === zBank) {
      seret.target = { zona: "bank" };
    }
  }

  function bersihkan() {
    if (seret && seret.bayangan) seret.bayangan.remove();
    if (seret && seret.chip) seret.chip.classList.remove("diseret");
    document.body.classList.remove("sedang-menyeret");
    hapusPenanda();
    $$(".disorot", w).forEach((z) => z.classList.remove("disorot"));
  }

  function lepas() {
    if (!seret) return;
    const s = seret;
    if (!s.aktif) { seret = null; return; }        // hanya ketukan → ditangani "click"
    bersihkan();
    seret = null;
    sesi.abaikanKlikSampai = performance.now() + 350;

    const i = sesi.aktif;
    const draf = (sesi.draf[i] || []).filter((x) => x !== s.idx);
    if (s.target && s.target.zona === "jawaban") draf.splice(s.target.posisi, 0, s.idx);
    else if (!(s.target && s.target.zona === "bank")) return;   // dilepas di luar → batal
    sesi.draf[i] = draf;
    gambarLatihan(sesi);
  }

  function batal() {
    if (!seret) return;
    bersihkan();
    seret = null;
  }

  if (window.PointerEvent) {
    w.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (mulaiDari(e.target, e.clientX, e.clientY)) seret.pointerId = e.pointerId;
    });
    window.addEventListener("pointermove", (e) => {
      if (seret && e.pointerId === seret.pointerId && gerak(e.clientX, e.clientY)) e.preventDefault();
    }, { passive: false });
    window.addEventListener("pointerup", (e) => { if (seret && e.pointerId === seret.pointerId) lepas(); });
    window.addEventListener("pointercancel", batal);
  } else {
    // Browser lama: Touch Events (HP) + Mouse Events (laptop)
    w.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      mulaiDari(e.target, t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      if (seret && gerak(t.clientX, t.clientY)) e.preventDefault();
    }, { passive: false });
    window.addEventListener("touchend", lepas);
    window.addEventListener("touchcancel", batal);
    w.addEventListener("mousedown", (e) => { if (e.button === 0) mulaiDari(e.target, e.clientX, e.clientY); });
    window.addEventListener("mousemove", (e) => gerak(e.clientX, e.clientY));
    window.addEventListener("mouseup", lepas);
  }
}

/* ---------------------------------------------------------------
   PEMERIKSAAN DATA SOAL
   Membantu guru menemukan kesalahan saat menambah soal sendiri.
   --------------------------------------------------------------- */
function periksaDaftarSoal(daftar) {
  const masalah = [];
  const cekJumlahJawaban = (no, s) => {
    const titik = Math.max(1, jumlahTitik(s.soal));
    const jawaban = Array.isArray(s.jawaban) ? s.jawaban : [s.jawaban];
    if (s.jawaban == null || s.jawaban === "") masalah.push(`${no}: "jawaban" belum diisi.`);
    else if (jawaban.length !== titik) {
      masalah.push(`${no}: ada ${titik} titik-titik (___) tapi ${jawaban.length} jawaban. Kalau ada beberapa jawaban benar untuk satu titik-titik, pisahkan dengan | (contoh: "Sie|sie").`);
    }
  };

  daftar.forEach((s, i) => {
    const no = `Soal ${i + 1}`;
    if (!s || typeof s !== "object") { masalah.push(`${no}: bukan soal yang valid.`); return; }
    if (!JENIS_SOAL[s.tipe]) {
      masalah.push(`${no}: tipe "${s.tipe}" tidak dikenal (pakai: ${Object.keys(JENIS_SOAL).join(", ")}).`);
      return;
    }
    if (s.tipe === "pilih") {
      if (!Array.isArray(s.pilihan) || s.pilihan.length < 2) {
        masalah.push(`${no}: "pilihan" harus berisi minimal 2 jawaban.`);
      } else if (!s.pilihan.some((p) => normal(p) === normal(s.jawaban))) {
        masalah.push(`${no}: "jawaban" (${polos(s.jawaban)}) tidak sama dengan salah satu "pilihan".`);
      }
    }
    if (s.tipe === "isi") cekJumlahJawaban(no, s);
    if (s.tipe === "banding") {
      if (!Array.isArray(s.baris) || s.baris.length < 2) masalah.push(`${no}: "baris" harus berisi minimal 2 kalimat.`);
      else s.baris.forEach((b, k) => cekJumlahJawaban(`${no}, kalimat ${k + 1}`, b));
    }
    if (s.tipe === "susun") {
      if (!Array.isArray(s.kata) || s.kata.length < 2) masalah.push(`${no}: "kata" harus berisi minimal 2 kata.`);
      (s.jawabanLain || []).forEach((alt, k) => {
        const a = alt.map((x) => polos(x).toLowerCase()).sort().join("|");
        const b = (s.kata || []).map((x) => polos(x).toLowerCase()).sort().join("|");
        if (a !== b) masalah.push(`${no}: "jawabanLain" ke-${k + 1} harus memakai kata-kata yang sama dengan "kata".`);
      });
    }
    (s.topik || []).forEach((id) => {
      if (!TOPIK[id] || id === ID_GABUNGAN) masalah.push(`${no}: topik "${id}" tidak dikenal (pakai: ${URUTAN_TOPIK.join(", ")}).`);
    });
    if (!s.penjelasan) masalah.push(`${no}: "penjelasan" masih kosong — murid tidak mendapat penjelasan kalau salah.`);
  });
  masalah.forEach((m) => console.warn(m));
  return masalah;
}
