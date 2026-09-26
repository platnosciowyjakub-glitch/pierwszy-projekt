// Sklepy partnerskie (programy afiliacyjne). Na razie pusto – żaden link nie jest zamieniany.
// Gdy dołączymy do programu, dopisujemy tu sklep: jego domeny i sposób budowania linku partnerskiego.
// Link partnerski zawsze jest oznaczony w aplikacji jako „Link partnerski” (wymóg prawny).

export type AffiliatePartner = {
  name: string;
  hosts: string[]; // np. ["empik.com", "www.empik.com"]
  build: (url: URL) => string; // zamienia zwykły link na partnerski
};

export const affiliatePartners: AffiliatePartner[] = [];
