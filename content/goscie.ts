// Teksty zakładki „Zaproś gości” (/goscie). Możesz je swobodnie poprawiać.
// Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.

export const goscie = {
  meta: {
    title: "Zaproszenia na Wigilię i lista gości | Gviazdka",
    description:
      "Wyślij zaproszenie na Wigilię linkiem, zbierz potwierdzenia i zapisz diety gości. Wszystko w jednym miejscu, bez gubienia wiadomości.",
  },

  // Pierwszy ekran dla osób niezalogowanych (po prawej film albo obrazek z config/site.ts → videos.goscie)
  intro: {
    eyebrow: "Zaproś gości",
    title: "Goście na Wigilię *bez zamieszania*",
    subtitle:
      "Wyślij zaproszenie linkiem i zbierz potwierdzenia w jednym miejscu. Zapiszesz też diety i to, kto co przynosi. Za babcię potwierdzisz sam.",
    cta: "Załóż konto i zacznij",
    login: "Masz już konto? Zaloguj się",
    trust: ["Zaproszenie z linku", "Potwierdzenia w jednym miejscu", "Bez instalowania"],
    videoPlaceholder: "Tu będzie krótki film: jak zaprosić gości",
    videoLabel: "Film: jak zaprosić gości w Gviazdce",
  },

  // Miejsce pracy po zalogowaniu
  workspace: {
    eyebrow: "Zaproś gości",
    title: "Twoja *lista gości*",
    subtitle: "Kto przyjdzie, kto potwierdził i kto co przynosi.",
    soonTitle: "Tu powstaje lista gości",
    soonText: "Już niedługo wyślesz zaproszenia i zobaczysz, kto potwierdził. Zajrzyj tu wkrótce.",
  },
} as const;
