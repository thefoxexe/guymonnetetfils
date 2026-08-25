import Image from "next/image";
import type { Service } from "@/data/services";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const aspectClasses = {
  video: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  cinema: "aspect-[21/9]",
} as const;

/**
 * Affiche la vraie photo d'un service quand elle est disponible
 * (`service.heroImage`), sinon retombe sur PhotoPlaceholder. L'image est
 * recadrée en `object-cover` avec un point de focus configurable par
 * service (`imagePosition`) pour que le bon élément reste visible une fois
 * recadré, quel que soit le format d'affichage (carte, hero).
 */
export function ServiceImage({
  service,
  aspect = "wide",
  priority = false,
  className = "",
}: {
  service: Service;
  aspect?: keyof typeof aspectClasses;
  priority?: boolean;
  className?: string;
}) {
  if (!service.heroImage || !service.heroImageWidth || !service.heroImageHeight) {
    return (
      <PhotoPlaceholder
        label={service.heroImageLabel}
        aspect={aspect}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-anthracite ${aspectClasses[aspect]} ${className}`}>
      <Image
        src={service.heroImage}
        alt={service.heroImageLabel}
        width={service.heroImageWidth}
        height={service.heroImageHeight}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
        className={`h-full w-full object-cover transition-transform duration-300 ease-editorial group-hover:scale-105 ${
          service.imagePosition ?? "object-center"
        }`}
      />
    </div>
  );
}
