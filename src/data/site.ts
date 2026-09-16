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
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
} as const;

export const mainNav = [
  { label: "CENTRAL", to: "/" },
  { label: "Ubicaciones", to: "/ubicaciones" },
  { label: "Novedades", to: "/novedades" },
  { label: "Arrendamientos", to: "/arrendamientos" },
] as const;

export const legalLinks = [
  { label: "Política de privacidad", to: "/contacto" },
  { label: "Términos y condiciones", to: "/contacto" },
  { label: "Reglamento de visitantes", to: "/contacto" },
] as const;
