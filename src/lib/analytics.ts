/**
 * Minimal Google Analytics 4 helper.
 * The gtag.js snippet (with this measurement ID) already lives in public/index.html.
 * Every call below is a safe no-op when gtag is blocked or not yet loaded
 * (e.g. ad blockers), so tracking never breaks the site.
 */

export const GA_MEASUREMENT_ID = "G-TWHXWB1MQQ";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

/** Send a named GA4 event. */
export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  gtag("event", eventName, params);
}

/** Manually log a page view (used for client-side route changes). */
export function trackPageView(path: string): void {
  trackEvent("page_view", {
    page_path: path,
    page_location: window.location.origin + path,
  });
}
