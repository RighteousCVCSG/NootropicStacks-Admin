import { Info } from "lucide-react";

export default function AffiliateDisclosure() {
  return (
    <footer className="border-t border-border/50 bg-background/95">
      <div className="container py-4">
        <div className="flex items-start gap-2 text-xs text-muted-foreground max-w-4xl mx-auto">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <p>
            <strong className="text-foreground/70">Affiliate Disclosure:</strong>{" "}
            NootropicStacker.com is a participant in affiliate programs including
            Nootropics Depot, Mind Lab Pro, Neurohacker, Thorne, iHerb, Onnit,
            Four Sigmatic, AG1, and Amazon Associates. Links on this site may be
            affiliate links, meaning we earn a small commission if you make a
            purchase — at no additional cost to you. This helps support the site
            and allows us to continue providing free, research-backed content.
            Our recommendations are based on research and are not influenced by
            affiliate partnerships.
          </p>
        </div>
      </div>
    </footer>
  );
}
