# Validação da atualização — 22/10/2026

- Compilação de produção Cloudflare concluída com sucesso usando o `npm run build` original. Nenhuma configuração de build, deploy, e-mail ou dependências foi alterada.
- Sete testes passaram: configuração da hospedagem, destinos de e-mail, sitemap, artigos e rastreamento.
- Pacote compilado executado localmente com Wrangler: home, navegação até Contato e abertura direta do artigo SPDA funcionaram sem erros de JavaScript.
- Um evento `alamo_page_view` na home e outro em Contato, com o título correto de cada página; somente um bootstrap GTM no documento.
- HTML retornado pelo servidor: script GTM primeiro no head e noscript primeiro no body. O endereço do contêiner Google respondeu HTTP 200.
- Links do rodapé, menu de computador e menu de celular conferidos; portal TOTVS e carreiras usam nova janela com `noopener noreferrer`.
- Site em português mesmo com preferência anterior em inglês; seletor ausente. Capturas de Contato, menu de celular, link do colaborador e título do artigo inspecionadas.
- Todas as páginas de conteúdo preservam seus metadados individuais, inclusive a home; sitemap e URLs não foram alterados.

## Limitações e observações
- O lockfile recebido contém uma dependência restrita a macOS ARM (`@img/sharp-darwin-arm64`); `npm ci --ignore-scripts` falhou neste ambiente Linux. Para validar sem alterar o lockfile, a instalação local usou `npm ci --ignore-scripts --force`; em seguida a compilação original passou. Essa restrição já existe no ZIP recebido: não se pode afirmar que um deploy Linux usando `npm ci` sem esse contorno funcionará. Revise o processo existente caso ele encontre `EBADPLATFORM`; não alteramos sua configuração.
- Interações foram verificadas com o download GTM substituído por uma resposta vazia no teste de navegador, isolando tags externas; a disponibilidade real do contêiner foi verificada separadamente. Tags publicadas, GA4, Hotjar, consentimento e relatórios finais precisam de validação na sua conta após o deploy.
- E-mails, CRM e narração não foram reenviados/testados nesta atualização; suas configurações foram preservadas integralmente.
- Este ZIP contém fontes e mídia local, sem dependências instaladas, resultados de compilação, metadados Git ou credenciais. O histórico `ENTREGA.json` do pacote original permanece intacto; para as mudanças atuais, consulte este documento e `RASTREAMENTO.md`.