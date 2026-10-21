import { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog";
import {
  type BlogSearch,
  BLOG_DEFAULTS,
  ORDERS,
  PERIODS,
  cleanBlogSearch,
  hasActiveFilters,
} from "@/lib/blog-search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BlogSidebar({ search, className = "" }: { search: BlogSearch; className?: string }) {
  const navigate = useNavigate();

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of BLOG_POSTS) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  const update = (patch: Partial<BlogSearch>) => {
    void navigate({ to: "/blog", search: cleanBlogSearch({ ...search, ...patch }) });
  };

  const active = hasActiveFilters(search);

  return (
    <aside className={`${className} lg:sticky lg:top-24 lg:self-start`} aria-label="Filtros do blog">
      <div className="rounded-lg border border-border bg-card p-5 shadow-card">
        <label htmlFor="blog-busca" className="eyebrow text-muted-foreground">
          Buscar
        </label>
        <div className="relative mt-2">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="blog-busca"
            defaultValue={search.q}
            key={search.q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Ex.: termografia, PMOC"
            className="pl-9"
          />
        </div>

        <h2 className="eyebrow mt-6 text-muted-foreground">Categorias</h2>
        <ul className="mt-3 space-y-1">
          {["Todos", ...BLOG_CATEGORIES].map((c) => {
            const isActive = c === search.category;
            const n = c === "Todos" ? BLOG_POSTS.length : (counts.get(c) ?? 0);
            return (
              <li key={c}>
                <Button
                  type="button"
                  variant="ghost"
                  aria-pressed={isActive}
                  onClick={() => update({ category: c })}
                  className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span>{c}</span>
                  <span className={isActive ? "text-primary-foreground/80" : "text-xs"}>{n}</span>
                </Button>
              </li>
            );
          })}
        </ul>

        <h2 className="eyebrow mt-6 text-muted-foreground">Período</h2>
        <div className="mt-2">
          <Select value={search.period} onValueChange={(v) => update({ period: v })}>
            <SelectTrigger aria-label="Filtrar por período">
              <SelectValue>{PERIODS.find((p) => p.value === search.period)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {PERIODS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <h2 className="eyebrow mt-6 text-muted-foreground">Ordenar</h2>
        <div className="mt-2">
          <Select value={search.order} onValueChange={(v) => update({ order: v })}>
            <SelectTrigger aria-label="Ordenar artigos">
              <SelectValue>{ORDERS.find((o) => o.value === search.order)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {ORDERS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {active && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-5 w-full text-muted-foreground"
            onClick={() =>
              void navigate({
                to: "/blog",
                search: cleanBlogSearch({ ...BLOG_DEFAULTS, order: search.order }),
              })
            }
          >
            <X className="mr-1.5 h-3.5 w-3.5" /> Limpar filtros
          </Button>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-border surface-deep p-5">
        <p className="font-display text-sm font-semibold">Quer esse nível de rigor no seu contrato?</p>
        <p className="mt-2 text-xs text-deep-foreground/70">
          Diagnóstico técnico sem custo com um engenheiro da Álamo.
        </p>
        <Button asChild size="sm" className="mt-4 w-full">
          <Link to="/orcamento">Solicitar orçamento</Link>
        </Button>
      </div>
    </aside>
  );
}
