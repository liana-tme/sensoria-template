/*
 * /contact — the contact form and direct contact cards.
 */
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { Channels } from "@/sections/channels/Channels";
import { channelsContent } from "@/sections/channels/content";
import { Contact } from "@/sections/contact/Contact";
import { contactContent } from "@/sections/contact/content";
import { Footer } from "@/sections/footer/Footer";
import { footerContent } from "@/sections/footer/content";
import { GetStarted } from "@/sections/get-started/GetStarted";
import { getStartedContent } from "@/sections/get-started/content";
import { Navigation } from "@/sections/navigation/Navigation";
import { navigationContent } from "@/sections/navigation/content";

const { title, description } = contactContent.meta;

export const metadata: Metadata = pageMetadata(title, description);

export default function ContactPage() {
  return (
    <>
      <Navigation content={navigationContent} />
      <main>
        <Contact content={contactContent} />
        <Channels content={channelsContent} id="channels" />
        <GetStarted content={getStartedContent} id="get-started" />
      </main>
      <Footer content={footerContent} />
    </>
  );
}
