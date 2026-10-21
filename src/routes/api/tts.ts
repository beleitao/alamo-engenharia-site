import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { requestSpeech } from "@/lib/audio/speech.server";
const inputSchema = z.object({ text: z.string().trim().min(1).max(4_000) });
export const Route = createFileRoute("/api/tts")({
  server: { handlers: { POST: async ({ request }) => {
    const apiKey = process.env["SPEECH_GATEWAY_API_KEY"];
    const speechURL = process.env["SPEECH_GATEWAY_URL"];
    if (!apiKey || !speechURL?.startsWith("https://")) return Response.json({ message: "A voz neural ainda não está configurada. Use a voz do dispositivo." }, { status: 503 });
    let payload: unknown;
    try { payload = await request.json(); } catch { return Response.json({ message: "Conteúdo de leitura inválido." }, { status: 400 }); }
    const parsed = inputSchema.safeParse(payload);
    if (!parsed.success) return Response.json({ message: "O trecho enviado para leitura é inválido." }, { status: 400 });
    try {
      const upstream = await requestSpeech({ baseURL: speechURL, apiKey, model: process.env["SPEECH_MODEL"] ?? "google/gemini-3.1-flash-tts-preview", voice: "Kore" }, parsed.data.text, request.signal);
      const headers = new Headers({ "Content-Type": upstream.headers.get("content-type") ?? "application/json", "Cache-Control": "no-cache" });
      return new Response(upstream.body, { status: upstream.status, headers });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return new Response(null, { status: 499 });
      return Response.json({ message: "A narração está temporariamente indisponível." }, { status: 502 });
    }
  } } },
});
