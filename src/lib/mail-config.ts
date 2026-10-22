/**
 * Configuração central de envio de e-mails do site.
 *
 * Remetente: endereço já autenticado no Brevo (SPF/DKIM de bdmtecnologia.com).
 * no-reply@alamoengenharia.com.br ainda não pode ser usado: o domínio da Álamo
 * não está verificado no provedor e o MX do Microsoft 365 não deve ser trocado.
 * As respostas dos clientes vão para o reply-to (e-mail de quem preencheu o formulário).
 */

export const MAIL_FROM = "Álamo Engenharia <noreply@bdmtecnologia.com>";

/** Cópia oculta que recebe todos os envios (deixe vazio para desativar). */
export const MAIL_BCC: string[] = [];

/** Caixa padrão quando o setor não estiver mapeado. */
export const MAIL_FALLBACK = "newton.neto@alamoengenharia.com.br";

/**
 * Roteamento por setor — o texto da chave é exatamente a opção exibida
 * no formulário de contato (src/components/contact-form.tsx).
 * Altere apenas os e-mails à direita.
 */
export const DEPARTMENT_EMAILS: Record<string, string> = {
  "Comercial / Orçamentos": "comercial@alamoengenharia.com.br",
  "Recursos Humanos": "gestaodepessoas.rj@alamoengenharia.com.br",
  "Suprimentos e Compras": "suprimentos.rj@alamoengenharia.com.br",
  Financeiro: "financeiro.rj@alamoengenharia.com.br",
  "Contabilidade / Fiscal": "contabilidade.rj@alamoengenharia.com.br",
  "Logística e Frota": "mobilidade@alamoengenharia.com.br",
  "Qualidade e SGI": "sgi@alamoengenharia.com.br",
  "Ética e Compliance": "sgi@alamoengenharia.com.br",
  "TI / Sistemas": "telefonia@alamoengenharia.com.br",
  "Outros Assuntos": "comercial@alamoengenharia.com.br",
};

/** Destinos por tipo de formulário (usado quando não há setor escolhido). */
export const FORM_EMAILS = {
  orcamento: "comercial@alamoengenharia.com.br",
  curriculo: "gestaodepessoas.rj@alamoengenharia.com.br",
  newsletter: "marketing@alamoengenharia.com.br",
} as const;

export function resolveRecipient(tipo: string, departamento?: string): string {
  if (departamento && DEPARTMENT_EMAILS[departamento]) return DEPARTMENT_EMAILS[departamento]!;
  const t = tipo.toLowerCase();
  if (t.includes("currículo") || t.includes("curriculo")) return FORM_EMAILS.curriculo;
  if (t.includes("newsletter")) return FORM_EMAILS.newsletter;
  if (t.includes("orçamento") || t.includes("orcamento")) return FORM_EMAILS.orcamento;
  const bySector = Object.keys(DEPARTMENT_EMAILS).find((k) => tipo.includes(k));
  return bySector ? DEPARTMENT_EMAILS[bySector]! : MAIL_FALLBACK;
}
