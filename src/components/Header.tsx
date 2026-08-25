"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/data/company";
import { services } from "@/data/services";

const navLinks = [
  { label: "Entreprise", href: "/entreprise/" },
  { label: "Services", href: "/services/", hasMega: true },
  { label: "Réalisations", href: "/realisations/" },
  { label: "Équipe", href: "/equipe/" },
  { label: "Contact", href: "/contact/" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="focus-ring font-display text-lg font-bold uppercase tracking-tight text-ink md:text-xl">
          Guy Monnet <span className="text-accent">&amp;</span> Fils
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.hasMega ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  href={link.href}
                  aria-expanded={megaOpen}
                  className="focus-ring px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink hover:text-accent"
                >
                  {link.label}
                </Link>
                {megaOpen ? (
                  <div className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 border border-line bg-paper p-8 shadow-xl">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}/`}
                          className="focus-ring group block border-b border-transparent pb-1 text-sm text-ink hover:border-accent hover:text-accent"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/services/"
                      className="focus-ring mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-accent underline underline-offset-4"
                    >
                      Voir tous les services
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink hover:text-accent"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={company.phone.officeHref} className="focus-ring text-sm font-semibold text-ink hover:text-accent">
            {company.phone.office}
          </a>
          <Link
            href="/contact/"
            className="focus-ring bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-paper hover:bg-[#a83e19]"
          >
            Demander un devis
          </Link>
        </div>

        <button
          type="button"
          className="focus-ring flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 bg-ink transition-transform duration-200 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 bg-ink transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-6 bg-ink transition-transform duration-200 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-nav" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden">
          <nav aria-label="Navigation mobile" className="container-wide flex flex-col gap-1 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring border-b border-line py-4 font-display text-2xl font-semibold text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href={company.phone.officeHref}
                className="focus-ring border border-ink px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-ink"
              >
                Appeler
              </a>
              <Link
                href="/contact/"
                className="focus-ring bg-accent px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-paper"
              >
                Devis
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
