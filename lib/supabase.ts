import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Połączenie z Supabase po stronie przeglądarki.
// Adres i klucz publiczny ustawia się w zmiennych środowiskowych (Vercel → Settings → Environment Variables):
//   NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
// Bez nich narzędzie pokazuje spokojną informację zamiast się psuć.

// Wklejony adres bywa z dopiskiem „/rest/v1/” albo ze spacją – obcinamy to, żeby zawsze zadziałał.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  if (!client) {
    try {
      client = createClient(url, key, {
        auth: {
          // Link z e-maila działa też, gdy otworzy się w innej przeglądarce niż ta, w której poproszono o link.
          flowType: "implicit",
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch {
      return null;
    }
  }
  return client;
}

export type GiftStatus = "pomysl" | "kupione" | "zapakowane" | "wreczone";

export type GiftPerson = { id: string; name: string; budget: number | null; created_at: string };

export type Gift = {
  id: string;
  person_id: string;
  title: string;
  url: string | null;
  price: number | null;
  status: GiftStatus;
  note: string | null;
  created_at: string;
};
