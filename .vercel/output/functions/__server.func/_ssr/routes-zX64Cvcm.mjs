import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as ArrowUp, a as RotateCcw, c as Funnel, d as Columns3, f as ChevronRight, g as ChartColumn, h as Check, i as Search, l as FileSpreadsheet, m as ChevronDown, n as Upload, o as Layers, p as ChevronLeft, s as ImageOff, t as X, u as ExternalLink, v as ArrowUpDown, y as ArrowDown } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Portal2, c as Trigger, i as Label2, n as Content2, o as Root2, r as ItemIndicator2, s as Separator2, t as CheckboxItem2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as getPaginationRowModel, i as getFilteredRowModel, n as useReactTable, o as getSortedRowModel, r as getCoreRowModel, t as flexRender } from "../_libs/@tanstack/react-table+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { i as Trigger$1, n as Portal, r as Root2$1, t as Content2$1 } from "../_libs/radix-ui__react-popover.mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
import { n as Root$1, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { t as require_papaparse } from "../_libs/papaparse.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-zX64Cvcm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_papaparse = /* @__PURE__ */ __toESM(require_papaparse());
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatNumber(value, digits = 1) {
	if (!Number.isFinite(value)) return "—";
	const abs = Math.abs(value);
	if (abs >= 1e9) return `${(value / 1e9).toFixed(digits)}B`;
	if (abs >= 1e6) return `${(value / 1e6).toFixed(digits)}M`;
	if (abs >= 1e4) return `${(value / 1e3).toFixed(digits)}K`;
	if (Number.isInteger(value)) return value.toLocaleString();
	return value.toLocaleString(void 0, { maximumFractionDigits: 2 });
}
function formatFullNumber(value) {
	if (!Number.isFinite(value)) return "—";
	return value.toLocaleString(void 0, { maximumFractionDigits: 2 });
}
function formatPercent(value) {
	if (!Number.isFinite(value)) return "—";
	return `${Math.round(value * 100)}%`;
}
function truncate(text, max = 42) {
	if (text.length <= max) return text;
	return `${text.slice(0, max - 1)}…`;
}
function hostFromUrl(url) {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
}
var IMAGE_EXT = /\.(png|jpe?g|jpe|gif|webp|svg|avif|bmp|ico|tif|tiff|heic|heif)(?:[?#].*)?$/i;
var IMAGE_HOST = /(picsum\.photos|images\.unsplash|plus\.unsplash|unsplash\.com\/(?:photo|s\/)|source\.unsplash|cloudinary\.com|res\.cloudinary|imgur\.com|i\.imgur|googleusercontent\.com|lh3\.googleusercontent|twimg\.com|pbs\.twimg|media\.githubusercontent|raw\.githubusercontent|staticflickr|live\.staticflickr|placehold\.co|placeholder\.com|placekitten|loremflickr|gravatar\.com|wp\.com\/|shopify\.com|imgix\.net|cloudfront\.net|images\.pexels|cdninstagram|fbcdn\.net|ytimg\.com|ggpht\.com|pinimg\.com|wikimedia\.org|upload\.wikimedia)/i;
var IMAGE_COL_NAME = /^(photo|photos|image|images|img|thumbnail|thumb|thumbs|avatar|picture|pictures|pic|cover|logo|icon|artwork|banner|hero|preview|snapshot|shot|media|asset)$/i;
var IMAGE_COL_HINT = /(photo|image|img|thumb|avatar|picture|pic|cover|logo|icon|artwork|banner)/i;
function looksLikeHttpUrl(value) {
	return /^https?:\/\/\S+$/i.test(value.trim());
}
function extractImageUrls(value) {
	if (value == null) return [];
	const text = String(value).trim();
	if (!text) return [];
	const formula = text.match(/^=IMAGE\(\s*["']([^"']+)["']/i);
	if (formula?.[1]) return [formula[1]];
	const markdown = [...text.matchAll(/!\[[^\]]*]\((https?:\/\/[^)\s]+)\)/gi)].map((m) => m[1]);
	if (markdown.length) return markdown;
	const html = [...text.matchAll(/src=["'](https?:\/\/[^"']+)["']/gi)].map((m) => m[1]);
	if (html.length) return html;
	const urls = text.split(/[\s,;|]+/).map((part) => part.trim()).filter(Boolean).filter((part) => isLikelyImageUrl(part));
	if (urls.length) return urls;
	if (isLikelyImageUrl(text)) return [text];
	return [];
}
function isLikelyImageUrl(value) {
	const raw = value.trim();
	if (!raw) return false;
	if (/^data:image\//i.test(raw)) return true;
	if (!/^https?:\/\//i.test(raw)) return false;
	if (IMAGE_EXT.test(raw)) return true;
	try {
		const url = new URL(raw);
		if (IMAGE_HOST.test(url.hostname + url.pathname)) return true;
		if (/[?&](?:format|fm|auto)=(?:jpg|jpeg|png|webp|gif|avif)/i.test(url.search)) return true;
	} catch {
		return false;
	}
	return false;
}
function isImageColumnName(name) {
	const compact = name.trim();
	if (IMAGE_COL_NAME.test(compact)) return true;
	return IMAGE_COL_HINT.test(compact.replace(/[^a-z0-9]+/gi, " "));
}
function looksLikeGenericUrl(value) {
	if (typeof value !== "string") return false;
	return looksLikeHttpUrl(value) && extractImageUrls(value).length === 0;
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-[min(100%-2rem,40rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-card p-5 text-card-foreground shadow-border-hover duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 rounded-sm p-2 text-muted-foreground transition-opacity hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl leading-snug tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function Thumb({ url, alt, onOpen }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: url,
		target: "_blank",
		rel: "noreferrer",
		className: "inline-flex max-w-40 items-center gap-1 truncate text-xs text-primary underline-offset-2 hover:underline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { className: "size-3.5 shrink-0" }), hostFromUrl(url)]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: onOpen,
		className: "group relative size-11 overflow-hidden rounded-sm bg-muted transition-[transform,box-shadow] duration-150 ease-out hover:shadow-border-hover",
		"aria-label": `Preview ${alt}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt,
			loading: "lazy",
			referrerPolicy: "no-referrer",
			className: "size-full object-cover",
			onError: () => setFailed(true)
		})
	});
}
function ImageCell({ value, alt }) {
	const urls = extractImageUrls(value);
	const [active, setActive] = (0, import_react.useState)(null);
	if (urls.length === 0) {
		if (value == null || value === "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: "—"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: String(value)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap items-center gap-1.5 py-0.5",
		children: urls.map((url) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			url,
			alt,
			onOpen: () => setActive(url)
		}, url))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(active),
		onOpenChange: (open) => !open && setActive(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "px-5 pt-5 pr-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "truncate",
					children: alt
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "truncate",
					children: active ? hostFromUrl(active) : ""
				})]
			}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-muted px-5 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: active,
					alt,
					className: "mx-auto max-h-[60vh] w-full rounded-md object-contain",
					referrerPolicy: "no-referrer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: active,
					target: "_blank",
					rel: "noreferrer",
					className: "mt-3 inline-flex h-11 items-center gap-2 text-sm text-primary",
					children: ["Open original", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
				})]
			}) : null]
		})
	})] });
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground",
		muted: "bg-muted text-muted-foreground",
		outline: "shadow-border text-foreground",
		success: "bg-success/12 text-success",
		warning: "bg-warning/12 text-warning"
	} },
	defaultVariants: { variant: "muted" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,box-shadow,color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-border hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			outline: "bg-card text-foreground shadow-border hover:shadow-border-hover",
			ghost: "text-foreground hover:bg-muted",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 px-4 pr-3.5",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-border-hover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
		className: cn("relative flex cursor-pointer items-center rounded-sm py-2 pr-2 pl-8 text-sm outline-none select-none focus:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", className),
		checked,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute left-2 flex size-4 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) })
		}), children]
	});
}
function DropdownMenuLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		className: cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-card px-3 text-sm text-foreground shadow-border transition-[box-shadow] duration-150 ease-out placeholder:text-muted-foreground/80 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:shadow-border-hover disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium text-muted-foreground", className),
		...props
	});
}
var Popover = Root2$1;
var PopoverTrigger = Trigger$1;
function PopoverContent({ className, align = "start", sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		align,
		sideOffset,
		className: cn("z-50 w-64 rounded-lg bg-popover p-3 text-popover-foreground shadow-border-hover outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	}) });
}
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-md bg-card px-3 text-sm shadow-border transition-[box-shadow] duration-150 ease-out data-placeholder:text-muted-foreground [&>span]:line-clamp-1", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted-foreground" })
		})]
	});
}
function SelectContent({ className, children, position = "popper", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		className: cn("relative z-50 max-h-72 min-w-32 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-border-hover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", position === "popper" && "data-[side=bottom]:translate-y-1", className),
		position,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "p-1",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex w-full cursor-pointer items-center rounded-sm py-2 pr-8 pl-2 text-sm outline-none select-none focus:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute right-2 flex size-4 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
	});
}
function formatDate(value) {
	return value.toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
}
function CellView({ column, value }) {
	if (value == null || value === "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "—"
	});
	if (column.kind === "image") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCell, {
		value,
		alt: column.name
	});
	if (column.kind === "url" && typeof value === "string") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: value,
		target: "_blank",
		rel: "noreferrer",
		className: "inline-flex max-w-[14rem] items-center truncate text-sm text-primary underline-offset-2 hover:underline",
		children: hostFromUrl(value)
	});
	if (column.kind === "number" && typeof value === "number") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: formatFullNumber(value)
	});
	if (column.kind === "date" && value instanceof Date) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "tabular-nums",
		children: formatDate(value)
	});
	if (column.kind === "boolean") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: value ? "success" : "muted",
		children: value ? "Yes" : "No"
	});
	if (column.kind === "category") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		children: String(value)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block max-w-[22rem] truncate",
		children: String(value)
	});
}
function defaultSize(kind) {
	if (kind === "image") return 108;
	if (kind === "boolean") return 110;
	if (kind === "number") return 128;
	if (kind === "date") return 148;
	return 180;
}
function ColumnFilter({ column, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: cn("relative inline-flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground", value && "text-primary"),
			"aria-label": `Filter ${column.name}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-3.5" }), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" }) : null]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
			htmlFor: `filter-${column.key}`,
			children: ["Filter ", column.name]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: `filter-${column.key}`,
			className: "mt-2 h-10",
			value,
			placeholder: column.kind === "number" ? "Contains, e.g. 12" : "Contains…",
			onChange: (event) => onChange(event.target.value)
		}),
		value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "sm",
			className: "mt-2",
			onClick: () => onChange(""),
			children: "Clear"
		}) : null
	] })] });
}
function DataTable({ dataset }) {
	const [sorting, setSorting] = (0, import_react.useState)([]);
	const [columnFilters, setColumnFilters] = (0, import_react.useState)([]);
	const [globalFilter, setGlobalFilter] = (0, import_react.useState)("");
	const [columnVisibility, setColumnVisibility] = (0, import_react.useState)({});
	const [columnSizing, setColumnSizing] = (0, import_react.useState)({});
	const [pagination, setPagination] = (0, import_react.useState)({
		pageIndex: 0,
		pageSize: 10
	});
	const columns = (0, import_react.useMemo)(() => {
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
				return String(av).localeCompare(String(bv), void 0, {
					numeric: true,
					sensitivity: "base"
				});
			},
			filterFn: (row, id, filterValue) => {
				const q = String(filterValue ?? "").trim().toLowerCase();
				if (!q) return true;
				const cell = row.getValue(id);
				if (cell == null) return false;
				if (cell instanceof Date) return formatDate(cell).toLowerCase().includes(q);
				return String(cell).toLowerCase().includes(q);
			},
			cell: ({ getValue }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellView, {
				column: col,
				value: getValue()
			})
		}));
	}, [dataset.columns]);
	const table = useReactTable({
		data: dataset.rows,
		columns,
		state: {
			sorting,
			columnFilters,
			globalFilter,
			columnVisibility,
			columnSizing,
			pagination
		},
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
		}
	});
	const filtered = table.getFilteredRowModel().rows.length;
	const pageCount = table.getPageCount();
	const colMeta = (id) => dataset.columns.find((c) => c.key === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card shadow-border",
		"aria-label": "Data table",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Table"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						filtered.toLocaleString(),
						" of ",
						dataset.rowCount.toLocaleString(),
						" rows",
						globalFilter ? ` matching “${truncate(globalFilter, 24)}”` : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0 flex-1 sm:w-64",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: globalFilter,
							onChange: (event) => {
								setGlobalFilter(event.target.value);
								setPagination((p) => ({
									...p,
									pageIndex: 0
								}));
							},
							placeholder: "Search all columns",
							className: "h-11 pl-9",
							"aria-label": "Search table"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns3, {}), "Columns"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						className: "max-h-72 overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Visible columns" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							table.getAllLeafColumns().map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuCheckboxItem, {
								checked: column.getIsVisible(),
								onCheckedChange: (checked) => column.toggleVisibility(Boolean(checked)),
								children: colMeta(column.id)?.name ?? column.id
							}, column.id))
						]
					})] })]
				})]
			}),
			columnFilters.length > 0 || globalFilter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 px-4 pb-3",
				children: [globalFilter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "gap-1 pr-1",
					children: [
						"Search: ",
						truncate(globalFilter, 20),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-full p-1",
							onClick: () => setGlobalFilter(""),
							"aria-label": "Clear search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
						})
					]
				}) : null, columnFilters.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "gap-1 pr-1",
					children: [
						colMeta(filter.id)?.name,
						": ",
						String(filter.value),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-full p-1",
							onClick: () => setColumnFilters((current) => current.filter((item) => item.id !== filter.id)),
							"aria-label": `Clear ${filter.id} filter`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
						})
					]
				}, filter.id))]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[min(70vh,720px)] overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "min-w-full border-separate border-spacing-0 text-sm",
						style: { width: table.getCenterTotalSize() },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "sticky top-0 z-10",
							children: table.getHeaderGroups().map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: group.headers.map((header) => {
								const sorted = header.column.getIsSorted();
								const meta = colMeta(header.column.id);
								const filterValue = header.column.getFilterValue() ?? "";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "relative border-b border-border bg-muted/95 px-2 py-2 text-left font-medium backdrop-blur-sm",
									style: { width: header.getSize() },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "inline-flex min-h-8 min-w-0 flex-1 items-center gap-1 rounded-sm px-1 text-left hover:bg-background/60",
											onClick: header.column.getToggleSortingHandler(),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: flexRender(header.column.columnDef.header, header.getContext())
											}), sorted === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3.5 shrink-0" }) : sorted === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3.5 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-3.5 shrink-0 opacity-40" })]
										}), meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColumnFilter, {
											column: meta,
											value: filterValue,
											onChange: (next) => {
												header.column.setFilterValue(next || void 0);
												setPagination((p) => ({
													...p,
													pageIndex: 0
												}));
											}
										}) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										onMouseDown: header.getResizeHandler(),
										onTouchStart: header.getResizeHandler(),
										className: cn("absolute top-0 right-0 h-full w-1.5 cursor-col-resize touch-none select-none", header.column.getIsResizing() ? "bg-primary/40" : "hover:bg-primary/25")
									})]
								}, header.id);
							}) }, group.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: columns.length,
							className: "px-4 py-16 text-center text-sm text-muted-foreground",
							children: "No rows match the current filters."
						}) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "hover:bg-muted/50",
							children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "border-b border-border px-3 py-2 align-middle",
								style: { width: cell.column.getSize() },
								children: flexRender(cell.column.columnDef.cell, cell.getContext())
							}, cell.id))
						}, row.id)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rows per page" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: String(pagination.pageSize),
						onValueChange: (value) => setPagination({
							pageIndex: 0,
							pageSize: Number(value)
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-11 w-[5.5rem]",
							"aria-label": "Rows per page",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
							10,
							25,
							50,
							100
						].map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: String(size),
							children: size
						}, size)) })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 sm:justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground tabular-nums",
						children: [
							"Page ",
							pageCount === 0 ? 0 : pagination.pageIndex + 1,
							" of ",
							pageCount
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "icon",
							onClick: () => table.previousPage(),
							disabled: !table.getCanPreviousPage(),
							"aria-label": "Previous page",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "icon",
							onClick: () => table.nextPage(),
							disabled: !table.getCanNextPage(),
							"aria-label": "Next page",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
						})]
					})]
				})]
			})
		]
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-card text-card-foreground shadow-border", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 p-5 pb-0", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-xl leading-snug tracking-tight", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5", className),
		...props
	});
}
var PALETTE = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)"
];
function ChartTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	const row = payload[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: label || row?.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "tabular-nums opacity-90",
			children: formatNumber(Number(row?.value ?? 0))
		})]
	});
}
function ChartBody({ spec }) {
	if (spec.type === "pie") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: 220,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
			data: spec.data,
			dataKey: "value",
			nameKey: "name",
			innerRadius: 52,
			outerRadius: 80,
			paddingAngle: 2,
			stroke: "var(--color-card)",
			children: spec.data.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PALETTE[index % PALETTE.length] }, entry.name))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {}) })] })
	});
	if (spec.type === "line" || spec.type === "area") {
		const Chart = spec.type === "area" ? AreaChart : LineChart;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: 220,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chart, {
				data: spec.data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: {
							fill: "var(--color-muted-foreground)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						interval: "preserveStartEnd"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-muted-foreground)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						width: 40,
						tickFormatter: (v) => formatNumber(v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {}) }),
					spec.type === "area" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "value",
						stroke: "var(--color-chart-1)",
						fill: "var(--color-chart-1)",
						fillOpacity: .12,
						strokeWidth: 2
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "value",
						stroke: "var(--color-chart-1)",
						strokeWidth: 2,
						dot: false
					})
				]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: 220,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: spec.data,
			margin: {
				top: 8,
				right: 8,
				left: 0,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					stroke: "var(--color-border)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "name",
					tick: {
						fill: "var(--color-muted-foreground)",
						fontSize: 11
					},
					axisLine: false,
					tickLine: false,
					interval: 0,
					height: 48,
					tickFormatter: (value) => value.length > 12 ? `${value.slice(0, 11)}…` : value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tick: {
						fill: "var(--color-muted-foreground)",
						fontSize: 11
					},
					axisLine: false,
					tickLine: false,
					width: 40,
					tickFormatter: (v) => formatNumber(v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "value",
					radius: [
						6,
						6,
						0,
						0
					],
					maxBarSize: 48,
					children: spec.data.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PALETTE[index % PALETTE.length] }, entry.name))
				})
			]
		})
	});
}
function ChartGrid({ charts }) {
	if (charts.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "flex flex-col items-start gap-3 p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-11 items-center justify-center rounded-md bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-xl tracking-tight",
			children: "No chartable columns yet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-lg text-sm text-muted-foreground",
			children: "This sheet is mostly free text. Add a numeric, date, or short category column and charts will appear here automatically."
		})] })]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 lg:grid-cols-2",
		children: charts.map((chart) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: chart.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: chart.subtitle })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "pt-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBody, { spec: chart }), chart.type === "pie" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground",
					children: chart.data.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2 rounded-full",
							style: { background: PALETTE[index % PALETTE.length] }
						}), row.name]
					}, row.name))
				}) : null]
			})]
		}, chart.id))
	});
}
function SummarySection({ kpis, insights, charts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-4",
		"aria-label": "Dataset summary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: kpis.map((kpi, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-lg p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "p-4 pb-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							className: "text-xs tracking-wide uppercase",
							children: kpi.label
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4 pt-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tracking-tight tabular-nums sm:text-4xl",
							style: { animationDelay: `${index * 40}ms` },
							children: kpi.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 truncate text-xs text-muted-foreground",
							children: kpi.hint
						})]
					})]
				}, kpi.label))
			}),
			insights.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "What stands out" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "A short reading of the columns, not a dump of every cell." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid gap-4 sm:grid-cols-2",
				children: insights.map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-md bg-muted/70 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
						children: insight.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm leading-relaxed",
						children: insight.body
					})]
				}, insight.title))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartGrid, { charts })
		]
	});
}
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted", className),
		value,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "size-full flex-1 bg-primary transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
			style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
		})
	});
}
var SpreadsheetError = class extends Error {
	hint;
	constructor(message, hint) {
		super(message);
		this.name = "SpreadsheetError";
		this.hint = hint;
	}
};
var ACCEPTED_EXT = [
	".csv",
	".xlsx",
	".xls"
];
var MAX_BYTES = 20971520;
var MAX_ROWS = 5e4;
function isAcceptedFile(file) {
	const name = file.name.toLowerCase();
	return ACCEPTED_EXT.some((ext) => name.endsWith(ext));
}
function describeAcceptedTypes() {
	return "CSV or Excel (.csv, .xlsx, .xls)";
}
function readFile(file, as, onProgress) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onprogress = (event) => {
			if (event.lengthComputable && event.total > 0) onProgress(Math.round(event.loaded / event.total * 78));
		};
		reader.onload = () => {
			onProgress(82);
			if (reader.result == null) {
				reject(new SpreadsheetError("The file arrived empty.", "Try exporting it again, then drop the new copy here."));
				return;
			}
			resolve(reader.result);
		};
		reader.onerror = () => reject(new SpreadsheetError("The browser couldn't read that file.", "Download it again and re-upload. If it is open in Excel, close it first."));
		if (as === "text") reader.readAsText(file);
		else reader.readAsArrayBuffer(file);
	});
}
function uniqueColumnName(name, used) {
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
function normalizeCell(value) {
	if (value == null) return null;
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
	if (typeof value === "number") return Number.isFinite(value) ? value : null;
	if (typeof value === "boolean") return value;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed || trimmed === "-" || trimmed === "—") return null;
		return trimmed;
	}
	if (typeof value === "object") return String(value);
	return null;
}
function asBoolean(value) {
	if (typeof value === "boolean") return value;
	if (typeof value === "number") {
		if (value === 1) return true;
		if (value === 0) return false;
		return null;
	}
	if (typeof value !== "string") return null;
	const s = value.trim().toLowerCase();
	if ([
		"true",
		"yes",
		"y",
		"1"
	].includes(s)) return true;
	if ([
		"false",
		"no",
		"n",
		"0"
	].includes(s)) return false;
	return null;
}
function asNumber(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (typeof value === "boolean") return value ? 1 : 0;
	if (typeof value !== "string") return null;
	const cleaned = value.replace(/[,$%\s]/g, "");
	if (!cleaned || cleaned === "-" || cleaned === ".") return null;
	const n = Number(cleaned);
	return Number.isFinite(n) ? n : null;
}
function asDate(value) {
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
	if (typeof value === "number" && value > 2e4 && value < 8e4) {
		const utc = Date.UTC(1899, 11, 30) + value * 864e5;
		const d = new Date(utc);
		return Number.isNaN(d.getTime()) ? null : d;
	}
	if (typeof value !== "string") return null;
	if (!/^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(value) && !/^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(value)) return null;
	const d = new Date(value);
	return Number.isNaN(d.getTime()) ? null : d;
}
function ratio(hits, total) {
	if (total === 0) return 0;
	return hits / total;
}
function inferKind(name, values) {
	const nonNull = values.filter((v) => v !== null);
	if (nonNull.length === 0) return "text";
	const namedImage = isImageColumnName(name);
	const imageHits = nonNull.filter((v) => extractImageUrls(v).length > 0).length;
	const httpHits = nonNull.filter((v) => typeof v === "string" && looksLikeHttpUrl(v)).length;
	if (namedImage && ratio(httpHits, nonNull.length) >= .4) return "image";
	if (ratio(imageHits, nonNull.length) >= .45) return "image";
	const urlHits = nonNull.filter((v) => looksLikeGenericUrl(v) || typeof v === "string" && looksLikeHttpUrl(v) && !isLikelyImageUrl(v)).length;
	if (ratio(urlHits, nonNull.length) >= .6) return "url";
	const boolHits = nonNull.filter((v) => asBoolean(v) !== null).length;
	if (ratio(boolHits, nonNull.length) >= .85) return "boolean";
	const numHits = nonNull.filter((v) => asNumber(v) !== null).length;
	if (ratio(numHits, nonNull.length) >= .8) return "number";
	const dateHits = nonNull.filter((v) => asDate(v) !== null).length;
	if (ratio(dateHits, nonNull.length) >= .7) return "date";
	const unique = new Set(nonNull.map((v) => String(v).toLowerCase())).size;
	if (unique > 1 && unique <= Math.min(24, Math.max(3, Math.floor(nonNull.length * .35)))) return "category";
	return "text";
}
function coerce(kind, value) {
	if (value == null) return null;
	if (kind === "number") return asNumber(value);
	if (kind === "boolean") return asBoolean(value);
	if (kind === "date") return asDate(value);
	if (kind === "image" || kind === "url" || kind === "text" || kind === "category") return typeof value === "string" ? value : String(value);
	return value;
}
function buildDataset(fileName, rawRows, options) {
	if (rawRows.length === 0) throw new SpreadsheetError("No data rows were found.", "Use the first row for column names and include at least one row of values.");
	const used = /* @__PURE__ */ new Set();
	const originalKeys = Object.keys(rawRows[0] ?? {});
	if (originalKeys.length === 0) throw new SpreadsheetError("This sheet has no columns.", "Add a header row, or export the used range rather than a blank workbook.");
	const keyMap = /* @__PURE__ */ new Map();
	for (const key of originalKeys) keyMap.set(key, uniqueColumnName(String(key || "Column"), used));
	let rows = rawRows.map((row) => {
		const next = {};
		for (const [from, to] of keyMap) next[to] = normalizeCell(row[from]);
		return next;
	});
	const names = [...keyMap.values()];
	const emptyCols = names.filter((name) => rows.every((row) => row[name] == null));
	const keep = names.filter((name) => !emptyCols.includes(name));
	if (keep.length === 0) throw new SpreadsheetError("Every column is empty.", "Check that you exported the correct sheet, not a cover tab.");
	rows = rows.map((row) => {
		const next = {};
		for (const name of keep) next[name] = row[name] ?? null;
		return next;
	}).filter((row) => keep.some((name) => row[name] != null));
	if (rows.length === 0) throw new SpreadsheetError("No data rows were found.", "The header parsed, but every following row was blank.");
	const warnings = [...options?.warnings ?? []];
	if (emptyCols.length) warnings.push(`Ignored ${emptyCols.length} empty column${emptyCols.length === 1 ? "" : "s"}.`);
	if (rows.length > MAX_ROWS) {
		warnings.push(`Showing the first ${MAX_ROWS.toLocaleString()} of ${rows.length.toLocaleString()} rows.`);
		rows = rows.slice(0, MAX_ROWS);
	}
	const columns = keep.map((name) => {
		const values = rows.map((row) => row[name] ?? null);
		const kind = inferKind(name, values);
		const coerced = values.map((v) => coerce(kind, v));
		for (let i = 0; i < rows.length; i += 1) rows[i][name] = coerced[i] ?? null;
		const nonNull = coerced.filter((v) => v !== null);
		const nums = kind === "number" ? nonNull.filter((v) => typeof v === "number") : [];
		const col = {
			key: name,
			name,
			kind,
			uniqueCount: new Set(nonNull.map((v) => String(v))).size,
			nullCount: coerced.length - nonNull.length
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
		parseWarnings: warnings
	};
}
function parseCsvText(text, fileName) {
	const result = import_papaparse.default.parse(text, {
		header: true,
		skipEmptyLines: "greedy",
		dynamicTyping: true,
		transformHeader: (header, index) => header.trim() || `Column ${index + 1}`
	});
	const fatal = result.errors.filter((err) => err.type === "Delimiter" || err.code === "MissingQuotes");
	const warnings = [];
	if (result.errors.length && result.data.length) {
		const first = result.errors[0];
		warnings.push(`Parsed with ${result.errors.length} warning${result.errors.length === 1 ? "" : "s"}${first?.row != null ? ` (first at row ${first.row + 1})` : ""}.`);
	}
	if (fatal.length && result.data.length === 0) {
		const first = fatal[0];
		throw new SpreadsheetError(first?.message || "This CSV could not be parsed.", first?.row != null ? `Check quoting around row ${first.row + 1}. Commas inside fields need to be wrapped in quotes.` : "Open the file in a text editor and confirm commas separate columns.");
	}
	if (!result.meta.fields?.length) throw new SpreadsheetError("No header row detected.", "The first line should list column names, separated by commas.");
	return buildDataset(fileName, result.data, { warnings });
}
async function parseExcelBuffer(buffer, fileName, sheetName) {
	const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
	let workbook;
	try {
		workbook = XLSX.read(buffer, {
			type: "array",
			cellDates: true,
			raw: true
		});
	} catch {
		throw new SpreadsheetError("We couldn't open this workbook.", "It may be password-protected, corrupt, or not a real .xlsx/.xls file. Try exporting again as .xlsx or CSV.");
	}
	const sheetNames = workbook.SheetNames.filter(Boolean);
	if (sheetNames.length === 0) throw new SpreadsheetError("This workbook has no sheets.", "Add a worksheet with a header row, or export a CSV instead.");
	const chosen = sheetName && sheetNames.includes(sheetName) ? sheetName : sheetNames[0];
	const sheet = workbook.Sheets[chosen];
	if (!sheet) throw new SpreadsheetError(`Sheet “${chosen}” is missing.`, "Pick another tab from the sheet list.");
	if (!sheet["!ref"]) throw new SpreadsheetError(`Sheet “${chosen}” is empty.`, sheetNames.length > 1 ? "Try another tab — this one has no used cells." : "Put column names in the first row and values beneath them.");
	return buildDataset(fileName, XLSX.utils.sheet_to_json(sheet, {
		defval: null,
		raw: true,
		blankrows: false
	}), {
		sheetName: chosen,
		sheetNames
	});
}
async function parseSpreadsheet(file, onProgress, sheetName) {
	if (!file || file.size === 0) throw new SpreadsheetError("That file is empty.", "Export the sheet again and make sure it contains rows of data.");
	if (file.size > MAX_BYTES) throw new SpreadsheetError("This file is larger than 20 MB.", "Export a smaller range, or save a CSV of the used columns only.");
	if (!isAcceptedFile(file)) throw new SpreadsheetError("That file type isn’t supported.", `Upload a ${describeAcceptedTypes()} file.`);
	onProgress(4);
	if (file.name.toLowerCase().endsWith(".csv")) {
		const text = await readFile(file, "text", onProgress);
		onProgress(90);
		const dataset = parseCsvText(text, file.name);
		onProgress(100);
		return dataset;
	}
	const buffer = await readFile(file, "array", onProgress);
	onProgress(88);
	const dataset = await parseExcelBuffer(buffer, file.name, sheetName);
	onProgress(100);
	return dataset;
}
async function parseSpreadsheetSheet(file, sheetName, onProgress) {
	return parseSpreadsheet(file, onProgress, sheetName);
}
function numericValues(dataset, key) {
	return dataset.rows.map((row) => row[key]).filter((v) => typeof v === "number" && Number.isFinite(v));
}
function dateValues(dataset, key) {
	return dataset.rows.map((row) => row[key]).filter((v) => v instanceof Date && !Number.isNaN(v.getTime()));
}
function completeness(dataset) {
	const total = dataset.rowCount * dataset.columns.length;
	if (total === 0) return 0;
	return dataset.rows.reduce((sum, row) => {
		return sum + dataset.columns.filter((col) => row[col.key] != null).length;
	}, 0) / total;
}
function UploadZone({ disabled, progress, status, error, compact, onFile, onSample }) {
	const inputId = (0, import_react.useId)();
	const inputRef = (0, import_react.useRef)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	const busy = status === "reading" || status === "parsing";
	const take = (0, import_react.useCallback)((file) => {
		if (!file || disabled || busy) return;
		onFile(file);
	}, [
		busy,
		disabled,
		onFile
	]);
	const onDrop = (event) => {
		event.preventDefault();
		setOver(false);
		take(event.dataTransfer.files[0]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onDragOver: (event) => {
			event.preventDefault();
			if (!disabled) setOver(true);
		},
		onDragLeave: () => setOver(false),
		onDrop,
		className: cn("relative rounded-xl bg-card shadow-border transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]", over && "shadow-border-hover ring-2 ring-ring/40", compact ? "p-3 sm:p-4" : "p-5 sm:p-8"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: inputId,
				ref: inputRef,
				type: "file",
				className: "sr-only",
				accept: ".csv,.xlsx,.xls,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				disabled: disabled || busy,
				onChange: (event) => {
					take(event.target.files?.[0]);
					event.target.value = "";
				}
			}),
			compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-md bg-muted text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Replace this sheet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [describeAcceptedTypes(), " · up to 20 MB"]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => inputRef.current?.click(),
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {}), "Choose file"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: onSample,
						disabled: busy,
						children: "Sample catalog"
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-12 items-center justify-center rounded-lg bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl tracking-tight sm:text-4xl",
							children: "Drop a spreadsheet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground sm:text-base",
							children: "CSV and Excel files become a readable table, with figures and charts chosen from the columns you actually have."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "flex flex-wrap gap-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full bg-muted px-3 py-1.5",
								children: ".csv"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full bg-muted px-3 py-1.5",
								children: ".xlsx"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full bg-muted px-3 py-1.5",
								children: ".xls"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full bg-muted px-3 py-1.5",
								children: "Max 20 MB"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full bg-muted px-3 py-1.5",
								children: "First 50,000 rows"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: () => inputRef.current?.click(),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {}), "Choose file"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: onSample,
							disabled: busy,
							children: "Load sample catalog"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Picture columns and image URLs render as thumbnails, not as raw links."
					})
				]
			}),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status === "reading" ? "Reading file…" : "Parsing rows…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [Math.round(progress), "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: progress })]
			}) : null,
			error && status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "alert",
				className: "mt-5 rounded-lg bg-destructive/8 px-4 py-3 text-sm text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: error.message
				}), error.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-destructive/80",
					children: error.hint
				}) : null]
			}) : null,
			over ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-card/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "Drop to open"
				})
			}) : null
		]
	});
}
function topCounts(values, limit = 8) {
	const map = /* @__PURE__ */ new Map();
	for (const value of values) map.set(value, (map.get(value) ?? 0) + 1);
	return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([name, value]) => ({
		name,
		value
	}));
}
function histogram(values, bins = 8) {
	if (values.length === 0) return [];
	const min = Math.min(...values);
	const max = Math.max(...values);
	if (min === max) return [{
		name: formatNumber(min),
		value: values.length
	}];
	const width = (max - min) / bins;
	const counts = Array.from({ length: bins }, () => 0);
	for (const value of values) {
		const i = Math.min(bins - 1, Math.floor((value - min) / width));
		counts[i] += 1;
	}
	return counts.map((value, i) => {
		const from = min + i * width;
		const to = min + (i + 1) * width;
		return {
			name: `${formatNumber(from)}–${formatNumber(to)}`,
			value
		};
	});
}
function groupNumericByDate(dates, numbers) {
	const pairs = dates.map((d, i) => ({
		t: d.getTime(),
		v: numbers[i]
	})).filter((p) => typeof p.v === "number");
	if (pairs.length < 2) return [];
	const min = Math.min(...pairs.map((p) => p.t));
	const spanDays = (Math.max(...pairs.map((p) => p.t)) - min) / 864e5;
	const bucket = spanDays > 730 ? "year" : spanDays > 90 ? "month" : "day";
	const map = /* @__PURE__ */ new Map();
	for (const pair of pairs) {
		const d = new Date(pair.t);
		let key;
		let label;
		let order;
		if (bucket === "year") {
			key = String(d.getFullYear());
			label = key;
			order = d.getFullYear();
		} else if (bucket === "month") {
			key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
			label = d.toLocaleDateString(void 0, {
				month: "short",
				year: "2-digit"
			});
			order = d.getFullYear() * 100 + d.getMonth();
		} else {
			key = d.toISOString().slice(0, 10);
			label = d.toLocaleDateString(void 0, {
				month: "short",
				day: "numeric"
			});
			order = pair.t;
		}
		const prev = map.get(key);
		if (prev) prev.sum += pair.v;
		else map.set(key, {
			sum: pair.v,
			label,
			order
		});
	}
	return [...map.values()].sort((a, b) => a.order - b.order).map((entry) => ({
		name: entry.label,
		value: roundNice(entry.sum)
	}));
}
function roundNice(n) {
	if (Math.abs(n) >= 100) return Math.round(n);
	return Math.round(n * 100) / 100;
}
function categoryValues(dataset, col) {
	return dataset.rows.map((row) => row[col.key]).filter((v) => v != null && v !== "").map((v) => String(v));
}
function sumByCategory(dataset, category, metric, limit = 8) {
	const map = /* @__PURE__ */ new Map();
	for (const row of dataset.rows) {
		const cat = row[category.key];
		const num = row[metric.key];
		if (cat == null || typeof num !== "number") continue;
		const key = String(cat);
		map.set(key, (map.get(key) ?? 0) + num);
	}
	return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([name, value]) => ({
		name,
		value: roundNice(value)
	}));
}
function buildKpis(dataset) {
	const complete = completeness(dataset);
	const kpis = [
		{
			label: "Rows",
			value: dataset.rowCount.toLocaleString(),
			hint: dataset.sheetName ? `Sheet · ${dataset.sheetName}` : dataset.fileName
		},
		{
			label: "Columns",
			value: String(dataset.columns.length),
			hint: `${dataset.columns.filter((c) => c.kind === "number").length} numeric`
		},
		{
			label: "Filled cells",
			value: formatPercent(complete),
			hint: complete > .95 ? "Nearly complete" : "Some blanks remain"
		}
	];
	const featured = dataset.columns.filter((c) => c.kind === "number" && c.sum != null).sort((a, b) => (b.sum ?? 0) - (a.sum ?? 0))[0];
	if (featured?.sum != null && featured.mean != null) kpis.push({
		label: `Sum of ${featured.name}`,
		value: formatNumber(featured.sum),
		hint: `Average ${formatFullNumber(featured.mean)}`
	});
	else {
		const cat = dataset.columns.filter((c) => c.kind === "category" || c.kind === "boolean").sort((a, b) => b.uniqueCount - a.uniqueCount)[0];
		kpis.push({
			label: cat ? `Values in ${cat.name}` : "Unique fields",
			value: String(cat?.uniqueCount ?? dataset.columns.reduce((s, c) => s + c.uniqueCount, 0)),
			hint: cat ? "Distinct labels" : "Across all columns"
		});
	}
	return kpis.slice(0, 4);
}
function buildInsights(dataset) {
	const insights = [];
	const complete = completeness(dataset);
	const imageCols = dataset.columns.filter((c) => c.kind === "image");
	const numeric = dataset.columns.filter((c) => c.kind === "number");
	const cats = dataset.columns.filter((c) => c.kind === "category");
	const dates = dataset.columns.filter((c) => c.kind === "date");
	insights.push({
		title: "Shape",
		body: `${dataset.fileName.replace(/\.[^.]+$/, "")} holds ${dataset.rowCount.toLocaleString()} rows across ${dataset.columns.length} columns, with ${formatPercent(complete)} of cells filled.`
	});
	if (numeric[0]?.mean != null && numeric[0].min != null && numeric[0].max != null) {
		const col = numeric[0];
		insights.push({
			title: col.name,
			body: `${col.name} ranges from ${formatFullNumber(col.min)} to ${formatFullNumber(col.max)}, averaging ${formatFullNumber(col.mean)}.`
		});
	}
	if (cats[0]) {
		const values = categoryValues(dataset, cats[0]);
		const top = topCounts(values, 1)[0];
		if (top) insights.push({
			title: cats[0].name,
			body: `“${top.name}” is the most common ${cats[0].name.toLowerCase()}, appearing in ${top.value.toLocaleString()} of ${values.length.toLocaleString()} labelled rows.`
		});
	}
	if (dates[0]) {
		const series = dateValues(dataset, dates[0].key).sort((a, b) => a.getTime() - b.getTime());
		if (series.length >= 2) {
			const from = series[0].toLocaleDateString(void 0, {
				month: "short",
				year: "numeric"
			});
			const to = series[series.length - 1].toLocaleDateString(void 0, {
				month: "short",
				year: "numeric"
			});
			insights.push({
				title: dates[0].name,
				body: `${dates[0].name} spans ${from} through ${to}.`
			});
		}
	}
	if (imageCols.length) {
		const col = imageCols[0];
		const withImages = dataset.rows.filter((row) => row[col.key] != null).length;
		insights.push({
			title: "Pictures",
			body: `${col.name} includes pictures on ${withImages.toLocaleString()} rows — they render as thumbnails in the table, not as raw links.`
		});
	}
	const sparse = dataset.columns.filter((c) => c.nullCount > 0).sort((a, b) => b.nullCount - a.nullCount)[0];
	if (sparse && sparse.nullCount / dataset.rowCount >= .2) insights.push({
		title: "Gaps",
		body: `${sparse.name} is missing in ${formatPercent(sparse.nullCount / dataset.rowCount)} of rows — the largest gap in this sheet.`
	});
	return insights.slice(0, 4);
}
function buildCharts(dataset) {
	const charts = [];
	const numeric = dataset.columns.filter((c) => c.kind === "number");
	const cats = dataset.columns.filter((c) => c.kind === "category" || c.kind === "boolean");
	const dates = dataset.columns.filter((c) => c.kind === "date");
	if (dates[0] && numeric[0]) {
		const dateCol = dates[0];
		const numCol = numeric[0];
		const alignedDates = [];
		const alignedNums = [];
		for (const row of dataset.rows) {
			const d = row[dateCol.key];
			const n = row[numCol.key];
			if (d instanceof Date && typeof n === "number") {
				alignedDates.push(d);
				alignedNums.push(n);
			}
		}
		const data = groupNumericByDate(alignedDates, alignedNums);
		if (data.length >= 2) charts.push({
			id: `trend-${dateCol.key}-${numCol.key}`,
			title: `${numCol.name} over time`,
			subtitle: `Grouped by ${dateCol.name}`,
			type: data.length > 8 ? "area" : "line",
			data,
			valueLabel: numCol.name
		});
	}
	if (cats[0] && numeric[0]) {
		const data = sumByCategory(dataset, cats[0], numeric[0]);
		if (data.length >= 2) charts.push({
			id: `sum-${cats[0].key}-${numeric[0].key}`,
			title: `${numeric[0].name} by ${cats[0].name}`,
			subtitle: "Top groups by total",
			type: "bar",
			data,
			valueLabel: numeric[0].name
		});
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
				valueLabel: "Rows"
			});
		}
	}
	if (numeric[0]) {
		const values = numericValues(dataset, numeric[0].key);
		const data = histogram(values);
		if (data.length >= 2) charts.push({
			id: `hist-${numeric[0].key}`,
			title: `Distribution of ${numeric[0].name}`,
			subtitle: `${values.length.toLocaleString()} numeric values`,
			type: "bar",
			data,
			valueLabel: "Rows"
		});
	}
	if (cats[1] && charts.length < 4) {
		const data = topCounts(categoryValues(dataset, cats[1]), 8);
		if (data.length >= 2) charts.push({
			id: `share-${cats[1].key}`,
			title: `Share of ${cats[1].name}`,
			subtitle: `${cats[1].uniqueCount} distinct values`,
			type: data.length <= 6 ? "pie" : "bar",
			data,
			valueLabel: "Rows"
		});
	}
	const seen = /* @__PURE__ */ new Set();
	return charts.filter((chart) => {
		if (seen.has(chart.id) || chart.data.length === 0) return false;
		seen.add(chart.id);
		return true;
	}).slice(0, 4);
}
var ITEMS = [
	{
		Product: "Oak lounge chair",
		Category: "Seating",
		Price: 890,
		Units: 42,
		Rating: 4.7,
		Region: "Nordics"
	},
	{
		Product: "Linen daybed",
		Category: "Seating",
		Price: 1240,
		Units: 18,
		Rating: 4.5,
		Region: "Nordics"
	},
	{
		Product: "Walnut side table",
		Category: "Tables",
		Price: 320,
		Units: 67,
		Rating: 4.6,
		Region: "Alpine"
	},
	{
		Product: "Marble console",
		Category: "Tables",
		Price: 1580,
		Units: 9,
		Rating: 4.8,
		Region: "Mediterranean"
	},
	{
		Product: "Wool throw, rust",
		Category: "Textiles",
		Price: 95,
		Units: 210,
		Rating: 4.4,
		Region: "Atlantic"
	},
	{
		Product: "Hand-loomed rug 8×10",
		Category: "Textiles",
		Price: 760,
		Units: 31,
		Rating: 4.9,
		Region: "Atlantic"
	},
	{
		Product: "Opal glass lamp",
		Category: "Lighting",
		Price: 210,
		Units: 88,
		Rating: 4.3,
		Region: "Pacific"
	},
	{
		Product: "Brass floor lamp",
		Category: "Lighting",
		Price: 540,
		Units: 24,
		Rating: 4.6,
		Region: "Pacific"
	},
	{
		Product: "Ceramic table lamp",
		Category: "Lighting",
		Price: 180,
		Units: 73,
		Rating: 4.2,
		Region: "Mediterranean"
	},
	{
		Product: "Ash dining table",
		Category: "Tables",
		Price: 2100,
		Units: 11,
		Rating: 4.8,
		Region: "Nordics"
	},
	{
		Product: "Cane lounge set",
		Category: "Seating",
		Price: 1680,
		Units: 7,
		Rating: 4.5,
		Region: "Pacific"
	},
	{
		Product: "Stoneware vase",
		Category: "Objects",
		Price: 64,
		Units: 156,
		Rating: 4.1,
		Region: "Alpine"
	},
	{
		Product: "Oak bookshelf",
		Category: "Storage",
		Price: 980,
		Units: 19,
		Rating: 4.7,
		Region: "Atlantic"
	},
	{
		Product: "Leather ottoman",
		Category: "Seating",
		Price: 410,
		Units: 36,
		Rating: 4.4,
		Region: "Mediterranean"
	},
	{
		Product: "Linen curtain pair",
		Category: "Textiles",
		Price: 220,
		Units: 58,
		Rating: 4.3,
		Region: "Nordics"
	},
	{
		Product: "Cedar chest",
		Category: "Storage",
		Price: 640,
		Units: 14,
		Rating: 4.6,
		Region: "Alpine"
	},
	{
		Product: "Paper pendant",
		Category: "Lighting",
		Price: 130,
		Units: 102,
		Rating: 4.5,
		Region: "Pacific"
	},
	{
		Product: "Travertine bowl",
		Category: "Objects",
		Price: 85,
		Units: 91,
		Rating: 4.2,
		Region: "Mediterranean"
	},
	{
		Product: "Elm bench",
		Category: "Seating",
		Price: 560,
		Units: 22,
		Rating: 4.7,
		Region: "Atlantic"
	},
	{
		Product: "Wool runner",
		Category: "Textiles",
		Price: 310,
		Units: 40,
		Rating: 4.8,
		Region: "Alpine"
	},
	{
		Product: "Oak nightstand",
		Category: "Storage",
		Price: 390,
		Units: 45,
		Rating: 4.4,
		Region: "Nordics"
	},
	{
		Product: "Iron candleholders",
		Category: "Objects",
		Price: 48,
		Units: 188,
		Rating: 4,
		Region: "Atlantic"
	},
	{
		Product: "Rattan armchair",
		Category: "Seating",
		Price: 470,
		Units: 27,
		Rating: 4.3,
		Region: "Pacific"
	},
	{
		Product: "Slate coffee table",
		Category: "Tables",
		Price: 890,
		Units: 16,
		Rating: 4.6,
		Region: "Alpine"
	},
	{
		Product: "Cotton bed throw",
		Category: "Textiles",
		Price: 140,
		Units: 77,
		Rating: 4.5,
		Region: "Mediterranean"
	},
	{
		Product: "Pine wall shelf",
		Category: "Storage",
		Price: 160,
		Units: 63,
		Rating: 4.1,
		Region: "Nordics"
	},
	{
		Product: "Blown-glass carafe",
		Category: "Objects",
		Price: 72,
		Units: 120,
		Rating: 4.4,
		Region: "Mediterranean"
	},
	{
		Product: "Oak desk",
		Category: "Tables",
		Price: 1320,
		Units: 13,
		Rating: 4.9,
		Region: "Atlantic"
	}
];
var PHOTO_IDS = [
	1011,
	1018,
	1025,
	103,
	1060,
	1074,
	119,
	133,
	145,
	157,
	164,
	175,
	193,
	201,
	211,
	225,
	238,
	250,
	259,
	274,
	292,
	306,
	326,
	338,
	349,
	365,
	375,
	399
];
function slug(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function getSampleDataset() {
	return buildDataset("atelier-catalog.csv", ITEMS.map((item, index) => {
		const launched = new Date(Date.UTC(2023, index % 12, 4 + index % 20));
		return {
			...item,
			Photo: `https://picsum.photos/id/${PHOTO_IDS[index % PHOTO_IDS.length]}/320/320`,
			Website: `https://atelier.example/${slug(item.Product)}`,
			Launched: launched.toISOString().slice(0, 10),
			"In stock": index % 7 === 0 ? "No" : "Yes"
		};
	}));
}
function Home() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [dataset, setDataset] = (0, import_react.useState)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const kpis = (0, import_react.useMemo)(() => dataset ? buildKpis(dataset) : [], [dataset]);
	const insights = (0, import_react.useMemo)(() => dataset ? buildInsights(dataset) : [], [dataset]);
	const charts = (0, import_react.useMemo)(() => dataset ? buildCharts(dataset) : [], [dataset]);
	const applyDataset = (0, import_react.useCallback)((next, source) => {
		setDataset(next);
		setFile(source);
		setError(null);
		setStatus("ready");
		setProgress(100);
	}, []);
	const handleFile = (0, import_react.useCallback)(async (nextFile, sheetName) => {
		setError(null);
		setStatus("reading");
		setProgress(6);
		try {
			const parsed = sheetName ? await parseSpreadsheetSheet(nextFile, sheetName, (pct) => {
				setProgress(pct);
				if (pct >= 82) setStatus("parsing");
			}) : await parseSpreadsheet(nextFile, (pct) => {
				setProgress(pct);
				if (pct >= 82) setStatus("parsing");
			});
			applyDataset(parsed, nextFile);
		} catch (cause) {
			const err = cause instanceof SpreadsheetError ? {
				message: cause.message,
				hint: cause.hint
			} : {
				message: "Something went wrong while reading that file.",
				hint: "Try exporting as CSV and upload again."
			};
			setError(err);
			setStatus("error");
			setProgress(0);
		}
	}, [applyDataset]);
	const loadSample = (0, import_react.useCallback)(() => {
		applyDataset(getSampleDataset(), null);
	}, [applyDataset]);
	const reset = (0, import_react.useCallback)(() => {
		setDataset(null);
		setFile(null);
		setError(null);
		setStatus("idle");
		setProgress(0);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-none tracking-tight",
						children: "Data Canvas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Spreadsheet, then the picture of it"
					})] })]
				}), dataset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: reset,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Start over"]
				}) : null]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 pb-16 sm:px-6 sm:py-10",
			children: !dataset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadZone, {
				status,
				progress,
				error,
				onFile: (next) => void handleFile(next),
				onSample: loadSample
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-lg text-sm text-muted-foreground",
				children: "Nothing leaves this page — files are read in the browser. Use the sample catalog to see image URLs rendered as photographs in the table."
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadZone, {
					compact: true,
					status,
					progress,
					error,
					onFile: (next) => void handleFile(next),
					onSample: loadSample
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
							children: "Open file"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display truncate text-3xl tracking-tight sm:text-4xl",
							children: dataset.fileName
						})]
					}), dataset.sheetNames.length > 1 && file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full sm:w-56",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-xs font-medium text-muted-foreground",
							children: "Sheet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: dataset.sheetName,
							onValueChange: (name) => void handleFile(file, name),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								"aria-label": "Worksheet",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: dataset.sheetNames.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: name,
								children: name
							}, name)) })]
						})]
					}) : null]
				}),
				dataset.parseWarnings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "rounded-lg bg-warning/10 px-4 py-3 text-sm text-warning",
					children: dataset.parseWarnings.map((warning) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: warning }, warning))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummarySection, {
					kpis,
					insights,
					charts
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, { dataset })
			] })
		})]
	});
}
//#endregion
export { Home as component };
