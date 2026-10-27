import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Reveal } from "./Reveal";

/**
 * Hero sombre des pages de premier niveau (services, réalisations,
 * entreprise, équipe, contact…) : fil d'Ariane, libellé jaune, très grand
 * titre condensé, introduction et, en option, un visuel à droite.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  aside,
  size = "lg",
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  size?: "lg" | "sm";
}) {
  return (
    <section className="bg-ink text-paper">
      <div className={`container-wide flex flex-wrap ${aside ? "items-stretch" : ""}`}>
        <div
          className={`flex min-w-0 flex-[1_1_520px] flex-col gap-7 ${
            size === "lg" ? "py-14 sm:py-20 lg:py-24" : "py-12 sm:py-16"
          } ${aside ? "lg:pr-14" : ""}`}
        >
          <Breadcrumb items={crumbs} />
          <Reveal className="flex flex-col gap-6">
            {eyebrow ? (
              <span className="self-start bg-accent px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] text-ink">
                {eyebrow}
              </span>
            ) : null}
            <h1
              className={`stretch-75 max-w-5xl font-display font-black uppercase leading-[0.9] ${
                size === "lg" ? "text-[40px] sm:text-[56px] lg:text-[72px]" : "text-[36px] sm:text-[48px]"
              }`}
            >
              {title}
            </h1>
            {intro ? <div className="max-w-2xl text-lg leading-relaxed text-concrete-light sm:text-xl">{intro}</div> : null}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </Reveal>
        </div>
        {aside ? (
          <div className="relative -mx-5 min-h-[320px] min-w-0 flex-[1_1_440px] sm:min-h-[420px] md:-mx-10 lg:mx-0 lg:-mr-10">
            <div className="absolute inset-0">{aside}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
