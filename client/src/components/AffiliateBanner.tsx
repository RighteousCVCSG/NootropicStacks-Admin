import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ExternalLink } from "lucide-react";
import type { SPONSORED_BANNERS } from "../../../shared/affiliates";
import { AFFILIATE_PARTNERS } from "../../../shared/affiliates";

type Banner = typeof SPONSORED_BANNERS[number];

interface Props {
  banner: Banner;
  compact?: boolean;
}

export default function AffiliateBanner({ banner, compact = false }: Props) {
  const trackClick = trpc.affiliate.trackClick.useMutation();
  const partnerInfo = AFFILIATE_PARTNERS[banner.partner];

  const handleClick = () => {
    trackClick.mutate({
      affiliatePartner: banner.partner,
      destinationUrl: banner.url,
    });
    window.open(banner.url, "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div
        className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card/50 cursor-pointer hover:border-primary/30 transition-all"
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-8 rounded-full"
            style={{ backgroundColor: partnerInfo?.color ?? "#22c55e" }}
          />
          <div>
            <p className="text-sm font-semibold text-foreground">{banner.title}</p>
            <p className="text-xs text-muted-foreground">{banner.description}</p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="shrink-0 ml-4">
          {banner.cta}
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl border cursor-pointer transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
      style={{ borderColor: `${partnerInfo?.color ?? "#22c55e"}30` }}
      onClick={handleClick}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${partnerInfo?.color ?? "#22c55e"}, transparent)`,
        }}
      />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-1 self-stretch rounded-full shrink-0"
            style={{ backgroundColor: partnerInfo?.color ?? "#22c55e" }}
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                className="text-xs"
                style={{
                  backgroundColor: `${partnerInfo?.color ?? "#22c55e"}20`,
                  color: partnerInfo?.color ?? "#22c55e",
                  borderColor: `${partnerInfo?.color ?? "#22c55e"}40`,
                }}
              >
                {banner.badge}
              </Badge>
              <span className="text-xs text-muted-foreground">Sponsored</span>
            </div>
            <h3 className="font-display font-semibold text-foreground text-base mb-1">
              {banner.title}
            </h3>
            <p className="text-sm text-muted-foreground">{banner.description}</p>
          </div>
        </div>
        <Button
          className="shrink-0 whitespace-nowrap"
          style={{
            backgroundColor: `${partnerInfo?.color ?? "#22c55e"}20`,
            color: partnerInfo?.color ?? "#22c55e",
            borderColor: `${partnerInfo?.color ?? "#22c55e"}40`,
          }}
          variant="outline"
        >
          {banner.cta}
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </div>
    </div>
  );
}
