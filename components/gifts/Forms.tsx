"use client";

import { useId, useState, type FormEvent } from "react";
import { gifts as t } from "@/content/gifts";
import { fill } from "@/lib/plural";
import { groszeToInput, parseToGrosze } from "@/lib/money";
import { useGifts } from "@/lib/gifts/store";
import {
  AVATAR_COLORS,
  RELATIONS,
  STATUSES,
  type AvatarColor,
  type Gift,
  type GiftStatus,
  type OccasionType,
  type Priority,
  type Recipient,
  type Relation,
} from "@/lib/gifts/types";
import { Attachments } from "@/components/gifts/Attachments";
import { avatarSwatch, ErrorText, Field, inputClass, primaryBtn, quietBtn, Sheet } from "@/components/gifts/ui";

// ─── Osoba ────────────────────────────────────────────────────────────────────────────────
export function PersonForm({ open, onClose, person, onSaved }: { open: boolean; onClose: () => void; person?: Recipient; onSaved?: (r: Recipient) => void }) {
  return (
    <Sheet open={open} onClose={onClose} title={person ? t.personForm.titleEdit : t.personForm.titleNew}>
      <PersonFormBody person={person} onDone={(r) => (r && onSaved?.(r), onClose())} />
    </Sheet>
  );
}

function PersonFormBody({ person, onDone }: { person?: Recipient; onDone: (r?: Recipient) => void }) {
  const id = useId();
  const f = t.personForm;
  const { addRecipient, updateRecipient, removeRecipient } = useGifts();
  const [name, setName] = useState(person?.name ?? "");
  const [relation, setRelation] = useState<Relation>(person?.relation ?? "inne");
  const [budget, setBudget] = useState(groszeToInput(person?.budget_grosze ?? null));
  const [notes, setNotes] = useState(person?.notes ?? "");
  const [birthday, setBirthday] = useState(person?.birthday ?? "");
  const [color, setColor] = useState<AvatarColor>(person?.avatar_color ?? "sage");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const budgetGrosze = parseToGrosze(budget);
    if (!name.trim()) return setError(f.nameMissing);
    if (Number.isNaN(budgetGrosze)) return setError(t.giftForm.priceInvalid);
    setError("");
    setBusy(true);
    const input = { name: name.trim(), relation, budget_grosze: budgetGrosze, notes: notes.trim() || null, birthday: birthday || null, avatar_color: color };
    if (person) {
      const ok = await updateRecipient(person.id, input);
      setBusy(false);
      if (ok) onDone({ ...person, ...input });
    } else {
      const created = await addRecipient(input);
      setBusy(false);
      if (created) onDone(created);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Field id={`${id}-name`} label={f.name}>
        <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} autoComplete="off" placeholder={f.namePlaceholder} className={inputClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-rel`} label={f.relation}>
          <select id={`${id}-rel`} value={relation} onChange={(e) => setRelation(e.target.value as Relation)} className={inputClass}>
            {RELATIONS.map((r) => (
              <option key={r} value={r}>
                {t.relations[r]}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-budget`} label={f.budget}>
          <input id={`${id}-budget`} value={budget} onChange={(e) => setBudget(e.target.value)} inputMode="decimal" placeholder="np. 200" className={inputClass} />
        </Field>
      </div>
      <Field id={`${id}-notes`} label={f.notes}>
        <textarea id={`${id}-notes`} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1000} rows={3} placeholder={f.notesPlaceholder} className={`${inputClass} resize-y`} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-bday`} label={f.birthday}>
          <input id={`${id}-bday`} type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className={inputClass} />
        </Field>
        <fieldset>
          <legend className="mb-1.5 text-sm font-semibold">{f.color}</legend>
          <div className="flex flex-wrap gap-2">
            {AVATAR_COLORS.map((c) => (
              <label key={c} className="cursor-pointer">
                <input type="radio" name={`${id}-color`} value={c} checked={color === c} onChange={() => setColor(c)} className="peer sr-only" />
                <span className={`flex h-11 w-11 items-center justify-center rounded-full ring-offset-2 ring-offset-paper peer-checked:ring-2 peer-checked:ring-spruce peer-focus-visible:ring-2 peer-focus-visible:ring-cranberry ${avatarSwatch[c]}`}>
                  <span className="sr-only">{f.colors[c]}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <ErrorText>{error}</ErrorText>
      <button type="submit" disabled={busy} className={`${primaryBtn} w-full`}>
        {person ? f.save : f.add}
      </button>
      {person &&
        (confirming ? (
          <div role="alertdialog" aria-label={fill(f.removeConfirm, { name: person.name })} className="rounded-soft bg-cranberry/10 p-3">
            <p className="text-sm font-semibold text-cranberry">{fill(f.removeConfirm, { name: person.name })}</p>
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={() => setConfirming(false)} className={quietBtn}>
                {f.cancel}
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (await removeRecipient(person.id)) onDone();
                }}
                className={`${primaryBtn} min-h-11 px-5 text-sm`}
              >
                {f.yesRemove}
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirming(true)} className={`${quietBtn} w-full hover:text-cranberry`}>
            {f.remove}
          </button>
        ))}
    </form>
  );
}

// ─── Lista (okazja) ───────────────────────────────────────────────────────────────────────
export function ListForm({ open, onClose, mode }: { open: boolean; onClose: () => void; mode: "new" | "edit" }) {
  return (
    <Sheet open={open} onClose={onClose} title={mode === "new" ? t.list.formTitleNew : t.list.formTitleEdit}>
      <ListFormBody mode={mode} onDone={onClose} />
    </Sheet>
  );
}

function ListFormBody({ mode, onDone }: { mode: "new" | "edit"; onDone: () => void }) {
  const id = useId();
  const f = t.list;
  const { list, createList, updateList } = useGifts();
  const current = mode === "edit" ? list : null;
  const [name, setName] = useState(current?.name ?? "");
  const [type, setType] = useState<OccasionType>(current?.occasion_type ?? "other");
  const [date, setDate] = useState(current?.event_date ?? "");
  const [budget, setBudget] = useState(groszeToInput(current?.total_budget_grosze ?? null));
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const budgetGrosze = parseToGrosze(budget);
    if (!name.trim()) return setError(f.nameMissing);
    if (Number.isNaN(budgetGrosze)) return setError(t.giftForm.priceInvalid);
    const input = { name: name.trim(), occasion_type: type, event_date: date || null, total_budget_grosze: budgetGrosze };
    if (await (mode === "new" ? createList(input) : updateList(input))) onDone();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Field id={`${id}-name`} label={f.name}>
        <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder={f.namePlaceholder} className={inputClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-type`} label={f.type}>
          <select id={`${id}-type`} value={type} onChange={(e) => setType(e.target.value as OccasionType)} className={inputClass}>
            {(Object.keys(f.types) as OccasionType[]).map((k) => (
              <option key={k} value={k}>
                {f.types[k]}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-date`} label={f.date}>
          <input id={`${id}-date`} type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
        </Field>
      </div>
      <Field id={`${id}-budget`} label={f.budget} hint={f.budgetHint}>
        <input id={`${id}-budget`} value={budget} onChange={(e) => setBudget(e.target.value)} inputMode="decimal" placeholder="np. 1500" className={inputClass} />
      </Field>
      <ErrorText>{error}</ErrorText>
      <button type="submit" className={`${primaryBtn} w-full`}>
        {mode === "new" ? f.create : f.save}
      </button>
    </form>
  );
}

// ─── Prezent (z „Wklej link”) ─────────────────────────────────────────────────────────────
type Preview = { title?: string; priceGrosze?: number; image?: string; store?: string; url: string };

export function GiftForm({ open, onClose, gift, recipientId }: { open: boolean; onClose: () => void; gift?: Gift; recipientId?: string }) {
  return (
    <Sheet open={open} onClose={onClose} title={gift ? t.giftForm.titleEdit : t.giftForm.titleNew}>
      <GiftFormBody gift={gift} recipientId={recipientId} onDone={onClose} />
    </Sheet>
  );
}

function GiftFormBody({ gift, recipientId, onDone }: { gift?: Gift; recipientId?: string; onDone: () => void }) {
  const id = useId();
  const f = t.giftForm;
  const { recipients, list, session, addGift, updateGift, imageUrls } = useGifts();
  const [recipient, setRecipient] = useState(gift?.recipient_id ?? recipientId ?? recipients[0]?.id ?? "");
  const [title, setTitle] = useState(gift?.title ?? "");
  const [price, setPrice] = useState(groszeToInput(gift?.price_grosze ?? null));
  const [url, setUrl] = useState(gift?.url ?? "");
  const [store, setStore] = useState(gift?.store_name ?? "");
  const [quantity, setQuantity] = useState(String(gift?.quantity ?? 1));
  const [priority, setPriority] = useState<Priority | "">(gift?.priority ?? "");
  const [status, setStatus] = useState<GiftStatus>(gift?.status ?? "idea");
  const [notes, setNotes] = useState(gift?.notes ?? "");
  const [imagePath, setImagePath] = useState(gift?.image_path ?? null);
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [paste, setPaste] = useState("");
  const [pasteState, setPasteState] = useState<"idle" | "loading" | "done" | "failed" | "limit">("idle");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const auth = { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" };

  async function readLink() {
    const link = paste.trim();
    if (!/^https?:\/\//i.test(link)) return setError(f.linkInvalid);
    setError("");
    setPasteState("loading");
    setUrl(link);
    try {
      const res = await fetch("/api/prezenty/link", { method: "POST", headers: auth, body: JSON.stringify({ url: link }) });
      if (res.status === 429) return setPasteState("limit");
      if (!res.ok) return setPasteState("failed");
      const data = (await res.json()) as Preview;
      if (!data.title && data.priceGrosze === undefined && !data.image) return setPasteState("failed");
      if (data.title) setTitle(data.title.slice(0, 200));
      if (data.priceGrosze !== undefined) setPrice(groszeToInput(data.priceGrosze));
      if (data.store) setStore(data.store.slice(0, 80));
      if (data.url) setUrl(data.url);
      if (data.image) setRemoteImage(data.image);
      setPasteState("done");
    } catch {
      setPasteState("failed");
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const priceGrosze = parseToGrosze(price);
    const qty = Math.min(99, Math.max(1, Number.parseInt(quantity, 10) || 1));
    if (!recipient) return setError(f.personMissing);
    if (!title.trim()) return setError(f.titleMissing);
    if (Number.isNaN(priceGrosze)) return setError(f.priceInvalid);
    if (url.trim() && !/^https?:\/\/\S+$/i.test(url.trim())) return setError(f.linkInvalid);
    setError("");
    setBusy(true);
    let path = imagePath;
    if (remoteImage && list) {
      // Kopia zdjęcia do naszego prywatnego schowka (patrz docs/modul-prezenty.md, 6.3)
      try {
        const res = await fetch("/api/prezenty/obrazek", { method: "POST", headers: auth, body: JSON.stringify({ url: remoteImage, listId: list.id }) });
        if (res.ok) path = ((await res.json()) as { path: string }).path;
      } catch {}
    }
    const input = {
      recipient_id: recipient,
      title: title.trim(),
      price_grosze: priceGrosze,
      quantity: qty,
      url: url.trim() || null,
      store_name: store.trim() || null,
      image_path: path,
      notes: notes.trim() || null,
      priority: priority || null,
      status,
    };
    const ok = gift ? await updateGift(gift.id, input) : Boolean(await addGift(input));
    setBusy(false);
    if (ok) onDone();
  }

  const shownImage = remoteImage ?? (imagePath ? imageUrls[imagePath] : null);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {!gift && (
        <div className="rounded-panel bg-cream p-4">
          <label htmlFor={`${id}-paste`} className="block text-sm font-semibold">
            {f.pasteLabel}
          </label>
          <div className="mt-1.5 flex gap-2">
            <input
              id={`${id}-paste`}
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              onPaste={(e) => {
                const text = e.clipboardData.getData("text").trim();
                if (/^https?:\/\//i.test(text)) setTimeout(() => document.getElementById(`${id}-paste-btn`)?.click(), 0);
              }}
              type="url"
              inputMode="url"
              placeholder={f.pastePlaceholder}
              className={`${inputClass} min-w-0 flex-1`}
            />
            <button id={`${id}-paste-btn`} type="button" onClick={readLink} disabled={pasteState === "loading"} className={`${primaryBtn} shrink-0 px-5`}>
              {pasteState === "loading" ? f.pasteLoading : f.pasteButton}
            </button>
          </div>
          <p role="status" className={`mt-2 text-sm ${pasteState === "failed" || pasteState === "limit" ? "text-cranberry" : "text-moss"}`}>
            {pasteState === "failed" ? f.pasteFailed : pasteState === "limit" ? f.pasteLimit : pasteState === "done" ? f.pasteDone : f.pasteHint}
          </p>
        </div>
      )}

      {shownImage && (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shownImage} alt={f.image} referrerPolicy="no-referrer" className="h-20 w-20 rounded-2xl bg-cream object-cover" />
          <button
            type="button"
            onClick={() => {
              setRemoteImage(null);
              setImagePath(null);
            }}
            className={quietBtn}
          >
            {f.removeImage}
          </button>
        </div>
      )}

      {recipients.length > 1 || !recipientId ? (
        <Field id={`${id}-for`} label={f.for}>
          <select id={`${id}-for`} value={recipient} onChange={(e) => setRecipient(e.target.value)} className={inputClass}>
            {recipients.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </Field>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
        <Field id={`${id}-title`} label={f.title}>
          <input id={`${id}-title`} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} autoComplete="off" placeholder={f.titlePlaceholder} className={inputClass} />
        </Field>
        <Field id={`${id}-price`} label={f.price}>
          <input id={`${id}-price`} value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" placeholder={f.pricePlaceholder} className={inputClass} />
        </Field>
      </div>

      <details open={Boolean(gift)} className="group rounded-panel border border-line">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-semibold">
          {f.more}
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-open:rotate-180">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="space-y-4 border-t border-line p-4">
          {gift && (
            <Field id={`${id}-status`} label={f.status}>
              <select id={`${id}-status`} value={status} onChange={(e) => setStatus(e.target.value as GiftStatus)} className={inputClass}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {t.statuses[s]}
                  </option>
                ))}
              </select>
            </Field>
          )}
          <Field id={`${id}-url`} label={f.url}>
            <input id={`${id}-url`} value={url} onChange={(e) => setUrl(e.target.value)} type="url" inputMode="url" placeholder="https://" className={inputClass} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
            <Field id={`${id}-store`} label={f.store}>
              <input id={`${id}-store`} value={store} onChange={(e) => setStore(e.target.value)} maxLength={80} className={inputClass} />
            </Field>
            <Field id={`${id}-qty`} label={f.quantity}>
              <input id={`${id}-qty`} value={quantity} onChange={(e) => setQuantity(e.target.value)} inputMode="numeric" className={inputClass} />
            </Field>
          </div>
          <Field id={`${id}-prio`} label={f.priority}>
            <select id={`${id}-prio`} value={priority} onChange={(e) => setPriority(e.target.value as Priority | "")} className={inputClass}>
              <option value="">{f.priorityNone}</option>
              {(["high", "normal", "low"] as Priority[]).map((p) => (
                <option key={p} value={p}>
                  {t.priorities[p]}
                </option>
              ))}
            </select>
          </Field>
          <Field id={`${id}-notes`} label={f.notes}>
            <textarea id={`${id}-notes`} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1000} rows={2} placeholder={f.notesPlaceholder} className={`${inputClass} resize-y`} />
          </Field>
        </div>
      </details>

      {gift && <Attachments gift={gift} />}

      <ErrorText>{error}</ErrorText>
      <button type="submit" disabled={busy} className={`${primaryBtn} w-full`}>
        {gift ? f.save : f.add}
      </button>
    </form>
  );
}
