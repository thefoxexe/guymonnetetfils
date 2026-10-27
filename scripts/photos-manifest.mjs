// Liste les photos déposées dans public/photos/ et écrit
// src/data/photos-manifest.json. Lancé automatiquement avant `next dev` et
// `next build` (scripts predev/prebuild) : une photo nommée d'après son
// emplacement (ex. « domaine-transport-couverture.jpg ») remplace alors
// l'emplacement « Photo à définir » correspondant, sans toucher au code.
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "photos");
const extensions = /\.(webp|jpe?g|png|avif)$/i;

const files = existsSync(dir)
  ? readdirSync(dir)
      .filter((name) => extensions.test(name))
      .sort()
  : [];

writeFileSync(join(root, "src", "data", "photos-manifest.json"), JSON.stringify(files, null, 2) + "\n");
console.log(`photos-manifest : ${files.length} photo(s) trouvée(s) dans public/photos/`);
