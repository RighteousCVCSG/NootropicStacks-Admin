import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock, Search, BookOpen } from "lucide-react";
import { getAllArticlesMeta, type ArticleMeta } from "@/data/blogArticlesIndex";

const ALL_ARTICLES = getAllArticlesMeta();

const CATEGORIES = [
  "All",
  ...Array.from(new Set(ALL_ARTICLES.map((a) => a.category).filter(Boolean))).sort(),
];

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ALL_ARTICLES.filter((a) => {
      const matchesCategory =
        activeCategory === "All" || a.category === activeCategory;
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              Research-Backed Content
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Nootropics Blog
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Evidence-based guides, compound breakdowns, stack protocols, and
            honest reviews — written for people who want to understand the
            science, not just take someone's word for it.
          </p>
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-card"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          {search ? ` matching "${search}"` : ""}
        </p>

        {/* Article grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <Card className="group p-5 rounded-xl border border-border/50 bg-card card-hover h-full flex flex-col cursor-pointer hover:border-primary/30 transition-colors">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {article.category && (
            <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
              {article.category}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} min
          </span>
          {article.publishedDate && (
            <span className="text-xs text-muted-foreground ml-auto">
              {formatDate(article.publishedDate)}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-display text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3 flex-1">
            {article.excerpt}
          </p>
        )}

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs text-muted-foreground border-border/30 py-0"
              >
                {tag}
              </Badge>
            ))}
            {article.tags.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground border-border/30 py-0"
              >
                +{article.tags.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* CTA */}
        <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
          Read article <ArrowRight className="w-3 h-3" />
        </span>
      </Card>
    </Link>
  );
}
