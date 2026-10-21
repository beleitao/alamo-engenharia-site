# Álamo Engenharia — handoff técnico

## Estado desta entrega
Este ZIP é um handoff de código-fonte para Cloudflare Workers, sem GitHub, não um build compilado nem um pacote para simplesmente copiar para public_html. O site em execução não foi alterado. Leia `CONFIGURACAO-CLOUDFLARE.md`: contém o procedimento de publicação, configuração segura e testes de recebimento. Não houve compilação nem validação de produção na conta Cloudflare.

## Preparação e publicação
1. Confirmar Node.js 22.12+ no computador de publicação e acesso à conta Cloudflare Workers. Arquivos estáticos não executam os formulários.
2. Executar `npm install` e guardar o package-lock.json gerado para futuras instalações reproduzíveis. Não foi fornecido lockfile pois as dependências de exportação diferem das originais.
3. Configurar valores públicos em `cloudflare.config.ts` e chaves em Cloudflare Secrets; modelos `.env.example` e `.dev.vars.example` estão vazios. Nenhuma credencial real foi incluída.
4. Executar `npm run build`. A configuração solicita minificação de JS/CSS e desativa source maps; a minificação ainda não foi executada nesta entrega.
5. Autenticar com `npx wrangler login`; usar `npm run deploy:cloudflare` e configurar a chave com `npm run secret:email`. Validar rotas e recebimento antes da troca do DNS.
6. Conectar o domínio ao Worker; redirecionar www para https://alamoengenharia.com.br preservando caminho e parâmetros. Não cachear respostas de formulários.

## Integrações — bloqueios para o lançamento
- E-mail dos formulários (Contato, Orçamento, Currículo, Newsletter): o código de envio já está pronto. Para ativar no servidor:
  1. Crie uma conta em https://resend.com e adicione o domínio `alamoengenharia.com.br` (Domains → Add Domain).
  2. Cadastre no DNS do domínio os registros SPF/DKIM exibidos pelo Resend e aguarde o status "Verified".
  3. Gere uma chave em API Keys (permissão "Sending access") e salve-a como `RESEND_API_KEY` nos Secrets da Cloudflare, nunca no fonte.
  4. Aplique a alteração e envie um teste pela página /contato; confirme o registro no Resend e o recebimento na caixa de destino.
  - Remetente: `no-reply@alamoengenharia.com.br` (não precisa existir como caixa postal). Resposta do cliente vai no reply-to.
  - Destinatário por setor: editar apenas `src/lib/mail-config.ts` (ex.: Comercial → comercial@, RH → gestaodepessoas.rj@).
  - Sem a chave, o formulário avisa o visitante que o envio falhou; nada é dado como entregue.
  - Aceitação pelo provedor não comprova chegada à caixa. Atualmente não há armazenamento durável das solicitações nem fila de reenvio; consulte os limites e próximos passos no guia Cloudflare.
- Zoho e newsletter: o fonte utiliza contrato de gateway com /Leads, /Contacts e /Contacts/search. A equipe precisa fornecer um gateway compatível, ou implementar OAuth direto do Zoho. Só apontar para a API nativa NÃO funciona. Credenciais antigas não foram copiadas. WebForm é fallback de leads, não substitui newsletter.
- Leitor neural: requer gateway compatível com requisição Gemini AUDIO e retorno SSE PCM 24 kHz. Sem configuração, permanece a voz do dispositivo. A voz neural não está validada nesta exportação.
- Anexos: PNG/JPEG reconstruídos por decodificação de pixels; limites e validação existentes foram preservados. Não representa antivírus nem garantia absoluta contra arquivos maliciosos.
- A área de colaboradores permanece bloqueada com 404; carreiras direciona ao Pandapé. Não há conta/autenticação pública ativa nesta entrega; auxiliares de sessão de prévia foram omitidos.

## Manutenção
- Artigos: editar um arquivo tipado em src/lib/blog/articles e registrar explicitamente em src/lib/blog/index.ts. Datas ISO, horário exibido em São Paulo; nunca mudar slugs já publicados.
- Serviços/obras: src/lib/service-content.ts e src/lib/obras-content.ts; títulos e descrições por página ficam em src/routes.
- Identidade: src/styles.css; navegação e contatos nas bibliotecas e componentes compartilhados. Fontes Google Sora/Manrope permanecem externas.
- Imagens: fotos WebP qualidade 90, sem redução das dimensões; PNG originais de logo e mapa com compressão sem perdas. Arquivos são locais e não dependem de caminhos de armazenamento da prévia.
- Manter comentários nos fontes; editar fontes e recompilar, não editar arquivos minificados manualmente.

## SEO
Canonicals e Open Graph da cópia de entrega apontam para https://alamoengenharia.com.br. Sitemap contém as páginas públicas canônicas e os dois artigos; exclui API, página de agradecimento, portal desativado e redirecionamento de carreiras. Metadados por rota e dados estruturados existentes preservados. Conferir o HTML renderizado no servidor após compilar. Ao adicionar/remover artigos ou páginas, atualizar public/sitemap.xml.
SEO técnico não garante primeira página: depende de concorrência, relevância, autoridade, indexação e desempenho real. Enviar sitemap no Google Search Console após o lançamento, revisar métricas reais e validar alegações comerciais e números com documentação institucional antes de publicar.

## Checklist obrigatório da equipe de hospedagem
- [ ] Compilar, resolver eventuais ajustes do adaptador e verificar saída de produção.
- [ ] Abrir home, serviços, obras e ambos os artigos por URL direta e recarregar sem 404.
- [ ] Conferir títulos, descrição, canonical, Open Graph, sitemap e status HTTP reais.
- [ ] Enviar orçamento real com PNG/JPEG de teste e confirmar recebimento no e-mail e Zoho.
- [ ] Enviar contato e newsletter e confirmar registros; testar falhas e spam.
- [ ] Testar leitor neural/voz de dispositivo, filtros Conformidade, compartilhamento e navegação mobile.
- [ ] Conferir ausência de selo de plataforma na hospedagem externa, imagens, contraste e layouts.
- [ ] Validar política de privacidade, consentimentos, dados comerciais e configurações de segurança.
