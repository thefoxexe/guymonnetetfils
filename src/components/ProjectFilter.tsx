"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { projectCategoryLabels } from "@/data/projects";
import { ProjectGrid } from "./ProjectCard";

const filterOrder: ProjectCategory[] = [
  "genie-civil",
  "terrassement",
  "maconnerie",
  "amenagement",
  "environnement",
  "demolition",
];

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | "tous">("tous");

  const available = useMemo(
    () => filterOrder.filter((cat) => projects.some((p) => p.categories.includes(cat))),
    [projects]
  );

  const filtered = useMemo(
    () => (active === "tous" ? projects : projects.filter((p) => p.categories.includes(active))),
    [active, projects]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les réalisations par catégorie">
        <FilterButton label="Tous" active={active === "tous"} onClick={() => setActive("tous")} />
        {available.map((cat) => (
          <FilterButton
            key={cat}
            label={projectCategoryLabels[cat]}
            active={active === cat}
            onClick={() => setActive(cat)}
          />
        ))}
      </div>
      <div className="mt-12">
        {filtered.length > 0 ? (
          <ProjectGrid projects={filtered} />
        ) : (
          <p className="text-sm text-steel">Aucune réalisation dans cette catégorie pour le moment.</p>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring min-h-[44px] border-2 px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-[0.08em] transition-colors duration-150 ${
        active ? "border-ink bg-accent text-ink" : "border-ink/15 text-ink hover:border-ink"
      }`}
    >
      {label}
    </button>
  );
}
