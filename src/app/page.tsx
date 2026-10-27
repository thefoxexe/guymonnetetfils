import Link from "next/link";
import Image from "next/image";
import { BrandBand, companyBandItems } from "@/components/BrandBand";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { ProjectGrid } from "@/components/ProjectCard";
import { ProjectImage } from "@/components/ProjectImage";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, SectionLabel } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { StatGrid } from "@/components/StatGrid";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { projects, projectCategoryLabels } from "@/data/projects";
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
  "Ardon",
  "Nendaz",
  "Saxon",
  "Chamoson",
  "Saillon",
  "Sion",
  "Ovronnaz",
  "Pont-de-la-Morge",
];

export default function HomePage() {
  const featuredProject = projects.find((p) => p.featured) ?? projects[0]!;
  const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[max(560px,calc(100dvh-5rem))] items-end overflow-hidden bg-ink text-paper md:min-h-[max(620px,calc(100dvh-6rem))]">
        <Image
          src="/images/hero-camion-guy-monnet-transports-valais-01.webp"
          alt="Camion-grue Guy Monnet & Fils SA en intervention en Valais"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[10%_65%] sm:object-[30%_55%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        <div className="container-wide relative w-full pb-12 pt-24 sm:pb-20">
          <Reveal className="flex flex-col gap-6">
            <span className="self-start bg-accent px-3.5 py-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-ink sm:text-[13px]">
              Construire · Transporter · Aménager
            </span>
            <h1 className="stretch-75 max-w-5xl font-display text-[52px] font-black uppercase leading-[0.86] sm:text-[88px] lg:text-[120px]">
              Génie civil, terrassement &amp; transport en Valais
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-concrete-light sm:text-xl">
              Depuis 1980, Guy Monnet &amp; Fils SA accompagne particuliers, entreprises et
              collectivités dans leurs projets de construction, d&apos;infrastructures, de
              transport et d&apos;aménagement en Valais.
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
            <SectionLabel index="01">Depuis 1980</SectionLabel>
            <p className="stretch-90 font-display text-[26px] font-semibold leading-[1.28] sm:text-[34px]">
              De l&apos;achat d&apos;un premier camion par Guy Monnet en 1980 à une entreprise
              familiale active dans le transport, le génie civil et la construction.
            </p>
            <p className="max-w-3xl text-[17px] leading-[1.7] text-steel sm:text-lg">
              Basée à Riddes et historiquement implantée à Isérables, l&apos;entreprise intervient
              sur des projets privés et publics dans toute la région. Grâce à une équipe
              expérimentée et à un parc de machines et véhicules adaptés aux travaux les plus
              variés, elle intervient aussi bien sur des chantiers traditionnels que sur des
              terrains complexes. Disponibilité, efficacité et proximité restent au centre de sa
              manière de travailler.
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
                { value: "VS", label: "Riddes, Isérables, La Tzoumaz et tout le Valais" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* DOMAINES D'ACTIVITÉ */}
      <section className="bg-offwhite">
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading
            index="02"
            eyebrow="Nos savoir-faire"
            title={`${services.length} domaines d'activité, une seule entreprise`}
            description="Du transport de matériaux à la création de sentiers, Guy Monnet & Fils réunit les métiers nécessaires à la réalisation de chantiers complets en Valais."
          />
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
            eyebrow="Chantier phare"
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
              <ProjectImage project={featuredProject} aspect="video" />
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
              <h3 className="stretch-75 font-display text-[52px] font-black uppercase leading-[0.9] sm:text-[72px]">
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
                <Button href={`/realisations/${featuredProject.slug}/`}>Découvrir le chantier</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AUTRES RÉALISATIONS */}
      {otherProjects.length > 0 ? (
        <section>
          <div className="container-wide py-20 sm:py-24">
            <SectionHeading index="04" eyebrow="Réalisations" title="D'autres chantiers" />
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
              title="Ancrés à Riddes, actifs dans tout le Valais"
              description="Nos équipes interviennent depuis Riddes sur l'ensemble du territoire valaisan. Quelques communes où nous avons déjà travaillé :"
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
            <p className="stretch-85 font-display text-[30px] font-extrabold uppercase leading-[0.95]">
              Une équipe, plusieurs métiers
            </p>
            <p className="text-[15px] leading-relaxed text-concrete-light">
              Direction, machinistes, chauffeurs, chefs d&apos;équipe, maçons : une équipe qui
              réunit les métiers nécessaires à la réalisation de chantiers complets.
            </p>
            <div>
              <Button href="/equipe/">Rencontrer l&apos;équipe</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Un projet de chantier en Valais ?" kicker="Parlons-en" />
    </>
  );
}
