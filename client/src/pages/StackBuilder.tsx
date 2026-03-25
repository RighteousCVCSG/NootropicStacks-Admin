import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SupplementCard from "@/components/SupplementCard";
import { GOALS } from "../../../shared/affiliates";
import { Brain, Search, Trash2, Save, Share2, Plus, X } from "lucide-react";

interface StackItem {
  supplementId: number;
  name: string;
  dosageMg?: number;
  timing?: string;
  notes?: string;
  sortOrder: number;
}

export default function StackBuilder() {
  const { isAuthenticated } = useAuth();
  const [stackName, setStackName] = useState("My Custom Stack");
  const [stackGoal, setStackGoal] = useState("");
  const [stackItems, setStackItems] = useState<StackItem[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [savedStackId, setSavedStackId] = useState<number | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);

  const supplementsQuery = trpc.supplements.list.useQuery({
    search: debouncedSearch || undefined,
    limit: 24,
  });

  const recommendQuery = trpc.supplements.recommend.useQuery(
    { goals: selectedGoals, limit: 12 },
    { enabled: selectedGoals.length > 0 }
  );

  const createStack = trpc.stacks.create.useMutation({
    onSuccess: (data) => {
      setSavedStackId(data.id);
      setShareToken(data.shareToken);
      toast.success("Stack saved successfully!");
    },
    onError: () => toast.error("Failed to save stack. Please try again."),
  });

  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout((window as any).__builderTimer);
    (window as any).__builderTimer = setTimeout(() => setDebouncedSearch(val), 300);
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const addToStack = (supplementId: number, name: string) => {
    if (stackItems.find((i) => i.supplementId === supplementId)) {
      toast.info(`${name} is already in your stack.`);
      return;
    }
    setStackItems((prev) => [
      ...prev,
      { supplementId, name, sortOrder: prev.length },
    ]);
    toast.success(`${name} added to stack!`);
  };

  const removeFromStack = (supplementId: number) => {
    setStackItems((prev) => prev.filter((i) => i.supplementId !== supplementId));
  };

  const saveStack = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (stackItems.length === 0) {
      toast.error("Add at least one supplement before saving.");
      return;
    }
    createStack.mutate({
      name: stackName,
      goal: stackGoal || undefined,
      isPublic,
      items: stackItems,
    });
  };

  const copyShareLink = () => {
    if (!shareToken) return;
    const url = `${window.location.origin}/stacks/${shareToken}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied!");
  };

  const displayedSupplements =
    selectedGoals.length > 0
      ? recommendQuery.data ?? []
      : supplementsQuery.data?.items ?? [];

  const stackIds = new Set(stackItems.map((i) => i.supplementId));

  return (
    <main className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">Stack Builder</h1>
          <p className="text-muted-foreground">
            Build your personalized nootropic stack. Search, filter by goal, and add supplements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Supplement Browser */}
          <div className="lg:col-span-2 space-y-5">
            {/* Goal filter */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Filter by goal:</p>
              <div className="flex flex-wrap gap-2">
                {GOALS.map((goal) => {
                  const isSelected = selectedGoals.includes(goal.id);
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-primary/15 text-primary border border-primary/30"
                          : "bg-secondary text-muted-foreground border border-border/50 hover:text-foreground"
                      }`}
                    >
                      <span>{goal.icon}</span>
                      {goal.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search supplements..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9 bg-secondary border-border/50"
              />
            </div>

            {/* Supplement grid */}
            {(supplementsQuery.isLoading || (selectedGoals.length > 0 && recommendQuery.isLoading)) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-xl bg-card border border-border/50 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedSupplements.map((supp) => (
                  <SupplementCard
                    key={supp.id}
                    supplement={supp}
                    showAddButton
                    isInStack={stackIds.has(supp.id)}
                    onAddToStack={(id) => addToStack(id, supp.name)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Stack Panel */}
          <div className="space-y-4">
            <div className="sticky top-24 space-y-4">
              {/* Stack name */}
              <div className="p-5 rounded-xl border border-border/50 bg-card space-y-4">
                <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  Your Stack
                </h2>
                <Input
                  value={stackName}
                  onChange={(e) => setStackName(e.target.value)}
                  placeholder="Stack name..."
                  className="bg-secondary border-border/50 font-medium"
                />
                <Input
                  value={stackGoal}
                  onChange={(e) => setStackGoal(e.target.value)}
                  placeholder="Goal (e.g. Focus & Memory)..."
                  className="bg-secondary border-border/50 text-sm"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="isPublic" className="text-sm text-muted-foreground cursor-pointer">
                    Make stack public & shareable
                  </label>
                </div>
              </div>

              {/* Stack items */}
              <div className="p-5 rounded-xl border border-border/50 bg-card min-h-32">
                {stackItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Plus className="w-8 h-8 text-border mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Add supplements from the left panel to build your stack.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-3">
                      {stackItems.length} supplement{stackItems.length !== 1 ? "s" : ""} in stack
                    </p>
                    {stackItems.map((item) => (
                      <div
                        key={item.supplementId}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50 border border-border/30"
                      >
                        <span className="text-sm text-foreground font-medium truncate">{item.name}</span>
                        <button
                          onClick={() => removeFromStack(item.supplementId)}
                          className="ml-2 p-1 rounded text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save & Share */}
              <div className="space-y-2">
                {savedStackId ? (
                  <>
                    <div className="p-3 rounded-lg border border-primary/30 bg-primary/10 text-center">
                      <p className="text-sm text-primary font-medium">✓ Stack saved!</p>
                      <Link href="/my-stacks" className="text-xs text-muted-foreground hover:text-foreground">
                        View in My Stacks →
                      </Link>
                    </div>
                    {shareToken && (
                      <Button variant="outline" className="w-full" size="sm" onClick={copyShareLink}>
                        <Share2 className="w-3 h-3 mr-2" />
                        Copy Share Link
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    className="w-full glow-green"
                    onClick={saveStack}
                    disabled={createStack.isPending || stackItems.length === 0}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isAuthenticated ? "Save Stack" : "Sign In to Save"}
                  </Button>
                )}
                {!isAuthenticated && (
                  <p className="text-xs text-muted-foreground text-center">
                    Sign in to save and share your stacks.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
