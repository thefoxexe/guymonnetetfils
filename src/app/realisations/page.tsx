import { BrandBand } from "@/components/BrandBand";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProjectFilter } from "@/components/ProjectFilter";
import { SectionHeading } from "@/components/SectionHeading";
import { projects, futureProjects } from "@/data/projects";
import { projectDomainNames } from "@/lib/domains";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Réalisations & chantiers en Valais | Guy Monnet & Fils",
  description:
    "Découvrez les chantiers réalisés par Guy Monnet & Fils en Valais : génie civil, terrassement, maçonnerie et environnement, avec chiffres et détails techniques.",
  path: "/realisations/",
});

export default function RealisationsPage() {
  const categories = Array.from(new Set(projects.flatMap(projectDomainNames)));

  return (
    <>
      <PageHero
        crumbs={[{ name: "Réalisations", path: "/realisations/" }]}
        eyebrow="Réalisations"
        title="Des chantiers qui parlent pour nous"
        intro="Une sélection de chantiers réalisés en Valais, avec les chiffres et le détail des travaux."
      />
      <BrandBand items={categories} />

      <section>
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <ProjectFilter projects={projects} />
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading
            title="D'autres chantiers à découvrir prochainement"
            description="Fiches en préparation."
          />
          <ul className="mt-8 sm:mt-12 grid grid-cols-1 border-l border-t border-line bg-paper sm:grid-cols-2 lg:grid-cols-3">
            {futureProjects.map((name) => (
              <li key={name} className="flex items-center gap-3 border-b border-r border-line px-4 py-3.5 sm:px-6 sm:py-5">
                <span className="h-2 w-2 shrink-0 bg-accent" aria-hidden="true" />
                <span className="font-display text-base font-bold sm:text-lg">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
