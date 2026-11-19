"use client";

/*
 * Newsletter (footer form): a short line, an e-mail field and the accent arrow at its end.
 * Sends to the service in content (or opens the visitor's e-mail app when there is none).
 */
import { ArrowSubmit } from "@/components/Form/ArrowSubmit";
import { Field } from "@/components/Form/Field";
import { useStaticForm } from "@/components/Form/useStaticForm";
import type { FooterContent } from "./content";

export function Newsletter({ newsletter }: { newsletter: FooterContent["newsletter"] }) {
  const { state, onSubmit } = useStaticForm({
    action: newsletter.action,
    fallbackEmail: newsletter.fallbackEmail,
    subject: newsletter.subject,
  });
  return (
    <form onSubmit={onSubmit} action={newsletter.action || undefined} method="post" className="flex flex-col gap-xs">
      <p className="max-w-newsletter type-body-bold opacity-80">{newsletter.text}</p>
      <div className="relative">
        <Field name="Email" type="email" placeholder={newsletter.placeholder} required size="sm" />
        <div className="absolute right-0 bottom-field-arrow">
          <ArrowSubmit state={state} label={newsletter.buttonLabel} />
        </div>
      </div>
    </form>
  );
}
