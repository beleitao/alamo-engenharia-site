# Álamo Engenharia — Portal Institucional

> **Engenharia além da execução.**
> Mais de 56 anos em manutenção predial, HVAC, elétrica, hidráulica, obras e automação para empresas.

Repositório oficial do site da [Álamo Engenharia](https://alamoengenharia.com.br). A aplicação usa renderização no servidor (SSR) executada na borda pela Cloudflare, com foco em desempenho, acessibilidade, SEO técnico e segurança dos formulários.

---

## Stack

| Camada | Tecnologia |
| :--- | :--- |
| Framework | TanStack Start v1 · React 19 |
| Build | Vite 7 · Nitro (preset Cloudflare Workers) |
| Estilos | Tailwind CSS v4 com tokens semânticos · Sora / Manrope |
| Runtime | Cloudflare Workers (`nodejs_compat`) |
| Validação | Zod (cliente e servidor) |
| Analytics | Google Tag Manager (GA4, Hotjar e demais tags configurados no contêiner) |

## Recursos

- Páginas de serviços, obras, cases, ESG, SGI (ISO 9001, 14001, 45001), premiações e FAQ.
- Blog técnico com artigos tipados, categorias, busca, compartilhamento e leitura em voz.
- Formulários de contato, orçamento e newsletter com roteamento de e-mail por setor.
- Anexos aceitos apenas em PNG/JPEG, reconstruídos no servidor (metadados e conteúdo ativo descartados).
- SEO técnico: metadados por página, canonical, Open Graph, dados estruturados (JSON-LD), `sitemap.xml` e `robots.txt`.
- Imagens locais em WebP otimizado; transições leves com respeito a `prefers-reduced-motion`.

## Requisitos

- Node.js **22.12+**
- npm
- Conta Cloudflare com Workers habilitado (para publicação)

## Desenvolvimento local

```bash
npm install
cp .dev.vars.example .dev.vars   # preencha apenas localmente; nunca faça commit
npm run dev                      # http://localhost:8080
```

## Scripts

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção minificado |
| `npm run preview:cloudflare` | Executa o build no runtime local do Workers |
| `npm run deploy:cloudflare` | Publica no Cloudflare Workers |
| `npm run secret:email` | Cadastra a chave de e-mail como Secret criptografado |
| `npx vitest run` / `bun test` | Testes automatizados |

## Variáveis de ambiente

Credenciais **nunca** ficam no código. Em produção, use **Cloudflare Secrets** (painel do Worker ou `npx wrangler secret put NOME`). Localmente, use `.dev.vars` (ignorado pelo Git).

| Variável | Tipo | Finalidade |
| :--- | :--- | :--- |
| `BREVO_API_KEY` | Secret | Envio dos e-mails dos formulários |
| `LEADS_FROM` | Pública | Remetente autenticado dos e-mails |
| `CRM_GATEWAY_URL` / `CRM_GATEWAY_API_KEY` / `CRM_CONNECTION_API_KEY` | Secret | Integração de leads com o CRM |
| `ZOHO_WEBFORM_URL` | Pública | Fallback de captura de leads |
| `SPEECH_GATEWAY_URL` / `SPEECH_GATEWAY_API_KEY` / `SPEECH_MODEL` | Secret | Leitura em voz neural (opcional) |

Valores públicos de deploy ficam em `cloudflare.config.ts`. Detalhes em [`CONFIGURACAO-CLOUDFLARE.md`](./CONFIGURACAO-CLOUDFLARE.md) e [`RASTREAMENTO.md`](./RASTREAMENTO.md).

## Estrutura

```text
├── public/                 # favicon, robots.txt, sitemap.xml
├── src/
│   ├── assets/             # imagens otimizadas
│   ├── components/         # componentes de interface
│   ├── lib/
│   │   ├── blog/           # artigos e utilitários do blog
│   │   ├── mail-config.ts  # remetente e destinatários por setor
│   │   └── tag-manager.ts  # Google Tag Manager
│   ├── routes/             # páginas (roteamento por arquivo)
│   └── styles.css          # design system
├── tests/                  # testes automatizados
└── cloudflare.config.ts    # configuração de deploy
```

## Manutenção

- **Novo artigo:** crie um arquivo em `src/lib/blog/articles/`, registre-o em `src/lib/blog/index.ts` e adicione a URL em `public/sitemap.xml`. Não altere slugs já publicados.
- **Destinatários de e-mail:** `src/lib/mail-config.ts`.
- **Serviços e obras:** `src/lib/service-content.ts` e `src/lib/obras-content.ts`.
- **Identidade visual:** `src/styles.css`.

Consulte também [`AGENTS.md`](./AGENTS.md) para as convenções do projeto.

## Segurança

- Não publique `.env`, `.dev.vars` ou qualquer chave; o `.gitignore` já os bloqueia.
- Rotacione imediatamente qualquer credencial exposta por engano.
- Vulnerabilidades: reporte de forma privada a comercial@alamoengenharia.com.br.

## Licença

© Álamo Engenharia. Todos os direitos reservados. Código, marcas, imagens e textos são de uso exclusivo da Álamo Engenharia; nenhuma licença de uso é concedida por este repositório.
