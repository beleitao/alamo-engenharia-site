import type { SecurityPayload } from "./form-security";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 3000;

const hits = new Map<string, number[]>();

const GLOBAL_MAX_PER_WINDOW = 60;


const SPAM_PATTERNS = [
  /\b(?:viagra|casino|crypto airdrop|seo services|backlinks?)\b/i,
  /<\s*(?:script|iframe)/i,
  /\[url=/i,
];

export type GuardResult = { ok: true } | { ok: false; reason: string };

export function guardSubmission(
  security: SecurityPayload | undefined,
  textBlobs: string[],
  key = "anon",
): GuardResult {
  if (security?.hp) return { ok: false, reason: "honeypot" };

  if (security?.startedAt) {
    const elapsed = Date.now() - security.startedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) return { ok: false, reason: "too_fast" };
  }

  const text = textBlobs.join("\n");
  if (SPAM_PATTERNS.some((re) => re.test(text))) return { ok: false, reason: "spam_pattern" };
  const links = text.match(/https?:\/\//gi)?.length ?? 0;
  if (links > 4) return { ok: false, reason: "too_many_links" };

  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return { ok: false, reason: "rate_limited" };
  recent.push(now);
  hits.set(key, recent);

  const global = (hits.get("__all__") ?? []).filter((t) => now - t < WINDOW_MS);
  if (global.length >= GLOBAL_MAX_PER_WINDOW) return { ok: false, reason: "rate_limited" };
  global.push(now);
  hits.set("__all__", global);

  return { ok: true };
}
