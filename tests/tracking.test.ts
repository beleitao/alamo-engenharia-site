import { expect, test } from "bun:test";
import { GTM_ID, pageViewData, trackPageView } from "../src/lib/tag-manager";

test("uses the exact container selected by the owner", () => {
  expect(GTM_ID).toBe("GTM-5SCGZLVX");
});

test("page tracking drops query and fragment values", () => {
  expect(pageViewData("https://alamoengenharia.com.br/contato?email=private@example.com#token", "Contato")).toEqual({
    event: "alamo_page_view", page_path: "/contato",
    page_location: "https://alamoengenharia.com.br/contato", page_title: "Contato",
  });
});

test("tracks initial and subsequent pages once, including a return visit", () => {
  const fake = { location: { href: "https://alamoengenharia.com.br/" }, document: { title: "Álamo" }, dataLayer: [] as Record<string, unknown>[] };
  const browser = fake as unknown as Parameters<typeof trackPageView>[0];
  trackPageView(browser); trackPageView(browser);
  fake.location.href = "https://alamoengenharia.com.br/contato";
  trackPageView(browser);
  fake.location.href = "https://alamoengenharia.com.br/";
  trackPageView(browser);
  expect(fake.dataLayer.map((entry) => entry.page_path)).toEqual(["/", "/contato", "/"]);
});