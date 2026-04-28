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

const FAQ_CATEGORIES = [
  {
    id: "getting-started",
    label: "Getting Started",
    questions: [
      {
        q: "What are nootropics?",
        a: "Nootropics (from the Greek noos = mind, tropos = turn) are substances that enhance cognitive function — including memory, focus, creativity, and motivation. The term was coined by Romanian psychologist Corneliu Giurgea in 1972. They range from well-researched natural compounds like Lion's Mane and Bacopa Monnieri to synthetic racetams and prescription medications.",
      },
      {
        q: "Are nootropics safe?",
        a: "Most natural nootropics have strong safety profiles when used as directed. Compounds like L-Theanine, Bacopa Monnieri, Lion's Mane, and Magnesium Glycinate have extensive clinical track records. That said, 'natural' doesn't automatically mean safe — always research each compound individually, start at low doses, and consult a healthcare provider if you take medications or have health conditions.",
      },
      {
        q: "Do nootropics really work?",
        a: "For many people, yes — but results vary by compound, individual neurochemistry, and expectations. Some nootropics (like L-Theanine + Caffeine) have robust clinical evidence. Others (like many racetams) have anecdotal support but limited human trials. The strongest evidence exists for Bacopa Monnieri (memory), Lion's Mane (neuroplasticity), Ashwagandha (stress/anxiety), and Rhodiola Rosea (mental fatigue).",
      },
      {
        q: "What's the best nootropic for beginners?",
        a: "The L-Theanine + Caffeine stack is the ideal starting point. It's the most well-researched pairing, affordable, widely available, and produces noticeable effects within 30–60 minutes. If you already drink coffee, simply add 200mg L-Theanine to your morning routine. From there, Lion's Mane Mushroom makes an excellent second addition for long-term neuroplasticity support.",
      },
      {
        q: "How long until I see results?",
        a: "It depends on the compound. Acute nootropics like L-Theanine, Caffeine, and Rhodiola work within hours. Cumulative nootropics like Bacopa Monnieri and Lion's Mane require consistent daily use for 4–12 weeks before full effects emerge. Adaptogens like Ashwagandha typically show meaningful changes in stress and mood within 2–4 weeks.",
      },
    ],
  },
  {
    id: "safety-side-effects",
    label: "Safety & Side Effects",
    questions: [
      {
        q: "Can nootropics be taken with medications?",
        a: "Potentially, but this requires careful evaluation. Some nootropics interact with medications — for example, Ginkgo Biloba can thin blood and interact with anticoagulants; St. John's Wort affects drug metabolism; and Huperzine A can interact with cholinergic drugs. Always consult your pharmacist or physician before combining nootropics with prescription medications.",
      },
      {
        q: "What are the most common side effects?",
        a: "Common side effects include headaches (often from choline-heavy stacks without adequate choline balance), GI discomfort (common with Bacopa if taken without food), insomnia (from stimulatory compounds taken too late in the day), and anxiety (from excessive caffeine or high-dose stimulants). Most side effects resolve by adjusting dose, timing, or eliminating the offending compound.",
      },
      {
        q: "Can you take nootropics every day?",
        a: "Many nootropics are safe for daily use — including Lion's Mane, Bacopa Monnieri, Ashwagandha, Magnesium, and Omega-3s. However, some compounds benefit from cycling: Huperzine A is typically cycled 2 weeks on/off to prevent cholinergic desensitization, and Rhodiola may be cycled 5 days on/2 off. Daily caffeine use can lead to dependency, so some users prefer 5-days-on/2-days-off protocols.",
      },
      {
        q: "Is it possible to build tolerance to nootropics?",
        a: "Yes, for some compounds. Caffeine is the most well-known example — regular use leads to adenosine receptor upregulation, reducing its effects over time. Racetams and noopept may also exhibit tolerance with continuous use. Adaptogens like Rhodiola are generally considered lower-tolerance-risk. Cycling protocols (taking breaks) help maintain sensitivity for tolerance-prone compounds.",
      },
      {
        q: "Are nootropics addictive?",
        a: "Most natural nootropics have no addiction potential. Caffeine is mildly habit-forming and produces withdrawal symptoms (headaches, fatigue) upon cessation. Prescription stimulants like Adderall carry significant dependency risk and are not considered nootropics in the traditional sense. If you're concerned about dependency, stick to well-studied natural compounds and avoid unregulated research chemicals.",
      },
    ],
  },
  {
    id: "stacking",
    label: "Stacking",
    questions: [
      {
        q: "What is a nootropic stack?",
        a: "A nootropic stack is a combination of two or more supplements taken together to achieve a synergistic cognitive effect greater than any single ingredient alone. Stacking works because different nootropics target different neurotransmitter systems, cellular processes, and brain regions — combining them intelligently can produce complementary benefits while minimizing drawbacks.",
      },
      {
        q: "How many supplements should I stack?",
        a: "Start with 2–3 compounds and only add more once you've confirmed each ingredient works for you individually. Stacking too many supplements at once makes it impossible to know what's working (or causing side effects). Expert users typically plateau around 5–7 daily compounds — beyond that, marginal benefits diminish while cost, complexity, and interaction risk increase.",
      },
      {
        q: "Should I cycle nootropics?",
        a: "Cycling (taking scheduled breaks) is recommended for tolerance-prone compounds like Huperzine A, Racetams, and Rhodiola. For daily-safe compounds like Lion's Mane and Bacopa, continuous use is generally fine and often preferred since their benefits are cumulative. A common cycling approach is 5 days on / 2 days off, or 4 weeks on / 1 week off.",
      },
      {
        q: "What supplements work well together?",
        a: "Classic synergistic pairs include: L-Theanine + Caffeine (smooth energy and focus), Alpha GPC + Lion's Mane (acetylcholine production + NGF stimulation), Bacopa + Phosphatidylserine (memory encoding + cell membrane support), and Rhodiola + Ashwagandha (dual adaptogen protocol for stress resilience). Choline sources generally pair well with racetams to prevent headaches.",
      },
      {
        q: "What should I avoid combining?",
        a: "Avoid stacking multiple stimulants (e.g., high-dose caffeine + racetams + tyrosine) as this can cause anxiety and overstimulation. Be cautious combining multiple acetylcholinesterase inhibitors (Huperzine A + Galantamine). Avoid mixing MAOIs with serotonergic compounds. Don't stack St. John's Wort with prescription antidepressants. When in doubt, research each combination specifically.",
      },
    ],
  },
  {
    id: "specific-supplements",
    label: "Specific Supplements",
    questions: [
      {
        q: "Is Lion's Mane worth taking?",
        a: "Yes, for most people — especially those focused on long-term brain health and neuroplasticity. Lion's Mane (Hericium erinaceus) stimulates Nerve Growth Factor (NGF) and Brain-Derived Neurotrophic Factor (BDNF), which support neuron growth and maintenance. Clinical studies show benefits for mild cognitive impairment, depression, and anxiety. Effects are cumulative; allow 4–8 weeks for full benefit.",
      },
      {
        q: "Does Bacopa Monnieri actually improve memory?",
        a: "Yes — Bacopa is one of the most clinically validated memory-enhancing nootropics. Multiple randomized controlled trials demonstrate improvements in verbal learning rate, memory consolidation, and information retention after 8–12 weeks of consistent use. The active compounds (bacosides) appear to enhance synaptic communication and reduce anxiety simultaneously. Always take with food to minimize GI side effects.",
      },
      {
        q: "What's the difference between L-Theanine and Ashwagandha?",
        a: "Both reduce anxiety, but through different mechanisms and timescales. L-Theanine works acutely (30–60 min) by promoting alpha brain wave activity — it produces calm alertness without sedation, making it ideal for daytime use. Ashwagandha (especially KSM-66) works cumulatively over weeks by lowering cortisol and modulating the HPA axis — it's better suited for chronic stress management and sleep quality improvement.",
      },
      {
        q: "Is creatine a nootropic?",
        a: "Increasingly, yes. While creatine is most famous as an athletic performance supplement, research consistently shows cognitive benefits — particularly for working memory, reasoning speed, and mental performance under fatigue or sleep deprivation. The brain is energy-hungry and uses creatine phosphate for rapid ATP regeneration. 3–5g/day of creatine monohydrate is safe, cheap, and well-supported by evidence.",
      },
      {
        q: "What's the best form of magnesium for brain health?",
        a: "Magnesium L-Threonate (Magtein) is the form specifically developed to cross the blood-brain barrier and raise brain magnesium levels — the only form shown to do so effectively in animal studies, with human trials showing cognitive benefits. For general relaxation, anxiety, and sleep (without premium pricing), Magnesium Glycinate is the second-best option: highly bioavailable, gentle on digestion, and calming. Avoid Magnesium Oxide — poor bioavailability.",
      },
    ],
  },
  {
    id: "purchasing-quality",
    label: "Purchasing & Quality",
    questions: [
      {
        q: "How do I know if a supplement is high quality?",
        a: "Look for: (1) a Certificate of Analysis (COA) from a third-party lab confirming purity and potency, (2) transparent labeling with exact doses (no proprietary blends), (3) standardized extracts for herbal supplements (e.g., Bacopa standardized to 50% bacosides), and (4) manufacturing in FDA-registered, GMP-certified facilities. Vendors like Nootropics Depot, Double Wood, and Life Extension are known for quality standards.",
      },
      {
        q: "What certifications should I look for?",
        a: "Key certifications include: GMP (Good Manufacturing Practice) — ensures consistent manufacturing standards; NSF Certified for Sport — important if you're an athlete subject to drug testing; USP Verified — confirms label accuracy and purity; and Informed Sport/Informed Choice. Third-party COAs from independent labs (not the manufacturer's own lab) are the most meaningful quality indicators for individual ingredients.",
      },
      {
        q: "Is it better to buy individual supplements or stacks?",
        a: "Individual supplements give you full control over doses, cycling, and cost — and make it easy to identify what's working. Pre-formulated stacks (like Mind Lab Pro) offer convenience and are often better value when multiple ingredients are needed. The best approach: start with individual supplements to find what works for you, then consider a quality pre-made stack as a cost-effective foundation once your protocol is established.",
      },
      {
        q: "Where is the best place to buy nootropics?",
        a: "Nootropics Depot is widely considered the gold standard for individual bulk supplements — rigorous third-party testing and broad selection. iHerb offers competitive pricing on branded products with reliable fulfillment. Amazon is convenient but requires careful vendor vetting. For branded formulas, buy directly from manufacturers (Mind Lab Pro, Qualia, Thesis) to avoid counterfeits and access money-back guarantees.",
      },
      {
        q: "How do I read a supplement label?",
        a: "Key elements: (1) Serving size — ensure you're comparing apples to apples when evaluating doses. (2) Active ingredient form — e.g., 'Bacopa Monnieri extract (50% bacosides)' is more informative than just 'Bacopa Monnieri'. (3) Other ingredients — fillers, binders, and capsule materials. (4) Percent Daily Value (if applicable). (5) Proprietary blends list total weight but hide individual doses — treat these as a red flag. Always compare the stated dose to clinical study doses.",
      },
    ],
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
    cat.questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

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
