import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SupplementCard from "@/components/SupplementCard";
import AffiliateBanner from "@/components/AffiliateBanner";
import { SPONSORED_BANNERS } from "../../../shared/affiliates";
import { Search, Filter, X } from "lucide-react";

export default function Library() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const categoriesQuery = trpc.supplements.categories.useQuery();
  const supplementsQuery = trpc.supplements.list.useQuery({
    search: debouncedSearch || undefined,
    category: selectedCategory || undefined,
    limit: 50,
  });

  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout((window as any).__searchTimer);
    (window as any).__searchTimer = setTimeout(() => setDebouncedSearch(val), 300);
  };

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedCategory(null);
  };

  const hasFilters = search || selectedCategory;

  return (
    <main className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Supplement Library
          </h1>
          <p className="text-muted-foreground">
            Browse {supplementsQuery.data?.total ?? "..."} research-backed nootropics with effect scores, dosage guides, and trusted vendor links.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search supplements..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 bg-secondary border-border/50"
            />
          </div>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-secondary text-muted-foreground border border-border/50 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categoriesQuery.data?.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-secondary text-muted-foreground border border-border/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {hasFilters && (
          <p className="text-sm text-muted-foreground mb-4">
            {supplementsQuery.data?.items.length ?? 0} results
            {selectedCategory && <> in <span className="text-foreground">{selectedCategory}</span></>}
            {search && <> matching <span className="text-foreground">"{search}"</span></>}
          </p>
        )}

        {/* Grid */}
        {supplementsQuery.isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-72 rounded-xl bg-card border border-border/50 animate-pulse" />
            ))}
          </div>
        ) : supplementsQuery.data?.items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No supplements found. Try adjusting your filters.</p>
            <Button variant="ghost" onClick={clearFilters} className="mt-3">Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplementsQuery.data?.items.map((supp, i) => (
              <>
                <SupplementCard key={supp.id} supplement={supp} />
                {/* Insert banner every 9 items */}
                {(i + 1) % 9 === 0 && i < (supplementsQuery.data?.items.length ?? 0) - 1 && (
                  <div key={`banner-${i}`} className="sm:col-span-2 lg:col-span-3">
                    <AffiliateBanner banner={SPONSORED_BANNERS[(Math.floor(i / 9) + 2) % SPONSORED_BANNERS.length]} />
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
