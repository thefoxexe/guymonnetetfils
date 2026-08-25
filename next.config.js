/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // Next.js redirige automatiquement toute URL sans slash final vers sa
  // version avec slash AVANT d'évaluer les redirections personnalisées
  // ci-dessous. Comme les anciennes URLs (ex. /general-2) n'ont pas de slash
  // final, cela produirait une chaîne 301 → 301, interdite (voir REDIRECTS.md,
  // règle "aucune chaîne"). On désactive donc cette redirection automatique et
  // on gère nous-mêmes, en un seul saut, la redirection de chaque ancienne URL.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Chaque ancienne URL est déclarée avec et sans slash final : avec
    // trailingSlash:true, Next.js normalise sinon la requête en un premier
    // saut interne avant d'appliquer la redirection, ce qui produirait une
    // chaîne 301 → 301 (interdite, voir REDIRECTS.md). En déclarant les deux
    // formes, l'ancienne URL est redirigée en un seul saut vers sa nouvelle URL.
    const rules = [
      ["/domaines-dactitivs", "/services/transport/"],
      ["/terrassement", "/services/terrassement/"],
      ["/genie-civil", "/services/genie-civil/"],
      ["/general-2", "/services/maconnerie/"],
      ["/amenagements-exterieurs", "/services/amenagements-exterieurs/"],
      ["/demolition", "/services/demolition/"],
      ["/revalorisation-des-materiaux", "/services/revalorisation-materiaux/"],
      ["/deneigement", "/services/deneigement/"],
      ["/pelles-araignees", "/services/pelles-araignees/"],
      ["/cours-d-eau", "/services/cours-eau/"],
      ["/sentiers-pedestres", "/services/sentiers-pedestres/"],
      ["/a-propos", "/entreprise/"],
      ["/nos-collaborateurs", "/equipe/"],
      ["/nouvelle-page", "/realisations/torrent-du-lue/"],
      ["/les-larmes-du-fou", "/realisations/les-larmes-du-fou/"],
      ["/le-sentier-des-sens", "/realisations/sentier-des-sens/"],
      ["/skatepark-riddes", "/realisations/skatepark-riddes/"],
      ["/evnementsvido", "/entreprise/"],
    ];

    return rules.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
};

module.exports = nextConfig;
