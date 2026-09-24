import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";

const t = landing.footer;

export function Footer() {
  const links = [
    { href: siteConfig.links.privacy, label: t.privacy },
    { href: siteConfig.links.terms, label: t.terms },
    { href: siteConfig.links.contact, label: t.contact },
  ];
  return (
    <footer className="border-t border-sand-deep bg-sand">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-moss">{t.tagline}</p>
        </div>
        <nav aria-label="Informacje">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-moss underline-offset-4 hover:text-spruce hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="pb-10 text-xs text-moss">© {new Date().getFullYear()} {siteConfig.name}</Container>
    </footer>
  );
}
