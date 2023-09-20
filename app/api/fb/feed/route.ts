import { TUser } from "@/hooks/useUser";
import { createPost, getAllPagesAccess, getPosts } from "@/services/facebook";
import { profile } from "@/services/user";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const response = await profile(accessToken);
  const user: TUser = response.data;
  const pages = await getAllPagesAccess(user.facebookToken);
  const pageId = pages.data[0].id;
  const pageToken = pages.data[0].access_token;
  const posts = await getPosts(pageId, pageToken);
  return NextResponse.json(posts);
}
export async function POST(request: NextRequest) {
  const data = await request.json();
  const message = data.message;
  const link = (data.link as string) || undefined;
  const schedule =
    (new Date(data.schedule).getTime() as unknown as string) || undefined;
  const senders = data?.senders?.map((item: string) => item.split("-"))[0];

  const post = await createPost(
    senders[1],
    senders[0],
    message,
    link,
    schedule
  );

  return NextResponse.json(post);
}
