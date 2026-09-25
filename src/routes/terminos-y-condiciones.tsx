import { createFileRoute } from "@tanstack/react-router";
import { LegalDocument } from "@/components/central/LegalDocument";
import { Section } from "@/components/central/primitives";
import { termsContent } from "@/data/legal";

export const Route = createFileRoute("/terminos-y-condiciones")({
  head: () => ({ meta: [
    { title: "Términos y Condiciones | CENTRAL" },
    { name: "description", content: "Consulta las condiciones de acceso y uso del sitio web de CENTRAL." },
    { property: "og:title", content: "Términos y Condiciones | CENTRAL" },
    { property: "og:description", content: "Condiciones aplicables al uso de los contenidos y servicios digitales de CENTRAL." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: TermsPage,
});

function TermsPage() {
  return <>
    <header className="bg-warm"><div className="container-central py-20 md:py-28">
      <p className="eyebrow text-muted-foreground">Términos y Condiciones</p>
      <h1 className="display-lg mt-5 max-w-4xl">Uso claro del sitio.</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">Bienvenido a CENTRAL.</p>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-muted-foreground">Estos Términos y Condiciones regulan el acceso y uso del sitio web de CENTRAL, incluyendo sus contenidos, páginas de ubicación, directorio de comercios, promociones, eventos, servicios, formularios y demás funcionalidades disponibles.</p>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-muted-foreground">Al utilizar este sitio, aceptas estos Términos y Condiciones.</p>
    </div></header>
    <Section><LegalDocument content={termsContent} /></Section>
  </>;
}