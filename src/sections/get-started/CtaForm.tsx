"use client";

/*
 * The Get Started form: name, e-mail, routine, a button with states and a small note.
 * Sends to the form service in content (or opens the visitor's e-mail app when there is none).
 */
import { Field } from "@/components/Form/Field";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { useStaticForm } from "@/components/Form/useStaticForm";
import type { GetStartedContent } from "./content";

export function CtaForm({ form }: { form: GetStartedContent["form"] }) {
  const { state, onSubmit } = useStaticForm({ action: form.action, fallbackEmail: form.fallbackEmail, subject: form.subject });
  return (
    <form onSubmit={onSubmit} action={form.action || undefined} method="post" className="flex flex-col gap-form-gap">
      <div className="flex flex-col gap-form-gap">
        <Field name="Name" label={form.fields.name.label} placeholder={form.fields.name.placeholder} required />
        <Field name="Email" type="email" label={form.fields.email.label} placeholder={form.fields.email.placeholder} required />
        <Field name="Your Routine" label={form.fields.message.label} placeholder={form.fields.message.placeholder} multiline />
      </div>
      <div className="flex flex-col items-start gap-md">
        <SubmitButton state={state} labels={form.button} />
        <p className="w-full max-w-note type-body-bold text-text-secondary">
          {form.note.text}
          <a href={form.note.link.href} className="text-link text-inherit">
            {form.note.link.label}
          </a>
        </p>
      </div>
    </form>
  );
}
