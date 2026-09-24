// Tu trafiają zapisy z formularza.
//
// MIEJSCE NA PODŁĄCZENIE USŁUGI: na razie zapis jest tylko wypisywany w logach serwera
// (Vercel → projekt → Logs). Nic nie jest jeszcze trwale przechowywane.
// Gdy wybierzemy usługę (np. MailerLite, Resend, Supabase), zmienimy tylko tę funkcję.

export type Subscriber = { email: string; consentAt: string };

export async function saveSubscriber(subscriber: Subscriber): Promise<void> {
  console.info("[zapisy] nowy zapis:", subscriber.email, subscriber.consentAt);
}
