import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="bg-offwhite">
      <div className="container-wide flex min-h-[60vh] flex-col justify-center gap-6 py-20">
        <span className="self-start bg-accent px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] text-ink">
          Erreur 404
        </span>
        <h1 className="stretch-75 max-w-4xl font-display text-[36px] font-black uppercase leading-[0.9] sm:text-[56px]">
          Page introuvable
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-steel">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Retour à l&apos;accueil</Button>
          <Button href="/realisations/" variant="outline">
            Voir nos réalisations
          </Button>
        </div>
      </div>
    </section>
  );
}
