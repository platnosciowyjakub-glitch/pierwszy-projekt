import { landing } from "@/content/landing";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { PhoneFrame } from "@/components/landing/PhoneFrame";

const s = landing.screens;

const statusStyle: Record<string, string> = {
  pomysł: "bg-sand text-moss",
  kupione: "bg-gold/25 text-gold-text",
  zapakowane: "bg-cranberry/10 text-cranberry",
  wręczone: "bg-spruce/10 text-spruce",
};

function ScreenTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <p className="text-xs text-moss">{subtitle}</p>
      <p className="mt-1 font-serif text-xl leading-tight">{title}</p>
    </>
  );
}

function Tick({ done }: { done: boolean }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
        done ? "border-cranberry bg-cranberry text-cream" : "border-sand-deep bg-white"
      }`}
    >
      {done && <CheckIcon className="h-3.5 w-3.5" />}
    </span>
  );
}

export function GiftsScreen() {
  const g = s.gifts;
  return (
    <PhoneFrame glow={false} label="Przykładowy ekran listy prezentów: osoby, prezenty, statusy i podsumowanie wydatków.">
      <ScreenTitle title={g.title} subtitle={`${g.summaryLabel}: ${g.summary}`} />
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sand">
        <div className="h-full w-[57%] rounded-full bg-gold" />
      </div>
      <ul className="mt-5 space-y-2.5">
        {g.people.map((p) => (
          <li key={p.name} className="rounded-soft bg-white/80 p-3 shadow-soft">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold">{p.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${statusStyle[p.status]}`}>
                {p.status}
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between gap-2 text-xs text-moss">
              <span>{p.gift}</span>
              <span className="tabular-nums">{p.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </PhoneFrame>
  );
}

export function TasksScreen() {
  const t = s.tasks;
  return (
    <PhoneFrame glow={false} label="Przykładowy ekran wspólnej listy zadań rodziny z przypisanymi osobami.">
      <ScreenTitle title={t.title} subtitle={t.subtitle} />
      <ul className="mt-5 space-y-2.5">
        {t.items.map((item) => (
          <li key={item.task} className="flex items-center gap-3 rounded-soft bg-white/80 p-3 shadow-soft">
            <Tick done={item.done} />
            <span className={`flex-1 text-sm ${item.done ? "text-moss line-through decoration-moss/50" : ""}`}>
              {item.task}
            </span>
            <span className="rounded-full bg-sand px-2 py-0.5 text-[0.65rem] font-bold text-moss">{item.who}</span>
          </li>
        ))}
      </ul>
    </PhoneFrame>
  );
}

export function PackingScreen() {
  const p = s.packing;
  return (
    <PhoneFrame glow={false} label="Przykładowy ekran listy pakowania na świąteczny wyjazd.">
      <ScreenTitle title={p.title} subtitle={p.subtitle} />
      <ul className="mt-5 space-y-2.5">
        {p.items.map((item) => (
          <li key={item.item} className="flex items-center gap-3 rounded-soft bg-white/80 p-3 shadow-soft">
            <Tick done={item.done} />
            <span className={`text-sm ${item.done ? "text-moss line-through decoration-moss/50" : ""}`}>
              {item.item}
            </span>
          </li>
        ))}
      </ul>
    </PhoneFrame>
  );
}
