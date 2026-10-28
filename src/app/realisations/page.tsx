import { BrandBand } from "@/components/BrandBand";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProjectFilter } from "@/components/ProjectFilter";
import { SectionHeading } from "@/components/SectionHeading";
import { projects, futureProjects, projectCategoryLabels } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Réalisations & chantiers en Valais | Guy Monnet & Fils",
  description:
    "Découvrez les chantiers réalisés par Guy Monnet & Fils en Valais : génie civil, terrassement, maçonnerie et environnement, avec chiffres et détails techniques.",
  path: "/realisations/",
});

export default function RealisationsPage() {
  const categories = Array.from(new Set(projects.flatMap((p) => p.categories))).map((c) => projectCategoryLabels[c]);

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
            eyebrow="À venir"
            title="D'autres chantiers à découvrir prochainement"
            description="Fiches en préparation."
          />
          <ol className="mt-8 sm:mt-12 grid grid-cols-1 border-l border-t border-line bg-paper sm:grid-cols-2 lg:grid-cols-3">
            {futureProjects.map((name, index) => (
              <li key={name} className="flex items-baseline gap-4 border-b border-r border-line px-4 py-3.5 sm:px-6 sm:py-5">
                <span className="font-display text-sm font-extrabold text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-base font-bold sm:text-lg">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
