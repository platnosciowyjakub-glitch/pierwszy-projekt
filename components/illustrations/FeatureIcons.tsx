// Ikony funkcji w jednej konwencji: cienka zielona kreska, drobny akcent żurawiny lub złota.

type Props = { className?: string };

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Calendar({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="5" y="7" width="22" height="20" rx="3" {...line} />
      <path d="M5 13h22M11 4v5M21 4v5" {...line} />
      <path d="M20.5 17.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.3z" fill="var(--color-cranberry)" />
      <path d="M10 18h3M10 22h3" {...line} />
    </svg>
  );
}

function Gift({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="6" y="14" width="20" height="13" rx="2" {...line} />
      <rect x="4.5" y="10" width="23" height="4.5" rx="1.5" {...line} />
      <path d="M16 10v17" {...line} stroke="var(--color-cranberry)" />
      <path d="M16 10c-2-4.5-7.5-5.5-7.5-2 0 2 4 2 7.5 2zM16 10c2-4.5 7.5-5.5 7.5-2 0 2-4 2-7.5 2z" {...line} />
    </svg>
  );
}

function Family({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="11" cy="10" r="3.5" {...line} />
      <circle cx="22" cy="11.5" r="2.8" {...line} />
      <path d="M4.5 25c0-4 3-6.5 6.5-6.5s6.5 2.5 6.5 6.5M17.5 20.5c1.2-1.3 2.8-2 4.5-2 3 0 5.5 2.2 5.5 6" {...line} />
      <path d="M13 27.5l2 2 4-4.5" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

function Envelope({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="4" y="8" width="24" height="17" rx="2.5" {...line} />
      <path d="M5 9.5l11 8 11-8" {...line} />
      <circle cx="16" cy="18.5" r="2.4" fill="var(--color-cranberry)" />
    </svg>
  );
}

function Suitcase({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="5" y="10" width="22" height="16" rx="2.5" {...line} />
      <path d="M12 10V7.5A1.5 1.5 0 0113.5 6h5A1.5 1.5 0 0120 7.5V10M11 10v16M21 10v16" {...line} />
      <path d="M13.5 18l2 2 3.5-3.5" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

function Card({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="7" y="5" width="16" height="22" rx="2" {...line} transform="rotate(-6 15 16)" />
      <path d="M11 20h7M11 23h4.5" {...line} transform="rotate(-6 15 16)" />
      <path d="M15 8.5l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="var(--color-gold)" transform="rotate(-6 15 16)" />
      <path d="M23 26l4-10 1.6.6-4 10-1.9.8z" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}


function LinkIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M13.5 18.5a5 5 0 007 0l4-4a5 5 0 00-7-7l-1.5 1.5" {...line} />
      <path d="M18.5 13.5a5 5 0 00-7 0l-4 4a5 5 0 007 7l1.5-1.5" {...line} />
      <circle cx="25" cy="25" r="2.2" fill="var(--color-cranberry)" />
    </svg>
  );
}

function Note({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M8 5h12l5 5v17H8z" {...line} />
      <path d="M20 5v5h5M12 16h9M12 20h9M12 24h5" {...line} />
      <circle cx="12.5" cy="11" r="1.6" fill="var(--color-cranberry)" />
    </svg>
  );
}

function Spark({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M14 5c.8 5 2.8 7 8 8-5.2 1-7.2 3-8 8-.8-5-2.8-7-8-8 5.2-1 7.2-3 8-8z" {...line} />
      <path d="M24 19c.4 2.2 1.3 3.1 3.5 3.5-2.2.4-3.1 1.3-3.5 3.5-.4-2.2-1.3-3.1-3.5-3.5 2.2-.4 3.1-1.3 3.5-3.5z" fill="var(--color-gold)" />
      <circle cx="24.5" cy="7.5" r="1.4" fill="var(--color-cranberry)" />
    </svg>
  );
}

function Bell({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M9 21v-6a7 7 0 0114 0v6l2.5 2.5h-19z" {...line} />
      <path d="M13.5 27a2.5 2.5 0 005 0M16 5v3" {...line} />
      <circle cx="23" cy="8" r="2.2" fill="var(--color-cranberry)" />
    </svg>
  );
}

function Hat({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M6 23c2-9 7-15 14-15 3 0 5 2 5 5" {...line} stroke="var(--color-cranberry)" />
      <rect x="4" y="22" width="20" height="5" rx="2.5" {...line} />
      <circle cx="25" cy="15" r="2.4" {...line} />
    </svg>
  );
}

function Coins({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <ellipse cx="13" cy="10" rx="7" ry="3" {...line} />
      <path d="M6 10v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M6 15v5c0 1.7 3.1 3 7 3 1 0 2-.1 2.8-.3" {...line} />
      <circle cx="22" cy="21" r="5" {...line} stroke="var(--color-cranberry)" />
      <path d="M22 19v4M20 21h4" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

function Receipt({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M8 4h16v24l-2.7-1.8L18.7 28 16 26.2 13.3 28l-2.6-1.8L8 28z" {...line} />
      <path d="M12 11h8M12 15h8M12 19h5" {...line} />
      <path d="M20 19h.01" {...line} strokeWidth="2.5" stroke="var(--color-cranberry)" />
    </svg>
  );
}

function Phone({ className }: Props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="9" y="4" width="14" height="24" rx="3" {...line} />
      <path d="M14 7.5h4" {...line} />
      <path d="M13 17l2 2 4-4" {...line} stroke="var(--color-cranberry)" />
    </svg>
  );
}

export const featureIcons = {
  calendar: Calendar,
  gift: Gift,
  family: Family,
  envelope: Envelope,
  suitcase: Suitcase,
  card: Card,
  link: LinkIcon,
  note: Note,
  spark: Spark,
  bell: Bell,
  hat: Hat,
  coins: Coins,
  receipt: Receipt,
  phone: Phone,
};
