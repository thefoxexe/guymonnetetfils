import { Reveal } from "./Reveal";

/** Sous-titre de bloc (« Le contexte », « Travaux réalisés »…) précédé d'un carré jaune. */
export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`flex items-center gap-2.5 font-display text-base font-extrabold uppercase text-ink sm:text-lg ${className}`}>
      <span className="h-2.5 w-2.5 shrink-0 bg-accent" aria-hidden="true" />
      {children}
    </h2>
  );
}

/**
 * Titre de section : court filet jaune puis titre condensé en capitales.
 * `action` s'aligne à droite (lien « Tout voir »…).
 */
export function SectionHeading({
  title,
  description,
  align = "left",
  tone = "light",
  action,
  as: Tag = "h2",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "light" = section à fond clair, "dark" = fond sombre. */
  tone?: "light" | "dark";
  action?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  const isDark = tone === "dark";
  const heading = (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span
        aria-hidden="true"
        className={`block h-1 w-12 bg-accent ${align === "center" ? "mx-auto" : ""}`}
      />
      <Tag
        className={`stretch-85 mt-4 font-display text-[28px] font-extrabold uppercase leading-[0.95] sm:text-[36px] lg:text-[44px] ${
          isDark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {description ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-[17px] ${isDark ? "text-mist" : "text-steel"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );

  return (
    <Reveal>
      {action ? (
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          {heading}
          <div className="min-w-0 max-w-full">{action}</div>
        </div>
      ) : (
        heading
      )}
    </Reveal>
  );
}
