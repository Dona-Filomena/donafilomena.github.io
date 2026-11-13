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
  const LOCAL = LOCALES.peninsula;            // local que recibe los pedidos de la web
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fmt = n => "$" + Number(n).toLocaleString("es-CL");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const toMin = hm => { const [h, m] = hm.split(":").map(Number); return h * 60 + m; };
  const hm = min => { const m = ((min % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); };
  const waLink = (num, txt) => `https://wa.me/${num}${txt ? "?text=" + encodeURIComponent(txt) : ""}`;
  // "Empanada de horno" + "Pino": los nombres se repiten entre categorías
  const nombreItem = it => {
    const pre = CAT[it.cat].pre;
    return pre && !norm(it.nm).startsWith(norm(pre).split(" ")[0]) && !/^hamburguesa/i.test(it.nm) ? `${pre} ${it.nm}` : it.nm;
  };

  /* ---------- almacenamiento seguro ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } }
  };

  const state = {
    cart: Object.fromEntries(Object.entries(store.get("df-cart", {})).filter(([id, q]) => ITEM[id] && q > 0)),
    modo: LOCAL.entrega[0],   // "delivery" | "retiro"
    zona: null,               // "peninsula" | "otro" (solo delivery)
    q: "",
    cat: "fritas"
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
      return { live: true, title: "Happy Hour activo ahora", sub: `Quedan ${r >= 60 ? Math.floor(r / 60) + " h " : ""}${r % 60} min · ${HAPPY_HOUR.promo}` };
    }
    for (let i = 0; i <= 7; i++) {
      const dd = (day + i) % 7;
      if (!HAPPY_HOUR.dias.includes(dd)) continue;
      if (i === 0 && min >= d) continue;
      const cuando = i === 0 ? "hoy" : i === 1 ? "mañana" : "el " + DIAS[dd];
      return { live: false, title: `Próximo Happy Hour: ${cuando} ${HAPPY_HOUR.desde}`, sub: `${HAPPY_HOUR.texto} · ${HAPPY_HOUR.promo}` };
    }
    return { live: false, title: "Happy Hour", sub: `${HAPPY_HOUR.texto} · ${HAPPY_HOUR.promo}` };
  }

  /* ---------- controles + / stepper ---------- */
  const ICON_PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
  const ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg>';

  function control(id) {
    const it = ITEM[id], q = state.cart[id] || 0;
    if (!q) return `<button class="add" data-add="${id}" aria-label="Agregar ${esc(it.nm)}">${ICON_PLUS}</button>`;
    return `<span class="step" role="group" aria-label="Cantidad de ${esc(it.nm)}">
      <button data-dec="${id}" aria-label="Quitar uno">−</button><b aria-live="polite">${q}</b><button data-inc="${id}" aria-label="Agregar uno">+</button></span>`;
  }
  const refreshControls = id => $$(`[data-ctl="${id}"]`).forEach(el => { el.innerHTML = control(id); });

  const priceHTML = it => it.precio == null ? `<span class="price q">Consultar</span>` : `<span class="price">${fmt(it.precio)}</span>`;
  const tagsHTML = it => (it.tags || []).map(t => {
    const lbl = { pedido: "Más pedido", casa: "De la casa", economica: "Promo", nuevo: "Nuevo" }[t] || t;
    return `<span class="tag ${t}">${lbl}</span>`;
  }).join("");

  /* ---------- locales ---------- */
  function renderLocales() {
    $("#locGrid").innerHTML = Object.values(LOCALES).map(l => {
      const e = estado(l);
      const img = l.foto
        ? `<img src="${l.foto}" alt="Fachada de ${esc(l.nombre)}" loading="lazy">`
        : `<div class="loc-ph"><span>${esc(l.corto)}<small>${esc(l.direccion)}</small></span></div>`;
      const pedir = l === LOCAL
        ? `<a class="btn btn-primary" href="#carta">Hacer mi pedido</a>`
        : `<a class="btn btn-wa" href="${waLink(l.whatsapp, `Hola, quiero hacer un pedido en ${l.nombre}`)}" target="_blank" rel="noopener">${ICON_WA}Pedir por WhatsApp</a>`;
      return `<article class="loc">
        <div class="loc-img">${img}
          <span class="loc-status"><span class="dot ${e.open ? "open" : "closed"}"></span>${e.txt}</span>
        </div>
        <div class="loc-body">
          <span class="loc-tipo">${esc(l.tipo)}</span>
          <h3>${esc(l.nombre.replace("Doña Filomena ", ""))}</h3>
          <p class="loc-dir">${esc(l.direccion)} · ${esc(l.zona)}</p>
          <dl class="loc-hours">${l.horarioTexto.map(([d, h]) => `<dt>${d}</dt><dd>${h}</dd>`).join("")}</dl>
          <ul class="loc-feats">${l.destacados.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
          <div class="loc-actions">
            ${pedir}
            <a class="btn btn-ghost" href="${l.maps}" target="_blank" rel="noopener">Cómo llegar</a>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  /* ---------- carta ---------- */
  function renderTabs() {
    const q = !!state.q.trim();
    $("#tabs").innerHTML = CATEGORIAS.map(c => {
      const n = MENU.filter(i => i.cat === c.id).length;
      const on = !q && c.id === state.cat;
      return `<button class="tab ${on ? "on" : ""}" data-tab="${c.id}" aria-pressed="${on}">${esc(c.nombre)} <small>${n}</small></button>`;
    }).join("");
    const on = $("#tabs .tab.on");
    if (on) { const tabs = $("#tabs"); tabs.scrollTo({ left: on.offsetLeft - tabs.clientWidth / 2 + on.offsetWidth / 2, behavior: reduceMotion ? "auto" : "smooth" }); }
  }

  function renderFavs() {
    const favs = MENU.filter(i => i.img && (i.tags || []).some(t => t === "pedido" || t === "casa"));
    $("#favs").innerHTML = favs.map(i => `
      <article class="fcard">
        <div class="fcard-img"><img src="${i.img}" alt="${esc(i.nm)}" loading="lazy"><div class="tagrow">${tagsHTML(i)}</div></div>
        <div class="fcard-body">
          <h4>${esc(nombreItem(i))}</h4>
          <p>${esc(i.desc || CAT[i.cat].nombre)}</p>
          <div class="fcard-foot">${priceHTML(i)}<span data-ctl="${i.id}">${control(i.id)}</span></div>
        </div>
      </article>`).join("");
  }

  function renderMenu() {
    const q = norm(state.q.trim());
    let total = 0;
    $("#menuList").innerHTML = CATEGORIAS.map(c => {
      if (!q && c.id !== state.cat) return "";
      let items = MENU.filter(i => i.cat === c.id);
      if (q) items = items.filter(i => norm(i.nm + " " + (i.desc || "") + " " + c.nombre).includes(q));
      if (!items.length) return "";
      total += items.length;
      return `<div class="mcat" id="cat-${c.id}">
        <h3 class="cat-title">${esc(c.nombre)}</h3>
        <p class="cat-sub">${esc(c.sub)}</p>
        <div class="mgrid">${items.map(i => `<div class="item ${i.img ? "has-img" : ""}">
            ${i.img ? `<img class="item-img" src="${i.img}" alt="" loading="lazy" width="64" height="64">` : ""}
            <div class="item-info">
              <div class="item-name">${esc(i.nm)} ${tagsHTML(i)}</div>
              ${i.desc ? `<div class="item-desc">${esc(i.desc)}</div>` : ""}
            </div>
            <div class="item-right">${priceHTML(i)}<span data-ctl="${i.id}">${control(i.id)}</span></div>
          </div>`).join("")}</div>
      </div>`;
    }).join("");
    $("#favsWrap").hidden = !!q;
    $("#emptySearch").hidden = total > 0;
    renderTabs();
  }

  function renderDulce() {
    const fila = i => `
      <li><span class="ln">${esc(i.nm)}${i.desc ? `<small>${esc(i.desc)}</small>` : ""}</span><span class="fill"></span>${priceHTML(i)}<span data-ctl="${i.id}">${control(i.id)}</span></li>`;
    $("#listaPostres").innerHTML = MENU.filter(i => i.cat === "postres").slice(0, 6).map(fila).join("");
    $("#listaTragos").innerHTML = ["ct1", "so7", "mj2", "so1", "ct3", "ct8"].map(id => ITEM[id]).filter(Boolean).map(fila).join("");
  }

  function renderHH() {
    const h = happyHour();
    $("#hhBox").classList.toggle("live", h.live);
    $("#hhTitle").textContent = h.title;
    $("#hhSub").textContent = h.sub;
  }

  /* ---------- reseñas / instagram / ubicación ---------- */
  function renderReviews() {
    const miles = n => (Math.floor(n / 100) * 100).toLocaleString("es-CL");
    const g = GOOGLE, nota = g.nota.toFixed(1).replace(".", ",");
    $("#gNota").textContent = nota;
    $("#gStars").setAttribute("aria-label", `${nota} de 5 estrellas`);
    $("#gStars span").style.width = (g.nota / 5 * 100) + "%";
    $("#gTotal").textContent = "+" + miles(g.total);
    $("#gCinco").textContent = "+" + miles(g.cincoEstrellas);
    $("#gPct").textContent = Math.round((g.cincoEstrellas + g.cuatroEstrellas) / g.total * 100) + "%";
    $("#gLeer").href = "https://search.google.com/local/reviews?placeid=" + g.placeId;
    $("#gEscribir").href = "https://search.google.com/local/writereview?placeid=" + g.placeId;

    $("#revTrack").hidden = !RESENAS.length;
    $("#revTrack").classList.toggle("few", RESENAS.length <= 3);
    $("#revNav").hidden = RESENAS.length <= 3;
    $("#revTrack").innerHTML = RESENAS.map(r => `
      <article class="rev">
        <div class="stars" aria-label="${r.estrellas || 5} estrellas">${"★".repeat(r.estrellas || 5)}</div>
        <p>${esc(r.txt)}</p>
        <footer><b>${esc(r.autor)}</b><span>Opinión en Google</span></footer>
      </article>`).join("");
  }
  function renderIG() {
    $("#igGrid").innerHTML = INSTAGRAM_POSTS.map(p => `
      <a class="ig-post" href="${p.url}" target="_blank" rel="noopener" aria-label="${esc(p.alt)} — ver en Instagram">
        <img src="${p.img}" alt="${esc(p.alt)}" loading="lazy" width="480" height="600">
        <span class="ig-ov"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.1C1.1 8.6 3 5 6.6 5c2.1 0 3.6 1.2 5.4 3.1C13.8 6.2 15.3 5 17.4 5 21 5 22.9 8.6 21.5 11.9 19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>Ver en Instagram</span>
      </a>`).join("");
  }
  let ubicLocal = "peninsula";
  function renderUbic(id) {
    ubicLocal = id;
    const l = LOCALES[id], e = estado(l);
    $$("#ubicTabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.local === id));
    $("#ubicTitle").textContent = id === "zofri" ? "Mall Zofri" : "Cavancha";
    const fr = $("#mapFrame");
    if (fr.dataset.src !== l.mapsEmbed) { fr.dataset.src = l.mapsEmbed; fr.src = l.mapsEmbed; fr.title = "Mapa " + l.nombre; }
    $("#ubicInfo").innerHTML = `
      <div class="info-card"><h4>Dirección</h4><p class="big">${esc(l.direccion)}</p><p>${esc(l.zona)}</p></div>
      <div class="info-card"><h4>Pedidos y contacto</h4><p>WhatsApp ${esc(l.telefono)}${l.fijo ? `<br>Teléfono fijo ${esc(l.fijo)}` : ""}</p></div>
      <div class="info-card"><h4>Horario</h4><p style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span class="dot ${e.open ? "open" : "closed"}"></span>${e.txt}</p>
        ${l.horarioTexto.map(([d, h]) => `<p>${d}: ${h}</p>`).join("")}</div>
      <div class="info-actions">
        <a class="btn btn-wa" href="${waLink(l.whatsapp)}" target="_blank" rel="noopener">${ICON_WA}WhatsApp</a>
        <a class="btn btn-ghost" href="tel:${l.telefono.replace(/\s/g, "")}">Llamar</a>
        <a class="btn btn-ghost" href="${l.maps}" target="_blank" rel="noopener">Cómo llegar</a>
      </div>`;
  }
  function renderHeroStatus() {
    const e = estado(LOCAL);
    $("#heroDot").className = "dot " + (e.open ? "open" : "closed");
    $("#heroStatus").textContent = `${LOCAL.corto} · ${e.txt}`;
  }

  /* ---------- carrito ---------- */
  const lineas = () => Object.entries(state.cart).map(([id, q]) => ({ it: ITEM[id], q }));
  const cantidad = () => lineas().reduce((s, l) => s + l.q, 0);
  const subtotal = () => lineas().reduce((s, l) => s + (l.it.precio || 0) * l.q, 0);

  // Cargos del pedido: empaque, cajas de pizza y delivery. monto null = falta elegir sector.
  function cargos() {
    const L = lineas(), out = [];
    if (!L.length) return out;
    const pizzas = L.filter(l => l.it.cat === "pizzas").reduce((s, l) => s + l.q, 0);
    if (CARGOS.empaque && L.some(l => l.it.cat !== "pizzas")) out.push({ nm: "Empaque", monto: CARGOS.empaque });
    if (CARGOS.cajaPizza && pizzas) out.push({ nm: `Caja de pizza × ${pizzas}`, monto: CARGOS.cajaPizza * pizzas });
    if (state.modo === "delivery") {
      if (state.zona === "peninsula") out.push({ nm: "Delivery en Península", monto: 0 });
      else if (state.zona === "otro") out.push({ nm: "Delivery fuera de Península", monto: CARGOS.deliveryFuera });
      else out.push({ nm: "Delivery", monto: null });
    }
    return out;
  }
  const total = () => subtotal() + cargos().reduce((s, c) => s + (c.monto || 0), 0);
  const montoTxt = c => c.monto == null ? "Elige el sector" : c.monto === 0 ? "Gratis" : fmt(c.monto);

  function setQty(id, q) {
    if (q > 0) state.cart[id] = q; else delete state.cart[id];
    store.set("df-cart", state.cart);
    refreshControls(id);
    renderCart();
  }
  function add(id) {
    const it = ITEM[id];
    if (!it) return;
    setQty(id, (state.cart[id] || 0) + 1);
    toast(`Agregado: ${nombreItem(it)}`);
    const b = $("#cartBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  }

  function renderCart() {
    const n = cantidad(), sub = subtotal(), L = lineas(), C = cargos();
    $("#cartCount").textContent = n; $("#cartCount").classList.toggle("on", n > 0);
    $("#fbarN").textContent = n; $("#fbarT").textContent = fmt(sub);
    $("#fbar").classList.toggle("on", n > 0);
    document.body.classList.toggle("has-cart", n > 0);
    $("#cartTotal").textContent = fmt(total());

    $("#cartItems").innerHTML = L.length ? L.map(({ it, q }) => `
      <div class="ci">
        <div class="ci-info">
          <div class="ci-name">${esc(nombreItem(it))}</div>
          <div class="ci-sub">${it.precio == null ? "Precio a confirmar" : fmt(it.precio * q)}${q > 1 && it.precio ? ` · ${fmt(it.precio)} c/u` : ""}</div>
        </div>
        <span class="step" role="group" aria-label="Cantidad de ${esc(it.nm)}"><button data-dec="${it.id}" aria-label="Quitar uno">−</button><b>${q}</b><button data-inc="${it.id}" aria-label="Agregar uno">+</button></span>
      </div>`).join("")
      : `<div class="cart-empty"><div class="emo">🥟</div><p class="big">Tu pedido está vacío</p><p>Agrega tus empanadas favoritas desde la carta.</p><a href="#carta" class="link-arrow" data-close-cart>Ir a la carta</a></div>`;

    // desglose
    $("#resumen").hidden = !L.length;
    $("#resumen").innerHTML = `<div><dt>Productos</dt><dd>${fmt(sub)}</dd></div>` +
      C.map(c => `<div class="${c.monto == null ? "pend" : ""}"><dt>${esc(c.nm)}</dt><dd>${montoTxt(c)}</dd></div>`).join("");

    // sugerencia de bebida
    const tieneBebida = L.some(l => CAT[l.it.cat].bebida);
    const sug = SUGERENCIAS.map(id => ITEM[id]).filter(i => i && !state.cart[i.id]);
    $("#upsell").hidden = !L.length || tieneBebida || !sug.length;
    $("#upsellRow").innerHTML = sug.map(i => `<button class="up-chip" data-add="${i.id}">+ ${esc(i.nm)} <b>${i.precio ? fmt(i.precio) : ""}</b></button>`).join("");

    // entrega y sector
    const radio = (name, val, sel, txt) => `<label><input type="radio" name="${name}" value="${val}" ${sel ? "checked" : ""}><span>${txt}</span></label>`;
    $("#modoChoice").innerHTML = LOCAL.entrega.map(m => radio("modo", m, m === state.modo, m === "delivery" ? "🛵 Delivery" : "🛍️ Retiro en local")).join("");
    $("#modoHint").textContent = state.modo === "delivery" ? LOCAL.notaDelivery : `Retiras en ${LOCAL.direccion}, ${LOCAL.zona}`;
    $("#zonaField").hidden = $("#dirField").hidden = state.modo !== "delivery";
    $("#zonaChoice").innerHTML =
      radio("zona", "peninsula", state.zona === "peninsula", "Península · Gratis") +
      radio("zona", "otro", state.zona === "otro", `Otro sector · ${fmt(CARGOS.deliveryFuera)}`);
    $("#checkout").hidden = !L.length;

    const pendientes = L.filter(l => l.it.precio == null).length;
    const est = estado(LOCAL);
    $("#totalNote").textContent = !L.length ? "" :
      (pendientes ? `+ ${pendientes} producto${pendientes > 1 ? "s" : ""} con precio a confirmar. ` : "") +
      (est.open ? "El local confirma el total y el tiempo." : `${est.txt}: puedes enviarlo igual y te respondemos al abrir.`);
    $("#totalNote").classList.toggle("closed", L.length > 0 && !est.open);
    $("#sendWa").disabled = !L.length;
  }

  function openCart() {
    $("#drawer").classList.add("on"); $("#scrim").classList.add("on");
    $("#drawer").setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => $("#drawerClose").focus(), 60);
  }
  function closeCart() {
    $("#drawer").classList.remove("on"); $("#scrim").classList.remove("on");
    $("#drawer").setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  }

  function marcarError(el, msg) {
    const f = el.closest(".field"); f.classList.add("err");
    (el.matches("input, textarea") ? el : $("input", f)).focus();
    toast(msg); setTimeout(() => f.classList.remove("err"), 1600);
  }

  function enviarWA() {
    const L = lineas();
    if (!L.length) { toast("Tu pedido está vacío"); return; }
    const nombre = $("#fNombre").value.trim(), dir = $("#fDir").value.trim(), nota = $("#fNota").value.trim();
    const pago = ($('input[name="pago"]:checked') || {}).value || "Efectivo";
    const delivery = state.modo === "delivery";
    if (delivery && !state.zona) return marcarError($("#zonaChoice"), "Elige el sector del despacho");
    if (!nombre) return marcarError($("#fNombre"), "Escribe tu nombre");
    if (delivery && !dir) return marcarError($("#fDir"), "Falta la dirección de despacho");
    store.set("df-cliente", { nombre, dir });

    const pend = L.filter(l => l.it.precio == null).length;
    let m = `¡Hola ${LOCAL.nombre}! 👋 Quiero hacer un pedido:\n\n`;
    L.forEach(({ it, q }) => { m += `• ${q} × ${nombreItem(it)} — ${it.precio == null ? "precio a confirmar" : fmt(it.precio * q)}\n`; });
    m += `\nProductos: ${fmt(subtotal())}\n`;
    cargos().forEach(c => { m += `${c.nm}: ${c.monto === 0 ? "gratis" : fmt(c.monto)}\n`; });
    m += `*Total estimado: ${fmt(total())}*${pend ? " (+ precios a confirmar)" : ""}\n\n`;
    m += `*Entrega:* ${delivery ? `Delivery 🛵 (${state.zona === "peninsula" ? "Península" : "fuera de Península"})` : "Retiro en local 🛍️"}\n`;
    if (delivery) m += `*Dirección:* ${dir}\n`;
    m += `*Nombre:* ${nombre}\n*Pago:* ${pago}\n`;
    if (nota) m += `*Comentarios:* ${nota}\n`;
    m += `\n_Pedido armado en la web. Quedo atento/a a la confirmación._`;

    const url = waLink(LOCAL.whatsapp, m);
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
    else if (d.tab) { irACat(d.tab); }
    else if (d.gotoCat) { e.preventDefault(); irACat(d.gotoCat); }
    else if (t.closest("#ubicTabs") && d.local) { renderUbic(d.local); }
    else if ("closeCart" in d) { closeCart(); }
    else if ("waAsk" in d) { e.preventDefault(); window.open(waLink(LOCAL.whatsapp, `Hola, ¿tienen "${state.q}"?`), "_blank", "noopener"); }
  });

  $("#cartBtn").addEventListener("click", openCart);
  $("#fbar").addEventListener("click", openCart);
  $("#drawerClose").addEventListener("click", closeCart);
  $("#scrim").addEventListener("click", closeCart);
  $("#sendWa").addEventListener("click", enviarWA);
  $("#checkout").addEventListener("submit", e => { e.preventDefault(); enviarWA(); });
  $("#modoChoice").addEventListener("change", e => { state.modo = e.target.value; renderCart(); });
  $("#zonaChoice").addEventListener("change", e => { state.zona = e.target.value; renderCart(); });
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
    $$(".sec-head, .loc, .dulce-card, .exp-card, .gcard, .ig-head, .ig-grid, .ubic-grid").forEach(el => { el.classList.add("rv"); io.observe(el); });
  }

  /* ---------- inicio ---------- */
  const cli = store.get("df-cliente", {});
  if (cli.nombre) $("#fNombre").value = cli.nombre;
  if (cli.dir) $("#fDir").value = cli.dir;
  $("#yr").textContent = new Date().getFullYear();
  $("#statCarta").textContent = "+" + Math.floor(MENU.length / 10) * 10;
  $("#waFloat").href = waLink(LOCAL.whatsapp);

  renderLocales();
  renderReviews();
  renderIG();
  renderHH();
  renderHeroStatus();
  renderFavs();
  renderMenu();
  renderDulce();
  renderUbic(ubicLocal);
  renderCart();
  onScroll();
  setInterval(() => { renderHH(); renderHeroStatus(); renderLocales(); renderUbic(ubicLocal); }, 60000);
})();
