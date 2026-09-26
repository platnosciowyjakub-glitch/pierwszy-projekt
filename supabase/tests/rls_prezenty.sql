-- Gviazdka · testy prywatności modułu „Prezenty i budżet”
-- Można uruchomić w Supabase (SQL Editor → wklej całość → Run).
-- Wszystko dzieje się w transakcji, która na końcu się cofa – w bazie nic nie zostaje.
-- Wynik: brak czerwonego błędu = wszystkie testy przeszły. Błąd „TEST NIEUDANY: …” mówi, co jest nie tak.
--
-- Osoby testowe: Ja (właściciel listy), Partner, Mama (obdarowana), Babcia (bez konta = anon).

begin;
set local client_min_messages = warning;

create or replace function pg_temp.sprawdz(warunek boolean, opis text) returns void language plpgsql as $$
begin
  if not coalesce(warunek, false) then
    raise exception 'TEST NIEUDANY: %', opis;
  end if;
end $$;

create or replace function pg_temp.ile(zapytanie text) returns bigint language plpgsql as $$
declare n bigint;
begin
  execute 'select count(*) from (' || zapytanie || ') x' into n;
  return n;
end $$;

create or replace function pg_temp.czy_blad(polecenie text) returns boolean language plpgsql as $$
begin
  execute polecenie;
  return false;
exception when others then
  return true;
end $$;

grant execute on all functions in schema pg_temp to anon, authenticated;

insert into auth.users (id, email, aud, role) values
  ('00000000-0000-4000-8000-00000000000a', 'ja@test.gviazdka', 'authenticated', 'authenticated'),
  ('00000000-0000-4000-8000-00000000000b', 'partner@test.gviazdka', 'authenticated', 'authenticated'),
  ('00000000-0000-4000-8000-00000000000c', 'mama@test.gviazdka', 'authenticated', 'authenticated');

-- ── Ja zakładam listę, osoby i prezenty ─────────────────────────────────────────────────
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-4000-8000-00000000000a","role":"authenticated"}';

insert into public.gift_lists (id, name, event_date, total_budget_grosze, is_default)
values ('10000000-0000-4000-8000-000000000001', 'Święta 2026', '2026-12-24', 150000, true) returning id;
insert into public.recipients (id, list_id, name, relation, budget_grosze) values
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'Mama', 'mama', 30000),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', 'Babcia', 'dziadkowie', 20000),
  ('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', 'Partner', 'partner', 40000) returning id;
insert into public.gifts (id, list_id, recipient_id, title, price_grosze, status) values
  ('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'Szalik', 12900, 'bought'),
  ('30000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000002', 'Koc', 15000, 'idea'),
  ('30000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', 'Zegarek', 39900, 'wrapped') returning id;
insert into public.gift_attachments (gift_id, list_id, storage_path, kind, mime, size_bytes)
values ('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001',
        '10000000-0000-4000-8000-000000000001/30000000-0000-4000-8000-000000000001/paragon.pdf', 'receipt', 'application/pdf', 1000);
insert into storage.objects (bucket_id, name)
values ('gift-files', '10000000-0000-4000-8000-000000000001/30000000-0000-4000-8000-000000000001/paragon.pdf');
insert into public.link_fetch_log default values;

select pg_temp.sprawdz(pg_temp.ile('select * from public.gift_lists') = 1, 'Ja widzę swoją listę');
select pg_temp.sprawdz(pg_temp.ile('select * from public.recipients') = 3, 'Ja widzę swoje 3 osoby');
select pg_temp.sprawdz(pg_temp.ile('select * from public.gifts') = 3, 'Ja widzę swoje 3 prezenty');
select pg_temp.sprawdz(pg_temp.ile('select * from public.gift_attachments') = 1, 'Ja widzę swój paragon');
select pg_temp.sprawdz(pg_temp.ile($q$select * from storage.objects where bucket_id = 'gift-files'$q$) = 1, 'Ja widzę plik paragonu w schowku');
select pg_temp.sprawdz(pg_temp.czy_blad($q$insert into public.gift_lists (name, is_default) values ('Druga domyślna', true)$q$),
  'Nie da się utworzyć drugiej domyślnej listy');

-- ── Partner (osobne konto, bez współplanowania) nie widzi niczego ───────────────────────
set local request.jwt.claims = '{"sub":"00000000-0000-4000-8000-00000000000b","role":"authenticated"}';
select pg_temp.sprawdz(pg_temp.ile('select * from public.gift_lists') = 0, 'Partner nie widzi mojej listy');
select pg_temp.sprawdz(pg_temp.ile('select * from public.recipients') = 0, 'Partner nie widzi moich osób');
select pg_temp.sprawdz(pg_temp.ile('select * from public.gifts') = 0, 'Partner nie widzi moich prezentów (także tego dla siebie)');
select pg_temp.sprawdz(pg_temp.ile('select * from public.gift_attachments') = 0, 'Partner nie widzi moich paragonów');
select pg_temp.sprawdz(pg_temp.ile($q$select * from storage.objects where bucket_id = 'gift-files'$q$) = 0, 'Partner nie pobierze pliku paragonu');
select pg_temp.sprawdz(pg_temp.ile('select * from public.link_fetch_log') = 0, 'Partner nie widzi mojego dziennika linków');
select pg_temp.sprawdz(pg_temp.czy_blad($q$insert into public.recipients (list_id, name) values ('10000000-0000-4000-8000-000000000001', 'Intruz')$q$),
  'Partner nie dopisze osoby do mojej listy');
select pg_temp.sprawdz(pg_temp.czy_blad($q$insert into public.gifts (list_id, recipient_id, title) values ('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'Intruz')$q$),
  'Partner nie dopisze prezentu na mojej liście');
select pg_temp.sprawdz(pg_temp.czy_blad($q$insert into storage.objects (bucket_id, name) values ('gift-files', '10000000-0000-4000-8000-000000000001/obcy.jpg')$q$),
  'Partner nie wgra pliku do mojej listy');
update public.gifts set status = 'given' where id = '30000000-0000-4000-8000-000000000003';
delete from public.gifts where id = '30000000-0000-4000-8000-000000000001';
delete from public.gift_lists where id = '10000000-0000-4000-8000-000000000001';

-- Partner ma własną listę – Ja nie mogę podpiąć jego osoby pod swój prezent
insert into public.gift_lists (id, name) values ('10000000-0000-4000-8000-000000000002', 'Lista partnera') returning id;
insert into public.recipients (id, list_id, name) values ('20000000-0000-4000-8000-000000000009', '10000000-0000-4000-8000-000000000002', 'Kasia') returning id;

-- ── Mama (obdarowana, osobne konto) pyta wprost o swoje prezenty ───────────────────────
set local request.jwt.claims = '{"sub":"00000000-0000-4000-8000-00000000000c","role":"authenticated"}';
select pg_temp.sprawdz(pg_temp.ile($q$select * from public.gifts where id = '30000000-0000-4000-8000-000000000001'$q$) = 0,
  'Mama nie pobierze swojego prezentu nawet bezpośrednim zapytaniem');
select pg_temp.sprawdz(pg_temp.ile($q$select * from public.gifts where recipient_id = '20000000-0000-4000-8000-000000000001'$q$) = 0,
  'Mama nie pobierze prezentów dla siebie po numerze osoby');
select pg_temp.sprawdz(pg_temp.ile('select * from public.recipients') = 0, 'Mama nie widzi listy osób');
select pg_temp.sprawdz(pg_temp.ile('select price_grosze from public.gifts') = 0, 'Mama nie widzi kwot');

-- ── Babcia bez konta (anon) nie widzi niczego ──────────────────────────────────────────
reset request.jwt.claims;
set local role anon;
select pg_temp.sprawdz(pg_temp.czy_blad('select * from public.gifts') or pg_temp.ile('select * from public.gifts') = 0, 'Babcia bez konta nie widzi prezentów');
select pg_temp.sprawdz(pg_temp.czy_blad($q$insert into public.gift_lists (name) values ('x')$q$), 'Babcia bez konta nie założy listy');

-- ── Ja: moje dane są nietknięte, a cudzej osoby nie podepnę ────────────────────────────
set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-4000-8000-00000000000a","role":"authenticated"}';
select pg_temp.sprawdz(pg_temp.ile('select * from public.gift_lists') = 1, 'Moja lista przetrwała próbę usunięcia przez Partnera');
select pg_temp.sprawdz(pg_temp.ile('select * from public.gifts') = 3, 'Moje prezenty przetrwały próbę usunięcia przez Partnera');
select pg_temp.sprawdz(pg_temp.ile($q$select * from public.gifts where id = '30000000-0000-4000-8000-000000000003' and status = 'wrapped'$q$) = 1,
  'Partner nie zmienił statusu mojego prezentu');
select pg_temp.sprawdz(pg_temp.czy_blad($q$insert into public.gifts (list_id, recipient_id, title) values ('10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000009', 'Cudza osoba')$q$),
  'Nie podepnę prezentu pod osobę z cudzej listy');
select pg_temp.sprawdz(pg_temp.czy_blad($q$insert into public.gifts (list_id, recipient_id, title) values ('10000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000009', 'Na cudzej liście')$q$),
  'Nie dopiszę prezentu do cudzej listy');
select pg_temp.sprawdz(pg_temp.czy_blad($q$update public.gifts set recipient_id = '20000000-0000-4000-8000-000000000009' where id = '30000000-0000-4000-8000-000000000002'$q$),
  'Nie przeniosę prezentu do osoby z cudzej listy');

reset role;
rollback;
