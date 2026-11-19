/*
 * Form field (form input): label above, a field with only an underline (`divider`),
 * which turns `accent` while typing. Placeholder in `text-placeholder`.
 * With `options` it is a drop-down list (contact form "Subject"), grey until a choice is made.
 * size "md" (Get Started form, 18px) or "sm" (newsletter, 16px, no padding, no label).
 */
import styles from "./Form.module.css";

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  multiline = false,
  options,
  size = "md",
}: {
  label?: string;
  name: string;
  type?: "text" | "email" | "url";
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
  /** Choices: renders a drop-down list; `placeholder` is its first, unselectable line. */
  options?: string[];
  size?: "md" | "sm";
}) {
  const look = `${styles.field} w-full ${size === "md" ? "py-field-y pr-field-y type-field" : "type-field-sm"} ${
    multiline ? "min-h-field-area resize-y" : "h-field-h"
  }`;
  const field = options ? (
    <select name={name} required={required} defaultValue="" className={`${look} ${styles.select} cursor-pointer appearance-none`}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ) : multiline ? (
    <textarea name={name} placeholder={placeholder} required={required} className={look} />
  ) : (
    <input name={name} type={type} placeholder={placeholder} required={required} className={look} aria-label={label ? undefined : placeholder} />
  );
  if (!label) return field;
  return (
    <label className="flex flex-col gap-xs">
      <span className="type-body-lg-bold opacity-80">{label}</span>
      {field}
    </label>
  );
}
