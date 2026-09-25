import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/components/central/CookieConsent";
import { site } from "@/data/site";
import centralLogo from "@/assets/central-primary.png.asset.json";

export function Footer() {
  const instagram = site.social[0];

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-central py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={centralLogo.url} alt="CENTRAL" className="h-auto w-40 brightness-0 invert" width={1600} height={423} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/60">{site.description}</p>
          </div>

          <nav aria-label="Pie de página" className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="eyebrow text-ink-foreground/45">Contacto</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li><a href="https://wa.me/50376979921" target="_blank" rel="noopener noreferrer" className="text-ink-foreground/80 hover:text-primary">WhatsApp 7697-9921</a></li>
                <li><a href={`mailto:${site.email}`} className="text-ink-foreground/80 hover:text-primary">{site.email}</a></li>
                <li><Link to="/contacto" className="text-ink-foreground/80 hover:text-primary">Contacto</Link></li>
                <li><Link to="/acerca-de-central" className="text-ink-foreground/80 hover:text-primary">Acerca de CENTRAL</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-ink-foreground/45">Síguenos</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="text-ink-foreground/80 hover:text-primary">
                    Instagram {instagram.handle}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-ink-foreground/45">Información</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li><Link to="/politica-de-privacidad" className="text-ink-foreground/80 hover:text-primary">Política de Privacidad</Link></li>
                <li><Link to="/terminos-y-condiciones" className="text-ink-foreground/80 hover:text-primary">Términos y Condiciones</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-foreground/10 pt-6 text-xs text-ink-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name} · El Salvador</span>
          <Button
            type="button"
            variant="ghost"
            onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))}
            className="h-auto justify-start rounded-none p-0 text-xs font-normal text-ink-foreground/60 hover:bg-transparent hover:text-primary"
          >
            Preferencias de cookies
          </Button>
        </div>
      </div>
    </footer>
  );
}
