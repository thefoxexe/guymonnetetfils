import { Button } from "./Button";
import { company } from "@/data/company";

export function CTASection() {
  return (
    <section className="bg-ink py-20 text-paper">
      <div className="container-wide flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-content">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            Un projet en Valais ?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-concrete-light">
            Terrassement, génie civil, transport, construction ou aménagement : parlez-nous de
            votre projet.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact/" variant="primary">
            Demander un devis
          </Button>
          <a
            href={company.phone.officeHref}
            className="focus-ring inline-flex items-center justify-center border border-paper/40 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-paper hover:border-paper"
          >
            {company.phone.office}
          </a>
        </div>
      </div>
    </section>
  );
}
