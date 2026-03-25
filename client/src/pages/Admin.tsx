import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { MousePointerClick, Mail, TrendingUp, ExternalLink } from "lucide-react";

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();

  const clicksQuery = trpc.affiliate.stats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });
  const leadsQuery = trpc.leads.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="h-8 w-48 bg-card rounded animate-pulse" />
        </div>
      </main>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <main className="min-h-screen py-12">
        <div className="container text-center py-20">
          <p className="text-muted-foreground">Access denied. Admin only.</p>
        </div>
      </main>
    );
  }

  const clicks = clicksQuery.data ?? [];
  const leads = leadsQuery.data ?? [];

  // Aggregate clicks by partner
  const partnerCounts = clicks.reduce<Record<string, number>>((acc, c) => {
    acc[c.affiliatePartner] = (acc[c.affiliatePartner] ?? 0) + 1;
    return acc;
  }, {});
  const partnerData = Object.entries(partnerCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Aggregate clicks by supplement
  const suppCounts = clicks.reduce<Record<string, number>>((acc, c) => {
    if (c.supplementSlug) {
      acc[c.supplementSlug] = (acc[c.supplementSlug] ?? 0) + 1;
    }
    return acc;
  }, {});
  const suppData = Object.entries(suppCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const CHART_COLORS = [
    "oklch(0.72 0.2 165)",
    "oklch(0.78 0.15 200)",
    "oklch(0.65 0.2 290)",
    "oklch(0.78 0.18 75)",
    "oklch(0.72 0.18 330)",
  ];

  return (
    <main className="min-h-screen py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Conversion tracking, affiliate clicks, and email leads.</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: MousePointerClick,
              label: "Total Affiliate Clicks",
              value: clicks.length,
              color: "oklch(0.72 0.2 165)",
            },
            {
              icon: Mail,
              label: "Email Leads",
              value: leads.length,
              color: "oklch(0.78 0.15 200)",
            },
            {
              icon: TrendingUp,
              label: "Top Partner",
              value: partnerData[0]?.name ?? "—",
              color: "oklch(0.65 0.2 290)",
            },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="p-5 rounded-xl border border-border/50 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Clicks by partner */}
          <div className="p-5 rounded-xl border border-border/50 bg-card">
            <h2 className="font-display font-semibold text-foreground mb-4">Clicks by Partner</h2>
            {partnerData.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No clicks yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={partnerData}>
                  <XAxis dataKey="name" tick={{ fill: "oklch(0.55 0.02 250)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "oklch(0.55 0.02 250)", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "oklch(0.13 0.015 250)", border: "1px solid oklch(0.22 0.02 250)", borderRadius: "8px" }}
                    labelStyle={{ color: "oklch(0.95 0.01 250)" }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {partnerData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Clicks by supplement */}
          <div className="p-5 rounded-xl border border-border/50 bg-card">
            <h2 className="font-display font-semibold text-foreground mb-4">Top Supplements by Clicks</h2>
            {suppData.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No supplement clicks yet.</p>
            ) : (
              <div className="space-y-2">
                {suppData.map(({ name, count }, i) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4 text-right">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground truncate">{name}</span>
                        <span className="text-muted-foreground ml-2">{count}</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(count / (suppData[0]?.count ?? 1)) * 100}%`,
                            backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent clicks */}
        <div className="p-5 rounded-xl border border-border/50 bg-card mb-6">
          <h2 className="font-display font-semibold text-foreground mb-4">Recent Affiliate Clicks</h2>
          {clicks.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">No clicks recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="pb-2 text-xs text-muted-foreground font-medium">Time</th>
                    <th className="pb-2 text-xs text-muted-foreground font-medium">Partner</th>
                    <th className="pb-2 text-xs text-muted-foreground font-medium">Supplement</th>
                    <th className="pb-2 text-xs text-muted-foreground font-medium">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {clicks.slice(0, 20).map((click) => (
                    <tr key={click.id} className="border-b border-border/30 hover:bg-secondary/30">
                      <td className="py-2 text-xs text-muted-foreground">
                        {new Date(click.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2">
                        <Badge variant="outline" className="text-xs">{click.affiliatePartner}</Badge>
                      </td>
                      <td className="py-2 text-xs text-foreground">{click.supplementSlug ?? "—"}</td>
                      <td className="py-2">
                        <a
                          href={click.destinationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Link
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Email leads */}
        <div className="p-5 rounded-xl border border-border/50 bg-card">
          <h2 className="font-display font-semibold text-foreground mb-4">Email Leads ({leads.length})</h2>
          {leads.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">No leads yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="pb-2 text-xs text-muted-foreground font-medium">Email</th>
                    <th className="pb-2 text-xs text-muted-foreground font-medium">Name</th>
                    <th className="pb-2 text-xs text-muted-foreground font-medium">Source</th>
                    <th className="pb-2 text-xs text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/30 hover:bg-secondary/30">
                      <td className="py-2 text-xs text-foreground">{lead.email}</td>
                      <td className="py-2 text-xs text-muted-foreground">{lead.name ?? "—"}</td>
                      <td className="py-2">
                        <Badge variant="outline" className="text-xs">{lead.source}</Badge>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
