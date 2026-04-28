import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ShoppingCart, ExternalLink, Plus, Check } from "lucide-react";
import type { Supplement } from "../../../drizzle/schema";
import { useQuickStack } from "@/contexts/QuickStackContext";

interface Props {
  supplement: Supplement & { _score?: number };
  onAddToStack?: (id: number) => void;
  showAddButton?: boolean;
  isInStack?: boolean;
}

const SAFETY_COLORS = {
  very_safe: "text-[oklch(0.72_0.2_165)] border-[oklch(0.72_0.2_165)/30] bg-[oklch(0.72_0.2_165)/10]",
  safe: "text-[oklch(0.78_0.15_200)] border-[oklch(0.78_0.15_200)/30] bg-[oklch(0.78_0.15_200)/10]",
  moderate: "text-[oklch(0.78_0.18_75)] border-[oklch(0.78_0.18_75)/30] bg-[oklch(0.78_0.18_75)/10]",
  caution: "text-[oklch(0.65_0.22_25)] border-[oklch(0.65_0.22_25)/30] bg-[oklch(0.65_0.22_25)/10]",
};

const SAFETY_LABELS = {
  very_safe: "Very Safe",
  safe: "Safe",
  moderate: "Moderate",
  caution: "Caution",
};

const SCORE_BARS = [
  { key: "scoreFocus", label: "Focus", color: "bg-[oklch(0.65_0.2_290)]" },
  { key: "scoreMemory", label: "Memory", color: "bg-[oklch(0.78_0.15_200)]" },
  { key: "scoreEnergy", label: "Energy", color: "bg-[oklch(0.78_0.18_75)]" },
  { key: "scoreMood", label: "Mood", color: "bg-[oklch(0.72_0.2_165)]" },
] as const;

export default function SupplementCard({ supplement: s, onAddToStack, showAddButton = false, isInStack = false }: Props) {
  const trackClick = trpc.affiliate.trackClick.useMutation();
  const { addItem, hasItem, removeItem } = useQuickStack();
  const inQuickStack = hasItem(s.slug);

  const handleBuyClick = (url: string, partner: string) => {
    trackClick.mutate({
      supplementSlug: s.slug,
      supplementId: s.id,
      affiliatePartner: partner,
      destinationUrl: url,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const primaryUrl = s.affiliatePrimary;
  const primaryLabel = s.affiliatePrimaryLabel ?? "Buy Now";

  return (
    <div className="group relative flex flex-col rounded-xl border border-border/50 bg-card p-5 card-hover overflow-hidden">
      {/* Featured badge */}
      {s.isFeatured && (
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">Featured</Badge>
        </div>
      )}

      {/* Category */}
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs text-muted-foreground border-border/50">
          {s.category}
        </Badge>
        {s.safetyRating && (
          <Badge variant="outline" className={`text-xs ${SAFETY_COLORS[s.safetyRating]}`}>
            {SAFETY_LABELS[s.safetyRating]}
          </Badge>
        )}
      </div>

      {/* Name & Summary */}
      <Link href={`/supplements/${s.slug}`}>
        <h3 className="font-display font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {s.name}
        </h3>
      </Link>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
        {s.summary}
      </p>

      {/* Dosage */}
      {s.dosageMin && (
        <p className="text-xs text-muted-foreground mb-4 font-mono-brand">
          Dose: {s.dosageMin}
          {s.dosageMax && s.dosageMax !== s.dosageMin ? `–${s.dosageMax}` : ""} {s.dosageUnit}
        </p>
      )}

      {/* Score bars */}
      <div className="space-y-1.5 mb-5">
        {SCORE_BARS.map(({ key, label, color }) => {
          const score = (s[key] as number) ?? 0;
          if (score === 0) return null;
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${color} transition-all`}
                  style={{ width: `${(score / 10) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-6 text-right">{score}</span>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        {showAddButton && (
          <Button
            size="sm"
            variant={isInStack ? "secondary" : "outline"}
            className="flex-1"
            onClick={() => onAddToStack?.(s.id)}
            disabled={isInStack}
          >
            <Plus className="w-3 h-3 mr-1" />
            {isInStack ? "Added" : "Add to Stack"}
          </Button>
        )}
        <Button
          size="sm"
          variant={inQuickStack ? "secondary" : "outline"}
          className="shrink-0"
          aria-label={inQuickStack ? `Remove ${s.name} from quick stack` : `Add ${s.name} to quick stack`}
          onClick={() =>
            inQuickStack
              ? removeItem(s.slug)
              : addItem({ slug: s.slug, name: s.name })
          }
        >
          {inQuickStack ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </Button>
        {primaryUrl && (
          <Button
            size="sm"
            className="flex-1 glow-green"
            onClick={() => handleBuyClick(primaryUrl, primaryLabel)}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            {primaryLabel}
          </Button>
        )}
        <Button size="sm" variant="ghost" className="px-2" asChild>
          <Link href={`/supplements/${s.slug}`}>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
