import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const staticPaths = [
    "/",
    "/entreprise/",
    "/services/",
    "/realisations/",
    "/equipe/",
    "/contact/",
    "/mentions-legales/",
    "/confidentialite/",
  ];

  const servicePaths = services.map((s) => `/services/${s.slug}/`);
  const projectPaths = projects.map((p) => `/realisations/${p.slug}/`);

  const all = [...staticPaths, ...servicePaths, ...projectPaths];

  return all.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services/") || path.startsWith("/realisations/") ? 0.8 : 0.6,
  }));
}
