/* ============================================================
   DOÑA FILOMENA · DATOS DEL SITIO
   ------------------------------------------------------------
   Este es el único archivo que necesitas tocar para cambiar
   precios, productos, horarios o números de WhatsApp.

   - precio: número sin puntos (4500). Usa null si el precio
     se confirma por WhatsApp (se muestra "Consultar").
   - en: en qué local está disponible el producto.
     Si no lo pones, se usa el de la categoría.
   - tags: "popular", "premiada", "nuevo", "economica", "hh"
     (hh = entra en Happy Hour)
   ============================================================ */

const LOCALES = {
  peninsula: {
    id: "peninsula",
    corto: "Península",
    nombre: "Doña Filomena Península",
    tipo: "Restaurant · Pizzería · Bar",
    direccion: "Filomena Valenzuela 298",
    zona: "Península de Cavancha, Iquique",
    whatsapp: "56999780334",
    telefono: "+56 9 9978 0334",
    instagram: "donafilomenarestaurant",
    maps: "https://maps.app.goo.gl/HCWu1sZ8AzGHnCcf6",
    mapsEmbed: "https://www.google.com/maps?q=Do%C3%B1a%20Filomena%2C%20Filomena%20Valenzuela%20298%2C%20Iquique&output=embed",
    foto: "assets/img/fachada.webp",
    // horario por día (0 = domingo). [abre, cierra] en "HH:MM". Cierre después de medianoche: "25:00" = 01:00
    horario: {
      0: ["12:00", "24:00"], 1: ["12:00", "24:00"], 2: ["12:00", "24:00"], 3: ["12:00", "24:00"],
      4: ["12:00", "24:00"], 5: ["12:00", "25:00"], 6: ["12:00", "25:00"]
    },
    horarioTexto: [["Dom – Jue", "12:00 – 00:00"], ["Vie – Sáb", "12:00 – 01:00"]],
    entrega: ["delivery", "retiro"],
    notaDelivery: "Delivery GRATIS dentro de Península · Pedido mínimo $5.000",
    destacados: ["Terraza con música en vivo", "Zona infantil gratuita", "Barra y Happy Hour", "Delivery gratis en Península"]
  },
  zofri: {
    id: "zofri",
    corto: "Zofri",
    nombre: "Doña Filomena Zofri",
    tipo: "Express · Para llevar",
    direccion: "Mall Zofri, Etapa 7",
    zona: "Zona Franca, Iquique",
    whatsapp: "56999780334",           // ← CONFIRMAR número propio del local Zofri
    telefono: "+56 9 9978 0334",
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
    destacados: ["Rápido, ideal para tu día de compras", "Empanadas recién hechas", "Pizzas y jugos naturales", "Retiro sin filas"]
  }
};

/* Happy Hour (Península) */
const HAPPY_HOUR = { dias: [1, 2, 3, 4], desde: "13:00", hasta: "23:00", texto: "Lun – Jue · 13:00 a 23:00" };

const AMBOS = ["peninsula", "zofri"];
const PEN = ["peninsula"];

const CATEGORIAS = [
  { id: "fritas",   nombre: "Empanadas fritas",  sub: "Premiadas · rellenas a mano · recién fritas", en: AMBOS },
  { id: "horno",    nombre: "Empanadas de horno", sub: "Masa dorada, receta de siempre",              en: AMBOS },
  { id: "sinenvidia", nombre: "Las Sin Envidia",  sub: "La versión económica, igual de rica",          en: AMBOS },
  { id: "pizzas",   nombre: "Pizzas",              sub: "A la piedra, para compartir",                 en: AMBOS },
  { id: "pescados", nombre: "Pescados",            sub: "Del Pacífico, con guarnición a elección",     en: PEN },
  { id: "postres",  nombre: "Postres & café",      sub: "Para la hora del té",                         en: AMBOS },
  { id: "tragos",   nombre: "Tragos de la barra",  sub: "Mojitos, sours y la firma de la casa",        en: PEN },
  { id: "jugos",    nombre: "Jugos & bebidas",     sub: "Naturales, preparados al momento",            en: AMBOS },
  { id: "cervezas", nombre: "Cervezas",            sub: "Nacionales y artesanales, bien heladas",      en: PEN },
  { id: "jarras",   nombre: "Para compartir",      sub: "Jarras y litros para el grupo",               en: PEN }
];

const MENU = [
  /* ---------- EMPANADAS FRITAS ---------- */
  { id: "ef1",  cat: "fritas", nm: "Camarón Queso",        precio: 4500, tags: ["popular", "premiada"], desc: "La más pedida de la casa" },
  { id: "ef2",  cat: "fritas", nm: "Camarón al Pil Pil",   precio: 4700, desc: "Con un toque de ají y ajo" },
  { id: "ef3",  cat: "fritas", nm: "Loco Queso",           precio: 4500 },
  { id: "ef4",  cat: "fritas", nm: "Pulpo Queso",          precio: 4500 },
  { id: "ef5",  cat: "fritas", nm: "Jaiba Queso",          precio: 4200, tags: ["popular"] },
  { id: "ef6",  cat: "fritas", nm: "Ostión Pil Pil Queso", precio: 5300, tags: ["popular"], desc: "Ostiones al pil pil con queso fundido" },
  { id: "ef7",  cat: "fritas", nm: "Ostión Queso",         precio: 5200 },
  { id: "ef8",  cat: "fritas", nm: "Pino de Marisco",      precio: 3400, desc: "Surtido de mariscos" },
  { id: "ef9",  cat: "fritas", nm: "Ceviche Queso",        precio: 3700, desc: "Cebolla, cilantro, rocoto y pescado en fino corte" },
  { id: "ef10", cat: "fritas", nm: "Pino Carne",           precio: 3100, desc: "Carne picada, la tradicional chilena" },
  { id: "ef11", cat: "fritas", nm: "Mechada Queso",        precio: 3500 },
  { id: "ef12", cat: "fritas", nm: "Longaniza Queso",      precio: 3300 },
  { id: "ef13", cat: "fritas", nm: "Ají de Gallina",       precio: 3300 },
  { id: "ef14", cat: "fritas", nm: "Pastel de Choclo",     precio: 3500 },
  { id: "ef15", cat: "fritas", nm: "Pollo Queso Champiñón", precio: 3100 },
  { id: "ef16", cat: "fritas", nm: "Carne Champiñón Queso", precio: 3100 },
  { id: "ef17", cat: "fritas", nm: "Crema Pastelera de Choclo", precio: 3300 },
  { id: "ef18", cat: "fritas", nm: "Queso",                precio: 2600 },
  { id: "ef19", cat: "fritas", nm: "Champiñón Queso",      precio: 2600 },
  { id: "ef20", cat: "fritas", nm: "Choclo Crema Queso",   precio: 2600 },
  { id: "ef21", cat: "fritas", nm: "Jamón Queso",          precio: 2700 },
  { id: "ef22", cat: "fritas", nm: "Aceituna Queso",       precio: 2800 },
  { id: "ef23", cat: "fritas", nm: "Pizza",                precio: 2900, desc: "Jamón, queso, tomate y aceitunas de Azapa" },
  { id: "ef24", cat: "fritas", nm: "Tilama",               precio: 3100, tags: ["popular"], desc: "Queso de cabra, tomate y albahaca" },

  /* ---------- EMPANADAS DE HORNO ---------- */
  { id: "eh1", cat: "horno", nm: "Pino Carne al Horno",        precio: 3800, tags: ["premiada"], desc: "Carne picada real, huevo y aceituna" },
  { id: "eh2", cat: "horno", nm: "Mechada Queso",              precio: 3800 },
  { id: "eh3", cat: "horno", nm: "Pollo Queso",                precio: 3800 },
  { id: "eh4", cat: "horno", nm: "Pollo Queso Champiñón",      precio: 3800 },
  { id: "eh5", cat: "horno", nm: "Pastel de Choclo",           precio: 3800 },
  { id: "eh6", cat: "horno", nm: "Ají de Gallina",             precio: 3800 },
  { id: "eh7", cat: "horno", nm: "Crema Pastelera de Choclo",  precio: 3800 },
  { id: "eh8", cat: "horno", nm: "Queso",                      precio: 3300 },
  { id: "eh9", cat: "horno", nm: "Camarón al Pil Pil",         precio: 4700 },

  /* ---------- LAS SIN ENVIDIA ---------- */
  { id: "se0", cat: "sinenvidia", nm: "Pack Sin Envidia · 6 unidades", precio: 11000, tags: ["popular", "economica"], img: "assets/img/empanadas.webp", desc: "Mechada, ají de gallina, choclo, pollo, pino y queso" },
  { id: "se1", cat: "sinenvidia", nm: "Sin Envidia Pino Carne",     precio: 2000, tags: ["economica"] },
  { id: "se2", cat: "sinenvidia", nm: "Sin Envidia Mechada Queso",  precio: 2000, tags: ["economica"] },
  { id: "se3", cat: "sinenvidia", nm: "Sin Envidia Ají de Gallina", precio: 2000, tags: ["economica"] },
  { id: "se4", cat: "sinenvidia", nm: "Sin Envidia Pastel de Choclo", precio: 2000, tags: ["economica"] },
  { id: "se5", cat: "sinenvidia", nm: "Sin Envidia Pollo Queso",    precio: 2000, tags: ["economica"] },
  { id: "se6", cat: "sinenvidia", nm: "Sin Envidia Queso",          precio: 2000, tags: ["economica"] },

  /* ---------- PIZZAS (completar carta) ---------- */
  { id: "pz1", cat: "pizzas", nm: "Pizza Familiar XL", precio: 23800, tags: ["popular"], img: "assets/img/pizza.webp", desc: "Elige tu variedad al confirmar. Llévate una bebida 1,5 L gratis (retiro)" },
  { id: "pz2", cat: "pizzas", nm: "Pizza Cavanchina",  precio: null, desc: "La favorita de nuestros clientes" },

  /* ---------- PESCADOS ---------- */
  { id: "p1",  cat: "pescados", nm: "Reineta frita o a la plancha", precio: 18500, desc: "Con guarnición a elección" },
  { id: "p2",  cat: "pescados", nm: "Reineta de la Casa",          precio: 19000, desc: "Plancha, papa rosti, tocino y ensalada verde" },
  { id: "p3",  cat: "pescados", nm: "Salmón a la plancha",         precio: 19000, desc: "Con guarnición a elección" },
  { id: "p4",  cat: "pescados", nm: "Corvina frita o a la plancha", precio: 19000, desc: "Con guarnición a elección" },
  { id: "p5",  cat: "pescados", nm: "Corvina de la Casa",          precio: 20000, desc: "Plancha, papa rosti, tocino y ensalada verde" },
  { id: "p6",  cat: "pescados", nm: "Corvinilla frita o a la plancha", precio: 16000, desc: "Con guarnición a elección" },
  { id: "p7",  cat: "pescados", nm: "Corvinilla de la Casa",       precio: 16900, desc: "Plancha, papa rosti, tocino y ensalada verde" },
  { id: "p8",  cat: "pescados", nm: "Medallón de Congrio",         precio: 19500, desc: "Exquisito medallón frito" },
  { id: "p9",  cat: "pescados", nm: "Albacora frita o a la plancha", precio: 19500, desc: "Con guarnición a elección" },
  { id: "p10", cat: "pescados", nm: "Dorado frito o a la plancha", precio: 20000, desc: "Con arroz, ensalada chilena o papas fritas" },
  { id: "p11", cat: "pescados", nm: "Pejerrey frito",              precio: 16000, desc: "Rebozado en batido de la casa" },
  { id: "p12", cat: "pescados", nm: "Pescado a lo Pobre",          precio: 22000 },
  { id: "p13", cat: "pescados", nm: "Perlán de Reineta",           precio: 14500 },

  /* ---------- POSTRES & CAFÉ ---------- */
  { id: "po1", cat: "postres", nm: "Torta del Día",           precio: 4300, tags: ["popular"], img: "assets/img/postres.webp", desc: "Porción generosa. Pregunta por la de hoy" },
  { id: "po2", cat: "postres", nm: "Pote de Torta",           precio: null, desc: "Para llevar y disfrutar en casa" },
  { id: "po3", cat: "postres", nm: "Tres Leches",             precio: 3500 },
  { id: "po4", cat: "postres", nm: "Tiramisú",                precio: 3700 },
  { id: "po5", cat: "postres", nm: "Cheesecake de Frutos Rojos", precio: 3800 },
  { id: "po6", cat: "postres", nm: "Pie de Limón",            precio: 3500 },
  { id: "po7", cat: "postres", nm: "Chocolate con Helado",    precio: 3900 },
  { id: "po8", cat: "postres", nm: "Copa de Helado",          precio: 4500 },
  { id: "po9", cat: "postres", nm: "Banana Split",            precio: 4800 },
  { id: "po10", cat: "postres", nm: "Café de grano",          precio: null, desc: "Espresso, cortado o capuccino" },

  /* ---------- TRAGOS ---------- */
  { id: "t1", cat: "tragos", nm: "Royal Filomena",          precio: null, tags: ["popular", "hh"], img: "assets/img/coctel.webp", desc: "La firma de la casa: mojito con Jack Daniel's" },
  { id: "t2", cat: "tragos", nm: "Mojito Cubano",           precio: 8000, tags: ["hh"], desc: "Ron, limón macerado, hierba buena y soda" },
  { id: "t3", cat: "tragos", nm: "Mojito de Sabores",       precio: null, tags: ["popular", "hh"], desc: "Maracuyá, frutilla o mango" },
  { id: "t4", cat: "tragos", nm: "Mojito Cervecero",        precio: null, tags: ["hh"] },
  { id: "t5", cat: "tragos", nm: "Mojito Jäger",            precio: null, tags: ["hh"] },
  { id: "t6", cat: "tragos", nm: "Sour de la Casa",         precio: 4800, tags: ["hh"], desc: "Pisco macerado con granadina" },
  { id: "t7", cat: "tragos", nm: "Sour Peruano Especial",   precio: 5500, tags: ["nuevo"], desc: "Quebranta, hoja de coca, jengibre y maíz morado" },
  { id: "t8", cat: "tragos", nm: "Mango Sour",              precio: null, tags: ["hh"] },

  /* ---------- JUGOS & BEBIDAS ---------- */
  { id: "b1",  cat: "jugos", nm: "Jugo natural Mango o Maracuyá", precio: 4200, tags: ["popular"], img: "assets/img/jugo.webp", desc: "Recién preparado" },
  { id: "b2",  cat: "jugos", nm: "Jugo natural",               precio: 4000, desc: "Melón, sandía o frutilla" },
  { id: "b3",  cat: "jugos", nm: "Jugo con leche o mixto",     precio: 4400 },
  { id: "b4",  cat: "jugos", nm: "Limonada tradicional",        precio: 4000 },
  { id: "b5",  cat: "jugos", nm: "Limonada menta jengibre",     precio: 4200 },
  { id: "b6",  cat: "jugos", nm: "Pink Frozen",                 precio: 4200, desc: "Hielo frappé, limón y granadina" },
  { id: "b7",  cat: "jugos", nm: "Blue Frozen",                 precio: 4200, desc: "Hielo frappé, limón, curaçao y hierba buena" },
  { id: "b8",  cat: "jugos", nm: "Bebida 350 cc",               precio: 2900, desc: "Coca-Cola, Zero, Fanta, Sprite, Ginger Ale, Bilz o Pap" },
  { id: "b9",  cat: "jugos", nm: "Agua sin gas 600 cc",         precio: 2900 },
  { id: "b10", cat: "jugos", nm: "Agua con gas 600 cc",         precio: 2900 },
  { id: "b11", cat: "jugos", nm: "Red Bull",                    precio: 2800, desc: "Normal, sandía o yellow" },

  /* ---------- CERVEZAS ---------- */
  { id: "c1",  cat: "cervezas", nm: "Austral Calafate 330 cc",       precio: 3800 },
  { id: "c2",  cat: "cervezas", nm: "Kunstmann Gran Torobayo 500 cc", precio: 6000 },
  { id: "c3",  cat: "cervezas", nm: "Kunstmann Torobayo 330 cc",     precio: 4000 },
  { id: "c4",  cat: "cervezas", nm: "Kunstmann Lager 330 cc",        precio: 4000 },
  { id: "c5",  cat: "cervezas", nm: "Corona 330 cc",                 precio: 3800 },
  { id: "c6",  cat: "cervezas", nm: "Sol 330 cc",                    precio: 3800 },
  { id: "c7",  cat: "cervezas", nm: "Kunstmann sin alcohol 330 cc",  precio: 3800 },
  { id: "c8",  cat: "cervezas", nm: "Heineken 0,0",                  precio: 3500 },
  { id: "c9",  cat: "cervezas", nm: "Vaso chelado",                  precio: 1300, desc: "Limón y sal en el borde" },
  { id: "c10", cat: "cervezas", nm: "Vaso michelado",                precio: 1500, desc: "Limón, merkén, sal, tabasco y salsa inglesa" },

  /* ---------- PARA COMPARTIR ---------- */
  { id: "j1",  cat: "jarras", nm: "Jarra jugo natural 1,5 L",     precio: 16500, desc: "Maracuyá, frutilla, piña, sandía o melón" },
  { id: "j2",  cat: "jarras", nm: "Jarra mango de Pica 1,5 L",    precio: 17000, tags: ["popular"] },
  { id: "j3",  cat: "jarras", nm: "Jarra limonada menta jengibre 1,5 L", precio: 16000 },
  { id: "j4",  cat: "jarras", nm: "Mojito de sabores 1 L",        precio: 25000, desc: "Ron Havana, limón macerado y hierba buena" },
  { id: "j5",  cat: "jarras", nm: "Sour peruano 1 L",             precio: 24500, desc: "Barsol, jugo de limón y amargo de angostura" },
  { id: "j6",  cat: "jarras", nm: "Sour nacional 1 L",            precio: 21000, desc: "Pisco Capel, azúcar flor y jugo de limón" },
  { id: "j7",  cat: "jarras", nm: "Jarra sangría 1,5 L",          precio: 15000, desc: "Naranja, limón, canela, vino tinto y coñac" },
  { id: "j8",  cat: "jarras", nm: "Jarra borgoña 1 L",            precio: 16000, desc: "Vino tinto, frutilla y azúcar" },
  { id: "j9",  cat: "jarras", nm: "Jarra verano maracuyá 1 L",    precio: 17000, desc: "Vino blanco, maracuyá, hierba buena y limón" }
];

/* Sugerencias del carrito cuando no hay bebida */
const SUGERENCIAS = ["b1", "b4", "b8"];

const RESENAS = [
  { txt: "Lejos el mejor de Iquique en mariscos y pescados. Las empanadas de ostión queso y jaiba queso son exquisitas.", autor: "Visitante verificado", fuente: "Foursquare" },
  { txt: "El mojito de maracuyá es el mejor que he tomado en Iquique, ¡por lejos! La empanada Tilama, mi favorita. 100% recomendable.", autor: "Cliente frecuente", fuente: "Foursquare" },
  { txt: "Excelente atención, servicio de primer nivel. Una experiencia a la altura de lo que buscaba y muy bien ubicado.", autor: "Navigator27595842", fuente: "TripAdvisor" },
  { txt: "Pizza Cavanchina exquisita, muy buen mango sour y jugo de guayaba. Ambiente acogedor.", autor: "Visitante verificado", fuente: "Foursquare" },
  { txt: "¡Espectacular! La atención, la calidad, el ambiente. Un buen recuerdo de nuestras vacaciones en familia.", autor: "Familia en vacaciones", fuente: "Foursquare" },
  { txt: "Empanaditas de queso ostión, queso jaiba y queso pulpo realmente ricas y a buen precio. ¡Genial para el que le gusta la buena mesa!", autor: "Amante de los mariscos", fuente: "Foursquare" }
];

/* Publicaciones destacadas de Instagram (imagen + enlace).
   Para enlazar un post específico, reemplaza url por el link del post. */
const INSTAGRAM_POSTS = [
  { img: "assets/img/ig-1.webp", alt: "Delivery gratis en Península", url: "https://www.instagram.com/donafilomenarestaurant/" },
  { img: "assets/img/ig-2.webp", alt: "La hora del té en Doña Filomena", url: "https://www.instagram.com/donafilomenarestaurant/" },
  { img: "assets/img/ig-3.webp", alt: "Pide tu empanada favorita y recibe en casa", url: "https://www.instagram.com/donafilomenarestaurant/" },
  { img: "assets/img/ig-4.webp", alt: "Happy hour de lunes a jueves", url: "https://www.instagram.com/donafilomenarestaurant/" },
  { img: "assets/img/ig-5.webp", alt: "Promo pizza familiar con bebida gratis", url: "https://www.instagram.com/donafilomenarestaurant/" },
  { img: "assets/img/ig-6.webp", alt: "Zona infantil", url: "https://www.instagram.com/donafilomenarestaurant/" },
  { img: "assets/img/ig-7.webp", alt: "Jugo natural de la casa", url: "https://www.instagram.com/donafilomenarestaurant/" },
  { img: "assets/img/ig-8.webp", alt: "Terraza con música en vivo", url: "https://www.instagram.com/donafilomenarestaurant/" }
];
