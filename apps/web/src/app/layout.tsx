import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DisableThemeTransitions } from "@/components/disable-theme-transitions";
import { MotionProvider } from "@/components/motion-provider";
import { Sidebar } from "@/components/sidebar/sidebar";
import { cn } from "@/lib/utils";
import {
  berkeleyMono,
  heldane,
  interVariable,
  libreBaskerville,
  openRunde,
} from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  description:
    "A collection of loading indicators for interfaces that care about the details.",
  title: {
    default: "Spinners",
    template: "%s — Spinners",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#fcfcfc", media: "(prefers-color-scheme: light)" },
    { color: "#101010", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  aside,
  children,
}: {
  aside: ReactNode;
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          interVariable.variable,
          openRunde.variable,
          berkeleyMono.variable,
          libreBaskerville.variable,
          heldane.variable,
          "bg-gray-background font-sans text-gray-1200 antialiased"
        )}
      >
        <DisableThemeTransitions />
        <MotionProvider>
          <div className="mx-auto flex min-h-dvh justify-center gap-12 px-6">
            <Sidebar />
            <main className="w-full max-w-[640px] py-[100px]">{children}</main>
            {aside}
          </div>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
