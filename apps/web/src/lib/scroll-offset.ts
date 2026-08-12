/**
 * How far below the viewport top an anchored section comes to rest, clearing
 * the sticky header. Used by the scroll-margin on every anchor target and by
 * the table of contents' observer, which have to agree or the highlighted
 * entry lags the section you jumped to.
 */
export const SCROLL_OFFSET_PX = 100;

/** Tailwind class applying the offset. Kept as a literal so the scanner sees it. */
export const SCROLL_MARGIN = "scroll-mt-[100px]";
