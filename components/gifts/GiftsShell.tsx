"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { gifts as t } from "@/content/gifts";
import { siteConfig } from "@/config/site";
import { fill } from "@/lib/plural";
import { getSupabase } from "@/lib/supabase";
import { GiftsProvider, useGifts } from "@/lib/gifts/store";
import { countdownText } from "@/lib/gifts/dates";
import { plannedOf, spentOf } from "@/lib/gifts/types";
import { FeatureGate } from "@/components/features/FeatureGate";
import { GiftForm, ListForm, PersonForm } from "@/components/gifts/Forms";
import { BudgetBar, card, Menu, ToastBar, useMoney } from "@/components/gifts/ui";

// Moduł „Prezenty i budżet”: niezalogowany widzi pierwszy ekran z filmem,
// zalogowany – nagłówek listy, zakładki i wybraną część modułu.
export function GiftsShell({ children }: { children: ReactNode }) {
  return (
    <FeatureGate intro={t.intro} video={siteConfig.videos.prezenty}>
      {(session) => (
        <GiftsProvider supabase={getSupabase()!} session={session}>
          <Frame>{children}</Frame>
        </GiftsProvider>
      )}
    </FeatureGate>
  );
}

const TABS = [
  { href: "/prezenty", label: t.tabs.people, match: (p: string) => p === "/prezenty" || p.startsWith("/prezenty/osoba") },
  { href: "/prezenty/wszystkie", label: t.tabs.all },
  { href: "/prezenty/podsumowanie", label: t.tabs.summary },
  { href: "/prezenty/rodzina", label: t.tabs.family, soon: true },
  { href: "/prezenty/moja-lista", label: t.tabs.wishlist, soon: true },
  { href: "/prezenty/losowania", label: t.tabs.santa, soon: true },
];

function Frame({ children }: { children: ReactNode }) {
  const { ready, error, list, session, supabase } = useGifts();
  const pathname = usePathname();
  return (
    <section className="min-h-[70vh] bg-cream pb-28 pt-6 sm:pt-10 lg:pb-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {error ? (
          <p className={`${card} p-8 text-center text-moss`}>{error}</p>
        ) : !ready || !list ? (
          <p className={`${card} p-8 text-center text-moss`}>{t.loading}</p>
        ) : (
          <>
            <ModuleHeader />
            <nav aria-label={t.tabs.label} className="scroll-row -mx-4 mt-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <ul className="flex w-max gap-1 rounded-full bg-sand/60 p-1">
                {TABS.map((tab) => {
                  const active = tab.match ? tab.match(pathname) : pathname === tab.href;
                  return (
                    <li key={tab.href}>
                      <Link
                        href={tab.href}
                        aria-current={active ? "page" : undefined}
                        className="flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-semibold text-moss transition duration-200 hover:text-spruce aria-[current=page]:bg-paper aria-[current=page]:text-spruce aria-[current=page]:shadow-[0_1px_4px_rgb(31_58_46/0.12)]"
                      >
                        {tab.label}
                        {tab.soon && <span className="rounded-full bg-cream px-1.5 text-[0.6875rem] font-semibold text-gold-text">{t.tabs.soon}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-6">{children}</div>
            <Fab />
          </>
        )}
        <p className="mt-10 text-center text-sm text-moss">
          {fill(t.signedInAs, { email: session.user.email ?? "" })}{" "}
          <button type="button" onClick={() => supabase.auth.signOut()} className="min-h-11 font-semibold underline underline-offset-4 hover:text-spruce">
            {t.logout}
          </button>
        </p>
      </div>
      <ToastBar />
    </section>
  );
}

function ModuleHeader() {
  const { list, lists, gifts, recipients, hideAmounts, toggleHide, selectList } = useGifts();
  const money = useMoney();
  const [listForm, setListForm] = useState<"new" | "edit" | null>(null);
  if (!list) return null;
  const h = t.header;
  const spent = spentOf(gifts);
  const planned = plannedOf(gifts);
  const budget = list.total_budget_grosze ?? (recipients.some((r) => r.budget_grosze) ? recipients.reduce((s, r) => s + (r.budget_grosze ?? 0), 0) : null);
  const countdown = countdownText(list);

  return (
    <header className={`${card} p-5 sm:p-7`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {countdown && <p className="text-sm font-semibold text-gold-text">{countdown}</p>}
          <div className="flex items-center gap-1">
            <h1 className="truncate font-serif text-[2rem] font-medium leading-tight tracking-[-0.02em] sm:text-4xl" style={{ fontVariationSettings: '"SOFT" 100' }}>
              {list.name}
            </h1>
            <Menu
              label={h.switchList}
              items={[
                ...lists.filter((l) => l.id !== list.id).map((l) => ({ label: l.name, onSelect: () => selectList(l.id) })),
                { label: `+ ${h.newList}`, onSelect: () => setListForm("new") },
                { label: h.editList, onSelect: () => setListForm("edit") },
              ]}
            />
          </div>
        </div>
        <button
          type="button"
          aria-pressed={hideAmounts}
          onClick={toggleHide}
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold text-moss transition duration-200 hover:bg-cream hover:text-spruce active:scale-[0.97]"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            {hideAmounts && <path d="M4 20L20 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
          </svg>
          <span className="hidden sm:inline">{hideAmounts ? h.showAmounts : h.hideAmounts}</span>
          <span className="sr-only sm:hidden">{hideAmounts ? h.showAmounts : h.hideAmounts}</span>
        </button>
      </div>

      <p className="mt-4 tabular-nums">
        <span className="text-moss">{h.spent} </span>
        <span className="font-serif text-2xl font-medium">{money(spent)}</span>
        {budget !== null && (
          <>
            <span className="text-moss">
              {" "}
              {h.of} {money(budget)} ·{" "}
            </span>
            <span className={spent > budget ? "text-spruce" : "text-moss"}>
              {spent > budget ? `${money(spent - budget)} ${h.over}` : `${h.left} ${money(budget - spent)}`}
            </span>
          </>
        )}
        {planned > 0 && <span className="text-moss"> · {h.planned} {money(planned)}</span>}
      </p>
      {budget !== null && budget > 0 && !hideAmounts && (
        <div className="mt-3">
          <BudgetBar spent={spent} planned={planned} budget={budget} label={`${h.spent} ${money(spent)} ${h.of} ${money(budget)}`} />
        </div>
      )}
      {hideAmounts && <p className="mt-3 text-sm text-moss">{h.hiddenNotice}</p>}

      <ListForm open={listForm !== null} onClose={() => setListForm(null)} mode={listForm ?? "edit"} />
    </header>
  );
}

// Duży „+” na telefonie: na liście osób dodaje osobę, u osoby i we „Wszystkich” – prezent
function Fab() {
  const pathname = usePathname();
  const { recipients } = useGifts();
  const [open, setOpen] = useState(false);
  const personId = pathname.startsWith("/prezenty/osoba/") ? pathname.split("/")[3] : undefined;
  const kind = pathname === "/prezenty" ? "person" : personId || pathname === "/prezenty/wszystkie" ? "gift" : null;
  if (!kind || (kind === "gift" && recipients.length === 0)) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={kind === "person" ? t.fab.person : t.fab.gift}
        className="fixed bottom-6 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-cranberry text-paper shadow-[0_14px_30px_-10px_rgb(168_68_58/0.7)] transition duration-200 ease-calm active:scale-95 lg:hidden"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
      {kind === "person" ? (
        <PersonForm open={open} onClose={() => setOpen(false)} />
      ) : (
        <GiftForm open={open} onClose={() => setOpen(false)} recipientId={personId} />
      )}
    </>
  );
}
