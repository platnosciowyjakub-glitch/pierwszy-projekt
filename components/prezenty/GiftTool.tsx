"use client";

import { useCallback, useEffect, useId, useMemo, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { prezenty } from "@/content/prezenty";
import { getSupabase, type Gift, type GiftPerson, type GiftStatus } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { LoginForm } from "@/components/auth/LoginForm";
import { useSession } from "@/components/auth/useSession";

// Narzędzie „Lista prezentów”: logowanie linkiem z e-maila, osoby z budżetem i prezenty z etapami.
// Dane leżą w Supabase; zasady w bazie pilnują, żeby każdy widział tylko swoje.

const t = prezenty.tool;
const STATUSES: GiftStatus[] = ["pomysl", "kupione", "zapakowane", "wreczone"];
const HIDE_KEY = "gviazdka-ukryj-kwoty";

const inputClass =
  "min-h-12 w-full rounded-soft border border-line bg-paper px-4 py-2.5 text-base text-spruce placeholder:text-moss/70 focus:border-moss focus:outline-none focus-visible:outline-2 focus-visible:outline-cranberry";

const money = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 2 });

function parseAmount(value: FormDataEntryValue | null): number | null {
  const text = String(value ?? "").trim().replace(/\s/g, "").replace(",", ".");
  if (!text) return null;
  const n = Number(text);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : NaN;
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
  const { supabase, session, ready } = useSession();

  // Po powrocie z linku w e-mailu przewiń prosto do listy
  useEffect(() => {
    if (session && window.location.hash.includes("access_token")) {
      history.replaceState(null, "", "/prezenty#lista");
      document.getElementById("lista")?.scrollIntoView();
    }
  }, [session]);

  return (
    <section id="lista" aria-labelledby="tool-title" className="border-t border-line bg-cream py-16 lg:py-24">
      <div className="mx-auto w-full max-w-4xl px-5 md:px-10">
        <h2 id="tool-title" className="text-center text-[2rem] leading-10 tracking-[-0.03em] lg:text-5xl lg:leading-[3.25rem]">
          <Rich text={t.title} />
        </h2>
        <div className="mt-10">
          {!supabase ? (
            <Notice>{t.unavailable}</Notice>
          ) : !ready ? (
            <Notice>{t.loading}</Notice>
          ) : session ? (
            <GiftBoard session={session} />
          ) : (
            <LoginCard />
          )}
        </div>
      </div>
    </section>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return <p className="rounded-frame border border-line bg-paper p-8 text-center text-moss">{children}</p>;
}

function LoginCard() {
  return (
    <div className="mx-auto max-w-xl rounded-frame border border-line bg-paper p-6 shadow-soft sm:p-8">
      <p className="font-serif text-2xl font-medium">{t.loginTitle}</p>
      <p className="mt-2 mb-6 text-moss">{t.loginText}</p>
      <LoginForm returnTo="/prezenty" />
    </div>
  );
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
      supabase.from("gift_people").select("id, name, budget, created_at").order("created_at"),
      supabase.from("gifts").select("id, person_id, title, url, price, status, note, created_at").order("created_at"),
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

  async function addPerson(name: string, budget: number | null) {
    const { data, error } = await supabase.from("gift_people").insert({ name, budget }).select("id, name, budget, created_at").single();
    if (error) return setError(t.saveError), false;
    setError("");
    setPeople((list) => [...list, data as GiftPerson]);
    return true;
  }

  async function removePerson(id: string) {
    const { error } = await supabase.from("gift_people").delete().eq("id", id);
    if (error) return setError(t.saveError);
    setPeople((list) => list.filter((p) => p.id !== id));
    setGifts((list) => list.filter((g) => g.person_id !== id));
  }

  async function addGift(personId: string, fields: Pick<Gift, "title" | "url" | "price" | "note">) {
    const { data, error } = await supabase
      .from("gifts")
      .insert({ person_id: personId, ...fields })
      .select("id, person_id, title, url, price, status, note, created_at")
      .single();
    if (error) return setError(t.saveError), false;
    setError("");
    setGifts((list) => [...list, data as Gift]);
    return true;
  }

  async function setStatus(id: string, status: GiftStatus) {
    const before = gifts;
    setGifts((list) => list.map((g) => (g.id === id ? { ...g, status } : g)));
    const { error } = await supabase.from("gifts").update({ status }).eq("id", id);
    if (error) {
      setGifts(before);
      setError(t.saveError);
    }
  }

  async function removeGift(id: string) {
    const { error } = await supabase.from("gifts").delete().eq("id", id);
    if (error) return setError(t.saveError);
    setGifts((list) => list.filter((g) => g.id !== id));
  }

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-frame border border-line bg-paper p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm text-moss">{t.spentLabel}</p>
          <p className="font-serif text-3xl font-medium tabular-nums">
            {show(totals.spent)}
            {totals.budget > 0 && (
              <span className="text-lg text-moss">
                {" "}
                {t.ofLabel} {show(totals.budget)}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={hideAmounts}
            onClick={toggleHide}
            className="min-h-11 rounded-full border border-line px-4 text-sm font-semibold hover:border-spruce"
          >
            {hideAmounts ? t.showAmounts : t.hideAmounts}
          </button>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="min-h-11 rounded-full px-4 text-sm font-semibold text-moss underline-offset-4 hover:underline"
          >
            {t.logout}
          </button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-moss">
        {t.signedInAs} {session.user.email} · {t.privacy}
      </p>

      {error && (
        <p role="alert" className="mt-4 rounded-soft bg-cranberry/10 px-4 py-3 text-sm text-cranberry">
          {error}
        </p>
      )}

      {!loaded ? (
        <p className="mt-8 text-center text-moss">{t.loading}</p>
      ) : (
        <>
          {people.length === 0 && (
            <div className="mt-8 text-center">
              <p className="font-serif text-2xl font-medium">{t.emptyTitle}</p>
              <p className="mx-auto mt-2 max-w-md text-moss">{t.emptyText}</p>
            </div>
          )}
          <ul className="mt-8 space-y-4">
            {people.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                gifts={gifts.filter((g) => g.person_id === person.id)}
                show={show}
                hideAmounts={hideAmounts}
                onRemove={() => removePerson(person.id)}
                onAddGift={(fields) => addGift(person.id, fields)}
                onStatus={setStatus}
                onRemoveGift={removeGift}
              />
            ))}
          </ul>
          <AddPersonForm onAdd={addPerson} />
        </>
      )}
    </div>
  );
}

function AddPersonForm({ onAdd }: { onAdd: (name: string, budget: number | null) => Promise<boolean> }) {
  const id = useId();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const budget = parseAmount(data.get("budget"));
    if (!name) return setError(t.nameMissing);
    if (Number.isNaN(budget)) return setError(t.saveError);
    setError("");
    setBusy(true);
    const ok = await onAdd(name, budget);
    setBusy(false);
    if (ok) form.reset();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 rounded-frame border border-dashed border-gold/60 bg-paper/60 p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_auto] sm:items-end">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-semibold">
            {t.personName}
          </label>
          <input id={`${id}-name`} name="name" maxLength={80} placeholder={t.personNamePlaceholder} className={`${inputClass} mt-1`} />
        </div>
        <div>
          <label htmlFor={`${id}-budget`} className="text-sm font-semibold">
            {t.personBudget}
          </label>
          <input id={`${id}-budget`} name="budget" inputMode="decimal" placeholder="np. 150" className={`${inputClass} mt-1`} />
        </div>
        <Button type="submit" disabled={busy}>
          {t.addPerson}
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-cranberry">
          {error}
        </p>
      )}
    </form>
  );
}

type PersonCardProps = {
  person: GiftPerson;
  gifts: Gift[];
  show: (n: number) => string;
  hideAmounts: boolean;
  onRemove: () => void;
  onAddGift: (fields: Pick<Gift, "title" | "url" | "price" | "note">) => Promise<boolean>;
  onStatus: (id: string, status: GiftStatus) => void;
  onRemoveGift: (id: string) => void;
};

function PersonCard({ person, gifts, show, hideAmounts, onRemove, onAddGift, onStatus, onRemoveGift }: PersonCardProps) {
  const [adding, setAdding] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const spent = spentOn(gifts);
  const budget = person.budget ? Number(person.budget) : null;
  const over = budget !== null && spent > budget;

  return (
    <li className="rounded-frame border border-line bg-paper p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage font-serif text-lg">
            {person.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h3 className="font-serif text-xl font-medium">{person.name}</h3>
            <p className="text-sm text-moss tabular-nums">
              {budget === null
                ? `${t.spentLabel}: ${show(spent)} · ${t.noBudget}`
                : over
                  ? `${t.overBudget} ${show(spent - budget)}`
                  : `${t.budgetLeft} ${show(budget - spent)} ${t.ofLabel} ${show(budget)}`}
            </p>
          </div>
        </div>
        {confirming ? (
          <span className="flex shrink-0 items-center gap-2 text-sm">
            <span className="hidden text-moss sm:inline">{t.removePersonConfirm}</span>
            <button type="button" onClick={onRemove} className="min-h-11 rounded-full bg-cranberry px-4 font-semibold text-paper">
              {t.removePerson}
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="min-h-11 rounded-full px-3 font-semibold text-moss">
              {t.cancel}
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            aria-label={`${t.removePerson}: ${person.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-moss hover:bg-cream hover:text-cranberry"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {budget !== null && budget > 0 && !hideAmounts && (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream">
          <div
            className={`h-full rounded-full transition-[width] duration-500 ease-calm ${over ? "bg-cranberry" : "bg-gold"}`}
            style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }}
          />
        </div>
      )}

      {gifts.length === 0 ? (
        <p className="mt-4 text-sm text-moss">{t.noGifts}</p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {gifts.map((gift) => (
            <GiftRow key={gift.id} gift={gift} show={show} onStatus={onStatus} onRemove={() => onRemoveGift(gift.id)} />
          ))}
        </ul>
      )}

      {adding ? (
        <AddGiftForm
          onCancel={() => setAdding(false)}
          onAdd={async (fields) => {
            const ok = await onAddGift(fields);
            if (ok) setAdding(false);
            return ok;
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-4 min-h-11 rounded-full border border-spruce px-5 text-sm font-semibold transition duration-200 ease-calm hover:bg-spruce hover:text-snow active:scale-[0.97]"
        >
          + {t.addGift}
        </button>
      )}
    </li>
  );
}

function GiftRow({
  gift,
  show,
  onStatus,
  onRemove,
}: {
  gift: Gift;
  show: (n: number) => string;
  onStatus: (id: string, status: GiftStatus) => void;
  onRemove: () => void;
}) {
  const current = STATUSES.indexOf(gift.status);
  return (
    <li className="py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`font-semibold ${gift.status === "wreczone" ? "text-moss line-through decoration-moss/50" : ""}`}>{gift.title}</p>
          <p className="mt-0.5 flex flex-wrap gap-x-3 text-sm text-moss">
            {gift.price !== null && <span className="tabular-nums">{show(Number(gift.price))}</span>}
            {gift.url && (
              <a href={gift.url} target="_blank" rel="noopener noreferrer nofollow" className="text-cranberry underline underline-offset-4">
                {t.openLink}
              </a>
            )}
            {gift.note && <span className="break-words">{gift.note}</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`${t.removeGift}: ${gift.title}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-moss hover:bg-cream hover:text-cranberry"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div role="group" aria-label={`${t.statusLabel}: ${gift.title}`} className="mt-3 grid grid-cols-4 gap-1 rounded-full bg-cream p-1">
        {STATUSES.map((status, i) => (
          <button
            key={status}
            type="button"
            aria-pressed={gift.status === status}
            onClick={() => onStatus(gift.id, status)}
            className={`flex min-h-10 items-center justify-center gap-1 rounded-full px-1 text-xs font-semibold transition duration-200 ease-calm sm:text-sm ${
              gift.status === status
                ? "bg-spruce text-snow shadow-sm"
                : i < current
                  ? "text-spruce hover:bg-paper"
                  : "text-moss hover:bg-paper"
            }`}
          >
            {i < current && <CheckIcon className="hidden h-3.5 w-3.5 sm:block" />}
            {t.statuses[status]}
          </button>
        ))}
      </div>
    </li>
  );
}

function AddGiftForm({
  onAdd,
  onCancel,
}: {
  onAdd: (fields: Pick<Gift, "title" | "url" | "price" | "note">) => Promise<boolean>;
  onCancel: () => void;
}) {
  const id = useId();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    const url = String(data.get("url") ?? "").trim();
    const price = parseAmount(data.get("price"));
    const note = String(data.get("note") ?? "").trim();
    if (!title) return setError(t.titleMissing);
    if (url && !isValidLink(url)) return setError(t.linkInvalid);
    if (Number.isNaN(price)) return setError(t.saveError);
    setError("");
    setBusy(true);
    await onAdd({ title, url: url || null, price, note: note || null });
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 rounded-panel bg-cream p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-title`} className="text-sm font-semibold">
            {t.giftTitle}
          </label>
          <input id={`${id}-title`} name="title" maxLength={200} autoFocus placeholder={t.giftTitlePlaceholder} className={`${inputClass} mt-1`} />
        </div>
        <div>
          <label htmlFor={`${id}-url`} className="text-sm font-semibold">
            {t.giftLink}
          </label>
          <input id={`${id}-url`} name="url" type="url" inputMode="url" placeholder="https://" className={`${inputClass} mt-1`} />
        </div>
        <div>
          <label htmlFor={`${id}-price`} className="text-sm font-semibold">
            {t.giftPrice}
          </label>
          <input id={`${id}-price`} name="price" inputMode="decimal" placeholder="np. 120" className={`${inputClass} mt-1`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-note`} className="text-sm font-semibold">
            {t.giftNote}
          </label>
          <input id={`${id}-note`} name="note" maxLength={500} className={`${inputClass} mt-1`} />
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-cranberry">
          {error}
        </p>
      )}
      <div className="mt-4 flex gap-3">
        <Button type="submit" size="md" disabled={busy}>
          {t.addGift}
        </Button>
        <Button type="button" size="md" variant="outline" onClick={onCancel}>
          {t.cancel}
        </Button>
      </div>
    </form>
  );
}
