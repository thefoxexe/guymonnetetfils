import type { Metadata } from "next";
import { company } from "@/data/company";

export function absoluteUrl(path: string): string {
  return new URL(path, company.siteUrl).toString();
}

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  imageLabel?: string;
}): Metadata {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: company.name,
      locale: "fr_CH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${company.siteUrl}/#organization`,
    name: company.name,
    url: company.siteUrl,
    logo: absoluteUrl("/logo-guy-monnet-full.png"),
    foundingDate: String(company.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: "CH",
    },
    telephone: company.phone.office,
    email: company.email,
  };
}

export function localBusinessJsonLd() {
  // TODO: contenu client nécessaire — remplacer par une photographie réelle
  // (chantier ou façade) une fois les images migrées depuis l'ancien site.
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${company.siteUrl}/#localbusiness`,
    name: company.name,
    image: absoluteUrl("/logo-guy-monnet-full.png"),
    url: company.siteUrl,
    telephone: company.phone.office,
    email: company.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: "CH",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Valais, Suisse",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "06:30",
        closes: "16:00",
      },
    ],
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${company.siteUrl}/#website`,
    url: company.siteUrl,
    name: company.name,
    inLanguage: "fr-CH",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: {
      "@id": `${company.siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Valais, Suisse",
    },
  };
}
