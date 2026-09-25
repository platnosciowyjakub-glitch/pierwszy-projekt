# Analiza zola.com – układ, liczby i zasady

Pomiary ze strony głównej zola.com (wersja dla niezalogowanych), 25.09.2026, szerokości 1440 px i 390 px.
Spisujemy tylko układ, proporcje i zasady. Nie kopiujemy kodu, grafik, zdjęć, logo, fontów ani tekstów.

## 1. Zasady ogólne

- **Tło białe, tekst prawie czarny** (#0E0E0E), tekst pomocniczy szary (#757575).
- **Brak cieni.** Głębię dają kolorowe pasy tła, zaokrąglone kadry i cienkie linie podziału.
- **Cienkie linie 1 px** (jasnoszare) dzielą siatkę kafelków, kolumny i listy. Wygląda to jak redakcyjny układ gazety.
- **Pełna szerokość.** Sekcje sięgają krawędzi ekranu, a treść ma boczny margines **40 px** (komputer) i **20–24 px** (telefon). Kolumny tekstu mają węższy limit: **~460–520 px**.
- **Wszystkie przyciski to pigułki** (zaokrąglenie 100 px). Zwykle występują w parach: pełny + obrysowany.
- **Zdjęcia w zaokrąglonych kadrach** z nałożonymi „naklejkami”: małe elementy interfejsu, np. biała pigułka z ciemną obwódką i podpisem („Add gift”, „Customize fonts”). To sprytne połączenie zdjęcia z produktem.
- **Nagłówki łączą dwa kroje.** Zwykła część jest bezszeryfowa i lekka, a kluczowe słowa są w ciepłym, pogrubionym szeryfie. Przykład: „Share it all on a **free wedding website**”.

## 2. Typografia

| Element | Komputer (1440) | Telefon (390) |
|---|---|---|
| H1 (hero) | 64/64 px, szeryf display 500, odstęp liter −0.04 em | 32/36 px, jak wyżej |
| H2 duże (sekcje funkcji) | 64/64 px, bezszeryf 400 + wyróżnione słowa szeryfem, −0.04 em | 32/42 px |
| H2 średnie (siatka, „szczegóły”, zespół) | 32/40 px, −0.04 em | 24/32 px |
| Podtytuł hero | 24/32 px, −0.03 em | 14/22 px |
| Tekst w sekcjach funkcji | ~24/34 px | ~20/28 px |
| H3 (listy) | 16/20 px, 600 | 16/24 px, 600 |
| Tekst podstawowy | 16/24 px | 16/24 px |
| Drobny tekst, podpisy | 14/20 px | 14/20 px |
| Tytuł kafelka kategorii | 24 px + strzałka → | 16 px |

Kroje Zoli (nie używamy): display szeryf „New Spirit” i bezszeryf „Circular”. Najbliższe darmowe odpowiedniki: **Fraunces** / **DM Serif Display** (szeryf) i **DM Sans** (bezszeryf).

## 3. Przyciski

- Pigułka, zaokrąglenie 100 px, tekst 14–16 px, grubość 600, poziomy margines wewnętrzny 16–24 px.
- **Wysokości:** 44 px w nagłówku, 56 px w treści (hero, sekcje funkcji).
- **Pary:** pełny (ciemny albo pastelowy na ciemnym tle) + obrysowany (1 px ramka).
- **Na telefonie:** główny przycisk szeroki, drugi jako podkreślony link tekstowy pod spodem.

## 4. Kadry i karty

- **Duże kadry zdjęć:** zaokrąglenie **24 px**. W sekcjach funkcji mają 480 × 625 px, w siatce kategorii 280 × 240 px.
- **Duże panele** (np. ilustracja w „szczegółach”, zdjęcie zespołu): zaokrąglenie **16 px**.
- **Na telefonie:** kadry 16 px (miniatury 150 × 150, zdjęcia na całą szerokość treści), karty funkcji 24 px.

## 5. Sekcje po kolei (strona główna)

1. **Nagłówek:** 76 px, biały. Logo po lewej, po prawej „Masz konto? Zaloguj” i czarna pigułka „Get started” (44 px). Pod spodem kolorowy pasek promocji, 56 px.
   - Na komputerze, w wersji dla niezalogowanych, **nie ma rzędu kategorii**.
   - **Telefon:** pasek 57 px (hamburger, logo, koszyk). Menu wysuwa się z lewej (~320 px, reszta ekranu przyciemniona): lista z ikonami, grupy oddzielone liniami, na dole „Konto”.
2. **Hero:**
   - **Komputer:** zdjęcie lub film na całą szerokość (~806 px wysokości), na nim wyśrodkowany biały H1, podtytuł (maks. ~520 px) i dwie pigułki 56 px: biała obrysowana + czarna. Niżej okrągły przycisk „w dół”.
   - **Telefon:** zdjęcie w zaokrąglonym kadrze (16 px) na górze, pod nim wyśrodkowany H1, podtytuł, szeroka czarna pigułka i link tekstowy.
3. **Siatka kategorii:**
   - **Komputer:** lewa kolumna ~360 px z H2 („Everything you need…”, mieszany krój) i podtytułem. Prawa część to siatka **3 × 2** oddzielona liniami 1 px. W każdej komórce (padding ~40 px): tytuł 24 px ze strzałką, jedno zdanie 14 px i kadr 280 × 240 (24 px) z „naklejką”.
   - **Telefon:** poziomo przewijany rząd miniatur 150 × 150 z podpisem nad nimi.
4. **Sekcje funkcji, opowieść przy przewijaniu:**
   - **Komputer:** szeroki kolorowy pas (ciemny morski, granatowy; kolor zmienia się między funkcjami) na ~1200 px, a obok **przyklejony spis funkcji** (~240 px): lista z liniami, aktywna pozycja ciemna, reszta szara, na dole „Potrzebujesz pomocy? Napisz”. W pasie kadr **po lewej** (480 px, 24 px), tekst **po prawej**: H2 64 px w jasnym pastelu, tekst 24 px, dwie pigułki (pastelowa pełna + obrysowana). Odstęp między funkcjami ~150 px.
   - **Telefon:** mała etykieta nad H2, H2 32 px, tekst, przyciski, a pod nimi kadr. Pionowe kropki postępu z prawej.
5. **„Różnica jest w szczegółach”:**
   - **Komputer:** lewa kolumna 440 px z H2 32 px i listą-akordeonem. Pozycja aktywna jest rozwinięta (H3 600 + opis 16/24), pozostałe szare, między nimi linie 1 px. Prawa część to duży kolorowy panel (936 × 785, 16 px) z ilustracją interfejsu, która zmienia się z wybraną pozycją.
   - **Telefon:** akordeon (wiersze 64 px).
6. **Zespół:**
   - **Komputer:** dwie kolumny z linią 1 px. Lewa: zdjęcie 824 × 730 (16 px) z „dymkami czatu”. Prawa: H2 32 px na górze, a na dole tekst 20 px i czarna pigułka (rozstawione na wysokość).
7. **Kategorie usługodawców:** okrągłe ikony 64 px (ciemny morski, biały znak) z podpisem 14 px, 8 w rzędzie. Na telefonie: 2 kolumny zdjęć (16 px).
8. **Pas linków SEO:** szare tło, rozwijane listy.
9. **Stopka:**
   - **Komputer:** jasnoszara. Kolumny „O nas”, „Porady i pomoc”, a za pionową linią blok marki: logo, hasło szeryfem, linki ze strzałkami, czarna pigułka, znaczek sklepu z aplikacjami, ikony społecznościowe 20 px. Dolny pasek: Prywatność, Regulamin… i © po prawej.

## 6. Ruch

- Pas funkcji zmienia kolor płynnie, a spis funkcji śledzi przewijanie.
- W „szczegółach” panel po prawej zmienia ilustrację po wybraniu pozycji.
- Przejścia krótkie i spokojne, bez efektów „wow”.

## 7. Czym Zola różni się od naszego briefu (do decyzji)

| Brief Gviazdki | Zola naprawdę |
|---|---|
| Rząd kategorii i panele po najechaniu w nawigacji | Na stronie głównej dla niezalogowanych go nie ma (jest tylko w menu na telefonie) |
| Hero: kolaż 2–3 zdjęć + telefon | Jedno zdjęcie lub film na całą szerokość, tekst na środku |
| Sekcje funkcji na zmianę lewo/prawo, co druga na kremie | Kolorowe pasy, kadr zawsze po lewej, przyklejony spis funkcji |
| „Szczegóły”: rząd 5 elementów | Akordeon + duży zmieniający się panel |
| Wsparcie: ciemna sekcja | Jasna, dwie kolumny ze zdjęciem |
| Stopka ciemna | Stopka jasnoszara |
| Cennik, FAQ | Brak na stronie głównej. Zaprojektujemy je w tym samym języku: pigułki, 24 px, linie 1 px, akordeon |
