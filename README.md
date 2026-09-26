# Gviazdka

Spokojny planer świąteczny. Na razie: strona główna z zapisami przed premierą.

## Gdzie co zmieniać
- **Teksty strony:** `content/landing.ts` (słowa w `*gwiazdkach*` są w nagłówku wyróżnione)
- **Pakiety i ceny:** `config/pricing.ts`
- **Przełącznik premiery, adres e-mail kontaktowy, media społecznościowe:** `config/site.ts`
- **Kolory, czcionki, zaokrąglenia:** `app/globals.css` (sekcja `@theme`)
- **Zdjęcia:** `public/zdjecia/` (źródła i licencje w `docs/zdjecia.md`)
- **Zapis adresów e-mail (miejsce na podłączenie usługi):** `lib/subscribers.ts`

## Uruchomienie na komputerze
```
npm install
npm run dev
```
Potem otwórz http://localhost:3000

## Wdrożenie
Vercel. Rodzaj projektu (Next.js) jest ustawiony w `vercel.json`.
