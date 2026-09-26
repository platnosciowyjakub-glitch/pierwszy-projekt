// Teksty podstrony „Przygotuj prezenty” (/prezenty). Możesz je swobodnie poprawiać.
// Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.
// Osoba niezalogowana widzi tu tylko krótkie wyjaśnienie, film i jedną sekcję o funkcjach.
// Poniżej, dla zalogowanych, powstanie samo narzędzie do prezentów.

export const prezenty = {
  meta: {
    title: "Lista prezentów świątecznych – planer prezentów | Gviazdka",
    description:
      "Lista prezentów na święta z budżetem dla każdej osoby. Pomysły, linki i to, co już kupione, w jednym miejscu. Obdarowany niczego nie podejrzy.",
  },

  hero: {
    eyebrow: "Przygotuj prezenty",
    title: "Lista prezentów *bez stresu*",
    subtitle:
      "Wpisz bliskich, zbieraj pomysły i odhaczaj kolejne etapy: kupione, zapakowane, wręczone. Gviazdka pilnuje budżetu i niczego nie zdradza obdarowanym.",
    trust: ["Za darmo na start", "Tylko Ty widzisz swoje prezenty", "Bez instalowania"],
    videoPlaceholder: "Tu będzie krótki film: jak prowadzić listę prezentów",
    videoLabel: "Film: jak prowadzić listę prezentów w Gviazdce",
  },

  // Jedna sekcja informacyjna o funkcjach
  info: {
    title: "Co potrafi *lista prezentów*",
    subtitle: "Wszystko, czego potrzebujesz, żeby w grudniu nic nie umknęło.",
    items: [
      { icon: "coins", title: "Budżet dla każdej osoby", text: "Widzisz, ile już wydałeś i ile zostało. Kwoty ukryjesz jednym dotknięciem." },
      { icon: "gift", title: "Od pomysłu do wręczenia", text: "Każdy prezent ma etap: pomysł, kupione, zapakowane, wręczone." },
      { icon: "lock", title: "Wszystko w sekrecie", text: "Obdarowany nie zobaczy, co dla niego szykujesz – nawet w tej samej rodzinie." },
      { icon: "family", title: "Planowanie we dwoje", text: "Wspólna lista i budżet z partnerem, bez zdradzania sobie niespodzianek." },
      { icon: "note", title: "Rodzinna lista życzeń", text: "Bliscy wpisują, czego chcą, a Ty po cichu rezerwujesz. Nikt nie kupi dwa razy tego samego." },
      { icon: "link", title: "Wklej link ze sklepu", text: "Nazwa, cena i zdjęcie uzupełnią się same. Dopiszesz rozmiar czy ulubiony kolor." },
    ],
  },
} as const;
