import { Link } from "wouter";
import { Heart } from "lucide-react";
import { PAYMENT_CONFIG } from "@/lib/payment-config";

interface Props {
  variant?: "compact" | "card";
  className?: string;
}

export default function SupportPill({ variant = "compact", className = "" }: Props) {
  if (variant === "card") {
    return (
      <Link
        href="/support"
        className={`block rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 p-4 transition-colors ${className}`}
      >
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Tip {PAYMENT_CONFIG.tipAmount} → Get the Starter Stack Guide
            </p>
            <p className="text-xs text-muted-foreground">
              40-page PDF, instant download. Keeps the site independent.
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/support"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/15 border border-primary/30 text-xs font-medium text-primary transition-colors ${className}`}
    >
      <Heart className="w-3 h-3" />
      Tip {PAYMENT_CONFIG.tipAmount}
    </Link>
  );
}
