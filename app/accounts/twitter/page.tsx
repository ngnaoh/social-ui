import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import HandleSocialAuth from "@/components/handle-social-auth";
import { TokenTypes } from "@/types/common";
import { update } from "@/services/user";
import { TUser } from "@/hooks/useUser";

type AccountInstagramProps = {
  params: {};
  searchParams: { code: string };
};
export default async function AccountTwitter({
  params,
  searchParams,
}: AccountInstagramProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const userId = cookieStore.get("userId")?.value || "";
  if (!accessToken) redirect("/");

  const code = searchParams?.code || "";
  const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic V1ROclFTMTRiVWhwTWw4M2FVNWFkVGQyTldNNk1UcGphUTotUm9LeDN4NThKQThTbTlKSXQyZm1BanEzcTVHWC1icVozdmpKeFNlR3NkbUd0WEViUA==",
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: "bWJIRVZVSFl6aHhRa2lUaUhpd1k6MTpjaQ",
      redirect_uri: "https://a8f0-14-165-70-50.ngrok-free.app/accounts/twitter",
      code_verifier: "challenge",
    }),
  });

  console.log(">>>>", code, await tokenRes.json());

  // await update(accessToken, userId, {
  //   instagramToken: tokenRes.access_token,
  // } as TUser);
  // redirect("/accounts");
}
