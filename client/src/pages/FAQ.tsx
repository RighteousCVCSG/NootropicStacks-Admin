import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, HelpCircle } from "lucide-react";
import { FAQ_CATEGORIES, FAQ_SCHEMA } from "@/data/faqData";

export default function FAQ() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(FAQ_SCHEMA);
    script.id = "faq-schema";
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById("faq-schema");
      if (existing) document.head.removeChild(existing);
    };
  }, []);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl">
        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">FAQ</Badge>
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Nootropics FAQ — Your Questions Answered
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Everything you need to know about nootropics — from safety and side effects to stacking
            strategies and supplement quality. Updated for 2026.
          </p>
        </div>

        {/* Category nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FAQ_CATEGORIES.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`}>
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground border-border/40 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
              >
                {cat.label}
              </Badge>
            </a>
          ))}
        </div>

        {/* Accordion sections */}
        <div className="space-y-10">
          {FAQ_CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id}>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">{cat.label}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {cat.questions.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${cat.id}-${idx}`}
                    className="border border-border/50 rounded-lg px-4 bg-card"
                  >
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 p-6 rounded-xl border border-border/50 bg-card text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Ready to build your stack?
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Use our free stack builder to create a personalized nootropic protocol, or start with
            our beginner's guide.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/builder">
              <Button size="sm" className="gap-1.5">
                Stack Builder <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link href="/start-here">
              <Button size="sm" variant="outline" className="gap-1.5">
                Start Here Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
