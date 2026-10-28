import Link from "next/link";
import type { Service } from "@/data/services";
import { Reveal } from "./Reveal";
import { Photo, hasPhoto } from "./Photo";
import { slots } from "@/lib/photos";

/**
 * Tuile d'un domaine d'activité : nom en capitales, courte
 * description et carré jaune fléché ; filet jaune en pied de tuile au survol.
 */
export function ServiceCard({ service }: { service: Service }) {
  const slot = slots.serviceCover(service.slug);
  const withPhoto = hasPhoto(slot);

  // Sans photo : tuile claire (fond hachuré clair, texte noir) pour garder
  // un site lumineux. Avec photo : photo plein cadre et dégradé sombre.
  return (
    <Link
      href={`/services/${service.slug}/`}
      className={`focus-ring group relative block h-[190px] overflow-hidden sm:h-[300px] ${
        withPhoto ? "bg-anthracite text-paper" : "border border-line bg-paper text-ink hover:border-ink"
      }`}
    >
      {withPhoto ? (
        <>
          <Photo
            slot={slot}
            label={service.heroImageLabel}
            alt=""
            aspect="fill"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            imageClassName="transition-transform duration-500 ease-editorial group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/30 to-ink/90" />
        </>
      ) : (
        <span className="hatch absolute inset-0" aria-hidden="true">
          <span className="absolute right-4 top-4 bg-accent px-2 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink sm:right-5 sm:top-5">
            ■ Photo à définir
          </span>
        </span>
      )}
      <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-5 sm:bottom-5">
        <span>
          <span className="stretch-85 block font-display text-[24px] font-extrabold uppercase leading-none sm:text-[28px]">
            {service.name}
          </span>
          <span
            className={`mt-1.5 block text-sm leading-snug ${withPhoto ? "text-concrete-light" : "text-steel"}`}
          >
            {service.shortDescription}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent font-bold text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-accent"
        >
          →
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-editorial group-hover:scale-x-100" />
    </Link>
  );
}

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {services.map((service, index) => (
        <Reveal key={service.slug} delay={(index % 3) * 80}>
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </div>
  );
}
