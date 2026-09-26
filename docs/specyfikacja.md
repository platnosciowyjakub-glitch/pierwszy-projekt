# Gwiazdka – specyfikacja produktu (planner świąteczny)

> Dokument roboczy. Aktualizowany po każdej rozmowie planistycznej.
> Ostatnia aktualizacja: 25.09.2026 (wersja 2 – ustalone funkcje, inspiracja Zola)

---

## 1. Wizja

**Gwiazdka** to aplikacja, która daje spokój w najbardziej zabieganym okresie roku. Prowadzi użytkownika przez przygotowania do świąt krok po kroku – od listopada do Nowego Roku – samodzielnie i razem z rodziną.

**Grupa docelowa:** każda osoba, która przeżywa święta (nie tylko organizatorzy): nastolatek kupujący prezenty, rodzic ogarniający porządki, osoba jadąca na święta do rodziny, gospodarz Wigilii.

**Główna obietnica:** „Święta zaczynają się tutaj. Jesteśmy z Tobą każdego dnia aż do Wigilii.”

**Najważniejsza zasada:** użytkownik nigdy nie zaczyna od pustej kartki. Gwiazdka już wszystko rozplanowała – on tylko dopasowuje i odhacza.

**Rynek na start:** Polska (język polski).

---

## 2. Inspiracja: Zola (zola.com)

Bierzemy od Zoli:
- **Ton i styl:** nowoczesny, ciepły, elegancki, dużo przestrzeni.
- **Jedno zdanie obiecujące całą podróż** w nagłówku strony.
- **Przycisk jak zaproszenie**, nie jak zakup („Zaczynajmy”, „Zaplanuj spokojne święta”).
- **Każda funkcja = jedno krótkie zdanie korzyści.**
- **Personalizacja na start** (krótki quiz → dopasowany plan).
- **Sekcja „różnica jest w szczegółach”** – kilka drobnych, sprytnych rzeczy.
- **Model przychodu oparty na prezentach** (u nas: linki afiliacyjne).

Czego NIE bierzemy: rozbudowanego menu (Zola ma 15 pozycji) i wyszukiwarek usługodawców. Gwiazdka ma 4–5 pozycji w menu.

---

## 3. Ton i charakter produktu

- **Przytulny, ciepły, kojący.** Użytkownik ma poczuć ulgę, nie presję.
- Język życzliwy, prosty, na „Ty”, bez poganiania. Zamiast „Masz 5 zaległych zadań!” → „Zostało jeszcze 5 drobnych rzeczy. Dasz radę.”
- Bez kiczu i bez przepychu informacji. Jedna myśl na ekran.
- Miękkie kształty, delikatne animacje.
- Kolory: ciepły krem, zieleń świerku, przygaszona żurawina, miękkie złoto.

---

## 4. Forma techniczna

- **Aplikacja webowa typu PWA** – przeglądarka na telefonie i komputerze, możliwość dodania do ekranu głównego.
- Mobile-first.
- Rodzina i goście otwierają linki bez instalowania czegokolwiek.
- Płatności w Polsce: BLIK, szybkie przelewy, karta.
- Technologia: Next.js + TypeScript + Tailwind (ustalone w Claude Code), hosting Vercel.

---

## 5. Funkcje – USTALONE

### 5.1 Powitanie w 4 pytaniach (onboarding)
Po rejestracji krótki, ciepły quiz. Na jego podstawie Gwiazdka układa osobisty plan.
1. Gdzie spędzasz święta? → u siebie (gospodarz) / jadę do rodziny / różnie
2. Dla ilu osób kupujesz prezenty? → 1–3 / 4–8 / więcej
3. Czy chcesz planować razem z rodziną? → tak / na razie sam(a)
4. Od kiedy chcesz zacząć przygotowania? → już teraz / od grudnia / na ostatnią chwilę

Efekt: gotowy kalendarz z zadaniami dopasowanymi do odpowiedzi (np. gospodarz dostaje zadania związane z Wigilią i modułem gości, osoba wyjeżdżająca – listę pakowania). Wszystko można potem zmienić.

### 5.2 Kalendarz świąteczny – EKRAN GŁÓWNY aplikacji
- Oś czasu od listopada do Nowego Roku.
- **Wydarzenia:** Wigilia, Boże Narodzenie, Mikołajki, Wigilia firmowa, jasełka, wyjazd do rodziny, spotkania – własne i gotowe.
- **Zadania z terminami** (z planu, prezentów, zadań rodzinnych, gości) pokazują się w jednym widoku.
- **Widok „Ten tydzień”** – co spokojnie ogarnąć w najbliższych dniach. To domyślny widok po otwarciu aplikacji.
- Widok miesiąca / listy.

### 5.3 Gotowy plan „Święta krok po kroku”
- 60–80 gotowych zadań ułożonych w czasie, oparte na polskich realiach. Przykłady:
  - listopad: lista osób do obdarowania, pomysły na prezenty, rezerwacja terminów,
  - początek grudnia: kartki i życzenia, dekoracje, zakupy prezentów,
  - 2 tygodnie przed: porządki (okna, szafy), zamówienie karpia/ryby,
  - tydzień przed: zakupy spożywcze, pakowanie prezentów, choinka,
  - 23.12: pierogi, uszka, ciasta,
  - 24.12: nakrycie stołu, sianko pod obrusem, dodatkowe nakrycie.
- Warianty planu zależne od odpowiedzi z powitania (gospodarz / gość / wyjeżdżający).
- Użytkownik może usuwać, przesuwać, dodawać zadania.

### 5.4 Odliczanie i widżet
- Ciepłe odliczanie do Wigilii na ekranie głównym.
- Widżet / skrót na ekranie telefonu (w ramach możliwości PWA).
- Delikatne przypomnienia (powiadomienia push / e-mail) – bez presji, np. „Na ten tydzień zostały 3 drobne rzeczy.”

### 5.5 Prezenty
- Lista osób, pomysły, notatki (rozmiary, preferencje), link do produktu.
- Statusy: **pomysł → kupione → zapakowane → wręczone**.
- Opcjonalna cena i podsumowanie „ile wydałem”.
- **Prezenty prywatne** – obdarowany ich nie widzi, nawet jeśli jest w tej samej rodzinie.
- **Linki afiliacyjne** (patrz sekcja 8).

### 5.6 Zadania z rodziną
- Zapraszanie członków rodziny linkiem (SMS, WhatsApp, e-mail), bez instalowania aplikacji.
- Przydzielanie zadań (porządki, przygotowania) konkretnym osobom.
- Każdy odhacza swoje; widoczny postęp całej rodziny.
- Zadania rodzinne pojawiają się w kalendarzu.

### 5.7 Lista pakowania
- Checklista na wyjazd świąteczny z gotowym szablonem (ubrania, ładowarki, prezenty, leki, dokumenty), edytowalna.
- Ten sam mechanizm co listy zadań.

### 5.8 Goście i zaproszenia (dla gospodarza)
- Lista gości z liczbą osób, dietą i alergiami.
- **Zaproszenia linkiem:** kilka ładnych szablonów, gość potwierdza obecność bez zakładania konta.
- **Ręczne dodanie gościa i ręczne potwierdzenie obecności** (np. za babcię, która nie obsłuży aplikacji).
- Na dole zaproszenia dyskretne „Stworzone w Gwiazdce” (darmowa promocja).
- Data Wigilii / spotkania trafia do kalendarza.

### 5.9 Kartki i życzenia
- Lista osób, którym składamy życzenia, forma (kartka / SMS / telefon / osobiście) i status (do wysłania / wysłane).
- Kartki jako zadanie w kalendarzu (początek grudnia).
- Pomoc AI w pisaniu życzeń (ton: ciepły / zabawny / formalny, dla kogo) – patrz 5.10.

### 5.10 Pomoc AI
- **Pomysły na prezenty:** użytkownik opisuje osobę (wiek, zainteresowania, budżet) → propozycje prezentów, gdzie to możliwe z linkami partnerskimi.
- **Generator życzeń:** spersonalizowane życzenia do kartek i wiadomości.
- Funkcje AI jako element pakietu płatnego (koszt API).

---

## 6. Później / może (NIE na premierę)

- Menu wigilijne i przepisy, automatyczna lista zakupów z przepisów, harmonogram gotowania.
- „Kto co przynosi” – goście deklarują danie lub ciasto.
- Plan stołu.
- Wspólna lista zakupów.
- Historia z poprzednich lat (co komu dałem, przeniesienie planu na kolejny rok).
- Drukowane kartki i zaproszenia zamawiane z aplikacji (dodatkowy przychód, wzór: Zola).
- Wersje językowe, aplikacje w sklepach mobilnych.

---

## 7. Pakiety (wersja robocza – do dyskusji)

| Pakiet | Zawartość |
|---|---|
| **Darmowy** | Powitanie, kalendarz z gotowym planem, odliczanie, prezenty (limit osób), lista pakowania |
| **Pełny** (dla każdego) | Wszystko bez limitów + kartki i życzenia + pomoc AI |
| **Rodzinny** | Wszystko z Pełnego + zadania z rodziną i zapraszanie członków + goście i zaproszenia |

Ceny, nazwy i dokładne limity – do ustalenia. Uwaga z analizy konkurencji: Wishpile daje prezenty za darmo (zarabia na afiliacji), więc prezenty w Gwiazdce powinny być w dużej mierze darmowe, a płatna wartość to kalendarz + plan + rodzina + AI.

---

## 8. Afiliacja

- Linki partnerskie przy prezentach i w pomysłach AI.
- Linki muszą być wyraźnie oznaczone jako reklamowe / partnerskie (polskie przepisy). Do konsultacji z prawnikiem przed premierą.
- Wybór programów partnerskich – do ustalenia.

---

## 9. Konkurencja (skrót)

- Za granicą brak dużego produktu „wszystko w jednym” do świąt. Istnieją małe aplikacje obejmujące fragmenty: Wishpile (prezenty, darmowy, afiliacja), Christmas Planner. (prezenty + budżet), Christmas Party Organiser (goście, menu, listy – bez rodziny), Elfster/Giftster (listy życzeń).
- Ludzie składają święta z 4–5 narzędzi i kupują papierowe/Notion plannery → potwierdzony popyt.
- W Polsce brak odpowiednika.
- Najlepszy wzór produktu: plannery ślubne (Zola, Wesele z klasą, WeddingDream).

---

## 10. Harmonogram

- **Cel premiery aplikacji:** 10–15 listopada 2026.
- **Teraz:** strona główna jako strona przedpremierowa z zapisami (w trakcie w Claude Code).
- Kolejność budowy:
  1. Fundament: konto, powitanie w 4 pytaniach, rodzina, zapraszanie linkiem
  2. Kalendarz + gotowy plan + odliczanie
  3. Prezenty
  4. Zadania z rodziną + lista pakowania
  5. Goście i zaproszenia
  6. Kartki i życzenia + AI
  7. Płatności i pakiety
  8. Testy z kilkoma rodzinami przed premierą

Jeśli czasu zabraknie, punkty 5–6 przechodzą na aktualizację grudniową.

---

## 11. Otwarte decyzje

- [x] Nazwa: **Gwiazdka**
- [x] Styl: przytulny, kojący; inspiracja Zola
- [x] Zakres funkcji na premierę (sekcja 5)
- [ ] Domena
- [ ] Ceny pakietów, limity wersji darmowej, model (jednorazowo za sezon vs subskrypcja)
- [ ] Kto może tworzyć zadania rodzinne – wszyscy czy tylko organizator
- [ ] Treść gotowego planu (lista 60–80 zadań)
- [ ] Programy partnerskie
- [ ] Dostawca AI i koszt

---

## 12. Zasada porządkowania pomysłów

Każdy nowy pomysł trafia do jednego koszyka: **Teraz** / **Później** / **Może**.
