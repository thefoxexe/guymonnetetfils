import { Container } from "@/components/Container";
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
      <section className="py-16 sm:py-20">
        <Container className="max-w-content">

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-steel">
            <div>
              <h2 className="font-display text-xl font-extrabold uppercase text-ink">Éditeur du site</h2>
              <p className="mt-2">
                {company.name}
                <br />
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}, {company.address.region}
                <br />
                {company.address.country}
              </p>
              <p className="mt-2 text-xs text-accent-ink">
                TODO: vérifier adresse officielle avant mise en production — les anciennes mentions
                légales indiquaient « {company.address.streetAlternative} » alors que le reste du
                site indiquait « {company.address.street} ». Une seule version doit être retenue.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-extrabold uppercase text-ink">Contact</h2>
              <p className="mt-2">
                Téléphone : {company.phone.office}
                <br />
                E-mail : {company.email}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-extrabold uppercase text-ink">Hébergement</h2>
              <p className="mt-2">TODO: contenu client nécessaire — informations sur l&apos;hébergeur du site.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-extrabold uppercase text-ink">Propriété intellectuelle</h2>
              <p className="mt-2">
                L&apos;ensemble des contenus présents sur ce site (textes, photographies, vidéos,
                logo) est la propriété de {company.name} ou de ses partenaires, sauf mention
                contraire. Toute reproduction, même partielle, est soumise à autorisation
                préalable.
              </p>
              <p className="mt-2">
                Crédit photo/vidéo : {company.photoCredit} (lorsque contractuellement applicable).
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-extrabold uppercase text-ink">Responsabilité</h2>
              <p className="mt-2">
                {company.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations
                diffusées sur ce site, sans garantie d&apos;exhaustivité. L&apos;entreprise ne
                saurait être tenue responsable des erreurs ou omissions constatées.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
