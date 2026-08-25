export type ServiceReference = {
  label: string;
  location?: string;
  note?: string;
  projectSlug?: string;
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  heroImageLabel: string;
  intro: string[];
  prestations: string[];
  savoirFaire?: string[];
  references?: ServiceReference[];
  referencesNote?: string;
  relatedServices: string[];
  relatedProjects?: string[];
  zoneIntervention: string;
};

// Ancienne URL d'origine (site Squarespace) pour référence / audit de migration.
export const legacyServiceUrls: Record<string, string> = {
  transport: "/domaines-dactitivs",
  terrassement: "/terrassement",
  "genie-civil": "/genie-civil",
  maconnerie: "/general-2",
  "amenagements-exterieurs": "/amenagements-exterieurs",
  demolition: "/demolition",
  "revalorisation-materiaux": "/revalorisation-des-materiaux",
  deneigement: "/deneigement",
  "pelles-araignees": "/pelles-araignees",
  "cours-eau": "/cours-d-eau",
  "sentiers-pedestres": "/sentiers-pedestres",
};

export const services: Service[] = [
  {
    slug: "transport",
    name: "Transport",
    shortDescription:
      "Transport de matériaux et solutions adaptées aux besoins des chantiers.",
    seoTitle: "Transport de matériaux & camion-grue en Valais | Guy Monnet",
    seoDescription:
      "Transport de matériaux de chantier en Valais : camions tout-terrain, camions-grues jusqu'à 24 m de portée et bennes multi-lift. Entreprise basée à Riddes.",
    heroImageLabel: "Camion de chantier Guy Monnet & Fils sur route valaisanne",
    intro: [
      "Guy Monnet & Fils dispose d'un parc de véhicules dédié au transport de matériaux de chantier, adapté aux besoins des entreprises, des collectivités et des particuliers en Valais.",
      "Camions tout-terrain, camions-grues et bennes multi-lift permettent de couvrir des besoins variés, du transport simple de matériaux à la manutention sur chantier.",
    ],
    prestations: [
      "Transport de matériaux de chantier (terre, gravier, béton, déblais)",
      "Levage et manutention avec camion-grue",
      "Transport de charges avec remorque surbaissée",
      "Location de bennes multi-lift (10 à 40 m³)",
    ],
    savoirFaire: [
      "7 camions tout-terrain pour le transport de matériaux de chantier",
      "2 camions-grues, portée maximale annoncée : 24 mètres",
      "1 camion-remorque surbaissée",
      "Camions multi-lift avec bennes de 10 à 40 m³",
    ],
    relatedServices: ["terrassement", "genie-civil", "demolition"],
    zoneIntervention: "Riddes et l'ensemble du canton du Valais.",
  },
  {
    slug: "terrassement",
    name: "Terrassement",
    shortDescription:
      "Préparation des terrains et travaux de terrassement pour bâtiments et infrastructures.",
    seoTitle: "Terrassement en Valais | Guy Monnet & Fils SA",
    seoDescription:
      "Entreprise de terrassement en Valais depuis 1980 : préparation de terrains pour bâtiments et infrastructures, clients privés et collectivités publiques.",
    heroImageLabel: "Pelle mécanique sur un chantier de terrassement en Valais",
    intro: [
      "Guy Monnet & Fils réalise des travaux de terrassement pour des clients privés et des collectivités publiques.",
      "L'entreprise prépare les terrains nécessaires aux bâtiments et infrastructures et dispose des équipements et du savoir-faire nécessaires pour intervenir sur différents types de terrains.",
    ],
    prestations: [
      "Préparation de terrain avant construction",
      "Terrassement pour bâtiments et infrastructures",
      "Terrassement pour collectivités publiques et clients privés",
      "Évacuation et gestion des matériaux de terrassement",
    ],
    references: [
      { label: "Lotissement Matin St-Laurent", location: "La Tzoumaz" },
      { label: "Immeuble Les Cigalines", location: "Riddes", note: "référence ASE SA" },
      { label: "Immeuble Artemis", location: "Ardon", note: "référence ASE SA" },
      { label: "Local protection civile et pompiers", location: "Isérables" },
      { label: "Nouvelle école de Riddes", location: "Riddes" },
      { label: "Résidence T-Resort", location: "La Tzoumaz" },
      { label: "Immeuble Le Tsapon", location: "Leytron", note: "référence ASE SA" },
      { label: "Réservoir communal des Prarions", location: "commune d'Isérables" },
      { label: "Skatepark", location: "Riddes", projectSlug: "skatepark-riddes" },
      { label: "Immeuble Le Chardon Bleu", location: "Nendaz" },
    ],
    relatedServices: ["genie-civil", "transport", "amenagements-exterieurs"],
    relatedProjects: ["skatepark-riddes"],
    zoneIntervention: "Riddes, La Tzoumaz, Isérables, Leytron, Ardon, Nendaz et le reste du Valais.",
  },
  {
    slug: "genie-civil",
    name: "Génie civil",
    shortDescription:
      "Routes, réseaux, conduites et infrastructures publiques ou privées.",
    seoTitle: "Entreprise de génie civil en Valais | Guy Monnet & Fils",
    seoDescription:
      "Entreprise de génie civil à Riddes : routes, réseaux, conduites et infrastructures pour collectivités et maîtres d'ouvrage privés en Valais.",
    heroImageLabel: "Chantier de génie civil : pose de conduites en tranchée",
    intro: [
      "Guy Monnet & Fils intervient pour le secteur privé et public dans la construction et la rénovation d'infrastructures.",
      "L'entreprise réalise des travaux de routes, de réseaux et de conduites, ainsi que des travaux en sous-sol nécessitant une bonne connaissance du terrain valaisan.",
    ],
    prestations: [
      "Construction et réfection de routes",
      "Pose et réfection de conduites",
      "Réseaux enterrés",
      "Travaux en sous-sol",
      "Infrastructures publiques et privées",
    ],
    references: [
      {
        label: "Fouille turbinage eau potable / gaz",
        location: "Isérables – Riddes",
        note: "pour la commune d'Isérables",
      },
      { label: "Fouille turbinage eau potable des Prarions", location: "Isérables" },
      { label: "Fouille turbinage eau potable", location: "La Tzoumaz, commune de Riddes" },
      { label: "Construction d'une nouvelle route agricole", location: "Teur, commune d'Isérables" },
      {
        label: "Chemin du Milieu",
        location: "Riddes",
        note: "réfection complète des conduites et pose d'une conduite de chauffage à distance",
      },
      { label: "Sentier des Sens", location: "La Tzoumaz", projectSlug: "sentier-des-sens" },
      { label: "Torrent du Lué", location: "Riddes", projectSlug: "torrent-du-lue" },
    ],
    relatedServices: ["terrassement", "cours-eau", "sentiers-pedestres"],
    relatedProjects: ["torrent-du-lue", "sentier-des-sens", "les-larmes-du-fou"],
    zoneIntervention: "Riddes, Isérables, La Tzoumaz et l'ensemble du Valais.",
  },
  {
    slug: "maconnerie",
    name: "Maçonnerie",
    shortDescription:
      "Construction en béton armé, chalets, annexes, garages et ouvrages spécifiques.",
    seoTitle: "Maçonnerie & béton armé en Valais | Guy Monnet & Fils",
    seoDescription:
      "Maçonnerie et construction béton armé en Valais : chalets, rénovations, annexes, garages et ouvrages spécifiques réalisés par Guy Monnet & Fils.",
    heroImageLabel: "Coffrage et coulage de béton armé sur un chantier valaisan",
    intro: [
      "Guy Monnet & Fils construit des chalets, réalise des rénovations, des annexes, des garages et des ouvrages en béton pour des clients privés et des maîtres d'ouvrage publics.",
      "Ces réalisations démontrent la capacité de l'entreprise à mener des ouvrages en béton armé techniques, y compris dans des conditions d'accès ou d'exécution particulières.",
    ],
    prestations: [
      "Construction de chalets",
      "Rénovations",
      "Annexes et garages",
      "Ouvrages en béton armé",
      "Bâtiments pour collectivités et entreprises",
    ],
    references: [
      {
        label: "Padel de Riddes",
        location: "Riddes",
        note: "150 m³ de béton armé taloché propre, 20 t d'armatures",
      },
      {
        label: "Station phytosanitaire de Saxon",
        location: "Saxon",
        note: "200 m³ de béton coulé sur place, 18 t d'acier d'armature",
      },
      {
        label: "Chalet",
        location: "La Tzoumaz",
        note: "120 m³ de béton coulé sur place, 20 t d'acier d'armature",
      },
      { label: "Hangar véhicules de chantier", location: "TODO: VALIDATION CLIENT" },
      {
        label: "Pont du Sentier des Sens",
        location: "La Tzoumaz",
        note: "béton apparent teinté couleur bois, empreinte de lames de coffrage, pour la commune de La Tzoumaz",
        projectSlug: "sentier-des-sens",
      },
      {
        label: "Réservoir d'Ovronnaz",
        location: "Ovronnaz",
        note: "bétonnage à l'hélicoptère",
      },
      { label: "Triage forestier de Riddes", location: "Riddes", note: "construction d'un radier" },
      { label: "Garage", location: "La Tzoumaz", note: "garage en béton armé pour un client" },
    ],
    relatedServices: ["genie-civil", "amenagements-exterieurs"],
    relatedProjects: ["sentier-des-sens"],
    zoneIntervention: "Riddes, Saxon, La Tzoumaz, Ovronnaz et l'ensemble du Valais.",
  },
  {
    slug: "amenagements-exterieurs",
    name: "Aménagements extérieurs",
    shortDescription:
      "Murs, enrochements, pavage, bordures, goudronnage et aménagements.",
    seoTitle: "Aménagements extérieurs en Valais | Guy Monnet & Fils",
    seoDescription:
      "Aménagements extérieurs en Valais : murs, enrochements, pavage, bordures et goudronnage, avec fourniture de terre végétale par Guy Monnet & Fils.",
    heroImageLabel: "Aménagement extérieur avec enrochement et pavage",
    intro: [
      "Guy Monnet & Fils réalise des aménagements extérieurs pour compléter des chantiers de construction ou de terrassement : murs, enrochements, pavage, bordures et goudronnage.",
      "L'entreprise fournit et pose également de la terre végétale, notamment issue de son propre centre de revalorisation des matériaux à Riddes.",
    ],
    prestations: [
      "Construction de murs",
      "Enrochements",
      "Pose de pavés et bordures",
      "Goudronnage",
      "Fourniture et pose de terre végétale",
    ],
    relatedServices: ["terrassement", "revalorisation-materiaux", "maconnerie"],
    zoneIntervention: "Riddes et l'ensemble du Valais.",
  },
  {
    slug: "demolition",
    name: "Démolition",
    shortDescription:
      "Démolition, évacuation, tri et traitement des matériaux.",
    seoTitle: "Entreprise de démolition en Valais | Guy Monnet & Fils",
    seoDescription:
      "Démolition, tri et évacuation de matériaux en Valais. Les matériaux valorisables sont dirigés vers le centre de revalorisation de Guy Monnet & Fils à Riddes.",
    heroImageLabel: "Pelle mécanique lors d'une démolition contrôlée",
    intro: [
      "Guy Monnet & Fils réalise des travaux de démolition pour des bâtiments et ouvrages de tailles variées, suivis du tri, du chargement, du transport et de la revalorisation ou du recyclage des matériaux.",
      "Les matériaux pouvant être revalorisés, comme certaines terres ou pierres, peuvent être acheminés vers le centre de l'entreprise à Riddes ; les autres matériaux sont dirigés vers des centres autorisés.",
    ],
    prestations: [
      "Démolition de bâtiments et ouvrages",
      "Tri des matériaux",
      "Chargement et transport",
      "Recyclage et revalorisation des matériaux",
    ],
    references: [
      { label: "Cycle d'orientation", location: "Leytron" },
      { label: "Villa", location: "Chamoson" },
      { label: "Kiosque", location: "Riddes" },
      { label: "Grange", location: "Isérables" },
      { label: "Villa", location: "Saillon" },
      { label: "Villa", location: "Sion" },
      { label: "Villa", location: "Leytron" },
      { label: "Villa", location: "Pont-de-la-Morge" },
    ],
    relatedServices: ["revalorisation-materiaux", "transport", "terrassement"],
    zoneIntervention: "Leytron, Chamoson, Riddes, Isérables, Saillon, Sion, Pont-de-la-Morge et le reste du Valais.",
  },
  {
    slug: "revalorisation-materiaux",
    name: "Revalorisation des matériaux",
    shortDescription:
      "Tri, criblage et réutilisation des matériaux dans le centre de Riddes.",
    seoTitle: "Revalorisation des matériaux à Riddes | Guy Monnet & Fils",
    seoDescription:
      "Guy Monnet & Fils exploite un centre de tri, criblage et revalorisation des matériaux de chantier à Riddes, dans une logique d'économie circulaire.",
    heroImageLabel: "Criblage de matériaux au centre de revalorisation de Riddes",
    intro: [
      "Guy Monnet & Fils possède son propre centre de revalorisation des matériaux à Riddes, où sont triés, criblés et transformés les matériaux issus des chantiers de l'entreprise.",
      "Certains matériaux sont ensuite réutilisés au sein de l'entreprise, notamment pour des travaux de terrassement ou d'aménagement extérieur, d'autres sont revendus.",
    ],
    prestations: ["Tri des matériaux", "Criblage", "Revalorisation et réutilisation", "Revente de matériaux"],
    savoirFaire: ["Réception → Tri → Criblage → Valorisation → Réemploi"],
    relatedServices: ["demolition", "amenagements-exterieurs", "terrassement"],
    zoneIntervention: "Centre situé à Riddes, au service des chantiers du Valais.",
  },
  {
    slug: "deneigement",
    name: "Déneigement",
    shortDescription:
      "Déneigement professionnel pour collectivités, routes et particuliers.",
    seoTitle: "Déneigement à Riddes & La Tzoumaz | Guy Monnet & Fils",
    seoDescription:
      "Guy Monnet & Fils assure le déneigement des communes de Riddes, La Tzoumaz et Isérables ainsi que des interventions pour les particuliers en Valais.",
    heroImageLabel: "Chasse-neige Guy Monnet & Fils sur une route enneigée en Valais",
    intro: [
      "Guy Monnet & Fils intervient comme prestataire pour le déneigement des communes de Riddes, La Tzoumaz et Isérables, ainsi que pour la route cantonale Riddes – La Tzoumaz pour le compte de l'État du Valais.",
      "TODO: confirmer contrats actuels avant publication.",
      "L'entreprise intervient également pour des particuliers.",
    ],
    prestations: [
      "Déneigement de routes communales",
      "Déneigement de la route cantonale Riddes – La Tzoumaz",
      "Déneigement pour particuliers",
    ],
    relatedServices: ["transport", "terrassement"],
    zoneIntervention: "Riddes, La Tzoumaz, Isérables et route cantonale Riddes – La Tzoumaz.",
  },
  {
    slug: "pelles-araignees",
    name: "Pelles araignées",
    shortDescription: "Travaux dans les terrains difficiles et fortes pentes.",
    seoTitle: "Travaux avec pelle araignée en Valais | Guy Monnet & Fils",
    seoDescription:
      "Guy Monnet & Fils utilise des pelles araignées pour intervenir en terrain difficile, en forte pente ou sur des zones d'accès compliqué en Valais.",
    heroImageLabel: "Pelle araignée en intervention sur un terrain en pente",
    intro: [
      "Guy Monnet & Fils utilise des pelles araignées depuis de nombreuses années pour travailler dans des terrains difficiles, en forte pente ou sur des zones à l'accès compliqué.",
      "Ce type de machine permet d'intervenir sur des chantiers inaccessibles aux engins de terrassement classiques, notamment en montagne.",
    ],
    prestations: [
      "Terrassement en forte pente",
      "Intervention en terrain difficile d'accès",
      "Travaux en zone de montagne",
    ],
    relatedServices: ["terrassement", "cours-eau", "genie-civil"],
    relatedProjects: ["les-larmes-du-fou"],
    zoneIntervention: "Zones de montagne et terrains difficiles du Valais.",
  },
  {
    slug: "cours-eau",
    name: "Cours d'eau",
    shortDescription:
      "Aménagement et sécurisation de cours d'eau et berges.",
    seoTitle: "Travaux et aménagement de cours d'eau en Valais | Guy Monnet",
    seoDescription:
      "Guy Monnet & Fils participe à des projets pluridisciplinaires d'aménagement de cours d'eau en Valais, entre protection contre les dangers naturels et ingénierie.",
    heroImageLabel: "Chantier d'aménagement d'un cours d'eau en Valais",
    intro: [
      "Guy Monnet & Fils participe à des projets pluridisciplinaires concernant les cours d'eau, en combinant enjeux naturels, protection contre les dangers naturels et ingénierie.",
      "Ces chantiers sont menés en collaboration avec des entreprises spécialisées et des bureaux d'ingénieurs.",
    ],
    prestations: [
      "Aménagement de cours d'eau",
      "Sécurisation de berges",
      "Travaux de protection contre les dangers naturels",
    ],
    relatedServices: ["genie-civil", "pelles-araignees"],
    relatedProjects: ["torrent-du-lue", "les-larmes-du-fou"],
    zoneIntervention: "Cours d'eau et torrents du Valais.",
  },
  {
    slug: "sentiers-pedestres",
    name: "Sentiers pédestres",
    shortDescription: "Création, rénovation et sécurisation de sentiers.",
    seoTitle: "Création & rénovation de sentiers en Valais | Guy Monnet",
    seoDescription:
      "Guy Monnet & Fils crée, rénove et sécurise des sentiers pédestres en Valais, notamment le Sentier des Sens à La Tzoumaz.",
    heroImageLabel: "Sentier pédestre aménagé en Valais",
    intro: [
      "Guy Monnet & Fils crée de nouveaux sentiers et améliore ou sécurise des sentiers existants, en Valais.",
      "Le Sentier des Sens, réalisé pour la commune de La Tzoumaz, illustre cette activité, avec des travaux de génie civil et de maçonnerie associés, dont un pont en béton apparent.",
    ],
    prestations: [
      "Création de nouveaux sentiers",
      "Rénovation de sentiers existants",
      "Sécurisation de sentiers",
    ],
    relatedServices: ["genie-civil", "maconnerie"],
    relatedProjects: ["sentier-des-sens"],
    zoneIntervention: "La Tzoumaz et l'ensemble du Valais.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
