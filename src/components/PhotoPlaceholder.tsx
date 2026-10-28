type PhotoPlaceholderProps = {
  label: string;
  /** Nom de l'emplacement : affiché comme nom de fichier attendu. */
  slot?: string;
  aspect?: "video" | "square" | "portrait" | "wide" | "cinema" | "fill";
  tone?: "light" | "dark";
  /**
   * "center" : étiquette au centre ; "corner" : en haut à droite ;
   * "badge" : petite étiquette en bas à droite (photo de fond avec texte par-dessus).
   */
  layout?: "center" | "corner" | "badge";
  className?: string;
};

const aspectClasses: Record<NonNullable<PhotoPlaceholderProps["aspect"]>, string> = {
  video: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  cinema: "aspect-[21/9]",
  fill: "h-full",
};

/**
 * Emplacement photo « à définir » : hachures, description de la photo
 * attendue et nom du fichier à déposer dans public/photos/ pour la remplacer.
 */
export function PhotoPlaceholder({
  label,
  slot,
  aspect = "wide",
  tone = "light",
  layout = "center",
  className = "",
}: PhotoPlaceholderProps) {
  const isDark = tone === "dark";
  if (layout === "badge") {
    return (
      <div
        role="img"
        aria-label={`Photo à définir : ${label}`}
        data-photo-slot={slot}
        className={`${isDark ? "hatch-dark" : "hatch"} relative w-full overflow-hidden ${aspectClasses[aspect]} ${className}`}
      >
        <span className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-accent px-2 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.1em] text-ink sm:bottom-4 sm:right-4">
          ■ Photo à définir
          {slot ? <span className="font-mono font-normal normal-case tracking-normal">{slot}.jpg</span> : null}
        </span>
      </div>
    );
  }
  const tag = (
    <div className={`flex max-w-xs flex-col gap-2 ${layout === "center" ? "items-center text-center" : "items-end text-right"}`}>
      <span className="bg-accent px-2.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink">
        ■ Photo à définir
      </span>
      <span className={`text-[13px] leading-snug ${isDark ? "text-mist" : "text-steel"}`}>{label}</span>
      {slot ? (
        <span className={`font-mono text-[11px] ${isDark ? "text-concrete-light/70" : "text-steel/80"}`}>{slot}.jpg</span>
      ) : null}
    </div>
  );
  return (
    <div
      role="img"
      aria-label={`Photo à définir : ${label}`}
      data-photo-slot={slot}
      className={`${isDark ? "hatch-dark" : "hatch"} relative flex w-full overflow-hidden p-6 ${
        layout === "center" ? "items-center justify-center" : "items-start justify-end"
      } ${aspectClasses[aspect]} ${className}`}
    >
      {tag}
    </div>
  );
}
