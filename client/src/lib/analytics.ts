type EventProps = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps; callback?: () => void }) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __nsAffiliateClickWired?: boolean;
  }
}

function cleanProps(props?: EventProps): EventProps | undefined {
  if (!props) return undefined;
  const out: EventProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === null) continue;
    out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

export function track(event: string, props?: EventProps): void {
  if (typeof window === "undefined") return;
  const cleaned = cleanProps(props);
  try {
    if (typeof window.plausible === "function") {
      window.plausible(event, cleaned ? { props: cleaned } : undefined);
    }
  } catch (err) {
    console.warn("[analytics] plausible failed", err);
  }
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, cleaned ?? {});
    }
  } catch (err) {
    console.warn("[analytics] gtag failed", err);
  }
}

const AMAZON_AFFILIATE_TAG = "nootropicstk-20";

function isAffiliateLink(href: string): boolean {
  try {
    const url = new URL(href, window.location.origin);
    return url.hostname.endsWith("amazon.com") && url.searchParams.get("tag") === AMAZON_AFFILIATE_TAG;
  } catch {
    return false;
  }
}

function deriveAffiliateProps(anchor: HTMLAnchorElement, url: URL): EventProps {
  const query = url.searchParams.get("k") ?? undefined;
  const text = anchor.textContent?.trim().slice(0, 80) ?? undefined;
  return { destination: url.hostname, query, label: text };
}

export function installAffiliateClickTracking(): void {
  if (typeof window === "undefined") return;
  if (window.__nsAffiliateClickWired) return;
  window.__nsAffiliateClickWired = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !isAffiliateLink(href)) return;
      try {
        const url = new URL(href, window.location.origin);
        track("affiliate_click", deriveAffiliateProps(anchor, url));
      } catch {
        track("affiliate_click");
      }
    },
    { capture: true }
  );
}
