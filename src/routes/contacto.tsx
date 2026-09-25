import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/central/primitives";

type FormStatus = "idle" | "sending" | "success" | "error";
const SUCCESS_MESSAGE = "Solicitud enviada. Gracias por su interés en CENTRAL. Hemos recibido su información.";
const ERROR_MESSAGE = "No pudimos enviar tu solicitud. Intenta nuevamente.";

export const Route = createFileRoute("/contacto")({
  head: () => ({ meta: [
    { title: "Contacto | CENTRAL" },
    { name: "description", content: "Envía una consulta al equipo de CENTRAL." },
    { property: "og:title", content: "Contacto | CENTRAL" },
    { property: "og:description", content: "Formulario de contacto para consultas sobre CENTRAL." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!accepted) return;
    setStatus("sending");
    // El envío se activará al completar la configuración del dominio de correo de CENTRAL.
    setStatus("error");
  };

  return <Section tone="sand" className="py-16 md:py-24">
    <div className="mx-auto max-w-5xl">
      <p className="eyebrow text-muted-foreground">Formulario</p>
      <h1 className="mt-5 text-4xl font-bold uppercase leading-none md:text-6xl">Envíanos un mensaje</h1>

      <form onSubmit={onSubmit} className="mt-12 space-y-7 md:mt-16">
        <Field label="Nombre completo" htmlFor="contact-name"><Input id="contact-name" name="name" required minLength={2} maxLength={100} autoComplete="name" className="h-12 rounded-none shadow-sm" /></Field>
        <div className="grid gap-7 sm:grid-cols-2">
          <Field label="Correo electrónico" htmlFor="contact-email"><Input id="contact-email" name="email" type="email" required maxLength={255} autoComplete="email" className="h-12 rounded-none shadow-sm" /></Field>
          <Field label="Teléfono" htmlFor="contact-phone"><Input id="contact-phone" name="phone" type="tel" maxLength={25} autoComplete="tel" className="h-12 rounded-none shadow-sm" /></Field>
          <Field label="Ubicación de interés" htmlFor="contact-location">
            <select id="contact-location" name="location" required defaultValue="san-miguel-centro" className="h-12 w-full border border-input bg-background px-3 text-sm shadow-sm outline-none focus:border-foreground focus:ring-1 focus:ring-ring"><option value="san-miguel-centro">San Miguel Centro</option><option value="santa-rosa-de-lima">Santa Rosa de Lima</option></select>
          </Field>
          <Field label="Asunto" htmlFor="contact-subject">
            <select id="contact-subject" name="subject" required defaultValue="informacion-general" className="h-12 w-full border border-input bg-background px-3 text-sm shadow-sm outline-none focus:border-foreground focus:ring-1 focus:ring-ring"><option value="informacion-general">Información general</option><option value="comentario-sugerencia">Comentario o sugerencia</option><option value="promociones-eventos">Promociones y eventos</option><option value="arrendamiento">Arrendamiento</option><option value="privacidad">Privacidad y datos personales</option><option value="otro">Otro</option></select>
          </Field>
        </div>
        <Field label="Mensaje" htmlFor="contact-message"><Textarea id="contact-message" name="message" required minLength={5} maxLength={1500} rows={7} className="rounded-none shadow-sm" /></Field>

        <div className="flex items-start gap-3">
          <Checkbox id="contact-privacy" checked={accepted} onCheckedChange={(value) => setAccepted(value === true)} className="mt-0.5 rounded-none" aria-required="true" />
          <Label htmlFor="contact-privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">He leído la <Link to="/politica-de-privacidad" target="_blank" className="font-medium text-foreground underline underline-offset-4">Política de Privacidad</Link> y autorizo el tratamiento de mis datos para atender esta consulta.</Label>
        </div>

        {status === "success" && <p role="status" className="border-l-2 border-foreground pl-4 text-sm">{SUCCESS_MESSAGE}</p>}
        {status === "error" && <p role="alert" className="border-l-2 border-destructive pl-4 text-sm text-destructive">{ERROR_MESSAGE}</p>}
        <Button type="submit" size="lg" disabled={!accepted || status === "sending"} className="h-12 w-full rounded-none px-10 eyebrow sm:w-auto">{status === "sending" ? "Enviando…" : "Enviar mensaje"}</Button>
      </form>
    </div>
  </Section>;
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label htmlFor={htmlFor}>{label}</Label>{children}</div>;
}