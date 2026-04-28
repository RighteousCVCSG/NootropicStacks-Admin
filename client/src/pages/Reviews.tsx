import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Star, CheckCircle2, XCircle, ArrowRight, ShoppingCart, FlaskConical } from "lucide-react";

const STACK_REVIEWS = [
  {
    slug: "mind-lab-pro",
    name: "Mind Lab Pro",
    rating: 4.6,
    verdict: "Recommended",
    badge: "Best All-Around",
    tagline: "The most transparently formulated all-in-one nootropic on the market.",
    ingredients: ["Citicoline 250mg", "Bacopa 150mg", "Lion's Mane 500mg", "PS 100mg", "N-Acetyl L-Tyrosine 175mg", "L-Theanine 100mg", "Rhodiola 50mg"],
    priceRange: "$69–$207 / 1–3 months",
    pros: ["Fully transparent label — no proprietary blends", "Evidence-backed doses across all 11 ingredients"],
    cons: ["Premium price point vs. building your own", "Some ingredients slightly below clinical study doses"],
    buyUrl: "https://www.amazon.com/s?k=mind+lab+pro+nootropic&tag=nootropicstk-20",
  },
  {
    slug: "alpha-brain",
    name: "Alpha Brain",
    rating: 3.8,
    verdict: "Caution",
    badge: "Popular But Overhyped",
    tagline: "Massive marketing budget, proprietary blends that obscure actual dosages.",
    ingredients: ["Onnit Flow Blend (proprietary)", "Onnit Focus Blend (proprietary)", "Onnit Fuel Blend (proprietary)", "Bacopa (undisclosed dose)", "Alpha GPC (undisclosed dose)"],
    priceRange: "$35–$80 / month",
    pros: ["Widely available, brand recognition", "Some users report subjective benefit"],
    cons: ["Proprietary blends hide individual ingredient doses", "Active ingredients likely significantly underdosed vs. clinical evidence"],
    buyUrl: "https://www.amazon.com/s?k=alpha+brain+onnit+nootropic&tag=nootropicstk-20",
  },
  {
    slug: "qualia-mind",
    name: "Qualia Mind",
    rating: 4.4,
    verdict: "Recommended",
    badge: "Premium Pick",
    tagline: "28 ingredients at high doses — the most comprehensive stack available.",
    ingredients: ["Citicoline 250mg", "Alpha GPC 200mg", "Bacopa 300mg", "Lion's Mane 500mg", "Rhodiola 300mg", "Phosphatidylserine 100mg", "+22 more"],
    priceRange: "$139–$185 / month",
    pros: ["Largest ingredient count with mostly transparent dosing", "High doses — many at or above clinical study amounts"],
    cons: ["Extremely expensive — hard to justify vs. custom stack", "28 ingredients makes it difficult to isolate what's working"],
    buyUrl: "https://www.amazon.com/s?k=qualia+mind+nootropic&tag=nootropicstk-20",
  },
  {
    slug: "performance-lab-mind",
    name: "Performance Lab Mind",
    rating: 4.2,
    verdict: "Recommended",
    badge: "Clean Quality",
    tagline: "Minimalist 4-ingredient formula — every compound at a meaningful dose.",
    ingredients: ["Citicoline 250mg (Cognizin)", "Sharp-PS Phosphatidylserine 100mg", "Ajipure L-Tyrosine 250mg", "Maritime Pine Bark 75mg"],
    priceRange: "$50–$75 / month",
    pros: ["Premium ingredient forms (Cognizin, Sharp-PS)", "Simple — easy to track what's working, easy to stack on top"],
    cons: ["Only 4 ingredients — limited coverage vs. full stacks", "Missing key compounds like Bacopa and Lion's Mane"],
    buyUrl: "https://www.amazon.com/s?k=performance+lab+mind+nootropic&tag=nootropicstk-20",
  },
  {
    slug: "thesis-nootropics",
    name: "Thesis Nootropics",
    rating: 4.1,
    verdict: "Recommended",
    badge: "Best Personalized",
    tagline: "Custom formula quiz + rotating monthly blends for your specific goals.",
    ingredients: ["Varies by formula", "Focus blend: Alpha GPC, L-Theanine, TeaCrine", "Clarity blend: Saffron, Lion's Mane, Bacopa", "Energy blend: Dynamine, Zembrin, L-Citrulline"],
    priceRange: "$79–$119 / month",
    pros: ["Personalized formula based on intake quiz", "Allows users to trial and rotate different blend profiles"],
    cons: ["Most blends still proprietary — doses not always disclosed", "Personalization algorithm unverified — mostly marketing framing"],
    buyUrl: "https://www.amazon.com/s?k=thesis+nootropics+personalized&tag=nootropicstk-20",
  },
  {
    slug: "onnit-new-mood",
    name: "Onnit New Mood",
    rating: 3.5,
    verdict: "Skip",
    badge: "Mood Only",
    tagline: "Decent mood support but misrepresented as a cognitive nootropic stack.",
    ingredients: ["5-HTP 100mg", "L-Tryptophan 500mg", "Niacin 25mg", "Vitamin B6 10mg", "Valerian Root 150mg"],
    priceRange: "$30–$50 / month",
    pros: ["Effective for evening mood and sleep support", "Low price point, simple formula"],
    cons: ["5-HTP + Tryptophan is genuinely useful but this isn't a nootropic stack", "Taking 5-HTP daily long-term without B6 cofactors can deplete serotonin precursors"],
    buyUrl: "https://www.amazon.com/s?k=onnit+new+mood+supplement&tag=nootropicstk-20",
  },
];

const VERDICT_STYLES: Record<string, { badge: string; icon: string }> = {
  Recommended: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: "text-emerald-400" },
  Caution: { badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", icon: "text-amber-400" },
  Skip: { badge: "bg-red-500/15 text-red-400 border-red-500/30", icon: "text-red-400" },
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = i <= full ? 1 : i === full + 1 && partial >= 0.5 ? 0.5 : 0;
        return (
          <Star
            key={i}
            className={`w-4 h-4 ${fill === 1 ? "text-amber-400 fill-amber-400" : fill === 0.5 ? "text-amber-400 fill-amber-400/50" : "text-border"}`}
          />
        );
      })}
      <span className="text-sm font-semibold text-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Reviews() {
  const trackClick = trpc.affiliate.trackClick.useMutation();

  const handleBuy = (url: string, partner: string, supplement: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    trackClick.mutate({ supplementSlug: supplement, affiliatePartner: partner, destinationUrl: url, referrer: "reviews" });
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">

        {/* Hero */}
        <div className="mb-10">
          <Badge className="bg-primary/15 text-primary border-primary/30 mb-4">Reviews</Badge>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Nootropic Stack Reviews: Honest, Science-Based Ratings
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            We buy and analyze popular nootropic stacks, score each ingredient against clinical evidence, and give you a straight verdict.
          </p>
        </div>

        {/* Rating Methodology */}
        <Card className="mb-10 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <FlaskConical className="w-5 h-5 text-primary" />
              Our Rating Methodology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              {[
                { label: "Label Transparency (25%)", desc: "Full ingredient disclosure vs. proprietary blend hiding." },
                { label: "Ingredient Evidence (30%)", desc: "Each compound scored against published RCTs and meta-analyses." },
                { label: "Dose Accuracy (25%)", desc: "Doses compared to amounts used in clinical studies." },
                { label: "Value (20%)", desc: "Cost vs. what you'd spend building the same stack yourself." },
              ].map((item) => (
                <div key={item.label} className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <div>
                    <span className="font-medium text-foreground">{item.label}</span>
                    <p className="text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <div className="space-y-6 mb-12">
          {STACK_REVIEWS.map((review) => {
            const verdict = VERDICT_STYLES[review.verdict];
            return (
              <Card key={review.slug} className="border-border/50">
                <CardContent className="pt-6 pb-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="font-display text-xl font-bold text-foreground">{review.name}</h2>
                        <Badge variant="outline" className="text-xs text-primary border-primary/30 bg-primary/10">
                          {review.badge}
                        </Badge>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <Badge variant="outline" className={`text-xs ${verdict.badge}`}>
                      {review.verdict}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">{review.tagline}</p>

                  {/* Key Ingredients */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Key Ingredients</p>
                    <div className="flex flex-wrap gap-1">
                      {review.ingredients.map((ing) => (
                        <Badge key={ing} variant="outline" className="text-xs text-muted-foreground border-border/30">
                          {ing}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pros / Cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Pros</p>
                      <div className="space-y-1">
                        {review.pros.map((pro) => (
                          <div key={pro} className="flex gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Cons</p>
                      <div className="space-y-1">
                        {review.cons.map((con) => (
                          <div key={con} className="flex gap-2 text-sm">
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/30">
                    <span className="text-sm text-muted-foreground">
                      Price: <span className="text-foreground font-medium">{review.priceRange}</span>
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border/50 hover:border-primary/50"
                      onClick={() => handleBuy(review.buyUrl, "amazon", review.slug)}
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                      View on Amazon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Separator className="mb-10 border-border/30" />

        {/* Custom Stack Section */}
        <Card className="mb-10 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <FlaskConical className="w-5 h-5 text-primary" />
              Build a Better Custom Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Pre-made stacks have one insurmountable problem: they're designed for the average person, at average doses, at a margin that supports celebrity endorsements and mass marketing. A custom stack built from individual ingredients is almost always cheaper, better-dosed, and more targeted to your specific goals.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              {[
                { label: "Better value", desc: "Individual ingredients from quality vendors cost 30–60% less per dose than pre-made stacks." },
                { label: "Exact dosing", desc: "Match the doses actually used in clinical studies, not what fits in a single capsule serving." },
                { label: "Modular control", desc: "Add or remove compounds based on your response. No guessing which ingredient is working." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg border border-border/40 bg-card">
                  <p className="font-medium text-foreground mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/builder">
                Build My Custom Stack <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8 px-6 rounded-xl border border-border/50 bg-card">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Skip the Markup. Build Smarter.
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Our stack builder lets you assemble a research-backed, goal-specific stack with full transparency on every ingredient and dose.
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
