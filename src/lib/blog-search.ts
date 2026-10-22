import { blogPosts } from "@/lib/blog";

export type BlogSearch = {
  category: string;
  period: string;
  order: string;
  q: string;
  year?: number;
  month?: number;
};

export const BLOG_DEFAULTS: BlogSearch = {
  category: "Todos",
  period: "all",
  order: "recent",
  q: "",
};

export const PERIODS = [
  { value: "all", label: "Todo o período" },
  { value: "3", label: "Últimos 3 meses" },
  { value: "6", label: "Últimos 6 meses" },
  { value: "12", label: "Últimos 12 meses" },
] as const;

export const ORDERS = [
  { value: "recent", label: "Mais recentes primeiro" },
  { value: "oldest", label: "Mais antigos primeiro" },
] as const;

const str = (v: unknown, fallback: string) => (typeof v === "string" && v ? v : fallback);
const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export function parseBlogSearch(search: Record<string, unknown>): Partial<BlogSearch> {
  const out: BlogSearch = {
    category: str(search["category"], BLOG_DEFAULTS.category),
    period: str(search["period"], BLOG_DEFAULTS.period),
    order: str(search["order"], BLOG_DEFAULTS.order),
    q: str(search["q"], BLOG_DEFAULTS.q),
  };
  const year = num(search["year"]);
  const month = num(search["month"]);
  if (year) out.year = year;
  if (month && month >= 1 && month <= 12) out.month = month;
  return cleanBlogSearch(out);
}

/** Aplica os valores padrão sobre os parâmetros presentes na URL. */
export function resolveBlogSearch(search: Partial<BlogSearch>): BlogSearch {
  return { ...BLOG_DEFAULTS, ...search };
}

/** Remove valores padrão da URL para manter links limpos. */
export function cleanBlogSearch(s: BlogSearch): Partial<BlogSearch> {
  const out: Partial<BlogSearch> = {};
  if (s.category !== BLOG_DEFAULTS.category) out.category = s.category;
  if (s.period !== BLOG_DEFAULTS.period) out.period = s.period;
  if (s.order !== BLOG_DEFAULTS.order) out.order = s.order;
  if (s.q) out.q = s.q;
  if (s.year) out.year = s.year;
  if (s.month) out.month = s.month;
  return out;
}

export function hasActiveFilters(s: BlogSearch) {
  return Object.keys(cleanBlogSearch({ ...s, order: BLOG_DEFAULTS.order })).length > 0;
}

export function filterBlogPosts(s: BlogSearch) {
  const cutoff =
    s.period === "all" ? null : new Date(Date.now() - Number(s.period) * 30 * 864e5).getTime();
  const q = s.q.trim().toLowerCase();

  return blogPosts().filter((p) => s.category === "Todos" || p.category === s.category)
    .filter((p) => (cutoff ? new Date(p.date).getTime() >= cutoff : true))
    .filter((p) => {
      if (!s.year && !s.month) return true;
      const d = new Date(p.date);
      if (s.year && d.getUTCFullYear() !== s.year) return false;
      if (s.month && d.getUTCMonth() + 1 !== s.month) return false;
      return true;
    })
    .filter((p) =>
      q ? `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(q) : true,
    )
    .sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
      return s.order === "recent" ? diff : -diff;
    });
}

export const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
