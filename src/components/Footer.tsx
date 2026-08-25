import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { IconInstagram, IconMail } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-concrete-light">
      <div className="container-wide grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-guy-monnet-transparent.png"
            alt="Guy Monnet & Fils SA — Transports, Terrassements, Génie-civil"
            width={900}
            height={310}
            className="h-14 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed">
            Entreprise familiale valaisanne active depuis 1980 en génie civil, terrassement,
            transport et construction.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {company.social.instagram ? (
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Guy Monnet & Fils SA sur Instagram"
                className="focus-ring flex h-9 w-9 items-center justify-center border border-white/20 text-concrete-light hover:border-accent hover:text-accent"
              >
                <IconInstagram className="h-4 w-4" />
              </a>
            ) : null}
            <a
              href={`mailto:${company.email}`}
              aria-label={`Envoyer un e-mail à ${company.email}`}
              className="focus-ring flex h-9 w-9 items-center justify-center border border-white/20 text-concrete-light hover:border-accent hover:text-accent"
            >
              <IconMail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-paper">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`} className="focus-ring hover:text-accent">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-paper">Entreprise</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/entreprise/" className="focus-ring hover:text-accent">
                Notre histoire
              </Link>
            </li>
            <li>
              <Link href="/realisations/" className="focus-ring hover:text-accent">
                Réalisations
              </Link>
            </li>
            <li>
              <Link href="/equipe/" className="focus-ring hover:text-accent">
                Équipe
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="focus-ring hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-paper">Contact</p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}, {company.address.region}
            </p>
            <p>
              <a href={company.phone.officeHref} className="focus-ring hover:text-accent">
                {company.phone.office}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="focus-ring hover:text-accent">
                {company.email}
              </a>
            </p>
            <p className="text-concrete">
              {company.hours.label}
              <br />
              {company.hours.weekdays}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-3 py-6 text-xs text-concrete sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Guy Monnet &amp; Fils SA — Riddes, Valais</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/mentions-legales/" className="focus-ring hover:text-accent">
              Mentions légales
            </Link>
            <Link href="/confidentialite/" className="focus-ring hover:text-accent">
              Confidentialité
            </Link>
            <span>
              Photos/vidéos :{" "}
              <a
                href="https://dronevalais-production.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring hover:text-accent"
              >
                {company.photoCredit}
              </a>
            </span>
          </div>
        </div>
        <div className="container-wide border-t border-white/10 py-4 text-center text-xs text-concrete">
          Réalisé avec ❤️ par{" "}
          <a
            href="https://webalp.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hover:text-accent"
          >
            WebAlp.ch
          </a>
        </div>
      </div>
    </footer>
  );
}
