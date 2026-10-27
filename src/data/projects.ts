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
  /** Période d'exécution affichée dans la fiche technique (« Avril à décembre 2025 »). */
  period?: string;
  /** Maître d'ouvrage. */
  client?: string;
  /** Direction des travaux (bureau d'ingénieurs). */
  engineer?: string;
  /** Montant des travaux, tel qu'indiqué sur la fiche de référence du client. */
  amount?: string;
  /** Mots-clés courts du bandeau jaune sous le hero. */
  highlights?: string[];
  categories: ProjectCategory[];
  summary: string;
  seoTitle: string;
  seoDescription: string;
  /** Photo de couverture attendue (texte de l'emplacement « Photo à définir » et texte alternatif). */
  heroImageLabel: string;
  context: string[];
  works: string[];
  stats?: ProjectStat[];
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
    period: "Avril à décembre 2025",
    highlights: ["Conduite fonte Ø 800", "Réseaux souterrains", "Chambres de captage", "Enrobé"],
    categories: ["genie-civil"],
    summary: "Réfection de route et de réseaux le long du Torrent du Lué.",
    seoTitle: "Torrent du Lué : travaux de génie civil | Guy Monnet & Fils",
    seoDescription:
      "Torrent du Lué à Riddes : réfection complète de route et de réseaux, pose de conduite en fonte, chambres de captage et enrobés, avril à décembre 2025.",
    heroImageLabel: "Vue d'ensemble du chantier du Torrent du Lué",
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
      "Mise en œuvre de 3 500 m³ de grave non traitée (GNT 0/22)",
      "Pose d'enrobé",
    ],
    stats: [
      { value: "905 m", label: "Conduite en fonte verrouillée Ø 800" },
      { value: "780 m", label: "Bordures en granit" },
      { value: "3 500 m³", label: "Grave non traitée (GNT 0/22)" },
      { value: "8", label: "Chambres de captage en béton coulé sur place" },
      { value: "2", label: "Chambres brise-énergie" },
      { value: "680 t", label: "Enrobé posé" },
    ],
    services: ["genie-civil", "terrassement"],
    legacyUrl: "/nouvelle-page",
    featured: true,
  },
  {
    slug: "station-phytosanitaire-saxon",
    title: "Station phytosanitaire de Saxon",
    location: "Saxon",
    year: "2025",
    period: "Juin à septembre 2025",
    client: "Commune de Saxon",
    engineer: "BTI",
    amount: "380'000 CHF",
    highlights: ["Radiers", "Béton étanche", "Acier d'armature", "Aménagements extérieurs"],
    categories: ["terrassement", "maconnerie", "amenagement"],
    summary: "Terrassement, radiers et murettes en béton étanche, puis aménagements extérieurs.",
    seoTitle: "Station phytosanitaire de Saxon | Guy Monnet & Fils",
    seoDescription:
      "Station phytosanitaire de Saxon : terrassement, 150 m³ de béton étanche, 18 tonnes d'acier d'armature et aménagements extérieurs, de juin à septembre 2025.",
    heroImageLabel: "Bétonnage des radiers de la station phytosanitaire",
    context: [
      "Pour la commune de Saxon, nous avons construit la station phytosanitaire de juin à septembre 2025 : terrassement, radiers et murettes en béton étanche, puis aménagements extérieurs. La direction des travaux était assurée par BTI.",
    ],
    works: [
      "Terrassement général pour la préparation des radiers, fouilles pour les réseaux électriques",
      "Bétonnage des radiers et murettes en béton étanche",
      "Mise en place de 150 m³ de béton NPK C étanche",
      "Fourniture et mise en œuvre de 18 tonnes d'acier d'armature",
      "Aménagements extérieurs : 190 m³ de chaille et 220 m³ de grave 0/60",
    ],
    stats: [
      { value: "150 m³", label: "Béton NPK C étanche" },
      { value: "18 t", label: "Acier d'armature" },
      { value: "190 m³", label: "Chaille" },
      { value: "220 m³", label: "Grave 0/60" },
    ],
    services: ["terrassement", "maconnerie", "amenagements-exterieurs"],
  },
  {
    slug: "chambre-recolte-des-eaux-leytron",
    title: "Chambre de récolte des eaux",
    location: "Commune de Leytron",
    year: "2024",
    period: "Juillet à septembre 2024",
    client: "Commune de Leytron",
    engineer: "Hollinger",
    amount: "940'000 CHF",
    highlights: ["Minage du rocher", "Béton héliporté", "Conduite fonte Ø 400", "Eau potable"],
    categories: ["terrassement", "maconnerie", "genie-civil"],
    summary: "Chambre de captage en montagne, 600 m de conduite d'eau potable et minage du rocher.",
    seoTitle: "Chambre de récolte des eaux, Leytron | Guy Monnet & Fils",
    seoDescription:
      "Chambre de récolte des eaux pour la commune de Leytron : minage du rocher, 90 m³ de béton héliporté et 600 m de conduite en fonte Ø 400 mm, juillet à septembre 2024.",
    heroImageLabel: "Construction de la chambre de captage en montagne",
    context: [
      "Pour la commune de Leytron, nous avons construit une chambre de récolte des eaux de juillet à septembre 2024, sous la direction des travaux du bureau Hollinger.",
      "Le rocher a été miné en deux étapes, avec plus de 120 forages. Le béton de la chambre, 90 m³, a été acheminé par hélicoptère. La conduite d'eau potable en fonte Ø 400 mm a été posée sur 600 m.",
    ],
    works: [
      "Terrassement et piquage du rocher pour la future chambre de captage",
      "Maçonnerie : radier, élévation des murs et cuve étanche, avec 90 m³ de béton héliporté",
      "Fouilles et pose de 600 m de conduite en fonte Ø 400 mm pour l'eau potable",
      "Minage du rocher en deux étapes (plus de 120 forages) et avancement de la fouille",
      "Bétonnage de la dalle du réservoir, étanchéité, drainage et remblayage",
      "Remise en état du terrain sur plus de 600 m",
    ],
    stats: [
      { value: "90 m³", label: "Béton héliporté" },
      { value: "600 m", label: "Conduite en fonte Ø 400 mm (eau potable)" },
      { value: "120+", label: "Forages pour le minage du rocher" },
    ],
    services: ["terrassement", "maconnerie", "genie-civil"],
    todo: "TODO: VALIDATION CLIENT : lieu exact du chantier sur la commune de Leytron ; note manuscrite « 4500 projet / 15000 » sur la fiche papier à préciser.",
  },
  {
    slug: "cff-parking-p-r",
    title: "Parking P+R CFF",
    location: "Valais",
    year: "2024",
    period: "Mai à juillet 2024",
    client: "CarPostal et CFF",
    engineer: "Sollertia",
    amount: "180'000 CHF",
    highlights: ["Enrobés", "Grave non gélive", "Bassin d'infiltration", "Bordures"],
    categories: ["genie-civil"],
    summary: "Réfection complète d'un parking P+R : fondation, canalisations, bassin d'infiltration et enrobés.",
    seoTitle: "Parking P+R CFF : génie civil | Guy Monnet & Fils",
    seoDescription:
      "Parking P+R pour CarPostal et les CFF : décapage, fondation en grave non gélive, canalisations, bassin d'infiltration, bordures et enrobés en trois couches, mai à juillet 2024.",
    heroImageLabel: "Le parking P+R terminé, marquage au sol",
    context: [
      "Pour CarPostal et les CFF, nous avons refait un parking P+R de mai à juillet 2024, sous la direction des travaux du bureau Sollertia.",
    ],
    works: [
      "Décapage des enrobés existants",
      "Couche de fondation en grave non gélive",
      "Pose de canalisations pour les candélabres et de leurs socles",
      "Pose de grilles de route avec canalisation",
      "Bassin d'infiltration et fossé d'infiltration",
      "Pose de bordures en arrondi et création des zones vertes",
      "Pose des enrobés en trois couches",
    ],
    stats: [
      { value: "3", label: "Couches d'enrobé" },
      { value: "3 mois", label: "De mai à juillet 2024" },
    ],
    services: ["genie-civil"],
    todo: "TODO: VALIDATION CLIENT : gare ou localité du parking P+R.",
  },
  {
    slug: "rue-des-artisans-etape-2",
    title: "Rue des Artisans, étape 2",
    location: "Riddes",
    year: "2023",
    period: "Mai à novembre 2023",
    client: "Commune de Riddes",
    engineer: "BTI",
    amount: "700'000 CHF",
    highlights: ["Eaux usées et claires", "Eau potable", "Swisscom", "Giratoires et îlots"],
    categories: ["genie-civil"],
    summary: "Deuxième étape de la réfection des infrastructures de la rue des Artisans, giratoires et îlots compris.",
    seoTitle: "Rue des Artisans, étape 2, Riddes | Guy Monnet & Fils",
    seoDescription:
      "Rue des Artisans à Riddes, étape 2 : réfection complète des réseaux (eaux usées, eaux claires, eau potable, Swisscom, chauffage à distance), bordures, giratoires et enrobé, mai à novembre 2023.",
    heroImageLabel: "Fouilles et réseaux dans la rue des Artisans",
    context: [
      "Après l'étape 1 en 2022, la commune de Riddes nous a confié la suite de la réfection de la rue des Artisans, de mai à novembre 2023, sous la direction des travaux de BTI.",
      "Tous les réseaux ont été refaits : eaux usées, eaux claires, eau potable et Swisscom, avec les fouilles pour le chauffage à distance. Le chantier comprenait aussi les bordures, des giratoires et des îlots.",
    ],
    works: [
      "Dégrappage de l'enrobé bitumineux, sondages et fouilles pour le chauffage à distance",
      "Pose des réseaux eaux usées, eaux claires, eau potable et Swisscom",
      "Raccordement des bordiers aux différents réseaux",
      "Pose de bordures de route et de trottoir",
      "Giratoires et îlots",
      "Pose de l'enrobé bitumineux",
    ],
    services: ["genie-civil"],
  },
  {
    slug: "rue-des-artisans-etape-1",
    title: "Rue des Artisans, étape 1",
    location: "Riddes",
    year: "2022",
    period: "Mai à novembre 2022",
    client: "Commune de Riddes",
    engineer: "BTI",
    amount: "650'000 CHF",
    highlights: ["Eau potable", "Électricité", "Chauffage à distance", "Chaussée"],
    categories: ["genie-civil"],
    summary: "Réfection complète des réseaux souterrains et de la chaussée de la rue des Artisans.",
    seoTitle: "Rue des Artisans, étape 1, Riddes | Guy Monnet & Fils",
    seoDescription:
      "Rue des Artisans à Riddes, étape 1 : remplacement des conduites d'eau potable, d'électricité, d'éclairage, d'égout et de chauffage à distance, bordures et chaussée, mai à novembre 2022.",
    heroImageLabel: "Pose des conduites de chauffage à distance",
    context: [
      "Pour la commune de Riddes, nous avons refait de mai à novembre 2022 l'ensemble des infrastructures de la rue des Artisans, sous la direction des travaux de BTI.",
      "Les réseaux remplacés : eaux usées, eaux claires, eau potable, éclairage public, électricité et chauffage à distance. La chaussée a ensuite été refaite avec un nouveau coffre et deux couches d'enrobé.",
    ],
    works: [
      "Décapage des enrobés existants",
      "Sondages et fouilles pour les raccordements souterrains",
      "Remplacement et pose des conduites d'eau potable et d'électricité",
      "Chauffage à distance, égout et eaux de surface",
      "Pose de bordures et remplacement du coffre",
      "Réfection de la chaussée en deux couches d'enrobé",
    ],
    stats: [
      { value: "6", label: "Réseaux refaits : eaux usées, eaux claires, eau potable, éclairage, électricité, chauffage à distance" },
      { value: "2", label: "Couches d'enrobé" },
    ],
    services: ["genie-civil"],
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
    heroImageLabel: "L'étang pilote sur l'alpage de Balavaux",
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
    heroImageLabel: "Le pont en béton du Sentier des Sens",
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
    period: "Dès août 2020",
    highlights: ["Évacuation des souches", "Terrassement", "Préparation du terrain"],
    categories: ["terrassement"],
    summary:
      "Terrassement et préparation du terrain pour le skatepark de Riddes, façonné ensuite par Vertical Technik AG.",
    seoTitle: "Skatepark de Riddes : terrassement | Guy Monnet & Fils",
    seoDescription:
      "Terrassement et préparation du terrain du skatepark de Riddes en 2020, en amont du façonnage des courbes par les techniciens de Vertical Technik AG.",
    heroImageLabel: "Le skatepark de Riddes terminé",
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
