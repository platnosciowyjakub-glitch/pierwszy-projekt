import { NextResponse } from "next/server";
import { safeFetch } from "@/lib/server/safeFetch";
import { takeLinkQuota, userFromRequest } from "@/lib/server/userClient";

// Kopia zdjęcia produktu do prywatnego schowku (zamiast pokazywania obrazka prosto ze sklepu):
// sklep nie dowiaduje się, kto i kiedy ogląda listę, a zdjęcie nie zniknie. Zapis przez RLS – tylko do własnej listy.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Rozpoznanie obrazka po pierwszych bajtach, a nie po tym, co deklaruje serwer
function imageType(buf: Buffer): { mime: string; ext: string } | null {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { mime: "image/jpeg", ext: "jpg" };
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { mime: "image/png", ext: "png" };
  if (buf.length > 12 && buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") return { mime: "image/webp", ext: "webp" };
  return null;
}

export async function POST(req: Request) {
  const auth = await userFromRequest(req);
  if (!auth) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { url?: unknown; listId?: unknown } | null;
  const raw = typeof body?.url === "string" ? body.url.trim() : "";
  const listId = typeof body?.listId === "string" ? body.listId : "";
  if (!raw || raw.length > 2000 || !UUID.test(listId)) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  if (!(await takeLinkQuota(auth.supabase))) return NextResponse.json({ error: "limit" }, { status: 429 });

  try {
    const res = await safeFetch(raw, { maxBytes: 5 * 1024 * 1024, accept: "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.5" });
    const type = res.status < 400 ? imageType(res.body) : null;
    if (!type) return NextResponse.json({ error: "not_image" }, { status: 422 });
    const path = `${listId}/obrazy/${crypto.randomUUID()}.${type.ext}`;
    const { error } = await auth.supabase.storage.from("gift-files").upload(path, res.body, { contentType: type.mime });
    if (error) return NextResponse.json({ error: "upload" }, { status: 403 });
    return NextResponse.json({ path });
  } catch {
    return NextResponse.json({ error: "fetch" }, { status: 422 });
  }
}
