// Teksty konta: logowanie, zakładanie konta i nowe hasło. Możesz je swobodnie poprawiać.
// Słowa w *gwiazdkach* są w nagłówkach wyróżnione ozdobnym krojem.

export const konto = {
  menuLogin: "Zaloguj się",

  // Strona /logowanie
  pageTitle: "Witaj w *Gviazdce*",
  pageText: "Zaloguj się albo załóż konto. Wystarczy e-mail i hasło.",
  tabLogin: "Mam już konto",
  tabSignup: "Zakładam konto",
  tabsLabel: "Logowanie albo nowe konto",

  emailLabel: "Twój adres e-mail",
  emailPlaceholder: "np. ania@poczta.pl",
  passwordLabel: "Hasło",
  newPasswordLabel: "Wymyśl hasło",
  passwordHint: "Co najmniej 8 znaków.",
  showPassword: "Pokaż",
  hidePassword: "Ukryj",
  showPasswordLabel: "Pokaż hasło",

  loginButton: "Zaloguj się",
  signupButton: "Załóż konto",
  resetButton: "Wyślij link do nowego hasła",
  wait: "Chwilkę…",
  forgot: "Nie pamiętasz hasła?",
  backToLogin: "Wróć do logowania",
  resetTitle: "Ustawmy nowe hasło",
  resetText: "Podaj e-mail swojego konta. Wyślemy Ci link, pod którym wpiszesz nowe hasło.",

  // Po wysłaniu maila
  signupSentTitle: "Jeszcze jeden krok",
  signupSentText:
    "Wysłaliśmy wiadomość na adres {email}. Otwórz ją i kliknij link, żeby potwierdzić konto. Potem wrócisz tutaj i się zalogujesz. Jeśli jej nie widzisz, zajrzyj do spamu lub do zakładki „Oferty”.",
  resetSentTitle: "Sprawdź skrzynkę",
  resetSentText:
    "Jeśli konto na adres {email} istnieje, znajdziesz w poczcie link do ustawienia nowego hasła. Jeśli go nie widzisz, zajrzyj do spamu.",

  // Błędy
  emailInvalid: "Ten adres wygląda na niepełny. Sprawdź go proszę jeszcze raz.",
  passwordShort: "Hasło powinno mieć co najmniej 8 znaków.",
  passwordMissing: "Wpisz proszę hasło.",
  wrongCredentials: "E-mail albo hasło się nie zgadzają. Spróbuj jeszcze raz.",
  notConfirmed: "Najpierw potwierdź konto – kliknij link w wiadomości, którą od nas dostałeś.",
  weakPassword: "To hasło jest zbyt łatwe do odgadnięcia. Wymyśl proszę trudniejsze.",
  tooMany: "Za dużo prób w krótkim czasie. Odczekaj proszę kilka minut.",
  alreadyExists: "Konto na ten adres już istnieje. Zaloguj się albo ustaw nowe hasło.",
  genericError: "Coś poszło nie tak. Spróbuj proszę za chwilę.",

  // Po kliknięciu linku potwierdzającego konto
  confirmedNotice: "Twoje konto zostało potwierdzone. Zaloguj się.",
  linkExpired: "Ten link już nie działa. Jeśli konto jest potwierdzone, po prostu się zaloguj. Jeśli nie, załóż je jeszcze raz.",

  unavailable: "Logowanie jeszcze się przygotowuje. Zajrzyj tu wkrótce.",
  loading: "Chwilkę…",
  loggedInTitle: "Jesteś zalogowany.",
  loggedInText: "Zalogowano jako {email}.",
  goToGifts: "Przejdź do listy prezentów",
  logout: "Wyloguj",
  note: "Na razie konto służy do testowania listy prezentów przed premierą.",

  // Strona /nowe-haslo (po kliknięciu linku z maila)
  newPasswordTitle: "Nowe *hasło*",
  newPasswordText: "Wpisz nowe hasło do swojego konta.",
  newPasswordButton: "Zapisz nowe hasło",
  newPasswordDone: "Gotowe. Nowe hasło jest zapisane.",
  newPasswordExpired: "Ten link już nie działa. Poproś proszę o nowy.",
  newPasswordAgain: "Wyślij nowy link",
} as const;
