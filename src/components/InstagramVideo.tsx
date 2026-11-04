"use client";

import { useState } from "react";

/** « https://www.instagram.com/p/ABC/ » ou « …/reel/ABC/ » → adresse d'intégration officielle. */
function embedUrl(url: string) {
  const match = url.match(/instagram\.com\/(p|reel|tv)\/([\w-]+)/);
  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/` : null;
}

/**
 * Vidéo Instagram intégrée sans alourdir la page : on affiche d'abord une
 * carte au format téléphone (affiche facultative + bouton lecture) ; le
 * lecteur Instagram n'est chargé qu'au clic. Rien n'est demandé à Instagram
 * avant que le visiteur lance la vidéo.
 */
export function InstagramVideo({
  url,
  title,
  poster,
}: {
  url: string;
  title: string;
  /** Visuel affiché avant la lecture (slot photo), sinon fond de marque. */
  poster?: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const src = embedUrl(url);

  return (
    <div className="mx-auto w-full max-w-[260px] sm:max-w-[340px]">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[28px] border-[6px] border-anthracite bg-ink shadow-2xl ring-1 ring-white/15">
        {playing && src ? (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full bg-paper"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="focus-ring group absolute inset-0 flex h-full w-full flex-col items-center justify-center text-paper"
            aria-label={`Lire la vidéo : ${title}`}
          >
            {poster ? <span className="absolute inset-0">{poster}</span> : <span className="hatch-dark absolute inset-0" />}
            <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-ink shadow-xl transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
            <span className="relative mt-5 font-display text-lg font-extrabold uppercase">Voir la vidéo</span>
            <span className="relative mt-1 text-sm text-concrete-light">Reel Instagram</span>
          </button>
        )}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring mt-4 block text-center text-sm font-bold text-accent hover:underline"
      >
        Voir sur Instagram →
      </a>
    </div>
  );
}
