import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const __dirname = import.meta.dirname;
const ROOT = path.resolve(__dirname, "..");
const CLIENT = path.resolve(ROOT, "client");
const DIST = path.resolve(ROOT, "dist/public");

// ─── Data ───────────────────────────────────────────────────────────────

const SUPPLEMENTS = JSON.parse(
  fs.readFileSync(path.resolve(CLIENT, "src/data/supplements.json"), "utf-8")
);

const FAQ_DATA = JSON.parse(
  fs.readFileSync(path.resolve(CLIENT, "src/data/faqData.json"), "utf-8")
);

const ARTICLES_DIR = path.resolve(CLIENT, "public/articles");
const articleSlugs = fs.readdirSync(ARTICLES_DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""));

let SITEMAP_ROUTES;
try {
  const sitemap = fs.readFileSync(path.resolve(CLIENT, "public/sitemap.xml"), "utf-8");
  SITEMAP_ROUTES = [...sitemap.matchAll(/<loc>https:\/\/nootropicstacker\.com(\/[^<]*)<\/loc>/g)]
    .map((m) => m[1]);
} catch {
  SITEMAP_ROUTES = [];
}

// ─── Static page config ─────────────────────────────────────────────────

const STATIC_PAGES = {
  "/": {
    title: "NootropicStacker — Build Your Perfect Nootropic Stack",
    description: "Build nootropic supplement stacks with research-backed compounds. Free stack builder with synergy analysis and interaction warnings.",
    h1: "Build Your Perfect Nootropic Stack",
  },
  "/library": {
    title: "Nootropics Library — Research-Backed Supplements A–Z | NootropicStacker",
    description: "Browse our complete library of nootropic supplements. Every compound has clinical evidence, dosage guidance, and safety ratings.",
    h1: "Nootropics Library",
  },
  "/builder": {
    title: "Nootropic Stack Builder — Build Your Perfect Stack | NootropicStacker",
    description: "Use our free nootropic stack builder to create a personalized supplement protocol. Synergy analysis and interaction warnings included.",
    h1: "Nootropic Stack Builder",
  },
  "/faq": {
    title: "Nootropics FAQ — Your Questions Answered | NootropicStacker",
    description: "Everything you need to know about nootropics — from safety and side effects to stacking strategies and supplement quality.",
    h1: "Nootropics FAQ — Your Questions Answered",
  },
  "/glossary": {
    title: "Nootropics Glossary — 60+ Terms Explained | NootropicStacker",
    description: "A complete reference guide to nootropics terminology — from acetylcholine to washout periods.",
    h1: "Nootropics Glossary — 60+ Terms Explained",
  },
  "/start-here": {
    title: "Start Here — Beginner's Guide to Nootropics | NootropicStacker",
    description: "New to nootropics? Start here. A safety-first guide to the most evidence-backed supplements for beginners.",
    h1: "Start Here — Beginner's Guide to Nootropics",
  },
  "/starter-guide": {
    title: "Nootropic Starter Guide — What to Take First | NootropicStacker",
    description: "The complete nootropic starter guide: exactly what to take first, in what order, and how to build your stack from scratch.",
    h1: "Nootropic Starter Guide",
  },
  "/blog": {
    title: "Nootropics Blog — Research, Guides, and Reviews | NootropicStacker",
    description: "Expert-written nootropics articles covering supplement reviews, stacking guides, dosing protocols, and the latest cognitive enhancement research.",
    h1: "Nootropics Blog",
  },
  "/guides": {
    title: "Nootropic Guides — Expert Stacking Strategies | NootropicStacker",
    description: "Expert guides on nootropic stacking strategies, dosing protocols, and goal-based supplement recommendations.",
    h1: "Nootropic Guides",
  },
  "/reviews": {
    title: "Nootropic Reviews — Honest Supplement Reviews | NootropicStacker",
    description: "Honest, evidence-based reviews of popular nootropic supplements and pre-formulated stacks.",
    h1: "Nootropics Reviews",
  },
  "/best-nootropics": {
    title: "Best Nootropics — Top Supplements Ranked by Evidence | NootropicStacker",
    description: "The best nootropic supplements ranked by clinical evidence, safety, and user results. Find the right cognitive enhancer for your goals.",
    h1: "Best Nootropics — Top Supplements Ranked by Evidence",
  },
  "/best-stacks": {
    title: "Best Nootropic Stacks — Top Pre-Formulated Stacks | NootropicStacker",
    description: "The best nootropic stacks reviewed and ranked. Compare Mind Lab Pro, Qualia Mind, Alpha Brain, and more.",
    h1: "Best Nootropic Stacks",
  },
  "/nootropics-for-focus": {
    title: "Best Nootropics for Focus and Concentration 2026 | NootropicStacker",
    description: "The best nootropics for focus and concentration ranked by evidence. Improve attention, reduce distraction, and sustain mental performance.",
    h1: "Best Nootropics for Focus and Concentration",
  },
  "/nootropics-for-anxiety": {
    title: "Best Nootropics for Anxiety — Natural Calm Focus | NootropicStacker",
    description: "The best nootropics for anxiety and stress relief. Evidence-backed supplements that promote calm without sedation.",
    h1: "Best Nootropics for Anxiety",
  },
  "/compare-supplements": {
    title: "Compare Nootropics — Evidence-Based Supplement Comparisons | NootropicStacker",
    description: "Side-by-side comparisons of popular nootropics. Find out which supplement is right for your cognitive goals.",
    h1: "Compare Nootropics",
  },
  "/videos": {
    title: "Nootropic Videos — Educational Content | NootropicStacker",
    description: "Educational videos about nootropics, stacking strategies, and supplement reviews from industry experts.",
    h1: "Nootropic Videos",
  },
  "/research": {
    title: "Research Library — Nootropic Studies and Evidence | NootropicStacker",
    description: "Browse our curated research library of nootropic studies, clinical trials, and evidence summaries.",
    h1: "Research Library",
  },
  "/celebrity-stacks": {
    title: "Celebrity Nootropic Stacks — What the Pros Use | NootropicStacker",
    description: "Discover the nootropic stacks used by successful entrepreneurs, athletes, and performers.",
    h1: "Celebrity Nootropic Stacks",
  },
  "/support": {
    title: "Support — NootropicStacker Help Center | NootropicStacker",
    description: "Get help with NootropicStacker. FAQs, contact information, and support resources.",
    h1: "Support",
  },
  "/my-stacks": {
    title: "My Stacks — Your Saved Nootropic Protocols | NootropicStacker",
    description: "View and manage your saved nootropic stacks. Track your protocols and results.",
    h1: "My Stacks",
  },
  "/dashboard": {
    title: "Dashboard — Traffic Analytics | NootropicStacker",
    description: "NootropicStacker traffic analytics dashboard.",
    h1: "Dashboard",
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────

function readArticle(slug) {
  try {
    const p = path.resolve(ARTICLES_DIR, `${slug}.json`);
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch {
    return null;
  }
}

function loadShell() {
  const p = path.resolve(DIST, "index.html");
  if (!fs.existsSync(p)) {
    console.error(`Shell HTML not found at ${p}. Run "vite build" first.`);
    process.exit(1);
  }
  return fs.readFileSync(p, "utf-8");
}

function writeRoute(subpath, html) {
  const clean = subpath.replace(/^\//, "").replace(/\/$/, "") || "index";
  const dir = path.resolve(DIST, clean);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

function esc(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ─── Content builders ───────────────────────────────────────────────────

function buildHead({ title, description, canonical, ogTitle, ogDesc, ogImage }) {
  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="https://nootropicstacker.com${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://nootropicstacker.com${canonical}" />
    <meta property="og:title" content="${esc(ogTitle || title)}" />
    <meta property="og:description" content="${esc(ogDesc || description)}" />
    <meta property="og:site_name" content="NootropicStacker" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(ogTitle || title)}" />
    <meta name="twitter:description" content="${esc(ogDesc || description)}" />
  `.trim();
}

function buildSupplementContent(supp) {
  const dose = supp.dosageMin && supp.dosageMax
    ? `${supp.dosageMin}–${supp.dosageMax} ${supp.dosageUnit}`
    : "Varies";

  return `
    <h1>${esc(supp.name)}</h1>
    <p class="supp-summary">${esc(supp.summary)}</p>
    <h2>What Is ${esc(supp.name)}?</h2>
    <p>${esc(supp.description)}</p>
    <h2>Dosage</h2>
    <p>Recommended dosage: ${dose} per day.</p>
    <h2>Supplement Scores</h2>
    <ul>
      <li>Focus: ${supp.scoreFocus}/10</li>
      <li>Memory: ${supp.scoreMemory}/10</li>
      <li>Energy: ${supp.scoreEnergy}/10</li>
      <li>Mood: ${supp.scoreMood}/10</li>
      <li>Creativity: ${supp.scoreCreativity}/10</li>
      <li>Sleep: ${supp.scoreSleep}/10</li>
      <li>Anxiety/Calm: ${supp.scoreAnxiety}/10</li>
    </ul>
    <h2>Safety Rating</h2>
    <p>${supp.safetyRating || "safe"}</p>
    <h2>Where to Buy</h2>
    <ul>
      ${supp.affiliatePrimary ? `<li><a href="${esc(supp.affiliatePrimary)}" rel="nofollow sponsored" target="_blank">${esc(supp.affiliatePrimaryLabel || "Primary Vendor")}</a></li>` : ""}
      ${supp.affiliateSecondary ? `<li><a href="${esc(supp.affiliateSecondary)}" rel="nofollow sponsored" target="_blank">${esc(supp.affiliateSecondaryLabel || "Secondary Vendor")}</a></li>` : ""}
      ${supp.affiliateAmazon ? `<li><a href="${esc(supp.affiliateAmazon)}" rel="nofollow sponsored" target="_blank">Amazon</a></li>` : ""}
    </ul>
    <p><a href="/library">Back to Library</a></p>
  `.trim();
}

function buildArticleContent(article) {
  const sections = article.sections || [];
  let body = `<h1>${esc(article.title)}</h1>`;
  if (article.excerpt) {
    body += `<p class="article-excerpt">${esc(article.excerpt)}</p>`;
  }
  for (const sec of sections) {
    if (sec.heading) body += `<h2>${esc(sec.heading)}</h2>`;
    for (const p of sec.paragraphs) {
      body += `<p>${esc(p)}</p>`;
    }
  }
  if (article.bottomLine) {
    body += `<h3>The Bottom Line</h3><p>${esc(article.bottomLine)}</p>`;
  }
  body += `<p><a href="/blog">Back to Blog</a></p>`;
  return body;
}

function buildGuideContent(slug) {
  const guideMeta = {
    "best-nootropic-stack-for-focus": {
      title: "The Best Nootropic Stack for Focus in 2026: A Tiered Approach",
      description: "Build the perfect nootropic stack for focus. Foundational, intermediate, and advanced tiered approach with evidence-backed recommendations.",
    },
    "best-nootropic-stack-for-memory": {
      title: "The Best Nootropic Stack for Memory in 2026",
      description: "The best nootropic stack for memory enhancement. Acetylcholine support, long-term potentiation, and synaptic density ingredients.",
    },
    "best-nootropic-stack-for-energy": {
      title: "The Best Nootropic Stack for Energy (Without Crashing)",
      description: "Build a crash-free energy stack that supports mitochondria, smooths stimulation, and uses adaptogens as a buffer.",
    },
    "best-nootropic-stack-for-anxiety": {
      title: "The Best Nootropic Stack for Anxiety and Calm Focus",
      description: "A calm-focus stack that pulls anxiety down from a level that interferes with work to a level that supports it.",
    },
    "beginners-guide-to-nootropics": {
      title: "Beginners Guide to Nootropics: What Actually Works in 2026",
      description: "A beginner's guide that does not oversell the category. Safety-first framework with compounds to start with.",
    },
    "mind-lab-pro-review": {
      title: "Mind Lab Pro Review 2026",
      description: "In-depth review of Mind Lab Pro, the world's most popular all-in-one nootropic stack with 11 evidence-backed ingredients.",
    },
  };
  const meta = guideMeta[slug] || {
    title: "Nootropic Guide",
    description: "Expert nootropic guide with stacking strategies and evidence-based recommendations.",
  };
  return `<h1>${esc(meta.title)}</h1><p>${esc(meta.description)}</p><p><a href="/guides">Back to Guides</a></p>`;
}

// ─── Route renderer ─────────────────────────────────────────────────────

const SITE_NAME = "NootropicStacker";
const DEFAULT_TITLE = "NootropicStacker — Build Your Perfect Nootropic Stack";
const DEFAULT_DESC = "Build nootropic supplement stacks with research-backed compounds. Free stack builder with synergy analysis and interaction warnings.";

function renderRoute({ path: routePath, headTags, rootContent, faqSchema }) {
  const shell = loadShell();
  const jsonLd = faqSchema ? `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>` : "";

  const out = shell
    .replace(
      /<title>[^<]*<\/title>/,
      () => ""
    )
    .replace(
      /(<meta name="description")[^>]*\/?>/,
      () => ""
    )
    .replace(
      /<link rel="canonical"[^>]*\/?>/,
      () => ""
    )
    .replace(
      /(<meta property="og:[^>]*\/?>\s*)+/g,
      () => ""
    )
    .replace(
      /(<meta name="twitter:[^>]*\/?>\s*)+/g,
      () => ""
    )
    .replace(
      /(<script type="application\/ld\+json">[\s\S]*?<\/script>)/,
      () => jsonLd || ""
    )
    .replace(
      /(<div id="root">)/,
      `$1\n${rootContent || ""}`
    )
    .replace(
      /(<\/head>)/,
      () => `${headTags}\n</head>`
    );

  return out;
}

// ─── Route definitions ──────────────────────────────────────────────────

function getAllRoutes() {
  const routes = [];

  // Static pages
  for (const [p, config] of Object.entries(STATIC_PAGES)) {
    let faqSchema = null;
    let rootContent = `<h1>${esc(config.h1)}</h1><p>${esc(config.description)}</p>`;

    if (p === "/faq") {
      const cats = FAQ_DATA.categories || [];
      const items = cats.flatMap((c) =>
        (c.questions || []).map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        }))
      );
      if (items.length) {
        faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items };
      }
      rootContent = `<h1>${esc(config.h1)}</h1>`;
      for (const cat of cats) {
        rootContent += `<h2>${esc(cat.label)}</h2>`;
        for (const q of (cat.questions || [])) {
          rootContent += `<h3>${esc(q.q)}</h3><p>${esc(q.a)}</p>`;
        }
      }
    }

    if (p === "/glossary") {
      const terms = FAQ_DATA.glossary || [];
      rootContent = `<h1>${esc(config.h1)}</h1>`;
      for (const t of terms) {
        rootContent += `<h3>${esc(t.term)}</h3><p>${esc(t.definition)}</p>`;
      }
    }

    const canonical = p;
    routes.push({
      path: p,
      headTags: buildHead({
        title: config.title,
        description: config.description,
        canonical,
      }),
      rootContent,
      faqSchema,
    });
  }

  // Supplement detail pages
  for (const supp of SUPPLEMENTS) {
    const p = `/supplements/${supp.slug}`;
    const title = `${supp.name} — Benefits, Dosage, and Evidence | ${SITE_NAME}`;
    const description = supp.summary || `${supp.name} nootropic supplement guide: benefits, dosage, safety, and clinical evidence.`;
    routes.push({
      path: p,
      headTags: buildHead({ title, description, canonical: p }),
      rootContent: buildSupplementContent(supp),
    });
  }

  // Blog articles
  for (const slug of articleSlugs) {
    const article = readArticle(slug);
    if (!article) continue;
    const p = `/blog/${slug}`;
    const title = `${article.title} | ${SITE_NAME}`;
    const description = article.excerpt || `${article.title} — expert nootropics article on NootropicStacker.`;
    routes.push({
      path: p,
      headTags: buildHead({ title, description, canonical: p }),
      rootContent: buildArticleContent(article),
    });
  }

  // Guide detail pages
  const GUIDE_SLUGS = [
    "best-nootropic-stack-for-focus",
    "best-nootropic-stack-for-memory",
    "best-nootropic-stack-for-energy",
    "best-nootropic-stack-for-anxiety",
    "beginners-guide-to-nootropics",
    "mind-lab-pro-review",
  ];
  for (const slug of GUIDE_SLUGS) {
    const p = `/guides/${slug}`;
    const guideMeta = {
      "best-nootropic-stack-for-focus": {
        title: "The Best Nootropic Stack for Focus in 2026",
        desc: "Build the perfect nootropic stack for focus with evidence-backed recommendations.",
      },
      "best-nootropic-stack-for-memory": {
        title: "The Best Nootropic Stack for Memory in 2026",
        desc: "The best nootropic stack for memory enhancement with clinical evidence.",
      },
      "best-nootropic-stack-for-energy": {
        title: "The Best Nootropic Stack for Energy (Without Crashing)",
        desc: "Build a crash-free energy stack with mitochondrial support and adaptogens.",
      },
      "best-nootropic-stack-for-anxiety": {
        title: "The Best Nootropic Stack for Anxiety and Calm Focus",
        desc: "A calm-focus stack that supports cognitive performance while managing anxiety.",
      },
      "beginners-guide-to-nootropics": {
        title: "Beginners Guide to Nootropics: What Actually Works in 2026",
        desc: "A safety-first beginner's guide to nootropics with the most evidence-backed compounds.",
      },
      "mind-lab-pro-review": {
        title: "Mind Lab Pro Review 2026",
        desc: "In-depth review of Mind Lab Pro, the world's most popular all-in-one nootropic stack.",
      },
    };
    const meta = guideMeta[slug] || { title: "Nootropic Guide", desc: "Expert nootropic guide." };
    routes.push({
      path: p,
      headTags: buildHead({ title: `${meta.title} | ${SITE_NAME}`, description: meta.desc, canonical: p }),
      rootContent: buildGuideContent(slug),
    });
  }

  return routes;
}

// ─── Main ───────────────────────────────────────────────────────────────

console.log(`\n🔍 Prerendering routes...`);

const routes = getAllRoutes();
console.log(`   ${routes.length} routes to generate`);

let rendered = 0;
let errors = 0;

for (const route of routes) {
  try {
    const html = renderRoute(route);
    writeRoute(route.path, html);
    rendered++;
    if (rendered % 20 === 0) {
      console.log(`   ✅ ${rendered}/${routes.length} routes generated`);
    }
  } catch (err) {
    console.error(`   ❌ ${route.path}: ${err.message}`);
    errors++;
  }
}

// Copy root index.html to 404.html for SPA fallback
try {
  const rootHtml = loadShell();
  const dir404 = path.resolve(DIST, "404");
  fs.mkdirSync(dir404, { recursive: true });
  fs.writeFileSync(path.join(dir404, "index.html"), rootHtml);
  rendered++;
} catch {
  // non-critical
}

console.log(`\n✅ Prerender complete: ${rendered} routes written (${errors} errors)`);
