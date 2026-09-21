import Papa from "papaparse";
import {
  extractImageUrls,
  isImageColumnName,
  isLikelyImageUrl,
  looksLikeGenericUrl,
  looksLikeHttpUrl,
} from "@/lib/image-url";

export type CellValue = string | number | boolean | Date | null;

export type ColumnKind =
  | "number"
  | "date"
  | "boolean"
  | "image"
  | "url"
  | "category"
  | "text";

export type DatasetColumn = {
  key: string;
  name: string;
  kind: ColumnKind;
  uniqueCount: number;
  nullCount: number;
  min?: number;
  max?: number;
  sum?: number;
  mean?: number;
};

export type Dataset = {
  fileName: string;
  sheetName?: string;
  sheetNames: string[];
  columns: DatasetColumn[];
  rows: Record<string, CellValue>[];
  rowCount: number;
  parseWarnings: string[];
};

export class SpreadsheetError extends Error {
  hint?: string;
  constructor(message: string, hint?: string) {
    super(message);
    this.name = "SpreadsheetError";
    this.hint = hint;
  }
}

const ACCEPTED_EXT = [".csv", ".xlsx", ".xls"];
const MAX_BYTES = 20 * 1024 * 1024;
const MAX_ROWS = 50_000;

export function isAcceptedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXT.some((ext) => name.endsWith(ext));
}

export function describeAcceptedTypes(): string {
  return "CSV or Excel (.csv, .xlsx, .xls)";
}

function readFile(
  file: File,
  as: "text" | "array",
  onProgress: (pct: number) => void,
): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable && event.total > 0) {
        onProgress(Math.round((event.loaded / event.total) * 78));
      }
    };
    reader.onload = () => {
      onProgress(82);
      if (reader.result == null) {
        reject(
          new SpreadsheetError(
            "The file arrived empty.",
            "Try exporting it again, then drop the new copy here.",
          ),
        );
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () =>
      reject(
        new SpreadsheetError(
          "The browser couldn't read that file.",
          "Download it again and re-upload. If it is open in Excel, close it first.",
        ),
      );
    if (as === "text") reader.readAsText(file);
    else reader.readAsArrayBuffer(file);
  });
}

function uniqueColumnName(name: string, used: Set<string>): string {
  const base = name.trim() || "Column";
  if (!used.has(base)) {
    used.add(base);
    return base;
  }
  let i = 2;
  while (used.has(`${base} ${i}`)) i += 1;
  const next = `${base} ${i}`;
  used.add(next);
  return next;
}

function normalizeCell(value: unknown): CellValue {
  if (value == null) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed || trimmed === "-" || trimmed === "—") return null;
    return trimmed;
  }
  if (typeof value === "object") return String(value);
  return null;
}

function asBoolean(value: CellValue): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
    return null;
  }
  if (typeof value !== "string") return null;
  const s = value.trim().toLowerCase();
  if (["true", "yes", "y", "1"].includes(s)) return true;
  if (["false", "no", "n", "0"].includes(s)) return false;
  return null;
}

function asNumber(value: CellValue): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[,$%\s]/g, "");
  if (!cleaned || cleaned === "-" || cleaned === ".") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function asDate(value: CellValue): Date | null {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "number" && value > 20000 && value < 80000) {
    // Excel serial leftover
    const utc = Date.UTC(1899, 11, 30) + value * 86400000;
    const d = new Date(utc);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value !== "string") return null;
  if (!/^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(value) && !/^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(value)) {
    return null;
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function ratio(hits: number, total: number): number {
  if (total === 0) return 0;
  return hits / total;
}

export function inferKind(name: string, values: CellValue[]): ColumnKind {
  const nonNull = values.filter((v) => v !== null);
  if (nonNull.length === 0) return "text";

  const namedImage = isImageColumnName(name);
  const imageHits = nonNull.filter((v) => extractImageUrls(v).length > 0).length;
  const httpHits = nonNull.filter((v) => typeof v === "string" && looksLikeHttpUrl(v)).length;

  if (namedImage && ratio(httpHits, nonNull.length) >= 0.4) return "image";
  if (ratio(imageHits, nonNull.length) >= 0.45) return "image";

  const urlHits = nonNull.filter((v) => looksLikeGenericUrl(v) || (typeof v === "string" && looksLikeHttpUrl(v) && !isLikelyImageUrl(v))).length;
  if (ratio(urlHits, nonNull.length) >= 0.6) return "url";

  const boolHits = nonNull.filter((v) => asBoolean(v) !== null).length;
  if (ratio(boolHits, nonNull.length) >= 0.85) return "boolean";

  const numHits = nonNull.filter((v) => asNumber(v) !== null).length;
  if (ratio(numHits, nonNull.length) >= 0.8) return "number";

  const dateHits = nonNull.filter((v) => asDate(v) !== null).length;
  if (ratio(dateHits, nonNull.length) >= 0.7) return "date";

  const unique = new Set(nonNull.map((v) => String(v).toLowerCase())).size;
  if (unique > 1 && unique <= Math.min(24, Math.max(3, Math.floor(nonNull.length * 0.35)))) {
    return "category";
  }
  return "text";
}

function coerce(kind: ColumnKind, value: CellValue): CellValue {
  if (value == null) return null;
  if (kind === "number") return asNumber(value);
  if (kind === "boolean") return asBoolean(value);
  if (kind === "date") return asDate(value);
  if (kind === "image" || kind === "url" || kind === "text" || kind === "category") {
    return typeof value === "string" ? value : String(value);
  }
  return value;
}

export function buildDataset(
  fileName: string,
  rawRows: Record<string, unknown>[],
  options?: { sheetName?: string; sheetNames?: string[]; warnings?: string[] },
): Dataset {
  if (rawRows.length === 0) {
    throw new SpreadsheetError(
      "No data rows were found.",
      "Use the first row for column names and include at least one row of values.",
    );
  }

  const used = new Set<string>();
  const originalKeys = Object.keys(rawRows[0] ?? {});
  if (originalKeys.length === 0) {
    throw new SpreadsheetError(
      "This sheet has no columns.",
      "Add a header row, or export the used range rather than a blank workbook.",
    );
  }

  const keyMap = new Map<string, string>();
  for (const key of originalKeys) {
    keyMap.set(key, uniqueColumnName(String(key || "Column"), used));
  }

  let rows: Record<string, CellValue>[] = rawRows.map((row) => {
    const next: Record<string, CellValue> = {};
    for (const [from, to] of keyMap) {
      next[to] = normalizeCell(row[from]);
    }
    return next;
  });

  const names = [...keyMap.values()];
  const emptyCols = names.filter((name) => rows.every((row) => row[name] == null));
  const keep = names.filter((name) => !emptyCols.includes(name));
  if (keep.length === 0) {
    throw new SpreadsheetError(
      "Every column is empty.",
      "Check that you exported the correct sheet, not a cover tab.",
    );
  }

  rows = rows
    .map((row) => {
      const next: Record<string, CellValue> = {};
      for (const name of keep) next[name] = row[name] ?? null;
      return next;
    })
    .filter((row) => keep.some((name) => row[name] != null));

  if (rows.length === 0) {
    throw new SpreadsheetError(
      "No data rows were found.",
      "The header parsed, but every following row was blank.",
    );
  }

  const warnings = [...(options?.warnings ?? [])];
  if (emptyCols.length) {
    warnings.push(`Ignored ${emptyCols.length} empty column${emptyCols.length === 1 ? "" : "s"}.`);
  }
  if (rows.length > MAX_ROWS) {
    warnings.push(`Showing the first ${MAX_ROWS.toLocaleString()} of ${rows.length.toLocaleString()} rows.`);
    rows = rows.slice(0, MAX_ROWS);
  }

  const columns: DatasetColumn[] = keep.map((name) => {
    const values = rows.map((row) => row[name] ?? null);
    const kind = inferKind(name, values);
    const coerced = values.map((v) => coerce(kind, v));
    for (let i = 0; i < rows.length; i += 1) {
      rows[i]![name] = coerced[i] ?? null;
    }
    const nonNull = coerced.filter((v) => v !== null);
    const nums = kind === "number" ? nonNull.filter((v): v is number => typeof v === "number") : [];
    const uniqueCount = new Set(nonNull.map((v) => String(v))).size;
    const col: DatasetColumn = {
      key: name,
      name,
      kind,
      uniqueCount,
      nullCount: coerced.length - nonNull.length,
    };
    if (nums.length) {
      col.min = Math.min(...nums);
      col.max = Math.max(...nums);
      col.sum = nums.reduce((a, b) => a + b, 0);
      col.mean = col.sum / nums.length;
    }
    return col;
  });

  return {
    fileName,
    sheetName: options?.sheetName,
    sheetNames: options?.sheetNames ?? [],
    columns,
    rows,
    rowCount: rows.length,
    parseWarnings: warnings,
  };
}

function parseCsvText(text: string, fileName: string): Dataset {
  const result = Papa.parse<Record<string, unknown>>(text, {
    header: true,
    skipEmptyLines: "greedy",
    dynamicTyping: true,
    transformHeader: (header, index) => header.trim() || `Column ${index + 1}`,
  });

  const fatal = result.errors.filter((err) => err.type === "Delimiter" || err.code === "MissingQuotes");
  const warnings: string[] = [];
  if (result.errors.length && result.data.length) {
    const first = result.errors[0];
    warnings.push(
      `Parsed with ${result.errors.length} warning${result.errors.length === 1 ? "" : "s"}${first?.row != null ? ` (first at row ${first.row + 1})` : ""}.`,
    );
  }
  if (fatal.length && result.data.length === 0) {
    const first = fatal[0];
    throw new SpreadsheetError(
      first?.message || "This CSV could not be parsed.",
      first?.row != null
        ? `Check quoting around row ${first.row + 1}. Commas inside fields need to be wrapped in quotes.`
        : "Open the file in a text editor and confirm commas separate columns.",
    );
  }
  if (!result.meta.fields?.length) {
    throw new SpreadsheetError(
      "No header row detected.",
      "The first line should list column names, separated by commas.",
    );
  }

  return buildDataset(fileName, result.data, { warnings });
}

async function parseExcelBuffer(
  buffer: ArrayBuffer,
  fileName: string,
  sheetName?: string,
): Promise<Dataset> {
  const XLSX = await import("xlsx");
  let workbook: import("xlsx").WorkBook;
  try {
    workbook = XLSX.read(buffer, { type: "array", cellDates: true, raw: true });
  } catch {
    throw new SpreadsheetError(
      "We couldn't open this workbook.",
      "It may be password-protected, corrupt, or not a real .xlsx/.xls file. Try exporting again as .xlsx or CSV.",
    );
  }

  const sheetNames = workbook.SheetNames.filter(Boolean);
  if (sheetNames.length === 0) {
    throw new SpreadsheetError(
      "This workbook has no sheets.",
      "Add a worksheet with a header row, or export a CSV instead.",
    );
  }

  const chosen = sheetName && sheetNames.includes(sheetName) ? sheetName : sheetNames[0]!;
  const sheet = workbook.Sheets[chosen];
  if (!sheet) {
    throw new SpreadsheetError(
      `Sheet “${chosen}” is missing.`,
      "Pick another tab from the sheet list.",
    );
  }

  const ref = sheet["!ref"];
  if (!ref) {
    throw new SpreadsheetError(
      `Sheet “${chosen}” is empty.`,
      sheetNames.length > 1
        ? "Try another tab — this one has no used cells."
        : "Put column names in the first row and values beneath them.",
    );
  }

  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: null,
    raw: true,
    blankrows: false,
  });

  return buildDataset(fileName, json, { sheetName: chosen, sheetNames });
}

export async function parseSpreadsheet(
  file: File,
  onProgress: (pct: number) => void,
  sheetName?: string,
): Promise<Dataset> {
  if (!file || file.size === 0) {
    throw new SpreadsheetError(
      "That file is empty.",
      "Export the sheet again and make sure it contains rows of data.",
    );
  }
  if (file.size > MAX_BYTES) {
    throw new SpreadsheetError(
      "This file is larger than 20 MB.",
      "Export a smaller range, or save a CSV of the used columns only.",
    );
  }
  if (!isAcceptedFile(file)) {
    throw new SpreadsheetError(
      "That file type isn’t supported.",
      `Upload a ${describeAcceptedTypes()} file.`,
    );
  }

  onProgress(4);
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".csv")) {
    const text = (await readFile(file, "text", onProgress)) as string;
    onProgress(90);
    const dataset = parseCsvText(text, file.name);
    onProgress(100);
    return dataset;
  }

  const buffer = (await readFile(file, "array", onProgress)) as ArrayBuffer;
  onProgress(88);
  const dataset = await parseExcelBuffer(buffer, file.name, sheetName);
  onProgress(100);
  return dataset;
}

export async function parseSpreadsheetSheet(
  file: File,
  sheetName: string,
  onProgress: (pct: number) => void,
): Promise<Dataset> {
  return parseSpreadsheet(file, onProgress, sheetName);
}

export function numericValues(dataset: Dataset, key: string): number[] {
  return dataset.rows
    .map((row) => row[key])
    .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
}

export function dateValues(dataset: Dataset, key: string): Date[] {
  return dataset.rows
    .map((row) => row[key])
    .filter((v): v is Date => v instanceof Date && !Number.isNaN(v.getTime()));
}

export function completeness(dataset: Dataset): number {
  const total = dataset.rowCount * dataset.columns.length;
  if (total === 0) return 0;
  const filled = dataset.rows.reduce((sum, row) => {
    return sum + dataset.columns.filter((col) => row[col.key] != null).length;
  }, 0);
  return filled / total;
}
