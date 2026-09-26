-- Gviazdka · dane przykładowe modułu prezentów (do testów)
-- 1. W linijce z e-mailem niżej wpisz adres swojego konta w Gviazdce (między apostrofami).
-- 2. Supabase → SQL Editor → New query → wklej całość → Run.
-- Powstaje osobna lista „Święta 2026 – przykład” (Twoja prawdziwa lista zostaje nietknięta).
-- Uruchomienie drugi raz najpierw usuwa poprzednią listę przykładową i tworzy ją od nowa.
-- Lista życzeń Kasi z rezerwacją dojdzie w Etapie B (rodzina).

do $$
declare
  v_email text := 'TWOJ@EMAIL.PL';
  v_user uuid;
  v_list uuid;
  v_mama uuid;
  v_tata uuid;
  v_zosia uuid;
  v_babcia uuid;
begin
  select id into v_user from auth.users where email = lower(v_email);
  if v_user is null then
    raise exception 'Nie ma konta %. Wpisz w pliku adres, którym logujesz się do Gviazdki.', v_email;
  end if;

  delete from public.gift_lists where owner_id = v_user and name = 'Święta 2026 – przykład';

  insert into public.gift_lists (owner_id, name, occasion_type, event_date, total_budget_grosze)
  values (v_user, 'Święta 2026 – przykład', 'christmas', '2026-12-24', 150000)
  returning id into v_list;

  insert into public.recipients (list_id, name, relation, budget_grosze, notes, avatar_color)
  values (v_list, 'Mama', 'mama', 40000, 'Rozmiar M, lubi zieleń i herbatę z malinami.', 'sage') returning id into v_mama;
  insert into public.recipients (list_id, name, relation, budget_grosze, avatar_color)
  values (v_list, 'Tata', 'tata', 5000, 'spruce') returning id into v_tata;
  insert into public.recipients (list_id, name, relation, budget_grosze, notes, avatar_color)
  values (v_list, 'Zosia', 'dziecko', 35000, '7 lat. Uwielbia konie i klocki.', 'cranberry') returning id into v_zosia;
  insert into public.recipients (list_id, name, relation, budget_grosze, notes, avatar_color)
  values (v_list, 'Babcia', 'dziadkowie', 20000, 'Nie ma konta – marzy o czymś ciepłym.', 'gold') returning id into v_babcia;
  insert into public.recipients (list_id, name, relation, avatar_color)
  values (v_list, 'Tomek', 'przyjaciel', 'sand');

  insert into public.gifts (list_id, recipient_id, created_by, title, price_grosze, status) values
    (v_list, v_mama, v_user, 'Szalik', 12900, 'bought'),
    (v_list, v_mama, v_user, 'Perfumy', null, 'idea'),
    (v_list, v_tata, v_user, 'Książka', 5990, 'wrapped'),
    (v_list, v_zosia, v_user, 'Klocki', 19900, 'bought'),
    (v_list, v_zosia, v_user, 'Lalka', null, 'idea'),
    (v_list, v_babcia, v_user, 'Koc', null, 'idea');
end $$;
