import { landing } from "@/content/landing";
import { Initials, MockCard, Tick, statusTone } from "@/components/mockups/parts";

const m = landing.mockups;

export function GiftsMock({ className = "" }: { className?: string }) {
  const g = m.gifts;
  return (
    <MockCard className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-bold">{g.title}</p>
        <p className="text-xs text-moss">{g.summary}</p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream">
        <div className="h-full w-[57%] rounded-full bg-gold" />
      </div>
      <ul className="mt-3 divide-y divide-line">
        {g.items.map((i) => (
          <li key={i.who} className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm">
              <span className="font-semibold">{i.who}</span> <span className="text-moss">· {i.what}</span>
            </span>
            <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-bold ${statusTone[i.status]}`}>{i.status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-moss">
        <LockIcon /> {g.privacy}
      </p>
    </MockCard>
  );
}

export function FamilyMock({ className = "" }: { className?: string }) {
  const f = m.family;
  return (
    <MockCard className={className}>
      <p className="font-bold">{f.title}</p>
      <ul className="mt-2 divide-y divide-line">
        {f.items.map((i) => (
          <li key={i.task} className="flex items-center gap-3 py-2">
            <Tick done={i.done} />
            <span className={`flex-1 text-sm ${i.done ? "text-moss line-through" : ""}`}>{i.task}</span>
            <Initials letters={i.who} />
            <span className="sr-only">{i.names}</span>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}

export function PackingMock({ className = "" }: { className?: string }) {
  const f = m.family;
  return (
    <MockCard className={className}>
      <p className="text-sm font-bold">{f.packingTitle}</p>
      <ul className="mt-1.5 space-y-1.5">
        {f.packing.map((i) => (
          <li key={i.item} className="flex items-center gap-2 text-sm">
            <Tick done={i.done} />
            {i.item}
          </li>
        ))}
      </ul>
    </MockCard>
  );
}

export function InvitationMock({ className = "" }: { className?: string }) {
  const v = m.invitation;
  return (
    <MockCard className={`text-center ${className}`}>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-gold-text">{v.label}</p>
      <p className="mt-1 font-serif text-xl font-medium" style={{ fontVariationSettings: '"SOFT" 50' }}>
        {v.title}
      </p>
      <p className="mt-1 text-sm">{v.date}</p>
      <p className="text-xs text-moss">{v.address}</p>
      <div aria-hidden="true" className="mt-3 flex justify-center gap-2">
        <span className="rounded-full bg-cranberry px-4 py-1.5 text-sm font-semibold text-paper">{v.yes}</span>
        <span className="rounded-full border border-spruce px-4 py-1.5 text-sm font-semibold">{v.no}</span>
      </div>
    </MockCard>
  );
}

export function GuestsMock({ className = "" }: { className?: string }) {
  const v = m.invitation;
  return (
    <MockCard className={className}>
      <p className="text-sm font-bold">{v.guestsTitle}</p>
      <ul className="mt-1 divide-y divide-line">
        {v.guests.map((g) => (
          <li key={g.name} className="py-1.5 text-sm">
            <span className="font-semibold">{g.name}</span>
            <span className="block text-xs text-moss">
              {g.note}
              {g.diet && ` · ${g.diet}`}
            </span>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}

export function LockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
