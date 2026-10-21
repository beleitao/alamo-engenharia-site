# Publicação na Cloudflare e envio dos formulários

## O que é possível garantir
Não existe garantia absoluta de chegada à caixa de entrada: o provedor pode aceitar um envio e o destinatário rejeitá-lo depois ou classificá-lo como spam. O teste obrigatório é enviar pelo site e conferir o resultado no Resend e na caixa do setor. Sucesso da API significa aceitação para processamento, não recebimento comprovado.

Este pacote prepara a configuração; não está publicado nem foi testado com credenciais reais. O código atual não mantém cópia persistente das submissões nem fila de reenvio: se o envio falha, o visitante recebe erro e precisa tentar novamente. Para não perder contatos em falhas de rede/provedor, o próximo passo é armazenamento durável das solicitações, com consulta pelo responsável e reprocessamento controlado. Isso não foi implementado neste pacote. A configuração sozinha não substitui esse recurso.

## Arquivos editáveis sem credenciais
- `cloudflare.config.ts`: nome do serviço e remetente, que deve pertencer ao domínio verificado. As variáveis públicas ficam em `vars`.
- `src/lib/mail-config.ts`: e-mails de cada setor; orçamento continua indo para `comercial@alamoengenharia.com.br`.
- `.dev.vars.example`: modelo vazio para testes locais; nunca inserir chaves em arquivos `.ts`, `.tsx`, `public/`, variáveis `VITE_*` ou neste documento.

As chaves privadas **não ficam no código**. Na Cloudflare, abra **Workers & Pages → alamo-engenharia → Settings → Variables and Secrets → Add → Secret**, use o nome `RESEND_API_KEY` e cole o valor lá. Não use o tipo Text para a chave. Salve/aplique a alteração. Alternativamente, use o comando seguro abaixo, que solicita o valor sem incluí-lo na linha de comando.

## Preparar o Resend
1. Criar/acessar a conta em https://resend.com.
2. Adicionar `alamoengenharia.com.br` em Domains. Copiar os registros exatos apresentados pelo Resend para o DNS da Cloudflare. Não substituir MX da caixa corporativa: preserve o serviço atual de recebimento e siga apenas os registros solicitados para envio. Registros de verificação precisam de DNS sem proxy quando aplicável.
3. Aguardar o domínio ficar Verified. Não inventar SPF/DKIM nem duplicar SPF no mesmo nome; conferir os registros atuais antes de alterações.
4. Criar chave com permissão de envio, limitada ao domínio quando disponível. Guardá-la como `RESEND_API_KEY` nos Secrets da Cloudflare.
5. Confirmar que as caixas dos setores existem e recebem mensagens externas.

## Publicar sem GitHub
O responsável pela hospedagem executa estes comandos no computador, na pasta extraída. Requer Node.js 22.12+ e conta Cloudflare. A autenticação abre o navegador; não é necessário repositório GitHub.

```sh
npm install
npx wrangler login
npm run build
# Verificar se o adaptador gerou .output/server/wrangler.json.
# Primeira publicação cria o Worker. Até configurar a chave, os envios falharão.
npm run deploy:cloudflare
# O prompt solicita a chave de maneira privada; não digitar o valor no comando.
npm run secret:email
```

Após a primeira instalação, guardar o `package-lock.json` e usar `npm ci` nas seguintes. O adaptador gera `.output/server/wrangler.json` e a entrada `.output/server/index.mjs`; não editar a configuração gerada — editar `cloudflare.config.ts` e recompilar. Variáveis Text configuradas só pelo painel podem ser substituídas na próxima publicação: mantenha os valores públicos em `vars`. Secrets têm armazenamento separado; nunca movê-los para `vars`.

Não enviar apenas HTML/CSS/imagens para Pages: orçamento, contato e leitura neural precisam do servidor do Workers. Este pacote de fontes ainda precisa da compilação acima; não é um ZIP de produção pronto para upload.

Para testes locais após compilar, copiar `.dev.vars.example` para `.output/server/.dev.vars`, preencher somente a cópia privada e executar `npm run preview:cloudflare`. A cópia preenchida não pertence ao ZIP nem deve ser compartilhada. A proteção do `.gitignore` não é criptografia e não torna arquivos públicos seguros.

## Domínio e novas versões
Na Cloudflare, conectar `alamoengenharia.com.br` ao Worker em Settings → Domains & Routes. Configurar redirecionamento de `www` para o domínio principal preservando caminho e parâmetros. Conferir HTTPS e rotas dos artigos por acesso direto. Antes da troca definitiva de DNS, verificar registros de e-mail existentes e regras de cache: nunca cachear POST ou respostas dos formulários.

Após mudar apenas um Secret, aplicar a alteração sem inserir a chave no código. Após alterar fontes ou remetente público: `npm run build` e `npm run deploy:cloudflare`.

## Validação obrigatória antes de abrir o site
1. Contato: selecionar Comercial, enviar identificação de teste e confirmar recebimento em comercial@.
2. Contato: selecionar Recursos Humanos e confirmar recebimento somente na caixa de RH indicada em `mail-config.ts`.
3. Orçamento: enviar solicitação com PNG/JPEG de teste e conferir destinatário e anexo reconstruído.
4. No Resend, conferir cada envio, eventual rejeição/bounce e motivo; conferir também spam/quarentena corporativa. Não considerar a página de agradecimento prova de recebimento.
5. Usar uma instalação local sem chave para verificar que o visitante recebe erro, não agradecimento. Não remover a chave de produção para esse teste.
6. Conferir resposta ao e-mail: Reply-To deve ser o endereço informado pelo visitante.
7. Na Cloudflare, usar observabilidade e `npx wrangler tail --config .output/server/wrangler.json` para diagnóstico. Não publicar logs com dados pessoais ou credenciais.

## Escopo e custos
Cloudflare hospeda o site; Resend envia os e-mails. Cloudflare Email Routing encaminha e-mails recebidos e não substitui o envio de formulários. Limites/custos dependem dos planos de ambas as contas; verifique-os antes do lançamento. Zoho e voz neural mantêm as configurações opcionais separadas e continuam exigindo gateways compatíveis; não inserir essas chaves no navegador.

Referências: https://nitro.build/deploy/providers/cloudflare ; https://developers.cloudflare.com/workers/configuration/secrets/ ; https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/ ; https://resend.com/docs/dashboard/domains/introduction