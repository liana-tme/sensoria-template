/*
 * 404 — shown for any unknown address (with the real 404 status).
 */
import type { Metadata } from "next";
import { Footer } from "@/sections/footer/Footer";
import { footerContent } from "@/sections/footer/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { getStartedContent } from "@/sections/get-started/content";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";
import { NotFound } from "@/sections/not-found/NotFound";
import { notFoundContent } from "@/sections/not-found/content";

export const metadata: Metadata = { title: "Sensoria — 404" };

export default function NotFoundPage() {
  return (
    <>
      <Navigation content={navigationContent} />
      <main>
        <NotFound content={notFoundContent} />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
