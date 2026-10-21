import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { subscribeNewsletter } from "@/lib/forms.functions";
import { useFormGuard } from "@/lib/form-security";

const schema = z.object({
  nome: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Informe um e-mail válido").max(160),
  consentimento: z.literal(true, { message: "Confirme o aceite para receber os informativos" }),
});

type Values = z.infer<typeof schema>;

export function NewsletterSignup({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const guard = useFormGuard();
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "" } as Partial<Values> as Values,
  });
  const err = form.formState.errors;
  const dark = variant === "dark";

  async function onSubmit(v: Values) {
    setSubmitError(null);
    try {
      const result = await subscribeNewsletter({
        data: {
          email: v.email,
          ...(v.nome ? { nome: v.nome } : {}),
          consentimento: true,
          security: guard.values(),
        },
      });
      if (!result.ok || result.blocked) {
        setSubmitError("Não foi possível confirmar sua inscrição agora. Tente novamente.");
        return;
      }
    } catch (e) {
      console.error(e);
      setSubmitError("Não foi possível confirmar sua inscrição agora. Tente novamente.");
      return;
    }
    setDone(true);
    form.reset();
  }

  return (
    <section
      aria-labelledby="newsletter-title"
      className={
        dark
          ? "rounded-lg border border-deep-foreground/15 bg-deep-foreground/5 p-6"
          : "rounded-lg border border-border bg-card p-6 shadow-card"
      }
    >
      <p className={dark ? "eyebrow text-accent" : "eyebrow text-primary"}>Newsletter</p>
      <h2 id="newsletter-title" className="mt-2 font-display text-xl font-bold">
        Receba os informativos da Álamo Engenharia
      </h2>
      <p className={`mt-2 text-sm ${dark ? "text-deep-foreground/70" : "text-muted-foreground"}`}>
        Um e-mail por mês, no máximo: artigos técnicos de manutenção predial, HVAC, elétrica e
        hidráulica, atualizações de normas (NBR 5674, NR-10, PMOC) e novidades da empresa. Sem
        propaganda de terceiros e você pode cancelar a inscrição em qualquer e-mail, com um clique.
      </p>

      {done ? (
        <p className="mt-5 flex items-center gap-2 text-sm font-medium text-accent">
          <CheckCircle2 className="h-4 w-4" /> Inscrição confirmada. Bem-vindo à nossa lista!
        </p>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative mt-5">
          {guard.field}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="nl-nome" className="text-sm">
                Nome (opcional)
              </Label>
              <Input id="nl-nome" className="mt-1.5" autoComplete="name" {...form.register("nome")} />
            </div>
            <div>
              <Label htmlFor="nl-email" className="text-sm">
                E-mail *
              </Label>
              <Input
                id="nl-email"
                className="mt-1.5"
                inputMode="email"
                autoComplete="email"
                placeholder="nome@empresa.com.br"
                {...form.register("email")}
              />
              {err.email && <p className="mt-1 text-xs text-destructive">{err.email.message}</p>}
            </div>
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs">
            <Checkbox
              checked={form.watch("consentimento") === true}
              onCheckedChange={(c) =>
                form.setValue("consentimento", (c === true) as true, { shouldValidate: true })
              }
            />
            <span className={dark ? "text-deep-foreground/70" : "text-muted-foreground"}>
              Aceito receber e-mails informativos da Álamo Engenharia e o tratamento dos meus dados
              conforme a LGPD.
            </span>
          </label>
          {err.consentimento && (
            <p className="mt-1 text-xs text-destructive">{err.consentimento.message}</p>
          )}

          <Button type="submit" className="mt-4 w-full sm:w-auto" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Quero receber a newsletter
          </Button>
          {submitError && <p role="alert" className="mt-3 text-sm text-destructive">{submitError}</p>}
        </form>
      )}
    </section>
  );
}
