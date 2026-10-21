/** Public deployment settings only. NEVER put API keys in this file. */
export const cloudflareConfig = {
  preset: "cloudflare_module",
  compatibilityDate: "2026-10-21",
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,
    wrangler: {
      name: "alamo-engenharia",
      compatibility_date: "2026-10-21",
      compatibility_flags: ["nodejs_compat", "nodejs_compat_populate_process_env"],
      workers_dev: false,
      routes: [{ pattern: "alamo-staging.bdmtecnologia.com", custom_domain: true }],
      vars: { LEADS_FROM: "Álamo Engenharia <noreply@bdmtecnologia.com>" },
      observability: { enabled: true },
    },
  },
};