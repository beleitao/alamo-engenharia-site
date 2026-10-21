import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageBody } from "@/components/page-shell";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Álamo Engenharia" },
      { name: "description", content: "Política de privacidade e proteção de dados da Álamo Engenharia, em conformidade com a LGPD: dados coletados, finalidade, compartilhamento e direitos do titular." },
      { property: "og:title", content: "Política de Privacidade | Álamo Engenharia" },
      { property: "og:description", content: "Política de privacidade e proteção de dados da Álamo Engenharia, em conformidade com a LGPD: dados coletados, finalidade, compartilhamento e direitos do titular." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://alamoengenharia.com.br/politica-de-privacidade" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/politica-de-privacidade" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article>
      <PageHero eyebrow="Legal" title="Política de Privacidade" sub="Como a Álamo Engenharia coleta, usa, armazena e protege dados pessoais, em conformidade com a LGPD (Lei 13.709/2018)." />
      <PageBody>
        <h2 className="pt-4 font-display text-xl font-bold text-foreground">Dados que coletamos</h2>
        <p>Dados fornecidos voluntariamente em formulários de contato e orçamento (nome, e-mail corporativo, telefone, empresa, cargo, cidade e descrição da demanda), arquivos anexados a solicitações técnicas e dados de navegação coletados por cookies essenciais e analíticos.</p>
        <h2 className="pt-4 font-display text-xl font-bold text-foreground">Finalidade</h2>
        <p>Utilizamos os dados para responder solicitações comerciais, elaborar propostas, executar contratos, cumprir obrigações legais e melhorar a experiência do site. Não vendemos dados pessoais.</p>
        <h2 className="pt-4 font-display text-xl font-bold text-foreground">Compartilhamento</h2>
        <p>Dados podem ser compartilhados com prestadores de serviço de tecnologia (CRM, e-mail e hospedagem) estritamente para as finalidades acima, sob obrigação contratual de confidencialidade.</p>
        <h2 className="pt-4 font-display text-xl font-bold text-foreground">Direitos do titular</h2>
        <p>Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados pelo e-mail <a className="text-primary underline" href="mailto:dpo@alamoengenharia.com.br">dpo@alamoengenharia.com.br</a>.</p>
        <h2 className="pt-4 font-display text-xl font-bold text-foreground">Retenção e segurança</h2>
        <p>Mantemos os dados pelo tempo necessário às finalidades declaradas ou conforme exigência legal, aplicando controles técnicos e administrativos de segurança da informação.</p>
      </PageBody>
    </article>
  );
}
