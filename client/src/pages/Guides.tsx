import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AffiliateBanner from "@/components/AffiliateBanner";
import { SPONSORED_BANNERS } from "../../../shared/affiliates";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export const GUIDES = [
  {
    slug: "best-nootropic-stack-for-focus",
    title: "The Best Nootropic Stack for Focus in 2026",
    excerpt: "A research-backed guide to building a laser-focus stack using Lion's Mane, Alpha GPC, L-Theanine, and Bacopa Monnieri.",
    category: "Focus",
    readTime: "8 min",
    supplements: ["Lion's Mane", "Alpha GPC", "L-Theanine", "Bacopa Monnieri"],
    featured: true,
    content: `
## Why Stack for Focus?

Single-ingredient nootropics rarely produce dramatic results. The real magic happens when you combine compounds with complementary mechanisms — one boosting acetylcholine, another reducing anxiety, a third supporting neuroplasticity.

## The Core Focus Stack

**1. Alpha GPC (300–600mg)**
The most bioavailable choline source, Alpha GPC directly raises acetylcholine levels — the neurotransmitter most associated with focus and learning. Take it in the morning with food.

**2. L-Theanine (200mg) + Caffeine (100mg)**
The classic pairing. L-Theanine smooths out caffeine's jitteriness while amplifying its focus-enhancing effects. The 2:1 ratio (theanine:caffeine) is well-established in clinical literature.

**3. Bacopa Monnieri (300mg standardized to 50% bacosides)**
A long-term adaptogen that improves working memory and reduces anxiety. Takes 4–8 weeks for full effect. Best taken with fat.

**4. Lion's Mane Mushroom (500–1000mg)**
Stimulates Nerve Growth Factor (NGF), supporting long-term cognitive health and neuroplasticity. Stack with Alpha GPC for synergistic effects.

## Where to Buy

All four ingredients are available at Nootropics Depot with lab-verified purity certificates.
    `,
  },
  {
    slug: "best-nootropic-stack-for-memory",
    title: "Best Nootropic Stack for Memory & Learning",
    excerpt: "Optimize memory consolidation and recall with Bacopa, Huperzine A, Phosphatidylserine, and Omega-3s.",
    category: "Memory",
    readTime: "7 min",
    supplements: ["Bacopa Monnieri", "Phosphatidylserine", "Huperzine A", "Omega-3"],
    featured: true,
    content: `
## Memory Enhancement: The Science

Memory formation involves three stages: encoding, consolidation, and retrieval. The best nootropic stacks target all three.

## The Memory Stack

**1. Bacopa Monnieri (300mg)**
Bacopa is the most clinically validated memory enhancer. Multiple RCTs show significant improvements in verbal learning rate and memory consolidation after 12 weeks.

**2. Phosphatidylserine (100mg 3x/day)**
A phospholipid that maintains cell membrane fluidity in neurons. Shown to improve memory recall and slow age-related cognitive decline.

**3. Huperzine A (50–200mcg)**
Inhibits acetylcholinesterase, keeping acetylcholine available longer. Cycle 2 weeks on, 2 weeks off.

**4. Omega-3 DHA (1000mg+)**
DHA is structurally essential for brain cell membranes. Low DHA is associated with cognitive decline.
    `,
  },
  {
    slug: "best-nootropic-stack-for-energy",
    title: "Clean Energy Stack: No Jitters, No Crash",
    excerpt: "Ditch the energy drinks. Build a sustainable energy stack with Rhodiola, CoQ10, B-Complex, and smart caffeine.",
    category: "Energy",
    readTime: "6 min",
    supplements: ["Rhodiola Rosea", "CoQ10", "Vitamin B12", "L-Theanine"],
    featured: false,
    content: `
## The Problem with Energy Drinks

Most energy drinks rely on massive caffeine doses and sugar — producing a spike followed by a crash. A smart energy stack provides sustained energy through mitochondrial support and stress adaptation.

## The Clean Energy Stack

**1. Rhodiola Rosea (200–400mg)**
An adaptogen that reduces mental fatigue and improves performance under stress. Best taken in the morning on an empty stomach.

**2. CoQ10 (100–200mg)**
Essential for mitochondrial ATP production. Ubiquinol form is more bioavailable for those over 40.

**3. B-Complex (full spectrum)**
B vitamins are cofactors in energy metabolism. Deficiencies in B12 and B6 are common causes of fatigue.

**4. L-Theanine + Caffeine**
The smoothest energy combination available. 200mg theanine with 100mg caffeine provides 4–6 hours of clean focus.
    `,
  },
  {
    slug: "best-nootropic-stack-for-anxiety",
    title: "Calm & Clear: The Anti-Anxiety Nootropic Stack",
    excerpt: "Reduce anxiety and sharpen thinking simultaneously with Ashwagandha, L-Theanine, Magnesium, and GABA.",
    category: "Calm",
    readTime: "7 min",
    supplements: ["Ashwagandha", "L-Theanine", "Magnesium Glycinate", "GABA"],
    featured: false,
    content: `
## Anxiety and Cognitive Performance

Chronic anxiety impairs working memory, decision-making, and creative thinking. Addressing anxiety is often the single highest-leverage intervention for cognitive performance.

## The Calm Stack

**1. Ashwagandha (600mg KSM-66)**
The most studied adaptogen for stress and anxiety. KSM-66 extract shows significant reductions in cortisol and anxiety scores in multiple RCTs.

**2. L-Theanine (200–400mg)**
Promotes alpha brain wave activity — the state associated with relaxed alertness. Non-sedating at standard doses.

**3. Magnesium Glycinate (400mg)**
Magnesium deficiency is extremely common and directly linked to anxiety and poor sleep. Glycinate form is the most bioavailable and gentle on digestion.

**4. GABA (500–750mg)**
The primary inhibitory neurotransmitter. Supplemental GABA may reduce stress and improve sleep quality.
    `,
  },
  {
    slug: "beginners-guide-to-nootropics",
    title: "Beginner's Guide to Nootropics: Start Here",
    excerpt: "Everything you need to know before taking your first nootropic — safety, sourcing, stacking principles, and the best starter supplements.",
    category: "Guide",
    readTime: "12 min",
    supplements: ["L-Theanine", "Lion's Mane", "Bacopa Monnieri"],
    featured: true,
    content: `
## What Are Nootropics?

Nootropics (from the Greek *noos* = mind, *tropos* = turn) are substances that enhance cognitive function. The term was coined by Romanian psychologist Corneliu Giurgea in 1972, who defined them as substances that enhance learning and memory, protect the brain, and have very low toxicity.

## The Golden Rules of Nootropic Stacking

1. **Start with one supplement at a time.** You can't know what's working if you add five things at once.
2. **Give it time.** Many nootropics (Bacopa, Lion's Mane) require 4–12 weeks for full effect.
3. **Source matters.** Buy from vendors with third-party lab testing (COA).
4. **Less is more.** Bigger doses don't always mean better results.
5. **Track your results.** Keep a simple journal of mood, focus, and sleep quality.

## The Best Starter Stack

For beginners, we recommend starting with just two supplements:

**L-Theanine (200mg) + Caffeine (100mg)**
This is the most well-researched, safe, and effective nootropic combination available. If you drink coffee, simply add L-Theanine to your morning routine.

After 2–4 weeks, consider adding **Lion's Mane Mushroom** for long-term neuroplasticity support.
    `,
  },
  {
    slug: "mind-lab-pro-review",
    title: "Mind Lab Pro Review 2026: Is It Worth It?",
    excerpt: "An honest, in-depth review of Mind Lab Pro — the world's most popular all-in-one nootropic stack. We break down every ingredient.",
    category: "Review",
    readTime: "10 min",
    supplements: ["Lion's Mane", "Bacopa Monnieri", "Phosphatidylserine", "Alpha GPC"],
    featured: true,
    content: `
## Mind Lab Pro: The Quick Verdict

Mind Lab Pro is one of the most transparently formulated, well-researched all-in-one nootropic stacks on the market. At $69/month, it's not cheap — but for those who want a single product covering focus, memory, mood, and long-term brain health, it's hard to beat.

## What's In It?

Mind Lab Pro contains 11 ingredients at clinically effective doses:
- Citicoline (250mg)
- Bacopa Monnieri (150mg)
- Lion's Mane Mushroom (500mg)
- Phosphatidylserine (100mg)
- N-Acetyl L-Tyrosine (175mg)
- L-Theanine (100mg)
- Rhodiola Rosea (50mg)
- Maritime Pine Bark Extract (75mg)
- Vitamins B6, B9, B12

## The Verdict

**Pros:** Transparent labeling, quality ingredients, no proprietary blends, vegan capsules, 30-day money-back guarantee.
**Cons:** Premium price, some ingredients slightly underdosed compared to clinical studies.

**Rating: 9/10** — Best all-in-one option for most people.
    `,
  },
];

export default function Guides() {
  const featured = GUIDES.filter((g) => g.featured);
  const rest = GUIDES.filter((g) => !g.featured);

  return (
    <main className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">Stack Guides</h1>
          <p className="text-muted-foreground">
            Research-backed guides to building effective nootropic stacks for every goal.
          </p>
        </div>

        {/* Featured guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featured.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
              <div className="group p-6 rounded-xl border border-border/50 bg-card card-hover h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
                    {guide.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{guide.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {guide.supplements.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs text-muted-foreground border-border/30">
                      {s}
                    </Badge>
                  ))}
                </div>
                <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Banner */}
        <div className="mb-8">
          <AffiliateBanner banner={SPONSORED_BANNERS[0]} />
        </div>

        {/* Rest of guides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
              <div className="group p-5 rounded-xl border border-border/50 bg-card card-hover h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs text-muted-foreground border-border/30">
                    {guide.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{guide.excerpt}</p>
                <span className="text-xs text-primary flex items-center gap-1">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
