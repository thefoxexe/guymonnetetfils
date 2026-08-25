// Toutes les données ci-dessous proviennent du site existant guy-monnet-transports.ch
// ou du brief de refonte. Aucune donnée n'est inventée. Les incertitudes sont marquées TODO.

export const company = {
  name: "Guy Monnet & Fils SA",
  legalForm: "SA",
  foundedYear: 1980,
  incorporatedYear: 2009,
  historicalLocation: "Isérables",
  location: "Riddes",
  canton: "Valais",
  country: "Suisse",
  employeesApprox: 40, // TODO: VALIDATION CLIENT — nombre de collaborateurs à confirmer
  domainsCount: 11,

  address: {
    // ATTENTION : les mentions légales indiquent "Route de l'Avenir 7",
    // le reste du site indique "Chemin de l'Avenir 7".
    // TODO: vérifier adresse officielle avant mise en production
    street: "Chemin de l'Avenir 7",
    streetAlternative: "Route de l'Avenir 7",
    postalCode: "1908",
    city: "Riddes",
    region: "Valais",
    country: "Suisse",
  },

  phone: {
    office: "027 565 86 78",
    officeHref: "tel:+41275658678",
    frederic: "079 358 35 77",
    fredericHref: "tel:+41793583577",
  },

  email: "guy.monnet@bluewin.ch",

  // Horaires majoritairement indiqués sur l'ancien site.
  // D'anciennes pages mentionnent aussi 06:30–23:00 en semaine et 07:00–23:00 le week-end :
  // TODO: VALIDATION CLIENT — horaires à confirmer avant publication
  hours: {
    weekdays: "06:30 – 16:00",
    label: "Lundi – vendredi",
  },

  // Facebook retiré à la demande du client. Instagram : lien réel à
  // transmettre (aucune URL inventée) — tant qu'il n'est pas fourni, l'icône
  // n'est pas affichée dans le footer plutôt que de pointer vers une URL
  // incorrecte.
  social: {
    instagram: null as string | null,
  },

  photoCredit: "Drone Valais Production",

  founder: "Guy Monnet",
  director: {
    name: "Frédéric Monnet",
    role: "Directeur général",
  },

  positioning:
    "Entreprise familiale valaisanne, disponibilité, efficacité, réactivité et forte connaissance du terrain.",

  siteUrl: "https://www.guy-monnet-fils.ch",
};

export type Company = typeof company;
