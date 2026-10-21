export type ServiceContent = {
  slug: string;
  name: string;
  h1: string;
  sub: string;
  metaTitle: string;
  metaDescription: string;
  benefits: { title: string; text: string }[];
  useCases: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  seoText: string[];
  deepDive?: { h: string; p: string }[];
  references?: string[];
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "manutencao-predial": {
    slug: "manutencao-predial",
    name: "Manutenção Predial",
    h1: "Manutenção predial corporativa sem paradas não programadas",
    sub: "Somos referência nacional em manutenção predial: técnicos próprios — residentes ou volantes — que conhecem sua planta pelo nome. Preventiva, preditiva e corretiva sob SLA contratual, com evidência técnica de cada intervenção e um engenheiro respondendo por você.",
    metaTitle: "Manutenção Predial Corporativa | Álamo Engenharia",
    metaDescription:
      "Manutenção predial preventiva, preditiva e corretiva para empresas, indústrias e condomínios. Técnicos próprios, SLA contratual, plano por ativo conforme ABNT NBR 5674 e relatórios técnicos mensais.",
    benefits: [
      { title: "SLA contratual medido", text: "Prazos de atendimento e de solução definidos por criticidade do ativo, apurados chamado a chamado e publicados em relatório mensal." },
      { title: "Técnicos próprios multidisciplinares", text: "Eletricistas, mecânicos de refrigeração, encanadores, técnicos de automação e oficiais de manutenção civil sob um único contrato e um único responsável técnico." },
      { title: "Plano de manutenção por ativo", text: "Periodicidade definida por manual do fabricante, criticidade e norma técnica, formalizada em programa e checklists digitais, como orienta a ABNT NBR 5674." },
      { title: "Rastreabilidade documental", text: "Ordens de serviço, ART, laudos, as-built e histórico de falhas organizados para auditoria, seguro e renovação de licenças." },
    ],
    useCases: [
      { title: "Edifício corporativo multiandar", text: "Equipe residente cobrindo elétrica, hidráulica, climatização e reparos civis, com atendimento em minutos e rondas técnicas diárias registradas." },
      { title: "Planta industrial", text: "Manutenção de utilidades e infraestrutura de apoio à produção, com janelas programadas fora do turno produtivo e análise de causa raiz das falhas recorrentes." },
      { title: "Rede de lojas e filiais", text: "Time volante nacional, abertura de chamados em canal único, padronização de procedimentos e SLA diferenciado por região e criticidade." },
    ],
    faq: [
      { q: "Qual a diferença entre manutenção preventiva, preditiva e corretiva?", a: "A ABNT NBR 5674 e a literatura de engenharia de manutenção classificam a rotina em: preventiva (calendário ou uso definidos por norma e fabricante), preditiva (baseada em medição de condição — termografia, vibração, análise de óleo, ultrassom) e corretiva (após a falha). Programas maduros combinam as três, com predominância das duas primeiras, exatamente como propõe a metodologia RCM formalizada na SAE JA1011 e na IEC 60300-3-11." },
      { q: "Contratar manutenção preventiva realmente reduz custo?", a: "A norma ABNT NBR 5674 estabelece a manutenção como obrigação de gestão da edificação justamente porque a intervenção planejada evita a degradação acelerada e a falha em cascata. Na prática do contrato, o efeito mensurável aparece na queda do volume de corretivas emergenciais e no aumento da disponibilidade dos sistemas críticos — números que reportamos mês a mês para o seu caso específico, sem promessa de percentual genérico." },
      { q: "Vocês atendem fora do horário comercial?", a: "Sim. Trabalhamos em regimes 8x5, 12x6 e 24x7, com plantão de emergência para sistemas críticos e escalonamento técnico definido em contrato." },
      { q: "Como é feita a medição do SLA?", a: "Cada chamado registra data e hora de abertura, de atendimento em campo e de solução definitiva. O relatório mensal apresenta a aderência por faixa de criticidade, os desvios e a análise de causa, junto de indicadores clássicos de manutenção como MTBF, MTTR e disponibilidade." },
      { q: "Quais normas são seguidas?", a: "ABNT NBR 5674 (manutenção de edificações), NBR 14037 (manual de uso, operação e manutenção), NBR 16747 (inspeção predial), NBR 15575 (desempenho e vida útil de projeto), NBR 5410 e NBR 14039 com a NR-10 na frente elétrica, NBR 13971 e NBR 16401 com a Lei 13.589/2018 na climatização, além das NRs de segurança aplicáveis (NR-10, NR-12, NR-33, NR-35)." },
      { q: "Vocês assumem a manutenção de um parque já degradado?", a: "Sim. O contrato começa por inventário e inspeção predial no espírito da NBR 16747, com classificação de anomalias por grau de risco e um plano de recuperação priorizado antes de estabilizar a rotina preventiva." },
    ],
    seoText: [
      "Manutenção predial não é o conserto do que quebrou: é a gestão do ciclo de vida de cada sistema da edificação. A ABNT NBR 5674 define manutenção como o conjunto de atividades a serem realizadas para conservar ou recuperar a capacidade funcional da edificação e de suas partes constituintes — e atribui ao proprietário ou ao responsável pelo uso o dever de implantar um programa formal, com previsão de recursos, registros e responsável técnico. Isso muda a natureza da conversa: o plano de manutenção é uma obrigação técnica documentada, não uma linha de custo discricionária.",
      "A ABNT NBR 15575 introduziu no Brasil o conceito de vida útil de projeto, sempre condicionada à execução da manutenção prevista. Ou seja: a durabilidade esperada de revestimentos, impermeabilizações, instalações elétricas e hidrossanitárias só se sustenta se as intervenções periódicas descritas no manual de uso, operação e manutenção — normalizado pela ABNT NBR 14037 — forem efetivamente executadas e registradas. Sem esse registro, a discussão de garantia, seguro e responsabilidade técnica fica sem lastro.",
      "A Álamo opera esse ciclo com técnicos próprios de manutenção predial, HVAC, elétrica e hidráulica alocados no contrato — modelo diferente da terceirização de serviços de conservação. O foco é engenharia de manutenção: inventário e criticidade dos ativos, plano preventivo por equipamento, inspeção preditiva, análise de falhas e recomendação de investimento. Serviços de obra sob demanda — SPDA, termografia, retrofit, pintura, ajustes de layout e subestações — são acionados dentro do mesmo contrato quando o diagnóstico aponta necessidade.",
    ],
    deepDive: [
      {
        h: "Inventário, criticidade e o que realmente entra no plano",
        p: "O primeiro entregável de um contrato sério é o cadastro técnico dos ativos: identificação, localização, dados de placa, fabricante, ano, condição atual e criticidade para o negócio. A criticidade combina impacto da falha (segurança, receita, imagem, conformidade legal) com probabilidade e detectabilidade — a mesma lógica da análise de modos e efeitos de falha (FMEA) consolidada na IEC 60812. É esse ranking, e não a rotina herdada da administração anterior, que define quais equipamentos merecem preventiva mensal, quais entram em monitoramento por condição e quais podem operar até a falha com baixo impacto.",
      },
      {
        h: "Manutenção centrada em confiabilidade aplicada a edificações",
        p: "A RCM (Reliability Centered Maintenance), estruturada originalmente no setor aeronáutico e formalizada pela SAE JA1011 e pela IEC 60300-3-11, pergunta para cada ativo: quais funções ele exerce, como pode falhar, quais são as consequências e qual tarefa proativa é tecnicamente aplicável e vale a pena. Trazida para a edificação, a RCM evita os dois extremos caros: o excesso de preventiva em ativos irrelevantes e a ausência de qualquer monitoramento em ativos que param a operação.",
      },
      {
        h: "Indicadores que sustentam o orçamento anual",
        p: "Disponibilidade, MTBF (tempo médio entre falhas), MTTR (tempo médio de reparo), backlog de manutenção, relação entre horas preventivas e corretivas e custo de manutenção por metro quadrado são as métricas que permitem defender orçamento com dado, e não com percepção. A norma ABNT NBR ISO 55001, de gestão de ativos, formaliza esse encadeamento entre objetivos do negócio, plano de gestão de ativos e evidência de desempenho — é o arcabouço que usamos na estruturação dos relatórios mensais.",
      },
      {
        h: "Inspeção predial como fotografia inicial e periódica",
        p: "A ABNT NBR 16747 normalizou a inspeção predial no Brasil: uma avaliação sistêmica das condições técnicas, de uso e de manutenção da edificação, com classificação de anomalias e falhas por grau de risco e recomendação de prioridades. Utilizamos a inspeção como marco zero do contrato e como revisão periódica do plano, o que dá ao gestor um documento técnico defensável perante seguradora, condomínio, conselho ou matriz.",
      },
    ],
    references: [
      "ABNT NBR 5674:2012 — Manutenção de edificações: requisitos para o sistema de gestão de manutenção",
      "ABNT NBR 14037:2014 — Diretrizes para elaboração de manuais de uso, operação e manutenção das edificações",
      "ABNT NBR 15575:2013 — Edificações habitacionais: desempenho e vida útil de projeto",
      "ABNT NBR 16747:2020 — Inspeção predial: diretrizes, conceitos, terminologia e procedimento",
      "ABNT NBR ISO 55001:2014 — Gestão de ativos: sistemas de gestão — requisitos",
      "SAE JA1011 e IEC 60300-3-11 — Critérios e aplicação da manutenção centrada em confiabilidade (RCM)",
      "IEC 60812 — Análise de modos de falha e efeitos (FMEA/FMECA)",
    ],
  },
  "hvac-ar-condicionado": {
    slug: "hvac-ar-condicionado",
    name: "HVAC e Ar Condicionado",
    h1: "HVAC corporativo com eficiência energética e PMOC em dia",
    sub: "Climatização é o maior consumidor de energia do seu prédio e o primeiro a derrubar a operação. Cuidamos de chillers, VRF, self contained, fancoils, dutos e exaustão com PMOC em dia, ar interior sob controle e economia que aparece na conta de luz.",
    metaTitle: "Manutenção HVAC e Ar Condicionado Corporativo | Álamo Engenharia",
    metaDescription:
      "Manutenção de HVAC e ar condicionado corporativo: chillers, VRF, self contained e exaustão. PMOC conforme Lei 13.589/2018, eficiência energética e plantão 24x7 para ambientes críticos.",
    benefits: [
      { title: "Consumo sob controle", text: "Ajuste de setpoints, limpeza de trocadores, análise de vazão e comissionamento contínuo — com medição antes e depois, sem promessa de percentual genérico." },
      { title: "PMOC dentro da lei", text: "Plano de Manutenção, Operação e Controle com responsável técnico, execução registrada e documentação disponível para fiscalização, conforme a Lei 13.589/2018." },
      { title: "Ambientes críticos", text: "Data centers, salas técnicas, laboratórios e ambientes assistenciais com redundância verificada, plantão 24x7 e peças críticas mapeadas." },
      { title: "Gestão de fluido refrigerante", text: "Controle de vazamentos, recolhimento e destinação conforme legislação ambiental e compromissos do Protocolo de Montreal e da Emenda de Kigali." },
    ],
    useCases: [
      { title: "Central de água gelada", text: "Operação assistida de chillers, torres e bombas com telemetria, análise de eficiência em kW/TR e plano de comissionamento contínuo." },
      { title: "Data center", text: "Climatização de precisão com contingência testada, controle de temperatura e umidade nas faixas recomendadas pela ASHRAE TC 9.9 e resposta a incidentes em minutos." },
      { title: "Parque de VRF distribuído", text: "Rede de unidades em múltiplas filiais com procedimento padronizado, inventário por equipamento e histórico consolidado nacionalmente." },
    ],
    faq: [
      { q: "O PMOC é obrigatório para minha empresa?", a: "A Lei Federal 13.589/2018 tornou obrigatório o Plano de Manutenção, Operação e Controle para edifícios de uso público e coletivo climatizados artificialmente. O plano precisa de responsável técnico habilitado, registro das atividades executadas e disponibilidade permanente para fiscalização sanitária." },
      { q: "Qual a relação entre manutenção de HVAC e qualidade do ar interior?", a: "Direta. A Portaria GM/MS 3.523/1998 e a Resolução ANVISA RE 09/2003 estabelecem procedimentos de limpeza, padrões referenciais de qualidade do ar em ambientes climatizados e a necessidade de renovação de ar adequada. Filtros saturados, serpentinas sujas, bandejas com acúmulo de água e tomada de ar externo bloqueada degradam simultaneamente eficiência energética e salubridade." },
      { q: "Com que frequência limpar filtros e serpentinas?", a: "A periodicidade correta depende de classe de filtragem, carga térmica, ocupação e qualidade do ar externo — e deve ser definida no PMOC. Como referência de partida, o padrão de inspeção e manutenção da ASHRAE Standard 180 orienta rotinas por tipo de componente, ajustadas depois pelo comportamento medido em campo." },
      { q: "Vocês fazem retrofit de sistemas antigos?", a: "Sim. Avaliamos carga térmica atual (que costuma divergir do projeto original após reformas e mudanças de layout), condição dos equipamentos, eficiência medida e retorno do investimento antes de recomendar substituição, retrofit ou repotenciação." },
      { q: "Existe atendimento emergencial?", a: "Sim, com plantão 24x7, escalonamento definido em contrato e mapeamento prévio de peças críticas para sistemas que não podem parar." },
    ],
    seoText: [
      "Climatização é, na maioria dos edifícios comerciais, o maior bloco isolado de consumo elétrico — e também o sistema com maior impacto direto sobre produtividade, saúde ocupacional e continuidade de operações críticas. A ASHRAE, referência técnica internacional do setor, publicou a Standard 180 justamente para transformar manutenção de HVAC em prática inspecionável, com tarefas, periodicidades e registros definidos, em vez de rotina informal delegada ao técnico de plantão.",
      "No Brasil, o arcabouço é igualmente objetivo: a Lei 13.589/2018 obriga o PMOC em edifícios de uso público e coletivo; a ABNT NBR 13971 trata da manutenção de sistemas de refrigeração, condicionamento de ar e ventilação; a ABNT NBR 16401 estabelece parâmetros de projeto, conforto térmico e qualidade do ar interior; e a Resolução ANVISA RE 09/2003 fixa padrões referenciais de qualidade do ar em ambientes climatizados de uso público e coletivo.",
      "A prática da Álamo une as duas frentes: conformidade documental impecável e engenharia de desempenho. Medimos consumo por equipamento, comparamos o comportamento real com a curva esperada, atacamos as causas de perda — incrustação em trocadores, vazão inadequada de água gelada, carga de fluido incorreta, setpoint mal ajustado, dampers travados — e reportamos o efeito de cada intervenção com dado de campo.",
    ],
    deepDive: [
      {
        h: "Onde o desperdício realmente se esconde",
        p: "A degradação de desempenho em sistemas de expansão indireta raramente vem de uma falha visível. Ela se acumula em incrustação nos trocadores, aproximação térmica crescente em torres de resfriamento, vazão desbalanceada nos circuitos de água gelada, carga de refrigerante fora de especificação e controle operando em modo manual desde a última emergência. Cada item isoladamente parece pequeno; somados, deslocam o sistema para longe do ponto de melhor eficiência projetado.",
      },
      {
        h: "Comissionamento contínuo e não apenas manutenção",
        p: "A literatura técnica de eficiência energética distingue manutenção de commissioning: manter é preservar a função; comissionar continuamente é verificar periodicamente se o sistema entrega a função pretendida pelo projeto, nas condições reais de operação. O ciclo prático é medir, comparar com a referência de projeto, corrigir e documentar. Sem essa camada, é comum um parque com manutenção em dia operar cronicamente acima do consumo esperado.",
      },
      {
        h: "Ventilação, renovação de ar e o pós-pandemia",
        p: "A ASHRAE Standard 62.1 estabelece as taxas mínimas de ventilação para qualidade aceitável do ar interior, e o debate sobre transmissão de patógenos por aerossóis reforçou a atenção sobre renovação de ar, filtragem e monitoramento de CO₂ como indicador indireto de ventilação por ocupante. Em edifícios corporativos, tratar renovação como variável de projeto — e não como perda térmica a ser cortada — passou a ser parte do escopo técnico do contrato.",
      },
      {
        h: "Refrigerantes, regulação ambiental e planejamento de parque",
        p: "A eliminação progressiva dos HCFCs sob o Protocolo de Montreal e a redução gradual dos HFCs pela Emenda de Kigali tornam a escolha do fluido uma decisão de horizonte, não de conveniência. Isso afeta diretamente o plano de substituição do parque: manter equipamento com fluido em descontinuação significa risco crescente de indisponibilidade e custo de gás. Esse mapeamento entra no plano plurianual que entregamos ao cliente.",
      },
    ],
    references: [
      "Lei Federal 13.589/2018 — Manutenção de instalações e equipamentos de sistemas de climatização (PMOC)",
      "Portaria GM/MS 3.523/1998 e Resolução ANVISA RE 09/2003 — Qualidade do ar em ambientes climatizados de uso público e coletivo",
      "ABNT NBR 13971 — Sistemas de refrigeração, condicionamento de ar e ventilação: manutenção programada",
      "ABNT NBR 16401 — Instalações de ar condicionado: sistemas centrais e unitários (projeto, conforto térmico e qualidade do ar)",
      "ASHRAE Standard 180 — Standard Practice for the Inspection and Maintenance of Commercial HVAC Systems",
      "ASHRAE Standard 62.1 — Ventilation and Acceptable Indoor Air Quality",
      "Protocolo de Montreal e Emenda de Kigali — Eliminação de HCFCs e redução progressiva de HFCs",
    ],
  },
  "infraestrutura-eletrica": {
    slug: "infraestrutura-eletrica",
    name: "Infraestrutura Elétrica",
    h1: "Infraestrutura elétrica confiável, da subestação ao ponto de uso",
    sub: "Da subestação ao ponto de uso, sua energia nas mãos de quem responde tecnicamente por ela: termografia, ensaios, laudos e prontuário NR-10 completos, em operações onde uma falha elétrica custa muito mais do que o reparo.",
    metaTitle: "Manutenção de Infraestrutura Elétrica Industrial | Álamo Engenharia",
    metaDescription:
      "Manutenção elétrica industrial e predial: subestações, QGBTs, geradores, nobreaks, termografia, prontuário e laudos NR-10, adequação à NBR 5410 e NBR 14039 com equipe certificada.",
    benefits: [
      { title: "Termografia com metodologia", text: "Inspeção termográfica com carga representativa, critério de severidade e relatório comparativo entre campanhas — não apenas foto colorida." },
      { title: "Conformidade NR-10", text: "Prontuário das instalações elétricas atualizado, procedimentos de trabalho, ART, laudos e equipe treinada e reciclada conforme a norma regulamentadora." },
      { title: "Energia de contingência testada", text: "Ensaios com carga real em geradores e nobreaks, registro de autonomia, estado do banco de baterias e tempo de transferência medido." },
      { title: "Qualidade de energia", text: "Análise de harmônicas, desequilíbrio, afundamentos e fator de potência com base nos critérios do PRODIST e da IEEE 519." },
    ],
    useCases: [
      { title: "Subestação industrial", text: "Manutenção preventiva com desligamento programado, ensaios em transformadores, análise de óleo isolante e reaperto com torque controlado." },
      { title: "Data center e sala de TI", text: "Cadeia elétrica redundante verificada periodicamente, do quadro de entrada às réguas de rack, sem risco para a operação." },
      { title: "Ampliação de carga", text: "Projeto e execução de novos circuitos, quadros e alimentadores com memorial técnico, ART e as-built entregues ao final." },
    ],
    faq: [
      { q: "Com que frequência fazer termografia?", a: "A prática consolidada em engenharia de manutenção é campanha semestral em quadros e conexões críticas e anual nos demais, sempre com carga representativa. A ABNT NBR 15572 orienta os requisitos do ensaio termográfico em equipamentos elétricos, e o valor real está na comparação entre campanhas, que revela a tendência de degradação de cada conexão." },
      { q: "O que exatamente a NR-10 exige?", a: "Entre outros pontos: prontuário das instalações elétricas com diagramas, especificações e procedimentos; medidas de controle de risco elétrico; análise de risco e permissão de trabalho para intervenções energizadas; treinamento inicial e reciclagem bienal dos profissionais; e curso complementar para trabalho no Sistema Elétrico de Potência. Também é obrigatório o desenergizar seguro, com as etapas de seccionamento, impedimento de reenergização, constatação de ausência de tensão, aterramento temporário, proteção de elementos energizados e sinalização." },
      { q: "Vocês emitem laudos e ART?", a: "Sim. Todo serviço tem responsável técnico registrado no CREA, com Anotação de Responsabilidade Técnica e laudos assinados, o que é condição para uso do documento em auditoria, seguro e processo administrativo." },
      { q: "Atendem intervenções noturnas?", a: "Sim. Desligamentos programados são normalmente executados à noite, em fins de semana ou em janelas de baixa ocupação, com plano de manobra e plano de contingência aprovados previamente." },
      { q: "Como avaliar se a instalação está adequada às normas?", a: "Fazemos diagnóstico com base na ABNT NBR 5410 (baixa tensão) e na NBR 14039 (média tensão de 1,0 kV a 36,2 kV), verificando proteção contra choques, seletividade, dimensionamento de condutores e proteções, aterramento, identificação de circuitos e condição física dos quadros — com plano de adequação priorizado por risco." },
    ],
    seoText: [
      "Falhas elétricas concentram uma parcela desproporcional das paradas críticas em edifícios corporativos e plantas industriais, e a maioria delas é precedida por sinais mensuráveis: aquecimento anormal em conexões, desequilíbrio entre fases, distorção harmônica crescente, degradação de isolação. Um programa de manutenção elétrica bem construído existe para converter esses sinais em intervenção planejada, antes de virarem indisponibilidade ou sinistro.",
      "O arcabouço normativo brasileiro é exigente e cumulativo. A ABNT NBR 5410 rege instalações de baixa tensão; a NBR 14039 cobre média tensão; a NBR 5419 trata da proteção contra descargas atmosféricas; e a NR-10 impõe obrigações formais de documentação, procedimento, capacitação e controle de risco a qualquer empresa que opere ou intervenha em instalações elétricas. Auditorias e seguradoras cobram exatamente esse conjunto — prontuário, laudos, ART e registros de treinamento.",
      "Nossas equipes são treinadas em NR-10 e, quando aplicável, no módulo de Sistema Elétrico de Potência, trabalham com procedimentos formais de bloqueio e etiquetagem e documentam cada intervenção. Serviços de obra elétrica sob demanda — SPDA, adequação de subestação, novos alimentadores, termografia dedicada — são executados dentro do mesmo contrato de manutenção, sem interface adicional para o cliente.",
    ],
    deepDive: [
      {
        h: "Termografia: o ensaio preditivo de melhor relação custo-benefício",
        p: "A inspeção termográfica identifica pontos quentes em conexões, sobrecarga de circuitos, desequilíbrio de fases e componentes em fim de vida sem interromper a operação. A ABNT NBR 15572 estabelece os requisitos para ensaios termográficos em equipamentos elétricos. Para que o ensaio tenha valor técnico, três condições são inegociáveis: carga representativa no momento da medição, registro da temperatura de referência e da emissividade adotada, e critério explícito de severidade que traduza o delta de temperatura em prazo de intervenção.",
      },
      {
        h: "Qualidade de energia não é assunto só da concessionária",
        p: "Distorção harmônica gerada por inversores, fontes chaveadas, iluminação LED e nobreaks provoca sobreaquecimento em condutores de neutro e transformadores, atuação indevida de proteções e redução de vida útil de equipamentos. A IEEE 519 estabelece limites recomendados de distorção harmônica no ponto de acoplamento comum, e o PRODIST, da ANEEL, define os indicadores de qualidade da energia no Brasil. Medir antes de atribuir a culpa à rede é o que separa diagnóstico de suposição.",
      },
      {
        h: "Contingência que só existe se for testada com carga",
        p: "Gerador que parte sem carga e nobreak com autonomia declarada em catálogo não constituem contingência verificada. O ensaio útil aplica carga real ou banco de cargas, mede tempo de transferência, comportamento de tensão e frequência, temperatura e autonomia efetiva do banco de baterias — cuja capacidade se degrada de forma previsível com temperatura e ciclos, e é a causa mais comum de falha de nobreak no momento crítico.",
      },
      {
        h: "Aterramento e SPDA integrados à segurança elétrica",
        p: "A ABNT NBR 5419, alinhada à série IEC 62305, trata da proteção contra descargas atmosféricas em quatro partes: princípios gerais, gerenciamento de risco, danos físicos e proteção de sistemas elétricos e eletrônicos internos. Na prática predial, SPDA, malha de aterramento, equipotencialização e dispositivos de proteção contra surtos formam um sistema único — inspecioná-los isoladamente é o erro mais frequente que encontramos em laudos herdados.",
      },
    ],
    references: [
      "NR-10 — Segurança em instalações e serviços em eletricidade (Ministério do Trabalho e Emprego)",
      "ABNT NBR 5410 — Instalações elétricas de baixa tensão",
      "ABNT NBR 14039 — Instalações elétricas de média tensão de 1,0 kV a 36,2 kV",
      "ABNT NBR 5419 (série) / IEC 62305 — Proteção contra descargas atmosféricas",
      "ABNT NBR 15572 — Ensaios não destrutivos: termografia em equipamentos elétricos",
      "IEEE Std 519 — Harmonic Control in Electric Power Systems",
      "ANEEL PRODIST Módulo 8 — Qualidade da energia elétrica",
    ],
  },
  "telecom-conectividade": {
    slug: "telecom-conectividade",
    name: "Telecom e Conectividade",
    h1: "Telecom e conectividade: infraestrutura de rede que sustenta a operação",
    sub: "Rede instável trava faturamento, PDV e produção. Entregamos cabeamento estruturado, fibra óptica, salas técnicas e data centers com certificação link a link por equipamento calibrado, documentação viva e SLA de atendimento real.",
    metaTitle: "Cabeamento Estruturado e Telecom Corporativo | Álamo Engenharia",
    metaDescription:
      "Infraestrutura de telecom corporativa: cabeamento estruturado, fibra óptica, racks, salas técnicas e data centers conforme ABNT NBR 14565 e ISO/IEC 11801, com certificação de links e documentação completa.",
    benefits: [
      { title: "Links certificados", text: "Certificação com equipamento calibrado e relatório individual por ponto, conforme os parâmetros de desempenho das normas de cabeamento." },
      { title: "Documentação viva", text: "Mapa de rede, identificação padronizada de pontos e as-built atualizados a cada intervenção — administração de infraestrutura como prevê a NBR 14565." },
      { title: "Salas técnicas organizadas", text: "Racks, encaminhamentos, aterramento e climatização dimensionados para crescimento e para manutenção segura." },
      { title: "Rollout multi-site", text: "Padronização de infraestrutura em filiais e lojas, com cronograma unificado e mesmo padrão de entrega em todo o país." },
    ],
    useCases: [
      { title: "Novo escritório", text: "Projeto, lançamento e certificação de cabeamento estruturado concluídos antes da mudança, com documentação entregue à TI." },
      { title: "Backbone em fibra", text: "Interligação de prédios e pavimentos com fusão, ensaio OTDR, medição de perda por inserção e redundância de rota." },
      { title: "Reorganização de data center", text: "Reestruturação de racks, encaminhamento e identificação sem interrupção dos serviços, com janelas planejadas." },
    ],
    faq: [
      { q: "Qual categoria de cabeamento devo usar?", a: "A escolha deve considerar horizonte de uso, densidade de pontos de acesso sem fio e alimentação remota. Categoria 6 atende bem a maior parte dos escritórios; categoria 6A é recomendada quando há previsão de 10GBASE-T, alta densidade de Wi-Fi de última geração ou PoE de maior potência, cenário em que o aquecimento do feixe de cabos passa a ser variável de projeto tratada nas normas ISO/IEC 11801 e TIA-568." },
      { q: "A certificação de links é inclusa?", a: "Sim, com relatório individual por ponto emitido por equipamento calibrado, o que é a evidência exigida para garantia estendida de fabricante e para aceitação técnica da obra." },
      { q: "Vocês fazem manutenção de infraestrutura existente?", a: "Sim: diagnóstico do parque, identificação de pontos, substituição de trechos degradados, reorganização de racks e reconstrução da documentação, que costuma ser o ativo mais deteriorado em redes antigas." },
      { q: "Atendem projetos em várias cidades?", a: "Sim, com coordenação central e equipes regionais, mantendo o mesmo padrão de material, execução e documentação em todos os sites." },
    ],
    seoText: [
      "Conectividade deixou de ser assunto exclusivo de TI e passou a ser infraestrutura predial crítica: controle de acesso, CFTV, automação de climatização, telefonia e sistemas de gestão trafegam na mesma planta física. Cabeamento mal executado não se manifesta como falha clara — aparece como lentidão intermitente, queda de chamadas, imagem perdida em câmera e pacotes descartados, sintomas caros de diagnosticar meses depois da entrega.",
      "A ABNT NBR 14565 trata do cabeamento estruturado para edifícios comerciais e data centers no Brasil, alinhada às séries internacionais ISO/IEC 11801 e ANSI/TIA-568. Essas normas cobrem topologia, distâncias máximas, requisitos de desempenho dos enlaces, identificação e administração da infraestrutura — esta última normalizada também pela ANSI/TIA-606, e frequentemente ignorada em obras que entregam rede funcionando e documentação inexistente.",
      "Executamos projeto, instalação, certificação e manutenção de redes físicas integradas às demais frentes de infraestrutura predial, dentro do mesmo contrato e com um único ponto de contato técnico — o que elimina a disputa de responsabilidade entre fornecedores quando o problema aparece na fronteira entre elétrica, telecom e automação.",
    ],
    deepDive: [
      {
        h: "Certificação é evidência, não formalidade",
        p: "Certificar um enlace significa medir parâmetros como perda de inserção, NEXT, PS-ACR-F, perda de retorno e atraso de propagação contra os limites da norma, com equipamento calibrado e resultado registrado ponto a ponto. É esse relatório que sustenta a garantia estendida dos fabricantes de componentes e que permite, no futuro, distinguir um problema de infraestrutura física de um problema de configuração de rede.",
      },
      {
        h: "Fibra óptica: fusão, OTDR e orçamento de perdas",
        p: "Em backbones ópticos, o ensaio OTDR mapeia eventos ao longo da rota — fusões, conectores, curvaturas excessivas, trechos degradados — enquanto a medição de perda por inserção verifica se o enlace cabe no orçamento óptico do equipamento ativo. Sem os dois ensaios documentados, uma rota aparentemente funcional pode estar operando na margem, com falhas intermitentes que só aparecem sob temperatura ou tráfego elevado.",
      },
      {
        h: "Salas técnicas e disponibilidade",
        p: "Encaminhamento adequado, separação entre elétrica e dados, aterramento das estruturas metálicas, controle térmico e espaço para manutenção não são estética: são requisitos de desempenho e de segurança presentes nas normas de cabeamento e nas boas práticas de projeto de data center. Rack sobrecarregado e sem identificação é, na prática, um multiplicador de tempo de reparo em todos os incidentes futuros.",
      },
    ],
    references: [
      "ABNT NBR 14565 — Cabeamento estruturado para edifícios comerciais e data centers",
      "ISO/IEC 11801 (série) — Information technology: generic cabling for customer premises",
      "ANSI/TIA-568 (série) — Balanced twisted-pair and optical fiber telecommunications cabling",
      "ANSI/TIA-606 — Administration standard for telecommunications infrastructure",
      "ABNT NBR 14306 / IEC 60364-5-548 — Aterramento e equipotencialização de sistemas de informação",
    ],
  },
  hidraulica: {
    slug: "hidraulica",
    name: "Hidráulica",
    h1: "Sistemas hidrossanitários e combate a incêndio sob controle",
    sub: "Vazamento, falta de pressão e bomba de incêndio inoperante são riscos que não avisam. Mantemos redes hidrossanitárias, casas de bomba, reservatórios, pressurização e combate a incêndio prontos para a auditoria e para a emergência.",
    metaTitle: "Manutenção Hidráulica Predial e Industrial | Álamo Engenharia",
    metaDescription:
      "Manutenção hidráulica predial: redes hidrossanitárias, bombas, reservatórios, pressurização, pesquisa de vazamentos e sistemas de combate a incêndio conforme NBR 5626, NBR 13714 e NBR 10897.",
    benefits: [
      { title: "Redução de perdas de água", text: "Pesquisa de vazamentos não aparentes, análise de consumo mínimo noturno e setorização de medição para localizar perda antes da conta." },
      { title: "Combate a incêndio testado", text: "Ensaios periódicos de hidrantes, sprinklers e bombas conforme NBR 13714 e NBR 10897, com registro para renovação de AVCB." },
      { title: "Potabilidade documentada", text: "Limpeza e higienização de reservatórios com laudo laboratorial, alinhada aos padrões de potabilidade da Portaria GM/MS 888/2021." },
      { title: "Bombeamento confiável", text: "Manutenção de conjuntos moto-bomba, inversores, quadros de comando e automação de nível, com verificação de ponto de operação." },
    ],
    useCases: [
      { title: "Edifício corporativo", text: "Casa de bombas, pressurização por zona e prumadas com plano preventivo, controle de pressão e inspeção de válvulas." },
      { title: "Galpão logístico", text: "Rede de sprinklers e hidrantes ensaiada e documentada para manutenção do AVCB e exigências de seguradora." },
      { title: "Planta industrial", text: "Água de processo, efluentes e reuso com controle de vazão, tratamento e manutenção programada das estações." },
    ],
    faq: [
      { q: "Com que frequência limpar os reservatórios?", a: "A prática consolidada e adotada pelas vigilâncias sanitárias municipais é a limpeza semestral, com registro e laudo de potabilidade. O padrão de qualidade da água para consumo humano é definido pela Portaria GM/MS 888/2021, que consolidou a legislação anterior." },
      { q: "Vocês localizam vazamentos não aparentes?", a: "Sim, com geofonamento, correlação acústica, análise de consumo mínimo noturno e setorização — metodologia consagrada em programas de controle de perdas em sistemas de abastecimento e aplicável à rede interna predial." },
      { q: "Fazem manutenção de sistemas de incêndio?", a: "Sim: hidrantes e mangotinhos conforme NBR 13714, chuveiros automáticos conforme NBR 10897, extintores conforme NBR 12693 e apoio técnico na renovação do AVCB, respeitando também as instruções técnicas do corpo de bombeiros do estado." },
      { q: "Como vocês tratam risco de legionela em sistemas prediais?", a: "Torres de resfriamento, reservatórios e sistemas de água quente exigem controle de temperatura, limpeza programada e tratamento químico documentado. A literatura de saúde pública e as diretrizes da Organização Mundial da Saúde associam a proliferação de Legionella à estagnação e a faixas de temperatura favoráveis — por isso o plano de manutenção trata esses pontos como itens críticos, não como rotina de limpeza." },
      { q: "Atendem emergências de vazamento?", a: "Sim, com plantão para contenção imediata, isolamento do trecho e reparo definitivo programado com o mínimo de impacto à operação." },
    ],
    seoText: [
      "Falhas hidráulicas costumam ser percebidas tarde. Um vazamento em prumada embutida, uma válvula de retenção travada ou uma bomba operando em cavitação produzem desperdício de água, consumo elétrico excedente e dano estrutural progressivo muito antes de gerarem um chamado. Por isso, manutenção hidráulica séria é medição e inspeção programadas, não apenas atendimento a entupimento.",
      "O conjunto normativo aplicável é amplo: ABNT NBR 5626 para instalações de água fria e água quente, NBR 8160 para esgoto sanitário, NBR 10844 para águas pluviais, NBR 13714 para hidrantes e mangotinhos, NBR 10897 para chuveiros automáticos e a Portaria GM/MS 888/2021 para o padrão de potabilidade. Cada um desses sistemas tem rotina, ensaio e evidência próprios — e é a ausência dessa evidência que trava renovação de AVCB e vistorias.",
      "Nossos técnicos de hidráulica atuam integrados às equipes de elétrica e HVAC do mesmo contrato, o que encurta drasticamente o diagnóstico em problemas de fronteira, como falha de automação de nível, quadro de comando de bomba e dreno de condensado.",
    ],
    deepDive: [
      {
        h: "Perdas de água: medir para poder reduzir",
        p: "A metodologia de balanço hídrico difundida pela International Water Association separa consumo autorizado de perdas reais e aparentes — abordagem que, trazida para a escala predial, permite distinguir vazamento físico de erro de medição e de consumo não controlado. Na prática, a análise do consumo mínimo noturno em um edifício com ocupação previsível é o indicador mais barato e mais revelador de vazamento oculto.",
      },
      {
        h: "Bombeamento: eficiência esquecida",
        p: "Conjuntos moto-bomba frequentemente operam fora do ponto de melhor eficiência por sobredimensionamento, incrustação, desgaste de rotor ou controle inadequado de pressão. Verificar o ponto real de operação contra a curva do fabricante, avaliar o uso de inversores e corrigir o controle de pressão reduz consumo elétrico e, principalmente, elimina cavitação — que é uma causa silenciosa e cara de falha prematura.",
      },
      {
        h: "Sistemas de combate a incêndio: o ensaio é o entregável",
        p: "Bomba de incêndio que não é ensaiada com vazão e pressão, hidrante sem teste de estanqueidade e válvula de governo sem verificação são conformidade apenas no papel. O plano de manutenção define ensaio, periodicidade e registro para cada componente, com relatório assinado por responsável técnico — documento pedido tanto na renovação do AVCB quanto em vistoria de seguradora após sinistro.",
      },
    ],
    references: [
      "ABNT NBR 5626 — Sistemas prediais de água fria e água quente: projeto, execução, operação e manutenção",
      "ABNT NBR 8160 e NBR 10844 — Sistemas prediais de esgoto sanitário e de águas pluviais",
      "ABNT NBR 13714 — Sistemas de hidrantes e de mangotinhos para combate a incêndio",
      "ABNT NBR 10897 — Sistemas de proteção contra incêndio por chuveiros automáticos",
      "Portaria GM/MS 888/2021 — Padrão de potabilidade da água para consumo humano",
      "World Health Organization — Legionella and the prevention of legionellosis",
      "International Water Association — Metodologia de balanço hídrico e controle de perdas",
    ],
  },
  tecnologia: {
    slug: "tecnologia",
    name: "Tecnologia",
    h1: "Tecnologia integrada para edifícios e operações conectadas",
    sub: "Automação, telecomunicações, conectividade, infraestrutura tecnológica e sistemas inteligentes reunidos em uma única frente técnica — do cabeamento certificado ao BMS, CFTV e controle de acesso.",
    metaTitle: "Tecnologia, Automação e Conectividade | Álamo Engenharia",
    metaDescription:
      "Automação, telecomunicações e conectividade corporativa: cabeamento, fibra óptica, BMS, CFTV, controle de acesso e sistemas inteligentes com documentação completa.",
    benefits: [
      { title: "Segurança eletrônica verificada", text: "CFTV com cobertura revisada periodicamente, verificação de integridade de gravação e política de retenção definida." },
      { title: "Controle de acesso íntegro", text: "Catracas, leitores e integração com RH para gestão de credenciais, com auditoria de acessos e revogação tempestiva." },
      { title: "BMS e supervisório úteis", text: "Monitoramento centralizado de HVAC, elétrica e utilidades com alarmes priorizados — e não com telas cheias de eventos ignorados." },
      { title: "Conectividade certificada", text: "Cabeamento estruturado, fibra óptica, racks e salas técnicas com certificação link a link e documentação atualizada." },
    ],
    useCases: [
      { title: "Rede de lojas", text: "Padronização de conectividade, CFTV e alarme em múltiplas unidades com monitoramento central e SLA por região." },
      { title: "Edifício corporativo", text: "Integração de controle de acesso, elevadores e automação de iluminação por pavimento, com regras por perfil de usuário." },
      { title: "Planta industrial", text: "Supervisório de utilidades com histórico de alarmes, tendências e indicadores de disponibilidade exportados para o relatório mensal." },
    ],
    faq: [
      { q: "Vocês trabalham com equipamentos já instalados?", a: "Sim. Fazemos diagnóstico do parque existente, assumimos a manutenção e indicamos substituição apenas quando há justificativa técnica — obsolescência, indisponibilidade de peças ou vulnerabilidade de segurança." },
      { q: "É possível integrar sistemas de fabricantes diferentes?", a: "Na maior parte dos casos, sim, por meio de protocolos abertos consolidados: BACnet (normalizado como ASHRAE Standard 135 e ISO 16484-5) para automação predial, Modbus para dispositivos de campo e ONVIF para interoperabilidade em CFTV." },
      { q: "A certificação dos pontos de rede está incluída?", a: "Sim. Os enlaces são testados com equipamento adequado e recebem relatório individual, identificação e documentação as-built." },
      { q: "Como fica a LGPD no CFTV e no controle de acesso?", a: "Imagem e dado biométrico são dados pessoais, e biometria é dado pessoal sensível na Lei 13.709/2018. Isso exige base legal definida, finalidade específica, prazo de retenção justificado, controle de acesso às gravações, registro das operações de tratamento e sinalização de área monitorada. Estruturamos a operação técnica para dar sustentação a esses requisitos, em conjunto com o encarregado de dados do cliente." },
    ],
    seoText: [
      "Automação eletrônica só entrega valor quando os subsistemas conversam entre si. CFTV, controle de acesso, detecção de incêndio, iluminação e climatização operando isolados produzem operação manual, pontos cegos e um volume de alarmes que a equipe aprende a ignorar — o pior desfecho possível para um investimento em tecnologia.",
      "A interoperabilidade tem base normativa: o BACnet é padronizado como ASHRAE Standard 135 e ISO 16484-5, a série ISO 16484 trata de sistemas de automação e controle predial de forma abrangente, e o padrão ONVIF permite integração entre dispositivos de vídeo de fabricantes distintos. Projetar sobre protocolos abertos é o que evita o aprisionamento tecnológico que encarece cada expansão futura.",
      "Integramos e mantemos esses sistemas com inventário de dispositivos, versionamento de configuração, política de senhas e atualização de firmware — camada de segurança cibernética que hoje é inseparável da manutenção de automação predial, já que câmeras e controladores conectados são vetor conhecido de ataque.",
    ],
    deepDive: [
      {
        h: "Do alarme ao diagnóstico: analytics de BMS",
        p: "Sistemas de automação predial geram muito mais dado do que a operação consegue interpretar. A prática de fault detection and diagnostics, difundida em literatura de eficiência energética predial, aplica regras sobre esse histórico para apontar falhas silenciosas — válvula travada, damper preso, setpoints conflitantes, operação simultânea de aquecimento e resfriamento. É a diferença entre um supervisório que mostra telas e um que reduz consumo.",
      },
      {
        h: "Segurança cibernética de dispositivos prediais",
        p: "Câmeras, controladores e centrais conectadas à rede corporativa com credencial padrão de fábrica e firmware desatualizado são um risco documentado. Nossa rotina de manutenção inclui inventário, segregação de rede, troca de credenciais padrão, controle de acesso remoto e acompanhamento de atualizações — alinhada às boas práticas de gestão de ativos e vulnerabilidades das normas de segurança da informação.",
      },
      {
        h: "LGPD aplicada à operação, não só ao contrato",
        p: "Conformidade com a Lei 13.709/2018 em segurança eletrônica se prova na operação: quem tem acesso às imagens, por quanto tempo elas ficam armazenadas, como o acesso é registrado, como uma solicitação de titular é atendida e como o descarte acontece. Ajustamos a configuração dos sistemas para tornar essas respostas verificáveis.",
      },
    ],
    references: [
      "ASHRAE Standard 135 / ISO 16484-5 — BACnet: protocolo de comunicação para automação predial",
      "ISO 16484 (série) — Building automation and control systems",
      "ONVIF — Perfis de interoperabilidade para sistemas de vídeo em rede",
      "Lei 13.709/2018 (LGPD) — Tratamento de dados pessoais, incluindo imagem e biometria",
      "ABNT NBR 17240 — Sistemas de detecção e alarme de incêndio",
    ],
  },
  "outras-manutencoes": {
    slug: "outras-manutencoes",
    name: "Outras Manutenções",
    h1: "Serviços prediais sob demanda com equipe multidisciplinar",
    sub: "Tudo o que aparece no dia a dia e ninguém quer abrir um novo contrato para resolver: marcenaria, serralheria, vidraçaria, impermeabilização, pintura e reparos civis, dentro do seu contrato e com o mesmo padrão de registro técnico.",
    metaTitle: "Serviços Prediais Sob Demanda | Álamo Engenharia",
    metaDescription:
      "Serviços prediais sob demanda: marcenaria, serralheria, vidraçaria, impermeabilização, pintura e pequenos reparos com equipe multidisciplinar, tabela contratada e registro técnico.",
    benefits: [
      { title: "Fornecedor único", text: "Menos contratos, menos interfaces e um só responsável técnico respondendo por prazo e qualidade." },
      { title: "Atendimento rápido", text: "Chamados abertos em canal único, com SLA por criticidade e histórico consolidado por local." },
      { title: "Equipe multidisciplinar", text: "Profissionais de várias especialidades disponíveis sob demanda, sem custo de mobilização a cada chamado." },
      { title: "Custos previsíveis", text: "Tabela de serviços e composições acordadas em contrato, evitando orçamento avulso a cada demanda." },
    ],
    useCases: [
      { title: "Pequenos reparos recorrentes", text: "Time volante cobrindo demandas diárias de baixa complexidade que, somadas, dominam o volume de chamados." },
      { title: "Impermeabilização", text: "Tratamento de lajes, calhas e reservatórios conforme NBR 9575 e NBR 9574, com garantia de execução." },
      { title: "Conservação de elementos construtivos", text: "Esquadrias, forros, vidros, pisos e acabamentos mantidos dentro da periodicidade prevista no plano da edificação." },
    ],
    faq: [
      { q: "Esses serviços entram no mesmo contrato?", a: "Sim, como escopo sob demanda, com tabela de preços e composições acordadas previamente." },
      { q: "Existe prazo mínimo de atendimento?", a: "Os prazos seguem a criticidade definida em contrato, com opção de plantão para demandas que impactam operação ou segurança." },
      { q: "Vocês fornecem material?", a: "Sim, com opção de fornecimento pela Álamo ou pelo cliente, conforme a política de compras da empresa." },
      { q: "Reformas e alterações precisam de cuidado especial?", a: "Sim. A ABNT NBR 16280 estabelece requisitos para reformas em edificações, incluindo plano de reforma, responsável técnico e análise de impacto sobre sistemas existentes — exigência frequentemente ignorada em ajustes de layout aparentemente simples." },
      { q: "Atendem fora do Rio de Janeiro e São Paulo?", a: "Sim, com cobertura nacional apoiada em equipes regionais e time volante." },
    ],
    seoText: [
      "A maior parte dos chamados de manutenção predial não é de alta complexidade técnica — é volume: portas, fechaduras, forros, vidros, infiltrações localizadas e acabamentos que se acumulam, degradam a percepção do ambiente e consomem tempo de gestão desproporcional ao seu custo unitário.",
      "Concentrar essas demandas em um contrato multidisciplinar reduz custo administrativo, encurta o intervalo entre abertura e solução do chamado e, sobretudo, cria histórico. Um mesmo ponto de infiltração reincidente em três trimestres deixa de ser 'mais um chamado' e passa a ser um problema de causa raiz identificável — que é exatamente o tipo de análise prevista na sistemática de gestão da manutenção da ABNT NBR 5674.",
      "Quando o reparo cresce e vira intervenção construtiva, o serviço migra para nossa frente de obras — retrofit, pintura, ajustes de layout, SPDA, termografia e subestações — com projeto, responsável técnico e as-built, respeitando os requisitos da ABNT NBR 16280 para reformas em edificações em uso.",
    ],
    references: [
      "ABNT NBR 5674 — Manutenção de edificações: requisitos para o sistema de gestão de manutenção",
      "ABNT NBR 16280 — Reforma em edificações: sistema de gestão de reformas",
      "ABNT NBR 9575 e NBR 9574 — Impermeabilização: seleção, projeto e execução",
      "ABNT NBR 13755 e NBR 15575 — Revestimentos, desempenho e vida útil de projeto",
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_CONTENT);
