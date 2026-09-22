import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { interVariable, paperMono } from "../../fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "loading.dev › Gallery",
};

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          interVariable.variable,
          paperMono.variable,
          "bg-background-subtle font-sans text-content antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
