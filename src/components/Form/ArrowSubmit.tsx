/*
 * ArrowSubmit: an accent arrow at the end of the newsletter field.
 * Hover: the arrow turns 45° (points right). Loading: spinner. Success / prepared: a check. Error: grey arrow.
 */
import { Icon } from "@/components/Icon/Icon";
import type { FormState } from "./useStaticForm";
import styles from "./Form.module.css";

export function ArrowSubmit({ state, label }: { state: FormState; label: string }) {
  const done = state === "success" || state === "prepared";
  return (
    <button
      type="submit"
      disabled={state === "loading"}
      aria-label={label}
      className={`${styles.arrow} rounded-icon-button p-icon-button ${state === "error" ? "text-text-placeholder" : "text-accent"}`}
    >
      {state === "loading" ? (
        <span className={`${styles.spinner} ${styles.spinnerAccent} block size-xl`} />
      ) : (
        <Icon name={done ? "check" : "arrow-up-right"} strokeWidth={1.5} className={`${styles.arrowIcon} size-icon-md`} />
      )}
    </button>
  );
}
