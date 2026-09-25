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
Etap 1: **tylko strona główna (landing page)**, na razie jako strona przedpremierowa z zapisami
(„Zapisz się – damy znać, gdy ruszymy”). Po premierze jeden przełącznik w konfiguracji zmienia ją
w stronę sprzedażową z przyciskiem „Zacznij za darmo”. Nie buduj jeszcze aplikacji (konta, prezenty, zadania).

Stan: cała strona główna zbudowana i dopasowana do specyfikacji: hero (gotowy plan, prezenty, rodzina), „Znasz to?”, „Jak to działa” (3 kroki), trzy główne funkcje z podglądem ekranów (kalendarz i plan, prezenty, zadania z rodziną), „Różnica jest w szczegółach” (pozostałe funkcje), rodzina, pakiety Darmowy/Pełny/Rodzinny, pytania, zakończenie, stopka, strony „Wkrótce”. Czeka na uwagi właściciela. Zapisy jeszcze nie są nigdzie przechowywane (trzeba wybrać usługę).

## Najważniejsza zasada: ukojenie
Przytulnie, ciepło, łatwo, bez przepychu. Ciepłe światło, koc, kubek herbaty, cichy grudniowy wieczór.
Nie jarmark, nie reklama, nie kicz.
- Jedna myśl na ekran, dużo wolnej przestrzeni, krótkie zdania.
- Zero presji: bez liczników dni, bez wykrzykników, bez „OSTATNIA SZANSA”, bez wyskakujących okienek.
- Ton: życzliwy, spokojny, jak rozmowa z bliską osobą.
- Miękkość: zaokrąglone rogi, miękkie cienie, łagodne przejścia.
- Animacje delikatne i powolne; wszystkie wyłączone przy `prefers-reduced-motion`.
- Bez zdjęć stockowych i bez emoji. Tylko proste, ciepłe ilustracje SVG w jednej konwencji.

## Wygląd
- Tło `#FBF6EE` (krem), sekcje na zmianę `#F4ECDF` (beż).
- Tekst `#1F3A2E` (zieleń świerku), pomocniczy `#5B6B61`.
- Akcent `#A8443A` (żurawina) — przyciski i najważniejsze elementy.
- Złoto `#C9A15B` — tylko ozdoby (za mały kontrast na tekst; na złoty tekst użyj `#8A6A2F`).
- Nagłówki: Fraunces. Tekst: Nunito Sans. Obie z polskimi znakami. Tekst min. 18 px, wysoka interlinia.
- Logo: napis „Gviazdka” (Fraunces) + mała złota gwiazdka SVG (też jako favicon i ikona aplikacji).

## Technika
- Next.js (App Router) + TypeScript + Tailwind CSS, wdrożenie na Vercel.
- Kolory, czcionki, zaokrąglenia i odstępy w jednym miejscu (zmienne CSS / motyw Tailwinda).
- Wszystkie teksty strony w `content/landing.ts` — właściciel poprawia je sam.
- Ustawienia (przełącznik przed/po premierze, ceny pakietów) w `config/site.ts`.
- Mobile-first, bez poziomego przewijania. Dostępność: prawdziwe przyciski, etykiety pól,
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
- Analityka: na razie brak.
