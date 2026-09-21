import { useMemo, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnSizingState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Filter,
  Search,
  X,
} from "lucide-react";
import { ImageCell } from "@/components/image-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, formatFullNumber, hostFromUrl, truncate } from "@/lib/utils";
import type { CellValue, Dataset, DatasetColumn } from "@/lib/spreadsheet";

function formatDate(value: Date): string {
  return value.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function CellView({ column, value }: { column: DatasetColumn; value: CellValue }) {
  if (value == null || value === "") {
    return <span className="text-muted-foreground">—</span>;
  }
  if (column.kind === "image") {
    return <ImageCell value={value} alt={column.name} />;
  }
  if (column.kind === "url" && typeof value === "string") {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="inline-flex max-w-[14rem] items-center truncate text-sm text-primary underline-offset-2 hover:underline"
      >
        {hostFromUrl(value)}
      </a>
    );
  }
  if (column.kind === "number" && typeof value === "number") {
    return <span className="tabular-nums">{formatFullNumber(value)}</span>;
  }
  if (column.kind === "date" && value instanceof Date) {
    return <span className="tabular-nums">{formatDate(value)}</span>;
  }
  if (column.kind === "boolean") {
    return (
      <Badge variant={value ? "success" : "muted"}>{value ? "Yes" : "No"}</Badge>
    );
  }
  if (column.kind === "category") {
    return <Badge variant="outline">{String(value)}</Badge>;
  }
  return <span className="block max-w-[22rem] truncate">{String(value)}</span>;
}

function defaultSize(kind: DatasetColumn["kind"]): number {
  if (kind === "image") return 120;
  if (kind === "boolean") return 110;
  if (kind === "number") return 128;
  if (kind === "date") return 148;
  return 180;
}

function ColumnFilter({
  column,
  value,
  onChange,
}: {
  column: DatasetColumn;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative inline-flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground",
            value && "text-primary",
          )}
          aria-label={`Filter ${column.name}`}
        >
          <Filter className="size-3.5" />
          {value ? <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" /> : null}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <Label htmlFor={`filter-${column.key}`}>Filter {column.name}</Label>
        <Input
          id={`filter-${column.key}`}
          className="mt-2 h-10"
          value={value}
          placeholder={column.kind === "number" ? "Contains, e.g. 12" : "Contains…"}
          onChange={(event) => onChange(event.target.value)}
        />
        {value ? (
          <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={() => onChange("")}>
            Clear
          </Button>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

export function DataTable({ dataset }: { dataset: Dataset }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const columns = useMemo<ColumnDef<Record<string, CellValue>>[]>(() => {
    return dataset.columns.map((col) => ({
      id: col.key,
      accessorKey: col.key,
      header: col.name,
      size: defaultSize(col.kind),
      minSize: col.kind === "image" ? 88 : 72,
      maxSize: 480,
      enableResizing: true,
      sortingFn: (a, b, id) => {
        const av = a.getValue(id);
        const bv = b.getValue(id);
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === "number" && typeof bv === "number") return av - bv;
        if (av instanceof Date && bv instanceof Date) return av.getTime() - bv.getTime();
        return String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: "base" });
      },
      filterFn: (row, id, filterValue) => {
        const q = String(filterValue ?? "").trim().toLowerCase();
        if (!q) return true;
        const cell = row.getValue(id);
        if (cell == null) return false;
        if (cell instanceof Date) return formatDate(cell).toLowerCase().includes(q);
        return String(cell).toLowerCase().includes(q);
      },
      cell: ({ getValue }) => <CellView column={col} value={getValue() as CellValue} />,
    }));
  }, [dataset.columns]);

  const table = useReactTable({
    data: dataset.rows,
    columns,
    state: { sorting, columnFilters, globalFilter, columnVisibility, columnSizing, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: setPagination,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const q = String(filterValue ?? "").trim().toLowerCase();
      if (!q) return true;
      return row.getAllCells().some((cell) => {
        const value = cell.getValue();
        if (value == null) return false;
        if (value instanceof Date) return formatDate(value).toLowerCase().includes(q);
        return String(value).toLowerCase().includes(q);
      });
    },
  });

  const filtered = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const colMeta = (id: string) => dataset.columns.find((c) => c.key === id);

  return (
    <section className="rounded-xl bg-card shadow-border" aria-label="Data table">
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl tracking-tight">Table</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.toLocaleString()} of {dataset.rowCount.toLocaleString()} rows
            {globalFilter ? ` matching “${truncate(globalFilter, 24)}”` : ""}
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={globalFilter}
              onChange={(event) => {
                setGlobalFilter(event.target.value);
                setPagination((p) => ({ ...p, pageIndex: 0 }));
              }}
              placeholder="Search all columns"
              className="h-11 pl-9"
              aria-label="Search table"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline">
                <Columns3 />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-72 overflow-y-auto">
              <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table.getAllLeafColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(checked) => column.toggleVisibility(Boolean(checked))}
                >
                  {colMeta(column.id)?.name ?? column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {columnFilters.length > 0 || globalFilter ? (
        <div className="flex flex-wrap items-center gap-2 px-4 pb-3">
          {globalFilter ? (
            <Badge variant="outline" className="gap-1 pr-1">
              Search: {truncate(globalFilter, 20)}
              <button type="button" className="rounded-full p-1" onClick={() => setGlobalFilter("")} aria-label="Clear search">
                <X className="size-3" />
              </button>
            </Badge>
          ) : null}
          {columnFilters.map((filter) => (
            <Badge key={filter.id} variant="outline" className="gap-1 pr-1">
              {colMeta(filter.id)?.name}: {String(filter.value)}
              <button
                type="button"
                className="rounded-full p-1"
                onClick={() =>
                  setColumnFilters((current) => current.filter((item) => item.id !== filter.id))
                }
                aria-label={`Clear ${filter.id} filter`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="overflow-x-auto border-t border-border">
        <div className="max-h-[min(70vh,720px)] overflow-auto">
          <table
            className="min-w-full border-separate border-spacing-0 text-sm"
            style={{ width: table.getCenterTotalSize() }}
          >
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                  {group.headers.map((header) => {
                    const sorted = header.column.getIsSorted();
                    const meta = colMeta(header.column.id);
                    const filterValue =
                      (header.column.getFilterValue() as string | undefined) ?? "";
                    return (
                      <th
                        key={header.id}
                        className="relative border-b border-border bg-muted/95 px-2 py-2 text-left font-medium backdrop-blur-sm"
                        style={{ width: header.getSize() }}
                      >
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            className="inline-flex min-h-8 min-w-0 flex-1 items-center gap-1 rounded-sm px-1 text-left hover:bg-background/60"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span className="truncate">{flexRender(header.column.columnDef.header, header.getContext())}</span>
                            {sorted === "asc" ? (
                              <ArrowUp className="size-3.5 shrink-0" />
                            ) : sorted === "desc" ? (
                              <ArrowDown className="size-3.5 shrink-0" />
                            ) : (
                              <ArrowUpDown className="size-3.5 shrink-0 opacity-40" />
                            )}
                          </button>
                          {meta ? (
                            <ColumnFilter
                              column={meta}
                              value={filterValue}
                              onChange={(next) => {
                                header.column.setFilterValue(next || undefined);
                                setPagination((p) => ({ ...p, pageIndex: 0 }));
                              }}
                            />
                          ) : null}
                        </div>
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            "absolute top-0 right-0 h-full w-1.5 cursor-col-resize touch-none select-none",
                            header.column.getIsResizing() ? "bg-primary/40" : "hover:bg-primary/25",
                          )}
                        />
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-16 text-center text-sm text-muted-foreground">
                    No rows match the current filters.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border-b border-border px-3 py-2 align-middle"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page</span>
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(value) => setPagination({ pageIndex: 0, pageSize: Number(value) })}
          >
            <SelectTrigger className="h-11 w-[5.5rem]" aria-label="Rows per page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <p className="text-sm text-muted-foreground tabular-nums">
            Page {pageCount === 0 ? 0 : pagination.pageIndex + 1} of {pageCount}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Previous page"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Next page"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
