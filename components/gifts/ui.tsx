"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { gifts as t } from "@/content/gifts";
import { fill } from "@/lib/plural";
import { formatGrosze } from "@/lib/money";
import { useGifts } from "@/lib/gifts/store";
import { nextStatus, STATUSES, type AvatarColor, type GiftStatus } from "@/lib/gifts/types";

// Wspólne klocki modułu prezentów.

export const inputClass =
  "min-h-12 w-full rounded-soft border border-line bg-paper px-4 py-2.5 text-base text-spruce placeholder:text-moss/70 focus:border-spruce focus:outline-none";
export const primaryBtn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cranberry px-6 font-semibold text-paper transition duration-200 ease-calm hover:bg-cranberry-deep active:scale-[0.97] disabled:opacity-60";
export const quietBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-moss transition duration-200 ease-calm hover:bg-cream hover:text-spruce active:scale-[0.97]";
export const outlineBtn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-spruce px-5 text-sm font-semibold text-spruce transition duration-200 ease-calm hover:bg-spruce hover:text-snow active:scale-[0.97]";
export const card = "rounded-[1.375rem] bg-paper shadow-[0_1px_2px_rgb(31_58_46/0.06),0_12px_28px_-18px_rgb(31_58_46/0.3)]";

// Kwota albo „••• zł”, gdy kwoty są ukryte
export function useMoney() {
  const { hideAmounts } = useGifts();
  return (grosze: number, opts?: { round?: boolean }) => (hideAmounts ? `${t.header.hidden} zł` : formatGrosze(grosze, opts));
}

// ─── Panel wysuwany od dołu (na komputerze okienko na środku) ─────────────────────────────
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-[1.75rem] bg-paper p-0 text-spruce shadow-[0_-20px_60px_-20px_rgb(31_58_46/0.35)] backdrop:bg-spruce/35 backdrop:backdrop-blur-[2px] open:animate-[sheet-in_380ms_var(--ease-calm)] sm:m-auto sm:max-w-lg sm:rounded-[1.75rem]"
    >
      {open && (
        <div className="px-5 pb-8 pt-3 sm:px-8 sm:pt-6">
          <div aria-hidden="true" className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-line sm:hidden" />
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="pt-1 font-serif text-2xl font-medium">
              {title}
            </h2>
            <button type="button" onClick={onClose} className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-moss hover:bg-cream">
              <span className="sr-only">{t.sheet.close}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      )}
    </dialog>
  );
}

export function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-sm text-moss">{hint}</p>}
    </div>
  );
}

export function ErrorText({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-3 text-sm text-cranberry">
      {children}
    </p>
  );
}

// ─── Awatar osoby ─────────────────────────────────────────────────────────────────────────
const avatarColors: Record<AvatarColor, string> = {
  sage: "bg-sage text-spruce",
  gold: "bg-[#EBD9B4] text-spruce",
  cranberry: "bg-cranberry text-paper",
  spruce: "bg-spruce text-snow",
  sand: "bg-sand text-spruce",
  moss: "bg-moss text-paper",
};
export const avatarSwatch = avatarColors;

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function Avatar({ name, color, size = "md" }: { name: string; color: AvatarColor; size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-serif font-medium ${avatarColors[color]} ${
        size === "lg" ? "h-16 w-16 text-2xl" : "h-12 w-12 text-lg"
      }`}
    >
      {initials(name)}
    </span>
  );
}

// ─── Pasek budżetu: wydane (świerk) + planowane (jaśniej), przekroczenie w żurawinie ─────
export function BudgetBar({ spent, planned, budget, label }: { spent: number; planned: number; budget: number; label: string }) {
  const over = spent > budget;
  const spentPct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
  const plannedPct = budget > 0 ? Math.min(100 - spentPct, (planned / budget) * 100) : 0;
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={budget}
      aria-valuenow={Math.min(spent, budget)}
      className="flex h-2 overflow-hidden rounded-full bg-sand/70"
    >
      <div className={`h-full rounded-full transition-[width] duration-500 ease-calm ${over ? "bg-cranberry" : "bg-spruce"}`} style={{ width: `${spentPct}%` }} />
      <div className="h-full bg-spruce/25 transition-[width] duration-500 ease-calm" style={{ width: `${plannedPct}%` }} />
    </div>
  );
}

// ─── Ikony statusów ───────────────────────────────────────────────────────────────────────
export function StatusIcon({ status, className = "h-4 w-4" }: { status: GiftStatus; className?: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      {status === "idea" && <path d="M10 2.8l1.9 4.2 4.5.5-3.4 3 1 4.5L10 12.7 6 15l1-4.5-3.4-3 4.5-.5z" {...s} />}
      {status === "bought" && (
        <>
          <path d="M4.5 7h11l-.8 9.2a1.5 1.5 0 0 1-1.5 1.3H6.8a1.5 1.5 0 0 1-1.5-1.3z" {...s} />
          <path d="M7.5 9V6a2.5 2.5 0 0 1 5 0v3" {...s} />
        </>
      )}
      {status === "wrapped" && (
        <>
          <rect x="3.5" y="8" width="13" height="9" rx="1.5" {...s} />
          <path d="M10 8v9M3.5 11.5h13" {...s} />
          <path className="gv-bow" d="M10 8C8.5 4.5 5 4.5 5.5 6.5 6 8 10 8 10 8zm0 0c1.5-3.5 5-3.5 4.5-1.5C14 8 10 8 10 8z" {...s} />
        </>
      )}
      {status === "given" && <path d="M4.5 10.5l3.5 3.5 7.5-8" {...s} strokeWidth={2} />}
    </svg>
  );
}

const statusStyle: Record<GiftStatus, string> = {
  idea: "bg-sage text-spruce",
  bought: "bg-[#EBD9B4] text-spruce",
  wrapped: "bg-cranberry text-paper",
  given: "bg-spruce text-snow",
};

// Etykieta statusu: stuknięcie = następny etap; strzałka obok = wybór dowolnego etapu (także cofnięcie)
export function StatusControl({ id, status, name, animate }: { id: string; status: GiftStatus; name: string; animate: boolean }) {
  const { setStatus } = useGifts();
  const next = nextStatus(status);
  return (
    <span className={`relative inline-flex shrink-0 items-stretch overflow-hidden rounded-full ${statusStyle[status]}`}>
      <button
        type="button"
        onClick={() => next && setStatus(id, next)}
        disabled={!next}
        aria-label={next ? `${t.statuses[status]}. ${fill(t.statusNext, { status: t.statuses[next] })}` : t.statuses[status]}
        className="flex min-h-11 items-center gap-1.5 pl-3.5 pr-2 text-sm font-semibold transition-colors duration-300 disabled:cursor-default"
      >
        <span key={status} className={`relative inline-flex ${animate ? (status === "wrapped" ? "gv-wiggle" : status === "given" ? "gv-pop" : "") : ""}`}>
          <StatusIcon status={status} />
          {animate && status === "given" && (
            <svg viewBox="0 0 20 20" aria-hidden="true" className="gv-star absolute -right-2 -top-2 h-3 w-3 text-gold">
              <path d="M10 1.5l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6L10 13.9 5 16.7l1.2-5.6L2 7.3l5.6-.6z" fill="currentColor" />
            </svg>
          )}
        </span>
        {t.statuses[status]}
      </button>
      <span className="relative flex w-8 items-center justify-center border-l border-current/15">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="pointer-events-none h-3.5 w-3.5">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <select
          value={status}
          onChange={(e) => setStatus(id, e.target.value as GiftStatus)}
          aria-label={fill(t.statusPick, { name })}
          className="absolute inset-0 cursor-pointer appearance-none opacity-0"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {t.statuses[s]}
            </option>
          ))}
        </select>
      </span>
    </span>
  );
}

// ─── Małe menu „więcej” ───────────────────────────────────────────────────────────────────
export function Menu({ label, items }: { label: string; items: { label: string; onSelect: () => void; danger?: boolean }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  return (
    <div ref={ref} className={`relative shrink-0 ${open ? "z-30" : ""}`}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-moss transition hover:bg-cream hover:text-spruce"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
          <circle cx="4.5" cy="10" r="1.5" fill="currentColor" />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          <circle cx="15.5" cy="10" r="1.5" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <ul className="pop-in absolute right-0 top-full z-30 mt-1 w-60 origin-top-right rounded-2xl border border-line bg-paper p-1.5 shadow-[0_18px_40px_-16px_rgb(31_58_46/0.35)]">
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
                className={`flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-semibold hover:bg-cream ${item.danger ? "text-cranberry" : "text-spruce"}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Komunikat na dole ekranu (z „Cofnij”) ────────────────────────────────────────────────
export function ToastBar() {
  const { toast, dismissToast } = useGifts();
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismissToast, toast.action ? 8000 : 4500);
    return () => clearTimeout(timer);
  }, [toast, dismissToast]);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 lg:bottom-8">
      {toast && (
        <div key={toast.id} className="pop-in pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-spruce py-2 pl-5 pr-2 text-sm text-snow shadow-[0_16px_40px_-14px_rgb(31_58_46/0.6)]">
          <span className="py-1.5">{toast.text}</span>
          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action!.run();
                dismissToast();
              }}
              className="min-h-10 shrink-0 rounded-full bg-snow/15 px-4 font-semibold hover:bg-snow/25"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Ciepła ilustracja zamiast zdjęcia: pudełko z zawieszką
export function GiftPlaceholder({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex items-center justify-center bg-cream text-gold ${className}`}>
      <svg viewBox="0 0 40 40" className="h-3/5 w-3/5">
        <rect x="8" y="17" width="24" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="6" y="12" width="28" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 12v21" stroke="var(--color-cranberry)" strokeWidth="1.6" />
        <path d="M20 12c-2.5-5.5-9-6.5-9-2.5 0 2.5 5 2.5 9 2.5zm0 0c2.5-5.5 9-6.5 9-2.5 0 2.5-5 2.5-9 2.5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M29 24l4 3v4h-4z" fill="none" stroke="var(--color-spruce)" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
