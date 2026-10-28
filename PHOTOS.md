# Photos du site

Toutes les images du site ont été retirées (qualité insuffisante). Chaque
emplacement affiche « Photo à définir » avec le nom du fichier attendu.

## Comment ajouter une photo

1. Nommer la photo exactement comme l'emplacement ci-dessous (l'extension
   est libre : `.jpg`, `.jpeg`, `.png`, `.webp` ou `.avif`).
2. La déposer dans `public/photos/`.
3. Relancer `npm run build` (ou laisser Netlify redéployer) : la photo
   remplace automatiquement l'emplacement. Aucun code à modifier.

Conseils : photos horizontales d'au moins 1600 px de large, compressées
(moins de 500 Ko, idéalement en `.webp`). Pour les galeries des chantiers,
jusqu'à 12 photos par chantier (`-1` à `-12`), affichées dans l'ordre.

## Pages générales

| Fichier | Où | Photo attendue |
|---|---|---|
| `accueil-couverture` | Accueil, photo de fond de l'en-tête | Un camion ou une machine Guy Monnet & Fils sur un chantier |
| `entreprise-couverture` | Entreprise, en-tête | Guy Monnet et son premier camion (archives) |
| `entreprise-inauguration-depot-2020` | Entreprise, vie de l'entreprise | Inauguration du dépôt de Riddes, 2020 |
| `entreprise-depot-riddes` | Entreprise, vie de l'entreprise | Le dépôt de Riddes aujourd'hui |
| `equipe-couverture` | Équipe, en-tête | L'équipe, photo prise sur le terrain |
| `equipe-frederic-monnet` | Équipe, direction | Portrait de Frédéric Monnet (affiché en petit, rond) |

## Domaines d'activité

Pour chaque domaine : une photo de couverture (fond de l'en-tête de la
fiche et tuiles) et jusqu'à 8 photos pour le carrousel (`-1` à `-8`).

| Domaine | Couverture | Illustrations | Photo de couverture attendue |
|---|---|---|---|
| Transport | `domaine-transport-couverture` | `domaine-transport-1` à `-3` | Un camion Guy Monnet & Fils en grand, format carré |
| Terrassement | `domaine-terrassement-couverture` | `domaine-terrassement-1` à `-3` | Gros chantier de terrassement (Isérables) |
| Génie civil | `domaine-genie-civil-couverture` | `domaine-genie-civil-1` à `-3` | Pose de conduite ou réfection de route |
| Maçonnerie | `domaine-maconnerie-couverture` | `domaine-maconnerie-1` à `-3` | Ouvrage en béton armé (Padel de Riddes, chalet…) |
| Aménagements extérieurs | `domaine-amenagements-exterieurs-couverture` | `domaine-amenagements-exterieurs-1` à `-3` | Mur en pierre sèche |
| Démolition | `domaine-demolition-couverture` | `domaine-demolition-1` à `-3` | Démolition d'un bâtiment à la pelle mécanique |
| Revalorisation des matériaux | `domaine-revalorisation-materiaux-couverture` | `domaine-revalorisation-materiaux-1` à `-3` | Centre de revalorisation de Riddes : tri et criblage |
| Déneigement | `domaine-deneigement-couverture` | `domaine-deneigement-1` à `-3` | Déneigement à La Tzoumaz |
| Pelles araignées | `domaine-pelles-araignees-couverture` | `domaine-pelles-araignees-1` à `-3` | Pelle araignée en forte pente |
| Cours d'eau | `domaine-cours-eau-couverture` | `domaine-cours-eau-1` à `-3` | Aménagement de berges ou ouvrage en rivière |
| Sentiers pédestres | `domaine-sentiers-pedestres-couverture` | `domaine-sentiers-pedestres-1` à `-3` | Sentier pédestre en montagne |

## Réalisations

Pour chaque chantier : une photo de couverture et une galerie
(`chantier-<nom>-1` à `-12`).

| Chantier | Couverture | Galerie | Photo de couverture attendue |
|---|---|---|---|
| Torrent du Lué | `chantier-torrent-du-lue-couverture` | `chantier-torrent-du-lue-1` à `-12` | Vue d'ensemble du chantier du Torrent du Lué |
| Station phytosanitaire de Saxon | `chantier-station-phytosanitaire-saxon-couverture` | `chantier-station-phytosanitaire-saxon-1` à `-12` | Bétonnage des radiers de la station phytosanitaire |
| Chambre de récolte des eaux | `chantier-chambre-recolte-des-eaux-leytron-couverture` | `chantier-chambre-recolte-des-eaux-leytron-1` à `-12` | Construction de la chambre de captage en montagne |
| Parking P+R CFF | `chantier-cff-parking-p-r-couverture` | `chantier-cff-parking-p-r-1` à `-12` | Le parking P+R terminé, marquage au sol |
| Rue des Artisans, étape 2 | `chantier-rue-des-artisans-etape-2-couverture` | `chantier-rue-des-artisans-etape-2-1` à `-12` | Fouilles et réseaux dans la rue des Artisans |
| Rue des Artisans, étape 1 | `chantier-rue-des-artisans-etape-1-couverture` | `chantier-rue-des-artisans-etape-1-1` à `-12` | Pose des conduites de chauffage à distance |
| Les Larmes du Fou | `chantier-les-larmes-du-fou-couverture` | `chantier-les-larmes-du-fou-1` à `-12` | L'étang pilote sur l'alpage de Balavaux |
| Sentier des Sens | `chantier-sentier-des-sens-couverture` | `chantier-sentier-des-sens-1` à `-12` | Le pont en béton du Sentier des Sens |
| Skatepark de Riddes | `chantier-skatepark-riddes-couverture` | `chantier-skatepark-riddes-1` à `-12` | Le skatepark de Riddes terminé |
