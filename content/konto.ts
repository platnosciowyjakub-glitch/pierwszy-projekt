// Teksty logowania (strona /logowanie, przycisk w menu i logowanie w narzędziach).

export const konto = {
  menuLogin: "Zaloguj się",
  menuAccount: "Moja lista",
  pageTitle: "Zaloguj się do *Gviazdki*",
  pageText: "Wpisz swój adres e-mail. Wyślemy Ci link – kliknij go, a od razu będziesz w środku. Bez hasła do zapamiętania.",
  emailLabel: "Twój adres e-mail",
  emailPlaceholder: "np. ania@poczta.pl",
  sendLink: "Wyślij mi link do logowania",
  sending: "Wysyłam…",
  sentTitle: "Gotowe. Sprawdź skrzynkę.",
  sentText:
    "Wysłaliśmy wiadomość z linkiem na adres {email}. Otwórz ją i kliknij „Zaloguj się”. Jeśli jej nie widzisz, zajrzyj do spamu lub do zakładki „Oferty”.",
  sendAgain: "Wyślij jeszcze raz",
  emailInvalid: "Ten adres wygląda na niepełny. Sprawdź go proszę jeszcze raz.",
  loginError: "Nie udało się wysłać linku. Spróbuj proszę za kilka minut.",
  unavailable: "Logowanie jeszcze się przygotowuje. Zajrzyj tu wkrótce.",
  loading: "Chwilkę…",
  loggedInTitle: "Jesteś zalogowany.",
  loggedInText: "Zalogowano jako {email}.",
  goToGifts: "Przejdź do listy prezentów",
  logout: "Wyloguj",
  note: "Na razie logowanie służy do testowania listy prezentów przed premierą.",
} as const;
