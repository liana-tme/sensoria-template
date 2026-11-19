/*
 * Contact page form content (/contact): everything the owner can change.
 * Layout, spacing and motion live in Contact.tsx, ContactForm.tsx and tokens.css.
 */
export type ContactContent = {
  /** Page title and description for search engines and link previews. */
  meta: { title: string; description: string };
  /** Page heading: white part + softer part. Shown in capitals. */
  heading: { text: string; muted: string };
  tag: string;
  form: {
    /**
     * Address from your form service (Formspree, Basin, Getform…): it receives the messages.
     * Empty = the button opens the visitor's e-mail app with a message to `fallbackEmail`.
     */
    action: string;
    fallbackEmail: string;
    subject: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      topic: { label: string; placeholder: string; options: string[] };
      message: { label: string; placeholder: string };
    };
    button: { idle: string; success: string; prepared: string; error: string };
    note: { text: string; link: { label: string; href: string } };
  };
};

export const contactContent: ContactContent = {
  meta: {
    title: "Sensoria — Contact",
    description:
      "Get in touch with our technical support team or reach out to our research laboratory for partnership discussions and scientific inquiries.",
  },
  heading: { text: "Get support ", muted: "Contact our lab" },
  tag: "[Get in touch]",
  form: {
    action: "",
    fallbackEmail: "hello@sensoria.com",
    subject: "Message from the website",
    fields: {
      name: { label: "Name *", placeholder: "Alexandra Jensen" },
      email: { label: "Email *", placeholder: "alex@gmail.com" },
      topic: { label: "Subject *", placeholder: "Select a topic...", options: ["Technical support", "Partnership", "Media inquiry"] },
      message: { label: "Message", placeholder: "Describe your issue or question in detail..." },
    },
    button: { idle: "Send message", success: "Thanks!", prepared: "Opened in your email app", error: "Try again" },
    note: { text: "No spam. No data shared. → ", link: { label: "Privacy Policy", href: "/legal/privacy-policy" } },
  },
};
