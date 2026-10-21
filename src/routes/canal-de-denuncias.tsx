import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageHero, PageBody } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/canal-de-denuncias")({
  head: () => ({
    meta: [
      { title: "Canal de Denúncias | Álamo Engenharia" },
      { name: "description", content: "Canal de denúncias da Álamo Engenharia: relate de forma confidencial ou anônima desvios de conduta, assédio, fraude ou descumprimento de normas." },
      { property: "og:title", content: "Canal de Denúncias | Álamo Engenharia" },
      { property: "og:description", content: "Canal de denúncias da Álamo Engenharia: relate de forma confidencial ou anônima desvios de conduta, assédio, fraude ou descumprimento de normas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://alamoengenharia.com.br/canal-de-denuncias" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/canal-de-denuncias" }],
  }),
  component: WhistleblowerPage,
});

function WhistleblowerPage() {
  return (
    <article>
      <PageHero eyebrow="Legal" title="Canal de Denúncias" sub="Espaço seguro, confidencial e — se você preferir — anônimo para relatar desvios de conduta, assédio, fraude ou descumprimento de normas." />
      <PageBody>
        <p>O canal está aberto a colaboradores, clientes, fornecedores e terceiros. Todos os relatos são tratados com confidencialidade e sem retaliação a quem reporta de boa-fé.</p>

        <div className="not-prose rounded-lg border border-border bg-card p-6 shadow-card">
          <p className="font-display text-base font-bold text-foreground">Registrar um relato</p>
          <p className="mt-2 text-sm text-muted-foreground">
            O registro é feito em plataforma independente, com sigilo garantido e possibilidade de
            anonimato.
          </p>
          <Button asChild size="lg" className="mt-5">
            <a href="https://egoeunaosou.com.br/fazer-denuncia/" target="_blank" rel="noopener noreferrer">
              Fazer Denúncia <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <h2 className="pt-4 font-display text-xl font-bold text-foreground">Outros canais</h2>
        <p>E-mail: <a className="text-primary underline" href="mailto:etica@alamoengenharia.com.br">etica@alamoengenharia.com.br</a> — Telefone: (21) 3235-9900. Você pode se identificar ou permanecer anônimo.</p>
        <h2 className="pt-4 font-display text-xl font-bold text-foreground">O que informar</h2>
        <p>Descreva o fato, data, local, pessoas envolvidas e, se possível, anexe evidências. Quanto mais objetivo o relato, mais efetiva a apuração.</p>
        <h2 className="pt-4 font-display text-xl font-bold text-foreground">Tratamento</h2>
        <p>Os relatos são analisados por um comitê interno, com plano de apuração, prazo definido e registro das medidas adotadas.</p>
      </PageBody>
    </article>
  );
}
