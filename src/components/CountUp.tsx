"use client";

import { useEffect, useRef, useState } from "react";

/** « 3 500 m³ » → { target: 3500, separator: " ", rest: " m³" } ; null si la valeur ne commence pas par un nombre. */
function parse(value: string) {
  const match = value.match(/^(\d{1,3}(?:([ '’ ])\d{3})+|\d+)(.*)$/);
  if (!match) return null;
  return { target: Number(match[1]!.replace(/\D/g, "")), separator: match[2] ?? "", rest: match[3] ?? "" };
}

function format(n: number, separator: string) {
  const digits = String(n);
  return separator ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : digits;
}

/**
 * Affiche une valeur dont le nombre de tête monte de 0 à sa valeur quand
 * elle entre à l'écran (une seule fois). Le HTML généré contient la valeur
 * finale : sans JavaScript, ou avec « réduire les animations », elle
 * s'affiche directement.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!parsed || !el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    setCurrent(0);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.round(parsed.target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // La valeur ne change pas pendant la vie du composant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!parsed) return <span>{value}</span>;
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {format(current ?? parsed.target, parsed.separator)}
        {parsed.rest}
      </span>
    </span>
  );
}
