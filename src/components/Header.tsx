"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { IconMail, IconPhone } from "./icons";

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
  const megaWrapRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMegaOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleMegaBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!megaWrapRef.current?.contains(event.relatedTarget as Node)) {
      setMegaOpen(false);
    }
  }

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="container-wide flex h-20 items-center justify-between gap-2 md:h-24 xl:gap-4">
        <Link href="/" className="focus-ring shrink-0">
          <Image
            src="/logo-guy-monnet-full.png"
            alt="Guy Monnet & Fils SA — Transports, Terrassements, Génie-civil"
            width={900}
            height={310}
            priority
            className="h-14 w-auto md:h-16 xl:h-20"
          />
        </Link>

        <div
          ref={megaWrapRef}
          className="relative hidden lg:block"
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
          onBlur={handleMegaBlur}
        >
          <nav aria-label="Navigation principale" className="flex items-center">
            {navLinks.map((link) =>
              link.hasMega ? (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  onFocus={() => setMegaOpen(true)}
                  className="focus-ring whitespace-nowrap px-2.5 py-2 text-sm font-semibold uppercase tracking-wide text-ink hover:text-accent-ink xl:px-4"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onFocus={() => setMegaOpen(false)}
                  className="focus-ring whitespace-nowrap px-2.5 py-2 text-sm font-semibold uppercase tracking-wide text-ink hover:text-accent-ink xl:px-4"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {megaOpen ? (
            <div className="absolute left-1/2 top-full w-[min(760px,80vw)] -translate-x-1/2 animate-mega-in border border-line border-t-2 border-t-accent bg-paper p-6 shadow-xl">
              <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/`}
                    className="focus-ring group flex items-center gap-2.5 px-3 py-2.5 text-sm text-ink transition-colors duration-150 hover:bg-offwhite hover:text-accent-ink"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-accent transition-transform duration-150 group-hover:scale-125" />
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/services/"
                className="focus-ring mt-3 inline-block border-t border-line px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-accent-ink underline underline-offset-4"
              >
                Voir tous les services
              </Link>
            </div>
          ) : null}
        </div>

        <div className="hidden shrink-0 lg:flex">
          <a
            href={company.phone.officeHref}
            className="focus-ring flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink hover:text-accent-ink"
          >
            <IconPhone className="h-4 w-4" />
            {company.phone.office}
          </a>
        </div>

        <button
          type="button"
          className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
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
    </header>

    {/*
      Rendu en dehors de <header> par précaution : un ancêtre avec un filtre
      (backdrop-blur, transform...) crée un containing block pour les
      descendants en position fixed, ce qui casserait le positionnement de ce
      panneau par rapport au viewport (déjà rencontré avec l'ancien header en
      backdrop-blur). Le garder hors du header évite ce piège durablement.
    */}
    {mobileOpen ? (
      <div id="mobile-nav" className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-paper md:top-24 lg:hidden">
        <nav aria-label="Navigation mobile" className="animate-drawer-in container-wide flex flex-col py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring group flex items-center gap-3 border-b border-line py-4 font-display text-2xl font-semibold text-ink active:text-accent-ink"
            >
              <span className="h-2 w-2 shrink-0 bg-accent" />
              {link.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-4">
            <a href={company.phone.officeHref} className="focus-ring flex items-center gap-3 text-base font-semibold text-ink">
              <IconPhone className="h-5 w-5 shrink-0 text-accent-ink" />
              {company.phone.office}
            </a>
            <a href={`mailto:${company.email}`} className="focus-ring flex items-center gap-3 text-base font-semibold text-ink">
              <IconMail className="h-5 w-5 shrink-0 text-accent-ink" />
              {company.email}
            </a>
          </div>
        </nav>
      </div>
    ) : null}
    </>
  );
}
