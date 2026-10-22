/** Public container identifier; never put credentials in this module. */
export const GTM_ID = "GTM-5SCGZLVX";
export const GTM_NOSCRIPT_URL = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;

// Google's asynchronous bootstrap, rendered once in the shared document head.
export const GTM_BOOTSTRAP = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

type TrackingWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  __alamoLastPage?: string;
};

/** Exclude query strings/fragments: they may contain form values or tokens. */
export function pageViewData(href: string, title: string) {
  const url = new URL(href);
  return {
    event: "alamo_page_view",
    page_path: url.pathname,
    page_location: `${url.origin}${url.pathname}`,
    page_title: title,
  };
}

/** Run only after React commits a resolved route; never during SSR. */
export function trackPageView(browser: TrackingWindow) {
  const data = pageViewData(browser.location.href, browser.document.title);
  if (browser.__alamoLastPage === data.page_location) return;
  browser.__alamoLastPage = data.page_location;
  browser.dataLayer = browser.dataLayer || [];
  browser.dataLayer.push(data);
}