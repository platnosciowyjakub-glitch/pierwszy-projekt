import { prezenty } from "@/content/prezenty";
import { MockCard, statusTone } from "@/components/mockups/parts";
import { LockIcon } from "@/components/mockups/Mockups";
import { CheckIcon } from "@/components/ui/CheckIcon";

// Makiety ekranów listy prezentów (przydadzą się też w samej aplikacji).

const h = prezenty.heroMock;
const m = prezenty.mocks;

function Bar({ value, max, className = "bg-gold" }: { value: number; max: number; className?: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-cream">
      <div className={`h-full rounded-full ${className}`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  );
}

// Duża makieta w pierwszym ekranie: osoby, prezenty, statusy i budżety
export function GiftListMock({ className = "" }: { className?: string }) {
  return (
    <MockCard className={`p-5 sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-xl font-medium" style={{ fontVariationSettings: '"SOFT" 100' }}>
            {h.title}
          </p>
          <p className="text-sm text-moss">{h.total}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-semibold text-moss">
          <LockIcon /> {h.hideLabel}
        </span>
      </div>
      <div className="mt-3">
        <Bar value={340} max={600} />
      </div>
      <ul className="mt-4 divide-y divide-line">
        {h.people.map((p) => (
          <li key={p.name} className="py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage font-serif">{p.name[0]}</span>
                <span>
                  <span className="block text-sm font-bold">{p.name}</span>
                  <span className="block text-xs text-moss">{p.gift}</span>
                </span>
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold ${statusTone[p.status]}`}>{p.status}</span>
            </div>
            <div className="mt-2 flex items-center gap-3 pl-12">
              <div className="flex-1">
                <Bar value={p.spent} max={p.budget} className={p.spent >= p.budget ? "bg-cranberry" : "bg-gold"} />
              </div>
              <span className="w-20 text-right text-[0.7rem] tabular-nums text-moss">
                {p.spent} / {p.budget} zł
              </span>
            </div>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}

export function BudgetMock() {
  const b = m.budzet;
  return (
    <div className="space-y-3">
      <MockCard>
        <div className="flex items-center justify-between">
          <p className="font-bold">{b.name}</p>
          <p className="text-xs text-moss">{b.left}</p>
        </div>
        <div className="mt-2">
          <Bar value={120} max={150} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-moss">
          <span>
            {b.spentLabel}: <b className="text-spruce">{b.spent}</b>
          </span>
          <span>
            {b.budgetLabel}: <b className="text-spruce">{b.budget}</b>
          </span>
        </div>
      </MockCard>
      <MockCard className="ml-8 flex items-center gap-2 border-dashed text-sm text-moss">
        <LockIcon /> {b.hidden}: ••• zł
      </MockCard>
    </div>
  );
}

export function StagesMock() {
  const e = m.etapy;
  return (
    <MockCard>
      <p className="font-bold">{e.gift}</p>
      <p className="text-xs text-moss">{e.for}</p>
      <ol className="mt-4 flex items-center">
        {e.steps.map((step, i) => (
          <li key={step} className="flex flex-1 flex-col items-center gap-1.5 text-center">
            <span className="flex w-full items-center">
              <span className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : i <= e.active ? "bg-cranberry" : "bg-line"}`} />
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  i <= e.active ? "border-cranberry bg-cranberry text-paper" : "border-line bg-paper"
                }`}
              >
                {i <= e.active && <CheckIcon className="h-3.5 w-3.5" />}
              </span>
              <span className={`h-0.5 flex-1 ${i === e.steps.length - 1 ? "opacity-0" : i < e.active ? "bg-cranberry" : "bg-line"}`} />
            </span>
            <span className={`text-[0.7rem] ${i === e.active ? "font-bold" : "text-moss"}`}>{step}</span>
          </li>
        ))}
      </ol>
    </MockCard>
  );
}

export function TogetherMock() {
  const r = m.razem;
  return (
    <div className="space-y-3">
      <MockCard className="flex items-center gap-3">
        <span className="flex -space-x-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper bg-sage font-serif">{r.you[0]}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper bg-sand font-serif">{r.partner[0]}</span>
        </span>
        <span className="text-sm">
          <b>
            {r.you} i {r.partner}
          </b>
          <span className="block text-xs text-moss">{r.shared}</span>
        </span>
      </MockCard>
      <MockCard className="ml-8 flex items-center gap-3 border-dashed">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-cranberry">
          <LockIcon className="h-4 w-4" />
        </span>
        <span className="text-sm">
          <b>{r.hiddenGift}</b>
          <span className="block text-xs text-moss">{r.hiddenNote}</span>
        </span>
      </MockCard>
    </div>
  );
}

export function WishlistMock() {
  const r = m.rodzina;
  return (
    <MockCard>
      <p className="font-bold">{r.owner}</p>
      <ul className="mt-2 divide-y divide-line">
        {r.items.map((i) => (
          <li key={i.what} className="flex items-center justify-between gap-3 py-2 text-sm">
            <span>{i.what}</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold ${
                i.state === "wolne" ? "bg-cream text-moss" : "bg-sage text-spruce"
              }`}
            >
              {i.state}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-moss">
        <LockIcon /> {r.ownerSees}
      </p>
    </MockCard>
  );
}
