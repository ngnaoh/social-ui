"use client";

import useGetPosts from "@/hooks/useGetPost";
import Post from "./post";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function FacebookPosts() {
  const { data: posts, refetch } = useGetPosts();

  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {posts.map((post) => (
            <Post key={post.id} data={post} refetch={refetch} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
