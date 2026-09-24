import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/central/primitives";
import { articles } from "@/data/catalog";
import {
  centralPillars,
  featuredNews,
  homeModules,
  type HomeModuleId,
} from "@/data/home";
import { locationName, locations } from "@/data/locations";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CENTRAL | Centros comerciales de El Salvador" },
      {
        name: "description",
        content:
          "Descubre los centros comerciales CENTRAL: tiendas, gastronomía, eventos, servicios y experiencias en El Salvador.",
      },
      { property: "og:title", content: "CENTRAL | Centros comerciales de El Salvador" },
      {
        property: "og:description",
        content: "Elige tu CENTRAL y descubre tiendas, gastronomía, experiencias y novedades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const modules: Record<HomeModuleId, React.ReactNode> = {
    locations: <LocationsSection />,
    experiences: <ExperiencesSection />,
    news: <NewsSection />,
    leasing: <LeasingSection />,
    institutional: <InstitutionalSection />,
  };

  return (
    <>
      <section className="border-b border-border bg-warm">
        <div className="container-central py-24 md:py-36 lg:py-44">
          <div className="fade-up max-w-4xl">
            <p className="eyebrow text-muted-foreground">CENTRAL · El Salvador</p>
            <h1 className="display-xl mt-6">Vivir Central</h1>
            <span className="mt-8 block h-1 w-16 bg-highlight" aria-hidden />
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Espacios que conectan personas, ciudades y nuevas historias.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="h-12 rounded-none px-8 eyebrow">
                <Link to="/ubicaciones">Conoce nuestras ubicaciones <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {homeModules
        .filter((module) => module.enabled)
        .sort((a, b) => a.order - b.order)
        .map((module) => (
          <div key={module.id}>{modules[module.id]}</div>
        ))}
    </>
  );
}

function LocationsSection() {
  return (
    <Section className="py-16 md:py-20 lg:py-24">
      <SectionHeading eyebrow="Nuestras ubicaciones" title="Elige tu CENTRAL" />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
        {[...locations].sort((a) => (a.status === "proximamente" ? -1 : 1)).map((location) => {
          const soon = location.status === "proximamente";
          return (
            <article key={location.slug} className="flex min-h-72 flex-col justify-between border border-border bg-background p-8 md:min-h-80 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow text-muted-foreground">{location.department}</p>
                {soon && <span className="bg-highlight px-3 py-1 eyebrow text-highlight-foreground">Próximamente</span>}
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold uppercase leading-tight md:text-4xl">{location.name}</h3>
                {location.siteUrl ? (
                  <Button asChild size="lg" variant={soon ? "outline" : "default"} className="mt-8 rounded-none px-7 eyebrow">
                    <a href={location.siteUrl} target="_blank" rel="noopener noreferrer">
                      {soon ? "Conocer" : "Visitar"} <ArrowUpRight />
                    </a>
                  </Button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function ExperiencesSection() {
  return (
    <section className="border-y border-border bg-warm py-20 md:py-28"><div className="container-central">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="eyebrow text-muted-foreground">Experiencia CENTRAL</p>
          <h2 className="display-md mt-4">Una forma de encontrarnos</h2>
          <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">CENTRAL reúne momentos cotidianos y experiencias compartidas en espacios conectados con cada ciudad.</p>
        </div>
        <ul className="grid grid-cols-2 border-l border-t border-foreground/20">
          {centralPillars.map((pillar, index) => (
            <li key={pillar} className="flex min-h-32 flex-col justify-between border-b border-r border-foreground/20 p-5 md:min-h-40 md:p-7">
              <span className="eyebrow text-muted-foreground">0{index + 1}</span>
              <span className="font-display text-xl font-bold uppercase md:text-2xl">{pillar}</span>
            </li>
          ))}
        </ul>
      </div>
      </div></section>
  );
}

function NewsSection() {
  // Sin contenidos reales aprobados todavía: se muestra un estado limpio.
  return (
    <Section className="py-20 md:py-28">
      <SectionHeading eyebrow="Novedades" title="Novedades de la red" />
      <div className="mt-10 border border-dashed border-border bg-warm px-8 py-14 text-center md:py-20">
        <p className="font-display text-xl font-semibold md:text-2xl">Pronto compartiremos novedades de cada CENTRAL.</p>
        <p className="mt-3 text-sm text-muted-foreground">Síguenos en Instagram {site.social[0].handle} para enterarte primero.</p>
      </div>
    </Section>
  );
}

function LeasingSection() {
  return (
    <section className="bg-sand py-12 md:py-14">
      <div className="container-central flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow text-muted-foreground">Arrendamientos</p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase md:text-3xl">¿Quieres formar parte de CENTRAL?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Encuentra oportunidades para que tu marca forme parte de CENTRAL.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0 rounded-none px-7 eyebrow">
          <Link to="/arrendamientos">Conoce nuestras opciones <ArrowRight /></Link>
        </Button>
      </div>
    </section>
  );
}

function InstitutionalSection() {
  return (
    <Section id="institucional" className="py-20 md:py-28">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-4">
          <h2 className="display-md">Esto es CENTRAL</h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-xl leading-relaxed md:text-2xl">{site.description}</p>
          <p className="mt-5 text-sm text-muted-foreground">Una marca salvadoreña de centros comerciales.</p>
        </div>
      </div>
    </Section>
  );
}

function TextLink({ to, children, className = "" }: { to: "/ubicaciones" | "/novedades"; children: React.ReactNode; className?: string }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2 border-b border-current pb-1 eyebrow transition-opacity hover:opacity-60 ${className}`}>
      {children} <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}