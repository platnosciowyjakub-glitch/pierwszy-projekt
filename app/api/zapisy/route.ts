import { isValidEmail } from "@/lib/email";
import { saveSubscriber } from "@/lib/subscribers";

export async function POST(request: Request) {
  let body: { email?: unknown; consent?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Ukryte pole: człowiek go nie widzi, bot zwykle je wypełnia. Udajemy sukces i nic nie zapisujemy.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isValidEmail(email) || body.consent !== true) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  try {
    await saveSubscriber({ email, consentAt: new Date().toISOString() });
  } catch (error) {
    console.error("[zapisy] błąd zapisu", error);
    return Response.json({ ok: false, error: "server" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
