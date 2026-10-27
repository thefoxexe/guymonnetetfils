import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BrandBand } from "@/components/BrandBand";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { ProjectGrid } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, SectionLabel, sectionCounter } from "@/components/SectionHeading";
import { ServiceCard, serviceNumber } from "@/components/ServiceCard";
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

  // Un unique élément « A → B → C » est présenté comme un processus en étapes.
  const process =
    service.savoirFaire?.length === 1 && service.savoirFaire[0]!.includes("→")
      ? service.savoirFaire[0]!.split("→").map((step) => step.trim())
      : null;

  return (
    <>
      {/* 1. HERO PLEIN CADRE */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden bg-ink text-paper sm:min-h-[680px]">
        {service.heroImage ? (
          <Image
            src={service.heroImage}
            alt={service.heroImageLabel}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${service.imagePosition ?? "object-center"}`}
          />
        ) : (
          <div className="absolute inset-0">
            <PhotoPlaceholder label={service.heroImageLabel} tone="dark" aspect="fill" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/55 to-ink/95" />
        <div className="container-wide relative flex w-full flex-wrap items-end justify-between gap-10 pb-14 pt-28 sm:pb-20">
          <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-6">
            <Breadcrumb
              items={[
                { name: "Services", path: "/services/" },
                { name: service.name, path: `/services/${service.slug}/` },
              ]}
            />
            <Reveal className="flex flex-col gap-6">
              <span className="self-start bg-accent px-3.5 py-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-ink sm:text-[13px]">
                Domaine d&apos;activité · {serviceNumber(service)} / {String(services.length).padStart(2, "0")}
              </span>
              <h1 className="stretch-75 font-display text-[56px] font-black uppercase leading-[0.85] [text-wrap:balance] sm:text-[88px] lg:text-[136px]">
                {service.name}
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-concrete-light sm:text-[21px]">
                {service.shortDescription}
              </p>
            </Reveal>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact/">Demander une offre</Button>
            {relatedProjects.length > 0 ? (
              <Button href="#realisations" variant="outline-light">
                Voir les réalisations
              </Button>
            ) : service.references?.length ? (
              <Button href="#references" variant="outline-light">
                Nos références
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* 2. BANDEAU DE MARQUE */}
      <BrandBand items={service.bandItems} />

      {/* 3. INTRO + EN BREF */}
      <section>
        <div className="container-wide flex flex-wrap gap-14 py-20 sm:py-28 lg:gap-16">
          <Reveal className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
            <SectionLabel index={n()}>Notre métier</SectionLabel>
            {lead ? (
              <p className="stretch-90 font-display text-[26px] font-semibold leading-[1.28] sm:text-[34px]">{lead}</p>
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
          <aside className="min-w-0 flex-[1_1_320px] self-start">
            <div className="border-2 border-ink">
              <p className="flex items-center justify-between bg-ink px-6 py-4 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-paper">
                En bref
                <span className="h-3.5 w-3.5 bg-accent" aria-hidden="true" />
              </p>
              <dl className="px-6 py-2">
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
              Un projet ? Contactez-nous <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      {/* 4. PRESTATIONS */}
      <section className="bg-ink text-paper">
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading
            index={n()}
            eyebrow="Prestations"
            title="Ce que nous réalisons"
            tone="dark"
            action={<span className="text-[15px] text-mist">{service.prestations.length} prestations</span>}
          />
          <ul className="mt-12 grid grid-cols-1 border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {service.prestations.map((item, index) => (
              <li key={item} className="flex items-baseline gap-4 border-b border-r border-white/15 p-5 transition-colors hover:bg-anthracite sm:min-h-[132px] sm:flex-col sm:items-start sm:justify-between sm:gap-5 sm:p-6">
                <span className="font-display text-sm font-extrabold text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-[19px] font-bold leading-tight sm:text-[21px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. MOYENS / PROCESSUS */}
      {service.savoirFaire ? (
        <section className="bg-offwhite">
          <div className="container-wide py-20 sm:py-24">
            <SectionHeading index={n()} eyebrow="Savoir-faire & moyens" title={service.savoirFaireTitle ?? "Nos moyens"} />
            {process ? (
              <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
              <ul className="mt-12 grid grid-cols-1 gap-[2px] border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
                {service.savoirFaire.map((item) => {
                  const split = splitLeadingNumber(item);
                  return (
                    <li key={item} className="flex flex-col gap-3 bg-paper px-6 py-7">
                      {split ? (
                        <>
                          <span className="stretch-75 font-display text-[60px] font-black leading-none">{split.value}</span>
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
      <section>
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading index={n()} eyebrow="En images" title={`${service.name} sur le terrain`} />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PhotoPlaceholder label={`${service.name} — photo d'illustration 1`} aspect="video" />
            <PhotoPlaceholder label={`${service.name} — photo d'illustration 2`} aspect="video" />
            <PhotoPlaceholder label={`${service.name} — photo d'illustration 3`} aspect="video" />
          </div>
        </div>
      </section>

      {/* 7. RÉALISATIONS LIÉES */}
      {relatedProjects.length > 0 ? (
        <section id="realisations" className="scroll-mt-28 border-t border-line">
          <div className="container-wide py-20 sm:py-24">
            <SectionHeading
              index={n()}
              eyebrow="Réalisations"
              title="Nos chantiers en détail"
              action={
                <Link href="/realisations/" className="focus-ring text-[15px] font-bold text-accent-ink hover:underline">
                  Toutes les réalisations →
                </Link>
              }
            />
            <div className="mt-12">
              <ProjectGrid projects={relatedProjects} />
            </div>
          </div>
        </section>
      ) : null}

      {/* 8. RÉFÉRENCES (titres seuls) */}
      {service.references && service.references.length > 0 ? (
        <section id="references" className="scroll-mt-28 bg-offwhite">
          <div className="container-wide flex flex-wrap gap-14 py-20 sm:py-24">
            <div className="min-w-0 flex-[1_1_300px]">
              <SectionHeading
                index={n()}
                eyebrow="Références"
                title="Ils nous ont fait confiance"
                description={`Une sélection de chantiers réalisés par Guy Monnet & Fils en ${service.name.toLowerCase()}.`}
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
        <section>
          <div className="container-wide py-20 sm:py-24">
            <SectionHeading
              eyebrow="Domaines complémentaires"
              title="Souvent associés"
              action={
                <Link href="/services/" className="focus-ring text-[15px] font-bold text-accent-ink hover:underline">
                  Les {services.length} domaines →
                </Link>
              }
            />
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 10. APPEL À L'ACTION */}
      <CtaBand
        variant="dark"
        image="/images/hero-camion-guy-monnet-transports-valais-01.webp"
        kicker={`Zone d'intervention : ${service.zoneIntervention}`}
        title={`Parlons de votre projet de ${service.name.toLowerCase()}`}
      />

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
