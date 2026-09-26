import "server-only";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

// Funkcje serwerowe działają „w imieniu” zalogowanej osoby: przeglądarka wysyła jej przepustkę (token),
// Supabase ją sprawdza, a wszystkie zapytania podlegają tym samym zasadom prywatności (RLS) co w przeglądarce.
export async function userFromRequest(req: Request): Promise<{ supabase: SupabaseClient; user: User } | null> {
  const token = req.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!token || !url || !key) return null;
  const supabase = createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return { supabase, user: data.user };
}

// Limit odczytów „Wklej link” i kopiowania zdjęć: 40 na godzinę na osobę
export const LINK_LIMIT_PER_HOUR = 40;

export async function takeLinkQuota(supabase: SupabaseClient) {
  const since = new Date(Date.now() - 3_600_000).toISOString();
  const { count, error } = await supabase.from("link_fetch_log").select("id", { count: "exact", head: true }).gte("created_at", since);
  if (error || (count ?? 0) >= LINK_LIMIT_PER_HOUR) return false;
  const { error: insertError } = await supabase.from("link_fetch_log").insert({});
  return !insertError;
}
