import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DisableThemeTransitions } from "@/components/disable-theme-transitions";
import { MotionProvider } from "@/components/motion-provider";
import { MobileNav } from "@/components/sidebar/mobile-nav";
import { Sidebar } from "@/components/sidebar/sidebar";
import {
  domain,
  siteDescription,
  siteName,
  twitterHandle,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { berkeleyMono, interVariable } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  description: siteDescription,
  metadataBase: new URL(domain),
  openGraph: {
    images: [
      {
        alt: siteName,
        height: 1008,
        type: "image/png",
        url: "https://ru2qm1zsj1gavqlm.public.blob.vercel-storage.com/og-image.png",
        width: 1920,
      },
    ],
    locale: "en_US",
    siteName,
    type: "website",
    url: domain,
  },
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: "Spinners",
    template: "%s — Spinners",
  },
  twitter: {
    card: "summary_large_image",
    creator: twitterHandle,
    images: [
      {
        alt: siteName,
        url: "https://ru2qm1zsj1gavqlm.public.blob.vercel-storage.com/og-image.png",
      },
    ],
    site: twitterHandle,
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
          berkeleyMono.variable,
          "bg-gray-background font-sans text-gray-1200 antialiased"
        )}
      >
        <DisableThemeTransitions />
        <MotionProvider>
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-preview-bg focus:px-4 focus:py-2 focus:font-medium focus:text-gray-1200 focus:text-sm focus:shadow-custom"
            href="#content"
          >
            Skip to content
          </a>
          <MobileNav />
          <div className="mx-auto flex min-h-dvh justify-center gap-12 px-6">
            <Sidebar />
            <main
              className="w-full max-w-[640px] pt-10 pb-25 md:py-25"
              id="content"
              tabIndex={-1}
            >
              {children}
            </main>
            {aside}
          </div>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
