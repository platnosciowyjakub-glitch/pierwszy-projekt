// Wszystkie teksty strony głównej. Możesz je swobodnie poprawiać.
// Zmieniaj tylko tekst w cudzysłowach, nie ruszaj nazw przed dwukropkiem.
// Słowa między gwiazdkami, np. *zaczynają się*, są w nagłówku wyróżnione ozdobnym krojem.

export const landing = {
  meta: {
    // Tytuł i opis widoczne w Google. Tytuł do ok. 60 znaków, opis do ok. 155.
    title: "Gviazdka – Twoje spokojne święta. Planer świąteczny",
    description:
      "Planer świąteczny na spokojne święta: gotowy plan przygotowań do świąt, lista prezentów i zadania z rodziną. Od listopada do Wigilii, bez stresu.",
  },

  // Nawigacja u góry strony. „Panel” pokazuje się po najechaniu myszką.
  nav: {
    items: [
      { label: "Zaplanuj święta", href: "/plan", photo: "tile-kalendarz", text: "Twój plan świąt, tydzień po tygodniu, od listopada do Wigilii." },
      { label: "Przygotuj prezenty", href: "/prezenty", photo: "tile-prezenty", text: "Pomysły, zakupy i budżet w jednym miejscu. Tylko dla Twoich oczu." },
      { label: "Podziel się zadaniami", href: "/zadania", photo: "tile-rodzina", text: "Wspólne porządki i przygotowania. Każdy wie, co ma zrobić." },
      { label: "Zaproś gości", href: "/goscie", photo: "tile-goscie", text: "Zaproszenia, potwierdzenia i lista gości z dietami." },
      { label: "Wyślij życzenia", href: "/zyczenia", photo: "tile-kartki", text: "Życzenia dla każdego, na czas. Z pomocą w pisaniu." },
    ],
    panelLink: "Zobacz",
    pricing: "Cennik",
    signup: "Zapisz się",
    menu: "Menu",
    close: "Zamknij menu",
    mobileExtra: [
      { label: "Pytania", href: "/#pytania" },
      { label: "Napisz do nas", href: "contact" },
    ],
  },

  hero: {
    // Słowa w *gwiazdkach* są w nagłówku wyróżnione pochyłą, żurawinową kursywą.
    title: "Planer świąteczny *dla całej rodziny*",
    subtitle:
      "Gotowy plan przygotowań od listopada do Wigilii. Zaplanuj święta, przygotuj prezenty, podziel się zadaniami z bliskimi i zaproś gości – w jednym miejscu.",
    // Trzy drobne zapewnienia obok przycisku
    trust: ["Za darmo na start", "Bez instalowania", "Premiera w listopadzie"],
    videoPlaceholder: "Tu będzie krótki film o Gviazdce",
    videoLabel: "Film: jak działa Gviazdka",
  },

  // Sekcja z sześcioma kafelkami
  categories: {
    title: "Wszystko, czego potrzebujesz *do spokojnych świąt*",
    subtitle: "Sześć prostych narzędzi, które poukładają przygotowania – od listopada do Wigilii.",
    more: "Zobacz, jak to wygląda",
    items: [
      {
        icon: "calendar",
        title: "Zaplanuj święta",
        text: "Gotowy plan przygotowań w kalendarzu. Co tydzień widzisz tylko to, co warto zrobić teraz.",
        example: "Ten tydzień: 3 drobne rzeczy",
        href: "/plan",
      },
      {
        icon: "gift",
        title: "Przygotuj prezenty",
        text: "Lista osób, pomysły, linki i to, co już kupione. Obdarowany niczego nie podejrzy.",
        example: "Mama · szalik · kupione",
        href: "/prezenty",
      },
      {
        icon: "family",
        title: "Podziel się zadaniami",
        text: "Zaproś bliskich linkiem i rozdzielcie porządki. Każdy odhacza swoje.",
        example: "Umyć okna – Kasia",
        href: "/zadania",
      },
      {
        icon: "envelope",
        title: "Zaproś gości",
        text: "Zaproszenie na Wigilię i potwierdzenia w jednym miejscu. Za babcię potwierdzisz sam.",
        example: "Babcia Hela · będzie",
        href: "/goscie",
      },
      {
        icon: "suitcase",
        title: "Spakuj się na wyjazd",
        text: "Gotowa lista pakowania na święta u bliskich: ubrania, ładowarki, prezenty, leki.",
        example: "Ładowarka do telefonu",
        href: "#rodzina",
      },
      {
        icon: "card",
        title: "Wyślij życzenia",
        text: "Lista osób do życzeń i pomoc w pisaniu ciepłych słów. Nikogo nie pominiesz.",
        example: "Kartka dla cioci · wysłana",
        href: "/zyczenia",
      },
    ],
  },

  // Cztery duże sekcje funkcji
  features: {
    helpTitle: "Masz pytanie?",
    helpLink: "Napisz do nas",
    items: [
      {
        id: "plan",
        label: "Zaplanuj święta",
        title: "Zobacz swój *plan świąt*",
        text: "Odpowiedz na 4 pytania, a Gviazdka ułoży Twoje przygotowania w kalendarzu – od listopada do Wigilii. Zawsze wiesz, co warto zrobić w tym tygodniu.",
        primary: "cta",
        secondary: { label: "Co jeszcze potrafi", href: "#szczegoly" },
        photo: "feature-plan",
        alt: "Dłonie w swetrze trzymające kubek z herbatą",
      },
      {
        id: "prezenty",
        label: "Przygotuj prezenty",
        title: "Prezenty *pod kontrolą*",
        text: "Pomysły, linki, to, co już kupione, i ile wydałeś – w jednym miejscu. A obdarowany niczego nie podejrzy.",
        primary: "cta",
        secondary: { label: "Wszystko o prezentach", href: "/prezenty" },
        photo: "feature-prezenty",
        alt: "Mężczyzna pakuje prezenty przy stole",
      },
      {
        id: "rodzina",
        label: "Podziel się zadaniami",
        title: "Cała rodzina *w jednym miejscu*",
        text: "Zaproś bliskich jednym linkiem – bez instalowania aplikacji. Rozdzielcie porządki i przygotowania, a potem odhaczajcie razem.",
        primary: "cta",
        secondary: { label: "Pytania i odpowiedzi", href: "#pytania" },
        photo: "feature-rodzina",
        alt: "Babcia i wnuczka razem przygotowują świąteczne wypieki",
      },
      {
        id: "wigilia",
        label: "Zaproś gości",
        title: "Wigilia *u Ciebie*",
        text: "Wyślij ciepłe zaproszenie i zbierz potwierdzenia. Babcia nie ma smartfona? Potwierdzisz za nią jednym kliknięciem.",
        primary: "cta",
        secondary: { label: "Zobacz cennik", href: "#cennik" },
        photo: "feature-wigilia",
        alt: "Świątecznie nakryty stół z potrawami",
      },
    ],
  },

  // Interaktywny podgląd powitania (sekcja „plan świąt”)
  welcome: {
    step: "Pytanie 1 z 4",
    question: "Gdzie spędzasz święta?",
    planTitle: "Twój plan zaczyna się od:",
    options: [
      { label: "U siebie", plan: ["Zaproś gości", "Zaplanuj menu", "Porządki przed Wigilią"] },
      { label: "Jadę do rodziny", plan: ["Lista pakowania", "Prezenty w podróży", "Co przywieźć gospodarzom"] },
      { label: "Różnie", plan: ["Kalendarz spotkań", "Prezenty", "Lista pakowania"] },
    ],
  },

  // Przykładowe dane na makietach ekranów
  mockups: {
    gifts: {
      title: "Prezenty",
      summary: "Wydane 340 zł z 600 zł",
      items: [
        { who: "Mama", what: "Szalik z wełny", status: "kupione" },
        { who: "Tata", what: "Książka o Tatrach", status: "zapakowane" },
        { who: "Zosia", what: "Zestaw do malowania", status: "pomysł" },
      ],
      privacy: "Widzisz tylko Ty",
    },
    family: {
      title: "Porządki przed Wigilią",
      items: [
        { task: "Umyć okna", who: ["K"], names: "Kasia", done: true },
        { task: "Choinka", who: ["T"], names: "Tomek", done: false },
        { task: "Pierogi", who: ["B", "O"], names: "Babcia i Ola", done: false },
      ],
      packingTitle: "Pakowanie",
      packing: [
        { item: "Prezenty", done: true },
        { item: "Ładowarki", done: false },
      ],
    },
    invitation: {
      label: "Zaproszenie",
      title: "Wigilia u Kowalskich",
      date: "24 grudnia, 17:00",
      address: "ul. Świerkowa 5, Kraków",
      yes: "Będę",
      no: "Nie dam rady",
      guestsTitle: "Goście · 8 osób",
      guests: [
        { name: "Babcia Hela", note: "potwierdzone za nią", diet: "" },
        { name: "Ania i Marek", note: "będą", diet: "bez glutenu" },
        { name: "Wujek Staszek", note: "czekamy", diet: "" },
      ],
    },
  },

  // „Gviazdka tkwi w szczegółach”
  details: {
    title: "Gviazdka *tkwi w szczegółach*",
    items: [
      { id: "sekret", title: "Prezenty w sekrecie", text: "Obdarowany nie zobaczy, co dla niego szykujesz – nawet jeśli jest w tej samej rodzinie w Gviazdce." },
      { id: "babcia", title: "Babcia też się liczy", text: "Nie każdy ma smartfona. Dodasz gościa ręcznie i potwierdzisz obecność za niego." },
      { id: "plan", title: "Plan zamiast pustej kartki", text: "Gotowe zadania w polskich realiach: od listy prezentów po sianko pod obrusem." },
      { id: "link", title: "Bez instalowania", text: "Rodzina dołącza z linku wysłanego SMS-em, na WhatsAppie albo mailem." },
      { id: "zyczenia", title: "Pomoc w życzeniach", text: "Podpowiemy ciepłe słowa do kartek i pomysły na prezenty dla każdego." },
    ],
    panels: {
      sekret: { title: "Prezent dla Mamy", line: "Szalik z wełny · 120 zł", badge: "Widzisz tylko Ty", hidden: "Mama widzi: nic tu nie ma" },
      babcia: { name: "Babcia Hela", status: "Czekamy na odpowiedź", button: "Potwierdź za babcię", done: "Potwierdzone" },
      plan: { title: "Gotowy plan", rows: [["Listopad", "Lista osób do obdarowania"], ["Początek grudnia", "Kartki i życzenia"], ["2 tygodnie przed", "Okna i zamówienie karpia"], ["23 grudnia", "Pierogi i uszka"], ["24 grudnia", "Sianko pod obrusem"]] },
      link: { title: "Dołącz do listy rodziny", url: "gviazdka.pl/r/kowalscy", button: "Otwórz w przeglądarce", note: "Bez instalowania, bez konta" },
      zyczenia: { for: "Dla: Babcia Hela", tones: ["ciepłe", "zabawne", "oficjalne"], text: "Kochana Babciu, dziękujemy, że przy Twoim stole zawsze jest miejsce dla każdego. Zdrowych, spokojnych świąt." },
    },
  },

  // Sekcja wsparcia (ciemna)
  support: {
    title: "Masz pytanie? *Jesteśmy tu*, żeby pomóc.",
    text: "Napisz do nas – odpowiadamy po ludzku, bez automatów.",
    button: "Napisz do nas",
    photoAlt: "Kobieta siedzi przy oknie w ciepłym świetle",
    bubbles: ["Kiedy najlepiej zamówić karpia?", "Około dwóch tygodni przed Wigilią. Dodamy to do Twojego planu."],
  },

  pricingSection: {
    title: "Zacznij *za darmo*. Więcej, gdy zechcesz.",
    subtitle: "Ceny ogłosimy przed startem. Wersja darmowa zostanie z Tobą na zawsze.",
    button: "Zapisz się",
    featuredTag: "Dla całej rodziny",
  },

  faq: {
    title: "Zanim *zapytasz*",
    items: [
      { q: "Kiedy Gviazdka wystartuje?", a: "W listopadzie 2026. Zapisz się, a damy znać." },
      { q: "Czy muszę coś instalować?", a: "Nie, Gviazdka działa w przeglądarce na telefonie i komputerze. Jeśli chcesz, dodasz ją do ekranu głównego telefonu." },
      { q: "Czy rodzina musi zakładać konta?", a: "Nie. Wystarczy link, który im wyślesz." },
      { q: "Czy ktoś zobaczy prezenty, które dla niego planuję?", a: "Nie. Swoje prezenty widzisz tylko Ty." },
      { q: "A jeśli babcia nie ma smartfona?", a: "Dodasz ją ręcznie i potwierdzisz obecność za nią." },
      { q: "Ile to kosztuje?", a: "Będzie wersja darmowa. Ceny pakietów ogłosimy przed startem." },
    ],
  },

  // Zamknięcie z formularzem zapisu
  closing: {
    title: "Zrób sobie w tym roku *prezent: spokój*.",
    text: "Zapisz się na listę oczekujących. Napiszemy, gdy Gviazdka będzie gotowa – w listopadzie, z zapasem przed świętami.",
    launchedText: "Gviazdka już działa. Zacznij od czterech krótkich pytań.",
    photoAlt: "Ciepłe, złote światełka choinkowe",
  },

  signup: {
    emailLabel: "Twój adres e-mail",
    emailPlaceholder: "np. ania@poczta.pl",
    button: "Zapisz się",
    buttonLoading: "Zapisuję…",
    note: "Bez spamu, obiecujemy. Jedna wiadomość, gdy ruszymy.",
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

  footer: {
    tagline: "Spokojne święta zaczynają się tutaj.",
    columns: [
      { title: "Gviazdka", links: [{ label: "O nas", href: "about" }, { label: "Kontakt", href: "contact-page" }] },
      {
        title: "Funkcje",
        links: [
          { label: "Zaplanuj święta", href: "/plan" },
          { label: "Przygotuj prezenty", href: "/prezenty" },
          { label: "Podziel się zadaniami", href: "/zadania" },
          { label: "Zaproś gości", href: "/goscie" },
          { label: "Wyślij życzenia", href: "/zyczenia" },
        ],
      },
      { title: "Pomoc", links: [{ label: "Pytania i odpowiedzi", href: "/#pytania" }, { label: "Napisz do nas", href: "contact" }] },
      { title: "Informacje", links: [{ label: "Polityka prywatności", href: "privacy" }, { label: "Regulamin", href: "terms" }] },
    ],
    copyright: "© 2026 Gviazdka",
  },

  // Proste strony, które jeszcze czekają na treść
  soon: {
    title: "Wkrótce",
    text: "Pracujemy nad tą stroną. Zajrzyj tu niedługo.",
    back: "Wróć na stronę główną",
    pages: { privacy: "Polityka prywatności", terms: "Regulamin", contact: "Kontakt", about: "O nas" },
  },
} as const;
