"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

/** `position` : cadrage de la miniature (classe Tailwind object-position). */
export type GalleryImage = { src: string; alt: string; position?: string };

/**
 * Mosaïque : la première photo occupe 2×2 cases, les suivantes 1 case. La
 * dernière s'élargit si besoin pour que la dernière ligne soit toujours pleine
 * (grille de 2 colonnes en tablette, 3 en desktop).
 */
function mosaicSpan(index: number, count: number) {
  if (index === 0) return count === 1 ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-2 sm:row-span-2";
  if (index !== count - 1) return "";
  const sm = (count - 1) % 2 === 1 ? "sm:col-span-2" : "";
  const leftover = (count - 3) % 3;
  const lg = count === 2 ? "lg:col-span-1" : leftover === 1 ? "lg:col-span-3" : leftover === 2 ? "lg:col-span-2" : "lg:col-span-1";
  return `${sm} ${lg}`;
}

/**
 * Galerie en mosaïque : un clic ouvre la photo en plein écran, puis on passe
 * d'une photo à l'autre en glissant le doigt (défilement natif scroll-snap),
 * avec les flèches à l'écran ou celles du clavier ; Échap ferme.
 */
export function Gallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const goTo = useCallback((index: number, smooth = true) => {
    const el = track.current;
    if (!el) return;
    const target = Math.max(0, Math.min(images.length - 1, index));
    el.scrollTo({ left: target * el.clientWidth, behavior: smooth ? "smooth" : "auto" });
  }, [images.length]);

  function show(index: number, event: React.MouseEvent<HTMLButtonElement>) {
    opener.current = event.currentTarget;
    setCurrent(index);
    setOpen(index);
  }

  function close() {
    setOpen(null);
    opener.current?.focus();
  }

  // À l'ouverture : position sur la photo cliquée, focus sur « Fermer », page figée.
  useEffect(() => {
    if (open === null) return;
    goTo(open, false);
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, goTo]);

  useEffect(() => {
    if (open === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") goTo(current + 1);
      if (event.key === "ArrowLeft") goTo(current - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function onScroll() {
    const el = track.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  }

  const arrow =
    "focus-ring absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-xl font-bold text-ink transition-colors hover:bg-accent disabled:opacity-30 sm:flex";

  return (
    <>
      <div className="grid auto-rows-[240px] grid-cols-1 gap-3 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3">
        {images.map((image, i) => (
          <Reveal key={image.src} delay={(i % 3) * 60} className={`relative overflow-hidden bg-anthracite ${mosaicSpan(i, images.length)}`}>
            <button
              type="button"
              onClick={(event) => show(i, event)}
              className="focus-ring group absolute inset-0 block h-full w-full cursor-zoom-in"
              aria-label={`Agrandir : ${image.alt}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                className={`object-cover transition-transform duration-500 ease-editorial group-hover:scale-105 ${image.position ?? "object-center"}`}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-lg text-ink opacity-0 transition-opacity group-hover:opacity-100"
              >
                ⤢
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null ? (
        <div role="dialog" aria-modal="true" aria-label={`Photos : ${title}`} className="fixed inset-0 z-[100] bg-ink">
          <div
            ref={track}
            onScroll={onScroll}
            className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, i) => (
              <figure key={image.src} className="relative h-full w-full shrink-0 snap-center">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  priority={Math.abs(i - (open ?? 0)) <= 1}
                  className="object-contain p-2 sm:p-10"
                />
              </figure>
            ))}
          </div>

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-paper">
            <span className="rounded-full bg-ink/70 px-3 py-1.5 text-sm font-semibold" aria-live="polite">
              {current + 1} / {images.length}
            </span>
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full bg-paper/90 text-2xl font-bold text-ink transition-colors hover:bg-accent"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>

          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className={`${arrow} left-4`}
            aria-label="Photo précédente"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === images.length - 1}
            className={`${arrow} right-4`}
            aria-label="Photo suivante"
          >
            →
          </button>
        </div>
      ) : null}
    </>
  );
}
