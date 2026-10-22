export type Lang = "pt" | "en" | "es" | "zh";
export type L10n = Record<Lang, string>;

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "pt", label: "Português (BR)", short: "PT" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "zh", label: "中文", short: "中文" },
];

export const SERVICE_LINKS: { slug: string; label: L10n }[] = [
  { slug: "manutencao-predial", label: { pt: "Manutenção Predial", en: "Building Maintenance", es: "Mantenimiento Predial", zh: "楼宇维护" } },
  { slug: "hvac-ar-condicionado", label: { pt: "HVAC e Ar Condicionado", en: "HVAC & Air Conditioning", es: "HVAC y Aire Acondicionado", zh: "暖通空调" } },
  { slug: "infraestrutura-eletrica", label: { pt: "Infraestrutura Elétrica", en: "Electrical Infrastructure", es: "Infraestructura Eléctrica", zh: "电气基础设施" } },
  { slug: "hidraulica", label: { pt: "Hidráulica", en: "Plumbing & Hydraulics", es: "Hidráulica", zh: "给排水系统" } },
  { slug: "outras-manutencoes", label: { pt: "Outras Manutenções", en: "Other Maintenance", es: "Otros Mantenimientos", zh: "其他维护服务" } },
  { slug: "tecnologia", label: { pt: "Tecnologia", en: "Technology", es: "Tecnología", zh: "技术" } },
];

export const OBRA_LINKS: { slug: string; label: L10n }[] = [
  { slug: "obras-civis", label: { pt: "Obras Civis", en: "Civil Works", es: "Obras Civiles", zh: "土建工程" } },
  { slug: "obras-eletricas", label: { pt: "Obras Elétricas", en: "Electrical Works", es: "Obras Eléctricas", zh: "电气工程" } },
  { slug: "obras-hidraulicas", label: { pt: "Obras Hidráulicas", en: "Hydraulic Works", es: "Obras Hidráulicas", zh: "给排水工程" } },
  { slug: "sistemas-de-incendio", label: { pt: "Sistemas de Incêndio", en: "Fire Systems", es: "Sistemas Contra Incendios", zh: "消防系统" } },
  { slug: "reformas-corporativas", label: { pt: "Reformas Corporativas", en: "Corporate Renovations", es: "Reformas Corporativas", zh: "企业空间改造" } },
  { slug: "adequacoes-tecnicas", label: { pt: "Adequações Técnicas", en: "Technical Adaptations", es: "Adecuaciones Técnicas", zh: "技术改造" } },
  { slug: "retrofit", label: { pt: "Retrofit", en: "Retrofit", es: "Retrofit", zh: "改造升级" } },
];

export const SGI_LINKS: { slug: string; label: L10n }[] = [
  { slug: "certificacoes", label: { pt: "Certificações", en: "Certifications", es: "Certificaciones", zh: "认证体系" } },
  { slug: "meio-ambiente", label: { pt: "Meio Ambiente", en: "Environment", es: "Medio Ambiente", zh: "环境" } },
  { slug: "qualidade", label: { pt: "Qualidade", en: "Quality", es: "Calidad", zh: "质量" } },
  { slug: "seguranca-e-saude", label: { pt: "Segurança e Saúde", en: "Health & Safety", es: "Seguridad y Salud", zh: "职业健康与安全" } },
];

export const COLLABORATOR_LINKS = [
  { label: "MTE", desc: "Marcação e gestão de ponto eletrônico" },
  { label: "Service Desk", desc: "Abertura e acompanhamento de chamados internos" },
  { label: "Álamo Informa", desc: "Comunicados oficiais e informativos internos" },
  { label: "Álamo Encanta", desc: "Programa de reconhecimento e cultura" },
  { label: "Webmail", desc: "Acesso ao e-mail corporativo" },
  { label: "Como solicitar um veículo", desc: "Procedimento de reserva da frota" },
  { label: "Como enviar um orçamento", desc: "Fluxo comercial e modelos de proposta" },
  { label: "Como fazer pedido de compras", desc: "Requisição e aprovação de suprimentos" },
  { label: "Reembolso de despesas", desc: "Prestação de contas e prazos" },
  { label: "Treinamentos e NRs", desc: "Calendário e certificados da equipe" },
];

export const OFFICES = [
  {
    name: "Rio de Janeiro / Matriz",
    cnpj: "34.125.294/0001-08",
    address: "Rua da Passagem, 93 — Botafogo, Rio de Janeiro/RJ",
    zip: "22290-030",
    phone: "(21) 3235-9900",
    tel: "+552132359900",
  },
  {
    name: "São Paulo / Filial",
    cnpj: "34.125.294/0009-57",
    address: "Rua Araquã, 44 — Bela Vista, São Paulo/SP",
    zip: "01306-020",
    phone: "(11) 3474-1000",
    tel: "+551134741000",
  },
  {
    name: "Belo Horizonte / Filial",
    cnpj: "34.125.294/0015-03",
    address: "Rua Rio Claro, 184, Sala 302 — Prado, Belo Horizonte/MG",
    zip: "30411-148",
    phone: null,
    tel: null,
  },
  {
    name: "Espírito Santo / Filial",
    cnpj: "34.125.294/0013-33",
    address: "Rua Moacir Saudino, 300, Box 258 — Centro, Alfredo Chaves/ES",
    zip: "29240-000",
    phone: null,
    tel: null,
  },
] as const;
