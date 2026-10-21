import { expect, test } from "bun:test";
import { cloudflareConfig } from "../cloudflare.config";
import { resolveRecipient } from "../src/lib/mail-config";

test("chosen Cloudflare host runs server functions with private runtime environment", () => {
  expect(cloudflareConfig.preset).toBe("cloudflare_module");
  expect(cloudflareConfig.cloudflare.wrangler.compatibility_flags).toContain("nodejs_compat_populate_process_env");
  expect(Object.keys(cloudflareConfig.cloudflare.wrangler.vars)).not.toContain("RESEND_API_KEY");
  expect(Object.keys(cloudflareConfig.cloudflare.wrangler.vars)).not.toContain("BREVO_API_KEY");
  expect(cloudflareConfig.cloudflare.wrangler.vars.LEADS_FROM).toContain("noreply@bdmtecnologia.com");
});

test("quote goes to commercial and contact goes to the selected department", () => {
  expect(resolveRecipient("Solicitação de orçamento")).toBe("comercial@alamoengenharia.com.br");
  expect(resolveRecipient("Contato", "Recursos Humanos")).toBe("gestaodepessoas.rj@alamoengenharia.com.br");
  expect(resolveRecipient("Contato sem setor")).toBe("newton.neto@alamoengenharia.com.br");
});