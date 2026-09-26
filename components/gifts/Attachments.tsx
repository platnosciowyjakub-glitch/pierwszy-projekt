"use client";

import { useEffect, useRef, useState } from "react";
import { gifts as t } from "@/content/gifts";
import { useGifts } from "@/lib/gifts/store";
import { ATTACHMENT_FIELDS, GIFT_BUCKET, type Attachment, type Gift } from "@/lib/gifts/types";
import { outlineBtn, quietBtn } from "@/components/gifts/ui";

// Zdjęcia i paragony prezentu. Pliki leżą w prywatnym schowku; otwieramy je przez link ważny 5 minut.

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

// Zdjęcie zmniejszone w przeglądarce do 1600 px (JPEG) – szybciej się wysyła i zajmuje mniej miejsca
async function shrinkImage(file: File): Promise<Blob> {
  if (file.type === "application/pdf") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

export function Attachments({ gift }: { gift: Gift }) {
  const { supabase } = useGifts();
  const a = t.attachments;
  const [items, setItems] = useState<Attachment[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const photoInput = useRef<HTMLInputElement>(null);
  const receiptInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase
      .from("gift_attachments")
      .select(ATTACHMENT_FIELDS)
      .eq("gift_id", gift.id)
      .order("created_at")
      .then(({ data }) => setItems((data as Attachment[]) ?? []));
  }, [supabase, gift.id]);

  async function upload(file: File | undefined, kind: Attachment["kind"]) {
    if (!file) return;
    if (!ALLOWED.includes(file.type)) return setError(a.badType);
    const blob = await shrinkImage(file);
    if (blob.size > MAX_BYTES) return setError(a.tooBig);
    setError("");
    setBusy(true);
    const mime = blob.type || file.type;
    const ext = mime === "application/pdf" ? "pdf" : mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
    const path = `${gift.list_id}/${gift.id}/${crypto.randomUUID()}.${ext}`;
    const up = await supabase.storage.from(GIFT_BUCKET).upload(path, blob, { contentType: mime });
    if (up.error) {
      setBusy(false);
      return setError(a.failed);
    }
    const { data, error } = await supabase
      .from("gift_attachments")
      .insert({ gift_id: gift.id, list_id: gift.list_id, storage_path: path, kind, mime, size_bytes: blob.size })
      .select(ATTACHMENT_FIELDS)
      .single();
    setBusy(false);
    if (error) {
      await supabase.storage.from(GIFT_BUCKET).remove([path]);
      return setError(a.failed);
    }
    setItems((xs) => [...xs, data as Attachment]);
  }

  async function open(item: Attachment) {
    // Okno otwieramy od razu (inaczej przeglądarka je zablokuje), adres wstawiamy po otrzymaniu linku
    const win = window.open("", "_blank");
    if (win) win.opener = null;
    const { data } = await supabase.storage.from(GIFT_BUCKET).createSignedUrl(item.storage_path, 300);
    if (data?.signedUrl) {
      if (win) win.location.href = data.signedUrl;
      else window.location.href = data.signedUrl;
    } else win?.close();
  }

  async function remove(item: Attachment) {
    const { error } = await supabase.from("gift_attachments").delete().eq("id", item.id);
    if (error) return setError(a.failed);
    await supabase.storage.from(GIFT_BUCKET).remove([item.storage_path]);
    setItems((xs) => xs.filter((x) => x.id !== item.id));
  }

  return (
    <section aria-label={a.title} className="rounded-panel border border-line p-4">
      <h3 className="text-sm font-semibold">{a.title}</h3>
      <p className="mt-0.5 text-sm text-moss">{a.hint}</p>
      {items.length > 0 && (
        <ul className="mt-3 divide-y divide-line">
          {items.map((item, i) => (
            <li key={item.id} className="flex items-center gap-2 py-1">
              <span className="min-w-0 flex-1 truncate text-sm">
                {item.kind === "receipt" ? a.receipt : a.photo} {i + 1} · {Math.max(1, Math.round(item.size_bytes / 1024))} KB
              </span>
              <button type="button" onClick={() => open(item)} className={quietBtn}>
                {a.open}
              </button>
              <button type="button" onClick={() => remove(item)} className={`${quietBtn} hover:text-cranberry`}>
                <span className="sr-only">{a.remove}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" tabIndex={-1} onChange={(e) => (upload(e.target.files?.[0], "photo"), (e.target.value = ""))} />
        <input ref={receiptInput} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className="sr-only" tabIndex={-1} onChange={(e) => (upload(e.target.files?.[0], "receipt"), (e.target.value = ""))} />
        <button type="button" disabled={busy} onClick={() => photoInput.current?.click()} className={outlineBtn}>
          {busy ? a.uploading : a.addPhoto}
        </button>
        <button type="button" disabled={busy} onClick={() => receiptInput.current?.click()} className={outlineBtn}>
          {a.addReceipt}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-cranberry">
          {error}
        </p>
      )}
    </section>
  );
}
