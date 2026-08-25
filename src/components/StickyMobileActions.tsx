import { company } from "@/data/company";
import Link from "next/link";

export function StickyMobileActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-paper lg:hidden">
      <a
        href={company.phone.officeHref}
        className="focus-ring flex items-center justify-center gap-2 border-r border-line py-4 text-sm font-semibold uppercase tracking-wide text-ink"
      >
        Appeler
      </a>
      <Link
        href="/contact/"
        className="focus-ring flex items-center justify-center gap-2 bg-accent py-4 text-sm font-semibold uppercase tracking-wide text-ink"
      >
        Devis
      </Link>
    </div>
  );
}
