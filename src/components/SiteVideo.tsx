"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vidéo hébergée sur le site (fichier MP4/WebM de public/photos/), sans
 * aucune interface autour : lecture automatique sans le son, en boucle,
 * seulement quand elle est à l'écran ; un petit bouton rond active le son.
 * Le fichier n'est chargé qu'à l'approche de la vidéo. Sans fichier : un
 * emplacement « Vidéo à définir » avec le nom de fichier attendu.
 */
export function SiteVideo({
  file,
  poster,
  slot,
  title,
  variant = "phone",
}: {
  file?: string;
  poster?: string;
  slot: string;
  title: string;
  /** "phone" : format téléphone dans une colonne ; "feature" : seule au milieu de l'écran. */
  variant?: "phone" | "feature";
}) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      setVisible(true);
      return;
    }
    const nearObserver = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setNear(true);
    }, { rootMargin: "400px 0px" });
    const visibleObserver = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), {
      threshold: 0.4,
    });
    nearObserver.observe(el);
    visibleObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (visible && !reduce) el.play().catch(() => undefined);
    else el.pause();
  }, [visible, near]);

  const size =
    variant === "feature"
      ? "h-[78vh] max-h-[820px] min-h-[420px] aspect-[9/16] max-w-full"
      : "aspect-[9/16] w-full max-w-[280px] sm:max-w-[320px]";

  return (
    <div
      ref={box}
      className={`relative mx-auto overflow-hidden rounded-2xl bg-ink shadow-xl transition-all duration-700 ease-editorial ${size} ${
        visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      {file ? (
        <>
          {near ? (
            <video
              ref={video}
              src={file}
              poster={poster}
              muted={muted}
              loop
              playsInline
              preload="metadata"
              aria-label={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="focus-ring absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink/60 text-paper backdrop-blur transition-colors hover:bg-ink"
            aria-label={muted ? "Activer le son" : "Couper le son"}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4Z" strokeLinejoin="round" />
              {muted ? <path d="m16 9 5 6m0-6-5 6" strokeLinecap="round" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />}
            </svg>
          </button>
        </>
      ) : (
        <div
          role="img"
          aria-label={`Vidéo à définir : ${title}`}
          className="hatch-dark absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
        >
          <span className="bg-accent px-2.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink">
            ■ Vidéo à définir
          </span>
          <span className="font-mono text-[11px] text-concrete-light/70">{slot}.mp4</span>
        </div>
      )}
    </div>
  );
}
