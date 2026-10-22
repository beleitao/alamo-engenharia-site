import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";

export const Route = createFileRoute("/obrigado")({
  validateSearch: (search: Record<string, unknown>) => ({
    tipo: typeof search["tipo"] === "string" ? (search["tipo"] as string) : "formulario",
  }),
  head: () => ({
    meta: [
      { title: "Obrigado pelo contato | Álamo Engenharia" },
      {
        name: "description",
        content: "Recebemos sua solicitação. Nossa equipe responde em até 1 dia útil.",
      },
      { property: "og:title", content: "Obrigado pelo contato | Álamo Engenharia" },
      { property: "og:description", content: "Recebemos sua solicitação com sucesso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  const { tipo } = Route.useSearch();

  useEffect(() => {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: "form_submit_success", form_type: tipo });
  }, [tipo]);

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center lg:py-32">
      <CheckCircle2 className="h-14 w-14 text-primary" />
      <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">Recebemos sua solicitação</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Obrigado pelo contato com a Álamo Engenharia. Sua mensagem foi encaminhada para o time
        responsável e retornamos em até 1 dia útil.
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        Referência: {tipo}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link to="/">Voltar para a home</Link>
        </Button>
        <Button
          asChild
          size="lg"
          className="border-transparent bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
        >
          <a href={waUrl(
                "Olá! Acabei de enviar uma solicitação pelo site da Álamo Engenharia e gostaria de agilizar o atendimento.",
              )} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="mr-2 h-4 w-4" /> Falar no WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}
