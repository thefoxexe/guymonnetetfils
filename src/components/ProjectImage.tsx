import Image from "next/image";
import type { Project } from "@/data/projects";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const aspectClasses = {
  video: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  cinema: "aspect-[21/9]",
} as const;

/**
 * Affiche la vraie photo d'une réalisation quand elle est disponible
 * (`project.heroImage`), sinon retombe sur PhotoPlaceholder. Même logique
 * que ServiceImage (recadrage `object-cover` + point de focus configurable).
 */
export function ProjectImage({
  project,
  aspect = "wide",
  priority = false,
  className = "",
}: {
  project: Project;
  aspect?: keyof typeof aspectClasses;
  priority?: boolean;
  className?: string;
}) {
  if (!project.heroImage || !project.heroImageWidth || !project.heroImageHeight) {
    return (
      <PhotoPlaceholder
        label={project.heroImageLabel}
        aspect={aspect}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-anthracite ${aspectClasses[aspect]} ${className}`}>
      <Image
        src={project.heroImage}
        alt={project.heroImageLabel}
        width={project.heroImageWidth}
        height={project.heroImageHeight}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
        className={`h-full w-full object-cover transition-transform duration-300 ease-editorial group-hover:scale-105 ${
          project.imagePosition ?? "object-center"
        }`}
      />
    </div>
  );
}
