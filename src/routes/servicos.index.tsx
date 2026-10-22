import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-shell";
import { SERVICE_CONTENT } from "@/lib/service-content";

export const Route = createFileRoute("/servicos/")({
  head: () => ({
    meta: [
      { title: "Serviços de Manutenção Predial, HVAC e Elétrica | Álamo Engenharia" },
      { name: "description", content: "Todos os serviços da Álamo Engenharia: manutenção predial, HVAC, elétrica, hidráulica, tecnologia integrada e demandas sob medida." },
      { property: "og:title", content: "Serviços | Álamo Engenharia" },
      { property: "og:description", content: "Manutenção predial, HVAC, elétrica, hidráulica e tecnologia integrada com SLA contratual e cobertura nacional." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://alamoengenharia.com.br/servicos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/servicos" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const items = Object.values(SERVICE_CONTENT).filter((service) => service.slug !== "telecom-conectividade");
  return (
    <article>
      <PageHero
        eyebrow="Expertises"
        title="Serviços de engenharia de manutenção"
        sub="Sete frentes técnicas sob um único contrato, com responsável técnico, SLA medido e relatório gerencial mensal."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {items.map((s) => (
          <Link
            key={s.slug}
            to="/servicos/$slug"
            params={{ slug: s.slug }}
            className="group rounded-lg border border-border bg-card p-6 shadow-card transition-colors hover:border-primary"
          >
            <h2 className="font-display text-lg font-semibold">{s.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.sub}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Ver detalhes <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
    </article>
  );
}
