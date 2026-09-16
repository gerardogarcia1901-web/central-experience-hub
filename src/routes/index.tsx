import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import heroImg from "@/assets/hero-central.jpg";
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
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink text-ink-foreground md:min-h-[86svh]">
        <img
          src={heroImg}
          alt="Plaza principal de un centro comercial CENTRAL al atardecer"
          className="absolute inset-0 -z-10 size-full object-cover opacity-70"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/15" aria-hidden />
        <div className="container-central w-full pb-12 pt-28 md:pb-20">
          <div className="fade-up max-w-4xl">
            <p className="eyebrow text-ink-foreground/60">CENTRAL · El Salvador</p>
            <h1 className="display-xl mt-5">Vivir CENTRAL</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-foreground/75 md:text-lg">
              Espacios que conectan personas, ciudades y nuevas historias.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="rounded-none px-8 eyebrow">
                <Link to="/ubicaciones">Elige tu CENTRAL</Link>
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
      <SectionHeading
        eyebrow="Nuestros centros"
        title="Elige tu CENTRAL"
        description="Conoce nuestras ubicaciones y elige el CENTRAL que quieres visitar."
        action={
          <TextLink to="/ubicaciones">Ver todos los centros</TextLink>
        }
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
        {locations.map((location) => (
          <article key={location.slug} className="group overflow-hidden bg-card">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={location.image} alt={`Vista de ${location.name}`} className="image-cover" loading="lazy" width={1600} height={900} />
              <span className="absolute left-5 top-5 bg-background/90 px-3 py-1 eyebrow">{location.department}</span>
            </div>
            <div className="border border-t-0 border-border p-6 md:p-8">
              <p className="eyebrow text-muted-foreground">{location.city}, {location.department}</p>
              <h3 className="mt-3 font-display text-xl font-bold uppercase md:text-2xl">{location.name}</h3>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ExperiencesSection() {
  return (
    <Section tone="sand" className="py-20 md:py-28">
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
    </Section>
  );
}

function NewsSection() {
  const selected = featuredNews.flatMap((item) => {
    const article = articles.find((entry) => entry.slug === item.slug);
    return article ? [{ ...article, locationSlug: item.locationSlug }] : [];
  });

  return (
    <Section className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Actualidad"
        title="Novedades destacadas"
        description="Una selección breve de historias y anuncios de nuestras ubicaciones."
        action={<TextLink to="/novedades">Ver todo</TextLink>}
      />
      <div className="mt-12 grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-12">
        {selected.map((item, index) => (
          <article key={item.slug} className={index === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
            <Link to="/novedades/$slug" params={{ slug: item.slug }} className="group block">
              <div className={`overflow-hidden bg-muted ${index === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="image-cover"
                  loading="lazy"
                  width={1200}
                  height={900}
                />
              </div>
              <div className="mt-5">
                <p className="eyebrow text-muted-foreground">{locationName(item.locationSlug)} · {item.displayDate}</p>
                <h3 className={`mt-3 font-display font-bold uppercase leading-tight ${index === 0 ? "text-2xl md:text-3xl" : "text-lg"}`}>
                  {item.title}
                </h3>
                {index === 0 && <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{item.summary}</p>}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

function LeasingSection() {
  return (
    <section className="bg-sand py-10 md:py-12">
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