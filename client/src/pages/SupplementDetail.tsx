import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AffiliateBanner from "@/components/AffiliateBanner";
import { SPONSORED_BANNERS, AFFILIATE_PARTNERS } from "../../../shared/affiliates";
import { amazonFallbackUrl, iherbFallbackUrl } from "@/lib/affiliate-fallback";
import { ArrowLeft, ShoppingCart, ExternalLink, Shield, Zap } from "lucide-react";

const SCORE_ITEMS = [
  { key: "scoreFocus", label: "Focus", color: "oklch(0.65 0.2 290)" },
  { key: "scoreMemory", label: "Memory", color: "oklch(0.78 0.15 200)" },
  { key: "scoreEnergy", label: "Energy", color: "oklch(0.78 0.18 75)" },
  { key: "scoreMood", label: "Mood", color: "oklch(0.72 0.2 165)" },
  { key: "scoreCreativity", label: "Creativity", color: "oklch(0.72 0.18 330)" },
  { key: "scoreSleep", label: "Sleep", color: "oklch(0.6 0.15 240)" },
  { key: "scoreAnxiety", label: "Calm", color: "oklch(0.65 0.22 25)" },
] as const;

const SAFETY_CONFIG = {
  very_safe: { label: "Very Safe", color: "oklch(0.72 0.2 165)", desc: "Excellent safety profile with extensive human research." },
  safe: { label: "Safe", color: "oklch(0.78 0.15 200)", desc: "Good safety profile at recommended doses." },
  moderate: { label: "Moderate Caution", color: "oklch(0.78 0.18 75)", desc: "Generally safe but may interact with medications." },
  caution: { label: "Use Caution", color: "oklch(0.65 0.22 25)", desc: "Consult a healthcare provider before use." },
};

export default function SupplementDetail() {
  const params = useParams<{ slug: string }>();
  const trackClick = trpc.affiliate.trackClick.useMutation();
  const { data: supp, isLoading } = trpc.supplements.bySlug.useQuery({ slug: params.slug ?? "" });

  const handleBuy = (url: string, partner: string) => {
    if (!supp) return;
    trackClick.mutate({
      supplementSlug: supp.slug,
      supplementId: supp.id,
      affiliatePartner: partner,
      destinationUrl: url,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl">
          <div className="h-8 w-32 bg-card rounded animate-pulse mb-8" />
          <div className="h-64 bg-card rounded-xl animate-pulse" />
        </div>
      </main>
    );
  }

  if (!supp) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl text-center py-20">
          <p className="text-muted-foreground mb-4">Supplement not found.</p>
          <Button asChild><Link href="/library">Back to Library</Link></Button>
        </div>
      </main>
    );
  }

  const safety = supp.safetyRating ? SAFETY_CONFIG[supp.safetyRating] : null;

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/library" className="hover:text-foreground flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" />
            Library
          </Link>
          <span>/</span>
          <span className="text-foreground">{supp.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline" className="text-muted-foreground">{supp.category}</Badge>
                {supp.isFeatured && (
                  <Badge className="bg-primary/15 text-primary border-primary/30">Featured</Badge>
                )}
                {supp.isPopular && (
                  <Badge className="bg-[oklch(0.78_0.18_75)/15] text-[oklch(0.78_0.18_75)] border-[oklch(0.78_0.18_75)/30]">
                    Popular
                  </Badge>
                )}
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-3">{supp.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{supp.summary}</p>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{supp.description}</p>
            </div>

            {/* Dosage */}
            {supp.dosageMin && (
              <div className="p-5 rounded-xl border border-border/50 bg-card/50">
                <h2 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Recommended Dosage
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono-brand text-2xl font-bold text-primary">
                    {supp.dosageMin}
                    {supp.dosageMax && supp.dosageMax !== supp.dosageMin ? `–${supp.dosageMax}` : ""}
                  </span>
                  <span className="text-muted-foreground">{supp.dosageUnit} per day</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Always start at the lower end of the range and adjust based on individual response.
                </p>
              </div>
            )}

            {/* Safety */}
            {safety && (
              <div
                className="p-5 rounded-xl border"
                style={{ borderColor: `${safety.color}30`, backgroundColor: `${safety.color}08` }}
              >
                <h2 className="font-display text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: safety.color }} />
                  Safety Rating: <span style={{ color: safety.color }}>{safety.label}</span>
                </h2>
                <p className="text-sm text-muted-foreground">{safety.desc}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  This information is for educational purposes only. Consult a healthcare provider before starting any supplement regimen.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Effect Scores */}
            <div className="p-5 rounded-xl border border-border/50 bg-card">
              <h3 className="font-display font-semibold text-foreground mb-4">Effect Scores</h3>
              <div className="space-y-3">
                {SCORE_ITEMS.map(({ key, label, color }) => {
                  const score = (supp[key] as number) ?? 0;
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-mono-brand" style={{ color }}>{score}/10</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${(score / 10) * 100}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buy Buttons */}
            <div className="p-5 rounded-xl border border-border/50 bg-card space-y-3">
              <h3 className="font-display font-semibold text-foreground mb-3">Where to Buy</h3>
              {supp.affiliatePrimary && (
                <Button
                  className="w-full glow-green"
                  onClick={() => handleBuy(supp.affiliatePrimary!, supp.affiliatePrimaryLabel ?? "Primary")}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {supp.affiliatePrimaryLabel ?? "Buy Now"}
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
              )}
              {supp.affiliateSecondary && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleBuy(supp.affiliateSecondary!, supp.affiliateSecondaryLabel ?? "Secondary")}
                >
                  {supp.affiliateSecondaryLabel ?? "Alternative Vendor"}
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
              )}
              <Button
                variant={supp.affiliatePrimary ? "ghost" : "outline"}
                className={supp.affiliatePrimary ? "w-full text-muted-foreground hover:text-foreground" : "w-full"}
                onClick={() => handleBuy(supp.affiliateAmazon ?? amazonFallbackUrl(supp.name), "Amazon")}
              >
                Amazon
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground"
                onClick={() => handleBuy(iherbFallbackUrl(supp.name), "iHerb")}
              >
                iHerb
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>
              <p className="text-xs text-muted-foreground pt-1">
                Affiliate links — we may earn a commission at no extra cost to you.
              </p>
            </div>

            {/* Stack Builder CTA */}
            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-sm font-semibold text-foreground mb-2">Add to Your Stack</p>
              <p className="text-xs text-muted-foreground mb-3">
                Combine {supp.name} with other supplements in our interactive stack builder.
              </p>
              <Button size="sm" className="w-full" asChild>
                <Link href="/builder">Open Stack Builder</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related banner */}
        <div className="mt-12">
          <AffiliateBanner banner={SPONSORED_BANNERS[3]} />
        </div>
      </div>
    </main>
  );
}
