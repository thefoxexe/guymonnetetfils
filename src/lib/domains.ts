import { services, type Service } from "@/data/services";
import type { Project } from "@/data/projects";

/**
 * Domaines d'activité d'une réalisation, dans l'ordre de `project.services`.
 * Ce sont eux qui classent la réalisation (filtre de la page Réalisations,
 * étiquettes, « Type de travaux »), le premier étant le domaine principal.
 */
export function projectDomains(project: Project): Service[] {
  return project.services
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}

export function projectDomainNames(project: Project): string[] {
  return projectDomains(project).map((s) => s.name);
}
