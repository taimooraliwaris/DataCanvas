const IMAGE_EXT =
  /\.(png|jpe?g|jpe|gif|webp|svg|avif|bmp|ico|tif|tiff|heic|heif)(?:[?#].*)?$/i;

const IMAGE_HOST =
  /(picsum\.photos|images\.unsplash|plus\.unsplash|unsplash\.com\/(?:photo|s\/)|source\.unsplash|cloudinary\.com|res\.cloudinary|imgur\.com|i\.imgur|googleusercontent\.com|lh3\.googleusercontent|twimg\.com|pbs\.twimg|media\.githubusercontent|raw\.githubusercontent|staticflickr|live\.staticflickr|placehold\.co|placeholder\.com|placekitten|loremflickr|gravatar\.com|wp\.com\/|shopify\.com|imgix\.net|cloudfront\.net|images\.pexels|cdninstagram|fbcdn\.net|ytimg\.com|ggpht\.com|pinimg\.com|wikimedia\.org|upload\.wikimedia)/i;

const IMAGE_COL_NAME =
  /^(photo|photos|image|images|img|thumbnail|thumb|thumbs|avatar|picture|pictures|pic|cover|logo|icon|artwork|banner|hero|preview|snapshot|shot|media|asset)$/i;

const IMAGE_COL_HINT =
  /(photo|image|img|thumb|avatar|picture|pic|cover|logo|icon|artwork|banner)/i;

export function looksLikeHttpUrl(value: string): boolean {
  return /^https?:\/\/\S+$/i.test(value.trim());
}

export function extractImageUrls(value: unknown): string[] {
  if (value == null) return [];
  const text = String(value).trim();
  if (!text) return [];

  const formula = text.match(/^=IMAGE\(\s*["']([^"']+)["']/i);
  if (formula?.[1]) return [formula[1]];

  const markdown = [...text.matchAll(/!\[[^\]]*]\((https?:\/\/[^)\s]+)\)/gi)].map(
    (m) => m[1]!,
  );
  if (markdown.length) return markdown;

  const html = [...text.matchAll(/src=["'](https?:\/\/[^"']+)["']/gi)].map(
    (m) => m[1]!,
  );
  if (html.length) return html;

  const parts = text
    .split(/[\s,;|]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const urls = parts.filter((part) => isLikelyImageUrl(part));
  if (urls.length) return urls;

  if (isLikelyImageUrl(text)) return [text];
  return [];
}

export function isLikelyImageUrl(value: string): boolean {
  const raw = value.trim();
  if (!raw) return false;
  if (/^data:image\//i.test(raw)) return true;
  if (!/^https?:\/\//i.test(raw)) return false;
  if (IMAGE_EXT.test(raw)) return true;
  try {
    const url = new URL(raw);
    if (IMAGE_HOST.test(url.hostname + url.pathname)) return true;
    if (/[?&](?:format|fm|auto)=(?:jpg|jpeg|png|webp|gif|avif)/i.test(url.search)) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function isImageColumnName(name: string): boolean {
  const compact = name.trim();
  if (IMAGE_COL_NAME.test(compact)) return true;
  return IMAGE_COL_HINT.test(compact.replace(/[^a-z0-9]+/gi, " "));
}

export function looksLikeGenericUrl(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return looksLikeHttpUrl(value) && extractImageUrls(value).length === 0;
}
