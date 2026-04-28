import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { useQuickStack } from "@/contexts/QuickStackContext";
import { toast } from "sonner";
import {
  ShieldCheck,
  ArrowRight,
  FlaskConical,
  Brain,
  Moon,
  Zap,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const STARTER_SUPPLEMENTS = [
  {
    name: "L-Theanine",
    slug: "l-theanine",
    dose: "100–200mg",
    description:
      "An amino acid found in green tea that promotes calm focus without sedation. Pairs perfectly with caffeine to smooth out jitters and sharpen attention.",
    safety: "Excellent",
    effect: "Calm focus, reduced anxiety",
  },
  {
    name: "Magnesium Glycinate",
    slug: "magnesium-glycinate",
    dose: "300–400mg",
    description:
      "The most bioavailable form of magnesium — essential for over 300 enzymatic reactions. Dramatically improves sleep quality and reduces anxiety.",
    safety: "Excellent",
    effect: "Sleep, relaxation, mood",
  },
  {
    name: "Omega-3 DHA",
    slug: "omega-3",
    dose: "1–2g DHA daily",
    description:
      "A structural building block of brain cell membranes. Low DHA is linked to cognitive decline, depression, and poor focus. A foundational supplement for long-term brain health.",
    safety: "Excellent",
    effect: "Brain health, mood, inflammation",
  },
  {
    name: "Bacopa Monnieri",
    slug: "bacopa-monnieri",
    dose: "300mg (50% bacosides)",
    description:
      "An Ayurvedic herb with the strongest clinical evidence for memory improvement. Takes 4–8 weeks for full effect. Best taken with a fatty meal.",
    safety: "Excellent",
    effect: "Memory, learning, anxiety",
  },
  {
    name: "Ashwagandha",
    slug: "ashwagandha",
    dose: "300–600mg KSM-66",
    description:
      "The most studied adaptogen for stress and cortisol regulation. Reduces anxiety, supports sleep, and builds resilience to mental fatigue over time.",
    safety: "Excellent",
    effect: "Stress, anxiety, sleep, resilience",
  },
];

const SLUG_NAMES: Record<string, string> = {
  'l-theanine': 'L-Theanine',
  'caffeine': 'Caffeine',
  'ashwagandha': 'Ashwagandha',
  'magnesium-glycinate': 'Magnesium Glycinate',
};

const BEGINNER_STACKS = [
  {
    name: "The Focus Starter",
    icon: <Brain className="w-4 h-4" />,
    slugs: ['l-theanine', 'caffeine'],
    supplements: ["L-Theanine 200mg", "Caffeine 100mg"],
    description:
      "The most research-backed combination in nootropics. Add L-Theanine to your morning coffee and feel the difference within the first day.",
  },
  {
    name: "The Calm Focus",
    icon: <FlaskConical className="w-4 h-4" />,
    slugs: ['l-theanine', 'ashwagandha'],
    supplements: ["L-Theanine 200mg", "Ashwagandha 300mg"],
    description:
      "Ideal if you have anxiety or high stress. Reduces cortisol during the day while maintaining clear-headed focus — no stimulants required.",
  },
  {
    name: "The Sleep + Recovery",
    icon: <Moon className="w-4 h-4" />,
    slugs: ['magnesium-glycinate', 'ashwagandha'],
    supplements: ["Magnesium Glycinate 400mg", "Ashwagandha 300mg"],
    description:
      "Taken 30–60 minutes before bed. Dramatically improves deep sleep quality and morning recovery. Most beginners notice effects within the first week.",
  },
];

const BEGINNER_MISTAKES = [
  "Adding too many supplements at once — you won't know what's working.",
  "Expecting immediate results from compounds like Bacopa or Lion's Mane that need weeks to build up.",
  "Skipping days inconsistently — most adaptogens require daily use for full effect.",
  "Buying cheap, unverified products without third-party lab testing (COA).",
  "Taking stimulant-class compounds in the afternoon and ruining your sleep.",
];

const AVOID_LIST = [
  "Racetams (Piracetam, Aniracetam) — require choline co-supplementation, complex dosing",
  "Noopept — potent peptide, not for beginners without research",
  "Modafinil / Adrafinil — prescription-class wakefulness agents",
  "Microdosed psychedelics — outside the scope of this guide",
  "High-dose Huperzine A — requires strict cycling, easy to overdo",
  "Phenibut — habit-forming, withdrawal risk, not a nootropic",
  "DMAA / DMHA — stimulants found in some pre-workouts, cardiovascular risk",
];

export default function StartHere() {
  const trackClick = trpc.affiliate.trackClick.useMutation();
  const { addItem } = useQuickStack();

  const loadStack = (stack: typeof BEGINNER_STACKS[number]) => {
    stack.slugs.forEach((slug) => {
      addItem({ slug, name: SLUG_NAMES[slug] ?? slug });
    });
    toast.success(`${stack.name} loaded! (${stack.slugs.length} supplements added)`);
  };

  const handleBuy = (url: string, partner: string, supplement: string) => {
    window.open(url, "_blank");
    trackClick.mutate({ supplementSlug: supplement, affiliatePartner: partner, destinationUrl: url, referrer: "start-here" });
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">

        {/* Hero */}
        <div className="mb-12 text-center">
          <Badge className="bg-primary/15 text-primary border-primary/30 mb-4">Beginner's Guide</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            New to Nootropics?<br />Start Here.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Nootropics are natural and synthetic compounds that support cognitive function — focus, memory, mood, and mental energy. This guide cuts through the noise and gives you a safe, effective starting point.
          </p>
        </div>

        <Separator className="mb-12 border-border/30" />

        {/* 5 Best Starter Supplements */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              The 5 Best Starter Supplements
            </h2>
            <p className="text-muted-foreground text-sm">
              These are safe, well-researched, and effective for most people. Start with one or two.
            </p>
          </div>
          <div className="space-y-4">
            {STARTER_SUPPLEMENTS.map((supp, i) => (
              <div
                key={supp.slug}
                className="p-5 rounded-xl border border-border/50 bg-card flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{supp.name}</h3>
                    <Badge variant="outline" className="text-xs border-border/30 text-muted-foreground">
                      {supp.dose}
                    </Badge>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> {supp.safety}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{supp.description}</p>
                  <p className="text-xs text-primary/80">Effect: {supp.effect}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-border/50"
                    onClick={() =>
                      handleBuy(
                        `https://www.amazon.com/s?k=${encodeURIComponent(supp.name)}+supplement&tag=nootropicstk-20`,
                        "amazon",
                        supp.slug
                      )
                    }
                  >
                    Amazon
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-border/50"
                    onClick={() =>
                      handleBuy(
                        `https://www.iherb.com/search?kw=${encodeURIComponent(supp.name)}`,
                        "iherb",
                        supp.slug
                      )
                    }
                  >
                    iHerb
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3-Week Protocol */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Your First 3-Week Protocol
            </h2>
            <p className="text-muted-foreground text-sm">
              A structured introduction that lets you observe real effects without overwhelm.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                week: "Week 1",
                color: "border-primary/30 bg-primary/5",
                title: "Foundation",
                items: [
                  "Start with L-Theanine 200mg only",
                  "Take it with your morning coffee or tea",
                  "Journal: note focus, mood, and sleep each evening",
                  "Goal: establish your baseline and observe effects",
                ],
              },
              {
                week: "Week 2",
                color: "border-border/50 bg-card",
                title: "Add Sleep Support",
                items: [
                  "Continue L-Theanine in the morning",
                  "Add Magnesium Glycinate 400mg at night",
                  "Take Mg 30–60 min before bed",
                  "Goal: observe sleep quality improvements",
                ],
              },
              {
                week: "Week 3",
                color: "border-border/50 bg-card",
                title: "Long-Term Baseline",
                items: [
                  "Continue both supplements",
                  "Optionally add Omega-3 DHA 1g with breakfast",
                  "Review your journal — note any changes",
                  "Goal: decide which supplements to keep",
                ],
              },
            ].map((w) => (
              <div key={w.week} className={`p-5 rounded-xl border ${w.color}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">{w.week}</Badge>
                  <span className="font-semibold text-foreground text-sm">{w.title}</span>
                </div>
                <ul className="space-y-2">
                  {w.items.map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Beginner Stacks */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              3 Beginner-Friendly Stacks
            </h2>
            <p className="text-muted-foreground text-sm">
              Simple, proven combinations. Pick one that matches your primary goal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BEGINNER_STACKS.map((stack) => (
              <div key={stack.name} className="p-5 rounded-xl border border-border/50 bg-card flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-primary">{stack.icon}</span>
                  <h3 className="font-semibold text-foreground text-sm">{stack.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {stack.supplements.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs text-muted-foreground border-border/30">
                      {s}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
                  {stack.description}
                </p>
                <Button size="sm" variant="outline" className="w-full text-xs border-border/50 gap-1"
                  onClick={() => loadStack(stack)}>
                  Build This Stack <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Common Beginner Mistakes
            </h2>
          </div>
          <div className="p-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 space-y-3">
            {BEGINNER_MISTAKES.map((mistake, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-yellow-400 font-bold flex-shrink-0">{i + 1}.</span>
                <span className="text-muted-foreground">{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What To Avoid */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              What To Avoid as a Beginner
            </h2>
            <p className="text-muted-foreground text-sm">
              These compounds are potent, complex, or carry meaningful risks. Save them for later — or skip entirely.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2">
            {AVOID_LIST.map((item, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Ready to Build Your Stack?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
            Use the Stack Builder to combine supplements, check interactions, and save your personal protocol.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/builder">
              <Button className="gap-2">
                Open Stack Builder <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/library">
              <Button variant="outline" className="border-border/50 gap-2">
                Browse Supplement Library <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
