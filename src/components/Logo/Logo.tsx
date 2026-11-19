/*
 * Sensoria logo: the brand name as a serif wordmark, links home.
 * size "s" (menu bar, text style S) or "l" (footer, text style L).
 */
export type LogoContent = {
  /** The wordmark text. */
  name: string;
  /** Where the logo leads (usually the home page). */
  href: string;
};

export function Logo({ logo, onClick, size = "s" }: { logo: LogoContent; onClick?: () => void; size?: "s" | "l" }) {
  return (
    <a
      href={logo.href}
      onClick={onClick}
      className={`flex w-fit items-center ${size === "l" ? "type-serif-l" : "h-logo-h type-serif-s"}`}
    >
      {logo.name}
    </a>
  );
}
