export const site = {
  name: "CENTRAL",
  operator: "CENTRAL",
  tagline: "Vivir CENTRAL",
  description:
    "CENTRAL es una marca de centros comerciales en El Salvador: compras, gastronomía, experiencias y entretenimiento en un mismo destino.",
  email: "info@central.com.sv",
  leasingEmail: "arrendamientos@central.com.sv",
  phone: "+503 2600 0000",
  whatsapp: "+503 7000 0000",
  address: "Oficinas corporativas CENTRAL, San Salvador, El Salvador",
  social: [{ label: "Instagram", handle: "@central.elsalvador", href: "https://www.instagram.com/central.elsalvador" }],
} as const;

export const mainNav = [
  { label: "Nuestras ubicaciones", to: "/ubicaciones" },
  { label: "Promociones", to: "/promociones" },
  { label: "Arrendamiento", to: "/arrendamientos" },
] as const;

export const legalLinks = [
  { label: "Política de Privacidad", to: "/contacto" },
  { label: "Términos y Condiciones", to: "/contacto" },
] as const;
