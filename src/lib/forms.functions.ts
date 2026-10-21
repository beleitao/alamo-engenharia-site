import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { securitySchema } from "./form-security";

const schema = z.object({
  tipo: z.string().trim().min(2).max(120),
  campos: z
    .array(z.object({ label: z.string().trim().max(120), value: z.string().trim().max(5000) }))
    .min(1)
    .max(40),
  replyTo: z.string().trim().email().max(160).optional(),
  departamento: z.string().trim().max(120).optional(),
  security: securitySchema.optional(),
  attachments: z.array(z.object({ name: z.string().max(185), content: z.string().max(7_000_000) })).max(3).optional(),
});

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { guardSubmission } = await import("./form-security.server");
    const guard = guardSubmission(
      data.security,
      data.campos.map((c) => c.value),
      data.replyTo ?? "anon",
    );
    if (!guard.ok) {
      console.warn("[form] envio bloqueado:", guard.reason);
      return { delivered: false as const, blocked: true as const };
    }

    const { sanitizeAttachments } = await import("./attachments.server");
    const attachments = sanitizeAttachments(data.attachments ?? []);
    const { sendFormEmail } = await import("./mailer.server");
    const result = await sendFormEmail({
      tipo: data.tipo,
      campos: data.campos,
      attachments,
      ...(data.replyTo ? { replyTo: data.replyTo } : {}),
      ...(data.departamento ? { departamento: data.departamento } : {}),
    });

    let crmPushed: boolean | null = null;
    // Orçamento também vai para o Zoho CRM Plus.
    if (/or[çc]amento/i.test(data.tipo) && data.replyTo && (!attachments.length || result.delivered)) {
      const { pushLeadToZoho } = await import("./zoho.server");
      const get = (label: string) =>
        data.campos.find((c) => c.label.toLowerCase().startsWith(label))?.value ?? "";
      const crmResult = await pushLeadToZoho({
        lastName: get("respons") || get("nome") || data.replyTo,
        email: data.replyTo,
        phone: get("telefone"),
        company: get("empresa"),
        description: data.campos.map((c) => `${c.label}: ${c.value}`).join("\n"),
        leadSource: "Site — Solicitação de orçamento",
      });
      crmPushed = crmResult.pushed;
    }

    return { ...result, blocked: false as const, crmPushed };
  });

const newsletterSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(160),
  nome: z.string().trim().max(120).optional(),
  consentimento: z.literal(true),
  security: securitySchema.optional(),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => newsletterSchema.parse(data))
  .handler(async ({ data }) => {
    const { guardSubmission } = await import("./form-security.server");
    const guard = guardSubmission(data.security, [data.email, data.nome ?? ""], data.email);
    if (!guard.ok) {
      console.warn("[newsletter] envio bloqueado:", guard.reason);
      return { ok: false as const, blocked: true as const };
    }

    const { subscribeNewsletterInZoho } = await import("./zoho.server");
    const crmResult = await subscribeNewsletterInZoho({
      email: data.email,
      ...(data.nome ? { nome: data.nome } : {}),
    });

    const { sendFormEmail } = await import("./mailer.server");
    await sendFormEmail({
      tipo: "Newsletter — nova inscrição",
      campos: [
        { label: "Nome", value: data.nome ?? "" },
        { label: "E-mail", value: data.email },
        { label: "Consentimento LGPD", value: "Sim" },
      ],
      replyTo: data.email,
    });

    return { ok: crmResult.pushed, blocked: false as const };
  });
