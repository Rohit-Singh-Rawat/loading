import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DisableThemeTransitions } from "@/components/disable-theme-transitions";
import { MotionProvider } from "@/components/motion-provider";
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
