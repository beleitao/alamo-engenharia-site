import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { submitForm } from "@/lib/forms.functions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Paperclip, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SERVICE_OPTIONS } from "@/lib/site-data";
import { useFormGuard } from "@/lib/form-security";
import { ATTACHMENT_ACCEPT, MAX_ATTACHMENTS, prepareAttachments } from "@/lib/attachment-policy";

const schema = z.object({
  empresa: z.string().trim().min(2, "Informe a empresa").max(120),
  responsavel: z.string().trim().min(2, "Informe o responsável").max(120),
  telefone: z.string().trim().min(10, "Telefone inválido").max(20),
  email: z.string().trim().email("E-mail inválido").max(160),
  enderecos: z.string().trim().min(5, "Informe o(s) endereço(s) de atendimento").max(600),
  servicos: z.array(z.string()).min(1, "Selecione ao menos um serviço"),
  necessidade: z.string().trim().min(20, "Descreva a necessidade com ao menos 20 caracteres").max(3000),
});

type LeadValues = z.infer<typeof schema>;

export function LeadForm({ defaultService }: { defaultService?: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [checkingFiles, setCheckingFiles] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const guard = useFormGuard();

  const form = useForm<LeadValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      empresa: "",
      responsavel: "",
      telefone: "",
      email: "",
      enderecos: "",
      servicos: defaultService ? [defaultService] : [],
      necessidade: "",
    },
  });

  const servicos = form.watch("servicos");

  function toggleService(name: string, checked: boolean) {
    const next = checked ? [...servicos, name] : servicos.filter((s) => s !== name);
    form.setValue("servicos", next, { shouldValidate: true });
  }

  async function onSubmit(values: LeadValues) {
    setSubmitError(null);
    try {
      const attachments = await prepareAttachments(files);
      const result = await submitForm({
        data: {
          tipo: "Solicitação de orçamento",
          replyTo: values.email,
          security: guard.values(),
          attachments,
          campos: [
            { label: "Empresa", value: values.empresa },
            { label: "Responsável", value: values.responsavel },
            { label: "Telefone", value: values.telefone },
            { label: "E-mail", value: values.email },
            { label: "Endereços de atendimento", value: values.enderecos },
            { label: "Serviços de interesse", value: values.servicos.join(", ") },
            { label: "Necessidade", value: values.necessidade },
            { label: "Anexos", value: files.map((f) => f.name).join(", ") },
          ],
        },
      });
      if (result.blocked || (!result.delivered && !result.crmPushed)) {
        setSubmitError("Não foi possível enviar sua solicitação agora. Tente novamente em instantes.");
        return;
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Não foi possível enviar sua solicitação agora. Tente novamente em instantes.");
      return;
    }
    setFiles([]);
    await navigate({ to: "/obrigado", search: { tipo: "orcamento" } });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="relative rounded-lg border border-border bg-card p-6 shadow-card"
      id="orcamento"
    >
      {guard.field}
      <h2 className="font-display text-xl font-bold">Solicite um orçamento técnico</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Preencha os dados abaixo. Retornamos com um especialista em até 1 dia útil.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Empresa *" error={form.formState.errors.empresa?.message}>
          <Input {...form.register("empresa")} placeholder="Razão social" autoComplete="organization" />
        </Field>
        <Field label="Nome do responsável *" error={form.formState.errors.responsavel?.message}>
          <Input {...form.register("responsavel")} placeholder="Nome completo" autoComplete="name" />
        </Field>
        <Field label="Telefone *" error={form.formState.errors.telefone?.message}>
          <Input {...form.register("telefone")} placeholder="(11) 90000-0000" inputMode="tel" autoComplete="tel" />
        </Field>
        <Field label="E-mail corporativo *" error={form.formState.errors.email?.message}>
          <Input {...form.register("email")} placeholder="nome@empresa.com.br" inputMode="email" autoComplete="email" />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Endereço(s) de atendimento *" error={form.formState.errors.enderecos?.message}>
          <Textarea
            {...form.register("enderecos")}
            rows={2}
            placeholder="Unidade 1: Av. Exemplo, 1000 - São Paulo/SP&#10;Unidade 2: ..."
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">Serviços de interesse *</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((name) => (
            <label
              key={name}
              className="flex cursor-pointer items-center gap-3 rounded-sm border border-border px-3 py-2 text-sm transition-colors has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-secondary"
            >
              <Checkbox
                checked={servicos.includes(name)}
                onCheckedChange={(c) => toggleService(name, c === true)}
              />
              <span className="min-w-0">{name}</span>
            </label>
          ))}
        </div>
        {form.formState.errors.servicos && (
          <p className="mt-2 text-xs text-destructive">{form.formState.errors.servicos.message}</p>
        )}
      </fieldset>

      <div className="mt-6">
        <Field label="Descreva sua necessidade *" error={form.formState.errors.necessidade?.message}>
          <Textarea
            {...form.register("necessidade")}
            rows={5}
            placeholder="Tipo de operação, quantidade de unidades, equipamentos envolvidos, criticidade, prazo desejado e regime de atendimento (preventivo, corretivo, 24x7)."
          />
        </Field>
      </div>

      <div className="mt-6">
        <Label htmlFor="arquivos" className="text-sm font-medium">
          Anexos técnicos (fotos e imagens de plantas)
        </Label>
        <label
          htmlFor="arquivos"
          className="mt-2 flex cursor-pointer items-center gap-3 rounded-sm border border-dashed border-border bg-secondary/50 px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary"
        >
          <Paperclip className="h-4 w-4 shrink-0" />
          <span>PNG ou JPEG · até 3 imagens de 5 MB cada</span>
        </label>
        <input
          id="arquivos"
          type="file"
          multiple
          accept={ATTACHMENT_ACCEPT}
          className="sr-only"
          disabled={checkingFiles || form.formState.isSubmitting}
          onChange={async (e) => {
            const next = [...files, ...Array.from(e.target.files ?? [])];
            e.target.value = "";
            setFileError(null);
            setCheckingFiles(true);
            try {
              if (next.length > MAX_ATTACHMENTS) throw new Error("Envie no máximo 3 imagens.");
              await prepareAttachments(next);
              setFiles(next);
            } catch (error) {
              setFileError(error instanceof Error ? error.message : "Arquivo não permitido.");
            } finally { setCheckingFiles(false); }
          }}
        />
        <p className="mt-2 text-xs text-muted-foreground">Até 8 megapixels por imagem. Documentos, arquivos compactados e executáveis não são aceitos. Para outros formatos, solicite um canal de envio ao especialista.</p>
        {fileError && <p role="alert" className="mt-2 text-sm text-destructive">{fileError}</p>}
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between gap-3 rounded-sm bg-secondary px-3 py-2 text-xs"
              >
                <span className="min-w-0 truncate">{f.name}</span>
                <Button variant="ghost" size="icon"
                  type="button"
                  aria-label={`Remover ${f.name}`}
                  onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={form.formState.isSubmitting || checkingFiles}>
        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Enviar solicitação
      </Button>
      {submitError && <p role="alert" className="mt-3 text-sm text-destructive">{submitError}</p>}

      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" />
        Seus dados são tratados conforme nossa Política de Privacidade.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}