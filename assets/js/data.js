/* ============================================================
   DOÑA FILOMENA · DATOS DEL SITIO
   ------------------------------------------------------------
   Único archivo que necesitas tocar para cambiar precios,
   productos, horarios o números de WhatsApp.

   Fuente de precios: carta oficial menusonline.cl/filomena
   (revisada el 11-11-2026).

   - precio: número sin puntos (4500). null = "Consultar".
   - en: locales donde está disponible. Si no lo pones,
     se usa el de la categoría.
   - tags: "popular", "premiada", "nuevo", "economica", "autor"
   - img: foto (opcional) en assets/img/...
   ============================================================ */

const LOCALES = {
  peninsula: {
    id: "peninsula",
    corto: "Península",
    nombre: "Doña Filomena Península",
    tipo: "Pizzería · Restaurant · Bar",
    direccion: "Filomena Valenzuela 298",
    zona: "Península de Cavancha, Iquique",
    whatsapp: "56999780334",
    telefono: "+56 9 9978 0334",
    fijo: "(57) 231 1235",
    instagram: "donafilomenarestaurant",
    maps: "https://maps.app.goo.gl/HCWu1sZ8AzGHnCcf6",
    mapsEmbed: "https://www.google.com/maps?q=Do%C3%B1a%20Filomena%2C%20Filomena%20Valenzuela%20298%2C%20Iquique&output=embed",
    foto: "assets/img/fachada.webp",
    // horario por día (0 = domingo). [abre, cierra] "HH:MM". Después de medianoche: "25:00" = 01:00
    horario: {
      0: ["12:00", "24:00"], 1: ["12:00", "24:00"], 2: ["12:00", "24:00"], 3: ["12:00", "24:00"],
      4: ["12:00", "24:00"], 5: ["12:00", "25:00"], 6: ["12:00", "25:00"]
    },
    horarioTexto: [["Dom – Jue", "12:00 – 00:00"], ["Vie – Sáb", "12:00 – 01:00"]],
    entrega: ["delivery", "retiro"],
    notaDelivery: "Delivery GRATIS dentro de Península · Pedido mínimo $5.000",
    destacados: ["Terraza con música en vivo", "Zona infantil gratuita", "Barra y Happy Hour", "Menú ejecutivo Lun–Jue", "Delivery gratis en Península"]
  },
  zofri: {
    id: "zofri",
    corto: "Zofri",
    nombre: "Doña Filomena Zofri",
    tipo: "Cocina chilena · Pizza · Empanadas",
    direccion: "Mall Zofri, Etapa 7",
    zona: "Zona Franca, Iquique",
    whatsapp: "56953426548",
    telefono: "+56 9 5342 6548",
    instagram: "donafilomenazofri",
    maps: "https://maps.google.com/?q=Mall%20Zofri%20Etapa%207%20Iquique",
    mapsEmbed: "https://www.google.com/maps?q=Mall%20Zofri%20Etapa%207%2C%20Iquique&output=embed",
    foto: null,                          // ← falta foto del local Zofri
    horario: {
      0: null, 1: ["11:00", "19:00"], 2: ["11:00", "19:00"], 3: ["11:00", "19:00"],
      4: ["11:00", "19:00"], 5: ["11:00", "19:00"], 6: ["11:00", "19:00"]
    },
    horarioTexto: [["Lun – Sáb", "11:00 – 19:00"], ["Domingo", "Cerrado"]],
    entrega: ["retiro"],
    notaDelivery: "Pide por WhatsApp y retira sin filas en Mall Zofri",
    destacados: ["Ideal para tu día de compras", "Empanadas recién hechas", "Pizzas a la piedra", "Retiro sin filas"]
  }
};

/* Happy Hour de cócteles (Península) */
const HAPPY_HOUR = { dias: [1, 2, 3, 4], desde: "13:00", hasta: "23:00", texto: "Lun – Jue · 13:00 a 23:00" };

/* Menú ejecutivo (Península) */
const MENU_EJECUTIVO = {
  precio: 14900, dias: "Lunes a jueves", horario: "12:00 a 16:00",
  entrada: "Empanada Sin Envidia al horno a elección o consomé de ave",
  fondos: ["Plateada al jugo", "Salteado de pollo", "Fetuccini al pesto o boloñesa", "Corvinilla a la plancha o frita"],
  incluye: "Limonada tradicional o Sprite Zero mini + postre del día"
};

const AMBOS = ["peninsula", "zofri"];
const PEN = ["peninsula"];

const CATEGORIAS = [
  { id: "ejecutivo", nombre: "Menú ejecutivo",       sub: "Lunes a jueves · 12:00 a 16:00",                 en: PEN },
  { id: "fritas",    nombre: "Empanadas fritas",     sub: "Rellenas a mano y recién fritas",                en: AMBOS },
  { id: "horno",     nombre: "Empanadas de horno",   sub: "Masa dorada, receta de siempre",                 en: AMBOS },
  { id: "sinenvidia",nombre: "Las Sin Envidia",      sub: "Al horno, a precio que no da envidia",           en: AMBOS },
  { id: "pizzas",    nombre: "Pizzas",               sub: "Familiares, masa a la piedra",                   en: AMBOS },
  { id: "sandwich",  nombre: "Sándwiches",           sub: "Con porción de papas fritas",                    en: AMBOS },
  { id: "tablas",    nombre: "Tablas y picoteo",     sub: "Para compartir en la mesa",                      en: PEN },
  { id: "ceviches",  nombre: "Ceviches y entradas",  sub: "Frescos del Pacífico",                           en: PEN },
  { id: "pescados",  nombre: "Pescados",             sub: "Con una guarnición a elección",                  en: PEN },
  { id: "carnes",    nombre: "Carnes y parrilladas", sub: "Lomo vetado, a lo pobre y parrillas",            en: PEN },
  { id: "pastas",    nombre: "Pastas y risottos",    sub: "Fetuccini, risotto y lasaña",                    en: PEN },
  { id: "gredas",    nombre: "En greda",             sub: "Cocina chilena de olla y horno",                 en: PEN },
  { id: "ensaladas", nombre: "Ensaladas",            sub: "Frescas y abundantes",                           en: PEN },
  { id: "ninos",     nombre: "Menú de niños",        sub: "Solo para los más chicos",                       en: PEN },
  { id: "postres",   nombre: "Postres",              sub: "Tortas, copas y helados",                        en: AMBOS },
  { id: "cafe",      nombre: "Café y té",            sub: "Para la hora del té",                            en: AMBOS, bebida: true },
  { id: "mojitos",   nombre: "Mojitos y sours",      sub: "Los clásicos de la barra",                       en: PEN, bebida: true },
  { id: "cocteles",  nombre: "Cócteles",             sub: "De autor y clásicos",                            en: PEN, bebida: true },
  { id: "jugos",     nombre: "Jugos y bebidas",      sub: "Naturales, preparados al momento",               en: AMBOS, bebida: true },
  { id: "cervezas",  nombre: "Cervezas y schop",     sub: "Bien heladas",                                   en: PEN, bebida: true },
  { id: "jarras",    nombre: "Jarras y litros",      sub: "Para compartir · también por delivery",          en: PEN, bebida: true }
];

const MENU = [
  /* ---------- MENÚ EJECUTIVO ---------- */
  { id: "me1", cat: "ejecutivo", nm: "Menú ejecutivo", precio: 14900, tags: ["popular"], desc: "Entrada: empanada Sin Envidia o consomé · Fondo: plateada, salteado de pollo, fetuccini o corvinilla · Limonada o Sprite Zero mini · Postre del día" },

  /* ---------- EMPANADAS FRITAS ---------- */
  { id: "ef1",  cat: "fritas", nm: "Camarón Queso",        precio: 4500, tags: ["popular"], desc: "La más pedida de la casa" },
  { id: "ef6",  cat: "fritas", nm: "Ostión Pil Pil Queso", precio: 5300, tags: ["popular"] },
  { id: "ef7",  cat: "fritas", nm: "Ostión Queso",         precio: 5200 },
  { id: "ef2",  cat: "fritas", nm: "Camarón al Pil Pil",   precio: 4700 },
  { id: "ef3",  cat: "fritas", nm: "Loco Queso",           precio: 4500 },
  { id: "ef4",  cat: "fritas", nm: "Pulpo Queso",          precio: 4500 },
  { id: "ef5",  cat: "fritas", nm: "Jaiba Queso",          precio: 4200, tags: ["popular"] },
  { id: "ef9",  cat: "fritas", nm: "Ceviche Queso",        precio: 3700, desc: "Ceviche de la casa: cebolla, cilantro, rocoto y pescado" },
  { id: "ef8",  cat: "fritas", nm: "Pino de Marisco",      precio: 3400, desc: "Surtido de mariscos" },
  { id: "ef24", cat: "fritas", nm: "Tilama",               precio: 3100, tags: ["popular"], desc: "Queso de cabra, tomate y albahaca" },
  { id: "ef10", cat: "fritas", nm: "Pino Carne",           precio: 3100, desc: "Carne picada" },
  { id: "ef11", cat: "fritas", nm: "Mechada Queso",        precio: 3500 },
  { id: "ef14", cat: "fritas", nm: "Pastel de Choclo",     precio: 3500 },
  { id: "ef12", cat: "fritas", nm: "Longaniza Queso",      precio: 3300 },
  { id: "ef13", cat: "fritas", nm: "Ají de Gallina",       precio: 3300 },
  { id: "ef17", cat: "fritas", nm: "Crema Pastelera de Choclo Queso", precio: 3300 },
  { id: "ef15", cat: "fritas", nm: "Pollo Queso Champiñón", precio: 3100 },
  { id: "ef16", cat: "fritas", nm: "Carne Champiñón Queso", precio: 3100 },
  { id: "ef23", cat: "fritas", nm: "Pizza",                precio: 2900, desc: "Jamón, queso, tomate y aceitunas de Azapa" },
  { id: "ef22", cat: "fritas", nm: "Aceituna Queso",       precio: 2800 },
  { id: "ef21", cat: "fritas", nm: "Jamón Queso",          precio: 2700 },
  { id: "ef18", cat: "fritas", nm: "Queso",                precio: 2600 },
  { id: "ef19", cat: "fritas", nm: "Champiñón Queso",      precio: 2600 },
  { id: "ef20", cat: "fritas", nm: "Choclo Crema Queso",   precio: 2600 },

  /* ---------- EMPANADAS DE HORNO ---------- */
  { id: "eh1", cat: "horno", nm: "Pino Carne al Horno",       precio: 3800, tags: ["popular"], img: "assets/img/platos/empanadas-horno.webp", desc: "Carne picada, la tradicional chilena" },
  { id: "eh9", cat: "horno", nm: "Camarón al Pil Pil",        precio: 4700 },
  { id: "eh2", cat: "horno", nm: "Mechada Queso",             precio: 3800 },
  { id: "eh3", cat: "horno", nm: "Pollo Queso",               precio: 3800 },
  { id: "eh4", cat: "horno", nm: "Pollo Queso Champiñón",     precio: 3800 },
  { id: "eh5", cat: "horno", nm: "Pastel de Choclo",          precio: 3800 },
  { id: "eh6", cat: "horno", nm: "Ají de Gallina",            precio: 3800 },
  { id: "eh7", cat: "horno", nm: "Crema Pastelera de Choclo Queso", precio: 3800 },
  { id: "eh8", cat: "horno", nm: "Queso",                     precio: 3300 },

  /* ---------- LAS SIN ENVIDIA ---------- */
  { id: "se0", cat: "sinenvidia", nm: "Pack Sin Envidia · 6 unidades", precio: 11000, tags: ["popular", "economica"], img: "assets/img/empanadas.webp", desc: "Mechada queso, ají de gallina, pastel de choclo, pollo queso, pino y queso" },
  { id: "se1", cat: "sinenvidia", nm: "Sin Envidia Pino Carne",       precio: 2000, tags: ["economica"] },
  { id: "se2", cat: "sinenvidia", nm: "Sin Envidia Mechada Queso",    precio: 2000, tags: ["economica"] },
  { id: "se3", cat: "sinenvidia", nm: "Sin Envidia Ají de Gallina",   precio: 2000, tags: ["economica"] },
  { id: "se4", cat: "sinenvidia", nm: "Sin Envidia Pastel de Choclo", precio: 2000, tags: ["economica"] },
  { id: "se5", cat: "sinenvidia", nm: "Sin Envidia Pollo Queso",      precio: 2000, tags: ["economica"] },
  { id: "se6", cat: "sinenvidia", nm: "Sin Envidia Queso",            precio: 2000, tags: ["economica"] },

  /* ---------- PIZZAS (familiares) ---------- */
  { id: "pz1",  cat: "pizzas", nm: "Cavanchina",      precio: 19900, tags: ["popular"], desc: "Tomate, camarón, parmesano, rúcula y orégano" },
  { id: "pz2",  cat: "pizzas", nm: "Azapa",           precio: 19900, tags: ["popular"], img: "assets/img/pizza.webp", desc: "Tomate, aceitunas de Azapa, queso de cabra, albahaca y orégano" },
  { id: "pz3",  cat: "pizzas", nm: "Doña Filomena",   precio: 18900, desc: "Carne, mozzarella, pepinillo, choclo y orégano" },
  { id: "pz4",  cat: "pizzas", nm: "La Ola",          precio: 20900, desc: "Camarón, pulpo, cebolla salteada y orégano" },
  { id: "pz5",  cat: "pizzas", nm: "Caleta de Queso", precio: 20900, desc: "Mantecoso, queso de cabra, mozzarella, parmesano y orégano" },
  { id: "pz6",  cat: "pizzas", nm: "Del Norte",       precio: 19900, desc: "Chorizo español, tocino, carne, aceitunas de Azapa y orégano" },
  { id: "pz7",  cat: "pizzas", nm: "Paibizavay",      precio: 19900, desc: "Champiñones, morrón rojo, salame ahumado, palta y orégano" },
  { id: "pz8",  cat: "pizzas", nm: "Huayquique",      precio: 18900, desc: "Tomate, pollo grillé, jamón cocido, piña y orégano" },
  { id: "pz9",  cat: "pizzas", nm: "Mediterránea",    precio: 18900, desc: "Alcachofa, tomate, aceituna negra y jamón serrano" },
  { id: "pz10", cat: "pizzas", nm: "Americana",       precio: 18900, desc: "Carne, jamón cocido, cuatro huevos fritos y orégano" },
  { id: "pz11", cat: "pizzas", nm: "Matilla",         precio: 18900, desc: "Queso mantecoso, pepperoni, aceitunas de Azapa y orégano" },
  { id: "pz12", cat: "pizzas", nm: "De la Península", precio: 18900, desc: "Rúcula, tomate deshidratado, jamón serrano y orégano" },
  { id: "pz13", cat: "pizzas", nm: "Pampina",         precio: 18900, desc: "Carne, cebollín, morrón rojo, ají verde y orégano" },
  { id: "pz14", cat: "pizzas", nm: "Veronas",         precio: 18900, desc: "Queso de cabra, cebolla caramelizada, rúcula y tomate deshidratado" },
  { id: "pz15", cat: "pizzas", nm: "Napolitana",      precio: 18900, desc: "Tomate, queso, jamón cocido y aceituna" },
  { id: "pz16", cat: "pizzas", nm: "Vegetariana",     precio: 18000, desc: "Tomate deshidratado, champiñón, palta, quinoa y orégano" },
  { id: "pz17", cat: "pizzas", nm: "Arma tu pizza",   precio: 11000, desc: "Base familiar: salsa de tomate, mantecoso y orégano. Agrega ingredientes al confirmar (desde $2.100 c/u)" },

  /* ---------- SÁNDWICHES ---------- */
  { id: "sw1",  cat: "sandwich", nm: "Hamburguesa Doña Filomena", precio: 9900, desc: "Casera, rellena de queso, lechuga, tomate, palta y pepinillo" },
  { id: "sw2",  cat: "sandwich", nm: "Hamburguesa Esmeralda",     precio: 9900, desc: "Casera rellena de queso, tomate y aros de cebolla crispy" },
  { id: "sw3",  cat: "sandwich", nm: "Hamburguesa Vegetariana",   precio: 9900, desc: "De legumbres o quinoa, lechuga, tomate, palta y pepinillo" },
  { id: "sw4",  cat: "sandwich", nm: "Salmón de la Península",    precio: 9900, desc: "Salmón a la plancha, pepinillo dill y cebolla morada" },
  { id: "sw5",  cat: "sandwich", nm: "Reina Albacora",            precio: 9900, desc: "Albacora a la plancha, cebolla morada, aceitunas de Azapa y albahaca" },
  { id: "sw6",  cat: "sandwich", nm: "Kikiriki",                  precio: 9500, desc: "Pollo grillé, lechuga, tomate, albahaca y mayonesa" },
  { id: "sw7",  cat: "sandwich", nm: "Crispy",                    precio: 9500, desc: "Pollo apanado, queso fundido, cebolla morada, tomate y lechuga" },
  { id: "sw8",  cat: "sandwich", nm: "Choapa",                    precio: 9200, desc: "Queso de cabra fundido, tomate, albahaca y aceitunas de Azapa" },
  { id: "sw9",  cat: "sandwich", nm: "Americano",                 precio: 9200, desc: "Carne de res, jamón, queso fundido y huevo frito" },
  { id: "sw10", cat: "sandwich", nm: "Italiano",                  precio: 9000, desc: "Carne de res, tomate, palta y mayonesa" },
  { id: "sw11", cat: "sandwich", nm: "Chacarero",                 precio: 9000, desc: "Carne de res, tomate, porotos verdes y ají verde" },
  { id: "sw12", cat: "sandwich", nm: "Mechada Queso",             precio: 8900 },
  { id: "sw13", cat: "sandwich", nm: "Barros Luco",               precio: 8800, desc: "Carne de res y queso fundido" },
  { id: "sw14", cat: "sandwich", nm: "Cavanchino",                precio: 8200, desc: "Lechuga, tomate, atún, cebolla morada y mayonesa" },

  /* ---------- TABLAS ---------- */
  { id: "tb1", cat: "tablas", nm: "Jardín del Mar",        precio: 42000, tags: ["popular"], img: "assets/img/platos/jardin-del-mar.webp", desc: "Tabla caliente: calamar a la romana, perlán de pescado, ceviche y más" },
  { id: "tb2", cat: "tablas", nm: "Tabla Tres Carnes",     precio: 34000, img: "assets/img/platos/tabla-tres-carnes.webp", desc: "Carne salteada, pollo apanado y pescado" },
  { id: "tb3", cat: "tablas", nm: "Chicharrón de Marisco", precio: 34000, desc: "Calamar, camarones, pulpo, pescado, perlán y salmón" },
  { id: "tb4", cat: "tablas", nm: "Trilogía de Ceviches",  precio: 33000, desc: "Elige tus tres ceviches favoritos" },
  { id: "tb5", cat: "tablas", nm: "Chorrillana para 4",    precio: 34000, desc: "Papas fritas, carne, pollo, chorizo, cebolla y pimentón" },
  { id: "tb6", cat: "tablas", nm: "Chorrillana para 2",    precio: 25200 },
  { id: "tb7", cat: "tablas", nm: "Cheese Fries The Ocean", precio: 18000, desc: "Papas, queso y salsa de camarones y calamar" },
  { id: "tb8", cat: "tablas", nm: "Cheese Fries Mixto",    precio: 16000, desc: "Queso fundido, carne y pollo" },
  { id: "tb9", cat: "tablas", nm: "Cheese Fries",          precio: 12000, desc: "Queso fundido y tocino crocante" },
  { id: "tb10", cat: "tablas", nm: "Perlán de Pescado",    precio: 11000, desc: "Pescado apanado y salsa de la casa" },
  { id: "tb11", cat: "tablas", nm: "Nuggets de Pollo",     precio: 11000 },
  { id: "tb12", cat: "tablas", nm: "Rabas",                precio: 9990, desc: "Perlán de calamar" },
  { id: "tb13", cat: "tablas", nm: "Porción de papas fritas", precio: 5200 },

  /* ---------- CEVICHES Y ENTRADAS ---------- */
  { id: "cv1",  cat: "ceviches", nm: "Ceviche Doña Filo",    precio: 15900, tags: ["popular"] },
  { id: "cv2",  cat: "ceviches", nm: "Ceviche Peruano",      precio: 17900 },
  { id: "cv3",  cat: "ceviches", nm: "Ceviche Puerto Perú",  precio: 16900 },
  { id: "cv4",  cat: "ceviches", nm: "Ceviche de Pica",      precio: 15900 },
  { id: "cv5",  cat: "ceviches", nm: "Ceviche Costanera",    precio: 16900, desc: "Pulpo, camarón, apio, queso de cabra, cebolla morada y cilantro" },
  { id: "cv6",  cat: "ceviches", nm: "Ceviche Pichidangui",  precio: 16900, desc: "Salmón, apio, palta, cebolla morada y cilantro" },
  { id: "cv7",  cat: "ceviches", nm: "Ceviche a la Parrilla", precio: 16900 },
  { id: "cv8",  cat: "ceviches", nm: "Ceviche a lo Rico",    precio: 16900 },
  { id: "cv9",  cat: "ceviches", nm: "Carpaccio de Salmón",  precio: 17000, desc: "En limoneta, alcaparras y parmesano" },
  { id: "cv10", cat: "ceviches", nm: "Carpaccio de Pulpo",   precio: 17000, desc: "En limoneta, alcaparras y parmesano" },
  { id: "cv11", cat: "ceviches", nm: "Camarones Apanados",   precio: 17900 },
  { id: "cv12", cat: "ceviches", nm: "Camarones Parmesano, Pil Pil o al Ajillo", precio: 16900 },
  { id: "cv13", cat: "ceviches", nm: "Pulpo al Olivo",       precio: 16900 },
  { id: "cv14", cat: "ceviches", nm: "Pejerrey al dedo o en salsa verde", precio: 14000, desc: "Con pan de ajo" },

  /* ---------- PESCADOS ---------- */
  { id: "p5",  cat: "pescados", nm: "Corvina de la Casa",           precio: 20000, desc: "A la plancha con papa rosti y tocino" },
  { id: "p2",  cat: "pescados", nm: "Reineta de la Casa",           precio: 19000, desc: "A la plancha con papa rosti y tocino" },
  { id: "p7",  cat: "pescados", nm: "Corvinilla de la Casa",        precio: 16900, desc: "A la plancha con papa rosti y tocino" },
  { id: "p14", cat: "pescados", nm: "Papillote",                    precio: 20000, desc: "Al vapor: dorado, reineta, corvinilla o salmón" },
  { id: "p15", cat: "pescados", nm: "Dorado Mandíbula",             precio: 19000, desc: "Apanado, relleno de jamón y queso" },
  { id: "p10", cat: "pescados", nm: "Dorado frito o a la plancha",  precio: 20000 },
  { id: "p4",  cat: "pescados", nm: "Corvina frita o a la plancha", precio: 19000 },
  { id: "p8",  cat: "pescados", nm: "Medallón de Congrio",          precio: 19500 },
  { id: "p9",  cat: "pescados", nm: "Albacora frita o a la plancha", precio: 19500 },
  { id: "p3",  cat: "pescados", nm: "Salmón a la plancha",          precio: 19000 },
  { id: "p1",  cat: "pescados", nm: "Reineta frita o a la plancha", precio: 18500 },
  { id: "p6",  cat: "pescados", nm: "Corvinilla frita o a la plancha", precio: 16000 },
  { id: "p11", cat: "pescados", nm: "Pejerrey frito",               precio: 16000, desc: "Rebozado en batido de la casa" },
  { id: "p12", cat: "pescados", nm: "Pescado a lo Pobre",           precio: 22000 },
  { id: "p13", cat: "pescados", nm: "Perlán de Reineta",            precio: 14500 },

  /* ---------- CARNES Y PARRILLADAS ---------- */
  { id: "cr1",  cat: "carnes", nm: "Filete Doña Filomena",    precio: 19900, tags: ["popular"], desc: "Filete de res sobre reducción de vino tinto" },
  { id: "cr2",  cat: "carnes", nm: "Lomo Tilama",             precio: 19000, desc: "Lomo vetado con queso de cabra fundido y champiñones" },
  { id: "cr3",  cat: "carnes", nm: "Lomo Vetado a lo Pobre",  precio: 22000 },
  { id: "cr4",  cat: "carnes", nm: "Lomo Vetado con Fetuccini", precio: 25000 },
  { id: "cr5",  cat: "carnes", nm: "Lomo Salteado",           precio: 20000 },
  { id: "cr6",  cat: "carnes", nm: "Lomo con Papas Boulangère", precio: 19000 },
  { id: "cr7",  cat: "carnes", nm: "Lomo Vetado a lo Rico",   precio: 18000, desc: "Con tocino ahumado y hojas verdes" },
  { id: "cr8",  cat: "carnes", nm: "Lomo Vetado",             precio: 16900, desc: "Con guarnición a elección" },
  { id: "cr9",  cat: "carnes", nm: "Pollo a lo Pobre",        precio: 20000 },
  { id: "cr10", cat: "carnes", nm: "Plateada al Jugo",        precio: 16000, desc: "Clásico chileno a la olla" },
  { id: "cr11", cat: "carnes", nm: "Salteado de Carne",       precio: 16900 },
  { id: "cr12", cat: "carnes", nm: "Salteado de Pollo",       precio: 15900 },
  { id: "cr13", cat: "carnes", nm: "Pollo Grillé",            precio: 16000 },
  { id: "cr14", cat: "carnes", nm: "Escalopa Kayser",         precio: 18000, desc: "Res o pollo, relleno de queso y jamón" },
  { id: "cr15", cat: "carnes", nm: "Milanesa de carne o pollo", precio: 17000 },
  { id: "cr16", cat: "carnes", nm: "Chuleta de cerdo en salsa de champiñones", precio: 16900 },
  { id: "cr17", cat: "carnes", nm: "Parrillada para 2",       precio: 54900 },
  { id: "cr18", cat: "carnes", nm: "Parrillada para 3",       precio: 65900 },
  { id: "cr19", cat: "carnes", nm: "Parrillada para 4",       precio: 82500 },
  { id: "cr20", cat: "carnes", nm: "Parrillada Premium para 4", precio: 88000 },

  /* ---------- PASTAS Y RISOTTOS ---------- */
  { id: "pa1",  cat: "pastas", nm: "Pulpo Teriyaki con Risotto picante", precio: 22500, tags: ["popular"], img: "assets/img/platos/pulpo-teriyaki.webp" },
  { id: "pa2",  cat: "pastas", nm: "Pulpo a la Parrilla",     precio: 18500, img: "assets/img/platos/pulpo-parrilla.webp", desc: "En chimichurri de finas hierbas, con papas doradas" },
  { id: "pa3",  cat: "pastas", nm: "Lasaña",                  precio: 17500, img: "assets/img/platos/lasana.webp", desc: "Vegetariana o boloñesa" },
  { id: "pa4",  cat: "pastas", nm: "Fetuccini Especial",      precio: 20000, desc: "Camarón, salmón y calamar" },
  { id: "pa5",  cat: "pastas", nm: "Risotto Especial",        precio: 20000, desc: "Camarón, salmón y calamar" },
  { id: "pa6",  cat: "pastas", nm: "Risotto Mixto",           precio: 18000, desc: "Dos ingredientes a elección" },
  { id: "pa7",  cat: "pastas", nm: "Risotto de Pollo",        precio: 17000 },
  { id: "pa8",  cat: "pastas", nm: "Fetuccini Margarita",     precio: 16000, desc: "Salsa blanca y surtido de mariscos" },
  { id: "pa9",  cat: "pastas", nm: "Risotto Margarita",       precio: 16000, desc: "Surtido de mariscos" },
  { id: "pa10", cat: "pastas", nm: "Risotto Champiñón Queso", precio: 16000 },
  { id: "pa11", cat: "pastas", nm: "Fetuccini a elección",    precio: 15500, desc: "Boloñesa, pesto, alfredo, verduras o huancaína" },
  { id: "pa12", cat: "pastas", nm: "Bajo en Calorías",        precio: 18000, desc: "Pollo o corvinilla a la plancha con ensalada y arroz" },

  /* ---------- EN GREDA ---------- */
  { id: "gr1",  cat: "gredas", nm: "Pastel de Choclo",   precio: 13000, tags: ["popular"] },
  { id: "gr2",  cat: "gredas", nm: "Pastel de Jaiba",    precio: 15000 },
  { id: "gr3",  cat: "gredas", nm: "Pastel de Papas",    precio: 15500, img: "assets/img/platos/pastel-de-papas.webp" },
  { id: "gr4",  cat: "gredas", nm: "Caldillo de Congrio", precio: 15000 },
  { id: "gr5",  cat: "gredas", nm: "Paila Marina",       precio: 14000 },
  { id: "gr6",  cat: "gredas", nm: "Chupe de Pulpo",     precio: 16000 },
  { id: "gr7",  cat: "gredas", nm: "Picante de Pulpo",   precio: 16000 },
  { id: "gr8",  cat: "gredas", nm: "Chupe de marisco o camarón",   precio: 15000 },
  { id: "gr9",  cat: "gredas", nm: "Picante de marisco o camarón", precio: 15500 },
  { id: "gr10", cat: "gredas", nm: "Consomé de Ave",     precio: 6600 },

  /* ---------- ENSALADAS ---------- */
  { id: "en1", cat: "ensaladas", nm: "Ensalada Marinera",  precio: 13000, img: "assets/img/platos/ensalada-marinera.webp", desc: "Salmón marinado, camarones, espinaca, palta y aceitunas" },
  { id: "en2", cat: "ensaladas", nm: "Alianza",            precio: 12000, img: "assets/img/platos/ensalada-alianza.webp", desc: "Timbal de quinoa con palta y camarones salteados" },
  { id: "en3", cat: "ensaladas", nm: "Del Huerto",         precio: 11000, tags: ["popular"], img: "assets/img/platos/ensalada-del-huerto.webp", desc: "Lechuga, palta, tomate, palmito, queso de cabra, champiñón y albahaca" },
  { id: "en4", cat: "ensaladas", nm: "Roquefort",          precio: 11000, desc: "Palta, roquefort, pollo grillé, tomate y aceitunas" },
  { id: "en5", cat: "ensaladas", nm: "César Valenzuela",   precio: 10000, desc: "Salsa césar, pollo grillé, crutones y parmesano" },
  { id: "en6", cat: "ensaladas", nm: "Palo Buque",         precio: 10000, desc: "Atún, rúcula, palta, nueces y champiñón" },
  { id: "en7", cat: "ensaladas", nm: "Corazón Los Vilos",  precio: 10000, desc: "Tomate, queso de cabra, albahaca y aceitunas de Azapa" },
  { id: "en8", cat: "ensaladas", nm: "Ensalada Surtida",   precio: 8000 },

  /* ---------- NIÑOS ---------- */
  { id: "ni1", cat: "ninos", nm: "Seis Nuggets",          precio: 6900, desc: "Con arroz o papas fritas" },
  { id: "ni2", cat: "ninos", nm: "Dos Brochetas",         precio: 6900, desc: "Pollo y vienesa con arroz o papas fritas" },
  { id: "ni3", cat: "ninos", nm: "Fetuccini con salsa",   precio: 6900, desc: "Alfredo, boloñesa o pesto" },
  { id: "ni4", cat: "ninos", nm: "Hamburguesa de niños",  precio: 6900, desc: "Con papas fritas" },

  /* ---------- POSTRES ---------- */
  { id: "po1",  cat: "postres", nm: "Copa Tres Leches",      precio: 4900, tags: ["popular"], img: "assets/img/platos/tres-leches.webp" },
  { id: "po2",  cat: "postres", nm: "Copa Tiramisú",         precio: 4900, img: "assets/img/platos/tiramisu.webp" },
  { id: "po3",  cat: "postres", nm: "Porción Torta Amor",    precio: 4900 },
  { id: "po4",  cat: "postres", nm: "Panqueque Celestino",   precio: 4900, desc: "Relleno de manjar, con una bola de helado" },
  { id: "po5",  cat: "postres", nm: "Brownie con Helado",    precio: 4900 },
  { id: "po6",  cat: "postres", nm: "Café Helado",           precio: 4900, img: "assets/img/platos/cafe-helado.webp" },
  { id: "po7",  cat: "postres", nm: "Chocolate Helado",      precio: 4900 },
  { id: "po8",  cat: "postres", nm: "Copa de Helado",        precio: 4700, desc: "Tres sabores con salsa de chocolate" },
  { id: "po9",  cat: "postres", nm: "Cheesecake Frutos Rojos", precio: 4500 },
  { id: "po10", cat: "postres", nm: "Pie de Limón",          precio: 4500 },
  { id: "po11", cat: "postres", nm: "Pote Torta Tres Leches", precio: 3900, desc: "Para llevar" },
  { id: "po12", cat: "postres", nm: "Pote de Tiramisú",      precio: 3900, desc: "Para llevar" },

  /* ---------- CAFÉ Y TÉ ---------- */
  { id: "cf1", cat: "cafe", nm: "Cortado grande",     precio: 3600, desc: "Café de grano" },
  { id: "cf2", cat: "cafe", nm: "Café americano",     precio: 3300, desc: "Café de grano" },
  { id: "cf3", cat: "cafe", nm: "Espresso",           precio: 3300, desc: "Café de grano" },
  { id: "cf4", cat: "cafe", nm: "Capuccino",          precio: 3000 },
  { id: "cf5", cat: "cafe", nm: "Latte",              precio: 3000 },
  { id: "cf6", cat: "cafe", nm: "Mokaccino",          precio: 3000 },
  { id: "cf7", cat: "cafe", nm: "Chocolate caliente", precio: 3800 },
  { id: "cf8", cat: "cafe", nm: "Té de hoja o de hierbas", precio: 2900 },

  /* ---------- MOJITOS Y SOURS ---------- */
  { id: "mj1",  cat: "mojitos", nm: "Royal Filomena",        precio: 9000, tags: ["popular"], desc: "El mojito de la casa" },
  { id: "mj2",  cat: "mojitos", nm: "Mojito de Sabores",     precio: 8000, tags: ["popular"], desc: "Mango, maracuyá, frutos rojos o manzana jengibre" },
  { id: "mj3",  cat: "mojitos", nm: "Mojito Cubano",         precio: 8000, desc: "Havana Club, limón macerado, hierba buena y azúcar flor" },
  { id: "mj4",  cat: "mojitos", nm: "Mojito Cerveza",        precio: 11000, desc: "Con Coronita" },
  { id: "mj5",  cat: "mojitos", nm: "Mojito Espumante",      precio: 11000 },
  { id: "mj6",  cat: "mojitos", nm: "Mojito Jäger",          precio: 9000 },
  { id: "mj7",  cat: "mojitos", nm: "Mojito Honey",          precio: 9000 },
  { id: "mj8",  cat: "mojitos", nm: "Mojito Irlandés",       precio: 9000 },
  { id: "mj9",  cat: "mojitos", nm: "Mojito Vodka",          precio: 8000 },
  { id: "so1",  cat: "mojitos", nm: "Sour de la Casa",       precio: 7000, tags: ["popular"], desc: "Pisco macerado en granadina, toque de maracuyá y hierba buena" },
  { id: "so2",  cat: "mojitos", nm: "Catedral de la Casa",   precio: 12500 },
  { id: "so3",  cat: "mojitos", nm: "Catedral Macerado",     precio: 12500, desc: "Quebranta, hoja de coca y jengibre" },
  { id: "so4",  cat: "mojitos", nm: "Pisco Sour Macerado",   precio: 8000, desc: "Quebranta, consulta sabores" },
  { id: "so5",  cat: "mojitos", nm: "Mango Sour",            precio: 6500 },
  { id: "so6",  cat: "mojitos", nm: "Maracuyá Sour",         precio: 6500 },
  { id: "so7",  cat: "mojitos", nm: "Pisco Sour Peruano (Barsol)", precio: 6500 },
  { id: "so8",  cat: "mojitos", nm: "Pisco Sour Nacional",   precio: 5500 },
  { id: "so9",  cat: "mojitos", nm: "Whisky Sour Jack Daniel's", precio: 7500 },
  { id: "so10", cat: "mojitos", nm: "Amaretto Sour",         precio: 5500 },

  /* ---------- CÓCTELES ---------- */
  { id: "ct1",  cat: "cocteles", nm: "Filomena Pasión",   precio: 10000, tags: ["autor", "popular"], img: "assets/img/platos/filomena-pasion.webp", desc: "Mal Paso, Malibú, licor de melón, maracuyá y limón" },
  { id: "ct2",  cat: "cocteles", nm: "Romeo",             precio: 7000,  tags: ["autor"], img: "assets/img/platos/romeo.webp", desc: "Blue rasp, curaçao, licor de saúco, limón y el secreto de la casa" },
  { id: "ct3",  cat: "cocteles", nm: "Tinto Cavancha",    precio: 7500,  tags: ["autor"], img: "assets/img/platos/tinto-cavancha.webp", desc: "Vino tinto, vodka, Sprite, limón y frutos dulces" },
  { id: "ct4",  cat: "cocteles", nm: "El Santo",          precio: 8500,  tags: ["autor"], desc: "Absolut Pears, pepino, maracuyá y St. Germain" },
  { id: "ct5",  cat: "cocteles", nm: "Macerado Maíz Morado", precio: 8500, img: "assets/img/platos/macerado-maiz-morado.webp" },
  { id: "ct6",  cat: "cocteles", nm: "Marilyn Monroe",    precio: 9500,  img: "assets/img/platos/marilyn-monroe.webp", desc: "Vodka, piña o frutilla, leche condensada y crema de coco" },
  { id: "ct7",  cat: "cocteles", nm: "Piña Colada",       precio: 8000,  img: "assets/img/platos/pina-colada.webp" },
  { id: "ct8",  cat: "cocteles", nm: "Ramazzotti Spritz", precio: 7500,  img: "assets/img/platos/ramazzotti.webp" },
  { id: "ct9",  cat: "cocteles", nm: "Pantera Rosa",      precio: 7000,  img: "assets/img/platos/pantera-rosa.webp", desc: "Crema, vodka, piña y granadina" },
  { id: "ct10", cat: "cocteles", nm: "Bloody Mary",       precio: 7000,  img: "assets/img/platos/bloody-mary.webp" },
  { id: "ct11", cat: "cocteles", nm: "Margarita Frozen",  precio: 7000,  img: "assets/img/platos/margarita-frozen.webp" },
  { id: "ct12", cat: "cocteles", nm: "Espresso Martini",  precio: 5500,  img: "assets/img/platos/espresso-martini.webp" },
  { id: "ct13", cat: "cocteles", nm: "Aperol Spritz",     precio: 6500 },
  { id: "ct14", cat: "cocteles", nm: "Caipiriña de sabores", precio: 7500 },
  { id: "ct15", cat: "cocteles", nm: "Negroni",           precio: 7500 },
  { id: "ct16", cat: "cocteles", nm: "Mai Tai",           precio: 7000 },
  { id: "ct17", cat: "cocteles", nm: "Tequila Margarita", precio: 6500 },
  { id: "ct18", cat: "cocteles", nm: "Daiquiri de sabores", precio: 6000 },

  /* ---------- JUGOS Y BEBIDAS ---------- */
  { id: "b1",  cat: "jugos", nm: "Jugo natural Mango o Maracuyá", precio: 4200, tags: ["popular"], img: "assets/img/jugo.webp" },
  { id: "b2",  cat: "jugos", nm: "Jugo natural",                precio: 4000, desc: "Melón, sandía o frutilla" },
  { id: "b12", cat: "jugos", nm: "Chicha Morada",               precio: 4000, img: "assets/img/platos/chicha-morada.webp", desc: "Maíz morado, manzana verde, piña y anís estrellado" },
  { id: "b13", cat: "jugos", nm: "Rejugo Tres Marías",          precio: 4200, desc: "Manzana, mango y maracuyá" },
  { id: "b14", cat: "jugos", nm: "Rejugo San Luis",             precio: 4200, desc: "Pepino, limón y menta" },
  { id: "b15", cat: "jugos", nm: "Rejugo Zuko",                 precio: 4200, desc: "Piña, frutilla, jengibre y limón" },
  { id: "b16", cat: "jugos", nm: "Rejugo Colibrí",              precio: 4200, desc: "Naranja, helado de vainilla y granadina" },
  { id: "b3",  cat: "jugos", nm: "Jugo con leche o mixto",      precio: 4400 },
  { id: "b4",  cat: "jugos", nm: "Limonada tradicional",        precio: 4000 },
  { id: "b5",  cat: "jugos", nm: "Limonada menta jengibre",     precio: 4200 },
  { id: "b7",  cat: "jugos", nm: "Blue Frozen",                 precio: 4200, img: "assets/img/platos/blue-frozen.webp", desc: "Frappé, limón, curaçao y hierba buena (sin alcohol)" },
  { id: "b6",  cat: "jugos", nm: "Pink Frozen",                 precio: 4200, desc: "Frappé, limón y granadina (sin alcohol)" },
  { id: "b8",  cat: "jugos", nm: "Bebida 350 cc",               precio: 2900, desc: "Coca-Cola, Zero, Fanta, Sprite, Ginger Ale, Bilz, Pap o Pepsi" },
  { id: "b9",  cat: "jugos", nm: "Agua mineral 600 cc",         precio: 2900, desc: "Con o sin gas" },
  { id: "b11", cat: "jugos", nm: "Red Bull",                    precio: 2800, desc: "Normal, sandía o yellow" },

  /* ---------- CERVEZAS Y SCHOP ---------- */
  { id: "c11", cat: "cervezas", nm: "Promo 3×2 Schop 500 cc",       precio: 11000, tags: ["popular"], desc: "Stella o Budweiser · lunes a jueves" },
  { id: "c12", cat: "cervezas", nm: "Schop Calafate XL 1000 cc",    precio: 13000 },
  { id: "c13", cat: "cervezas", nm: "Schop Torobayo XL 1000 cc",    precio: 13000 },
  { id: "c14", cat: "cervezas", nm: "Schop Budweiser XL 1000 cc",   precio: 11000 },
  { id: "c15", cat: "cervezas", nm: "Schop Torobayo 500 cc",        precio: 6500 },
  { id: "c16", cat: "cervezas", nm: "Schop Calafate 500 cc",        precio: 6500 },
  { id: "c17", cat: "cervezas", nm: "Schop Stella o Budweiser 500 cc", precio: 5500 },
  { id: "c2",  cat: "cervezas", nm: "Kunstmann Gran Torobayo 500 cc", precio: 6000 },
  { id: "c3",  cat: "cervezas", nm: "Kunstmann Torobayo o Lager 330 cc", precio: 4000 },
  { id: "c1",  cat: "cervezas", nm: "Austral Calafate 330 cc",       precio: 3800 },
  { id: "c5",  cat: "cervezas", nm: "Corona o Sol 330 cc",           precio: 3800 },
  { id: "c7",  cat: "cervezas", nm: "Cerveza sin alcohol 330 cc",    precio: 3800, desc: "Kunstmann o Corona 0,0" },
  { id: "c10", cat: "cervezas", nm: "Vaso michelado",                precio: 1500 },
  { id: "c9",  cat: "cervezas", nm: "Vaso chelado",                  precio: 1300 },

  /* ---------- JARRAS Y LITROS ---------- */
  { id: "j10", cat: "jarras", nm: "Jarra Mojito de sabores 1,5 L", precio: 30000, tags: ["popular"] },
  { id: "j11", cat: "jarras", nm: "Jarra Pisco Sour 1,5 L",      precio: 30000 },
  { id: "j7",  cat: "jarras", nm: "Jarra Sangría 1,5 L",         precio: 18000, desc: "Naranja, limón, canela, vino tinto, coñac y fruta" },
  { id: "j8",  cat: "jarras", nm: "Jarra Borgoña 1,5 L",         precio: 18000 },
  { id: "j9",  cat: "jarras", nm: "Jarra Verano de Maracuyá 1,5 L", precio: 17000, desc: "Vino blanco, maracuyá, hierba buena y limón" },
  { id: "j2",  cat: "jarras", nm: "Jarra Mango de Pica 1,5 L",   precio: 17000 },
  { id: "j1",  cat: "jarras", nm: "Jarra jugo natural 1,5 L",    precio: 16500, img: "assets/img/platos/jarra-jugo.webp", desc: "Maracuyá, frutilla, piña, sandía o melón" },
  { id: "j12", cat: "jarras", nm: "Jarra Tres Marías 1,5 L",     precio: 16500 },
  { id: "j3",  cat: "jarras", nm: "Jarra limonada menta jengibre 1,5 L", precio: 16000, img: "assets/img/platos/jarra-limonada.webp" },
  { id: "j13", cat: "jarras", nm: "Jarra limonada tradicional 1,5 L", precio: 15500 },
  { id: "j4",  cat: "jarras", nm: "Mojito 1 L (delivery)",       precio: 25000, img: "assets/img/platos/mojito-litro.webp" },
  { id: "j5",  cat: "jarras", nm: "Sour Peruano 1 L (delivery)", precio: 24500, img: "assets/img/platos/sour-litro.webp", desc: "Barsol, limón y amargo de angostura" },
  { id: "j6",  cat: "jarras", nm: "Sour Nacional 1 L (delivery)", precio: 21000 },
  { id: "j14", cat: "jarras", nm: "Jugo natural 1 L (delivery)", precio: 16000, img: "assets/img/platos/jugo-litro.webp", desc: "Mango o maracuyá $17.000 · otros sabores $16.000" }
];

/* Sugerencias del carrito cuando no hay bebida */
const SUGERENCIAS = ["b1", "b4", "b8"];

/* Reseñas: txt = texto; titulo = título de la reseña en TripAdvisor */
const RESENAS = [
  { titulo: "Best Empanadas", autor: "Viajero", fuente: "TripAdvisor", url: "https://www.tripadvisor.com/ShowUserReviews-g297397-d2706046-r490748184-Dona_Filomena-Iquique_Tarapaca_Region.html" },
  { txt: "Lejos el mejor de Iquique en mariscos y pescados. Las empanadas de ostión queso y jaiba queso son exquisitas.", autor: "Visitante verificado", fuente: "Foursquare" },
  { titulo: "Excelente en horario de tomar once", autor: "Viajero", fuente: "TripAdvisor", url: "https://www.tripadvisor.com.ar/ShowUserReviews-g297397-d2706046-r450510865-Dona_Filomena-Iquique_Tarapaca_Region.html" },
  { txt: "El mojito de maracuyá es el mejor que he tomado en Iquique, ¡por lejos! La empanada Tilama, mi favorita. 100% recomendable.", autor: "Cliente frecuente", fuente: "Foursquare" },
  { titulo: "Excelente carta y servicio", autor: "Viajero", fuente: "TripAdvisor", url: "https://www.tripadvisor.es/ShowUserReviews-g297397-d2706046-r376383647-Dona_Filomena-Iquique_Tarapaca_Region.html" },
  { txt: "Pizza Cavanchina exquisita, muy buen mango sour y jugo de guayaba. Ambiente acogedor.", autor: "Visitante verificado", fuente: "Foursquare" },
  { titulo: "Empanada Tilama y jugos naturales", autor: "Viajero", fuente: "TripAdvisor", url: "https://www.tripadvisor.com/ShowUserReviews-g297397-d2706046-r149364995-Dona_Filomena-Iquique_Tarapaca_Region.html" },
  { txt: "¡Espectacular! La atención, la calidad, el ambiente. Un buen recuerdo de nuestras vacaciones en familia.", autor: "Familia en vacaciones", fuente: "Foursquare" },
  { titulo: "¡Muy buen restaurant!", autor: "Viajero", fuente: "TripAdvisor", url: "https://www.tripadvisor.com.pe/ShowUserReviews-g297397-d2706046-r250636450-Dona_Filomena-Iquique_Tarapaca_Region.html" },
  { txt: "Empanaditas de queso ostión, queso jaiba y queso pulpo realmente ricas y a buen precio. ¡Genial para el que le gusta la buena mesa!", autor: "Amante de los mariscos", fuente: "Foursquare" }
];

/* Publicaciones de Instagram (imagen + enlace).
   Para enlazar un post específico, reemplaza url por el link del post. */
const IG = "https://www.instagram.com/donafilomenarestaurant/";
const INSTAGRAM_POSTS = [
  { img: "assets/img/ig-1.webp", alt: "Delivery gratis en Península", url: IG },
  { img: "assets/img/platos/filomena-pasion.webp", alt: "Cóctel de autor Filomena Pasión", url: IG },
  { img: "assets/img/ig-3.webp", alt: "Pide tu empanada favorita y recibe en casa", url: IG },
  { img: "assets/img/platos/jardin-del-mar.webp", alt: "Tabla Jardín del Mar", url: IG },
  { img: "assets/img/ig-4.webp", alt: "Happy hour de lunes a jueves", url: IG },
  { img: "assets/img/platos/tres-leches.webp", alt: "Copa tres leches", url: IG },
  { img: "assets/img/ig-5.webp", alt: "Promo pizza familiar con bebida gratis", url: IG },
  { img: "assets/img/platos/mojito-litro.webp", alt: "Mojito por litro para delivery", url: IG }
];
