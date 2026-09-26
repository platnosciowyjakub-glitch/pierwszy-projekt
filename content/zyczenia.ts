// Teksty zakładki „Wyślij życzenia” (/zyczenia). Możesz je swobodnie poprawiać.
// Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.

export const zyczenia = {
  meta: {
    title: "Życzenia świąteczne i kartki dla bliskich | Gviazdka",
    description:
      "Lista osób do życzeń, pomoc w pisaniu ciepłych słów i kartki do wysłania. Zobaczysz, komu już wysłałeś, i nikogo nie pominiesz.",
  },

  // Pierwszy ekran dla osób niezalogowanych (po prawej film albo obrazek z config/site.ts → videos.zyczenia)
  intro: {
    eyebrow: "Wyślij życzenia",
    title: "Życzenia *od serca, na czas*",
    subtitle:
      "Zbierz w jednym miejscu osoby, którym chcesz złożyć życzenia. Gviazdka pomoże znaleźć ciepłe słowa, a Ty odhaczysz, komu już wysłałeś.",
    cta: "Załóż konto i zacznij",
    login: "Masz już konto? Zaloguj się",
    trust: ["Pomoc w pisaniu", "Nikogo nie pominiesz", "Bez instalowania"],
    videoPlaceholder: "Tu będzie krótki film: jak wysłać życzenia",
    videoLabel: "Film: jak wysłać życzenia w Gviazdce",
  },

  // Miejsce pracy po zalogowaniu
  workspace: {
    eyebrow: "Wyślij życzenia",
    title: "Twoje *życzenia*",
    subtitle: "Komu chcesz złożyć życzenia i komu już wysłałeś.",
    soonTitle: "Tu powstaje miejsce na życzenia",
    soonText: "Już niedługo zapiszesz tu bliskich i z pomocą Gviazdki napiszesz życzenia. Zajrzyj tu wkrótce.",
  },
} as const;
