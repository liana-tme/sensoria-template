import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/SmoothScroll/SmoothScroll";
import "./globals.css";

/*
 * All fonts are self-hosted from src/fonts/ (each folder has the font files and their OFL license).
 * Inter Display: the official Inter 4.1 release (rsms/inter), the same family the original uses.
 */
const interDisplay = localFont({
  src: [
    { path: "../fonts/inter-display/InterDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-display/InterDisplay-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/inter-display/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-display/InterDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-display/InterDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter-display",
});
const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
});

/*
 * Site title and description (tab, search engines, link previews). The link preview image is
 * src/app/opengraph-image.jpg (1800×945); the tab icons are in public/brand/.
 * Site address for link previews: on Vercel it is found automatically; on any other host
 * set the environment variable NEXT_PUBLIC_SITE_URL to your address (e.g. https://example.com).
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
const siteTitle = "Sensoria — AI Beauty & Skin Analysis";
const siteDescription =
  "Template for AI beauty and skincare products. Designed to present analysis, features, and product flows with clarity through structured pages and a consistent visual system.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: { title: siteTitle, description: siteDescription, type: "website" },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
  // Browser-tab icon: dark mark on light browser themes, light mark on dark ones.
  icons: {
    icon: [
      { url: "/brand/icon-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/brand/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interDisplay.variable} ${instrumentSerif.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
