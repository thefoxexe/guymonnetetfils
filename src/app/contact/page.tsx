import { BrandBand } from "@/components/BrandBand";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionHeading";
import { IconPhone } from "@/components/icons";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact | Guy Monnet & Fils SA",
  description:
    "Contactez Guy Monnet & Fils SA à Riddes pour votre projet de génie civil, terrassement, transport ou construction en Valais. Devis sur demande.",
  path: "/contact/",
});

const phones = [
  { label: "Bureau", number: company.phone.office, href: company.phone.officeHref },
  { label: "Frédéric Monnet", number: company.phone.frederic, href: company.phone.fredericHref },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact/" }]}
        eyebrow="Contact"
        title="Contact"
        intro="Pour une offre ou une question, appelez le bureau ou écrivez-nous avec le formulaire."
      />
      <BrandBand items={[`Bureau ${company.phone.office}`, company.email, `${company.address.postalCode} ${company.address.city}`]} />

      <section>
        <div className="container-wide flex flex-wrap gap-14 py-20 sm:py-24 lg:gap-16">
          <div className="min-w-0 flex-[999_1_560px]">
            <SectionLabel index="01">Formulaire</SectionLabel>
            <h2 className="stretch-85 mt-3 font-display text-[32px] font-extrabold uppercase leading-[0.95] sm:text-[44px]">
              Écrivez-nous
            </h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="min-w-0 flex-[1_1_340px] self-start bg-ink text-paper lg:sticky lg:top-32">
            <p className="flex items-center justify-between px-7 pb-2 pt-7 font-display text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
              Nous joindre
              <span className="h-3.5 w-3.5 bg-accent" aria-hidden="true" />
            </p>
            <ul className="px-7">
              {phones.map((phone) => (
                <li key={phone.label} className="border-b border-white/15 py-4">
                  <a href={phone.href} className="focus-ring group flex items-center justify-between gap-4">
                    <span>
                      <span className="block text-sm text-mist">{phone.label}</span>
                      <span className="stretch-85 mt-1 block font-display text-[28px] font-extrabold leading-none group-hover:text-accent">
                        {phone.number}
                      </span>
                    </span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-ink" aria-hidden="true">
                      <IconPhone className="h-5 w-5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <dl className="space-y-5 px-7 py-6 text-[15px]">
              <div>
                <dt className="text-sm text-mist">E-mail</dt>
                <dd className="mt-1">
                  <a href={`mailto:${company.email}`} className="focus-ring font-semibold hover:text-accent">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mist">Adresse</dt>
                <dd className="mt-1 not-italic">
                  {company.name}
                  <br />
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}, {company.address.region}
                  <span className="mt-1 block text-xs text-accent">TODO: vérifier adresse officielle avant mise en production</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mist">Horaires</dt>
                <dd className="mt-1">
                  {company.hours.label}, {company.hours.weekdays}
                  <span className="mt-1 block text-xs text-accent">TODO: VALIDATION CLIENT : horaires à confirmer</span>
                </dd>
              </div>
            </dl>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${company.address.street}, ${company.address.postalCode} ${company.address.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center justify-between bg-accent px-7 py-4 text-[15px] font-bold text-ink transition-colors hover:bg-paper"
            >
              Voir l&apos;itinéraire <span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
