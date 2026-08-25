# REDIRECTS.md

## Où sont définies les redirections

Le site est un **export statique** (`output: "export"` dans
`next.config.js`, voir README.md) : Next.js ne tourne plus comme serveur en
production, donc les redirections ne peuvent plus être définies dans la
fonction `redirects()` de `next.config.js` (non supportée en export
statique). Elles sont à la place définies dans **`public/_redirects`**, au
format natif Netlify — copié tel quel dans `out/_redirects` au build, et
lu automatiquement par Netlify avant de servir les fichiers statiques.
Documentées de façon lisible dans `redirects.csv`
(colonnes `old_url,new_url,status,reason`).

Le site est configuré avec `trailingSlash: true` (toutes les URLs
canoniques se terminent par `/`, conformément à l'arborescence demandée :
`/services/transport/`, `/realisations/torrent-du-lue/`, etc.). Comme
`public/_redirects` est traité par Netlify **avant** que quoi que ce soit
d'autre n'intervienne, chaque ancienne URL (sans slash final, comme
`/general-2`) redirige directement vers sa nouvelle URL canonique en un
seul saut — aucune chaîne `301 → 301` possible ici, contrairement à un
`redirects()` Next.js combiné à `trailingSlash: true` (piège rencontré et
documenté dans une version antérieure de ce fichier, avant le passage à
l'export statique).

## Table de redirection complète

| Ancienne URL | Nouvelle URL | Statut |
|---|---|---|
| `/domaines-dactitivs` | `/services/transport/` | 301 |
| `/terrassement` | `/services/terrassement/` | 301 |
| `/genie-civil` | `/services/genie-civil/` | 301 |
| `/general-2` | `/services/maconnerie/` | 301 |
| `/amenagements-exterieurs` | `/services/amenagements-exterieurs/` | 301 |
| `/demolition` | `/services/demolition/` | 301 |
| `/revalorisation-des-materiaux` | `/services/revalorisation-materiaux/` | 301 |
| `/deneigement` | `/services/deneigement/` | 301 |
| `/pelles-araignees` | `/services/pelles-araignees/` | 301 |
| `/cours-d-eau` | `/services/cours-eau/` | 301 |
| `/sentiers-pedestres` | `/services/sentiers-pedestres/` | 301 |
| `/a-propos` | `/entreprise/` | 301 |
| `/nos-collaborateurs` | `/equipe/` | 301 |
| `/nouvelle-page` | `/realisations/torrent-du-lue/` | 301 |
| `/les-larmes-du-fou` | `/realisations/les-larmes-du-fou/` | 301 |
| `/le-sentier-des-sens` | `/realisations/sentier-des-sens/` | 301 |
| `/skatepark-riddes` | `/realisations/skatepark-riddes/` | 301 |
| `/evnementsvido` | `/entreprise/` | 301 |

## Cas non couverts / à surveiller

- **Galerie** : l'ancien site possédait une page galerie générique. Le
  nouveau site réutilise les photos directement dans les pages services,
  réalisations, entreprise et équipe (meilleure UX + SEO). Si l'URL exacte
  de l'ancienne galerie est retrouvée avant mise en production, ajouter une
  redirection vers `/realisations/`.
- **Pages non listées dans le brief** : un crawl complet de l'ancien site
  (`https://www.guy-monnet-transports.ch/`) doit être effectué avant la
  bascule en production pour vérifier qu'aucune URL indexée par Google
  n'a été oubliée. Toute URL supplémentaire découverte doit être ajoutée à
  `redirects.csv` et à `public/_redirects`.
- **www vs non-www / HTTP vs HTTPS** : à configurer au niveau de
  l'hébergement/DNS final (choisir une seule version canonique — voir
  SEO.md, section Canonicals).

## Comment tester après déploiement

Pour chaque ligne de `redirects.csv` :

```bash
curl -sIL https://www.guy-monnet-fils.ch/ANCIENNE-URL
```

Vérifier : un seul `301`/`308`, suivi d'un `200` sur la nouvelle URL.
