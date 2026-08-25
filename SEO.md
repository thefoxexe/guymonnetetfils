# SEO.md

## Architecture en silos

Le site est structuré en clusters thématiques centrés sur les pages piliers
`/services/*`, chacune reliée aux réalisations qui la démontrent
concrètement (maillage interne) :

- **Génie civil** (`/services/genie-civil/`) → Torrent du Lué, Les Larmes du
  Fou, Sentier des Sens (génie civil), cours d'eau, sentiers.
- **Terrassement** (`/services/terrassement/`) → Skatepark de Riddes,
  références bâtiments/villas/infrastructures.
- **Maçonnerie** (`/services/maconnerie/`) → Sentier des Sens (pont béton
  apparent), Padel de Riddes, station phytosanitaire, chalet, réservoir,
  garage (références textuelles en attendant des pages dédiées).

Chaque page service liste ses réalisations associées, ses services associés
et sa zone d'intervention (voir `src/data/services.ts`,
`relatedServices` / `relatedProjects`). Chaque page réalisation liste les
services mobilisés (`src/data/projects.ts`, `services`). Aucun maillage
n'invente un service qui n'a pas réellement été utilisé sur le chantier
concerné.

## Mots-clés

Travaillés naturellement dans les titres, H1/H2 et paragraphes d'intro,
sans keyword stuffing :

- **Niveau 1** : génie civil Valais, entreprise génie civil Valais,
  terrassement Valais, entreprise terrassement Valais, entreprise
  construction Valais.
- **Niveau 2** : génie civil Riddes, terrassement Riddes, transport
  matériaux Valais, camion-grue Valais, démolition Valais, maçonnerie
  Valais, aménagement extérieur Valais, pelle araignée Valais, déneigement
  Valais, travaux publics Valais.
- **Niveau 3 (longue traîne)** : construite à partir des réalisations
  réelles (ex. « terrassement La Tzoumaz » via la page Skatepark de Riddes,
  « travaux cours d'eau Valais » via Les Larmes du Fou), plutôt que par des
  pages locales dupliquées (voir SEO local ci-dessous).

## SEO local

Entité géographique principale : **Riddes, Valais**. Les communes citées
dans les références (Isérables, La Tzoumaz, Leytron, Ardon, Nendaz,
Chamoson, Saillon, Sion, Ovronnaz, Pont-de-la-Morge, Saxon) ne font
**volontairement pas** l'objet de pages génériques dupliquées
(`/terrassement-sion/`, etc.) : elles sont renforcées uniquement via les
vraies pages de réalisations et les références citées dans chaque page
service, ce qui est plus crédible et plus robuste pour le SEO.

## Titles et meta descriptions

Chaque page a un `title` et une `description` uniques, définis dans le
fichier de la page via `buildMetadata()` (`src/lib/seo.ts`), repris depuis
le brief (section 39 du cahier des charges) pour les pages principales. Les
pages services et réalisations utilisent les champs `seoTitle` /
`seoDescription` définis dans `src/data/services.ts` et
`src/data/projects.ts`.

## H1 et hiérarchie de titres

Un seul H1 par page, contenant systématiquement un contexte métier
compréhensible (ex. « Génie civil en Valais » plutôt qu'un simple slogan).
Le hero de la page d'accueil utilise un habillage graphique
(« Construire. Transporter. Aménager. ») distinct du H1 réel, qui reste
« Génie civil, terrassement et transport en Valais », conformément à la
section 8 du cahier des charges.

## Données structurées (JSON-LD)

Implémentées via `src/lib/seo.ts` + `src/components/JsonLd.tsx` :

- **Organization** + **LocalBusiness** (`GeneralContractor`) +
  **WebSite** : injectées globalement dans `src/app/layout.tsx`.
- **BreadcrumbList** : injectée automatiquement par le composant
  `Breadcrumb`, présent sur toutes les pages sauf l'accueil.
- **Service** : injectée sur chaque page `/services/[slug]/`.

Toutes les données reflètent le contenu réellement visible sur la page (nom,
description, adresse) — aucun faux avis, aucune fausse note n'est généré.

## Canonicals

Chaque page définit une canonical auto-référente via
`alternates.canonical` dans `buildMetadata()`. Le site est construit en
`trailingSlash: true` pour une forme d'URL unique et cohérente
(`/services/transport/`) ; le choix final entre `www.` et le domaine nu, et
la version HTTPS forcée, doivent être réglés au niveau de l'hébergement/DNS
définitif (non déterminable depuis le code applicatif seul).

## Sitemap et robots

- `src/app/sitemap.ts` génère `/sitemap.xml` avec uniquement les pages
  indexables (accueil, entreprise, services + 11 pages service,
  réalisations + pages réalisation, équipe, contact, mentions légales,
  confidentialité).
- `src/app/robots.ts` génère `/robots.txt`, autorise tout le crawl utile et
  référence le sitemap.

## Images

Aucune image stock n'est utilisée. Les emplacements photo utilisent le
composant `PhotoPlaceholder`, avec :

- un `alt`/`aria-label` descriptif dès la conception (ex. « Chantier du
  Torrent du Lué : route en réfection et pose de conduites »), prêt à être
  porté sur la vraie image lors de la migration ;
- une convention de nommage de fichier définie dans `IMAGE_INVENTORY.csv`
  (ex. `genie-civil-torrent-lue-riddes-01.avif`), en remplacement des noms
  de type `IMG_7881.jpg`.

Une fois les vraies photos disponibles, remplacer `PhotoPlaceholder` par
`next/image` (déjà configuré pour AVIF/WebP dans `next.config.js`) avec
`sizes`/`srcset` responsive, dimensions explicites et lazy loading (sauf
image hero/LCP, à charger en priorité via `priority`).

## Accessibilité des couleurs

La palette de marque (jaune `#EAB308`, échantillonné depuis le logo
officiel) est claire : utilisée comme couleur de **texte** sur fond clair,
son contraste tombe sous le seuil WCAG AA (~1.9:1). Le design system
distingue donc deux tokens (`tailwind.config.ts`) :

- `accent` (jaune de marque) : fonds de boutons/badges, bordures,
  soulignements décoratifs, et texte **uniquement sur fond sombre** (footer,
  sections anthracite) où son contraste est excellent (~9:1).
- `accent-ink` (dérivé bronze/doré, `#8A5A0A`) : tout texte coloré sur fond
  clair (labels, liens, survols) — contraste ~5.9:1, conforme AA.

Le composant `SectionHeading` expose une prop `tone` (`"light"` par défaut,
`"dark"` pour les sections à fond sombre) qui bascule automatiquement entre
les deux tokens.

L'anneau de focus clavier (`.focus-ring` dans `globals.css`) utilise un
double anneau clair + foncé plutôt qu'une couleur unique, pour rester
visible (≥3:1, WCAG 2.4.11) aussi bien sur les sections claires que sur les
sections sombres du site.

## E-E-A-T

La crédibilité du site repose uniquement sur des preuves vérifiables :
année de création (1980), création de la SA (2009), nombre de
collaborateurs, liste de références de chantiers réels avec lieux et
chiffres techniques (ex. 905 m de conduite en fonte, 680 t d'enrobé pour le
Torrent du Lué). Aucune formule marketing non étayée (« leader
incontournable », « meilleur du Valais ») n'est utilisée.

## Prochaines étapes SEO (post-lancement)

1. Ajouter le site à Google Search Console, soumettre `/sitemap.xml`.
2. Inspecter l'indexation de l'accueil, des pages services et réalisations.
3. Surveiller les 404, les pages exclues et les Core Web Vitals.
4. Publier régulièrement une nouvelle page `/realisations/[slug]/` pour
   chaque chantier terminé disposant de suffisamment de contenu (texte,
   chiffres, photos) — c'est le principal levier de développement de
   l'autorité géographique du domaine dans la durée.
