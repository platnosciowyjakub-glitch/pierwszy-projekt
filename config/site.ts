// Ustawienia strony. Tutaj zmieniasz rzeczy, które nie są tekstami.
// Ceny i nazwy pakietów są w osobnym pliku: config/pricing.ts

export const siteConfig = {
  name: "Gviazdka",

  // Przełącznik premiery:
  //   false = strona przedpremierowa (zapis na listę oczekujących)
  //   true  = strona po premierze (przyciski „Zaczynajmy” prowadzą do rejestracji w aplikacji)
  launched: false,

  // Adres rejestracji w aplikacji, używany po premierze.
  appUrl: "/aplikacja",

  // Adres strony w internecie (do podglądu przy udostępnianiu linku).
  // Po podpięciu domeny wpisz ją tutaj, np. "https://gviazdka.pl".
  // Bez wpisu Vercel sam podstawi swój adres.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  // Film w pierwszym ekranie. Wrzuć plik do folderu public/ (np. public/film.mp4) i wpisz tu "/film.mp4".
  // Puste ("") = w tym miejscu widać spokojne pole z napisem „Tu będzie krótki film”.
  heroVideo: "",
  heroVideoPoster: "",

  // Adres e-mail do przycisku „Napisz do nas”. Puste ("") = przycisk prowadzi na stronę Kontakt.
  contactEmail: "",

  // Profile w mediach społecznościowych. Ikona pokaże się w stopce dopiero po wpisaniu adresu.
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    pinterest: "",
  },

  links: {
    privacy: "/polityka-prywatnosci",
    terms: "/regulamin",
    contact: "/kontakt",
    about: "/o-nas",
  },
} as const;

// Główne wezwanie do działania: przed premierą zapis, po premierze rejestracja.
export function primaryAction(): { href: string; label: string } {
  return siteConfig.launched
    ? { href: siteConfig.appUrl, label: "Zaczynajmy" }
    : { href: "#zapis", label: "Zapisz się na start" };
}

export function contactHref() {
  return siteConfig.contactEmail ? `mailto:${siteConfig.contactEmail}` : siteConfig.links.contact;
}
