import { createFileRoute } from "@tanstack/react-router";
import { LegalDocument } from "@/components/central/LegalDocument";
import { Section } from "@/components/central/primitives";
import { privacyPolicyContent } from "@/data/legal";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({ meta: [
    { title: "Política de Privacidad | CENTRAL" },
    { name: "description", content: "Conoce cómo CENTRAL recopila, utiliza y protege tus datos personales." },
    { property: "og:title", content: "Política de Privacidad | CENTRAL" },
    { property: "og:description", content: "Información clara sobre el tratamiento y protección de tus datos en CENTRAL." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <>
    <header className="bg-warm"><div className="container-central py-20 md:py-28">
      <p className="eyebrow text-muted-foreground">Política de Privacidad</p>
      <h1 className="display-lg mt-5 max-w-4xl">Tus datos, con claridad.</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">En CENTRAL respetamos tu privacidad y protegemos la información que nos compartes cuando utilizas nuestro sitio web, formularios y canales digitales.</p>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-muted-foreground">Esta Política de Privacidad explica de forma sencilla qué información podemos recopilar, para qué la utilizamos y qué opciones tienes sobre tus datos personales.</p>
    </div></header>
    <Section><LegalDocument content={privacyPolicyContent} /></Section>
  </>;
}