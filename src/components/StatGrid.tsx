import type { ProjectStat } from "@/data/projects";

/** Sépare « 3 500 m³ » en valeur (3 500) et unité (m³) pour la typographie. */
function splitValue(value: string) {
  const match = value.match(/^([\d\s'’.,]+)\s*(.*)$/);
  if (!match) return { number: value, unit: "" };
  return { number: match[1]!.trim(), unit: match[2]! };
}

/** Colonnes choisies pour que chaque ligne soit pleine (pas de case vide). */
function defaultColumns(count: number) {
  if (count % 3 === 0) return "sm:grid-cols-3";
  if (count % 4 === 0) return "sm:grid-cols-2 lg:grid-cols-4";
  if (count % 2 === 0) return "sm:grid-cols-2";
  return "sm:grid-cols-3";
}

/**
 * Grille de chiffres phares : cellules blanches séparées par des filets noirs,
 * gros chiffres condensés. `highlight` met une cellule en jaune.
 */
export function StatGrid({
  stats,
  highlight,
  columns,
  className = "",
}: {
  stats: ProjectStat[];
  highlight?: number;
  /** Classes de colonnes Tailwind, si le choix automatique ne convient pas. */
  columns?: string;
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-1 gap-[2px] border-2 border-ink bg-ink ${columns ?? defaultColumns(stats.length)} ${className}`}>
      {stats.map((stat, index) => {
        const { number, unit } = splitValue(stat.value);
        return (
          <div
            key={stat.label}
            className={`flex flex-col gap-2.5 px-6 py-7 sm:px-7 sm:py-8 ${index === highlight ? "bg-accent" : "bg-paper"}`}
          >
            <dt className={`text-sm leading-snug ${index === highlight ? "text-ink" : "text-steel"}`}>
              {stat.label}
            </dt>
            <dd className="stretch-75 order-first whitespace-nowrap font-display text-[48px] font-black leading-none text-ink sm:text-[60px]">
              {number}
              {unit ? <span className="text-[24px] sm:text-[28px]"> {unit}</span> : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
