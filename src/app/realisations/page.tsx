import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { ProjectFilter } from "@/components/ProjectFilter";
import { projects, futureProjects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Réalisations & chantiers en Valais | Guy Monnet & Fils",
  description:
    "Découvrez les chantiers réalisés par Guy Monnet & Fils en Valais : génie civil, terrassement, maçonnerie et environnement, avec chiffres et détails techniques.",
  path: "/realisations/",
});

export default function RealisationsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Réalisations", path: "/realisations/" }]} />
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Réalisations"
            title="Des chantiers qui parlent pour nous"
            description="Génie civil, terrassement, maçonnerie et environnement : une sélection de chantiers réalisés par Guy Monnet & Fils en Valais."
          />
          <div className="mt-12">
            <ProjectFilter projects={projects} />
          </div>
        </Container>
      </section>

      <section className="bg-offwhite py-16">
        <Container>
          <SectionHeading
            eyebrow="À venir"
            title="D'autres chantiers à découvrir prochainement"
            description="Ces références existent déjà dans nos archives et pourront faire l'objet d'une page dédiée dès que suffisamment de contenu (textes, photos, chiffres) sera disponible."
          />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {futureProjects.map((name) => (
              <li key={name} className="border border-line bg-paper p-4 text-sm text-concrete">
                {name}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
