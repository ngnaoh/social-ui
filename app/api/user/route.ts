import { NextResponse, type NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const FB_API_URL = process.env.NEXT_PUBLIC_FB_API_URL;
const FB_USER_ID = process.env.FB_USER_ID;

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const response = await fetch(API_URL + "/api/v1/users/profile", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(response);
}

export async function PATCH(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value || "";
  const userId = request.cookies.get("userId")?.value || "";
  const data = await request.json();

  const pageRes = await fetch(
    FB_API_URL + "/" + FB_USER_ID + "/accounts?access_token=" + accessToken,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const pageData = await pageRes.json();

  console.log(pageData);

  const userRes = await fetch(API_URL + "/api/v1/users/" + userId, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return NextResponse.json(userRes);
}
