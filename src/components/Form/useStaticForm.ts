"use client";

/*
 * useStaticForm: sends a form on a static site.
 * - `action` set (the address from a form service the owner signed up for): POST the fields there.
 * - `action` empty: open the visitor's e-mail app with the fields written into a new message to
 *   `fallbackEmail` (nothing is "sent" by the site; the state is "prepared", never a fake "sent").
 * States: idle -> loading -> success | prepared | error.
 */
import { useState, type FormEvent } from "react";

export type FormState = "idle" | "loading" | "success" | "prepared" | "error";

export function useStaticForm({
  action,
  fallbackEmail,
  subject,
}: {
  action: string;
  fallbackEmail: string;
  subject: string;
}) {
  const [state, setState] = useState<FormState>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!action) {
      const lines = [...data.entries()].map(([key, value]) => `${key}: ${String(value)}`);
      const href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      window.location.href = href;
      setState("prepared");
      return;
    }

    setState("loading");
    try {
      const response = await fetch(action, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  };

  return { state, onSubmit, reset: () => setState("idle") };
}
