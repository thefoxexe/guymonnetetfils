"use client";

import { Children, useRef } from "react";

/**
 * Carrousel horizontal simple : défilement au doigt (scroll-snap) sur
 * téléphone, flèches rondes sur ordinateur. Les éléments sont rendus côté
 * serveur et passés en enfants.
 */
export function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  }

  const button =
    "focus-ring flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-paper text-lg font-bold text-ink transition-colors hover:bg-accent";

  return (
    <div role="region" aria-roledescription="carrousel" aria-label={label}>
      <div
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">{child}</div>
        ))}
      </div>
      <div className="mt-5 flex justify-end gap-3">
        <button type="button" className={button} onClick={() => scroll(-1)} aria-label="Photos précédentes">
          ←
        </button>
        <button type="button" className={button} onClick={() => scroll(1)} aria-label="Photos suivantes">
          →
        </button>
      </div>
    </div>
  );
}
