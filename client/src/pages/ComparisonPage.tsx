import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, GitCompareArrows, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

type EvidenceLevel = "Strong" | "Moderate" | "Emerging";

interface SupplementData {
  name: string;
  slug: string;
  primaryBenefit: string;
  mechanism: string;
  typicalDose: string;
  onset: string;
  evidenceLevel: EvidenceLevel;
  safetyProfile: string;
  stacksWith: string[];
  bestFor: string[];
  amazonUrl: string;
}

const SUPPLEMENTS: SupplementData[] = [
  {
    name: "L-Theanine",
    slug: "l-theanine",
    primaryBenefit: "Calm, focused alertness",
    mechanism: "Promotes alpha brain wave activity; modulates GABA and glutamate receptors",
    typicalDose: "100–200mg",
    onset: "Acute (30–60 min)",
    evidenceLevel: "Strong",
    safetyProfile: "Excellent — no known serious side effects at standard doses",
    stacksWith: ["Caffeine", "Ashwagandha", "Bacopa Monnieri"],
    bestFor: ["Focus", "Anxiety reduction", "Sleep quality"],
    amazonUrl: "https://www.amazon.com/s?k=l-theanine+supplement&tag=nootropicstk-20",
  },
  {
    name: "Ashwagandha",
    slug: "ashwagandha",
    primaryBenefit: "Stress resilience and cortisol reduction",
    mechanism: "HPA axis modulation; reduces cortisol; GABA-mimetic activity",
    typicalDose: "300–600mg KSM-66 or Sensoril extract",
    onset: "Cumulative (2–4 weeks)",
    evidenceLevel: "Strong",
    safetyProfile: "Good — rare GI discomfort; avoid in pregnancy",
    stacksWith: ["Rhodiola", "L-Theanine", "Magnesium Glycinate"],
    bestFor: ["Stress", "Anxiety", "Sleep", "Recovery"],
    amazonUrl: "https://www.amazon.com/s?k=ashwagandha+ksm66&tag=nootropicstk-20",
  },
  {
    name: "Lion's Mane",
    slug: "lions-mane",
    primaryBenefit: "Neuroplasticity and long-term brain health",
    mechanism: "Stimulates Nerve Growth Factor (NGF) and BDNF production",
    typicalDose: "500–1000mg (fruiting body extract)",
    onset: "Cumulative (4–8 weeks)",
    evidenceLevel: "Moderate",
    safetyProfile: "Excellent — well tolerated; rare mushroom allergy possible",
    stacksWith: ["Alpha GPC", "Bacopa Monnieri", "Omega-3 DHA"],
    bestFor: ["Memory", "Neuroplasticity", "Mood", "Long-term brain health"],
    amazonUrl: "https://www.amazon.com/s?k=lions+mane+mushroom+extract&tag=nootropicstk-20",
  },
  {
    name: "Bacopa Monnieri",
    slug: "bacopa-monnieri",
    primaryBenefit: "Memory consolidation and recall",
    mechanism: "Enhances synaptic communication; antioxidant neuroprotection; bacosides",
    typicalDose: "300mg standardized to 50% bacosides",
    onset: "Cumulative (8–12 weeks)",
    evidenceLevel: "Strong",
    safetyProfile: "Good — take with food to minimize GI side effects",
    stacksWith: ["Phosphatidylserine", "Alpha GPC", "Lion's Mane"],
    bestFor: ["Memory", "Learning", "Anxiety reduction", "Exam prep"],
    amazonUrl: "https://www.amazon.com/s?k=bacopa+monnieri+standardized&tag=nootropicstk-20",
  },
  {
    name: "Alpha GPC",
    slug: "alpha-gpc",
    primaryBenefit: "Acetylcholine boost for focus and learning",
    mechanism: "Direct choline precursor that crosses the blood-brain barrier; raises acetylcholine",
    typicalDose: "300–600mg",
    onset: "Acute (1–2 hours)",
    evidenceLevel: "Moderate",
    safetyProfile: "Good — headache possible if choline status already high",
    stacksWith: ["Lion's Mane", "Huperzine A", "Bacopa Monnieri"],
    bestFor: ["Focus", "Memory", "Athletic performance", "Acetylcholine support"],
    amazonUrl: "https://www.amazon.com/s?k=alpha+gpc+supplement&tag=nootropicstk-20",
  },
  {
    name: "Magnesium Glycinate",
    slug: "magnesium-glycinate",
    primaryBenefit: "Relaxation, sleep quality, and anxiety reduction",
    mechanism: "NMDA receptor modulation; supports GABA activity; corrects deficiency",
    typicalDose: "200–400mg elemental magnesium",
    onset: "Acute for sleep (1–2 hours); cumulative for anxiety (1–2 weeks)",
    evidenceLevel: "Strong",
    safetyProfile: "Excellent — gentle on digestion; very safe at standard doses",
    stacksWith: ["L-Theanine", "Ashwagandha", "Melatonin"],
    bestFor: ["Sleep", "Anxiety", "Stress", "Muscle recovery"],
    amazonUrl: "https://www.amazon.com/s?k=magnesium+glycinate&tag=nootropicstk-20",
  },
  {
    name: "Omega-3 DHA",
    slug: "omega-3-dha",
    primaryBenefit: "Brain structure and neuroplasticity support",
    mechanism: "Structural component of neuronal membranes; supports BDNF; anti-inflammatory",
    typicalDose: "1000–2000mg DHA daily",
    onset: "Cumulative (4–12 weeks)",
    evidenceLevel: "Strong",
    safetyProfile: "Excellent — mild fishy aftertaste; blood thinning at very high doses",
    stacksWith: ["Lion's Mane", "Phosphatidylserine", "Vitamin D3"],
    bestFor: ["Memory", "Mood", "Long-term brain health", "Inflammation"],
    amazonUrl: "https://www.amazon.com/s?k=omega+3+dha+supplement&tag=nootropicstk-20",
  },
  {
    name: "Rhodiola",
    slug: "rhodiola",
    primaryBenefit: "Mental fatigue reduction under stress",
    mechanism: "HPA axis modulation; monoamine reuptake inhibition; rosavins and salidroside",
    typicalDose: "200–400mg (3% rosavins, 1% salidroside)",
    onset: "Acute (1–2 hours) and cumulative",
    evidenceLevel: "Moderate",
    safetyProfile: "Good — may cause mild insomnia if taken late; cycle recommended",
    stacksWith: ["Ashwagandha", "Caffeine", "L-Theanine"],
    bestFor: ["Energy", "Stress resilience", "Mental fatigue", "Athletic performance"],
    amazonUrl: "https://www.amazon.com/s?k=rhodiola+rosea+standardized&tag=nootropicstk-20",
  },
  {
    name: "Citicoline",
    slug: "citicoline",
    primaryBenefit: "Choline support and neuronal membrane integrity",
    mechanism: "Choline + cytidine precursor; supports acetylcholine and dopamine synthesis",
    typicalDose: "250–500mg",
    onset: "Acute (1–2 hours) and cumulative",
    evidenceLevel: "Moderate",
    safetyProfile: "Excellent — one of the best-tolerated nootropics",
    stacksWith: ["Lion's Mane", "Bacopa Monnieri", "Piracetam"],
    bestFor: ["Focus", "Memory", "Neuroprotection", "Choline support"],
    amazonUrl: "https://www.amazon.com/s?k=citicoline+supplement&tag=nootropicstk-20",
  },
  {
    name: "Phosphatidylserine",
    slug: "phosphatidylserine",
    primaryBenefit: "Memory support and cognitive decline protection",
    mechanism: "Maintains neuronal membrane fluidity; supports glucose metabolism",
    typicalDose: "100mg 3x/day",
    onset: "Cumulative (4–8 weeks)",
    evidenceLevel: "Strong",
    safetyProfile: "Excellent — FDA-qualified health claim; very safe",
    stacksWith: ["Bacopa Monnieri", "Omega-3 DHA", "Alpha GPC"],
    bestFor: ["Memory", "Stress", "Cognitive decline prevention", "Focus"],
    amazonUrl: "https://www.amazon.com/s?k=phosphatidylserine+supplement&tag=nootropicstk-20",
  },
  {
    name: "Creatine",
    slug: "creatine",
    primaryBenefit: "Working memory and mental performance under fatigue",
    mechanism: "Brain ATP regeneration via creatine phosphate system",
    typicalDose: "3–5g/day (monohydrate)",
    onset: "Cumulative (1–2 weeks loading)",
    evidenceLevel: "Strong",
    safetyProfile: "Excellent — one of the most researched supplements in existence",
    stacksWith: ["Alpha GPC", "Omega-3 DHA", "Vitamin D3"],
    bestFor: ["Memory", "Mental endurance", "Sleep deprivation recovery", "Athletic performance"],
    amazonUrl: "https://www.amazon.com/s?k=creatine+monohydrate&tag=nootropicstk-20",
  },
  {
    name: "CoQ10",
    slug: "coq10",
    primaryBenefit: "Mitochondrial energy production",
    mechanism: "Electron transport chain cofactor; antioxidant; ATP synthesis support",
    typicalDose: "100–300mg (Ubiquinol preferred for 40+)",
    onset: "Cumulative (4–8 weeks)",
    evidenceLevel: "Moderate",
    safetyProfile: "Excellent — very well tolerated; mild GI discomfort rare",
    stacksWith: ["NMN", "Omega-3 DHA", "Rhodiola"],
    bestFor: ["Energy", "Mental fatigue", "Neuroprotection", "Cardiovascular support"],
    amazonUrl: "https://www.amazon.com/s?k=coq10+ubiquinol&tag=nootropicstk-20",
  },
  {
    name: "NMN",
    slug: "nmn",
    primaryBenefit: "NAD+ restoration and cellular energy",
    mechanism: "Direct NAD+ precursor; supports sirtuins and DNA repair pathways",
    typicalDose: "250–500mg/day",
    onset: "Cumulative (4–12 weeks)",
    evidenceLevel: "Emerging",
    safetyProfile: "Appears good — human trials limited; no major adverse events reported",
    stacksWith: ["CoQ10", "Omega-3 DHA", "Vitamin D3"],
    bestFor: ["Longevity", "Energy metabolism", "Cognitive aging", "DNA repair"],
    amazonUrl: "https://www.amazon.com/s?k=nmn+supplement+nad&tag=nootropicstk-20",
  },
  {
    name: "Huperzine A",
    slug: "huperzine-a",
    primaryBenefit: "Acetylcholine preservation for memory",
    mechanism: "Acetylcholinesterase inhibitor; prevents acetylcholine breakdown",
    typicalDose: "50–200mcg (cycle 2 weeks on/off)",
    onset: "Acute (1–2 hours)",
    evidenceLevel: "Moderate",
    safetyProfile: "Good — must cycle due to long half-life (10–14 hrs); avoid with cholinergic drugs",
    stacksWith: ["Alpha GPC", "Bacopa Monnieri", "Lion's Mane"],
    bestFor: ["Memory", "Studying", "Alzheimer's prevention", "Focus"],
    amazonUrl: "https://www.amazon.com/s?k=huperzine+a+supplement&tag=nootropicstk-20",
  },
  {
    name: "Noopept",
    slug: "noopept",
    primaryBenefit: "Memory and BDNF/NGF stimulation",
    mechanism: "AMPA/NMDA modulation; stimulates BDNF and NGF expression",
    typicalDose: "10–30mg (sublingual or oral)",
    onset: "Acute (15–30 min)",
    evidenceLevel: "Emerging",
    safetyProfile: "Appears safe at low doses; limited long-term human data",
    stacksWith: ["Citicoline", "Alpha GPC", "Lion's Mane"],
    bestFor: ["Memory", "Focus", "Neuroprotection", "Mood"],
    amazonUrl: "https://www.amazon.com/s?k=noopept&tag=nootropicstk-20",
  },
  {
    name: "Ginkgo Biloba",
    slug: "ginkgo-biloba",
    primaryBenefit: "Cerebral blood flow and memory",
    mechanism: "Vasodilation; antioxidant; platelet-activating factor inhibition",
    typicalDose: "120–240mg (24% flavonol glycosides)",
    onset: "Cumulative (4–6 weeks)",
    evidenceLevel: "Moderate",
    safetyProfile: "Good — mild blood-thinning; avoid with anticoagulants",
    stacksWith: ["Bacopa Monnieri", "Phosphatidylserine", "Rhodiola"],
    bestFor: ["Memory", "Circulation", "Age-related cognitive decline", "Focus"],
    amazonUrl: "https://www.amazon.com/s?k=ginkgo+biloba+extract&tag=nootropicstk-20",
  },
  {
    name: "Panax Ginseng",
    slug: "panax-ginseng",
    primaryBenefit: "Cognitive performance and fatigue reduction",
    mechanism: "Ginsenosides modulate neurotransmitter systems; adaptogenic HPA effects",
    typicalDose: "200–400mg standardized extract",
    onset: "Acute (1–2 hours) and cumulative",
    evidenceLevel: "Moderate",
    safetyProfile: "Good — may interact with blood thinners and diabetes medications",
    stacksWith: ["Rhodiola", "Ginkgo Biloba", "Ashwagandha"],
    bestFor: ["Energy", "Focus", "Immune support", "Sexual function"],
    amazonUrl: "https://www.amazon.com/s?k=panax+ginseng+extract&tag=nootropicstk-20",
  },
  {
    name: "Caffeine",
    slug: "caffeine",
    primaryBenefit: "Alertness and reaction time",
    mechanism: "Adenosine receptor antagonist; dopamine signaling enhancement",
    typicalDose: "100–200mg",
    onset: "Acute (15–45 min)",
    evidenceLevel: "Strong",
    safetyProfile: "Good at moderate doses — tolerance, dependency, and sleep disruption at high doses",
    stacksWith: ["L-Theanine", "Rhodiola", "Alpha GPC"],
    bestFor: ["Energy", "Focus", "Reaction time", "Athletic performance"],
    amazonUrl: "https://www.amazon.com/s?k=caffeine+l-theanine+stack&tag=nootropicstk-20",
  },
  {
    name: "Melatonin",
    slug: "melatonin",
    primaryBenefit: "Sleep quality and circadian rhythm regulation",
    mechanism: "MT1/MT2 melatonin receptor agonist; regulates sleep-wake cycle",
    typicalDose: "0.5–3mg (lower doses often as effective as higher)",
    onset: "Acute (30–60 min)",
    evidenceLevel: "Strong",
    safetyProfile: "Excellent at low doses — grogginess if dosed too high; use lowest effective dose",
    stacksWith: ["Magnesium Glycinate", "L-Theanine", "Ashwagandha"],
    bestFor: ["Sleep", "Jet lag", "Circadian reset", "Recovery"],
    amazonUrl: "https://www.amazon.com/s?k=melatonin+low+dose&tag=nootropicstk-20",
  },
  {
    name: "Vitamin D3",
    slug: "vitamin-d3",
    primaryBenefit: "Mood, cognition, and neuroprotection",
    mechanism: "Nuclear receptor transcription factor; regulates neurotrophin synthesis and immune function",
    typicalDose: "2000–5000 IU/day (with K2)",
    onset: "Cumulative (4–8 weeks to correct deficiency)",
    evidenceLevel: "Strong",
    safetyProfile: "Excellent at standard doses — toxicity only at extremely high long-term doses",
    stacksWith: ["Omega-3 DHA", "Magnesium Glycinate", "Creatine"],
    bestFor: ["Mood", "Immune support", "Bone health", "Seasonal affect"],
    amazonUrl: "https://www.amazon.com/s?k=vitamin+d3+k2+supplement&tag=nootropicstk-20",
  },
];

const SUPPLEMENT_NAMES = SUPPLEMENTS.map((s) => s.name);

const EVIDENCE_BADGE: Record<EvidenceLevel, string> = {
  Strong: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Moderate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Emerging: "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

function getSupplementByName(name: string): SupplementData | undefined {
  return SUPPLEMENTS.find((s) => s.name === name);
}

interface ComparisonRowProps {
  label: string;
  a: React.ReactNode;
  b: React.ReactNode;
}

function ComparisonRow({ label, a, b }: ComparisonRowProps) {
  return (
    <div className="grid grid-cols-[140px_1fr_1fr] gap-4 py-4 border-b border-border/30 last:border-0">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide pt-0.5">
        {label}
      </div>
      <div className="text-sm text-foreground leading-relaxed">{a}</div>
      <div className="text-sm text-foreground leading-relaxed">{b}</div>
    </div>
  );
}

export default function ComparisonPage() {
  const [selectedA, setSelectedA] = useState<string>("");
  const [selectedB, setSelectedB] = useState<string>("");

  const trackClick = trpc.affiliate.trackClick.useMutation();

  const suppA = selectedA ? getSupplementByName(selectedA) : undefined;
  const suppB = selectedB ? getSupplementByName(selectedB) : undefined;

  const bothSelected = !!suppA && !!suppB;

  function handleAffiliateClick(supp: SupplementData) {
    trackClick.mutate({
      supplementSlug: supp.slug,
      affiliatePartner: "amazon",
      destinationUrl: supp.amazonUrl,
      referrer: window.location.pathname,
    });
    window.open(supp.amazonUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl">
        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <GitCompareArrows className="w-5 h-5 text-primary" />
            <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">Compare</Badge>
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Compare Nootropics Side by Side
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Select any two supplements to see a detailed head-to-head breakdown — benefits,
            mechanisms, dosing, evidence, and more.
          </p>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Supplement A
            </p>
            <Select value={selectedA} onValueChange={setSelectedA}>
              <SelectTrigger className="bg-card border-border/50">
                <SelectValue placeholder="Choose a supplement..." />
              </SelectTrigger>
              <SelectContent>
                {SUPPLEMENT_NAMES.map((name) => (
                  <SelectItem key={name} value={name} disabled={name === selectedB}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Supplement B
            </p>
            <Select value={selectedB} onValueChange={setSelectedB}>
              <SelectTrigger className="bg-card border-border/50">
                <SelectValue placeholder="Choose a supplement..." />
              </SelectTrigger>
              <SelectContent>
                {SUPPLEMENT_NAMES.map((name) => (
                  <SelectItem key={name} value={name} disabled={name === selectedA}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Empty state */}
        {!bothSelected && (
          <div className="rounded-xl border border-border/40 bg-card p-16 text-center">
            <GitCompareArrows className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium mb-1">Pick two supplements above</p>
            <p className="text-sm text-muted-foreground/60">
              Select a supplement in each dropdown to see the full comparison.
            </p>
          </div>
        )}

        {/* Comparison table */}
        {bothSelected && suppA && suppB && (
          <>
            {/* Header row */}
            <div className="grid grid-cols-[140px_1fr_1fr] gap-4 mb-2">
              <div />
              <Card className="border-border/50 bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-display">{suppA.name}</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-border/50 bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-display">{suppB.name}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Comparison rows */}
            <div className="rounded-xl border border-border/50 bg-card px-6 py-2 mb-6">
              <ComparisonRow
                label="Primary Benefit"
                a={suppA.primaryBenefit}
                b={suppB.primaryBenefit}
              />
              <ComparisonRow
                label="Mechanism"
                a={<span className="text-muted-foreground">{suppA.mechanism}</span>}
                b={<span className="text-muted-foreground">{suppB.mechanism}</span>}
              />
              <ComparisonRow
                label="Typical Dose"
                a={<code className="text-xs bg-muted/30 px-1.5 py-0.5 rounded">{suppA.typicalDose}</code>}
                b={<code className="text-xs bg-muted/30 px-1.5 py-0.5 rounded">{suppB.typicalDose}</code>}
              />
              <ComparisonRow
                label="Onset"
                a={suppA.onset}
                b={suppB.onset}
              />
              <ComparisonRow
                label="Evidence"
                a={
                  <Badge className={`text-xs border ${EVIDENCE_BADGE[suppA.evidenceLevel]}`}>
                    {suppA.evidenceLevel}
                  </Badge>
                }
                b={
                  <Badge className={`text-xs border ${EVIDENCE_BADGE[suppB.evidenceLevel]}`}>
                    {suppB.evidenceLevel}
                  </Badge>
                }
              />
              <ComparisonRow
                label="Safety"
                a={<span className="text-muted-foreground">{suppA.safetyProfile}</span>}
                b={<span className="text-muted-foreground">{suppB.safetyProfile}</span>}
              />
              <ComparisonRow
                label="Stacks Well With"
                a={
                  <div className="flex flex-wrap gap-1">
                    {suppA.stacksWith.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs text-muted-foreground border-border/40">
                        {s}
                      </Badge>
                    ))}
                  </div>
                }
                b={
                  <div className="flex flex-wrap gap-1">
                    {suppB.stacksWith.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs text-muted-foreground border-border/40">
                        {s}
                      </Badge>
                    ))}
                  </div>
                }
              />
              <ComparisonRow
                label="Best For"
                a={
                  <div className="flex flex-wrap gap-1">
                    {suppA.bestFor.map((g) => (
                      <Badge key={g} className="text-xs bg-primary/10 text-primary border-primary/20">
                        {g}
                      </Badge>
                    ))}
                  </div>
                }
                b={
                  <div className="flex flex-wrap gap-1">
                    {suppB.bestFor.map((g) => (
                      <Badge key={g} className="text-xs bg-primary/10 text-primary border-primary/20">
                        {g}
                      </Badge>
                    ))}
                  </div>
                }
              />
            </div>

            {/* Amazon links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <Button
                variant="outline"
                className="gap-2 border-border/50 hover:border-primary/40"
                onClick={() => handleAffiliateClick(suppA)}
              >
                Buy {suppA.name} on Amazon
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-border/50 hover:border-primary/40"
                onClick={() => handleAffiliateClick(suppB)}
              >
                Buy {suppB.name} on Amazon
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>

            <Separator className="mb-10 bg-border/30" />
          </>
        )}

        {/* CTA */}
        <div className="p-6 rounded-xl border border-border/50 bg-card text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Ready to build your stack?
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Use our free stack builder to combine supplements into a personalized protocol based
            on your goals.
          </p>
          <Link href="/builder">
            <Button size="sm" className="gap-1.5">
              Stack Builder <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
