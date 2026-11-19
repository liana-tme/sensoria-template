/*
 * Legal page content (/legal/<slug>): the parts that are the same on every document.
 * The documents themselves are files in src/content/legal/ (see the README there).
 */
export type LegalContent = {
  updatedLabel: string;
  /** Description for search engines and link previews (both documents). */
  description: string;
};

export const legalContent: LegalContent = {
  updatedLabel: "Last updated:",
  description: "Review our commitment to biometric security. Information on decentralized processing, end-to-end encryption, and global data compliance.",
};
