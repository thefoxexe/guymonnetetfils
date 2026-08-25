/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // Export statique : le site n'a aucune logique serveur (pas de route API,
  // pas de contenu personnalisé par requête), tout est prérendu en HTML.
  // Publié directement comme fichiers statiques sur Netlify (dossier `out/`),
  // sans le runtime Next.js de Netlify — ça évite entièrement les soucis de
  // compatibilité de ce runtime avec Netlify Forms (voir REDIRECTS.md /
  // README.md pour le détail de l'erreur de build rencontrée).
  output: "export",
  images: {
    // L'optimisation d'image à la volée de Next.js nécessite un serveur ;
    // en export statique, les images sont servies telles quelles.
    unoptimized: true,
  },
};

module.exports = nextConfig;
