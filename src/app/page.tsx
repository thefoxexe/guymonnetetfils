import Link from "next/link";
import { BrandBand, companyBandItems } from "@/components/BrandBand";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { ProjectGrid } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, SectionLabel } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { StatGrid } from "@/components/StatGrid";
import { ValaisFlag } from "@/components/ValaisFlag";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { projects, projectCategoryLabels } from "@/data/projects";
import { slots } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guy Monnet & Fils SA | Génie civil & terrassement en Valais",
  description:
    "Entreprise familiale valaisanne depuis 1980 : génie civil, terrassement, transport, maçonnerie et aménagements extérieurs à Riddes et dans tout le Valais.",
  path: "/",
});

const localities = [
  "Riddes",
  "Isérables",
  "La Tzoumaz",
  "Leytron",
  "Saxon",
  "Ardon",
  "Nendaz",
  "Chamoson",
  "Saillon",
  "Sion",
  "Ovronnaz",
  "Pont-de-la-Morge",
];

export default function HomePage() {
  const featuredProject = projects.find((p) => p.featured) ?? projects[0]!;
  const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[max(520px,calc(100dvh-5rem))] items-end overflow-hidden bg-ink text-paper md:min-h-[max(580px,calc(100dvh-6rem))]">
        <Photo
          slot={slots.homeCover}
          label="Grande photo d'accueil : un camion ou une machine Guy Monnet & Fils sur un chantier"
          aspect="fill"
          tone="dark"
          layout="corner"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        <div className="container-wide relative w-full pb-12 pt-24 sm:pb-20">
          <Reveal className="flex flex-col gap-6">
            <span className="self-start bg-accent px-3.5 py-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-ink sm:text-[13px]">
              Riddes, Valais · depuis 1980
            </span>
            <h1 className="stretch-75 max-w-4xl font-display text-[44px] font-black uppercase leading-[0.88] sm:text-[64px] lg:text-[84px]">
              Génie civil, terrassement et transport en Valais
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-concrete-light sm:text-xl">
              Entreprise familiale basée à Riddes. Nous travaillons pour les particuliers, les
              entreprises et les communes du Valais.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/services/">Nos domaines d&apos;activité</Button>
              <Button href="/contact/" variant="outline-light">
                Demander une offre
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <BrandBand items={companyBandItems} />

      {/* L'ENTREPRISE EN BREF */}
      <section>
        <div className="container-wide flex flex-wrap gap-14 py-20 sm:py-28 lg:gap-16">
          <Reveal className="flex min-w-0 flex-[999_1_520px] flex-col gap-6">
            <SectionLabel index="01">L&apos;entreprise</SectionLabel>
            <p className="stretch-90 font-display text-[26px] font-semibold leading-[1.28] sm:text-[34px]">
              En 1980, Guy Monnet achète son premier camion. Aujourd&apos;hui, l&apos;entreprise
              familiale fait du transport, du terrassement, du génie civil et de la maçonnerie.
            </p>
            <p className="max-w-3xl text-[17px] leading-[1.7] text-steel sm:text-lg">
              D&apos;abord installée à Isérables, l&apos;entreprise est aujourd&apos;hui à Riddes.
              Elle travaille sur des chantiers privés et publics dans toute la région, avec ses
              propres machines, ses camions et ses équipes.
            </p>
            <div>
              <Button href="/entreprise/" variant="ghost">
                Découvrir l&apos;entreprise
              </Button>
            </div>
          </Reveal>
          <div className="min-w-0 flex-[1_1_380px] self-start">
            <StatGrid
              columns="grid-cols-2"
              highlight={3}
              stats={[
                { value: String(company.foundedYear), label: "Premier camion de Guy Monnet" },
                { value: String(company.incorporatedYear), label: "Création de Guy Monnet & Fils SA" },
                { value: String(company.domainsCount), label: "Domaines d'activité" },
                {
                  value: "VS",
                  label: "Riddes et tout le Valais",
                  backdrop: <ValaisFlag className="h-full w-full" />,
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* DOMAINES D'ACTIVITÉ */}
      <section className="bg-offwhite">
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading index="02" eyebrow="Domaines d'activité" title={`Nos ${services.length} domaines d'activité`} />
          <div className="mt-12">
            <ServiceGrid services={services} />
          </div>
        </div>
      </section>

      {/* CHANTIER PHARE */}
      <section className="bg-ink text-paper">
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading
            index="03"
            eyebrow="Réalisations"
            title="Des chantiers qui parlent pour nous"
            tone="dark"
            action={
              <Link href="/realisations/" className="focus-ring text-[15px] font-bold text-accent hover:underline">
                Toutes les réalisations →
              </Link>
            }
          />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
            <Link href={`/realisations/${featuredProject.slug}/`} className="focus-ring group relative block overflow-hidden">
              <Photo
                slot={slots.projectCover(featuredProject.slug)}
                label={featuredProject.heroImageLabel}
                aspect="video"
                tone="dark"
              />
              {featuredProject.year ? (
                <span className="absolute bottom-0 left-0 bg-accent px-4 py-3 font-display text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink">
                  Réalisation · {featuredProject.year}
                </span>
              ) : null}
            </Link>
            <Reveal className="flex flex-col gap-5">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
                {featuredProject.categories.map((c) => projectCategoryLabels[c]).join(" · ")} · {featuredProject.location}
              </p>
              <h3 className="stretch-75 font-display text-[44px] font-black uppercase leading-[0.9] sm:text-[56px]">
                {featuredProject.title}
              </h3>
              <p className="max-w-xl text-lg leading-relaxed text-concrete-light">{featuredProject.summary}</p>
              {featuredProject.stats ? (
                <dl className="mt-2 grid grid-cols-2 gap-px border border-white/15 bg-white/15">
                  {featuredProject.stats.slice(0, 4).map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1.5 bg-ink p-5">
                      <dt className="text-[13px] leading-snug text-mist">{stat.label}</dt>
                      <dd className="stretch-75 order-first font-display text-[36px] font-black leading-none text-paper">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <div className="mt-2">
                <Button href={`/realisations/${featuredProject.slug}/`}>Voir le chantier</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AUTRES RÉALISATIONS */}
      {otherProjects.length > 0 ? (
        <section>
          <div className="container-wide py-20 sm:py-24">
            <SectionHeading index="04" eyebrow="Réalisations" title="Autres chantiers" />
            <div className="mt-12">
              <ProjectGrid projects={otherProjects} />
            </div>
          </div>
        </section>
      ) : null}

      {/* ZONE D'INTERVENTION + ÉQUIPE */}
      <section className="bg-offwhite">
        <div className="container-wide flex flex-wrap gap-14 py-20 sm:py-24 lg:gap-16">
          <div className="min-w-0 flex-[999_1_560px]">
            <SectionHeading
              index="05"
              eyebrow="Zone d'intervention"
              title="Où nous travaillons"
              description="Nous intervenons depuis Riddes dans tout le Valais. Quelques communes où nous avons déjà travaillé :"
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {localities.map((place) => (
                <li
                  key={place}
                  className="border-2 border-ink/15 bg-paper px-4 py-2 font-display text-sm font-extrabold uppercase tracking-[0.06em]"
                >
                  {place}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="flex min-w-0 flex-[1_1_320px] flex-col justify-between gap-6 self-start bg-ink p-8 text-paper">
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-accent">L&apos;équipe</p>
            <p className="stretch-85 font-display text-[30px] font-extrabold uppercase leading-[0.95]">Notre équipe</p>
            <p className="text-[15px] leading-relaxed text-concrete-light">
              Machinistes, chauffeurs, chefs d&apos;équipe, maçons et ouvriers de génie civil.
            </p>
            <div>
              <Button href="/equipe/">Voir l&apos;équipe</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
