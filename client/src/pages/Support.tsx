import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Download, Coffee, Sparkles, ArrowRight, Check } from "lucide-react";
import { PAYMENT_CONFIG, hasPaymentConfigured } from "@/lib/payment-config";

const PERKS = [
  "7 evidence-backed protocols (focus, sleep, stress, longevity, more)",
  "Exact dosages and timing for each supplement",
  "Vendor recommendations with quality ranking",
  "Stacking principles — what combines, what doesn't",
  "30-day onboarding plan to start safely",
];

export default function Support() {
  const stripeUrl = PAYMENT_CONFIG.stripePaymentLink;
  const bmacUrl = PAYMENT_CONFIG.buyMeCoffeeUrl;
  const configured = hasPaymentConfigured();

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
            <Heart className="w-3 h-3 mr-1" />
            Support NootropicStacker
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Tip {PAYMENT_CONFIG.tipAmount} — Get the Starter Stack Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {PAYMENT_CONFIG.productPromise}
          </p>
        </div>

        {/* Product card */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                {PAYMENT_CONFIG.productName}
              </h2>
              <p className="text-muted-foreground text-sm">
                40-page PDF · Updated for 2026 · Instant download
              </p>
            </div>
          </div>

          <ul className="space-y-2 mb-6">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          {/* Payment buttons */}
          {configured ? (
            <div className="flex flex-col sm:flex-row gap-3">
              {stripeUrl && (
                <Button size="lg" className="flex-1 glow-green" asChild>
                  <a href={stripeUrl} target="_blank" rel="noopener noreferrer">
                    <Heart className="w-4 h-4 mr-2" />
                    Tip {PAYMENT_CONFIG.tipAmount} via Stripe
                  </a>
                </Button>
              )}
              {bmacUrl && (
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <a href={bmacUrl} target="_blank" rel="noopener noreferrer">
                    <Coffee className="w-4 h-4 mr-2" />
                    Buy Me a Coffee
                  </a>
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-sm text-amber-400 font-medium mb-1">Coming soon</p>
              <p className="text-xs text-muted-foreground">
                Payment links are being set up. Want to be notified when the guide is ready?{" "}
                <Link href="/" className="text-primary hover:underline">Subscribe to the newsletter</Link>.
              </p>
            </div>
          )}
        </div>

        {/* Why support */}
        <div className="rounded-xl border border-border/50 bg-card p-6 mb-8">
          <h3 className="font-display font-semibold text-foreground mb-3">Why your tip matters</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            NootropicStacker is independent — no VC, no sponsor influence over what we recommend.
            We do partner with Amazon, iHerb, and a few vendors for affiliate commissions, but we
            only feature supplements with strong clinical evidence. Direct tips help us cover hosting,
            research time, and keep the site free.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every tip gets you the full Starter Stack Guide PDF — instantly, no email gate, no upsell.
          </p>
        </div>

        {/* Free alternative CTA */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Not ready to tip? The whole site is free — start exploring:
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link href="/builder">
                Build a Stack <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/best-stacks">
                Browse Best Stacks <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
