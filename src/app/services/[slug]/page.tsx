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
import { SectionHeading, SectionLabel, sectionCounter } from "@/components/SectionHeading";
import { ServiceCard, serviceNumber } from "@/components/ServiceCard";
import { services, getServiceBySlug } from "@/data/services";
import { projects } from "@/data/projects";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { slots } from "@/lib/photos";

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
  const n = sectionCounter();

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
        eyebrow={`Domaine d'activité · ${serviceNumber(service)} / ${String(services.length).padStart(2, "0")}`}
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
        aside={
          <Photo
            slot={slots.serviceCover(service.slug)}
            label={service.heroImageLabel}
            aspect="fill"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        }
      />

      {/* 2. BANDEAU DE MARQUE */}
      <BrandBand items={service.bandItems} />

      {/* 3. INTRO + EN BREF */}
      <section>
        <div className="container-wide flex flex-wrap gap-8 py-14 sm:gap-14 sm:py-20 lg:gap-16 lg:py-28">
          <Reveal className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
            <SectionLabel index={n()}>Présentation</SectionLabel>
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
                En bref
                <span className="h-3.5 w-3.5 bg-accent" aria-hidden="true" />
              </p>
              <dl className="px-5 py-1">
                <div className="flex justify-between gap-4 border-b border-line py-3.5 text-sm">
                  <dt className="text-steel">Prestations</dt>
                  <dd className="font-semibold">{service.prestations.length}</dd>
                </div>
                {service.references?.length ? (
                  <div className="flex justify-between gap-4 border-b border-line py-3.5 text-sm">
                    <dt className="text-steel">Références</dt>
                    <dd className="font-semibold">{service.references.length}</dd>
                  </div>
                ) : null}
                {relatedProjects.length ? (
                  <div className="flex justify-between gap-4 border-b border-line py-3.5 text-sm">
                    <dt className="text-steel">Chantiers détaillés</dt>
                    <dd className="font-semibold">{relatedProjects.length}</dd>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1 py-3.5 text-sm">
                  <dt className="text-steel">Zone d&apos;intervention</dt>
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
          <SectionHeading index={n()} eyebrow="Prestations" title="Ce que nous faisons" />
          <ul className="mt-8 grid grid-cols-1 border-l border-t border-line bg-paper sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {service.prestations.map((item, index) => (
              <li key={item} className="flex items-baseline gap-4 border-b border-r border-line px-4 py-3.5 transition-colors hover:bg-accent sm:min-h-[120px] sm:flex-col sm:items-start sm:justify-between sm:gap-5 sm:p-6">
                <span className="font-display text-sm font-extrabold text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-[17px] font-bold leading-tight sm:text-[20px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. MOYENS / PROCESSUS */}
      {service.savoirFaire ? (
        <section className={bg("savoir")}>
          <div className="container-wide py-14 sm:py-20 lg:py-24">
            <SectionHeading index={n()} eyebrow="Savoir-faire & moyens" title={service.savoirFaireTitle ?? "Nos moyens"} />
            {process ? (
              <ol className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {process.map((step, index) => (
                  <li
                    key={step}
                    className={`flex flex-col gap-3 border-t-4 pt-6 ${index === process.length - 1 ? "border-accent" : "border-ink"}`}
                  >
                    <span className="stretch-75 font-display text-[52px] font-black leading-none text-accent-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-extrabold uppercase">{step}</span>
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
                          <span className="stretch-75 font-display text-[40px] font-black leading-none sm:text-[56px]">{split.value}</span>
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
          <SectionHeading index={n()} eyebrow="Photos" title={service.name} />
          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Photo
                key={i}
                slot={slots.serviceIllustration(service.slug, i)}
                label={`${service.name}, photo d'illustration ${i}`}
                aspect="video"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. RÉALISATIONS LIÉES */}
      {relatedProjects.length > 0 ? (
        <section id="realisations" className={`scroll-mt-28 ${bg("realisations")}`}>
          <div className="container-wide py-14 sm:py-20 lg:py-24">
            <SectionHeading
              index={n()}
              eyebrow="Réalisations"
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
                index={n()}
                eyebrow="Références"
                title="Quelques références"
              />
            </div>
            <ul className="grid min-w-0 flex-[999_1_560px] grid-cols-1 content-start gap-x-10 sm:grid-cols-2">
              {service.references.map((ref) => {
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
                  <li key={`${ref.label}-${ref.location}`} className="border-t border-ink/15">
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
                  </li>
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
              eyebrow="Voir aussi"
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
