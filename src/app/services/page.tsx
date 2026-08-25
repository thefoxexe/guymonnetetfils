import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceGrid } from "@/components/ServiceCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
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
      <Breadcrumb items={[{ name: "Services", path: "/services/" }]} />
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Nos services"
            title="11 domaines d'activité en Valais"
            description="Une entreprise familiale équipée pour intervenir sur des chantiers de toutes tailles, du transport de matériaux à la création de sentiers."
          />
          <div className="mt-12">
            <ServiceGrid services={services} />
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
