# CONTENT_VALIDATION.md

Ce document liste toutes les informations reprises du site existant
(guy-monnet-transports.ch) qui contiennent une incertitude, une contradiction
entre deux pages, ou une donnée susceptible d'avoir changé. **Aucune de ces
données n'a été inventée** : elles sont reprises telles quelles, avec la
contradiction ou l'incertitude signalée. Le site ne doit pas être mis en
production sans que le client ait validé chaque point ci-dessous.

Chaque TODO est également présent directement dans le code / le contenu du
site (recherche `TODO:` dans le dépôt), pour rester visible à chaque étape.

## 0. Important — accès au site existant

**Confirmé à deux reprises pendant le développement** : l'environnement dans
lequel ce site a été développé n'a **aucun accès réseau sortant** en dehors
d'une liste blanche technique (npm, PyPI, API Anthropic...). Ce n'est pas
une restriction propre à `guy-monnet-transports.ch` : une requête vers
`www.google.com` ou `web.archive.org` (Wayback Machine, testé comme
alternative) est bloquée exactement de la même façon par le proxy réseau de
l'environnement (`curl`, outil de crawl intégré — même résultat). Il n'a
donc pas été possible de crawler automatiquement l'ancien site, ni en
direct ni via une archive, pour en extraire les textes et photos.

Tout le contenu de ce site provient du texte détaillé fourni dans le brief
de refonte (qui décrit précisément le contenu de chaque ancienne page).
**Aucun texte n'a été inventé** au-delà de ce qui a été fourni.

**Pour obtenir le contenu réellement crawlé**, une des options suivantes est
nécessaire côté client :

1. Coller directement le texte de chaque page de l'ancien site dans la
   conversation (le plus rapide) ;
2. Exporter les pages en PDF/HTML ou faire des captures d'écran complètes
   et les transmettre en pièce jointe (les fichiers transmis peuvent être
   lus directement, contrairement aux URLs) ;
3. Transmettre un export Squarespace du site si disponible.

Sans l'un de ces trois éléments, le contenu textuel de ce site restera basé
sur le brief d'origine — précis sur les faits qu'il couvre, mais pas
garanti exhaustif face au site réel.

## 1. Adresse

Les mentions légales de l'ancien site indiquaient **« Route de l'Avenir 7 »**,
alors que le reste du site (footer, contact) indiquait **« Chemin de
l'Avenir 7 »**.

- Le nouveau site utilise partout **« Chemin de l'Avenir 7 »** (version
  majoritaire), avec un TODO visible sur `/contact/` et `/mentions-legales/`.
- **Question client : quelle est l'adresse officielle (registre du
  commerce) ?** Une fois validée, mettre à jour `src/data/company.ts`
  (`company.address`) : elle est utilisée partout (footer, contact, mentions
  légales, JSON-LD Organization/LocalBusiness) donc une seule modification
  suffit à corriger le site entier (cohérence NAP, voir SEO.md).

## 2. Collaborateurs

La liste des collaborateurs (`src/data/team.ts`) reprend exactement les noms
affichés sur l'ancien site `/nos-collaborateurs`, répartis en 5 groupes
(machinistes, chauffeurs, chefs d'équipe, maçons, génie civil), plus la
direction (Frédéric Monnet).

- Deux personnes apparaissent sous le prénom **« Alain »** dans les
  chauffeurs : elles n'ont pas été fusionnées, conformément à l'ancien site.
- **Question client : cette liste est-elle toujours exacte ?** Les
  collaborateurs changent dans le temps ; merci de confirmer avant mise en
  production, et de fournir les noms de famille et éventuellement des photos
  si souhaité.

## 3. Nombre de collaborateurs

L'ancien site indiquait environ **40 employés**. À la demande du client,
ce chiffre n'est plus affiché nulle part sur le site tant qu'il n'est pas
confirmé (il reste toutefois conservé, marqué TODO, dans
`src/data/company.ts` pour mémoire — non utilisé dans aucune page).

- **Question client : ce chiffre est-il toujours d'actualité ? S'il est
  confirmé, où souhaitez-vous qu'il apparaisse (page Entreprise, accueil...) ?**

## 4. Horaires

L'ancien site indiquait majoritairement **06:30–16:00, du lundi au
vendredi**. D'autres anciennes pages indiquaient également des horaires
06:30–23:00 en semaine et 07:00–23:00 le week-end (probablement liés à une
activité spécifique comme le déneigement).

- Le nouveau site reprend uniquement l'horaire majoritaire (06:30–16:00), qui
  correspond aux horaires de bureau. **Question client : les horaires
  étendus concernent-ils une activité précise (astreinte déneigement) et
  doivent-ils être affichés séparément ?**

## 5. Déneigement — contrats communaux

L'ancien site indiquait Guy Monnet & Fils comme prestataire principal pour le
déneigement des communes de Riddes/La Tzoumaz et d'Isérables, ainsi que pour
la route cantonale Riddes–La Tzoumaz pour le compte de l'État du Valais.

- **Question client : ces contrats sont-ils toujours en vigueur ?** Ce sont
  des affirmations commerciales fortes qui engagent l'entreprise ; à ne
  publier que si elles sont contractuellement exactes au moment de la mise
  en ligne.

## 6. Torrent du Lué — volume de GNT 0/22 — résolu

Contradiction trouvée entre deux pages de l'ancien site :

- La page **Génie civil** indiquait **4 000 m³** de GNT 0/22.
- La page **projet Torrent du Lué** indiquait **3 500 m³** de GNT 0/22.

**Confirmé par le client** (capture d'écran de la page projet d'origine,
transmise dans la conversation) : le chiffre exact est **3 500 m³**. Il est
maintenant affiché comme statistique à part entière sur
`/realisations/torrent-du-lue/` (plus seulement mentionné dans le texte), et
le TODO a été retiré de la page.

## 7. Téléphones et e-mail

Repris tels quels de l'ancien site :

- Bureau : 027 565 86 78
- Frédéric Monnet : 079 358 35 77
- E-mail : guy.monnet@bluewin.ch

- **Question client : ces coordonnées sont-elles toujours correctes ?**

## 8. Réseaux sociaux — résolu

**Facebook a été retiré du site à la demande du client.**

Instagram : lien réel transmis par le client dans la conversation
(`https://www.instagram.com/guy_monnet_fils_sa`), renseigné dans
`company.social.instagram` (`src/data/company.ts`) et affiché dans le
footer.

## 9. Photos, vidéos et logo

**Logo — résolu.** Le logo officiel complet (avec le bandeau
« Transports · Terrassements · Génie-civil » et les coordonnées) a été
transmis directement dans la conversation et est intégré tel quel — sans
recadrage — au site (header, footer). Le favicon utilise uniquement la
pelleteuse du logo, recadrée en carré, seule solution lisible à la taille
d'une icône d'onglet de navigateur. La palette de couleurs est calculée
par échantillonnage réel des couleurs du logo (jaune de marque `#EAB308`,
dérivé foncé `#8A5A0A` pour le texte — voir `tailwind.config.ts`). Le
fichier source original est conservé dans `brand-assets/logo-source.jpg`
(hors dossier `public/`, non servi par le site). **Action client : si un
fichier vectoriel (SVG/AI/EPS) ou une version haute résolution du logo
existe, le transmettre** — il remplacerait avantageusement
`public/logo-guy-monnet-full.png` (recadré uniquement du fond blanc externe
et compressé à partir de la photo du logo) pour un rendu plus net sur très
grands écrans.

**Photos des 11 services — résolu.** Le client a transmis directement dans
la conversation une photo réelle pour chacun des 11 domaines d'activité
(reprises de son ancien site, déjà associées aux mêmes catégories).
Redimensionnées, compressées en WebP et nommées pour le SEO (ex.
`genie-civil-pose-conduite-tzoumaz-01.webp`) dans `public/images/services/`,
utilisées à la fois sur les cartes de la page `/services/` et en hero de
chaque page service (`src/data/services.ts`, champ `heroImage` ;
composant `src/components/ServiceImage.tsx`). Le point de cadrage
(`imagePosition`) a été ajusté au cas par cas pour que le bon sujet reste
visible une fois la photo recadrée en carte (4:3) et en hero (16:9).

**Hero d'accueil — ébauche provisoire.** Une première photo (camion-grue MAN
Guy Monnet & Fils SA) transmise par le client est utilisée en hero de la
page d'accueil, à titre d'ébauche en attendant d'autres
références/photos annoncées par le client. Cadrage (`object-position`)
ajusté séparément pour mobile et desktop afin de garder l'avant du camion
visible dans les deux cas.

**Photos du chantier Torrent du Lué — résolu.** Le client a transmis 5
photos réelles du chantier (vue aérienne drone + photos de chantier),
utilisées en hero et en galerie de `/realisations/torrent-du-lue/`
(`src/data/projects.ts`, champs `heroImage`/`gallery` ; composant
`src/components/ProjectImage.tsx`, même logique que `ServiceImage`).

**Photos du chantier Skatepark de Riddes — résolu.** Le client a transmis 9
photos réelles (vue aérienne du skatepark terminé, pose du géotextile,
terrassement, compactage, camion Guy Monnet & Fils en livraison de
matériaux), utilisées en hero et galerie (8 photos) de
`/realisations/skatepark-riddes/`.

Aucune autre photo (page Entreprise, page Équipe, autres pages
Réalisations) n'a pu être migrée pour le moment (pas d'accès réseau à
l'ancien site depuis cet environnement, voir §0). Ces zones affichent
toujours un **placeholder identifié** (fond anthracite avec étiquette
« Photo à intégrer »).

- Voir `IMAGE_INVENTORY.csv` pour la liste complète des emplacements et des
  légendes attendues.
- **Action client : fournir les photographies originales de l'ancien site
  (ou de nouvelles photos) pour chaque emplacement listé**, idéalement en
  haute résolution, afin de remplacer les placeholders avant mise en
  production. Le crédit « Drone Valais Production » doit être conservé si
  contractuellement applicable.

## 10. Hébergement, cookies, mesure d'audience

Les pages `/mentions-legales/` et `/confidentialite/` contiennent des TODO
pour les informations d'hébergement et les éventuels outils de mesure
d'audience, qui n'étaient pas définis dans le brief de refonte.

- **Question client : quel hébergeur sera utilisé ? Un outil de mesure
  d'audience (Google Analytics, Plausible, Matomo...) est-il prévu ?**

## 11. Formulaire de contact — résolu (Netlify Forms)

Le formulaire de contact (`src/components/ContactForm.tsx`) est branché sur
**Netlify Forms** : aucun backend à héberger, aucune clé API à gérer dans
le code. Fonctionnement :

- Le `<form>` porte les attributs `name="contact"` et `data-netlify="true"`
  (+ un champ anti-spam `data-netlify-honeypot`). Netlify détecte
  automatiquement ce formulaire en analysant le HTML généré au build —
  vérifié : ces attributs sont bien présents dans le HTML statique de
  `/contact/` produit par `next build`.
- L'envoi se fait en AJAX (`fetch`) pour rester sur la page, avec un
  message de confirmation ou d'erreur affiché directement dans le
  formulaire. Les pièces jointes (photos/PDF/plans) sont transmises dans le
  même envoi (`multipart/form-data`), dans les limites de Netlify Forms.
- **Important : ce formulaire ne peut être testé de bout en bout qu'une
  fois le site déployé sur Netlify.** En local (`npm run dev`/`start`),
  l'envoi affichera un message de succès sans qu'aucune donnée ne soit
  réellement enregistrée nulle part — c'est attendu, Netlify Forms n'existe
  que sur l'infrastructure Netlify.
- Le site est déployé en export statique (`output: "export"`), sans le
  runtime Next.js de Netlify — voir README.md, section « Pourquoi pas le
  runtime Next.js de Netlify » pour le détail de l'erreur de build évitée
  par ce choix.
- **Action client, après le premier déploiement sur Netlify :**
  1. Faire un envoi test depuis le site en ligne.
  2. Vérifier sa réception dans l'onglet **Forms** du tableau de bord
     Netlify du site.
  3. Configurer les notifications (e-mail à `guy.monnet@bluewin.ch` par
     exemple) dans **Site settings → Forms → Form notifications** — cela se
     fait entièrement dans l'interface Netlify, sans toucher au code.

## 12. Réalisations futures

Les projets suivants sont mentionnés comme références sur l'ancien site
mais ne disposent pas aujourd'hui de texte, photos et chiffres suffisants
pour constituer une page de réalisation à part entière : Padel de Riddes,
Station phytosanitaire de Saxon, Chalet à La Tzoumaz, Réservoir d'Ovronnaz,
Triage forestier de Riddes, Nouvelle école de Riddes, Résidence T-Resort
(La Tzoumaz), Chemin du Milieu (Riddes), Réservoir des Prarions
(Isérables), route agricole de Teur (Isérables), Cycle d'orientation de
Leytron.

- **Action client : pour chacun de ces projets, transmettre photos, dates et
  détails techniques si une page dédiée est souhaitée.**
