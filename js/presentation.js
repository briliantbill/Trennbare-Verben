/* ================================================================
   PRESENTATION.JS — Mode Presentasi (untuk guru, lewat share screen)

   Slide dibuat otomatis dari materi di js/data/*.js:
     slide pertama = sampul topik (judul + daftar isi)
     slide 2, 3…   = satu slide per bagian materi
     slide terakhir = penutup (ringkasan + tugas latihan di rumah)
   Bagian materi dengan  hanya: "belajar"  tidak ikut jadi slide.

   Tombol keyboard (juga tercantum di layar bantuan, tombol ?):
     → / Spasi / PageDown   maju: munculkan langkah berikutnya, atau slide berikutnya
     ← / PageUp             slide sebelumnya
     Home / End             slide pertama / terakhir
     1 2 3 4                pindah topik
     A                      tampilkan semua langkah di slide ini
     T                      buka/tutup semua terjemahan di slide ini
     O                      daftar semua slide (lompat ke slide mana saja)
     B  atau  .             tutup layar sementara (murid fokus ke guru)
     + / − / 0              perbesar / perkecil / kembalikan ukuran huruf
     F                      layar penuh
     ?                      bantuan tombol
     Esc                    tutup daftar slide / bantuan
   Mouse & layar sentuh:
     klik tabel             munculkan baris berikutnya
     klik contoh kalimat    tampilkan/sembunyikan terjemahan
     geser kiri/kanan       pindah slide (tablet)

   Biasanya Anda TIDAK perlu mengubah file ini.
   ================================================================ */
"use strict";

const pres = {
  topik: null,
  slide: 0,
  daftarSlide: [],
  tampilSemua: false,   // true → slide berikutnya langsung tampil lengkap (dipakai saat mundur)
  sudahTampil: false,
  zoom: 1,              // ukuran huruf tambahan (tombol + / −), hanya selama halaman terbuka
  lapisan: null         // "ikhtisar" | "bantuan" | null
};

function initPresentasi() {
  $("#pres-topik").innerHTML = daftarTopik().map((id) => {
    const t = TOPIK[id];
    return `
      <button type="button" class="pres-topik-btn" data-pres-topik="${id}" aria-pressed="false" title="${esc(t.judul)} (tombol ${t.nomor})">
        <span class="no">${t.nomor}</span><span class="judul">${esc(t.judulPendek || t.judul)}</span>
      </button>`;
  }).join("");

  const wadah = $("#mode-presentasi");
  wadah.addEventListener("click", (e) => {
    const keSlideIni = e.target.closest("[data-ke-slide]");
    if (keSlideIni) { tutupLapisan(); keSlide(Number(keSlideIni.dataset.keSlide)); fokusSlide(); return; }
    if (e.target.closest("[data-tutup-lapisan]") || e.target === $("#pres-lapisan")) { tutupLapisan(); return; }
    if (e.target.closest("#pres-tirai")) { tutupTirai(); return; }

    const tombolTopik = e.target.closest("[data-pres-topik]");
    if (tombolTopik) {
      pergiKe(alamatPresentasi(tombolTopik.dataset.presTopik, 0));
      fokusSlide();
      return;
    }
    const contoh = e.target.closest("[data-contoh]");
    if (contoh) { bukaTutupArti(contoh); return; }

    const blokBertahap = e.target.closest(".ada-langkah");
    if (blokBertahap) {
      const berikut = $(".langkah-sembunyi", blokBertahap);
      if (berikut) { munculkan(berikut); perbaruiKontrol(); }
    }
  });

  $("#pres-maju").addEventListener("click", () => { presMaju(); fokusSlide(); });
  $("#pres-mundur").addEventListener("click", () => { presMundur(); fokusSlide(); });
  $("#pres-layar-penuh").addEventListener("click", () => { gantiLayarPenuh(); fokusSlide(); });
  $("#pres-hitung").addEventListener("click", () => bukaLapisan("ikhtisar"));
  $("#pres-bantuan-btn").addEventListener("click", () => bukaLapisan("bantuan"));

  document.addEventListener("keydown", tombolKeyboard);
  const saatLayarPenuh = () => {
    wadah.classList.toggle("layar-penuh", Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    setTimeout(pasSkala, 60);
  };
  document.addEventListener("fullscreenchange", saatLayarPenuh);
  document.addEventListener("webkitfullscreenchange", saatLayarPenuh);
  window.addEventListener("resize", tundaan(pasSkala, 120));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => pasSkala());

  pasangKursorOtomatis(wadah);
  pasangGeser($("#pres-panggung"));
  $("#pres-slide").tabIndex = -1;
}

/* Dipanggil main.js setiap alamat #/presentasi/… berubah */
function tampilkanPresentasi(topik, slide) {
  const gantiTopik = topik !== pres.topik || !pres.sudahTampil;
  if (gantiTopik) {
    pres.topik = topik;
    pres.daftarSlide = topik ? susunSlide(topik) : [];
  }

  const terakhir = Math.max(0, pres.daftarSlide.length - 1);
  const idx = Math.min(slide, terakhir);
  if (idx !== slide) {                           // nomor slide di alamat terlalu besar
    pergiKe(alamatPresentasi(topik, idx), true);
    return;
  }
  if (!gantiTopik && idx === pres.slide) { pasSkala(); fokusSlide(); return; }

  const arah = gantiTopik || idx >= pres.slide ? "maju" : "mundur";
  pres.slide = idx;
  pres.sudahTampil = true;
  tutupLapisan();
  renderSlide(arah);

  $$("#pres-topik [data-pres-topik]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.presTopik === topik));
  });
  document.title = topik
    ? `Presentasi: ${TOPIK[topik].judul} — Deutsch A1 · Teil 2`
    : "Presentasi — Deutsch A1 · Teil 2";
  fokusSlide();
}

function susunSlide(idTopik) {
  const t = TOPIK[idTopik];
  const materi = (t.materi || []).filter((b) => b.hanya !== "belajar");
  const slide = [{ jenis: "sampul", judul: "Sampul", daftarIsi: materi.map((b) => b.judul) }];
  if (!materi.length) slide.push({ jenis: "kosong", judul: "Belum diisi" });
  materi.forEach((bagian) => slide.push({ jenis: "materi", judul: bagian.judul, bagian }));
  if (materi.length) slide.push({ jenis: "penutup", judul: "Selesai · latihan di rumah", daftarIsi: materi.map((b) => b.judul) });
  return slide;
}

/* ---------------------------------------------------------------
   MENGGAMBAR SLIDE
   --------------------------------------------------------------- */
function renderSlide(arah) {
  const el = $("#pres-slide");
  const t = TOPIK[pres.topik];
  const s = pres.daftarSlide[pres.slide];

  if (!pres.topik) el.innerHTML = htmlPilihTopik();
  else if (s.jenis === "sampul") el.innerHTML = htmlSampul(t, s);
  else if (s.jenis === "kosong") el.innerHTML = htmlSlideKosong();
  else if (s.jenis === "penutup") el.innerHTML = htmlPenutup(t, s);
  else {
    el.innerHTML = `
      <p class="slide-kicker">Topik ${t.nomor} · ${esc(t.judul)}</p>
      <h2 class="slide-judul">${fmt(s.bagian.judul)}</h2>
      ${htmlIsiSlide(s.bagian)}`;
  }

  // Semua langkah (baris tabel, dll.) disembunyikan dulu, kecuali saat mundur
  if (!pres.tampilSemua) $$("[data-langkah]", el).forEach((x) => x.classList.add("langkah-sembunyi"));
  pres.tampilSemua = false;

  el.classList.remove("masuk-maju", "masuk-mundur");
  void el.offsetWidth;                                  // mulai ulang animasi
  el.classList.add(arah === "mundur" ? "masuk-mundur" : "masuk-maju");

  pasSkala();          // sekaligus memanggil setelahRenderMateri()
  perbaruiKontrol();
}

/* Layar presentasi lebar tapi pendek. Tabel yang panjang (5 baris atau lebih)
   ditaruh di kolom kanan, penjelasan lainnya di kolom kiri, supaya huruf
   tidak perlu dikecilkan. Tabel ditulis lebih dulu di HTML, jadi barisnya
   muncul sebelum catatan "bertahap" di kolom kiri.
   Tidak mau dua kolom? Tambahkan  tataLetak: "satu"  pada bagian materi. */
function htmlIsiSlide(bagian) {
  const isi = (bagian.isi || []).filter((b) => typeof b === "string" || !b.hanya || b.hanya === "presentasi");
  const tabel = isi.filter((b) => b && b.tabel);
  const lain = isi.filter((b) => !(b && b.tabel));
  const duaKolom = bagian.tataLetak !== "satu" && tabel.length === 1 && lain.length > 0 && tabel[0].tabel.length >= 5;

  if (!duaKolom) return `<div class="slide-isi">${renderIsi(isi, "presentasi")}</div>`;
  return `
    <div class="slide-isi dua-kolom">
      <div class="kolom-kanan">${renderIsi(tabel, "presentasi")}</div>
      <div class="kolom-kiri">${renderIsi(lain, "presentasi")}</div>
    </div>`;
}

function htmlPilihTopik() {
  const tombol = daftarTopik().map((id) => {
    const t = TOPIK[id];
    return `
      <button type="button" class="pilih-topik-btn" data-pres-topik="${id}">
        <span class="ikon" aria-hidden="true">${t.ikon || ""}</span>
        <span><small>Topik ${t.nomor}</small><b>${esc(t.judul)}</b><small>${fmt(t.subjudul)}</small></span>
      </button>`;
  }).join("");
  const legenda = [
    ["*hole* · *kann*", "kata kerja · Modalverb"],
    ["[ab]", "awalan trennbar"],
    ["{dich}", "pronomen Akkusativ"],
    ["!!ersten!!", "tak beraturan"]
  ].map(([kode, arti]) => `<span class="legenda-pres"><span lang="de">${fmt(kode)}</span> ${arti}</span>`).join("");
  return `
    <div class="pilih-topik">
      <h1>Mode Presentasi</h1>
      <p class="sub">Pilih topik yang ingin dijelaskan. Tekan <b>F</b> untuk layar penuh, <b>?</b> untuk semua tombol.</p>
      <div class="pilih-topik-grid">${tombol}</div>
      <div class="legenda-baris"><span class="legenda-judul">Kode warna:</span>${legenda}</div>
    </div>`;
}

function htmlSampul(t, s) {
  const daftarIsi = s.daftarIsi.length
    ? `<ol class="daftar-isi">${s.daftarIsi.map((j) => `<li>${fmt(j)}</li>`).join("")}</ol>`
    : "";
  return `
    <div class="slide-sampul">
      <p class="slide-kicker">Topik ${t.nomor}</p>
      <div class="ikon-besar" aria-hidden="true">${t.ikon || ""}</div>
      <h1>${esc(t.judul)}</h1>
      <p class="sub">${fmt(t.subjudul)}</p>
      ${daftarIsi}
    </div>`;
}

/* Slide terakhir: ringkasan + tugas latihan di Mode Belajar */
function htmlPenutup(t, s) {
  const jumlahSoal = (t.latihan || []).length;
  const idBaru = topikSesudah(1);
  const berikut = idBaru ? TOPIK[idBaru] : null;
  return `
    <div class="slide-sampul slide-penutup">
      <p class="slide-kicker">Topik ${t.nomor} · ${esc(t.judul)}</p>
      <h1>Selesai! 🎉</h1>
      <p class="sub">Yang sudah kita pelajari:</p>
      <ol class="daftar-isi">${s.daftarIsi.map((j) => `<li>${fmt(j)}</li>`).join("")}</ol>
      ${jumlahSoal ? `
        <div class="penutup-tugas">
          <span class="ikon" aria-hidden="true">✏️</span>
          <div><b>Latihan di rumah</b>
            Buka website ini → <b>📘 Belajar</b> → <b>Topik ${t.nomor}</b> → <b>Latihan</b> (${jumlahSoal} soal).
            Screenshot hasilnya dan kirim ke guru.</div>
        </div>` : ""}
      ${berikut ? `<p class="penutup-lanjut">Berikutnya: Topik ${berikut.nomor} · ${esc(berikut.judul)} →</p>` : ""}
    </div>`;
}

function htmlSlideKosong() {
  return `
    <div class="slide-kosong">
      <span class="ikon" aria-hidden="true">🚧</span>
      <b>Slide materi belum diisi</b>
      <span>Slide akan muncul otomatis setelah materi topik ini ditulis di file data.</span>
    </div>`;
}

/* Kecilkan huruf slide sedikit demi sedikit kalau isinya tidak muat layar */
function pasSkala() {
  if (app.mode !== "presentasi") return;
  const panggung = $("#pres-panggung");
  const el = $("#pres-slide");
  const gaya = getComputedStyle(panggung);
  const tinggi = panggung.clientHeight - parseFloat(gaya.paddingTop) - parseFloat(gaya.paddingBottom);

  let fit = 1;
  el.style.setProperty("--fit", "1");
  tandaiKlammer(el);             // ruang untuk garis lengkung ikut dihitung
  for (let i = 0; i < 25; i++) {
    const terlaluTinggi = el.scrollHeight > tinggi + 1;
    const terlaluLebar = el.scrollWidth > el.clientWidth + 1;
    if (!terlaluTinggi && !terlaluLebar) break;
    fit *= 0.94;
    if (fit < 0.4) break;
    el.style.setProperty("--fit", fit.toFixed(3));
  }
  setelahRenderMateri(el);
}

/* ---------------------------------------------------------------
   NAVIGASI
   --------------------------------------------------------------- */
function langkahBerikut() {
  return $("#pres-slide .langkah-sembunyi");
}

function munculkan(el) {
  el.classList.remove("langkah-sembunyi");
  el.classList.add("langkah-muncul");
  saatLangkahMuncul(el);          // garis lengkung / awalan terbang (main.js)
}

function munculkanSemua() {
  $$("#pres-slide .langkah-sembunyi").forEach(munculkan);
  perbaruiKontrol();
}

function topikSesudah(arah) {
  const daftar = daftarTopik();
  const i = daftar.indexOf(pres.topik);
  return daftar[i + arah] || null;
}

function presMaju() {
  if (!pres.topik) {
    const pertama = daftarTopik()[0];
    if (pertama) pergiKe(alamatPresentasi(pertama, 0));
    return;
  }
  const berikut = langkahBerikut();
  if (berikut) { munculkan(berikut); perbaruiKontrol(); return; }

  if (pres.slide < pres.daftarSlide.length - 1) {
    pergiKe(alamatPresentasi(pres.topik, pres.slide + 1), true);
  } else {
    const topikBaru = topikSesudah(1);
    if (topikBaru) pergiKe(alamatPresentasi(topikBaru, 0));
  }
}

function presMundur() {
  if (!pres.topik || pres.slide === 0) return;
  pres.tampilSemua = true;
  pergiKe(alamatPresentasi(pres.topik, pres.slide - 1), true);
}

function keSlide(nomor) {
  if (!pres.topik) return;
  const idx = Math.max(0, Math.min(nomor, pres.daftarSlide.length - 1));
  if (idx < pres.slide) pres.tampilSemua = true;
  pergiKe(alamatPresentasi(pres.topik, idx), true);
}

function perbaruiKontrol() {
  const total = pres.daftarSlide.length;
  const adaTopik = Boolean(pres.topik);
  const berikut = adaTopik ? langkahBerikut() : null;
  const diAkhir = adaTopik && pres.slide >= total - 1;
  const topikBaru = diAkhir ? topikSesudah(1) : null;

  const hitung = $("#pres-hitung");
  hitung.textContent = adaTopik ? `Slide ${pres.slide + 1} / ${total}` : "";
  hitung.hidden = !adaTopik;
  $("#pres-progres-isi").style.width = adaTopik ? `${((pres.slide + 1) / total) * 100}%` : "0";
  $("#pres-mundur").disabled = !adaTopik || pres.slide === 0;

  let label = "Berikutnya";
  if (!adaTopik) label = "Mulai";
  else if (berikut) {
    const sisa = $$("#pres-slide .langkah-sembunyi").length;
    label = `${berikut.tagName === "TR" ? "Baris berikutnya" : "Tampilkan"} (${sisa})`;
  } else if (diAkhir) label = topikBaru ? `Topik ${TOPIK[topikBaru].nomor}` : "Selesai";

  $("#pres-maju-lbl").textContent = label;
  $("#pres-maju").disabled = adaTopik && !berikut && diAkhir && !topikBaru;
}

function bukaTutupArti(contoh, paksa) {
  const buka = paksa != null ? paksa : !contoh.classList.contains("buka");
  contoh.classList.toggle("buka", buka);
  contoh.setAttribute("aria-expanded", String(buka));
}

/* T: kalau ada yang masih tertutup → buka semua; kalau semua terbuka → tutup semua */
function bukaTutupSemuaArti() {
  const semua = $$("#pres-slide [data-contoh]");
  if (!semua.length) return;
  const adaTertutup = semua.some((c) => !c.classList.contains("buka"));
  semua.forEach((c) => bukaTutupArti(c, adaTertutup));
  tampilkanToast(adaTertutup ? "Semua terjemahan dibuka" : "Semua terjemahan ditutup");
}

/* ---------------------------------------------------------------
   LAPISAN: DAFTAR SLIDE & BANTUAN TOMBOL
   --------------------------------------------------------------- */
function bukaLapisan(jenis) {
  const lapisan = $("#pres-lapisan");
  if (pres.lapisan === jenis) { tutupLapisan(); return; }
  if (jenis === "ikhtisar" && !pres.topik) return;
  pres.lapisan = jenis;
  lapisan.innerHTML = jenis === "ikhtisar" ? htmlIkhtisar() : htmlBantuan();
  lapisan.hidden = false;
  const aktif = $(".ikhtisar-kartu.aktif", lapisan) || $("button", lapisan);
  if (aktif) aktif.focus({ preventScroll: true });
}

function tutupLapisan() {
  if (!pres.lapisan) return;
  pres.lapisan = null;
  $("#pres-lapisan").hidden = true;
  fokusSlide();
}

function htmlIkhtisar() {
  const t = TOPIK[pres.topik];
  const kartu = pres.daftarSlide.map((s, i) => `
    <button type="button" class="ikhtisar-kartu${i === pres.slide ? " aktif" : ""}" data-ke-slide="${i}">
      <span class="no">${i + 1}</span>
      <span class="judul">${fmt(s.jenis === "sampul" ? `${t.ikon || ""} ${t.judul}` : s.judul)}</span>
    </button>`).join("");
  return `
    <div class="lapisan-kotak" role="dialog" aria-label="Daftar slide">
      <div class="lapisan-kepala">
        <b>Topik ${t.nomor} · ${esc(t.judul)} — pilih slide</b>
        <button type="button" class="pres-ikon-btn" data-tutup-lapisan title="Tutup (Esc)">✕</button>
      </div>
      <div class="ikhtisar-grid">${kartu}</div>
    </div>`;
}

function htmlBantuan() {
  const baris = [
    ["→  Spasi  PageDown", "maju: langkah berikutnya / slide berikutnya"],
    ["←  PageUp", "slide sebelumnya"],
    ["Home  End", "slide pertama / terakhir"],
    ["1  2  3  4", "pindah topik"],
    ["A", "tampilkan semua langkah di slide ini"],
    ["T", "buka / tutup semua terjemahan"],
    ["O", "daftar slide (klik juga \"Slide x / y\")"],
    ["B  atau  .", "tutup layar sementara"],
    ["+  −  0", "perbesar / perkecil / normalkan huruf"],
    ["F", "layar penuh"],
    ["Esc", "tutup jendela ini"]
  ].map(([tombol, arti]) => `
    <tr><td>${tombol.split("  ").map((k) => (k === "atau" ? "atau" : `<kbd>${esc(k)}</kbd>`)).join(" ")}</td><td>${esc(arti)}</td></tr>`).join("");
  return `
    <div class="lapisan-kotak" role="dialog" aria-label="Bantuan tombol keyboard">
      <div class="lapisan-kepala">
        <b>Tombol keyboard</b>
        <button type="button" class="pres-ikon-btn" data-tutup-lapisan title="Tutup (Esc)">✕</button>
      </div>
      <table class="bantuan-tabel">${baris}</table>
      <p class="bantuan-catatan">Mouse: klik tabel → baris berikutnya · klik contoh kalimat → terjemahan.
        Remote presentasi (clicker) juga bisa dipakai.</p>
    </div>`;
}

/* ---------------------------------------------------------------
   TUTUP LAYAR, UKURAN HURUF, PESAN SINGKAT
   --------------------------------------------------------------- */
function gantiTirai() {
  const tirai = $("#pres-tirai");
  tirai.hidden = !tirai.hidden;
}
function tutupTirai() { $("#pres-tirai").hidden = true; }

function aturZoom(faktor) {
  const el = $("#pres-slide");
  const sebelum = parseFloat(getComputedStyle(el).fontSize);
  pres.zoom = faktor === 1 ? 1 : Math.min(1.6, Math.max(0.7, pres.zoom * faktor));
  $("#mode-presentasi").style.setProperty("--zoom", pres.zoom.toFixed(3));
  pasSkala();
  const sesudah = parseFloat(getComputedStyle(el).fontSize);
  const mentok = faktor > 1 && sesudah <= sebelum + 0.5;
  tampilkanToast(`Ukuran huruf ${Math.round(pres.zoom * 100)}%${mentok ? " — slide ini sudah memenuhi layar" : ""}`);
}

let pengaturToast = null;
function tampilkanToast(teks) {
  const el = $("#pres-toast");
  el.textContent = teks;
  el.classList.add("tampil");
  clearTimeout(pengaturToast);
  pengaturToast = setTimeout(() => el.classList.remove("tampil"), 1400);
}

/* ---------------------------------------------------------------
   LAYAR PENUH, KURSOR, GESER (tablet)
   --------------------------------------------------------------- */
function gantiLayarPenuh() {
  const d = document;
  const aktif = d.fullscreenElement || d.webkitFullscreenElement;
  if (aktif) {
    (d.exitFullscreen || d.webkitExitFullscreen).call(d);
  } else {
    const akar = d.documentElement;
    const minta = akar.requestFullscreen || akar.webkitRequestFullscreen;
    if (minta) {
      const hasil = minta.call(akar);
      if (hasil && hasil.catch) hasil.catch(() => {});
    }
  }
}

/* Kursor mouse disembunyikan setelah 2,5 detik diam, supaya tidak menutupi tulisan. */
function pasangKursorOtomatis(wadah) {
  let pengatur = null;
  wadah.addEventListener("mousemove", () => {
    wadah.classList.remove("kursor-diam");
    clearTimeout(pengatur);
    pengatur = setTimeout(() => wadah.classList.add("kursor-diam"), 2500);
  });
}

/* Geser jari ke kiri/kanan di layar sentuh → pindah slide */
function pasangGeser(panggung) {
  let awal = null;
  panggung.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    awal = e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null;
  }, { passive: true });
  panggung.addEventListener("touchend", (e) => {
    if (!awal) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - awal.x;
    const dy = t.clientY - awal.y;
    awal = null;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 50) {
      if (dx < 0) presMaju(); else presMundur();
    }
  }, { passive: true });
}

function fokusSlide() {
  if (app.mode === "presentasi" && !pres.lapisan) $("#pres-slide").focus({ preventScroll: true });
}

/* ---------------------------------------------------------------
   KEYBOARD
   --------------------------------------------------------------- */
function tombolKeyboard(e) {
  if (app.mode !== "presentasi") return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

  // Layar sedang ditutup: tombol apa pun (kecuali Shift dsb.) membukanya lagi
  if (!$("#pres-tirai").hidden) {
    if (e.key.length === 1 || ["Escape", "ArrowRight", "ArrowLeft", "PageDown", "PageUp"].includes(e.key)) {
      e.preventDefault();
      tutupTirai();
    }
    return;
  }

  // Daftar slide / bantuan sedang terbuka
  if (pres.lapisan) {
    if (e.key === "Escape" || (e.key === "o" || e.key === "O") && pres.lapisan === "ikhtisar" || e.key === "?") {
      e.preventDefault();
      tutupLapisan();
    }
    return;
  }

  // Enter/Spasi pada kalimat contoh → buka terjemahan
  if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-contoh]")) {
    e.preventDefault();
    bukaTutupArti(e.target);
    return;
  }
  // Enter/Spasi pada tombol dibiarkan (tombol menangani sendiri)
  if (tag === "BUTTON" && (e.key === "Enter" || e.key === " ")) return;

  const topikAngka = /^[1-9]$/.test(e.key) ? daftarTopik()[Number(e.key) - 1] : null;

  switch (e.key) {
    case "ArrowRight": case "ArrowDown": case "PageDown": case " ":
      e.preventDefault(); presMaju(); break;
    case "ArrowLeft": case "ArrowUp": case "PageUp": case "Backspace":
      e.preventDefault(); presMundur(); break;
    case "Home":
      e.preventDefault(); keSlide(0); break;
    case "End":
      e.preventDefault(); keSlide(pres.daftarSlide.length - 1); break;
    case "f": case "F":
      e.preventDefault(); gantiLayarPenuh(); break;
    case "a": case "A":
      e.preventDefault(); munculkanSemua(); break;
    case "t": case "T":
      e.preventDefault(); bukaTutupSemuaArti(); break;
    case "o": case "O":
      e.preventDefault(); bukaLapisan("ikhtisar"); break;
    case "b": case "B": case ".":
      e.preventDefault(); gantiTirai(); break;
    case "?": case "h": case "H":
      e.preventDefault(); bukaLapisan("bantuan"); break;
    case "+": case "=":
      e.preventDefault(); aturZoom(1.1); break;
    case "-": case "_":
      e.preventDefault(); aturZoom(1 / 1.1); break;
    case "0":
      e.preventDefault(); aturZoom(1); break;
    default:
      if (topikAngka) { e.preventDefault(); pergiKe(alamatPresentasi(topikAngka, 0)); }
  }
}
