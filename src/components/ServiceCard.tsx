import Link from "next/link";
import type { Service } from "@/data/services";
import { services as allServices } from "@/data/services";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { slots } from "@/lib/photos";

/** Numéro d'un domaine dans la liste complète (« 03 »). */
export function serviceNumber(service: Service) {
  return String(allServices.findIndex((s) => s.slug === service.slug) + 1).padStart(2, "0");
}

/**
 * Tuile photo d'un domaine d'activité : photo plein cadre, dégradé sombre,
 * numéro, nom en capitales et carré jaune fléché. Au survol, la photo
 * zoome légèrement et un filet jaune apparaît en pied de tuile.
 */
export function ServiceCard({ service, tall = false }: { service: Service; tall?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}/`}
      className={`focus-ring group relative block overflow-hidden bg-anthracite text-paper ${
        tall ? "h-[380px] sm:h-[420px]" : "h-[300px] sm:h-[340px]"
      }`}
    >
      <Photo
        slot={slots.serviceCover(service.slug)}
        label={service.heroImageLabel}
        alt=""
        aspect="fill"
        tone="dark"
        layout="corner"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        imageClassName="transition-transform duration-500 ease-editorial group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/30 to-ink/90" />
      <span className="absolute left-5 top-5 bg-ink/85 px-2 py-1 font-display text-sm font-extrabold text-accent">
        {serviceNumber(service)}
      </span>
      <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
        <span>
          <span className="stretch-85 block font-display text-[26px] font-extrabold uppercase leading-none sm:text-[28px]">
            {service.name}
          </span>
          <span className="mt-2 block max-h-0 overflow-hidden text-sm leading-snug text-concrete-light opacity-0 transition-all duration-300 ease-editorial group-hover:max-h-16 group-hover:opacity-100 group-focus-visible:max-h-16 group-focus-visible:opacity-100">
            {service.shortDescription}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent font-bold text-ink transition-colors duration-200 group-hover:bg-paper"
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
