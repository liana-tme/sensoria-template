/*
 * Page title, description and link preview for one page. Every page shares the site's link preview
 * image (src/app/opengraph-image.jpg) unless it passes its own (journal articles use their banner).
 */
import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, image = "/opengraph-image.jpg"): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
