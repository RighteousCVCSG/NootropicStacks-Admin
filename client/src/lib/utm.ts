/**
 * UTM persistence: when a visitor lands with ?utm_source=... params, we save
 * them to sessionStorage so any later affiliate-click event can attribute the
 * traffic source back to its origin (reddit, hn, twitter, email, etc.).
 *
 * GA4 also auto-captures UTMs for traffic-side attribution. This module is for
 * our own DB (affiliate_clicks.referrer) so we can build per-channel revenue
 * dashboards without depending on GA4 export.
 */

const STORAGE_KEY = "nspot_utm_v1";

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  capturedAt?: string;
  landingPath?: string;
}

const PARAM_KEYS: Record<string, keyof UtmParams> = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_term: "term",
  utm_content: "content",
};

export function captureUtmFromUrl(): UtmParams | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const captured: UtmParams = {};
  let any = false;
  for (const [key, target] of Object.entries(PARAM_KEYS)) {
    const v = params.get(key);
    if (v) {
      captured[target] = v;
      any = true;
    }
  }
  if (!any) return readStoredUtm();
  captured.capturedAt = new Date().toISOString();
  captured.landingPath = window.location.pathname;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // ignore quota
  }
  return captured;
}

export function readStoredUtm(): UtmParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UtmParams;
  } catch {
    return null;
  }
}

/**
 * Build the `referrer` string we send with affiliate-click events.
 * Format: "<utm_source>:<utm_campaign>:<inAppContext>" with missing parts as "_".
 * Example: "reddit:launch_w1:stack-widget", "hn:show_hn_v1:supplement-card",
 * "_:_:supplement-detail" when no UTM was captured.
 */
export function buildAttributionReferrer(inAppContext: string): string {
  const utm = readStoredUtm();
  const src = utm?.source || "_";
  const camp = utm?.campaign || "_";
  return `${src}:${camp}:${inAppContext}`;
}
