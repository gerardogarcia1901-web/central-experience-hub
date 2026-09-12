import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Compass,
  Mail,
  MapPin,
} from "lucide-react";
import heroImg from "@/assets/hero-central.jpg";
import { Button } from "@/components/ui/button";
import { LocationCard } from "@/components/central/cards";
import { Section, SectionHeading } from "@/components/central/primitives";
import { articles, events, promotions } from "@/data/catalog";
import {
  discoveryLinks,
  featuredExperiences,
  homeHighlights,
  homeModules,
  type HomeModuleId,
} from "@/data/home";
import { locations } from "@/data/locations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CENTRAL | Centros comerciales de El Salvador" },
      {
        name: "description",
        content:
          "Descubre los centros comerciales CENTRAL de Grupo Galo: tiendas, gastronomía, eventos, servicios y experiencias en El Salvador.",
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

type Highlight = {
  type: string;
  title: string;
  description: string;
  image: string;
  meta: string;
  to: "/promociones" | "/eventos" | "/novedades/$slug";
  params?: { slug: string };
};

function Home() {
  const modules: Record<HomeModuleId, React.ReactNode> = {
    locations: <LocationsSection />,
    discovery: <DiscoverySection />,
    highlights: <HighlightsSection />,
    experiences: <ExperiencesSection />,
    visit: <VisitSection />,
    leasing: <LeasingSection />,
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
            <p className="eyebrow text-ink-foreground/60">Grupo Galo · El Salvador</p>
            <h1 className="display-xl mt-5">Vive tus momentos</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-foreground/75 md:text-lg">
              Compras, gastronomía y experiencias que conectan con cada ciudad.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-none px-8 eyebrow">
                <Link to="/ubicaciones">Elige tu CENTRAL</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none border-ink-foreground/30 bg-transparent px-8 eyebrow text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
              >
                <Link to="/directorio">Explorar directorio</Link>
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
        description="Encuentra el destino más cercano y descubre su oferta, horarios y actividades."
        action={
          <TextLink to="/ubicaciones">Ver todos los centros</TextLink>
        }
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
        {locations.map((location) => (
          <LocationCard key={location.slug} location={location} size="compact" />
        ))}
      </div>
    </Section>
  );
}

function DiscoverySection() {
  return (
    <Section tone="sand" className="py-20 md:py-28 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <p className="eyebrow text-muted-foreground">La experiencia</p>
          <h2 className="display-md mt-4">Descubre CENTRAL</h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
            Explora una selección de compras, sabores, servicios y planes pensados para tu día.
          </p>
          <TextLink to="/directorio" className="mt-8">Ver directorio completo</TextLink>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {discoveryLinks.map((item, index) => (
            <Link
              key={item.title}
              to={item.to}
              className={`group relative isolate flex overflow-hidden bg-ink text-ink-foreground ${
                index === 0 ? "min-h-[25rem] sm:row-span-2" : "min-h-48"
              }`}
            >
              <img
                src={item.image}
                alt=""
                aria-hidden
                className="absolute inset-0 -z-10 size-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-transparent" aria-hidden />
              <div className="mt-auto flex w-full items-end justify-between gap-6 p-6 md:p-7">
                <div>
                  <h3 className="font-display text-xl font-bold uppercase md:text-2xl">{item.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-ink-foreground/70">{item.description}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HighlightsSection() {
  const selected = homeHighlights.flatMap<Highlight>((item) => {
    if (item.source === "promotion") {
      const promotion = promotions.find((entry) => entry.slug === item.slug);
      return promotion
        ? [{ type: item.type, title: promotion.title, description: promotion.description, image: promotion.image, meta: promotion.validity, to: "/promociones" }]
        : [];
    }
    if (item.source === "event") {
      const event = events.find((entry) => entry.slug === item.slug);
      return event
        ? [{ type: item.type, title: event.title, description: event.description, image: event.image, meta: event.displayDate, to: "/eventos" }]
        : [];
    }
    const article = articles.find((entry) => entry.slug === item.slug);
    return article
      ? [{ type: item.type, title: article.title, description: article.summary, image: article.image, meta: article.displayDate, to: "/novedades/$slug", params: { slug: article.slug } }]
      : [];
  });

  return (
    <Section className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Selección editorial"
        title="Lo que está pasando en CENTRAL"
        description="Una mirada breve a las promociones, eventos e historias que vale la pena descubrir ahora."
        action={<TextLink to="/novedades">Ver todo</TextLink>}
      />
      <div className="mt-12 grid gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-12">
        {selected.map((item, index) => (
          <article key={`${item.type}-${item.title}`} className={index === 0 ? "lg:col-span-6" : "lg:col-span-2"}>
            <Link to={item.to} params={item.params as never} className="group block">
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
                <p className="eyebrow text-muted-foreground">{item.type} · {item.meta}</p>
                <h3 className={`mt-3 font-display font-bold uppercase leading-tight ${index === 0 ? "text-2xl md:text-3xl" : "text-lg"}`}>
                  {item.title}
                </h3>
                {index === 0 && <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ExperiencesSection() {
  return (
    <Section tone="ink" className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Más que compras"
        title="Experiencias que hacen la diferencia"
        description="Una selección de espacios y servicios que hacen de cada visita un momento CENTRAL."
      />
      <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {featuredExperiences.map((experience, index) => (
          <article key={experience.title} className="min-w-[82vw] snap-start md:min-w-0">
            <div className={`overflow-hidden ${index === 1 ? "aspect-[4/3] md:mt-12" : "aspect-[4/3]"}`}>
              <img src={experience.image} alt="" aria-hidden className="image-cover opacity-85" loading="lazy" />
            </div>
            <p className="eyebrow mt-5 text-ink-foreground/45">0{index + 1}</p>
            <h3 className="mt-3 font-display text-xl font-bold uppercase">{experience.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-foreground/60">{experience.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function VisitSection() {
  const quickLinks = [
    { label: "Ubicaciones", description: "Encuentra tu CENTRAL", icon: MapPin, to: "/ubicaciones" as const },
    { label: "Horarios", description: "Consulta antes de visitarnos", icon: Clock3, to: "/ubicaciones" as const },
    { label: "Cómo llegar", description: "Direcciones para cada centro", icon: Compass, to: "/ubicaciones" as const },
    { label: "Contacto", description: "Estamos para ayudarte", icon: Mail, to: "/contacto" as const },
  ];

  return (
    <section className="border-b border-border bg-background py-12 md:py-16">
      <div className="container-central grid gap-8 lg:grid-cols-[0.8fr_1.7fr] lg:items-center">
        <div>
          <p className="eyebrow text-muted-foreground">Información útil</p>
          <h2 className="display-md mt-4">Planifica tu visita</h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Todo lo necesario para planificar tu próxima visita, sin complicaciones.
          </p>
        </div>
        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group min-h-36 border-b border-r border-border p-5 transition-colors hover:bg-muted md:p-6"
            >
              <item.icon className="size-5 text-muted-foreground" aria-hidden />
               <h3 className="mt-6 font-display text-base font-bold uppercase">{item.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
               <ArrowRight className="mt-4 size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeasingSection() {
  return (
    <section className="bg-sand py-10 md:py-12">
      <div className="container-central flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow text-muted-foreground">Oportunidades comerciales</p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase md:text-3xl">¿Quieres formar parte de CENTRAL?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Conoce los espacios disponibles y lleva tu marca a nuestros destinos comerciales.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0 rounded-none px-7 eyebrow">
          <Link to="/arrendamientos">Conoce nuestras opciones de arrendamiento <ArrowRight /></Link>
        </Button>
      </div>
    </section>
  );
}

function TextLink({ to, children, className = "" }: { to: "/ubicaciones" | "/directorio" | "/novedades"; children: React.ReactNode; className?: string }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2 border-b border-current pb-1 eyebrow transition-opacity hover:opacity-60 ${className}`}>
      {children} <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}