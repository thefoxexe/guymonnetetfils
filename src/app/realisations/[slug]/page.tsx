import { notFound } from "next/navigation";
import Link from "next/link";
import { BrandBand } from "@/components/BrandBand";
import { CtaBand } from "@/components/CtaBand";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, SectionLabel } from "@/components/SectionHeading";
import { StatGrid } from "@/components/StatGrid";
import { projects, getProjectBySlug } from "@/data/projects";
import { projectDomains } from "@/lib/domains";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { projectGallery, slots } from "@/lib/photos";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/realisations/${project.slug}/`,
  });
}

/**
 * Mosaïque : la première photo occupe 2×2 cases, les suivantes 1 case. La
 * dernière s'élargit si besoin pour que la dernière ligne soit toujours pleine
 * (grille de 2 colonnes en tablette, 3 en desktop).
 */
function mosaicSpan(index: number, count: number) {
  if (index === 0) return count === 1 ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-2 sm:row-span-2";
  if (index !== count - 1) return "";
  const sm = (count - 1) % 2 === 1 ? "sm:col-span-2" : "";
  const leftover = (count - 3) % 3;
  const lg = count === 2 ? "lg:col-span-1" : leftover === 1 ? "lg:col-span-3" : leftover === 2 ? "lg:col-span-2" : "lg:col-span-1";
  return `${sm} ${lg}`;
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length]!;
  const mobilizedServices = projectDomains(project);
  const categories = mobilizedServices.map((s) => s.name);
  const gallery = projectGallery(project.slug);

  const bandItems = project.highlights ?? [...categories, project.location, ...(project.year ? [project.year] : [])];

  // Mêmes rubriques que les fiches de référence papier de l'entreprise.
  const facts = [
    { label: "Lieu", value: project.location },
    { label: "Période d'exécution", value: project.period ?? project.year },
    { label: "Type de travaux", value: categories.join(", ") },
    { label: "Maître d'ouvrage", value: project.client },
    { label: "Direction des travaux", value: project.engineer },
    { label: "Montant des travaux", value: project.amount },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <>
      {/* 1. HERO */}
      <PageHero
        crumbs={[
          { name: "Réalisations", path: "/realisations/" },
          { name: project.title, path: `/realisations/${project.slug}/` },
        ]}
        tags={
          <div className="flex flex-wrap gap-2">
            {categories.map((label, i) => (
              <span
                key={label}
                className={`px-2.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.1em] sm:text-xs ${
                  i === 0 ? "bg-accent text-ink" : "border border-ink/25 text-ink"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        }
        title={project.title}
        intro={project.summary}
        meta={
          <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/15 pt-4">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.1em] text-steel">Lieu</dt>
              <dd className="mt-1 font-semibold">{project.location}</dd>
            </div>
            {project.period ?? project.year ? (
              <div>
                <dt className="text-[11px] uppercase tracking-[0.1em] text-steel">Période</dt>
                <dd className="mt-1 font-semibold">{project.period ?? project.year}</dd>
              </div>
            ) : null}
          </dl>
        }
        background={{ slot: slots.projectCover(project.slug), label: project.heroImageLabel }}
      />

      {/* 2. BANDEAU DE MARQUE */}
      <BrandBand items={bandItems} />

      {/* 3. CHIFFRES PHARES */}
      {project.stats && project.stats.length > 0 ? (
        <section>
          <div className="container-wide py-14 sm:py-20 lg:py-24">
            <SectionHeading
              title="Chiffres phares"
              action={
                project.period ? (
                  <p className="max-w-sm text-[15px] leading-relaxed text-steel">
                    Quantités mises en œuvre, {project.period.toLowerCase()}.
                  </p>
                ) : undefined
              }
            />
            <StatGrid stats={project.stats} className="mt-8 sm:mt-12" />
          </div>
        </section>
      ) : null}

      {/* 4. CONTEXTE + TRAVAUX + FICHE TECHNIQUE */}
      <section className="bg-offwhite">
        <div className="container-wide flex flex-wrap gap-10 py-14 sm:gap-14 sm:py-20 lg:gap-16 lg:py-28">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10 sm:gap-14">
            <Reveal className="flex flex-col gap-5">
              <SectionLabel>Le contexte</SectionLabel>
              {project.context.map((paragraph, i) =>
                i === 0 ? (
                  <p key={i} className="stretch-90 font-display text-[21px] font-semibold leading-[1.3] sm:text-[28px]">
                    {paragraph}
                  </p>
                ) : (
                  <p key={i} className="max-w-3xl text-[17px] leading-[1.7] text-steel sm:text-lg">
                    {paragraph}
                  </p>
                )
              )}
            </Reveal>
            <Reveal className="flex flex-col gap-6">
              <SectionLabel>Travaux réalisés</SectionLabel>
              <ol className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
                {project.works.map((work, i) => (
                  <Reveal as="li" key={work} delay={(i % 4) * 70} className="flex gap-4 border-t border-ink/10 py-3 text-[15px] leading-relaxed sm:py-4 sm:text-base">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-accent" aria-hidden="true" />
                    {work}
                  </Reveal>
                ))}
              </ol>
              {project.todo ? (
                <p className="border-l-4 border-accent bg-paper px-4 py-3 text-xs text-accent-ink">{project.todo}</p>
              ) : null}
            </Reveal>
          </div>

          <aside className="min-w-0 flex-[1_1_300px] self-start lg:sticky lg:top-32">
            <div className="border-2 border-ink bg-paper">
              <p className="flex items-center justify-between bg-ink px-5 py-3.5 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-paper">
                Fiche technique
                <span className="h-3.5 w-3.5 bg-accent" aria-hidden="true" />
              </p>
              <dl className="px-5 py-1">
                {facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className={`grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4 py-3.5 text-sm ${i < facts.length - 1 ? "border-b border-line" : ""}`}
                  >
                    <dt className="text-steel">{fact.label}</dt>
                    <dd className="text-right font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Link
              href="/contact/"
              className="focus-ring mt-4 flex items-center justify-between bg-accent px-6 py-4 text-[15px] font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Nous contacter <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* 5. GALERIE */}
      <section>
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading title="Photos du chantier" />
          {gallery.length > 0 ? (
            <div className="mt-8 sm:mt-12 grid auto-rows-[240px] grid-cols-1 gap-3 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3">
              {gallery.map((image, i) => (
                <Reveal
                  key={image.slot}
                  delay={(i % 3) * 60}
                  className={`group relative overflow-hidden bg-anthracite ${mosaicSpan(i, gallery.length)}`}
                >
                  <Photo
                    slot={image.slot}
                    label={`${project.title}, photo ${i + 1}`}
                    aspect="fill"
                    sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                    imageClassName="transition-transform duration-500 ease-editorial group-hover:scale-105"
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Photo
                  key={n}
                  slot={slots.projectGallery(project.slug, n)}
                  label={`${project.title}, photo ${n}`}
                  aspect="video"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. DOMAINES MOBILISÉS */}
      {mobilizedServices.length > 0 ? (
        <section className="bg-offwhite">
          <div className="container-wide py-14 sm:py-20 lg:py-24">
            <SectionHeading title="Domaines concernés" />
            <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {mobilizedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="focus-ring group flex flex-col border border-line bg-paper text-ink transition-colors hover:border-ink sm:min-h-[180px] sm:flex-row"
                >
                  <span className="relative h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[42%]">
                    <Photo
                      slot={slots.serviceCover(service.slug)}
                      label={service.heroImageLabel}
                      alt=""
                      aspect="fill"
                      sizes="240px"
                    />
                  </span>
                  <span className="flex min-w-0 flex-col justify-between gap-3 p-5 sm:p-6">
                    <span className="stretch-85 font-display text-[24px] font-extrabold uppercase leading-none">
                      {service.name}
                    </span>
                    <span className="text-[15px] leading-snug text-steel">{service.shortDescription}</span>
                    <span className="text-sm font-bold text-accent-ink">Découvrir →</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 7. RÉALISATION SUIVANTE */}
      {next.slug !== project.slug ? (
        <Link href={`/realisations/${next.slug}/`} className="focus-ring group block border-t border-line bg-paper text-ink">
          <span className="container-wide grid grid-cols-1 items-center gap-6 py-10 sm:grid-cols-[minmax(0,1fr)_280px] sm:py-14">
            <span className="flex flex-col gap-3">
              <span className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-accent-ink">
                Réalisation suivante
              </span>
              <span className="stretch-75 font-display text-[32px] font-black uppercase leading-[0.92] sm:text-[48px]">
                {next.title}{" "}
                <span className="inline-block text-accent-ink transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
              <span className="text-[15px] text-steel">
                {next.location}
                {next.year ? ` · ${next.year}` : ""}
              </span>
            </span>
            <span className="relative hidden aspect-[4/3] overflow-hidden sm:block">
              <Photo
                slot={slots.projectCover(next.slug)}
                label={next.heroImageLabel}
                alt=""
                aspect="fill"
                sizes="280px"
                imageClassName="transition-transform duration-500 ease-editorial group-hover:scale-105"
              />
            </span>
          </span>
        </Link>
      ) : null}

      {/* 8. APPEL À L'ACTION */}
      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
