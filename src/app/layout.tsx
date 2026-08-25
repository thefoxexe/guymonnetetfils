import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileActions } from "@/components/StickyMobileActions";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, localBusinessJsonLd, websiteJsonLd, absoluteUrl } from "@/lib/seo";
import { company } from "@/data/company";

const displayFont = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Guy Monnet & Fils SA | Génie civil & terrassement en Valais",
    template: "%s",
  },
  description:
    "Guy Monnet & Fils SA, entreprise familiale valaisanne depuis 1980 : génie civil, terrassement, transport, maçonnerie et aménagements en Valais.",
  openGraph: {
    siteName: company.name,
    locale: "fr_CH",
    type: "website",
    url: absoluteUrl("/"),
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-body text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyMobileActions />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
