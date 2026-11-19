"use client";

/*
 * FaqList: question cards; one answer open at a time
 * (the first starts open). Opening: the answer grows in and the plus turns (0.4s spring).
 * Click the open question to close it.
 */
import { useId, useState } from "react";
import { Icon } from "@/components/Icon/Icon";
import type { FaqContent } from "./content";
import styles from "./Faq.module.css";

export function FaqList({ items }: { items: FaqContent["items"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="flex flex-col gap-grid-gap">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className={`${styles.item} ${isOpen ? styles.open : ""} rounded-faq p-stack-sm inset-ring inset-ring-border`}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-xs text-left"
              >
                <span className="w-question type-body-lg-bold">{item.question}</span>
                <span className="flex shrink-0 items-center justify-center rounded-full p-3xs">
                  <Icon name="plus" strokeWidth={1.5} className={`${styles.plus} size-icon-md`} />
                </span>
              </button>
            </h3>
            <div id={`${id}-${i}`} className={styles.answer} role="region">
              <div className="min-h-0 overflow-hidden">
                <p className="w-answer pt-sm text-balance type-body opacity-80">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
