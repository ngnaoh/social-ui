import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import HandleSocialAuth from "@/components/handle-social-auth";
import { TokenTypes } from "@/types/common";
import { getAccessToken } from "@/services/instagram";
import { update } from "@/services/user";
import { TUser } from "@/hooks/useUser";

type AccountInstagramProps = {
  params: {};
  searchParams: { code: string };
};
export default async function AccountInstagram({
  params,
  searchParams,
}: AccountInstagramProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const userId = cookieStore.get("userId")?.value || "";
  if (!accessToken) redirect("/");

  const code = searchParams?.code || "";
  const tokenRes = await getAccessToken(code);
  await update(accessToken, userId, {
    instagramToken: tokenRes.access_token,
  } as TUser);
  redirect("/accounts");
}
