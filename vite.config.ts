import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { cloudflareConfig } from "./cloudflare.config";

// Cloudflare Workers executes server functions; static uploads do not.
// Keep server endpoints: static-only hosting cannot run forms or article narration.
export default defineConfig({
  plugins: [
    tsconfigPaths(), tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    react(), nitro(cloudflareConfig),
  ],
  build: { minify: true, cssMinify: true, sourcemap: false },
});
