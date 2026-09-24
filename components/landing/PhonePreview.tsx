import { landing } from "@/content/landing";
import { Star } from "@/components/illustrations/Star";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { PhoneFrame } from "@/components/landing/PhoneFrame";

const t = landing.phone;

export function PhonePreview() {
  return (
    <PhoneFrame label="Podgląd aplikacji Gviazdka: listy prezentów, zadań rodzinnych i pakowania z postępem.">
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
              <div className="h-full rounded-full bg-gold" style={{ width: `${(list.done / list.total) * 100}%` }} />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-moss">
              <CheckIcon className="h-3.5 w-3.5 shrink-0 text-cranberry" />
              {list.hint}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-center text-xs text-moss">{t.footer}</p>
    </PhoneFrame>
  );
}
