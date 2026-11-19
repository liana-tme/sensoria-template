/*
 * Dates shown on the site (safe in the browser too: no file reading here).
 */

/** Human date, e.g. "Mar 3, 2026". */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
