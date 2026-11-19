/*
 * Job page content (/careers/<slug>): the parts that are the same on every job.
 * Each job's own texts are files in src/content/careers/.
 */
export type JobContent = {
  detailsTitle: string;
  /** Apply form. */
  apply: {
    tag: string;
    heading: string;
    /**
     * Address from your form service (Formspree, Basin, Getform…): it receives the applications.
     * Empty = the button opens the visitor's e-mail app with a message to `fallbackEmail`.
     */
    action: string;
    fallbackEmail: string;
    /** E-mail subject; the job title is added after it. */
    subject: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      resume: { label: string; placeholder: string };
      letter: { label: string; placeholder: string };
    };
    button: { idle: string; success: string; prepared: string; error: string };
    note: { text: string; link: { label: string; href: string } };
  };
};

export const jobContent: JobContent = {
  detailsTitle: "Job details:",
  apply: {
    tag: "[Join Us]",
    heading: "Apply now",
    action: "",
    fallbackEmail: "hello@sensoria.com",
    subject: "Application:",
    fields: {
      name: { label: "Full name *", placeholder: "Alexandra Jensen" },
      email: { label: "Email address *", placeholder: "alex@gmail.com" },
      resume: { label: "Resume link *", placeholder: "drive.google.com/file/..." },
      letter: { label: "Cover letter", placeholder: "Briefly describe your experience with AI or health tech systems" },
    },
    button: { idle: "Submit application", success: "Thanks!", prepared: "Opened in your email app", error: "Try again" },
    note: { text: "No spam. No data shared. → ", link: { label: "Privacy Policy", href: "/legal/privacy-policy" } },
  },
};
