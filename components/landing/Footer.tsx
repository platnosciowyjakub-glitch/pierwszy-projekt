import { landing } from "@/content/landing";
import { primaryAction, siteConfig } from "@/config/site";
import { resolveHref } from "@/lib/links";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

const t = landing.footer;

const socialIcons: Record<string, { label: string; path: string }> = {
  instagram: { label: "Instagram", path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5h.01" },
  facebook: { label: "Facebook", path: "M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" },
  tiktok: { label: "TikTok", path: "M14 3v11.5a3.5 3.5 0 11-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 5" },
  pinterest: { label: "Pinterest", path: "M12 3a9 9 0 00-3.3 17.4L10.5 13M9.5 16c.5.8 1.5 1.5 3 1.5 3 0 5-2.5 5-6a5.5 5.5 0 00-11 0c0 1.5.5 2.5 1.5 3" },
};

export function Footer() {
  const cta = primaryAction();
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);
  return (
    <footer className="on-dark bg-spruce text-snow">
      <Container flush className="grid lg:grid-cols-[2fr_1fr]">
        <nav aria-label="Stopka" className="grid grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 md:grid-cols-4 md:px-10 lg:border-r lg:border-snow/15 lg:py-16">
          {t.columns.map((col) => (
            <div key={col.title}>
              <h2 className="font-semibold">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={resolveHref(l.href)} className="text-[0.9375rem] text-snow/75 underline-offset-4 hover:text-snow hover:underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-snow/15 px-5 py-14 md:px-10 lg:border-t-0 lg:py-16">
          <Logo tone="dark" />
          <p className="accent mt-3 text-lg">{t.tagline}</p>
          <ButtonLink href={cta.href} variant="light" size="md" className="mt-6">
            {cta.label}
          </ButtonLink>
          {socials.length > 0 && (
            <ul className="mt-8 flex gap-4">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a href={url} aria-label={socialIcons[key].label} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-snow/10">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path d={socialIcons[key].path} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
      <div className="border-t border-snow/15">
        <Container className="flex flex-col gap-2 py-6 text-sm text-snow/75 sm:flex-row sm:justify-between">
          <span>{t.copyright}</span>
          <span>
            <a href={siteConfig.links.privacy} className="hover:text-snow hover:underline">{landing.soon.pages.privacy}</a>
            {" · "}
            <a href={siteConfig.links.terms} className="hover:text-snow hover:underline">{landing.soon.pages.terms}</a>
          </span>
        </Container>
      </div>
    </footer>
  );
}
