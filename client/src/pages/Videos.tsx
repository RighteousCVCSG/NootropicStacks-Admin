import { useState } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, PlayCircle, MessageSquare } from "lucide-react";

// Replace PLACEHOLDER_{n} with real YouTube video IDs before deploying
const ALL_VIDEOS = [
  // Supplement Deep Dives
  {
    id: "1",
    title: "Lion's Mane Mushroom: Full Deep Dive",
    category: "Supplement Deep Dives",
    categoryKey: "deep-dives",
    description: "A comprehensive breakdown of Lion's Mane mushroom, NGF stimulation, and the clinical evidence for neuroplasticity.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_1",
  },
  {
    id: "2",
    title: "Ashwagandha KSM-66 Explained: Stress, Sleep & Cortisol",
    category: "Supplement Deep Dives",
    categoryKey: "deep-dives",
    description: "Everything you need to know about Ashwagandha — mechanisms, dosing, and what the RCTs actually show.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_2",
  },
  {
    id: "3",
    title: "Bacopa Monnieri: The Science of Memory Enhancement",
    category: "Supplement Deep Dives",
    categoryKey: "deep-dives",
    description: "Why Bacopa is the most clinically validated memory supplement, and how to use it correctly.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_3",
  },

  // Stack Building
  {
    id: "4",
    title: "How to Build a Nootropic Stack from Scratch",
    category: "Stack Building",
    categoryKey: "stack-building",
    description: "A beginner-friendly framework for building your first nootropic stack — starting simple and layering up.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_4",
  },
  {
    id: "5",
    title: "Caffeine + L-Theanine: The Perfect Combo",
    category: "Stack Building",
    categoryKey: "stack-building",
    description: "Why this is the most-studied nootropic pairing in existence, and how to dial in your ratio.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_5",
  },
  {
    id: "6",
    title: "The Ultimate Focus Stack: Alpha GPC + Lion's Mane + Bacopa",
    category: "Stack Building",
    categoryKey: "stack-building",
    description: "Building a layered focus stack that covers acetylcholine, neuroplasticity, and anxiety — all in one.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_6",
  },

  // Science & Research
  {
    id: "7",
    title: "Nootropics Explained: How They Actually Work",
    category: "Science & Research",
    categoryKey: "science",
    description: "A plain-English explainer on the neuroscience behind nootropics — receptors, neurotransmitters, and pathways.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_7",
  },
  {
    id: "8",
    title: "How Memory Works: Encoding, Consolidation & Retrieval",
    category: "Science & Research",
    categoryKey: "science",
    description: "Understanding the three stages of memory formation and which supplements target each stage.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_8",
  },
  {
    id: "9",
    title: "Neuroplasticity: How Your Brain Rewires Itself",
    category: "Science & Research",
    categoryKey: "science",
    description: "The science of neuroplasticity and how nootropics like Lion's Mane and Bacopa support long-term structural changes.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_9",
  },

  // Lifestyle
  {
    id: "10",
    title: "Sleep Optimization: The Cognitive Performance Foundation",
    category: "Lifestyle",
    categoryKey: "lifestyle",
    description: "Why sleep is the most powerful nootropic and how to structure your supplement stack around sleep quality.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_10",
  },
  {
    id: "11",
    title: "Morning Routine with Nootropics: A Practical Guide",
    category: "Lifestyle",
    categoryKey: "lifestyle",
    description: "How to sequence your nootropics with breakfast, coffee, and your morning workflow for maximum effect.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_11",
  },
  {
    id: "12",
    title: "Biohacking Basics: Where to Start Without Overwhelm",
    category: "Lifestyle",
    categoryKey: "lifestyle",
    description: "A grounded introduction to biohacking — cutting through the hype to the high-leverage basics.",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_12",
  },
];

const CATEGORY_TABS = [
  { key: "all", label: "All Videos" },
  { key: "deep-dives", label: "Supplement Deep Dives" },
  { key: "stack-building", label: "Stack Building" },
  { key: "science", label: "Science & Research" },
  { key: "lifestyle", label: "Lifestyle" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Supplement Deep Dives": "bg-primary/10 text-primary border-primary/20",
  "Stack Building": "bg-green-500/10 text-green-400 border-green-500/20",
  "Science & Research": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Lifestyle": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function VideoCard({ video }: { video: typeof ALL_VIDEOS[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden flex flex-col">
      {/* Thumbnail / iframe */}
      <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
        {playing ? (
          <iframe
            src={`${video.embedUrl}?autoplay=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-colors group"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
          >
            <div className="w-14 h-14 rounded-full bg-card/90 border border-border/50 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all">
              <PlayCircle className="w-8 h-8 text-primary" />
            </div>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Badge className={`text-xs self-start ${CATEGORY_COLORS[video.category]}`}>
          {video.category}
        </Badge>
        <h3 className="font-semibold text-foreground text-sm leading-snug">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default function Videos() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl">

        {/* Hero */}
        <div className="mb-10 text-center">
          <Badge className="bg-primary/15 text-primary border-primary/30 mb-4">
            <PlayCircle className="w-3 h-3 mr-1" />
            Video Library
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Nootropics Video Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Curated educational videos on supplements, stacking strategies, and the neuroscience behind cognitive enhancement.
          </p>
        </div>

        {/* Tabs + Grid */}
        <Tabs defaultValue="all" className="mb-14">
          <TabsList className="mb-8 flex-wrap h-auto gap-1 bg-card border border-border/50 p-1">
            {CATEGORY_TABS.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key} className="text-xs">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ALL_VIDEOS.map((v) => <VideoCard key={v.id} video={v} />)}
            </div>
          </TabsContent>

          {["deep-dives", "stack-building", "science", "lifestyle"].map((key) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ALL_VIDEOS.filter((v) => v.categoryKey === key).map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Disclaimer */}
        <div className="mb-8 p-4 rounded-xl border border-border/30 bg-card/50 flex gap-3 items-start text-sm">
          <PlayCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-muted-foreground">
            Videos are curated educational content. We don't produce these videos — they are sourced from independent creators and researchers in the nootropics space.
          </p>
        </div>

        {/* Suggest a video */}
        <div className="p-8 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Know a great nootropics video?
          </h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            We're always looking for high-quality educational content to add to the library. Suggest a video via our contact page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button variant="outline" className="border-border/50 gap-2">
                Suggest a Video <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/builder">
              <Button className="gap-2">
                Build Your Stack <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
