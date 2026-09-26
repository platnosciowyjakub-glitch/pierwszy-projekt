import { Rich } from "@/components/ui/Rich";

export type WorkspaceTexts = { eyebrow: string; title: string; subtitle: string; soonTitle?: string; soonText?: string };

// Miejsce pracy po zalogowaniu: nagłówek zakładki, a pod nim narzędzie.
// Bez narzędzia pokazuje spokojną kartkę „Tu powstanie…”.
export function Workspace({ t, children }: { t: WorkspaceTexts; children?: React.ReactNode }) {
  return (
    <section aria-labelledby="tool-title" className="min-h-[70vh] bg-cream pb-20 pt-10 sm:pt-14 lg:pb-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-gold-text">{t.eyebrow}</p>
        <h1
          id="tool-title"
          className="mt-2 font-serif text-[2.25rem] font-medium leading-[1.1] tracking-[-0.025em] sm:text-5xl [&_.accent]:italic [&_.accent]:text-cranberry"
          style={{ fontVariationSettings: '"SOFT" 100' }}
        >
          <Rich text={t.title} />
        </h1>
        <p className="mt-3 text-lg text-moss">{t.subtitle}</p>
        <div className="mt-8">
          {children ?? (
            <div className="rounded-frame border-2 border-dashed border-gold/50 bg-paper/70 px-6 py-14 text-center">
              <span aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage text-gold">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path d="M12 3.5l2.4 5 5.4.6-4 3.7 1.1 5.4L12 15.5l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z" fill="currentColor" />
                </svg>
              </span>
              <p className="mt-4 font-serif text-2xl font-medium">{t.soonTitle}</p>
              <p className="mx-auto mt-2 max-w-md text-moss">{t.soonText}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
