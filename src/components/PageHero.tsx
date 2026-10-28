import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Reveal } from "./Reveal";

/**
 * Hero clair commun à toutes les pages : fil d'Ariane, étiquette jaune,
 * titre condensé, introduction, boutons et, en option, une photo à droite.
 * Sur téléphone, le texte et les boutons passent avant la photo pour être
 * visibles sans faire défiler.
 */
export function PageHero({
  crumbs,
  eyebrow,
  tags,
  title,
  intro,
  actions,
  meta,
  aside,
  size = "lg",
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  /** Étiquettes affichées à la place de `eyebrow` (catégories d'une réalisation…). */
  tags?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  /** Informations clés sous le texte (lieu, période…). */
  meta?: React.ReactNode;
  /** Visuel à droite (photo ou emplacement photo), positionné en `fill`. */
  aside?: React.ReactNode;
  size?: "lg" | "sm";
}) {
  return (
    <section className="border-b border-line bg-offwhite">
      <div
        className={`container-wide grid grid-cols-1 gap-8 py-8 sm:py-12 lg:gap-14 ${
          aside ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-stretch lg:py-14" : "lg:py-16"
        }`}
      >
        <div className="flex min-w-0 flex-col justify-center gap-5">
          {crumbs ? <Breadcrumb items={crumbs} tone="light" /> : null}
          <Reveal className="flex flex-col gap-5">
            {tags ?? (eyebrow ? (
              <span className="self-start bg-accent px-3 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink sm:text-xs">
                {eyebrow}
              </span>
            ) : null)}
            <h1
              className={`stretch-75 max-w-4xl font-display font-black uppercase leading-[0.92] text-ink [text-wrap:balance] ${
                size === "lg" ? "text-[34px] sm:text-[48px] lg:text-[64px]" : "text-[32px] sm:text-[44px]"
              }`}
            >
              {title}
            </h1>
            {intro ? <div className="max-w-xl text-base leading-relaxed text-steel sm:text-lg">{intro}</div> : null}
            {actions ? <div className="flex flex-wrap gap-3 pt-1">{actions}</div> : null}
            {meta ? <div className="pt-2">{meta}</div> : null}
          </Reveal>
        </div>
        {aside ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[440px]">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
