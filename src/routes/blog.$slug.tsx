import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findPost } from "@/lib/blog";
import { ReferenceList } from "@/components/reference-list";
import { BlogSidebar } from "@/components/blog-sidebar";
import { ArticleShare } from "@/components/article-share";
import { ArticleTts } from "@/components/article-tts";
import { formatBlogDate } from "@/lib/blog/format";
import {
  MONTH_NAMES,
  cleanBlogSearch,
  parseBlogSearch,
  resolveBlogSearch,
} from "@/lib/blog-search";

type Post = NonNullable<ReturnType<typeof findPost>>;

export const Route = createFileRoute("/blog/$slug")({
  validateSearch: parseBlogSearch,
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artigo não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    const url = `https://alamoengenharia.com.br/blog/${params.slug}`;
    return {
      meta: [
        { title: `${p.title} | Álamo Engenharia` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: p.date },
        { property: "article:section", content: p.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.date,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: { "@type": "Organization", name: "Álamo Engenharia" },
            publisher: { "@type": "Organization", name: "Álamo Engenharia", url: "https://alamoengenharia.com.br" },
          }),
        },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData() as { post: Post };
  const search = resolveBlogSearch(Route.useSearch());

  const date = new Date(post.date);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const narration = [
    post.title,
    post.description,
    ...post.body.flatMap((section) => [section.h, section.p, ...(section.paragraphs ?? []), ...(section.list ?? []), section.after ?? ""]),
    ...(post.checklist?.length ? ["Checklist", ...post.checklist] : []),
    post.cta,
  ].join("\n");

  const { month: _omitMonth, ...withoutMonth } = search;
  const crumbLink = "text-muted-foreground transition-colors hover:text-primary";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <nav aria-label="Trilha de navegação" className="text-xs sm:text-sm">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to="/blog" search={cleanBlogSearch(search)} className={crumbLink}>
              Blog
            </Link>
          </li>
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground/60" />
          <li>
            <Link
              to="/blog"
              search={cleanBlogSearch({ ...search, category: post.category })}
              className={crumbLink}
            >
              {post.category}
            </Link>
          </li>
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground/60" />
          <li>
            <Link
              to="/blog"
              search={cleanBlogSearch({ ...withoutMonth, category: post.category, year })}
              className={crumbLink}
            >
              {year}
            </Link>
          </li>
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground/60" />
          <li>
            <Link
              to="/blog"
              search={cleanBlogSearch({ ...search, category: post.category, year, month })}
              className={crumbLink}
            >
              {MONTH_NAMES[month - 1]}
            </Link>
          </li>
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-foreground/60" />
          <li aria-current="page" className="max-w-full truncate font-medium text-foreground">
            {post.title}
          </li>
        </ol>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <BlogSidebar search={search} className="order-2 lg:order-1" />

        <article className="order-1 max-w-3xl lg:order-2">
          <p className="eyebrow text-accent">{post.category}</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatBlogDate(post.date)} (Brasília)</time> · {post.readingTime} de leitura
          </p>
          <div className="mt-5">
            <ArticleShare title={post.title} slug={post.slug} />
          </div>
          <ArticleTts text={narration} />
          <img
            src={post.image}
            alt={post.imageAlt}
            width={1280}
            height={720}
            className="mt-8 aspect-[16/9] w-full rounded-lg object-cover"
          />

          <p className="mt-8 text-lg leading-relaxed text-foreground/80">{post.description}</p>

          <nav className="mt-10 border-l-2 border-primary pl-5" aria-label="Neste artigo">
            <p className="eyebrow text-muted-foreground">Neste artigo</p>
            <ol className="mt-3 space-y-2 text-sm">
              {post.body.map((section, index) => (
                <li key={section.h}>
                  <a href={`#secao-${index + 1}`} className="text-muted-foreground transition-colors hover:text-primary">
                    {section.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 space-y-10">
            {post.body.map((section) => (
              <section key={section.h} id={`secao-${post.body.indexOf(section) + 1}`} className="scroll-mt-28">
                <h2 className="font-display text-xl font-bold">{section.h}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{section.p}</p>
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">{paragraph}</p>)}
                {section.list && <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">{section.list.map((item) => <li key={item} className="leading-relaxed">{item}</li>)}</ul>}
                {section.after && <p className="mt-4 leading-relaxed text-muted-foreground">{section.after}</p>}
              </section>
            ))}
          </div>

          {post.checklist && post.checklist.length > 0 && (
            <section className="mt-12 border-y border-border py-8" aria-labelledby="checklist-artigo">
              <h2 id="checklist-artigo" className="font-display text-xl font-bold">Checklist para o gestor</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {post.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-primary text-xs font-bold text-primary-foreground">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {"sources" in post && post.sources.length > 0 && (
            <ReferenceList
              items={post.sources}
              title="Referências normativas e técnicas"
              note="Cada afirmação deste artigo tem origem verificável. Os links abrem em nova aba."
              className="mt-12"
            />
          )}

          <div className="mt-14 rounded-lg border border-border bg-secondary/60 p-8 text-center">
            <h2 className="font-display text-xl font-bold">
              Quer esse mesmo rigor cuidando da sua operação?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {post.cta}
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/orcamento">Solicitar orçamento</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
