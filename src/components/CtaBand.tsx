import { Button } from "./Button";
import { company } from "@/data/company";

/**
 * Appel à l'action de fin de page : bandeau jaune ou fond sombre,
 * avec « Demander une offre » et le numéro du bureau.
 */
export function CtaBand({
  title,
  kicker,
  variant = "yellow",
}: {
  title: string;
  kicker?: string;
  variant?: "yellow" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section className={`relative overflow-hidden ${isDark ? "bg-ink text-paper" : "bg-accent text-ink"}`}>
      <div className="container-wide relative flex flex-wrap items-center justify-between gap-6 py-12 sm:gap-8 sm:py-16">
        <div className="flex max-w-3xl flex-col gap-4">
          {kicker ? (
            <p
              className={`font-display text-[13px] font-extrabold uppercase tracking-[0.14em] sm:text-sm ${
                isDark ? "text-accent" : "text-ink"
              }`}
            >
              {kicker}
            </p>
          ) : null}
          <h2 className="stretch-85 font-display text-[28px] font-black uppercase leading-[0.95] sm:text-[40px]">
            {title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact/" variant={isDark ? "primary" : "dark"}>
            Demander une offre
          </Button>
          <Button href={company.phone.officeHref} variant={isDark ? "outline-light" : "outline"}>
            {company.phone.office}
          </Button>
        </div>
      </div>
    </section>
  );
}
