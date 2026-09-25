import { createFileRoute } from "@tanstack/react-router";
import texturaImg from "@/assets/texture-arq.jpg";
import { LeasingForm } from "@/components/central/LeasingForm";
import { PageHero, Section } from "@/components/central/primitives";

export const Route = createFileRoute("/arrendamientos")({
  head: () => ({ meta: [
    { title: "Arrendamientos comerciales | CENTRAL" },
    { name: "description", content: "Solicita información sobre oportunidades de arrendamiento en CENTRAL San Miguel Centro y Santa Rosa de Lima." },
    { property: "og:title", content: "Arrendamientos comerciales | CENTRAL" },
    { property: "og:description", content: "Presenta tu marca y solicita información sobre espacios comerciales en CENTRAL." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ArrendamientosPage,
});

function ArrendamientosPage() {
  return <>
    <PageHero eyebrow="Oportunidades comerciales" title="Crece con CENTRAL" description="Conoce oportunidades para tu marca en nuestras ubicaciones." image={texturaImg} breadcrumbs={[{ label: "Arrendamientos" }]} />
    <Section id="formulario" tone="sand" className="scroll-mt-24"><LeasingForm /></Section>
  </>;
}