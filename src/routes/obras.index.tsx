import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-shell";
import { OBRA_CONTENT } from "@/lib/obras-content";

export const Route = createFileRoute("/obras/")({
  head: () => ({
    meta: [
      { title: "Obras e Retrofit Corporativo | Álamo Engenharia" },
      { name: "description", content: "Obras civis, elétricas e hidráulicas, sistemas de incêndio, reformas corporativas, adequações técnicas e retrofit com operação em funcionamento." },
      { property: "og:title", content: "Obras | Álamo Engenharia" },
      { property: "og:description", content: "Obras, reformas, adequações e retrofit com planejamento por interferência, responsabilidade técnica e segurança do trabalho." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://alamoengenharia.com.br/obras" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/obras" }],
  }),
  component: ObrasIndex,
});

function ObrasIndex() {
  const items = Object.values(OBRA_CONTENT);
  return (
    <article>
      <PageHero
        eyebrow="Obras"
        title="Obras e projetos executados sem parar a sua operação"
        sub="Do ajuste de layout ao retrofit completo, com engenheiro responsável, documentação técnica e cronograma desenhado a partir das interferências."
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map((o) => (
          <Link
            key={o.slug}
            to="/obras/$slug"
            params={{ slug: o.slug }}
            className="group rounded-lg border border-border bg-card p-6 shadow-card transition-colors hover:border-primary"
          >
            <h2 className="font-display text-base font-semibold">{o.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{o.sub}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Ver detalhes <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
    </article>
  );
}
