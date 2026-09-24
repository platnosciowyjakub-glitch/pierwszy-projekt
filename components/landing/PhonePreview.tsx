import { landing } from "@/content/landing";
import { Star } from "@/components/illustrations/Star";

const t = landing.phone;

// Ekran telefonu z przykładowymi danymi. To tylko ilustracja, nie prawdziwa aplikacja.
export function PhonePreview() {
  return (
    <figure className="relative mx-auto w-full max-w-[18rem]">
      {/* Ciepła poświata za telefonem, jak od lampki */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(201_161_91/0.28),transparent)]"
      />
      <div className="rounded-phone border border-sand-deep bg-spruce p-2.5 shadow-lifted">
        <div className="overflow-hidden rounded-[2rem] bg-cream px-5 pb-6 pt-4">
          <div aria-hidden="true" className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-sand-deep" />

          <div className="flex items-center justify-between">
            <p className="text-xs text-moss">{t.date}</p>
            <Star className="glow h-4 w-4 text-gold" />
          </div>
          <p className="mt-1 font-serif text-xl leading-tight">{t.greeting}</p>

          <ul className="mt-5 space-y-3">
            {t.lists.map((list) => (
              <li key={list.name} className="rounded-soft bg-white/80 p-3.5 shadow-soft">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold">{list.name}</span>
                  <span className="text-xs tabular-nums text-moss">
                    {list.done} z {list.total}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${(list.done / list.total) * 100}%` }}
                  />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-moss">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-cranberry">
                    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {list.hint}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-center text-xs text-moss">{t.footer}</p>
        </div>
      </div>
      <figcaption className="sr-only">
        Podgląd aplikacji Gviazdka: listy prezentów, zadań rodzinnych i pakowania z postępem.
      </figcaption>
    </figure>
  );
}
