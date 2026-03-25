// Affiliate partner display names and logo colors
export const AFFILIATE_PARTNERS = {
  "Nootropics Depot": { color: "#22c55e", description: "Lab-tested raw ingredients" },
  "Mind Lab Pro": { color: "#06b6d4", description: "Premium all-in-one stack" },
  "Neurohacker": { color: "#8b5cf6", description: "Qualia Mind & more" },
  "Onnit": { color: "#f59e0b", description: "Alpha Brain & performance" },
  "Thorne": { color: "#3b82f6", description: "Practitioner-grade quality" },
  "iHerb": { color: "#10b981", description: "Huge catalog, fast shipping" },
  "Four Sigmatic": { color: "#a16207", description: "Mushroom coffee & adaptogens" },
  "AG1": { color: "#65a30d", description: "All-in-one daily nutrition" },
  "Amazon": { color: "#f97316", description: "Fast Prime shipping" },
} as const;

export type AffiliatePartner = keyof typeof AFFILIATE_PARTNERS;

// Sponsored banner ads for the site
export const SPONSORED_BANNERS = [
  {
    id: "mind-lab-pro-banner",
    partner: "Mind Lab Pro" as AffiliatePartner,
    title: "Mind Lab Pro — The World's #1 Nootropic Stack",
    description: "11 research-backed ingredients. 30-day money-back guarantee. Trusted by 1M+ biohackers.",
    cta: "Get 10% Off Today",
    url: "https://www.mindlabpro.com/?a_aid=nootropicstacker",
    badge: "Editor's Pick",
  },
  {
    id: "neurohacker-banner",
    partner: "Neurohacker" as AffiliatePartner,
    title: "Qualia Mind — 28 Ingredients for Peak Performance",
    description: "The most comprehensive nootropic formula. Backed by complex systems science.",
    cta: "Save 15% with Code STACKER",
    url: "https://neurohacker.com/shop/qualia-mind?rfsn=supplement-stacker",
    badge: "Premium",
  },
  {
    id: "ag1-banner",
    partner: "AG1" as AffiliatePartner,
    title: "AG1 — Your Daily Nutritional Foundation",
    description: "75 vitamins, minerals & whole food ingredients. Free travel packs with first order.",
    cta: "Claim Free Gift",
    url: "https://athleticgreens.com/r/nootropicstacker",
    badge: "Free Gift",
  },
  {
    id: "nootropics-depot-banner",
    partner: "Nootropics Depot" as AffiliatePartner,
    title: "Nootropics Depot — Lab-Tested Purity Guaranteed",
    description: "The most trusted source for raw nootropic ingredients. COA on every product.",
    cta: "Shop Lab-Tested Nootropics",
    url: "https://nootropicsdepot.com/?rfsn=supplement-stacker",
    badge: "Most Trusted",
  },
  {
    id: "thorne-banner",
    partner: "Thorne" as AffiliatePartner,
    title: "Thorne — Practitioner-Grade Supplements",
    description: "NSF Certified for Sport. Trusted by professional athletes and healthcare providers.",
    cta: "Shop Thorne",
    url: "https://www.thorne.com/affiliate?ref=nootropicstacker",
    badge: "NSF Certified",
  },
];

// Goal definitions for the recommender
export const GOALS = [
  { id: "focus", label: "Focus", icon: "🎯", description: "Sharpen concentration and eliminate distractions", color: "oklch(0.65 0.2 290)" },
  { id: "memory", label: "Memory", icon: "🧠", description: "Improve recall, learning speed, and retention", color: "oklch(0.78 0.15 200)" },
  { id: "energy", label: "Energy", icon: "⚡", description: "Boost mental and physical energy without crashes", color: "oklch(0.78 0.18 75)" },
  { id: "mood", label: "Mood", icon: "😊", description: "Elevate mood, motivation, and emotional resilience", color: "oklch(0.72 0.2 165)" },
  { id: "creativity", label: "Creativity", icon: "✨", description: "Unlock creative flow and divergent thinking", color: "oklch(0.72 0.18 330)" },
  { id: "sleep", label: "Sleep", icon: "🌙", description: "Improve sleep quality and recovery", color: "oklch(0.6 0.15 240)" },
  { id: "anxiety", label: "Calm", icon: "🧘", description: "Reduce anxiety and stress for clear thinking", color: "oklch(0.65 0.22 25)" },
] as const;

export type GoalId = typeof GOALS[number]["id"];
