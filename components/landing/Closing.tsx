import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { buttonClass } from "@/components/ui/Button";
import { SignupForm } from "@/components/landing/SignupForm";
import { CandleIllustration } from "@/components/illustrations/Illustrations";

const t = landing.closing;

export function Closing() {
  return (
    <Section id="zapisy" labelledBy="closing-title">
      <div className="reveal mx-auto max-w-xl text-center">
        <CandleIllustration className="mx-auto h-20 w-20" />
        <h2 id="closing-title" className="mt-6 text-[2rem] leading-[1.15] tracking-[-0.015em] sm:text-[2.75rem]">
          {t.title}
        </h2>
        {!siteConfig.launched && <p className="mt-4 text-lg text-moss">{t.text}</p>}
        <div className="mt-10 text-left">
          {siteConfig.launched ? (
            <div className="text-center">
              <a href={siteConfig.appUrl} className={buttonClass}>
                {landing.hero.launchedButton}
              </a>
            </div>
          ) : (
            <SignupForm note={landing.hero.note} />
          )}
        </div>
      </div>
    </Section>
  );
}
