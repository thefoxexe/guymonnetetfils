import { BrandBand, companyBandItems } from "@/components/BrandBand";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ServiceGrid } from "@/components/ServiceCard";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nos services | Guy Monnet & Fils SA",
  description:
    "11 domaines d'activité : transport, terrassement, génie civil, maçonnerie, aménagements extérieurs, démolition et plus, par Guy Monnet & Fils en Valais.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services/" }]}
        eyebrow="Nos services"
        title={`${services.length} domaines d'activité`}
        intro="Du transport de matériaux aux sentiers de montagne, voici tout ce que nous faisons."
      />
      <BrandBand items={companyBandItems} />
      <section>
        <div className="container-wide py-14 sm:py-20 lg:py-24">
          <ServiceGrid services={services} />
        </div>
      </section>
      <CtaBand title="Vous avez un projet ?" />
    </>
  );
}
