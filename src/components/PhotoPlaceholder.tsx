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
 * en attendant la migration des photos existantes du site actuel.
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
      data-photo-needed={label}
      data-priority={priority || undefined}
      className={`topo-lines relative w-full overflow-hidden bg-anthracite ${aspectClasses[aspect]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-anthracite via-anthracite to-ink" />
      <div className="absolute inset-0 flex items-end p-4">
        <p className="max-w-[85%] font-body text-[11px] uppercase tracking-wide text-concrete-light/70">
          Photo à intégrer — {label}
        </p>
      </div>
    </div>
  );
}
