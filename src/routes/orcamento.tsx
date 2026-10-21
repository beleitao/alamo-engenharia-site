import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/orcamento")({
  head: () => ({
    meta: [
      { title: "Solicite seu Orçamento de Manutenção | Álamo Engenharia" },
      {
        name: "description",
        content:
          "Peça um orçamento técnico de manutenção predial, HVAC, elétrica, hidráulica, obras civis ou automação. Um engenheiro analisa sua demanda em até 1 dia útil.",
      },
      { property: "og:title", content: "Solicite seu Orçamento | Álamo Engenharia" },
      {
        property: "og:description",
        content: "Orçamento técnico com engenheiro responsável, SLA e atendimento nacional.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://alamoengenharia.com.br/orcamento" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/orcamento" }],
  }),
  component: OrcamentoPage,
});

function OrcamentoPage() {
  return (
    <article>
      <PageHero
        eyebrow="Comercial"
        title="Solicite seu orçamento"
        sub="Descreva sua operação e anexe fotos ou imagens de plantas. Um engenheiro analisa antes do primeiro contato."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <LeadForm />
      </section>
    </article>
  );
}
