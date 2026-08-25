# REDIRECTS.md

## Où sont définies les redirections

Les redirections 301 sont implémentées dans `next.config.js` (fonction
`redirects()`), et documentées de façon lisible dans `redirects.csv`
(colonnes `old_url,new_url,status,reason`).

## Pourquoi `skipTrailingSlashRedirect` + doublon de sources

Le site est configuré avec `trailingSlash: true` (toutes les URLs
canoniques se terminent par `/`, conformément à l'arborescence demandée :
`/services/transport/`, `/realisations/torrent-du-lue/`, etc.).

Par défaut, Next.js redirige automatiquement toute URL sans slash final
vers sa version avec slash **avant** d'évaluer les redirections définies
dans `redirects()`. Comme les anciennes URLs Squarespace n'ont pas de slash
final (`/general-2`, `/nouvelle-page`, ...), cela produirait une chaîne
`301 → 301` (interdite par la règle « aucune chaîne de redirections », voir
section 90 du cahier des charges).

Pour éviter cette chaîne :

1. `skipTrailingSlashRedirect: true` désactive la redirection automatique
   de Next.js.
2. Chaque ancienne URL est déclarée deux fois dans `redirects()` (avec et
   sans slash final), pointant directement vers la nouvelle URL canonique.

Résultat vérifié (voir Phase 15 de la migration, testé avec `curl`) :
chaque ancienne URL redirige en **un seul saut (301)** vers sa nouvelle
URL, qui répond en `200`.

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
  `redirects.csv` et à `next.config.js`.
- **www vs non-www / HTTP vs HTTPS** : à configurer au niveau de
  l'hébergement/DNS final (choisir une seule version canonique — voir
  SEO.md, section Canonicals).

## Comment tester après déploiement

Pour chaque ligne de `redirects.csv` :

```bash
curl -sIL https://www.guy-monnet-fils.ch/ANCIENNE-URL
```

Vérifier : un seul `301`/`308`, suivi d'un `200` sur la nouvelle URL.
