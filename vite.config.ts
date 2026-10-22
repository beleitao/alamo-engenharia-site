import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { cloudflareConfig } from "./cloudflare.config";

// DEPLOY_TARGET=node builds the VPS server. The default remains the Cloudflare Worker.
const nitroConfig = process.env.DEPLOY_TARGET === "node" ? { preset: "node-server" } : cloudflareConfig;

// Server functions must run on Node or Workers. A static upload cannot send forms.
export default defineConfig({
  plugins: [
    tsconfigPaths(), tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    react(), nitro(nitroConfig),
  ],
  build: { minify: true, cssMinify: true, sourcemap: false },
});
