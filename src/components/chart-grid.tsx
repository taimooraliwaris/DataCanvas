import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import type { ChartSpec } from "@/lib/analyze";

const PALETTE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number; name?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0];
  return (
    <div className="rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background">
      <p className="font-medium">{label || row?.name}</p>
      <p className="tabular-nums opacity-90">{formatNumber(Number(row?.value ?? 0))}</p>
    </div>
  );
}

function ChartBody({ spec }: { spec: ChartSpec }) {
  if (spec.type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={spec.data}
            dataKey="value"
            nameKey="name"
            innerRadius={52}
            outerRadius={80}
            paddingAngle={2}
            stroke="var(--color-card)"
          >
            {spec.data.map((entry, index) => (
              <Cell key={entry.name} fill={PALETTE[index % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (spec.type === "line" || spec.type === "area") {
    const Chart = spec.type === "area" ? AreaChart : LineChart;
    return (
      <ResponsiveContainer width="100%" height={220}>
        <Chart data={spec.data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={40}
            tickFormatter={(v: number) => formatNumber(v)}
          />
          <Tooltip content={<ChartTooltip />} />
          {spec.type === "area" ? (
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-chart-1)"
              fill="var(--color-chart-1)"
              fillOpacity={0.12}
              strokeWidth={2}
            />
          ) : (
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={false}
            />
          )}
        </Chart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={spec.data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--color-border)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={0}
          height={48}
          tickFormatter={(value: string) => (value.length > 12 ? `${value.slice(0, 11)}…` : value)}
        />
        <YAxis
          tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={40}
          tickFormatter={(v: number) => formatNumber(v)}
        />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {spec.data.map((entry, index) => (
            <Cell key={entry.name} fill={PALETTE[index % PALETTE.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ChartGrid({ charts }: { charts: ChartSpec[] }) {
  if (charts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-start gap-3 p-6">
          <span className="flex size-11 items-center justify-center rounded-md bg-muted">
            <BarChart3 className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-xl tracking-tight">No chartable columns yet</h3>
            <p className="mt-1 max-w-lg text-sm text-muted-foreground">
              This sheet is mostly free text. Add a numeric, date, or short category column and charts will appear here automatically.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {charts.map((chart) => (
        <Card key={chart.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{chart.title}</CardTitle>
            <CardDescription>{chart.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartBody spec={chart} />
            {chart.type === "pie" ? (
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {chart.data.map((row, index) => (
                  <li key={row.name} className="inline-flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: PALETTE[index % PALETTE.length] }}
                    />
                    {row.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
