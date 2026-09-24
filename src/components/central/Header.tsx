import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/utils";

// Provisional: reemplazar por el archivo del logo oficial cuando esté disponible.
function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("wordmark text-lg leading-none md:text-xl", className)} aria-label="CENTRAL, inicio">
      CENTRAL
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 text-foreground backdrop-blur">
      <div className="container-central flex h-18 items-center justify-between py-5 md:py-6">
        <Logo />

        <nav aria-label="Navegación principal" className="hidden items-center gap-10 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="border-0 bg-background p-0 [&>button]:hidden">
            <div className="container-central flex items-center justify-between border-b border-border py-5">
              <Logo />
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Cerrar menú">
                <X className="size-6" />
              </Button>
            </div>
            <nav aria-label="Navegación móvil" className="container-central flex flex-col py-6">
              {mainNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 text-xl font-semibold transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
