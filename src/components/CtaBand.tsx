import Image from "next/image";
import { Button } from "./Button";
import { company } from "@/data/company";

/**
 * Appel à l'action de fin de page : bandeau jaune ou fond sombre sur photo,
 * avec « Demander une offre » et le numéro du bureau.
 */
export function CtaBand({
  title,
  kicker,
  variant = "yellow",
  image,
}: {
  title: string;
  kicker?: string;
  variant?: "yellow" | "dark";
  image?: string;
}) {
  const isDark = variant === "dark";
  return (
    <section className={`relative overflow-hidden ${isDark ? "bg-ink text-paper" : "bg-accent text-ink"}`}>
      {isDark && image ? (
        <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
      ) : null}
      <div className="container-wide relative flex flex-wrap items-center justify-between gap-8 py-16 sm:py-20">
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
          <h2 className="stretch-85 font-display text-[36px] font-black uppercase leading-[0.95] sm:text-[52px]">
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
