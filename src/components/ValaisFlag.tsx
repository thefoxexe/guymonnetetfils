/**
 * Drapeau du Valais (carré) : parti blanc et rouge, 13 étoiles à cinq rais
 * de l'un en l'autre. TODO: VALIDATION CLIENT : vérifier la disposition des
 * étoiles avec le drapeau officiel (dessin fait sans accès à la source).
 */
const RED = "#E3001B";

function starPath(cx: number, cy: number, r: number) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.4;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

// Moitié gauche (blanche, étoiles rouges) ; la moitié droite est symétrique.
const leftStars: [number, number][] = [
  [16, 16],
  [33, 28],
  [16, 40],
  [33, 52],
  [16, 64],
  [33, 76],
];
const R = 6.5;

export function ValaisFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Drapeau du Valais">
      <defs>
        <clipPath id="vs-left">
          <rect x="0" y="0" width="50" height="100" />
        </clipPath>
        <clipPath id="vs-right">
          <rect x="50" y="0" width="50" height="100" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="50" height="100" fill="#ffffff" />
      <rect x="50" y="0" width="50" height="100" fill={RED} />
      {leftStars.map(([x, y]) => (
        <path key={`l${x}-${y}`} d={starPath(x, y, R)} fill={RED} />
      ))}
      {leftStars.map(([x, y]) => (
        <path key={`r${x}-${y}`} d={starPath(100 - x, y, R)} fill="#ffffff" />
      ))}
      {/* 13e étoile sur la partition, de l'un en l'autre */}
      <path d={starPath(50, 88, R)} fill={RED} clipPath="url(#vs-left)" />
      <path d={starPath(50, 88, R)} fill="#ffffff" clipPath="url(#vs-right)" />
    </svg>
  );
}
