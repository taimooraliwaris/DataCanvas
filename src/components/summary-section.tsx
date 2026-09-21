import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartSpec, Insight, Kpi } from "@/lib/analyze";
import { ChartGrid } from "@/components/chart-grid";

type SummarySectionProps = {
  kpis: Kpi[];
  insights: Insight[];
  charts: ChartSpec[];
};

export function SummarySection({ kpis, insights, charts }: SummarySectionProps) {
  return (
    <section className="flex flex-col gap-4" aria-label="Dataset summary">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={kpi.label} className="rounded-lg p-0">
            <CardHeader className="p-4 pb-1">
              <CardDescription className="text-xs tracking-wide uppercase">{kpi.label}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p
                className="font-display text-3xl tracking-tight tabular-nums sm:text-4xl"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {kpi.value}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">{kpi.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {insights.length ? (
        <Card>
          <CardHeader>
            <CardTitle>What stands out</CardTitle>
            <CardDescription>A short reading of the columns, not a dump of every cell.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {insights.map((insight) => (
              <article key={insight.title} className="rounded-md bg-muted/70 p-4">
                <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {insight.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed">{insight.body}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <ChartGrid charts={charts} />
    </section>
  );
}
