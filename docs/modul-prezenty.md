# Moduł „Prezenty i budżet” – plan (do akceptacji właściciela)

Wersja 1 · 26.09.2026 · status: **czeka na akceptację** (krok 0)

Wzór funkcji: Wishpile (tylko logika i przepływy). Wygląd, teksty, ikony i klimat – w 100% Gviazdki.
Pełny opis wymagań właściciela jest w wiadomości z 26.09.2026; tu jest plan, jak to zbudujemy.

---

## 1. Co już mamy (stan na dziś)

| Element | Stan |
|---|---|
| Logowanie (e-mail + hasło, potwierdzenie mailem, nowe hasło) | gotowe, Supabase, sesja w przeglądarce |
| Proste narzędzie prezentów w `/prezenty` | gotowe: osoby, budżet, prezenty, 4 statusy, ukrywanie kwot |
| Tabele `gift_people`, `gifts` (kwoty w złotych, statusy po polsku) | działają, zasady RLS „tylko właściciel” |
| Rodziny (households), członkostwa, zaproszenia | **brak** – trzeba zbudować (Etap B) |
| Powitanie w 4 pytaniach | **brak** – na razie lista „Święta 2026” tworzy się przy pierwszym wejściu do modułu |
| Kalendarz | **brak** – przygotujemy tylko miejsce na połączenie (Etap E3) |
| Usługa e-mail (Resend itp.) | **brak** – decyzja właściciela przed Etapem E |

Uwaga: w opisie stosu jest `@supabase/ssr`, a my dziś używamy samego `@supabase/supabase-js` w przeglądarce.
Decyzja techniczna w punkcie 6.1.

---

## 2. Model danych

Kwoty zawsze w **groszach** (liczby całkowite), wyświetlane `Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' })`.
Statusy w bazie po angielsku (`idea`, `bought`, `wrapped`, `given`), na ekranie po polsku (Pomysł, Kupione, Zapakowane, Wręczone).

### Etap A – rdzeń
- **gift_lists** – id, owner_id, name, occasion_type (`christmas` / `mikolajki` / `birthday` / `other`), event_date,
  total_budget_grosze, archived_at, cloned_from_id, created_at
- **recipients** – id, list_id, name, relation (`mama`, `tata`, `partner`, `dziecko`, `przyjaciel`, `wspolpracownik`, `inne`),
  budget_grosze, notes, birthday, avatar_color, linked_member_id (Etap B), sort_order, created_at
- **gifts** – id, list_id, recipient_id, created_by, title, price_grosze, quantity, url, store_name, image_path,
  notes, status, priority, is_group_gift, from_wish_id, deleted_at (do „Cofnij”), created_at, updated_at
- **gift_attachments** – id, gift_id, storage_path, kind (`photo` / `receipt`), mime, size_bytes, created_at
- **user_settings** – user_id, hide_amounts, notify_weekly, notify_new_wish
- **link_fetch_log** – user_id, created_at (limit zapytań „Wklej link”)

### Etap B – rodzina
- **households** – id, name, created_by
- **household_members** – id, household_id, user_id (albo puste dla osoby bez konta), display_name, role (`organizer` / `member`),
  managed_by (rodzic prowadzący listę dziecka), guest_token_hash
- **household_invites** – id, household_id, token_hash, created_by, expires_at, revoked_at
- **wishlists** – id, household_id, owner_member_id, occasion (lista prezentów, do której należy), share_token_hash, created_at
- **wishlist_items** – id, wishlist_id, title, price_grosze, url, store_name, image_path, notes, priority (`bardzo_chce` / `byloby_milo`)
- **wish_claims** – id, wish_item_id, claimed_by_member_id, gift_id (prezent utworzony u rezerwującego), created_at

### Etap C – razem
- **plan_shares** – id, list_id, user_id, scope (`whole_list` / `single_recipient`), recipient_id, invite_token_hash, accepted_at
- **group_gift_contributions** – id, gift_id, member_id albo participant_name, amount_grosze, paid, token_hash

### Etap D – losowanie
- **santa_events** – id, owner_id, name, budget_limit_grosze, exchange_date, place, organizer_sees_results, drawn_at, sent_at
- **santa_participants** – id, event_id, name, member_id (opcjonalnie), email (opcjonalnie), token_hash
- **santa_exclusions** – event_id, participant_a, participant_b
- **santa_assignments** – event_id, giver_id, receiver_id

### Etap E – kolejny rok
- korzysta z `gift_lists.cloned_from_id` i `archived_at`; przypomnienia z `user_settings`.

---

## 3. Zasady dostępu (RLS) – czyli kto co widzi

To pilnuje **baza danych**, nie tylko ekran. Nawet ręczne zapytanie nie ominie tych zasad.

1. **Lista prezentów, osoby, prezenty, załączniki, budżety** – widzi właściciel listy i osoby z `plan_shares`
   (zakres `single_recipient` = tylko jedna osoba).
2. **Obdarowany nigdy nie widzi swoich prezentów**: jeśli osoba na liście jest powiązana z członkiem rodziny
   (`recipients.linked_member_id`), to ten członek nie widzi jej prezentów, kwot ani załączników –
   także gdy jest partnerem we wspólnym planowaniu. Działa w obie strony: prezenty partnera dla mnie są ukryte przede mną.
3. **Rezerwacje** widzi rodzina, ale **nie właściciel listy życzeń** (u niego lista wygląda zawsze tak samo).
   Wyjątek do Twojej decyzji: rodzic, który prowadzi listę dziecka, widzi rezerwacje (dziecko nie ma konta).
4. **Losowanie** – każdy widzi tylko swoją wylosowaną osobę; organizator nie widzi wyników, jeśli tak ustawi.
5. **Linki dla osób bez konta** (lista życzeń, losowanie, składka, dołączenie do rodziny): długi, losowy klucz
   (256 bitów), w bazie zapisany tylko jako skrót (hash), do odwołania przez organizatora. Obsługiwane wyłącznie
   przez funkcje serwerowe.
6. **Paragony i zdjęcia** – prywatny schowek (bucket) w Supabase Storage, ta sama zasada co pkt 1–2,
   wyświetlanie przez podpisane linki ważne kilka minut.

**Testy**: plik `supabase/tests/rls_prezenty.sql` z użytkownikami testowymi: **Ja**, **Partner**, **Mama** (obdarowana,
w rodzinie), **Babcia** (bez konta, link). Test udaje każdego z nich po kolei i sprawdza, że np. Mama dostaje
0 wierszy, gdy pyta wprost o swoje prezenty. Testy uruchamiam u siebie na lokalnej bazie przed każdym wysłaniem;
Ty możesz je też puścić w Supabase (SQL Editor) – wszystko dzieje się w transakcji, która na końcu się cofa,
więc nic w bazie nie zostaje.

---

## 4. Ekrany i nawigacja

Moduł mieszka pod `/prezenty` (niezalogowany widzi tam dalej ekran z filmem).

| Zakładka | Adres | Co tam jest |
|---|---|---|
| Osoby (domyślna) | `/prezenty` | nagłówek listy (nazwa, odliczanie, budżet), karty osób z paskiem i licznikami statusów |
| Osoba | `/prezenty/osoba/[id]` | budżet, notatki, prezenty pogrupowane po statusach, „Z jej listy życzeń” (Etap B) |
| Wszystkie prezenty | `/prezenty/wszystkie` | filtry po statusie i osobie, w tym „Do zapakowania” |
| Rodzina | `/prezenty/rodzina` | listy życzeń rodziny i rezerwacje (Etap B) |
| Moja lista życzeń | `/prezenty/moja-lista` | czego ja chcę (Etap B) |
| Podsumowanie | `/prezenty/podsumowanie` | wydane / planowane / budżet, podział na osoby |
| Losowania | `/prezenty/losowania` | **propozycja:** osobna zakładka modułu, bo to samodzielne wydarzenie z własnymi uczestnikami |

Publiczne linki (bez konta): `/lista/[klucz]` (lista życzeń + rezerwacja), `/dolacz/[klucz]` (dołącz do rodziny),
`/mikolaj/[klucz]` (odsłonięcie wyniku losowania), `/skladka/[klucz]` (moja część prezentu grupowego).

**Telefon:** zakładki przewijane u góry, duży okrągły „+” w prawym dolnym rogu (dodaj osobę / prezent / życzenie),
dodawanie w panelu wysuwanym od dołu. **Komputer:** dwie kolumny – lista osób po lewej, szczegóły po prawej.

Przełącznik listy (Święta 2026 / Mikołajki / Urodziny Zosi) i „Ukryj kwoty” – w nagłówku modułu.

---

## 5. Etapy i kolejność pracy

**0. Makiety (przed bazą):** Osoby, Osoba, Dodaj prezent z wklejeniem linku – telefon i komputer, na danych przykładowych.
Pokazuję zrzuty, czekam na Twoje uwagi.

**Etap A – rdzeń** (kolejne małe kroki, każdy z własnym podglądem):
1. Nowe tabele + przeniesienie Twoich obecnych danych testowych do listy „Święta 2026” + testy RLS.
2. Osoby i lista (A1, A2), prezenty i statusy (A3), budżet i podsumowanie (A5).
3. „Wklej link” (A4).
4. Zdjęcia i paragony (A6).
5. Miejsce na linki partnerskie (A7).
6. Dane przykładowe (seed) do testów.

**Etap B** – rodzina, listy życzeń, rezerwacje, osoby bez konta.
**Etap C** – planowanie we dwoje, pomocnik dla jednej osoby, prezenty grupowe.
**Etap D** – losowanie mikołajkowe.
**Etap E** – klonowanie na kolejny rok, archiwum, przypomnienia (po wyborze usługi e-mail), miejsce na kalendarz.

Po każdym etapie: działa, testy przechodzą, podgląd na Vercelu, instrukcja „co kliknąć i jakim kontem”.

---

## 6. Decyzje techniczne (proponowane)

### 6.1 Logowanie a serwer
Dziś sesja żyje w przeglądarce. Funkcje serwerowe (np. „Wklej link”) sprawdzą, kto pyta, na podstawie przepustki
(tokenu) wysyłanej z przeglądarki – Supabase potwierdza ją po swojej stronie. Dzięki temu **nie zmieniamy działającego
logowania** i nie musisz zmieniać szablonów maili. Przejście na `@supabase/ssr` (sesja w ciasteczkach) zrobimy,
jeśli okaże się potrzebne – np. przy przypomnieniach e-mail.

### 6.2 „Wklej link” – bezpieczeństwo
- Pobieranie tylko na serwerze, tylko `http`/`https`, blokada adresów prywatnych i lokalnych (localhost, 127.0.0.0/8,
  10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.0.0/16, ::1, fc00::/7, fe80::/10 itd.) – sprawdzane po zamianie nazwy
  na adres IP i **przy każdym przekierowaniu** (maks. 3).
- Limit czasu 5 s, limit rozmiaru 1,5 MB, limit 30 odczytów na godzinę na osobę.
- Odczyt: JSON-LD (Product/Offer), Open Graph, meta tagi, na końcu `<title>`.

### 6.3 Zdjęcie produktu: adres czy kopia? **Rekomendacja: kopia w naszym schowku (Supabase Storage).**
- Gdy pokazujemy obrazek prosto ze sklepu, każde otwarcie listy mówi sklepowi, kto i kiedy ogląda – to może być
  piksel śledzący, a obrazek potrafi zniknąć albo się podmienić.
- Kopia: serwer pobiera obrazek raz (z tymi samymi zabezpieczeniami co link), sprawdza, że to naprawdę JPG/PNG/WebP
  do 5 MB, i zapisuje w prywatnym schowku. Potem widzisz go tylko Ty i osoby, którym dajesz dostęp.
- Koszt: trochę miejsca w Supabase (darmowy pakiet ma 1 GB – wystarczy na tysiące miniatur).

### 6.4 Pozostałe
- Usuwanie z „Cofnij”: prezent dostaje znacznik „usunięty”, przez kilka sekund można go przywrócić.
- Zmiana statusu działa od razu na ekranie; jeśli zapis się nie uda, wraca poprzedni stan i spokojny komunikat.
- Zdjęcia zmniejszane w przeglądarce przed wysłaniem (bez ciężkich bibliotek).
- Limity wersji darmowej: miejsce w `config/pricing.ts` (np. `maxRecipients`), na razie wyłączone.
- Linki partnerskie: jedna funkcja `affiliateUrl(url)` i lista sklepów w konfiguracji; oznaczenie „Link partnerski”,
  `rel="sponsored noopener noreferrer"`.
- Teksty modułu w jednym pliku `content/gifts.ts`.

---

## 7. Czego będę potrzebować od Ciebie (później, krok po kroku)

| Kiedy | Co | Uwagi |
|---|---|---|
| Etap A, krok 1 | uruchomić w Supabase 1 plik SQL (nowe tabele) | podam dokładne kroki |
| Etap A, krok 4 | nic – schowek na zdjęcia utworzy ten sam plik SQL | |
| Etap B | dodać w Vercelu tajny klucz Supabase (`SUPABASE_SECRET_KEY`) | tylko w ustawieniach Vercela, **nigdy w czacie** |
| Etap E | wybór usługi e-mail (np. Resend) i domeny | zapytam, zanim cokolwiek podłączę |
| Przed premierą | programy partnerskie, limity pakietów | |
