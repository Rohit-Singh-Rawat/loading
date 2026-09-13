export const DOMAIN = "https://loading.dev";

export const SITE_NAME = "Loading.dev";
export const SITE_DESCRIPTION =
  "A collection of loading indicators for interfaces that care about the details.";

export const TWITTER_HANDLE = "@jakubkrehel";

export const PREVIEW_SECTION_ID = "preview";
export const PROSE_SECTION_ID = "prose";

// The hostname is also listed in `next.config.ts` under `images.remotePatterns`,
// which cannot import from `src`.
export const BLOB_BASE =
  "https://ru2qm1zsj1gavqlm.public.blob.vercel-storage.com";

export const OG_IMAGE = {
  height: 1280,
  url: `${BLOB_BASE}/loading-og-image.png`,
  width: 2560,
} as const;
