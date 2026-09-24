import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CENTRAL | Vivir Central" },
      {
        name: "description",
        content: "CENTRAL, marca de centros comerciales en El Salvador. Vivir Central.",
      },
      { property: "og:title", content: "CENTRAL | Vivir Central" },
      { property: "og:description", content: "CENTRAL, marca de centros comerciales en El Salvador." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <section className="flex min-h-[calc(100svh-4.5rem)] items-center bg-warm">
      <div className="container-central py-24 md:py-32">
        <div className="fade-up max-w-4xl">
          <p className="eyebrow text-muted-foreground">CENTRAL · El Salvador</p>
          <h1 className="display-xl mt-6">Vivir Central</h1>
          <span className="mt-8 block h-1 w-16 bg-highlight" aria-hidden />
          <div className="mt-10">
            <Button asChild size="lg" className="h-12 rounded-none px-8 eyebrow">
              <Link to="/ubicaciones">Nuestras ubicaciones <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
