import { formatFullNumber, formatNumber, formatPercent } from "@/lib/utils";
import {
  completeness,
  dateValues,
  numericValues,
  type Dataset,
  type DatasetColumn,
} from "@/lib/spreadsheet";

export type Kpi = {
  label: string;
  value: string;
  hint: string;
};

export type Insight = {
  title: string;
  body: string;
};

export type ChartDatum = { name: string; value: number };

export type ChartSpec = {
  id: string;
  title: string;
  subtitle: string;
  type: "bar" | "pie" | "line" | "area";
  data: ChartDatum[];
  valueLabel: string;
};

function topCounts(values: string[], limit = 8): ChartDatum[] {
  const map = new Map<string, number>();
  for (const value of values) {
    map.set(value, (map.get(value) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([name, value]) => ({ name, value }));
}

function histogram(values: number[], bins = 8): ChartDatum[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return [{ name: formatNumber(min), value: values.length }];
  const width = (max - min) / bins;
  const counts = Array.from({ length: bins }, () => 0);
  for (const value of values) {
    const i = Math.min(bins - 1, Math.floor((value - min) / width));
    counts[i] += 1;
  }
  return counts.map((value, i) => {
    const from = min + i * width;
    const to = min + (i + 1) * width;
    return { name: `${formatNumber(from)}–${formatNumber(to)}`, value };
  });
}

function groupNumericByDate(dates: Date[], numbers: number[]): ChartDatum[] {
  const pairs = dates
    .map((d, i) => ({ t: d.getTime(), v: numbers[i] }))
    .filter((p): p is { t: number; v: number } => typeof p.v === "number");
  if (pairs.length < 2) return [];

  const min = Math.min(...pairs.map((p) => p.t));
  const max = Math.max(...pairs.map((p) => p.t));
  const spanDays = (max - min) / 86400000;
  const bucket =
    spanDays > 730 ? "year" : spanDays > 90 ? "month" : "day";

  const map = new Map<string, { sum: number; label: string; order: number }>();
  for (const pair of pairs) {
    const d = new Date(pair.t);
    let key: string;
    let label: string;
    let order: number;
    if (bucket === "year") {
      key = String(d.getFullYear());
      label = key;
      order = d.getFullYear();
    } else if (bucket === "month") {
      key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      label = d.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
      order = d.getFullYear() * 100 + d.getMonth();
    } else {
      key = d.toISOString().slice(0, 10);
      label = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      order = pair.t;
    }
    const prev = map.get(key);
    if (prev) prev.sum += pair.v;
    else map.set(key, { sum: pair.v, label, order });
  }

  return [...map.values()]
    .sort((a, b) => a.order - b.order)
    .map((entry) => ({ name: entry.label, value: roundNice(entry.sum) }));
}

function roundNice(n: number): number {
  if (Math.abs(n) >= 100) return Math.round(n);
  return Math.round(n * 100) / 100;
}

function categoryValues(dataset: Dataset, col: DatasetColumn): string[] {
  return dataset.rows
    .map((row) => row[col.key])
    .filter((v) => v != null && v !== "")
    .map((v) => String(v));
}

function sumByCategory(
  dataset: Dataset,
  category: DatasetColumn,
  metric: DatasetColumn,
  limit = 8,
): ChartDatum[] {
  const map = new Map<string, number>();
  for (const row of dataset.rows) {
    const cat = row[category.key];
    const num = row[metric.key];
    if (cat == null || typeof num !== "number") continue;
    const key = String(cat);
    map.set(key, (map.get(key) ?? 0) + num);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, value]) => ({ name, value: roundNice(value) }));
}

export function buildKpis(dataset: Dataset): Kpi[] {
  const complete = completeness(dataset);
  const kpis: Kpi[] = [
    {
      label: "Rows",
      value: dataset.rowCount.toLocaleString(),
      hint: dataset.sheetName ? `Sheet · ${dataset.sheetName}` : dataset.fileName,
    },
    {
      label: "Columns",
      value: String(dataset.columns.length),
      hint: `${dataset.columns.filter((c) => c.kind === "number").length} numeric`,
    },
    {
      label: "Filled cells",
      value: formatPercent(complete),
      hint: complete > 0.95 ? "Nearly complete" : "Some blanks remain",
    },
  ];

  const numeric = dataset.columns.filter((c) => c.kind === "number" && c.sum != null);
  const featured = numeric.sort((a, b) => (b.sum ?? 0) - (a.sum ?? 0))[0];
  if (featured?.sum != null && featured.mean != null) {
    kpis.push({
      label: `Sum of ${featured.name}`,
      value: formatNumber(featured.sum),
      hint: `Average ${formatFullNumber(featured.mean)}`,
    });
  } else {
    const cats = dataset.columns.filter((c) => c.kind === "category" || c.kind === "boolean");
    const cat = cats.sort((a, b) => b.uniqueCount - a.uniqueCount)[0];
    kpis.push({
      label: cat ? `Values in ${cat.name}` : "Unique fields",
      value: String(cat?.uniqueCount ?? dataset.columns.reduce((s, c) => s + c.uniqueCount, 0)),
      hint: cat ? "Distinct labels" : "Across all columns",
    });
  }
  return kpis.slice(0, 4);
}

export function buildInsights(dataset: Dataset): Insight[] {
  const insights: Insight[] = [];
  const complete = completeness(dataset);
  const imageCols = dataset.columns.filter((c) => c.kind === "image");
  const numeric = dataset.columns.filter((c) => c.kind === "number");
  const cats = dataset.columns.filter((c) => c.kind === "category");
  const dates = dataset.columns.filter((c) => c.kind === "date");

  insights.push({
    title: "Shape",
    body: `${dataset.fileName.replace(/\.[^.]+$/, "")} holds ${dataset.rowCount.toLocaleString()} rows across ${dataset.columns.length} columns, with ${formatPercent(complete)} of cells filled.`,
  });

  if (imageCols.length) {
    const col = imageCols[0]!;
    const withImages = dataset.rows.filter((row) => row[col.key] != null).length;
    insights.push({
      title: "Pictures",
      body: `${col.name} includes pictures on ${withImages.toLocaleString()} rows — they render as thumbnails in the table, not as raw links.`,
    });
  }

  const featuredNumeric = numeric[0];
  if (
    featuredNumeric &&
    featuredNumeric.mean != null &&
    featuredNumeric.min != null &&
    featuredNumeric.max != null
  ) {
    insights.push({
      title: featuredNumeric.name,
      body: `${featuredNumeric.name} ranges from ${formatFullNumber(featuredNumeric.min)} to ${formatFullNumber(featuredNumeric.max)}, averaging ${formatFullNumber(featuredNumeric.mean)}.`,
    });
  }

  if (cats[0]) {
    const values = categoryValues(dataset, cats[0]);
    const top = topCounts(values, 1)[0];
    if (top) {
      insights.push({
        title: cats[0].name,
        body: `“${top.name}” is the most common ${cats[0].name.toLowerCase()}, appearing in ${top.value.toLocaleString()} of ${values.length.toLocaleString()} labelled rows.`,
      });
    }
  }

  if (dates[0]) {
    const series = dateValues(dataset, dates[0].key).sort((a, b) => a.getTime() - b.getTime());
    if (series.length >= 2) {
      const from = series[0]!.toLocaleDateString(undefined, { month: "short", year: "numeric" });
      const to = series[series.length - 1]!.toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      });
      insights.push({
        title: dates[0].name,
        body: `${dates[0].name} spans ${from} through ${to}.`,
      });
    }
  }

  const sparse = dataset.columns
    .filter((c) => c.nullCount > 0)
    .sort((a, b) => b.nullCount - a.nullCount)[0];
  if (sparse && sparse.nullCount / dataset.rowCount >= 0.2) {
    insights.push({
      title: "Gaps",
      body: `${sparse.name} is missing in ${formatPercent(sparse.nullCount / dataset.rowCount)} of rows — the largest gap in this sheet.`,
    });
  }

  return insights.slice(0, 4);
}

export function buildCharts(dataset: Dataset): ChartSpec[] {
  const charts: ChartSpec[] = [];
  const numeric = dataset.columns.filter((c) => c.kind === "number");
  const cats = dataset.columns.filter((c) => c.kind === "category" || c.kind === "boolean");
  const dates = dataset.columns.filter((c) => c.kind === "date");

  if (dates[0] && numeric[0]) {
    const dateCol = dates[0];
    const numCol = numeric[0];
    const alignedDates: Date[] = [];
    const alignedNums: number[] = [];
    for (const row of dataset.rows) {
      const d = row[dateCol.key];
      const n = row[numCol.key];
      if (d instanceof Date && typeof n === "number") {
        alignedDates.push(d);
        alignedNums.push(n);
      }
    }
    const data = groupNumericByDate(alignedDates, alignedNums);
    if (data.length >= 2) {
      charts.push({
        id: `trend-${dateCol.key}-${numCol.key}`,
        title: `${numCol.name} over time`,
        subtitle: `Grouped by ${dateCol.name}`,
        type: data.length > 8 ? "area" : "line",
        data,
        valueLabel: numCol.name,
      });
    }
  }

  if (cats[0] && numeric[0]) {
    const data = sumByCategory(dataset, cats[0], numeric[0]);
    if (data.length >= 2) {
      charts.push({
        id: `sum-${cats[0].key}-${numeric[0].key}`,
        title: `${numeric[0].name} by ${cats[0].name}`,
        subtitle: "Top groups by total",
        type: "bar",
        data,
        valueLabel: numeric[0].name,
      });
    }
  }

  if (cats[0]) {
    const data = topCounts(categoryValues(dataset, cats[0]), 8);
    if (data.length >= 2) {
      const pieFriendly = data.length <= 7 && data.length >= 2;
      charts.push({
        id: `share-${cats[0].key}`,
        title: `Share of ${cats[0].name}`,
        subtitle: `${cats[0].uniqueCount} distinct values`,
        type: pieFriendly ? "pie" : "bar",
        data,
        valueLabel: "Rows",
      });
    }
  }

  if (numeric[0]) {
    const values = numericValues(dataset, numeric[0].key);
    const data = histogram(values);
    if (data.length >= 2) {
      charts.push({
        id: `hist-${numeric[0].key}`,
        title: `Distribution of ${numeric[0].name}`,
        subtitle: `${values.length.toLocaleString()} numeric values`,
        type: "bar",
        data,
        valueLabel: "Rows",
      });
    }
  }

  if (cats[1] && charts.length < 4) {
    const data = topCounts(categoryValues(dataset, cats[1]), 8);
    if (data.length >= 2) {
      charts.push({
        id: `share-${cats[1].key}`,
        title: `Share of ${cats[1].name}`,
        subtitle: `${cats[1].uniqueCount} distinct values`,
        type: data.length <= 6 ? "pie" : "bar",
        data,
        valueLabel: "Rows",
      });
    }
  }

  const seen = new Set<string>();
  return charts.filter((chart) => {
    if (seen.has(chart.id) || chart.data.length === 0) return false;
    seen.add(chart.id);
    return true;
  }).slice(0, 4);
}
