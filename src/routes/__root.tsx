import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="surface-deep relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      <div className="grid-tech absolute inset-0" />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="eyebrow text-accent">Erro 404 · Página fora de operação</p>
        <h1 className="mt-4 font-display text-6xl font-extrabold leading-none sm:text-8xl">
          4<span className="text-gradient-accent">0</span>4
        </h1>
        <h2 className="mt-6 font-display text-xl font-bold sm:text-2xl">
          Essa página entrou em manutenção corretiva.
        </h2>
        <p className="mt-4 text-sm text-deep-foreground/80 sm:text-base">
          Nosso time inspecionou o endereço, abriu a ordem de serviço e não encontrou o ativo: o
          link pode ter sido desativado, movido ou digitado com um caractere a mais. A boa notícia é
          que o resto da operação segue 100% disponível.
        </p>

        <ul className="mx-auto mt-8 max-w-md space-y-2 text-left text-sm text-deep-foreground/70">
          <li className="border-l-2 border-accent pl-3">Diagnóstico: rota inexistente</li>
          <li className="border-l-2 border-accent pl-3">Criticidade: baixa — nenhum sistema afetado</li>
          <li className="border-l-2 border-accent pl-3">Ação recomendada: retornar ao início ou falar com a engenharia</li>
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar para o início
          </Link>
          <Link
            to="/servicos"
            className="inline-flex items-center justify-center rounded-md border border-deep-foreground/25 px-5 py-2.5 text-sm font-semibold text-deep-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Ver nossos serviços
          </Link>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center rounded-md border border-deep-foreground/25 px-5 py-2.5 text-sm font-semibold text-deep-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Falar com a engenharia
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo falhou do nosso lado. Você pode tentar de novo ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar de novo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Álamo Engenharia | Manutenção predial e infraestrutura" },
      {
        name: "description",
        content:
          "Engenharia de manutenção predial, HVAC, elétrica, hidráulica, obras civis e automação para operações corporativas e industriais.",
      },
      { name: "author", content: "Álamo Engenharia" },
      { property: "og:site_name", content: "Álamo Engenharia" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Álamo Engenharia",
          url: "https://alamoengenharia.com.br",
          description:
            "Manutenção predial, HVAC, elétrica, hidráulica, obras civis e automação para empresas.",
          areaServed: "BR",
          email: "comercial@alamoengenharia.com.br",
          telephone: "+55-21-3235-9900",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua da Passagem, 93",
            addressLocality: "Rio de Janeiro",
            addressRegion: "RJ",
            postalCode: "22290-030",
            addressCountry: "BR",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lift"
      >
        Ir para o conteúdo
      </a>
      <SiteHeader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingActions />
      <Toaster position="top-center" />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
