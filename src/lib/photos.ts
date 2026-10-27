import manifest from "@/data/photos-manifest.json";

/**
 * Emplacements photo du site. Chaque emplacement a un nom fixe ; une photo
 * déposée dans `public/photos/` sous ce nom (extension libre : .jpg, .png,
 * .webp, .avif) s'affiche automatiquement au build suivant. Sans photo,
 * l'emplacement affiche « Photo à définir » avec le nom de fichier attendu.
 * Liste complète des emplacements : PHOTOS.md.
 */
const files = manifest as string[];

export function photoSrc(slot: string): string | undefined {
  const file = files.find((name) => name.replace(/\.[^.]+$/, "") === slot);
  return file ? `/photos/${file}` : undefined;
}

/** Nombre maximal de photos de galerie par réalisation. */
export const MAX_GALLERY_PHOTOS = 12;

export const slots = {
  homeCover: "accueil-couverture",
  companyCover: "entreprise-couverture",
  companyDepot2020: "entreprise-inauguration-depot-2020",
  companyDepot: "entreprise-depot-riddes",
  teamCover: "equipe-couverture",
  teamDirector: "equipe-frederic-monnet",
  serviceCover: (slug: string) => `domaine-${slug}-couverture`,
  serviceIllustration: (slug: string, n: number) => `domaine-${slug}-${n}`,
  projectCover: (slug: string) => `chantier-${slug}-couverture`,
  projectGallery: (slug: string, n: number) => `chantier-${slug}-${n}`,
};

/** Photos de galerie présentes pour une réalisation (chantier-<slug>-1, -2…). */
export function projectGallery(slug: string): { slot: string; src: string }[] {
  const found: { slot: string; src: string }[] = [];
  for (let n = 1; n <= MAX_GALLERY_PHOTOS; n++) {
    const slot = slots.projectGallery(slug, n);
    const src = photoSrc(slot);
    if (src) found.push({ slot, src });
  }
  return found;
}
