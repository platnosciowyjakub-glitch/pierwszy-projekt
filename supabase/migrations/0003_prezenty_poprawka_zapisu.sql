-- Gviazdka · poprawka: dodawanie nowej listy i nowej osoby
-- Uruchom raz w Supabase: SQL Editor → New query → wklej całość → Run.
--
-- Co naprawia: zasady „kto co widzi” dla list i osób sprawdzały nowy wiersz przez zapytanie do tej samej
-- tabeli, a baza w chwili zapisu jeszcze go „nie widzi”. Zapis kończył się błędem. Teraz sprawdzamy pola
-- samego wiersza (właściciel listy, powiązanie osoby) – prywatność zostaje dokładnie taka sama.

begin;

-- Czy ten członek rodziny to ja? (Etap B: powiązanie osoby z kontem; na razie nikt nie jest powiązany)
create or replace function public.is_linked_me(p_member_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select false;
$$;
revoke all on function public.is_linked_me(uuid) from public, anon;
grant execute on function public.is_linked_me(uuid) to authenticated;

-- Czy to ja jestem obdarowanym tej osoby? (korzysta z powyższej funkcji)
create or replace function public.is_me_recipient(p_recipient_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.recipients r where r.id = p_recipient_id and public.is_linked_me(r.linked_member_id));
$$;

-- Listy: właściciel (współplanujący dojdą w Etapie C)
drop policy if exists "Listy: odczyt" on public.gift_lists;
create policy "Listy: odczyt" on public.gift_lists for select to authenticated using (owner_id = auth.uid());

-- Osoby: w mojej liście i nie ja jako obdarowany
drop policy if exists "Osoby: odczyt" on public.recipients;
create policy "Osoby: odczyt" on public.recipients for select to authenticated
  using (public.can_access_list(list_id) and not public.is_linked_me(linked_member_id));
drop policy if exists "Osoby: zmiana" on public.recipients;
create policy "Osoby: zmiana" on public.recipients for update to authenticated
  using (public.can_access_list(list_id) and not public.is_linked_me(linked_member_id))
  with check (public.can_access_list(list_id));
drop policy if exists "Osoby: usuwanie" on public.recipients;
create policy "Osoby: usuwanie" on public.recipients for delete to authenticated
  using (public.can_access_list(list_id) and not public.is_linked_me(linked_member_id));

commit;
