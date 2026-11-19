/*
 * Sensoria button: white pill, dark Body Large Bold label.
 * Hover: the label rolls up and an identical copy rolls in from below (0.8s spring).
 * No href at all + onClick renders a real button (journal "Load More").
 * An empty href renders a placeholder that looks and feels the same (hand cursor, hover roll) but goes nowhere.
 */
import styles from "./Button.module.css";

export function Button({
  href,
  label,
  newTab = false,
  wide = false,
  onClick,
}: {
  /** Link address. Empty = placeholder; left out (with onClick) = a real button. */
  href?: string;
  label: string;
  newTab?: boolean;
  /** Full width of its column (Results). */
  wide?: boolean;
  onClick?: () => void;
}) {
  const face = (
    <span className={`${styles.labels} relative flex flex-col items-center`}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.label} ${styles.copy} absolute`} aria-hidden="true">
        {label}
      </span>
    </span>
  );
  const look = `${styles.root} ${wide ? "flex w-full" : "inline-flex"} cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white px-button-x py-button-y type-body-lg-bold text-text-dark`;

  if (href === undefined && onClick) {
    return (
      <button type="button" onClick={onClick} className={look}>
        {face}
      </button>
    );
  }
  if (!href) {
    return (
      <span className={look} aria-disabled="true">
        {face}
      </span>
    );
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className={look}
      {...(newTab ? { target: "_blank", rel: "noopener" } : {})}
    >
      {face}
    </a>
  );
}
