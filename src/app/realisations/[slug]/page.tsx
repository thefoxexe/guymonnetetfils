import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
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
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const mobilizedServices = services.filter((s) => project.services.includes(s.slug));

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Réalisations", path: "/realisations/" },
          { name: project.title, path: `/realisations/${project.slug}/` },
        ]}
      />

      <section className="py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-ink">
            {project.categories.map((c) => projectCategoryLabels[c]).join(" · ")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-concrete">
            {project.location}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <div className="mt-8">
            <PhotoPlaceholder label={project.heroImageLabel} aspect="cinema" priority />
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="max-w-content space-y-4 text-base leading-relaxed text-concrete">
            {project.context.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-offwhite py-16">
        <Container>
          <SectionHeading eyebrow="Travaux réalisés" title="Ce que nous avons fait" />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.works.map((work) => (
              <li key={work} className="border border-line bg-paper p-5 text-sm text-ink">
                {work}
              </li>
            ))}
          </ul>
          {project.todo ? (
            <p className="mt-6 border border-accent-ink/30 bg-accent/10 p-4 text-xs text-accent-ink">
              {project.todo}
            </p>
          ) : null}
        </Container>
      </section>

      {project.stats && project.stats.length > 0 ? (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Chiffres clés" title="L'ampleur du chantier" />
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
              {project.stats.map((stat) => (
                <div key={stat.label} className="bg-paper p-6">
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
        <Container className="flex flex-col justify-between gap-6 border-t border-line pt-10 sm:flex-row">
          <Link href={`/realisations/${previous!.slug}/`} className="focus-ring group max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-wide text-concrete">Projet précédent</p>
            <p className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-accent-ink">
              {previous!.title}
            </p>
          </Link>
          <Link href={`/realisations/${next!.slug}/`} className="focus-ring group max-w-xs text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-concrete">Projet suivant</p>
            <p className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-accent-ink">
              {next!.title}
            </p>
          </Link>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
