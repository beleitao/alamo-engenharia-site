import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageBody } from "@/components/page-shell";
import esgHero from "@/assets/esg-hero.jpg";
import imgMeioAmbiente from "@/assets/sgi-meio-ambiente.jpg";
import imgSeguranca from "@/assets/sgi-seguranca.jpg";
import imgQualidade from "@/assets/sgi-qualidade.jpg";

export const Route = createFileRoute("/esg")({
  head: () => ({
    meta: [
      { title: "ESG | Álamo Engenharia" },
      { name: "description", content: "Programa ESG da Álamo Engenharia: gestão de resíduos e fluidos refrigerantes, eficiência energética, segurança das equipes, diversidade e integridade." },
      { property: "og:title", content: "ESG | Álamo Engenharia" },
      { property: "og:description", content: "Programa ESG da Álamo Engenharia: gestão de resíduos e fluidos refrigerantes, eficiência energética, segurança das equipes, diversidade e integridade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://alamoengenharia.com.br/esg" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/esg" }],
  }),
  component: EsgPage,
});

const BLOCOS = [
  {
    t: "Ambiental",
    img: imgMeioAmbiente,
    alt: "Colaboradores da Álamo Engenharia plantando árvores",
    p: [
      "Destinação correta de resíduos, lâmpadas, óleos e baterias, com manifesto de transporte e certificado de destinação em todos os contratos.",
      "Controle e recolhimento de fluidos refrigerantes conforme legislação, redução de consumo de energia e água e priorização de soluções de eficiência energética com payback estimado.",
    ],
  },
  {
    t: "Social",
    img: imgSeguranca,
    alt: "Treinamento de segurança com equipe técnica em campo",
    p: [
      "Segurança e saúde das equipes como valor inegociável: análise preliminar de risco, permissão de trabalho, EPIs e treinamento contínuo nas NRs aplicáveis.",
      "Formalização de 100% dos profissionais, desenvolvimento de mão de obra técnica local nas praças atendidas e programas de reconhecimento interno.",
    ],
  },
  {
    t: "Governança",
    img: imgQualidade,
    alt: "Reunião de governança e alinhamento de qualidade",
    p: [
      "Código de conduta, política anticorrupção, canal de denúncias independente e comitê de ética com prazo de apuração definido.",
      "Gestão e homologação de fornecedores, conformidade documental por contrato e indicadores revisados pela direção — associados ao Instituto Ethos desde 2022.",
    ],
  },
];

function EsgPage() {
  return (
    <article>
      <PageHero eyebrow="Governança" title="ESG na Álamo Engenharia" sub="Ambiental, social e governança aplicados à operação de manutenção: resíduos, eficiência energética, segurança das pessoas e integridade nos negócios." />

      <section className="mx-auto max-w-5xl px-4 pt-12 lg:px-8">
        <img
          src={esgHero}
          alt="Painéis solares e eficiência energética em operação mantida pela Álamo Engenharia"
          className="aspect-[16/6] w-full rounded-lg object-cover"
        />
      </section>

      <PageBody>
        {BLOCOS.map((b) => (
          <div key={b.t} className="not-prose mt-10 grid gap-6 md:grid-cols-[18rem_1fr] md:items-start">
            <img src={b.img} alt={b.alt} loading="lazy" className="h-44 w-full rounded-lg object-cover" />
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{b.t}</h2>
              {b.p.map((x) => (
                <p key={x.slice(0, 20)} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {x}
                </p>
              ))}
            </div>
          </div>
        ))}
      </PageBody>
    </article>
  );
}
