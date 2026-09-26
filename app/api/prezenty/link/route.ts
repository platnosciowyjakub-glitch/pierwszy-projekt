import { NextResponse } from "next/server";
import { safeFetch } from "@/lib/server/safeFetch";
import { decodeHtml, parseProduct } from "@/lib/server/productMeta";
import { takeLinkQuota, userFromRequest } from "@/lib/server/userClient";

// „Wklej link – Gviazdka uzupełni resztę”: odczyt nazwy, ceny, zdjęcia i sklepu ze strony produktu.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const auth = await userFromRequest(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { url?: unknown } | null;
  const raw = typeof body?.url === "string" ? body.url.trim() : "";
  if (!raw || raw.length > 2000) return NextResponse.json({ error: "bad_url" }, { status: 400 });

  if (!(await takeLinkQuota(auth.supabase))) return NextResponse.json({ error: "limit" }, { status: 429 });

  try {
    const res = await safeFetch(raw, { maxBytes: 1_500_000 });
    if (res.status >= 400 || !/html|xml/.test(res.contentType)) return NextResponse.json({ url: res.url.toString() }, { status: 422 });
    const meta = parseProduct(decodeHtml(res.body, res.contentType), res.url);
    return NextResponse.json({ ...meta, url: raw });
  } catch {
    return NextResponse.json({ url: raw }, { status: 422 });
  }
}
