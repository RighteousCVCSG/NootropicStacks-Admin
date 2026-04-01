import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { GOALS, SPONSORED_BANNERS } from "../../../shared/affiliates";
import { Brain, Zap, ArrowRight, Star, Shield, ExternalLink, ChevronRight } from "lucide-react";
import SupplementCard from "@/components/SupplementCard";
import AffiliateBanner from "@/components/AffiliateBanner";

export default function Home() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const featuredQuery = trpc.supplements.list.useQuery({ featured: true, limit: 6 });
  const recommendQuery = trpc.supplements.recommend.useQuery(
    { goals: selectedGoals, limit: 6 },
    { enabled: selectedGoals.length > 0 }
  );
  const subscribeMutation = trpc.leads.subscribe.useMutation({
    onSuccess: () => {
      setLeadSubmitted(true);
      toast.success("You're in! Check your email for the guide.");
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const displayedSupplements = selectedGoals.length > 0
    ? recommendQuery.data ?? []
    : featuredQuery.data?.items ?? [];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate({ email, name, source: "homepage_hero" });
  };

  return (
    <main className="min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-grid pt-16 pb-24">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none" />
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-[oklch(0.78_0.15_200)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
              <Zap className="w-3 h-3 mr-1" />
              Science-backed nootropic stacking
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Build Your Perfect
              <span className="gradient-text text-glow block">Nootropic Stack</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The free nootropic stack builder for biohackers. Browse research-backed supplements,
              build goal-optimized stacks with real-time synergy analysis, and discover trusted vendors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-green text-base px-8" asChild>
                <Link href="/builder">
                  <Brain className="w-5 h-5 mr-2" />
                  Build My Stack
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <Link href="/library">
                  Browse Library
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
              {[
                { value: "24+", label: "Supplements" },
                { value: "7", label: "Goal Areas" },
                { value: "100%", label: "Free to Use" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Goal Selector ────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              What are your goals?
            </h2>
            <p className="text-muted-foreground">
              Select one or more goals to get personalized supplement recommendations.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-4xl mx-auto">
            {GOALS.map((goal) => {
              const isSelected = selectedGoals.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-primary/60 bg-primary/10 shadow-lg shadow-primary/10"
                      : "border-border/50 bg-card hover:border-border hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-2xl">{goal.icon}</span>
                  <span className={`text-xs font-semibold ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                    {goal.label}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedGoals.length > 0 && (
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Showing top supplements for:{" "}
                <span className="text-primary font-medium">
                  {selectedGoals.map((g) => GOALS.find((x) => x.id === g)?.label).join(", ")}
                </span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Featured / Recommended Supplements ──────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {selectedGoals.length > 0 ? "Recommended For You" : "Featured Supplements"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {selectedGoals.length > 0
                  ? "Top-scoring supplements for your selected goals"
                  : "Editor-selected, research-backed nootropics"}
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/library" className="flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {(featuredQuery.isLoading || (selectedGoals.length > 0 && recommendQuery.isLoading)) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-card border border-border/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedSupplements.map((supp) => (
                <SupplementCard key={supp.id} supplement={supp} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Sponsored Banner ─────────────────────────────────────────────── */}
      <section className="py-8">
        <div className="container">
          <AffiliateBanner banner={SPONSORED_BANNERS[0]} />
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-border/50 bg-card/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Building an optimized nootropic stack has never been easier.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: "🎯",
                title: "Choose Your Goals",
                description: "Select focus, memory, energy, mood, or any combination of cognitive goals you want to optimize.",
              },
              {
                step: "02",
                icon: "🔬",
                title: "Browse & Research",
                description: "Explore our library of 24+ supplements with detailed effect scores, dosage guides, and safety ratings.",
              },
              {
                step: "03",
                icon: "🛒",
                title: "Build & Buy",
                description: "Add supplements to your stack, save it to your account, and purchase from our trusted affiliate partners.",
              },
            ].map(({ step, icon, title, description }) => (
              <div key={step} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4 text-2xl">
                  {icon}
                </div>
                <div className="absolute top-0 right-1/4 font-mono-brand text-6xl font-bold text-border/30 select-none">
                  {step}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Second Banner ────────────────────────────────────────────────── */}
      <section className="py-8">
        <div className="container">
          <AffiliateBanner banner={SPONSORED_BANNERS[1]} />
        </div>
      </section>

      {/* ─── Trust Signals ────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Research-Backed Only",
                description: "Every supplement in our library has peer-reviewed clinical evidence supporting its efficacy and safety.",
              },
              {
                icon: Star,
                title: "Unbiased Recommendations",
                description: "Our goal-based recommender ranks supplements purely on effect scores, not commission rates.",
              },
              {
                icon: ExternalLink,
                title: "Trusted Vendors Only",
                description: "We only link to vendors with third-party lab testing (COA), transparent labeling, and strong reputations.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 p-6 rounded-xl border border-border/50 bg-card/50">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lead Magnet / Email Capture ─────────────────────────────────── */}
      <section className="py-16 bg-card/30 border-y border-border/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 mb-6 text-2xl">
              🧬
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Get the 2026 Biohacker Stack Guide
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Download our free 40-page guide covering the best nootropic stacks for focus, memory,
              sleep, and longevity — with exact dosages, timing protocols, and vendor recommendations.
            </p>
            {leadSubmitted ? (
              <div className="p-6 rounded-xl border border-primary/30 bg-primary/10">
                <p className="text-primary font-semibold text-lg">🎉 You're on the list!</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Check your inbox for the guide. Welcome to the community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary border-border/50 flex-1"
                />
                <Button
                  type="submit"
                  className="glow-green whitespace-nowrap"
                  disabled={subscribeMutation.isPending}
                >
                  {subscribeMutation.isPending ? "Sending..." : "Get Free Guide"}
                </Button>
              </form>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-border/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-display font-bold text-foreground">NootropicStacker</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The most comprehensive nootropic stack builder for biohackers and cognitive optimizers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/library" className="hover:text-foreground transition-colors">Supplement Library</Link></li>
                <li><Link href="/builder" className="hover:text-foreground transition-colors">Stack Builder</Link></li>
                <li><Link href="/guides" className="hover:text-foreground transition-colors">Stack Guides</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Top Vendors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://nootropicsdepot.com/?rfsn=supplement-stacker" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Nootropics Depot</a></li>
                <li><a href="https://www.mindlabpro.com/?a_aid=nootropicstacker" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Mind Lab Pro</a></li>
                <li><a href="https://neurohacker.com/?rfsn=supplement-stacker" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Neurohacker Collective</a></li>
                <li><a href="https://www.thorne.com/?ref=nootropicstacker" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Thorne</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="cursor-default">Affiliate Disclosure</span></li>
                <li><span className="cursor-default">Privacy Policy</span></li>
                <li><span className="cursor-default">Terms of Use</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground">
              © 2026 NootropicStacker.com · All rights reserved
            </p>
            <p className="text-xs text-muted-foreground max-w-md text-center sm:text-right">
              <strong>Affiliate Disclosure:</strong> This site contains affiliate links. We may earn a commission when you purchase through our links at no extra cost to you.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
