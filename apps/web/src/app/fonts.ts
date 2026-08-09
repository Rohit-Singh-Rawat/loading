import localFont from "next/font/local";

export const interVariable = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  fallback: ["system-ui", "arial"],
  src: [
    {
      path: "./fonts/InterVariable.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
});

export const heldane = localFont({
  display: "swap",
  fallback: ["Georgia", "serif"],
  src: [
    {
      path: "./fonts/heldane-text-regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/heldane-text-regular-italic.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-heldane",
});

export const berkeleyMono = localFont({
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
  src: [
    {
      path: "./fonts/BerkeleyMono-Regular.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-berkeley-mono",
});
