import { contactHref, siteConfig } from "@/config/site";

// Zamienia skróty z pliku z tekstami (np. "privacy") na prawdziwe adresy.
export function resolveHref(href: string): string {
  if (href.startsWith("#") || href.startsWith("/") || href.startsWith("http")) return href;
  switch (href) {
    case "contact":
      return contactHref();
    case "contact-page":
      return siteConfig.links.contact;
    case "about":
      return siteConfig.links.about;
    case "privacy":
      return siteConfig.links.privacy;
    case "terms":
      return siteConfig.links.terms;
    default:
      return "/";
  }
}
