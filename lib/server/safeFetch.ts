import "server-only";
import dns from "node:dns";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import zlib from "node:zlib";
import type { LookupFunction } from "node:net";

// Bezpieczne pobieranie cudzych stron (np. sklepu) na serwerze – ochrona przed SSRF:
// tylko http/https i porty 80/443, żadnych adresów prywatnych ani lokalnych – sprawdzane przy każdym
// połączeniu (także po przekierowaniu), limit czasu, rozmiaru i liczby przekierowań.

const blocked4 = new net.BlockList();
const blocked6 = new net.BlockList();
for (const [addr, prefix] of [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8], ["169.254.0.0", 16], ["172.16.0.0", 12],
  ["192.0.0.0", 24], ["192.0.2.0", 24], ["192.88.99.0", 24], ["192.168.0.0", 16], ["198.18.0.0", 15], ["198.51.100.0", 24],
  ["203.0.113.0", 24], ["224.0.0.0", 4], ["240.0.0.0", 4],
] as const) blocked4.addSubnet(addr, prefix, "ipv4");
for (const [addr, prefix] of [
  ["::", 128], ["::1", 128], ["::ffff:0:0", 96], ["64:ff9b::", 96], ["64:ff9b:1::", 48], ["100::", 64], ["2001::", 23],
  ["2001:db8::", 32], ["2002::", 16], ["fc00::", 7], ["fe80::", 10], ["fec0::", 10], ["ff00::", 8],
] as const) blocked6.addSubnet(addr, prefix, "ipv6");

export function isBlockedIp(ip: string) {
  const family = net.isIP(ip);
  if (family === 4) return blocked4.check(ip, "ipv4");
  if (family === 6) {
    // Adres IPv4 zapisany jako IPv6 (::ffff:10.0.0.1) sprawdzamy jak IPv4
    const mapped = ip.toLowerCase().match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return blocked4.check(mapped[1], "ipv4");
    return blocked6.check(ip, "ipv6");
  }
  return true;
}

export class FetchBlockedError extends Error {}

// Zamiana nazwy na adres z odrzuceniem adresów prywatnych – działa w chwili łączenia, więc sztuczka
// „najpierw publiczny adres, potem prywatny” (DNS rebinding) nie przejdzie.
const safeLookup: LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { all: true, verbatim: true }, (err, addresses) => {
    if (err) return callback(err, "", 0);
    const list = addresses as dns.LookupAddress[];
    if (!list.length || list.some((a) => isBlockedIp(a.address))) {
      return callback(new FetchBlockedError(`Zablokowany adres: ${hostname}`), "", 0);
    }
    const wanted = typeof options === "object" && options?.family ? list.find((a) => a.family === options.family) : undefined;
    const pick = wanted ?? list[0];
    if (typeof options === "object" && options?.all) return (callback as (e: null, a: dns.LookupAddress[]) => void)(null, [pick]);
    callback(null, pick.address, pick.family);
  });
};

export function checkUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new FetchBlockedError("Niepoprawny adres");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new FetchBlockedError("Tylko http i https");
  if (url.username || url.password) throw new FetchBlockedError("Adres z hasłem");
  const port = url.port || (url.protocol === "https:" ? "443" : "80");
  if (port !== "80" && port !== "443") throw new FetchBlockedError("Niedozwolony port");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host) && isBlockedIp(host)) throw new FetchBlockedError("Adres prywatny");
  if (/^(localhost|.*\.localhost|.*\.local|.*\.internal)$/i.test(host)) throw new FetchBlockedError("Adres lokalny");
  return url;
}

type Options = { maxBytes: number; timeoutMs?: number; maxRedirects?: number; accept?: string };
export type SafeResponse = { url: URL; status: number; contentType: string; body: Buffer };

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36 Gviazdka-podglad-linku";

export async function safeFetch(raw: string, { maxBytes, timeoutMs = 5000, maxRedirects = 3, accept = "text/html,application/xhtml+xml" }: Options): Promise<SafeResponse> {
  const deadline = Date.now() + timeoutMs;
  let url = checkUrl(raw);
  for (let hop = 0; hop <= maxRedirects; hop++) {
    const res = await requestOnce(url, { maxBytes, deadline, accept });
    if (res.redirect) {
      if (hop === maxRedirects) throw new FetchBlockedError("Za dużo przekierowań");
      url = checkUrl(new URL(res.redirect, url).toString());
      continue;
    }
    return { url, status: res.status, contentType: res.contentType, body: res.body! };
  }
  throw new FetchBlockedError("Za dużo przekierowań");
}

function requestOnce(url: URL, { maxBytes, deadline, accept }: { maxBytes: number; deadline: number; accept: string }) {
  return new Promise<{ status: number; contentType: string; redirect?: string; body?: Buffer }>((resolve, reject) => {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return reject(new FetchBlockedError("Przekroczony czas"));
    const lib = url.protocol === "https:" ? https : http;
    const req = lib.request(
      url,
      {
        method: "GET",
        lookup: safeLookup,
        agent: false,
        headers: {
          "User-Agent": BROWSER_UA,
          Accept: accept,
          "Accept-Language": "pl-PL,pl;q=0.9,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
        },
      },
      (res) => {
        const status = res.statusCode ?? 0;
        const contentType = String(res.headers["content-type"] ?? "").toLowerCase();
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          return resolve({ status, contentType, redirect: res.headers.location });
        }
        const declared = Number(res.headers["content-length"] ?? 0);
        if (declared > maxBytes * 4) {
          res.destroy();
          return reject(new FetchBlockedError("Za duża odpowiedź"));
        }
        const encoding = String(res.headers["content-encoding"] ?? "").toLowerCase();
        const stream =
          encoding === "gzip" ? res.pipe(zlib.createGunzip()) : encoding === "deflate" ? res.pipe(zlib.createInflate()) : encoding === "br" ? res.pipe(zlib.createBrotliDecompress()) : res;
        const chunks: Buffer[] = [];
        let size = 0;
        stream.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > maxBytes) {
            req.destroy();
            stream.destroy();
            // Dla strony HTML wystarczy początek (tam są znaczniki), dla obrazka to błąd
            if (accept.startsWith("text/html")) resolve({ status, contentType, body: Buffer.concat(chunks) });
            else reject(new FetchBlockedError("Za duży plik"));
            return;
          }
          chunks.push(chunk);
        });
        stream.on("end", () => resolve({ status, contentType, body: Buffer.concat(chunks) }));
        stream.on("error", reject);
      },
    );
    // Twardy limit całego pobierania (nie tylko ciszy na łączu)
    const timer = setTimeout(() => req.destroy(new FetchBlockedError("Przekroczony czas")), remaining);
    req.on("close", () => clearTimeout(timer));
    req.on("error", reject);
    req.end();
  });
}
