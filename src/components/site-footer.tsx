import { Link } from "@tanstack/react-router";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { OBRA_LINKS, OFFICES, SERVICE_LINKS, SGI_LINKS } from "@/lib/nav-data";
import { useI18n } from "@/lib/i18n";
import { NewsletterSignup } from "@/components/newsletter-signup";
import logoBranco from "@/assets/logo-branco.png";

export function SiteFooter() {
  const { t, tl } = useI18n();

  return (
    <footer className="surface-deep mt-24 pb-28 pt-16 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-14">
          <NewsletterSignup />
        </div>
        <div className="grid gap-10 lg:grid-cols-5">
          <div>
            <img
              src={logoBranco}
              alt="Álamo Engenharia"
              width={650}
              height={814}
              loading="lazy"
              className="mb-5 h-28 w-auto"
            />
            <p className="font-display text-lg font-bold">
              Álamo Engenharia - Manutenção Predial Preventiva e Corretiva
            </p>
            <p className="mt-3 max-w-xs text-sm text-deep-foreground/70">
              Engenharia de manutenção, infraestrutura predial e obras civis para operações
              corporativas e industriais em todo o Brasil.
            </p>
            <p className="mt-5 border-l-4 border-accent pl-3 font-display text-xl font-bold uppercase text-accent">
              {t("slogan")}
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-accent">{t("footer.info")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-deep-foreground/70">
              <li><Link to="/sobre" className="hover:text-accent">{t("nav.sobre")}</Link></li>
              <li><Link to="/cases" className="hover:text-accent">{t("nav.cases")}</Link></li>
              <li><Link to="/premiacoes" className="hover:text-accent">Premiações</Link></li>
              <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link to="/contato" className="hover:text-accent">{t("nav.contato")}</Link></li>
              <li><a href="https://alamoengenharia.pandape.infojobs.com.br/" className="hover:text-accent">{t("nav.trabalhe")}</a></li>
              <li><Link to="/orcamento" className="hover:text-accent">{t("cta.orcamento")}</Link></li>
              <li><Link to="/blog" className="hover:text-accent">{t("nav.blog")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-accent">{t("footer.servicos")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-deep-foreground/70">
              {SERVICE_LINKS.map((s) => (
                <li key={s.slug}>
                  <Link to="/servicos/$slug" params={{ slug: s.slug }} className="hover:text-accent">
                    {tl(s.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-accent">{t("footer.obras")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-deep-foreground/70">
              {OBRA_LINKS.map((o) => (
                <li key={o.slug}>
                  <Link to="/obras/$slug" params={{ slug: o.slug }} className="hover:text-accent">
                    {tl(o.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="eyebrow text-accent">{t("footer.governanca")}</h3>
              <ul className="mt-4 space-y-2 text-sm text-deep-foreground/70">
                <li>
                  <details className="group">
                    <summary className="cursor-pointer hover:text-accent">SGI</summary>
                    <ul className="mt-2 space-y-2 pl-3 text-deep-foreground/60">
                      {SGI_LINKS.map((s) => (
                        <li key={s.slug}>
                          <Link to="/sgi/$slug" params={{ slug: s.slug }} className="hover:text-accent">
                            {tl(s.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                <li><Link to="/esg" className="hover:text-accent">ESG</Link></li>
                <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
                <li><Link to="/servicos" className="hover:text-accent">{t("footer.servicos")}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="eyebrow text-accent">{t("footer.legal")}</h3>
              <ul className="mt-4 space-y-2 text-sm text-deep-foreground/70">
                <li><Link to="/politica-de-privacidade" className="hover:text-accent">Política de Privacidade</Link></li>
                <li><Link to="/canal-de-denuncias" className="hover:text-accent">Canal de Denúncias</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Endereços */}
        <div className="mt-14 border-t border-deep-foreground/10 pt-10">
          <h3 className="eyebrow text-accent">{t("footer.enderecos")}</h3>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o) => (
              <div key={o.cnpj} className="text-sm text-deep-foreground/70">
                <p className="flex items-center gap-2 font-display font-semibold text-deep-foreground">
                  <Building2 className="h-4 w-4 text-accent" /> {o.name}
                </p>
                <p className="mt-2 flex gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {o.address}
                    <br />
                    CEP {o.zip}
                  </span>
                </p>
                {o.phone && (
                  <p className="mt-2 flex gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    <a href={`tel:${o.tel}`} className="hover:text-accent">{o.phone}</a>
                  </p>
                )}
                <p className="mt-2 text-xs text-deep-foreground/45">CNPJ {o.cnpj}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-accent hover:underline"
                >
                  Ver no mapa
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 flex gap-2 text-sm text-deep-foreground/70">
            <Mail className="h-4 w-4 shrink-0 text-accent" /> comercial@alamoengenharia.com.br
          </p>
        </div>

        <div className="mt-12 border-t border-deep-foreground/10 pt-6 text-xs text-deep-foreground/50">
          © {new Date().getFullYear()} Álamo Engenharia - Manutenção Predial Preventiva e Corretiva.
          Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
