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

function parseFrom(value: string) {
  const match = value.match(/^(.*)<([^>]+)>$/);
  if (!match) return { name: "Álamo Engenharia", email: value.trim() };
  return { name: match[1].trim().replace(/^"|"$/g, ""), email: match[2].trim() };
}

export async function deliverEmail(message: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: string }[];
}) {
  const apiKey = process.env["BREVO_API_KEY"];
  if (!apiKey) {
    console.info("[form] BREVO_API_KEY ausente — envio simulado para", message.to, message.subject);
    return { delivered: false as const, to: message.to };
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: parseFrom(process.env["LEADS_FROM"] ?? MAIL_FROM),
      to: [{ email: message.to }],
      ...(MAIL_BCC.length ? { bcc: MAIL_BCC.map((email) => ({ email })) } : {}),
      ...(message.replyTo ? { replyTo: { email: message.replyTo } } : {}),
      subject: message.subject,
      htmlContent: message.html,
      ...(message.attachments?.length
        ? { attachment: message.attachments.map((file) => ({ name: file.filename, content: file.content })) }
        : {}),
    }),
  });

  if (!res.ok) {
    console.error("[form] falha no envio", res.status, await res.text());
    return { delivered: false as const };
  }
  return { delivered: true as const };
}

export async function sendFormEmail(payload: FormPayload) {
  const to = resolveRecipient(payload.tipo, payload.departamento);
  return deliverEmail({
    to,
    subject: `[Site] ${payload.tipo}`,
    html: renderEmailHtml(payload),
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
    ...(payload.attachments?.length ? { attachments: payload.attachments } : {}),
  });
}
