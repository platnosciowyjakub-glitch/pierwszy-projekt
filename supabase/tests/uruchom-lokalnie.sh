#!/usr/bin/env bash
# Testy prywatności na świeżej, lokalnej bazie (dla programisty, nie dla Supabase).
# Użycie: PGHOST=/tmp PGPORT=5433 PGUSER=postgres bash supabase/tests/uruchom-lokalnie.sh
set -euo pipefail
export PGOPTIONS="-c client_min_messages=warning"
cd "$(dirname "$0")/../.."
DB=gviazdka_test
psql -q -c "drop database if exists $DB" -c "create database $DB"
run() { psql -q -v ON_ERROR_STOP=1 -d "$DB" -f "$1"; }
run supabase/tests/_atrapa_supabase.sql
run supabase/migrations/0001_prezenty.sql
# Stare dane testowe, żeby sprawdzić przenoszenie do nowej listy
psql -q -v ON_ERROR_STOP=1 -d "$DB" <<'SQL'
insert into auth.users (id, email) values ('00000000-0000-4000-8000-0000000000ff', 'stary@test');
insert into public.gift_people (id, user_id, name, budget) values ('40000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-0000000000ff', 'Mama', 200.50);
insert into public.gifts (user_id, person_id, title, price, status) values ('00000000-0000-4000-8000-0000000000ff', '40000000-0000-4000-8000-000000000001', 'Szalik', 79.99, 'kupione');
SQL
for f in supabase/migrations/000[23]_*.sql; do run "$f"; done
# Drugie uruchomienie migracji nie może niczego zepsuć
for f in supabase/migrations/000[23]_*.sql; do run "$f"; done
psql -q -v ON_ERROR_STOP=1 -d "$DB" -At <<'SQL'
select case when (select count(*) from public.gifts where title = 'Szalik' and price_grosze = 7999 and status = 'bought') = 1
             and (select budget_grosze from public.recipients where name = 'Mama') = 20050
             and to_regclass('public.legacy_gifts') is null
        then 'Przeniesienie danych: OK' else 'Przeniesienie danych: BŁĄD' end;
SQL
psql -q -v ON_ERROR_STOP=1 -d "$DB" -o /dev/null -f supabase/tests/rls_prezenty.sql
echo "Testy prywatności: OK"
# Dane przykładowe: działają i można je wgrać dwa razy
psql -q -d "$DB" -c "insert into auth.users (id, email) values ('00000000-0000-4000-8000-0000000000ee', 'wlasciciel@test')"
sed "s/TWOJ@EMAIL.PL/wlasciciel@test/" supabase/seed/prezenty_przyklad.sql | psql -q -v ON_ERROR_STOP=1 -d "$DB"
sed "s/TWOJ@EMAIL.PL/wlasciciel@test/" supabase/seed/prezenty_przyklad.sql | psql -q -v ON_ERROR_STOP=1 -d "$DB"
psql -q -v ON_ERROR_STOP=1 -d "$DB" -At -c "select 'Dane przykładowe: ' || count(*) || ' osób, ' || (select count(*) from public.gifts g join public.gift_lists l on l.id = g.list_id where l.name = 'Święta 2026 – przykład') || ' prezentów' from public.recipients r join public.gift_lists l on l.id = r.list_id where l.name = 'Święta 2026 – przykład'"
