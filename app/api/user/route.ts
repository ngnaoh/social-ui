import { profile, update } from "@/services/user";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const response = await profile(accessToken);
  return NextResponse.json(response || {});
}

export async function PATCH(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const userId = request.cookies.get("userId")?.value || "";
  const data = await request.json();
  const userRes = await update(accessToken, userId, data);
  return NextResponse.json(userRes || {});
}
