import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = [
  { q: "Quais serviços a Álamo Engenharia executa?", a: "Manutenção predial preventiva, preditiva e corretiva, HVAC e ar condicionado, infraestrutura elétrica, hidráulica, telecom e conectividade, automação eletrônica, obras civis, retrofit, SPDA, termografia, pintura e subestações." },
  { q: "Em quais regiões vocês atendem?", a: "Atendemos em todo o Brasil, com matriz no Rio de Janeiro e filiais em São Paulo, Belo Horizonte e Espírito Santo, além de equipes volantes regionais nas demais praças." },
  { q: "Como funciona o SLA do contrato?", a: "Os prazos de atendimento e solução são definidos por criticidade do ativo, medidos chamado a chamado e reportados no relatório mensal, com penalidades previstas em contrato." },
  { q: "Vocês trabalham com equipe residente?", a: "Sim. Oferecemos equipe residente, time volante ou modelo híbrido, em regimes 8x5, 12x6 e 24x7, com plantão de emergência." },
  { q: "Quais documentos e normas são atendidos?", a: "NBR 5674, NBR 5410, NR-10, NR-35, NBR 5419 (SPDA), NBR 13971 e PMOC, entre outras aplicáveis, com ART e responsável técnico em todos os serviços." },
  { q: "Como solicito um orçamento?", a: "Pelo formulário da página de contato, com possibilidade de anexar plantas, laudos e escopos técnicos. Retornamos em até um dia útil." },
  { q: "Vocês atendem empresas estrangeiras instaladas no Brasil?", a: "Sim. Atendemos multinacionais e damos suporte de comunicação em inglês, espanhol e chinês, com contratos e documentação técnica em português." },
  { q: "É possível integrar os chamados ao nosso sistema?", a: "Sim. Trabalhamos com canal único de abertura de chamados e podemos integrar ao CRM ou ao sistema de gestão de manutenção do cliente." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Perguntas Frequentes | Álamo Engenharia" },
      { name: "description", content: "Perguntas frequentes sobre contratos de manutenção predial, HVAC, elétrica, SLA, cobertura nacional, normas técnicas e orçamentos." },
      { property: "og:title", content: "FAQ — Perguntas Frequentes | Álamo Engenharia" },
      { property: "og:description", content: "Tire suas dúvidas sobre contratos de manutenção predial, HVAC, elétrica, SLA e cobertura nacional da Álamo Engenharia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://alamoengenharia.com.br/faq" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <article>
      <PageHero
        eyebrow="FAQ"
        title="Perguntas frequentes"
        sub="Dúvidas mais comuns de gestores de manutenção, engenharia e suprimentos antes de contratar."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <Accordion type="single" collapsible>
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </article>
  );
}
