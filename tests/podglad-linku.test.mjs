// Testy „Wklej link”: ochrona przed SSRF i odczyt danych produktu.
// Uruchom: node tests/podglad-linku.test.mjs
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import http from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Pliki serwerowe mają „import server-only” (strażnik Next.js) – do testów go pomijamy.
const dir = mkdtempSync(join(tmpdir(), "gv-"));
for (const f of ["safeFetch", "productMeta"]) {
  const src = readFileSync(new URL(`../lib/server/${f}.ts`, import.meta.url), "utf8").replace('import "server-only";', "");
  writeFileSync(join(dir, `${f}.ts`), src);
}
const { isBlockedIp, checkUrl, safeFetch } = await import(pathToFileURL(join(dir, "safeFetch.ts")));
const { parseProduct, priceToGrosze, decodeHtml } = await import(pathToFileURL(join(dir, "productMeta.ts")));

let n = 0;
const test = async (name, fn) => {
  await fn();
  n++;
  console.log("ok –", name);
};

await test("adresy prywatne i lokalne są blokowane", () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.20.0.1", "192.168.1.1", "169.254.169.254", "0.0.0.0", "100.64.0.1", "::1", "::", "::ffff:127.0.0.1", "::ffff:10.0.0.1", "fd00::1", "fe80::1", "64:ff9b::7f00:1"])
    assert.equal(isBlockedIp(ip), true, ip);
  for (const ip of ["8.8.8.8", "151.101.1.140", "2a00:1450:4001:80b::200e"]) assert.equal(isBlockedIp(ip), false, ip);
});

await test("niebezpieczne adresy URL są odrzucane od razu", () => {
  for (const u of ["file:///etc/passwd", "ftp://example.com", "http://localhost/", "http://127.0.0.1/", "http://[::1]/", "http://10.0.0.5/", "http://2130706433/", "http://example.com:22/", "http://user:pass@example.com/", "http://sklep.internal/", "gopher://x"])
    assert.throws(() => checkUrl(u), u);
  assert.equal(checkUrl("https://www.empik.com/produkt").hostname, "www.empik.com");
});

await test("pobieranie z lokalnego serwera jest zablokowane (także przez nazwę)", async () => {
  const server = http.createServer((_, res) => res.end("tajne")).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  const port = server.address().port;
  await assert.rejects(safeFetch(`http://127.0.0.1:${port}/`, { maxBytes: 1000 }));
  await assert.rejects(safeFetch(`http://127.0.0.1/`, { maxBytes: 1000 }));
  server.close();
});

await test("ceny po polsku zamieniane na grosze", () => {
  assert.equal(priceToGrosze("129,99"), 12999);
  assert.equal(priceToGrosze("1 299,99 zł"), 129999);
  assert.equal(priceToGrosze("1.299,99"), 129999);
  assert.equal(priceToGrosze("1,299.99"), 129999);
  assert.equal(priceToGrosze("59.90"), 5990);
  assert.equal(priceToGrosze(199), 19900);
  assert.equal(priceToGrosze("abc"), undefined);
});

await test("JSON-LD Product/Offer ma pierwszeństwo", () => {
  const html = `<html><head><title>Sklep</title><meta property="og:title" content="OG tytuł">
  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList"},{"@type":"Product","name":"Szalik z wełny &amp; kaszmiru","image":["/img/szalik.jpg"],"offers":{"@type":"Offer","price":"129.99","priceCurrency":"PLN"}}]}</script>
  <meta property="og:site_name" content="Sklep Zima"></head></html>`;
  const p = parseProduct(html, new URL("https://sklep.pl/szalik"));
  assert.deepEqual(p, { title: "Szalik z wełny & kaszmiru", priceGrosze: 12999, image: "https://sklep.pl/img/szalik.jpg", store: "Sklep Zima" });
});

await test("bez JSON-LD: Open Graph i meta, cena w innej walucie pomijana", () => {
  const html = `<meta property="og:title" content="Klocki &#8211; stajnia"><meta property="og:image" content="https://cdn.x.pl/a.png">
  <meta property="product:price:amount" content="199,00"><meta property="product:price:currency" content="PLN">`;
  assert.deepEqual(parseProduct(html, new URL("https://www.smyk.com/p")), { title: "Klocki – stajnia", priceGrosze: 19900, image: "https://cdn.x.pl/a.png", store: "smyk.com" });
  const eur = `<meta property="og:title" content="Buty"><meta property="product:price:amount" content="50"><meta property="product:price:currency" content="EUR">`;
  assert.equal(parseProduct(eur, new URL("https://x.de")).priceGrosze, undefined);
});

await test("na końcu tytuł strony i kodowanie ISO-8859-2", () => {
  const body = Buffer.from([...Buffer.from("<html><head><meta charset=\"iso-8859-2\"><title>Ksi"), 0xb1, 0xbf, ...Buffer.from("ka</title></head></html>")]);
  const html = decodeHtml(body, "text/html");
  assert.equal(parseProduct(html, new URL("https://a.pl")).title, "Książka");
});

await test("strona zabezpieczenia przed robotami nie udaje produktu", () => {
  assert.deepEqual(parseProduct("<html><head><title>Just a moment...</title></head></html>", new URL("https://www.empik.com/p")), {});
});

console.log(`\nWszystkie testy „Wklej link” przeszły (${n}).`);
