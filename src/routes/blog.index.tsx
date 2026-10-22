import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";
import { BlogSidebar } from "@/components/blog-sidebar";
import { formatBlogDate } from "@/lib/blog/format";
import {
  cleanBlogSearch,
  filterBlogPosts,
  hasActiveFilters,
  parseBlogSearch,
  resolveBlogSearch,
} from "@/lib/blog-search";

export const Route = createFileRoute("/blog/")({
  validateSearch: parseBlogSearch,
  head: () => ({
    meta: [
      { title: "Blog de Manutenção Predial, HVAC e Elétrica | Álamo Engenharia" },
      {
        name: "description",
        content:
          "Análises práticas de quem mantém mais de 2.000 ativos no Brasil: manutenção predial, HVAC, elétrica, hidráulica, obras e gestão de ativos — com as normas que sustentam cada decisão.",
      },
      { property: "og:title", content: "Blog Técnico | Álamo Engenharia" },
      {
        property: "og:description",
        content:
          "Conteúdo de engenharia de manutenção escrito por quem opera em campo, com referência normativa em cada artigo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://alamoengenharia.com.br/blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog Técnico | Álamo Engenharia" },
      { name: "twitter:description", content: "Conteúdo de engenharia de manutenção com referência normativa em cada artigo." },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/blog" }],
  }),
  component: BlogIndex,
});

function formatDate(date: string) {
  return `${formatBlogDate(date)} (Brasília)`;
}

function BlogIndex() {
  const search = resolveBlogSearch(Route.useSearch());
  const posts = filterBlogPosts(search);
  const filters = cleanBlogSearch(search);

  const featured =
    search.order === "recent" && !hasActiveFilters(search) ? posts[0] : undefined;
  const list = featured ? posts.slice(1) : posts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow text-primary">Inteligência de manutenção</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          O conhecimento que sustenta os contratos que não podem parar
        </h1>
        <p className="mt-4 text-muted-foreground">
          Aqui não há teoria genérica: são as decisões que nossos engenheiros tomam todos os dias em
          plantas industriais, hospitais, varejo e edifícios corporativos — com a norma que embasa
          cada uma delas, linkada para você conferir.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <BlogSidebar search={search} />

        <div>
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {posts.length} {posts.length === 1 ? "artigo encontrado" : "artigos encontrados"}
            {search.category !== "Todos" && ` em ${search.category}`}
          </p>

          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              search={filters}
              className="group mt-5 block overflow-hidden rounded-lg border border-border bg-card shadow-card transition-colors hover:border-primary"
            >
              <img
                src={featured.image}
                alt={featured.imageAlt}
                width={1280}
                height={720}
                className="aspect-[21/9] w-full object-cover"
              />
              <div className="p-6">
                <span className="eyebrow text-accent">Destaque · {featured.category}</span>
                <h2 className="mt-2 font-display text-2xl font-bold group-hover:text-primary">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{featured.description}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                  {formatDate(featured.date)} · {featured.readingTime} de leitura
                </p>
              </div>
            </Link>
          )}

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {list.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                search={filters}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:border-primary"
              >
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="eyebrow text-accent">{post.category}</span>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Ler artigo <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="mt-8 rounded-lg border border-dashed border-border p-10 text-center">
              <p className="font-display font-semibold">Nenhum artigo com esses filtros</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ajuste a categoria ou o período — ou fale direto com nossos engenheiros.
              </p>
              <Button
                asChild
                size="sm"
                className="mt-5 border-transparent bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
              >
                <a
                  href={waUrl(
                    "Olá! Vim pelo blog da Álamo Engenharia e gostaria de falar com um especialista.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="mr-2 h-4 w-4" /> Falar com um especialista
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
