#!/usr/bin/env node
/* ============================================================
   Importa la carta desde Justo y la compara con la de la web.
   Usa la API pública de Justo (la misma de su página de pedidos):
   no necesita contraseña ni token.

   Uso (Node 18 o superior):
     node tools/importar-justo.mjs --buscar "doña filomena"
     node tools/importar-justo.mjs --dominio pedidos.midominio.cl
     node tools/importar-justo.mjs --id <websiteId>

   Genera tools/justo-carta.json y muestra:
     · productos con precio distinto entre Justo y la web
     · productos que están solo en Justo o solo en la web
   No modifica assets/js/data.js: los cambios se aplican a mano.
   ============================================================ */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const API = "https://api.getjusto.com/graphql";
const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(process.argv.slice(2).map((a, i, l) => a.startsWith("--") ? [a.slice(2), l[i + 1]] : []).filter(x => x.length));

async function gql(query, variables = {}) {
  const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query, variables }) });
  const j = await r.json();
  if (j.errors?.length) throw new Error(j.errors.map(e => e.message).join(" · "));
  return j.data;
}
const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/empanada(s)?( de)?|emp\.|frita|al horno|horno/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
const clp = n => n == null ? "—" : "$" + Number(n).toLocaleString("es-CL");

if (args.buscar) {
  const d = await gql(`query($f: String){ publicWebsites(filter: $f, limit: 50){ totalCount items { _id name domain } } }`, { f: args.buscar });
  console.log(`${d.publicWebsites.totalCount} resultado(s) para "${args.buscar}":`);
  for (const w of d.publicWebsites.items) console.log(`  ${w._id}  ${w.name}${w.domain ? "  (" + w.domain + ")" : ""}`);
  process.exit(0);
}

let id = args.id;
if (!id && args.dominio) {
  const d = await gql(`query($d: String){ website(domain: $d){ _id name } }`, { d: args.dominio });
  if (!d.website) { console.error(`Justo no reconoce el dominio "${args.dominio}".`); process.exit(1); }
  id = d.website._id;
}
if (!id) { console.error("Indica --buscar, --dominio o --id (ver comentario al inicio del archivo)."); process.exit(1); }

const { website } = await gql(`query($w: ID){ website(websiteId: $w){ _id name domain logo { url } } }`, { w: id });
const { stores } = await gql(`query($w: ID){ stores(websiteId: $w){ items { _id name phone address { address } } } }`, { w: id });
console.log(`\nTienda: ${website.name}`);
for (const s of stores.items) console.log(`  Local: ${s.name} · ${s.address?.address || ""} · ${s.phone || ""}`);

const productos = [];
for (let page = 1; ; page++) {
  const { products } = await gql(`query($w: ID, $p: BigInt){ products(websiteId: $w, limit: 100, page: $p){ hasNextPage items {
    _id name description image { url } categories { name } availability { basePrice finalPrice available } } } }`, { w: id, p: page });
  for (const p of products.items) {
    const precios = (p.availability || []).map(a => a.finalPrice ?? a.basePrice).filter(n => n != null);
    productos.push({
      id: p._id, nombre: p.name, descripcion: p.description || "", foto: p.image?.url || null,
      categorias: (p.categories || []).map(c => c.name),
      precio: precios.length ? Math.min(...precios) : null,
      disponible: (p.availability || []).some(a => a.available)
    });
  }
  if (!products.hasNextPage) break;
}
writeFileSync(join(raiz, "tools/justo-carta.json"), JSON.stringify({ tienda: website, locales: stores.items, productos }, null, 2));
console.log(`\n${productos.length} productos guardados en tools/justo-carta.json`);

/* ---- comparación con la carta de la web ---- */
const ctx = {};
vm.createContext(ctx);
vm.runInContext(readFileSync(join(raiz, "assets/js/data.js"), "utf8") + ";this.MENU = MENU;", ctx);
const web = new Map(ctx.MENU.map(i => [norm(i.nm), i]));
const justo = new Map(productos.map(p => [norm(p.nombre), p]));

const distintos = [...justo].filter(([k, p]) => web.has(k) && p.precio != null && web.get(k).precio !== p.precio);
const soloJusto = [...justo].filter(([k]) => !web.has(k));
const soloWeb = [...web].filter(([k]) => !justo.has(k));

console.log(`\nPrecio distinto (${distintos.length}):`);
for (const [k, p] of distintos) console.log(`  ${p.nombre}: web ${clp(web.get(k).precio)} → Justo ${clp(p.precio)}`);
console.log(`\nSolo en Justo (${soloJusto.length}):`);
for (const [, p] of soloJusto) console.log(`  ${p.nombre} · ${clp(p.precio)} · ${p.categorias.join(", ")}`);
console.log(`\nSolo en la web (${soloWeb.length}):`);
for (const [, i] of soloWeb) console.log(`  ${i.nm} · ${clp(i.precio)}`);
