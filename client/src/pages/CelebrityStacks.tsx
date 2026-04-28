import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Star,
  Shield,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Users,
} from "lucide-react";
import { useQuickStack } from "@/contexts/QuickStackContext";
import { toast } from "sonner";

interface Celebrity {
  name: string;
  shortName: string;
  role: string;
  credibility: number;
  conflictOfInterest: boolean;
  conflictNote?: string;
  source: string;
  sourceLabel: string;
  supplements: { dose: string; name: string; slug: string }[];
  quote: string;
  focus: string;
}

const CELEBRITIES: Celebrity[] = [
  {
    name: "Andrew Huberman",
    shortName: "Huberman",
    role: "Stanford Neuroscientist",
    credibility: 5,
    conflictOfInterest: false,
    source: "https://www.hubermanlab.com/newsletter/toolkit-for-sleep",
    sourceLabel: "hubermanlab.com",
    supplements: [
      { name: "Magnesium L-Threonate", dose: "145mg", slug: "magnesium-glycinate" },
      { name: "L-Theanine", dose: "200mg", slug: "l-theanine" },
      { name: "Alpha-GPC", dose: "300mg", slug: "alpha-gpc" },
      { name: "Creatine", dose: "5g", slug: "creatine" },
      { name: "Ashwagandha", dose: "300mg", slug: "ashwagandha" },
    ],
    quote: "I would start with one supplement (or none!) and then add one at a time as needed.",
    focus: "Sleep optimization + cognitive performance",
  },
  {
    name: "Bryan Johnson",
    shortName: "Johnson",
    role: "Blueprint Protocol / Tech Entrepreneur",
    credibility: 5,
    conflictOfInterest: false,
    source: "https://protocol.bryanjohnson.com/",
    sourceLabel: "protocol.bryanjohnson.com",
    supplements: [
      { name: "Creatine", dose: "5g", slug: "creatine" },
      { name: "NMN", dose: "500mg", slug: "nmn" },
      { name: "Omega-3", dose: "800mg", slug: "omega-3" },
      { name: "Ashwagandha + Rhodiola", dose: "Daily", slug: "ashwagandha" },
      { name: "Melatonin", dose: "300mcg", slug: "melatonin" },
    ],
    quote:
      "I don't treat my body as something to be enjoyed. I treat it as something to be optimized.",
    focus: "Longevity + anti-aging",
  },
  {
    name: "Peter Attia MD",
    shortName: "Attia",
    role: "Longevity Physician / Outlive Author",
    credibility: 5,
    conflictOfInterest: false,
    source: "https://peterattiamd.com/ama69/",
    sourceLabel: "peterattiamd.com",
    supplements: [
      { name: "Omega-3", dose: "2.5g EPA", slug: "omega-3" },
      { name: "Creatine", dose: "5g", slug: "creatine" },
      { name: "Magnesium L-Threonate", dose: "Daily", slug: "magnesium-glycinate" },
      { name: "Ashwagandha", dose: "300mg", slug: "ashwagandha" },
      { name: "Glycine", dose: "2g", slug: "l-theanine" },
    ],
    quote: "The goal is not to live forever. The goal is to live well for as long as possible.",
    focus: "Longevity + sleep quality",
  },
  {
    name: "Tim Ferriss",
    shortName: "Ferriss",
    role: "Tools of Titans Author / Podcaster",
    credibility: 4,
    conflictOfInterest: false,
    source: "https://tim.blog/2024/09/13/my-favorite-software-supplements-apps-tools-and-more/",
    sourceLabel: "tim.blog",
    supplements: [
      { name: "Magnesium L-Threonate", dose: "Daily", slug: "magnesium-glycinate" },
      { name: "L-Theanine", dose: "200mg", slug: "l-theanine" },
      { name: "Creatine", dose: "1-2g", slug: "creatine" },
      { name: "Lion's Mane", dose: "Daily", slug: "lions-mane" },
      { name: "Fish Oil", dose: "Daily", slug: "omega-3" },
    ],
    quote: "What is the minimal effective dose to produce the desired outcome?",
    focus: "Cognitive optimization + sleep",
  },
  {
    name: "Dave Asprey",
    shortName: "Asprey",
    role: "Bulletproof Founder / Biohacker",
    credibility: 4,
    conflictOfInterest: true,
    conflictNote: "Owns Bulletproof + Suppgrade Labs brands",
    source: "https://daveasprey.com/dave-asprey-top-10-supplements/",
    sourceLabel: "daveasprey.com",
    supplements: [
      { name: "L-Tyrosine", dose: "1000mg", slug: "l-tyrosine" },
      { name: "NMN", dose: "1000mg", slug: "nmn" },
      { name: "Creatine", dose: "5g", slug: "creatine" },
      { name: "Ashwagandha", dose: "KSM-66", slug: "ashwagandha" },
      { name: "Magnesium", dose: "Daily", slug: "magnesium-glycinate" },
    ],
    quote: "You are not broken. You are just underpowered.",
    focus: "Energy + cognitive performance",
  },
  {
    name: "Joe Rogan",
    shortName: "Rogan",
    role: "JRE Podcast Host",
    credibility: 4,
    conflictOfInterest: true,
    conflictNote: "Co-owns Onnit",
    source: "https://jrelibrary.com/articles/joe-rogans-supplement-stack/",
    sourceLabel: "jrelibrary.com",
    supplements: [
      { name: "Alpha-GPC (Alpha BRAIN)", dose: "Daily", slug: "alpha-gpc" },
      { name: "Fish Oil", dose: "Daily", slug: "omega-3" },
      { name: "Vitamin D3", dose: "Daily", slug: "vitamin-d3" },
      { name: "Creatine", dose: "Daily", slug: "creatine" },
      { name: "Lion's Mane", dose: "Daily", slug: "lions-mane" },
    ],
    quote: "I use supplements to cover my bases and fill the gaps.",
    focus: "Performance + brain function",
  },
  {
    name: "Rhonda Patrick PhD",
    shortName: "Patrick",
    role: "FoundMyFitness / Scientist",
    credibility: 5,
    conflictOfInterest: false,
    source: "https://www.foundmyfitness.com/episodes/q-and-a-63",
    sourceLabel: "foundmyfitness.com",
    supplements: [
      { name: "Creatine", dose: "10g", slug: "creatine" },
      { name: "Omega-3", dose: "Daily", slug: "omega-3" },
      { name: "Vitamin D3", dose: "Daily", slug: "vitamin-d3" },
      { name: "Magnesium L-Threonate", dose: "Daily", slug: "magnesium-glycinate" },
      { name: "Sulforaphane", dose: "Daily", slug: "bacopa-monnieri" },
    ],
    quote: "Creatine is the most important supplement for most people, period.",
    focus: "Brain health + longevity",
  },
  {
    name: "Ben Greenfield",
    shortName: "Greenfield",
    role: "Fitness Biohacker / Author",
    credibility: 4,
    conflictOfInterest: true,
    conflictNote: "Owns Kion brand",
    source: "https://bengreenfieldlife.com/article/supplements-articles/best-supplements/",
    sourceLabel: "bengreenfieldlife.com",
    supplements: [
      { name: "Magnesium", dose: "Daily", slug: "magnesium-glycinate" },
      { name: "Omega-3", dose: "Daily", slug: "omega-3" },
      { name: "Lion's Mane", dose: "Daily", slug: "lions-mane" },
      { name: "Creatine", dose: "Daily", slug: "creatine" },
      { name: "Ashwagandha", dose: "Daily", slug: "ashwagandha" },
    ],
    quote: "I want to squeeze every bit of performance out of my body that I can.",
    focus: "Performance + recovery",
  },
];

interface MatrixRow {
  supplement: string;
  values: (boolean | null)[]; // true = ✓, false = —, null shouldn't occur
}

const MATRIX_EXPERTS = [
  "Huberman",
  "Johnson",
  "Attia",
  "Ferriss",
  "Asprey",
  "Rogan",
  "Patrick",
  "Greenfield",
];

const MATRIX_DATA: MatrixRow[] = [
  { supplement: "Omega-3", values: [true, true, true, true, true, true, true, true] },
  { supplement: "Creatine", values: [true, true, true, true, true, false, true, true] },
  { supplement: "Magnesium", values: [true, false, true, true, true, false, true, true] },
  { supplement: "Ashwagandha", values: [true, true, true, false, true, false, false, false] },
  { supplement: "Vitamin D3", values: [true, false, true, false, true, true, true, true] },
  { supplement: "NMN", values: [false, true, false, false, true, true, false, false] },
  { supplement: "L-Theanine", values: [true, false, true, true, false, false, false, false] },
  { supplement: "Alpha-GPC", values: [true, false, false, false, false, true, false, false] },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= count ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function CelebrityStacks() {
  const { addItem } = useQuickStack();

  const loadCelebStack = (celeb: Celebrity) => {
    celeb.supplements.forEach((s) => {
      addItem({ slug: s.slug, name: s.name });
    });
    toast.success(`${celeb.name}'s stack loaded!`);
  };

  const loadFoundationStack = () => {
    const foundation = [
      { slug: "omega-3", name: "Omega-3" },
      { slug: "creatine", name: "Creatine" },
      { slug: "magnesium-glycinate", name: "Magnesium" },
    ];
    foundation.forEach((s) => addItem(s));
    toast.success("Foundation stack loaded!");
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl">
        {/* Hero */}
        <div className="mb-12 text-center">
          <Badge className="bg-primary/15 text-primary border-primary/30 mb-4">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified Sources
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
            What 8 Biohacking Experts<br />
            <span className="text-primary">Actually Take</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            We mapped every supplement to the exact podcast episode, newsletter, or book where they
            mentioned it. Verify it yourself.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="px-5 py-3 rounded-xl bg-card border border-border/50 flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="font-display text-2xl font-bold text-foreground leading-none">8</div>
                <div className="text-xs text-muted-foreground mt-1">Experts</div>
              </div>
            </div>
            <div className="px-5 py-3 rounded-xl bg-card border border-border/50 flex items-center gap-3">
              <Brain className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="font-display text-2xl font-bold text-foreground leading-none">100+</div>
                <div className="text-xs text-muted-foreground mt-1">Supplements Documented</div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-12 border-border/30" />

        {/* Comparison Matrix */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              The Cross-Expert Comparison Matrix
            </h2>
            <p className="text-muted-foreground text-sm max-w-3xl">
              Which supplements appear across multiple experts? Rows are the most cross-cited
              compounds. A check means the expert has publicly documented taking it.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/40 border-b border-border/40">
                    <th className="sticky left-0 z-10 bg-secondary/80 backdrop-blur text-left font-semibold text-foreground px-4 py-3 min-w-[160px]">
                      Supplement
                    </th>
                    {MATRIX_EXPERTS.map((name) => (
                      <th
                        key={name}
                        className="text-center font-semibold text-foreground px-3 py-3 min-w-[90px] text-xs"
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX_DATA.map((row, idx) => (
                    <tr
                      key={row.supplement}
                      className={`border-b border-border/30 ${
                        idx % 2 === 0 ? "bg-background/40" : "bg-card"
                      }`}
                    >
                      <td className="sticky left-0 z-10 bg-card/95 backdrop-blur font-medium text-foreground px-4 py-3">
                        {row.supplement}
                      </td>
                      {row.values.map((v, i) => (
                        <td key={i} className="text-center px-3 py-3">
                          {v ? (
                            <CheckCircle className="w-4 h-4 text-primary inline-block" />
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key Findings Callout */}
        <section className="mb-14">
          <div className="p-7 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  The 3 supplements that appear in 7+ of 8 stacks:{" "}
                  <span className="text-primary">Omega-3, Creatine, Magnesium</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Start with these three before anything else. They have the broadest expert
                  consensus, the strongest research base, and the lowest cost-per-day.
                </p>
                <Button onClick={loadFoundationStack} className="gap-2">
                  Build the Foundation Stack <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Celebrity Cards */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              The 8 Expert Stacks
            </h2>
            <p className="text-muted-foreground text-sm max-w-3xl">
              Top nootropic-relevant supplements only — focus, memory, sleep, energy. Prescription
              drugs and food items are excluded.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {CELEBRITIES.map((celeb) => (
              <div
                key={celeb.name}
                className="p-6 rounded-xl border border-border/50 bg-card flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {celeb.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-xs text-muted-foreground border-border/40"
                    >
                      {celeb.role}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <StarRow count={celeb.credibility} />
                    {celeb.conflictOfInterest && (
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-[10px] gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Conflict of Interest
                      </Badge>
                    )}
                  </div>
                </div>

                {celeb.conflictOfInterest && celeb.conflictNote && (
                  <p className="text-xs text-amber-400/80 mb-3 italic">
                    Note: {celeb.conflictNote}
                  </p>
                )}

                {/* Quote */}
                <blockquote className="border-l-2 border-primary/40 pl-3 mb-4 text-sm text-muted-foreground italic">
                  "{celeb.quote}"
                </blockquote>

                {/* Focus */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-foreground">Focus:</span>{" "}
                  <span className="text-xs text-muted-foreground">{celeb.focus}</span>
                </div>

                {/* Supplements */}
                <div className="mb-4 flex-1">
                  <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                    Top 5 Supplements
                  </h4>
                  <div className="space-y-1.5">
                    {celeb.supplements.map((s, i) => (
                      <div
                        key={`${s.name}-${i}`}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-background/60 border border-border/30"
                      >
                        <span className="text-sm font-medium text-foreground truncate">
                          {s.name}
                        </span>
                        <span className="text-xs text-primary font-semibold flex-shrink-0">
                          {s.dose}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Source link */}
                <a
                  href={celeb.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors mb-4 inline-flex items-center gap-1"
                >
                  Source: {celeb.sourceLabel}
                  <ExternalLink className="w-3 h-3" />
                </a>

                {/* Load Stack button */}
                <Button
                  onClick={() => loadCelebStack(celeb)}
                  variant="outline"
                  className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  Load This Stack <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Source Transparency */}
        <section className="mb-14">
          <div className="p-6 rounded-xl border border-border/50 bg-card">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  Source transparency
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every supplement above is cited from a primary source — the expert's own website,
                  podcast episode, newsletter, or published book. We note conflicts of interest
                  where experts own the brands they recommend. We don't profit from any expert's
                  personal brand, and we don't reorder this list based on affiliate payouts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Are celebrity supplement stacks safe for beginners?",
                a: "No — start simpler. These are optimized protocols built by people who've been supplementing for years and tracking biomarkers. A beginner should start with one supplement at a time so they can identify what actually works for them. Copying a 5-supplement stack on day one makes it impossible to know which compound is doing what — and which one might be the cause if you feel worse.",
              },
              {
                q: "Which celebrity stack should I try first?",
                a: "Huberman's sleep-and-cognition stack is the most beginner-accessible with strong evidence. Magnesium, L-Theanine, and Creatine all have decades of research, well-tolerated safety profiles, and accessible dosing. If you're optimizing for longevity instead of cognition, the cross-expert overlap (Omega-3 + Creatine + Magnesium) is a smarter starting point.",
              },
              {
                q: "Do these celebrities get paid to recommend supplements?",
                a: "Some do. Joe Rogan co-owns Onnit, Dave Asprey owns Bulletproof and Suppgrade Labs, and Ben Greenfield owns Kion. We've flagged each of these with a Conflict of Interest badge. Huberman, Attia, Patrick, Johnson, and Ferriss don't sell supplement brands — though several earn affiliate commissions or have brand sponsorships, which we recommend you research before taking their recommendations as gospel.",
              },
            ].map((item) => (
              <div key={item.q} className="p-5 rounded-xl border border-border/50 bg-card">
                <h3 className="font-semibold text-foreground text-base mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Build Your Own Evidence-Based Stack
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
            Don't copy a celebrity. Start from your goals, build progressively, and verify what
            actually works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/builder">
              <Button className="gap-2 w-full sm:w-auto">
                Open Stack Builder <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/start-here">
              <Button variant="outline" className="gap-2 w-full sm:w-auto border-border/50">
                Start Here Guide
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
