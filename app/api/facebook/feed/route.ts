import { TUser } from "@/hooks/useUser";
import {
  createPost,
  deletePost,
  getAllPagesAccess,
  getPosts,
} from "@/services/facebook";
import { profile } from "@/services/user";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const response = await profile(accessToken);
  const user: TUser = response?.data;
  if (!user) redirect("/");
  const pages = await getAllPagesAccess(user?.facebookToken);
  const pageId = pages.data[0].id;
  const pageToken = pages.data[0].access_token;
  const posts = await getPosts(pageId, pageToken);
  return NextResponse.json({ posts, sender: pages.data[0] });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const message = data.message;
  const link = (data.link as string) || undefined;
  const schedule =
    (new Date(data.schedule).getTime() as unknown as string) || undefined;
  const senders = data?.senders
    ?.find((e: string) => e.includes("facebook"))
    .split("-");

  const post = await createPost(
    senders[2],
    senders[1],
    message,
    link,
    schedule
  );

  return NextResponse.json(post);
}

export async function DELETE(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const response = await profile(accessToken);
  const user: TUser = response?.data;
  if (!user) redirect("/sign-in");
  const pages = await getAllPagesAccess(user?.facebookToken);
  const pageToken = pages.data[0].access_token;
  const data = await request.json();
  const pageId = data.id;
  const post = await deletePost(pageId, pageToken);

  return NextResponse.json(post);
}
