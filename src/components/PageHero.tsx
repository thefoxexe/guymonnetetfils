import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Photo, hasPhoto } from "./Photo";
import { Reveal } from "./Reveal";

/**
 * Hero commun à toutes les pages : fil d'Ariane, étiquette jaune, titre
 * condensé, introduction et boutons. Avec `background`, la photo occupe tout
 * le fond (plein cadre, responsive). Avec une vraie photo : dégradé sombre
 * côté texte et texte blanc ; sans photo : emplacement clair.
 */
export function PageHero({
  crumbs,
  eyebrow,
  tags,
  title,
  intro,
  actions,
  meta,
  background,
  size = "lg",
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  /** Étiquettes affichées à la place de `eyebrow` (domaines d'une réalisation…). */
  tags?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  /** Informations clés sous le texte (lieu, période…). */
  meta?: React.ReactNode;
  /**
   * Photo de fond : emplacement photo nommé (voir src/lib/photos.ts) et,
   * en option, le cadrage (classe Tailwind object-position).
   */
  background?: { slot: string; label: string; position?: string };
  size?: "lg" | "sm";
}) {
  // Vraie photo : dégradé sombre côté texte et texte blanc, pour mettre la
  // photo en valeur. Sans photo : version claire.
  const dark = Boolean(background && hasPhoto(background.slot));
  return (
    <section
      className={`relative overflow-hidden border-b border-line ${dark ? "hero-dark bg-ink" : "bg-offwhite"} ${
        background ? "flex min-h-[460px] items-center sm:min-h-[520px] lg:min-h-[640px]" : ""
      }`}
    >
      {background ? (
        <>
          <Photo
            slot={background.slot}
            label={background.label}
            aspect="fill"
            layout="badge"
            priority
            sizes="100vw"
            imageClassName={`hero-zoom ${background.position ?? "object-center"}`}
          />
          <div
            aria-hidden="true"
            className={
              dark
                ? "absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/20 lg:bg-gradient-to-r lg:from-ink/85 lg:via-ink/45 lg:to-ink/0"
                : "absolute inset-0 bg-offwhite/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-offwhite lg:via-offwhite/85 lg:to-offwhite/0"
            }
          />
        </>
      ) : null}
      <div className={`container-wide relative w-full py-8 sm:py-12 ${background ? "pb-14 lg:py-16" : "lg:py-16"}`}>
        <div className="flex max-w-2xl flex-col gap-5">
          {crumbs ? <Breadcrumb items={crumbs} tone={dark ? "dark" : "light"} /> : null}
          <Reveal className="flex flex-col gap-5">
            {tags ?? (eyebrow ? (
              <span className="self-start bg-accent px-3 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink sm:text-xs">
                {eyebrow}
              </span>
            ) : null)}
            <h1
              className={`stretch-75 max-w-4xl font-display font-black uppercase leading-[0.92] [text-wrap:balance] ${
                dark ? "text-paper drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]" : "text-ink"
              } ${
                size === "lg" ? "text-[34px] sm:text-[48px] lg:text-[64px]" : "text-[32px] sm:text-[44px]"
              }`}
            >
              {title}
            </h1>
            {intro ? (
              <div className={`max-w-xl text-base leading-relaxed sm:text-lg ${dark ? "text-paper/90" : "text-ink/80"}`}>{intro}</div>
            ) : null}
            {actions ? <div className="flex flex-wrap gap-3 pt-1">{actions}</div> : null}
            {meta ? <div className="pt-2">{meta}</div> : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
