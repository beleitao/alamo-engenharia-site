import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, PageBody } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";
import caseVarejo from "@/assets/case-varejo.jpg";
import caseLogistica from "@/assets/case-logistica.jpg";
import caseSaude from "@/assets/case-saude.webp";
import caseCorporativo from "@/assets/sobre-operacao.jpg";
import caseHvac from "@/assets/hvac.jpg";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Cases de Manutenção Predial e HVAC | Álamo Engenharia" },
      { name: "description", content: "Cases da Álamo Engenharia em varejo, logística, saúde, educação e edifícios corporativos: manutenção predial, HVAC, elétrica e obras com SLA contratual." },
      { property: "og:title", content: "Cases de Manutenção Predial e HVAC | Álamo Engenharia" },
      { property: "og:description", content: "Como operações críticas em varejo, logística, saúde, educação e edifícios corporativos mantêm disponibilidade com técnicos próprios da Álamo Engenharia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://alamoengenharia.com.br/cases" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/cases" }],
  }),
  component: CasesPage,
});

const CASES = [
  {
    setor: "Varejo e redes multi-site",
    title: "Um só padrão de manutenção em dezenas de lojas e estados",
    image: caseVarejo,
    alt: "Corredor de shopping center com lojas iluminadas e climatização em operação",
    desafio:
      "Rede com unidades espalhadas por vários estados, cada loja contratando prestadores locais diferentes: sem padrão técnico, sem histórico de ativos e com custo corretivo imprevisível a cada mês.",
    solucao:
      "Implantamos times volantes regionais, inventário único de ativos por loja, abertura centralizada de chamados e SLA diferenciado por criticidade — falha que fecha a loja tem prazo distinto de falha estética.",
    resultado:
      "Padronização do escopo técnico em todas as unidades, previsibilidade orçamentária anual e um único interlocutor de engenharia para a operação inteira.",
  },
  {
    setor: "Logística e centros de distribuição",
    title: "Manutenção em janelas que não param a expedição",
    image: caseLogistica,
    alt: "Interior de galpão logístico com iluminação em altura e infraestrutura elétrica aparente",
    desafio:
      "Galpões operando em turnos estendidos, onde qualquer intervenção em energia, docas ou iluminação de alta montagem impacta diretamente o volume expedido no dia.",
    solucao:
      "Plano preventivo executado em janelas negociadas fora do pico, com trabalho em altura sob NR-35, termografia periódica de quadros e painéis, manutenção do sistema de combate a incêndio e climatização das áreas administrativas.",
    resultado:
      "Intervenções programadas com impacto zero na expedição e redução da recorrência de chamados corretivos em iluminação e infraestrutura elétrica.",
  },
  {
    setor: "Saúde",
    title: "Ambientes críticos com ar tratado e energia garantida",
    image: caseSaude,
    alt: "Corredor hospitalar com difusores de ar condicionado no forro",
    desafio:
      "Ambiente assistencial 24x7, com exigência sanitária sobre qualidade do ar e tolerância nula a queda de energia em áreas críticas.",
    solucao:
      "PMOC executado com registro e periodicidade, limpeza e troca de filtros documentadas, controle de parâmetros de climatização, testes de grupo gerador e nobreaks com carga real e manutenção hidráulica com laudo de potabilidade.",
    resultado:
      "Documentação sanitária e elétrica completa para fiscalização e acreditação, com continuidade operacional preservada em todas as áreas críticas.",
  },
  {
    setor: "Educação",
    title: "Manutenção que acontece quando o campus está vazio",
    image: caseHvac,
    alt: "Manutenção em central de climatização de grande porte",
    desafio:
      "Alta circulação de pessoas em horário letivo e infraestrutura envelhecida de climatização, elétrica e hidráulica distribuída em vários blocos.",
    solucao:
      "Cronograma preventivo ajustado ao calendário acadêmico, priorização por criticidade de bloco, comissionamento contínuo dos equipamentos de climatização e substituição planejada de ativos em fim de vida útil.",
    resultado:
      "Zero interferência nas atividades letivas e um plano plurianual de substituição de ativos com orçamento previsível, no lugar de trocas emergenciais.",
  },
  {
    setor: "Edifícios corporativos AAA",
    title: "Equipe residente que responde em minutos",
    image: caseCorporativo,
    alt: "Sala de monitoramento predial com painéis de indicadores de HVAC e energia",
    desafio:
      "Ocupantes corporativos exigentes, contratos de locação com nível de serviço definido e uma central de água gelada respondendo por parcela relevante da conta de energia.",
    solucao:
      "Equipe residente cobrindo elétrica, hidráulica, civil e climatização, atendimento em minutos, comissionamento contínuo da central de água gelada e relatório gerencial mensal de disponibilidade e consumo.",
    resultado:
      "Melhora percebida no conforto térmico dos andares, resposta imediata a chamados e um relatório mensal que sustenta a conversa do gestor predial com a diretoria.",
  },
];

function CasesPage() {
  return (
    <article>
      <PageHero
        eyebrow="Cases"
        title="Operações que não podem parar — e não param"
        sub="Contratos de manutenção e obras executados em varejo, logística, saúde, educação, telecom e edifícios corporativos, com desafio, solução técnica e resultado medido."
      />
      <PageBody>
        <p>
          Cada case abaixo segue a mesma lógica que aplicamos em mais de 400 contratos ativos:
          entender o custo real da parada, transformar isso em plano preventivo por ativo e provar o
          resultado com indicador — não com percepção.
        </p>

        <div className="not-prose mt-10 space-y-12">
          {CASES.map((c, i) => (
            <section
              key={c.setor}
              className="grid gap-6 overflow-hidden rounded-xl border border-border bg-card shadow-card lg:grid-cols-2 lg:gap-0"
            >
              <img
                src={c.image}
                alt={c.alt}
                width={1280}
                height={720}
                loading="lazy"
                className={`h-56 w-full object-cover lg:h-full ${i % 2 ? "lg:order-2" : ""}`}
              />
              <div className="p-6 lg:p-8">
                <p className="eyebrow text-primary">{c.setor}</p>
                <h2 className="mt-3 font-display text-xl font-bold text-foreground">{c.title}</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="font-display font-semibold text-foreground">Desafio</dt>
                    <dd className="mt-1 text-muted-foreground">{c.desafio}</dd>
                  </div>
                  <div>
                    <dt className="font-display font-semibold text-foreground">Solução Álamo</dt>
                    <dd className="mt-1 text-muted-foreground">{c.solucao}</dd>
                  </div>
                  <div>
                    <dt className="font-display font-semibold text-foreground">Resultado</dt>
                    <dd className="mt-1 text-muted-foreground">{c.resultado}</dd>
                  </div>
                </dl>
              </div>
            </section>
          ))}
        </div>

        <p className="pt-10">
          Podemos apresentar os cases completos, com nomes de clientes e indicadores auditados, em
          reunião comercial sob acordo de confidencialidade.
        </p>

        <div className="not-prose mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/orcamento">Solicite seu orçamento</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="border-transparent bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
          >
            <a
              href={waUrl(
                "Olá! Vi os cases da Álamo Engenharia e gostaria de falar com um especialista sobre a minha operação.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="mr-2 h-4 w-4" /> Falar com um especialista
            </a>
          </Button>
        </div>
      </PageBody>
    </article>
  );
}
