// Ustawienia strony. Tutaj zmieniasz rzeczy, które nie są tekstami.

export const siteConfig = {
  name: "Gwiazdka",

  // Przełącznik premiery:
  //   false = strona przedpremierowa (formularz „Zapisz się”)
  //   true  = strona po premierze (przycisk „Zacznij za darmo” prowadzący do aplikacji)
  launched: false,

  // Adres aplikacji, do którego prowadzi „Zacznij za darmo” po premierze.
  appUrl: "/aplikacja",

  // Adres strony w internecie (do podglądu przy udostępnianiu linku).
  // Po podpięciu domeny wpisz ją tutaj, np. "https://gwiazdka.pl".
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  links: {
    privacy: "/polityka-prywatnosci",
    terms: "/regulamin",
    contact: "/kontakt",
  },
} as const;
