import { TUser } from "@/hooks/useUser";

import {
  createContainer,
  getMedias,
  publishContainer,
} from "@/services/instagram";
import { profile } from "@/services/user";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const response = await profile(accessToken);
  const user: TUser = response?.data;
  if (!user) redirect("/");
  const medias = await getMedias(user.instagramToken);
  return NextResponse.json(medias);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const message = data.message;
  const link = (data.link as string) || undefined;
  const image = data.image || "";
  const schedule =
    (new Date(data.schedule).getTime() as unknown as string) || undefined;
  const senders = data?.senders
    ?.find((e: string) => e.includes("instagram"))
    .split("-");
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const response = await profile(accessToken);
  const user: TUser = response?.data;
  if (!user) return;

  const container = await createContainer(
    user.facebookToken,
    senders[1],
    image,
    `${message}${link ? "\n" + link : ""}`
  );
  if (!container) return;
  const post = await publishContainer(
    user.facebookToken,
    senders[1],
    container?.id
  );
  console.log(">>>>>", post);

  return NextResponse.json(post);
}

export async function DELETE(request: NextRequest) {}
