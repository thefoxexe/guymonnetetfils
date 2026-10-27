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
  /** Mots-clés courts du bandeau jaune sous le hero (« ■ Routes ■ Réseaux… »). */
  bandItems: string[];
  seoTitle: string;
  seoDescription: string;
  /** Photo de couverture attendue (texte de l'emplacement « Photo à définir » et texte alternatif). */
  heroImageLabel: string;
  intro: string[];
  prestations: string[];
  savoirFaire?: string[];
  savoirFaireTitle?: string;
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
    bandItems: ["Camions tout-terrain", "Camions-grues 24 à 28 m", "Remorque surbaissée", "Bennes multi-lift 10 à 40 m³"],
    seoTitle: "Transport de matériaux & camion-grue en Valais | Guy Monnet",
    seoDescription:
      "Transport de matériaux de chantier en Valais : camions tout-terrain, camions-grues de 24 à 28 m de portée et bennes multi-lift. Entreprise basée à Riddes.",
    heroImageLabel: "Un camion Guy Monnet & Fils en grand, format carré",
    intro: [
      "L'entreprise a commencé par le transport : en 1980, Guy Monnet achète son premier camion.",
      "Aujourd'hui, nos camions livrent les matériaux de nos propres chantiers et travaillent pour les entreprises, les communes et les particuliers du Valais : matériaux, engins, levage au camion-grue et bennes.",
    ],
    prestations: [
      "Transport de matériaux de chantier (terre, gravier, béton, déblais)",
      "Levage et manutention avec camion-grue",
      "Transport de charges avec remorque surbaissée",
      "Location de bennes multi-lift (10 à 40 m³)",
    ],
    savoirFaireTitle: "Notre parc de véhicules",
    savoirFaire: [
      "7 camions tout-terrain pour le transport de matériaux de chantier",
      "2 camions-grues, de 24 à 28 mètres de portée (un de 24 m, un de 28 m)",
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
    bandItems: ["Préparation de terrain", "Bâtiments", "Infrastructures", "Privés & collectivités"],
    seoTitle: "Terrassement en Valais | Guy Monnet & Fils SA",
    seoDescription:
      "Entreprise de terrassement en Valais depuis 1980 : préparation de terrains pour bâtiments et infrastructures, clients privés et collectivités publiques.",
    heroImageLabel: "Gros chantier de terrassement (Isérables)",
    intro: [
      "Nous faisons du terrassement pour des clients privés et pour les collectivités publiques.",
      "Avant la construction d'un bâtiment, d'une route ou d'un réseau, nous préparons le terrain avec nos propres pelles mécaniques et nos camions, y compris sur les terrains difficiles.",
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
    relatedProjects: ["station-phytosanitaire-saxon", "chambre-recolte-des-eaux-leytron", "skatepark-riddes"],
    zoneIntervention: "Riddes, La Tzoumaz, Isérables, Leytron, Ardon, Nendaz et le reste du Valais.",
  },
  {
    slug: "genie-civil",
    name: "Génie civil",
    shortDescription:
      "Routes, réseaux, conduites et infrastructures publiques ou privées.",
    bandItems: ["Routes", "Réseaux enterrés", "Conduites", "Ouvrages en béton", "Collectivités"],
    seoTitle: "Entreprise de génie civil en Valais | Guy Monnet & Fils",
    seoDescription:
      "Entreprise de génie civil à Riddes : routes, réseaux, conduites et infrastructures pour collectivités et maîtres d'ouvrage privés en Valais.",
    heroImageLabel: "Pose de conduite ou réfection de route",
    intro: [
      "Guy Monnet & Fils intervient pour le secteur privé et public dans la construction et la rénovation d'infrastructures.",
      "L'entreprise prend en charge différents travaux liés aux routes, aux infrastructures et aux réseaux enterrés : fouilles, conduites, ouvrages en béton, ainsi que des travaux en sous-sol nécessitant une bonne connaissance du terrain valaisan.",
    ],
    prestations: [
      "Routes et infrastructures",
      "Réfection de chaussées",
      "Réseaux enterrés",
      "Fouilles",
      "Conduites d'eau",
      "Égouts et eaux de surface",
      "Réseaux électriques",
      "Chambres de captage",
      "Ouvrages en béton",
      "Travaux pour communes et collectivités",
    ],
    references: [
      {
        label: "Fouille turbinage eau potable / gaz",
        location: "Isérables et Riddes",
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
      { label: "Rue des Artisans, étapes 1 et 2", location: "Riddes", projectSlug: "rue-des-artisans-etape-1" },
      { label: "Parking P+R CFF", location: "Valais", projectSlug: "cff-parking-p-r" },
      { label: "Chambre de récolte des eaux", location: "Commune de Leytron", projectSlug: "chambre-recolte-des-eaux-leytron" },
    ],
    relatedServices: ["terrassement", "cours-eau", "sentiers-pedestres"],
    relatedProjects: ["torrent-du-lue", "rue-des-artisans-etape-2", "rue-des-artisans-etape-1", "cff-parking-p-r", "chambre-recolte-des-eaux-leytron", "sentier-des-sens"],
    zoneIntervention: "Riddes, Isérables, La Tzoumaz et l'ensemble du Valais.",
  },
  {
    slug: "maconnerie",
    name: "Maçonnerie",
    shortDescription:
      "Construction en béton armé, chalets, annexes, garages et ouvrages spécifiques.",
    bandItems: ["Chalets", "Rénovations", "Annexes & garages", "Béton armé"],
    seoTitle: "Maçonnerie & béton armé en Valais | Guy Monnet & Fils",
    seoDescription:
      "Maçonnerie et construction béton armé en Valais : chalets, rénovations, annexes, garages et ouvrages spécifiques réalisés par Guy Monnet & Fils.",
    heroImageLabel: "Ouvrage en béton armé (Padel de Riddes, chalet…)",
    intro: [
      "Nous construisons des chalets, des annexes et des garages, et nous faisons des rénovations et des ouvrages en béton, pour des privés comme pour des maîtres d'ouvrage publics.",
      "Nous réalisons aussi des ouvrages techniques en béton armé dans des endroits difficiles d'accès, comme le réservoir d'Ovronnaz, bétonné à l'hélicoptère.",
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
        note: "150 m³ de béton étanche, 18 t d'acier d'armature (fiche de référence du client)",
        projectSlug: "station-phytosanitaire-saxon",
      },
      {
        label: "Chambre de récolte des eaux",
        location: "Commune de Leytron",
        note: "90 m³ de béton héliporté",
        projectSlug: "chambre-recolte-des-eaux-leytron",
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
    relatedProjects: ["station-phytosanitaire-saxon", "chambre-recolte-des-eaux-leytron", "sentier-des-sens"],
    zoneIntervention: "Riddes, Saxon, La Tzoumaz, Ovronnaz et l'ensemble du Valais.",
  },
  {
    slug: "amenagements-exterieurs",
    name: "Aménagements extérieurs",
    shortDescription:
      "Murs, enrochements, pavage, bordures, goudronnage et aménagements.",
    bandItems: ["Murs en pierre", "Enrochements", "Pavés & bordures", "Goudronnage"],
    seoTitle: "Aménagements extérieurs en Valais | Guy Monnet & Fils",
    seoDescription:
      "Aménagements extérieurs en Valais : murs, enrochements, pavage, bordures et goudronnage, avec fourniture de terre végétale par Guy Monnet & Fils.",
    heroImageLabel: "Mur en pierre sèche",
    intro: [
      "Murs en pierre sèche, enrochements, pavés, bordures, goudronnage : nous réalisons les aménagements extérieurs des particuliers, des entreprises et des communes.",
      "Comme nous faisons aussi le terrassement et la maçonnerie, nous pouvons prendre le chantier en charge du début à la fin.",
    ],
    prestations: [
      "Préparation des terrains",
      "Construction de murs",
      "Murs en pierre",
      "Enrochements",
      "Pose de pavés",
      "Pose de bordures",
      "Goudronnage",
      "Fourniture et pose de terre végétale",
    ],
    relatedServices: ["terrassement", "revalorisation-materiaux", "maconnerie"],
    relatedProjects: ["station-phytosanitaire-saxon"],
    zoneIntervention: "Riddes et l'ensemble du Valais.",
  },
  {
    slug: "demolition",
    name: "Démolition",
    shortDescription:
      "Démolition, évacuation, tri et traitement des matériaux.",
    bandItems: ["Démolition", "Tri", "Évacuation", "Revalorisation"],
    seoTitle: "Entreprise de démolition en Valais | Guy Monnet & Fils",
    seoDescription:
      "Démolition, tri et évacuation de matériaux en Valais. Les matériaux valorisables sont dirigés vers le centre de revalorisation de Guy Monnet & Fils à Riddes.",
    heroImageLabel: "Démolition d'un bâtiment à la pelle mécanique",
    intro: [
      "Nous démolissons des bâtiments et des ouvrages de toutes tailles et nous évacuons les matériaux.",
      "Après la démolition, les matériaux sont triés. Une partie part dans des centres de recyclage autorisés ; la terre et la pierre réutilisables vont à notre centre de revalorisation de Riddes.",
      "La démolition, le transport et la gestion des matériaux sont donc faits par la même entreprise.",
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
    bandItems: ["Tri", "Criblage", "Réutilisation", "Économie circulaire"],
    seoTitle: "Revalorisation des matériaux à Riddes | Guy Monnet & Fils",
    seoDescription:
      "Guy Monnet & Fils exploite un centre de tri, criblage et revalorisation des matériaux de chantier à Riddes, dans une logique d'économie circulaire.",
    heroImageLabel: "Centre de revalorisation de Riddes : tri et criblage",
    intro: [
      "Nous exploitons notre propre centre de revalorisation des matériaux à Riddes. Les matériaux y sont triés, criblés et préparés pour être réutilisés sur nos chantiers ou revendus comme matériaux de construction.",
      "Réutiliser la terre, la pierre et le gravier évite d'extraire de nouveaux matériaux et de remplir les décharges. Comme le centre est à Riddes, près des chantiers de la région, les trajets sont aussi plus courts.",
      "Le centre de Riddes est un site agréé, contrôlé et mis aux normes. TODO: VALIDATION CLIENT : indiquer le nom exact de l'agrément ou de la certification du site.",
    ],
    prestations: ["Tri des matériaux", "Criblage", "Revalorisation et réutilisation", "Revente de matériaux"],
    savoirFaireTitle: "Donner une seconde vie aux matériaux de construction",
    savoirFaire: ["Réception → Tri → Criblage → Contrôle → Réutilisation ou revente"],
    relatedServices: ["demolition", "amenagements-exterieurs", "terrassement"],
    zoneIntervention: "Centre situé à Riddes, au service des chantiers du Valais.",
  },
  {
    slug: "deneigement",
    name: "Déneigement",
    shortDescription:
      "Déneigement professionnel pour collectivités, routes et particuliers.",
    bandItems: ["Routes communales", "Route cantonale", "Particuliers"],
    seoTitle: "Déneigement à Riddes & La Tzoumaz | Guy Monnet & Fils",
    seoDescription:
      "Guy Monnet & Fils assure le déneigement des communes de Riddes, La Tzoumaz et Isérables ainsi que des interventions pour les particuliers en Valais.",
    heroImageLabel: "Déneigement à La Tzoumaz",
    intro: [
      "Nous déneigeons les routes des communes de Riddes, La Tzoumaz et Isérables, ainsi que la route cantonale de Riddes à La Tzoumaz pour le compte de l'État du Valais.",
      "TODO: confirmer les contrats actuels avant publication.",
      "Nous intervenons aussi chez les particuliers.",
    ],
    prestations: [
      "Déneigement de routes communales",
      "Déneigement de la route cantonale de Riddes à La Tzoumaz",
      "Déneigement pour particuliers",
    ],
    relatedServices: ["transport", "terrassement"],
    zoneIntervention: "Riddes, La Tzoumaz, Isérables et la route cantonale de Riddes à La Tzoumaz.",
  },
  {
    slug: "pelles-araignees",
    name: "Pelles araignées",
    shortDescription: "Travaux dans les terrains difficiles et fortes pentes.",
    bandItems: ["Fortes pentes", "Terrains difficiles", "Montagne"],
    seoTitle: "Travaux avec pelle araignée en Valais | Guy Monnet & Fils",
    seoDescription:
      "Guy Monnet & Fils utilise des pelles araignées pour intervenir en terrain difficile, en forte pente ou sur des zones d'accès compliqué en Valais.",
    heroImageLabel: "Pelle araignée en forte pente",
    intro: [
      "Nous avons une équipe de pelle araignée depuis de nombreuses années. Elle travaille sur tout type de terrain, y compris en forte pente.",
      "La pelle araignée passe là où une pelle classique ne peut pas aller : talus raides, bords de cours d'eau, chantiers de montagne.",
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
    bandItems: ["Berges", "Dangers naturels", "Interventions en rivière"],
    seoTitle: "Travaux et aménagement de cours d'eau en Valais | Guy Monnet",
    seoDescription:
      "Guy Monnet & Fils participe à des projets pluridisciplinaires d'aménagement de cours d'eau en Valais, entre protection contre les dangers naturels et ingénierie.",
    heroImageLabel: "Aménagement de berges ou ouvrage en rivière",
    intro: [
      "Nous travaillons sur des projets d'aménagement de cours d'eau : protection contre les dangers naturels, berges, ouvrages en rivière.",
      "Ces chantiers se font avec des entreprises spécialisées et des bureaux d'ingénieurs.",
    ],
    prestations: [
      "Terrassement en bordure de cours d'eau",
      "Aménagement de berges",
      "Ouvrages de protection contre les dangers naturels",
      "Interventions en rivière",
      "Infrastructures associées aux cours d'eau",
      "Travaux avec engins spécialisés (pelles araignées)",
    ],
    relatedServices: ["genie-civil", "pelles-araignees"],
    relatedProjects: ["torrent-du-lue", "les-larmes-du-fou"],
    zoneIntervention: "Cours d'eau et torrents du Valais.",
  },
  {
    slug: "sentiers-pedestres",
    name: "Sentiers pédestres",
    shortDescription: "Création, rénovation et sécurisation de sentiers.",
    bandItems: ["Création", "Rénovation", "Sécurisation"],
    seoTitle: "Création & rénovation de sentiers en Valais | Guy Monnet",
    seoDescription:
      "Guy Monnet & Fils crée, rénove et sécurise des sentiers pédestres en Valais, notamment le Sentier des Sens à La Tzoumaz.",
    heroImageLabel: "Sentier pédestre en montagne",
    intro: [
      "Nous créons de nouveaux sentiers et nous rénovons ou sécurisons les sentiers existants en Valais.",
      "Exemple : le Sentier des Sens à La Tzoumaz, réalisé pour la commune, avec son pont en béton apparent.",
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
