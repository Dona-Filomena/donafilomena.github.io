/* ============================================================
   DOÑA FILOMENA · DATOS DEL SITIO
   ------------------------------------------------------------
   Único archivo que necesitas tocar para cambiar precios,
   productos, horarios o números de WhatsApp.

   Fuente de productos y precios: carta oficial en PDF
   (assets/carta-dona-filomena.pdf, versión del 6-11-2026).
   "pedido" = marcado como lo más pedido en la carta o en ventas.

   - precio: número sin puntos (4500). null = "Consultar".
   - en: locales donde está disponible. Si no lo pones,
     se usa el de la categoría.
   - tags: "pedido", "casa", "economica", "nuevo"
   - pre (en la categoría): texto que se antepone al nombre en el
     carrito y en el WhatsApp ("Empanada de horno" + "Pino")
   - img: foto (opcional) en assets/img/...
   ============================================================ */

const LOCALES = {
  peninsula: {
    id: "peninsula",
    corto: "Península",
    nombre: "Doña Filomena Península",
    tipo: "Pizzería · Restaurant · Bar",
    direccion: "Filomena Valenzuela 298",
    zona: "Península de Iquique",
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
    notaDelivery: "Delivery GRATIS dentro de Península",
    destacados: ["Terraza con música en vivo", "Zona infantil", "Bar y Happy Hour", "Menú del día Lun–Jue", "Delivery gratis en Península"]
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
    destacados: ["Ideal para tu día de compras", "Empanadas recién hechas", "Pizzas familiares", "Retiro sin filas"]
  }
};

/* Happy Hour (Península) */
const HAPPY_HOUR = {
  dias: [1, 2, 3, 4], desde: "13:00", hasta: "21:00",
  texto: "Lun – Jue · 13:00 a 21:00",
  promo: "3x2 en schop de 500 cc seleccionados y promos en sour, mojitos y destilados"
};

const AMBOS = ["peninsula", "zofri"];
const PEN = ["peninsula"];

const CATEGORIAS = [
  { id: "ejecutivo", nombre: "Menú del día",        sub: "Lunes a jueves · 12:00 a 16:00",                              en: PEN },
  { id: "fritas",    nombre: "Empanadas fritas",    sub: "Un 21 de Mayo sin empanadas no es 21 de Mayo. Y un día cualquiera, tampoco.", en: AMBOS, pre: "Empanada frita" },
  { id: "horno",     nombre: "Empanadas de horno",  sub: "La de pino es la más pedida de la casa",                      en: AMBOS, pre: "Empanada de horno" },
  { id: "sinenvidia",nombre: "Las Sin Envidia",     sub: "Nuestras empanadas de horno en formato para compartir… o no", en: AMBOS },
  { id: "pizzas",    nombre: "Pizzas familiares",   sub: "Con nombres de nuestra tierra: Azapa, Cavancha, Huayquique, Matilla, la Pampa…", en: AMBOS, pre: "Pizza" },
  { id: "sandwich",  nombre: "Sándwiches",          sub: "Contundentes, como debe ser",                                 en: AMBOS, pre: "Sándwich" },
  { id: "tablas",    nombre: "Para compartir",      sub: "Al centro de la mesa",                                        en: PEN },
  { id: "entradas",  nombre: "Para empezar",        sub: "Lo primero que llega a la mesa y lo primero que desaparece",  en: PEN },
  { id: "ceviches",  nombre: "Ceviches",            sub: "Frescos, como los pide el Pacífico iquiqueño",                en: PEN },
  { id: "gredas",    nombre: "Gredas",              sub: "Servidas hirviendo, como en la casa de la abuela",            en: PEN },
  { id: "pescados",  nombre: "Del mar",             sub: "Iquique mira al mar, y nuestra cocina también",               en: PEN },
  { id: "pastas",    nombre: "Risottos y pastas",   sub: "Del wok a la mesa",                                           en: PEN },
  { id: "carnes",    nombre: "De la tierra",        sub: "Para los que llegan con hambre de verdad",                    en: PEN },
  { id: "ensaladas", nombre: "Ensaladas y agregados", sub: "Frescas, y los acompañamientos de siempre",                 en: PEN },
  { id: "ninos",     nombre: "Para los niños",      sub: "Solo para los más chicos",                                    en: PEN, pre: "Menú niños" },
  { id: "postres",   nombre: "Postres",             sub: "Pastelería artesanal, hecha para terminar bien",              en: AMBOS },
  { id: "cafe",      nombre: "Café y té",           sub: "Para la hora del té",                                         en: AMBOS, bebida: true },
  { id: "jugos",     nombre: "Jugos y bebidas",     sub: "Naturales, preparados al momento",                            en: AMBOS, bebida: true },
  { id: "jarras",    nombre: "Jarras 1,5 L",        sub: "Para toda la mesa",                                           en: PEN, bebida: true },
  { id: "schop",     nombre: "Schop y cervezas",    sub: "Bien heladas",                                                en: PEN, bebida: true },
  { id: "mojitos",   nombre: "Mojitos",             sub: "Con Havana Club y hierba buena",                              en: PEN, bebida: true },
  { id: "sours",     nombre: "Sour y catedrales",   sub: "El sour en tamaño Doña Filomena",                             en: PEN, bebida: true },
  { id: "cocteles",  nombre: "Coctelería",          sub: "Firma de la casa: Filomena Pasión",                           en: PEN, bebida: true },
  { id: "vinos",     nombre: "Vinos y destilados",  sub: "Por copa, botella o en las rocas",                            en: PEN, bebida: true }
];

const MENU = [
  /* ---------- MENÚ DEL DÍA ---------- */
  { id: "me1", cat: "ejecutivo", nm: "Menú del día", precio: 14900, tags: ["pedido"], desc: "Entrada + plato de fondo + bebestible + postre. Pregunta por el menú de hoy." },

  /* ---------- EMPANADAS FRITAS ---------- */
  { id: "ef1",  cat: "fritas", nm: "Camarón Queso",        precio: 4500, tags: ["pedido"], desc: "La frita más pedida" },
  { id: "ef8",  cat: "fritas", nm: "Pino de Marisco",      precio: 3400, tags: ["pedido"], desc: "Surtido de mariscos" },
  { id: "ef18", cat: "fritas", nm: "Queso",                precio: 2600, tags: ["pedido"] },
  { id: "ef2",  cat: "fritas", nm: "Camarón al Pil Pil",   precio: 4700 },
  { id: "ef3",  cat: "fritas", nm: "Loco Queso",           precio: 4500 },
  { id: "ef4",  cat: "fritas", nm: "Pulpo Queso",          precio: 4500 },
  { id: "ef5",  cat: "fritas", nm: "Jaiba Queso",          precio: 4200 },
  { id: "ef9",  cat: "fritas", nm: "Ceviche Queso",        precio: 3700, desc: "Ceviche de la casa: cebolla, cilantro, rocoto y pescado" },
  { id: "ef11", cat: "fritas", nm: "Mechada Queso",        precio: 3500 },
  { id: "ef14", cat: "fritas", nm: "Pastel de Choclo",     precio: 3500 },
  { id: "ef13", cat: "fritas", nm: "Ají de Gallina",       precio: 3300 },
  { id: "ef12", cat: "fritas", nm: "Longaniza Queso",      precio: 3300 },
  { id: "ef17", cat: "fritas", nm: "Crema Pastelera de Choclo con Queso", precio: 3300 },
  { id: "ef10", cat: "fritas", nm: "Pino",                 precio: 3100, desc: "Carne picada" },
  { id: "ef24", cat: "fritas", nm: "Tilama",               precio: 3100, desc: "Queso de cabra, tomate y albahaca" },
  { id: "ef25", cat: "fritas", nm: "Pollo Queso",          precio: 3100 },
  { id: "ef15", cat: "fritas", nm: "Pollo Queso Champiñón", precio: 3100 },
  { id: "ef16", cat: "fritas", nm: "Carne Champiñón Queso", precio: 3100 },
  { id: "ef23", cat: "fritas", nm: "Pizza",                precio: 2900, desc: "Jamón, queso, tomate y aceitunas de Azapa" },
  { id: "ef22", cat: "fritas", nm: "Queso con Aceituna",   precio: 2800 },
  { id: "ef21", cat: "fritas", nm: "Jamón Queso",          precio: 2700 },
  { id: "ef19", cat: "fritas", nm: "Champiñón Queso",      precio: 2600 },
  { id: "ef20", cat: "fritas", nm: "Choclo Crema Queso",   precio: 2600 },

  /* ---------- EMPANADAS DE HORNO ---------- */
  { id: "eh1",  cat: "horno", nm: "Pino",                       precio: 3800, tags: ["pedido"], img: "assets/img/platos/empanadas-horno.webp", desc: "La más pedida de la casa" },
  { id: "eh2",  cat: "horno", nm: "Mechada Queso",              precio: 3800, tags: ["pedido"] },
  { id: "eh6",  cat: "horno", nm: "Ají de Gallina",             precio: 3800, tags: ["pedido"] },
  { id: "eh3",  cat: "horno", nm: "Pollo Queso",                precio: 3800 },
  { id: "eh5",  cat: "horno", nm: "Pastel de Choclo",           precio: 3800 },
  { id: "eh4",  cat: "horno", nm: "Pollo Queso Champiñón",      precio: 3800 },
  { id: "eh7",  cat: "horno", nm: "Crema Pastelera y Queso de Cabra", precio: 3800 },
  { id: "eh8",  cat: "horno", nm: "Queso",                      precio: 3300 },
  { id: "eh11", cat: "horno", nm: "Ostión al Pil Pil con Queso", precio: 5300 },
  { id: "eh9",  cat: "horno", nm: "Camarón al Pil Pil",         precio: 4900 },
  { id: "eh10", cat: "horno", nm: "Loco Queso",                 precio: 4900 },

  /* ---------- LAS SIN ENVIDIA ---------- */
  { id: "se0", cat: "sinenvidia", nm: "Promo 6 unidades",  precio: 11000, tags: ["economica"], img: "assets/img/empanadas.webp", desc: "Mechada queso, ají de gallina, pastel de choclo, pollo queso, pino y queso" },
  { id: "se7", cat: "sinenvidia", nm: "Promo 12 unidades", precio: 22500, tags: ["economica"] },
  { id: "se1", cat: "sinenvidia", nm: "Sin Envidia Pino",             precio: 2000 },
  { id: "se2", cat: "sinenvidia", nm: "Sin Envidia Mechada Queso",    precio: 2000 },
  { id: "se3", cat: "sinenvidia", nm: "Sin Envidia Ají de Gallina",   precio: 2000 },
  { id: "se4", cat: "sinenvidia", nm: "Sin Envidia Pastel de Choclo", precio: 2000 },
  { id: "se5", cat: "sinenvidia", nm: "Sin Envidia Pollo Queso",      precio: 2000 },
  { id: "se6", cat: "sinenvidia", nm: "Sin Envidia Queso",            precio: 2000 },

  /* ---------- PIZZAS FAMILIARES ---------- */
  { id: "pz2",  cat: "pizzas", nm: "Azapa",           precio: 19900, tags: ["pedido"], img: "assets/img/pizza.webp", desc: "Tomate, aceitunas de Azapa, queso de cabra, albahaca y orégano" },
  { id: "pz6",  cat: "pizzas", nm: "Del Norte",       precio: 19900, tags: ["pedido"], desc: "Chorizo español, tocino, carne, aceitunas de Azapa y orégano" },
  { id: "pz15", cat: "pizzas", nm: "Napolitana",      precio: 18900, tags: ["pedido"], desc: "Tomate, queso, jamón cocido y aceituna" },
  { id: "pz1",  cat: "pizzas", nm: "Cavanchina",      precio: 19900, desc: "Tomate, camarón, parmesano, rúcula y orégano" },
  { id: "pz7",  cat: "pizzas", nm: "Paibizabay",      precio: 19900, desc: "Champiñones, morrón rojo, salame ahumado, palta y orégano" },
  { id: "pz5",  cat: "pizzas", nm: "Caleta de Queso", precio: 20900, desc: "Mantecoso, queso de cabra, mozzarella, parmesano y orégano" },
  { id: "pz4",  cat: "pizzas", nm: "La Ola",          precio: 20900, desc: "Camarón, pulpo, cebolla salteada y orégano" },
  { id: "pz3",  cat: "pizzas", nm: "Doña Filomena",   precio: 18900, desc: "Carne, mozzarella, pepinillo, choclo y orégano" },
  { id: "pz8",  cat: "pizzas", nm: "Huayquique",      precio: 18900, desc: "Tomate, pollo grillé, jamón cocido, piña y orégano" },
  { id: "pz11", cat: "pizzas", nm: "Matilla",         precio: 18900, desc: "Queso mantecoso, pepperoni, aceitunas de Azapa y orégano" },
  { id: "pz13", cat: "pizzas", nm: "Pampina",         precio: 18900, desc: "Carne, cebollín, morrón rojo, ají verde y orégano" },
  { id: "pz12", cat: "pizzas", nm: "De la Península", precio: 18900, desc: "Rúcula, tomate deshidratado, jamón serrano y orégano" },
  { id: "pz10", cat: "pizzas", nm: "Americana",       precio: 18900, desc: "Carne, jamón cocido, cuatro huevos fritos y orégano" },
  { id: "pz9",  cat: "pizzas", nm: "Mediterránea",    precio: 18900, desc: "Alcachofa, tomate, aceituna negra y jamón serrano" },
  { id: "pz14", cat: "pizzas", nm: "Verona",          precio: 18900, desc: "Queso de cabra, cebolla caramelizada, rúcula y tomate deshidratado" },
  { id: "pz16", cat: "pizzas", nm: "Vegetariana",     precio: 18000, desc: "Tomate deshidratado, champiñón, palta, quinoa y orégano" },
  { id: "pz17", cat: "pizzas", nm: "Arma tu pizza",   precio: 11000, desc: "Base familiar + los ingredientes que elijas (se suman al confirmar)" },

  /* ---------- SÁNDWICHES Y HAMBURGUESAS ---------- */
  { id: "sw10", cat: "sandwich", nm: "Italiano",                  precio: 9000, tags: ["pedido"], desc: "Carne de res, tomate, palta y mayonesa" },
  { id: "sw2",  cat: "sandwich", nm: "Hamburguesa Esmeralda",     precio: 9900, tags: ["pedido"], desc: "Casera rellena de queso, tomate y aros de cebolla crispy" },
  { id: "sw13", cat: "sandwich", nm: "Barros Luco",               precio: 8800, tags: ["pedido"], desc: "Carne de res y queso fundido" },
  { id: "sw1",  cat: "sandwich", nm: "Hamburguesa Doña Filomena", precio: 9900, desc: "Casera, rellena de queso, lechuga, tomate, palta y pepinillo" },
  { id: "sw3",  cat: "sandwich", nm: "Hamburguesa Vegetariana",   precio: 9900, desc: "De legumbres o quinoa, lechuga, tomate, palta y pepinillo" },
  { id: "sw4",  cat: "sandwich", nm: "Salmón de la Península",    precio: 9900, desc: "Salmón a la plancha, pepinillo dill y cebolla morada" },
  { id: "sw5",  cat: "sandwich", nm: "Reina Albacora",            precio: 9900, desc: "Albacora a la plancha, cebolla morada, aceitunas de Azapa y albahaca" },
  { id: "sw6",  cat: "sandwich", nm: "Kikirikí",                  precio: 9500, desc: "Pollo grillé, lechuga, tomate, albahaca y mayonesa" },
  { id: "sw7",  cat: "sandwich", nm: "Crispy",                    precio: 9500, desc: "Pollo apanado, queso fundido, cebolla morada, tomate y lechuga" },
  { id: "sw16", cat: "sandwich", nm: "Pacífico de reineta",       precio: 9500 },
  { id: "sw18", cat: "sandwich", nm: "Dragón del Mar de reineta", precio: 9500 },
  { id: "sw19", cat: "sandwich", nm: "Sándwich al plato",         precio: 9500 },
  { id: "sw8",  cat: "sandwich", nm: "Choapa",                    precio: 9200, desc: "Queso de cabra fundido, tomate, albahaca y aceitunas de Azapa" },
  { id: "sw9",  cat: "sandwich", nm: "Americano",                 precio: 9200, desc: "Carne de res, jamón, queso fundido y huevo frito" },
  { id: "sw11", cat: "sandwich", nm: "Chacarero",                 precio: 9000, desc: "Carne de res, tomate, porotos verdes y ají verde" },
  { id: "sw12", cat: "sandwich", nm: "Mechada Queso",             precio: 8900 },
  { id: "sw15", cat: "sandwich", nm: "Pacífico de corvinilla",    precio: 8700 },
  { id: "sw17", cat: "sandwich", nm: "Dragón del Mar de corvinilla", precio: 8700 },
  { id: "sw14", cat: "sandwich", nm: "Cavanchino",                precio: 8200, desc: "Lechuga, tomate, atún, cebolla morada y mayonesa" },

  /* ---------- PARA COMPARTIR ---------- */
  { id: "tb2",  cat: "tablas", nm: "Tabla Tres Carnes",       precio: 34000, tags: ["pedido"], img: "assets/img/platos/tabla-tres-carnes.webp", desc: "Carne salteada, pollo apanado y pescado" },
  { id: "tb6",  cat: "tablas", nm: "Chorrillana para 2",      precio: 25200, tags: ["pedido"], desc: "Papas fritas, carne, pollo, chorizo, cebolla y pimentón" },
  { id: "tb1",  cat: "tablas", nm: "Jardín del Mar",          precio: 42000, img: "assets/img/platos/jardin-del-mar.webp", desc: "Tabla caliente: calamar a la romana, perlán de pescado, ceviche y más" },
  { id: "tb3",  cat: "tablas", nm: "Chicharrón de Mariscos",  precio: 34000, desc: "Calamar, camarones, pulpo, pescado, perlán y salmón" },
  { id: "tb5",  cat: "tablas", nm: "Chorrillana para 4",      precio: 34000 },
  { id: "tb8",  cat: "tablas", nm: "Cheese Fries Mixto",      precio: 16000, desc: "Papas fritas con queso fundido, carne y pollo" },
  { id: "tb9",  cat: "tablas", nm: "Cheese Fries",            precio: 12000, desc: "Papas fritas, queso fundido y tocino crocante" },
  { id: "tb14", cat: "tablas", nm: "Cheese Fries Vegetariano", precio: 11000, desc: "Papas fritas con champiñones salteados y cebollín" },
  { id: "tb10", cat: "tablas", nm: "Tabla Perlán de Pescado", precio: 11000, desc: "Pescado apanado y salsa de la casa" },
  { id: "tb11", cat: "tablas", nm: "Tabla de Nuggets",        precio: 11000 },
  { id: "tb12", cat: "tablas", nm: "Rabas",                   precio: 9990, desc: "Perlán de calamar" },

  /* ---------- PARA EMPEZAR ---------- */
  { id: "pa2",  cat: "entradas", nm: "Pulpo a la Parrilla",   precio: 18500, tags: ["pedido"], img: "assets/img/platos/pulpo-parrilla.webp", desc: "En chimichurri de finas hierbas, con papas doradas" },
  { id: "cv12", cat: "entradas", nm: "Camarones al Ajillo o al Pil Pil", precio: 16900 },
  { id: "cv11", cat: "entradas", nm: "Camarones Apanados",    precio: 17900 },
  { id: "cv15", cat: "entradas", nm: "Camarones Parmesano",   precio: 15500 },
  { id: "cv13", cat: "entradas", nm: "Pulpo al Olivo",        precio: 16900 },
  { id: "cv16", cat: "entradas", nm: "Pulpo al Pil Pil",      precio: 17500 },
  { id: "cv18", cat: "entradas", nm: "Locos con Papas Mayo",  precio: 26000 },
  { id: "cv17", cat: "entradas", nm: "Locos con Mayo",        precio: 23000 },
  { id: "cv19", cat: "entradas", nm: "Locos en Salsa Verde",  precio: 23000 },
  { id: "cv9",  cat: "entradas", nm: "Carpaccio de Salmón",   precio: 17000, desc: "En limoneta, alcaparras y parmesano" },
  { id: "cv10", cat: "entradas", nm: "Carpaccio de Pulpo",    precio: 17000, desc: "En limoneta, alcaparras y parmesano" },
  { id: "cv20", cat: "entradas", nm: "Copa de Leche de Tigre", precio: 6900 },

  /* ---------- CEVICHES ---------- */
  { id: "cv2",  cat: "ceviches", nm: "Ceviche Peruano",                 precio: 17900, tags: ["pedido"] },
  { id: "cv8r", cat: "ceviches", nm: "Ceviche a lo Rico · reineta",     precio: 17900, tags: ["pedido"] },
  { id: "cv8",  cat: "ceviches", nm: "Ceviche a lo Rico · corvinilla",  precio: 16900 },
  { id: "cv3r", cat: "ceviches", nm: "Ceviche Puerto Perú · reineta",   precio: 17900 },
  { id: "cv3",  cat: "ceviches", nm: "Ceviche Puerto Perú · corvinilla", precio: 16900 },
  { id: "cv1r", cat: "ceviches", nm: "Ceviche Doña Filo · reineta",     precio: 16900 },
  { id: "cv1",  cat: "ceviches", nm: "Ceviche Doña Filo · corvinilla",  precio: 15900 },
  { id: "cv4r", cat: "ceviches", nm: "Ceviche de Pica · reineta",       precio: 17900 },
  { id: "cv4",  cat: "ceviches", nm: "Ceviche de Pica · corvinilla",    precio: 15900 },
  { id: "cv7r", cat: "ceviches", nm: "Ceviche a la Parrilla · reineta", precio: 17900 },
  { id: "cv7",  cat: "ceviches", nm: "Ceviche a la Parrilla · corvinilla", precio: 16900 },
  { id: "cv6",  cat: "ceviches", nm: "Ceviche Pichidangui",             precio: 16900, desc: "Salmón, apio, palta, cebolla morada y cilantro" },
  { id: "cv5",  cat: "ceviches", nm: "Ceviche Costanera",               precio: 16900, desc: "Pulpo, camarón, apio, queso de cabra, cebolla morada y cilantro" },
  { id: "tb4",  cat: "ceviches", nm: "Trilogía de Ceviches",            precio: 33000, desc: "Tres ceviches para compartir" },

  /* ---------- GREDAS ---------- */
  { id: "gr5",  cat: "gredas", nm: "Paila Marina",       precio: 14000, tags: ["pedido"] },
  { id: "gr1",  cat: "gredas", nm: "Pastel de Choclo",   precio: 13000, tags: ["pedido"] },
  { id: "gr2",  cat: "gredas", nm: "Pastel de Jaiba",    precio: 15000, tags: ["pedido"] },
  { id: "gr3",  cat: "gredas", nm: "Pastel de Papas",    precio: 15500, img: "assets/img/platos/pastel-de-papas.webp" },
  { id: "gr8",  cat: "gredas", nm: "Chupe de Marisco o Camarón",   precio: 15000 },
  { id: "gr6",  cat: "gredas", nm: "Chupe de Pulpo",     precio: 16000 },
  { id: "gr4",  cat: "gredas", nm: "Caldillo de Congrio", precio: 15000 },
  { id: "gr9",  cat: "gredas", nm: "Picante de Marisco o Camarón", precio: 15500 },
  { id: "gr7",  cat: "gredas", nm: "Picante de Pulpo",   precio: 16000 },
  { id: "gr10", cat: "gredas", nm: "Consomé de Ave",     precio: 6600 },

  /* ---------- DEL MAR ---------- */
  { id: "p3",  cat: "pescados", nm: "Salmón a la Plancha",          precio: 19000, tags: ["pedido"], desc: "Con una guarnición a elección" },
  { id: "p10", cat: "pescados", nm: "Dorado a la Plancha",          precio: 20000, tags: ["pedido"], desc: "Con una guarnición a elección" },
  { id: "p1",  cat: "pescados", nm: "Reineta Frita o a la Plancha", precio: 18500, tags: ["pedido"], desc: "Con una guarnición a elección" },
  { id: "p2",  cat: "pescados", nm: "Reineta de la Casa",           precio: 19000, desc: "A la plancha con papa rosti y tocino" },
  { id: "p9",  cat: "pescados", nm: "Albacora Frita o a la Plancha", precio: 19500 },
  { id: "p5",  cat: "pescados", nm: "Corvina de la Casa",           precio: 20000, desc: "A la plancha con papa rosti y tocino" },
  { id: "p6",  cat: "pescados", nm: "Corvinilla Frita o a la Plancha", precio: 16000 },
  { id: "p7",  cat: "pescados", nm: "Corvinilla de la Casa",        precio: 16900, desc: "A la plancha con papa rosti y tocino" },
  { id: "p8",  cat: "pescados", nm: "Congrio Medallón Frito",       precio: 19500 },
  { id: "p15", cat: "pescados", nm: "Dorado Mandíbula",             precio: 19000, desc: "Apanado, relleno de jamón y queso" },
  { id: "p14", cat: "pescados", nm: "Papillote al Vapor",           precio: 20000, desc: "Salmón, reineta, albacora o dorado" },
  { id: "p12", cat: "pescados", nm: "Pescado a lo Pobre",           precio: 22000 },
  { id: "p16", cat: "pescados", nm: "Pescado con Fetuccini",        precio: 25000 },
  { id: "p17", cat: "pescados", nm: "Bajo en Calorías de Corvinilla", precio: 18000 },
  { id: "p13", cat: "pescados", nm: "Perlán de Reineta",            precio: 14500 },

  /* ---------- RISOTTOS Y PASTAS ---------- */
  { id: "pa11", cat: "pastas", nm: "Fetuccini a Elección",     precio: 15500, tags: ["pedido"], desc: "Boloñesa, pesto, alfredo, verduras o huancaína" },
  { id: "pa8",  cat: "pastas", nm: "Fetuccini Margarita",      precio: 16000, tags: ["pedido"], desc: "Salsa blanca y surtido de mariscos" },
  { id: "pa1",  cat: "pastas", nm: "Pulpo Teriyaki con Risotto Picante", precio: 22500, img: "assets/img/platos/pulpo-teriyaki.webp" },
  { id: "pa3",  cat: "pastas", nm: "Lasaña",                   precio: 17500, img: "assets/img/platos/lasana.webp", desc: "Vegetariana o boloñesa" },
  { id: "pa4",  cat: "pastas", nm: "Fetuccini Especial",       precio: 20000, desc: "Camarón, salmón y calamar" },
  { id: "pa5",  cat: "pastas", nm: "Risotto Especial",         precio: 20000, desc: "Camarón, salmón y calamar" },
  { id: "pa6",  cat: "pastas", nm: "Risotto Mixto",            precio: 18000, desc: "Dos ingredientes a elección" },
  { id: "pa9",  cat: "pastas", nm: "Risotto Clásico o Margarita", precio: 16000 },

  /* ---------- DE LA TIERRA + PARRILLADAS ---------- */
  { id: "cr8",  cat: "carnes", nm: "Lomo Vetado",               precio: 16900, tags: ["pedido"], desc: "Con una guarnición a elección" },
  { id: "cr13", cat: "carnes", nm: "Pollo Grillé",              precio: 16000, tags: ["pedido"] },
  { id: "cr5",  cat: "carnes", nm: "Lomo Salteado",             precio: 20000, tags: ["pedido"], img: "assets/img/platos/lomo-salteado.webp" },
  { id: "cr3",  cat: "carnes", nm: "Lomo Vetado a lo Pobre",    precio: 22000 },
  { id: "cr7",  cat: "carnes", nm: "Lomo Vetado a lo Rico",     precio: 18000, desc: "Con tocino ahumado y hojas verdes" },
  { id: "cr21", cat: "carnes", nm: "Lomo Vetado Doña Filomena", precio: 19900 },
  { id: "cr4",  cat: "carnes", nm: "Lomo Vetado con Fetuccini", precio: 25000 },
  { id: "cr22", cat: "carnes", nm: "Lomo Salteado con Fetuccini", precio: 25000 },
  { id: "cr23", cat: "carnes", nm: "Risotto con Lomo",          precio: 26000 },
  { id: "cr2",  cat: "carnes", nm: "Lomo Tilama",               precio: 19000, desc: "Con queso de cabra fundido y champiñones" },
  { id: "cr6",  cat: "carnes", nm: "Lomo con Papas Boulangère", precio: 19000 },
  { id: "cr1",  cat: "carnes", nm: "Filete Doña Filomena",      precio: 19900, desc: "Filete de res sobre reducción de vino tinto" },
  { id: "cr24", cat: "carnes", nm: "Filete con Agregado",       precio: 18000 },
  { id: "cr10", cat: "carnes", nm: "Plateada al Jugo",          precio: 16000 },
  { id: "cr9",  cat: "carnes", nm: "Pollo a lo Pobre",          precio: 20000 },
  { id: "cr11", cat: "carnes", nm: "Salteado de Carne",         precio: 16900 },
  { id: "cr12", cat: "carnes", nm: "Salteado de Pollo",         precio: 15900 },
  { id: "cr16", cat: "carnes", nm: "Chuleta de Cerdo con Salsa de Champiñón", precio: 16900 },
  { id: "cr15", cat: "carnes", nm: "Milanesa de Carne o de Pollo", precio: 17000 },
  { id: "cr14", cat: "carnes", nm: "Escalopa Kayser de Carne o de Pollo", precio: 18000 },
  { id: "cr25", cat: "carnes", nm: "Bajo en Calorías de Pollo", precio: 18000 },
  { id: "cr17", cat: "carnes", nm: "Parrillada para 2",         precio: 54900, img: "assets/img/platos/parrillada.webp" },
  { id: "cr18", cat: "carnes", nm: "Parrillada para 3",         precio: 65900 },
  { id: "cr19", cat: "carnes", nm: "Parrillada para 4",         precio: 82500 },
  { id: "cr20", cat: "carnes", nm: "Parrillada Premium",        precio: 88000, desc: "Incluye 2 agregados y papas cocidas" },

  /* ---------- ENSALADAS Y AGREGADOS ---------- */
  { id: "en5",  cat: "ensaladas", nm: "César Valenzuela",     precio: 10000, tags: ["pedido"], desc: "Salsa césar, pollo grillé, crutones y parmesano" },
  { id: "en1",  cat: "ensaladas", nm: "Marinera",             precio: 13000, tags: ["pedido"], img: "assets/img/platos/ensalada-marinera.webp", desc: "Salmón marinado, camarones, espinaca, palta y aceitunas" },
  { id: "en9",  cat: "ensaladas", nm: "César con Camarones",  precio: 15000 },
  { id: "en2",  cat: "ensaladas", nm: "Alianza",              precio: 12000, img: "assets/img/platos/ensalada-alianza.webp", desc: "Timbal de quinoa con palta y camarones salteados" },
  { id: "en3",  cat: "ensaladas", nm: "Del Huerto",           precio: 11000, img: "assets/img/platos/ensalada-del-huerto.webp", desc: "Lechuga, palta, tomate, palmito, queso de cabra, champiñón y albahaca" },
  { id: "en4",  cat: "ensaladas", nm: "Roquefort",            precio: 11000, desc: "Palta, roquefort, pollo grillé, tomate y aceitunas" },
  { id: "en7",  cat: "ensaladas", nm: "Corazón Los Vilos",    precio: 10000, desc: "Tomate, queso de cabra, albahaca y aceitunas de Azapa" },
  { id: "en6",  cat: "ensaladas", nm: "Palo Buque",           precio: 10000, desc: "Atún, rúcula, palta, nueces y champiñón" },
  { id: "en8",  cat: "ensaladas", nm: "Surtida",              precio: 8000 },
  { id: "en11", cat: "ensaladas", nm: "Apio, Tomate y Palta", precio: 6200 },
  { id: "en10", cat: "ensaladas", nm: "Palta",                precio: 6000 },
  { id: "en12", cat: "ensaladas", nm: "Chilena, Apio Palta, Tomate o Verde", precio: 5800 },
  { id: "tb13", cat: "ensaladas", nm: "Papas Fritas",         precio: 5200 },
  { id: "ag1",  cat: "ensaladas", nm: "Papas Doradas o Papa Rústica", precio: 4900 },
  { id: "ag2",  cat: "ensaladas", nm: "Papas Mayo",           precio: 4500 },
  { id: "ag3",  cat: "ensaladas", nm: "Puré",                 precio: 3800 },
  { id: "ag4",  cat: "ensaladas", nm: "Arroz",                precio: 2900 },
  { id: "ag5",  cat: "ensaladas", nm: "Pan de Ajo o Camote",  precio: 2000 },

  /* ---------- PARA LOS NIÑOS ---------- */
  { id: "ni1", cat: "ninos", nm: "Nuggets",       precio: 6900, tags: ["pedido"], desc: "Seis nuggets con arroz o papas fritas" },
  { id: "ni2", cat: "ninos", nm: "Brochetas",     precio: 6900, desc: "Pollo y vienesa con arroz o papas fritas" },
  { id: "ni3", cat: "ninos", nm: "Fetuccini",     precio: 6900, desc: "Alfredo, boloñesa o pesto" },
  { id: "ni4", cat: "ninos", nm: "Hamburguesa",   precio: 6900, desc: "Con papas fritas" },

  /* ---------- POSTRES ---------- */
  { id: "po3",  cat: "postres", nm: "Porción de Torta",        precio: 4900, tags: ["pedido"], img: "assets/img/postres.webp", desc: "Amor, chocolate especial, moka, italiana, alpina, 7 sabores, zanahoria nuez, tres leches o tiramisú" },
  { id: "po10", cat: "postres", nm: "Pie de Limón",            precio: 4500, tags: ["pedido"] },
  { id: "po9",  cat: "postres", nm: "Cheesecake",              precio: 4500, tags: ["pedido"], desc: "Frutos rojos o maracuyá" },
  { id: "po1",  cat: "postres", nm: "Copa de Postre Tres Leches", precio: 4900, img: "assets/img/platos/tres-leches.webp" },
  { id: "po2",  cat: "postres", nm: "Copa de Postre Tiramisú", precio: 4900, img: "assets/img/platos/tiramisu.webp" },
  { id: "po5",  cat: "postres", nm: "Brownie con Helado",      precio: 4900 },
  { id: "po4",  cat: "postres", nm: "Panqueque Celestino",     precio: 4900, desc: "Relleno de manjar, con una bola de helado" },
  { id: "po8",  cat: "postres", nm: "Copa de Helado",          precio: 4700, desc: "Tres sabores con salsa de chocolate" },
  { id: "po11", cat: "postres", nm: "Pote de Tres Leches",     precio: 3900, desc: "Para llevar" },
  { id: "po12", cat: "postres", nm: "Pote de Tiramisú",        precio: 3900, desc: "Para llevar" },
  { id: "po13", cat: "postres", nm: "Kuchen de Manzana o Durazno", precio: 3500 },
  { id: "po14", cat: "postres", nm: "Postre de la Casa",       precio: 2500 },
  { id: "po15", cat: "postres", nm: "Mini Mil Hojas",          precio: 2000 },
  { id: "po16", cat: "postres", nm: "Chilenitos",              precio: 1600 },
  { id: "po18", cat: "postres", nm: "Profiterol",              precio: 1000 },
  { id: "po17", cat: "postres", nm: "Alfajor de Chocolate",    precio: 1000 },

  /* ---------- CAFÉ Y TÉ ---------- */
  { id: "cf8",  cat: "cafe", nm: "Té de Hoja",       precio: 2900, tags: ["pedido"] },
  { id: "cf2",  cat: "cafe", nm: "Café Americano",   precio: 3300, tags: ["pedido"] },
  { id: "cf3",  cat: "cafe", nm: "Café Espresso",    precio: 3000 },
  { id: "cf1",  cat: "cafe", nm: "Espresso Doble",   precio: 3600 },
  { id: "cf4",  cat: "cafe", nm: "Cappuccino",       precio: 3000 },
  { id: "cf5",  cat: "cafe", nm: "Latte",            precio: 3000 },
  { id: "cf6",  cat: "cafe", nm: "Mokaccino",        precio: 3000 },
  { id: "po6",  cat: "cafe", nm: "Café Helado",      precio: 4900, img: "assets/img/platos/cafe-helado.webp" },
  { id: "cf9",  cat: "cafe", nm: "Té de Hierbas",    precio: 2900 },
  { id: "cf10", cat: "cafe", nm: "Nescafé grande",   precio: 3000 },
  { id: "cf11", cat: "cafe", nm: "Nescafé chico",    precio: 2200 },

  /* ---------- JUGOS Y BEBIDAS ---------- */
  { id: "b1",  cat: "jugos", nm: "Jugo de Mango",              precio: 4200, tags: ["pedido"], img: "assets/img/jugo.webp" },
  { id: "b5",  cat: "jugos", nm: "Limonada Menta Jengibre",    precio: 4200, tags: ["pedido"] },
  { id: "b17", cat: "jugos", nm: "Jugo de Maracuyá",           precio: 4200 },
  { id: "b13", cat: "jugos", nm: "Tres Marías",                precio: 4200, desc: "Manzana, mango y maracuyá" },
  { id: "b14", cat: "jugos", nm: "San Luis",                   precio: 4200, desc: "Pepino, limón y menta" },
  { id: "b18", cat: "jugos", nm: "Abrazote",                   precio: 4200, desc: "Arándanos, manzana y leche condensada" },
  { id: "b2",  cat: "jugos", nm: "Jugo de Piña, Frutilla o Sandía", precio: 4000 },
  { id: "b3",  cat: "jugos", nm: "Jugo con Leche, Mixto o Mango Mixto", precio: 4400 },
  { id: "b4",  cat: "jugos", nm: "Limonada Tradicional",       precio: 4000 },
  { id: "b8",  cat: "jugos", nm: "Bebida lata 350 cc",         precio: 2900 },
  { id: "b9",  cat: "jugos", nm: "Agua con o sin gas",         precio: 2900 },
  { id: "b11", cat: "jugos", nm: "Red Bull",                   precio: 2800 },

  /* ---------- JARRAS 1,5 L ---------- */
  { id: "j3",  cat: "jarras", nm: "Jarra Limonada Menta Jengibre", precio: 16000, tags: ["pedido"], img: "assets/img/platos/jarra-limonada.webp" },
  { id: "j13", cat: "jarras", nm: "Jarra Limonada",            precio: 15500 },
  { id: "j1",  cat: "jarras", nm: "Jarra de Jugo Natural",     precio: 16500, img: "assets/img/platos/jarra-jugo.webp", desc: "Piña, maracuyá, Tres Marías, sandía o frutilla" },
  { id: "j2",  cat: "jarras", nm: "Jarra de Mango",            precio: 17000 },
  { id: "j7",  cat: "jarras", nm: "Jarra de Sangría",          precio: 18000 },
  { id: "j11", cat: "jarras", nm: "Jarra de Pisco Sour",       precio: 30000 },

  /* ---------- SCHOP Y CERVEZAS ---------- */
  { id: "c17", cat: "schop", nm: "Schop Estela 500 cc",        precio: 5500, tags: ["pedido"] },
  { id: "c16", cat: "schop", nm: "Schop Calafate 500 cc",      precio: 6500, tags: ["pedido"] },
  { id: "c15", cat: "schop", nm: "Schop Torobayo 500 cc",      precio: 6500, tags: ["pedido"] },
  { id: "c18", cat: "schop", nm: "Schop Royal o Budweiser 500 cc", precio: 5500 },
  { id: "c19", cat: "schop", nm: "Schop Corona 500 cc",        precio: 6500 },
  { id: "c20", cat: "schop", nm: "Schop XL 1000 cc Estela",    precio: 10500 },
  { id: "c21", cat: "schop", nm: "Schop XL 1000 cc Royal",     precio: 12000 },
  { id: "c12", cat: "schop", nm: "Schop XL 1000 cc Calafate, Torobayo o Corona", precio: 13000 },
  { id: "c3",  cat: "schop", nm: "Kunstmann Torobayo 330 cc",  precio: 4000 },
  { id: "c1",  cat: "schop", nm: "Austral Calafate, Corona o Sol 330 cc", precio: 3800 },
  { id: "c7",  cat: "schop", nm: "Sin alcohol: Kunstmann o Corona", precio: 3800 },
  { id: "c8",  cat: "schop", nm: "Heineken 0.0",               precio: 3500 },
  { id: "c10", cat: "schop", nm: "Vaso michelado",             precio: 1500 },
  { id: "c9",  cat: "schop", nm: "Vaso chelado",               precio: 1300 },

  /* ---------- MOJITOS ---------- */
  { id: "mj2", cat: "mojitos", nm: "Mojito de Sabores", precio: 8000, tags: ["pedido"], desc: "Mango, maracuyá, frutos rojos o manzana jengibre" },
  { id: "mj3", cat: "mojitos", nm: "Mojito Cubano",     precio: 8000, tags: ["pedido"], desc: "Havana Club, limón macerado, hierba buena y azúcar flor" },
  { id: "mj7", cat: "mojitos", nm: "Mojito Honey",      precio: 9000 },
  { id: "mj6", cat: "mojitos", nm: "Mojito Jäger",      precio: 9000 },
  { id: "mj8", cat: "mojitos", nm: "Mojito Irlandés",   precio: 9000 },
  { id: "mj4", cat: "mojitos", nm: "Mojito de Cerveza", precio: 11000 },
  { id: "mj5", cat: "mojitos", nm: "Mojito Espumante",  precio: 11000 },

  /* ---------- SOUR Y CATEDRALES ---------- */
  { id: "so7",  cat: "sours", nm: "Pisco Sour Peruano (Barsol)", precio: 6500, tags: ["pedido"] },
  { id: "so12", cat: "sours", nm: "Catedral Peruano (Barsol)",  precio: 11000, tags: ["pedido"] },
  { id: "so1",  cat: "sours", nm: "Sour de la Casa Doña Filomena", precio: 7000, tags: ["casa"], desc: "Pisco macerado en granadina, toque de maracuyá y hierba buena" },
  { id: "so8",  cat: "sours", nm: "Pisco Sour Nacional",        precio: 5500 },
  { id: "so4",  cat: "sours", nm: "Sour Macerado",              precio: 6000 },
  { id: "so5",  cat: "sours", nm: "Mango Sour",                 precio: 6500 },
  { id: "so6",  cat: "sours", nm: "Maracuyá Sour",              precio: 6500 },
  { id: "so10", cat: "sours", nm: "Amaretto Sour",              precio: 5500 },
  { id: "so13", cat: "sours", nm: "Chardonnay Sour",            precio: 5500 },
  { id: "so9",  cat: "sours", nm: "Whisky Sour Jack Daniel's",  precio: 7500 },
  { id: "so14", cat: "sours", nm: "Pisco Sour Ocucaje",         precio: 8000 },
  { id: "ct5",  cat: "sours", nm: "Macerado de Maíz Morado",    precio: 8500, img: "assets/img/platos/macerado-maiz-morado.webp" },
  { id: "so11", cat: "sours", nm: "Catedral Nacional",          precio: 10000 },
  { id: "so3",  cat: "sours", nm: "Catedral Macerado, Mango u Horcón Quemado", precio: 12500 },
  { id: "so15", cat: "sours", nm: "Catedral Ocucaje",           precio: 14500 },
  { id: "so16", cat: "sours", nm: "Catedral Pisco Waqar",       precio: 16000 },
  { id: "so17", cat: "sours", nm: "Catedral Aldabas de Portón o Tololo", precio: 17000 },

  /* ---------- COCTELERÍA ---------- */
  { id: "ct1",  cat: "cocteles", nm: "Filomena Pasión",   precio: 10000, tags: ["casa"], img: "assets/img/platos/filomena-pasion.webp", desc: "El cóctel de la casa: Mal Paso, Malibú, licor de melón, maracuyá y limón" },
  { id: "ct3",  cat: "cocteles", nm: "Tinto Cavancha",    precio: 7500,  tags: ["pedido"], img: "assets/img/platos/tinto-cavancha.webp", desc: "Vino tinto, vodka, Sprite, limón y frutos dulces" },
  { id: "ct8",  cat: "cocteles", nm: "Ramazzotti",        precio: 7500,  tags: ["pedido"], img: "assets/img/platos/ramazzotti.webp", desc: "Ramazzotti, naranja y espumante brut" },
  { id: "ct6",  cat: "cocteles", nm: "Marilyn Monroe",    precio: 9500,  img: "assets/img/platos/marilyn-monroe.webp", desc: "Vodka, piña o frutilla, leche condensada y crema de coco" },
  { id: "ct4",  cat: "cocteles", nm: "El Santo",          precio: 8500,  desc: "Absolut Pears, pepino, maracuyá y St. Germain" },
  { id: "ct7",  cat: "cocteles", nm: "Piña Colada",       precio: 8000,  img: "assets/img/platos/pina-colada.webp" },
  { id: "ct19", cat: "cocteles", nm: "Aperol Mara",       precio: 7500,  desc: "Aperol, espumante brut y maracuyá" },
  { id: "ct14", cat: "cocteles", nm: "Caipiriña",         precio: 7500 },
  { id: "ct15", cat: "cocteles", nm: "Negroni",           precio: 7500 },
  { id: "ct20", cat: "cocteles", nm: "Ruso Blanco",       precio: 7500 },
  { id: "ct2",  cat: "cocteles", nm: "Romeo",             precio: 7000,  img: "assets/img/platos/romeo.webp", desc: "Blue rasp, curaçao, licor de saúco, limón y el secreto de la casa" },
  { id: "ct11", cat: "cocteles", nm: "Margarita Frozen",  precio: 7000,  img: "assets/img/platos/margarita-frozen.webp" },
  { id: "ct21", cat: "cocteles", nm: "Daiquiri Frozen de Frutilla", precio: 7000 },
  { id: "ct16", cat: "cocteles", nm: "Mai Tai",           precio: 7000 },
  { id: "ct9",  cat: "cocteles", nm: "Pantera Rosa",      precio: 7000,  img: "assets/img/platos/pantera-rosa.webp", desc: "Crema, vodka, piña y granadina" },
  { id: "ct10", cat: "cocteles", nm: "Bloody Mary",       precio: 7000,  img: "assets/img/platos/bloody-mary.webp" },
  { id: "ct13", cat: "cocteles", nm: "Aperol Spritz",     precio: 6500 },
  { id: "ct17", cat: "cocteles", nm: "Tequila Margarita", precio: 6500 },
  { id: "ct22", cat: "cocteles", nm: "Cosmopolitan",      precio: 6500 },
  { id: "ct23", cat: "cocteles", nm: "Tom Collins",       precio: 6500 },
  { id: "ct24", cat: "cocteles", nm: "Tequila Sunrise",   precio: 6500 },
  { id: "ct25", cat: "cocteles", nm: "Clavo Oxidado",     precio: 6500 },
  { id: "ct18", cat: "cocteles", nm: "Daiquiri de Sabores", precio: 6000 },
  { id: "ct26", cat: "cocteles", nm: "Mimosa",            precio: 6000 },
  { id: "ct27", cat: "cocteles", nm: "Bellini",           precio: 6000 },
  { id: "ct28", cat: "cocteles", nm: "Ruso Negro",        precio: 6000 },
  { id: "ct12", cat: "cocteles", nm: "Espresso Martini",  precio: 5500,  img: "assets/img/platos/espresso-martini.webp" },
  { id: "ct29", cat: "cocteles", nm: "Dry Martini",       precio: 5500 },
  { id: "ct30", cat: "cocteles", nm: "Champán Berry",     precio: 5500 },

  /* ---------- VINOS Y DESTILADOS ---------- */
  { id: "vn1",  cat: "vinos", nm: "Copa de Vino",                   precio: 4900, desc: "Cabernet, Carmenere, Chardonnay o Sauvignon Blanc" },
  { id: "vn2",  cat: "vinos", nm: "Copa Reserva",                   precio: 5500, desc: "Misiones de Rengo, Castillo de Molina o Sierra Batuco" },
  { id: "vn3",  cat: "vinos", nm: "Copa de Espumante Valdivieso",   precio: 5500 },
  { id: "vn4",  cat: "vinos", nm: "Carmen Rosé",                    precio: 9900 },
  { id: "vn5",  cat: "vinos", nm: "Misiones de Rengo Cabernet o Varietal", precio: 14000 },
  { id: "vn6",  cat: "vinos", nm: "Misiones de Rengo Sauvignon Blanc", precio: 15000 },
  { id: "vn7",  cat: "vinos", nm: "Espumante BLX",                  precio: 15900 },
  { id: "vn8",  cat: "vinos", nm: "Misiones de Rengo Reserva Carmenere", precio: 18000 },
  { id: "vn9",  cat: "vinos", nm: "Castillo de Molina Gran Reserva Carmenere", precio: 21000 },
  { id: "vn10", cat: "vinos", nm: "Casillero del Diablo Chardonnay", precio: 21000 },
  { id: "vn11", cat: "vinos", nm: "Terranoble Civis",               precio: 22000 },
  { id: "vn12", cat: "vinos", nm: "Don Matías Gran Reserva Cabernet", precio: 27000 },
  { id: "vn13", cat: "vinos", nm: "Toro de Piedra Gran Reserva",    precio: 29990, desc: "Carmenere o Sauvignon Blanc" },
  { id: "ds1",  cat: "vinos", nm: "Pisco Mistral 35° o Alto del Carmen 35°", precio: 5500 },
  { id: "ds2",  cat: "vinos", nm: "Pisco Mistral 40° u Horcón Quemado 35°", precio: 6200 },
  { id: "ds3",  cat: "vinos", nm: "Pisco Mistral Nobel 40°",        precio: 6500 },
  { id: "ds4",  cat: "vinos", nm: "Pisco Horcón Quemado",           precio: 7900 },
  { id: "ds5",  cat: "vinos", nm: "Ron Havana Club Especial",       precio: 6900 },
  { id: "ds6",  cat: "vinos", nm: "Ron Havana Club 7 años",         precio: 8000 },
  { id: "ds7",  cat: "vinos", nm: "Ron Selección de Maestros",      precio: 7500 },
  { id: "ds8",  cat: "vinos", nm: "Johnnie Walker Red",             precio: 7000 },
  { id: "ds9",  cat: "vinos", nm: "Johnnie Walker Black",           precio: 8500 },
  { id: "ds10", cat: "vinos", nm: "Jack Daniel's",                  precio: 8000 },
  { id: "ds11", cat: "vinos", nm: "Jack Daniel's Honey o Fire",     precio: 8500 },
  { id: "ds12", cat: "vinos", nm: "Gin Beefeater",                  precio: 7000 },
  { id: "ds13", cat: "vinos", nm: "Gin Bombay",                     precio: 7500 },
  { id: "ds14", cat: "vinos", nm: "Gin Hendrick's",                 precio: 10500 },
  { id: "ds15", cat: "vinos", nm: "Vodka Absolut",                  precio: 6500 },
  { id: "ds16", cat: "vinos", nm: "Fernet Branca",                  precio: 7000 },
  { id: "ds17", cat: "vinos", nm: "Amaretto Disaronno",             precio: 6000 },
  { id: "ds18", cat: "vinos", nm: "Bajativo",                       precio: 4500, desc: "Araucano, menta, manzanilla, amaretto, Jägermeister o crema de tequila" },
  { id: "ds19", cat: "vinos", nm: "Mini Bajativo",                  precio: 1800 }
];

/* Sugerencias del carrito cuando no hay bebida */
const SUGERENCIAS = ["b1", "b5", "b8"];

/* Opiniones en Google (local Península). Datos de la ficha de Google al 11-11-2026.
   Actualiza estos números cuando cambien. */
const GOOGLE = {
  nota: 4.2,
  total: 2358,
  cincoEstrellas: 1307,
  cuatroEstrellas: 542,
  placeId: "ChIJM-gN6PQTUpER0H4YFbjtBeo"
};

/* Reseñas destacadas de Google (texto real, recortado donde hay "…").
   Para sumar más: { txt: "Texto", autor: "Nombre A.", estrellas: 5, cuando: "hace 2 meses" } */
const RESENAS = [
  { txt: "Si bien la comida es excelente y el ambiente es muy agradable, el verdadero valor de este restaurante está en su gente. Los empleados son súper amables, rápidos y conocen el menú a la perfección… ¡Un 10 absoluto para todo el equipo!", autor: "Lisbeth M.", estrellas: 5 },
  { txt: "Me gustó el risotto de camarones y pailas; mi esposo e hija pidieron pastas con camarones y pulpo, todo muy rico, hasta la hamburguesa. La comida es abundante y sabrosa. Los jugos naturales son deliciosos. La atención muy buena, no hay pretexto para no volver.", autor: "Vanesa A.", estrellas: 5 }
];

/* Publicaciones de Instagram (imagen + enlace).
   Para enlazar un post específico, reemplaza url por el link del post. */
const IG = "https://www.instagram.com/donafilomenarestaurant/";
const INSTAGRAM_POSTS = [
  { img: "assets/img/ig-1.webp", alt: "Delivery gratis en Península", url: IG },
  { img: "assets/img/platos/filomena-pasion.webp", alt: "Cóctel de la casa Filomena Pasión", url: IG },
  { img: "assets/img/ig-3.webp", alt: "Pide tu empanada favorita y recibe en casa", url: IG },
  { img: "assets/img/platos/jardin-del-mar.webp", alt: "Tabla Jardín del Mar", url: IG },
  { img: "assets/img/platos/tinto-cavancha.webp", alt: "Tinto Cavancha, de la barra", url: IG },
  { img: "assets/img/platos/tres-leches.webp", alt: "Copa tres leches", url: IG },
  { img: "assets/img/ig-5.webp", alt: "Promo pizza familiar con bebida gratis", url: IG },
  { img: "assets/img/platos/jarra-limonada.webp", alt: "Jarra de limonada menta jengibre", url: IG }
];
