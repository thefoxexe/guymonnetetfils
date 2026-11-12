"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * `position` : cadrage de la miniature (classe Tailwind object-position).
 * `tall` : photo verticale mise en avant (personne au travail…), sur deux rangées de haut.
 */
export type GalleryImage = { src: string; alt: string; position?: string; tall?: boolean };

type Cell = { col: number; row: number; w: number; h: number };

/** Place les photos dans l'ordre donné et renvoie les cases et le nombre de trous. */
function packOnce(images: GalleryImage[], order: number[], cols: number): { cells: Cell[]; holes: number } {
  const grid: boolean[][] = [];
  const used = (r: number, c: number) => Boolean(grid[r]?.[c]);
  const free = (r: number, c: number, w: number, h: number) => {
    if (c + w > cols) return false;
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) if (used(y, x)) return false;
    return true;
  };
  const mark = (cell: Cell) => {
    for (let y = cell.row; y < cell.row + cell.h; y++) {
      grid[y] ??= Array(cols).fill(false);
      for (let x = cell.col; x < cell.col + cell.w; x++) grid[y]![x] = true;
    }
  };
  const cells: Cell[] = Array(images.length);
  for (const i of order) {
    const big = i === 0;
    const w = big ? Math.min(2, cols) : 1;
    const h = big || images[i]!.tall ? 2 : 1;
    search: for (let r = 0; ; r++) {
      for (let c = 0; c < cols; c++) {
        if (free(r, c, w, h)) {
          cells[i] = { col: c, row: r, w, h };
          mark(cells[i]!);
          break search;
        }
      }
    }
  }

  // Dernière rangée incomplète : une photo seule s'étale sur toute la largeur ;
  // sinon on prolonge vers le bas les photos du dessus, puis on élargit la
  // dernière photo de la rangée jusqu'au bord.
  const last = grid.length - 1;
  const inLast = cells.filter((c) => c.row === last && c.h === 1);
  if (inLast.length === 1 && grid[last]!.filter(Boolean).length === 1) {
    Object.assign(inLast[0]!, { col: 0, w: cols, h: 2 });
    return { cells, holes: 0 };
  }
  for (let c = 0; c < cols; c++) {
    if (used(last, c) || last === 0) continue;
    const above = cells.find((k) => k.row + k.h === last && k.h === 1 && k.col <= c && c < k.col + k.w);
    if (above && Array.from({ length: above.w }, (_, x) => !used(last, above.col + x)).every(Boolean)) {
      above.h = 2;
      mark(above);
    }
  }
  for (const cell of cells.filter((k) => k.row + k.h - 1 === last)) {
    let end = cell.col + cell.w;
    while (end < cols && Array.from({ length: cell.h }, (_, y) => !used(cell.row + y, end)).every(Boolean)) end++;
    if (end > cell.col + cell.w) {
      cell.w = end - cell.col;
      mark(cell);
    }
  }
  const holes = grid.reduce((n, row) => n + row.filter((x) => !x).length, 0);
  return { cells, holes };
}

/**
 * Mosaïque de `cols` colonnes : la première photo en grand (2×2), les photos
 * `tall` sur deux rangées, les autres sur une case, sans trou. Si l'ordre
 * d'origine laisse des trous, on avance ou recule une photo haute de
 * quelques places pour que tout s'emboîte.
 */
function pack(images: GalleryImage[], cols: number): Cell[] {
  if (images.length === 1) return [{ col: 0, row: 0, w: cols, h: 2 }];
  const base = images.map((_, i) => i);
  let best = { ...packOnce(images, base, cols), moved: 0 };
  for (const t of base.filter((i) => i > 0 && images[i]!.tall)) {
    for (let p = 1; p < images.length && best.holes > 0; p++) {
      const order = base.filter((i) => i !== t);
      order.splice(p, 0, t);
      const result = packOnce(images, order, cols);
      const moved = Math.abs(p - t);
      if (result.holes < best.holes || (result.holes === best.holes && moved < best.moved)) {
        best = { ...result, moved };
      }
    }
  }
  return best.cells;
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

  const sm = pack(images, 2);
  const lg = pack(images, 3);

  const arrow =
    "focus-ring absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-xl font-bold text-ink transition-colors hover:bg-accent disabled:opacity-30 sm:flex";

  return (
    <>
      <div className="grid auto-rows-[240px] grid-cols-1 gap-3 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3">
        {images.map((image, i) => (
          <Reveal
            key={image.src}
            delay={(i % 3) * 60}
            style={{
              ["--sm-col" as string]: `${sm[i]!.col + 1} / span ${sm[i]!.w}`,
              ["--sm-row" as string]: `${sm[i]!.row + 1} / span ${sm[i]!.h}`,
              ["--lg-col" as string]: `${lg[i]!.col + 1} / span ${lg[i]!.w}`,
              ["--lg-row" as string]: `${lg[i]!.row + 1} / span ${lg[i]!.h}`,
            }}
            className={`relative overflow-hidden bg-anthracite sm:[grid-column:var(--sm-col)] sm:[grid-row:var(--sm-row)] lg:[grid-column:var(--lg-col)] lg:[grid-row:var(--lg-row)] ${
              image.tall ? "max-sm:row-span-2" : ""
            }`}
          >
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
