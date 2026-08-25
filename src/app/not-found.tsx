import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="max-w-content">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
          Cette route ne mène nulle part.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-concrete">
          La page demandée n&apos;existe plus ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/" variant="primary">
            Retour à l&apos;accueil
          </Button>
          <Button href="/realisations/" variant="secondary">
            Voir nos réalisations
          </Button>
        </div>
      </Container>
    </section>
  );
}
