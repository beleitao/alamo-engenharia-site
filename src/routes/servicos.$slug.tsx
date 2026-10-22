import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LeadForm } from "@/components/lead-form";
import { ReferenceList } from "@/components/reference-list";
import { SERVICE_CONTENT, type ServiceContent } from "@/lib/service-content";
import predial from "@/assets/predial.webp";
import hvac from "@/assets/hvac.webp";
import eletrica from "@/assets/eletrica.webp";
import telecom from "@/assets/telecom.webp";
import hidraulica from "@/assets/blog-hidraulica.webp";
import outras from "@/assets/blog-pintura-retrofit.webp";

const IMAGES: Record<string, string> = {
  "manutencao-predial": predial,
  "hvac-ar-condicionado": hvac,
  "infraestrutura-eletrica": eletrica,
  tecnologia: telecom,
  hidraulica,
  "outras-manutencoes": outras,
};

export const Route = createFileRoute("/servicos/$slug")({
  loader: ({ params }) => {
    const slug = params.slug === "telecom-conectividade" || params.slug === "automacao-eletronica" ? "tecnologia" : params.slug;
    const content = SERVICE_CONTENT[slug];
    if (!content) throw notFound();
    return { content };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Serviço não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData.content;
    return {
      meta: [
        { title: c.metaTitle },
        { name: "description", content: c.metaDescription },
        { property: "og:title", content: c.metaTitle },
        { property: "og:description", content: c.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://alamoengenharia.com.br/servicos/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `https://alamoengenharia.com.br/servicos/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { content } = Route.useLoaderData() as { content: ServiceContent };
  const image = IMAGES[content.slug];

  return (
    <article>
      <section className="surface-deep">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow text-accent">{content.name}</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {content.h1}
            </h1>
            <p className="mt-5 max-w-xl text-base text-deep-foreground/75">{content.sub}</p>
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
          {image && (
            <img
              src={image}
              alt={`Equipe Álamo Engenharia executando ${content.name.toLowerCase()}`}
              width={1280}
              height={860}
              className="rounded-lg object-cover shadow-lift"
            />
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Por que operações críticas escolhem a Álamo</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.benefits.map((b) => (
            <div key={b.title} className="rounded-lg border border-border bg-card p-6 shadow-card">
              <Check className="h-5 w-5 text-accent" />
              <h3 className="mt-4 font-display text-base font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Resultados em operações como a sua</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {content.useCases.map((u, i) => (
              <div key={u.title} className="border-l-2 border-accent pl-5">
                <span className="eyebrow text-muted-foreground">Caso {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1fr_minmax(0,26rem)] lg:px-8">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Perguntas frequentes</h2>
          <Accordion type="single" collapsible className="mt-6">
            {content.faq.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-display text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl">Sobre {content.name.toLowerCase()}</h2>
            {content.seoText.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          {content.deepDive && content.deepDive.length > 0 && (
            <div className="mt-12 space-y-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                O diferencial técnico que o cliente sente na operação
              </h2>
              {content.deepDive.map((d) => (
                <section key={d.h}>
                  <h3 className="font-display text-lg font-semibold">{d.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.p}</p>
                </section>
              ))}
            </div>
          )}

          {content.references && content.references.length > 0 && (
            <ReferenceList items={content.references} className="mt-12" />
          )}
        </div>



        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm defaultService={content.name} />
        </div>
      </section>
    </article>
  );
}