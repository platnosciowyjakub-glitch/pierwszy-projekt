// Kwoty trzymamy w groszach (liczby całkowite), a pokazujemy po polsku: „129,99 zł”.

const pln = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
const plnRound = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 });

export function formatGrosze(grosze: number, { round = false } = {}) {
  const zl = grosze / 100;
  return (round || Number.isInteger(zl) ? plnRound : pln).format(zl);
}

// „129,99”, „129.99”, „1 299 zł”, „80zł” → grosze. Puste → null. Błędne → NaN.
export function parseToGrosze(text: string): number | null {
  const clean = text.trim().replace(/\s| /g, "").replace(/(zł|zl|pln)$/i, "").replace(",", ".");
  if (!clean) return null;
  if (!/^\d+(\.\d{1,2})?$/.test(clean)) return NaN;
  const grosze = Math.round(Number(clean) * 100);
  return grosze <= 100_000_000 ? grosze : NaN;
}

// Grosze → tekst do pola formularza: 12999 → „129,99”, 8000 → „80”
export function groszeToInput(grosze: number | null) {
  if (grosze === null) return "";
  const zl = grosze / 100;
  return Number.isInteger(zl) ? String(zl) : zl.toFixed(2).replace(".", ",");
}
