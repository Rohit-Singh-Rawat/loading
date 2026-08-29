import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DisableThemeTransitions } from "@/components/disable-theme-transitions";
import { MotionProvider } from "@/components/motion-provider";
import { SearchProvider } from "@/components/search/search-provider";
import { MobileNav } from "@/components/sidebar/mobile-nav";
import { Sidebar } from "@/components/sidebar/sidebar";
import {
  DOMAIN,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  TWITTER_HANDLE,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { berkeleyMono, interVariable } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  metadataBase: new URL(DOMAIN),
  openGraph: {
    images: [
      {
        alt: SITE_NAME,
        height: OG_IMAGE.height,
        type: "image/png",
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
      },
    ],
    locale: "en_US",
    siteName: SITE_NAME,
    type: "website",
    url: DOMAIN,
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
    creator: TWITTER_HANDLE,
    images: [{ alt: SITE_NAME, url: OG_IMAGE.url }],
    site: TWITTER_HANDLE,
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
          "bg-surface font-sans text-content antialiased"
        )}
      >
        <DisableThemeTransitions />
        <MotionProvider>
          <SearchProvider>
            <a
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:border focus:border-border focus:bg-popover focus:px-4 focus:py-2 focus:font-medium focus:text-content focus:text-sm focus:shadow-custom"
              href="#content"
            >
              Skip to content
            </a>
            <MobileNav />
            <div className="min-h-dvh md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
              <div />
              <Sidebar />
              <div className="flex gap-12 px-5 py-10 sm:px-6 md:py-19 md:pl-0">
                <main
                  className="mx-auto w-full max-w-160 focus-visible:outline-hidden"
                  id="content"
                  tabIndex={-1}
                >
                  {children}
                </main>
                {aside}
              </div>
            </div>
          </SearchProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
