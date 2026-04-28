import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export interface StackItem {
  slug: string;
  name: string;
}

export interface StackScores {
  energy: number;
  relaxation: number;
  brain: number;
  overall: number;
  estimatedMonthly: number;
}

interface SuppData {
  energy: number;
  relaxation: number;
  brain: number;
  monthlyUsd: number;
}

const SUPP_DATA: Record<string, SuppData> = {
  "caffeine": { energy: 9, relaxation: 1, brain: 5, monthlyUsd: 8 },
  "l-theanine": { energy: 3, relaxation: 8, brain: 4, monthlyUsd: 10 },
  "ashwagandha": { energy: 2, relaxation: 9, brain: 4, monthlyUsd: 18 },
  "magnesium-glycinate": { energy: 1, relaxation: 8, brain: 3, monthlyUsd: 14 },
  "melatonin": { energy: 0, relaxation: 9, brain: 2, monthlyUsd: 8 },
  "lions-mane": { energy: 3, relaxation: 4, brain: 10, monthlyUsd: 28 },
  "bacopa-monnieri": { energy: 2, relaxation: 6, brain: 9, monthlyUsd: 18 },
  "alpha-gpc": { energy: 4, relaxation: 3, brain: 9, monthlyUsd: 32 },
  "rhodiola": { energy: 7, relaxation: 5, brain: 6, monthlyUsd: 22 },
  "omega-3": { energy: 2, relaxation: 4, brain: 8, monthlyUsd: 20 },
  "vitamin-d3": { energy: 3, relaxation: 3, brain: 5, monthlyUsd: 10 },
  "creatine": { energy: 6, relaxation: 2, brain: 7, monthlyUsd: 15 },
  "phosphatidylserine": { energy: 3, relaxation: 5, brain: 8, monthlyUsd: 30 },
  "nmn": { energy: 5, relaxation: 3, brain: 6, monthlyUsd: 45 },
  "coq10": { energy: 6, relaxation: 3, brain: 5, monthlyUsd: 25 },
  "l-tyrosine": { energy: 7, relaxation: 2, brain: 7, monthlyUsd: 14 },
  "ginkgo-biloba": { energy: 4, relaxation: 4, brain: 7, monthlyUsd: 12 },
  "huperzine-a": { energy: 3, relaxation: 2, brain: 8, monthlyUsd: 16 },
  "citicoline": { energy: 5, relaxation: 3, brain: 9, monthlyUsd: 28 },
};

const DEFAULT_SCORES: SuppData = { energy: 3, relaxation: 3, brain: 3, monthlyUsd: 20 };

const STORAGE_KEY = "quickstack";

function getSuppData(slug: string): SuppData {
  return SUPP_DATA[slug] ?? DEFAULT_SCORES;
}

function computeScores(items: StackItem[]): StackScores {
  if (items.length === 0) {
    return { energy: 0, relaxation: 0, brain: 0, overall: 0, estimatedMonthly: 0 };
  }
  const totals = items.reduce(
    (acc, item) => {
      const data = getSuppData(item.slug);
      acc.energy += data.energy;
      acc.relaxation += data.relaxation;
      acc.brain += data.brain;
      acc.monthlyUsd += data.monthlyUsd;
      return acc;
    },
    { energy: 0, relaxation: 0, brain: 0, monthlyUsd: 0 }
  );
  const energy = Math.round((totals.energy / items.length) * 10);
  const relaxation = Math.round((totals.relaxation / items.length) * 10);
  const brain = Math.round((totals.brain / items.length) * 10);
  const overall = Math.round((energy + relaxation + brain) / 3);
  return {
    energy,
    relaxation,
    brain,
    overall,
    estimatedMonthly: totals.monthlyUsd,
  };
}

interface QuickStackContextValue {
  items: StackItem[];
  scores: StackScores;
  addItem: (item: StackItem) => void;
  removeItem: (slug: string) => void;
  clearStack: () => void;
  hasItem: (slug: string) => boolean;
  itemCount: number;
}

const QuickStackContext = createContext<QuickStackContextValue | undefined>(undefined);

interface QuickStackProviderProps {
  children: React.ReactNode;
}

export function QuickStackProvider({ children }: QuickStackProviderProps) {
  const [items, setItems] = useState<StackItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (entry): entry is StackItem =>
          entry && typeof entry.slug === "string" && typeof entry.name === "string"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items]);

  const addItem = useCallback((item: StackItem) => {
    setItems(prev => {
      if (prev.some(p => p.slug === item.slug)) return prev;
      toast.success("Added to stack!", { description: item.name });
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems(prev => prev.filter(p => p.slug !== slug));
  }, []);

  const clearStack = useCallback(() => {
    setItems([]);
  }, []);

  const hasItem = useCallback((slug: string) => items.some(p => p.slug === slug), [items]);

  const scores = useMemo(() => computeScores(items), [items]);

  const value = useMemo<QuickStackContextValue>(
    () => ({
      items,
      scores,
      addItem,
      removeItem,
      clearStack,
      hasItem,
      itemCount: items.length,
    }),
    [items, scores, addItem, removeItem, clearStack, hasItem]
  );

  return <QuickStackContext.Provider value={value}>{children}</QuickStackContext.Provider>;
}

export function useQuickStack() {
  const ctx = useContext(QuickStackContext);
  if (!ctx) {
    throw new Error("useQuickStack must be used within QuickStackProvider");
  }
  return ctx;
}
