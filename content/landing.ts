// Wszystkie teksty strony głównej. Możesz je swobodnie poprawiać.
// Zmieniaj tylko tekst w cudzysłowach, nie ruszaj nazw przed dwukropkiem.

export const landing = {
  meta: {
    // Tytuł i opis widoczne w Google. Tytuł do ok. 60 znaków, opis do ok. 155.
    title: "Gviazdka – Twoje spokojne święta. Planer świąteczny",
    description:
      "Planer świąteczny na spokojne święta: lista prezentów, porządki przed świętami i lista pakowania w jednym miejscu. Planuj razem z rodziną, bez stresu.",
  },

  hero: {
    eyebrow: "Planer świąteczny",
    title: "Twoje spokojne święta.",
    subtitle:
      "Prezenty, porządki przed świętami i lista pakowania w jednym, ciepłym miejscu. Razem z rodziną, bez chaosu.",
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
} as const;
