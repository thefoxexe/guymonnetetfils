import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProjectImage } from "@/components/ProjectImage";
import { Reveal } from "@/components/Reveal";
import { IconPin, IconCalendar, IconCheck } from "@/components/icons";
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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;
  const mobilizedServices = services.filter((s) => project.services.includes(s.slug));
  const categoryLabel = project.categories.map((c) => projectCategoryLabels[c]).join(" · ");

  // Une partie de la galerie illustre le texte (récit + travaux réalisés),
  // le reste compose la mosaïque « en images » plus bas.
  const gallery = project.gallery ?? [];
  const insetImage = gallery[0];
  const worksImage = gallery[1];
  const mosaicImages = gallery.slice(2);
  const mosaicBanner = mosaicImages[0];
  const mosaicRest = mosaicImages.slice(1);
  const restColsClass =
    mosaicRest.length >= 4
      ? "grid-cols-2 sm:grid-cols-4"
      : mosaicRest.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : mosaicRest.length === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1";
  const hasRealHero = Boolean(project.heroImage);

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Réalisations", path: "/realisations/" },
          { name: project.title, path: `/realisations/${project.slug}/` },
        ]}
      />

      {project.heroImage ? (
        <section className="relative aspect-[16/9] max-h-[60vh] min-h-[260px] w-full overflow-hidden bg-anthracite">
          <Image
            src={project.heroImage}
            alt={project.heroImageLabel}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${project.imagePosition ?? "object-center"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/5" />
          <Container className="absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
            <Reveal>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-accent drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] sm:text-sm">
                {categoryLabel}
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-[1.05] text-paper drop-shadow-[0_3px_10px_rgba(0,0,0,0.75)] sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
            </Reveal>
          </Container>
        </section>
      ) : (
        <section className="pt-16">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-ink">{categoryLabel}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
              {project.title}
            </h1>
          </Container>
        </section>
      )}

      <div className="border-b border-line bg-offwhite">
        <Container className="flex flex-wrap items-center gap-x-8 gap-y-2 py-5 text-sm text-ink">
          <span className="inline-flex items-center gap-2">
            <IconPin className="h-4 w-4 text-accent-ink" />
            {project.location}
          </span>
          {project.year ? (
            <span className="inline-flex items-center gap-2">
              <IconCalendar className="h-4 w-4 text-accent-ink" />
              {project.year}
            </span>
          ) : null}
        </Container>
      </div>

      {!hasRealHero ? (
        <section className="pt-10">
          <Container>
            <ProjectImage project={project} aspect="wide" priority />
          </Container>
        </section>
      ) : null}

      <section className="py-16">
        <Container className={insetImage ? "grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-center" : ""}>
          <div className="max-w-content space-y-4 text-base leading-relaxed text-concrete">
            {project.context.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {insetImage ? (
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden bg-anthracite">
                <Image
                  src={insetImage.src}
                  alt={insetImage.alt}
                  width={insetImage.width}
                  height={insetImage.height}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={`h-full w-full object-cover ${insetImage.imagePosition ?? "object-center"}`}
                />
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="bg-offwhite py-16">
        <Container className={worksImage ? "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center" : ""}>
          <div>
            <SectionHeading eyebrow="Travaux réalisés" title="Ce que nous avons fait" />
            <ul className="mt-8 border-t border-line">
              {project.works.map((work) => (
                <li key={work} className="flex items-start gap-3 border-b border-line py-4">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
                  <span className="text-sm text-ink">{work}</span>
                </li>
              ))}
            </ul>
            {project.todo ? (
              <p className="mt-6 border border-accent-ink/30 bg-accent/10 p-4 text-xs text-accent-ink">
                {project.todo}
              </p>
            ) : null}
          </div>
          {worksImage ? (
            <Reveal delay={80}>
              <div className="relative aspect-[4/3] overflow-hidden bg-anthracite lg:aspect-[3/4]">
                <Image
                  src={worksImage.src}
                  alt={worksImage.alt}
                  width={worksImage.width}
                  height={worksImage.height}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className={`h-full w-full object-cover ${worksImage.imagePosition ?? "object-center"}`}
                />
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {mosaicBanner ? (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="En images" title="Le chantier en photos" />
            <div className="mt-10 space-y-3 sm:space-y-4">
              <Reveal>
                <div className="group relative aspect-[16/9] overflow-hidden bg-anthracite sm:aspect-[21/9]">
                  <Image
                    src={mosaicBanner.src}
                    alt={mosaicBanner.alt}
                    width={mosaicBanner.width}
                    height={mosaicBanner.height}
                    loading="lazy"
                    sizes="100vw"
                    className={`h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105 ${mosaicBanner.imagePosition ?? "object-center"}`}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-4 text-xs leading-snug text-paper sm:text-sm">{mosaicBanner.alt}</p>
                  </div>
                </div>
              </Reveal>
              {mosaicRest.length > 0 ? (
                <div className={`grid gap-3 sm:gap-4 ${restColsClass}`}>
                  {mosaicRest.map((image, i) => (
                    <Reveal key={image.src} delay={(i % 4) * 60}>
                      <div
                        className={`group relative overflow-hidden bg-anthracite ${
                          mosaicRest.length === 1 ? "aspect-[16/9]" : "aspect-square"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          loading="lazy"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className={`h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105 ${image.imagePosition ?? "object-center"}`}
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <p className="p-3 text-xs leading-snug text-paper">{image.alt}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {project.stats && project.stats.length > 0 ? (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Chiffres clés" title="L'ampleur du chantier" />
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
              {project.stats.map((stat) => (
                <div key={stat.label} className="border-t-2 border-accent bg-paper p-6">
                  <dt className="font-display text-3xl font-bold text-ink">{stat.value}</dt>
                  <dd className="mt-2 text-sm text-concrete">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {mobilizedServices.length > 0 ? (
        <section className="bg-offwhite py-16">
          <Container>
            <SectionHeading eyebrow="Services mobilisés" title="Les métiers engagés sur ce chantier" />
            <ul className="mt-8 flex flex-wrap gap-3">
              {mobilizedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="focus-ring inline-block border border-ink px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="py-16">
        <Container className="border-t border-line pt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            <Link href={`/realisations/${previous.slug}/`} className="focus-ring group flex items-center gap-4">
              <div className="w-20 shrink-0 sm:w-28">
                <ProjectImage project={previous} aspect="video" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-concrete">← Projet précédent</p>
                <p className="mt-1 font-display text-base font-semibold text-ink group-hover:text-accent-ink sm:text-lg">
                  {previous.title}
                </p>
              </div>
            </Link>
            <Link
              href={`/realisations/${next.slug}/`}
              className="focus-ring group flex items-center gap-4 sm:flex-row-reverse sm:text-right"
            >
              <div className="w-20 shrink-0 sm:w-28">
                <ProjectImage project={next} aspect="video" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-concrete">Projet suivant →</p>
                <p className="mt-1 font-display text-base font-semibold text-ink group-hover:text-accent-ink sm:text-lg">
                  {next.title}
                </p>
              </div>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
