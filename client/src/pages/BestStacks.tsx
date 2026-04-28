import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Brain, FlaskConical, Moon, Zap, Heart, Leaf, Layers } from "lucide-react";
import { useQuickStack } from "@/contexts/QuickStackContext";
import { toast } from "sonner";

const STACKS = [
  {
    id: 1,
    name: "The Focus Stack",
    goal: "Focus",
    icon: <Brain className="w-4 h-4" />,
    difficulty: "Beginner",
    color: "border-blue-500/20 bg-blue-500/5",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    slugs: ['l-theanine', 'caffeine', 'lions-mane'],
    supplements: [
      { name: "L-Theanine", dose: "200mg", timing: "Morning" },
      { name: "Caffeine", dose: "100mg", timing: "Morning" },
      { name: "Lion's Mane", dose: "500mg", timing: "Morning" },
    ],
    synergy:
      "L-Theanine smooths caffeine's jitteriness while sharpening its focus effect. Lion's Mane provides long-term NGF support that compounds over weeks — the stimulant layer gives you results today, Lion's Mane builds your baseline over time.",
  },
  {
    id: 2,
    name: "The Study Stack",
    goal: "Memory & Learning",
    icon: <FlaskConical className="w-4 h-4" />,
    difficulty: "Intermediate",
    color: "border-purple-500/20 bg-purple-500/5",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    slugs: ['bacopa-monnieri', 'alpha-gpc', 'l-theanine'],
    supplements: [
      { name: "Bacopa Monnieri", dose: "300mg", timing: "With lunch" },
      { name: "Alpha GPC", dose: "300mg", timing: "Morning" },
      { name: "L-Theanine", dose: "200mg", timing: "Morning" },
    ],
    synergy:
      "Alpha GPC raises acetylcholine — the learning neurotransmitter — giving Bacopa's memory mechanisms a richer substrate to work with. L-Theanine reduces the anxiety that impairs information encoding. Expect full effects after 6–8 weeks.",
  },
  {
    id: 3,
    name: "The Calm Stack",
    goal: "Stress & Anxiety",
    icon: <Leaf className="w-4 h-4" />,
    difficulty: "Beginner",
    color: "border-green-500/20 bg-green-500/5",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    slugs: ['ashwagandha', 'l-theanine', 'magnesium-glycinate'],
    supplements: [
      { name: "Ashwagandha", dose: "600mg", timing: "Morning" },
      { name: "L-Theanine", dose: "400mg", timing: "As needed" },
      { name: "Magnesium Glycinate", dose: "400mg", timing: "Evening" },
    ],
    synergy:
      "Ashwagandha reduces cortisol at the hormonal level over weeks. L-Theanine provides immediate alpha wave promotion for acute anxiety moments. Magnesium fills the most common mineral deficiency linked to anxiety and ensures restorative sleep to support recovery.",
  },
  {
    id: 4,
    name: "The Memory Stack",
    goal: "Memory & Recall",
    icon: <Layers className="w-4 h-4" />,
    difficulty: "Intermediate",
    color: "border-violet-500/20 bg-violet-500/5",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    slugs: ['bacopa-monnieri', 'lions-mane', 'omega-3'],
    supplements: [
      { name: "Bacopa Monnieri", dose: "300mg", timing: "With lunch" },
      { name: "Lion's Mane", dose: "500mg", timing: "Morning" },
      { name: "Omega-3 DHA", dose: "1g", timing: "With breakfast" },
    ],
    synergy:
      "Bacopa improves consolidation and recall through bacosides that modulate hippocampal function. Lion's Mane supports the physical structure of neurons via NGF. DHA is literally the fat your brain is built from — deficiency impairs every aspect of memory.",
  },
  {
    id: 5,
    name: "The Energy Stack",
    goal: "Clean Energy",
    icon: <Zap className="w-4 h-4" />,
    difficulty: "Beginner",
    color: "border-yellow-500/20 bg-yellow-500/5",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    slugs: ['rhodiola', 'coq10', 'l-tyrosine'],
    supplements: [
      { name: "Rhodiola Rosea", dose: "200mg", timing: "Morning, empty stomach" },
      { name: "CoQ10", dose: "200mg", timing: "With breakfast" },
      { name: "B-Complex", dose: "1 capsule", timing: "Morning" },
    ],
    synergy:
      "Rhodiola reduces mental fatigue and improves performance under stress — best results within 30 minutes on an empty stomach. CoQ10 supports mitochondrial ATP production for sustained cellular energy. B vitamins are essential cofactors in energy metabolism; deficiencies are a primary cause of chronic fatigue.",
  },
  {
    id: 6,
    name: "The Sleep Stack",
    goal: "Sleep Quality",
    icon: <Moon className="w-4 h-4" />,
    difficulty: "Beginner",
    color: "border-indigo-500/20 bg-indigo-500/5",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    slugs: ['magnesium-glycinate', 'l-theanine', 'melatonin'],
    supplements: [
      { name: "Magnesium Glycinate", dose: "400mg", timing: "30–60 min before bed" },
      { name: "L-Theanine", dose: "200mg", timing: "30–60 min before bed" },
      { name: "Melatonin", dose: "0.5mg", timing: "30 min before bed" },
    ],
    synergy:
      "Magnesium activates GABA receptors and supports deep slow-wave sleep. L-Theanine reduces sleep latency by promoting alpha waves. Low-dose melatonin (0.5mg) signals circadian rhythm without suppressing natural production — far more effective than the 5–10mg doses commonly sold.",
  },
  {
    id: 7,
    name: "The Mood Stack",
    goal: "Mood & Wellbeing",
    icon: <Heart className="w-4 h-4" />,
    difficulty: "Beginner",
    color: "border-rose-500/20 bg-rose-500/5",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    slugs: ['ashwagandha', 'rhodiola', 'omega-3'],
    supplements: [
      { name: "Ashwagandha", dose: "600mg", timing: "Morning" },
      { name: "Rhodiola Rosea", dose: "200mg", timing: "Morning" },
      { name: "Omega-3 DHA", dose: "1g", timing: "With breakfast" },
    ],
    synergy:
      "Ashwagandha lowers cortisol and balances stress hormones — a primary driver of mood dysregulation. Rhodiola upregulates serotonin and dopamine transporters. Omega-3 DHA supports cell membrane fluidity in neurons, with multiple meta-analyses showing meaningful antidepressant effects.",
  },
  {
    id: 8,
    name: "The Longevity Stack",
    goal: "Long-Term Brain Health",
    icon: <Leaf className="w-4 h-4" />,
    difficulty: "Intermediate",
    color: "border-teal-500/20 bg-teal-500/5",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    slugs: ['nmn', 'coq10', 'omega-3'],
    supplements: [
      { name: "NMN", dose: "500mg", timing: "Morning, empty stomach" },
      { name: "CoQ10", dose: "200mg", timing: "With breakfast" },
      { name: "Omega-3 DHA", dose: "1g", timing: "With breakfast" },
    ],
    synergy:
      "NMN raises NAD+ levels — the cellular energy currency that declines with age. CoQ10 supports mitochondrial function and acts as a potent antioxidant. DHA protects cell membrane integrity over decades. This stack targets the underlying mechanisms of cognitive aging rather than symptomatic relief.",
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function BestStacks() {
  const { addItem } = useQuickStack();

  const loadStack = (stack: typeof STACKS[number]) => {
    stack.slugs.forEach((slug, i) => {
      addItem({ slug, name: stack.supplements[i]?.name ?? slug });
    });
    toast.success(`${stack.name} loaded! (${stack.slugs.length} supplements added)`);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">

        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-primary/15 text-primary border-primary/30">Updated 2026</Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground border-border/30">
              Curated &amp; Tested
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            8 Best Nootropic Stacks<br />
            <span className="text-primary">in 2026</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Curated combinations with synergistic mechanisms — each stack is designed around a specific goal, with evidence-backed compounds at effective doses.
          </p>
        </div>

        <Separator className="mb-12 border-border/30" />

        {/* Stack Cards */}
        <section className="mb-14 space-y-5">
          {STACKS.map((stack) => (
            <div
              key={stack.id}
              className={`p-6 rounded-xl border ${stack.color}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-background/60 border border-border/40 text-foreground flex items-center justify-center font-bold text-sm">
                  {stack.id}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h2 className="font-display text-lg font-bold text-foreground">{stack.name}</h2>
                    <Badge className={`${stack.badgeColor} text-xs flex items-center gap-1`}>
                      {stack.icon}
                      {stack.goal}
                    </Badge>
                    <Badge className={`${DIFFICULTY_COLORS[stack.difficulty]} text-xs`}>
                      {stack.difficulty}
                    </Badge>
                  </div>

                  {/* Supplement list */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {stack.supplements.map((s) => (
                        <div
                          key={s.name}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/60 border border-border/40"
                        >
                          <span className="text-xs font-medium text-foreground">{s.name}</span>
                          <span className="text-xs text-primary font-semibold">{s.dose}</span>
                          <span className="text-xs text-muted-foreground">· {s.timing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Synergy */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {stack.synergy}
                  </p>

                  {/* CTA */}
                  <Button size="sm" variant="outline" className="w-full text-xs border-border/50 gap-1"
                    onClick={() => loadStack(stack)}>
                    Build This Stack <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* How to Choose */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              How to Choose Your Stack
            </h2>
            <p className="text-muted-foreground text-sm">
              Four questions to find the right starting point.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "1. What's your primary goal?",
                a: "Focus, memory, anxiety, sleep, energy, or long-term brain health? Pick the stack that targets it directly. Trying to optimize everything at once is the most common mistake beginners make.",
              },
              {
                q: "2. What's your experience level?",
                a: "If you've never taken nootropics, start with a Beginner stack. These use well-tolerated compounds at conservative doses. Intermediate stacks involve more complex timing, longer lead times, or compounds that need monitoring.",
              },
              {
                q: "3. How long are you willing to commit?",
                a: "The Focus Stack works same-day. The Memory and Longevity stacks require 8–12 weeks for meaningful results. Be honest about your patience — a stack you'll abandon in 2 weeks is less valuable than a simpler one you'll stick with.",
              },
              {
                q: "4. Are you on medications?",
                a: "Adaptogens (Ashwagandha, Rhodiola) can interact with thyroid medications. Bacopa may interact with certain antidepressants. Always consult your doctor if you're on prescription medications.",
              },
            ].map((item) => (
              <div key={item.q} className="p-5 rounded-xl border border-border/50 bg-card">
                <h3 className="font-semibold text-foreground text-sm mb-2">{item.q}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <Layers className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Customize Any of These Stacks
          </h2>
          <p className="text-muted-foreground mb-3 max-w-md mx-auto text-sm">
            The Stack Builder lets you modify doses, add or remove supplements, check interactions, and save your personal protocol.
          </p>
          <p className="text-xs text-muted-foreground mb-6 max-w-sm mx-auto">
            Browse 200+ supplements, see research summaries, and build with confidence — free, no account required.
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
