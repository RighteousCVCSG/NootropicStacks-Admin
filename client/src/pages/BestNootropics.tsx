import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { Star, ArrowRight, FlaskConical, Brain, Moon, Zap, ShieldCheck } from "lucide-react";

const TOP_5 = [
  {
    rank: 1,
    name: "Lion's Mane Mushroom",
    slug: "lions-mane",
    score: 9.2,
    evidence: "Strong",
    category: "Neuroplasticity",
    excerpt:
      "The only natural compound known to stimulate Nerve Growth Factor (NGF) synthesis. Multiple clinical trials confirm improvements in mild cognitive impairment, focus, and mood. Accumulates benefit over 4–12 weeks — the longer you take it, the more it works.",
  },
  {
    rank: 2,
    name: "Bacopa Monnieri",
    slug: "bacopa-monnieri",
    score: 8.9,
    evidence: "Strong",
    category: "Memory",
    excerpt:
      "The most clinically validated memory enhancer available without a prescription. Randomized controlled trials consistently show improvements in verbal learning rate, delayed recall, and information processing speed after 8–12 weeks.",
  },
  {
    rank: 3,
    name: "Alpha GPC",
    slug: "alpha-gpc",
    score: 8.7,
    evidence: "Moderate",
    category: "Focus",
    excerpt:
      "The most bioavailable choline precursor, Alpha GPC raises acetylcholine — the neurotransmitter directly responsible for focus, memory, and learning. Synergizes powerfully with Lion's Mane and caffeine.",
  },
  {
    rank: 4,
    name: "L-Theanine",
    slug: "l-theanine",
    score: 8.5,
    evidence: "Strong",
    category: "Calm Focus",
    excerpt:
      "Promotes alpha brain wave activity — the relaxed-alert state associated with creativity and flow. The caffeine + L-Theanine combination is arguably the most well-researched and practical nootropic stack in existence.",
  },
  {
    rank: 5,
    name: "Ashwagandha",
    slug: "ashwagandha",
    score: 8.4,
    evidence: "Strong",
    category: "Adaptogen",
    excerpt:
      "KSM-66 extract has the deepest research base of any adaptogen. Clinically proven to reduce cortisol, lower anxiety, improve sleep quality, and build stress resilience over 8–12 weeks of daily use.",
  },
];

const CATEGORIES = [
  {
    label: "Best for Focus",
    icon: <Brain className="w-4 h-4" />,
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    supplements: [
      { name: "Alpha GPC", slug: "alpha-gpc", note: "Acetylcholine precursor" },
      { name: "L-Theanine + Caffeine", slug: "l-theanine", note: "Classic synergy" },
      { name: "Rhodiola Rosea", slug: "rhodiola", note: "Mental fatigue reducer" },
      { name: "Lion's Mane", slug: "lions-mane", note: "Long-term NGF support" },
    ],
  },
  {
    label: "Best for Memory",
    icon: <FlaskConical className="w-4 h-4" />,
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    supplements: [
      { name: "Bacopa Monnieri", slug: "bacopa-monnieri", note: "Most validated" },
      { name: "Lion's Mane", slug: "lions-mane", note: "Neuroplasticity" },
      { name: "Alpha GPC", slug: "alpha-gpc", note: "Cholinergic support" },
      { name: "Omega-3 DHA", slug: "omega-3", note: "Structural brain fat" },
    ],
  },
  {
    label: "Best for Anxiety",
    icon: <ShieldCheck className="w-4 h-4" />,
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    supplements: [
      { name: "Ashwagandha", slug: "ashwagandha", note: "Cortisol reduction" },
      { name: "L-Theanine", slug: "l-theanine", note: "Alpha wave promotion" },
      { name: "Magnesium Glycinate", slug: "magnesium-glycinate", note: "Deficiency is common" },
      { name: "Rhodiola Rosea", slug: "rhodiola", note: "Adaptogenic stress relief" },
    ],
  },
  {
    label: "Best for Sleep",
    icon: <Moon className="w-4 h-4" />,
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    supplements: [
      { name: "Magnesium Glycinate", slug: "magnesium-glycinate", note: "Deep sleep quality" },
      { name: "Ashwagandha", slug: "ashwagandha", note: "Cortisol + sleep onset" },
      { name: "L-Theanine", slug: "l-theanine", note: "Relaxation without sedation" },
      { name: "Melatonin", slug: "melatonin", note: "0.5mg low-dose" },
    ],
  },
];

const FAQ = [
  {
    q: "What is the best nootropic?",
    a: "There's no single best nootropic — it depends on your goal. For most beginners, Lion's Mane (long-term brain health), L-Theanine (immediate calm focus), and Bacopa Monnieri (memory) form an outstanding evidence-backed foundation.",
  },
  {
    q: "Are nootropics safe?",
    a: "The natural nootropics on this list — Lion's Mane, Bacopa, L-Theanine, Ashwagandha, Omega-3s, Magnesium — have strong safety profiles and decades of human use. Always buy from vendors with third-party certificates of analysis (COA) and start at the low end of the recommended dose range.",
  },
  {
    q: "Do nootropics really work?",
    a: "Yes — but results vary by compound, dose, individual baseline, and consistency. Lion's Mane and Bacopa have the strongest RCT evidence for cognitive improvements. L-Theanine's effects are noticeable within 30–60 minutes for most people. Adaptogens like Ashwagandha show measurable cortisol and anxiety reductions after 4–8 weeks.",
  },
];

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-border/40 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-primary tabular-nums">{score}/10</span>
    </div>
  );
}

export default function BestNootropics() {
  const trackClick = trpc.affiliate.trackClick.useMutation();

  const handleBuy = (url: string, partner: string, supplement: string) => {
    window.open(url, "_blank");
    trackClick.mutate({ supplementSlug: supplement, affiliatePartner: partner, page: "best-nootropics" });
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">

        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-primary/15 text-primary border-primary/30">Updated 2026</Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground border-border/30">
              Science-Backed
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            The 15 Best Nootropics in 2026<br />
            <span className="text-primary">(Science-Backed)</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We ranked the best nootropics by evidence quality, effect size, safety profile, and real-world results. Every compound below has at least one peer-reviewed human clinical trial.
          </p>
        </div>

        <Separator className="mb-12 border-border/30" />

        {/* Top 5 Overall */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Top 5 Overall
            </h2>
            <p className="text-muted-foreground text-sm">
              The highest-rated nootropics across all categories — effective, safe, and well-studied.
            </p>
          </div>
          <div className="space-y-4">
            {TOP_5.map((item) => (
              <div
                key={item.slug}
                className="p-5 rounded-xl border border-border/50 bg-card"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    #{item.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Link href={`/supplements/${item.slug}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
                        {item.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs border-border/30 ${
                          item.evidence === "Strong"
                            ? "text-green-400 border-green-500/30"
                            : "text-yellow-400 border-yellow-500/30"
                        }`}
                      >
                        {item.evidence} Evidence
                      </Badge>
                    </div>
                    <div className="mb-2">
                      <ScoreBar score={item.score} />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {item.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-border/50 h-7"
                        onClick={() =>
                          handleBuy(
                            `https://www.amazon.com/s?k=${encodeURIComponent(item.name)}+supplement&tag=nootropicstk-20`,
                            "amazon",
                            item.slug
                          )
                        }
                      >
                        Buy on Amazon
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-border/50 h-7"
                        onClick={() =>
                          handleBuy(
                            `https://www.iherb.com/search?kw=${encodeURIComponent(item.name)}`,
                            "iherb",
                            item.slug
                          )
                        }
                      >
                        Buy on iHerb
                      </Button>
                      <Link href={`/supplements/${item.slug}`}>
                        <Button size="sm" variant="ghost" className="text-xs text-primary h-7 gap-1 px-2">
                          Full Profile <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Best Nootropics by Category
            </h2>
            <p className="text-muted-foreground text-sm">
              Targeted picks for specific cognitive goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CATEGORIES.map((cat) => (
              <div key={cat.label} className="p-5 rounded-xl border border-border/50 bg-card">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${cat.color} text-xs flex items-center gap-1`}>
                    {cat.icon}
                    {cat.label}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {cat.supplements.map((s) => (
                    <div key={s.slug} className="flex items-center justify-between">
                      <div>
                        <Link href={`/supplements/${s.slug}`}>
                          <span className="text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                            {s.name}
                          </span>
                        </Link>
                        <span className="text-xs text-muted-foreground ml-2">— {s.note}</span>
                      </div>
                      <Star className="w-3 h-3 text-primary/50" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              How We Rate Nootropics
            </h2>
          </div>
          <div className="p-6 rounded-xl border border-border/50 bg-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: "Evidence Quality",
                  desc: "We prioritize peer-reviewed human RCTs over animal studies or anecdotal reports. The number and quality of trials directly impacts the score.",
                },
                {
                  title: "Effect Size",
                  desc: "How large and meaningful are the measured improvements? A 5% memory improvement is less impactful than a 20% reduction in reaction time.",
                },
                {
                  title: "Safety Profile",
                  desc: "Long-term safety data, drug interaction potential, and known adverse effects are all factored in. We penalize compounds with meaningful risks.",
                },
                {
                  title: "Practical Usability",
                  desc: "Dose complexity, cycling requirements, sourcing difficulty, and cost-effectiveness all factor in. The best nootropic you'll actually take consistently.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="p-5 rounded-xl border border-border/50 bg-card">
                <h3 className="font-semibold text-foreground mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Build Your Personal Stack
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
            Combine the nootropics above into a personalized stack using our free Stack Builder. Check interactions, track doses, and save your protocol.
          </p>
          <Link href="/builder">
            <Button className="gap-2">
              Open Stack Builder <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </section>

      </div>
    </main>
  );
}
