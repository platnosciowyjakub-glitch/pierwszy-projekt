-- Gviazdka · moduł „Prezenty i budżet” · Etap A (rdzeń)
-- Uruchom raz w Supabase: SQL Editor → New query → wklej całość → Run.
-- Plik przenosi też dane z pierwszej wersji listy (gift_people, gifts) do nowej listy „Święta 2026”.
-- Całość wykonuje się w jednej transakcji: jeśli coś pójdzie nie tak, nic się nie zmieni.
--
-- Zasady prywatności (pilnuje ich baza, nie tylko ekran):
--   • listę, osoby, prezenty, kwoty, zdjęcia i paragony widzi tylko właściciel listy
--     (w Etapie C dojdą osoby, którym właściciel da dostęp),
--   • obdarowany powiązany z członkiem rodziny nigdy nie widzi swoich prezentów (reguła gotowa, zadziała w Etapie B/C).

begin;

-- ─── Pierwsza wersja tabel → na bok (dane przeniesiemy niżej) ────────────────────────────────
do $$
begin
  if to_regclass('public.gifts') is not null and to_regclass('public.legacy_gifts') is null
     and exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'gifts' and column_name = 'person_id') then
    alter table public.gifts rename to legacy_gifts;
  end if;
  if to_regclass('public.gift_people') is not null and to_regclass('public.legacy_gift_people') is null then
    alter table public.gift_people rename to legacy_gift_people;
  end if;
end $$;

-- ─── Listy (okazje) ───────────────────────────────────────────────────────────────────────
create table if not exists public.gift_lists (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  occasion_type text not null default 'christmas' check (occasion_type in ('christmas', 'mikolajki', 'birthday', 'other')),
  event_date date,
  total_budget_grosze integer check (total_budget_grosze >= 0),
  is_default boolean not null default false,
  archived_at timestamptz,
  cloned_from_id uuid references public.gift_lists (id) on delete set null,
  created_at timestamptz not null default now()
);
-- Jedna domyślna lista na osobę (chroni przed podwójnym utworzeniem „Święta 2026”)
create unique index if not exists gift_lists_one_default on public.gift_lists (owner_id) where is_default and archived_at is null;
create index if not exists gift_lists_owner_idx on public.gift_lists (owner_id);

-- ─── Osoby (obdarowani) ───────────────────────────────────────────────────────────────────
create table if not exists public.recipients (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.gift_lists (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  relation text not null default 'inne'
    check (relation in ('mama', 'tata', 'partner', 'dziecko', 'rodzenstwo', 'dziadkowie', 'przyjaciel', 'wspolpracownik', 'inne')),
  budget_grosze integer check (budget_grosze >= 0),
  notes text check (notes is null or char_length(notes) <= 1000),
  birthday date,
  avatar_color text not null default 'sage' check (avatar_color in ('sage', 'gold', 'cranberry', 'spruce', 'sand', 'moss')),
  linked_member_id uuid, -- powiązanie z członkiem rodziny (Etap B)
  created_at timestamptz not null default now()
);
create index if not exists recipients_list_idx on public.recipients (list_id);

-- ─── Prezenty ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.gifts (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.gift_lists (id) on delete cascade,
  recipient_id uuid not null references public.recipients (id) on delete cascade,
  created_by uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  price_grosze integer check (price_grosze >= 0),
  quantity integer not null default 1 check (quantity between 1 and 99),
  url text check (url is null or (url ~* '^https?://' and char_length(url) <= 2000)),
  store_name text check (store_name is null or char_length(store_name) <= 80),
  image_path text check (image_path is null or char_length(image_path) <= 300),
  notes text check (notes is null or char_length(notes) <= 1000),
  status text not null default 'idea' check (status in ('idea', 'bought', 'wrapped', 'given')),
  priority text check (priority in ('high', 'normal', 'low')),
  is_group_gift boolean not null default false,
  from_wish_id uuid, -- z listy życzeń (Etap B)
  deleted_at timestamptz, -- „Usuń” z możliwością cofnięcia
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists gifts_list_idx on public.gifts (list_id);
create index if not exists gifts_recipient_idx on public.gifts (recipient_id);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;
drop trigger if exists gifts_touch on public.gifts;
create trigger gifts_touch before update on public.gifts for each row execute function public.touch_updated_at();

-- ─── Zdjęcia i paragony ───────────────────────────────────────────────────────────────────
create table if not exists public.gift_attachments (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references public.gifts (id) on delete cascade,
  list_id uuid not null references public.gift_lists (id) on delete cascade,
  storage_path text not null check (char_length(storage_path) <= 300),
  kind text not null check (kind in ('photo', 'receipt')),
  mime text not null check (mime in ('image/jpeg', 'image/png', 'image/webp', 'application/pdf')),
  size_bytes integer not null check (size_bytes between 1 and 10485760),
  created_by uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists gift_attachments_gift_idx on public.gift_attachments (gift_id);

-- ─── Limit „Wklej link” (ile odczytów w ciągu godziny) ────────────────────────────────────
create table if not exists public.link_fetch_log (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists link_fetch_log_user_idx on public.link_fetch_log (user_id, created_at);

-- ─── Kto co widzi: funkcje pomocnicze ─────────────────────────────────────────────────────
-- security definer = funkcja sprawdza uprawnienia „od środka”, bez zapętlenia zasad RLS.

-- Czy mogę oglądać i zmieniać tę listę? (Etap A: tylko właściciel; Etap C doda współplanujących)
create or replace function public.can_access_list(p_list_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.gift_lists l where l.id = p_list_id and l.owner_id = auth.uid());
$$;

-- Czy to ja jestem obdarowanym tej osoby? (Etap B: powiązanie z członkiem rodziny)
create or replace function public.is_me_recipient(p_recipient_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select false;
$$;

-- Czy mogę widzieć prezenty tej osoby? Lista dostępna I nie jestem obdarowanym.
create or replace function public.can_access_recipient(p_recipient_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.recipients r
    where r.id = p_recipient_id and public.can_access_list(r.list_id)
  ) and not public.is_me_recipient(p_recipient_id);
$$;

revoke all on function public.can_access_list(uuid), public.is_me_recipient(uuid), public.can_access_recipient(uuid) from public, anon;
grant execute on function public.can_access_list(uuid), public.is_me_recipient(uuid), public.can_access_recipient(uuid) to authenticated;

-- ─── Zasady RLS ───────────────────────────────────────────────────────────────────────────
alter table public.gift_lists enable row level security;
alter table public.recipients enable row level security;
alter table public.gifts enable row level security;
alter table public.gift_attachments enable row level security;
alter table public.link_fetch_log enable row level security;

-- Listy: tylko właściciel (współplanujący w Etapie C)
drop policy if exists "Listy: odczyt" on public.gift_lists;
create policy "Listy: odczyt" on public.gift_lists for select to authenticated using (public.can_access_list(id));
drop policy if exists "Listy: dodawanie" on public.gift_lists;
create policy "Listy: dodawanie" on public.gift_lists for insert to authenticated with check (owner_id = auth.uid());
drop policy if exists "Listy: zmiana" on public.gift_lists;
create policy "Listy: zmiana" on public.gift_lists for update to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());
drop policy if exists "Listy: usuwanie" on public.gift_lists;
create policy "Listy: usuwanie" on public.gift_lists for delete to authenticated using (owner_id = auth.uid());

-- Osoby: w dostępnych listach, z wyjątkiem osoby, która jest mną
drop policy if exists "Osoby: odczyt" on public.recipients;
create policy "Osoby: odczyt" on public.recipients for select to authenticated using (public.can_access_recipient(id));
drop policy if exists "Osoby: dodawanie" on public.recipients;
create policy "Osoby: dodawanie" on public.recipients for insert to authenticated with check (public.can_access_list(list_id));
drop policy if exists "Osoby: zmiana" on public.recipients;
create policy "Osoby: zmiana" on public.recipients for update to authenticated
  using (public.can_access_recipient(id)) with check (public.can_access_list(list_id));
drop policy if exists "Osoby: usuwanie" on public.recipients;
create policy "Osoby: usuwanie" on public.recipients for delete to authenticated using (public.can_access_recipient(id));

-- Prezenty: tylko dla osób, które mogę widzieć; osoba musi należeć do tej samej listy
drop policy if exists "Prezenty: odczyt" on public.gifts;
create policy "Prezenty: odczyt" on public.gifts for select to authenticated using (public.can_access_recipient(recipient_id));
drop policy if exists "Prezenty: dodawanie" on public.gifts;
create policy "Prezenty: dodawanie" on public.gifts for insert to authenticated with check (
  created_by = auth.uid()
  and public.can_access_recipient(recipient_id)
  and exists (select 1 from public.recipients r where r.id = recipient_id and r.list_id = gifts.list_id)
);
drop policy if exists "Prezenty: zmiana" on public.gifts;
create policy "Prezenty: zmiana" on public.gifts for update to authenticated
  using (public.can_access_recipient(recipient_id))
  with check (
    public.can_access_recipient(recipient_id)
    and exists (select 1 from public.recipients r where r.id = recipient_id and r.list_id = gifts.list_id)
  );
drop policy if exists "Prezenty: usuwanie" on public.gifts;
create policy "Prezenty: usuwanie" on public.gifts for delete to authenticated using (public.can_access_recipient(recipient_id));

-- Załączniki: jak prezent, do którego należą
drop policy if exists "Załączniki: odczyt" on public.gift_attachments;
create policy "Załączniki: odczyt" on public.gift_attachments for select to authenticated using (
  exists (select 1 from public.gifts g where g.id = gift_id and public.can_access_recipient(g.recipient_id))
);
drop policy if exists "Załączniki: dodawanie" on public.gift_attachments;
create policy "Załączniki: dodawanie" on public.gift_attachments for insert to authenticated with check (
  created_by = auth.uid()
  and exists (select 1 from public.gifts g where g.id = gift_id and g.list_id = gift_attachments.list_id and public.can_access_recipient(g.recipient_id))
  and storage_path like gift_attachments.list_id::text || '/%'
);
drop policy if exists "Załączniki: usuwanie" on public.gift_attachments;
create policy "Załączniki: usuwanie" on public.gift_attachments for delete to authenticated using (
  exists (select 1 from public.gifts g where g.id = gift_id and public.can_access_recipient(g.recipient_id))
);

-- Limit linków: każdy widzi i dopisuje tylko swoje wpisy
drop policy if exists "Limit linków: odczyt" on public.link_fetch_log;
create policy "Limit linków: odczyt" on public.link_fetch_log for select to authenticated using (user_id = auth.uid());
drop policy if exists "Limit linków: dodawanie" on public.link_fetch_log;
create policy "Limit linków: dodawanie" on public.link_fetch_log for insert to authenticated with check (user_id = auth.uid());

grant select, insert, update, delete on public.gift_lists, public.recipients, public.gifts, public.gift_attachments to authenticated;
grant select, insert on public.link_fetch_log to authenticated;

-- ─── Prywatny schowek na zdjęcia i paragony ───────────────────────────────────────────────
-- Ścieżka pliku zaczyna się od numeru listy: <list_id>/... – po nim baza sprawdza, czy mam dostęp.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gift-files', 'gift-files', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.can_access_gift_file(p_name text) returns boolean
language plpgsql stable security definer set search_path = public as $$
declare
  v_list uuid;
begin
  begin
    v_list := split_part(p_name, '/', 1)::uuid;
  exception when others then
    return false;
  end;
  -- Zdjęcie przypięte do prezentu: dostęp jak do prezentu (obdarowany go nie zobaczy)
  if exists (select 1 from public.gift_attachments a where a.storage_path = p_name) then
    return exists (
      select 1 from public.gift_attachments a join public.gifts g on g.id = a.gift_id
      where a.storage_path = p_name and public.can_access_recipient(g.recipient_id)
    );
  end if;
  if exists (select 1 from public.gifts g where g.image_path = p_name) then
    return exists (select 1 from public.gifts g where g.image_path = p_name and public.can_access_recipient(g.recipient_id));
  end if;
  -- Plik jeszcze nieprzypięty (właśnie wysyłany): wystarczy dostęp do listy
  return public.can_access_list(v_list);
end $$;
revoke all on function public.can_access_gift_file(text) from public, anon;
grant execute on function public.can_access_gift_file(text) to authenticated;

drop policy if exists "Schowek prezentów: odczyt" on storage.objects;
create policy "Schowek prezentów: odczyt" on storage.objects for select to authenticated
  using (bucket_id = 'gift-files' and public.can_access_gift_file(name));
drop policy if exists "Schowek prezentów: dodawanie" on storage.objects;
create policy "Schowek prezentów: dodawanie" on storage.objects for insert to authenticated
  with check (bucket_id = 'gift-files' and public.can_access_gift_file(name));
drop policy if exists "Schowek prezentów: usuwanie" on storage.objects;
create policy "Schowek prezentów: usuwanie" on storage.objects for delete to authenticated
  using (bucket_id = 'gift-files' and public.can_access_gift_file(name));

-- ─── Przeniesienie danych z pierwszej wersji ──────────────────────────────────────────────
do $$
begin
  if to_regclass('public.legacy_gift_people') is null then
    return;
  end if;

  insert into public.gift_lists (owner_id, name, occasion_type, event_date, is_default)
  select distinct p.user_id, 'Święta 2026', 'christmas', date '2026-12-24', true
  from public.legacy_gift_people p
  where not exists (select 1 from public.gift_lists l where l.owner_id = p.user_id and l.is_default and l.archived_at is null);

  insert into public.recipients (id, list_id, name, budget_grosze, created_at)
  select p.id, l.id, p.name, case when p.budget is null then null else round(p.budget * 100)::integer end, p.created_at
  from public.legacy_gift_people p
  join public.gift_lists l on l.owner_id = p.user_id and l.is_default and l.archived_at is null
  on conflict (id) do nothing;

  if to_regclass('public.legacy_gifts') is not null then
    insert into public.gifts (id, list_id, recipient_id, created_by, title, price_grosze, url, notes, status, created_at)
    select g.id, r.list_id, g.person_id, g.user_id, g.title,
           case when g.price is null then null else round(g.price * 100)::integer end,
           g.url, g.note,
           case g.status when 'kupione' then 'bought' when 'zapakowane' then 'wrapped' when 'wreczone' then 'given' else 'idea' end,
           g.created_at
    from public.legacy_gifts g
    join public.recipients r on r.id = g.person_id
    on conflict (id) do nothing;
    drop table public.legacy_gifts;
  end if;
  drop table public.legacy_gift_people;
end $$;

commit;
