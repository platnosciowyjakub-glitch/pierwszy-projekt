// Teksty zakładki „Przygotuj prezenty” (/prezenty). Możesz je swobodnie poprawiać.
// Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.
// {name} zostanie zastąpione imieniem osoby.

export const prezenty = {
  meta: {
    title: "Lista prezentów świątecznych – planer prezentów | Gviazdka",
    description:
      "Lista prezentów na święta z budżetem dla każdej osoby. Pomysły, ceny i to, co już kupione, w jednym miejscu. Obdarowany niczego nie podejrzy.",
  },

  eyebrow: "Przygotuj prezenty",
  title: "Twoja *lista prezentów*",
  subtitle: "Wpisz bliskich, dopisz pomysły i odhaczaj, co już kupione.",

  unavailable: "Lista jeszcze się przygotowuje. Zajrzyj tu wkrótce.",
  loading: "Chwilkę, wczytuję Twoją listę…",
  loginTitle: "Zaloguj się, żeby zacząć swoją listę",
  loginText: "Wystarczy e-mail i hasło. Twoją listę zobaczysz tylko Ty.",

  // Podsumowanie
  spentLabel: "Wydane",
  ofLabel: "z",
  hideAmounts: "Ukryj kwoty",
  showAmounts: "Pokaż kwoty",
  hidden: "•••",

  // Pierwsze wejście i dodawanie osób
  startTitle: "Dla kogo szykujesz prezenty?",
  startText: "Wpisz imię albo kliknij jedną z podpowiedzi.",
  suggestions: ["Mama", "Tata", "Partner", "Partnerka", "Babcia", "Dziadek", "Siostra", "Brat", "Przyjaciółka", "Przyjaciel"],
  suggestionsLabel: "Podpowiedzi",
  personLabel: "Imię osoby",
  personPlaceholder: "np. Ciocia Ania",
  addPerson: "Dodaj",
  addAnother: "Dodaj kolejną osobę",

  // Budżet osoby
  setBudget: "Ustaw budżet",
  budgetLabel: "Budżet dla {name} w zł",
  budgetLeft: "Zostało",
  overBudget: "Ponad budżet o",
  save: "Zapisz",
  cancel: "Anuluj",

  // Prezenty
  giftLabel: "Nowy pomysł na prezent: {name}",
  giftPlaceholder: "np. Szalik 80 zł",
  addGift: "Dodaj",
  noGifts: "Dopisz pierwszy pomysł. Zawsze możesz go później zmienić.",
  giftTitle: "Prezent",
  giftPrice: "Cena w zł",
  giftLink: "Link do sklepu",
  giftNote: "Notatka: rozmiar, kolor…",
  openLink: "Sklep",
  details: "Edytuj: {name}",
  removeGift: "Usuń prezent",
  statusLabel: "Etap prezentu: {name}",
  statuses: { pomysl: "Pomysł", kupione: "Kupione", zapakowane: "Zapakowane", wreczone: "Wręczone" },

  // Usuwanie osoby
  personMenu: "Usuń osobę: {name}",
  removePersonConfirm: "Usunąć {name} razem z prezentami?",
  yesRemove: "Tak, usuń",

  // Błędy
  saveError: "Nie udało się zapisać. Sprawdź połączenie i spróbuj jeszcze raz.",
  linkInvalid: "Link powinien zaczynać się od http:// lub https://",
  priceInvalid: "Wpisz proszę samą kwotę, np. 79,99.",
  nameMissing: "Wpisz proszę imię.",
  titleMissing: "Wpisz proszę, co to za prezent.",

  signedInAs: "Zalogowano jako",
  logout: "Wyloguj",
  privacy: "Twoją listę widzisz tylko Ty.",
} as const;
