// Wszystkie teksty strony głównej. Możesz je swobodnie poprawiać.
// Zmieniaj tylko tekst w cudzysłowach, nie ruszaj nazw przed dwukropkiem.

export const landing = {
  meta: {
    // Tytuł i opis widoczne w Google. Tytuł do ok. 60 znaków, opis do ok. 155.
    title: "Gviazdka – Twoje spokojne święta. Planer świąteczny",
    description:
      "Planer świąteczny na spokojne święta: lista prezentów, porządki przed świętami i lista pakowania w jednym miejscu. Planuj razem z rodziną, bez stresu.",
  },

  nav: {
    signup: "Zapisz się",
  },

  hero: {
    eyebrow: "Planer świąteczny",
    title: "Twoje spokojne święta.",
    subtitle:
      "Gviazdka to planer świąteczny w Twoim telefonie. Porządkuje prezenty, domowe przygotowania i pakowanie, żeby grudzień nie przytłaczał.",
    // Trzy rzeczy, które dostajesz (krótko, widoczne od razu na pierwszym ekranie)
    points: [
      "Lista prezentów z budżetem",
      "Zadania dla całej rodziny",
      "Lista pakowania na wyjazd",
    ],
    note: "Damy znać, gdy Gviazdka wystartuje. Bez spamu, obiecujemy.",
    // Używane dopiero po premierze (gdy w config/site.ts jest launched: true)
    launchedButton: "Zacznij za darmo",
    launchedNote: "Wersja darmowa na zawsze. Bez karty, bez zobowiązań.",
  },

  signup: {
    emailLabel: "Twój adres e-mail",
    emailPlaceholder: "np. ania@poczta.pl",
    button: "Zapisz się",
    buttonLoading: "Zapisuję…",
    consent: "Zgadzam się na wiadomości o starcie Gviazdki. Zasady opisujemy w",
    consentLink: "polityce prywatności",
    errors: {
      emailEmpty: "Wpisz proszę swój adres e-mail.",
      emailInvalid: "Ten adres wygląda na niepełny. Sprawdź go proszę jeszcze raz.",
      consent: "Zaznacz proszę zgodę, żebyśmy mogli do Ciebie napisać.",
      server: "Coś poszło nie tak po naszej stronie. Spróbuj proszę za chwilę.",
    },
    success: {
      title: "Dziękujemy. Jesteś na liście.",
      text: "Napiszemy do Ciebie, gdy Gviazdka będzie gotowa. A teraz zrób sobie herbaty.",
    },
  },

  // Przykładowe dane na ekranie telefonu w pierwszej sekcji
  phone: {
    greeting: "Dobry wieczór, Ania",
    date: "Wtorek, 9 grudnia",
    lists: [
      { name: "Prezenty", done: 5, total: 8, hint: "Szalik dla mamy – kupione" },
      { name: "Zadania rodzinne", done: 4, total: 7, hint: "Umyć okna – Kasia" },
      { name: "Pakowanie", done: 9, total: 12, hint: "Ładowarka do telefonu" },
    ],
    footer: "Wszystko idzie swoim rytmem.",
  },

  // Sekcja 2: problemy, które rozwiązujemy
  problems: {
    eyebrow: "Znasz to?",
    title: "Grudzień potrafi przytłoczyć. Gviazdka pomaga to poukładać.",
    items: [
      {
        icon: "gift",
        question: "Co ja kupię i komu?",
        answer:
          "Wszystkie pomysły na prezenty w jednym miejscu. Widzisz, co już kupione, a co jeszcze czeka.",
      },
      {
        icon: "home",
        question: "Kto miał posprzątać?",
        answer: "Zaproś rodzinę, rozdzielcie zadania i odhaczajcie je razem.",
      },
      {
        icon: "suitcase",
        question: "Czy o czymś nie zapomniałem?",
        answer: "Spokojne listy: na zakupy, porządki i wyjazd do bliskich.",
      },
    ],
  },

  // Sekcja 3: co dokładnie dostajesz (z podglądem ekranów)
  features: {
    eyebrow: "Co znajdziesz w Gviazdce",
    title: "Trzy spokojne listy zamiast karteczek, notatek i czatów.",
    items: [
      {
        id: "prezenty",
        name: "Lista prezentów",
        title: "Prezenty bez zgadywania",
        text: "Zapisujesz, komu chcesz coś dać, i zbierasz pomysły przez cały rok. W grudniu nic nie umyka.",
        points: [
          "Osoby, pomysły i linki do sklepów",
          "Status: pomysł, kupione, zapakowane, wręczone",
          "Podsumowanie „ile wydałem” w złotówkach",
          "Tylko Ty widzisz swoje prezenty",
        ],
      },
      {
        id: "zadania",
        name: "Zadania rodzinne",
        title: "Porządki przed świętami, podzielone po równo",
        text: "Jedna wspólna lista dla całego domu. Każdy wie, co ma zrobić, i nikt nie musi przypominać.",
        points: [
          "Twoja lista i wspólna lista rodziny",
          "Przydzielasz zadanie konkretnej osobie",
          "Bliscy dołączają przez link, bez instalowania",
          "Widać, co już zrobione",
        ],
      },
      {
        id: "pakowanie",
        name: "Lista pakowania",
        title: "Wyjazd na święta bez „a czy wzięliśmy…”",
        text: "Gotowa lista na świąteczny wyjazd, którą dopasujesz do siebie. Odhaczasz i jedziesz spokojnie.",
        points: [
          "Gotowa lista na start, do zmiany",
          "Osobne listy na różne wyjazdy",
          "Prezenty do zabrania w jednym miejscu",
        ],
      },
    ],
  },

  // Przykładowe dane na ekranach telefonów w sekcji 3
  screens: {
    gifts: {
      title: "Prezenty",
      summaryLabel: "Wydane",
      summary: "340 zł z 600 zł",
      people: [
        { name: "Mama", gift: "Szalik z wełny", status: "kupione", price: "120 zł" },
        { name: "Tata", gift: "Książka o Tatrach", status: "pomysł", price: "" },
        { name: "Kasia", gift: "Zestaw do kawy", status: "zapakowane", price: "140 zł" },
        { name: "Babcia", gift: "Ciepłe kapcie", status: "kupione", price: "80 zł" },
      ],
    },
    tasks: {
      title: "Zadania rodzinne",
      subtitle: "Dom · 4 osoby",
      items: [
        { task: "Umyć okna", who: "Kasia", done: true },
        { task: "Upiec pierniki", who: "Mama", done: true },
        { task: "Kupić choinkę", who: "Tata", done: false },
        { task: "Posprzątać przedpokój", who: "Ty", done: false },
        { task: "Odebrać karpia", who: "Tata", done: false },
      ],
    },
    packing: {
      title: "Wyjazd do babci",
      subtitle: "23 grudnia · 7 z 10",
      items: [
        { item: "Prezenty dla rodziny", done: true },
        { item: "Ładowarka do telefonu", done: true },
        { item: "Ciepły sweter", done: true },
        { item: "Kapcie", done: false },
        { item: "Leki", done: false },
        { item: "Ciasto dla babci", done: false },
      ],
    },
  },

  // Sekcja 4: wspólne planowanie
  family: {
    eyebrow: "Razem z rodziną",
    title: "Święta to praca zespołowa.",
    text: "Zaproś bliskich jednym linkiem – nie muszą niczego instalować.",
    linkText:
      "Link do wspólnej listy wysyłasz na czacie rodzinnym. Każdy otwiera go w telefonie i od razu widzi swoje zadania.",
    privacyTitle: "A prezenty?",
    privacyText: "Tylko Ty je widzisz. Niespodzianka zostaje niespodzianką.",
  },

  // Sekcja 5: pakiety (ceny wpisujesz w config/site.ts)
  plans: {
    eyebrow: "Pakiety",
    title: "Zacznij za darmo. Więcej, gdy zechcesz.",
    priceSoon: "Cena wkrótce",
    items: [
      {
        id: "darmowy",
        name: "Darmowy",
        for: "Na dobry początek",
        points: ["Lista prezentów dla kilku osób", "Twoja lista zadań", "Jedna lista pakowania"],
      },
      {
        id: "podstawowy",
        name: "Podstawowy",
        for: "Dla Ciebie, bez ograniczeń",
        points: [
          "Prezenty dla dowolnej liczby osób",
          "Podsumowanie wydatków",
          "Wiele list pakowania",
        ],
      },
      {
        id: "rodzinny",
        name: "Rodzinny",
        for: "Dla całego domu",
        points: [
          "Wszystko z pakietu Podstawowego",
          "Wspólna lista zadań rodziny",
          "Zapraszanie bliskich linkiem",
        ],
      },
    ],
  },

  // Sekcja 6: pytania
  faq: {
    eyebrow: "Pytania",
    title: "Zanim zapytasz.",
    items: [
      {
        q: "Czy muszę instalować aplikację?",
        a: "Nie. Gviazdka działa w przeglądarce na telefonie i komputerze. Jeśli chcesz, dodasz ją do ekranu głównego telefonu jak zwykłą aplikację.",
      },
      {
        q: "Czy moja rodzina musi zakładać konta?",
        a: "Nie. Wysyłasz bliskim link do wspólnej listy zadań, a oni po prostu ją otwierają i odhaczają to, co zrobili.",
      },
      {
        q: "Czy ktoś zobaczy prezenty, które dla niego planuję?",
        a: "Nie. Lista prezentów jest tylko Twoja. Rodzina widzi wyłącznie wspólne zadania.",
      },
      {
        q: "Kiedy Gviazdka wystartuje?",
        a: "W listopadzie, z zapasem przed świętami. Jeśli się zapiszesz, napiszemy do Ciebie w dniu startu.",
      },
      {
        q: "Ile to kosztuje?",
        a: "Będzie wersja darmowa. Ceny pozostałych pakietów ogłosimy przed startem.",
      },
    ],
  },

  // Sekcja 7: zakończenie
  closing: {
    title: "Tegoroczne święta mogą być inne. Spokojniejsze.",
    text: "Zapisz się, a damy Ci znać, gdy Gviazdka będzie gotowa.",
  },

  footer: {
    tagline: "Spokojny planer świąteczny.",
    privacy: "Polityka prywatności",
    terms: "Regulamin",
    contact: "Kontakt",
  },

  // Proste strony, które jeszcze czekają na treść
  soon: {
    title: "Wkrótce",
    text: "Pracujemy nad tą stroną. Zajrzyj tu niedługo.",
    back: "Wróć na stronę główną",
  },
} as const;
