"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { services } from "@/data/services";
import { ProjectGrid } from "./ProjectCard";

/** Filtre des réalisations par domaine d'activité (`project.services`). */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("tous");

  const available = useMemo(
    () => services.filter((service) => projects.some((p) => p.services.includes(service.slug))),
    [projects]
  );

  const filtered = useMemo(
    () => (active === "tous" ? projects : projects.filter((p) => p.services.includes(active))),
    [active, projects]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les réalisations par domaine">
        <FilterButton label="Tous" active={active === "tous"} onClick={() => setActive("tous")} />
        {available.map((service) => (
          <FilterButton
            key={service.slug}
            label={service.name}
            active={active === service.slug}
            onClick={() => setActive(service.slug)}
          />
        ))}
      </div>
      <div className="mt-10 sm:mt-12">
        {filtered.length > 0 ? (
          <ProjectGrid key={active} projects={filtered} />
        ) : (
          <p className="text-sm text-steel">Aucune réalisation dans ce domaine pour le moment.</p>
        )}
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring min-h-[44px] border-2 px-4 py-2 font-display text-[13px] font-extrabold uppercase tracking-[0.06em] transition-colors duration-150 sm:px-5 sm:text-sm ${
        active ? "border-ink bg-accent text-ink" : "border-ink/15 text-ink hover:border-ink"
      }`}
    >
      {label}
    </button>
  );
}
