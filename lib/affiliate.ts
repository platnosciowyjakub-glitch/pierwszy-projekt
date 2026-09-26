import { affiliatePartners } from "@/config/affiliates";

// Jedyne miejsce, w którym zwykły link do sklepu może stać się linkiem partnerskim.
// Zwraca adres do otwarcia i informację, czy to link partnerski (wtedy oznaczamy go i dodajemy rel="sponsored").
export function affiliateUrl(raw: string): { href: string; sponsored: boolean } {
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    const partner = affiliatePartners.find((p) => p.hosts.some((h) => host === h || host.endsWith(`.${h}`)));
    if (partner) return { href: partner.build(url), sponsored: true };
    return { href: url.toString(), sponsored: false };
  } catch {
    return { href: raw, sponsored: false };
  }
}

export function linkRel(sponsored: boolean) {
  return sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer nofollow";
}
