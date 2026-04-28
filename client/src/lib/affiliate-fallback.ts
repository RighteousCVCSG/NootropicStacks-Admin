const AMAZON_TAG = "nootropicstk-20";

export function amazonFallbackUrl(name: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(name)}+supplement&tag=${AMAZON_TAG}`;
}

export function iherbFallbackUrl(name: string): string {
  return `https://www.iherb.com/search?kw=${encodeURIComponent(name)}`;
}

export function resolveAmazonUrl(stored: string | null | undefined, name: string): string {
  return stored && stored.length > 0 ? stored : amazonFallbackUrl(name);
}

export function resolveBuyUrl(stored: string | null | undefined, name: string): string {
  return stored && stored.length > 0 ? stored : amazonFallbackUrl(name);
}
