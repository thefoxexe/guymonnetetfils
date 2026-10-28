import { notFound } from "next/navigation";
import Link from "next/link";
import { BrandBand } from "@/components/BrandBand";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { ProjectGrid } from "@/components/ProjectCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { SectionHeading, SectionLabel } from "@/components/SectionHeading";
import { Carousel } from "@/components/Carousel";
import { ServiceCard } from "@/components/ServiceCard";
import { services, getServiceBySlug } from "@/data/services";
import { projects } from "@/data/projects";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { serviceIllustrations, slots } from "@/lib/photos";

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

/** Les paragraphes « TODO: … » restent visibles mais en note discrète. */
function isTodo(text: string) {
  return text.startsWith("TODO");
}

/** « 7 camions tout-terrain… » → { value: "7", label: "camions tout-terrain…" } */
function splitLeadingNumber(text: string) {
  const match = text.match(/^(\d+)\s+(.*)$/);
  return match ? { value: match[1]!, label: match[2]! } : null;
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const relatedProjects = projects.filter((p) => service.relatedProjects?.includes(p.slug));
  const relatedServices = services.filter((s) => service.relatedServices.includes(s.slug));
  const [lead, ...body] = service.intro.filter((p) => !isTodo(p));
  const todos = service.intro.filter(isTodo);

  // Alternance blanc / crème des sections présentes après « Prestations » (crème).
  const optional = [
    service.savoirFaire ? "savoir" : null,
    "photos",
    relatedProjects.length > 0 ? "realisations" : null,
    service.references?.length ? "references" : null,
    relatedServices.length > 0 ? "lies" : null,
  ].filter(Boolean) as string[];
  const bg = (key: string) => (optional.indexOf(key) % 2 === 0 ? "" : "bg-offwhite");

  // Un unique élément « A → B → C » est présenté comme un processus en étapes.
  const process =
    service.savoirFaire?.length === 1 && service.savoirFaire[0]!.includes("→")
      ? service.savoirFaire[0]!.split("→").map((step) => step.trim())
      : null;

  return (
    <>
      {/* 1. HERO */}
      <PageHero
        crumbs={[
          { name: "Services", path: "/services/" },
          { name: service.name, path: `/services/${service.slug}/` },
        ]}
        eyebrow="Domaine d'activité"
        title={service.name}
        intro={service.shortDescription}
        actions={
          <>
            <Button href="/contact/">Demander une offre</Button>
            {relatedProjects.length > 0 ? (
              <Button href="#realisations" variant="outline">
                Réalisations
              </Button>
            ) : service.references?.length ? (
              <Button href="#references" variant="outline">
                Références
              </Button>
            ) : null}
          </>
        }
        background={{ slot: slots.serviceCover(service.slug), label: service.heroImageLabel }}
      />

      {/* 2. BANDEAU DE MARQUE */}
      <BrandBand items={service.bandItems} />

      {/* 3. INTRO + EN BREF */}
      <section>
        <div className="container-wide flex flex-wrap gap-8 py-14 sm:gap-14 sm:py-20 lg:gap-16 lg:py-28">
          <Reveal className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
            <SectionLabel>Présentation</SectionLabel>
            {lead ? (
              <p className="stretch-90 font-display text-[21px] font-semibold leading-[1.3] sm:text-[28px]">{lead}</p>
            ) : null}
            {body.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-[17px] leading-[1.7] text-steel sm:text-lg">
                {paragraph}
              </p>
            ))}
            {todos.map((todo) => (
              <p key={todo} className="max-w-3xl border-l-4 border-accent bg-offwhite px-4 py-3 text-xs text-accent-ink">
                {todo}
              </p>
            ))}
          </Reveal>
          <aside className="min-w-0 flex-[1_1_300px] self-start">
            <div className="border-2 border-ink">
              <p className="flex items-center justify-between bg-ink px-5 py-3.5 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-paper">
                Zone d&apos;intervention
                <span className="h-3.5 w-3.5 bg-accent" aria-hidden="true" />
              </p>
              <dl className="px-5 py-1">
                <div className="py-3.5 text-sm">
                  <dt className="sr-only">Zone d&apos;intervention</dt>
                  <dd className="font-semibold leading-snug">{service.zoneIntervention}</dd>
                </div>
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

      {/* 4. PRESTATIONS */}
      <section className="bg-offwhite">
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading title="Ce que nous faisons" align="center" />
          <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2.5 sm:mt-12 sm:gap-3">
            {service.prestations.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={(index % 6) * 50}
                className="border-2 border-ink bg-paper px-4 py-2.5 text-center font-display text-[15px] font-bold leading-tight transition-colors hover:bg-accent sm:px-5 sm:py-3 sm:text-[17px]"
              >
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. MOYENS / PROCESSUS */}
      {service.savoirFaire ? (
        <section className={bg("savoir")}>
          <div className="container-wide py-14 sm:py-20 lg:py-24">
            <SectionHeading title={service.savoirFaireTitle ?? "Nos moyens"} />
            {process ? (
              <ol className="mt-8 flex flex-wrap items-center gap-3 sm:mt-12">
                {process.map((step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span
                      className={`px-4 py-3 font-display text-base font-extrabold uppercase sm:text-lg ${
                        index === process.length - 1 ? "bg-accent text-ink" : "bg-ink text-paper"
                      }`}
                    >
                      {step}
                    </span>
                    {index < process.length - 1 ? (
                      <span className="font-bold text-accent-ink" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="mt-8 sm:mt-12 grid grid-cols-1 gap-[2px] border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
                {service.savoirFaire.map((item) => {
                  const split = splitLeadingNumber(item);
                  return (
                    <li key={item} className="flex flex-col gap-2 bg-paper px-4 py-5 sm:gap-3 sm:px-6 sm:py-7">
                      {split ? (
                        <>
                          <span className="stretch-75 font-display text-[40px] font-black leading-none sm:text-[56px]">
                            <CountUp value={split.value} />
                          </span>
                          <span className="text-[15px] leading-snug text-steel">{split.label}</span>
                        </>
                      ) : (
                        <span className="font-display text-xl font-bold leading-snug">{item}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      ) : null}

      {/* 6. IMAGES D'ILLUSTRATION (emplacements à définir avec le client) */}
      <section className={bg("photos")}>
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading title="En photos" />
          <div className="mt-8 sm:mt-12">
            <Carousel label={`Photos : ${service.name}`}>
              {serviceIllustrations(service.slug).map((slot, i) => (
                <Photo
                  key={slot}
                  slot={slot}
                  label={`${service.name}, photo ${i + 1}`}
                  aspect="video"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* 7. RÉALISATIONS LIÉES */}
      {relatedProjects.length > 0 ? (
        <section id="realisations" className={`scroll-mt-28 ${bg("realisations")}`}>
          <div className="container-wide py-14 sm:py-20 lg:py-24">
            <SectionHeading
              title={`Chantiers en ${service.name.toLowerCase()}`}
              action={
                <Link href="/realisations/" className="focus-ring text-[15px] font-bold text-accent-ink hover:underline">
                  Toutes les réalisations →
                </Link>
              }
            />
            <div className="mt-8 sm:mt-12">
              <ProjectGrid projects={relatedProjects} />
            </div>
          </div>
        </section>
      ) : null}

      {/* 8. RÉFÉRENCES (titres seuls) */}
      {service.references && service.references.length > 0 ? (
        <section id="references" className={`scroll-mt-28 ${bg("references")}`}>
          <div className="container-wide flex flex-wrap gap-14 py-14 sm:py-20 lg:py-24">
            <div className="min-w-0 flex-[1_1_300px]">
              <SectionHeading
                title="Quelques références"
              />
            </div>
            <ul className="grid min-w-0 flex-[999_1_560px] grid-cols-1 content-start gap-x-10 sm:grid-cols-2">
              {service.references.map((ref, i) => {
                const content = (
                  <>
                    <span className="font-display text-[17px] font-bold leading-snug">
                      <span className="mr-2 text-accent-ink" aria-hidden="true">
                        ■
                      </span>
                      {ref.label}
                    </span>
                    {ref.location ? <span className="pl-6 text-sm text-steel">{ref.location}</span> : null}
                  </>
                );
                return (
                  <Reveal as="li" key={`${ref.label}-${ref.location}`} delay={(i % 4) * 60} className="border-t border-ink/15">
                    {ref.projectSlug ? (
                      <Link
                        href={`/realisations/${ref.projectSlug}/`}
                        className="focus-ring group flex items-start justify-between gap-4 py-4 hover:text-accent-ink"
                      >
                        <span className="flex flex-col gap-1">{content}</span>
                        <span className="text-sm font-bold text-accent-ink">Voir →</span>
                      </Link>
                    ) : (
                      <span className="flex flex-col gap-1 py-4">{content}</span>
                    )}
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 9. DOMAINES ASSOCIÉS */}
      {relatedServices.length > 0 ? (
        <section className={bg("lies")}>
          <div className="container-wide py-14 sm:py-20 lg:py-24">
            <SectionHeading
              title="Domaines liés"
              action={
                <Link href="/services/" className="focus-ring text-[15px] font-bold text-accent-ink hover:underline">
                  Les {services.length} domaines →
                </Link>
              }
            />
            <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 10. APPEL À L'ACTION */}
      <CtaBand kicker={`Zone d'intervention : ${service.zoneIntervention}`} title="Vous avez un projet ?" />

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
