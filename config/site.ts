// Ustawienia strony. Tutaj zmieniasz rzeczy, które nie są tekstami.

export const siteConfig = {
  name: "Gviazdka",

  // Przełącznik premiery:
  //   false = strona przedpremierowa (formularz „Zapisz się”)
  //   true  = strona po premierze (przycisk „Zacznij za darmo” prowadzący do aplikacji)
  launched: false,

  // Adres aplikacji, do którego prowadzi „Zacznij za darmo” po premierze.
  appUrl: "/aplikacja",

  // Adres strony w internecie (do podglądu przy udostępnianiu linku).
  // Po podpięciu domeny wpisz ją tutaj, np. "https://gviazdka.pl".
  // Bez wpisu Vercel sam podstawi swój adres.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  // Ceny pakietów. Wpisz np. "19 zł" i zapisz. Puste ("") = na stronie pokaże się „Cena wkrótce”.
  // Dopisek pod ceną, np. "za cały sezon", wpisz w priceNote.
  prices: {
    darmowy: "0 zł",
    pelny: "",
    rodzinny: "",
  },
  priceNote: "",

  links: {
    privacy: "/polityka-prywatnosci",
    terms: "/regulamin",
    contact: "/kontakt",
  },
} as const;
