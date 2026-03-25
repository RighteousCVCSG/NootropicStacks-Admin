import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AffiliateBanner from "@/components/AffiliateBanner";
import { SPONSORED_BANNERS } from "../../../shared/affiliates";
import { GUIDES } from "./Guides";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

export default function GuideDetail() {
  const params = useParams<{ slug: string }>();
  const guide = GUIDES.find((g) => g.slug === params.slug);

  if (!guide) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl text-center py-20">
          <p className="text-muted-foreground mb-4">Guide not found.</p>
          <Button asChild><Link href="/guides">Back to Guides</Link></Button>
        </div>
      </main>
    );
  }

  // Convert markdown-style content to simple HTML paragraphs
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-semibold text-foreground mt-4 mb-1">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith("**") && line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-muted-foreground leading-relaxed mb-3">
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
            )}
          </p>
        );
      }
      if (line.trim() === "") return null;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/guides" className="hover:text-foreground flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" />
            Guides
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{guide.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary/15 text-primary border-primary/30">{guide.category}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {guide.readTime} read
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {guide.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{guide.excerpt}</p>

            {/* Supplements covered */}
            <div className="p-4 rounded-xl border border-border/50 bg-card/50 mb-8">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Supplements Covered</p>
              <div className="flex flex-wrap gap-2">
                {guide.supplements.map((s) => (
                  <Badge key={s} variant="outline" className="text-sm text-foreground border-border/50">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Article content */}
            <div className="prose-like">
              {renderContent(guide.content)}
            </div>

            {/* CTA at end of article */}
            <div className="mt-10 p-6 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="font-display font-bold text-foreground mb-2">
                Ready to build this stack?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use our interactive Stack Builder to combine these supplements, set dosages, and find the best prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="glow-green" asChild>
                  <Link href="/builder">Open Stack Builder</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/library">Browse All Supplements</Link>
                </Button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 rounded-xl border border-border/30 bg-secondary/30">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> This article is for informational purposes only and does not constitute medical advice. 
                Always consult a qualified healthcare provider before starting any supplement regimen. 
                Individual results may vary. Some links in this article are affiliate links — we may earn a commission at no extra cost to you.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Affiliate banners */}
            {SPONSORED_BANNERS.slice(0, 3).map((banner) => (
              <AffiliateBanner key={banner.id} banner={banner} compact />
            ))}

            {/* Related guides */}
            <div className="p-5 rounded-xl border border-border/50 bg-card">
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Related Guides</h3>
              <div className="space-y-3">
                {GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 4).map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`}>
                    <div className="group">
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-snug">
                        {g.title}
                      </p>
                      <span className="text-xs text-primary">{g.readTime} read →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
