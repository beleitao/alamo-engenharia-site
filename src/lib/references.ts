/**
 * Resolve a fonte oficial (ou o catálogo oficial) de cada norma / referência técnica
 * citada no site, para que o leitor possa conferir a origem em uma nova aba.
 */

type Rule = { match: RegExp; url: string };

const RULES: Rule[] = [
  // Legislação brasileira
  { match: /lei\s*13\.?589/i, url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13589.htm" },
  { match: /lei\s*9\.?605/i, url: "https://www.planalto.gov.br/ccivil_03/leis/l9605.htm" },
  { match: /portaria\s*3\.?523/i, url: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/1998/prt3523_28_08_1998.html" },
  { match: /re\s*n?º?\s*9\b|resolução\s*-?\s*re\s*9/i, url: "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2003/res0009_16_01_2003.html" },
  { match: /anvisa/i, url: "https://www.gov.br/anvisa/pt-br" },
  { match: /aneel/i, url: "https://www.gov.br/aneel/pt-br" },
  { match: /prodist/i, url: "https://www.gov.br/aneel/pt-br/centrais-de-conteudos/procedimentos-regulatorios/prodist" },
  { match: /inmetro/i, url: "https://www.gov.br/inmetro/pt-br" },
  { match: /procel/i, url: "https://www.gov.br/eletrobras/pt-br/procel" },

  // Normas regulamentadoras
  { match: /\bnr[-\s]?10\b/i, url: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10" },
  { match: /\bnr[-\s]?13\b/i, url: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-13-nr-13" },
  { match: /\bnr[-\s]?35\b/i, url: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-35-nr-35" },
  { match: /\bnr[-\s]?\d{1,2}\b/i, url: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras" },

  // Entidades normalizadoras
  { match: /ashrae/i, url: "https://www.ashrae.org/technical-resources/standards-and-guidelines" },
  { match: /\bisoo?\s*5500|iso\s*55001|iso\s*55000/i, url: "https://www.iso.org/standard/55088.html" },
  { match: /\biso\b/i, url: "https://www.iso.org/standards.html" },
  { match: /\biec\b/i, url: "https://webstore.iec.ch/" },
  { match: /\bsae\s*ja1011\b/i, url: "https://www.sae.org/standards/content/ja1011_200908/" },
  { match: /\bnfpa\b/i, url: "https://www.nfpa.org/codes-and-standards" },
  { match: /\btia\b|ansi\/tia/i, url: "https://tiaonline.org/what-we-do/standards/" },
  { match: /uptime institute/i, url: "https://uptimeinstitute.com/tiers" },
  { match: /\boms\b|organiza(ç|c)ão mundial da sa(ú|u)de|world health organization/i, url: "https://www.who.int/teams/environment-climate-change-and-health/air-quality-energy-and-health" },
  { match: /montreal|kigali/i, url: "https://ozone.unep.org/treaties/montreal-protocol" },
  { match: /\bcrea\b|confea/i, url: "https://www.confea.org.br/" },
  { match: /\babnt\b|\bnbr\b/i, url: "https://www.abntcatalogo.com.br/" },
];

/** URL oficial (ou catálogo oficial) da referência. Fallback: busca no Google. */
export function referenceUrl(label: string): string {
  for (const rule of RULES) {
    if (rule.match.test(label)) return rule.url;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(label)}`;
}
