import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { TeamGroupSection } from "@/components/TeamGrid";
import { direction, teamGroups } from "@/data/team";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Notre équipe | Guy Monnet & Fils SA",
  description:
    "L'équipe de Guy Monnet & Fils SA : direction, machinistes, chauffeurs, chefs d'équipe, maçons et génie civil, réunis à Riddes en Valais.",
  path: "/equipe/",
});

export default function EquipePage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Équipe", path: "/equipe/" }]} />

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
              Une équipe, plusieurs métiers
            </h1>
            <p className="mt-6 max-w-content text-base leading-relaxed text-concrete">
              Direction, machinistes, chauffeurs, chefs d&apos;équipe, maçons et main-d&apos;œuvre
              en génie civil : c&apos;est cette diversité de métiers, réunie au sein d&apos;une
              même entreprise familiale, qui permet à Guy Monnet &amp; Fils de mener des
              chantiers complets.
            </p>
          </div>
          <PhotoPlaceholder label="Photo de groupe de l'équipe Guy Monnet & Fils" aspect="wide" priority />
        </Container>
      </section>

      <section className="bg-offwhite py-16">
        <Container>
          <SectionHeading eyebrow="Direction" title={direction.name} />
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-accent-ink">
            {direction.role}
          </p>
          <p className="mt-4 max-w-content text-base leading-relaxed text-concrete">
            Guy Monnet reste actif au sein de l&apos;entreprise qu&apos;il a fondée en 1980. Son
            fils, Frédéric Monnet, en assure aujourd&apos;hui la direction générale.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-14">
          {teamGroups.map((group) => (
            <TeamGroupSection key={group.id} group={group} />
          ))}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
