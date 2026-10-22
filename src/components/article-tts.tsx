import { useEffect, useRef, useState } from "react";
import { CircleStop, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpeechStreamError, streamSpeech, type NeuralAudioControls } from "@/lib/audio/stream-speech";

type Status = "idle" | "loading" | "playing" | "paused" | "finished" | "error";
const splitText = (text: string, max = 2_800) => {
  const paragraphs = text.split(/\n+/).map((part) => part.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";
  for (const paragraph of paragraphs) {
    const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [paragraph];
    for (const sentence of sentences) {
      if (current && current.length + sentence.length + 1 > max) { chunks.push(current); current = ""; }
      if (sentence.length > max) {
        for (let i = 0; i < sentence.length; i += max) chunks.push(sentence.slice(i, i + max));
      } else current = current ? `${current} ${sentence.trim()}` : sentence.trim();
    }
  }
  if (current) chunks.push(current);
  return chunks;
};

export function ArticleTts({ text }: { text: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Ouça somente o conteúdo editorial deste artigo.");
  const controller = useRef<AbortController | null>(null);
  const paused = useRef(false);
  const pauseResolvers = useRef<Array<() => void>>([]);
  const fallbackQueue = useRef<SpeechSynthesisUtterance[]>([]);
  const neuralControls = useRef<NeuralAudioControls | null>(null);

  const stop = (next: Status = "idle") => {
    controller.current?.abort();
    controller.current = null;
    paused.current = false;
    pauseResolvers.current.splice(0).forEach((resolve) => resolve());
    window.speechSynthesis?.cancel();
    fallbackQueue.current = [];
    setStatus(next);
    if (next === "idle") setMessage("Leitura interrompida.");
  };
  useEffect(() => () => stop("idle"), []);

  const waitWhilePaused = () => paused.current ? new Promise<void>((resolve) => pauseResolvers.current.push(resolve)) : Promise.resolve();
  const fallback = async (chunks: string[], signal: AbortSignal) => {
    if (!("speechSynthesis" in window)) throw new Error("Nenhuma voz está disponível neste dispositivo.");
    setMessage("Usando a voz disponível neste dispositivo.");
    for (const chunk of chunks) {
      signal.throwIfAborted();
      await waitWhilePaused();
      await new Promise<void>((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = "pt-BR";
        utterance.rate = 0.94;
        utterance.onend = () => resolve();
        utterance.onerror = (event) => event.error === "canceled" ? resolve() : reject(new Error("A voz do dispositivo falhou."));
        fallbackQueue.current = [utterance];
        window.speechSynthesis.speak(utterance);
      });
    }
  };
  const play = async () => {
    stop("loading");
    const active = new AbortController();
    controller.current = active;
    const chunks = splitText(text);
    setMessage("Preparando voz neural…");
    try {
      setStatus("playing");
      for (const chunk of chunks) await streamSpeech("/api/tts", chunk, active.signal, waitWhilePaused, (controls) => { neuralControls.current = controls; });
      if (!active.signal.aborted) { setStatus("finished"); setMessage("Leitura concluída."); }
    } catch (error) {
      if (active.signal.aborted) return;
      if (!(error instanceof SpeechStreamError) || error.status !== 503) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Não foi possível reproduzir o artigo.");
        return;
      }
      try {
        setStatus("playing");
        await fallback(chunks, active.signal);
        if (!active.signal.aborted) { setStatus("finished"); setMessage("Leitura concluída com a voz do dispositivo."); }
      } catch (fallbackError) {
        if (active.signal.aborted) return;
        setStatus("error");
        setMessage(fallbackError instanceof Error ? fallbackError.message : error instanceof Error ? error.message : "Não foi possível reproduzir o artigo.");
      }
    }
  };
  const pause = () => {
    paused.current = true;
    void neuralControls.current?.pause();
    window.speechSynthesis?.pause();
    setStatus("paused");
    setMessage("Leitura pausada.");
  };
  const resume = () => {
    paused.current = false;
    void neuralControls.current?.resume();
    window.speechSynthesis?.resume();
    pauseResolvers.current.splice(0).forEach((resolve) => resolve());
    setStatus("playing");
    setMessage("Leitura em andamento.");
  };
  return (
    <section className="mt-6 border-y border-border py-4" aria-labelledby="leitor-artigo">
      <div className="flex flex-wrap items-center gap-2">
        <Volume2 className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id="leitor-artigo" className="mr-2 font-display text-sm font-bold">Leitor acessível</h2>
        {(status === "idle" || status === "finished" || status === "error") && (
          <Button type="button" size="sm" onClick={() => void play()}>
            {status === "finished" ? <RotateCcw /> : <Play />} {status === "finished" ? "Ouvir novamente" : "Ouvir artigo"}
          </Button>
        )}
        {status === "loading" && <Button type="button" size="sm" disabled><Volume2 /> Preparando</Button>}
        {status === "playing" && <Button type="button" size="sm" variant="outline" onClick={pause}><Pause /> Pausar</Button>}
        {status === "paused" && <Button type="button" size="sm" onClick={resume}><Play /> Continuar</Button>}
        {(status === "playing" || status === "paused" || status === "loading") && (
          <Button type="button" size="sm" variant="ghost" onClick={() => stop()}><CircleStop /> Parar</Button>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground" role="status" aria-live="polite">{message}</p>
    </section>
  );
}
