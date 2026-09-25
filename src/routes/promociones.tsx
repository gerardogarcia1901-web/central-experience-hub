import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/central/primitives";

export const Route = createFileRoute("/promociones")({
  head: () => ({
    meta: [
      { title: "Promociones y campañas | CENTRAL" },
      {
        name: "description",
        content: "Descuentos, campañas y beneficios vigentes en los centros comerciales CENTRAL de El Salvador.",
      },
      { property: "og:title", content: "Promociones y campañas | CENTRAL" },
      { property: "og:description", content: "Aprovecha las promociones activas en los centros CENTRAL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PromocionesPage,
});

function PromocionesPage() {
  return (
    <>
      <PageHero
        title="Promociones"
        description="Conoce nuestras promociones y beneficios."
        breadcrumbs={[{ label: "Promociones" }]}
      />
      <Section className="py-16 md:py-24">
        <div className="border-y border-border py-14 md:py-20" role="status">
          <h2 className="text-2xl font-semibold">Por ahora no hay promociones disponibles.</h2>
          <p className="mt-3 text-base text-muted-foreground">Vuelve pronto para conocer nuevas promociones en CENTRAL.</p>
        </div>
      </Section>
    </>
  );
}
