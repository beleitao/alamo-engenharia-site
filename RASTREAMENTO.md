# Rastreamento e entrega

## O que mudou
- Google Tag Manager **GTM-5SCGZLVX**, carregado de forma assíncrona uma única vez no início do head compartilhado.
- Fallback noscript imediatamente após a abertura do body, inclusive em URLs abertas diretamente.
- Evento **alamo_page_view** na primeira página e depois de cada navegação interna resolvida, com `page_path`, `page_location` e `page_title`. O evento customizado exclui parâmetros e fragmentos; não envia nomes, e-mails, telefones nem conteúdo de formulários.
- Links de Trabalhe Conosco abrem nova janela, inclusive no chat. Área do colaborador no rodapé abre o portal TOTVS em nova janela.
- Site temporariamente fixo em português, inclusive para quem tinha outro idioma salvo. Traduções preservadas para retomada futura.
- Transições curtas por CSS, sem biblioteca adicional e com respeito à preferência de movimento reduzido. Imagens e configuração de minificação originais preservadas.

## Configurar posteriormente no Google Tag Manager
1. Use Preview/Tag Assistant para confirmar `gtm.js` e `alamo_page_view` na home, ao navegar e ao abrir uma URL diretamente.
2. Crie variáveis da camada de dados para `page_path`, `page_location` e `page_title`, e um acionador de evento personalizado com nome exato `alamo_page_view`.
3. Para GA4, configure sua Google tag e uma tag de evento `page_view` acionada **somente** pelo evento acima, passando as três variáveis. Desative o envio automático inicial (`send_page_view: false`) e page views por alterações do histórico na medição otimizada. Não acione simultaneamente page views por All Pages/History Change, para não duplicar contagens.
4. Para Hotjar, use o modelo oficial e seu identificador de site. Carregue a tag base uma vez; valide a navegação SPA na documentação atual do Hotjar e use o evento customizado para atualização de rota se necessário, sem reinstalar a tag base.
5. Publique o contêiner depois de testar. GA4 e Hotjar não foram ativados nem configurados nesta entrega; dependem dos IDs e da configuração da sua conta.

## Privacidade e desempenho
- Antes de ativar Analytics, publicidade ou gravações, configure consentimento/CMP e as verificações de consentimento das tags conforme a LGPD e sua política. Este pacote instala GTM, não adiciona banner nem habilita consentimento automaticamente.
- A limpeza vale para o evento customizado, não para todo código instalado via GTM: revise variáveis de URL, referrer e captura automática dos fornecedores. Mascare campos no Hotjar e não envie dados pessoais ao GA4.
- Evite tags duplicadas, HTML customizado desnecessário e gravações antes de consentimento. A velocidade final depende também das tags publicadas no contêiner.
- O ZIP contém fontes para substituir/atualizar no repositório e compilar pelo processo existente. Não é um upload estático: formulários precisam do servidor existente.
- `package.json`, `package-lock.json`, `vite.config.ts`, `cloudflare.config.ts`, scripts de deploy, configurações de e-mail e arquivos de exemplo de variáveis não foram alterados.

## Validação
Os resultados de compilação, testes e navegação estão em `VALIDACAO.md`. Nenhuma publicação no GitHub ou na Cloudflare é feita por esta entrega.