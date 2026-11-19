"use client";

/*
 * The contact form: name, e-mail, a topic list, message, a button with states and a small note.
 * Same look and states as the other forms; the chosen topic goes into the e-mail subject.
 */
import { useState } from "react";
import { Field } from "@/components/Form/Field";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { useStaticForm } from "@/components/Form/useStaticForm";
import type { ContactContent } from "./content";

export function ContactForm({ form }: { form: ContactContent["form"] }) {
  const [topic, setTopic] = useState("");
  const { state, onSubmit } = useStaticForm({
    action: form.action,
    fallbackEmail: form.fallbackEmail,
    subject: topic ? `${form.subject}: ${topic}` : form.subject,
  });
  const { fields } = form;
  return (
    <form
      onSubmit={onSubmit}
      onChange={(event) => {
        const target = event.target as unknown as HTMLSelectElement;
        if (target.name === "Subject") setTopic(target.value);
      }}
      action={form.action || undefined}
      method="post"
      className="flex flex-col gap-form-bottom"
    >
      <div className="flex flex-col gap-form-gap">
        <Field name="Name" label={fields.name.label} placeholder={fields.name.placeholder} required />
        <Field name="Email" type="email" label={fields.email.label} placeholder={fields.email.placeholder} required />
        <Field name="Subject" label={fields.topic.label} placeholder={fields.topic.placeholder} options={fields.topic.options} required />
        <Field name="Message" label={fields.message.label} placeholder={fields.message.placeholder} multiline />
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
