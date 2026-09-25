// Ilustracje w jednej konwencji: cienka zielona kreska, miękka złota plama w tle,
// drobny akcent żurawiny. Rysunki są ozdobne, więc czytniki ekranu je pomijają.

type Props = { className?: string };

const line = {
  fill: "none",
  stroke: "var(--color-spruce)",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Blob({ cx = 34, cy = 36, r = 24 }: { cx?: number; cy?: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="var(--color-gold)" opacity="0.2" />;
}

export function GiftIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <rect x="14" y="28" width="36" height="24" rx="3" {...line} />
      <rect x="11" y="21" width="42" height="8" rx="2.5" {...line} />
      <path d="M32 21v31" {...line} stroke="var(--color-cranberry)" />
      <path d="M32 21c-3-7-12-9-12-3.5 0 3.5 7 3.5 12 3.5zM32 21c3-7 12-9 12-3.5 0 3.5-7 3.5-12 3.5z" {...line} />
    </svg>
  );
}

export function HomeIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <path d="M12 30L32 13l20 17" {...line} />
      <path d="M17 26v26h30V26" {...line} />
      <path d="M28 52V40h8v12" {...line} />
      <rect x="21" y="31" width="7" height="6" rx="1" fill="var(--color-gold)" opacity="0.7" />
      <path d="M44 9l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z" fill="var(--color-cranberry)" />
    </svg>
  );
}

export function SuitcaseIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <rect x="13" y="22" width="38" height="28" rx="4" {...line} />
      <path d="M25 22v-5a3 3 0 013-3h8a3 3 0 013 3v5" {...line} />
      <path d="M23 22v28M41 22v28" {...line} />
      <path d="M20 54h.01M44 54h.01" {...line} strokeWidth="3" />
      <path d="M28 34l3 3 6-6" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

export function MugIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob cx={30} />
      <path d="M16 28h28v14a10 10 0 01-10 10h-8a10 10 0 01-10-10z" {...line} />
      <path d="M44 32h3a5 5 0 010 10h-3" {...line} />
      <path d="M24 12c-2 3 2 5 0 8M31 10c-2 3 2 5 0 8M38 12c-2 3 2 5 0 8" {...line} stroke="var(--color-gold)" />
      <path d="M26 38l4 3 4-3" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

export function CandleIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="32" cy="16" r="12" fill="var(--color-gold)" opacity="0.25" className="glow" />
      <path d="M32 8c3 4 4 7 0 10-4-3-3-6 0-10z" fill="var(--color-gold)" />
      <path d="M32 18v4" {...line} />
      <rect x="25" y="22" width="14" height="30" rx="3" {...line} />
      <path d="M16 54h32" {...line} />
      <path d="M18 54c2-4 6-5 9-4M46 54c-2-4-6-5-9-4" {...line} stroke="var(--color-moss)" />
    </svg>
  );
}

export function CalendarIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <rect x="12" y="16" width="40" height="36" rx="4" {...line} />
      <path d="M12 26h40M22 11v9M42 11v9" {...line} />
      <path d="M20 34h.01M28 34h.01M36 34h.01M44 34h.01M20 42h.01M28 42h.01" {...line} strokeWidth="3" />
      <path d="M40.5 38.5l1.4 2.9 3.1.4-2.3 2.1.6 3.1-2.8-1.6-2.8 1.6.6-3.1-2.3-2.1 3.1-.4z" fill="var(--color-cranberry)" />
    </svg>
  );
}

export function EnvelopeIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <rect x="11" y="18" width="42" height="30" rx="3.5" {...line} />
      <path d="M12 20l20 15 20-15" {...line} />
      <circle cx="32" cy="37" r="4" fill="var(--color-cranberry)" />
    </svg>
  );
}

export function CardIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <rect x="14" y="14" width="30" height="38" rx="3" {...line} transform="rotate(-6 29 33)" />
      <path d="M22 40h14M22 45h9" {...line} transform="rotate(-6 29 33)" />
      <path d="M29 20l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="var(--color-gold)" transform="rotate(-6 29 33)" />
      <path d="M44 50l8-20 3 1.2-8 20-3.5 1.5z" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

export function SparkleIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <path d="M30 14c1.5 9 5 12.5 14 14-9 1.5-12.5 5-14 14-1.5-9-5-12.5-14-14 9-1.5 12.5-5 14-14z" {...line} />
      <path d="M46 38c.7 3.8 2.2 5.3 6 6-3.8.7-5.3 2.2-6 6-.7-3.8-2.2-5.3-6-6 3.8-.7 5.3-2.2 6-6z" fill="var(--color-gold)" />
      <circle cx="47" cy="17" r="2" fill="var(--color-cranberry)" />
    </svg>
  );
}

export function BellIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <path d="M20 42V30a12 12 0 0124 0v12l4 4H16z" {...line} />
      <path d="M28 50a4 4 0 008 0" {...line} />
      <path d="M32 14v4" {...line} />
      <path d="M26 30c0-3 2-5.5 5-6" {...line} stroke="var(--color-gold)" />
      <circle cx="46" cy="18" r="3.5" fill="var(--color-cranberry)" />
    </svg>
  );
}

export function PhoneIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <Blob />
      <rect x="21" y="10" width="22" height="44" rx="4.5" {...line} />
      <path d="M29 15h6" {...line} />
      <rect x="26" y="22" width="12" height="4" rx="1.5" fill="var(--color-gold)" opacity="0.8" />
      <rect x="26" y="30" width="12" height="4" rx="1.5" fill="var(--color-gold)" opacity="0.5" />
      <path d="M27 42l3 3 6-6" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}
