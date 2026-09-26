// Teksty zakładki „Podziel się zadaniami” (/zadania). Możesz je swobodnie poprawiać.
// Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.

export const zadania = {
  meta: {
    title: "Porządki przed świętami razem z rodziną – podział zadań | Gviazdka",
    description:
      "Podziel porządki i przygotowania do świąt między bliskich. Rodzina dołącza z linku, każdy widzi swoje zadania i odhacza, co zrobione.",
  },

  // Pierwszy ekran dla osób niezalogowanych (po prawej film albo obrazek z config/site.ts → videos.zadania)
  intro: {
    eyebrow: "Podziel się zadaniami",
    title: "Porządki przed świętami *razem z bliskimi*",
    subtitle:
      "Rozdziel porządki, zakupy i gotowanie między bliskich. Każdy dołącza z linku, widzi tylko swoje zadania i odhacza, co zrobione.",
    cta: "Załóż konto i zacznij",
    login: "Masz już konto? Zaloguj się",
    trust: ["Rodzina dołącza z linku", "Każdy wie, co ma zrobić", "Bez instalowania"],
    videoPlaceholder: "Tu będzie krótki film: jak dzielić zadania z rodziną",
    videoLabel: "Film: jak dzielić zadania z rodziną w Gviazdce",
  },

  // Miejsce pracy po zalogowaniu
  workspace: {
    eyebrow: "Podziel się zadaniami",
    title: "Wasze *wspólne zadania*",
    subtitle: "Kto sprząta, kto gotuje, kto robi zakupy – w jednym miejscu.",
    soonTitle: "Tu powstaje wspólna lista zadań",
    soonText: "Już niedługo zaprosisz bliskich linkiem i rozdzielicie przygotowania. Zajrzyj tu wkrótce.",
  },
} as const;
