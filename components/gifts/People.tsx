"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { gifts as t } from "@/content/gifts";
import { fill, plural } from "@/lib/plural";
import { useGifts } from "@/lib/gifts/store";
import { formatDate } from "@/lib/gifts/dates";
import { plannedOf, spentOf, STATUSES, type Gift, type Recipient, type Relation } from "@/lib/gifts/types";
import { GiftItem } from "@/components/gifts/GiftItem";
import { GiftForm, PersonForm } from "@/components/gifts/Forms";
import { Avatar, BudgetBar, card, outlineBtn, primaryBtn, quietBtn, useMoney } from "@/components/gifts/ui";

const SORT_KEY = "gviazdka-sortowanie-osob";
type Sort = keyof typeof t.people.sort;

// Liczniki „1 pomysł · 1 kupiony · 0 zapakowanych”
function statusCounts(gifts: Gift[]) {
  const c = { idea: 0, bought: 0, wrapped: 0, given: 0 };
  for (const g of gifts) c[g.status] += 1;
  return c;
}
function countsText(gifts: Gift[]) {
  const c = statusCounts(gifts);
  const parts = (["idea", "bought", "wrapped"] as const).map((s) => `${c[s]} ${plural(c[s], t.people.counts[s])}`);
  if (c.given) parts.push(`${c.given} ${plural(c.given, t.people.counts.given)}`);
  return parts.join(" · ");
}
export function isDone(gifts: Gift[]) {
  return gifts.length > 0 && gifts.every((g) => g.status === "given");
}

// ─── Ekran „Osoby”: lista po lewej, szczegóły po prawej (na komputerze) ───────────────────
export function PeopleScreen({ personId }: { personId?: string }) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <div className={personId ? "hidden lg:block" : ""}>
        <PeopleList selectedId={personId} />
      </div>
      <div className={personId ? "" : "hidden lg:block"}>
        {personId ? <PersonDetail id={personId} /> : <p className={`${card} px-6 py-16 text-center text-moss`}>{t.people.pickPerson}</p>}
      </div>
    </div>
  );
}

function PeopleList({ selectedId }: { selectedId?: string }) {
  const { recipients, gifts, addRecipient } = useGifts();
  const [sort, setSort] = useState<Sort>("nogift");
  const [onlyNoGift, setOnlyNoGift] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SORT_KEY) as Sort | null;
      if (saved && saved in t.people.sort) setSort(saved);
    } catch {}
  }, []);

  const byPerson = useMemo(() => {
    const map = new Map<string, Gift[]>();
    for (const g of gifts) map.set(g.recipient_id, [...(map.get(g.recipient_id) ?? []), g]);
    return map;
  }, [gifts]);

  const shown = useMemo(() => {
    let rows = [...recipients];
    if (onlyNoGift) rows = rows.filter((r) => !byPerson.get(r.id)?.length);
    const collator = new Intl.Collator("pl");
    if (sort === "alpha") rows.sort((a, b) => collator.compare(a.name, b.name));
    if (sort === "budget") rows.sort((a, b) => (b.budget_grosze ?? -1) - (a.budget_grosze ?? -1));
    if (sort === "nogift") rows.sort((a, b) => Number(Boolean(byPerson.get(a.id)?.length)) - Number(Boolean(byPerson.get(b.id)?.length)));
    return rows;
  }, [recipients, byPerson, sort, onlyNoGift]);

  if (recipients.length === 0) {
    return (
      <div className={`${card} px-6 py-10 text-center sm:px-10`}>
        <EmptyIllustration />
        <p className="mx-auto mt-5 max-w-sm font-serif text-2xl font-medium leading-snug">{t.people.emptyTitle}</p>
        <p className="mt-2 text-moss">{t.people.emptyText}</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {t.quickPeople.map((p) => (
            <li key={p.name}>
              <button
                type="button"
                onClick={() => addRecipient({ name: p.name, relation: p.relation as Relation, budget_grosze: null, notes: null, birthday: null, avatar_color: "sage" })}
                className="min-h-11 rounded-full border border-line bg-paper px-4 text-sm font-semibold transition duration-200 ease-calm hover:border-spruce active:scale-[0.97]"
              >
                + {p.name}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setAdding(true)} className={`${outlineBtn} mt-6`}>
          {t.people.add}
        </button>
        <PersonForm open={adding} onClose={() => setAdding(false)} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative">
          <span className="sr-only">{t.people.sortLabel}</span>
          <select
            value={sort}
            onChange={(e) => {
              const v = e.target.value as Sort;
              setSort(v);
              try {
                localStorage.setItem(SORT_KEY, v);
              } catch {}
            }}
            className="min-h-11 appearance-none rounded-full border border-line bg-paper py-2 pl-4 pr-9 text-sm font-semibold"
          >
            {(Object.keys(t.people.sort) as Sort[]).map((k) => (
              <option key={k} value={k}>
                {t.people.sort[k]}
              </option>
            ))}
          </select>
          <svg viewBox="0 0 16 16" aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>
        <button
          type="button"
          aria-pressed={onlyNoGift}
          onClick={() => setOnlyNoGift((v) => !v)}
          className="min-h-11 rounded-full border border-line bg-paper px-4 text-sm font-semibold transition aria-pressed:border-spruce aria-pressed:bg-spruce aria-pressed:text-snow"
        >
          {t.people.filterNoGift}
        </button>
        <button type="button" onClick={() => setAdding(true)} className={`${quietBtn} ml-auto hidden lg:inline-flex`}>
          + {t.people.addMore}
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 text-center text-moss">{t.people.noMatches}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {shown.map((r) => (
            <li key={r.id}>
              <PersonCard person={r} gifts={byPerson.get(r.id) ?? []} selected={r.id === selectedId} />
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={() => setAdding(true)} className={`${outlineBtn} mt-5 w-full lg:hidden`}>
        + {t.people.addMore}
      </button>
      <PersonForm open={adding} onClose={() => setAdding(false)} />
    </div>
  );
}

function PersonCard({ person, gifts, selected }: { person: Recipient; gifts: Gift[]; selected: boolean }) {
  const money = useMoney();
  const { hideAmounts } = useGifts();
  const spent = spentOf(gifts);
  const planned = plannedOf(gifts);
  const budget = person.budget_grosze;
  const done = isDone(gifts);
  return (
    <Link
      href={`/prezenty/osoba/${person.id}`}
      aria-current={selected ? "page" : undefined}
      className={`${card} block p-4 transition duration-200 ease-calm hover:-translate-y-0.5 active:scale-[0.99] aria-[current=page]:ring-2 aria-[current=page]:ring-spruce sm:p-5`}
    >
      <div className="flex items-center gap-3">
        <Avatar name={person.name} color={person.avatar_color} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2">
            <span className="truncate font-serif text-xl font-medium">{person.name}</span>
            {done && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-spruce px-2.5 py-0.5 text-xs font-semibold text-snow">
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3 w-3">
                  <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.people.done}
              </span>
            )}
          </p>
          <p className="text-sm text-moss">{t.relations[person.relation]}</p>
        </div>
        <p className="shrink-0 text-right text-sm tabular-nums text-moss">
          {budget !== null ? fill(t.people.budgetLine, { spent: money(spent, { round: true }), budget: money(budget, { round: true }) }) : t.people.noBudget}
        </p>
      </div>
      {budget !== null && budget > 0 && !hideAmounts && (
        <div className="mt-3">
          <BudgetBar spent={spent} planned={planned} budget={budget} label={`${person.name}: ${money(spent)} / ${money(budget)}`} />
        </div>
      )}
      <p className="mt-2.5 text-sm text-moss">{countsText(gifts)}</p>
    </Link>
  );
}

// ─── Widok jednej osoby ───────────────────────────────────────────────────────────────────
function PersonDetail({ id }: { id: string }) {
  const { recipients, gifts, hideAmounts } = useGifts();
  const money = useMoney();
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const person = recipients.find((r) => r.id === id);
  const mine = useMemo(() => gifts.filter((g) => g.recipient_id === id), [gifts, id]);

  if (!person) {
    return (
      <div className={`${card} px-6 py-12 text-center`}>
        <p className="text-moss">{t.people.notFound}</p>
        <Link href="/prezenty" className={`${outlineBtn} mt-5`}>
          {t.people.back}
        </Link>
      </div>
    );
  }

  const spent = spentOf(mine);
  const planned = plannedOf(mine);
  const budget = person.budget_grosze;
  const over = budget !== null && spent > budget;

  return (
    <div>
      <Link href="/prezenty" className={`${quietBtn} -ml-3 mb-2 lg:hidden`}>
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
          <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t.people.back}
      </Link>
      <div className={`${card} p-5 sm:p-7`}>
        <div className="flex items-start gap-4">
          <Avatar name={person.name} color={person.avatar_color} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="break-words font-serif text-3xl font-medium leading-tight">{person.name}</h2>
            <p className="text-moss">
              {t.relations[person.relation]}
              {person.birthday && ` · ${fill(t.person.birthday, { date: formatDate(person.birthday) })}`}
            </p>
          </div>
          <button type="button" onClick={() => setEditing(true)} className={outlineBtn}>
            {t.person.edit}
          </button>
        </div>

        <div className="mt-5">
          <p className="text-sm tabular-nums text-moss">
            {budget !== null
              ? `${t.header.spent} ${money(spent)} ${t.header.of} ${money(budget)}${!over ? ` · ${t.header.left} ${money(budget - spent)}` : ""}`
              : `${t.header.spent} ${money(spent)} · ${t.people.noBudget}`}
            {planned > 0 && ` · ${t.header.planned} ${money(planned)}`}
          </p>
          {budget !== null && budget > 0 && !hideAmounts && (
            <div className="mt-2">
              <BudgetBar spent={spent} planned={planned} budget={budget} label={`${person.name}: ${money(spent)} / ${money(budget)}`} />
            </div>
          )}
          {over && !hideAmounts && (
            <p className="mt-3 rounded-soft bg-cream px-4 py-3 text-sm text-spruce">
              {fill(t.people.overBudget, { name: person.name, amount: money(spent - budget) })}
            </p>
          )}
        </div>

        {person.notes && (
          <div className="mt-5 rounded-soft bg-cream/70 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-text">{t.person.notes}</p>
            <p className="mt-1 whitespace-pre-line text-sm">{person.notes}</p>
          </div>
        )}

        {mine.length === 0 ? (
          <p className="mt-6 text-moss">{t.person.empty}</p>
        ) : (
          <div className="mt-6 space-y-5">
            {STATUSES.map((s) => {
              const group = mine.filter((g) => g.status === s);
              if (!group.length) return null;
              return (
                <section key={s} aria-label={t.statusGroups[s]}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-text">
                    {t.statusGroups[s]} · {group.length}
                  </h3>
                  <ul className="divide-y divide-line">
                    {group.map((g) => (
                      <GiftItem key={g.id} gift={g} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}

        <button type="button" onClick={() => setAdding(true)} className={`${primaryBtn} mt-6 w-full sm:w-auto`}>
          + {t.person.addGift}
        </button>
      </div>

      <PersonForm open={editing} onClose={() => setEditing(false)} person={person} />
      <GiftForm open={adding} onClose={() => setAdding(false)} recipientId={person.id} />
    </div>
  );
}

// Ciepła ilustracja pustego stanu: pudełko z zawieszką i gwiazdką
function EmptyIllustration() {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true" className="mx-auto h-24 w-28">
      <ellipse cx="60" cy="90" rx="42" ry="5" fill="var(--color-sand)" />
      <rect x="30" y="42" width="60" height="44" rx="6" fill="var(--color-paper)" stroke="var(--color-spruce)" strokeWidth="2" />
      <rect x="25" y="32" width="70" height="14" rx="4" fill="var(--color-sage)" stroke="var(--color-spruce)" strokeWidth="2" />
      <path d="M60 32v54" stroke="var(--color-cranberry)" strokeWidth="3" />
      <path d="M60 32c-6-13-22-15-22-6 0 6 13 6 22 6zm0 0c6-13 22-15 22-6 0 6-13 6-22 6z" fill="none" stroke="var(--color-cranberry)" strokeWidth="2.2" />
      <path d="M96 20l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6-5-2.8-5 2.8 1.2-5.6-4.2-3.8 5.6-.6z" fill="var(--color-gold)" />
      <path d="M80 60l10 6v10H80z" fill="var(--color-cream)" stroke="var(--color-gold)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

// Osoby razem z ich prezentami (do podsumowania)
export function usePeopleWithGifts() {
  const { recipients, gifts } = useGifts();
  return recipients.map((r) => ({ person: r, gifts: gifts.filter((g) => g.recipient_id === r.id) }));
}

export { countsText, statusCounts };
