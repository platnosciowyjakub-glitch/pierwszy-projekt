# Gviazdka

Spokojny planner świąteczny. Na razie: strona główna z zapisami przed premierą.

## Gdzie co zmieniać
- **Teksty strony:** `content/landing.ts`
- **Przełącznik premiery, adresy, ceny:** `config/site.ts`
- **Kolory, czcionki, zaokrąglenia:** `app/globals.css` (sekcja `@theme`)
- **Zapis adresów e-mail (miejsce na podłączenie usługi):** `lib/subscribers.ts`

## Uruchomienie na komputerze
```
npm install
npm run dev
```
Potem otwórz http://localhost:3000

## Wdrożenie
Vercel. Rodzaj projektu (Next.js) jest ustawiony w `vercel.json`, więc w panelu Vercela nie trzeba nic zmieniać.
