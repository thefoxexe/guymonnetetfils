import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
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
      <Breadcrumb items={[{ name: "Entreprise", path: "/entreprise/" }]} />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
              Une entreprise familiale ancrée en Valais depuis 1980
            </h1>
            <p className="mt-6 max-w-content text-base leading-relaxed text-concrete">
              {company.positioning}
            </p>
          </div>
          <PhotoPlaceholder label="Guy Monnet et son premier camion, archives de l'entreprise" aspect="wide" priority />
        </Container>
      </section>

      <section className="bg-offwhite py-16">
        <Container>
          <SectionHeading eyebrow="Notre histoire" title="De 1980 à aujourd'hui" />
          <div className="mt-12 max-w-3xl">
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
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Nos valeurs" title="Ce qui nous définit" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="border border-line bg-paper p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-offwhite py-16">
        <Container>
          <SectionHeading eyebrow="Une entreprise, une équipe" title="La vie de l'entreprise" />
          <p className="mt-4 max-w-content text-base leading-relaxed text-concrete">
            En 2020, Guy Monnet &amp; Fils SA a fêté ses 40 ans, à l&apos;occasion de
            l&apos;inauguration de son nouveau dépôt de Riddes. TODO: contenu client nécessaire
            pour enrichir cette section avec d&apos;autres moments marquants de la vie de
            l&apos;entreprise (photos, événements récents).
          </p>
        </Container>
      </section>

    </>
  );
}
