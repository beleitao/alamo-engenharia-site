import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import pmoc from "../src/lib/blog/articles/pmoc-qualidade-ar-interior";
import spda from "../src/lib/blog/articles/quando-revisar-o-spda";

// The production domain was explicitly selected by the site owner.
test("every sitemap URL belongs to the selected production domain", () => {
  const xml = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(urls.length).toBe(32);
  expect(urls.every((url) => new URL(url ?? "").origin === "https://alamoengenharia.com.br")).toBe(true);
});

test("both supplied editorial posts stay published in Conformidade", () => {
  expect(pmoc.status).toBe("published");
  expect(spda.status).toBe("published");
  expect(pmoc.category).toBe("Conformidade");
  expect(spda.category).toBe("Conformidade");
  expect(pmoc.slug).toBe("pmoc-qualidade-ar-interior");
  expect(spda.slug).toBe("quando-revisar-o-spda");
});
