import { Reveal } from "./Reveal";

/**
 * Libellé de section numéroté (« 01 / Le contexte ») suivi d'un titre
 * condensé en capitales. `action` s'aligne à droite (lien « Tout voir »…).
 */
export function SectionLabel({
  index,
  children,
  tone = "light",
  className = "",
}: {
  index?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`font-display text-[13px] font-extrabold uppercase tracking-[0.14em] sm:text-sm ${
        tone === "dark" ? "text-accent" : "text-accent-ink"
      } ${className}`}
    >
      {index ? `${index} / ` : null}
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  action,
  as: Tag = "h2",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "light" = section à fond clair (paper/offwhite), "dark" = fond sombre (ink). */
  tone?: "light" | "dark";
  action?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  const isDark = tone === "dark";
  const heading = (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <SectionLabel index={index} tone={tone}>
          {eyebrow}
        </SectionLabel>
      ) : null}
      <Tag
        className={`stretch-85 mt-3 font-display text-[28px] font-extrabold uppercase leading-[0.95] sm:text-[36px] lg:text-[44px] ${
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

/** Numérotation automatique des sections présentes sur une page (01, 02…). */
export function sectionCounter() {
  let n = 0;
  return () => String(++n).padStart(2, "0");
}
