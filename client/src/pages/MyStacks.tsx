import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Brain, Plus, Trash2, Share2, Lock, Globe, ChevronRight } from "lucide-react";

export default function MyStacks() {
  const { isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();

  const stacksQuery = trpc.stacks.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const deleteStack = trpc.stacks.delete.useMutation({
    onSuccess: () => {
      utils.stacks.list.invalidate();
      toast.success("Stack deleted.");
    },
    onError: () => toast.error("Failed to delete stack."),
  });

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-card border border-border/50 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">My Stacks</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Sign in to save, manage, and share your personalized nootropic stacks.
            </p>
            <Button size="lg" className="glow-green" asChild>
              <a href={getLoginUrl()}>Sign In to Continue</a>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">My Stacks</h1>
            <p className="text-muted-foreground text-sm">
              {stacksQuery.data?.length ?? 0} saved stack{(stacksQuery.data?.length ?? 0) !== 1 ? "s" : ""}
            </p>
          </div>
          <Button asChild className="glow-green">
            <Link href="/builder">
              <Plus className="w-4 h-4 mr-2" />
              New Stack
            </Link>
          </Button>
        </div>

        {stacksQuery.isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-card border border-border/50 animate-pulse" />
            ))}
          </div>
        ) : stacksQuery.data?.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border/50 rounded-xl">
            <Brain className="w-10 h-10 text-border mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No stacks yet. Build your first one!</p>
            <Button asChild>
              <Link href="/builder">
                <Plus className="w-4 h-4 mr-2" />
                Build a Stack
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {stacksQuery.data?.map((stack) => (
              <div
                key={stack.id}
                className="flex items-center justify-between p-5 rounded-xl border border-border/50 bg-card card-hover group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-foreground truncate">{stack.name}</h3>
                    {stack.isPublic ? (
                      <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                  {stack.goal && (
                    <Badge variant="outline" className="text-xs text-muted-foreground border-border/50 mb-1">
                      {stack.goal}
                    </Badge>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(stack.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  {stack.isPublic && stack.shareToken && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/stacks/${stack.shareToken}`);
                        toast.success("Share link copied!");
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      if (confirm("Delete this stack?")) {
                        deleteStack.mutate({ id: stack.id });
                      }
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
