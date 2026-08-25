export type ProjectStat = { value: string; label: string };

export type ProjectCategory =
  | "genie-civil"
  | "terrassement"
  | "maconnerie"
  | "amenagement"
  | "environnement"
  | "demolition";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  "genie-civil": "Génie civil",
  terrassement: "Terrassement",
  maconnerie: "Maçonnerie",
  amenagement: "Aménagement",
  environnement: "Environnement",
  demolition: "Démolition",
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  year?: string;
  categories: ProjectCategory[];
  summary: string;
  seoTitle: string;
  seoDescription: string;
  heroImageLabel: string;
  context: string[];
  works: string[];
  stats?: ProjectStat[];
  gallery?: string[];
  services: string[]; // slugs
  legacyUrl?: string;
  featured?: boolean;
  todo?: string;
};

export const projects: Project[] = [
  {
    slug: "torrent-du-lue",
    title: "Torrent du Lué",
    location: "Riddes",
    year: "2025",
    categories: ["genie-civil"],
    summary: "Réfection de route et de réseaux le long du Torrent du Lué.",
    seoTitle: "Torrent du Lué : travaux de génie civil | Guy Monnet & Fils",
    seoDescription:
      "Torrent du Lué à Riddes : réfection complète de route et de réseaux, pose de conduite en fonte, chambres de captage et enrobés, avril à décembre 2025.",
    heroImageLabel: "Chantier du Torrent du Lué : route en réfection et pose de conduites",
    context: [
      "Le chantier du Torrent du Lué a consisté en la réfection complète de la route et des réseaux souterrains, exécutée d'avril à décembre 2025.",
    ],
    works: [
      "Pose d'une conduite en fonte verrouillée de diamètre 800 mm",
      "Réfection complète de la route",
      "Remplacement des réseaux : conduite d'égout, eaux de surface et électricité",
      "Construction de 8 chambres de captage en béton coulé sur place",
      "Pose de 2 chambres brise-énergie",
      "Pose de bordures en granit",
      "Mise en œuvre de grave non traitée (GNT 0/22)",
      "Pose d'enrobé",
    ],
    stats: [
      { value: "905 m", label: "Conduite en fonte verrouillée Ø 800" },
      { value: "780 m", label: "Bordures en granit" },
      { value: "8", label: "Chambres de captage en béton coulé sur place" },
      { value: "2", label: "Chambres brise-énergie" },
      { value: "680 t", label: "Enrobé posé" },
    ],
    services: ["genie-civil", "terrassement"],
    legacyUrl: "/nouvelle-page",
    featured: true,
    // La page Génie civil du site existant indique 4 000 m³ de GNT 0/22,
    // la page projet indique 3 500 m³ de GNT 0/22. Ne pas trancher arbitrairement.
    todo: "TODO: CLIENT MUST CONFIRM 3500 OR 4000 M3 (volume de GNT 0/22)",
  },
  {
    slug: "les-larmes-du-fou",
    title: "Les Larmes du Fou",
    location: "Alpage de Balavaux, commune d'Isérables",
    categories: ["environnement", "genie-civil"],
    summary:
      "Création d'un étang pilote pour la biodiversité alpine, dans le cadre du projet ACCLIMaé mené par la HEPIA Genève / HES-SO.",
    seoTitle: "Les Larmes du Fou : génie civil environnemental | Guy Monnet",
    seoDescription:
      "Création d'un étang pilote sur l'alpage de Balavaux (Isérables), dans le cadre du projet ACCLIMaé de la HEPIA Genève / HES-SO. Excavation et étanchéité par Guy Monnet & Fils.",
    heroImageLabel: "Étang pilote en cours de façonnage sur l'alpage de Balavaux",
    context: [
      "Le projet Les Larmes du Fou est lié au projet ACCLIMaé, piloté par l'Institut Terre-Nature-Environnement de la HEPIA Genève / HES-SO, qui étudie la biodiversité alpine menacée par le réchauffement climatique.",
      "Il se situe sur l'alpage de Balavaux, sur la commune d'Isérables. L'objectif est la création d'un étang pilote servant notamment de nouvel habitat et de structure relais pour certaines espèces.",
    ],
    works: [
      "Excavation du volume des étangs",
      "Façonnage du fond et des berges",
      "Pose d'une étanchéité à base de géotextile bentonitique",
    ],
    services: ["genie-civil", "cours-eau"],
    legacyUrl: "/les-larmes-du-fou",
  },
  {
    slug: "sentier-des-sens",
    title: "Sentier des Sens",
    location: "La Tzoumaz",
    categories: ["genie-civil", "maconnerie", "amenagement"],
    summary:
      "Travaux de génie civil et de maçonnerie pour l'aménagement du Sentier des Sens, à proximité du Bisse de Saxon.",
    seoTitle: "Sentier des Sens à La Tzoumaz : travaux réalisés | Guy Monnet",
    seoDescription:
      "Sentier des Sens à La Tzoumaz, le long du Bisse de Saxon : travaux de génie civil et construction d'un pont en béton apparent par Guy Monnet & Fils.",
    heroImageLabel: "Pont en béton apparent sur le Sentier des Sens à La Tzoumaz",
    context: [
      "Le Sentier des Sens, à La Tzoumaz, longe le Bisse de Saxon. Le parcours est pensé autour du toucher, de l'ouïe, de l'odorat et de la découverte de la nature, et conçu pour être accessible à différents publics.",
      "Guy Monnet & Fils est intervenu sur les travaux de génie civil du sentier ainsi que sur la construction d'un pont en béton apparent.",
    ],
    works: [
      "Travaux de génie civil pour l'aménagement du sentier",
      "Construction d'un pont en béton apparent teinté couleur bois, avec empreinte de lames de coffrage",
    ],
    services: ["sentiers-pedestres", "genie-civil", "maconnerie"],
    legacyUrl: "/le-sentier-des-sens",
  },
  {
    slug: "skatepark-riddes",
    title: "Skatepark de Riddes",
    location: "Riddes",
    year: "2020",
    categories: ["terrassement"],
    summary:
      "Terrassement et préparation du terrain pour le skatepark de Riddes, façonné ensuite par Vertical Technik AG.",
    seoTitle: "Skatepark de Riddes : terrassement | Guy Monnet & Fils",
    seoDescription:
      "Terrassement et préparation du terrain du skatepark de Riddes en 2020, en amont du façonnage des courbes par les techniciens de Vertical Technik AG.",
    heroImageLabel: "Terrassement du skatepark de Riddes",
    context: [
      "Les travaux du skatepark de Riddes ont débuté en août 2020, avec l'évacuation des arbres et des souches, puis le terrassement et la préparation du terrain.",
      "Le terrain a ensuite été mis à disposition des techniciens de Vertical Technik AG, spécialisés dans le façonnage des courbes de skatepark.",
    ],
    works: [
      "Évacuation des arbres et des souches",
      "Terrassement",
      "Préparation du terrain avant intervention de Vertical Technik AG",
    ],
    services: ["terrassement"],
    legacyUrl: "/skatepark-riddes",
  },
];

// Réalisations mentionnées dans les références du site existant, pour lesquelles
// une page individuelle pourra être créée plus tard si suffisamment de texte,
// photos, données et contexte sont disponibles. Ne pas publier de page pauvre.
export const futureProjects = [
  "Padel de Riddes",
  "Station phytosanitaire de Saxon",
  "Chalet à La Tzoumaz",
  "Réservoir d'Ovronnaz",
  "Triage forestier de Riddes",
  "Nouvelle école de Riddes",
  "Résidence T-Resort, La Tzoumaz",
  "Chemin du Milieu, Riddes",
  "Réservoir communal des Prarions, Isérables",
  "Route agricole de Teur, commune d'Isérables",
  "Cycle d'orientation de Leytron",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
