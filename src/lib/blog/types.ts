export type BlogImageKey = "predial" | "hvac" | "eletrica" | "tecnologia" | "retrofit" | "gestao" | "pmoc" | "spda";

export type BlogSection = {
  h: string;
  p: string;
  paragraphs?: string[];
  list?: string[];
  after?: string;
};

export type BlogArticleInput = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: "draft" | "published";
  imageKey: BlogImageKey;
  imageAlt: string;
  body: BlogSection[];
  checklist?: string[];
  sources: string[];
  cta: string;
};

export type BlogArticle = BlogArticleInput & {
  image: string;
  readingTime: string;
};
