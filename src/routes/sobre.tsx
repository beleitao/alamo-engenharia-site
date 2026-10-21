import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, PageBody } from "@/components/page-shell";
import { Timeline } from "@/components/timeline";
import { CoverageMap } from "@/components/coverage-map";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";
import equipe from "@/assets/sobre-equipe.jpg";
import operacao from "@/assets/sobre-operacao.jpg";
import predial from "@/assets/predial.jpg";
import premio from "@/assets/premio-infrafm.webp";
import esgHero from "@/assets/esg-hero.jpg";
import imgCertificacoes from "@/assets/sgi-certificacoes.jpg";
import { Handshake, HeartHandshake, RefreshCw, ShieldCheck, Target, Trophy } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Álamo Engenharia | Manutenção predial e infraestrutura" },
      { name: "description", content: "Conheça a Álamo Engenharia: 56 anos de operação e mais de 2.000 colaboradores, matriz no Rio de Janeiro e filiais em SP, MG e ES, com atendimento nacional em manutenção predial, HVAC, elétrica, hidráulica e obras." },
      { property: "og:title", content: "Sobre a Álamo Engenharia | Manutenção predial e infraestrutura" },
      { property: "og:description", content: "56 anos mantendo operações críticas no ar: engenharia de manutenção predial, HVAC, elétrica, hidráulica e obras com mais de 2.000 colaboradores em todo o Brasil." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://alamoengenharia.com.br/sobre" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/sobre" }],
  }),
  component: AboutPage,
});

const PILARES = [
  {
    title: "Técnicos próprios, não intermediação",
    text: "Nossa equipe é contratada, treinada e certificada pela Álamo. Não repassamos contratos a terceiros: quem responde pelo SLA é quem está em campo, com supervisão de engenharia e responsabilidade técnica formal.",
  },
  {
    title: "Engenharia antes da chave de fenda",
    text: "Todo contrato começa por inventário de ativos, classificação de criticidade e plano preventivo por equipamento — cruzando manual do fabricante, norma aplicável e histórico real de falhas.",
  },
  {
    title: "Evidência de tudo o que é feito",
    text: "Ordem de serviço, checklist, registro fotográfico, medição instrumentada, ART e laudo. O relatório mensal é auditável e sustenta a defesa técnica do gestor diante da diretoria, da seguradora e do órgão fiscalizador.",
  },
  {
    title: "Escala nacional com gestão central",
    text: "Times regionais em mais de 20 estados e coordenação centralizada de chamados permitem padronizar o mesmo nível de serviço em operações multi-site sem multiplicar interlocutores.",
  },
];

const VALORES = [
  { icon: ShieldCheck, title: "Integridade", text: "Agimos com ética, transparência e responsabilidade em todas as nossas decisões e relacionamentos." },
  { icon: Target, title: "Orientação para Resultados", text: "Buscamos resultados consistentes e sustentáveis, atuando com disciplina, eficiência, responsabilidade e senso de dono." },
  { icon: HeartHandshake, title: "Foco no Cliente", text: "Compreendemos as necessidades dos nossos clientes e buscamos gerar valor, assegurando a continuidade e a eficiência de suas operações." },
  { icon: Trophy, title: "Excelência na Execução", text: "Executamos nosso trabalho com qualidade, segurança, eficiência e disciplina operacional." },
  { icon: Handshake, title: "Colaboração e Respeito", text: "Valorizamos as pessoas, compartilhamos conhecimento e acreditamos que os melhores resultados são construídos em conjunto." },
  { icon: RefreshCw, title: "Evolução Contínua", text: "Aprendemos, inovamos e buscamos continuamente o aperfeiçoamento das pessoas, dos processos e da empresa." },
] as const;

const INSTITUCIONAL = [
  { href: "#governanca", label: "Governança" },
  { href: "#sgi", label: "SGI" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#esg", label: "ESG" },
  { href: "#politicas", label: "Políticas internas" },
  { href: "#doacoes", label: "Doações" },
  { href: "#premiacoes", label: "Premiações" },
  { href: "#presenca-nacional", label: "Presença nacional" },
] as const;

function AboutPage() {
  return (
    <article>
      <PageHero
        eyebrow="Sobre a Álamo"
        title="Engenharia de manutenção que sustenta operações críticas"
        sub="56 anos mantendo edifícios corporativos, plantas industriais, hospitais, escolas e centros logísticos operando sem interrupção em todo o Brasil."
      />
      <nav aria-label="Nesta página" className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 lg:px-8">
          {INSTITUCIONAL.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-sm border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      <PageBody>
        <img
          src={equipe}
          alt="Equipe de engenharia da Álamo analisando o plano de manutenção em sala técnica"
          width={1280}
          height={720}
          loading="lazy"
          className="not-prose aspect-[16/7] w-full rounded-lg object-cover"
        />
        <p>
          A Álamo Engenharia é uma empresa brasileira de engenharia de manutenção e infraestrutura
          predial com matriz no Rio de Janeiro e filiais em São Paulo, Belo Horizonte e Espírito
          Santo. São mais de 400 contratos de manutenção ativos, mais de 2.000 colaboradores próprios
          em campo e presença em mais de 20 estados e 100 cidades — uma malha construída contrato a
          contrato, ao longo de 56 anos de operação ininterrupta.
        </p>
        <p>
          Atuamos onde a parada custa caro: hospitais e clínicas, redes de varejo multi-site,
          centros de distribuição, campi educacionais, data centers, plantas industriais e edifícios
          corporativos AAA. Em todos eles, o produto entregue é o mesmo — disponibilidade dos
          sistemas prediais, com documentação técnica que resiste a auditoria.
        </p>

        <h2 className="pt-4 font-display text-xl font-bold text-foreground">
          O que nos torna diferentes
        </h2>
        <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
          {PILARES.map((p) => (
            <div key={p.title} className="rounded-lg border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>

        <section className="not-prose my-12 border-y border-border py-12">
          <p className="eyebrow text-primary">Missão e valores</p>
          <div className="mt-4 border-l-4 border-accent pl-6">
            <h2 className="font-display text-2xl font-bold text-foreground">Nossa missão</h2>
            <p className="mt-3 max-w-4xl text-lg leading-relaxed text-foreground/80">Garantir a continuidade e a eficiência das operações dos nossos clientes por meio de soluções de engenharia, entregando qualidade, segurança, inovação e otimização de recursos.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.map((valor) => (
              <div key={valor.title} className="rounded-lg border border-border bg-card p-6 shadow-card">
                <valor.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-bold text-foreground">{valor.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{valor.text}</p>
              </div>
            ))}
          </div>
        </section>

        <h2 className="pt-4 font-display text-xl font-bold text-foreground">
          Como um contrato Álamo funciona na prática
        </h2>
        <img
          src={operacao}
          alt="Central de monitoramento de ativos prediais com painéis de HVAC e energia"
          width={1280}
          height={720}
          loading="lazy"
          className="not-prose aspect-[16/7] w-full rounded-lg object-cover"
        />
        <p>
          <strong>1. Diagnóstico.</strong> Levantamos os ativos em campo, registramos dados de placa,
          condição atual e histórico disponível, e mapeamos os pontos de falha que já impactaram a
          operação. Nenhum plano é copiado de outro cliente.
        </p>
        <p>
          <strong>2. Criticidade e plano.</strong> Cada ativo recebe classificação de criticidade
          considerando impacto da falha, probabilidade e detectabilidade. A partir dela definimos
          tarefa, periodicidade, insumo e tempo padrão — a base do orçamento anual defensável.
        </p>
        <p>
          <strong>3. Execução com evidência.</strong> Equipes residentes ou volantes executam sob
          ordem de serviço, com checklist, foto antes e depois e medições instrumentadas
          (termografia, análise de vazão, parâmetros elétricos, pressões de operação).
        </p>
        <p>
          <strong>4. Medição e revisão.</strong> Relatório mensal com disponibilidade, aderência ao
          SLA, reincidência, MTBF e MTTR, seguido de revisão trimestral do plano preventivo com base
          no comportamento real dos ativos.
        </p>
        <p>
          <strong>5. Pós-venda e melhoria contínua.</strong> Após a implantação e operação dos serviços, a Álamo mantém acompanhamento contínuo do contrato por meio de avaliações de desempenho, indicadores, reuniões de alinhamento e planos de melhoria. Este processo assegura a qualidade dos serviços prestados, a identificação de oportunidades de otimização e a evolução constante dos resultados entregues aos clientes.
        </p>

        <h2 id="governanca" className="scroll-mt-36 pt-4 font-display text-xl font-bold text-foreground">
          Governança, normas e segurança
        </h2>
        <img
          src={predial}
          alt="Técnico da Álamo Engenharia executando manutenção preventiva predial"
          width={1280}
          height={720}
          loading="lazy"
          className="not-prose aspect-[16/7] w-full rounded-lg object-cover"
        />
        <p>
          Nosso Sistema de Gestão Integrado é estruturado sobre as referências ISO 9001, ISO 14001 e
          ISO 45001 e sobre o corpo normativo brasileiro aplicável à manutenção predial — ABNT NBR
          5674, NBR 14037, NBR 16280, NBR 5410, NBR 14039, NBR 5419 e as Normas Regulamentadoras
          NR-10, NR-35, NR-33 e NR-12, além do PMOC para climatização. Conheça o detalhamento em{" "}
          <Link to="/sgi/$slug" params={{ slug: "certificacoes" }} className="text-primary underline">
            Certificações
          </Link>
          .
        </p>

        <section id="sgi" className="not-prose scroll-mt-36 border-t border-border pt-10">
          <p className="eyebrow text-primary">Sistema de Gestão Integrado</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-foreground">Gestão que transforma procedimento em evidência</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            O SGI organiza responsabilidades, controles, registros e ciclos de melhoria para que qualidade, segurança e desempenho ambiental façam parte da rotina de cada contrato — da mobilização à análise mensal dos resultados.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="outline"><Link to="/sgi/$slug" params={{ slug: "qualidade" }}>Qualidade</Link></Button>
            <Button asChild variant="outline"><Link to="/sgi/$slug" params={{ slug: "meio-ambiente" }}>Meio ambiente</Link></Button>
            <Button asChild variant="outline"><Link to="/sgi/$slug" params={{ slug: "seguranca-e-saude" }}>Segurança e saúde</Link></Button>
          </div>
        </section>

        <section id="certificacoes" className="not-prose scroll-mt-36 grid gap-6 border-t border-border pt-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <img src={imgCertificacoes} alt="Auditoria do Sistema de Gestão Integrado" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div>
            <p className="eyebrow text-primary">Certificações</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">ISO 9001, ISO 14001 e ISO 45001</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">As três referências estruturam processos de qualidade, gestão ambiental e saúde e segurança ocupacional. Na contratação, isso se traduz em critérios claros, documentação rastreável e melhoria contínua.</p>
            <Button asChild className="mt-5"><Link to="/sgi/$slug" params={{ slug: "certificacoes" }}>Conhecer certificações</Link></Button>
          </div>
        </section>

        <section id="esg" className="not-prose scroll-mt-36 grid gap-6 border-t border-border pt-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="eyebrow text-primary">ESG</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">Responsabilidade aplicada à operação</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Gestão de resíduos e fluidos refrigerantes, eficiência no uso de recursos, segurança das pessoas e integridade nos negócios fazem parte da governança operacional.</p>
            <Button asChild className="mt-5"><Link to="/esg">Conhecer nossa atuação ESG</Link></Button>
          </div>
          <img src={esgHero} alt="Eficiência energética e responsabilidade ambiental" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover md:order-last" />
        </section>

        <div className="not-prose grid gap-6 border-t border-border pt-10 md:grid-cols-2">
          <section id="politicas" className="scroll-mt-36 rounded-lg border border-border bg-card p-6 shadow-card">
            <p className="eyebrow text-primary">Políticas internas</p>
            <h2 className="mt-3 font-display text-xl font-bold text-foreground">Conduta, integridade e proteção de dados</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Diretrizes internas orientam a conduta profissional, a segurança das informações, a privacidade e o relacionamento responsável com clientes, colaboradores e fornecedores.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="sm" variant="outline"><Link to="/politica-de-privacidade">Política de privacidade</Link></Button>
              <Button asChild size="sm" variant="outline"><Link to="/canal-de-denuncias">Canal de denúncias</Link></Button>
            </div>
          </section>
          <section id="doacoes" className="scroll-mt-36 rounded-lg border border-border bg-card p-6 shadow-card">
            <p className="eyebrow text-primary">Doações e impacto social</p>
            <h2 className="mt-3 font-display text-xl font-bold text-foreground">Apoio responsável às comunidades</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Apoios e doações devem seguir critérios de integridade, transparência e aderência às diretrizes internas. Informações sobre iniciativas e parcerias são comunicadas a partir de registros institucionais verificáveis.</p>
            <Button asChild size="sm" variant="outline" className="mt-5"><Link to="/contato">Falar com a Álamo</Link></Button>
          </section>
        </div>

        <section id="premiacoes" className="not-prose scroll-mt-36 grid gap-6 border-t border-border pt-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <img src={premio} alt="Cerimônia corporativa de reconhecimento" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <div>
            <p className="eyebrow text-primary">Premiações</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground">Indicados ao Prêmio Infra FM 2026</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A indicação reconhece a consistência de uma operação baseada em planejamento preventivo, responsabilidade técnica e evidências de execução.</p>
            <Button asChild className="mt-5"><Link to="/premiacoes">Ver reconhecimento</Link></Button>
          </div>
        </section>
        <p>
          Segurança do trabalho não é etapa negociável: nenhuma tarefa é iniciada sem análise
          preliminar de risco, permissão de trabalho e EPI adequado, e qualquer profissional da
          Álamo tem o direito e o dever de interromper uma atividade em condição insegura.
        </p>

        <div className="not-prose mt-10 flex flex-wrap gap-3">
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
                "Olá! Conheci a Álamo Engenharia pela página Sobre e gostaria de falar com um especialista.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="mr-2 h-4 w-4" /> Falar com um especialista
            </a>
          </Button>
        </div>
      </PageBody>
      <Timeline />
      <section id="presenca-nacional" className="scroll-mt-28 bg-deep py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <CoverageMap />
        </div>
      </section>
    </article>
  );
}
