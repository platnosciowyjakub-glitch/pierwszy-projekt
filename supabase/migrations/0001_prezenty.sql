-- Gviazdka: tabele listy prezentów.
-- Uruchom raz w Supabase: SQL Editor → New query → wklej całość → Run.
-- Zasada bezpieczeństwa: każdy zalogowany widzi i zmienia WYŁĄCZNIE swoje dane (RLS).

-- Osoby, którym dajemy prezenty (z opcjonalnym budżetem)
create table if not exists public.gift_people (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  budget numeric(10, 2) check (budget >= 0),
  created_at timestamptz not null default now()
);

-- Prezenty dla tych osób
create table if not exists public.gifts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  person_id uuid not null references public.gift_people (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  url text check (url is null or url ~* '^https?://'),
  price numeric(10, 2) check (price >= 0),
  status text not null default 'pomysl' check (status in ('pomysl', 'kupione', 'zapakowane', 'wreczone')),
  note text check (note is null or char_length(note) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists gift_people_user_idx on public.gift_people (user_id);
create index if not exists gifts_user_idx on public.gifts (user_id);
create index if not exists gifts_person_idx on public.gifts (person_id);

alter table public.gift_people enable row level security;
alter table public.gifts enable row level security;

-- Osoby: tylko właściciel
drop policy if exists "Własne osoby: odczyt" on public.gift_people;
create policy "Własne osoby: odczyt" on public.gift_people
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Własne osoby: dodawanie" on public.gift_people;
create policy "Własne osoby: dodawanie" on public.gift_people
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Własne osoby: zmiana" on public.gift_people;
create policy "Własne osoby: zmiana" on public.gift_people
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Własne osoby: usuwanie" on public.gift_people;
create policy "Własne osoby: usuwanie" on public.gift_people
  for delete to authenticated using (auth.uid() = user_id);

-- Prezenty: tylko właściciel, i tylko dla własnych osób
drop policy if exists "Własne prezenty: odczyt" on public.gifts;
create policy "Własne prezenty: odczyt" on public.gifts
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Własne prezenty: dodawanie" on public.gifts;
create policy "Własne prezenty: dodawanie" on public.gifts
  for insert to authenticated with check (
    auth.uid() = user_id
    and exists (select 1 from public.gift_people p where p.id = person_id and p.user_id = auth.uid())
  );
drop policy if exists "Własne prezenty: zmiana" on public.gifts;
create policy "Własne prezenty: zmiana" on public.gifts
  for update to authenticated using (auth.uid() = user_id) with check (
    auth.uid() = user_id
    and exists (select 1 from public.gift_people p where p.id = person_id and p.user_id = auth.uid())
  );
drop policy if exists "Własne prezenty: usuwanie" on public.gifts;
create policy "Własne prezenty: usuwanie" on public.gifts
  for delete to authenticated using (auth.uid() = user_id);
