import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Cable,
  Cpu,
  Droplets,
  Fan,
  HardHat,
  ShieldCheck,
  Timer,
  Wrench,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";
import { SERVICES } from "@/lib/site-data";
import { blogPosts } from "@/lib/blog";
import { HeroCarousel } from "@/components/hero-carousel";
import { CoverageMap } from "@/components/coverage-map";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Álamo Engenharia - Manutenção preventiva e corretiva Predial, HVAC, civil, elétrica, hidráulica" },
      {
        name: "description",
        content:
          "Engenharia de manutenção predial, HVAC, elétrica, hidráulica, obras civis e automação para indústrias, condomínios e operações corporativas. SLA e atendimento nacional.",
      },
      {
        property: "og:title",
        content:
          "Álamo Engenharia - Manutenção preventiva e corretiva Predial, HVAC, civil, elétrica, hidráulica",
      },
      {
        property: "og:description",
        content:
          "Contratos de manutenção com SLA, equipe multidisciplinar e atendimento nacional para operações que não podem parar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://alamoengenharia.com.br/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/" }],
  }),
  component: Index,
});

const ICONS = [Building2, Fan, Zap, Cable, Droplets, HardHat, Cpu, Wrench];

const DIFERENCIAIS = [
  {
    icon: Timer,
    title: "SLA contratual medido",
    text: "Prazos por criticidade, com indicadores auditáveis em relatório mensal.",
  },
  {
    icon: ShieldCheck,
    title: "Conformidade técnica",
    text: "NR-10, NR-35, NBR 5410, NBR 5674 e PMOC com ART e laudos assinados.",
  },
  {
    icon: HardHat,
    title: "Equipe multidisciplinar",
    text: "Elétrica, HVAC, hidráulica, civil e automação sob um único contrato.",
  },
  {
    icon: Building2,
    title: "Atendimento nacional",
    text: "Times regionais e coordenação central para operações multi-site.",
  },
];

const NUMEROS = [
  { value: "+2.000", label: "ativos sob manutenção" },
  { value: "90,3%", label: "aderência média ao SLA" },
  { value: "56 anos", label: "de operação em campo" },
  { value: "+400", label: "contratos de manutenção ativos" },
  { value: "+20", label: "estados atendidos no Brasil" },
  { value: "+100", label: "cidades atendidas no Brasil" },
  { value: "24x7", label: "plantão para sistemas críticos" },
  { value: "+2.000", label: "colaboradores próprios em campo" },
];

function Index() {
  return (
    <>
      <HeroCarousel />

      <section className="border-b border-border bg-secondary/60">
        <dl className="mx-auto grid max-w-7xl place-items-center gap-8 px-4 py-10 text-center sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {NUMEROS.map((n) => (
            <div key={n.label} className="text-center">
              <dt className="font-display text-3xl font-extrabold text-primary">{n.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{n.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <p className="eyebrow text-primary">Expertises</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
          Todas as frentes de infraestrutura em um único contrato
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i] ?? Wrench;
            const card = (
              <div className="h-full rounded-lg border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-base font-semibold">{service.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
                {service.slug && (
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Ver soluções <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            );
            if (service.slug === "obras") {
              return <Link key={service.name} to="/obras">{card}</Link>;
            }
            if (service.slug === "retrofit") {
              return <Link key={service.name} to="/obras/$slug" params={{ slug: "retrofit" }}>{card}</Link>;
            }
            return (
              <Link key={service.name} to="/servicos/$slug" params={{ slug: service.slug }}>
                {card}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow text-primary">Diferenciais</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Por que operações críticas escolhem a Álamo
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {DIFERENCIAIS.map((d) => (
              <div key={d.title}>
                <d.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-display text-base font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,28rem)]">
          <div>
            <p className="eyebrow text-primary">Prova social</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Resultados que aparecem no relatório do gestor
            </h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  setor: "Indústria alimentícia · SP",
                  texto:
                    "Redução de 42% nas paradas não programadas de utilidades no primeiro ano de contrato preventivo.",
                },
                {
                  setor: "Rede de varejo · 8 estados",
                  texto:
                    "Padronização da manutenção de HVAC em 63 lojas, com abertura de chamados centralizada e SLA regional.",
                },
                {
                  setor: "Edifício corporativo AAA · SP",
                  texto:
                    "Economia de 21% no consumo elétrico da central de água gelada após comissionamento contínuo.",
                },
              ].map((c) => (
                <blockquote key={c.setor} className="border-l-2 border-accent pl-5">
                  <p className="text-sm leading-relaxed text-foreground/80">{c.texto}</p>
                  <footer className="mt-2 text-xs text-muted-foreground">{c.setor}</footer>
                </blockquote>
              ))}
            </div>

            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold">
                Engenharia de manutenção predial para empresas em todo o Brasil
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A Álamo Engenharia atua com manutenção predial corporativa, HVAC e ar condicionado,
                infraestrutura elétrica, redes hidráulicas, obras civis e automação eletrônica em
                plantas industriais, edifícios corporativos, condomínios de grande porte e
                operações multi-site. Cada contrato começa com diagnóstico dos ativos, definição de
                criticidade e plano de manutenção preventiva alinhado às normas técnicas
                brasileiras.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                O resultado é previsibilidade: menos chamados corretivos, menor consumo de energia,
                documentação técnica completa para auditorias e um orçamento anual sustentado por
                dados de campo, não por estimativas.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="surface-deep py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow text-accent">Conteúdo técnico</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Do blog da engenharia</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {blogPosts().slice(0, 4).map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group border-t border-deep-foreground/20 pt-5"
              >
                <span className="eyebrow text-accent">{post.category}</span>
                <h3 className="mt-3 font-display text-base font-semibold group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-deep-foreground/65">{post.readingTime} de leitura</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="presenca-nacional" className="bg-deep py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <CoverageMap />
        </div>
      </section>
    </>
  );
}
