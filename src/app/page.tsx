import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Stats } from "@/components/Stats";
import { ServiceGrid } from "@/components/ServiceCard";
import { ProjectGrid } from "@/components/ProjectCard";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guy Monnet & Fils SA | Génie civil & terrassement en Valais",
  description:
    "Entreprise familiale valaisanne depuis 1980 : génie civil, terrassement, transport, maçonnerie et aménagements extérieurs à Riddes et dans tout le Valais.",
  path: "/",
});

export default function HomePage() {
  const featuredProject = projects.find((p) => p.featured) ?? projects[0]!;
  const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <PhotoPlaceholder
          label="Vue drone d'un chantier Guy Monnet & Fils en Valais"
          aspect="cinema"
          priority
          className="min-h-[560px]"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/20 to-transparent">
          <Container className="w-full pb-14 pt-24 text-paper">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              Construire. Transporter. Aménager.
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Génie civil, terrassement et transport en Valais
            </h1>
            <p className="mt-6 max-w-content text-base leading-relaxed text-concrete-light sm:text-lg">
              Depuis 1980, Guy Monnet &amp; Fils SA accompagne particuliers, entreprises et
              collectivités dans leurs projets de construction, d&apos;infrastructures, de
              transport et d&apos;aménagement en Valais.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/services/" variant="primary">
                Découvrir nos services
              </Button>
              <Button href="/contact/" variant="secondary" className="border-paper text-paper hover:bg-paper hover:text-ink">
                Parler de votre projet
              </Button>
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-concrete-light/80">
              Riddes · Valais · Depuis 1980
            </p>
          </Container>
        </div>
      </section>

      {/* PREUVES */}
      <section className="py-16">
        <Container>
          <Stats
            items={[
              { value: "1980", label: "Année de création" },
              { value: `${company.domainsCount}`, label: "Domaines d'activité" },
              { value: "Riddes", label: "Implantation actuelle" },
            ]}
          />
        </Container>
      </section>

      {/* INTRO ENTREPRISE */}
      <section className="py-16">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Depuis 1980" title="Plus de 40 ans sur le terrain." />
            <p className="mt-6 max-w-content text-base leading-relaxed text-concrete">
              De l&apos;achat d&apos;un premier camion par Guy Monnet en 1980 à une entreprise
              familiale reconnue dans le génie civil, le terrassement, le transport et la
              construction, Guy Monnet &amp; Fils SA a grandi au rythme des chantiers valaisans.
              Aujourd&apos;hui dirigée par Frédéric Monnet, l&apos;entreprise reste fidèle à son
              ancrage local et à sa connaissance du terrain.
            </p>
            <Button href="/entreprise/" variant="ghost" className="mt-6 px-0">
              Découvrir l&apos;entreprise
            </Button>
          </div>
          <PhotoPlaceholder label="Équipe Guy Monnet & Fils sur le dépôt de Riddes" aspect="square" />
        </Container>
      </section>

      {/* SERVICES */}
      <section className="bg-offwhite py-16">
        <Container>
          <SectionHeading
            eyebrow="Nos savoir-faire"
            title="11 domaines d'activité, une seule entreprise"
            description="Du transport de matériaux à la création de sentiers, Guy Monnet & Fils réunit les métiers nécessaires à la réalisation de chantiers complets en Valais."
          />
          <div className="mt-12">
            <ServiceGrid services={services} />
          </div>
        </Container>
      </section>

      {/* PROJET PHARE */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Chantier phare" title="Des chantiers qui parlent pour nous" />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <PhotoPlaceholder label={featuredProject.heroImageLabel} aspect="wide" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-ink">
                {featuredProject.location} · {featuredProject.year}
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold text-ink">
                {featuredProject.title}
              </h3>
              <p className="mt-4 max-w-content text-base leading-relaxed text-concrete">
                {featuredProject.summary}
              </p>
              {featuredProject.stats ? (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {featuredProject.stats.slice(0, 4).map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-2xl font-bold text-ink">{stat.value}</p>
                      <p className="text-xs text-concrete">{stat.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              <Button href={`/realisations/${featuredProject.slug}/`} variant="primary" className="mt-8">
                Découvrir le chantier
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <ProjectGrid projects={otherProjects} />
          </div>
        </Container>
      </section>

      {/* ZONE D'INTERVENTION */}
      <section className="bg-offwhite py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Zone d'intervention"
              title="Ancrés à Riddes, actifs dans tout le Valais"
            />
            <p className="mt-6 max-w-content text-base leading-relaxed text-concrete">
              Nos équipes interviennent depuis Riddes sur l&apos;ensemble du territoire valaisan,
              avec des références à La Tzoumaz, Isérables, Leytron, Ardon, Nendaz, Saxon,
              Chamoson, Saillon, Sion, Ovronnaz et Pont-de-la-Morge.
            </p>
            <Link
              href="/realisations/"
              className="focus-ring mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-accent-ink underline underline-offset-4"
            >
              Voir nos réalisations
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink">Équipe</p>
            <p className="mt-3 max-w-content text-base leading-relaxed text-concrete">
              Direction, machinistes, chauffeurs, chefs d&apos;équipe, maçons : une équipe qui
              réunit les métiers nécessaires à la réalisation de chantiers complets.
            </p>
            <Button href="/equipe/" variant="ghost" className="mt-4 px-0">
              Rencontrer l&apos;équipe
            </Button>
          </div>
        </Container>
      </section>

    </>
  );
}
