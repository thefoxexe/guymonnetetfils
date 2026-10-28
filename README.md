# Guy Monnet & Fils SA — Site web

Refonte complète du site de Guy Monnet & Fils SA (Riddes, Valais),
entreprise familiale active depuis 1980 en génie civil, terrassement,
transport et construction.

## Stack technique

- **Next.js 14** (App Router) + **TypeScript**, en **export statique**
  (`output: "export"` dans `next.config.js`) : `npm run build` génère un
  dossier `out/` de fichiers HTML/CSS/JS purement statiques, sans serveur
  Next.js ni fonctions serverless en production. Le site n'a aucune
  logique dépendant d'une requête (pas de route API, pas de contenu
  personnalisé), donc rien ne justifie un serveur applicatif — juste de
  l'hébergement statique, plus simple et plus robuste à déployer.
- **Tailwind CSS** — design system (couleurs, typographies, espacements)
  centralisé dans `tailwind.config.ts` et `src/app/globals.css`.
- Pas de CMS, pas de base de données : le contenu est structuré dans
  `src/data/*.ts` (voir « Modèle de données » ci-dessous), simple à éditer
  pour un développeur sans introduire de complexité inutile pour un site
  vitrine.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Site disponible sur http://localhost:3000.

## Build de production

```bash
npm run build   # génère le dossier out/ (fichiers statiques)
npm run start   # sert out/ en local pour prévisualiser (via `serve`)
```

`next start` ne fonctionne pas avec `output: "export"` — `npm run start`
lance donc `serve out` à la place, qui reproduit fidèlement un hébergement
statique (c'est aussi ce que fait Netlify en production).

## Vérifications

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint (next/core-web-vitals)
```

## Déploiement

Le site est déployé sur **Netlify**, en pur export statique — sans le
runtime Next.js de Netlify (`@netlify/plugin-nextjs`), qui n'est ni
nécessaire (le site n'a pas de logique serveur) ni compatible avec la
configuration Netlify Forms utilisée ici (voir « Pourquoi pas le runtime
Next.js de Netlify » ci-dessous).

Configuration (`netlify.toml`) :

```toml
[build]
  command = "npm run build"
  publish = "out"
```

Aucun plugin à déclarer. Les redirections vivent dans `public/_redirects`
(voir `REDIRECTS.md`), copié tel quel dans `out/` au build et lu
automatiquement par Netlify.

Avant la mise en production :

1. Mettre à jour `company.siteUrl` dans `src/data/company.ts` avec le nom
   de domaine définitif.
2. Choisir la version canonique du domaine (`www.` ou nu) et forcer HTTPS
   au niveau de l'hébergement/DNS (voir `SEO.md`, section Canonicals).

### Pourquoi pas le runtime Next.js de Netlify

Une première version de ce projet utilisait le runtime Next.js standard de
Netlify (`@netlify/plugin-nextjs`, avec fonctions serverless). Le build a
échoué avec cette erreur :

```
Plugin "@netlify/plugin-nextjs" failed.
Error: Failed assembling prerendered content for upload.
@netlify/plugin-nextjs@5 requires migration steps to support Netlify Forms.
```

Ce runtime a des exigences de migration spécifiques pour que Netlify Forms
détecte un formulaire sur une page prérendue. Comme ce site est
**entièrement statique** (aucune page ne dépend d'une requête), la solution
la plus simple et la plus robuste était de passer en export statique pur
(`output: "export"`) : Netlify Forms fonctionne alors nativement, sans
runtime ni migration, en scannant directement le HTML de `out/`.
3. Vérifier chaque point de `CONTENT_VALIDATION.md` avec le client.
4. Déposer les photos dans `public/photos/` sous les noms listés dans
   `PHOTOS.md` : elles remplacent automatiquement les emplacements.

## Structure du projet

```
src/
  app/                  routes (App Router), une route = une page
    services/[slug]/    template unique pour les 11 services
    realisations/[slug]/template unique pour les réalisations
  components/           composants réutilisables (Header, Footer, cartes...)
  data/                  données du site : company, services, projects, team
  lib/seo.ts             helpers metadata + JSON-LD
public/                  fichiers statiques (favicon, logo placeholder)
```

## Modèle de données

- `src/data/company.ts` — coordonnées, adresse, horaires (source unique,
  utilisée partout pour garantir la cohérence NAP — voir SEO.md).
- `src/data/services.ts` — les 11 services (texte, prestations, références,
  SEO, maillage interne).
- `src/data/projects.ts` — les réalisations publiées + liste des futures
  réalisations possibles.
- `src/data/team.ts` — l'équipe, par groupe.

Ajouter un service ou une réalisation ne nécessite pas de nouvelle page :
il suffit d'ajouter une entrée dans le tableau `services` ou `projects`,
le template génère automatiquement la page à la bonne URL
(`generateStaticParams`).

## Contenu et exactitude des faits

Ce site a été construit à partir du contenu réel de l'ancien site
(`guy-monnet-transports.ch`), tel que fourni dans le brief de refonte.
**Aucune information factuelle (machine, collaborateur, client, année,
volume, référence) n'a été inventée.** Chaque donnée incertaine ou
contradictoire entre deux anciennes pages est marquée `TODO:` directement
dans le contenu du site et listée dans `CONTENT_VALIDATION.md`.

## Documents livrés

- `README.md` — ce document.
- `CONTENT_VALIDATION.md` — questions ouvertes à valider avec le client
  avant mise en production.
- `SEO.md` — architecture SEO, metadata, données structurées.
- `REDIRECTS.md` — explication de la stratégie de migration des URLs.
- `redirects.csv` — table de redirection 301 complète.
- `PHOTOS.md` : liste de tous les emplacements photo du site, avec le nom
  de fichier attendu et la photo souhaitée.

## Marque et couleurs

Le header et le footer utilisent le logo officiel complet transmis par le
client (`public/logo-guy-monnet-officiel.png` sur fond blanc pour le header,
`public/logo-guy-monnet-officiel-transparent.png` détouré pour le footer
sombre). Le favicon utilise la pelleteuse officielle seule (`public/favicon.ico`,
`icon-32.png`, `icon-64.png`, `icon-192.png`, `apple-icon-180.png`), seule
version lisible à la taille d'une icône d'onglet. Les fichiers sources
officiels sont conservés dans `brand-assets/` (`logo-officiel-source.png`,
`pelleteuse-source.webp`). La palette
(`tailwind.config.ts`) est
calculée par échantillonnage réel des couleurs du logo : jaune de marque
`accent` (#EAB308) pour les fonds/boutons/bordures, et un dérivé foncé
`accent-ink` (#8A5A0A) pour tout texte coloré — le jaune de marque n'est
jamais utilisé comme couleur de texte seule car son contraste sur fond
clair est insuffisant (WCAG). Sur fond sombre (footer, sections
anthracite), le jaune de marque est utilisé directement en texte : son
contraste y est excellent. Voir `CONTENT_VALIDATION.md`, section 9, pour
la marche à suivre si un fichier de logo vectoriel/haute résolution est
disponible.

Le fond du site (`paper`, `tailwind.config.ts`) est un blanc pur (#FFFFFF),
identique au fond du logo, pour qu'aucune bordure ne se voie autour du
logo dans le header (header en fond plein, sans transparence).

## Direction artistique

Le site entier suit la DA validée à partir des fiches types (maquettes
« Fiches types Guy Monnet ») : une identité « chantier » directement
dérivée du logo.

- **Titres** : Archivo en police variable, condensée (`.stretch-75`,
  `.stretch-85`, `.stretch-90` dans `globals.css`), graisse 800–900, en
  capitales. Texte courant en Inter.
- **Bandeau de marque** (`BrandBand`) : le liseré pointillé noir/jaune et
  le bandeau jaune « ■ MOT-CLÉ ■ MOT-CLÉ » du logo, placé sous chaque hero.
- **Titres de section** (`SectionHeading`) : court filet jaune puis titre
  condensé, sans numérotation ; alternance fond blanc et `offwhite`.
- **Animations** : apparition progressive au scroll (`Reveal`) et chiffres
  qui montent de 0 à leur valeur (`CountUp`) ; désactivées si l'appareil
  demande de réduire les animations.
- **Chiffres phares** (`StatGrid`) : grandes valeurs condensées dans une
  grille à filets noirs, colonnes choisies pour éviter toute case vide.
- **Site lumineux** : fonds blanc et crème, jaune pour les appels à
  l'action ; seuls le header (bouton téléphone) et le footer restent noirs.
- **Heros** : `PageHero` sur toutes les pages, photo en fond plein cadre
  sous un voile clair, texte et boutons par-dessus.
- **Emplacements photo** (`Photo`, `src/lib/photos.ts`) : chaque photo du
  site a un emplacement nommé. Tant qu'aucun fichier n'existe, l'emplacement
  affiche « Photo à définir », la photo attendue et le nom du fichier. Une
  photo déposée dans `public/photos/` sous ce nom s'affiche au build suivant
  (le script `scripts/photos-manifest.mjs` tourne avant `dev` et `build`).
  Liste complète : `PHOTOS.md`.
- **Survols** : jaune de marque (tuiles valeurs, membres de l'équipe,
  méga-menu, filets jaunes sous les cartes).
- **Couleurs de texte** : `steel` (#4A4D52) pour le texte courant sur fond
  clair et `mist` (#A9ABB0) sur fond sombre — `concrete` (#7C7C7C) n'a pas
  un contraste suffisant pour du texte (WCAG AA).

**Classement des réalisations** : chaque réalisation est classée par ses
domaines d'activité (`services` dans `src/data/projects.ts`, le principal en
premier) ; c'est ce classement qu'utilise le filtre de la page Réalisations.
**Avant d'ajouter une réalisation, demander au client dans quel(s)
domaine(s) la classer.**

Fiches types : `src/app/services/[slug]/page.tsx` (domaine d'activité) et
`src/app/realisations/[slug]/page.tsx` (réalisation). Toutes les sections
sont générées depuis `src/data/` : ajouter un domaine ou une réalisation
ne demande que des données (les sections sans contenu ne s'affichent pas).

## Navigation et appels à l'action

Le header garde une navigation sobre avec le numéro du bureau en bouton.
Chaque page se termine par un bandeau d'appel à l'action (`CtaBand` :
« Demander une offre » + téléphone), comme sur les fiches types validées.
Le footer affiche le fixe du bureau et le portable de Frédéric Monnet.

## Formulaire de contact (Netlify Forms)

Le formulaire de `/contact/` (`src/components/ContactForm.tsx`) est conçu
pour **Netlify Forms** : pas de backend à héberger ni de clé API à gérer.

- Le `<form>` porte `name="contact"` et `data-netlify="true"` : Netlify
  détecte le formulaire en scannant le HTML statique du dossier `out/`
  généré par `npm run build` (vérifiable : `grep data-netlify
  out/contact/index.html`).
- Un champ anti-spam (honeypot, `data-netlify-honeypot="bot-field"`) est
  inclus.
- Champs (décision de la séance client) : nom, entreprise, téléphone,
  e-mail et message. Le type de projet, le lieu et les pièces jointes ont
  été retirés.
- L'envoi se fait en AJAX (`fetch`) avec `FormData`, pour rester sur la
  page et afficher un message de succès ou d'erreur sans rechargement.
- **Ce formulaire ne peut être vérifié de bout en bout qu'une fois déployé
  sur Netlify** : en local (`npm run start`, qui sert `out/` via `serve`),
  l'envoi affichera un succès sans que rien ne soit réellement enregistré
  — un serveur de fichiers statiques répond simplement 200 à toute requête
  sur un fichier existant, POST compris. Après le déploiement, les envois
  apparaissent dans l'onglet **Forms** du tableau de bord Netlify du site,
  où les notifications par e-mail se configurent aussi (**Site settings →
  Forms → Form notifications**).

## Limites connues de cette itération

- **Crawl de l'ancien site** : cet environnement de développement n'a pas
  d'accès réseau sortant vers `guy-monnet-transports.ch` (bloqué par le
  proxy réseau). Le contenu de ce site a donc été rédigé à partir du texte
  détaillé du brief de refonte, pas d'un crawl direct — voir
  `CONTENT_VALIDATION.md`, section 0.
- **Photographies** : toutes les anciennes images ont été retirées (qualité
  insuffisante). Le site affiche des emplacements « Photo à définir » en
  attendant les nouvelles photos, voir `PHOTOS.md`.
- **Formulaire de contact** : branché sur Netlify Forms (voir section
  dédiée ci-dessous) — ne peut être testé de bout en bout qu'une fois le
  site déployé sur Netlify, voir `CONTENT_VALIDATION.md`, point 11.
- **Mesure d'audience** : aucun outil d'analytics n'est installé par
  défaut (aucun outil n'était confirmé dans le brief). Les événements
  recommandés par le cahier des charges (`phone_click`, `email_click`,
  `quote_start`, `quote_submit`, `directions_click`, `project_view`) sont
  prêts à être branchés sur l'outil choisi par le client.
- **Instagram** : lien réel transmis par le client, renseigné dans
  `company.social.instagram` (`src/data/company.ts`) et affiché dans le
  footer. Facebook a été retiré du site à la demande du client.
- **Nombre de collaborateurs** : retiré de toutes les pages visibles à la
  demande du client (donnée non confirmée) ; conservé uniquement en
  mémoire dans `src/data/company.ts` (`employeesApprox`, non utilisé).
