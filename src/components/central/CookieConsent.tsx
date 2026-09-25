import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const COOKIE_PREFERENCES_KEY = "central-cookie-preferences";
export const OPEN_COOKIE_PREFERENCES_EVENT = "central:open-cookie-preferences";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
};

function savePreferences(analytics: boolean) {
  const preferences: CookiePreferences = { necessary: true, analytics };
  window.localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
}

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (saved) {
      try {
        const preferences = JSON.parse(saved) as Partial<CookiePreferences>;
        setAnalytics(preferences.analytics === true);
      } catch {
        window.localStorage.removeItem(COOKIE_PREFERENCES_KEY);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
    setReady(true);

    const openPreferences = () => {
      const current = window.localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (current) {
        try {
          const preferences = JSON.parse(current) as Partial<CookiePreferences>;
          setAnalytics(preferences.analytics === true);
        } catch {
          setAnalytics(false);
        }
      }
      setShowPreferences(true);
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  const choose = (allowAnalytics: boolean) => {
    savePreferences(allowAnalytics);
    setAnalytics(allowAnalytics);
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!ready) return null;

  return (
    <>
      {showBanner && (
        <section
          aria-label="Consentimiento de cookies"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-warm"
        >
          <div className="container-central grid gap-7 py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold uppercase md:text-3xl">Tu privacidad importa.</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                Usamos tecnologías necesarias para que el sitio funcione y, con tu permiso, herramientas de medición
                para entender su uso. Puedes aceptar todas, rechazar las no esenciales o configurar tus preferencias.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:items-center">
              <Button onClick={() => choose(true)} className="h-12 rounded-none px-7 eyebrow">
                Aceptar todas
              </Button>
              <Button onClick={() => choose(false)} variant="outline" className="h-12 rounded-none px-7 eyebrow">
                Rechazar no esenciales
              </Button>
              <Button
                onClick={() => setShowPreferences(true)}
                variant="ghost"
                className="h-12 rounded-none px-5 eyebrow"
              >
                Configurar preferencias
              </Button>
            </div>
          </div>
        </section>
      )}

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-[716px] gap-0 rounded-md border-border bg-warm p-0 shadow-none [&>button]:right-5 [&>button]:top-5 [&>button_svg]:size-5">
          <DialogHeader className="border-b border-border px-7 py-7 text-left">
            <DialogTitle className="text-2xl font-bold uppercase md:text-3xl">Preferencias de cookies</DialogTitle>
            <DialogDescription className="sr-only">Configura las categorías de cookies disponibles.</DialogDescription>
          </DialogHeader>
          <div className="px-7 py-7">
            <div className="flex gap-5 border-b border-border pb-8">
              <Checkbox checked disabled aria-label="Cookies necesarias siempre activas" className="mt-1 rounded-none" />
              <div>
                <h3 className="text-lg font-medium">Cookies necesarias</h3>
                <p className="mt-2 text-base leading-6 text-muted-foreground md:text-lg">
                  Siempre activas. Son necesarias para el funcionamiento correcto del sitio.
                </p>
              </div>
            </div>
            <div className="flex gap-5 py-8">
              <Checkbox
                checked={analytics}
                onCheckedChange={(checked) => setAnalytics(checked === true)}
                aria-label="Cookies de medición o analítica"
                className="mt-1 rounded-none"
              />
              <div>
                <h3 className="text-lg font-medium">Cookies de medición / analítica</h3>
                <p className="mt-2 text-base leading-6 text-muted-foreground md:text-lg">
                  Se utilizan para entender cómo se utiliza el sitio y mejorar la experiencia.
                </p>
              </div>
            </div>
            <Button onClick={() => choose(analytics)} className="h-12 rounded-none px-6 eyebrow">
              Guardar preferencias
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}