import { PageHero } from "@/components/PageHero";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mentions légales | Guy Monnet & Fils SA",
  description: "Mentions légales du site de Guy Monnet & Fils SA, entreprise basée à Riddes, Valais.",
  path: "/mentions-legales/",
});

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero size="sm" crumbs={[{ name: "Mentions légales", path: "/mentions-legales/" }]} title="Mentions légales" />
      <section>
        <div className="container-wide max-w-3xl space-y-8 py-12 text-[15px] leading-relaxed text-steel sm:py-16">
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase text-ink">Éditeur</h2>
            <p className="mt-2">
              {company.name}
              <br />
              {company.address.street}, {company.address.postalCode} {company.address.city}
              <br />
              {company.phone.office} · {company.email}
            </p>
            <p className="mt-2 text-xs text-accent-ink">TODO: vérifier adresse officielle avant mise en production.</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase text-ink">Hébergement</h2>
            <p className="mt-2">Netlify, Inc. (États-Unis).</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase text-ink">Crédits</h2>
            <p className="mt-2">
              Photos et vidéos : {company.photoCredit}. Site réalisé par WebAlp.ch.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase text-ink">Contenus</h2>
            <p className="mt-2">
              Les textes, photos et logos de ce site appartiennent à {company.name} ou à leurs
              auteurs. Merci de nous demander avant de les réutiliser.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
