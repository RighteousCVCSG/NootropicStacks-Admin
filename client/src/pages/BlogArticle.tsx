import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { getRecentArticlesMeta, type ArticleMeta } from "@/data/blogArticlesIndex";
import { track } from "@/lib/analytics";

interface ArticleSection {
  heading: string | null;
  paragraphs: string[];
}

interface ArticleFull {
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: number | string;
  tags: string[];
  category?: string;
  bottomLine?: string;
  sections: ArticleSection[];
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function normalizeReadTime(rt: number | string | undefined): string {
  if (!rt) return "8 min read";
  if (typeof rt === "number") return `${rt} min read`;
  if (String(rt).includes("min")) return String(rt);
  return `${rt} min read`;
}

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [article, setArticle] = useState<ArticleFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const related = getRecentArticlesMeta(6).filter((a) => a.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetch(`/articles/${slug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Article not found (${res.status})`);
        return res.json();
      })
      .then((data: ArticleFull) => {
        setArticle(data);
        document.title = `${data.title} | Nootropics Stacker`;
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      track("email_signup", { source: "blog_inline", article: slug });
    } catch {
      setSubscribed(true); // optimistic — don't show error on newsletter
      track("email_signup", { source: "blog_inline", article: slug, optimistic: true });
    } finally {
      setSubscribing(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl">
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading article...
          </div>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
            </Button>
          </Link>
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-foreground mb-1">Article not found</p>
            <p className="text-sm">{error ?? "This article could not be loaded."}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl">
        {/* Back link */}
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="mb-8 text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
          </Button>
        </Link>

        {/* Article header */}
        <header className="mb-8">
          {article.category && (
            <Badge className="bg-primary/15 text-primary border-primary/30 text-xs mb-3">
              {article.category}
            </Badge>
          )}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
              {article.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border/30 pt-4">
            {article.publishedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.publishedDate)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {normalizeReadTime(article.readTime)}
            </span>
            {article.tags.length > 0 && (
              <span className="flex items-center gap-1.5 flex-wrap">
                <Tag className="w-3.5 h-3.5 flex-shrink-0" />
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs text-muted-foreground border-border/30 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </span>
            )}
          </div>
        </header>

        {/* Article body */}
        <article className="prose-custom mb-10">
          {article.sections.map((section, i) => (
            <section key={i} className="mb-8">
              {section.heading && (
                <h2 className="font-display text-xl font-bold text-foreground mt-8 mb-3 border-l-2 border-primary pl-3">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((para, j) => (
                <p key={j} className="text-foreground/90 leading-relaxed mb-4 text-base">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </article>

        {/* Bottom Line card */}
        {article.bottomLine && (
          <Card className="p-6 mb-10 border border-primary/30 bg-primary/5 rounded-xl">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">The Bottom Line</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{article.bottomLine}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Newsletter inline */}
        <Card className="p-6 mb-12 border border-border/50 bg-card rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              Stay Updated
            </span>
          </div>
          <h3 className="font-display font-bold text-foreground mb-1">
            Get research-backed nootropic guides
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            New articles on compounds, stacks, and protocols — delivered to your inbox.
          </p>
          {subscribed ? (
            <p className="text-sm text-primary font-medium">
              You're subscribed. Thanks for joining!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background border-border/50"
              />
              <Button type="submit" disabled={subscribing} size="sm">
                {subscribing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}
        </Card>

        {/* Related articles */}
        {related.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((rel) => (
                <RelatedCard key={rel.slug} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function RelatedCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="group p-4 rounded-xl border border-border/50 bg-card card-hover h-full flex flex-col cursor-pointer hover:border-primary/30 transition-colors">
        {article.category && (
          <Badge className="bg-primary/15 text-primary border-primary/30 text-xs mb-2 w-fit">
            {article.category}
          </Badge>
        )}
        <h3 className="font-display text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-3 leading-snug flex-1">
          {article.title}
        </h3>
        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-auto">
          <Clock className="w-3 h-3" />
          {article.readTime} min
          <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Card>
    </Link>
  );
}
