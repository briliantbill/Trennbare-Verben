/* ================================================================
   MAIN.JS — logika umum (dipakai kedua mode)

   Isi file ini:
     1. Pengaturan urutan topik
     2. Alat bantu teks: kode warna *kata* [ab] {dich} !!ersten!!
     3. Penggambar blok materi (teks, aturan, catatan, tabel, contoh, …)
        — dipakai Mode Belajar DAN Mode Presentasi
     4. Navigasi (alamat #/belajar/… dan #/presentasi/…) & toggle mode
     5. Halaman Mode Belajar: Beranda dan halaman topik

   Biasanya Anda TIDAK perlu mengubah file ini. Materi dan soal ada di
   js/data/*.js.
   ================================================================ */
"use strict";

var TOPIK = TOPIK || {};

/* ---------------------------------------------------------------
   1. URUTAN TOPIK
   --------------------------------------------------------------- */
const URUTAN_TOPIK = ["ordinalzahlen", "praeteritum", "pronomen", "trennbare"];
const ID_GABUNGAN = "gabungan";

const FILE_DATA = {
  ordinalzahlen: "js/data/ordinalzahlen.js",
  praeteritum: "js/data/praeteritum.js",
  pronomen: "js/data/pronomen.js",
  trennbare: "js/data/trennbare.js",
  gabungan: "js/data/gabungan.js"
};

/* Keadaan aplikasi (hanya di memori — tidak disimpan di browser) */
const app = {
  mode: "belajar",
  belajar: { topik: null, tab: "materi" },
  presentasi: { topik: null, slide: 0 },
  scrollBelajar: 0
};

/* ---------------------------------------------------------------
   2. ALAT BANTU TEKS
   --------------------------------------------------------------- */
const $ = (sel, akar = document) => akar.querySelector(sel);
const $$ = (sel, akar = document) => Array.from(akar.querySelectorAll(sel));

function esc(teks) {
  return String(teks == null ? "" : teks).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

/* Mengubah kode warna di teks data menjadi HTML berwarna.
     **tebal**     → huruf tebal
     !!ersten!!    → merah   (bentuk tak beraturan)
     [ab]          → kotak oranye (awalan trennbar)
     {dich}        → biru    (pronomen Akkusativ)
     *hole* *kann* → oranye  (kata kerja / Modalverb)
     ~~einten~~    → dicoret (bentuk yang salah)
     ___           → titik-titik
     ->            → panah →
   Awalan boleh ada di dalam kata kerja: *[ab]holen* (awalan masih menempel). */
function fmt(teks) {
  if (teks == null) return "";
  return String(teks)
    .replace(/->/g, "→")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/~~(.+?)~~/g, '<s class="g-salah">$1</s>')
    .replace(/!!(.+?)!!/g, '<span class="g-irr">$1</span>')
    .replace(/\[([^\[\]]+?)\]/g, '<span class="g-pre">$1</span>')
    .replace(/\{([^{}]+?)\}/g, '<span class="g-pro">$1</span>')
    .replace(/\*([^*]+?)\*/g, '<span class="g-verb">$1</span>')
    .replace(/_{3,}/g, '<span class="g-blank"></span>')
    // akhiran seperti "-ten" jangan terpotong di akhir baris
    .replace(/(^|[\s(>])(-[A-Za-zÄÖÜäöüß]+)/g, '$1<span class="nw">$2</span>');
}

/* Membuang kode warna → teks polos (untuk membandingkan jawaban). */
function polos(teks) {
  return String(teks == null ? "" : teks)
    .replace(/<[^>]*>/g, "")
    .replace(/\*\*|!!|~~|[*[\]{}]/g, "")
    .replace(/->/g, "→")
    .replace(/\s+/g, " ")
    .trim();
}

function acak(daftar) {
  const hasil = daftar.slice();
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

function tundaan(fungsi, ms) {
  let pengatur = null;
  return (...arg) => {
    clearTimeout(pengatur);
    pengatur = setTimeout(() => fungsi(...arg), ms);
  };
}

function daftarTopik() {
  return URUTAN_TOPIK.filter((id) => TOPIK[id]);
}

/* ---------------------------------------------------------------
   3. BLOK MATERI
   Satu "bagian" materi = satu kartu di Mode Belajar = satu slide di
   Mode Presentasi. Isi bagian adalah daftar blok (lihat README.md).
   mode: "belajar" atau "presentasi"
   --------------------------------------------------------------- */
function renderIsi(isi, mode) {
  return (isi || []).map((blok) => renderBlok(blok, mode)).join("");
}

function renderBlok(blok, mode) {
  if (blok == null) return "";
  if (typeof blok === "string") return `<p class="b-teks">${fmt(blok)}</p>`;
  if (blok.hanya && blok.hanya !== mode) return "";

  const html = renderIsiBlok(blok, mode);

  // lipat: "Judul" → di Mode Belajar isinya tersembunyi sampai judulnya diklik
  if (blok.lipat && mode === "belajar") {
    return `<details class="b-lipat"><summary>${fmt(blok.lipat)}</summary>${html}</details>`;
  }
  return html;
}

function renderIsiBlok(blok, mode) {
  const langkah = mode === "presentasi" && blok.bertahap === true;

  if (blok.teks != null) return `<p class="b-teks"${langkah ? " data-langkah" : ""}>${fmt(blok.teks)}</p>`;
  if (blok.aturan) return renderAturan(blok, langkah);
  if (blok.rumus) return renderRumus(blok, langkah);
  if (blok.catatan) return renderCatatan(blok, langkah);
  if (blok.tabel) return renderTabel(blok, mode);
  if (blok.contoh) return renderContoh(blok, mode, langkah);
  if (blok.ubah) return renderUbah(blok, mode);
  if (blok.pisah) return renderPisah(blok, mode);
  if (blok.salahBenar) return renderSalahBenar(blok, mode);
  if (blok.kata) return renderKata(blok, langkah);
  if (blok.html) return `<div${langkah ? " data-langkah" : ""}>${blok.html}</div>`;

  console.warn("Blok materi tidak dikenal:", blok);
  return "";
}

/* Rumus: { rumus: ["am", "zwölf**ten**", "Mai"], label: ["am", "bilangan tingkat", "bulan"] }
   Kotak-kotak dihubungkan dengan tanda + (atau pemisah lain: pemisah: "…").
   klammer: true → garis lengkung dari kata kerja ke awalan/infinitiv di kotak terakhir. */
function renderRumus(blok, langkah) {
  const label = blok.label || [];
  const pemisah = blok.pemisah != null ? blok.pemisah : "+";
  const isi = blok.rumus.map((r, i) => `
    ${i && pemisah ? `<span class="rumus-pemisah" aria-hidden="true">${fmt(pemisah)}</span>` : ""}
    <span class="rumus-kotak">
      <span class="rumus-isi" lang="de">${fmt(r)}</span>
      ${label[i] ? `<span class="rumus-label">${fmt(label[i])}</span>` : ""}
    </span>`).join("");
  const klammer = blok.klammer ? ' data-klammer="ya"' : "";
  return `<div class="b-rumus"${klammer}${langkah ? " data-langkah" : ""}>${isi}</div>`;
}

function renderAturan(blok, langkah) {
  const butir = blok.aturan
    .map((a) => `<li${langkah ? " data-langkah" : ""}>${fmt(a)}</li>`)
    .join("");
  return `<ul class="b-aturan">${butir}</ul>`;
}

const IKON_CATATAN = { info: "ℹ️", penting: "⭐", peringatan: "⚠️", tips: "💡", hubung: "🔗" };

function renderCatatan(blok, langkah) {
  const jenis = IKON_CATATAN[blok.jenis] ? blok.jenis : "info";
  const ikon = blok.ikon || IKON_CATATAN[jenis];
  return `
    <div class="b-catatan ${jenis}"${langkah ? " data-langkah" : ""}>
      <span class="ikon" aria-hidden="true">${ikon}</span>
      <div>${fmt(blok.catatan)}</div>
    </div>`;
}

/* Tabel: baris bisa berupa array ["sel 1", "sel 2"] atau objek
   { isi: ["sel 1", "sel 2"], tanda: "merah" | "sama" | "biru" | "abu" }.
   Di Mode Presentasi baris muncul satu per satu (kecuali bertahap: false). */
function renderTabel(blok, mode) {
  const bertahap = mode === "presentasi" && blok.bertahap !== false;
  const kolom = blok.kolom || [];

  const baris = blok.tabel.map((b) => {
    const sel = Array.isArray(b) ? b : (b.isi || []);
    const tanda = !Array.isArray(b) && b.tanda ? ` class="tanda-${esc(b.tanda)}"` : "";
    return `<tr${tanda}${bertahap ? " data-langkah" : ""}>${sel.map((s) => `<td>${fmt(s)}</td>`).join("")}</tr>`;
  }).join("");

  const kepala = kolom.length
    ? `<thead><tr>${kolom.map((k) => `<th>${fmt(k)}</th>`).join("")}</tr></thead>`
    : "";

  return `
    <div class="b-tabel-wrap${bertahap ? " ada-langkah" : ""}">
      <table class="b-tabel">${kepala}<tbody>${baris}</tbody></table>
      ${blok.keterangan ? `<p class="b-tabel-ket">${fmt(blok.keterangan)}</p>` : ""}
    </div>`;
}

/* Contoh kalimat: { contoh: [ { de: "Am *ersten* Mai.", id: "Pada tanggal 1 Mei." } ] }
   Mode Belajar: terjemahan langsung terlihat.
   Mode Presentasi: terjemahan muncul setelah kalimat diklik.
   Garis lengkung Satzklammer muncul otomatis untuk kalimat trennbar ([ab] di akhir).
   klammer: true → paksa garis (mis. Modalverb … Infinitiv)
   klammer: ["Modalverb", "Infinitiv"] → garis + label di bawah kedua ujungnya
   klammer: false → tanpa garis */
function renderContoh(blok, mode, langkah) {
  const pres = mode === "presentasi";
  // Presentasi: kalimat-kalimat pendek ditaruh dua kolom supaya huruf tetap besar
  const pendek = blok.contoh.length >= 3 && blok.contoh.every((c) => polos(c.de).length <= 24);
  const duaKolom = pres && blok.duaKolom !== false && (blok.duaKolom || pendek);
  const isi = blok.contoh.map((c) => `
    <div class="contoh"${pres ? ' data-contoh tabindex="0" role="button" aria-expanded="false"' : ""}${langkah ? " data-langkah" : ""}>
      <p class="de" lang="de">${htmlKlammer(c.de, c.klammer)}</p>
      ${c.id ? `<div class="arti"><p class="id">${fmt(c.id)}</p><span class="klik-arti" aria-hidden="true">👆 klik untuk arti</span></div>` : ""}
    </div>`).join("");
  return `<div class="b-contoh${duaKolom ? " dua" : ""}">${isi}</div>`;
}

/* Kalimat Jerman yang (mungkin) diberi garis lengkung Satzklammer. */
function htmlKlammer(teks, klammer) {
  if (klammer === false) return fmt(teks);
  const label = Array.isArray(klammer) ? ` data-label="${esc(klammer.join("|"))}"` : "";
  const jenis = klammer ? "ya" : "auto";
  return `<span class="klammer" data-klammer="${jenis}"${label}>${fmt(teks)}</span>`;
}

/* Awalan lepas: { pisah: "*[ab]holen*", kalimat: "Ich *hole* {dich} [ab].", id: "Aku menjemputmu." }
   Menampilkan infinitiv, lalu kalimat — awalannya "terbang" ke akhir kalimat. */
function renderPisah(blok, mode) {
  const bertahap = mode === "presentasi" && blok.bertahap !== false;
  return `
    <div class="b-pisah${bertahap ? " ada-langkah" : ""}" data-pisah>
      <div class="pisah-atas">
        <span class="pisah-verb" lang="de">${fmt(blok.pisah)}</span>
        <span class="pisah-ket">${fmt(blok.keterangan || "infinitiv")}</span>
      </div>
      <div class="pisah-panah" aria-hidden="true">✂️ ↓</div>
      <div class="pisah-bawah"${bertahap ? " data-langkah" : ""}>
        <p class="de" lang="de">${htmlKlammer(blok.kalimat, blok.klammer)}</p>
        ${blok.id ? `<p class="id">${fmt(blok.id)}</p>` : ""}
      </div>
      ${mode === "belajar" ? '<button type="button" class="tombol tipis tombol-kecil" data-putar-pisah>▶ Putar lagi</button>' : ""}
    </div>`;
}

/* Kesalahan umum: { salahBenar: [ { salah: "Ich abhole dich.", benar: "Ich *hole* {dich} [ab].", alasan: "…" } ] }
   Di Mode Presentasi kalimat yang benar muncul setelah diklik. */
function renderSalahBenar(blok, mode) {
  const bertahap = mode === "presentasi" && blok.bertahap !== false;
  const isi = blok.salahBenar.map((x) => `
    <div class="sb-baris">
      <p class="sb-salah" lang="de"><span class="sb-ikon" aria-label="salah">✗</span><span class="sb-teks">${fmt(x.salah)}</span></p>
      <div class="sb-benar"${bertahap ? " data-langkah" : ""}>
        <p lang="de"><span class="sb-ikon" aria-label="benar">✓</span>${htmlKlammer(x.benar, x.klammer)}</p>
        ${x.alasan ? `<p class="sb-alasan">${fmt(x.alasan)}</p>` : ""}
      </div>
    </div>`).join("");
  return `<div class="b-salahbenar${bertahap ? " ada-langkah" : ""}">${isi}</div>`;
}

/* Sekarang → dulu: { ubah: [ { dari: "Ich *habe* …", ke: "Ich *hatte* …", id: "terjemahan" } ],
                     label: ["Sekarang", "Dulu"] }
   Di Mode Presentasi kalimat "ke" muncul setelah diklik (kecuali bertahap: false). */
function renderUbah(blok, mode) {
  const label = blok.label || ["Sekarang", "Dulu"];
  const bertahap = mode === "presentasi" && blok.bertahap !== false;
  const baris = blok.ubah.map((u) => `
    <div class="ubah-baris">
      <p class="ubah-dari de" lang="de">${fmt(u.dari)}</p>
      <span class="ubah-panah" aria-hidden="true">→</span>
      <div class="ubah-ke"${bertahap ? " data-langkah" : ""}>
        <p class="de" lang="de">${htmlKlammer(u.ke, u.klammer)}</p>
        ${u.id ? `<p class="id">${fmt(u.id)}</p>` : ""}
      </div>
    </div>`).join("");
  return `
    <div class="b-ubah${bertahap ? " ada-langkah" : ""}">
      <div class="ubah-kepala" aria-hidden="true">
        <span>${fmt(label[0])}</span><span></span><span>${fmt(label[1])}</span>
      </div>
      ${baris}
    </div>`;
}

/* Daftar kata: { kata: [ ["[ab]holen", "menjemput"], … ] }
   kecil: true → kotak lebih kecil, keterangan ditulis di depan (cocok untuk daftar panjang) */
function renderKata(blok, langkah) {
  const isi = blok.kata.map((k) => {
    const de = Array.isArray(k) ? k[0] : k.de;
    const id = Array.isArray(k) ? k[1] : k.id;
    return `
      <div class="kata"${langkah ? " data-langkah" : ""}>
        <div class="de" lang="de">${fmt(de)}</div>
        ${id ? `<div class="id">${fmt(id)}</div>` : ""}
      </div>`;
  }).join("");
  return `<div class="b-kata${blok.kecil ? " kecil" : ""}">${isi}</div>`;
}

/* ---------------------------------------------------------------
   GARIS LENGKUNG SATZKLAMMER
   Menghubungkan kata kerja (posisi 1/2) dengan bagian akhirnya:
     Ich *hole* {dich} [ab].          hole ⌒ ab       (awalan trennbar)
     Sie *wollen* Sofia *[ab]holen*.  wollen ⌒ abholen (infinitiv utuh)
     Wir *können* ins Kino *gehen*.   können ⌒ gehen  (hanya jika klammer: true)
   Garis digambar dengan SVG setelah kata-katanya terlihat di layar.
   --------------------------------------------------------------- */

/* Mencari dua ujung garis di dalam elemen [data-klammer]. */
function cariUjungKlammer(el) {
  const puncak = $$(".g-verb, .g-pre", el).filter((x) => {
    const induk = x.parentElement && x.parentElement.closest(".g-verb, .g-pre");
    return !induk || !el.contains(induk);
  });
  const paksa = el.dataset.klammer === "ya";

  let akhir = -1;
  for (let i = puncak.length - 1; i > 0; i--) {
    const x = puncak[i];
    const awalanLepas = x.classList.contains("g-pre");
    const infinitivUtuh = x.classList.contains("g-verb") && (x.querySelector(".g-pre") || paksa);
    if (awalanLepas || infinitivUtuh) { akhir = i; break; }
  }
  if (akhir < 1) return null;
  for (let j = akhir - 1; j >= 0; j--) {
    if (puncak[j].classList.contains("g-verb")) return [puncak[j], puncak[akhir]];
  }
  return null;
}

/* Menandai kalimat yang akan diberi garis (memberi ruang di atasnya). */
function tandaiKlammer(akar) {
  $$("[data-klammer]", akar).forEach((el) => {
    el.classList.toggle("ada-garis", Boolean(cariUjungKlammer(el)));
  });
}

function gambarKlammer(el, animasi) {
  const lama = $(":scope > .klammer-svg", el);
  if (lama) lama.remove();
  if (!el.classList.contains("ada-garis") || !el.getClientRects().length) return;

  const ujung = cariUjungKlammer(el);
  if (!ujung) return;
  // Di dalam kotak rumus, garis menempel ke kotaknya
  const [awal, akhir] = ujung.map((x) => {
    const kotak = x.closest(".rumus-isi");
    return kotak && el.contains(kotak) ? kotak : x;
  });

  const r = el.getBoundingClientRect();
  const a = awal.getBoundingClientRect();
  const b = akhir.getBoundingClientRect();
  if (!r.width || Math.abs(a.top - b.top) > a.height * 0.6) return;   // beda baris → tanpa garis

  const fs = parseFloat(getComputedStyle(el).fontSize) || 18;
  const x1 = a.left + a.width / 2 - r.left;
  const x2 = b.left + b.width / 2 - r.left;
  const y = Math.min(a.top, b.top) - r.top - fs * 0.06;
  const tinggi = Math.min(fs * 0.95, Math.max(fs * 0.5, Math.abs(x2 - x1) * 0.14));
  const k = tinggi / 0.75;
  const tebal = Math.max(2.2, fs * 0.09);

  let label = "";
  if (el.dataset.label) {
    const [la, lb] = el.dataset.label.split("|");
    const yl = Math.max(a.bottom, b.bottom) - r.top + fs * 0.72;
    const ukuran = Math.max(11, fs * 0.5);
    const teks = (x, t) => (t ? `<text x="${x}" y="${yl}" font-size="${ukuran}">${esc(t)}</text>` : "");
    label = teks(x1, la) + teks(x2, lb);
  }

  el.insertAdjacentHTML("beforeend", `
    <svg class="klammer-svg" width="${r.width}" height="${r.height}" aria-hidden="true">
      <path d="M ${x1} ${y} C ${x1} ${y - k}, ${x2} ${y - k}, ${x2} ${y}" stroke-width="${tebal}"/>
      <circle cx="${x1}" cy="${y}" r="${tebal * 1.25}"/>
      <circle cx="${x2}" cy="${y}" r="${tebal * 1.25}"/>
      ${label}
    </svg>`);

  if (animasi) {
    const svg = $(":scope > .klammer-svg", el);
    const garis = $("path", svg);
    svg.style.setProperty("--pjg", garis.getTotalLength ? garis.getTotalLength() : 400);
    svg.classList.add("animasi");
  }
  el.dataset.digambar = "1";
}

/* Dipanggil setiap kali materi/soal baru terlihat di layar (kedua mode). */
function setelahRenderMateri(akar) {
  if (!akar) return;
  tandaiKlammer(akar);
  $$("[data-klammer]", akar).forEach((el) => {
    const tersembunyi = el.closest(".langkah-sembunyi");
    gambarKlammer(el, !tersembunyi && !el.dataset.digambar);
  });
  if (app.mode === "belajar") amatiPisah(akar);
}

/* Presentasi: dipanggil saat satu langkah (baris, kalimat) dimunculkan. */
function saatLangkahMuncul(el) {
  const pisah = el.closest("[data-pisah]");
  if (pisah && el.classList.contains("pisah-bawah")) { terbangkanAwalan(pisah); return; }
  $$("[data-klammer]", el).forEach((k) => gambarKlammer(k, true));
}

function gambarUlangSemuaKlammer() {
  const akar = app.mode === "presentasi" ? $("#pres-slide") : $("#isi-belajar");
  $$("[data-klammer].ada-garis", akar).forEach((el) => gambarKlammer(el, false));
}

/* ---------------------------------------------------------------
   ANIMASI AWALAN "TERBANG" (blok pisah)
   Awalan pada infinitiv (ab|holen) terbang ke akhir kalimat.
   --------------------------------------------------------------- */
function terbangkanAwalan(blok) {
  const asal = $(".pisah-verb .g-pre", blok);
  const kalimat = $(".pisah-bawah [data-klammer]", blok);
  const ujung = kalimat && cariUjungKlammer(kalimat);
  const tujuan = ujung && ujung[1].classList.contains("g-pre") ? ujung[1] : null;
  if (!asal || !tujuan) { if (kalimat) gambarKlammer(kalimat, true); return; }
  if (blok.dataset.terbang) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) { gambarKlammer(kalimat, true); return; }

  const ra = asal.getBoundingClientRect();
  const rt = tujuan.getBoundingClientRect();
  if (!ra.width || !rt.width || !asal.animate) { gambarKlammer(kalimat, true); return; }

  blok.dataset.terbang = "1";
  const svg = $(":scope > .klammer-svg", kalimat);
  if (svg) svg.remove();

  const klon = asal.cloneNode(true);
  klon.classList.add("awalan-terbang");
  Object.assign(klon.style, {        // posisi di halaman (ikut bergulir bersama halaman)
    left: `${ra.left + window.scrollX}px`, top: `${ra.top + window.scrollY}px`,
    width: `${ra.width}px`, height: `${ra.height}px`,
    fontSize: getComputedStyle(asal).fontSize
  });
  document.body.appendChild(klon);
  tujuan.style.visibility = "hidden";
  asal.style.opacity = ".3";

  const dx = rt.left - ra.left;
  const dy = rt.top - ra.top;
  const s = rt.width / ra.width;
  const gerak = klon.animate([
    { transform: "translate(0, 0) scale(1)" },
    { transform: `translate(${dx * 0.5}px, ${Math.min(0, dy) - 48}px) scale(${(1 + s) / 2}) rotate(-8deg)`, offset: 0.45 },
    { transform: `translate(${dx}px, ${dy}px) scale(${s})` }
  ], { duration: 1100, easing: "cubic-bezier(.45, 0, .25, 1)" });

  let selesai = false;
  const akhiri = () => {
    if (selesai) return;
    selesai = true;
    klon.remove();
    tujuan.style.visibility = "";
    asal.style.opacity = "";
    delete blok.dataset.terbang;
    gambarKlammer(kalimat, true);
  };
  gerak.onfinish = akhiri;
  gerak.oncancel = akhiri;
  setTimeout(akhiri, 1800);          // jaga-jaga kalau animasi tertahan
}

/* Mode Belajar: animasi diputar sekali saat blok pisah terlihat di layar. */
let pengamatPisah = null;
function amatiPisah(akar) {
  if (!("IntersectionObserver" in window)) return;
  if (!pengamatPisah) {
    pengamatPisah = new IntersectionObserver((entri) => {
      entri.forEach((x) => {
        if (x.isIntersecting && !x.target.dataset.sudahDiputar) {
          x.target.dataset.sudahDiputar = "1";
          setTimeout(() => terbangkanAwalan(x.target), 250);
        }
      });
    }, { threshold: 0.7 });
  }
  $$("[data-pisah]", akar).forEach((b) => pengamatPisah.observe(b));
}

/* ---------------------------------------------------------------
   4. NAVIGASI & TOGGLE MODE
   Alamat halaman:
     #/belajar                      → Beranda
     #/belajar/<topik>              → materi topik
     #/belajar/<topik>/latihan      → latihan topik
     #/presentasi                   → pilih topik
     #/presentasi/<topik>/<slide>   → slide ke-n
   --------------------------------------------------------------- */
function bacaAlamat() {
  const bagian = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);

  if (bagian[0] === "presentasi") {
    const topik = URUTAN_TOPIK.includes(bagian[1]) && TOPIK[bagian[1]] ? bagian[1] : null;
    const slide = Math.max(0, (parseInt(bagian[2], 10) || 1) - 1);
    return { mode: "presentasi", topik, slide };
  }

  const topik = TOPIK[bagian[1]] && (URUTAN_TOPIK.includes(bagian[1]) || bagian[1] === ID_GABUNGAN) ? bagian[1] : null;
  const tab = bagian[2] === "latihan" || topik === ID_GABUNGAN ? "latihan" : "materi";
  return { mode: "belajar", topik, tab };
}

function alamatBelajar(topik, tab) {
  if (!topik) return "#/belajar";
  return `#/belajar/${topik}${tab === "latihan" && topik !== ID_GABUNGAN ? "/latihan" : ""}`;
}

function alamatPresentasi(topik, slide) {
  return topik ? `#/presentasi/${topik}/${(slide || 0) + 1}` : "#/presentasi";
}

/* ganti = true → tidak menambah riwayat (tombol Back browser) */
function pergiKe(alamat, ganti) {
  if (location.hash === alamat) { terapkanAlamat(); return; }
  if (ganti) location.replace(alamat);
  else location.hash = alamat;
}

function terapkanAlamat() {
  const r = bacaAlamat();
  aturMode(r.mode);
  if (r.mode === "presentasi") {
    app.presentasi.topik = r.topik;
    app.presentasi.slide = r.slide;
    tampilkanPresentasi(r.topik, r.slide);
  } else {
    tampilkanBelajar(r.topik, r.tab);
  }
}

function renderToggle() {
  const tombol = (mode, ikon, label) => `
    <button type="button" data-ganti-mode="${mode}" aria-pressed="${app.mode === mode}">
      <span class="ikon" aria-hidden="true">${ikon}</span><span class="lbl">${label}</span>
    </button>`;
  $$(".slot-toggle").forEach((slot) => {
    slot.innerHTML = `
      <div class="toggle-mode" role="group" aria-label="Pilih mode tampilan">
        ${tombol("belajar", "📘", "Belajar")}
        ${tombol("presentasi", "🖥️", "Presentasi")}
      </div>`;
  });
}

function aturMode(mode) {
  if (app.mode === mode) return;
  if (mode === "presentasi") app.scrollBelajar = window.scrollY;

  app.mode = mode;
  document.body.dataset.mode = mode;
  $("#mode-belajar").hidden = mode !== "belajar";
  $("#mode-presentasi").hidden = mode !== "presentasi";
  $$("[data-ganti-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.gantiMode === mode)));

  if (mode === "belajar") {
    requestAnimationFrame(() => {
      window.scrollTo(0, app.scrollBelajar);
      gambarUlangSemuaKlammer();           // ukuran mungkin berubah selama tersembunyi
    });
  }
}

/* Tombol toggle: Belajar ⇄ Presentasi, tetap di topik yang sama */
function klikGantiMode(mode) {
  if (mode === app.mode) return;
  if (mode === "presentasi") {
    const topik = URUTAN_TOPIK.includes(app.belajar.topik) ? app.belajar.topik : null;
    const slide = topik && topik === app.presentasi.topik ? app.presentasi.slide : 0;
    pergiKe(alamatPresentasi(topik, slide));
  } else {
    const topik = app.presentasi.topik || app.belajar.topik;
    const tab = topik === app.belajar.topik ? app.belajar.tab : "materi";
    pergiKe(alamatBelajar(topik, tab));
  }
}

/* ---------------------------------------------------------------
   5. MODE BELAJAR
   Setiap halaman dibuat sekali lalu disimpan (disembunyikan kalau
   tidak dipakai), supaya jawaban latihan tidak hilang saat murid
   bolak-balik melihat materi.
   --------------------------------------------------------------- */
const halamanBelajar = {};

function renderNavTopik() {
  const item = [
    { id: null, no: "⌂", judul: "Beranda" },
    ...daftarTopik().map((id) => ({ id, no: TOPIK[id].nomor, judul: TOPIK[id].judulPendek || TOPIK[id].judul })),
    ...(TOPIK[ID_GABUNGAN] ? [{ id: ID_GABUNGAN, no: "★", judul: TOPIK[ID_GABUNGAN].judulPendek || "Gabungan" }] : [])
  ];
  $("#nav-topik").innerHTML = item.map((i) => `
    <a class="nav-link" href="${alamatBelajar(i.id)}" data-nav="${i.id || "beranda"}">
      <span class="no" aria-hidden="true">${esc(i.no)}</span>${esc(i.judul)}
    </a>`).join("");
}

function tandaiNavTopik(id) {
  $$("#nav-topik .nav-link").forEach((a) => {
    const aktif = a.dataset.nav === id;
    if (aktif) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
    if (aktif) a.scrollIntoView({ block: "nearest", inline: "nearest" });
  });
}

function tampilkanBelajar(topik, tab) {
  const id = topik || "beranda";
  const gantiHalaman = (app.belajar.topik || "beranda") !== id || !halamanBelajar[id];
  const gantiTab = app.belajar.tab !== tab;
  app.belajar.topik = topik;
  app.belajar.tab = tab;

  let el = halamanBelajar[id];
  if (!el) {
    el = document.createElement("div");
    el.className = "tampilan";
    el.innerHTML = topik ? htmlHalamanTopik(topik) : htmlBeranda();
    $("#isi-belajar").appendChild(el);
    halamanBelajar[id] = el;
  }
  Object.values(halamanBelajar).forEach((h) => { h.hidden = h !== el; });

  if (topik) aturTabTopik(el, topik, tab);
  else setelahRenderMateri(el);
  tandaiNavTopik(id);
  document.title = topik
    ? `${TOPIK[topik].judul} — Deutsch A1 · Teil 2`
    : "Deutsch A1 · Teil 2 — Grammar";

  if (app.mode === "belajar") {
    if (gantiHalaman) window.scrollTo(0, 0);
    else if (gantiTab) {
      const tabEl = $(".sub-tab", el);
      if (tabEl && tabEl.getBoundingClientRect().top < 0) tabEl.scrollIntoView({ block: "start" });
    }
  }
}

function htmlBeranda() {
  const kartu = daftarTopik().map((id) => htmlKartuTopik(id)).join("")
    + (TOPIK[ID_GABUNGAN] ? htmlKartuTopik(ID_GABUNGAN) : "");

  return `
    <section class="beranda-hero">
      <p class="kicker">Bahasa Jerman A1 · Teil 2</p>
      <h1>Grammar yang muncul bersamaan di kalimat nyata</h1>
      <p class="lead">Tanggal, masa lampau, pronomen, dan kata kerja yang bisa terpisah — empat topik yang sering muncul bersamaan, misalnya:</p>
      <div class="kalimat-contoh">
        <p class="de" lang="de">${htmlKlammer("Ich *hole* {dich} am !!ersten!! Mai [ab].")}</p>
        <p class="id">Aku menjemputmu pada tanggal satu Mei.</p>
      </div>
    </section>

    <h2 class="judul-bagian">Pilih topik</h2>
    <div class="grid-topik">${kartu}</div>

    <h2 class="judul-bagian">Kode warna</h2>
    <div class="kartu">
      <div class="legenda">
        ${htmlLegenda("*hole* · *kann*", "Kata kerja · Modalverb", "Oranye: kata kerja (hole, abholen) dan Modalverb (kann).")}
        ${htmlLegenda("[ab]", "Awalan trennbar", "Kotak oranye: awalan ini bisa lepas dan pindah ke akhir kalimat.")}
        ${htmlLegenda("{dich}", "Pronomen Akkusativ", "Biru: kata ganti sebagai objek — mich, dich, ihn, es, sie, uns, euch, Sie.")}
        ${htmlLegenda("!!ersten!!", "Bentuk tak beraturan", "Merah artinya hati-hati: bentuk ini tidak ikut aturan.")}
      </div>
    </div>

    <h2 class="judul-bagian">Cara belajar</h2>
    <div class="kartu">
      <ol class="langkah">
        <li><span class="angka">1</span><div><b>Baca materinya</b><span>Tabel dan contoh kalimat. Perhatikan warnanya — warna menunjukkan fungsi kata.</span></div></li>
        <li><span class="angka">2</span><div><b>Kerjakan latihannya</b><span>Setiap jawaban langsung dicek. Kalau salah, ada penjelasan langkah demi langkah.</span></div></li>
        <li><span class="angka">3</span><div><b>Ulangi yang salah</b><span>Sampai polanya terasa otomatis. Tantangan terakhir: Latihan Gabungan.</span></div></li>
      </ol>
    </div>`;
}

function htmlKartuTopik(id) {
  const t = TOPIK[id];
  const jumlahSoal = (t.latihan || []).length;
  const adaMateri = (t.materi || []).length > 0 || id === ID_GABUNGAN;
  const label = jumlahSoal
    ? `<span class="label">✏️ ${jumlahSoal} soal</span>`
    : `<span class="label segera">🚧 Segera</span>`;
  return `
    <a class="kartu-topik${id === ID_GABUNGAN ? " gabungan" : ""}" href="${alamatBelajar(id)}">
      <div class="atas">
        <span class="no">${id === ID_GABUNGAN ? "Latihan" : `Topik ${t.nomor}`}</span>
        <span class="ikon" aria-hidden="true">${t.ikon || ""}</span>
      </div>
      <h3>${esc(t.judul)}</h3>
      <p class="sub">${fmt(t.subjudul)}</p>
      <p class="ringkas">${fmt(t.ringkas)}</p>
      <div class="meta">${adaMateri && id !== ID_GABUNGAN ? `<span class="label">📖 ${t.materi.length} bagian</span>` : ""}${label}</div>
    </a>`;
}

function htmlLegenda(kode, judul, arti) {
  return `
    <div class="legenda-item">
      <span class="contoh-kata" lang="de">${fmt(kode)}</span>
      <b>${judul}</b>
      <span class="arti">${arti}</span>
    </div>`;
}

function htmlHalamanTopik(id) {
  const t = TOPIK[id];
  const gabungan = id === ID_GABUNGAN;
  const jumlahSoal = (t.latihan || []).length;

  const kepala = `
    <header class="topik-hero">
      <p class="kicker"><span aria-hidden="true">${t.ikon || ""}</span>${gabungan ? "Latihan gabungan" : `Topik ${t.nomor}`}</p>
      <h1>${esc(t.judul)}</h1>
      <p class="sub">${fmt(t.subjudul)}</p>
      ${t.ringkas ? `<p class="ringkas">${fmt(t.ringkas)}</p>` : ""}
    </header>`;

  if (gabungan) {
    return `${kepala}<div class="panel" data-panel="latihan"></div>`;
  }

  return `
    ${kepala}
    <nav class="sub-tab" aria-label="Materi atau latihan">
      <a href="${alamatBelajar(id, "materi")}" data-tab="materi">📖 Materi</a>
      <a href="${alamatBelajar(id, "latihan")}" data-tab="latihan">✏️ Latihan ${jumlahSoal ? `<span class="jumlah">${jumlahSoal}</span>` : ""}</a>
    </nav>
    <div class="panel" data-panel="materi">${htmlMateri(id)}</div>
    <div class="panel" data-panel="latihan" hidden></div>`;
}

function htmlMateri(id) {
  const t = TOPIK[id];
  const bagian = (t.materi || []).filter((b) => b.hanya !== "presentasi");

  if (!bagian.length) {
    return `
      <div class="kartu kosong">
        <span class="ikon" aria-hidden="true">🚧</span>
        <b>Materi belum diisi</b>
        Materi topik ini sedang disiapkan.
      </div>`;
  }

  const isi = bagian.map((b, i) => `
    <section class="bagian">
      <h2 class="bagian-judul"><span class="no">${i + 1}</span><span>${fmt(b.judul)}</span></h2>
      ${renderIsi(b.isi, "belajar")}
    </section>`).join("");

  const jumlahSoal = (t.latihan || []).length;
  const ajakan = jumlahSoal ? `
    <div class="kartu ajakan-latihan">
      <b>Sudah paham?</b> Coba ${jumlahSoal} soal latihan — setiap jawaban langsung dicek.
      <div class="nav-bawah"><a class="tombol" href="${alamatBelajar(id, "latihan")}">✏️ Mulai latihan</a></div>
    </div>` : "";

  return isi + ajakan;
}

function aturTabTopik(el, id, tab) {
  $$(".sub-tab [data-tab]", el).forEach((a) => {
    if (a.dataset.tab === tab) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  $$(".panel", el).forEach((p) => { p.hidden = p.dataset.panel !== tab; });

  const panel = $(`.panel[data-panel="${tab}"]`, el);
  if (!panel.dataset.siap) {
    panel.dataset.siap = "1";
    if (tab === "latihan") renderLatihan(panel, id);
  }
  setelahRenderMateri(panel);              // gambar (ulang) garis lengkung yang sekarang terlihat
}

/* ---------------------------------------------------------------
   CEK FILE DATA
   Kalau Anda salah ketik di js/data/*.js (misalnya lupa koma), file
   itu tidak terbaca. Kotak kuning di atas halaman memberi tahu file
   mana yang bermasalah.
   --------------------------------------------------------------- */
function cekFileData() {
  const galat = (window.GALAT_DATA || []).map((g) => {
    const file = (g.file || "").split("/").slice(-3).join("/");
    return `<li><b>${esc(file || "file data")}</b>${g.baris ? ` baris ${g.baris}` : ""}: ${esc(g.pesan)}</li>`;
  });
  const hilang = Object.keys(FILE_DATA)
    .filter((id) => !TOPIK[id])
    .map((id) => `<li><b>${FILE_DATA[id]}</b> tidak terbaca.</li>`);

  const daftar = galat.concat(hilang);
  if (!daftar.length) return;

  const kotak = $("#peringatan-data");
  kotak.innerHTML = `
    <b>⚠️ Ada file data yang tidak bisa dibaca.</b>
    Biasanya karena salah ketik: koma yang hilang, tanda kutip yang tidak ditutup, atau kurung yang kurang.
    <ul>${daftar.join("")}</ul>`;
  kotak.hidden = false;
}

/* ---------------------------------------------------------------
   MULAI
   --------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  cekFileData();
  renderToggle();
  renderNavTopik();
  initPresentasi();

  document.addEventListener("click", (e) => {
    const tombol = e.target.closest("[data-ganti-mode]");
    if (tombol) klikGantiMode(tombol.dataset.gantiMode);
    const putar = e.target.closest("[data-putar-pisah]");
    if (putar) terbangkanAwalan(putar.closest("[data-pisah]"));
  });

  window.addEventListener("hashchange", terapkanAlamat);
  window.addEventListener("resize", tundaan(() => { if (app.mode === "belajar") gambarUlangSemuaKlammer(); }, 150));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(gambarUlangSemuaKlammer);
  terapkanAlamat();
});
