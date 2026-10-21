import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Star, Trophy } from "lucide-react";
import { PageHero, PageBody } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";
import premio from "@/assets/premio-infrafm.webp";

export const Route = createFileRoute("/premiacoes")({
  head: () => ({
    meta: [
      { title: "Premiações | Álamo Engenharia indicada ao Prêmio Infra FM 2026" },
      {
        name: "description",
        content:
          "A Álamo Engenharia foi indicada ao Prêmio Infra FM 2026, reconhecimento do setor de infraestrutura predial e gestão de manutenção no Brasil.",
      },
      { property: "og:title", content: "Premiações | Álamo Engenharia indicada ao Prêmio Infra FM 2026" },
      {
        property: "og:description",
        content:
          "Indicação ao Prêmio Infra FM 2026: o reconhecimento de um trabalho de engenharia de manutenção medido por disponibilidade e evidência técnica.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://alamoengenharia.com.br/premiacoes" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/premiacoes" }],
  }),
  component: PremiacoesPage,
});

const CRITERIOS = [
  {
    icon: Trophy,
    title: "Indicação Prêmio Infra FM 2026",
    text: "A Álamo Engenharia foi indicada ao Prêmio Infra FM 2026, uma das principais premiações do setor de infraestrutura predial e gestão de manutenção no Brasil.",
  },
  {
    icon: Star,
    title: "Reconhecimento vindo do cliente",
    text: "Indicações desse tipo nascem da avaliação de quem convive com o serviço todos os dias — o gestor predial que mede disponibilidade, tempo de resposta e qualidade da evidência entregue.",
  },
  {
    icon: Award,
    title: "Resultado de método, não de acaso",
    text: "Plano preventivo por criticidade, técnicos próprios treinados, SLA medido e relatório mensal auditável: a mesma disciplina aplicada em mais de 400 contratos ativos.",
  },
];

function PremiacoesPage() {
  return (
    <article>
      <PageHero
        eyebrow="Reconhecimento"
        title="Indicados ao Prêmio Infra FM 2026"
        sub="O reconhecimento do mercado de infraestrutura predial para um trabalho de engenharia de manutenção medido por disponibilidade, conformidade e evidência técnica."
      />
      <PageBody>
        <img
          src={premio}
          alt="Palco de cerimônia de premiação corporativa com troféu iluminado"
          width={1280}
          height={720}
          loading="lazy"
          className="not-prose aspect-[16/7] w-full rounded-lg object-cover"
        />
        <p>
          A Álamo Engenharia foi indicada ao <strong>Prêmio Infra FM 2026</strong>, iniciativa que
          reconhece empresas e profissionais que se destacam na gestão de infraestrutura predial e
          manutenção no Brasil. Para nós, a indicação tem um valor específico: ela não avalia
          discurso comercial, avalia operação.
        </p>
        <p>
          Estar entre os indicados significa que a rotina que defendemos há 56 anos —
          inventário de ativos, criticidade, plano preventivo executado com evidência, indicador
          medido e revisão periódica — é reconhecida por quem entende do assunto e convive com o
          resultado diariamente.
        </p>

        <div className="not-prose my-8 grid gap-5 sm:grid-cols-3">
          {CRITERIOS.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <c.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-display text-base font-bold text-foreground">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <h2 className="pt-4 font-display text-xl font-bold text-foreground">
          O que isso significa para quem contrata a Álamo
        </h2>
        <p>
          Um prêmio setorial não mantém chiller nenhum funcionando. O que ele indica é consistência:
          empresas indicadas costumam ser aquelas com processo documentado, equipe própria
          qualificada e capacidade de comprovar tecnicamente cada intervenção. É exatamente esse o
          padrão que entregamos em hospitais, redes de varejo, centros de distribuição, campi
          educacionais e edifícios corporativos AAA em mais de 20 estados.
        </p>
        <p>
          Seguimos com a mesma régua de sempre: aderência ao SLA medida, relatório mensal auditável
          e responsabilidade técnica assinada.
        </p>

        <div className="not-prose mt-8 flex flex-wrap gap-3">
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
                "Olá! Vi a indicação da Álamo Engenharia ao Prêmio Infra FM 2026 e gostaria de falar com um especialista.",
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
