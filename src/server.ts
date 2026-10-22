import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const PRODUCTION_HOSTS = new Set(["alamoengenharia.com.br", "www.alamoengenharia.com.br"]);
const STAGING_HOST = "alamo-staging.bdmtecnologia.com";

function redirectVercelHost(request: Request): Response | null {
  const url = new URL(request.url);
  if (!url.hostname.endsWith(".vercel.app")) return null;
  url.protocol = "https:";
  url.hostname = STAGING_HOST;
  return new Response(null, { status: 308, headers: { location: url.toString() } });
}

function withStagingRobots(request: Request, response: Response): Response {
  const host = new URL(request.url).hostname;
  if (PRODUCTION_HOSTS.has(host)) return response;
  const headers = new Headers(response.headers);
  headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const masked = redirectVercelHost(request);
    if (masked) return masked;
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withStagingRobots(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return withStagingRobots(
        request,
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
