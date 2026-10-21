import { createParser } from "eventsource-parser";
export class SpeechStreamError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}
export type NeuralAudioControls = { pause: () => Promise<void>; resume: () => Promise<void> };
function decodePCM(pending: Uint8Array, incoming: Uint8Array) {
  const bytes = new Uint8Array(pending.length + incoming.length); bytes.set(pending); bytes.set(incoming, pending.length);
  const usable = bytes.length - (bytes.length % 2); const view = new DataView(bytes.buffer); const samples = new Float32Array(usable / 2);
  for (let i = 0; i < samples.length; i += 1) samples[i] = view.getInt16(i * 2, true) / 32768;
  return { samples, pending: bytes.slice(usable) };
}
export async function streamSpeech(endpoint: string, text: string, signal: AbortSignal, waitWhilePaused: () => Promise<void>, registerControls?: (controls: NeuralAudioControls | null) => void) {
  signal.throwIfAborted(); const context = new AudioContext({ sampleRate: 24_000 }); const sources = new Set<AudioBufferSourceNode>();
  const cancel = () => { for (const source of sources) { try { source.stop(); } catch { /* already stopped */ } } };
  signal.addEventListener("abort", cancel, { once: true }); let playhead = 0; let pending = new Uint8Array(0); let completed = false; let samplesPlayed = 0; let finalPlayback = Promise.resolve();
  registerControls?.({ pause: () => context.suspend().then(() => undefined), resume: () => context.resume().then(() => undefined) });
  try {
    if (context.state === "suspended") await context.resume();
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }), signal });
    if (!response.ok || !response.body) { const data = await response.json().catch(() => ({ message: "Não foi possível iniciar a leitura." })); throw new SpeechStreamError(typeof data.message === "string" ? data.message : "Não foi possível iniciar a leitura.", response.status); }
    const parser = createParser({ onEvent(event) {
      const payload = JSON.parse(event.data) as { type?: string; audio?: string; error?: { message?: string } };
      if (payload.type === "error" || payload.error) throw new Error(payload.error?.message ?? "A leitura foi interrompida.");
      if (payload.type === "speech.audio.done") { completed = true; return; }
      if (payload.type !== "speech.audio.delta" || !payload.audio) return;
      const decoded = decodePCM(pending, Uint8Array.from(atob(payload.audio), (char) => char.charCodeAt(0))); pending = decoded.pending; if (!decoded.samples.length) return; samplesPlayed += decoded.samples.length;
      const buffer = context.createBuffer(1, decoded.samples.length, 24_000); buffer.copyToChannel(decoded.samples, 0); const source = context.createBufferSource(); source.buffer = buffer; source.connect(context.destination); sources.add(source);
      finalPlayback = new Promise<void>((resolve) => { source.onended = () => { sources.delete(source); resolve(); }; }); playhead = Math.max(playhead, context.currentTime + 0.05); source.start(playhead); playhead += buffer.duration;
    } });
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    try { while (true) { signal.throwIfAborted(); await waitWhilePaused(); const next = await reader.read(); if (next.done) break; parser.feed(next.value); } parser.reset({ consume: true }); } finally { reader.releaseLock(); }
    if (!completed || !samplesPlayed || pending.length) throw new Error("A leitura recebida ficou incompleta."); await finalPlayback;
  } finally { registerControls?.(null); signal.removeEventListener("abort", cancel); cancel(); await context.close(); }
}
