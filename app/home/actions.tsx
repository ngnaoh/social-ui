import { PostSkeleton } from "@/components/post";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const LoadingTemplate = (
  <div className="relative">
    <ScrollArea>
      <div className="flex space-x-4 pb-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
);

export async function TwitterPosts() {
  return LoadingTemplate;
}
