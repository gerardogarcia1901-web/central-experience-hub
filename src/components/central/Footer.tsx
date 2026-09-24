import { Link } from "@tanstack/react-router";
import { legalLinks, site } from "@/data/site";

export function Footer() {
  const instagram = site.social[0];

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-central py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* Provisional: reemplazar por el logo oficial */}
            <p className="wordmark text-3xl md:text-4xl">CENTRAL</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/60">{site.description}</p>
          </div>

          <nav aria-label="Pie de página" className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="eyebrow text-ink-foreground/45">Contacto</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li><a href="https://wa.me/50376979921" target="_blank" rel="noopener noreferrer" className="text-ink-foreground/80 hover:text-primary">WhatsApp 7697-9921</a></li>
                <li><a href={`mailto:${site.email}`} className="text-ink-foreground/80 hover:text-primary">{site.email}</a></li>
                <li><Link to="/" className="text-ink-foreground/80 hover:text-primary">Acerca de CENTRAL</Link></li>
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
              <h2 className="eyebrow text-ink-foreground/45">Legal</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {legalLinks.map((l) => (
                  <li key={l.label}><Link to={l.to} className="text-ink-foreground/80 hover:text-primary">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-14 border-t border-ink-foreground/10 pt-6 text-xs text-ink-foreground/45">
          © {new Date().getFullYear()} {site.name} · El Salvador
        </div>
      </div>
    </footer>
  );
}
