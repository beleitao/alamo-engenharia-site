import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OBRA_LINKS, SERVICE_LINKS } from "@/lib/nav-data";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/logo-cor.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<null | "servicos" | "obras">(null);
  const { t, tl } = useI18n();

  const LEFT_NAV = [
    { to: "/", label: t("nav.inicio") },
    { to: "/sobre", label: t("nav.sobre") },
    { to: "/cases", label: t("nav.cases") },
    { to: "/contato", label: t("nav.contato") },
  ] as const;

  const navLink =
    "text-sm font-medium text-muted-foreground transition-colors hover:text-primary";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="relative mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 lg:min-h-[92px] lg:px-8">
        <nav aria-label="Principal" className="hidden items-center gap-5 lg:flex">
          {LEFT_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={navLink}
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <a href="https://alamoengenharia.pandape.infojobs.com.br/" target="_blank" rel="noopener noreferrer" className={navLink}>{t("nav.trabalhe")}</a>
        </nav>

        {/* Logo centralizado: 70% no header, 30% vazando sobre o conteúdo */}
        <Link
          to="/"
          aria-label="Álamo Engenharia"
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2"
        >
          <span className="flex h-[96px] w-[110px] items-center justify-center rounded-b-2xl bg-background p-2 shadow-lift lg:h-[132px] lg:w-[152px]">
            <img
              src={logo}
              alt="Álamo Engenharia"
              className="max-h-full max-w-full object-contain"
              width={600}
              height={730}
            />
          </span>
        </Link>

        <nav aria-label="Serviços" className="ml-auto hidden items-center gap-5 lg:flex">
          {(
            [
              { id: "servicos" as const, label: t("nav.servicos"), base: "/servicos", items: SERVICE_LINKS },
              { id: "obras" as const, label: t("nav.obras"), base: "/obras", items: OBRA_LINKS },
            ]
          ).map((group) => (
            <div
              key={group.id}
              className="relative"
              onMouseEnter={() => setMenu(group.id)}
              onMouseLeave={() => setMenu(null)}
            >
              <Link
                to={group.base}
                className={`flex items-center gap-1 ${navLink}`}
                activeProps={{ className: "text-primary" }}
              >
                {group.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {menu === group.id && (
                <div className="absolute right-0 top-full z-40 w-64 pt-4">
                  <ul className="overflow-hidden rounded-md border border-border bg-card shadow-lift">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={group.id === "servicos" ? "/servicos/$slug" : "/obras/$slug"}
                          params={{ slug: item.slug }}
                          className="block border-b border-border/50 px-4 py-2.5 text-sm text-muted-foreground transition-colors last:border-0 hover:bg-secondary hover:text-primary"
                        >
                          {tl(item.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <Link to="/blog" className={navLink} activeProps={{ className: "text-primary" }}>
            {t("nav.blog")}
          </Link>

          <Button asChild size="sm">
            <Link to="/orcamento">{t("cta.orcamento")}</Link>
          </Button>

        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav aria-label="Menu" className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {LEFT_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <a href="https://alamoengenharia.pandape.infojobs.com.br/" target="_blank" rel="noopener noreferrer" className="border-b border-border/60 py-3 text-sm font-medium" onClick={() => setOpen(false)}>{t("nav.trabalhe")}</a>

            {[
              { label: t("nav.servicos"), to: "/servicos/$slug" as const, items: SERVICE_LINKS },
              { label: t("nav.obras"), to: "/obras/$slug" as const, items: OBRA_LINKS },
            ].map((group) => (
              <details key={group.label} className="border-b border-border/60">
                <summary className="cursor-pointer py-3 text-sm font-medium">{group.label}</summary>
                <ul className="pb-2">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={group.to}
                        params={{ slug: item.slug }}
                        onClick={() => setOpen(false)}
                        className="block py-2 pl-3 text-sm text-muted-foreground"
                      >
                        {tl(item.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}

            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm font-medium"
            >
              {t("nav.blog")}
            </Link>

            <div className="flex gap-2 pb-3">
              <Button asChild className="flex-1">
                <Link to="/orcamento" onClick={() => setOpen(false)}>
                  {t("cta.orcamento")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon" aria-label="Ligar para a Álamo Engenharia">
                <a href="tel:+552132359900">
                  <Phone className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
