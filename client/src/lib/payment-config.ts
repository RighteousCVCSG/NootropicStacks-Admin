// Centralized payment URLs. Update these once Stripe / BMaC are set up.
// Stripe Payment Link: create at https://dashboard.stripe.com/payment-links
// BMaC: https://www.buymeacoffee.com/

export const PAYMENT_CONFIG = {
  // Set this to your Stripe Payment Link URL once created.
  // Example: "https://buy.stripe.com/4gw00j8Yt8t99l66op"
  stripePaymentLink: import.meta.env.VITE_STRIPE_PAYMENT_LINK || "",

  // Set this to your Buy Me a Coffee profile URL once created.
  // Example: "https://www.buymeacoffee.com/nootropicstacker"
  buyMeCoffeeUrl: import.meta.env.VITE_BMAC_URL || "",

  // Friendly default amount shown in CTAs
  tipAmount: "$1",

  // Headline used on /support and modals
  productName: "Starter Stack Guide",
  productPromise: "Tip $1 (or more) and get instant access to the 2026 Starter Stack Guide — 7 evidence-backed protocols, exact dosages, and vendor picks.",
};

export function hasPaymentConfigured(): boolean {
  return Boolean(PAYMENT_CONFIG.stripePaymentLink || PAYMENT_CONFIG.buyMeCoffeeUrl);
}
