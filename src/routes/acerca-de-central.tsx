import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/central/primitives";

export const Route = createFileRoute("/acerca-de-central")({
  head: () => ({ meta: [
    { title: "Acerca de CENTRAL | El Salvador" },
    { name: "description", content: "Conoce la marca CENTRAL y sus ubicaciones en San Miguel y Santa Rosa de Lima." },
    { property: "og:title", content: "Acerca de CENTRAL" },
    { property: "og:description", content: "CENTRAL reúne comercio, gastronomía y servicios en ubicaciones pensadas para disfrutar." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return <>
    <header className="bg-warm"><div className="container-central py-20 md:py-32">
      <p className="eyebrow text-muted-foreground">Nuestra marca</p>
      <h1 className="display-lg mt-5">Acerca de CENTRAL</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">CENTRAL es la marca de centros comerciales de Grupo Galo. Cada ubicación reúne comercio, gastronomía y servicios con una experiencia cercana, actual y fácil de disfrutar.</p>
    </div></header>
    <Section>
      <div className="grid gap-px bg-border md:grid-cols-2">
        <article className="bg-background p-8 md:p-12"><p className="eyebrow text-muted-foreground">San Miguel</p><h2 className="mt-4 text-3xl font-bold">San Miguel Centro</h2><p className="mt-5 leading-7 text-muted-foreground">Una plaza urbana en el centro de San Miguel, pensada para compras, gastronomía, servicios y conveniencia cotidiana.</p></article>
        <article className="bg-background p-8 md:p-12"><p className="eyebrow text-muted-foreground">La Unión</p><h2 className="mt-4 text-3xl font-bold">Santa Rosa de Lima</h2><p className="mt-5 leading-7 text-muted-foreground">Un nuevo CENTRAL en desarrollo sobre Ruta Militar / RN18E, en Santa Rosa de Lima, La Unión.</p></article>
      </div>
      <Button asChild size="lg" className="mt-10 rounded-none px-8 eyebrow"><Link to="/ubicaciones">Conoce nuestras ubicaciones <ArrowRight aria-hidden /></Link></Button>
    </Section>
  </>;
}