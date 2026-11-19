/*
 * PostCard: a journal article as a photo card with the date and title
 * at the bottom over a dark fade. Hover: the photo grows and blurs (0.4s, --ease-soft).
 * size "lg" (journal list on desktop: taller, H3 title) or "sm" (everywhere else: H4 title).
 */
import Image from "next/image";
import { formatDate } from "@/lib/date";
import type { JournalPost } from "@/lib/journal";
import styles from "./PostCard.module.css";

export function PostCard({ post, size = "sm", sizes }: { post: JournalPost; size?: "sm" | "lg"; sizes: string }) {
  const lg = size === "lg";
  return (
    <a
      href={`/journal/${post.slug}`}
      className={`${styles.card} relative flex h-post-card flex-col justify-end gap-md overflow-hidden rounded-card p-card-pad ${
        lg ? "lg:h-post-card-lg lg:gap-stack-sm lg:p-post-pad-lg" : ""
      }`}
    >
      <span className={`${styles.photo} absolute inset-0`}>
        <Image src={post.banner} alt={post.bannerAlt} fill sizes={sizes} className="object-cover" />
        <span className={`${styles.shade} absolute inset-0 opacity-50`} aria-hidden="true" />
      </span>
      <p className="relative max-w-post-date type-body-bold">{formatDate(post.date)}</p>
      <h3 className={`relative max-w-post-title ${lg ? "type-h4 lg:type-h3" : "type-h4"}`}>{post.title}</h3>
    </a>
  );
}
