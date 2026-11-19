"use client";

/*
 * The job application form: name, e-mail, résumé link, cover letter, a button with states and a
 * small note. Same look and states as the Get Started form; the job title goes into the subject
 * and a hidden "Position" field.
 */
import { Field } from "@/components/Form/Field";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { useStaticForm } from "@/components/Form/useStaticForm";
import type { JobContent } from "./content";

export function ApplyForm({ apply, position }: { apply: JobContent["apply"]; position: string }) {
  const { state, onSubmit } = useStaticForm({
    action: apply.action,
    fallbackEmail: apply.fallbackEmail,
    subject: `${apply.subject} ${position}`,
  });
  const { fields } = apply;
  return (
    <form onSubmit={onSubmit} action={apply.action || undefined} method="post" className="flex flex-col gap-form-gap">
      <input type="hidden" name="Position" value={position} />
      <div className="flex flex-col gap-form-gap">
        <Field name="Name" label={fields.name.label} placeholder={fields.name.placeholder} required />
        <Field name="Email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} required />
        <Field name="Resume Link" type="url" label={fields.resume.label} placeholder={fields.resume.placeholder} required />
        <Field name="Cover letter" label={fields.letter.label} placeholder={fields.letter.placeholder} multiline />
      </div>
      <div className="flex flex-col items-start gap-md">
        <SubmitButton state={state} labels={apply.button} />
        <p className="w-full max-w-note type-body-bold text-text-secondary">
          {apply.note.text}
          <a href={apply.note.link.href} className="text-link text-inherit">
            {apply.note.link.label}
          </a>
        </p>
      </div>
    </form>
  );
}
