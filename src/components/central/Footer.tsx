import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { legalLinks, mainNav, site } from "@/data/site";
import { locations, statusLabels } from "@/data/locations";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Gracias por suscribirte. Pronto recibirás nuestras novedades.");
    setEmail("");
  };

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <div className="container-central relative px-6 pb-28 pt-16 md:px-12 md:pb-32 md:pt-24 lg:pb-40 lg:pt-32">
        {/* Marca de agua tipográfica sutil, siempre completa */}
        <div
          className="pointer-events-none absolute inset-x-6 bottom-6 select-none overflow-hidden whitespace-nowrap text-right opacity-[0.03] md:inset-x-12 md:bottom-8 lg:bottom-10"
          aria-hidden
        >
          <span className="wordmark inline-block text-[clamp(3.5rem,10vw,10rem)] leading-none">
            CENTRAL
          </span>
        </div>

        <div className="relative z-10">
          {/* Sección superior */}
          <div className="grid gap-12 md:grid-cols-12">
            {/* Bloque de marca */}
            <div className="flex flex-col justify-between md:col-span-4">
              <div>
                <p className="wordmark text-4xl text-ink-foreground md:text-5xl">CENTRAL</p>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-foreground/55">
                  {site.description}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-sm font-medium uppercase tracking-widest text-ink-foreground/45 transition-colors hover:text-ink-foreground"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Columnas de navegación */}
            <div className="grid gap-10 sm:grid-cols-2 md:col-span-8 lg:grid-cols-3 md:gap-8">
              <nav aria-label="Centros">
                <h2 className="eyebrow text-ink-foreground/40">Centros</h2>
                <ul className="mt-6 space-y-4">
                  {locations.map((loc) => (
                    <li key={loc.slug}>
                      <Link
                        to="/ubicaciones/$slug"
                        params={{ slug: loc.slug }}
                        className="text-base text-ink-foreground/65 transition-colors hover:text-ink-foreground"
                      >
                        {loc.shortName}
                        <span className="block text-xs text-ink-foreground/35">
                          {statusLabels[loc.status]}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Explorar">
                <h2 className="eyebrow text-ink-foreground/40">Explorar</h2>
                <ul className="mt-6 space-y-4">
                  {mainNav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-base text-ink-foreground/65 transition-colors hover:text-ink-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="sm:col-span-2 lg:col-span-1">
                <h2 className="eyebrow text-ink-foreground/40">Suscripción</h2>
                <form onSubmit={handleSubscribe} className="mt-6">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo electrónico"
                      className="w-full border-0 border-b border-ink-foreground/15 bg-transparent py-3 pr-10 text-sm text-ink-foreground placeholder:text-ink-foreground/35 focus:border-ink-foreground/50 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-foreground/45 transition-colors hover:text-ink-foreground"
                      aria-label="Suscribirse"
                    >
                      <ArrowRight className="size-5" />
                    </button>
                  </div>
                </form>
                <p className="mt-4 max-w-xs text-xs leading-relaxed text-ink-foreground/40">
                  Recibe novedades de próximas aperturas, eventos y promociones de CENTRAL.
                </p>
              </div>
            </div>
          </div>

          {/* Sección inferior integrada */}
          <div className="mt-16 flex flex-col gap-6 border-t border-ink-foreground/10 pt-8 md:mt-24 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-foreground/45">
              <span className="italic">
                © {new Date().getFullYear()} {site.name} por {site.operator}.
              </span>
              {legalLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="transition-colors hover:text-ink-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-ink-foreground/35">
              El Salvador
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
