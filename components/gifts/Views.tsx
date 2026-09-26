"use client";

import { useMemo, useState } from "react";
import { gifts as t } from "@/content/gifts";
import { plural } from "@/lib/plural";
import { useGifts } from "@/lib/gifts/store";
import { plannedOf, spentOf, STATUSES, type GiftStatus } from "@/lib/gifts/types";
import { GiftItem } from "@/components/gifts/GiftItem";
import { statusCounts, usePeopleWithGifts } from "@/components/gifts/People";
import { Avatar, BudgetBar, card, StatusIcon, useMoney } from "@/components/gifts/ui";

// ─── „Wszystkie prezenty” z filtrami, w tym „Do zapakowania” ──────────────────────────────
type Filter = "any" | GiftStatus;

export function AllGiftsView() {
  const { gifts, recipients } = useGifts();
  const [filter, setFilter] = useState<Filter>("any");
  const [person, setPerson] = useState("any");
  const a = t.all;

  const shown = useMemo(
    () => gifts.filter((g) => (filter === "any" || g.status === filter) && (person === "any" || g.recipient_id === person)),
    [gifts, filter, person],
  );
  const allWrapped = gifts.length > 0 && !gifts.some((g) => g.status === "idea" || g.status === "bought");

  const chips: { key: Filter; label: string }[] = [
    { key: "any", label: a.any },
    { key: "bought", label: a.toWrap },
    ...STATUSES.filter((s) => s !== "bought").map((s) => ({ key: s as Filter, label: t.statuses[s] })),
  ];

  return (
    <div className={`${card} p-5 sm:p-7`}>
      <div role="group" aria-label={a.filterStatus} className="scroll-row -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={filter === c.key}
            onClick={() => setFilter(c.key)}
            className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-semibold transition aria-pressed:border-spruce aria-pressed:bg-spruce aria-pressed:text-snow"
          >
            {c.key !== "any" && <StatusIcon status={c.key} />}
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <label className="flex items-center gap-2 text-sm font-semibold">
          {a.filterPerson}
          <select value={person} onChange={(e) => setPerson(e.target.value)} className="min-h-11 rounded-full border border-line bg-paper px-4 text-sm">
            <option value="any">{a.anyone}</option>
            {recipients.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {filter === "bought" && <p className="mt-4 text-sm text-moss">{a.toWrapHint}</p>}

      {filter === "bought" && allWrapped ? (
        <p className="mt-8 text-center font-serif text-2xl font-medium">{a.allWrapped}</p>
      ) : shown.length === 0 ? (
        <p className="mt-8 text-center text-moss">{a.empty}</p>
      ) : (
        <ul className="mt-2 divide-y divide-line">
          {shown.map((g) => (
            <GiftItem key={g.id} gift={g} showPerson />
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Podsumowanie: budżet, osoby, etapy ───────────────────────────────────────────────────
export function SummaryView() {
  const { gifts, list, recipients, hideAmounts } = useGifts();
  const money = useMoney();
  const people = usePeopleWithGifts();
  const s = t.summary;
  const spent = spentOf(gifts);
  const planned = plannedOf(gifts);
  const budget = list?.total_budget_grosze ?? (recipients.some((r) => r.budget_grosze) ? recipients.reduce((x, r) => x + (r.budget_grosze ?? 0), 0) : null);
  const counts = statusCounts(gifts);

  const tiles = [
    { label: s.spent, value: money(spent) },
    { label: s.planned, value: money(planned) },
    { label: s.budget, value: budget === null ? s.noBudget : money(budget) },
    { label: s.left, value: budget === null ? "–" : money(Math.max(0, budget - spent)) },
  ];

  return (
    <div className="space-y-5">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.label} className={`${card} p-4 sm:p-5`}>
            <p className="text-sm text-moss">{tile.label}</p>
            <p className="mt-1 font-serif text-2xl font-medium tabular-nums">{tile.value}</p>
          </li>
        ))}
      </ul>

      <section aria-labelledby="sum-status" className={`${card} p-5 sm:p-7`}>
        <h2 id="sum-status" className="font-serif text-2xl font-medium">
          {s.byStatus}
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATUSES.map((st) => (
            <li key={st} className="flex items-center gap-3 rounded-2xl bg-cream/70 p-3">
              <StatusIcon status={st} className="h-5 w-5 text-spruce" />
              <span>
                <span className="block font-serif text-xl font-medium tabular-nums">{counts[st]}</span>
                <span className="text-sm text-moss">{plural(counts[st], t.people.counts[st])}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sum-people" className={`${card} p-5 sm:p-7`}>
        <h2 id="sum-people" className="font-serif text-2xl font-medium">
          {s.perPerson}
        </h2>
        <ul className="mt-4 space-y-4">
          {people.map(({ person, gifts: g }) => {
            const pSpent = spentOf(g);
            const pPlanned = plannedOf(g);
            return (
              <li key={person.id} className="flex items-center gap-3">
                <Avatar name={person.name} color={person.avatar_color} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="truncate font-semibold">{person.name}</span>
                    <span className="shrink-0 text-sm tabular-nums text-moss">
                      {money(pSpent, { round: true })}
                      {person.budget_grosze !== null && ` / ${money(person.budget_grosze, { round: true })}`}
                    </span>
                  </p>
                  {person.budget_grosze !== null && person.budget_grosze > 0 && !hideAmounts && (
                    <div className="mt-1.5">
                      <BudgetBar spent={pSpent} planned={pPlanned} budget={person.budget_grosze} label={person.name} />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="sum-faq" className={`${card} p-5 sm:p-7`}>
        <h2 id="sum-faq" className="font-serif text-2xl font-medium">
          {s.faqTitle}
        </h2>
        <div className="mt-3 divide-y divide-line">
          {s.faq.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {item.q}
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="pb-3 text-moss">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Części, które powstają w kolejnych etapach ───────────────────────────────────────────
export function SoonView({ part }: { part: keyof typeof t.soon }) {
  const s = t.soon[part];
  return (
    <div className="rounded-[1.375rem] border-2 border-dashed border-gold/50 bg-paper/70 px-6 py-14 text-center">
      <span aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage text-gold">
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path d="M12 3.5l2.4 5 5.4.6-4 3.7 1.1 5.4L12 15.5l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z" fill="currentColor" />
        </svg>
      </span>
      <p className="mt-4 font-serif text-2xl font-medium">{s.title}</p>
      <p className="mx-auto mt-2 max-w-md text-moss">{s.text}</p>
    </div>
  );
}
