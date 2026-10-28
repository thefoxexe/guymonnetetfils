import { BrandBand } from "@/components/BrandBand";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { slots } from "@/lib/photos";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
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
      <PageHero
        crumbs={[{ name: "Équipe", path: "/equipe/" }]}
        eyebrow="Notre équipe"
        title="Notre équipe"
        intro="Les personnes qui travaillent chez Guy Monnet & Fils, classées par métier."
        aside={<Photo slot={slots.teamCover} label="Photo de l'équipe prise sur le terrain" aspect="fill" priority />}
      />
      <BrandBand items={teamGroups.map((g) => g.label.replace(/ génie civil \/ maçonnerie/, ""))} />

      {/* DIRECTION */}
      <section className="bg-offwhite">
        <div className="container-wide flex flex-wrap items-center gap-12 py-14 sm:py-20 lg:py-24">
          <Reveal className="min-w-0 flex-[1_1_480px]">
            <SectionHeading index="01" eyebrow="Direction" title={direction.name} />
            <p className="mt-3 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-accent-ink">
              {direction.role}
            </p>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-steel">
              Guy Monnet reste actif au sein de l&apos;entreprise qu&apos;il a fondée en 1980. Son
              fils, Frédéric Monnet, en assure aujourd&apos;hui la direction générale.
            </p>
          </Reveal>
          <div className="min-w-0 flex-[1_1_360px]">
            <Photo slot={slots.teamDirector} label="Frédéric Monnet sur un chantier" aspect="video" />
          </div>
        </div>
      </section>

      {/* COLLABORATEURS */}
      <section>
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading index="02" eyebrow="Collaborateurs" title="Par métier" />
          <div className="mt-8 sm:mt-12 space-y-14">
            {teamGroups.map((group, index) => (
              <TeamGroupSection key={group.id} group={group} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
