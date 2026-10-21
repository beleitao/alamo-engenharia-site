import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { waUrl } from "@/lib/site-data";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Álamo Engenharia" },
      {
        name: "description",
        content:
          "Fale com os setores da Álamo Engenharia: comercial, RH, suprimentos, financeiro, contabilidade, logística, qualidade e compliance.",
      },
      { property: "og:title", content: "Contato | Álamo Engenharia" },
      {
        property: "og:description",
        content: "Canais diretos com cada setor da Álamo Engenharia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://alamoengenharia.com.br/contato" },
    ],
    links: [{ rel: "canonical", href: "https://alamoengenharia.com.br/contato" }],
  }),
  component: Contato,
});

function Contato() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-[1fr_minmax(0,32rem)] lg:px-8 lg:py-20">
      <div>
        <p className="eyebrow text-primary">Fale conosco</p>
        <h1 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">
          Contato com todos os setores da Álamo
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Este canal atende assuntos gerais — RH, suprimentos, financeiro, contabilidade, logística,
          qualidade e compliance. Se sua necessidade é um orçamento de manutenção,{" "}
          <Link to="/orcamento" className="text-primary underline">
            use o formulário de orçamento
          </Link>
          .
        </p>

        <ul className="mt-10 space-y-5">
          <ContactItem icon={<Phone className="h-5 w-5" />} title="Matriz — Rio de Janeiro" text="(21) 3235-9900" />
          <ContactItem icon={<Phone className="h-5 w-5" />} title="Filial — São Paulo" text="(11) 3474-1000" />
          <ContactItem
            icon={<Mail className="h-5 w-5" />}
            title="E-mail"
            text="comercial@alamoengenharia.com.br"
          />
          <ContactItem
            icon={<WhatsAppIcon className="h-5 w-5" />}
            title="WhatsApp"
            text={
              <a href={waUrl(
                "Olá! Estou entrando em contato pelo site da Álamo Engenharia e gostaria de falar com um especialista.",
              )} target="_blank" rel="noopener noreferrer" className="underline">
                Iniciar conversa agora
              </a>
            }
          />
        </ul>
      </div>

      <ContactForm />
    </div>
  );
}

function ContactItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
}) {
  return (
    <li className="flex min-w-0 gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-secondary text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-sm font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">{text}</span>
      </span>
    </li>
  );
}
