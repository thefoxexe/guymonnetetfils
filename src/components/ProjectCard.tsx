import Link from "next/link";
import type { Project } from "@/data/projects";
import { projectCategoryLabels } from "@/data/projects";
import { Photo } from "./Photo";
import { slots } from "@/lib/photos";
import { Reveal } from "./Reveal";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/realisations/${project.slug}/`} className="focus-ring group flex flex-col text-ink">
      <span className="relative block overflow-hidden">
        <Photo
          slot={slots.projectCover(project.slug)}
          label={project.heroImageLabel}
          aspect="video"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imageClassName="transition-transform duration-500 ease-editorial group-hover:scale-105"
        />
        {project.year ? (
          <span className="absolute left-4 top-4 bg-accent px-2.5 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink">
            {project.year}
          </span>
        ) : null}
        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-editorial group-hover:scale-x-100" />
      </span>
      <span className="flex flex-col gap-1.5 pt-5">
        <span className="font-display text-xs font-extrabold uppercase tracking-[0.12em] text-accent-ink">
          {project.categories.map((c) => projectCategoryLabels[c]).join(" · ")}
        </span>
        <span className="stretch-85 font-display text-[26px] font-extrabold uppercase leading-none transition-colors group-hover:text-accent-ink">
          {project.title}
        </span>
        <span className="text-[15px] text-steel">{project.location}</span>
        <span className="mt-2 text-sm font-bold">
          Découvrir le chantier <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={(index % 3) * 80}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}
