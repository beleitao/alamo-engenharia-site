import { useEffect } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { trackPageView } from "@/lib/tag-manager";

/** Initial view + resolved SPA navigation, without another tracking library. */
export function PageTracking() {
  const href = useRouterState({ select: (state) => state.resolvedLocation?.href });
  useEffect(() => {
    if (!href) return;
    // Let route-specific head metadata settle before publishing the view.
    const frame = window.requestAnimationFrame(() => trackPageView(window));
    return () => window.cancelAnimationFrame(frame);
  }, [href]);
  return null;
}

/** Animate only the new page; preserve header/footer and avoid exit delays. */
export function RouteContent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <div key={pathname} className="page-transition"><Outlet /></div>;
}