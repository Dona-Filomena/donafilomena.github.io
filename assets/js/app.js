/* =========================================================
   DOÑA FILOMENA · lógica del sitio
   (los datos están en data.js)
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const ITEM = Object.fromEntries(MENU.map(i => [i.id, i]));
  const CAT = Object.fromEntries(CATEGORIAS.map(c => [c.id, c]));
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const BEBIDAS = new Set(["jugos", "tragos", "cervezas", "jarras"]);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fmt = n => "$" + Number(n).toLocaleString("es-CL");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const toMin = hm => { const [h, m] = hm.split(":").map(Number); return h * 60 + m; };
  const hm = min => { const m = ((min % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); };
  const disponibleEn = item => item.en || CAT[item.cat].en;
  const disponible = (item, local = state.local) => disponibleEn(item).includes(local);

  /* ---------- almacenamiento seguro ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } }
  };

  const state = {
    local: LOCALES[store.get("df-local")] ? store.get("df-local") : "peninsula",
    cart: Object.fromEntries(Object.entries(store.get("df-cart", {})).filter(([id, q]) => ITEM[id] && q > 0)),
    modo: null,
    q: "",
    cat: CATEGORIAS[0].id
  };

  /* ---------- hora de Chile ---------- */
  function ahoraCL() {
    try {
      const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Santiago", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
      }).formatToParts(new Date()).map(x => [x.type, x.value]));
      const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
      return { day, min: (Number(p.hour) % 24) * 60 + Number(p.minute) };
    } catch {
      const d = new Date(); return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function estado(loc) {
    const { day, min } = ahoraCL();
    const H = loc.horario;
    const ayer = H[(day + 6) % 7];
    if (ayer) { const c = toMin(ayer[1]); if (c > 1440 && min < c - 1440) return { open: true, txt: `Abierto ahora · cierra ${hm(c)}` }; }
    const hoy = H[day];
    if (hoy) {
      const o = toMin(hoy[0]), c = toMin(hoy[1]);
      if (min >= o && min < c) return { open: true, txt: `Abierto ahora · cierra ${hm(c)}` };
      if (min < o) return { open: false, txt: `Cerrado · abre hoy ${hm(o)}` };
    }
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (H[d]) return { open: false, txt: `Cerrado · abre ${i === 1 ? "mañana" : "el " + DIAS[d]} ${H[d][0]}` };
    }
    return { open: false, txt: "Cerrado" };
  }

  function happyHour() {
    const { day, min } = ahoraCL();
    const d = toMin(HAPPY_HOUR.desde), h = toMin(HAPPY_HOUR.hasta);
    if (HAPPY_HOUR.dias.includes(day) && min >= d && min < h) {
      const r = h - min;
      return { live: true, title: "Happy Hour activo ahora", sub: `Quedan ${r >= 60 ? Math.floor(r / 60) + " h " : ""}${r % 60} min · ${HAPPY_HOUR.texto}` };
    }
    for (let i = 0; i <= 7; i++) {
      const dd = (day + i) % 7;
      if (!HAPPY_HOUR.dias.includes(dd)) continue;
      if (i === 0 && min >= d) continue;
      const cuando = i === 0 ? "hoy" : i === 1 ? "mañana" : "el " + DIAS[dd];
      return { live: false, title: `Próximo Happy Hour: ${cuando} ${HAPPY_HOUR.desde}`, sub: HAPPY_HOUR.texto };
    }
    return { live: false, title: "Happy Hour", sub: HAPPY_HOUR.texto };
  }

  /* ---------- controles + / stepper ---------- */
  const ICON_PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';

  function control(id) {
    const it = ITEM[id], q = state.cart[id] || 0;
    if (!disponible(it)) return "";
    if (!q) return `<button class="add" data-add="${id}" aria-label="Agregar ${esc(it.nm)}">${ICON_PLUS}</button>`;
    return `<span class="step" role="group" aria-label="Cantidad de ${esc(it.nm)}">
      <button data-dec="${id}" aria-label="Quitar uno">−</button><b aria-live="polite">${q}</b><button data-inc="${id}" aria-label="Agregar uno">+</button></span>`;
  }
  const refreshControls = id => $$(`[data-ctl="${id}"]`).forEach(el => { el.innerHTML = control(id); });

  const priceHTML = it => it.precio == null ? `<span class="price q">Consultar</span>` : `<span class="price">${fmt(it.precio)}</span>`;
  const tagsHTML = it => (it.tags || []).filter(t => t !== "hh" || it.cat === "tragos").map(t => {
    const lbl = { popular: "Popular", premiada: "Premiada", economica: "Económica", nuevo: "Nuevo", hh: "Happy Hour" }[t] || t;
    return `<span class="tag ${t}">${lbl}</span>`;
  }).join("");

  /* ---------- locales ---------- */
  function renderLocales() {
    $("#locGrid").innerHTML = Object.values(LOCALES).map(l => {
      const e = estado(l);
      const img = l.foto
        ? `<img src="${l.foto}" alt="Fachada de ${esc(l.nombre)}" loading="lazy">`
        : `<div class="loc-ph"><span>Zofri<small>Mall Zofri · Etapa 7</small></span></div>`;
      return `<article class="loc ${l.id === state.local ? "sel" : ""}" data-loc="${l.id}">
        <div class="loc-img">${img}
          <span class="loc-status"><span class="dot ${e.open ? "open" : "closed"}"></span>${e.txt}</span>
          <span class="loc-selbadge">Pidiendo aquí</span>
        </div>
        <div class="loc-body">
          <span class="loc-tipo">${esc(l.tipo)}</span>
          <h3>${esc(l.nombre.replace("Doña Filomena ", ""))}</h3>
          <p class="loc-dir">${esc(l.direccion)} · ${esc(l.zona)}</p>
          <dl class="loc-hours">${l.horarioTexto.map(([d, h]) => `<dt>${d}</dt><dd>${h}</dd>`).join("")}</dl>
          <ul class="loc-feats">${l.destacados.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
          <div class="loc-actions">
            <button class="btn btn-primary" data-pedir="${l.id}">Pedir en ${esc(l.corto)}</button>
            <a class="btn btn-ghost" href="${l.maps}" target="_blank" rel="noopener">Cómo llegar</a>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  function renderCompare() {
    const ids = Object.keys(LOCALES);
    const rows = CATEGORIAS.map(c => {
      const cells = ids.map(l => MENU.filter(i => i.cat === c.id && disponibleEn(i).includes(l)).length);
      return { nombre: c.nombre, cells: cells.map(n => n ? `<span class="c-yes">Sí <small>· ${n} ${n === 1 ? "opción" : "opciones"}</small></span>` : `<span class="c-no">No</span>`), diff: cells.some(n => !n) && cells.some(n => n) };
    });
    [["delivery", "Delivery"], ["retiro", "Retiro en local"]].forEach(([k, n]) => {
      const has = ids.map(l => LOCALES[l].entrega.includes(k));
      rows.push({ nombre: n, cells: has.map(h => h ? `<span class="c-yes">Sí</span>` : `<span class="c-no">No</span>`), diff: has.some(Boolean) && has.some(h => !h) });
    });
    $("#compareTable").innerHTML =
      `<div class="c-row head" role="row"><span role="columnheader">Carta</span>${ids.map(l => `<span role="columnheader">${LOCALES[l].corto}</span>`).join("")}</div>` +
      rows.map(r => `<div class="c-row ${r.diff ? "diff" : "same"}" role="row"><span role="cell">${esc(r.nombre)}</span>${r.cells.map(c => `<span role="cell">${c}</span>`).join("")}</div>`).join("");
    applyDiffFilter();
  }
  function applyDiffFilter() {
    const only = $("#onlyDiff").checked;
    $$("#compareTable .c-row.same").forEach(r => r.classList.toggle("hide", only));
  }

  /* ---------- carta ---------- */
  function renderTabs() {
    const q = !!state.q.trim();
    $("#tabs").innerHTML = CATEGORIAS.map(c => {
      const n = MENU.filter(i => i.cat === c.id && disponible(i)).length;
      const on = !q && c.id === state.cat;
      return `<button class="tab ${on ? "on" : ""} ${n ? "" : "off"}" data-tab="${c.id}" aria-pressed="${on}">${esc(c.nombre)}${n ? ` <small>${n}</small>` : ""}</button>`;
    }).join("");
    const on = $("#tabs .tab.on");
    if (on) { const tabs = $("#tabs"); tabs.scrollTo({ left: on.offsetLeft - tabs.clientWidth / 2 + on.offsetWidth / 2, behavior: reduceMotion ? "auto" : "smooth" }); }
  }

  function renderFavs() {
    const favs = MENU.filter(i => i.img && (i.tags || []).includes("popular") && disponible(i));
    $("#favs").innerHTML = favs.map(i => `
      <article class="fcard">
        <div class="fcard-img"><img src="${i.img}" alt="${esc(i.nm)}" loading="lazy"><div class="tagrow">${tagsHTML(i)}</div></div>
        <div class="fcard-body">
          <h4>${esc(i.nm)}</h4>
          <p>${esc(i.desc || CAT[i.cat].nombre)}</p>
          <div class="fcard-foot">${priceHTML(i)}<span data-ctl="${i.id}">${control(i.id)}</span></div>
        </div>
      </article>`).join("");
  }

  function renderMenu() {
    const q = norm(state.q.trim());
    const loc = LOCALES[state.local];
    let total = 0;
    $("#menuList").innerHTML = CATEGORIAS.map(c => {
      if (!q && c.id !== state.cat) return "";
      let items = MENU.filter(i => i.cat === c.id);
      if (q) items = items.filter(i => norm(i.nm + " " + (i.desc || "") + " " + c.nombre).includes(q));
      if (!items.length) return "";
      items.sort((a, b) => disponible(b) - disponible(a));
      total += items.length;
      return `<div class="mcat" id="cat-${c.id}">
        <h3 class="cat-title">${esc(c.nombre)}</h3>
        <p class="cat-sub">${esc(c.sub)}${c.en.includes(state.local) ? "" : ` · <b>no disponible en ${loc.corto}</b>`}</p>
        <div class="mgrid">${items.map(i => {
          const ok = disponible(i);
          const otro = disponibleEn(i).find(l => l !== state.local);
          return `<div class="item ${ok ? "" : "na"}">
            <div class="item-info">
              <div class="item-name">${esc(i.nm)} ${tagsHTML(i)}</div>
              ${i.desc ? `<div class="item-desc">${esc(i.desc)}</div>` : ""}
              ${ok ? "" : `<div class="item-na">Solo en ${LOCALES[otro].corto} · <button data-switch-local="${otro}">pedir allá</button></div>`}
            </div>
            <div class="item-right">${priceHTML(i)}<span data-ctl="${i.id}">${control(i.id)}</span></div>
          </div>`;
        }).join("")}</div>
      </div>`;
    }).join("");
    $("#favsWrap").hidden = !!q;
    $("#emptySearch").hidden = total > 0;
    renderTabs();
  }

  function renderDulce() {
    const list = (cat, n) => MENU.filter(i => i.cat === cat).slice(0, n).map(i => `
      <li><span class="ln">${esc(i.nm)}${i.desc ? `<small>${esc(i.desc)}</small>` : ""}</span><span class="fill"></span>${priceHTML(i)}<span data-ctl="${i.id}">${control(i.id)}</span></li>`).join("");
    $("#listaPostres").innerHTML = list("postres", 6);
    $("#listaTragos").innerHTML = list("tragos", 6);
  }

  function renderHH() {
    const h = happyHour();
    $("#hhBox").classList.toggle("live", h.live);
    $("#hhTitle").textContent = h.title;
    $("#hhSub").textContent = h.sub;
  }

  /* ---------- reseñas / instagram / ubicación ---------- */
  function renderReviews() {
    $("#revTrack").innerHTML = RESENAS.map(r => `
      <article class="rev"><div class="stars" aria-label="5 estrellas">★★★★★</div><p>${esc(r.txt)}</p>
      <footer><b>${esc(r.autor)}</b><span>Reseña en ${esc(r.fuente)}</span></footer></article>`).join("");
  }
  function renderIG() {
    $("#igGrid").innerHTML = INSTAGRAM_POSTS.map(p => `
      <a class="ig-post" href="${p.url}" target="_blank" rel="noopener" aria-label="${esc(p.alt)} — ver en Instagram">
        <img src="${p.img}" alt="${esc(p.alt)}" loading="lazy" width="480" height="600">
        <span class="ig-ov"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.1C1.1 8.6 3 5 6.6 5c2.1 0 3.6 1.2 5.4 3.1C13.8 6.2 15.3 5 17.4 5 21 5 22.9 8.6 21.5 11.9 19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>Ver en Instagram</span>
      </a>`).join("");
  }
  let ubicLocal = null;
  function renderUbic(id) {
    ubicLocal = id;
    const l = LOCALES[id], e = estado(l);
    $$("#ubicTabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.local === id));
    $("#ubicTitle").textContent = id === "zofri" ? "Mall Zofri" : "Cavancha";
    const fr = $("#mapFrame");
    if (fr.dataset.src !== l.mapsEmbed) { fr.dataset.src = l.mapsEmbed; fr.src = l.mapsEmbed; fr.title = "Mapa " + l.nombre; }
    $("#ubicInfo").innerHTML = `
      <div class="info-card"><h4>Dirección</h4><p class="big">${esc(l.direccion)}</p><p>${esc(l.zona)}</p></div>
      <div class="info-card"><h4>Horario</h4><p style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span class="dot ${e.open ? "open" : "closed"}"></span>${e.txt}</p>
        ${l.horarioTexto.map(([d, h]) => `<p>${d}: ${h}</p>`).join("")}</div>
      <div class="info-actions">
        <a class="btn btn-wa" href="https://wa.me/${l.whatsapp}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg>WhatsApp</a>
        <a class="btn btn-ghost" href="tel:${l.telefono.replace(/\s/g, "")}">Llamar</a>
        <a class="btn btn-ghost" href="${l.maps}" target="_blank" rel="noopener">Cómo llegar</a>
      </div>`;
  }

  /* ---------- local seleccionado ---------- */
  function placeThumbs() {
    $$(".seg").forEach(seg => {
      const on = $('button[aria-checked="true"]', seg), th = $(".seg-thumb", seg);
      if (!on || !th || !on.offsetWidth) return;
      th.style.width = on.offsetWidth + "px";
      th.style.transform = `translateX(${on.offsetLeft - 4}px)`;
    });
  }
  function setLocal(id, opts = {}) {
    if (!LOCALES[id]) return;
    const cambio = id !== state.local;
    state.local = id;
    store.set("df-local", id);
    if (!LOCALES[id].entrega.includes(state.modo)) state.modo = LOCALES[id].entrega[0];
    $$(".seg button").forEach(b => b.setAttribute("aria-checked", b.dataset.local === id));
    placeThumbs();
    $$(".loc").forEach(c => c.classList.toggle("sel", c.dataset.loc === id));
    $("#cartaLocal").textContent = LOCALES[id].corto;
    $("#waFloat").href = "https://wa.me/" + LOCALES[id].whatsapp;
    renderHeroStatus();
    renderFavs(); renderMenu(); renderDulce();
    renderUbic(id);
    renderCart();
    if (cambio && !opts.silent) {
      const fuera = Object.keys(state.cart).filter(k => !disponible(ITEM[k]));
      toast(fuera.length ? `Pidiendo en ${LOCALES[id].corto} · ${fuera.length} producto${fuera.length > 1 ? "s" : ""} no está${fuera.length > 1 ? "n" : ""} aquí` : `Pidiendo en ${LOCALES[id].nombre}`);
    }
  }
  function renderHeroStatus() {
    const l = LOCALES[state.local], e = estado(l);
    $("#heroDot").className = "dot " + (e.open ? "open" : "closed");
    $("#heroStatus").textContent = `${l.corto} · ${e.txt}`;
  }

  /* ---------- carrito ---------- */
  const lineas = () => Object.entries(state.cart).map(([id, q]) => ({ it: ITEM[id], q }));
  const cantidad = () => lineas().reduce((s, l) => s + l.q, 0);
  const subtotal = () => lineas().reduce((s, l) => s + (l.it.precio || 0) * l.q, 0);

  function setQty(id, q) {
    if (q > 0) state.cart[id] = q; else delete state.cart[id];
    store.set("df-cart", state.cart);
    refreshControls(id);
    renderCart();
  }
  function add(id) {
    const it = ITEM[id];
    if (!it) return;
    if (!disponible(it)) { toast(`${it.nm} no está en ${LOCALES[state.local].corto}`); return; }
    setQty(id, (state.cart[id] || 0) + 1);
    toast(`Agregado: ${it.nm}`);
    const b = $("#cartBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  }

  function renderCart() {
    const n = cantidad(), t = subtotal(), L = lineas();
    const loc = LOCALES[state.local];
    $("#cartCount").textContent = n; $("#cartCount").classList.toggle("on", n > 0);
    $("#fbarN").textContent = n; $("#fbarT").textContent = fmt(t);
    $("#fbar").classList.toggle("on", n > 0);
    document.body.classList.toggle("has-cart", n > 0);
    $("#cartTotal").textContent = fmt(t);

    $("#cartItems").innerHTML = L.length ? L.map(({ it, q }) => `
      <div class="ci">
        <div class="ci-info">
          <div class="ci-name">${esc(it.nm)}</div>
          <div class="ci-sub">${it.precio == null ? "Precio a confirmar" : fmt(it.precio * q)}${q > 1 && it.precio ? ` · ${fmt(it.precio)} c/u` : ""}</div>
          ${disponible(it) ? "" : `<div class="ci-warn">No disponible en ${loc.corto}</div>`}
        </div>
        <span class="step" role="group" aria-label="Cantidad de ${esc(it.nm)}"><button data-dec="${it.id}" aria-label="Quitar uno">−</button><b>${q}</b><button data-inc="${it.id}" aria-label="Agregar uno" ${disponible(it) ? "" : "disabled"}>+</button></span>
      </div>`).join("")
      : `<div class="cart-empty"><div class="emo">🥟</div><p class="big">Tu pedido está vacío</p><p>Agrega tus empanadas favoritas desde la carta.</p><a href="#carta" class="link-arrow" data-close-cart>Ir a la carta</a></div>`;

    // sugerencia de bebida
    const tieneBebida = L.some(l => BEBIDAS.has(l.it.cat));
    const sug = SUGERENCIAS.map(id => ITEM[id]).filter(i => i && disponible(i) && !state.cart[i.id]);
    $("#upsell").hidden = !L.length || tieneBebida || !sug.length;
    $("#upsellRow").innerHTML = sug.map(i => `<button class="up-chip" data-add="${i.id}">+ ${esc(i.nm)} <b>${i.precio ? fmt(i.precio) : ""}</b></button>`).join("");

    // modo de entrega
    if (!loc.entrega.includes(state.modo)) state.modo = loc.entrega[0];
    $("#modoChoice").innerHTML = loc.entrega.map(m => `<label><input type="radio" name="modo" value="${m}" ${m === state.modo ? "checked" : ""}><span>${m === "delivery" ? "🛵 Delivery" : "🛍️ Retiro en local"}</span></label>`).join("");
    $("#modoHint").textContent = loc.notaDelivery;
    $("#dirField").hidden = state.modo !== "delivery";
    $("#checkout").hidden = !L.length;

    const pendientes = L.filter(l => l.it.precio == null).length;
    $("#totalNote").textContent = !L.length ? "" :
      (pendientes ? `+ ${pendientes} producto${pendientes > 1 ? "s" : ""} con precio a confirmar. ` : "") +
      (state.modo === "delivery" ? "El local confirma total y tiempo de entrega." : `Retiras en ${loc.direccion}.`);
    $("#sendWa").disabled = !L.length;
  }

  function openCart() {
    $("#drawer").classList.add("on"); $("#scrim").classList.add("on");
    $("#drawer").setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => { placeThumbs(); $("#drawerClose").focus(); }, 60);
  }
  function closeCart() {
    $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on");
    $("#drawer").setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  }

  function marcarError(input, msg) {
    const f = input.closest(".field"); f.classList.add("err"); input.focus();
    toast(msg); setTimeout(() => f.classList.remove("err"), 1600);
  }

  function enviarWA() {
    const L = lineas(), loc = LOCALES[state.local];
    if (!L.length) { toast("Tu pedido está vacío"); return; }
    const fuera = L.filter(l => !disponible(l.it));
    if (fuera.length) { toast(`Quita lo que no está en ${loc.corto}: ${fuera.map(f => f.it.nm).join(", ")}`); return; }
    const nombre = $("#fNombre").value.trim(), dir = $("#fDir").value.trim(), nota = $("#fNota").value.trim();
    const pago = ($('input[name="pago"]:checked') || {}).value || "Efectivo";
    if (!nombre) return marcarError($("#fNombre"), "Escribe tu nombre");
    if (state.modo === "delivery" && !dir) return marcarError($("#fDir"), "Falta la dirección de despacho");
    store.set("df-cliente", { nombre, dir });

    const t = subtotal(), pend = L.filter(l => l.it.precio == null).length;
    let m = `¡Hola ${loc.nombre}! 👋 Quiero hacer un pedido:\n\n`;
    L.forEach(({ it, q }) => { m += `• ${q} × ${it.nm} — ${it.precio == null ? "precio a confirmar" : fmt(it.precio * q)}\n`; });
    m += `\n*Total estimado: ${fmt(t)}*${pend ? " (+ precios a confirmar)" : ""}\n\n`;
    m += `*Entrega:* ${state.modo === "delivery" ? "Delivery 🛵" : "Retiro en local 🛍️"}\n`;
    if (state.modo === "delivery") m += `*Dirección:* ${dir}\n`;
    m += `*Nombre:* ${nombre}\n*Pago:* ${pago}\n`;
    if (nota) m += `*Comentarios:* ${nota}\n`;
    m += `\n_Pedido armado en la web. Quedo atento/a a la confirmación._`;

    const url = `https://wa.me/${loc.whatsapp}?text=${encodeURIComponent(m)}`;
    const w = window.open(url, "_blank", "noopener");
    if (!w) location.href = url;
  }

  /* ---------- navegación de la carta ---------- */
  const offsetTop = () => $("#hdr").offsetHeight + $("#tabs").offsetHeight + 8;
  function scrollToEl(el) {
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - offsetTop(), behavior: reduceMotion ? "auto" : "smooth" });
  }
  function irACat(id) {
    state.cat = id; state.q = ""; $("#q").value = "";
    renderMenu();
    const list = $("#menuList");
    if (list.getBoundingClientRect().top < offsetTop() || list.getBoundingClientRect().top > innerHeight * .6) scrollToEl(list);
  }

  /* ---------- toast ---------- */
  let tt;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("on");
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 2200);
  }

  /* ---------- eventos ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest("button, a");
    if (!t) return;
    const d = t.dataset;
    if (d.add) { e.preventDefault(); add(d.add); }
    else if (d.inc) { setQty(d.inc, (state.cart[d.inc] || 0) + 1); }
    else if (d.dec) { setQty(d.dec, (state.cart[d.dec] || 0) - 1); }
    else if (t.closest(".seg") && d.local) { setLocal(d.local); }
    else if (d.pedir) { setLocal(d.pedir); scrollToEl($("#carta")); }
    else if (d.switchLocal) { setLocal(d.switchLocal); }
    else if (d.tab) { irACat(d.tab); }
    else if (d.gotoCat) { e.preventDefault(); irACat(d.gotoCat); }
    else if (t.closest("#ubicTabs") && d.local) { renderUbic(d.local); }
    else if ("closeCart" in d) { closeCart(); }
    else if ("waAsk" in d) {
      e.preventDefault();
      window.open(`https://wa.me/${LOCALES[state.local].whatsapp}?text=${encodeURIComponent(`Hola, ¿tienen "${state.q}"?`)}`, "_blank", "noopener");
    }
  });

  $("#cartBtn").addEventListener("click", openCart);
  $("#fbar").addEventListener("click", openCart);
  $("#drawerClose").addEventListener("click", closeCart);
  $("#scrim").addEventListener("click", closeCart);
  $("#sendWa").addEventListener("click", enviarWA);
  $("#checkout").addEventListener("submit", e => { e.preventDefault(); enviarWA(); });
  $("#modoChoice").addEventListener("change", e => { state.modo = e.target.value; renderCart(); });
  $("#onlyDiff").addEventListener("change", applyDiffFilter);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeCart(); toggleNav(false); } });

  let qT;
  $("#q").addEventListener("input", e => {
    clearTimeout(qT);
    qT = setTimeout(() => { state.q = e.target.value; renderMenu(); }, 120);
  });

  // menú móvil
  const toggleNav = force => {
    const on = force ?? !$("#mnav").classList.contains("on");
    $("#mnav").classList.toggle("on", on);
    $("#mnav").setAttribute("aria-hidden", !on);
    $("#burger").setAttribute("aria-expanded", on);
  };
  $("#burger").addEventListener("click", () => toggleNav());
  $$("#mnav a").forEach(a => a.addEventListener("click", () => toggleNav(false)));

  // reseñas
  const rv = dir => { const tr = $("#revTrack"); tr.scrollBy({ left: dir * (tr.querySelector(".rev")?.offsetWidth + 16 || 300), behavior: "smooth" }); };
  $("#revPrev").addEventListener("click", () => rv(-1));
  $("#revNext").addEventListener("click", () => rv(1));

  // header
  const onScroll = () => $("#hdr").classList.toggle("scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", placeThumbs);

  // parallax del hero (solo mouse)
  if (!reduceMotion && matchMedia("(pointer:fine)").matches) {
    const art = $("#heroArt"), els = $$("[data-depth]", art);
    let raf;
    $(".hero").addEventListener("pointermove", e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = art.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        els.forEach(el => {
          const d = +el.dataset.depth;
          el.style.transform = `translate(${x * d}px, ${y * d}px) rotate(var(--r, 0deg))`;
        });
      });
    });
    $(".hero").addEventListener("pointerleave", () => els.forEach(el => { el.style.transform = ""; }));
  }

  // aparición al hacer scroll
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$(".sec-head, .loc, .compare, .dulce-card, .exp-card, .rev-track, .ig-head, .ig-grid, .ubic-grid").forEach(el => { el.classList.add("rv"); io.observe(el); });
  }

  /* ---------- inicio ---------- */
  const cli = store.get("df-cliente", {});
  if (cli.nombre) $("#fNombre").value = cli.nombre;
  if (cli.dir) $("#fDir").value = cli.dir;
  $("#yr").textContent = new Date().getFullYear();

  renderLocales();
  renderCompare();
  renderReviews();
  renderIG();
  renderHH();
  setLocal(state.local, { silent: true });
  onScroll();
  document.fonts?.ready.then(placeThumbs);
  setInterval(() => { renderHH(); renderHeroStatus(); renderLocales(); renderUbic(ubicLocal || state.local); }, 60000);
})();
