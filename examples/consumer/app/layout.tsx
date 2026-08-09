import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  description:
    "Renders the published loading-dev package from the npm registry.",
  title: "loading-dev — published package check",
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#ffffff", media: "(prefers-color-scheme: light)" },
    { color: "#111111", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          background: "light-dark(#ffffff, #111111)",
          color: "light-dark(#111111, #ededed)",
          colorScheme: "light dark",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          margin: 0,
          padding: "3rem 1.5rem",
        }}
      >
        {children}
      </body>
    </html>
  );
}
