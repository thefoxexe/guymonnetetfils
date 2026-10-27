import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/**
 * Fil d'Ariane intégré aux heros. « Accueil » est ajouté en tête pour les
 * données structurées et la navigation.
 */
export function Breadcrumb({ items, tone = "dark" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const full: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];
  const isDark = tone === "dark";
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] ${isDark ? "text-concrete-light" : "text-steel"}`}>
        {full.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2.5">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {index === full.length - 1 ? (
              <span className={isDark ? "text-paper" : "text-ink"} aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className={`focus-ring underline-offset-4 hover:underline ${isDark ? "hover:text-accent" : "hover:text-accent-ink"}`}
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbJsonLd(full)} />
    </nav>
  );
}
