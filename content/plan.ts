// Teksty zakładki „Zaplanuj święta” (/plan). Możesz je swobodnie poprawiać.
// Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.

export const plan = {
  meta: {
    title: "Planer świąteczny – plan przygotowań do świąt | Gviazdka",
    description:
      "Gotowy plan przygotowań do świąt, tydzień po tygodniu od listopada do Wigilii. Dopasuj go do siebie i odhaczaj. Spokojne święta bez listy w głowie.",
  },

  // Pierwszy ekran dla osób niezalogowanych (po prawej film albo obrazek z config/site.ts → videos.plan)
  intro: {
    eyebrow: "Zaplanuj święta",
    title: "Przygotowania do świąt *krok po kroku*",
    subtitle:
      "Odpowiedz na cztery krótkie pytania, a Gviazdka ułoży Twój plan od listopada do Wigilii. Co tydzień widzisz tylko to, co warto zrobić teraz.",
    cta: "Załóż konto i zacznij",
    login: "Masz już konto? Zaloguj się",
    trust: ["Gotowy plan na start", "Tydzień po tygodniu", "Bez instalowania"],
    videoPlaceholder: "Tu będzie krótki film: jak działa plan świąt",
    videoLabel: "Film: jak działa plan świąt w Gviazdce",
  },

  // Miejsce pracy po zalogowaniu
  workspace: {
    eyebrow: "Zaplanuj święta",
    title: "Twój *plan świąt*",
    subtitle: "Ten tydzień, kolejne kroki i to, co już za Tobą.",
    soonTitle: "Tu powstaje Twój plan świąt",
    soonText: "Już niedługo odpowiesz na cztery pytania i dostaniesz gotowy plan do odhaczania. Zajrzyj tu wkrótce.",
  },
} as const;
