export type SpeechConfig = { baseURL: string; apiKey: string; model: string; voice: string };
export async function requestSpeech(config: SpeechConfig, text: string, signal?: AbortSignal) {
  return fetch(`${config.baseURL}/v1/audio/speech`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: config.model,
      contents: [{ role: "user", parts: [{ text: `Leia em português brasileiro, com voz natural, clara e acolhedora, em ritmo moderado. ${text}` }] }],
      generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: config.voice } } } },
      stream_format: "sse",
    }),
    ...(signal ? { signal } : {}),
  });
}
