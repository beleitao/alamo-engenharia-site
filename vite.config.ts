import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Reference target: Node.js 22.12+; confirm this target with the hosting team.
// Keep server endpoints: static-only hosting cannot run forms or article narration.
export default defineConfig({
  plugins: [
    tsconfigPaths(), tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    react(),
    nitro({ preset: process.env.VERCEL ? "vercel" : "node-server" }),
  ],
  build: { minify: true, cssMinify: true, sourcemap: false },
});
