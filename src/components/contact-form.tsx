import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitForm } from "@/lib/forms.functions";
import { useFormGuard } from "@/lib/form-security";

export const DEPARTAMENTOS = [
  "Comercial / Orçamentos",
  "Recursos Humanos",
  "Suprimentos e Compras",
  "Financeiro",
  "Contabilidade / Fiscal",
  "Logística e Frota",
  "Qualidade e SGI",
  "Ética e Compliance",
  "TI / Sistemas",
  "Outros Assuntos",
] as const;

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  empresa: z.string().trim().max(120).optional(),
  email: z.string().trim().email("E-mail inválido").max(160),
  telefone: z.string().trim().min(10, "Telefone inválido").max(20),
  departamento: z.string().min(2, "Selecione o setor"),
  assunto: z.string().trim().min(3, "Informe o assunto").max(160),
  mensagem: z.string().trim().min(15, "Descreva sua mensagem").max(3000),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const guard = useFormGuard();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      empresa: "",
      email: "",
      telefone: "",
      departamento: "",
      assunto: "",
      mensagem: "",
    },
  });

  async function onSubmit(v: Values) {
    setSubmitError(null);
    try {
      const result = await submitForm({
        data: {
          tipo: `Contato — ${v.departamento}`,
          departamento: v.departamento,
          replyTo: v.email,
          security: guard.values(),
          campos: [
            { label: "Nome", value: v.nome },
            { label: "Empresa", value: v.empresa ?? "" },
            { label: "E-mail", value: v.email },
            { label: "Telefone", value: v.telefone },
            { label: "Setor de destino", value: v.departamento },
            { label: "Assunto", value: v.assunto },
            { label: "Mensagem", value: v.mensagem },
          ],
        },
      });
      if (!result.delivered || result.blocked) {
        setSubmitError("Não foi possível enviar sua mensagem agora. Tente novamente em instantes.");
        return;
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Não foi possível enviar sua mensagem agora. Tente novamente em instantes.");
      return;
    }
    await navigate({ to: "/obrigado", search: { tipo: "contato" } });
  }

  const err = form.formState.errors;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="relative rounded-lg border border-border bg-card p-6 shadow-card"
      id="contato"
    >
      {guard.field}
      <h2 className="font-display text-xl font-bold">Fale com o setor certo</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Direcionamos sua mensagem internamente para o time responsável.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="nome">Nome *</Label>
          <Input id="nome" className="mt-1.5" {...form.register("nome")} autoComplete="name" />
          {err.nome && <p className="mt-1 text-xs text-destructive">{err.nome.message}</p>}
        </div>
        <div>
          <Label htmlFor="empresa">Empresa</Label>
          <Input id="empresa" className="mt-1.5" {...form.register("empresa")} autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input id="email" className="mt-1.5" {...form.register("email")} inputMode="email" autoComplete="email" />
          {err.email && <p className="mt-1 text-xs text-destructive">{err.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="telefone">Telefone *</Label>
          <Input id="telefone" className="mt-1.5" {...form.register("telefone")} inputMode="tel" autoComplete="tel" />
          {err.telefone && <p className="mt-1 text-xs text-destructive">{err.telefone.message}</p>}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="departamento">Setor de destino *</Label>
          <select
            id="departamento"
            {...form.register("departamento")}
            className="mt-1.5 h-10 w-full rounded-sm border border-input bg-background px-3 text-sm"
          >
            <option value="">Selecione...</option>
            {DEPARTAMENTOS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {err.departamento && (
            <p className="mt-1 text-xs text-destructive">{err.departamento.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="assunto">Assunto *</Label>
          <Input id="assunto" className="mt-1.5" {...form.register("assunto")} />
          {err.assunto && <p className="mt-1 text-xs text-destructive">{err.assunto.message}</p>}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="mensagem">Mensagem *</Label>
        <Textarea id="mensagem" rows={6} className="mt-1.5" {...form.register("mensagem")} />
        {err.mensagem && <p className="mt-1 text-xs text-destructive">{err.mensagem.message}</p>}
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Enviar mensagem
      </Button>
      {submitError && <p role="alert" className="mt-3 text-sm text-destructive">{submitError}</p>}
      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" /> Seus dados são usados apenas para retorno do contato.
      </p>
    </form>
  );
}
