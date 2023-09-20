import { TUser } from "@/hooks/useUser";
import { getAllPagesAccess } from "@/services/facebook";
import { profile } from "@/services/user";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const response = await profile(accessToken);
  const user: TUser = response?.data;
  const pages = await getAllPagesAccess(user?.facebookToken);
  return NextResponse.json(pages || {});
}
