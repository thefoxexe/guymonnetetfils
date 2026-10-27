import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandBand } from "@/components/BrandBand";
import { CtaBand } from "@/components/CtaBand";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, SectionLabel, sectionCounter } from "@/components/SectionHeading";
import { StatGrid } from "@/components/StatGrid";
import { projects, getProjectBySlug, projectCategoryLabels } from "@/data/projects";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

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
  const mobilizedServices = services.filter((s) => project.services.includes(s.slug));
  const categories = project.categories.map((c) => projectCategoryLabels[c]);
  const gallery = project.gallery ?? [];
  const n = sectionCounter();

  const bandItems = project.highlights ?? [...categories, project.location, ...(project.year ? [project.year] : [])];

  const facts = [
    { label: "Lieu", value: project.location },
    { label: "Période", value: project.period ?? project.year },
    { label: "Maître d'ouvrage", value: project.client },
    { label: "Mandataire / ingénieur", value: project.engineer },
    { label: "Domaines", value: mobilizedServices.map((s) => s.name).join(", ") || categories.join(", ") },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <>
      {/* 1. HERO */}
      <section className="bg-ink text-paper">
        <div className="container-wide flex flex-wrap items-stretch">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col justify-between gap-12 py-14 sm:py-20 lg:pr-14">
            <div className="flex flex-col gap-7">
              <Breadcrumb
                items={[
                  { name: "Réalisations", path: "/realisations/" },
                  { name: project.title, path: `/realisations/${project.slug}/` },
                ]}
              />
              <Reveal className="flex flex-col gap-7">
                <div className="flex flex-wrap gap-2">
                  {categories.map((label, i) => (
                    <span
                      key={label}
                      className={`px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.1em] ${
                        i === 0 ? "bg-accent text-ink" : "border border-white/30 text-paper"
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <h1 className="stretch-75 font-display text-[56px] font-black uppercase leading-[0.88] [text-wrap:balance] sm:text-[80px] lg:text-[104px]">
                  {project.title}
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-concrete-light sm:text-xl">{project.summary}</p>
              </Reveal>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-white/15 pt-7 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-mist">Lieu</dt>
                <dd className="mt-1.5 text-[17px] font-semibold">{project.location}</dd>
              </div>
              {project.period ?? project.year ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-mist">Période</dt>
                  <dd className="mt-1.5 text-[17px] font-semibold">{project.period ?? project.year}</dd>
                </div>
              ) : null}
              {project.client ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-mist">Maître d&apos;ouvrage</dt>
                  <dd className="mt-1.5 text-[17px] font-semibold">{project.client}</dd>
                </div>
              ) : null}
            </dl>
          </div>
          <div className="relative -mx-5 min-h-[360px] min-w-0 flex-[1_1_440px] sm:min-h-[480px] md:-mx-10 lg:mx-0 lg:-mr-10 lg:min-h-[600px]">
            {project.heroImage ? (
              <Image
                src={project.heroImage}
                alt={project.heroImageLabel}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover ${project.imagePosition ?? "object-center"}`}
              />
            ) : (
              <div className="absolute inset-0">
                <PhotoPlaceholder label={project.heroImageLabel} tone="dark" aspect="fill" />
              </div>
            )}
            {project.year ? (
              <span className="absolute bottom-0 left-0 bg-accent px-4 py-3 font-display text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink">
                Réalisation · {project.year}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      {/* 2. BANDEAU DE MARQUE */}
      <BrandBand items={bandItems} />

      {/* 3. CHIFFRES PHARES */}
      {project.stats && project.stats.length > 0 ? (
        <section className="bg-offwhite">
          <div className="container-wide py-20 sm:py-24">
            <SectionHeading
              eyebrow="Le chantier en chiffres"
              title="Chiffres phares"
              action={
                project.period ? (
                  <p className="max-w-sm text-[15px] leading-relaxed text-steel">
                    Quantités mises en œuvre par nos équipes ({project.period.toLowerCase()}).
                  </p>
                ) : undefined
              }
            />
            <StatGrid stats={project.stats} className="mt-12" />
          </div>
        </section>
      ) : null}

      {/* 4. CONTEXTE + TRAVAUX + FICHE TECHNIQUE */}
      <section>
        <div className="container-wide flex flex-wrap gap-14 py-20 sm:py-28 lg:gap-16">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-14">
            <Reveal className="flex flex-col gap-5">
              <SectionLabel index={n()}>Le contexte</SectionLabel>
              {project.context.map((paragraph, i) =>
                i === 0 ? (
                  <p key={i} className="stretch-90 font-display text-[24px] font-semibold leading-[1.3] sm:text-[32px]">
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
              <SectionLabel index={n()}>Travaux réalisés</SectionLabel>
              <ol className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
                {project.works.map((work, i) => (
                  <li key={work} className="flex gap-4 border-t border-line py-4 text-base leading-relaxed">
                    <span className="min-w-[28px] font-display font-extrabold text-accent-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {work}
                  </li>
                ))}
              </ol>
              {project.todo ? (
                <p className="border-l-4 border-accent bg-offwhite px-4 py-3 text-xs text-accent-ink">{project.todo}</p>
              ) : null}
            </Reveal>
          </div>

          <aside className="min-w-0 flex-[1_1_320px] self-start lg:sticky lg:top-32">
            <div className="border-2 border-ink">
              <p className="flex items-center justify-between bg-ink px-6 py-4 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-paper">
                Fiche technique
                <span className="h-3.5 w-3.5 bg-accent" aria-hidden="true" />
              </p>
              <dl className="px-6 py-2">
                {facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className={`flex justify-between gap-4 py-3.5 text-sm ${i < facts.length - 1 ? "border-b border-line" : ""}`}
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
              Un projet similaire ? Contactez-nous <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* 5. GALERIE */}
      <section className="bg-ink text-paper">
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading
            index={n()}
            eyebrow="En images"
            title="Le chantier, étape par étape"
            tone="dark"
            action={
              gallery.length > 0 ? <span className="text-[15px] text-mist">{gallery.length} photos</span> : undefined
            }
          />
          {gallery.length > 0 ? (
            <div className="mt-12 grid auto-rows-[240px] grid-cols-1 gap-3 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3">
              {gallery.map((image, i) => (
                <Reveal
                  key={image.src}
                  delay={(i % 3) * 60}
                  className={`group relative overflow-hidden bg-anthracite ${mosaicSpan(i, gallery.length)}`}
                >
                  <figure className="h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                      className={`object-cover transition-transform duration-500 ease-editorial group-hover:scale-105 ${
                        image.imagePosition ?? "object-center"
                      }`}
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-5 pb-4 pt-12 text-sm leading-snug">
                      <span className="line-clamp-2">
                        <b className="mr-2 font-display text-accent">{String(i + 1).padStart(2, "0")}</b>
                        {image.alt}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <PhotoPlaceholder label={`${project.title} — photo du chantier 1`} tone="dark" aspect="video" />
              <PhotoPlaceholder label={`${project.title} — photo du chantier 2`} tone="dark" aspect="video" />
              <PhotoPlaceholder label={`${project.title} — photo du chantier 3`} tone="dark" aspect="video" />
            </div>
          )}
        </div>
      </section>

      {/* 6. DOMAINES MOBILISÉS */}
      {mobilizedServices.length > 0 ? (
        <section className="bg-offwhite">
          <div className="container-wide py-20 sm:py-24">
            <SectionHeading index={n()} eyebrow="Savoir-faire mobilisés" title="Domaines d'activité" />
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {mobilizedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="focus-ring group flex min-h-[180px] flex-col border border-line bg-paper text-ink transition-colors hover:border-ink sm:flex-row"
                >
                  <span className="relative h-48 w-full shrink-0 overflow-hidden bg-anthracite sm:h-auto sm:w-[42%]">
                    {service.heroImage ? (
                      <Image
                        src={service.heroImage}
                        alt=""
                        fill
                        sizes="240px"
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                          service.imagePosition ?? "object-center"
                        }`}
                      />
                    ) : (
                      <span className="hatch-dark absolute inset-0" />
                    )}
                  </span>
                  <span className="flex min-w-0 flex-col justify-between gap-4 p-6">
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
        <Link
          href={`/realisations/${next.slug}/`}
          className="focus-ring group relative block h-[340px] overflow-hidden bg-ink text-paper sm:h-[420px]"
        >
          {next.heroImage ? (
            <Image
              src={next.heroImage}
              alt=""
              fill
              sizes="100vw"
              className={`object-cover transition-transform duration-700 ease-editorial group-hover:scale-105 ${
                next.imagePosition ?? "object-center"
              }`}
            />
          ) : (
            <span className="hatch-dark absolute inset-0" />
          )}
          <span className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/60 to-ink/20" />
          <span className="container-wide relative flex h-full flex-col justify-center gap-4">
            <span className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-accent">
              Réalisation suivante
            </span>
            <span className="stretch-75 font-display text-[48px] font-black uppercase leading-[0.9] sm:text-[72px] lg:text-[96px]">
              {next.title} <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
            <span className="text-[15px] text-concrete-light">
              {next.categories.map((c) => projectCategoryLabels[c]).join(" · ")} · {next.location}
              {next.year ? ` · ${next.year}` : ""}
            </span>
          </span>
        </Link>
      ) : null}

      {/* 8. APPEL À L'ACTION */}
      <CtaBand title="Un projet similaire en Valais ?" kicker="Parlons-en" />
    </>
  );
}
