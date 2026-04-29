import { useState, useMemo, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, BookOpen } from "lucide-react";
import { GLOSSARY_TERMS } from "@/data/glossaryTerms";

function groupByLetter(terms: typeof GLOSSARY_TERMS) {
  const map: Record<string, typeof GLOSSARY_TERMS> = {};
  for (const t of terms) {
    const letter = t.term[0].toUpperCase();
    if (!map[letter]) map[letter] = [];
    map[letter].push(t);
  }
  return map;
}

export default function Glossary() {
  const [search, setSearch] = useState("");
  const letterRefs = useRef<Record<string, HTMLElement | null>>({});

  const filtered = useMemo(() => {
    if (!search.trim()) return GLOSSARY_TERMS;
    const q = search.toLowerCase();
    return GLOSSARY_TERMS.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => groupByLetter(filtered), [filtered]);
  const letters = Object.keys(grouped).sort();

  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  function scrollToLetter(letter: string) {
    const el = letterRefs.current[letter];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">
          {/* Main content */}
          <div>
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">Reference</Badge>
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-3">
                Nootropics Glossary — 60+ Terms Explained
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                A complete reference guide to nootropics terminology — from acetylcholine to washout
                periods.
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search terms or definitions..."
                className="pl-9 bg-card border-border/50"
              />
            </div>

            {/* Letter groups */}
            {letters.length === 0 ? (
              <p className="text-muted-foreground text-sm">No terms match your search.</p>
            ) : (
              <div className="space-y-10">
                {letters.map((letter) => (
                  <section
                    key={letter}
                    id={`letter-${letter}`}
                    ref={(el) => { letterRefs.current[letter] = el; }}
                  >
                    <h2 className="font-display text-2xl font-bold text-primary mb-4 border-b border-border/30 pb-2">
                      {letter}
                    </h2>
                    <div className="space-y-4">
                      {grouped[letter].map((t) => (
                        <div key={t.term} className="group">
                          <span className="font-semibold text-foreground">{t.term}</span>
                          <span className="text-muted-foreground text-sm"> — {t.definition}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-14 p-6 rounded-xl border border-border/50 bg-card text-center">
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                Put these terms to work
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Use our stack builder to create a personalized protocol based on your goals.
              </p>
              <Link href="/builder">
                <Button size="sm" className="gap-1.5">
                  Build Your Stack <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sticky letter nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <p className="text-xs text-muted-foreground font-medium mb-3 uppercase tracking-wide">
                Jump to
              </p>
              <div className="grid grid-cols-2 gap-1">
                {allLetters.map((letter) => {
                  const available = !!grouped[letter];
                  return (
                    <button
                      key={letter}
                      onClick={() => available && scrollToLetter(letter)}
                      className={`text-xs py-1 px-2 rounded text-center transition-colors ${
                        available
                          ? "text-primary hover:bg-primary/10 cursor-pointer font-medium"
                          : "text-muted-foreground/30 cursor-default"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
