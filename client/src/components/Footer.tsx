import { Link } from "wouter";
import { Brain } from "lucide-react";

const footerColumns = [
  {
    heading: "Learn",
    links: [
      { href: "/start-here", label: "Start Here" },
      { href: "/best-nootropics", label: "Best Nootropics" },
      { href: "/best-stacks", label: "Best Stacks" },
      { href: "/nootropics-for-focus", label: "Nootropics for Focus" },
      { href: "/nootropics-for-anxiety", label: "Nootropics for Anxiety" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/research", label: "Research Library" },
      { href: "/videos", label: "Video Library" },
      { href: "/reviews", label: "Product Reviews" },
      { href: "/faq", label: "FAQ" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { href: "/builder", label: "Stack Builder" },
      { href: "/library", label: "Supplement Library" },
      { href: "/guides", label: "Guides" },
      { href: "/compare-supplements", label: "Compare Supplements" },
    ],
  },
];

const redditCommunities = [
  { href: "https://www.reddit.com/r/nootropics/", label: "r/nootropics" },
  { href: "https://www.reddit.com/r/biohacking/", label: "r/biohacking" },
  { href: "https://www.reddit.com/r/supplements/", label: "r/supplements" },
  { href: "https://www.reddit.com/r/longevity/", label: "r/longevity" },
  { href: "https://www.reddit.com/r/ADHD/", label: "r/ADHD" },
];

const authoritativeSources = [
  { href: "https://pubmed.ncbi.nlm.nih.gov/", label: "PubMed / NCBI" },
  { href: "https://examine.com/", label: "Examine.com" },
  { href: "https://www.mdpi.com/journal/nutrients", label: "Nutrients Journal" },
  { href: "https://academic.oup.com/jn", label: "Journal of Nutrition" },
  { href: "https://www.frontiersin.org/journals/nutrition", label: "Frontiers in Nutrition" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Nootropic<span className="text-primary">Stacker</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Evidence-based nootropic research, stack building, and supplement guides to help you optimize your cognition.
            </p>
            <p className="text-xs text-muted-foreground">&copy; 2026 NootropicStacker</p>
          </div>

          {/* Link columns */}
          {footerColumns.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">{heading}</h4>
              <ul className="flex flex-col gap-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Community & Sources row */}
        <div className="mt-10 pt-8 border-t border-border/30 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reddit Communities */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Community</h4>
            <ul className="flex flex-wrap gap-2">
              {redditCommunities.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-orange-400 transition-colors bg-secondary/40 border border-border/30 rounded px-2 py-1"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Authoritative Sources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Research Sources</h4>
            <ul className="flex flex-wrap gap-2">
              {authoritativeSources.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors bg-secondary/40 border border-border/30 rounded px-2 py-1"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Affiliate disclosure bar */}
      <div className="border-t border-border/50 bg-secondary/30">
        <div className="container py-3">
          <p className="text-xs text-muted-foreground text-center">
            Affiliate Disclosure: We earn commissions on purchases made through links on this site. Links are not endorsements.
          </p>
        </div>
      </div>
    </footer>
  );
}
