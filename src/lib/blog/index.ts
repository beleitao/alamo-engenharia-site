import predial from "@/assets/blog-editorial-predial.webp";
import hvac from "@/assets/blog-editorial-hvac.webp";
import eletrica from "@/assets/blog-editorial-eletrica.webp";
import tecnologia from "@/assets/blog-editorial-tecnologia.webp";
import retrofit from "@/assets/blog-editorial-retrofit.jpg";
import gestao from "@/assets/blog-editorial-gestao.webp";
import pmoc from "@/assets/blog-pmoc-inspecao.webp";
import spda from "@/assets/blog-spda-inspecao.webp";
import type { BlogArticle, BlogArticleInput, BlogImageKey } from "./types";

// How to publish a new article: create one typed file per article under
// ./articles/<slug>.ts exporting `const article: BlogArticleInput = { ... }`,
// then add one import below and one entry in `articleModules`.
// (Static imports on purpose: automatic import.meta.glob is not resolved in
// the production server bundle, which left article pages 404 after publish.)
import pmocQualidadeArInterior from "./articles/pmoc-qualidade-ar-interior";
import quandoRevisarOSpda from "./articles/quando-revisar-o-spda";

const images: Record<BlogImageKey, string> = { predial, hvac, eletrica, tecnologia, retrofit, gestao, pmoc, spda };
const articleModules: Record<string, BlogArticleInput> = {
  [pmocQualidadeArInterior.slug]: pmocQualidadeArInterior,
  [quandoRevisarOSpda.slug]: quandoRevisarOSpda,
};
const today = () => new Date().toISOString();
const readingTime = (article: BlogArticleInput) => {
  const words = [article.title, article.description, ...article.body.flatMap((s) => [s.h, s.p, ...(s.paragraphs ?? []), ...(s.list ?? []), s.after ?? ""]), ...(article.checklist ?? []), article.cta]
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 180))} min`;
};

export const ALL_BLOG_POSTS: BlogArticle[] = Object.values(articleModules)
  .map((article) => ({
    ...article,
    image: images[article.imageKey],
    readingTime: readingTime(article),
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export function isPublishedArticle(article: BlogArticle, date = today()) {
  return article.status === "published" && new Date(article.date).getTime() <= new Date(date).getTime();
}

export const BLOG_POSTS = ALL_BLOG_POSTS.filter((article) => isPublishedArticle(article));
export const BLOG_CATEGORIES = Array.from(new Set(BLOG_POSTS.map((post) => post.category))).sort();
export const findPost = (slug: string) => BLOG_POSTS.find((post) => post.slug === slug);
