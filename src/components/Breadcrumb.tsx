import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className="border-b border-line bg-paper">
      <div className="container-wide">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-xs text-concrete">
          {full.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === full.length - 1 ? (
                <span className="text-ink" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="focus-ring hover:text-accent-ink">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      <JsonLd data={breadcrumbJsonLd(full)} />
    </nav>
  );
}
