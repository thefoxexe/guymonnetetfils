import { IconImage } from "./icons";

type PhotoPlaceholderProps = {
  label: string;
  aspect?: "video" | "square" | "portrait" | "wide" | "cinema";
  className?: string;
  priority?: boolean;
};

const aspectClasses: Record<NonNullable<PhotoPlaceholderProps["aspect"]>, string> = {
  video: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  cinema: "aspect-[21/9]",
};

/**
 * Emplacement pour une photographie réelle (chantier, équipe, engin, drone).
 * Aucune image stock n'est utilisée : ce composant matérialise l'espace prévu
 * en attendant la migration des photos existantes du site actuel, avec un
 * traitement volontairement discret (icône + repère de coin) plutôt qu'un
 * grand pavé de texte qui donnerait une impression de site inachevé.
 */
export function PhotoPlaceholder({
  label,
  aspect = "wide",
  className = "",
  priority = false,
}: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      title={label}
      data-photo-needed={label}
      data-priority={priority || undefined}
      className={`topo-lines relative w-full overflow-hidden bg-anthracite ${aspectClasses[aspect]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-anthracite via-anthracite to-ink" />
      <div className="absolute inset-0 flex items-center justify-center">
        <IconImage className="h-8 w-8 text-concrete-light/25" />
      </div>
      <div className="absolute left-3 top-3 flex items-center gap-1.5 bg-ink/70 px-2 py-1">
        <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
        <span className="font-body text-[10px] uppercase tracking-wide text-concrete-light/80">
          Photo à intégrer
        </span>
      </div>
    </div>
  );
}
