import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      colors: {
        ink: "#181a1b",
        anthracite: "#23262b",
        concrete: "#7c7c7c",
        "concrete-light": "#d9dade",
        offwhite: "#f4f3f0",
        // Blanc pur, identique au fond du logo officiel (échantillonné dans
        // le fichier source) pour qu'aucune bordure/teinte ne se voie autour
        // du logo dans le header et le footer.
        paper: "#ffffff",
        // Jaune de la marque Guy Monnet & Fils, échantillonné depuis le logo
        // officiel (excavateur). Utilisé pour les fonds, bordures et accents
        // graphiques — jamais comme couleur de texte seule (contraste
        // insuffisant sur fond clair), voir `accent-ink` ci-dessous.
        accent: "#EAB308",
        "accent-dark": "#C88A06",
        // Dérivé bronze/doré du jaune de marque, utilisé pour tout texte
        // (labels, liens, survols) afin de rester lisible (contraste AA+)
        // tout en conservant la teinte de marque.
        "accent-ink": "#8A5A0A",
        line: "#e2e1dd",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "760px",
        wide: "1400px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
