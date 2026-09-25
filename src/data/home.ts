import eventosImg from "@/assets/eventos.jpg";
import gastronomiaImg from "@/assets/gastronomia.jpg";
import lifestyleImg from "@/assets/lifestyle.jpg";
import modaImg from "@/assets/moda.jpg";
import texturaImg from "@/assets/texture-arq.jpg";

export type HomeModuleId =
  | "locations"
  | "experiences"
  | "news"
  | "leasing"
  | "institutional";

export const homeModules: { id: HomeModuleId; enabled: boolean; order: number }[] = [
  { id: "locations", enabled: true, order: 1 },
  { id: "experiences", enabled: true, order: 2 },
  { id: "news", enabled: true, order: 3 },
  { id: "leasing", enabled: true, order: 4 },
  { id: "institutional", enabled: true, order: 5 },
];

export const centralPillars = ["Comprar", "Comer", "Compartir", "Vivir"] as const;

export const featuredNews = [
  { slug: "terraza-gastronomica", locationSlug: "san-miguel-centro" },
  { slug: "nuevas-marcas-san-miguel", locationSlug: "san-miguel-centro" },
  { slug: "compromiso-comunidad", locationSlug: "san-miguel-centro" },
] as const;

export const discoveryLinks = [
  {
    title: "Tiendas",
    description: "Moda, tecnología, hogar y propuestas locales.",
    to: "/directorio",
    image: modaImg,
    featured: true,
  },
  {
    title: "Gastronomía",
    description: "Restaurantes, cafés y sabores para compartir.",
    to: "/gastronomia",
    image: gastronomiaImg,
  },
  {
    title: "Servicios",
    description: "Soluciones prácticas para resolver tu día.",
    to: "/directorio",
    image: texturaImg,
  },
  {
    title: "Experiencias",
    description: "Cultura, entretenimiento y vida en comunidad.",
    to: "/eventos",
    image: eventosImg,
  },
] as const;

export const homeHighlights = [
  { type: "Evento", slug: "festival-gastronomico", source: "event" },
  { type: "Novedad", slug: "momentos-que-compartimos", source: "article" },
  { type: "Novedad", slug: "terraza-gastronomica", source: "article" },
] as const;

export const featuredExperiences = [
  {
    title: "Plazas para encontrarnos",
    description: "Espacios abiertos para eventos, ferias y momentos compartidos.",
    image: lifestyleImg,
  },
  {
    title: "Terrazas gastronómicas",
    description: "Ambientes para descubrir sabores locales y quedarse más tiempo.",
    image: gastronomiaImg,
  },
  {
    title: "Servicios para tu día",
    description: "Comodidad, accesibilidad y soluciones reunidas en un solo destino.",
    image: texturaImg,
  },
] as const;