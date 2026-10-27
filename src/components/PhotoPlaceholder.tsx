type PhotoPlaceholderProps = {
  label: string;
  aspect?: "video" | "square" | "portrait" | "wide" | "cinema" | "fill";
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
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
 * Emplacement photo « à définir » (décision de la séance client) : hachures
 * bien visibles + description de la photo attendue, pour que le client repère
 * immédiatement où il doit fournir une image. Aucune image stock.
 */
export function PhotoPlaceholder({
  label,
  aspect = "wide",
  tone = "light",
  className = "",
  priority = false,
}: PhotoPlaceholderProps) {
  const isDark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Photo à définir : ${label}`}
      data-photo-needed={label}
      data-priority={priority || undefined}
      className={`${isDark ? "hatch-dark" : "hatch"} relative flex w-full items-center justify-center overflow-hidden p-6 ${aspectClasses[aspect]} ${className}`}
    >
      <div className="flex max-w-xs flex-col items-center gap-2 text-center">
        <span className="bg-accent px-2.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink">
          ■ Photo à définir
        </span>
        <span className={`text-[13px] leading-snug ${isDark ? "text-mist" : "text-steel"}`}>{label}</span>
      </div>
    </div>
  );
}
