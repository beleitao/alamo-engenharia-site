# Maintenance rules
- Preserve TanStack Start file routing and server functions; a static-only export cannot preserve form and speech endpoints.
- Deploy with the Cloudflare Workers Nitro adapter and Wrangler, not static Pages uploads; server endpoints must remain executable.
- Keep public hosting variables in cloudflare.config.ts and private values in Cloudflare Secrets; process.env is populated at request time by Node compatibility flags.
- Keep credentials server-only and do not put real environment files in source archives.
- Add editorial articles with explicit static imports and registry entries so direct article URLs render on the server.
- Keep logo and contract map lossless with their original geometry and points.
- Update canonical URLs and sitemap together when changing the production domain or public page catalogue.
- Preserve attachment pixel decoding/re-encoding, server validation and CSRF protection during maintenance.
- Keep comments in editable sources; minify compiled bundles, not the source handoff.
