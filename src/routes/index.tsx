import { useCallback, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layers3, RotateCcw } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { SummarySection } from "@/components/summary-section";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buildCharts, buildInsights, buildKpis } from "@/lib/analyze";
import { getSampleDataset } from "@/lib/sample-data";
import {
  parseSpreadsheet,
  parseSpreadsheetSheet,
  SpreadsheetError,
  type Dataset,
} from "@/lib/spreadsheet";

export const Route = createFileRoute("/")({ component: Home });

type Status = "idle" | "reading" | "parsing" | "ready" | "error";

function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<{ message: string; hint?: string } | null>(null);

  const kpis = useMemo(() => (dataset ? buildKpis(dataset) : []), [dataset]);
  const insights = useMemo(() => (dataset ? buildInsights(dataset) : []), [dataset]);
  const charts = useMemo(() => (dataset ? buildCharts(dataset) : []), [dataset]);

  const applyDataset = useCallback((next: Dataset, source: File | null) => {
    setDataset(next);
    setFile(source);
    setError(null);
    setStatus("ready");
    setProgress(100);
  }, []);

  const handleFile = useCallback(
    async (nextFile: File, sheetName?: string) => {
      setError(null);
      setStatus("reading");
      setProgress(6);
      try {
        const parsed = sheetName
          ? await parseSpreadsheetSheet(nextFile, sheetName, (pct) => {
              setProgress(pct);
              if (pct >= 82) setStatus("parsing");
            })
          : await parseSpreadsheet(nextFile, (pct) => {
              setProgress(pct);
              if (pct >= 82) setStatus("parsing");
            });
        applyDataset(parsed, nextFile);
      } catch (cause) {
        const err =
          cause instanceof SpreadsheetError
            ? { message: cause.message, hint: cause.hint }
            : {
                message: "Something went wrong while reading that file.",
                hint: "Try exporting as CSV and upload again.",
              };
        setError(err);
        setStatus("error");
        setProgress(0);
      }
    },
    [applyDataset],
  );

  const loadSample = useCallback(() => {
    applyDataset(getSampleDataset(), null);
  }, [applyDataset]);

  const reset = useCallback(() => {
    setDataset(null);
    setFile(null);
    setError(null);
    setStatus("idle");
    setProgress(0);
  }, []);

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Layers3 className="size-4" />
            </span>
            <div>
              <p className="font-display text-lg leading-none tracking-tight">Data Canvas</p>
              <p className="text-xs text-muted-foreground">Spreadsheet, then the picture of it</p>
            </div>
          </div>
          {dataset ? (
            <Button type="button" variant="ghost" size="sm" onClick={reset}>
              <RotateCcw />
              Start over
            </Button>
          ) : null}
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 pb-24 sm:px-6 sm:py-10">
        {!dataset ? (
          <>
            <UploadZone
              status={status}
              progress={progress}
              error={error}
              onFile={(next) => void handleFile(next)}
              onSample={loadSample}
            />
            <p className="max-w-lg text-sm text-muted-foreground">
              Nothing leaves this page — files are read in the browser. Use the sample catalog to see image URLs rendered as photographs in the table.
            </p>
          </>
        ) : (
          <>
            <UploadZone
              compact
              status={status}
              progress={progress}
              error={error}
              onFile={(next) => void handleFile(next)}
              onSample={loadSample}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Open file
                </p>
                <h1 className="font-display truncate text-3xl tracking-tight sm:text-4xl">
                  {dataset.fileName}
                </h1>
              </div>
              {dataset.sheetNames.length > 1 && file ? (
                <div className="w-full sm:w-56">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Sheet</p>
                  <Select
                    value={dataset.sheetName}
                    onValueChange={(name) => void handleFile(file, name)}
                  >
                    <SelectTrigger aria-label="Worksheet">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dataset.sheetNames.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}
            </div>

            {dataset.parseWarnings.length ? (
              <ul className="rounded-lg bg-warning/10 px-4 py-3 text-sm text-warning">
                {dataset.parseWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            ) : null}

            <SummarySection kpis={kpis} insights={insights} charts={charts} />
            <DataTable dataset={dataset} />
          </>
        )}
      </div>
    </main>
  );
}
