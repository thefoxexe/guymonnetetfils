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
        intro="Génie civil, terrassement, maçonnerie et environnement : une sélection de chantiers réalisés par Guy Monnet & Fils en Valais."
      />
      <BrandBand items={categories} />

      <section>
        <div className="container-wide py-20 sm:py-24">
          <ProjectFilter projects={projects} />
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="container-wide py-20 sm:py-24">
          <SectionHeading
            eyebrow="À venir"
            title="D'autres chantiers à découvrir prochainement"
            description="Ces références existent déjà dans nos archives et feront l'objet d'une fiche dédiée dès que les textes, photos et chiffres seront disponibles."
            tone="dark"
          />
          <ol className="mt-12 grid grid-cols-1 border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {futureProjects.map((name, index) => (
              <li key={name} className="flex items-baseline gap-4 border-b border-r border-white/15 px-6 py-5">
                <span className="font-display text-sm font-extrabold text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg font-bold">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Votre chantier sera peut-être le prochain" kicker="Parlons de votre projet" />
    </>
  );
}
