import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import HandleSocialAuth from "@/components/handle-social-auth";
import { TokenTypes } from "@/types/common";

export default async function AccountFacebook() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken?.value) redirect("/");
  return <HandleSocialAuth tokenType={TokenTypes.facebookToken} />;
}
