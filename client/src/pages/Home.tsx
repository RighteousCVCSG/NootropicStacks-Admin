import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SPONSORED_BANNERS } from "../../../shared/affiliates";
import { Brain, Zap, ArrowRight, Star, Shield, ExternalLink, Layers, FlaskConical, Sparkles, Newspaper } from "lucide-react";
import AffiliateBanner from "@/components/AffiliateBanner";

const ENTRY_CARDS = [
  {
    href: "/builder",
    icon: Layers,
    label: "Stack Builder",
    description: "Pick supplements, score the synergy, and buy each one — no signup.",
    accent: "primary",
  },
  {
    href: "/library",
    icon: FlaskConical,
    label: "Supplement Library",
    description: "24+ research-backed nootropics with effect scores, doses, and vendors.",
    accent: "blue",
  },
  {
    href: "/best-stacks",
    icon: Sparkles,
    label: "Best Stacks",
    description: "Goal-built protocols (focus, anxiety, sleep) — load any with one click.",
    accent: "green",
  },
  {
    href: "/celebrity-stacks",
    icon: Star,
    label: "Celebrity Stacks",
    description: "Verified daily protocols from Huberman, Asprey, Rogan, and 5 more.",
    accent: "amber",
  },
] as const;

const ACCENT_CLASSES: Record<string, string> = {
  primary: "border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/10",
  blue: "border-[oklch(0.78_0.15_200)/30] hover:border-[oklch(0.78_0.15_200)/60] bg-[oklch(0.78_0.15_200)/5] hover:bg-[oklch(0.78_0.15_200)/10]",
  green: "border-[oklch(0.72_0.2_165)/30] hover:border-[oklch(0.72_0.2_165)/60] bg-[oklch(0.72_0.2_165)/5] hover:bg-[oklch(0.72_0.2_165)/10]",
  amber: "border-[oklch(0.78_0.18_75)/30] hover:border-[oklch(0.78_0.18_75)/60] bg-[oklch(0.78_0.18_75)/5] hover:bg-[oklch(0.78_0.18_75)/10]",
};

const ICON_ACCENT: Record<string, string> = {
  primary: "text-primary",
  blue: "text-[oklch(0.78_0.15_200)]",
  green: "text-[oklch(0.72_0.2_165)]",
  amber: "text-[oklch(0.78_0.18_75)]",
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const subscribeMutation = trpc.leads.subscribe.useMutation({
    onSuccess: () => {
      setLeadSubmitted(true);
      toast.success("You're in! Check your email for the guide.");
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

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
            <p className="mt-4 text-sm text-muted-foreground">
              Build a stack, compare vendors, and buy from trusted sellers — no signup required.
            </p>

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

      {/* ─── Explore the App ──────────────────────────────────────────────── */}
      <section className="py-16 border-y border-border/50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Where do you want to start?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pick the door that fits your moment. The whole app is open without signup.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {ENTRY_CARDS.map(({ href, icon: Icon, label, description, accent }) => (
              <Link
                key={href}
                href={href}
                className={`group flex flex-col gap-3 p-6 rounded-xl border transition-all duration-200 ${ACCENT_CLASSES[accent]}`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-6 h-6 ${ICON_ACCENT[accent]}`} />
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Editorial Showcases ──────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-foreground">Featured this month</h2>
            <p className="text-muted-foreground text-sm mt-1">Quick reads — no clicking around required.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                href: "/best-nootropics",
                tag: "Editorial",
                title: "The 5 Best Nootropics in 2026",
                desc: "Our shortlist after reviewing 24+ supplements head-to-head.",
              },
              {
                href: "/guides/mind-lab-pro-review",
                tag: "Review",
                title: "Mind Lab Pro: 11 Ingredients, Honest Verdict",
                desc: "Why this is the most-recommended pre-built stack on the site.",
              },
              {
                href: "/research",
                tag: "Library",
                title: "15 Curated Studies on Nootropics",
                desc: "PubMed-cited research summaries for the supplements we cover.",
              },
            ].map(({ href, tag, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-2 p-5 rounded-xl border border-border/50 bg-card hover:border-border hover:bg-card/80 transition-colors"
              >
                <Badge variant="outline" className="self-start text-xs border-border/50 text-muted-foreground">
                  <Newspaper className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <span className="text-sm text-primary mt-auto pt-2 inline-flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
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

    </main>
  );
}
