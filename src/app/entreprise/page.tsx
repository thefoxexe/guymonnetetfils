import Link from "next/link";
import { BrandBand, companyBandItems } from "@/components/BrandBand";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { slots } from "@/lib/photos";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatGrid } from "@/components/StatGrid";
import { Timeline } from "@/components/Timeline";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guy Monnet & Fils SA | Entreprise familiale à Riddes",
  description:
    "Guy Monnet & Fils SA, entreprise familiale valaisanne depuis 1980 : de l'achat d'un premier camion à une SA active dans 11 domaines d'activité à Riddes.",
  path: "/entreprise/",
});

// Moyens de l'entreprise, repris des fiches des domaines d'activité.
const means = [
  { title: "Camions", description: "Camions tout-terrain, camions-grues de 24 à 28 m, remorque surbaissée et bennes multi-lift.", slug: "transport" },
  { title: "Pelles", description: "Pelles mécaniques pour le terrassement et pelles araignées pour les fortes pentes.", slug: "pelles-araignees" },
  { title: "Centre de Riddes", description: "Tri, criblage et revalorisation des matériaux de chantier.", slug: "revalorisation-materiaux" },
  { title: "Maçons", description: "Équipes de maçonnerie et de béton armé.", slug: "maconnerie" },
  { title: "Déneigement", description: "Routes communales de Riddes, La Tzoumaz et Isérables, et route cantonale.", slug: "deneigement" },
];

export default function EntreprisePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Entreprise", path: "/entreprise/" }]}
        eyebrow="Découvrir l'entreprise"
        title="Entreprise familiale depuis 1980"
        intro="Guy Monnet a fondé l'entreprise en 1980 avec un camion. Son fils Frédéric la dirige aujourd'hui, à Riddes."
        background={{ slot: slots.companyCover, label: "Guy Monnet et son premier camion (archives de l'entreprise)" }}
      />
      <BrandBand items={companyBandItems} />

      {/* EN CHIFFRES */}
      <section className="bg-offwhite">
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading title="En chiffres" />
          <StatGrid
            className="mt-8 sm:mt-12"
            highlight={3}
            stats={[
              { value: String(company.foundedYear), label: "Achat du premier camion par Guy Monnet" },
              { value: String(company.incorporatedYear), label: "Création de Guy Monnet & Fils SA" },
              { value: String(company.domainsCount), label: "Domaines d'activité" },
              { value: "40 ans", label: "Fêtés en 2020 avec l'inauguration du dépôt de Riddes" },
            ]}
          />
        </div>
      </section>

      {/* HISTOIRE */}
      <section>
        <div className="container-wide py-14 sm:py-20 lg:py-28">
          <SectionHeading title="De 1980 à aujourd'hui" />
          <div className="mt-8 sm:mt-12">
            <Timeline
              steps={[
                {
                  year: "1980",
                  title: "Premier camion de Guy Monnet",
                  description:
                    "Guy Monnet achète son premier camion et se lance dans le transport de matériaux en Valais.",
                },
                {
                  year: "Ensuite",
                  title: "Transport → terrassement → génie civil → construction",
                  description:
                    "L'entreprise développe progressivement le terrassement, le génie civil, la construction et d'autres domaines complémentaires.",
                },
                {
                  year: "2009",
                  title: "Création de Guy Monnet & Fils SA",
                  description:
                    "L'entreprise, initialement basée à Isérables, devient une société anonyme sous le nom de Guy Monnet & Fils SA.",
                },
                {
                  year: "Riddes",
                  title: "Installation et développement",
                  description: "L'entreprise s'installe et se développe à Riddes, où elle est aujourd'hui implantée.",
                },
                {
                  year: "Aujourd'hui",
                  title: `${company.domainsCount} domaines d'activité`,
                  description:
                    "Guy Monnet reste actif dans l'entreprise ; son fils Frédéric Monnet en assure aujourd'hui la direction générale.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* MOYENS : survol jaune aux couleurs du site (séance client) */}
      <section className="bg-offwhite">
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading title="Ce que nous avons" />
          <ul className="mt-8 sm:mt-12 grid grid-cols-1 border-l border-t border-line bg-paper sm:grid-cols-2 lg:grid-cols-5">
            {means.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80} className="border-b border-r border-line">
                <Link
                  href={`/services/${item.slug}/`}
                  className="focus-ring group flex h-full flex-col justify-between gap-4 p-5 transition-colors sm:min-h-[200px] sm:p-7 duration-300 ease-editorial hover:bg-accent"
                >
                  <span className="h-1 w-10 bg-accent transition-colors group-hover:bg-ink" aria-hidden="true" />
                  <span>
                    <span className="stretch-85 block font-display text-[24px] font-extrabold uppercase leading-none sm:text-[28px]">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-steel transition-colors group-hover:text-ink">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* VIE DE L'ENTREPRISE */}
      <section>
        <div className="container-wide flex flex-wrap gap-14 py-14 sm:py-20 lg:py-24">
          <Reveal className="min-w-0 flex-[1_1_420px]">
            <SectionHeading title="La vie de l'entreprise" />
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-steel">
              En 2020, Guy Monnet &amp; Fils SA a fêté ses 40 ans, à l&apos;occasion de
              l&apos;inauguration de son nouveau dépôt de Riddes.
            </p>
            <p className="mt-5 max-w-2xl border-l-4 border-accent bg-offwhite px-4 py-3 text-xs text-accent-ink">
              TODO: contenu client nécessaire pour compléter cette section (photos, événements
              récents).
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/equipe/" variant="dark">
                Rencontrer l&apos;équipe
              </Button>
              <Button href="/realisations/" variant="outline">
                Nos réalisations
              </Button>
            </div>
          </Reveal>
          <div className="grid min-w-0 flex-[1_1_420px] grid-cols-2 gap-3">
            <Photo slot={slots.companyDepot2020} label="Inauguration du dépôt de Riddes, 2020" aspect="square" />
            <Photo slot={slots.companyDepot} label="Le dépôt de Riddes aujourd'hui" aspect="square" />
          </div>
        </div>
      </section>

      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
