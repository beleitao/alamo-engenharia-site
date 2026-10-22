import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero, PageBody } from "@/components/page-shell";
import imgCertificacoes from "@/assets/sgi-certificacoes.webp";
import imgMeioAmbiente from "@/assets/sgi-meio-ambiente.webp";
import imgQualidade from "@/assets/sgi-qualidade.webp";
import imgSeguranca from "@/assets/sgi-seguranca.webp";

const SGI: Record<string, { name: string; sub: string; image: string; alt: string; paragraphs: string[] }> = {
  certificacoes: {
    name: "Certificações",
    sub: "Sistema de Gestão Integrado estruturado sobre ISO 9001, ISO 14001 e ISO 45001 — processos auditáveis em qualidade, meio ambiente, segurança e saúde ocupacional.",
    image: imgCertificacoes,
    alt: "Auditoria interna do Sistema de Gestão Integrado da Álamo Engenharia",
    paragraphs: [
      "Contratar manutenção é contratar risco assumido por terceiros. Por isso a Álamo Engenharia opera sobre um Sistema de Gestão Integrado (SGI) que unifica qualidade, meio ambiente e saúde e segurança ocupacional em um único conjunto de políticas, procedimentos, indicadores e registros — o mesmo padrão de governança que grandes operações exigem de sua cadeia de fornecimento.",
      "A base normativa é a estrutura de alto nível (Annex SL) comum às normas ISO de sistemas de gestão: contexto da organização, liderança, planejamento com abordagem de riscos e oportunidades, apoio, operação, avaliação de desempenho e melhoria. Na prática, isso significa que cada contrato tem responsável técnico, procedimento documentado, critério de aceitação, indicador medido e ciclo de análise crítica — nada depende da memória do técnico em campo.",
      "ISO 9001 — Gestão da Qualidade. Padroniza a execução dos serviços: procedimentos operacionais por tipo de intervenção, checklists com evidência fotográfica, tratamento formal de não conformidades com análise de causa raiz (5 porquês / Ishikawa), controle de fornecedores e calibração de instrumentos de medição. O cliente recebe rastreabilidade completa: o que foi feito, por quem, quando, com qual instrumento e com qual resultado.",
      "ISO 14001 — Gestão Ambiental. Governa aspectos e impactos ambientais das nossas frentes: segregação e destinação de resíduos com manifesto de transporte (MTR), recolhimento e controle de fluidos refrigerantes, descarte regularizado de lâmpadas, óleos, baterias e EPIs contaminados, além do monitoramento de consumo de energia e água nos ativos sob nossa responsabilidade.",
      "ISO 45001 — Saúde e Segurança Ocupacional. Estrutura a prevenção como pré-requisito operacional: identificação de perigos e avaliação de riscos antes de cada tarefa, análise preliminar de risco (APR), permissão de trabalho, consulta e participação dos trabalhadores, investigação de incidentes e quase-acidentes, integrada às Normas Regulamentadoras brasileiras aplicáveis — NR-10, NR-35, NR-33, NR-12 e NR-06.",
      "O SGI é sustentado por auditorias internas planejadas, auditoria de terceira parte quando aplicável, plano de ação com prazo e responsável para cada não conformidade e reunião de análise crítica pela direção. Toda a documentação técnica dos contratos — procedimentos, checklists, ART, laudos, PMOC, prontuários e registros de treinamento — fica rastreável e disponível para auditoria do cliente a qualquer momento.",
      "É esse arcabouço que permite à Álamo assumir operações críticas — hospitais, data centers, redes de varejo, plantas industriais e edifícios corporativos AAA — com previsibilidade de resultado e defesa técnica documentada diante de auditorias, seguradoras e órgãos fiscalizadores.",
    ],
  },
  "meio-ambiente": {
    name: "Meio Ambiente",
    sub: "Gestão de resíduos, fluidos refrigerantes, consumo de energia e água nas operações que mantemos.",
    image: imgMeioAmbiente,
    alt: "Colaboradores da Álamo Engenharia plantando árvores em ação ambiental",
    paragraphs: [
      "A política ambiental cobre segregação e destinação de resíduos, manifesto de transporte, controle e recolhimento de fluidos refrigerantes conforme legislação e descarte adequado de lâmpadas, óleos e baterias.",
      "Nos contratos de manutenção, monitoramos consumo de energia e água e propomos medidas de eficiência com payback estimado — o ganho ambiental e o ganho financeiro caminham juntos.",
    ],
  },
  qualidade: {
    name: "Qualidade",
    sub: "Padronização de procedimentos, medição de indicadores e melhoria contínua a partir do histórico de falhas.",
    image: imgQualidade,
    alt: "Reunião de alinhamento de qualidade da equipe técnica da Álamo Engenharia",
    paragraphs: [
      "Cada serviço tem procedimento definido, checklist de execução e critério de aceitação. O que não pode ser medido não entra em contrato.",
      "Acompanhamos disponibilidade dos sistemas, aderência ao SLA, reincidência de chamados, MTBF e MTTR, revisando trimestralmente o plano preventivo com base nos dados.",
      "Pesquisas de satisfação e reuniões mensais de resultado fecham o ciclo de melhoria contínua com o cliente.",
    ],
  },
  "seguranca-e-saude": {
    name: "Segurança e Saúde",
    sub: "Segurança do trabalho como pré-requisito de qualquer frente de serviço, sem exceção.",
    image: imgSeguranca,
    alt: "Treinamento de segurança do trabalho com equipe de manutenção",
    paragraphs: [
      "Todas as equipes atuam com análise preliminar de risco, permissão de trabalho, EPIs adequados e treinamento nas NRs aplicáveis — NR-10, NR-35, NR-33, NR-12 e NR-06, entre outras.",
      "Mantemos PCMSO, PGR, ASO em dia e registros de integração por cliente, com auditorias de campo e indicadores de segurança reportados mensalmente.",
      "Nenhuma tarefa é executada sem condição segura: a interrupção da atividade é direito e dever de qualquer profissional da Álamo.",
    ],
  },
};

export const Route = createFileRoute("/sgi/$slug")({
  loader: ({ params }) => {
    const content = SGI[params.slug];
    if (!content) throw notFound();
    return { content };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Página não encontrada" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.content.name} — SGI | Álamo Engenharia`;
    const url = `https://alamoengenharia.com.br/sgi/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.content.sub },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.content.sub },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: SgiPage,
});

const ISO_SEALS = [
  {
    code: "ISO 9001",
    title: "Gestão da Qualidade",
    text: "Procedimentos padronizados, indicadores medidos e melhoria contínua em cada contrato.",
  },
  {
    code: "ISO 14001",
    title: "Gestão Ambiental",
    text: "Resíduos, fluidos refrigerantes e consumo de energia e água sob controle documentado.",
  },
  {
    code: "ISO 45001",
    title: "Saúde e Segurança",
    text: "Prevenção de riscos, APR, permissão de trabalho e conformidade com as NRs aplicáveis.",
  },
];

function IsoSeals() {
  return (
    <div className="not-prose my-8 grid gap-5 sm:grid-cols-3">
      {ISO_SEALS.map((s) => (
        <div
          key={s.code}
          className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-card transition-transform hover:-translate-y-0.5"
        >
          <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-primary bg-primary/10">
            <div className="text-center leading-tight">
              <span className="block font-display text-[0.6rem] font-bold uppercase tracking-widest text-primary">
                ISO
              </span>
              <span className="block font-display text-xl font-extrabold text-primary">
                {s.code.replace("ISO ", "")}
              </span>
            </div>
          </div>
          <h3 className="mt-4 font-display text-base font-bold text-foreground">{s.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

function SgiPage() {
  const { content } = Route.useLoaderData();
  return (
    <article>
      <PageHero eyebrow="SGI · Governança" title={content.name} sub={content.sub} />
      <PageBody>
        {content.name === "Certificações" && <IsoSeals />}
        <img
          src={content.image}
          alt={content.alt}
          className="not-prose aspect-[16/7] w-full rounded-lg object-cover"
        />
        {content.paragraphs.map((p: string) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </PageBody>
    </article>
  );
}
