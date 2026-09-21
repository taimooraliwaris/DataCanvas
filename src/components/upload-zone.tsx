import { useCallback, useId, useRef, useState } from "react";
import { FileSpreadsheet, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { describeAcceptedTypes } from "@/lib/spreadsheet";

type UploadZoneProps = {
  disabled?: boolean;
  progress: number;
  status: "idle" | "reading" | "parsing" | "ready" | "error";
  error?: { message: string; hint?: string } | null;
  compact?: boolean;
  onFile: (file: File) => void;
  onSample: () => void;
};

export function UploadZone({
  disabled,
  progress,
  status,
  error,
  compact,
  onFile,
  onSample,
}: UploadZoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const busy = status === "reading" || status === "parsing";

  const take = useCallback(
    (file: File | undefined | null) => {
      if (!file || disabled || busy) return;
      onFile(file);
    },
    [busy, disabled, onFile],
  );

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setOver(false);
    take(event.dataTransfer.files[0]);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      className={cn(
        "relative rounded-xl bg-card shadow-border transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        over && "shadow-border-hover ring-2 ring-ring/40",
        compact ? "p-3 sm:p-4" : "p-5 sm:p-8",
      )}
    >
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        className="sr-only"
        accept=".csv,.xlsx,.xls,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        disabled={disabled || busy}
        onChange={(event) => {
          take(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {compact ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-md bg-muted text-foreground">
              <FileSpreadsheet className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium">Replace this sheet</p>
              <p className="text-xs text-muted-foreground">{describeAcceptedTypes()} · up to 20 MB</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={busy}>
              <Upload />
              Choose file
            </Button>
            <Button type="button" variant="ghost" onClick={onSample} disabled={busy}>
              Sample catalog
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-5">
          <span className="flex size-12 items-center justify-center rounded-lg bg-muted">
            <Upload className="size-5" />
          </span>
          <div className="max-w-xl space-y-2">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Drop a spreadsheet</h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              CSV and Excel files become a readable table, with figures and charts chosen from the columns you actually have.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <li className="rounded-full bg-muted px-3 py-1.5">.csv</li>
            <li className="rounded-full bg-muted px-3 py-1.5">.xlsx</li>
            <li className="rounded-full bg-muted px-3 py-1.5">.xls</li>
            <li className="rounded-full bg-muted px-3 py-1.5">Max 20 MB</li>
            <li className="rounded-full bg-muted px-3 py-1.5">First 50,000 rows</li>
          </ul>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" onClick={() => inputRef.current?.click()} disabled={busy}>
              <Upload />
              Choose file
            </Button>
            <Button type="button" variant="outline" onClick={onSample} disabled={busy}>
              Load sample catalog
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Picture columns and image URLs render as thumbnails, not as raw links.
          </p>
        </div>
      )}

      {busy ? (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{status === "reading" ? "Reading file…" : "Parsing rows…"}</span>
            <span className="tabular-nums">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>
      ) : null}

      {error && status === "error" ? (
        <div role="alert" className="mt-5 rounded-lg bg-destructive/8 px-4 py-3 text-sm text-destructive">
          <p className="font-medium">{error.message}</p>
          {error.hint ? <p className="mt-1 text-destructive/80">{error.hint}</p> : null}
        </div>
      ) : null}

      {over ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-card/80">
          <p className="font-display text-2xl">Drop to open</p>
        </div>
      ) : null}
    </div>
  );
}
