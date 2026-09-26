// Teksty podstrony „Przygotuj prezenty” (/prezenty). Możesz je swobodnie poprawiać.
// Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.
// soon: true = przy funkcji pokaże się mała etykieta „Wkrótce” (jeszcze nie na premierę).

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
      "Przestań nosić wszystkie prezenty w głowie. Gviazdka pamięta, dla kogo kupujesz, ile już wydałeś, co leży zapakowane w szafie, a co jest jeszcze tylko pomysłem.",
    trust: ["Za darmo na start", "Tylko Ty widzisz swoje prezenty", "Bez instalowania"],
  },

  // Makieta w pierwszym ekranie
  heroMock: {
    title: "Prezenty na święta",
    total: "Wydane 340 zł z 600 zł",
    hideLabel: "Ukryj kwoty",
    people: [
      { name: "Mama", gift: "Szalik z wełny", status: "kupione", spent: 120, budget: 150 },
      { name: "Tata", gift: "Książka o Tatrach", status: "zapakowane", spent: 60, budget: 100 },
      { name: "Zosia", gift: "Zestaw do malowania", status: "pomysł", spent: 0, budget: 120 },
      { name: "Babcia", gift: "Ciepłe kapcie", status: "wręczone", spent: 80, budget: 80 },
    ],
  },

  // Porównanie ze zwykłą listą życzeń
  compare: {
    title: "Więcej niż *lista życzeń*",
    text: "Lista życzeń mówi, czego ktoś chce. To dopiero połowa pracy. Gviazdka zajmuje się też resztą: budżetem, zakupami i pakowaniem.",
    basicTitle: "Zwykła lista życzeń",
    basic: ["Zbiera, czego chcą bliscy", "Pozwala zarezerwować prezent", "Chroni przed kupieniem tego samego"],
    oursTitle: "Gviazdka dodaje",
    ours: [
      "Budżet dla każdej osoby i sumę, którą widzisz tylko Ty",
      "Każdy prezent od pomysłu, przez zakup i pakowanie, aż po wręczenie",
      "Twoje własne pomysły, nie tylko to, co ktoś wpisał na listę",
      "Wspólne planowanie z partnerem bez zdradzania niespodzianek",
      "Notatki, rozmiary i linki przy każdym prezencie",
    ],
  },

  // Cztery główne funkcje z makietami
  features: {
    title: "Wszystko o prezentach *w jednym miejscu*",
    items: [
      {
        id: "budzet",
        title: "Budżet dla każdej osoby",
        text: "Ustal, ile chcesz wydać na mamę, tatę czy przyjaciółkę. Gviazdka na bieżąco pokazuje, ile już poszło, a ile zostało. Ktoś zagląda Ci przez ramię? Jednym dotknięciem ukryjesz kwoty.",
      },
      {
        id: "etapy",
        title: "Od pomysłu do wręczenia",
        text: "Każdy prezent przechodzi przez cztery proste etapy: pomysł, kupione, zapakowane, wręczone. Jedno spojrzenie wystarczy, żeby wiedzieć, co jeszcze zostało do zrobienia.",
      },
      {
        id: "razem",
        title: "Planujcie razem, w sekrecie",
        text: "Zaproś partnera lub partnerkę do wspólnej listy i jednego budżetu. Widzicie swoje pomysły i wydatki, ale prezenty przeznaczone dla Was nawzajem pozostają ukryte.",
      },
      {
        id: "rodzina",
        title: "Rodzinna lista życzeń bez dublowania",
        text: "Każdy dopisuje, co naprawdę by go ucieszyło. Rezerwujesz prezent po cichu – reszta rodziny widzi, że jest zajęty, a osoba obdarowana nie widzi nic.",
      },
    ],
  },

  // Dane na makietach funkcji
  mocks: {
    budzet: { name: "Mama", spentLabel: "Wydane", spent: "120 zł", budgetLabel: "Budżet", budget: "150 zł", left: "Zostało 30 zł", hidden: "Kwoty ukryte" },
    etapy: { gift: "Książka o Tatrach", for: "dla Taty", steps: ["pomysł", "kupione", "zapakowane", "wręczone"], active: 2 },
    razem: { you: "Ty", partner: "Marek", shared: "Wspólny budżet: 900 zł", hiddenGift: "Prezent dla Ciebie", hiddenNote: "ukryty – to niespodzianka" },
    rodzina: {
      owner: "Lista życzeń Zosi",
      items: [
        { what: "Zestaw do malowania", state: "zarezerwowane" },
        { what: "Książka o kosmosie", state: "wolne" },
        { what: "Ciepłe rękawiczki", state: "zarezerwowane" },
      ],
      ownerSees: "Zosia widzi tylko swoją listę – bez rezerwacji",
    },
  },

  // Mniejsze funkcje w siatce
  extras: {
    title: "I wszystko, czego się *spodziewasz*",
    soonLabel: "Wkrótce",
    items: [
      { icon: "link", title: "Wklej link, reszta sama się uzupełni", text: "Wklejasz link do produktu, a Gviazdka pobiera nazwę, cenę i zdjęcie." },
      { icon: "note", title: "Notatki przy prezencie", text: "Rozmiar swetra, ulubiony kolor, co ktoś już ma. Wszystko pod ręką w sklepie." },
      { icon: "spark", title: "Pomoc w wymyślaniu prezentów", text: "Opisz osobę, jej wiek i zainteresowania, a podpowiemy, co może ją ucieszyć." },
      { icon: "bell", title: "Delikatne przypomnienia", text: "Tylko jeśli chcesz: krótka wiadomość, gdy święta się zbliżają, a coś czeka." },
      { icon: "hat", title: "Losowanie Mikołaja", text: "Losujcie, kto komu kupuje prezent. Z wykluczeniami, żeby pary nie trafiły na siebie.", soon: true },
      { icon: "coins", title: "Wspólny prezent", text: "Składacie się na większy prezent? Zapiszesz, kto ile się dorzucił.", soon: true },
      { icon: "receipt", title: "Paragony i zdjęcia", text: "Paragon przy prezencie to spokój przy ewentualnym zwrocie po świętach.", soon: true },
      { icon: "phone", title: "Bez instalowania", text: "Działa w przeglądarce na telefonie i komputerze. Rodzina dołącza z linku." },
    ],
  },

  steps: {
    title: "Trzy kroki do *spokojnych prezentów*",
    items: [
      { title: "Dodaj bliskich", text: "Wpisz osoby, którym chcesz coś dać, i ustal budżet dla każdej z nich." },
      { title: "Zbieraj pomysły", text: "Przez cały rok wklejaj linki, dopisuj notatki i odkładaj pomysły na później." },
      { title: "Kupuj, pakuj, wręczaj", text: "Odhaczaj kolejne etapy i ciesz się, że niczego nie przeoczyłeś." },
    ],
  },

  faq: {
    title: "Pytania o *prezenty*",
    items: [
      { q: "Czy osoba, dla której planuję prezent, zobaczy go?", a: "Nie. Twoje prezenty, budżety i plany widzisz tylko Ty. Gviazdka ukrywa wszystko, co mogłoby zepsuć komuś niespodziankę – także przed partnerem, z którym planujesz." },
      { q: "Czy rodzina musi zakładać konta?", a: "Nie. Do śledzenia prezentów wystarczy wpisać imię. Do rodzinnej listy życzeń bliscy dołączają przez link, bez instalowania i bez konta." },
      { q: "Jak działa rezerwowanie prezentu?", a: "Gdy zarezerwujesz coś z czyjejś listy życzeń, reszta rodziny widzi, że prezent jest zajęty. Osoba obdarowana nie widzi rezerwacji, więc niespodzianka zostaje niespodzianką." },
      { q: "Czy mogę wkleić link z dowolnego sklepu?", a: "Tak. Wklejasz link, a Gviazdka spróbuje sama uzupełnić nazwę, cenę i zdjęcie. Zawsze możesz je poprawić ręcznie." },
      { q: "Ile to kosztuje?", a: "Lista prezentów dla kilku osób jest w wersji darmowej. Bez limitów działa w pakietach płatnych, których ceny ogłosimy przed startem." },
      { q: "Jak zarabiacie na prezentach?", a: "Przy niektórych linkach do sklepów możemy dostać niewielką prowizję od sprzedawcy. Nie zmienia to ceny, którą płacisz, a takie linki zawsze wyraźnie oznaczamy." },
    ],
  },

  closing: {
    title: "W tym roku *żadnego prezentu na ostatnią chwilę*.",
    text: "Zapisz się na listę oczekujących. Napiszemy, gdy Gviazdka będzie gotowa – w listopadzie, z zapasem przed świętami.",
  },
} as const;
