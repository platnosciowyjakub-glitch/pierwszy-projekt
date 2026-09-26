# Zasady pracy w tym repo

Właściciel projektu dopiero uczy się programowania — tłumacz wszystko prostym językiem, bez żargonu.
Rozmawiaj z nim po polsku.

## Branche
- `main` = wersja oficjalna, wdrażana przez Vercel na główny adres strony.
- Wszystkie zmiany rób na osobnym branchu roboczym, nigdy bezpośrednio na `main`.
- Na `main` przenoś zmiany dopiero, gdy właściciel wprost napisze, że mu się podoba
  (pull request + "Squash and merge", żeby na `main` był jeden czysty commit).

## Kod
- Usuwaj nieużywany kod zamiast go zakomentowywać.
- Po każdej zmianie sprawdź stronę w przeglądarce (telefon 360–390 px, tablet, komputer), zanim ją wypchniesz.
- Zapisuj postęp w git z czytelnymi opisami zmian (po polsku).
- Przy wyglądzie i animacjach korzystaj ze skilla `.claude/skills/apple-design`.

# Projekt: Gviazdka

Świąteczny planner (aplikacja webowa), który daje ludziom spokój w najbardziej zabieganym okresie roku.
Rynek: Polska, język polski. Mówimy do użytkownika na „Ty”.
Nazwa pisana przez „v”: **Gviazdka** (odmiana: Gviazdki, Gviazdkę). Nie „Gwiazdka”.

**Pełna specyfikacja: `docs/specyfikacja.md`** (wersja 2, 25.09.2026). Przeczytaj ją przed większą pracą.
W specyfikacji nazwa jest jeszcze „Gwiazdka” — obowiązuje „Gviazdka”.

- **Obietnica:** „Święta zaczynają się tutaj. Jesteśmy z Tobą każdego dnia aż do Wigilii.”
- **Najważniejsza zasada produktu:** użytkownik nigdy nie zaczyna od pustej kartki. Gviazdka ma gotowy
  plan — on tylko dopasowuje i odhacza.
- **Dla kogo:** każdy, kto przeżywa święta — nastolatek kupujący prezenty, rodzic ogarniający porządki,
  osoba jadąca do rodziny, gospodarz Wigilii.
- **Inspiracja:** Zola (zola.com) — ciepło, elegancko, dużo przestrzeni; jedno zdanie obiecujące całą
  podróż; przycisk jak zaproszenie („Zaczynajmy”, „Zaplanuj spokojne święta”); każda funkcja = jedno
  zdanie korzyści; menu 4–5 pozycji.
- **Funkcje na premierę:** powitanie w 4 pytaniach → osobisty plan; kalendarz (ekran główny, widok
  „Ten tydzień”); gotowy plan 60–80 zadań od listopada do Wigilii; odliczanie i delikatne przypomnienia;
  prezenty (statusy, cena, „ile wydałem”, prywatne, linki partnerskie); zadania z rodziną (link, bez
  instalowania); lista pakowania; goście i zaproszenia; kartki i życzenia; pomoc AI (pomysły na prezenty,
  życzenia).
- **Pakiety (robocze):** Darmowy (powitanie, kalendarz z planem, odliczanie, prezenty z limitem, pakowanie),
  Pełny (bez limitów + kartki i życzenia + AI), Rodzinny (Pełny + zadania z rodziną + goście i zaproszenia).
  Ceny i limity nieustalone („Cena wkrótce”).
- **Premiera aplikacji:** 10–15 listopada 2026. Strona główna rusza wcześniej i zbiera zapisy.

## Aktualny etap
Etap 1: **tylko strona główna (landing page)**, strona przedpremierowa z zapisem na listę oczekujących.
Po premierze przełącznik w konfiguracji zamienia zapis na rejestrację („Zaczynajmy”).
Nie buduj jeszcze aplikacji (konta, prezenty, zadania).

Stan: **strona główna przebudowana na wzór układu Zoli** (analiza: `docs/analiza-zola.md`). Właściciel
pominął osobną stronę `/style` – od razu powstała strona główna. Sekcje: przyklejone menu z panelami,
hero ze zdjęciem, 6 kafelków, 4 funkcje w ciemnym pasie ze spisem, „szczegóły”, wsparcie, cennik, FAQ,
zapis, stopka. Czeka na uwagi właściciela. Zapisy jeszcze nie są nigdzie przechowywane. Zdjęcia CC0
(`docs/zdjecia.md`) są w niskiej rozdzielczości – do wymiany na lepsze.

### Podstrona „Przygotuj prezenty” (`/prezenty`)
Gałąź robocza: `claude/podstrona-prezenty` (odgałęziona od `claude/amazing-johnson-1x06q5`).
To przyszłe miejsce **samego narzędzia do prezentów**. Osoba niezalogowana widzi tylko: pierwszy ekran
(krótkie wyjaśnienie + film „jak to obsługiwać”, plik w `config/site.ts` → `giftsVideo`) i jedną sekcję
informacyjną o funkcjach. Pod nimi (dla zalogowanych) zbudujemy narzędzie.
Teksty w `content/prezenty.ts`, sekcje w `components/prezenty/`.
Inspiracja funkcjami z wishpile.com (budżet na osobę, etapy prezentu, planowanie z partnerem, rodzinna lista
życzeń z rezerwacją, wklejanie linku) – bierzemy wyłącznie pomysły na funkcje, wygląd i teksty są nasze.
Linki w menu i stopce prowadzą do `/#sekcja` albo do podstron, żeby działały z każdej strony.

## Kierunek: układ Zoli, marka Gviazdki
Strona ma wyglądać i działać bardzo podobnie do zola.com (układ, rytm, hierarchia, sposób prezentowania
funkcji), ale w kolorach, tekstach i grafikach Gviazdki: świątecznie, ciepło, po polsku.
- **Wolno:** wzorować się na siatce, kolejności sekcji, proporcjach, rodzajach komponentów, odstępach,
  hierarchii typografii i zachowaniu nawigacji.
- **Nie wolno:** kopiować kodu, grafik, zdjęć, ilustracji, logo, fontów firmowych ani tekstów Zoli.
  Wszystkie treści i grafiki są nasze.
- Analiza Zoli (liczby i zasady): `docs/analiza-zola.md`. Źródła i licencje zdjęć: `docs/zdjecia.md`.
- Nie wymyślamy nazwisk, zdjęć zespołu, opinii ani liczb użytkowników.
- Ton i zasady ukojenia poniżej nadal obowiązują (bez presji, bez wykrzykników, bez emoji).
- Decyzje właściciela (25.09.2026): nazwa zostaje **Gviazdka** (przez v, także tam, gdzie brief pisze
  „Gwiazdka”); **bez padającego śniegu**.

## Najważniejsza zasada: ukojenie
Przytulnie, ciepło, łatwo, bez przepychu. Ciepłe światło, koc, kubek herbaty, cichy grudniowy wieczór.
Nie jarmark, nie reklama, nie kicz.
- Krótkie zdania, dużo wolnej przestrzeni.
- Zero presji: bez liczników dni, bez wykrzykników, bez „OSTATNIA SZANSA”, bez wyskakujących okienek.
- Ton: życzliwy, spokojny, jak rozmowa z bliską osobą.
- Animacje delikatne (pojawianie się przy przewijaniu, lekkie powiększenie zdjęcia na kafelku);
  wszystkie wyłączone przy `prefers-reduced-motion`.
- Bez emoji. Duże, ciepłe zdjęcia w zaokrąglonych kadrach, makiety ekranów w HTML/CSS, ikony i ozdobniki
  jako własne SVG.

## Wygląd (nowa paleta, jako zmienne CSS / motyw Tailwinda)
- Tło strony `#FFFCF7` (ciepła biel); tła sekcji i kafelków `#F7F0E4` (krem), `#EFE5D5` (beż).
- Tekst i nagłówki `#1F3A2E` (świerk); pomocniczy `#56665C` (kontrast min. 4.5:1).
- Akcent (przyciski, linki) `#A8443A` żurawina, hover `#8E382F`.
- Ciemne sekcje i stopka `#1F3A2E` z tekstem `#FBF6EE`.
- Detale: złoto `#C9A15B` (tylko ozdobniki, nigdy tekst na jasnym tle), szałwia `#DCE5DA` (tła ikon, tagi).
- Linie i obramowania `#E8DDCC`.
- Kroje: tekst i zwykła część nagłówków **DM Sans**; H1 i wyróżnione słowa **Fraunces** (w tekstach słowa
  wyróżnione zapisujemy w gwiazdkach: `*słowo*`). Polskie znaki.
- Logo: nazwa w kroju nagłówkowym + mała złota gwiazdka SVG, wersje na jasne i ciemne tło, favicon.

## Technika
- Next.js (App Router) + TypeScript + Tailwind CSS, wdrożenie na Vercel.
- Kolory, czcionki, zaokrąglenia i odstępy w jednym miejscu (zmienne CSS / motyw Tailwinda).
- Wszystkie teksty strony w `content/landing.ts` — właściciel poprawia je sam.
- Ustawienia (przełącznik przed/po premierze, adres kontaktowy) w `config/site.ts`, ceny i nazwy pakietów w `config/pricing.ts`.
- Komponenty: `components/ui` (wspólne klocki), `components/landing` (sekcje), `components/mockups` (makiety ekranów).
- Responsywność: 360, 390, 768, 1024, 1440 px; przyciski min. 44 px; jeden H1 na stronie.
- Wydajność: next/image, next/font, bez ciężkich bibliotek, Lighthouse mobile docelowo 90+.
- Podglądy na Vercelu mają działać bez logowania (wyłączona Deployment Protection).
- Mobile-first (na telefonie układ jak u Zoli: stosy, przewijane rzędy kafelków), bez poziomego przewijania strony. Dostępność: prawdziwe przyciski, etykiety pól,
  kontrast min. 4.5:1, klawiatura, teksty alternatywne, `lang="pl"`.
- Czcionki przez `next/font`, lekkie SVG zamiast ciężkich obrazów.
- SEO: tytuł, opis, Open Graph, favicon, dane strukturalne.
  Główne hasło: „Twoje spokojne święta”. Frazy do wplatania naturalnie w teksty sekcji:
  „planer świąteczny”, „spokojne święta”, „lista prezentów”, „porządki przed świętami”,
  „lista pakowania na święta”, „przygotowania do świąt”. Pisz „planer” (poprawna polska forma), nie „planner”.
- Formularz zapisu: walidacja e-maila, stan ładowania, ciepłe podziękowanie bez przeładowania,
  przyjazny błąd, checkbox zgody (RODO) z linkiem do polityki prywatności, ukryte pole „honeypot”.
  Zapis przez funkcję serwerową z miejscem na podłączenie usługi.
  **Przed podłączeniem konkretnej usługi (Supabase, Resend, MailerLite itp.) zapytaj właściciela.**
- Analityka i ciasteczka: na razie brak.
