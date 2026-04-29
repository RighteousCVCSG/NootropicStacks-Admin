import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Activity, MousePointerClick, TrendingUp, Calendar } from "lucide-react";

const TOKEN_KEY = "nspot_dashboard_key";

export default function Dashboard() {
  const [key, setKey] = useState<string>("");
  const [submitted, setSubmitted] = useState<string>("");

  useEffect(() => {
    const stored = window.localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setKey(stored);
      setSubmitted(stored);
    }
  }, []);

  const summary = trpc.affiliate.publicSummary.useQuery(
    { key: submitted },
    { enabled: !!submitted, retry: false }
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.localStorage.setItem(TOKEN_KEY, key);
    setSubmitted(key);
  };

  const clear = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    setKey("");
    setSubmitted("");
  };

  if (!submitted || summary.error) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-md">
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h1 className="font-display text-xl font-bold text-foreground">Traffic Dashboard</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your dashboard key to view affiliate-click stats and traffic source breakdown.
            </p>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <Input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Dashboard key"
                autoFocus
              />
              <Button type="submit" disabled={!key.trim()}>
                Unlock
              </Button>
            </form>
            {summary.error && (
              <p className="mt-3 text-xs text-destructive">{summary.error.message}</p>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (summary.isLoading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl">
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-card border border-border/50 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const data = summary.data;
  if (!data) return null;

  const totals = [
    { label: "All time", value: data.totals.allTime, icon: TrendingUp },
    { label: "Last 30 days", value: data.totals.last30d, icon: Calendar },
    { label: "Last 7 days", value: data.totals.last7d, icon: Calendar },
    { label: "Last 24 hours", value: data.totals.last24h, icon: MousePointerClick },
  ];

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Traffic Dashboard</h1>
            <p className="text-sm text-muted-foreground">Affiliate clicks · last 30 days</p>
          </div>
          <Button variant="ghost" size="sm" onClick={clear}>
            Lock
          </Button>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {totals.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-border/50 bg-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* By referrer (UTM source) */}
          <div className="rounded-xl border border-border/50 bg-card p-5">
            <h2 className="font-display font-semibold text-foreground mb-3">By traffic source</h2>
            {data.byReferrer.length === 0 ? (
              <p className="text-sm text-muted-foreground">No clicks yet.</p>
            ) : (
              <ul className="space-y-2">
                {data.byReferrer.map((r) => (
                  <li key={r.referrer} className="flex items-center justify-between text-sm">
                    <span className="font-mono-brand text-foreground truncate pr-2">{r.referrer}</span>
                    <Badge variant="outline" className="text-xs border-border/50 shrink-0">{r.count}</Badge>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Format: <code className="text-foreground">utm_source:utm_campaign:context</code>
            </p>
          </div>

          {/* By partner */}
          <div className="rounded-xl border border-border/50 bg-card p-5">
            <h2 className="font-display font-semibold text-foreground mb-3">By affiliate partner</h2>
            {data.byPartner.length === 0 ? (
              <p className="text-sm text-muted-foreground">No clicks yet.</p>
            ) : (
              <ul className="space-y-2">
                {data.byPartner.map((r) => (
                  <li key={r.partner} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{r.partner}</span>
                    <Badge variant="outline" className="text-xs border-border/50 shrink-0">{r.count}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* By supplement */}
          <div className="rounded-xl border border-border/50 bg-card p-5">
            <h2 className="font-display font-semibold text-foreground mb-3">Top supplements clicked</h2>
            {data.bySupplement.length === 0 ? (
              <p className="text-sm text-muted-foreground">No clicks yet.</p>
            ) : (
              <ul className="space-y-2">
                {data.bySupplement.slice(0, 10).map((r) => (
                  <li key={r.slug} className="flex items-center justify-between text-sm">
                    <span className="font-mono-brand text-foreground truncate pr-2">{r.slug}</span>
                    <Badge variant="outline" className="text-xs border-border/50 shrink-0">{r.count}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* By day */}
          <div className="rounded-xl border border-border/50 bg-card p-5">
            <h2 className="font-display font-semibold text-foreground mb-3">By day</h2>
            {data.byDay.length === 0 ? (
              <p className="text-sm text-muted-foreground">No clicks yet.</p>
            ) : (
              <ul className="space-y-2">
                {data.byDay.slice(0, 14).map((r) => (
                  <li key={r.day} className="flex items-center justify-between text-sm">
                    <span className="font-mono-brand text-muted-foreground">{r.day}</span>
                    <Badge variant="outline" className="text-xs border-border/50 shrink-0">{r.count}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
