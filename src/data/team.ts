// Équipe : données reprises du site existant.
// TODO: CLIENT MUST VALIDATE TEAM LIST — les collaborateurs peuvent changer, à valider avant publication.

export type TeamGroup = {
  id: string;
  label: string;
  members: string[];
};

export const direction = {
  name: "Frédéric Monnet",
  role: "Directeur général",
};

export const teamGroups: TeamGroup[] = [
  {
    id: "machinistes",
    label: "Machinistes",
    members: ["Guy", "Alvaro", "Louisse", "David", "Charly", "Jorel", "Rayan", "Marc", "Luis"],
  },
  {
    id: "chauffeurs",
    label: "Chauffeurs",
    // Deux personnes sont affichées sous le prénom "Alain" sur le site existant : ne pas fusionner.
    members: ["Michel", "Alain", "Alain", "Carroz", "Dylan"],
  },
  {
    id: "chefs-equipe",
    label: "Chefs d'équipe génie civil / maçonnerie",
    members: ["Paulo", "Carlos", "Guy", "Stéphane"],
  },
  {
    id: "macons",
    label: "Maçons",
    members: ["Elder", "Ravi", "Pierre", "Tya", "Paulo", "Carlos", "Alberto"],
  },
  {
    id: "genie-civil",
    label: "Main-d'œuvre génie civil",
    members: ["Leandro", "Sergio", "Fémi", "Manuelle"],
  },
];
