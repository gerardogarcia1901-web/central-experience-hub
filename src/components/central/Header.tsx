import { Link } from "@tanstack/react-router";
import { Clock3, Globe, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { locations, statusLabels } from "@/data/locations";
import { stores } from "@/data/catalog";
import { cn } from "@/lib/utils";

const menuGroups = [
  {
    label: "Explorar",
    links: [
      { label: "Inicio", to: "/" },
      { label: "Eventos", to: "/eventos" },
      { label: "Promociones", to: "/promociones" },
      { label: "Novedades", to: "/novedades" },
    ],
  },
  {
    label: "Descubre",
    links: [
      { label: "Marcas y tiendas", to: "/directorio" },
      { label: "Gastronomía", to: "/gastronomia" },
      { label: "Directorio completo", to: "/directorio" },
    ],
  },
  {
    label: "Centros",
    links: [
      { label: "Todos los centros", to: "/ubicaciones" },
      ...locations.map((location) => ({
        label: location.shortName,
        to: `/ubicaciones/${location.slug}`,
      })),
    ],
  },
  {
    label: "Conecta",
    links: [
      { label: "Planifica tu visita", to: "/ubicaciones" },
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

function SearchDialog() {
  const [query, setQuery] = useState("");
  const results = query.trim()
    ? stores.filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
          aria-label="Buscar"
        >
          <Search className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="top-24 max-w-2xl translate-y-0 rounded-none border-border p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="eyebrow text-muted-foreground">Buscar en CENTRAL</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca una tienda, restaurante o marca"
            className="h-12 rounded-none border-0 border-b border-border px-0 text-lg focus-visible:ring-0"
          />
          <ul className="mt-6 space-y-1">
            {results.map((store) => (
              <li key={store.slug}>
                <Link
                  to="/directorio/$slug"
                  params={{ slug: store.slug }}
                  className="flex items-center justify-between px-2 py-3 text-sm transition-colors hover:bg-muted"
                >
                  <span className="font-medium">{store.name}</span>
                  <span className="text-muted-foreground">{store.local}</span>
                </Link>
              </li>
            ))}
            {query && results.length === 0 && (
              <li className="py-3 text-sm text-muted-foreground">Sin resultados para “{query}”.</li>
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
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
                <Link
                  to="/ubicaciones"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                >
                  <Clock3 className="size-5" />
                  <span className="hidden sm:inline">Horarios</span>
                </Link>
              </div>

              <nav
                aria-label="Navegación principal"
                className="container-central grid gap-x-10 gap-y-12 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-4 lg:py-24"
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

              <div className="container-central flex flex-wrap items-center justify-between gap-5 border-t border-ink-foreground/15 py-6">
                <div className="flex items-center gap-2">
                  <SearchDialog />
                  <span className="text-sm text-ink-foreground/65">Buscar en CENTRAL</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-foreground/45">
                  <Globe className="size-4" />
                  Español
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Wordmark className="absolute left-1/2 -translate-x-1/2 text-lg md:text-2xl" />

        <Link
          to="/ubicaciones"
          className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
        >
          <Clock3 className="size-5" />
          <span className="hidden sm:inline">Horarios</span>
        </Link>
      </div>
    </header>
  );
}
