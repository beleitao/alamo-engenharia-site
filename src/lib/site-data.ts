
export const WHATSAPP_PHONE = "5511937157164";

/** Monta um link de WhatsApp com mensagem personalizada por página/assunto. */
export const waUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_URL = waUrl(
  "Olá! Gostaria de falar com um especialista da Álamo Engenharia sobre manutenção predial.",
);

export const SERVICES = [
  {
    slug: "manutencao-predial",
    name: "Manutenção Predial",
    short: "Técnicos residentes e volantes para manutenção preventiva, preditiva e corretiva.",
  },
  {
    slug: "hvac-ar-condicionado",
    name: "HVAC e Ar Condicionado",
    short: "Chillers, VRF, self contained, exaustão e climatização crítica com PMOC.",
  },
  {
    slug: "infraestrutura-eletrica",
    name: "Infraestrutura Elétrica",
    short: "Subestações, QGBTs, termografia, NR-10, NBR 5410 e NBR 14039.",
  },
  {
    slug: "hidraulica",
    name: "Hidráulica",
    short: "Redes hidrossanitárias, bombeamento, reservatórios e combate a incêndio.",
  },
  { slug: "obras", name: "Obras", short: "Obras civis, elétricas e hidráulicas, reformas e adequações técnicas." },
  { slug: "retrofit", name: "Retrofit", short: "Modernização tecnológica, eficiência energética e requalificação de edificações." },
  {
    slug: "tecnologia",
    name: "Tecnologia",
    short: "Automação, telecomunicações, conectividade, infraestrutura tecnológica e sistemas inteligentes.",
  },
  {
    slug: "outras-manutencoes",
    name: "Outras Manutenções",
    short: "Serviços sob demanda com equipe multidisciplinar e tabela contratada.",
  },
] as const;

export const SERVICE_OPTIONS = SERVICES.map((s) => s.name);
