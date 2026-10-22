export type ObraContent = {
  slug: string;
  name: string;
  h1: string;
  sub: string;
  metaTitle: string;
  metaDescription: string;
  bullets: string[];
  paragraphs: string[];
};

const make = (
  slug: string,
  name: string,
  h1: string,
  sub: string,
  bullets: string[],
  paragraphs: string[],
): ObraContent => ({
  slug,
  name,
  h1,
  sub,
  metaTitle: `${name} | Álamo Engenharia`,
  metaDescription: sub,
  bullets,
  paragraphs,
});

export const OBRA_CONTENT: Record<string, ObraContent> = {
  "obras-civis": make(
    "obras-civis",
    "Obras Civis",
    "Obras civis executadas com a operação do cliente em funcionamento",
    "Reformas, ampliações e adequações civis em edifícios corporativos, galpões logísticos e plantas industriais, com planejamento por interferência e segurança do trabalho.",
    ["Cronograma por interferência com a operação", "Equipe própria e engenheiro responsável com ART", "Permissão de trabalho, APR e isolamento das frentes", "Entrega com as-built e atualização de plantas"],
    [
      "Executamos obras civis em ambientes ativos, onde parar a operação não é uma opção. O planejamento parte do mapa de interferências — acessos, ruído, poeira, desligamentos e janelas noturnas — e não apenas da sequência construtiva.",
      "Cada frente é acompanhada por medição física e financeira, diário de obra e relatório fotográfico, o que dá previsibilidade ao gestor de manutenção e evidência para auditoria.",
    ],
  ),
  "obras-eletricas": make(
    "obras-eletricas",
    "Obras Elétricas",
    "Obras elétricas planejadas para ampliar, modernizar e proteger a operação",
    "Implantação e adequação de circuitos, quadros, iluminação, distribuição e infraestrutura elétrica com equipe habilitada e documentação técnica.",
    ["Novos circuitos, quadros e alimentadores", "Iluminação e adequação de cargas", "Equipe habilitada em NR-10 e SEP", "ART, testes e as-built"],
    [
      "Cada intervenção começa pelo levantamento de cargas, condições da instalação e interferências com a operação. O cronograma organiza desligamentos e testes para reduzir riscos e indisponibilidade.",
      "A entrega reúne identificação, medições, documentação e atualização das plantas afetadas.",
    ],
  ),
  "obras-hidraulicas": make(
    "obras-hidraulicas",
    "Obras Hidráulicas",
    "Obras hidráulicas para redes confiáveis e operação contínua",
    "Implantação, substituição e adequação de redes de água, esgoto, águas pluviais, bombeamento e reservação em instalações corporativas e industriais.",
    ["Redes de água e esgoto", "Drenagem e águas pluviais", "Casas de bombas e reservatórios", "Testes de estanqueidade e as-built"],
    [
      "Planejamos substituições e ampliações considerando setorização, pressão, vazão, acesso para manutenção e continuidade do abastecimento.",
      "Testes e registros de entrega reduzem retrabalho e facilitam a futura gestão dos ativos hidráulicos.",
    ],
  ),
  "sistemas-de-incendio": make(
    "sistemas-de-incendio",
    "Sistemas de Incêndio",
    "Sistemas de incêndio implantados e adequados com responsabilidade técnica",
    "Obras em redes de hidrantes, sprinklers, bombas, detecção e alarme, sinalização e iluminação de emergência conforme projeto e requisitos aplicáveis.",
    ["Hidrantes, sprinklers e casas de bombas", "Detecção e alarme", "Sinalização e iluminação de emergência", "Testes, documentação e apoio técnico"],
    [
      "Coordenamos as interfaces civis, elétricas e hidráulicas do sistema para que a instalação corresponda ao projeto aprovado e permaneça acessível para inspeção e manutenção.",
      "A entrega inclui testes funcionais, registros e orientação para incorporação dos ativos ao plano de manutenção.",
    ],
  ),
  "reformas-corporativas": make(
    "reformas-corporativas",
    "Reformas Corporativas",
    "Reformas corporativas coordenadas do projeto à entrega",
    "Reconfiguração de escritórios, áreas operacionais e ambientes de atendimento, integrando arquitetura, elétrica, hidráulica, climatização e tecnologia.",
    ["Divisórias, forros, pisos e acabamentos", "Adequação de elétrica, dados e HVAC", "Execução faseada ou fora do expediente", "Gestão integrada das disciplinas"],
    [
      "Mudanças de layout exigem coordenação entre sistemas. Tratamos as interfaces em conjunto para evitar que o novo espaço nasça com pontos insuficientes, climatização desbalanceada ou infraestrutura sem acesso.",
      "O planejamento por etapas permite executar a reforma com menor impacto sobre equipes e clientes.",
    ],
  ),
  "adequacoes-tecnicas": make(
    "adequacoes-tecnicas",
    "Adequações Técnicas",
    "Adequações técnicas para conformidade, segurança e desempenho",
    "Correção de não conformidades apontadas em auditorias, laudos, vistorias e avaliações de risco, com priorização e documentação da solução.",
    ["Correção de não conformidades", "SPDA e proteção elétrica", "Acessibilidade e segurança", "Laudos, ART e atualização documental"],
    [
      "Transformamos recomendações de laudos e auditorias em um plano executivo com prioridades, orçamento, responsáveis e janelas de intervenção.",
      "A solução é entregue com evidências técnicas para facilitar inspeções, auditorias e controle do plano de ação.",
    ],
  ),
  retrofit: make(
    "retrofit",
    "Retrofit",
    "Retrofit predial: modernizar sem reconstruir",
    "Modernização, atualização tecnológica, revitalização e adequação de instalações prediais e industriais, com foco em desempenho, conformidade e valorização do ativo.",
    ["Modernização de instalações", "Atualização de sistemas elétricos e hidráulicos", "Eficiência energética", "Adequações normativas e requalificação de edificações"],
    [
      "Retrofit é decisão de ativo: substituir sistemas no fim da vida útil custa menos do que sustentar manutenção corretiva crescente em equipamentos obsoletos.",
      "Estruturamos o escopo a partir do histórico de falhas e do consumo energético, com payback estimado por pacote de intervenção.",
    ],
  ),
};

export function findObra(slug: string) {
  return OBRA_CONTENT[slug];
}
