import Post, { PostSkeleton, TFBPost } from "@/components/post";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TUser } from "@/hooks/useUser";
import { getAllPagesAccess, getPosts } from "@/services/facebook";
import { profile } from "@/services/user";
import { cookies } from "next/headers";

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

export async function FacebookPosts() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const response = await profile(accessToken);
  const user: TUser = response?.data;
  const pages = await getAllPagesAccess(user?.facebookToken);
  const pageId = pages.data[0].id;
  const pageToken = pages.data[0].access_token;
  const postResponse = await getPosts(pageId, pageToken);
  const posts: TFBPost[] = postResponse.data;

  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
export async function InstagramPosts() {
  return LoadingTemplate;
}
export async function TwitterPosts() {
  return LoadingTemplate;
}
