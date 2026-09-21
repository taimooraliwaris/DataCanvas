import { useState } from "react";
import { ExternalLink, ImageOff } from "lucide-react";
import { extractImageUrls } from "@/lib/image-url";
import { hostFromUrl } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ImageCellProps = {
  value: unknown;
  alt: string;
};

function Thumb({
  url,
  alt,
  onOpen,
}: {
  url: string;
  alt: string;
  onOpen: () => void;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex max-w-40 items-center gap-1 truncate text-xs text-primary underline-offset-2 hover:underline"
      >
        <ImageOff className="size-3.5 shrink-0" />
        {hostFromUrl(url)}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative size-12 overflow-hidden rounded-sm bg-muted transition-[transform,box-shadow] duration-150 ease-out hover:shadow-border-hover"
      aria-label={`Preview ${alt}`}
    >
      <img
        src={url}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="size-full object-cover"
        onError={() => setFailed(true)}
      />
    </button>
  );
}

export function ImageCell({ value, alt }: ImageCellProps) {
  const urls = extractImageUrls(value);
  const [active, setActive] = useState<string | null>(null);

  if (urls.length === 0) {
    if (value == null || value === "") return <span className="text-muted-foreground">—</span>;
    return <span className="text-sm">{String(value)}</span>;
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5 py-0.5">
        {urls.map((url) => (
          <Thumb key={url} url={url} alt={alt} onOpen={() => setActive(url)} />
        ))}
      </div>
      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[min(90vh,44rem)] max-w-lg overflow-y-auto p-0">
          <DialogHeader className="px-5 pt-5 pr-12">
            <DialogTitle className="truncate">{alt}</DialogTitle>
            <DialogDescription className="truncate">
              {active ? hostFromUrl(active) : ""}
            </DialogDescription>
          </DialogHeader>
          {active ? (
            <div className="bg-muted px-5 pb-5">
              <img
                src={active}
                alt={alt}
                className="mx-auto max-h-[60vh] w-full rounded-md object-contain"
                referrerPolicy="no-referrer"
              />
              <a
                href={active}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex h-11 items-center gap-2 text-sm text-primary"
              >
                Open original
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
