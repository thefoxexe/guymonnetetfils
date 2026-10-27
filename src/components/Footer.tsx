import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { IconInstagram, IconMail } from "./icons";

const titleClass = "font-display text-sm font-extrabold uppercase tracking-[0.14em] text-accent";
const linkClass = "focus-ring hover:text-accent";

export function Footer() {
  return (
    <footer className="bg-ink text-concrete-light">
      <div className="brand-stripe" aria-hidden="true" />
      <div className="container-wide grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.1fr]">
        <div>
          <Image
            src="/logo-guy-monnet-officiel-transparent.png"
            alt="Guy Monnet & Fils SA, transports, terrassements, génie civil"
            width={825}
            height={263}
            className="h-20 w-auto"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Transports, terrassements et génie civil à Riddes depuis 1980.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {company.social.instagram ? (
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Guy Monnet & Fils SA sur Instagram"
                className="focus-ring flex h-11 w-11 items-center justify-center border border-white/25 text-concrete-light transition-colors hover:border-accent hover:bg-accent hover:text-ink"
              >
                <IconInstagram className="h-5 w-5" />
              </a>
            ) : null}
            <a
              href={`mailto:${company.email}`}
              aria-label={`Envoyer un e-mail à ${company.email}`}
              className="focus-ring flex h-11 w-11 items-center justify-center border border-white/25 text-concrete-light transition-colors hover:border-accent hover:bg-accent hover:text-ink"
            >
              <IconMail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <p className={titleClass}>Domaines d&apos;activité</p>
          <ul className="mt-5 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={titleClass}>Entreprise</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <Link href="/entreprise/" className={linkClass}>
                Découvrir l&apos;entreprise
              </Link>
            </li>
            <li>
              <Link href="/realisations/" className={linkClass}>
                Réalisations
              </Link>
            </li>
            <li>
              <Link href="/equipe/" className={linkClass}>
                Équipe
              </Link>
            </li>
            <li>
              <Link href="/contact/" className={linkClass}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className={titleClass}>Contact</p>
          <address className="mt-5 space-y-4 text-sm not-italic">
            <p>
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}, {company.address.region}
            </p>
            <dl className="space-y-2">
              <div className="flex flex-wrap justify-between gap-x-4 border-b border-white/10 pb-2">
                <dt className="text-mist">Bureau</dt>
                <dd>
                  <a href={company.phone.officeHref} className={`${linkClass} font-semibold text-paper`}>
                    {company.phone.office}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 border-b border-white/10 pb-2">
                <dt className="text-mist">Frédéric Monnet</dt>
                <dd>
                  <a href={company.phone.fredericHref} className={`${linkClass} font-semibold text-paper`}>
                    {company.phone.frederic}
                  </a>
                </dd>
              </div>
            </dl>
            <p>
              <a href={`mailto:${company.email}`} className={linkClass}>
                {company.email}
              </a>
            </p>
            <p className="text-mist">
              {company.hours.label}, {company.hours.weekdays}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-3 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Guy Monnet &amp; Fils SA, Riddes</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/mentions-legales/" className={linkClass}>
              Mentions légales
            </Link>
            <Link href="/confidentialite/" className={linkClass}>
              Confidentialité
            </Link>
            <span>
              Photos/vidéos :{" "}
              <a
                href="https://dronevalais-production.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {company.photoCredit}
              </a>
            </span>
          </div>
        </div>
        <div className="container-wide border-t border-white/10 py-4 text-center text-xs text-mist">
          Réalisé avec ❤️ par{" "}
          <a href="https://webalp.ch/" target="_blank" rel="noopener noreferrer" className={linkClass}>
            WebAlp.ch
          </a>
        </div>
      </div>
    </footer>
  );
}
