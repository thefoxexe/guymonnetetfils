import { BrandBand, companyBandItems } from "@/components/BrandBand";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
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

const values = [
  {
    title: "Expérience",
    description: "Plus de quatre décennies de présence sur le terrain valaisan.",
  },
  {
    title: "Polyvalence",
    description: "Plusieurs métiers complémentaires réunis au sein d'une même entreprise.",
  },
  {
    title: "Réactivité",
    description: "Capacité d'intervention, notamment face aux conditions naturelles et hivernales.",
  },
  {
    title: "Proximité",
    description: "Entreprise familiale implantée localement, à l'écoute de ses clients.",
  },
  {
    title: "Terrain",
    description: "Une connaissance fine du contexte et des contraintes du Valais.",
  },
];

export default function EntreprisePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Entreprise", path: "/entreprise/" }]}
        eyebrow="Découvrir l'entreprise"
        title="Une entreprise familiale ancrée en Valais depuis 1980"
        intro={company.positioning}
        aside={<PhotoPlaceholder label="Guy Monnet et son premier camion, archives de l'entreprise" tone="dark" aspect="fill" />}
      />
      <BrandBand items={companyBandItems} />

      {/* EN CHIFFRES */}
      <section className="bg-offwhite">
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading index="01" eyebrow="En chiffres" title="Guy Monnet & Fils en bref" />
          <StatGrid
            className="mt-12"
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
        <div className="container-wide py-20 sm:py-28">
          <SectionHeading index="02" eyebrow="Notre histoire" title="De 1980 à aujourd'hui" />
          <div className="mt-12">
            <Timeline
              steps={[
                {
                  year: "1980",
                  title: "Premier camion de Guy Monnet",
                  description:
                    "Guy Monnet achète son premier camion et se lance dans le transport de matériaux en Valais.",
                },
                {
                  year: "Développement",
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

      {/* VALEURS — survol jaune aux couleurs du site (séance client) */}
      <section className="bg-ink text-paper">
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading index="03" eyebrow="Nos valeurs" title="Ce qui nous définit" tone="dark" />
          <ul className="mt-12 grid grid-cols-1 border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, index) => (
              <li
                key={value.title}
                className="group flex min-h-[220px] flex-col justify-between gap-6 border-b border-r border-white/15 p-7 transition-colors duration-300 ease-editorial hover:bg-accent"
              >
                <span className="font-display text-sm font-extrabold text-accent transition-colors group-hover:text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="stretch-85 block font-display text-[28px] font-extrabold uppercase leading-none transition-colors group-hover:text-ink">
                    {value.title}
                  </span>
                  <span className="mt-3 block text-[15px] leading-relaxed text-concrete-light transition-colors group-hover:text-ink">
                    {value.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VIE DE L'ENTREPRISE */}
      <section>
        <div className="container-wide flex flex-wrap gap-14 py-20 sm:py-24">
          <Reveal className="min-w-0 flex-[1_1_420px]">
            <SectionHeading index="04" eyebrow="Une entreprise, une équipe" title="La vie de l'entreprise" />
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-steel">
              En 2020, Guy Monnet &amp; Fils SA a fêté ses 40 ans, à l&apos;occasion de
              l&apos;inauguration de son nouveau dépôt de Riddes.
            </p>
            <p className="mt-5 max-w-2xl border-l-4 border-accent bg-offwhite px-4 py-3 text-xs text-accent-ink">
              TODO: contenu client nécessaire pour enrichir cette section avec d&apos;autres
              moments marquants de la vie de l&apos;entreprise (photos, événements récents).
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
            <PhotoPlaceholder label="Inauguration du dépôt de Riddes, 2020" aspect="square" />
            <PhotoPlaceholder label="Le dépôt de Riddes aujourd'hui" aspect="square" />
          </div>
        </div>
      </section>

      <CtaBand title="Travaillons ensemble" kicker="Une entreprise familiale à votre écoute" />
    </>
  );
}
