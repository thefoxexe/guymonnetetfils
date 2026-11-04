// Liste les photos déposées dans public/photos/ (sous-dossiers compris, par
// exemple un dossier par chantier) et écrit
// src/data/photos-manifest.json. Lancé automatiquement avant `next dev` et
// `next build` (scripts predev/prebuild) : une photo nommée d'après son
// emplacement (ex. « domaine-transport-couverture.jpg ») remplace alors
// l'emplacement « Photo à définir » correspondant, sans toucher au code.
import { readdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "photos");
// Photos et vidéos (une vidéo MP4/WebM se lit automatiquement, sans le son).
const extensions = /\.(webp|jpe?g|png|avif|mp4|webm)$/i;

// Chemins relatifs à public/photos/, avec « / » comme séparateur.
function list(folder, prefix = "") {
  return readdirSync(folder).flatMap((name) => {
    const full = join(folder, name);
    if (statSync(full).isDirectory()) return list(full, `${prefix}${name}/`);
    return extensions.test(name) ? [`${prefix}${name}`] : [];
  });
}

const files = existsSync(dir) ? list(dir).sort() : [];

writeFileSync(join(root, "src", "data", "photos-manifest.json"), JSON.stringify(files, null, 2) + "\n");
console.log(`photos-manifest : ${files.length} fichier(s) trouvé(s) dans public/photos/`);
