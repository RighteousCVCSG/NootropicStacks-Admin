import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Trash2, X, Zap } from "lucide-react";
import { useQuickStack } from "@/contexts/QuickStackContext";
import BuyBundleSheet from "./BuyBundleSheet";

const EXPANDED_KEY = "stackwidget_expanded";

interface ScoreBarRowProps {
  icon: string;
  label: string;
  score: number;
  barClass: string;
}

function ScoreBarRow({ icon, label, score, barClass }: ScoreBarRowProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base shrink-0 w-5 text-center" aria-hidden>
        {icon}
      </span>
      <span className="text-xs text-muted-foreground w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${Math.max(0, Math.min(100, score))}%`, transition: "width 0.5s ease" }}
        />
      </div>
      <span className="text-xs text-foreground font-mono-brand w-7 text-right tabular-nums">
        {score}
      </span>
    </div>
  );
}

export default function StackScoreWidget() {
  const { items, scores, removeItem, clearStack, itemCount } = useQuickStack();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(EXPANDED_KEY) === "1";
  });
  const [bundleOpen, setBundleOpen] = useState(false);

  // Mount + fade-in trigger when first item is added
  useEffect(() => {
    if (itemCount === 0) {
      setMounted(false);
      setVisible(false);
      return;
    }
    setMounted(true);
    // Next frame: trigger fade-in
    const t = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(t);
  }, [itemCount]);

  // Persist expanded/collapsed state
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(EXPANDED_KEY, expanded ? "1" : "0");
  }, [expanded]);

  if (itemCount === 0 || !mounted) return null;

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "80px",
    left: "20px",
    zIndex: 50,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-20px)",
    transition: "opacity 0.4s ease, transform 0.4s ease",
  };

  if (!expanded) {
    return (
      <div style={baseStyle}>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex items-center gap-2 bg-card border border-primary/30 rounded-full px-3 py-1.5 shadow-lg hover:border-primary/60 transition-colors"
          aria-label="Open stack score widget"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Stack ({itemCount})
          </span>
          <span className="mx-1 h-4 w-px bg-border/60" aria-hidden />
          <span className="text-sm font-mono-brand tabular-nums text-primary">
            {scores.overall}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div style={baseStyle}>
      <div
        className="bg-card border border-border/50 rounded-2xl shadow-xl p-4"
        style={{ width: "260px" }}
        role="region"
        aria-label="Stack score widget"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">My Stack</h3>
            <span className="text-xs text-muted-foreground">({itemCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={clearStack}
              aria-label="Clear stack"
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Collapse stack widget"
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Score bars */}
        <div className="space-y-2 mb-3">
          <ScoreBarRow icon="⚡" label="Energy" score={scores.energy} barClass="bg-amber-400" />
          <ScoreBarRow icon="🧘" label="Relaxation" score={scores.relaxation} barClass="bg-emerald-500" />
          <ScoreBarRow icon="🧠" label="Brain" score={scores.brain} barClass="bg-purple-500" />
        </div>

        {/* Supplement chips */}
        <div className="mb-3 max-h-24 overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-1.5">
            {items.map(item => (
              <span
                key={item.slug}
                className="inline-flex items-center gap-1 bg-secondary text-foreground text-xs rounded-full pl-2.5 pr-1 py-0.5 border border-border/50"
              >
                <span className="truncate max-w-[140px]">{item.name}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item.slug)}
                  aria-label={`Remove ${item.name} from stack`}
                  className="p-0.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Estimated cost */}
        <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
          <span>Est. monthly: ~${scores.estimatedMonthly}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Cost estimate info"
                className="p-0.5 rounded text-muted-foreground hover:text-foreground"
              >
                <Info className="w-3 h-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[220px]">
              Based on typical supplement prices. Actual prices vary by vendor.
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => setBundleOpen(true)}>
            Buy Bundle
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <Link href="/builder">Save Stack →</Link>
          </Button>
        </div>
      </div>

      <BuyBundleSheet open={bundleOpen} onOpenChange={setBundleOpen} />
    </div>
  );
}
