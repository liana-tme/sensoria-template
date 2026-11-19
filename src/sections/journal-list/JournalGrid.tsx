"use client";

/* The card grid with the "Load More" button (6 cards per page). */
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { PostCard } from "@/components/PostCard/PostCard";
import type { JournalPost } from "@/lib/journal";

export function JournalGrid({ posts, pageSize, loadMore }: { posts: JournalPost[]; pageSize: number; loadMore: string }) {
  const [shown, setShown] = useState(pageSize);
  return (
    <div className="flex flex-col items-center gap-section-gap">
      <div className="grid w-full gap-grid-gap md:grid-cols-2">
        {posts.slice(0, shown).map((post) => (
          <PostCard key={post.slug} post={post} size="lg" sizes="(width >= 810px) 50vw, 100vw" />
        ))}
      </div>
      {shown < posts.length && <Button label={loadMore} onClick={() => setShown(shown + pageSize)} />}
    </div>
  );
}
