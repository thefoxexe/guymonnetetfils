import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact | Guy Monnet & Fils SA",
  description:
    "Contactez Guy Monnet & Fils SA à Riddes pour votre projet de génie civil, terrassement, transport ou construction en Valais. Devis sur demande.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Contact", path: "/contact/" }]} />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
              Parlons de votre projet
            </h1>
            <p className="mt-6 max-w-content text-base leading-relaxed text-concrete">
              Décrivez-nous votre projet, nous revenons vers vous dans les meilleurs délais.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="h-fit space-y-8 border border-line bg-offwhite p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-ink">
                Guy Monnet &amp; Fils SA
              </p>
              <address className="mt-3 space-y-1 text-sm not-italic text-ink">
                <p>{company.address.street}</p>
                <p>
                  {company.address.postalCode} {company.address.city}
                </p>
                <p>{company.address.region}, {company.address.country}</p>
              </address>
              <p className="mt-2 text-xs text-concrete">
                TODO: vérifier adresse officielle avant mise en production
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink">Bureau</p>
              <a href={company.phone.officeHref} className="focus-ring mt-1 block text-sm text-ink hover:text-accent-ink">
                {company.phone.office}
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink">
                Frédéric Monnet
              </p>
              <a href={company.phone.fredericHref} className="focus-ring mt-1 block text-sm text-ink hover:text-accent-ink">
                {company.phone.frederic}
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink">E-mail</p>
              <a href={`mailto:${company.email}`} className="focus-ring mt-1 block text-sm text-ink hover:text-accent-ink">
                {company.email}
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink">Horaires</p>
              <p className="mt-1 text-sm text-concrete">
                {company.hours.label}
                <br />
                {company.hours.weekdays}
              </p>
              <p className="mt-1 text-xs text-concrete">TODO: VALIDATION CLIENT — horaires à confirmer</p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${company.address.street}, ${company.address.postalCode} ${company.address.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-block border border-ink px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink hover:bg-ink hover:text-paper"
            >
              Voir l&apos;itinéraire
            </a>
          </aside>
        </Container>
      </section>
    </>
  );
}
