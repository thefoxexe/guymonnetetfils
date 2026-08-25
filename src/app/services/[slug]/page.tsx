import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/Button";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { ProjectGrid } from "@/components/ProjectCard";
import { JsonLd } from "@/components/JsonLd";
import { services, getServiceBySlug } from "@/data/services";
import { projects } from "@/data/projects";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}/`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const relatedProjects = projects.filter((p) => service.relatedProjects?.includes(p.slug));
  const relatedServices = services.filter((s) => service.relatedServices.includes(s.slug));

  return (
    <>
      <Breadcrumb items={[{ name: "Services", path: "/services/" }, { name: service.name, path: `/services/${service.slug}/` }]} />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-ink">Service</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
              {service.name} en Valais
            </h1>
            <p className="mt-6 max-w-content text-base leading-relaxed text-concrete">
              {service.intro[0]}
            </p>
            <Button href="/contact/" variant="primary" className="mt-8">
              Demander un devis
            </Button>
          </div>
          <PhotoPlaceholder label={service.heroImageLabel} aspect="wide" priority />
        </Container>
      </section>

      <section className="bg-offwhite py-16">
        <Container>
          <SectionHeading eyebrow="Présentation" title="Notre approche" />
          <div className="mt-6 max-w-content space-y-4 text-base leading-relaxed text-concrete">
            {service.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Prestations" title="Ce que nous réalisons" />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {service.prestations.map((item) => (
              <li key={item} className="border border-line bg-paper p-5 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {service.savoirFaire ? (
        <section className="bg-anthracite py-16 text-paper">
          <Container>
            <SectionHeading eyebrow="Savoir-faire & équipements" title="Nos moyens" tone="dark" />
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.savoirFaire.map((item) => (
                <li key={item} className="border border-white/15 p-5 text-sm text-concrete-light">
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {service.references && service.references.length > 0 ? (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Quelques références" title="Des chantiers concrets" />
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.references.map((ref) => {
                const content = (
                  <>
                    <p className="font-display text-base font-semibold text-ink">{ref.label}</p>
                    {ref.location ? <p className="mt-1 text-sm text-concrete">{ref.location}</p> : null}
                    {ref.note ? <p className="mt-1 text-xs text-concrete/80">{ref.note}</p> : null}
                  </>
                );
                return (
                  <li key={`${ref.label}-${ref.location}`} className="border border-line bg-paper p-5">
                    {ref.projectSlug ? (
                      <Link href={`/realisations/${ref.projectSlug}/`} className="focus-ring block hover:text-accent-ink">
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <section className="bg-offwhite py-16">
          <Container>
            <SectionHeading eyebrow="Réalisations associées" title="Voir ces chantiers en détail" />
            <div className="mt-10">
              <ProjectGrid projects={relatedProjects} />
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Zone d'intervention" title="Où nous intervenons" />
            <p className="mt-4 max-w-content text-base leading-relaxed text-concrete">
              {service.zoneIntervention}
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Services associés" title="Voir aussi" />
            <ul className="mt-4 space-y-2">
              {relatedServices.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/services/${related.slug}/`}
                    className="focus-ring inline-block border-b border-transparent text-sm font-semibold text-ink hover:border-accent hover:text-accent-ink"
                  >
                    {related.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTASection />

      <JsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.seoDescription,
          path: `/services/${service.slug}/`,
        })}
      />
    </>
  );
}
