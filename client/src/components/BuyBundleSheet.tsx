import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useQuickStack } from "@/contexts/QuickStackContext";
import { buildAttributionReferrer } from "@/lib/utm";

interface SuppCost {
  energy: number;
  relaxation: number;
  brain: number;
  monthlyUsd: number;
}

const SUPP_COSTS: Record<string, SuppCost> = {
  "caffeine": { energy: 9, relaxation: 1, brain: 5, monthlyUsd: 8 },
  "l-theanine": { energy: 3, relaxation: 8, brain: 4, monthlyUsd: 10 },
  "ashwagandha": { energy: 2, relaxation: 9, brain: 4, monthlyUsd: 18 },
  "magnesium-glycinate": { energy: 1, relaxation: 8, brain: 3, monthlyUsd: 14 },
  "melatonin": { energy: 0, relaxation: 9, brain: 2, monthlyUsd: 8 },
  "lions-mane": { energy: 3, relaxation: 4, brain: 10, monthlyUsd: 28 },
  "bacopa-monnieri": { energy: 2, relaxation: 6, brain: 9, monthlyUsd: 18 },
  "alpha-gpc": { energy: 4, relaxation: 3, brain: 9, monthlyUsd: 32 },
  "rhodiola": { energy: 7, relaxation: 5, brain: 6, monthlyUsd: 22 },
  "omega-3": { energy: 2, relaxation: 4, brain: 8, monthlyUsd: 20 },
  "vitamin-d3": { energy: 3, relaxation: 3, brain: 5, monthlyUsd: 10 },
  "creatine": { energy: 6, relaxation: 2, brain: 7, monthlyUsd: 15 },
  "phosphatidylserine": { energy: 3, relaxation: 5, brain: 8, monthlyUsd: 30 },
  "nmn": { energy: 5, relaxation: 3, brain: 6, monthlyUsd: 45 },
  "coq10": { energy: 6, relaxation: 3, brain: 5, monthlyUsd: 25 },
  "l-tyrosine": { energy: 7, relaxation: 2, brain: 7, monthlyUsd: 14 },
  "ginkgo-biloba": { energy: 4, relaxation: 4, brain: 7, monthlyUsd: 12 },
  "huperzine-a": { energy: 3, relaxation: 2, brain: 8, monthlyUsd: 16 },
  "citicoline": { energy: 5, relaxation: 3, brain: 9, monthlyUsd: 28 },
};

const DEFAULT_MONTHLY = 20;

function getMonthly(slug: string): number {
  return SUPP_COSTS[slug]?.monthlyUsd ?? DEFAULT_MONTHLY;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BuyBundleSheet({ open, onOpenChange }: Props) {
  const { items, scores } = useQuickStack();
  const trackClick = trpc.affiliate.trackClick.useMutation();

  const handleClick = (slug: string, partner: "amazon" | "iherb", url: string) => {
    trackClick.mutate({
      supplementSlug: slug,
      affiliatePartner: partner,
      destinationUrl: url,
      referrer: buildAttributionReferrer("stack-widget"),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Buy Your Stack</SheetTitle>
          <SheetDescription>
            Purchase each supplement from your preferred vendor. All links support the site.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 px-4">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground py-6 text-center">
              Your stack is empty. Add supplements to see purchase links.
            </p>
          )}
          {items.map(item => {
            const monthly = getMonthly(item.slug);
            const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(item.name)}+supplement&tag=nootropicstk-20`;
            const iherbUrl = `https://www.iherb.com/search?kw=${encodeURIComponent(item.name)}`;
            return (
              <div
                key={item.slug}
                className="rounded-xl border border-border/50 bg-card p-3"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {item.name}
                  </h4>
                  <span className="text-xs text-muted-foreground shrink-0 font-mono-brand">
                    Est. ~${monthly}/mo
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleClick(item.slug, "amazon", amazonUrl)}
                  >
                    Amazon
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleClick(item.slug, "iherb", iherbUrl)}
                  >
                    iHerb
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <SheetFooter>
          <div className="text-sm text-foreground font-medium">
            Total est. monthly: ~${scores.estimatedMonthly}
          </div>
          <p className="text-xs text-muted-foreground">
            Affiliate disclosure: links above may earn us a commission at no extra cost
            to you. We only recommend products we believe in.
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
