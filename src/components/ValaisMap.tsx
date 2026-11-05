"use client";

import { useEffect, useRef, useState } from "react";
import { valaisMap, valaisPlaces } from "@/data/valais-map";
import { depotDirectionsUrl } from "@/data/company";

// Étiquette au-dessus du point, ou décalée pour ne pas toucher le contour.
const others: { name: string; dx: number; dy: number; anchor: "start" | "middle" | "end" }[] = [
  { name: "Martigny", dx: 0, dy: -13, anchor: "middle" },
  { name: "Sion", dx: 0, dy: -13, anchor: "middle" },
  { name: "Sierre", dx: 0, dy: -13, anchor: "middle" },
  { name: "Viège", dx: -10, dy: -10, anchor: "end" },
  { name: "Brigue", dx: 10, dy: -10, anchor: "start" },
];

/**
 * Carte dessinée du Valais (contours officiels) avec Riddes mis en avant.
 * À l'arrivée à l'écran, le contour se dessine puis le point de Riddes
 * apparaît ; un clic sur Riddes ouvre l'itinéraire Google Maps vers le dépôt.
 * Variante claire (canton hachuré) ou sombre (canton jaune).
 */
export function ValaisMap({ tone = "light" }: { tone?: "light" | "dark" }) {
  const ref = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dark = tone === "dark";
  const [rx, ry] = valaisPlaces.Riddes!;
  const { width, height } = valaisMap;

  return (
    <svg
      ref={ref}
      viewBox={`-20 -20 ${width + 40} ${height + 40}`}
      className={`valais-map h-auto w-full ${shown ? "is-shown" : ""}`}
      role="img"
      aria-label="Carte du Valais : Guy Monnet & Fils SA est basé à Riddes"
    >
      <defs>
        <pattern id={`hatch-${tone}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="14" fill={dark ? "#EAB308" : "#ffffff"} />
          <line x1="0" y1="0" x2="0" y2="14" stroke={dark ? "#d9a406" : "#ebeae6"} strokeWidth="5" />
        </pattern>
        <clipPath id={`frame-${tone}`}>
          <rect x="-20" y="-20" width={width + 40} height={height + 40} />
        </clipPath>
      </defs>

      {/* Léman, coupé au bord du cadre */}
      <path
        d={valaisMap.leman}
        clipPath={`url(#frame-${tone})`}
        fill={dark ? "#2b2f35" : "#e4e8ea"}
        className="valais-map-fade"
      />

      {/* Canton */}
      <path d={valaisMap.valais} fill={`url(#hatch-${tone})`} className="valais-map-fade" />
      <path
        d={valaisMap.valais}
        pathLength={1}
        fill="none"
        stroke={dark ? "#ffffff" : "#181a1b"}
        strokeWidth="3"
        strokeLinejoin="round"
        className="valais-map-draw"
      />

      {/* Villes de repère */}
      {others.map(({ name, dx, dy, anchor }) => {
        const [x, y] = valaisPlaces[name]!;
        return (
          <g key={name} className="valais-map-fade">
            <circle cx={x} cy={y} r="5" fill={dark ? "#181a1b" : "#4a4d52"} />
            <text
              x={x + dx}
              y={y + dy}
              textAnchor={anchor}
              className="font-body"
              fontSize="20"
              fontWeight="600"
              fill={dark ? "#181a1b" : "#4a4d52"}
            >
              {name}
            </text>
          </g>
        );
      })}

      {/* Riddes : lien vers l'itinéraire */}
      <a
        href={depotDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Riddes : itinéraire vers notre dépôt dans Google Maps"
        className="valais-map-link"
      >
      <g className="valais-map-pin">
        <circle cx={rx} cy={ry} r="18" fill="none" stroke={dark ? "#ffffff" : "#EAB308"} strokeWidth="3" className="valais-map-pulse" />
        <rect x={rx - 11} y={ry - 11} width="22" height="22" fill={dark ? "#181a1b" : "#EAB308"} stroke={dark ? "#ffffff" : "#181a1b"} strokeWidth="3" />
        <line x1={rx} y1={ry + 14} x2={rx} y2={ry + 70} stroke={dark ? "#ffffff" : "#181a1b"} strokeWidth="2.5" />
        <rect x={rx - 70} y={ry + 70} width="140" height="44" fill={dark ? "#ffffff" : "#181a1b"} />
        <text
          x={rx}
          y={ry + 100}
          textAnchor="middle"
          className="font-display"
          fontSize="24"
          fontWeight="800"
          letterSpacing="2"
          fill={dark ? "#181a1b" : "#ffffff"}
        >
          RIDDES
        </text>
        <text
          x={rx}
          y={ry + 140}
          textAnchor="middle"
          className="font-body valais-map-hint"
          fontSize="18"
          fontWeight="700"
          fill={dark ? "#ffffff" : "#8A5A0A"}
        >
          Itinéraire →
        </text>
      </g>
      </a>
    </svg>
  );
}
