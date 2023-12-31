"use client";

import useGetFacebookPost from "@/hooks/useGetFacebookPost";
import Post, { PostSkeleton } from "./post";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function FacebookPosts() {
  const { data: posts, refetch } = useGetFacebookPost();

  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {posts.length ? (
            posts.map((post) => (
              <Post key={post.id} data={post} refetch={refetch} />
            ))
          ) : (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
