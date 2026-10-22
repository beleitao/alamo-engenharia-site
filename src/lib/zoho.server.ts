/** CRM gateway contract: /Leads, /Contacts and /Contacts/search.
 * Configure a compatible server gateway before enabling CRM/newsletter.
 * This is NOT a direct Zoho OAuth client; never use Zoho credentials as gateway keys.
 * Keep all credentials exclusively in the hosting server environment.
 */
function gatewayUrl() {
  const url = process.env["CRM_GATEWAY_URL"];
  return url?.startsWith("https://") ? url.replace(/\/$/, "") : undefined;
}

export type ZohoLead = {
  lastName: string;
  firstName?: string;
  email: string;
  phone?: string;
  company?: string;
  description?: string;
  leadSource?: string;
  /** campos extras já com o nome da API no Zoho */
  extra?: Record<string, string>;
};

export async function pushLeadToZoho(lead: ZohoLead, module: "Leads" | "Contacts" = "Leads") {
  const gatewayKey = process.env["CRM_GATEWAY_API_KEY"];
  const zohoKey = process.env["CRM_CONNECTION_API_KEY"];
  const webform = process.env["ZOHO_WEBFORM_URL"];

  const record: Record<string, string> = {
    Last_Name: lead.lastName || lead.email,
    ...(lead.firstName ? { First_Name: lead.firstName } : {}),
    Email: lead.email,
    ...(lead.phone ? { Phone: lead.phone } : {}),
    // Company é obrigatório no módulo Leads do Zoho.
    Company: lead.company?.trim() || "Não informado",
    ...(lead.description ? { Description: lead.description } : {}),
    Lead_Source: lead.leadSource ?? "Website",
    ...(lead.extra ?? {}),
  };

  if (gatewayUrl() && gatewayKey && zohoKey) {
    const res = await fetch(`${gatewayUrl()}/${module}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${gatewayKey}`,
        "X-Connection-Api-Key": zohoKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [record] }),
    });
    if (!res.ok) {
      console.error("[zoho] falha na API", res.status, await res.text());
      return { pushed: false as const };
    }
    return { pushed: true as const, via: "api" as const };
  }

  if (webform) {
    const body = new URLSearchParams(record);
    const res = await fetch(webform, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      console.error("[zoho] falha no webform", res.status);
      return { pushed: false as const };
    }
    return { pushed: true as const, via: "webform" as const };
  }

  console.info("[zoho] integração não configurada — lead apenas registrado", record["Email"]);
  return { pushed: false as const };
}

/** Campo picklist criado no módulo Contatos do Zoho: "Sim" | "Não". */
const NEWSLETTER_FIELD = "Inscrito_na_Newsletter";

function gatewayHeaders() {
  const gatewayKey = process.env["CRM_GATEWAY_API_KEY"];
  const zohoKey = process.env["CRM_CONNECTION_API_KEY"];
  if (!gatewayUrl() || !gatewayKey || !zohoKey) return null;
  return {
    Authorization: `Bearer ${gatewayKey}`,
    "X-Connection-Api-Key": zohoKey,
    "Content-Type": "application/json",
  };
}

/**
 * Inscreve o e-mail na newsletter dentro do Zoho CRM Plus.
 * Se o contato já existir, apenas marca "Inscrito na Newsletter = Sim";
 * caso contrário cria o contato já com o campo marcado.
 */
export async function subscribeNewsletterInZoho(params: { email: string; nome?: string }) {
  const headers = gatewayHeaders();
  if (!headers) {
    console.info("[zoho] newsletter não enviada — conector não configurado", params.email);
    return { pushed: false as const };
  }

  // 1) O contato já existe?
  const searchUrl = `${gatewayUrl()}/Contacts/search?email=${encodeURIComponent(params.email)}`;
  const found = await fetch(searchUrl, { method: "GET", headers });

  if (found.ok && found.status !== 204) {
    const raw = await found.text();
    let existing: { id: string } | undefined;
    if (raw.trim()) {
      try {
        existing = (JSON.parse(raw) as { data?: Array<{ id: string }> }).data?.[0];
      } catch {
        existing = undefined;
      }
    }
    if (existing?.id) {
      const upd = await fetch(`${gatewayUrl()}/Contacts`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          data: [{ id: existing.id, [NEWSLETTER_FIELD]: "Sim" }],
        }),
      });
      if (!upd.ok) {
        console.error("[zoho] falha ao atualizar newsletter", upd.status, await upd.text());
        return { pushed: false as const };
      }
      return { pushed: true as const, action: "updated" as const, id: existing.id };
    }
  } else if (!found.ok && found.status !== 204) {
    console.error("[zoho] falha na busca de contato", found.status, await found.text());
  }

  // 2) Não existe: cria o contato já inscrito.
  const nome = (params.nome ?? "").trim();
  const parts = nome.split(/\s+/).filter(Boolean);
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : nome || params.email;
  const firstName = parts.length > 1 ? parts[0] : undefined;

  const res = await fetch(`${gatewayUrl()}/Contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: [
        {
          Last_Name: lastName,
          ...(firstName ? { First_Name: firstName } : {}),
          Email: params.email,
          Lead_Source: "Site — Newsletter",
          Description: "Opt-in de newsletter pelo site (LGPD).",
          [NEWSLETTER_FIELD]: "Sim",
        },
      ],
      trigger: [],
    }),
  });
  if (!res.ok) {
    console.error("[zoho] falha ao criar contato de newsletter", res.status, await res.text());
    return { pushed: false as const };
  }
  return { pushed: true as const, action: "created" as const };
}
