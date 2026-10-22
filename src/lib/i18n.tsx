import { createContext, useContext, type ReactNode } from "react";
import type { Lang, L10n } from "@/lib/nav-data";

const DICT = {
  "nav.inicio": { pt: "Início", en: "Home", es: "Inicio", zh: "首页" },
  "nav.sobre": { pt: "Sobre", en: "About", es: "Sobre", zh: "关于我们" },
  "nav.cases": { pt: "Cases", en: "Cases", es: "Casos", zh: "案例" },
  "nav.contato": { pt: "Contato", en: "Contact", es: "Contacto", zh: "联系我们" },
  "nav.trabalhe": { pt: "Trabalhe Conosco", en: "Careers", es: "Trabaje con Nosotros", zh: "加入我们" },
  "nav.servicos": { pt: "Serviços", en: "Services", es: "Servicios", zh: "服务" },
  "nav.obras": { pt: "Obras", en: "Projects", es: "Obras", zh: "工程" },
  "nav.blog": { pt: "Blog", en: "Blog", es: "Blog", zh: "博客" },
  "cta.orcamento": { pt: "Solicite seu Orçamento", en: "Request a Quote", es: "Solicite su Presupuesto", zh: "获取报价" },
  "cta.especialista": { pt: "Falar com um especialista", en: "Talk to a specialist", es: "Hablar con un especialista", zh: "联系专家" },
  "slogan": {
    pt: "Engenharia além da execução.",
    en: "Engineering beyond execution.",
    es: "Ingeniería más allá de la ejecución.",
    zh: "超越执行的工程。",
  },
  "footer.info": { pt: "Informações", en: "Information", es: "Información", zh: "信息" },
  "footer.servicos": { pt: "Serviços", en: "Services", es: "Servicios", zh: "服务" },
  "footer.obras": { pt: "Obras", en: "Projects", es: "Obras", zh: "工程" },
  "footer.governanca": { pt: "Governança", en: "Governance", es: "Gobernanza", zh: "治理" },
  "footer.legal": { pt: "Legal", en: "Legal", es: "Legal", zh: "法律" },
  "footer.colaboradores": { pt: "Área de Colaboradores", en: "Employee Area", es: "Área de Colaboradores", zh: "员工专区" },
  "footer.enderecos": { pt: "Nossos endereços", en: "Our offices", es: "Nuestras direcciones", zh: "办公地址" },
  "footer.cobertura": { pt: "Cobertura de atendimento", en: "Service coverage", es: "Cobertura de atención", zh: "服务覆盖" },
  "footer.mapsite": { pt: "Mapa do site", en: "Sitemap", es: "Mapa del sitio", zh: "网站地图" },
  "lang.notice": {
    pt: "",
    en: "Detailed technical content is published in Portuguese. We serve clients throughout Brazil and support international teams in English, Spanish and Chinese.",
    es: "El contenido técnico detallado se publica en portugués. Atendemos en todo Brasil y damos soporte a equipos internacionales en inglés, español y chino.",
    zh: "详细技术内容以葡萄牙语发布。我们服务于巴西全境，并可用英语、西班牙语和中文与国际团队沟通。",
  },
} satisfies Record<string, L10n>;

export type DictKey = keyof typeof DICT;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pt",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Language switching is temporarily paused until every page is translated.
  // Ignore previous saved choices to keep both SSR and returning visitors in Portuguese.
  const value = { lang: "pt" as const, setLang: (_language: Lang) => {} };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const { lang, setLang } = useContext(Ctx);
  const t = (key: DictKey) => DICT[key][lang];
  const tl = (value: L10n) => value[lang];
  return { lang, setLang, t, tl };
}
