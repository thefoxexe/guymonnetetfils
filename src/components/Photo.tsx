import Image from "next/image";
import { photoSrc } from "@/lib/photos";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const aspectClasses = {
  video: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
  fill: "absolute inset-0",
} as const;

/**
 * Photo d'un emplacement nommé (voir src/lib/photos.ts) : la photo déposée
 * dans public/photos/ si elle existe, sinon l'emplacement « Photo à définir ».
 * `aspect="fill"` remplit le parent (qui doit être positionné).
 */
export function Photo({
  slot,
  label,
  alt,
  aspect = "video",
  tone = "light",
  layout = "center",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  imageClassName = "",
}: {
  slot: string;
  /** Description de la photo attendue (aussi utilisée comme texte alternatif). */
  label: string;
  alt?: string;
  aspect?: keyof typeof aspectClasses;
  tone?: "light" | "dark";
  layout?: "center" | "corner" | "badge";
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}) {
  const src = photoSrc(slot);
  const box = aspect === "fill" ? aspectClasses.fill : `relative w-full ${aspectClasses[aspect]}`;

  if (!src) {
    return (
      <div className={`${box} ${className}`}>
        <PhotoPlaceholder label={label} slot={slot} aspect="fill" tone={tone} layout={layout} />
      </div>
    );
  }

  return (
    <div className={`${box} overflow-hidden bg-anthracite ${className}`}>
      <Image
        src={src}
        alt={alt ?? label}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}

/** Indique si une photo existe pour cet emplacement (pour adapter la mise en page). */
export function hasPhoto(slot: string) {
  return Boolean(photoSrc(slot));
}
