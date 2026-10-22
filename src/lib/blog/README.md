# Publicação de artigos

1. Copie um arquivo de `articles/` e troque `slug`, título, descrição, categoria, data, imagem, seções, checklist, CTA e fontes.
2. Use uma URL curta e permanente em `slug`; depois de publicado, não a altere.
3. `status: "draft"` nunca aparece. Com `status: "published"`, o artigo aparece automaticamente quando `date` chegar.
4. Use apenas fatos verificáveis. Vincule normas, leis ou publicações técnicas em `sources`.
5. Escolha uma `imageKey` existente. O texto alternativo deve explicar a atividade mostrada, sem repetir o título.
6. Revise no celular, teste os links e confirme que título e descrição refletem exatamente o conteúdo.

7. Registre o novo arquivo com import estático e entrada em `articleModules` de `index.ts`.
8. Atualize `public/sitemap.xml` quando o artigo for publicado.
