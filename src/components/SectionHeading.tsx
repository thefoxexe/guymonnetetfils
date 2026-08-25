export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** "light" = section a un fond clair (paper/offwhite), "dark" = fond sombre (ink/anthracite). */
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-content text-center" : "max-w-content"}>
      {eyebrow ? (
        <p
          className={`font-body text-xs font-semibold uppercase tracking-[0.18em] ${
            isDark ? "text-accent" : "text-accent-ink"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 font-display text-3xl font-semibold leading-[1.1] sm:text-4xl ${
          isDark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-concrete-light" : "text-concrete"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
