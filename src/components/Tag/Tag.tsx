/*
 * Section tag: the eyebrow label above a section heading, like "[About Us]".
 * tone "accent" on dark sections, "white" on photos or accent backgrounds. Body Bold.
 */
export function Tag({ label, tone = "accent" }: { label: string; tone?: "accent" | "white" }) {
  return <p className={`type-body-bold ${tone === "accent" ? "text-accent" : "text-text-primary"}`}>{label}</p>;
}
