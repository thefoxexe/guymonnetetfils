import Link from "next/link";
import type { Project } from "@/data/projects";
import { projectCategoryLabels } from "@/data/projects";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { Reveal } from "./Reveal";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/realisations/${project.slug}/`}
      className="focus-ring group block border border-line bg-paper transition-colors duration-200 ease-editorial hover:border-ink"
    >
      <PhotoPlaceholder label={project.heroImageLabel} aspect="video" />
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-ink">
          {project.categories.map((c) => projectCategoryLabels[c]).join(" · ")}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink group-hover:text-accent-ink">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-concrete">
          {project.location}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-ink">
          Découvrir le chantier →
        </span>
      </div>
    </Link>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={(index % 3) * 80}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
