import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Politique de confidentialité | Guy Monnet & Fils SA",
  description: "Politique de confidentialité et protection des données du site de Guy Monnet & Fils SA.",
  path: "/confidentialite/",
});

export default function ConfidentialitePage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Confidentialité", path: "/confidentialite/" }]} />
      <section className="py-16">
        <Container className="max-w-content">
          <h1 className="font-display text-4xl font-bold text-ink">Politique de confidentialité</h1>
          <p className="mt-4 text-sm text-concrete">
            {company.name} traite les données personnelles collectées sur ce site conformément à
            la loi fédérale suisse sur la protection des données (LPD) et, lorsque applicable, au
            règlement général sur la protection des données (RGPD).
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-concrete">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Données collectées</h2>
              <p className="mt-2">
                Lorsque vous utilisez le formulaire de contact, les informations suivantes peuvent
                être transmises à {company.name} : nom, entreprise, téléphone, e-mail, type de
                projet, lieu du projet, message et, le cas échéant, les fichiers joints. Ces
                données sont utilisées exclusivement pour traiter votre demande.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Formulaire de contact</h2>
              <p className="mt-2">
                Le formulaire de contact ouvre votre messagerie avec un message pré-rempli à
                destination de {company.email}. TODO: contenu client nécessaire si un service
                d&apos;envoi côté serveur est mis en place ultérieurement — cette section devra
                alors être complétée avec le nom du prestataire utilisé.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Cookies et mesure d&apos;audience</h2>
              <p className="mt-2">
                TODO: contenu client nécessaire — cette section doit refléter les outils
                effectivement utilisés (mesure d&apos;audience, cookies) une fois ceux-ci
                définitivement choisis et configurés.
              </p>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-ink">Vos droits</h2>
              <p className="mt-2">
                Conformément à la LPD, vous disposez d&apos;un droit d&apos;accès, de rectification
                et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous
                à {company.email}.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
