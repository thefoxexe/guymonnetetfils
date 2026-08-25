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
4. Remplacer les emplacements photo (`PhotoPlaceholder`) par les vraies
   photographies migrées (voir `IMAGE_INVENTORY.csv`).

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
- `IMAGE_INVENTORY.csv` — inventaire des emplacements photo à compléter
  avec les images réelles migrées depuis l'ancien site.

## Marque et couleurs

Le header et le footer utilisent le logo officiel complet transmis par le
client (`public/logo-guy-monnet-full.png`, non recadré — uniquement le
fond blanc externe est retiré). Le favicon utilise uniquement la pelleteuse
du logo (`public/favicon-32.png`, `favicon-64.png`, `apple-touch-icon.png`),
seule version lisible à la taille d'une icône d'onglet. Le fichier source
original est conservé dans `brand-assets/logo-source.jpg`. La palette
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

## Navigation et appels à l'action

À la demande du client, la navigation reste volontairement sobre pour une
entreprise de chantier : pas de bouton « Demander un devis » dans le
header (le numéro de téléphone suffit, avec une icône), pas de barre
d'actions fixe en bas d'écran mobile, pas de section « CTA » répétée en
bas de chaque page. Le seul chemin de conversion mis en avant est le
numéro de téléphone (header + footer + page contact) et la page
`/contact/` elle-même, accessible depuis la navigation.

## Formulaire de contact (Netlify Forms)

Le formulaire de `/contact/` (`src/components/ContactForm.tsx`) est conçu
pour **Netlify Forms** : pas de backend à héberger ni de clé API à gérer.

- Le `<form>` porte `name="contact"` et `data-netlify="true"` : Netlify
  détecte le formulaire en scannant le HTML statique du dossier `out/`
  généré par `npm run build` (vérifiable : `grep data-netlify
  out/contact/index.html`).
- Un champ anti-spam (honeypot, `data-netlify-honeypot="bot-field"`) est
  inclus.
- L'envoi se fait en AJAX (`fetch`) avec `FormData` (texte + pièces
  jointes dans le même envoi), pour rester sur la page et afficher un
  message de succès ou d'erreur sans rechargement.
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
- **Photographies** : les 11 pages services utilisent désormais de vraies
  photos (transmises par le client), voir `public/images/services/` et
  `IMAGE_INVENTORY.csv`. Le hero de la page d'accueil utilise également une
  première photo réelle (camion-grue), à titre d'ébauche provisoire en
  attendant d'autres photos/références annoncées par le client. La
  réalisation Torrent du Lué a aussi ses vraies photos (hero + galerie de 4
  photos de chantier, `public/images/realisations/`). Les autres
  emplacements (pages Entreprise, Équipe, autres pages Réalisations)
  affichent encore un placeholder identifié, faute d'images récupérées
  automatiquement depuis l'ancien site (pour la raison ci-dessus).
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
