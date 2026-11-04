import { PageHero } from "@/components/PageHero";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Confidentialité | Guy Monnet & Fils SA",
  description: "Protection des données sur le site de Guy Monnet & Fils SA.",
  path: "/confidentialite/",
});

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero size="sm" crumbs={[{ name: "Confidentialité", path: "/confidentialite/" }]} title="Confidentialité" />
      <section>
        <div className="container-wide max-w-3xl space-y-8 py-12 text-[15px] leading-relaxed text-steel sm:py-16">
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase text-ink">En bref</h2>
            <p className="mt-2">
              Ce site présente simplement notre entreprise. Il n&apos;utilise ni cookies de suivi,
              ni outil de statistiques, ni publicité.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase text-ink">Formulaire de contact</h2>
            <p className="mt-2">
              Les informations envoyées par le formulaire (nom, entreprise, téléphone, e-mail,
              message) servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni
              transmises à des tiers.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase text-ink">Vos données</h2>
            <p className="mt-2">
              Pour consulter ou supprimer vos données, écrivez-nous à{" "}
              <a href={`mailto:${company.email}`} className="font-semibold text-ink underline hover:text-accent-ink">
                {company.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
