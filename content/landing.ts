// Wszystkie teksty strony głównej. Możesz je swobodnie poprawiać.
// Zmieniaj tylko tekst w cudzysłowach, nie ruszaj nazw przed dwukropkiem.

export const landing = {
  meta: {
    // Tytuł i opis widoczne w Google. Tytuł do ok. 60 znaków, opis do ok. 155.
    title: "Gviazdka – Twoje spokojne święta. Planer świąteczny",
    description:
      "Planer świąteczny na spokojne święta: gotowy plan przygotowań do świąt, lista prezentów i zadania z rodziną. Od listopada do Wigilii, bez stresu.",
  },

  nav: {
    signup: "Zapisz się",
  },

  hero: {
    eyebrow: "Planer świąteczny",
    title: "Twoje spokojne święta.",
    subtitle:
      "Gviazdka prowadzi Cię przez przygotowania do świąt krok po kroku, od listopada do Wigilii. Nie zaczynasz od pustej kartki – plan już na Ciebie czeka.",
    // Trzy rzeczy, które dostajesz (krótko, widoczne od razu na pierwszym ekranie)
    points: ["Gotowy plan w kalendarzu", "Lista prezentów z budżetem", "Zadania z całą rodziną"],
    note: "Damy znać, gdy Gviazdka wystartuje. Bez spamu, obiecujemy.",
    // Używane dopiero po premierze (gdy w config/site.ts jest launched: true)
    launchedButton: "Zaplanuj spokojne święta",
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
      { name: "Plan na ten tydzień", done: 3, total: 5, hint: "Wysłać kartki świąteczne" },
      { name: "Prezenty", done: 5, total: 8, hint: "Szalik dla mamy – kupione" },
      { name: "Zadania rodzinne", done: 4, total: 7, hint: "Umyć okna – Kasia" },
    ],
    footer: "Zostało kilka drobnych rzeczy. Dasz radę.",
  },

  // Sekcja 2: problemy, które rozwiązujemy
  problems: {
    eyebrow: "Znasz to?",
    title: "Grudzień potrafi przytłoczyć. Gviazdka pomaga to poukładać.",
    items: [
      {
        icon: "calendar",
        question: "Od czego w ogóle zacząć?",
        answer: "Od gotowego planu. Gviazdka ułożyła przygotowania za Ciebie, Ty tylko dopasowujesz i odhaczasz.",
      },
      {
        icon: "gift",
        question: "Co ja kupię i komu?",
        answer: "Wszystkie pomysły na prezenty w jednym miejscu. Widzisz, co już kupione, a co jeszcze czeka.",
      },
      {
        icon: "home",
        question: "Kto miał posprzątać?",
        answer: "Zaproś rodzinę, rozdzielcie zadania i odhaczajcie je razem.",
      },
    ],
  },

  // Sekcja 3: jak to działa
  steps: {
    eyebrow: "Jak to działa",
    title: "Trzy kroki do spokojnych świąt.",
    items: [
      {
        title: "Odpowiadasz na 4 pytania",
        text: "Gdzie spędzasz święta, dla ilu osób kupujesz prezenty i czy planujesz z rodziną.",
      },
      {
        title: "Dostajesz gotowy plan",
        text: "Gviazdka układa przygotowania od listopada do Wigilii, dopasowane do Ciebie.",
      },
      {
        title: "Odhaczasz w swoim tempie",
        text: "Samodzielnie albo razem z bliskimi. Wszystko możesz zmienić, przesunąć, dopisać.",
      },
    ],
  },

  // Sekcja 4: najważniejsze funkcje (z podglądem ekranów)
  features: {
    eyebrow: "Co znajdziesz w Gviazdce",
    title: "Jedno miejsce zamiast karteczek, notatek i czatów.",
    items: [
      {
        id: "plan",
        name: "Kalendarz i gotowy plan",
        title: "Przygotowania do świąt, rozpisane za Ciebie",
        text: "Po otwarciu widzisz tylko ten tydzień: co spokojnie ogarnąć w najbliższych dniach. Reszta czeka na swoją kolej.",
        points: [
          "Gotowy plan przygotowań oparty na polskich tradycjach",
          "Twoje wydarzenia: Mikołajki, jasełka, wyjazd, Wigilia",
          "Zadania z prezentów i rodziny w jednym kalendarzu",
          "Delikatne przypomnienia, bez poganiania",
        ],
      },
      {
        id: "prezenty",
        name: "Lista prezentów",
        title: "Prezenty bez zgadywania",
        text: "Zapisujesz, komu chcesz coś dać, i zbierasz pomysły wcześniej. W grudniu nic nie umyka.",
        points: [
          "Osoby, pomysły, rozmiary i linki do sklepów",
          "Status: pomysł, kupione, zapakowane, wręczone",
          "Podsumowanie „ile wydałem” w złotówkach",
          "Tylko Ty widzisz swoje prezenty",
        ],
      },
      {
        id: "rodzina",
        name: "Zadania z rodziną",
        title: "Porządki przed świętami, podzielone po równo",
        text: "Jedna wspólna lista dla całego domu. Każdy wie, co ma zrobić, i nikt nie musi przypominać.",
        points: [
          "Przydzielasz zadanie konkretnej osobie",
          "Bliscy dołączają przez link, bez instalowania",
          "Widać postęp całej rodziny",
        ],
      },
    ],
  },

  // Sekcja 5: pozostałe funkcje, w skrócie
  extras: {
    eyebrow: "I wszystko, czego potrzebują święta",
    title: "Różnica jest w szczegółach.",
    items: [
      { icon: "suitcase", title: "Lista pakowania", text: "Gotowa lista na świąteczny wyjazd. Ładowarki, prezenty, leki – nic nie zostaje w domu." },
      { icon: "envelope", title: "Goście i zaproszenia", text: "Ładne zaproszenie wysłane linkiem. Goście potwierdzają obecność bez zakładania konta." },
      { icon: "card", title: "Kartki i życzenia", text: "Lista osób, którym składasz życzenia, i spokój, że nikogo nie pominiesz." },
      { icon: "sparkle", title: "Pomoc w pomysłach", text: "Opisz osobę, a podpowiemy prezent. Pomożemy też napisać ciepłe życzenia." },
      { icon: "bell", title: "Odliczanie do Wigilii", text: "Łagodne przypomnienia w stylu: „Na ten tydzień zostały 3 drobne rzeczy.”" },
      { icon: "phone", title: "Bez instalowania", text: "Działa w przeglądarce na telefonie i komputerze. Możesz dodać ją do ekranu głównego." },
    ],
  },

  // Przykładowe dane na ekranach telefonów w sekcji 4
  screens: {
    plan: {
      title: "Ten tydzień",
      subtitle: "15–21 grudnia",
      items: [
        { task: "Umyć okna", meta: "Kasia · pon", done: true },
        { task: "Zamówić karpia", meta: "wt", done: true },
        { task: "Jasełka u Zosi", meta: "czw, 17:00", done: false, event: true },
        { task: "Zapakować prezenty", meta: "pt", done: false },
        { task: "Kupić choinkę", meta: "Tata · sob", done: false },
      ],
      footer: "Na ten tydzień zostały 3 drobne rzeczy.",
    },
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
      subtitle: "Dom · 4 osoby · 2 z 5",
      items: [
        { task: "Umyć okna", who: "Kasia", done: true },
        { task: "Upiec pierniki", who: "Mama", done: true },
        { task: "Kupić choinkę", who: "Tata", done: false },
        { task: "Posprzątać przedpokój", who: "Ty", done: false },
        { task: "Odebrać karpia", who: "Tata", done: false },
      ],
    },
  },

  // Sekcja 6: wspólne planowanie
  family: {
    eyebrow: "Razem z rodziną",
    title: "Święta to praca zespołowa.",
    text: "Zaproś bliskich jednym linkiem – nie muszą niczego instalować.",
    linkText:
      "Link wysyłasz SMS-em, na WhatsAppie albo mailem. Każdy otwiera go w telefonie i od razu widzi swoje zadania.",
    privacyTitle: "A prezenty?",
    privacyText: "Tylko Ty je widzisz. Niespodzianka zostaje niespodzianką.",
  },

  // Sekcja 7: pakiety (ceny wpisujesz w config/site.ts)
  plans: {
    eyebrow: "Pakiety",
    title: "Zacznij za darmo. Więcej, gdy zechcesz.",
    priceSoon: "Cena wkrótce",
    items: [
      {
        id: "darmowy",
        name: "Darmowy",
        for: "Na dobry początek",
        points: [
          "Gotowy plan w kalendarzu",
          "Odliczanie do Wigilii",
          "Lista prezentów dla kilku osób",
          "Lista pakowania",
        ],
      },
      {
        id: "pelny",
        name: "Pełny",
        for: "Dla Ciebie, bez limitów",
        points: ["Wszystko bez limitów", "Kartki i życzenia", "Pomoc w pomysłach na prezenty i życzenia"],
      },
      {
        id: "rodzinny",
        name: "Rodzinny",
        for: "Dla całego domu",
        points: [
          "Wszystko z pakietu Pełnego",
          "Zadania z rodziną i zapraszanie linkiem",
          "Goście i zaproszenia na Wigilię",
        ],
      },
    ],
  },

  // Sekcja 8: pytania
  faq: {
    eyebrow: "Pytania",
    title: "Zanim zapytasz.",
    items: [
      {
        q: "Od czego zacznę?",
        a: "Od czterech krótkich pytań. Na ich podstawie Gviazdka układa Twój plan przygotowań do świąt, a Ty tylko dopasowujesz go do siebie.",
      },
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
        a: "Nie. Lista prezentów jest tylko Twoja, nawet jeśli obdarowany należy do tej samej rodziny w Gviazdce.",
      },
      {
        q: "Kiedy Gviazdka wystartuje?",
        a: "W połowie listopada, z zapasem przed świętami. Jeśli się zapiszesz, napiszemy do Ciebie w dniu startu.",
      },
      {
        q: "Ile to kosztuje?",
        a: "Będzie wersja darmowa z gotowym planem i listą prezentów. Ceny pozostałych pakietów ogłosimy przed startem.",
      },
    ],
  },

  // Sekcja 9: zakończenie
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
