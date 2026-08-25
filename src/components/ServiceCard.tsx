import Link from "next/link";
import type { Service } from "@/data/services";
import { ServiceImage } from "./ServiceImage";
import { Reveal } from "./Reveal";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}/`}
      className="focus-ring group block border border-line bg-paper transition-colors duration-200 ease-editorial hover:border-ink"
    >
      <ServiceImage service={service} aspect="video" />
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-ink group-hover:text-accent-ink">
          {service.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-concrete">{service.shortDescription}</p>
        <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-accent-ink">
          Découvrir →
        </span>
      </div>
    </Link>
  );
}

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Reveal key={service.slug} delay={(index % 3) * 80}>
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </div>
  );
}
