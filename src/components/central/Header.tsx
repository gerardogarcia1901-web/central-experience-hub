import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { locations } from "@/data/locations";
import { cn } from "@/lib/utils";

const menuGroups = [
  {
    label: "CENTRAL",
    links: [
      { label: "Inicio", to: "/", hash: undefined },
      { label: "Novedades", to: "/novedades" },
      
    ],
  },
  {
    label: "Ubicaciones",
    links: [
      { label: "Todas las ubicaciones", to: "/ubicaciones" },
    ],
  },
  {
    label: "Comercios",
    links: [
      { label: "Directorio", to: "/directorio" },
      { label: "Gastronomía", to: "/gastronomia" },
      { label: "Promociones", to: "/promociones" },
    ],
  },
  {
    label: "Comercial",
    links: [
      { label: "Arrendamientos", to: "/arrendamientos" },
      { label: "Contacto", to: "/contacto" },
    ],
  },
] as const;

function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("wordmark text-xl leading-none md:text-2xl", className)} aria-label="CENTRAL, inicio">
      CENTRAL
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink-foreground/15 bg-ink text-ink-foreground">
      <div className="container-central relative flex h-20 items-center justify-between md:h-24">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto gap-3 rounded-none px-0 text-ink-foreground hover:bg-transparent hover:text-ink-foreground/70"
              aria-label="Abrir menú"
            >
              <Menu className="size-6" />
              <span className="hidden text-sm font-medium md:inline">Menú</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="top"
            className="h-dvh w-full overflow-y-auto border-0 bg-ink/90 p-0 text-ink-foreground backdrop-blur-xl [&>button]:hidden"
          >
            <div className="min-h-dvh">
              <div className="container-central relative flex h-20 items-center justify-between border-b border-ink-foreground/15 md:h-24">
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="group h-auto gap-3 rounded-none px-0 text-ink-foreground hover:bg-transparent hover:text-ink-foreground/70"
                  aria-label="Cerrar menú"
                >
                  <X className="size-6 transition-transform duration-500 group-hover:rotate-90" />
                  <span className="hidden text-sm font-medium md:inline">Cerrar</span>
                </Button>
                <Wordmark className="absolute left-1/2 -translate-x-1/2 text-lg md:text-2xl" />
                <Link to="/ubicaciones" onClick={() => setOpen(false)} className="text-sm font-medium transition-opacity hover:opacity-70">
                  Ubicaciones
                </Link>
              </div>

              <nav
                aria-label="Navegación principal"
                className="container-central grid gap-x-16 gap-y-12 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-3 lg:py-24"
              >
                {menuGroups.map((group, groupIndex) => (
                  <section
                    key={group.label}
                    className="fade-up"
                    style={{ animationDelay: `${groupIndex * 70}ms` }}
                  >
                    <h2 className="eyebrow border-b border-ink-foreground/15 pb-4 text-ink-foreground/45">
                      {group.label}
                    </h2>
                    <ul className="mt-6 space-y-4">
                      {group.links.map((item) => (
                        <li key={`${group.label}-${item.label}`}>
                          <Link
                            to={item.to}
                            {...("hash" in item && item.hash ? { hash: item.hash } : {})}
                            onClick={() => setOpen(false)}
                            className="font-display text-lg font-medium text-ink-foreground/90 transition-colors hover:text-highlight md:text-xl"
                            activeProps={{ className: "text-highlight" }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </nav>

              <div className="container-central border-t border-ink-foreground/15 py-6">
                <p className="text-xs text-ink-foreground/45">CENTRAL · El Salvador</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Wordmark className="absolute left-1/2 -translate-x-1/2 text-lg md:text-2xl" />

        <Link to="/ubicaciones" className="text-sm font-medium transition-opacity hover:opacity-70">
          Ubicaciones
        </Link>
      </div>
    </header>
  );
}
