import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/trabalhe-conosco")({
  beforeLoad: () => { throw redirect({ href: "https://alamoengenharia.pandape.infojobs.com.br/", statusCode: 302 }); },
  head: () => ({ meta: [
    { title: "Carreiras na Álamo Engenharia | Vagas e oportunidades" },
    { name: "description", content: "Consulte vagas e cadastre seu currículo no portal oficial de carreiras da Álamo Engenharia." },
    { property: "og:title", content: "Carreiras na Álamo Engenharia" },
    { property: "og:description", content: "Oportunidades profissionais no portal oficial de carreiras da Álamo Engenharia." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
});
