import { MAIL_BCC, MAIL_FROM, resolveRecipient } from "./mail-config";

export type FormField = { label: string; value: string };

export type FormPayload = {
  tipo: string;
  campos: FormField[];
  replyTo?: string | undefined;
  departamento?: string | undefined;
  attachments?: { filename: string; content: string }[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderEmailHtml(payload: FormPayload) {
  const rows = payload.campos
    .map(
      (c) => `<tr>
        <td style="padding:10px 14px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:600;width:210px;vertical-align:top;">${escapeHtml(c.label)}</td>
        <td style="padding:10px 14px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(c.value || "-")}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html><html lang="pt-BR"><body style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <table role="presentation" style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
      <tr><td style="background:#1f1a17;padding:18px 22px;">
        <p style="margin:0;color:#f97316;font-size:12px;letter-spacing:.12em;text-transform:uppercase;">Álamo Engenharia</p>
        <p style="margin:6px 0 0;color:#ffffff;font-size:18px;font-weight:700;">${escapeHtml(payload.tipo)}</p>
      </td></tr>
      <tr><td style="padding:22px;">
        <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
        <p style="margin:18px 0 0;font-size:12px;color:#6b7280;">Recebido em ${new Date().toLocaleString("pt-BR")} pelo site alamoengenharia.com.br</p>
      </td></tr>
    </table>
  </body></html>`;
}

export async function sendFormEmail(payload: FormPayload) {
  const apiKey = process.env["RESEND_API_KEY"];
  // Destino definido pelo setor/tipo escolhido no formulário (ver mail-config.ts).
  const to = resolveRecipient(payload.tipo, payload.departamento);

  if (!apiKey) {
    console.info("[form] RESEND_API_KEY ausente — envio simulado para", to, payload.tipo);
    return { delivered: false as const, to };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env["LEADS_FROM"] ?? MAIL_FROM,
      to: [to],
      ...(MAIL_BCC.length ? { bcc: MAIL_BCC } : {}),
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      subject: `[Site] ${payload.tipo}`,
      html: renderEmailHtml(payload),
      ...(payload.attachments?.length ? { attachments: payload.attachments } : {}),
    }),
  });


  if (!res.ok) {
    console.error("[form] falha no envio", res.status, await res.text());
    return { delivered: false as const };
  }
  return { delivered: true as const };
}
