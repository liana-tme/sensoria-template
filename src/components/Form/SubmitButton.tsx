/*
 * SubmitButton: white pill with a light outline, dark label.
 * Hover: the label rolls up (blurring as it goes) and a copy rolls in. Pressed: slightly grey.
 * States: loading (spinner), success, prepared (e-mail app opened), error (red tint, white label).
 */
import type { FormState } from "./useStaticForm";
import styles from "./Form.module.css";

export function SubmitButton({
  state,
  labels,
}: {
  state: FormState;
  labels: { idle: string; success: string; prepared: string; error: string };
}) {
  const text = state === "success" ? labels.success : state === "prepared" ? labels.prepared : state === "error" ? labels.error : labels.idle;
  return (
    <button
      type="submit"
      disabled={state === "loading"}
      aria-live="polite"
      className={`${styles.submit} ${state === "error" ? styles.error : ""} relative inline-flex items-center justify-center overflow-hidden rounded-full px-stack-sm py-md type-body-lg-bold`}
    >
      {state === "loading" ? (
        <span className={`${styles.spinner} size-md`} aria-label="Sending" />
      ) : (
        <span className="relative flex flex-col items-center">
          <span className={styles.label}>{text}</span>
          <span className={`${styles.label} ${styles.copy} absolute`} aria-hidden="true">
            {text}
          </span>
        </span>
      )}
    </button>
  );
}
