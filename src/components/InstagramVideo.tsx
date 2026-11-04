"use client";

import { useEffect, useRef, useState } from "react";

/** « https://www.instagram.com/p/ABC/ » ou « …/reel/ABC/ » → adresse d'intégration officielle. */
function embedUrl(url: string) {
  const match = url.match(/instagram\.com\/(p|reel|tv)\/([\w-]+)/);
  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/` : null;
}

/**
 * Vidéo au format téléphone, chargée seulement quand elle arrive à l'écran.
 * - Avec un fichier vidéo (`file`, déposé dans public/photos/) : lecture
 *   automatique, sans le son, en boucle ; pause quand elle sort de l'écran.
 * - Sinon : le lecteur Instagram se charge tout seul (Instagram n'autorise
 *   pas la lecture automatique de ses vidéos intégrées).
 */
export function InstagramVideo({
  url,
  title,
  file,
  poster,
}: {
  url: string;
  title: string;
  file?: string;
  /** Image affichée avant le chargement (adresse d'une photo). */
  poster?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = embedUrl(url);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      setLoaded(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting);
        setVisible(isVisible);
        if (isVisible) setLoaded(true);
      },
      { rootMargin: "200px 0px", threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fichier vidéo : lecture quand visible, pause sinon (et jamais si l'appareil
  // demande de réduire les animations).
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (visible && !reduce) el.play().catch(() => undefined);
    else el.pause();
  }, [visible, loaded]);

  return (
    <div className="mx-auto w-full max-w-[280px] sm:max-w-[320px]">
      <div
        ref={box}
        className="relative aspect-[9/16] w-full overflow-hidden rounded-[28px] border-[6px] border-ink bg-ink shadow-xl"
      >
        {loaded && file ? (
          <video
            ref={video}
            src={file}
            poster={poster}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : loaded && src ? (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full bg-paper"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
          />
        ) : (
          <div className="hatch-dark absolute inset-0" aria-hidden="true" />
        )}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring mt-3 block text-center text-sm font-bold text-accent-ink hover:underline"
      >
        Voir sur Instagram →
      </a>
    </div>
  );
}
