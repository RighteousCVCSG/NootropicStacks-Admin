import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SupportPill from "@/components/SupportPill";
import { BookOpen, ArrowRight, Heart, Sparkles, Shield, Zap, Brain, Moon } from "lucide-react";

const PROTOCOLS = [
  {
    icon: Brain,
    name: "Beginner Focus",
    audience: "Students, knowledge workers, anyone starting out",
    cost: "~$28/mo",
    items: [
      { name: "Caffeine", dose: "100mg", timing: "Morning" },
      { name: "L-Theanine", dose: "200mg", timing: "With caffeine" },
      { name: "Omega-3 (DHA/EPA)", dose: "1000mg", timing: "With breakfast" },
    ],
  },
  {
    icon: Sparkles,
    name: "Anxiety & Stress Resilience",
    audience: "High-stress jobs, anxious mornings, burnout recovery",
    cost: "~$42/mo",
    items: [
      { name: "Ashwagandha (KSM-66)", dose: "600mg", timing: "Morning + Evening" },
      { name: "L-Theanine", dose: "200mg", timing: "As needed" },
      { name: "Magnesium L-Threonate", dose: "1500mg", timing: "Evening" },
    ],
  },
  {
    icon: Moon,
    name: "Sleep Optimization",
    audience: "Insomnia, light sleepers, jet lag recovery",
    cost: "~$26/mo",
    items: [
      { name: "Magnesium L-Threonate", dose: "1500mg", timing: "30 min before bed" },
      { name: "Ashwagandha (KSM-66)", dose: "300mg", timing: "Evening" },
      { name: "Melatonin (low dose)", dose: "0.5mg", timing: "Bedtime, occasionally" },
    ],
  },
  {
    icon: Zap,
    name: "Memory & Long-term Brain Health",
    audience: "Adults 30+, cognitive aging concerns",
    cost: "~$58/mo",
    items: [
      { name: "Lion's Mane Mushroom", dose: "1000mg", timing: "Morning" },
      { name: "Bacopa Monnieri", dose: "300mg", timing: "With breakfast" },
      { name: "Omega-3 (DHA-heavy)", dose: "2000mg", timing: "With food" },
      { name: "Creatine Monohydrate", dose: "5g", timing: "Anytime, daily" },
    ],
  },
];

const PRINCIPLES = [
  {
    title: "Start with the foundation",
    body: "Omega-3, Creatine, and Magnesium are nearly universal. They cover deficiencies that quietly tank cognition before any nootropic can help. Nail these first.",
  },
  {
    title: "Add ONE variable at a time",
    body: "Trying 5 new supplements at once is the fastest way to learn nothing. Add one, run it for 2–4 weeks, journal effects, then layer the next.",
  },
  {
    title: "Cycle stimulants and adaptogens",
    body: "Caffeine and ashwagandha both lose efficacy with continuous use. Take 1–2 days off per week, or every 6–8 weeks for adaptogens.",
  },
  {
    title: "Sleep is the most powerful nootropic",
    body: "Bad sleep undoes every supplement. If you sleep poorly, optimize that before anything else — it has higher leverage than any stack.",
  },
];

export default function StarterGuide() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">
        {/* Hero */}
        <div className="mb-10">
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
            <BookOpen className="w-3 h-3 mr-1" />
            Starter Guide · Free Preview
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            The 2026 Starter Stack Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A condensed, evidence-backed primer on building your first nootropic stack — 4 ready-made protocols,
            stacking principles, and what to do (and avoid) in your first 30 days.
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            <strong className="text-foreground">Free version below.</strong> The full 40-page PDF — with vendor
            comparisons, biomarker tracking sheets, and the 8 advanced protocols — is{" "}
            <Link href="/support" className="text-primary hover:underline">unlocked with a $1 tip</Link>.
          </p>
        </div>

        {/* Principles */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-5">Four principles before any supplement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRINCIPLES.map(({ title, body }, i) => (
              <div key={title} className="p-5 rounded-xl border border-border/50 bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono-brand text-primary">0{i + 1}</span>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Protocols */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-5">Four protocols you can start this week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROTOCOLS.map(({ icon: Icon, name, audience, cost, items }) => (
              <div key={name} className="p-5 rounded-xl border border-border/50 bg-card flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground">{name}</h3>
                    <p className="text-xs text-muted-foreground">{audience}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-border/50 shrink-0">
                    {cost}
                  </Badge>
                </div>
                <ul className="space-y-1.5 pt-2 border-t border-border/30">
                  {items.map(({ name: itemName, dose, timing }) => (
                    <li key={itemName} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{itemName}</span>
                      <span className="text-xs text-muted-foreground font-mono-brand">
                        {dose} · {timing}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="mb-12">
          <div className="p-6 rounded-xl border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Before you buy anything</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Talk to your doctor if you take medication or have a chronic condition.</li>
                  <li>• Buy from vendors that publish third-party Certificates of Analysis (CoA).</li>
                  <li>• Start at the LOWEST clinical dose, not the maximum.</li>
                  <li>• Don't add more than one new supplement per 2 weeks.</li>
                  <li>• Pregnant/nursing? Most adaptogens (especially ashwagandha) are not safe.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="mb-12 p-8 rounded-2xl border border-primary/30 bg-primary/5 text-center">
          <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Get the full 40-page PDF
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Includes 8 advanced protocols (creative work, post-illness recovery, ADHD, longevity),
            vendor scorecards, and a 30-day biomarker tracking template.
          </p>
          <SupportPill variant="card" className="max-w-md mx-auto" />
        </section>

        {/* Next steps */}
        <section className="text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Ready to build?</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/builder">
                Open Stack Builder <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/best-stacks">
                Browse All Stacks <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
