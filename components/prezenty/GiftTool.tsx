"use client";

import { useCallback, useEffect, useId, useMemo, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { prezenty } from "@/content/prezenty";
import { getSupabase, type Gift, type GiftPerson, type GiftStatus } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { FeatureGate } from "@/components/features/FeatureGate";
import { Workspace } from "@/components/features/Workspace";

// Zakładka „Przygotuj prezenty”: od razu samo narzędzie, bez instrukcji.
// Osoby z budżetem, prezenty z etapami. Dane leżą w Supabase; każdy widzi tylko swoje.

const t = prezenty;
const STATUSES: GiftStatus[] = ["pomysl", "kupione", "zapakowane", "wreczone"];
const HIDE_KEY = "gviazdka-ukryj-kwoty";

const PERSON_FIELDS = "id, name, budget, created_at";
const GIFT_FIELDS = "id, person_id, title, url, price, status, note, created_at";

const inputClass =
  "min-h-12 w-full rounded-soft border border-line bg-paper px-4 py-2.5 text-base text-spruce placeholder:text-moss/70 focus:border-spruce focus:outline-none";
const smallButton =
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-200 ease-calm active:scale-[0.97] disabled:opacity-60";
const primaryButton = `${smallButton} bg-cranberry text-paper hover:bg-cranberry-deep`;
const quietButton = `${smallButton} text-moss hover:bg-cream hover:text-spruce`;

const statusStyle: Record<GiftStatus, string> = {
  pomysl: "bg-cream text-moss",
  kupione: "bg-sage text-spruce",
  zapakowane: "bg-gold/30 text-spruce",
  wreczone: "bg-spruce text-snow",
};

const money = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 2 });
const withName = (text: string, name: string) => text.replace("{name}", name);

function parseAmount(value: string): number | null {
  const text = value.trim().replace(/\s/g, "").replace(/zł|zl|pln/i, "").replace(",", ".");
  if (!text) return null;
  const n = Number(text);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : NaN;
}

// „Szalik 80 zł” → tytuł „Szalik” i cena 80. Bez „zł” na końcu liczba zostaje w nazwie (np. „iPhone 15”).
function splitTitleAndPrice(text: string): { title: string; price: number | null } {
  const match = text.match(/^(.*\S)\s+(\d+(?:[.,]\d{1,2})?)\s*(?:zł|zl|pln)\.?$/i);
  if (!match) return { title: text, price: null };
  return { title: match[1], price: Math.round(Number(match[2].replace(",", ".")) * 100) / 100 };
}

function isValidLink(value: string) {
  if (!/^https?:\/\//i.test(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// Wydane = suma cen prezentów, które są już kupione (lub dalej).
function spentOn(gifts: Gift[]) {
  return gifts.reduce((sum, g) => sum + (g.status !== "pomysl" && g.price ? Number(g.price) : 0), 0);
}

export function GiftTool() {
  return (
    <FeatureGate intro={t.intro} video={siteConfig.videos.prezenty}>
      {(session) => (
        <Workspace t={t}>
          <GiftBoard session={session} />
        </Workspace>
      )}
    </FeatureGate>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return <p className="rounded-frame bg-paper p-8 text-center text-moss shadow-soft">{children}</p>;
}

function GiftBoard({ session }: { session: Session }) {
  const supabase = getSupabase()!;
  const [people, setPeople] = useState<GiftPerson[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [hideAmounts, setHideAmounts] = useState(false);

  useEffect(() => {
    try {
      setHideAmounts(localStorage.getItem(HIDE_KEY) === "1");
    } catch {}
  }, []);

  const toggleHide = () => {
    setHideAmounts((h) => {
      try {
        localStorage.setItem(HIDE_KEY, h ? "0" : "1");
      } catch {}
      return !h;
    });
  };

  const load = useCallback(async () => {
    const [p, g] = await Promise.all([
      supabase.from("gift_people").select(PERSON_FIELDS).order("created_at"),
      supabase.from("gifts").select(GIFT_FIELDS).order("created_at"),
    ]);
    if (p.error || g.error) setError(t.saveError);
    else {
      setPeople(p.data as GiftPerson[]);
      setGifts(g.data as Gift[]);
    }
    setLoaded(true);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const totals = useMemo(() => {
    const budget = people.reduce((s, p) => s + (p.budget ? Number(p.budget) : 0), 0);
    return { spent: spentOn(gifts), budget };
  }, [people, gifts]);

  const show = (n: number) => (hideAmounts ? `${t.hidden} zł` : money.format(n));

  function failed() {
    setError(t.saveError);
    return false;
  }

  async function addPerson(name: string) {
    const { data, error } = await supabase.from("gift_people").insert({ name }).select(PERSON_FIELDS).single();
    if (error) return failed();
    setError("");
    setPeople((list) => [...list, data as GiftPerson]);
    return true;
  }

  async function setBudget(id: string, budget: number | null) {
    const { error } = await supabase.from("gift_people").update({ budget }).eq("id", id);
    if (error) return failed();
    setError("");
    setPeople((list) => list.map((p) => (p.id === id ? { ...p, budget } : p)));
    return true;
  }

  async function removePerson(id: string) {
    const { error } = await supabase.from("gift_people").delete().eq("id", id);
    if (error) return failed();
    setPeople((list) => list.filter((p) => p.id !== id));
    setGifts((list) => list.filter((g) => g.person_id !== id));
    return true;
  }

  async function addGift(personId: string, title: string, price: number | null) {
    const { data, error } = await supabase.from("gifts").insert({ person_id: personId, title, price }).select(GIFT_FIELDS).single();
    if (error) return failed();
    setError("");
    setGifts((list) => [...list, data as Gift]);
    return true;
  }

  // Zmiana od razu widoczna na ekranie; jeśli zapis się nie uda, wraca poprzedni stan.
  async function updateGift(id: string, fields: Partial<Pick<Gift, "title" | "url" | "price" | "note" | "status">>) {
    const before = gifts;
    setGifts((list) => list.map((g) => (g.id === id ? { ...g, ...fields } : g)));
    const { error } = await supabase.from("gifts").update(fields).eq("id", id);
    if (error) {
      setGifts(before);
      return failed();
    }
    setError("");
    return true;
  }

  async function removeGift(id: string) {
    const { error } = await supabase.from("gifts").delete().eq("id", id);
    if (error) return failed();
    setGifts((list) => list.filter((g) => g.id !== id));
    return true;
  }

  if (!loaded) return <Notice>{t.loading}</Notice>;

  const usedNames = new Set(people.map((p) => p.name.toLowerCase()));
  const suggestions = t.suggestions.filter((s) => !usedNames.has(s.toLowerCase()));

  return (
    <div>
      {people.length > 0 && (
        <div className="flex items-center justify-between gap-4 rounded-frame bg-paper px-5 py-4 shadow-soft sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-moss">{t.spentLabel}</p>
            <p className="font-serif text-2xl font-medium tabular-nums sm:text-3xl">
              {show(totals.spent)}
              {totals.budget > 0 && (
                <span className="text-base text-moss sm:text-lg">
                  {" "}
                  {t.ofLabel} {show(totals.budget)}
                </span>
              )}
            </p>
            {totals.budget > 0 && !hideAmounts && <Progress value={totals.spent} max={totals.budget} />}
          </div>
          <button
            type="button"
            aria-pressed={hideAmounts}
            onClick={toggleHide}
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold text-moss transition duration-200 hover:bg-cream hover:text-spruce active:scale-[0.97]"
          >
            <EyeIcon closed={hideAmounts} />
            <span className="hidden sm:inline">{hideAmounts ? t.showAmounts : t.hideAmounts}</span>
            <span className="sr-only sm:hidden">{hideAmounts ? t.showAmounts : t.hideAmounts}</span>
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-soft bg-cranberry/10 px-4 py-3 text-cranberry">
          {error}
        </p>
      )}

      {people.length > 0 && (
        <ul className="mt-5 space-y-5">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              gifts={gifts.filter((g) => g.person_id === person.id)}
              show={show}
              hideAmounts={hideAmounts}
              onBudget={(budget) => setBudget(person.id, budget)}
              onRemove={() => removePerson(person.id)}
              onAddGift={(title, price) => addGift(person.id, title, price)}
              onUpdateGift={updateGift}
              onRemoveGift={removeGift}
            />
          ))}
        </ul>
      )}

      <AddPerson first={people.length === 0} suggestions={suggestions} onAdd={addPerson} />

      <p className="mt-10 text-center text-sm text-moss">
        {t.privacy} {t.signedInAs} {session.user.email}.{" "}
        <button type="button" onClick={() => supabase.auth.signOut()} className="min-h-11 font-semibold underline underline-offset-4 hover:text-spruce">
          {t.logout}
        </button>
      </p>
    </div>
  );
}

function Progress({ value, max }: { value: number; max: number }) {
  const over = value > max;
  return (
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cream" aria-hidden="true">
      <div
        className={`h-full rounded-full transition-[width] duration-500 ease-calm ${over ? "bg-cranberry" : "bg-gold"}`}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
  );
}

// Dodawanie osoby: jedno pole i podpowiedzi. Na pierwszym wejściu to jedyna rzecz na ekranie.
function AddPerson({ first, suggestions, onAdd }: { first: boolean; suggestions: readonly string[]; onAdd: (name: string) => Promise<boolean> }) {
  const id = useId();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function add(value: string) {
    const clean = value.trim();
    if (!clean) return setError(t.nameMissing);
    setError("");
    setBusy(true);
    const ok = await onAdd(clean);
    setBusy(false);
    if (ok) setName("");
  }

  return (
    <div className={first ? "rounded-frame bg-paper p-6 shadow-soft sm:p-8" : "mt-8"}>
      {first ? (
        <>
          <h2 className="font-serif text-2xl font-medium sm:text-3xl">{t.startTitle}</h2>
          <p className="mt-2 text-moss">{t.startText}</p>
        </>
      ) : (
        <h2 className="text-lg font-semibold">{t.addAnother}</h2>
      )}
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          add(name);
        }}
        noValidate
        className="mt-4 flex gap-2"
      >
        <label htmlFor={`${id}-name`} className="sr-only">
          {t.personLabel}
        </label>
        <input
          id={`${id}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          autoComplete="off"
          placeholder={t.personPlaceholder}
          className={`${inputClass} min-w-0 flex-1`}
        />
        <button type="submit" disabled={busy} className={`${primaryButton} min-h-12 shrink-0`}>
          {t.addPerson}
        </button>
      </form>
      {error && (
        <p role="alert" className="mt-2 text-sm text-cranberry">
          {error}
        </p>
      )}
      {suggestions.length > 0 && (
        <ul aria-label={t.suggestionsLabel} className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                disabled={busy}
                onClick={() => add(s)}
                className="min-h-11 rounded-full border border-line bg-paper px-4 text-sm font-semibold text-spruce transition duration-200 ease-calm hover:border-spruce active:scale-[0.97]"
              >
                + {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type PersonCardProps = {
  person: GiftPerson;
  gifts: Gift[];
  show: (n: number) => string;
  hideAmounts: boolean;
  onBudget: (budget: number | null) => Promise<boolean>;
  onRemove: () => Promise<boolean>;
  onAddGift: (title: string, price: number | null) => Promise<boolean>;
  onUpdateGift: (id: string, fields: Partial<Pick<Gift, "title" | "url" | "price" | "note" | "status">>) => Promise<boolean>;
  onRemoveGift: (id: string) => Promise<boolean>;
};

function PersonCard({ person, gifts, show, hideAmounts, onBudget, onRemove, onAddGift, onUpdateGift, onRemoveGift }: PersonCardProps) {
  const [confirming, setConfirming] = useState(false);
  const spent = spentOn(gifts);
  const budget = person.budget ? Number(person.budget) : null;
  const over = budget !== null && spent > budget;

  return (
    <li className="pop-in rounded-frame bg-paper p-5 shadow-soft sm:p-6">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage font-serif text-lg">
          {person.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="break-words font-serif text-xl font-medium leading-tight sm:text-2xl">{person.name}</h2>
          <BudgetLine name={person.name} budget={budget} spent={spent} over={over} show={show} onSave={onBudget} />
        </div>
        <button
          type="button"
          onClick={() => setConfirming((v) => !v)}
          aria-expanded={confirming}
          aria-label={withName(t.personMenu, person.name)}
          className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-moss transition hover:bg-cream hover:text-cranberry"
        >
          <TrashIcon />
        </button>
      </div>

      {confirming && (
        <div role="alertdialog" aria-label={withName(t.removePersonConfirm, person.name)} className="pop-in mt-4 flex flex-wrap items-center gap-2 rounded-soft bg-cranberry/10 p-3">
          <p className="mr-auto px-1 text-sm font-semibold text-cranberry">{withName(t.removePersonConfirm, person.name)}</p>
          <button type="button" onClick={() => setConfirming(false)} className={quietButton}>
            {t.cancel}
          </button>
          <button type="button" onClick={onRemove} className={primaryButton}>
            {t.yesRemove}
          </button>
        </div>
      )}

      {budget !== null && budget > 0 && !hideAmounts && <Progress value={spent} max={budget} />}

      {gifts.length > 0 && (
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {gifts.map((gift) => (
            <GiftRow key={gift.id} gift={gift} show={show} onUpdate={(fields) => onUpdateGift(gift.id, fields)} onRemove={() => onRemoveGift(gift.id)} />
          ))}
        </ul>
      )}

      <QuickAddGift name={person.name} empty={gifts.length === 0} onAdd={onAddGift} />
    </li>
  );
}

function BudgetLine({
  name,
  budget,
  spent,
  over,
  show,
  onSave,
}: {
  name: string;
  budget: number | null;
  spent: number;
  over: boolean;
  show: (n: number) => string;
  onSave: (budget: number | null) => Promise<boolean>;
}) {
  const id = useId();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  if (editing) {
    return (
      <form
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          const amount = parseAmount(value);
          if (Number.isNaN(amount)) return setError(t.priceInvalid);
          if (await onSave(amount)) setEditing(false);
        }}
        noValidate
        className="mt-2"
      >
        <label htmlFor={`${id}-budget`} className="text-sm font-semibold">
          {withName(t.budgetLabel, name)}
        </label>
        <div className="mt-1 flex flex-wrap gap-2">
          <input
            id={`${id}-budget`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputMode="decimal"
            autoFocus
            placeholder="np. 200"
            className={`${inputClass} w-32`}
          />
          <button type="submit" className={primaryButton}>
            {t.save}
          </button>
          <button type="button" onClick={() => setEditing(false)} className={quietButton}>
            {t.cancel}
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-1 text-sm text-cranberry">
            {error}
          </p>
        )}
      </form>
    );
  }

  const open = () => {
    setValue(budget === null ? "" : String(budget).replace(".", ","));
    setError("");
    setEditing(true);
  };

  return (
    <p className="mt-0.5 text-sm tabular-nums text-moss">
      {budget === null ? (
        <>
          {spent > 0 && `${t.spentLabel} ${show(spent)} · `}
          <button type="button" onClick={open} className="min-h-11 font-semibold text-cranberry underline-offset-4 hover:underline">
            {t.setBudget}
          </button>
        </>
      ) : (
        <button type="button" onClick={open} className={`min-h-11 text-left underline-offset-4 hover:underline ${over ? "font-semibold text-cranberry" : ""}`}>
          {over ? `${t.overBudget} ${show(spent - budget)}` : `${t.budgetLeft} ${show(budget - spent)} ${t.ofLabel} ${show(budget)}`}
        </button>
      )}
    </p>
  );
}

// Jedno pole: wpisz pomysł i naciśnij Enter. „Szalik 80 zł” od razu zapisze też cenę.
function QuickAddGift({ name, empty, onAdd }: { name: string; empty: boolean; onAdd: (title: string, price: number | null) => Promise<boolean> }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return setError(t.titleMissing);
    const { title, price } = splitTitleAndPrice(text);
    setError("");
    setBusy(true);
    const ok = await onAdd(title, price);
    setBusy(false);
    if (ok) setValue("");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4">
      {empty && <p className="mb-3 text-sm text-moss">{t.noGifts}</p>}
      <label htmlFor={`${id}-gift`} className="sr-only">
        {withName(t.giftLabel, name)}
      </label>
      <div className="flex gap-2">
        <input
          id={`${id}-gift`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={200}
          autoComplete="off"
          placeholder={t.giftPlaceholder}
          className={`${inputClass} min-w-0 flex-1 bg-cream/50`}
        />
        <button type="submit" disabled={busy} className={`${primaryButton} min-h-12 shrink-0`}>
          {t.addGift}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-cranberry">
          {error}
        </p>
      )}
    </form>
  );
}

type GiftFields = Partial<Pick<Gift, "title" | "url" | "price" | "note" | "status">>;

function GiftRow({ gift, show, onUpdate, onRemove }: { gift: Gift; show: (n: number) => string; onUpdate: (fields: GiftFields) => Promise<boolean>; onRemove: () => Promise<boolean> }) {
  const [open, setOpen] = useState(false);
  const done = gift.status === "wreczone";

  return (
    <li className="pop-in py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={withName(t.details, gift.title)}
          className="group flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-soft text-left"
        >
          <span className="min-w-0 flex-1">
            <span className={`block break-words font-semibold group-hover:underline group-hover:underline-offset-4 ${done ? "text-moss line-through decoration-moss/50" : ""}`}>
              {gift.title}
            </span>
            {(gift.price !== null || gift.note) && (
              <span className="block truncate text-sm text-moss">
                {gift.price !== null && <span className="tabular-nums">{show(Number(gift.price))}</span>}
                {gift.price !== null && gift.note && " · "}
                {gift.note}
              </span>
            )}
          </span>
          <PencilIcon />
        </button>
        <StatusPicker gift={gift} onChange={(status) => onUpdate({ status })} />
      </div>

      {open && <GiftEditor gift={gift} onSave={async (fields) => (await onUpdate(fields)) && setOpen(false)} onRemove={onRemove} />}
    </li>
  );
}

// Etap prezentu: jeden przycisk w kolorze etapu, a pod nim zwykła lista wyboru telefonu/przeglądarki.
function StatusPicker({ gift, onChange }: { gift: Gift; onChange: (status: GiftStatus) => void }) {
  return (
    <span className="relative shrink-0">
      <select
        value={gift.status}
        onChange={(e) => onChange(e.target.value as GiftStatus)}
        aria-label={withName(t.statusLabel, gift.title)}
        className={`min-h-11 cursor-pointer appearance-none rounded-full py-2 pl-4 pr-9 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cranberry ${statusStyle[gift.status]}`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {t.statuses[s]}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 16 16" aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2">
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function GiftEditor({ gift, onSave, onRemove }: { gift: Gift; onSave: (fields: GiftFields) => Promise<unknown>; onRemove: () => Promise<boolean> }) {
  const id = useId();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    const url = String(data.get("url") ?? "").trim();
    const price = parseAmount(String(data.get("price") ?? ""));
    const note = String(data.get("note") ?? "").trim();
    if (!title) return setError(t.titleMissing);
    if (Number.isNaN(price)) return setError(t.priceInvalid);
    if (url && !isValidLink(url)) return setError(t.linkInvalid);
    setError("");
    setBusy(true);
    await onSave({ title, url: url || null, price, note: note || null });
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="pop-in mt-2 rounded-panel bg-cream p-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
        <Field id={`${id}-title`} label={t.giftTitle}>
          <input id={`${id}-title`} name="title" defaultValue={gift.title} maxLength={200} className={inputClass} />
        </Field>
        <Field id={`${id}-price`} label={t.giftPrice}>
          <input
            id={`${id}-price`}
            name="price"
            inputMode="decimal"
            defaultValue={gift.price === null ? "" : String(gift.price).replace(".", ",")}
            placeholder="np. 80"
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id={`${id}-url`} label={t.giftLink}>
            <div className="flex gap-2">
              <input id={`${id}-url`} name="url" type="url" inputMode="url" defaultValue={gift.url ?? ""} placeholder="https://" className={`${inputClass} min-w-0 flex-1`} />
              {gift.url && (
                <a href={gift.url} target="_blank" rel="noopener noreferrer nofollow" className={`${quietButton} shrink-0 border border-line bg-paper`}>
                  {t.openLink}
                </a>
              )}
            </div>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id={`${id}-note`} label={t.giftNote}>
            <input id={`${id}-note`} name="note" defaultValue={gift.note ?? ""} maxLength={500} className={inputClass} />
          </Field>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-cranberry">
          {error}
        </p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="submit" disabled={busy} className={primaryButton}>
          {t.save}
        </button>
        <button type="button" onClick={onRemove} className={`${quietButton} ml-auto hover:text-cranberry`}>
          <TrashIcon />
          <span className="ml-2">{t.removeGift}</span>
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 shrink-0 text-moss opacity-70 group-hover:opacity-100">
      <path d="M12.5 4.5l3 3L8 15H5v-3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px]">
      <path
        d="M4 6h12M8 6V4.5h4V6M6 6l.7 9.2a1.5 1.5 0 0 0 1.5 1.3h3.6a1.5 1.5 0 0 0 1.5-1.3L14 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon({ closed }: { closed: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {closed && <path d="M4 20L20 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
    </svg>
  );
}
