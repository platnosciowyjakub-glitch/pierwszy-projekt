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

- **Dla kogo:** dla każdego, kto przeżywa święta — nastolatek kupujący prezenty, rodzic ogarniający
  porządki, osoba jadąca na święta do rodziny. Nie tylko dla organizatorów.
- **Funkcje na premierę:**
  1. Prezenty — lista osób, pomysły, linki, status (pomysł → kupione → zapakowane → wręczone),
     opcjonalna cena i podsumowanie „ile wydałem”. Prezenty są prywatne.
  2. Zadania — lista osobista i wspólna lista rodzinna (przydzielanie, odhaczanie; rodzina
     dołącza przez link, bez instalowania czegokolwiek).
  3. Lista pakowania — checklista na wyjazd świąteczny.
- **Później:** moduł „Gospodarz” (zaproszenia, goście, menu, plan stołu), AI do pomysłów na prezenty i życzeń.
- **Pakiety:** Darmowy, Podstawowy, Rodzinny. Ceny jeszcze nieustalone („Cena wkrótce”).
- **Premiera aplikacji:** ok. 10–15 listopada 2026. Strona główna rusza wcześniej i zbiera zapisy.
- Pełna specyfikacja miała być w `specyfikacja-planner-swiateczny.md`, ale tego pliku nie ma w repo.
  Jeśli właściciel go dośle, zapisz go w `docs/` i uzupełnij ten plik.

## Aktualny etap
Etap 1: **tylko strona główna (landing page)**, na razie jako strona przedpremierowa z zapisami
(„Zapisz się – damy znać, gdy ruszymy”). Po premierze jeden przełącznik w konfiguracji zmienia ją
w stronę sprzedażową z przyciskiem „Zacznij za darmo”. Nie buduj jeszcze aplikacji (konta, prezenty, zadania).

Stan: cała strona główna zbudowana (hero, problemy, co dostajesz z podglądami ekranów, rodzina, pakiety, pytania, zakończenie, stopka) plus proste strony „Wkrótce”. Zawartość pakietów to wstępna propozycja — do potwierdzenia przez właściciela. Strona ma jasno pokazywać, co oferujemy i jakie problemy rozwiązujemy, a nie tylko chwytliwe hasła.

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
