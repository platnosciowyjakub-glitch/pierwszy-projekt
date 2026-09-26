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

  // Samo narzędzie (pod sekcją informacyjną)
  tool: {
    title: "Twoja *lista prezentów*",
    unavailable: "Narzędzie jeszcze się przygotowuje. Zajrzyj tu wkrótce.",
    loading: "Chwilkę, wczytuję Twoją listę…",
    loginTitle: "Zaloguj się, żeby prowadzić swoją listę",
    loginText: "Wystarczy e-mail i hasło. Twoją listę zobaczysz tylko Ty.",
    signedInAs: "Zalogowano jako",
    logout: "Wyloguj",
    spentLabel: "Wydane",
    ofLabel: "z",
    hideAmounts: "Ukryj kwoty",
    showAmounts: "Pokaż kwoty",
    hidden: "•••",
    emptyTitle: "Zacznij od bliskich",
    emptyText: "Dodaj pierwszą osobę, dla której szykujesz prezent. Budżet możesz wpisać od razu albo później.",
    personName: "Imię",
    personNamePlaceholder: "np. Mama",
    personBudget: "Budżet w zł (opcjonalnie)",
    addPerson: "Dodaj osobę",
    removePerson: "Usuń osobę",
    removePersonConfirm: "Usunąć tę osobę razem z jej prezentami?",
    budgetLeft: "Zostało",
    overBudget: "Ponad budżet o",
    noBudget: "Bez budżetu",
    noGifts: "Jeszcze nic tu nie ma. Dopisz pierwszy pomysł.",
    giftTitle: "Prezent",
    giftTitlePlaceholder: "np. Szalik z wełny",
    giftLink: "Link do sklepu (opcjonalnie)",
    giftPrice: "Cena w zł (opcjonalnie)",
    giftNote: "Notatka: rozmiar, kolor… (opcjonalnie)",
    addGift: "Dodaj prezent",
    cancel: "Anuluj",
    removeGift: "Usuń prezent",
    openLink: "Sklep",
    statusLabel: "Etap prezentu",
    statuses: { pomysl: "pomysł", kupione: "kupione", zapakowane: "zapakowane", wreczone: "wręczone" },
    saveError: "Nie udało się zapisać. Sprawdź połączenie i spróbuj jeszcze raz.",
    linkInvalid: "Link powinien zaczynać się od http:// lub https://",
    nameMissing: "Wpisz proszę imię.",
    titleMissing: "Wpisz proszę, co to za prezent.",
    privacy: "Twoją listę widzisz tylko Ty.",
  },
} as const;
