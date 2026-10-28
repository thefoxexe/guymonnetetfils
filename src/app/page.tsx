import Link from "next/link";
import { BrandBand, companyBandItems } from "@/components/BrandBand";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { ProjectGrid } from "@/components/ProjectCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { SectionHeading, SectionLabel } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { StatGrid } from "@/components/StatGrid";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { projectDomainNames } from "@/lib/domains";
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
      <PageHero
        eyebrow="Riddes, Valais · depuis 1980"
        title="Génie civil, terrassement et transport en Valais"
        intro="Entreprise familiale de Riddes, au service des particuliers, des entreprises et des communes."
        actions={
          <>
            <Button href="/contact/">Demander une offre</Button>
            <Button href="/services/" variant="outline">
              Nos domaines
            </Button>
          </>
        }
        background={{
          slot: slots.homeCover,
          label: "Grande photo d'accueil : un camion ou une machine Guy Monnet & Fils sur un chantier",
          position: "object-[center_62%]",
        }}
      />

      <BrandBand items={companyBandItems} />

      {/* L'ENTREPRISE EN BREF */}
      <section>
        <div className="container-wide flex flex-wrap gap-8 py-14 sm:gap-14 sm:py-20 lg:gap-16 lg:py-28">
          <Reveal className="flex min-w-0 flex-[999_1_520px] flex-col gap-5">
            <SectionLabel>L&apos;entreprise</SectionLabel>
            <p className="stretch-90 font-display text-[21px] font-semibold leading-[1.3] sm:text-[28px]">
              En 1980, Guy Monnet achète son premier camion. Aujourd&apos;hui, l&apos;entreprise
              familiale fait du transport, du terrassement, du génie civil et de la maçonnerie.
            </p>
            <div>
              <Button href="/entreprise/" variant="ghost">
                Découvrir l&apos;entreprise
              </Button>
            </div>
          </Reveal>
          <div className="min-w-0 flex-[1_1_320px] self-start">
            <StatGrid
              columns="grid-cols-2"
              highlight={3}
              stats={[
                { value: String(company.foundedYear), label: "Premier camion de Guy Monnet" },
                { value: String(company.incorporatedYear), label: "Création de Guy Monnet & Fils SA" },
                { value: String(company.domainsCount), label: "Domaines d'activité" },
                { value: "VS", label: "Riddes et tout le Valais" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* DOMAINES D'ACTIVITÉ */}
      <section className="bg-offwhite">
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading title={`Nos ${services.length} domaines d'activité`} />
          <div className="mt-8 sm:mt-12">
            <ServiceGrid services={services} />
          </div>
        </div>
      </section>

      {/* CHANTIER PHARE */}
      <section>
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading
            title="Des chantiers qui parlent pour nous"
            action={
              <Link href="/realisations/" className="focus-ring text-[15px] font-bold text-accent-ink hover:underline">
                Toutes les réalisations →
              </Link>
            }
          />
          <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
            <Link href={`/realisations/${featuredProject.slug}/`} className="focus-ring group relative block overflow-hidden">
              <Photo
                slot={slots.projectCover(featuredProject.slug)}
                label={featuredProject.heroImageLabel}
                aspect="video"
                  />
              {featuredProject.year ? (
                <span className="absolute bottom-0 left-0 bg-accent px-4 py-3 font-display text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink">
                  Réalisation · {featuredProject.year}
                </span>
              ) : null}
            </Link>
            <Reveal className="flex flex-col gap-5">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.12em] text-accent-ink">
                {projectDomainNames(featuredProject).join(" · ")} · {featuredProject.location}
              </p>
              <h3 className="stretch-75 font-display text-[34px] font-black uppercase leading-[0.9] sm:text-[48px]">
                {featuredProject.title}
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-steel sm:text-lg">{featuredProject.summary}</p>
              {featuredProject.stats ? (
                <dl className="mt-1 grid grid-cols-2 gap-[2px] border-2 border-ink bg-ink">
                  {featuredProject.stats.slice(0, 4).map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1.5 bg-paper p-4 sm:p-5">
                      <dt className="text-[13px] leading-snug text-steel">{stat.label}</dt>
                      <dd className="stretch-75 order-first font-display text-[28px] font-black leading-none text-ink sm:text-[34px]">
                        <CountUp value={stat.value} />
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
        <section className="bg-offwhite">
          <div className="container-wide py-14 sm:py-20 lg:py-24">
            <SectionHeading title="Autres chantiers" />
            <div className="mt-8 sm:mt-12">
              <ProjectGrid projects={otherProjects} />
            </div>
          </div>
        </section>
      ) : null}

      {/* ZONE D'INTERVENTION + ÉQUIPE */}
      <section>
        <div className="container-wide flex flex-wrap gap-10 py-14 sm:py-20 lg:py-24 lg:gap-16">
          <div className="min-w-0 flex-[999_1_560px]">
            <SectionHeading
              title="Où nous travaillons"
              description="Depuis Riddes, dans tout le Valais. Par exemple :"
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {localities.map((place) => (
                <li
                  key={place}
                  className="border-2 border-ink/15 bg-paper px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.06em] sm:px-4 sm:py-2 sm:text-sm"
                >
                  {place}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="flex min-w-0 flex-[1_1_300px] flex-col justify-between gap-4 self-start bg-accent p-6 text-ink sm:p-8">
            <p className="stretch-85 font-display text-[28px] font-extrabold uppercase leading-[0.95]">Notre équipe</p>
            <p className="text-[15px] leading-relaxed">
              Machinistes, chauffeurs, chefs d&apos;équipe, maçons et ouvriers de génie civil.
            </p>
            <div>
              <Button href="/equipe/" variant="dark">
                Voir l&apos;équipe
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
