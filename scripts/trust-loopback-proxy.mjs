import { readFileSync, writeFileSync } from "node:fs";

// The Node preset ignores X-Forwarded-Proto unless srvx trusts the proxy.
// Nginx on this VPS connects from 127.0.0.1, so loopback is enough.
const file = new URL("../.output/server/index.mjs", import.meta.url);
let source;
try {
  source = readFileSync(file, "utf8");
} catch {
  process.exit(0);
}

if (source.includes('trustProxy:"loopback"') || source.includes("trustProxy:'loopback'")) {
  process.exit(0);
}

const marker = "fetch:q.fetch,plugins:[...V]}";
if (!source.includes(marker)) process.exit(0);

writeFileSync(file, source.replace(marker, 'trustProxy:"loopback",fetch:q.fetch,plugins:[...V]}'));
console.log("node server agora confia no proxy local");
