// Polska odmiana po liczbie: [1, 2–4, 5+] → „1 pomysł”, „3 pomysły”, „5 pomysłów”.
const rules = new Intl.PluralRules("pl-PL");

export function plural(n: number, forms: readonly [string, string, string] | readonly string[]) {
  const rule = rules.select(n);
  return rule === "one" ? forms[0] : rule === "few" ? forms[1] : forms[2];
}

export function fill(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (m, key) => (key in values ? String(values[key]) : m));
}
