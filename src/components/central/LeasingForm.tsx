import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "sending" | "success" | "error";

const SUCCESS_MESSAGE = "Solicitud enviada. Gracias por su interés en CENTRAL. Hemos recibido su información.";
const ERROR_MESSAGE = "No pudimos enviar tu solicitud. Intenta nuevamente.";

export function LeasingForm() {
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!accepted) return;

    setStatus("sending");
    // El envío se activará al completar la configuración del dominio de correo de CENTRAL.
    setStatus("error");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <p className="eyebrow text-muted-foreground">Formulario de arrendamiento</p>
      <h2 className="mt-5 text-4xl font-bold uppercase leading-none md:text-6xl">Solicitar información</h2>
      <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
        Cuéntanos sobre tu marca y el espacio que necesitas. El equipo de Grupo Galo revisará tu solicitud y te contactará.
      </p>

      <form onSubmit={onSubmit} className="mt-12 space-y-7 md:mt-16">
        <FormField label="Proyecto de interés" required htmlFor="leasing-project">
          <select id="leasing-project" name="project" required defaultValue="san-miguel-centro" className="h-12 w-full border border-input bg-background px-3 text-sm shadow-sm outline-none focus:border-foreground focus:ring-1 focus:ring-ring">
            <option value="san-miguel-centro">San Miguel Centro</option>
            <option value="santa-rosa-de-lima">Santa Rosa de Lima</option>
          </select>
        </FormField>

        <div className="grid gap-7 sm:grid-cols-2">
          <FormField label="Nombre" required htmlFor="leasing-name">
            <Input id="leasing-name" name="name" required minLength={2} maxLength={100} autoComplete="name" className="h-12 rounded-none shadow-sm" />
          </FormField>
          <FormField label="Empresa / marca" required htmlFor="leasing-company">
            <Input id="leasing-company" name="company" required minLength={2} maxLength={120} autoComplete="organization" className="h-12 rounded-none shadow-sm" />
          </FormField>
          <FormField label="Giro comercial" required htmlFor="leasing-business">
            <Input id="leasing-business" name="business" required minLength={2} maxLength={120} className="h-12 rounded-none shadow-sm" />
          </FormField>
          <FormField label="Teléfono" required htmlFor="leasing-phone">
            <Input id="leasing-phone" name="phone" type="tel" required minLength={7} maxLength={25} autoComplete="tel" className="h-12 rounded-none shadow-sm" />
          </FormField>
          <FormField label="Correo electrónico" required htmlFor="leasing-email">
            <Input id="leasing-email" name="email" type="email" required maxLength={255} autoComplete="email" className="h-12 rounded-none shadow-sm" />
          </FormField>
          <FormField label="Espacio requerido" required htmlFor="leasing-space">
            <Input id="leasing-space" name="space" required minLength={2} maxLength={150} placeholder="Ej. local a pie de calle, m² aproximados" className="h-12 rounded-none shadow-sm" />
          </FormField>
        </div>

        <FormField label="Comentarios" optional htmlFor="leasing-comments">
          <Textarea id="leasing-comments" name="comments" maxLength={1500} rows={6} placeholder="Cuéntanos sobre tu marca, tu operación actual y la fecha estimada de apertura." className="rounded-none shadow-sm" />
        </FormField>

        <div className="flex items-start gap-3">
          <Checkbox id="leasing-privacy" checked={accepted} onCheckedChange={(value) => setAccepted(value === true)} className="mt-0.5 rounded-none" aria-required="true" />
          <Label htmlFor="leasing-privacy" className="text-xs font-normal leading-relaxed text-muted-foreground">
            He leído la <Link to="/politica-de-privacidad" target="_blank" className="font-medium text-foreground underline underline-offset-4">Política de Privacidad</Link> y autorizo a Grupo Galo, S.A. de C.V. a tratar mis datos para atender esta solicitud. <span className="text-destructive">Requerido</span>
          </Label>
        </div>

        {status === "success" && <p role="status" className="border-l-2 border-foreground pl-4 text-sm">{SUCCESS_MESSAGE}</p>}
        {status === "error" && <p role="alert" className="border-l-2 border-destructive pl-4 text-sm text-destructive">{ERROR_MESSAGE}</p>}

        <Button type="submit" size="lg" disabled={!accepted || status === "sending"} className="h-12 w-full rounded-none px-10 eyebrow sm:w-auto">
          {status === "sending" ? "Enviando…" : "Enviar solicitud"}
        </Button>
      </form>
    </div>
  );
}

function FormField({ label, required, optional, htmlFor, children }: { label: string; required?: boolean; optional?: boolean; htmlFor: string; children: React.ReactNode }) {
  return <div className="space-y-2">
    <Label htmlFor={htmlFor}>{label} {required && <span className="text-destructive">Requerido</span>}{optional && <span className="text-muted-foreground">Opcional</span>}</Label>
    {children}
  </div>;
}