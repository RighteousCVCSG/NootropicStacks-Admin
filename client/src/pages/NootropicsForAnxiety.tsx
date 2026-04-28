import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ShieldCheck, Brain, AlertTriangle, ArrowRight, ShoppingCart, ExternalLink } from "lucide-react";

const ANXIETY_NOOTROPICS = [
  {
    rank: 1,
    name: "Ashwagandha",
    slug: "ashwagandha",
    subtitle: "KSM-66 Extract",
    score: 9.0,
    mechanism: "KSM-66 ashwagandha directly reduces serum cortisol levels and downregulates HPA axis hyperactivity. Multiple double-blind RCTs show significant reductions in anxiety scores (GAD-7) within 8 weeks.",
    dosage: "600mg KSM-66 extract daily",
    evidence: "Strong",
  },
  {
    rank: 2,
    name: "L-Theanine",
    slug: "l-theanine",
    subtitle: "GABA Modulation",
    score: 8.7,
    mechanism: "Promotes alpha brain wave activity — the state of relaxed alertness — via GABA-A receptor modulation and glutamate inhibition. Non-sedating at standard doses. Synergistic with caffeine.",
    dosage: "200–400mg as needed",
    evidence: "Strong",
  },
  {
    rank: 3,
    name: "Magnesium Glycinate",
    slug: "magnesium-glycinate",
    subtitle: "NMDA Modulation",
    score: 8.4,
    mechanism: "Magnesium acts as a natural NMDA receptor antagonist, blocking excitotoxicity and calming overactive neural circuits. Glycinate form is the most bioavailable and gentle on digestion. Deficiency is extremely common.",
    dosage: "400mg elemental magnesium before bed",
    evidence: "Moderate",
  },
  {
    rank: 4,
    name: "Rhodiola Rosea",
    slug: "rhodiola-rosea",
    subtitle: "HPA Axis Adaptogen",
    score: 8.1,
    mechanism: "Salidroside and rosavins modulate cortisol and adrenaline release via HPA axis regulation. Particularly effective for anxiety triggered by stress and burnout rather than generalized anxiety.",
    dosage: "200–400mg on an empty stomach",
    evidence: "Moderate",
  },
  {
    rank: 5,
    name: "Lion's Mane Mushroom",
    slug: "lions-mane",
    subtitle: "Nerve Growth, Mood",
    score: 7.8,
    mechanism: "NGF stimulation supports hippocampal neurogenesis, which is inversely correlated with anxiety severity. A 2010 clinical study showed reduced anxiety and irritability in menopausal women after 4 weeks.",
    dosage: "500–1000mg daily",
    evidence: "Limited",
  },
  {
    rank: 6,
    name: "Phosphatidylserine",
    slug: "phosphatidylserine",
    subtitle: "Cortisol Blunting",
    score: 7.5,
    mechanism: "Blunts exercise- and stress-induced cortisol spikes by modulating ACTH secretion from the pituitary. Particularly effective when anxiety is tied to high-intensity training or chronic cognitive load.",
    dosage: "300mg (100mg 3× daily)",
    evidence: "Moderate",
  },
  {
    rank: 7,
    name: "Bacopa Monnieri",
    slug: "bacopa-monnieri",
    subtitle: "Anxiolytic Effects",
    score: 7.3,
    mechanism: "Bacosides produce anxiolytic effects comparable to benzodiazepines in animal models via GABA-A modulation — without sedation. Human trials confirm reduced anxiety at 300mg over 12 weeks.",
    dosage: "300mg (50% bacosides) with fat",
    evidence: "Moderate",
  },
  {
    rank: 8,
    name: "CBD",
    slug: "cbd",
    subtitle: "Emerging Evidence",
    score: 6.8,
    mechanism: "Acts on 5-HT1A serotonin receptors and CB1/CB2 endocannabinoid receptors with documented anxiolytic effects in preclinical and some human studies. Quality and dosage vary enormously between products — buy COA-verified only.",
    dosage: "25–75mg sublingual, as needed",
    evidence: "Limited",
  },
];

const EVIDENCE_COLORS: Record<string, string> = {
  Strong: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Moderate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Limited: "bg-muted text-muted-foreground border-border/30",
};

const AVOID_LIST = [
  { name: "High-dose caffeine", reason: "Directly raises cortisol and adrenaline. Exacerbates anxiety in most people above 200mg." },
  { name: "Racetams (Piracetam, Aniracetam)", reason: "Increase acetylcholine and glutamate activity, which can amplify anxiety in sensitive individuals." },
  { name: "Synephrine / Yohimbine", reason: "Alpha-2 adrenergic antagonists that increase norepinephrine — a direct anxiety pathway amplifier." },
  { name: "DMAA / Geranamine", reason: "Potent stimulant with unpredictable cardiovascular effects. No legitimate use for anxiety management." },
];

export default function NootropicsForAnxiety() {
  const trackClick = trpc.affiliate.trackClick.useMutation();

  const handleBuy = (url: string, partner: string, supplement: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    trackClick.mutate({ supplementSlug: supplement, affiliatePartner: partner, destinationUrl: url, referrer: "nootropics-for-anxiety" });
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">

        {/* Hero */}
        <div className="mb-6">
          <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 mb-4">Anxiety & Calm</Badge>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Best Nootropics for Anxiety in 2026 (Evidence-Based)
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Natural compounds ranked by clinical evidence, mechanism quality, and safety profile for anxiety reduction.
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="mb-10 border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">This is not medical advice.</strong> Anxiety disorders are medical conditions that require professional evaluation. The compounds below may support general stress and subclinical anxiety — they are not replacements for therapy, medication, or psychiatric care. Please consult a qualified healthcare provider for clinical anxiety.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How Anxiety Works */}
        <Card className="mb-10 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="w-5 h-5 text-primary" />
              The Neuroscience of Anxiety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Anxiety is fundamentally an overactivation of the brain's threat-detection systems — primarily the amygdala — combined with insufficient top-down regulation from the prefrontal cortex. At the neurochemical level, this manifests as insufficient <strong className="text-foreground">GABA</strong> (the brain's main inhibitory neurotransmitter), excessive <strong className="text-foreground">glutamate</strong> (excitatory), and dysregulation of the <strong className="text-foreground">HPA axis</strong> (hypothalamic-pituitary-adrenal) — the system governing cortisol release. Chronic anxiety creates a self-reinforcing loop: elevated cortisol suppresses GABA synthesis and shrinks hippocampal volume, which further impairs the brain's ability to regulate stress responses.
            </p>
            <p>
              Effective nootropic interventions for anxiety work through three complementary strategies: GABA system support (L-Theanine, Magnesium), HPA axis normalization (Ashwagandha, Rhodiola, Phosphatidylserine), and neuroplasticity support (Lion's Mane, Bacopa). The most durable results combine all three approaches rather than relying on a single mechanism. Unlike benzodiazepines — which force GABA activity and create dependency — these adaptogens modulate stress systems without rebound effects.
            </p>
          </CardContent>
        </Card>

        {/* Ranked List */}
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
          Top 8 Nootropics for Anxiety — Ranked
        </h2>

        <div className="space-y-4 mb-12">
          {ANXIETY_NOOTROPICS.map((item) => {
            const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(item.name)}+supplement&tag=nootropicstk-20`;
            const iherbUrl = `https://www.iherb.com/search?kw=${encodeURIComponent(item.name)}`;
            return (
              <Card key={item.slug} className="border-border/50">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-400">#{item.rank}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-display font-bold text-foreground text-lg">{item.name}</h3>
                        <span className="text-sm text-muted-foreground">— {item.subtitle}</span>
                        <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs ml-auto">
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
                        {item.slug !== "cbd" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7 border-border/50 hover:border-primary/50"
                              onClick={() => handleBuy(amazonUrl, "amazon", item.slug)}
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Amazon
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7 border-border/50 hover:border-emerald-500/50"
                              onClick={() => handleBuy(iherbUrl, "iherb", item.slug)}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              iHerb
                            </Button>
                          </>
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

        {/* What to Avoid */}
        <Card className="mb-10 border-red-500/20 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              What to Avoid If You Have Anxiety
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {AVOID_LIST.map((item) => (
                <div key={item.name} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* The Calm Stack */}
        <Card className="mb-10 border-emerald-500/20 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              The Calm Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              This three-compound foundation covers the core anxiety pathways: HPA axis normalization, GABA modulation, and neuronal excitability damping — without sedation or dependency risk.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: "Ashwagandha", dose: "600mg KSM-66", role: "HPA axis, cortisol" },
                { name: "L-Theanine", dose: "200–400mg", role: "GABA, alpha waves" },
                { name: "Magnesium Glycinate", dose: "400mg", role: "NMDA, nervous system" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg border border-border/40 bg-card">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-xs text-emerald-400 ml-1">{item.dose}</span>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Take Ashwagandha with breakfast, L-Theanine as needed throughout the day, and Magnesium Glycinate before bed. Most users notice meaningful results within 2–4 weeks, with full effects at 8 weeks.
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/builder">
                Build This Stack <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8 px-6 rounded-xl border border-border/50 bg-card">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Personalize Your Calm Stack
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Use the stack builder to customize compounds, dosages, and timing for your specific anxiety patterns.
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
