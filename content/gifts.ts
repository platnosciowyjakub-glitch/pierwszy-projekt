// Wszystkie teksty modułu „Prezenty i budżet” (/prezenty). Możesz je swobodnie poprawiać.
// Zmieniaj tylko tekst w cudzysłowach. Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.
// Znaczniki w nawiasach klamrowych, np. {name} albo {amount}, zostaną zastąpione prawdziwymi wartościami.
// Listy z trzema słowami (np. ["pomysł", "pomysły", "pomysłów"]) to odmiana: 1 / 2–4 / 5 i więcej.

export const gifts = {
  meta: {
    title: "Lista prezentów świątecznych – planer prezentów | Gviazdka",
    description:
      "Lista prezentów na święta z budżetem dla każdej osoby. Pomysły, ceny i to, co już kupione, w jednym miejscu. Obdarowany niczego nie podejrzy.",
  },

  // Pierwszy ekran dla osób niezalogowanych (po prawej film albo obrazek z config/site.ts → videos.prezenty)
  intro: {
    eyebrow: "Przygotuj prezenty",
    title: "Lista prezentów *bez stresu*",
    subtitle:
      "Wpisz bliskich, dopisz pomysły i odhaczaj: kupione, zapakowane, wręczone. Budżet liczy się sam, a obdarowani niczego nie podejrzą.",
    cta: "Załóż konto i zacznij",
    login: "Masz już konto? Zaloguj się",
    trust: ["Gotowe w minutę", "Tylko Ty widzisz swoją listę", "Bez instalowania"],
    videoPlaceholder: "Tu będzie krótki film: jak działa lista prezentów",
    videoLabel: "Film: jak działa lista prezentów w Gviazdce",
  },

  loading: "Chwilkę, wczytuję Twoje prezenty…",
  saveError: "Nie udało się zapisać. Sprawdź połączenie i spróbuj jeszcze raz.",
  loadError: "Nie udało się wczytać listy. Odśwież proszę stronę za chwilę.",
  limitReached: "W wersji darmowej to już wszystkie osoby. Pełny pakiet nie ma limitów.",

  // Zakładki modułu
  tabs: {
    label: "Części modułu prezentów",
    people: "Osoby",
    all: "Wszystkie prezenty",
    summary: "Podsumowanie",
    family: "Rodzina",
    wishlist: "Moja lista życzeń",
    santa: "Losowania",
    soon: "wkrótce",
  },
  soon: {
    family: { title: "Listy życzeń rodziny", text: "Tu zobaczysz, czego chcą bliscy, i po cichu zarezerwujesz prezent. Ta część powstaje." },
    wishlist: { title: "Twoja lista życzeń", text: "Tu wpiszesz, co sam chcesz dostać, i udostępnisz to rodzinie. Ta część powstaje." },
    santa: { title: "Losowanie mikołajkowe", text: "Tu zorganizujesz losowanie w rodzinie albo w pracy. Ta część powstaje." },
  },

  // Nagłówek listy (okazji)
  header: {
    switchList: "Zmień listę",
    newList: "Nowa lista",
    editList: "Ustawienia listy",
    spent: "Wydane",
    of: "z",
    left: "zostało",
    over: "ponad plan",
    planned: "planowane",
    hideAmounts: "Ukryj kwoty",
    showAmounts: "Pokaż kwoty",
    hiddenNotice: "Kwoty ukryte – możesz spokojnie pokazać ekran.",
    hidden: "•••",
  },
  countdown: {
    christmasMany: "Jeszcze {n} {days} do Wigilii",
    christmasTomorrow: "Jutro Wigilia",
    christmasToday: "Dziś Wigilia. Wesołych Świąt.",
    otherMany: "Jeszcze {n} {days} do dnia: {name}",
    otherTomorrow: "Jutro: {name}",
    otherToday: "To już dziś: {name}",
    past: "Ta okazja już za Tobą",
    days: ["dzień", "dni", "dni"],
  },

  // Lista (okazja)
  list: {
    defaultName: "Święta 2026",
    defaultDate: "2026-12-24",
    formTitleNew: "Nowa lista",
    formTitleEdit: "Ustawienia listy",
    name: "Nazwa",
    namePlaceholder: "np. Mikołajki w pracy",
    date: "Data",
    type: "Rodzaj",
    types: { christmas: "Święta", mikolajki: "Mikołajki", birthday: "Urodziny", other: "Inne" },
    budget: "Budżet całej listy w zł (opcjonalnie)",
    budgetHint: "Jeśli go nie wpiszesz, zsumujemy budżety osób.",
    create: "Utwórz listę",
    save: "Zapisz",
    nameMissing: "Wpisz proszę nazwę listy.",
  },

  // Osoby
  people: {
    emptyTitle: "Tu zamieszkają Twoje pomysły na prezenty.",
    emptyText: "Od kogo zaczynamy? Kliknij, żeby od razu dodać.",
    add: "Dodaj osobę",
    addMore: "Dodaj osobę",
    sortLabel: "Kolejność",
    sort: { nogift: "Bez prezentu na górze", alpha: "Alfabetycznie", budget: "Według budżetu" },
    filterNoGift: "Jeszcze bez prezentu",
    noMatches: "Każda osoba ma już przynajmniej jeden pomysł. Pięknie.",
    done: "Gotowe",
    noBudget: "Bez budżetu",
    budgetLine: "{spent} z {budget}",
    overBudget:
      "{name}: wyszło trochę ponad plan (+{amount}). Nic się nie stało – może gdzie indziej się wyrówna.",
    counts: {
      idea: ["pomysł", "pomysły", "pomysłów"],
      bought: ["kupiony", "kupione", "kupionych"],
      wrapped: ["zapakowany", "zapakowane", "zapakowanych"],
      given: ["wręczony", "wręczone", "wręczonych"],
    },
    pickPerson: "Wybierz osobę z listy, żeby zobaczyć jej prezenty.",
    back: "Wszystkie osoby",
    notFound: "Nie ma już tej osoby na liście.",
  },

  relations: {
    mama: "Mama",
    tata: "Tata",
    partner: "Partner / Partnerka",
    dziecko: "Dziecko",
    rodzenstwo: "Rodzeństwo",
    dziadkowie: "Babcia / Dziadek",
    przyjaciel: "Przyjaciel / Przyjaciółka",
    wspolpracownik: "Współpracownik",
    inne: "Inne",
  },
  // Szybkie dodawanie w pustym stanie: imię + relacja
  quickPeople: [
    { name: "Mama", relation: "mama" },
    { name: "Tata", relation: "tata" },
    { name: "Partner", relation: "partner" },
    { name: "Babcia", relation: "dziadkowie" },
    { name: "Dziadek", relation: "dziadkowie" },
    { name: "Siostra", relation: "rodzenstwo" },
    { name: "Brat", relation: "rodzenstwo" },
    { name: "Przyjaciółka", relation: "przyjaciel" },
  ],

  personForm: {
    titleNew: "Nowa osoba",
    titleEdit: "Edytuj osobę",
    name: "Imię",
    namePlaceholder: "np. Ciocia Ania",
    relation: "Kim jest dla Ciebie",
    budget: "Budżet w zł (opcjonalnie)",
    notes: "Notatki (opcjonalnie)",
    notesPlaceholder: "Rozmiary, ulubione kolory, czego nie lubi…",
    birthday: "Urodziny (opcjonalnie)",
    color: "Kolor",
    colors: { sage: "Szałwia", gold: "Złoto", cranberry: "Żurawina", spruce: "Świerk", sand: "Beż", moss: "Mech" },
    save: "Zapisz",
    add: "Dodaj osobę",
    remove: "Usuń osobę",
    removeConfirm: "Usunąć {name} razem ze wszystkimi prezentami?",
    yesRemove: "Tak, usuń",
    cancel: "Anuluj",
    nameMissing: "Wpisz proszę imię.",
  },

  person: {
    edit: "Edytuj",
    notes: "Notatki",
    addGift: "Dodaj pomysł",
    empty: "Jeszcze żadnego pomysłu. Dopisz pierwszy – zawsze możesz go później zmienić.",
    birthday: "Urodziny: {date}",
  },

  // Statusy prezentów
  statuses: { idea: "Pomysł", bought: "Kupione", wrapped: "Zapakowane", given: "Wręczone" },
  statusGroups: { idea: "Pomysły", bought: "Kupione", wrapped: "Zapakowane", given: "Wręczone" },
  statusNext: "Zmień na: {status}",
  statusPick: "Wybierz etap prezentu: {name}",
  priorities: { high: "Bardzo ważne", normal: "Zwykłe", low: "Może poczekać" },

  gift: {
    menu: "Więcej: {name}",
    edit: "Edytuj",
    move: "Przenieś do innej osoby",
    duplicate: "Duplikuj",
    remove: "Usuń",
    removed: "Usunięto „{name}”.",
    undo: "Cofnij",
    duplicated: "Skopiowano „{name}”.",
    moveTitle: "Przenieś „{name}” do…",
    quantity: "{n} szt.",
    openLink: "Zobacz w sklepie",
    affiliate: "Link partnerski",
    noImage: "Prezent bez zdjęcia",
  },

  giftForm: {
    titleNew: "Nowy prezent",
    titleEdit: "Edytuj prezent",
    pasteLabel: "Wklej link do produktu",
    pastePlaceholder: "https://…",
    pasteButton: "Uzupełnij",
    pasteLoading: "Czytam stronę…",
    pasteHint: "Gviazdka sama uzupełni nazwę, cenę i zdjęcie. Wszystko możesz poprawić.",
    pasteFailed: "Nie udało się odczytać tej strony – uzupełnij dane ręcznie. Link zostanie zapisany.",
    pasteLimit: "Na tę godzinę wystarczy odczytów. Uzupełnij dane ręcznie albo spróbuj później.",
    pasteDone: "Gotowe. Sprawdź, czy wszystko się zgadza.",
    or: "albo wpisz sam",
    for: "Dla kogo",
    title: "Nazwa",
    titlePlaceholder: "np. Szalik z wełny",
    price: "Cena w zł",
    pricePlaceholder: "np. 129,99",
    url: "Link",
    store: "Sklep",
    quantity: "Ilość",
    priority: "Priorytet",
    priorityNone: "Bez priorytetu",
    status: "Etap",
    notes: "Notatka",
    notesPlaceholder: "Rozmiar, kolor, gdzie schowany…",
    image: "Zdjęcie produktu",
    removeImage: "Usuń zdjęcie",
    more: "Więcej szczegółów",
    save: "Zapisz",
    add: "Dodaj prezent",
    titleMissing: "Wpisz proszę, co to za prezent.",
    priceInvalid: "Wpisz proszę samą kwotę, np. 129,99.",
    linkInvalid: "Link powinien zaczynać się od http:// lub https://",
    personMissing: "Najpierw dodaj osobę, dla której szykujesz prezent.",
  },

  attachments: {
    title: "Zdjęcia i paragony",
    hint: "Przydają się przy zwrotach. JPG, PNG lub PDF, do 10 MB.",
    addPhoto: "Dodaj zdjęcie",
    addReceipt: "Dodaj paragon",
    uploading: "Wysyłam…",
    open: "Otwórz",
    remove: "Usuń plik",
    photo: "Zdjęcie",
    receipt: "Paragon",
    tooBig: "Ten plik jest większy niż 10 MB.",
    badType: "Ten rodzaj pliku nie jest obsługiwany. Wybierz JPG, PNG lub PDF.",
    failed: "Nie udało się wysłać pliku. Spróbuj proszę jeszcze raz.",
  },

  all: {
    title: "Wszystkie prezenty",
    filterStatus: "Etap",
    filterPerson: "Osoba",
    any: "Wszystkie",
    anyone: "Wszyscy",
    toWrap: "Do zapakowania",
    toWrapHint: "Wszystko, co już kupione i czeka na papier i wstążkę.",
    empty: "Nic tu nie ma przy tych ustawieniach.",
    allWrapped: "Wszystko zapakowane. Czas na herbatę.",
  },

  summary: {
    title: "Podsumowanie",
    spent: "Wydane",
    planned: "Planowane",
    budget: "Budżet",
    left: "Zostało",
    noBudget: "Nie ustawiono",
    perPerson: "Na osoby",
    byStatus: "Etapy prezentów",
    faqTitle: "Pytania",
    faq: [
      {
        q: "Kto widzi moją listę prezentów?",
        a: "Tylko Ty. Osoby, dla których szykujesz prezenty, nigdy nie zobaczą swoich prezentów ani kwot – pilnuje tego sama baza danych, nie tylko ekran.",
      },
      {
        q: "Co to jest „Link partnerski”?",
        a: "Gdy kupisz przez taki link, Gviazdka może dostać niewielką prowizję od sklepu – Ty nie płacisz więcej. Takie linki zawsze wyraźnie oznaczamy.",
      },
      {
        q: "Czy mogę usunąć swoje dane?",
        a: "Tak. Każdą osobę, prezent i całą listę usuniesz jednym przyciskiem. Nie sprzedajemy żadnych danych.",
      },
    ],
  },

  sheet: { close: "Zamknij" },
  fab: { person: "Dodaj osobę", gift: "Dodaj prezent" },
  signedInAs: "Zalogowano jako {email}.",
  logout: "Wyloguj",
} as const;

export type GiftsTexts = typeof gifts;
