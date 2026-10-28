import type { ProjectStat } from "@/data/projects";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

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
 * Grille de chiffres phares : cellules séparées par des filets noirs,
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
    <dl className={`grid grid-cols-1 border-l-2 border-t-2 border-ink ${columns ?? defaultColumns(stats.length)} ${className}`}>
      {stats.map((stat, index) => {
        const { number, unit } = splitValue(stat.value);
        return (
          <Reveal
            key={stat.label}
            delay={index * 90}
            className={`flex flex-col gap-2 border-b-2 border-r-2 border-ink px-4 py-5 sm:gap-2.5 sm:px-6 sm:py-7 ${index === highlight ? "bg-accent" : "bg-paper"}`}
          >
            <dt className={`text-[13px] leading-snug sm:text-sm ${index === highlight ? "text-ink" : "text-steel"}`}>
              {stat.label}
            </dt>
            <dd className="stretch-75 order-first whitespace-nowrap font-display text-[34px] font-black leading-none text-ink sm:text-[48px] lg:text-[56px]">
              <CountUp value={number} />
              {unit ? <span className="text-[18px] sm:text-[24px]"> {unit}</span> : null}
            </dd>
          </Reveal>
        );
      })}
    </dl>
  );
}
