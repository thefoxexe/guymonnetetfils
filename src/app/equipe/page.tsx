import { BrandBand } from "@/components/BrandBand";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo, hasPhoto } from "@/components/Photo";
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
        background={{ slot: slots.teamCover, label: "Photo de l'équipe prise sur le terrain" }}
      />
      <BrandBand items={teamGroups.map((g) => g.label.replace(/ génie civil \/ maçonnerie/, ""))} />

      {/* DIRECTION */}
      <section className="bg-offwhite">
        <div className="container-wide py-12 sm:py-16">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-ink sm:h-28 sm:w-28">
              {hasPhoto(slots.teamDirector) ? (
                <Photo slot={slots.teamDirector} label="Portrait de Frédéric Monnet" aspect="fill" sizes="112px" />
              ) : (
                <span
                  role="img"
                  aria-label="Photo à définir : portrait de Frédéric Monnet"
                  title={`Photo à définir : ${slots.teamDirector}.jpg`}
                  className="hatch flex h-full w-full items-center justify-center font-display text-2xl font-black text-ink/60"
                >
                  FM
                </span>
              )}
            </div>
            <div>
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-accent-ink">{direction.role}</p>
              <h2 className="stretch-85 mt-1 font-display text-[28px] font-extrabold uppercase leading-none sm:text-[36px]">
                {direction.name}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-steel sm:text-base">
                Guy Monnet reste actif dans l&apos;entreprise qu&apos;il a fondée en 1980. Son fils
                Frédéric en assure aujourd&apos;hui la direction.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COLLABORATEURS */}
      <section>
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <SectionHeading title="Par métier" />
          <p className="mt-5 max-w-3xl border-l-4 border-accent bg-offwhite px-4 py-3 text-xs text-accent-ink">
            TODO: VALIDATION CLIENT : obtenir la liste à jour des collaborateurs (auprès de la
            secrétaire) et décider si l&apos;on affiche des photos ou seulement les prénoms.
          </p>
          <div className="mt-8 sm:mt-12 space-y-14">
            {teamGroups.map((group) => (
              <TeamGroupSection key={group.id} group={group} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
