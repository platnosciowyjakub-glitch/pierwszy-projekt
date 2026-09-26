import "server-only";

// Odczyt nazwy, ceny, zdjęcia i sklepu ze strony produktu.
// Kolejność: dane strukturalne (JSON-LD Product/Offer), Open Graph i meta tagi, na końcu <title>.

export type ProductMeta = { title?: string; priceGrosze?: number; image?: string; store?: string };

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

export function decodeEntities(text: string) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(Number.parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

function attr(tag: string, name: string) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? decodeEntities(m[2] ?? m[3] ?? m[4] ?? "") : undefined;
}

function metaTags(html: string) {
  const map = new Map<string, string>();
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = (attr(tag, "property") ?? attr(tag, "name") ?? attr(tag, "itemprop"))?.toLowerCase();
    const content = attr(tag, "content");
    if (key && content && !map.has(key)) map.set(key, content);
  }
  return map;
}

// „1 299,99”, „1299.99”, 129.9 → grosze
export function priceToGrosze(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) && value >= 0 ? Math.round(value * 100) : undefined;
  if (typeof value !== "string") return undefined;
  let s = value.replace(/[^\d.,]/g, "");
  if (!s) return undefined;
  if (s.includes(",") && s.includes(".")) s = s.lastIndexOf(",") > s.lastIndexOf(".") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "");
  else if (s.includes(",")) s = /,\d{1,2}$/.test(s) ? s.replace(",", ".") : s.replace(/,/g, "");
  else if ((s.match(/\./g) ?? []).length > 1 || /\.\d{3}$/.test(s)) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 && n < 10_000_000 ? Math.round(n * 100) : undefined;
}

type Json = Record<string, unknown>;

function* walk(node: unknown): Generator<Json> {
  if (Array.isArray(node)) for (const x of node) yield* walk(x);
  else if (node && typeof node === "object") {
    const obj = node as Json;
    yield obj;
    if (obj["@graph"]) yield* walk(obj["@graph"]);
    if (obj.mainEntity) yield* walk(obj.mainEntity);
  }
}

function isType(obj: Json, type: string) {
  const t = obj["@type"];
  return Array.isArray(t) ? t.includes(type) : t === type;
}

function firstImage(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return firstImage(value[0]);
  if (value && typeof value === "object") return firstImage((value as Json).url ?? (value as Json).contentUrl);
  return undefined;
}

function offerPrice(offers: unknown): number | undefined {
  for (const o of walk(offers)) {
    const currency = String(o.priceCurrency ?? "PLN").toUpperCase();
    if (currency !== "PLN") continue;
    const price = priceToGrosze(o.price ?? o.lowPrice);
    if (price !== undefined) return price;
    const spec = o.priceSpecification;
    if (spec) {
      const p = offerPrice(spec);
      if (p !== undefined) return p;
    }
  }
  return undefined;
}

function fromJsonLd(html: string): ProductMeta {
  for (const m of html.matchAll(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data: unknown;
    try {
      data = JSON.parse(m[1].trim());
    } catch {
      continue;
    }
    for (const obj of walk(data)) {
      if (!isType(obj, "Product") && !isType(obj, "ProductGroup")) continue;
      return {
        title: typeof obj.name === "string" ? decodeEntities(obj.name) : undefined,
        image: firstImage(obj.image),
        priceGrosze: offerPrice(obj.offers),
      };
    }
  }
  return {};
}

function storeFromHost(url: URL) {
  return url.hostname.replace(/^www\./, "");
}

function absolute(src: string | undefined, base: URL) {
  if (!src) return undefined;
  try {
    const u = new URL(src, base);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

// Strony „sprawdzamy, czy jesteś człowiekiem” zamiast produktu – wtedy nic nie odczytujemy
const CHALLENGE = /just a moment|attention required|access denied|are you a robot|captcha|verify you are human|security check|sprawdzanie przeglądarki/i;

export function parseProduct(html: string, pageUrl: URL): ProductMeta {
  const head = html.slice(0, 1_500_000);
  const rawTitle = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  if (CHALLENGE.test(rawTitle) && !/application\/ld\+json/i.test(head)) return {};
  const ld = fromJsonLd(head);
  const meta = metaTags(head);
  const titleTag = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];

  const title = ld.title ?? meta.get("og:title") ?? meta.get("twitter:title") ?? meta.get("name") ?? (titleTag ? decodeEntities(titleTag) : undefined);
  const metaCurrency = (meta.get("product:price:currency") ?? meta.get("og:price:currency") ?? meta.get("pricecurrency") ?? "PLN").toUpperCase();
  const metaPrice = metaCurrency === "PLN" ? priceToGrosze(meta.get("product:price:amount") ?? meta.get("og:price:amount") ?? meta.get("price")) : undefined;
  const image = absolute(ld.image ?? meta.get("og:image") ?? meta.get("og:image:secure_url") ?? meta.get("twitter:image") ?? meta.get("image"), pageUrl);
  // Niektóre sklepy wpisują w nazwę sklepu cały tytuł strony – wtedy wystarczy adres
  const siteName = meta.get("og:site_name");
  const store = siteName && siteName.length <= 30 && !siteName.includes("|") ? siteName : storeFromHost(pageUrl);

  return {
    title: title?.slice(0, 200) || undefined,
    priceGrosze: ld.priceGrosze ?? metaPrice,
    image,
    store: store.slice(0, 80),
  };
}

// Kodowanie strony (większość polskich sklepów ma UTF-8, starsze bywają w ISO-8859-2 / windows-1250)
export function decodeHtml(body: Buffer, contentType: string) {
  const fromHeader = contentType.match(/charset=([\w-]+)/i)?.[1];
  const sniff = body.subarray(0, 2048).toString("latin1").match(/<meta[^>]+charset=["']?([\w-]+)/i)?.[1];
  const charset = (fromHeader ?? sniff ?? "utf-8").toLowerCase();
  try {
    return new TextDecoder(charset).decode(body);
  } catch {
    return new TextDecoder("utf-8").decode(body);
  }
}
