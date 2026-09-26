import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { landing } from "@/content/landing";
import { siteConfig } from "@/config/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  // Krój nagłówków doczytuje się chwilę później, żeby nie opóźniać pierwszego ekranu
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: landing.meta.title,
  description: landing.meta.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: siteConfig.name,
    title: landing.meta.title,
    description: landing.meta.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#FFFCF7",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: siteConfig.name,
  alternateName: ["Gwiazdka", "Gviazdka – planer świąteczny"],
  description: landing.meta.description,
  url: siteConfig.url,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  inLanguage: "pl-PL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
