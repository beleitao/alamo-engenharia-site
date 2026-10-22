import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";
import { LeadForm } from "@/components/lead-form";
import { OBRA_CONTENT, type ObraContent } from "@/lib/obras-content";

export const Route = createFileRoute("/obras/$slug")({
  loader: ({ params }) => {
    const aliases: Record<string, string> = {
      "ajustes-de-layout": "reformas-corporativas",
      "servicos-pontuais-eletrica": "obras-eletricas",
      spda: "adequacoes-tecnicas",
      termografia: "adequacoes-tecnicas",
      pintura: "reformas-corporativas",
      subestacoes: "obras-eletricas",
    };
    const content = OBRA_CONTENT[aliases[params.slug] ?? params.slug];
    if (!content) throw notFound();
    return { content };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Página não encontrada" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.content;
    const url = `https://alamoengenharia.com.br/obras/${params.slug}`;
    return {
      meta: [
        { title: c.metaTitle },
        { name: "description", content: c.metaDescription },
        { property: "og:title", content: c.metaTitle },
        { property: "og:description", content: c.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ObraPage,
});

function ObraPage() {
  const { content } = Route.useLoaderData() as { content: ObraContent };

  return (
    <article>
      <section className="surface-deep">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <p className="eyebrow text-accent">Obras · {content.name}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {content.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-deep-foreground/75">{content.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <a href="#orcamento">
                Solicitar orçamento <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-transparent bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
            >
              <a
                href={waUrl(
                  `Olá! Gostaria de falar com um especialista da Álamo Engenharia sobre ${content.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="mr-2 h-4 w-4" /> Falar com um especialista
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1fr_minmax(0,26rem)] lg:px-8">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">O que está incluído</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {content.bullets.map((b) => (
              <li key={b} className="flex gap-2 rounded-lg border border-border bg-card p-4 text-sm shadow-card">
                <Check className="h-5 w-5 shrink-0 text-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl">Sobre {content.name.toLowerCase()}</h2>
            {content.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div id="orcamento" className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm defaultService={content.name} />
        </div>
      </section>
    </article>
  );
}
