import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Brain, Zap, AlertTriangle, ArrowRight, ShoppingCart } from "lucide-react";

const FOCUS_NOOTROPICS = [
  {
    rank: 1,
    name: "L-Theanine + Caffeine",
    slug: "l-theanine",
    subtitle: "The Classic Combo",
    score: 9.1,
    mechanism: "L-Theanine promotes alpha brain waves and modulates GABA, while caffeine blocks adenosine receptors. Together they deliver smooth, jitter-free focus.",
    dosage: "200mg L-Theanine + 100mg Caffeine",
    evidence: "Strong",
  },
  {
    rank: 2,
    name: "Alpha GPC",
    slug: "alpha-gpc",
    subtitle: "Acetylcholine Precursor",
    score: 8.8,
    mechanism: "The most bioavailable choline source. Directly raises acetylcholine — the neurotransmitter most associated with focused attention and working memory.",
    dosage: "300–600mg in the morning",
    evidence: "Strong",
  },
  {
    rank: 3,
    name: "Lion's Mane Mushroom",
    slug: "lions-mane",
    subtitle: "NGF Stimulation",
    score: 8.5,
    mechanism: "Stimulates Nerve Growth Factor (NGF) synthesis, promoting neuroplasticity and long-term cognitive resilience. Effects compound over weeks of use.",
    dosage: "500–1000mg daily",
    evidence: "Moderate",
  },
  {
    rank: 4,
    name: "Bacopa Monnieri",
    slug: "bacopa-monnieri",
    subtitle: "Reduces Distractibility",
    score: 8.2,
    mechanism: "Bacosides modulate serotonin and dopamine systems, reducing anxiety-driven distractibility. Multiple RCTs confirm improved working memory and attention.",
    dosage: "300mg (50% bacosides) with fat",
    evidence: "Strong",
  },
  {
    rank: 5,
    name: "Rhodiola Rosea",
    slug: "rhodiola-rosea",
    subtitle: "Anti-Fatigue Adaptogen",
    score: 7.9,
    mechanism: "Modulates stress hormones via the HPA axis, reducing cognitive fatigue under pressure. Particularly effective for focus during sleep deprivation or high stress.",
    dosage: "200–400mg on an empty stomach",
    evidence: "Moderate",
  },
  {
    rank: 6,
    name: "Modafinil Analogs",
    slug: "modafinil",
    subtitle: "Prescription Territory",
    score: 7.5,
    mechanism: "Eugeroic compounds that promote wakefulness via orexin and dopamine pathways. Extremely effective but require a prescription in most countries — not OTC.",
    dosage: "Prescription only — see a doctor",
    evidence: "Strong",
  },
  {
    rank: 7,
    name: "Noopept",
    slug: "noopept",
    subtitle: "Mild Racetam",
    score: 7.2,
    mechanism: "A synthetic peptide that modulates AMPA receptors and increases BDNF and NGF expression. Mild stimulant quality with anxiolytic properties at low doses.",
    dosage: "10–30mg, cycle on/off",
    evidence: "Limited",
  },
  {
    rank: 8,
    name: "Phosphatidylserine",
    slug: "phosphatidylserine",
    subtitle: "Membrane Support",
    score: 7.0,
    mechanism: "A phospholipid that maintains neuronal membrane fluidity, blunts cortisol spikes, and supports dopamine receptor density — all relevant to sustained focus.",
    dosage: "100mg three times daily",
    evidence: "Moderate",
  },
];

const EVIDENCE_COLORS: Record<string, string> = {
  Strong: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Moderate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Limited: "bg-muted text-muted-foreground border-border/30",
};

const FOCUS_FAQ = [
  {
    q: "How quickly do focus nootropics work?",
    a: "It depends on the compound. L-Theanine + Caffeine works within 30–60 minutes. Alpha GPC is noticeable within a week. Lion's Mane and Bacopa require 4–8 weeks for full effect. Layer short-acting and long-acting compounds for both immediate and sustained results.",
  },
  {
    q: "Are nootropics safe to combine?",
    a: "Most evidence-backed natural nootropics are safe to combine at recommended doses. Start with one compound, assess tolerance, then add others. Avoid stacking multiple stimulants. If you take medications, consult your doctor — some nootropics affect cytochrome P450 metabolism.",
  },
  {
    q: "What's the difference between focus and flow state?",
    a: "Focus is directed attention on a task. Flow state adds a subjective quality of effortlessness and intrinsic reward — heavily tied to dopamine. The best focus stacks address both: acetylcholine for attention sharpness, dopamine precursors (L-Tyrosine) for motivation-driven flow.",
  },
  {
    q: "Can I take focus nootropics every day?",
    a: "Most natural nootropics (Lion's Mane, Bacopa, L-Theanine) are fine daily. Caffeine benefits from cycling to prevent tolerance. Huperzine A and Noopept should be cycled (2 weeks on / 2 weeks off). Alpha GPC is generally well-tolerated daily.",
  },
];

export default function NootropicsForFocus() {
  const trackClick = trpc.affiliate.trackClick.useMutation();

  const handleBuy = (url: string, partner: string, supplement: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    trackClick.mutate({ supplementSlug: supplement, affiliatePartner: partner, destinationUrl: url, referrer: "nootropics-for-focus" });
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">

        {/* Hero */}
        <div className="mb-10">
          <Badge className="bg-primary/15 text-primary border-primary/30 mb-4">Focus</Badge>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            The Best Nootropics for Focus in 2026
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Ranked by evidence quality, mechanism clarity, and real-world effectiveness — with dosage guidelines and where to buy.
          </p>
        </div>

        {/* How Focus Works */}
        <Card className="mb-10 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="w-5 h-5 text-primary" />
              How Focus Works Neurologically
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Sustained focus is governed primarily by the prefrontal cortex (PFC) — the brain's executive control center. The PFC relies on three key neurotransmitter systems: <strong className="text-foreground">acetylcholine</strong> for attentional sharpness and working memory, <strong className="text-foreground">dopamine</strong> for motivation and task prioritization, and <strong className="text-foreground">norepinephrine</strong> for signal-to-noise filtering — helping the brain ignore irrelevant stimuli. When any of these systems underperform, focus degrades predictably: low acetylcholine produces brain fog, low dopamine creates task-switching and procrastination, low norepinephrine causes distractibility.
            </p>
            <p>
              Most focus failures aren't about intelligence — they're about neurochemical deficits. Chronic stress elevates cortisol, which actively suppresses PFC function. Poor sleep degrades acetylcholine synthesis. A diet low in choline precursors limits the raw material for acetylcholine production. The best nootropic strategies address these root causes directly, rather than just adding stimulant pressure on an already depleted system.
            </p>
          </CardContent>
        </Card>

        {/* Ranked List */}
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Top 8 Nootropics for Focus — Ranked
        </h2>

        <div className="space-y-4 mb-12">
          {FOCUS_NOOTROPICS.map((item) => {
            const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(item.name)}+supplement&tag=nootropicstk-20`;
            return (
              <Card key={item.slug} className="border-border/50">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">#{item.rank}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-display font-bold text-foreground text-lg">{item.name}</h3>
                        <span className="text-sm text-muted-foreground">— {item.subtitle}</span>
                        <Badge className="bg-primary/15 text-primary border-primary/30 text-xs ml-auto">
                          {item.score}/10
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.mechanism}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs text-muted-foreground bg-card border border-border/40 px-2 py-1 rounded">
                          Dose: {item.dosage}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${EVIDENCE_COLORS[item.evidence]}`}
                        >
                          Evidence: {item.evidence}
                        </Badge>
                        {item.name !== "Modafinil Analogs" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 border-border/50 hover:border-primary/50"
                            onClick={() => handleBuy(amazonUrl, "amazon", item.slug)}
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Amazon
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Separator className="mb-10 border-border/30" />

        {/* The Ultimate Focus Stack */}
        <Card className="mb-10 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-primary" />
              The Ultimate Focus Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              After years of community testing and cross-referencing clinical literature, this combination produces the most consistent, well-rounded focus enhancement without overstimulation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "L-Theanine", dose: "200mg", role: "Smooth focus, anti-jitter" },
                { name: "Caffeine", dose: "100mg", role: "Attention, wakefulness" },
                { name: "Alpha GPC", dose: "300mg", role: "Acetylcholine boost" },
                { name: "Lion's Mane", dose: "500mg", role: "Neuroplasticity, long-term" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-card">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-primary ml-1">{item.dose}</span>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Take L-Theanine + Caffeine + Alpha GPC together in the morning. Lion's Mane can be taken any time. This stack provides immediate focus via the caffeine/theanine synergy, medium-term acetylcholine support from Alpha GPC, and long-term neuroplasticity from Lion's Mane.
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/builder">
                Build This Stack <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Separator className="mb-10 border-border/30" />

        {/* FAQ */}
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">Focus Nootropics FAQ</h2>
        <div className="space-y-4 mb-12">
          {FOCUS_FAQ.map((item) => (
            <Card key={item.q} className="border-border/50">
              <CardContent className="pt-5 pb-5">
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stimulant Warning */}
        <Card className="mb-10 border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-5 pb-5">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">A Note on Stimulants</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Stimulant-based focus compounds (high-dose caffeine, modafinil, amphetamines) work by forcing neurochemical output — not building capacity. Daily reliance creates tolerance, depletes dopamine precursors, and degrades natural focus over time. Use stimulants strategically, not as a baseline. The best long-term focus stacks build the brain's natural capacity through acetylcholine support, neuroplasticity, and stress reduction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8 px-6 rounded-xl border border-border/50 bg-card">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Ready to Build Your Focus Stack?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Use our stack builder to create a personalized focus protocol with dosage guidance and interaction checks.
          </p>
          <Button asChild size="lg">
            <Link href="/builder">
              Open Stack Builder <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

      </div>
    </main>
  );
}
